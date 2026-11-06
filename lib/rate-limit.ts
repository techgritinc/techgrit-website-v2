/**
 * Minimal fixed-window rate limiter, kept in process memory.
 *
 * Good enough for this deployment: ecosystem.config.js runs a single PM2 instance in
 * fork mode, so every request hits the same Map. Counters reset on restart. If the site
 * ever runs more than one instance, move this to a shared store (e.g. Redis).
 */
type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();
const MAX_TRACKED_KEYS = 5_000;

function pruneExpired(now: number) {
  for (const [key, w] of windows) {
    if (w.resetAt <= now) windows.delete(key);
  }
}

/** Records one hit for `key`. Returns false when `key` is already at `limit` for this window. */
export function allowRequest(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const current = windows.get(key);

  if (!current || current.resetAt <= now) {
    if (windows.size >= MAX_TRACKED_KEYS) pruneExpired(now);
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (current.count >= limit) return false;
  current.count += 1;
  return true;
}

/**
 * Minimal fixed-window rate limiter, kept in process memory.
 *
 * Good enough for this deployment: ecosystem.config.js runs a single PM2 instance in
 * fork mode, so every request hits the same Map. Counters reset on restart. If the site
 * ever runs more than one instance, move this to a shared store (e.g. Redis).
 *
 * Checking and recording are separate so a caller can check several limits first and
 * record a hit on all of them only when every one passes (and only for requests worth
 * counting). See takeRequest().
 */
type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();
// Hard cap on tracked keys. Expired windows are pruned first; if the Map is still full
// (e.g. a flood of distinct IPs inside one window), the oldest entries are evicted.
// Memory stays bounded at the cost of resetting a few of the oldest counters early.
const MAX_TRACKED_KEYS = 5_000;

function pruneExpired(now: number) {
  for (const [key, w] of windows) {
    if (w.resetAt <= now) windows.delete(key);
  }
}

function evictOldest() {
  // Map iterates in insertion order, so the first key is the oldest window.
  const oldest = windows.keys().next();
  if (!oldest.done) windows.delete(oldest.value);
}

function activeWindow(key: string, now: number): Window | undefined {
  const w = windows.get(key);
  return w && w.resetAt > now ? w : undefined;
}

export type RateLimit = { key: string; limit: number; windowMs: number };

/**
 * Records one hit against every limit, but only if none of them is already full.
 * Returns false (and records nothing) when any limit is reached, so a request that is
 * turned away never uses up another limit's budget.
 */
export function takeRequest(limits: RateLimit[]): boolean {
  const now = Date.now();
  if (limits.some(({ key, limit }) => (activeWindow(key, now)?.count ?? 0) >= limit)) return false;

  for (const { key, windowMs } of limits) {
    const current = activeWindow(key, now);
    if (current) {
      current.count += 1;
      continue;
    }
    windows.delete(key); // drop an expired window so the new one is re-inserted as newest
    if (windows.size >= MAX_TRACKED_KEYS) pruneExpired(now);
    while (windows.size >= MAX_TRACKED_KEYS) evictOldest();
    windows.set(key, { count: 1, resetAt: now + windowMs });
  }
  return true;
}

/** Single-limit shorthand: records one hit for `key`, false when it is already at `limit`. */
export function allowRequest(key: string, limit: number, windowMs: number): boolean {
  return takeRequest([{ key, limit, windowMs }]);
}

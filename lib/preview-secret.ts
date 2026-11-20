import { timingSafeEqual } from "node:crypto";

/**
 * Server-only. The shared secret that gates draft Preview. It must equal the CMS's
 * PREVIEW_SECRET. When it is not configured, Preview is off: nothing is ever valid.
 */
export function getPreviewSecret(): string | null {
  return process.env.CMS_PREVIEW_SECRET || null;
}

/** Constant-time check of a candidate (e.g. the `?secret=` query param) against the secret. */
export function isValidPreviewSecret(candidate: string | string[] | undefined): boolean {
  const expected = getPreviewSecret();
  if (!expected || typeof candidate !== "string" || !candidate) return false;

  const a = Buffer.from(candidate);
  const b = Buffer.from(expected);

  return a.length === b.length && timingSafeEqual(a, b);
}

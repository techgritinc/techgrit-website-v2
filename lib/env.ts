/**
 * Server-only numeric tunables read from process.env at runtime.
 *
 * Unset, empty, non-numeric, zero or negative values all fall back to `fallback`, so an
 * optional variable can be left out of .env entirely. Never use a NEXT_PUBLIC_ name here:
 * those are inlined into the client bundle at build time.
 */
export function envPositiveInt(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return Number.isFinite(value) && value > 0 ? Math.floor(value) : fallback;
}

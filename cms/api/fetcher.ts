// Runs server-side only (called from Server Components), so this is a plain server
// env var — it's never shipped to the client bundle. Set it in .env as
// CMS_API_URL=<origin> (no trailing /api — endpoints below add their own path).
export const CMS_API_URL = process.env.CMS_API_URL ?? "http://localhost:1337";

// Shared Strapi fetch: unwraps the standard `{ data }` envelope and returns null on
// any non-OK response or network failure, so callers only need to handle "got data"
// vs "didn't" rather than duplicating fetch/parse/error-handling per endpoint.
export async function fetchCms<T>(endpoint: string): Promise<T | null> {
  try {
    const res = await fetch(`${CMS_API_URL}${endpoint}`, { cache: "no-store" });
    if (!res.ok) return null;

    const json: { data: T | null } = await res.json();
    return json.data;
  } catch {
    return null;
  }
}
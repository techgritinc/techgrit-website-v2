import { CMS_API_URL } from "./fetcher";
import { getPreviewSecret } from "@/lib/preview-secret";

// Server-only: used by the /preview routes and the draft getters they call. It lives apart
// from fetcher.ts on purpose — fetcher.ts is reachable from client components (media.ts
// imports CMS_API_URL from it, and LifeGallery imports that chain), and lib/preview-secret.ts
// imports node:crypto, which webpack cannot bundle for the browser. Keep this file out of any
// client component's import graph.

// Draft variant of fetchCms for the /preview routes. Sends the shared secret so the CMS serves
// the unpublished version, and never caches (a draft must not land in, or be served from, the
// published data cache). Returns null when the secret isn't configured, so Preview simply
// 404s instead of silently falling back to published content.
export async function fetchCmsDraft<T>(endpoint: string): Promise<T | null> {
  const secret = getPreviewSecret();
  if (!secret) return null;

  try {
    const separator = endpoint.includes("?") ? "&" : "?";
    const res = await fetch(`${CMS_API_URL}${endpoint}${separator}status=draft`, {
      cache: "no-store",
      headers: { "x-preview-secret": secret },
    });
    if (!res.ok) return null;

    const json: { data: T | null } = await res.json();
    return json.data;
  } catch {
    return null;
  }
}

import { CMS_API_URL } from "../api/fetcher";
import type { StrapiImageFormat, StrapiMedia } from "../types/header-types";

export function resolveMediaUrl(url: string): string {
  return url.startsWith("http") ? url : `${CMS_API_URL}${url}`;
}

// Picks the smallest Strapi-generated format that's still >= the target use case,
// falling back to the original asset if no formats were generated for it.
export function pickMediaAsset(
  media: StrapiMedia,
  preferred: (keyof NonNullable<StrapiMedia["formats"]>)[]
): StrapiImageFormat {
  for (const key of preferred) {
    const asset = media.formats?.[key];
    if (asset) return asset;
  }
  return { url: media.url, width: media.width, height: media.height };
}
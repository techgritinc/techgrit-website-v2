import { pickMediaAsset, resolveMediaUrl } from "../../utils/media";

export type StrapiImageFormat = {
  url: string;
  width: number;
  height: number;
};

export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  } | null;
};

/** Minimal shape every dynamic-zone entry has — enough to `.find()`/`.filter()` a
 * section out by `__component` without each section file depending on the full
 * `StrapiHomeSection` union (which would create a cycle back through ./index). */
export type AnySection = { __component: string };

export type HomeIcon = { url: string; alt: string };

export function toIcon(media: StrapiMedia | null | undefined): HomeIcon | null {
  if (!media) return null;
  return { url: resolveMediaUrl(media.url), alt: media.alternativeText ?? "" };
}

export function toFeatureImage(media: StrapiMedia[] | undefined): HomeIcon | null {
  const first = media?.[0];
  if (!first) return null;
  const asset = pickMediaAsset(first, ["medium", "small"]);
  return { url: resolveMediaUrl(asset.url), alt: first.alternativeText ?? "" };
}

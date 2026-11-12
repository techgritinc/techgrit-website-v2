import { pickMediaAsset, resolveMediaUrl } from "../../utils/media";
import { parseYouTubeId } from "../../utils/youtube";
import type { AnySection, StrapiMedia } from "./shared";
import { ROUTES } from "@/lib/routes";

export type StrapiCultureGallerySection = {
  id: number;
  title: string;
  subtitle: string;
  badgeLabel: string;
  primaryBtnLabel: string;
  primaryBtnLink: string;
  secondaryBtnLabel: string;
  secondaryBtnLink: string;
  image: StrapiMedia[];
  videoLinks?: { id: number; url: string | null; label?: string | null; thumbnail?: { url: string } | null }[] | null;
  __component: "page-reusable-sections.culture-gallery";
};

export type CultureGalleryImage = {
  id: string;
  src: string | null;
  alt: string;
  type?: "image" | "video";
  /** Set when the video comes from a CMS `videoLinks` entry; takes precedence over an uploaded mp4. */
  youtubeId?: string | null;
  /** CMS thumbnail for the video link, shown until the tile is hovered. */
  thumbnailUrl?: string | null;
};

export type CultureGalleryData = {
  title: string;
  subtitle: string;
  badgeLabel: string;
  primaryBtn: { label: string; href: string };
  secondaryBtn: { label: string; href: string };
  images: CultureGalleryImage[];
};

export function pickCultureGallerySection(sections: AnySection[]): StrapiCultureGallerySection | undefined {
  return sections.find((s): s is StrapiCultureGallerySection => s.__component === "page-reusable-sections.culture-gallery");
}

// NOT used as a homepage CMS-fallback (the homepage always renders whatever the CMS
// returns, empty or not) — used only as app/_home-components/LifeGallery.tsx's own
// default `images`/button props, since that shared component also renders on
// Careers/About, which are static pages that don't fetch this CMS endpoint at all.
export const DEFAULT_CULTURE_GALLERY_DATA: CultureGalleryData = {
  title: "Life at TechGrit.",
  subtitle: "The people and the culture behind the engineering.",
  badgeLabel: "Inside TechGrit",
  primaryBtn: { label: "Explore Careers", href: "/careers" },
  secondaryBtn: { label: "Meet the team", href: ROUTES.aboutOurStory },
  images: [
    { id: "glasses", src: "/assets/team/glasses.png", alt: "TechGrit team member" },
    { id: "rooftop", src: "/assets/team/rooftop.png", alt: "TechGrit office rooftop" },
    { id: "painting", src: "/assets/team/painting.png", alt: "TechGrit culture moment" },
    { id: "diwali", src: "/assets/team/diwali.png", alt: "TechGrit team celebration" },
  ],
};

/**
 * Shared by Home, Careers and Our Story: builds the gallery items from a culture-gallery
 * section. A valid video link wins over uploaded mp4s (photos stay); with no valid link the
 * uploaded videos remain as the fallback.
 */
export function buildGalleryItems(section: {
  image?: (Omit<StrapiMedia, "id"> & { id?: number })[] | null;
  videoLinks?: StrapiCultureGallerySection["videoLinks"];
}): CultureGalleryImage[] {
  const linkVideos: CultureGalleryImage[] = (section.videoLinks ?? []).flatMap((link) => {
    const youtubeId = parseYouTubeId(link.url);
    return youtubeId
      ? [
          {
            id: `link-${link.id}`,
            src: null,
            alt: link.label ?? "",
            type: "video" as const,
            youtubeId,
            thumbnailUrl: link.thumbnail ? resolveMediaUrl(link.thumbnail.url) : null,
          },
        ]
      : [];
  });

  const mediaItems: CultureGalleryImage[] = (section.image ?? []).map((media) => {
    const isVideo = media.mime?.startsWith("video/") ?? false;
    const src = isVideo ? media.url : pickMediaAsset(media, ["medium", "small"]).url;
    return {
      id: String(media.id ?? media.url),
      src: resolveMediaUrl(src),
      alt: media.alternativeText ?? "",
      type: isVideo ? ("video" as const) : ("image" as const),
    };
  });

  return linkVideos.length > 0
    ? [...mediaItems.filter((item) => item.type !== "video"), ...linkVideos]
    : mediaItems;
}

export function toCultureGallery(section: StrapiCultureGallerySection): CultureGalleryData {
  const images = buildGalleryItems(section);

  return {
    title: section.title,
    subtitle: section.subtitle,
    badgeLabel: section.badgeLabel,
    primaryBtn: { label: section.primaryBtnLabel, href: section.primaryBtnLink },
    secondaryBtn: { label: section.secondaryBtnLabel, href: section.secondaryBtnLink },
    images,
  };
}

import { pickMediaAsset, resolveMediaUrl } from "../../utils/media";
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
  __component: "page-reusable-sections.culture-gallery";
};

export type CultureGalleryImage = { id: string; src: string | null; alt: string; type?: "image" | "video" };

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

export function toCultureGallery(section: StrapiCultureGallerySection): CultureGalleryData {
  const images: CultureGalleryImage[] = section.image.map((media) => {
    const isVideo = media.mime?.startsWith("video/") ?? false;
    const src = isVideo ? media.url : pickMediaAsset(media, ["medium", "small"]).url;
    return {
      id: String(media.id),
      src: resolveMediaUrl(src),
      alt: media.alternativeText ?? "",
      type: isVideo ? ("video" as const) : ("image" as const),
    };
  });

  return {
    title: section.title,
    subtitle: section.subtitle,
    badgeLabel: section.badgeLabel,
    primaryBtn: { label: section.primaryBtnLabel, href: section.primaryBtnLink },
    secondaryBtn: { label: section.secondaryBtnLabel, href: section.secondaryBtnLink },
    images,
  };
}

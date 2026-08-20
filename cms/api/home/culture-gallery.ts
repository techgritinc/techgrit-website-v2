import { pickMediaAsset, resolveMediaUrl } from "../../utils/media";
import type { AnySection, StrapiMedia } from "./shared";

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

export type CultureGalleryImage = { id: string; src: string | null; alt: string };

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

// Also used directly by app/_home-components/LifeGallery.tsx as its default `images`
// prop, since that component is shared with Careers/About (which don't fetch CMS data).
export const DEFAULT_CULTURE_GALLERY_DATA: CultureGalleryData = {
  title: "Life at TechGrit.",
  subtitle: "The people and the culture behind the engineering.",
  badgeLabel: "Inside TechGrit",
  primaryBtn: { label: "Explore Careers", href: "/careers" },
  secondaryBtn: { label: "Meet the team", href: "/about" },
  images: [
    { id: "glasses", src: "/assets/team/glasses.png", alt: "TechGrit team member" },
    { id: "rooftop", src: "/assets/team/rooftop.png", alt: "TechGrit office rooftop" },
    { id: "painting", src: "/assets/team/painting.png", alt: "TechGrit culture moment" },
    { id: "diwali", src: "/assets/team/diwali.png", alt: "TechGrit team celebration" },
  ],
};

export function toCultureGallery(section: StrapiCultureGallerySection): CultureGalleryData {
  const images: CultureGalleryImage[] = section.image.map((media) => {
    const asset = pickMediaAsset(media, ["medium", "small"]);
    return { id: String(media.id), src: resolveMediaUrl(asset.url), alt: media.alternativeText ?? "" };
  });

  return {
    title: section.title,
    subtitle: section.subtitle,
    badgeLabel: section.badgeLabel,
    primaryBtn: { label: section.primaryBtnLabel, href: section.primaryBtnLink },
    secondaryBtn: { label: section.secondaryBtnLabel, href: section.secondaryBtnLink },
    images: images.length > 0 ? images : DEFAULT_CULTURE_GALLERY_DATA.images,
  };
}

import { pickMediaAsset, resolveMediaUrl } from "../utils/media";
import type { StrapiMedia } from "../types/strapi-common";
import { ROUTES, caseStudyDetailRoute } from "@/lib/routes";

// Shared shape + mapper for any small CMS-hosted icon (SVG or otherwise) attached to a
// repeatable item (approach steps, nav sections, etc.) — one place so every page maps
// icons the same way instead of each re-writing the null-check + URL-resolve logic.
export interface SectionIcon {
  url: string;
  alt: string;
}

export function mapSectionIcon(icon: StrapiMedia | null): SectionIcon | null {
  if (!icon) return null;
  return { url: resolveMediaUrl(icon.url), alt: icon.alternativeText ?? "" };
}

// Strapi shapes for the 3 "page-reusable-sections.*" components that are reused
// verbatim across multiple pages (construction today; home/case-studies next) —
// kept here once so every page's own cms/api/<page>.ts imports the same mapper
// instead of re-writing it.

export type StrapiHeroSection = {
  __component: "page-reusable-sections.hero";
  title: string;
  subtitle: string | null;
  primaryBtnLabel: string;
  primaryBtnLink: string;
  secondaryBtnLabel: string | null;
  secondaryBtnLink: string | null;
  badgeLabel: string;
  highlightTitle: string | null;
  backgroundImage: StrapiMedia[];
};

export type StrapiStatItem = {
  title: string;
  subtitle: string | null;
};

export type StrapiStatisticsSection = {
  __component: "page-reusable-sections.statistics";
  statistics: StrapiStatItem[];
};

export type StrapiCtaBannerSection = {
  __component: "page-reusable-sections.cta-banner";
  title: string;
  subtitle: string | null;
  badgeLabel: string | null;
  highlightTitle: string | null;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string | null;
  secondaryCtaLink: string | null;
};

export type HeroFields = {
  eyebrow: string;
  title: string;
  titleHighlight: string | null;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
  image: { url: string; alternativeText: string; width: number; height: number } | null;
};

export function mapHeroFields(cms: StrapiHeroSection): HeroFields {
  const asset = cms.backgroundImage[0]
    ? pickMediaAsset(cms.backgroundImage[0], ["medium", "large"])
    : null;

  return {
    eyebrow: cms.badgeLabel,
    title: cms.title,
    titleHighlight: cms.highlightTitle && cms.title.includes(cms.highlightTitle)
      ? cms.highlightTitle
      : null,
    subtitle: cms.subtitle ?? "",
    primaryCtaLabel: cms.primaryBtnLabel,
    primaryCtaLink: cms.primaryBtnLink,
    secondaryCtaLabel: cms.secondaryBtnLabel ?? "",
    secondaryCtaLink: cms.secondaryBtnLink ?? "",
    image:
      asset && cms.backgroundImage[0]
        ? {
            url: resolveMediaUrl(asset.url),
            alternativeText: cms.backgroundImage[0].alternativeText ?? "",
            width: asset.width,
            height: asset.height,
          }
        : null,
  };
}

export function mapStatistics(cms: StrapiStatisticsSection): { order: number; value: string; label: string }[] {
  return cms.statistics.map((stat, index) => ({
    order: index + 1,
    value: stat.title,
    label: stat.subtitle ?? "",
  }));
}

export type CtaBannerFields = {
  eyebrow: string;
  title: string;
  titleHighlight: string | null; // exact substring of `title` to render in the gradient accent; null = no highlight
  description: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
};

export function mapCtaBanner(cms: StrapiCtaBannerSection): CtaBannerFields {
  return {
    eyebrow: cms.badgeLabel ?? "",
    title: cms.title,
    titleHighlight:
      cms.highlightTitle && cms.title.includes(cms.highlightTitle) ? cms.highlightTitle : null,
    description: cms.subtitle ?? "",
    primaryCtaLabel: cms.primaryCtaLabel,
    primaryCtaLink: cms.primaryCtaLink,
    secondaryCtaLabel: cms.secondaryCtaLabel ?? "",
    secondaryCtaLink: cms.secondaryCtaLink ?? "",
  };
}

// Case-study "card" shape — reused verbatim by both the Case Studies list page
// (insights-case-studies.case-study-cards) and the Case Study detail page's
// "More case studies" section (case-study-detailed-view.more-case-studys). Kept here
// once, same reasoning as hero/stats/cta-banner above.

export type StrapiCaseStudyCategory = {
  id: number;
  name: string;
  slug: string;
};

export type StrapiCaseStudyItem = {
  id: number;
  title: string;
  subtitle: string | null;
  featuredValue: string;
  featuredLabel: string;
  ctaLabel: string | null;
  ctaLink: string;
  isFeatured: boolean;
  case_study_category: StrapiCaseStudyCategory | null;
  image: StrapiMedia[];
};

export interface CaseStudyCardImage {
  url: string;
  alt: string;
}

export interface CaseStudyCard {
  order: number;
  title: string;
  subtitle: string;
  featuredValue: string;
  featuredLabel: string;
  ctaLabel: string;
  ctaLink: string;
  isFeatured: boolean;
  categoryName: string;
  categorySlug: string;
  image: CaseStudyCardImage | null;
}

// The CMS's own ctaLink is a bare `/<slug>/` (or a `/case-studies` placeholder for cards
// with no detail page yet) — neither matches this app's actual `/insights/case-studies/<slug>/`
// detail route, so every card link is rebuilt from the slug instead of used verbatim.
export function resolveCaseStudyHref(ctaLink: string): string {
  const slug = ctaLink.replace(/\/+$/, "").split("/").filter(Boolean).pop();
  if (!slug || slug === "case-studies") return `${ROUTES.caseStudies}/`;
  return caseStudyDetailRoute(slug);
}

export function mapCaseStudyCard(item: StrapiCaseStudyItem, index: number): CaseStudyCard {
  const asset = item.image[0] ? pickMediaAsset(item.image[0], ["small", "medium"]) : null;
  return {
    order: index + 1,
    title: item.title,
    subtitle: item.subtitle ?? "",
    featuredValue: item.featuredValue,
    featuredLabel: item.featuredLabel,
    ctaLabel: item.ctaLabel ?? "View Case Study",
    ctaLink: resolveCaseStudyHref(item.ctaLink),
    isFeatured: item.isFeatured,
    categoryName: item.case_study_category?.name ?? "",
    categorySlug: item.case_study_category?.slug ?? "",
    image:
      asset && item.image[0]
        ? { url: resolveMediaUrl(asset.url), alt: item.image[0].alternativeText ?? "" }
        : null,
  };
}

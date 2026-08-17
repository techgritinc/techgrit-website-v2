import { pickMediaAsset, resolveMediaUrl } from "../utils/media";
import type { StrapiMedia } from "../types/strapi-common";

// Strapi shapes for the 3 "page-reusable-sections.*" components that are reused
// verbatim across multiple pages (construction today; home/case-studies next) —
// kept here once so every page's own cms/api/<page>.ts imports the same mapper
// instead of re-writing it.

export type StrapiHeroSection = {
  __component: "page-reusable-sections.hero";
  title: string;
  subtitle: string;
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
  subtitle: string;
};

export type StrapiStatisticsSection = {
  __component: "page-reusable-sections.statistics";
  statistics: StrapiStatItem[];
};

export type StrapiCtaBannerSection = {
  __component: "page-reusable-sections.cta-banner";
  title: string;
  subtitle: string;
  badgeLabel: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
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
    subtitle: cms.subtitle,
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
    label: stat.subtitle,
  }));
}

export type CtaBannerFields = {
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
};

export function mapCtaBanner(cms: StrapiCtaBannerSection): CtaBannerFields {
  return {
    eyebrow: cms.badgeLabel,
    title: cms.title,
    description: cms.subtitle,
    primaryCtaLabel: cms.primaryCtaLabel,
    primaryCtaLink: cms.primaryCtaLink,
    secondaryCtaLabel: cms.secondaryCtaLabel,
    secondaryCtaLink: cms.secondaryCtaLink,
  };
}

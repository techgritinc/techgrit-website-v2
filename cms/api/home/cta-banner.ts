import type { AnySection } from "./shared";

export type StrapiCtaBannerSection = {
  id: number;
  title: string;
  subtitle: string;
  badgeLabel: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
  __component: "page-reusable-sections.cta-banner";
};

export type CtaBannerData = {
  badgeLabel: string;
  title: string;
  subtitle: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
};

export function pickCtaBannerSection(sections: AnySection[]): StrapiCtaBannerSection | undefined {
  return sections.find((s): s is StrapiCtaBannerSection => s.__component === "page-reusable-sections.cta-banner");
}

export function toCtaBanner(section: StrapiCtaBannerSection): CtaBannerData {
  return {
    badgeLabel: section.badgeLabel,
    title: section.title,
    subtitle: section.subtitle,
    primaryCta: { label: section.primaryCtaLabel, href: section.primaryCtaLink },
    secondaryCta: { label: section.secondaryCtaLabel, href: section.secondaryCtaLink },
  };
}

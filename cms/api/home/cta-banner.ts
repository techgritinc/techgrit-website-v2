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

export const DEFAULT_CTA_BANNER_DATA: CtaBannerData = {
  badgeLabel: "See how we help teams win",
  title: "Let's scope your next engagement.",
  subtitle:
    "Whether you're building a new product, modernizing an existing platform, or evaluating where AI-engineering fits in your roadmap, we'll give you an honest assessment in a single working session. No sales deck. No commitments.",
  primaryCta: { label: "Request an Engineering Review", href: "mailto:support@techgrit.com?subject=OrbitAI%20Demo%20Request" },
  secondaryCta: { label: "Or explore our 6-week framework", href: "#methodology" },
};

export function toCtaBanner(section: StrapiCtaBannerSection): CtaBannerData {
  return {
    badgeLabel: section.badgeLabel,
    title: section.title,
    subtitle: section.subtitle,
    primaryCta: { label: section.primaryCtaLabel, href: section.primaryCtaLink },
    secondaryCta: { label: section.secondaryCtaLabel, href: section.secondaryCtaLink },
  };
}

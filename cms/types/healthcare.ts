import type { SectionIcon, StrapiCtaBannerSection, StrapiHeroSection } from "../shared/reusable-sections";
import type { StrapiMedia } from "./strapi-common";

export type { SectionIcon } from "../shared/reusable-sections";

// ---------------------------------------------------------------------------
// Strapi-side raw shapes — healthcare-specific components (not reused by other pages,
// mirrors the shared-vs-route-local split already used for cms/types/construction.ts).
// ---------------------------------------------------------------------------

export type StrapiApproachStep = {
  title: string;
  subtitle: string | null;
  stepLabel: string | null;
  icon: StrapiMedia | null;
};

// Reused for "What We Build" / "AI Across the Healthcare Product Lifecycle" /
// "Our HealthTech Engineering Services". Disambiguated by `serviceLabel` (NOT `variant`,
// which collides for the latter two — research.md §2).
export type StrapiServiceDetailSection = {
  __component: "page-reusable-sections.service-detail";
  title: string;
  subtitle: string | null;
  serviceLabel: string;
  variant: string;
  approachSteps: StrapiApproachStep[];
};

// "Featured Capabilities" is the same shape Construction's own Proven Impact section uses
// (cms/types/construction.ts's StrapiProvenImpactSection) — mirrored here rather than imported
// since it's a distinct CMS entry for this page, not a shared cross-page component today.
export type StrapiCaseStudyCard = {
  name: string | null;
  caseLabel: string | null;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
};

export type StrapiProvenImpactSection = {
  __component: "industries-construction.proven-impact";
  title: string;
  badgeLabel: string;
  caseStudyCards: StrapiCaseStudyCard[];
};

export type StrapiModernizationFeature = {
  title: string;
};

export type StrapiModernizationChallengesSection = {
  __component: "page-reusable-sections.modernization-challenges";
  title: string;
  subtitle: string | null;
  eyebrow: string | null;
  blockers: {
    features: StrapiModernizationFeature[];
  };
};

export type StrapiHealthCareSystemCategory = {
  name: string;
  features: StrapiModernizationFeature[];
};

export type StrapiHealthCareSystemSection = {
  __component: "industries-construction.pd-health-care-system";
  title: string;
  subtitle: string | null;
  badgeLabel: string;
  categories: StrapiHealthCareSystemCategory[];
};

// Any other, truly unmapped component comes back with this shape and is ignored.
export type StrapiUnmappedSection = { __component: string };

export type StrapiHealthcareSection =
  | StrapiHeroSection
  | StrapiServiceDetailSection
  | StrapiModernizationChallengesSection
  | StrapiProvenImpactSection
  | StrapiHealthCareSystemSection
  | StrapiCtaBannerSection
  | StrapiUnmappedSection;

export type StrapiHealthcarePage = {
  seo: {
    metaTitle: string | null;
    metaDescription: string | null;
  } | null;
  sections: StrapiHealthcareSection[];
};

// ---------------------------------------------------------------------------
// Presentational shapes — what the page's components actually render. Produced by mapping
// the Strapi shapes above; never sourced from static content.
// ---------------------------------------------------------------------------

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface SectionImage {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

export interface HeroSection {
  type: "hero";
  order: number;
  eyebrow: string;
  title: string;
  titleHighlight: string | null; // exact substring of `title` to render in the gradient accent; null = no highlight
  subtitle: string;
  primaryCtaLabel: string; // the only CTA — FR-004
  primaryCtaLink: string;
  image: SectionImage | null; // null → defensive placeholder (FR-005)
}

export interface IconCard {
  order: number;
  title: string;
  description: string;
  icon: SectionIcon | null; // rendered only when present — no fallback (FR-019)
}

export interface WhatWeBuildSection {
  type: "whatWeBuild";
  order: number;
  eyebrow: string;
  title: string;
  cards: IconCard[];
}

export interface StepCard {
  order: number; // array position — React key only, not displayed
  stepLabel: string; // CMS-supplied, e.g. "01".."06" — rendered as the visible label
  title: string;
  description: string;
}

export interface ProductLifecycleSection {
  type: "productLifecycle";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  cards: StepCard[];
}

export interface EngineeringServicesSection {
  type: "engineeringServices";
  order: number;
  eyebrow: string;
  title: string;
  cards: IconCard[];
}

export interface SolutionTile {
  order: number;
  title: string;
}

export interface SolutionsWeSupportSection {
  type: "solutionsWeSupport";
  order: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  tiles: SolutionTile[];
}

// Mirrors Construction's CaseStudySummary/ImpactSection shape (cms/types/construction.ts) —
// "Featured Capabilities" now reuses the same `industries-construction.proven-impact` CMS
// component, so its presentation shape and card treatment match Construction's Proven Impact.
export interface CapabilityCard {
  order: number;
  metric: string; // caseStudyCards[].name ?? "" — rendered only when non-empty
  label: string; // caseStudyCards[].caseLabel ?? ""
  title: string;
  description: string;
  linkLabel: string; // caseStudyCards[].ctaLabel ?? "Read case study"
  link: string;
}

export interface FeaturedCapabilitiesSection {
  type: "featuredCapabilities";
  order: number;
  eyebrow: string;
  title: string;
  cards: CapabilityCard[];
}

export interface SystemCategory {
  order: number;
  name: string;
  items: string[];
}

export interface ConnectedSystemsSection {
  type: "connectedSystems";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  categories: SystemCategory[];
}

export interface FinalCtaSection {
  type: "finalCta";
  order: number;
  eyebrow: string;
  title: string;
  titleHighlight: string | null;
  description: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
}

// `| undefined` is explicit and load-bearing: with no static fallback, any section the CMS
// doesn't return (or that fails to map) is genuinely absent, not defaulted (FR-003).
export type PageSectionEntry =
  | HeroSection
  | WhatWeBuildSection
  | ProductLifecycleSection
  | EngineeringServicesSection
  | SolutionsWeSupportSection
  | FeaturedCapabilitiesSection
  | ConnectedSystemsSection
  | FinalCtaSection
  | undefined;

export interface HealthcarePageContent {
  seo: PageSeo;
  sections: PageSectionEntry[];
}

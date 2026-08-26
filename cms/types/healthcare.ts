import type { StrapiCtaBannerSection, StrapiHeroSection } from "../shared/reusable-sections";
import type {
  EngineeringServicesSection,
  FeaturedCapabilitiesSection,
  ProductLifecycleSection,
  SolutionsWeSupportSection,
  StrapiModernizationChallengesSection,
  StrapiModernizationFeature,
  StrapiProvenImpactSection,
  StrapiServiceDetailSection,
  WhatWeBuildSection,
} from "../shared/industry-sections";

export type { SectionIcon } from "../shared/reusable-sections";
export type {
  StrapiApproachStep,
  StrapiCaseStudyCard,
  StrapiModernizationChallengesSection,
  StrapiModernizationFeature,
  StrapiProvenImpactSection,
  StrapiServiceDetailSection,
  IconCard,
  WhatWeBuildSection,
  StepCard,
  ProductLifecycleSection,
  EngineeringServicesSection,
  SolutionTile,
  SolutionsWeSupportSection,
  CapabilityCard,
  FeaturedCapabilitiesSection,
} from "../shared/industry-sections";

// ---------------------------------------------------------------------------
// Strapi-side raw shapes — healthcare-only. Every shape shared with other Industries pages
// (service-detail, modernization-challenges, proven-impact) now lives in
// ../shared/industry-sections.ts instead of being redeclared here.
// ---------------------------------------------------------------------------

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

// IconCard, WhatWeBuildSection, StepCard, ProductLifecycleSection, EngineeringServicesSection,
// SolutionTile, SolutionsWeSupportSection, CapabilityCard, FeaturedCapabilitiesSection now live in
// ../shared/industry-sections.ts (shared with FinTech) — re-exported below instead of redeclared.

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

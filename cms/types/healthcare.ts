import type { StrapiCtaBannerSection, StrapiHeroSection } from "../shared/reusable-sections";
import type {
  ConnectedSystemsSection,
  EngineeringServicesSection,
  FeaturedCapabilitiesSection,
  ProductLifecycleSection,
  SolutionsWeSupportSection,
  StrapiHealthCareSystemSection,
  StrapiModernizationChallengesSection,
  StrapiProvenImpactSection,
  StrapiServiceDetailSection,
  WhatWeBuildSection,
} from "../shared/industry-sections";

export type { SectionIcon } from "../shared/reusable-sections";
export type {
  StrapiApproachStep,
  StrapiCaseStudyCard,
  StrapiHealthCareSystemSection,
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
  SystemCategory,
  ConnectedSystemsSection,
} from "../shared/industry-sections";

// ---------------------------------------------------------------------------
// Strapi-side raw shapes — healthcare-only. Every shape shared with other Industries pages
// (service-detail, modernization-challenges, proven-impact) now lives in
// ../shared/industry-sections.ts instead of being redeclared here.
// ---------------------------------------------------------------------------

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
// SolutionTile, SolutionsWeSupportSection, CapabilityCard, FeaturedCapabilitiesSection,
// SystemCategory, ConnectedSystemsSection now live in ../shared/industry-sections.ts (shared
// with Construction) — re-exported above instead of redeclared.

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

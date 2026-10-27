import type { StrapiCtaBannerSection, StrapiHeroSection } from "../shared/reusable-sections";
import type {
  EngineeringServicesSection,
  FeaturedCapabilitiesSection,
  ProductLifecycleSection,
  SolutionsWeSupportSection,
  StrapiModernizationChallengesSection,
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
// Strapi-side raw shapes — FinTech has no Connected-Systems-equivalent section (excluded per
// spec, and absent from the live CMS payload), so its section union is shorter than
// Healthcare's. Every shape it does need is shared with Healthcare via ../shared/industry-sections.ts.
// ---------------------------------------------------------------------------

// Any other, truly unmapped component comes back with this shape and is ignored.
export type StrapiUnmappedSection = { __component: string };

export type StrapiFintechSection =
  | StrapiHeroSection
  | StrapiServiceDetailSection
  | StrapiModernizationChallengesSection
  | StrapiProvenImpactSection
  | StrapiCtaBannerSection
  | StrapiUnmappedSection;

export type StrapiFintechPage = {
  seo: {
    metaTitle: string | null;
    metaDescription: string | null;
  } | null;
  sections: StrapiFintechSection[];
};

// ---------------------------------------------------------------------------
// Presentational shapes — what the page's components actually render.
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
  primaryCtaLabel: string; // the only CTA
  primaryCtaLink: string;
  image: SectionImage | null; // null → defensive placeholder
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
// doesn't return (or that fails to map) is genuinely absent, not defaulted.
export type PageSectionEntry =
  | HeroSection
  | WhatWeBuildSection
  | ProductLifecycleSection
  | EngineeringServicesSection
  | SolutionsWeSupportSection
  | FeaturedCapabilitiesSection
  | FinalCtaSection
  | undefined;

export interface FintechPageContent {
  seo: PageSeo;
  sections: PageSectionEntry[];
}

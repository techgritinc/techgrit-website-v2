import type { StrapiMedia } from "../types/strapi-common";
import { mapSectionIcon, type SectionIcon } from "./reusable-sections";

// Strapi shapes + presentation shapes + mappers for the CMS component family shared by every
// Industries page built on the "approach steps" / "modernization challenges" / "proven impact"
// templates (Healthcare, FinTech, and any future industry page reusing the same templates).
// Kept separate from `reusable-sections.ts` (hero/stats/cta-banner/case-study-card), which is
// reused far more broadly across unrelated page families — these shapes are specific to this
// one family of similar industry pages.

export type StrapiApproachStep = {
  title: string;
  subtitle: string | null;
  stepLabel: string | null;
  icon: StrapiMedia | null;
};

// Reused for "What We Build" / product-lifecycle / engineering-services sections. Disambiguate
// by the section's `serviceLabel` field (not `variant`, which can collide across entries).
export type StrapiServiceDetailSection = {
  __component: "page-reusable-sections.service-detail";
  title: string;
  subtitle: string | null;
  serviceLabel: string;
  variant: string;
  approachSteps: StrapiApproachStep[];
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

// --- Presentation shapes ---

export interface IconCard {
  order: number;
  title: string;
  description: string;
  icon: SectionIcon | null; // rendered only when present — no fallback
}

export interface WhatWeBuildSection {
  type: "whatWeBuild";
  order: number;
  eyebrow: string;
  title: string;
  description: string; // section-level intro paragraph, rendered only when non-empty
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

export interface CapabilityCard {
  order: number;
  metric: string; // caseStudyCards[].name ?? "" — rendered only when non-empty
  label: string; // caseStudyCards[].caseLabel ?? ""
  title: string;
  description: string;
  linkLabel: string; // caseStudyCards[].ctaLabel ?? ""
  link: string;
}

export interface FeaturedCapabilitiesSection {
  type: "featuredCapabilities";
  order: number;
  eyebrow: string;
  title: string;
  cards: CapabilityCard[];
}

// --- Mappers ---

export function mapWhatWeBuild(cms: StrapiServiceDetailSection, order: number): WhatWeBuildSection {
  return {
    type: "whatWeBuild",
    order,
    eyebrow: cms.serviceLabel,
    title: cms.title,
    description: cms.subtitle ?? "",
    cards: cms.approachSteps.map((step, index) => ({
      order: index + 1,
      title: step.title,
      description: step.subtitle ?? "",
      icon: mapSectionIcon(step.icon),
    })),
  };
}

export function mapProductLifecycle(
  cms: StrapiServiceDetailSection,
  order: number,
  titleOverride?: string
): ProductLifecycleSection {
  return {
    type: "productLifecycle",
    order,
    eyebrow: cms.serviceLabel,
    title: titleOverride ?? cms.title,
    description: cms.subtitle ?? "",
    cards: cms.approachSteps.map((step, index) => ({
      order: index + 1,
      stepLabel: step.stepLabel ?? String(index + 1),
      title: step.title,
      description: step.subtitle ?? "",
    })),
  };
}

export function mapEngineeringServices(
  cms: StrapiServiceDetailSection,
  order: number,
  titleOverride?: string
): EngineeringServicesSection {
  return {
    type: "engineeringServices",
    order,
    eyebrow: cms.serviceLabel,
    title: titleOverride ?? cms.title,
    cards: cms.approachSteps.map((step, index) => ({
      order: index + 1,
      title: step.title,
      description: step.subtitle ?? "",
      icon: mapSectionIcon(step.icon), // no fallback when null
    })),
  };
}

export function mapSolutionsWeSupport(
  cms: StrapiModernizationChallengesSection,
  order: number
): SolutionsWeSupportSection {
  return {
    type: "solutionsWeSupport",
    order,
    eyebrow: cms.eyebrow ?? "",
    title: cms.title,
    subtitle: cms.subtitle ?? "",
    tiles: cms.blockers.features.map((feature, index) => ({
      order: index + 1,
      title: feature.title,
    })),
  };
}

export function mapFeaturedCapabilities(
  cms: StrapiProvenImpactSection,
  order: number
): FeaturedCapabilitiesSection {
  return {
    type: "featuredCapabilities",
    order,
    eyebrow: cms.badgeLabel,
    title: cms.title,
    cards: cms.caseStudyCards.map((card, index) => ({
      order: index + 1,
      metric: card.name ?? "",
      label: card.caseLabel ?? "",
      title: card.title,
      description: card.subtitle,
      linkLabel: card.ctaLabel,
      link: card.ctaLink,
    })),
  };
}

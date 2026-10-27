export type { StrapiMedia } from "./ai-modernization-types";
import type { StrapiMedia } from "./ai-modernization-types";

export type StrapiDataAiEngineeringHeroSection = {
  title: string;
  subtitle: string;
  primaryBtnLabel: string;
  primaryBtnLink: string;
  secondaryBtnLabel: string | null;
  secondaryBtnLink: string | null;
  badgeLabel: string;
  highlightTitle: string;
  backgroundImage: StrapiMedia[];
  __component: "page-reusable-sections.hero";
};

export type StrapiFeature = {
  id: number;
  title: string;
  subtitle: string | null;
  icon: StrapiMedia | null;
};

// This page's own occurrence has shipped `blockers: null` — unlike the sibling
// AI-Accelerated Modernization page's own occurrences, which always carry a populated
// `blockers` object. Modeled as nullable here rather than assumed-present.
export type StrapiDataAiEngineeringChallengesSection = {
  title: string;
  subtitle: string;
  eyebrow: string | null;
  extraTitle: string | null;
  blockers: {
    name: string;
    features: StrapiFeature[];
  } | null;
  __component: "page-reusable-sections.modernization-challenges";
};

export type StrapiStructureInfo = {
  label: string | null;
  description: string;
};

export type StrapiCapabilityCard = {
  id: number;
  categoryLabel: string;
  title: string;
  subtitle: string;
  structureInfo: StrapiStructureInfo | null;
  features: StrapiFeature[];
};

export type StrapiDataAiEngineeringCapabilitiesSection = {
  title: string;
  subtitle: string;
  badgeLabel: string | null;
  capabilityCard: StrapiCapabilityCard[];
  __component: "page-reusable-sections.pd-modernization-capabilities";
};

export type StrapiApproachStep = {
  id: number;
  title: string;
  subtitle: string | null;
  stepLabel: string | null;
  icon: StrapiMedia | null;
};

// Repeats five times in this page's dynamic zone (lifecycle, strategies/frameworks, why,
// industries, and a plain "Why Choose TechGrit?" text block) — `variant` distinguishes
// which; an empty `approachSteps` (the "Why Choose TechGrit?" occurrence) renders as a
// plain Outcome block, matching both sibling pages' identical disambiguation rule.
export type StrapiServiceDetailSection = {
  title: string;
  subtitle: string | null;
  serviceLabel: string | null;
  variant: string;
  approachSteps: StrapiApproachStep[];
  __component: "page-reusable-sections.service-detail";
};

export type StrapiFaqQuestion = {
  id: number;
  question: string;
  answer: string;
  icon: StrapiMedia | null;
};

export type StrapiDataAiEngineeringFaqSection = {
  title: string;
  subtitle: string | null;
  questions: StrapiFaqQuestion[];
  __component: "page-reusable-sections.pd-faq";
};

export type StrapiDataAiEngineeringCtaBannerSection = {
  title: string;
  subtitle: string;
  highlightTitle: string | null;
  badgeLabel: string;
  primaryCtaLabel: string | null;
  primaryCtaLink: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaLink: string | null;
  __component: "page-reusable-sections.cta-banner";
};

export type StrapiDataAiEngineeringSection =
  | StrapiDataAiEngineeringHeroSection
  | StrapiDataAiEngineeringChallengesSection
  | StrapiDataAiEngineeringCapabilitiesSection
  | StrapiServiceDetailSection
  | StrapiDataAiEngineeringFaqSection
  | StrapiDataAiEngineeringCtaBannerSection;

export type StrapiDataAiEngineeringPage = {
  seo: { metaTitle: string; metaDescription: string } | null;
  sections: StrapiDataAiEngineeringSection[];
};

import type { StrapiMedia } from "./header-types";

export type StrapiOrbitAiHeroSection = {
  title: string;
  highlightTitle: string;
  subtitle: string;
  primaryBtnLabel: string;
  primaryBtnLink: string;
  secondaryBtnLabel: string | null;
  secondaryBtnLink: string | null;
  badgeLabel: string;
  backgroundImage: StrapiMedia[];
  __component: "page-reusable-sections.hero";
};

export type StrapiOrbitAiFeature = {
  id: number;
  title: string;
  subtitle: string | null;
  icon: StrapiMedia | null;
};

// Repeats twice: "From AI Opportunity to Business Impact" (no blockers — plain
// centered text) and "Built for Real-World Engineering" (blockers present, each
// with a real icon). Unlike the sibling ai-modernization schema, `blockers`
// itself is nullable here — the CMS omits it entirely for the no-chips occurrence.
export type StrapiOrbitAiChallengesSection = {
  title: string;
  subtitle: string;
  eyebrow: string | null;
  extraTitle: string | null;
  blockers: {
    name: string | null;
    features: StrapiOrbitAiFeature[];
  } | null;
  __component: "page-reusable-sections.modernization-challenges";
};

export type StrapiOrbitAiStructureInfo = {
  label: string | null;
  description: string;
};

export type StrapiOrbitAiCapabilityCard = {
  id: number;
  categoryLabel: string | null;
  title: string | null;
  subtitle: string | null;
  structureInfo: StrapiOrbitAiStructureInfo | null;
  features: StrapiOrbitAiFeature[];
};

// Repeats twice: "How OrbitAI Works" (5 fully-populated cards — categoryLabel/
// title/subtitle/features bullets) and "One Integrated Path" (exactly 1 card
// with categoryLabel/title/subtitle all null — its `features` are the 5
// framework names+descriptions, and `structureInfo` is the closing "result").
export type StrapiOrbitAiCapabilitiesSection = {
  title: string;
  subtitle: string;
  badgeLabel: string;
  capabilityCard: StrapiOrbitAiCapabilityCard[];
  __component: "page-reusable-sections.pd-modernization-capabilities";
};

export type StrapiOrbitAiApproachStep = {
  id: number;
  title: string;
  subtitle: string | null;
  stepLabel: string | null;
  icon: StrapiMedia | null;
};

// Repeats three times — `variant` distinguishes "What OrbitAI Helps You
// Achieve" (PD-modernizationLifecycle, icons present), "From Understanding to
// Working Software" (PD-strategiesWeSupport, no icons), and "Built for the
// real complexity of enterprise modernization" (PD-whyAI-assistedModernization,
// icons present).
export type StrapiOrbitAiServiceDetailSection = {
  title: string;
  subtitle: string | null;
  serviceLabel: string | null;
  variant: string;
  approachSteps: StrapiOrbitAiApproachStep[];
  __component: "page-reusable-sections.service-detail";
};

export type StrapiOrbitAiCtaBannerSection = {
  title: string;
  highlightTitle: string | null;
  subtitle: string;
  badgeLabel: string;
  primaryCtaLabel: string | null;
  primaryCtaLink: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaLink: string | null;
  __component: "page-reusable-sections.cta-banner";
};

export type StrapiOrbitAiSection =
  | StrapiOrbitAiHeroSection
  | StrapiOrbitAiChallengesSection
  | StrapiOrbitAiCapabilitiesSection
  | StrapiOrbitAiServiceDetailSection
  | StrapiOrbitAiCtaBannerSection;

export type StrapiOrbitAiPage = {
  seo: { metaTitle: string | null; metaDescription: string | null } | null;
  sections: StrapiOrbitAiSection[];
};

// ---------------------------------------------------------------------------
// Rendering-oriented types (consumed by app/how-we-work/orbit-ai-ecosystem/*)
// ---------------------------------------------------------------------------

export interface SectionImage {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

export interface HeroSection {
  type: "hero";
  order: number;
  badgeLabel: string;
  title: string;
  titleHighlight: string; // exact substring of `title` rendered via the .text-gradient span
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  image: SectionImage | null;
}

export interface ChallengeChip {
  id: string;
  label: string;
  icon: SectionImage | null;
}

// Renders centered (no chips grid) when `chips` is empty — "From AI Opportunity
// to Business Impact"; renders title + description + icon-chip grid when chips
// are present — "Built for Real-World Engineering". `eyebrow` falls back to
// `title` when the CMS's own `eyebrow` field is null (same convention as
// `cms/api/what-we-do/ai-modernization.ts`'s `toIntroSection`).
export interface ChallengesSection {
  type: "challenges";
  order: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  extraTitle?: string;
  chips: ChallengeChip[];
}

export interface FrameworkCardFeature {
  id: string;
  text: string;
}

export interface FrameworkCard {
  id: string;
  categoryLabel: string;
  title: string;
  subtitle: string;
  features: FrameworkCardFeature[];
  outcomeLabel?: string;
  outcomeText?: string;
}

export interface CapabilitiesSection {
  type: "capabilities";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  cards: FrameworkCard[];
}

export interface IntegratedPathFeature {
  id: string;
  title: string;
  subtitle: string;
}

export interface IntegratedPathSection {
  type: "integratedPath";
  order: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  features: IntegratedPathFeature[];
  resultLabel?: string;
  resultText?: string;
}

export interface ServiceStep {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  icon: SectionImage | null;
}

export type ServiceDetailVariant = "achieve" | "understanding" | "why";

export interface ServiceDetailSection {
  type: "serviceDetail";
  order: number;
  variant: ServiceDetailVariant;
  serviceLabel?: string;
  title: string;
  subtitle?: string;
  steps: ServiceStep[];
}

export interface FinalCtaSection {
  type: "finalCta";
  order: number;
  badgeLabel: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
}

export type OrbitAiSection =
  | HeroSection
  | ChallengesSection
  | CapabilitiesSection
  | IntegratedPathSection
  | ServiceDetailSection
  | FinalCtaSection;

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface OrbitAiPageContent {
  seo: PageSeo;
  sections: OrbitAiSection[];
}

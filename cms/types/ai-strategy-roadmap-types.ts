export type StrapiImageFormat = {
  url: string;
  width: number;
  height: number;
};

export type StrapiMedia = {
  id: number;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  } | null;
};

export type StrapiAiStrategyRoadmapHeroSection = {
  title: string;
  subtitle: string;
  primaryBtnLabel: string;
  primaryBtnLink: string;
  secondaryBtnLabel: string | null;
  secondaryBtnLink: string | null;
  badgeLabel: string;
  highlightTitle: string | null;
  backgroundImage: StrapiMedia[];
  __component: "page-reusable-sections.hero";
};

export type StrapiFeature = {
  id: number;
  title: string;
  subtitle: string | null;
  icon: StrapiMedia | null;
};

// This page's own occurrence has shipped `eyebrow: null` and `extraTitle: null` — same
// nullable shape as the sibling "What We Do" pages' own occurrences of this shared
// component (e.g. Platform Engineering).
export type StrapiAiStrategyRoadmapChallengesSection = {
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
  description: string | null;
};

export type StrapiCapabilityCard = {
  id: number;
  categoryLabel: string;
  title: string;
  subtitle: string;
  structureInfo: StrapiStructureInfo | null;
  features: StrapiFeature[];
};

export type StrapiAiStrategyRoadmapCapabilitiesSection = {
  title: string;
  subtitle: string | null;
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

// Repeats four times in this page's dynamic zone (lifecycle, why, advisory segments, and
// a "CTO as a Service Capabilities" text block with zero approachSteps) — `variant`
// distinguishes which. The zero-approachSteps occurrence isn't part of this page's
// design and is dropped by the mapper (no case for its variant), same precedent as an
// unrecognized `__component` being dropped.
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

export type StrapiAiStrategyRoadmapFaqSection = {
  title: string;
  subtitle: string | null;
  questions: StrapiFaqQuestion[];
  __component: "page-reusable-sections.pd-faq";
};

// Same swapped-field CMS quirk as the sibling "What We Do" pages' own CTA banners:
// `primaryCtaLink` has shipped null while the real destination landed in
// `secondaryCtaLink` (with `secondaryCtaLabel` also null) — handled in the mapper, not
// here.
export type StrapiAiStrategyRoadmapCtaBannerSection = {
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

export type StrapiAiStrategyRoadmapSection =
  | StrapiAiStrategyRoadmapHeroSection
  | StrapiAiStrategyRoadmapChallengesSection
  | StrapiAiStrategyRoadmapCapabilitiesSection
  | StrapiServiceDetailSection
  | StrapiAiStrategyRoadmapFaqSection
  | StrapiAiStrategyRoadmapCtaBannerSection;

export type StrapiAiStrategyRoadmapPage = {
  seo: { metaTitle: string; metaDescription: string } | null;
  sections: StrapiAiStrategyRoadmapSection[];
};

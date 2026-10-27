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

export type StrapiAiModernizationHeroSection = {
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

// Repeats twice in the dynamic zone ("Modernization Is More Than Migration" and
// "Our AI-Assisted Modernization Approach") — both render via the same ContentBlock.
export type StrapiModernizationChallengesSection = {
  title: string;
  subtitle: string;
  eyebrow: string | null;
  extraTitle: string;
  blockers: {
    name: string;
    features: StrapiFeature[];
  };
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

export type StrapiModernizationCapabilitiesSection = {
  title: string;
  subtitle: string;
  badgeLabel: string;
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

// Repeats five times in the dynamic zone (lifecycle, strategies, why, industries, and a
// plain "Why TechGrit?" text block) — `variant` distinguishes which; an empty
// `approachSteps` (the "Why TechGrit?" occurrence) renders as a plain Outcome block.
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

export type StrapiAiModernizationFaqSection = {
  title: string;
  subtitle: string | null;
  questions: StrapiFaqQuestion[];
  __component: "page-reusable-sections.pd-faq";
};

export type StrapiAiModernizationCtaBannerSection = {
  title: string;
  subtitle: string;
  badgeLabel: string;
  primaryCtaLabel: string | null;
  primaryCtaLink: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaLink: string | null;
  __component: "page-reusable-sections.cta-banner";
};

export type StrapiAiModernizationSection =
  | StrapiAiModernizationHeroSection
  | StrapiModernizationChallengesSection
  | StrapiModernizationCapabilitiesSection
  | StrapiServiceDetailSection
  | StrapiAiModernizationFaqSection
  | StrapiAiModernizationCtaBannerSection;

export type StrapiAiModernizationPage = {
  seo: { metaTitle: string; metaDescription: string } | null;
  sections: StrapiAiModernizationSection[];
};

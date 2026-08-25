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

export type StrapiSoftwareProductEngineeringHeroSection = {
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

// `extraTitle` and `blockers` have both shipped null for this page's occurrence of the
// component (unlike AI-Accelerated Modernization's, where both are always populated) —
// every field here is nullable to match what the CMS actually returns.
export type StrapiModernizationChallengesSection = {
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

// Repeats in the dynamic zone (lifecycle, strategies, why, industries, and a plain
// "Why TechGrit?" text block) — `variant` distinguishes which; an empty `approachSteps`
// renders as a plain Outcome block (matches the sibling AI-Accelerated Modernization
// page's own `service-detail` handling for the same shared Strapi component).
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

export type StrapiSoftwareProductEngineeringFaqSection = {
  title: string;
  subtitle: string | null;
  questions: StrapiFaqQuestion[];
  __component: "page-reusable-sections.pd-faq";
};

export type StrapiSoftwareProductEngineeringCtaBannerSection = {
  title: string;
  subtitle: string;
  badgeLabel: string;
  primaryCtaLabel: string | null;
  primaryCtaLink: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaLink: string | null;
  __component: "page-reusable-sections.cta-banner";
};

export type StrapiSoftwareProductEngineeringSection =
  | StrapiSoftwareProductEngineeringHeroSection
  | StrapiModernizationChallengesSection
  | StrapiModernizationCapabilitiesSection
  | StrapiServiceDetailSection
  | StrapiSoftwareProductEngineeringFaqSection
  | StrapiSoftwareProductEngineeringCtaBannerSection;

export type StrapiSoftwareProductEngineeringPage = {
  seo: { metaTitle: string; metaDescription: string } | null;
  sections: StrapiSoftwareProductEngineeringSection[];
};

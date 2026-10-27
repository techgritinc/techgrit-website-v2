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

export type StrapiStartupsHeroSection = {
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

export type StrapiStartupsChallengesSection = {
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

// This `__component` occurs twice in this page's dynamic zone with no `variant` field
// to distinguish them (unlike `service-detail` below) — the growth-journey occurrence
// (badgeLabel "We grow with you") and the capabilities occurrence (badgeLabel "What we
// build for startups") are told apart by `badgeLabel` in the mapper, not by type.
export type StrapiStartupsCapabilitiesSection = {
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

// Repeats twice in this page's dynamic zone (why, who-we-help) — `variant` distinguishes
// which, same precedent as every sibling "What We Do" page's own `service-detail` use.
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

export type StrapiStartupsFaqSection = {
  title: string;
  subtitle: string | null;
  questions: StrapiFaqQuestion[];
  __component: "page-reusable-sections.pd-faq";
};

// Same swapped-field CMS quirk as every sibling "What We Do" page's own CTA banner:
// `primaryCtaLink` has shipped null while the real destination landed in
// `secondaryCtaLink` (with `secondaryCtaLabel` also null) — handled in the mapper.
export type StrapiStartupsCtaBannerSection = {
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

export type StrapiStartupsSection =
  | StrapiStartupsHeroSection
  | StrapiStartupsChallengesSection
  | StrapiStartupsCapabilitiesSection
  | StrapiServiceDetailSection
  | StrapiStartupsFaqSection
  | StrapiStartupsCtaBannerSection;

export type StrapiStartupsPage = {
  seo: { metaTitle: string; metaDescription: string } | null;
  sections: StrapiStartupsSection[];
};

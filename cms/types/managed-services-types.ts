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

export type StrapiManagedServicesHeroSection = {
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

// This page's own occurrence carries a real `eyebrow`/`extraTitle`/`blockers` — the
// "Move Beyond Traditional Support" challenges card that an earlier CMS response had
// folded into the first `pd-modernization-capabilities` card is now its own proper
// top-level section.
export type StrapiManagedServicesChallengesSection = {
  title: string;
  subtitle: string;
  eyebrow: string | null;
  extraTitle: string | null;
  blockers: {
    id: number;
    name: string;
    features: StrapiFeature[];
  } | null;
  __component: "page-reusable-sections.modernization-challenges";
};

export type StrapiStructureInfo = {
  label: string | null;
  description: string | null;
};

// This page's own occurrence ships `categoryLabel: null` on a couple of cards (their
// heading is carried by `title` alone in that case) — nullability confirmed against two
// successive real responses for this page, not assumed from a sibling.
export type StrapiCapabilityCard = {
  id: number;
  categoryLabel: string | null;
  title: string | null;
  subtitle: string;
  structureInfo: StrapiStructureInfo | null;
  features: StrapiFeature[];
};

// This page's own occurrence ships `title: null`, `subtitle: null`, and `badgeLabel:
// null` at the section level too — modeled as nullable here rather than assumed-present.
export type StrapiManagedServicesCapabilitiesSection = {
  title: string | null;
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

// Repeats five times in this page's dynamic zone (lifecycle, strategies/frameworks, why,
// industries, and a plain "Why Choose TechGrit?" text block) — `variant` distinguishes
// which; an empty `approachSteps` (the plain-text occurrence) renders as an Outcome block,
// same disambiguation rule as every sibling "What We Do" page's own mapper. `extraTitle`
// carries a real supporting statement on this page's own "why" occurrence — a field the
// sibling pages' own type files never declared because it was always null for them.
export type StrapiServiceDetailSection = {
  title: string;
  subtitle: string | null;
  serviceLabel: string | null;
  variant: string;
  extraTitle: string | null;
  approachSteps: StrapiApproachStep[];
  __component: "page-reusable-sections.service-detail";
};

export type StrapiFaqQuestion = {
  id: number;
  question: string;
  answer: string;
  icon: StrapiMedia | null;
};

export type StrapiManagedServicesFaqSection = {
  title: string;
  subtitle: string | null;
  questions: StrapiFaqQuestion[];
  __component: "page-reusable-sections.pd-faq";
};

export type StrapiManagedServicesCtaBannerSection = {
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

export type StrapiManagedServicesSection =
  | StrapiManagedServicesHeroSection
  | StrapiManagedServicesChallengesSection
  | StrapiManagedServicesCapabilitiesSection
  | StrapiServiceDetailSection
  | StrapiManagedServicesFaqSection
  | StrapiManagedServicesCtaBannerSection;

export type StrapiManagedServicesPage = {
  seo: { metaTitle: string; metaDescription: string } | null;
  sections: StrapiManagedServicesSection[];
};

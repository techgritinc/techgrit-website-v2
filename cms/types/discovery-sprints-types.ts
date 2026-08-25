import type { StrapiMedia } from "./header-types";

export type StrapiDiscoverySprintsHeroSection = {
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

export type StrapiDiscoverySprintsFeature = {
  id: number;
  title: string;
  subtitle: string | null;
  icon: StrapiMedia | null;
};

export type StrapiDiscoverySprintsChallengesSection = {
  title: string;
  subtitle: string | null;
  eyebrow: string | null;
  extraTitle: string | null;
  blockers: {
    name: string | null;
    features: StrapiDiscoverySprintsFeature[];
  } | null;
  __component: "page-reusable-sections.modernization-challenges";
};

export type StrapiDiscoverySprintsStructureInfo = {
  label: string | null;
  description: string;
};

export type StrapiDiscoverySprintsCapabilityCard = {
  id: number;
  categoryLabel: string | null;
  title: string | null;
  subtitle: string | null;
  structureInfo: StrapiDiscoverySprintsStructureInfo | null;
  features: StrapiDiscoverySprintsFeature[];
};

export type StrapiDiscoverySprintsCapabilitiesSection = {
  title: string;
  subtitle: string;
  badgeLabel: string;
  capabilityCard: StrapiDiscoverySprintsCapabilityCard[];
  __component: "page-reusable-sections.pd-modernization-capabilities";
};

export type StrapiDiscoverySprintsApproachStep = {
  id: number;
  title: string;
  subtitle: string | null;
  stepLabel: string | null;
  icon: StrapiMedia | null;
};

export type StrapiDiscoverySprintsServiceDetailSection = {
  title: string;
  subtitle: string | null;
  serviceLabel: string | null;
  variant: string;
  approachSteps: StrapiDiscoverySprintsApproachStep[];
  __component: "page-reusable-sections.service-detail";
};

export type StrapiDiscoverySprintsFaqQuestion = {
  id: number;
  question: string;
  answer: string;
  icon: StrapiMedia | null;
};

export type StrapiDiscoverySprintsFaqSection = {
  title: string;
  subtitle: string | null;
  questions: StrapiDiscoverySprintsFaqQuestion[];
  __component: "page-reusable-sections.pd-faq";
};

export type StrapiDiscoverySprintsCtaBannerSection = {
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

export type StrapiDiscoverySprintsSection =
  | StrapiDiscoverySprintsHeroSection
  | StrapiDiscoverySprintsChallengesSection
  | StrapiDiscoverySprintsCapabilitiesSection
  | StrapiDiscoverySprintsServiceDetailSection
  | StrapiDiscoverySprintsFaqSection
  | StrapiDiscoverySprintsCtaBannerSection;

export type StrapiDiscoverySprintsPage = {
  seo: { metaTitle: string | null; metaDescription: string | null } | null;
  sections: StrapiDiscoverySprintsSection[];
};

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
  titleHighlight: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  image: SectionImage | null;
}

export interface ChipItem {
  id: string;
  label: string;
  icon: SectionImage | null;
}

export interface IntroSection {
  type: "intro";
  order: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  extraTitle?: string;
  chipsLabel?: string;
  chips: ChipItem[];
}

export interface PhaseZeroSection {
  type: "phaseZero";
  order: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  cardTitle: string;
  cardDescription: string;
}

export interface DeliverableCard {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface DeliverablesSection {
  type: "deliverables";
  order: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  deliverables: DeliverableCard[];
}

export interface IdealForSection {
  type: "idealFor";
  order: number;
  title: string;
  items: { id: string; label: string }[];
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
}

export interface CapabilitiesSection {
  type: "capabilities";
  order: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  cards: FrameworkCard[];
}

export interface ServiceStep {
  id: string;
  order: number;
  title: string;
  subtitle: string;
  icon: SectionImage | null;
}

export type ServiceDetailVariant = "why" | "lifecycle";

export interface ServiceDetailSection {
  type: "serviceDetail";
  order: number;
  variant: ServiceDetailVariant;
  serviceLabel?: string;
  title: string;
  subtitle?: string;
  steps: ServiceStep[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqSection {
  type: "faq";
  order: number;
  eyebrow: string;
  title: string;
  items: FaqItem[];
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

export type DiscoverySprintsSection =
  | HeroSection
  | IntroSection
  | PhaseZeroSection
  | DeliverablesSection
  | IdealForSection
  | CapabilitiesSection
  | ServiceDetailSection
  | FaqSection
  | FinalCtaSection;

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface DiscoverySprintsPageContent {
  seo: PageSeo;
  sections: DiscoverySprintsSection[];
}

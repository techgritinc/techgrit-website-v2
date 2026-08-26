export type { StrapiMedia } from "./ai-modernization-types";
import type { StrapiMedia } from "./ai-modernization-types";
import type { StrapiHeroSection, StrapiStatisticsSection, StrapiCtaBannerSection } from "../shared/reusable-sections";

export type { StrapiHeroSection, StrapiStatisticsSection, StrapiCtaBannerSection };

export type StrapiFeature = {
  id: number;
  title: string;
  subtitle: string | null;
  icon: StrapiMedia | null;
};

// Unlike the Data & AI Engineering / AI-Accelerated Modernization pages' occurrences of this
// component, this page's "Why lenders call us" section ships `eyebrow` populated directly (no
// title→eyebrow reinterpretation needed) and `blockers` is always present (never null).
export type StrapiChallengesSection = {
  title: string;
  subtitle: string;
  eyebrow: string | null;
  extraTitle: string | null;
  blockers: {
    name: string | null;
    features: StrapiFeature[];
  };
  __component: "page-reusable-sections.modernization-challenges";
};

// New component, no prior mapper anywhere in the codebase — the Domain Depth lifecycle tabs.
export type StrapiLendingTabItem = {
  id: number;
  label: string;
  value: string;
  isDefault: boolean | null;
};

export type StrapiLendingControlTab = {
  id: number;
  tabName: string;
  tabValue: string;
  title: string;
  subtitle: string;
  features: StrapiFeature[];
};

export type StrapiLendingLifecycleSection = {
  title: string;
  subtitle: string;
  badgeLabel: string;
  tabItems: StrapiLendingTabItem[];
  controlTabs: StrapiLendingControlTab[];
  __component: "industries-construction.pd-lending-lifecycle";
};

export type StrapiStructureInfo = {
  label: string | null;
  description: string;
};

export type StrapiCapabilityCard = {
  id: number;
  categoryLabel: string;
  title: string | null;
  subtitle: string | null;
  structureInfo: StrapiStructureInfo | null;
  features: StrapiFeature[];
};

// Used three times in this page's dynamic zone (The ecosystem, Our work, Operating context) —
// `badgeLabel` distinguishes which, since all three share this one `__component`.
export type StrapiCapabilitiesSection = {
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

// Repeats four times (Applied AI, Institutional platforms, Quote, How we work) — `variant`
// distinguishes which; the Quote occurrence ships `approachSteps: []`.
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

export type StrapiFaqSection = {
  title: string;
  subtitle: string | null;
  questions: StrapiFaqQuestion[];
  __component: "page-reusable-sections.pd-faq";
};

export type StrapiConsumerLendingSection =
  | StrapiHeroSection
  | StrapiStatisticsSection
  | StrapiChallengesSection
  | StrapiLendingLifecycleSection
  | StrapiCapabilitiesSection
  | StrapiServiceDetailSection
  | StrapiFaqSection
  | StrapiCtaBannerSection;

export type StrapiConsumerLendingPage = {
  seo: { metaTitle: string; metaDescription: string } | null;
  sections: StrapiConsumerLendingSection[];
};

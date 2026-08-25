import type { StrapiMedia } from "./header-types";

// ---------------------------------------------------------------------------
// Raw Strapi shapes
// ---------------------------------------------------------------------------

export type StrapiEngagementModelsHeroSection = {
  title: string;
  highlightTitle: string;
  subtitle: string;
  primaryBtnLabel: string;
  primaryBtnLink: string;
  secondaryBtnLabel: string | null;
  secondaryBtnLink: string | null;
  badgeLabel: string | null;
  backgroundImage: StrapiMedia[];
  __component: "page-reusable-sections.hero";
};

export type StrapiEngagementModelsFeature = {
  id: number;
  title: string;
  subtitle: string | null;
  icon: StrapiMedia | null;
};

export type StrapiEngagementModelsStructureInfo = { label: string | null; description: string };

export type StrapiEngagementModelsCapabilityCard = {
  id: number;
  categoryLabel: string | null;
  title: string | null;
  subtitle: string | null;
  structureInfo: StrapiEngagementModelsStructureInfo | null;
  features: StrapiEngagementModelsFeature[];
};

export type StrapiEngagementModelsCapabilitiesSection = {
  title: string;
  subtitle: string;
  badgeLabel: string | null;
  capabilityCard: StrapiEngagementModelsCapabilityCard[];
  __component: "page-reusable-sections.pd-modernization-capabilities";
};

export type StrapiEngagementModelsChallengesSection = {
  title: string;
  subtitle: string;
  eyebrow: string | null;
  extraTitle: string | null;
  blockers: { name: string | null; features: StrapiEngagementModelsFeature[] } | null;
  __component: "page-reusable-sections.modernization-challenges";
};

export type StrapiAudienceInsightQuestion = {
  id: number;
  question: string;
  answer: string | null;
  icon: StrapiMedia | null;
};

export type StrapiAudienceInsightGroup = {
  id: number;
  title: string;
  questions: StrapiAudienceInsightQuestion[];
};

export type StrapiAudienceInsightSection = {
  title: string;
  subtitle: string | null;
  badgeLabel: string | null;
  summary: string | null;
  concernsCard: StrapiAudienceInsightGroup[];
  __component: "about-us.audience-insight";
};

export type StrapiEngagementModelsCtaBannerSection = {
  title: string;
  highlightTitle: string | null;
  subtitle: string;
  badgeLabel: string | null;
  primaryCtaLabel: string | null;
  primaryCtaLink: string | null;
  secondaryCtaLabel: string | null;
  secondaryCtaLink: string | null;
  __component: "page-reusable-sections.cta-banner";
};

export type StrapiEngagementModelsSection =
  | StrapiEngagementModelsHeroSection
  | StrapiEngagementModelsCapabilitiesSection
  | StrapiEngagementModelsChallengesSection
  | StrapiAudienceInsightSection
  | StrapiEngagementModelsCtaBannerSection;

export type StrapiEngagementModelsPage = {
  seo: { metaTitle: string | null; metaDescription: string | null } | null;
  sections: StrapiEngagementModelsSection[];
};

// ---------------------------------------------------------------------------
// Rendering-oriented types (consumed by app/how-we-work/engagement-models/*)
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
  badgeLabel?: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  image: SectionImage | null;
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
  eyebrow?: string;
  title: string;
  description: string;
  cards: FrameworkCard[];
}

export interface ChallengeChip {
  id: string;
  label: string;
  icon: SectionImage | null;
}

export interface WhySection {
  type: "why";
  order: number;
  eyebrow?: string; // taken directly from CMS `eyebrow`; undefined when null — no fallback (Q8)
  title: string;
  description: string;
  chips: ChallengeChip[];
}

export interface FindFitRow {
  id: string;
  text: string;
  icon?: SectionImage | null;
}

export interface FindFitSection {
  type: "findFit";
  order: number;
  eyebrow?: string; // taken directly from CMS `badgeLabel`; undefined when null — no fallback (Q8 supersedes Q6)
  title: string;
  goalColumn: { label: string; rows: FindFitRow[] };
  modelColumn: { label: string; rows: FindFitRow[] };
}

export interface FinalCtaSection {
  type: "finalCta";
  order: number;
  badgeLabel?: string;
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
}

export type EngagementModelsSection =
  | HeroSection
  | CapabilitiesSection
  | WhySection
  | FindFitSection
  | FinalCtaSection;

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface EngagementModelsPageContent {
  seo: PageSeo;
  sections: EngagementModelsSection[];
}

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface SectionImage {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

export interface HeroSection {
  type: "hero";
  order: number;
  eyebrow: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  image: SectionImage | null;
}

export interface Challenge {
  id: string;
  label: string;
}

export interface IntroSection {
  type: "intro";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  chipsLabel: string;
  chips: Challenge[];
}

export interface GrowthStageBullet {
  id: string;
  text: string;
}

export interface GrowthStage {
  id: string;
  order: number;
  badgeLabel: string;
  title: string;
  lede: string;
  bullets: GrowthStageBullet[];
  highlighted?: boolean;
}

export interface GrowthJourneySection {
  type: "growthJourney";
  order: number;
  eyebrow: string;
  title: string;
  stages: GrowthStage[];
}

export interface CapabilityBullet {
  id: string;
  text: string;
}

export interface Capability {
  id: string;
  order: number;
  stepLabel: string;
  title: string;
  lede: string;
  note?: string;
  bullets: CapabilityBullet[];
}

export interface CapabilitiesSection {
  type: "capabilities";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  capabilities: Capability[];
}

export interface ValuePropositionTile {
  id: string;
  order: number;
  icon: SectionImage | null;
  title: string;
  description: string;
}

export interface WhySection {
  type: "why";
  order: number;
  eyebrow: string;
  title: string;
  tiles: ValuePropositionTile[];
}

export interface FounderSegmentCard {
  id: string;
  order: number;
  icon: SectionImage | null;
  name: string;
  description: string;
}

export interface WhoWeHelpSection {
  type: "whoWeHelp";
  order: number;
  eyebrow: string;
  title: string;
  segments: FounderSegmentCard[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  defaultOpen?: boolean;
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
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
}

export type StartupsSection =
  | HeroSection
  | IntroSection
  | GrowthJourneySection
  | CapabilitiesSection
  | WhySection
  | WhoWeHelpSection
  | FaqSection
  | FinalCtaSection;

export interface StartupsPageContent {
  seo: PageSeo | null;
  sections: StartupsSection[];
}

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

export interface Blocker {
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
  chips: Blocker[];
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

export interface LifecycleStage {
  order: number;
  title: string;
  description: string;
}

export interface LifecycleSection {
  type: "lifecycle";
  order: number;
  eyebrow: string;
  title: string;
  stages: LifecycleStage[];
}

export interface ModernizationStrategy {
  order: number;
  name: string;
  description: string;
}

export interface StrategiesSection {
  type: "strategies";
  order: number;
  eyebrow: string;
  title: string;
  strategies: ModernizationStrategy[];
}

export interface ValuePropositionTile {
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

export interface IndustryCard {
  order: number;
  icon: SectionImage | null;
  name: string;
  description: string;
  href?: string;
}

export interface IndustriesSection {
  type: "industries";
  order: number;
  eyebrow: string;
  title: string;
  industries: IndustryCard[];
}

export interface OutcomeSection {
  type: "outcome";
  order: number;
  eyebrow?: string;
  heading: string;
  description: string;
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

export type SoftwareProductEngineeringSection =
  | HeroSection
  | IntroSection
  | CapabilitiesSection
  | LifecycleSection
  | StrategiesSection
  | WhySection
  | IndustriesSection
  | OutcomeSection
  | FaqSection
  | FinalCtaSection;

export interface SoftwareProductEngineeringPageContent {
  seo: PageSeo | null;
  sections: SoftwareProductEngineeringSection[];
}

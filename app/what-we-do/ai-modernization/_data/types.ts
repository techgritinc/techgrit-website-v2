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
  titleHighlight: string; // exact substring of `title` rendered via the .text-gradient span
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  image: SectionImage | null; // replacement hero-card image (FR-004) — composed into Hero's `media` slot
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
  blockersLabel: string;
  blockers: Blocker[];
}

export interface ModernizationCapability {
  id: string;
  order: number;
  stepLabel: string;
  title: string;
  lede: string;
  note?: string; // optional framework callout (e.g. PRISM™ line) — not every capability has one
  bullets: { id: string; text: string }[];
}

export interface CapabilitiesSection {
  type: "capabilities";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  capabilities: ModernizationCapability[];
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
  href?: string; // the CMS doesn't currently supply a destination for every industry card
}

export interface IndustriesSection {
  type: "industries";
  order: number;
  eyebrow: string;
  title: string;
  industries: IndustryCard[];
}

// Plain heading + description block (FR-012) — the "Why TechGrit?" service-detail
// occurrence, which carries no approachSteps at all.
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

export interface RelatedServiceLink {
  order: number;
  iconKey: string;
  name: string;
  description: string;
  href: string;
}

export interface RelatedServicesSection {
  type: "related";
  order: number;
  title: string;
  seeAllLabel: string;
  seeAllHref: string;
  links: RelatedServiceLink[];
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

export type AiModernizationSection =
  | HeroSection
  | IntroSection
  | CapabilitiesSection
  | LifecycleSection
  | StrategiesSection
  | WhySection
  | IndustriesSection
  | OutcomeSection
  | FaqSection
  | RelatedServicesSection
  | FinalCtaSection;

export interface AiModernizationPageContent {
  seo: PageSeo;
  sections: AiModernizationSection[];
}

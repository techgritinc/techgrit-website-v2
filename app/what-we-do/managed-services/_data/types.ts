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
  titleHighlight: string; // exact substring of `title` rendered via the shared .text-gradient span
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
  stepLabel: string | null; // this page's own CMS content leaves `categoryLabel` null on a couple of cards
  title: string | null; // and leaves `title` null on others — whichever is present doubles as the heading
  lede: string;
  note?: string; // optional outcome callout — not every capability has one
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

export interface ManagedServiceStrategy {
  order: number;
  name: string;
  description: string;
}

export interface StrategiesSection {
  type: "strategies";
  order: number;
  eyebrow: string;
  title: string;
  strategies: ManagedServiceStrategy[];
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
  statement?: string; // this page's own occurrence carries a populated `extraTitle` supporting statement
  tiles: ValuePropositionTile[];
}

export interface IndustryCard {
  order: number;
  icon: SectionImage | null;
  name: string;
  description: string;
  href?: string; // the CMS doesn't currently supply a destination for any industry card on this page
}

export interface IndustriesSection {
  type: "industries";
  order: number;
  eyebrow: string;
  title: string;
  industries: IndustryCard[];
}

// Plain heading + description block — the second "Why Choose TechGrit?" service-detail
// occurrence on this page, which carries no approachSteps at all.
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

export type ManagedServicesSection =
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

export interface ManagedServicesPageContent {
  seo: PageSeo | null;
  sections: ManagedServicesSection[];
}

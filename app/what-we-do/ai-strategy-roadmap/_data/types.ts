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

export interface AiStrategyRoadmapPageContent {
  seo: PageSeo | null;
  sections: AiStrategyRoadmapSection[];
}

export type AiStrategyRoadmapSection =
  | HeroSection
  | IntroSection
  | CapabilitiesSection
  | LifecycleSection
  | WhySection
  | AdvisorySegmentsSection
  | OutcomeSection
  | FaqSection
  | FinalCtaSection;

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

export interface TriggerChip {
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
  chips: TriggerChip[];
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

export interface EngagementStage {
  order: number;
  title: string;
  description: string;
}

export interface LifecycleSection {
  type: "lifecycle";
  order: number;
  eyebrow: string;
  title: string;
  stages: EngagementStage[];
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

export interface AdvisorySegmentCard {
  id: string;
  order: number;
  icon: SectionImage | null;
  name: string;
  description: string;
}

export interface AdvisorySegmentsSection {
  type: "advisorySegments";
  order: number;
  eyebrow: string;
  title: string;
  cards: AdvisorySegmentCard[];
}

// Plain heading + description block — the "PD-strategiesWeSupport" service-detail
// occurrence, which carries real title/subtitle prose but zero approachSteps (same
// shape/precedent as the sibling "What We Do" pages' own "Why Choose TechGrit?" block).
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

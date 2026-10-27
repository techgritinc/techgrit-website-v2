import type { ConnectedSystemsSection } from "@/cms/shared/industry-sections";

export type { ConnectedSystemsSection };

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
  titleHighlight: string | null;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  image: SectionImage | null;
}

export interface MetricItem {
  order: number;
  value: string;
  label: string;
}

export interface MetricsSection {
  type: "metrics";
  order: number;
  metrics: MetricItem[];
}

export interface Blocker {
  id: string;
  label: string;
  description: string;
}

export interface IntroSection {
  type: "intro";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  blockers: Blocker[];
}

export interface LifecyclePoint {
  id: string;
  text: string;
}

export interface LifecycleStage {
  id: string;
  label: string;
  isDefault: boolean;
  title: string;
  description: string;
  points: LifecyclePoint[];
}

export interface DomainDepthSection {
  type: "domainDepth";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  stages: LifecycleStage[];
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
  /** Bold metric heading (e.g. "3 in 1") — only populated by the "Our work" capabilities section. */
  metricLabel?: string;
  bullets: CapabilityBullet[];
}

// "ecosystem" no longer flows through here — "The ecosystem" moved onto its own
// `industries-construction.pd-health-care-system` component, rendered as a
// ConnectedSystemsSection (shared with Healthcare/Construction) instead.
export type CapabilitiesRole = "ourWork" | "operatingContext";

export interface CapabilitiesSection {
  type: "capabilities";
  order: number;
  role: CapabilitiesRole;
  eyebrow: string;
  title: string;
  description: string;
  capabilities: Capability[];
}

// Shared by Applied AI, Institutional platforms, and How we work — all three are the same
// label+title+description card, only the grouping/column count differs.
export interface LabeledCard {
  order: number;
  label: string;
  title: string;
  description: string;
}

export interface AppliedAiSection {
  type: "appliedAi";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  cards: LabeledCard[];
}

export interface InstitutionalSection {
  type: "institutional";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  rowOne: LabeledCard[];
  rowTwo: LabeledCard[];
  extraText: string | null;
}

export interface QuoteSection {
  type: "quote";
  order: number;
  quote: string;
  citation: string;
}

export interface HowWeWorkSection {
  type: "howWeWork";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  cards: LabeledCard[];
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  defaultOpen: boolean;
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
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
}

export type ConsumerLendingSection =
  | HeroSection
  | MetricsSection
  | IntroSection
  | DomainDepthSection
  | CapabilitiesSection
  | ConnectedSystemsSection
  | AppliedAiSection
  | InstitutionalSection
  | QuoteSection
  | HowWeWorkSection
  | FaqSection
  | FinalCtaSection;

export interface ConsumerLendingPageContent {
  seo: PageSeo | null;
  sections: ConsumerLendingSection[];
}

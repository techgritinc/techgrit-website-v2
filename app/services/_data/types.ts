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

export type ServiceAccent = "blue" | "orange" | "teal";

export interface HeroSection {
  type: "hero";
  order: number;
  eyebrow: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaHref: string;
  secondaryCtaLabel: string;
  secondaryCtaHref: string;
}

export interface ServiceOverviewCard {
  sequenceLabel: string;
  title: string;
  description: string;
  image: SectionImage | null;
  targetId: string;
  accentColor: ServiceAccent;
}

export interface OverviewSection {
  type: "overview";
  order: number;
  cards: [ServiceOverviewCard, ServiceOverviewCard, ServiceOverviewCard];
}

export interface ApproachStep {
  stepNumber: number;
  title: string;
  description: string;
}

export interface CapabilityItem {
  title: string;
  description: string;
}

export type SupportingItemList =
  | { kind: "orderedApproach"; items: ApproachStep[] }
  | { kind: "capabilityGrid"; items: CapabilityItem[] };

export interface ServiceDetailSection {
  type: "serviceDetail";
  order: number;
  anchorId: string;
  accentColor: ServiceAccent;
  categoryLabel: string;
  heading: string;
  description: string;
  image: SectionImage | null;
  supportingItems: SupportingItemList;
}

export interface FinalCtaSection {
  type: "finalCta";
  order: number;
  eyebrow: string;
  heading: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export type PageSectionEntry = HeroSection | OverviewSection | ServiceDetailSection | FinalCtaSection;

export interface ServicesPageContent {
  seo: PageSeo;
  sections: PageSectionEntry[];
}

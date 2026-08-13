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

export interface ServiceAccordionItem {
  id: string;
  sequenceNumber: string;
  categoryLabel: string;
  heading: string;
  description: string;
  image: SectionImage | null;
  accentColor: ServiceAccent;
  supportingItems: SupportingItemList;
}

export interface AccordionSection {
  type: "accordion";
  order: number;
  eyebrow: string;
  heading: string;
  subheading: string;
  items: [ServiceAccordionItem, ServiceAccordionItem, ServiceAccordionItem];
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

export type PageSectionEntry = HeroSection | AccordionSection | FinalCtaSection;

export interface ServicesPageContent {
  seo: PageSeo;
  sections: PageSectionEntry[];
}

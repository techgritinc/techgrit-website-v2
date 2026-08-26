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
  primaryCtaLabel?: string;
  primaryCtaLink?: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  image: SectionImage | null;
}

export interface ResourceLink {
  id: string;
  title: string;
  description: string;
  href?: string;
}

export interface ResourceTopic {
  id: string;
  categoryLabel: string;
  title: string;
  resources: ResourceLink[];
}

export interface LibrarySection {
  type: "library";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  topics: ResourceTopic[];
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

export type StartupResourcesSection = HeroSection | LibrarySection | FinalCtaSection;

export interface StartupResourcesPageContent {
  seo: PageSeo | null;
  sections: StartupResourcesSection[];
}

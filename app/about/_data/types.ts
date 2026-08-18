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
  titleHighlight: string; // exact substring of `title` to render in the orange/amber gradient
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
}

export interface ShowcaseSection {
  type: "showcase";
  order: number;
  image: SectionImage | null;
}

export interface ConcernsCard {
  situationsLabel: string;
  situations: string[];
  label: string;
  concerns: string[];
  closingLead: string; // plain-weight sentence rendered above the bold closingStatement
  closingStatement: string;
}

export interface WhoYouAreParagraph {
  text: string;
  highlight?: string; // exact substring of `text` to render bold/white for emphasis
}

export interface WhoYouAreSection {
  type: "whoYouAre";
  order: number;
  eyebrow: string;
  title: string;
  paragraphs: WhoYouAreParagraph[];
  concernsCard: ConcernsCard;
}

export interface OurRoleSection {
  type: "ourRole";
  order: number;
  eyebrow: string;
  title: string;
  titleHighlight: string; // exact substring of `title` to render in the orange/amber gradient
  description: string;
}

export interface CompanyValue {
  order: number;
  title: string;
  description: string;
  icon?: { url: string; alt: string } | null; // CMS-sourced icon; static content has none — falls back to the hardcoded icon set in about-us-values.tsx
}

export interface ValuesSection {
  type: "values";
  order: number;
  eyebrow: string;
  title: string;
  values: CompanyValue[];
}

export interface ProcessStep {
  order: number;
  label: string;
  title: string;
  description: string;
}

export interface ProcessSection {
  type: "process";
  order: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  steps: ProcessStep[];
}

export interface AchievementMetric {
  value: string;
  label: string;
}

export interface AchievementsSection {
  type: "achievements";
  order: number;
  stats: AchievementMetric[];
}

export interface PartnershipOutcome {
  text: string;
}

export interface PartnerSection {
  type: "partner";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  outcomes: PartnershipOutcome[];
  closingLabel: string;
  closingLead: string;
  closingSupport: string;
}

export interface CultureGallerySection {
  type: "cultureGallery";
  order: number;
  eyebrow: string;
  title: string;
  subtitle: string;
  images?: { id: string; src: string | null; alt: string }[]; // CMS-sourced photos; static content has none — falls back to the shared static set in LifeGallery.tsx
}

export interface FinalCtaSection {
  type: "finalCta";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaLink: string;
}

export type PageSectionEntry =
  | HeroSection
  | ShowcaseSection
  | WhoYouAreSection
  | OurRoleSection
  | ValuesSection
  | ProcessSection
  | AchievementsSection
  | PartnerSection
  | CultureGallerySection
  | FinalCtaSection;

export interface AboutUsPageContent {
  seo: PageSeo;
  sections: PageSectionEntry[];
}
 
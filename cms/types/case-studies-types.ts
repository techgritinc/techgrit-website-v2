import type {
  CaseStudyCard,
  CtaBannerFields,
  StrapiCaseStudyItem,
  StrapiCtaBannerSection,
  StrapiHeroSection,
} from "../shared/reusable-sections";
import type { PageSeo, StrapiSeo, StrapiUnmappedSection } from "./strapi-common";

// Re-exported so this page's own components can keep importing the card shape from here
// (their existing convention) without reaching into cms/shared directly.
export type { CaseStudyCard } from "../shared/reusable-sections";

// ---------------------------------------------------------------------------
// Strapi-side raw shapes — case-studies-list-page-specific components (hero,
// cta-banner, and the case-study card shape are reused verbatim via
// cms/shared/reusable-sections.ts).
// ---------------------------------------------------------------------------

export type StrapiTabItem = {
  id: number;
  label: string;
  value: string;
  isDefault: boolean;
};

export type StrapiTabFiltersSection = {
  __component: "page-reusable-sections.tab-filters";
  title: string;
  subtitle: string | null;
  TabItems: StrapiTabItem[];
};

export type StrapiCaseStudyCardsSection = {
  __component: "insights-case-studies.case-study-cards";
  case_studies: StrapiCaseStudyItem[];
};

export type StrapiNewsletterFormField = {
  id: number;
  placeholder: string;
};

export type StrapiNewsletterSection = {
  __component: "page-reusable-sections.newsletter";
  title: string;
  subtitle: string;
  ctaLabel: string;
  extraTitle: string;
  ctaFormFields: StrapiNewsletterFormField[];
};

export type StrapiCaseStudiesSection =
  | StrapiHeroSection
  | StrapiTabFiltersSection
  | StrapiCaseStudyCardsSection
  | StrapiNewsletterSection
  | StrapiCtaBannerSection
  | StrapiUnmappedSection;

export type StrapiCaseStudiesPage = {
  seo: StrapiSeo;
  sections: StrapiCaseStudiesSection[];
};

// ---------------------------------------------------------------------------
// Presentational shapes — what the page's components actually render. Produced by mapping
// the Strapi shapes above; there is no static fallback content anymore.
// ---------------------------------------------------------------------------

export interface CaseStudiesHeroSection {
  type: "hero";
  order: number;
  eyebrow: string;
  title: string;
  titleHighlight: string | null; // exact substring of `title` to render in the gradient accent; null = no highlight
  subtitle: string;
}

export interface CaseStudyTab {
  order: number;
  label: string;
  value: string;
  isDefault: boolean;
}

export interface CaseStudiesTabFiltersSection {
  type: "tabFilters";
  order: number;
  tabs: CaseStudyTab[];
}

export interface CaseStudyCardsSection {
  type: "caseStudyCards";
  order: number;
  caseStudies: CaseStudyCard[];
}

export interface CaseStudiesFinalCtaSection extends CtaBannerFields {
  type: "finalCta";
  order: number;
}

export interface CaseStudiesNewsletterSection {
  type: "newsletter";
  order: number;
  heading: string;
  copy: string;
  ctaLabel: string;
  placeholder: string;
  helperText: string;
  successText: string;
}

// `| undefined` is explicit and load-bearing: with no static fallback, any section the CMS
// doesn't return (or that fails to map) is genuinely absent, not defaulted.
export type CaseStudiesPageSectionEntry =
  | CaseStudiesHeroSection
  | CaseStudiesTabFiltersSection
  | CaseStudyCardsSection
  | CaseStudiesNewsletterSection
  | CaseStudiesFinalCtaSection
  | undefined;

export interface CaseStudiesPageContent {
  seo: PageSeo;
  sections: CaseStudiesPageSectionEntry[];
}

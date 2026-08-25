import type {
  CaseStudyCard,
  CtaBannerFields,
  SectionIcon,
  StrapiCaseStudyItem,
  StrapiCtaBannerSection,
  StrapiStatisticsSection,
} from "../shared/reusable-sections";
import type { PageSeo, StrapiMedia, StrapiSeo, StrapiUnmappedSection } from "./strapi-common";

// ---------------------------------------------------------------------------
// Strapi-side raw shapes — case-study-detail-page-specific components (statistics,
// cta-banner, and the case-study card shape inside "more-case-studys" are reused
// verbatim via cms/shared/reusable-sections.ts).
// ---------------------------------------------------------------------------

export type StrapiCaseStudyDetailHeroSection = {
  __component: "case-study-detailed-view.case-studie-hero";
  title: string;
  subtitle: string | null;
  allCaseStudiesLabel: string;
  allCaseStudiesUrl: string;
  publishedDate: string | null;
  caseStudyLabel: string;
  publishedDateIcon: StrapiMedia | null;
  image: StrapiMedia[];
};

// The CMS's one flexible narrative-body component: a repeatable list of items, each
// optionally prose (title+subtitle only), bullet-style (features populated), or
// picture-style (architectureImage populated) — mirrors the pre-CMS static
// NarrativeBlock model, just sourced from real content now. See cms/api/case-study-detail.ts
// for how each item's populated fields decide its rendered treatment.
export type StrapiContentSectionFeature = {
  id: number;
  title: string;
  subtitle: string | null;
  icon: StrapiMedia | null;
  image: StrapiMedia[];
};

export type StrapiContentSectionItem = {
  id: number;
  title: string;
  // `subheading` isn't in the CMS schema yet (requested, not yet added by the CMS team) —
  // optional here so the frontend already renders it the moment the field exists, with no
  // rework needed. Until then this key is simply absent from every real response.
  subheading?: string | null;
  subtitle: string | null;
  architectureImage: StrapiMedia[];
  features: StrapiContentSectionFeature[];
};

export type StrapiContentSectionsSection = {
  __component: "case-study-detailed-view.content-section";
  ContentSection: StrapiContentSectionItem[];
};

export type StrapiTeamMember = {
  id: number;
  role: string;
  count: number;
};

export type StrapiTeamCompositionSection = {
  __component: "case-study-detailed-view.team-composition";
  title: string;
  ctaLabel: string;
  ctaLink: string;
  members: StrapiTeamMember[];
};

export type StrapiMoreCaseStudysSection = {
  __component: "case-study-detailed-view.more-case-studys";
  title: string;
  subtitle: string | null;
  case_studies: StrapiCaseStudyItem[];
};

export type StrapiCaseStudyDetailSection =
  | StrapiCaseStudyDetailHeroSection
  | StrapiStatisticsSection
  | StrapiContentSectionsSection
  | StrapiTeamCompositionSection
  | StrapiMoreCaseStudysSection
  | StrapiCtaBannerSection
  | StrapiUnmappedSection;

export type StrapiCaseStudyDetailPage = {
  seo: StrapiSeo;
  sections: StrapiCaseStudyDetailSection[];
};

// ---------------------------------------------------------------------------
// Presentational shapes — what the page's components actually render. Produced by mapping
// the Strapi shapes above; there is no static fallback content anymore.
// ---------------------------------------------------------------------------

export interface DetailHeroSection {
  type: "hero";
  order: number;
  categoryLabel: string; // caseStudyLabel, e.g. "Enterprise Saas" — the one teal label slot above the H1
  title: string;
  subtitle: string;
  publishedDate: string;
  publishedDateIcon: SectionIcon | null;
  allCaseStudiesLabel: string;
  allCaseStudiesUrl: string;
  image: SectionIcon | null;
}

export interface StatValue {
  order: number;
  value: string;
  label: string;
}

export interface StatisticsSection {
  type: "statistics";
  order: number;
  stats: StatValue[];
}

// Same shape as SectionIcon ({url, alt}) — aliased under this name because a narrative
// picture isn't semantically an "icon," even though the data it carries is identical.
export type NarrativeImage = SectionIcon;

export interface NarrativeFeatureItem {
  order: number;
  title: string;
  subtitle: string | null;
  icon: SectionIcon | null;
  images: NarrativeImage[]; // the CMS lets a feature carry more than one image
}

// One item from the CMS's flexible "ContentSection" list. All three content arrays can be
// empty — the component decides its rendered treatment (prose / bullets / pictures, or any
// combination) from whichever ones are populated, same as the pre-CMS static NarrativeBlock.
export interface NarrativeBlockEntry {
  type: "narrativeBlock";
  order: number;
  title: string;
  subheading: string | null; // not in the CMS schema yet — see StrapiContentSectionItem
  paragraphs: string[]; // CMS's subtitle is one string with blank-line-separated paragraphs
  features: NarrativeFeatureItem[];
  images: NarrativeImage[];
}

export interface MoreCaseStudiesSection {
  type: "moreCaseStudies";
  order: number;
  title: string;
  subtitle: string | null;
  caseStudies: CaseStudyCard[];
}

export interface FinalCtaSection extends CtaBannerFields {
  type: "finalCta";
  order: number;
}

export interface TeamMemberRole {
  order: number;
  role: string;
  count: number;
}

// Pulled out of the main `sections` flow — rendered as the sticky sidebar alongside the
// narrative regardless of where "team-composition" falls in the CMS's own section order.
export interface TeamCompositionSection {
  title: string;
  ctaLabel: string;
  ctaLink: string;
  members: TeamMemberRole[];
}

// `| undefined` is explicit and load-bearing: with no static fallback, any section the CMS
// doesn't return (or that fails to map) is genuinely absent, not defaulted.
export type CaseStudyDetailSectionEntry =
  | DetailHeroSection
  | StatisticsSection
  | NarrativeBlockEntry
  | MoreCaseStudiesSection
  | FinalCtaSection
  | undefined;

export interface CaseStudyDetailPageContent {
  seo: PageSeo;
  sections: CaseStudyDetailSectionEntry[];
  team: TeamCompositionSection | null;
}

import type { SectionIcon, StrapiCtaBannerSection, StrapiStatisticsSection } from "../shared/reusable-sections";
import type { CtaBannerFields } from "../shared/reusable-sections";
import type {
  PageSeo,
  StrapiBlocksContent,
  StrapiMedia,
  StrapiSeo,
  StrapiUnmappedSection,
} from "./strapi-common";

// ---------------------------------------------------------------------------
// Strapi-side raw shapes.
//
// The detail page is served by the case-study COLLECTION endpoint
// (/api/case-studies/by-slug/<slug>), not the pages collection: the hero's fields live at
// the response's top level, and only the body sections come through a dynamic zone.
// statistics / cta-banner are reused verbatim via cms/shared/reusable-sections.ts.
// ---------------------------------------------------------------------------

export type StrapiCaseStudyCategoryRef = {
  name: string;
  slug: string;
};

// One flexible narrative-body component: a repeatable list of items, each optionally prose
// (title + subtitle), bullet-style (features populated), or picture-style (architectureImage
// populated). `extraTitle` is a pull-quote rendered as a ResultCard.
export type StrapiContentSectionFeature = {
  id: number;
  // Nullable despite every earlier sample having one: a picture/description-only feature
  // (no bullet-style title, just a description block or images) can leave this genuinely
  // unset — see ai-assisted-sprint-velocity-improvement's "Outcomes & Impact" feature 14590.
  title: string | null;
  subtitle: string | null;
  // Rich-text body — a separate field from `subtitle`, which is a plain string.
  description: StrapiBlocksContent | null;
  // A table is modeled as parallel `columns` (header labels) + `rows` (one object per row).
  // Row object keys do NOT reliably match the column labels — see normalizeTable() in
  // cms/api/case-study-detail.ts for how the two are lined up.
  columns: { label: string }[] | null;
  rows: Record<string, string>[] | null;
  ctaLabel: string | null;
  ctaLink: string | null;
  icon: StrapiMedia | null;
  image: StrapiMedia[];
};

export type StrapiContentSectionItem = {
  id: number;
  title: string;
  subtitle: string | null;
  extraTitle: string | null;
  architectureImage: StrapiMedia[];
  features: StrapiContentSectionFeature[];
};

export type StrapiContentSectionsSection = {
  __component: "case-study-detailed-view.content-section";
  ContentSection: StrapiContentSectionItem[];
};

// A shared "What We Do" service-page component, reused by the CMS for a case study's
// tech-stack-style list ("Technology Stack": tool name + role, e.g. "GitHub Copilot" /
// "Inline code completions..."). serviceLabel/variant/ctaLabel/ctaLink/image are unset on
// every case study observed so far — modeled here so they're typed the moment a case study
// does populate one, rather than silently ignored like title was.
export type StrapiApproachStep = {
  id: number;
  title: string | null;
  subtitle: string | null;
  stepLabel: string | null;
  icon: StrapiMedia | null;
};

export type StrapiServiceDetailSection = {
  __component: "page-reusable-sections.service-detail";
  title: string;
  subtitle: string | null;
  serviceLabel: string | null;
  variant: string | null;
  extraTitle: string | null;
  ctaLabel: string | null;
  ctaLink: string | null;
  image: StrapiMedia[];
  approachSteps: StrapiApproachStep[];
};

// The same component the Job Detail page renders (job-detailed-view.key-responsibilities),
// reused by the CMS for a case study's prose sections (The Challenge, Our Approach, ...).
// Each item's `subtitle` is a Blocks rich-text tree, not a string.
export type StrapiResponsibilityItem = {
  id: number;
  subtitle: StrapiBlocksContent;
};

export type StrapiResponsibilityGroup = {
  id: number;
  name: string | null;
  ResponsibilityItems: StrapiResponsibilityItem[];
};

export type StrapiKeyResponsibilitiesSection = {
  __component: "job-detailed-view.key-responsibilities";
  title: string;
  subtitle: string | null;
  extraTitle: string | null;
  ResponsibilityGroup: StrapiResponsibilityGroup[];
};

// Another component borrowed from the job-detail family: a plain title + prose block, with
// the body as a single newline-separated string rather than a Blocks tree. Mapped onto the
// same NarrativeBlockEntry shape as a prose-only content-section item.
export type StrapiSummarySection = {
  __component: "job-detailed-view.summary";
  title: string;
  subtitle: string | null;
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

export type StrapiCaseStudyDetailSection =
  | StrapiStatisticsSection
  | StrapiContentSectionsSection
  | StrapiKeyResponsibilitiesSection
  | StrapiSummarySection
  | StrapiServiceDetailSection
  | StrapiTeamCompositionSection
  | StrapiCtaBannerSection
  | StrapiUnmappedSection;

export type StrapiCaseStudyDetailPage = {
  // Hero fields — top level on this endpoint, not a dynamic-zone component.
  title: string;
  subtitle: string | null;
  slug: string;
  publishedDate: string | null;
  caseStudyLabel: string | null;
  allCaseStudiesLabel: string | null;
  allCaseStudiesUrl: string | null;
  publishedDateIcon: StrapiMedia | null;
  case_study_category: StrapiCaseStudyCategoryRef | null;
  image: StrapiMedia[];
  seo: StrapiSeo;
  sections: StrapiCaseStudyDetailSection[];
};

// ---------------------------------------------------------------------------
// Presentational shapes — what the page's components actually render. Produced by mapping
// the Strapi shapes above; there is no static fallback content.
// ---------------------------------------------------------------------------

// Same {url, alt} as SectionIcon plus the CMS's own intrinsic dimensions, so a rendered
// image keeps its real aspect ratio instead of being forced into a hardcoded box.
export interface CaseStudyImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface DetailHeroSection {
  type: "hero";
  caseStudyLabel: string; // eyebrow above the H1, e.g. "Case Study"
  title: string;
  subtitle: string;
  publishedDate: string;
  publishedDateIcon: SectionIcon | null;
  categoryLabel: string; // rendered after the published date; "" when the CMS has no category
  allCaseStudiesLabel: string;
  allCaseStudiesUrl: string;
  image: CaseStudyImage | null;
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

// A table flattened to a header row + cell matrix, so the DataTable component stays
// presentational and the column/row-key reconciliation lives in the mapper.
export interface CaseStudyTable {
  headers: string[];
  rows: string[][];
}

export interface NarrativeFeatureItem {
  order: number;
  title: string;
  subtitle: string | null;
  description: StrapiBlocksContent | null;
  table: CaseStudyTable | null;
  ctaLabel: string | null;
  ctaLink: string | null;
  icon: SectionIcon | null;
  images: CaseStudyImage[];
}

// One item from the CMS's flexible "ContentSection" list. All content arrays can be empty —
// the component decides its rendered treatment (prose / bullets / table / pictures, or any
// combination) from whichever ones are populated.
export interface NarrativeBlockEntry {
  type: "narrativeBlock";
  order: number;
  title: string;
  paragraphs: string[]; // CMS's subtitle is one string with blank-line-separated paragraphs
  extraTitle: string | null; // pull-quote, rendered as a ResultCard
  features: NarrativeFeatureItem[];
  images: CaseStudyImage[];
}

export interface ResponsibilityGroupContent {
  heading: string | null;
  items: StrapiBlocksContent[];
}

// A prose section sourced from job-detailed-view.key-responsibilities — rich-text groups
// under one heading, with an optional pull-quote.
export interface ResponsibilitySection {
  type: "responsibilityList";
  order: number;
  title: string;
  extraTitle: string | null;
  groups: ResponsibilityGroupContent[];
}

export interface FinalCtaSection extends CtaBannerFields {
  type: "finalCta";
  order: number;
}

export interface TechStackCard {
  order: number;
  stepLabel: string; // CMS-supplied sequence number, e.g. "1".."5" — falls back to the
  // card's own position if the CMS ever leaves it unset. Rendered only when `icon` is absent.
  icon: SectionIcon | null; // takes over the badge slot the moment the CMS supplies one
  title: string;
  subtitle: string | null;
}

// A tech-stack-style grid ("Technology Stack": tool name + role) sourced from the CMS's
// page-reusable-sections.service-detail component. Kept as its own section type rather than
// folded into NarrativeBlockEntry: this renders as a numbered-badge card grid, distinct from
// the plain-prose treatment every other narrative section uses.
export interface TechStackSection {
  type: "techStack";
  order: number;
  title: string;
  cards: TechStackCard[];
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

// Body sections, in the CMS's own order. `| undefined` is explicit and load-bearing: with no
// static fallback, any section the CMS doesn't return (or that fails to map) is genuinely
// absent, not defaulted.
export type CaseStudyDetailSectionEntry =
  | StatisticsSection
  | NarrativeBlockEntry
  | ResponsibilitySection
  | TechStackSection
  | FinalCtaSection
  | undefined;

export interface CaseStudyDetailPageContent {
  seo: PageSeo;
  hero: DetailHeroSection;
  sections: CaseStudyDetailSectionEntry[];
  team: TeamCompositionSection | null;
}

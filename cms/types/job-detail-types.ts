import type { SectionIcon, StrapiCtaBannerSection, CtaBannerFields } from "../shared/reusable-sections";
import type { ApplicationFormContent, JobFormField, StrapiJobFormField } from "./careers-types";
import type { StrapiBlocksContent, StrapiMedia } from "./strapi-common";

// Strapi Blocks (rich text) shapes moved to ./strapi-common.ts once the case-study detail
// page needed the same tree — re-exported here so this page's existing imports keep working.
export type {
  StrapiBlocksText,
  StrapiBlocksLink,
  StrapiBlocksInline,
  StrapiBlocksListItem,
  StrapiBlocksList,
  StrapiBlocksParagraph,
  StrapiBlocksNode,
  StrapiBlocksContent,
} from "./strapi-common";

// ---------------------------------------------------------------------------
// Strapi-side raw shapes — the job-detailed-view.* component family, plus the two
// generic shared components (application-form-content, cta-banner) this page's own
// dynamic zone also carries.
// ---------------------------------------------------------------------------

export type StrapiJobHeaderSection = {
  __component: "job-detailed-view.job-header";
  badgeLabel: string;
  title: string;
  ctaLabel: string;
  jobType: string;
  location: string;
  publishedDateLabel: string;
  publishedDate: string;
  jobTypeIcon: StrapiMedia | null;
  locationIcon: StrapiMedia | null;
  calendarIcon: StrapiMedia | null;
};

export type StrapiSummarySection = {
  __component: "job-detailed-view.summary";
  title: string | null;
  subtitle: string;
};

export type StrapiResponsibilityItem = {
  subtitle: StrapiBlocksContent;
};

export type StrapiResponsibilityGroup = {
  name: string | null;
  ResponsibilityItems: StrapiResponsibilityItem[];
};

export type StrapiKeyResponsibilitiesSection = {
  __component: "job-detailed-view.key-responsibilities";
  title: string;
  ResponsibilityGroup: StrapiResponsibilityGroup[];
};

export type StrapiQualificationsSection = {
  __component: "job-detailed-view.qualifications";
  title: string;
  extraTitle: string | null;
  ResponsibilityItem: StrapiResponsibilityItem[];
};

export type StrapiJobApplicationFormSection = {
  __component: "careers.job-application-form-content";
  title: string | null;
  subtitle: string;
  badgeLabel: string;
  ctaLabel: string;
  ctaLink: string;
  privacyNote: string;
  jobFormFields: StrapiJobFormField[];
};

export type StrapiJobDetailSection =
  | StrapiJobHeaderSection
  | StrapiSummarySection
  | StrapiKeyResponsibilitiesSection
  | StrapiQualificationsSection
  | StrapiJobApplicationFormSection
  | StrapiCtaBannerSection
  | { __component: string };

export type StrapiJobDetailPage = {
  sections: StrapiJobDetailSection[];
};

// ---------------------------------------------------------------------------
// Presentational shapes — produced by cms/api/job-detail.ts. `body` is rendered as one
// ordered loop, in whatever count/order the CMS actually returns — never a fixed lookup.
// ---------------------------------------------------------------------------

export type JobDetailHeaderContent = {
  badgeLabel: string;
  title: string;
  ctaLabel: string;
  jobType: string;
  jobTypeIcon: SectionIcon | null;
  location: string;
  locationIcon: SectionIcon | null;
  publishedDateLabel: string;
  publishedDate: string; // pre-formatted, display-ready
  calendarIcon: SectionIcon | null;
};

export type SummaryBodySection = {
  type: "summary";
  title: string | null;
  paragraphs: string[];
};

export type ResponsibilityGroupContent = {
  heading: string | null;
  items: StrapiBlocksContent[];
};

export type ResponsibilityListBodySection = {
  type: "responsibilityList";
  title: string;
  groups: ResponsibilityGroupContent[];
  // Only ever populated on a qualifications-shaped section (its own extraTitle field) —
  // a trailing paragraph rendered after the bullets, under the same heading.
  trailingText: string | null;
};

export type JobDetailBodySection = SummaryBodySection | ResponsibilityListBodySection;

export type JobDetailContent = {
  seo: { title: string; description: string };
  header: JobDetailHeaderContent;
  body: JobDetailBodySection[];
  applicationForm: ApplicationFormContent;
  finalCta: CtaBannerFields;
};

export type { JobFormField };

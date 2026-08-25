import type {
  SectionIcon,
  StrapiCtaBannerSection,
  StrapiHeroSection,
  StrapiStatisticsSection,
} from "../shared/reusable-sections";

export type { SectionIcon } from "../shared/reusable-sections";
import type { StrapiMedia } from "./strapi-common";
import type { LifeGalleryImage } from "@/app/_home-components/LifeGallery";

export type { LifeGalleryImage } from "@/app/_home-components/LifeGallery";

// ---------------------------------------------------------------------------
// Strapi-side raw shapes — careers-specific components (not reused by other pages, mirrors
// the shared-vs-route-local split already used for the component library).
// ---------------------------------------------------------------------------

export type StrapiApproachStep = {
  title: string;
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
  approachSteps: StrapiApproachStep[];
};

export type StrapiTabItem = {
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

export type StrapiJobCategory = {
  name: string;
  slug: string;
};

export type StrapiJob = {
  id: number;
  title: string;
  workmode: string;
  jobType: string;
  ctaLabel: string;
  ctaLink: string;
  isActive: boolean;
  job_category: StrapiJobCategory;
};

export type StrapiJobsSection = {
  __component: "careers.job-application-details";
  jobs: StrapiJob[];
};

export type StrapiCultureGallerySection = {
  __component: "page-reusable-sections.culture-gallery";
  title: string;
  subtitle: string;
  badgeLabel: string;
  image: StrapiMedia[];
};

// The shared StrapiCtaBannerSection type (cms/shared/reusable-sections.ts) has no
// `highlightTitle` field — no other page's CTA banner needed a gradient-highlighted
// substring yet. Careers' does, so it's added here locally rather than widening the shared
// type for every other consumer.
export type StrapiCareersCtaBannerSection = StrapiCtaBannerSection & { highlightTitle: string | null };

export type StrapiJobFormField = {
  label: string;
  placeholder: string | null;
  fieldRequiredLabel: string | null;
  acceptedFormatsAndSize: string | null;
  uploadPromptText: string | null;
  icon: StrapiMedia | null;
};

export type StrapiApplicationFormSection = {
  __component: "careers.job-application-form-content";
  title: string | null;
  subtitle: string;
  badgeLabel: string;
  ctaLabel: string;
  ctaLink: string;
  privacyNote: string;
  jobFormFields: StrapiJobFormField[];
};

// Any other, truly unmapped component comes back with this shape and is ignored.
export type StrapiUnmappedSection = { __component: string };

export type StrapiCareersSection =
  | StrapiHeroSection
  | StrapiStatisticsSection
  | StrapiServiceDetailSection
  | StrapiTabFiltersSection
  | StrapiJobsSection
  | StrapiApplicationFormSection
  | StrapiCultureGallerySection
  | StrapiCareersCtaBannerSection
  | StrapiUnmappedSection;

export type StrapiCareersPage = {
  seo: {
    metaTitle: string | null;
    metaDescription: string | null;
  } | null;
  sections: StrapiCareersSection[];
};

// ---------------------------------------------------------------------------
// Presentational shapes — what the page's components actually render. Produced by mapping
// the Strapi shapes above in cms/api/careers.ts; never sourced from static content (there is
// none anymore).
// ---------------------------------------------------------------------------

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface CollageImage {
  src: string;
  alt: string;
  span: "tall" | "default" | "wide";
}

export interface CareersHeroContent {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  lead: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  images: [CollageImage, CollageImage, CollageImage, CollageImage];
}

export interface Stat {
  value: string;
  label: string;
}

export type BenefitIconName = "lightning" | "book" | "home" | "heart" | "barChart" | "users";

export interface Benefit {
  // CMS-hosted icon image; null when the CMS didn't return one for this step.
  icon: SectionIcon | null;
  // Local icon glyph + accent color key, used whenever `icon` is null.
  iconName: BenefitIconName;
  title: string;
  description: string;
}

export interface WhyJoinContent {
  heading: string;
}

export interface DepartmentFilter {
  value: string;
  label: string;
}

export type AccentKey = "orange" | "yellow" | "teal" | "blue";

export interface OpenRole {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: string;
  accent: AccentKey;
}

export interface LifeAtTechGritContent {
  eyebrow: string;
  heading: string;
  description: string;
  images: LifeGalleryImage[];
}

export interface ClosingCtaContent {
  heading: string;
  headingHighlight: string;
  copy: string;
  ctaLabel: string;
}

export interface JobFormField {
  label: string;
  placeholder: string | null;
  // Rendered next to the label ("*" or "optional"); also drives the HTML `required`
  // attribute when it's exactly "*".
  requiredMark: "*" | "optional" | null;
  // Populated only on the Resume field.
  acceptedFormatsAndSize: string | null;
  uploadPromptText: string | null;
}

export interface ApplicationFormContent {
  badgeLabel: string;
  subtitle: string;
  ctaLabel: string;
  privacyNote: string;
  // Always 5 entries in the CMS's fixed order: full name, email, LinkedIn/portfolio URL,
  // resume, and the open-ended "why us" question — application-dialog.tsx renders each by
  // position since the CMS has no field-type discriminator.
  fields: JobFormField[];
}

export interface CareersPageContent {
  seo: PageSeo;
  hero: CareersHeroContent;
  stats: Stat[];
  whyJoin: WhyJoinContent;
  benefits: Benefit[];
  filters: DepartmentFilter[];
  roles: OpenRole[];
  lifeAtTechGrit: LifeAtTechGritContent;
  cta: ClosingCtaContent;
  applicationForm: ApplicationFormContent;
}

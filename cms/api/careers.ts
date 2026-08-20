import { cache } from "react";
import { fetchCms } from "./fetcher";
import { pickMediaAsset, resolveMediaUrl } from "../utils/media";
import { mapCtaBanner, mapSectionIcon, mapStatistics } from "../shared/reusable-sections";
import type {
  AccentKey,
  ApplicationFormContent,
  Benefit,
  BenefitIconName,
  CareersHeroContent,
  CareersPageContent,
  CollageImage,
  DepartmentFilter,
  JobFormField,
  OpenRole,
  StrapiApplicationFormSection,
  StrapiCareersCtaBannerSection,
  StrapiCareersPage,
  StrapiCultureGallerySection,
  StrapiJobsSection,
  StrapiServiceDetailSection,
  StrapiTabFiltersSection,
} from "../types/careers-types";
import type { StrapiHeroSection, StrapiStatisticsSection } from "../shared/reusable-sections";

// NOTE: populate paths for the dynamic zone follow Strapi v5's `on`-keyed syntax, same
// convention as cms/api/construction.ts and cms/api/contact.ts. This is the single source
// for the Careers route — every section renders from this one fetch, no static fallback.
const CAREERS_ENDPOINT =
  "/api/pages/by-slug/careers" +
  "?populate[seo][populate]=*" +
  "&populate[sections][on][page-reusable-sections.hero][populate]=backgroundImage" +
  "&populate[sections][on][page-reusable-sections.statistics][populate]=statistics" +
  "&populate[sections][on][page-reusable-sections.service-detail][populate][approachSteps][populate]=icon" +
  "&populate[sections][on][page-reusable-sections.tab-filters][populate]=TabItems" +
  "&populate[sections][on][careers.job-application-details][populate][jobs][populate]=job_category,locationIcon,clockIcon" +
  "&populate[sections][on][careers.job-application-form-content][populate][jobFormFields][populate]=icon" +
  "&populate[sections][on][page-reusable-sections.culture-gallery][populate]=image" +
  "&populate[sections][on][page-reusable-sections.cta-banner][populate]=true";

// The CMS's "page-reusable-sections.service-detail" component has no color/accent field —
// each benefit's accent chip color and local-fallback glyph are derived from its position,
// matching the fixed 6-benefit order the design always renders in.
const BENEFIT_ICON_NAME_BY_INDEX: BenefitIconName[] =
  ["lightning", "book", "home", "heart", "barChart", "users"];

// The CMS's job categories have no accent-color field — each role's status-dot color is
// derived from `job_category.slug`. A category slug the CMS team hasn't wired a color for
// yet falls back to "orange".
const ACCENT_BY_CATEGORY_SLUG: Record<string, AccentKey> = {
  engineering: "orange", design: "yellow", quality: "teal", product: "blue",
};

// The CMS's "FullTime"/"PartTime"-style enum has no space/hyphen formatting. An
// unrecognized value is passed through as-is rather than guessed at.
const JOB_TYPE_LABELS: Record<string, string> = {
  FullTime: "Full-time", PartTime: "Part-time", Contract: "Contract", Internship: "Internship",
};

// The collage has no per-image layout field in the CMS schema at all (not a missing-value
// gap, a missing-field one — flagged to the CMS team). Until/unless they add one, span is
// derived from each image's position: 1st tall, 2nd/3rd default, 4th wide.
const COLLAGE_SPAN_BY_INDEX: CollageImage["span"][] = ["tall", "default", "default", "wide"];

function mapCareersHero(cms: StrapiHeroSection): CareersHeroContent {
  const images = cms.backgroundImage.slice(0, 4).map((media, index) => ({
    src: resolveMediaUrl(pickMediaAsset(media, ["medium", "small"]).url),
    alt: media.alternativeText ?? "",
    span: COLLAGE_SPAN_BY_INDEX[index] ?? "default",
  }));

  return {
    eyebrow: cms.badgeLabel,
    heading: cms.title,
    headingHighlight:
      cms.highlightTitle && cms.title.includes(cms.highlightTitle) ? cms.highlightTitle : "",
    lead: cms.subtitle,
    // primaryBtnLink/secondaryBtnLink are currently null in the CMS — flagged to the CMS
    // team; these in-page anchors are the only destinations either CTA has ever had.
    primaryCta: { label: cms.primaryBtnLabel, href: cms.primaryBtnLink ?? "#roles" },
    secondaryCta: { label: cms.secondaryBtnLabel ?? "", href: cms.secondaryBtnLink ?? "#life" },
    images: images as [CollageImage, CollageImage, CollageImage, CollageImage],
  };
}

function mapCareersBenefits(cms: StrapiServiceDetailSection): Benefit[] {
  return cms.approachSteps.map((step, index) => ({
    icon: mapSectionIcon(step.icon),
    iconName: BENEFIT_ICON_NAME_BY_INDEX[index] ?? "lightning",
    title: step.title,
    description: step.subtitle ?? "",
  }));
}

function mapCareersFilters(cms: StrapiTabFiltersSection): DepartmentFilter[] {
  return cms.TabItems.map((tab) => ({ value: tab.value, label: tab.label }));
}

// isActive:false jobs are closed postings the CMS keeps on record — not shown. Individual
// jobs have no CMS `slug` field; each job's `id` is used as its stable identifier instead
// (only ever a React key / internal application-dialog context, never a URL segment).
function mapCareersRoles(cms: StrapiJobsSection): OpenRole[] {
  return cms.jobs
    .filter((job) => job.isActive)
    .map((job) => ({
      slug: String(job.id),
      title: job.title,
      department: job.job_category.slug,
      location: job.workmode,
      type: JOB_TYPE_LABELS[job.jobType] ?? job.jobType,
      accent: ACCENT_BY_CATEGORY_SLUG[job.job_category.slug] ?? "orange",
    }));
}

function mapCareersCultureGallery(cms: StrapiCultureGallerySection) {
  return {
    eyebrow: cms.badgeLabel,
    heading: cms.title,
    description: cms.subtitle,
    images: cms.image.map((media) => {
      const asset = pickMediaAsset(media, ["medium", "small"]);
      return { id: String(media.url), src: resolveMediaUrl(asset.url), alt: media.alternativeText ?? "" };
    }),
  };
}

// `.split(headingHighlight)` in CareersCta.tsx would badly corrupt the heading if this fell
// back to "" (`.split("")` splits on every character) — falls back to the known intended
// highlight text instead. Flagged to the CMS team: `highlightTitle` is currently null.
function mapCareersCta(cms: StrapiCareersCtaBannerSection) {
  const fields = mapCtaBanner(cms);
  return {
    heading: fields.title,
    headingHighlight:
      cms.highlightTitle && fields.title.includes(cms.highlightTitle) ? cms.highlightTitle : "exact role?",
    copy: fields.description,
    ctaLabel: fields.primaryCtaLabel,
  };
}

// The CMS's jobFormFields have no field-type discriminator (text vs. file vs. textarea) —
// application-dialog.tsx renders each of the fixed 5 entries by position. `fieldRequiredLabel`
// is passed through as-is ("*" / "optional" / null) for the label, and only "*" drives the
// HTML `required` attribute.
function mapJobFormField(field: StrapiApplicationFormSection["jobFormFields"][number]): JobFormField {
  const requiredMark = field.fieldRequiredLabel;
  return {
    label: field.label,
    placeholder: field.placeholder,
    requiredMark: requiredMark === "*" || requiredMark === "optional" ? requiredMark : null,
    acceptedFormatsAndSize: field.acceptedFormatsAndSize,
    uploadPromptText: field.uploadPromptText,
  };
}

function mapApplicationForm(cms: StrapiApplicationFormSection): ApplicationFormContent {
  return {
    badgeLabel: cms.badgeLabel,
    subtitle: cms.subtitle,
    ctaLabel: cms.ctaLabel,
    privacyNote: cms.privacyNote,
    fields: cms.jobFormFields.map(mapJobFormField),
  };
}

// Narrows the flat `sections` array to one component by its `__component` discriminator —
// used below instead of repeating `.find((s): s is X => ...)` per section.
function findSection<T extends { __component: string }>(
  sections: { __component: string }[],
  component: T["__component"]
): T | undefined {
  return sections.find((section): section is T => section.__component === component);
}

// Returns the full Careers page content in one shot — every section is CMS-driven, no
// static fallback. Returns null when the CMS is unreachable or any required section is
// missing, so the caller 404s rather than render a page with holes in it.
//
// Wrapped in React's cache() because generateMetadata() and the page component each call
// this independently — without memoization, one page request fires two identical CMS
// requests. cache() scopes the memoized result to a single request's render pass (not
// shared across requests), so only the first call actually hits the network.
export const getCareersPageContent = cache(async (): Promise<CareersPageContent | null> => {
  const data = await fetchCms<StrapiCareersPage>(CAREERS_ENDPOINT);
  if (!data) return null;

  const hero = findSection<StrapiHeroSection>(data.sections, "page-reusable-sections.hero");
  const statistics = findSection<StrapiStatisticsSection>(data.sections, "page-reusable-sections.statistics");
  const whyJoin = findSection<StrapiServiceDetailSection>(data.sections, "page-reusable-sections.service-detail");
  const tabFilters = findSection<StrapiTabFiltersSection>(data.sections, "page-reusable-sections.tab-filters");
  const jobsSection = findSection<StrapiJobsSection>(data.sections, "careers.job-application-details");
  const applicationForm = findSection<StrapiApplicationFormSection>(data.sections, "careers.job-application-form-content");
  const cultureGallery = findSection<StrapiCultureGallerySection>(data.sections, "page-reusable-sections.culture-gallery");
  const ctaBanner = findSection<StrapiCareersCtaBannerSection>(data.sections, "page-reusable-sections.cta-banner");

  if (!hero || !statistics || !whyJoin || !tabFilters || !jobsSection || !applicationForm || !cultureGallery || !ctaBanner) {
    return null;
  }

  return {
    seo: {
      metaTitle: data.seo?.metaTitle ?? "",
      metaDescription: data.seo?.metaDescription ?? "",
    },
    hero: mapCareersHero(hero),
    stats: mapStatistics(statistics).map(({ value, label }) => ({ value, label })),
    whyJoin: { heading: whyJoin.title },
    benefits: mapCareersBenefits(whyJoin),
    filters: mapCareersFilters(tabFilters),
    roles: mapCareersRoles(jobsSection),
    lifeAtTechGrit: mapCareersCultureGallery(cultureGallery),
    cta: mapCareersCta(ctaBanner),
    applicationForm: mapApplicationForm(applicationForm),
  };
});

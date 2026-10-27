import { cache } from "react";
import { fetchCms } from "./fetcher";
import { mapSectionIcon } from "../shared/reusable-sections";
import { mapCtaBanner } from "../shared/reusable-sections";
import type { StrapiCtaBannerSection } from "../shared/reusable-sections";
import type {
  JobDetailBodySection,
  JobDetailContent,
  JobDetailHeaderContent,
  ResponsibilityGroupContent,
  StrapiJobApplicationFormSection,
  StrapiJobDetailPage,
  StrapiJobDetailSection,
  StrapiJobHeaderSection,
  StrapiKeyResponsibilitiesSection,
  StrapiQualificationsSection,
  StrapiSummarySection,
} from "../types/job-detail-types";
import type { ApplicationFormContent, JobFormField } from "../types/careers-types";

// Deep-populate query for every job-detailed-view.* component, plus the two generic shared
// components (application-form-content, cta-banner) this page's dynamic zone also carries —
// mirrors the `on`-keyed populate convention already used by cms/api/careers.ts.
const jobDetailEndpoint = (slug: string) =>
  `/api/pages/by-slug/${encodeURIComponent(slug)}` +
  "?populate[seo][populate]=*" +
  "&populate[sections][on][job-detailed-view.job-header][populate]=jobTypeIcon,locationIcon,calendarIcon" +
  "&populate[sections][on][job-detailed-view.summary][populate]=*" +
  "&populate[sections][on][job-detailed-view.key-responsibilities][populate][ResponsibilityGroup][populate][ResponsibilityItems][populate]=*" +
  "&populate[sections][on][job-detailed-view.qualifications][populate][ResponsibilityItem][populate]=*" +
  "&populate[sections][on][careers.job-application-form-content][populate][jobFormFields][populate]=icon" +
  "&populate[sections][on][page-reusable-sections.cta-banner][populate]=*";

function formatPublishedDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(
    new Date(iso),
  );
}

function mapHeader(cms: StrapiJobHeaderSection): JobDetailHeaderContent {
  return {
    badgeLabel: cms.badgeLabel,
    title: cms.title,
    ctaLabel: cms.ctaLabel,
    jobType: cms.jobType,
    jobTypeIcon: mapSectionIcon(cms.jobTypeIcon),
    location: cms.location,
    locationIcon: mapSectionIcon(cms.locationIcon),
    publishedDateLabel: cms.publishedDateLabel,
    publishedDate: formatPublishedDate(cms.publishedDate),
    calendarIcon: mapSectionIcon(cms.calendarIcon),
  };
}

// A group/qualifications heading is frequently entered in the CMS with a stray leading space
// (" Key Responsibilities:", " Our Mission:") — trimmed here rather than at every render site.
function trim(value: string | null): string {
  return (value ?? "").trim();
}

function mapKeyResponsibilities(cms: StrapiKeyResponsibilitiesSection): JobDetailBodySection {
  const groups: ResponsibilityGroupContent[] = cms.ResponsibilityGroup.map((group) => ({
    heading: group.name ? trim(group.name) : null,
    items: group.ResponsibilityItems.map((item) => item.subtitle),
  }));
  return { type: "responsibilityList", title: trim(cms.title), groups, trailingText: null };
}

// The `qualifications` component has no per-group name field at all — its items form one
// implicit, unheaded group. Its `extraTitle` is a trailing paragraph rendered after the
// bullets under the same main heading (observed usage: a closing note, not "extra" bullets).
function mapQualifications(cms: StrapiQualificationsSection): JobDetailBodySection {
  return {
    type: "responsibilityList",
    title: trim(cms.title),
    groups: [{ heading: null, items: cms.ResponsibilityItem.map((item) => item.subtitle) }],
    trailingText: cms.extraTitle ? cms.extraTitle.trim() : null,
  };
}

function mapSummary(cms: StrapiSummarySection): JobDetailBodySection {
  return {
    type: "summary",
    title: cms.title ? trim(cms.title) : null,
    paragraphs: cms.subtitle.split("\n\n"),
  };
}

function mapJobFormField(field: StrapiJobApplicationFormSection["jobFormFields"][number]): JobFormField {
  const requiredMark = field.fieldRequiredLabel;
  return {
    label: field.label,
    placeholder: field.placeholder,
    requiredMark: requiredMark === "*" || requiredMark === "optional" ? requiredMark : null,
    acceptedFormatsAndSize: field.acceptedFormatsAndSize,
    uploadPromptText: field.uploadPromptText,
    icon: mapSectionIcon(field.icon),
  };
}

function mapApplicationForm(cms: StrapiJobApplicationFormSection): ApplicationFormContent {
  return {
    badgeLabel: cms.badgeLabel,
    subtitle: cms.subtitle,
    ctaLabel: cms.ctaLabel,
    privacyNote: cms.privacyNote,
    fields: cms.jobFormFields.map(mapJobFormField),
  };
}

function isComponent<T extends StrapiJobDetailSection>(
  section: StrapiJobDetailSection,
  component: string,
): section is T {
  return section.__component === component;
}

// Returns the full job-detail page content for one slug, or null when the CMS is
// unreachable, the page doesn't exist, or a required section (header/application
// form/final CTA) is missing — the caller 404s rather than render a page with holes in it.
// `body` preserves the CMS's own section order/count exactly; the page renders it as a
// straight loop, so a job with a different number of key-responsibilities/qualifications
// blocks needs zero UI changes.
export const getJobDetailContent = cache(async (slug: string): Promise<JobDetailContent | null> => {
  const data = await fetchCms<StrapiJobDetailPage & { seo?: { metaTitle: string | null; metaDescription: string | null } | null }>(
    jobDetailEndpoint(slug),
  );
  if (!data) return null;

  const header = data.sections.find((s): s is StrapiJobHeaderSection => isComponent(s, "job-detailed-view.job-header"));
  const applicationFormSection = data.sections.find((s): s is StrapiJobApplicationFormSection =>
    isComponent(s, "careers.job-application-form-content"),
  );
  const ctaBannerSection = data.sections.find((s): s is StrapiCtaBannerSection =>
    isComponent(s, "page-reusable-sections.cta-banner"),
  );

  if (!header || !applicationFormSection || !ctaBannerSection) return null;

  const body: JobDetailBodySection[] = data.sections
    .map((section): JobDetailBodySection | null => {
      if (isComponent<StrapiSummarySection>(section, "job-detailed-view.summary")) return mapSummary(section);
      if (isComponent<StrapiKeyResponsibilitiesSection>(section, "job-detailed-view.key-responsibilities"))
        return mapKeyResponsibilities(section);
      if (isComponent<StrapiQualificationsSection>(section, "job-detailed-view.qualifications"))
        return mapQualifications(section);
      return null;
    })
    .filter((section): section is JobDetailBodySection => section !== null);

  return {
    seo: {
      title: data.seo?.metaTitle ?? header.title,
      description: data.seo?.metaDescription ?? "",
    },
    header: mapHeader(header),
    body,
    applicationForm: mapApplicationForm(applicationFormSection),
    finalCta: mapCtaBanner(ctaBannerSection),
  };
});

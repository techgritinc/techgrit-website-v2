import { cache } from "react";
import { fetchCms } from "./fetcher";
import { mapCtaBanner, mapSectionIcon, mapStatistics } from "../shared/reusable-sections";
import type { StrapiCtaBannerSection, StrapiStatisticsSection } from "../shared/reusable-sections";
import { resolveMediaUrl, pickMediaAsset } from "../utils/media";
import { ROUTES } from "@/lib/routes";
import type { StrapiMedia } from "../types/strapi-common";
import type {
  CaseStudyDetailPageContent,
  CaseStudyDetailSectionEntry,
  CaseStudyImage,
  CaseStudyTable,
  DetailHeroSection,
  FinalCtaSection,
  NarrativeBlockEntry,
  ResponsibilitySection,
  TechStackSection,
  StatisticsSection,
  StrapiCaseStudyDetailPage,
  StrapiCaseStudyDetailSection,
  StrapiContentSectionItem,
  StrapiContentSectionsSection,
  StrapiKeyResponsibilitiesSection,
  StrapiServiceDetailSection,
  StrapiSummarySection,
  StrapiTeamCompositionSection,
  TeamCompositionSection,
} from "../types/case-study-detail-types";

// The case-study COLLECTION endpoint, not /api/pages/by-slug — a case study's detail content
// lives on the case-study record itself. This route deep-populates on the server, so it needs
// no populate params of its own (unlike every other page fetcher in this folder).
function caseStudyDetailEndpoint(slug: string): string {
  return `/api/case-studies/by-slug/${encodeURIComponent(slug)}`;
}

// e.g. "2024-11-26T00:00:00.000Z" -> "26 Nov, 2024" — matches the previous static copy's
// format. `iso` can be null (unset in the CMS); `new Date(null)` silently resolves to the
// Unix epoch rather than throwing, so this needs its own explicit guard.
function formatPublishedDate(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  return `${day} ${month}, ${date.getUTCFullYear()}`;
}

// Carries the CMS's own intrinsic dimensions through to the component, so images render at
// their real aspect ratio rather than a hardcoded box.
function mapImage(asset: StrapiMedia, preferred: ("small" | "medium" | "large")[]): CaseStudyImage {
  const picked = pickMediaAsset(asset, preferred);
  return {
    url: resolveMediaUrl(picked.url),
    alt: asset.alternativeText ?? "",
    width: picked.width,
    height: picked.height,
  };
}

// Hero data is top-level on this endpoint rather than a dynamic-zone component. The CMS
// leaves the back-link label/url unset, so both fall back to this app's own list route —
// they're navigation constants, not content.
function mapHero(cms: StrapiCaseStudyDetailPage): DetailHeroSection {
  return {
    type: "hero",
    caseStudyLabel: cms.caseStudyLabel ?? "",
    title: cms.title,
    subtitle: cms.subtitle ?? "",
    publishedDate: formatPublishedDate(cms.publishedDate),
    publishedDateIcon: mapSectionIcon(cms.publishedDateIcon),
    categoryLabel: cms.case_study_category?.name ?? "",
    allCaseStudiesLabel: cms.allCaseStudiesLabel ?? "All Case Studies",
    allCaseStudiesUrl: cms.allCaseStudiesUrl ?? `${ROUTES.caseStudies}/`,
    image: cms.image[0] ? mapImage(cms.image[0], ["medium", "large"]) : null,
  };
}

// The CMS sends one `subtitle` string with blank-line-separated paragraphs instead of an
// array — split here once so the component only ever deals with a paragraph list. A
// bullet-only or picture-only item has no prose at all, so `subtitle` is null there.
function splitParagraphs(subtitle: string | null): string[] {
  if (!subtitle) return [];
  return subtitle
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
}

// A table arrives as parallel `columns` (header labels) and `rows` (one object per row), but
// the row keys line up with neither the labels nor their order: columns
// ["Category", "System", "Role in the Platform"] come with row keys ["role","system","category"],
// while ["Outcome", "What Changed"] come with ["outcome","whatChanged"]. So a key is matched to
// a label by normalized prefix ("roleintheplatform".startsWith("role")), longest match first so
// a short key can't shadow a more specific one, with the row's own key order as a last resort.
// A new table whose keys don't share a prefix with their label would fall back to that order.
function normalizeTable(
  columns: { label: string }[] | null,
  rows: Record<string, string>[] | null
): CaseStudyTable | null {
  if (!columns?.length || !rows?.length) return null;

  const headers = columns.map((column) => column.label.trim());
  const rowKeys = Object.keys(rows[0]);

  const keyForColumn = headers.map((header, headerIndex) => {
    const normalizedHeader = normalizeKey(header);
    const matches = rowKeys
      .filter((key) => normalizedHeader.startsWith(normalizeKey(key)))
      .sort((a, b) => b.length - a.length);
    return matches[0] ?? rowKeys[headerIndex];
  });

  return {
    headers,
    rows: rows.map((row) => keyForColumn.map((key) => (key ? row[key] ?? "" : ""))),
  };
}

// One item from the CMS's flexible "ContentSection" list. `paragraphs`/`features`/`images`
// can each be empty — the component decides its rendered treatment from whichever ones are
// populated, so no "kind" flag is needed here; every item is mapped identically.
function mapContentSectionItem(item: StrapiContentSectionItem, index: number): NarrativeBlockEntry {
  return {
    type: "narrativeBlock",
    order: index + 1,
    title: item.title.trim(),
    paragraphs: splitParagraphs(item.subtitle),
    extraTitle: item.extraTitle?.trim() || null,
    features: item.features.map((feature, featureIndex) => ({
      order: featureIndex + 1,
      // `?? ""` rather than assuming a title: a picture/description-only feature can leave
      // this null (see the type's own comment) — `null.trim()` is exactly what crashed the
      // sprint-velocity case study before this guard existed.
      title: feature.title?.trim() ?? "",
      subtitle: feature.subtitle,
      description: feature.description?.length ? feature.description : null,
      table: normalizeTable(feature.columns, feature.rows),
      ctaLabel: feature.ctaLabel,
      ctaLink: feature.ctaLink,
      icon: mapSectionIcon(feature.icon),
      images: feature.image.map((asset) => mapImage(asset, ["small", "medium"])),
    })),
    images: item.architectureImage.map((asset) => mapImage(asset, ["medium", "large"])),
  };
}

// job-detailed-view.summary is a plain title + prose block. It carries no features, images
// or pull-quote, so it maps onto the same NarrativeBlockEntry shape a prose-only
// content-section item produces rather than needing a section type (and component) of its own.
function mapSummary(cms: StrapiSummarySection, order: number): NarrativeBlockEntry {
  return {
    type: "narrativeBlock",
    order,
    title: cms.title.trim(),
    paragraphs: splitParagraphs(cms.subtitle),
    extraTitle: null,
    features: [],
    images: [],
  };
}

// page-reusable-sections.service-detail's "approach steps" (tool name + role, e.g. "GitHub
// Copilot" / "Inline code completions...") render as a numbered-badge card grid — the same
// treatment components/ui/IndustryStepGrid.tsx already gives this exact CMS shape on the
// Industries pages — rather than the plain-prose treatment every other narrative section
// uses. subtitle/extraTitle/ctaLabel/ctaLink/serviceLabel/variant/image are unset on every
// case study observed so far and have no home in TechStackSection — if the CMS starts
// populating them, they'll need a real slot mapped in here rather than staying silently
// dropped the way this whole section was before this mapper existed.
function mapServiceDetail(cms: StrapiServiceDetailSection, order: number): TechStackSection {
  return {
    type: "techStack",
    order,
    title: cms.title.trim(),
    cards: cms.approachSteps.map((step, stepIndex) => ({
      order: stepIndex + 1,
      stepLabel: step.stepLabel ?? String(stepIndex + 1),
      icon: mapSectionIcon(step.icon),
      title: step.title?.trim() ?? "",
      subtitle: step.subtitle,
    })),
  };
}

// Same shape the Job Detail page maps (see cms/api/job-detail.ts) — the rich-text tree is
// passed through untouched and rendered by components/ui/BlocksContent.tsx.
function mapKeyResponsibilities(
  cms: StrapiKeyResponsibilitiesSection,
  order: number
): ResponsibilitySection {
  return {
    type: "responsibilityList",
    order,
    title: cms.title.trim(),
    extraTitle: cms.extraTitle?.trim() || null,
    groups: cms.ResponsibilityGroup.map((group) => ({
      heading: group.name ? group.name.trim() : null,
      items: group.ResponsibilityItems.map((item) => item.subtitle),
    })),
  };
}

function mapTeamComposition(cms: StrapiTeamCompositionSection): TeamCompositionSection {
  return {
    title: cms.title,
    ctaLabel: cms.ctaLabel,
    ctaLink: cms.ctaLink,
    members: cms.members.map((member, index) => ({
      order: index + 1,
      role: member.role,
      count: member.count,
    })),
  };
}

// Step 1: pull team-composition out of the CMS's flat array once — it's rendered as a
// sticky sidebar alongside the whole narrative, not inline at its own position in the
// section order (see the [slug]/page.tsx layout decision).
function parseCaseStudyDetailSections(rawSections: StrapiCaseStudyDetailSection[]) {
  return {
    rawSections,
    teamCms: rawSections.find(
      (section): section is StrapiTeamCompositionSection =>
        section.__component === "case-study-detailed-view.team-composition"
    ),
  };
}

// Step 2: walk the CMS's real section order, converting each recognized entry into its
// presentation-ready shape. Order is load-bearing here: prose sections (key-responsibilities)
// and content-sections interleave, so they must render in the CMS's sequence rather than
// being grouped by type. A section that's missing or unrecognized is left out entirely —
// there is no static fallback. team-composition is excluded here since it's consumed
// separately (see parseCaseStudyDetailSections above).
//
// flatMap (not map) because "content-section" is one raw CMS entry that expands into
// however many narrative-block entries its ContentSection array holds — every other case
// still returns a single-element array.
function mapCaseStudyDetailSections(
  parsed: ReturnType<typeof parseCaseStudyDetailSections>
): CaseStudyDetailSectionEntry[] {
  return parsed.rawSections
    .flatMap((section, index): CaseStudyDetailSectionEntry[] => {
      const order = index + 1;
      switch (section.__component) {
        case "page-reusable-sections.statistics":
          return [
            {
              type: "statistics",
              order,
              stats: mapStatistics(section as StrapiStatisticsSection),
            } satisfies StatisticsSection,
          ];
        case "case-study-detailed-view.content-section":
          return (section as StrapiContentSectionsSection).ContentSection.map(mapContentSectionItem);
        case "job-detailed-view.key-responsibilities":
          return [mapKeyResponsibilities(section as StrapiKeyResponsibilitiesSection, order)];
        case "job-detailed-view.summary":
          return [mapSummary(section as StrapiSummarySection, order)];
        case "page-reusable-sections.service-detail":
          return [mapServiceDetail(section as StrapiServiceDetailSection, order)];
        case "page-reusable-sections.cta-banner":
          return [
            {
              type: "finalCta",
              order,
              ...mapCtaBanner(section as StrapiCtaBannerSection),
            } satisfies FinalCtaSection,
          ];
        default:
          return [];
      }
    })
    .filter((section): section is Exclude<CaseStudyDetailSectionEntry, undefined> => section !== undefined);
}

// Called from the Case Study detail page's Server Component, keyed per slug. Returns null
// when the CMS itself is unreachable OR the slug doesn't exist (the endpoint 404s) — the page
// then renders a 404 (see [slug]/page.tsx), matching the list page's own
// no-static-fallback pattern.
//
// Wrapped in React's cache() because generateMetadata() and the page component each call
// this independently with the same slug — without memoization, one page request fires two
// identical CMS requests. cache() scopes the memoized result to a single request's render
// pass (not shared across requests or across different slugs), so only the first call for
// a given slug actually hits the network.
export const getCaseStudyDetailPageContent = cache(
  async (slug: string): Promise<CaseStudyDetailPageContent | null> => {
    const data = await fetchCms<StrapiCaseStudyDetailPage>(caseStudyDetailEndpoint(slug));
    if (!data) return null;

    const parsed = parseCaseStudyDetailSections(data.sections ?? []);

    return {
      seo: {
        metaTitle: data.seo?.metaTitle ?? "",
        metaDescription: data.seo?.metaDescription ?? "",
      },
      hero: mapHero(data),
      sections: mapCaseStudyDetailSections(parsed),
      team: parsed.teamCms ? mapTeamComposition(parsed.teamCms) : null,
    };
  }
);

import { cache } from "react";
import { fetchCms } from "./fetcher";
import { mapCtaBanner, mapSectionIcon, mapStatistics } from "../shared/reusable-sections";
import {
  formatPublishedDate,
  mapCapabilityGrid,
  mapContentSectionItem,
  mapImage,
  mapKeyResponsibilities,
  mapServiceDetail,
  mapSummary,
} from "../shared/article-sections";
import type { StrapiCtaBannerSection, StrapiStatisticsSection } from "../shared/reusable-sections";
import { ROUTES } from "@/lib/routes";
import type {
  CaseStudyDetailPageContent,
  CaseStudyDetailSectionEntry,
  DetailHeroSection,
  FinalCtaSection,
  StatisticsSection,
  StrapiCaseStudyDetailPage,
  StrapiCaseStudyDetailSection,
  StrapiContentSectionsSection,
  StrapiKeyResponsibilitiesSection,
  StrapiPdModernizationCapabilitiesSection,
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
        case "page-reusable-sections.pd-modernization-capabilities":
          return [mapCapabilityGrid(section as StrapiPdModernizationCapabilitiesSection, order)];
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

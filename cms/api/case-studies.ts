import { cache } from "react";
import { fetchCms } from "./fetcher";
import { mapCaseStudyCard, mapCtaBanner, mapHeroFields } from "../shared/reusable-sections";
import type { StrapiCtaBannerSection, StrapiHeroSection } from "../shared/reusable-sections";
import type {
  CaseStudiesFinalCtaSection,
  CaseStudiesHeroSection,
  CaseStudiesPageContent,
  CaseStudiesPageSectionEntry,
  CaseStudiesTabFiltersSection,
  CaseStudyCardsSection,
  StrapiCaseStudiesPage,
  StrapiCaseStudiesSection,
  StrapiCaseStudyCardsSection,
  StrapiTabFiltersSection,
} from "../types/case-studies-types";

// NOTE: populate paths for the dynamic zone follow Strapi v5's `on`-keyed syntax, same
// convention as cms/api/contact.ts / construction.ts — verify against the live instance.
const CASE_STUDIES_ENDPOINT =
  "/api/pages/by-slug/case-studies" +
  "?populate[seo][populate]=*" +
  "&populate[sections][on][page-reusable-sections.hero][populate]=backgroundImage" +
  "&populate[sections][on][page-reusable-sections.tab-filters][populate]=TabItems" +
  "&populate[sections][on][insights-case-studies.case-study-cards][populate][case_studies][populate][image]=true" +
  "&populate[sections][on][insights-case-studies.case-study-cards][populate][case_studies][populate][case_study_category]=true" +
  "&populate[sections][on][page-reusable-sections.cta-banner][populate]=true";

function mapHero(cms: StrapiHeroSection, order: number): CaseStudiesHeroSection {
  const fields = mapHeroFields(cms);
  return {
    type: "hero",
    order,
    eyebrow: fields.eyebrow,
    title: fields.title,
    titleHighlight: fields.titleHighlight,
    subtitle: fields.subtitle,
  };
}

function mapTabFilters(cms: StrapiTabFiltersSection, order: number): CaseStudiesTabFiltersSection {
  return {
    type: "tabFilters",
    order,
    tabs: cms.TabItems.map((tab, index) => ({
      order: index + 1,
      label: tab.label,
      value: tab.value,
      isDefault: tab.isDefault,
    })),
  };
}

function mapCaseStudyCards(cms: StrapiCaseStudyCardsSection, order: number): CaseStudyCardsSection {
  return {
    type: "caseStudyCards",
    order,
    caseStudies: cms.case_studies.map(mapCaseStudyCard),
  };
}

// Walks the CMS's real section order, converting each recognized entry into its
// presentation-ready shape. A section that's missing or unrecognized is left out entirely
// — there is no static fallback to substitute in its place.
function mapCaseStudiesSections(rawSections: StrapiCaseStudiesSection[]): CaseStudiesPageSectionEntry[] {
  return rawSections
    .map((section, index): CaseStudiesPageSectionEntry => {
      const order = index + 1;
      switch (section.__component) {
        case "page-reusable-sections.hero":
          return mapHero(section as StrapiHeroSection, order);
        case "page-reusable-sections.tab-filters":
          return mapTabFilters(section as StrapiTabFiltersSection, order);
        case "insights-case-studies.case-study-cards":
          return mapCaseStudyCards(section as StrapiCaseStudyCardsSection, order);
        case "page-reusable-sections.cta-banner":
          return {
            type: "finalCta",
            order,
            ...mapCtaBanner(section as StrapiCtaBannerSection),
          } satisfies CaseStudiesFinalCtaSection;
        default:
          return undefined;
      }
    })
    .filter((section): section is Exclude<CaseStudiesPageSectionEntry, undefined> => section !== undefined);
}

// Called from the Case Studies list page's Server Component. Returns null only when the
// CMS itself is unreachable — the page then renders a 404 (see page.tsx).
//
// Wrapped in React's cache() because generateMetadata() and the page component each call
// this independently — without memoization, one page request fires two identical CMS
// requests. cache() scopes the memoized result to a single request's render pass (not
// shared across requests), so only the first call actually hits the network.
export const getCaseStudiesPageContent = cache(async (): Promise<CaseStudiesPageContent | null> => {
  const data = await fetchCms<StrapiCaseStudiesPage>(CASE_STUDIES_ENDPOINT);
  if (!data) return null;

  return {
    seo: {
      metaTitle: data.seo?.metaTitle ?? "",
      metaDescription: data.seo?.metaDescription ?? "",
    },
    sections: mapCaseStudiesSections(data.sections),
  };
});

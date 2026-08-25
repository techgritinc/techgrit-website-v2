import { cache } from "react";
import { fetchCms } from "./fetcher";
import { mapCaseStudyCard, mapCtaBanner, mapSectionIcon, mapStatistics } from "../shared/reusable-sections";
import type { StrapiCtaBannerSection, StrapiStatisticsSection } from "../shared/reusable-sections";
import { resolveMediaUrl, pickMediaAsset } from "../utils/media";
import type { StrapiMedia } from "../types/strapi-common";
import type {
  CaseStudyDetailPageContent,
  CaseStudyDetailSectionEntry,
  DetailHeroSection,
  FinalCtaSection,
  MoreCaseStudiesSection,
  NarrativeBlockEntry,
  NarrativeImage,
  StatisticsSection,
  StrapiCaseStudyDetailHeroSection,
  StrapiCaseStudyDetailPage,
  StrapiCaseStudyDetailSection,
  StrapiContentSectionItem,
  StrapiContentSectionsSection,
  StrapiMoreCaseStudysSection,
  StrapiTeamCompositionSection,
  TeamCompositionSection,
} from "../types/case-study-detail-types";

// NOTE: populate paths for the dynamic zone follow Strapi v5's `on`-keyed syntax, same
// convention as cms/api/case-studies.ts / construction.ts — verify against the live instance.
function caseStudyDetailEndpoint(slug: string): string {
  return (
    `/api/pages/by-slug/${encodeURIComponent(slug)}` +
    "?populate[seo][populate]=*" +
    "&populate[sections][on][case-study-detailed-view.case-studie-hero][populate][image]=true" +
    "&populate[sections][on][case-study-detailed-view.case-studie-hero][populate][publishedDateIcon]=true" +
    "&populate[sections][on][page-reusable-sections.statistics][populate]=statistics" +
    "&populate[sections][on][case-study-detailed-view.content-section][populate][ContentSection][populate][architectureImage]=true" +
    "&populate[sections][on][case-study-detailed-view.content-section][populate][ContentSection][populate][features][populate][icon]=true" +
    "&populate[sections][on][case-study-detailed-view.content-section][populate][ContentSection][populate][features][populate][image]=true" +
    "&populate[sections][on][case-study-detailed-view.team-composition][populate]=members" +
    "&populate[sections][on][case-study-detailed-view.more-case-studys][populate][case_studies][populate][image]=true" +
    "&populate[sections][on][case-study-detailed-view.more-case-studys][populate][case_studies][populate][case_study_category]=true" +
    "&populate[sections][on][page-reusable-sections.cta-banner][populate]=true"
  );
}

// e.g. "2024-11-26T00:00:00.000Z" -> "26 Nov, 2024" — matches the previous static copy's format.
// `iso` can be null (unset in the CMS); `new Date(null)` silently resolves to the Unix epoch
// rather than throwing, so this needs its own explicit guard rather than relying on a crash.
function formatPublishedDate(iso: string | null): string {
  if (!iso) return "";
  const date = new Date(iso);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = date.toLocaleString("en-US", { month: "short", timeZone: "UTC" });
  return `${day} ${month}, ${date.getUTCFullYear()}`;
}

function mapHero(cms: StrapiCaseStudyDetailHeroSection, order: number): DetailHeroSection {
  const asset = cms.image[0] ? pickMediaAsset(cms.image[0], ["medium", "large"]) : null;
  return {
    type: "hero",
    order,
    categoryLabel: cms.caseStudyLabel,
    title: cms.title,
    subtitle: cms.subtitle ?? "",
    publishedDate: formatPublishedDate(cms.publishedDate),
    publishedDateIcon: mapSectionIcon(cms.publishedDateIcon),
    allCaseStudiesLabel: cms.allCaseStudiesLabel,
    allCaseStudiesUrl: cms.allCaseStudiesUrl,
    image:
      asset && cms.image[0]
        ? { url: resolveMediaUrl(asset.url), alt: cms.image[0].alternativeText ?? "" }
        : null,
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

function mapNarrativeImage(asset: StrapiMedia): NarrativeImage {
  return { url: resolveMediaUrl(asset.url), alt: asset.alternativeText ?? "" };
}

// One item from the CMS's flexible "ContentSection" list. `paragraphs`/`features`/`images`
// can each be empty — the component decides its rendered treatment from whichever ones are
// populated, so no "kind" flag is needed here; every item is mapped identically.
function mapContentSectionItem(item: StrapiContentSectionItem, index: number): NarrativeBlockEntry {
  return {
    type: "narrativeBlock",
    order: index + 1,
    title: item.title,
    subheading: item.subheading ?? null,
    paragraphs: splitParagraphs(item.subtitle),
    features: item.features.map((feature, featureIndex) => ({
      order: featureIndex + 1,
      title: feature.title,
      subtitle: feature.subtitle,
      icon: mapSectionIcon(feature.icon),
      images: feature.image.map(mapNarrativeImage),
    })),
    images: item.architectureImage.map(mapNarrativeImage),
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

function mapMoreCaseStudies(cms: StrapiMoreCaseStudysSection, order: number): MoreCaseStudiesSection {
  return {
    type: "moreCaseStudies",
    order,
    title: cms.title,
    subtitle: cms.subtitle,
    caseStudies: cms.case_studies.map(mapCaseStudyCard),
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
// presentation-ready shape. A section that's missing or unrecognized is left out entirely
// — there is no static fallback to substitute in its place. team-composition is excluded
// here since it's consumed separately (see parseCaseStudyDetailSections above).
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
        case "case-study-detailed-view.case-studie-hero":
          return [mapHero(section as StrapiCaseStudyDetailHeroSection, order)];
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
        case "case-study-detailed-view.more-case-studys":
          return [mapMoreCaseStudies(section as StrapiMoreCaseStudysSection, order)];
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
// when the CMS itself is unreachable OR the slug doesn't exist — the page then renders a
// 404 (see [slug]/page.tsx), matching the list page's own no-static-fallback pattern.
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

    const parsed = parseCaseStudyDetailSections(data.sections);

    return {
      seo: {
        metaTitle: data.seo?.metaTitle ?? "",
        metaDescription: data.seo?.metaDescription ?? "",
      },
      sections: mapCaseStudyDetailSections(parsed),
      team: parsed.teamCms ? mapTeamComposition(parsed.teamCms) : null,
    };
  }
);

import { cache } from "react";
import { fetchCms } from "../fetcher";
import { mapCtaBanner, mapHeroFields } from "../../shared/reusable-sections";
import type { StrapiCtaBannerSection, StrapiHeroSection } from "../../shared/reusable-sections";
import {
  mapConnectedSystems,
  mapEngineeringServices,
  mapFeaturedCapabilities,
  mapProductLifecycle,
  mapSolutionsWeSupport,
  mapWhatWeBuild,
} from "../../shared/industry-sections";
import type {
  FinalCtaSection,
  HealthcarePageContent,
  HeroSection,
  PageSectionEntry,
  StrapiHealthCareSystemSection,
  StrapiHealthcarePage,
  StrapiHealthcareSection,
  StrapiModernizationChallengesSection,
  StrapiProvenImpactSection,
  StrapiServiceDetailSection,
} from "../../types/healthcare";


const HEALTHCARE_ENDPOINT =
  "/api/pages/by-slug/healthcare" +
  "?populate[seo][populate]=*" +
  "&populate[sections][on][page-reusable-sections.hero][populate]=backgroundImage" +
  "&populate[sections][on][page-reusable-sections.service-detail][populate]=approachSteps.icon" +
  "&populate[sections][on][page-reusable-sections.modernization-challenges][populate][blockers][populate]=features" +
  "&populate[sections][on][industries-construction.proven-impact][populate]=caseStudyCards" +
  "&populate[sections][on][industries-construction.pd-health-care-system][populate][categories][populate]=features" +
  "&populate[sections][on][page-reusable-sections.cta-banner][populate]=true";

// The 3 identical "service-detail" entries are disambiguated by `serviceLabel`, NOT `variant` —
// two of them ("AI Across the Healthcare Product Lifecycle" and "Our HealthTech Engineering
// Services") share the same variant, "PD-modernizationLifecycle" (research.md §2). "Featured
// Capabilities" is no longer one of these — it moved to its own `proven-impact` component.
const SERVICE_LABELS = {
  whatWeBuild: "What We Build",
  productLifecycle: "Healthcare Product Lifecycle",
  engineeringServices: "HealthTech Engineering Services",
} as const;

// --- Per-section mappers: each converts one Strapi shape into its presentation shape. ---

function mapHero(cms: StrapiHeroSection, order: number): HeroSection {
  const fields = mapHeroFields(cms);
  return {
    type: "hero",
    order,
    eyebrow: fields.eyebrow,
    title: fields.title,
    titleHighlight: fields.titleHighlight,
    subtitle: fields.subtitle,
    primaryCtaLabel: fields.primaryCtaLabel,
    primaryCtaLink: fields.primaryCtaLink,
    image: fields.image,
  };
}

// mapWhatWeBuild, mapProductLifecycle, mapEngineeringServices, mapSolutionsWeSupport, and
// mapFeaturedCapabilities are now shared (imported above from ../shared/industry-sections) —
// this page's titles need no override, so they're called with no titleOverride argument.

// --- Orchestration: fetch, parse, assemble. ---

// Step 1: pull the raw section list out of the CMS response once, mirroring
// cms/api/construction.ts's parse/map split (no shared cross-section state needed here).
function parseHealthcareSections(rawSections: StrapiHealthcareSection[]) {
  return { rawSections };
}

// Step 2: walk the CMS's real section order, converting each recognized entry into its
// presentation-ready shape. A section that's missing or unrecognized is left out entirely
// — there is no static fallback to substitute in its place (FR-003).
function mapHealthcareSections(
  parsed: ReturnType<typeof parseHealthcareSections>
): PageSectionEntry[] {
  const { rawSections } = parsed;

  return rawSections
    .map((section, index): PageSectionEntry => {
      const order = index + 1;
      switch (section.__component) {
        case "page-reusable-sections.hero":
          return mapHero(section as StrapiHeroSection, order);
        case "page-reusable-sections.modernization-challenges":
          return mapSolutionsWeSupport(section as StrapiModernizationChallengesSection, order);
        case "industries-construction.pd-health-care-system":
          return mapConnectedSystems(section as StrapiHealthCareSystemSection, order);
        case "industries-construction.proven-impact":
          return mapFeaturedCapabilities(section as StrapiProvenImpactSection, order);
        case "page-reusable-sections.cta-banner":
          return {
            type: "finalCta",
            order,
            ...mapCtaBanner(section as StrapiCtaBannerSection),
          } satisfies FinalCtaSection;
        case "page-reusable-sections.service-detail": {
          const detail = section as StrapiServiceDetailSection;
          if (detail.serviceLabel === SERVICE_LABELS.whatWeBuild) return mapWhatWeBuild(detail, order);
          if (detail.serviceLabel === SERVICE_LABELS.productLifecycle)
            return mapProductLifecycle(detail, order);
          if (detail.serviceLabel === SERVICE_LABELS.engineeringServices)
            return mapEngineeringServices(detail, order);
          return undefined; // unrecognized serviceLabel — skip rather than guess
        }
        default:
          return undefined;
      }
    })
    .filter((section): section is Exclude<PageSectionEntry, undefined> => section !== undefined);
}

// Called from the Healthcare page's Server Component. Returns null only when the CMS itself
// is unreachable — the page then renders a 404 (see page.tsx).
//
// Wrapped in React's cache() because generateMetadata() and the page component each call this
// independently — without memoization, one page request fires two identical CMS requests.
export const getHealthcarePageContent = cache(async (): Promise<HealthcarePageContent | null> => {
  const data = await fetchCms<StrapiHealthcarePage>(HEALTHCARE_ENDPOINT);
  if (!data) return null;

  const parsed = parseHealthcareSections(data.sections);
  const sections = mapHealthcareSections(parsed);

  return {
    seo: {
      metaTitle: data.seo?.metaTitle ?? "",
      metaDescription: data.seo?.metaDescription ?? "",
    },
    sections,
  };
});

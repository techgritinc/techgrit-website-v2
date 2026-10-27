import { cache } from "react";
import { fetchCms } from "../fetcher";
import { mapCtaBanner, mapHeroFields } from "../../shared/reusable-sections";
import type { StrapiCtaBannerSection, StrapiHeroSection } from "../../shared/reusable-sections";
import {
  mapEngineeringServices,
  mapFeaturedCapabilities,
  mapProductLifecycle,
  mapSolutionsWeSupport,
  mapWhatWeBuild,
} from "../../shared/industry-sections";
import type {
  FinalCtaSection,
  FintechPageContent,
  HeroSection,
  PageSectionEntry,
  StrapiFintechPage,
  StrapiFintechSection,
  StrapiModernizationChallengesSection,
  StrapiProvenImpactSection,
  StrapiServiceDetailSection,
} from "../../types/fintech";

const FINTECH_ENDPOINT =
  "/api/pages/by-slug/fintech" +
  "?populate[seo][populate]=*" +
  "&populate[sections][on][page-reusable-sections.hero][populate]=backgroundImage" +
  "&populate[sections][on][page-reusable-sections.service-detail][populate]=approachSteps.icon" +
  "&populate[sections][on][page-reusable-sections.modernization-challenges][populate][blockers][populate]=features" +
  "&populate[sections][on][industries-construction.proven-impact][populate]=caseStudyCards" +
  "&populate[sections][on][page-reusable-sections.cta-banner][populate]=true";

// The 3 "service-detail" entries are disambiguated by the CMS's own `variant` field — same
// pattern as cms/api/industries/construction.ts and cms/api/industries/healthcare.ts. Matching
// on `serviceLabel` (this page's own copy-paste artifact from Healthcare — one entry's
// `serviceLabel` was literally "HealthTech Engineering Services" on the FinTech page) meant
// renaming that label in the CMS would silently delete the whole section, the same bug fixed
// on Healthcare. `variant` was already distinct per entry here (challanges/solutions/advantage),
// so no CMS change was needed to make this switch. The displayed titles are still corrected via
// titleOverride below — that's unrelated to matching and stays as-is.
const SERVICE_VARIANTS = {
  whatWeBuild: "challanges",
  productLifecycle: "solutions",
  engineeringServices: "advantage",
} as const;

const TITLE_OVERRIDES = {
  productLifecycle: "AI Across the FinTech Product Lifecycle",
  engineeringServices: "Our FinTech Engineering Services",
} as const;

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

// --- Orchestration: fetch, parse, assemble (mirrors cms/api/healthcare.ts's structure). ---

function parseFintechSections(rawSections: StrapiFintechSection[]) {
  return { rawSections };
}

// A section that's missing or unrecognized is left out entirely — no static fallback (mirrors
// cms/api/healthcare.ts's FR-003 behavior).
function mapFintechSections(parsed: ReturnType<typeof parseFintechSections>): PageSectionEntry[] {
  const { rawSections } = parsed;

  return rawSections
    .map((section, index): PageSectionEntry => {
      const order = index + 1;
      switch (section.__component) {
        case "page-reusable-sections.hero":
          return mapHero(section as StrapiHeroSection, order);
        case "page-reusable-sections.modernization-challenges":
          return mapSolutionsWeSupport(section as StrapiModernizationChallengesSection, order);
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
          if (detail.variant === SERVICE_VARIANTS.whatWeBuild) return mapWhatWeBuild(detail, order);
          if (detail.variant === SERVICE_VARIANTS.productLifecycle)
            return mapProductLifecycle(detail, order, TITLE_OVERRIDES.productLifecycle);
          if (detail.variant === SERVICE_VARIANTS.engineeringServices)
            return mapEngineeringServices(detail, order, TITLE_OVERRIDES.engineeringServices);
          return undefined; // unrecognized variant — skip rather than guess
        }
        default:
          return undefined;
      }
    })
    .filter((section): section is Exclude<PageSectionEntry, undefined> => section !== undefined);
}

// Called from the FinTech page's Server Component. Returns null only when the CMS itself is
// unreachable — the page then renders a 404 (see page.tsx).
//
// Wrapped in React's cache() because generateMetadata() and the page component each call this
// independently — without memoization, one page request fires two identical CMS requests.
export const getFintechPageContent = cache(async (): Promise<FintechPageContent | null> => {
  const data = await fetchCms<StrapiFintechPage>(FINTECH_ENDPOINT);
  if (!data) return null;

  const parsed = parseFintechSections(data.sections);
  const sections = mapFintechSections(parsed);

  return {
    seo: {
      metaTitle: data.seo?.metaTitle ?? "",
      metaDescription: data.seo?.metaDescription ?? "",
    },
    sections,
  };
});

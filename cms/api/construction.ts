import { fetchCms } from "./fetcher";
import { mapCtaBanner, mapHeroFields, mapStatistics } from "../shared/reusable-sections";
import type {
  StrapiCtaBannerSection,
  StrapiHeroSection,
  StrapiStatisticsSection,
} from "../shared/reusable-sections";
import { resolveMediaUrl } from "../utils/media";
import type {
  AdvantageSection,
  ChallengesSection,
  ConstructionPageContent,
  FinalCtaSection,
  HeroSection,
  ImpactSection,
  IntegrationsStripSection,
  LifecycleDiagramSection,
  PageSectionEntry,
  SectionIcon,
  SolutionsSection,
  StrapiApproachStep,
  StrapiConstructionPage,
  StrapiConstructionSection,
  StrapiIntegrationsBannerSection,
  StrapiOrbitDiagramSection,
  StrapiProvenImpactSection,
  StrapiServiceDetailSection,
} from "../types/construction";

// NOTE: populate paths for the dynamic zone follow Strapi v5's `on`-keyed syntax. Verify
// against the real instance — the sample response this was built from didn't include the
// query string that produced it.
const CONSTRUCTION_ENDPOINT =
  "/api/pages/by-slug/construction" +
  "?populate[seo][populate]=*" +
  "&populate[sections][on][page-reusable-sections.hero][populate]=backgroundImage" +
  "&populate[sections][on][page-reusable-sections.statistics][populate]=statistics" +
  "&populate[sections][on][industries-construction.integrations-banner][populate]=partners" +
  "&populate[sections][on][industries-construction.orbit-diagram][populate][centerNode][populate]=steps" +
  "&populate[sections][on][industries-construction.proven-impact][populate]=caseStudyCards" +
  "&populate[sections][on][page-reusable-sections.cta-banner][populate]=true" +
  "&populate[sections][on][page-reusable-sections.service-detail][populate]=approachSteps";

// --- Per-section mappers: each converts one Strapi shape into its presentation shape. ---

function mapHero(
  cms: StrapiHeroSection,
  statsCms: StrapiStatisticsSection | undefined,
  order: number
): HeroSection {
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
    secondaryCtaLabel: fields.secondaryCtaLabel,
    secondaryCtaLink: fields.secondaryCtaLink,
    image: fields.image,
    stats: statsCms ? mapStatistics(statsCms) : [],
  };
}

function mapStepIcon(icon: StrapiApproachStep["icon"]): SectionIcon | null {
  if (!icon) return null;
  return { url: resolveMediaUrl(icon.url), alt: icon.alternativeText ?? "" };
}

function mapIntegrationsStrip(
  cms: StrapiIntegrationsBannerSection,
  order: number
): IntegrationsStripSection {
  return {
    type: "integrationsStrip",
    order,
    label: cms.title,
    partners: cms.partners.map((partner, index) => ({ order: index + 1, name: partner.name })),
  };
}

function mapLifecycleDiagram(
  cms: StrapiOrbitDiagramSection,
  order: number
): LifecycleDiagramSection {
  return {
    type: "lifecycleDiagram",
    order,
    eyebrow: cms.badgeLabel,
    title: cms.title,
    engineLabel: cms.centerNode.title,
    engineSubLabel: cms.centerNode.subtitle,
    nodes: [...cms.centerNode.steps]
      .sort((a, b) => a.number - b.number)
      .map((step) => ({ order: step.number, name: step.label })),
  };
}

function mapChallenges(cms: StrapiServiceDetailSection, order: number): ChallengesSection {
  return {
    type: "challenges",
    order,
    eyebrow: cms.serviceLabel,
    title: cms.title,
    description: cms.subtitle ?? "",
    challenges: cms.approachSteps.map((step, index) => ({
      order: index + 1,
      label: step.title,
      icon: mapStepIcon(step.icon),
    })),
  };
}

function mapSolutions(cms: StrapiServiceDetailSection, order: number): SolutionsSection {
  return {
    type: "solutions",
    order,
    eyebrow: cms.serviceLabel,
    title: cms.title,
    solutions: cms.approachSteps.map((step, index) => ({
      order: index + 1,
      title: step.title,
      description: step.subtitle ?? "",
      icon: mapStepIcon(step.icon),
    })),
  };
}

function mapAdvantage(cms: StrapiServiceDetailSection, order: number): AdvantageSection {
  return {
    type: "advantage",
    order,
    eyebrow: cms.serviceLabel,
    title: cms.title,
    description: cms.subtitle ?? "",
    points: cms.approachSteps.map((step, index) => ({
      order: index + 1,
      title: step.title,
      description: step.subtitle ?? "",
    })),
  };
}

function mapImpact(cms: StrapiProvenImpactSection, order: number): ImpactSection {
  return {
    type: "impact",
    order,
    eyebrow: cms.badgeLabel,
    title: cms.title,
    caseStudies: cms.caseStudyCards.map((card, index) => ({
      order: index + 1,
      metric: card.name,
      label: card.caseLabel,
      title: card.title,
      description: card.subtitle,
      link: card.ctaLink,
    })),
  };
}

// The 3 identical "service-detail" entries are now disambiguated by the CMS's own
// `variant` field — added after position-based matching (1st/2nd/3rd in the response)
// turned out to be unreliable in practice. NOTE: "challanges" is a real misspelling in
// the CMS data, not a typo here — see the note on StrapiServiceDetailSection.
const SERVICE_VARIANTS = {
  challenges: "challanges",
  solutions: "solutions",
  advantage: "advantage",
} as const;

// --- Orchestration: fetch, parse, assemble. ---

// Step 1: pull each recognized raw section out of the CMS's flat array once, so the
// mapping step below doesn't re-scan the array per section type.
function parseConstructionSections(rawSections: StrapiConstructionSection[]) {
  return {
    rawSections,
    statsCms: rawSections.find(
      (section): section is StrapiStatisticsSection =>
        section.__component === "page-reusable-sections.statistics"
    ),
  };
}

// Step 2: walk the CMS's real section order, converting each recognized entry into its
// presentation-ready shape. A section that's missing or unrecognized is left out entirely
// — there is no static fallback to substitute in its place.
function mapConstructionSections(
  parsed: ReturnType<typeof parseConstructionSections>
): PageSectionEntry[] {
  const { rawSections, statsCms } = parsed;

  return rawSections
    .map((section, index): PageSectionEntry => {
      const order = index + 1;
      switch (section.__component) {
        case "page-reusable-sections.hero":
          return mapHero(section as StrapiHeroSection, statsCms, order);
        case "industries-construction.integrations-banner":
          return mapIntegrationsStrip(section as StrapiIntegrationsBannerSection, order);
        case "industries-construction.orbit-diagram":
          return mapLifecycleDiagram(section as StrapiOrbitDiagramSection, order);
        case "industries-construction.proven-impact":
          return mapImpact(section as StrapiProvenImpactSection, order);
        case "page-reusable-sections.cta-banner":
          return {
            type: "finalCta",
            order,
            ...mapCtaBanner(section as StrapiCtaBannerSection),
          } satisfies FinalCtaSection;
        case "page-reusable-sections.service-detail": {
          const detail = section as StrapiServiceDetailSection;
          if (detail.variant === SERVICE_VARIANTS.challenges) return mapChallenges(detail, order);
          if (detail.variant === SERVICE_VARIANTS.solutions) return mapSolutions(detail, order);
          if (detail.variant === SERVICE_VARIANTS.advantage) return mapAdvantage(detail, order);
          return undefined; // unrecognized variant — skip rather than guess
        }
        // "page-reusable-sections.statistics" is consumed into Hero above, not its own
        // rendered section; anything else unrecognized is skipped.
        default:
          return undefined;
      }
    })
    .filter((section): section is Exclude<PageSectionEntry, undefined> => section !== undefined);
}

// Called from the Construction page's Server Component. Returns null only when the CMS
// itself is unreachable — the page then renders a 404 (see page.tsx).
export async function getConstructionPageContent(): Promise<ConstructionPageContent | null> {
  const data = await fetchCms<StrapiConstructionPage>(CONSTRUCTION_ENDPOINT);
  if (!data) return null;

  const parsed = parseConstructionSections(data.sections);
  const sections = mapConstructionSections(parsed);

  return {
    seo: {
      metaTitle: data.seo?.metaTitle ?? "",
      metaDescription: data.seo?.metaDescription ?? "",
    },
    sections,
  };
}

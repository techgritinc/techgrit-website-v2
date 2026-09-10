import type {
  SectionIcon,
  StrapiCtaBannerSection,
  StrapiHeroSection,
  StrapiStatisticsSection,
} from "../shared/reusable-sections";
import type { ConnectedSystemsSection, StrapiHealthCareSystemSection } from "../shared/industry-sections";
import type { StrapiMedia } from "./strapi-common";

export type { SectionIcon } from "../shared/reusable-sections";
export type { ConnectedSystemsSection, StrapiHealthCareSystemSection } from "../shared/industry-sections";

// ---------------------------------------------------------------------------
// Strapi-side raw shapes — construction-specific components (not reused by other pages,
// mirrors the shared-vs-route-local split already used for the component library).
// ---------------------------------------------------------------------------

export type StrapiIntegrationPartner = {
  name: string;
};

export type StrapiIntegrationsBannerSection = {
  __component: "industries-construction.integrations-banner";
  title: string;
  partners: StrapiIntegrationPartner[];
};

export type StrapiLifecycleStep = {
  label: string;
  number: number;
};

export type StrapiOrbitDiagramSection = {
  __component: "industries-construction.orbit-diagram";
  title: string;
  badgeLabel: string;
  centerNode: {
    title: string;
    subtitle: string;
    steps: StrapiLifecycleStep[];
  };
};

export type StrapiCaseStudyCard = {
  name: string;
  caseLabel: string;
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaLink: string;
};

export type StrapiProvenImpactSection = {
  __component: "industries-construction.proven-impact";
  title: string;
  badgeLabel: string;
  caseStudyCards: StrapiCaseStudyCard[];
};

export type StrapiApproachStep = {
  title: string;
  subtitle: string | null;
  icon: StrapiMedia | null;
};

// This same shape is reused for Challenges/Solutions/Advantage, disambiguated by the
// `variant` field (added to the CMS schema — see the Desktop request doc). NOTE: the CMS
// currently sends "challanges" (misspelled) for the Challenges variant — matched as-is in
// cms/api/construction.ts since that's the real value; flag to the CMS team if they ever
// correct the spelling, since the frontend match must be updated to match.
export type StrapiServiceDetailSection = {
  __component: "page-reusable-sections.service-detail";
  title: string;
  subtitle: string | null;
  serviceLabel: string;
  variant: string;
  approachSteps: StrapiApproachStep[];
};

// Any other, truly unmapped component comes back with this shape and is ignored.
export type StrapiUnmappedSection = { __component: string };

export type StrapiConstructionSection =
  | StrapiHeroSection
  | StrapiStatisticsSection
  | StrapiIntegrationsBannerSection
  | StrapiServiceDetailSection
  | StrapiOrbitDiagramSection
  | StrapiProvenImpactSection
  | StrapiHealthCareSystemSection
  | StrapiCtaBannerSection
  | StrapiUnmappedSection;

export type StrapiConstructionPage = {
  seo: {
    metaTitle: string | null;
    metaDescription: string | null;
  } | null;
  sections: StrapiConstructionSection[];
};

// ---------------------------------------------------------------------------
// Presentational shapes — what the page's components actually render. Produced by mapping
// the Strapi shapes above; never sourced from static content (there is none anymore).
// ---------------------------------------------------------------------------

export interface PageSeo {
  metaTitle: string;
  metaDescription: string;
}

export interface SectionImage {
  url: string;
  alternativeText: string;
  width: number;
  height: number;
}

export interface HeroStat {
  order: number;
  value: string;
  label: string;
}

export interface HeroSection {
  type: "hero";
  order: number;
  eyebrow: string;
  title: string;
  titleHighlight: string | null; // exact substring of `title` to render in the gradient accent; null = no highlight
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
  image: SectionImage | null;
  stats: HeroStat[]; // exactly 3, each with a stable `order` for keying (Constitution Principle III)
}

export interface IntegrationPartner {
  order: number;
  name: string;
}

export interface IntegrationsStripSection {
  type: "integrationsStrip";
  order: number;
  label: string;
  partners: IntegrationPartner[];
}

export interface IndustryChallenge {
  order: number;
  label: string;
  icon: SectionIcon | null;
}

export interface ChallengesSection {
  type: "challenges";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  challenges: IndustryChallenge[];
}

export interface SolutionOffering {
  order: number;
  title: string;
  description: string;
  icon: SectionIcon | null;
}

export interface SolutionsSection {
  type: "solutions";
  order: number;
  eyebrow: string;
  title: string;
  solutions: SolutionOffering[];
}

export interface LifecycleNode {
  order: number;
  name: string;
}

export interface LifecycleDiagramSection {
  type: "lifecycleDiagram";
  order: number;
  eyebrow: string;
  title: string;
  engineLabel: string;
  engineSubLabel: string;
  nodes: LifecycleNode[];
}

export interface AdvantagePoint {
  order: number;
  title: string;
  description: string;
}

export interface AdvantageSection {
  type: "advantage";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  points: AdvantagePoint[];
}

export interface CaseStudySummary {
  order: number;
  metric: string;
  label: string;
  title: string;
  description: string;
  linkLabel: string;
  link: string;
}

export interface ImpactSection {
  type: "impact";
  order: number;
  eyebrow: string;
  title: string;
  caseStudies: CaseStudySummary[];
}

export interface FinalCtaSection {
  type: "finalCta";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
}

// `| undefined` is explicit and load-bearing: with no static fallback, any section the CMS
// doesn't return (or that fails to map) is genuinely absent, not defaulted. The assembly
// function in cms/api/construction.ts produces `undefined` for those and filters them out
// before this array reaches the page, so page.tsx never actually sees an undefined entry.
export type PageSectionEntry =
  | HeroSection
  | IntegrationsStripSection
  | ChallengesSection
  | SolutionsSection
  | LifecycleDiagramSection
  | AdvantageSection
  | ImpactSection
  | ConnectedSystemsSection
  | FinalCtaSection
  | undefined;

export interface ConstructionPageContent {
  seo: PageSeo;
  sections: PageSectionEntry[];
}

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
  value: string;
  label: string;
}

export interface HeroSection {
  type: "hero";
  order: number;
  eyebrow: string;
  title: string;
  titleHighlight: string; // exact substring of `title` to render in the orange/amber gradient
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
  image: SectionImage | null;
  stats: HeroStat[]; // exactly 3
}

export interface IntegrationPartner {
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
}

export interface ChallengesSection {
  type: "challenges";
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  challenges: IndustryChallenge[]; // exactly 5
}

export interface SolutionOffering {
  order: number;
  title: string;
  description: string;
}

export interface SolutionsSection {
  type: "solutions";
  order: number;
  eyebrow: string;
  title: string;
  solutions: SolutionOffering[]; // exactly 6
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
  nodes: LifecycleNode[]; // exactly 8
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
  points: AdvantagePoint[]; // exactly 4
}

export interface CaseStudySummary {
  order: number;
  metric: string;
  label: string;
  title: string;
  description: string;
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

export type PageSectionEntry =
  | HeroSection
  | IntegrationsStripSection
  | ChallengesSection
  | SolutionsSection
  | LifecycleDiagramSection
  | AdvantageSection
  | ImpactSection
  | FinalCtaSection;

export interface ConstructionPageContent {
  seo: PageSeo;
  sections: PageSectionEntry[];
}

export type CaseStudyAccent =
  | "blue-light" // #38bdf8 -> var(--color-blue-light)
  | "blue" // #0284C7 -> var(--color-blue)
  | "orange" // #E87722 -> var(--color-orange)
  | "amber" // #F59E0B -> var(--color-amber)
  | "teal-light" // #2dd4bf -> var(--color-teal-light)
  | "yellow"; // #fbbf24 -> var(--color-yellow)

export type Metric = {
  label: string;
  value: string;
};

export type TeamRole = {
  role: string;
  count: number;
};

// Generic, freely-composable narrative content block — every field optional,
// blocks are rendered in array order with a fixed internal field order
// (heading -> descriptions -> subheading -> paragraphs -> bullets -> pictures).
export type NarrativeBlock = {
  id: string;
  heading?: string;
  descriptions?: string[];
  subheading?: string;
  paragraphs?: string[];
  bullets?: string[];
  pictures?: string[];
};

export type CaseStudyNarrative = {
  metrics?: Metric[];
  blocks?: NarrativeBlock[];
  team?: TeamRole[];
  teamSize: number;
};

export type CaseStudy = {
  slug: string;
  title: string;
  cardTitle: string;
  summary: string;
  description: string;
  industry: string;
  category: string;
  accent: CaseStudyAccent;
  featured: boolean;
  publishedDate: string;
  headlineMetric: Metric;
  narrative?: CaseStudyNarrative;
};

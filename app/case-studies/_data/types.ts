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

export type IntegrationChip = {
  label: string;
};

export type ArchitectureFlow = {
  nodes: [string, string, string];
  integrations: IntegrationChip[];
};

export type NarrativeSection =
  | { id: "background"; heading: string; paragraphs: string[] }
  | {
      id: "challenge";
      heading: string;
      intro: string;
      painPoints: string[];
    }
  | { id: "architecture"; heading: string; intro: string; flow: ArchitectureFlow }
  | { id: "solutions"; heading: string; paragraphs: string[] };

export type CaseStudyNarrative = {
  metrics: Metric[];
  sections: NarrativeSection[];
  team: TeamRole[];
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
  narrative: CaseStudyNarrative;
};

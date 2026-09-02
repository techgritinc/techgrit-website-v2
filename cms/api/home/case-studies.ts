import type { AnySection } from "./shared";

export type StrapiCaseStudyCategory = { id: number; name: string };

export type StrapiCaseStudy = {
  id: number;
  title: string;
  subtitle: string | null;
  featuredValue: string;
  featuredLabel: string;
  ctaLink: string;
  isFeatured: boolean;
  case_study_category: StrapiCaseStudyCategory | null;
};

export type StrapiCaseStudiesSection = {
  id: number;
  title: string;
  badgeLabel: string;
  viewAllCaseStudyLabel: string;
  viewAllCaseStudyLink: string;
  case_studies: StrapiCaseStudy[];
  __component: "home.case-studies-insights";
};

export type CaseStudy = {
  id: string;
  featured: boolean;
  industry: string;
  metric: string;
  metricLabel: string;
  title: string;
  description: string | null;
  accentColor: string;
  href: string;
};

export type CaseStudiesData = {
  badgeLabel: string;
  title: string;
  viewAllLabel: string;
  viewAllLink: string;
  caseStudies: CaseStudy[];
};

export function pickCaseStudiesSection(sections: AnySection[]): StrapiCaseStudiesSection | undefined {
  return sections.find((s): s is StrapiCaseStudiesSection => s.__component === "home.case-studies-insights");
}

const CASE_STUDY_ACCENTS = ["var(--color-blue)", "var(--color-orange)", "var(--color-teal)", "var(--color-amber)"];

export function toCaseStudies(section: StrapiCaseStudiesSection): CaseStudiesData {
  const caseStudies: CaseStudy[] = section.case_studies.map((study, index) => ({
    id: String(study.id),
    featured: study.isFeatured,
    industry: study.case_study_category?.name ?? "",
    metric: study.featuredValue,
    metricLabel: study.featuredLabel,
    title: study.title,
    description: study.subtitle,
    accentColor: CASE_STUDY_ACCENTS[index % CASE_STUDY_ACCENTS.length],
    href: study.ctaLink,
  }));

  return {
    badgeLabel: section.badgeLabel,
    title: section.title,
    viewAllLabel: section.viewAllCaseStudyLabel,
    viewAllLink: section.viewAllCaseStudyLink,
    caseStudies,
  };
}

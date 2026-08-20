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

export const DEFAULT_CASE_STUDIES_DATA: CaseStudiesData = {
  badgeLabel: "See how we help teams win",
  title: "Case Studies & Insights.",
  viewAllLabel: "View all case studies",
  viewAllLink: "/case-studies",
  caseStudies: [
    {
      id: "dotnet-migration",
      featured: true,
      industry: "FinTech",
      metric: "2.5M",
      metricLabel: "lines migrated to .NET 10",
      title: "Migrating 2.5M lines to .NET 10 — without taking the product down",
      description:
        "An AI-assisted, human-governed delivery model shipped every ticket on a legacy .NET project on time, under constraints, and with full audit trails.",
      accentColor: "var(--color-blue)",
      href: "/case-studies",
    },
    {
      id: "b2b-marketplace",
      featured: false,
      industry: "Marketplace",
      metric: "100%",
      metricLabel: "auditable trades",
      title: "A B2B marketplace that encodes trust into every trade",
      description: null,
      accentColor: "var(--color-orange)",
      href: "/case-studies",
    },
    {
      id: "crypto-data-api",
      featured: false,
      industry: "FinTech",
      metric: "Live",
      metricLabel: "compliant insights",
      title: "Secure crypto data API platform for financial advisors",
      description: null,
      accentColor: "var(--color-teal)",
      href: "/case-studies",
    },
    {
      id: "claude-enablement",
      featured: false,
      industry: "AI Enablement",
      metric: "10x",
      metricLabel: "faster onboarding",
      title: "From overloaded to on-fire: Claude-powered enablement",
      description: null,
      accentColor: "var(--color-amber)",
      href: "/case-studies",
    },
  ],
};

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
    caseStudies: caseStudies.length > 0 ? caseStudies : DEFAULT_CASE_STUDIES_DATA.caseStudies,
  };
}

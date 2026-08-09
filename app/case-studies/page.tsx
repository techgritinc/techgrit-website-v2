import type { Metadata } from "next";
import { CASE_STUDIES, CASE_STUDY_CATEGORIES } from "./_data/case-studies-content";
import { CaseStudiesHero } from "./_components/case-studies-hero";
import { FeaturedCaseStudy } from "./_components/featured-case-study";
import { CaseStudiesFilterSection } from "./_components/case-studies-filter-section";
import { CaseStudiesFinalCta } from "./_components/case-studies-final-cta";

export const metadata: Metadata = {
  title: "Case Studies | TechGrit",
  description:
    "Explore how TechGrit has tackled complex challenges and delivered measurable results across FinTech, marketplaces, AI enablement, and more.",
};

export default function CaseStudiesPage() {
  const featured = CASE_STUDIES.find((caseStudy) => caseStudy.featured);
  const grid = CASE_STUDIES.filter((caseStudy) => !caseStudy.featured);

  return (
    <main>
      <div aria-hidden="true" className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute top-[-160px] right-[-120px] w-[560px] h-[560px] rounded-full blur-[120px] animate-[tgorb_16s_ease-in-out_infinite]"
          style={{ background: "color-mix(in srgb, var(--color-orange) 16%, transparent)" }}
        />
        <div
          className="absolute top-[1100px] left-[-180px] w-[520px] h-[520px] rounded-full blur-[130px] animate-[tgorb_20s_ease-in-out_infinite_reverse]"
          style={{ background: "color-mix(in srgb, var(--color-orange) 10%, transparent)" }}
        />
        <div
          className="absolute bottom-[-160px] left-[40%] w-[600px] h-[600px] rounded-full blur-[140px] animate-[tgorb_22s_ease-in-out_infinite]"
          style={{ background: "color-mix(in srgb, var(--color-teal) 8%, transparent)" }}
        />
      </div>
      <CaseStudiesHero />
      {featured ? <FeaturedCaseStudy caseStudy={featured} /> : null}
      <CaseStudiesFilterSection caseStudies={grid} categories={CASE_STUDY_CATEGORIES} />
      <CaseStudiesFinalCta />
    </main>
  );
}

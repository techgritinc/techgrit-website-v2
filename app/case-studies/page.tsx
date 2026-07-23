import type { Metadata } from "next";
import { CASE_STUDIES } from "./_data/case-studies-content";
import { CaseStudiesHero } from "./_components/case-studies-hero";
import { FeaturedCaseStudy } from "./_components/featured-case-study";
import { CaseStudiesGrid } from "./_components/case-studies-grid";
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
      <div
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
      >
        <div style={{ position: "absolute", top: -160, right: -120, width: 560, height: 560, borderRadius: "50%", background: "color-mix(in srgb, var(--color-blue) 13%, transparent)", filter: "blur(120px)", animation: "tgorb 16s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: 1100, left: -180, width: 520, height: 520, borderRadius: "50%", background: "color-mix(in srgb, var(--color-orange) 10%, transparent)", filter: "blur(130px)", animation: "tgorb 20s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", bottom: -160, left: "40%", width: 600, height: 600, borderRadius: "50%", background: "color-mix(in srgb, var(--color-teal) 8%, transparent)", filter: "blur(140px)", animation: "tgorb 22s ease-in-out infinite" }} />
      </div>
      <CaseStudiesHero />
      {featured ? <FeaturedCaseStudy caseStudy={featured} /> : null}
      <CaseStudiesGrid caseStudies={grid} />
      <CaseStudiesFinalCta />
    </main>
  );
}

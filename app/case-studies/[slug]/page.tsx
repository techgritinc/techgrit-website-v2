import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CASE_STUDIES } from "../_data/case-studies-content";
import { CaseStudyDetailHero } from "../_components/case-study-detail-hero";
import { MetricsStrip } from "../_components/metrics-strip";
import { CaseStudyNarrative } from "../_components/case-study-narrative";
import { TeamPanel } from "../_components/team-panel";
import { RelatedCaseStudies } from "../_components/related-case-studies";
import { CaseStudiesFinalCta } from "../_components/case-studies-final-cta";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDIES.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES.find((entry) => entry.slug === slug);
  if (!caseStudy) return {};

  return {
    title: `${caseStudy.cardTitle} | TechGrit Case Studies`,
    description: caseStudy.description,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const caseStudy = CASE_STUDIES.find((entry) => entry.slug === slug);

  if (!caseStudy) notFound();

  return (
    <main>
      {/* Ambient background orbs — matches reference Case Study detail page */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0"
      >
        <div
          className="absolute top-[-160px] right-[-120px] w-[560px] h-[560px] rounded-full bg-overlay-orange blur-[120px] animate-[tgorb_16s_ease-in-out_infinite]"
        />
        <div
          className="absolute top-[35%] left-[-220px] w-[560px] h-[560px] rounded-full bg-[var(--color-overlay-amber-light-10)] blur-[140px] animate-[tgorb_20s_ease-in-out_infinite_reverse]"
        />
      </div>
      <CaseStudyDetailHero caseStudy={caseStudy} />
      {caseStudy.narrative?.metrics?.length ? (
        <MetricsStrip metrics={caseStudy.narrative.metrics} />
      ) : (
        <div className="tg-container px-[var(--space-15)]">
          <div className="border-b border-border-faint" />
        </div>
      )}
      <section>
        <div className="tg-container pt-[40px] pb-[30px] px-[var(--space-15)]">
          <div
            className={
              caseStudy.narrative?.team?.length
                ? "grid grid-cols-1 tg-md:grid-cols-[1fr_280px] gap-[64px] items-start"
                : "grid grid-cols-1"
            }
          >
            <CaseStudyNarrative blocks={caseStudy.narrative?.blocks} />
            {caseStudy.narrative?.team?.length ? <TeamPanel team={caseStudy.narrative.team} /> : null}
          </div>
        </div>
      </section>
      <RelatedCaseStudies currentSlug={caseStudy.slug} />
      <CaseStudiesFinalCta variant="detail" />
    </main>
  );
}

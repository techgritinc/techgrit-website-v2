import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyDetailPageContent } from "@/cms/api/case-study-detail";
import { CaseStudyDetailHero } from "../_components/case-study-detail-hero";
import { MetricsStrip } from "../_components/metrics-strip";
import { CaseStudyNarrative } from "../_components/case-study-narrative";
import { TeamPanel } from "../_components/team-panel";
import { RelatedCaseStudies } from "../_components/related-case-studies";
import { CaseStudiesFinalCta } from "../_components/case-studies-final-cta";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const content = await getCaseStudyDetailPageContent(slug);
  if (!content) return {};

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const content = await getCaseStudyDetailPageContent(slug);

  if (!content) notFound();

  const hero = content.sections.find((section) => section?.type === "hero");
  const statistics = content.sections.find((section) => section?.type === "statistics");
  const narrativeEntries = content.sections.filter((section) => section?.type === "narrativeBlock");
  const moreCaseStudies = content.sections.find((section) => section?.type === "moreCaseStudies");
  const finalCta = content.sections.find((section) => section?.type === "finalCta");

  return (
    <main>
      {hero ? <CaseStudyDetailHero section={hero} /> : null}
      {statistics && statistics.stats.length ? (
        <MetricsStrip metrics={statistics.stats} />
      ) : (
        <div className="tg-container px-[var(--space-15)]">
          <div className="border-b border-border-faint" />
        </div>
      )}
      <section>
        <div className="tg-container pt-[40px] pb-[30px] px-[var(--space-15)]">
          <div
            className={
              content.team?.members.length
                ? "grid grid-cols-1 tg-md:grid-cols-[1fr_280px] gap-[64px] items-start"
                : "grid grid-cols-1"
            }
          >
            <CaseStudyNarrative entries={narrativeEntries} />
            {content.team?.members.length ? <TeamPanel section={content.team} /> : null}
          </div>
        </div>
      </section>
      {moreCaseStudies ? <RelatedCaseStudies section={moreCaseStudies} /> : null}
      {finalCta ? (
        <CaseStudiesFinalCta
          title={finalCta.title}
          titleHighlight={finalCta.titleHighlight}
          description={finalCta.description}
          ctaLabel={finalCta.primaryCtaLabel}
          ctaLink={finalCta.primaryCtaLink}
        />
      ) : null}
    </main>
  );
}

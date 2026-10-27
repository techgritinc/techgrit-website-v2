import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudyDetailPageContent } from "@/cms/api/case-study-detail";
import { CaseStudyDetailHero } from "../_components/case-study-detail-hero";
import { MetricsStrip } from "@/components/ui/MetricsStrip";
import { ArticleCapabilityGrid } from "@/components/ui/ArticleCapabilityGrid";
import { ArticleNarrativeBlock } from "@/components/ui/ArticleNarrative";
import { ArticleResponsibilitySection } from "@/components/ui/ArticleResponsibilitySection";
import { ArticleTechStack } from "@/components/ui/ArticleTechStack";
import { TeamPanel } from "../_components/team-panel";
import { FinalCtaBanner } from "@/components/ui/FinalCtaBanner";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

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

  const statistics = content.sections.find((section) => section?.type === "statistics");
  const finalCta = content.sections.find((section) => section?.type === "finalCta");
  const bodySections = content.sections.filter(
    (section) =>
      section?.type === "narrativeBlock" ||
      section?.type === "responsibilityList" ||
      section?.type === "techStack" ||
      section?.type === "capabilityGrid"
  );
  const hasTeam = Boolean(content.team?.members.length);

  return (
    <main>
      <CaseStudyDetailHero section={content.hero} />
      {statistics && statistics.stats.length ? (
        <MetricsStrip metrics={statistics.stats} align="center" />
      ) : (
        <div className="tg-container px-[var(--space-15)]">
          <div className="border-b border-border-faint" />
        </div>
      )}
      <section>
        <div className="tg-container pt-[40px] pb-[30px] px-[var(--space-15)]">
          <div
            className={
              hasTeam
                ? "grid grid-cols-1 tg-md:grid-cols-[1fr_280px] gap-[64px] items-start"
                : "grid grid-cols-1"
            }
          >
            <div className="flex flex-col gap-[var(--space-19)]">
              {bodySections.map((section, index) => (
                <RevealOnScroll key={`${section?.type}-${index}`}>
                  {section?.type === "responsibilityList" ? (
                    <ArticleResponsibilitySection section={section} />
                  ) : section?.type === "techStack" ? (
                    <ArticleTechStack section={section} />
                  ) : section?.type === "capabilityGrid" ? (
                    <ArticleCapabilityGrid section={section} />
                  ) : section?.type === "narrativeBlock" ? (
                    <ArticleNarrativeBlock entry={section} />
                  ) : null}
                </RevealOnScroll>
              ))}
            </div>
            {hasTeam && content.team ? <TeamPanel section={content.team} /> : null}
          </div>
        </div>
      </section>
      {finalCta ? (
        <FinalCtaBanner
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

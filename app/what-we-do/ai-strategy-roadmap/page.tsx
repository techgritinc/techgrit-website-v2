import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAiStrategyRoadmapData } from "@/cms/api/what-we-do/ai-strategy-roadmap";
import { Hero } from "@/components/ui/Hero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { Outcome } from "@/components/ui/Outcome";
import { FinalCta } from "@/components/ui/final-cta";
import MediaSlot from "@/components/ui/MediaSlot";
import { AiStrategyRoadmapCapabilities } from "./_components/ai-strategy-roadmap-capabilities";
import { AiStrategyRoadmapLifecycle } from "./_components/ai-strategy-roadmap-lifecycle";
import { AiStrategyRoadmapWhy } from "./_components/ai-strategy-roadmap-why";
import { AiStrategyRoadmapAdvisorySegments } from "./_components/ai-strategy-roadmap-advisory-segments";
import { AiStrategyRoadmapFaq } from "./_components/ai-strategy-roadmap-faq";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAiStrategyRoadmapData();
  if (!content || !content.seo) return {};

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function AiStrategyRoadmapPage() {
  const content = await getAiStrategyRoadmapData();
  if (!content) notFound();

  const ctaSection = content.sections.find((section) => section.type === "finalCta");
  const otherSections = content.sections.filter((section) => section.type !== "finalCta");

  return (
    <main className="overflow-x-clip">
      {otherSections.map((section) => {
        switch (section.type) {
          case "hero":
            return (
              <Hero
                key={section.order}
                eyebrow={section.eyebrow}
                title={section.title}
                titleHighlight={section.titleHighlight}
                subtitle={section.subtitle}
                primaryCta={{ label: section.primaryCtaLabel, href: section.primaryCtaLink }}
                secondaryCta={
                  section.secondaryCtaLabel && section.secondaryCtaLink
                    ? { label: section.secondaryCtaLabel, href: section.secondaryCtaLink }
                    : undefined
                }
                mediaFill
                media={
                  <div className="relative aspect-[4/3] w-full">
                    <MediaSlot
                      src={section.image?.url}
                      alt={section.image?.alternativeText ?? ""}
                      priority
                      fill
                      sizes="(max-width: 960px) 100vw, 40vw"
                    />
                  </div>
                }
              />
            );
          case "intro":
            return (
              <ContentBlock
                key={section.order}
                eyebrow={section.eyebrow}
                title={section.title}
                description={section.description}
                chipsLabel={section.chipsLabel}
                chips={section.chips}
              />
            );
          case "capabilities":
            return <AiStrategyRoadmapCapabilities key={section.order} section={section} />;
          case "lifecycle":
            return <AiStrategyRoadmapLifecycle key={section.order} section={section} />;
          case "why":
            return <AiStrategyRoadmapWhy key={section.order} section={section} />;
          case "advisorySegments":
            return <AiStrategyRoadmapAdvisorySegments key={section.order} section={section} />;
          case "outcome":
            return (
              <section key={section.order} className="relative">
                <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
                  {section.eyebrow && (
                    <div className="mb-3 text-[12.5px] leading-[normal] font-extrabold uppercase tracking-[0.16em] text-orange">
                      {section.eyebrow}
                    </div>
                  )}
                  <Outcome heading={section.heading} description={section.description} className="whitespace-pre-line" />
                </div>
              </section>
            );
          case "faq":
            return <AiStrategyRoadmapFaq key={section.order} section={section} />;
          default:
            return null;
        }
      })}
      {ctaSection && ctaSection.type === "finalCta" && (
        <FinalCta
          tone="orange"
          paddingTop={20}
          paddingBottom={100}
          titleLineHeight={1.06}
          titleFontSize="clamp(32px, 4vw, 46px)"
          eyebrowWeight="var(--fw-extrabold)"
          descriptionFontSize="17.5px"
          descriptionLineHeight={1.6}
          descriptionMaxWidth={640}
          maxWidth={1280}
          buttonRowGap={14}
          primaryBtnClassName="!py-[15px] !px-[32px] !min-h-[52px] !rounded-[13px] !whitespace-normal !h-auto !shrink"
          secondaryBtnClassName="!py-[15px] !px-[26px] !rounded-[13px]"
          cardClassName="!p-[80px_40px]"
          section={{
            eyebrow: ctaSection.eyebrow,
            title: ctaSection.title,
            description: ctaSection.description,
            ctaLabel: ctaSection.primaryCtaLabel,
            ctaLink: ctaSection.primaryCtaLink,
            secondaryCta:
              ctaSection.secondaryCtaLabel && ctaSection.secondaryCtaLink
                ? { label: ctaSection.secondaryCtaLabel, link: ctaSection.secondaryCtaLink }
                : undefined,
          }}
        />
      )}
    </main>
  );
}

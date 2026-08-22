import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAiModernizationData } from "@/cms/api/what-we-do/ai-modernization";
import { Hero } from "@/components/ui/Hero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { Outcome } from "@/components/ui/Outcome";
import { AiModernizationCapabilities } from "./_components/ai-modernization-capabilities";
import { AiModernizationLifecycle } from "./_components/ai-modernization-lifecycle";
import { AiModernizationStrategies } from "./_components/ai-modernization-strategies";
import { AiModernizationWhy } from "./_components/ai-modernization-why";
import { AiModernizationIndustries } from "./_components/ai-modernization-industries";
import { AiModernizationFaq } from "./_components/ai-modernization-faq";
import { AiModernizationRelated } from "./_components/ai-modernization-related";
import { FinalCta } from "@/components/ui/final-cta";
import MediaSlot from "@/components/ui/MediaSlot";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getAiModernizationData();
  if (!content) return {};

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function AiModernizationPage() {
  const content = await getAiModernizationData();
  if (!content) notFound();

  return (
    <main className="overflow-x-clip">
      {content.sections.map((section) => {
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
                chipsLabel={section.blockersLabel}
                chips={section.blockers}
              />
            );
          case "capabilities":
            return <AiModernizationCapabilities key={section.order} section={section} />;
          case "lifecycle":
            return <AiModernizationLifecycle key={section.order} section={section} />;
          case "strategies":
            return <AiModernizationStrategies key={section.order} section={section} />;
          case "why":
            return <AiModernizationWhy key={section.order} section={section} />;
          case "industries":
            return <AiModernizationIndustries key={section.order} section={section} />;
          case "outcome":
            return (
              <section key={section.order} className="relative">
                <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
                  {section.eyebrow && (
                    <div className="mb-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-orange">
                      {section.eyebrow}
                    </div>
                  )}
                  <Outcome heading={section.heading} description={section.description} className="whitespace-pre-line" />
                </div>
              </section>
            );
          case "faq":
            return <AiModernizationFaq key={section.order} section={section} />;
          case "related":
            return <AiModernizationRelated key={section.order} section={section} />;
          case "finalCta":
            return (
              <FinalCta
                key={section.order}
                tone="orange"
                paddingTop={20}
                paddingBottom={100}
                titleLineHeight={1.06}
                titleFontSize="clamp(32px, 4vw, 46px)"
                eyebrowWeight="var(--fw-extrabold)"
                descriptionLineHeight={1.6}
                maxWidth={1280}
                primaryBtnClassName="!py-[15px] !px-[32px] !min-h-[52px] !rounded-[13px] !whitespace-normal !h-auto !shrink"
                secondaryBtnClassName="!py-[15px] !px-[26px] !rounded-[13px]"
                cardClassName="!p-[80px_40px]"
                section={{
                  eyebrow: section.eyebrow,
                  title: section.title,
                  description: section.description,
                  ctaLabel: section.primaryCtaLabel,
                  ctaLink: section.primaryCtaLink,
                  secondaryCta:
                    section.secondaryCtaLabel && section.secondaryCtaLink
                      ? { label: section.secondaryCtaLabel, link: section.secondaryCtaLink }
                      : undefined,
                }}
              />
            );
          default:
            return null;
        }
      })}
    </main>
  );
}

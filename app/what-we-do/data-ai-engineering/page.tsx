import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDataAiEngineeringData } from "@/cms/api/what-we-do/data-ai-engineering";
import { Hero } from "@/components/ui/Hero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { FinalCta } from "@/components/ui/final-cta";
import MediaSlot from "@/components/ui/MediaSlot";
import { DataAiEngineeringCapabilities } from "./_components/data-ai-engineering-capabilities";
import { DataAiEngineeringLifecycle } from "./_components/data-ai-engineering-lifecycle";
import { DataAiEngineeringStrategies } from "./_components/data-ai-engineering-strategies";
import { DataAiEngineeringWhy } from "./_components/data-ai-engineering-why";
import { DataAiEngineeringIndustries } from "./_components/data-ai-engineering-industries";
import { DataAiEngineeringFaq } from "./_components/data-ai-engineering-faq";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getDataAiEngineeringData();
  if (!content || !content.seo) return {};

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function DataAiEngineeringPage() {
  const content = await getDataAiEngineeringData();
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
            return <DataAiEngineeringCapabilities key={section.order} section={section} />;
          case "lifecycle":
            return <DataAiEngineeringLifecycle key={section.order} section={section} />;
          case "strategies":
            return <DataAiEngineeringStrategies key={section.order} section={section} />;
          case "why":
            return <DataAiEngineeringWhy key={section.order} section={section} />;
          case "industries":
            return <DataAiEngineeringIndustries key={section.order} section={section} />;
          case "outcome":
            return (
              <section key={section.order} className="relative">
                <div className="mx-auto max-w-[1280px] px-9 py-[60px] text-center">
                  {section.eyebrow && (
                    <div className="mb-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-orange">
                      {section.eyebrow}
                    </div>
                  )}
                  <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
                    {section.heading}
                  </h2>
                  <p className="mx-auto mt-3.5 max-w-[640px] whitespace-pre-line text-[16.5px] leading-[1.6] text-text-66">
                    {section.description}
                  </p>
                </div>
              </section>
            );
          case "faq":
            return <DataAiEngineeringFaq key={section.order} section={section} />;
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
          eyebrowColor="var(--color-amber-badge)"
          descriptionLineHeight={1.6}
          descriptionFontSize="17.5px"
          descriptionMaxWidth={640}
          maxWidth={1280}
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

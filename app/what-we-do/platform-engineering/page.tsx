import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPlatformEngineeringData } from "@/cms/api/what-we-do/platform-engineering";
import { Hero } from "@/components/ui/Hero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { Outcome } from "@/components/ui/Outcome";
import { FinalCta } from "@/components/ui/final-cta";
import MediaSlot from "@/components/ui/MediaSlot";
import { PlatformEngineeringCapabilities } from "./_components/platform-engineering-capabilities";
import { PlatformEngineeringLifecycle } from "./_components/platform-engineering-lifecycle";
import { PlatformEngineeringStrategies } from "./_components/platform-engineering-strategies";
import { PlatformEngineeringWhy } from "./_components/platform-engineering-why";
import { PlatformEngineeringIndustries } from "./_components/platform-engineering-industries";
import { PlatformEngineeringFaq } from "./_components/platform-engineering-faq";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getPlatformEngineeringData();
  if (!content || !content.seo) return {};

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function PlatformEngineeringPage() {
  const content = await getPlatformEngineeringData();
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
            return <PlatformEngineeringCapabilities key={section.order} section={section} />;
          case "lifecycle":
            return <PlatformEngineeringLifecycle key={section.order} section={section} />;
          case "strategies":
            return <PlatformEngineeringStrategies key={section.order} section={section} />;
          case "why":
            return <PlatformEngineeringWhy key={section.order} section={section} />;
          case "industries":
            return <PlatformEngineeringIndustries key={section.order} section={section} />;
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
            return <PlatformEngineeringFaq key={section.order} section={section} />;
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
          descriptionLineHeight={1.6}
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

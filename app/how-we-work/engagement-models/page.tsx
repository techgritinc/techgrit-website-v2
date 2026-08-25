import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getEngagementModelsData } from "@/cms/api/how-we-work/engagement-models";
import { Hero } from "@/components/ui/Hero";
import { FinalCta } from "@/components/ui/final-cta";
import MediaSlot from "@/components/ui/MediaSlot";
import { EngagementModelsCapabilities } from "./_components/engagement-models-capabilities";
import { EngagementModelsWhy } from "./_components/engagement-models-why";
import { EngagementModelsFindFit } from "./_components/engagement-models-find-fit";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getEngagementModelsData();
  if (!content) return {};

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function EngagementModelsPage() {
  const content = await getEngagementModelsData();
  if (!content) notFound();

  return (
    <main className="overflow-x-clip">
      {content.sections.map((section) => {
        switch (section.type) {
          case "hero":
            return (
              <Hero
                key={section.order}
                eyebrow={section.badgeLabel ?? ""}
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
          case "capabilities":
            return <EngagementModelsCapabilities key={section.order} section={section} />;
          case "why":
            return <EngagementModelsWhy key={section.order} section={section} />;
          case "findFit":
            return <EngagementModelsFindFit key={section.order} section={section} />;
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
                  eyebrow: section.badgeLabel ?? "",
                  title: section.title,
                  description: section.subtitle,
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

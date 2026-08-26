import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getStartupsData } from "@/cms/api/what-we-do/startups";
import { Hero } from "@/components/ui/Hero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { FinalCta } from "@/components/ui/final-cta";
import MediaSlot from "@/components/ui/MediaSlot";
import { StartupsGrowthJourney } from "./_components/startups-growth-journey";
import { StartupsCapabilities } from "./_components/startups-capabilities";
import { StartupsWhy } from "./_components/startups-why";
import { StartupsWhoWeHelp } from "./_components/startups-who-we-help";
import { StartupsFaq } from "./_components/startups-faq";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getStartupsData();
  if (!content || !content.seo) return {};

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function StartupsPage() {
  const content = await getStartupsData();
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
          case "growthJourney":
            return <StartupsGrowthJourney key={section.order} section={section} />;
          case "capabilities":
            return <StartupsCapabilities key={section.order} section={section} />;
          case "why":
            return <StartupsWhy key={section.order} section={section} />;
          case "whoWeHelp":
            return <StartupsWhoWeHelp key={section.order} section={section} />;
          case "faq":
            return <StartupsFaq key={section.order} section={section} />;
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

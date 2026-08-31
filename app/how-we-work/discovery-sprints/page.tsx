import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDiscoverySprintsData } from "@/cms/api/how-we-work/discovery-sprints";
import { Hero } from "@/components/ui/Hero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { Faq } from "@/components/ui/Faq";
import { FinalCta } from "@/components/ui/final-cta";
import MediaSlot from "@/components/ui/MediaSlot";
import { DiscoverySprintsPhaseZero } from "./_components/discovery-sprints-phase-zero";
import { DiscoverySprintsCapabilities } from "./_components/discovery-sprints-capabilities";
import { DiscoverySprintsDeliverables } from "./_components/discovery-sprints-deliverables";
import { DiscoverySprintsIdealFor } from "./_components/discovery-sprints-ideal-for";
import { DiscoverySprintsServiceDetail } from "./_components/discovery-sprints-service-detail";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getDiscoverySprintsData();
  if (!content) return {};

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function DiscoverySprintsPage() {
  const content = await getDiscoverySprintsData();
  if (!content) notFound();

  return (
    <main className="overflow-x-clip">
      {content.sections.map((section) => {
        switch (section.type) {
          case "hero":
            return (
              <Hero
                key={section.order}
                eyebrow={section.badgeLabel}
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
                description={section.subtitle}
                chipsLabel={section.chipsLabel}
                chips={section.chips.map((chip) => ({ id: chip.id, label: chip.label }))}
              />
            );
          case "phaseZero":
            return <DiscoverySprintsPhaseZero key={section.order} section={section} />;
          case "capabilities":
            return <DiscoverySprintsCapabilities key={section.order} section={section} />;
          case "deliverables":
            return <DiscoverySprintsDeliverables key={section.order} section={section} />;
          case "idealFor":
            return <DiscoverySprintsIdealFor key={section.order} section={section} />;
          case "serviceDetail":
            return <DiscoverySprintsServiceDetail key={section.order} section={section} />;
          case "faq":
            return (
              <section key={section.order} className="relative">
                <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
                  <div className="mb-8">
                    <div className="mb-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-orange">
                      {section.eyebrow}
                    </div>
                    <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
                      {section.title}
                    </h2>
                  </div>
                  <Faq items={section.items} />
                </div>
              </section>
            );
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
                  eyebrow: section.badgeLabel,
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

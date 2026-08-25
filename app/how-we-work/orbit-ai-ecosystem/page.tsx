import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrbitAiEcosystemData } from "@/cms/api/how-we-work/orbit-ai-ecosystem";
import { Hero } from "@/components/ui/Hero";
import { ContentBlock } from "@/components/ui/ContentBlock";
import { FinalCta } from "@/components/ui/final-cta";
import MediaSlot from "@/components/ui/MediaSlot";
import { OrbitAiChallenges } from "./_components/orbit-ai-challenges";
import { OrbitAiCapabilities } from "./_components/orbit-ai-capabilities";
import { OrbitAiIntegratedPath } from "./_components/orbit-ai-integrated-path";
import { OrbitAiAchieve } from "./_components/orbit-ai-achieve";
import { OrbitAiUnderstanding } from "./_components/orbit-ai-understanding";
import { OrbitAiWhy } from "./_components/orbit-ai-why";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getOrbitAiEcosystemData();
  if (!content) return {};

  return {
    title: content.seo.metaTitle,
    description: content.seo.metaDescription,
  };
}

export default async function OrbitAiPage() {
  const content = await getOrbitAiEcosystemData();
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
          case "challenges":
            if (section.chips.length === 0) {
              return (
                <ContentBlock
                  key={section.order}
                  eyebrow={section.eyebrow}
                  title={section.title}
                  description={section.subtitle}
                />
              );
            }
            return <OrbitAiChallenges key={section.order} section={section} />;
          case "capabilities":
            return <OrbitAiCapabilities key={section.order} section={section} />;
          case "integratedPath":
            return <OrbitAiIntegratedPath key={section.order} section={section} />;
          case "serviceDetail":
            if (section.variant === "achieve") return <OrbitAiAchieve key={section.order} section={section} />;
            if (section.variant === "understanding") return <OrbitAiUnderstanding key={section.order} section={section} />;
            return <OrbitAiWhy key={section.order} section={section} />;
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

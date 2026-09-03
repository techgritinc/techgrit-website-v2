import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getConstructionPageContent } from "@/cms/api/industries/construction";
import { ConstructionHero } from "./_components/construction-hero";
import { ConstructionIntegrationsStrip } from "./_components/construction-integrations-strip";
import { ConstructionChallenges } from "./_components/construction-challenges";
import { ConstructionSolutions } from "./_components/construction-solutions";
import { ConstructionLifecycleDiagram } from "./_components/construction-lifecycle-diagram";
import { ConstructionAdvantage } from "./_components/construction-advantage";
import { ConstructionImpact } from "./_components/construction-impact";
import { ConnectedSystems } from "@/components/ui/ConnectedSystems";
import { FinalCta } from "@/components/ui/final-cta";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getConstructionPageContent();
  if (!content) return {};
  return { title: content.seo.metaTitle, description: content.seo.metaDescription };
}

export default async function ConstructionPage() {
  const content = await getConstructionPageContent();
  if (!content) notFound();

  const sections = content.sections.filter((section) => section !== undefined);

  return (
    <main className="overflow-x-clip">
      {sections.map((section) => {
        switch (section.type) {
          case "hero":
            return <ConstructionHero key={section.order} section={section} />;
          case "integrationsStrip":
            return <ConstructionIntegrationsStrip key={section.order} section={section} />;
          case "challenges":
            return <ConstructionChallenges key={section.order} section={section} />;
          case "solutions":
            return <ConstructionSolutions key={section.order} section={section} />;
          case "lifecycleDiagram":
            return <ConstructionLifecycleDiagram key={section.order} section={section} />;
          case "advantage":
            return <ConstructionAdvantage key={section.order} section={section} />;
          case "impact":
            return <ConstructionImpact key={section.order} section={section} />;
          case "connectedSystems":
            return <ConnectedSystems key={section.order} section={section} />;
          case "finalCta":
            return (
              <FinalCta
                key={section.order}
                tone="amber"
                paddingTop={56}
                paddingBottom={100}
                titleLineHeight={1.06}
                maxWidth={1280}
                primaryBtnClassName="!py-[15px] !px-[34px] !min-h-[52px] !rounded-[13px] !whitespace-normal !h-auto !shrink"
                secondaryBtnClassName="!py-[16px] !px-[26px] !rounded-[12px]"
                cardClassName="!p-[80px_40px]"
                section={{
                  eyebrow: section.eyebrow,
                  title: section.title,
                  description: section.description,
                  ctaLabel: section.primaryCtaLabel,
                  ctaLink: section.primaryCtaLink,
                  secondaryCta: { label: section.secondaryCtaLabel, link: section.secondaryCtaLink },
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

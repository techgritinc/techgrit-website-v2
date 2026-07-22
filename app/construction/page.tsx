import type { Metadata } from "next";
import { constructionContent } from "./_data/construction-content";
import { ConstructionHero } from "./_components/construction-hero";
import { ConstructionIntegrationsStrip } from "./_components/construction-integrations-strip";
import { ConstructionChallenges } from "./_components/construction-challenges";
import { ConstructionSolutions } from "./_components/construction-solutions";
import { ConstructionLifecycleDiagram } from "./_components/construction-lifecycle-diagram";
import { ConstructionAdvantage } from "./_components/construction-advantage";
import { ConstructionImpact } from "./_components/construction-impact";
import { FinalCta } from "@/reusable-components/final-cta";

export const metadata: Metadata = {
  title: constructionContent.seo.metaTitle,
  description: constructionContent.seo.metaDescription,
};

export default function ConstructionPage() {
  return (
    <main className="overflow-x-clip">
      {constructionContent.sections.map((section) => {
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
          case "finalCta":
            return (
              <FinalCta
                key={section.order}
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

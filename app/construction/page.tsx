import type { Metadata } from "next";
import { constructionContent } from "./_data/construction-content";
import { ConstructionHero } from "./_components/construction-hero";
import { ConstructionIntegrationsStrip } from "./_components/construction-integrations-strip";
import { ConstructionChallenges } from "./_components/construction-challenges";
import { ConstructionSolutions } from "./_components/construction-solutions";
import { ConstructionLifecycleDiagram } from "./_components/construction-lifecycle-diagram";
import { ConstructionAdvantage } from "./_components/construction-advantage";
import { ConstructionImpact } from "./_components/construction-impact";
import { FinalCta } from "@/components/ui/final-cta";

export const metadata: Metadata = {
  title: constructionContent.seo.metaTitle,
  description: constructionContent.seo.metaDescription,
};

export default function ConstructionPage() {
  return (
    <main className="overflow-x-clip">
      {/* Page-local ambient orbs (reference-exact — the shared, globally-wired
          AmbientOrbs component excludes /construction so this page's amber
          second/third orbs render instead of its blue variant; see
          specs/TMS-67/research.md §13). */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
      >
        <div style={{ position: "absolute", top: -160, right: -120, width: 560, height: 560, borderRadius: "50%", background: "var(--color-overlay-orange)", filter: "blur(120px)", animation: "tgorb 16s ease-in-out infinite" }} />
        <div style={{ position: "absolute", top: 1100, left: -180, width: 520, height: 520, borderRadius: "50%", background: "var(--color-overlay-amber)", filter: "blur(130px)", animation: "tgorb 20s ease-in-out infinite reverse" }} />
        <div style={{ position: "absolute", bottom: -160, left: "40%", width: 600, height: 600, borderRadius: "50%", background: "var(--color-overlay-amber-soft)", filter: "blur(140px)", animation: "tgorb 22s ease-in-out infinite" }} />
      </div>
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
                tone="amber"
                paddingTop={20}
                titleLineHeight={1.06}
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

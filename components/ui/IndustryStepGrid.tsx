import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { GlassCard, GlassCardIcon, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import type { ProductLifecycleSection } from "@/cms/shared/industry-sections";

// Shared Industries-page numbered step card-grid ("AI Across the ... Product Lifecycle") —
// generalized verbatim from Healthcare's original component.
export function IndustryStepGrid({ section }: { section: ProductLifecycleSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-[50px] pb-[30px]" data-reveal>
        <div className="mb-[40px] max-w-[760px] mt-[-9px]">
          <SectionEyebrow tone="amber" className="leading-[normal]">{section.eyebrow}</SectionEyebrow>
          <h2 className="text-[clamp(30px,3.8vw,42px)] leading-[1.08] tracking-[-0.03em]">{section.title}</h2>
          <p className="mt-4 text-[16.5px] leading-[1.65] text-muted">
            {section.description}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[22px]">
          {section.cards.map((card) => (
            <GlassCard key={card.order} variant="constructionSolution" hoverBorderColor="">
              <GlassCardIcon
                variant="constructionSolution"
                wrapperClassName="bg-[image:var(--gradient-step-badge)] border border-border-step-badge text-[18px] font-bold text-amber-light"
              >
                {card.stepLabel}
              </GlassCardIcon>
              <GlassCardTitle className="leading-[normal] tracking-[normal]" variant="constructionSolution">{card.title}</GlassCardTitle>
              <GlassCardDescription variant="constructionSolution">{card.description}</GlassCardDescription>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import type { ImpactSection } from "../_data/types";

export function ConstructionImpact({ section }: { section: ImpactSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-[40px] pb-[60px]" data-reveal>
          <div className="mb-[38px] max-w-[760px]">
            <SectionEyebrow tone="amber" className="leading-[normal]">{section.eyebrow}</SectionEyebrow>
            <h2 className="leading-[45.36px] tracking-[-1.26px] text-[42px]">{section.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
            {section.caseStudies.map((caseStudy) => (
              <GlassCard
                key={caseStudy.order}
                variant="constructionImpact"
                hoverBorderColor=""
              >
                <div
                  className="leading-[normal]"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "40px",
                    fontWeight: "var(--fw-bold)",
                    color: "var(--color-amber-light)",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {caseStudy.metric}
                </div>
                <div
                  className="mt-[6px] leading-[normal] tracking-[1.5px]"
                  style={{
                    fontSize: "var(--text-2xs)",
                    fontWeight: "var(--fw-bold)",
                    textTransform: "uppercase",
                    color: "var(--color-text-45)",
                  }}
                >
                  {caseStudy.label}
                </div>
                <GlassCardTitle variant="constructionImpact" className="mt-[14px] tracking-[normal]">
                  {caseStudy.title}
                </GlassCardTitle>
                <GlassCardDescription variant="constructionImpact">{caseStudy.description}</GlassCardDescription>
                <span
                  className="mt-[18px] inline-flex items-center"
                  style={{ gap: 7, fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)", color: "var(--color-amber-light)" }}
                >
                  Read case study <span aria-hidden="true">&rarr;</span>
                </span>
              </GlassCard>
            ))}
          </div>
      </div>
    </section>
  );
}

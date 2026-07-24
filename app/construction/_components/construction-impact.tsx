import { SectionEyebrow } from "@/reusable-components/section-eyebrow";
import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import type { ImpactSection } from "../_data/types";

export function ConstructionImpact({ section }: { section: ImpactSection }) {
  return (
// In construction-impact.tsx
   <section className="section" style={{ paddingTop: 20 }}>
      <div className="tg-container">
          <div className="mb-[38px] max-w-[760px]">
            <SectionEyebrow tone="amber">{section.eyebrow}</SectionEyebrow>
            <h2 style={{ fontSize: "clamp(30px, 3.6vw, 42px)", lineHeight: 1.1 }}>{section.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
            {section.caseStudies.map((caseStudy) => (
              <a key={caseStudy.order} href={caseStudy.link} className="block">
                <GlassCard
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
              </a>
            ))}
          </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import type { ImpactSection } from "@/cms/types/construction";

export function ConstructionImpact({ section }: { section: ImpactSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-[40px] pb-[60px]" data-reveal>
          <div className="mb-[38px] max-w-[760px]">
            <SectionEyebrow tone="amber" className="leading-[normal]">{section.eyebrow}</SectionEyebrow>
            <h2 className="text-[clamp(30px,3.8vw,42px)] leading-[1.08] tracking-[-0.03em]">{section.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
            {section.caseStudies.map((caseStudy) => (
              <GlassCard
                key={caseStudy.order}
                variant="constructionImpact"
                hoverBorderColor=""
              >
                <div
                  className="leading-[normal] text-[36px] sm:text-[40px]"
                  style={{
                    fontFamily: "var(--font-display)",
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
                <GlassCardTitle variant="constructionImpact" className="mt-[14px] tracking-[normal] text-[16px] md:text-[18.5px]">
                  {caseStudy.title}
                </GlassCardTitle>
                <GlassCardDescription variant="constructionImpact">{caseStudy.description}</GlassCardDescription>
                <Link
                  href={caseStudy.link}
                  className="mt-[18px] inline-flex items-center"
                  style={{ gap: 7, fontSize: "var(--text-xs)", fontWeight: "var(--fw-bold)", color: "var(--color-amber-light)" }}
                >
                  {caseStudy.linkLabel} <span aria-hidden="true">&rarr;</span>
                </Link>
              </GlassCard>
            ))}
          </div>
      </div>
    </section>
  );
}

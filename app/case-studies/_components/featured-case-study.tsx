import Link from "next/link";
import type { CaseStudy } from "../_data/types";
import { ACCENT_VAR, accentFeaturedPanelGradient, accentMix } from "../_data/accent";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function FeaturedCaseStudy({ caseStudy }: { caseStudy: CaseStudy }) {
  const accentColor = ACCENT_VAR[caseStudy.accent];

  return (
    <section>
      <div className="tg-container pt-[30px] pb-[10px] px-[var(--space-15)]">
        <RevealOnScroll>
          <Link
            href={`/case-studies/${caseStudy.slug}`}
            className="relative overflow-hidden grid grid-cols-1 tg-md:grid-cols-[1.1fr_0.9fr] rounded-4xl border border-border bg-glass-faint backdrop-blur-md transition-transform duration-[250ms] ease-out hover:-translate-y-[5px] hover:border-[var(--hover-border)]"
            style={{ ["--hover-border" as string]: accentMix(caseStudy.accent, 50) }}
          >
            <div className="flex flex-col justify-center gap-4 px-[44px] py-[48px]">
              <span
                className="inline-flex items-center self-start gap-2 text-[12px] font-bold tracking-[0.1em] uppercase leading-none py-2 px-3 rounded-[30px]"
                style={{ background: accentMix(caseStudy.accent, 12), color: accentColor }}
              >
                Featured &middot; {caseStudy.industry}
              </span>
              <div className="flex flex-wrap items-end gap-3.5">
                <span
                  className="font-display text-[54px] font-bold leading-none tracking-[var(--ls-snug)]"
                  style={{ color: accentColor }}
                >
                  {caseStudy.headlineMetric.value}
                </span>
                <span className="pb-2 text-[15px] text-text-soft">
                  {caseStudy.headlineMetric.label}
                </span>
              </div>
              <h2 className="text-[clamp(26px,2.8vw,32px)] font-bold leading-[1.15] tracking-[-0.02em]">
                {caseStudy.title}
              </h2>
              <p className="max-w-[520px] text-[15.5px] leading-[var(--lh-relaxed)] text-text-dimmer">
                {caseStudy.summary}
              </p>
              <span className="inline-flex items-center mt-1.5 gap-2 text-[15px] font-bold text-amber-light">
                Read case study <span aria-hidden="true" className="text-[17px]">&#8594;</span>
              </span>
            </div>
            <div
              className="relative flex items-center justify-center min-h-[300px]"
              style={{ background: accentFeaturedPanelGradient(caseStudy.accent) }}
            >
              <div
                aria-hidden="true"
                className="absolute w-[280px] h-[280px] rounded-full blur-[70px]"
                style={{ background: accentMix(caseStudy.accent, 20) }}
              />
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-icon-stroke)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative"
                aria-hidden="true"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}

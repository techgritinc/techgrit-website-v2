import Link from "next/link";
import type { CaseStudy } from "../_data/types";
import { ACCENT_VAR, accentCoverGradient, accentGlow } from "../_data/accent";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";

export function CaseStudiesGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <section>
      <div className="tg-container pt-[var(--space-11)] pb-[60px] px-[var(--space-15)]">
        <RevealOnScroll>
          <div className="grid grid-cols-1 gap-6 tg-md:grid-cols-3">
            {caseStudies.map((caseStudy) => {
              const accentColor = ACCENT_VAR[caseStudy.accent];

              return (
                <Link
                  key={caseStudy.slug}
                  href={`/case-studies/${caseStudy.slug}`}
                  className="flex flex-col overflow-hidden rounded-2xl border border-border-faint bg-glass-faint backdrop-blur-md hover:-translate-y-1.5 hover:border-[var(--color-border-plain)] transition-transform duration-[250ms] ease-out"
                >
                  <div
                    className="relative flex items-center justify-center h-[150px] overflow-hidden border-b border-border-cover"
                    style={{ background: accentCoverGradient(caseStudy.accent) }}
                  >
                    <div
                      aria-hidden="true"
                      className="absolute w-[200px] h-[200px] rounded-full blur-[60px]"
                      style={{ background: accentGlow(caseStudy.accent) }}
                    />
                    <span className="relative flex items-center justify-center">
                      <span
                        className="font-display text-[40px] font-bold tracking-[var(--ls-normal)]"
                        style={{ color: accentColor }}
                      >
                        {caseStudy.headlineMetric.value}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 px-[var(--space-11)] pt-[var(--space-11)] pb-[var(--space-12)]">
                    <span className="inline-flex items-center gap-2 self-start text-[11px] font-bold tracking-[var(--ls-wider)] uppercase text-text-faded">
                      <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ background: accentColor }}
                      />
                      {caseStudy.industry}
                    </span>
                    <h3 className="mt-3 text-[18.5px] font-bold text-primary leading-[1.3] tracking-normal">
                      {caseStudy.cardTitle}
                    </h3>
                    <p className="flex-1 mt-[9px] text-[14.5px] leading-[var(--lh-relaxed)] text-text-soft">
                      {caseStudy.description}
                    </p>
                    <span className="inline-flex items-center mt-[18px] gap-[7px] text-[14px] font-bold text-amber-light">
                      View Case Study <span aria-hidden="true">&#8594;</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

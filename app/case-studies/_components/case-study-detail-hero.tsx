import Link from "next/link";
import type { CaseStudy } from "../_data/types";
import { accentGlow, accentPanelGradient } from "../_data/accent";

export function CaseStudyDetailHero({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section>
      <div className="tg-container pt-[48px] pb-[30px] px-[var(--space-15)]">
        <Link
          href="/case-studies"
          data-rise
          className="inline-flex items-center gap-[8px] mb-[30px] text-[14px] font-semibold text-text-faint"
        >
          <span aria-hidden="true">&#8592;</span> All case studies
        </Link>
        <div className="grid grid-cols-1 tg-md:grid-cols-[1.05fr_0.95fr] items-center gap-[56px]">
          <div data-rise style={{ animationDelay: ".1s" }}>
            <span className="text-[var(--text-2xs)] font-bold tracking-[var(--ls-widest)] uppercase text-teal-light">
              {caseStudy.category}
            </span>
            <h1 className="mt-[14px] text-[clamp(34px,4.4vw,52px)] leading-[1.05] tracking-[-0.035em]">{caseStudy.title}</h1>
            <p className="mt-[18px] max-w-[520px] text-[18px] leading-[var(--lh-relaxed)] text-secondary">
              {caseStudy.summary}
            </p>
            <div className="inline-flex items-center flex-wrap gap-[18px] mt-[24px] text-[14px] text-text-soft">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              {caseStudy.publishedDate}
            </div>
          </div>
          <div
            data-rise
            className="relative flex items-center justify-center rounded-3xl border border-border overflow-hidden min-h-[330px]"
            style={{
              animationDelay: ".18s",
              background: accentPanelGradient(caseStudy.accent),
            }}
          >
            <div
              aria-hidden="true"
              className="absolute w-[300px] h-[300px] rounded-full blur-[80px]"
              style={{ background: accentGlow(caseStudy.accent) }}
            />
            <svg className="relative" width="140" height="140" viewBox="0 0 24 24" fill="none" stroke="var(--color-icon-stroke)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

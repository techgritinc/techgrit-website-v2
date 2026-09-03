import Link from "next/link";
import type { MoreCaseStudiesSection } from "@/cms/types/case-study-detail-types";
import { ACCENT_VAR, categoryAccent } from "../_data/accent";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function RelatedCaseStudies({ section }: { section: MoreCaseStudiesSection }) {
  if (section.caseStudies.length === 0) return null;

  return (
    <section>
      <div className="tg-container pt-[30px] pb-[30px] px-[var(--space-15)]">
        <RevealOnScroll>
          <div>
            <h2 className="text-[24px] font-bold tracking-[-0.02em] mb-[24px] text-primary">
              {section.title}
            </h2>
            <div className="grid grid-cols-1 gap-[24px] tg-md:grid-cols-3 max-tg-md:h-auto tg-md:h-[137px] leading-[normal]">
              {section.caseStudies.map((caseStudy) => {
                const accentColor = ACCENT_VAR[categoryAccent(caseStudy.categorySlug)];

                return (
                  <Link
                    key={caseStudy.order}
                    href={caseStudy.ctaLink}
                    className="block bg-glass-faint border border-border-faint rounded-[18px] p-[26px] transition-[transform,border-color] duration-[250ms] ease-out hover:-translate-y-[5px]"
                  >
                    <span className="inline-flex items-center gap-[8px] text-[11px] font-bold tracking-[0.1em] uppercase text-text-faded">
                      <span aria-hidden="true" className="w-[8px] h-[8px] rounded-full shrink-0" style={{ background: accentColor }} />
                      {caseStudy.categoryName}
                    </span>
                    <h3
                      title={caseStudy.title}
                      className="mt-[12px] line-clamp-2 min-h-[44.2px] text-[17px] font-bold text-primary leading-[1.3] tracking-[normal]"
                    >
                      {caseStudy.title}
                    </h3>
                    <span className="inline-flex items-center mt-[14px] gap-[7px] text-[13.5px] font-bold text-amber-light">
                      View <span aria-hidden="true">&#8594;</span>
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

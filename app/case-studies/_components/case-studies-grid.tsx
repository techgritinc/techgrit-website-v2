import Link from "next/link";
import type { CaseStudyCard } from "@/cms/types/case-studies-types";
import { ACCENT_VAR, categoryAccent } from "../_data/accent";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { GlassCard } from "@/components/ui/GlassCard";
import MediaSlot from "@/components/ui/MediaSlot";

export function CaseStudiesGrid({ caseStudies }: { caseStudies: CaseStudyCard[] }) {
  return (
    <section>
      <div className="tg-container pt-[var(--space-11)] pb-[60px] px-[var(--space-15)]">
        <RevealOnScroll>
          <div className="grid grid-cols-1 gap-6 tg-md:grid-cols-3">
            {caseStudies.map((caseStudy) => {
              const accent = categoryAccent(caseStudy.categorySlug);
              const accentColor = ACCENT_VAR[accent];

              return (
                <Link key={caseStudy.order} href={caseStudy.ctaLink} style={{ display: "contents" }}>
                  <GlassCard
                    variant="blogCard"
                    hoverBorderColor="hover:border-border-plain"
                    className="flex flex-col !transition-transform !duration-[250ms] !ease-out"
                  >
                    <div className="relative h-[150px] overflow-hidden border-b border-border-cover">
                      <MediaSlot
                        src={caseStudy.image?.url ?? null}
                        alt={caseStudy.image?.alt || caseStudy.title}
                        fill
                        sizes="(max-width: 960px) 100vw, 33vw"
                      />
                    </div>
                    <div className="flex flex-col flex-1 px-[var(--space-11)] pt-[var(--space-11)] pb-[var(--space-12)]">
                      <span className="inline-flex items-center gap-2 self-start text-[11px] font-bold tracking-[var(--ls-wider)] uppercase text-text-faded">
                        <span
                          className="w-2 h-2 rounded-full inline-block"
                          style={{ background: accentColor }}
                        />
                        {caseStudy.categoryName}
                      </span>
                      <h3 className="mt-3 text-[18.5px] font-bold text-primary leading-[1.3] tracking-normal">
                        {caseStudy.title}
                      </h3>
                      <p className="flex-1 mt-[9px] text-[14.5px] leading-[var(--lh-relaxed)] text-text-soft">
                        {caseStudy.subtitle}
                      </p>
                      <span className="inline-flex items-center mt-[18px] gap-[7px] text-[14px] font-bold text-amber-light">
                        {caseStudy.ctaLabel} <span aria-hidden="true">&#8594;</span>
                      </span>
                    </div>
                  </GlassCard>
                </Link>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

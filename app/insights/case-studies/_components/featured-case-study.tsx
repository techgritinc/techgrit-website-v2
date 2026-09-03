import Link from "next/link";
import type { CaseStudyCard } from "@/cms/types/case-studies-types";
import { ACCENT_VAR, accentMix, categoryAccent } from "../_data/accent";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { GlassCard } from "@/components/ui/GlassCard";
import MediaSlot from "@/components/ui/MediaSlot";

export function FeaturedCaseStudy({ caseStudy }: { caseStudy: CaseStudyCard }) {
  const accent = categoryAccent(caseStudy.categorySlug);
  const accentColor = ACCENT_VAR[accent];

  return (
    <section>
      <div className="tg-container pt-[30px] pb-[10px] px-[var(--space-15)]">
        <RevealOnScroll>
          <Link href={caseStudy.ctaLink} style={{ display: "contents" }}>
            <GlassCard
              variant="blogFeatured"
              hoverBorderColor="hover:border-border-plain"
              className="relative grid grid-cols-1 tg-md:grid-cols-[1.1fr_0.9fr] !bg-glass-faint !transition-transform !duration-[250ms] !ease-out"
            >
              <div className="flex flex-col justify-center gap-4 px-11 py-12">
                <span
                  className="inline-flex items-center self-start gap-2 text-[12px] font-bold tracking-[0.1em] uppercase leading-none py-2 px-3 rounded-[30px]"
                  style={{ background: accentMix(accent, 12), color: accentColor }}
                >
                  Featured &middot; {caseStudy.categoryName}
                </span>
                <div className="flex flex-wrap items-end gap-3.5">
                  <span
                    className="font-display text-[54px] font-bold leading-none tracking-[var(--ls-snug)]"
                    style={{ color: accentColor }}
                  >
                    {caseStudy.featuredValue}
                  </span>
                  <span className="pb-2 text-[15px] text-text-soft leading-[normal]">
                    {caseStudy.featuredLabel}
                  </span>
                </div>
                <h2
                  title={caseStudy.title}
                  className="line-clamp-2 text-[clamp(26px,2.8vw,32px)] font-bold leading-[1.15] tracking-[-0.02em]"
                >
                  {caseStudy.title}
                </h2>
                <p
                  title={caseStudy.subtitle}
                  className="line-clamp-2 max-w-[520px] text-[15.5px] leading-[var(--lh-relaxed)] text-text-dimmer"
                >
                  {caseStudy.subtitle}
                </p>
                <span className="inline-flex items-center mt-1.5 gap-2 text-[15px] font-bold text-amber-light leading-[normal]">
                  {caseStudy.ctaLabel} <span aria-hidden="true" className="text-[17px]">&#8594;</span>
                </span>
              </div>
              <div className="relative min-h-[300px]">
                <MediaSlot
                  src={caseStudy.image?.url ?? null}
                  alt={caseStudy.image?.alt || caseStudy.title}
                  fill
                  sizes="(max-width: 960px) 100vw, 45vw"
                />
              </div>
            </GlassCard>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}

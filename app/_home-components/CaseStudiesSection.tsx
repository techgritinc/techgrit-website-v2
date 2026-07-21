import Button from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { CASE_STUDIES } from "./home-data";

export default function CaseStudiesSection() {
  const featured = CASE_STUDIES.find((study) => study.featured) ?? CASE_STUDIES[0];
  const others = CASE_STUDIES.filter((study) => study !== featured);

  return (
    <section id="insights" className="scroll-mt-(--nav-height)">
      <div className="mx-auto max-w-(--container-max) px-9 pt-15 pb-25">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="text-[12.5px] font-bold tracking-widest text-orange uppercase">See how we help teams win</div>
            <h2 className="mt-3.5 font-display text-[44px] font-bold leading-[1.04] tracking-[-0.03em] text-white">Case Studies &amp; Insights.</h2>
          </div>
          <Button href="/case-studies" variant="ghost" size="nav" className="!px-[22px] !py-[13px] !text-[14.5px]">
            View all case studies <span aria-hidden="true" className="text-amber-light">&rarr;</span>
          </Button>
        </div>

        <div className="mt-11 leading-[normal] grid grid-cols-[1.3fr_1fr] gap-6 max-tg-md:grid-cols-1">
          <a href="/case-studies" style={{ display: "contents" }}>
            <GlassCard
              variant="reimagine"
              hoverBorderColor=""
              className="group relative flex min-h-[400px] w-full items-stretch overflow-hidden !rounded-3xl !p-[42px]"
            >
              {/* Blue bg glow (top-left tint and top-right orb) */}
              <div aria-hidden="true" className="absolute inset-0 z-0 opacity-[0.14]" style={{ background: `radial-gradient(circle at top left, ${featured.accentColor}, transparent 75%)` }} />
              <div aria-hidden="true" className="absolute -top-[20%] -right-[15%] z-0 h-[70%] w-[50%] rounded-full blur-glow-lg" style={{ background: featured.accentColor, opacity: 0.16 }} />

              <div className="relative z-10 flex w-full flex-col justify-center gap-4">
                <span
                  className="inline-flex w-fit items-center rounded-[20px] px-[13px] py-[6px] text-12 font-bold tracking-[0.1em] uppercase"
                  style={{
                    color: featured.accentColor,
                    background: `color-mix(in srgb, ${featured.accentColor} 14%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${featured.accentColor} 40%, transparent)`
                  }}
                >
                  {featured.industry}
                </span>
                <div className="flex flex-wrap items-end gap-[14px]">
                  <span
                    className="font-display text-[clamp(48px,6vw,66px)] font-bold leading-none tracking-[-0.03em]"
                    style={{ color: featured.accentColor }}
                  >
                    {featured.metric}
                  </span>
                  <span className="pb-3 text-[15px] text-text-60">{featured.metricLabel}</span>
                </div>
                <h3 className="mt-1.5 font-display text-[clamp(23px,2.5vw,28px)] font-bold leading-[1.2] tracking-[-0.02em] text-white">
                  {featured.title}
                </h3>
                {featured.description && (
                  <p className="max-w-[460px] text-15-5 leading-[1.6] text-text-64">{featured.description}</p>
                )}
                <span className="mt-1.5 inline-flex items-center gap-2 text-[15px] font-bold text-amber-light">
                  Read case study <span aria-hidden="true" className="text-[17px]">&rarr;</span>
                </span>
              </div>
            </GlassCard>
          </a>

          <div className="flex flex-col leading-[normal] gap-6">
            {others.map((study) => (
              <a key={study.title} href="/case-studies" style={{ display: "contents" }}>
                <GlassCard
                  variant="reimagine"
                  hoverBorderColor=""
                  className="group flex !flex-1 w-full flex-col justify-center gap-3 !px-7 !py-6 hover:!translate-y-0 hover:translate-x-[5px]"
                >
                  <div className="flex items-center justify-between gap-[14px]">
                    <span className="inline-flex items-center gap-[9px]">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{
                          background: study.accentColor,
                          boxShadow: `0 0 8px ${study.accentColor}`
                        }}
                      />
                      <span className="text-xs-alt font-bold leading-[normal] tracking-[0.1em] text-text-55 uppercase">{study.industry}</span>
                    </span>
                    <span className="shrink-0 text-[18px] leading-[normal] text-amber-light transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                  </div>
                  <h3 className="font-display text-[16.5px] font-bold leading-[1.6] tracking-normal text-white">{study.title}</h3>
                  <div className="flex items-baseline gap-[9px]">
                    <span className="font-display text-[22px] font-bold leading-none tracking-[-0.01em]" style={{ color: study.accentColor }}>
                      {study.metric}
                    </span>
                    <span className="text-[13px] leading-[normal] text-dim">{study.metricLabel}</span>
                  </div>
                </GlassCard>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

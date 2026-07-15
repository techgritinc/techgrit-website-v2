import Button from "@/components/ui/Button";
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
            <h2 className="mt-3.5 text-[44px] leading-[1.04]">Case Studies &amp; Insights.</h2>
          </div>
          <Button href="/case-studies" variant="ghost" size="sm">
            View all case studies <span aria-hidden="true" className="text-[#F7B733]">&rarr;</span>
          </Button>
        </div>

        <div className="mt-11 grid grid-cols-[1.3fr_1fr] gap-6 max-tg-md:grid-cols-1">
          <a
            href="/case-studies"
            className="relative flex min-h-[400px] items-stretch overflow-hidden rounded-3xl border border-border bg-[rgba(255,255,255,0.04)] p-10.5 backdrop-blur-md transition-[transform,border-color] duration-300 hover:-translate-y-[5px] hover:border-orange"
          >
            <div className="relative flex w-full flex-col justify-center gap-4">
              <span
                className="inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase"
                style={{ background: "rgba(2,132,199,0.16)", color: featured.accentColor }}
              >
                {featured.industry}
              </span>
              <div className="flex flex-wrap items-end gap-3.5">
                <span className="font-display text-4xl font-bold" style={{ color: featured.accentColor }}>
                  {featured.metric}
                </span>
                <span className="pb-3 text-[15px] text-muted">{featured.metricLabel}</span>
              </div>
              <h3 className="mt-1.5 text-[clamp(23px,2.5vw,28px)] leading-[1.2]">
                {featured.title}
              </h3>
              {featured.description && (
                <p className="max-w-115 text-[15.5px] leading-[1.6] text-muted">{featured.description}</p>
              )}
              <span className="mt-1.5 inline-flex items-center gap-2 text-[15px] font-bold text-[#F7B733]">
                Read case study <span aria-hidden="true" className="text-[17px]">&rarr;</span>
              </span>
            </div>
          </a>

          <div className="flex flex-col gap-6">
            {others.map((study) => (
              <a
                key={study.title}
                href="/case-studies"
                className="flex flex-1 flex-col justify-center gap-3 rounded-[20px] border border-border bg-[rgba(255,255,255,0.04)] px-7 py-6 backdrop-blur-md transition-[transform,border-color] duration-300 hover:translate-x-[5px] hover:border-orange"
              >
                <div className="flex items-center justify-between gap-3.5">
                  <span className="inline-flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full" style={{ background: study.accentColor }} />
                    <span className="text-[11.5px] font-bold tracking-wide text-muted uppercase">{study.industry}</span>
                  </span>
                  <span className="shrink-0 text-lg text-[#F7B733]">&rarr;</span>
                </div>
                <h3 className="text-[16.5px] leading-[1.3]">{study.title}</h3>
                <div className="flex items-baseline gap-2.5">
                  <span className="font-display text-xl font-bold" style={{ color: study.accentColor }}>
                    {study.metric}
                  </span>
                  <span className="text-[13px] text-muted">{study.metricLabel}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

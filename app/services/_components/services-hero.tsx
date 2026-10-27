import type { HeroSection } from "../_data/types";
import Button from "@/components/ui/Button";

export function ServicesHero({ section }: { section: HeroSection }) {
  const [before, after] = section.title.split(section.titleHighlight);

  return (
    <section>
      <div className="mx-auto max-w-[1280px] h-auto min-[921px]:h-[458px] px-9 pt-24 pb-16 text-center">
        <div
          data-rise
          className="mb-[var(--space-12)] inline-flex w-[115.625px] !min-h-[33.75px] items-center justify-center gap-[var(--space-3)] rounded-pill border border-border bg-glass leading-[normal]"
          style={{ animationDelay: ".05s" }}
        >
          <span className="text-[12.5px] font-bold uppercase tracking-[1px] text-strong">
            {section.eyebrow}
          </span>
        </div>
        <h1
          data-rise
          className="text-[46px] leading-[1.02] min-[921px]:text-[58px] tracking-[-0.04em]"
          style={{ animationDelay: ".12s" }}
        >
          {before}
          <span className="text-gradient">{section.titleHighlight}</span>
          {after}
        </h1>
        <p
          data-rise
          className="mx-auto mt-[26px] max-w-[640px] text-[18.5px] leading-[1.65] text-secondary"
          style={{ animationDelay: ".2s" }}
        >
          {section.subtitle}
        </p>
        <div
          data-rise
          className="mt-9 flex flex-wrap items-center justify-center gap-[15px]"
          style={{ animationDelay: ".3s" }}
        >
          <Button
            href={section.primaryCtaHref}
            variant="primary"
            className="gap-[9px] !rounded-[12px] !px-[28px] !py-[15px] !min-h-[52px] text-[16px] leading-[normal]"
          >
            {section.primaryCtaLabel} <span aria-hidden="true">&#8594;</span>
          </Button>
          <Button
            href={section.secondaryCtaHref}
            variant="ghost"
            className="gap-[9px] !rounded-[12px] !px-[26px] !py-[16px] text-[16px] leading-[normal]"
          >
            {section.secondaryCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

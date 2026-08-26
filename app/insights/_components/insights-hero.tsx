import Image from "next/image";
import Button from "@/components/ui/Button";
import type { HeroSection } from "@/app/what-we-do/ai-modernization/_data/types";

export function InsightsHero({ section }: { section: HeroSection }) {
  const [before, after] = section.titleHighlight ? section.title.split(section.titleHighlight) : [section.title, ""];

  return (
    <section>
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-10 px-9 pt-[78px] pb-[26px] md:grid-cols-[1.05fr_0.95fr] md:gap-16">
        <div>
          {section.eyebrow ? (
            <div data-rise className="mb-[26px] inline-flex items-center gap-2.5 rounded-full border border-border-amber-soft bg-[var(--color-overlay-amber)] px-4 py-2" style={{ animationDelay: ".05s" }}>
              <span className="status-dot status-yellow" />
              <span className="text-2xs leading-[normal] font-bold tracking-[0.08em] text-white uppercase">{section.eyebrow}</span>
            </div>
          ) : null}
          <h1 data-rise className="text-[38px] leading-[1.04] tracking-[-1.89px] md:text-[54px]" style={{ animationDelay: ".12s" }}>
            {before}
            {section.titleHighlight ? <span className="text-gradient">{section.titleHighlight}</span> : null}
            {after}
          </h1>
          <p data-rise className="mt-6 max-w-[560px] text-[18px] leading-[1.65] text-secondary" style={{ animationDelay: ".2s" }}>
            {section.subtitle}
          </p>
          {section.primaryCtaLabel && section.primaryCtaLink ? (
            <div data-rise className="mt-[34px] flex flex-wrap items-center gap-[15px]" style={{ animationDelay: ".3s" }}>
              <Button
                href={section.primaryCtaLink}
                variant="primary"
                size="hero"
                className="leading-[normal] !shrink-0 !whitespace-normal"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                {section.primaryCtaLabel} <span aria-hidden="true" className="text-[17px]">&#8594;</span>
              </Button>
            </div>
          ) : null}
        </div>
        <div data-rise className="relative" style={{ animationDelay: ".24s" }}>
          <div className="relative overflow-hidden rounded-3xl border border-border-amber-soft shadow-[0_40px_90px_-36px_rgba(0,0,0,0.85)]">
            {section.image ? (
              <Image src={section.image.url} alt={section.image.alternativeText} width={section.image.width} height={section.image.height} sizes="(max-width: 768px) 100vw, 50vw" className="h-[360px] w-full object-cover" priority />
            ) : (
              <div className="flex h-[360px] items-center justify-center bg-glass p-14 text-center text-sm text-faint">Whitepaper preview</div>
            )}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_45%,rgba(0,0,0,0.55))]" />
          </div>
        </div>
      </div>
    </section>
  );
}

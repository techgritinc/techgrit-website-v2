import Image from "next/image";
import Button from "@/components/ui/Button";

export interface IndustryHeroContent {
  eyebrow: string;
  title: string;
  titleHighlight: string | null;
  subtitle: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  image: { url: string; alternativeText: string; width: number; height: number } | null;
}


export function IndustryHero({ section }: { section: IndustryHeroContent }) {
  const [before, after] = section.titleHighlight
    ? section.title.split(section.titleHighlight)
    : [section.title, ""];

  return (
    <section>
      <div className="mx-auto max-w-(--container-max) px-(--container-padding) pt-[80px] pb-[24px] grid grid-cols-1 items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16">
        <div className="order-1">
          <div
            data-rise
            className="inline-flex items-center gap-[8px] bg-overlay-amber border border-border-amber-soft px-4 py-2 rounded-pill mb-[24px] [animation-delay:.05s]"
          >
            <span className="status-dot status-yellow" />
            <span className="leading-[normal] text-2xs font-bold tracking-08 text-strong uppercase">
              {section.eyebrow}
            </span>
          </div>
          <h1
            data-rise
            className="text-[40px] leading-[1.04] md:text-[48px] tracking-[-1.89px] [animation-delay:.12s]"
          >
            {before}
            {section.titleHighlight ? (
              <span className="text-gradient">{section.titleHighlight}</span>
            ) : null}
            {after}
          </h1>
          <p
            data-rise
            className="mt-6 max-w-[560px] text-[18px] leading-[1.65] text-secondary [animation-delay:.2s]"
          >
            {section.subtitle}
          </p>
          <div
            data-rise
            className="flex flex-wrap items-center mt-[32px] gap-[16px] [animation-delay:.3s]"
          >
            <Button href={section.primaryCtaLink} variant="primary" size="hero" className="leading-[normal] !whitespace-normal !shrink">
              {section.primaryCtaLabel} <span aria-hidden="true" className="leading-[normal] text-[16px]">&#8594;</span>
            </Button>
            {section.secondaryCtaLabel && section.secondaryCtaLink ? (
              <Button href={section.secondaryCtaLink} variant="ghost" size="hero" className="leading-[normal] !whitespace-normal !shrink">
                {section.secondaryCtaLabel}
              </Button>
            ) : null}
          </div>
        </div>
        <div data-rise className="relative order-1 md:order-2 [animation-delay:.24s]">
          <div className="relative overflow-hidden rounded-3xl border border-border-amber-soft shadow-[0_40px_90px_-36px_rgba(0,0,0,0.85)]">
            {section.image ? (
              <Image
                src={section.image.url}
                alt={section.image.alternativeText}
                width={section.image.width}
                height={section.image.height}
                preload
                sizes="100vw"
                className="w-full h-[360px] object-cover block"
              />
            ) : (
              <div className="flex items-center justify-center text-center h-[360px] p-tg-14 [background:radial-gradient(circle_at_30%_100%,var(--color-overlay-orange),transparent_60%),var(--color-glass)] text-faint text-sm">
                Comming Soon
              </div>
            )}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[image:linear-gradient(180deg,rgb(var(--tg-page-rgb)/0)_45%,rgb(var(--tg-page-rgb)/0.55))]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

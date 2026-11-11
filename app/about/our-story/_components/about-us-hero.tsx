import type { HeroSection } from "@/cms/types/our-story-types";
import Button from "@/components/ui/Button";

export function AboutUsHero({ section }: { section: HeroSection }) {
  const [before, after] = section.titleHighlight
    ? section.title.split(section.titleHighlight)
    : [section.title, ""];

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1000px] text-center pt-[96px] px-[32px] pb-[64px]">
        <div
          data-rise
          className="inline-flex items-center gap-[8px] bg-glass border border-border-hairline px-[16px] py-[8px] rounded-[40px] mb-[24px] backdrop-blur-[var(--blur-sm)]"
          style={{ animationDelay: ".05s", lineHeight: "normal", opacity: 0 }}
        >
          <span
            className="font-bold uppercase text-strong leading-normal"
            style={{ fontSize: "14px", letterSpacing: "0.08em" }}
          >
            {section.eyebrow}
          </span>
        </div>
        <h1
          data-rise
          className="text-[64px] max-[920px]:text-[48px] font-bold text-white"
          style={{ animationDelay: ".12s", lineHeight: 1.02, letterSpacing: "-0.04em", opacity: 0 }}
        >
          {before}
          {section.titleHighlight ? <span className="text-gradient">{section.titleHighlight}</span> : null}
          {after}
        </h1>
        <p
          data-rise
          className="mx-auto mt-[24px] max-w-[640px] text-secondary"
          style={{ animationDelay: ".2s", fontSize: "18px", lineHeight: 1.65, opacity: 0 }}
        >
          {section.subtitle}
        </p>
        <div
          data-rise
          className="mt-[32px] flex flex-wrap items-center justify-center gap-[16px]"
          style={{ animationDelay: ".3s", opacity: 0 }}
        >
          <Button
            href={section.primaryCtaLink}
            variant="primary"
            size="hero"
            className="!py-[16px] min-h-[52px] leading-[normal]"
          >
            {section.primaryCtaLabel} <span aria-hidden="true" className="text-[16px]">&#8594;</span>
          </Button>
          {section.secondaryCtaLabel ? (
            <Button
              href={section.secondaryCtaLink}
              variant="ghost"
              size="hero"
              className="!px-[24px] leading-[normal]"
            >
              {section.secondaryCtaLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}

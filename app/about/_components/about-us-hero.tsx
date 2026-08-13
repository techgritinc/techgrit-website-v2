import type { HeroSection } from "../_data/types";
import Button from "@/components/ui/Button";

export function AboutUsHero({ section }: { section: HeroSection }) {
  const [before, after] = section.title.split(section.titleHighlight);

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1000px] text-center pt-[96px] px-[36px] pb-[70px]">
        <div
          data-rise
          className="inline-flex items-center gap-[10px] bg-glass border border-border-hairline px-[16px] py-[8px] rounded-[40px] mb-[28px] backdrop-blur-[var(--blur-sm)]"
          style={{ animationDelay: ".05s", lineHeight: "normal", opacity: 0 }}
        >
          <span
            className="font-bold uppercase text-strong leading-normal"
            style={{ fontSize: "12.5px", letterSpacing: "0.08em" }}
          >
            {section.eyebrow}
          </span>
        </div>
        <h1
          data-rise
          className="text-[60px] max-[920px]:text-[46px] font-bold text-white"
          style={{ animationDelay: ".12s", lineHeight: 1.02, letterSpacing: "-0.04em", opacity: 0 }}
        >
          {before}
          <span className="text-gradient">{section.titleHighlight}</span>
          {after}
        </h1>
        <p
          data-rise
          className="mx-auto mt-[26px] max-w-[640px] text-secondary"
          style={{ animationDelay: ".2s", fontSize: "18.5px", lineHeight: 1.65, opacity: 0 }}
        >
          {section.subtitle}
        </p>
        <div
          data-rise
          className="mt-[36px] flex flex-wrap items-center justify-center gap-[15px]"
          style={{ animationDelay: ".3s", opacity: 0 }}
        >
          <Button
            href={section.primaryCtaLink}
            variant="primary"
            size="hero"
            className="!py-[15px] min-h-[52px] leading-[normal]"
          >
            {section.primaryCtaLabel} <span aria-hidden="true" className="text-[17px]">&#8594;</span>
          </Button>
          <Button
            href={section.secondaryCtaLink}
            variant="ghost"
            size="hero"
            className="!px-[26px] leading-[normal]"
          >
            {section.secondaryCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

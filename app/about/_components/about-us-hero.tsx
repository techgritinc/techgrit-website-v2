import type { HeroSection } from "../_data/types";
import Button from "@/components/ui/Button";

export function AboutUsHero({ section }: { section: HeroSection }) {
  const [before, after] = section.title.split(section.titleHighlight);

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1200px] text-center pt-[96px] px-[36px] pb-[70px]">
        <div
          data-rise
          className="inline-flex items-center gap-[var(--space-3)] bg-glass border border-border px-[var(--space-6)] py-[var(--space-2)] rounded-pill mb-[var(--space-12)] backdrop-blur-[var(--blur-sm)]"
          style={{ animationDelay: ".05s" }}
        >
          <span
            className="text-[12.5px] font-bold tracking-[0.08em] uppercase text-strong leading-normal"
          >
            {section.eyebrow}
          </span>
        </div>
        <h1
          data-rise
          className="text-[60px] leading-[1.02] max-[920px]:text-[46px] min-[921px]:whitespace-nowrap tracking-[-0.04em] font-bold text-white"
          style={{ animationDelay: ".12s" }}
        >
          {before}
          <span className="text-gradient">{section.titleHighlight}</span>
          {after}
        </h1>
        <p
          data-rise
          className="mx-auto mt-[var(--space-11)] max-w-[var(--measure-blog-lead)] text-[18.5px] leading-[1.65] text-secondary"
          style={{ animationDelay: ".2s" }}
        >
          {section.subtitle}
        </p>
        <div
          data-rise
          className="mt-[var(--space-15)] flex flex-wrap items-center justify-center gap-[15px]"
          style={{ animationDelay: ".3s" }}
        >
          <Button
            href={section.primaryCtaLink}
            variant="primary"
            size="hero"
            className="text-4 leading-[normal] w-[214.688px] h-[52px]"
          >
            {section.primaryCtaLabel} <span aria-hidden="true">&#8594;</span>
          </Button>
          <Button 
            href={section.secondaryCtaLink} 
            variant="ghost" 
            size="hero"
            className="leading-[normal] w-[176.844px]"
          >
            {section.secondaryCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

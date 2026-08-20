import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/ui/Breadcrumb";
import type { LeadershipHeroSection } from "@/cms/types/leadership-types";

export function LeadershipHero({ section }: { section: LeadershipHeroSection }) {
  // titleHighlight is a genuine substring of title by construction (see
  // cms/types/leadership-types.ts) — split() here is always safe, matching the
  // pattern construction-hero.tsx already uses for the same CMS-shaped field.
  const [before, after] = section.titleHighlight
    ? section.title.split(section.titleHighlight)
    : [section.title, ""];

  return (
    <section>
      <div className="mx-auto flex max-w-[820px] flex-col items-center px-9 pt-[88px] pb-10 text-center">
        {/* Breadcrumb and badge are forced onto their own line each (FR-013) —
            they must never sit side by side at any viewport width. */}
        <div data-rise style={{ animationDelay: ".05s" }}>
          <Breadcrumb
            ancestorLabel={section.breadcrumbLabel}
            ancestorHref={section.breadcrumbHref}
            currentLabel={section.currentLabel}
          />
        </div>
        <div
          data-rise
          className="mt-5 inline-flex items-center gap-2.5 rounded-40 border border-[var(--color-border-orange-35)] bg-[var(--color-overlay-orange-10)] px-3.5 py-1.75"
          style={{ animationDelay: ".12s" }}
        >
          <span className="status-dot status-orange" />
          <span className="text-12 font-extrabold tracking-hint text-[var(--color-orange-light)] uppercase leading-[normal]">
            {section.badgeLabel}
          </span>
        </div>
        <h1
          data-rise
          className="mt-6 text-[38px] leading-[var(--lh-tight)] tracking-[-0.04em] font-bold text-white md:text-[56px]"
          style={{ animationDelay: ".18s" }}
        >
          {before}
          {section.titleHighlight ? <span className="text-gradient">{section.titleHighlight}</span> : null}
          {after}
        </h1>
        <p
          data-rise
          className="mx-auto mt-5.5 max-w-tg-blog-lead text-lg leading-[1.65] tracking-normal text-secondary"
          style={{ animationDelay: ".26s" }}
        >
          {section.subtitle}
        </p>
        <div
          data-rise
          className="mt-8 flex flex-wrap items-center justify-center gap-3.5"
          style={{ animationDelay: ".34s" }}
        >
          <Button href={section.primaryCtaLink} variant="primary" size="hero" className="leading-[normal] tracking-normal">
            {section.primaryCtaLabel} <span aria-hidden="true" className="text-[17px] leading-[normal] tracking-normal">&#8594;</span>
          </Button>
          <Button href={section.secondaryCtaLink} variant="ghost" size="hero" className="leading-[normal] tracking-normal">
            {section.secondaryCtaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

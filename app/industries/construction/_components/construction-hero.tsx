import Image from "next/image";
import Button from "@/components/ui/Button";
import type { HeroSection } from "@/cms/types/construction";

export function ConstructionHero({ section }: { section: HeroSection }) {
  // titleHighlight is already verified server-side (cms/shared/reusable-sections.ts) to be
  // a genuine substring of title, or null — split() here is always safe.
  const [before, after] = section.titleHighlight
    ? section.title.split(section.titleHighlight)
    : [section.title, ""];

  return (
    <section>
      <div
        className="mx-auto max-w-[1280px] px-9 pt-[78px] pb-[26px] grid grid-cols-1 items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-16"
      >
        <div className="order-1">
          <div
            data-rise
            className="inline-flex items-center"
            style={{
              animationDelay: ".05s",
              gap: 10,
              background: "var(--color-overlay-amber)",
              border: "1px solid var(--color-border-amber-soft)",
              padding: "8px 16px",
              borderRadius: "var(--radius-pill)",
              marginBottom: 26,
            }}
          >
            <span className="status-dot status-yellow" />
            <span
              className="leading-[normal]"
              style={{
                fontSize: "var(--text-2xs)",
                fontWeight: "var(--fw-bold)",
                letterSpacing: "0.08em",
                color: "rgba(255,255,255,0.92)",
                textTransform: "uppercase",
              }}
            >
              {section.eyebrow}
            </span>
          </div>
          <h1
            data-rise
            className="text-[38px] leading-[1.04] md:text-[54px] tracking-[-1.89px]"
            style={{ animationDelay: ".12s" }}
          >
            {before}
            {section.titleHighlight ? (
              <span className="text-gradient">{section.titleHighlight}</span>
            ) : null}
            {after}
          </h1>
          <p
            data-rise
            style={{
              animationDelay: ".2s",
              marginTop: 24,
              maxWidth: 560,
              fontSize: 18,
              lineHeight: 1.65,
              color: "var(--color-text-secondary)",
            }}
          >
            {section.subtitle}
          </p>
          <div
            data-rise
            className="flex flex-wrap items-center"
            style={{ animationDelay: ".3s", marginTop: 34, gap: 15 }}
          >
            <Button href={section.primaryCtaLink} variant="primary" size="hero" className="leading-[normal] !whitespace-normal !shrink">
              {section.primaryCtaLabel} <span aria-hidden="true" className="leading-[normal] text-[17px]">&#8594;</span>
            </Button>
            <Button href={section.secondaryCtaLink} variant="ghost" size="hero" className="leading-[normal] px-[26px]">
              {section.secondaryCtaLabel}
            </Button>
          </div>
        </div>
        <div data-rise className="relative order-1 md:order-2" style={{ animationDelay: ".24s" }}>
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: "var(--radius-3xl)",
              border: "1px solid var(--color-border-amber-soft)",
              boxShadow: "0 40px 90px -36px rgba(0,0,0,0.85)",
            }}
          >
            {section.image ? (
              <Image
                src={section.image.url}
                alt={section.image.alternativeText}
                width={section.image.width}
                height={section.image.height}
                preload
                sizes="100vw"
                style={{ width: "100%", height: 360, objectFit: "cover", display: "block" }}
              />
            ) : (
              <div
                className="flex items-center justify-center text-center"
                style={{
                  height: 360,
                  padding: "var(--space-14)",
                  background:
                    "radial-gradient(circle at 30% 100%, var(--color-overlay-orange), transparent 60%), var(--color-glass)",
                  color: "var(--color-text-faint)",
                  fontSize: "var(--text-sm)",
                }}
              >
                Drop a jobsite or field-app screenshot
              </div>
            )}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.55))" }}
            />
            <div className="absolute flex leading-[normal]" style={{ left: 20, bottom: 18, right: 20, gap: 10 }}>
              {section.stats.map((stat) => (
                <div
                  key={stat.order}
                  className="flex-1 leading-[normal]"
                  style={{
                    background: "var(--color-ink-glass-60)",
                    backdropFilter: "blur(var(--blur-md))",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-lg)",
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: "var(--fw-bold)",
                      fontSize: 22,
                      color: "var(--color-amber-light)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: 11.5,
                      fontWeight: "var(--fw-semibold)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

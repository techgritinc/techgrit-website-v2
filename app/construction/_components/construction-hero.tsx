import Image from "next/image";
import type { HeroSection } from "../_data/types";

export function ConstructionHero({ section }: { section: HeroSection }) {
  const [before, after] = section.title.split(section.titleHighlight);

  return (
    <section>
      <div className="mx-auto text-center" style={{ maxWidth: 1000, padding: "96px 36px 0" }}>
        <div
          data-rise
          className="inline-flex items-center"
          style={{
            animationDelay: ".05s",
            gap: 10,
            background: "var(--color-glass)",
            border: "1px solid var(--color-border)",
            padding: "8px 16px",
            borderRadius: "var(--radius-pill)",
            marginBottom: 28,
            backdropFilter: "blur(var(--blur-sm))",
          }}
        >
          <span className="status-dot status-orange" />
          <span
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
          className="text-[44px] leading-[1.02] tracking-[var(--ls-tight)] md:text-[60px]"
          style={{ animationDelay: ".12s" }}
        >
          {before}
          <span className="text-gradient">{section.titleHighlight}</span>
          {after}
        </h1>
        <p
          data-rise
          className="mx-auto"
          style={{
            animationDelay: ".2s",
            marginTop: 26,
            maxWidth: 640,
            fontSize: 18.5,
            lineHeight: 1.65,
            color: "var(--color-text-secondary)",
          }}
        >
          {section.subtitle}
        </p>
        <div
          data-rise
          className="flex flex-wrap items-center justify-center"
          style={{ animationDelay: ".3s", marginTop: 36, gap: 15 }}
        >
          <a href={section.primaryCtaLink} className="btn btn-primary btn-lg">
            {section.primaryCtaLabel} <span aria-hidden="true">&#8594;</span>
          </a>
          <a href={section.secondaryCtaLink} className="btn btn-ghost btn-lg">
            {section.secondaryCtaLabel}
          </a>
        </div>
        <div
          data-rise
          className="grid grid-cols-3 gap-4"
          style={{ animationDelay: ".38s", marginTop: 52, maxWidth: 560, marginInline: "auto" }}
        >
          {section.stats.map((stat, index) => (
            <div key={index}>
              <div
                className="text-gradient"
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: "var(--fw-bold)",
                  fontSize: "clamp(26px, 3.2vw, 34px)",
                  letterSpacing: "var(--ls-snug)",
                  lineHeight: 1,
                }}
              >
                {stat.value}
              </div>
              <div
                className="mt-2"
                style={{
                  fontSize: "var(--text-xs)",
                  fontWeight: "var(--fw-bold)",
                  letterSpacing: "var(--ls-wider)",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="tg-container" style={{ maxWidth: 1140, paddingTop: 56, paddingBottom: 20 }}>
        <div
          className="relative overflow-hidden"
          style={{
            borderRadius: 24,
            border: "1px solid var(--color-border)",
            boxShadow: "0 40px 90px -34px rgba(0,0,0,0.8)",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ zIndex: 2, boxShadow: "inset 0 -80px 120px -60px rgba(10,24,34,0.85)" }}
          />
          {section.image ? (
            <Image
              src={section.image.url}
              alt={section.image.alternativeText}
              width={section.image.width}
              height={section.image.height}
              preload
              sizes="100vw"
              style={{ width: "100%", height: 460, objectFit: "cover", display: "block" }}
            />
          ) : (
            <div
              className="flex items-center justify-center text-center"
              style={{
                height: 460,
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
        </div>
      </div>
    </section>
  );
}

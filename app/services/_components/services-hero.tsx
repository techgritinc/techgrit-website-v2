import type { HeroSection } from "../_data/types";

export function ServicesHero({ section }: { section: HeroSection }) {
  const [before, after] = section.title.split(section.titleHighlight);

  return (
    <section>
      <div className="mx-auto text-center" style={{ maxWidth: 1000, paddingTop: 96, paddingInline: "var(--space-15)", paddingBottom: 64 }}>
        <div
          data-rise
          className="inline-flex items-center"
          style={{
            animationDelay: ".05s",
            gap: "var(--space-3)",
            background: "var(--color-glass)",
            border: "1px solid var(--color-border)",
            padding: "var(--space-2) var(--space-6)",
            borderRadius: "var(--radius-pill)",
            marginBottom: "var(--space-12)",
          }}
        >
          <span
            style={{
              width: "var(--space-2)",
              height: "var(--space-2)",
              borderRadius: "50%",
              background: "var(--color-orange)",
              boxShadow: "var(--shadow-glow-orange)",
            }}
          />
          <span
            style={{
              fontSize: "var(--text-2xs)",
              fontWeight: "var(--fw-bold)",
              letterSpacing: "0.08em",
              color: "var(--color-text-strong)",
              textTransform: "uppercase",
            }}
          >
            {section.eyebrow}
          </span>
        </div>
        <h1
          data-rise
          className="text-[46px] leading-[1.02] tracking-[var(--ls-tight)] min-[921px]:text-[58px]"
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
            marginTop: "var(--space-11)",
            maxWidth: 640,
            fontSize: 18.5,
            lineHeight: "var(--lh-body)",
            color: "var(--color-text-secondary)",
          }}
        >
          {section.subtitle}
        </p>
        <div
          data-rise
          className="flex flex-wrap items-center justify-center"
          style={{ animationDelay: ".3s", marginTop: "var(--space-15)", gap: 15 }}
        >
          <a href={section.primaryCtaHref} className="btn btn-primary btn-lg" style={{ gap: 9 }}>
            {section.primaryCtaLabel} <span aria-hidden="true">&#8594;</span>
          </a>
          <a
            href={section.secondaryCtaHref}
            className="btn btn-ghost btn-ghost--static-border btn-lg"
            style={{ gap: 9, padding: "var(--space-6) var(--space-11)" }}
          >
            {section.secondaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

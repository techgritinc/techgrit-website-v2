import type { HeroSection } from "../_data/types";

export function AboutUsHero({ section }: { section: HeroSection }) {
  const [before, after] = section.title.split(section.titleHighlight);

  return (
    <section>
      <div className="mx-auto text-center" style={{ maxWidth: "var(--measure-hero)", paddingTop: "var(--space-24)", paddingInline: "var(--space-15)", paddingBottom: "var(--space-26)" }}>
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
            backdropFilter: "blur(var(--blur-sm))",
          }}
        >
          <span className="status-dot status-orange" />
          <span
            style={{
              fontSize: "var(--text-2xs)",
              fontWeight: "var(--fw-bold)",
              letterSpacing: "var(--ls-08)",
              color: "var(--color-text-strong)",
              textTransform: "uppercase",
            }}
          >
            {section.eyebrow}
          </span>
        </div>
        <h1
          data-rise
          className="text-[46px] leading-[1.02] tracking-[var(--ls-tight)] md:text-[60px]"
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
            maxWidth: "var(--measure-blog-lead)",
            fontSize: "var(--text-lg-fixed)",
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
          <a
            href={section.primaryCtaLink}
            className="btn btn-primary btn-lg"
            style={{ fontSize: "var(--text-md)" }}
          >
            {section.primaryCtaLabel} <span aria-hidden="true">&#8594;</span>
          </a>
          <a href={section.secondaryCtaLink} className="btn btn-ghost btn-lg"
            style={{ padding: "var(--space-6) var(--space-11)", fontSize: "var(--text-md)" }}
          >
            {section.secondaryCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}

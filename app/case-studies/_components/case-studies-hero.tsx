export function CaseStudiesHero() {
  return (
    <section>
      <div className="mx-auto text-center" style={{ maxWidth: 900, paddingTop: 84, paddingInline: "var(--space-15)", paddingBottom: 30 }}>
        <div
          data-rise
          className="inline-flex items-center"
          style={{
            animationDelay: ".05s",
            gap: "var(--space-3)",
            background: "var(--color-glass)",
            border: "1px solid var(--color-border-hairline)",
            padding: "var(--space-2) var(--space-6)",
            borderRadius: "var(--radius-pill)",
            marginBottom: "var(--space-11)",
          }}
        >
          <span
            style={{
              width: "var(--space-2)",
              height: "var(--space-2)",
              borderRadius: "50%",
              background: "var(--color-blue-light)",
              boxShadow: "var(--shadow-glow-blue-sm)",
            }}
          />
          <span
            style={{
              fontSize: "var(--text-2xs)",
              fontWeight: "var(--fw-bold)",
              letterSpacing: "var(--ls-wider)",
              color: "var(--color-text-strong)",
              textTransform: "uppercase",
            }}
          >
            Case Studies
          </span>
        </div>
        <h1
          data-rise
          style={{
            animationDelay: ".12s",
            fontSize: "clamp(40px, 5.4vw, 58px)",
            lineHeight: 1.04,
            letterSpacing: "-0.035em",
          }}
        >
          Our case study{" "}
          <span
            style={{
              background: "linear-gradient(120deg, var(--color-blue-light), var(--color-blue))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            portfolio.
          </span>
        </h1>
        <p
          data-rise
          className="mx-auto"
          style={{
            animationDelay: ".2s",
            marginTop: 22,
            maxWidth: 640,
            fontSize: 18,
            lineHeight: "var(--lh-body)",
            color: "var(--color-text-secondary)",
          }}
        >
          Explore how we&apos;ve tackled complex challenges and delivered measurable results across
          industries — from FinTech and construction to AI enablement.
        </p>
      </div>
    </section>
  );
}

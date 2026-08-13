export function CaseStudiesHero() {
  return (
    <section>
      <div className="mx-auto text-center max-w-[900px] pt-[84px] px-[var(--space-15)] pb-[30px]">
        <div
          data-rise
          className="inline-flex items-center gap-[var(--space-3)] bg-glass border border-border-hairline py-[var(--space-2)] px-[var(--space-6)] rounded-pill mb-[var(--space-11)] h-[32px]"
          style={{ animationDelay: ".05s" }}
        >
          <span className="w-[var(--space-2)] h-[var(--space-2)] rounded-full bg-blue-light shadow-glow-blue-sm" />
          <span className="text-2xs font-bold tracking-wider text-strong uppercase">
            Case Studies
          </span>
        </div>
        <h1
          data-rise
          className="text-[clamp(40px,5.4vw,58px)] leading-[1.04] tracking-[-0.035em]"
          style={{ animationDelay: ".12s" }}
        >
          Our case study{" "}
          <span className="bg-[linear-gradient(120deg,var(--color-blue-light),var(--color-blue))] bg-clip-text text-transparent">
            portfolio.
          </span>
        </h1>
        <p
          data-rise
          className="mx-auto mt-[22px] max-w-[640px] text-[18px] leading-[29.7px] text-secondary"
          style={{ animationDelay: ".2s" }}
        >
          Explore how we&apos;ve tackled complex challenges and delivered measurable results across
          industries — from FinTech and construction to AI enablement.
        </p>
      </div>
    </section>
  );
}

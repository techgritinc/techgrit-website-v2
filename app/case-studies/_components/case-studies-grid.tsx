import Link from "next/link";
import type { CaseStudy } from "../_data/types";
import { ACCENT_VAR, accentCoverGradient, accentGlow } from "../_data/accent";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";

export function CaseStudiesGrid({ caseStudies }: { caseStudies: CaseStudy[] }) {
  return (
    <section>
      <div className="tg-container" style={{ paddingTop: "var(--space-11)", paddingBottom: 60, paddingInline: "var(--space-15)" }}>
        <RevealOnScroll>
          <div className="grid grid-cols-1 gap-6 tg-md:grid-cols-3">
            {caseStudies.map((caseStudy) => {
              const accentColor = ACCENT_VAR[caseStudy.accent];

              return (
                <Link
                  key={caseStudy.slug}
                  href={`/case-studies/${caseStudy.slug}`}
                  className="flex flex-col hover:-translate-y-1.5 hover:border-[var(--color-border-plain)] transition-transform duration-[250ms] ease-out"
                  style={{
                    borderRadius: "var(--radius-2xl)",
                    border: "1px solid var(--color-border-faint)",
                    background: "var(--color-glass-faint)",
                    overflow: "hidden",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  <div
                    className="relative flex items-center justify-center"
                    style={{
                      height: 150,
                      overflow: "hidden",
                      background: accentCoverGradient(caseStudy.accent),
                      borderBottom: "1px solid var(--color-border-cover)",
                    }}
                  >
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        width: 200,
                        height: 200,
                        borderRadius: "50%",
                        background: accentGlow(caseStudy.accent),
                        filter: "blur(60px)",
                      }}
                    />
                    <span
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-display)",
                          fontSize: 40,
                          fontWeight: "var(--fw-bold)",
                          letterSpacing: "var(--ls-normal)",
                          color: accentColor,
                        }}
                      >
                        {caseStudy.headlineMetric.value}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-col flex-1" style={{ padding: "var(--space-11) var(--space-11) var(--space-12)" }}>
                    <span
                      className="inline-flex items-center self-start"
                      style={{
                        gap: 8,
                        fontSize: 11,
                        fontWeight: "var(--fw-bold)",
                        letterSpacing: "var(--ls-wider)",
                        textTransform: "uppercase",
                        color: "var(--color-text-faded)",
                      }}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: accentColor, display: "inline-block" }} />
                      {caseStudy.industry}
                    </span>
                    <h3 style={{ marginTop: 12, fontSize: 18.5, fontWeight: "var(--fw-bold)", color: "var(--color-text-primary)", lineHeight: 1.3, letterSpacing: "normal" }}>
                      {caseStudy.cardTitle}
                    </h3>
                    <p className="flex-1" style={{ marginTop: 9, fontSize: 14.5, lineHeight: "var(--lh-relaxed)", color: "var(--color-text-soft)" }}>
                      {caseStudy.description}
                    </p>
                    <span
                      className="inline-flex items-center"
                      style={{ marginTop: 18, gap: 7, fontSize: 14, fontWeight: "var(--fw-bold)", color: "var(--color-amber-light)" }}
                    >
                      View Case Study <span aria-hidden="true">&#8594;</span>
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

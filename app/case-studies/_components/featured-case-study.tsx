import Link from "next/link";
import type { CaseStudy } from "../_data/types";
import { ACCENT_VAR, accentFeaturedPanelGradient, accentMix } from "../_data/accent";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";

export function FeaturedCaseStudy({ caseStudy }: { caseStudy: CaseStudy }) {
  const accentColor = ACCENT_VAR[caseStudy.accent];

  return (
    <section>
      <div className="tg-container" style={{ paddingTop: 30, paddingBottom: 10, paddingInline: "var(--space-15)" }}>
        <RevealOnScroll>
          <Link
            href={`/case-studies/${caseStudy.slug}`}
            className="grid grid-cols-1 tg-md:grid-cols-[1.1fr_0.9fr] transition-transform duration-[250ms] ease-out hover:-translate-y-[5px] hover:border-[var(--hover-border)]"
            style={{
              ["--hover-border" as string]: accentMix(caseStudy.accent, 50),
              position: "relative",
              overflow: "hidden",
              borderRadius: "var(--radius-4xl)",
              border: "1px solid var(--color-border)",
              background: "var(--color-glass-faint)",
              backdropFilter: "blur(8px)",
            }}
          >
            <div className="flex flex-col justify-center" style={{ padding: "48px 44px", gap: 16 }}>
              <span
                className="inline-flex items-center"
                style={{
                  alignSelf: "flex-start",
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  padding: "8px 12px",
                  borderRadius: 30,
                  background: accentMix(caseStudy.accent, 12),
                  color: accentColor,
                  gap: 8,
                  lineHeight: 1,
                }}
              >
                Featured &middot; {caseStudy.industry}
              </span>
              <div className="flex flex-wrap items-end" style={{ gap: 14 }}>
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 54,
                    fontWeight: "var(--fw-bold)",
                    lineHeight: 1,
                    letterSpacing: "var(--ls-snug)",
                    color: accentColor,
                  }}
                >
                  {caseStudy.headlineMetric.value}
                </span>
                <span style={{ paddingBottom: 8, fontSize: 15, color: "var(--color-text-soft)" }}>
                  {caseStudy.headlineMetric.label}
                </span>
              </div>
              <h2 style={{ fontSize: "clamp(26px, 2.8vw, 32px)", fontWeight: "var(--fw-bold)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
                {caseStudy.title}
              </h2>
              <p style={{ maxWidth: 520, fontSize: 15.5, lineHeight: "var(--lh-relaxed)", color: "var(--color-text-dimmer)" }}>
                {caseStudy.summary}
              </p>
              <span
                className="inline-flex items-center"
                style={{ marginTop: 6, gap: 8, fontSize: 15, fontWeight: "var(--fw-bold)", color: "var(--color-amber-light)" }}
              >
                Read case study <span aria-hidden="true" style={{ fontSize: 17 }}>&#8594;</span>
              </span>
            </div>
            <div
              className="relative flex items-center justify-center"
              style={{ minHeight: 300, background: accentFeaturedPanelGradient(caseStudy.accent) }}
            >
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  width: 280,
                  height: 280,
                  borderRadius: "50%",
                  background: accentMix(caseStudy.accent, 20),
                  filter: "blur(70px)",
                }}
              />
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-icon-stroke)"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ position: "relative" }}
                aria-hidden="true"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
}

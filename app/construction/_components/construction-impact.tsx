import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import { SectionEyebrow } from "@/reusable-components/section-eyebrow";
import type { ImpactSection } from "../_data/types";

export function ConstructionImpact({ section }: { section: ImpactSection }) {
  return (
    <section className="section">
      <div className="tg-container">
        <RevealOnScroll>
          <div className="mx-auto mb-[50px] max-w-[680px] text-center">
            <SectionEyebrow tone="amber">{section.eyebrow}</SectionEyebrow>
            <h2 style={{ fontSize: "clamp(30px, 3.6vw, 42px)", lineHeight: 1.1 }}>{section.title}</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {section.caseStudies.map((caseStudy) => (
              <a
                key={caseStudy.order}
                href={caseStudy.link}
                className="card"
                style={{ display: "block", padding: "30px 26px" }}
              >
                <div
                  style={{
                    fontSize: "var(--text-xs)",
                    fontWeight: "var(--fw-bold)",
                    letterSpacing: "var(--ls-wider)",
                    textTransform: "uppercase",
                    color: "var(--color-text-faint)",
                  }}
                >
                  {caseStudy.label}
                </div>
                <div
                  className="mt-3"
                  style={{ fontFamily: "var(--font-display)", fontSize: "34px", fontWeight: "var(--fw-bold)", color: "var(--color-amber-light)" }}
                >
                  {caseStudy.metric}
                </div>
                <h3 className="mt-3" style={{ fontSize: "18px" }}>{caseStudy.title}</h3>
                <p className="mt-2" style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)", lineHeight: 1.6 }}>
                  {caseStudy.description}
                </p>
                <span
                  className="mt-4 inline-flex items-center"
                  style={{ gap: 8, fontSize: "var(--text-sm)", fontWeight: "var(--fw-bold)", color: "var(--color-orange)" }}
                >
                  Read case study <span aria-hidden="true">&rarr;</span>
                </span>
              </a>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

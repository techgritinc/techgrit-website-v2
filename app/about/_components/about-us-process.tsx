import type { ProcessSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import { SectionEyebrow } from "@/reusable-components/section-eyebrow";

export function AboutUsProcess({ section }: { section: ProcessSection }) {
  return (
    <section className="section">
      <div className="tg-container">
        <RevealOnScroll>
          <div className="mx-auto mb-11 max-w-[680px] text-center">
            <SectionEyebrow>{section.eyebrow}</SectionEyebrow>
            <h2>{section.title}</h2>
            <p className="mt-4" style={{ color: "var(--color-text-muted)" }}>
              {section.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {section.steps.map((step) => (
              <div key={step.order} className="card p-8">
                <div
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--fw-bold)",
                    color: "var(--color-amber-light)",
                    letterSpacing: "var(--ls-wide)",
                  }}
                >
                  {step.label}
                </div>
                <h3 className="mt-4">{step.title}</h3>
                <p className="mt-3" style={{ fontSize: "var(--text-sm)", color: "var(--color-text-faint)" }}>
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

import type { ProcessSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import { SectionEyebrow } from "@/reusable-components/section-eyebrow";

export function AboutHowWeWork({ section }: { section: ProcessSection }) {
  return (
    <section className="section">
      <div className="tg-container">
        <RevealOnScroll>
          <div className="mx-auto text-center content-max-lg" style={{ marginBottom: "var(--space-25)" }}>
            <SectionEyebrow>{section.eyebrow}</SectionEyebrow>
            <h2 style={{ fontSize: "var(--text-h2-sub)" }}>{section.title}</h2>
            <p className="mt-4" style={{ color: "var(--color-text-muted)" }}>
              {section.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {section.steps.map((step) => (
              <div key={step.order} className="card rounded-2xl" style={{ padding: "var(--space-14) var(--space-13)" }}>
                <div
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--fw-bold)",
                    color: "var(--color-amber-light)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {step.label}
                </div>
                <h3 style={{ marginTop: "var(--space-5)", fontSize: "var(--text-h3-card)" }}>{step.title}</h3>
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

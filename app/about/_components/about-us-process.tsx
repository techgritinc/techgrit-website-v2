import type { ProcessSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import { SectionEyebrow } from "@/reusable-components/section-eyebrow";

export function AboutUsProcess({ section }: { section: ProcessSection }) {
  return (
    <section className="section">
      <div className="tg-container">
        <RevealOnScroll>
          <div className="mx-auto max-w-[680px] text-center" style={{ marginBottom: 50 }}>
            <SectionEyebrow>{section.eyebrow}</SectionEyebrow>
            <h2 style={{ fontSize: "clamp(30px, 3.6vw, 42px)" }}>{section.title}</h2>
            <p className="mt-4" style={{ color: "var(--color-text-muted)" }}>
              {section.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {section.steps.map((step) => (
              <div key={step.order} className="card rounded-2xl" style={{ padding: "34px 30px" }}>
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
                <h3 style={{ marginTop: 14, fontSize: "22px" }}>{step.title}</h3>
                <p className="mt-3" style={{ fontSize: "15.5px", color: "var(--color-text-faint)" }}>
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

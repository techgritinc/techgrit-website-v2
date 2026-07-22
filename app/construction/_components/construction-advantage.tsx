import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import { SectionEyebrow } from "@/reusable-components/section-eyebrow";
import type { AdvantageSection } from "../_data/types";

export function ConstructionAdvantage({ section }: { section: AdvantageSection }) {
  return (
    <section className="section">
      <div className="tg-container">
        <RevealOnScroll>
          <div className="mx-auto mb-[50px] max-w-[680px] text-center">
            <SectionEyebrow>{section.eyebrow}</SectionEyebrow>
            <h2 style={{ fontSize: "clamp(30px, 3.6vw, 42px)", lineHeight: 1.1 }}>{section.title}</h2>
            <p className="mt-4" style={{ color: "var(--color-text-muted)" }}>
              {section.description}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {section.points.map((point) => (
              <div key={point.order} className="card rounded-2xl" style={{ padding: "34px 30px" }}>
                <div
                  style={{
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--fw-bold)",
                    color: "var(--color-orange)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {String(point.order).padStart(2, "0")}
                </div>
                <h3 style={{ marginTop: 14, fontSize: "22px" }}>{point.title}</h3>
                <p className="mt-3" style={{ fontSize: "15.5px", color: "var(--color-text-faint)" }}>
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

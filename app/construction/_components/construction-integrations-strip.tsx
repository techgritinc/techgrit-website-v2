import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import type { IntegrationsStripSection } from "../_data/types";

export function ConstructionIntegrationsStrip({ section }: { section: IntegrationsStripSection }) {
  return (
    <section>
      <div className="tg-container" style={{ maxWidth: 1140, paddingTop: 20, paddingBottom: 20 }}>
        <RevealOnScroll>
          <div
            style={{
              borderTop: "1px solid var(--color-border)",
              paddingTop: 32,
            }}
          >
            <div
              className="text-center"
              style={{
                fontSize: "var(--text-2xs)",
                fontWeight: "var(--fw-bold)",
                letterSpacing: "var(--ls-wider)",
                textTransform: "uppercase",
                color: "var(--color-text-faint)",
              }}
            >
              {section.label}
            </div>
            <div
              className="flex flex-wrap items-center justify-center"
              style={{ marginTop: 22, gap: 12 }}
            >
              {section.partners.map((partner) => (
                <span
                  key={partner.name}
                  style={{
                    background: "var(--color-glass)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "var(--radius-pill)",
                    padding: "10px 22px",
                    fontSize: "var(--text-sm)",
                    fontWeight: "var(--fw-bold)",
                    color: "var(--color-text-secondary)",
                    backdropFilter: "blur(var(--blur-sm))",
                  }}
                >
                  {partner.name}
                </span>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

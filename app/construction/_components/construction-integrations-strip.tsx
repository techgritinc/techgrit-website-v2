import type { IntegrationsStripSection } from "../_data/types";

export function ConstructionIntegrationsStrip({ section }: { section: IntegrationsStripSection }) {
  return (
    <section>
      <div className="mx-auto max-w-[1280px] px-9 pt-[18px] pb-[60px]">
        <div
          className="flex flex-wrap items-center justify-between"
          style={{
            borderTop: "1px solid var(--color-border-8)",
            borderBottom: "1px solid var(--color-border-8)",
            padding: "26px 0",
            gap: 30,
          }}
        >
          <span
            className="leading-[normal]"
            style={{
              fontSize: "var(--text-2xs)",
              fontWeight: "var(--fw-bold)",
              letterSpacing: "1.75px",
              textTransform: "uppercase",
              color: "var(--color-text-ghost)",
              whiteSpace: "nowrap",
            }}
          >
            {section.label}
          </span>
          <div className="flex flex-wrap items-center gap-[14px] sm:gap-[34px] leading-[normal]">
            {section.partners.map((partner) => (
              <span
                key={partner.order}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 21,
                  fontWeight: "var(--fw-bold)",
                  color: "var(--color-text-muted)",
                  letterSpacing: "-0.01em",
                }}
              >
                {partner.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

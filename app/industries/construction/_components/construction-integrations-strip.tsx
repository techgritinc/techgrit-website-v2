import type { IntegrationsStripSection } from "@/cms/types/construction";

export function ConstructionIntegrationsStrip({ section }: { section: IntegrationsStripSection }) {
  return (
    <section>
      <div className="mx-auto max-w-(--container-max) px-(--container-padding) pt-[16px] pb-[64px]">
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
          <div className="flex flex-wrap items-center gap-[12px] sm:gap-[32px] leading-[normal]">
            {section.partners.map((partner) => (
              <span
                key={partner.order}
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: 20,
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

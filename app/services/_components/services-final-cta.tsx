import type { FinalCtaSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";

export function ServicesFinalCta({ section }: { section: FinalCtaSection }) {
  return (
    <section>
      <div className="tg-container" style={{ maxWidth: 1180, paddingTop: 40, paddingBottom: 110, paddingInline: 36 }}>
        <RevealOnScroll>
          <div
            className="glass-card mx-auto text-center"
            style={{ padding: "76px 40px", borderRadius: 28, position: "relative", overflow: "hidden" }}
          >
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: -120,
                left: "50%",
                transform: "translateX(-50%)",
                width: 520,
                height: 340,
                borderRadius: "50%",
                background: "var(--color-overlay-orange-strong)",
                filter: "blur(90px)",
              }}
            />
            <div style={{ position: "relative" }}>
              <div
                style={{
                  fontSize: "var(--text-2xs)",
                  fontWeight: "var(--fw-bold)",
                  letterSpacing: "var(--ls-widest)",
                  textTransform: "uppercase",
                  color: "var(--color-orange)",
                }}
              >
                {section.eyebrow}
              </div>
              <h2 className="mt-4" style={{ fontSize: "clamp(34px, 4.4vw, 48px)", lineHeight: 1.06 }}>{section.heading}</h2>
              <p className="mx-auto mt-5" style={{ maxWidth: 600, color: "var(--color-text-secondary)", fontSize: 18, lineHeight: 1.6 }}>
                {section.description}
              </p>
              <div style={{ marginTop: 34 }}>
                <a
                  href={section.ctaHref}
                  className="btn btn-primary btn-lg"
                  style={{
                    fontSize: 17,
                    gap: "10px",
                    padding: "17px 34px",
                    borderRadius: 13,
                    whiteSpace: "normal",
                  }}
                >
                  {section.ctaLabel} <span aria-hidden="true" style={{ fontSize: 18 }}>&#8594;</span>
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

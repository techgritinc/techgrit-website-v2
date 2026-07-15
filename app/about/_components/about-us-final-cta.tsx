import type { FinalCtaSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";

export function AboutUsFinalCta({ section }: { section: FinalCtaSection }) {
  return (
    <section>
      <div className="tg-container" style={{ maxWidth: 1180, paddingTop: 40, paddingBottom: 110 }}>
        <RevealOnScroll>
          <div
            className="glass-card mx-auto text-center"
            style={{ padding: "76px 40px", position: "relative", overflow: "hidden" }}
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
                background: "rgba(232, 119, 34, 0.28)",
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
              <h2 className="mt-4" style={{ fontSize: "clamp(34px, 4.4vw, 48px)" }}>{section.title}</h2>
              <p className="mx-auto mt-5" style={{ maxWidth: 600, color: "var(--color-text-secondary)", fontSize: "clamp(16px, 1.4vw, 18px)" }}>
                {section.description}
              </p>
              <div style={{ marginTop: 34 }}>
                <a
                  href={section.ctaLink}
                  className="btn btn-primary btn-lg"
                  style={{
                    fontSize: "clamp(16px, 1.4vw, 17px)",
                    gap: "10px",
                    padding: "17px 34px",
                    borderRadius: 13,
                  }}
                >
                  {section.ctaLabel} <span aria-hidden="true" style={{ fontSize: "clamp(17px, 1.4vw, 18px)" }}>&#8594;</span>
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

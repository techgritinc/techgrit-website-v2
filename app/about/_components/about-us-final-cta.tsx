import type { FinalCtaSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";

export function AboutUsFinalCta({ section }: { section: FinalCtaSection }) {
  return (
    <section>
      <div className="tg-container-lg section-cta">
        <RevealOnScroll>
          <div
            className="glass-card glass-card-lg mx-auto text-center"
            style={{ position: "relative", overflow: "hidden" }}
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
              <h2 className="mt-4" style={{ fontSize: "var(--text-h2-cta)" }}>{section.title}</h2>
              <p className="mx-auto mt-5 content-max-sm" style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-lg-sm)" }}>
                {section.description}
              </p>
              <div style={{ marginTop: "var(--space-14)" }}>
                <a
                  href={section.ctaLink}
                  className="btn btn-primary btn-lg"
                  style={{
                    fontSize: "var(--text-btn-cta)",
                    gap: "10px",
                    padding: "17px 34px",
                    borderRadius: 13,
                  }}
                >
                  {section.ctaLabel} <span aria-hidden="true" style={{ fontSize: "var(--text-btn-cta-icon)" }}>&#8594;</span>
                </a>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

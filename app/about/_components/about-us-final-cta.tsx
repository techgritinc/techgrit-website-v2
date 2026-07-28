import type { FinalCtaSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import Button from "@/components/ui/Button";

export function AboutUsFinalCta({ section }: { section: FinalCtaSection }) {
  return (
    <section>
      <div className="tg-container-lg section-cta">
        <RevealOnScroll>
          <div
            className="glass-card glass-card-lg mx-auto text-center"
            style={{ position: "relative", overflow: "hidden",padding:"var(--space-27) var(--space-16a)" }}
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
                <Button
                  href={section.ctaLink}
                  size="lg"
                  className="!leading-[normal] !gap-[10px] !rounded-[13px] !px-[34px] !py-[17px] !text-base !whitespace-normal hover:!shadow-btn-primary"
                >
                  {section.ctaLabel} <span aria-hidden="true" style={{ fontSize: "var(--text-btn-cta-icon)" }}>&#8594;</span>
                </Button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

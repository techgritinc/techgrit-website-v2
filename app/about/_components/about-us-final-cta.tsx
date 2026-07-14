import type { FinalCtaSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";

export function AboutUsFinalCta({ section }: { section: FinalCtaSection }) {
  return (
    <section>
      <div className="tg-container" style={{ paddingTop: 40, paddingBottom: 110 }}>
        <RevealOnScroll>
          <div className="glass-card mx-auto text-center" style={{ maxWidth: 1180, padding: "76px 40px" }}>
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
            <h2 className="mt-4">{section.title}</h2>
            <p className="mx-auto mt-5" style={{ maxWidth: 600, color: "var(--color-text-secondary)" }}>
              {section.description}
            </p>
            <div className="mt-9">
              <a href={section.ctaLink} className="btn btn-primary btn-lg">
                {section.ctaLabel} <span aria-hidden="true">&#8594;</span>
              </a>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

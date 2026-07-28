import type { PartnerSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import { SectionEyebrow } from "@/reusable-components/section-eyebrow";

export function AboutUsPartner({ section }: { section: PartnerSection }) {
  return (
    <section className="section">
      <div className="tg-container-lg">
        <RevealOnScroll>
          <div className="grid grid-cols-1 items-center gap-9 md:grid-cols-[0.9fr_1.1fr] md:gap-15">
            <div>
              <SectionEyebrow>{section.eyebrow}</SectionEyebrow>
              <h2 className="text-about-h2 text-who-you-are-h2" style={{ lineHeight: 1.1 }}>{section.title}</h2>
              <p className="mt-5" style={{ color: "var(--color-text-muted)", fontSize: "var(--text-md-lg)", lineHeight: 1.7 }}>
                {section.description}
              </p>
            </div>
            <div className="flex flex-col gap-3.5">
              {section.outcomes.map((outcome, index) => (
                <div key={index} className="card flex items-center gap-3.5 rounded-lg" style={{ padding: "var(--space-8) var(--space-9)" }}>
                  <span
                    className="flex flex-shrink-0 items-center justify-center rounded-full"
                    style={{ width: 26, height: 26, background: "var(--color-overlay-orange)" }}
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="var(--color-amber-light)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
                    {outcome.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

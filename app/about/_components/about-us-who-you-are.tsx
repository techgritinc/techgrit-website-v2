import type { WhoYouAreSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import { SectionEyebrow } from "@/reusable-components/section-eyebrow";

export function AboutUsWhoYouAre({ section }: { section: WhoYouAreSection }) {
  return (
    <section className="section">
      <div className="tg-container-lg">
        <RevealOnScroll>
          <div className="grid grid-cols-1 items-center gap-9 md:grid-cols-[1fr_0.85fr] md:gap-15">
            <div>
              <SectionEyebrow>{section.eyebrow}</SectionEyebrow>
              <h2 style={{ fontSize: "var(--text-h2-sub-sm)", lineHeight: 1.08 }}>{section.title}</h2>
              {section.paragraphs.map((paragraph, index) => {
                const marginTop = index === 0 ? 20 : 16;
                if (!paragraph.highlight) {
                  return (
                    <p key={index} style={{ marginTop, lineHeight: 1.7 }}>
                      {paragraph.text}
                    </p>
                  );
                }
                const [before, after] = paragraph.text.split(paragraph.highlight);
                return (
                  <p key={index} style={{ marginTop, lineHeight: 1.7 }}>
                    {before}
                    <strong style={{ color: "var(--color-text-primary)", fontWeight: "var(--fw-bold)" }}>
                      {paragraph.highlight}
                    </strong>
                    {after}
                  </p>
                );
              })}
            </div>
            <div
              className="card rounded-xl"
              style={{ borderLeft: "3px solid var(--color-orange)", padding: "var(--space-14) var(--space-26)" }}
            >
              <div
                style={{
                  marginBottom: "var(--space-7)",
                  fontSize: "var(--text-2xs-lg)",
                  fontWeight: "var(--fw-bold)",
                  letterSpacing: "var(--ls-widest)",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                }}
              >
                {section.concernsCard.label}
              </div>
              <div className="flex flex-col gap-4">
                {section.concernsCard.concerns.map((concern, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span
                      className="flex flex-shrink-0 items-center justify-center"
                      style={{
                        width: 30,
                        height: 30,
                        borderRadius: 9,
                        background: "var(--color-overlay-orange)",
                        color: "var(--color-amber-light)",
                        fontWeight: "var(--fw-bold)",
                      }}
                    >
                      ?
                    </span>
                    <span className="font-semibold" style={{ color: "var(--color-text-primary)" }}>
                      {concern}
                    </span>
                  </div>
                ))}
              </div>
              <p
                className="mt-6 pt-5 font-semibold"
                style={{
                  borderTop: "1px solid var(--color-border)",
                  color: "var(--color-text-primary)",
                  fontSize: "var(--text-md)",
                }}
              >
                {section.concernsCard.closingStatement}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

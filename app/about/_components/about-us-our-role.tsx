import type { OurRoleSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import { SectionEyebrow } from "@/reusable-components/section-eyebrow";

export function AboutUsOurRole({ section }: { section: OurRoleSection }) {
  const [before, after] = section.title.split(section.titleHighlight);

  return (
    <section className="section">
      <div className="tg-container">
        <RevealOnScroll>
          <div className="mx-auto text-center" style={{ maxWidth: 1000 }}>
            <SectionEyebrow>{section.eyebrow}</SectionEyebrow>
            <h2 style={{ fontSize: "clamp(30px, 3.6vw, 42px)", lineHeight: 1.1 }}>
              {before}
              <span className="text-gradient">{section.titleHighlight}</span>
              {after}
            </h2>
            <p
              className="mx-auto"
              style={{ marginTop: 22, maxWidth: 680, fontSize: "clamp(16px, 1.4vw, 18px)", lineHeight: 1.7 }}
            >
              {section.description}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

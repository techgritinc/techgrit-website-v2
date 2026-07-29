import type { OurRoleSection } from "../_data/types";
import { RevealOnScroll } from "@/reusable-components/reveal-on-scroll";
import { SectionEyebrow } from "@/reusable-components/section-eyebrow";

export function AboutUsOurRole({ section }: { section: OurRoleSection }) {
  const [before, after] = section.title.split(section.titleHighlight);

  return (
    <section className="section">
      <div className="tg-container" style={{ paddingInline: "var(--space-15)" }}>
        <RevealOnScroll>
          <div className="mx-auto text-center content-max-xl">
            <SectionEyebrow>{section.eyebrow}</SectionEyebrow>
            <h2 className="text-about-h2 text-values-h2 text-who-you-are-h2 text-our-role-subtitle" style={{ lineHeight: 1.1 }}>
              {before}
              <span className="text-gradient">{section.titleHighlight}</span>
              {after}
            </h2>
            <p
              className="mx-auto content-max-lg text-final-cta-arrow"
              style={{ marginTop: 22, fontSize: "var(--text-lg-sm)", lineHeight: 1.7 }}
            >
              {section.description}
            </p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

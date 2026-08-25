import type { OurRoleSection } from "@/cms/types/our-story-types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

export function AboutUsOurRole({ section }: { section: OurRoleSection }) {
  const [before, after] = section.titleHighlight
    ? section.title.split(section.titleHighlight)
    : [section.title, ""];

  return (
    <section className="relative">
      <div className="mx-auto max-w-[1000px] px-[36px] py-[60px] text-center">
        <RevealOnScroll>
            <SectionEyebrow showAccent={false} className="justify-center">
              {section.eyebrow}
            </SectionEyebrow>
            <h2 className="text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              {before}
              {section.titleHighlight ? (
                <span className="bg-[linear-gradient(120deg,#F59E0B,#E87722)] bg-clip-text text-transparent">{section.titleHighlight}</span>
              ) : null}
              {after}
            </h2>
            <p className="mx-auto mt-[22px] max-w-[680px] text-[18px] leading-[1.7] text-secondary">
              {section.description}
            </p>
        </RevealOnScroll>
      </div>
    </section>
  );
}

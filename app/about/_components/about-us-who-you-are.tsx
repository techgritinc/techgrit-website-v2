import type { WhoYouAreSection } from "../_data/types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

export function AboutUsWhoYouAre({ section }: { section: WhoYouAreSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1180px] px-[36px] py-[60px]">
        <RevealOnScroll>
          <div className="grid grid-cols-[1fr_0.85fr] gap-[60px] max-[920px]:grid-cols-1 max-[920px]:gap-[36px] items-center">
            <div>
              <SectionEyebrow showAccent={false} className="!flex">
                {section.eyebrow}
              </SectionEyebrow>
              <h2 className="text-[clamp(30px,3.6vw,40px)] font-bold leading-[1.08] tracking-[-0.03em] text-white">
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph, index) => {
                if (!paragraph.highlight) {
                  return (
                    <p key={index} className={`text-[17px] leading-[1.7] text-white/70 ${index === 0 ? "mt-[20px]" : "mt-[16px]"}`}>
                      {paragraph.text}
                    </p>
                  );
                }
                const [before, after] = paragraph.text.split(paragraph.highlight);
                return (
                  <p key={index} className={`text-[17px] leading-[1.7] text-white/70 ${index === 0 ? "mt-[20px]" : "mt-[16px]"}`}>
                    {before}
                    <strong className="font-bold text-white">
                      {paragraph.highlight}
                    </strong>
                    {after}
                  </p>
                );
              })}
            </div>
            <div className="rounded-[18px] border border-white/10 border-l-[3px] border-l-orange bg-white/4 px-[32px] py-[34px] backdrop-blur-[8px]">
              <div className="mb-[18px] text-[13px] font-bold uppercase leading-normal tracking-[1.3px] text-white/55">
                {section.concernsCard.label}
              </div>
              <div className="flex flex-col gap-[16px]">
                {section.concernsCard.concerns.map((concern, index) => (
                  <div key={index} className="flex items-center gap-[13px]">
                    <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-[9px] bg-overlay-orange font-bold text-amber-light">
                      ?
                    </span>
                    <span className="text-[16px] font-semibold text-white">
                      {concern}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-[24px] border-t border-white/10 pt-[20px] text-[16px] font-semibold leading-[1.6] text-white">
                {section.concernsCard.closingStatement}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

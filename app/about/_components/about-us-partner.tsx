import type { PartnerSection } from "../_data/types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

export function AboutUsPartner({ section }: { section: PartnerSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1180px] px-[36px] py-[60px]">
        <RevealOnScroll>
          <div className="grid grid-cols-[0.9fr_1.1fr] gap-[60px] max-[920px]:grid-cols-1 max-[920px]:gap-[36px] items-center">
            <div>
              <SectionEyebrow showAccent={false} className="!flex">
                {section.eyebrow}
              </SectionEyebrow>
              <h2 className="text-[clamp(30px,3.6vw,40px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
                {section.title}
              </h2>
              <p className="mt-[20px] text-[16.5px] leading-[1.7] text-white/66">
                {section.description}
              </p>
            </div>
            <div className="flex flex-col gap-[14px]">
              {section.outcomes.map((outcome, index) => (
                <div key={index} className="flex items-center gap-[14px] rounded-[14px] border border-white/10 bg-white/4 px-[22px] py-[20px]">
                  <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-overlay-orange">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="stroke-amber-light"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span className="text-[16px] font-semibold text-white">
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

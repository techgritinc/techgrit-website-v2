import type { ProcessSection } from "@/cms/types/our-story-types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

export function AboutHowWeWork({ section }: { section: ProcessSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-(--container-max) px-(--container-padding) py-[64px]">
        <RevealOnScroll>
          <div className="mx-auto mb-[48px] max-w-[680px] text-center">
            <SectionEyebrow showAccent={false} className="mb-4 justify-center">
              {section.eyebrow}
            </SectionEyebrow>
            <h2 className="text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              {section.title}
            </h2>
            <p className="mx-auto mt-[16px] text-[16px] leading-[1.6] text-white/66">
              {section.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-[24px] max-[920px]:grid-cols-1">
            {section.steps.map((step) => (
              <div
                key={step.order}
                className="relative rounded-[20px] border border-white/10 bg-white/4 px-[32px] py-[32px] backdrop-blur-[8px] transition-[transform,border-color] duration-[250ms] ease-in-out hover:-translate-y-[5px] hover:border-orange/50"
              >
                <div className="text-[14px] font-bold tracking-[0.05em] h-[18px] text-amber-light">
                  {step.label}
                </div>
                <h3 className="mt-[12px] text-[20px] font-bold !leading-normal tracking-normal text-white">{step.title}</h3>
                <p className="mt-[12px] text-[16px] leading-[1.6] text-white/64">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

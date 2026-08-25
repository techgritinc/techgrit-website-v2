import Image from "next/image";
import type { ValuesSection } from "@/cms/types/our-story-types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

export function AboutUsValues({ section }: { section: ValuesSection }) {
  return (
    <section id="values" className="relative scroll-mt-[96px]">
      <div className="mx-auto max-w-[1280px] px-[36px] py-[60px]">
        <RevealOnScroll>
          <div className="mx-auto mb-[50px] max-w-[680px] text-center">
            <SectionEyebrow showAccent={false} className="mb-4 justify-center">
              {section.eyebrow}
            </SectionEyebrow>
            <h2 className="text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.1] tracking-[-0.03em] text-white">
              {section.title}
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-y-0 gap-x-[64px] border-b border-white/10 max-[920px]:grid-cols-2 max-[560px]:grid-cols-1">
            {section.values.map((value) => (
              <div
                key={value.order}
                className="flex gap-[22px] border-t border-white/10 px-[4px] py-[30px] transition-all duration-[250ms] ease-in-out hover:pl-[14px]"
              >
                <span className="w-[24px] shrink-0 pt-[4px] text-[14px] font-bold tracking-[0.05em] text-orange">
                  {String(value.order).padStart(2, "0")}
                </span>
                <div>
                  <div className="flex items-center gap-[11px]">
                    {value.icon ? (
                      <Image src={value.icon.url} alt={value.icon.alt} width={19} height={19} aria-hidden="true" />
                    ) : null}
                    <h3 className="text-[19px] font-bold leading-normal tracking-[-0.01em] text-white">{value.title}</h3>
                  </div>
                  <p className="mt-[8px] text-[15px] leading-[1.6] text-white/58">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

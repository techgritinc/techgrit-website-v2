import Image from "next/image";
import type { ValuesSection } from "../_data/types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

const VALUE_ICON_PATHS: Record<number, React.ReactNode> = {
  1: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  2: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  ),
  3: <path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.1V18h6v-1.2c0-.8.4-1.6 1-2.1A7 7 0 0 0 12 2z" />,
  4: (
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  5: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  6: (
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
  ),
};

function ValueIcon({ order }: { order: number }) {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      className="stroke-amber-light"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {VALUE_ICON_PATHS[order]}
    </svg>
  );
}

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
                    ) : (
                      <ValueIcon order={value.order} />
                    )}
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

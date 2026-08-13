import type { FinalCtaSection } from "../_data/types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import Button from "@/components/ui/Button"

export function ServicesFinalCta({ section }: { section: FinalCtaSection }) {
  return (
    <section id="contact" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-9 pt-[56px] pb-[100px]">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-[28px] border border-border bg-glass-4 px-10 py-[80px] text-center backdrop-blur-[12px]">
            <div
              aria-hidden="true"
              className="absolute bottom-[-120px] left-1/2 h-[340px] w-[520px] -translate-x-1/2 rounded-full bg-[var(--color-overlay-orange-strong)] blur-[90px]"
            />
            <div className="relative">
              <div className="text-[12.5px] leading-[normal] font-bold uppercase tracking-[2px] text-orange">
                {section.eyebrow}
              </div>
              <h2 className="mt-4 text-[clamp(34px,4.4vw,48px)] leading-[1.06]">
                {section.heading}
              </h2>
              <p className="mx-auto mt-5 max-w-[600px] text-[18px] leading-[1.6] text-secondary">
                {section.description}
              </p>
              <div className="mt-[34px]">
                <Button
                  href={section.ctaHref}
                  variant="primary"
                  className="!whitespace-normal !h-auto !gap-[10px] !rounded-[13px] !px-[34px] !py-[15px] !min-h-[52px] !text-[17px] !shadow-[0_18px_44px_-12px_var(--color-border-orange-hover)]"
                >
                  {section.ctaLabel} <span className="text-[18px]">&#8594;</span>
                </Button>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

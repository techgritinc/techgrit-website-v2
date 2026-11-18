import { Faq } from "@/components/ui/Faq";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { FaqSection } from "../_data/types";

export function ManagedServicesFaq({ section }: { section: FaqSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-(--container-max) px-(--container-padding) py-[64px]">
        <RevealOnScroll>
          <div className="mb-8">
            <div className="mb-3 text-[14px] leading-[normal] font-extrabold uppercase tracking-[0.16em] text-orange">
              {section.eyebrow}
            </div>
            <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
          </div>
          <Faq items={section.items} />
        </RevealOnScroll>
      </div>
    </section>
  );
}

import { CheckIcon } from "@/components/ui/icons";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { IdealForSection } from "@/cms/types/discovery-sprints-types";

export function DiscoverySprintsIdealFor({ section }: { section: IdealForSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <h2 className="text-center text-[clamp(26px,3vw,34px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
            {section.title}
          </h2>
          <div className="mx-auto mt-9 grid max-w-[900px] grid-cols-1 gap-3.5 sm:grid-cols-2">
            {section.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3 rounded-lg border border-border-8 bg-glass-3 px-4.5 py-3.5"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-overlay-orange-14)] text-orange">
                  <CheckIcon />
                </span>
                <span className="text-[14px] leading-[1.4] tracking-[normal] text-70">{item.label}</span>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

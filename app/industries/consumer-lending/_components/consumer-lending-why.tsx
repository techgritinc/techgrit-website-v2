import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { IntroSection } from "../_data/types";

// Reference content has no icon for these six points, only a number ("01".."06") and a single
// paragraph — neither ContentBlock (label + pill chips) nor IconTile (mandatory separate
// title+description) fits this shape, so this is a small purpose-built row instead of a forced
// reuse, per Constitution Principle III's own escape hatch.
export function ConsumerLendingWhy({ section }: { section: IntroSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-10 max-w-[720px]">
            <div className="mb-3 text-[12.5px] font-extrabold uppercase leading-[normal] tracking-[0.16em] text-orange">
              {section.eyebrow}
            </div>
            <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
            <p className="mt-3.5 text-[16.5px] leading-[1.6] text-text-66">{section.description}</p>
          </div>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
            {section.blockers.map((blocker) => (
              <div
                key={blocker.id}
                className="flex items-start gap-3.5 rounded-lg border border-border-8 bg-glass-3 p-4.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border-orange-30 bg-[var(--color-overlay-orange-14)] text-[13px] font-extrabold text-amber-light">
                  {blocker.label}
                </span>
                <p className="text-[14.5px] leading-[1.55] text-70">{blocker.description}</p>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

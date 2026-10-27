import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { WhySection } from "@/cms/types/engagement-models-types";

// "Why TechGrit engagements" — same underlying CMS component/data shape as
// Orbit AI's "Built for Real-World Engineering" chip grid, rendered as a
// 2-column grid (1 column on mobile) matching the reference's own
// `.why-grid` (`grid-template-columns:1fr 1fr`, collapsing to 1fr below its
// ~920px breakpoint — mapped to the project's canonical `md` breakpoint).
export function EngagementModelsWhy({ section }: { section: WhySection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="text-center">
            {section.eyebrow && (
              <div className="mb-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-orange">
                {section.eyebrow}
              </div>
            )}
            <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
            <p className="mx-auto mt-3 max-w-[640px] text-[15px] leading-[1.6] text-60">{section.description}</p>
          </div>
          <div className="mt-9 grid grid-cols-1 gap-4 md:grid-cols-2">
            {section.chips.map((chip) => (
              <div
                key={chip.id}
                className="flex items-center gap-3 rounded-lg border border-border-8 bg-glass-3 px-4.5 py-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--color-overlay-orange-14)] text-orange">
                  {chip.icon && <Image src={chip.icon.url} alt={chip.icon.alternativeText} width={18} height={18} />}
                </span>
                <span className="text-[14px] leading-[1.4] text-70">{chip.label}</span>
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

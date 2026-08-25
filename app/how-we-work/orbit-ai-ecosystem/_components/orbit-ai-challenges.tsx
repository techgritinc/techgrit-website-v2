import Image from "next/image";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { ChallengesSection } from "@/cms/types/orbit-ai-ecosystem-types";

// Renders the "modernization-challenges" component's icon-chip-grid shape —
// "Built for Real-World Engineering" (7 icon chips plus an extraTitle
// supporting line). The chip-less shape ("From AI Opportunity to Business
// Impact") is identical to ContentBlock's own centered no-chips render, so
// page.tsx renders that one via ContentBlock directly instead of duplicating
// it here.
export function OrbitAiChallenges({ section }: { section: ChallengesSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mx-auto max-w-[820px] text-center">
            <div className="mb-3 text-[12.5px] font-extrabold uppercase leading-[normal] tracking-[0.16em] text-orange">
              {section.eyebrow}
            </div>
            <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
            <p className="mx-auto mt-3 text-[15px] leading-[1.6] text-60">{section.subtitle}</p>
          </div>
          <div className="mt-9 grid grid-cols-1 gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {section.chips.map((chip) => (
              <div
                key={chip.id}
                className="flex items-center gap-3 rounded-lg border border-border-8 bg-glass-3 px-4.5 py-3.5"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[var(--color-overlay-orange-14)] text-orange">
                  {chip.icon && <Image src={chip.icon.url} alt={chip.icon.alternativeText} width={18} height={18} />}
                </span>
                <span className="text-[14px] leading-[1.4] tracking-[normal] text-70">{chip.label}</span>
              </div>
            ))}
          </div>
          {section.extraTitle && (
            <div className="mx-auto mt-6 max-w-[820px] rounded-xl border border-border-8 bg-glass-3 px-6 py-5 text-center">
              <p className="text-[15.5px] leading-[1.6] tracking-[normal] text-text-66">{section.extraTitle}</p>
            </div>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}

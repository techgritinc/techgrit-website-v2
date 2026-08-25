import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { CapabilitiesSection } from "../_data/types";

export function AiStrategyRoadmapCapabilities({ section }: { section: CapabilitiesSection }) {
  return (
    <section id="capabilities" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-11 text-center">
            <div className="mb-3 text-[12.5px] leading-[normal] font-extrabold uppercase tracking-[0.16em] text-orange">
              {section.eyebrow}
            </div>
            <h2 className="text-[clamp(30px,3.6vw,42px)] leading-[1.06] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
            <p className="mx-auto mt-3.5 max-w-[640px] text-[17px] leading-[1.6] text-text-66">
              {section.description}
            </p>
          </div>
          {/* Collapses at 641px, matching the reference's [data-cap-grid] @media(max-width:640px)
              rule verbatim — not this project's canonical sm=560px breakpoint, whose 80px gap
              against the real 640px edge produced a visible mismatch window against the reference. */}
          <div className="grid grid-cols-1 gap-5 min-[641px]:grid-cols-2">
            {section.capabilities.map((capability) => (
              <GlassCard key={capability.id} variant="serviceCapability">
                <div className="mb-[10px] text-[12px] leading-[normal] font-extrabold tracking-[0.14em] text-orange">
                  {capability.stepLabel}
                </div>
                <GlassCardTitle variant="serviceCapability">{capability.title}</GlassCardTitle>
                <GlassCardDescription variant="serviceCapability">{capability.lede}</GlassCardDescription>
                <ul className="mt-3.5 flex flex-col gap-[7px]">
                  {capability.bullets.map((bullet) => (
                    <li key={bullet.id} className="relative pl-4 text-[13px] leading-[1.5] text-70">
                      <span className="absolute top-2 left-0 h-1.5 w-1.5 rounded-full bg-orange" />
                      {bullet.text}
                    </li>
                  ))}
                </ul>
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

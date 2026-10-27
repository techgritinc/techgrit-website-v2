import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { CapabilitiesSection } from "../_data/types";

export function AiModernizationCapabilities({ section }: { section: CapabilitiesSection }) {
  return (
    <section id="capabilities" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-11 text-center">
            <div className="mb-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-orange">
              {section.eyebrow}
            </div>
            <h2 className="text-[clamp(30px,3.6vw,42px)] leading-[1.06] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
            <p className="mx-auto mt-3.5 max-w-[640px] text-[17px] leading-[1.6] text-text-66">
              {section.description}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {section.capabilities.map((capability) => (
              <GlassCard key={capability.id} variant="serviceCapability">
                <div className="mb-[10px] text-[12px] font-extrabold tracking-[0.14em] text-orange">
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
                <div className="flex-1" />
                {capability.note && (
                  <p className="mt-4 line-clamp-2 min-h-[40px] border-t border-border-8 pt-3 text-[13px] leading-[1.5] text-60 italic">{capability.note}</p>
                )}
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

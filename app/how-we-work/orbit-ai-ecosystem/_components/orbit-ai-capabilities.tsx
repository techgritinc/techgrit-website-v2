import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { CapabilitiesSection } from "@/cms/types/orbit-ai-ecosystem-types";

export function OrbitAiCapabilities({ section }: { section: CapabilitiesSection }) {
  return (
    <section id="capabilities" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-11 text-center">
            <div className="mb-3 text-[12.5px] font-extrabold uppercase leading-[normal] tracking-[0.16em] text-orange">
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
            {section.cards.map((card) => (
              <GlassCard key={card.id} variant="serviceCapability">
                <div className="mb-[10px] text-[12px] font-extrabold leading-[normal] tracking-[0.14em] text-orange">
                  {card.categoryLabel}
                </div>
                <GlassCardTitle variant="serviceCapability">{card.title}</GlassCardTitle>
                <GlassCardDescription variant="serviceCapability">{card.subtitle}</GlassCardDescription>
                <ul className="mt-3.5 flex flex-col gap-[7px]">
                  {card.features.map((feature) => (
                    <li key={feature.id} className="relative pl-4 text-[13px] leading-[1.5] text-70">
                      <span className="absolute top-2 left-0 h-1.5 w-1.5 rounded-full bg-orange" />
                      {feature.text}
                    </li>
                  ))}
                </ul>
                <div className="flex-1" />
                {card.outcomeLabel && card.outcomeText && (
                  <p className="mt-4 line-clamp-2 min-h-[40px] border-t border-border-8 pt-3 text-[13px] leading-[normal] tracking-[normal] text-60">
                    <span className="font-bold text-orange">{card.outcomeLabel}</span> {card.outcomeText}
                  </p>
                )}
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

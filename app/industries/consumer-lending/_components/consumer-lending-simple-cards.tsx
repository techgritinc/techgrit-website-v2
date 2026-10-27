import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { AppliedAiSection, HowWeWorkSection } from "../_data/types";

// Shared by Applied AI (2 cols) and How we work (3 cols) — both are label+title+description
// cards with no feature list, differing only in column count.
export function ConsumerLendingSimpleCards({ section }: { section: AppliedAiSection | HowWeWorkSection }) {
  const cols = section.type === "appliedAi" ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-11 text-center">
            <div className="mb-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-orange">{section.eyebrow}</div>
            <h2 className="text-[clamp(30px,3.6vw,42px)] leading-[1.06] font-bold tracking-[-0.03em] text-white">{section.title}</h2>
            <p className="mx-auto mt-3.5 max-w-[640px] text-[17px] leading-[1.6] text-text-66">{section.description}</p>
          </div>
          <div className={`grid grid-cols-1 gap-5 ${cols}`}>
            {section.cards.map((card) => (
              <GlassCard key={card.order} variant="serviceCapability">
                <div className="mb-[10px] text-[12px] font-extrabold tracking-[0.14em] text-orange">{card.label}</div>
                <GlassCardTitle variant="serviceCapability">{card.title}</GlassCardTitle>
                <GlassCardDescription variant="serviceCapability">{card.description}</GlassCardDescription>
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

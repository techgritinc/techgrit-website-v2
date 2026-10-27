import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { InstitutionalSection, LabeledCard } from "../_data/types";

function CardRow({ cards, cols }: { cards: LabeledCard[]; cols: string }) {
  return (
    <div className={`grid grid-cols-1 gap-5 ${cols}`}>
      {cards.map((card) => (
        <GlassCard key={card.order} variant="serviceCapability">
          <div className="mb-[10px] text-[12px] font-extrabold tracking-[0.14em] text-orange">{card.label}</div>
          <GlassCardTitle variant="serviceCapability">{card.title}</GlassCardTitle>
          <GlassCardDescription variant="serviceCapability">{card.description}</GlassCardDescription>
        </GlassCard>
      ))}
    </div>
  );
}

// Row 1: 2 cards, Row 2: 3 cards, plus one plain-text extra card — styled like Orbit AI
// Ecosystem's "Built for Real-World Engineering" callout.
export function ConsumerLendingInstitutional({ section }: { section: InstitutionalSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-11 text-center">
            <div className="mb-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-orange">{section.eyebrow}</div>
            <h2 className="text-[clamp(30px,3.6vw,42px)] leading-[1.06] font-bold tracking-[-0.03em] text-white">{section.title}</h2>
            <p className="mx-auto mt-3.5 max-w-[640px] text-[17px] leading-[1.6] text-text-66">{section.description}</p>
          </div>
          <CardRow cards={section.rowOne} cols="md:grid-cols-2" />
          <div className="mt-5">
            <CardRow cards={section.rowTwo} cols="md:grid-cols-2 lg:grid-cols-3" />
          </div>
          {section.extraText && (
            <div className="mx-auto mt-5 max-w-[960px] rounded-xl border border-border-8 bg-glass-3 px-6 py-5 text-center">
              <p className="text-[15px] leading-[1.6] text-text-66">{section.extraText}</p>
            </div>
          )}
        </RevealOnScroll>
      </div>
    </section>
  );
}

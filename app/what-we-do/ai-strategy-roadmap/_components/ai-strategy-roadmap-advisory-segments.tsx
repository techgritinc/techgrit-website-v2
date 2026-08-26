import Image from "next/image";
import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { AdvisorySegmentCard, AdvisorySegmentsSection } from "../_data/types";

function SegmentTile({ card }: { card: AdvisorySegmentCard }) {
  return (
    <GlassCard variant="serviceCapability">
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-overlay-orange-14)] text-orange">
        {card.icon && <Image src={card.icon.url} alt={card.icon.alternativeText} width={20} height={20} />}
      </span>
      <GlassCardTitle variant="serviceCapability">{card.name}</GlassCardTitle>
      <GlassCardDescription variant="serviceCapability">{card.description}</GlassCardDescription>
    </GlassCard>
  );
}

export function AiStrategyRoadmapAdvisorySegments({ section }: { section: AdvisorySegmentsSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-9 text-center">
            <div className="mb-3 text-[12.5px] leading-[normal] font-extrabold uppercase tracking-[0.16em] text-orange">
              {section.eyebrow}
            </div>
            <h2 className="text-[clamp(26px,3vw,34px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
          </div>
          {/* 4→2→1 collapse at 921px/641px, matching the reference's [data-cap-grid]
              @media(max-width:920px)/@media(max-width:640px) rules verbatim — not this
              project's canonical md=960px/lg=1140px breakpoints. */}
          <div className="grid grid-cols-1 gap-4 min-[641px]:grid-cols-2 min-[921px]:grid-cols-4">
            {section.cards.map((card) => (
              <SegmentTile key={card.id} card={card} />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

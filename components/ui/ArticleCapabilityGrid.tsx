import type { CapabilityGridSection } from "@/cms/types/case-study-detail-types";
import { GlassCard, GlassCardDescription, GlassCardTitle } from "@/components/ui/GlassCard";
import { NarrativeHeading } from "@/components/ui/ArticleNarrative";


export function ArticleCapabilityGrid({ section }: { section: CapabilityGridSection }) {
  const id = `capability-grid-${section.order}`;

  return (
    <div>
      <NarrativeHeading id={id}>{section.title}</NarrativeHeading>
      {section.subtitle ? (
        <p className="mt-[10px] text-[16.5px] leading-[1.75] text-secondary">{section.subtitle}</p>
      ) : null}
      <div className="mt-[22px] grid grid-cols-1 gap-[18px] sm:grid-cols-2">
        {section.cards.map((card) => (
          <GlassCard key={card.order} variant="serviceCapability">
            <div className="mb-[10px] text-[12px] font-extrabold tracking-[0.14em] text-orange">
              {String(card.order).padStart(2, "0")}
            </div>
            <GlassCardTitle variant="serviceCapability">{card.title}</GlassCardTitle>
            {card.subtitle ? (
              <GlassCardDescription variant="serviceCapability">{card.subtitle}</GlassCardDescription>
            ) : null}
            {card.bullets.length ? (
              <ul className="mt-[14px] flex flex-col gap-[7px]">
                {card.bullets.map((bullet) => (
                  <li key={bullet.order} className="relative pl-[16px] text-[13px] leading-[1.5] text-70">
                    <span className="absolute top-[8px] left-0 h-[6px] w-[6px] rounded-full bg-orange" />
                    {bullet.text}
                  </li>
                ))}
              </ul>
            ) : null}
            {card.note ? (
              <p className="mt-[16px] border-t border-border-8 pt-[12px] text-[13px] leading-[1.5] text-60 italic">
                {card.note}
              </p>
            ) : null}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

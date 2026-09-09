import Image from "next/image";
import { GlassCard, GlassCardIcon, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import type { TechStackCard as TechStackCardData, TechStackSection } from "@/cms/types/case-study-detail-types";
import { NarrativeHeading } from "./case-study-narrative";


function TechStackBadge({ card }: { card: TechStackCardData }) {
  if (card.icon) {
    return (
      <GlassCardIcon
        variant="constructionSolution"
        wrapperClassName="bg-[image:var(--gradient-step-badge)] border border-border-step-badge"
      >
        <Image src={card.icon.url} alt={card.icon.alt} width={24} height={24} />
      </GlassCardIcon>
    );
  }

  return (
    <GlassCardIcon
      variant="constructionSolution"
      wrapperClassName="bg-[image:var(--gradient-step-badge)] border border-border-step-badge text-[18px] font-bold text-amber-light"
    >
      {card.stepLabel}
    </GlassCardIcon>
  );
}

export function CaseStudyTechStack({ section }: { section: TechStackSection }) {
  return (
    <div>
      <NarrativeHeading id={`narrative-${section.order}`}>{section.title}</NarrativeHeading>
      <div className="mt-[22px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[22px]">
        {section.cards.map((card) => (
          <GlassCard key={card.order} variant="constructionSolution" hoverBorderColor="">
            <TechStackBadge card={card} />
            <GlassCardTitle className="leading-[normal] tracking-[normal]" variant="constructionSolution">
              {card.title}
            </GlassCardTitle>
            {card.subtitle ? (
              <GlassCardDescription variant="constructionSolution">{card.subtitle}</GlassCardDescription>
            ) : null}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

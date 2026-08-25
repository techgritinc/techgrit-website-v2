import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { GlassCard, GlassCardIcon, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import type { WhatWeBuildSection } from "@/cms/types/healthcare";

export function HealthcareWhatWeBuild({ section }: { section: WhatWeBuildSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-[90px] pb-[60px]" data-reveal>
        <div className="mb-[38px] max-w-[760px]">
          <SectionEyebrow showAccent={false} className="leading-[normal]">{section.eyebrow}</SectionEyebrow>
          <h2 className="text-[clamp(30px,3.8vw,42px)] leading-[1.08] tracking-[-0.03em]">{section.title}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[18px]">
          {section.cards.map((card) => (
            <GlassCard key={card.order} variant="constructionChallenge" hoverBorderColor="">
              {card.icon ? (
                <GlassCardIcon variant="constructionChallenge" wrapperClassName="bg-overlay-orange">
                  <Image src={card.icon.url} alt={card.icon.alt || ""} width={20} height={20} />
                </GlassCardIcon>
              ) : null}
              <GlassCardTitle variant="constructionChallenge" className="tracking-normal">{card.title}</GlassCardTitle>
              <GlassCardDescription variant="constructionChallenge">{card.description}</GlassCardDescription>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

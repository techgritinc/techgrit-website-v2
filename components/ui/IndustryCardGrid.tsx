import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { GlassCard, GlassCardIcon, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import type { WhatWeBuildSection } from "@/cms/shared/industry-sections";

// Shared Industries-page "What We Build" icon card-grid — generalized verbatim from
// Healthcare's original component, extended with an optional section-level description
// paragraph (rendered only when the CMS supplies one).
export function IndustryCardGrid({ section }: { section: WhatWeBuildSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-[90px] pb-[60px]" data-reveal>
        <div className="mb-[38px] max-w-[760px]">
          <SectionEyebrow showAccent={false} className="leading-[normal]">{section.eyebrow}</SectionEyebrow>
          <h2 className="text-[clamp(30px,3.8vw,42px)] leading-[1.08] tracking-[-0.03em]">{section.title}</h2>
          {section.description ? (
            <p className="mt-4 leading-[1.65] md:leading-normal" style={{ color: "var(--color-text-secondary)", fontSize: "var(--text-base)" }}>
              {section.description}
            </p>
          ) : null}
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

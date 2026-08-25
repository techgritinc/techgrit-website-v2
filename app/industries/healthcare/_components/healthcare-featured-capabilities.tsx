import Link from "next/link";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";
import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import type { FeaturedCapabilitiesSection } from "@/cms/types/healthcare";


export function HealthcareFeaturedCapabilities({ section }: { section: FeaturedCapabilitiesSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 pt-[70px] pb-[60px]" data-reveal>
        <div className="mb-[38px] max-w-[760px]">
          <SectionEyebrow tone="amber" className="leading-[normal]">{section.eyebrow}</SectionEyebrow>
          <h2 className="text-[clamp(30px,3.8vw,42px)] leading-[1.08] tracking-[-0.03em]">{section.title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[22px]">
          {section.cards.map((card) => (
            <GlassCard key={card.order} variant="constructionImpact" hoverBorderColor="">
              {card.metric ? (
                <div className="leading-[normal] text-[36px] sm:text-[40px] font-display font-bold text-amber-light tracking-[-0.02em]">
                  {card.metric}
                </div>
              ) : null}
              {card.label ? (
                <div className="mt-[6px] leading-[normal] tracking-[1.5px] text-2xs font-bold uppercase text-45">
                  {card.label}
                </div>
              ) : null}
              <GlassCardTitle variant="constructionImpact" className="mt-[14px] tracking-[normal] text-[16px] md:text-[18.5px]">
                {card.title}
              </GlassCardTitle>
              <GlassCardDescription variant="constructionImpact">{card.description}</GlassCardDescription>
              <Link
                href={card.link}
                className="mt-[18px] inline-flex items-center gap-[7px] text-xs font-bold text-amber-light"
              >
                {card.linkLabel} <span aria-hidden="true">&rarr;</span>
              </Link>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

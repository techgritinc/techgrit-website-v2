import Image from "next/image";
import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { FounderSegmentCard, WhoWeHelpSection } from "../_data/types";

function FounderSegmentTile({ segment }: { segment: FounderSegmentCard }) {
  return (
    <GlassCard variant="serviceCapability">
      <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-[var(--color-overlay-orange-14)] text-orange">
        {segment.icon && <Image src={segment.icon.url} alt={segment.icon.alternativeText} width={20} height={20} />}
      </span>
      <GlassCardTitle variant="serviceCapability">{segment.name}</GlassCardTitle>
      <GlassCardDescription variant="serviceCapability">{segment.description}</GlassCardDescription>
    </GlassCard>
  );
}

export function StartupsWhoWeHelp({ section }: { section: WhoWeHelpSection }) {
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
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {section.segments.map((segment) => (
              <FounderSegmentTile key={segment.id} segment={segment} />
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

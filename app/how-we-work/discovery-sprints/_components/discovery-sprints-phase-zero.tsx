import { ContentBlock } from "@/components/ui/ContentBlock";
import { GlassCard } from "@/components/ui/GlassCard";
import { Outcome } from "@/components/ui/Outcome";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { PhaseZeroSection } from "@/cms/types/discovery-sprints-types";

export function DiscoverySprintsPhaseZero({ section }: { section: PhaseZeroSection }) {
  return (
    <>
      <ContentBlock eyebrow={section.eyebrow} title={section.title} description={section.subtitle} />
      <section className="relative">
        <div className="mx-auto max-w-[820px] px-9 pb-[60px]">
          <RevealOnScroll>
            <GlassCard variant="default" className="!p-9">
              <Outcome heading={section.cardTitle} description={section.cardDescription} />
            </GlassCard>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}

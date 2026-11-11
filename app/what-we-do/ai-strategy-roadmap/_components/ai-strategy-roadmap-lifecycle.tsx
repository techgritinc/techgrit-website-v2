import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { LifecycleSection } from "../_data/types";

export function AiStrategyRoadmapLifecycle({ section }: { section: LifecycleSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-(--container-max) px-(--container-padding) py-[64px]">
        <RevealOnScroll>
          <div className="mb-11 text-center">
            <div className="mb-3 text-[14px] leading-[normal] font-extrabold uppercase tracking-[0.16em] text-orange">
              {section.eyebrow}
            </div>
            <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
          </div>
          <ProcessSteps steps={section.stages} />
        </RevealOnScroll>
      </div>
    </section>
  );
}

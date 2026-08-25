import { GlassCard } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { DeliverablesSection } from "@/cms/types/discovery-sprints-types";

export function DiscoverySprintsDeliverables({ section }: { section: DeliverablesSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-9 text-center">
            <div className="mb-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-orange">
              {section.eyebrow}
            </div>
            <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
            <p className="mx-auto mt-3.5 max-w-[560px] text-[16px] leading-[1.6] text-text-66">
              {section.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2 lg:grid-cols-4">
            {section.deliverables.map((item) => (
              <GlassCard key={item.id} variant="default" className="!p-5">
                <div className="mb-2 text-[11px] font-extrabold tracking-[0.14em] text-orange">{item.number}</div>
                <h4 className="text-[15px] font-bold text-white">{item.title}</h4>
                <p className="mt-1.5 text-[13px] leading-[1.5] text-60">{item.description}</p>
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

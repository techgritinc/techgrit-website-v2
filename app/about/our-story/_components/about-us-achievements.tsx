import type { AchievementsSection } from "@/cms/types/our-story-types";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";

export function AboutUsAchievements({ section }: { section: AchievementsSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1180px] px-[36px] py-[50px]">
        <RevealOnScroll>
          <div className="rounded-[24px] border border-white/10 bg-white/4 px-[40px] py-[44px] backdrop-blur-[8px]">
            <div className="grid grid-cols-4 gap-[20px] max-[560px]:grid-cols-2 text-center">
              {section.stats.map((stat) => (
                <div key={stat.order}>
                  <div className="bg-[image:var(--gradient-phase-node)] bg-clip-text text-[clamp(40px,5vw,56px)] font-bold leading-none tracking-[-0.03em] text-transparent">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-[14px] leading-[normal] font-bold uppercase tracking-[0.08em] text-white/55">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

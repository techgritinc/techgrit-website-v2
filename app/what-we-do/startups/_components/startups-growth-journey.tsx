import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { GrowthJourneySection } from "../_data/types";

export function StartupsGrowthJourney({ section }: { section: GrowthJourneySection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-10">
        <RevealOnScroll>
          <div
            className="rounded-4xl border border-[var(--color-overlay-orange)] p-[40px]"
            style={{ background: "linear-gradient(160deg, var(--color-overlay-orange-07), rgba(255,255,255,0.02))" }}
          >
            <div className="mb-9 text-center">
              <div className="mb-3 text-[12.5px] leading-[normal] font-extrabold uppercase tracking-[0.16em] text-orange">
                {section.eyebrow}
              </div>
              <h2 className="text-[clamp(26px,3vw,36px)] leading-[normal] font-bold tracking-[-0.03em] text-white">
                {section.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {section.stages.map((stage) => (
                <GlassCard
                  key={stage.id}
                  variant="serviceCapability"
                  className={
                    stage.highlighted
                      ? "!p-[28px] !bg-[var(--color-overlay-orange-07)] !border-border-orange-22"
                      : "!p-[28px] !bg-[var(--color-overlay-orange-04)] !border-[var(--color-overlay-orange-14)]"
                  }
                >
                  <div
                    className={`mb-[18px] inline-flex items-center gap-2 rounded-[30px] border px-3 py-[5px] ${
                      stage.highlighted
                        ? "border-[var(--color-hover-orange-border-40)] bg-[var(--color-hover-orange-fill-15)]"
                        : "border-[var(--color-overlay-orange-strong)] bg-[var(--color-overlay-orange-10)]"
                    }`}
                  >
                    <span className="text-[11px] leading-[normal] font-extrabold uppercase tracking-[0.12em] text-amber-badge">
                      {stage.badgeLabel}
                    </span>
                  </div>
                  <GlassCardTitle variant="serviceCapability" className="!text-[20px] !leading-[normal] !tracking-normal">
                    {stage.title}
                  </GlassCardTitle>
                  <GlassCardDescription variant="serviceCapability" className="!mt-[10px] !text-[14px] !leading-[1.6]">
                    {stage.lede}
                  </GlassCardDescription>
                  <ul className="mt-4 flex flex-col gap-2">
                    {stage.bullets.map((bullet) => (
                      <li key={bullet.id} className="relative pl-4 text-[13px] leading-[normal] text-70">
                        <span className="absolute top-[7px] left-0 h-1.5 w-1.5 rounded-full bg-orange" />
                        {bullet.text}
                      </li>
                    ))}
                  </ul>
                </GlassCard>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

import { GlassCard, GlassCardTitle, GlassCardDescription } from "@/components/ui/GlassCard";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { CapabilitiesSection } from "../_data/types";

const COLS: Record<CapabilitiesSection["role"], string> = {
  ourWork: "lg:grid-cols-3",
  operatingContext: "lg:grid-cols-2",
};

// Shared by Our work and Operating context — the same GlassCard grid, differing only in
// column count and which optional fields are populated. "The ecosystem" now renders via its
// own `ConnectedSystems` component (see page.tsx's "connectedSystems" case) instead of here.
export function ConsumerLendingCapabilities({ section }: { section: CapabilitiesSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-11 text-center">
            <div className="mb-3 text-[12.5px] font-extrabold uppercase tracking-[0.16em] text-orange">{section.eyebrow}</div>
            <h2 className="text-[clamp(30px,3.6vw,42px)] leading-[1.06] font-bold tracking-[-0.03em] text-white">{section.title}</h2>
            <p className="mx-auto mt-3.5 max-w-[640px] text-[17px] leading-[1.6] text-text-66">{section.description}</p>
          </div>
          <div className={`grid grid-cols-1 gap-5 md:grid-cols-2 ${COLS[section.role]}`}>
            {section.capabilities.map((capability) => (
              <GlassCard key={capability.id} variant="serviceCapability">
                <div className="mb-[10px] text-[12px] font-extrabold tracking-[0.14em] text-orange">{capability.stepLabel}</div>
                <GlassCardTitle variant="serviceCapability">{capability.title}</GlassCardTitle>
                {section.role !== "operatingContext" && (
                  <GlassCardDescription variant="serviceCapability">{capability.lede}</GlassCardDescription>
                )}
                {capability.bullets.length > 0 && (
                  section.role === "operatingContext" ? (
                    <div className="mt-3.5 grid grid-cols-2 gap-2">
                      {capability.bullets.map((bullet) => (
                        <span
                          key={bullet.id}
                          className="flex items-center gap-2 rounded-pill border border-border-faint bg-glass-4 px-3.5 py-1.5 text-left text-[13px] leading-[normal] text-secondary"
                        >
                          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-orange" />
                          {bullet.text}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <ul className="mt-3.5 flex flex-col gap-[7px]">
                      {capability.bullets.map((bullet) => (
                        <li key={bullet.id} className="relative pl-4 text-[13px] leading-[1.5] text-70">
                          <span className="absolute top-2 left-0 h-1.5 w-1.5 rounded-full bg-orange" />
                          {bullet.text}
                        </li>
                      ))}
                    </ul>
                  )
                )}
                <div className="flex-1" />
                {(capability.metricLabel || capability.note) && (
                  <div className="mt-4 border-t border-border-8 pt-3">
                    {capability.metricLabel && <div className="text-[22px] font-bold text-white">{capability.metricLabel}</div>}
                    {capability.note && (
                      <p className="mt-1.5 line-clamp-2 min-h-[40px] text-[13px] leading-[1.5] text-60 italic">{capability.note}</p>
                    )}
                  </div>
                )}
              </GlassCard>
            ))}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

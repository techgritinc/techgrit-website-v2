import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { StrategiesSection } from "../_data/types";

export function PlatformEngineeringStrategies({ section }: { section: StrategiesSection }) {
  return (
    <section className="relative">
      <div className="mx-auto max-w-[1280px] px-9 py-10">
        <RevealOnScroll>
          <div
            className="rounded-3xl border border-border-orange-18 p-9"
            style={{ background: "linear-gradient(160deg, var(--color-overlay-orange-8), rgba(255,255,255,0.02))" }}
          >
            <div className="mb-[22px]">
              <div className="text-[12.5px] leading-[normal] font-extrabold uppercase tracking-[0.16em] text-orange">
                {section.eyebrow}
              </div>
              <h3 className="mt-2 text-[26px] leading-[normal] font-bold tracking-[-0.02em] text-white">{section.title}</h3>
            </div>
            {/* This page's CMS content ships exactly 4 frameworks (PRISM™, AI IMPACT™, 4D™,
                OrbitAI™) — unlike the sibling "What We Do" pages' own strategies sections,
                which have 6. A 6-column track here would leave 2 empty trailing columns,
                reading as compressed/left-aligned instead of evenly filling the row, so this
                page-local grid uses 4 columns to match its own actual content count. */}
            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {section.strategies.map((strategy) => (
                <div key={strategy.order} className="rounded-card border border-border-8 bg-glass-3 p-4">
                  <div className="text-[15px] leading-[normal] font-extrabold text-amber-badge">{strategy.name}</div>
                  <div className="mt-1 text-[12.5px] leading-[1.5] text-60">{strategy.description}</div>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

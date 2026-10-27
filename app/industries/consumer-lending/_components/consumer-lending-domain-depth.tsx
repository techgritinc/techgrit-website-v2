"use client";

import { useEffect, useRef, useState } from "react";
import { RevealOnScroll } from "@/components/ui/reveal-on-scroll";
import type { DomainDepthSection } from "../_data/types";

// New primitive — no existing tab component fits (components/ui/FilterBar.tsx is a sticky
// rounded-pill filter-chip bar, a different visual contract). Full-width underlined tabs with a
// single animated underline segment that slides to the active tab (measured via refs, not a
// percentage guess) rather than repainting a border per tab.
export function ConsumerLendingDomainDepth({ section }: { section: DomainDepthSection }) {
  const defaultStage = section.stages.find((stage) => stage.isDefault) ?? section.stages[0];
  const [activeId, setActiveId] = useState(defaultStage?.id ?? "");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [underline, setUnderline] = useState({ left: 0, width: 0 });

  const activeStage = section.stages.find((stage) => stage.id === activeId) ?? defaultStage;

  useEffect(() => {
    const el = activeStage ? tabRefs.current[activeStage.id] : null;
    if (el) setUnderline({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeStage]);

  if (!activeStage) return null;

  return (
    <section id="domain-depth" className="relative scroll-mt-24">
      <div className="mx-auto max-w-[1280px] px-9 py-[60px]">
        <RevealOnScroll>
          <div className="mb-9 text-center">
            <div className="mb-3 text-[12.5px] font-extrabold uppercase leading-[normal] tracking-[0.16em] text-orange">
              {section.eyebrow}
            </div>
            <h2 className="text-[clamp(28px,3.2vw,38px)] leading-[1.08] font-bold tracking-[-0.03em] text-white">
              {section.title}
            </h2>
            <p className="mx-auto mt-3.5 max-w-[640px] text-[16.5px] leading-[1.6] text-text-66">
              {section.description}
            </p>
          </div>

          <div className="relative border-b border-border-8">
            <div role="tablist" aria-label={section.title} className="flex gap-1 overflow-x-auto scrollbar-none">
              {section.stages.map((stage) => (
                <button
                  key={stage.id}
                  ref={(el) => {
                    tabRefs.current[stage.id] = el;
                  }}
                  id={`domain-depth-tab-${stage.id}`}
                  type="button"
                  role="tab"
                  aria-selected={stage.id === activeStage.id}
                  aria-controls={`domain-depth-panel-${stage.id}`}
                  onClick={() => setActiveId(stage.id)}
                  className={`shrink-0 whitespace-nowrap px-4 py-3 text-[14px] font-bold transition-colors duration-200 ${
                    stage.id === activeStage.id ? "text-white" : "text-60 hover:text-white"
                  }`}
                >
                  {stage.label}
                </button>
              ))}
            </div>
            <span
              aria-hidden="true"
              className="absolute -bottom-px h-[2px] bg-[image:var(--gradient-brand)] transition-[left,width] duration-300 ease-out"
              style={{ left: underline.left, width: underline.width }}
            />
          </div>

          <div
            id={`domain-depth-panel-${activeStage.id}`}
            role="tabpanel"
            aria-labelledby={`domain-depth-tab-${activeStage.id}`}
            className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-[0.9fr_1.1fr]"
          >
            <div>
              <h3 className="text-[22px] leading-[1.2] font-bold text-white">{activeStage.title}</h3>
              <p className="mt-3.5 text-[15.5px] leading-[1.65] text-text-66">{activeStage.description}</p>
            </div>
            <div className="grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {activeStage.points.map((point) => (
                <div
                  key={point.id}
                  className="flex items-center gap-2.5 rounded-full border border-border-8 bg-glass-3 px-4 py-2.5"
                >
                  <span className="h-[6px] w-[6px] shrink-0 rounded-full bg-orange" />
                  <span className="text-[13.5px] leading-[1.4] text-70">{point.text}</span>
                </div>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

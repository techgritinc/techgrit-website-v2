"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { CheckIcon } from "@/components/ui/icons";
import { SectionEyebrow } from "@/components/ui/section-eyebrow";

/** Icon fields are pre-rendered `ReactNode`s, not component references — a raw component
 * reference can't cross the Server-to-Client-Component prop boundary (this component is
 * "use client"), so the caller (a Server Component) renders each icon at both the sizes
 * this component needs before handing them down. See research.md §12's "RSC boundary" note. */
export type MethodologyPhaseContent = {
  n: number;
  week: string;
  title: string;
  description: string;
  deliverables: string[];
  icon: ReactNode;
  badgeIcon: ReactNode;
};

type PhaseShowcaseProps = {
  phases: MethodologyPhaseContent[];
  eyebrow: string;
  heading: ReactNode;
  description?: ReactNode;
};

/** Reusable scroll-pinned phase showcase (FR-006) — content is caller-supplied so a future
 * consumer (e.g. /frameworks) could reuse this component without forking it; see
 * specs/001-v2-2-ui-enhancements/research.md §12 and plan.md's "Homepage Methodology"
 * addendum item 2 (extracted from app/_home-components/MethodologySection.tsx). */
export default function PhaseShowcase({ phases, eyebrow, heading, description }: PhaseShowcaseProps) {
  const phaseCount = phases.length;
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  // Scroll-pinned active-phase stepper (FR-005, FR-006). Translated from the
  // reference's componentDidMount scroll handler into hooks — see
  // specs/TMS-62/research.md §1 for why position:fixed (not transform-
  // chasing) is used for the pin itself.
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    let mode = "";
    let lastWidth = -1;

    function onScroll() {
      const vh = window.innerHeight;
      const total = track!.offsetHeight - vh;
      const rect = track!.getBoundingClientRect();

      if (total <= 0 || rect.top > 0) {
        if (mode !== "top") {
          Object.assign(stage!.style, { position: "absolute", top: "0", bottom: "", left: "0", right: "0", width: "" });
          mode = "top";
        }
      } else if (rect.bottom >= vh) {
        if (mode !== "fixed" || rect.width !== lastWidth) {
          Object.assign(stage!.style, {
            position: "fixed",
            top: "0",
            bottom: "",
            right: "",
            left: `${rect.left}px`,
            width: `${rect.width}px`,
          });
          mode = "fixed";
          lastWidth = rect.width;
        }
      } else if (mode !== "bottom") {
        Object.assign(stage!.style, { position: "absolute", top: "", bottom: "0", left: "0", right: "0", width: "" });
        mode = "bottom";
      }

      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 0));
      const progress = total > 0 ? scrolled / total : 0;
      const idx = Math.max(0, Math.min(phaseCount - 1, Math.floor(progress * phaseCount - 1e-4)));
      setActiveIndex((current) => (current !== idx ? idx : current));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [phaseCount]);

  const active = phases[activeIndex];
  // The rail runs behind the 32px nodes; mask it so it stops 6px short of each node's edge
  // instead of showing through the (transparent) outlined circles.
  const railGap = 22; // node radius 16px + 6px breathing room
  const railMask = (() => {
    const stops: string[] = [];
    for (let i = 0; i < phaseCount; i += 1) {
      const c = phaseCount > 1 ? (i / (phaseCount - 1)) * 100 : 0;
      stops.push(`black calc(${c}% - ${i === 0 ? 0 : railGap}px)`);
      stops.push(`transparent calc(${c}% - ${i === 0 ? 0 : railGap}px)`);
      stops.push(`transparent calc(${c}% + ${i === phaseCount - 1 ? 0 : railGap}px)`);
      stops.push(`black calc(${c}% + ${i === phaseCount - 1 ? 0 : railGap}px)`);
    }
    return `linear-gradient(to right, ${stops.join(", ")})`;
  })();
  const railFillPercent = (activeIndex / Math.max(phaseCount - 1, 1)) * 100;

  return (
    <section
      id="methodology"
      className="scroll-mt-(--nav-height) [--phase-title-size:15px] max-tg-sm:[--phase-title-size:13px] [--phase-week-size:11.5px] max-tg-sm:[--phase-week-size:9.5px]"
    >
      {/* Mobile-only intro — lives in normal flow ABOVE the pinned track so it
          scrolls out of view first, leaving the pinned stage (phase rail + card)
          the full viewport height. The in-stage copy below is hidden on mobile
          (max-tg-sm:hidden), so desktop/tablet keep the original pinned layout. */}
      <div className="hidden max-tg-sm:block px-tg-17 pt-10 pb-1 text-center">
        <SectionEyebrow showAccent={false} className="mb-2! leading-[normal]">
          {eyebrow}
        </SectionEyebrow>
        <h2 className="mx-auto max-w-205 leading-8.5 text-[clamp(30px,4vw,44px)]">{heading}</h2>
        {description && (
          <p className="mx-auto mt-3 text-xs leading-[1.65] text-muted">{description}</p>
        )}
      </div>

      <div ref={trackRef} className="relative" style={{ height: "420vh" }}>
        <div
          ref={stageRef}
          className="flex min-h-screen flex-col items-center justify-center max-tg-sm:justify-start overflow-hidden py-10 max-tg-sm:pt-21 max-tg-sm:pb-5 px-tg-15 max-tg-md:px-tg-17"
          style={{ position: "absolute", top: 0, left: 0, right: 0 }}
        >
          <div className="mx-auto w-full max-w-7xl px-tg-15 max-tg-md:px-tg-17 max-tg-sm:px-0">
            <div className="max-tg-sm:hidden">
              <div className="text-center">
                <SectionEyebrow showAccent={false} className="mb-3.5! max-tg-sm:mb-2! leading-[normal]">
                  {eyebrow}
                </SectionEyebrow>
              </div>
              <h2 className="mx-auto max-w-205 text-center leading-[46.2px] max-tg-sm:leading-8.5 text-[clamp(30px,4vw,44px)]">
                {heading}
              </h2>
              {description && (
                <p className="mx-auto mt-4.5 max-w-170 text-center text-[18px] leading-[1.65] text-muted max-tg-sm:text-xs max-tg-sm:mt-3">
                  {description}
                </p>
              )}
            </div>

            <div className="relative mt-10 max-tg-sm:mt-1">
              <div
                aria-hidden="true"
                className="absolute top-[15px] right-[12.5%] left-[12.5%] h-[2px] rounded-full bg-[rgb(var(--tg-contrast-rgb)/0.14)]"
                style={{ maskImage: railMask, WebkitMaskImage: railMask }}
              />
              <div
                aria-hidden="true"
                className="absolute top-[15px] left-[12.5%] h-[2px] w-[75%] rounded-full transition-[clip-path] duration-[1200ms]"
                style={{
                  background: "var(--gradient-brand)",
                  maskImage: railMask,
                  WebkitMaskImage: railMask,
                  clipPath: `inset(0 ${100 - railFillPercent}% 0 0)`,
                }}
              />
              <div className="relative grid grid-cols-4 gap-tg-7 max-tg-sm:gap-tg-1b">
                {phases.map((phase, index) => {
                  const isActive = index === activeIndex;
                  const isTodo = index > activeIndex;
                  return (
                    <button
                      key={phase.n}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-current={isActive}
                      className="flex min-w-0 cursor-pointer flex-col items-center border-none bg-transparent p-0 text-center"
                    >
                      <div
                        className={`flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 [&>img]:h-5 [&>img]:w-5 [&>svg]:h-5 [&>svg]:w-5 ${
                          isTodo ? "border-[rgb(var(--tg-contrast-rgb)/0.18)] bg-transparent text-text-70" : "tg-on-brand border-transparent text-on-brand"
                        }`}
                        style={isTodo ? undefined : { background: "var(--gradient-phase-node)" }}
                      >
                        {phase.icon}
                      </div>
                      <div
                        className="mt-3 text-[14px] leading-5 font-medium text-text-60 transition-colors duration-300 max-tg-sm:mt-2 max-tg-sm:text-[11px] max-tg-sm:leading-4"
                        style={{ transitionDelay: `${index * 150}ms` }}
                      >
                        {phase.week}
                      </div>
                      <div
                        className={`mt-1 text-[18px] leading-[26px] font-semibold max-tg-sm:mt-0.5 max-tg-sm:text-[12px] max-tg-sm:leading-[15px] max-tg-sm:hyphens-auto transition-colors duration-300 ${isActive || !isTodo ? "text-primary" : "text-text-60"}`}
                      >
                        {phase.title}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              key={active.n}
              className="mt-8 grid grid-cols-[1.25fr_0.75fr] max-tg-sm:grid-cols-1 overflow-hidden rounded-3xl border border-[rgb(var(--tg-contrast-rgb)/0.1)] bg-glass-4 shadow-glass backdrop-blur-md motion-safe:animate-[tgPhaseIn_0.45s_cubic-bezier(.2,.7,.2,1)]"
            >
              <div className="py-tg-16a px-tg-17 tg-sm:py-10 tg-sm:px-11 max-tg-sm:py-5 max-tg-sm:px-5">
                <div className="text-12 max-tg-sm:text-3xs font-bold tracking-hint text-amber-light uppercase">{active.week}</div>
                <h3 className="mt-2 max-tg-sm:mt-1 text-[clamp(26px,3vw,32px)] max-tg-sm:text-[24px] leading-[normal] font-bold tracking-[-0.02em] text-white">{active.title}</h3>
                <p className="mt-3.5 max-tg-sm:mt-2 text-[16px] max-tg-sm:text-xs leading-[1.65] text-text-70">{active.description}</p>
                <div className="mt-6 max-tg-sm:mt-3 flex flex-col gap-3 max-tg-sm:gap-2">
                  {active.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-overlay-orange">
                        <CheckIcon className="text-amber-light" strokeWidth={3} />
                      </span>
                      <span className="text-[14px] max-tg-sm:text-3xs leading-[normal] text-text-85">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex min-h-75 items-center justify-center overflow-hidden border-l border-border-subtle bg-[linear-gradient(150deg,rgb(var(--tg-accent-tint-rgb)/0.18),rgb(var(--tg-page-rgb)/0.15))] max-tg-sm:min-h-20 max-tg-sm:border-l-0 max-tg-sm:border-t max-tg-sm:bg-none max-tg-sm:justify-start max-tg-sm:px-5">
                <div aria-hidden="true" className="absolute h-60 w-60 max-tg-sm:h-20 max-tg-sm:w-20 rounded-full bg-overlay-orange-22 blur-glow max-tg-sm:hidden" />
                <div
                  className="relative z-10 flex h-42.5 w-42.5 max-tg-sm:h-11 max-tg-sm:w-11 [&>img]:max-tg-sm:h-6 [&>img]:max-tg-sm:w-6 [&>svg]:max-tg-sm:h-6 [&>svg]:max-tg-sm:w-6 tg-on-brand items-center justify-center rounded-full text-on-brand shadow-[var(--shadow-phase-badge-glow)]"
                  style={{ background: "var(--gradient-phase-node)" }}
                >
                  {active.badgeIcon}
                </div>
                <div className="absolute right-6.5 bottom-5.5 z-10 text-xs-alt max-tg-sm:text-3xs font-bold tracking-[0.18em] leading-[normal] text-text-40 uppercase">
                  Phase 0{active.n}
                </div>
              </div>
            </div>
            <div className="mt-tg-7 text-center text-12 font-semibold tracking-hint text-text-32 uppercase">
              Phase {activeIndex + 1} of {phaseCount} {"•"} scroll to advance
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

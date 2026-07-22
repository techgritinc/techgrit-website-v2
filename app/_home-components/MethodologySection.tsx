"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon } from "@/components/ui/icons";
import { METHODOLOGY_PHASES } from "./home-data";

const PHASE_COUNT = METHODOLOGY_PHASES.length;

export default function MethodologySection() {
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
      const idx = Math.max(0, Math.min(PHASE_COUNT - 1, Math.floor(progress * PHASE_COUNT - 1e-4)));
      setActiveIndex((current) => (current !== idx ? idx : current));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const active = METHODOLOGY_PHASES[activeIndex];
  const railFillPercent = (activeIndex / Math.max(PHASE_COUNT - 1, 1)) * 100;

  return (
    <section id="methodology" className="scroll-mt-(--nav-height)">
      <div ref={trackRef} className="relative" style={{ height: "420vh" }}>
        <div
          ref={stageRef}
          className="flex min-h-screen flex-col items-center justify-center overflow-hidden px-tg-15 py-tg-16a"
          style={{ position: "absolute", top: 0, left: 0, right: 0 }}
        >
          <div className="mx-auto w-full max-w-[1100px]">
            <div className="mb-3.5 text-center">
              <span className="inline-flex items-center gap-[9px] text-[12.5px] font-bold tracking-[0.16em] text-orange uppercase">
                <span aria-hidden="true" className="h-[2px] w-6 bg-orange" />
                How we deliver
              </span>
            </div>
            <h2 className="mx-auto max-w-[820px] text-center text-[clamp(30px,4vw,44px)] leading-[1.05]">
              The 6-Week{" "}
              <span className="bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent">Sprint-to-Scale</span>{" "}
              Framework.
            </h2>

            <div className="relative mt-10">
              <div
                aria-hidden="true"
                className="absolute top-[29px] right-[12.5%] left-[12.5%] h-[3px] rounded-full bg-[rgba(255,255,255,0.1)]"
              />
              <div
                aria-hidden="true"
                className="absolute top-[29px] left-[12.5%] h-[3px] w-[75%] rounded-full transition-[clip-path] duration-500"
                style={{
                  background: "var(--gradient-brand)",
                  clipPath: `inset(0 ${100 - railFillPercent}% 0 0)`,
                }}
              />
              <div className="relative grid grid-cols-4 gap-tg-7 max-tg-sm:gap-tg-1b">
                {METHODOLOGY_PHASES.map((phase, index) => {
                  const isActive = index === activeIndex;
                  const isTodo = index > activeIndex;
                  return (
                    <button
                      key={phase.n}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-current={isActive}
                      className="flex cursor-pointer flex-col items-center border-none bg-transparent p-0 text-center"
                    >
                      <div
                        className={`flex h-[58px] w-[58px] items-center justify-center rounded-full border font-display text-[22px] font-bold transition-all duration-300 ${
                          isTodo ? "border-border-18 bg-glass-strong text-text-70" : "border-border-30 text-primary"
                        } ${isActive ? "scale-[1.08] shadow-phase-active" : "scale-100 shadow-phase-ring"}`}
                        style={isTodo ? undefined : { background: "var(--gradient-phase-node)" }}
                      >
                        {phase.n}
                      </div>
                      <div 
                        style={{ fontFamily: "Arial, sans-serif" }}
                        className={`mt-tg-5a text-sm font-bold transition-colors duration-300 ${isActive ? "text-primary" : "text-text-60"}`}
                      >
                        {phase.title}
                      </div>
                      <div
                        style={{ fontFamily: "Arial, sans-serif" }}
                        className={`text-xs-alt font-bold tracking-wider whitespace-nowrap uppercase transition-colors duration-300 ${
                          isActive ? "text-amber-light" : "text-text-40"
                        }`}
                      >
                        {phase.week}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div
              key={active.n}
              className="mt-8 grid grid-cols-[1.25fr_0.75fr] overflow-hidden rounded-3xl border border-[rgba(255,255,255,0.1)] bg-glass-4 shadow-glass backdrop-blur-md motion-safe:animate-[tgPhaseIn_0.45s_cubic-bezier(.2,.7,.2,1)]"
            >
              <div className="py-tg-16a px-tg-17">
                <div className="text-12 font-bold tracking-hint text-amber-light uppercase">{active.week}</div>
                <h3 className="mt-2 text-[clamp(26px,3vw,32px)] font-bold tracking-[-0.02em] text-white">{active.title}</h3>
                <p className="mt-3.5 text-[16px] leading-[1.65] text-text-70">{active.description}</p>
                <div className="mt-6 flex flex-col gap-3">
                  {active.deliverables.map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-overlay-orange">
                        <CheckIcon className="text-amber-light" strokeWidth={3} />
                      </span>
                      <span className="text-[15px] text-text-85">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden border-l border-border-subtle bg-[linear-gradient(150deg,rgba(232,119,34,0.18),rgba(10,24,34,0.15))] max-tg-sm:min-h-[180px]">
                <div aria-hidden="true" className="absolute h-[240px] w-[240px] rounded-full bg-overlay-orange-22 blur-glow" />
                <div className="relative z-10 bg-[image:linear-gradient(160deg,var(--color-amber-light),var(--color-orange))] bg-clip-text font-display text-[170px] font-bold leading-none text-transparent">
                  {active.n}
                </div>
                <div className="absolute right-[26px] bottom-[22px] z-10 text-xs-alt font-bold tracking-[0.18em] text-text-40 uppercase">
                  Phase 0{active.n}
                </div>
              </div>
            </div>
            <div className="mt-tg-7 text-center text-12 font-semibold tracking-hint text-text-32 uppercase">
              Phase {activeIndex + 1} of {PHASE_COUNT} {"\u2022"} scroll to advance
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

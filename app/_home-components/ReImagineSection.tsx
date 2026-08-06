"use client";

import { useEffect, useRef, useState } from "react";
import { PlayIcon, ReimagineSparkleIcon, TechGritMarkIcon } from "@/components/ui/icons";
import { GlassCard, GlassCardDescription, GlassCardIcon, GlassCardTitle } from "@/components/ui/GlassCard";
import MediaSlot from "@/components/ui/MediaSlot";
import { COMPARISON_METRICS, DIFFERENTIATORS } from "./home-data";

const CARD_GLOW = ["hover:shadow-reimagine-glow", "hover:shadow-reimagine-glow-soft", "hover:shadow-reimagine-glow-soft"];

export default function ReImagineSection() {
  const panelRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section>
      <div className="mx-auto max-w-(--container-max) px-9 pt-20 pb-20">
        <div className="text-center">
          <h2 className="inline-flex flex-wrap items-center justify-center gap-5 text-[48px] leading-[1.06]">
            <span className="text-primary">Don&apos;t Migrate.</span>
            <PlayIcon width={46} height={46} className="text-orange drop-shadow-[0_0_14px_rgba(232,119,34,0.6)]" />
            <span className="bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent">Re-Imagine.</span>
          </h2>
          <p className="mx-auto mt-4.5 max-w-[680px] text-[17px] leading-[27.2px] text-muted">
            Lifting and shifting legacy code is a path to obsolescence. The AI era demands a clean slate, orchestrated
            by intelligent agents that build natively for modern scale.
          </p>
        </div>

        <div className="mt-tg-19 grid grid-cols-3 gap-tg-9 max-tg-md:grid-cols-1">
          {DIFFERENTIATORS.map((item, index) => (
            <GlassCard
              key={item.title}
              variant="reimagineDiff"
              hoverBorderColor=""
              className={CARD_GLOW[index]}
            >
              <GlassCardIcon variant="reimagineDiff">
                <ReimagineSparkleIcon width={26} height={26} className="text-orange" />
              </GlassCardIcon>
              <GlassCardTitle variant="reimagineDiff">{item.title}</GlassCardTitle>
              <GlassCardDescription variant="reimagineDiff">{item.description}</GlassCardDescription>
              <div className="mt-auto pt-5">
                <div className="relative h-[180px] overflow-hidden rounded-[14px] border border-[var(--color-glass-strong)] bg-[var(--color-glass-strong)]">
                  <MediaSlot src={item.image} alt={item.title} fill sizes="(min-width: 960px) 33vw, 100vw" />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard
          ref={panelRef}
          variant="reimagineWhy"
          hoverBorderColor=""
          className="mt-6 grid grid-cols-[0.8fr_1.2fr] items-center gap-12 max-tg-md:grid-cols-1"
        >
          <div className="flex items-start gap-4.5">
            <GlassCardIcon variant="reimagineWhy">
              <TechGritMarkIcon className="text-orange" width={30} height={30} />
            </GlassCardIcon>
            <div>
              <GlassCardTitle variant="reimagineWhy">Why AI-First Matters</GlassCardTitle>
              <GlassCardDescription variant="reimagineWhy">
                We don’t &ldquo;add&rdquo; AI to our process; we built our process around the capabilities of
                LLMs and autonomous agents.
              </GlassCardDescription>
            </div>
          </div>
          <div>
            {COMPARISON_METRICS.map((metric, index) => (
              <div key={metric.label} className={index > 0 ? "" : "mb-6"}>
                <div
                  className={`mb-[9px] flex justify-between text-xs leading-[normal] font-bold ${index === 0 ? "text-text-55" : "text-orange"}`}
                >
                  <span>{metric.label}</span>
                  <span>{metric.displayValue}</span>
                </div>
                <div className="h-3.5 rounded-full bg-glass-10">
                  <div
                    className={`h-full rounded-full transition-[width] duration-[1100ms] ease-[cubic-bezier(0.2,0.7,0.2,1)] ${index === 0 ? "bg-border-22" : "bg-[linear-gradient(90deg,var(--color-amber),var(--color-orange))] shadow-[0_0_18px_rgba(232,119,34,0.6)]"}`}
                    style={{ width: revealed ? `${metric.barPercent}%` : "0%" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

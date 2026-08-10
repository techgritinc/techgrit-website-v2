"use client";

import { useEffect, useRef, useState } from "react";
import { LightningIcon, PlayIcon } from "@/components/ui/icons";
import { GlassCard, GlassCardDescription, GlassCardIcon, GlassCardTitle } from "@/components/ui/GlassCard";
import { COMPARISON_METRICS, DIFFERENTIATORS } from "./home-data";

const DIFFERENTIATOR_TONE = {
  orange: {
    iconBg: "bg-overlay-orange",
    iconColor: "text-orange",
    hoverBorder: "",
  },
  blue: {
    iconBg: "bg-icon-bg-blue",
    iconColor: "text-blue-light",
    hoverBorder: "",
  },
  teal: {
    iconBg: "bg-icon-bg-teal",
    iconColor: "text-teal-light",
    hoverBorder: "",
  },
} as const;

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
      <div className="mx-auto max-w-(--container-max) px-9 pt-15 pb-25">
        <div className="text-center">
          <h2 className="inline-flex flex-wrap items-center justify-center gap-5 text-[48px] leading-[1.06]">
            <span className="text-primary">Don&rsquo;t Migrate.</span>
            <PlayIcon width={46} height={46} className="text-orange drop-shadow-[0_0_14px_rgba(232,119,34,0.6)]" />
            <span className="bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent">Re-Imagine.</span>
          </h2>
          <p className="mx-auto mt-4.5 max-w-[680px] text-[17.5px] leading-[1.6] text-muted">
            Lifting and shifting legacy code is a path to obsolescence. The AI era demands a clean slate, orchestrated
            by intelligent agents that build natively for modern scale.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-3 gap-6 max-tg-md:grid-cols-1">
          {DIFFERENTIATORS.map((item) => {
            const Icon = item.icon;
            const tone = DIFFERENTIATOR_TONE[item.tone];
            return (
              <GlassCard key={item.title} variant="reimagine" hoverBorderColor={tone.hoverBorder}>
                <GlassCardIcon variant="reimagine" wrapperClassName={tone.iconBg}>
                  <Icon width={24} height={24} className={tone.iconColor} />
                </GlassCardIcon>
                <GlassCardTitle variant="default" className="leading-normal tracking-normal">{item.title}</GlassCardTitle>
                <GlassCardDescription variant="reimagine" className="tracking-normal">{item.description}</GlassCardDescription>
              </GlassCard>
            );
          })}
        </div>

        <div
          ref={panelRef}
          className="mt-6 grid grid-cols-[0.8fr_1.2fr] items-center gap-12 rounded-[20px] border border-border bg-glass-4 py-tg-16a px-tg-17 backdrop-blur-md max-tg-md:grid-cols-1"
        >
          <div className="flex items-start gap-4.5">
            <div className="flex h-11.5 w-11.5 shrink-0 items-center justify-center rounded-card bg-overlay-orange">
              <LightningIcon className="text-orange" />
            </div>
            <div>
              <h3 className="text-[22px] leading-normal tracking-normal">Why AI-First Matters</h3>
              <p className="mt-2 text-sm leading-[1.55] text-muted">
                We don&rsquo;t &ldquo;add&rdquo; AI to our process. We built our process around the capabilities of
                LLMs and autonomous agents.
              </p>
            </div>
          </div>
          <div>
            {COMPARISON_METRICS.map((metric, index) => (
              <div key={metric.label} className={index > 0 ? "" : "mb-6"}>
                <div
                  className={`mb-[9px] flex justify-between text-xs font-bold ${index === 0 ? "text-text-55" : "text-orange"}`}
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
        </div>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";

type AnimatedStatProps = {
  target: number;
  durationMs?: number;
};

/** Counts up from 0 to `target` once it scrolls into view, matching the
 * reference's own counter exactly: IntersectionObserver at 50% visibility,
 * 1100ms cubic ease-out, plus a safety timeout so the value is never left
 * stuck at 0 if the observer never fires (reduced motion, slow device).
 * Uses ref-based DOM mutation to avoid ~66 React re-renders per counter. */
export default function AnimatedStat({ target, durationMs = 1100 }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;

    node.textContent = "0";

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const start = performance.now();
          const step = (now: number) => {
            const progress = Math.min(1, (now - start) / durationMs);
            node.textContent = String(Math.round(target * (1 - Math.pow(1 - progress, 3))));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 },
    );
    observer.observe(node);

    const safety = setTimeout(() => {
      node.textContent = String(target);
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, [target, durationMs]);

  return <span ref={ref}>{target}</span>;
}

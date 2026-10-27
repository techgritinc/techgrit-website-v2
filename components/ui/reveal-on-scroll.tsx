"use client";

import { useEffect, useRef } from "react";

// ──── Module-level singleton observer ────
// Instead of creating one IntersectionObserver per RevealOnScroll instance
// (231 usages across 77 files), all instances share a single observer.
let sharedObserver: IntersectionObserver | null = null;
const revealCallbacks = new WeakMap<Element, () => void>();

function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            revealCallbacks.get(entry.target)?.();
            sharedObserver!.unobserve(entry.target);
            revealCallbacks.delete(entry.target);
          }
        }
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" },
    );
  }
  return sharedObserver;
}

// Scroll-triggered fade/rise reveal, shared across below-the-fold sections
// site-wide. Uses direct DOM manipulation instead of React state to avoid
// re-render-induced flickering. SSR-safe: content is fully visible on the
// server and during hydration; the hidden state is only applied after mount
// so content is never permanently invisible if JS fails or is slow.
export function RevealOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Apply hidden state now that we're mounted on the client
    node.style.opacity = "0";
    node.style.transform = "translateY(24px)";
    node.style.willChange = "opacity, transform";

    // Fallback: if no IntersectionObserver, reveal immediately without transition
    if (!("IntersectionObserver" in window)) {
      node.style.opacity = "1";
      node.style.transform = "none";
      return;
    }

    const reveal = () => {
      // The shared observer's callback only calls `reveal`, so cancelling the safety
      // timer here (as the per-instance observer used to) covers both paths.
      clearTimeout(safety);
      node.style.transition = "opacity .7s ease, transform .7s ease";
      node.style.opacity = "1";
      node.style.transform = "none";
      // Clean up will-change after animation completes to free GPU memory
      node.addEventListener(
        "transitionend",
        () => {
          node.style.willChange = "auto";
        },
        { once: true }
      );
    };

    revealCallbacks.set(node, reveal);
    getSharedObserver().observe(node);

    const safety = setTimeout(reveal, 1500);

    return () => {
      getSharedObserver().unobserve(node);
      revealCallbacks.delete(node);
      clearTimeout(safety);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}


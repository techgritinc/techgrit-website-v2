"use client";

import { useEffect, useRef } from "react";

// Scroll-triggered fade/rise reveal, shared across below-the-fold sections
// site-wide. Uses direct DOM manipulation instead of React state to avoid
// re-render-induced flickering. A safety timeout guarantees content is never
// left hidden if the observer doesn't fire (reduced motion, slow device,
// older browser).
export function RevealOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Fallback: if no IntersectionObserver, reveal immediately without transition
    if (!("IntersectionObserver" in window)) {
      node.style.opacity = "1";
      node.style.transform = "none";
      return;
    }

    const reveal = () => {
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

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal();
            observer.unobserve(entry.target);
            clearTimeout(safety);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);

    const safety = setTimeout(reveal, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: 0,
        transform: "translateY(24px)",
        willChange: "opacity, transform",
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}

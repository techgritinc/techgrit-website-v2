"use client";

import { useEffect, useRef } from "react";

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
        backfaceVisibility: "hidden",
      }}
    >
      {children}
    </div>
  );
}


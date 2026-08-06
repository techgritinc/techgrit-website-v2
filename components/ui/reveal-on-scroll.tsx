"use client";

import { useEffect, useRef, useState } from "react";

// Scroll-triggered fade/rise reveal, shared across below-the-fold sections
// site-wide. A safety timeout guarantees content is never left hidden if the
// observer doesn't fire (reduced motion, slow device, older browser).
export function RevealOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(
    () => typeof window !== "undefined" && !("IntersectionObserver" in window)
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(node);

    const safety = setTimeout(() => setRevealed(true), 1500);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={
        revealed
          ? { opacity: 1, transform: "none", transition: "opacity .7s ease, transform .7s ease" }
          : { opacity: 0, transform: "translateY(24px)" }
      }
    >
      {children}
    </div>
  );
}

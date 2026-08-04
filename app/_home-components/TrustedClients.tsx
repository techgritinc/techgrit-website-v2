"use client";

import { useEffect, useRef, useState } from "react";
import MediaSlot from "@/components/ui/MediaSlot";
import { TRUSTED_CLIENT_LOGOS } from "./home-data";

export default function TrustedClients() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [overflowing, setOverflowing] = useState(false);

  useEffect(() => {
    const node = wrapRef.current;
    if (!node) return;

    const check = () => setOverflowing(node.scrollWidth > node.clientWidth + 1);
    check();

    const observer = new ResizeObserver(check);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section aria-label="Trusted by our clients" className="relative z-raised border-t border-border-hairline-08 bg-ink">
      <div className="mx-auto max-w-[1280px] px-9 py-14">
        <div className="text-center text-12 font-bold tracking-24 text-ghost uppercase">Trusted by our clients</div>
        <div
          ref={wrapRef}
          role="group"
          aria-label="Client logos"
          tabIndex={0}
          className={[
            "mt-8 flex flex-nowrap items-center gap-x-4 gap-y-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            overflowing
              ? "justify-start [mask-image:linear-gradient(90deg,var(--color-ink)_calc(100%-var(--space-14a)),transparent)]"
              : "justify-center",
          ].join(" ")}
        >
          {TRUSTED_CLIENT_LOGOS.map((logo) => (
            <div
              key={logo.id}
              className="flex h-[74px] shrink-0 items-center justify-center rounded-lg bg-white px-4 shadow-[var(--shadow-card),0_0_0_1px_rgba(255,255,255,0.06)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-[3px] hover:shadow-[var(--shadow-card-hover),var(--shadow-orange-border)]"
            >
              <MediaSlot
                src={logo.src}
                alt={logo.alt}
                width={120}
                height={logo.height}
                style={{ height: logo.height, width: "auto" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

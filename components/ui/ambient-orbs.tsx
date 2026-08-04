"use client";

import { usePathname } from "next/navigation";

// Site-wide decorative glow layer. Case-studies and Construction pages carry
// their own accent-driven backgrounds and must not show this orb set (per
// their own reference files — Construction's second orb is amber, not blue).
export function AmbientOrbs() {
  const pathname = usePathname();
  if (pathname?.startsWith("/case-studies") || pathname?.startsWith("/construction")) return null;

  return (
    <div
      aria-hidden="true"
      className="bg-ambient-orbs"
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    >
      <span
        style={{
          position: "absolute",
          top: -160,
          right: -120,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background: "rgba(232, 119, 34, 0.16)",
          filter: "blur(120px)",
          animation: "tgorb 16s ease-in-out infinite",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: 900,
          left: -180,
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "rgba(2, 132, 199, 0.10)",
          filter: "blur(130px)",
          animation: "tgorb 20s ease-in-out infinite reverse",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: -160,
          left: "40%",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: "rgba(245, 158, 11, 0.09)",
          filter: "blur(140px)",
          animation: "tgorb 22s ease-in-out infinite",
        }}
      />
    </div>
  );
}

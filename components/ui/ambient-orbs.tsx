"use client";

import { usePathname } from "next/navigation";

// Site-wide decorative glow layer. Case-studies and Construction pages carry
// their own accent-driven backgrounds and must not show this orb set (per
// their own reference files — Construction's second orb is amber, not blue).
// The homepage renders its own reference-exact 4-orb, all-warm-toned variant
// below instead of the default 3-orb set (which includes a blue orb the
// homepage reference explicitly avoids) — see TechGrit Homepage.dc.html
// lines 148-158 and plan.md's "Homepage ambient orbs" item.
export function AmbientOrbs() {
  const pathname = usePathname();
  if (pathname?.startsWith("/case-studies") || pathname?.startsWith("/construction")) return null;

  if (pathname === "/" || pathname?.startsWith("/blog")) {
    return (
      <div aria-hidden="true" className="bg-ambient-orbs fixed inset-0 z-0 pointer-events-none">
        <span className="absolute -top-45 -right-35 h-155 w-155 rounded-full bg-overlay-orange-18 blur-[130px] animate-[tgorb_16s_ease-in-out_infinite]" />
        <span className="absolute top-[35%] -left-55 h-140 w-140 rounded-full bg-overlay-amber-light-10 blur-[140px] animate-[tgorb_20s_ease-in-out_infinite_reverse]" />
        <span className="absolute top-[60%] -right-40 h-130 w-130 rounded-full bg-overlay-orange-11 blur-[140px] animate-[tgorb_24s_ease-in-out_infinite_reverse]" />
        <span className="absolute -bottom-50 left-[38%] h-165 w-165 rounded-full bg-overlay-orange-13 blur-[150px] animate-[tgorb_22s_ease-in-out_infinite]" />
      </div>
    );
  }

  // Webinar's own reference-exact 2-orb set (TechGrit Webinar.dc.html lines 110-113) —
  // the shared default's 3rd (amber) orb has no reference equivalent here (v2.2 FR-030b).
  if (pathname === "/webinar") {
    return (
      <div aria-hidden="true" className="bg-ambient-orbs fixed inset-0 z-0 pointer-events-none">
        <span className="absolute -top-40 -right-30 h-140 w-140 rounded-full bg-overlay-orange blur-[120px] animate-[tgorb_16s_ease-in-out_infinite]" />
        <span className="absolute top-300 -left-45 h-130 w-130 rounded-full bg-overlay-blue-soft blur-[130px] animate-[tgorb_20s_ease-in-out_infinite_reverse]" />
      </div>
    );
  }

  if (pathname?.startsWith("/contact")) {
    return (
      <div
        aria-hidden="true"
        className="bg-ambient-orbs-contact"
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
            background: "rgba(232, 119, 34, 0.13)",
            filter: "blur(120px)",
            animation: "tgorb 16s ease-in-out infinite",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: -200,
            left: -180,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "rgba(247, 183, 51, 0.10)",
            filter: "blur(140px)",
            animation: "tgorb 20s ease-in-out infinite reverse",
          }}
        />
      </div>
    );
  }

  if (pathname?.startsWith("/careers")) {
    return (
      <div
        aria-hidden="true"
        className="bg-ambient-orbs-careers"
        style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
      >
        <span
          style={{
            position: "absolute",
            top: -180,
            right: -140,
            width: 620,
            height: 620,
            borderRadius: "50%",
            background: "rgba(232, 119, 34, 0.18)",
            filter: "blur(130px)",
            animation: "tgorb 16s ease-in-out infinite",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "35%",
            left: -220,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "rgba(247, 183, 51, 0.10)",
            filter: "blur(140px)",
            animation: "tgorb 20s ease-in-out infinite reverse",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "60%",
            right: -160,
            width: 520,
            height: 520,
            borderRadius: "50%",
            background: "rgba(232, 119, 34, 0.11)",
            filter: "blur(140px)",
            animation: "tgorb 24s ease-in-out infinite reverse",
          }}
        />
        <span
          style={{
            position: "absolute",
            bottom: -200,
            left: "38%",
            width: 660,
            height: 660,
            borderRadius: "50%",
            background: "rgba(232, 119, 34, 0.13)",
            filter: "blur(150px)",
            animation: "tgorb 22s ease-in-out infinite",
          }}
        />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="bg-ambient-orbs fixed inset-0 z-0 pointer-events-none">
      <span className="absolute -top-40 -right-30 h-140 w-140 rounded-full bg-overlay-orange blur-[120px] animate-[tgorb_16s_ease-in-out_infinite]" />
      <span className="absolute top-225 -left-45 h-130 w-130 rounded-full bg-overlay-blue-soft blur-[130px] animate-[tgorb_20s_ease-in-out_infinite_reverse]" />
      <span className="absolute -bottom-40 left-[40%] h-150 w-150 rounded-full bg-overlay-amber blur-[140px] animate-[tgorb_22s_ease-in-out_infinite]" />
    </div>
  );
}

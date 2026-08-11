"use client";

import { usePathname } from "next/navigation";

// Site-wide decorative glow layer. Case-studies and Construction pages carry
// their own accent-driven backgrounds and must not show this orb set (per
// their own reference files — Construction's second orb is amber, not blue).
// Each returned variant carries an explicit `key` distinct from every other variant's key: without it,
// a client-side route change between two pages with different orb sets (e.g. Home's 3 orbs -> Services'
// 4 orbs) updates the existing <span> elements in place (same position in the tree, same element type)
// rather than replacing them, so their color/position/size snap to the new page's values instantly with
// no transition — a visible flash through every glass/backdrop-filter panel on the page, since those
// panels sample these orbs' pixels directly. The key forces a clean unmount+remount on any route change
// that switches orb sets, so the new orbs fade in via their own [data-rise]-less fixed positioning
// instead of the old orbs jumping to new values in place.
export function AmbientOrbs() {
  const pathname = usePathname();
  if (pathname?.startsWith("/case-studies") || pathname?.startsWith("/construction")) return null;

  if (pathname?.startsWith("/contact")) {
    return (
      <div
        key="contact"
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

  // Careers, About, and Services all share this identical reference-defined 4-orb set
  // (`TechGrit Careers.dc.html`/`TechGrit About.dc.html`/`TechGrit Services.dc.html` all use the same
  // top-right/mid-left/mid-right/bottom-center orange-amber-orange-orange geometry byte-for-byte).
  if (
    pathname?.startsWith("/careers") ||
    pathname?.startsWith("/about") ||
    pathname?.startsWith("/services")
  ) {
    const className = pathname.startsWith("/careers")
      ? "bg-ambient-orbs-careers"
      : pathname.startsWith("/about")
        ? "bg-ambient-orbs-about"
        : "bg-ambient-orbs-services";
    return (
      <div
        key={className}
        aria-hidden="true"
        className={className}
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
    <div
      key="default"
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

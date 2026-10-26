# Performance Optimization Plan — Lighthouse 53 → 90+

## Context

Lighthouse reports a **53/100 Performance** score on the homepage (run against `localhost:3000` dev server with Chrome extensions). The three critical bottlenecks are:

| Metric | Current | Target | Root cause |
|--------|---------|--------|------------|
| **TTFB** | 1,460 ms (score 0) | < 200 ms | `cache: "no-store"` on every CMS fetch — zero caching, 4 sequential HTTP calls per request |
| **TBT** | 1,350 ms (score 2) | < 200 ms | 30 client components, 231 `RevealOnScroll` instances each creating an IntersectionObserver, zero `next/dynamic` lazy-loading, cookie modal eagerly loaded |
| **Speed Index** | 3.3 s (score 20) | < 1.5 s | 3.5 MB hero video with no poster, `images: { unoptimized: true }` disabling all image optimization |

FCP (0.6 s) and CLS (0) are already excellent. LCP (2.0 s, score 62) will improve as a side-effect of TTFB and video fixes.

> **Note on the 100/100 target**: A perfect 100 is practically unattainable for a page with a background video, multiple CMS-sourced images, and any client-side interactivity. The realistic target is **90+** after these changes, with the remaining gap addressable only by removing the hero video entirely or switching to a static image hero. The changes below are ordered by impact — each is independently shippable.

---

## Phase 1: TTFB — CMS Caching (Biggest single win)

### Problem
`cms/api/fetcher.ts:11` uses `cache: "no-store"`, forcing a live Strapi round-trip on every single request. The homepage alone makes **4 sequential CMS calls** per request:

1. `getHomeData()` → `/api/pages/by-slug/home`
2. `getHeaderData()` → `/api/header?populate[...]`
3. `getFooterData()` → `/api/footer?populate[...]`
4. `getCookieBannerData()` → `/api/cookie?populate[...]`

Each call adds 200–500 ms, totaling ~800–2,000 ms of pure CMS wait time before SSR can begin streaming HTML. The `react.cache()` wrapper on each getter deduplicates within a single request, but does NOT cache across requests.

### Change
Replace `cache: "no-store"` with `next: { revalidate: 60 }` (ISR — serve cached page, revalidate in background every 60 seconds). This is safe for a marketing site where content changes infrequently.

### Files to change

**`cms/api/fetcher.ts`** (1 line change)

```diff
- const res = await fetch(`${CMS_API_URL}${endpoint}`, { cache: "no-store" });
+ const res = await fetch(`${CMS_API_URL}${endpoint}`, { next: { revalidate: 60 } });
```

### Impact
- TTFB drops from ~1,460 ms to ~50–100 ms on cached hits
- First request still hits Strapi; subsequent requests serve from Next.js cache for 60 s
- **Estimated score improvement: +15–25 points** (this is the single biggest win)

### Risk
- Content updates take up to 60 s to appear. Acceptable for a marketing site.
- The revalidation window is tunable — 60 s is a starting point (can be 30 s or 120 s).

---

## Phase 2: Hero Video Optimization (Speed Index + LCP)

### Problem
`app/_home-components/Hero.tsx` uses a raw `<video>` tag for the 3.5 MB `wave.mp4`:
- **No `poster` attribute** — browser shows nothing until the video decodes its first frame
- **`autoPlay` overrides `preload="metadata"`** — browser must fetch enough data to begin playback immediately
- **No WebM/AV1 alternative** — single MP4 means no modern codec savings
- **3.5 MB uncompressed** — the single largest asset, ~72% of total page weight

The hero does NOT use the lazy `AutoplayVideo` component that other sections use (which has proper `IntersectionObserver`-based lazy loading).

### Changes

#### 2a. Add a poster frame
Extract a representative frame from `wave.mp4` as a compressed JPEG (target < 50 KB) and save to `public/assets/hero/wave-poster.jpg`.

#### 2b. Compress the video
Re-encode `wave.mp4` targeting **< 1 MB** (lower bitrate, H.264 baseline profile, 720p max, 24 fps). The video is a decorative background behind two gradient overlays — fine detail doesn't matter. Optionally provide a WebM VP9 alternative via `<source>` elements for additional savings in Chrome/Firefox.

#### 2c. Defer video load
Change `preload="metadata"` to `preload="none"`. Combined with the poster, this lets the browser paint the poster immediately (improving LCP) and begin video download only when the browser is ready.

### Files to change

**`app/_home-components/Hero.tsx`** (lines 14–21)

```diff
  <video
-   src="/assets/hero/wave.mp4"
    autoPlay
    muted
    loop
    playsInline
-   preload="metadata"
+   preload="none"
+   poster="/assets/hero/wave-poster.jpg"
    className="absolute inset-0 h-full w-full object-cover object-[64%_46%]"
-  />
+  >
+    <source src="/assets/hero/wave.webm" type="video/webm" />
+    <source src="/assets/hero/wave.mp4" type="video/mp4" />
+  </video>
```

**New asset files:**
- `public/assets/hero/wave-poster.jpg` — extracted poster frame (< 50 KB)
- `public/assets/hero/wave.mp4` — re-encoded compressed version (< 1 MB)
- `public/assets/hero/wave.webm` — VP9 WebM alternative (optional, < 800 KB)

### Impact
- Speed Index improves dramatically — poster paints in < 0.5 s instead of waiting for video decode
- LCP improves from 2.0 s to ~1.0–1.5 s
- Total page weight drops by ~2.5 MB
- **Estimated score improvement: +10–15 points**

### Verification
- `npm run build && npm start` — hero video still plays with gradient overlays
- Poster displays immediately before video starts
- Visual appearance unchanged (gradients mask the lower quality)

---

## Phase 3: RevealOnScroll — Consolidate to Single Observer (TBT)

### Problem
`components/ui/reveal-on-scroll.tsx` is used **231 times across 77 files**. Each instance creates its own `IntersectionObserver` + `setTimeout` during hydration. On the homepage alone, 8–10 separate observers fire during initial load, each doing DOM manipulation (`node.style.opacity = "0"`, `node.style.transform`).

### Change
Refactor to use a **single shared IntersectionObserver** (module-level singleton) that all instances register with, instead of creating one per instance. The component's public API stays **identical** — zero changes to the 77 consumer files.

### Files to change

**`components/ui/reveal-on-scroll.tsx`** (full rewrite of internals, same export)

```tsx
"use client";

import { useEffect, useRef } from "react";

// ──── Module-level singleton observer ────
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

// ──── Component (unchanged public API) ────
export function RevealOnScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    node.style.opacity = "0";
    node.style.transform = "translateY(24px)";
    node.style.willChange = "opacity, transform";

    if (!("IntersectionObserver" in window)) {
      node.style.opacity = "1";
      node.style.transform = "none";
      return;
    }

    const reveal = () => {
      node.style.transition = "opacity .7s ease, transform .7s ease";
      node.style.opacity = "1";
      node.style.transform = "none";
      node.addEventListener("transitionend", () => {
        node.style.willChange = "auto";
      }, { once: true });
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
    <div ref={ref} style={{ backfaceVisibility: "hidden" }}>
      {children}
    </div>
  );
}
```

### Impact
- Reduces ~10 IntersectionObservers per page to **1 singleton**
- Hydration work drops proportionally
- **Estimated TBT reduction: 100–200 ms**
- Zero consumer-file changes — fully backward-compatible

---

## Phase 4: Lazy-Load Below-the-Fold Client Components (TBT)

### Problem
The project uses **zero `next/dynamic` imports** anywhere. Every client component and its full dependency tree hydrates eagerly on page load, even sections far below the fold that the user hasn't scrolled to yet.

### Change
Wrap below-the-fold client-heavy homepage sections in `next/dynamic` so their JS only loads when needed. Server-side rendering is preserved (no `ssr: false`) — only the hydration/JS is deferred.

### Files to change

**`app/page.tsx`** — replace static imports with dynamic imports for 4 below-the-fold sections:

```diff
+ import dynamic from "next/dynamic";

- import ReImagineSection from "./_home-components/ReImagineSection";
- import TestimonialsSection from "./_home-components/TestimonialsSection";
- import LifeGallery from "./_home-components/LifeGallery";
- import SubscribeBand from "./_home-components/SubscribeBand";

+ const ReImagineSection = dynamic(() => import("./_home-components/ReImagineSection"));
+ const TestimonialsSection = dynamic(() => import("./_home-components/TestimonialsSection"));
+ const LifeGallery = dynamic(() => import("./_home-components/LifeGallery"));
+ const SubscribeBand = dynamic(() => import("./_home-components/SubscribeBand"));
```

Keep above-the-fold sections (`Hero`, `TrustedClients`, `PlatformSection`) as static imports since they're needed immediately.

### Impact
- Defers hydration of ~15–20 KB of client JS until the browser is idle
- **Estimated TBT reduction: 200–400 ms**
- SSR output unchanged — the HTML is still server-rendered, only JS execution is deferred

---

## Phase 5: Lazy-Load Cookie Settings Modal (TBT)

### Problem
`CookieBannerClient.tsx` eagerly imports `CookieSettingsModal` (which imports `Modal`), adding ~5 KB of client JS to every page load. 99% of visits never open the settings modal — the banner only shows once (first visit), and the settings modal only opens on explicit click.

### Change
Dynamically import `CookieSettingsModal` so it only loads when the user clicks "Cookie Settings".

### Files to change

**`components/layout/CookieBannerClient.tsx`**

```diff
- import CookieSettingsModal from "./CookieSettingsModal";
+ import dynamic from "next/dynamic";
+ const CookieSettingsModal = dynamic(() => import("./CookieSettingsModal"), { ssr: false });
```

### Impact
- Removes ~5 KB from the critical path on every page
- **Estimated TBT reduction: 50–100 ms**
- The modal loads instantly on click (tiny component, cached by the browser after first load)

---

## Phase 6: Dynamic-Import AmbientOrbs (TBT)

### Problem
`components/ui/ambient-orbs.tsx` is `"use client"` solely because it calls `usePathname()` from `next/navigation`. It renders pure decorative `<span>` elements with no interactivity. This forces the `next/navigation` client runtime onto every page for a purely cosmetic effect.

Next.js root layouts cannot access the current pathname server-side, so converting to a full server component isn't possible. But we can defer its hydration.

### Change
Dynamically import AmbientOrbs with `ssr: false` so it doesn't block initial hydration. The orbs will appear after hydration (a decorative fade-in is acceptable).

### Files to change

**`app/layout.tsx`**

```diff
- import { AmbientOrbs } from "@/components/ui/ambient-orbs";
+ import dynamic from "next/dynamic";
+ const AmbientOrbs = dynamic(
+   () => import("@/components/ui/ambient-orbs").then((m) => ({ default: m.AmbientOrbs })),
+   { ssr: false },
+ );
```

### Impact
- Removes AmbientOrbs from the SSR critical path and defers hydration
- Removes `next/navigation` import from the initial bundle
- **Estimated TBT reduction: 30–50 ms**

---

## Phase 7: AnimatedStat — Ref-Based DOM Updates (TBT)

### Problem
`components/ui/AnimatedStat.tsx` calls `setState()` on every `requestAnimationFrame` during its 1,100 ms count-up animation — ~66 React re-renders per stat counter. With 4 stats in the hero (above the fold), that's **~264 React re-renders** during initial load.

### Change
Switch to ref-based direct DOM mutation (same pattern `RevealOnScroll` already uses successfully). Display the target value in the initial server render (SSR-safe), then animate client-side via `textContent`.

### Files to change

**`components/ui/AnimatedStat.tsx`**

```tsx
"use client";

import { useEffect, useRef } from "react";

type AnimatedStatProps = {
  target: number;
  durationMs?: number;
};

export default function AnimatedStat({ target, durationMs = 1100 }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !("IntersectionObserver" in window)) return;

    // Start from 0 on the client
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

    const safety = setTimeout(() => { node.textContent = String(target); }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(safety);
    };
  }, [target, durationMs]);

  // SSR: render target value (visible before hydration), client animates from 0
  return <span ref={ref}>{target}</span>;
}
```

### Impact
- Eliminates ~264 React re-renders during hero animation
- **Estimated TBT reduction: 30–50 ms**
- SSR now shows the final stat values (better than showing "0" before JS loads)

---

## Phase 8: Enable Next.js Image Optimization (Page weight)

### Problem
`next.config.ts` has `images: { unoptimized: true }`, disabling **all** automatic image resizing, WebP/AVIF conversion, and quality reduction. Every `<Image>` component serves the original file at full resolution. This was likely set when the site used `output: "export"` (which doesn't support image optimization), but the site is now `output: "standalone"` where optimization works.

### Change
Remove `unoptimized: true` and configure `remotePatterns` for the CMS domain so CMS-sourced images are also optimized.

### Files to change

**`next.config.ts`**

```diff
  images: {
-   unoptimized: true,
+   remotePatterns: [
+     {
+       protocol: "https",
+       hostname: "**.techgrit.com",
+     },
+     {
+       protocol: "http",
+       hostname: "localhost",
+     },
+   ],
  },
```

> **Note**: The exact CMS hostname needs to be confirmed. If Strapi serves images from `cms.techgrit.com` or a subdomain, pin to that. The `**` wildcard covers all subdomains.

### Impact
- All images auto-converted to WebP at appropriate sizes
- Could reduce total image payload by 40–60%
- **Significant Speed Index improvement**
- Production build requires `sharp` (auto-installed by `npm ci` in standalone mode)

### Risk
- Needs testing: verify that `sharp` is available in the production environment
- CMS image URLs must match `remotePatterns` — test with the actual Strapi domain
- If any issues arise, this phase can be reverted independently

---

## Summary: Expected Impact

| Phase | Metric improved | Estimated gain | Effort | Files changed |
|-------|----------------|----------------|--------|---------------|
| 1. CMS Caching | TTFB | -1,300 ms | 1 line | `fetcher.ts` |
| 2. Hero Video | SI, LCP | -2 s SI, -0.5 s LCP | Small | `Hero.tsx` + assets |
| 3. RevealOnScroll singleton | TBT | -100–200 ms | Medium | `reveal-on-scroll.tsx` |
| 4. Dynamic imports (homepage) | TBT | -200–400 ms | Small | `page.tsx` |
| 5. Lazy cookie modal | TBT | -50–100 ms | 1 line | `CookieBannerClient.tsx` |
| 6. AmbientOrbs dynamic | TBT | -30–50 ms | 1 line | `layout.tsx` |
| 7. AnimatedStat ref-based | TBT | -30–50 ms | Small | `AnimatedStat.tsx` |
| 8. Image optimization | SI, weight | -40–60% images | 1 block | `next.config.ts` |

**Total files changed**: 7–8 source files + 1–2 new asset files.
**Zero consumer-facing API breakage.** Every phase is independently shippable and testable.

---

## Verification Plan

After **each phase**, run this sequence:

1. **Build gate**: `npm run build` — must succeed (pre-commit hook enforces this)
2. **Production server**: `npm run start` — run the production build locally
3. **Lighthouse audit**: Chrome incognito (no extensions) → DevTools → Lighthouse → Performance only → against `localhost:3000`
4. **Compare**: Check metric values against the baseline table at the top of this document
5. **Visual regression**: Hero video plays, scroll reveals animate, cookie banner works, nav mega-menus work, ambient orbs display

**Final validation**: After all 8 phases, run a full Lighthouse audit (Performance + Accessibility + Best Practices + SEO) in incognito against the production build. Target: **90+ Performance**.

---

## What This Does NOT Change

- No route additions or removals
- No CMS schema changes
- No deployment pipeline changes
- No dependency additions (all changes use existing Next.js built-in features)
- No visual design changes (all animations/effects preserved, just optimized)
- No consumer-facing API changes to any shared component

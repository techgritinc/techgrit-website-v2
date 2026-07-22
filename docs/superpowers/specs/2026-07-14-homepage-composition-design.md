# Design: Homepage Composition & Site Structure Convention (TMS-62)

**Date**: 2026-07-14
**Related**: `specs/TMS-62/spec.md` (feature spec), `specs/TMS-63/` (Header/Footer precedent)
**Status**: Approved — ready for implementation planning

## Context

TMS-62 replaces the current `app/page.tsx` (a style-guide/test page) with the real homepage,
translated from `TechGrit Homepage.dc.html`, covering ten content sections. The shared Header/Footer
already exist (TMS-63) and are unchanged. This design resolves the open architectural questions
raised while planning TMS-62: where the homepage lives, how its sections are organized, how its
reusable UI primitives are structured, and what convention future pages (Industries/Construction,
Resources/Webinar/Case Studies, Blog, About, Contact, etc.) should follow so this work doesn't need
rework later.

Ground truth for future routes comes from what TMS-63 already committed to in
`components/layout/nav-config.ts` / `footer-config.ts` — not invented here: `/`, `/services`,
`/construction`, `/#industries` (FinTech/Healthcare stay homepage anchors, not separate routes),
`/webinar`, `/case-studies` (+ likely `/case-studies/[slug]`), `/blog` (+ likely `/blog/[slug]`),
`/about`, `/careers`, `/contact`, `/startups`, `/privacy`, `/terms`, `/disclaimer`. None of these
non-home routes are built by TMS-62 — per the constitution, routes are not pre-scaffolded before
their own feature ships. This design only fixes the *convention* those future features should reuse.

## Decisions

### 1. Homepage stays at root `/`

`app/page.tsx` remains the homepage's route (URL `/`). No redirect or route move — this matches
every existing assumption in the codebase (Header's logo links to `/`, TMS-63's spec calls `/` "the
homepage").

### 2. Homepage sections live in `components/home/`

A new top-level directory, sibling to `components/layout/`, at the same flat depth:

```
components/
├── layout/                    # UNCHANGED (TMS-63), except icons.tsx moves out (see §4)
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── nav-config.ts
│   └── footer-config.ts
├── ui/                        # NEW — generic, reusable primitives (see §3)
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── FormField.tsx
│   └── icons.tsx              # MOVED from components/layout/icons.tsx (see §4)
└── home/                      # NEW — homepage-only, sibling of layout/
    ├── home-data.ts           # Static typed content (see §5)
    ├── Hero.tsx
    ├── SubscribeBand.tsx
    ├── PlatformSection.tsx
    ├── MethodologySection.tsx   # "use client"
    ├── ReImagineSection.tsx
    ├── IndustriesSection.tsx
    ├── TestimonialsSection.tsx  # "use client"
    ├── CaseStudiesSection.tsx
    ├── LifeGallery.tsx
    └── FinalCta.tsx
```

`app/page.tsx` stays a Server Component and renders the ten sections as an explicit, ordered JSX
list inside `<main>` — no data-driven `.map()` over a component array (nothing here needs dynamic
reordering/toggling, so that indirection would be premature). Only `MethodologySection.tsx` and
`TestimonialsSection.tsx` carry `"use client"` (they're the only two with real interactive state);
every other section, and `page.tsx` itself, stays a Server Component — smallest possible client
bundle, same posture TMS-63 used for Header/Footer.

### 3. Site-wide convention for future routes: flat `components/<route>/` per page

When a future feature builds e.g. `/construction`, `/webinar`, `/case-studies`, `/blog`, `/about`,
it should follow the exact same shape as `components/home/`: a thin `app/<route>/page.tsx` (Server
Component, composes that page's sections) + a sibling `components/<route>/` folder holding that
page's own section components and its own `<route>-data.ts`. Each route owns fully disjoint files,
so pages ship independently.

Rejected: Next.js route groups (`app/(marketing)/...`) — only pay off if different site sections
need genuinely different shared layouts, which nothing here currently requires (Header/Footer are
global via the root layout). Rejected: a shared `components/pages/<route>/` umbrella namespace —
pre-builds multi-page structure before a second consumer justifies it.

**SEO conventions for future routes** (to carry forward, not built by TMS-62):
- Each route exports its own `metadata` (or `generateMetadata` for `[slug]` routes), same pattern
  `app/layout.tsx` already uses at the root.
- Pages stay Server Components by default; `"use client"` only around narrow interactive slices
  (forms, carousels), matching the homepage's approach.
- `app/sitemap.ts` / `app/robots.ts` once a few routes exist, instead of a hand-maintained sitemap.
- `generateStaticParams` for `/case-studies/[slug]` and `/blog/[slug]`.

### 4. Reusable UI primitives: `components/ui/`, Tailwind-first, not `globals.css` classes

`components/ui/Button.tsx`, `Badge.tsx`, `FormField.tsx` are new, generic, reusable components:

- **Button**: props `variant: "primary" | "ghost" | "outline"`, `size: "sm" | "md" | "lg"`,
  `as: "button" | "a"`. All spacing/layout/radius/hover-transform styling is written directly as
  Tailwind utility classes inside the component (not `.btn`/`.btn-primary` from `globals.css`).
  Colors/shadows still resolve through `tokens.css` custom properties via Tailwind's arbitrary-value
  syntax (e.g. `shadow-[var(--shadow-btn-primary)]`) — `tokens.css`/`globals.css` remain the single
  source of truth for color/shadow/font/spacing *values*; Tailwind, written per-component, owns
  layout/spacing *usage*. No new classes are added to `globals.css` for this feature's components.
- **Badge**: props `tone: "orange" | "glass" | "blue" | "teal"`, same approach.
- **FormField**: props `label`, `type: "text" | "email"`, `error?: string`; wraps a Tailwind-styled
  `<input>` with an inline error slot.

**Icons live in `components/ui/icons.tsx`**, not `components/layout/icons.tsx`. The file already
exists (from TMS-63) but is relocated: icons are generic, cross-cutting primitives — the same
category as Button/Badge/FormField — not layout-specific, and `components/ui/` is now the correct
home for that category. This is a pure move (mechanical import-path fix in `Header.tsx`/
`Footer.tsx`, from `@/components/layout/icons` to `@/components/ui/icons`); no behavioral change.
Every new homepage icon (arrow-right, checkmark, close/X, play, star, scroll-cue chevron, drag-hint
chevron, plus one each for the platform capabilities, differentiators, and FinTech/Healthcare/
Construction) is added to this same single file — one consolidated icon collection app-wide.

### 5. Data flow: one static content module per page

`components/home/home-data.ts` exports typed static arrays, each consumed by exactly the section(s)
that need it (mirrors `nav-config.ts`/`footer-config.ts` sitting next to their components):

| Export | Consumed by |
|---|---|
| `DELIVERY_STATS`, `TRUSTED_CLIENT_LOGOS` | `Hero.tsx` |
| `PLATFORM_CAPABILITIES` | `PlatformSection.tsx` |
| `METHODOLOGY_PHASES` | `MethodologySection.tsx` |
| `DIFFERENTIATORS`, `COMPARISON_METRICS` | `ReImagineSection.tsx` |
| `INDUSTRY_CARDS` | `IndustriesSection.tsx` |
| `TESTIMONIALS` | `TestimonialsSection.tsx` |
| `CASE_STUDIES` | `CaseStudiesSection.tsx` |
| `CULTURE_GALLERY_IMAGES` | `LifeGallery.tsx` |

Real assets already exist in `public/` and are used directly via `next/image`:
- `public/logos/*` — all 6 client logos
- `public/assets/hero/wave.mp4` — hero background video
- `public/samples/ind-{fintech,healthcare,construction}.png` — industry imagery
- `public/assets/team/{glasses,rooftop,painting,diwali}.png` — culture gallery

**Fallback rule**: every image-bearing entity's image field is optional; when absent, the
component renders **"Coming soon"** text in that image's slot (not a gradient/placeholder block) —
applies uniformly to client logos, industry cards, and gallery images, so a future item added
without its asset yet doesn't break the layout.

### 6. Section behavior notes

- **`MethodologySection.tsx`**: `useRef` on the scroll track, a scroll/resize listener
  (`useEffect`, cleaned up on unmount) computing scroll progress → `activeIndex` via `useState`,
  clamped to `[0, phases.length - 1]` so it always resolves to exactly one valid phase. Clicking a
  phase tab sets `activeIndex` directly. The panel toggles `absolute`/`fixed`/`absolute` positioning
  exactly as the reference does, via plain style writes off React state — not a `DCLogic` lifecycle
  class.
- **`TestimonialsSection.tsx`**: native `overflow-x-auto` + `scroll-snap-type: x proximity` track,
  drag-to-scroll via `pointerdown`/`pointermove`/`pointerup`. `openIndex: number | null` drives the
  video lightbox (conditional fixed-position overlay); closes via backdrop click, close button, or
  **Escape** (keyboard support the reference itself lacks). A testimonial with no `videoUrl` shows
  the lightbox's no-video fallback state.
- **`SubscribeBand.tsx`**: local `status: "idle" | "error" | "success"` state only, no network call.
  Validates name (non-empty) + email (basic pattern) client-side.
- **Reduced motion**: ambient/reveal/count-up/shimmer effects use the existing `tg*` keyframes,
  gated behind `@media (prefers-reduced-motion: no-preference)`; all content renders in its final
  visible state in markup regardless of whether the animation runs.

## Error Handling & Edge Cases

- Subscribe form: invalid/missing email or empty name → inline error via `FormField`; `status`
  never flips to `"success"`.
- Video testimonial with no `videoUrl` → lightbox's no-video fallback state, not a broken player.
- Missing image asset (any of the three image-bearing entities) → "Coming soon" text in the image's
  slot; layout space is still reserved.
- Methodology scroll progress is clamped — always exactly one valid active phase, never
  null/undefined/between two.
- Reduced motion / JS unavailable → all content is present and usable in markup; animation is
  additive, never gating.
- Keyboard-only use → every button/link/field/tab/testimonial card/lightbox-close reachable with a
  visible focus ring; lightbox additionally closes on Escape.
- Narrow viewports (<360px) / zoom → sections reflow per the existing 1140/960/560 breakpoint
  contract; no horizontal scroll, no clipped content.

## Testing / Verification

No automated test framework exists in this repository (confirmed gap, unchanged from TMS-63) — no
test tasks are introduced. Verification is manual: `npm run dev`, walk through all ten sections
against `specs/TMS-62/spec.md`'s acceptance scenarios and `specs/TMS-62/quickstart.md`; responsive
pass at 1140/960/560/~360px; reduced-motion pass; keyboard-only tab-through; `npm run lint && npm
run build` must both pass clean (existing Husky pre-commit gate).

## Follow-up

- `.specify/memory/constitution.md`'s "Additional Constraints" section should be amended after this
  feature lands to record `components/ui/` and `components/home/`, mirroring how TMS-63 itself was
  recorded (Principle III currently only documents `.btn`/`.badge`/`.card` utility classes as the
  centralized styling approach; this feature's Tailwind-first primitives are a deliberate,
  documented departure for new component work and should be reflected there too).
- `specs/TMS-62/plan.md`/`research.md`/`data-model.md`/`tasks.md` (started under the `/speckit.plan`
  workflow before this design session) should be regenerated to match the decisions in this
  document before implementation begins.

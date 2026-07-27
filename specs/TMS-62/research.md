# Phase 0 Research: Homepage Content Sections

All items in `plan.md`'s Technical Context were resolvable from the existing codebase (TMS-63
precedent, `app/globals.css`/`tokens.css`, `public/` assets) and the feature spec's Clarifications —
no `NEEDS CLARIFICATION` markers remain. This document records the non-obvious *how* decisions
needed to translate `TechGrit Homepage.dc.html` into production React, per Constitution Principle IV.

## 1. Scroll-pinned methodology stepper

- **Decision**: Reimplement as a Client Component using `useRef` on the tall track element, a
  `scroll`/`resize` listener (added in `useEffect`, removed on cleanup) that computes progress
  through the track and derives an `activePhase` index via `useState`, and toggles the panel's
  position between `absolute` (top-rest), `fixed` (pinned), and `absolute` (bottom-rest) exactly as
  the reference does — but as plain DOM style writes driven by React state/refs, not a `DCLogic`
  `componentDidMount` method.
- **Rationale**: The reference's own code comments explain *why* it uses `position:fixed` instead
  of transform-chasing (compositor-held, no per-frame JS, robust to backgrounded tabs) — that
  behavioral intent is preserved (Principle IV), only the class-component/`DCLogic` mechanism is
  replaced with hooks. Selecting a phase tab directly sets `activePhase` and (per FR-006) does not
  need to also fight the scroll listener, since the listener only fires on scroll, not on click.
- **Alternatives considered**: A scroll-linked animation library (e.g. Framer Motion's
  `useScroll`) — rejected; no such dependency exists in `package.json` today and adding one for a
  single section contradicts the lean, no-extra-dependency posture already established (no test
  framework, no Prettier, minimal deps). A simpler "tabs only, no scroll-pin" fallback was
  considered but rejected because FR-006 and the spec's edge case explicitly require scroll-driven
  advancement, not just click-driven.

## 2. Testimonials carousel + video lightbox

- **Decision**: Native horizontal scroll container (`overflow-x: auto`, `scroll-snap-type: x
  proximity`) with pointer-drag-to-scroll implemented via `pointerdown`/`pointermove`/`pointerup`
  handlers on a `ref`, matching the reference's `data-testi-track` behavior. The video lightbox is
  a conditionally-rendered fixed-position overlay driven by `useState<number | null>` for "which
  testimonial is open," closed by backdrop click, a close button, or Escape key (added for
  keyboard operability per FR-018, which the reference does not itself handle).
- **Rationale**: No carousel/lightbox library exists in dependencies; the reference's own
  interaction (native scroll-snap + drag) is simple enough to reimplement directly, keeping the
  dependency footprint unchanged (consistent with TMS-63's decisions).
- **Alternatives considered**: A carousel library (e.g. embla-carousel) — rejected as an
  unnecessary new dependency for a single section. A modal library for the lightbox — rejected for
  the same reason; a fixed-position conditional render matches the reference exactly and is
  trivial to make keyboard-accessible without a dependency.

## 3. Subscribe form behavior

- **Decision**: Local component state only (`idle | error | success`), matching Clarification #1 —
  on submit, validate name (non-empty) and email (basic pattern) client-side; on failure, set
  `error` state and render an inline message; on success, set `success` state and swap the form for
  a confirmation panel. No `fetch`/API call is made.
- **Rationale**: Directly implements the spec's Clarifications (subscribe form is client-side only;
  no consent checkbox required) and FR-003 as amended.
- **Alternatives considered**: Wiring to a real email/CRM endpoint — explicitly rejected per
  Clarification #1 as out of scope for this feature.

## 4. Reusable UI primitives: Tailwind-first, not existing utility classes

- **Decision**: `components/ui/Button.tsx`, `Badge.tsx`, and `FormField.tsx` are components whose
  layout/spacing/radius/hover styling is written as Tailwind utility classes directly in the
  component (per prop-driven `variant`/`size`/`tone`), not by applying `globals.css`'s `.btn*`/
  `.badge*`/`.field` classes. Color/shadow values still resolve through `tokens.css` custom
  properties via Tailwind's arbitrary-value syntax (e.g. `shadow-[var(--shadow-btn-primary)]`).
- **Rationale**: Explicit stakeholder direction (recorded in
  `docs/superpowers/specs/2026-07-14-homepage-composition-design.md`): the existing `.btn`/`.badge`
  classes are not the desired foundation for new component work; `tokens.css`/`globals.css` should
  stay the source of token *values* only, while padding/margin/layout is configured per-component
  via Tailwind. This is a deliberate, recorded deviation from Principle III as currently written —
  see plan.md's Constitution Check and Complexity Tracking.
- **Alternatives considered**: Wrapping the existing `.btn*`/`.badge*`/`.field` classes (the
  original plan) — superseded by the explicit direction above. Continuing to use raw
  `className="btn btn-primary"` strings inline per section (the current `app/page.tsx` style-guide's
  pattern) — also rejected, since it's exactly what the feature request asked to stop doing.

## 5. Icon consolidation and location

- **Decision**: Add every new SVG icon this feature needs (arrow-right, checkmark, close/X, play,
  star, scroll-cue chevron-down, drag-hint chevron, and one icon each for: autonomous-agents,
  prompt-to-production, self-healing, copilot-to-agentic, eradicate-debt, infinite-scalability,
  FinTech, Healthcare, Construction) to a single relocated icon file, `components/ui/icons.tsx` —
  moved from `components/layout/icons.tsx` (where TMS-63 first created it), alongside the
  Chevron/Hamburger/LinkedIn/YouTube/Mail/Phone icons already there. `Header.tsx`/`Footer.tsx`'s
  import paths are updated accordingly; no icon behavior changes.
- **Rationale**: FR-016 requires one consolidated icon collection. Icons are generic, cross-cutting
  primitives — the same category as Button/Badge/FormField — so `components/ui/` (introduced by
  this feature specifically for that category) is a more accurate home than `components/layout/`,
  which is otherwise scoped to header/footer chrome. Relocating (rather than leaving it split
  across two files) keeps "one consolidated icon collection" literally true.
- **Alternatives considered**: Leaving `icons.tsx` in `components/layout/` and just extending it —
  rejected on review since it would leave a generic primitive filed under a folder that's otherwise
  exclusively header/footer-specific, once `components/ui/` exists as the correct semantic home. A
  new, separate icon file scoped to the homepage — rejected; it would directly contradict FR-016's
  "one consolidated icon collection" by creating two files instead of one.

## 6. Image/video assets

- **Decision**: All referenced imagery/video now exist in `public/`: client logos under
  `public/logos/*` (all 6), the hero background video at `public/assets/hero/wave.mp4`, industry
  imagery at `public/samples/ind-{fintech,healthcare,construction}.png`, and culture-gallery imagery
  at `public/assets/team/{glasses,rooftop,painting,diwali}.png`. Every image-bearing entity's type
  still keeps its image field optional; when absent, the consuming component renders **"Coming
  soon"** text in that image's slot (not a gradient/placeholder block, superseding the earlier
  plan draft) rather than a broken `next/image` reference.
- **Rationale**: The assets were supplied after the initial research pass (see plan.md's note that
  this document was revised); using them directly via `next/image` matches Header/Footer's existing
  pattern. The "Coming soon" text fallback remains as a resilience rule per explicit stakeholder
  direction, uniformly for client logos, industry cards, and gallery images, so a future item added
  without its asset yet degrades gracefully instead of breaking layout.
- **Alternatives considered**: A gradient/tinted placeholder panel (the original plan, written when
  these assets didn't yet exist in the repo) — superseded now that real assets are present, and
  replaced as the *fallback* mechanism per the stakeholder's explicit "Coming soon" text instruction.

## 7. No API contracts

- **Decision**: No `contracts/` directory is generated.
- **Rationale**: Every section renders static, in-repo content (`app/home-data.ts`); the only
  "submission" (the subscribe form) is explicitly client-side only per Clarification #1. There is no
  server endpoint or data-fetch contract to define, identical to TMS-63's reasoning.

## 8. Decorative motion and reduced motion (FR-020)

- **Decision**: Ambient/reveal/count-up/shimmer animations are implemented as CSS using the
  existing `tg*`-prefixed keyframes (Principle III), applied via a class, and are additionally
  gated behind `@media (prefers-reduced-motion: no-preference)` so they simply don't run — rather
  than being skipped via JS feature-detection — when a visitor prefers reduced motion. All content
  and controls are rendered in their final state in the markup regardless (no opacity:0 that only
  JS clears), so nothing depends on the animation completing to become visible or usable.
- **Rationale**: Directly satisfies FR-020 and the spec's reduced-motion edge case with a
  standard, dependency-free CSS mechanism already compatible with the existing `tg*` keyframe
  library.
- **Alternatives considered**: JS-driven `matchMedia('(prefers-reduced-motion)')` checks before
  attaching `IntersectionObserver` reveal behavior (closer to the reference's own
  `revealAnimations` prop) — kept as a secondary guard for the scroll-reveal-on-first-view effect
  specifically (since that one is JS-driven, not pure CSS), but the CSS media query remains the
  primary, simpler mechanism for the rest.

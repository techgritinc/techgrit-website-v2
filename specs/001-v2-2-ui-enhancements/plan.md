# Implementation Plan: TMS-V2.2-Enhancements — Phase 1: Shared Foundation

**Branch**: `001-v2-2-ui-enhancements` | **Date**: 2026-08-03 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/001-v2-2-ui-enhancements/spec.md`

**Scope note**: This plan covers **exactly 4 deliverables** and nothing else — no consumer `.tsx`
files migrate to the updated primitives, no `globals.css` vanilla classes are touched, and no
other page-specific v2.2 work (the other 8 user stories) is planned here.

## Summary

1. **`components/ui/Button.tsx`** — update the `ghost` variant to the reference's white-gradient
   glass pill + lift-on-hover (new tokens, Principle I; hover brighten deliberately dropped, see research.md §1).
2. **`components/ui/section-eyebrow.tsx`** — add an optional `showAccent` prop (default
   `true`) so a caller can render the eyebrow with no leading dash.
3. **New `components/ui/FilterBar.tsx`** — a dark, sticky, labeled shell for filter chips.
4. **`app/_home-components/LifeGallery.tsx`** — add an "Inside TechGrit" `Badge` to its `careers`
   variant (FR-038) and the two action buttons its `home` variant needs (FR-011).

**Also**: `reusable-components/` (4 files: `section-eyebrow.tsx`, `final-cta.tsx`,
`ambient-orbs.tsx`, `reveal-on-scroll.tsx`) is retired — all 4 move into `components/ui/`, the
constitution's already-documented shared-primitive location, and all 23 consuming files' imports
are updated to match. Pure relocation; no behavior change to any of the 4 files.

Nothing else changes. Existing consumers of `.btn-ghost`, the inline eyebrow-dash pattern, or
`LifeGallery`'s current markup outside the 2 additions above are untouched and keep rendering
exactly as today.

## Technical Context

**Language/Version**: TypeScript 5 (strict) · **Primary Dependencies**: Next.js 16.2.10, React
19.2.4, Tailwind CSS v4 · **Storage**: N/A · **Testing**: N/A (no test framework in this repo;
manual verification, see `quickstart.md`) · **Target Platform**: Web · **Project Type**: single
Next.js App Router app · **Performance Goals**: N/A (CSS-only changes) · **Constraints**: no new
libraries; zero visual change to any file not in the 4-item list above · **Scale/Scope**: 4
existing files edited (`Button.tsx`, `section-eyebrow.tsx`, `LifeGallery.tsx`, `tokens.css`) + 1
new file created (`FilterBar.tsx`) + `globals.css`'s new `@theme inline` token mappings; separately,
4 files relocated `reusable-components/` → `components/ui/` with 23 import updates, 0 behavior
change; 0 page consumers migrated onto the updated primitives.

## Constitution Check

*GATE: before Phase 0 and re-checked after Phase 1.*

- **I (Token-Only Styling)** — PASS. New ghost-button tokens defined in research.md before any
  component edit; no hardcoded literals.
- **II (Breakpoints)** — PASS, not applicable.
- **III (Component Library)** — PASS. Both edited primitives (`Button.tsx`, `SectionEyebrow`)
  already exist; this plan extends them with optional props, it doesn't fork or duplicate them.
- **IV (References Are Visual Truth)** — PASS. Ghost-button values read directly from
  `TechGrit Homepage.dc.html` (lines 329, 584) and `TechGrit Construction.dc.html` — byte-identical.
- **V (Dark-First Brand)** — PASS. Ghost button stays a translucent glass effect, not a new fill;
  accent usage on the new badge stays sparing.
- **VI (frontend-design skill)** — PASS, invoked; see UI Design Approach.
- No violations — Complexity Tracking is empty.

## UI Design Approach

**UI mode**: ON (Next.js/React tech signal + spec.md content signal).

**`frontend-design` skill invocation**: asked for craft guidance on these 4 primitive edits.
Takeaways applied: the ghost button's inset top highlight and lift-on-hover are kept exactly
as the reference specifies (the detail that makes it read as glass, not flat gray; the hover brighten was deliberately dropped, see research.md §1); the eyebrow's
`showAccent={false}` path relies on the label's existing weight/spacing to stand alone rather than
adding a replacement ornament; `FilterBar` reuses the app's existing dark-glass card language;
the "Inside TechGrit" badge uses the orange accent sparingly, per Principle V.

**Reconciliation with Principles I–V**: none needed — the skill's guidance already matched Principle
IV (execute the reference precisely) and V (accent stays sparing, never a fill).

**Anchor files**: `components/ui/Button.tsx`, `components/ui/section-eyebrow.tsx`,
`components/ui/FilterBar.tsx` (new), `app/_home-components/LifeGallery.tsx`, `app/tokens.css`,
`app/globals.css` (new `@theme inline` token mappings only). Plus the 4 relocated files now living
in `components/ui/` (`section-eyebrow.tsx`, `final-cta.tsx`, `ambient-orbs.tsx`,
`reveal-on-scroll.tsx`).

## Project Structure

```text
components/ui/
├── Button.tsx           # ghost variant — new tokens/classes
├── FilterBar.tsx         # NEW — dark/sticky/labeled shell
├── section-eyebrow.tsx   # moved from reusable-components/ + optional showAccent prop
├── final-cta.tsx         # moved from reusable-components/ — no behavior change
├── ambient-orbs.tsx      # moved from reusable-components/ — no behavior change
└── reveal-on-scroll.tsx  # moved from reusable-components/ — no behavior change

app/_home-components/
└── LifeGallery.tsx       # + "Inside TechGrit" badge (careers), + 2 action buttons (home)

app/tokens.css             # + 6 ghost-button tokens (research.md)
app/globals.css            # + matching @theme inline entries for those 6 tokens
```

`reusable-components/` no longer exists — all 4 of its files relocated above; 23 consumer files'
imports updated to `@/components/ui/...` (mechanical path change, no behavior change).

No `data-model.md`/`contracts/` (presentation-only). No other file is touched.

**Structure Decision**: existing single-project structure. `FilterBar` goes in `components/ui/`
since it's a generic, cross-route primitive per Constitution's existing rule — and the 4
`reusable-components/` files consolidate into that same, already-documented location for the same
reason, removing the undocumented third shared-primitive folder.

## Complexity Tracking

*Empty — no violations.*

## Post-Design Constitution Re-Check

Research (Phase 0) confirmed exact token values and the `FilterBar` location before any file
changed. No new violations. Gate: PASS.

---

# Implementation Plan Addendum — Phase 2: Homepage Hero & Trusted Clients

**Date**: 2026-08-04 | **Spec**: [spec.md](./spec.md), User Story 1 (Home Page brought to reference
fidelity), scoped to **only** FR-001 through FR-004

**Scope note**: this addendum covers **only** the Homepage Hero section and extracting the
 "Trusted by our clients" strip into its own section — the narrowest possible slice of User Story 1.
It does **not** cover the subscribe row (FR-005), "How We Deliver", "Don't Migrate/Re-Imagine", 
Construction card, Testimonials, Blog teaser, Life at TechGrit, or the final CTA — all still-open 
pieces of US1 remain unplanned. Phase 1 above (shared-primitive foundation) is unaffected by this addendum 
and stays complete as documented.

## Summary

1. **`app/_home-components/Hero.tsx`** — remove the second "AI-First Software Development Partner"
   badge (FR-001, no reference equivalent), remove the clickable "Scroll" chevron affordance
   (FR-002), widen the content column to the reference's `780px` while keeping its left-aligned
   layout exactly as the reference shows it (FR-002, reversed from the original addendum's
   center-everything decision — see research.md §5), remove the h1's diverging
   `leading-[0.99]` override so it inherits the already-correct shared `--text-h1`/`--lh-tight`
   sizing (FR-002a), add the h1's own `margin-top:22px` (previously missing, so the badge-to-headline
   gap read as 16px instead of the reference's combined 38px) while keeping the hero's side padding
   as the reference's flat, non-responsive `36px` (research.md §6b — the mobile 3-line headline wrap
   this raised is a separate, still-open font-size-vs-content-length question, not a padding fix),
   rebuild the top "Live Webinar" badge — now via `components/ui/Badge.tsx` (item 7 below), not
   bespoke markup — with the reference's exact sizing plus a
   live green dot and ripple ring (FR-003a, new — the badge has no dot/ripple today), fix the
   stat/metrics display's font-size/letter-spacing and add the reference's per-segment
   suffix color/size split ("X"/" weeks" render independently from their digits — FR-003; the
   ghost button half of FR-003 is already satisfied by Phase 1's `Button.tsx` update), and remove
   the nested "Trusted by our clients" block (moved out, FR-004).
2. **New `app/_home-components/TrustedClients.tsx`** — the "Trusted by our clients" strip as its
   own section, reusing `TRUSTED_CLIENT_LOGOS` from `home-data.ts`, keeping its **current** white
   logo-card visual treatment unchanged (the reference's own grayscale/brighten-on-hover treatment
   is explicitly not adopted — see research.md §8), with genuine runtime overflow detection
   (`ResizeObserver`, not a fixed breakpoint) driving whether the strip scrolls or displays
   statically, so it stays correct if the logo count grows (FR-004).
3. **`app/_home-components/home-data.ts`** — add an optional `suffixClassName?: string` field to
   `DeliveryStat` so each stat's suffix ("X" / " weeks") carries its own color/size independent of
   its digit (FR-003). **Also** (Principle III, landed ahead of the rest of this addendum since it
   touches this same file): both `DeliveryStat` and `TrustedClientLogo` gain a required `id` field;
   `Hero.tsx`'s stat-row key already switched from `stat.label` to `stat.id`, and `TrustedClients.tsx`
   (item 2 below) keys its logos on `logo.id`, not `logo.alt` — neither type's previous shape had a
   stable, content-independent identity field, and both were keyed on display text.
4. **`app/page.tsx`** — render `<TrustedClients />` between `<Hero />` and `<SubscribeBand />`.
5. **`app/tokens.css`** — add the stat-suffix, badge, and label/border tokens this needs (see
   research.md addendum §§7-9), with matching `@theme inline` entries in `app/globals.css` where a
   bare Tailwind utility consumes them. **Dropped from the original addendum**: the two
   grayscale-filter logo tokens (`--filter-logo-rest`/`--filter-logo-hover`) — not added, per the
   styling-treatment reversal above.
6. **`app/globals.css`** — add the new `tgLiveRipple` keyframe (research.md §9) for the Live-Webinar
   badge's ripple ring, following the existing `tg`-prefix animation convention. **Also**: remove
   the legacy `h1 { font-size: 44px; }` rule from inside `@media (min-width: 960px)` (FR-045,
   research.md §10) — a dead, pre-v2-migration rule that was unconditionally overriding every
   page's token-driven h1 size at desktop widths, discovered while verifying FR-002a. Its sibling
   rules in the same media block (`.section`, `.glass-card:not(.glass-card-md)`) are untouched.
7. **`components/ui/Badge.tsx`** — add a `size?: "sm" | "lg"` prop (default `"sm"`, a non-breaking
   extraction of the component's existing sizing) and a `tone: "live"` (research.md §9, revised).
   `Hero.tsx`'s inner chip renders as `<Badge tone="live" size="lg">` instead of a bespoke `<span>`,
   per direct instruction that the hero's badge must go through the shared primitive, mandatorily,
   with zero pixel change — verified via computed-style diff against the pre-refactor markup.

Nothing else changes. `SubscribeBand.tsx` and every other homepage section are untouched. One
sitewide exception is FR-045 above — its removal affects every page's `h1`, not just Home's, since
the rule it deletes was never Hero-specific; see research.md §10 for the scope justification.

## Technical Context (addendum)

**Language/Version**: TypeScript 5 (strict) · **Primary Dependencies**: Next.js 16.2.10, React
19.2.4, Tailwind CSS v4 · **Storage**: N/A · **Testing**: N/A (no test framework in this repo;
manual verification, see `quickstart.md` addendum) · **Target Platform**: Web · **Project Type**:
single Next.js App Router app · **Performance Goals**: N/A (CSS-only + one markup extraction) ·
**Constraints**: no new libraries (the Trusted-Clients overflow check uses only native
`ResizeObserver`); zero visual change to any homepage section other than Hero and the new
Trusted-Clients section, **except** FR-045's `h1` fix, which is deliberately sitewide (see below) ·
**Scale/Scope**: 2 existing files edited (`Hero.tsx`, `home-data.ts`) + 1 new file created
(`TrustedClients.tsx`) + `app/page.tsx`'s render order + `tokens.css`/`globals.css` additions +
one 3-line dead-rule removal in `globals.css` (FR-045) affecting every page's `h1`.

## Constitution Check (addendum)

*GATE: before Phase 0 and re-checked after Phase 1 of this addendum.*

- **I (Token-Only Styling)** — PASS. All new literal values (Live-Webinar badge gradient/shadows,
  green-dot glow/ripple border, stat-suffix font-size, label/border tokens) are added to
  `tokens.css` first, in their existing numbered sections, before any component consumes them —
  several needed values turned out to already exist as exact matches (`--color-border-orange-strong`,
  `--blur-10`, `--gradient-brand`, `--color-badge-text`, `--ls-widest`, `--color-amber-light`,
  `--text-stat` (the last caught during implementation when `--text-stat-suffix-sm` would have
  duplicated it byte-for-byte) — see research.md §7/§9 — and are reused rather than duplicated.
  FR-045 (research.md §10) is the inverse of a Principle I gap: a dead `h1 { font-size: 44px; }`
  rule was defeating the token system outright, on every page — removing it is what let
  `--text-h1`'s clamp actually take effect, rather than adding a new token. One deliberate
  non-addition: the
  stat-divider border reuses the existing `--color-border-strong` (0.16) rather than a new token
  for the reference's 0.14 — a cosmetic 2% delta on a decorative divider, consistent with this
  feature's own precedent (hero-token consolidation, `tokens.css` history) of not spawning
  near-duplicate tokens for sub-pixel-equivalent deltas. Dropped from the original addendum: the two
  grayscale-filter logo tokens, per the styling-treatment reversal (research.md §8).
- **II (Breakpoints)** — PASS, not applicable (no new breakpoint introduced; the Trusted-Clients
  overflow-vs-static behavior is now driven by runtime measurement, not a breakpoint, per
  research.md §8's revision).
- **III (Component Library)** — PASS. `TrustedClients.tsx` reuses `MediaSlot` for logos; no new
  primitive is introduced. **Revised per direct instruction**: the Live-Webinar badge's inner chip,
  first built as bespoke `Hero.tsx` markup (reasoning: its sizing didn't match `Badge`'s generic
  dimensions), now extends `components/ui/Badge.tsx` itself — a new `size: "sm" | "lg"` prop and
  `tone: "live"` — rather than forking it, so the hero stops carrying a one-off duplicate of the
  shared primitive's job. Verified byte-for-byte equivalent output (research.md §9); zero visual
  change.
  **Stable identity for repeated content**: `DeliveryStat` and `TrustedClientLogo` both gained a
  required `id` field, and their `.map()` call sites key on `id` rather than `label`/`alt` (display
  text) — a pre-existing gap in `Hero.tsx`'s stat row, and one this addendum's new
  `TrustedClients.tsx` would otherwise have repeated on `logo.alt`. Fixed directly rather than
  carried forward.
- **IV (References Are Visual Truth)** — PASS, no deviation. The original addendum's "centered hero
  content" deviation is reversed: FR-002 now matches the reference's left-aligned hero column
  exactly (spec.md Clarifications, Session 2026-08-04), so Principle IV's "reference is visual
  truth" rule is fully honored rather than exceptioned. The one remaining intentional divergence is
  Trusted-Clients' visual treatment (FR-004): the reference's own grayscale/plain-background logo
  styling is explicitly not adopted, in favor of the app's existing white-card treatment — this is
  a deliberate, spec.md-recorded choice (Clarifications, Session 2026-08-04), not an oversight.
- **V (Dark-First Brand)** — PASS. No new surface fill; the Trusted-Clients section sits on the
  existing black `--color-ink` background, orange stays confined to existing CTA/stat-gradient/badge
  use.
- **VI (frontend-design skill)** — PASS, invoked; see UI Design Approach addendum.
- No unresolved violations — Complexity Tracking is empty.

## UI Design Approach (addendum) — REVISED

**UI mode**: ON (Next.js/React tech signal + spec.md content signal).

**`frontend-design` skill invocation**: re-consulted for craft guidance on the 3 new/changed
pieces in this revision (the live-ripple dot, the split-baseline stat suffix, and the
overflow-aware logo strip). Takeaways applied:

- **Live-ripple dot**: keep the inner dot itself a static, fully-opaque solid circle — only the
  outer ring animates (scale 0.8→1.6, opacity 0.9→0). A single ring at the reference's modest scale
  range, with its own asymmetric easing (`cubic-bezier(.2,.7,.2,1)`, a fast-out/slow-fade tail),
  reads as a "live" pulse rather than a loading spinner; multiple concentric rings or a larger scale
  range would tip it into "buffering" territory. Kept sparing (one thin 2px ring), per Principle V.
  `motion-reduce:animate-none` freezes the ring at rest (scale 1, static opacity) — the same pattern
  already used for `tgblink`/`tgbounce` elsewhere in this file.
- **Stat suffix baseline split**: the reference wraps each stat's digit+suffix pair in its own
  `display:inline-flex; align-items:baseline` container (not two bare adjacent spans) — this is
  exactly why the smaller 26px " weeks" suffix sits correctly on the shared text baseline instead of
  aligning to its line's top by default. `Hero.tsx`'s stat-cell wrapper needs `inline-flex
  items-baseline` (it's currently a bare block `<div>`) for the two differently-sized inline spans
  to align the way the reference shows.
- **Overflow-aware logo strip**: no new dependency needed for a "this scrolls" cue — a CSS-only edge
  fade (`mask-image: linear-gradient(...)`, applied only when `overflowing` is true) reads as
  "content continues" without a visible native scrollbar breaking the section's chrome-less dark
  surface. The scrollbar itself stays hidden (`scrollbar-width: none`, already the app's existing
  convention for this exact strip) so the fade is the only affordance, keeping it restrained rather
  than adding a visible scroll-track.

**Reconciliation with Principles I–V**: none needed — the skill's guidance already matched
Principle IV (reference-exact ripple timing/keyframe, reference-exact baseline structure) and
Principle V (sparing accent use, no new fill).

**Anchor files**: `app/_home-components/Hero.tsx`, `app/_home-components/TrustedClients.tsx` (new),
`app/_home-components/home-data.ts`, `app/page.tsx`, `app/tokens.css`, `app/globals.css` (new
`@theme inline` mappings + the new `tgLiveRipple` keyframe + the FR-045 dead-rule removal),
`components/ui/Badge.tsx` (new `size` prop + `live` tone, research.md §9).

## Project Structure (addendum) — REVISED

```text
app/_home-components/
├── Hero.tsx             # sub-badge + scroll-indicator removed; content column widened to 780px,
│                         # stays left-aligned (not centered); h1 leading-[0.99] override removed,
│                         # own mt-[22px] added; side padding reverted to flat px-9 (reference-exact,
│                         # not the app's responsive --container-padding); Live-Webinar badge's inner
│                         # chip now renders via <Badge tone="live" size="lg"> (not bespoke markup);
│                         # stat cells get inline-flex items-baseline wrappers + suffixClassName;
│                         # trusted-clients block removed
├── TrustedClients.tsx    # NEW — extracted "Trusted by our clients" section, current white-card
│                         # logo styling kept as-is, ResizeObserver-driven overflow-scroll + edge fade
└── home-data.ts          # DeliveryStat gains optional suffixClassName; TRUSTED_CLIENT_LOGOS reused as-is

components/ui/
└── Badge.tsx             # + size?: "sm" | "lg" prop (default "sm", non-breaking); + tone: "live"

app/page.tsx               # + <TrustedClients /> rendered after <Hero />

app/tokens.css              # + --ls-24, --color-border-hairline-08, --text-stat-count,
                             #   --ls-stat-count, --gradient-live-badge,
                             #   --shadow-live-badge, --shadow-live-badge-chip, --shadow-glow-green,
                             #   --color-border-green-85 (research.md addendum §§7-9)
                             # Dropped: --filter-logo-rest, --filter-logo-hover (styling reversal)
app/globals.css             # + matching @theme inline entries (letter-spacing, border, font-sizes)
                             # + new @keyframes tgLiveRipple
                             # − legacy `h1 { font-size: 44px; }` inside
                             #   @media (min-width: 960px) (FR-045, research.md §10 — sitewide fix)
```

No `data-model.md`/`contracts/` (presentation-only, same as Phase 1). No other file is touched.

**Structure Decision**: existing single-project structure. `TrustedClients.tsx` is route-local
(`app/_home-components/`), matching the constitution's rule that route-local sections stay
colocated inside `app/` — it is consumed by the homepage only, same as its sibling section files.

## Complexity Tracking (addendum)

*Empty — no violations.*

## Post-Design Constitution Re-Check (addendum)

Research (Phase 0 of this addendum, revised) resolved the hero-alignment question in the
reference's favor (no more centering deviation), confirmed the Live-Webinar badge's full token set —
several of which already existed as exact-value matches and are reused rather than duplicated — and
replaced the Trusted-Clients breakpoint-proxy scroll with genuine runtime overflow detection, before
any file changed. No new violations. Gate: PASS.

## Homepage Subscribe Band (FR-005)

**Date**: 2026-08-05. Extends this Phase 2 addendum to also cover `app/_home-components/
SubscribeBand.tsx` (FR-005), per spec.md Clarifications Session 2026-08-05. Hero and Trusted Clients
above are unaffected; "How We Deliver", "Don't Migrate/Re-Imagine", the Construction card,
Testimonials, the Blog teaser, Life at TechGrit, and the final CTA remain unplanned.

1. **`app/_home-components/SubscribeBand.tsx`** — widen the outer container from `max-w-[1020px]`
   to the reference's `max-w-[1280px]` (matching the sibling `TrustedClients.tsx` section's own
   container width) and correct its vertical padding from `py-[88px]` to `py-20` (80px; horizontal
   `px-9`/36px already matched the reference and is unchanged). Remove the outer `<section>`'s extra
   `bg-[rgba(255,255,255,0.015)]` tint and `border-t border-border-subtle` — the reference declares
   neither, so the page's black background now shows through unmodified. Switch the Name/Email
   inputs from fixed pixel-width containers (`w-[150px]`/`w-[180px]`) to the reference's flexible
   proportional widths (`flex-1`/`flex-[2]`, `min-w-0`) inside a full-width, non-wrapping form row
   (`flex-nowrap w-full gap-3`, correcting the row gap from 10px to the reference's 12px as a direct
   corollary of going full-width/no-wrap). Correct each input's own padding/height via `FormField`'s
   existing `inputClassName` override (not a change to `FormField`'s shared `INPUT_BASE`, which every
   other page's form also consumes) to the reference's `15px 18px` padding and explicit
   `min-height:52px`. Correct the Submit button's vertical padding (`py-3`/12px → the reference's
   `15px`) and add an explicit `min-height:52px` so it aligns with the 52px-tall input fields.

Nothing else changes. The card itself (`glass-card px-11 py-[38px]`) already matches the reference's
background/border/radius/blur/shadow/padding exactly and is untouched; the outer text/form grid
(`grid-cols-[1fr_auto] gap-9`) is a known, deliberately out-of-scope 4px gap delta versus the
reference's `0.8fr 1.4fr`/`gap:40px` — not raised in this session's clarification, so not touched
here (see research.md §11). No other homepage section, page, or shared component (`Button`,
`FormField`, `globals.css`) changes.

**Constitution check** — PASS on all six principles: no new literal value duplicates an existing
token (`py-20`/`gap-3` reuse Tailwind's own default spacing scale, the same convention already used
sitewide for round values; the input/button sizing fixes reuse `FormField`'s existing
`inputClassName` prop and `Button`'s existing per-instance override convention — both already used
elsewhere in this same file, not a new pattern); no component is forked (`FormField`'s shared
`INPUT_BASE` is untouched, so every other consumer — Contact, Careers Apply — stays visually
unchanged); every corrected value is read directly from `TechGrit Homepage.dc.html` (lines 367-386);
no new surface fill (removing the extra background tint moves the surface closer to the reference's
plain dark background). **Anchor file**: `app/_home-components/SubscribeBand.tsx` (only file
touched — no new tokens, no `globals.css` edit, no `data-model.md`/`contracts/`).

## Homepage Methodology / "How We Deliver" (FR-006)

**Date**: 2026-08-05. Extends this Phase 2 addendum to also cover the "How We Deliver" section and
the homepage's own ambient-orb background (FR-006, FR-006a, FR-006b), per spec.md Clarifications
Session 2026-08-05. Hero, Trusted Clients, and Subscribe Band above are unaffected; "Don't
Migrate/Re-Imagine", the Construction card, Testimonials, the Blog teaser, Life at TechGrit, and the
final CTA remain unplanned.

1. **`components/ui/icons.tsx`** — add 4 new named icon exports, one per phase, extracted verbatim
   from the reference's 4 distinct top-rail SVGs (`TechGrit Homepage.dc.html` lines 463-466):
   `PhaseArchitectIcon` (circle + pennant/flag), `PhaseAgenticBuildIcon` (code-bracket `</>` + slash),
   `PhaseIndustrializeIcon` (shield + checkmark), `PhaseImpactIcon` (sprouting-leaf shape) — following
   the file's existing `IconProps`/`{...props}`-last convention so the same component renders at the
   top rail's `26px` and the phase-detail panel's `82px` via a `width`/`height` override, not two
   separate components (FR-006's "the same icon used for that phase," not a separate/distinct one).
2. **New `components/ui/PhaseShowcase.tsx`** (FR-006, resolves `/speckit.analyze` finding C1) — the
   generic scroll-pinned phase-showcase engine (420vh track, `position:fixed` stage, scroll-driven
   `activeIndex`, progress-fill rail, phase-detail panel), extracted here rather than left inside
   `app/_home-components/` — a deliberate, explicitly-recorded exception to the constitution's
   anti-speculative-structure rule (spec.md Clarifications, Session 2026-08-05, reversing the
   file-location half of the original C1 answer). Accepts `phases: MethodologyPhaseContent[]` (each
   item carrying required `icon`/`badgeIcon: ReactNode` fields — a direct data field per finding I1,
   matching `PlatformCapability`'s existing convention in `home-data.ts`, not an index-based lookup
   prop; typed as pre-rendered `ReactNode`, not `IconComponent`, per T031's already-implemented fix —
   `PhaseShowcase` is `"use client"`, and a raw component reference can't cross the Server→Client
   props boundary that separates it from `MethodologySection`), `eyebrow` (string), and `heading`
   (`ReactNode`) as props. Owns: the top-rail node (rendering `phase.icon` in place of the bare
   numeral — already a `ReactNode`, just placed, not called), the phase-detail panel (widened to
   `1280px`, `max-tg-md:grid-cols-1` collapse for the reference's own dead/broken collapse selector,
   and the enlarged 170px circular `linear-gradient(140deg,#F7B733,#E87722)` badge containing
   `active.badgeIcon` — already sized to 82px by the caller, not resized here — with the existing
   "Phase 0{n}" corner label), and the eyebrow — via `<SectionEyebrow showAccent={false}
   className="mb-3.5">` (FR-006a's new `className` prop, correcting the margin-bottom to the
   reference's `14px` via Tailwind's canonical `3.5` step — matching the exact class the original
   bespoke eyebrow markup already used before migration — rather than an arbitrary `mb-[14px]`, and
   closing the previously-accepted 16px delta). The phase title/week labels no
   longer carry the hardcoded `fontFamily: "Arial, sans-serif"` overrides (a confirmed bug, not
   reference-backed) — both inherit the shared `--font-body`/`--font-display` stack.
   **Deliberately not added**: a per-phase `accentColor` prop, an alternate 2-column
   features+"Best for"+CTA content mode, or any other shape informed by `TechGrit Frameworks.dc.html`'s
   "Framework Portfolio" section — no current consumer needs them, and building `/frameworks` itself
   remains out of scope (spec.md Assumptions).
3. **`app/_home-components/MethodologySection.tsx`** — becomes a thin homepage-specific wrapper: it
   alone imports `METHODOLOGY_PHASES` from `./home-data`, pre-renders each phase's icon (`<phase.icon
   />` at 26px, `<phase.icon width={82} height={82} />` for the badge) since `PhaseShowcase` is `"use
   client"` and a raw component reference can't cross a Server→Client props boundary, and renders
   `<PhaseShowcase phases={...} eyebrow="How we deliver" heading={...} />`. No scroll-pin/rail/panel
   markup lives in this file anymore. Because this wrapper does the pre-rendering itself, `app/page.tsx`
   needs no changes for this section — it keeps the plain `<MethodologySection />` it already has.
4. **`components/ui/section-eyebrow.tsx`** (FR-006a) — add an optional `className` prop that merges
   onto the outer wrapper `<div>` (additive, the same convention `Button`/`Badge` already use). No
   other existing consumer's rendered output changes (the prop is optional and unused elsewhere).
5. **Homepage ambient orbs** (FR-006b, revised) — `components/ui/ambient-orbs.tsx` gains a
   `pathname === "/"` branch (exact match, not `startsWith`) rendering the homepage's own
   reference-exact 4-orb, all-warm-toned set (positions, sizes, opacities, blur radii, animation
   timings from `TechGrit Homepage.dc.html` lines 148-158) in place of the component's default 3-orb
   set (which includes a blue orb this reference avoids). No route-exclusion entry and no separate
   `app/_home-components/` orb file — the homepage stays on the same shared, globally-wired component,
   just a different branch of it. Both this new branch and the existing default 3-orb branch are
   rewritten with Tailwind utility classes end to end — arbitrary-value classes for position/size/blur/
   animation timing, canonical `bg-overlay-*` classes for color — following the no-inline-style
   convention `app/case-studies/[slug]/page.tsx` already established for exactly this pattern
   (`className="absolute top-[-160px] right-[-120px] w-[560px] h-[560px] rounded-full bg-overlay-teal
   blur-[120px] animate-[tgorb_16s_ease-in-out_infinite]"`), not Construction's inline-`style`
   precedent. The default 3-orb set's 3 colors already match existing tokens exactly (no new tokens);
   the homepage's 4-orb set needs 3 new `tokens.css` entries for values with no existing exact match
   (`rgba(232,119,34,0.11)`, `rgba(232,119,34,0.13)`, `rgba(247,183,51,0.10)`) plus their `@theme
   inline` mappings in `globals.css`, per Principle I — the 4th color (`rgba(232,119,34,0.18)`) already
   exists as `--color-overlay-orange-18`. Converting the animation from inline `style` to a Tailwind
   `animate-[...]` class also surfaces a latent bug: the existing `@media (prefers-reduced-motion:
   reduce) { .bg-ambient-orbs span { animation: none } }` rule in `globals.css` has no `!important`,
   so a later-cascading utility class's `animation` will silently outrank it — the exact
   already-documented reason `[data-lift-hover]`'s reduced-motion override needed `!important` a few
   lines below it in the same file. Add `!important` to this rule in the same pass.

Nothing else changes. The deliverables checklist and the headline's gradient-clip treatment already
match the reference and are untouched.

**UI Design Approach (Methodology + orbs)**: `frontend-design` skill consulted for the 3 new/changed
craft surfaces in this addendum — the 4 phase icons, the enlarged circular badge, and the homepage's
4-orb palette. Takeaways applied: **icons** — each stays a simple 2-stroke glyph legible at both the
top rail's 26px and the phase-detail panel's 82px, so one component serves both sizes without a
separate simplified variant; **badge** — the existing `--gradient-phase-node`/
`--shadow-phase-badge-glow` tokens already give the 170px circle enough visual weight, so no further
border/glow embellishment is added; **orbs** — the homepage's 4 warm-toned orbs stay at the
reference's low opacity (0.10-0.18) with long (16-24s) animation durations, the same "quiet ambient
depth, not a distraction" quality the shared component's existing default 3-orb set already
establishes elsewhere in the app.

**Constitution check** — PASS on all six principles: the 4 new icons are added to
`components/ui/icons.tsx`, the constitution's single consolidated icon file (Principle III — never a
per-route copy), following its existing naming/props convention exactly, not forked; the
Arial-removal and dead-selector-collapse fixes are confirmed defects relative to both the reference
and the app's own brand system, not new design choices (Principle IV — reference is visual truth, not
copy-paste source: a broken preview-tool selector is not intentional design); no new literal value
duplicates an existing token (the `1280px` width and `960px` collapse breakpoint reuse the app's
existing `max-w-[1280px]`/`md` conventions; the homepage orbs' 3 new colors are added to `tokens.css`
first per Principle I, and its 4th color plus the default set's 3 colors all reuse existing tokens
verbatim); no new surface fill (the circular badge reuses the existing `--gradient-brand`-equivalent
gradient already used for the rail nodes).
**Principle III / C1 resolution (revised)**: extracting the engine into `components/ui/PhaseShowcase.tsx`
is a knowing, explicitly-recorded exception to the anti-speculative-structure rule — made here by
direct instruction rather than left as silent drift — since only the homepage consumes it in this
feature; `/frameworks` remains a future feature's work (spec.md Assumptions). `SectionEyebrow`'s new
`className` prop extends the existing primitive rather than forking it, matching how `Button`/`Badge`
already expose the same escape hatch.
**Anchor files**: `components/ui/icons.tsx` (4 new exports), `components/ui/PhaseShowcase.tsx` (new),
`components/ui/section-eyebrow.tsx` (new `className` prop), `components/ui/ambient-orbs.tsx`
(rewritten to Tailwind classes throughout, plus a new `pathname === "/"` branch for the homepage's
4-orb set — no route-exclusion-check change), `app/_home-components/MethodologySection.tsx` (now a
thin wrapper), `app/_home-components/home-data.ts` (`MethodologyPhase` gains a required
`icon: IconComponent` field, populated per phase with the 4 new icons), `app/tokens.css` (3 new
`--color-overlay-*` entries for the homepage orbs), and `app/globals.css` (their `@theme inline`
mappings, plus an `!important` addition to the existing reduced-motion orb rule) — no `app/page.tsx`
change, no `data-model.md`/`contracts/`.

## Homepage Re-Imagine Grid (FR-007)

**Date**: 2026-08-06. Extends this Phase 2 addendum to also cover the "Don't Migrate / Re-Imagine"
section (FR-007), per spec.md Clarifications recorded directly in FR-007's own text (no separate
`## Clarifications` entries, per explicit instruction). Hero, Trusted Clients, Subscribe Band, and
Methodology above are unaffected; the Construction card, Testimonials, the Blog teaser, Life at
TechGrit, and the final CTA remain unplanned. `frontend-design` skill consulted for this addendum's
craft surfaces (the shared card icon, the TechGrit-mark icon, and the hover treatment) — see UI
Design Approach below.

Today, cards 1-3 (`app/_home-components/ReImagineSection.tsx`) already use `GlassCard
variant="reimagine"` with three distinct per-item icons and orange/blue/teal tones; the "Why AI-First
Matters" panel below them is a plain `<div>`, not a `GlassCard`. Both deviate from
`TechGrit Homepage.dc.html` lines 508-573 (3 cards sharing one identical star-burst icon, each with
an `image-slot`; a 4th, un-hovered panel) and from FR-007's now-4-card requirement.

1. **`app/tokens.css`** — add 3 tokens with no existing exact match, in their respective existing
   numbered sections: `--color-border-9: rgba(255, 255, 255, 0.09);` (§ Borders, filling the gap in
   the existing `--color-border-8`/`-14`/`-18`/`-22`/`-28`/`-30` sequence — the reference's card
   border, line 520), `--color-glass-3: rgba(255, 255, 255, 0.03);` (§ Glass fills, between
   `--color-glass-hairline` (0.02) and `--color-glass-4` (0.04) — the reference's card/panel
   background — **deliberately a distinct token from the existing `--color-glass-faint`**, which is
   declared twice in `tokens.css` today (0.03, then silently shadowed by a second 0.04 declaration
   for Case-Study cards); `--color-glass-3` is not a fix for that pre-existing duplicate and must not
   be merged into it), and `--shadow-reimagine-glow: 0 0 60px -10px rgba(232, 119, 34, 0.40);` (§ Shadows —
   card 1's hover glow, line 520; cards 2-3 use the same glow at `0.35`, so a second token
   `--shadow-reimagine-glow-soft: 0 0 60px -10px rgba(232, 119, 34, 0.35);` is added alongside it,
   lines 532/544). The card border-radius (22px), inter-card gap (22px), card padding (26px), and
   section vertical padding (80px) all already have exact canonical Tailwind classes today
   (`rounded-3xl`, `gap-tg-9`, `p-tg-11`, `p-20`) — no new tokens needed for those. The hover
   border-color (`rgba(232,119,34,0.5)`) and hover background-fill already exist too
   (`--color-border-orange-medium`, `--color-hover-orange-fill-14` — the latter per FR-007's own
   clarification) and are reused verbatim, not redefined.
2. **`app/globals.css`** — map the 2 new color tokens into `@theme inline`
   (`--color-border-9: var(--color-border-9);` / `--color-glass-3: var(--color-glass-3);`, alongside
   the existing border/glass mapping blocks) so `border-border-9`/`bg-glass-3` become real canonical
   Tailwind utilities, not arbitrary-value classes. Also map the two new shadow tokens the same way
   (`--shadow-reimagine-glow: var(--shadow-reimagine-glow);` / `-soft` sibling), giving canonical
   `hover:shadow-reimagine-glow`/`hover:shadow-reimagine-glow-soft` classes. Additionally map the
   already-existing-but-unmapped `--color-border-orange-medium` the same way
   (`--color-border-orange-medium: var(--color-border-orange-medium);`), so its consumers (this
   section, and Careers' role cards, which today reach it only via `border-[var(--color-border-orange-medium)]`)
   can use the canonical `border-border-orange-medium` class per this session's "Tailwind must use
   canonical classes" direction — Careers' own call site is corrected as a small drive-by, since
   leaving it on the arbitrary form while adding the canonical mapping right next to it would be an
   inconsistency in the same file.
3. **`components/ui/icons.tsx`** — add 2 new named icon exports, following the file's existing
   `IconProps`/`{...props}`-last convention: `ReimagineSparkleIcon` (the star-burst path
   `M12 2 L14 10 L22 12 L14 14 L12 22 L10 14 L2 12 L10 10 Z`, extracted verbatim from
   `TechGrit Homepage.dc.html` lines 521/533/545 — identical on all three of the reference's
   differentiator cards, satisfying FR-007's "one common icon" requirement directly rather than by
   convention), and `TechGritMarkIcon` (a 5-column/5-row grid of rounded squares fading from the
   brand orange to amber, recreating `public/icons/favicon.png`'s mark as a scalable SVG — reusing
   `--gradient-brand`'s color stops via an inline `<linearGradient>` fill, per Principle I, rather
   than duplicating raw hex values). Existing `CopilotToAgenticIcon`/`EradicateDebtIcon`/
   `InfiniteScalabilityIcon` are **not deleted** — they become unused by this section once cards 1-3
   share `ReimagineSparkleIcon`, but are left in `icons.tsx` since removing them is a separate
   dead-code concern outside FR-007's scope (none of the three is currently imported elsewhere,
   confirmed via search, but their removal is not requested here).
4. **`components/ui/GlassCard.tsx`** — add `"reimagineDiff"` and `"reimagineWhy"` as 2 new members of
   the `GlassCardVariant` union type itself (lines 3-13) — a required prerequisite edit, since the 4
   `Record<GlassCardVariant, string>`s below only type-check once these 2 literals exist in that
   union — then add a matching entry for each to all 4 `Record`s the file already keys by variant:
   `reimagineDiff` (cards 1-3) —
   `"rounded-3xl border-border-9 bg-glass-3 p-tg-11 backdrop-blur-md hover:-translate-y-[5px]
   hover:bg-hover-orange-fill-14"`, paired with a per-card `hoverBorderColor`/`shadow` override passed
   from `ReImagineSection.tsx` itself (card 1 gets `hover:shadow-reimagine-glow`, cards 2-3 get
   `hover:shadow-reimagine-glow-soft` — the file's existing `className`-merge already supports this
   without a 5th Record entry per card); and `reimagineWhy` (card 4) —
   `"rounded-3xl border-border-9 bg-glass-3 p-9"` with **no** hover classes at all and
   `hoverBorderColor=""` passed explicitly, per FR-007's "opt out of GlassCard's default hover
   entirely" clause. `ICON_VARIANTS`/`TITLE_VARIANTS`/`DESC_VARIANTS` gain matching `reimagineDiff`/
   `reimagineWhy` entries sized to this section's existing typography (`text-lg font-medium` title,
   `mt-2.5 text-[15.5px] leading-[1.6]` description — copied from today's `reimagine` variant, since
   FR-007 does not change type sizing). The existing `reimagine` variant is **left unchanged** — it
   still backs `CaseStudiesSection.tsx`'s cards, which are out of this addendum's scope.
5. **`app/_home-components/home-data.ts`** — `DifferentiatorPoint`'s `icon: IconComponent` and
   `tone: "orange" | "blue" | "teal"` fields are removed (the icon is now shared and rendered directly
   by `ReImagineSection.tsx`, not stored per item; the tone-based icon-background coloring FR-007
   replaces has no remaining purpose). A new `image: string` field (required, not optional — the
   asset exists for all 3 entries, confirmed at `public/samples/dm-copilot.png`,
   `public/samples/dm-tech-debt.png`, `public/samples/dm-scalability.png`) is added and populated with
   each entry's matching path. `MediaSlot` (`components/ui/MediaSlot.tsx`) is still the rendering
   primitive for consistency with every other image slot in this codebase, but its "Coming soon"
   fallback branch is not expected to trigger for this section since a real `src` is always supplied.
6. **`app/_home-components/ReImagineSection.tsx`** — rewritten as a 4-item grid:
   - The 3-card row: `grid-cols-3 gap-tg-9 max-tg-md:grid-cols-1` (unchanged grid shape; `gap-6`
     corrected to `gap-tg-9`, matching the reference's `22px`, not `24px`), each card now
     `<GlassCard variant="reimagineDiff" hoverBorderColor="hover:border-border-orange-medium"
     className={index === 0 ? "hover:shadow-reimagine-glow" : "hover:shadow-reimagine-glow-soft"}>`,
     rendering `<GlassCardIcon variant="reimagineDiff"><ReimagineSparkleIcon width={26} height={26}
     className="text-orange" /></GlassCardIcon>`, the existing title/description, and a new
     `<div className="mt-auto pt-5"><MediaSlot src={item.image} alt={item.title} fill className="h-[180px] rounded-14" /></div>`
     image slot (180px tall per the reference, `flex flex-col` added to the card so `mt-auto` pins the
     slot to the card's bottom, matching the reference's `margin-top:auto` on its own image wrapper).
   - The container's own top margin corrects from `mt-14` (56px) to `mt-tg-19` (48px), matching the
     reference's `margin-top:48px` exactly; the section's own vertical padding corrects from
     `pt-15 pb-25` (60px/100px) to `pt-20 pb-20` (80px/80px, Tailwind's own default scale — matching
     the reference's uniform `padding:80px ... 80px`).
   - The "Why AI-First Matters" panel becomes `<GlassCard variant="reimagineWhy" hoverBorderColor="">`,
     keeping its existing internal `grid-cols-[0.8fr_1.2fr]` content (icon+title+description on the
     left, the two comparison bars on the right) unchanged — only its outer wrapper changes from a
     plain `<div>` to `GlassCard`. Its icon wrapper swaps `<LightningIcon className="text-orange" />`
     for `<TechGritMarkIcon width={30} height={30} />`, and its `bg-overlay-orange` icon-background
     wrapper is removed (the reference's own icon slot here has no background chip — confirmed at
     line 560 — so the swap corrects an existing, unrelated delta as a direct consequence of touching
     this icon).

Nothing else in the section changes. The comparison bars' scroll-reveal animation, percentages, and
labels already match the reference and are untouched.

**UI Design Approach (Re-Imagine grid)**: `frontend-design` skill consulted for this addendum's 2
craft surfaces. **Shared card icon** — `ReimagineSparkleIcon` stays a simple single-color glyph (no
gradient fill, matching the reference's flat `fill="#E87722"`) so it reads clearly at the small 26px
size shared across 3 cards without competing with each card's own imagery below it. **TechGrit-mark
icon** — rendered at 30px (this card's existing icon-wrapper size, unchanged from today's
`LightningIcon`), using the brand gradient rather than the favicon's flat-orange squares, so it reads
as "the brand mark, subtly present" rather than a literal shrunk-down favicon competing with the
grid's other cards. **Hover treatment** — the background-fill (`hover-orange-fill-14`) is deliberately
the *lightest* of the three available fill tokens (12/14/15) so cards 1-3's title/description text
and new imagery stay legible on hover, consistent with how every other hover-background card in this
codebase (Services, Case Studies) favors a subtle tint over a strong one.

**Constitution check** — PASS on all six principles: every new literal value (`0.09` border, `0.03`
background, the two `60px -10px` glows) is added to `tokens.css` first, in its existing numbered
section, before use (Principle I); no component is forked — `GlassCard`/`GlassCardIcon`/
`GlassCardTitle`/`GlassCardDescription` gain 2 new Record entries each, the same pattern every prior
variant (`industry`, `blogCard`, `constructionImpact`, ...) already used, and `MediaSlot` is reused
verbatim, not re-implemented (Principle III); the star-burst icon and the panel's dropped icon-chip
background are read directly from the reference, not invented (Principle IV — a preview-tool
authoring choice, the identical icon on 3 cards, is treated as intentional design here, unlike the
broken collapse-selector case in the Methodology addendum above, since nothing about it is
self-contradictory or non-functional); no light-surface tokens introduced (Principle V). Canonical
Tailwind classes are used throughout in preference to arbitrary-value syntax wherever a token exists
or is newly added (`rounded-3xl`, `gap-tg-9`, `p-tg-11`, `p-20`, `mt-tg-19`, `border-border-9`,
`bg-glass-3`, `hover:bg-hover-orange-fill-14`, `hover:border-border-orange-medium`,
`hover:shadow-reimagine-glow(-soft)`) — the only remaining arbitrary-value classes in this section
are ones with no canonical equivalent possible (`max-tg-md:grid-cols-1`'s underlying breakpoint is
already canonical; the image slot's `h-[180px]` has no existing 180px spacing token, and adding one
solely for this single usage was judged unwarranted scope creep beyond FR-007's own ask).

**Anchor files**: `app/tokens.css` (3 new tokens: `--color-border-9`, `--color-glass-3`,
`--shadow-reimagine-glow`/`-soft`), `app/globals.css` (their `@theme inline` mappings, plus the
drive-by mapping of the pre-existing `--color-border-orange-medium`), `components/ui/icons.tsx` (2
new exports: `ReimagineSparkleIcon`, `TechGritMarkIcon`), `components/ui/GlassCard.tsx` (2 new
variants: `reimagineDiff`, `reimagineWhy`, across all 4 `Record`s), `app/_home-components/home-data.ts`
(`DifferentiatorPoint` loses `icon`/`tone`, gains optional `image`), and
`app/_home-components/ReImagineSection.tsx` (rewritten 3-card row + panel, both as `GlassCard`) — no
`app/page.tsx` change, no `data-model.md`/`contracts/` change, `components/ui/CaseStudiesSection.tsx`
and every other `GlassCard` consumer unaffected (their own variants are untouched).

## Homepage Industries Section (FR-008)

**Date**: 2026-08-06. Extends this Phase 2 addendum to also cover the homepage's Industries
section (`app/_home-components/IndustriesSection.tsx`, rendered directly after "Don't Migrate /
Re-Imagine"), per spec.md Clarifications Session 2026-08-06, FR-008. This is **not** the standalone
`/construction` page — that page's own requirements (FR-016 through FR-021) are unaffected and
unplanned by this section. Hero, Trusted Clients, Subscribe Band, Methodology, and Re-Imagine above
are unaffected; Testimonials, the Blog teaser, Life at TechGrit, and the final CTA remain unplanned.
`frontend-design` skill consulted for this addendum's craft surfaces (the 3 colored icon badges and
the card's clickability affordance) — see UI Design Approach below.

Today, `IndustriesSection.tsx`'s 3 cards (`GlassCard variant="industry"`) each render a `MediaSlot`
photo with a small bordered icon badge overlaid at the photo's bottom-left corner, using the shared
`FinTechIcon`/`HealthcareIcon`/`ConstructionIcon` from `components/ui/icons.tsx` — the same 3 icons
`components/layout/nav-config.ts` imports for the nav's "Industries" mega-menu (`HealthcareIcon`,
`ConstructionIcon` directly; FinTech already has its own nav-only `NavFinTechIcon`, added previously
for exactly this reason). Only the Construction card carries an `href` (`/construction`), rendered as
an inline "Explore Construction →" text link inside the card, not a whole-card link. This diverges
from `TechGrit Homepage.dc.html` (lines 586-602), which shows no photo at all — each card is a
`data-card` anchor wrapping a large 56px colored circular icon badge (white stroke icon on a solid
color fill: `#8B5CF6` FinTech, `#10B981` Healthcare, `#3B82F6` Construction), a title, and a
description.

1. **`components/ui/icons.tsx`** — add 3 new named icon exports, extracted verbatim from the
   reference's homepage-section icons (lines 588/593/598 — distinct from the nav mega-menu's own
   icon shapes at lines 193/194/196, which are unaffected): `IndustryFinTechIcon` (card/rect +
   horizontal + vertical strokes), `IndustryHealthcareIcon` (rounded rect + cross), `IndustryConstructionIcon`
   (crane/building silhouette), following the file's existing `IconProps`/`{...props}`-last
   convention, each rendered with a white stroke (`stroke="#fff"`) regardless of caller color, since
   the reference always pairs these with a solid colored circle background, never a colored stroke on
   a dark surface (unlike the existing shared `FinTechIcon`/`HealthcareIcon`/`ConstructionIcon`, which
   stay exactly as they are today for the nav mega-menu).
2. **`app/_home-components/home-data.ts`** — `IndustryCard.icon` is repointed from
   `FinTechIcon`/`HealthcareIcon`/`ConstructionIcon` to the 3 new `Industry*Icon` exports from item 1.
   The `image: { src: string; alt: string } | null` field is removed (no photo renders in this section
   any longer); `href` stays `string | null`, unchanged in shape — only Construction keeps a non-null
   value (`/construction`), FinTech and Healthcare stay `null`. A new required `iconBg: string` field
   is added (Tailwind class per card: `bg-avatar-violet`, `bg-avatar-green`, `bg-avatar-blue` — all 3
   already exact-match, already-mapped canonical tokens/utilities from the Testimonials avatar work,
   reused verbatim, not duplicated).
3. **`app/tokens.css`** — add 3 new border tokens (§ Borders) for the reference's per-card hover
   border colors, none of which exist today at these exact values: `--color-border-violet-50: rgba(139, 92, 246, 0.50);`,
   `--color-border-green-55: rgba(16, 185, 129, 0.55);`, `--color-border-blue-55: rgba(59, 130, 246, 0.55);`
   (distinct from the existing `--color-border-blue-strong`/`-teal-strong`, which are different hues at
   different opacities for unrelated cards). Add 3 new shadow tokens (§ Shadows) for the reference's
   per-card hover glow (`0 0 50px -12px rgba(...,0.35)`, lines 587/592/597): `--shadow-industry-glow-violet`,
   `--shadow-industry-glow-green`, `--shadow-industry-glow-blue` — distinct from the existing
   `--shadow-glow-*-avatar` tokens (those are a different shadow shape, `0 0 0 -12px`, for the
   Testimonials avatar ring, not a card hover glow). Add one new letter-spacing token,
   `--ls-title-tight: -0.01em;` (§ Typography — named to avoid collision with the existing, unrelated
   `--ls-01: 0.01em`, a *positive* Blog topic-filter-chip tracking value; `/speckit.analyze` flagged the
   originally-planned `--ls-tight-01` name as too easy to confuse with it) — no existing token matches
   this exact value (closest is `--ls-normal` at `-0.02em`, a different value, not a duplicate). Add
   one new font-size token, `--text-industry-title: 26px;` (§ Typography) for the card title — the
   value happens to equal `--text-stat`'s 26px, but `/speckit.analyze` correctly flagged reusing
   `--text-stat` here as a Principle I violation ("each token has exactly one semantic job"; `--text-stat`
   is explicitly annotated "Hero delivery-stat digit size" and reusing it for an unrelated card title
   would repurpose it), so a dedicated token is added instead, even though the literal pixel value is
   the same. No new radius token: the reference's 20px card radius already has an exact match,
   `--radius-2xl` (`rounded-2xl`); no new padding/margin token: the reference's `30px 30px 34px` card
   padding and `44px` icon-to-title gap already have exact matches, `--space-13`/`--space-14`
   (`p-tg-13`/`pb-tg-14`) and `--space-17` (`mb-tg-17`); the description's 15px/rgba(255,255,255,0.6)
   already has exact matches, `--text-sm`/`--color-text-60` (`text-sm`/`text-60`) — both general-purpose,
   many-consumer tokens, not a single-job token like `--text-stat`, so reusing them is not a Principle I
   concern.
4. **`app/globals.css`** — map the 3 new border tokens, 3 new shadow tokens, `--ls-title-tight`, and
   `--text-industry-title` into `@theme inline` (alongside the existing border/shadow/typography
   mapping blocks), giving canonical `border-border-violet-50`/`-green-55`/`-blue-55`,
   `hover:shadow-industry-glow-violet`/`-green`/`-blue`, `tracking-title-tight`, and
   `text-industry-title` classes.
5. **`components/ui/GlassCard.tsx`** — `industry`'s existing `CARD_VARIANTS` entry (the sole consumer,
   confirmed via search — safe to modify in place rather than fork) changes from
   `"rounded-[20px] border-border-image bg-glass-4 overflow-hidden hover:-translate-y-[5px]"` to
   `"rounded-2xl border-border-9 bg-glass-3 p-tg-13 pb-tg-14 hover:-translate-y-[5px]"` (canonical
   radius/border/background/padding classes, matching the reference's `20px`/`0.09`/`0.03`/
   `30px 30px 34px` values, dropping `overflow-hidden` since there is no photo to clip anymore). Each
   card passes its own `hoverBorderColor` (`hover:border-border-violet-50`, etc.) and `className`
   (`hover:shadow-industry-glow-violet`, etc.) per instance — the same per-card-override convention
   `ReImagineSection.tsx` already established for `reimagineDiff` (item 4/FR-007 above), not a 5th
   `Record` entry per color. `ICON_VARIANTS.industry` changes from `"mb-5.5 h-13 w-13 rounded-md"`
   (the old bordered-badge-over-photo treatment) to `"mb-tg-17 h-14 w-14 rounded-full"` (56px circle,
   44px gap to the title). `TITLE_VARIANTS.industry` changes from `"text-[23px]"` to
   `"text-industry-title tracking-title-tight"` — `/speckit.analyze` (H1) found the original plan never
   actually corrected the title's font-size from its current 23px to the reference's 26px (only the
   tracking addition was specified), which would have shipped a visibly-wrong title size; this is now
   an explicit class swap, not an addition alongside the stale `text-[23px]`. `DESC_VARIANTS.industry`
   changes from `"mt-2.5 text-[15px] leading-[1.6]"` to `"mt-2.5 text-sm leading-[1.6] text-60"` —
   `/speckit.analyze` (H2) found this variant carries no color class today, so it was silently
   inheriting the base `<p>` tag rule's `--color-text-secondary` (0.72 opacity, `globals.css:544`), not
   the reference's 0.6; `text-sm` also replaces the arbitrary `text-[15px]` with its canonical
   equivalent (same 15px value), consistent with this session's "Tailwind must use canonical classes"
   direction (M1).
6. **`app/_home-components/IndustriesSection.tsx`** — each card's icon wrapper becomes
   `<GlassCardIcon variant="industry" className={industry.iconBg}><Icon className="text-white" /></GlassCardIcon>`
   (colored circle, white icon — replacing the `ICON_BORDER`/`ICON_COLOR` maps and the bordered
   overlay-on-photo treatment, both of which are removed); the `MediaSlot`/photo block and its
   `relative h-[178px]` wrapper are deleted entirely; the inline "Explore Construction →" text link is
   removed. Only the Construction card (`industry.id === "construction"`, i.e. `industry.href` is
   non-null) is wrapped in a whole-card `<a href={industry.href}>` (matching the reference's
   `data-card` pattern); FinTech and Healthcare render their `GlassCard` directly, with no wrapping
   element and no click affordance, since `industry.href` is `null` for both. The "Explore Industry
   Solutions" `<Button variant="ghost">` call's own `className="px-6!"` override is corrected to
   `className="py-4!"` — `/speckit.analyze` (M2) found this override was not, as originally assumed,
   a no-op preserving an already-correct value: `Button.tsx`'s `md`-size default (`px-[26px] py-3.5`,
   i.e. 26px/14px) already matches the reference's horizontal `26px` exactly, so `px-6!` (24px,
   `!important`) was actively *worsening* fidelity by forcing it 2px narrower; the reference's vertical
   `16px` (line 584) was the actual gap, uncorrected by either the original or the overridden class.
   The fix removes the incorrect horizontal override and adds the missing vertical one, scoped to this
   one button instance only — `Button.tsx`'s shared `md` size (used by other buttons sitewide) is not
   touched.

Nothing else changes. The section's own heading/paragraph are already reference-correct.
`app/page.tsx`'s render order and every other homepage section are untouched.

**UI Design Approach (Industries section)**: `frontend-design` skill consulted for this addendum's 2
craft surfaces. **Colored icon badges** — each icon stays a simple 2-stroke white glyph on a solid
(not gradient) color fill, matching the reference's flat `#8B5CF6`/`#10B981`/`#3B82F6` circles; a
gradient fill here would compete with the section's single-accent (orange/amber) brand rule (Principle
V) more than the reference's own flat colors do, so the flat treatment is also the more
constitution-aligned choice, not just a literal copy. **Clickability asymmetry** — leaving FinTech/
Healthcare non-interactive (no hover lift, no cursor change) while Construction alone lifts, glows,
and shows a pointer cursor reads as an intentional "this one goes somewhere, these two don't" signal
rather than a broken/inconsistent card, provided the 3 cards' hover treatments are otherwise visually
matched (icon/title/description position, spacing) — asymmetric interactivity on visually-uniform
cards is a defensible pattern precisely because the two non-interactive cards don't attempt a hover
treatment that then does nothing.

**Constitution check** — PASS on all six principles: every new literal value (3 border colors, 3
glow shadows, 1 tracking value, 1 font-size value) is added to `tokens.css` first, in its existing
numbered section, before use (Principle I) — including a dedicated `--text-industry-title` token
rather than reusing the value-identical-but-differently-scoped `--text-stat`, per `/speckit.analyze`
finding C1: Principle I requires each token to have exactly one semantic job, and `--text-stat` is
already annotated for the Hero delivery-stat digit, not this card title; the 3 new icons are added to
`components/ui/icons.tsx`, the constitution's single consolidated icon file, following its existing
naming/props convention, and deliberately kept separate from the shared
`FinTechIcon`/`HealthcareIcon`/`ConstructionIcon` so the nav mega-menu (a different consumer, out of
this addendum's scope) renders unchanged — the same "add a second, differently-named icon rather than
mutate a shared one" precedent `NavFinTechIcon` already set (Principle III); `GlassCard`'s `industry`
variant is modified in place, not forked, since it has exactly one consumer (confirmed via search) —
Principle III's "don't fork, don't duplicate" is satisfied either way here, but editing in place
avoids a same-shaped near-duplicate variant; the icon badge design, per-card hover colors, and
construction-only clickability are all read directly from the reference (Principle IV), not invented;
no new surface fill — the 3 icon-badge colors are the only non-brand-accent colors introduced,
confined to small 56px circles, not surfaces (Principle V). Canonical Tailwind classes are used
throughout in preference to arbitrary-value syntax wherever a token exists (`rounded-2xl`, `p-tg-13`,
`pb-tg-14`, `mb-tg-17`, `h-14`, `w-14`, `rounded-full`, `text-industry-title`, `text-sm`, `text-60`,
`tracking-title-tight`, `border-border-9`, `bg-glass-3`, `bg-avatar-violet`/`-green`/`-blue`,
`border-border-violet-50`/`-green-55`/`-blue-55`, `hover:shadow-industry-glow-violet`/`-green`/`-blue`,
`py-4!`) — the only remaining arbitrary-value class is `max-tg-md:grid-cols-1` on the outer grid,
whose underlying breakpoint is already canonical.

**Anchor files**: `components/ui/icons.tsx` (3 new exports: `IndustryFinTechIcon`,
`IndustryHealthcareIcon`, `IndustryConstructionIcon`), `app/_home-components/home-data.ts`
(`IndustryCard` loses `image`, gains `iconBg`, `icon` repointed to the 3 new exports),
`app/tokens.css` (3 new border tokens, 3 new shadow tokens, 1 new tracking token, 1 new font-size
token), `app/globals.css` (their `@theme inline` mappings), `components/ui/GlassCard.tsx` (`industry`
variant's `CARD_VARIANTS`/`ICON_VARIANTS`/`TITLE_VARIANTS`/`DESC_VARIANTS` entries edited in place),
and `app/_home-components/IndustriesSection.tsx` (icon-badge rendering, photo removal,
Construction-only whole-card link, ghost-button padding correction) — no `app/page.tsx` change, no
`data-model.md`/`contracts/` change, `Button.tsx`'s shared `md` size and `components/layout/
nav-config.ts`'s mega-menu icons unaffected, `/construction`'s own FR-016–FR-021 work unaffected.

## Homepage Testimonials Section (FR-009, FR-009a)

**Date**: 2026-08-06. Extends this Phase 2 addendum to also cover the Testimonials section
(`app/_home-components/TestimonialsSection.tsx`), per spec.md FR-009/FR-009a and Clarifications
Session 2026-08-06. Hero, Trusted Clients, Subscribe Band, Methodology, Re-Imagine, and Industries
above are unaffected; the Blog teaser, Life at TechGrit, and the final CTA remain unplanned.
`frontend-design` skill consulted for this addendum's craft surfaces (the quotation-mark glyph, the
trust-metrics card, and the drag affordance) — see UI Design Approach below.

Today, the section centers its eyebrow/title/paragraph (`text-center`), has no metrics card, and its
two card types are missing several reference elements entirely: neither shows a quotation-mark icon;
the video card has no duration badge and no hover border-color/shadow-shape change beyond
transform; the text card has no verified badge and no hover border-color change at all; the track has
only a right-side edge fade (no left-side fade); and the drag interaction neither swaps the cursor
between `grab`/`grabbing` nor temporarily disables scroll-snap during the gesture. This diverges from
`TechGrit Homepage.dc.html` lines 606-703 and its `_setupTestiDrag` script (lines 1208-1221) in each
of these respects.

1. **`app/_home-components/home-data.ts`** (`/speckit.analyze` finding C2) — add a required `id:
   string` field to the `Testimonial` type, populated for all 6 `TESTIMONIALS` entries (e.g. `"daniel-shore"`,
   `"jonas-berg"`, …, derived from each entry's name, not re-derived from display text at render time).
   This closes a pre-existing Principle III ("Stable identity for repeated content") gap: both of
   `TestimonialsSection.tsx`'s `.map()` render sites key on `testimonial.name` today, with no `id`/`slug`
   field to key on instead — the exact gap this same feature already fixed twice elsewhere for this
   reason (`DeliveryStat.id`, `TrustedClientLogo.id`, both in the Hero/Trusted-Clients addendum above).
   Since FR-009 already rewrites this exact file and array-consuming component, the fix belongs in this
   pass rather than deferred further.
2. **`app/_home-components/TestimonialsSection.tsx`** — restructure the header from a single centered
   block into the reference's flex row: a left-aligned text column (eyebrow, `h2`, paragraph, all
   inside a shared `max-w-[640px]` wrapper — the paragraph loses its current `text-center mx-auto
   max-w-[520px]` treatment) on the left, and a new trust-metrics card on the right
   (`display:flex; justify-content:space-between; align-items:flex-end`, wrapping to stack below the
   text column only when the row can't fit — no absolute positioning). The metrics card itself is 3
   stat cells (500+ Projects delivered / 100% Would refer / 6wk Avg. time to value), each carrying its
   own `id` field (`/speckit.analyze` finding L1 — a preventive fix: this is a new `.map()`-rendered
   list, so it's keyed on `id` from the start rather than its label text), separated by 2 vertical
   hairline dividers, defined as a small local array inside this file (not `home-data.ts` — no other
   section needs this content, unlike Hero's `DeliveryStat`s). Both `.map()` call sites over
   `TESTIMONIALS` switch from `key={testimonial.name}` to `key={testimonial.id}` (item 1 above). Per
   card type:
   - **Video cards**: add a duration badge (clock icon + `2:14`, reusing the existing `ClockIcon` at
     `width={10} height={10} strokeWidth={2.5}` next to the VIDEO label pill), a 5-star rating row
     (`/speckit.analyze` finding C1 — missing from today's video card entirely; the reference always
     renders 5 static white stars with a subtle `text-shadow` here, lines 659, independent of the
     `rating` field, which video entries don't set), and a decorative quotation-mark icon (new
     `QuoteIcon`, positioned/sized/colored per the reference); correct the VIDEO label pill's background
     token (see tokens below) and the card's border color to the reference's exact values; add the
     reference's hover shadow (`hover:shadow-testimonial-hover-video`, new token) alongside the existing
     `hover:-translate-y-1.5`. No verified badge is added (per the per-card-type split resolved in
     spec.md Clarifications).
   - **Text cards**: add a verified badge (reusing the existing `CheckIcon` at `width={11} height={11}`
     + a "Verified" label in `text-green`) positioned in the same row as the star rating
     (`justify-between`), and a decorative quotation-mark icon (the same new `QuoteIcon`, reference's
     text-card position/size/opacity/color); add the reference's hover border-color
     (`hover:border-border-orange-medium`, an existing exact-match token, currently unused by this
     card) and hover shadow (`hover:shadow-testimonial-hover-text`, new token) alongside the existing
     `hover:-translate-y-1.5`; add the avatar circle's box-shadow (`shadow-testimonial-avatar`, new
     token — the avatar's existing `--gradient-phase-node` background is already an exact match and is
     unchanged). No duration badge or play affordance is added (per the same per-card-type split).
   - **Track edge fades**: add a new left-side fade (`--gradient-testimonial-edge-left`, new token,
     80px/70% black) alongside the existing right-side fade (`--gradient-testimonial-edge`, already an
     exact 140px/95%-black match to the reference — unchanged).
   - **Drag/hold behavior**: the pointer handlers gain the reference's cursor and scroll-snap toggling —
     `onPointerDown` sets the track's cursor to `grabbing` and its `scrollSnapType` to `"none"`;
     `endDrag` (on pointer-up/leave) reverts both to `grab`/`"x proximity"` — matching
     `_setupTestiDrag` exactly, in addition to the drag-scroll logic already present.
3. **`components/ui/icons.tsx`** — add one new named icon export, `QuoteIcon` (the reference's
   quotation-mark path, lines 646/673: `M9 6C4.5 6 2 10 2 15v11h11V15H6.5c0-3 1.5-5 4.5-5V6zm18
   0c-4.5 0-7 4-7 9v11h11V15h-6.5c0-3 1.5-5 4.5-5V6z`), following the file's existing
   `IconProps`/`{...props}`-last convention. Rendered at two different sizes/opacities/colors per card
   type via prop overrides (video card: `76px`, `opacity-14`, `fill-white`; text card: `110px`,
   `opacity-06`, `fill-orange`) — one component, not two, matching the same "shared shape, per-instance
   sizing" convention `PhaseArchitectIcon`'s siblings already established. `ClockIcon` and `CheckIcon`
   (both already exist, added in earlier phases of this feature) are reused as-is via prop overrides —
   no new duration or verified-check icon is added.
4. **`app/tokens.css`** — add 7 new tokens (no existing token matches these values), correct 1 existing
   token's value, and rename 1 existing token whose name no longer matches its corrected value:
   - **Correct** `--gradient-testimonial-video`'s first color stop from `rgba(232, 119, 34, 0.92)` to
     the reference's exact `rgba(232, 119, 34, 0.88)` (`TechGrit Homepage.dc.html` line 640,
     `/speckit.analyze` finding H1 — this value correction belongs here, in the tokens task, not inside
     the `TestimonialsSection.tsx` edit in item 2 above, since Principle I values change in `tokens.css`
     first). This token's sole consumer (the video card's own background) is otherwise unaffected — the
     second stop (`rgba(154, 52, 18, 0.96)`) already matches the reference exactly.
   - `--gradient-testimonial-card: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));`
     (§ Gradients) — the text card's resting-state background; distinct from the flat `--color-glass-4`
     (0.04) it uses today, since the reference is a two-stop gradient, not a flat fill.
   - `--gradient-testimonial-edge-left: linear-gradient(-90deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.70) 82%);`
     (§ Gradients) — the track's new left-side fade (80px wide via the consuming element's own width,
     matching the reference's asymmetric treatment; the existing `--gradient-testimonial-edge` already
     matches the reference's 140px/95%-black right-side fade exactly and needs no change).
   - `--shadow-testimonial-hover-video: 0 24px 60px -20px rgba(232, 119, 34, 0.60);` (§ Shadows) — video
     card hover shadow (line 640).
   - `--shadow-testimonial-hover-text: 0 24px 54px -20px rgba(232, 119, 34, 0.28);` (§ Shadows) — text
     card hover shadow (line 671); distinct shape (`54px`/`0.28`) from the video card's (`60px`/`0.60`),
     not a shared token.
   - `--shadow-testimonial-avatar: 0 6px 16px -4px rgba(232, 119, 34, 0.55);` (§ Shadows) — text card
     avatar circle's shadow (line 683), currently missing entirely.
   - `--color-badge-ink-40: rgba(0, 0, 0, 0.40);` (§ Ink-scale) — the video card's duration-badge pill
     background (line 650); distinct from the VIDEO-label pill's own background below.
   - **Rename**: `--color-badge-ink-45` (`rgba(0, 0, 0, 0.45)`) → `--color-badge-ink-50: rgba(0, 0, 0, 0.50);`.
     Its sole existing consumer (this same file's VIDEO-label pill, line 649 of the reference) was built
     against an incorrect `0.45` value; the reference's actual value is `0.50`. Since this token has
     exactly one consumer (confirmed via search) and its old name no longer describes its corrected
     value, it is renamed in place rather than left as a misleadingly-named `-45` token now holding
     `0.50`, or duplicated as a second near-identical token.
   - `--radius-16: 16px;` (§ Radii, numbered tier alongside `--radius-3`/`-4`/`-6`/…) for the metrics
     card's border-radius — deliberately **not** a reuse of the existing `--radius-tile` (also 16px),
     which is explicitly annotated "Webinar hero collage tile corners" (a single-job token, same
     `/speckit.analyze`-flagged pattern as `--text-industry-title` vs. `--text-stat` in §14 above).
   - **Tokens reused, not duplicated** (all exact matches): `--color-border-orange-45` (0.45, video card
     border — corrects the current `border-border-orange`/0.38 mismatch), `--color-border-orange-medium`
     (0.50, text card hover border — already mapped, reused from §13), `--color-green` (`#34d399`,
     verified-badge text color), `--color-text-bright` (0.90, duration-badge text color), `--ls-wider`
     (0.10em, verified-badge tracking), `--text-3xs` (10.5px, verified-badge/duration-badge font-size),
     `--color-border-8`/`--color-glass-3`/`--blur-md`/`--space-8`/`--space-11` (metrics card
     border/background/blur/padding, all exact), `--color-border-14` (0.14, metrics card divider),
     `--gradient-phase-node` (avatar background, already correct today).
5. **`app/globals.css`** — map the 7 new/renamed tokens into `@theme inline` (alongside the existing
   gradient/shadow/ink-scale/radius mapping blocks), giving canonical `bg-[image:--gradient-testimonial-card]`
   (arbitrary-property, matching the existing `--gradient-testimonial-*` consumption pattern — these
   gradients have no bare Tailwind utility equivalent), `hover:shadow-testimonial-hover-video`/`-text`,
   `shadow-testimonial-avatar`, `bg-badge-ink-40`, `bg-badge-ink-50` (replacing the `-45` mapping key),
   and `rounded-16` classes. The renamed token's mapping line moves from `--color-badge-ink-45:
   var(--color-badge-ink-45);` to `--color-badge-ink-50: var(--color-badge-ink-50);`. The corrected
   `--gradient-testimonial-video` value flows through automatically — its existing mapping/consumption
   is unchanged, only the token's own value in `tokens.css` changes (item 4 above).

Nothing else changes. The lightbox/video-modal markup, the "Drag to explore more stories" hint row,
and the section's overall track/scroll-snap mechanics (aside from the cursor/snap-toggle addition
above) are already reference-correct and untouched.

## Technical Context (Testimonials addendum)

**Language/Version**: TypeScript 5 (strict) · **Primary Dependencies**: Next.js 16.2.10, React
19.2.4, Tailwind CSS v4 · **Storage**: N/A · **Testing**: N/A (manual verification, see
`quickstart.md`) · **Target Platform**: Web · **Project Type**: single Next.js App Router app ·
**Performance Goals**: N/A (CSS/markup-only changes plus native pointer-event handlers already in
place) · **Constraints**: no new libraries; zero visual change to any homepage section other than
Testimonials · **Scale/Scope**: 2 existing files edited (`TestimonialsSection.tsx`, `home-data.ts` —
`Testimonial.id` retrofit, `/speckit.analyze` finding C2) + 1 new icon export
(`components/ui/icons.tsx`) + `tokens.css`/`globals.css` additions (7 new tokens, 1 value correction,
1 rename).

## UI Design Approach (Testimonials)

**`frontend-design` skill invocation**: consulted for this addendum's 3 craft surfaces. **Quotation-mark
glyph** — kept as a single flat-fill decorative watermark at very low opacity (6%/14%, matching the
reference exactly) behind the card content, so it reads as a subtle textural cue ("this is a quote")
rather than competing with the quote text itself — one shape reused at two scales/opacities/colors
rather than two bespoke marks. **Trust-metrics card** — the glass-chip treatment
(`border-border-8`/`bg-glass-3`/`blur-md`) matches the same restrained, low-contrast glass language
already used for other secondary chrome in this codebase (filter bars, badges), so the metrics card
reads as "supporting proof," not a competing hero element next to the section title. **Drag
affordance** — the `grab`→`grabbing` cursor swap plus the temporary scroll-snap release makes the drag
gesture feel physically continuous (nothing fighting the user's own scroll position mid-drag), matching
the reference's own intent that this is a hand-draggable filmstrip, not a stepped carousel.

**Reconciliation with Principles I–V**: none needed — every value above is read directly from the
reference (Principle IV) and expressed via tokens, never a raw literal (Principle I); no new surface
fill is introduced (Principle V) — the metrics card and both hover shadows stay within the existing
glass/orange-glow vocabulary.

**Anchor files**: `app/_home-components/TestimonialsSection.tsx`, `app/_home-components/home-data.ts`
(`Testimonial` gains a required `id` field), `components/ui/icons.tsx` (1 new export: `QuoteIcon`),
`app/tokens.css` (7 new tokens, 1 value correction, 1 rename), `app/globals.css` (their `@theme inline`
mappings, including the renamed key).

## Project Structure (Testimonials addendum)

```text
app/_home-components/
├── TestimonialsSection.tsx  # header restructured to flex row (left text column + right metrics
│                             # card); paragraph left-aligned inside 640px column; new metrics-card
│                             # markup (own id-keyed local array); video card gains duration badge +
│                             # star rating + quote icon + corrected border/hover-shadow; text card
│                             # gains verified badge + quote icon + hover border-color/shadow + avatar
│                             # shadow; track gains left-edge fade; drag handlers gain cursor
│                             # grab/grabbing + scroll-snap toggle; both .map() sites re-key on
│                             # testimonial.id instead of testimonial.name
└── home-data.ts              # Testimonial gains a required id field, populated for all 6 entries
                               # (/speckit.analyze finding C2)

components/ui/
└── icons.tsx                 # + QuoteIcon (new); ClockIcon/CheckIcon reused as-is

app/tokens.css                # + --gradient-testimonial-card, --gradient-testimonial-edge-left,
                               #   --shadow-testimonial-hover-video, --shadow-testimonial-hover-text,
                               #   --shadow-testimonial-avatar, --color-badge-ink-40, --radius-16
                               # − --color-badge-ink-45 → renamed --color-badge-ink-50 (0.45 → 0.50)
                               # ~ --gradient-testimonial-video first stop corrected 0.92 → 0.88
                               #   (/speckit.analyze finding H1)
app/globals.css                # + matching @theme inline entries; renamed badge-ink mapping key
```

No `data-model.md`/`contracts/` (presentation-only, same as prior addenda). No other file is touched.

**Structure Decision**: existing single-project structure. The metrics-card content stays as a local
array inside `TestimonialsSection.tsx` rather than `home-data.ts`, since (unlike `DeliveryStat`) no
other section consumes it — adding it to the shared data module now would be speculative structure the
constitution's own anti-speculative-structure rule advises against; it is, however, still keyed on its
own local `id` field, not label text, since Principle III's stable-identity rule applies regardless of
which file the array lives in. `Testimonial.id` (item 1) is added to `home-data.ts` itself since
`TESTIMONIALS` already lives there — this is a field addition to existing shared content, not new
speculative structure.

## Complexity Tracking (Testimonials addendum)

*Empty — no violations.*

## Constitution Check (Testimonials addendum)

- **I (Token-Only Styling)** — PASS. All 7 new literal values are added to `tokens.css` first, in
  their existing numbered sections, before any markup consumes them; the 1 renamed token corrects a
  name/value mismatch discovered while reading the reference exactly (Principle I's naming-matches-value
  intent), rather than leaving a `-45`-named token holding `0.50`; a dedicated `--radius-16` is added
  instead of reusing the value-identical-but-single-job-annotated `--radius-tile`, following the same
  precedent as `--text-industry-title` vs. `--text-stat` in §14. The `--gradient-testimonial-video`
  opacity correction (`/speckit.analyze` finding H1) is made in this same tokens task, not inside the
  component edit — keeping the value-change and the component-consumption changes in their correct,
  separate tasks.
- **II (Breakpoints)** — PASS, not applicable (the metrics-card wrap behavior uses the header row's own
  `flex-wrap`, not a new breakpoint).
- **III (Component Library)** — PASS, with 1 pre-existing gap corrected. No component is forked;
  `QuoteIcon` is added to the constitution's single consolidated icon file following its existing
  convention, and `ClockIcon`/`CheckIcon` are reused via prop overrides exactly as `PhaseArchitectIcon`'s
  siblings already demonstrate for multi-size icon reuse. The cards themselves stay bespoke markup (not
  migrated to `GlassCard`) — no requirement in FR-009/FR-009a calls for that migration, and doing so
  unprompted would be scope creep beyond this addendum's ask. **Stable identity for repeated content**
  (`/speckit.analyze` finding C2): `TESTIMONIALS`' `.map()` render sites keyed on `testimonial.name` —
  display text, not a stable identity field — a pre-existing gap now fixed by adding `Testimonial.id`
  and re-keying both call sites on it, the same fix this feature already applied to `DeliveryStat` and
  `TrustedClientLogo` for the identical reason. The new local metrics-card array is keyed on its own
  `id` field from the start, for the same reason (finding L1).
- **IV (References Are Visual Truth)** — PASS. Every corrected value (border/gradient opacities, hover
  shadow shapes, badge background, per-card-type element split — including the video card's previously
  entirely-missing star rating, `/speckit.analyze` finding C1 — drag cursor/snap behavior) is read
  directly from `TechGrit Homepage.dc.html` (markup lines 606-703, script lines 1208-1221), including
  correcting 3 pre-existing deltas from the reference that predate this feature (video card border
  0.38→0.45, VIDEO-label pill background 0.45→0.50, video-card gradient first stop 0.92→0.88 —
  `/speckit.analyze` finding M1 corrects this count from an earlier draft that only listed 2 of the 3).
- **V (Dark-First Brand)** — PASS. No new surface fill; both new hover shadows and the metrics-card
  glass chip stay within the existing translucent/glow vocabulary, orange accent stays confined to
  glows/borders/icons, never a fill.
- **VI (frontend-design skill)** — PASS, invoked; see UI Design Approach above.
- No violations — Complexity Tracking is empty.

## Post-Design Constitution Re-Check (Testimonials addendum)

Research (Phase 0 of this addendum) confirmed every new token value and the single-consumer rename
before any file changed, and confirmed the per-card-type element split against the reference's actual
markup (not the spec's original, since-corrected acceptance-scenario wording). **Revised after
`/speckit.analyze`**: 3 findings (C1, C2, H1) surfaced gaps this addendum's first draft missed — the
video card's entirely-absent star rating (C1), the pre-existing `testimonial.name`-keyed `.map()`
violating Principle III's stable-identity rule (C2), and a token-value correction specified inside the
wrong task (H1) — all now folded into this addendum's Summary/Constitution Check above, rather than
left as a gap between planning and implementation. 2 further findings (M1, M2) corrected internal
count mismatches within this document itself (2→3 pre-existing deltas; 6→7 new tokens); 1 finding (L1)
pre-emptively specified stable `id`-keying for the new metrics-card array before it was ever
implemented. No new violations beyond what's now fixed above. Gate: PASS.

## Homepage Blog Teaser Section (FR-010)

**Date**: 2026-08-06. Extends this Phase 2 addendum to also cover the new homepage Blog teaser
section, per spec.md FR-010 and Clarifications Session 2026-08-06. Hero, Trusted Clients, Subscribe
Band, Methodology, Re-Imagine, Industries, and Testimonials above are unaffected; Life at TechGrit and
the final CTA remain unplanned. `frontend-design` skill consulted for this addendum's craft surfaces
(the 3 decorative icons and the per-card gradient/glow treatment) — see UI Design Approach below.

This section does not exist today — no `app/_home-components/BlogSection.tsx`, no render call in
`app/page.tsx`. Per spec.md Clarifications (Session 2026-08-06), its 3 cards use
`TechGrit Homepage.dc.html`'s own literal, reference-authored content (lines 785-821) verbatim — topic
label, title, excerpt, read-time, decorative icon, and per-card gradient-tint background — rather than a
dynamic pull from the 9 real posts in `app/blog/_data/blog-content.ts` (which has no icon field, no
featured/top-3 concept, and only placeholder `"#"` hrefs). Both the ghost button and every card's "Read
more" link go to `/blog`.

1. **`components/ui/icons.tsx`** — add 3 new named icon exports, extracted verbatim from the
   reference's 3 decorative header icons (lines 789/801/813), following the file's existing
   `IconProps`/`{...props}`-last convention: `BlogConstellationIcon` (circle + 8 radiating strokes, card
   1 — "AI-First SDLC"), `BlogCodeBracketIcon` (two opposing chevrons, `</>`, card 2 — "Engineering"),
   `BlogPackageIcon` (3D box outline + seam lines, card 3 — "Quality"). Unlike the file's existing
   colored-circle-badge icons (`IndustryFinTechIcon` et al., which hardcode `stroke="#fff"`), these
   hardcode `stroke="var(--color-icon-stroke)"` — the existing, exact-match token for "decorative SVG
   icon stroke" (already used by the Case Studies panels), reused here rather than duplicating its
   `rgba(255,255,255,0.85)` value as a second literal.
2. **`app/tokens.css`** — add 15 new tokens, none of which exist today at these exact values, each in
   its existing numbered section:
   - **§5 Gradients**: `--gradient-blog-teaser-orange: linear-gradient(150deg, rgba(232, 119, 34, 0.28),
     rgba(154, 52, 18, 0.50));`, `--gradient-blog-teaser-blue: linear-gradient(150deg, rgba(2, 132, 199,
     0.28), rgba(3, 60, 90, 0.50));`, `--gradient-blog-teaser-teal: linear-gradient(150deg, rgba(15, 118,
     110, 0.30), rgba(6, 52, 48, 0.50));` — each card's header-block background (lines 787/799/811). Per
     this codebase's established gradient-token convention (`--gradient-testimonial-video`,
     `--gradient-phase-node`), each is one composite literal-value token, not decomposed into separately
     referenced stop tokens — card 1's first stop happens to numerically equal the existing
     `--color-overlay-orange-strong` (0.28), which is not a Principle I conflict, since the codebase's
     gradient tokens are already written as literal composites, never `var()`-nested stops.
   - **§4 Borders & Glass**: `--color-glow-white-18: rgba(255, 255, 255, 0.18);` (the radial highlight
     overlay shared by all 3 card headers, lines 788/800/812 — a distinct semantic job from the
     value-identical `--color-border-18`, which is annotated "Phase-node border — todo state", the same
     single-job concern `/speckit.analyze` already raised for `--text-industry-title`/`--radius-16`);
     `--color-border-blue-55: rgba(2, 132, 199, 0.55);` (card 2 hover border, line 798 — distinct from
     the existing `--color-border-blue-strong` at 0.60); `--color-border-teal-60: rgba(15, 118, 110,
     0.60);` (card 3 hover border, line 810 — distinct from the existing `--color-border-teal-strong` at
     0.70). Card 1's hover border (`rgba(232, 119, 34, 0.55)`, line 786) is an exact match for the
     existing `--color-hover-orange-border-55` and is reused verbatim — no new token.
   - **§2 Text Colors**: `--color-text-35: rgba(255, 255, 255, 0.35);` (the topic/read-time meta row's
     dot separator, lines 792/804/816 — no existing text-color token sits at exactly 0.35; the
     read-time text itself, `rgba(255,255,255,0.55)`, is an exact match for the existing
     `--color-text-55` and is reused verbatim).
   - **§6 Typography**: `--text-blog-meta: 12px;` (the topic/read-time label size — deliberately not a
     reuse of the value-close-but-not-exact `--text-2xs` at 12.5px, a genuine 0.5px miss this session's
     pixel-perfectness direction does not accept) and `--ls-blog-meta: 0.14em;` (the same label's
     tracking — deliberately not a reuse of the value-identical `--ls-hint`, annotated "Methodology
     scroll-hint caption", the same single-job-token precedent as `--text-industry-title` vs.
     `--text-stat` and `--radius-16` vs. `--radius-tile` elsewhere in this feature).
   - **§10 Shadows**: `--shadow-blog-teaser-orange`/`-blue`/`-teal: 0 0 40px -8px rgba(<card-color>,
     0.15);` (each card's resting-state shadow, lines 786/798/810) and
     `--shadow-blog-teaser-orange-hover`/`-blue-hover`/`-teal-hover: 0 0 60px -6px rgba(<card-color>,
     0.35);` (each card's hover shadow, same lines) — 6 tokens, 2 distinct shapes (`40px -8px`/`0.15` vs.
     `60px -6px`/`0.35`), 3 colors each; none matches any existing shadow token's shape+value pair
     (the closest, `--shadow-reimagine-glow`/`-soft`, is a different shape, `0 0 60px -10px`).
   - **No new token needed** for the card's base chrome: the reference's `20px` radius, `rgba(255,255,255,0.04)`
     background, `rgba(255,255,255,0.1)` border, and `8px` backdrop-blur are exact matches for the
     existing `--radius-2xl`, `--color-glass-4`, `--color-border-image`, and `--blur-md` — all reused
     verbatim (the last two already power every other `GlassCard` variant's shared base classes).
3. **`app/globals.css`** — map T-item-2's 15 new tokens into `@theme inline` (the 3 gradients via the
   existing arbitrary-property pattern already used for `--gradient-testimonial-*`, no bare-utility
   equivalent; the rest as canonical utilities: `bg-glow-white-18`, `border-border-blue-55`,
   `border-border-teal-60`, `text-35`, `text-blog-meta`, `tracking-blog-meta`,
   `shadow-blog-teaser-orange`/`-blue`/`-teal`, `hover:shadow-blog-teaser-orange-hover`/`-blue-hover`/
   `-teal-hover`). **Also add** two missing spacing mappings this section's own markup needs and that
   `tokens.css` already defines but `globals.css` never mapped — `--spacing-tg-6: var(--space-6);` (16px,
   needed for the "Read more" row's `margin-top`) and `--spacing-tg-10: var(--space-10);` (24px, needed
   for the card body's top padding) — exactly the "token exists, no `@theme inline` entry" bug class this
   session's own CLAUDE.md calls out explicitly; both existing tokens were simply never given a canonical
   utility before now, since no prior section happened to need 16px/24px via this specific `tg-` naming
   scheme.
4. **`components/ui/GlassCard.tsx`** — add `"blogTeaser"` as a new member of the `GlassCardVariant` union
   (a required prerequisite, since all 4 `Record<GlassCardVariant, string>`s below only type-check once
   it exists in that union), then add a matching entry to each: `CARD_VARIANTS.blogTeaser` —
   `"flex flex-col overflow-hidden rounded-2xl border-border-image bg-glass-4 hover:-translate-y-[6px]"`
   (matching the reference's `translateY(-6px)` hover lift, line 786, distinct from every other variant's
   `-5px`); `ICON_VARIANTS.blogTeaser` — `"h-18 w-18"` (72px, Tailwind's own canonical default scale step
   — no dedicated size token needed, unlike this feature's other one-off arbitrary sizes); `TITLE_VARIANTS.blogTeaser`
   — `"mt-tg-4 text-[19px] font-bold text-white leading-[1.32]"` (12px top margin via the existing
   `--space-4`/`tg-4` mapping, already canonical); `DESC_VARIANTS.blogTeaser` —
   `"mt-tg-3 text-[14.5px] leading-[1.6] text-muted"` (`text-muted` added explicitly, per the same
   silent-inheritance lesson `/speckit.analyze` already flagged for the Industries variant's description
   color). This is a new, distinct variant from the existing `"blogCard"`/`"blogFeatured"` (different
   shape — a full 190px icon-centered header block, not a 140px topic-badge-overlay header with an
   author-avatar footer) — not a fork of either, and neither existing variant's `Record` entries change.
5. **New `app/_home-components/BlogSection.tsx`** — a local `BLOG_TEASER_POSTS` array of 3 entries (each
   carrying its own `id` field from the start, per this feature's established Principle III
   stable-identity convention — `TestimonialsSection`'s metrics cells, `Hero`'s `DeliveryStat`s, and
   `TrustedClients`' logos all did the same rather than keying on display text), holding the reference's
   literal `topic`/`title`/`excerpt`/`readTime`/`icon`/per-card gradient-class/hover-border-class/
   hover-shadow-class/resting-shadow-class/topic-text-color-class fields — this array lives in this file,
   not `home-data.ts`, since (like the Testimonials metrics array) no other section consumes it, and
   adding it to the shared data module now would be speculative structure. The section's own outer
   `<section>` wrapper uses `max-w-(--container-max) px-9 pt-tg-21 pb-20` (matching the reference's
   `max-width:1280px; padding:60px 36px 80px`, line 777 — `--space-21`/`px-9`/`pb-20` are all already-
   canonical, no new token needed), the same container convention `IndustriesSection`/`TestimonialsSection`
   already use. The section renders:
   - A left-aligned header (hand-rolled eyebrow — `"From the blog"`, `text-2xs font-bold tracking-widest
     text-orange uppercase`, matching `TestimonialsSection`'s own bespoke-markup eyebrow convention, not
     the `SectionEyebrow` component, since neither sibling section on this page uses it and FR-010 does
     not call for dash removal — plus an `h2` — `"Perspectives on AI-first delivery."`,
     `text-[clamp(30px,3.6vw,42px)] font-bold leading-[1.06] tracking-[-0.03em] text-white max-w-[560px]`,
     the identical clamp `LifeGallery.tsx` already uses elsewhere on this same page) alongside a
     right-aligned ghost `<Button href="/blog" variant="ghost">` (`"Visit the blog"` + a
     `text-orange` arrow span, matching `IndustriesSection`'s own ghost-button-with-arrow convention
     exactly), both inside the same `flex flex-wrap items-end justify-between gap-6 mb-tg-15` row
     `IndustriesSection`'s own header already establishes. The button's own `className` override —
     `"px-tg-9! py-tg-5a! min-h-tg-19a!"` — corrects `Button`'s shared `md` default (`26px`/`14px`) to the
     reference's own `22px`/`15px`/`52px` (lines 783, canonical `tg-9`/`tg-5a`/`tg-19a` classes, all
     already-mapped exact matches — not a new arbitrary-value override).
   - A 3-card grid (`grid grid-cols-3 gap-6 max-tg-md:grid-cols-1`) over `BLOG_TEASER_POSTS`, each card an
     `<a href="/blog" style={{ display: "contents" }}>` (matching `/blog`'s own `blog-post-grid.tsx` and
     `IndustriesSection`'s established whole-card-link convention) wrapping a
     `<GlassCard variant="blogTeaser" hoverBorderColor={post.hoverBorderClass} className={post.shadowClasses}>`
     containing: a `relative flex h-[190px] items-center justify-center overflow-hidden` header block
     with `bg-[image:var(--gradient-blog-teaser-*)]` (per-card), an `absolute inset-0` radial-highlight
     div (`bg-glow-white-18`, per-card `[background-position]` matching the reference's 30%/70%/50%
     positions) and a centered `<GlassCardIcon variant="blogTeaser"><post.icon
     className="text-icon-stroke" /></GlassCardIcon>`; then a body (`pt-tg-10 px-tg-11 pb-tg-12`) holding
     a meta row (`flex items-center gap-tg-3 text-blog-meta font-bold tracking-blog-meta uppercase` —
     topic in `post.topicColorClass`, a `text-35` dot, read-time in `text-55`), a
     `<GlassCardTitle variant="blogTeaser">`, a `<GlassCardDescription variant="blogTeaser">`, and a
     `"Read more"` + arrow row (`mt-tg-6 inline-flex items-center gap-tg-1b text-sm font-bold`, in the
     card's own `post.topicColorClass`).
6. **`app/page.tsx`** — render `<BlogSection />` between `<CaseStudiesSection />` and `<LifeGallery />`,
   matching the reference's own document order (Testimonials → Case Studies → home-blogs → Inside
   TechGrit, lines 606-825).

Nothing else changes. Hero, Trusted Clients, Subscribe Band, Methodology, Re-Imagine, Industries,
Testimonials, and Case Studies are untouched; Life at TechGrit and the final CTA remain unplanned.

**UI Design Approach (Blog teaser)**: `frontend-design` skill consulted for this addendum's 2 craft
surfaces. **Decorative icons** — each stays a simple 2-stroke glyph at a low, semi-transparent opacity
via `--color-icon-stroke` (already the codebase's exact convention for "icon as texture, not focal
point" elsewhere), so the icon reads as ambient card decoration behind/within its gradient header rather
than competing with the card's title below it — matching the reference's own treatment exactly, not
inventing a bolder icon-forward look. **Per-card gradient/glow identity** — the 3 cards' orange/blue/teal
palette reuses hues already established elsewhere on this exact page (Industries' badge colors,
Testimonials' avatar-ring colors), so the Blog section reads as "one more voice in an already-consistent
color system," not a fourth, unrelated palette introduced solely for this section.

**Constitution check** — PASS on all six principles: all 15 new literal values are added to
`tokens.css` first, in their existing numbered sections, before any component consumes them (Principle
I) — including 2 deliberately-dedicated tokens (`--text-blog-meta`, `--ls-blog-meta`) rather than reusing
value-close-or-value-identical-but-differently-scoped tokens (`--text-2xs`, `--ls-hint`), following this
feature's own established precedent (`--text-industry-title`, `--radius-16`); no component is forked —
`blogTeaser` is a new, additive `GlassCard` variant, following the exact same `Record`-entry pattern
every prior variant in this feature used, and the 3 new icons join the constitution's single
consolidated icon file (Principle III); every value (colors, gradients, icon shapes, card content,
button padding, document order) is read directly from `TechGrit Homepage.dc.html` lines 776-825, not
invented — including the deliberate choice to keep the 3 cards' content static/reference-exact rather
than dynamically sourced from `/blog`'s real post data, per spec.md's own Clarifications (Principle IV);
no new surface fill — the per-card gradients stay confined to a 190px header block within an otherwise
translucent glass card, never a full-bleed page surface (Principle V). Canonical Tailwind classes are
used throughout in preference to arbitrary-value syntax wherever a token exists or is newly mapped
(`rounded-2xl`, `bg-glass-4`, `border-border-image`, `h-18`, `w-18`, `mt-tg-4`, `mt-tg-3`, `mt-tg-6`,
`gap-tg-3`, `gap-tg-1b`, `gap-6`, `mb-tg-15`, `pt-tg-10`, `px-tg-11`, `pb-tg-12`, `px-tg-9!`, `py-tg-5a!`,
`min-h-tg-19a!`, `text-blog-meta`, `tracking-blog-meta`, `text-35`, `text-55`, `text-amber-light`,
`text-blue-light`, `text-teal-light`, `text-orange`, `bg-glow-white-18`, `border-border-blue-55`,
`border-border-teal-60`, `shadow-blog-teaser-orange`/`-blue`/`-teal`,
`hover:shadow-blog-teaser-orange-hover`/`-blue-hover`/`-teal-hover`) — the only remaining arbitrary-value
classes are the single-usage `h-[190px]` header height and the `text-[19px]`/`leading-[1.32]`/
`text-[14.5px]` typography values, none of which has an existing or newly-warranted token (consistent
with this feature's own precedent for one-off values, e.g. the Re-Imagine grid's `h-[180px]` image slot).

**Anchor files**: `components/ui/icons.tsx` (3 new exports: `BlogConstellationIcon`,
`BlogCodeBracketIcon`, `BlogPackageIcon`), `app/tokens.css` (15 new tokens across §2/§4/§5/§6/§10),
`app/globals.css` (their `@theme inline` mappings, plus the 2 missing `--spacing-tg-6`/`--spacing-tg-10`
mappings), `components/ui/GlassCard.tsx` (new `"blogTeaser"` variant across all 4 `Record`s), new
`app/_home-components/BlogSection.tsx`, and `app/page.tsx` (`<BlogSection />` render call) — no
`data-model.md`/`contracts/` change (presentation-only, same as every prior addendum in this plan), no
other homepage section or page touched.

## Post-Design Constitution Re-Check (Blog Teaser addendum)

Research (Phase 0 of this addendum) confirmed every new token value against the reference directly, and
confirmed 2 pre-existing `tokens.css` entries (`--space-6`, `--space-10`) had never been given an
`@theme inline` mapping before now — the same missing-mapping bug class this session's CLAUDE.md calls
out — before any file changed. No new violations. Gate: PASS.

## Homepage Life at TechGrit Section (FR-011)

**Date**: 2026-08-06. Extends this Phase 2 addendum to also cover the homepage's Life at TechGrit
section (`app/_home-components/LifeGallery.tsx`, `home` variant only), per spec.md FR-011, FR-044, and
Clarifications Session 2026-08-06. Hero, Trusted Clients, Subscribe Band, Methodology, Re-Imagine,
Industries, Testimonials, and the Blog teaser above are unaffected; only the final CTA remains
unplanned. **Scoped strictly to FR-011 by direct instruction**: the `careers` variant's own rendered
output (Careers page) does not change, even though this addendum's baseline-recreation step (below)
touches the same file. `frontend-design` skill consulted for this addendum's craft surfaces (the
caption-reveal treatment and the eyebrow migration) — see UI Design Approach below.

**Baseline-recreation prerequisite** (per spec.md Clarifications, Session 2026-08-06): a teammate's
unmerged branch has already refactored `LifeGallery.tsx` into a `variant`/`columns`-based shared
component — adding a `captionLabel`/`caption` pair to `LifeGalleryImage`, an aspect-ratio-driven bordered
tile with a hover-caption overlay for the `careers` branch (its own caption rendering left commented
out), and `scroll-mt-[96px]` on the `<section>` — a structure not yet on `dev`. Before any FR-011 edit,
this feature's branch recreates that exact structure byte-for-byte (both variants, `careers`' caption
block staying commented out exactly as supplied), so the parts FR-011 doesn't touch stay textually
identical to the teammate's version and merge conflict-free once that branch lands. FR-011's own changes
(below) are layered on top of that recreated baseline, scoped to the `home` branch only.

Today's `home` branch (post-recreation) uses a 3-column asymmetric grid
(`grid-cols-[1.4fr_1fr_1fr]`, `auto-rows-[200px]`, `tall`/`wide`/`wide3` spans via `SPAN_CLASSES`) with
plain, unbordered, caption-less tiles, and a hand-rolled eyebrow (`<span className="h-[2px] w-6
bg-orange" />` accent line + text) — both diverge from `TechGrit Homepage.dc.html` (lines 826-878),
which shows a uniform 4-column grid (`repeat(4,1fr)`, `16px` gap, `aspect-ratio:3/4` per tile, no span
concept at all), each tile bordered/backed exactly like the recreated `careers` branch's own tile shell
and revealing a category-label + caption on hover, plus a plain-text eyebrow with no accent-line
decoration.

1. **`app/_home-components/home-data.ts`** — populate the already-existing (post-recreation)
   `captionLabel`/`caption` fields on all 4 `CULTURE_GALLERY_IMAGES` entries with the reference's
   literal per-tile text (lines 844/852/860/868): `glasses.png` → `"The team"` / `"Builders and
   designers behind the engineering."`; `rooftop.png` → `"The office"` / `"Rooftop breaks, real
   conversations."`; `painting.png` → `"Craft"` / `"We take craft seriously — inside & outside
   code."`; `diwali.png` → `"Together"` / `"We celebrate wins — and Diwali — together."`. **Also**
   (`/speckit.analyze` finding C1) — add a required `id: string` field to `CultureGalleryImage`,
   populated for all 4 entries (`"glasses"`, `"rooftop"`, `"painting"`, `"diwali"`, derived from each
   entry's filename, not re-derived from `src`/index at render time). This closes a pre-existing
   Principle III ("Stable identity for repeated content") gap: `LifeGallery.tsx`'s `.map()` over
   `CULTURE_GALLERY_IMAGES` keys on `` `${item.src}-${index}` `` today — a derived stopgap, not a
   stable field — and item 3 below rewrites this exact render, the same trigger point that already
   prompted this fix 3 times earlier in this feature (`DeliveryStat.id`, `TrustedClientLogo.id`,
   `Testimonial.id`). The `span` field is left in place on the type (still consumed by the `careers`
   branch's own `SPAN_CLASSES` lookup, unaffected by this addendum) but is no longer read by the
   rewritten `home` branch (item 3 below renders a fixed 4-column grid, not a span-driven one) — not
   removed from the type, since `careers`-supplied image arrays
   (`careersPageContent.lifeAtTechGrit.images`) still populate it and removing the field would be an
   unrelated breaking change outside this addendum's file list. **Also** (`/speckit.analyze` finding
   M1) — correct the `LifeGalleryImage` interface's 2 doc comments inherited verbatim from the
   baseline recreation ("Careers-only hover-caption category label... Left `undefined` for `home`"),
   which become factually wrong the moment this addendum populates and renders these same fields for
   `home` — reworded to describe both fields as populated for both variants, `careers`' own caption
   block simply not yet rendering them (still commented out, unaffected by this addendum).
2. **`components/ui/section-eyebrow.tsx`** — no change; this addendum's item 3 becomes its 5th
   consumer to date, exercising the already-existing `showAccent={false}` prop (added earlier in this
   feature's Phase 1) exactly as `FR-006`/`FR-017`/`FR-019`/`FR-033` already do — closing the gap FR-044
   flagged for Life at TechGrit's own eyebrow.
3. **`app/_home-components/LifeGallery.tsx`** (`home` branch only — the `careers` branch, its
   `SPAN_CLASSES` map, and every non-`home` code path from the baseline-recreation step above are
   untouched):
   - The hand-rolled eyebrow markup (the accent-line `<span>` + `<span className="text-[12.5px]
     font-bold tracking-widest text-orange uppercase">`) is replaced with `<SectionEyebrow
     showAccent={false}>Inside TechGrit</SectionEyebrow>` — verified byte-for-byte equivalent output
     (both resolve to the same `.eyebrow` class's `--text-2xs`/`--fw-bold`/`--ls-widest`/`--color-orange`
     values and the same `mb-4 inline-flex items-center gap-3` wrapper), per this feature's established
     "migrate to the shared primitive, zero visual change" precedent (Hero's Live-Webinar badge → `Badge
     tone="live"`, Phase 2 addendum above).
   - The tile grid becomes `grid grid-cols-4 gap-tg-6 max-tg-md:grid-cols-2 max-tg-sm:grid-cols-1`
     (`--space-6`/16px gap, already canonical via `gap-tg-6` — mapped for the Blog Teaser addendum
     above and reused verbatim here — matching the reference's `repeat(4,1fr)`/`16px` exactly), replacing
     `gridColsClass`/`auto-rows-[200px]`/`SPAN_CLASSES` for this branch entirely — there is no longer a
     row-height or span concept for `home`, matching the reference, which sizes every tile purely by
     `aspect-ratio:3/4`.
   - Each tile becomes `<figure className="group relative m-0 aspect-3/4 overflow-hidden rounded-xl
     border-border-8 bg-glass-3 transition-transform duration-300 ease-tg-glass hover:-translate-y-1">`
     (`aspect-3/4` — Tailwind's own canonical aspect-ratio utility, `rounded-xl`/`border-border-8`/
     `bg-glass-3` all exact-match reused tokens — see research.md §17 — `hover:-translate-y-1`, Tailwind's
     canonical 4px step, corrects the recreated `careers` branch's arbitrary `hover:-translate-y-[4px]`
     for this new `home`-only markup per this session's "Tailwind must use canonical classes" direction;
     the `careers` branch's own arbitrary class is left exactly as recreated, since correcting it is
     outside FR-011's scope) containing `<MediaSlot src={item.src} alt={item.alt} fill sizes="(max-width:
     960px) 50vw, 25vw" />` (the `sizes` string's last stop corrects from the old span-driven `33vw` to a
     flat 4-column `25vw`, matching the new uniform grid) and a caption overlay:
     `<figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-1.5
     bg-[image:var(--gradient-life-cap)] px-tg-7 pt-tg-9 pb-tg-7 opacity-0 transition-[opacity,transform]
     duration-300 group-hover:translate-y-0 group-hover:opacity-100">` wrapping a `<div className="mb-1
     text-11 font-bold tracking-life-cap text-amber-light uppercase">{item.captionLabel}</div>` and a
     `<p className="text-xs font-semibold leading-[1.35] text-white">{item.caption}</p>` — the same
     `group`/`group-hover` reveal mechanic the recreated `careers` branch already demonstrates for its own
     (still-commented-out) caption block, applied here since FR-011's reference shows captions active on
     `home`. The `.map()` call itself keys on `item.id` (item 1's new field, `/speckit.analyze` finding
     C1), not `` `${item.src}-${index}` ``.
   - The two action buttons below the grid (`Explore Careers` gradient button, `Meet the team` ghost
     button) are already reference-correct from the baseline recreation and Phase 1's `Button.tsx` ghost
     update — no change.
4. **`app/tokens.css`** — add 2 new tokens, in their existing numbered sections (research.md §17 has the
   full reuse/no-new-token accounting): `--gradient-life-cap: linear-gradient(180deg, transparent, rgba(0,
   0, 0, 0.82));` (§ Gradients — the life-tile caption's bottom fade, `TechGrit Homepage.dc.html` line 843
   — deliberately a dedicated token, not a reuse of the value-identical `--gradient-testimonial-fade`,
   which is annotated "Testimonials video-card bottom fade," a distinct single job, following this
   feature's own `--text-industry-title`/`--radius-16` precedent) and `--ls-life-cap: 0.14em;` (§
   Typography — the caption label's tracking, line 844 — likewise not a reuse of the value-identical
   `--ls-hint`/`--ls-blog-meta`, both already single-job-annotated for other components).
5. **`app/globals.css`** — map both new tokens into `@theme inline`: `--gradient-life-cap` via the
   existing arbitrary-property consumption pattern already used for `--gradient-testimonial-*` (no bare
   utility equivalent for a composite gradient), giving `bg-[image:var(--gradient-life-cap)]`; `--ls-
   life-cap` as a canonical `tracking-life-cap` utility, alongside the existing `tracking-blog-meta`/
   `tracking-hint` mapping entries.

Nothing else changes. The recreated `careers` branch (and every page that consumes it), the two action
buttons, and every other homepage section remain exactly as they were before this addendum.
**Known, deliberately-deferred delta** (`/speckit.analyze` finding L1): the recreated `careers`
branch's tile radius (`rounded-[20px]`, from the teammate's unmerged code) doesn't match
`TechGrit Careers.dc.html`/`TechGrit About.dc.html`'s own reference value (`18px`) — a pre-existing
mismatch, correctly left untouched since it's outside FR-011's scope; recorded here so it isn't
silently forgotten once the teammate's branch merges, for a future Careers-page pass to pick up.

## UI Design Approach (Life at TechGrit)

**`frontend-design` skill invocation**: consulted for this addendum's 2 craft surfaces. **Caption
reveal** — the label+caption pair stays hidden until hover (`opacity-0` → `opacity-100`, paired with a
small `translate-y-1.5` → `0` lift), the same restrained "reward the hover, don't compete with the resting
grid" treatment the recreated `careers` branch's own (dormant) caption block already models — so
activating it for `home` reads as consistent with a pattern already present in this file, not a new
interaction language. **Eyebrow migration** — routing through `SectionEyebrow` rather than leaving a
second hand-rolled copy keeps the "no accent line" treatment sitewide-consistent (Principle V's sparing
accent use extends to knowing when *not* to add one), closing FR-044's gap for this section without
introducing any new visual language of its own.

**Reconciliation with Principles I–V**: none needed — the caption gradient/tracking values are read
directly from the reference and expressed via 2 new dedicated tokens (Principle I); the eyebrow migration
extends an existing primitive rather than forking it (Principle III); no new surface fill — the caption
overlay is a translucent-to-black fade over imagery, not a new color surface (Principle V).

**Anchor files**: `app/_home-components/LifeGallery.tsx` (`home` branch only), `app/_home-components/
home-data.ts` (`CultureGalleryImage` gains a required `id` field; `CULTURE_GALLERY_IMAGES` gains
populated `id`/`captionLabel`/`caption` values and 2 corrected doc comments), `app/tokens.css` (2 new
tokens: `--gradient-life-cap`, `--ls-life-cap`), `app/globals.css` (their `@theme inline` mappings) — no
`app/page.tsx` change (the existing bare `<LifeGallery />` call needs no new props), no
`data-model.md`/`contracts/` change, `careers/page.tsx`'s `<LifeGallery variant="careers" columns={4}>`
call and the `careers` branch's rendered output unaffected.

**Constitution check** — PASS on all six principles: both new literal values are added to `tokens.css`
first, in their existing numbered sections, as dedicated single-job tokens rather than reusing
value-identical-but-differently-scoped tokens, following this feature's own established precedent
(Principle I); `SectionEyebrow` is extended by reuse, not forked, and no `careers`-branch code is
modified (Principle III). **Stable identity for repeated content** (`/speckit.analyze` finding C1):
`CULTURE_GALLERY_IMAGES`' `.map()` render site keyed on `` `${item.src}-${index}` `` today — a derived
stopgap, not a stable identity field — a pre-existing gap now fixed by adding `CultureGalleryImage.id`
and re-keying `home`'s rewritten render on it (item 1/item 3 above), the same fix this feature already
applied to `DeliveryStat`, `TrustedClientLogo`, and `Testimonial` for the identical reason; every
corrected value (grid shape, tile border/background/radius, caption content/gradient/tracking, eyebrow
treatment) is read directly from `TechGrit Homepage.dc.html` lines 826-881, not invented (Principle IV);
no new surface fill, no light-surface token introduced (Principle V). Canonical Tailwind classes are
used throughout in preference to arbitrary-value syntax wherever a token exists (`grid-cols-4`,
`gap-tg-6`, `max-tg-md:grid-cols-2`, `max-tg-sm:grid-cols-1`, `aspect-3/4`, `rounded-xl`,
`border-border-8`, `bg-glass-3`, `hover:-translate-y-1`, `px-tg-7`, `pt-tg-9`, `pb-tg-7`, `text-11`,
`tracking-life-cap`, `text-amber-light`, `text-xs`) — the only remaining arbitrary-value classes are the
`bg-[image:var(--gradient-life-cap)]` arbitrary-property (no bare-utility equivalent for a composite
gradient, the same pattern already established for `--gradient-testimonial-*`/`--gradient-blog-teaser-*`)
and `leading-[1.35]`, a single-usage typography value with no existing or newly-warranted token,
consistent with this feature's own precedent for one-off values.

## Post-Design Constitution Re-Check (Life at TechGrit addendum)

Research (Phase 0 of this addendum) confirmed both new token values against the reference directly, and
confirmed the recreated `careers` branch's existing (dormant) caption-reveal markup as the pattern to
follow for `home`'s newly-activated captions, before any file changed. **Revised after
`/speckit.analyze`**: 3 findings surfaced gaps this addendum's first draft missed — the pre-existing
`` `${item.src}-${index}` `` render key violating Principle III's stable-identity rule (C1, now fixed via
`CultureGalleryImage.id`), spec.md's Acceptance Scenario 7 not testing FR-011's eyebrow clause (H1, now
corrected in spec.md directly), and 2 stale doc comments the baseline recreation would otherwise have
carried forward unchanged (M1, now corrected) — all folded into this addendum's Summary/Constitution
Check above. 1 further finding (L1) recorded the recreated `careers` branch's own pre-existing
20px-vs-18px radius delta as a known, deliberately-deferred item for a future pass, not a gap in this
addendum. No new violations beyond what's now fixed above. Gate: PASS.

## Homepage Final CTA Section (FR-012)

**Date**: 2026-08-06. Extends this Phase 2 addendum to also cover the homepage's closing CTA section
(`app/_home-components/FinalCta.tsx`), per spec.md FR-012 and Clarifications Session 2026-08-06. Hero,
Trusted Clients, Subscribe Band, Methodology, Re-Imagine, Industries, Testimonials, the Blog teaser, and
Life at TechGrit above are unaffected — this is the last unplanned piece of User Story 1.
`frontend-design` skill consulted for this addendum's one craft surface (the secondary link's
resting/hover distinction) — see UI Design Approach below.

Today's implementation (`FinalCta.tsx`) diverges from `TechGrit Homepage.dc.html` (lines 886-902) in
exactly the two ways FR-012 names: the outer container is `max-w-[1180px]` against the reference's
`max-width:1280px` (the same width every other homepage section in this feature already uses); and the
secondary "explore the framework" link is `15.5px`/`text-primary` (solid white, no hover state) with a
`0.60`-opacity underline, against the reference's `14.5px`/`600`-weight/`rgba(255,255,255,0.70)` resting
color that brightens to solid white only on hover, with a `0.50`-opacity underline. Per Clarifications,
the link's copy also updates to the reference's literal wording.

1. **`app/tokens.css`** — add 1 new token, in its existing numbered section (research.md §18): `--color-
   text-cta-link: rgba(255, 255, 255, 0.70);` (§ Text Colors — the secondary link's resting color, line
   897). The value is an exact numeric match for both the existing `--color-text-quiet` ("CTA banner
   paragraph copy") and `--color-text-70` ("Methodology phase-node text — todo state") — both
   single-job-annotated for a different element, the same concern already raised for `--text-industry-
   title`/`--radius-16`/`--ls-life-cap` earlier in this feature. A dedicated token is added rather than
   repurposing either.
2. **`app/globals.css`** — map the new token into `@theme inline` (`--color-text-cta-link: var(--color-
   text-cta-link);`, alongside the existing text-color mapping block), giving a canonical `text-text-
   cta-link` utility.
3. **`app/_home-components/FinalCta.tsx`**:
   - The outer container's `max-w-[1180px]` becomes `max-w-(--container-max)` — the canonical
     CSS-variable-arbitrary-value syntax this feature already uses sitewide for the reference's `1280px`
     width (`Hero.tsx`, `IndustriesSection.tsx`, `ReImagineSection.tsx`, `BlogSection.tsx`, …), not a raw
     `max-w-[1280px]` literal. The inner card's own padding/radius/blur (already reference-correct) are
     unchanged.
   - The secondary link's classes change from `text-15-5 font-semibold text-primary` to `text-14-5
     font-semibold text-text-cta-link transition-colors duration-200 hover:text-primary` — `text-14-5`
     (exact match, already canonical) corrects the size; `text-text-cta-link` (item 1) supplies the
     dimmer resting color; `hover:text-primary` reuses the already-existing, already-canonical
     `text-primary` class (solid white) as the hover target — no new token needed for the hover state,
     since it's the same value the app already expresses elsewhere; `transition-colors duration-200`
     (both plain Tailwind utilities, no token) animates the resting→hover shift, matching the reference's
     `transition:color .2s ease`.
   - The underline's `border-border-orange-strong` (0.60) becomes `border-border-orange-medium` (0.50) —
     an exact-match token already added/mapped in this feature's Re-Imagine Grid addendum (§13); reused
     verbatim, not redefined.
   - The link's text content changes from "Explore how our 6-week framework can accelerate your next big
     bet" to the reference's literal "Or explore our 6-week framework" (Clarifications, Session
     2026-08-06) — the arrow span and its `text-orange` color are unchanged.

Nothing else changes. The card's background/border/radius/blur, the overlay glow, the eyebrow/heading/
paragraph, and the primary "Schedule an OrbitAI Demo" button are already reference-correct and untouched.

## UI Design Approach (Final CTA)

**`frontend-design` skill invocation**: consulted for this addendum's one craft surface — the secondary
link's resting/hover distinction. Today's implementation renders this link at full-white opacity with no
hover state at all, which flattens the reference's own two-tier visual hierarchy (a quieter secondary
path, easy to reach, that only "lights up" to full attention on direct interest — vs. the primary gradient
button's constant, un-missable presence above it). Restoring the dimmer resting color and the
hover-to-white brighten reinstates that hierarchy exactly as the reference intends, rather than leaving
both CTAs competing at the same visual weight.

**Reconciliation with Principles I–V**: none needed — the new token is added to `tokens.css` first
(Principle I); the hover state reuses the existing `text-primary` primitive rather than introducing a
new one (Principle III); every corrected value is read directly from the reference (Principle IV); no
new surface fill (Principle V).

**Anchor files**: `app/_home-components/FinalCta.tsx`, `app/tokens.css` (1 new token: `--color-text-cta-
link`), `app/globals.css` (its `@theme inline` mapping) — no `app/page.tsx` change, no
`data-model.md`/`contracts/` change, every other homepage section unaffected.

**Constitution check** — PASS on all six principles: the new literal value is added to `tokens.css`
first, as a dedicated single-job token rather than reusing 2 value-identical-but-differently-scoped
tokens, following this feature's own established precedent (Principle I); no component is forked — the
hover state reuses the existing `text-primary` class, and the underline reuses an already-existing token
from an earlier addendum in this same plan (Principle III); the container width, link typography, and
link copy are all read directly from `TechGrit Homepage.dc.html` lines 886-897, not invented (Principle
IV); no new surface fill, no light-surface token introduced (Principle V). Canonical Tailwind classes are
used throughout in preference to arbitrary-value syntax wherever a token exists (`max-w-(--container-
max)`, `text-14-5`, `text-text-cta-link`, `text-primary`, `border-border-orange-medium`,
`transition-colors`, `duration-200`) — the only remaining arbitrary-value class is the pre-existing
`pb-[3px]` underline offset, which has no matching spacing token (`--space-3` is `10px`, a different
value) and predates this addendum.

## Post-Design Constitution Re-Check (Final CTA addendum)

Research (Phase 0 of this addendum) confirmed the new token value against the reference directly, and
confirmed the sitewide `max-w-(--container-max)` idiom as the correct replacement for the literal
`max-w-[1180px]`, before any file changed. No new violations. Gate: PASS.

---

## User Story 3 — Construction Page (FR-016a, FR-017, FR-018)

**Date**: 2026-08-07 | **Spec**: [spec.md](./spec.md), User Story 3 (Industries (`/construction`)
page reference alignment), scoped to **only** FR-016a, FR-017, and FR-018 — the `/construction`
hero's ghost button + metrics-panel background, the Challenge section's eyebrow, and "What We
Build"'s spacing.

**Reference**: `raw-files-v2/TechGrit Website V2.2/TechGrit Construction.dc.html` exclusively (spec.md
Clarifications, Session 2026-08-07) — **not** `TechGrit Industries.dc.html`, which describes the
unbuilt multi-industry hub and is out of scope entirely.

**Scope note**: this is an independent slice, unrelated to Home Page (User Story 1) above — it is
tracked as its own block precisely so a teammate can work User Story 1's remaining pieces (or any
other story) in parallel without touching this section or its files. It covers **only** the 3 FRs
named above. FR-016 (no new `/industries` route), FR-019 ("Why TechGrit" eyebrow), FR-020 (Proven
Impact equal-height cards), and FR-021 (final CTA width/buttons) — the rest of User Story 3 — remain
unplanned. No Home Page file (`app/_home-components/*`, `app/page.tsx`) is touched.

### Summary

Reading `TechGrit Construction.dc.html` directly against today's `/construction` implementation
shows the ghost button is **already reference-exact** (Phase 1's shared `Button.tsx` ghost-variant
tokens — `--gradient-ghost`, `--color-border-ghost`, `--shadow-btn-ghost`, `--blur-ghost` — were
already byte-matched against this same file, per this plan's Phase 1 Constitution Check: "Ghost-button
values read directly from `TechGrit Homepage.dc.html`... and `TechGrit Construction.dc.html` —
byte-identical"). `construction-hero.tsx`'s secondary "See Solutions" CTA already renders
`<Button variant="ghost">`, so FR-016a's ghost-button clause needs **no code change** — only the
metrics-panel background needs correcting. Three concrete fixes result:

1. **`app/construction/_components/construction-hero.tsx`** (FR-016a, metrics-panel background
   only) — the hero image's 3-stat overlay (`<30d` / `1000s` / `24/7`) currently uses
   `background: "rgba(10,24,34,0.6)"`, `border: "1px solid var(--color-border-strong)"` (0.16), and
   `backdropFilter: blur(var(--blur-sm))` (6px). The reference's own stat-card panel (lines 246-249)
   is `background:rgba(0,0,0,0.6)`, `border:1px solid rgba(255,255,255,0.12)`,
   `backdrop-filter:blur(8px)` — all three already exist as exact-value tokens in this codebase
   (`--color-ink-glass-60`, `--color-border`, `--blur-md`), so this is a 3-line value swap, not a
   new token addition. No ghost-button change needed (already correct, see above).
2. **`app/construction/_components/construction-challenges.tsx`** (FR-017) — the Challenge section's
   `<SectionEyebrow>{section.eyebrow}</SectionEyebrow>` call currently renders with its default
   `showAccent` (`true`), showing a leading accent-line span the reference's own "The challenge"
   eyebrow (line 276) does not have. Add `showAccent={false}`, the same prop FR-006/FR-019/FR-033
   already use elsewhere — no new component work, `SectionEyebrow`'s toggle already exists (Phase 1,
   T003).
3. **`app/construction/_components/construction-solutions.tsx`** (FR-018) — the "What We Build"
   `<section id="solutions">` currently carries no vertical padding of its own at all (`className=""`
   on the section element), while the reference's own SOLUTIONS section (line 306-307) is
   `padding:50px 36px 30px` (horizontal 36px already comes from the shared `.tg-container` inside
   it). Add `pt-[50px] pb-[30px]` to the section element to match. The header's `mb-[40px]` margin
   and the card grid's `gap-[22px]` already match the reference's own `margin-bottom:40px` (line 308)
   and `gap:22px` (line 312) exactly — no change needed to either.

Nothing else changes. `construction-hero.tsx`'s hero copy/CTA-link/headline, `construction-
challenges.tsx`'s challenge cards/icons/grid, and `construction-solutions.tsx`'s solution
cards/icons/grid are already reference-correct (or out of this slice's scope) and untouched. No
other `/construction` component (`construction-integrations-strip.tsx`,
`construction-lifecycle-diagram.tsx`, `construction-advantage.tsx`, `construction-impact.tsx`) is
touched — their own requirements (FR-016, FR-019, FR-020, FR-021) remain unplanned.

### Technical Context (User Story 3 slice)

**Language/Version**: TypeScript 5 (strict) · **Primary Dependencies**: Next.js 16.2.10, React
19.2.4, Tailwind CSS v4 · **Storage**: N/A · **Testing**: N/A (no test framework in this repo;
manual verification, see quickstart.md addendum) · **Target Platform**: Web · **Project Type**:
single Next.js App Router app · **Performance Goals**: N/A (CSS-only value corrections) ·
**Constraints**: no new libraries; no new tokens (all 3 fixes reuse existing exact-value tokens); zero
visual change to any `/construction` section other than the hero's stat-card overlay, the Challenge
eyebrow, and the Solutions section's own vertical padding · **Scale/Scope**: 3 existing files edited,
0 new files, 0 new tokens.

### Constitution Check (User Story 3 slice)

*GATE: before Phase 0 and re-checked after Phase 1 of this slice.*

- **I (Token-Only Styling)** — PASS. All 3 corrected values (`--color-ink-glass-60`,
  `--color-border`, `--blur-md`) already exist in `tokens.css` as exact matches for the reference's
  `rgba(0,0,0,0.6)` / `rgba(255,255,255,0.12)` / `8px` — reused verbatim, no new token added. The
  Solutions section's `50px`/`30px` padding uses literal arbitrary-value Tailwind classes since no
  existing spacing token matches either value exactly (consistent with this plan's own established
  precedent of not spawning a token for a single, section-specific usage — see the Re-Imagine Grid
  addendum's `h-[180px]` decision above).
- **II (Breakpoints)** — PASS, not applicable (no new breakpoint introduced).
- **III (Component Library)** — PASS. No component is forked or duplicated: `SectionEyebrow`'s
  existing `showAccent` prop (Phase 1, T003) is reused as-is; `Button`'s existing `ghost` variant is
  reused as-is (no change needed).
- **IV (References Are Visual Truth)** — PASS. Every corrected value is read directly from
  `TechGrit Construction.dc.html` (lines 246-249, 276, 306-312) — not `TechGrit Industries.dc.html`,
  per the spec's Session 2026-08-07 clarification.
- **V (Dark-First Brand)** — PASS. No new surface fill; the stat-card overlay stays a translucent
  black glass panel, matching the reference and the app's existing dark-first convention.
- **VI (frontend-design skill)** — PASS, invoked; see UI Design Approach below.
- No violations — Complexity Tracking is empty.

### UI Design Approach (User Story 3 slice)

**UI mode**: ON (Next.js/React tech signal + spec.md content signal).

**`frontend-design` skill invocation**: consulted for this slice's one visible craft surface — the
hero's stat-card overlay's background/border/blur correction. Takeaway applied: dropping the overlay
from `rgba(10,24,34,0.6)` (the app's ink-tinted default) to the reference's neutral
`rgba(0,0,0,0.6)` reads as intentional rather than a regression, because the surrounding hero image
already sits on the page's own black background (post-TMS-85 migration) — the ink tint was a holdover
from before that migration and no longer serves a visible purpose here; removing it lets the stat
cards recede quietly into the image's own gradient overlay instead of introducing a second, subtly
different dark tone next to it. The Challenge eyebrow's accent-removal and the Solutions section's
padding correction are non-visual-judgment, reference-exact value fixes with no further craft
decision to make.

**Reconciliation with Principles I–V**: none needed — the skill's guidance confirmed Principle IV
(reference is visual truth) without surfacing any conflict with Principles I/III/V.

**Anchor files**: `app/construction/_components/construction-hero.tsx` (stat-card overlay value
swap only), `app/construction/_components/construction-challenges.tsx` (`showAccent={false}`),
`app/construction/_components/construction-solutions.tsx` (section padding).

### Project Structure (User Story 3 slice)

```text
app/construction/_components/
├── construction-hero.tsx         # stat-card overlay: background/border/blur → existing tokens
├── construction-challenges.tsx   # <SectionEyebrow showAccent={false}>
└── construction-solutions.tsx    # <section id="solutions" className="pt-[50px] pb-[30px]">
```

No `data-model.md`/`contracts/` (presentation-only, same as every other slice in this plan). No
other file is touched — not `app/construction/page.tsx`, not `app/tokens.css`, not `app/globals.css`
(no new tokens needed for this slice).

**Structure Decision**: existing single-project structure. All 3 edits stay inside
`app/construction/_components/`, the route-local private folder already established for this page —
no shared-primitive or `components/ui/` change is needed since every value/prop this slice needs
already exists.

### Complexity Tracking (User Story 3 slice)

*Empty — no violations.*

### Post-Design Constitution Re-Check (User Story 3 slice, FR-016a/17/18)

Research (Phase 0 of this slice) confirmed all 3 corrected values already exist as exact-match
tokens before any file changed, and confirmed the ghost button needed no change at all (already
byte-matched during Phase 1). No new violations. Gate: PASS.

## User Story 3 (continued) — Construction Page (FR-019, FR-020, FR-021)

**Date**: 2026-08-07. Extends the same "User Story 3 — Construction Page" block above to cover the
remaining 3 requirements of User Story 3 — the "Why TechGrit" eyebrow, "Proven Impact" equal-height
cards, and the closing CTA — per spec.md Clarifications Session 2026-08-07. FR-016a, FR-017, and
FR-018 above are complete and unaffected. FR-016 (no new `/industries` route) needs no
implementation (it's a negative/already-true requirement). No Home Page file is touched.

**Reference**: `TechGrit Construction.dc.html` exclusively, same as the FR-016a/17/18 slice above —
not `TechGrit Industries.dc.html`.

### Summary (FR-019/20/21)

1. **`app/construction/_components/construction-advantage.tsx`** (FR-019) — the "Why TechGrit"
   `<SectionEyebrow>{section.eyebrow}</SectionEyebrow>` call currently renders with its default
   `showAccent` (`true`), showing a leading accent-line span the reference's own "Why TechGrit"
   eyebrow (line 409) does not have. Add `showAccent={false}` — the same prop FR-017 already used
   one component over; no new component work.
2. **`app/construction/_components/construction-impact.tsx`** (FR-020) — each Proven Impact card is
   currently wrapped in `<a key={caseStudy.order} href={caseStudy.link} className="block">`, making
   the whole card individually clickable — the per-card link the Session 2026-08-03 Clarifications
   already decided to remove (a deliberate divergence from the reference, which does wrap its own 3
   cards in `<a href="TechGrit Contact.dc.html">`, line 431 — an approved exception, same pattern as
   SC-001's other two recorded exceptions). Remove the `<a>` wrapper entirely; `<GlassCard
   key={caseStudy.order} variant="constructionImpact" hoverBorderColor="">` becomes the direct grid
   child. This also resolves the equal-height half of FR-020 as a direct side effect, with no
   additional class needed: today, the `<a className="block">` element is the actual CSS grid item
   and already stretches to the row's full height under the grid's own default `align-items: stretch`,
   but the un-stretched `GlassCard` div nested inside it does not fill that stretched space — once
   `GlassCard` itself becomes the direct grid item, the same default `stretch` behavior applies to it
   natively, giving every card in a row equal height regardless of its own content length, without a
   new `h-full` class or any other CSS. The "Read case study →" `<span>` inside each card stays as
   static, non-interactive decorative text (matching the reference's own literal copy) — it was never
   itself a link even today (the whole card was), so removing only the outer `<a>` leaves it exactly
   as visually present as before, just no longer clickable, which is the requirement.
3. **`components/ui/final-cta.tsx`** (FR-021, width only) — add an optional `maxWidth?: number`
   prop (default `1180`, the component's current literal value) consumed by the `tg-container`'s
   inline `style={{ maxWidth, ... }}` in place of the current hardcoded `1180`. This is additive and
   non-breaking: its one other existing consumer, `app/about/page.tsx`, omits the new prop and keeps
   rendering at exactly `1180px`, unchanged (spec.md Clarifications, Session 2026-08-07 — the
   opt-in-prop decision, chosen specifically to avoid widening that other page's CTA ahead of its own
   FR-034). **Correction (post-implementation verification)**: Case Studies and Services were
   initially believed to share this same component — a false positive from a substring grep match on
   `final-cta"` (their own `case-studies-final-cta.tsx`/`services-final-cta.tsx` are separate,
   route-local components that never import `components/ui/final-cta.tsx`). Verified via
   import-statement search and live computed-style checks post-implementation: both already render
   at `1180px` via their own components, unaffected by this change either way.
4. **`app/construction/page.tsx`** (FR-021, width only) — the page's `<FinalCta>` call gains
   `maxWidth={1280}`, matching `TechGrit Construction.dc.html`'s own CTA container width (line 458).
   No other prop on this call changes.

**Deliberately not changed**: FR-021's "updated styling for both action buttons" clause is satisfied
for the ghost (secondary) button by the same shared `Button` `ghost` variant already confirmed
byte-exact against this reference during the FR-016a slice above — no further change needed. The
primary button's box-shadow shows a small delta against the reference's literal
`0 18px 44px -12px rgba(232,119,34,0.85)` (`--shadow-btn-primary`/`--shadow-btn-hover` are
`0 14px 36px -10px rgba(232,119,34,0.75)` / `0 18px 44px -10px rgba(232,119,34,0.90)`), but both
tokens are shared sitewide by every primary CTA button (Hero, Subscribe, every other page's final
CTA) — forking or retuning them here would be the same kind of uncontrolled blast-radius change the
width prop above was specifically designed to avoid, for a sub-visible glow-shadow delta, not a
structural mismatch. Left as-is, consistent with this plan's own established precedent of not
chasing sub-pixel/sub-opacity deltas on shared, cross-cutting tokens (see the stat-divider-border
and hero-token-consolidation precedents earlier in this plan). The primary/ghost buttons' padding
and border-radius are already corrected via each button's existing per-instance style overrides in
`final-cta.tsx` (unchanged by this slice).

Nothing else changes. `construction-advantage.tsx`'s advantage-points list, `construction-
impact.tsx`'s card content/metrics, and `final-cta.tsx`'s card background/border/radius/blur/glow are
already reference-correct (or out of this slice's scope) and untouched.

### Technical Context (FR-019/20/21 slice)

**Language/Version**: TypeScript 5 (strict) · **Primary Dependencies**: Next.js 16.2.10, React
19.2.4, Tailwind CSS v4 · **Storage**: N/A · **Testing**: N/A (manual verification, see quickstart.md
addendum) · **Target Platform**: Web · **Project Type**: single Next.js App Router app ·
**Performance Goals**: N/A (markup simplification + one additive prop) · **Constraints**: no new
libraries; the new `maxWidth` prop on `components/ui/final-cta.tsx` MUST default to `1180` so its 4
other consumers (About, Case Studies hub + detail, Services) render pixel-identical to today ·
**Scale/Scope**: 3 existing files edited (`construction-advantage.tsx`, `construction-impact.tsx`,
`final-cta.tsx`) + 1 existing file's call-site updated (`construction/page.tsx`), 0 new files, 0 new
tokens.

### Constitution Check (FR-019/20/21 slice)

*GATE: before Phase 0 and re-checked after Phase 1 of this slice.*

- **I (Token-Only Styling)** — PASS. No new literal color/spacing/shadow value is introduced; the
  `maxWidth` prop carries a plain number (a layout dimension, not a design-token-governed value,
  consistent with how `paddingTop`/`titleLineHeight` are already plain-typed props on this same
  component). The primary-button shadow delta is knowingly left on the existing shared tokens rather
  than forked (see Summary above) — an explicit, recorded acceptance, not a Principle I gap.
- **II (Breakpoints)** — PASS, not applicable.
- **III (Component Library)** — PASS. `components/ui/final-cta.tsx` is extended with one optional,
  default-preserving prop — not forked — so About keeps consuming the exact same component,
  unchanged (Case Studies and Services each have their own separate, route-local final-CTA
  component and never touch this file at all). `SectionEyebrow`'s existing `showAccent` prop and
  `GlassCard`'s existing `constructionImpact` variant are both reused as-is.
- **IV (References Are Visual Truth)** — PASS. The eyebrow fix and CTA width are read directly from
  `TechGrit Construction.dc.html` (lines 409, 458). The per-card link removal is a knowing,
  spec-recorded exception to the reference (Session 2026-08-03) — Principle IV's "reference is
  visual truth" is honored everywhere else in this slice.
- **V (Dark-First Brand)** — PASS. No new surface fill; no light-surface token introduced.
- **VI (frontend-design skill)** — PASS, invoked; see UI Design Approach below.
- No violations — Complexity Tracking is empty.

### UI Design Approach (FR-019/20/21 slice)

**UI mode**: ON (Next.js/React tech signal + spec.md content signal).

**`frontend-design` skill invocation**: consulted for this slice's one genuine craft question — how
removing the Proven Impact cards' per-card link should read visually once it's no longer
interactive. Takeaway applied: keeping the "Read case study →" copy in place (rather than deleting
it outright) preserves the reference's own visual rhythm and the card's sense of narrative
completion — the arrow reads as "this case closes here," not strictly as a functional affordance,
so a sighted user scanning the grid doesn't perceive a missing element. The hover lift
(`hover:-translate-y-[6px]`, already on the `constructionImpact` variant) stays as the card's only
interactive-feeling cue, correctly signaling "this card is still worth reading" without implying
"this card is clickable." The eyebrow accent-removal and CTA width change are non-visual-judgment,
reference-exact value fixes with no further craft decision to make.

**Reconciliation with Principles I–V**: none needed — the skill's guidance confirmed Principle IV
(reference is visual truth, with one explicitly-recorded exception) without surfacing any conflict
with Principles I/III/V.

**Anchor files**: `app/construction/_components/construction-advantage.tsx` (`showAccent={false}`),
`app/construction/_components/construction-impact.tsx` (`<a>` wrapper removed, `GlassCard` becomes
direct grid child), `components/ui/final-cta.tsx` (new optional `maxWidth` prop),
`app/construction/page.tsx` (`<FinalCta maxWidth={1280}>`).

### Project Structure (FR-019/20/21 slice)

```text
app/construction/_components/
├── construction-advantage.tsx   # <SectionEyebrow showAccent={false}>
└── construction-impact.tsx      # <a href> wrapper removed; <GlassCard> is now the direct grid child

components/ui/
└── final-cta.tsx                 # + optional maxWidth?: number prop (default 1180, non-breaking)

app/construction/page.tsx          # <FinalCta ... maxWidth={1280}>
```

No `data-model.md`/`contracts/` (presentation-only, same as every other slice in this plan). No
`app/tokens.css`/`app/globals.css` change (no new tokens needed). `app/about/page.tsx` is
unaffected — its `<FinalCta>` call omits the new prop and keeps rendering at `1180px`. Case Studies
(`app/case-studies/page.tsx`, `app/case-studies/[slug]/page.tsx`) and Services (`app/services/page.tsx`)
never touch `components/ui/final-cta.tsx` at all — each renders its closing CTA via its own
route-local component (`case-studies-final-cta.tsx`, `services-final-cta.tsx`).

**Structure Decision**: existing single-project structure. The 2 route-local edits stay inside
`app/construction/_components/`; `final-cta.tsx`'s new prop follows the same additive,
default-preserving convention already used for its existing `tone`/`paddingTop`/`titleLineHeight`
props, so no new shared-primitive file or fork is needed.

### Complexity Tracking (FR-019/20/21 slice)

*Empty — no violations.*

### Post-Design Constitution Re-Check (FR-019/20/21 slice)

Research (Phase 0 of this slice) confirmed the reference values for the eyebrow and CTA width, and
confirmed the shared `final-cta.tsx` component's one other consumer (About) before any file changed
— the opt-in `maxWidth` prop's default was verified to reproduce its current `1180px` rendering
exactly. Post-implementation, live computed-style checks confirmed `/about` still renders at
`1180px`, `/construction` renders at the new `1280px`, and `/case-studies`/`/services` (each on
their own separate, route-local final-CTA component) are untouched at `1180px` regardless. No new
violations. Gate: PASS.

### Post-Design Constitution Re-Check (User Story 3 slice)

Research (Phase 0 of this slice) confirmed all 3 corrected values already exist as exact-match
tokens before any file changed, and confirmed the ghost button needed no change at all (already
byte-matched during Phase 1). No new violations. Gate: PASS.

---

## User Story 6 — Webinar Page (FR-030, FR-031)

**Date**: 2026-08-07 | **Spec**: [spec.md](./spec.md), User Story 6 (Insights: Webinar page
reference alignment), scoped to **only** FR-030 and FR-031.

**Reference**: `raw-files-v2/TechGrit Website V2.2/TechGrit Webinar.dc.html` exclusively.

**Scope note**: this is an independent slice, unrelated to Home Page (User Story 1) or Construction
(User Story 3) above — tracked as its own block precisely so a teammate can work any other user
story in parallel without touching this section or its files. It covers **only** the 2 FRs named
above. No Home Page, Construction, Case Studies, Blog, About, Careers, or Contact file is touched.

### Summary

Reading `TechGrit Webinar.dc.html` directly against today's `/webinar` implementation shows the
reference never puts the upcoming session's title/date/CTA inside the hero's own two-column grid at
all — it renders a separate, full-width "announcement strip" (`data-web-announce`) positioned
directly above the hero section, and explicitly hides the old "upcoming featured" card inside the
sessions grid (`display:none`, with the file's own comment: "moved to floating strip above hero per
UX review"). Today's app does the opposite: the hero has no upcoming-session content at all, and the
sessions grid's `UpcomingPanel` renders exactly the "Upcoming Live" block FR-031 says must not exist
as a separate element. Per spec.md's Session 2026-08-07 Clarifications (Story 6), this resolves to:

1. **New `app/webinar/_components/announcement-strip.tsx`** (FR-030) — a full-width strip rendered
   directly above `<HeroSection>` (not nested inside its two-column grid), reusing the existing
   `UpcomingSession` content type verbatim (no data-model change). Structure matches the reference's
   literal 3-column row: a status label with a blinking amber dot ("Upcoming · Live"), the session's
   title + date/time (`{session.title} · {session.date} · {session.time} {session.timezone}`, matching
   the reference's single truncated line, line 222), and a "Register" control that smooth-scrolls to
   `#subscribe` — reusing `UpcomingPanel`'s existing `handleRegisterClick` pattern (`document.
   getElementById("subscribe")?.scrollIntoView({ behavior: "smooth" })`), not a native anchor. At the
   app's canonical `sm` breakpoint (560px) and below, the row's `grid-cols-[auto_1fr_auto]` collapses
   to a single column (FR-030's mobile-stacking clarification) — the reference itself defines no
   mobile treatment for this row at all.
   **Deliberate deviation from the reference's literal markup**: the reference wraps the entire strip
   in one `<a href="#subscribe">` (whole-row clickable, with a visually-button-styled `<span>` nested
   inside the same anchor). This app keeps only the "Register" control itself interactive (a `<button
   onClick={...}>`, matching `UpcomingPanel`'s existing pattern) with the outer strip as a
   non-interactive `<div>` — avoiding a nested-interactive-element accessibility anti-pattern
   (button-inside-link) that the reference's own preview-tool markup doesn't need to avoid. This is a
   deliberate, here-recorded exception to Principle IV, the same class of exception already used
   elsewhere in this plan for FR-020's per-card-link removal.
2. **`app/webinar/_components/sessions-section.tsx`** (FR-031) — the `UpcomingPanel` function and its
   render call are removed entirely from `SessionsSection`; the `upcomingSession` prop is removed from
   `SessionsSection`'s own prop type (the data now flows to the new `AnnouncementStrip` instead, per
   item 1). Auditing the reference's "Sessions" heading and every remaining released-session card
   against today's markup (`--text-webinar-h2`, `GlassCard variant="webinarReleased"`,
   `RELEASED_ACCENT_COVER`) shows every value already matches `TechGrit Webinar.dc.html` exactly
   **except one**: the orange-accent card's cover currently reuses `--gradient-blog-featured`
   (`rgba(232,119,34,0.20)…`), a token borrowed from the Blog section for visual convenience, which is
   2% opacity off the reference's own `rgba(232,119,34,0.18)…` (line 279). Everything else — the h2's
   `clamp(26px,3vw,34px)`/`-0.03em` sizing (`--text-webinar-h2`, itself already the exact reference
   clamp), the cards' `20px` radius/`0.10` border/`0.04` background (`--radius-2xl`, `--color-border-
   image`, `--color-glass-4`, all exact-match tokens), the `18.5px/700/1.3` title and `14.5px/1.6/
   rgba(255,255,255,0.6)` description (already overridden to `text-white/60` per-instance), the status
   label's `12px/700/0.10em/#F7B733` styling (`text-12`/`tracking-wider` — remapped to `--ls-wider`
   0.10em via `@theme inline`, not Tailwind's own 0.05em default — /`text-amber-light`), and the blue/
   teal cover gradients (`--gradient-webinar-released-blue`/`-teal`, both exact matches) — needs **no
   change**. FR-031's "MUST use the reference's updated colors and typography" therefore resolves to
   one token fix, not a rewrite.
3. **`app/tokens.css`** — add 4 tokens with no existing exact match, in their respective existing
   numbered sections: `--gradient-webinar-announce: linear-gradient(90deg, rgba(245, 158, 11, 0.14),
   rgba(232, 119, 34, 0.05));` (§ Gradients — announcement strip's resting background, line 220),
   `--color-border-amber-35: rgba(245, 158, 11, 0.35);` and `--color-border-amber-70: rgba(245, 158,
   11, 0.70);` (§ Borders — the strip's resting and hover border colors; the existing `--color-border-
   amber-30`/`-medium` (0.30/0.40) are close but not exact matches for this new element's own two
   distinct values), `--shadow-webinar-announce: 0 12px 40px -18px rgba(232, 119, 34, 0.5);` (§ Shadows
   — the strip's ambient glow shadow, line 220), and `--gradient-webinar-released-orange: linear-
   gradient(150deg, rgba(232, 119, 34, 0.18), rgba(2, 132, 199, 0.06));` (§ Gradients — the dedicated
   released-card orange-accent gradient that item 2's fix introduces, replacing the borrowed
   `--gradient-blog-featured`). The strip's `16px` border-radius has no existing exact-match token
   (`rounded-lg` is `14px`, `rounded-2xl` is `20px` per the Construction addendum's own confirmation of
   `--radius-2xl: 20px`), so it uses the arbitrary-value `rounded-[16px]` class, consistent with this
   plan's own established precedent (the Re-Imagine Grid addendum's `h-[180px]` decision) of not
   spawning a token for a single, section-specific usage. The
   `12px` backdrop-blur (already an exact match — `--blur-cta`, "Final CTA panel"), and the `14px 22px`
   padding / `22px` column gap (literal arbitrary-value classes, same precedent) need no new tokens.
   Existing `--shadow-glow-amber-sm` (0.80 opacity) is reused verbatim for the status dot's glow, a
   already-accepted 5%-opacity delta against the reference's `0.85` — the same class of sub-visible
   shared-token delta this plan has already accepted elsewhere (stat-divider border, Construction's
   primary-button shadow) rather than forking a new token for a near-imperceptible difference.
4. **`app/webinar/page.tsx`** — render `<AnnouncementStrip session={webinarPageContent.upcomingSession} />`
   between `<HeroSection>` and `<SessionsSection>`; `<SessionsSection>` no longer receives an
   `upcomingSession` prop.
5. **`app/webinar/_components/sessions-section.tsx`** (continued, item 2) — `RELEASED_ACCENT_COVER.
   orange` switches from `"bg-[image:var(--gradient-blog-featured)]"` to `"bg-[image:var(--gradient-
   webinar-released-orange)]"`.

Nothing else changes. `HeroSection`'s own two-column grid/collage, `SubscribePanel`, and every other
released-session card value already confirmed exact above are untouched.

### Technical Context (User Story 6 slice)

**Language/Version**: TypeScript 5 (strict) · **Primary Dependencies**: Next.js 16.2.10, React
19.2.4, Tailwind CSS v4 · **Storage**: N/A · **Testing**: N/A (no test framework in this repo; manual
verification, see quickstart.md addendum) · **Target Platform**: Web · **Project Type**: single
Next.js App Router app · **Performance Goals**: N/A (markup relocation + one gradient-token swap) ·
**Constraints**: no new libraries; the existing `UpcomingSession` data type is reused verbatim (no
data-model change); zero visual change to any `/webinar` section other than the new announcement
strip's position, the sessions grid's removed `UpcomingPanel`, and the orange released-card cover's
gradient · **Scale/Scope**: 1 new file created (`announcement-strip.tsx`), 2 existing files edited
(`sessions-section.tsx`, `page.tsx`), 4 new tokens added to `tokens.css`, 0 new libraries.

### Constitution Check (User Story 6 slice)

*GATE: before Phase 0 and re-checked after Phase 1 of this slice.*

- **I (Token-Only Styling)** — PASS. All 4 new literal values (announcement-strip gradient/border
  ×2/shadow, released-card orange gradient) are added to `tokens.css` first, in their existing
  numbered sections, before any component consumes them. The strip's `16px` radius and `14px 22px`
  padding stay arbitrary-value classes, consistent with this plan's own established precedent of not
  spawning a token for a single, section-specific spacing usage with no reuse elsewhere. The status
  dot's glow shadow reuses the existing `--shadow-glow-amber-sm` verbatim (a 5%-opacity delta already
  accepted elsewhere in this plan), not a new near-duplicate token.
- **II (Breakpoints)** — PASS. The strip's mobile-stacking collapse uses the app's canonical `sm`
  (560px, `max-tg-sm:`) breakpoint, per spec.md's clarification — no new breakpoint introduced.
- **III (Component Library)** — PASS with one recorded exception: the announcement strip's row-shaped
  content (status label + single-line session summary + CTA) doesn't fit `GlassCard`'s icon+title+
  description card shape, so it's a bespoke `<div>` rather than a forced new `GlassCard` variant whose
  unused `ICON_VARIANTS`/`TITLE_VARIANTS`/`DESC_VARIANTS` entries would exist only to satisfy the
  Record's exhaustiveness — the same reasoning `TrustedClients.tsx` and the pre-migration Live-Webinar
  badge already established for bespoke, non-card-shaped sections elsewhere in this plan. The strip
  still reuses this app's existing `Button`-pattern smooth-scroll handler (`UpcomingPanel`'s own
  `handleRegisterClick`) rather than inventing a new interaction, and `GlassCard variant="
  webinarReleased"` (sessions grid) is untouched and reused as-is.
- **IV (References Are Visual Truth)** — PASS with one recorded, deliberate exception: the
  whole-strip-as-a-single-anchor structure is not reproduced (see Summary item 1) to avoid a
  nested-interactive-element accessibility anti-pattern the reference's own preview-tool markup
  doesn't need to avoid — every other structural and value decision (strip position, 3-column
  content, colors, the released-card gradient fix) is read directly from the reference.
- **V (Dark-First Brand)** — PASS. No new surface fill; the strip's amber/orange gradient stays a
  translucent glass tint (0.05-0.14 opacity), matching the reference and the app's existing sparing-
  accent convention.
- **VI (frontend-design skill)** — PASS, invoked; see UI Design Approach below.
- No violations — Complexity Tracking is empty.

### UI Design Approach (User Story 6 slice)

**UI mode**: ON (Next.js/React tech signal + spec.md content signal).

**`frontend-design` skill invocation**: consulted for this slice's two visible craft surfaces — the
announcement strip's new glass treatment and the mobile-stacked fallback. Takeaways applied: **strip
glass treatment** — the resting border stays a modest `0.35`-opacity amber line (not the brighter
`0.70` reserved for hover), so the strip reads as "quietly present, brightens on interaction" rather
than competing with the hero directly beneath it; the `0.05-0.14` gradient fill and `12px` blur keep it
in the same translucent-glass register as every other card-like surface in this app, not a solid
banner. **Mobile stack** — at `sm` and below, the status label renders first (establishing "this is
live/upcoming" before the title, matching reading order), the session summary second, and the Register
button last, full-width — so the collapsed column still reads top-to-bottom as urgency → context →
action, the same order the desktop row already establishes left-to-right.

**Reconciliation with Principles I–V**: none needed beyond the two recorded exceptions above (III's
bespoke-wrapper choice, IV's nested-interactive-element avoidance) — the skill's guidance confirmed
Principle V's sparing-accent convention without surfacing any further conflict.

**Anchor files**: `app/webinar/_components/announcement-strip.tsx` (new),
`app/webinar/_components/sessions-section.tsx` (`UpcomingPanel` removed, `upcomingSession` prop
removed, orange gradient token swapped), `app/webinar/page.tsx` (renders `<AnnouncementStrip>` between
`<HeroSection>` and `<SessionsSection>`), `app/tokens.css` (4 new tokens).

### Project Structure (User Story 6 slice)

```text
app/webinar/_components/
├── announcement-strip.tsx   # NEW — full-width strip above the hero; reuses UpcomingSession data
├── sessions-section.tsx     # UpcomingPanel removed; upcomingSession prop removed;
│                             # RELEASED_ACCENT_COVER.orange → --gradient-webinar-released-orange
└── hero-section.tsx          # unchanged

app/webinar/page.tsx          # + <AnnouncementStrip session={...} /> rendered before <SessionsSection>;
                               # <SessionsSection> no longer receives upcomingSession

app/tokens.css                 # + --gradient-webinar-announce, --color-border-amber-35,
                                #   --color-border-amber-70, --shadow-webinar-announce,
                                #   --gradient-webinar-released-orange
```

No `data-model.md`/`contracts/` (presentation-only, same as every other slice in this plan).
**Correction (post-implementation)**: the plan's original "no `app/globals.css` change" claim held
for all 4 originally-identified tokens (each consumed via arbitrary-value `bg-[image:var(...)]`/
`border-[var(...)]`/`shadow-[var(...)]` syntax, matching the existing `webinarUpcoming`/
`webinarReleased` variants' consumption pattern), but implementation surfaced a 5th token not
identified during planning — the status label's `letter-spacing:0.14em` had no existing exact-match
tracking token, so `--ls-announce-label` was added to `tokens.css` (§ Typography) and mapped via
`--tracking-announce-label: var(--ls-announce-label);` in `app/globals.css`'s `@theme inline` block
(matching the sibling `--tracking-hint`/`--tracking-blog-meta`/`--tracking-life-cap` mappings already
in that file), becoming the canonical `tracking-announce-label` utility. `app/webinar/_data/types.ts`
is unchanged — `UpcomingSession` is reused verbatim, no new field.

**Structure Decision**: existing single-project structure. `announcement-strip.tsx` stays route-local
(`app/webinar/_components/`), matching its sibling section files — it is consumed by the webinar page
only.

### Complexity Tracking (User Story 6 slice)

*Empty — the two recorded Principle III/IV exceptions above are deliberate, spec-informed choices,
not unjustified complexity.*

### Post-Design Constitution Re-Check (User Story 6 slice)

Research (Phase 0 of this slice) audited every value in the sessions grid's "Sessions" heading and
released cards against the reference before any file changed, confirming all but one (the orange
cover gradient) were already exact matches — narrowing FR-031's actual code change to a single token
swap rather than a broader rewrite. No new violations. Gate: PASS.

## User Story 6 (continued) — Webinar Page Polish (FR-030a, FR-030b, FR-031a)

**Date**: 2026-08-07. Extends the same "User Story 6 — Webinar Page" block above with 3 direct-
instruction items surfaced during this session: the announcement strip's Register control moving
onto the shared `Button` primitive (FR-030a), the page's background ambient orbs matching the
reference's own 2-orb set instead of the shared default 3-orb set (FR-030b), and the sessions grid's
"Watch Now" buttons rendering with `font-family: Arial` (FR-031a). FR-030/FR-031's own scope above is
unaffected and complete; no other user story is touched.

**Reference**: `TechGrit Webinar.dc.html` for FR-030a/FR-030b. FR-031a is explicitly **not**
reference-backed — see Constitution Check below.

### Summary (FR-030a/030b/031a)

1. **`app/webinar/_components/announcement-strip.tsx`** (FR-030a) — the Register control's bespoke
   `<button onClick={...}>` is replaced by `<Button onClick={...} className="...">`, carrying the
   same per-instance overrides (`!rounded-[10px] !py-[9px] !px-[18px] !text-[13.5px]`, `size="sm"` as
   the closest existing size preset) needed to keep its rendered output pixel-identical to before —
   this is a Component Library conformance fix (Constitution III), not a visual change.
2. **`components/ui/ambient-orbs.tsx`** (FR-030b) — gains a `pathname === "/webinar"` branch,
   following the exact same in-component-branch, Tailwind-classes-only convention already established
   for the homepage's own 4-orb branch (no route-exclusion entry, no separate page-local file).
   Comparing the reference's 2 orbs (lines 110-113) against the existing default 3-orb branch shows
   the first orb is **already pixel-identical** (`-top-40 -right-30 h-140 w-140 blur-[120px]
   animate-[tgorb_16s_ease-in-out_infinite]`, `--color-overlay-orange` at 0.16 vs. the reference's
   0.15 — the same class of sub-visible opacity delta already accepted elsewhere in this plan) and the
   second orb needs only its own vertical offset corrected (`top-225` → `top-300`, i.e. `900px` →
   `1200px`, matching the reference's `top:1200px` exactly; its size/color/blur/animation —
   `h-130 w-130`, `--color-overlay-blue-soft` at an exact-match `rgba(2,132,199,0.10)`, `blur-[130px]`,
   `20s reverse` — were already exact). The new branch is therefore the existing default branch's
   first two orbs, with one position correction, and the 3rd (amber) orb dropped entirely, since the
   reference has no third orb.
3. **`app/webinar/_components/sessions-section.tsx`** (FR-031a) — both `ReleasedCardHalf`'s and
   `ReleasedCardFull`'s `<Button>` calls for "Watch Now" gain an inline `style={{ fontFamily: "Arial,
   sans-serif" }}` — a per-instance override on these two specific button instances only, not a
   `className` token and not a change to `components/ui/Button.tsx` itself, so every other `Button`
   consumer across the entire app keeps inheriting the shared `--font-body`/`--font-display` stack
   unaffected.

Nothing else changes. `HeroSection`, `SubscribePanel`, the announcement strip's status label/session
text, and every other page's ambient-orb branch are untouched.

### Constitution Check (FR-030a/030b/031a slice)

*GATE: before Phase 0 and re-checked after Phase 1 of this slice.*

- **I (Token-Only Styling)** — PASS for FR-030a/030b (no new literal value; the orb branch reuses
  `--color-overlay-orange`/`--color-overlay-blue-soft` verbatim, and the `top-300` position uses the
  same numeric Tailwind spacing scale every other orb position in this file already uses). **FR-031a
  is a recorded exception**: `Arial` is a literal font-family value with no token and is deliberately
  not tokenized — Principle I governs design-system values (color/spacing/radius/etc.), and this is a
  one-off, explicitly-instructed override on 2 button instances, not a reusable style decision that
  would warrant a `--font-*` token.
- **II (Breakpoints)** — PASS, not applicable.
- **III (Component Library)** — PASS. FR-030a is itself a Component Library conformance fix (the
  announcement strip's Register control now goes through the shared `Button` primitive instead of a
  fork). FR-030b reuses the existing `AmbientOrbs` branch-per-pathname pattern rather than a new
  component. FR-031a's `Button` calls are unchanged as calls — only a per-instance `style` prop is
  added, the same escape hatch every `Button` consumer already has.
- **IV (References Are Visual Truth)** — PASS for FR-030a/030b (both values are read directly from
  `TechGrit Webinar.dc.html`). **FR-031a is a recorded, deliberate exception**: the reference sets no
  font-family override on these buttons at all (they'd inherit the page's Calibri/Carlito body font),
  so Arial is not reference-backed — implemented anyway per direct, explicit instruction, confirmed
  after this exact conflict was surfaced and the instruction was repeated.
- **V (Dark-First Brand)** — PASS for FR-030a/030b (no new surface fill). **FR-031a is a recorded,
  deliberate exception**: this app's brand system is Calibri/Carlito only (a prior hardcoded Arial
  override elsewhere in this same feature was already flagged and removed as a confirmed bug,
  Clarifications Session 2026-08-05) — Arial on these 2 buttons directly contradicts that convention.
  This is knowingly implemented per direct instruction, scoped as narrowly as possible (a per-instance
  `style` prop on exactly 2 button call sites, not a token, not a `Button.tsx` change, not applied to
  any other button on this page or any other) specifically so it cannot silently spread.
- **VI (frontend-design skill)** — PASS, invoked; see UI Design Approach below.
- **Complexity Tracking**: FR-031a is logged here as a knowing, explicitly-instructed exception to
  Principles IV and V — not silent drift. No other violation.

### UI Design Approach (FR-030a/030b/031a slice)

**UI mode**: ON (Next.js/React tech signal + spec.md content signal).

**`frontend-design` skill invocation**: consulted for this slice's two visible craft questions.
Takeaways applied: **orb-count reduction** — dropping the 3rd (amber) orb reads as a deliberate
quieting of the background, appropriate for this page's already color-dense sessions grid (3 accent-
tinted card covers plus the announcement strip's own amber tint) — 2 orbs let the grid's own colors
read clearly against the black surface instead of competing with a 3rd ambient color cast. **Arial
exception** — the skill's own guidance explicitly names Arial as a font to avoid; this instruction
directly overrides that guidance for these 2 button instances specifically, per this project's own
instruction-precedence rule (direct user instruction outranks skill guidance, which in turn outranks
default behavior). To keep it from reading as an unintentional regression rather than a deliberate
choice, it's confined to exactly the 2 "Watch Now" button call sites via an inline `style` override —
nothing else on the page (headings, body copy, the Register button, any other page's buttons)
inherits it, so a future reader sees a narrow, clearly-scoped exception rather than a spreading
pattern.

**Reconciliation with Principles I–V**: FR-030a/030b need none. FR-031a is a knowing, recorded
exception to Principles IV and V, made here by direct instruction after the conflict was explicitly
surfaced and confirmed — not left as silent drift.

**Anchor files**: `app/webinar/_components/announcement-strip.tsx` (Register control now `<Button>`),
`components/ui/ambient-orbs.tsx` (new `pathname === "/webinar"` branch), `app/webinar/_components/
sessions-section.tsx` (`style={{ fontFamily: "Arial, sans-serif" }}` on both Watch Now `<Button>` calls).

### Project Structure (FR-030a/030b/031a slice)

```text
app/webinar/_components/
├── announcement-strip.tsx   # Register control: bespoke <button> → <Button>
└── sessions-section.tsx     # Watch Now <Button> calls (both renderers) get
                              # style={{ fontFamily: "Arial, sans-serif" }}

components/ui/
└── ambient-orbs.tsx          # + pathname === "/webinar" branch (2 orbs, 3rd amber orb dropped,
                               #   2nd orb's position corrected from top-225 to top-300)
```

No `app/tokens.css`/`app/globals.css` change (every value reused is an existing exact or
near-exact-match token; Arial is a deliberate non-token literal, per Constitution Check above). No
`data-model.md`/`contracts/` change.

**Structure Decision**: existing single-project structure. All 3 edits stay inside their existing
files — no new file, no new shared primitive.

### Complexity Tracking (FR-030a/030b/031a slice)

FR-031a is the one recorded complexity/exception in this slice: a knowing, direct-instruction
override of Principles IV and V, scoped to 2 button instances via a per-instance `style` prop with no
token and no shared-component change — not silent drift, and reversible by deleting 2 `style` props
if this exception is ever revoked.

### Post-Design Constitution Re-Check (FR-030a/030b/031a slice)

Research (Phase 0 of this slice) confirmed the orb branch's first orb was already pixel-identical to
the reference and the second needed only a position correction (no new tokens), and confirmed the
Arial instruction's conflict with both the reference and the brand system before implementing it
anyway, per direct instruction. No new violations beyond the one recorded FR-031a exception. Gate: PASS.

## Story 5 — Blog Page (FR-027, FR-028, FR-029)

**Date**: 2026-08-07 | **Spec**: [spec.md](./spec.md), User Story 5 (Insights: Blog page reference
alignment), scoped to **only** FR-027, FR-028, and FR-029, per the Clarifications, "Story 5 — Blog
Page (Session 2026-08-07)" answers.

**Reference**: `raw-files-v2/TechGrit Website V2.2/TechGrit Blog.dc.html` exclusively.

**Scope note**: this is an independent slice, unrelated to Home Page (User Story 1), Construction
(User Story 3), or Webinar (User Story 6) above — tracked as its own block precisely so a teammate can
work any other user story in parallel without touching this section or its files. It covers **only**
the 3 FRs named above. No Home Page, Construction, Case Studies, Webinar, About, Careers, or Contact
file is touched.

### Summary

Reading `TechGrit Blog.dc.html` directly against today's `/blog` implementation:

1. **`app/blog/_components/blog-hero.tsx`** (FR-027) — the top eyebrow badge already renders a dot
   indicator (`<span className="h-2 w-2 shrink-0 rounded-full bg-orange shadow-glow-orange" aria-
   hidden="true" />`, line 11-14) that the reference's own badge (line 218-220) does not have — a
   literal `<span>` with only the uppercase label text, no dot. The `<span>` is removed; the badge's
   outer pill/border/background is otherwise already reference-correct and untouched.
2. **New `app/blog/_components/blog-filter-bar.tsx`** (FR-028) — per the Clarifications' first two
   Story 5 answers, this wires the existing, currently-unwired shared `components/ui/FilterBar.tsx`
   primitive (Blog becomes its first real consumer) around the existing `TopicFilter` chip component
   (chip pill styling is already reference-correct and untouched). The "shared parent" the
   Clarifications call for is a **new client wrapper**, `app/blog/_components/blog-filterable-
   section.tsx` (`"use client"`), which owns `activeTopic` state and the `filteredPosts` memo, and
   renders `<BlogFilterBar>` and `<BlogPostGrid>` as its own two direct children — matching the
   reference's DOM order (`data-blog-filter-bar` sits between the Featured section and the Grid
   section, not nested inside either) without requiring `app/blog/page.tsx` itself to become a client
   component. This follows the same pattern already established by `app/services/page.tsx` and
   `app/careers/page.tsx` (both keep `page.tsx` a server component and push client state into a
   dedicated section component) and avoids foreclosing a future `export const metadata` on `/blog`,
   which a client `page.tsx` cannot have. `app/blog/_components/blog-post-grid.tsx` (FR-028, continued)
   drops its own `useState`/`useMemo`/`TopicFilter` ownership entirely — it becomes a presentational
   component receiving already-filtered `posts` plus an `onReset` callback, used only by its new
   zero-results control (see item 4).
3. **`components/ui/FilterBar.tsx`** (FR-028) — its own doc comment ("Not yet wired into any page in
   this slice") confirms its label typography was placeholder, not reference-verified. Auditing its
   current default classes (`text-xs font-bold tracking-widest text-secondary uppercase` → 14px/700/
   0.16em/`rgba(255,255,255,0.72)`) against the reference's literal filter-label styling (line 252:
   `font-size:11.5px; font-weight:700; letter-spacing:0.14em; color:rgba(255,255,255,0.42)`) shows
   every value diverges. Corrected in place (on the shared component's own default, not a per-
   instance override on Blog's usage) to `text-xs-alt font-bold tracking-filter-label text-ghost
   uppercase` — `--text-xs-alt` (11.5px) and `--color-text-ghost` (`rgba(255,255,255,0.42)`, exposed as
   `text-ghost`) are both existing exact-match tokens; `tracking-filter-label` is new (see item 5).
   Fixing the shared default now (with zero current consumers) benefits Blog immediately and leaves
   Case Studies' own future FR-024 slice reference-correct on day one, rather than needing a second
   correction later — consistent with FR-044's "one consistent treatment" mandate. Its sticky
   positioning (`top-nav`, i.e. `top: var(--nav-height)` = 80px) and background (`bg-nav-glass`,
   `rgba(0,0,0,0.70)`) already match the reference's `top:80px`/`rgba(0,0,0,0.72)` closely enough to
   be an already-accepted sub-2%-opacity delta (the same class of delta already accepted elsewhere in
   this plan, e.g. the webinar announcement strip's status-dot glow) — no change needed there. Its
   `z-raised` (value `1`) z-index — semantically wrong for a sticky-positioned bar, describing
   hover-lift elevation instead — is swapped for `z-[var(--z-sticky)]` (value `10`), the arbitrary-
   value form, not a bare `z-sticky` utility: `--z-sticky` has no `@theme inline` mapping in
   `globals.css` (unlike `--z-raised`/`--z-modal`/`--z-overlay`, which are mapped), so a bare
   `z-sticky` class would silently resolve to no z-index at all, per Constitution Principle I's
   explicit warning about unmapped tokens. This mirrors the codebase's own existing precedent for
   this exact situation — `components/layout/Header.tsx:76-77` already uses `z-[var(--z-nav)]`
   rather than a bare `z-nav` class, since `--z-nav` is likewise unmapped. `10` still stays well
   under the sticky nav's own `z-nav` (`100`), preserving the reference's own "filter bar (60) below
   nav (100)" stacking order.
4. **`app/blog/_components/blog-post-grid.tsx`** (FR-028, continued) — the existing zero-results
   message ("No posts match this topic yet — check back soon.") has no control to clear/reset the
   filter, which FR-028 explicitly requires. A "Reset filter" text-button is added beneath the message,
   calling the new `onReset` prop (which `page.tsx` wires to `() => setActiveTopic("All")`) — reusing
   this app's existing clickable-text-link convention (e.g. the homepage Final CTA's secondary link)
   rather than introducing a new control pattern.
5. **`app/tokens.css`** (FR-028) — adds one new token with no existing exact match: `--ls-filter-
   label: 0.14em;` (§ Typography), deliberately not a reuse of the value-identical `--ls-hint`/
   `--ls-blog-meta`/`--ls-life-cap`/`--ls-announce-label`, per this file's own established "one job,
   one token" convention (the same reasoning already applied to each of those four). Mapped via
   `--tracking-filter-label: var(--ls-filter-label);` in `app/globals.css`'s `@theme inline` block
   (matching the sibling `--tracking-hint`/`--tracking-blog-meta`/`--tracking-life-cap`/`--tracking-
   announce-label` mappings already there), becoming the canonical `tracking-filter-label` utility.
6. **`app/blog/_components/newsletter-panel.tsx`** (FR-029) — its outer panel's `bg-ink-mid`
   (`#000000`, line 31) is swapped for `bg-glass-4` (`--color-glass-4`, `rgba(255,255,255,0.04)`) — a
   byte-identical existing token to the reference's literal newsletter-card background (line 288),
   already reused elsewhere in the app (e.g. the inactive filter chip, Re-Imagine grid cards). No new
   token, per the Clarifications' third Story 5 answer and FR-041/SC-006.

Nothing else changes. `BlogHero`'s heading/lead copy, `FeaturedPost`, `TopicFilter`'s own chip pill
styling, and `NewsletterPanel`'s form/success-state markup are untouched.

### Technical Context (Story 5 slice)

**Language/Version**: TypeScript 5 (strict) · **Primary Dependencies**: Next.js 16.2.10, React
19.2.4, Tailwind CSS v4 · **Storage**: N/A · **Testing**: N/A (no test framework in this repo; manual
verification, see Implementation Strategy below) · **Target Platform**: Web · **Project Type**: single
Next.js App Router app · **Performance Goals**: N/A (markup relocation + a state lift + 2 token
additions) · **Constraints**: no new libraries; `BlogPost`/`BlogHeroContent`/`NewsletterPanelContent`
data types are reused verbatim (no data-model change); `app/blog/page.tsx` stays a server component
(state ownership lives in a new client wrapper instead), matching the existing Services/Careers
pattern · **Scale/Scope**: 2 new files created (`blog-filter-bar.tsx`, `blog-filterable-section.tsx`),
3 existing files edited (`page.tsx`, `blog-post-grid.tsx`, `newsletter-panel.tsx`), plus
`components/ui/FilterBar.tsx`, 1 new token added to `tokens.css` (+ its `@theme inline` mapping in
`globals.css`), 0 new libraries.

### Constitution Check (Story 5 slice)

*GATE: before Phase 0 and re-checked after Phase 1 of this slice.*

- **I (Token-Only Styling)** — PASS. The one new literal value (`0.14em` letter-spacing) is added to
  `tokens.css` first, in its existing § Typography section, before `FilterBar.tsx` consumes it. Every
  other value used (`--text-xs-alt`, `--color-text-ghost`/`text-ghost`, `--color-glass-4`/`bg-glass-4`,
  `--nav-height`/`top-nav`, `--color-nav-glass`/`bg-nav-glass`, `--z-sticky`/`z-[var(--z-sticky)]`) is an existing
  exact-match token, reused verbatim — no hardcoded hex/rgba/px literal is introduced anywhere.
- **II (Breakpoints)** — PASS, not applicable — no new breakpoint-specific behavior in this slice.
- **III (Component Library)** — PASS. FR-028 is itself a Component Library conformance fix: Blog
  becomes the first real consumer of the `components/ui/FilterBar.tsx` primitive that was purpose-built
  for exactly this treatment, rather than retrofitting bespoke sticky/dark/label styling onto
  `TopicFilter` (which would itself violate FR-044). `TopicFilter`'s existing chip-button markup is
  reused as-is, nested inside the shared shell, not forked.
- **IV (References Are Visual Truth)** — PASS. Every structural and value decision (badge-dot removal,
  filter-bar DOM position/background/label/sticky offset, newsletter background) is read directly from
  `TechGrit Blog.dc.html`. The zero-results "Reset filter" control has no reference markup to copy
  (the reference's own preview-tool data binding never renders a zero-result state) — it's built to
  match this app's existing clickable-text-link convention instead, the same class of "no reference
  markup exists, reuse an existing in-app pattern" decision this plan has already made elsewhere (e.g.
  the Case Studies/Blog zero-results control decided in spec.md's Session 2026-08-03 Clarifications).
- **V (Dark-First Brand)** — PASS. No new surface fill; `bg-glass-4` and `bg-nav-glass` are both
  existing translucent dark-glass tokens already used elsewhere, not a new solid fill.
- **VI (frontend-design skill)** — PASS, invoked; see UI Design Approach below.
- No violations — Complexity Tracking is empty.

### UI Design Approach (Story 5 slice)

**UI mode**: ON (Next.js/React tech signal + spec.md content signal).

**`frontend-design` skill invocation**: consulted for this slice's two visible craft surfaces — the
filter bar's label/chip contrast and the zero-results control. Since this slice is reference-exact
matching work (not new creative direction), the skill's generic aesthetic guidance is superseded by
this repo's own repo-specific rules per AGENTS.md/CLAUDE.md wherever the two conflict (Principles I–V
win); its guidance is otherwise consulted for craft judgment where the reference and repo rules are
silent. Takeaways applied: **label contrast** — correcting the label to the reference's dimmer
`rgba(255,255,255,0.42)`/11.5px keeps it reading as a quiet, secondary "Filter" caption rather than
competing with the chips themselves for attention, consistent with this app's existing eyebrow/label
hierarchy elsewhere (How We Deliver, Industries, About). **Zero-results control** — styled as a plain
clickable-text link (not a filled button) so it reads as a low-emphasis recovery action, matching the
existing Final CTA secondary-link's resting/hover treatment (dimmer resting color, brightening on
hover) rather than introducing a new, heavier control pattern for a rare empty-state case.

**Reconciliation with Principles I–V**: none needed — the skill's guidance confirmed Principle V's
sparing-accent convention and Principle III's reuse mandate without surfacing any further conflict.

**Anchor files**: `app/blog/_components/blog-hero.tsx` (dot span removed), `app/blog/_components/
blog-filter-bar.tsx` (new — wraps `FilterBar` + `TopicFilter`), `app/blog/_components/blog-filterable-
section.tsx` (new — `"use client"`, owns `activeTopic` state, renders filter bar and grid as siblings),
`app/blog/page.tsx` (unchanged as a server component, renders `<BlogFilterableSection>`),
`app/blog/_components/blog-post-grid.tsx` (drops state ownership, adds `onReset` control),
`components/ui/FilterBar.tsx` (default label typography corrected, `z-raised` → `z-[var(--z-sticky)]`),
`app/blog/_components/newsletter-panel.tsx` (`bg-ink-mid` → `bg-glass-4`), `app/tokens.css` +
`app/globals.css` (`--ls-filter-label` / `tracking-filter-label`).

### Project Structure (Story 5 slice)

```text
app/blog/_components/
├── blog-hero.tsx              # dot <span> removed from the eyebrow badge
├── blog-filter-bar.tsx        # NEW — wraps components/ui/FilterBar.tsx (label="Filter") around
│                                # the existing TopicFilter chips
├── blog-filterable-section.tsx # NEW — "use client"; owns activeTopic state and the filteredPosts
│                                # memo; renders <BlogFilterBar> and <BlogPostGrid> as siblings
├── blog-post-grid.tsx         # activeTopic state + TopicFilter rendering removed; now presentational
│                                # (receives filtered posts), zero-results branch gains a "Reset filter"
│                                # control calling the new onReset prop
└── newsletter-panel.tsx       # bg-ink-mid → bg-glass-4

app/blog/page.tsx           # stays a server component; renders <BlogHero>, <FeaturedPost>,
                             # <BlogFilterableSection>, <NewsletterPanel>

components/ui/FilterBar.tsx  # default label classes corrected to text-xs-alt/tracking-filter-label/
                              # text-ghost; z-raised → z-[var(--z-sticky)] (arbitrary value, matching
                              # Header.tsx's own z-[var(--z-nav)] precedent — --z-sticky is unmapped)

app/tokens.css               # + --ls-filter-label (§ Typography)
app/globals.css              # + --tracking-filter-label mapping in @theme inline
```

No `data-model.md`/`contracts/` change (presentation-only, same as every other slice in this plan).
`app/blog/_data/types.ts` is unchanged — `BlogPost`/`BlogHeroContent`/`NewsletterPanelContent` are
reused verbatim, no new field.

**Structure Decision**: existing single-project structure. `blog-filter-bar.tsx` and `blog-filterable-
section.tsx` stay route-local (`app/blog/_components/`), matching their sibling section files — both
are consumed by the Blog page only, while the generic `FilterBar` shell `blog-filter-bar.tsx` wraps
stays in `components/ui/` for Case Studies' own future FR-024 slice to reuse unchanged. `FilterBar`
wraps its `children` in its own `flex flex-wrap items-center gap-2.5` div, and `TopicFilter`
independently renders an identical `flex flex-wrap items-center gap-2.5" role="group"` div around its
chips — nesting them inside `blog-filter-bar.tsx` produces two redundant, visually-identical, harmless
flex wrappers. This is an accepted, intentional redundancy, not a defect requiring `TopicFilter`'s
public shape to change for its only current consumer.

### Complexity Tracking (Story 5 slice)

*Empty — no unjustified complexity or deviation from the constitution in this slice.*

### Post-Design Constitution Re-Check (Story 5 slice)

Research (Phase 0 of this slice) confirmed the shared `FilterBar.tsx` primitive's sticky positioning
and background were already reference-correct (only its label typography and z-index token needed
correction), and confirmed every other value change (badge dot, newsletter background) resolves to an
existing exact-match token with zero new hardcoded literals beyond the one new letter-spacing token.
No violations. Gate: PASS.

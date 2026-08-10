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

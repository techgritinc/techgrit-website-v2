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

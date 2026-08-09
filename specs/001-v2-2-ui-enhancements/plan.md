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
pieces of US1 remain unplanned. Shared Foundation above (shared-primitive foundation) is unaffected
by this addendum and stays complete as documented.

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
   ghost button half of FR-003 is already satisfied by Shared Foundation's `Button.tsx` update), and remove
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

No `data-model.md`/`contracts/` (presentation-only, same as Shared Foundation). No other file is touched.

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

## Careers Apply-Modal Field Alignment (User Story 8 — FR-037a/FR-037b)

**Date**: 2026-08-05. Extends this plan to cover `app/careers/_components/application-dialog.tsx`,
per spec.md's User Story 8 update (Clarifications Session 2026-08-05, new FR-037a/FR-037b)
documenting the Apply modal's reference-exact trigger, structure, fields, and interactions against
`TechGrit Careers.dc.html`. No other Careers section (hero, stats, Open Roles filters, Life at
TechGrit, closing CTA copy/layout) is affected, and no other user story's plan changes.

**Already satisfied, no code change**: the modal-open trigger (`RoleCard`'s Apply button →
`OpenRolesSection.handleApply` → `ApplicationDialog`, plus `CareersCta`'s "Send your resume" general
entry point), its dismiss behavior (`components/ui/Modal.tsx`'s existing overlay-click/close-button/
Escape/focus-trap handling), and its reset-on-reopen behavior (`application-dialog.tsx`'s existing
`prevIsOpen` effect, which already clears all fields and errors on every open) already satisfy
FR-037a's trigger/dismiss requirements and FR-037b's reset-on-reopen requirement exactly — this
addendum's only real gap is the form's **field set** and **file-upload validation**, which today
diverge from the reference.

### Summary

1. **`app/careers/_components/application-dialog.tsx`** — replace the current field set (First
   name / Last name / Email / Phone / required "fit statement") with the reference's exact fields:
   **Full name** (one field, replacing the First/Last split), **Email**, **LinkedIn or portfolio
   URL** (optional, new), a **Resume upload** control (new — required, `.pdf`/`.doc`/`.docx`, max
   5MB), and **"Why TechGrit?"** (optional message, replacing the required "fit statement"
   textarea). The current `phone` field is dropped — no reference equivalent. Submit-time required-
   field validation now checks full name, email, and resume only (not phone/message, both optional
   per the reference).
2. **New resume-upload control** inside `application-dialog.tsx` — a clickable card wrapping a
   visually-hidden `<input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,
   application/vnd.openxmlformats-officedocument.wordprocessingml.document">`, showing an icon, the
   selected filename (or a "Click to upload your resume" placeholder), and a sub-label ("PDF, DOC,
   or DOCX" / "Click to replace file"). Its `onChange` handler enforces FR-037b: a file over 5MB
   immediately sets a specific over-size error and clears the selection (not deferred to submit); a
   valid file clears any prior error and stores the filename.
3. **`components/ui/icons.tsx`** — add one new upload icon (no existing icon in the consolidated
   icon file covers this), following the file's existing icon-export convention.
4. Success-state copy is aligned to the reference's pattern (name-aware thanks line, 2-business-day
   framing) — still a client-side-only state transition with no backend call, per FR-037a.

Nothing else changes. `RoleCard.tsx`, `open-roles-section.tsx`, `CareersCta.tsx`, and
`components/ui/Modal.tsx` are untouched — their trigger/dismiss/reset behavior already matches
FR-037a/FR-037b. Because `application-dialog.tsx` is the one shared modal behind both the per-role
Apply buttons and `CareersCta`'s general "Send your resume" entry point, this field/validation
rework applies to both entry points identically — not new scope, just this one shared component's
existing blast radius.

**Constitution check** — PASS on all six principles: no new literal value duplicates an existing
token — the validation-error box reuses the already-present `--color-error-light` (text) and
`--color-overlay-red-14`/`--color-overlay-red-40` (background/border) tokens (tagged "Careers
error-state text" since an earlier pass); the new upload icon's box background/border (reference:
`rgba(232,119,34,0.14)`/`rgba(232,119,34,0.35)`) reuses the nearest existing tokens
(`--color-overlay-orange-12`, `--color-border-orange-30`) rather than adding near-duplicate tokens
for a sub-2%-opacity delta, consistent with this plan's own precedent (Phase 2 addendum's
stat-divider-border decision). `FormField` is reused as-is for the text/email/url/textarea fields;
the new file-upload control is a one-off scoped to this one component (no existing primitive covers
a styled file-picker, and only this dialog needs one today, so it isn't promoted to
`components/ui/`, per the constitution's "don't pre-scaffold shared primitives" rule). Every
corrected field, validation rule, and copy pattern is read directly from `TechGrit Careers.dc.html`
(lines 410-455). No new surface fill; the upload icon's accent stays sparing, matching the
reference. `frontend-design` skill re-consulted for the one new visual element (the upload control):
keep its icon-chip + two-line text-stack layout exactly as the reference's inline-flex row, since it
already reads clearly against this app's existing dark glass-card language. **Anchor files**:
`app/careers/_components/application-dialog.tsx`, `components/ui/icons.tsx` (+1 icon). No
`data-model.md`/`contracts/` changes (presentation-only, same as the rest of this plan); no
`tokens.css`/`globals.css` edit (all needed tokens already exist). No other file touched.

## Careers Page — Full User Story 8 Coverage (Hero, Open Roles Filter, Life at TechGrit)

**Date**: 2026-08-05. Expands this plan's Careers coverage beyond the Apply-modal addendum directly
above to the rest of User Story 8 (spec.md): FR-035 (hero), FR-036 (Open Roles sticky filter row),
and the image-layout/copy portion of FR-038 (Life at TechGrit) — the "Inside TechGrit" `Badge` itself
was already added in Shared Foundation – T005. **The Apply-modal addendum directly above
(FR-037a/FR-037b) is unchanged and covers the Apply *form's* field/validation/copy scope — it does
not cover FR-037's own ghost-Apply-button-styling clause, which `/speckit.analyze` (2026-08-05)
found unaddressed and currently incorrect in code; see tasks.md's Careers Phase 6
(`Careers – T013`) for that documented gap.** Every value below is read directly from
`TechGrit Careers.dc.html`.

### FR-035 — Hero: audited, already reference-exact (no code change)

Compared `app/careers/_components/CareersHero.tsx` against the reference (lines 220-243) field by
field:
- Eyebrow container (`border-orange-30`/`bg-overlay-orange-10`/`px-4 py-2`) and its label text
  (`text-2xs`/`tracking-wider`/`text-strong`/uppercase/bold) already resolve to the reference's exact
  values (`rgba(232,119,34,0.3)`/`0.1`/`8px 16px`/`12.5px`/`0.10em`/`rgba(255,255,255,0.92)`).
- H1 (`text-[clamp(40px,5.2vw,58px)] tracking-[-0.035em]`) and paragraph (`mt-5 max-w-[500px]
  text-[18px] leading-[1.65] text-secondary`) both match the reference's `clamp(40px,5.2vw,58px)`/
  `-0.035em`/`20px`/`500px`/`18px`/`1.65`/`rgba(255,255,255,0.72)` exactly.
- The "Life at TechGrit" secondary CTA already consumes `variant="ghost"`, already fixed sitewide in
  Shared Foundation – T002; its per-instance `h-[54px] w-[171.719px]` sizing was already measured
  against this exact reference button. (Contrast with `RoleCard.tsx`'s Apply button, which does
  *not* consume this fix cleanly — see `Careers – T013` below.)

**Decision**: no code change for FR-035 — already satisfied. (The hero eyebrow's small dot indicator
present in code but absent from the reference is deliberately not touched here: FR-044's
cross-cutting badge-dot-removal list does not name Careers, and FR-035's own wording is scoped to
"typography, colors, and the ghost button" — adding a dot-removal requirement spec.md itself doesn't
state would be scope creep beyond what spec.md, this pass's source of truth, actually asks for.)

### FR-036 — Open Roles filter row: real gap, needs restructuring

`app/careers/_components/open-roles-section.tsx` currently renders the "Open roles" `<h2>` and
`RoleFilters`' chips in one inline flex row (`items-end justify-between`), with no sticky
positioning, no dark background, and no "Filter" label — none of which matches the reference (lines
297-310): the heading sits in its own block (`padding:50px 36px 12px`), and a separate sticky bar
below it (`position:sticky; top:80px; background:rgba(0,0,0,0.72); backdrop-filter:blur(14px);
border-top`+`border-bottom:rgba(255,255,255,0.06)`) carries a "Filter" label plus the chips.

**Decision**: wire the existing, still-unconsumed `components/ui/FilterBar.tsx` (built in
Shared Foundation – T004, not yet used by any page) into `open-roles-section.tsx` — split today's single flex row into
the `<h2>`'s own block, followed by `<FilterBar label="Filter">` wrapping `<RoleFilters .../>`.
`FilterBar`'s existing tokens already land close enough to the reference to reuse as-is (`top-nav` =
80px, an exact match; `bg-nav-glass` 0.70 vs. the reference's 0.72; `border-subtle` 0.07 vs. 0.06;
`blur-nav` 16px vs. 14px — each within the sub-2%-delta reuse tolerance already established
elsewhere in this plan, not worth new near-duplicate tokens). One real gap in the primitive itself:
`FilterBar.tsx` today only carries a `border-b`, but the reference's bar has both a top and bottom
border — add `border-t border-border-subtle` directly to `FilterBar.tsx` (it has no other consumer
yet, so this fixes the primitive for every future consumer, not a Careers-only patch, with zero risk
of visual regression elsewhere).

**Anchor files**: `app/careers/_components/open-roles-section.tsx`, `components/ui/FilterBar.tsx`
(+ top border). `role-filters.tsx`'s chip styling is unchanged — its pill/active-state colors already
match the reference.

### FR-038 — Life at TechGrit: badge done (Shared Foundation), image layout + copy still diverge

Shared Foundation – T005 already added the "Inside TechGrit" `Badge` to `LifeGallery.tsx`'s `careers`
variant — that part of FR-038 is complete. Auditing the rest against the reference (lines 334-378)
surfaced two further gaps:

1. **Supporting copy** ("updated supporting content"): `app/careers/_data/careers-data.ts`'s
   `lifeAtTechGrit.heading`/`description` ("Life at TechGrit" / "The work is hard and the standards
   are high — but we make room for the moments that turn a team into a family.") don't match the
   reference's copy ("Life at TechGrit." / "The people and the culture behind the engineering.").
   **Decision**: update both strings to the reference's exact copy.
2. **Image layout**: the reference's 4 tiles are equal-size (`aspect-ratio:3/4`, no spans) with a
   hover-reveal caption overlay per tile (a category label + a `<figcaption>`) — today's
   `careers-data.ts` images use asymmetric `tall`/`wide`/`wide3` spans (the `home` variant's own
   layout, not Careers') and `LifeGallery.tsx` has no caption-overlay markup for either variant.
   **Decision**: for the `careers` variant only (the `home` variant's own reference-matched layout is
   untouched), change every image's `span` to `"default"` in `careers-data.ts`; add two new optional
   fields to the `LifeGalleryImage` type (`captionLabel?: string`, `caption?: string`) populated with
   the reference's exact per-tile text (glasses → "The team" / "Builders and designers behind the
   engineering."; rooftop → "The office" / "Rooftop breaks, real conversations."; painting → "Craft" /
   "We take craft seriously — inside & outside code."; diwali → "Together" / "We celebrate wins — and
   Diwali — together."); and add a `careers`-only hover-caption overlay to `LifeGallery.tsx`'s tile
   markup (gradient scrim + label + figcaption, `opacity-0` → `opacity-100` on hover) gated on
   `variant === "careers"`, so the `home` variant's tiles render exactly as they do today.
3. **Heading block alignment and sizing**: the reference centers this section's eyebrow/heading/
   paragraph (`text-align:center; max-width:720px; margin:0 auto`) with `clamp(30px,3.6vw,42px)`/
   `17px` sizing; the current `careers`-branch markup is left-aligned at `clamp(28px,3.4vw,40px)`/
   `16.5px`. **Decision**: for the `careers` branch only, center the block and correct both font
   sizes to the reference's values — the `home` branch's own left-aligned block (matching *its*
   reference) is untouched.

**Also, deliberately not changed**: the reference's eyebrow for this section is a plain colored text
label (`color:#E87722`, no pill/border), not a bordered `Badge` pill — but per the same reasoning as
FR-035's dot above, spec.md's FR-038 text only requires a badge to be *present*, and
Shared Foundation already delivered that via `components/ui/Badge.tsx` (Shared Foundation – T005)
per direct prior instruction; reversing that choice is out of this pass's scope. This deviation is
now also recorded in spec.md's Assumptions section (added 2026-08-05, per `/speckit.analyze`
finding I2), so it isn't only discoverable here.

**Anchor files**: `app/careers/_data/careers-data.ts` (copy + image spans/captions),
`app/_home-components/LifeGallery.tsx` (`careers`-only: centered header block, corrected font sizes,
caption-overlay markup, updated `LifeGalleryImage` type).

### Constitution check (addendum)

- **I (Token-Only Styling)** — PASS. `FilterBar`'s sub-2%-delta reuses (`bg-nav-glass`,
  `border-subtle`, `blur-nav`) follow this plan's own established precedent for decorative deltas; no
  new hardcoded literal duplicates an existing token; the new `LifeGalleryImage.captionLabel`/
  `caption` fields are plain data, not styling.
- **II (Breakpoints)** — PASS, not applicable.
- **III (Component Library)** — PASS. `FilterBar` gets its first real consumer exactly as originally
  scoped in Shared Foundation (a primitive built ahead of its first use, not forked for this one
  caller);
  `LifeGallery`'s existing variant-branch pattern is extended, not forked, so the `home` variant is
  provably unaffected by every `careers`-gated change above.
- **IV (References Are Visual Truth)** — PASS. Every corrected value (filter-bar sticky/background/
  border; Life-section copy/layout/captions) is read directly from `TechGrit Careers.dc.html`; FR-035
  needed no correction since the hero was already reference-exact.
- **V (Dark-First Brand)** — PASS. No new surface fill; the caption overlay is a dark gradient scrim,
  consistent with this app's existing hover-reveal conventions (e.g. Testimonials video-card hover).
- **VI (frontend-design skill)** — PASS, invoked for the one new visual pattern (the caption-hover
  overlay) — see below.
- No violations — Complexity Tracking unchanged.

**UI Design Approach note**: `frontend-design` skill consulted for the caption-hover overlay.
Takeaway: keep it a simple gradient-scrim reveal (opacity + slight upward translate on hover),
matching the reference's own restrained treatment, rather than introducing a new interaction pattern
beyond what this app's existing hover-reveal conventions already establish.

**Anchor files (this addendum)**: `app/careers/_components/open-roles-section.tsx`,
`components/ui/FilterBar.tsx`, `app/careers/_data/careers-data.ts`,
`app/_home-components/LifeGallery.tsx`. No `tokens.css`/`globals.css` edit needed — every value
reuses an existing token, confirmed above. No `data-model.md`/`contracts/` change.
`CareersHero.tsx` needs no change (FR-035 audit found no gap). The Apply-modal addendum above
(`application-dialog.tsx`, `components/ui/icons.tsx`) is unaffected and unchanged by this section.

### Post-Design Constitution Re-Check (addendum)

Audited FR-035 field-by-field before concluding no change was needed, avoiding an edit that would
have duplicated already-correct values; confirmed `FilterBar`'s and `LifeGallery`'s existing
structure could be extended rather than forked before planning any new markup. No new violations.
Gate: PASS.

---

## Contact Page — "Skip the Form" Card (User Story 9 — FR-039)

**Date**: 2026-08-07. Extends this plan to cover `app/(marketing)/contact/_components/
contact-hero-form.tsx`, per spec.md's User Story 9 (FR-039, FR-040) and its Clarifications Session
2026-08-07. No other Contact element (hero copy, contact-info rows, the form card itself, "What
happens next") and no other user story is affected.

### Summary

1. **`app/(marketing)/contact/_components/contact-hero-form.tsx`** — add a new "Skip the Form" card
   to the left column, directly below the existing `CONTACT_INFO` block and above the closing of that
   column's wrapper `<div>`, matching `TechGrit Contact.dc.html` lines 248-258: an icon chip (new
   calendar icon), an amber "Skip the form" eyebrow, a "Book a 30-min discovery call now." line, and
   a "Book a call →" CTA. The CTA renders via the shared `components/ui/Button` primitive
   (`variant="primary" size="nav"`, `href="#"`) rather than bespoke markup, per Principle III and
   consistent with how the Construction page's own "Book on Calendly" placeholder already renders
   through a shared button component (`app/construction/_data/construction-content.ts` line 190).
2. **Calendly explicitly not integrated**: per spec.md's Clarifications (Session 2026-08-07), the
   "Book a call" action is a static placeholder (`href="#"`) — it MUST NOT embed Calendly's external
   `widget.js`/`widget.css` or call `Calendly.initPopupWidget()` as the reference does, since that
   would introduce a new third-party dependency this feature's scope rules out. This mirrors the
   Construction page's existing "Book on Calendly" precedent (`primaryCtaLink: "#"`), not a new
   pattern.
3. **`app/(marketing)/contact/_components/icons.tsx`** — add a new `CalendarIcon`, following this
   file's own existing convention of defining its icons locally (it already has route-local
   `MailIcon`/`ClockIcon`/`GlobeIcon` rather than importing `components/ui/icons.tsx`'s versions) —
   not a new violation introduced by this pass, just following the file's established pattern.
4. **`app/tokens.css`** — add exactly one new token, `--gradient-skip-form` (section 5, GRADIENTS),
   for the card's `linear-gradient(150deg, rgba(232,119,34,0.14), rgba(255,255,255,0.02))`
   background — no existing gradient token matches this two-stop value (research.md §17). Every
   other value the card needs (border, blur, icon-chip fill/border, eyebrow tracking/color, button
   gradient) reuses an existing exact-match token or the base `--color-orange` token via Tailwind's
   opacity-modifier syntax (`bg-orange/20 border-orange/40`), the same pattern this file's own
   `CONTACT_INFO` rows already use — see research.md §17's field-by-field table. No `globals.css`
   `@theme inline` entry is needed for the new gradient token, consistent with how every other
   gradient token in this file is consumed (via `bg-[image:var(--...)]`, not a bare utility class).

Nothing else changes. The existing contact form's fields, validation, and client-side
submit/success/reset behavior (FR-040) are untouched — no code in this addendum touches
`handleSubmit`/`handleReset` or any form field.

### Constitution check (addendum)

- **I (Token-Only Styling)** — PASS. The one new literal value with no existing token
  (`--gradient-skip-form`) is added to `tokens.css` first, per its existing numbered section, before
  any component consumes it; every other value reuses an existing exact-match token or the base
  `--color-orange` token via Tailwind's opacity modifier — no hardcoded literal duplicates an
  existing token.
- **II (Breakpoints)** — PASS, not applicable (the card wraps via the existing `flex-wrap` behavior
  already used by this same component's contact-info rows; no new breakpoint is introduced).
- **III (Component Library)** — PASS. The "Book a call" CTA renders via the existing
  `components/ui/Button` primitive (`variant="primary" size="nav"`), not a bespoke `<button>` —
  consistent with how this file's form already uses shared primitives and how Construction's own
  Calendly-placeholder CTA already renders through a shared button component.
- **IV (References Are Visual Truth)** — PASS with one recorded, spec.md-approved deviation: every
  visual value (gradient, border, blur, icon-chip fill, eyebrow tracking/color) is read directly from
  `TechGrit Contact.dc.html` lines 248-258; the one intentional divergence is the CTA's *behavior*
  (static placeholder instead of a real Calendly widget), per Clarifications Session 2026-08-07 —
  not an oversight.
- **V (Dark-First Brand)** — PASS. The card's gradient background stays a low-opacity accent tint
  (0.14/0.02 stops), not a full-surface fill; the orange accent stays confined to the icon chip,
  eyebrow text, and CTA button, consistent with existing sparing-accent usage elsewhere in this file.
- **VI (frontend-design skill)** — not re-invoked for this addendum; every visual value is a direct,
  literal read from the reference (research.md §17), with no new visual pattern requiring craft
  judgment beyond what the reference already specifies.
- No violations — Complexity Tracking unchanged.

**Anchor files**: `app/(marketing)/contact/_components/contact-hero-form.tsx`,
`app/(marketing)/contact/_components/icons.tsx` (+1 icon), `app/tokens.css` (+1 gradient token). No
`globals.css` edit, no `data-model.md`/`contracts/` change (presentation-only, same as the rest of
this plan). No other Contact file, page, or shared component is touched.

### Post-Design Constitution Re-Check (Contact addendum)

Research (this addendum, §17) confirmed every needed value against `TechGrit Contact.dc.html` and
resolved the Calendly-integration question (spec.md Clarifications, Session 2026-08-07) before any
file changes were planned. No new violations. Gate: PASS.

---

## About Us Page — Badge, Eyebrow & Culture-Gallery Grid Alignment (User Story 7)

**Date**: 2026-08-07. Extends this plan to cover User Story 7 (spec.md): FR-032 (badge dot removal),
FR-033 (eyebrow accent-symbol removal), and FR-034 (culture-photo gallery grid), per spec.md
Clarifications Session 2026-08-07's resolution of FR-034's "imagery/showcase section" ambiguity — it
targets the "Life at TechGrit" culture-photo gallery, not the single-image hero showcase. No other
About Us section (hero copy/CTAs, showcase image, Who You Are, Our Role, Values, 3-Step Plan,
Achievements, If We Partner, closing CTA) and no other user story is affected.

### Summary

1. **`app/about/_components/about-us-hero.tsx`** — remove the `<span className="status-dot
   status-orange" />` from the hero's "About TechGrit" badge (FR-032) — `TechGrit About.dc.html`'s
   own badge (line 229) is plain text with no dot at all, and this is the page's only badge.
2. **Five `<SectionEyebrow>` call sites** — add `showAccent={false}` to disable the leading dash,
   matching the already-established toggle (Shared Foundation – T003) and the reference's own
   plain-text eyebrows throughout (`TechGrit About.dc.html` lines 255, 275, 285, 339, 381) (FR-033):
   `about-how-we-work.tsx`, `about-us-our-role.tsx`, `about-us-partner.tsx`, `about-us-values.tsx`,
   `about-us-who-you-are.tsx`. **Excluded**: `about-us-culture-gallery.tsx`'s own `<SectionEyebrow>`
   call — item 6 below replaces that section's entire eyebrow/heading markup with `LifeGallery.tsx`'s
   own accent-free eyebrow, so no `showAccent` prop is needed there.
3. **`app/_home-components/LifeGallery.tsx`** — widen `LifeGalleryImage.src` from `string` to
   `string | null`. `MediaSlot` (which this component already renders images through) already
   accepts and placeholder-renders a `null`/`undefined` `src`; the type just hadn't caught up. Purely
   additive — `Home`/`Careers`' existing data always supplies a real string, so neither variant's
   output changes.
4. **`app/about/_data/types.ts`** — on `CulturePhoto`: drop the `layout: "tall" | "square" | "wide"`
   field (its asymmetric-mosaic spans have no equivalent once item 6 switches to `LifeGallery`'s
   uniform `careers`-variant grid, which ignores per-image span data entirely) and add two optional
   fields, `captionLabel?: string` and `caption?: string`, mirroring `LifeGalleryImage`'s own
   Careers-variant caption fields (data-model.md).
5. **`app/about/_data/about-us-content.ts`** — update the `cultureGallery` section's 4 `photos`
   entries from placeholder `image: null` to the same 4 real images `LifeAtTechGritContent` already
   uses on Careers (`/assets/team/glasses.png`, `rooftop.png`, `painting.png`, `diwali.png` — already
   present in `public/assets/team/`), with the reference's exact per-tile captions (`TechGrit
   About.dc.html` lines 403-430, byte-identical to Careers' own): glasses → "The team" / "Builders
   and designers behind the engineering."; rooftop → "The office" / "Rooftop breaks, real
   conversations."; painting → "Craft" / "We take craft seriously — inside & outside code."; diwali →
   "Together" / "We celebrate wins — and Diwali — together." The reference's own HTML comment marks
   this section `<!-- LIFE AT TECHGRIT (shared component — matches Homepage & Careers) -->`,
   confirming identical content across all three pages is the intended design, not a coincidence.
6. **`app/about/_components/about-us-culture-gallery.tsx`** — replace the section's bespoke
   eyebrow/heading/asymmetric-`1.4fr/1fr/1fr`-mosaic markup with a thin adapter that maps
   `section.photos` into `LifeGalleryImage[]` (`src: photo.image?.url ?? null`, `alt:
   photo.image?.alternativeText ?? ""`, `span: "default"`, `captionLabel`, `caption`) and renders
   `<LifeGallery variant="careers" heading={section.title} description={section.subtitle}
   images={...} />` (FR-034). This keeps the page's structured-content architecture intact (base
   about-us-page spec, FR-015 — `page.tsx`'s `cultureGallery` case still receives a typed `section`
   prop and still owns rendering the section) while reusing the shared primitive rather than
   maintaining a diverging mosaic.

Nothing else changes. `about-us-showcase.tsx` (the single-image hero showcase) is explicitly
unaffected by FR-034 — the reference itself renders that section as one full-width image with no
grid — and every other About section/file is untouched.

### Technical Context (addendum)

**Language/Version**: TypeScript 5 (strict) · **Primary Dependencies**: Next.js 16.2.10, React
19.2.4, Tailwind CSS v4 · **Storage**: N/A · **Testing**: N/A (no test framework in this repo; manual
verification, see `quickstart.md` addendum) · **Target Platform**: Web · **Project Type**: single
Next.js App Router app · **Performance Goals**: N/A (presentation-only) · **Constraints**: no new
libraries; the `careers` variant of `LifeGallery.tsx` is reused byte-for-byte (no new variant, no new
breakpoint) — its existing `960px`/`560px` collapse points are a sub-5%, already-established-tolerance
match for the reference's own `920px`/`560px` gallery breakpoints (`TechGrit About.dc.html` lines
98/105), consistent with this plan's own precedent for sub-2-5%-delta reuse (research.md §14) ·
**Scale/Scope**: 4 existing files edited (`about-us-hero.tsx`, 5 `SectionEyebrow` call sites across
5 files, `about-us-content.ts`, `about-us-culture-gallery.tsx`) + 2 shared-file additive widenings
(`LifeGallery.tsx`'s `src` type, `types.ts`'s `CulturePhoto` shape). No new file created, no
`tokens.css`/`globals.css` change (every value this slice needs already exists via the reused
`careers` variant).

### Constitution Check (addendum)

*GATE: before Phase 0 and re-checked after Phase 1 of this addendum.*

- **I (Token-Only Styling)** — PASS. No new literal styling value is introduced anywhere in this
  slice — the culture gallery's entire visual treatment comes from `LifeGallery.tsx`'s existing
  `careers` variant, already token-driven; the `src`/`CulturePhoto` type changes are data-shape only.
- **II (Breakpoints)** — PASS. No new breakpoint is introduced; the `careers` variant's existing
  `tg-md`/`tg-sm` (960px/560px) collapse points are reused as-is (see Technical Context above for the
  sub-5%-delta tolerance rationale, consistent with research.md §14's precedent).
- **III (Component Library)** — PASS, and this is the point of the slice: the culture gallery stops
  maintaining its own one-off asymmetric-mosaic grid and instead reuses `LifeGallery.tsx` — the same
  primitive Home and Careers already consume — exactly the "reuse whatever primitive already covers
  the need" rule this principle states. `LifeGallery.tsx` itself is extended (widened `src` type),
  not forked; `Home`'s and `Careers`' existing output is unchanged (verified: both variants' data
  always supplies non-null strings today).
- **IV (References Are Visual Truth)** — PASS. The badge-dot removal, eyebrow-accent removal, and
  gallery-grid reuse are read directly from `TechGrit About.dc.html` (lines 229, 255/275/285/339/381,
  394-431); the reference's own "shared component" comment on the Life-at-TechGrit section is direct
  textual confirmation that reusing the same component/content as Home and Careers is correct, not an
  assumption.
- **V (Dark-First Brand)** — PASS. No new surface fill or accent usage is introduced; the culture
  gallery's visual treatment is unchanged from what `LifeGallery.tsx`'s `careers` variant already
  renders on Careers today.
- **VI (frontend-design skill)** — not re-invoked for this addendum; every visual value already
  exists in the already-shipped `careers` variant (no new visual pattern requiring fresh craft
  judgment).
- No violations — Complexity Tracking unchanged.

**Anchor files**: `app/about/_components/about-us-hero.tsx`, `app/about/_components/
about-how-we-work.tsx`, `app/about/_components/about-us-our-role.tsx`, `app/about/_components/
about-us-partner.tsx`, `app/about/_components/about-us-values.tsx`, `app/about/_components/
about-us-who-you-are.tsx`, `app/about/_components/about-us-culture-gallery.tsx`, `app/about/_data/
about-us-content.ts`, `app/about/_data/types.ts`, `app/_home-components/LifeGallery.tsx` (`src` type
widening only). No `tokens.css`/`globals.css` edit. `data-model.md` gains one new section
(`CulturePhoto`/`LifeGalleryImage.src`); no `contracts/` change (presentation-only, same as the rest
of this plan). No other About file, page, or shared component is touched.

### Post-Design Constitution Re-Check (About addendum)

Research (this addendum, §18) confirmed FR-034's target section (the culture gallery, not the hero
showcase — already settled in spec.md Clarifications, Session 2026-08-07) and the `careers` variant's
exact fit (breakpoints, padding, absence of the `home`-only action buttons) before any file changed.
No new violations. Gate: PASS.

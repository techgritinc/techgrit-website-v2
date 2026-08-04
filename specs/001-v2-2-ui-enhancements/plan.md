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

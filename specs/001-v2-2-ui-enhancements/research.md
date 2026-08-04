# Phase 0 Research: Phase 1 — Shared Foundation

**Companion to**: [plan.md](./plan.md) | **Spec**: [spec.md](./spec.md)

Scope: exactly the 4 items in plan.md. No consumer migration, no `globals.css` vanilla-class
changes (the new token `@theme inline` mappings in `globals.css` are the one exception — required
by Principle I, see §1 below).

## 1. Ghost button — target values and new tokens

**Decision**: `TechGrit Homepage.dc.html` (lines 329, 584) and `TechGrit Construction.dc.html`'s
hero ghost button are byte-identical:

```
background:  linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.12))
border:      1px solid rgba(255,255,255,0.42)
blur:        12px
box-shadow:  0 8px 24px -10px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.22)
hover (reference): background → rgba(...0.4/0.2); border-color → rgba(255,255,255,0.7); translateY(-2px)
hover (implemented): translateY(-2px) only — brighten deliberately dropped, see Decision below
```

`Button.tsx`'s current `ghost` variant uses `var(--color-glass)`/`var(--color-border-strong)`/
`var(--blur-sm)` and an orange-border hover — none match. New tokens (Principle I):

| Token | Value | `tokens.css` section |
|---|---|---|
| `--gradient-ghost` | `linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.12))` | 5. GRADIENTS |
| `--gradient-ghost-hover` | `linear-gradient(180deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))` | 5. GRADIENTS |
| `--color-border-ghost` | `rgba(255,255,255,0.42)` | 4. BORDERS & GLASS |
| `--color-border-ghost-hover` | `rgba(255,255,255,0.7)` | 4. BORDERS & GLASS |
| `--shadow-btn-ghost` | `0 8px 24px -10px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.22)` | 10. SHADOWS |
| `--blur-ghost` | `12px` | 14. BACKDROP BLUR |

**Decision — hover stays lift-only**: `Button.tsx`'s `ghost` variant applies only the reference's
`translateY(-2px)` on hover; the gradient/border brighten is intentionally not wired up. The
`--gradient-ghost-hover`/`--color-border-ghost-hover` tokens above are defined (so the resting-state
tokens have their natural pair, matching the `--shadow-btn-primary`/`--shadow-btn-hover` convention
elsewhere in `tokens.css`) but currently unconsumed by any component — not a gap, a deliberate choice.

**Scope**: only `Button.tsx` consumes these tokens. `globals.css`'s `.btn-ghost` class and its
current consumers (`about-us-hero.tsx`, `services-hero.tsx`) are untouched and keep rendering as
today — no migration, no class edit.

## 2. Eyebrow — optional no-symbol variant

**Decision**: add `showAccent?: boolean` (default `true`) to `SectionEyebrow`
(`components/ui/section-eyebrow.tsx` — moved here from `reusable-components/` as part of this
plan; see Note below). No existing call site changes behavior (default preserves today's dash).
No consumer is migrated onto it.

**Note — file relocation**: `reusable-components/` held 4 files (`section-eyebrow.tsx`,
`final-cta.tsx`, `ambient-orbs.tsx`, `reveal-on-scroll.tsx`) that were genuinely cross-route but
lived outside the constitution's two documented shared-primitive locations
(`components/ui/`, `components/layout/`). All 4 are moved into `components/ui/` (imports updated
across all 23 consuming files) so `SectionEyebrow` now lives in an already-documented location —
this closes that gap without needing a constitution amendment.

## 3. `FilterBar` — new component

**Decision**: `components/ui/FilterBar.tsx` — dark background, sticky position, filter label,
renders chips via `children`. Not wired into `/blog` or `/case-studies` in this slice.

**Why `components/ui/`**: Constitution reserves it for primitives consumed by 2+ routes (Blog,
Case Studies, once wired later) — the right home even though no route consumes it yet.

## 4. `LifeGallery.tsx` — the two additions

**Decision**: `careers` variant gets an "Inside TechGrit" `Badge` (reusing `components/ui/Badge.tsx`
— exact `tone` confirmed against `TechGrit Careers.dc.html` during implementation). `home` variant
gets its two action buttons (FR-011), via `components/ui/Button.tsx`. No other markup in this file
changes — its existing inline eyebrow stays as-is.

## New tokens summary

| Token | Section |
|---|---|
| `--gradient-ghost`, `--gradient-ghost-hover` | 5. GRADIENTS |
| `--color-border-ghost`, `--color-border-ghost-hover` | 4. BORDERS & GLASS |
| `--shadow-btn-ghost` | 10. SHADOWS |
| `--blur-ghost` | 14. BACKDROP BLUR |

Each needs a matching `@theme inline` entry in `globals.css` per Principle I if consumed via a bare
Tailwind utility rather than `var(--token-name)` directly.

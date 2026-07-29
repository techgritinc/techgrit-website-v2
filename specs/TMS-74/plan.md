# Implementation Plan: Careers Page

**Branch**: `feature/TMS-74-build-careers-page` | **Date**: 2026-07-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-74/spec.md`

**Note**: `specs/TMS-74` was created manually (`cp` + manual edits), not via `.specify/scripts/bash/create-new-feature.sh`,
because that script's branch/directory detection is hardcoded to a `^[0-9]{3}-` numeric prefix and cannot produce the
`TMS-<number>` naming this repo's constitution mandates (`.specify/memory/constitution.md` §"Manual Specification
Protocol"). `setup-plan.sh`/`update-agent-context.sh` have the same limitation and are bypassed the same way, following
the precedent set by `specs/TMS-68` and `specs/TMS-69`.

## Summary

Build a new static `/careers` route that reproduces `raw-files/TechGrit Careers.dc.html` with zero intentional visual
deviation: a hero (eyebrow badge, heading, dual CTA, 4-image collage), a 4-stat strip, a 6-card "why people join and
stay" grid, a filterable Open Roles list (5 department filters × 7 static roles), the existing homepage `LifeGallery`
section reused with Careers-specific copy, and a closing CTA panel. The reference's `mailto:` apply/resume links are
replaced with a single new reusable application dialog (role-specific or general) built from an equally new `Modal`
primitive plus an extended `FormField`. Backend is not ready, so Submit is a client-side success-state transition only,
with the captured fields shaped for a drop-in future backend integration. Every new UI element reuses this repo's
existing token system and `components/ui/` primitives wherever the reference's own markup allows it.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (`@theme inline`, no `tailwind.config.ts`)
**Storage**: N/A — static local TypeScript content module (`app/careers/_data/careers-data.ts`); the application
dialog's submission is transient client component state only, no persistence
**Testing**: N/A — no test framework configured in this repo (per `CLAUDE.md`)
**Target Platform**: Web, responsive down to the project's canonical `sm` (560px) breakpoint
**Project Type**: Single Next.js App Router project rooted at `app/` — no monorepo, no `apps/`/`packages/`
**Performance Goals**: No feature-specific budget beyond the project's existing convention (IntersectionObserver-based
scroll reveal already used site-wide, reused as-is here — no new perf-sensitive code paths)
**Constraints**: Pixel-for-pixel fidelity to `raw-files/TechGrit Careers.dc.html` (Constitution Principle IV); every
color/spacing/radius value must resolve to an existing `tokens.css` token — no new hex/px/rgba literals unless a true
gap exists; no new component may duplicate an existing `components/ui/` or `globals.css` primitive
**Scale/Scope**: 1 route, 7 static roles, 5 filters, 6 benefit cards, 1 new shared `Modal` primitive, 1 backward-compatible
`FormField` extension, 1 backward-compatible `LifeGallery` prop extension, ~8 new route-local files

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Token-Only Styling | **PASS** | Every visual value the reference uses for this page already exists in `tokens.css` (`--color-border-image`, `--color-glass-4`, `--radius-xl` are literally comment-labeled "Careers" already; `--space-11`/`--space-12` cover the 26px/28px benefit-card padding). One pre-existing Principle I gap applies here: `--spacing-tg-12` (and other `space-*` entries with no `@theme inline` mirror) has no matching `--spacing-tg-*` entry in `globals.css`, so `py-tg-12` would silently fall back to Tailwind's default instead of resolving to 28px. This is the exact bug class Principle I already documents — fixed as a Foundational task (add the missing entry), not a new violation. |
| II. Documented Breakpoint Contract | **PASS** | The reference's own breakpoints (1140px / 960px / 560px) are numerically identical to this project's canonical `lg`/`md`/`sm` — confirmed in spec.md Assumptions. No remapping needed. |
| III. Centralized Non-Duplicated Component Library | **PASS** | Reuses `GlassCard` (benefit cards), `Button` (all CTAs, Apply/Submit/Cancel), `RevealOnScroll` (all six `data-reveal` sections), `LifeGallery` (Life at TechGrit, extended via props), and the `.status-dot.status-orange` + inline eyebrow-pill pattern already duplicated identically in `Hero.tsx`/`blog-hero.tsx`. Introduces exactly one new shared primitive (`components/ui/Modal.tsx` — confirmed via Assumptions that none exists) and one backward-compatible extension (`FormField.tsx` textarea variant). `RoleCard`/`RoleFilters`/`ApplicationDialog` are new but route-local (`app/careers/_components/`) since their data shape is Careers-specific and consumed by only this one route — consistent with the `app/<route>/_components/` convention, not a `components/ui/` addition. All `.map()`-rendered lists (roles, filters) key off stable `slug`/`value` fields, never display text, per the constitution's "stable identity for repeated content" rule. |
| IV. Design References Are Visual Truth | **PASS** | `raw-files/TechGrit Careers.dc.html` read in full. Its `<x-dc>`/`<helmet>`/`class Component extends DCLogic`/`<sc-for>`/`onClick="{{ ... }}"` preview-tool artifacts are reimplemented as plain React (`useState` for `filter`, `.filter().map()` for the role list, real `onClick` handlers) — none copied literally. Inline `style="color:#..."` and `rgba(...)` values map to existing tokens per the audit above. |
| V. Dark-First Brand System | **PASS** | Page stays entirely within the existing ink-navy surface, white-on-dark text ladder, and orange→amber `--gradient-brand` (CTAs only, never a surface fill) — no new palette introduced. Manrope/Space Grotesk inherited from the root layout as-is. |
| VI. UI Craft via `frontend-design` skill | **PASS** | Invoked during this planning session — see UI Design Approach below. |
| Additional Constraints (single `app/` project, layout split) | **PASS** | New files land under `app/careers/_components/` and `app/careers/_data/` (route-local, private-folder convention); the one cross-route file touched (`app/_home-components/LifeGallery.tsx`) already lives in the shared-home-section location its own convention dictates. `components/layout/nav-config.ts`/`footer-config.ts` already point `Careers` at `/careers` — confirmed via `grep`, no Header/Footer changes needed or made. |

**Initial gate result: PASS.** No unjustified violations — see Complexity Tracking for the three additive extensions,
each already called for explicitly in spec.md's Assumptions.

## UI Design Approach

*Required for UI features per Constitution Principle VI.*

**UI mode detection**: UI mode ON — tech signal (Next.js/React route, `app/careers/page.tsx`) plus an explicit,
extremely detailed pixel-fidelity brief from the user referencing a specific design reference file.

**`frontend-design` skill invocation**: Asked the skill for (1) a Modal/Dialog primitive approach fitting this repo's
existing dark glass-morphism `components/ui/` convention, (2) whether the filter capsules / role cards / benefit cards
should reuse existing primitives (`GlassCard`, `Badge`, `Button`, `FormField`) or be bespoke, and (3) craft-level polish
direction. The skill returned its generic, repo-agnostic design-thinking framework (purpose/tone/differentiation,
typography/color/motion/spatial-composition/background principles, "avoid AI slop" guidance) — it has no visibility
into this codebase's tokens or components, so none of its output was repo-specific out of the box.

**Reconciliation with Principles I–V**: This feature is a strict zero-deviation reproduction of an already-fixed
reference design, not a from-scratch creative brief — so the skill's "commit to a bold aesthetic direction" guidance is
superseded entirely by the reference's own already-fixed dark ink/orange-amber aesthetic (Principles IV/V); no new
creative direction is introduced anywhere on this page. The one piece of the skill's guidance that does apply directly —
motion as staggered reveal + purposeful hover micro-interactions — maps onto the reference's own `data-rise`/`data-reveal`
behavior, which this repo already implements site-wide via `reusable-components/reveal-on-scroll.tsx`'s `RevealOnScroll`
and the `tgrise` keyframe; both are reused as-is, with zero new motion code. Its "avoid generic/cookie-cutter patterns"
guidance is likewise already satisfied by the reference itself.

Concrete decisions:

- **Modal primitive**: New `components/ui/Modal.tsx` — the first Modal/Dialog in the codebase (per spec.md
  Assumptions). Simple conditional-render overlay (no portal library needed at this scale): full-screen backdrop +
  centered panel following the same glass-panel language already used by `.nav-dd` (`rgba(13,26,37,0.97)` fill,
  `blur(16px)`, `border-white/12`, large drop shadow). Closes on Escape, backdrop click, and an explicit close/cancel
  control; reuses the existing `CloseIcon` from `components/ui/icons.tsx`. No new keyframe — reuses the existing
  opacity/transform transition pattern already in `globals.css`.
- **Department filter pills**: Bespoke, route-local `RoleFilters` component — `Badge`'s fixed 10.5px
  uppercase/extrabold chip styling doesn't match the reference's 13.5px normal-case interactive pill with distinct
  active/inactive background+border states, so forcing `Badge` here would mean fighting its API rather than reusing
  it. Built as plain `<button>`s styled with token-backed Tailwind classes; active/inactive derived from component
  state, not duplicated per-item markup.
- **Job role cards**: Bespoke, route-local `RoleCard` — its data shape (title, department, location, employment type,
  accent dot, Apply trigger) doesn't fit `GlassCard`'s icon+title+description shape, so a new component is the correct
  call per Principle III ("only when neither convention has a fit already"). Its Apply control reuses `Button`
  (`ghost` variant) but with an `onClick` that opens the shared `Modal` + application form, replacing the reference's
  `mailto:` link per the spec's functional requirements.
- **"Why people join and stay" cards**: Reuse `GlassCard`'s existing `default` variant plus `GlassCardIcon`/
  `GlassCardTitle`/`GlassCardDescription` as-is — its visual spec (18px radius, `rgba(255,255,255,0.04)` fill,
  `rgba(255,255,255,0.1)` border) is already covered by `--radius-xl`/`--color-glass-4`/`--color-border-image`. Only
  the 28px/26px padding needs the pre-existing-but-unmapped `--space-12` token given a `--spacing-tg-12` entry in
  `globals.css`'s `@theme inline` block — a Principle I gap-fix, not a new token or a new card component.
- **Application form**: `FormField.tsx` gains an additive `multiline` variant (renders a `<textarea>` instead of
  `<input>`, same label/error/id wiring) for the "why you're a great fit" field — fully backward compatible with its
  four existing single-line call sites. The dialog composes four `FormField`s (first name, last name, email, phone)
  plus the new multiline one, and two `Button`s (`primary` = Submit, `ghost` = Cancel) exactly per spec.md Assumptions.
  The Contact page's hand-rolled form (`contact-hero-form.tsx`) is explicitly not used as a template, also per
  Assumptions — it predates `FormField`/`Button` and doesn't use either.
- **Hero eyebrow badge**: No new component. Reuses the exact inline Tailwind + `.status-dot.status-orange` pattern
  already duplicated identically in `app/_home-components/Hero.tsx` and `app/blog/_components/blog-hero.tsx` for their
  own eyebrow badges — this page's badge follows the same established per-route inline convention rather than
  extracting a third shared component for a pattern that's already inlined twice.
- **Scroll reveal**: `RevealOnScroll` wraps every `data-reveal` section (stats, why-join, roles, life, CTA) unchanged —
  byte-for-byte match of the reference's own `IntersectionObserver` behavior, zero new motion code.
- **New icons**: `components/ui/icons.tsx` (the single consolidated icon file) gains named icons for the six benefit
  cards (ship-at-AI-speed lightning bolt, book/learn, home/remote, heart/wellbeing, bar-chart/ownership,
  users/celebration) and the role-card meta row (map-pin location, clock employment-type) — matched path-for-path
  against the reference's inline SVGs, added only if no existing icon's path already matches (`LightningIcon` is
  checked first for the "Ship at AI speed" card before adding a new one).

**Anchor components / files affected**:

- New route: `app/careers/page.tsx`
- New route-local components: `app/careers/_components/CareersHero.tsx`, `StatsStrip.tsx`, `WhyJoinSection.tsx`,
  `OpenRolesSection.tsx`, `RoleFilters.tsx`, `RoleCard.tsx`, `ApplicationDialog.tsx`, `CareersCta.tsx`
- New route-local data: `app/careers/_data/careers-data.ts` (roles, filters, benefits — static content)
- New shared primitive: `components/ui/Modal.tsx`
- Modified shared primitives: `components/ui/FormField.tsx` (textarea variant), `components/ui/icons.tsx` (new icons)
- Modified shared config: `app/globals.css` (missing `--spacing-tg-12` `@theme inline` entry)
- Modified shared section: `app/_home-components/LifeGallery.tsx` (heading/eyebrow/description/images become optional
  props defaulting to today's homepage copy, so the homepage call site needs zero changes)
- Untouched (confirmed, not modified): `components/layout/Header.tsx`, `Footer.tsx`, `nav-config.ts` (already points
  `Careers` at `/careers`), `footer-config.ts`

## Project Structure

### Documentation (this feature)

```text
specs/TMS-74/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md         # Phase 1 output (/speckit.plan command)
├── quickstart.md         # Phase 1 output (/speckit.plan command)
└── tasks.md              # Phase 2 output (/speckit.tasks command)
```

No `contracts/` directory — this is a static, no-backend feature (spec.md Assumptions), matching the `specs/TMS-68`
and `specs/TMS-69` precedent of omitting `contracts/` for the same reason.

### Source Code (repository root)

```text
app/
├── careers/
│   ├── page.tsx                              # new — route entry, composes all sections
│   ├── _components/
│   │   ├── CareersHero.tsx                   # new — hero: eyebrow, heading, dual CTA, image collage
│   │   ├── StatsStrip.tsx                    # new — 4-stat strip
│   │   ├── WhyJoinSection.tsx                # new — 6× GlassCard benefit grid
│   │   ├── OpenRolesSection.tsx              # new — composes RoleFilters + RoleCard list + ApplicationDialog
│   │   ├── RoleFilters.tsx                   # new — All/Engineering/Design/Quality/Product capsule filters
│   │   ├── RoleCard.tsx                      # new — single role row (title, meta, Apply trigger)
│   │   ├── ApplicationDialog.tsx             # new — Modal-based form, role-specific or general mode
│   │   └── CareersCta.tsx                    # new — closing "Send your resume" panel
│   └── _data/
│       └── careers-data.ts                   # new — roles, filters, benefits static content (slug-keyed)
├── _home-components/
│   └── LifeGallery.tsx                       # MODIFIED — heading/eyebrow/description/images as optional props
└── globals.css                               # MODIFIED — add missing --spacing-tg-12 @theme inline entry

components/
└── ui/
    ├── Modal.tsx                              # new — shared dialog/overlay primitive
    ├── FormField.tsx                          # MODIFIED — add multiline/textarea variant
    └── icons.tsx                              # MODIFIED — add benefit-card + role-meta icons
```

**Structure Decision**: Single Next.js app, no new top-level directories. Careers-specific UI and content stay
route-local under `app/careers/_components/` and `app/careers/_data/` per the constitution's route-local convention;
only the genuinely cross-route-reusable additions (`Modal`, the `FormField` extension, new icons) go into
`components/ui/`, and `LifeGallery` is extended in place rather than forked.

## Complexity Tracking

> No unjustified Constitution Check violations — this section documents the three additive extensions called for in
> spec.md's Assumptions, for traceability, not because they need separate justification beyond what Assumptions
> already gives.

| Addition | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| New `components/ui/Modal.tsx` | No Modal/Dialog exists anywhere in the codebase today, and both the per-role Apply flow and the general "Send your resume" flow need identical dialog behavior | Hand-rolling a one-off overlay per call site would duplicate focus/Escape/backdrop-click handling twice within this same feature, violating Principle III's own no-duplication rule |
| `FormField.tsx` textarea variant | The "why you're a great fit" field needs multi-line input; no reusable multi-line field exists | A one-off hand-rolled `<textarea>` in `ApplicationDialog.tsx` would duplicate `FormField`'s label/error/`useId` accessibility wiring instead of extending it |
| `LifeGallery.tsx` prop extension | Careers needs the identical section with different heading/eyebrow/description/images; the component is currently hardcoded | Forking a second `LifeGallery`-like component for Careers would duplicate the exact JSX/grid logic already tested and shipped on the homepage |

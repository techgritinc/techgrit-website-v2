# Implementation Plan: Orbit AI Ecosystem Page (How We Work)

**Branch**: `feature/TMS-88-how-we-work-orbit-ai-ecosystem-page` | **Date**: 2026-08-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/TMS-88/spec.md`

## Summary

Build a new static page at `/how-we-work/orbit-ai-ecosystem` that reproduces `raw-files-v3/TechGrit Website V2.3/TechGrit Orbit AI.dc.html`, with five explicit, requester-confirmed deviations from that reference: the hero's stat-tile card is replaced by the existing `public/samples/dm-copilot.png` asset; the "From AI opportunity to business impact" section drops its right-side blocker-chip list and centers as a single column; the "One Integrated Path" lifecycle strip gains one extra full-width summary card; the "Built for Real-World Engineering" (why) tile grid gains one extra full-width plain-text card; and a new "What OrbitAI Helps You Achieve" (6 cards, requester-supplied copy) and "From Understanding to Working Software" (4 cards, 4D-methodology-derived copy) section are added that don't exist in the reference at all. FAQ and Related sections from the reference are dropped entirely per requester decision. A live CMS page already exists for this feature's slug (`orbit-ai-ecosystem`) with materially different real content, but per explicit requester decision this page is built static, with this spec's own content, not wired to that CMS — mirroring `app/construction/`'s static-content-module pattern rather than `what-we-do/ai-modernization`'s (now CMS-backed) pattern.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (`@tailwindcss/postcss`, CSS-first `@theme`)
**Storage**: N/A — all content is a static local TypeScript content module (`app/how-we-work/orbit-ai-ecosystem/_data/orbit-ai-content.ts`), no persistence, no CMS calls, per FR-001. A real, populated CMS page exists at `/api/pages/by-slug/orbit-ai-ecosystem` but is deliberately not read from — see spec.md Assumptions.
**Testing**: No test framework configured in this repo; verification is `npm run lint` + `npm run build` (Husky pre-commit gate) plus manual/browser-preview visual comparison against the reference file
**Target Platform**: Web (evergreen desktop + mobile browsers), server-rendered via Next.js App Router
**Project Type**: Single Next.js application rooted at `app/` (no monorepo, no `apps/`/`packages/`)
**Performance Goals**: N/A beyond standard Next.js SSR page defaults — static content, no client data fetching, no feature-specific performance target
**Constraints**: No flicker/layout shift on load (FR-019); pixel-accurate fidelity to the reference at its desktop width for every section not covered by an explicit, spec-confirmed deviation (FR-015); existing breakpoint contract only, `lg`=1140/`md`=960/`sm`=560 (FR-016)
**Scale/Scope**: One new page, 9 sections (hero, intro, capabilities, lifecycle, engineering/why, achieve, understanding-to-software, who-we-help, closing CTA — FAQ/Related explicitly dropped), 1 new route segment (`how-we-work`), 1 small prop extension to an existing shared component (`ContentBlock`), 1 new `ambient-orbs.tsx` pathname branch, 0 brand-new shared components (all content shapes map onto existing `Hero`/`ContentBlock`/`GlassCard`/`IconTile`/`ProcessSteps`/`Outcome`/`FinalCta` primitives), 1 footer-config edit

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. Token-Only Styling | All colors/spacing/radii/shadows for new markup sourced from `tokens.css`/`globals.css`'s existing `@theme inline` scale — the same orange/amber accents, glass backgrounds, and text-opacity ladder already used by `what-we-do/ai-modernization` cover every value this reference uses. No new token anticipated; any genuinely new value found during implementation gets added to `tokens.css` first, per Principle I. | PASS (verify no new token needed at Phase 1) |
| II. Documented Breakpoint Contract | Page uses the existing `lg:`/`md:`/`sm:` (1140/960/560) breakpoints for its grid collapses (5→2→1 for capability/lifecycle grids, 2→1 for the why/engineering tiles, 4→2→1 for achieve/understanding/who-we-help grids, hero 2-col→1-col). No arbitrary breakpoint values introduced. | PASS |
| III. Centralized, Non-Duplicated Component Library | Reuses `Hero`, `ContentBlock` (one small prop extension — see below), `GlassCard` (`serviceCapability`, `reimagineWhy`, `industry` variants — all pre-existing), `IconTile`, `ProcessSteps`, `Outcome`, `FinalCta`, `icons.tsx` (existing icon exports only). Route-local composition stays in `app/how-we-work/orbit-ai-ecosystem/_components/` and `_data/`, mirroring `app/construction/`. No new shared component and no per-route icon file. | PASS |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | `.dc.html`'s `x-dc`/`DCLogic`/`{{ }}` scaffolding is not copied; inline hex/px values map to tokens. The 5 spec-confirmed deviations (hero image, centered intro, 2 extra cards, 2 new sections, dropped FAQ/Related) are treated as explicit requirements layered on top of the reference, not silent drift from it. | PASS |
| V. Dark-First Brand System | Page inherits the site's `#000` surface, white-on-dark text ladder, orange→amber accent (never as a fill), Calibri/Carlito type. No new brand elements. | PASS |
| VI. UI Craft via `frontend-design` Skill | UI mode ON (tech signal: Next.js/React; content signal: hero/section/card/CTA throughout spec.md). Skill invoked during this planning phase — see "UI Design Approach" below. | PASS |

No violations requiring Complexity Tracking justification.

## UI Design Approach

**UI mode detection**: UI mode ON — tech signal (Next.js 16 + React 19, this repo's permanent default) AND content signal (spec.md references hero, section, card, and CTA throughout).

**`frontend-design` skill invocation**: Asked the skill for guidance on (1) how to make the two invented full-width "extra" cards (One Integrated Path summary, Engineering Standards statement) read as an intentional structural beat rather than an obviously bolted-on afterthought, (2) whether the two brand-new sections ("What OrbitAI Helps You Achieve", "From Understanding to Working Software") need a distinct visual treatment from their neighbors to avoid three near-identical 4-or-6-card grids in a row feeling monotonous, and (3) a motion/reveal strategy consistent with the existing `tg*` keyframes.

**Reconciliation with Principles I–V**: As with `TMS-86`, the skill's mandate to invent a bold aesthetic direction yields to Principle IV (the reference is visual truth) and Principle V (the dark-first orange→amber system, Calibri/Carlito, `tg*` motion vocabulary are fixed) for every section taken directly from the reference. The skill's craft contribution is scoped to the parts of this page that have no reference source to defer to:
- **The two "extra" full-width cards** (One Integrated Path summary; Engineering Standards statement) reuse the existing `components/ui/Outcome.tsx` primitive (heading + description, centered under the card grid it summarizes) rather than a new bespoke banner — its minimal, content-agnostic shape already reads as "a closing beat for the grid above it," which is exactly the intentional-not-bolted-on effect needed, with zero new component surface.
- **Visual variety across the achieve/understanding/who-we-help grids**: "What OrbitAI Helps You Achieve" (6 cards, no icon, `GlassCard` `reimagineWhy` variant rendering only `GlassCardTitle`/`GlassCardDescription`) is deliberately icon-less and denser (2-3 columns) to read as an outcomes checklist; "From Understanding to Working Software" (4 cards) and "Who we help" (4 cards) both use icon-led cards (`IconTile` and `GlassCard` `industry` variant respectively) so the icon-less achieve grid doesn't repeat a fourth time in a row. This is a content-driven distinction (matches which of the source sections had icons in the original ticket description), not an invented stylistic flourish.
- **Motion**: stagger hero reveals via the existing `[data-rise]`/`tgrise` pattern and wrap each below-the-fold section in `RevealOnScroll`, exactly as `app/what-we-do/ai-modernization/*` already does — no new animation vocabulary.

**Anchor components / files affected**:
- New: `app/how-we-work/orbit-ai-ecosystem/page.tsx`, `_data/types.ts`, `_data/orbit-ai-content.ts`, `_components/orbit-ai-capabilities.tsx` (How OrbitAI Works — 5 cards), `_components/orbit-ai-lifecycle.tsx` (One Integrated Path — `ProcessSteps` + `Outcome`), `_components/orbit-ai-engineering.tsx` (Built for Real-World Engineering — `IconTile` grid + `Outcome`), `_components/orbit-ai-achieve.tsx` (What OrbitAI Helps You Achieve), `_components/orbit-ai-understanding.tsx` (From Understanding to Working Software), `_components/orbit-ai-who-we-help.tsx` (Who we help)
- Extended (prop addition only, existing behavior unchanged): `components/ui/ContentBlock.tsx` — `chipsLabel`/`chips` become optional; when omitted, the component renders the eyebrow/title/description as a single centered column instead of the two-column eyebrow+chips layout, needed for the "From AI opportunity to business impact" deviation (FR-004). No existing consumer (`what-we-do/ai-modernization`) passes an empty/absent chip list today, so this is additive and non-breaking.
- Edited (minimal, mirrors FR-020): `cms/api/footer.ts` (repoint the "How We Work → Orbit AI Framework" link's `href` from `/frameworks#orbit-ai` to `/how-we-work/orbit-ai-ecosystem`)
- Extended (new pathname branch only, existing branches untouched): `components/ui/ambient-orbs.tsx` — the reference's own ambient-orbs block (lines 140-145 of the `.dc.html`) is the same 4-orb top-right/mid-left/mid-right/bottom-center geometry already established for `/careers`, `/about`, `/services`, and `/what-we-do/`, but with its own distinct opacities (0.12/0.02/0.10/0.11) that don't exactly match any existing branch — a new `/how-we-work/` branch is added following that same precedent, not a new geometry pattern.
- Reused unmodified: `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/ui/Hero.tsx`, `components/ui/GlassCard.tsx` (`serviceCapability`/`reimagineWhy`/`industry` variants), `components/ui/IconTile.tsx`, `components/ui/ProcessSteps.tsx`, `components/ui/Outcome.tsx`, `components/ui/final-cta.tsx`, `components/ui/reveal-on-scroll.tsx`, `components/ui/icons.tsx` (existing exports — `ClockIcon`, `ShieldIcon`/`ShieldCheckIcon`, `NetworkNodeIcon`, `HeartIcon`, `TrendingUpIcon`, `CheckCircleIcon`, `AwardIcon`, `SearchIcon`, `LayersIcon` cover the reference's icon shapes with no new SVGs needed)

## Project Structure

### Documentation (this feature)

```text
specs/TMS-88/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks — generated immediately after this plan)
```

### Source Code (repository root)

```text
app/
└── how-we-work/
    └── orbit-ai/
        ├── page.tsx                                # route entry — /how-we-work/orbit-ai
        │                                            # synchronous Server Component; renders
        │                                            # Hero/ContentBlock/FinalCta directly + 6
        │                                            # route-local components below
        ├── _data/
        │   ├── types.ts                            # OrbitAiSection union + entity types
        │   └── orbit-ai-content.ts                 # this spec's content, in section order
        └── _components/
            ├── orbit-ai-capabilities.tsx            # 5-card "How OrbitAI Works" grid (GlassCard serviceCapability variant)
            ├── orbit-ai-lifecycle.tsx               # "One Integrated Path" — ProcessSteps (5 steps) + Outcome (extra card)
            ├── orbit-ai-engineering.tsx             # "Built for Real-World Engineering" — IconTile grid (6 tiles) + Outcome (extra card)
            ├── orbit-ai-achieve.tsx                 # "What OrbitAI Helps You Achieve" — 6 cards, GlassCard reimagineWhy (no icon)
            ├── orbit-ai-understanding.tsx           # "From Understanding to Working Software" — 4-card IconTile grid
            └── orbit-ai-who-we-help.tsx             # "Who we help" — 4-card GlassCard industry variant
            # hero, intro, and closing CTA render components/ui/Hero + ContentBlock + final-cta.tsx
            # directly from page.tsx, as construction/page.tsx and ai-modernization/page.tsx already do

components/ui/
└── ContentBlock.tsx        # `chipsLabel`/`chips` become optional (FR-004) — existing file otherwise untouched

components/ui/ambient-orbs.tsx  # +1 new `/how-we-work/` pathname branch (reference-exact 4-orb geometry)

cms/api/footer.ts            # 1-line href edit (FR-020)
```

**Structure Decision**: Follows the established `app/<route>/_data/` + `app/<route>/_components/` + `page.tsx` composition pattern used by `app/construction/` — a static content-config array of typed sections mapped to components in `page.tsx`'s `switch (section.type)`. This deliberately does NOT follow `app/what-we-do/ai-modernization/`'s current (CMS-backed, async) pattern, per the requester's explicit decision to build this page static despite a live CMS page existing for it (see spec.md Assumptions). Genuinely cross-page-reusable pieces continue to live in `components/ui/`, never route-local, per Principle III — this page introduces no new shared component, only a small, backward-compatible prop extension to the existing `ContentBlock`.

## Complexity Tracking

No Constitution Check violations — this section is intentionally empty.

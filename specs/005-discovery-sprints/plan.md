# Implementation Plan: Discovery Sprints Page

**Branch**: `005-discovery-sprints` | **Date**: 2026-08-24 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `/specs/005-discovery-sprints/spec.md`

## Summary

Build a static, server-rendered `/how-we-work/discovery-sprints` page reproducing the TechGrit
Discovery Sprint reference prototype (minus the "Related frameworks & services" section, and with
the hero's stat panel replaced by a fixed-aspect image), plus one new section not in the reference
("What Is a Phase Zero Assessment?"). The technical approach is composition-only: every section maps
onto an existing `components/ui` primitive already proven on the Engagement Models and
AI-Accelerated Modernization pages, with one small backward-compatible prop addition to
`ProcessSteps` (to support a 4-column desktop grid alongside its existing 5-column default) and zero
new shared components.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode), Next.js 16.2.10 (App Router), React 19.2.4
**Primary Dependencies**: Tailwind CSS v4 (CSS-first `@theme`), existing `components/ui/*` primitives
**Storage**: N/A — static local TypeScript content module (no CMS/API call), consistent with other
static How We Work/What We Do pages
**Testing**: N/A — no test framework configured in this repository (per `CLAUDE.md`)
**Target Platform**: Web (server-rendered by Next.js, deployed as part of the existing app)
**Project Type**: Single Next.js App Router application (no frontend/backend split)
**Performance Goals**: No flicker/layout shift on initial render (FR-020); standard Next.js
server-component rendering, no client-side data fetching
**Constraints**: Reuse existing design tokens only (no new tokens/colors unless a genuinely new
value is required — none identified); reuse existing `components/ui` primitives before creating
new ones (FR-017); responsive at the existing `lg`/`md`/`sm` breakpoint contract (FR-018)
**Scale/Scope**: Single page, 11 sections, ~40 static content entries (cards/steps/tiles/FAQ items)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. Token-Only Styling | No new tokens required — every color/spacing/radius value needed already exists in `tokens.css`/`globals.css` (orange/amber accent, glass-card surfaces, existing font-size scale). | PASS |
| II. Documented Breakpoint Contract | Page reuses `lg`=1140px/`md`=960px/`sm`=560px via existing component breakpoints (`Hero`, `GlassCard` grids, `ContentBlock`, `ProcessSteps`, `IconTile`) — no new breakpoints introduced. | PASS |
| III. Centralized, Non-Duplicated Component Library | Every section maps to an existing `components/ui` primitive (`Hero`, `ContentBlock`, `GlassCard`+`GlassCardTitle`/`GlassCardDescription`, `Outcome`, `ProcessSteps`, `IconTile`, `Faq`, `FinalCta`). Zero new shared components. One prop addition to `ProcessSteps` (configurable column count) is additive/backward-compatible, not a duplicate. | PASS |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | Reference `.dc.html` is translated to React/Tailwind per component, not copied verbatim; `.dc.html`-only links (`TechGrit Contact.dc.html`) are re-pointed to real in-app routes (FR-015). | PASS |
| V. Dark-First Brand System | Page inherits the existing dark ink surface, orange→amber accent, Calibri/Carlito type, ALL-CAPS eyebrow labels — no new theme introduced. | PASS |
| VI. UI Craft via frontend-design Skill | UI mode ON (Next.js/React tech signal + page/section/card content signal). Skill invoked this session — see "UI Design Approach" below. | PASS |

No violations. Complexity Tracking section is not needed.

## UI Design Approach

*Required for UI features per Constitution Principle VI.*

**UI mode detection**: UI mode ON — tech signal matched (Next.js 16 + React 19 is this
repository's Primary Dependency); content signal also matched (spec.md and this plan reference
page, section, hero, card, button throughout).

**`frontend-design` skill invocation**: Asked the skill for guidance on composing 11 sections built
from mostly-existing primitives into a cohesive page, and where a new shared component vs. a
page-local composition is warranted. Guidance synthesized against this repo's actual component
inventory (`components/ui/*`) rather than a greenfield aesthetic, since Principle V has already
fixed the brand direction (dark ink surface, orange→amber accent, Calibri/Carlito, ALL-CAPS
eyebrows) and every needed shape already exists as a proven primitive:

- **Rhythm over novelty**: with 11 sections in sequence, the skill's core recommendation was to
  protect vertical rhythm and section-to-section contrast (alternating text-only vs. card-grid
  density) rather than introduce new visual devices — exactly what the existing `ContentBlock` /
  `GlassCard`-grid / `IconTile`-grid alternation already provides across the other How We Work
  pages. No new motion, texture, or layout device is introduced; the existing `RevealOnScroll` +
  `data-rise` staggered-entrance pattern (already used by `Hero` and every sibling section
  component) carries the whole page.
- **One deliberate exception — the hero's right image**: since Clarification Q1 replaces the
  reference's stat panel with a plain image, the `Hero` component's `mediaFill` mode (already used
  by Engagement Models) is the correct fit — an edge-to-edge photo with no gradient/padding chrome,
  which reads as more confident and less "template stat card" than trying to preserve any of the
  numeric panel's visual weight.
- **New-component threshold**: the skill flagged exactly one section as a genuine judgment call —
  "What Is a Phase Zero Assessment?" (FR-005, not in the reference). Recommendation: do NOT build a
  new component for it. `ContentBlock` (no-`chips` variant) already renders a centered stacked
  eyebrow/title/description; wrapping a single `GlassCard` around an `Outcome` block immediately
  below it reproduces the requested "full-width card with title and description" using two
  components that already exist and are proven, one of which (`Outcome`) has had zero consumers
  since it was built ahead-of-need for a prior feature.

**Reconciliation with Principles I–V**: No conflicts arose — the skill's guidance in this case was
about *composition and restraint* rather than a competing aesthetic, so nothing needed to yield to
Principles I–V. The skill explicitly deferred to this repo's already-decided brand system rather
than proposing an alternate direction.

**Anchor components / files affected**:
- New route: `app/how-we-work/discovery-sprints/page.tsx`
- New route-local content module: `app/how-we-work/discovery-sprints/_data/types.ts`,
  `app/how-we-work/discovery-sprints/_data/discovery-sprints-content.ts`
- New route-local section components (composition only, no new shared primitives):
  `app/how-we-work/discovery-sprints/_components/discovery-sprints-intro.tsx` (FR-004, `ContentBlock` chips variant)
  `app/how-we-work/discovery-sprints/_components/discovery-sprints-phase-zero.tsx` (FR-005, `ContentBlock` + `GlassCard`/`Outcome`)
  `app/how-we-work/discovery-sprints/_components/discovery-sprints-capabilities.tsx` (FR-006, `GlassCard` `serviceCapability` — mirrors `engagement-models-capabilities.tsx`)
  `app/how-we-work/discovery-sprints/_components/discovery-sprints-deliverables.tsx` (FR-007, `GlassCard` `default`)
  `app/how-we-work/discovery-sprints/_components/discovery-sprints-lifecycle.tsx` (FR-010, `ProcessSteps`)
  `app/how-we-work/discovery-sprints/_components/discovery-sprints-why-execute.tsx` (FR-009, `IconTile` `default` size — mirrors the reference's "why-tile")
  `app/how-we-work/discovery-sprints/_components/discovery-sprints-who-for.tsx` (FR-011, `GlassCard` `serviceCapability` — mirrors `ai-modernization-industries.tsx`)
- Existing shared components consumed as-is: `Hero`, `ContentBlock`, `GlassCard`/`GlassCardTitle`/`GlassCardDescription`, `Outcome`, `Faq`, `FinalCta`, `MediaSlot`, `RevealOnScroll`
- One additive prop change: `components/ui/ProcessSteps.tsx` gains an optional `columns` prop
  (default preserves existing `lg:grid-cols-5` behavior for current consumers; this page passes
  `columns={4}`)
- `cms/api/footer.ts`: no change needed — footer's "Discovery Sprints" link already exists per
  prior features' footer wiring; verify it points to `/how-we-work/discovery-sprints` during
  implementation (see research.md)

## Project Structure

### Documentation (this feature)

```text
specs/005-discovery-sprints/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

No `contracts/` directory — this feature has no API surface (static content, no CMS/backend call).

### Source Code (repository root)

```text
app/
└── how-we-work/
    └── discovery-sprints/
        ├── page.tsx
        ├── _data/
        │   ├── types.ts
        │   └── discovery-sprints-content.ts
        └── _components/
            ├── discovery-sprints-intro.tsx
            ├── discovery-sprints-phase-zero.tsx
            ├── discovery-sprints-capabilities.tsx
            ├── discovery-sprints-deliverables.tsx
            ├── discovery-sprints-lifecycle.tsx
            ├── discovery-sprints-why-execute.tsx
            └── discovery-sprints-who-for.tsx

components/ui/
└── ProcessSteps.tsx      # additive `columns` prop only — no other changes
```

**Structure Decision**: Single Next.js App Router app (this repo's only structure). New route
folder `app/how-we-work/discovery-sprints/` follows the exact `page.tsx` + `_data/` + `_components/`
pattern already established by `app/what-we-do/ai-modernization/` and
`app/how-we-work/engagement-models/` (Principle III / FR-001, FR-016).

## Complexity Tracking

*No Constitution Check violations — this section is not needed.*

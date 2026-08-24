# Implementation Plan: Software Product Engineering Page (What We Do)

**Branch**: `feature/TMS-86-what-we-do-software-product-engineering-page` | **Date**: 2026-08-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-86-software-product-engineering/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build the Software Product Engineering page at `/what-we-do/software-product-engineering` — the second page in TechGrit's "What We Do" service-page family — as a pixel-accurate translation of `raw-files-v3/TechGrit Website V2.3/TechGrit Product Engineering.dc.html`. The technical approach is pure reuse: every section this page needs (hero with image media, intro/blockers content block, capability card, numbered process step, icon/text tile, FAQ accordion, closing CTA band) already has a matching, unmodified `components/ui/` primitive established by the sibling AI-Accelerated Modernization page (`app/what-we-do/ai-modernization/`). This feature introduces zero new shared primitives and zero new design tokens — it is a new route (`app/what-we-do/software-product-engineering/`) composed of page-local `_components/` wrappers that feed this page's own static copy into those existing primitives, plus two one-line navigation-config edits (FR-010).

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.ts`)
**Storage**: N/A — static local TypeScript content module; no CMS/API integration this phase (per Clarifications)
**Testing**: N/A — no test framework is configured anywhere in this repo (Constitution, Development Workflow); verification is manual, per `quickstart.md`
**Target Platform**: Web — responsive desktop/laptop/tablet/mobile, evergreen browsers
**Project Type**: Single Next.js App Router web application (this repo's only structure — no monorepo, no `apps/`/`packages/`)
**Performance Goals**: No client-side data fetching, no network waterfall, and no visible layout shift on initial render — the page renders as a Server Component (matching the sibling AI-Modernization page's original pre-CMS-integration shape and `app/construction/`'s current shape); the FAQ's native `<details>`/`<summary>` needs no client JS for independent expand/collapse
**Constraints**: Token-only styling (Constitution Principle I — no new hex/px/rgba literals expected, since every value this reference needs already exists on the shipped sibling page); the documented `lg=1140/md=960/sm=560` breakpoint contract (Principle II); zero new `components/ui/` primitives — 100% reuse of `Hero`, `ContentBlock`, `GlassCard` (`serviceCapability` variant), `ProcessSteps`, `Faq`, `IconTile`, `final-cta`, and `MediaSlot` (Principle III, spec.md FR-002/FR-011)
**Scale/Scope**: One new static route, 9 content sections, 0 new shared components, 2 one-line navigation-config edits (`cms/api/footer.ts`, `cms/api/header.ts` — FR-010)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Token-Only Styling | PASS | Every visual value this reference needs (colors, radii, spacing, shadows, gradients) is already expressed through the exact same `components/ui/` primitives the sibling AI-Modernization page ships with — no new hex/px/rgba literal or new `tokens.css` entry is anticipated. Confirmed during Phase 1 design (data-model.md) that no section requires a value outside the existing token set. |
| II. Documented Breakpoint Contract | PASS | `Hero`, `ContentBlock`, `GlassCard`, `ProcessSteps` already implement the `lg/md/sm` (1140/960/560) collapse behavior internally; this page adds no new breakpoint. |
| III. Centralized, Non-Duplicated Component Library | PASS | FR-002/FR-011 explicitly forbid a new shared primitive; every section maps onto an existing, unmodified `components/ui/` component (see Project Structure below). Page-local `_components/` wrappers only supply content, matching the established `app/what-we-do/ai-modernization/_components/` pattern. |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | PASS | The reference's `DCLogic`/`{{ }}`/`sc-for` scaffolding is translated to plain React (static `.map()` over a typed content array, native `<details>` for FAQ, no client component needed) — not copied verbatim. |
| V. Dark-First Brand System | PASS | Inherits the shared `tokens.css`/`globals.css` system unchanged; preserves exact `OrbitAI™`/`4D™` trademark glyphs from the reference copy. |
| VI. UI Craft via frontend-design Skill | PASS | Invoked during this planning phase — see "UI Design Approach" below. |

No violations. Complexity Tracking is not required for this feature.

## UI Design Approach

*Required for UI features per Constitution Principle VI.*

**UI mode detection**: UI mode ON — tech signal matched (Next.js/React, this repo's Primary Dependencies) AND content signal matched (spec.md is saturated with "page", "hero", "section", "card").

**`frontend-design` skill invocation**: Asked the skill what craft guidance applies when a page is an intentional, content-only reskin of an already-shipped sibling reusing its exact component set — not a greenfield page needing a new bold aesthetic direction. The skill's own generic guidance (distinctive per-generation typography/color/motion choices, avoid convergence on repeated fonts/palettes) is written for the case where no design system yet exists.

**Reconciliation with Principles I–V**: That generic guidance doesn't apply the same way here — this repo already committed to one bold, considered aesthetic direction (Constitution Principle V: dark `#000000` surface, single orange→amber gradient accent, one Calibri/Carlito type family, ALL-CAPS wide-tracked labels, `tg*`-prefixed staggered-reveal motion) precisely so that every page in a family reads as one coherent product, not a portfolio of one-off experiments. For a service-page family sharing one reference design system, *visual consistency itself* is the deliberate design decision, not a shortcut — reinventing spacing/motion/typography per sibling page would be the actual craft failure here (a "cookie-cutter but inconsistent" result), not reuse. Per the Constitution's explicit boundary clause, Principles I–V win over the skill's generic per-page-distinctiveness guidance.

The craft decisions that *do* belong to this specific page, and were made deliberately rather than defaulted:
- **Hero image treatment**: `public/samples/svc-eng.png` (per Clarifications) rendered through `Hero`'s `mediaFill` + `MediaSlot`'s `fill`/`object-cover` path — the same treatment already established for the sibling's `dm-tech-debt.png` (padding-free edge-to-edge fill, rounded-4xl border), except this page omits `Hero`'s optional `mediaCaption` entirely (per Clarifications) — the card holds only the image, with no caption row beneath it, unlike the sibling's card.
- **Motion consistency**: reuse `Hero`'s existing staggered `data-rise` delays (crumbs .05s → badge .12s → h1 .18s → subtitle .26s → CTAs .34s → media .35s) and `RevealOnScroll` for every subsequent section, verbatim — introducing a different stagger rhythm for this page alone would read as an inconsistency, not a fresh take.
- **Content-driven differentiation**: the six capability disciplines, five lifecycle stages, and six "why" reasons are this service's own copy (Strategy/Design/Build/AI/Quality/Ops — distinct from the sibling's Assessment/Modernize/Cloud-Migrate framing) — the family's shared visual grammar plus genuinely different content is what keeps each sibling page from reading as a duplicate of the last.

**Anchor components / files affected**:
- New: `app/what-we-do/software-product-engineering/page.tsx`
- New: `app/what-we-do/software-product-engineering/_components/{software-product-engineering-capabilities,software-product-engineering-lifecycle,software-product-engineering-why,software-product-engineering-industries,software-product-engineering-faq,software-product-engineering-related}.tsx`
- New: `app/what-we-do/software-product-engineering/_data/{types.ts,software-product-engineering-content.ts}`
- Edited (1 line each, FR-010): `cms/api/footer.ts`, `cms/api/header.ts`
- Reused, unmodified: `components/ui/{Hero,ContentBlock,GlassCard,ProcessSteps,Faq,IconTile,final-cta,MediaSlot,Button,reveal-on-scroll,icons}.tsx`
- No file under `app/tokens.css`, `app/globals.css`, `components/layout/`, or any other route is touched.

## Project Structure

### Documentation (this feature)

```text
specs/TMS-86-software-product-engineering/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── checklists/
│   └── requirements.md  # Spec quality checklist (/speckit.specify command)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
app/what-we-do/software-product-engineering/
├── page.tsx                                        # Server Component; switch over content.sections
├── _components/
│   ├── software-product-engineering-capabilities.tsx         # GlassCard (serviceCapability) x6
│   ├── software-product-engineering-lifecycle.tsx            # ProcessSteps x5
│   ├── software-product-engineering-why.tsx                  # page-local WhyTile x6 (matches sibling's own pattern)
│   ├── software-product-engineering-industries.tsx           # GlassCard (serviceCapability) x3, linked
│   ├── software-product-engineering-faq.tsx                  # Faq x5 (first item defaultOpen)
│   └── software-product-engineering-related.tsx              # IconTile (compact) x6, linked
└── _data/
    ├── types.ts                                      # Page-local section/entity interfaces
    └── software-product-engineering-content.ts                 # Static typed content array (no CMS this phase)

cms/api/footer.ts   # FR-010a: 1-line href edit (svc-product entry)
cms/api/header.ts   # FR-010b: 1-line special-case addition in toMegaGroup
```

**Structure Decision**: Single Next.js App Router project (this repo's only structure — no monorepo). Route-local composition under `app/what-we-do/software-product-engineering/`, mirroring `app/what-we-do/ai-modernization/`'s file/folder architecture exactly (per the user's explicit instruction and Constitution's route-local `_components`/`_data` convention). Content is a plain static typed array consumed directly by `page.tsx` via a `switch` on `section.type` — the same shape `app/construction/` already uses and the same shape the sibling AI-Modernization page used before its later, separate CMS-integration ticket — rather than an async CMS fetch, per this feature's static-only phase scope (Clarifications).

## Complexity Tracking

*No Constitution Check violations — this section is not applicable.*

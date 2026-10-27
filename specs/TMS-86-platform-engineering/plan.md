# Implementation Plan: Platform Engineering Page (What We Do)

**Branch**: `feature/TMS-86-what-we-do-platform-engineering-page` | **Date**: 2026-08-25 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-86-platform-engineering/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build the Platform Engineering page at `/what-we-do/platform-engineering` — the fourth page in TechGrit's "What We Do" service-page family — as a pixel-accurate translation of `raw-files-v3/TechGrit Website V2.3/TechGrit Platform Engineering.dc.html`. The technical approach is pure reuse: every section this page needs (hero with image media, intro/signals content block, capability card, numbered process step, icon/text tile, mixed link/no-link platform card, FAQ accordion, closing CTA band) already has a matching, unmodified `components/ui/` primitive established by the three sibling pages. This feature introduces zero new shared primitives, zero new icons (all sixteen icon slots this page needs already exist in `components/ui/icons.tsx`), and zero new design tokens — it is a new route (`app/what-we-do/platform-engineering/`) composed of page-local `_components/` wrappers that feed this page's own static copy into those existing primitives, plus two one-line navigation-config edits (FR-010). The one genuine content/structure difference from every sibling — the "Platforms for every stage of growth" grid's mix of two non-linked and two linked cards — is expressed as a data-shape variation (an optional `href` field) rather than a new component, following a conditional-link-wrap pattern already shipped in the Data & AI Engineering sibling's own Industries component.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.ts`)
**Storage**: N/A — static local TypeScript content module; no CMS/API integration this phase (per Clarifications). Note: all three sibling pages (`ai-modernization`, `software-product-engineering`, `data-ai-engineering`) have since been upgraded to a live Strapi CMS integration in their own separate, later tickets — this feature deliberately targets their *original*, pre-upgrade static shape instead (confirmed by direct inspection of all three siblings' current CMS-integrated `page.tsx`/`_components/*.tsx`, contrasted against their own `research.md`/`data-model.md`, which still document that original static shape).
**Testing**: N/A — no test framework is configured anywhere in this repo (Constitution, Development Workflow); verification is manual, per `quickstart.md`
**Target Platform**: Web — responsive desktop/laptop/tablet/mobile, evergreen browsers
**Project Type**: Single Next.js App Router web application (this repo's only structure — no monorepo, no `apps/`/`packages/`)
**Performance Goals**: No client-side data fetching, no network waterfall, and no visible layout shift on initial render — the page renders as a Server Component; the FAQ's native `<details>`/`<summary>` needs no client JS for independent expand/collapse
**Constraints**: Token-only styling (Constitution Principle I — no new hex/px/rgba literal expected, since every value this reference needs already exists on the shipped sibling pages); the documented `lg=1140/md=960/sm=560` breakpoint contract (Principle II); zero new `components/ui/` primitives — 100% reuse of `Hero`, `ContentBlock`, `GlassCard` (`serviceCapability` variant), `ProcessSteps`, `Faq`, `IconTile`, `final-cta`, and `MediaSlot` (Principle III, spec.md FR-002/FR-011)
**Scale/Scope**: One new static route, 9 content sections, 0 new shared components, 0 new icons, 2 one-line navigation-config edits (`cms/api/footer.ts`, `cms/api/header.ts` — FR-010)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Token-Only Styling | PASS | Every visual value this reference needs (colors, radii, spacing, shadows, gradients) is already expressed through the exact same `components/ui/` primitives the sibling pages ship with — no new hex/px/rgba literal or new `tokens.css` entry is anticipated. Confirmed during Phase 1 design (data-model.md) that no section requires a value outside the existing token set. |
| II. Documented Breakpoint Contract | PASS | `Hero`, `ContentBlock`, `GlassCard`, `ProcessSteps` already implement the `lg/md/sm` (1140/960/560) collapse behavior internally; this page adds no new breakpoint. |
| III. Centralized, Non-Duplicated Component Library | PASS | FR-002/FR-011 explicitly forbid a new shared primitive; every section maps onto an existing, unmodified `components/ui/` component (see Project Structure below), and every icon this page needs (six "why" tiles, four platform/industry cards, six related-service links) already exists in `components/ui/icons.tsx` (research.md §4). The mixed link/no-link platform-card treatment reuses an already-shipped conditional-`<Link>`-wrap pattern from the Data & AI Engineering sibling's own Industries component, rather than a new prop on `GlassCard`. Page-local `_components/` wrappers only supply content, matching the established `app/what-we-do/{ai-modernization,software-product-engineering,data-ai-engineering}/_components/` pattern. |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | PASS | The reference's `DCLogic`/`{{ }}`/`sc-for` scaffolding is translated to plain React (static `.map()` over a typed content array, native `<details>` for FAQ, no client component needed) — not copied verbatim. |
| V. Dark-First Brand System | PASS | Inherits the shared `tokens.css`/`globals.css` system unchanged; preserves exact `PRISM™`/`AI IMPACT™`/`OrbitAI™` trademark glyphs from the reference copy (used only in the hero card, which per Clarifications Q4 this page renders without a caption line — the trademark string itself is not displayed on this page, unlike two of its siblings). |
| VI. UI Craft via frontend-design Skill | PASS | Invoked during this planning phase — see "UI Design Approach" below. |

No violations. Complexity Tracking is not required for this feature.

## UI Design Approach

*Required for UI features per Constitution Principle VI.*

**UI mode detection**: UI mode ON — tech signal matched (Next.js/React, this repo's Primary Dependencies) AND content signal matched (spec.md is saturated with "page", "hero", "section", "card").

**`frontend-design` skill invocation**: Asked the skill what craft guidance applies when a page is an intentional, content-only reskin of three already-shipped sibling pages, reusing their exact component set — not a greenfield page needing its own new bold aesthetic direction. The skill's own generic guidance (distinctive per-generation typography/color/motion choices, avoid convergence on repeated fonts/palettes, "never the same design twice") is written for the case where no design system yet exists.

**Reconciliation with Principles I–V**: That generic guidance doesn't apply the same way here — this repo already committed to one bold, considered aesthetic direction (Constitution Principle V: dark `#000000` surface, single orange→amber gradient accent, one Calibri/Carlito type family, ALL-CAPS wide-tracked labels, `tg*`-prefixed staggered-reveal motion) precisely so that every page in the "What We Do" family reads as one coherent product, not a portfolio of one-off experiments. For a fourth service page joining an already-established three-page family, *visual consistency itself* is the deliberate design decision, not a shortcut — reinventing spacing/motion/typography for this page alone would be the actual craft failure here (a "cookie-cutter but inconsistent" result), not reuse. Per the Constitution's explicit boundary clause, Principles I–V win over the skill's generic per-page-distinctiveness guidance — exactly the same reconciliation every prior sibling page's own plan already recorded.

The craft decisions that *do* belong to this specific page, and were made deliberately rather than defaulted:
- **Hero image treatment**: `public/samples/svc-uiux.png` (per Clarifications) rendered through `Hero`'s `mediaFill` + `MediaSlot`'s `fill`/`object-cover` path — the same treatment already established for the siblings' `svc-eng.png`/`svc-qa.png` — but with no `mediaCaption` set (per Clarifications), matching the Software Product Engineering sibling's own caption-less treatment rather than the AI-Modernization/Data & AI Engineering siblings' kept-caption one.
- **Motion consistency**: reuse `Hero`'s existing staggered `data-rise` delays (crumbs .05s → badge .12s → h1 .18s → subtitle .26s → CTAs .34s → media .35s) and `RevealOnScroll` for every subsequent section, verbatim — introducing a different stagger rhythm for this page alone would read as an inconsistency, not a fresh take.
- **Content-driven differentiation**: the six capability disciplines (Strategy, Cloud-native, DevOps, IaC, Reliability, Security), five lifecycle stages (Assess, Design, Build, Secure, Optimize), and six "why" reasons are this service's own copy and its own icon choices (lightning-bolt productivity, code-bracket delivery, shield reliability, dashboard-grid standardization, scalability-hexagon growth, award-star AI-ops) — distinct from all three siblings' own framing. The family's shared visual grammar plus genuinely different content and iconography is what keeps this fourth page from reading as a duplicate of the first three.
- **One genuine structural difference, preserved rather than normalized**: unlike every sibling's fully-linked Industries grid, this page's "Platforms for every stage of growth" grid mixes two non-clickable generic cards with two clickable industry cards — a real reference distinction (Clarifications Q3), not a design decision to smooth over for "consistency."

**Anchor components / files affected**:
- New: `app/what-we-do/platform-engineering/page.tsx`
- New: `app/what-we-do/platform-engineering/_components/{platform-engineering-capabilities,platform-engineering-lifecycle,platform-engineering-why,platform-engineering-industries,platform-engineering-faq,platform-engineering-related}.tsx`
- New: `app/what-we-do/platform-engineering/_data/{types.ts,platform-engineering-content.ts}`
- Edited (1 line each, FR-010): `cms/api/footer.ts`, `cms/api/header.ts`
- Reused, unmodified: `components/ui/{Hero,ContentBlock,GlassCard,ProcessSteps,Faq,IconTile,final-cta,MediaSlot,Button,reveal-on-scroll,icons}.tsx`
- No file under `app/tokens.css`, `app/globals.css`, `components/layout/`, or any other route is touched.

## Project Structure

### Documentation (this feature)

```text
specs/TMS-86-platform-engineering/
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
app/what-we-do/platform-engineering/
├── page.tsx                                    # Server Component; switch over content.sections
├── _components/
│   ├── platform-engineering-capabilities.tsx   # GlassCard (serviceCapability) x6
│   ├── platform-engineering-lifecycle.tsx      # ProcessSteps x5
│   ├── platform-engineering-why.tsx            # page-local WhyTile x6 (matches siblings' own pattern)
│   ├── platform-engineering-industries.tsx     # GlassCard (serviceCapability) x4, 2 non-linked + 2 linked
│   ├── platform-engineering-faq.tsx            # Faq x5 (first item defaultOpen)
│   └── platform-engineering-related.tsx        # IconTile (compact) x6, linked
└── _data/
    ├── types.ts                                # Page-local section/entity interfaces
    └── platform-engineering-content.ts         # Static typed content array (no CMS this phase)

cms/api/footer.ts   # FR-010a: 1-line href edit (svc-platform entry)
cms/api/header.ts   # FR-010b: 1-line special-case addition in toMegaGroup
```

**Structure Decision**: Single Next.js App Router project (this repo's only structure — no monorepo). Route-local composition under `app/what-we-do/platform-engineering/`, mirroring `app/what-we-do/ai-modernization/`'s, `app/what-we-do/software-product-engineering/`'s, and `app/what-we-do/data-ai-engineering/`'s original file/folder architecture exactly (per the user's explicit instruction and Constitution's route-local `_components`/`_data` convention). Content is a plain static typed array consumed directly by `page.tsx` via a `switch` on `section.type` — the same shape `app/construction/` already uses and the same shape all three sibling pages used before their own later, separate CMS-integration tickets — rather than an async CMS fetch, per this feature's static-only phase scope (Clarifications).

## Complexity Tracking

*No Constitution Check violations — this section is not applicable.*

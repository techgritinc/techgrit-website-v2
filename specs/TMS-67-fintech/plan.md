# Implementation Plan: FinTech Industry Page

**Branch**: `TMS-67-fintech` | **Date**: 2026-08-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-67-fintech/spec.md`

## Summary

Build the FinTech industry page (`/industries/fintech`) as seven CMS-driven sections — hero, "What
We Build", "AI Across the FinTech Product Lifecycle", "Our FinTech Engineering Services",
"FinTech Solutions We Support", "Featured Case Studies", closing CTA — sourced live from
`GET /api/pages/by-slug/fintech` via a new `cms/api/fintech.ts` + `cms/types/fintech.ts` pair. Per
spec.md's Clarifications, this feature also extracts the six section shapes FinTech shares with
the existing Healthcare page (`app/industries/healthcare/`) into shared, prop-driven
`components/ui/Industry*.tsx` components plus shared CMS mapper functions in a new
`cms/shared/industry-sections.ts`, migrates Healthcare onto them (behavior-preserving — SC-007),
and deletes Healthcare's six now-superseded route-local components. Construction and every other
page are untouched. No FinTech-only components are introduced (FR-016).

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (CSS-first
`@theme`), `next/image`
**Storage**: N/A — content fetched live from Strapi at request time (`cache: "no-store"`, via
`cms/api/fetcher.ts`); no database access from this app. The real response payload (re-verified
live during clarification — see spec.md Clarifications) drives `cms/types/fintech.ts`.
**Testing**: No automated test framework configured; verification is manual (`npm run dev` +
`quickstart.md`) plus the existing `npm run lint` / `npm run build` Husky pre-commit gate.
**Target Platform**: Web — Next.js App Router page (`/industries/fintech`), server-rendered,
responsive across mobile/tablet/desktop.
**Project Type**: Single web application (existing `app/` tree — no frontend/backend split).
**Performance Goals**: Standard marketing-page expectations — SC-001, no additional numeric target.
**Constraints**: Constitution Principles I–VI (token-only styling; 1140/960/560 breakpoint
contract; centralized component library — this feature is itself the promotion of six section
shapes into that library; CMS content treated as data, never copy-pasted markup; dark-first brand
system; `frontend-design` skill not required for genuinely new UI since no new visual pattern is
introduced — every shape already exists on Healthcare/Construction).
**Scale/Scope**: One new CMS-driven page (7 sections) + one behavior-preserving refactor of an
existing page (Healthcare, 8 sections) onto shared components. No auth, no pagination, no forms.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. Token-Only Styling | All six shared components are lifted verbatim from Healthcare's existing, already-token-compliant markup — no new hardcoded hex/px/rgba values (research.md §3). | PASS |
| II. Documented Breakpoint Contract | Reuses `sm:`/`md:`/`lg:` throughout, unchanged from Healthcare's existing markup (research.md §3). | PASS |
| III. Centralized, Non-Duplicated Component Library | This feature *is* the enforcement of this principle: six section shapes move from Healthcare's route-local `_components/` into `components/ui/`, eliminating the near-duplication a third FinTech copy would otherwise create. FinTech introduces zero new components (FR-016). | PASS |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | FinTech's real CMS JSON (re-verified live, spec.md Clarifications) is the structural/content source of truth, mapped into typed presentation shapes (data-model.md), never rendered from raw Strapi field names in JSX. | PASS |
| V. Dark-First Brand System | No new theme variant; reuses Healthcare's existing dark ink surface / amber accent treatment unchanged. | PASS |
| VI. UI Craft via `frontend-design` Skill | Not invoked — every section shape being built already exists pixel-for-pixel on Healthcare; there is no new creative surface to direct. The skill's remit (craft direction for new UI) doesn't apply to a lift-and-share refactor. | PASS |

No violations — Complexity Tracking table is not needed.

## UI Design Approach

**UI mode detection**: UI mode ON — tech signal (Next.js/React page under `app/industries/`) plus
content signal (a full marketing page with hero, cards, CTAs). However, this feature introduces
**no new visual pattern** — all six shared components are a verbatim generalization of Healthcare's
existing, already-shipped markup. Per Constitution Principle VI's own scope ("shapes craft/creative
direction" for new UI), a fresh `frontend-design` skill invocation is not applicable here; the
existing craft decisions already made for Healthcare/Construction are what's being preserved and
shared, not redesigned.

**Anchor components / files affected**: `components/ui/IndustryHero.tsx`,
`components/ui/IndustryCardGrid.tsx`, `components/ui/IndustryStepGrid.tsx`,
`components/ui/IndustryServiceRows.tsx`, `components/ui/IndustryTileGrid.tsx`,
`components/ui/IndustryFeaturedCases.tsx` (all new); `app/industries/fintech/page.tsx` (new);
`app/industries/healthcare/page.tsx` (updated imports only); `cms/shared/industry-sections.ts`
(new); `cms/api/fintech.ts` + `cms/types/fintech.ts` (new); `cms/api/healthcare.ts` +
`cms/types/healthcare.ts` (trimmed to page-specific pieces only). No changes to `app/tokens.css` or
`app/globals.css` — no new tokens needed (research.md §3).

## Project Structure

### Documentation (this feature)

```text
specs/TMS-67-fintech/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
├── checklists/
│   └── requirements.md
└── tasks.md              # Phase 2 output
```

### Source Code (repository root)

```text
cms/
├── shared/
│   └── industry-sections.ts   # NEW — raw Strapi shapes, presentation shapes, and mapper
│                                # functions for the 6 shapes Healthcare+FinTech share
│                                # (mapWhatWeBuild, mapProductLifecycle, mapEngineeringServices,
│                                # mapSolutionsWeSupport, mapFeaturedCapabilities), each accepting
│                                # an optional `titleOverride` for the two corrected section titles
├── types/
│   ├── healthcare.ts            # TRIMMED — re-exports shared types; keeps only
│   │                            # StrapiHealthCareSystemSection/ConnectedSystemsSection (healthcare-only)
│   └── fintech.ts                # NEW — re-exports shared types; defines StrapiFintechSection
│                                  # union (no HealthCareSystem variant) + FintechPageContent
└── api/
    ├── healthcare.ts             # UPDATED — calls shared mappers instead of local near-duplicates
    └── fintech.ts                 # NEW — fetch/parse/assemble, mirrors healthcare.ts's structure

components/ui/
├── IndustryHero.tsx              # NEW — generalized from healthcare-hero.tsx
├── IndustryCardGrid.tsx          # NEW — generalized from healthcare-what-we-build.tsx (+ optional description slot)
├── IndustryStepGrid.tsx          # NEW — generalized from healthcare-product-lifecycle.tsx
├── IndustryServiceRows.tsx       # NEW — generalized from healthcare-engineering-services.tsx
├── IndustryTileGrid.tsx          # NEW — generalized from healthcare-solutions-we-support.tsx
├── IndustryFeaturedCases.tsx     # NEW — generalized from healthcare-featured-capabilities.tsx
└── final-cta.tsx                 # existing — reused as-is by both pages

app/industries/
├── construction/                  # existing — untouched
├── healthcare/
│   ├── page.tsx                   # UPDATED — imports from components/ui/Industry* instead of ./_components/*
│   └── _components/
│       └── healthcare-connected-systems.tsx   # KEPT — healthcare-only, no FinTech equivalent
│       # DELETED: healthcare-hero.tsx, healthcare-what-we-build.tsx, healthcare-product-lifecycle.tsx,
│       # healthcare-engineering-services.tsx, healthcare-solutions-we-support.tsx,
│       # healthcare-featured-capabilities.tsx — superseded by components/ui/Industry*.tsx
└── fintech/
    └── page.tsx                   # NEW — composition root; no _components/ folder needed (FR-016)
```

**Structure Decision**: FinTech's page is a thin composition root consuming only shared
`components/ui/` primitives — no route-local `_components/` folder is created for it, since every
section shape it needs already exists (post-extraction) in the shared library. Healthcare's page
keeps its file location but its imports move from its own `_components/` to `components/ui/`, and
its six superseded files are deleted outright (not deprecated) per this repo's standing rule
against half-migrated leftovers.

## Complexity Tracking

No violations — this section is not needed.

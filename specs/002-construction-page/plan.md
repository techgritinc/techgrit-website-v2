# Implementation Plan: Construction Industry Page

**Branch**: `002-construction-page` | **Date**: 2026-07-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-construction-page/spec.md`

## Summary

Build the Construction industry page (`/construction`) as eight independent, component-wise
content sections (hero, integrations strip, industry challenges, solutions, lifecycle diagram,
advantage, impact/case studies, closing CTA), each reading its copy from a typed local content
module shaped like the provided dummy CMS response
(`contracts/construction-page-response.json`), styled entirely with the existing
design-token/utility-class system in `app/tokens.css`/`app/globals.css`, and fully responsive
across mobile/tablet/desktop using the same breakpoint contract already established for the About
Us page (560/960/1140px). Header/nav and footer are explicitly out of scope for this feature —
confirmed during clarification, another team member is delivering them separately. This feature
follows the same implementation approach as `001-about-us-page`, reusing its shared
`RevealOnScroll`/`SectionEyebrow` components from `reusable-components/` rather than duplicating
them. The closing CTA section goes one step further: `about-us-final-cta.tsx` is promoted from
`app/about/_components/` into `reusable-components/final-cta.tsx` and extended with an optional
secondary CTA prop (mirroring the `SectionEyebrow` `tone`-prop precedent), so both the About Us
and Construction pages render their closing CTA from one shared component instead of each
maintaining its own copy.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4.3.2 (via
`@tailwindcss/postcss`, CSS-first `@theme`), `next/image` (already wired in `app/layout.tsx`)
**Storage**: N/A — content is a typed, in-repo dummy module
(`app/construction/_data/construction-content.ts`) shaped like
`contracts/construction-page-response.json`; no database. Live CMS wiring is out of scope (see
spec.md Assumptions).
**Testing**: No automated test framework is configured in this repo (confirmed in constitution's
Development Workflow section); verification is manual (`npm run dev` + responsive check) plus the
existing `npm run lint` / `npm run build` gate (Husky pre-commit).
**Target Platform**: Web — Next.js App Router page (`/construction`), rendered server-side,
responsive across mobile/tablet/desktop browsers.
**Project Type**: Single web application (existing `app/` tree — no frontend/backend split).
**Performance Goals**: Standard marketing-page expectations — no additional numeric target beyond
spec's SC-001 (value prop identifiable within first screen) and avoiding layout shift on the hero
visual (uses `next/image`'s `preload` when a real image is present, matching the About Us
showcase's approach).
**Constraints**: Must comply with constitution Principles I–V (token-only styling; the documented
1140/960/560 breakpoint contract, already correctly configured in `app/globals.css`'s `@theme
inline` block by `001-about-us-page`; reuse of existing `globals.css` utility classes and the
`reusable-components/` shared components; treat `raw-files/*.dc.html` as visual reference only,
never copy-paste its tool-specific markup; dark-first brand system) and the Additional Constraints
section (new page-specific code stays inside `app/construction/`; cross-page-reusable code stays
in the existing `reusable-components/` directory rather than a new duplicate location).
**Scale/Scope**: One static content page, 8 sections, dummy/local content source, no auth, no
pagination, no forms.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. Token-Only Styling | All section styling uses `var(--token-name)` / Tailwind utilities generated from `@theme inline`; no new hardcoded hex/px values. The reference's near-duplicate amber (`#fbbf24`) is mapped to the existing `--color-amber-light` token instead of adding a new one (research.md §4). | PASS |
| II. Documented Breakpoint Contract | Reuses the 1140/960/560 breakpoints via Tailwind `sm:`/`md:`/`lg:` prefixes — already correctly configured in `@theme inline` by `001-about-us-page`; no further breakpoint work needed. | PASS |
| III. Centralized Utility-Class Component Library | Reuses `.btn`/`.card`/`.glass-card`/`.eyebrow`/`.text-gradient`/`.tg-container`/`.section` and the shared `reusable-components/reveal-on-scroll.tsx` + `reusable-components/section-eyebrow.tsx` (extended with a `tone` prop, research.md §5, rather than forked). The closing CTA also reuses a shared component: `about-us-final-cta.tsx` is promoted to `reusable-components/final-cta.tsx` and extended with an optional secondary CTA prop so Construction's two-button closing section (primary schedule + secondary email) renders from the same component as About Us's single-button closing section, rather than Construction forking its own copy. Header/footer explicitly excluded from this feature (they belong to the one shared `Header`/`Footer` component per this same principle, being built separately). | PASS |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | `TechGrit Construction.dc.html` is used only to identify sections/copy/layout/icon intent; its `x-dc`/`DCLogic`/`{{ }}`/`sc-for`/`sc-if` scaffolding, inline hex styles, real external Calendly URL, and placeholder footer legal links are explicitly not carried into the React components as-is (footer isn't part of this feature; the Calendly link is deliberately swapped for a placeholder per clarification). | PASS |
| V. Dark-First Brand System | Page uses the existing dark ink surface, orange→amber accent gradient (CTAs and eyebrow accents only, never as a fill), Manrope/Space Grotesk via the already-configured `next/font` setup in `app/layout.tsx`. No v1-light variant or additional named frameworks (4D™/PRISM™/AI IMPACT™) are referenced by the Construction copy — only OrbitAI™ (the diagram's central engine), which is the one framework name confirmed to recur across dark-theme pages. | PASS |
| Additional Constraints (single `app/`-rooted project + reusable-components) | New page-specific code added under `app/construction/` only (`page.tsx`, `_components/`, `_data/`); cross-page-reusable pieces reused from (and, for the tone prop, extended in) the existing `reusable-components/` directory rather than a new duplicate location. No new top-level directory introduced. | PASS |

No violations — Complexity Tracking table is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/002-construction-page/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
├── contracts/
│   └── construction-page-response.json   # Phase 1 output (dummy CMS-shaped content contract)
├── checklists/
│   └── requirements.md
└── tasks.md              # Phase 2 output (/speckit.tasks — not created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── layout.tsx                                          # existing — untouched by this feature
├── globals.css                                         # existing — untouched (breakpoints already correct)
├── tokens.css                                          # existing — untouched (no new tokens needed; see research.md §4)
├── page.tsx                                             # existing style-kit page — untouched
├── about/
│   ├── page.tsx                                         # modified — imports `FinalCta` from reusable-components/ instead of the local component
│   └── _components/
│       └── about-us-final-cta.tsx                       # removed — superseded by reusable-components/final-cta.tsx
└── construction/
    ├── page.tsx                                         # new — Construction route, composes the 8 sections in order from construction-content.ts
    ├── _data/
    │   ├── construction-content.ts                      # new — typed dummy content module (data-model.md ConstructionPageContent)
    │   └── types.ts                                      # new — PageSectionEntry discriminated union + section field types (data-model.md)
    └── _components/
        ├── construction-hero.tsx                         # new — FR-001, FR-002
        ├── construction-integrations-strip.tsx            # new — FR-003
        ├── construction-challenges.tsx                    # new — FR-004
        ├── construction-solutions.tsx                     # new — FR-005
        ├── construction-lifecycle-diagram.tsx              # new — FR-006, FR-012
        ├── construction-advantage.tsx                      # new — FR-007
        └── construction-impact.tsx                         # new — FR-008
        # (no construction-final-cta.tsx — FR-009 is rendered via reusable-components/final-cta.tsx)

reusable-components/
├── reveal-on-scroll.tsx                                 # existing — reused as-is
├── section-eyebrow.tsx                                  # existing — extended with `tone?: "orange" | "amber"` prop (research.md §5)
└── final-cta.tsx                                        # new — promoted from app/about/_components/about-us-final-cta.tsx; renamed export `FinalCta`; extended with an optional `secondaryCta?: { label: string; link: string }` prop so Construction's primary+secondary (schedule + email) closing CTA can reuse it — About Us's existing single-CTA usage is unaffected since the prop is optional
```

**Structure Decision**: Single Next.js App Router project (no frontend/backend split — matches the
existing repo shape). All new page-specific code for this feature lives under the
route-colocated `app/construction/` folder using Next.js's underscore-prefixed private folders
(`_components`, `_data`), exactly mirroring `001-about-us-page`'s structure, so nothing here is
treated as a route and no new top-level directory is introduced. Genuinely cross-page-reusable
pieces continue to live in the existing top-level `reusable-components/` directory. This mirrors
FR-010's requirement that each content section be an independent, self-contained, reorderable
block: each section is its own component file taking its slice of `ConstructionPageContent` as
props, and `app/construction/page.tsx` is a thin composition root that maps the ordered `sections`
array to the matching component per `data-model.md`'s "Mapping to components" table. The one
exception is the closing CTA: since both `001-about-us-page` and this feature need a
visually-identical closing panel (only the CTA count differs — About Us has one action, Construction
has two), that section is promoted to `reusable-components/final-cta.tsx` and consumed by both
pages' composition roots, rather than Construction adding its own near-duplicate
`construction-final-cta.tsx`. This still satisfies FR-010 — the section remains a single,
self-contained, reorderable block — it is simply implemented once and shared, matching how
`RevealOnScroll`/`SectionEyebrow` are already shared today.

## Complexity Tracking

*No Constitution Check violations — this section is intentionally empty.*

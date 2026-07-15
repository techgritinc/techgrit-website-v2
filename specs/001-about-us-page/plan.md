# Implementation Plan: About Us Page

**Branch**: `001-about-us-page` | **Date**: 2026-07-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-about-us-page/spec.md`

## Summary

Build the About Us page (`/about`) as ten independent, component-wise content sections (hero,
showcase image, who-you-are, our role, values, process, achievements, partner outcomes, culture
gallery, closing CTA), each reading its copy from a typed local content module shaped like the
provided dummy CMS response (`contracts/about-us-page-response.json`), styled entirely with the
existing design-token/utility-class system in `app/tokens.css`/`app/globals.css`, and fully
responsive across mobile/tablet/desktop using a corrected Tailwind breakpoint contract
(560/960/1140px). Header/nav and footer are explicitly out of scope (shared-layout components,
to be delivered separately).

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4.3.2 (via
`@tailwindcss/postcss`, CSS-first `@theme`), `next/image`, `next/font` (already wired in
`app/layout.tsx`)
**Storage**: N/A — content is a typed, in-repo dummy module (`app/about/_data/about-us-content.ts`)
shaped like `contracts/about-us-page-response.json`; no database. Live CMS wiring is out of scope
(see spec.md Assumptions).
**Testing**: No automated test framework is configured in this repo (confirmed in constitution's
Development Workflow section); verification is manual (`npm run dev` + responsive check) plus the
existing `npm run lint` / `npm run build` gate (Husky pre-commit).
**Target Platform**: Web — Next.js App Router page (`/about`), rendered server-side, responsive
across mobile/tablet/desktop browsers.
**Project Type**: Single web application (existing `app/` tree — no frontend/backend split).
**Performance Goals**: Standard marketing-page expectations — no additional numeric target beyond
spec's SC-001 (value prop identifiable within first screen) and avoiding layout shift on the hero
showcase image (uses `next/image`'s `preload`, the Next 16 replacement for the deprecated
`priority` prop, since it is the likely LCP element).
**Constraints**: Must comply with constitution Principles I–V (token-only styling; the documented
1140/960/560 breakpoint contract; reuse of existing `globals.css` utility classes; treat
`raw-files/*.dc.html` as visual reference only, never copy-paste its tool-specific markup; dark-
first brand system) and the Additional Constraints section (no new top-level `components/`/`lib/`
directory — new code stays inside `app/`).
**Scale/Scope**: One static content page, 10 sections, dummy/local content source, no auth, no
pagination, no forms.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. Token-Only Styling | All section styling uses `var(--token-name)` / Tailwind utilities generated from `@theme inline`; no new hardcoded hex/px values planned. Any genuinely new primitive (if needed) is added to `globals.css` first. | PASS |
| II. Documented Breakpoint Contract | Reuses the mandated 1140/960/560 breakpoints via Tailwind `sm:`/`md:`/`lg:` prefixes. Requires one small, additive fix (research.md §5): add `--breakpoint-sm/md/lg` overrides to the `@theme inline` block so those prefixes actually collapse at 560/960/1140 instead of Tailwind's defaults — this makes the existing documented contract true, it does not change or invent a new contract. | PASS (with a small, justified `@theme` addition — not a violation, see research.md §5) |
| III. Centralized Utility-Class Component Library | Reuses `.btn`/`.card`/`.glass-card`/`.eyebrow`/`.badge`/`.text-gradient`/`.divider`/`.container`/`.section` and the existing `tgrise` keyframe/`[data-rise]` class. Header/footer explicitly excluded from this feature (they belong to the one shared `Header`/`Footer` component per this same principle). | PASS |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | `TechGrit About.dc.html` is used only to identify sections/copy/layout intent; its `x-dc`/`DCLogic`/`{{ }}`/`sc-for`/`sc-if` scaffolding, inline hex styles, and placeholder footer legal links are explicitly not carried into the React components (footer isn't even part of this feature). | PASS |
| V. Dark-First Brand System | Page uses the existing dark ink surface, orange→amber accent gradient (CTAs only, never as a fill), Manrope/Space Grotesk via the already-configured `next/font` setup in `app/layout.tsx`. No v1-light variant or additional named frameworks (OrbitAI™/4D™/PRISM™/AI IMPACT™) are referenced by the About Us copy — none apply here. | PASS |
| Additional Constraints (single `app/`-rooted project) | New code added under `app/about/` only (`page.tsx`, `_components/`, `_data/`); no new top-level `components/`/`lib/`/`types/` directory created. | PASS |

No violations — Complexity Tracking table is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/001-about-us-page/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
├── contracts/
│   └── about-us-page-response.json   # Phase 1 output (dummy CMS-shaped content contract)
├── checklists/
│   └── requirements.md
└── tasks.md              # Phase 2 output (/speckit.tasks — not created by /speckit.plan)
```

### Source Code (repository root)

```text
app/
├── layout.tsx                                  # existing — untouched by this feature
├── globals.css                                 # existing — gains --breakpoint-sm/md/lg theme keys (research.md §5); no other structural change
├── tokens.css                                  # existing — untouched (no new tokens expected; see research.md §4)
├── page.tsx                                     # existing style-kit page — untouched
└── about/
    ├── page.tsx                                 # new — About Us route, composes the 10 sections in order from about-us-content.ts
    ├── _data/
    │   ├── about-us-content.ts                  # new — typed dummy content module (data-model.md AboutUsPageContent)
    │   └── types.ts                              # new — PageSectionEntry discriminated union + section field types (data-model.md)
    └── _components/
        ├── about-us-hero.tsx                     # new — FR-001
        ├── about-us-showcase.tsx                 # new — FR-002, FR-013
        ├── about-us-who-you-are.tsx               # new — FR-003
        ├── about-us-our-role.tsx                  # new — FR-004
        ├── about-us-values.tsx                    # new — FR-005
        ├── about-us-process.tsx                   # new — FR-006
        ├── about-us-achievements.tsx               # new — FR-007
        ├── about-us-partner.tsx                    # new — FR-008
        ├── about-us-culture-gallery.tsx             # new — FR-009, FR-013
        ├── about-us-final-cta.tsx                   # new — FR-010
        └── reveal-on-scroll.tsx                     # new — shared client component, IntersectionObserver-based reveal (research.md §7)

public/
└── images/
    └── about-us/                                # new — placeholder image assets referenced by about-us-content.ts
```

**Structure Decision**: Single Next.js App Router project (no frontend/backend split — matches the
existing repo shape). All new code for this feature lives under the route-colocated
`app/about/` folder using Next.js's underscore-prefixed private folders (`_components`, `_data`)
so nothing here is treated as a route and no new top-level shared directory (`components/`,
`lib/`) is introduced, per the constitution's Additional Constraints. This mirrors FR-011's
requirement that each content section be an independent, self-contained, reorderable block: each
section is its own component file taking its slice of `AboutUsPageContent` as props, and
`app/about/page.tsx` is a thin composition root that maps the ordered `sections` array to the
matching component per `data-model.md`'s "Mapping to components" table.

## Complexity Tracking

*No Constitution Check violations — this section is intentionally empty.*

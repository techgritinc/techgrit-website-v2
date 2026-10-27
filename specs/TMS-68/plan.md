# Implementation Plan: Case Studies Listing & Detail Pages

**Branch**: `TMS-68` | **Date**: 2026-07-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-68/spec.md`

**Note on prerequisite scripts**: `.specify/scripts/bash/setup-plan.sh` / `check-prerequisites.sh` /
`common.sh` gate on `check_feature_branch()` requiring a `^[0-9]{3}-` branch name. This repo's actual
convention is JIRA-ticket branches (`feature/TMS-68-Case-studies-listing-and-detail-pages`), so that
gate does not match here. Per this repo's established precedent (see `specs/TMS-66/plan.md`), the
shared scripts are left unmodified and their effect — locating `FEATURE_SPEC`, `IMPL_PLAN`,
`SPECS_DIR` under `specs/TMS-68/` — is replicated manually instead of invoked.

## Summary

Build two new static, content-driven pages — a case-studies list page (`/case-studies`) and a
case-study detail page (`/case-studies/[slug]`) — reusing the site's existing shared Header/Footer,
token system, and reusable components. Content (six teaser case studies, one marked featured, and
one fully-narrated case study reused as placeholder narrative for every detail page per spec.md's
Assumptions) is authored as a typed local content module so the page/section structure needs no
change when a future dynamic content source replaces the static data (FR-012/SC-005). All six accent
colors used across cards already exist as named tokens in `app/tokens.css` — no new design tokens are
introduced.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4
**Storage**: N/A — content is a static local TypeScript module; no persistence layer
**Testing**: No automated test framework configured in this repo; manual verification via
`npm run dev` + `npm run lint` + `npm run build` (Husky pre-commit gate)
**Target Platform**: Web (all evergreen browsers), responsive from phone width (~375px) to wide
desktop
**Project Type**: Single Next.js App Router web project (no frontend/backend split)
**Performance Goals**: No numeric budget specified by spec.md; follow existing site conventions
(no layout shift from missing dimensions, no render-blocking client JS beyond existing
`RevealOnScroll` pattern)
**Constraints**: No raster images required anywhere in this feature (both `.dc.html` reference files
use only inline SVG) — `next/image` is not needed for TMS-68, unlike TMS-66/TMS-65
**Scale/Scope**: 2 routes, 6 case-study content records, ~10 new page-local components, 0 new design
tokens, 0 shared-layout (`Header`/`Footer`/nav-config/footer-config) changes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Gate | Status |
|---|---|---|
| I. Token-Only Styling | No new hardcoded hex/px values; only `app/tokens.css` custom properties and Tailwind utilities generated from the `@theme inline` block | **PASS** — all 6 accent hexes in the reference (`#38bdf8`, `#E87722`, `#F59E0B`, `#2dd4bf`, `#0284C7`, `#fbbf24`) already exist as named tokens (`--color-blue-light`, `--color-orange`, `--color-amber`, `--color-teal-light`, `--color-blue`, `--color-yellow`); no new tokens needed |
| II. Documented Breakpoint Contract | Responsive behavior uses the documented `tg-sm:`/`tg-md:`/`tg-lg:` (560/960/1140) prefixes, not ad-hoc breakpoints | **PASS** — see research.md §5 |
| III. Centralized Utility-Class Component Library | Reuse existing utility classes (`.card-solid`, `.eyebrow`, `SectionEyebrow`, `RevealOnScroll`) rather than re-implementing equivalents per page | **PASS** — see research.md §4, §7, §8 |
| IV. Design References Are Visual Truth Not Copy-Paste Source | `.dc.html` markup/scaffolding (`x-dc`, `DCLogic`, `sc-for`/`sc-if`) is translated into real React/Next.js, not copied verbatim; content is normalized against spec.md where the reference is internally inconsistent | **PASS** — see research.md §10 (related-case-studies self-exclusion) |
| V. Dark-First Brand System | Uses the existing dark ink-navy palette, Manrope/Space Grotesk type, orange→amber accent system; no new competing palette | **PASS** — no new colors; existing fonts only |
| VI. UI Craft via `frontend-design` Skill | Skill invoked during planning; its generic aesthetic guidance reconciled against Principles I–V before being applied | **PASS** — see UI Design Approach below |

No violations. Complexity Tracking table is empty.

## UI Design Approach

**UI mode detection**: UI mode ON — tech signal matched (Next.js/React page components) and content
signal matched: spec.md describes a fully user-visible hero/grid/detail page surface with no backend
component.

**`frontend-design` skill invocation**: Asked for aesthetic direction, component architecture, and
motion/interaction strategy for the list page (hero, one featured card, 3-col teaser grid of 6 cards
each with a distinct accent color, closing CTA) and the detail page (2-col hero with decorative
panel, 4-metric strip, 2-col body with 4 anchored narrative subsections including a 3-node
architecture flow diagram, a pinned-then-in-flow team-composition aside, a 3-card related-cases
section, closing CTA) — within this repo's existing dark-first token system, shared Header/Footer,
`RevealOnScroll`/`SectionEyebrow` reusables, and `.badge-*` utility classes from TMS-66. The skill
returned its standard generic playbook: commit to one bold, extreme aesthetic direction; avoid
AI-slop defaults (Inter, purple-gradient-on-white, evenly-timid palettes); pair a distinctive display
face with a refined body face; use staggered reveal-on-load as the one big motion moment rather than
scattered micro-interactions; use asymmetry/overlap/generous negative space; add atmosphere via
gradient meshes, tinted glows, and layered transparency rather than flat solid panels.

**Reconciliation with Principles I–V**: The skill's "pick a bold extreme, avoid generic fonts"
guidance is already satisfied by this repo's existing system rather than requiring anything new —
Principle V mandates the existing dark ink-navy + Manrope/Space Grotesk + orange→amber system, so no
new typography or palette is introduced (the skill's suggestion to "pick unique fonts" yields to the
already-committed brand system). The skill's "add atmosphere via gradient meshes and tinted glows"
guidance maps directly onto the reference's per-card `hexA(accent, opacity)`-derived cover gradients
and glow blobs — implemented here as token-only `color-mix(in srgb, var(--color-X) Y%, transparent)`
expressions (research.md §6), keeping the atmospheric effect the skill recommends while staying
inside Principle I. The skill's "one well-orchestrated staggered reveal" guidance is already the
exact mechanism `RevealOnScroll`/`data-reveal` provides (research.md §8) — reused as-is rather than
building a new motion primitive. Where the skill's generic suggestions (novel type pairing, novel
color scheme) would have introduced anything outside the existing token/type system, Principles I and
V win and the existing system is kept unchanged.

**Anchor components / files affected**:
- `app/case-studies/page.tsx`, `app/case-studies/[slug]/page.tsx` (new routes)
- `app/case-studies/_components/case-studies-hero.tsx`, `featured-case-study.tsx`,
  `case-studies-grid.tsx`, `case-study-detail-hero.tsx`, `metrics-strip.tsx`,
  `case-study-narrative.tsx`, `architecture-diagram.tsx`, `team-panel.tsx`,
  `related-case-studies.tsx`, `case-studies-final-cta.tsx` (all new, page-local)
- `app/case-studies/_data/types.ts`, `case-studies-content.ts` (new typed content module)
- `app/globals.css` (only if a new tinted-badge variant is needed per research.md §7 — additive only)
- No changes to `Header.tsx`, `Footer.tsx`, `nav-config.ts`, or `footer-config.ts` (already wired)

## Project Structure

### Documentation (this feature)

```text
specs/TMS-68/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md         # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.plan Stage 2, chained automatically)
```

No `contracts/` directory — per research.md §3, this feature has no separate publishable API
contract requirement beyond the typed content module documented in `data-model.md` (same precedent
as TMS-66).

### Source Code (repository root)

```text
app/
├── case-studies/
│   ├── page.tsx                              # List page (hero + featured + grid + CTA)
│   ├── [slug]/
│   │   └── page.tsx                          # Detail page (generateStaticParams, notFound())
│   ├── _components/
│   │   ├── case-studies-hero.tsx             # List page intro hero
│   │   ├── featured-case-study.tsx           # Spotlighted card
│   │   ├── case-studies-grid.tsx             # Teaser grid + card
│   │   ├── case-study-detail-hero.tsx        # Detail 2-col hero (title/summary/date/badge)
│   │   ├── metrics-strip.tsx                 # 3-4 metric scannable strip
│   │   ├── case-study-narrative.tsx          # 4 anchored narrative sections
│   │   ├── architecture-diagram.tsx          # 3-node flow + integration chips
│   │   ├── team-panel.tsx                    # Pinned-then-in-flow aside + CTA
│   │   ├── related-case-studies.tsx          # 3-card "more case studies"
│   │   └── case-studies-final-cta.tsx        # Closing get-in-touch CTA (shared by both routes)
│   └── _data/
│       ├── types.ts                          # CaseStudy, CaseStudyAccent, Metric, etc.
│       └── case-studies-content.ts           # 6 case-study records + shared narrative
├── globals.css                                # Unchanged unless research.md §7 requires additive badge classes
└── tokens.css                                  # Unchanged — all needed accents already present

components/layout/
├── nav-config.ts                              # Unchanged — "Case Studies" entry already present
└── footer-config.ts                           # Unchanged — "Case Studies" link already present
```

**Structure Decision**: Matches the established `app/<route>/page.tsx` + `_components/` + `_data/`
shape used by `app/services/` (TMS-66) and `app/about/` (TMS-65) — no route groups exist in this
tree, and introducing one for two pages would be unrequested structure. The detail page uses a
dynamic `[slug]` segment (this feature's first dynamic route) since FR-004/FR-016 require each case
study to have its own addressable detail page with a "not found" outcome for unknown slugs.

## Complexity Tracking

*No violations — table intentionally empty.*

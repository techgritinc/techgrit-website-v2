# Implementation Plan: Construction Industry Page

**Branch**: `TMS-67` | **Date**: 2026-07-14 | **Last Updated**: 2026-07-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-67/spec.md`

## 2026-07-23 Re-plan: UI Fidelity Correction Pass

The 8 sections below were already built (`app/construction/`, commit `08fcced`) against the original 2026-07-14 spec. The spec was then refined with **FR-016–FR-024** (per-section pixel-fidelity requirements against `TechGrit Construction.dc.html`) and 5 clarifications. Auditing the live implementation against those new requirements found concrete, confirmed drift — not new scope, but corrections to close:

1. **Icon mismatches** — 9 of 11 icons in `construction-challenges.tsx`/`construction-solutions.tsx` don't match the reference (wrong shape or a shape borrowed from the wrong section). See research.md §12 for the full per-icon fix list. **Done (T022, T023).**
2. **Lifecycle diagram geometry** — `construction-lifecycle-diagram.tsx` uses a computed symmetric radial layout with a single small circle; the reference uses fixed asymmetric corner-clustered node positions, curved connector paths, and a two-ring pulsing core. Per Clarifications 2026-07-23, this needs a real rebuild, not a token/color pass. See research.md §11. **Done (T027).**
3. **Global ambient background** — a shared `reusable-components/ambient-orbs.tsx` (added by a later `dev` merge, TMS-68) now renders globally via `app/layout.tsx`, but its second orb is blue where the Construction reference's is amber. Per Clarifications 2026-07-23, Construction opts out of the shared component (same pattern `/case-studies` already uses) and renders its own page-local, reference-exact orb set. See research.md §13. **Done (T024–T026).**
4. **One new token**: `--color-overlay-amber-soft: rgba(245, 158, 11, 0.08)` — the Construction reference's third orb opacity has no existing token equivalent (research.md §13). **Done.**
5. **Hero rebuild** — the shipped hero was a single-column, centered layout; the reference is a two-column layout with the image+stats on the right. Also wires in the real photo asset and swaps the two CTAs to the shared `components/ui/Button.tsx`. See research.md §15, §16. **Done (T030, T032).**
6. **Integrations-strip rebuild** — the shipped version rendered partners as bordered pill badges; the reference is plain bold text in a single top+bottom-bordered row. See research.md §15. **Done (T031).**
7. **Advantage rebuild** (found during this 2026-07-23 systematic audit) — the shipped version is a centered heading above a symmetric card grid; the reference is an asymmetric two-column layout (text left, bordered list right) with an amber (not orange) index. See research.md §17. **Done (T033).**
8. **Impact grid fix** (found during this 2026-07-23 systematic audit) — the shipped grid has an extra `lg:` column step the reference doesn't have. See research.md §18. **Done (T034).**
9. **Final CTA glow color and eyebrow — fixed 2026-07-24** — the shared `reusable-components/final-cta.tsx` gained an optional `tone?: "orange" | "amber"` prop (default `"orange"`); Construction now passes `tone="amber"` (glow + eyebrow both amber), About Us is unchanged (still orange, implicit default). See research.md §19.
10. **Challenges — additional gaps beyond icons** (user-flagged; T022 covered icons only) — header block wrongly centered at 680px (reference is left-aligned, 760px); an extra `md:grid-cols-3` breakpoint step the reference doesn't have (5 columns should start at `md:`/960px, not `lg:`/1140px); icon tile 44px vs reference 40px; card padding/gap/radius all slightly off (16px radius needed vs the shared `.card` class's default 22px). See research.md §20. **Done (T035).**
11. **GlassCard adoption for Challenges/Solutions/Impact** (2026-07-24, user decision) — these 3 sections' card grids switch from the shared `.card` utility class to `components/ui/GlassCard.tsx`, which gains 3 new variants (`constructionChallenge`/`constructionSolution`/`constructionImpact`) matching each section's exact reference radius/icon-tile size. Explicitly excludes Advantage (a bordered list in the reference, not cards — T033 already fixes this), Integrations strip, the lifecycle diagram's node pills, and the Hero/Final CTA single panels. See research.md §21. **Done (T036, T023, T034, T035).**
12. **T023/T034/T035 implementation — further drift found** (2026-07-24) — a fresh comparison against the reference during implementation found Solutions/Impact headers had the same wrong-centering mistake as Challenges; Challenges cards were wrongly centered too; several icon-tile/title/description font-sizes, colors, and the Solutions icon-tile's flat-vs-gradient background were off; Solutions/Impact hover-lift was `-5px` not the reference's `-6px`; Challenges has no hover effect at all in the reference (unlike Solutions/Impact) so its GlassCard usage suppresses the shared hover-border-color default. All fixed in the same pass. See research.md §22. **Done.**

This section of the plan does not change the Summary/Technical Context/Project Structure below except where explicitly annotated (MODIFIED/PENDING/DONE markers) — the original 8-section build description otherwise still applies. See tasks.md's Phase 8 for the task breakdown.

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

**Post-refinement re-check (2026-07-23, against constitution v1.6.0)**:

| Principle | Check | Status |
|---|---|---|
| I. Token-Only Styling | The one new value with no existing equivalent (`rgba(245,158,11,0.08)`, Construction's third ambient orb) is added as a new token (`--color-overlay-amber-soft`) in `tokens.css`'s existing "Ambient orb / bg glow" numbered section, not hardcoded. All other FR-016–024 values reuse existing tokens (`--color-orange`, `--color-amber`, `--color-overlay-orange`, `--color-overlay-amber`, `--color-ink`, radius/shadow scale). | PASS |
| III. Centralized Utility-Class Component Library / Stable identity (v1.6.0 addition) | All list-rendered content (challenges, solutions, lifecycle nodes) already keys on `order`, a stable numeric field, not display text — confirmed compliant with the v1.6.0 "stable identity for repeated content" rule without any code change. | PASS |
| III. Shared component extension | The page-local ambient-orb opt-out extends `reusable-components/ambient-orbs.tsx`'s existing path-exclusion pattern (already used for `/case-studies`) by one additional path, rather than forking a new mechanism. | PASS |

No violations — Complexity Tracking table is not needed.

## Project Structure

### Documentation (this feature)

```text
specs/TMS-67/
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
├── globals.css                                         # MODIFIED (2026-07-23/24) — breakpoints were already correct (untouched); adds @theme inline mappings for the new tokens below; corrects `tgdash`'s stroke-dashoffset from -26 to -220 and adds the new `tgpulsecore` keyframe (research.md §11, DONE T027)
├── tokens.css                                          # MODIFIED (2026-07-23/24) — adds --color-overlay-amber-soft (research.md §13), --color-border-amber-soft (research.md §16), --color-overlay-amber-12 and --color-ink-glass-60 (research.md §11, DONE T027); otherwise untouched (see research.md §4)
├── page.tsx                                             # existing style-kit page — untouched
├── about/
│   ├── page.tsx                                         # modified — imports `FinalCta` from reusable-components/ instead of the local component
│   └── _components/
│       └── about-us-final-cta.tsx                       # removed — superseded by reusable-components/final-cta.tsx
└── construction/
    ├── page.tsx                                         # MODIFIED (2026-07-23) — adds the 3 page-local ambient orb `<div>`s (research.md §13), same inline pattern as app/case-studies/page.tsx; composition-root logic otherwise unchanged
    ├── _data/
    │   ├── construction-content.ts                      # MODIFIED (2026-07-23) — hero.image now points to the real public/samples/ind-construction.png (720×360) asset instead of null; no other data-shape changes
    │   └── types.ts                                      # existing — no data-shape changes in this pass
    └── _components/
        ├── construction-hero.tsx                         # MODIFIED (2026-07-23, during implementation) — rebuilt as a true two-column layout; the "no changes identified" assessment below was wrong (research.md §15); also imports and renders its two CTAs via components/ui/Button.tsx (variant="primary"/"ghost") instead of raw <a className="btn ..."> markup; FR-001, FR-002, FR-013, FR-017
        ├── construction-integrations-strip.tsx            # MODIFIED (2026-07-23, during implementation) — rebuilt as a single bordered row with plain-text wordmarks; the "no changes identified" assessment below was wrong (research.md §15); FR-003, FR-012, FR-018
        ├── construction-challenges.tsx                    # MODIFIED (2026-07-23/24, DONE — T022, T035) — icons corrected, amber (not orange) stroke; header block left-aligned at 760px (was centered, 680px); grid is `sm:2col → md:5col` (dropped the extra `md:grid-cols-3` step); icon tile 40px/10px radius (was 44px/14px); padding `22px 20px`/gap 18px; cards left-aligned, no hover-lift (reference has none for this section); adopts the new `constructionChallenge` GlassCard variant instead of `.card` (research.md §20, §21, §22); FR-004, FR-019
        ├── construction-solutions.tsx                     # MODIFIED (2026-07-23/24, DONE — T023) — corrects 5 of 6 icon paths (research.md §12); header left-aligned at 760px (was centered, 680px); icon tile now a gradient (amber→orange) with border and 13px radius (was flat color/14px); title 19px, description 14.5px/`--color-text-muted`; grid gap 22px; lift(-6px) + amber-border hover; adopts the new `constructionSolution` GlassCard variant instead of `.card` (research.md §21, §22); FR-005, FR-020
        ├── construction-lifecycle-diagram.tsx              # MODIFIED (2026-07-23/24, DONE — T027) — full geometry rebuild: literal node positions, curved amber→orange gradient connectors (7s dash animation), two-ring pulsing core, and a rounded/bordered glass panel wrapper with a decorative amber glow blob (previously missing entirely) — header resized to the correct, smaller `clamp(26px,3.2vw,36px)`; mobile/tablet fallback pills use their own distinct (more transparent) background (research.md §11); FR-006, FR-012, FR-021
        ├── construction-advantage.tsx                      # MODIFIED (2026-07-23/24, DONE — T033) — the "no changes identified" assessment was wrong (found during this systematic audit, research.md §17): rebuilt as an asymmetric `md:grid-cols-[0.8fr_1.2fr]` layout (left: eyebrow/title/16.5px description; right: `border-t`+per-row `border-b` hairline-divided list of the 4 points, each with a 34px-wide 18px amber (`--color-amber-light`) two-digit index, 19px title, 15px/`--color-text-60` description) replacing the centered-heading + symmetric card-grid layout — explicitly NOT a GlassCard candidate (research.md §21 scope exclusion), since the reference is a bordered list here, not cards; FR-007, FR-022
        └── construction-impact.tsx                         # MODIFIED (2026-07-23/24, DONE — T034) — the "no changes identified" assessment was wrong (research.md §18): dropped the `lg:` grid-cols step; header left-aligned at 760px (was centered, 680px); metric 40px (was 34px), label 12.5px/`--color-text-45` (was 14px/faint), title 18.5px, description 14.5px/`--color-text-muted`, link color amber (was orange); grid gap 22px; lift(-6px) + amber-border hover; adopts the new `constructionImpact` GlassCard variant instead of `.card` (each card wrapped in an `<a>` since `GlassCard` has no href support, research.md §21, §22); FR-008, FR-023
        # (no construction-final-cta.tsx — FR-009/FR-024 is rendered via reusable-components/final-cta.tsx, tone="amber")

reusable-components/
├── reveal-on-scroll.tsx                                 # existing — reused as-is
├── section-eyebrow.tsx                                  # existing — extended with `tone?: "orange" | "amber"` prop (research.md §5)
├── ambient-orbs.tsx                                     # MODIFIED (2026-07-23, by this feature, DONE — T025) — extends its existing `/case-studies` path-exclusion to also exclude `/construction` (research.md §13); this file is shared site-wide, so the change is a one-line addition to an existing pattern, not a new mechanism
└── final-cta.tsx                                        # new — promoted from app/about/_components/about-us-final-cta.tsx; renamed export `FinalCta`; extended with an optional `secondaryCta?: { label: string; link: string }` prop so Construction's primary+secondary (schedule + email) closing CTA can reuse it — About Us's existing single-CTA usage is unaffected since the prop is optional. **MODIFIED (2026-07-24, DONE)**: also gained an optional `tone?: "orange" | "amber"` prop (default `"orange"`) — Construction passes `tone="amber"` (glow + eyebrow), About Us is unaffected (research.md §19)

components/ui/
├── Button.tsx                                           # existing — reused as-is, no code change (DONE — T032); construction-hero.tsx now imports it for its two CTAs instead of raw `<a className="btn ...">` markup (research.md §16)
└── GlassCard.tsx                                        # MODIFIED (2026-07-24, DONE — T036) — added 3 new variants (`constructionChallenge`, `constructionSolution`, `constructionImpact`) to its existing `GlassCardVariant` union (and matching entries in all 4 style maps: `CARD_VARIANTS`, `ICON_VARIANTS`, `TITLE_VARIANTS`, `DESC_VARIANTS` — required by the `Record<GlassCardVariant, string>` typing), each with the exact reference radius/icon-tile size for that Construction section (research.md §21); this file is shared with Homepage/Blog, so the change is additive (new variant keys) rather than altering any existing variant's behavior. Not yet consumed — T023/T034/T035 (pending) will switch Solutions/Impact/Challenges from `.card` to these variants.
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

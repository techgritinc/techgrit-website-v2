# Implementation Plan: Engagement Models Page (How We Work)

**Branch**: `feature/TMS-88-how-we-work-enagagement-models-page` | **Date**: 2026-08-24 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/TMS-88-engagement-models/spec.md`

## Summary

Build a new page at `/how-we-work/engagement-models` covering hero, a 3-card "Three engagement models" grid, a single-column "Why TechGrit engagements" checklist (7 icon+text rows), a new 2-column "Not Sure Which Model Fits Your Needs?" comparison card, and a closing CTA reused verbatim from `ai-modernization`/`orbit-ai-ecosystem`. During Phase 0 research, a live, fully-populated CMS entry was confirmed at `GET /api/pages/by-slug/engagement-models` — both sibling pages this spec's FR-001/FR-005/FR-007 cite as architectural precedent (`ai-modernization`, `orbit-ai-ecosystem`) are themselves CMS-backed at runtime, not static content modules, and the live entry's content matches this spec's content closely enough (same section types, same 3 models, same 7 "why" items, same goal→model pairs) that this page is built CMS-backed against that entry rather than as a static content module — see research.md §2. This is a "HOW" decision made during planning; it does not change any FR in spec.md.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (`@tailwindcss/postcss`, CSS-first `@theme`)
**Storage**: CMS-backed — Strapi endpoint `GET /api/pages/by-slug/engagement-models` via a new `cms/api/how-we-work/engagement-models.ts` module (`fetchCms` + React `cache()`), mirroring `cms/api/how-we-work/orbit-ai-ecosystem.ts` exactly. No static content module. See research.md §2 for why this differs from Orbit AI's own spec.md, which documented a static-content decision that was later superseded in the actual codebase.
**Testing**: No test framework configured in this repo; verification is `npm run lint` + `npm run build` (Husky pre-commit gate) plus manual/browser-preview visual comparison against the confirmed live CMS response and the raw `.dc.html` reference for layout/spacing intent.
**Target Platform**: Web (evergreen desktop + mobile browsers), server-rendered via Next.js App Router
**Project Type**: Single Next.js application rooted at `app/` (no monorepo, no `apps/`/`packages/`)
**Performance Goals**: N/A beyond standard Next.js SSR page defaults — no client data fetching, no feature-specific performance target
**Constraints**: No flicker/layout shift on load (FR-010); hero image container must not grow (FR-003); existing breakpoint contract only, `lg`=1140/`md`=960/`sm`=560 (FR-009)
**Scale/Scope**: One new page, 5 sections (hero, three-models, why-checklist, find-your-fit, closing CTA), 1 new route under the existing `how-we-work` segment, 1 new CMS fetch module + types, 1 new route-local component for the "Find Your Fit" comparison (no existing parser/renderer for this CMS shape), reuse of existing `Hero`/`GlassCard`/`FinalCta`/`MediaSlot` unmodified, 1 footer-config edit

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. Token-Only Styling | All colors/spacing/radii for new markup sourced from `tokens.css`/`globals.css`'s existing `@theme inline` scale — the same orange/amber accents, glass backgrounds, and text-opacity ladder already used by `orbit-ai-ecosystem`/`ai-modernization` cover every value this page needs. No new token anticipated. | PASS (verify no new token needed at Phase 1) |
| II. Documented Breakpoint Contract | Uses existing `lg:`/`md:`/`sm:` (1140/960/560) breakpoints: models grid 3→2→1, why-checklist single-column at all widths (per spec FR-006/FR-009 — an explicit, requester-confirmed deviation from the CMS-sibling chip-grid's usual 1→2→3 responsive behavior, not an oversight), find-your-fit 2-col→1-col at `sm`. No arbitrary breakpoint values introduced. | PASS |
| III. Centralized, Non-Duplicated Component Library | Reuses `Hero`, `GlassCard` (`serviceCapability` variant), `FinalCta`, `MediaSlot`, `RevealOnScroll` — all pre-existing, unmodified. The why-checklist and find-your-fit comparison are new route-local components (`app/how-we-work/engagement-models/_components/`) because spec FR-006's single-column requirement and FR-007a's 2-column goal/model shape do not match any existing component's rendered output, even though the why-checklist's *data shape* is identical to the existing `ChallengesSection`/`ChallengeChip` types (see research.md §3) and the find-your-fit section's CMS shape has no existing parser anywhere in the codebase. Neither section's eyebrow uses a hardcoded fallback — both render their CMS field as-is, omitted when null (Clarification Q8). No new shared `components/ui/` primitive is introduced — both new pieces are single-page-consumed markup, correctly kept route-local per Principle III's own rule ("nothing moves to `components/` until genuinely consumed by more than one route"). | PASS |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | Raw `.dc.html`'s `x-dc`/`DCLogic`/`{{ }}` scaffolding is not copied. Where the live CMS content differs from the raw reference's copy (e.g. hero headline wording, card `categoryLabel` punctuation, "Why Organizations Choose TechGrit" title vs. the reference's "Why TechGrit engagements"), the CMS content is authoritative per research.md §2 — spec.md's FR text already reflects the CMS-confirmed copy for every section it names. | PASS |
| V. Dark-First Brand System | Page inherits the site's `#000` surface, white-on-dark text ladder, orange→amber accent (never as a fill), Calibri/Carlito type. No new brand elements. | PASS |
| VI. UI Craft via `frontend-design` Skill | UI mode ON (tech signal: Next.js/React; content signal: hero/section/card/CTA throughout spec.md). Skill invoked during this planning phase — see "UI Design Approach" below. | PASS |

No violations requiring Complexity Tracking justification.

## UI Design Approach

**UI mode detection**: UI mode ON — tech signal (Next.js 16 + React 19, this repo's permanent default) AND content signal (spec.md references hero, section, card, and CTA throughout).

**`frontend-design` skill invocation**: Asked the skill for guidance on (1) how to make the "Why TechGrit engagements" single-column checklist read as an intentional, scannable list rather than a plain bulleted `<ul>` when it sits between two card-grid sections, and (2) how to give the new "Find Your Fit" 2-column comparison card enough visual weight to work as a mid-page decision aid without competing with the model cards above it or the CTA below it.

**Reconciliation with Principles I–V**: As with `TMS-86`/`TMS-88` (Orbit AI), the skill's suggestions yield to Principle V's fixed dark/orange-amber system and `tg*` motion vocabulary for every section already covered by CMS content or the reference. Its craft contribution is scoped to the two pieces with no existing component to defer to:
- **Why-checklist rows**: each row is a full-width glass chip (`bg-glass-3`, `border-border-8`, matching the existing chip surface treatment already used by Orbit AI's chip grid) rather than a bare list item — this keeps a family resemblance to the site's existing "chip" vocabulary while reading as a single vertical list, satisfying FR-006's single-column requirement without inventing a new visual language.
- **Find Your Fit card**: a single `glass-card`-style container with an internal vertical divider between the "Your Goal" and "Recommended Model" columns (border, not a second nested card), and a left accent border on the "Your Goal" column's icons only — echoing the About page's "Who You Are" card's `border-l-[3px] border-l-orange` accent treatment the requester referenced, without literally copying its top/bottom stacked-groups structure (Q4 explicitly chose side-by-side instead).
- **Motion**: wrap both new sections in the existing `RevealOnScroll` component, exactly as every sibling section on `orbit-ai-ecosystem`/`ai-modernization` already does — no new animation vocabulary.

**Anchor components / files affected**:
- New: `app/how-we-work/engagement-models/page.tsx`, `cms/api/how-we-work/engagement-models.ts`, `cms/types/engagement-models-types.ts`, `app/how-we-work/engagement-models/_components/engagement-models-why.tsx` (single-column checklist), `app/how-we-work/engagement-models/_components/engagement-models-find-fit.tsx` (2-column comparison card)
- Reused unmodified: `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/ui/Hero.tsx`, `components/ui/GlassCard.tsx` (`serviceCapability` variant), `components/ui/final-cta.tsx`, `components/ui/MediaSlot.tsx`, `components/ui/reveal-on-scroll.tsx`, `components/ui/ambient-orbs.tsx` (its existing `/how-we-work/` branch already covers this route — no new branch needed, unlike Orbit AI's own plan)
- Edited (minimal, mirrors prior precedent): `cms/api/footer.ts` (repoint the "How We Work → Engagement Models" link's `href` to `/how-we-work/engagement-models`)

## Project Structure

### Documentation (this feature)

```text
specs/TMS-88-engagement-models/
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
    └── engagement-models/
        ├── page.tsx                                # route entry — /how-we-work/engagement-models
        │                                            # async Server Component: await getEngagementModelsData(),
        │                                            # notFound() on null, then section.type switch (mirrors
        │                                            # orbit-ai-ecosystem/page.tsx exactly)
        └── _components/
            ├── engagement-models-why.tsx            # "Why TechGrit engagements" — single-column icon+text checklist
            └── engagement-models-find-fit.tsx        # "Not Sure Which Model Fits Your Needs?" — 2-col comparison card
            # hero, three-models, and closing CTA render components/ui/Hero + GlassCard + final-cta.tsx
            # directly from page.tsx, as orbit-ai-ecosystem/page.tsx already does for its equivalent sections

cms/api/how-we-work/
└── engagement-models.ts   # getEngagementModelsData() — fetchCms + section-type mapping, mirrors
                            # cms/api/how-we-work/orbit-ai-ecosystem.ts's structure exactly

cms/types/
└── engagement-models-types.ts   # Strapi* raw types + rendering-oriented types (Hero/Capabilities reuse the
                                  # same shapes as orbit-ai-ecosystem-types.ts; FindFit is new — no existing
                                  # parser for the `about-us.audience-insight` component anywhere in the repo)

cms/api/footer.ts            # 1-line href edit (mirrors FR-011 in prior tickets)
```

**Structure Decision**: Follows the established `app/<route>/_components/` + async `page.tsx` + `cms/api/<segment>/<page>.ts` + `cms/types/<page>-types.ts` composition pattern used by `app/how-we-work/orbit-ai-ecosystem/` and `app/what-we-do/ai-modernization/` — a CMS-fetched `sections` array mapped to components in `page.tsx`'s `switch (section.type)`. This is the actual current architecture of both cited sibling pages (see research.md §2), not the static-content-module pattern `app/construction/` uses. No new shared `components/ui/` component is introduced; the two new pieces are route-local per Principle III since neither's rendered shape is reused by any other page today.

## Complexity Tracking

No Constitution Check violations — this section is intentionally empty.

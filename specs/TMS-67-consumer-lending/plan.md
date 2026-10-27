# Implementation Plan: Consumer Lending Industries Page

**Branch**: `TMS-67-consumer-lending` | **Date**: 2026-08-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-67-consumer-lending/spec.md`

## Summary

Build a new CMS-backed industries page at `/industries/consumer-lending`, following the exact
integration recipe already used by the sibling "PD-family" pages (`app/what-we-do/data-ai-engineering`,
`app/what-we-do/ai-modernization`, `app/how-we-work/orbit-ai-ecosystem`): a `cms/api/industries/
consumer-lending.ts` fetcher hitting `/api/pages/by-slug/consumer-lending`, a `cms/types/consumer-
lending-types.ts` Strapi shape file, and an `app/industries/consumer-lending/` route with one React
component per section type in `_components/`. 11 of the page's 13 sections map onto `__component`
shapes this codebase already has working mappers for (hero, statistics, modernization-challenges,
pd-modernization-capabilities ×3, service-detail ×4 disambiguated by `variant`, pd-faq, cta-banner).
Two things are genuinely new: (1) the `industries-construction.pd-lending-lifecycle` component
(Domain depth's tabs) has no prior mapper or renderer anywhere in the codebase, and (2) the Final
CTA's secondary button must always render (mirroring Construction's page-level pattern) rather than
being dropped when the CMS field is empty, per this feature's Clarifications.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (CSS-first `@theme`)
**Storage**: N/A — content is fetched live from the existing Strapi CMS (`/api/pages/by-slug/consumer-lending`); no local persistence
**Testing**: No test framework configured in this repo (confirmed gap, not a target to invent)
**Target Platform**: Server-rendered web (Next.js App Router, dynamic rendering — `cache: "no-store"` fetcher)
**Project Type**: Single Next.js application rooted at `app/` (no monorepo)
**Performance Goals**: Standard marketing-page expectations — no page-specific budget beyond the site's existing dynamic-render-per-request model
**Constraints**: No new design tokens, breakpoints, colors, or component conventions (per spec FR-020); must reuse `components/ui/` primitives (`GlassCard`, `IconTile`, `Faq`, `FinalCta`) wherever the CMS section shape already matches an established convention
**Scale/Scope**: 1 new route, 13 sections, ~10-11 new section-renderer components, 1 new CMS fetcher/types pair, 1 new tabbed "Domain depth" primitive, 1 nav-config edit (Industries menu link)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Principle I (Token-Only Styling)**: PASS — no new tokens required; all card/eyebrow/heading/chip
  styling reuses existing `GlassCard`/`IconTile`/token-driven classes already used by sibling PD-family
  pages. The one new component (Domain depth tabs) will consume only existing tokens (border/text/
  orange-accent) — verified during Phase 1 design, no `tokens.css` edit anticipated.
- **Principle II (Breakpoint Contract)**: PASS — reuses `lg:`/`md:`/`sm:` at the existing 1140/960/560
  thresholds; the two-column capsule-point list and the tab row both collapse to single-column /
  horizontal-scroll at the existing breakpoints, no new pixel values.
- **Principle III (Centralized Component Library)**: PASS with one justified addition — every section
  except Domain depth reuses an existing `components/ui/` primitive (`GlassCard` serviceCapability,
  `IconTile`, `Faq`, `FinalCta`) or an existing metrics-strip pattern. Domain depth's underlined
  full-width tab row has no existing match: `components/ui/FilterBar.tsx` is a sticky rounded-pill
  filter-chip bar (different visual contract — chips, not underlined tabs, not scoped to one section's
  in-page content), and no other tabbed component exists in the codebase. A new, purpose-built
  component is therefore justified per Principle III's own escape hatch ("only justified when no
  existing primitive actually fits").
- **Principle IV (Reference Files Are Visual Truth)**: N/A for this feature — per the spec, the
  `.dc.html` reference file was explicitly ruled out ("just content as reference visually ui is not
  required"); the CMS response is the actual content source, and the existing sibling pages'
  rendered UI is the visual/structural reference instead.
- **Principle V (Dark-First Brand System)**: PASS — no new surface colors, no new type family; all
  copy renders through the existing dark-ink / orange-amber-accent system already used by every
  sibling page this plan reuses.
- **Principle VI (UI Craft via frontend-design Skill)**: Satisfied — see "UI Design Approach" below.

No violations requiring Complexity Tracking.

## UI Design Approach

**UI mode detection**: UI mode ON — tech signal (Next.js/React primary dependencies) AND content
signal (spec.md is entirely page/section/card/tab language).

**`frontend-design` skill invocation**: Asked for composition/motion/craft guidance scoped to the one
net-new piece — the Domain depth tabbed section — since every other section is a direct reuse of
already-shipped patterns with no fresh craft decision to make. Guidance applied: the tab row uses a
persistent full-width bottom border with a single animated underline segment that slides beneath the
active tab (`transform`/`width` transition, not a repaint) rather than a static border-per-tab, so
switching stages reads as one continuous motion rather than a hard cut; the two-column capsule-point
list on the right reveals with a subtle staggered fade/slide (matching the existing `tgreveal`-style
scroll-in convention already used by every other section on sibling pages) when a new stage is
selected, so the content swap doesn't feel like a jump-cut; the six numbered problem items in "Why
lenders call us" use the existing `IconTile`-adjacent two-column layout with the number itself
standing in for the icon slot (matching the CMS data, which has no icon field for this component),
keeping continuity with how every other icon-optional tile elsewhere in the app degrades gracefully.

**Reconciliation with Principles I–V**: The skill's generic suggestion of a fresh accent color for
the active-tab underline was overridden — Principle V's single orange→amber gradient accent
(`--gradient-brand`) is reused for the underline instead, consistent with every other active/selected
state in the app (nav underline, active filter chip, etc.). No new font, color, or spacing scale was
introduced; every measurement (gap, padding, radius) pulls from the existing token-backed Tailwind
scale already in use by sibling `GlassCard`/`IconTile` layouts.

**Anchor components / files affected**:
- New: `cms/api/industries/consumer-lending.ts`, `cms/types/consumer-lending-types.ts`
- New: `app/industries/consumer-lending/page.tsx`
- New: `app/industries/consumer-lending/_components/` — one renderer per section (hero, metrics
  strip, why-lenders-call-us, domain-depth, ecosystem, applied-ai, institutional-platforms, our-work,
  quote, how-we-work, operating-context, faq is reused directly, final-cta is reused directly)
- New: `app/industries/consumer-lending/_components/consumer-lending-domain-depth.tsx` (the one
  genuinely new primitive — full-width underlined tabs)
- Touched: `cms/api/footer.ts` and/or `cms/api/header.ts` if Consumer Lending needs a nav-link
  update (to be confirmed in Phase 1 against the current Industries menu config)
- Reused unmodified: `components/ui/GlassCard.tsx`, `components/ui/IconTile.tsx`,
  `components/ui/Faq.tsx`, `components/ui/final-cta.tsx`, `components/ui/reveal-on-scroll.tsx`

## Project Structure

### Documentation (this feature)

```text
specs/TMS-67-consumer-lending/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

No `contracts/` directory: this feature consumes an existing external CMS endpoint
(`/api/pages/by-slug/consumer-lending`) rather than defining a new API this repo exposes, so there
is no contract for this repo to author or version.

### Source Code (repository root)

This is the existing single Next.js App Router application rooted at `app/` — no monorepo, no new
top-level project. New/touched paths for this feature:

```text
cms/
├── api/
│   └── industries/
│       └── consumer-lending.ts        # NEW — fetcher + section mappers (mirrors fintech.ts/
│                                       #   data-ai-engineering.ts's structure)
└── types/
    └── consumer-lending-types.ts      # NEW — Strapi response shapes for this page's sections,
                                        #   including the new pd-lending-lifecycle component

app/industries/consumer-lending/
├── page.tsx                            # NEW — Server Component, mirrors app/industries/fintech/page.tsx
└── _components/                        # NEW — one renderer per section type
    ├── consumer-lending-metrics.tsx        # (or reuse case-studies' MetricsStrip directly)
    ├── consumer-lending-why.tsx             # "Why lenders call us" numbered blockers
    ├── consumer-lending-domain-depth.tsx    # NEW primitive — underlined tabs + 2-col capsule list
    ├── consumer-lending-ecosystem.tsx       # GlassCard serviceCapability grid (3-col)
    ├── consumer-lending-applied-ai.tsx      # GlassCard/IconTile-style 2-col status cards
    ├── consumer-lending-institutional.tsx   # 2+3 card rows + plain-text extra card
    ├── consumer-lending-our-work.tsx        # 3-col case-summary cards
    ├── consumer-lending-quote.tsx           # full-width quote card
    └── consumer-lending-how-we-work.tsx     # 3-col cards, no feature list

components/ui/                          # REUSED UNMODIFIED — GlassCard, IconTile, Faq, FinalCta,
                                         #   reveal-on-scroll
app/case-studies/_components/
└── metrics-strip.tsx                   # REUSED UNMODIFIED (or copied pattern) for the proof-metrics strip
```

**Structure Decision**: Mirrors the existing "PD-family" What-We-Do/How-We-Work pages
(`app/what-we-do/data-ai-engineering/`, `app/what-we-do/ai-modernization/`,
`app/how-we-work/orbit-ai-ecosystem/`) exactly — one `cms/api/<area>/<page>.ts` fetcher, one
`cms/types/<page>-types.ts` shape file, one route folder with a private `_components/` subfolder
per Constitution's route-local convention. This is a stronger structural match than Fintech's own
older `IndustryHero`/`IndustryCardGrid`/... component family, since Fintech's CMS component
vocabulary (`whatWeBuild`, `productLifecycle`, `engineeringServices` service-detail variants) does
not match Consumer Lending's actual CMS response — Fintech is the model for the Hero only, per the
spec's explicit "Hero same as Fintech" instruction; every other section follows the PD-family
sibling pages, whose `__component` vocabulary is a near-exact match confirmed against the live
endpoint.

**Nav wiring assumption**: Consumer Lending will NOT get a footer/header nav-config edit in this
phase. Confirmed by inspection: `/industries/fintech` and `/industries/healthcare` — the two most
recently shipped Industries pages — are themselves not linked from footer, header, or the homepage
today (only `/industries/construction`, the oldest of the three, has a real footer link; Fintech and
Healthcare's footer entries still point at the `/#industries` placeholder anchor). Consumer Lending
follows that same, more recent precedent rather than the older Construction one, so no
`cms/api/footer.ts`/`header.ts` edit is planned. This is a low-risk, reversible assumption — flagged
here rather than blocking on a question, consistent with the 1-hour completion target.

## Complexity Tracking

No Constitution Check violations — this section is not applicable.

# Implementation Plan: Startups Page (What We Do)

**Branch**: `feature/TMS-86-what-we-do-startups-page` | **Date**: 2026-08-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-86-startups/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build the Startups page at `/what-we-do/startups` — the seventh and final page in TechGrit's "What We Do" service-page family — as a pixel-accurate translation of `raw-files-v3/TechGrit Website V2.3/TechGrit Startups.dc.html`. The technical approach is pure reuse: every section this page needs (hero with image media, intro/chips content block, capability card, related-service `IconTile`, FAQ accordion, closing CTA band) already has a matching, unmodified `components/ui/` primitive established by the six sibling pages. This feature introduces zero new shared primitives, zero new icons (all 16 icon slots this page needs already exist in `components/ui/icons.tsx`), and exactly 4 new design tokens (`--color-overlay-orange-07`/`-04` for the growth-journey panel's highlighted-vs-default card backgrounds, and `--color-overlay-blue-light-14`/`--color-overlay-violet-light-18` for 2 of the who-we-help section's 4 icon-tint backgrounds — the only reference values in this page with no existing token match; see Constitution Check §I) — it is otherwise a new route (`app/what-we-do/startups/`) composed of page-local `_components/` wrappers that feed this page's own static copy into those existing primitives, plus two one-line navigation-config edits (FR-010). The one genuine new visual pattern — the "From first idea to institutional scale." growth-journey panel, which wraps three full `GlassCard`-style stage cards inside a single bordered gradient panel — is expressed as a page-local composition combining two already-established patterns (the bordered-panel wrapper and the `serviceCapability` card shape), not a new shared component. The capabilities section's heading is deliberately corrected from the reference's literal "Five capabilities." to "Six capabilities." (FR-003a), matching the exact count-correction precedent already applied on the Data & AI Engineering sibling.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.ts`)
**Storage**: N/A — static local TypeScript content module; no CMS/API integration this phase (per Clarifications). Note: all six sibling pages (`ai-modernization`, `software-product-engineering`, `data-ai-engineering`, `platform-engineering`, `managed-services`, `ai-strategy-roadmap`) have since been upgraded to a live Strapi CMS integration in their own separate, later tickets — this feature deliberately targets their *original*, pre-upgrade static shape instead (confirmed by direct inspection of all six siblings' current CMS-integrated `page.tsx`/`_components/*.tsx`, contrasted against their own `research.md`/`data-model.md`, which still document that original static shape).
**Testing**: N/A — no test framework is configured anywhere in this repo (Constitution, Development Workflow); verification is manual, per `quickstart.md`
**Target Platform**: Web — responsive desktop/laptop/tablet/mobile, evergreen browsers
**Project Type**: Single Next.js App Router web application (this repo's only structure — no monorepo, no `apps/`/`packages/`)
**Performance Goals**: No client-side data fetching, no network waterfall, and no visible layout shift on initial render — the page renders as a Server Component; the FAQ's native `<details>`/`<summary>` needs no client JS for independent expand/collapse
**Constraints**: Token-only styling (Constitution Principle I — 4 new tokens required and added: `--color-overlay-orange-07`/`-04` for the growth-journey card backgrounds, `--color-overlay-blue-light-14`/`--color-overlay-violet-light-18` for 2 of the who-we-help icon-tint backgrounds; every other value this reference needs, including the highlighted-card border/badge intensities and the other 2 who-we-help icon tints, already exists on the shipped sibling pages — research.md §3–4, Speckit analysis C1); the documented `lg=1140/md=960/sm=560` breakpoint contract (Principle II); zero new `components/ui/` primitives — 100% reuse of `Hero`, `ContentBlock`, `GlassCard` (`serviceCapability` variant), `Faq`, `IconTile`, `FinalCta`, and `MediaSlot` (Principle III, spec.md FR-002/FR-011)
**Scale/Scope**: One new static route, 9 content sections, 0 new shared components, 0 new icons, 4 new design tokens (growth-journey card backgrounds + 2 who-we-help icon-tint backgrounds — Speckit analysis C1), 2 one-line navigation-config edits (`cms/api/footer.ts`, `cms/api/header.ts` — FR-010)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Token-Only Styling | PASS | Nearly every visual value this reference needs (colors, radii, spacing, shadows, gradients) is already expressed through the exact same `components/ui/` primitives and Tailwind utility classes the sibling pages ship with. Two exceptions, found and corrected: (1) during a `/speckit.analyze` pass (finding C1), the growth-journey panel's highlighted-vs-default card background opacities (0.07/0.04 orange) had no existing token match — 6 of the section's other 8 values (borders/badges) did have exact matches, but these 2 did not; (2) discovered during implementation (same C1 pattern), 2 of the who-we-help section's 4 icon-tint backgrounds (0.14 blue-light, and 0.18 at `--color-violet`'s specific hue) also had no exact match. Per Principle I's own process, 4 new tokens total (`--color-overlay-orange-07`, `--color-overlay-orange-04`, `--color-overlay-blue-light-14`, `--color-overlay-violet-light-18`) were added to `tokens.css`'s existing overlay groups *before* being referenced anywhere, rather than hardcoded inline — no raw rgba literal lands in any component. A follow-up `/speckit.analyze` pass (finding C2) then confirmed all 4 new tokens also received their required `globals.css` `@theme inline` mapping — the exact completeness check Principle I's own TMS-62-derived bullet mandates for every color token, now satisfied for all four. |
| II. Documented Breakpoint Contract | PASS | `Hero`, `ContentBlock`, `GlassCard` already implement the `lg/md/sm` (1140/960/560) collapse behavior internally; the growth-journey panel's own 3-card grid uses `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` — verified (research.md §3) against the reference's own `[data-step-grid]` 920px/640px collapse points, which match the Capabilities section's own already-shipped `md:grid-cols-2 lg:grid-cols-3` precedent exactly, rather than assuming equivalence to the differently-shaped 4-item "Strategies" panel. This page adds no new breakpoint. |
| III. Centralized, Non-Duplicated Component Library | PASS | FR-002/FR-011 explicitly forbid a new shared primitive; every section maps onto an existing, unmodified `components/ui/` component (see Project Structure below), and every icon this page needs (six "why" tiles, four founder-segment cards, six related-service links) already exists in `components/ui/icons.tsx` (research.md §4). The growth-journey panel reuses the exact bordered-panel wrapper classes from the Platform Engineering/Managed Services/Data & AI Engineering siblings' own "Strategies" section, combined with the unmodified `GlassCard` `serviceCapability` variant — a page-local composition, not a new shared primitive. Page-local `_components/` wrappers only supply content, matching the established `app/what-we-do/{ai-modernization,software-product-engineering,data-ai-engineering,platform-engineering,managed-services,ai-strategy-roadmap}/_components/` pattern. |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | PASS | The reference's `DCLogic`/`{{ }}`/`sc-for` scaffolding is translated to plain React (static `.map()` over a typed content array, native `<details>` for FAQ, no client component needed) — not copied verbatim. The one deliberate content deviation (capabilities heading count correction, FR-003a) is explicitly recorded in Clarifications, not a silent alteration. |
| V. Dark-First Brand System | PASS | Inherits the shared `tokens.css`/`globals.css` system, extended only by the 4 new tokens covered under Principle I above (no other change to either file); preserves the exact `OrbitAI™`/`4D™` trademark glyphs from the reference copy where they appear (the hero card's caption line, which per FR-004 this page renders without — the trademark string itself is not displayed on this page, matching the treatment several siblings already established for their own hero cards). |
| VI. UI Craft via frontend-design Skill | PASS | Invoked during this planning phase — see "UI Design Approach" below. |

No violations. Complexity Tracking is not required for this feature.

## UI Design Approach

*Required for UI features per Constitution Principle VI.*

**UI mode detection**: UI mode ON — tech signal matched (Next.js/React, this repo's Primary Dependencies) AND content signal matched (spec.md is saturated with "page", "hero", "section", "card").

**`frontend-design` skill invocation**: Asked the skill what craft guidance applies when a page is the seventh and final entry in an already-established sibling family, reusing that family's exact component set and visual grammar rather than needing its own new bold aesthetic direction. The skill's own generic guidance (distinctive per-generation typography/color/motion choices, avoid convergence on repeated fonts/palettes, "never the same design twice") is written for the case where no design system yet exists.

**Reconciliation with Principles I–V**: That generic guidance doesn't apply the same way here — this repo already committed to one bold, considered aesthetic direction (Constitution Principle V: dark `#000000` surface, single orange→amber gradient accent, one Calibri/Carlito type family, ALL-CAPS wide-tracked labels, `tg*`-prefixed staggered-reveal motion) precisely so that every page in the "What We Do" family reads as one coherent product, not a portfolio of one-off experiments. For a seventh, closing service page joining an already-established six-page family, *visual consistency itself* is the deliberate design decision, not a shortcut — reinventing spacing/motion/typography for this page alone would be the actual craft failure here (a "cookie-cutter but inconsistent" result), not reuse. Per the Constitution's explicit boundary clause, Principles I–V win over the skill's generic per-page-distinctiveness guidance — exactly the same reconciliation every prior sibling page's own plan already recorded.

The craft decisions that *do* belong to this specific page, and were made deliberately rather than defaulted:
- **Hero image treatment**: `public/samples/ind-fintech.png` (per Clarifications) rendered through `Hero`'s `mediaFill` + `MediaSlot`'s `fill`/`object-cover` path — the same treatment already established for the siblings' own hero images — but with no `mediaCaption` set (per FR-004), matching several siblings' own caption-less treatment.
- **Motion consistency**: reuse `Hero`'s existing staggered `data-rise` delays and `RevealOnScroll` for every subsequent section, verbatim — introducing a different stagger rhythm for this page alone would read as an inconsistency, not a fresh take.
- **Content-driven differentiation**: the three growth stages (Pre-Seed & Seed, Series A, Series B+), six capability disciplines (Discover, Build, Launch, Scale, Sustain, plus the distinguished "+ Network" bonus), and six "why" reasons are this service's own copy and its own icon choices (single-person team icon, rocket icon for AI-native/startup identity, payment-card icon for flexible pricing, checkmark for track record, shield for runway protection, network-node icon for ecosystem access) — distinct from all six siblings' own framing, and the rocket motif (`SvcStartupsIcon`) recurring across both the "AI-native by default" why-tile and the "Solo & Co-Founders" who-we-help card ties the page's own iconography together deliberately.
- **Two reference-driven per-card treatments, faithfully preserved rather than flattened to a uniform pattern**: the growth-journey panel's first card ("Pre-Seed & Seed") carries a visibly stronger background/border/badge intensity than its two siblings (`GrowthStage.highlighted`, data-model.md), and each "who we help" card carries its own distinct icon tint — orange/amber/blue/violet — rather than the one uniform tint the Platform Engineering/Data & AI Engineering siblings' own "Industries" cards use (`FounderSegmentIconKey`, data-model.md). The "who we help" tint *foreground* colors reuse existing tokens only (`--color-orange`, `--color-amber-light`, `--color-blue-light`, `--color-violet`), but 2 of its 4 tint *backgrounds* (blue-light, and this specific violet hue) needed new tokens, same as the growth-journey card backgrounds — 4 new tokens total across this page (`--color-overlay-orange-07`/`-04`, `--color-overlay-blue-light-14`, `--color-overlay-violet-light-18`, Speckit analysis C1) — while every border/badge value (6 for growth-journey, 2 for who-we-help) reuses an existing token (research.md §3–4).
- **A genuine, novel section composition**: the growth-journey panel combines two already-established visual patterns (the bordered-gradient-panel wrapper, and the `serviceCapability` card shape) into a shape no sibling page needed — three full capability-style cards inside one wrapping panel — implemented as a page-local composition rather than a new shared primitive (research.md §3).
- **A deliberate content correction, not a silent alteration**: the capabilities section's heading is corrected from the reference's literal "Five capabilities." to "Six capabilities." (FR-003a) because the section renders six cards; this is recorded transparently in Clarifications rather than treated as an unremarkable copy change.

**Anchor components / files affected**:
- New: `app/what-we-do/startups/page.tsx`
- New: `app/what-we-do/startups/_components/{startups-growth-journey,startups-capabilities,startups-why,startups-who-we-help,startups-faq,startups-related}.tsx`
- New: `app/what-we-do/startups/_data/{types.ts,startups-content.ts}`
- Edited (1 line each, FR-010): `cms/api/footer.ts`, `cms/api/header.ts`
- Edited (4 new lines each, Speckit analysis C1/C2): `app/tokens.css` (`--color-overlay-orange-07`/`-04`, `--color-overlay-blue-light-14`, `--color-overlay-violet-light-18`, added to their respective existing overlay groups) and `app/globals.css` (the matching `@theme inline` mapping for those same 4 tokens)
- Reused, unmodified: `components/ui/{Hero,ContentBlock,GlassCard,Faq,IconTile,final-cta,MediaSlot,Button,reveal-on-scroll,icons}.tsx`
- No file under `components/layout/` or any other route is touched.

## Project Structure

### Documentation (this feature)

```text
specs/TMS-86-startups/
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
app/what-we-do/startups/
├── page.tsx                              # Server Component; switch over content.sections
├── _components/
│   ├── startups-growth-journey.tsx       # Bordered panel wrapper + GlassCard (serviceCapability) x3
│   ├── startups-capabilities.tsx         # GlassCard (serviceCapability) x6
│   ├── startups-why.tsx                  # page-local WhyTile x6 (matches siblings' own pattern)
│   ├── startups-who-we-help.tsx          # GlassCard (serviceCapability) x4, all non-linked
│   ├── startups-faq.tsx                  # Faq x5 (first item defaultOpen)
│   └── startups-related.tsx              # IconTile (compact) x6, linked
└── _data/
    ├── types.ts                          # Page-local section/entity interfaces
    └── startups-content.ts               # Static typed content array (no CMS this phase)

cms/api/footer.ts   # FR-010a: DEFAULT_FOOTER_DATA href edit + toLinkGroup() live-CMS ternary case (both needed — Speckit finding during implementation)
cms/api/header.ts   # FR-010b: 1-line special-case addition in toMegaGroup
```

**Structure Decision**: Single Next.js App Router project (this repo's only structure — no monorepo). Route-local composition under `app/what-we-do/startups/`, mirroring `app/what-we-do/{ai-modernization,software-product-engineering,data-ai-engineering,platform-engineering,managed-services,ai-strategy-roadmap}/`'s original file/folder architecture exactly (per the user's explicit instruction and Constitution's route-local `_components`/`_data` convention). Content is a plain static typed array consumed directly by `page.tsx` via a `switch` on `section.type` — the same shape `app/construction/` already uses and the same shape all six sibling pages used before their own later, separate CMS-integration tickets — rather than an async CMS fetch, per this feature's static-only phase scope (Clarifications).

## Complexity Tracking

*No Constitution Check violations — this section is not applicable.*

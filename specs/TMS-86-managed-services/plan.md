# Implementation Plan: Managed Services Page (What We Do)

**Branch**: `feature/TMS-86-what-we-do-managed-services-page` | **Date**: 2026-08-25 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-86-managed-services/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build the Managed Services page at `/what-we-do/managed-services` — the fifth page in TechGrit's "What We Do" service-page family — as a pixel-accurate translation of `raw-files-v3/TechGrit Website V2.3/TechGrit Managed Services.dc.html`. The technical approach is pure reuse: every section this page needs (hero with image media, intro/chips content block, capability card, numbered process step, icon/text tile, linked industry card, FAQ accordion, closing CTA band) already has a matching, unmodified `components/ui/` primitive established by the four sibling pages. This feature introduces zero new shared primitives and zero new icons (all fifteen icon slots this page needs already exist in `components/ui/icons.tsx`) — it is a new route (`app/what-we-do/managed-services/`) composed of page-local `_components/` wrappers that feed this page's own static copy into those existing primitives, plus two one-line navigation-config edits (FR-010). The one genuinely new value this page requires is a single ambient-orb color: the reference's own background decoration uses a violet second orb (`rgba(124,58,237,0.10)`) where the existing shared `/what-we-do/` orb branch (built from the AI-Modernization reference) uses blue — a real, confirmed literal mismatch, not a stylistic preference, so this feature adds one new `tokens.css` overlay token and one new pathname branch in `components/ui/ambient-orbs.tsx`, following the exact precedent the homepage/webinar/contact/careers-about-services branches already set for a page whose reference genuinely differs from the shared default.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.ts`)
**Storage**: N/A — static local TypeScript content module; no CMS/API integration this phase (per spec.md Assumptions). All four sibling pages (`ai-modernization`, `software-product-engineering`, `data-ai-engineering`, `platform-engineering`) have since been upgraded to a live Strapi CMS integration in their own separate, later tickets — this feature deliberately targets their *original*, pre-upgrade static shape instead (confirmed by direct inspection of all four siblings' current CMS-integrated `page.tsx`/`_components/*.tsx`, contrasted against `specs/TMS-86-platform-engineering/`'s own `research.md`/`data-model.md`, which still document that original static shape).
**Testing**: N/A — no test framework is configured anywhere in this repo (Constitution, Development Workflow); verification is manual, per `quickstart.md`
**Target Platform**: Web — responsive desktop/laptop/tablet/mobile, evergreen browsers
**Project Type**: Single Next.js App Router web application (this repo's only structure — no monorepo, no `apps/`/`packages/`)
**Performance Goals**: No client-side data fetching, no network waterfall, and no visible layout shift on initial render — the page renders as a Server Component; the FAQ's native `<details>`/`<summary>` needs no client JS for independent expand/collapse
**Constraints**: Token-only styling (Constitution Principle I — one new overlay token justified below, in Complexity Tracking); the documented `lg=1140/md=960/sm=560` breakpoint contract (Principle II); zero new `components/ui/` primitives — 100% reuse of `Hero`, `ContentBlock`, `GlassCard` (`serviceCapability` variant), `ProcessSteps`, `Faq`, `IconTile`, `final-cta`, and `MediaSlot` (Principle III, spec.md FR-002/FR-011)
**Scale/Scope**: One new static route, 9 content sections, 0 new shared components, 0 new icons, 1 new token + 1 new `ambient-orbs.tsx` pathname branch, 2 one-line navigation-config edits (`cms/api/footer.ts`, `cms/api/header.ts` — FR-010)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Token-Only Styling | PASS (1 justified new token) | Every capability/lifecycle/why/FAQ/related/CTA visual value this reference needs is already expressed through the exact same `components/ui/` primitives and existing color tokens the sibling pages ship with (confirmed in research.md §5: the three per-industry icon-chip colors — teal, blue, amber/yellow — and their tint backgrounds all already exist in `tokens.css`). The single exception is the hero-adjacent ambient-orb second color: the reference's `rgba(124,58,237,0.10)` violet does not match any existing token (closest, `--color-overlay-violet-14`, is a different hue *and* opacity — `rgba(147,51,234,0.14)`), so one new `--color-overlay-violet-10: rgba(124, 58, 237, 0.10)` token is added to `tokens.css`'s existing overlay section, **with its required mirror entry in `globals.css`'s `@theme inline` block** (research.md §6), per Principle I's own rule that a genuinely new literal value gets added to `tokens.css` first, not hardcoded inline — and per Principle I's `@theme inline` completeness clause, every such token needs its Tailwind-utility mirror or the class that consumes it silently no-ops instead of erroring. |
| II. Documented Breakpoint Contract | PASS | `Hero`, `ContentBlock`, `GlassCard`, `ProcessSteps` already implement the `lg/md/sm` (1140/960/560) collapse behavior internally; this page adds no new breakpoint. |
| III. Centralized, Non-Duplicated Component Library | PASS | FR-002/FR-011 explicitly forbid a new shared primitive; every section maps onto an existing, unmodified `components/ui/` component (see Project Structure below), and every icon this page needs (6 "why" tiles, 3 industry cards, 6 related-service links) already exists in `components/ui/icons.tsx` (research.md §4). Page-local `_components/` wrappers only supply content, matching the established `app/what-we-do/{ai-modernization,software-product-engineering,data-ai-engineering,platform-engineering}/_components/` pattern. |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | PASS | The reference's `DCLogic`/`{{ }}`/`sc-for` scaffolding is translated to plain React (static `.map()` over a typed content array, native `<details>` for FAQ, no client component needed) — not copied verbatim. |
| V. Dark-First Brand System | PASS | Inherits the shared `tokens.css`/`globals.css` system unchanged; preserves the exact `OrbitAI™` trademark glyph from the reference copy (used only in the hero card's caption line, which per spec.md Clarifications this page renders without — the trademark string itself is not displayed on this page, matching the Software Product Engineering sibling's treatment). |
| VI. UI Craft via frontend-design Skill | PASS | Invoked during this planning phase — see "UI Design Approach" below. |

No unjustified violations. One narrowly-scoped, documented token addition — see Complexity Tracking.

## UI Design Approach

*Required for UI features per Constitution Principle VI.*

**UI mode detection**: UI mode ON — tech signal matched (Next.js/React, this repo's Primary Dependencies) AND content signal matched (spec.md is saturated with "page", "hero", "section", "card").

**`frontend-design` skill invocation**: Asked the skill what craft guidance applies when a page is an intentional, content-only reskin of four already-shipped sibling pages, reusing their exact component set — not a greenfield page needing its own new bold aesthetic direction. The skill's own generic guidance (distinctive per-generation typography/color/motion choices, avoid convergence on repeated fonts/palettes, "never the same design twice", bold maximalism-or-refined-minimalism executed with precision) is written for the case where no design system yet exists.

**Reconciliation with Principles I–V**: That generic guidance doesn't apply the same way here — this repo already committed to one bold, considered aesthetic direction (Constitution Principle V: dark `#000000` surface, single orange→amber gradient accent, one Calibri/Carlito type family, ALL-CAPS wide-tracked labels, `tg*`-prefixed staggered-reveal motion) precisely so that every page in the "What We Do" family reads as one coherent product, not a portfolio of one-off experiments. For a fifth service page joining an already-established four-page family, *visual consistency itself* is the deliberate design decision, not a shortcut — reinventing spacing/motion/typography for this page alone would be the actual craft failure here (a "cookie-cutter but inconsistent" result), not reuse. Per the Constitution's explicit boundary clause, Principles I–V win over the skill's generic per-page-distinctiveness guidance — exactly the same reconciliation every prior sibling page's own plan already recorded.

The craft decisions that *do* belong to this specific page, and were made deliberately rather than defaulted:
- **Hero image treatment**: `public/samples/ind-healthcare.png` (per spec.md Clarifications) rendered through `Hero`'s `mediaFill` + `MediaSlot`'s `fill`/`object-cover` path — the same treatment already established for the siblings' `svc-eng.png`/`svc-qa.png`/`svc-uiux.png` — with no `mediaCaption` set, matching the Software Product Engineering and Platform Engineering siblings' caption-less treatment.
- **Per-industry accent color, preserved rather than normalized**: unlike this page's own "why"/capability sections (uniform orange accent, matching every sibling), the "Applications we support" section's three icon chips keep the reference's own distinct per-industry tint (teal/HealthTech, blue/FinTech, amber/Construction Tech) — the same color-coding convention the site's header mega-menu Industries dropdown already uses for these same three industries, so this isn't a new palette decision, just reusing an already-established sitewide color-per-industry convention in a new context.
- **Motion consistency**: reuse `Hero`'s existing staggered `data-rise` delays (crumbs .05s → badge .12s → h1 .18s → subtitle .26s → CTAs .34s → media .35s) and `RevealOnScroll` for every subsequent section, verbatim — introducing a different stagger rhythm for this page alone would read as an inconsistency, not a fresh take.
- **Content-driven differentiation**: the six capability disciplines (Support, Enhance, AIOps, Reliability, Cloud, Security), five lifecycle stages (Monitor, Detect, Resolve, Optimize, Evolve), and six "why" reasons are this service's own copy and its own icon choices (checkmark-circle reliability, self-healing/automation overhead reduction, code-bracket delivery, shield technical-debt, users engineering-extension, award continuous-modernization) — distinct from all four siblings' own framing. The family's shared visual grammar plus genuinely different content and iconography is what keeps this fifth page from reading as a duplicate of the first four.
- **One genuinely new background value, not a design flourish**: the confirmed violet-vs-blue ambient-orb mismatch (Constitution Check, above) is corrected because it's a literal reference fact, not introduced as a new creative choice — the rest of the orb geometry (position, size, blur, timing) stays byte-identical to the shared `/what-we-do/` set.

**Anchor components / files affected**:
- New: `app/what-we-do/managed-services/page.tsx`
- New: `app/what-we-do/managed-services/_components/{managed-services-capabilities,managed-services-lifecycle,managed-services-why,managed-services-industries,managed-services-faq,managed-services-related}.tsx`
- New: `app/what-we-do/managed-services/_data/{types.ts,managed-services-content.ts}`
- Edited (1 line each, FR-010): `cms/api/footer.ts`, `cms/api/header.ts`
- Edited (new token + new pathname branch): `app/tokens.css`, `app/globals.css` (the token's required `@theme inline` mirror), `components/ui/ambient-orbs.tsx`
- Reused, unmodified: `components/ui/{Hero,ContentBlock,GlassCard,ProcessSteps,Faq,IconTile,final-cta,MediaSlot,Button,reveal-on-scroll,icons}.tsx`
- No file under `app/globals.css`, `components/layout/`, or any other route is touched.

## Project Structure

### Documentation (this feature)

```text
specs/TMS-86-managed-services/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md         # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── checklists/
│   └── requirements.md  # Spec quality checklist (/speckit.specify command)
└── tasks.md             # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
app/what-we-do/managed-services/
├── page.tsx                                  # Server Component; switch over content.sections
├── _components/
│   ├── managed-services-capabilities.tsx     # GlassCard (serviceCapability) x6
│   ├── managed-services-lifecycle.tsx        # ProcessSteps x5
│   ├── managed-services-why.tsx              # page-local WhyTile x6 (matches siblings' own pattern)
│   ├── managed-services-industries.tsx       # GlassCard (serviceCapability) x3, all linked, per-card icon accent color
│   ├── managed-services-faq.tsx              # Faq x5 (first item defaultOpen)
│   └── managed-services-related.tsx          # IconTile (compact) x6, linked
└── _data/
    ├── types.ts                              # Page-local section/entity interfaces
    └── managed-services-content.ts           # Static typed content array (no CMS this phase)

cms/api/footer.ts               # FR-010a: 1-line href edit (svc-managed entry)
cms/api/header.ts               # FR-010b: 1-line special-case addition in toMegaGroup
app/tokens.css                  # 1 new overlay token (--color-overlay-violet-10)
app/globals.css                 # 1 new @theme inline mirror line for the token above (Principle I)
components/ui/ambient-orbs.tsx  # 1 new pathname branch (/what-we-do/managed-services)
```

**Structure Decision**: Single Next.js App Router project (this repo's only structure — no monorepo). Route-local composition under `app/what-we-do/managed-services/`, mirroring `app/what-we-do/ai-modernization/`'s, `app/what-we-do/software-product-engineering/`'s, `app/what-we-do/data-ai-engineering/`'s, and `app/what-we-do/platform-engineering/`'s original file/folder architecture exactly (per the user's explicit instruction and Constitution's route-local `_components`/`_data` convention). Content is a plain static typed array consumed directly by `page.tsx` via a `switch` on `section.type` — the same shape `app/construction/` already uses and the same shape all four sibling pages used before their own later, separate CMS-integration tickets — rather than an async CMS fetch, per this feature's static-only phase scope (spec.md Assumptions).

## Complexity Tracking

> One narrowly-scoped Constitution Principle I addition — documented here per the gate's own instructions.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| New token `--color-overlay-violet-10` in `tokens.css`, plus its required `@theme inline` mirror in `globals.css` | The reference's ambient-orb second color (`rgba(124,58,237,0.10)`) is a genuinely new literal — the closest existing token, `--color-overlay-violet-14` (`rgba(147,51,234,0.14)`), differs in both hue and opacity enough that reusing it would visibly diverge from the reference under the page's own dark background (this is a background decoration behind glass panels, but still a confirmed literal mismatch, not a subjective judgment call). The `globals.css` mirror is not optional: Principle I states a `tokens.css` color value with no matching `@theme inline` entry is itself a violation, since the Tailwind utility class that consumes it (`bg-overlay-violet-10` in `ambient-orbs.tsx`) would silently resolve to nothing instead of erroring — exactly the bug class Principle I's own rationale cites the TMS-62 fidelity audit for. | Reusing `--color-overlay-violet-14` as-is — rejected because Principle I's own guidance is to add a new token when the reference "genuinely requires a value that doesn't already exist," and this is exactly that case, not a case of acceptable small delta (the existing precedent for accepting deltas, e.g. `--gradient-webinar-released-orange`'s own comment "a 2% delta," is for a single-dimension few-percent difference — here both the hue and the opacity differ). Adding the token to `tokens.css` alone without its `globals.css` mirror was considered and rejected the same way — it would satisfy the letter of "add new values to tokens.css first" while missing the very next clause of the same principle. |

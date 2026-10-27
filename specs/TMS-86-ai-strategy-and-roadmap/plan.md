# Implementation Plan: AI Strategy & Roadmap Page (What We Do)

**Branch**: `feature/TMS-86-what-we-do-ai-strategy-and-roadmap-page` | **Date**: 2026-08-26 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-86-ai-strategy-and-roadmap/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Build the AI Strategy & Roadmap page at `/what-we-do/ai-strategy-roadmap` — the sixth page in
TechGrit's "What We Do" service-page family — as a pixel-accurate translation of
`raw-files-v3/TechGrit Website V2.3/TechGrit AI Strategy.dc.html`. The technical approach is pure
reuse: every section this page needs (hero with image media, intro/chips content block, capability
card, numbered process step, icon/text tile, non-linked segment card, FAQ accordion, closing CTA
band) already has a matching, unmodified `components/ui/` primitive established by the five sibling
pages. This feature introduces zero new shared primitives — it is a new route
(`app/what-we-do/ai-strategy-roadmap/`) composed of page-local `_components/` wrappers that feed
this page's own static copy into those existing primitives, plus two one-line navigation-config
edits (FR-010). It introduces exactly one new icon (`UserIcon`, a single-person silhouette needed
twice on this page, with no existing equivalent — research.md §3) and one new ambient-orb pathname
branch reusing four *already-existing* color tokens in a combination no prior branch happens to use
(research.md §4) — zero new design tokens, a simpler outcome than the Managed Services sibling's own
plan (which needed one genuinely new token).

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.ts`)
**Storage**: N/A — static local TypeScript content module; no CMS/API integration this phase (per spec.md Clarifications/Assumptions). All five sibling pages (`ai-modernization`, `software-product-engineering`, `data-ai-engineering`, `platform-engineering`, `managed-services`) have since been upgraded to a live Strapi CMS integration in their own separate, later tickets — this feature deliberately targets their *original*, pre-upgrade static shape instead (confirmed by direct inspection of all five siblings' current CMS-integrated `page.tsx`/`_components/*.tsx`, contrasted against `specs/TMS-86-platform-engineering/`'s own `research.md`/`data-model.md`, which still document that original static shape).
**Testing**: N/A — no test framework is configured anywhere in this repo (Constitution, Development Workflow); verification is manual, per `quickstart.md`
**Target Platform**: Web — responsive desktop/laptop/tablet/mobile, evergreen browsers
**Project Type**: Single Next.js App Router web application (this repo's only structure — no monorepo, no `apps/`/`packages/`)
**Performance Goals**: No client-side data fetching, no network waterfall, and no visible layout shift on initial render — the page renders as a Server Component; the FAQ's native `<details>`/`<summary>` needs no client JS for independent expand/collapse
**Constraints**: Token-only styling (Constitution Principle I — zero new tokens needed, see Complexity Tracking); the documented `lg=1140/md=960/sm=560` breakpoint contract (Principle II); zero new `components/ui/` primitives — 100% reuse of `Hero`, `ContentBlock`, `GlassCard` (`serviceCapability` variant), `ProcessSteps`, `Faq`, `IconTile`, `final-cta`, and `MediaSlot` (Principle III, spec.md FR-002/FR-011); one new icon (`UserIcon`) added to the single consolidated `components/ui/icons.tsx` file rather than a page-local copy (Additional Constraints)
**Scale/Scope**: One new static route, 9 content sections, 0 new shared components, 1 new icon, 0 new tokens, 1 new `ambient-orbs.tsx` pathname branch, 2 one-line navigation-config edits (`cms/api/footer.ts`, `cms/api/header.ts` — FR-010)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Token-Only Styling | PASS (no new tokens) | Every capability/lifecycle/why/FAQ/related/CTA visual value this reference needs is already expressed through the exact same `components/ui/` primitives and existing color tokens the sibling pages ship with. The hero-adjacent ambient orbs' four exact rgba values (research.md §4) all already exist as named tokens (`--color-overlay-orange`, `--color-overlay-amber-12`, `--color-overlay-orange-10`, `--color-overlay-orange-11`) — this page's orb branch is a new *combination* of existing tokens, not a new token. |
| II. Documented Breakpoint Contract | PASS | `Hero`, `ContentBlock`, `GlassCard`, `ProcessSteps` already implement the `lg/md/sm` (1140/960/560) collapse behavior internally; this page adds no new breakpoint. |
| III. Centralized, Non-Duplicated Component Library | PASS (1 justified new icon) | FR-002/FR-011 explicitly forbid a new shared primitive; every section maps onto an existing, unmodified `components/ui/` component (see Project Structure below). Of this page's 16 icon slots, 10 reuse an existing exact-path icon and 4 reuse a near-exact existing icon (research.md §3); the remaining 2 slots (both a single-person silhouette, used twice) have no existing match at all, so one new `UserIcon` is added to the single consolidated `components/ui/icons.tsx` file — not a page-local copy — satisfying "genuinely reusable, not unnecessarily specific to a single section" (Additional Constraints). Page-local `_components/` wrappers only supply content, matching the established `app/what-we-do/{ai-modernization,software-product-engineering,data-ai-engineering,platform-engineering,managed-services}/_components/` pattern. |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | PASS | The reference's `DCLogic`/`{{ }}`/`sc-for` scaffolding is translated to plain React (static `.map()` over a typed content array, native `<details>` for FAQ, no client component needed) — not copied verbatim. |
| V. Dark-First Brand System | PASS | Inherits the shared `tokens.css`/`globals.css` system unchanged; the reference's "AI IMPACT™ · 4D™ · PRISM™ frameworks" caption line (all three real named IP per Principle V) is not rendered on this page at all — per Clarifications, the hero card drops its caption entirely along with the stat tiles, matching the Software Product Engineering / Platform Engineering siblings' caption-less treatment (no trademark string is displayed incorrectly; it's simply absent, same as those two siblings). |
| VI. UI Craft via frontend-design Skill | PASS | Invoked during this planning phase — see "UI Design Approach" below. |

No unjustified violations. One narrowly-scoped, documented new icon — see Complexity Tracking.

## UI Design Approach

*Required for UI features per Constitution Principle VI.*

**UI mode detection**: UI mode ON — tech signal matched (Next.js/React, this repo's Primary Dependencies) AND content signal matched (spec.md is saturated with "page", "hero", "section", "card").

**`frontend-design` skill invocation**: Asked the skill what craft guidance applies when a page is an intentional, content-only reskin of five already-shipped sibling pages, reusing their exact component set — not a greenfield page needing its own new bold aesthetic direction. The skill's own generic guidance (distinctive per-generation typography/color/motion choices, avoid convergence on repeated fonts/palettes, "never the same design twice", bold maximalism-or-refined-minimalism executed with precision) is written for the case where no design system yet exists.

**Reconciliation with Principles I–V**: That generic guidance doesn't apply the same way here — this repo already committed to one bold, considered aesthetic direction (Constitution Principle V: dark `#000000` surface, single orange→amber gradient accent, one Calibri/Carlito type family, ALL-CAPS wide-tracked labels, `tg*`-prefixed staggered-reveal motion) precisely so that every page in the "What We Do" family reads as one coherent product, not a portfolio of one-off experiments. For a sixth service page joining an already-established five-page family, *visual consistency itself* is the deliberate design decision, not a shortcut — reinventing spacing/motion/typography for this page alone would be the actual craft failure here (a "cookie-cutter but inconsistent" result), not reuse. Per the Constitution's explicit boundary clause, Principles I–V win over the skill's generic per-page-distinctiveness guidance — exactly the same reconciliation every prior sibling page's own plan already recorded.

The craft decisions that *do* belong to this specific page, and were made deliberately rather than defaulted:
- **Hero image treatment**: `public/samples/dm-scalability.png` (per spec.md Clarifications) rendered through `Hero`'s `mediaFill` + `MediaSlot`'s `fill`/`object-cover` path — the same treatment already established for the siblings' `svc-eng.png`/`svc-qa.png`/`svc-uiux.png`/`ind-healthcare.png`, drawn instead from the `dm-*` bucket (already precedented by `dm-tech-debt.png` on AI-Accelerated Modernization) to keep `ind-fintech.png` free for the still-unbuilt FinTech industry page — with no `mediaCaption` set, matching the Software Product Engineering and Platform Engineering siblings' caption-less treatment.
- **Icon-less capability cards, confirmed not a gap**: unlike this page's own "why" tiles (icon + text), the four capability cards deliberately have no icon — confirmed by reading `GlassCard.tsx`'s `serviceCapability` variant, whose `ICON_VARIANTS` entry is an empty string specifically because every "What We Do" sibling's capability cards are icon-less, matching this reference's own `.cap-card` markup (numbered eyebrow label only).
- **One new, genuinely reusable icon, not a one-off**: `UserIcon` (research.md §3) is added because this page needs a single-person silhouette twice (Fractional flexibility, Scale-ups) and nothing in the existing 950-line `icons.tsx` is even a partial match beyond the two-person `UsersIcon`. Added to the shared file per Additional Constraints ("every icon used anywhere ... is added to this one file, never a per-route copy"), not scoped narrowly to this page.
- **Two near-exact icon reuses, not new one-offs**: `HamburgerIcon` (PE/VC Portfolio) and `ConstructionIcon` (Enterprise Programs) differ from the reference by a few pixels of line inset and one extra door sub-path respectively — imperceptible at the 20px icon size inside a 40px tinted chip. Reusing them follows the same precedent as `EradicateDebtIcon` being reused for a semantically unrelated "Software Product Engineering" link on every sibling page.
- **Motion consistency**: reuse `Hero`'s existing staggered `data-rise` delays (crumbs .05s → badge .12s → h1 .18s → subtitle .26s → CTAs .34s → media .35s) and `RevealOnScroll` for every subsequent section, verbatim — introducing a different stagger rhythm for this page alone would read as an inconsistency, not a fresh take.
- **Content-driven differentiation**: the four capability disciplines (Strategy, Architecture, Leadership, Quality), five engagement stages (Diagnose, Roadmap, Execute, Measure, Coach), and six "why" reasons are this service's own copy and its own icon choices — distinct from all five siblings' own framing. The family's shared visual grammar plus genuinely different content and iconography (plus a 4-capability/2-column grid instead of the siblings' 6-capability/3-column grid — a real, reference-driven structural difference, not a design flourish) is what keeps this sixth page from reading as a duplicate of the first five.
- **One background-color combination, not a design flourish**: the confirmed ambient-orb color combination (Constitution Check, above) is a new *arrangement* of four already-existing tokens because it's a literal reference fact, not introduced as a new creative choice — the geometry (position, size, blur, timing) is byte-identical to the shared `/what-we-do/`/`/how-we-work/`/`careers-about-services` branches.

**Anchor components / files affected**:
- New: `app/what-we-do/ai-strategy-roadmap/page.tsx`
- New: `app/what-we-do/ai-strategy-roadmap/_components/{ai-strategy-roadmap-capabilities,ai-strategy-roadmap-lifecycle,ai-strategy-roadmap-why,ai-strategy-roadmap-advisory-segments,ai-strategy-roadmap-faq,ai-strategy-roadmap-related}.tsx`
- New: `app/what-we-do/ai-strategy-roadmap/_data/{types.ts,ai-strategy-roadmap-content.ts}`
- Edited (1 line each, FR-010): `cms/api/footer.ts`, `cms/api/header.ts`
- Edited (1 new icon export): `components/ui/icons.tsx`
- Edited (1 new pathname branch, no new tokens): `components/ui/ambient-orbs.tsx`
- Reused, unmodified: `components/ui/{Hero,ContentBlock,GlassCard,ProcessSteps,Faq,IconTile,final-cta,MediaSlot,Button,reveal-on-scroll}.tsx`
- No file under `app/tokens.css`, `app/globals.css`, `components/layout/`, or any other route is touched.

## Project Structure

### Documentation (this feature)

```text
specs/TMS-86-ai-strategy-and-roadmap/
├── plan.md               # This file (/speckit.plan command output)
├── research.md           # Phase 0 output (/speckit.plan command)
├── data-model.md          # Phase 1 output (/speckit.plan command)
├── quickstart.md         # Phase 1 output (/speckit.plan command)
├── checklists/
│   └── requirements.md   # Spec quality checklist (/speckit.specify command)
└── tasks.md              # Phase 2 output (/speckit.tasks command)
```

### Source Code (repository root)

```text
app/what-we-do/ai-strategy-roadmap/
├── page.tsx                                       # Server Component; switch over content.sections
├── _components/
│   ├── ai-strategy-roadmap-capabilities.tsx      # GlassCard (serviceCapability) x4, no icon
│   ├── ai-strategy-roadmap-lifecycle.tsx         # ProcessSteps x5 (default columns=5)
│   ├── ai-strategy-roadmap-why.tsx               # page-local WhyTile x6 (matches siblings' own pattern)
│   ├── ai-strategy-roadmap-advisory-segments.tsx # GlassCard (serviceCapability) x4, never linked
│   ├── ai-strategy-roadmap-faq.tsx               # Faq x5 (first item defaultOpen)
│   └── ai-strategy-roadmap-related.tsx           # IconTile (compact) x6, linked
└── _data/
    ├── types.ts                                  # Page-local section/entity interfaces
    └── ai-strategy-roadmap-content.ts             # Static typed content array (no CMS this phase)

cms/api/footer.ts               # FR-010a: 1-line href edit (svc-strategy entry)
cms/api/header.ts               # FR-010b: 1-line special-case addition in toMegaGroup
components/ui/icons.tsx         # 1 new export: UserIcon (single-person silhouette)
components/ui/ambient-orbs.tsx  # 1 new pathname branch (/what-we-do/ai-strategy-roadmap), reusing existing tokens
```

**Structure Decision**: Single Next.js App Router project (this repo's only structure — no monorepo). Route-local composition under `app/what-we-do/ai-strategy-roadmap/`, mirroring `app/what-we-do/ai-modernization/`'s, `app/what-we-do/software-product-engineering/`'s, `app/what-we-do/data-ai-engineering/`'s, `app/what-we-do/platform-engineering/`'s, and `app/what-we-do/managed-services/`'s original file/folder architecture exactly (per the user's explicit instruction and Constitution's route-local `_components`/`_data` convention). Content is a plain static typed array consumed directly by `page.tsx` via a `switch` on `section.type` — the same shape `app/construction/` already uses and the same shape all five sibling pages used before their own later, separate CMS-integration tickets — rather than an async CMS fetch, per this feature's static-only phase scope (spec.md Assumptions).

## Complexity Tracking

> One narrowly-scoped Constitution Principle III addition — documented here per the gate's own instructions.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| New icon `UserIcon` (single-person silhouette) in `components/ui/icons.tsx` | This page needs a single-person silhouette icon twice (the "Fractional flexibility" why-tile and the "Scale-ups" advisory-segment card) and no existing icon in the file's 950 lines renders one — the only person-shaped icon, `UsersIcon`, is a distinct, larger two-person shape (research.md §3). Reusing `UsersIcon` as-is would render a visibly wrong second person the reference doesn't have; that's not a minor pixel delta like the `HamburgerIcon`/`ConstructionIcon` reuses below, it's a materially different picture. | Reusing `UsersIcon` unmodified — rejected because it draws content the reference doesn't show, unlike a few pixels of inset or one small sub-path. Cropping/masking `UsersIcon` via CSS at each call site instead of a new icon component was considered and rejected as a worse violation of Principle III's spirit (two call sites reimplementing an icon-clipping hack is less maintainable and less reusable than one clearly-named `UserIcon` export). Adding the icon as a page-local component instead of to the shared `components/ui/icons.tsx` file was also rejected — Additional Constraints requires "every icon used anywhere ... is added to this one file, never a per-route copy," and this icon is used twice within this single page alone, clearing the reusability bar on its own. |

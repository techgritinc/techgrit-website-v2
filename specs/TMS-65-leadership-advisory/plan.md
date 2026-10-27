# Implementation Plan: Leadership & Advisory Page (About sub-route restructure)

**Branch**: `TMS-65-leadership-advisory` | **Date**: 2026-08-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/TMS-65-leadership-advisory/spec.md`

## Summary

Split the single `/about` route into `/about/our-story` (the existing page, relocated verbatim) and `/about/leadership-advisory` (new), make the header's "About" parent a hover-only trigger, and build the new page's four sections against `raw-files-v3/TechGrit Website V2.3/TechGrit Leadership.dc.html`.

Technical approach: a pure App Router folder move for Our Story; a new route whose `page.tsx` composes three route-local section components plus the shared `FinalCta`; two new shared primitives (`Breadcrumb`, `ProfileCard`) built on the existing `GlassCard` via a new variant; a typed static content module now, shaped so the later CMS swap touches only the loader. The `/about` redirect goes in `next.config.ts`. The stale-CMS nav href is normalised at the data layer (`cms/api/header.ts`), not in the client component, so it becomes a no-op the day the CMS is corrected.

## Technical Context

**Language/Version**: TypeScript 5 (strict, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.ts`)
**Storage**: N/A — page content is a static local TypeScript module this iteration; a Strapi CMS swap is a tracked follow-up
**Testing**: No test framework configured in this repo. Verification is `npm run lint` + `npm run build` (both enforced by `.husky/pre-commit`) plus browser verification at the viewports named in SC-002
**Target Platform**: Server-rendered Next.js app (all CMS fetches use `cache: "no-store"`, so every route is dynamic); modern evergreen browsers
**Project Type**: Single Next.js App Router application rooted at `app/`
**Performance Goals**: No new client JS beyond what the existing header already ships — all four new sections are Server Components. No new fonts, no new network requests
**Constraints**: Token-only styling (Principle I); canonical breakpoints only (Principle II); no forked primitives and no new icons (Principle III + FR-033); header/footer presentation owned by another workstream
**Scale/Scope**: 1 relocated route, 1 new route, 4 new section components, 2 new shared primitives, 1 GlassCard variant, 2 new content modules, ~3 new tokens, 5 touched existing files

## Constitution Check

*GATE: evaluated against `.specify/memory/constitution.md` v2.0.0.*

| Principle | Status | Notes |
|---|---|---|
| **I. Token-Only Styling** | **PASS with additions** | Value-by-value audit done at plan time (see research.md). All but three reference values already have tokens. Three new tokens are justified and each gets its matching `@theme inline` entry in `globals.css` — the missing-mapping bug class called out in CLAUDE.md is explicitly guarded by task T007. |
| **II. Documented Breakpoint Contract** | **PASS** | The reference's own 900px breakpoint is *not* reproduced. Both grid collapses and the H1 step-down use the canonical `tg-md` (960px), per FR-046. No new pixel breakpoint. |
| **III. Centralized, Non-Duplicated Component Library** | **PASS** | `Button` (primary + existing `ghost`), `Badge`, `GlassCard` (+ new `leaderProfile` variant, not a fork), `SectionEyebrow` (`showAccent={false}`), `icons.tsx` (`LinkedInIcon`, `LayoutDashboardIcon`, `SvcStartupsIcon`, `OrbitAiIcon`, `HeartIcon` — zero new icons), `AmbientOrbs`, `FinalCta` all reused. Two genuinely new primitives added, no reimplementation of anything existing. |
| **IV. Design References Are Visual Truth** | **PASS** | `.dc.html` used as layout/copy truth only. Its `<x-dc>` wrapper, `<helmet>`, inline `<style>`, hand-written nav/footer and inline `onerror` attributes are all discarded. The `.crumbs`/`.leader-card`/`.why-tile` CSS classes are re-expressed as tokenised Tailwind, never copied. |
| **V. Dark-First Brand System** | **PASS** | Black surface, `--color-text-*` opacity ladder, orange→amber gradient confined to the H1 highlight and the two primary CTAs — never a full-surface fill. No font changes. |
| **VI. UI Craft via frontend-design Skill** | **PASS** | UI mode ON via both signals. Skill invoked at plan time; output and reconciliation recorded in "UI Design Approach" below. |
| **Additional Constraints — no speculative `components/`** | **VIOLATION (justified)** | See Complexity Tracking. |

**Gate result**: PASS. One violation, explicitly authorised by the user during `/speckit.clarify` and recorded below.

## UI Design Approach

*Required by Constitution Principle VI.*

**UI mode detection**: UI mode **ON** — both signals match. Tech signal: Technical Context lists Next.js 16 + React 19 as Primary Dependencies. Content signal: spec.md contains page, component, section, hero, card, layout, button, navigation, styling.

**`frontend-design` skill invocation**: The skill was asked for component architecture and craft guidance for the four sections, under the stated constraint that fonts, colours, icons and primitives are all fixed. What it returned, in substance:

- *Commit to one aesthetic direction and execute precisely; intentionality over intensity.* Applied — the direction is already set by the brand system, so precision is where the effort goes.
- *Concentrate motion into one well-orchestrated page-load with staggered reveals rather than scattering micro-interactions.* Adopted directly: the hero's five-step `data-rise` stagger is the page's single motion set-piece, and per-card hover is treated as **one coordinated gesture** (lift + border warm + LinkedIn pill warm, shared timing/easing) rather than three independent transitions.
- *Typography should be distinctive and non-generic; pair a display face with a body face.* **Overridden** — see reconciliation.
- *Prefer unexpected, asymmetric spatial composition; avoid predictable layouts.* **Overridden** — see reconciliation.
- *Build atmosphere and depth rather than flat fills; layered transparency, dramatic shadow, glow.* Adopted within existing tokens — the page's depth comes from the reused About orb field showing through the cards' `backdrop-blur`, which is exactly why the profile card is built on `GlassCard` rather than a plain bordered div.

Craft decisions the skill's lens surfaced that the reference does not specify, and which are now planned:

1. **Equal-height cards with a bottom-pinned LinkedIn pill.** The three biographies differ in length; the reference's naive flow would leave the three pills at three different heights. The card becomes a flex column with the pill pushed down, so the pills align across the row — invisible when right, conspicuous when wrong.
2. **Icon holder must not drift when a tile title wraps.** The rationale tiles get top alignment and a non-shrinking icon holder, so the 2×2 grid stays optically aligned at every width.
3. **Semantic breadcrumb.** The reference uses bare `<div>`s. Rebuilt as `<nav aria-label="Breadcrumb"><ol>` with `aria-current="page"` on the leaf — a Principle IV re-expression, not a copy.
4. **Placeholder honesty.** With one shared photo across all three profiles (clarification 2), the circle is deliberately *not* given per-person treatment that would imply a real portrait.

**Reconciliation with Principles I–V**:

- Skill pushed for a distinctive display/body font pairing. **Principle V wins**: the v2 token set mandates the single Calibri/Carlito/Segoe UI stack sitewide (TMS-85 migrated away from Manrope + Space Grotesk). No font change.
- Skill pushed for asymmetry, overlap, diagonal flow and grid-breaking. **Principle IV wins**: the reference is a centred, symmetric stack and is the visual truth. Composition stays centred; the craft budget goes into hover choreography, vertical rhythm and equal-height alignment instead.
- Skill suggested new gradient meshes, noise and grain textures for atmosphere. **Principle I wins**: no new decorative layers are introduced — the existing About orb field plus `GlassCard`'s `backdrop-blur` supply the depth, and every value resolves to a token.
- Skill warned against converging on common AI choices. Not applicable in the usual way here (the palette and type are pre-decided), but it is the reason the profile card extends `GlassCard` with a real variant instead of becoming a generic bordered box.

**Anchor components / files affected** (seeds the `[UI]` markers in tasks.md):

| Action | Path |
|---|---|
| Move | `app/about/page.tsx` → `app/about/our-story/page.tsx` |
| Move | `app/about/_components/*` (8 files) → `app/about/our-story/_components/*` |
| New | `app/about/leadership-advisory/page.tsx` |
| New | `app/about/leadership-advisory/_components/leadership-hero.tsx` |
| New | `app/about/leadership-advisory/_components/leadership-profiles.tsx` |
| New | `app/about/leadership-advisory/_components/leadership-why-it-matters.tsx` |
| New | `app/about/leadership-advisory/_data/data.ts` |
| New | `cms/types/leadership-types.ts` |
| New (shared) | `components/ui/Breadcrumb.tsx` |
| New (shared) | `components/ui/ProfileCard.tsx` |
| Edit | `components/ui/GlassCard.tsx` — add `leaderProfile` variant to all four variant records |
| Edit | `components/layout/HeaderClient.tsx` — About parent non-navigable + active state |
| Edit | `cms/api/header.ts` — normalise the stale `/about` sub-item href |
| Edit | `cms/api/footer.ts` — repoint both About links |
| Edit | `app/_home-components/LifeGallery.tsx` — repoint About action |
| Edit | `lib/routes.ts` — add the two sub-route constants |
| Edit | `next.config.ts` — add the `/about` permanent redirect |
| Edit | `app/tokens.css` + `app/globals.css` — 3 new tokens + their `@theme inline` mappings |

## Project Structure

### Documentation (this feature)

```text
specs/TMS-65-leadership-advisory/
├── spec.md              # Phase 1 output (reviewed + clarified)
├── plan.md              # This file
├── research.md          # Phase 0 output — token audit, redirect strategy, decisions
├── checklists/
│   └── requirements.md
└── tasks.md             # Phase 2 output
```

No `data-model.md`, `contracts/` or `quickstart.md`: this feature has no API, no database and no persisted state. The content shapes are already covered by spec.md's Key Entities, and the two decisions worth recording are below.

### Content shape

Types in `cms/types/leadership-types.ts`, values in `app/about/leadership-advisory/_data/data.ts`, reached through one async accessor returning `LeadershipPageContent | null` so the later CMS swap replaces the loader and nothing else (SC-010). Two non-obvious choices:

- **A named record of sections, not the discriminated-union `sections[]` array `about-types.ts` uses.** The About page needs the array because its section order is CMS-controlled; these four sections are fixed in order by the reference, so a named record gives compile-time proof every section exists and drops the `switch`-on-`type` dispatch from `page.tsx`.
- **`hero.titleHighlight` must be an exact substring of `hero.title`, or `null`.** The hero splits on it the way `construction-hero.tsx` does; a non-matching value silently drops the gradient rather than erroring. `cms/shared/reusable-sections.ts` already verifies this for the CMS-backed pages and the future loader must reuse it.
- **Tile icons are a closed string-literal union**, not a free string — so the content module structurally cannot name an icon that does not exist in `icons.tsx` (FR-033).

### Source Code (repository root)

```text
app/
├── about/
│   ├── our-story/                    # relocated, content unchanged
│   │   ├── page.tsx
│   │   └── _components/              # 8 existing about-us-*.tsx files, moved
│   └── leadership-advisory/          # NEW
│       ├── page.tsx                  # composes the 3 sections + shared FinalCta
│       ├── _components/
│       │   ├── leadership-hero.tsx
│       │   ├── leadership-profiles.tsx
│       │   └── leadership-why-it-matters.tsx
│       └── _data/
│           └── data.ts               # static dummy content
├── tokens.css                        # + 3 tokens
└── globals.css                       # + 3 @theme inline mappings

components/
├── layout/
│   └── HeaderClient.tsx              # About parent behaviour
└── ui/
    ├── Breadcrumb.tsx                # NEW (shared)
    ├── ProfileCard.tsx               # NEW (shared)
    └── GlassCard.tsx                 # + leaderProfile variant

cms/
├── api/
│   ├── header.ts                     # nav href normalisation
│   └── footer.ts                     # About link targets
└── types/
    └── leadership-types.ts           # NEW

lib/routes.ts                         # + aboutOurStory, aboutLeadership
next.config.ts                        # + redirects()
```

**Structure Decision**: The existing single-app App Router layout is kept exactly as the constitution's "Additional Constraints" section describes. Route-local sections and data live in `_`-prefixed private folders beside their own `page.tsx`; the two genuinely-reusable primitives go in `components/ui/`; cross-route imports use the `@/*` alias and route-local imports stay relative. `ROUTES.about` deliberately keeps its `/about` value as a *prefix*, because `AmbientOrbs` already matches both new sub-routes via `pathname.startsWith(ROUTES.about)` — so the orb requirement (FR-004) needs no code change at all.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| `components/ui/Breadcrumb.tsx` and `components/ui/ProfileCard.tsx` are placed in the shared folder with only one consumer each, against the constraint that "nothing moves there until it's genuinely consumed by more than one route" | Explicitly directed by the user during `/speckit.clarify` (Clarifications session 2026-08-20, Q5) and recorded in FR-039. Every remaining V2.3 detail-page reference in `raw-files-v3/` uses the same `.crumbs` pattern, so the breadcrumb's second consumer is near-certain | Keeping both route-local and promoting them on second use is the constitution-compliant path and was offered as the recommended option; the user chose shared placement now, so the deviation is a recorded decision rather than an oversight |

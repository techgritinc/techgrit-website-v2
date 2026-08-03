# Implementation Plan: Global Header & Footer Layout

**Branch**: `TMS-63` | **Date**: 2026-07-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-63/spec.md`

**Note**: This plan was generated manually because the repository's git branch
(`feature/TMS-63-implement-global-layout-infrastructure`) does not match the numeric
`###-feature-name` pattern `.specify/scripts/bash/setup-plan.sh` expects, and per explicit
instruction the shared script/tooling was left unmodified and the branch was not renamed. Paths
below were computed by hand to point at `specs/TMS-63/`, matching how the feature directory was
deliberately named. `update-agent-context.sh` was run with `SPECIFY_FEATURE=TMS-63` set, which it
already supports natively (no script edit needed there).

## Summary

Build one shared Header component and one shared Footer component that every route in the app
renders through the root layout, replacing the current per-page-would-be-duplicated nav/footer
markup pattern found in the design reference files with a single, reusable implementation. The
header exposes the primary navigation (Services, Industries, Resources, Blog, About Us, Careers,
Contact Us) with two expandable groups (Industries, Resources), collapses into a mobile menu below
the project's existing 1140px navigation breakpoint, and — homepage only — starts transparent over
the hero and solidifies on scroll. The footer is fully standardized and page-invariant — brand
block, two-column General/Careers contact block, a five-group site-map link grid (What We Do, How
We Work, Industries, Insights, Company), a "Follow us" social row, a decorative wordmark, and a
utility bar — pixel-matched to `raw-files-v2/TechGrit Website V2.2/TechGrit Homepage.dc.html`
(spec.md FR-012–FR-018) at its own two responsive breakpoints (1080px, 640px), enhancing the
existing `Footer.tsx`/`footer-config.ts` rather than introducing page-to-page link variation. Both
components consume only the existing design tokens/utility classes; no new visual system is
introduced.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (via
`@tailwindcss/postcss`, consumed through the existing `app/tokens.css` → `app/globals.css` chain)
**Storage**: N/A — navigation and footer link content is static configuration, not persisted data
**Testing**: No test framework is configured in this repository (confirmed gap, not a standard to
introduce here); verification is manual (dev server + the existing `npm run lint` / `npm run
build` pre-commit gate), per spec.md's independent-test descriptions for each user story
**Target Platform**: Web browser, server-rendered/hydrated via Next.js App Router
**Project Type**: Single Next.js web application (no separate frontend/backend split exists or is
introduced by this feature)
**Performance Goals**: No new performance target beyond not regressing existing page-load
behavior; the header/footer must not introduce layout shift or block first paint
**Constraints**: Must comply with the project constitution (`.specify/memory/constitution.md`) —
token-only styling (Principle I), the 1140/960/560 breakpoint contract (Principle II), one shared
component per Principle III's explicit header/footer finding, translating (not copying) the
`.dc.html` reference markup (Principle IV), and the dark-first brand system incl. the homepage nav
exception (Principle V)
**Scale/Scope**: Two shared components (Header, Footer) consumed by every route currently in the
app (today: just `/`) and every route added later; primary nav has 7 top-level items (2 with
sub-items); footer (Footer-only update, 2026-07-30 — supersedes "one contextual quick-link group")
has a brand+contact row, a fully page-invariant five-group site-map link grid (What We Do, How We
Work, Industries, Insights, Company — 20 links total), a "Follow us" social row (3 platforms), a
decorative wordmark, and a legal utility bar (3 links) — see spec.md FR-012–FR-018

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Result |
|---|---|---|
| I. Token-Only Styling | Header/Footer must use only `app/tokens.css` custom properties / the `@theme` Tailwind utilities they generate — no hardcoded hex/px | ✅ PASS (planned) — no new colors needed; every color/spacing value used in the reference nav/footer already exists as a token (see constitution v1.1.0 color cross-check). Footer-only update (2026-07-30): the raw pixel/color/gradient values now itemized in spec.md FR-012–FR-018 (gradient bar stops, glow colors/blur radii, 36px fixed padding, wordmark `clamp()`/opacity-fade values) must each resolve to an existing or newly-added `tokens.css` entry before use — see research.md's token cross-check note. |
| II. Documented Breakpoint Contract | Nav collapse must use the 1140px breakpoint (not an invented one) | ✅ PASS — `app/globals.css` already ships the exact mechanism (`[data-desktop-nav]`, `[data-cta-nav]`, `[data-burger]` hidden/shown at `max-width:1140px`); this feature reuses those hooks rather than adding new breakpoints |
| III. Centralized Utility-Class Component Library | Header/Footer must be one shared component each, not per-page markup | ✅ PASS — this is the feature's entire purpose, directly satisfying the principle's explicit header/footer finding |
| IV. Design References Are Visual Truth, Not Copy-Paste | `.dc.html`'s `x-dc`/`DCLogic`/`{{ }}`/`sc-for`/`sc-if` scaffolding must be translated, not transcribed | ✅ PASS (planned) — Header/Footer are ordinary React components with `useState`/`usePathname`; no design-tool artifacts are carried over (see research.md). Footer-only update (2026-07-30): `TechGrit Homepage.dc.html`'s footer markup (lines ~907–1015) is now the sole re-derivation source per spec.md, translated to enhance the existing `Footer.tsx`/`footer-config.ts` at the pixel/color/spacing fidelity spec.md's FR-012–FR-018 and SC-007 require — not a rewrite from scratch, and not a literal markup transcription. |
| V. Dark-First Brand System | Must stay on the ink/orange-amber dark system; the homepage nav exception is an allowed, named exception | ✅ PASS — homepage's transparent-over-hero header is the one documented exception this principle already anticipates; footer is normalized to the dark system on every page (no light-theme footer is introduced) |
| Additional Constraints — current application shape | Repo has an empty `components/`/no `lib/` yet — introducing shared components must be "deliberate... and amend this constitution" | ⚠️ ACTION REQUIRED, NOT A VIOLATION — this feature is precisely the deliberate trigger the constitution named. Plan uses the existing root-level `components/` directory, adding `components/layout/` (see Project Structure below). **The constitution's "Additional Constraints" section must be amended after this feature lands** to record that a components folder now exists, its location, and that it holds only the shared layout chrome so far. This is tracked as a follow-up, not a blocking gate — see Complexity Tracking. |
| Development Workflow — no test framework | Spec did not request tests; none should be invented | ✅ PASS — no test tasks will be generated; verification follows spec.md's manual "Independent Test" descriptions |

**Initial gate result: PASS**, with one recorded follow-up (constitution amendment after implementation, not a design blocker).

## Project Structure

### Documentation (this feature)

```text
specs/TMS-63/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md         # Phase 1 output (/speckit.plan command)
├── quickstart.md         # Phase 1 output (/speckit.plan command)
└── tasks.md              # Phase 2 output (/speckit.tasks command)
```

No `contracts/` directory is generated for this feature — see research.md ("No API contracts"):
this is client-rendered layout chrome with no server endpoint or data-fetch contract to define.

### Source Code (repository root)

```text
components/                       # Existing (empty) top-level directory — first real use of it
└── layout/
    ├── Header.tsx                 # Client Component: nav, dropdowns, mobile menu, scroll state
    ├── Footer.tsx                 # EXISTING — enhanced (not recreated): decorative chrome, fixed
    │                              #   36px padding, brand+contact row, 5-group site-map grid,
    │                              #   Follow-us row, wordmark, utility bar, reduced-motion handling
    │                              #   (FR-012–FR-018); no more per-page link variation
    ├── nav-config.ts              # Static primary-nav + Industries/Resources sub-item data
    └── footer-config.ts           # EXISTING — enhanced: fully enumerated, page-invariant footer
                                    #   link content (What We Do / How We Work / Industries /
                                    #   Insights / Company, social links, legal links); the prior
                                    #   route→quick-link-group lookup table is removed since the
                                    #   footer no longer varies by page (spec.md FR-008)

app/
├── layout.tsx                     # MODIFIED — renders <Header /> and <Footer /> around {children}
├── page.tsx                       # UNCHANGED
├── globals.css                    # Header: UNCHANGED (breakpoint/utility hooks already present).
│                                   #   Footer-only update (2026-07-30): additive footer utility
│                                   #   classes/rules for the decorative chrome, fixed 36px padding,
│                                   #   site-map grid, wordmark, and 1080px/640px breakpoints
│                                   #   (FR-012–FR-018) — no existing rule removed or overridden
└── tokens.css                     # Header: UNCHANGED (no new tokens required). Footer-only update
                                    #   (2026-07-30): additive tokens for any FR-012–FR-018 raw
                                    #   value with no existing match (see research.md's token
                                    #   cross-check) — added to their existing numbered section,
                                    #   per Constitution Principle I; no existing token changes
```

Imports resolve via the existing `@/*` → `./*` path alias in `tsconfig.json` (mapped from the repo
root, not `app/`), so `app/layout.tsx` imports these as `@/components/layout/Header` and
`@/components/layout/Footer` — no tsconfig change needed.

**Structure Decision**: Single Next.js project (no frontend/backend split — Option 1 style, but
using this repo's real App Router layout rather than the generic `src/` template). `components/`
already existed at the repo root but was empty; this is the first feature to put real code in it.
Per the Constitution Check above, that change must be reflected back into the constitution's
"Additional Constraints" section once this feature is implemented, rather than left as silent
drift. `Header`/`Footer` are Client Components because each needs interactive state (scroll
position for the homepage variant, mobile-menu open/close, dropdown open/close, current-route
detection for active-nav-item, and — Footer-only — hover/focus lift interactions that must respect
`prefers-reduced-motion: reduce`, FR-014/FR-015) that Server Components cannot provide. (Footer-only
update, 2026-07-30: the footer's link grid is now fully page-invariant, so it no longer needs
route-based content selection — see spec.md FR-008 and research.md.)

## Complexity Tracking

> No unjustified violations. One tracked, sanctioned exception:

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|---------------------------------------|
| Putting real code into `components/` for the first time, where the constitution currently documents "no `components/`... yet" | A single shared Header/Footer, per Principle III, cannot live inside `app/page.tsx` — it must be importable by the root layout and (later) every route | Continuing to leave `components/` empty would force either duplicating header/footer markup per page (exactly what Principle III forbids) or stuffing both components directly into `layout.tsx` as inline JSX (harder to read/maintain, and blocks the mobile-menu/dropdown state from being colocated with its own markup) |

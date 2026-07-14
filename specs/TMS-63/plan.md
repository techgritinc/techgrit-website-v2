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
the hero and solidifies on scroll. The footer is normalized to show the same brand block, social
links, get-in-touch block, and legal row on every page, with only its quick-link group varying by
page context. Both components consume only the existing design tokens/utility classes; no new
visual system is introduced.

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
sub-items); footer has a brand block, social links, one contextual quick-link group, and a legal
row

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Result |
|---|---|---|
| I. Token-Only Styling | Header/Footer must use only `app/tokens.css` custom properties / the `@theme` Tailwind utilities they generate — no hardcoded hex/px | ✅ PASS (planned) — no new colors needed; every color/spacing value used in the reference nav/footer already exists as a token (see constitution v1.1.0 color cross-check) |
| II. Documented Breakpoint Contract | Nav collapse must use the 1140px breakpoint (not an invented one) | ✅ PASS — `app/globals.css` already ships the exact mechanism (`[data-desktop-nav]`, `[data-cta-nav]`, `[data-burger]` hidden/shown at `max-width:1140px`); this feature reuses those hooks rather than adding new breakpoints |
| III. Centralized Utility-Class Component Library | Header/Footer must be one shared component each, not per-page markup | ✅ PASS — this is the feature's entire purpose, directly satisfying the principle's explicit header/footer finding |
| IV. Design References Are Visual Truth, Not Copy-Paste | `.dc.html`'s `x-dc`/`DCLogic`/`{{ }}`/`sc-for`/`sc-if` scaffolding must be translated, not transcribed | ✅ PASS (planned) — Header/Footer are ordinary React components with `useState`/`usePathname`; no design-tool artifacts are carried over (see research.md) |
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
    ├── Footer.tsx                 # Client Component: brand block, socials, quick links, legal row
    ├── nav-config.ts              # Static primary-nav + Industries/Resources sub-item data
    └── footer-config.ts           # Static per-route footer quick-link group data

app/
├── layout.tsx                     # MODIFIED — renders <Header /> and <Footer /> around {children}
├── page.tsx                       # UNCHANGED
├── globals.css                    # UNCHANGED (breakpoint/utility hooks already present)
└── tokens.css                     # UNCHANGED (no new tokens required)
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
detection for active-nav-item and footer quick-link selection) that Server Components cannot
provide.

## Complexity Tracking

> No unjustified violations. One tracked, sanctioned exception:

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|---------------------------------------|
| Putting real code into `components/` for the first time, where the constitution currently documents "no `components/`... yet" | A single shared Header/Footer, per Principle III, cannot live inside `app/page.tsx` — it must be importable by the root layout and (later) every route | Continuing to leave `components/` empty would force either duplicating header/footer markup per page (exactly what Principle III forbids) or stuffing both components directly into `layout.tsx` as inline JSX (harder to read/maintain, and blocks the mobile-menu/dropdown state from being colocated with its own markup) |

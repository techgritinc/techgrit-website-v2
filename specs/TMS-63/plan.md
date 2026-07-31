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

---

## V2 Update — Header Pixel-Perfect Refactor (2026-07-30)

**Branch**: `feature/TMS-63-update-global-header-v2` (same JIRA-key-based naming quirk as above —
paths below are again computed by hand against `specs/TMS-63/`, and
`.specify/scripts/bash/setup-plan.sh`/`check-prerequisites.sh` were not run because they
unconditionally overwrite `IMPL_PLAN` via `cp`, which would have destroyed this file's v1 content;
`update-agent-context.sh claude` was run with `SPECIFY_FEATURE=TMS-63` set, as before).
**Input**: `specs/TMS-63/spec.md`'s "V2 Update — Header Pixel-Perfect Refactor" section (FR-012
through FR-018 — the token audit referenced throughout this plan and research.md is intentionally
plan-level detail, not a spec FR), superseding this plan's Header-related content only. **Footer is
untouched and out of scope** — Footer.tsx/footer-config.ts and every footer-related plan/task above remain valid
and unchanged.

### Summary

Rebuild `Header.tsx`'s desktop and mobile navigation against the `raw-files-v2/` reference set with
pixel-perfect fidelity: replace the current 7-item flat nav (2 simple dot-dropdowns) with the
reference's 5-mega-menu + 2-plain-link taxonomy (What We Do, How We Work, Industries, Insights,
About, Careers, Contact Us), correct the logo to a single 44px height everywhere, correct the
non-home header height from a hardcoded 78px to the token-backed 80px, and unify the CTA hover
treatment across all pages. Two new design tokens are added (`--shadow-mega`,
`--gradient-mega-cta`); every other new value reuses an existing token (see research.md's token
audit). No new dependencies, no backend, no footer changes.

### Technical Context (v2 delta)

**Primary Dependencies**: unchanged (Next.js 16.2.10, React 19.2.4, Tailwind CSS v4 via
`app/tokens.css` → `app/globals.css`) — no new package is introduced for the mega-menu (plain CSS
grid + existing icon-authoring convention, per research.md)
**Testing**: unchanged — no test framework in this repo; verification is manual per
`quickstart.md`'s v2 addendum
**Constraints**: same Constitution principles as v1 (Principle I now additionally gated by the
token audit in research.md), plus the two Clarifications recorded in spec.md (Industries routes to
the existing homepage `/#industries` section, not a new standalone page; Industries icon chips use
the uniform orange styling, not the reference's per-industry colors)
**Scale/Scope**: `Header.tsx` and `nav-config.ts` are rewritten; `Footer.tsx`/`footer-config.ts` are
NOT touched; `tokens.css`/`globals.css` receive two additive new tokens plus new utility-class
entries for the mega-menu grid/item/CTA-row pattern (no existing rule removed or changed in value)

### Constitution Check (v2 re-run)

| Principle | Check | Result |
|---|---|---|
| I. Token-Only Styling | Every new mega-menu/logo/CTA value must resolve to an existing or newly-added named token — no inline hex/rgba | ✅ PASS — full audit in research.md; only 2 net-new tokens (`--shadow-mega`, `--gradient-mega-cta`), both added to `tokens.css`'s existing numbered sections and exposed via `@theme inline` in `globals.css`, per the file's established pattern |
| II. Documented Breakpoint Contract | Desktop↔mobile nav swap must stay at 1140px | ✅ PASS — reference set confirms 1140px on all 12 files; no change to the existing `[data-desktop-nav]`/`[data-burger]` breakpoint hooks |
| III. Centralized Utility-Class Component Library | Still one shared `Header.tsx`; new mega-menu markup does not fork into a per-page component | ✅ PASS |
| IV. Design References Are Visual Truth, Not Copy-Paste | Reference `.dc.html` files' `href="TechGrit *.dc.html"` cross-links, `{{ }}`/`style-hover` bindings, and the dead `.nav-dd`/`.dd-dot` CSS must be translated/discarded, not transcribed | ✅ PASS (planned) — real Next.js routes replace `.dc.html` hrefs; `style-hover` becomes real `:hover`/`hover:` treatment; `.nav-dd`/`.dd-dot` is confirmed dead code in all 12 files and is NOT carried into the rebuild (mega-menu is the only real dropdown pattern) |
| V. Dark-First Brand System | No new visual language introduced | ✅ PASS — mega-menu uses the same ink/orange-amber system; Industries' per-industry color-coding is deliberately NOT adopted (Clarifications), keeping one consistent chip treatment |
| VI. UI Craft via frontend-design Skill | Feature is UI work (Next.js/React tech signal + header/navigation content signal) — `frontend-design` MUST be invoked and its output recorded in a "UI Design Approach" section before Phase 1 | ✅ PASS — invoked; see "UI Design Approach" section immediately below |
| Additional Constraints | N/A — no further constitution amendment needed beyond the one already tracked for `components/` in the v1 section above | ✅ PASS |

**V2 gate result: PASS.** No unjustified violations; the two Clarifications above are recorded
stakeholder decisions, not constitution deviations.

### UI Design Approach (Principle VI)

`frontend-design` was invoked for this feature. Its standard mandate — commit to a bold, original
aesthetic direction — does **not** apply in the usual greenfield sense here: Principle IV already
fixes the aesthetic (the 12 `raw-files-v2` reference files are visual truth; this is a pixel-parity
rebuild, not a new design). Per Principle VI's own boundary clause ("use the skill for *how* to
design, not to override *what* this project has already decided"), the skill's contribution is
scoped to **execution craft** within that fixed reference, not new visual direction:

- **Motion quality**: the reference's mega-menu open/close is CSS-only (opacity/transform,
  `~0.22s ease`) and its chevron flip is `transform .2s ease`. Implement both with the project's
  existing `tg*`-prefixed keyframe convention (Principle III) rather than ad hoc transition
  values, so the mega-menu's motion reads as part of the same system as every other animated
  element on the site, not a bolted-on dropdown library feel.
- **Depth and materiality**: the mega-panel's `rgba(0,0,0,0.97)` background + `16px` blur +
  `rgba(255,255,255,0.12)` border + the new `--shadow-mega` token already give it real depth
  (distinct from a flat native `<select>`-style dropdown) — the craft goal is making sure the
  blur/shadow actually render with enough contrast against whatever page content sits behind the
  header (worth a visual check on the busiest homepage hero background, not just a plain page).
- **Icon-chip micro-interaction**: reference specifies `translateY(-1px)` + background-strengthen
  on a mega-item's `:hover` — small, restrained, consistent across all ~21 items; resist the
  temptation to add extra flourish (scale, rotation, color shift) beyond what the reference
  defines, since "zero visual difference" is this feature's explicit success criterion, not a
  license for new embellishment.
- **Restraint over elaboration**: per the skill's own guidance to match implementation complexity
  to the aesthetic vision — this is a refined, high-precision replication task, not a maximalist
  one. The right craft outcome is exact fidelity executed cleanly, not additional creative flourish
  layered on top of the reference.

No new tokens, fonts, or visual language result from this invocation — it confirms *how* to
implement the reference's existing direction well, per Principle VI's boundary with Principles I–V.

### Project Structure (v2 delta)

```text
components/layout/
├── Header.tsx        # REWRITTEN — mega-menu render path (desktop + mobile), 44px logo, 80px nav
├── nav-config.ts      # REWRITTEN — 5 mega-groups (per-item title/desc/href + an icon *component
                        # reference* from components/ui/icons.tsx, not an inline SVG) + 2 plain links
├── Footer.tsx         # UNCHANGED — out of scope
└── footer-config.ts   # UNCHANGED — out of scope

components/ui/
└── icons.tsx          # ADDITIVE — ~21 new mega-item icon components added here (Constitution
                        # Additional Constraints: "the single consolidated SVG icon file for the
                        # whole app... never a per-route copy"), each re-authored per Principle IV,
                        # not copied from the `.dc.html` files; nav-config.ts imports and references
                        # them, it does not define them inline

app/
├── tokens.css         # ADDITIVE — `--shadow-mega`, `--gradient-mega-cta` (2 new tokens only)
└── globals.css        # ADDITIVE — `@theme inline` mappings for the 2 new tokens, plus new
                        # mega-menu/mega-item/icon-chip/CTA-row utility classes built from
                        # existing + the 2 new tokens (no existing rule's value changes)
```

**Structure Decision**: unchanged from v1 — same Client Component, same file locations, plus
additive exports to the existing `components/ui/icons.tsx` (~21 new icon components — no new icon
file is created, per Additional Constraints' one-consolidated-file rule). The only other structural
addition is the two new tokens and their utility-class consumers; no new directories, no new
dependencies.

### Complexity Tracking (v2 addendum)

> No unjustified violations.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|---------------------------------------|
| Deliberately not reproducing the reference's per-industry icon-chip colors (teal/blue/amber/purple) | Explicit stakeholder decision (Clarifications, spec.md) to keep one uniform mega-menu visual language rather than a fifth per-item color scheme with no corresponding content split in the current site (Industries isn't a standalone page yet) | Reproducing the reference exactly would satisfy pixel-parity in isolation but would color-code a distinction (per-industry pages) that doesn't exist in this codebase, misleading users into expecting four distinct destinations |

---

### UI Findings Addendum — Header Interaction & Styling Corrections (Plan, 2026-07-31)

**Input**: `specs/TMS-63/spec.md`'s "UI Findings — Header Interaction & Styling Corrections" subsection
(FR-019, FR-019a, FR-020, FR-021, FR-022) plus the Session 2026-07-31 Clarification. Still
**header only** — no footer file is touched.

**Summary**: Four targeted corrections to the already-shipped V2 mega-menu, not a re-architecture:
(1) mega-menu triggers become real `<Link>`s that navigate to the group's own page on mouse click,
while opening on hover (not click) for pointer input — reversing FR-014's click-only decision for
mouse specifically; (2) the mega-menu panel becomes always-mounted with a two-state CSS transition
instead of conditionally mounted, which is the actual fix for the reported "panel appears in the
wrong place" symptom; (3) the CTA row's label/arrow color split is corrected (white label, amber
arrow — currently both amber); (4) the header CTA's per-page relabeling
(`isContact`/`isCareers`/`isWebinar` branches in `Header.tsx`) is removed so "Talk to Us" → `/contact`
renders identically everywhere, with only the Contact page's own `#form` in-page target as the one
reference-confirmed exception.

**Technical approach — hover mechanism**: Rather than introducing a second, parallel show/hide
mechanism (Tailwind `group`/`group-hover:` CSS alongside the existing `openDropdown` React state),
hover is wired through the *same* `openDropdown` state that click/keyboard already use, via
`onMouseEnter`/`onMouseLeave` on each trigger's wrapping `relative` div. Because the mega-panel is
FR-020's always-mounted descendant of that same wrapper, the browser's native mouseenter/mouseleave
semantics (which consider descendants part of the same hoverable region) already bridge the 14px gap
between trigger and panel with no separate `::after` hover-bridge element needed in the React
implementation — one state, one code path, for click, hover, and keyboard alike.

**Technical approach — click-vs-tap distinction (FR-019/FR-019a)**: A trigger click that should
navigate (mouse) vs. one that should open the panel first (touch, no hover preview available) is
distinguished via the originating event's `pointerType` (`"mouse"` vs. `"touch"`/`"pen"`) captured in
the `onClick` handler from the paired native `PointerEvent`, not via viewport-width/breakpoint
guessing — this correctly handles hybrid devices (touch laptops) rather than conflating "mobile
breakpoint" with "no hover capability."

**Constitution re-check**: No principle is newly implicated beyond the V2 re-run above — this
addendum changes interaction wiring and two color values, introduces no new tokens, no new
dependency, and touches only `Header.tsx` and `nav-config.ts` (adding one `href` field per group).
Principle III (component library) and Principle IV (translate, don't copy) both still hold: the
trigger becomes a `next/link` `<Link>`, consistent with every other navigational element in this
codebase.

**Project Structure (addendum delta)**:

```text
components/layout/
├── Header.tsx        # MODIFIED — trigger button→Link, hover-open wiring, always-mounted panel
                        # + transition classes, CTA-row label/arrow color split, CTA relabeling removed
└── nav-config.ts      # MODIFIED — MegaGroup gains a top-level `href` (the trigger's own destination)
```

No new files, no new tokens, no `Footer.tsx`/`footer-config.ts` changes.

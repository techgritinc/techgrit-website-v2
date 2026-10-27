# Implementation Plan: Homepage Content Sections

**Branch**: `TMS-62` | **Date**: 2026-07-14 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-62/spec.md`, refined via a brainstorming design
session recorded at `docs/superpowers/specs/2026-07-14-homepage-composition-design.md`

**Note**: This plan was generated manually because the repository's git branch
(`feature/TMS-62-build-a-dynamic-homepage`) does not match the numeric `###-feature-name` pattern
`.specify/scripts/bash/setup-plan.sh` expects (the same situation documented in `specs/TMS-63/plan.md`).
Per that same precedent, the shared script/tooling was left unmodified and the branch was not
renamed; paths below were computed by hand to point at `specs/TMS-62/`, matching how the feature
directory was deliberately named to track JIRA ticket TMS-62. `update-agent-context.sh` was run
with `SPECIFY_FEATURE=TMS-62` set, which it already supports natively (no script edit needed).

**This plan supersedes an earlier draft** that used `app/_sections/`, `.btn`/`.badge` `globals.css`
classes, `components/layout/icons.tsx`, and gradient-block image placeholders. Those decisions were
revisited in a dedicated brainstorming session (see the design doc above) and are replaced below.

## Summary

Replace the placeholder `app/page.tsx` (currently a style-guide test page) with the real homepage
at root `/`, built from ten content sections translated from `TechGrit Homepage.dc.html`: Hero,
Subscribe band, Platform ("Meet OrbitAI"), 6-Week Methodology (scroll-pinned phase stepper),
Re-Imagine (differentiators + comparison), Industries, Testimonials (carousel + video lightbox),
Case Studies & Insights, Life at TechGrit gallery, and the Final CTA band. The shared Header/Footer
from TMS-63 are reused unmodified. Per the feature request, every button/link-styled-as-button,
every badge/status pill, and the subscribe form's fields are built as new shared, reusable,
Tailwind-first components in `components/ui/` (not wrappers over `globals.css`'s `.btn`/`.badge`
classes), and every SVG icon used across these sections is added to one consolidated icon file,
relocated to `components/ui/icons.tsx`. The ten homepage sections themselves live in a new
`components/home/` directory, establishing the convention future pages (Industries/Construction,
Resources, Blog, About, Contact) should follow: a thin `app/<route>/page.tsx` plus a sibling
`components/<route>/` folder — though building those other routes is explicitly out of scope here.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (via
`@tailwindcss/postcss`). Per this feature's design decision, new components style themselves with
Tailwind utility classes directly (referencing `tokens.css` custom properties via arbitrary-value
syntax for colors/shadows), rather than consuming `globals.css`'s `.btn`/`.badge`/`.card` classes —
`tokens.css`/`globals.css` remain the source of truth for token *values* (colors, shadows, fonts,
spacing scale), not for component-level classes, for this feature's new work.
**Storage**: N/A — all homepage content (stats, phases, testimonials, case studies, industries,
gallery images) is static, in-repo configuration data, not persisted/fetched data; the subscribe
form holds only transient in-memory submission state (per Clarifications, no backend call)
**Testing**: No test framework is configured in this repository (confirmed gap, carried over
unchanged from TMS-63); verification is manual (dev server + the existing `npm run lint` / `npm run
build` pre-commit gate), per spec.md's independent-test descriptions for each user story
**Target Platform**: Web browser, server-rendered/hydrated via Next.js App Router
**Project Type**: Single Next.js web application (no separate frontend/backend split exists or is
introduced by this feature)
**Performance Goals**: No new numeric performance target beyond not regressing existing page-load
behavior; per Clarifications, analytics/conversion instrumentation is explicitly out of scope, and
decorative motion (FR-020) must never gate access to content, including when reduced-motion is set
**Constraints**: Must comply with the project constitution (`.specify/memory/constitution.md`) —
the 1140/960/560 breakpoint contract (Principle II) and translating (not copying) the `.dc.html`
reference's `x-dc`/`DCLogic`/`{{ }}`/`sc-for`/`sc-if` scaffolding into real React state (Principle
IV) apply unchanged. Principle III (centralized `.btn`/`.badge`/`.card` utility classes) is
deliberately **not** followed for this feature's new components — see Constitution Check below for
the explicit, recorded rationale and the required follow-up amendment. Principle V (dark-first brand
system) applies unchanged — this homepage is the dark (v2) reference, not the v1-light variant.
**Scale/Scope**: Ten homepage sections, three new shared UI primitives (Button, Badge, FormField)
plus a relocated/extended icon file, and one new static content-data module; consumed by exactly one
route (`/`) today. This plan also fixes the folder convention (`app/<route>/` +
`components/<route>/`) future route features should reuse, without building those routes now.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Result |
|---|---|---|
| I. Token-Only Styling | All new section/component styling must resolve colors/spacing/shadows/fonts through `app/tokens.css` custom properties — no hardcoded hex/px literals that duplicate an existing token | ✅ PASS (planned) — Tailwind utility classes in each component reference token custom properties via arbitrary-value syntax (e.g. `shadow-[var(--shadow-btn-primary)]`); no new raw hex/px values are introduced |
| II. Documented Breakpoint Contract | Section grids must collapse at 1140/960/560, not invented breakpoints | ✅ PASS — reused via Tailwind `sm:`/`md:`/`lg:` mapped to the same thresholds |
| III. Centralized Utility-Class Component Library | Reuse `.btn`/`.badge`/`.card`/`.field` etc. rather than a parallel styling system | ⚠️ **DELIBERATE DEVIATION, NOT AN OVERSIGHT** — per explicit stakeholder direction, this feature's new `components/ui/Button.tsx`/`Badge.tsx`/`FormField.tsx` style themselves with Tailwind utility classes written per-component, not by applying the existing `.btn`/`.badge`/`.field` classes. `tokens.css`/`globals.css` remain the source of token *values*; they are no longer the source of component-level *classes* for new work. This is recorded here rather than silently diverging from a ratified principle — **the constitution must be amended** (Principle III's text and/or Additional Constraints) to reflect this as the go-forward approach, or to explicitly scope Principle III to pre-existing usages only. See Complexity Tracking. |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | `.dc.html`'s `x-dc`/`DCLogic`/`{{ }}`/`sc-for`/`sc-if`, and its scroll-pinning `componentDidMount` logic, must be translated, not transcribed | ✅ PASS (planned) — see research.md for the specific translation of the scroll-pinned methodology stepper, the testimonial drag-carousel, and the subscribe-form/video-lightbox state, all as ordinary `useState`/`useEffect`/`useRef` React, never a `DCLogic` subclass |
| V. Dark-First Brand System | Must stay on the ink/orange-amber dark system; no light-surface tokens introduced | ✅ PASS — `TechGrit Homepage.dc.html` (the v2, dark-theme file) is the only source used |
| Additional Constraints — current application shape | Repo has `components/layout/` (Header/Footer) only; this feature adds `components/ui/` and `components/home/`, and relocates `icons.tsx` | ⚠️ ACTION REQUIRED, NOT A VIOLATION — `components/ui/` holds genuinely generic, reusable primitives (Button/Badge/FormField/icons); `components/home/` holds this route's own sections, deliberately placed under `components/` (not `app/`) per explicit stakeholder direction, establishing the `components/<route>/` convention future pages should follow. **The constitution's "Additional Constraints" section must be amended after this feature lands** to record `components/ui/`, `components/home/`, the relocation of `icons.tsx`, and the `components/<route>/`-per-page convention. Tracked as a follow-up, not a blocking gate — see Complexity Tracking. |
| Development Workflow — no test framework | Spec did not request tests; none should be invented | ✅ PASS — no test tasks will be generated; verification follows spec.md's manual "Independent Test" descriptions per user story |

**Initial gate result: PASS**, with one recorded deviation (Principle III, explicit and
documented) and one recorded follow-up (constitution amendment after implementation, same pattern
TMS-63 used for its own `components/` introduction).

## Project Structure

### Documentation (this feature)

```text
specs/TMS-62/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command)

docs/superpowers/specs/
└── 2026-07-14-homepage-composition-design.md   # Brainstorming design session this plan implements
```

No `contracts/` directory is generated — every section renders static, in-repo content with no
server endpoint or data-fetch contract, identical to TMS-63's reasoning.

### Source Code (repository root)

```text
components/
├── layout/                        # Existing (TMS-63) — UNCHANGED except icons.tsx removed (moved)
│   ├── Header.tsx                  # MODIFIED — import path for icons updated
│   ├── Footer.tsx                  # MODIFIED — import path for icons updated
│   ├── nav-config.ts               # UNCHANGED
│   └── footer-config.ts            # UNCHANGED
├── ui/                             # NEW — first use of this directory
│   ├── Button.tsx                  # Reusable CTA/link-button component (FR-013), Tailwind-first
│   ├── Badge.tsx                   # Reusable status/label pill component (FR-014), Tailwind-first
│   ├── FormField.tsx               # Reusable labeled input/error-state component (FR-015)
│   └── icons.tsx                   # RELOCATED from components/layout/icons.tsx, then EXTENDED
│                                    #   with every new homepage icon (one consolidated file, FR-016)
└── home/                           # NEW — sibling of layout/, homepage-only, establishes the
    │                                #   components/<route>/ convention for future pages
    ├── home-data.ts                # Static content: delivery stats, client logos, platform
    │                                #   capabilities, methodology phases, differentiators,
    │                                #   comparison metrics, industries, testimonials, case studies,
    │                                #   gallery images
    ├── Hero.tsx
    ├── SubscribeBand.tsx
    ├── PlatformSection.tsx
    ├── MethodologySection.tsx      # Client Component — scroll-pinned active-phase state
    ├── ReImagineSection.tsx
    ├── IndustriesSection.tsx
    ├── TestimonialsSection.tsx     # Client Component — drag-scroll carousel + video lightbox state
    ├── CaseStudiesSection.tsx
    ├── LifeGallery.tsx
    └── FinalCta.tsx

app/
├── layout.tsx                      # UNCHANGED (already renders <Header/>/<Footer/> from TMS-63)
├── globals.css                     # UNCHANGED — no new .btn/.badge/.card classes added
├── tokens.css                      # UNCHANGED (no new tokens required)
└── page.tsx                        # MODIFIED — Server Component; replaces the current style-guide
                                     #   content with the ten sections, rendered as an explicit,
                                     #   ordered JSX list inside <main>, at root "/"
```

Imports resolve via the existing `@/*` → `./*` path alias (e.g. `@/components/ui/Button`,
`@/components/ui/icons`, `@/components/home/home-data`).

**Structure Decision**: Single Next.js project, no frontend/backend split (same as TMS-63). Per
explicit stakeholder direction (recorded in the design doc), homepage sections live under
`components/home/` rather than a route-local `app/_sections/` folder — this establishes a
site-wide convention: every future route gets a thin `app/<route>/page.tsx` plus a sibling
`components/<route>/` folder holding that page's own sections and data, rather than route groups
or a shared `components/pages/` umbrella (both considered and rejected — see the design doc §3).
`components/ui/` holds the three new generic primitives plus the relocated icon file — genuinely
reusable across any future page, not homepage-specific. `MethodologySection` and
`TestimonialsSection` are Client Components (need `useState`/`useEffect`/`useRef` for scroll-driven
phase state, drag-to-scroll, and lightbox open/close); the remaining eight sections are static/
presentational Server Components, as is `app/page.tsx` itself.

### Real assets confirmed in `public/` (no placeholders needed for these)

- `public/logos/*` — all 6 client logos (Evolve, Sunny Day Fund, BlueCross BlueShield, AquA
  Finance, CommsAI, Turnqey)
- `public/assets/hero/wave.mp4` — hero background video
- `public/samples/ind-{fintech,healthcare,construction}.png` — industry imagery
- `public/assets/team/{glasses,rooftop,painting,diwali}.png` — culture gallery imagery

Every image-bearing entity's image field is nonetheless optional in its type; when absent, the
consuming component renders **"Coming soon"** text in that image's slot (not a gradient placeholder
block, superseding the earlier plan draft) — a general resilience rule, not currently triggered by
any of the assets above, all of which exist.

## Complexity Tracking

> One unjustified-by-default violation, explicitly justified below; two tracked, sanctioned
> additions (same posture as TMS-63):

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|---------------------------------------|
| Not using `globals.css`'s `.btn`/`.badge`/`.field` classes for the new `components/ui/` primitives (deviates from Principle III as currently written) | Explicit stakeholder direction: these utility classes are considered not the right foundation for new component work going forward; Tailwind utility classes written per-component, with `tokens.css` values only, is the desired approach | Continuing to wrap the existing classes would satisfy Principle III's letter but contradict the stakeholder's explicit, current instruction — this plan follows the explicit instruction and flags the principle for amendment rather than silently ignoring the instruction or silently ignoring the constitution |
| Introducing `components/ui/` (first real use) | FR-013–FR-016 require shared, reusable button/badge/form/icon components rather than per-section markup; these are generic primitives, not homepage-specific | Putting Button/Badge/FormField/icons inside `components/home/` would contradict their own reusable-primitive purpose and make future consumers (other pages, or Header/Footer eventually adopting them) harder to discover |
| Introducing `components/home/` for ten sections, and by extension the `components/<route>/`-per-page convention | Ten sections are too much to inline in `app/page.tsx`; placing them under `components/` (rather than `app/_sections/`) is explicit stakeholder direction, intended to generalize cleanly as more routes are built | An `app/_sections/` route-local placement (the original plan) was rejected by the stakeholder in favor of a structure that scales the same way to every future page from day one |

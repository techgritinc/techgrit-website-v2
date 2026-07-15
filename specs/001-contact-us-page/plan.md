# Implementation Plan: Contact Us Page

**Branch**: `001-contact-us-page` | **Date**: 2026-07-13 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-contact-us-page/spec.md`

## Summary

Build the Contact Us page **content only** (hero introduction + contact channels + inquiry
form + "what happens next" steps), sourced from `raw-files/TechGrit Contact.dc.html`. Header/nav
and footer are explicitly out of scope (owned by a separate, reusable header/footer effort).
The page is a client-interactive form (topic selection, field validation, success/reset state)
built entirely with the existing token/utility-class system in `app/tokens.css` /
`app/globals.css` — no new design primitives, no backend/API, no persistence. Per Constitution
Principle IV, the `.dc.html` file is translated (React state, real classNames, token values),
never copied verbatim (no `x-dc`, `DCLogic`, `{{ }}`, or `sc-for`).

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4
(`@tailwindcss/postcss`, CSS-first `@theme`), existing `app/tokens.css` design-token system
**Storage**: N/A — form submission in this feature is a client-side visual state transition only
(matches the reference file's `DCLogic` behavior of setting `sent:true` with no network call);
wiring a real message-delivery backend is a separate concern, not part of this page-content
feature (see Assumptions & Dependencies in spec.md)
**Testing**: N/A — no test framework is configured anywhere in this repository (documented gap
in the constitution's Development Workflow section); verification is manual (dev server +
`npm run lint` / `npm run build`, the existing Husky pre-commit gate)
**Target Platform**: Web browsers, responsive across desktop/tablet/mobile
**Project Type**: Single Next.js App Router project rooted at `app/` (no `backend/`/`frontend`
split — this repo has no backend)
**Performance Goals**: Standard marketing-page responsiveness; no numeric perf target beyond the
UX-level Success Criteria already in spec.md (SC-001/SC-002)
**Constraints**:
- No header/navigation or footer markup — page content must be self-contained and composable
  into a future shared layout (FR-012)
- MUST reuse existing tokens/utility classes (`.card`, `.field`, `.btn`/`.btn-primary`/
  `.btn-ghost`, `.eyebrow`, `.text-gradient`) rather than introducing new ad-hoc styles
  (Constitution Principle I & III)
- MUST reuse the documented breakpoint contract — lg=1140px / md=960px / sm=560px — via
  Tailwind `sm:`/`md:`/`lg:` prefixes (Constitution Principle II)
- MUST NOT introduce a `components/`/`lib/` top-level directory; new code stays inside the
  existing `app/(marketing)/contact/` route folder (Constitution Additional Constraints)
**Scale/Scope**: One route's content (`/contact`), two visual sections (hero+form,
"what happens next"), one interactive client component, one static server component

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|---|---|---|
| I. Token-Only Styling | PASS | All colors/spacing/radius/shadow values sourced from `var(--token)`; no new hex/px literals that duplicate an existing token. |
| II. Documented Breakpoint Contract | PASS (with 1 addition) | `app/globals.css`'s `@theme inline` block does not yet map Tailwind's `sm:`/`md:`/`lg:` prefixes to the documented 560/960/1140 contract. This plan adds that mapping once, in the shared theme block (not a per-component override) — see research.md Decision 1. |
| III. Centralized Utility-Class Component Library | PASS | Reuses `.card`, `.field`, `.btn*`, `.eyebrow`, `.text-gradient`; no header/footer markup is introduced (out of scope). |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | PASS | `TechGrit Contact.dc.html` is translated to React (`useState`, real event handlers) and token/utility classes; no `x-dc`, `DCLogic`, `{{ }}`, or `sc-for` artifacts carried over. |
| V. Dark-First Brand System | PASS | Inherits the dark ink background from `app/layout.tsx`/`globals.css`; orange/amber gradient used only for the CTA button and text accent, never as a full-surface fill. |
| Additional Constraints (no speculative `components/`/`lib/`) | PASS | New files live inside the existing `app/(marketing)/contact/_components/` folder only. |

No violations requiring Complexity Tracking justification.

## Project Structure

### Documentation (this feature)

```text
specs/001-contact-us-page/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md        # Phase 1 output
└── tasks.md             # Phase 2 output (/speckit.tasks)
```

(No `contracts/` directory: this feature has no API endpoints — see research.md Decision 2.)

### Source Code (repository root)

```text
app/
├── globals.css                                  # AMEND: add --breakpoint-sm/md/lg to @theme inline
├── (marketing)/
│   └── contact/
│       ├── page.tsx                             # NEW — server component, route entry + metadata
│       └── _components/
│           ├── contact-hero-form.tsx            # NEW — 'use client', hero intro + info + form + success state
│           └── next-steps.tsx                   # NEW — server component, static 3-step section
```

**Structure Decision**: Single-project Next.js App Router layout (no backend exists in this
repo). All new code lives inside the already-scaffolded `app/(marketing)/contact/` route
folder, using the `_components` private folder for page-local pieces, per the constitution's
Additional Constraints (no new top-level `components/`/`lib/` directory). The only file touched
outside that folder is `app/globals.css`, to add the missing breakpoint-token mapping the
constitution's Principle II already mandates reusing.

## Complexity Tracking

*No entries — no Constitution Check violations.*

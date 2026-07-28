# Implementation Plan: Webinar Series Page

**Branch**: `TMS-73` | **Date**: 2026-07-27 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-73/spec.md`

**Note**: This plan was generated manually, following the same precedent as `specs/TMS-69/plan.md`,
`specs/TMS-66/plan.md`, and `specs/001-about-us-page/plan.md`. The repository's actual branch
(`feature/TMS-73-develop-webinar-series-page`) does not match the numeric `###-feature-name` pattern
`.specify/scripts/bash/setup-plan.sh`/`check-prerequisites.sh` enforce (confirmed: running
`setup-plan.sh` fails with `ERROR: Not on a feature branch. Current branch:
feature/TMS-73-develop-webinar-series-page`), so this file was created by hand instead, mirroring
the already-established `TMS-<n>` convention; per this repo's existing precedent the shared scripts
themselves were left unmodified. Paths below point at `specs/TMS-73/`, matching this feature's
directory name and its Jira ticket.

## Summary

Build the Webinar Series page (`/webinar`) as three content sections (two-column hero with a 9-cell
photo/decorative collage, a "Sessions" grid with one upcoming panel plus released-session cards, and
a Subscribe panel) composed on one route, reading their copy from a typed local content module
mirroring `app/blog/_data/`/`app/services/_data/`, styled entirely with the existing design-token/
utility-class system. A full color/size/typography audit (research.md §1) found most of the
reference's values already covered exactly (or near-exactly, documented as deliberate reuse) by
existing tokens, and exactly 21 genuinely missing values, added as new tokens to `tokens.css` and
mapped in `globals.css`'s `@theme inline` block (except two heading-only clamp() tokens, unmapped per
the documented heading exception — see research.md §1c). The page reuses the shared `Header`/
`Footer` (`components/layout/`) as-is, and extends two existing `components/ui/` primitives rather
than forking duplicates: `Badge` gains one new tone (`"orangeOutline"`, research.md §2) for the hero
eyebrow pill, and `GlassCard` gains two new variants (`"webinarUpcoming"`, `"webinarReleased"`,
research.md §3) for the Sessions-grid cards; the Subscribe panel reuses the existing `"blogFeatured"`
variant as-is. "Register Now" and "Watch Now" are both real `<button>` elements per spec.md
FR-006/FR-007/FR-016 (a user-directed clarification correcting the reference's own
anchor-styled-as-button markup for "Register Now"). One new icon (`ClockIcon`) is added to the single
consolidated `components/ui/icons.tsx`; the existing `PlayIcon` is reused (not duplicated) for both
the "Watch Now" glyph and the collage's decorative play-triangle tile. Per an explicit follow-up
directive, the route's component surface is consolidated to exactly 3 top-level section components
— `hero-section.tsx` (hero copy + the 9-cell collage + its own inline subscribe form),
`sessions-section.tsx` (the upcoming panel + every released card), and `subscribe-panel.tsx` (its
own inline subscribe form) — each still built from the shared `Badge`/`GlassCard`/`FormField`/
`Button` primitives, rather than one file per sub-piece (research.md §8). Both subscribe form
instances are client-side-only state transitions per spec.md FR-015 — no backend/CRM call, matching
the Contact page, the Blog subscribe panel, and the homepage's `SubscribeBand`.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (CSS-first
`@theme`, no `tailwind.config.ts`), `next/font` (already wired in `app/layout.tsx`)
**Storage**: N/A — content is a typed, in-repo static module (`app/webinar/_data/webinar-content.ts`),
following the same shape convention as `app/blog/_data/blog-content.ts`/`app/services/_data/`; no
database, no CMS (see spec.md Assumptions, FR-008).
**Testing**: No automated test framework is configured in this repo (confirmed gap, not a standard
to introduce here, per constitution Development Workflow); verification is manual (`npm run dev` +
responsive check at mobile/tablet/desktop widths) plus the existing `npm run lint` / `npm run build`
Husky pre-commit gate, per quickstart.md's per-story walkthrough.
**Target Platform**: Web — Next.js App Router page (`/webinar`), server-rendered where possible,
client components only where interactivity requires it (both subscribe forms), responsive across
mobile/tablet/desktop browsers.
**Project Type**: Single web application (existing `app/` tree — no frontend/backend split).
**Performance Goals**: Standard marketing/content-page expectations — no additional numeric target
beyond spec's SC-001 (purpose + upcoming session date/time readable within the first two screens)
and avoiding layout shift (the 6 collage photo tiles are existing static assets already in
`public/assets/team/`, so no new image-loading risk beyond what `next/image` already handles
elsewhere in this codebase).
**Constraints**: Must comply with constitution Principles I–VI — token-only styling (I), including
adding the 21 genuinely-missing tokens identified by research.md §1c to `tokens.css` and mapping
them (except the two heading-only clamp() tokens) in `globals.css` rather than hardcoding them; the
1140/960/560 breakpoint contract (II) — note the reference's own hero/collage/Sessions-grid
breakpoints (960px/560px) already coincide exactly with the canonical `md`/`sm` values, so no
mapping adjustment is needed there (unlike TMS-69's Blog page, whose reference used 980px/640px);
reuse of the `GlassCard`/`Badge` components (extended in backward-compatible ways per research.md
§2/§3 rather than duplicated) and the shared `Header`/`Footer` rather than new one-off markup (III);
treating `TechGrit Webinar.dc.html` as visual/content reference only — never copying its `x-dc`/
`DCLogic`/`{{ }}` scaffolding, and explicitly diverging from its own anchor-tag-styled-as-button
markup for "Register Now" per spec.md FR-006/FR-016 (IV); the dark-first brand system with the
orange→amber gradient reserved for CTAs/active states (V); and invoking the `frontend-design` skill
for this page's UI Design Approach (VI, see below). Header/Footer reuse is additionally mandated
directly by spec.md FR-012.
**Scale/Scope**: One static content page, 3 sections (hero with 9-cell collage, Sessions grid with 1
upcoming + 3 released sessions, Subscribe panel), static/local content source, no auth, no
pagination, two independent client-side forms (one per section, each implemented inline).

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. Token-Only Styling | Every one of the reference's color/size/typography values was checked against `tokens.css` (research.md §1). Most already match an existing token exactly or near-exactly (documented judgment calls for 3 negligible deviations, research.md §1b); 21 genuinely missing values will be added as new tokens in their existing numbered `tokens.css` sections and mapped in `globals.css`'s `@theme inline` block, except 3 intentionally unmapped: `--text-webinar-hero`/`--text-webinar-h2` (heading-only, mirroring `--text-blog-hero`) and `--gradient-webinar-upcoming` (no `--gradient-*` token is ever mapped in this codebase). No value is hardcoded outside `tokens.css`. | PASS (with tracked token additions — see Complexity Tracking) |
| II. Documented Breakpoint Contract | Reuses the mandated `lg`/`md`/`sm` (1140/960/560) breakpoints via this codebase's established `tg-md:`/`tg-sm:`/`max-tg-sm:` prefixed variants — **not** native Tailwind `lg:`/`md:`/`sm:`, which are confirmed (across 15+ existing components, and by a real bug caught and fixed during this feature's own Phase 3 implementation) to never be used for structural breakpoints anywhere in this repo. Unlike Blog's reference, this reference's own 960px/560px breakpoints already coincide exactly with the canonical `md`/`sm` *values* — no value mapping needed, just direct reuse of those values through the `tg-` prefix convention. | PASS |
| III. Centralized Non-Duplicated Component Library | Extends `components/ui/Badge.tsx` with one new tone (`"orangeOutline"`, research.md §2) and `components/ui/GlassCard.tsx` with two new variants (`"webinarUpcoming"`, `"webinarReleased"`, research.md §3) instead of forking bespoke markup — both additive, no existing tone/variant changed. Reuses the existing `"blogFeatured"` variant as-is for the Subscribe panel. Reuses `FormField`/`Button` for both subscribe forms. One net-new shared asset: `ClockIcon` added to the existing single consolidated `components/ui/icons.tsx` (no matching icon exists yet); the existing `PlayIcon` is reused, not duplicated, for two different tiles/buttons. | PASS (with tracked component extensions — see Complexity Tracking) |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | `TechGrit Webinar.dc.html` is used only to identify sections/copy/layout/data intent; its `x-dc`/`<helmet>`/`DCLogic`/`{{ }}` scaffolding is not carried into the React components. Its own anchor-styled-as-button markup for "Register Now" is deliberately NOT copied verbatim, per the user's explicit FR-006/FR-016 clarification. Nav/footer markup present in the reference is not rebuilt (out of scope per Assumptions/FR-012). | PASS |
| V. Dark-First Brand System | Page uses the existing dark ink surface, orange→amber gradient reserved for the hero H1 accent and CTA buttons only, Manrope/Space Grotesk via the already-configured `next/font` setup. No new typography family or theme is introduced. | PASS |
| VI. UI Craft via `frontend-design` Skill | This is UI work (tech signal: Next.js/React; content signal: spec.md repeatedly uses "page", "hero", "section", "form", "button", "card"). The skill was invoked during this plan phase — see "UI Design Approach" below. | PASS |
| Additional Constraints (single `app/`-rooted project) | New route-local code lives under `app/webinar/` (`page.tsx`, `_components/`, `_data/`), following the `app/blog/`/`app/services/` precedent; no new top-level `components/`/`lib/` directory. Route path `/webinar` matches the pre-existing `nav-config.ts` entry and the constitution's own documented page-map. | PASS |

**Initial gate result: PASS.** Two tracked, justified extensions (new tokens, extended shared
components) are documented in Complexity Tracking below — neither is a violation of the
constitution; both are the constitution's own preferred remediation (add the missing token / extend
the existing component in a backward-compatible way) for a real gap found by the audit.

## UI Design Approach

*Required for UI features per Constitution Principle VI.*

**UI mode detection**: UI mode ON — tech signal matched (Next.js 16 / React 19, this repo's
default) AND content signal matched (spec.md repeatedly uses "page", "hero", "section", "form",
"button", "card").

**`frontend-design` skill invocation**: Invoked during this plan phase. Asked specifically: (a) how
to make the hero's 9-cell collage (6 photos + 3 decorative non-photo tiles) feel like a deliberate
pattern rather than filler/gaps; (b) how to differentiate the upcoming-session panel from released
cards through motion/depth without introducing new color language; (c) hover/motion polish for the
mixed half/half/full-width released-session cards. The skill returned its generic base guidance
(commit to a bold aesthetic direction, avoid generic "AI slop" patterns, typography/color/motion/
spatial-composition principles) — this repo is not a greenfield brand, so that guidance was
reconciled against the already-established design system rather than applied as fresh art direction,
following the same reconciliation TMS-69's plan already performed.

The skill's guidance, reconciled with this repo's existing tokens/components:

1. **The collage's 3 decorative tiles are a deliberate rhythm, not a fallback for missing photos.**
   The reference places them at fixed positions 1, 5, 9 of the 3×3 grid — a diagonal from
   top-left to bottom-right. That diagonal placement is preserved exactly (`data-model.md`'s
   `HeroCollageTile.position`), rather than letting a future content edit scatter them arbitrarily,
   because the diagonal is what reads as "intentional accent" instead of "we ran out of photos."
   Each decorative tile keeps its own distinct color language (orange spin-ring, amber
   play-triangle, blue-light pulse-dot — research.md §1c) rather than converging on one repeated
   treatment, so the collage reads as three small, different moments rather than one pattern
   stamped three times.
2. **Upcoming vs. released — depth and motion, not new color.** The upcoming panel already gets a
   structurally different treatment (full-width, its own gradient wash and glow blob, a "live"
   pulsing status dot) that released cards don't have — the skill's guidance here is to lean on that
   existing structural asymmetry rather than adding a second gradient or accent color: the glow blob
   (`--blur-glow-100`, research.md §1c) gives it a subtle ambient depth released cards don't have,
   and the "live" dot reuses the existing `.status-live`/`tgblink` blink animation already defined in
   `globals.css` (no new keyframe) so the "this one is different" signal is motion-based, not
   color-based. Released cards get the sitewide-standard `GlassCard` hover treatment (translateY
   lift + border brighten via `hoverBorderColor`, research.md §4) — no bespoke hover CSS.
3. **Mixed half/half/full-width cards — the full-width card's internal layout gets to breathe more,
   not just stretch.** The wide released card (LangChain session in the reference) uses a
   side-by-side thumbnail-plus-text layout rather than the half-width cards' stacked
   thumbnail-above-text layout — this is preserved exactly (not flattened into the same internal
   layout at 2x width) since that's what makes the full-width card feel like a different rhythm
   beat in the grid, not just a wider version of the same card.
4. **Craft polish**: the hero's badge/H1/lead/form reuse the exact staggered-entrance convention
   already established by `app/_home-components/Hero.tsx` and `construction-hero.tsx` — the existing
   `[data-rise]` utility class (`tgrise` keyframe) plus successive `animationDelay` values, matching
   the reference's own `.05s/.12s/.2s/.28s` `data-rise` delays, rather than introducing a new stagger
   mechanism. The collage's own entrance uses the same `[data-rise]` treatment as one block (matching
   the reference's `data-rise` on the whole collage container, not per-tile), consistent with SC-006
   / Edge Cases (all content stays fully visible if the reveal animation doesn't run).

**Reconciliation with Principles I–V**: No generic suggestion from the skill needed to be
overridden — every recommendation above resolves to tokens, components, and existing motion
primitives (Principle I/III), uses the mandated breakpoint contract (Principle II), treats the
`.dc.html` file as reference only (Principle IV), and stays within the dark-first brand system with
the orange/amber gradient reserved for CTA/accent use only (Principle V).

**Anchor components / files affected**:

- `app/tokens.css` (MODIFIED) — adds 21 new tokens identified by research.md §1c, each in its
  existing numbered section; purely additive, no existing token changed.
- `app/globals.css` (MODIFIED) — maps 18 of the 21 new tokens into the `@theme inline` block. The
  3 unmapped: `--text-webinar-hero`/`--text-webinar-h2` per the documented heading-scale exception,
  and `--gradient-webinar-upcoming` because no `--gradient-*` token is ever mapped in this codebase
  (research.md §1c); purely additive, no existing mapping changed.
- `components/ui/Badge.tsx` (MODIFIED) — adds `"orangeOutline"` to the `BadgeTone` union with a
  matching `TONE_CLASSES` entry (research.md §2); purely additive, no existing tone changed.
- `components/ui/GlassCard.tsx` (MODIFIED) — adds `"webinarUpcoming"`/`"webinarReleased"` to the
  `GlassCardVariant` union with matching entries in all four existing `Record<GlassCardVariant,
  string>` maps (research.md §3); purely additive, no existing variant changed.
- `components/ui/icons.tsx` (MODIFIED) — adds one new `ClockIcon`; no existing icon touched or
  removed. `PlayIcon` is reused as-is (not modified) for two different call sites.
- `app/webinar/page.tsx` (new) — composition root.
- `app/webinar/_data/webinar-content.ts`, `app/webinar/_data/types.ts` (new) — typed content
  (data-model.md).
- `app/webinar/_components/hero-section.tsx` (new) — FR-001, FR-002, FR-003 (hero copy, the 9-cell
  collage, and its own inline subscribe form all rendered as internal JSX within this one file,
  research.md §8).
- `app/webinar/_components/sessions-section.tsx` (new) — FR-004, FR-005, FR-006, FR-007, FR-008,
  FR-016 (the "Sessions" heading, the upcoming panel, and every released card all rendered as
  internal JSX within this one file, research.md §8).
- `app/webinar/_components/subscribe-panel.tsx` (new) — FR-009, FR-010, FR-011, FR-015 (its own
  inline subscribe form instance).

## Project Structure

### Documentation (this feature)

```text
specs/TMS-73/
├── plan.md               # This file (/speckit.plan command output)
├── research.md           # Phase 0 output
├── data-model.md          # Phase 1 output
├── quickstart.md          # Phase 1 output
├── checklists/
│   └── requirements.md
└── tasks.md               # Phase 2 output (/speckit.tasks — not created by /speckit.plan)
```

No `contracts/` directory is generated for this feature: content is a typed local module rather
than a live API, matching the `TMS-69`/`TMS-66`/`TMS-63` precedent — the shape lives directly in
`app/webinar/_data/types.ts` and is documented in `data-model.md` instead.

### Source Code (repository root)

```text
app/
├── layout.tsx                                  # existing — untouched by this feature
├── globals.css                                 # existing — MODIFIED, maps 18 new tokens into @theme inline
├── tokens.css                                  # existing — MODIFIED, adds 21 new tokens (research.md §1c)
├── blog/                                        # existing — untouched, sibling page (reference precedent)
└── webinar/
    ├── page.tsx                                  # new — Webinar route, composes 3 sections in order
    ├── _data/
    │   ├── webinar-content.ts                    # new — typed content module (data-model.md WebinarPageContent)
    │   └── types.ts                               # new — entity types
    └── _components/
        ├── hero-section.tsx                       # new — FR-001, FR-002, FR-003 (hero copy + collage + inline form, research.md §8)
        ├── sessions-section.tsx                   # new — FR-004, FR-005, FR-006, FR-007, FR-008, FR-016 (upcoming + released cards, research.md §8)
        └── subscribe-panel.tsx                    # new — FR-009, FR-010, FR-011, FR-015 (own inline form)

components/
├── layout/                                       # existing — untouched (Header/Footer reused per FR-012)
└── ui/
    ├── icons.tsx                                  # MODIFIED — adds ClockIcon; PlayIcon reused as-is
    ├── GlassCard.tsx                              # MODIFIED — adds "webinarUpcoming"/"webinarReleased" variants (research.md §3)
    ├── Badge.tsx                                  # MODIFIED — adds "orangeOutline" tone (research.md §2)
    ├── FormField.tsx                              # existing — reused as-is by hero-section.tsx and subscribe-panel.tsx
    └── Button.tsx                                 # existing — reused as-is (no new variant, research.md/spec.md Assumptions)
```

**Structure Decision**: Single Next.js App Router project (no frontend/backend split). All new
route-local code lives under `app/webinar/` using the same underscore-prefixed private-folder
convention (`_components`, `_data`) already established by `app/blog/`/`app/services/`, so nothing
here is treated as a route and no new top-level shared directory is introduced. Per an explicit
follow-up directive, the route-local component surface is exactly 3 section files (`hero-section.tsx`,
`sessions-section.tsx`, `subscribe-panel.tsx`) rather than one file per sub-piece — each section's
internal sub-pieces (the collage, the upcoming/released cards, each inline subscribe form) are
non-exported JSX/sub-functions within their owning section file, not separate components
(research.md §8). Cross-cutting changes are: one small, additive edit to `components/ui/icons.tsx`
(adds `ClockIcon`; nothing removed or restructured); the 21 new tokens added to `app/tokens.css` and
mapped in `app/globals.css` (research.md §1c); and backward-compatible extensions to
`Badge`/`GlassCard` (research.md §2/§3). No shared component is forked, and no existing
variant/tone/prop is changed or removed — every reused primitive (`FormField`, `Button`, `PlayIcon`,
and the pre-existing `GlassCard`/`Badge` variants/tones, including `"blogFeatured"` reused for the
Subscribe panel) is used exactly as it already exists today.

## Complexity Tracking

> The Constitution Check above passed with two tracked, justified extensions — both are additive,
> backward-compatible, and are the constitution's own prescribed remediation for a real gap found
> during research, not a deviation from it.

| Extension | Why needed | Why this is the simpler/compliant option |
|---|---|---|
| 21 new tokens in `tokens.css`, 18 mapped in `globals.css` (research.md §1c) | research.md §1's exhaustive color/size/typography audit found these 21 reference values have no existing token match (or near-match close enough to responsibly reuse) | Principle I requires every design value be declared once in `tokens.css`; the rejected alternative (hardcode as Tailwind arbitrary values, e.g. `bg-[rgba(232,119,34,0.1)]` repeated at each use site) would violate that rule outright. Adding the token is the compliant path, not a workaround |
| `Badge` gains `"orangeOutline"` tone | research.md §2 found none of Badge's 5 existing tones is an outlined, low-opacity orange pill — the hero eyebrow's exact treatment | The clarify-session's explicit directive: extend the shared component in a backward-compatible way instead of forking a bespoke pill (as `construction-hero.tsx` currently does outside `Badge.tsx`). The new tone is additive; no existing tone changes |
| `GlassCard` gains `"webinarUpcoming"`/`"webinarReleased"` variants | research.md §3 found no existing variant matches the upcoming panel's amber gradient wash or the released cards' per-instance hover-accent treatment without introducing a parallel, bespoke shell | Same clarify-session directive as above — extend `GlassCard` rather than fork new card markup. Both new variants are additive; no existing variant changes. The Subscribe panel reuses the already-existing `"blogFeatured"` variant instead of adding a third |
| Released-session hover-border colors (`rgba(232,119,34,0.45)`/`rgba(56,189,248,0.45)`/`rgba(45,212,191,0.45)`, research.md §4) passed as raw arbitrary-value strings, not new tokens | `GlassCard`'s own `hoverBorderColor` prop already defaults to a hardcoded arbitrary rgba string (`hover:border-[rgba(232,119,34,0.6)]`) — this is a pre-existing, already-established prop-usage pattern this feature follows exactly, not a new one-off | Minting 3 single-use hover-only tokens one alpha-step away from this feature's own newly-added 0.30/0.50-opacity tokens for the same hues would fragment the token set for no reuse benefit; following `GlassCard`'s own established per-instance prop pattern is the more consistent choice. Tracked here explicitly (rather than left as an unexamined Principle I tension) because the values are hardcoded rgba literals in component-call-site code, which Principle I's letter otherwise prohibits |

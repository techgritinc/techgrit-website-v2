# Implementation Plan: Services Page

**Branch**: `TMS-66` | **Date**: 2026-07-15 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-66/spec.md`

**Note**: This plan was generated manually, following the same precedent as `specs/TMS-63/plan.md`
and `specs/001-about-us-page/plan.md`. The repository's actual branch
(`feature/TMS-66-services-overview-page`) does not match the numeric `###-feature-name` pattern
`.specify/scripts/bash/setup-plan.sh`/`check-prerequisites.sh` enforce, so those scripts were run
with `SPECIFY_FEATURE=TMS-66` set where they support it and bypassed by hand where their branch-name
gate still rejects a `TMS-<n>` value; per this repo's existing convention the shared scripts
themselves were left unmodified. Paths below point at `specs/TMS-66/`, matching this feature's
directory name and its Jira ticket.

## Summary

Build the Services page (`/services`) as five independent, component-wise content sections (hero,
service overview grid, three per-service detail sections, closing CTA), each reading its copy from
a typed local content module mirroring the pattern already established by `app/about/_data/`,
styled entirely with the existing design-token/utility-class system in
`app/tokens.css`/`app/globals.css`, and reusing the shared `Header`/`Footer` (`components/layout/`)
and the shared `RevealOnScroll`/`SectionEyebrow` primitives (`reusable-components/`) rather than
reimplementing any of them, with no changes to the footer (see research.md §2). The one deliberate,
minimal addition is an optional accent-color prop on `SectionEyebrow` (backward compatible, default
unchanged) so each of the three service detail sections can carry its own established token color
(blue/orange/teal) as its through-line identity, per the UI Design Approach below.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4.3.2 (via
`@tailwindcss/postcss`, CSS-first `@theme`), `next/image`, `next/font` (already wired in
`app/layout.tsx`)
**Storage**: N/A — content is a typed, in-repo dummy module (`app/services/_data/services-content.ts`),
following the same shape convention as `app/about/_data/about-us-content.ts`; no database. Live CMS
wiring is out of scope (see spec.md Assumptions).
**Testing**: No automated test framework is configured in this repo (confirmed gap, not a standard
to introduce here, per constitution Development Workflow); verification is manual (`npm run dev` +
responsive check) plus the existing `npm run lint` / `npm run build` Husky pre-commit gate, per
spec.md's per-story "Independent Test" descriptions.
**Target Platform**: Web — Next.js App Router page (`/services`), server-rendered, responsive
across mobile/tablet/desktop browsers.
**Project Type**: Single web application (existing `app/` tree — no frontend/backend split).
**Performance Goals**: Standard marketing-page expectations — no additional numeric target beyond
spec's SC-001 (all three service areas identifiable within the first two screens) and avoiding
layout shift from the hero/overview/detail images (use `next/image` sized appropriately per
viewport, consistent with the About Us page's approach).
**Constraints**: Must comply with constitution Principles I–VI — token-only styling (I), the
1140/960/560 breakpoint contract via `tg-sm:`/`tg-md:`/`tg-lg:` (II), reuse of the existing
`.card`/`.eyebrow`/`.badge-*`/`.tg-container`/`.section` utility classes and the shared
`RevealOnScroll`/`SectionEyebrow` components rather than new one-off markup (III), treating
`raw-files/TechGrit Services.dc.html` as visual/content reference only — never copying its
`x-dc`/`DCLogic`/`{{ }}`/inline-hex scaffolding (IV), the dark-first brand system (V), and invoking
the `frontend-design` skill for this page's UI Design Approach (VI, see below). Header/Footer reuse
is additionally mandated directly by spec.md FR-011.
**Scale/Scope**: One static content page, 5 sections (hero, overview, 3× service detail, closing
CTA), dummy/local content source, no auth, no pagination, no forms.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. Token-Only Styling | All section styling uses `var(--token-name)` / Tailwind utilities from `@theme inline`; the per-service accent colors (UI/UX = blue, Engineering = orange/amber, QA = teal) are all existing tokens (`--color-blue-light`, `--color-orange`/`--gradient-brand`, `--color-teal-light`) already used for exactly this kind of thematic accent (see `tokens.css` comments: "Intelligence Blue — AI content", "Deep Teal — architecture"). No new color is introduced. | PASS |
| II. Documented Breakpoint Contract | Reuses the mandated 1140/960/560 breakpoints via the `tg-sm:`/`tg-md:`/`tg-lg:` Tailwind prefixes already defined in `app/globals.css`'s `@theme inline` block (matching the convention used by the Contact Us form). | PASS |
| III. Centralized Utility-Class Component Library | Reuses `.card`, `.eyebrow`/`SectionEyebrow`, `.badge-blue`/`.badge-orange`/`.badge-teal`, `.tg-container`, `.section`, and the shared `RevealOnScroll` component — no new global utility class is added except the one described below. | PASS (with one small, justified, backward-compatible addition — see Complexity Tracking) |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | `TechGrit Services.dc.html` is used only to identify sections/copy/layout intent (hero copy, the 3 overview cards, the 3 detail sections' approach-steps vs. capability lists, the closing CTA copy); its `x-dc`/`DCLogic`/`{{ }}`/`sc-for` scaffolding, inline hex styles, and the closing CTA's `mailto:` action are explicitly not carried into the React components (the mailto destination is further overridden per spec.md's 2026-07-15 clarification — both CTAs now go to `/contact`). | PASS |
| V. Dark-First Brand System | Page uses the existing dark ink surface, orange→amber gradient (CTAs only), Manrope/Space Grotesk via the already-configured `next/font` setup. No new typography or theme is introduced. | PASS |
| VI. UI Craft via `frontend-design` Skill | This is UI work (tech signal: Next.js/React; content signal: page, hero, section, card). The skill was invoked during this plan phase — see "UI Design Approach" below. | PASS |
| Additional Constraints (single `app/`-rooted project) | New route-local code lives under `app/services/` (`page.tsx`, `_components/`, `_data/`), following the `app/about/` precedent; no new top-level `components/`/`lib/` directory. `reusable-components/SectionEyebrow` gains one optional, backward-compatible prop rather than being forked. | PASS |

**Initial gate result: PASS**, with one recorded, minimal, backward-compatible addition to a shared
component (`SectionEyebrow`) tracked in Complexity Tracking — not a violation.

## UI Design Approach

*Required for UI features per Constitution Principle VI.*

**UI mode detection**: UI mode ON — tech signal matched (Next.js 16 / React 19, this repo's
default) AND content signal matched (spec.md repeatedly uses "page", "hero", "section", "card").

**`frontend-design` skill invocation**: Invoked during this plan phase to shape component
architecture and motion strategy — not final pixel-level styling (that happens per-task during
`/speckit.implement`). Asked specifically: given this is the third major content page built on an
already-established dark, ink/orange-amber design system (not a greenfield brand), what's the
distinctive signature move for a page whose entire subject is "the three services we sell," that
avoids repeating the About Us page's card/list patterns; how to visually differentiate the UI/UX
section's *ordered* 6-step approach from the Engineering/QA sections' *unordered* 6-item capability
sets so the ordering itself carries information; and what reveal/motion strategy keeps three
sequential deep-dive sections from feeling repetitive by the third one.

The skill's guidance, reconciled with this repo's existing tokens/components:

1. **Signature move — the hero's own sentence is the page's map.** The hero headline is "Design,
   build, and ship AI-first software." Those three verbs map 1:1 onto the three services (Design →
   UI/UX Design, build → Software Product Engineering, ship → Quality Engineering — QA is what
   makes something safe to ship). Rather than an arbitrary "Service 01/02/03" numbering being the
   only structural device, the hero's three verbs become the page's own contents map: each verb is
   an in-page anchor link to its matching detail section (reusing the existing anchor-link
   scroll pattern, not a new mechanism). This is a signature specific to this page's own copy —
   not a generic numbered-card template — and reinforces FR-003's "overview card → its own detail
   section" requirement using content that's already there rather than added decoration.
2. **Per-service color identity, not a new color language.** The three service detail sections
   (and their matching overview cards) each carry one of this repo's existing thematic accent
   tokens as a through-line: UI/UX Design → `--color-blue-light` (already annotated "AI content" /
   icon strokes), Software Product Engineering → the existing orange/amber brand default (no
   override needed — it's already the page's baseline accent), Quality Engineering →
   `--color-teal-light` (already annotated "architecture" / accent-on-teal). This applies to: the
   detail section's eyebrow label + divider tick, the overview card's sequence label and hover
   border glow, and the "Explore →" link's hover color. This is the one visually distinctive,
   memorable structural device for this page — it costs nothing new in the token system (Principle
   I) and gives the page its own identity distinct from the About Us page's single-accent
   treatment, while staying inside the existing `.badge-blue`/`.badge-orange`/`.badge-teal` color
   family already defined in `globals.css`.
3. **Ordered vs. unordered lists rendered differently, not just numbered vs. unnumbered.** The
   UI/UX Design approach section renders its 6 steps as a connected, top-to-bottom sequence (each
   step keeps its number, per `about-us-values.tsx`'s existing `01`/`02`-style index treatment,
   but rows are visually chained rather than presented as a symmetric card grid) — because it *is*
   a process with a real start and end. The Engineering and QA sections instead render their 6
   capabilities as a plain, equal-weight `.card` grid (matching `about-us-process.tsx`'s existing
   card-grid pattern) with no numbers at all — because a capability set has no meaningful order,
   and giving it one would be exactly the "numbered markers on non-sequential content" anti-pattern
   the `frontend-design` skill warns against.
4. **Reveal strategy — natural per-item staggering, not three identical block-fades.** Rather than
   wrapping each detail section's list in one `RevealOnScroll` (which is what `about-us-process.tsx`
   already does, and would feel like the third repetition of the same beat), the UI/UX approach
   steps are each wrapped in their *own* `RevealOnScroll` instance, so they reveal one at a time as
   the visitor scrolls past them — reinforcing that this is a sequence unfolding in time. The
   Engineering/QA capability grids keep the existing single-`RevealOnScroll`-around-the-grid
   pattern (a quick, all-at-once settle, appropriate for a non-sequential set). No new animation
   component or keyframe is introduced — this is purely a different composition of the existing
   `RevealOnScroll` primitive per section.

**Reconciliation with Principles I–V**: No generic suggestion from the skill needed to be
overridden — every recommendation above resolves to tokens, components, and patterns that already
exist in this codebase (Principle I/III), uses the mandated breakpoint prefixes (Principle II),
treats the `.dc.html` file as reference only (Principle IV), and stays within the dark-first brand
system with the orange/amber gradient reserved for CTAs (Principle V, unchanged — the blue/teal
accents are existing secondary tokens already used sparingly for exactly this kind of thematic
labeling, e.g. in the Contact page's `CONTACT_INFO` icons, not a new brand color).

**Anchor components / files affected**:

- `app/services/page.tsx` (new) — composition root
- `app/services/_data/services-content.ts`, `app/services/_data/types.ts` (new) — typed content
- `app/services/_components/services-hero.tsx` (new) — FR-001
- `app/services/_components/services-overview.tsx` (new) — FR-002, FR-003
- `app/services/_components/service-detail-section.tsx` (new) — FR-004, FR-005, FR-006 (shared
  component parameterized per service; renders either the ordered-approach or capability-grid
  variant based on content shape)
- `app/services/_components/services-final-cta.tsx` (new) — FR-007

**Revision — 2026-07-15 (exact reference-parity pass)**: after initial implementation, the
stakeholder explicitly requested pixel-for-pixel parity with `TechGrit Services.dc.html` over the
signature devices above, with no unrequested embellishment. Per the skill's own guidance ("where
the brief pins down a visual direction, follow it exactly — the brief's own words always win"),
two of the four signature devices above were reverted, and a real spacing/structure bug the
original pass introduced was corrected:

- **Reverted**: the hero verb-anchor navigation (device 1) — the reference's H1 is plain,
  unlinked text; the anchor treatment was an invented addition, not present in the reference or
  requested by any FR. `HeroSection.titleAnchors` was removed from the data model.
- **Reverted**: the "Explore →" link's hover-accent color (part of device 2) — the reference uses
  one uniform amber-light color for this link on all three overview cards, regardless of service.
  The per-service *border* hover-glow on the overview cards themselves (also part of device 2) was
  **kept**, since the reference genuinely does hover-tint each card's border by its own service
  color — just verified the exact hex + opacity per card (blue `rgba(2,132,199,.6)`, orange
  `rgba(232,119,34,.6)`, teal `rgba(15,118,110,.7)`) rather than reusing the light token variants.
  Also corrected: the overview card's own *label* color is not one-to-one with these — card 2
  ("Software Product Engineering") labels in amber-light (`--color-amber-light`), not orange,
  matching the reference exactly; only the detail section's own category label uses orange for
  that service.
- **Reverted, then corrected**: the ordered-approach steps (device 3) were rebuilt from an
  invented "connected timeline with circular badges" into the reference's actual layout — a
  3-column grid (`grid-template-columns:repeat(3,1fr); gap:0 56px`) with a plain `01`–`06` digit
  label per item (Space Grotesk, no badge/circle), a `border-top` divider per item, and one
  `border-bottom` under the whole grid. The Engineering/QA sections' "Core capabilities" heading
  was also removed — the reference has no such label above their capability grids at all, only
  the UI/UX section's "Our approach" label exists.
- **Kept**: the per-item vs. per-group `RevealOnScroll` distinction (device 4) is unaffected by
  this revision — it is a transient motion detail, not a static-layout one, and the reference's own
  `data-reveal` mechanism doesn't prescribe per-item granularity either way.
- **Real bug found and fixed while re-auditing**: the reference wraps an entire detail section's
  content (heading/description/image row *and* the approach/capability list below it) in one
  `data-reveal` unit. The original implementation used two separate `RevealOnScroll` instances
  (one around the row, one around the list) — consolidated into one, matching the reference.
- **Real bug found and fixed**: the capability grid's card padding, radius, and hover-lift were
  inherited from the sitewide generic `.card` class (`--radius-3xl` 22px, `--blur-lg` 14px, -3px
  hover) rather than the reference's own values for this specific card (`--radius-xl` 18px,
  `--blur-md` 8px, -5px hover, and a service-specific hover border color) — same issue for the
  overview cards (`--radius-2xl` 20px / `--blur-md` 8px / -6px hover, not the generic card's
  values). Both now use bespoke inline styles instead of the shared `.card` class.

Values that remain on existing design tokens rather than the reference's literal inline numbers
(chosen deliberately, not overlooked): generic border/glass background alpha values
(`--color-border`, `--color-glass`) and body-copy text-color alpha values
(`--color-text-secondary`/`--color-text-faint`) are within a few percent of the reference's own
literal rgba alphas in a handful of places, and were kept on the shared tokens rather than
hand-tuned per instance — those deltas produce no layout/dimensional difference (no "gap"), only
an imperceptible tint difference, and diverging from the shared tokens for that would reintroduce
the exact per-page color drift Principle I exists to prevent. Every dimension that actually affects
layout (padding, margin, gap, border-radius, font-size, line-height, letter-spacing, breakpoints,
and every distinct hue used for a service accent) was matched to the reference's literal value.
- `reusable-components/section-eyebrow.tsx` (MODIFIED) — adds one optional, backward-compatible
  `accentColor` prop (defaults to the existing `var(--color-orange)`, so every current caller is
  unaffected)
- `components/layout/footer-config.ts` / `Header.tsx` / `Footer.tsx` — NOT modified; the shared
  footer today renders one fixed set of quick links on every route with no per-page mechanism (see
  research.md §2), and reconciling that is out of this feature's scope per FR-011

## Project Structure

### Documentation (this feature)

```text
specs/TMS-66/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output
├── data-model.md         # Phase 1 output
├── quickstart.md         # Phase 1 output
├── checklists/
│   └── requirements.md
└── tasks.md              # Phase 2 output (/speckit.tasks — not created by /speckit.plan)
```

No `contracts/` directory is generated for this feature: like the About Us page, content is a
typed local module rather than a live API, but unlike About Us there is no separate dummy-CMS
JSON contract file to publish — the shape lives directly in `app/services/_data/types.ts` and is
documented in `data-model.md` instead (see research.md for why this is sufficient here).

### Source Code (repository root)

```text
app/
├── layout.tsx                                  # existing — untouched by this feature
├── globals.css                                 # existing — untouched (no new tokens/utilities needed)
├── tokens.css                                  # existing — untouched
├── about/                                       # existing — untouched, sibling page
└── services/
    ├── page.tsx                                 # new — Services route, composes 5 sections in order
    ├── _data/
    │   ├── services-content.ts                  # new — typed content module (data-model.md ServicesPageContent)
    │   └── types.ts                              # new — PageSectionEntry-style discriminated union
    └── _components/
        ├── services-hero.tsx                    # new — FR-001
        ├── services-overview.tsx                # new — FR-002, FR-003
        ├── service-detail-section.tsx            # new — FR-004, FR-005, FR-006 (reused 3×, once per service)
        └── services-final-cta.tsx                # new — FR-007

reusable-components/
├── reveal-on-scroll.tsx                         # existing — reused as-is, composed per-item or per-group per section
└── section-eyebrow.tsx                          # MODIFIED — adds optional accentColor prop, default unchanged

components/layout/                               # existing — untouched (see research.md §2)

public/
└── images/
    └── services/                                # new — placeholder image assets for overview cards + detail sections
```

**Structure Decision**: Single Next.js App Router project (no frontend/backend split). All new
route-local code lives under `app/services/` using the same underscore-prefixed private-folder
convention (`_components`, `_data`) already established by `app/about/`, so nothing here is
treated as a route and no new top-level shared directory is introduced. The only cross-cutting
change is one small, additive, backward-compatible edit to `reusable-components/section-eyebrow.tsx`
(it already takes children/props, so adding one more is a natural extension). The shared footer is
left untouched — see research.md §2 for why. `service-detail-section.tsx` is one shared,
parameterized component reused three times (once per service) rather than three near-duplicate
components, since the three sections differ only in content and in ordered-vs-unordered list
rendering (both driven by the section's own data, per data-model.md), matching FR-012's
structured-content requirement.

## Complexity Tracking

> No unjustified violations. One tracked, sanctioned, minimal addition:

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|---------------------------------------|
| Adding an optional `accentColor` prop to the shared `reusable-components/section-eyebrow.tsx` (previously hardcoded to orange) | The UI Design Approach's per-service color-identity signature (blue/orange/teal) requires each service detail section's eyebrow tick+label to render in that service's own accent color, not always orange | Forking a Services-page-local copy of `SectionEyebrow` would duplicate a 9-line shared component and violate Principle III's "reuse by className/component, not re-implement per page" — the prop addition is smaller, backward-compatible (default preserves every existing caller's current orange), and keeps the component genuinely shared |

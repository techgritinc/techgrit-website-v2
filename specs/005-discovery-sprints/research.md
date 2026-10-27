# Research: Discovery Sprints Page

## R1: Route slug and file/folder placement

**Decision**: `app/how-we-work/discovery-sprints/page.tsx`, with `_data/` and `_components/`
subfolders, mirroring `app/what-we-do/ai-modernization/` and `app/how-we-work/engagement-models/`
byte-for-byte in structure.

**Rationale**: FR-001 mandates following the existing How We Work file/folder pattern exactly.
Both sibling pages under `app/how-we-work/` (`engagement-models/`, `orbit-ai-ecosystem/`) use this
exact `page.tsx` + `_data/` (or CMS-fetch) + `_components/` shape. `discovery-sprints` is the
natural kebab-case slug matching the page's own name, consistent with `engagement-models` and
`orbit-ai-ecosystem`.

**Alternatives considered**: A CMS-backed page (like `engagement-models`/`orbit-ai-ecosystem`,
which fetch via `cms/api/how-we-work/*.ts`) was considered for consistency with those two sibling
pages, but FR-016 explicitly scopes this feature to a static local content module — no CMS/API
integration — mirroring the AI-Accelerated Modernization page's approach instead.

## R2: Hero composition — image instead of stat panel

**Decision**: Use the existing `Hero` component with `mediaFill={true}` and a `MediaSlot` (`fill`,
`aspect-[4/3]` wrapper) in the `media` slot, `crumbs` omitted (empty array / prop not passed) per
FR-002's "no breadcrumb" requirement.

**Rationale**: This is byte-for-byte the pattern already used in
`app/how-we-work/engagement-models/page.tsx`'s hero case — `Hero` already supports both a
`mediaFill` plain-image mode and a chrome'd stat-grid mode via the same `media` slot, so no
`Hero` changes are needed at all. Confirmed via Clarification Q1 (2026-08-24 session).

**Alternatives considered**: Extending `Hero` with a new `stats` prop was rejected — Clarification
Q1 explicitly resolved this by dropping the stat data entirely in favor of the image-only pattern
already proven on Engagement Models.

## R3: "What We Cover" 3-card composition

**Decision**: Reuse `GlassCard` (`variant="serviceCapability"`) + `GlassCardTitle` +
`GlassCardDescription` + a manually-rendered `<ul>` feature list, following
`engagement-models-capabilities.tsx` verbatim (category label, title, subtitle, feature list), but
without that component's optional `outcomeLabel`/`outcomeText` footer (not required by FR-006).

**Rationale**: FR-006 explicitly requires "the same card composition pattern already used for the
three capability cards on the Engagement Models page." `GlassCard`'s `serviceCapability` variant
already has exactly this shape built in (its icon-variant comment even notes: "capability cards
use a numbered eyebrow label, not an icon box").

**Alternatives considered**: None — the requirement names the exact pattern to copy.

## R4: "What Is a Phase Zero Assessment?" (new section, FR-005)

**Decision**: Compose from two existing primitives stacked vertically: `ContentBlock` (no-`chips`
variant, which already renders a centered stacked eyebrow/title/description) followed by a
`GlassCard` (`variant="default"`) wrapping an `Outcome` component for the "full-width card with
title and description."

**Rationale**: `ContentBlock`'s own doc comment confirms the no-chips variant exists specifically
for "a single centered column" case (already built for a different TMS-88-labeled feature,
confirming the pattern's reusability). `Outcome` is a two-prop heading+description block that has
had zero consumers since being built ahead-of-need for a prior feature — this is the first
opportunity to use it as originally intended.

**Alternatives considered**: A new page-local "PhaseZeroCard" component was considered but
rejected per FR-017/Principle III — no new component is justified when `GlassCard` + `Outcome`
already covers the exact shape needed.

## R5: "What You'll Receive" (7 deliverable cards, FR-007)

**Decision**: `GlassCard` (`variant="default"`) with a small numeral label (matching the
reference's `del-num` styling: `text-[11px] font-extrabold tracking-[0.14em] text-orange`) above a
plain `<h4>`/`<p>` title+description — no features list, no category label styling (distinct from
the "What We Cover" cards, which do have both).

**Rationale**: The reference's `.del-card` is visually simpler than `.cap-card` (no feature list,
no category-label styling) — `GlassCard`'s `default` variant plus inline title/description
elements reproduces this without needing a new variant or component.

**Alternatives considered**: A new `GlassCardVariant` entry ("deliverable") was considered, but the
existing `default` variant's padding/border/hover treatment already matches the reference's
`.del-card` closely enough that no new variant is needed — the small numeral label is just a plain
`<div>`, not a component-level concern.

## R6: "How It Works" 4-step lifecycle (FR-010)

**Decision**: Reuse `ProcessSteps`, but add an optional `columns` prop (default `5`, this page
passes `4`) so the grid's `lg:` column count matches the reference's 4-step layout instead of
leaving a 5th empty column.

**Rationale**: `ProcessSteps` currently hardcodes `lg:grid-cols-5`, sized for 5-step flows. Passing
4 items into a hardcoded 5-column grid would leave a visible gap, violating FR-018 responsive/
layout-fidelity requirements. Making the column count configurable (default preserving current
behavior) is the minimal, backward-compatible fix — no existing consumer is affected since the
default stays `5`.

**Alternatives considered**: A new `ProcessStepsFour` component was rejected as unnecessary
duplication (Principle III) — the existing component only needs one more prop, not a fork.

## R7: "Documentation you can execute" tiles (FR-009) and "Who It's For" cards (FR-011)

**Decision**: FR-009's six why-tiles map directly onto `IconTile` (`size="default"`) in a
`grid-cols-1 md:grid-cols-2` layout — this component's own doc comment already calls its default
size the "why-tile type scale." FR-011's four audience cards map onto `GlassCard`
(`variant="serviceCapability"`) with an icon box, following `ai-modernization-industries.tsx`'s
`IndustryTile` pattern verbatim (icon chip + `GlassCardTitle` + `GlassCardDescription`, 4-col grid
at `lg`).

**Rationale**: Both patterns already exist, proven, on sibling pages — `IconTile` was built
specifically with the reference's "why-tile" in mind (per its own source comment), and
`ai-modernization-industries.tsx` is functionally identical in shape to FR-011's requirement (icon
+ title + description card grid).

**Alternatives considered**: None — both are exact, pre-existing matches.

## R8: FAQ and closing CTA

**Decision**: `Faq` component (native `<details>`/`<summary>`, `defaultOpen` prop available) for
FR-012; `FinalCta` component (already used by AI-Accelerated Modernization and Orbit AI Ecosystem)
for FR-014.

**Rationale**: Both are explicitly named in FR-012/FR-014 as "the project's existing reusable FAQ
component" and "identical to the CTA pattern already implemented on the AI-Accelerated
Modernization and Orbit AI Ecosystem pages" respectively — both components already exist and match
exactly.

**Alternatives considered**: None.

## R9: Footer link

**Decision**: Update `cms/api/footer.ts` line 56 — `{ slug: "discovery", label: "Discovery
Sprints", href: "/frameworks#discovery" }` → `href: "/how-we-work/discovery-sprints"`.

**Rationale**: This is the only in-scope nav surface for this feature. The top header nav
(`components/layout/Header.tsx`) fetches from a live CMS endpoint (`getHeaderData`) rather than a
local static config — per this feature's explicit scope (static content only, no CMS
read/write), the header mega-menu is out of scope and not touched. Footer content, by contrast, is
a local static TypeScript module (`cms/api/footer.ts`) already edited by prior sibling features
(AI-Accelerated Modernization, Orbit AI Ecosystem) for the exact same one-line href-repoint
pattern.

**Alternatives considered**: Updating the header CMS content was considered and rejected — out of
scope (would require a live CMS write, contradicting FR-016's static-content-only scope) and not
requested by the spec.

## R10: Ambient background orbs

**Decision**: No new `ambient-orbs.tsx` pathname branch is required for this feature (unlike
Orbit AI Ecosystem and AI-Accelerated Modernization, which each added a bespoke 4-orb geometry).
This page's reference uses a generic 4-orb ambient background with no unique geometry
requirements — reuse whatever default/shared orb treatment the How We Work section already
applies, confirmed during implementation against `components/ui/ambient-orbs.tsx`'s existing
pathname branches.

**Rationale**: The reference's orb block (`raw-files-v3/.../TechGrit Discovery Sprint.dc.html`
lines 148–153) uses the same generic 4-orb positions/colors/blur/animation values seen across
multiple other reference pages, with no page-specific tuning — unlike Orbit AI's or AI
Modernization's bespoke geometries which justified their own pathname branch.

**Alternatives considered**: Adding a new pathname branch was considered for consistency with the
two most recent sibling features, but rejected since the reference itself shows no distinguishing
values to justify one — doing so anyway would be an unrequested, unjustified change per the
"no unnecessary code" instruction.

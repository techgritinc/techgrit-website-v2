# Research: Consumer Lending Industries Page

All Technical Context unknowns were resolved during `/speckit.clarify` (live CMS confirmed at
`/api/pages/by-slug/consumer-lending`) and by direct inspection of sibling pages during this
planning pass. No NEEDS CLARIFICATION markers remain.

## Decision 1: CMS integration pattern to mirror

**Decision**: Mirror `cms/api/what-we-do/data-ai-engineering.ts` (and `ai-modernization.ts`,
`orbit-ai-ecosystem.ts`) — a single fetcher function, a `toSection(raw, order)` switch on
`__component`, and per-`variant` disambiguation for the repeated `service-detail` component.

**Rationale**: The live CMS response's 13 sections use 7 distinct `__component` values, 6 of which
(`page-reusable-sections.hero`, `.statistics`, `.modernization-challenges`,
`.pd-modernization-capabilities`, `.service-detail`, `.pd-faq`, `.cta-banner`) already have a working
mapper in one or more of `data-ai-engineering.ts` / `ai-modernization.ts` / `construction.ts`. Reusing
that exact recipe (confirmed by direct file reads) means zero new integration patterns for 6 of 7
component types — only their consuming section-renderer components are new.

**Alternatives considered**:
- Mirror `cms/api/industries/fintech.ts` instead (since spec says "Hero same as Fintech") — rejected
  for everything past the hero: Fintech's own CMS vocabulary (`serviceLabel`-disambiguated
  `whatWeBuild`/`productLifecycle`/`engineeringServices`, `IndustryCardGrid`/`IndustryStepGrid`/...
  components) does not match Consumer Lending's actual live response at all. Fintech remains the
  model for the Hero section specifically, since the spec calls that out explicitly and Fintech's
  hero mapper (`mapHeroFields`) is itself just the shared `cms/shared/reusable-sections.ts` helper —
  identical to what every PD-family page's hero also uses.
- Build a bespoke one-off mapper with no sibling precedent — rejected: would duplicate logic that
  already exists in 3+ places and diverge from Constitution Principle III's "reuse first" rule.

## Decision 2: Domain depth — new component, not an existing tab pattern

**Decision**: Build one new component, `consumer-lending-domain-depth.tsx`, plus its own mapper for
the new `industries-construction.pd-lending-lifecycle` `__component` (no existing type/mapper
anywhere in the codebase covers this shape).

**Rationale**: Confirmed by codebase search — the only existing tab/filter-shaped components are
`components/ui/FilterBar.tsx` and its blog/case-studies consumers, all of which render rounded
filter *chips* in a sticky bar, not full-width underlined *tabs* with a stateful single-active-panel
body. Constitution Principle III's reuse rule explicitly allows a new primitive "only justified when
no existing primitive actually fits" — that condition holds here.

**Alternatives considered**:
- Repurpose `FilterBar` with custom children — rejected: `FilterBar` is a chip-selection shell with
  sticky positioning semantics; retrofitting single-active-tab-with-full-panel-swap behavior onto it
  would fight its existing contract more than a small purpose-built component costs.

## Decision 3: "Our work" section's metric heading field

**Decision**: Extend the existing `Capability` shape (used by `toCapabilitiesSection` across every
PD-family page) with an optional `metricLabel` field sourced from `card.structureInfo?.label`,
alongside the already-established `note` field (`card.structureInfo?.description`).

**Rationale**: `structureInfo.label` is already read elsewhere in the codebase as `outcomeLabel`
(`cms/api/how-we-work/orbit-ai-ecosystem.ts`, `engagement-models.ts`) for an analogous "bold callout
label above a description" shape — same field, same role, different section. No new CMS field or
guessing involved.

**Alternatives considered**:
- Build a wholly separate "case summary" card component instead of extending `Capability` — rejected:
  the underlying CMS shape (`pd-modernization-capabilities` → `capabilityCard[]`) is identical to
  Ecosystem's and Operating Context's; a parallel type would duplicate the mapper for no behavioral
  gain, since `features: []` already naturally yields an empty bullet list for this section.

## Decision 4: Final CTA secondary button

**Decision**: Resolved in Clarifications — always render the secondary button, falling back to the
reference content's own label/link (`"Request an estimate"` → `/request-for-estimate/`) when the CMS
field is empty, mirroring Construction's page-level unconditional-`secondaryCta` pattern rather than
the PD-family's conditional-drop pattern.

**Rationale**: See spec.md Clarifications session 2026-08-26.

## Decision 5: Nav wiring

**Decision**: No footer/header nav-config change in this phase.

**Rationale**: See plan.md's "Nav wiring assumption" — Fintech and Healthcare, the two most recently
shipped Industries pages, are not linked from footer/header/homepage today either. Consistent
precedent, low risk, reversible in a follow-up ticket.

**Update (verified live during implementation)**: `cms/api/header.ts` is entirely CMS-driven
(`toMegaGroup` builds the Industries mega-menu from the header CMS response, not a local
nav-config array) — the live header already lists "Consumer Lending" → `/industries/consumer-lending/`
with no code change on this repo's side. No `header.ts` edit was needed or made. Footer still
excluded per the original rationale above (Fintech/Healthcare precedent).

# Phase 0 Research: Healthcare Industry Page

## 1. Content source: real CMS endpoint, not a dummy contract

**Decision**: Fetch from Strapi at `GET /api/pages/by-slug/healthcare`, following the exact
`fetchCms<T>()` / `cache()` / null-on-failure pattern already used by `cms/api/construction.ts`.
The real response captured during specification (see spec.md's Clarifications for the full
payload) is the authoritative shape reference for `cms/types/healthcare.ts` — no contract file is
kept in `specs/TMS-67-healthcare/contracts/`; the CMS itself is the live contract.

**Rationale**: Every other Industries-family page in this repo (Construction) is CMS-driven, not
statically hardcoded. Per spec.md FR-003 and the constitution's general "no hardcoded content"
posture for CMS-backed pages, Healthcare follows the same convention rather than introducing a
local dummy-data module.

**Alternatives considered**: A typed local dummy module (like `001-about-us-page`'s original
approach) — rejected because the requester supplied a real CMS payload specifically to be used as
the content source, not a placeholder.

## 2. Disambiguating the four `page-reusable-sections.service-detail` entries

**Decision**: Disambiguate by the section's `serviceLabel` field ("What We Build",
"Healthcare Product Lifecycle", "HealthTech Engineering Services", "Featured Capabilities"),
not by `variant`.

**Rationale**: Construction disambiguates its 3 `service-detail` entries by `variant`
(`challanges`/`solutions`/`advantage`, each unique). The Healthcare payload's `variant` field is
**not** reliably unique — "AI Across the Healthcare Product Lifecycle" and "Our HealthTech
Engineering Services" both carry `variant: "PD-modernizationLifecycle"`. `serviceLabel` is unique
across all 4 entries in the real payload, so it's the safe discriminator. `title` was considered
and rejected as the discriminator because it's the section's display heading (content that could
legitimately be edited in the CMS without meaning to change which template renders it);
`serviceLabel` is closer to a stable, semantic key.

**Alternatives considered**: Positional matching (1st/2nd/3rd/4th service-detail entry in array
order) — rejected per the same reasoning `cms/api/construction.ts`'s own comment gives for
rejecting it (unreliable once the CMS author reorders sections).

## 3. Two new Strapi component shapes not present in Construction

**Decision**: Add two new raw Strapi types + mappers, following the exact `StrapiXxxSection` /
`mapXxx()` per-section-mapper convention `cms/api/construction.ts` already establishes:

- `page-reusable-sections.modernization-challenges` → "HealthTech Solutions We Support" (a flat
  `blockers.features[]` array of plain-title items, no icon/description).
- `industries-construction.pd-health-care-system` → "Connected Healthcare Systems That Work
  Together" (an eyebrow/title/subtitle + `categories[]`, each with a `name` and its own
  `features[]` array of plain-title items).

**Rationale**: Neither shape exists in `cms/shared/reusable-sections.ts` or
`cms/types/construction.ts`; both are specific to this page (the `industries-construction.*`
namespace on the second one suggests the CMS schema author may reuse it for future industry pages,
but nothing else consumes it today). Per the shared-vs-route-local split this repo already follows
for components, these two raw types and their mappers live in this feature's own
`cms/types/healthcare.ts` / `cms/api/healthcare.ts` — not in `cms/shared/reusable-sections.ts` —
until a second consumer emerges.

## 4. Per-section visual pattern reuse (from spec.md Clarifications)

| CMS section | Reused pattern | Icon/step treatment |
|---|---|---|
| Hero | `ConstructionHero`-equivalent, single primary CTA, no stats block, no breadcrumb | n/a |
| What We Build (8) | `ConstructionChallenges` card-grid, extended to render description | icon (CMS-supplied) |
| AI Across the Healthcare Product Lifecycle (6) | `ConstructionSolutions` 3-col card grid | numbered step label `1`–`6` (CMS icon unused) |
| Our HealthTech Engineering Services (7) | `ConstructionSolutions`-style icon card (not the numbered `ConstructionAdvantage` row) | icon (CMS-supplied per step; rendered only when present, see §5) |
| HealthTech Solutions We Support (17) | New dense, title-only tile grid inspired by `LeadershipWhyItMatters` | none |
| Featured Capabilities (2) | `ConstructionImpact` `GlassCard` style, metric number and "Read case study" link omitted | none |
| Connected Healthcare Systems That Work Together | New single-card bulleted-list component | n/a |
| Closing CTA | `FinalCta` (`components/ui/final-cta`), unchanged | n/a |

This table is the resolution of every "which existing pattern" clarification recorded in spec.md;
implementation tasks reference these rows directly instead of re-deriving the mapping.

## 5. Icons for "Our HealthTech Engineering Services" — render only what the CMS supplies, no fallback

**Decision**: The CMS was updated (2026-08-25) to attach a real icon to most of this section's 7
steps. Render `mapSectionIcon(approachSteps[].icon)` exactly as-is, same as every other
icon-bearing section (`IconCard.icon: SectionIcon | null`) — when a step's `icon` is `null` (one
step, "Data & AI Engineering", still has none as of the latest payload), the card renders with no
icon slot, cleanly, rather than the component substituting a placeholder or an assigned icon.

**Rationale**: No fallback/placeholder logic is wanted in this codebase — content gaps are a CMS
authoring concern, not something the frontend should paper over by guessing an icon. This also
keeps `EngineeringServicesSection`'s shape identical to `WhatWeBuildSection`'s `IconCard` (both
`icon: SectionIcon | null`) instead of the codebase carrying a special non-null guarantee for one
section only.

**Alternatives considered**: Assigning an icon from `components/ui/icons.tsx` per step when the
CMS's is `null` (the original 2026-08-25 decision) — superseded by this session's explicit "no
fallback should be present in the code" instruction.

## 6. "HealthTech Solutions We Support" responsive grid

**Decision**: A dedicated, title-only tile — 3 columns at `md:` (960px) and above, 2 columns at
`sm:` (560px)–`md:`, 1 column below `sm:` — built as a small new variant rather than reusing
`LeadershipWhyItMatters` directly (that component's tile is icon+title+description and only ever
renders 4–8 items in a fixed 2-column grid; forcing 17 plain titles through it would require either
faking icon/description data or changing its column count for its original page too).

**Rationale**: Directly answers the 2026-08-25 clarification session's explicit column counts.
Building a new, small component (rather than parameterizing `LeadershipWhyItMatters` further)
avoids adding icon-less/description-less optional-prop branches to a component whose one existing
consumer (Leadership Advisory) always supplies both.

## 7. "Connected Healthcare Systems That Work Together" — single card, bulleted list

**Decision**: One `GlassCard`-style panel containing a vertical list of 7 bullets (one per
category), each bullet showing the category name as a small heading followed by its feature
titles rendered as inline chips/tags wrapping within that bullet.

**Rationale**: Directly implements the final clarification, which explicitly rejected a
multi-card-per-category grid in favor of one card with bullets.

## 8. Testing

**Decision**: No automated test framework is configured in this repo (confirmed via
`package.json` / constitution's Development Workflow section). Verification is manual: `npm run
dev` + the existing `npm run lint` / `npm run build` Husky pre-commit gate, same as every other
page in this repo.

## 9. Tokens

**Decision**: No new design tokens are anticipated. All spacing/color/radius/typography needs are
already covered by tokens introduced for Construction (`--color-amber-light`,
`--color-overlay-amber-soft`, the `GlassCard` variant system, etc.) — new `GlassCard` variants
(not new tokens) are the extension point for this page's card styling, per Construction's own
precedent (`constructionChallenge`/`constructionSolution`/`constructionImpact` variants).

## 10. Project structure

Following the exact Construction precedent: `app/industries/healthcare/page.tsx` +
`app/industries/healthcare/_components/*.tsx`, with a new `cms/api/healthcare.ts` +
`cms/types/healthcare.ts` pair mirroring `cms/api/construction.ts` / `cms/types/construction.ts`.

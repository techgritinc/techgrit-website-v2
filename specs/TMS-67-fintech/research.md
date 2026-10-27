# Phase 0 Research: FinTech Industry Page

## 1. Content source: live CMS, re-verified during clarification

**Decision**: Fetch from `GET /api/pages/by-slug/fintech`, same `fetchCms<T>()` / `cache()` /
null-on-failure pattern as Construction/Healthcare. The ticket's originally-pasted payload went
stale mid-specification — it was re-fetched live during `/speckit.clarify` and that live response
is the authoritative shape reference for `cms/types/fintech.ts`. No contract file is kept; the CMS
itself is the live contract (matches Healthcare's precedent).

**Rationale**: Same as Healthcare — every Industries-family page is CMS-driven, not statically
hardcoded, and a pasted-into-a-ticket payload can drift from the live CMS by the time planning
happens (as it did here for "Featured Case Studies" — see §5).

## 2. Section disambiguation

**Decision**: Disambiguate the three `page-reusable-sections.service-detail` entries by
`serviceLabel` — `"What We Build"`, `"Lifecycle"`, `"HealthTech Engineering Services"` — exactly
mirroring Healthcare's own disambiguation strategy (spec.md's own research precedent). Note
FinTech's raw `serviceLabel` for the engineering-services entry is literally `"HealthTech
Engineering Services"` (a CMS copy-paste artifact, same bug as the section's `title` field) — the
mapper matches on this raw value but overrides the *displayed* title (see §4); the raw
`serviceLabel` string itself is not shown to the visitor (only used as an eyebrow-adjacent label
internally, per the shared `IndustryStepGrid`/`IndustryServiceRows` prop contract in data-model.md).

**Rationale**: `variant` collides the same way it does for Healthcare (`productLifecycle` and
`engineeringServices` both carry `"PD-modernizationLifecycle"`).

## 3. Extracting Healthcare's six section components into `components/ui/`

**Decision**: Six presentational components move verbatim (styling, tokens, breakpoints
unchanged) from `app/industries/healthcare/_components/` into `components/ui/Industry*.tsx`:

| Old (Healthcare-only) | New (shared) | Change |
|---|---|---|
| `healthcare-hero.tsx` | `IndustryHero.tsx` | none — pure relocation |
| `healthcare-what-we-build.tsx` | `IndustryCardGrid.tsx` | + optional section-level `description` slot (spec.md Clarification) |
| `healthcare-product-lifecycle.tsx` | `IndustryStepGrid.tsx` | none |
| `healthcare-engineering-services.tsx` | `IndustryServiceRows.tsx` | none |
| `healthcare-solutions-we-support.tsx` | `IndustryTileGrid.tsx` | none |
| `healthcare-featured-capabilities.tsx` | `IndustryFeaturedCases.tsx` | none |

The existing generic `components/ui/Hero.tsx` was evaluated and rejected as the target for the
hero shape: it renders a visually different hero (different eyebrow/badge treatment, breadcrumb
support, 44–56px title, orange-bordered media card with optional caption) built for the "What We
Do"/"How We Work" page family. Forcing Healthcare onto it would change Healthcare's rendered
output, violating SC-007. `IndustryHero.tsx` is therefore a new file, not a reuse of `Hero.tsx` —
both now coexist as two distinct hero shapes serving two distinct page families, same as
`GlassCard`'s existing multi-variant pattern already does for cards.

**Rationale**: All six shapes are lifted, not redesigned — zero risk of visual drift, and
Constitution Principle I/II compliance is inherited for free since the token/breakpoint usage
doesn't change.

**Alternatives considered**: A new `app/industries/_shared/` route-family-scoped folder —
rejected during `/speckit.clarify` in favor of `components/ui/`, matching this repo's only existing
precedent for a section shape reused across a route family (`Hero`, `ContentBlock`, `ProcessSteps`,
`IconTile`, all already living in `components/ui/` and reused by `what-we-do/*`/`how-we-work/*`).

## 4. Two CMS section titles corrected at render time

**Decision**: FinTech's CMS payload literally reuses Healthcare's copy for two section titles
("AI Across the **Healthcare** Product Lifecycle", "Our **HealthTech** Engineering Services").
Each shared mapper function (`mapProductLifecycle`, `mapEngineeringServices` in
`cms/shared/industry-sections.ts`) accepts an optional `titleOverride?: string` parameter; `
cms/api/fintech.ts` passes the corrected FinTech-worded titles at the call site, while
`cms/api/healthcare.ts` passes nothing (its own titles are already correct, so the parameter
defaults to `cms.title` — no behavior change for Healthcare).

**Rationale**: Keeps the correction page-specific and explicit at the call site rather than baking
FinTech-only string logic into the shared mapper's default behavior.

## 5. "Featured Case Studies" — re-verified identical to Healthcare's "Featured Capabilities"

**Decision**: The ticket's originally-pasted payload showed this section as a `service-detail`
entry with no case-study link. Re-fetching the live CMS during clarification showed it is actually
`industries-construction.proven-impact` — the exact component type Healthcare's "Featured
Capabilities" already uses — with a populated `ctaLabel`/`ctaLink` ("Read case study" →
`/insights/case-studies/`). `mapFeaturedCapabilities` (shared) and `IndustryFeaturedCases.tsx`
(shared) are used as-is; no FinTech-specific mapper or component exists for this section.

**Rationale**: Directly resolves spec.md's Clarification session — data-driven, not a preference.

## 6. `cms/shared/industry-sections.ts` vs extending `cms/shared/reusable-sections.ts`

**Decision**: New sibling file, not an addition to the existing `reusable-sections.ts`.

**Rationale**: `reusable-sections.ts` holds shapes reused across *unrelated* page families
(hero/stats/cta-banner/case-study-card — used by Construction, Home, Case Studies, etc.).
The five shapes being extracted here (`service-detail`-as-card-grid/step-grid/service-rows,
`modernization-challenges`-as-tile-grid, `proven-impact`-as-featured-cards) are specific to the
Industries page family's own `approachSteps`/`blockers`/`caseStudyCards` CMS shapes — keeping them
in their own file avoids conflating "used by literally any page" with "used by this one family of
similar industry pages," while still being one clear import for `cms/api/healthcare.ts` and
`cms/api/fintech.ts` to share.

## 7. Nav/footer links

**Decision**: Not touched. Healthcare's own footer entry (`ind-healthtech`) still points to the
placeholder `/#industries` href — this feature does not fix that, and does not add a FinTech
equivalent either, to keep this change scoped to exactly Healthcare + FinTech's page code per the
explicit "no other pages disturbed" instruction.

**Rationale**: Fixing nav wiring for one page and not its sibling would be an inconsistent,
out-of-scope change; leaving both alone is the smaller, safer diff.

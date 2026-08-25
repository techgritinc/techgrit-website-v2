# Research: Engagement Models Page (How We Work)

## 1. Route & folder structure

**Decision**: `app/how-we-work/engagement-models/page.tsx` → `/how-we-work/engagement-models`, alongside the existing `app/how-we-work/orbit-ai-ecosystem/`.
**Rationale**: Spec FR-001 names "How We Work" as the parent segment; the route segment already exists (created for Orbit AI Ecosystem), so this feature only adds a sibling folder, not a new top-level segment.
**Alternatives considered**: None — this is the only naming consistent with the existing sibling page and the CMS slug (`engagement-models`).

## 2. Content architecture: CMS-backed, not static

**Decision**: CMS-backed via a new `cms/api/how-we-work/engagement-models.ts` (React `cache()` + `fetchCms<StrapiEngagementModelsPage>("/api/pages/by-slug/engagement-models")`), mirroring `cms/api/how-we-work/orbit-ai-ecosystem.ts` structurally. `page.tsx` is an async Server Component calling `notFound()` when the fetch returns `null`.
**Rationale**: Both pages spec.md's FR-001/FR-005/FR-007 cite as the architectural pattern to follow (`app/what-we-do/ai-modernization/`, `app/how-we-work/orbit-ai-ecosystem/`) are, in the actual current codebase, CMS-backed at runtime via `cms/api/what-we-do/ai-modernization.ts` and `cms/api/how-we-work/orbit-ai-ecosystem.ts` respectively — not static content modules. (Orbit AI Ecosystem's own `specs/TMS-88/spec.md` documented a deliberate decision to build it *static* despite a live CMS entry existing at the time; the shipped code shows that decision was later superseded and the page is CMS-backed today. This plan follows the codebase as it actually stands, not that superseded historical decision.) During this feature's own planning, a `GET /api/pages/by-slug/engagement-models` request was confirmed live and fully populated, returning exactly 5 sections — hero, `pd-modernization-capabilities` (3 cards), `modernization-challenges` (7 chips, titled "Why Organizations Choose TechGrit"), a new `about-us.audience-insight` component (2-group goal→model comparison, titled "Not Sure Which Model Fits Your Needs?"), and `cta-banner` — a content shape that lines up section-for-section with spec.md's FR-002 through FR-007a. Building against this confirmed live entry is lower-risk than authoring a parallel static content module that would silently drift from the CMS the moment an editor updates it there instead.
**Alternatives considered**: A static local content module (`app/construction/`'s pattern) — this was the initial recommendation before the live entry was confirmed; rejected once the entry's existence and full population were verified, since maintaining a static duplicate of already-live CMS content would just be a second, driftable source of truth for no benefit. A hybrid (some sections CMS, some static) — rejected as unjustified complexity; every section this spec needs already has a live CMS counterpart.
**Note on spec.md alignment**: This is a "HOW" (implementation) decision, not a spec-level ("WHAT/WHY") one — spec.md's FRs describe required content and behavior, which the CMS entry happens to satisfy; spec.md was not modified to describe the data-fetch mechanism.

## 3. Card/section component reuse vs. new components

**Decision**: The hero and "Three engagement models" sections map onto existing primitives/types; only the "Why TechGrit engagements" checklist layout and the new "Find Your Fit" comparison need new route-local rendering.

| Section | CMS component | Rendering approach |
|---|---|---|
| Hero | `page-reusable-sections.hero` | `components/ui/Hero.tsx` with `mediaFill` + `MediaSlot`, identical to `orbit-ai-ecosystem`'s hero usage — CMS-supplied `backgroundImage` fills the fixed-size right container (FR-003), no secondary CTA (CMS ships none) |
| Three engagement models | `page-reusable-sections.pd-modernization-capabilities` | Same `GlassCard` `serviceCapability` variant + category-label/title/subtitle/feature-list/structure-tag markup already built for Orbit AI's capability cards (`FrameworkCard` shape), reused with 3 cards instead of 5 — `md:grid-cols-2 lg:grid-cols-3` already degrades correctly for a 3-card grid with no changes |
| Why TechGrit engagements | `page-reusable-sections.modernization-challenges` | Same underlying data shape as Orbit AI's `ChallengesSection`/`ChallengeChip` (eyebrow, title, description, `features[]` with icon+title), rendered as a 2-column grid collapsing to 1 column on mobile (FR-006, Clarification Q9), matching the reference's own `.why-grid`. Eyebrow renders the CMS field directly with no fallback — nothing is shown when it is null (Q8) |
| Not Sure Which Model Fits Your Needs? | `about-us.audience-insight` (new to this codebase) | No existing parser or renderer anywhere in the repo for this CMS component. New types + a new route-local component render the `concernsCard` 2-group array as two side-by-side columns (Clarification Q4), stacking at `sm` (Q5). Eyebrow renders `badgeLabel` directly with no fallback — nothing is shown when it is null (Q8 supersedes Q6) |
| Closing CTA | `page-reusable-sections.cta-banner` | `components/ui/final-cta.tsx`, identical `tone="orange"` configuration already used by `ai-modernization`/`orbit-ai-ecosystem` |

**Rationale**: Reuses everything Principle III already provides; only builds new markup where the spec explicitly requires a shape (single-column list; 2-column comparison) that doesn't exist yet, exactly the "reuse first, create only what's missing" mandate.
**Alternatives considered**: Generalizing Orbit AI's chip-grid component with a `columns` prop instead of a separate component — considered, but the two renderings differ enough (single persistent column vs. a responsive 1→2→3 grid, plus this page's rows read as a flat checklist rather than wrapped chips) that forcing one component to cover both would add a branching prop for a single consumer on each side; kept as two small, independent route-local components instead, consistent with Principle III's "nothing moves to `components/` until genuinely consumed by more than one route."

## 4. "Find Your Fit" data shape

**Decision**: New types in `cms/types/engagement-models-types.ts`:
```ts
type StrapiAudienceInsightQuestion = { id: number; question: string; icon: StrapiMedia | null };
type StrapiAudienceInsightGroup = { id: number; title: string; questions: StrapiAudienceInsightQuestion[] };
type StrapiAudienceInsightSection = {
  title: string; subtitle: string | null; badgeLabel: string | null;
  concernsCard: StrapiAudienceInsightGroup[]; // exactly 2 groups: "Your Goal", "Recommended Model"
  __component: "about-us.audience-insight";
};
```
Rendering type: `FindFitSection { type: "findFit"; order; eyebrow?: string; title: string; goalColumn: { label: string; rows: { id: string; text: string; icon: SectionImage | null }[] }; modelColumn: { label: string; rows: { id: string; text: string }[] } }`. The parser asserts `concernsCard.length === 2` and maps index 0 → goal column, index 1 → model column (order confirmed by the live payload: "Your Goal" first, "Recommended Model" second); rows are paired by array index across both groups. `eyebrow` is `badgeLabel` taken as-is (undefined when null, per Q8) — no fallback string.
**Rationale**: `about-us.audience-insight` is a generic, reusable Strapi component (its name doesn't imply it's About-page-exclusive — the live payload proves it's already used on this page too), but nothing in this codebase parses it yet; `specs/001-about-us-page/contracts/about-us-page-response.json` describes a *different*, page-specific `about-us-who-you-are` component/shape for the About page itself, so that contract cannot be reused directly.
**Alternatives considered**: Reusing the About page's static `WhoYouAreSection`/`concernsCard` type (situationsLabel/situations/label/concerns) — rejected; shapes don't match (that type has 2 *named* fixed slots with different field names, this CMS component has a generic 2-item *array* of `{title, questions}` groups).

## 5. Nav/footer repointing

**Decision**: Update `cms/api/footer.ts`'s "How We Work → Engagement Models" link's `href` to `/how-we-work/engagement-models` (currently a placeholder/anchor per the pre-migration footer config).
**Rationale**: Mirrors the exact, minimal precedent set by prior "How We Work"/"What We Do" page additions (one-line footer href edit, FR-011).
**Alternatives considered**: None — leaving the old href would mean the site's only "Engagement Models" footer entry point doesn't reach the new page.

## 6. Ambient background orbs

**Decision**: No change needed. `components/ui/ambient-orbs.tsx` already has a `pathname?.startsWith("/how-we-work/")` branch (added for Orbit AI Ecosystem) that covers this new route automatically.
**Rationale**: The existing branch matches on the whole `/how-we-work/` segment, not a specific page, so `/how-we-work/engagement-models` inherits the same 4-orb geometry with zero new code.
**Alternatives considered**: N/A.

## 7. Icon reuse audit

**Decision**: No new SVGs added to `components/ui/icons.tsx`. Both the "Why TechGrit engagements" checklist and the "Your Goal" column of the "Find Your Fit" section render icons directly from CMS media URLs (`StrapiMedia.url` via `next/image`), exactly as Orbit AI's existing chip grid already does for its icon chips — no local icon component needed for either.
**Rationale**: The live CMS payload supplies a real icon asset per "why" item and per "Your Goal" row; matches the established `toIconImage()` → `<Image src={icon.url}>` pattern already proven in `cms/api/how-we-work/orbit-ai-ecosystem.ts` / `orbit-ai-challenges.tsx`.
**Alternatives considered**: Mapping each item to a hand-picked icon from `components/ui/icons.tsx` — rejected; unnecessary since the CMS already supplies real per-item icon assets, and would drift from the CMS if an editor changes an icon there.

# Implementation Plan: Healthcare Industry Page

**Branch**: `TMS-67-healthcare` | **Date**: 2026-08-25 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-67-healthcare/spec.md`

## Summary

Build the Healthcare industry page (`/industries/healthcare`) as eight CMS-driven, component-wise
content sections — hero, "What We Build", "AI Across the Healthcare Product Lifecycle", "Our
HealthTech Engineering Services", "HealthTech Solutions We Support", "Featured Capabilities",
"Connected Healthcare Systems That Work Together", and a closing CTA — following the exact
file/folder architecture, CMS-fetch pattern, and design-token discipline already established by
the Industries/Construction page (`app/industries/construction/`). Content is sourced live from
Strapi (`GET /api/pages/by-slug/construction`'s sibling, `by-slug/healthcare`), not a static dummy
module, via a new `cms/api/healthcare.ts` + `cms/types/healthcare.ts` pair mirroring
`cms/api/construction.ts` / `cms/types/construction.ts`. No integrations strip and no
lifecycle-diagram (SVG node/connector) component are built for this page. Five of the eight
sections directly reuse an existing Construction/`components/ui` visual pattern; two sections
("HealthTech Solutions We Support" and "Connected Healthcare Systems That Work Together") need one
new, small, page-local component each, since no existing pattern covers their shape (see
research.md §4, §6, §7).

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (CSS-first
`@theme`), `next/image`
**Storage**: N/A — content is fetched live from Strapi at request time (`cache: "no-store"`, per
`cms/api/fetcher.ts`); no database access from this app. The real response payload captured during
specification (see spec.md's Clarifications) drives `cms/types/healthcare.ts`'s typing and mapping.
**Testing**: No automated test framework is configured in this repo; verification is manual
(`npm run dev` + `quickstart.md`'s walkthrough) plus the existing `npm run lint` / `npm run build`
Husky pre-commit gate.
**Target Platform**: Web — Next.js App Router page (`/industries/healthcare`), server-rendered,
responsive across mobile/tablet/desktop.
**Project Type**: Single web application (existing `app/` tree — no frontend/backend split).
**Performance Goals**: Standard marketing-page expectations — SC-001 (value prop identifiable
within the first screen), no additional numeric target.
**Constraints**: Must comply with constitution Principles I–VI (token-only styling; the 1140/960/
560 breakpoint contract; reuse of `components/ui/*` and existing `GlassCard`/`Button`/`FinalCta`
components; `raw-files`/CMS content treated as data, never copy-pasted markup; dark-first brand
system; `frontend-design` skill consulted for the two genuinely new UI patterns, Constitution
Principle VI). Route-local code stays under `app/industries/healthcare/`; the two new
CMS-fetch/type files stay in `cms/api/` and `cms/types/` per the existing per-page convention.
**Scale/Scope**: One CMS-driven page, 8 sections, no auth, no pagination, no forms.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. Token-Only Styling | All section styling uses existing tokens/Tailwind utilities from `@theme inline`; no new hardcoded hex/px/rgba values anticipated (research.md §9) — the two new components reuse existing `GlassCard`/pill/border tokens, not new ones. | PASS |
| II. Documented Breakpoint Contract | Reuses `sm:`/`md:`/`lg:` (560/960/1140px) throughout, including the new 3/2/1-column "HealthTech Solutions We Support" grid, which maps exactly onto the existing `sm`/`md` steps (research.md §6) — no new breakpoint introduced. | PASS |
| III. Centralized, Non-Duplicated Component Library | Reuses `components/ui/Button.tsx`, `components/ui/GlassCard.tsx`, `components/ui/section-eyebrow.tsx`, and `components/ui/final-cta.tsx` wherever a section's pattern already matches Construction's. Every icon rendered on this page comes straight from the CMS (research.md §5 — no fallback), so `components/ui/icons.tsx` is not touched by this feature. Two new components are added only where no existing pattern covers the shape (dense title-only tile grid; single-card bulleted category list) — both scoped to this page's own `_components/` folder per the "nothing moves to `components/` until genuinely consumed by more than one route" rule, consistent with spec.md's Assumptions. | PASS |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | The real CMS JSON payload (captured in spec.md's Clarifications) is the structural/content source of truth; it's mapped into typed presentation shapes (data-model.md) exactly as Construction's CMS payload is, never rendered from raw Strapi field names directly in JSX. | PASS |
| V. Dark-First Brand System | Page uses the existing dark ink surface, orange→amber accent gradient (CTA/eyebrow/accent only), and the existing font stack via `next/font` — no new theme variant, no new named framework term beyond the already-established OrbitAI™. | PASS |
| VI. UI Craft via `frontend-design` Skill | Invoked during planning for the two genuinely new patterns (dense tile grid; single-card bulleted category list) — see "UI Design Approach" below. The five sections that directly reuse an existing Construction pattern don't need fresh creative direction; they inherit it from the pattern they're reusing. | PASS |

No violations — Complexity Tracking table is not needed.

## UI Design Approach

**UI mode detection**: UI mode ON — tech signal (Next.js/React page under `app/industries/`) plus
content signal (a full marketing page with hero, cards, CTAs).

**`frontend-design` skill invocation**: Asked for craft direction on the two genuinely new
patterns — the 17-item dense tile grid and the single-card bulleted category list — specifically
how to keep them reading as part of the existing Construction/`GlassCard` design system rather
than introducing a new visual language.

**Reconciliation with Principles I–V**: The skill's default instinct (per its own guidance) is to
push for a bold, distinctive new aesthetic treatment per component; that's overridden here per
Principle VI's stated boundary — this page's job is visual continuity with Construction, not a
fresh design language. Concretely:

- **Dense tile grid ("HealthTech Solutions We Support")**: small `GlassCard`-style tiles (existing
  border/background/radius tokens, no new ones), title-only, tighter padding than Construction's
  richer cards to suit 17 short items; a subtle hover-lift consistent with Construction's
  Solutions/Impact cards (not Challenges, which has none) signals interactivity-free visual parity
  without inventing a new motion language.
- **Single-card bulleted category list ("Connected Healthcare Systems That Work Together")**: one
  `GlassCard` panel; each category bullet uses the existing hairline `border-b` divider pattern
  already established by `ConstructionAdvantage`'s numbered list, with the category name as a
  small bold label and its feature titles rendered as small pill/chip tags (reusing the existing
  `--radius-pill` token and a muted glass background) wrapping within the row — visually a cousin
  of `ConstructionAdvantage`'s divided-row layout, not an unrelated new pattern.

**Anchor components / files affected**: `app/industries/healthcare/page.tsx`,
`app/industries/healthcare/_components/*.tsx` (8 section components, 2 of them new), `cms/api/healthcare.ts`,
`cms/types/healthcare.ts`. No changes anticipated to `app/tokens.css` or `app/globals.css`.

## Project Structure

### Documentation (this feature)

```text
specs/TMS-67-healthcare/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── checklists/
│   └── requirements.md
└── tasks.md              # Phase 2 output (/speckit.tasks — generated next)
```

### Source Code (repository root)

```text
cms/
├── api/
│   └── healthcare.ts            # NEW — mirrors cms/api/construction.ts's fetch/parse/assemble pattern
└── types/
    └── healthcare.ts             # NEW — raw Strapi shapes + presentation shapes per data-model.md;
                                   # imports StrapiHeroSection/StrapiCtaBannerSection/StrapiServiceDetailSection/
                                   # SectionIcon/mapSectionIcon from cms/shared/reusable-sections.ts

app/industries/
├── construction/                 # existing — untouched by this feature
└── healthcare/
    ├── page.tsx                  # NEW — composition root, mirrors app/industries/construction/page.tsx
    └── _components/
        ├── healthcare-hero.tsx                    # NEW — mirrors construction-hero.tsx, single CTA, no stats block
        ├── healthcare-what-we-build.tsx            # NEW — mirrors construction-challenges.tsx, extended with description
        ├── healthcare-product-lifecycle.tsx        # NEW — mirrors construction-solutions.tsx, step label 1-6 instead of icon
        ├── healthcare-engineering-services.tsx     # NEW — mirrors construction-solutions.tsx's icon-card grid (not construction-advantage's numbered rows)
        ├── healthcare-solutions-we-support.tsx     # NEW — new dense title-only tile grid component (research.md §6)
        ├── healthcare-featured-capabilities.tsx    # NEW — mirrors construction-impact.tsx's GlassCard style, metric/link omitted
        └── healthcare-connected-systems.tsx        # NEW — new single-card bulleted-category-list component (research.md §7)
        # (no healthcare-final-cta.tsx — closing CTA renders via components/ui/final-cta.tsx, same as Construction)

components/ui/
├── Button.tsx           # existing — reused as-is (hero CTA)
├── GlassCard.tsx         # existing — reused as-is; new variant keys may be added for the 2 new sections'
                          # card styling if their padding/radius doesn't match an existing variant exactly
├── final-cta.tsx         # existing — reused as-is for the closing CTA
└── section-eyebrow.tsx   # existing — reused as-is
```

**Structure Decision**: New page under `app/industries/healthcare/`, exactly mirroring
`app/industries/construction/`'s file layout (one `page.tsx` composition root + a private
`_components/` folder, one component per section). New CMS-fetch/type files live in the existing
`cms/api/` / `cms/types/` directories, mirroring the per-page pattern `construction.ts` already
establishes there. No new top-level directory introduced; the two genuinely new UI patterns stay
page-local under `_components/` per the constitution's "nothing moves to `components/ui/` until
consumed by a second route" rule.

## Complexity Tracking

No violations — this section is not needed.

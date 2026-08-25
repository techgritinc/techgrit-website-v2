# Implementation Plan: AI-Accelerated Modernization Page (What We Do)

**Branch**: `feature/TMS-86-what-we-do-ai-acclerated-modernization-page` | **Date**: 2026-08-20 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `specs/TMS-86/spec.md`

## Summary

Build a new static page at `/what-we-do/ai-modernization` that reproduces `raw-files-v3/TechGrit Website V2.3/TechGrit AI Modernization.dc.html` pixel-for-pixel: hero (with the stat-tile card replaced by `public/samples/dm-tech-debt.png`), intro/blockers block, six-capability grid, five-stage lifecycle strip, six-tile strategy band, six-tile "why" grid, three industry cards, five-item native FAQ accordion, six related-service cards, and a closing CTA band. The page is a static content-config → component composition (mirroring `app/construction/` and `app/services/`), reusing the shared `Header`/`Footer`, `GlassCard`, `Button`, `Badge`, `SectionEyebrow`, and `FinalCta` wherever their existing shape fits, and introducing six genuinely reusable `components/ui/` primitives: `Hero` and `ContentBlock` (confirmed reusable — the six sibling "What We Do" page prototypes already in this repo share this page's hero/intro markup structure verbatim), a numbered `ProcessSteps` strip, a compact `IconTile`, an `Faq` accordion, and an `Outcome` heading+description block (built ahead of this page's own need, per confirmed product direction — see Complexity Tracking).

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (`@tailwindcss/postcss`, CSS-first `@theme`)
**Storage**: N/A — all content is a static local TypeScript content module (`app/what-we-do/ai-modernization/_data/`), no persistence, no CMS calls, per FR-008
**Testing**: No test framework configured in this repo (no Vitest/Jest, no `*.test.*`); verification is `npm run lint` + `npm run build` (Husky pre-commit gate) plus manual/browser-preview visual comparison against the reference file
**Target Platform**: Web (evergreen desktop + mobile browsers), server-rendered via Next.js App Router
**Project Type**: Single Next.js application rooted at `app/` (no monorepo, no `apps/`/`packages/`)
**Performance Goals**: N/A beyond standard Next.js SSR page defaults — no feature-specific performance target (static content, no client data fetching)
**Constraints**: Zero content deviation from the reference (FR-001); pixel-exact visual match at the reference's desktop width (FR-006); no new client-side state beyond what's needed for the FAQ's independent expand/collapse, which native `<details>`/`<summary>` provides for free (FR-008)
**Scale/Scope**: One new page, ~10 sections, ~4 new shared `components/ui/` primitives, 1 pre-existing-pattern reuse set (Header/Footer/GlassCard/Button/Badge/SectionEyebrow/FinalCta), 1 footer-config edit (FR-011)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. Token-Only Styling | All colors/spacing/radii/shadows for new markup sourced from `tokens.css`/`globals.css`'s existing `@theme inline` scale; no new tokens anticipated (orange/amber/blue accents, glass backgrounds, and the `--radius-*`/`--space-*`/text-opacity ladder already cover every value the reference uses). Any genuinely new value found during implementation gets added to `tokens.css` first, per Principle I, before use. | PASS (verify no new token needed at Phase 1) |
| II. Documented Breakpoint Contract | Page uses the existing `lg:`/`md:`/`sm:` (1140/960/560) breakpoints for its grid collapses (6→3→1, 5→2→1, hero 2-col→1-col). The reference's own media queries (920px/640px in the `.dc.html`) do **not** coincide with this contract — per Principle II, a full-page reference file's own literal breakpoint values are superseded by the canonical 960/560 contract, not treated as new pixel values to copy. No arbitrary breakpoint values are introduced; the visual collapse points shift by ≤40px from the reference as a result, which is the same tolerance every other full-page route in this repo already accepts. | PASS |
| III. Centralized, Non-Duplicated Component Library | Reuses `GlassCard`/`Button`/`Badge`/`SectionEyebrow`/`FinalCta`/`icons.tsx` wherever the shape fits; new shared primitives (`Hero`, `ContentBlock`, `ProcessSteps`, `IconTile`, `Faq`, `Outcome`) go in `components/ui/`, not per-route; remaining route-local composition stays in `app/what-we-do/ai-modernization/_components/` and `_data/`, mirroring `app/construction/`. No per-route icon file. | PASS, with one documented exception — see Complexity Tracking |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | `.dc.html`'s `x-dc`/`DCLogic`/`{{ }}` scaffolding is not copied; inline hex/px values map to tokens; the FAQ's native `<details>`/`<summary>` markup in the reference is reused as real semantic HTML (not a DCLogic-driven accordion) since it already matches React/HTML directly. | PASS |
| V. Dark-First Brand System | Page inherits the site's `#000` surface, white-on-dark text ladder, orange→amber accent (never as a fill), Calibri/Carlito type. No new brand elements introduced. | PASS |
| VI. UI Craft via `frontend-design` Skill | UI mode ON (tech signal: Next.js/React; content signal: hero/section/card/CTA). Skill invoked during `/speckit.plan` — see "UI Design Approach" below. | PASS |

No violations requiring Complexity Tracking justification.

## UI Design Approach

**UI mode detection**: UI mode ON — tech signal (Next.js 16 + React 19, this repo's permanent default) AND content signal (spec.md and this plan reference hero, section, card, FAQ, CTA throughout).

**`frontend-design` skill invocation**: Asked the skill for guidance on (1) which of this page's card/tile patterns should share one `GlassCard` variant vs. need distinct treatment, (2) a motion/reveal strategy consistent with the existing `tg*` keyframes and `RevealOnScroll`, and (3) how to make the hero's stat-card→image-card swap read as an intentional content choice rather than a placeholder swap.

**Reconciliation with Principles I–V**: The skill's core mandate — pick a bold, distinctive aesthetic direction (unique type pairing, unexpected color story, novel motion) — yields entirely to Principle IV (the reference file is visual truth, not a starting point) and Principle V (the existing dark-first orange→amber brand system, Calibri/Carlito type, and `tg*` motion vocabulary are fixed). There is no new aesthetic to invent here: this is a pixel-exact reproduction of an already-art-directed reference inside an already-established design system. What the skill usefully contributes is *craft precision* within those constraints:
- **Hero as a shared primitive**: the reference's hero right-card *wrapper* (34px padding, 24px radius, gradient background, decorative blurred-orb corner, bottom-divider caption row) is confirmed byte-identical across every sibling "What We Do" prototype inspected — only the card's main content (this page's stat grid, now an image) and the caption text vary. `components/ui/Hero.tsx` therefore owns that wrapper chrome generically and exposes exactly two content slots — `media: ReactNode` and `mediaCaption?: string` — rather than hardcoding "stat grid" or "image" as the only options. Same treatment for `components/ui/ContentBlock.tsx`'s two-column shape (left eyebrow/title/description, right chips-label + chip list) — confirmed identical across the same sibling set, always exactly a label plus a wrapping chip list, so the component takes a typed `chips: string[]` prop rather than an unconstrained `ReactNode` escape hatch it doesn't need.
- **Card/tile variant strategy**: the reference's `.cap-card` (numbered eyebrow + heading + lead + bullet list, no icon) needs a new generic `GlassCard` variant (bulleted capability card — reusable by any sibling "What We Do" page with the same "our N services" pattern). The reference's `.why-tile` (icon-left, 40×40 icon, heading + description, no list) is close to the existing `reimagineWhy` variant's shape; the reference's `.rel-card` (icon-left, smaller type scale, tighter padding) and the "Industries we modernize" cards are close to the existing `industry` variant. Where an existing variant is within the reference's exact spacing/type-scale tolerance, reuse it as-is; where the reference specifies exact values an existing variant doesn't hit (e.g. a 40px icon box where the closest variant ships 44px), add one new narrowly-scoped variant rather than forcing a mismatch — never a bespoke one-off card implementation outside `GlassCard`.
- **Motion**: stagger hero reveals via the existing `[data-rise]`/`tgrise` pattern (already used site-wide for hero eyebrow→headline→paragraph→CTA staggering) and wrap each below-the-fold section in the existing `RevealOnScroll` component (IntersectionObserver-based, SSR-safe) exactly as `app/construction/_components/*` and `app/services/_components/*` already do — no new animation vocabulary.
- **Hero image swap**: the image must fill the *same* card frame that the stat grid currently occupies, at the same aspect/position — not a smaller image floating inside leftover chrome. Cropped/`object-cover` fill within `Hero`'s card geometry, with the "PRISM™ · OrbitAI™ frameworks" caption line retained below it via `mediaCaption` exactly as today, keeps the swap reading as "this card's content is a product illustration" rather than "we removed something and left a gap."

**Anchor components / files affected**:
- New: `app/what-we-do/ai-modernization/page.tsx`, `_components/*.tsx` (capability-grid, lifecycle-strip, strategy-band, why-grid, industries-grid, faq, related-services — 7 files; hero and content-block are no longer route-local, see below), `_data/ai-modernization-content.ts`, `_data/types.ts`
- New shared: `components/ui/Hero.tsx` (generic hero primitive — crumbs, eyebrow, headline w/ gradient-highlight span, subtitle, primary+secondary CTA, `media`/`mediaCaption` card slots), `components/ui/ContentBlock.tsx` (generic two-column eyebrow/title/description + chips-label/chip-list primitive), `components/ui/ProcessSteps.tsx` (numbered lifecycle strip), `components/ui/IconTile.tsx` (icon-led compact tile/card — covers "why" tiles and related-service cards via props), `components/ui/Faq.tsx` (native-`<details>` accordion), `components/ui/Outcome.tsx` (heading+description block, per FR-012 — built but unused on this page). All six are grounded per Complexity Tracking, above.
- Extended (new variant only, not modified behavior): `components/ui/GlassCard.tsx` (one new `CARD_VARIANTS`/`ICON_VARIANTS`/`TITLE_VARIANTS`/`DESC_VARIANTS` entry for the bulleted capability card)
- Extended: `components/ui/ambient-orbs.tsx` (new branch for `/what-we-do/`, matching the reference's own 4-orb geometry — see research.md §Ambient Orbs; its pre-existing pattern of hardcoded `rgba(...)` literals instead of tokens is left untouched, out of this ticket's scope)
- Edited (minimal, FR-011): `cms/api/footer.ts` (one `href` value)
- `page.tsx` renders `Hero`, `ContentBlock`, and `components/ui/final-cta.tsx` directly from its section `switch` with this page's content as props — the same pattern `app/construction/page.tsx` already uses for `FinalCta`, now extended to all three page-level primitives.
- Reused unmodified: `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/layout/HeaderClient.tsx`, `components/ui/GlassCard.tsx` (`industry`/`reimagineWhy` variants), `components/ui/Button.tsx`, `components/ui/Badge.tsx`, `components/ui/section-eyebrow.tsx`, `components/ui/final-cta.tsx`, `components/ui/reveal-on-scroll.tsx`, `components/ui/icons.tsx` (existing icon exports, extended only with genuinely new shapes) — non-modification of Header/Footer is verified by an explicit task in tasks.md's Polish phase, not left to be assumed by omission.

## Project Structure

### Documentation (this feature)

```text
specs/TMS-86/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md         # Phase 1 output
└── tasks.md              # Phase 2 output (/speckit.tasks — generated immediately after this plan)
```

### Source Code (repository root)

```text
app/
└── what-we-do/
    └── ai-modernization/
        ├── page.tsx                              # route entry — /what-we-do/ai-modernization
        │                                          # renders Hero/ContentBlock/FinalCta directly + 7 route-local components below
        ├── _data/
        │   ├── types.ts                          # AiModernizationSection union + entity types
        │   └── ai-modernization-content.ts        # verbatim reference content, in section order
        └── _components/
            ├── ai-modernization-capabilities.tsx   # 6-card capability grid (uses GlassCard new variant)
            ├── ai-modernization-lifecycle.tsx      # 5-stage strip (uses components/ui/ProcessSteps)
            ├── ai-modernization-strategies.tsx     # 6-tile strategy band
            ├── ai-modernization-why.tsx            # 6-tile "why" grid (uses IconTile or GlassCard reimagineWhy)
            ├── ai-modernization-industries.tsx     # 3-card industries grid (GlassCard industry variant)
            ├── ai-modernization-faq.tsx             # 5-item FAQ (uses components/ui/Faq)
            └── ai-modernization-related.tsx         # 6-card related-services grid (IconTile)
            # hero and content-block are components/ui/Hero + ContentBlock, not route-local (FR-009)
            # closing CTA renders components/ui/final-cta.tsx directly from page.tsx, as construction/page.tsx does

components/ui/
├── GlassCard.tsx           # +1 new variant, existing file otherwise untouched
├── Hero.tsx                 # NEW — generic hero primitive (FR-009; confirmed reused by sibling prototypes)
├── ContentBlock.tsx         # NEW — generic eyebrow/title/description + chip-list primitive (FR-009)
├── ProcessSteps.tsx        # NEW — generic numbered process-step strip
├── IconTile.tsx            # NEW — generic icon-led compact tile/card
├── Faq.tsx                 # NEW — generic native-<details> FAQ accordion
├── Outcome.tsx             # NEW — generic heading+description block (FR-012, unused on this page)
└── ambient-orbs.tsx        # +1 new pathname branch, existing file otherwise untouched

cms/api/footer.ts            # 1-line href edit (FR-011)
```

**Structure Decision**: Follows the established `app/<route>/_data/` + `app/<route>/_components/` + `page.tsx` composition pattern used by `app/construction/` and `app/services/` — a content-config array of typed sections mapped to components in `page.tsx`'s `switch (section.type)`, exactly like `app/construction/page.tsx`. Genuinely cross-page-reusable pieces go in `components/ui/`, never route-local, per Principle III and FR-009/FR-012 — this now includes `Hero` and `ContentBlock` (not just `ProcessSteps`/`IconTile`/`Faq`/`Outcome`), since the sibling-prototype evidence gathered during planning confirmed their reuse is concrete, not hypothetical (see Complexity Tracking).

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| `Hero`, `ContentBlock`, and `Outcome` are created in `components/ui/` with only one current route consumer (this page) — the letter of Additional Constraints' "nothing moves there until it's genuinely consumed by more than one route" is not met on day one. | The six sibling "What We Do" service page design prototypes already exist in this repo (`raw-files-v3/TechGrit Website V2.3/TechGrit {Product Engineering, Data AI, Platform Engineering, Managed Services, AI Strategy, Startups}.dc.html`, confirmed via direct inspection) and share this page's Hero/Intro markup structure verbatim — same card chrome, same two-column content-block layout, same six-chip list shape, differing only in copy/stats/images. Product direction has confirmed these are the next pages to be built, consuming the same components. This is a documented, evidence-backed second (and further) consumer, not a hypothetical one — the "speculative structure" the Constitution's rule guards against. `Outcome` (FR-012) is the one primitive with no confirmed textual match in any sibling prototype's markup today, but is included in this same exception per explicit product-direction confirmation (not file evidence) that upcoming pages will use an Outcome section; it is kept deliberately minimal (heading + description only) to bound the risk of guessing wrong. | Keeping `Hero`/`ContentBlock` route-local now and "promoting" them to `components/ui/` only once a second page is actually implemented would mean shipping working code once, then relocating and retrofitting props-based configurability after the fact — for a shape already proven, via the existing sibling prototypes, to need that configurability from day one. That rework is pure waste given the evidence already in hand. `Outcome` in particular is kept intentionally narrow (two props, no variants, no speculative options) specifically so that if product direction is wrong about the pattern, the cost of being wrong is one small unused file, not a wrongly-shaped abstraction other pages have to work around. |

This is a documented exception recorded here per explicit review decision, not a reinterpretation or amendment of the Constitution's rule (which continues to apply as written for any future primitive lacking this kind of concrete, evidenced second consumer).

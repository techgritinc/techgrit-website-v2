# Research: Data & AI Engineering Page (TMS-86-data-and-ai-engineering)

## 1. Route & folder structure

**Decision**: `app/what-we-do/data-ai-engineering/page.tsx` → `/what-we-do/data-ai-engineering`, with `_components/` and `_data/` colocated per Next.js's `_`-prefixed private-folder convention — the exact same shape as `app/what-we-do/ai-modernization/` and `app/what-we-do/software-product-engineering/`.

**Rationale**: The user's request explicitly requires following "the same folder and file architecture already established for AI-Accelerated Modernization and Software Product Engineering." That family already established the `what-we-do` parent segment and the `_components/`/`_data/` shape; there is nothing left to decide here, only to replicate.

**Alternatives considered**: None — the architecture is a direct, explicit requirement, not an open design choice.

## 2. Content/data layer: static module vs. CMS integration

**Decision**: A plain static, typed content array in `_data/data-ai-engineering-content.ts` (discriminated by a `type` field per section), rendered by a `switch` in `page.tsx` — no CMS fetch, no `async`/`await` data layer.

**Rationale**: Resolved by clarification (spec.md, Session 2026-08-24, Q1). Both sibling pages shipped this exact way first (`app/construction/`'s pattern) and only later received CMS integration as their own separate, dedicated tickets. Direct inspection of the *current* `app/what-we-do/{ai-modernization,software-product-engineering}/page.tsx` confirms both now call an async `getXData()` CMS fetcher — but this feature's scope is static-only, matching the siblings' original, pre-upgrade shape and FR-008.

**Alternatives considered**: Wiring `getDataAiEngineeringData()` against a new `cms/api/what-we-do/data-ai-engineering.ts` module now, matching the siblings' *current* (post-integration) shape — rejected because nothing in this request asks for CMS wiring, a live Strapi page/slug for this content isn't confirmed to exist, and building it now would be scope creep the user did not authorize (Constitution Development Workflow: no speculative work ahead of an actual ticket).

## 3. Component reuse — zero new shared primitives

**Decision**: Every section maps onto an existing, unmodified `components/ui/` primitive:

| Section | Component | Notes |
|---|---|---|
| Hero | `Hero` (`mediaFill`, `media=<MediaSlot fill .../>`, `mediaCaption` set) | Same shape as both siblings' hero — eyebrow, gradient-highlighted title, subtitle, CTA pair, right-side image card — with the caption row kept beneath the image (per Clarifications), matching the AI-Modernization sibling's card rather than the Software-Product-Engineering sibling's caption-less one. |
| Intro / "Where AI programs stall" | `ContentBlock` | Same `0.9fr 1.1fr` two-column shape, `chipsLabel` + 6 `chips`, verified byte-identical structure in the reference against both siblings' own INTRO sections. |
| Capabilities (6 cards) | `GlassCard` variant `serviceCapability` + `GlassCardTitle`/`GlassCardDescription` | Same numbered-eyebrow + heading + lede + bullet-list shape both siblings' own capability sections already use this exact variant for — no new variant needed. Heading corrected "Five" → "Six" per Clarifications. |
| Discover/Build/Enable/Govern/Optimize (5 stages) | `ProcessSteps` | Directly reusable — same numbered-step shape, same 5-item count. |
| Why AI-first data engineering (6 tiles) | Page-local `WhyTile` (icon + heading + description, 2-col grid) | Both siblings' own equivalent "why" sections implement this exact same shape as a page-local component, not a shared primitive — this page follows that same precedent rather than introducing a new shared abstraction for a pattern both siblings themselves chose to keep route-local. |
| Industries we empower (3 cards) | `GlassCard` variant `serviceCapability` (icon + title + description, linked) | Same shape and same variant both siblings' own Industries sections already reuse, on the same 4-column-track-with-3-cards layout (Edge Cases). |
| FAQ (5 items) | `Faq` | Directly reusable — native `<details>`/`<summary>`, `defaultOpen` on the first item. |
| Related services (6 cards) | `IconTile` (`size="compact"`) | Directly reusable — same icon-left compact tile shape both siblings' own "Related services" sections already use. |
| Closing CTA | `final-cta` (`FinalCta`) | Directly reusable — same tone/props shape both siblings' `finalCta` section type already consumes. |

**Rationale**: Confirmed by direct inspection of every `app/what-we-do/software-product-engineering/_components/*.tsx` file (its still-documented static shape, per its own `research.md`/`data-model.md`) and every relevant `components/ui/*.tsx` file during planning — not inferred. Principle III requires reusing an existing shared primitive wherever it fits and forbids duplicating one; this reference's section shapes are, section-for-section, the same shapes both sibling prototypes already had.

**Alternatives considered**: Extracting the page-local `WhyTile` pattern into a new shared `components/ui/` primitive now that a third page needs the identical shape — considered, but rejected for this ticket: both sibling pages made the deliberate choice to keep it page-local (not a "we forgot" gap), and promoting it is an unrelated, options-widening scope decision the user did not ask for (Constitution: don't pre-scaffold structure ahead of an actual, current need being blocked by its absence — this page is not blocked, since a third page-local copy costs ~25 lines and violates no functional requirement).

## 4. Icon selection for "why" tiles, industries, and the related-service gap

**Decision**:

- **"Why AI-first data engineering" tiles (6)** — all six map onto existing generic icons already in `components/ui/icons.tsx`, chosen for closest semantic/visual match to the reference's own inline SVGs (a checkmark-in-circle, forward chevrons, a settings/network glyph, ascending bar lines, a shield outline, and a star badge, respectively):
  | Tile | Icon component |
  |---|---|
  | Improve data quality | `CheckCircleIcon` |
  | Accelerate AI adoption | `LightningIcon` |
  | Enable intelligent automation | `NetworkNodeIcon` |
  | Better decisions | `TrendingUpIcon` |
  | Scale responsibly | `ShieldIcon` |
  | Framework-backed | `AwardIcon` |
- **Industries (3)** — two are byte-identical path matches to the reference's own inline SVGs; the third is the closest existing equivalent:
  | Industry | Icon component | Match |
  |---|---|---|
  | HealthTech | `HealthcareIcon` | Byte-identical path (`M22 12h-4l-3 9L9 3l-3 9H2`) |
  | FinTech | `IndustryFinTechIcon` | Near-identical (same rect + top divider; one extra small accent line not in the reference) |
  | Construction Tech | `ConstructionIcon` | Byte-identical path (`M2 20h20M4 20V8l8-5 8 5v12M9 20v-6h6v6`) |
- **Related services (6)** — this page's list (AI-Accelerated Modernization, Software Product Engineering, Platform Engineering, Managed Services, AI Strategy & Roadmap, Startups — excluding itself) needs one icon `components/ui/icons.tsx` doesn't have a dedicated match for: "Software Product Engineering." The AI-Accelerated Modernization sibling's own related-services list hit this identical gap (it also needs a "Software Product Engineering" entry) and resolved it by reusing `EradicateDebtIcon` for that one slot — this page follows the exact same precedent rather than adding a new icon:
  | Related service | Icon component |
  |---|---|
  | AI-Accelerated Modernization | `SvcModernizationIcon` |
  | Software Product Engineering | `EradicateDebtIcon` (precedent: `ai-modernization-related.tsx`'s `codeArrows` key) |
  | Platform Engineering | `SvcPlatformIcon` |
  | Managed Services | `SvcManagedIcon` |
  | AI Strategy & Roadmap | `SvcStrategyIcon` |
  | Startups | `SvcStartupsIcon` |

**Rationale**: `icons.tsx` already covers all fifteen icon slots this page needs (6 why + 3 industries + 6 related) with either an exact or closest-available semantic match, confirmed by direct inspection of the file's full icon list (68 exported icons) — not assumed. Principle III forbids adding a duplicate/new icon to a per-route file when `components/ui/icons.tsx` already has a fitting one; this ticket does not require literal SVG-path-for-path fidelity for the "why" tiles, only equivalent iconography (FR-006 governs typography/color/spacing/dimensions, not exact vector path data), matching the exact bar both sibling pages' own icon decisions were held to.

**Alternatives considered**: Adding a new dedicated "Software Product Engineering" icon (code-brackets glyph, matching the reference's own inline SVG for that nav entry) instead of reusing `EradicateDebtIcon` — rejected because the AI-Modernization sibling already established and shipped the `EradicateDebtIcon`-as-substitute precedent for this exact gap; diverging from it here would create two different icons for the same related-service entry across sibling pages, which is a worse inconsistency than the minor visual approximation.

## 5. Hero image asset and caption

**Decision**: `public/samples/svc-qa.png`, with the "AI IMPACT™ · OrbitAI™ · PRISM™ frameworks" caption line retained beneath it via `Hero`'s `mediaCaption` prop.

**Rationale**: Resolved by clarification (spec.md, Session 2026-08-24, Q2–Q4). No asset in `public/samples/` thematically matches "Data & AI Engineering" the way `svc-eng.png` matched "Software Product Engineering" for its own sibling; `svc-qa.png` is the first of the two remaining unused `svc-*`-bucket candidates. The caption is kept (diverging from the Software-Product-Engineering sibling, which dropped its caption) to match the AI-Modernization sibling's own kept-caption precedent instead — the more conservative choice given this ticket's explicit emphasis on not dropping reference content without a specific reason to.

**Alternatives considered**: `svc-uiux.png` — the other remaining unused `svc-*` asset, rejected only because `svc-qa.png` was the user's chosen pick between the two equally-unfitting candidates (Clarifications). Dropping the caption line to match the Software-Product-Engineering sibling instead — rejected per Clarifications' more conservative default.

## 6. Nav/footer repointing (FR-010)

**Decision**: Two one-line edits:
- `cms/api/footer.ts`: the `slug: "svc-data-ai"` entry's `href` from `/services#svc-data-ai` to `/what-we-do/data-ai-engineering`.
- `cms/api/header.ts`'s `toMegaGroup()`: extend the existing two-service ternary (`section.title === "AI-Accelerated Modernization" ? "/what-we-do/ai-modernization" : section.title === "Software Product Engineering" ? "/what-we-do/software-product-engineering" : section.ctaLink`) to also match `"Data and AI Engineering"` → `/what-we-do/data-ai-engineering`.

**Rationale**: Confirmed by direct inspection of both files during planning. `cms/api/header.ts`'s `toMegaGroup()` already special-cases exactly two services by title string to override their stale CMS-supplied links; this is the established, extend-in-place precedent, not a new pattern.

**Alternatives considered**: Generalizing the ternary chain into a lookup map (`{ "AI-Accelerated Modernization": "...", "Software Product Engineering": "...", "Data and AI Engineering": "..." }`) instead of a third `||` condition — a reasonable implementation-time micro-decision left to `/speckit.tasks`/`/speckit.implement`, not load-bearing enough to gate here; either shape satisfies FR-010 identically.

## 7. Capabilities section heading correction

**Decision**: Render "Six capabilities. One AI-first engine." instead of the reference's literal "Five capabilities. One AI-first engine."

**Rationale**: Resolved by clarification (spec.md, Session 2026-08-24, Q4) — the reference's own heading undercounts the six capability cards that actually render beneath it; treated as a content bug in the reference rather than an intentional quirk worth preserving (unlike the Industries 4-column/3-card layout, which is a genuine, intentionally preserved layout quirk).

**Alternatives considered**: Preserving "Five capabilities" verbatim — the initial specification default, overridden by the user's explicit clarification answer in favor of correctness over literal reference fidelity for this one string.

## 8. Testing approach

**Decision**: No automated tests — manual verification via `quickstart.md`, matching this repo's project-wide convention (no test framework configured anywhere).

**Rationale**: Constitution, Development Workflow: "No test framework is configured anywhere in the repo today... do not silently invent a coverage target." `npm run lint` and `npm run build` (already gated by Husky's pre-commit hook) remain the enforced automated gates.

**Alternatives considered**: None — introducing a test framework for one feature would be an unrelated, unauthorized project-wide change.

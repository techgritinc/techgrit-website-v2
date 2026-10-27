# Research: Platform Engineering Page (TMS-86-platform-engineering)

## 1. Route & folder structure

**Decision**: `app/what-we-do/platform-engineering/page.tsx` → `/what-we-do/platform-engineering`, with `_components/` and `_data/` colocated per Next.js's `_`-prefixed private-folder convention — the exact same shape as `app/what-we-do/ai-modernization/`, `app/what-we-do/software-product-engineering/`, and `app/what-we-do/data-ai-engineering/`.

**Rationale**: The user's request explicitly requires following "the exact architecture used by the existing AI Acceleration & Modernization, Software Product Engineering, and Data & AI Engineering pages." That family already established the `what-we-do` parent segment and the `_components/`/`_data/` shape; there is nothing left to decide here, only to replicate.

**Alternatives considered**: None — the architecture is a direct, explicit requirement, not an open design choice.

## 2. Content/data layer: static module vs. CMS integration

**Decision**: A plain static, typed content array in `_data/platform-engineering-content.ts` (discriminated by a `type` field per section), rendered by a `switch` in `page.tsx` — no CMS fetch, no `async`/`await` data layer.

**Rationale**: Resolved by clarification (spec.md, Session 2026-08-25, Q1). All three sibling pages shipped this exact way first (`app/construction/`'s pattern) and only later received CMS integration as their own separate, dedicated tickets. Direct inspection of the *current* `app/what-we-do/{ai-modernization,software-product-engineering,data-ai-engineering}/page.tsx` confirms all three now call an async `getXData()` CMS fetcher — but this feature's scope is static-only, matching the siblings' original, pre-upgrade shape and FR-008.

**Alternatives considered**: Wiring `getPlatformEngineeringData()` against a new `cms/api/what-we-do/platform-engineering.ts` module now, matching the siblings' *current* (post-integration) shape — rejected because nothing in this request asks for CMS wiring, a live Strapi page/slug for this content isn't confirmed to exist, and building it now would be scope creep the user did not authorize (Constitution Development Workflow: no speculative work ahead of an actual ticket).

## 3. Component reuse — zero new shared primitives

**Decision**: Every section maps onto an existing, unmodified `components/ui/` primitive:

| Section | Component | Notes |
|---|---|---|
| Hero | `Hero` (`mediaFill`, `media=<MediaSlot fill .../>`, no `mediaCaption`) | Same shape as all three siblings' hero — eyebrow, gradient-highlighted title, subtitle, CTA pair, right-side image card — with no caption row beneath the image (per Clarifications Q4), matching the Software Product Engineering sibling's caption-less treatment rather than AI-Modernization/Data & AI Engineering's kept-caption one. |
| Intro / "Stop solving the same infrastructure problem..." | `ContentBlock` | Same `0.9fr 1.1fr` two-column shape, `chipsLabel` + 6 `chips`, verified byte-identical structure in the reference against all three siblings' own INTRO sections. |
| Capabilities (6 cards) | `GlassCard` variant `serviceCapability` + `GlassCardTitle`/`GlassCardDescription` | Same numbered-eyebrow + heading + lede + bullet-list shape every sibling's own capability section already uses this exact variant for — no new variant needed. Heading "Six pillars. One reliable foundation." already correctly matches the 6 rendered cards (no numeral-bug correction needed, unlike Data & AI Engineering). |
| Assess/Design/Build/Secure/Optimize (5 stages) | `ProcessSteps` | Directly reusable — same numbered-step shape, same 5-item count. |
| Why platform engineering matters (6 tiles) | Page-local `WhyTile` (icon + heading + description, 2-col grid) | All three siblings' own equivalent "why" sections implement this exact same shape as a page-local component, not a shared primitive — this page follows that same precedent rather than introducing a new shared abstraction for a pattern every sibling itself chose to keep route-local. |
| Platforms for every stage of growth (4 cards, 2 non-linked + 2 linked) | `GlassCard` variant `serviceCapability` (icon + title + description; `href` optional) | Same visual shape every sibling's own Industries-style section already reuses via this variant, on a 4-column desktop track — but unlike every sibling (which links every card), this section renders the first 2 cards as plain, non-clickable `GlassCard`s and the last 2 as `<a>`-wrapped `GlassCard`s, per Clarifications Q3 (preserve the reference's own mixed treatment verbatim). |
| FAQ (5 items) | `Faq` | Directly reusable — native `<details>`/`<summary>`, `defaultOpen` on the first item. |
| Related services (6 cards) | `IconTile` (`size="compact"`) | Directly reusable — same icon-left compact tile shape every sibling's own "Related services" section already uses. |
| Closing CTA | `final-cta` (`FinalCta`) | Directly reusable — same tone/props shape every sibling's `finalCta` section type already consumes. |

**Rationale**: Confirmed by direct inspection of `app/what-we-do/data-ai-engineering/_components/*.tsx` (its still-documented static shape, per its own `research.md`/`data-model.md`) and every relevant `components/ui/*.tsx` file during planning — not inferred. Principle III requires reusing an existing shared primitive wherever it fits and forbids duplicating one; this reference's section shapes are, section-for-section, the same shapes every sibling prototype already had, with one genuine content difference (the mixed link/no-link fourth grid) that is a data-shape variation, not a new component.

**Alternatives considered**: Making all 4 "Platforms for every stage of growth" cards uniformly linked (inventing destinations for "SaaS Platforms"/"Enterprise Apps") to avoid an optional `href` field on the shared card data shape — rejected per Clarifications Q3; the reference's own mixed treatment is preserved verbatim. `GlassCard` itself is always a plain `<div>` (confirmed by inspecting `GlassCard.tsx`) and carries no link behavior of its own — the conditional-link wrapping pattern already exists at the page-local level: `app/what-we-do/data-ai-engineering/_components/data-ai-engineering-industries.tsx`'s own `IndustryTile` already wraps its `GlassCard` in a Next.js `<Link>` only `industry.href ? ... : card`, for the identical reason (its CMS-driven data doesn't always supply a destination). This page's platform/industry card component follows that exact same, already-shipped conditional-wrap precedent — no new component-level prop or variant needed.

## 4. Icon selection for "why" tiles, the "Platforms for every stage of growth" cards, and related services

**Decision**:

- **"Why platform engineering matters" tiles (6)** — chosen for closest semantic/visual match to the reference's own inline SVGs; three are byte-identical path matches:
  | Tile | Icon component | Match |
  |---|---|---|
  | Improve developer productivity | `LightningIcon` | Near-identical bolt path (`M13 2 3 14h9l-1 8 10-12h-9z` vs. reference's `M13 2L3 14h9l-1 8 10-12h-9l1-8z`) |
  | Accelerate delivery | `EradicateDebtIcon` | Byte-identical path (`<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>`) |
  | Increase reliability | `ShieldIcon` | Byte-identical path (`M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z`) |
  | Standardize practices | `LayoutDashboardIcon` | Closest existing grid/panel-layout icon for a "reusable, consistent" concept — the reference's literal 2×2 uniform-square grid has no existing exact match in `icons.tsx` |
  | Scale with confidence | `InfiniteScalabilityIcon` | Closest existing semantic "scale" icon already used elsewhere in the app for the same claim — the reference's literal dollar-sign glyph has no existing match |
  | AI-augmented ops | `AwardIcon` | Byte-identical path (`M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z`) |
- **"Platforms for every stage of growth" cards (4)** — two generic archetype cards plus two industry cards:
  | Card | Icon component | Match |
  |---|---|---|
  | SaaS Platforms | `AutonomousAgentIcon` | Closest existing "outer square + inner square" shape (`<rect rx="2"/><path d="M9 9h6v6H9z"/>`) matching the reference's nested-rectangle glyph |
  | Enterprise Apps | `ConstructionIcon` | Near-identical building-outline path (reference: `M2 20h20M4 20V8l8-5 8 5v12`; `ConstructionIcon` is the same path plus one extra door-line segment) |
  | HealthTech | `HealthcareIcon` | Byte-identical path (`M22 12h-4l-3 9L9 3l-3 9H2`) |
  | FinTech | `IndustryFinTechIcon` | Byte-identical path (`<rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/>`) — carries a pre-existing hardcoded `stroke="#fff"` (not `currentColor`), an existing quirk already accepted when the Data & AI Engineering sibling reused this same icon; out of scope to fix here |
- **Related services (6)** — this page's list (AI-Accelerated Modernization, Software Product Engineering, Data & AI Engineering, Managed Services, AI Strategy & Roadmap, Startups — excluding itself) maps entirely onto existing dedicated service icons, no gap:
  | Related service | Icon component |
  |---|---|
  | AI-Accelerated Modernization | `SvcModernizationIcon` |
  | Software Product Engineering | `EradicateDebtIcon` (same precedent both prior siblings' related-services lists already used for this exact gap) |
  | Data & AI Engineering | `SvcDataAiIcon` |
  | Managed Services | `SvcManagedIcon` |
  | AI Strategy & Roadmap | `SvcStrategyIcon` |
  | Startups | `SvcStartupsIcon` |

**Rationale**: `icons.tsx` already covers all sixteen icon slots this page needs (6 why + 4 platform/industry + 6 related) with either an exact or closest-available semantic match, confirmed by direct inspection of the file's full icon list (70+ exported icons) — not assumed. Principle III forbids adding a duplicate/new icon to a per-route file when `components/ui/icons.tsx` already has a fitting one; this ticket does not require literal SVG-path-for-path fidelity, only equivalent iconography (FR-006 governs typography/color/spacing/dimensions, not exact vector path data), matching the exact bar every sibling page's own icon decisions were held to. `EradicateDebtIcon` is deliberately reused twice on this one page (once for the "Accelerate delivery" why-tile, once for the "Software Product Engineering" related-service card) — both are genuinely separate semantic contexts (a bracket/code icon fits "delivery pipelines" as well as "software engineering"), and no functional requirement forbids reusing one icon in two places on the same page.

**Alternatives considered**: Adding new dedicated icons for the literal 2×2 grid ("Standardize practices") and dollar-sign ("Scale with confidence") glyphs to hit exact path fidelity — rejected; `icons.tsx` already has close enough semantic equivalents and Principle III's bar for this pattern (confirmed above) has consistently been "equivalent iconography," not exact-path matching, across every sibling page's own icon decisions.

## 5. Hero image asset and caption

**Decision**: `public/samples/svc-uiux.png`, with no caption line beneath it (`Hero`'s `mediaCaption` prop omitted).

**Rationale**: Resolved by clarification (spec.md, Session 2026-08-25, Q2, Q4). `svc-uiux.png` is the one remaining unused asset in the `svc-*` naming bucket after Software Product Engineering claimed `svc-eng.png` and Data & AI Engineering claimed `svc-qa.png` — the same "first/only remaining candidate in the bucket" precedent already established. The caption is dropped (diverging from the AI-Modernization and Data & AI Engineering siblings, which both kept a caption) to match the Software Product Engineering sibling's own caption-less treatment instead, per the user's explicit answer to Q4.

**Alternatives considered**: Keeping the reference's literal caption line ("PRISM™ · AI IMPACT™ · OrbitAI™ frameworks") — the initial specification default (matching 2 of 3 siblings), overridden by the user's explicit clarification answer in favor of the Software Product Engineering sibling's own precedent for this page.

## 6. Nav/footer repointing (FR-010)

**Decision**: Two one-line edits:
- `cms/api/footer.ts`: the `slug: "svc-platform"` entry's `href` from `/services#svc-platform` to `/what-we-do/platform-engineering`.
- `cms/api/header.ts`'s `toMegaGroup()`: extend the existing three-service ternary chain (`"AI-Accelerated Modernization" ? ... : "Software Product Engineering" ? ... : "Data and AI Engineering" ? ... : section.ctaLink`) to also match `"Platform Engineering"` → `/what-we-do/platform-engineering`.

**Rationale**: Confirmed by direct inspection of both files during planning. `cms/api/header.ts`'s `toMegaGroup()` already special-cases exactly three services by title string to override their stale CMS-supplied links; this is the established, extend-in-place precedent, not a new pattern.

**Alternatives considered**: Generalizing the ternary chain into a lookup map instead of a fourth `||` condition — a reasonable implementation-time micro-decision left to `/speckit.tasks`/`/speckit.implement`, not load-bearing enough to gate here; either shape satisfies FR-010 identically.

## 7. "Platforms for every stage of growth" mixed link/no-link treatment

**Decision**: Model each platform/industry card with an optional `href`. Render as a plain (non-interactive) `GlassCard` when `href` is absent (SaaS Platforms, Enterprise Apps), and as an `<a>`-wrapped `GlassCard` when present (HealthTech, FinTech).

**Rationale**: Resolved by clarification (spec.md, Session 2026-08-25, Q3) — this is a genuine, intentional reference distinction (the reference itself uses a plain `<div class="cap-card">` for the first two and an `<a class="cap-card">` for the last two), not a content bug like Data & AI Engineering's "Five"→"Six" heading typo.

**Alternatives considered**: Splitting this into two separately-typed arrays (linked vs. unlinked) instead of one array with an optional `href` — rejected as an unnecessary data-shape complication; a single optional field is simpler and the render logic is a one-line conditional.

## 8. Testing approach

**Decision**: No automated tests — manual verification via `quickstart.md`, matching this repo's project-wide convention (no test framework configured anywhere).

**Rationale**: Constitution, Development Workflow: "No test framework is configured anywhere in the repo today... do not silently invent a coverage target." `npm run lint` and `npm run build` (already gated by Husky's pre-commit hook) remain the enforced automated gates.

**Alternatives considered**: None — introducing a test framework for one feature would be an unrelated, unauthorized project-wide change.

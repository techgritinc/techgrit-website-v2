# Research: Software Product Engineering Page (TMS-86-software-product-engineering)

## 1. Route & folder structure

**Decision**: `app/what-we-do/software-product-engineering/page.tsx` → `/what-we-do/software-product-engineering`, with `_components/` and `_data/` colocated per Next.js's `_`-prefixed private-folder convention — the exact same shape as `app/what-we-do/ai-modernization/`.

**Rationale**: The user's request explicitly requires following "the exact file and folder architecture already established for the existing `ai-acceleration-modernization` page." That page already established the `what-we-do` parent segment as the home for this service-page family; there is nothing left to decide here, only to replicate.

**Alternatives considered**: None — the architecture is a direct, explicit requirement, not an open design choice.

## 2. Content/data layer: static module vs. CMS integration

**Decision**: A plain static, typed content array in `_data/software-product-engineering-content.ts` (discriminated by a `type` field per section), rendered by a `switch` in `page.tsx` — no CMS fetch, no `async`/`await` data layer.

**Rationale**: Resolved by clarification (spec.md, Session 2026-08-23, Q3). The sibling AI-Modernization page shipped this exact way first (`app/construction/`'s pattern) and only later received CMS integration as its own separate, dedicated ticket. This feature's scope is static-only, matching that same phased precedent and FR-008.

**Alternatives considered**: Wiring `getSoftwareProductEngineeringData()` against a new `cms/api/what-we-do/software-product-engineering.ts` module now, matching the sibling's *current* (post-integration) shape — rejected because nothing in this request asks for CMS wiring, and building it now would be scope creep the user did not authorize (Constitution Development Workflow: no speculative work ahead of an actual ticket).

## 3. Component reuse — zero new shared primitives

**Decision**: Every section maps onto an existing, unmodified `components/ui/` primitive:

| Section | Component | Notes |
|---|---|---|
| Hero | `Hero` (`mediaFill`, `media=<MediaSlot fill .../>`, no `mediaCaption`) | Same shape as the sibling's hero — eyebrow, gradient-highlighted title, subtitle, CTA pair, right-side image card — except this page omits the optional caption row beneath the image (per Clarifications), unlike the sibling's card. |
| Intro / "Where teams get stuck" | `ContentBlock` | Same `0.9fr 1.1fr` two-column shape, `chipsLabel` + 6 `chips`, verified byte-identical structure in the reference against the sibling's own INTRO section. |
| Core capabilities (6 cards) | `GlassCard` variant `serviceCapability` + `GlassCardTitle`/`GlassCardDescription` | Same numbered-eyebrow + heading + lede + bullet-list shape the sibling's "Our modernization services" section already uses this exact variant for — no new variant needed. |
| Delivery lifecycle (5 stages) | `ProcessSteps` | Directly reusable — same numbered-step shape, same 5-item count. |
| Why product teams pick TechGrit (6 tiles) | Page-local `WhyTile` (icon + heading + description, 2-col grid) | The sibling's own equivalent "Why AI-assisted modernization" section (`ai-modernization-why.tsx`) implements this exact same shape as a page-local component, not a shared primitive — this page follows that same precedent rather than introducing a new shared abstraction for a pattern the sibling itself chose to keep route-local. |
| Industries we build for (3 cards) | `GlassCard` variant `serviceCapability` (icon + title + description, optionally linked) | Same shape and same variant the sibling's "Industries we modernize" section already reuses. |
| FAQ (5 items) | `Faq` | Directly reusable — native `<details>`/`<summary>`, `defaultOpen` on the first item. |
| Related services (6 cards) | `IconTile` (`size="compact"`) | Directly reusable — same icon-left compact tile shape the sibling's "Related services" section already uses. |
| Closing CTA | `final-cta` (`FinalCta`) | Directly reusable — same tone/props shape the sibling's `finalCta` section type already consumes. |

**Rationale**: Confirmed by direct inspection of every `app/what-we-do/ai-modernization/_components/*.tsx` file and every relevant `components/ui/*.tsx` file during planning — not inferred. Principle III requires reusing an existing shared primitive wherever it fits and forbids duplicating one; this reference's section shapes are, section-for-section, the same shapes the sibling prototype already had, which is exactly why FR-009 in the sibling's own spec anticipated this and built those primitives generically (no page-specific copy compiled in).

**Alternatives considered**: Extracting the page-local `WhyTile` pattern into a new shared `components/ui/` primitive now that a second page needs the identical shape — considered, but rejected for this ticket: the sibling page itself made the deliberate choice to keep it page-local (not a "we forgot" gap), and promoting it is an unrelated, options-widening scope decision the user did not ask for (Constitution: don't pre-scaffold structure ahead of an actual, current need being blocked by its absence — this page is not blocked, since a second page-local copy costs ~25 lines and violates no functional requirement).

## 4. Icon selection for capability, why, and related-service tiles

**Decision**: Reuse `components/ui/icons.tsx`'s existing icon set — specifically the complete `Svc*Icon` family (`SvcModernizationIcon`, `SvcDataAiIcon`, `SvcPlatformIcon`, `SvcManagedIcon`, `SvcStrategyIcon`, `SvcStartupsIcon`) for all six "Related services" entries (this page's related list needs exactly these six, since it excludes itself and includes AI-Accelerated Modernization in the sibling's place). For the "Why" tiles' six generic line icons (lightning-bolt, checkmark, layers, clock, shield, up/down arrows per the reference's inline SVGs), reuse existing generic icons already in `icons.tsx` (`LightningIcon`, `CheckIcon`/`CheckCircleIcon`, `LayersIcon`, `ClockIcon`, `ShieldIcon`/`ShieldCheckIcon`, `TrendingUpIcon`) rather than adding new ones.

**Rationale**: `icons.tsx`'s `Svc*Icon` set already covers every one of this page's six related-service links with no gap — confirmed by direct inspection, not assumed. The generic line-icon set already in the file (added across prior features) covers the "Why" tiles' visual intent closely enough that no new icon is required; Principle III forbids adding a duplicate icon to a per-route file when `components/ui/icons.tsx` already has a fitting one.

**Alternatives considered**: Adding six new page-specific "Why" icons matching the reference's exact inline-SVG paths pixel-for-pixel — rejected as unnecessary given `icons.tsx` already has visually-equivalent generic icons for each of the six concepts (velocity/ship-fast, ownership/check, AI-native/layers, predictability/clock, quality/shield, cost/trend) and this ticket does not require literal SVG-path-for-path fidelity, only equivalent iconography (FR-006 governs typography/color/spacing/dimensions, not exact vector path data).

## 5. Hero image asset

**Decision**: `public/samples/svc-eng.png`.

**Rationale**: Resolved by clarification (spec.md, Session 2026-08-23, follow-up). The only candidate asset in `public/samples/` not already used elsewhere in the app, and its filename directly matches this service ("Software Product Engineering") — unlike `dm-scalability.png`/`dm-copilot.png` (both already on the homepage) or `dm-tech-debt.png` (already on the sibling AI-Modernization page's own hero).

**Alternatives considered**: `dm-scalability.png` ("Infinite Scalability") — thematically close to the hero's velocity/cloud-native/squad-size stats, but already used on the homepage, which the user's chosen option specifically avoided.

## 6. Nav/footer repointing (FR-010)

**Decision**: Two one-line edits:
- `cms/api/footer.ts`: `DEFAULT_FOOTER_DATA.linkGroups[0].links[1].href` (the `slug: "svc-product"` entry) from `/services#svc-product` to `/what-we-do/software-product-engineering`.
- `cms/api/header.ts`'s `toMegaGroup()`: extend the existing single-service ternary (currently `section.title === "AI-Accelerated Modernization" ? "/what-we-do/ai-modernization" : section.ctaLink`) to also match `"Software Product Engineering"` → `/what-we-do/software-product-engineering`.

**Rationale**: Confirmed by direct inspection of both files during planning (not inferred from the sibling spec, which — written before the header's live CMS mega-menu logic existed in its current form — incorrectly concluded no header-side change was needed for its own ticket). `cms/api/header.ts`'s `toMegaGroup()` already special-cases exactly one service by title string to override a stale CMS-supplied link; this is the established, single-purpose precedent to extend, not a new pattern.

**Alternatives considered**: Generalizing the ternary into a lookup map (`{ "AI-Accelerated Modernization": "...", "Software Product Engineering": "..." }`) instead of a second `||` condition — a reasonable implementation-time micro-decision left to `/speckit.tasks`/`/speckit.implement`, not load-bearing enough to gate here; either shape satisfies FR-010 identically.

## 7. Industry-card icon accent color (per-industry vs. uniform)

**Decision**: Uniform orange icon-box treatment (`bg-[var(--color-overlay-orange-14)] text-orange`) for all three industry cards, matching the sibling AI-Modernization page's own "Industries we modernize" section exactly — not the reference's own per-industry teal/blue/amber icon-box colors (`rgba(15,118,110,0.18)`/`#2dd4bf` healthcare, `rgba(2,132,199,0.14)`/`#38bdf8` fintech, `rgba(245,158,11,0.14)`/`#fdba74` construction).

**Rationale**: None of the reference's three exact rgba background values already exist as a `tokens.css` overlay token (closest existing matches are `--color-overlay-teal: rgba(15,118,110,0.12)`, `--color-overlay-blue: rgba(2,132,199,0.12)`, `--color-overlay-amber-12: rgba(245,158,11,0.12)` — all a different opacity than the reference's 0.14–0.18). Introducing three new page-specific tokens for a minor decorative icon-box tint that the immediately-preceding sibling page already deliberately declined to replicate (choosing a uniform orange treatment instead) would fail the "only add a new token when genuinely needed" bar and would break visual consistency with the sibling page's own equivalent section — undermining the reuse-and-consistency direction recorded in this plan's "UI Design Approach". The reference's teal/blue/amber stroke colors (`--color-teal-light: #2dd4bf`, `--color-blue-light: #38bdf8`) do already exist as tokens for other uses, but their *paired overlay-background* values at this specific opacity do not.

**Alternatives considered**: Reusing the closest existing overlay tokens at their existing (slightly different) opacity to approximate the reference's per-industry colors — rejected as a half-measure that is neither pixel-exact nor consistent with the sibling page, satisfying neither goal. Adding three new precise overlay tokens — rejected per the minimal-footprint reasoning above; revisit only if a future ticket explicitly asks to restore full per-industry accent fidelity across the whole "What We Do" family.

## 8. Testing approach

**Decision**: No automated tests — manual verification via `quickstart.md`, matching this repo's project-wide convention (no test framework configured anywhere).

**Rationale**: Constitution, Development Workflow: "No test framework is configured anywhere in the repo today... do not silently invent a coverage target." `npm run lint` and `npm run build` (already gated by Husky's pre-commit hook) remain the enforced automated gates.

**Alternatives considered**: None — introducing a test framework for one feature would be an unrelated, unauthorized project-wide change.

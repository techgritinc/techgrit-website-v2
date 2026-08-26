# Research: Startups Page (What We Do)

All "NEEDS CLARIFICATION" items from the Technical Context are resolved below. No unknowns remain unresolved going into Phase 1.

## 1. Content sourcing — static-only, matching every sibling's original build phase

**Decision**: Page-local static TypeScript content module (`app/what-we-do/startups/_data/types.ts` + `startups-content.ts`), no CMS/Strapi fetcher.

**Rationale**: Per spec.md Clarifications and FR-008, this ticket targets the same static-content build phase every one of the six sibling "What We Do" pages went through before their own separate, later CMS-integration ticket. No Strapi content type/entry exists yet for a "startups" page slug, so building against a live CMS here is out of scope. Confirmed by inspecting all six siblings' current `page.tsx` (`ai-modernization`, `software-product-engineering`, `data-ai-engineering`, `platform-engineering`, `managed-services`, `ai-strategy-roadmap`) — every one now fetches from `cms/api/what-we-do/*.ts` via `fetchCms(...)` with `cache: "no-store"` — but each was itself preceded by exactly this static shape (verified against each sibling's own `research.md`/`data-model.md`, which still document the pre-upgrade static content module).

**Alternatives considered**: Building a live CMS integration now (rejected — no content type exists for this slug, and provisioning one is outside this codebase's scope per the established precedent); a headless local JSON file instead of a typed `.ts` module (rejected — every sibling's static phase used a typed TS module, and this repo has no `lib/`/`types/` directory convention to justify a different shape here).

## 2. Component reuse inventory — zero new shared primitives

**Decision**: 100% reuse of `Hero`, `ContentBlock`, `GlassCard` (`serviceCapability` variant), `Faq`, `FinalCta` (`components/ui/final-cta.tsx`), `MediaSlot`, `Button` (used internally by `Hero`/`FinalCta`), and `RevealOnScroll`. Zero new `components/ui/` primitives.

**Rationale**: Direct inspection of each component's current source confirms every prop this page needs already exists:
- `Hero` (`components/ui/Hero.tsx`) — `crumbs`, `eyebrow`, `title`/`titleHighlight`, `subtitle`, `primaryCta`/`secondaryCta`, `media` (a `MediaSlot` with `fill`), `mediaFill={true}`, no `mediaCaption` set (per FR-004). Matches this page's hero exactly.
- `ContentBlock` (`components/ui/ContentBlock.tsx`) — two-column eyebrow/title/description + chips-label/chip-list shape, exactly matching "Great ideas stall..." intro section (6 chips).
- `GlassCard` `serviceCapability` variant (`components/ui/GlassCard.tsx`) — numbered-eyebrow-label + title + lede + bullet-list card shape, exactly matching both the capabilities section's 6 cards and the "who we help" section's 4 cards.
- `Faq` (`components/ui/Faq.tsx`) — native `<details>`/`<summary>` accordion, independent per-item state for free, `defaultOpen` on the first item. Matches the 5-item FAQ exactly.
- `FinalCta` (`components/ui/final-cta.tsx`) — eyebrow/title/description + primary/secondary CTA band. Matches the closing CTA exactly (same shape every sibling's own closing CTA already uses).
- `MediaSlot` (`components/ui/MediaSlot.tsx`) — `fill`/`sizes`/`priority` image wrapper, exactly the pattern every sibling's hero image already uses.

**Alternatives considered**: A new shared "bordered panel" primitive for the growth-journey section (rejected — see §3, this stays page-local, matching precedent); a new shared `IconTile`-based "why" tile (rejected — every sibling's own "why" section is already a page-local composition, not the shared `IconTile`, for the identical 2-column icon+heading+description pattern).

## 3. Growth-journey panel ("From first idea to institutional scale.") — page-local composition

**Decision**: A page-local component (`startups-growth-journey.tsx`) rendering a bordered gradient-panel wrapper (`rounded-3xl border border-border-orange-18`, matching the exact Tailwind utility classes the Platform Engineering/Data & AI Engineering/Managed Services siblings' own "Strategies" panel wrapper already uses) containing three `GlassCard` (`serviceCapability` variant) instances, one per growth stage.

**Rationale**: No sibling page has a section that wraps full `GlassCard`-style cards (badge + title + lede + bullet list) inside a single bordered panel — the closest existing precedent (`PlatformEngineeringStrategies`, `ManagedServicesStrategies`, `DataAiEngineeringStrategies`) wraps simple name+description tiles, not full capability cards. This page's growth-journey section is a genuine, reference-driven combination of two already-established patterns (the bordered-panel wrapper's outer chrome, and the `serviceCapability` card's inner shape) rather than a wholly new visual language — so it is implemented as a page-local composition (per FR-011), reusing the panel wrapper's exact Tailwind classes and `GlassCard` unmodified, with no new shared primitive (2 new tokens were needed for the highlighted-card treatment specifically — see the "First-card emphasis" note below, Speckit analysis C1).

**Alternatives considered**: A new shared `components/ui/StagePanel.tsx` primitive (rejected — used exactly once, on this page only; Constitution Principle III and the user's explicit instruction both say a one-off pattern doesn't justify a new shared component); reusing `ProcessSteps` instead (rejected — `ProcessSteps` renders numbered sequential steps with no badge/lede/bullet-list shape, and the reference's three cards are not a `ProcessSteps`-shaped numbered sequence).

**First-card emphasis (Speckit analysis U1, token resolution refined by C1)**: The reference gives the first stage card ("Pre-Seed & Seed") a visibly stronger background/border than the other two — card `background:rgba(232,119,34,0.07)`/`border:rgba(232,119,34,0.22)` and badge `background:rgba(232,119,34,0.15)`/`border:rgba(232,119,34,0.4)`, versus the other two cards' `0.04`/`0.14` and badge `0.10`/`0.28`. Modeled via `GrowthStage.highlighted` (data-model.md). Of these 8 values, checking every orange-tinted entry in `app/tokens.css` found exact matches for 6: border-22 → `--color-border-orange-22`, badge-bg-15 → `--color-hover-orange-fill-15`, badge-border-40 → `--color-hover-orange-border-40`, border-14 → `--color-overlay-orange-14`, badge-bg-10 → `--color-overlay-orange-10`, badge-border-28 → `--color-overlay-orange-strong`. The 2 card-*background* opacities (0.07, 0.04) had no exact match anywhere in the file (nearest existing were 1–2 points off) — a genuinely new value per Constitution Principle I's own carve-out, not an approximation to reach for — so `--color-overlay-orange-07`/`--color-overlay-orange-04` were added to `tokens.css`'s existing overlay-orange group (Speckit analysis C1) rather than hardcoded inline. Zero *new component or icon* either way; only these 2 tokens are new.

**Grid breakpoints (Speckit analysis U3)**: The reference's `[data-step-grid]` rule (`TechGrit Startups.dc.html` lines 124/132) collapses this 3-card row to 2 columns at `max-width:920px` and to 1 column at `max-width:640px` — not the same shape as the Strategies panel's own 4-item `sm:grid-cols-2 lg:grid-cols-4` precedent (a different item count, and not confirmed to share the same reference breakpoints). This 920px/640px pair is, however, identical to the Capabilities section's own `[data-cap-grid]` rule on this same reference file, which the already-shipped `PlatformEngineeringCapabilities` component maps onto this project's *canonical* breakpoints as `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` (not a literal `min-[921px]`-style override — unlike `Hero`/`ContentBlock`, which needed that override only for their own two-column hero-row split, a different, previously-mismatched case). The growth-journey panel's 3-card grid therefore uses the same `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` pattern, matching the Capabilities section's own already-verified precedent for this identical 920/640 breakpoint pair, rather than the Strategies panel's unrelated 4-column shape.

## 4. Icon inventory — zero new icons

**Decision**: All 16 icon slots this page needs (6 "why" tiles, 4 "who we help" cards, 6 related-service links) resolve to existing `components/ui/icons.tsx` exports. No new icon is added.

**Rationale** (per-slot mapping, confirmed against each icon's actual current SVG path in `components/ui/icons.tsx`):

| Section | Item | Reference icon | Resolved icon | Icon tint | Fit |
|---|---|---|---|---|---|
| Why | Senior developers from the start | single-person silhouette | `UsersIcon` | uniform orange (matches every sibling "why" tile) | Nearest existing (two-person); no single-person icon exists in this codebase today and this page needs it only once, so precedent favors reuse over adding a new icon (contrast with AI Strategy & Roadmap, which added a new `UserIcon` only because it needed the same single-person shape *twice*) |
| Why | AI-native by default | rocket | `SvcStartupsIcon` | uniform orange | Exact match — identical SVG path to this page's own nav/mega-menu icon |
| Why | Flexible pricing for every stage | dollar-sign-in-bar | `CreditCardIcon` | uniform orange | Nearest existing payment/pricing motif |
| Why | Track record of 40+ launches | checkmark circle | `CheckCircleIcon` | uniform orange | Exact conceptual match |
| Why | We protect your runway | shield outline | `ShieldIcon` | uniform orange | Exact match |
| Why | Network & ecosystem access | globe/circle-lines | `NetworkNodeIcon` | uniform orange | Existing "network-node" glyph (currently used as a decorative Blog panel watermark); reused here as a normal small tile icon via explicit `stroke="currentColor"` + `width`/`height` props (which override its literal JSX defaults, since `{...props}` spreads last) rather than adding a new globe icon for a single occurrence |
| Who we help | Solo & Co-Founders | rocket | `SvcStartupsIcon` | orange — `--color-orange` (bg `--color-overlay-orange-18`, pre-existing) | Exact match (same icon as the "AI-native by default" why-tile and this page's own nav icon) |
| Who we help | Seed & Series A Teams | two-person | `UsersIcon` | amber — `--color-amber-light` (bg `--color-overlay-orange-14`, pre-existing) | Exact match |
| Who we help | VC & PE Portcos | rising-line chart | `SvcStrategyIcon` | blue — `--color-blue-light` (bg `--color-overlay-blue-light-14`, **new** — see below) | Exact match — identical SVG path to the AI Strategy & Roadmap page's own nav icon |
| Who we help | Corporate Innovation | monitor/rect with stand | `LayoutDashboardIcon` | violet — `--color-violet` (bg `--color-overlay-violet-light-18`, **new** — see below) | Nearest existing (4-panel dashboard grid); no monitor/screen icon exists, and this shape appears once, so reuse over new-icon addition |
| Related | Software Product Engineering | code brackets | `EradicateDebtIcon` | uniform orange | Established substitute — the exact same reuse every prior sibling's own related-services list already made for this identical icon gap (confirmed in `app/what-we-do/ai-modernization/_components/ai-modernization-related.tsx`'s `RELATED_ICON` map) |
| Related | AI Strategy & Roadmap | roadmap/chart | `SvcStrategyIcon` | uniform orange | Exact match |
| Related | Data & AI Engineering | database/cylinder | `SvcDataAiIcon` | uniform orange | Exact match |
| Related | AI-Accelerated Modernization | refresh/gear-arrow | `SvcModernizationIcon` | uniform orange | Exact match |
| Related | Platform Engineering | layered platform | `SvcPlatformIcon` | uniform orange | Exact match |
| Related | Managed Services | headset/support | `SvcManagedIcon` | uniform orange | Exact match |

**Alternatives considered**: Adding a new single-person icon and a new monitor/screen icon (rejected — each shape is needed only once on this page, and an existing near-equivalent already covers the slot; adding icons for single-occurrence, non-critical decorative slots would violate the "no unused/unnecessary additions" instruction and Constitution Principle III's "never justified by convenience" framing).

**Per-card icon tint (Speckit analysis U2, refined during implementation)**: Unlike the Why/Related sections (and unlike the Platform Engineering/Data & AI Engineering siblings' own single-tint "Industries" cards), the reference gives each of the 4 "who we help" cards a *distinct* icon tint (orange/amber/blue/violet, per the table above) — a genuine reference fact, not a styling embellishment to normalize away. The 4 *foreground* icon colors (`--color-orange`, `--color-amber-light`, `--color-blue-light`, `--color-violet`) all already exist. The 4 *background* tint values, checked individually against every matching token in `app/tokens.css`, split 2/2: `soloFounders`' 0.18 orange and `seedSeriesA`'s 0.14 orange had exact existing matches (`--color-overlay-orange-18`, `--color-overlay-orange-14`); `vcPePortcos`' 0.14 blue-light and `corporateInnovation`'s 0.18 violet (at `--color-violet`'s own hue, not the differently-hued `--color-overlay-violet-14/-10`) had no match — nearest existing were 4 points off, or the wrong hue entirely. Per the same Principle I process as C1/C2, 2 more tokens (`--color-overlay-blue-light-14`, `--color-overlay-violet-light-18`) were added to `tokens.css` and given their `globals.css` `@theme inline` mapping. Total new tokens for this feature: 4 (not the 2 originally scoped under C1).

## 5. Hero image asset

**Decision**: `public/samples/ind-fintech.png`.

**Rationale**: Per spec.md Clarifications, this page follows the six built siblings' hero-card image-replacement precedent. Of `public/samples/*`, only `dm-copilot.png` and `ind-fintech.png` remain unclaimed by a built page; `ind-fintech.png` was chosen for its rising-trend-line growth motif, which reads coherently against this page's "From first idea to institutional scale." growth-stage narrative.

## 6. Navigation wiring

**Decision**: Two one-line edits — `cms/api/footer.ts`'s existing `svc-startups` entry's `href` (`/services#svc-startups` → `/what-we-do/startups`), and a seventh special-case branch in `cms/api/header.ts`'s `toMegaGroup()` ternary chain for `section.title === "Startups"` → `/what-we-do/startups`.

**Rationale**: Direct inspection confirms `cms/api/footer.ts` already lists `{ slug: "svc-startups", label: "Startups", href: "/services#svc-startups" }` (line 48), and `cms/api/header.ts`'s `toMegaGroup()` (lines 89–118) already has six chained special cases ending in `: section.ctaLink) ?? "/"` — extending the chain with a seventh `section.title === "Startups"` branch follows the exact precedent already established for all six siblings.

**Correction found during implementation**: `cms/api/footer.ts` actually has *two* separate override points, not one. `DEFAULT_FOOTER_DATA` (the object with the `svc-startups` entry above) is explicitly documented in-file as "last-resort fallback if the CMS is genuinely unreachable" — the live path is `getFooterData()` → `toLinkGroup()`, which has its *own* separate ternary chain already special-casing the same six sibling entries (confirmed by that function's own comment block). Editing only `DEFAULT_FOOTER_DATA` left the live-CMS-reachable case (the actual state of this dev environment) still resolving "Startups" to `/services/`, confirmed by inspecting the running server before this was caught. `toLinkGroup()`'s ternary chain needed the identical seventh `item.title === "Startups"` branch too — now added, verified live.

## 7. `frontend-design` skill invocation (Constitution Principle VI)

**Invocation**: Asked the skill what craft guidance applies to a seventh, final page in an already-established "What We Do" family, reusing that family's exact component set and visual grammar rather than needing its own new bold direction.

**Skill's generic guidance**: Distinctive per-generation typography/color/motion choices, avoid visual convergence across unrelated projects — written for greenfield work with no existing design system to anchor to.

**Reconciliation with Principles I–V**: Doesn't apply the same way to a seventh sibling page. This repo already committed (Constitution Principle V) to one considered aesthetic — dark `#000000` surface, single orange→amber accent, one Calibri/Carlito family, ALL-CAPS wide-tracked labels, `tg*`-prefixed motion — specifically so every "What We Do" page reads as one coherent service catalog, not seven unrelated experiments. For this page, visual consistency with the six already-built siblings *is* the correct craft decision, not a shortcut; Principles I–V win over the skill's generic per-page-distinctiveness guidance, exactly as every prior sibling's own plan recorded. The craft decisions that do belong to this specific page — the `ind-fintech.png` hero image choice, the bordered-panel growth-journey composition, and this page's own copy/iconography (rocket motif for startups/founders, running through both the "why" tile and the "who we help" card) — are recorded in "UI Design Approach" in `plan.md`.

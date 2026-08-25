# Research: AI-Accelerated Modernization Page (TMS-86)

## 1. Route & folder structure

**Decision**: `app/what-we-do/ai-modernization/page.tsx` → `/what-we-do/ai-modernization`, with `_components/` and `_data/` colocated per Next.js's `_`-prefixed private-folder convention.

**Rationale**: Resolved by clarification (spec.md, Session 2026-08-20, Q1). No `app/(what-we-do)/` or `app/what-we-do/` route existed before this feature — the only prior services-related route is the single combined `app/services/page.tsx`. An explicit `what-we-do` parent segment was chosen over a route group so the URL itself communicates the page's place in the site's information architecture, and to give every future sibling "What We Do" page (Product Engineering, Data & AI Engineering, Platform Engineering, Managed Services, AI Strategy & Roadmap, Startups) an obvious, consistent home.

**Alternatives considered**: A route group (`app/(what-we-do)/ai-modernization/`, URL `/ai-modernization`) was the initial recommendation — it mirrors `(marketing)`'s existing use to group `/contact` without adding a URL segment — but was not the option selected.

## 2. Existing route-local composition pattern (precedent)

**Decision**: Follow `app/construction/`'s pattern exactly: a static, typed content array in `_data/*.ts` (discriminated by a `type` field per section), rendered by a `switch` in `page.tsx` that maps each section to a route-local component in `_components/`.

**Rationale**: `app/construction/page.tsx` and `app/services/_components/` both already establish this convention; `app/construction/_data/construction-content.ts` + `types.ts` is the closest analog (a single-page, non-CMS-integrated service-style page). Reusing it keeps this feature consistent with the two most recently built comparable pages and satisfies FR-008 (static content, no unnecessary client state) — the `page.tsx` itself needs no `"use client"` directive; only the FAQ's native `<details>` needs no client JS either.

**Alternatives considered**: A single monolithic page component with inline JSX per section (rejected — every other multi-section marketing page in this repo uses the typed-array + per-section-component split; a one-off flat file would be inconsistent and harder for a sibling page to copy).

## 3. Card/tile component reuse vs. new variants

**Decision**:
- **"Industries we modernize" (3 cards)** → reuse `GlassCard` variant `industry` as-is (icon, title, description, wrapped in a link) — matches its existing shape closely.
- **"Why AI-assisted modernization" (6 tiles)** → reuse `GlassCard` variant `reimagineWhy` as-is where its icon/type-scale tolerance covers the reference; if the reference's exact 40×40 icon box doesn't fit within `reimagineWhy`'s existing 44×44 (`h-11 w-11`) sizing without an unreliable utility-class override, use the new `IconTile` primitive instead (see #4).
- **"Our modernization services" (6 capability cards, numbered eyebrow + heading + lead + bullet list)** → no existing `GlassCard` variant carries a bullet list; add one new variant (e.g. `serviceCapability`) to `GlassCard`'s four variant maps, named generically (not page-specific) so a sibling "What We Do" page's own "our N services" section can reuse it directly.
- **"Related services" (6 cards, icon-left, compact)** → covered by the new `IconTile` primitive (see #4), not a `GlassCard` variant, since it's a plain flex-row tile without `GlassCard`'s backdrop-blur glass treatment in the reference (`rgba(255,255,255,0.03)` background, no `backdrop-filter`).
- **"Strategies we support" (6 tiles, label+description, no icon, no hover)** and **lifecycle steps (5, numbered)** → page-local Tailwind markup for the strategy tiles (too simple/non-recurring to justify a shared abstraction) and the new `ProcessSteps` shared primitive for the lifecycle strip (see #4 — this pattern very plausibly recurs on "How We Work"/Discovery Sprint-style pages).

**Rationale**: Principle III requires reusing an existing shared primitive wherever it fits and never duplicating one; FR-009/FR-012 require new shared building blocks where the pattern is genuinely reusable. `GlassCard`'s variant maps are a closed `Record<GlassCardVariant, string>` already extended once per prior page (`constructionChallenge`, `webinarUpcoming`, etc.) — adding one narrowly-scoped new variant here follows that established precedent rather than inventing a new card-component paradigm.

**Alternatives considered**: Forcing every card pattern through `GlassCard` (rejected — the strategy tiles and related-service cards don't share `GlassCard`'s blur/border-hover treatment in the reference; forcing them in would be a fidelity regression, not a simplification). Building one giant configurable "Card" mega-component covering every shape (rejected — over-engineering for four genuinely distinct visual shapes; Principle III's existing per-shape variant convention already handles this better).

## 4. New `components/ui/` primitives

| Component | Covers | Why shared, not route-local |
|---|---|---|
| `Hero.tsx` | Eyebrow, breadcrumbs, headline w/ gradient-highlight span, subtitle, primary+secondary CTA, and the right-side card's chrome (rounded-24 gradient background, decorative blurred-orb corner, bottom-divider caption row) with `media`/`mediaCaption` content slots | **Confirmed**, not speculative: directly inspected `TechGrit Product Engineering.dc.html`, `TechGrit Data AI.dc.html`, and `TechGrit Platform Engineering.dc.html` (all already in this repo) and found their `<!-- HERO -->` sections byte-identical to this page's in structure — same card padding/radius/gradient/blur-corner/caption-divider, same crumbs markup, differing only in eyebrow text, headline, stats, and caption copy. |
| `ContentBlock.tsx` | The "Modernization is more than migration"-style two-column block: left eyebrow/title/description, right chips-label + wrapping chip-pill list | Same three sibling prototypes' `<!-- INTRO -->` sections are structurally identical — same `0.9fr 1.1fr` grid, same chip markup, always exactly 6 chips — confirmed by direct inspection, not inferred. |
| `ProcessSteps.tsx` | 5-stage numbered lifecycle strip (`step`/`step-num` in the reference) | Same "N-step numbered process" shape is a generic marketing-site pattern (assessment → delivery flows); plausible reuse by future "How We Work"/Engagement Model/Discovery Sprint pages, not unique to modernization. |
| `IconTile.tsx` | "Related services" cards; fallback for "why" tiles if `reimagineWhy` doesn't fit exactly | Icon-left, heading+description compact tile is the single most common repeated shape across this reference file (why-tiles, related-service cards) and structurally identical to what sibling "What We Do" pages' own "why us"/"related services" sections will need. |
| `Faq.tsx` | 5-item FAQ accordion | The reference's own markup is native `<details>`/`<summary>` — zero JS needed for independent per-item expand/collapse (FR-005, FR-008). No FAQ component exists anywhere in the codebase today; every sibling service page in this reference family plausibly ends with the same FAQ pattern. |
| `Outcome.tsx` | Heading + description pairing | Per clarification and confirmed product direction (spec.md Q2 / FR-012): built now, not deferred, even though this page has no Outcome content to pass it and none of the six sibling prototypes inspected contain a literal "Outcome" heading+paragraph section either — this one rests on product-direction confirmation rather than file evidence, so it is kept deliberately minimal (two props only) to bound the cost of being wrong. |

**Rationale**: All six map directly onto FR-009 and FR-012's enumerated reusable patterns (hero, content block, icon/text card, numbered step, Outcome, CTA band) plus the explicit requirement not to hardcode page-specific copy inside a generic component — every prop is content, no page-specific string is compiled into any of the six. `Hero` and `ContentBlock` were originally scoped as route-local one-offs; on review (see plan.md's Complexity Tracking) that under-delivered FR-009's explicit requirement once the sibling-prototype evidence above was gathered, so both were promoted to shared primitives.

**Alternatives considered**: Skipping `Faq.tsx` and inlining raw `<details>` markup per-page (rejected — the same accordion shape is virtually certain to recur on every sibling "What We Do" page sharing this reference family, and inlining it once now just to duplicate it later contradicts FR-009's own stated intent). Giving `Hero`/`ContentBlock` an unconstrained `ReactNode` slot for their varying regions instead of typed props (`media`/`mediaCaption`, `chips: string[]`) — rejected as needlessly generic given the sibling prototypes confirm the actual shape (a media slot + caption; a label + string chip list), not an arbitrary one.

## 5. Hero image asset

**Decision**: `public/samples/dm-tech-debt.png`, reused from its existing homepage usage (`cms/api/home/value-proposition.ts`'s "Eradicate Technical Debt" card).

**Rationale**: Resolved by clarification (spec.md Q4). Closest semantic fit to the reference's "faster / cheaper / higher test coverage / lower downtime" modernization story among the assets actually present in `public/`; no new asset was supplied with this ticket.

**Alternatives considered**: `public/samples/dm-copilot.png` (also a homepage duplicate) and `public/samples/svc-eng.png` (currently unused, would have avoided the duplication) — both viable, but the user selected the closer semantic match over the duplication-avoidance option.

## 6. Nav/footer repointing (FR-011)

**Decision**: Edit exactly one line in `cms/api/footer.ts` — `DEFAULT_FOOTER_DATA.linkGroups[0].links[0].href` from `/services#svc-modernization"` to `/what-we-do/ai-modernization`. No change to `cms/api/header.ts`.

**Rationale**: `cms/api/footer.ts`'s `DEFAULT_FOOTER_DATA` is the only hardcoded pointer to the old anchor anywhere in the codebase (confirmed by full-repo grep). `cms/api/header.ts`'s `DEFAULT_HEADER_DATA.megaGroups` is `[]` by explicit design — the header degrades to a bare logo+CTA (no per-service entries at all) when the CMS is unreachable, so there is nothing there to repoint. This corrects an initial clarification answer (Q3) that assumed a header-side entry existed; the header nav's live mega-menu content is CMS-managed and out of this ticket's scope regardless (FR-002 forbids modifying Header, and the mega-menu itself is populated from Strapi at runtime, not from code).

**Alternatives considered**: Also adding a placeholder entry to `DEFAULT_HEADER_DATA.megaGroups` (rejected — that fallback is intentionally empty across the whole site, not specifically missing this one service; adding one entry for this service alone would be an inconsistent, unrequested change to unrelated header behavior).

## 7. Ambient background orbs

**Decision**: Add a new pathname branch to `components/ui/ambient-orbs.tsx` for `/what-we-do/` matching the reference's own 4-orb geometry exactly: top-right 620×620 `rgba(232,119,34,0.14)` blur 130 / mid-left 560×560 `rgba(2,132,199,0.10)` blur 140 (blue) / mid-right 520×520 `rgba(232,119,34,0.10)` blur 140 / bottom 660×660 `rgba(232,119,34,0.11)` blur 150.

**Rationale**: `AmbientOrbs` is a shared, pathname-switched component (`usePathname()`) already carrying one branch per route family (home, webinar, contact, careers/about/services-shared, construction/case-studies-opt-out, and a 3-orb default). Without a new branch, this page would fall through to the 3-orb default set, which has different orb count, sizes, and positions than the reference's actual 4-orb background (verified line-by-line against `TechGrit AI Modernization.dc.html` lines 141–146) — a real, avoidable fidelity gap. Adding a page-family branch here is the same kind of change every prior page in this repo already made to this exact file, not an unrelated global-styling change.

**Alternatives considered**: Accepting the 3-orb default (rejected — visible fidelity regression against FR-006/SC-001, and the fix is a well-precedented one-branch addition, not a redesign). Giving the page its own page-local inline orb markup like `app/construction/page.tsx` does (rejected — construction/case-studies opted out of the shared component only because their orb sets are unique one-offs across the whole site; this page's orb geometry is actually identical to the already-shared careers/about/services warm 4-orb set except for one blue orb, so it fits naturally as a new branch in the shared component rather than a bespoke page-local copy).

## 8. Icon reuse audit

**Decision**: Before adding any new SVG icon, check `components/ui/icons.tsx`'s existing ~63 exports for an exact or near-exact path match; only genuinely new shapes get a new export in that same file.

**Findings so far** (confirmed by direct source match, not guesswork):
- The reference's "Accelerated Code Transformation" why-tile icon (`polyline points="16 18 22 12 16 6"` + `"8 6 2 12 8 18"`) is byte-identical to an icon already exported in `icons.tsx` (used for "Software Product Engineering").
- The reference's "Lower Costs" why-tile icon (`M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6` dollar-sign curve) already exists in `icons.tsx`.
- The reference's "Reduced Risk" why-tile icon (`M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z` shield shape) already exists in `icons.tsx`.
- Remaining icons (magnifying glass "Faster Application Discovery", checkmark-circle "Improved Quality", ribbon/star "Enterprise-Grade Delivery", and the six numbered-capability/industry/related-service icons) need a pass against the full export list during implementation; add only what's genuinely missing.

**Rationale**: Principle III — `icons.tsx` is "the single consolidated SVG icon file for the whole app... never a per-route copy." Confirmed zero pre-existing FAQ or breadcrumbs ("crumbs") pattern anywhere in the codebase — both are new for this page (breadcrumbs are simple enough to stay page-local markup; the FAQ warrants the shared `Faq.tsx` per #4).

## 9. Testing approach

**Decision**: No automated tests (none exist in this repo for any page). Verification is `npm run lint` + `npm run build` (already Husky-gated) plus a manual side-by-side visual comparison against the reference `.dc.html` at desktop/laptop/tablet/mobile widths in a browser preview, per SC-001/SC-003.

**Rationale**: Constitution's Development Workflow section explicitly states no test framework is configured and this is a discovered gap, not a standard to preserve or invent a target for.

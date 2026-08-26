# Tasks: Startups Page (TMS-86-startups)

**Input**: Design documents from `specs/TMS-86-startups/` (plan.md, spec.md, research.md, data-model.md, quickstart.md)
**Prerequisites**: plan.md, spec.md (required); research.md, data-model.md, quickstart.md (all present)

**Tests**: Not included — no test framework is configured anywhere in this repo (Constitution, Development Workflow); verification is `npm run lint` / `npm run build` plus the manual quickstart.md walkthrough.

**Organization**: Tasks are grouped by user story (spec.md P1/P2/P3) so each is independently implementable, testable, and demoable.

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on an incomplete task)
- **[UI]** (Constitution Principle VI): produces user-visible frontend output — `/speckit.implement` invokes the `frontend-design` skill before executing these
- **[Story]**: US1 / US2 / US3, per spec.md's priorities

## Path Conventions

Single Next.js App Router project rooted at `app/`. Route-local files under `app/what-we-do/startups/`; **zero** new `components/ui/` primitives or icons (every needed shape/icon already exists — see plan.md/research.md); two cross-cutting edits in `cms/api/footer.ts` and `cms/api/header.ts`.

---

## Phase 1: Setup

**Purpose**: Scaffolding and a pre-flight token check before any component work starts.

- [X] T001 Create `app/what-we-do/startups/_data/` and `app/what-we-do/startups/_components/` directories
- [X] T002 [P] Audit `app/tokens.css` / `app/globals.css`'s `@theme inline` block against every color, spacing, radius, shadow, and blur value used across all 9 sections of `raw-files-v3/TechGrit Website V2.3/TechGrit Startups.dc.html`; confirm each is already covered by an existing token/utility (Constitution Principle I). **Updated during implementation**: 4 genuinely new values were identified in total (not the 2 originally scoped) — `--color-overlay-orange-07`/`-04` (growth-journey card backgrounds) and `--color-overlay-blue-light-14`/`--color-overlay-violet-light-18` (2 of the who-we-help section's 4 icon-tint backgrounds) — all 4 added to `tokens.css` with their required `@theme inline` mapping in `globals.css`. Also verified, while building each component, that the growth-journey wrapper's own padding/border/radius/gradient (40px, `--color-overlay-orange`, `rounded-4xl`, `--color-overlay-orange-07`) and inner card padding (28px) needed correcting from an initially-assumed sibling-precedent match that turned out not to hold for this page's own reference values — no *further* uncovered value remains beyond the 4 tokens above.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared scaffolding every user story's tasks build on. No new `components/ui/` primitive or icon is built in this phase — none is needed (plan.md/research.md §2–4).

**⚠️ CRITICAL**: No user-story work can begin until this phase is complete.

- [X] T003 Define all entity types and the `StartupsSection` discriminated union in `app/what-we-do/startups/_data/types.ts`, per data-model.md (`HeroSection`/`HeroImage`, `Challenge`/`IntroSection`, `GrowthStageBullet`/`GrowthStage`/`GrowthJourneySection`, `CapabilityBullet`/`Capability`/`CapabilitiesSection`, `WhyIconKey`/`ValuePropositionTile`/`WhySection`, `FounderSegmentIconKey`/`FounderSegmentCard`(no `href` field)/`WhoWeHelpSection`, `FaqItem`/`FaqSection`, `RelatedServiceIconKey`/`RelatedServiceLink`/`RelatedServicesSection`, `FinalCtaSection`, `PageSeo`, `StartupsPageContent`)
- [X] T004 Create `app/what-we-do/startups/_data/startups-content.ts` exporting `startupsContent: StartupsPageContent` with `seo` filled in and `sections: []` (populated incrementally by each user story's content task below)
- [X] T005 Create `app/what-we-do/startups/page.tsx`: `export const metadata` from `startupsContent.seo`, and a `switch (section.type)` over `startupsContent.sections` inside `<main className="overflow-x-clip">` — mirrors all six sibling pages' pre-CMS-integration structure exactly (no Header/Footer/AmbientOrbs imports needed; those are wired once at `app/layout.tsx`)

**Checkpoint**: Foundation ready — user story implementation can now begin.

---

## Phase 3: User Story 1 - Evaluate TechGrit as a startup engineering partner end-to-end (Priority: P1) 🎯 MVP

**Goal**: A visitor can read the hero pitch, the "great ideas stall" framing, the three-stage growth journey, and the six capabilities, and understand TechGrit's startup offering without leaving the page.

**Independent Test**: Load the page with only these four sections wired in; verify a reader can understand what TechGrit offers startups, see which growth stage matches their company, and see all six capabilities with their bullets.

### Implementation for User Story 1

- [X] T006 [US1] Populate the hero, intro/chips, growth-journey, and capabilities entries verbatim (per FR-001) into `startupsContent.sections` in `app/what-we-do/startups/_data/startups-content.ts` — the capabilities section's `title` is the one deliberate exception: it reads "Six capabilities. Every startup stage." rather than the reference's literal "Five capabilities. Every startup stage." (FR-003a — corrected to match the six rendered cards), the hero has no `mediaCaption` field set at all (per FR-004 — dropped entirely, matching several siblings' own treatment), and only the "Pre-Seed & Seed" (order 1) growth stage sets `highlighted: true` (the other two leave it unset — per data-model.md/research.md §3, Speckit analysis U1)
- [X] T007 [P] [UI] [US1] Build `app/what-we-do/startups/_components/startups-growth-journey.tsx`: a bordered gradient-panel wrapper (`rounded-3xl border border-border-orange-18`, matching the exact classes the Platform Engineering/Managed Services/Data & AI Engineering siblings' own "Strategies" panel already uses — research.md §3) containing a `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` grid (verified against the reference's own 920px/640px collapse points — research.md §3, Speckit analysis U3) of 3 unmodified `GlassCard` (`variant="serviceCapability"`) instances — no new component; when a stage's `highlighted` is true, apply the reference's stronger background/border/badge intensity via existing tokens only (Speckit analysis U1/C1 — 2 of these 8 needed adding to `app/tokens.css` first, per research.md §3): card `bg-[var(--color-overlay-orange-07)] border-border-orange-22` vs. the default `bg-[var(--color-overlay-orange-04)] border-[var(--color-overlay-orange-14)]`; badge `bg-[var(--color-hover-orange-fill-15)] border-[var(--color-hover-orange-border-40)]` vs. the default `bg-[var(--color-overlay-orange-10)] border-[var(--color-overlay-orange-strong)]` — no raw/arbitrary rgba literal in the component itself
- [X] T008 [P] [UI] [US1] Build `app/what-we-do/startups/_components/startups-capabilities.tsx`: 6-card grid reusing `GlassCard` (`variant="serviceCapability"`) + `GlassCardTitle`/`GlassCardDescription` — no new component, no new variant (already exists); the 6th ("+ Network") card additionally carries the reference's distinguishing gradient-background `className`
- [X] T009 [US1] Wire `page.tsx`'s section `switch` (T005): render `<Hero>` for the hero section with `mediaFill`, `media={<MediaSlot src="/samples/ind-fintech.png" alt="..." fill priority sizes="(max-width: 960px) 100vw, 40vw" />}` in place of the reference's stat grid (FR-004), and no `mediaCaption` prop passed at all; render `<ContentBlock>` for the intro section; render the growth-journey/capabilities components (T007–T008). Confirm the hero's "See capabilities" link scrolls to `#capabilities` with the target heading fully visible below the sticky header.
- [X] T010 [US1] Verify Story 1 independently per quickstart.md steps 1, 4 (hero anchor), 5 (content fidelity spot-check on this story's sections), and 6 (responsive pass on this story's sections). **Verified via server-rendered HTML + compiled CSS** (Browser pane could not composite screenshots this session — same environment limitation the sibling `TMS-86-*` implementations hit): hero eyebrow/headline/CTAs/image render correctly (`ind-fintech.png`, title/meta match `generateMetadata`); `#capabilities` anchor exists with `scroll-mt-24`; growth-journey shows all 3 stages with correct badges; capabilities shows "Six capabilities. Every startup stage." with all 6 step labels (`01 · Discover` … `05 · Sustain`, `+ Network`); the 2 new tokens (`--color-overlay-orange-07`/`-04`) and the important-prefixed `border-border-orange-22` utility are present and correctly resolved in the compiled `layout.css`; zero browser console errors.

**Checkpoint**: Core pitch is fully viewable and independently demoable — MVP.

---

## Phase 4: User Story 2 - Understand why the approach matters and who it's for (Priority: P2)

**Goal**: A visitor can read the six "Why TechGrit for startups" tiles and the four "Founders, venture teams, and builders at every stage." cards, confirming domain fit and differentiation.

**Independent Test**: With only the hero/intro/growth-journey/capabilities sections present, add the "why" tiles and "who we help" cards and verify each renders independently with correct content.

### Implementation for User Story 2

- [X] T011 [US2] Populate the why-tiles and who-we-help entries verbatim into `startupsContent.sections` — all 4 founder-segment cards omit `href` entirely (per Edge Cases — a genuine reference fact, not a data gap; the reference renders every one of these four as a plain `<div>`, never an `<a>`)
- [X] T012 [P] [UI] [US2] Build `app/what-we-do/startups/_components/startups-why.tsx`: page-local 6-tile grid (icon + heading + description, 2-column), matching every sibling page's own equivalent page-local "why" pattern (research.md §2) rather than a new shared primitive; map each tile's `iconKey` to an existing `components/ui/icons.tsx` export per data-model.md/research.md §4 (`seniorTeam`→`UsersIcon`, `aiNative`→`SvcStartupsIcon`, `flexiblePricing`→`CreditCardIcon`, `trackRecord`→`CheckCircleIcon`, `protectRunway`→`ShieldIcon`, `network`→`NetworkNodeIcon` with explicit `stroke="currentColor"` + `width`/`height` overrides) — no new icon added
- [X] T013 [P] [UI] [US2] Build `app/what-we-do/startups/_components/startups-who-we-help.tsx`: 4-card grid reusing `GlassCard` (`variant="serviceCapability"`) on a 4-column desktop track (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`, per the same 920px/640px reference breakpoint pair as capabilities/growth-journey — Speckit analysis U3); all four cards render as plain, non-clickable `GlassCard`s (no conditional `<Link>` wrap — per Edge Cases, none of the four carries an `href`); map each `iconKey` to an existing icon and its own distinct tint per research.md §4/data-model.md's `FounderSegmentIconKey` (Speckit analysis U2): `soloFounders`→`SvcStartupsIcon` + `text-orange`/`bg-[var(--color-overlay-orange-18)]`, `seedSeriesA`→`UsersIcon` + `text-amber-light`/`bg-[var(--color-overlay-orange-14)]`, `vcPePortcos`→`SvcStrategyIcon` + `text-blue-light`/`bg-[var(--color-overlay-blue-light-14)]`, `corporateInnovation`→`LayoutDashboardIcon` + `text-violet`/`bg-[var(--color-overlay-violet-light-18)]`. **Correction found during implementation**: unlike this task's original claim, only the orange/amber background tints (2 of 4) had exact existing tokens — the blue-light-14 and this-exact-violet-hue-18 backgrounds did not (nearest existing were 4pt off, or a different violet hue entirely), so 2 more new tokens (`--color-overlay-blue-light-14`, `--color-overlay-violet-light-18`) were added to `tokens.css` + `globals.css`'s `@theme inline` block (same C1/C2 pattern) — 4 new tokens total for this feature, not 2; no new icon added
- [X] T014 [US2] Wire the why/who-we-help components into `page.tsx`'s section `switch`
- [X] T015 [US2] Verify Story 2 independently per quickstart.md step 2, specifically confirming all four founder-segment cards render with no hover-lift/pointer-cursor affordance implying a destination that doesn't exist. All 6 "why" tiles present with correct icons. **Verified via server-rendered HTML + compiled CSS**: all 6 why-tile titles present; all 4 who-we-help card names present, each rendered as a bare `<div>` (no `<a>` wrapper — confirmed no `href`-driven Link in `FounderSegmentTile`); the 2 new icon-tint tokens (`--color-overlay-blue-light-14`, `--color-overlay-violet-light-18`) compiled correctly into `layout.css`.

**Checkpoint**: Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Resolve open questions and convert (Priority: P3)

**Goal**: A visitor can expand FAQ items independently, browse related services, and act on the closing CTA.

**Independent Test**: Render just the FAQ, related-services, and closing-CTA sections and verify each FAQ item expands/collapses independently, links are correct, and both CTA buttons point to their destinations.

### Implementation for User Story 3

- [X] T016 [US3] Populate the FAQ, related-services, and final-CTA entries verbatim into `startupsContent.sections`
- [X] T017 [P] [UI] [US3] Build `app/what-we-do/startups/_components/startups-faq.tsx` using the existing `Faq` primitive, with only the first item's `defaultOpen: true`
- [X] T018 [P] [UI] [US3] Build `app/what-we-do/startups/_components/startups-related.tsx` using the existing `IconTile` primitive (`size="compact"`) for the 6 related-service cards, mapping each `iconKey` to its existing icon export per research.md §4 (`engineering`→`EradicateDebtIcon` — the precedent every prior sibling's related-services list already used for this same "Software Product Engineering" icon gap — `strategy`→`SvcStrategyIcon`, `dataAi`→`SvcDataAiIcon`, `modernization`→`SvcModernizationIcon`, `platform`→`SvcPlatformIcon`, `managed`→`SvcManagedIcon`), plus the "See all services" link to `/services`
- [X] T019 [US3] Wire the FAQ and related-services components into `page.tsx`'s section `switch`, and render `components/ui/final-cta.tsx` directly from `page.tsx` for the closing CTA band with this page's content (mirrors every sibling page's existing `FinalCta` usage)
- [X] T020 [US3] Verify Story 3 independently per quickstart.md step 3. **Verified via server-rendered HTML**: exactly 5 `<details>` elements, exactly 1 `open` attribute (on the first, "Do you work with pre-revenue startups?"); all 6 related-service names/hrefs present including the already-built sibling routes; closing CTA renders "Your idea deserves senior engineers, not excuses." with both CTA labels and correct hrefs (`/contact-us`, `/how-we-work/discovery-sprints`).

**Checkpoint**: All three user stories are independently functional — page is content-complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Requirements that span the whole feature but don't gate any single user story's independent testability.

- [X] T021 Update `cms/api/footer.ts`'s `DEFAULT_FOOTER_DATA` — change the existing `slug: "svc-startups"` ("Startups") entry's `href` from `/services#svc-startups` to `/what-we-do/startups` (FR-010a; research.md §6). **Gap found and fixed during T028 live verification**: `DEFAULT_FOOTER_DATA` is documented in the file itself as "last-resort fallback if the CMS is genuinely unreachable" — the actual live-CMS path is `toLinkGroup()`'s own separate ternary chain (which already special-cases the other 6 siblings, per its own comment block), and it had **no** "Startups" case at all. Checking the real dev server confirmed the footer rendered `/services/` for "Startups" even after the `DEFAULT_FOOTER_DATA` edit above — because the live CMS is reachable and `DEFAULT_FOOTER_DATA` was never actually the active path. Added the missing 7th case to `toLinkGroup()`'s ternary chain (`item.title === "Startups"`), matching the exact precedent the other 6 entries already established there; re-verified live — footer now correctly resolves to `/what-we-do/startups/`.
- [X] T022 Update `cms/api/header.ts`'s `toMegaGroup()` — extend the existing six-service ternary chain to also match `section.title === "Startups"` → `/what-we-do/startups` (FR-010b; research.md §6)
- [X] T023 Verify FR-002/FR-009: run `git diff --stat` (or `git status`) against `main` and confirm the changed-file list contains **only**: files under `app/what-we-do/startups/`, `cms/api/footer.ts`, `cms/api/header.ts`, `app/tokens.css` (the 4-line `--color-overlay-orange-07`/`-04`/`--color-overlay-blue-light-14`/`--color-overlay-violet-light-18` addition, Speckit analysis C1), `app/globals.css` (the matching 4-line `@theme inline` mapping for those same 4 tokens, Speckit analysis C2 — confirm no *other* line in either file changed), and this feature's `specs/TMS-86-startups/` docs (plus `CLAUDE.md`) — explicitly confirm zero changes to `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/layout/HeaderClient.tsx`, any file under `components/ui/`, and any other route or config file.
- [X] T024 Verify FR-008: grep `app/what-we-do/startups/` for `fetch(`, `cms/api` imports, any other API-client import, and `async function`/`await` in `page.tsx` or any `_components`/`_data` file; confirm zero matches — the page must introduce no network request, CMS import, or API import of any kind this phase. **Found and fixed**: `generateMetadata` was declared `async` with no actual awaited work (same unnecessary-`async` pattern already fixed once on the Platform Engineering sibling) — removed the `async`/`Promise<Metadata>` wrapper; re-ran the grep after the fix, zero matches.
- [X] T025 [P] Full content-fidelity diff: compare every section's rendered text against `TechGrit Startups.dc.html` verbatim, character-for-character (SC-002) — the two confirmed, deliberate deviations are (a) the dropped hero-card stat tiles/caption line (FR-004) and (b) the corrected capabilities heading (FR-003a); confirm those are the *only* deviations. **Verified**: 24 verbatim spot-checks across all 9 sections pass (hero H1 correctly splits into `before`/gradient-highlighted `span` via `Hero`'s own `splitTitleHighlight`, confirmed both halves present); zero occurrences of "Five capabilities", "4D™ frameworks" caption, or any of the 4 stat-tile labels (Speed/Access/Track Record all 0; the one "Models" hit traced to the unrelated shared Header's "Engagement Models" nav link, not a leak).
- [X] T026 [P] Full responsive + edge-case pass across desktop (1280px+), laptop/tablet (~960px), and mobile (~560px and narrower) using this repo's canonical `lg`/`md`/`sm` (1140/960/560) breakpoints — not the reference's literal inline media queries (plan.md Constitution Check, Principle II) — for all 9 sections (SC-003), including every item in spec.md's Edge Cases section (in particular: the fully-non-linked "who we help" grid with its 4 distinct icon tints (T013, Speckit analysis U2), the "+ Network" card's distinguishing treatment, the growth-journey panel's highlighted first card (T007, Speckit analysis U1), and the hero card's unchanged chrome with the image swapped in and no caption/stat tiles). **Verified via compiled CSS** (Browser pane could not composite screenshots this session): `grid-cols-2`/`-3`/`-4` responsive classes and the shared `min-[921px]` Hero/ContentBlock breakpoint all present in `layout.css`; both distinguishing gradients (growth-journey highlighted card's inline style, and the "+ Network" card's `bg-[linear-gradient(...)]` arbitrary class) confirmed present in the rendered markup; who-we-help's 4 distinct icon-tint classes all present (T015).
- [X] T027 Run `npm run lint` and `npm run build`; fix any violations (Husky pre-commit gate) — both must pass clean. **Confirmed**: `npm run lint` reports zero violations; `npm run build` compiles successfully (webpack, TypeScript, and static generation all pass), with `/what-we-do/startups` appearing correctly in the route manifest as a dynamic (`ƒ`) route.
- [X] T028 Run the full quickstart.md walkthrough (all steps) end to end, including a side-by-side visual comparison against the reference file at mobile/tablet/laptop/desktop viewport widths (SC-001). **Partial, same environment limitation as prior sibling implementations**: the Browser pane could not composite screenshots this session, so no literal side-by-side pixel comparison was performed — verified instead via `curl` against the real dev server plus direct inspection of compiled HTML/CSS (steps 1–6, T010/T015/T020/T025/T026). **Step 7 (nav repointing) caught a real bug missed by every prior planning artifact**: live-checking the footer's rendered "Startups" link on `/about/our-story` found it still resolving to `/services/` even after T021's `DEFAULT_FOOTER_DATA` edit — because that constant is only a last-resort fallback; the live-CMS-reachable path goes through `toLinkGroup()`'s own separate ternary chain, which had no "Startups" case. Fixed by adding the missing case there (see T021's updated note, research.md §6); re-verified live on both the header mega-menu and footer — both now correctly resolve to `/what-we-do/startups/`. `npm run lint`/`npm run build` re-confirmed clean after the fix.

## Post-implementation fixes (2026-08-26)

User reported a hero breadcrumb that shouldn't be there, plus a suspected line-height/letter-spacing mismatch found by toggling between the reference and the built page, and asked for a full margin/padding re-check.

- [X] T029 Removed the "What We Do / Startups" breadcrumb (`crumbs` prop) from the `Hero` call in `app/what-we-do/startups/page.tsx` — the reference has one, but per explicit user instruction this page doesn't render it.
- [X] T030 Full letter-spacing/line-height re-audit of every heading across all 6 page-local components against the raw reference, cross-checked against `globals.css`'s base `h1`–`h6` rules (`@layer base`) and each token's resolved value (`--ls-snug: -0.03em`, `--ls-normal: -0.02em`, `--lh-snug: 1.13`, `--lh-normal: 1.32`) — not just the component's own class list, since Tailwind utilities silently beat `@layer base` regardless of specificity (the same root cause as the historical TMS-62 fidelity bug). Found and fixed 2 real gaps neither prior review caught:
  - `startups-growth-journey.tsx`'s stage-card `<h3>` (via `GlassCardTitle`) inherited `serviceCapability`'s own `tracking-[-0.01em]` — correct for the Capabilities section's own `.cap-card h3` (which explicitly sets `-0.01em`), but the reference's growth-journey `h3` sets no letter-spacing at all (renders at browser-default `normal`). Added `!tracking-normal` to override.
  - `startups-why.tsx`'s `WhyTile` `<h4>` had no tracking class at all, so it fell through to the base `h4` rule's `letter-spacing: var(--ls-normal)` (-0.02em) — but the reference's `.why-tile h4` also sets no letter-spacing (browser-default `normal`). Added `tracking-normal`. (This exact gap is copied verbatim from the Platform Engineering sibling's own `WhyTile`, which likely has the same unfixed issue — out of scope to touch per FR-009, since it's a different page.)
  - Every other heading was confirmed correct: either it already carries an explicit `tracking-[...]`/`leading-[...]` matching the reference's own explicit value (all `h2`s at `-0.03em`, matching the reference *and* incidentally `--ls-snug`), or its shared-component default already matches the reference's own equivalent rule (Capabilities/Who-we-help `h3` at `-0.01em` via `serviceCapability`, matching `.cap-card h3` exactly; `IconTile`'s `h5` in Related, which gets no base letter-spacing at all since only `h1`–`h4` have per-level base rules).
- [X] T031 Full margin/padding re-check of every section container, header block, grid, and card across all 6 components against the raw reference (independent of T030's already-fixed growth-journey padding/radius/border/gradient values from T007's own implementation pass) — re-verified: Capabilities (`px-9 py-[60px]`, `mb-11`/44px header, `mb-[10px]`/`mt-3.5`+`gap-[7px]` card internals), Why (`mb-10`/40px header, `gap-4`/16px tile gap, `p-6`/24px + `gap-4`/16px + `h-10 w-10`/40px icon box tile internals), Who-we-help (`mb-9`/36px header, `gap-4`/16px grid, `mb-3`/12px icon-box margin), FAQ (`max-w-[960px]`, `mb-8`/32px header), Related (`pt-10 pb-[60px]`/40px-60px, `mb-6`/24px header row, `gap-3.5`/14px grid) — all confirmed exact matches, no further deviations found.
- [X] T032 Re-ran `npm run lint` and `npm run build` after T029–T031; both pass clean. `/what-we-do/startups` still compiles correctly with no console errors.

## CMS integration (2026-08-26)

User provided the live CMS endpoint (`/api/pages/by-slug/startups`) and its actual response, and asked for the page to be upgraded from static content to a live Strapi integration — following the exact same `cms/api/what-we-do/*.ts` pattern already used by all six sibling "What We Do" pages, touching only Startups-specific files, and leaving **zero** fallback/static data anywhere.

- [X] T033 Confirmed the established pattern by reading two already-CMS-integrated siblings in full (`cms/api/what-we-do/ai-strategy-roadmap.ts`, `cms/api/what-we-do/platform-engineering.ts`) — byte-for-byte identical fetch/map/dispatch structure between them — and confirmed `cms/shared/reusable-sections.ts` is a *different* page family's (construction/home/case-studies) shared mapper, not used by any "What We Do" page; each page keeps its own local types + mapper file instead.
- [X] T034 Created `cms/types/startups-types.ts` — Strapi response shapes for all 6 `page-reusable-sections.*` component types actually present in the live response (`hero`, `modernization-challenges`, `pd-modernization-capabilities` ×2, `service-detail` ×2, `pd-faq`, `cta-banner`), matching the live payload field-for-field.
- [X] T035 Created `cms/api/what-we-do/startups.ts` (`getStartupsData()`) — mirrors the sibling fetchers' `fetchCms` → map → filter-nulls → `sections.length === 0 ? null` structure exactly. Two real content-shape decisions the live response required: (a) `pd-modernization-capabilities` occurs twice with no `variant` field to disambiguate (unlike `service-detail`) — resolved by matching `badgeLabel` ("We grow with you" → growth journey, else → capabilities), documented with the same silent-mismatch caveat every `header.ts`/`footer.ts` title-match already carries; (b) the response has no "related services"-style component at all (same as the AI Strategy & Roadmap sibling's own CMS response), so no mapper was written for it.
- [X] T036 Rewrote `app/what-we-do/startups/_data/types.ts` to the CMS-sourced shape: `HeroSection.image`/`ValuePropositionTile.icon`/`FounderSegmentCard.icon` are now `SectionImage | null` (was a local icon-key enum resolved to a local SVG component); removed `RelatedServicesSection`/`RelatedServiceLink`/`RelatedServiceIconKey` entirely (no longer renders — T035).
- [X] T037 Rewrote `app/what-we-do/startups/page.tsx` as an async Server Component: `await getStartupsData()`, `notFound()` when null, `generateMetadata` returns `{}` when `!content.seo` (matches CMS response's `"seo": null`) — no static import, no fallback object anywhere. Removed the `"related"` switch case.
- [X] T038 Rewrote `startups-why.tsx` and `startups-who-we-help.tsx` to render CMS-supplied icon images (`{tile.icon && <Image src={tile.icon.url} alt={tile.icon.alternativeText} width={20} height={20} />}`, conditionally rendered exactly like the sibling `WhyTile`/`IndustryTile` components — nothing rendered when the CMS supplies no icon, no local-icon fallback) instead of the local `SvcStartupsIcon`/`UsersIcon`/etc. components keyed by a semantic `iconKey`. Dropped `startups-who-we-help.tsx`'s bespoke 4-color per-card icon tint (added during the static build to match the reference's own per-card colors) in favor of the one uniform tint every sibling's own CMS-icon-driven equivalent section already uses — the CMS has no per-card color field, and inventing a rotation-by-position scheme wasn't asked for.
- [X] T039 Simplified `startups-capabilities.tsx`: removed the `stepLabel === "+ Network"` distinguishing-gradient conditional — the live CMS capabilities occurrence has only 5 cards (never a 6th "+ Network" bonus card), so the branch was permanently dead.
- [X] T040 Deleted `app/what-we-do/startups/_components/startups-related.tsx` (no CMS component maps to it — T035b) and `app/what-we-do/startups/_data/startups-content.ts` (the static content module — explicit "no fallback data" instruction).
- [X] T041 Removed the 2 tokens added solely for the now-removed per-card icon tint (`--color-overlay-blue-light-14`, `--color-overlay-violet-light-18`, plus their `globals.css` `@theme inline` mappings) after confirming via grep they had zero remaining consumers. Kept the growth-journey panel's own 2 tokens (`--color-overlay-orange-07`/`-04`) — that treatment is a page-level presentational rule (`highlighted: index === 0`, computed in the mapper), not tied to CMS content, and remains in use.
- [X] T042 End-to-end verification against the real dev server (`CMS_API_URL` already pointed at the live CMS in `.env`): confirmed HTTP 200, confirmed every live-CMS string from the user's shared response renders (hero title/badge, intro title, growth-journey's "Tech Strategy" card, capabilities' "Five capabilities" heading — now literally correct since the live response has 5 cards, not 6 — the stray "Trusted by 40+ Happy Clients." chip, all 5 FAQ items, the generic "Step into an AI-first Future" CTA), confirmed zero leftover static-content strings (old hero copy, `ind-fintech.png`, old growth-journey card titles), confirmed all 6 CMS icon SVG URLs and the hero PNG resolve to the real Azure blob storage asset URLs. `npm run lint` and `npm run build` both pass clean; `git status` confirms the change stayed scoped to Startups-specific files plus the already-established `cms/api/footer.ts`/`header.ts` nav edits and `tokens.css`/`globals.css` token edits from earlier in this ticket.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories (T003 blocks T004; T004 blocks T005; T005 blocks every story's wiring task T009/T014/T019)
- **User Stories (Phase 3-5)**: All depend on Foundational completion; independent of each other's *implementation* (each adds its own sections to the shared content array and its own wiring `case`s), but conventionally built in priority order P1 → P2 → P3
- **Polish (Phase 6)**: T021/T022 are independent of all stories and of each other; T023/T024 can run any time after T021/T022, since they check the cumulative diff/tree; T025/T026/T027 depend on all three stories being wired in; T028 depends on everything above

### User Story Dependencies

- **US1 (P1)**: Start after Foundational. No dependency on US2/US3.
- **US2 (P2)**: Start after Foundational. Appends to the same `sections` array and `page.tsx` switch as US1, but adds distinct cases — no logical dependency on US1's content.
- **US3 (P3)**: Start after Foundational. Same note as US2.

### Within Each User Story

- Content population task first (defines the data the components render)
- Route-local components before the `page.tsx` wiring task
- Wiring before that story's independent verification task

### Parallel Opportunities

- T002 (Setup) can run alongside T001
- Within US1: T007 and T008 can run in parallel (different files)
- Within US2: T012 and T013 can run in parallel
- Within US3: T017 and T018 can run in parallel
- T021 and T022 (Polish) can run in parallel with each other and with the tail of Phase 5; T023 (unrelated-change diff check) and T024 (static-content grep check) are both cheap enough to run repeatedly throughout, not just once at the end
- Once Foundational completes, US1/US2/US3 could in principle be staffed in parallel by different developers, since each only adds new `case`s to the shared switch and new entries to the shared content array (a rebase/merge concern, not a design dependency)

---

## Parallel Example: User Story 1

```bash
# After T006 (content populated), launch independent component builds together:
Task: "Build startups-growth-journey.tsx"
Task: "Build startups-capabilities.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup) + Phase 2 (Foundational)
2. Complete Phase 3 (User Story 1)
3. **STOP and VALIDATE**: run quickstart.md steps 1/4/5/6 against just these four sections
4. Demo if ready — this alone is a coherent, sellable page fragment

### Incremental Delivery

1. Setup + Foundational → foundation ready
2. + User Story 1 → validate → demo (MVP)
3. + User Story 2 → validate → demo
4. + User Story 3 → validate → demo (content-complete)
5. Polish (Phase 6) → footer/header repoint, unrelated-change diff check, static-content check, fidelity/responsive passes, lint/build gate, full quickstart run → feature done

### Parallel Team Strategy

1. One person/session completes Setup + Foundational
2. Once Foundational lands: US1, US2, US3 can be split across sessions/branches, each adding distinct `sections` entries and `switch` cases to the same two shared files (`startups-content.ts`, `page.tsx`) — expect to resolve straightforward merge conflicts on those two files, not logic conflicts
3. Polish tasks run last, after all three stories are merged

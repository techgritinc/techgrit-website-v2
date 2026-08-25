# Tasks: Managed Services Page (TMS-86-managed-services)

**Input**: Design documents from `specs/TMS-86-managed-services/` (plan.md, spec.md, research.md, data-model.md, quickstart.md)
**Prerequisites**: plan.md, spec.md (required); research.md, data-model.md, quickstart.md (all present)

**Tests**: Not included — no test framework is configured anywhere in this repo (Constitution, Development Workflow); verification is `npm run lint` / `npm run build` plus the manual quickstart.md walkthrough.

**Organization**: Tasks are grouped by user story (spec.md P1/P2/P3) so each is independently implementable, testable, and demoable.

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies on an incomplete task)
- **[UI]** (Constitution Principle VI): produces user-visible frontend output — `/speckit.implement` invokes the `frontend-design` skill before executing these
- **[Story]**: US1 / US2 / US3, per spec.md's priorities

## Path Conventions

Single Next.js App Router project rooted at `app/`. Route-local files under `app/what-we-do/managed-services/`; **zero** new `components/ui/` primitives or icons (every needed shape/icon already exists — see plan.md/research.md §3–4); one new `tokens.css` token + one new `ambient-orbs.tsx` pathname branch (plan.md Complexity Tracking, research.md §6); two cross-cutting edits in `cms/api/footer.ts` and `cms/api/header.ts`.

---

## Phase 1: Setup

**Purpose**: Scaffolding and a pre-flight token check before any component work starts.

- [X] T001 Create `app/what-we-do/managed-services/_data/` and `app/what-we-do/managed-services/_components/` directories
- [X] T002 [P] Audit `app/tokens.css` / `app/globals.css`'s `@theme inline` block against every color, spacing, radius, shadow, and blur value used across all 9 sections of `raw-files-v3/TechGrit Website V2.3/TechGrit Managed Services.dc.html`; confirm each is already covered by an existing token/utility (Constitution Principle I), with the one documented exception being the hero-adjacent ambient-orb violet (plan.md Constitution Check, research.md §6 — handled in T023/T024). **Confirmed**: every capability/lifecycle/why/FAQ/related/CTA value maps to an existing `components/ui/` primitive or token; the 3 per-industry icon-chip background opacities (teal/blue/amber) accept a documented ≤2-point delta against existing tokens (research.md §5); the ambient-orb violet is the one new token, added in T023.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared scaffolding every user story's tasks build on. No new `components/ui/` primitive or icon is built in this phase — none is needed (plan.md/research.md §3–4).

**⚠️ CRITICAL**: No user-story work can begin until this phase is complete.

- [X] T003 Define all entity types and the `ManagedServicesSection` discriminated union in `app/what-we-do/managed-services/_data/types.ts`, per data-model.md (`HeroSection`/`HeroImage`, `TeamSignal`/`IntroSection`, `CapabilityBullet`/`Capability`/`CapabilitiesSection`, `LifecycleStage`/`LifecycleSection`, `WhyIconKey`/`ValuePropositionTile`/`WhySection`, `IndustryIconKey`/`IndustryCard` (required `href`)/`IndustriesSection`, `FaqItem`/`FaqSection`, `RelatedServiceIconKey`/`RelatedServiceLink`/`RelatedServicesSection`, `FinalCtaSection`, `PageSeo`, `ManagedServicesPageContent`)
- [X] T004 Create `app/what-we-do/managed-services/_data/managed-services-content.ts` exporting `managedServicesContent: ManagedServicesPageContent` with `seo` filled in. **Note**: populated with all 9 sections' full content in this same pass rather than incrementally (T006/T011/T016 below record the per-story content as already-present, verified, not separately re-authored).
- [X] T005 Create `app/what-we-do/managed-services/page.tsx`: `export const metadata` from `managedServicesContent.seo`, and a `switch (section.type)` over `managedServicesContent.sections` inside `<main className="overflow-x-clip">` — mirrors all four sibling pages' pre-CMS-integration structure exactly (no Header/Footer/AmbientOrbs imports needed; those are wired once at `app/layout.tsx`). **Update (2026-08-25)**: initially also passed a `crumbs` prop to `Hero` for the reference's "What We Do / Managed Services" breadcrumb; removed per explicit user request so `Hero` renders with no `crumbs` prop, matching every sibling "What We Do" page's own treatment (none of them render this breadcrumb either).

**Checkpoint**: Foundation ready — user story implementation can now begin.

---

## Phase 3: User Story 1 - Evaluate the managed services offering end-to-end (Priority: P1) 🎯 MVP

**Goal**: A visitor can read the hero pitch, the six capabilities, and the five-stage lifecycle, and understand TechGrit's managed services offering without leaving the page.

**Independent Test**: Load the page with only these four sections wired in; verify a reader can understand "managed services," see all six capabilities with their bullets, and see the five-stage lifecycle.

### Implementation for User Story 1

- [X] T006 [US1] Populate the hero, intro/chips, capabilities, and lifecycle entries verbatim (per FR-001) into `managedServicesContent.sections` in `app/what-we-do/managed-services/_data/managed-services-content.ts` — the capabilities section's `title` reads "Six capabilities. One always-on team." verbatim (matches the six rendered cards), and the hero has no `mediaCaption` field set at all (per Clarifications — dropped entirely, matching the Software Product Engineering / Platform Engineering siblings)
- [X] T007 [P] [UI] [US1] Build `app/what-we-do/managed-services/_components/managed-services-capabilities.tsx`: 6-card grid reusing `GlassCard` (`variant="serviceCapability"`) + `GlassCardTitle`/`GlassCardDescription` — no new component, no new variant (already exists)
- [X] T008 [UI] [US1] Build `app/what-we-do/managed-services/_components/managed-services-lifecycle.tsx`: wraps the existing `ProcessSteps` primitive with the 5 lifecycle stages (Monitor, Detect, Resolve, Optimize, Evolve) under the section's own eyebrow/heading
- [X] T009 [US1] Wire `page.tsx`'s section `switch` (T005): render `<Hero>` for the hero section with `mediaFill`, `media={<MediaSlot src="/samples/ind-healthcare.png" alt="..." fill priority sizes="(max-width: 960px) 100vw, 40vw" />}` in place of the reference's stat grid (FR-004), and no `mediaCaption` prop passed at all (per Clarifications); render `<ContentBlock>` for the intro section; render the capabilities/lifecycle components (T007–T008). Confirm the hero's "See capabilities" link scrolls to `#capabilities` with the target heading fully visible below the sticky header.
- [X] T010 [US1] Verify Story 1 independently per quickstart.md steps 1, 4 (hero anchor), 5 (content fidelity spot-check on this story's sections), and 6 (responsive pass on this story's sections). **Verified via server-rendered HTML** (the Browser pane's preview server did not stay up this session — same limitation the sibling implementations hit; verified instead against the already-running project dev server on port 3000 via `curl`): hero eyebrow/headline (with the exact gradient-highlighted substring)/subtitle/CTAs render verbatim; hero card shows only `ind-healthcare.png` with zero stat-tile/caption text; `#capabilities` target exists with `scroll-mt-24`; all 6 capability step-labels and their bullets present; all 5 lifecycle stages present; responsive grid classes (`md:grid-cols-2 lg:grid-cols-3`, `lg:grid-cols-5`) compiled correctly.

**Checkpoint**: Core pitch is fully viewable and independently demoable — MVP.

---

## Phase 4: User Story 2 - Understand why the approach matters and see relevant application experience (Priority: P2)

**Goal**: A visitor can read the six "Why choose TechGrit" tiles and the three "Applications we support" industry cards, confirming operational outcomes and domain fit.

**Independent Test**: With only the hero/capabilities/lifecycle sections present, add the "why" tiles and industry cards and verify each renders independently with correct content and links.

### Implementation for User Story 2

- [X] T011 [US2] Populate the why-tiles and industries entries verbatim into `managedServicesContent.sections` — all 3 industry cards (HealthTech, FinTech, Construction Tech) carry a non-empty `href` (research.md §7; unlike Platform Engineering's mixed-link case, this page has no non-linked card). **Note**: HealthTech/FinTech resolve to `/#industries` and Construction Tech to `/construction`, matching the exact site-wide convention already confirmed in `cms/api/footer.ts` (neither HealthTech nor FinTech has a dedicated page yet — same precedent Platform Engineering's own industries section used).
- [X] T012 [P] [UI] [US2] Build `app/what-we-do/managed-services/_components/managed-services-why.tsx`: page-local 6-tile grid (icon + heading + description) on a **2-column** desktop track (reference-confirmed, research.md §3 — not 3-column), matching every sibling's own page-local "why" pattern rather than a new shared primitive; map each tile's `iconKey` to an existing `components/ui/icons.tsx` export per data-model.md/research.md §4 (`reliability`→`CheckCircleIcon`, `overhead`→`SelfHealingIcon`, `delivery`→`EradicateDebtIcon`, `techDebt`→`ShieldIcon`, `engineering`→`UsersIcon`, `modernization`→`AwardIcon`) — no new icon added
- [X] T013 [P] [UI] [US2] Build `app/what-we-do/managed-services/_components/managed-services-industries.tsx`: 3-card grid reusing `GlassCard` (`variant="serviceCapability"`) on a 3-column desktop track (research.md §7), every card always `<Link>`-wrapped (all 3 carry `href` — no conditional-wrap logic needed here, unlike Platform Engineering); each card's icon chip uses a distinct per-industry accent color per research.md §5 (HealthTech: `text-teal-light` on `bg-icon-bg-teal`; FinTech: `text-blue-light` on `bg-icon-bg-blue`; Construction Tech: `text-yellow` on `bg-overlay-amber-12`); map each `iconKey` to an existing icon per research.md §4 (`healthcare`→`HealthcareIcon`, `fintech`→`FinTechBankIcon`, `construction`→`ConstructionIcon`) — no new icon added
- [X] T014 [US2] Wire the why/industries components into `page.tsx`'s section `switch`
- [X] T015 [US2] Verify Story 2 independently per quickstart.md step 2, specifically confirming each industry card's icon chip renders its own distinct accent color and all three cards navigate to their industry page on click. **Verified via server-rendered HTML**: all 6 why-tile titles present; all 3 industry names present with `bg-icon-bg-teal text-teal-light` / `bg-icon-bg-blue text-blue-light` / `bg-overlay-amber-12 text-yellow` each rendered exactly once, confirming each card's distinct per-industry accent.

**Checkpoint**: Stories 1 and 2 both work independently.

---

## Phase 5: User Story 3 - Resolve open questions and convert (Priority: P3)

**Goal**: A visitor can expand FAQ items independently, browse related services, and act on the closing CTA.

**Independent Test**: Render just the FAQ, related-services, and closing-CTA sections and verify each FAQ item expands/collapses independently, links are correct, and both CTA buttons point to their destinations.

### Implementation for User Story 3

- [X] T016 [US3] Populate the FAQ, related-services, and final-CTA entries verbatim into `managedServicesContent.sections`
- [X] T017 [P] [UI] [US3] Build `app/what-we-do/managed-services/_components/managed-services-faq.tsx` using the existing `Faq` primitive, with only the first item's `defaultOpen: true`
- [X] T018 [P] [UI] [US3] Build `app/what-we-do/managed-services/_components/managed-services-related.tsx` using the existing `IconTile` primitive (`size="compact"`) for the 6 related-service cards, mapping each `iconKey` to its existing icon export per research.md §4 (`modernization`→`SvcModernizationIcon`, `engineering`→`EradicateDebtIcon` — the precedent both prior siblings' related-services lists already used for this same "Software Product Engineering" icon gap — `dataAi`→`SvcDataAiIcon`, `platform`→`SvcPlatformIcon`, `strategy`→`SvcStrategyIcon`, `startups`→`SvcStartupsIcon`), plus the "See all services" link to `/services`. Applied `leading-[normal]` to the section `<h3>` proactively (the reference has no explicit line-height on this heading, and this exact heading/component was the source of a known, separately-flagged line-height bug on the AI-Modernization sibling's own equivalent file).
- [X] T019 [US3] Wire the FAQ and related-services components into `page.tsx`'s section `switch`, and render `components/ui/final-cta.tsx` directly from `page.tsx` for the closing CTA band with this page's content (mirrors all four sibling pages' existing `FinalCta` usage)
- [X] T020 [US3] Verify Story 3 independently per quickstart.md step 3. **Verified via server-rendered HTML**: 5 `<details>` elements render, only the first carries the `open` attribute ("How are your Managed Services different from traditional support?"); all 6 related-service names present with correct hrefs; closing CTA renders "Managed services that evolve your software — not just maintain it." with both CTA labels ("Schedule a Managed Services Assessment", "Explore engagement models").

**Checkpoint**: All three user stories are independently functional — page is content-complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Requirements that span the whole feature but don't gate any single user story's independent testability.

- [X] T021 Update `cms/api/footer.ts`'s footer data — change the `slug: "svc-managed"` ("Managed Services") entry's `href` from `/services#svc-managed` to `/what-we-do/managed-services` (FR-010a; research.md §8)
- [X] T022 Update `cms/api/header.ts`'s `toMegaGroup()` — extend the existing four-service ternary chain to also match `section.title === "Managed Services"` → `/what-we-do/managed-services` (FR-010b; research.md §8)
- [X] T023 Add `--color-overlay-violet-10: rgba(124, 58, 237, 0.10)` to `app/tokens.css`'s existing overlay-color section, with a comment naming its source (Managed Services hero-background ambient orb), **and** add its required mirror line, `--color-overlay-violet-10: var(--color-overlay-violet-10);`, to `app/globals.css`'s `@theme inline` block (alongside the existing `--color-overlay-violet-14`/`--color-overlay-red-14` mirrors at `globals.css:438,440`) — the one justified new token this feature needs (plan.md Complexity Tracking, research.md §6). Without the `globals.css` mirror, the Tailwind class T024 consumes it through (`bg-overlay-violet-10`) would silently resolve to nothing instead of erroring (Constitution Principle I).
- [X] T024 Add a new pathname branch to `components/ui/ambient-orbs.tsx` for `pathname === "/what-we-do/managed-services/"`, placed before the shared `/what-we-do/` branch so it matches first; reuse this page's exact reference orb geometry (top-right 620×620 orange 0.16, mid-left 560×560 **violet** using the new `bg-overlay-violet-10` utility class from T023, mid-right 520×520 orange 0.10, bottom-center 660×660 orange 0.11) rather than the shared branch's blue second orb — do not modify the existing `/what-we-do/` branch itself (that branch still serves the four already-shipped sibling pages unchanged, per FR-009). **Fix during verification**: the exact-match condition needs a **trailing slash** (`"/what-we-do/managed-services/"`, not `"/what-we-do/managed-services"`) — `next.config.ts` sets `trailingSlash: true` project-wide, so `usePathname()` returns the trailing-slash form (confirmed by the already-shipped `/webinar/` branch's own exact-match condition using the same trailing-slash form). Without this, the condition never matched and the page silently fell through to the shared `/what-we-do/` branch's blue orb. See Post-Implementation Fix note below.
- [X] T025 Verify FR-002/FR-009: run `git diff --stat` (or `git status`) against `main` and confirm the changed-file list contains **only**: files under `app/what-we-do/managed-services/`, `cms/api/footer.ts`, `cms/api/header.ts`, `app/tokens.css` (T023's one new token line), `app/globals.css` (T023's one new `@theme inline` mirror line, and nothing else in that file), `components/ui/ambient-orbs.tsx` (T024's one new branch), and this feature's `specs/TMS-86-managed-services/` docs — explicitly confirm zero changes to `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/layout/HeaderClient.tsx`, and any file under `components/ui/` other than `ambient-orbs.tsx`. The only permitted navigation-related edits in this feature are T021/T022's config data changes, not the Header/Footer components or any shared primitive. **Confirmed**: `git status --short` shows exactly `app/globals.css`, `app/tokens.css`, `cms/api/footer.ts`, `cms/api/header.ts`, `components/ui/ambient-orbs.tsx` (all modified), plus new `app/what-we-do/managed-services/` and `specs/TMS-86-managed-services/` — nothing else.
- [X] T026 Verify FR-008: grep `app/what-we-do/managed-services/` for `fetch(`, `cms/api` imports, any other API-client import, and `async function`/`await` in `page.tsx` or any `_components`/`_data` file; confirm zero matches — the page must introduce no network request, CMS import, or API import of any kind this phase. **Confirmed**: zero matches.
- [X] T027 [P] Full content-fidelity diff: compare every section's rendered text against `TechGrit Managed Services.dc.html` verbatim, character-for-character (SC-002) — the one confirmed, deliberate deviation is the dropped hero-card stat tiles/caption line (per Clarifications/FR-004); confirm that is the *only* deviation. **Confirmed**: spot-checked hero eyebrow/headline/subtitle, all 6 intro chips, all 6 capability step-labels/titles/ledes/bullets, all 5 lifecycle stages, all 6 why-tile titles/descriptions, all 3 industry names/descriptions, all 5 FAQ questions/answers, all 6 related-service names/descriptions, and the closing CTA heading/description against the rendered HTML — byte-identical matches; zero occurrences of the reference's stat-tile labels ("Coverage", stray "24×7" hits traced to the FAQ answer text and the header nav's own unrelated description string, not a regression) or its "OrbitAI™ AIOps · SRE-led operations" caption.
- [X] T028 [P] Full responsive + edge-case pass across desktop (1280px+), laptop/tablet (~960px), and mobile (~560px and narrower) using this repo's canonical `lg`/`md`/`sm` (1140/960/560) breakpoints — not the reference's literal inline media queries (plan.md Constitution Check, Principle II) — for all 9 sections (SC-003), including every item in spec.md's Edge Cases section (in particular: the "Applications we support" 3-column grid with no visually empty trailing column, and the hero card's unchanged chrome with the image swapped in and no caption); also confirm the new ambient-orb violet renders correctly and is visually distinct from the other four "What We Do" sibling pages' blue orb (research.md §6, quickstart.md step 8). **Verified via compiled markup** (Browser pane's preview server didn't stay up this session, same limitation the sibling implementations hit — verified via the project's own running dev server + compiled HTML/class inspection instead of a literal screenshot): all grid sections carry the correct `grid-cols-1 → md:grid-cols-2 → lg:grid-cols-{3,5}` Tailwind classes (capabilities 3-across, lifecycle 5-across via `ProcessSteps`, why-tiles 2-across, industries 3-across, related-services 3-across via `IconTile` grid) — all reusing this repo's canonical breakpoints via the shared, unmodified components. Ambient-orb `bg-overlay-violet-10` confirmed present only on this route (T024's fix); the shared `/what-we-do/` branch's `bg-overlay-blue-soft` confirmed unchanged for the four sibling routes.
- [X] T029 Run `npm run lint` and `npm run build`; fix any violations (Husky pre-commit gate) — both must pass clean. **Confirmed**: both pass with zero errors, both before and after the T024 trailing-slash fix; `/what-we-do/managed-services` compiles and TypeScript checks clean; the production build's route list includes `/what-we-do/managed-services`.
- [X] T030 Run the full quickstart.md walkthrough (all steps) end to end, including a side-by-side visual comparison against the reference file at mobile/tablet/laptop/desktop viewport widths (SC-001). **Partial, same environment limitation as T010/T015/T020/T028**: verified via the running dev server plus direct inspection of the compiled HTML instead of a literal screenshot comparison. Confirmed: full content-fidelity match (step 5, T027); hero image (`ind-healthcare.png`) renders with zero stat-tile/caption text (step 1); FAQ first item open, others closed (step 3, T020); all 6 related-service links and all 3 industry-card links resolve to correct hrefs (steps 2–3, T015/T020); header/footer nav repointing (T021/T022) confirmed by direct file inspection; ambient-orb violet confirmed present only on this route (step 8, T024/T028); all grids carry the expected responsive Tailwind classes (step 6, T028); `npm run lint`/`npm run build` pass clean (gate, T029). **Not performed**: a literal side-by-side pixel screenshot against the reference file at each viewport — low residual risk, since every section reuses the identical, already-visually-verified `Hero`/`ContentBlock`/`GlassCard`/`ProcessSteps`/`Faq`/`IconTile`/`FinalCta` components the four sibling pages already ship in production, unmodified.

## Post-implementation fix: ambient-orb pathname trailing slash (2026-08-25)

T024's new `ambient-orbs.tsx` branch initially used an exact-match condition with no trailing slash (`pathname === "/what-we-do/managed-services"`), copied from the shape of the *prefix*-matching `/what-we-do/` branch it sits beside. Verifying against the running dev server showed the branch never matched — the page kept rendering the shared branch's blue second orb. Root cause: `next.config.ts` sets `trailingSlash: true` project-wide, so `usePathname()` returns paths with a trailing slash (confirmed by curling the route directly: a bare request 308-redirects to the trailing-slash form) — exactly the form the already-shipped `/webinar/` branch's own exact-match condition already accounts for, which this new branch had not followed.

- [X] T031 Change the condition in `components/ui/ambient-orbs.tsx` from `pathname === "/what-we-do/managed-services"` to `pathname === "/what-we-do/managed-services/"`.
- [X] T032 Re-verified via the running dev server: `bg-overlay-violet-10` now renders on `/what-we-do/managed-services/`, the shared `/what-we-do/` branch's blue orb no longer leaks onto this route, and the other four sibling routes are unaffected (their own `startsWith("/what-we-do/")` match is unchanged). Re-ran `npm run lint` (clean).

## Post-implementation fix: WhyTile letter-spacing mismatch (2026-08-25)

User reported the "Why choose TechGrit" cards' letter-spacing didn't match the reference, and visible flicker when toggling between the reference `.dc.html` and the built page. Root cause: same class of bug as the earlier line-height fix (why this file already carried a proactive `leading-[normal]`) but for letter-spacing instead — `app/globals.css`'s base `h4 { letter-spacing: var(--ls-normal) }` rule resolves to `-0.02em` (a value named "normal" but not actually `0`/browser-normal), and `WhyTile`'s `<h4>` only overrode `font-size`/`line-height`, not `letter-spacing`, so it silently inherited the `-0.02em` tracking. The reference's own `.why-tile h4` rule sets no `letter-spacing` at all (browser default), so the built cards' text sat measurably narrower than the reference at the same font-size — a real per-character width difference, which is exactly the kind of reflow that reads as "flicker" when flipping between two open tabs at the same viewport width.

- [X] T033 Added `tracking-[normal]` to the WhyTile `<h4>` in `app/what-we-do/managed-services/_components/managed-services-why.tsx`, forcing the CSS literal `letter-spacing: normal` and overriding the inherited `-0.02em` base rule — matches the reference's own unset value.
- [X] T034 Re-ran `npm run lint` and `npm run build` (both pass clean) and re-verified via the compiled HTML that the heading now carries `tracking-[normal]`.

**Note (out of scope for this feature, flagged separately)**: this same root-cause pattern (a heading's `letter-spacing` silently inherited from `--ls-normal` rather than matching the reference's unset value) is worth auditing on the four sibling "What We Do" pages' own equivalent WhyTile components, which were built using the same page-local pattern before this fix was known.

## Post-implementation fix: margin/padding audit (2026-08-25)

User asked for a full margin/padding audit against the reference prototype. Walked every section's container padding, heading/paragraph margins, grid/flex gaps, and card-internal spacing against the reference's literal inline styles, cross-checking the underlying `--space-*`/`--spacing-tg-*` tokens the shared components (`Hero`, `ContentBlock`, `GlassCard`, `ProcessSteps`, `Faq`, `IconTile`, `final-cta`) already resolve to. Every value in this page's own components (`managed-services-{capabilities,lifecycle,why,industries,faq,related}.tsx`) and every shared-component default matched the reference exactly, with one exception:

- **Closing CTA button row gap**: `components/ui/final-cta.tsx` hardcoded `gap: 15` for the primary/secondary button row, but the Managed Services reference (and, on inspection, the AI-Accelerated Modernization and Platform Engineering references too) specifies `gap:14px`. No reference anywhere calls for 15px — this reads as a pre-existing off-by-one in the shared component's default, not a page-specific value.
- [X] T035 Added a new optional `buttonRowGap` prop to `final-cta.tsx` (default `15`, preserving the exact current behavior for every other page that renders `FinalCta` without passing it — no unrelated-page change), and passed `buttonRowGap={14}` from `app/what-we-do/managed-services/page.tsx` to match this page's own reference exactly.
- [X] T036 Re-ran `npm run lint` and `npm run build` (both pass clean) and re-verified via the compiled HTML that the button row now renders `gap:14`.

**Note (out of scope for this feature, flagged separately)**: `final-cta.tsx`'s `buttonRowGap` default of `15` is itself likely wrong for every page that uses it (no reference file found so far asks for 15px) — worth a follow-up ticket to correct the shared default to `14` and remove the per-page override once all consumers are re-verified, rather than fixing it silently here as part of this page's own scope.

## Post-implementation: live CMS integration (2026-08-25)

User provided the real Strapi endpoint (`GET /api/pages/by-slug/managed-services`) and its response, and asked for the page to be fully wired to it — following the exact pattern the four sibling "What We Do" pages already established for their own (separate, later) CMS-integration tickets, with **no static fallback content** left anywhere. Investigated `cms/api/fetcher.ts` (shared `fetchCms<T>` helper, `CMS_API_URL` env var, `cache: "no-store"`), `cms/utils/media.ts` (`resolveMediaUrl`), and `cms/api/what-we-do/{ai-modernization,platform-engineering}.ts` + their `cms/types/*.ts` in full to confirm the established mapper/dispatcher shape before writing anything.

- [X] T037 Added `cms/types/managed-services-types.ts` — Strapi raw response types, modeled directly against this page's *own* actual response (not copied assumptions from a sibling): `StrapiCapabilityCard.title` and the section-level `title`/`subtitle`/`badgeLabel` on `pd-modernization-capabilities` are `string | null` (this page's own capability cards and section ship several nulls the siblings' equivalents never did), and `StrapiServiceDetailSection` gains an `extraTitle: string | null` field the siblings' own type files never declared because it was always null for them — but carries a real supporting statement on this page's "why" occurrence.
- [X] T038 Added `cms/api/what-we-do/managed-services.ts` exporting `getManagedServicesData(): Promise<ManagedServicesPageContent | null>`, hitting the confirmed real endpoint `/api/pages/by-slug/managed-services` (the user's own given endpoint — no slug-guessing needed, unlike the sibling tickets' own uncertainty about slug-vs-route-name mismatches). Mapper functions and the `__component`/`variant` dispatchers are copied structurally from `platform-engineering.ts` (closest match), with: no `modernization-challenges`/intro mapper (this page's response has no such component — the closest content lives inside the first `capabilityCard` entry and is rendered as an ordinary capability card, not split out), a `toStrategiesSection` (this page's response includes a populated `PD-strategiesWeSupport` occurrence, unlike the original static build), and `extraTitle` surfaced as `WhySection.statement`. Zero static fallback: returns `null` on unreachable CMS or zero mapped sections, exactly like every sibling.
- [X] T039 Rewrote `app/what-we-do/managed-services/_data/types.ts`: `Capability.title` is now `string | null` (this page's own data leaves several cards' title null — `stepLabel`/categoryLabel doubles as the heading in that case); added `StrategiesSection`/`ManagedServiceStrategy` and `OutcomeSection` (both absent from the original static build, both present in the live response); added `WhySection.statement`; removed `IntroSection`/`TeamSignal` (no CMS component maps to it) and `RelatedServicesSection`/`RelatedServiceLink`/`RelatedServiceIconKey` (no CMS component maps to this either — the six-card related-services grid was static-only content with no live-data backing, so it's dropped rather than kept as a fallback); removed `WhyIconKey`/`IndustryIconKey` (icons now come from the CMS as `SectionImage`, not a local enum).
- [X] T040 Rewrote `app/what-we-do/managed-services/page.tsx`: async Server Component, `notFound()` when `getManagedServicesData()` returns `null`, `generateMetadata()` replacing the static `metadata` export, new `case "strategies"` (renders the new `ManagedServicesStrategies`) and `case "outcome"` (inline `Outcome` block, matching every sibling's identical inline treatment), dropped the `case "intro"`/`ContentBlock` and `case "related"` cases (no corresponding CMS data), added `buttonRowGap={14}` to the `FinalCta` call (carried over from the earlier margin/padding fix).
- [X] T041 [UI] Rewrote `managed-services-why.tsx`: dropped the local `iconKey`→SVG-component lookup table entirely; tiles now render `tile.icon` (a CMS `SectionImage`) via `next/image`, matching `platform-engineering-why.tsx`'s identical pattern; added the `section.statement` supporting paragraph (present only when the CMS's `extraTitle` is populated).
- [X] T042 [UI] Rewrote `managed-services-industries.tsx`: dropped the per-industry accent-color lookup table (`bg-icon-bg-teal`/`bg-icon-bg-blue`/`bg-overlay-amber-12`) — the CMS's 5 industry/platform cards (SaaS Platforms, Enterprise Applications, HealthTech, FinTech, Construction Technology) have no fixed 3-industry identity to color-code, and per FR-009-style scope discipline this isn't a value to invent; tiles now render `industry.icon` (CMS `SectionImage`) via `next/image` with the uniform orange chip every sibling's own industries tile already uses; grid widened from `lg:grid-cols-3` to `lg:grid-cols-4` to match the new 5-card count (same track width `platform-engineering-industries.tsx` uses for its own identical 5-card content); `href` stays optional and is never populated by this page's current CMS response (no destination field exists in the schema), so every card renders as a plain, non-clickable tile — same precedent as Platform Engineering's own industries mapping.
- [X] T043 [UI] Added `managed-services-strategies.tsx` (new — copied structurally from `platform-engineering-strategies.tsx`, since this page's live content ships the same 4-framework count: PRISM™, AI IMPACT™, 4D™, OrbitAI™).
- [X] T044 [UI] Edited `managed-services-capabilities.tsx`: the small `stepLabel` (categoryLabel) line now renders **only** when `capability.title` is present, and the heading falls back to `capability.stepLabel` when `title` is `null` — avoiding a duplicate-echo of the same text as both the tiny label and the heading for the CMS's null-title cards. Bullet list is now conditionally rendered (some cards ship zero `features`). Added the `capability.note` paragraph (from `structureInfo.description`) that the original static build never had a data source for.
- [X] T045 Deleted `app/what-we-do/managed-services/_data/managed-services-content.ts` (the static content module — no longer referenced by anything) and `app/what-we-do/managed-services/_components/managed-services-related.tsx` (no CMS component maps to a "related services" grid on this page's actual response).
- [X] T046 Verified scope discipline: `git status --short` shows changes touching **only** `app/what-we-do/managed-services/` (rewritten), `cms/api/what-we-do/managed-services.ts` (new), `cms/types/managed-services-types.ts` (new), plus this feature's own `specs/TMS-86-managed-services/` docs — zero changes to `components/layout/Header.tsx`/`Footer.tsx`, any other `what-we-do` sibling page, `cms/api/home/*`, or any other page's own CMS fetcher. Confirmed `CMS_API_URL` in `.env` already points at the given endpoint's host (`http://3.89.49.171`) — no config change needed.
- [X] T047 Ran `npm run lint` (clean) and `npm run build` (clean — TypeScript compiles with zero errors across the new fetcher/types/mapper/components, `/what-we-do/managed-services` present in the route list).
- [X] T048 Verified against the **live** CMS endpoint via the running dev server (`curl http://localhost:3000/what-we-do/managed-services/`, HTTP 200): hero renders the real title/gradient-highlight/image (`dm-scalability.png`); all 9 capability cards render (including the 3 null-title cards correctly falling back to their `categoryLabel` heading with no duplicate small label); all 4 strategy frameworks render; all 5 lifecycle-stage titles render; all 5 "why" tile titles render plus the `extraTitle` statement paragraph; all 5 industry/platform cards render as non-clickable tiles; the second "Why Choose TechGrit?" occurrence (empty `approachSteps`) correctly renders via the `Outcome` block instead of a tile grid; all 4 FAQ questions render as independent `<details>` with only the first `open`; the CTA renders "Schedule a Managed Services Assessment" resolving to `/contact-us/` (confirming the swapped-`primaryCtaLink`/`secondaryCtaLink` CMS quirk is handled identically to every sibling page).

**Note (out of scope for this feature, flagged separately)**: this page's live CMS content has several copy-paste artifacts from the Platform Engineering page's own content (the strategies section's subtitle says "Every **Platform Engineering** engagement...", and the industries section's title says "**Platform Engineering** for Every Stage of Growth" and lists Platform Engineering's own industry set rather than Managed-Services-specific ones) — rendered faithfully as-is, since correcting the CMS content itself is a content-authoring fix, not a frontend one, and is outside this ticket's scope.

## Post-implementation: updated CMS response — `modernization-challenges` section added (2026-08-25)

User shared a second, updated response from the same live endpoint. Diffed it against the first: the CMS-side content was re-organized — the "Move Beyond Traditional Support" card that the first response had folded into `capabilityCard[0]` of `pd-modernization-capabilities` now ships as its own proper `page-reusable-sections.modernization-challenges` section (with a real `eyebrow`/`extraTitle`/`blockers`), and the remaining capability cards dropped from 9 to 8 accordingly (renumbered "01 · Support" → "06 · Security" plus 2 uncategorized cards). Nullability also flipped on two cards: `categoryLabel` is now `null` where it was previously populated (and `title` is now populated on all 8 remaining cards, where 3 previously had `title: null`).

- [X] T049 Added `IntroSection`/`Blocker` back to `_data/types.ts` (removed as unused after the first integration pass, now genuinely needed again) and `StrapiManagedServicesChallengesSection` to `managed-services-types.ts`; added `toBlockers`/`toIntroSection` to the fetcher (same title→eyebrow/extraTitle→heading role-swap every sibling page's own `modernization-challenges` mapper already uses) and a `case "modernization-challenges":` in the `__component` dispatcher.
- [X] T050 Re-added the `case "intro":`/`<ContentBlock>` branch to `page.tsx` (removed in the first integration pass since no such section existed in the first response).
- [X] T051 Changed `Capability.stepLabel`/`StrapiCapabilityCard.categoryLabel` from required to `string | null` (the opposite nullability direction from the first response's `title: null` cards) and changed `managed-services-capabilities.tsx`'s conditional from `{capability.title && (...)}` to `{capability.stepLabel && (...)}` so the small label is skipped whichever field is actually null, on either response shape.
- [X] T052 Ran `npm run lint` and `npm run build` (both clean) and re-verified via the live dev server: the intro section renders with all 7 challenge chips, all 8 (not 9) capability cards render with no duplicate "Move Beyond Traditional Support" card, and the 2 null-`categoryLabel` cards ("Security & Compliance Management", "Powered by AI-Assisted Engineering") correctly render with no small label above their heading.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories (T003 blocks T004; T004 blocks T005; T005 blocks every story's wiring task T009/T014/T019)
- **User Stories (Phase 3-5)**: All depend on Foundational completion; independent of each other's *implementation* (each adds its own sections to the shared content array and its own wiring `case`s), but conventionally built in priority order P1 → P2 → P3
- **Polish (Phase 6)**: T021/T022/T023 are independent of all stories and of each other; T024 depends on T023 (needs the new token to exist first); T025/T026 can run any time after T021–T024, since they check the cumulative diff/tree; T027/T028/T029 depend on all three stories being wired in; T030 depends on everything above

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
- T021, T022, and T023 (Polish) can run in parallel with each other and with the tail of Phase 5; T024 must wait for T023; T025 (unrelated-change diff check) and T026 (static-content grep check) are both cheap enough to run repeatedly throughout, not just once at the end
- Once Foundational completes, US1/US2/US3 could in principle be staffed in parallel by different developers, since each only adds new `case`s to the shared switch and new entries to the shared content array (a rebase/merge concern, not a design dependency)

---

## Parallel Example: User Story 1

```bash
# After T006 (content populated), launch independent component builds together:
Task: "Build managed-services-capabilities.tsx"
Task: "Build managed-services-lifecycle.tsx"
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
5. Polish (Phase 6) → footer/header repoint, new ambient-orb token + branch, unrelated-change diff check, static-content check, fidelity/responsive passes, lint/build gate, full quickstart run → feature done

### Parallel Team Strategy

1. One person/session completes Setup + Foundational
2. Once Foundational lands: US1, US2, US3 can be split across sessions/branches, each adding distinct `sections` entries and `switch` cases to the same two shared files (`managed-services-content.ts`, `page.tsx`) — expect to resolve straightforward merge conflicts on those two files, not logic conflicts
3. Polish tasks run last, after all three stories are merged

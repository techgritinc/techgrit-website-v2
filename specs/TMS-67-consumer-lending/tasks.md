# Tasks: Consumer Lending Industries Page

**Input**: Design documents from `/specs/TMS-67-consumer-lending/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: Not included — no test framework is configured in this repo (Constitution's Development
Workflow section records this as a known gap, not a target to invent), and the spec does not request
tests.

**Organization**: Tasks are grouped by user story (P1/P2/P3 from spec.md) so each can be implemented
and verified independently.

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[UI]**: Produces user-visible frontend output — `/speckit.implement` invokes the `frontend-design`
  skill before executing these
- **[Story]**: US1 / US2 / US3, mapping to spec.md's three priority-ordered user stories

## Path Conventions

Single Next.js App Router project rooted at `app/`. New CMS integration files under `cms/`; new route
under `app/industries/consumer-lending/`, with route-local components in its own `_components/`.

---

## Phase 1: Setup

**Purpose**: Scaffold the route and CMS type shapes before any section logic is written.

- [X] T001 Create `app/industries/consumer-lending/` with a placeholder `page.tsx` and an empty
      `_components/` folder
- [X] T002 [P] Add `industriesConsumerLending: "/industries/consumer-lending"` to `lib/routes.ts`'s
      `ROUTES` object
- [X] T003 [P] Create `cms/types/consumer-lending-types.ts` with Strapi shapes for every
      `__component` the live endpoint returns: hero, statistics, modernization-challenges, the new
      `industries-construction.pd-lending-lifecycle`, pd-modernization-capabilities, service-detail
      (reuse `StrapiServiceDetailSection` shape if structurally identical to the existing one in
      `cms/types/data-ai-engineering-types.ts`), pd-faq, cta-banner — per data-model.md

**Checkpoint**: Types compile; route resolves to a blank page.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The shared fetcher, dispatcher, and page shell every user story's sections plug into.

**⚠️ CRITICAL**: No section-rendering work can start until this phase is complete.

- [X] T004 Create `cms/api/industries/consumer-lending.ts`: `CONSUMER_LENDING_ENDPOINT` constant
      (`/api/pages/by-slug/consumer-lending` — confirmed no `populate` query needed, the endpoint
      returns every section fully populated by default, mirroring
      `cms/api/what-we-do/data-ai-engineering.ts`'s no-populate-string pattern), a
      `toSection(raw, order)` dispatcher, and the exported `getConsumerLendingPageContent()`
      function (returns `null` on unreachable CMS or zero mapped sections, no static fallback —
      per FR-022)
- [X] T005 Implement `toHeroSection` in `cms/api/industries/consumer-lending.ts` using the shared
      `mapHeroFields` helper from `cms/shared/reusable-sections.ts` (mirrors both
      `cms/api/industries/fintech.ts`'s and every PD-family page's hero mapper) — per spec FR-004
      ("Hero same as Fintech"). Null `secondaryBtnLink` falls back to the new Domain depth
      section's `#domain-depth` in-page anchor.
- [X] T006 Wire `app/industries/consumer-lending/page.tsx` as an async Server Component:
      `generateMetadata()` from `content.seo`, `notFound()` on null content, a `sections.map()`
      switch statement, matching `app/industries/fintech/page.tsx`'s structure
- [X] T007 [P] [UI] Render the Hero section via `components/ui/IndustryHero.tsx`, extended with an
      optional `secondaryCtaLabel`/`secondaryCtaLink` pair (backward-compatible — Fintech/
      Healthcare/Construction's own hero calls are unaffected) to render a ghost secondary button
      — per spec FR-004 (eyebrow, headline, description, two CTAs)

**Checkpoint**: `/industries/consumer-lending` renders a working Hero section end-to-end from the
live CMS. Foundation ready for all three user stories.

---

## Phase 3: User Story 1 - Lending prospect evaluates domain depth (Priority: P1) 🎯 MVP

**Goal**: Hero, Metrics strip, Why lenders call us, and the Domain depth tabs all render with real
CMS content, letting a visitor self-identify their lifecycle stage.

**Independent Test**: Load `/industries/consumer-lending`; confirm hero + metrics render, "Why
lenders call us" shows its six numbered points, and clicking each of the six Domain depth tabs swaps
the body content with exactly one tab active at a time (spec.md User Story 1, Acceptance Scenarios
1–3).

### Implementation for User Story 1

- [X] T008 [US1] Promote `app/case-studies/_components/metrics-strip.tsx` to
      `components/ui/MetricsStrip.tsx` (now consumed by 2 routes, crossing Constitution's
      "components/ shared once genuinely cross-route" threshold); update the Case Studies page's
      import to the new path
- [X] T009 [US1] Add statistics mapping to `cms/api/industries/consumer-lending.ts`'s
      `toSection` dispatcher (`page-reusable-sections.statistics` → the shared `mapStatistics`
      helper), and wire a `"metrics"` case into `page.tsx` rendering `<MetricsStrip metrics={...} />`
      — per spec FR-005
- [X] T010 [US1] Add `toIntroSection` ("Why lenders call us") to
      `cms/api/industries/consumer-lending.ts`: `eyebrow`/`title`/`subtitle` mapped directly (per
      data-model.md, this occurrence has `eyebrow` populated, unlike the AI-Modernization page's
      version of this component), and `blockers.features[]` mapped to **both** `title` (the "01".."06"
      number) and `subtitle` (the paragraph) — do not discard `subtitle` the way
      `data-ai-engineering.ts`'s `toBlockers` does
- [X] T011 [P] [UI] [US1] Create
      `app/industries/consumer-lending/_components/consumer-lending-why.tsx`: two-column list of six
      number+paragraph rows — a small purpose-built row (neither `ContentBlock` nor `IconTile`
      fits this title-less number+paragraph shape) — per spec FR-006
- [X] T012 [US1] Add `StrapiLendingLifecycleSection` type to `cms/types/consumer-lending-types.ts`
      and `toDomainDepthSection` to `cms/api/industries/consumer-lending.ts`: `badgeLabel`→eyebrow,
      `title`, `subtitle`→description, `tabItems[]` (label/value/isDefault) joined to
      `controlTabs[]` (tabValue/title/subtitle/features[]) — per data-model.md
- [X] T013 [UI] [US1] Create
      `app/industries/consumer-lending/_components/consumer-lending-domain-depth.tsx`: full-width
      underlined tab row with a single animated underline segment sliding to the active tab
      (ref-measured `left`/`width` transition using the existing `--gradient-brand` accent), left
      column title+description, right column two-column capsule-shaped dot-prefixed point list;
      client component (`"use client"`) with `activeId` state defaulting to the `tabItems[]` entry
      where `isDefault === true`; section carries `id="domain-depth"` for the Hero's secondary CTA
      anchor — per spec FR-007, FR-008, FR-009 and plan.md's UI Design Approach
- [X] T014 [US1] Wire the `"metrics"`, `"intro"`, and `"domainDepth"` cases into
      `app/industries/consumer-lending/page.tsx`'s section switch, in CMS-returned order

**Checkpoint**: User Story 1 fully functional — hero, metrics, why-lenders-call-us, and domain depth
tabs all work independently of Stories 2 and 3.

---

## Phase 4: User Story 2 - Lending prospect assesses delivered work and AI maturity (Priority: P2)

**Goal**: Ecosystem, Applied AI, Institutional platforms, Our work, and Quote sections render full
credibility content.

**Independent Test**: Scroll to each section and confirm the CMS content renders per spec.md User
Story 2's Acceptance Scenarios 1–5, independent of Domain depth tab interaction.

### Implementation for User Story 2

- [X] T015 [US2] Add `metricLabel?: string` to the `Capability` type used by this page's capabilities
      mapper (per data-model.md Decision 3 — sourced from `capabilityCard[].structureInfo.label`,
      same field/role as `outcomeLabel` in `cms/api/how-we-work/orbit-ai-ecosystem.ts`)
- [X] T016 [US2] Add `toCapabilitiesSection` to `cms/api/industries/consumer-lending.ts` for
      `page-reusable-sections.pd-modernization-capabilities`, disambiguated by `badgeLabel`
      ("The ecosystem" / "Our work" / "Operating context") into one `CapabilitiesSection` type with
      a `role` discriminant, per data-model.md's CapabilitiesSection table
- [X] T017 [UI] [US2] Create
      `app/industries/consumer-lending/_components/consumer-lending-capabilities.tsx`: one
      `GlassCard variant="serviceCapability"` grid renderer shared by The ecosystem (3 cols,
      bullets), Our work (3 cols, `metricLabel` + `note`), and Operating context (2 cols, bullets)
      — deliberately one component instead of three near-identical ones, per FR-010/FR-013/FR-016
- [X] T018 *(folded into T017 — see above; the originally-planned separate "Our work" component
      would have duplicated T017's grid almost verbatim)*
- [X] T019 [US2] Add `toServiceDetailSection` (switch on `variant`) to
      `cms/api/industries/consumer-lending.ts` for `page-reusable-sections.service-detail`, covering
      `PD-modernizationLifecycle` (Applied AI), `PD-strategiesWeSupport` (Institutional platforms),
      `PD-whyAI-assistedModernization` (Quote), and `PD-IndustriesWeModernize` (How we work) — per
      data-model.md's ServiceDetailSection table
- [X] T020 [UI] [US2] Create
      `app/industries/consumer-lending/_components/consumer-lending-simple-cards.tsx`: shared
      label+title+description `GlassCard` grid for Applied AI (2 cols) and How we work (3 cols) —
      one component instead of two, since both are the same card shape — per spec FR-011/FR-015
- [X] T021 [P] [UI] [US2] Create
      `app/industries/consumer-lending/_components/consumer-lending-institutional.tsx`: row of 2
      cards, row of 3 cards (reusing the same `LabeledCard` shape as T020), plus one plain-text card
      rendering the section-level `extraTitle`, styled like Orbit AI Ecosystem's "Built for
      Real-World Engineering" callout — per spec FR-012
- [X] T022 [UI] [US2] Quote rendered inline in `page.tsx`'s `"quote"` case (single full-width
      `.glass-card` with `citation`/`quote`) rather than a separate component file — too small
      (one blockquote + one cite) to justify its own file — per spec FR-014
- [X] T023 [US2] Wire `"capabilities"`, `"appliedAi"`, `"institutional"`, and `"quote"` cases into
      `app/industries/consumer-lending/page.tsx`'s section switch

**Checkpoint**: User Stories 1 AND 2 both work independently.

---

## Phase 5: User Story 3 - Engagement approach, objections, and conversion (Priority: P3)

**Goal**: How we work, Operating context, FAQ, and Final CTA render, closing the funnel; page is
fully responsive.

**Independent Test**: Scroll to How we work, Operating context, FAQ, and the Final CTA; confirm each
renders per spec.md User Story 3's Acceptance Scenarios 1–5, including both Final CTA buttons.

### Implementation for User Story 3

- [X] T024 [US3] How we work rendered via T020's shared
      `consumer-lending-simple-cards.tsx` (3-col branch, consuming the `PD-IndustriesWeModernize`
      case from T019) — per spec FR-015
- [X] T025 [US3] Operating context rendered via T017's shared
      `consumer-lending-capabilities.tsx` ("operatingContext" role, 2 cols, bullets + `lede` as the
      supporting plain text) — per spec FR-016
- [X] T026 [US3] Add `toFaqSection` to `cms/api/industries/consumer-lending.ts` for
      `page-reusable-sections.pd-faq`: `title`→`eyebrow`, `subtitle`→`title` (role-swap, same as
      `ai-modernization.ts`'s `toFaqSection`) — per spec FR-017
- [X] T027 [US3] Add `toCtaSection` to `cms/api/industries/consumer-lending.ts` for
      `page-reusable-sections.cta-banner`: primary CTA falls back to `/contact-us/`; secondary CTA
      **always** rendered, falling back to `"Request an estimate"` / `/request-for-estimate/` when
      the CMS field is empty (per spec.md Clarifications — mirrors Construction's
      unconditional-secondary pattern) — per spec FR-018
- [X] T028 [UI] [US3] Wired the `"faq"` case (inline heading + `components/ui/Faq.tsx`, matching
      `ai-modernization-faq.tsx`'s usage) and the `"finalCta"` case (reusing
      `components/ui/final-cta.tsx` directly, `secondaryCta` always populated) into
      `app/industries/consumer-lending/page.tsx`'s section switch
- [X] T029 [US3] Verified end-to-end against the live CMS in-browser: all 13 sections render in
      order with real content, the Domain depth tabs swap correctly (spot-checked "Funding"), both
      Final CTA buttons resolve (`/contact-us/`, `/request-for-estimate/`), and the Industries nav
      (header + footer) already lists "Consumer Lending" — both are CMS-driven, no local nav-config
      edit needed or made. Responsive breakpoint check deferred to Polish (T030 below covers
      lint/build; a `sm`/`md`/`lg` resize pass is still recommended before merge).

**Checkpoint**: All three user stories independently functional; page complete end-to-end.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Final verification across the whole feature.

- [X] T030 Ran `npm run lint` and `npm run build` after completing Phases 4–6 — both clean, zero
      errors or warnings
- [X] T031 Walked through `quickstart.md`'s scenarios on the live dev server (hero/metrics, why
      lenders call us, all 6 domain-depth tabs incl. a live click-through, ecosystem through final
      CTA) — all confirmed against real CMS content
- [X] T032 Confirmed "Engagement models" and "Who is accountable" are absent — the live CMS
      response itself has no such sections, and `toSection`'s `default: return null` drops anything
      unrecognized regardless (spec FR-003 / SC-003)
- [X] T033 Confirmed section order matches spec FR-002 exactly (Hero → Metrics → Why lenders call us →
      Domain depth → Ecosystem → Applied AI → Institutional platforms → Our work → Quote → How we
      work → Operating context → FAQ → Final CTA) — verified via full page-text dump

**Deferred, not blocking**: a manual `sm`/`md`/`lg` resize pass (mentioned in T029) — the page uses
only existing breakpoint-aware primitives (`GlassCard` grids, `md:`/`lg:` Tailwind prefixes) with no
new pixel breakpoints introduced, so risk is low, but this wasn't visually confirmed in-browser this
session.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — can start immediately
- **Foundational (Phase 2)**: Depends on Setup — BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational only
- **User Story 2 (Phase 4)**: Depends on Foundational only — independently testable from US1, but
  T016/T019 edit the same `cms/api/industries/consumer-lending.ts` file as US1's T009/T010/T012, so
  treat those mapper-file edits as sequential across stories even though the stories themselves are
  functionally independent
- **User Story 3 (Phase 5)**: Depends on Foundational, and its T024/T025 reuse mapper branches added
  in US2's T016/T019 — implement US2 before US3 if working sequentially (the plan's priority order
  already sequences this correctly)
- **Polish (Phase 6)**: Depends on all three user stories being complete

### Within Each User Story

- CMS mapper additions before the component(s) that consume them
- Component creation before wiring its case into `page.tsx`'s switch

### Parallel Opportunities

- T002/T003 (Setup) can run in parallel
- Within US1: T011 (why-lenders component) and T013 (domain-depth component) are separate files and
  parallelizable once their respective mappers (T010, T012) land
- Within US2: T017/T018/T020/T021/T022 are all separate component files — parallelizable once T016
  and T019's mappers land
- Within US3: T024/T025 are separate component files — parallelizable
- All mapper additions to `cms/api/industries/consumer-lending.ts` (T005, T009, T010, T012, T016,
  T019, T026, T027) touch the same file and MUST be sequential, regardless of which user story they
  belong to

---

## Parallel Example: User Story 2

```bash
# Once T016 (capabilities mapper) and T019 (service-detail dispatcher) both land:
Task: "Create consumer-lending-ecosystem.tsx"
Task: "Create consumer-lending-our-work.tsx"
Task: "Create consumer-lending-applied-ai.tsx"
Task: "Create consumer-lending-institutional.tsx"
Task: "Create consumer-lending-quote.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup) + Phase 2 (Foundational)
2. Complete Phase 3 (User Story 1) — Hero, Metrics, Why lenders call us, Domain depth
3. **STOP and VALIDATE**: load the page, confirm Domain depth tabs work end-to-end
4. This alone is a demonstrable MVP: a visitor can already judge domain fit

### Incremental Delivery

1. Setup + Foundational → Hero renders from live CMS
2. + User Story 1 → Domain-fit judgment complete (MVP)
3. + User Story 2 → Credibility content complete
4. + User Story 3 → Full page, funnel-complete, responsive-verified
5. Polish → lint/build green, quickstart.md fully walked

---

## Notes

- No `[P]` on any task that edits `cms/api/industries/consumer-lending.ts` — see Parallel
  Opportunities above
- `[UI]` tasks trigger the `frontend-design` skill per Constitution Principle VI before
  `/speckit.implement` executes them
- Total: 33 tasks — 3 Setup, 4 Foundational, 7 US1, 9 US2, 6 US3, 4 Polish

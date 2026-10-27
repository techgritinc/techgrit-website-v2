---

description: "Task list for Services Page feature implementation"
---

# Tasks: Services Page

**Input**: Design documents from `/specs/TMS-66/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md

**Tests**: No test tasks are included. No test framework is configured in this repo (per
constitution's Development Workflow section) and the spec did not request a TDD approach.
Verification is manual — see quickstart.md and the checkpoints below.

**Organization**: Tasks are grouped by user story (spec.md) to enable independent implementation
and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Exact file paths are included in each description

## Path Conventions

Single Next.js App Router project, all new route-local code colocated under `app/services/` (per
plan.md's Structure Decision — no top-level `components/`/`lib/` split), plus one small,
backward-compatible edit to the already-shared `reusable-components/section-eyebrow.tsx`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the folders this feature's files will live in.

- [X] T001 Create the route/component/data folders: `app/services/`, `app/services/_components/`, `app/services/_data/` — `public/images/services/` was not created: real sample images exist at `public/samples/{svc-uiux,svc-eng,svc-qa}.png` (per user instruction) and are used directly, so no placeholder-image directory was needed
- [X] T002 [P] ~~No real photography exists yet~~ — superseded: real sample images were provided at `public/samples/` and are wired into `services-content.ts` for every overview card and matching service detail section; the FR-010 placeholder path was instead verified by temporarily nulling one image and confirming the placeholder rendered, then reverting

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 [P] Create `app/services/_data/types.ts` with the `PageSectionEntry` discriminated union and all section/field types from data-model.md (`HeroSection`, `HeroVerbAnchor`, `OverviewSection`, `ServiceOverviewCard`, `ServiceAccent`, `ServiceDetailSection`, `SupportingItemList`, `ApproachStep`, `CapabilityItem`, `FinalCtaSection`, `SectionImage`, `PageSeo`, `ServicesPageContent`) — note: `imagePosition` was dropped from `ServiceDetailSection` (see data-model.md's 2026-07-15 correction: the reference file does not actually alternate image side)
- [X] T004 Create `app/services/_data/services-content.ts` exporting a typed `ServicesPageContent` object populated from `raw-files/TechGrit Services.dc.html`'s copy (hero headline/subtitle, the 3 overview cards, the 3 detail sections' approach-steps/capability items, the closing CTA), with **both** `primaryCtaHref` (hero) and `ctaHref` (closing CTA) set to `"/contact"` per spec.md's 2026-07-15 Clarification — not the reference file's `mailto:` action (depends on T003)
- [X] T005 [P] Add an optional `accentColor?: string` prop to `reusable-components/section-eyebrow.tsx`, defaulting to the component's current hardcoded `var(--color-orange)` so the About Us page's existing callers render unchanged (research.md §7) — verified: `.eyebrow`'s inline color override cascades correctly since inline styles win over the class's hardcoded color
- [X] T006 Create `app/services/page.tsx` as the composition root: import `services-content.ts`, set page `metadata` from `content.seo`, and map `content.sections` to a per-`type` switch that will render each section's component (component imports added incrementally as each user story lands) (depends on T003, T004)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - See what TechGrit offers, at a glance (Priority: P1) 🎯 MVP

**Goal**: Render the hero and the 3-card service overview grid so a first-time visitor can
understand TechGrit's positioning and see all three service areas, with a working path from each
card into its own detail section further down the page.

**Independent Test**: Load `/services` and confirm the hero eyebrow/headline (with its three verb
anchors)/subtitle/both CTAs, and all 3 overview cards (sequence label, title, description, image or
placeholder, accent color), render correctly and link to their matching detail sections —
independent of the detail sections' own content existing yet.

### Implementation for User Story 1

- [X] T007 [P] [US1] Create `app/services/_components/services-hero.tsx` rendering `HeroSection`: eyebrow, headline, subtitle, primary CTA → `/contact`, secondary CTA (in-page anchor to the first detail section) using `.eyebrow`/`.btn`/`.btn-primary`/`.btn-ghost`/`.text-gradient` (FR-001) — **Revised 2026-07-15**: the "Design"/"build"/"ship" in-headline anchors were reverted per the stakeholder's exact-reference-parity request; the H1 now renders as plain text (`titleHighlight` drives only the gradient span), matching `TechGrit Services.dc.html` exactly. H1 size fixed to 46px/58px (was 38px/58px) at the correct breakpoint, and the eyebrow pill's unrequested backdrop-blur was removed.
- [X] T008 [P] [US1] Create `app/services/_components/services-overview.tsx` rendering exactly 3 `ServiceOverviewCard` entries in a custom card grid (3 columns desktop, collapsing at `tg-md:`), each showing its sequence label, title, one-line description, image or placeholder, an `accentColor`-driven hover border glow, and a uniformly amber-light "Explore →" link (FR-002, FR-003, FR-010) — **Revised 2026-07-15**: stopped reusing the generic `.card` class (its 22px radius / 14px blur / -3px hover didn't match the reference's 20px / 8px / -6px); now uses bespoke inline styles with the reference's exact hover-border hex+opacity per service and the reference's actual label-color set (card 2 = amber-light, not orange). The "Explore" link's hover-accent-color was reverted — reference keeps it one uniform color on all three cards.
- [X] T009 [US1] Wire `services-hero` and `services-overview` into the section-type switch in `app/services/page.tsx` (depends on T006, T007, T008) — verified via curl: both `#service-*` anchors and `/contact` hrefs render correctly

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently
(quickstart.md Story 1 walkthrough)

---

## Phase 4: User Story 2 - Explore a specific service in depth (Priority: P1)

**Goal**: Render all three service detail sections (UI/UX Design, Software Product Engineering,
Quality Engineering) so an interested visitor can understand what each service actually includes.

**Independent Test**: Scroll to any one of the three service detail sections and confirm its
category label (in its own accent color), heading, description, image or placeholder, and its list
of supporting items (ordered approach steps for UI/UX Design; unordered capability grid for
Engineering and QA) render correctly and completely, independent of the other two sections.

### Implementation for User Story 2

- [X] T010 [US2] Create `app/services/_components/service-detail-section.tsx` as one shared, parameterized component: category label via `SectionEyebrow` with its `accentColor` prop, heading, description, image or placeholder positioned to the right of the text on wide screens, and — based on `supportingItems.kind` — either an `orderedApproach` sequence or a `capabilityGrid` (FR-004, FR-005, FR-006, FR-010; depends on T005) — **Revised 2026-07-15**: rebuilt `orderedApproach` from an invented "connected timeline with circular badges" into the reference's actual 3-column grid with a plain `01`–`06` digit label (Space Grotesk) and `border-top`/`border-bottom` dividers, exactly matching `TechGrit Services.dc.html`; removed the invented "Core capabilities" label (the reference has no label above the Engineering/QA grids at all); `capabilityGrid` stopped reusing the generic `.card` class (wrong radius/blur/hover, see plan.md's revision note) in favor of bespoke styles matching the reference's exact 18px radius, 8px blur, -5px hover, and per-service hover-border/padding; consolidated two separate `RevealOnScroll` instances into one wrapping the whole section (row + list together), matching the reference's single `data-reveal` per section
- [X] T011 [US2] Wire three instances of `service-detail-section` (UI/UX Design, Software Product Engineering, Quality Engineering) into the section-type switch in `app/services/page.tsx`, one per `ServiceDetailSection` content entry (depends on T006, T009, T010) — verified via curl after the revision: all 3 `id="service-*"` anchors present, "Our approach" renders exactly once, "Core capabilities" no longer renders anywhere

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Start a conversation about a project (Priority: P2)

**Goal**: Render the closing call-to-action section, and confirm both the hero's and the closing
section's calls-to-action share the same `/contact` destination.

**Independent Test**: Confirm a call-to-action to start a conversation exists in the hero (built in
US1) and again in the closing section, and that both navigate to the Contact Us page — not a
`mailto:` action.

### Implementation for User Story 3

- [X] T012 [P] [US3] Create `app/services/_components/services-final-cta.tsx` rendering `FinalCtaSection` (eyebrow, heading, description, CTA) inside a `.glass-card` panel, with the CTA's `href` set to `/contact` (FR-007)
- [X] T013 [US3] Wire `services-final-cta` into the section-type switch in `app/services/page.tsx`, and confirm `services-hero`'s primary CTA (T007) also targets `/contact` — both calls-to-action must share one destination per spec.md's 2026-07-15 Clarification (depends on T006, T007, T011, T012) — confirmed via curl: `href="/contact"` appears from both the hero and the closing CTA (plus the shared Header/Footer's own instances)

**Checkpoint**: All five content sections should now be independently functional and composed in
order on `/services`, with both calls-to-action verified to share one destination

---

## Phase 6: User Story 4 - Read the page comfortably on any device (Priority: P1)

**Goal**: Confirm and finish page-level responsive behavior (beyond what's already built into each
section component in US1-US3) so the whole page works cleanly at mobile, tablet, and desktop
widths with no overflow or overlap.

**Independent Test**: Load `/services` at ~375-430px, ~768-1024px, and ~1280px+ widths and confirm
every section (from any story) remains readable, correctly laid out, and fully interactive, per
quickstart.md's Story 4 checklist.

### Implementation for User Story 4

- [X] T014 [US4] Audit `app/services/page.tsx` and all `app/services/_components/*.tsx` for consistent use of `.tg-container`/`.section` and the `tg-sm:`/`tg-md:`/`tg-lg:` prefixes; confirm no element causes horizontal overflow at any of the three breakpoints (add `overflow-x-clip` on the page wrapper if needed) (depends on T009, T011, T013) — `<main className="overflow-x-clip">` already set in `page.tsx`; found and fixed one real gap: the capability grid jumped straight from 3 columns to 1 with no tablet-intermediate stage (spec.md User Story 4's tablet acceptance scenario requires one), changed to `grid-cols-1 tg-sm:grid-cols-2 tg-lg:grid-cols-3` to match the reference file's actual 3-tier collapse
- [X] T015 [US4] Run the full responsive walkthrough from quickstart.md Story 4 at mobile/tablet/desktop widths across all 5 sections; fix any component whose grid/columns don't collapse correctly (depends on T014) — verified structurally (curl + code audit of every `grid-cols-*`/`tg-*:` usage) since no browser/screenshot tool was available this session; **visual confirmation at real viewport widths in a browser is still recommended** before calling this story fully done

**Checkpoint**: All four user stories independently functional; the full page is responsive
end-to-end

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final gates and edge-case verification affecting the whole feature

- [X] T016 Run `npm run lint` and `npm run build`; fix any issues found across `app/services/**` and the `reusable-components/section-eyebrow.tsx` edit (matches the Husky pre-commit gate) — also confirm the About Us page's existing `SectionEyebrow` usages still render with their original orange color — both pass; `/services` prerenders as static content alongside `/`, `/about`, `/contact`; `SectionEyebrow`'s new `accentColor` prop defaults to the original `var(--color-orange)`, so `about-us-process.tsx`/`about-us-values.tsx` (its only other callers) are unaffected
- [X] T017 Run the remaining quickstart.md edge-case checks: missing-image placeholder (temporarily null an image in `services-content.ts`), direct navigation to a service's in-page anchor (e.g. `/services#service-qa`), reduced-motion fallback for the per-step `RevealOnScroll` instances in the UI/UX approach section, and full keyboard-only navigation through the hero verb anchors, overview cards, and detail-section CTAs (FR-008) — missing-image placeholder verified via curl (temporarily nulled, confirmed "Drop a service image", reverted); anchor navigation relies on the existing global `[id]{scroll-margin-top:var(--nav-height)}` rule, same mechanism already proven by the About Us page; reduced-motion fallback is `RevealOnScroll`'s existing 1.5s safety timeout, unchanged; keyboard focus relies on the existing global `a:focus-visible` rule — all are code-verified, not visually confirmed in a live browser this session

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational - no dependency on other stories
- **User Story 2 (Phase 4)**: Depends on Foundational (specifically T005 for the `accentColor`
  prop); its `page.tsx` wiring task (T011) is sequenced after T009 only because both edit the same
  `page.tsx` switch statement, not because US2's components depend on US1
- **User Story 3 (Phase 5)**: Depends on Foundational; T013 sequenced after T011 for the shared
  `page.tsx` edit, and also re-verifies T007's hero CTA as part of its own checkpoint
- **User Story 4 (Phase 6)**: Depends on US1+US2+US3 wiring being complete, since it audits the
  composed page as a whole
- **Polish (Phase 7)**: Depends on all prior phases

### Parallel Opportunities

- T002 (Setup) can run alongside T001
- T003 and T005 (Foundational) can run in parallel; T004 depends on T003; T006 depends on T003+T004
- T007 and T008 (US1) are marked [P] — different files, no dependency on each other
- T012 (US3) can start as soon as T003/T004 (Foundational) are done — it doesn't depend on T010/T011
- Each user story's own components can be built in parallel by different people; only the shared
  `page.tsx` wiring task at the end of each phase must be sequenced

---

## Parallel Example: User Story 1

```bash
# Launch both independent section components for User Story 1 together:
Task: "Create app/services/_components/services-hero.tsx per FR-001"
Task: "Create app/services/_components/services-overview.tsx per FR-002, FR-003, FR-010"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Walk through quickstart.md Story 1 independently
5. Deploy/demo if ready — hero and the 3-card overview are a credible standalone entry point even
   before the detail sections and closing CTA land

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Validate → Deploy/Demo (MVP!)
3. Add User Story 2 → Validate → Deploy/Demo
4. Add User Story 3 → Validate → Deploy/Demo
5. Add User Story 4 → Final responsive audit across everything → Deploy/Demo

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Every section component must independently satisfy FR-009 (responsive at `tg-sm:`/`tg-md:`/
  `tg-lg:`) and FR-008 (keyboard-operable, visible focus, accessible name) — these are baked into
  each component task, not deferred to a separate cleanup pass
- The footer (`components/layout/footer-config.ts`) is intentionally NOT touched by any task —
  see research.md §2 for why that's out of this feature's scope
- No test tasks are included (see Tests note above)
- Commit after each task or logical group
- Stop at any checkpoint to validate a story independently

---
description: "Task list for Homepage Content Sections (TMS-62)"
---

# Tasks: Homepage Content Sections

**Input**: Design documents from `specs/TMS-62/` (plan.md, research.md, data-model.md,
quickstart.md) and `docs/superpowers/specs/2026-07-14-homepage-composition-design.md`
**Prerequisites**: plan.md, spec.md (6 user stories, priorities P1–P6)

**Tests**: Not included. No test framework exists in this repository and spec.md did not request
automated tests (see plan.md → Technical Context). Verification is manual, per quickstart.md.

**Implementation note**: Execution combined the Foundational phase's placeholder step directly
with each user story's real-content step (i.e. section components were written once, with real
content, rather than placeholder-then-fill) — the resulting files are identical to what the
two-step sequence would have produced, so all tasks below are marked complete against that
end state rather than re-split into two commits.

**Organization**: Tasks are grouped by user story so each story is independently completable and
testable, per spec.md's own "Independent Test" for each story. See **Implementation Strategy**
below for the stakeholder-requested complexity-first build order, which cuts across these phases.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on an incomplete task)
- **[Story]**: Maps to spec.md's user stories (US1–US6)
- File paths are exact and relative to the repository root

## Path Conventions

- Shared reusable primitives: `components/ui/` (new — Button, Badge, FormField, MediaSlot, and the
  relocated, extended `icons.tsx`; styled with Tailwind utility classes referencing `tokens.css`
  custom properties via `@theme inline`, not `globals.css`'s `.btn`/`.badge` classes — see plan.md's
  Constitution Check)
- Homepage sections: `components/home/` (new — sibling of `components/layout/`, not route-local;
  establishes the `components/<route>/`-per-page convention for future routes)
- Static content data: `components/home/home-data.ts`
- Homepage route: `app/page.tsx` (modified — stays at root `/`)
- Shared styling: `app/globals.css`, `app/tokens.css` — only `@theme inline` token-to-utility
  mappings were added; no new component-level classes were added for this feature

---

## Phase 1: Setup

**Purpose**: Prepare the two new directories this feature needs.

- [X] T001 [P] Create `components/ui/` directory (first real use of this directory)
- [X] T002 [P] Create `components/home/` directory (sibling of `components/layout/`)

**Checkpoint**: Directories ready for foundational files.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Stand up the shared reusable primitives, relocate and extend the icon file, create the
typed static-data module, and mount all ten sections in `app/page.tsx`.

- [X] T003 [P] Create `components/ui/Button.tsx`: `variant`/`size`/`as` props, Tailwind utility
  classes, colors/shadows via `tokens.css` custom properties (FR-013)
- [X] T004 [P] Create `components/ui/Badge.tsx`: `tone` prop, same Tailwind-first approach (FR-014)
- [X] T005 [P] Create `components/ui/FormField.tsx`: labeled input with inline error slot (FR-015)
- [X] T006 Move `components/layout/icons.tsx` to `components/ui/icons.tsx`
- [X] T007 Update the icon import path in `components/layout/Header.tsx` and
  `components/layout/Footer.tsx` to `@/components/ui/icons`
- [X] T008 [P] Add the new homepage icons to `components/ui/icons.tsx` (arrow/check/close/play/
  chevron-right, plus platform/differentiator/industry icons) (FR-016)
- [X] T009 Create `components/home/home-data.ts` with full typed content for every entity in
  data-model.md
- [X] T010–T019 Implemented `components/home/{Hero,SubscribeBand,PlatformSection,
  MethodologySection,ReImagineSection,IndustriesSection,TestimonialsSection,CaseStudiesSection,
  LifeGallery,FinalCta}.tsx` directly with real content (see Implementation note above)
- [X] T020 Composed `app/page.tsx` (Server Component, root `/`) rendering all ten sections in
  order inside `<main>`

**Checkpoint**: `/` renders all ten sections. ✅ Verified via `npm run build` and a dev-server
content check (see Notes).

---

## Phase 3: User Story 1 - Grasp the value proposition and act on it (Priority: P1) 🎯 MVP

- [X] T021 [P] [US1] `DeliveryStat[]` / `TrustedClientLogo[]` data in `home-data.ts` (FR-001)
- [X] T022 [US1] `Hero.tsx`: headline, description, badges, stat row, primary/secondary CTAs
  (FR-001, FR-002)
- [X] T023 [US1] Trusted-client logo row via `MediaSlot` against `public/logos/*` (FR-001)

**Checkpoint**: ✅ User Story 1 complete.

---

## Phase 4: User Story 2 - Understand how TechGrit delivers (Priority: P2)

- [X] T024 [P] [US2] `PlatformCapability[]` data (FR-004)
- [X] T025 [P] [US2] `MethodologyPhase[]` data (FR-005)
- [X] T026 [US2] `PlatformSection.tsx`: capability list + pipeline visual (FR-004)
- [X] T027 [US2] `MethodologySection.tsx` phase-tab rail + active-phase detail panel, click-to-
  select (FR-005)
- [X] T028 [US2] Scroll-driven active-phase advancement per research.md §1 (FR-006)

**Checkpoint**: ✅ User Story 2 complete.

---

## Phase 5: User Story 3 - Understand what makes the approach different (Priority: P3)

- [X] T029 [P] [US3] `DifferentiatorPoint[]` / `ComparisonMetric[]` data (FR-007)
- [X] T030 [US3] `ReImagineSection.tsx`: three differentiator cards + comparison bar panel (FR-007)

**Checkpoint**: ✅ User Story 3 complete.

---

## Phase 6: User Story 4 - Find proof relevant to my industry (Priority: P4)

- [X] T031 [P] [US4] `IndustryCard[]` data — images from `public/samples/ind-*.png` (FR-008)
- [X] T032 [US4] `IndustriesSection.tsx`: three cards, section-level + Construction links (FR-008)

**Checkpoint**: ✅ User Story 4 complete.

---

## Phase 7: User Story 5 - Evaluate social proof before converting (Priority: P5)

- [X] T033 [P] [US5] `Testimonial[]` data (FR-009)
- [X] T034 [P] [US5] `CaseStudy[]` data (FR-010)
- [X] T035 [US5] `TestimonialsSection.tsx`: drag-scroll track, star ratings, video cards (FR-009)
- [X] T036 [US5] Video lightbox: no-video fallback, backdrop/close-button/Escape dismissal
  (FR-009, FR-018)
- [X] T037 [US5] `CaseStudiesSection.tsx`: featured tile + supporting cards + "view all" (FR-010)

**Checkpoint**: ✅ User Story 5 complete.

---

## Phase 8: User Story 6 - Stay engaged beyond a single visit (Priority: P6)

- [X] T038 [P] [US6] `CultureGalleryImage[]` data — images from `public/assets/team/*.png`
  (FR-011)
- [X] T039 [US6] `SubscribeBand.tsx`: name/email `FormField`s, client-side validation,
  idle/error/success states, no network call (FR-003)
- [X] T040 [US6] `LifeGallery.tsx`: bento grid via `MediaSlot` (FR-011)
- [X] T041 [US6] `FinalCta.tsx`: heading, primary `Button`, secondary link to `#methodology`
  (FR-012)

**Checkpoint**: ✅ All six user stories functional.

---

## Phase 9: Polish & Cross-Cutting Concerns

- [X] T042 Keyboard accessibility: all interactive elements use semantic `<button>`/`<a>`/
  `<input>` with visible focus (global `:focus-visible` rule), `FormField` wires
  `aria-invalid`/`aria-describedby`, lightbox closes on Escape and has a labeled close button
  (FR-018, SC-007). **Not verified in a real browser** — no browser is available in this
  environment; recommend an interactive tab-through pass before merging.
- [X] T043 Responsive verification: every grid/section uses the `tg-lg`/`tg-md`/`tg-sm`
  (1140/960/560) breakpoint variants consistently (FR-019, SC-008). **Visual verification at each
  breakpoint not performed** — no browser available; recommend a resize pass before merging.
- [X] T044 Reduced-motion: decorative animations (status-dot blink, LIVE badge blink, phase-in
  transition, drag-hint nudge) use `motion-safe:`/`motion-reduce:` variants; no content depends on
  animation completing to become visible (FR-020, SC-009)
- [X] T045 `npm run lint` (clean) and `npm run build` (clean) — both verified passing
- [X] T046 Automated verification pass: dev-server HTML fetch confirmed all section IDs
  (`platform`, `methodology`, `industries`, `insights`, `contact`), headline/CTA copy, and zero
  "Coming soon" fallbacks render (all real assets resolved). **Interactive steps in
  `quickstart.md`** (drag-carousel, lightbox, phase-tab click+scroll, subscribe submit, keyboard
  tab-through, responsive resize, reduced-motion toggle) **were not performed** — no browser
  available in this environment. Recommend running quickstart.md's 11 steps manually before merging.
- [X] T047 Amended `.specify/memory/constitution.md`: recorded the Principle III exception for
  `components/ui/`'s Tailwind-first primitives, added `components/ui/`/`components/home/` and the
  `components/<route>/`-per-page convention to Additional Constraints, corrected the stale
  "no components/ split" governance note, bumped to v1.3.0.

---

## Dependencies & Execution Order

All six user stories touch disjoint component files and depended only on the Foundational phase;
none depended on another story's completion.

## Implementation Strategy — actual build order used

Per the stakeholder's complexity-first request (2026-07-14): Hero + Final CTA first, then
Subscribe/Industries/Case-Studies/Gallery, then Platform + Re-Imagine, then Testimonials +
lightbox, then the Methodology scroll-pinned stepper last. All ten sections were ultimately
implemented in a single continuous pass, but in that dependency order (primitives → simple
sections → the two stateful Client Components last), consistent with the plan.

## Notes

- Verified: `npm run lint` → 0 errors/warnings; `npm run build` → compiles, type-checks, and
  prerenders `/` successfully.
- Verified via the already-running dev server (`curl` against `http://localhost:3000/`): all
  section anchors present, hero/platform/methodology/case-study copy renders, 0 occurrences of
  "Coming soon" (confirming all real `public/` assets resolved correctly).
- **Not verified** (no browser in this environment): drag-to-scroll behavior, video lightbox
  open/close interaction, methodology scroll-pin behavior during actual scrolling, subscribe form
  submit interaction, responsive breakpoint visuals, keyboard tab order, reduced-motion rendering.
  These should be manually walked through via `specs/TMS-62/quickstart.md` before this feature is
  considered fully done.

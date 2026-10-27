# Tasks: Contact Us Page

**Input**: Design documents from `/specs/001-contact-us-page/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md
(no `contracts/` — see research.md Decision 2: no API/backend in this feature)

**Tests**: Not included — no test framework is configured in this repository (constitution
Development Workflow gap) and the spec does not request TDD. Verification is manual via
`quickstart.md` plus the existing `npm run lint` / `npm run build` gate.

**Organization**: Tasks are grouped by user story (from spec.md) to enable independent
implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Maps the task to spec.md's user stories (US1, US2, US3)

## Path Conventions

Single Next.js App Router project rooted at `app/` (see plan.md Project Structure). All new
files live under `app/(marketing)/contact/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add the one piece of shared infra this feature needs before any component work.

- [X] T001 Add `--breakpoint-sm: 560px`, `--breakpoint-md: 960px`, `--breakpoint-lg: 1140px` to
      the `@theme inline` block in `app/globals.css`, so Tailwind's `sm:`/`md:`/`lg:` prefixes
      resolve to the constitution's documented breakpoint contract (research.md Decision 1)

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Route scaffold that MUST exist before any user story is visible/testable.

**⚠️ CRITICAL**: No user story work can begin until this phase is complete.

- [X] T002 [P] Create `app/(marketing)/contact/_components/contact-hero-form.tsx` as a
      `'use client'` component skeleton (default-exported `ContactHeroForm`, no logic yet)
- [X] T003 [P] Create `app/(marketing)/contact/_components/next-steps.tsx` as a server
      component skeleton (default-exported `NextSteps`, no content yet)
- [X] T004 Create `app/(marketing)/contact/page.tsx` as a server component: set page-level
      `metadata` (title/description), and render `<ContactHeroForm />` and `<NextSteps />` inside
      a `.container` wrapper with section spacing — no header/nav/footer markup (FR-012)
      (depends on T002, T003)

**Checkpoint**: Route exists and renders (empty sections) — user story implementation can begin.

---

## Phase 3: User Story 1 - Submit a project inquiry (Priority: P1) 🎯 MVP

**Goal**: A visitor can read the page's intro, fill in the required fields, submit, and see a
confirmation.

**Independent Test**: Load `/contact`, fill full name + work email + project message, submit,
confirm the form is replaced by a personalized success message; verify missing/invalid required
fields block submission.

### Implementation for User Story 1

- [X] T005 [US1] In `contact-hero-form.tsx`, implement the hero intro block: eyebrow badge
      ("Contact Us"), `<h1>` "Let's build something <span class="text-gradient">remarkable.</span>",
      and the supporting paragraph, using existing `.eyebrow`/`.text-gradient` classes and
      `var(--token)` values only (FR-001)
- [X] T006 [US1] Implement topic-selection state (`useState`, default `"New project"`) and render
      the four topic chip buttons (New project / Partnership / Hiring TechGrit / Support) with a
      single visually-active selection at a time (FR-002)
- [X] T007 [US1] Implement the form fields — full name + work email (2-column row on `sm:`+,
      stacked below), company, project message textarea — using the `.field` class, each bound to
      component state (FR-003)
- [X] T008 [US1] Wire required-field and email-format validation (native HTML `required` +
      `type="email"` constraint validation) so submission is blocked and the offending field is
      flagged until full name, work email, and message are valid; company stays optional
      (FR-004, FR-005)
- [X] T009 [US1] Implement `onSubmit`: prevent default, set `sent = true`, and render the success
      state (check-mark icon, "Message sent." heading, message personalized with the visitor's
      first name when provided, generic message otherwise) in place of the form (FR-006, FR-007)
- [X] T010 [US1] Implement the "Send another" button: reset `sent` to `false` and clear
      name/email/company/message, returning to an empty form without a page reload (FR-008)

**Checkpoint**: User Story 1 is fully functional and independently testable (MVP).

---

## Phase 4: User Story 2 - Find alternate ways to get in touch (Priority: P2)

**Goal**: A visitor can find a direct email contact, expected response time, and the company's
operating model without using the form.

**Independent Test**: Load `/contact` and, without touching the form, confirm the email address,
response-time statement, and "remote-first / global delivery" statement are visible; click the
email row and confirm a `mailto:` link opens.

### Implementation for User Story 2

- [X] T011 [US2] In `contact-hero-form.tsx`, implement the three contact-info rows below the
      hero intro — "Email us" (`mailto:support@techgrit.com` link), "Response time" ("Within 1
      business day"), and "Where we work" ("Remote-first · global delivery") — each with an icon
      box using existing token colors (FR-009, FR-010)

**Checkpoint**: User Stories 1 and 2 both independently functional.

---

## Phase 5: User Story 3 - Understand what happens after submitting (Priority: P3)

**Goal**: A visitor can see a clear, numbered explanation of what happens after they submit an
inquiry.

**Independent Test**: Load `/contact`, scroll past the form, and confirm a numbered three-step
section is visible regardless of whether the form has been submitted.

### Implementation for User Story 3

- [X] T012 [US3] In `next-steps.tsx`, implement the three numbered step cards (01 "We read your
      note", 02 "A 30-min discovery call", 03 "A clear plan & quote") with heading + body copy,
      using `.card`-equivalent token-based borders/background (FR-011)

**Checkpoint**: All three user stories independently functional.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Responsive behavior and final verification across all stories together.

- [X] T013 [P] Apply the breakpoint-contract responsive collapse (via the `sm:`/`md:`/`lg:`
      prefixes enabled in T001): hero/form two-column grid → one column, name/email two-column
      row → one column, and the three-step grid → one column as viewport width decreases (FR-013)
- [X] T014 Cross-viewport manual QA at common desktop/tablet/mobile widths — confirm no
      overlapping or cut-off content (SC-004), per `quickstart.md` step 9
- [X] T015 Run the full `quickstart.md` verification checklist (all 10 steps) end-to-end
- [X] T016 Run `npm run lint` and `npm run build`; resolve any violations before considering the
      feature complete (matches the existing Husky pre-commit gate)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately.
- **Foundational (Phase 2)**: Depends on Setup (T001) only for the breakpoint tokens to exist
  before any responsive class is written; T002/T003 (skeletons) have no dependency on T001
  themselves. BLOCKS all user stories.
- **User Stories (Phases 3–5)**: All depend on Foundational (Phase 2) completion.
  - US1 (P1) has no dependency on US2 or US3.
  - US2 (P2) edits the same file as US1 (`contact-hero-form.tsx`) but adds a distinct,
    independent section (contact-info rows) — no functional dependency on US1's form logic.
  - US3 (P3) is in a separate file (`next-steps.tsx`) with no dependency on US1/US2.
- **Polish (Phase 6)**: Depends on all three user stories being complete.

### Parallel Opportunities

- T002 and T003 (component skeletons, different files) can run in parallel.
- Because US1 and US2 both edit `contact-hero-form.tsx`, their tasks are sequential in practice
  even though they are independently testable once both are done; US3 (`next-steps.tsx`) can be
  worked on in parallel with US1/US2 by a different contributor since it's a separate file.

---

## Parallel Example: Foundational Phase

```bash
# T002 and T003 touch different files and can run together:
Task: "Create app/(marketing)/contact/_components/contact-hero-form.tsx skeleton"
Task: "Create app/(marketing)/contact/_components/next-steps.tsx skeleton"
```

## Parallel Example: Cross-Story

```bash
# Once Foundational is done, US3 can proceed independently of US1/US2:
Task: "T012 [US3] Implement the 3-step cards in next-steps.tsx"
# ...while another contributor works through T005-T011 in contact-hero-form.tsx
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 (Setup) and Phase 2 (Foundational).
2. Complete Phase 3 (User Story 1) — the page is now a working, submittable contact form.
3. **STOP and VALIDATE** against quickstart.md steps 1–5.
4. Demo if ready — this alone delivers the page's core business value.

### Incremental Delivery

1. Setup + Foundational → route exists.
2. Add US1 → validate independently → MVP.
3. Add US2 → validate independently (contact-info rows visible/usable on their own).
4. Add US3 → validate independently ("what happens next" visible on its own).
5. Polish (Phase 6) → responsive pass + full quickstart.md + lint/build gate.

---

## Notes

- [P] tasks touch different files with no dependency between them.
- US1 and US2 share one file (`contact-hero-form.tsx`) by design (research.md Decision 3) — they
  remain independently *testable* (each has its own acceptance scenarios in spec.md) even though
  they aren't independently *parallelizable* at the file level.
- No tests are generated per this feature's Tests policy (see header) — `quickstart.md` is the
  verification substitute.

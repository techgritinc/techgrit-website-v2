# Tasks: Orbit AI Ecosystem Page (How We Work)

**Input**: Design documents from `specs/TMS-88/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, quickstart.md (no `contracts/` — static content page, no API)

**Tests**: Not requested (no test framework configured in this repo — see research.md §9). Verification is `npm run lint` / `npm run build` plus manual `quickstart.md` walkthrough.

**Organization**: Tasks are grouped by user story (spec.md priorities P1/P2/P3) so each can be built and demoed independently.

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[UI]**: Task produces user-visible frontend output — `frontend-design` skill guidance (plan.md's "UI Design Approach") applies before executing it
- **[Story]**: US1 / US2 / US3, per spec.md

## Path Conventions

Single Next.js project rooted at `app/` — no `src/`/`tests/` split (per Constitution "Additional Constraints").

---

## Phase 1: Setup

**Purpose**: Route scaffold and the one page-wide visual dependency every section needs.

- [X] T001 Create the route folder skeleton: `app/how-we-work/orbit-ai-ecosystem/_data/`, `app/how-we-work/orbit-ai-ecosystem/_components/`
- [X] T002 [P] Create `app/how-we-work/orbit-ai-ecosystem/_data/types.ts` with the full `OrbitAiSection` discriminated union and every entity type from data-model.md
- [X] T003 [P] [UI] Add a `/how-we-work/` pathname branch to `components/ui/ambient-orbs.tsx` matching the reference's 4-orb geometry (research.md §7)

**Checkpoint**: Folder structure and background exist; no page content yet.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: The one shared-component change and the page shell every user story's sections plug into.

**⚠️ CRITICAL**: No user story section can be wired until T004 and T006 are done.

- [X] T004 [P] Extend `components/ui/ContentBlock.tsx`: make `chipsLabel`/`chips` optional; when both are omitted, render eyebrow/title/description as a single centered column instead of the two-column layout (research.md §4, FR-004). Verify `app/what-we-do/ai-modernization`'s existing intro section (which always passes chips) is visually unchanged.
- [X] T005 [P] Create `app/how-we-work/orbit-ai-ecosystem/_data/orbit-ai-content.ts` with the page's `seo` object and an empty/typed `sections: OrbitAiSection[]` array (populated incrementally by each story's tasks below)
- [X] T006 Create `app/how-we-work/orbit-ai-ecosystem/page.tsx`: a synchronous Server Component exporting `metadata` from `orbitAiContent.seo`, rendering `<AmbientOrbs />`-covered background implicitly (via the global layout), and a `sections.map(...)` `switch (section.type)` skeleton with no cases populated yet (mirrors `app/construction/page.tsx`)

**Checkpoint**: Page renders at `/how-we-work/orbit-ai-ecosystem` with header/footer and background only — ready for section-by-section wiring.

---

## Phase 3: User Story 1 - Understand the OrbitAI operating model end-to-end (Priority: P1) 🎯 MVP

**Goal**: Hero, "From AI opportunity to business impact", "How OrbitAI Works", and "One Integrated Path" render with full, correct content.

**Independent Test**: Load the page with only these four sections wired; confirm a reader can understand what OrbitAI is, why an integrated path matters, the five framework layers, and the five-step lifecycle plus its extra summary card — per spec.md User Story 1.

- [X] T007 [P] [UI] [US1] Populate `HeroSection` in `orbit-ai-content.ts` (eyebrow, title, `titleHighlight`, subtitle, both CTAs, `dm-copilot.png` image, mediaCaption) per data-model.md
- [X] T008 [UI] [US1] Wire the `"hero"` case in `page.tsx`: render `components/ui/Hero.tsx` with `mediaFill` and a `MediaSlot` for the image (mirrors `ai-modernization`'s hero wiring) (depends on T007)
- [X] T009 [P] [UI] [US1] Populate `IntroSection` in `orbit-ai-content.ts` (eyebrow, title, description only — no `chips`/`chipsLabel`) per FR-004
- [X] T010 [UI] [US1] Wire the `"intro"` case in `page.tsx`: render `components/ui/ContentBlock.tsx` with `chips` omitted, confirming the T004 centered-layout branch fires (depends on T004, T009)
- [X] T011 [P] [UI] [US1] Populate `CapabilitiesSection`'s 5 `FrameworkLayer` entries (AI IMPACT, TAMAF, 4D Methodology, PRISM, Foundation Frameworks — category label, title, subtitle, 4 features each) in `orbit-ai-content.ts` per FR-005
- [X] T012 [P] [UI] [US1] Create `app/how-we-work/orbit-ai-ecosystem/_components/orbit-ai-capabilities.tsx`: 5-card grid, `id="capabilities"` (hero's anchor target), using `GlassCard` `serviceCapability` variant (same variant `ai-modernization`'s capability grid uses)
- [X] T013 [UI] [US1] Wire the `"capabilities"` case in `page.tsx` (depends on T011, T012)
- [X] T014 [P] [UI] [US1] Populate `LifecycleSection` in `orbit-ai-content.ts`: 5 `LifecycleStep` entries (Assess/Prioritize/Architect/Build/Optimize) plus `extraCard` (label "One Integrated Path", description per Clarification Q1) per FR-006
- [X] T015 [P] [UI] [US1] Create `_components/orbit-ai-lifecycle.tsx`: `components/ui/ProcessSteps.tsx` for the 5 steps, then `components/ui/Outcome.tsx` below the grid for `extraCard`
- [X] T016 [UI] [US1] Wire the `"lifecycle"` case in `page.tsx` (depends on T014, T015)

**Checkpoint**: User Story 1 fully functional and independently demoable — hero through lifecycle.

---

## Phase 4: User Story 2 - Confirm engineering rigor and audience fit (Priority: P2)

**Goal**: "Built for Real-World Engineering", "What OrbitAI Helps You Achieve", "From Understanding to Working Software", and "Who we help" all render with full, correct content.

**Independent Test**: With Phase 3 already in place, add these four sections and confirm each renders independently with correct card counts and content, per spec.md User Story 2.

- [X] T017 [P] [UI] [US2] Populate `EngineeringSection` in `orbit-ai-content.ts`: 6 `EngineeringTile` entries (One Connected Approach, AI-Assisted Human-Validated, Built for Brownfield, Flexible Entry Points, Designed for Continuous Value, Proven at Enterprise Scale) plus `extraCard` (label "Engineering Standards", description per Clarification Q2) per FR-007/FR-011
- [X] T018 [P] [UI] [US2] Create `_components/orbit-ai-engineering.tsx`: `components/ui/IconTile.tsx` grid (2-column, 6 tiles) using the icon mapping from research.md §8, then `components/ui/Outcome.tsx` for `extraCard`
- [X] T019 [UI] [US2] Wire the `"engineering"` case in `page.tsx` (depends on T017, T018)
- [X] T020 [P] [UI] [US2] Populate `AchieveSection` in `orbit-ai-content.ts`: 6 `AchievementCard` entries with the requester-confirmed titles/descriptions (Clarification Q4), no icon field
- [X] T021 [P] [UI] [US2] Create `_components/orbit-ai-achieve.tsx`: `GlassCard` `reimagineWhy` variant grid rendering only `GlassCardTitle`/`GlassCardDescription` (no `GlassCardIcon`)
- [X] T022 [UI] [US2] Wire the `"achieve"` case in `page.tsx` (depends on T020, T021)
- [X] T023 [P] [UI] [US2] Populate `UnderstandingSection` in `orbit-ai-content.ts`: 4 `UnderstandingCard` entries (Discover, Define, Design, Deliver — Clarification Q3)
- [X] T024 [P] [UI] [US2] Create `_components/orbit-ai-understanding.tsx`: `components/ui/IconTile.tsx` grid (4-across)
- [X] T025 [UI] [US2] Wire the `"understanding"` case in `page.tsx` (depends on T023, T024)
- [X] T026 [P] [UI] [US2] Populate `WhoWeHelpSection` in `orbit-ai-content.ts`: 4 `AudienceSegmentCard` entries (Legacy-heavy enterprises, Cloud migration programs, AI-first transformations, Regulated industries) verbatim per FR-010
- [X] T027 [P] [UI] [US2] Create `_components/orbit-ai-who-we-help.tsx`: `GlassCard` `industry` variant grid (4-across), same variant `ai-modernization`'s industries grid uses
- [X] T028 [UI] [US2] Wire the `"whoWeHelp"` case in `page.tsx` (depends on T026, T027)

**Checkpoint**: User Stories 1 AND 2 both work independently.

---

## Phase 5: User Story 3 - Convert after review (Priority: P3)

**Goal**: The closing CTA band renders with the reference's own copy and both CTAs.

**Independent Test**: Render just the closing CTA section and verify both CTA buttons point to their respective destinations, per spec.md User Story 3.

- [X] T029 [P] [UI] [US3] Populate `FinalCtaSection` in `orbit-ai-content.ts` (eyebrow, title, description, primary CTA "Talk to an AI Engineering Expert" → `/contact`, secondary CTA "Book a Discovery Sprint" → sibling route) per FR-014
- [X] T030 [UI] [US3] Wire the `"finalCta"` case in `page.tsx`: render `components/ui/final-cta.tsx` directly, same pattern `construction/page.tsx` and `ai-modernization/page.tsx` already use (depends on T029)

**Checkpoint**: All user stories independently functional — full page complete.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Nav repointing and final verification, none of which are gated behind a single user story.

- [X] T031 [P] Edit `cms/api/footer.ts`: repoint the "How We Work → Orbit AI Framework" link `href` from `/frameworks#orbit-ai` to `/how-we-work/orbit-ai-ecosystem` (FR-020)
- [X] T032 Confirm `components/layout/Header.tsx`/`Footer.tsx` were not modified beyond the T031 config edit (no component code changes)
- [X] T033 Run `npm run lint` and `npm run build`; fix any violations until both are green
- [X] T034 Walk through every step of `quickstart.md` against the live page and the reference file side by side at desktop/laptop/tablet/mobile widths; fix any visual fidelity gap found outside the 5 confirmed deviations

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies — start immediately
- **Foundational (Phase 2)**: Depends on Phase 1 — T004/T006 BLOCK all user-story wiring tasks (not the content-population tasks, which only touch `orbit-ai-content.ts`)
- **User Stories (Phase 3-5)**: All depend on Phase 2 completion; can proceed in priority order (P1 → P2 → P3) or in parallel per section
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### Within Each User Story

- Content-population tasks (e.g. T007, T009, T011) can run in parallel with each other and with the matching `_components/*.tsx` creation task, since both write to different files
- The `page.tsx` "wire the case" task for a section always depends on that section's content-population task AND its `_components/*.tsx` file (where one exists)

### Parallel Opportunities

- T002 and T003 (Phase 1) run in parallel
- T004 and T005 (Phase 2) run in parallel; T006 depends on neither but is typically done alongside them
- Within each user-story phase, every content-population task and its paired component-creation task are `[P]` — only the final "wire the case in `page.tsx`" task per section is sequential (it edits the shared `page.tsx` file)
- User Story phases themselves (3, 4, 5) have no cross-story code dependency and could be staffed in parallel once Phase 2 is done, though `page.tsx`'s shared `switch` means concurrent edits to that one file should be sequenced or merged carefully

---

## Parallel Example: User Story 1

```bash
# Content + component creation, once Phase 2 is done:
Task: "Populate HeroSection in orbit-ai-content.ts"
Task: "Populate IntroSection in orbit-ai-content.ts"
Task: "Populate CapabilitiesSection's 5 FrameworkLayer entries in orbit-ai-content.ts"
Task: "Create orbit-ai-capabilities.tsx"
Task: "Populate LifecycleSection in orbit-ai-content.ts"
Task: "Create orbit-ai-lifecycle.tsx"

# Then, sequentially (all touch page.tsx):
Task: "Wire hero case in page.tsx"
Task: "Wire intro case in page.tsx"
Task: "Wire capabilities case in page.tsx"
Task: "Wire lifecycle case in page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1 (hero → lifecycle)
4. **STOP and VALIDATE**: load `/how-we-work/orbit-ai-ecosystem`, confirm hero/intro/capabilities/lifecycle match spec.md's Story 1 acceptance scenarios
5. Demo if ready — this is already a coherent, if partial, page

### Incremental Delivery

1. Setup + Foundational → shell ready
2. Add User Story 1 → validate → demo (MVP)
3. Add User Story 2 → validate → demo
4. Add User Story 3 (closing CTA) → validate → demo (feature-complete)
5. Phase 6 polish (footer link, lint/build, full quickstart pass) → done

---

## Notes

- No `[P]` conflicts: every content-population task targets a distinct top-level key in `orbit-ai-content.ts`'s `sections` array and every `_components/*.tsx` creation task targets its own new file — genuinely parallelizable.
- `page.tsx`'s "wire the case" tasks all edit the same file's `switch` statement — treat these as sequential even though they're tagged per-story, to avoid merge conflicts.
- FAQ and Related sections are explicitly out of scope (see spec.md) — no tasks exist for them, and none should be added.
- Commit after each checkpoint (end of a phase), not after every individual task, to keep history readable.

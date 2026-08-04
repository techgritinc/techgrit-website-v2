# Tasks: TMS-V2.2-Enhancements — Phase 1: Shared Foundation

**Input**: [plan.md](./plan.md), [research.md](./research.md), [quickstart.md](./quickstart.md)
**Scope**: exactly 4 deliverables. No consumer `.tsx` migration, no `globals.css` vanilla-class
edits, no other page-specific v2.2 work. There is no Setup phase — no project init is needed.

## Phase 1: Foundational (Shared Primitive Updates)

**Purpose**: the 4 shared-primitive changes every future page-specific story (US1–US9) will
depend on. No `[Story]` label — this is foundational, not story-specific.

- [x] T000 Relocate `reusable-components/` (`section-eyebrow.tsx`, `final-cta.tsx`,
  `ambient-orbs.tsx`, `reveal-on-scroll.tsx`) into `components/ui/`; update all 23 consumer
  imports to `@/components/ui/...`. Pure move, no behavior change. **Done.**
- [x] T001 [P] Add 6 new ghost-button tokens to `app/tokens.css` (gradient/border/shadow/blur, per
  research.md §1) and their matching `@theme inline` entries in `app/globals.css`. **Done.**
- [x] T002 [UI] Update the `ghost` variant in `components/ui/Button.tsx` to consume the new tokens
  from T001 (white-gradient fill, inset highlight, lift-on-hover — brighten deliberately dropped, see research.md §1) — depends on T001. **Done.**
- [x] T003 [P] [UI] Add an optional `showAccent?: boolean` prop (default `true`) to
  `components/ui/section-eyebrow.tsx`; when `false`, omit the leading dash span. **Done.**
- [x] T004 [P] [UI] Create `components/ui/FilterBar.tsx` — dark background, sticky positioning,
  visible filter label, renders filter chips via `children`. **Done.**
- [x] T005 [UI] Add an "Inside TechGrit" badge (reuse `components/ui/Badge.tsx`) to the `careers`
  variant of `app/_home-components/LifeGallery.tsx`. **Done.**
- [x] T006 [UI] Add the two action buttons (reuse `components/ui/Button.tsx`) to the `home` variant
  of `app/_home-components/LifeGallery.tsx` — same file as T005, do sequentially. **Done.**

**Checkpoint**: all 4 primitives exist and match the reference in isolation; nothing consumes them
outside `LifeGallery.tsx`'s two additions.

---

## Phase 2: Polish

- [ ] T007 Run `quickstart.md`'s 5 verification steps (isolated render checks + `npm run lint` +
  `npm run build`)

---

## Dependencies

- T001 → T002 (Button.tsx needs the tokens to exist first).
- T003, T004 are fully independent of everything else.
- T005 → T006 (same file, `LifeGallery.tsx` — do in sequence to avoid conflicting edits).
- T007 runs last, after T001–T006.

## Parallel Example

```bash
# After T001 completes, these 3 can run together:
Task: "Update ghost variant in components/ui/Button.tsx (T002)"
Task: "Add showAccent prop to components/ui/section-eyebrow.tsx (T003)"
Task: "Create components/ui/FilterBar.tsx (T004)"
```

## Implementation Strategy

Single increment — all 6 tasks together are this plan's only deliverable (no MVP/phased rollout
within this slice). Complete T001–T006, then T007 to verify, then stop. The next `/speckit.plan`
pass (page-specific, not covered here) is what actually wires these primitives into any page.

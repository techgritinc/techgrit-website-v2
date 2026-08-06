# Tasks: TMS-V2.2-Enhancements — Phase 1: Shared Foundation

**Input**: [plan.md](./plan.md), [research.md](./research.md), [quickstart.md](./quickstart.md)
**Scope**: exactly 4 deliverables. No consumer `.tsx` migration, no `globals.css` vanilla-class
edits, no other page-specific v2.2 work. There is no Setup phase — no project init is needed.

**Task-numbering convention (added 2026-08-05)**: each page/section below is an independent
implementation phase owned by its own developer, worked on in parallel. Task IDs are **local to
their `# <Page>` heading**, intentionally restarting at `T001` for every section — `T001` under
`# Careers` and a future `T001` under `# Homepage` are unrelated tasks, each owned by whoever is
working that section, and neither numbering sequence depends on the other. **This duplication is
deliberate, not an oversight — do not renumber any section to make IDs globally unique.** The
Shared Foundation phase immediately below predates this convention and keeps its original
`T000-T023` numbering as its own local sequence (already complete).

Because task IDs are no longer globally unique, **every reference to a task ID outside its own
section — in this file's own text, or in `plan.md`/`research.md`/`data-model.md` — MUST be
qualified with its section name**, e.g. `Shared Foundation – T003` or `Careers – T003`. A bare
`T003` with no section qualifier is ambiguous the moment a second section reuses that number, and
MUST NOT be written without one going forward.

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

---

# Tasks Addendum — Phase 2: Homepage Hero & Trusted Clients

**Input**: [plan.md](./plan.md) addendum, [research.md](./research.md) addendum,
[quickstart.md](./quickstart.md) addendum
**Scope**: only the Homepage Hero section and extracting "Trusted by our clients" into its own
section — the FR-001–FR-004 slice of User Story 1 (spec.md). No other US1 sub-area (subscribe row,
How We Deliver, Re-Imagine grid, Construction card, Testimonials, Blog teaser, Life at TechGrit,
final CTA) is in scope. Phase 1 above (shared foundation, T000-T007) is complete and unaffected.

## Phase 3: Foundational (Tokens for Phase 2) — REVISED

**Purpose**: the new tokens every Hero/TrustedClients edit below depends on. No `[Story]` label —
foundational, not story-specific.

- [x] T007a Add a required `id` field to `DeliveryStat` and `TrustedClientLogo` in
  `app/_home-components/home-data.ts`, and change `Hero.tsx`'s stat-row `.map()` key from
  `stat.label` to `stat.id` (Principle III "stable identity for repeated content" — `label`/`alt`
  are display text; research.md addendum §7/§8). Landed ahead of T014/T017 since it touches the
  same file those tasks already edit. **Done.**
- [x] T008 [P] Add `--text-stat-count: 44px` and `--ls-stat-count: -0.035em` to `app/tokens.css`
  section 6 (TYPOGRAPHY, per research.md addendum §7), plus their `@theme inline` entries
  (`--text-stat-count`, `--tracking-stat-count`) in `app/globals.css`. **No token needed for the
  "weeks" suffix size** — `--text-stat: 26px` already exists (line 272, already mapped/consumed by
  `PlatformSection.tsx`'s `text-stat` utility) and is an exact match; reuse it instead of adding
  `--text-stat-suffix-sm`. **Done.**
- [x] T009 [P] Add `--ls-24: 0.24em` to `app/tokens.css` section 6 (TYPOGRAPHY, letter-spacing
  group) and `--color-border-hairline-08: rgba(255, 255, 255, 0.08)` to section 4 (BORDERS & GLASS),
  per research.md addendum §8, plus their `@theme inline` entries (`--tracking-24`,
  `--color-border-hairline-08`) in `app/globals.css`. **Done.**
- [x] T010 [P] Add the Live-Webinar badge's tokens per research.md addendum §9:
  `--gradient-live-badge` (section 5, GRADIENTS), `--shadow-live-badge`,
  `--shadow-live-badge-chip`, `--shadow-glow-green` (section 10, SHADOWS), and
  `--color-border-green-85: rgba(52, 211, 153, 0.85)` (section 4, BORDERS & GLASS, following the
  existing `--color-border-green-40` naming convention) to `app/tokens.css`, plus a
  `--color-border-green-85` `@theme inline` entry in `app/globals.css` (the gradient/shadow tokens
  are consumed via arbitrary-property syntax, no mapping needed). Also add the `tgLiveRipple`
  keyframe to `app/globals.css`'s animation section (`0% { transform: scale(0.8); opacity: 0.9; }
  100% { transform: scale(1.6); opacity: 0; }`). **Dropped**: the two grayscale-filter logo tokens
  planned in the original addendum — not added, per the styling-treatment reversal (research.md
  §8). **Done.**

**Checkpoint**: all new tokens + the `tgLiveRipple` keyframe exist and resolve correctly; nothing
consumes them yet.

---

## Phase 4: Homepage Hero & Trusted Clients (User Story 1 slice) — REVISED

**Goal**: FR-001–FR-004, FR-002a, FR-003a — a decluttered Homepage hero that matches
`TechGrit Homepage.dc.html`'s left-aligned layout, exact headline sizing, Live-Webinar badge (with
live dot + ripple), and per-segment stat styling; plus a standalone Trusted-Clients section with
genuine overflow-driven scroll, per research.md addendum §§5-9.

**Independent Test**: Load `/` at desktop, tablet, and mobile widths; confirm the hero shows one
badge (with a visibly pulsing green live dot), no scroll indicator, left-aligned content in a
780px-wide column, reference-fidelity stat sizing (including the smaller amber "weeks" suffix), and
that "Trusted by our clients" now renders as its own section below the hero, keeping its current
white-card logo styling and scrolling only when its logos genuinely overflow the container — with
no other homepage section visually affected.

- [x] T011 [US1] Remove the "AI-First Software Development Partner" sub-badge from
  `app/_home-components/Hero.tsx` (FR-001, research.md addendum §6) — depends on nothing. **Done.**
- [x] T012 [US1] Remove the "Scroll" chevron affordance (`<a href="#platform">...</a>`) from
  `app/_home-components/Hero.tsx` (FR-002, research.md addendum §6) — same file as T011, do
  sequentially. **Done.**
- [x] T013 [US1] In `app/_home-components/Hero.tsx`: widen the content column to `max-w-[780px]`
  (no `mx-auto`/`text-center` — stays left-aligned, reversed from the original addendum, FR-002,
  research.md addendum §5), and remove the h1's `leading-[0.99]` override so it inherits the shared
  `--lh-tight`/`--text-h1` sizing (FR-002a, research.md addendum §6a) — same file as T011/T012, do
  sequentially, after T011/T012 land. **Also** (found during polish, research.md §6b): add the h1's
  own `mt-[22px]` (reference `margin-top:22px`, previously missing entirely — the badge/h1 gap read
  as 16px instead of the reference's combined 38px); keep the hero's side padding as plain `px-9`
  (36px, matching the reference's own flat, non-responsive value — an intermediate attempt to use
  the app's `--container-padding` responsive token was tried and reverted, since measurement showed
  padding was never going to fix the mobile 3-line headline wrap either way, and the reference
  itself never reduces padding at any width); and collapse the `It&rsquo;s{" "}\n<span>` JSX onto one
  line so React doesn't insert a hydration comment node between the text and the span (DOM
  cleanliness only, no visual change). **Done.** The mobile 3-line headline wrap itself remains
  unresolved — see research.md §6b for the three candidate fixes, none chosen yet.
- [x] T014 [US1] In `app/_home-components/home-data.ts`, add an optional `suffixClassName?: string`
  field to `DeliveryStat` (already carrying its `id` field from T007a) and set it per stat (`"X"` →
  `text-amber-light`; `" weeks"` → `text-amber-light text-stat` — reusing the existing `--text-stat`
  token, not a new one); in
  `app/_home-components/Hero.tsx`, render the suffix as its own
  `<span className={stat.suffixClassName}>`, wrap each stat-value cell in `inline-flex
  items-baseline` (`gap-[2px]` stat 0 / `gap-2` stat 1), and switch the digit font-size/tracking to
  `text-stat-count`/`tracking-stat-count` (from T008), replacing the current
  `text-[36px]`/`tracking-[-0.03em]` hardcodes (FR-003, research.md addendum §7) — depends on T008;
  same file as T011-T013, do sequentially. **Done.**
- [x] T015 [US1] Rebuild the top "Live Webinar" badge in `app/_home-components/Hero.tsx` with the
  reference's exact sizing (outer badge gradient/border/blur/shadow, inner gradient chip
  padding/radius/letter-spacing) and add the two-span live dot + `tgLiveRipple` ring (FR-003a,
  research.md addendum §9) — depends on T010 (needs the new tokens + keyframe); same file as
  T011-T014, do sequentially. **Also, per direct instruction (research.md §9, revised)**: the inner
  chip must go through `components/ui/Badge.tsx`, mandatorily, not a bespoke `<span>` — added
  `size?: "sm" | "lg"` and `tone: "live"` to `Badge.tsx` (non-breaking; every existing call site's
  output is unchanged), and `Hero.tsx` now renders `<Badge tone="live" size="lg">` with the dot/ripple
  markup passed as `children`. Verified byte-for-byte identical computed styles (background, color,
  padding, font-size, letter-spacing, shadow, gap, radius, weight) against the pre-refactor markup —
  zero pixel change. **Done.**
- [x] T016 [US1] Remove the nested "Trusted by our clients" block from the end of
  `app/_home-components/Hero.tsx`'s `<section id="top">` (FR-004) — same file as T011-T015, do
  sequentially, last edit to this file. **Done.**
- [x] T017 [P] [US1] Create `app/_home-components/TrustedClients.tsx` — new section, reusing
  `TRUSTED_CLIENT_LOGOS` from `./home-data` (keyed on `logo.id`, from T007a — not `logo.alt`) and
  keeping the **current** white logo-card styling unchanged (no grayscale/brighten treatment —
  reversed from the original addendum, FR-004, research.md addendum §8); add a
  `ResizeObserver`-driven `overflowing` check (`scrollWidth > clientWidth`) that toggles the wrapper
  between `justify-center` (static) and `justify-start overflow-x-auto` (scrollable) at any viewport
  width, a right-edge fade (`mask-image: linear-gradient(90deg, var(--color-ink) calc(100% -
  var(--space-14a)), transparent)` — reused existing tokens, no new ones, per research.md addendum
  §8's correction) shown only while `overflowing`, and `tabIndex={0}`/`role="group"` on the wrapper
  regardless of state; use the `tracking-24`/`border-border-hairline-08` tokens (from T009) on the
  section label/divider — depends on T007a, T009; independent of T011-T016 (different file). **Done.**
- [x] T018 [US1] Render `<TrustedClients />` between `<Hero />` and `<SubscribeBand />` in
  `app/page.tsx` (FR-004) — depends on T017. **Done.**

**Checkpoint**: Homepage hero matches spec.md's acceptance scenario end-to-end (left-aligned,
correct headline/stat/badge fidelity); Trusted Clients is a standalone section, unchanged visual
treatment, in the correct document position, with real overflow-driven scroll.

---

## Phase 5: Polish (Phase 2 verification)

- [x] T019 Run `quickstart.md` addendum's verification steps (isolated render checks + `npm run
  lint` + `npm run build`). **Done.** `npm run lint` and `npm run build` both green; checklist
  `requirements.md` still 16/16 PASS. Browser-verified every item in quickstart.md §§6-9: exactly
  one hero badge with a genuinely-animating `tgLiveRipple` dot, no Scroll chevron, h1 at
  62px/1.02-line-height, 780px left-aligned column, stat cells reference-exact (`10`/`X` both 44px,
  `6` gradient/`weeks` 26px amber, baseline-aligned), Trusted Clients extracted with white-card
  styling preserved and genuine `ResizeObserver` overflow-scroll (static at desktop —
  scrollWidth===clientWidth — scrollable with edge-fade once logos overflow at narrow widths), and
  the Live-Webinar badge rendering through `components/ui/Badge.tsx` (`tone="live" size="lg"`) with
  zero regression on every other `Badge` consumer (spot-checked Careers' "Inside TechGrit" badge —
  still exactly its original `sm` sizing). `git status` diff scope matches quickstart §9.2 exactly:
  `Hero.tsx`, `TrustedClients.tsx` (new), `home-data.ts`, `page.tsx`, `tokens.css`, `globals.css`,
  `Badge.tsx`, plus the 5 spec-kit docs — no other page or shared component touched.

---

## Dependencies (Phase 2 addendum) — REVISED

- T007a is done and precedes everything else (it's the `id`-field/key fix landed directly in
  `home-data.ts`/`Hero.tsx` ahead of this phase).
- T008, T009, T010 are fully independent of each other (different token groups/sections in
  `tokens.css` plus the T010 keyframe in `globals.css` — safe to parallelize, then verify the file
  compiles as CSS).
- T011 → T012 → T013 → T014 → T015 → T016: same file (`Hero.tsx`), sequential edits; T014
  additionally depends on T008 (needs the new stat tokens) and T007a (needs `id`/`suffixClassName`
  fields); T015 additionally depends on T010 (needs the badge tokens + keyframe); T013 depends on
  T011/T012 having already removed the elements reflowed around.
- T017 depends on T007a (needs `TrustedClientLogo.id`) and T009 (needs the label/border tokens);
  independent of T011-T016 (different file) — can run in parallel with the Hero.tsx edit chain.
- T018 depends on T017 (component must exist before it's rendered).
- T019 runs last, after T008-T018.

## Parallel Example (Phase 2 addendum)

```bash
# T008, T009, T010 together (different tokens.css sections/globals.css keyframe, non-overlapping):
Task: "Add stat-count + suffix typography tokens (T008)"
Task: "Add trusted-clients label/border tokens (T009)"
Task: "Add Live-Webinar badge tokens + tgLiveRipple keyframe (T010)"

# Once T009/T010 land, these 2 can run together (different files):
Task: "Hero.tsx edit chain: T011 -> T012 -> T013 -> T014 -> T015 -> T016"
Task: "Create TrustedClients.tsx (T017)"
```

## Implementation Strategy (Phase 2 addendum)

Single increment — all 13 tasks (T007a, T008-T019) together are this addendum's only deliverable (no
MVP/phased rollout within this slice, since FR-001–FR-004/FR-002a/FR-003a are one cohesive visual
change to one page section). Complete T008-T018, then T019 to verify, then stop. The remaining
pieces of User Story 1 (subscribe row, How We Deliver, Re-Imagine grid, etc.) and User Stories 2-9
remain a future `/speckit.plan` pass each.

## Phase 6: Homepage Subscribe Band (Phase 2 addendum, User Story 1 slice)

**Input**: [plan.md](./plan.md) Phase 2 addendum, "Homepage Subscribe Band (FR-005)",
[research.md](./research.md) §11, [quickstart.md](./quickstart.md) §10-11
**Scope**: only the subscribe band — the FR-005 slice of User Story 1 (spec.md), extending Phase 2
(Hero & Trusted Clients, T007a-T019) rather than a new phase. No other US1 sub-area is in scope. No
new tokens are needed (research.md §11), so there is no separate Foundational sub-phase.

**Goal**: FR-005 — the subscribe band's container matches the reference's `1280px`/`80px` width and
padding with no extraneous background/border, its inputs use the reference's flexible proportional
widths, and its inputs/button share the reference's `52px` height, per research.md §11.

**Independent Test**: Load `/` at desktop, tablet, and mobile widths; confirm the subscribe band's
container is as wide as the Trusted-Clients section above it, shows no extra background tint or top
border, its Name/Email inputs sit on one full-width row in a roughly 1:2 proportion that shrinks
together at narrow widths, and both inputs and the Submit button read as the same height — with no
other homepage section visually affected and the existing submit/validation behavior unchanged.

- [x] T020 [US1] In `app/_home-components/SubscribeBand.tsx`: widen the outer container from
  `max-w-[1020px]` to `max-w-[1280px]`, correct its vertical padding from `py-[88px]` to `py-20`
  (80px; horizontal `px-9` unchanged), and remove the outer `<section>`'s
  `bg-[rgba(255,255,255,0.015)]` tint and `border-t border-border-subtle` (FR-005, research.md §11) — depends on nothing. **Done.**
- [x] T021 [US1] In the same file: change the form row from `flex flex-wrap items-center gap-2.5` to
  `flex flex-nowrap items-center gap-3 w-full`; change the Name `FormField`'s `containerClassName`
  from `w-[150px]` to `flex-1 min-w-0` and the Email `FormField`'s from `w-[180px]` to `flex-[2]
  min-w-0`; add `inputClassName="!px-[18px] !py-[15px] !min-h-[52px]"` to both `FormField`s (do not
  edit `FormField.tsx`'s shared `INPUT_BASE`) (FR-005, research.md §11) — same file
  as T020, do sequentially. **Done.**
- [x] T022 [US1] In the same file: change the Submit `Button`'s `className` override from `!py-3` to
  `!py-[15px]` and add `!min-h-[52px]` (FR-005, research.md §11) — same file as
  T020-T021, do sequentially, last edit to this file. **Done.**

**Checkpoint**: subscribe band container/background/input/button sizing all match the reference; the
card's own background/border/radius/blur/shadow and the outer text/form grid proportions are
unchanged (confirmed already reference-exact / deliberately out of scope, research.md §11); no other file touched.

---

## Phase 7: Polish (Subscribe Band verification)

- [x] T023 Run quickstart.md §10-11's verification steps (isolated render checks + `npm run lint` +
  `npm run build`). **Done.** `npm run lint` and `npm run build` both green. Browser-verified via
  computed styles against the running dev server: container `max-width:1280px`/`padding-top:80px`
  (was 1020px/88px), outer `<section>` background `rgba(0,0,0,0)` with `0px` top border (was a
  tinted background + border), form `display:flex; flex-wrap:nowrap; gap:12px` spanning the row,
  Name/Email inputs at `flex-grow:1`/`flex-grow:2` (measured widths 125.3px/250.7px — an exact 1:2
  ratio), both inputs and the Submit button at `padding:15px 18px`/`15px 24px` and
  `min-height:52px`/height `52px`. Confirmed unchanged: the card's background/border/radius/
  padding/shadow (`rgba(255,255,255,0.05)`, `rgba(255,255,255,0.12)`, `22px`, `38px 44px`, exact
  shadow match). At 375px width, `document.documentElement.scrollWidth === window.innerWidth`
  (375 = 375) — no horizontal overflow introduced. Existing client-side validation (empty-name
  error, invalid-email error, success state) all still fire correctly — unchanged by this pass.

---

## Dependencies (Subscribe Band)

- T020 → T021 → T022: same file (`SubscribeBand.tsx`), sequential edits.
- T023 runs last, after T020-T022.

## Parallel Example (Subscribe Band)

None — all 3 tasks edit the same file and must run sequentially.

## Implementation Strategy (Subscribe Band)

Single increment — all 4 tasks (T020-T023) together are this Phase 2 addition's only deliverable (no
MVP/phased rollout within this slice, since FR-005 is one cohesive sizing/spacing fix to one
component). Complete T020-T022, then T023 to verify, then stop. The remaining pieces of User Story 1
("How We Deliver", "Don't Migrate/Re-Imagine", Construction card, Testimonials, Blog teaser, Life at
TechGrit, final CTA) and User Stories 2-9 remain a future `/speckit.plan` pass each.

---

# Careers

**Page**: `/careers` (User Story 8, spec.md). **Task IDs below restart at `T001`**, scoped to this
`# Careers` heading only — see the numbering-convention note at the top of this file. Everything
above this heading (Shared Foundation, Homepage) keeps its own original numbering and is unaffected.

## Phase 1: Apply-Modal Field Alignment (User Story 8 slice)

**Input**: [plan.md](./plan.md) "Careers Apply-Modal Field Alignment (User Story 8 —
FR-037a/FR-037b)", [research.md](./research.md) §12, [data-model.md](./data-model.md)
**Scope**: only the Apply modal's field set, file-upload validation, and success copy — the
FR-037a/FR-037b slice of User Story 8 (spec.md). No other Careers section (hero, stats, Open Roles
filters, Life at TechGrit, closing CTA layout/copy) and no other user story is in scope. There is no
Setup/Foundational sub-phase — research.md §12 confirmed no new tokens are needed.

**Already satisfied, no task needed**: the modal's open trigger (`RoleCard.tsx` → `open-roles-
section.tsx` → `ApplicationDialog`, plus `CareersCta.tsx`'s general entry point), its dismiss
behavior (`components/ui/Modal.tsx`'s existing overlay-click/close-button/Escape/focus-trap), and its
reset-on-reopen behavior (`application-dialog.tsx`'s existing `prevIsOpen` effect) already match
FR-037a/FR-037b exactly (research.md §12) — none of those files need a task in this phase.

**Goal**: FR-037a, FR-037b — the Apply modal's fields, resume-upload control (with immediate 5MB
validation), and success confirmation copy match `TechGrit Careers.dc.html` exactly.

**Independent Test**: Open the Apply modal via a role card's "Apply" button; confirm it shows Full
name / Email / LinkedIn-or-portfolio-URL / Resume-upload / optional "Why TechGrit?" fields (no Phone
field). Select a resume file over 5MB and confirm an immediate error message with the selection
cleared. Submit with a required field empty and confirm a validation error that keeps the modal open.
Fill every required field and submit, confirming a name-aware success confirmation with no network
request fired. Close the modal and reopen it — for the same role, a different role, and the general
"Send your resume" CTA — confirming every field and any prior error resets to blank each time.

- [x] T001 [P] [US8] Add `UploadIcon` to `components/ui/icons.tsx`, copying the reference's exact SVG
  path data (`TechGrit Careers.dc.html` line 431: box outline + up-arrow, `viewBox="0 0 24 24"`,
  `stroke-width="2"`, round caps/joins) per research.md §12 — depends on nothing; different file from
  T002-T006, safe to do in parallel with T002.
- [x] T002 [US8] In `app/careers/_components/application-dialog.tsx`: replace the `firstName`/
  `lastName` fields with a single required `fullName` field, drop the `phone` field entirely (no
  reference equivalent), and add an optional `linkedInOrPortfolioUrl: string` field rendered via
  `FormField` with `type="url"` (FR-037a, research.md §12) — depends on nothing.
- [x] T003 [US8] In the same file: add `resumeFile: File | null` to `ApplicationFormValues`'s initial
  state, and add a new resume-upload control — a `<label>` wrapping a visually-hidden
  `<input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document">` plus a visible icon
  (T001's `UploadIcon`) + filename/placeholder + sub-label row, matching the reference's structure
  (`TechGrit Careers.dc.html` lines 428-437) — depends on T001 (needs `UploadIcon`); same file as
  T002, do sequentially after it.
- [x] T004 [US8] In the same file: add the resume input's `onChange` handler — if the selected file's
  size exceeds 5MB, immediately set a specific over-size error message, clear `resumeFile`, and clear
  the input's own value; otherwise clear any prior error and store the file (FR-037b, research.md
  §12) — same file as T002-T003, do sequentially, depends on T003 (needs the upload control to
  exist).
- [x] T005 [US8] In the same file: make the message field (renamed from `fitStatement` to
  `message`, labeled "Why TechGrit?") optional — remove `required`, update its placeholder to match
  the reference's copy — and update `handleSubmit`'s required-field check to validate `fullName`,
  `email`, and `resumeFile` only (drop the `phone`/message checks) (FR-037a, research.md §12) — same
  file as T002-T004, do sequentially.
- [x] T006 [US8] In the same file: update the success-state copy to the reference's name-aware
  pattern ("Thanks, {first token of `fullName`} — a hiring lead is going to read your note and get
  back within 2 business days.", falling back to the reference's own no-name phrasing when `fullName`
  is empty) (FR-037a, research.md §12) — same file as T002-T005, do sequentially, last edit to this
  file.

**Checkpoint**: the Apply modal's fields, upload/validation, and success copy match
`TechGrit Careers.dc.html` exactly for both entry points (per-role Apply buttons and the general
"Send your resume" CTA, since both share `application-dialog.tsx`); trigger/dismiss/reset (already
correct, verified in research.md §12, no task) remain unaffected — `RoleCard.tsx`, `open-roles-
section.tsx`, `CareersCta.tsx`, and `Modal.tsx` are untouched.

---

## Phase 2: Polish (Apply-Modal verification)

- [x] T007 `npm run lint` and `npm run build` both green (a real `tsc` type error was caught and
  fixed in passing — `LifeAtTechGritContent.images` was still typed `CollageImage[]`, which has no
  `captionLabel`/`caption` fields; retyped to `LifeGalleryImage[]`). Server-rendered `/careers` HTML
  confirmed via `curl`: the Apply button's compiled `className` now reads
  `bg-[image:var(--gradient-ghost)] border border-border-ghost ... !rounded-[12px] !px-[22px]
  !py-3 !text-[14.5px]` with no `!bg-glass-strong`/`hover:!border-orange` remnants (T013 confirmed
  live, not just in source). **Not verified interactively in this pass** — the Browser-pane tool
  could not render/screenshot in this environment (pane not displayed; navigation to localhost was
  denied), so the modal's actual open/close click flow, the oversized-file/validation/success states,
  and the reset-on-reopen behavior were verified by code inspection only, not by driving the UI.
  Recommend a manual pass in a real browser before merging.

---

## Dependencies (Apply-Modal)

- T001 is independent of T002-T006 (different file, `icons.tsx`) but T003 depends on T001 (needs
  `UploadIcon` to exist before it's referenced).
- T002 → T003 → T004 → T005 → T006: same file (`application-dialog.tsx`), sequential edits.
- T007 runs last, after T001-T006.

## Parallel Example (Apply-Modal)

```bash
# T001 and T002 touch different files and can run together:
Task: "Add UploadIcon to components/ui/icons.tsx (T001)"
Task: "Merge firstName/lastName into fullName, drop phone, add LinkedIn field (T002)"
# T003 must wait for T001 to land before it can reference UploadIcon.
```

## Implementation Strategy (Apply-Modal)

Single increment — all 6 tasks (T001-T006) together are this slice's only deliverable (one cohesive
field/validation/copy rework to one shared dialog component, per FR-037a/FR-037b). Complete
T001-T006, then T007 to verify, then stop.

---

## Phase 3: Open Roles Filter Bar (User Story 8 slice)

**Input**: [plan.md](./plan.md) "Careers Page — Full User Story 8 Coverage" addendum,
[research.md](./research.md) §14
**Scope**: only the Open Roles filter row — FR-036. FR-035 (hero) needs no task, having been audited
as already reference-exact (research.md §13). No Setup/Foundational sub-phase — no new tokens are
needed (research.md §14's token-reuse table).

**Goal**: FR-036 — the Open Roles filter row sticks below the nav with the reference's dark/blurred
background, top+bottom border, and "Filter" label, with the "Open roles" heading in its own block
above it (not sharing a row with the filters).

**Independent Test**: Load `/careers`, scroll to Open Roles, and confirm the "Open roles" heading
renders on its own line above the filter row; continue scrolling and confirm the filter row (with a
visible "Filter" label) sticks to the top of the viewport with a dark, blurred background and a
border on both its top and bottom edges; confirm filtering still works with no other Careers section
affected.

- [x] T008 [US8] In `app/careers/_components/open-roles-section.tsx`: split the current single flex
  row (`<h2>` + `<RoleFilters/>`, currently sharing one `pt-[50px] pb-[30px]` container) into the
  `<h2>`'s own block using the reference's `padding:50px 36px 12px` (`TechGrit Careers.dc.html`
  line 298), followed by `<FilterBar label="Filter"><RoleFilters .../></FilterBar>` rendered below
  it with a `20px` top margin before the bar (reference line 302's `margin-top:20px`), and the roles
  list's own container keeping the reference's `padding:24px 36px 30px` (line 311) (FR-036,
  research.md §14) — depends on nothing.
- [x] T009 [P] [US8] In `components/ui/FilterBar.tsx`: add `border-t border-border-subtle` alongside
  the existing `border-b border-border-subtle` (FR-036, research.md §14) — different file from T008,
  independent; safe to do in parallel.

**Checkpoint**: Open Roles' heading/filter-bar structure, stickiness, and border treatment match the
reference; `role-filters.tsx`'s chip styling is unchanged (already reference-matched).

---

## Phase 4: Life at TechGrit Content & Layout (User Story 8 slice)

**Input**: [plan.md](./plan.md) "Careers Page — Full User Story 8 Coverage" addendum,
[research.md](./research.md) §15, [data-model.md](./data-model.md) (`LifeGalleryImage`,
`LifeAtTechGritContent`)
**Scope**: only the Life at TechGrit section's supporting copy and image layout — FR-038's remaining
gap (the "Inside TechGrit" `Badge` itself is already done, Shared Foundation – T005). No
Setup/Foundational sub-phase — no new tokens are needed.

**Goal**: FR-038 — Life at TechGrit's heading/description match the reference's copy, its
eyebrow/heading/paragraph block is centered at the reference's sizing, and its 4 image tiles are
equal-size with a hover-reveal category/caption overlay — all scoped to the `careers` variant only,
with the `home` variant's own layout untouched.

**Independent Test**: Load `/careers`, scroll to Life at TechGrit, and confirm the heading reads
"Life at TechGrit." with the reference's description text, the eyebrow/heading/paragraph block is
centered, all 4 image tiles are equal-size, and hovering each tile reveals a category label + caption
matching the reference; then load `/` and confirm the Homepage's own Life at TechGrit gallery is
visually unchanged (no spans, captions, or alignment altered there).

- [x] T010 [P] [US8] In `app/_home-components/LifeGallery.tsx`: add optional `captionLabel?: string`
  and `caption?: string` to the `LifeGalleryImage` type; add a hover-reveal caption overlay
  (gradient scrim + `captionLabel` + `caption`, `opacity-0` → `opacity-100` with a slight upward
  translate on hover) rendered only when `variant === "careers"` and the image has both fields set;
  center the `careers` branch's eyebrow/heading/paragraph block (`text-align:center`,
  `max-width:720px`, `margin:0 auto`) and correct its heading/paragraph sizing to
  `clamp(30px,3.6vw,42px)`/`17px` (FR-038, research.md §15) — the `home` branch's own markup is
  untouched; independent of Phase 3 (different file).
- [x] T011 [US8] In `app/careers/_data/careers-data.ts`: update `lifeAtTechGrit.heading` to
  `"Life at TechGrit."` and `description` to `"The people and the culture behind the engineering."`;
  change every image's `span` to `"default"`; add each image's `captionLabel`/`caption` per the
  reference (glasses → "The team" / "Builders and designers behind the engineering."; rooftop →
  "The office" / "Rooftop breaks, real conversations."; painting → "Craft" / "We take craft
  seriously — inside & outside code."; diwali → "Together" / "We celebrate wins — and Diwali —
  together.") (FR-038, research.md §15, data-model.md) — depends on T010 (the `LifeGalleryImage`
  type must carry the new fields before this data can type-check).

**Checkpoint**: Life at TechGrit's copy, centered heading block, equal-size tiles, and hover captions
match the reference for `/careers`; `/`'s own Life at TechGrit gallery renders with zero visual
change.

---

## Phase 5: Polish (Filter Bar & Life at TechGrit verification)

- [x] T012 `npm run lint` and `npm run build` both green (all 18 routes, including `/` and
  `/careers`, prerender successfully). Server-rendered HTML confirmed via `curl`: `/careers`
  contains "Open roles" in its own block, the `FilterBar` wrapper's compiled class list includes
  `border-t border-b border-border-subtle bg-nav-glass backdrop-blur-nav mt-5` with a "Filter" label
  present, and the Life at TechGrit copy reads "Life at TechGrit." / "The people and the culture
  behind the engineering." with the reference's per-tile captions ("The team" / "Builders and
  designers behind the engineering.", etc.) present in the DOM. **Not verified interactively** — the
  Browser-pane tool could not render/screenshot in this environment (see T007's note), so the
  sticky-scroll behavior, the heading/filter visual alignment, the hover-caption reveal animation,
  and a side-by-side check that `/`'s own Life at TechGrit gallery is visually unchanged were
  confirmed by code/markup inspection only, not by driving the UI. Recommend a manual pass in a real
  browser before merging.

---

## Dependencies (Filter Bar & Life at TechGrit)

- T008 and T009 are independent (different files: `open-roles-section.tsx` vs. `FilterBar.tsx`).
- T010 and T008/T009 are independent (different files/sections — Open Roles vs. Life at TechGrit).
- T011 depends on T010 (needs `LifeGalleryImage`'s new fields to exist first).
- T012 runs last, after T008-T011.

## Parallel Example (Filter Bar & Life at TechGrit)

```bash
# T008, T009, and T010 touch 3 different files and can all run together:
Task: "Restructure open-roles-section.tsx to wrap RoleFilters in FilterBar (T008)"
Task: "Add border-t to components/ui/FilterBar.tsx (T009)"
Task: "Add caption fields/overlay + centered heading block to LifeGallery.tsx (T010)"
# T011 must wait for T010 to land before careers-data.ts can use the new fields.
```

## Implementation Strategy (Filter Bar & Life at TechGrit)

Single increment — all 4 tasks (T008-T011) together are this slice's only deliverable (FR-036 and
FR-038 are two independent, self-contained fixes bundled here since both were surfaced by the same
planning pass). Complete T008-T011, then T012 to verify, then stop. This completes every FR-035/036/
037a/037b/038 requirement of User Story 8; User Stories 2-7 and 9 remain out of scope.

---

## Phase 6: Open Roles Apply-Button Ghost-Styling Fix (documented gap — not yet implemented)

**Input**: `/speckit.analyze` finding C1 (2026-08-05), FR-037
**Scope**: only `app/careers/_components/role-card.tsx`'s Apply button styling. This phase records
a real, code-verified gap surfaced by analysis — no application code has been changed to add this
task; the fix itself is still pending.

**Finding**: `role-card.tsx`'s Apply button currently overrides `Button.tsx`'s already
reference-matched `ghost` variant with `!bg-glass-strong hover:!border-orange
hover:!bg-overlay-orange-12` — replacing the reference's gradient background and lift-only hover
(no color change, per research.md §1's explicit "hover stays lift-only" decision) with a flat
background and an orange hover tint that exists nowhere in `TechGrit Careers.dc.html` (line 326:
`background:linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.12))`, hover only
brightens the same white gradient and border, no color shift). `CareersHero.tsx`'s own "Life at
TechGrit" ghost button (Phase 1 above) already renders correctly with no such override — this is
the one Careers ghost button that diverges. FR-037's "ghost Apply button MUST use the reference's
styling" clause had zero task coverage until this phase.

**Goal**: FR-037 — the per-role "Apply" button renders via `Button.tsx`'s unmodified `ghost`
variant, matching the reference and `CareersHero.tsx`'s already-correct ghost button.

- [x] T013 [US8] In `app/careers/_components/role-card.tsx`: remove the `!bg-glass-strong`,
  `hover:!border-orange`, and `hover:!bg-overlay-orange-12` overrides from the Apply button's
  `className` so it inherits `Button.tsx`'s `ghost` variant untouched; keep only sizing overrides
  that still measure closer to the reference than the variant's own defaults (reference line 326:
  `border-radius:12px; padding:12px 22px`) (FR-037) — depends on nothing.

**Checkpoint**: RoleCard's Apply button matches the reference's ghost styling (gradient background,
white-brighten-only hover, no color shift) exactly, consistent with `CareersHero.tsx`'s ghost
button.

## Dependencies (Ghost-Styling Fix)

- T013 has no dependencies and does not depend on or block any other Careers task (T001-T012).

## Implementation Strategy (Ghost-Styling Fix)

Single task — T013 is a standalone styling correction to one file, independent of every other
phase in this section. No polish task is added here; verify visually alongside Phase 2's (T007) or
Phase 5's (T012) manual checks once implemented.

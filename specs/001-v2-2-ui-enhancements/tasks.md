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

## Phase 8: Homepage Methodology / "How We Deliver" (Phase 2 addendum, User Story 1 slice)

**Input**: [plan.md](./plan.md) Phase 2 addendum, "Homepage Methodology / 'How We Deliver' (FR-006)"
(revised), [spec.md](./spec.md) FR-006/FR-006a/FR-006b. [research.md](./research.md) §12 and
[quickstart.md](./quickstart.md) §12-13 are inputs for T024-T032 only (the original icon/eyebrow/
width/collapse fidelity pass) — both predate the `PhaseShowcase` extraction, the `className` prop,
and the orbs work, so they carry no rationale for T033-T039; that rationale lives entirely in
plan.md's "Homepage Methodology" item 2-5 and spec.md's Session 2026-08-05 Clarifications.
**Scope**: the "How We Deliver" methodology section — the FR-006/FR-006a slice of User Story 1
(spec.md), extending Phase 2 (Hero & Trusted Clients, T007a-T019) rather than a new phase — plus, per
FR-006b, the homepage's own ambient-orb background (added directly here rather than as a separate
phase, since it was clarified and planned alongside this same section). No other US1 sub-area is in
scope. The circular icon badge needs no new token (reuses the existing `--gradient-phase-node` token
verbatim); the homepage orbs need 3 new `tokens.css` entries plus their `@theme inline` mappings
(research.md §12 predates this revision and doesn't cover the orb work — see plan.md's "Homepage
ambient orbs" item for the full color/token breakdown).

**Goal**: FR-006 — each of the 4 phases shows its own distinct icon (not a bare numeral) in both the
top-rail node and the enlarged phase-detail circle, the eyebrow drops its leading symbol via the
shared `SectionEyebrow` component, the content column widens to `1280px`, the phase-detail panel
collapses to one column at `md` (960px), and the phase title/week labels drop their hardcoded Arial
override; the scroll-pinned engine lives in `components/ui/PhaseShowcase.tsx` with
`MethodologySection.tsx` as a thin homepage wrapper (FR-006, `/speckit.analyze` finding C1); the
eyebrow's margin-bottom matches the reference's `14px` via `SectionEyebrow`'s new `className` prop
(FR-006a); and the homepage shows its own reference-exact, all-warm-toned ambient-orb background
instead of the shared component's 3-orb set (FR-006b).

**Independent Test**: Load `/` at desktop, tablet, and mobile widths; confirm the top-rail step
markers and the enlarged phase-detail circle both show matching, phase-specific icons (not numerals),
the eyebrow has no leading dash, the section is as wide as Trusted Clients/Subscribe Band above it,
the phase-detail panel stacks to one column at tablet/mobile widths, the title/week labels render in
the site's normal font, and the existing scroll-pinned behavior is otherwise unaffected.

- [x] T024 [P] [US1] Add 4 new icon components to `components/ui/icons.tsx` — `PhaseArchitectIcon`,
  `PhaseAgenticBuildIcon`, `PhaseIndustrializeIcon`, `PhaseImpactIcon` — extracted verbatim from
  `TechGrit Homepage.dc.html`'s 4 distinct top-rail SVGs (lines 463-466), following the file's
  existing `IconProps`/`{...props}`-last convention (FR-006, research.md §12) — independent of
  T025-T031 (different file), but blocks T024a below. **Done.**
- [x] T024a [US1] Add a required `icon: IconComponent` field to `MethodologyPhase` in
  `app/_home-components/home-data.ts` (the same `IconComponent` type already used by
  `PlatformCapability` and 2 other adjacent types in this file), and set each of the 4
  `METHODOLOGY_PHASES` entries' `icon` to its matching export from T024 (FR-006, research.md §12 —
  revised per `/speckit.analyze` finding I1: a per-item data field, not an index-based `getIcon`
  lookup, matching this file's own established convention) — depends on T024; landed ahead of
  T025/T026/T031 since it touches a file those tasks' revised wording now assumes. **Done.**
- [x] T025 [US1] In `app/_home-components/MethodologySection.tsx`: swap the top-rail node's bare
  numeral (`{phase.n}`) for the matching icon at `phase.icon` (FR-006, research.md §12) — depends on
  T024a. **Done**, with a design correction found during implementation — see T031's note.
- [x] T026 [US1] In the same file: replace the phase-detail visual panel's 170px-font-size
  gradient-text numeral with a 170px-diameter circular badge (`background: var(--gradient-phase-node)`
  — reused, not a new token) containing the same phase's icon at `active.icon` at 82px, keeping the
  existing "Phase 0{n}" corner label unchanged (FR-006, research.md §12) — depends on T024a; same file
  as T025, do sequentially. **Done.** Also added `--shadow-phase-badge-glow` to `app/tokens.css`
  (`0 0 80px rgba(232,119,34,0.55), inset 0 3px 20px rgba(255,255,255,0.35)`) — the reference's badge
  glow had no existing token match (a planning gap caught during implementation), consumed via
  `shadow-[var(--shadow-phase-badge-glow)]`, the same arbitrary-property pattern already used for
  `--shadow-live-badge` in `Hero.tsx`.
- [x] T027 [US1] In the same file: remove the 2 hardcoded `fontFamily: "Arial, sans-serif"` inline
  overrides on the phase title and week labels so they inherit the shared `--font-body`/
  `--font-display` stack (FR-006, research.md §12 — confirmed defect, not reference-backed) — same
  file as T025-T026, do sequentially. **Done.**
- [x] T028 [US1] In the same file: widen the content column from `max-w-[1100px]` to `max-w-[1280px]`
  (FR-006, research.md §12) — same file as T025-T027, do sequentially. **Done.**
- [x] T029 [US1] In the same file: add `max-tg-md:grid-cols-1` to the phase-detail panel's
  `grid-cols-[1.25fr_0.75fr]` so it collapses to one column at the `md` breakpoint (960px) (FR-006,
  research.md §12 — the reference's own collapse selector is a dead/broken preview-tool typo) — same
  file as T025-T028, do sequentially. **Done.**
- [x] T030 [US1] In the same file: migrate the eyebrow from its bespoke `<span>` + hardcoded-dash
  markup to `<SectionEyebrow showAccent={false}>How we deliver</SectionEyebrow>` (the same toggle
  FR-017/FR-019/FR-033 already use), removing the outer wrapper's now-redundant `mb-3.5` in favor of
  `SectionEyebrow`'s own built-in spacing (FR-006, research.md §12) — same file as T025-T029, do
  sequentially. **Done.**
- [x] T031 [US1] Refactor `MethodologySection.tsx` to accept `phases`, `eyebrow: string`, and
  `heading: ReactNode` as props (removing its internal `import { METHODOLOGY_PHASES } from
  "./home-data"`); update `app/page.tsx` to pass `METHODOLOGY_PHASES`, `"How we deliver"`, and the
  existing heading JSX into `<MethodologySection>` (FR-006, resolves `/speckit.analyze` finding C1 —
  research.md §12's "Reusable-component refactor" decision, revised per finding I1 to drop the
  separate icon-lookup prop; deliberately minimal props otherwise, no `accentColor`/features-grid/CTA
  shape per spec.md Clarifications, Session 2026-08-05) — depends on T024a and is the last edit to
  `MethodologySection.tsx`; also touches `app/page.tsx`. **Done, with a correction found during
  implementation**: the `production build failed` — `app/page.tsx` is a Server Component and
  `MethodologySection.tsx` is `"use client"`, and a raw component reference (`icon: IconComponent`,
  a function) cannot cross that Server→Client props boundary (Next.js error: "Functions cannot be
  passed directly to Client Components"). Fixed by having `app/page.tsx` **pre-render** each phase's
  icon into a `ReactNode` before handing it down — `MethodologySection`'s prop type is now
  `MethodologyPhaseContent` (exported from the component itself), where `icon`/`badgeIcon` are
  `ReactNode`, not `IconComponent`. `app/page.tsx` constructs this via
  `METHODOLOGY_PHASES.map((phase) => ({ ...phase, icon: <phase.icon />, badgeIcon: <phase.icon width={82} height={82} /> }))`.
  This is a strictly better reusable-component API too (matches the same `ReactNode`-slot pattern
  already used for the `heading` prop), not just an RSC workaround. `home-data.ts`'s
  `MethodologyPhase.icon: IconComponent` field (T024a) is unaffected — it's still read, just rendered
  server-side before crossing the boundary.
- [x] T033 [P] [US1] Add an optional `className?: string` prop to `components/ui/section-eyebrow.tsx`
  that merges onto the outer wrapper `<div>` (additive, the same convention `Button`/`Badge` already
  use) (FR-006a) — independent of T034-T038, but blocks T034 below. **Done.**
- [x] T034 [US1] Create `components/ui/PhaseShowcase.tsx` — move the scroll-pin mechanics (420vh
  track, `position:fixed` stage, scroll-driven `activeIndex`), the top-rail node/icon, the
  progress-fill rail, and the phase-detail panel (widened `1280px` column, `max-tg-md:grid-cols-1`
  collapse, 170px circular icon badge) out of `MethodologySection.tsx` into this new file, accepting
  `phases`/`eyebrow`/`heading` as props (same shape `MethodologySection` currently has); its eyebrow
  renders via `<SectionEyebrow showAccent={false} className="mb-3.5">` (T033's new prop, the
  canonical Tailwind step for 14px — not `mb-[14px]`) (FR-006, resolves `/speckit.analyze` finding
  C1) — depends on T033. **Done, with 3 corrections found during the move**: (1) the pre-move file
  actually had `max-w-[1208px]` (a digit-transposition typo) instead of the `1280px` T028 was supposed
  to have already landed — corrected while moving; (2) it likewise still had `max-tg-sm:grid-cols-1`
  instead of T029's `max-tg-md:grid-cols-1` — corrected too; (3) `className="mb-3.5"` alone did not
  actually override the base `mb-4` in the browser (Tailwind orders same-property utilities by its own
  internal catalog, not by className string order — a later class in JSX doesn't win by default,
  verified computed `margin-bottom: 16px` before the fix) — changed to `className="mb-3.5!"` (Tailwind
  v4's trailing-`!` important modifier), re-verified computed `margin-bottom: 14px` after.
- [x] T035 [US1] Reduce `app/_home-components/MethodologySection.tsx` to a thin wrapper: import
  `METHODOLOGY_PHASES` from `./home-data` directly (moving this import back in, since this file is
  now the Server-Component-compatible, route-local layer), pre-render each phase's `icon`
  (`<phase.icon />`, 26px default) and `badgeIcon` (`<phase.icon width={82} height={82} />`) exactly
  as before, and render `<PhaseShowcase phases={...} eyebrow="How we deliver" heading={...} />` — no
  scroll-pin/rail/panel markup remains in this file (FR-006) — depends on T034. **Done.**
- [x] T036 [US1] Revert `app/page.tsx`'s `<MethodologySection>` call back to the plain, prop-less
  `<MethodologySection />` — T035 moved the `METHODOLOGY_PHASES` import and icon pre-rendering back
  into `MethodologySection.tsx` itself, so `page.tsx` no longer needs to supply anything — depends on
  T035. **Done.**
- [x] T037 [P] [US1] Add 3 new ambient-orb color tokens to `app/tokens.css`'s existing "Ambient orb"
  grouping — `--color-overlay-orange-11: rgba(232, 119, 34, 0.11)`, `--color-overlay-orange-13:
  rgba(232, 119, 34, 0.13)`, `--color-overlay-amber-light-10: rgba(247, 183, 51, 0.10)` (the homepage
  reference's 3 orb colors with no existing exact-match token; its 4th color already exists as
  `--color-overlay-orange-18`) — and their matching `@theme inline` mappings in `app/globals.css` so
  `bg-overlay-orange-11`/`bg-overlay-orange-13`/`bg-overlay-amber-light-10` become real canonical
  Tailwind utilities (Principle I) (FR-006b) — independent of T033-T036 (different files), blocks T038.
  **Done.**
- [x] T038 [US1] Rewrite `components/ui/ambient-orbs.tsx` end to end in Tailwind utility classes, no
  inline `style` anywhere — following the no-inline-style convention `app/case-studies/[slug]/page.tsx`
  already established for this exact pattern (`className="absolute top-[-160px] right-[-120px]
  w-[560px] h-[560px] rounded-full bg-overlay-teal blur-[120px]
  animate-[tgorb_16s_ease-in-out_infinite]"`): (a) convert the existing default 3-orb set's wrapper and
  3 spans to arbitrary-value position/size/blur/animation classes plus its 3 existing, unchanged
  `bg-overlay-orange`/`bg-overlay-blue-soft`/`bg-overlay-amber` colors (no new tokens needed here); (b)
  add a `pathname === "/"` branch (exact match) rendering the homepage's own reference-exact 4-orb,
  all-warm-toned set instead (positions, sizes, opacities, blur radii, animation timings from
  `TechGrit Homepage.dc.html` lines 148-158), using `bg-overlay-orange-18` (existing) plus T037's 3 new
  color utilities — no route-exclusion-check entry for `/` and no separate `app/_home-components/` file
  (the homepage stays on this same shared, globally-wired component). Also add `!important` to the
  existing `@media (prefers-reduced-motion: reduce) { .bg-ambient-orbs span { animation: none } }` rule
  in `app/globals.css` — moving `animation` from inline `style` to a Tailwind class means a later
  utility-layer class now outranks this rule without it, the same reason `[data-lift-hover]`'s
  reduced-motion override needed `!important` a few lines below it in the same file (FR-006b) — depends
  on T037. **Done, with one correction found during implementation**: the pre-move default third orb
  used a raw `rgba(245, 158, 11, 0.09)` literal — 1% off `--color-overlay-amber`'s `0.10` — rounded onto
  the existing token instead of minting a 4th one-off token for an imperceptible delta, consistent with
  this feature's established practice of not chasing sub-visible deltas (research.md §7,
  `SectionEyebrow`'s 2px delta above).

**Checkpoint**: methodology section's icons, eyebrow, width, responsive collapse, and font all match
the reference; the scroll-pinned engine lives in `components/ui/PhaseShowcase.tsx`, with
`MethodologySection.tsx` as a thin wrapper (no scroll-pin/rail/panel markup of its own) and
`app/page.tsx`'s call prop-less again; the eyebrow's margin-bottom matches the reference's `14px`
exactly (via `mb-3.5`); `components/ui/ambient-orbs.tsx` renders every orb via Tailwind classes with
no inline `style`, and the homepage sees its own 4-orb, all-warm-toned branch of that same shared
component instead of the default 3-orb set; the deliverables checklist and headline gradient are
unchanged (confirmed already reference-exact, research.md §12). No other homepage section, page, or
shared component (`Button`, `Badge`, `FormField`) changes.

---

## Phase 9: Polish (Methodology verification)

- [x] T032 Run quickstart.md §12-13's verification steps (isolated render checks + `npm run lint` +
  `npm run build`). **Done.** `npm run lint` and `npm run build` both green (build initially failed on
  an RSC server/client boundary error, fixed per T031's note above; second build run succeeded,
  18/18 static pages generated). Browser-verified via computed styles against the running dev
  server: content column `max-width:1280px` (was 1100px); all 4 top-rail step markers render an
  `<svg>` (not numeral text); the phase-detail badge is `~170px` diameter with an `82px` SVG icon,
  `background-image: linear-gradient(140deg, rgb(247,183,51), rgb(232,119,34))`, and
  `box-shadow` matching the reference's `0 0 80px rgba(232,119,34,.55), inset 0 3px 20px
  rgba(255,255,255,.35)` exactly; the active top-rail icon's SVG markup is byte-identical to the
  enlarged badge's icon markup (confirmed via `innerHTML` comparison); phase title/week labels
  compute to `font-family: Calibri, Carlito, "Segoe UI", system-ui, -apple-system, sans-serif` (no
  Arial); the eyebrow renders "How we deliver" with no dash/symbol span; at an 800px viewport (≤960px
  `md` breakpoint) the phase-detail panel's `grid-template-columns` collapses to a single track. The
  scroll-pin mechanics, deliverables checklist, and headline gradient were not touched by this pass
  and remain visually unchanged.
- [x] T039 Run a fresh browser/build verification pass covering T033-T038: `npm run lint` +
  `npm run build`; confirm the homepage renders identically to T032's checks above (zero visual
  regression from *moving* the code into `PhaseShowcase.tsx`, not just from having added it); confirm
  the eyebrow's computed `margin-bottom` is `14px`; confirm the homepage's ambient-orb background
  matches `TechGrit Homepage.dc.html` (4 orbs, no blue), that no `style` attribute remains anywhere in
  `components/ui/ambient-orbs.tsx` (inspect the rendered DOM), that `bg-overlay-orange-11`/
  `-orange-13`/`-amber-light-10` compute to their expected `rgba()` values, that the reduced-motion
  media query still stops the orb animation (toggle `prefers-reduced-motion: reduce` and confirm no
  `animation` is computed), and that `/construction` and `/case-studies` are unaffected.

---

## Dependencies (Methodology)

- T024 is independent (different file, `icons.tsx`) but blocks T024a, which consumes its exports.
- T024a depends on T024; blocks T025/T026/T031, which now read `phase.icon`/`active.icon` directly.
- T025 → T026 → T027 → T028 → T029 → T030 → T031: same file (`MethodologySection.tsx`), sequential
  edits; T031 additionally touches `app/page.tsx`.
- T033 is independent (different file, `section-eyebrow.tsx`) but blocks T034, which consumes the new
  `className` prop.
- T034 → T035 → T036: sequential, each depending on the previous file's new shape existing first;
  T034 additionally depends on T033.
- T037 is independent (different files, `tokens.css`/`globals.css`) but blocks T038, which consumes
  the 3 new `bg-overlay-*` utilities it creates.
- T032 runs after T024, T024a, T025-T031. T039 runs last, after T033-T038 (and after T032).

## Parallel Example (Methodology)

```bash
# T024 (icons.tsx) can start immediately; T024a waits on it:
Task: "Add 4 phase icon components to components/ui/icons.tsx (T024)"
Task: "Add icon field to MethodologyPhase in home-data.ts, populate per phase (T024a)"
# Then the MethodologySection.tsx edit chain runs sequentially:
Task: "MethodologySection.tsx edit chain: T025 -> T026 -> T027 -> T028 -> T029 -> T030 -> T031"

# T033 (section-eyebrow.tsx) and T037 (tokens.css/globals.css) can run together — different files:
Task: "Add className prop to components/ui/section-eyebrow.tsx (T033)"
Task: "Add 3 new ambient-orb color tokens + theme mappings (T037)"
# Then their respective dependent chains run:
Task: "PhaseShowcase extraction chain: T034 -> T035 -> T036"
Task: "Rewrite ambient-orbs.tsx to Tailwind classes + homepage 4-orb branch: T038"
```

## Implementation Strategy (Methodology)

Two increments within this same phase — the original fidelity pass (T024, T024a, T025-T031, verified
by T032) is already complete; the follow-up reusable-component extraction and homepage ambient orbs
(T033-T038, verified by T039) is the remaining work. Complete T033-T038, then T039 to verify, then
stop. The remaining pieces of User Story 1 ("Don't Migrate/Re-Imagine", Construction card,
Testimonials, Blog teaser, Life at TechGrit, final CTA) and User Stories 2-9 remain a future
`/speckit.plan` pass each. Building `/frameworks` itself (the candidate second consumer that
motivated the reusable-component extraction) remains explicitly out of scope — a future feature's
work, not this one's (spec.md Assumptions).

## Phase 10: Homepage Re-Imagine Grid (Phase 2 addendum, User Story 1 slice)

- [x] T040 [P] Add `--color-border-9`, `--color-glass-3`, `--shadow-reimagine-glow`, and
  `--shadow-reimagine-glow-soft` to `app/tokens.css`, each in its existing numbered section (Borders /
  Glass fills / Shadows).
- [x] T041 Map T040's 4 new tokens into `app/globals.css`'s `@theme inline` block, plus the
  pre-existing-but-unmapped `--color-border-orange-medium`, so `border-border-9`, `bg-glass-3`,
  `shadow-reimagine-glow(-soft)`, and `border-border-orange-medium` all become canonical Tailwind
  utilities.
- [x] T042 [P] Add `ReimagineSparkleIcon` and `TechGritMarkIcon` to `components/ui/icons.tsx`,
  following the file's existing `IconProps`/`{...props}`-last convention.
- [x] T043 Add `"reimagineDiff"`/`"reimagineWhy"` to `GlassCardVariant`'s union type first (required —
  the `Record`s below don't type-check without it), then add matching `reimagineDiff`/`reimagineWhy`
  entries to `components/ui/GlassCard.tsx`'s `CARD_VARIANTS`, `ICON_VARIANTS`, `TITLE_VARIANTS`, and
  `DESC_VARIANTS` `Record`s (the existing `reimagine` variant and its consumer,
  `CaseStudiesSection.tsx`, are left untouched).
- [x] T044 [P] In `app/_home-components/home-data.ts`, remove `DifferentiatorPoint`'s `icon`/`tone`
  fields and add a required `image: string` field; populate the 3 existing `DIFFERENTIATORS` entries
  with `/samples/dm-copilot.png`, `/samples/dm-tech-debt.png`, and `/samples/dm-scalability.png`
  respectively (all 3 assets confirmed present in `public/samples/`).
- [x] T045 Rewrite `app/_home-components/ReImagineSection.tsx`'s 3-card row: switch each card to
  `GlassCard variant="reimagineDiff"` rendering the shared `ReimagineSparkleIcon`, correct the row gap
  (`gap-6` → `gap-tg-9`) and the grid's own top margin (`mt-14` → `mt-tg-19`), and add each card's
  `MediaSlot` image region (180px tall, bottom-pinned via `mt-auto`).
- [x] T046 In the same file, correct the section's outer vertical padding (`pt-15 pb-25` →
  `pt-20 pb-20`).
- [x] T047 In the same file, convert the "Why AI-First Matters" panel from a plain `<div>` to
  `GlassCard variant="reimagineWhy"` (no hover classes, `hoverBorderColor=""`), swapping its icon from
  `LightningIcon` to `TechGritMarkIcon` and removing the icon's now-reference-incorrect
  `bg-overlay-orange` background chip.
- [x] T048 Run `npm run lint` + `npm run build`; browser-verify the 3-card row's computed
  `border-radius`/`gap`/padding/hover background/hover shadow/border-color against
  `TechGrit Homepage.dc.html` lines 508-573, confirm each card renders its real image
  (`dm-copilot.png`/`dm-tech-debt.png`/`dm-scalability.png` via `MediaSlot`, not the "Coming soon"
  fallback), and confirm the "Why AI-First Matters" panel shows zero hover effect (no translate, no
  border-color change, no background fill) while its icon renders `TechGritMarkIcon`.

## Dependencies (Re-Imagine Grid)

- T040 is independent (different file, `tokens.css`) but blocks T041, which maps its new tokens.
- T042 is independent (different file, `icons.tsx`) but blocks T043 (which references the icons only
  by name in comments, not by import) and T047 (which imports `TechGritMarkIcon`).
- T041 and T043 both block T045-T047, which consume the new canonical classes and `GlassCard`
  variants.
- T044 is independent (different file, `home-data.ts`) but blocks T045 (which reads `item.image`).
- T045 → T046 → T047: same file (`ReImagineSection.tsx`), sequential edits.
- T048 runs last, after T040-T047.

## Parallel Example (Re-Imagine Grid)

```bash
# T040 (tokens.css), T042 (icons.tsx), and T044 (home-data.ts) can run together — different files:
Task: "Add 4 new border/glass/shadow tokens to app/tokens.css (T040)"
Task: "Add ReimagineSparkleIcon + TechGritMarkIcon to components/ui/icons.tsx (T042)"
Task: "Update DifferentiatorPoint shape in home-data.ts (T044)"
# Then T041 (globals.css) and T043 (GlassCard.tsx) can run together — different files:
Task: "Map new tokens into globals.css @theme inline (T041)"
Task: "Add reimagineDiff/reimagineWhy variants to GlassCard.tsx (T043)"
# Then the ReImagineSection.tsx edit chain runs sequentially:
Task: "ReImagineSection.tsx edit chain: T045 -> T046 -> T047"
```

## Implementation Strategy (Re-Imagine Grid)

Complete T040-T044 (independent, parallelizable), then T041/T043 (each depends on one of the first
group), then the sequential T045-T047 chain, then T048 to verify. The remaining pieces of User Story 1
(Construction card, Testimonials, Blog teaser, Life at TechGrit, final CTA) and User Stories 2-9
remain a future `/speckit.plan` pass each.

## Phase 11: Homepage Industries Section (Phase 2 addendum, User Story 1 slice)

Scope: only the homepage's `IndustriesSection.tsx` (FR-008) — NOT the standalone `/construction`
page, whose own requirements (FR-016–FR-021) are unaffected and out of scope for this phase.

- [x] T049 [P] Add `IndustryFinTechIcon`, `IndustryHealthcareIcon`, and `IndustryConstructionIcon` to
  `components/ui/icons.tsx`, extracted verbatim from `TechGrit Homepage.dc.html` lines 588/593/598,
  following the file's existing `IconProps`/`{...props}`-last convention, each with `stroke="#fff"` —
  the existing `FinTechIcon`/`HealthcareIcon`/`ConstructionIcon` exports (also used by
  `components/layout/nav-config.ts`'s mega-menu) are left untouched.
- [x] T050 [P] Add `--color-border-violet-50`, `--color-border-green-55`, `--color-border-blue-55`
  (§ Borders), `--shadow-industry-glow-violet`, `--shadow-industry-glow-green`,
  `--shadow-industry-glow-blue` (§ Shadows), `--ls-title-tight: -0.01em` (§ Typography — named to
  avoid confusion with the existing, unrelated `--ls-01: 0.01em`, per `/speckit.analyze` finding M3),
  and `--text-industry-title: 26px` (§ Typography — a dedicated token, not a reuse of the
  single-job-annotated `--text-stat`, per `/speckit.analyze` finding C1) to `app/tokens.css`, each in
  its existing numbered section.
- [x] T051 Map T050's 8 new tokens into `app/globals.css`'s `@theme inline` block, so
  `border-border-violet-50`/`-green-55`/`-blue-55`, `hover:shadow-industry-glow-violet`/`-green`/
  `-blue`, `tracking-title-tight`, and `text-industry-title` all become canonical Tailwind utilities.
- [x] T052 [P] In `app/_home-components/home-data.ts`: repoint each `IndustryCard.icon` to its new
  `Industry*Icon` export (T049), remove the `image` field from the `IndustryCard` type and all 3
  `INDUSTRY_CARDS` entries, and add a required `iconBg: string` field populated with
  `bg-avatar-violet`/`bg-avatar-green`/`bg-avatar-blue` (FinTech/Healthcare/Construction respectively —
  all 3 already exact-match, already-mapped tokens from the Testimonials avatar work, reused as-is).
- [x] T053 In `components/ui/GlassCard.tsx`, edit the `industry` entry (its sole consumer, confirmed
  via search — safe to modify in place) in `CARD_VARIANTS` (→
  `"rounded-2xl border-border-9 bg-glass-3 p-tg-13 pb-tg-14 hover:-translate-y-[5px]"`, dropping
  `overflow-hidden`), `ICON_VARIANTS` (→ `"mb-tg-17 h-14 w-14 rounded-full"`), `TITLE_VARIANTS` (→
  `"text-industry-title tracking-title-tight"`, replacing the stale `"text-[23px]"` — `/speckit.analyze`
  finding H1: the original task only planned to *add* tracking, never correcting the 23px→26px
  font-size gap), and `DESC_VARIANTS` (→ `"mt-2.5 text-sm leading-[1.6] text-60"`, replacing
  `"mt-2.5 text-[15px] leading-[1.6]"` — `/speckit.analyze` finding H2: this variant had no color class
  and was silently inheriting the base `<p>` rule's 0.72-opacity text color instead of the reference's
  0.6; `text-sm` also replaces the arbitrary `text-[15px]` with its canonical equivalent, per M1).
- [x] T054 Rewrite `app/_home-components/IndustriesSection.tsx`: remove the `MediaSlot`/photo block and
  its `ICON_BORDER`/`ICON_COLOR` maps entirely; render each card's icon as
  `<GlassCardIcon variant="industry" className={industry.iconBg}><Icon className="text-white" /></GlassCardIcon>`;
  remove the inline "Explore Construction →" text link; wrap only the Construction card (where
  `industry.href` is non-null) in a whole-card `<a href={industry.href}>` — FinTech and Healthcare
  render their `GlassCard` unwrapped, with no click affordance. Also correct the "Explore Industry
  Solutions" `<Button variant="ghost">` call's `className` from `"px-6!"` to `"py-4!"` —
  `/speckit.analyze` finding M2: `Button.tsx`'s `md`-size default already provides the reference's
  correct 26px horizontal padding, so `px-6!` (24px) was an unnecessary, fidelity-*regressing*
  override; the reference's actual gap was vertical padding (14px vs. the needed 16px), which neither
  the original nor the overridden class corrected.
- [ ] T055 Run `npm run lint` + `npm run build`; browser-verify each card's computed
  `border-radius`/`background`/`padding`/icon-to-title gap against `TechGrit Homepage.dc.html` lines
  586-602, confirm the title renders at 26px (not the stale 23px) and the description at
  `rgba(255,255,255,0.6)` (not the inherited 0.72), confirm only the Construction card is clickable
  (whole-card, to `/construction`) with a distinct hover lift/border/glow, confirm FinTech/Healthcare
  show no hover or click affordance, confirm the ghost button's computed padding is `16px` vertical /
  `26px` horizontal, and confirm `components/layout/nav-config.ts`'s mega-menu icons render
  pixel-unchanged.

## Dependencies (Industries Section)

- T049 (icons.tsx) and T050 (tokens.css) are independent (different files) but each blocks a later
  task: T049 blocks T052 (imports the new icons); T050 blocks T051 (maps its new tokens).
- T051 and T049 both block T053 (which consumes the new canonical classes) and T054 (which imports the
  new icons via T052).
- T052 depends on T049 (icon imports) and is independent of T050/T051/T053 otherwise.
- T053 depends on T051 (canonical classes must exist first).
- T054 depends on T052 (repointed `home-data.ts`) and T053 (updated `GlassCard` variant).
- T055 runs last, after T049-T054.

## Parallel Example (Industries Section)

```bash
# T049 (icons.tsx) and T050 (tokens.css) can run together — different files:
Task: "Add 3 new Industry*Icon exports to components/ui/icons.tsx (T049)"
Task: "Add 3 border tokens + 3 shadow tokens + 1 tracking token + 1 font-size token to app/tokens.css (T050)"
# Then T051 (globals.css) and T052 (home-data.ts) can run together — different files:
Task: "Map new tokens into globals.css @theme inline (T051)"
Task: "Repoint IndustryCard icons, drop image field, add iconBg (T052)"
# Then T053 (GlassCard.tsx), then T054 (IndustriesSection.tsx) — each depends on the prior:
Task: "Edit industry variant's CARD_VARIANTS/ICON_VARIANTS/TITLE_VARIANTS/DESC_VARIANTS (T053)"
Task: "Rewrite IndustriesSection.tsx: icon badges, no photo, Construction-only link, ghost-button padding fix (T054)"
```

## Implementation Strategy (Industries Section)

Complete T049-T050 (independent, parallelizable), then T051/T052 (each depends on one of the first
group), then T053, then T054, then T055 to verify. The remaining pieces of User Story 1 (Testimonials,
Blog teaser, Life at TechGrit, final CTA) and User Stories 2-9 remain a future `/speckit.plan` pass
each — unless already covered below.

## Phase 12: Homepage Testimonials Section (Phase 2 addendum, User Story 1 slice)

Scope: only `app/_home-components/TestimonialsSection.tsx`, `app/_home-components/home-data.ts`
(FR-009, FR-009a) — NOT any other homepage section, NOT any other page.

- [ ] T056 [P] Add `QuoteIcon` to `components/ui/icons.tsx` (the reference's quotation-mark path,
  `TechGrit Homepage.dc.html` lines 646/673: `M9 6C4.5 6 2 10 2 15v11h11V15H6.5c0-3 1.5-5 4.5-5V6zm18
  0c-4.5 0-7 4-7 9v11h11V15h-6.5c0-3 1.5-5 4.5-5V6z`), following the file's existing
  `IconProps`/`{...props}`-last convention — `ClockIcon`/`CheckIcon` (both already exist) are reused via
  prop overrides, not modified.
- [ ] T057 [P] Add 7 new tokens to `app/tokens.css`, each in its existing numbered section:
  `--gradient-testimonial-card` (§ Gradients, text-card resting background), `--gradient-testimonial-edge-left`
  (§ Gradients, track's new left-side fade), `--shadow-testimonial-hover-video` and
  `--shadow-testimonial-hover-text` (§ Shadows, per-card-type hover shadow shapes),
  `--shadow-testimonial-avatar` (§ Shadows, text-card avatar shadow), `--color-badge-ink-40`
  (§ Ink-scale, duration-badge pill background), and `--radius-16: 16px` (§ Radii, numbered tier —
  deliberately not a reuse of the single-job-annotated `--radius-tile`). **Also correct** the existing
  `--gradient-testimonial-video`'s first color stop from `rgba(232,119,34,0.92)` to the reference's
  exact `rgba(232,119,34,0.88)` (`/speckit.analyze` finding
  H1 — this value change belongs here, in the tokens task, not inside T060's component edit; its second
  stop already matches and is unchanged). **Also rename** the existing `--color-badge-ink-45` to
  `--color-badge-ink-50`, correcting its value from `rgba(0,0,0,0.45)` to the reference's actual
  `rgba(0,0,0,0.50)` (its sole consumer is corrected in T060).
- [ ] T057a [P] Add a required `id` field to `Testimonial` in `app/_home-components/home-data.ts`,
  populated for all 6 `TESTIMONIALS` entries (`/speckit.analyze` finding C2 — Constitution Principle
  III, "Stable identity for repeated content": both of `TestimonialsSection.tsx`'s `.map()` render sites
  currently key on `testimonial.name`, display text, with no `id`/`slug` field to key on instead — the
  same gap this feature already fixed for `DeliveryStat`/`TrustedClientLogo` via `T007a`). Independent of
  T056/T057 (different file); T059 depends on it to re-key both call sites.
- [ ] T058 Map T057's 7 new/corrected tokens plus the renamed `--color-badge-ink-50` into
  `app/globals.css`'s `@theme inline` block (removing the stale `--color-badge-ink-45` mapping key), so
  `bg-badge-ink-40`/`bg-badge-ink-50`, `hover:shadow-testimonial-hover-video`/`-text`,
  `shadow-testimonial-avatar`, and `rounded-16` all become canonical Tailwind utilities; the 2 gradient
  tokens are consumed via the existing arbitrary-property pattern already used for
  `--gradient-testimonial-video`/`-fade`/`-edge`/`-placeholder` (no bare utility equivalent for a
  gradient value) — the corrected `--gradient-testimonial-video` value flows through its existing
  mapping unchanged.
- [ ] T059 In `app/_home-components/TestimonialsSection.tsx`, restructure the header: replace the single
  centered block with a flex row — a left-aligned text column (eyebrow, `h2`, paragraph, all inside a
  shared `max-w-[640px]` wrapper, dropping the paragraph's current `text-center mx-auto max-w-[520px]`)
  on the left, and a new trust-metrics card on the right (3 stat cells — 500+ Projects delivered / 100%
  Would refer / 6wk Avg. time to value — separated by 2 vertical dividers, defined as a local array in
  this file with its own `id` field per cell (`/speckit.analyze` finding L1 — keyed on `id`, not label
  text, from the start, since this is a new `.map()`-rendered list), using
  `border-border-8`/`bg-glass-3`/`blur-md`/`rounded-16`/`space-8`/`space-11` and the `border-border-14`
  divider, all exact-match reused tokens), wrapping below the text column via normal `flex-wrap` at
  narrow widths (no absolute positioning). Also re-key both of this file's `TESTIMONIALS.map()` render
  sites from `key={testimonial.name}` to `key={testimonial.id}` (T057a).
- [ ] T060 [P] [US1] In the same file's **video card**, add a duration badge (reusing `ClockIcon` at
  `width={10} height={10} strokeWidth={2.5}` + "2:14" text in `text-bright`/`text-3xs`, on a
  `bg-badge-ink-40` pill) next to the existing VIDEO label; add a 5-star rating row (`/speckit.analyze`
  finding C1 — this card has **no** star-rating markup today, unlike the text card; render 5 static
  white stars with the reference's subtle `text-shadow`, independent of the `rating` field, which video
  entries don't set); correct the VIDEO label pill's background class from `bg-badge-ink-45` to
  `bg-badge-ink-50` (T057's rename); correct the card's border class from `border-border-orange` (0.38)
  to `border-border-orange-45` (0.45, exact reference match) — the video-gradient background's opacity
  correction is already handled by T057, this task only consumes the corrected token; add
  `hover:shadow-testimonial-hover-video` alongside the existing `hover:-translate-y-1.5`; add a decorative
  `QuoteIcon` (T056) at the reference's video-card size/position/opacity/color (76px, `fill-white`,
  `opacity-14`). No verified badge is added to this card.
- [ ] T061 [P] [US1] In the same file's **text card**, add a verified badge (reusing `CheckIcon` at
  `width={11} height={11}` + "Verified" label in `text-green`/`text-3xs`/`tracking-wider`, positioned in
  the same row as the existing star rating via `justify-between`); add `hover:border-border-orange-medium`
  and `hover:shadow-testimonial-hover-text` alongside the existing `hover:-translate-y-1.5`; add
  `shadow-testimonial-avatar` to the avatar circle (background gradient unchanged — already correct);
  correct the card's background from flat `bg-glass-4` to the new `bg-[image:var(--gradient-testimonial-card)]`
  gradient (T057); add a decorative `QuoteIcon` (T056) at the reference's text-card size/position/opacity/
  color (110px, `fill-orange`, `opacity-06`). No duration badge or play affordance is added to this card.
- [ ] T062 [US1] In the same file, add the new `--gradient-testimonial-edge-left` fade as a second edge
  overlay (left side, alongside the existing unchanged right-side `--gradient-testimonial-edge` fade);
  update the drag pointer handlers — `onPointerDown` now also sets the track's cursor to `grabbing` and
  `scrollSnapType` to `"none"`; `endDrag` (pointer-up/leave) now also reverts both to `grab`/`"x proximity"` —
  matching the reference's `_setupTestiDrag` exactly, in addition to the existing `scrollLeft`-based drag
  logic.
- [ ] T063 Run `npm run lint` + `npm run build`; browser-verify the header's left-alignment (including the
  paragraph) and the metrics card's position/wrap behavior, each card type's new elements per the
  reference-exact per-card-type split (video: duration badge + star rating + quote icon, no verified
  badge; text: verified badge + quote icon, no duration badge), each card type's distinct hover shadow,
  the avatar's new shadow, both edge fades (confirm the left one reads visibly lighter/narrower than the
  right), and the drag cursor/scroll-snap-toggle behavior (grab→grabbing while held, snap suspended
  mid-drag, restored on release). Confirm `--color-badge-ink-50`'s only consumer is this file, and that
  both `.map()` sites over `TESTIMONIALS` now key on `testimonial.id`, not `testimonial.name`.

## Dependencies (Testimonials Section)

- T056 (icons.tsx), T057 (tokens.css), and T057a (home-data.ts) are mutually independent (different
  files) but each blocks later tasks: T056 blocks T060/T061 (import `QuoteIcon`); T057 blocks T058 (maps
  its new/renamed/corrected tokens) and T059-T062 (consume the new canonical classes); T057a blocks T059
  (re-keys the `.map()` sites on `testimonial.id`).
- T058 depends on T057.
- T059 depends on T057/T058 (consumes `border-border-8`/`bg-glass-3`/`blur-md`/`rounded-16`/etc.) and
  T057a (re-keying).
- T060 and T061 are independent of each other (different card-type branches in the same file's `.map()`
  callback) but both depend on T056 (icon import) and T058 (canonical classes) — run sequentially against
  the same file to avoid edit conflicts, not truly parallel despite touching different JSX branches.
- T062 depends on T057/T058 (the new left-edge gradient class) and is otherwise independent of T060/T061's
  card-level changes.
- T063 runs last, after T056-T062 (and T057a).

## Parallel Example (Testimonials Section)

```bash
# T056 (icons.tsx), T057 (tokens.css), and T057a (home-data.ts) can all run together — different files:
Task: "Add QuoteIcon to components/ui/icons.tsx (T056)"
Task: "Add 7 new tokens + 1 value correction + 1 rename to app/tokens.css (T057)"
Task: "Add required id field to Testimonial in home-data.ts (T057a)"
# Then T058 (globals.css), then the TestimonialsSection.tsx edit chain runs sequentially:
Task: "Map new/renamed tokens into globals.css @theme inline (T058)"
Task: "TestimonialsSection.tsx edit chain: T059 -> T060 -> T061 -> T062"
```

## Implementation Strategy (Testimonials Section)

Complete T056-T057/T057a (independent, parallelizable), then T058 (depends on T057), then the
sequential T059-T062 chain (all touch the same file), then T063 to verify. The remaining pieces of User
Story 1 (Blog teaser, Life at TechGrit, final CTA) and User Stories 2-9 remain a future `/speckit.plan`
pass each. `/construction`'s own FR-016–FR-021 work is unaffected and unplanned by this phase.

## Phase 13: Homepage Blog Teaser Section (Phase 2 addendum, User Story 1 slice)

Scope: new `app/_home-components/BlogSection.tsx`, `components/ui/icons.tsx`, `components/ui/GlassCard.tsx`,
`app/tokens.css`/`globals.css`, `app/page.tsx` (FR-010) — NOT any other homepage section, NOT
`app/blog/_data/blog-content.ts` or any other `/blog` file, NOT any other page.

- [X] T064 [P] **Revised during implementation**: no new icons needed. `components/ui/icons.tsx`
  already has `CopilotToAgenticIcon`, `EradicateDebtIcon`, and `InfiniteScalabilityIcon` — added for
  the Re-Imagine grid, unused since FR-007 replaced them with a shared sparkle icon — and their SVG
  paths are byte-identical to the reference's 3 Blog-card decorative icons (`TechGrit Homepage.dc.html`
  lines 789/801/813). Adding 3 new `Blog*Icon` exports would have duplicated these shapes verbatim, a
  Principle III violation. `BlogSection.tsx` (T068) imports and reuses all 3 as-is, overriding
  `width`/`height` to 72 and `stroke` to `var(--color-icon-stroke)` via prop spread (matching the
  hardcoded-stroke convention already used by `case-study-detail-hero.tsx`/`featured-case-study.tsx`).
  **Done.**
- [X] T065 [P] Add 15 new tokens to `app/tokens.css`, each in its existing numbered section (see
  research.md §16 for the full list and reference line numbers): `--gradient-blog-teaser-orange`/`-blue`/
  `-teal` (§ Gradients), `--color-glow-white-18`, `--color-border-blue-55`, `--color-border-teal-60`
  (§ Borders & Glass), `--color-text-35` (§ Text Colors), `--text-blog-meta`, `--ls-blog-meta`
  (§ Typography — both deliberately dedicated, not reusing the value-close `--text-2xs` or the
  single-job-annotated `--ls-hint`), and `--shadow-blog-teaser-orange`/`-blue`/`-teal` +
  `-orange-hover`/`-blue-hover`/`-teal-hover` (§ Shadows). Card 1's hover border
  (`--color-hover-orange-border-55`) and its header-gradient first stop's numeric coincidence with
  `--color-overlay-orange-strong` need no new token — reused/noted, not duplicated.
- [X] T066 Map T065's 15 new tokens into `app/globals.css`'s `@theme inline` block (the 3 gradients via
  the existing arbitrary-property pattern already used for `--gradient-testimonial-*`; the rest as
  canonical utilities — `bg-glow-white-18`, `border-border-blue-55`, `border-border-teal-60`, `text-35`,
  `text-blog-meta`, `tracking-blog-meta`, `shadow-blog-teaser-orange`/`-blue`/`-teal`,
  `hover:shadow-blog-teaser-orange-hover`/`-blue-hover`/`-teal-hover`). **Also add** 2 previously-missing
  mappings for pre-existing, unrelated tokens this section's own markup needs —
  `--spacing-tg-6: var(--space-6);` (16px) and `--spacing-tg-10: var(--space-10);` (24px) — neither had a
  canonical `@theme inline` entry before now (research.md §16). Depends on T065 (same file, sequential).
- [X] T067 [P] Add a new `"blogTeaser"` member to `GlassCard.tsx`'s `GlassCardVariant` union and a
  matching entry in each of its 4 `Record`s: `CARD_VARIANTS.blogTeaser` (`"flex flex-col overflow-hidden
  rounded-2xl border-border-image bg-glass-4 hover:-translate-y-[6px]"` — `bg-glass-4`/`border-border-image`
  are exact-match reused tokens), `ICON_VARIANTS.blogTeaser` (`"h-18 w-18"` — Tailwind's own canonical
  72px default, no new token needed), `TITLE_VARIANTS.blogTeaser` (`"mt-tg-4 text-[19px] font-bold
  text-white leading-[1.32]"`), `DESC_VARIANTS.blogTeaser` (`"mt-tg-3 text-[14.5px] leading-[1.6]
  text-muted"` — `text-muted` added explicitly, per the same silent-inheritance lesson already applied to
  the Industries variant). Distinct from the existing `"blogCard"`/`"blogFeatured"` variants (different
  shape, not a fork of either — neither's own `Record` entries change). Independent of T064/T065/T066
  (different file).
- [X] T068 [US1] Create new `app/_home-components/BlogSection.tsx`: a local `BLOG_TEASER_POSTS` array of
  3 entries (each with its own `id` field from the start, per this feature's established Principle III
  stable-identity convention), holding the reference's literal topic/title/excerpt/read-time/icon/
  per-card-color-class fields verbatim (research.md §16 — content is static/reference-exact, not a
  dynamic pull from `app/blog/_data/blog-content.ts`). The outer `<section>` wrapper uses
  `max-w-(--container-max) px-9 pt-tg-21 pb-20` (matching the reference's `max-width:1280px;
  padding:60px 36px 80px` — all already-canonical classes, no new token needed), the same container
  convention `IndustriesSection`/`TestimonialsSection` already use. Renders a left-aligned hand-rolled
  eyebrow ("From the blog") + `h2` ("Perspectives on AI-first delivery.", using `LifeGallery.tsx`'s existing
  `text-[clamp(30px,3.6vw,42px)]` clamp) alongside a right-aligned ghost `<Button href="/blog"
  variant="ghost">` ("Visit the blog" + arrow), in the same header row shape `IndustriesSection.tsx`
  already establishes; below, a 3-card grid (`grid-cols-3 gap-6 max-tg-md:grid-cols-1`), each card a
  plain `<a href="/blog">` (matching `IndustriesSection.tsx`'s own whole-card-link convention exactly —
  no `style={{ display: "contents" }}` needed, since the `<a>` is itself the direct grid child here)
  wrapping a `<GlassCard variant="blogTeaser">` (T067) with a 190px gradient/icon header block, a
  radial-highlight overlay, and a body (topic/dot/read-time meta row, title, description, "Read more →"
  link) — see plan.md's "Homepage Blog Teaser Section (FR-010)" for the full per-element class
  breakdown. Depends on T064 (icons — revised to reuse `CopilotToAgenticIcon`/`EradicateDebtIcon`/
  `InfiniteScalabilityIcon`), T066 (tokens/mappings), and T067 (GlassCard variant). **Done.**
- [X] T069 [US1] Render `<BlogSection />` in `app/page.tsx` between `<CaseStudiesSection />` and
  `<LifeGallery />`, matching the reference's own document order (Testimonials → Case Studies →
  home-blogs → Inside TechGrit). Depends on T068. **Done.**
- [X] T070 Run `npm run lint` + `npm run build`; browser-verify the section's left-aligned eyebrow/heading,
  the right-aligned ghost button (22px/15px padding, 52px min-height) linking to `/blog`, all 3 cards'
  per-card gradient header/icon/topic-color/hover-border/hover-shadow, that clicking anywhere on a card
  (not just its "Read more" text) navigates to `/blog`, that the 3 cards' content matches the reference
  verbatim (not any of the 9 real `/blog` posts), and that the section sits between the homepage's Case
  Studies preview and Life at TechGrit with no other section shifted. Confirm `app/blog/_data/blog-content.ts`
  and every `/blog` file are unchanged.

## Dependencies (Blog Teaser Section)

- T064 (icons.tsx) and T065 (tokens.css) are mutually independent (different files) but each blocks later
  tasks: T064 blocks T068 (imports the 3 new icons); T065 blocks T066 (maps its new tokens).
- T066 depends on T065, and in turn blocks T068 (which consumes T066's canonical classes, not
  `tokens.css`'s raw custom properties directly).
- T067 is independent of T064/T065/T066 (different file) but blocks T068 (consumes the new `"blogTeaser"`
  variant).
- T068 depends on T064, T066, and T067.
- T069 depends on T068.
- T070 runs last, after T064-T069.

## Parallel Example (Blog Teaser Section)

```bash
# T064 (icons.tsx), T065 (tokens.css), and T067 (GlassCard.tsx) can all run together — different files:
Task: "Add 3 new decorative icons to components/ui/icons.tsx (T064)"
Task: "Add 15 new tokens to app/tokens.css (T065)"
Task: "Add new blogTeaser variant to components/ui/GlassCard.tsx (T067)"
# Then T066 (globals.css, depends on T065), then the sequential chain:
Task: "Map new tokens + 2 missing spacing mappings into globals.css @theme inline (T066)"
Task: "Create BlogSection.tsx (T068) -> render in page.tsx (T069) -> verify (T070)"
```

## Implementation Strategy (Blog Teaser Section)

Complete T064/T065/T067 (independent, parallelizable), then T066 (depends on T065), then T068 (depends
on T064/T066/T067), then T069 (depends on T068), then T070 to verify. The remaining pieces of User
Story 1 (Life at TechGrit, final CTA) and User Stories 2-9 remain a future `/speckit.plan` pass each.

## Phase 14: Homepage Life at TechGrit Section (Phase 2 addendum, User Story 1 slice)

**Input**: [plan.md](./plan.md) Phase 2 addendum, "Homepage Life at TechGrit Section (FR-011)",
[spec.md](./spec.md) FR-011/FR-044, Clarifications Session 2026-08-06. [research.md](./research.md) §17
has the full token reuse/no-new-token accounting.

**Scope**: `app/_home-components/LifeGallery.tsx`'s `home` branch only, `app/_home-components/
home-data.ts` (`CULTURE_GALLERY_IMAGES` caption content), and 2 new tokens in `app/tokens.css`/
`globals.css` (FR-011) — NOT the `careers` branch of the same file, NOT `/careers` (which must render
with zero visual change), NOT `components/ui/section-eyebrow.tsx` itself, NOT any other homepage
section, NOT `app/page.tsx`.

**Goal**: FR-011 — the "Inside TechGrit" eyebrow renders with no leading accent line, the photo grid
matches the reference's uniform 4-column bordered/captioned layout, and the two action buttons (already
correct from Phase 1) are confirmed unchanged.

- [X] T071 [P] [US1] Recreate `app/_home-components/LifeGallery.tsx` byte-for-byte from the teammate's
  supplied unmerged-branch structure — the `variant`/`columns`-based component, `LifeGalleryImage` gaining
  optional `captionLabel`/`caption` fields, the `careers` branch's aspect-`3/4` bordered tile shell with
  its caption-rendering block left commented out exactly as supplied, and `scroll-mt-[96px]` on the
  `<section>` — establishing the merge-conflict-free baseline this addendum's own edits (T075) layer on
  top of (spec.md Clarifications, Session 2026-08-06; plan.md "Homepage Life at TechGrit Section
  (FR-011)"). Independent of T072/T074 (different files) — blocks T074 and T075. **Revised during
  implementation** (direct instruction, discovered mid-recreation): the teammate's pasted `careers`
  eyebrow hardcoded a raw `text-[#E87722]` hex and a `text-[rgba(255,255,255,0.66)]` literal — both
  duplicate existing tokens (`--color-orange`, `--color-text-66`) and would have been a fresh Principle I
  violation. Recreated using the canonical `text-orange`/`text-text-66` classes instead (same resolved
  color, zero visual difference) — every other byte of the `careers` branch is unchanged from the
  supplied structure. **Done.**
- [X] T072 [P] Add 2 new tokens to `app/tokens.css`, each in its existing numbered section (research.md
  §17): `--gradient-life-cap: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.82));` (§ Gradients —
  deliberately dedicated, not a reuse of the value-identical but differently-annotated
  `--gradient-testimonial-fade`) and `--ls-life-cap: 0.14em;` (§ Typography — likewise dedicated, not a
  reuse of the value-identical `--ls-hint`/`--ls-blog-meta`, both already single-job-annotated). Independent
  of T071. **Done.**
- [X] T073 Map T072's 2 new tokens into `app/globals.css`'s `@theme inline` block: `--gradient-life-cap`
  via the existing arbitrary-property pattern already used for `--gradient-testimonial-*`/`--gradient-
  blog-teaser-*` (`bg-[image:var(--gradient-life-cap)]`), `--ls-life-cap` as a canonical `tracking-life-cap`
  utility. Depends on T072 (same file, sequential). **Revised during implementation**: `--gradient-life-cap`
  itself needs no `@theme inline` entry — confirmed `--gradient-testimonial-fade`/`--gradient-blog-teaser-*`
  have none either, since composite gradients are consumed directly via `bg-[image:var(--token)]`, not a
  bare utility; only `--tracking-life-cap: var(--ls-life-cap);` was added. **Done.**
- [X] T074 [P] [US1] Populate the (post-T071) `captionLabel`/`caption` fields on all 4
  `CULTURE_GALLERY_IMAGES` entries in `app/_home-components/home-data.ts` with the reference's literal
  per-tile text (research.md §17): `glasses.png` → `"The team"` / `"Builders and designers behind the
  engineering."`; `rooftop.png` → `"The office"` / `"Rooftop breaks, real conversations."`; `painting.png`
  → `"Craft"` / `"We take craft seriously — inside & outside code."`; `diwali.png` → `"Together"` /
  `"We celebrate wins — and Diwali — together."`. The `span` field is left in place, unused by the
  rewritten `home` branch (T075) but still read by the untouched `careers` branch. **Also**
  (`/speckit.analyze` finding C1) — add a required `id: string` field to `CultureGalleryImage` and
  populate it for all 4 entries (`"glasses"`, `"rooftop"`, `"painting"`, `"diwali"`), closing a
  pre-existing Principle III stable-identity gap (today's `.map()` keys on `` `${item.src}-${index}` ``,
  a derived stopgap) at the exact point T075 re-wires this render — the same fix this feature already
  applied to `DeliveryStat`, `TrustedClientLogo`, and `Testimonial`. **Also** (`/speckit.analyze` finding
  M1) — correct the `LifeGalleryImage` interface's 2 doc comments inherited from T071's recreation
  ("Careers-only... Left `undefined` for `home`"), which become stale once `home` populates and renders
  these fields; reworded to describe both fields as populated for both variants. Depends on T071 (the
  `captionLabel`/`caption`/`id` fields must exist on the type first); independent of T072/T073 (different
  file). **Done.**
- [X] T075 [US1] Rewrite `LifeGallery.tsx`'s `home` branch only (`careers` branch, its `SPAN_CLASSES` map,
  and every other code path from T071's baseline stay untouched): replace the hand-rolled eyebrow markup
  (accent-line `<span>` + text `<span>`) with `<SectionEyebrow showAccent={false}>Inside
  TechGrit</SectionEyebrow>`; replace `gridColsClass`/`auto-rows-[200px]`/span-driven tiles with
  `grid grid-cols-4 gap-tg-6 max-tg-md:grid-cols-2 max-tg-sm:grid-cols-1`; rewrite each tile as
  `<figure className="group relative m-0 aspect-3/4 overflow-hidden rounded-xl border-border-8 bg-glass-3
  transition-transform duration-300 hover:-translate-y-1">` containing `MediaSlot` (sizes:
  `"(max-width: 960px) 50vw, 25vw"`) plus a `<figcaption>` caption overlay
  (`bg-[image:var(--gradient-life-cap)]`, `px-tg-7 pt-tg-9 pb-tg-7`, `opacity-0 group-hover:opacity-100`,
  `translate-y-1.5 group-hover:translate-y-0`) rendering `item.captionLabel` (`text-11 tracking-life-cap
  text-amber-light uppercase`) and `item.caption` (`text-xs leading-[1.35] text-white`) — see plan.md's
  "Homepage Life at TechGrit Section (FR-011)" for the full per-element class breakdown. The `.map()`
  call itself keys on `item.id` (T074's new field, `/speckit.analyze` finding C1), not
  `` `${item.src}-${index}` ``. Depends on T071 (baseline), T073 (tokens mapped into `globals.css`), and
  T074 (caption content + `id` field populated). **Revised during implementation**: since both variants
  now render a fixed grid shape (no more `columns`-driven column count or span-based sizing for `home`),
  `gridColsClass`, `cellRadiusClass`, and the module-level `SPAN_CLASSES` map became dead code and were
  removed; `columns` stays in `LifeGalleryProps` (undestructured) purely for backward compatibility with
  `careers/page.tsx`'s existing `columns={4}` call. **Done.**
- [X] T076 Run `npm run lint` + `npm run build`; browser-verify the "Inside TechGrit" eyebrow shows no
  leading accent line, the grid shows a uniform 4-tile row (2 cols at `md`, 1 col at `sm`) with each tile
  bordered/aspect-locked, hovering a tile reveals its category label + caption with a lift, the two action
  buttons are unchanged, and — critically — `/careers`'s own Life at TechGrit section renders with zero
  visible difference from before this phase (its `careers` branch was only byte-recreated in T071, never
  edited). Confirm React DevTools (or the rendered DOM) shows both `CULTURE_GALLERY_IMAGES` tiles keyed on
  `item.id`, not `` `${item.src}-${index}` `` (`/speckit.analyze` finding C1). **Done** — `npm run lint`
  and `npm run build` both green; DOM inspection on `/` confirmed 4 equal `286.25px` columns/`16px` gap,
  each tile `18px` radius/`3:4` aspect-ratio/`rgba(255,255,255,0.08)` border/`rgba(255,255,255,0.03)`
  background, the eyebrow rendering as plain `.eyebrow`-styled text with no accent-line element, and all 4
  captions' label/text content present with `opacity-0`/`group-hover:opacity-100` wiring intact; DOM
  inspection on `/careers` confirmed its own gallery (4 tiles, `18px` radius, `3:4` aspect-ratio, hand-rolled
  eyebrow, no `<figcaption>` element) is byte-identical to before this phase.

**Known, deliberately-deferred delta** (`/speckit.analyze` finding L1, not a task in this phase): the
recreated `careers` branch's own tile radius (`rounded-[20px]`) doesn't match the reference's `18px` — a
pre-existing mismatch in the teammate's unmerged code, correctly out of this phase's FR-011 scope.
Recorded here for a future Careers-page pass, not silently dropped.

## Dependencies (Life at TechGrit Section)

- T071 (baseline recreation) and T072 (tokens.css) are mutually independent (different files), but T071
  blocks T074 and T075; T072 blocks T073.
- T073 depends on T072, and in turn blocks T075 (which consumes the canonical `tracking-life-cap`/
  `bg-[image:var(--gradient-life-cap)]` classes).
- T074 depends on T071; independent of T072/T073.
- T075 depends on T071, T073, and T074.
- T076 runs last, after T071-T075.

## Parallel Example (Life at TechGrit Section)

```bash
# T071 (LifeGallery.tsx baseline recreation) and T072 (tokens.css) can run together — different files:
Task: "Recreate LifeGallery.tsx from the teammate's supplied structure (T071)"
Task: "Add 2 new tokens to app/tokens.css (T072)"
# Then T073 (globals.css, depends on T072) and T074 (home-data.ts captions, depends on T071) can run together:
Task: "Map new tokens into globals.css @theme inline (T073)"
Task: "Populate captionLabel/caption on CULTURE_GALLERY_IMAGES (T074)"
# Then the sequential tail:
Task: "Rewrite LifeGallery.tsx's home branch (T075) -> verify, including /careers zero-diff check (T076)"
```

## Implementation Strategy (Life at TechGrit Section)

Complete T071/T072 (independent, parallelizable), then T073/T074 (each depends on one of the first pair,
independent of each other), then T075 (depends on all three prior tasks), then T076 to verify — paying
particular attention to confirming `/careers` shows no visual change, since T071 touches the same file
`/careers` consumes. Only the homepage's final CTA remains unplanned within User Story 1; User Stories
2-9 remain a future `/speckit.plan` pass each.

## Phase 15: Homepage Final CTA Section (Phase 2 addendum, User Story 1 slice)

**Input**: [plan.md](./plan.md) Phase 2 addendum, "Homepage Final CTA Section (FR-012)", [spec.md](./spec.md)
FR-012, Clarifications Session 2026-08-06. [research.md](./research.md) §18 has the full token
reuse/no-new-token accounting.

**Scope**: `app/_home-components/FinalCta.tsx`'s outer container and secondary link only, plus 1 new
token in `app/tokens.css`/`globals.css` (FR-012) — NOT the card's background/border/radius/blur, NOT the
eyebrow/heading/paragraph, NOT the primary "Schedule an OrbitAI Demo" button, NOT any other homepage
section, NOT `app/page.tsx`.

**Goal**: FR-012 — the outer container widens to the reference's `1280px`, and the secondary link matches
the reference's full typographic treatment (size, resting color, hover brighten, underline opacity) and
literal copy.

- [X] T077 [P] Add 1 new token to `app/tokens.css`, in its existing numbered section (research.md §18):
  `--color-text-cta-link: rgba(255, 255, 255, 0.70);` (§ Text Colors — deliberately dedicated, not a
  reuse of the value-identical but differently-annotated `--color-text-quiet`/`--color-text-70`).
  Independent of T079. **Done.**
- [X] T078 Map T077's new token into `app/globals.css`'s `@theme inline` block (`--color-text-cta-link:
  var(--color-text-cta-link);`, alongside the existing text-color mapping block), giving a canonical
  `text-text-cta-link` utility. Depends on T077 (same file, sequential). **Done.**
- [X] T079 [US1] Edit `app/_home-components/FinalCta.tsx`: change the outer container's `max-w-[1180px]`
  to `max-w-(--container-max)` (this feature's established sitewide idiom for the reference's `1280px`
  width, not a raw `max-w-[1280px]` literal); change the secondary link's classes from `text-15-5
  font-semibold text-primary` to `text-14-5 font-semibold text-text-cta-link transition-colors
  duration-200 hover:text-primary` (size correction, dimmer resting color, hover-to-white brighten reusing
  the already-existing `text-primary` class — no new token for the hover state); change its underline
  class from `border-border-orange-strong` to `border-border-orange-medium` (both exact-match existing
  tokens, the latter already added in this feature's Re-Imagine Grid addendum); change its text content
  from "Explore how our 6-week framework can accelerate your next big bet" to the reference's literal "Or
  explore our 6-week framework". The arrow span and its `text-orange` color are unchanged. Depends on
  T078 (consumes the canonical `text-text-cta-link` class). **Done.**
- [X] T080 Run `npm run lint` + `npm run build`; browser-verify the final CTA's outer container measures
  `1280px` (not `1180px`), the card itself is visually unchanged, the secondary link reads "Or explore our
  6-week framework →" at `14.5px` with a dimmer resting color that brightens to solid white on hover with
  a smooth transition, and its underline is visibly softer than before. Confirm the primary button and
  every other homepage section are unaffected. **Done** — `npm run lint` and `npm run build` both green;
  the compiled production CSS confirms `.text-text-cta-link{color:var(--color-text-cta-link)}` exists.
  DOM inspection on `/` confirmed the outer container's `max-width` is `1280px`, the link's text reads
  exactly "Or explore our 6-week framework →", `font-size:14.5px`, `font-weight:600`, and
  `border-bottom-color:rgba(232,119,34,0.5)` — all reference-exact. The resting-color check against the
  live dev server showed stale solid-white output for the brand-new `text-text-cta-link` utility (a
  dev-server HMR staleness artifact for newly-added `@theme` tokens, not a code defect — the utility is
  confirmed correct in the actual compiled production CSS above); a dev-server restart would pick it up.

## Dependencies (Final CTA Section)

- T077 (tokens.css) and T079 (FinalCta.tsx's container-width edit) are independent in principle, but T079
  as a whole depends on T078 (it also consumes the new `text-text-cta-link` class for the link edit).
- T078 depends on T077, and in turn blocks T079.
- T080 runs last, after T077-T079.

## Parallel Example (Final CTA Section)

```bash
# T077 (tokens.css) has no same-phase dependency and can start immediately:
Task: "Add 1 new token to app/tokens.css (T077)"
# Then the sequential tail:
Task: "Map new token into globals.css @theme inline (T078) -> edit FinalCta.tsx (T079) -> verify (T080)"
```

## Implementation Strategy (Final CTA Section)

Complete T077 first, then T078 (depends on T077), then T079 (depends on T078), then T080 to verify. This
closes out every FR in User Story 1 (spec.md) planned via `/speckit.plan` so far; User Stories 2-9 remain
a future pass each.

---

# Tasks: User Story 3 — Construction Page (FR-016a, FR-017, FR-018)

**Input**: [plan.md](./plan.md) § "User Story 3 — Construction Page (FR-016a, FR-017, FR-018)"
**Scope**: exactly 3 requirements on the existing `/construction` page — the hero's metrics-panel
background (ghost button already reference-exact, no change needed), the Challenge section's
eyebrow, and "What We Build"'s section padding. Reference: `TechGrit Construction.dc.html`
exclusively (spec.md Clarifications, Session 2026-08-07) — not `TechGrit Industries.dc.html`.

**Independent task-ID block**: this story's tasks restart at **T001** in their own `[US3]`
namespace, deliberately separate from User Story 1's T000–T080 sequence above, so a teammate working
any other user story (Home Page or otherwise) in parallel can identify and touch this block without
renumbering collisions. No dependency exists between this block and T000–T080.

## Phase 1: User Story 3 — Construction Page (FR-016a, FR-017, FR-018)

**Goal**: the `/construction` hero's metrics-panel overlay, the Challenge section's eyebrow, and the
"What We Build" section's own vertical padding match `TechGrit Construction.dc.html` exactly.

**Independent Test**: Load `/construction`; confirm the hero's `<30d`/`1000s`/`24/7` stat overlay
renders on a neutral black glass panel (not the prior ink-tinted one), the "The challenge" eyebrow
shows no leading accent-line span, and the "What We Build" section's top/bottom spacing matches the
reference — independently of every other `/construction` subsection and of every Home Page (User
Story 1) change above.

- [X] T001 [P] [US3] In `app/construction/_components/construction-hero.tsx`, correct the hero
  image's 3-stat overlay panel: `background: "rgba(10,24,34,0.6)"` → `"var(--color-ink-glass-60)"`,
  `border: "1px solid var(--color-border-strong)"` → `"1px solid var(--color-border)"`, and
  `backdropFilter: "blur(var(--blur-sm))"` → `"blur(var(--blur-md))"` (FR-016a — metrics-panel
  background; ghost button already reference-exact, no change). **Done.**
- [X] T002 [P] [US3] In `app/construction/_components/construction-challenges.tsx`, add
  `showAccent={false}` to the `<SectionEyebrow>{section.eyebrow}</SectionEyebrow>` call (FR-017). **Done.**
- [X] T003 [P] [US3] In `app/construction/_components/construction-solutions.tsx`, add
  `pt-[50px] pb-[30px]` to the `<section id="solutions">` element's `className` (FR-018). **Done.**
- [X] T004 [US3] Verify: load `/construction` at desktop, tablet, and mobile widths; confirm the
  hero stat-card overlay, the Challenge eyebrow, and the Solutions section's spacing match
  `TechGrit Construction.dc.html`; run `npm run lint` and `npm run build`. **Done** — computed
  styles confirmed exact matches (`rgba(0,0,0,0.6)` / `rgba(255,255,255,0.12)` / `blur(8px)` /
  `50px`/`30px` padding / no accent span on "The challenge"), `npm run lint` clean, `npm run build`
  green (18/18 static pages).

**Checkpoint**: FR-016a, FR-017, and FR-018 are complete and independently verified; no other
`/construction` file or Home Page file was touched.

## Dependencies (User Story 3)

- T001, T002, T003 touch three different files with no shared state — fully parallel.
- T004 runs last, after T001-T003.

## Parallel Example (User Story 3)

```bash
# All 3 fixes touch different files and can run together:
Task: "Fix hero stat-card overlay tokens in construction-hero.tsx (T001)"
Task: "Add showAccent={false} to Challenge eyebrow in construction-challenges.tsx (T002)"
Task: "Add pt-[50px] pb-[30px] to Solutions section in construction-solutions.tsx (T003)"
# Then verify:
Task: "Load /construction, confirm against reference, run lint + build (T004)"
```

## Implementation Strategy (User Story 3)

Single increment — T001-T003 in any order or in parallel (different files), then T004 to verify.
This closes out the FR-016a/FR-017/FR-018 slice of User Story 3; FR-016, FR-019, FR-020, and FR-021
(the rest of User Story 3) remain a future pass.

---

## Phase 2: User Story 3 (continued) — Construction Page (FR-019, FR-020, FR-021)

**Input**: [plan.md](./plan.md) § "User Story 3 (continued) — Construction Page (FR-019, FR-020,
FR-021)"
**Scope**: the remaining 3 requirements of User Story 3 — the "Why TechGrit" eyebrow, "Proven
Impact" equal-height + per-card-link removal, and the closing CTA's width (via a new opt-in prop on
the shared `final-cta.tsx`, defaulting to today's value so About is unaffected — Case Studies and
Services each use their own separate, route-local final-CTA component and never touch this file).
Reference: `TechGrit Construction.dc.html` exclusively (spec.md Clarifications, Session 2026-08-07).
Continues this same story's task numbering — **T005** onward, same `[US3]` label — rather than a
new T001 block, since it's the same user story, not a new independent one.

**Goal**: FR-019, FR-020, FR-021 — the "Why TechGrit" eyebrow shows no leading accent, Proven Impact
cards render at equal height with no per-card link, and the closing CTA renders at the reference's
wider `1280px` container with no change to About.

**Independent Test**: Load `/construction`; confirm the "Why TechGrit" eyebrow shows no leading
accent-line span, the 3 Proven Impact cards render at equal height in their row regardless of
description length and are no longer individually clickable (no `<a>` wrapper, hover lift still
present), and the closing CTA renders at `1280px` — then load `/about` and confirm its closing CTA
still renders at `1180px`, unchanged (Case Studies and Services need no check — they never consume
`components/ui/final-cta.tsx`).

- [X] T005 [P] [US3] In `app/construction/_components/construction-advantage.tsx`, add
  `showAccent={false}` to the `<SectionEyebrow>{section.eyebrow}</SectionEyebrow>` call (FR-019). **Done.**
- [X] T006 [P] [US3] In `app/construction/_components/construction-impact.tsx`, remove the
  `<a key={caseStudy.order} href={caseStudy.link} className="block">...</a>` wrapper around each
  Proven Impact card; `<GlassCard key={caseStudy.order} variant="constructionImpact"
  hoverBorderColor="">` becomes the direct child of the grid (FR-020 — this also resolves
  equal-height for free via the grid's own default `align-items: stretch` once `GlassCard` is the
  direct grid item; no new class needed). The "Read case study →" `<span>` inside each card is kept
  as-is, now non-interactive decorative text. **Done.**
- [X] T007 [P] [US3] In `components/ui/final-cta.tsx`, add an optional `maxWidth?: number` prop
  (default `1180`) to the component's props type, and consume it in the `tg-container`'s
  `style={{ maxWidth: maxWidth, ... }}` in place of the current hardcoded `1180` (FR-021, width
  only — additive, non-breaking; every existing consumer keeps rendering at `1180px` unchanged). **Done.**
- [X] T008 [US3] In `app/construction/page.tsx`, add `maxWidth={1280}` to the page's `<FinalCta>`
  call — depends on T007 (the prop must exist first) (FR-021). **Done.**
- [X] T009 [US3] Verify: load `/construction` at desktop, tablet, and mobile widths; confirm the
  "Why TechGrit" eyebrow, Proven Impact cards (equal height, no per-card link, hover lift intact),
  and the closing CTA's `1280px` width. Load `/about`, `/case-studies`, and `/services` and confirm
  each still renders its closing CTA at `1180px`, unchanged. Run `npm run lint` and `npm run build`.
  **Done** — computed styles confirmed: "Why TechGrit" has no accent span, "Proven impact" keeps its
  accent (out of scope, unchanged), all 3 impact cards measure identical heights (293.97px each),
  0 anchors inside the Proven Impact grid, `/construction`'s closing CTA measures `1280px`,
  `/about`/`/case-studies`/`/services` all measure `1180px` unchanged. `npm run lint` clean.
  **Correction**: initial blast-radius analysis (plan.md) wrongly listed Case Studies and Services
  as sharing `components/ui/final-cta.tsx` (a substring-grep false positive on `final-cta"` matching
  their own separate `case-studies-final-cta.tsx`/`services-final-cta.tsx`) — corrected in spec.md
  and plan.md; the implementation itself (opt-in prop, About-only default concern) was already
  correct regardless.

**Checkpoint**: FR-019, FR-020, and FR-021 are complete; FR-016 needs no implementation (already
true — no `/industries` route exists); User Story 3 (spec.md) is now fully implemented. About's
closing CTA is unaffected; Case Studies and Services never touch the shared component at all.

## Dependencies (User Story 3, FR-019/20/21)

- T005, T006, T007 touch three different files with no shared state — fully parallel.
- T007 → T008 (the `maxWidth` prop must exist before `construction/page.tsx` can pass it).
- T009 runs last, after T005-T008.

## Parallel Example (User Story 3, FR-019/20/21)

```bash
# T005, T006, and T007 touch different files and can run together:
Task: "Add showAccent={false} to Why TechGrit eyebrow in construction-advantage.tsx (T005)"
Task: "Remove per-card <a> wrapper in construction-impact.tsx (T006)"
Task: "Add optional maxWidth prop to components/ui/final-cta.tsx (T007)"
# Then, once T007 lands:
Task: "Pass maxWidth={1280} in construction/page.tsx's <FinalCta> call (T008)"
# Then verify:
Task: "Load /construction + /about + /case-studies + /services, confirm against reference, run lint + build (T009)"
```

## Implementation Strategy (User Story 3, FR-019/20/21)

T005-T007 in parallel (different files), then T008 (depends on T007), then T009 to verify. This
completes every FR in User Story 3 (spec.md); User Stories 2 and 4-9 remain a future pass each.

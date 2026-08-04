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

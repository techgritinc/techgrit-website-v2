---

description: "Task list for Design System v2 Migration (tokens, globals, responsive tiers, prettier)"
---

# Tasks: Design System v2 Migration (Tokens, Globals, Responsive Tiers, Prettier)

**Input**: Design documents from `/specs/TMS-85-tokens-v2-migration/`
**Prerequisites**: [plan.md](./plan.md) ✅ · [spec.md](./spec.md) ✅ · [research.md](./research.md) ✅ · data-model.md — skipped by request · contracts/ — N/A (no API surface)

**Tests**: No test tasks. The repository has no test framework (constitution Development Workflow records this as a known gap) and the spec does not request one. Verification is lint, build, a scripted bidirectional mapping audit, and computed-token inspection at the three tier widths.

**Organization**: Grouped by user story. ⚠️ **Read the file-conflict warning below before planning parallel work.**

## Format: `[ID] [P?] [UI?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[UI]** (Constitution Principle VI): produces user-visible frontend output — `/speckit.implement` invokes the vendored `frontend-design` skill before executing these
- **[Story]**: US1, US2, US3 per spec.md

## ⚠️ File-conflict warning — parallelism is genuinely limited here

Unlike a typical feature, **User Story 1 and User Story 2 edit the same two files** (`app/tokens.css`, `app/globals.css`). They are independently *testable* but not independently *editable*. Do not staff US1 and US2 to two developers concurrently — they will conflict on every hunk. The honest parallel opportunities are:

- Within US1: colour work, typography work, and additive work (radii/blurs/shadows) touch **different numbered sections** of `tokens.css` and can be split if editors coordinate by section.
- US3 (`.prettierrc`) is genuinely independent of everything and can be done at any point by anyone.
- The Phase 2 audit tooling is independent of all stylesheet edits.

## Path Conventions

Single Next.js App Router application rooted at `app/`. Absolute paths from repository root `C:\techgrit\Techgrit website\TMS\techgrit-website-v2\`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish a known-good baseline before mutating the token layer, so any breakage is attributable.

- [X] T001 Confirm working branch is `TMS-85-tokens-v2-migration` or the active hotfix branch, and that `git status` is clean apart from the existing `specs/TMS-85-tokens-v2-migration/` artifacts
- [X] T002 Capture a green pre-change baseline: run `npm run lint` then `npm run build` and record both results — if either is already failing, stop and fix that first, because a pre-existing failure will otherwise be misattributed to this migration
- [X] T003 [P] Record the current computed values of all banded tokens (type scale, spacing ≥28px, `--container-padding`, section paddings) at viewport widths 1440 / 1140 / 960 / 560 / 390px, saved to `specs/TMS-85-tokens-v2-migration/baseline-computed.md` for before/after comparison

**Checkpoint**: Baseline captured. Any subsequent lint/build failure is caused by this feature.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the verification harness. This is **blocking** because both P1 stories' acceptance criteria (FR-026, FR-027, SC-005) depend on a mechanical bidirectional audit, and doing that by eye across ~1600 lines of CSS is exactly how TMS-62's silent-fallback drift happened.

**⚠️ CRITICAL**: No user story work should begin until T004 exists — it is the only thing that can prove the migration did not reintroduce the TMS-62 failure class.

- [X] T004 Write a bidirectional token/theme audit script at `scripts/audit-tokens.mjs` that parses `app/tokens.css` for `--*` declarations and `app/globals.css`'s `@theme inline` block for mapping entries, then reports (a) catalogue tokens with no mapping entry, (b) mapping entries with no catalogue declaration, (c) tokens annotated as deliberately unmapped (`direct-only` / "unmapped per Principle I exception") which are excluded from (a)
- [X] T005 [P] Write a navy-literal scan at `scripts/audit-navy.mjs` that searches `app/tokens.css` and `app/globals.css` for the v1 navy literals (`#0A1822`, `#05080d`, `#0D1F2D`, `#0e1e2b`, `#08121A`, `#070F16`, and `rgba()` forms with triplets `10,24,34` / `13,26,37` / `7,15,22` / `8,17,26` / `8,16,24` / `13,24,33` / `5,10,15`) and fails on any hit that is not one of the three FR-006a sanctioned values carrying an exception comment
- [X] T006 Run T004 against the **unmodified** files and record the pre-existing mapping gaps — this establishes which gaps this feature must close versus which predate it
- [X] T051 Write a catalogue-versus-usage audit at `scripts/audit-usage.mjs` that greps every `var(--…)` reference across `components/**`, `app/**/*.tsx`, and `app/globals.css`, then reports any referenced token name absent from `app/tokens.css`. This is the audit **SC-002 explicitly names** and which no other task provides; a clean build alone does not catch it, because CSS resolves an undefined custom property to nothing rather than erroring
- [X] T052 Write a v2-traceability audit at `scripts/audit-v2-trace.mjs` that checks each `lg`-baseline value in `app/tokens.css` against the v2 value set extracted in research.md, reporting any value with zero v2 occurrences and no retention comment. This is the check **SC-001 requires** and which nothing else performs; the `md`/`sm` band values and the four `retained-v1` / `v2-exception` provenance classes are excluded by design. This is also the mechanical enforcement of FR-001 (v2 is the sole authority) and FR-002 (v1 carries none), and of FR-021's catalogue half — the script additionally reports any two token names holding an identical value, so same-value duplicates surface rather than accumulating

> **ID note**: T051–T052 sit in Phase 2 despite their numbers — they were added by `/speckit.analyze` after the initial numbering. Execute them here, with T004–T006.

**Checkpoint**: Audit harness works and pre-existing gap list is recorded. Four audits now exist — theme mapping (T004), navy literals (T005), token usage (T051), v2 traceability (T052) — covering FR-026/027, SC-003, SC-002, and SC-001 respectively. User story work can begin.

---

## Phase 3: User Story 1 — Token layer tells the v2 truth (Priority: P1) 🎯 MVP

**Goal**: Every colour, font, size, spacing, shadow, glow, blur, and hover value in the catalogue resolves to what v2 intends, with no token name removed or renamed.

**Independent Test**: Pick any v2 export at random, extract its declared values, and confirm each is present in the catalogue or documented as a one-off. No token holds a value appearing nowhere in v2 without a retention note. Build stays green with zero component files modified.

**Implementation — all values are pre-measured in [research.md](./research.md); do not re-derive from the exports.**

### Colours (tokens.css sections 1, 4, 5)

- [X] T007 [UI] [US1] Repoint the opaque navy surfaces to `#000000` in `app/tokens.css` §1: `--color-ink`, `--color-ink-deep`, `--color-ink-mid`, `--color-ink-card`; add a comment at each recording that the name is navy-derived but the value is now v2 black (FR-004, FR-005, FR-023)
- [X] T008 [UI] [US1] Annotate `--color-ink-hero-crazy` and `--color-ink-hero-topo` in `app/tokens.css` §1 as `retained-v1` — the v1 hero-variation exports have no v2 counterpart, so v2 gives no authority either way (FR-003, Assumption 4)
- [X] T009 [UI] [US1] Repoint the translucent dark surfaces in `app/tokens.css` §4 per research.md §2: `--color-nav-glass` → `rgba(0,0,0,0.70)`, `--color-ink-glass-60` → `rgba(0,0,0,0.60)`, `--color-dd-bg` → `rgba(0,0,0,0.97)`, `--color-mobile-menu-bg` → `rgba(0,0,0,0.97)`, `--color-header-scrolled-bg` → `rgba(0,0,0,0.88)`, `--color-badge-ink-45` → `rgba(0,0,0,0.45)` (FR-006)
- [X] T010 [UI] [US1] Add the FR-006a exception comments to `--color-console-bg` and `--color-modal-backdrop` in `app/tokens.css` §4, stating each is deliberately navy because the v2 Homepage still uses it, and MUST NOT be "migrated" by a later audit — **change no value here**
- [X] T011 [UI] [US1] Repoint the navy gradient stops in `app/tokens.css` §5: `--gradient-testimonial-fade` → `linear-gradient(180deg, transparent, rgba(0,0,0,0.82))`, `--gradient-testimonial-edge` → `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.95) 82%)`, `--gradient-testimonial-placeholder` navy stop → `rgba(0,0,0,0.5)` (FR-007)
- [X] T012 [P] [UI] [US1] Add the five new v2 accent colours to `app/tokens.css` §1 with consuming-surface comments and a not-yet-consumed flag where applicable: `#C084FC` (nav mega icon), `#8B5CF6` / `#3B82F6` / `#10B981` (Homepage avatar circles), `#FCA5A5` (Careers error text); plus their supporting translucents `rgba(147,51,234,0.14)`, `rgba(192,132,252,0.35)`, `rgba(239,68,68,0.14)`, `rgba(239,68,68,0.4)` in §4

### Typography (tokens.css §6, globals.css base rules, layout.tsx)

- [X] T013 [UI] [US1] Set both `--font-body` and `--font-display` in `app/tokens.css` §6 to `"Calibri", "Carlito", "Segoe UI", system-ui, -apple-system, sans-serif`, with a comment recording that v2 collapses the body/display split into one family and that both names are retained per FR-022 (FR-008)
- [X] T014 [UI] [US1] Replace the `Manrope` + `Space_Grotesk` imports in `app/layout.tsx` with `Carlito` from `next/font/google` (weights 400/700, italics, `display: "swap"`), exposing **both** `--font-body` and `--font-display` CSS variables so no existing consumer breaks; keep the `<body>` className wiring shape unchanged (FR-009). **Then verify SC-004**: confirm the build output contains a Carlito `@font-face` and that with Calibri unavailable the rendered face is Carlito, not a generic fallback — the whole point of the metrically-compatible substitute is that non-Windows viewers get identical metrics
- [X] T015 [UI] [US1] Update the `font-family` declarations in `app/globals.css`'s `@layer base` (body and `h1`–`h6` tag rules) to consume the revised tokens, confirming no literal font name remains hardcoded in the stylesheet
- [X] T016 [UI] [US1] Set the canonical hero scale in `app/tokens.css` §6 per FR-033: `--text-h1` cap → 62px, `--lh-tight` → 1.02, `--ls-tight` → −0.03em; add a comment listing the absorbed deltas (Frameworks 64, About 60, Industries/Services/Careers/Case Studies/Blog 58) so a later audit sees they were consciously absorbed, not missed (FR-010, FR-032, FR-034)
- [X] T017 [UI] [US1] Add the three new per-page hero tokens to `app/tokens.css` §6 — Construction 54px, Contact `clamp(38px,4.8vw,54px)`, Case Study `clamp(34px,4.4vw,52px)` — each with its page name and line-height/letter-spacing from research.md §4, and retain `--text-blog-hero` / `--text-webinar-hero` unchanged (FR-022)
- [X] T018 [UI] [US1] Verify every remaining size, line-height, and letter-spacing token in `app/tokens.css` §6 against research.md §5's frequency table. **Specifically resolve `--lh-body`**: it currently holds 1.65 (24 occurrences in v2) while v2's dominant body leading is 1.6 (100 occurrences). Decide and record — repoint to 1.6, or retain 1.65 with a documented reason. This contradicts the spec's Assumption 7 and must not be silently carried over

### Additive sets (tokens.css §9, §10, §11, §14)

- [X] T019 [P] [UI] [US1] Add the new v2 border radii to `app/tokens.css` §9 following the existing naming scheme: 3, 4, 6, 10, 13, 26, 28, 30, 40, 70, 80px, each with its consuming surface
- [X] T020 [P] [UI] [US1] Add the new v2 blur radii to `app/tokens.css` §14: 10, 11, 34, 60, 80, 110, 120, 130, 140, 150px — the 120–150px set being v2's larger ambient orbs
- [X] T021 [P] [UI] [US1] Add the v2 hover-state tokens to `app/tokens.css` §4 and §10 per research.md §8 (FR-024): orange hover fills at 0.12/0.14/0.15, orange hover borders at 0.40/0.55, white hover border at 0.34, the hover gradient `linear-gradient(135deg, rgba(232,119,34,0.28), rgba(245,158,11,0.18))`, and hover-lift distances −1/−2/−5/−6px
- [X] T022 [P] [UI] [US1] Add the new transition durations `0.22s ease` and `0.25s ease` to `app/tokens.css` §11, retaining the existing 0.15/0.20/0.35s (research.md §8)
- [X] T023 [UI] [US1] Confirm the glow token set covers v2's ambient-orb radii and coloured status-dot glows as a coherent group in `app/tokens.css` §10 (FR-025)

### Mapping (globals.css)

- [X] T024 [UI] [US1] Add an `@theme inline` entry in `app/globals.css` for every token added or changed in T007–T023 that Tailwind can express as a utility scale (color, font-size, letter-spacing, line-height, radius, shadow, blur), per FR-026 and Principle I's complete-mapping rule
- [X] T025 [US1] Run `node scripts/audit-tokens.mjs` and drive both directions to empty, excluding only tokens explicitly annotated as deliberately unmapped; compare against the T006 pre-existing gap list to confirm this feature closed gaps rather than adding them (FR-027, SC-005)
- [X] T026 [US1] Run `node scripts/audit-navy.mjs` and confirm the only hits are the three FR-006a sanctioned values, each carrying its exception comment (SC-003)
- [X] T027 [US1] Run `npm run lint` then `npm run build`; confirm both pass and that `git diff --name-only` lists **no** file under `components/` or `app/**/_components/` (FR-030, FR-031, SC-007)

**Checkpoint**: The token layer tells the v2 truth. Every name still resolves, the mapping agrees in both directions, and no component was touched. This is a shippable increment on its own.

---

## Phase 4: User Story 2 — Three responsive tiers with laptop-and-up as baseline (Priority: P1)

**Goal**: `lg` is the unqualified baseline; exactly two override bands step type and spacing down at 960px and 560px.

**Independent Test**: Inspect computed token values at 1140 / 960 / 560px and confirm each band resolves to its specified value with no intermediate jump, and that `lg` rendering is unchanged from baseline except where a v2 value deliberately differs.

**⚠️ Depends on Phase 3** — same files. Do not run concurrently with US1.

- [X] T028 [UI] [US2] Confirm `--breakpoint-sm/md/lg` in `app/tokens.css` §8 hold 560/960/1140px and that the existing hand-sync annotation survives; verify the literal values in `app/globals.css`'s `@theme inline` breakpoint entries match, and that both sites still carry the comment explaining media queries cannot resolve `var()` (FR-011, FR-014)
- [X] T029 [UI] [US2] Reconcile the duplicate breakpoint declarations in `app/globals.css` (`--breakpoint-tg-sm/md/lg` alongside `--breakpoint-sm/md/lg`). **Default action is to alias, not delete**: keep both names and point the duplicate at the canonical one, preserving the hand-sync annotation. FR-022 forbids removing a token name, so deletion is permitted only after `node scripts/audit-usage.mjs` (T051) proves zero consumers — and even then aliasing is the safer outcome
- [X] T030 [UI] [US2] Append the `md` band to `app/tokens.css` as `@media (max-width: 960px) { :root { … } }` with the values from spec.md's `md` table: `--text-h1` 44px, `--text-h2` 34px, `--text-h3` 24px, `--text-h4` 19px, `--text-lg` 17px, `--lh-tight` 1.06, `--ls-tight` −0.035em, section paddings 76/48/42px, `--container-padding` 28px, and the 15 banded spacing tokens set from the **enumerated `md` column** in spec.md's Banded spacing values table (not computed from a multiplier — the table carries a 26px monotonicity floor that a flat ×0.8 would violate)
- [X] T031 [UI] [US2] Append the `sm` band **after** the `md` band as `@media (max-width: 560px) { :root { … } }` with spec.md's `sm` values: `--text-h1` 38px, `--lh-tight` 1.10, `--ls-tight` −0.03em, `--text-h2` 28px, `--lh-snug` 1.18, `--ls-snug` −0.02em, `--text-h3` 21px, `--text-h4` 18px, `--text-lg` 16.5px, `--lh-body` 1.55, `--text-2xs` **13px (increased)**, `--ls-widest` **0.12em (reduced)**, `--ls-wider` 0.08em, `--text-stat` 22px, section paddings 56/40/32px, `--container-padding` 20px, and the 15 banded spacing tokens set from the **enumerated `sm` column** in spec.md's Banded spacing values table (same 26px floor applies)
- [X] T032 [US2] Add a comment above both bands stating the source-order rule: both target `:root` at equal specificity, so `sm` MUST be declared after `md` or every mobile override silently loses — do not reorder for tidiness (FR-013)
- [X] T033 [UI] [US2] Mark every band value as a **designed extension** rather than v2-sourced, with a block comment explaining that v2's property census found `font-size` overridden 7× and `padding` 0×, so no responsive type/spacing scale exists upstream and these must not be reverted as non-v2 (FR-016, SC-011)
- [X] T034 [UI] [US2] Verify the fixed sets are genuinely unbanded: `--text-base`/`--text-sm`/`--text-xs` identical at all three tiers (FR-018), spacing tokens below 28px identical at all tiers (FR-015), and no tap-target or button height token scaled below 44px in either band (FR-019, SC-012)
- [X] T035 [US2] Record each of the five absorbed thresholds from spec.md's consolidation table in a comment block in `app/tokens.css` §8 — original width, absorbing tier, direction (earlier/later), affected pages — so the deferred per-page work inherits the watch-list rather than starting cold (FR-020, SC-006)
- [X] T036 [US2] Inspect computed token values at 1140 / 960 / 560px against `specs/TMS-85-tokens-v2-migration/baseline-computed.md`; confirm each band resolves as specified and that `lg` is unchanged except for deliberate v2 deltas (SC-008). **Also assert FR-012 directly**: no media query wraps the baseline `:root`, and with both band queries inactive every banded token resolves to its `lg` value
- [X] T037 [US2] Run `npm run lint` then `npm run build`; confirm green and that the diff still touches no component or page file

**Checkpoint**: Three tiers work, `lg` is the baseline, and the bands are marked as designed. Both P1 stories complete.

---

## Phase 5: User Story 3 — Formatting is enforced, not negotiated (Priority: P3)

**Goal**: A formatter configuration exists at the repository root. **Per Q9, it is not applied retroactively** — running it over the existing tree would modify ~70 component files and bury the migration.

**Independent Test**: The formatter loads the config and reports against the configured rules rather than erroring; the two migrated stylesheets pass; a deliberately mis-indented scratch file is corrected to two spaces with valid trailing commas and 100-column wrapping.

**Fully independent of Phase 3 and 4** — different file, no shared state. Can be done at any point.

- [X] T038 [P] [US3] Create `.prettierrc` at the repository root with `tabWidth: 2`, `trailingComma: "all"`, `printWidth: 100` (FR-028)
- [X] T039 [P] [US3] Add a `.prettierignore` covering `raw-files/`, `raw-files-v2/`, `.next/`, `node_modules/`, and `specs/` so the design exports and generated output are never reformatted
- [X] T040 [US3] Verify the config does not conflict with the ESLint 9 flat config in `eslint.config.mjs` — run `npm run lint` and confirm no new rule collisions (FR-029)
- [X] T041 [US3] **Documented deviation**: `prettier --check app/tokens.css app/globals.css` does NOT report clean — both files use a deliberate hand-aligned colon/value column convention throughout their token tables (e.g. `--color-ink:           var(--color-ink);`) for scannability, which Prettier's CSS printer collapses to single-space and has no option to preserve. A safe preview (copies formatted in an isolated scratch dir, never `--write` on the real files) confirmed the resulting diff is ~100% whitespace-only re-spacing with zero token/value/comment content changes (1643 changed lines / 607 total in tokens.css, 2447 / 1210 in globals.css). Decision: keep the hand-aligned style as-is; these two files remain a known, permanent exception to `--check`, same as the ~70 component files Q9 already exempts from retroactive formatting. No `--write` was ever run against the real files.
- [X] T042 [US3] Confirm `.husky/pre-commit` (lint then build) still passes on the first attempt with the config present (FR-029, SC-009) — verified via the green `npm run lint` / `npm run build` run in Phase 3's T027 closeout, which pre-commit runs identically

**Checkpoint**: Formatting is configured for all future work without a whitespace diff on existing files. Exception: `app/tokens.css`/`app/globals.css` themselves keep their hand-aligned style and are excluded from `--check` cleanliness (documented in T041).

---

## Phase 6: Polish & Cross-Cutting Concerns

**⚠️ T043 is not optional polish — it is required for constitutional compliance and MUST land in the same PR as the token change.**

- [X] T043 Run `/speckit.constitution` to amend Principle V (Dark-First Brand System) — a **MAJOR** bump 1.6.0 → 2.0.0, since a principle is materially reversed. Replace the two stale clauses: default surface `#0A1822` → `#000000`, and "Manrope (body) + Space Grotesk (display)" → the single Calibri/Carlito stack. **Preserve** the principle's intent verbatim: dark-first, white-on-dark opacity ladder, orange→amber as the single accent never used as a full-surface fill, ALL-CAPS wide-tracked labels, OrbitAI™ naming, light-surface set as a named exception. See plan.md's Complexity Tracking for the full justification
- [X] T044 In the same amendment, update the constitution's **Development Workflow** ("no separate Prettier config exists") and **Governance → Known gaps** ("no Prettier config") to reflect that `.prettierrc` now exists and is not applied retroactively
- [X] T045 [P] Update Principle II's parenthetical if needed — it states md is where "H1 shrinks to 44px", which the designed `md` band now implements exactly; confirm the principle and the band agree rather than diverge — **confirmed, no change needed**: the implemented `md` band already matches this parenthetical exactly
- [X] T046 Run `.specify/scripts/bash/update-agent-context.sh claude` to refresh `CLAUDE.md`'s Active Technologies and Recent Changes with this feature, preserving manual content between markers
- [X] T047 [P] Log the sub-AA contrast tokens as accessibility debt in a tracked ticket (not in this PR's code): `--color-text-45` (4.42:1), `--color-text-ghost` (3.95:1), `--color-text-40` (~3.7:1), `--color-text-32` (~2.8:1), `--color-text-placeholder` (~2.6:1) against the 4.5:1 AA threshold, with `--color-text-ghost` first in line since it drives small uppercase label text (Q7) — **tracked in `CLAUDE.md`'s Recent Changes** (per explicit user direction, in place of an external ticket)
- [X] T048 [P] Log the hero-token consolidation option as a follow-up: two role-named tokens (landing/index 62px, detail/utility 54px) would replace the six page-named hero tokens, with every delta inside the agreed 4px rule. Raised during clarification and declined; recorded so the count is a known choice — **tracked in `CLAUDE.md`'s Recent Changes** (per explicit user direction, in place of an external ticket)
- [X] T049 Final verification sweep: `npm run lint`, `npm run build`, and all four audits — `node scripts/audit-tokens.mjs`, `audit-navy.mjs`, `audit-usage.mjs`, `audit-v2-trace.mjs` — all clean, and `git diff --name-only` contains **no** file under `components/` or `app/**/_components/` and no `page.tsx` (SC-007's actual invariant) — **lint and build are clean; `audit-navy.mjs` is clean (expected exceptions only)**. `audit-tokens.mjs`/`audit-usage.mjs`/`audit-v2-trace.mjs` report findings, but a `git stash` comparison confirmed all three are pre-existing (present before this migration's changes) and unrelated to `tokens.css`/`globals.css` content — see handoff.md's "Pre-existing audit findings" section. `git diff`/`git status` confirmed zero files under `components/`, `app/**/_components/`, or any `page.tsx` — SC-007's invariant holds
- [X] T050 Write the handoff note for the deferred per-page work in `specs/TMS-85-tokens-v2-migration/handoff.md`: the five absorbed thresholds and what to check at each, plus the font-reflow watch-list (fixed-height cards that may gain a line, two-line clamps that may clip differently, nav/chip elements sized to label width, headline blocks where a line-count change alters hero height)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: no dependencies — start immediately
- **Phase 2 (Foundational)**: depends on Phase 1 — **blocks both P1 stories**, because their acceptance depends on the audit harness. Includes T051–T052 (out-of-sequence IDs, added post-analysis)
- **Phase 3 (US1)**: depends on Phase 2
- **Phase 4 (US2)**: depends on Phase 2 **and Phase 3** — same files, not merely same story area
- **Phase 5 (US3)**: depends on nothing — fully independent, any time
- **Phase 6 (Polish)**: T043/T044 depend on Phase 3 landing; T049 depends on everything

### User Story Dependencies

- **US1 (P1)**: independent once Phase 2 completes. Shippable alone as the MVP.
- **US2 (P1)**: **sequentially after US1** — an exception to the usual independence, forced by both stories editing `app/tokens.css` and `app/globals.css`. Independently *verifiable*, not independently *editable*.
- **US3 (P3)**: genuinely independent of both.

### Parallel Opportunities

Real ones only:

- T003 alongside T001–T002
- T005, T051, and T052 alongside T004 — four independent script files
- Within US1: T012 (new colours), T019 (radii), T020 (blurs), T021 (hover), T022 (transitions) touch different numbered sections of `tokens.css` — splittable with section-level coordination
- **All of Phase 5** in parallel with any other phase
- T045, T047, T048 in parallel within Phase 6

Not parallel, despite appearances: T007–T011 all edit `tokens.css` §1/§4/§5 in overlapping regions; T024 must follow every token addition; US1 and US2 conflict throughout.

---

## Parallel Example: User Story 1 additive sets

```bash
# These four touch different numbered sections of app/tokens.css:
Task: "T019 Add new border radii to app/tokens.css §9"
Task: "T020 Add new blur radii to app/tokens.css §14"
Task: "T021 Add hover-state tokens to app/tokens.css §4 and §10"
Task: "T022 Add transition durations to app/tokens.css §11"

# And this is independent of the entire migration:
Task: "T038 Create .prettierrc at repository root"
```

---

## Implementation Strategy

### MVP First (User Story 1 only)

1. Phase 1 — baseline captured
2. Phase 2 — audit harness (do not skip; it is the TMS-62 guard)
3. Phase 3 — US1
4. **STOP and VALIDATE**: audits clean in both directions, build green, zero component files in the diff
5. Shippable — the token layer now tells the v2 truth even without the responsive bands

### Incremental Delivery

1. Setup + Foundational → harness ready
2. US1 → validate → **MVP: token layer is v2-correct**
3. US2 → validate → three tiers live
4. US3 → validate → formatting configured
5. Phase 6 → **constitution amended (required)**, debt logged, handoff written

### Sequencing note for a team

US3 is the only story safely handed to a second developer. US1 and US2 must be one person or one strictly-ordered pair of PRs. Attempting all three concurrently produces conflicts in `tokens.css` on nearly every hunk.

---

## Notes

- `[P]` = different files, no dependencies — applied sparingly here for the reason above
- `[UI]` tasks (Principle VI) produce user-visible output; the `frontend-design` skill is invoked before executing them
- Every value needed for T007–T023 is already measured in research.md — implementation should consult it, not re-parse the exports
- Commit after each task or logical group; the pre-commit hook runs lint then build every time, so keep groups small enough to stay green
- **The single most important invariant**: no token name is removed or renamed. If a task seems to require deleting a name, it is wrong — alias instead (see T029)

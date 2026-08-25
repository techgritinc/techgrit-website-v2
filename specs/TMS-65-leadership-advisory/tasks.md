# Tasks: Leadership & Advisory Page (About sub-route restructure)

**Feature**: TMS-65-leadership-advisory | **Date**: 2026-08-20
**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md) | **Research**: [research.md](./research.md)

**Task format**: `- [ ] [ID] [P?] [Story?] [UI?] Description with file path`
- `[P]` — parallelisable: different file, no dependency on an incomplete task
- `[US1/2/3]` — the user story this task serves (user-story phases only)
- `[UI]` — user-visible frontend work; per Constitution Principle VI, invoke the `frontend-design` skill before executing any `[UI]` task

**Tests**: no test tasks generated. This repo has no test framework (no Jest/Vitest/Playwright config, no `*.test.*` files) and the spec requests none. Verification is `npm run lint` + `npm run build` plus the browser checks in Phase 6.

---

## Phase 1: Setup

- [X] T001 Confirm the baseline is green before touching anything — run `npm run lint` and `npm run build` from the repo root and record any pre-existing failures so they are not attributed to this feature. **Result**: both clean, no pre-existing failures. All 11 existing routes render dynamic (`ƒ`), consistent with the app-wide `cache: "no-store"` CMS-fetch pattern noted in research.md

---

## Phase 2: Foundational (blocking — must complete before any user story)

- [X] T002 Add `aboutOurStory: "/about/our-story"` and `aboutLeadership: "/about/leadership-advisory"` to the `ROUTES` object in `lib/routes.ts`, keeping `about: "/about"` unchanged as the prefix that `components/ui/ambient-orbs.tsx` matches on
- [X] T003 Relocate the About page: move `app/about/page.tsx` to `app/about/our-story/page.tsx` and move all 8 files from `app/about/_components/` to `app/about/our-story/_components/`, leaving content byte-identical. Done via `git mv` — history preserved
- [X] T004 Fix the relocated page's imports in `app/about/our-story/page.tsx` — relative `./_components/*` paths still resolve, but verify the `@/`-aliased imports (`@/cms/api/about`, `@/app/_home-components/LifeGallery`, `@/components/ui/final-cta`) and confirm `app/about/` retains no orphaned files. **Result**: no edits needed, all imports already resolve correctly; `find app/about` shows only the 9 relocated files; build confirms `/about/our-story` renders and `/about` no longer does

**Checkpoint**: `/about/our-story/` renders exactly what `/about` used to. `/about` now 404s — expected until T023.

---

## Phase 3: User Story 1 — Evaluate who is behind TechGrit (P1) 🎯 MVP

**Goal**: `/about/leadership-advisory` renders all four sections against the reference.

**Independent test**: navigate directly to `/about/leadership-advisory/` — hero, three profile cards with working LinkedIn links, the four-tile rationale block, and the closing CTA all render, with no dependency on Phase 4 or 5.

### Design system foundations

- [X] T005 [P] [US1] [UI] Add the three new tokens to `app/tokens.css` in their existing numbered sections: `--color-orange-light: #fdba74`, `--color-overlay-orange-08: rgba(232, 119, 34, 0.08)`, `--text-14: 14px` — each with a job comment matching the file's existing annotation style
- [X] T006 [US1] [UI] Add the matching `@theme inline` entries for all three new tokens to `app/globals.css`. A token with no mapping silently falls back to Tailwind's shipped default instead of erroring — this is the TMS-62 fidelity-drift bug class, so this task is not optional and must not be merged into T005. **Found in passing**: a pre-existing token, `--text-2xs-lg` (13px), has exactly this bug — defined in tokens.css with no `@theme inline` mapping. Not fixed here (out of scope, pre-dates this feature); ProfileCard.tsx's pill deliberately uses the already-mapped `--text-2xs` instead of this unmapped token
- [X] T007 [US1] [UI] Add a `leaderProfile` variant to `components/ui/GlassCard.tsx` — the union plus an entry in all four `Record<GlassCardVariant, string>` maps (`CARD_VARIANTS`, `ICON_VARIANTS`, `TITLE_VARIANTS`, `DESC_VARIANTS`); card = `rounded-[var(--radius-3xl)]`, `--color-glass-4` fill, hairline border, centred text, `-translate-y-[5px]` + `--color-border-orange-medium` on hover

### Content layer

- [X] T008 [P] [US1] Create `cms/types/leadership-types.ts` with `ImageAsset`, `LeaderProfile`, `RationaleIconName` (closed union: `"enterprise" | "startup" | "aiFirst" | "longTerm"`), `RationaleTile`, `LeadershipHeroSection`, `WhyItMattersSection`, and the `LeadershipPageContent` aggregate — re-exporting the existing `FinalCtaContent` from `components/ui/final-cta.tsx` rather than redeclaring it
- [X] T009 [US1] Create `app/about/leadership-advisory/_data/data.ts` with the verbatim copy from spec.md FR-017/FR-026/FR-028/FR-032/FR-034, all three profiles pointing at `/assets/team/glasses.png` per FR-023a, and an accessor returning `LeadershipPageContent | null`. `hero.titleHighlight` must be an exact substring of `hero.title` or the gradient silently disappears

### Shared primitives

- [X] T010 [P] [US1] [UI] Create `components/ui/Breadcrumb.tsx` as semantic `<nav aria-label="Breadcrumb"><ol>` with `aria-current="page"` on the leaf — uppercase `--text-2xs`, `--ls-wider` tracking, `--color-text-55` ancestor link brightening to white on hover, `/` separator at reduced opacity, leaf in white. Do not copy the reference's bare-`<div>` `.crumbs` markup
- [X] T011 [US1] [UI] Create `components/ui/ProfileCard.tsx` wrapping `GlassCard variant="leaderProfile"`: 120px circular photo (`next/image`, `object-cover`, `--color-hover-orange-border-40` 2px ring, no gradient fill, no initials fallback), uppercase `--color-orange` role at `--text-11`/`--ls-hint`, `--text-22` name at `--ls-normal`, `--text-14` bio in `--color-text-66`, then the LinkedIn pill. Card body is a flex column with the pill pushed to the bottom so pills align across a row of unequal-length bios
- [X] T012 [US1] [UI] Add the LinkedIn pill to `components/ui/ProfileCard.tsx`: `--radius-30` pill, `--color-glass-4` fill, `--color-border-14` border, `LinkedInIcon` from `components/ui/icons.tsx` at 14px + "LinkedIn" label; `target="_blank" rel="noopener noreferrer"`; hover **and focus-visible** both warm to `--color-overlay-orange-08` fill with `--color-border-orange-medium` border and white label. Omit the whole pill when `linkedInUrl` is null

### Sections

- [X] T013 [P] [US1] [UI] Create `app/about/leadership-advisory/_components/leadership-hero.tsx` — centred column, `Breadcrumb` and the badge each forced onto their own line (FR-013: they must never sit side by side), badge as an `--color-overlay-orange-10` / `--color-border-orange-35` pill with a glowing 7px dot and `--color-orange-light` uppercase label, H1 with `.text-gradient` on the highlight via the `construction-hero.tsx` split pattern, subtitle, then primary `Button size="hero"` + existing `variant="ghost"` secondary. Five-step `data-rise` stagger. Used the existing `.status-dot.status-orange` class for the glowing badge dot instead of hand-rolling one
- [X] T014 [P] [US1] [UI] Create `app/about/leadership-advisory/_components/leadership-profiles.tsx` — a 3-column grid at `gap-7` collapsing to one centred `max-w-[480px]` column at `max-tg-md` (960px, **not** the reference's 900px — Principle II, research.md §2), mapping `profiles` onto `ProfileCard`. No section heading, eyebrow or description (FR-027)
- [X] T015 [P] [US1] [UI] Create `app/about/leadership-advisory/_components/leadership-why-it-matters.tsx` — centred header using `SectionEyebrow` with `showAccent={false}`, H2 at `clamp(30px,3.4vw,40px)`, description in `--color-text-66`; then a 2×2 grid collapsing to one column at `max-tg-md`. Tiles are horizontal rows with a non-shrinking, top-aligned `--radius-md` icon holder (`--color-overlay-orange-14` fill, `--color-orange` glyph) so the grid stays aligned when a title wraps
- [X] T016 [US1] [UI] Map the four tile icons in `leadership-why-it-matters.tsx` using a lookup keyed by `RationaleIconName`: `enterprise` → `LayoutDashboardIcon`, `startup` → `SvcStartupsIcon`, `aiFirst` → `OrbitAiIcon`, `longTerm` → `HeartIcon`. Add no new icons to `components/ui/icons.tsx` (FR-033)
- [X] T017 [US1] [UI] Create `app/about/leadership-advisory/page.tsx` — `generateMetadata()` from the content's `seo` fields, `notFound()` when the accessor returns null, then compose hero → profiles → why-it-matters → the shared `FinalCta` (passing `secondaryCta` so "See Open Roles" renders as the existing ghost button). Composition only, no markup of its own (FR-038). Keep every section a Server Component — no `"use client"`

**Checkpoint**: US1 independently deliverable — the page renders and is reachable by direct URL.

---

## Phase 4: User Story 2 — Reach the right About page from the header (P2)

**Goal**: hovering "About" opens its panel; activating "About" itself never navigates; its first sub-item lands on `/about/our-story`.

**Independent test**: hover "About" from any page, confirm the two-item panel appears, confirm click/tap/Enter on "About" navigates nowhere, and confirm each sub-item reaches its page.

- [X] T018 [P] [US2] Normalise the stale CMS nav href in `cms/api/header.ts` — inside `toMegaGroup()`, map a sub-item `href` of exactly `/about` to `ROUTES.aboutOurStory`. Exact match, not a prefix, so a future genuine `/about/...` value passes through. Becomes a no-op once the team corrects the CMS entry (FR-008a). **Revised after live verification against the real CMS**: both "Our Story" AND "Leadership & Advisory" sections carry the identical stale `/about/` ctaLink — a same-value href match can't tell them apart, so the fix resolves by **section title** within the About group (`ABOUT_SUB_ITEM_HREF_BY_TITLE`), not by href value alone. The original href-value approach would have silently sent both clicks to `/about/our-story`
- [X] T019 [US2] [UI] In `components/layout/HeaderClient.tsx`, render the About group's desktop trigger as `<button type="button">` instead of `<Link>` when `group.href === ROUTES.about`, keeping `aria-haspopup`/`aria-expanded` and the hover open/close handlers. This satisfies FR-007 for mouse, touch and keyboard at once and removes the need for the existing `pointerType`/`Enter`-`Space` `preventDefault()` branches on this group
- [X] T020 [US2] [UI] In `components/layout/HeaderClient.tsx`, fix the About group's active state — the current `group.href === pathname` can never match now that `/about` renders nothing; use a prefix match on `ROUTES.about` for this group so the parent highlights on both sub-pages (FR-009)
- [X] T021 [US2] Verify the mobile menu in `components/layout/HeaderClient.tsx` is unchanged — the About group label is already a non-interactive `<div>` heading with only its sub-items as links, so FR-011 should need no edit. **Confirmed live**: mobile "About" heading is a bare `<div>`, not a link/button; both sub-items resolve to their correct new URLs
- [X] T022 [US2] Confirm no other mega-group changed behaviour (What We Do, How We Work, Industries, Insights all still navigate to their own overview page on click) — FR-010 and FR-012. **Confirmed live**: all four remain real `<a>` elements with their hrefs intact; only About is a `<button>`

**Bug caught during live verification, fixed as part of this phase**: `next.config.ts` sets `trailingSlash: true`, so the CMS's `navItem.url` for About is `"/about/"` (trailing slash) while `ROUTES.about` is `"/about"` (no trailing slash) — the `isAboutGroup = group.href === ROUTES.about` equality check in T019/T020, and the equivalent check in T018, both silently never matched against real CMS data (though they matched fine against the static content module used for local reasoning). Added `stripTrailingSlash()` to `lib/routes.ts` and applied it at both comparison sites. Caught only because this session's dev server was pointed at a live CMS instance rather than the `DEFAULT_HEADER_DATA` fallback — worth flagging that the fallback path was never a faithful test of this logic.

**Checkpoint**: the new page is reachable through normal browsing.

---

## Phase 5: User Story 3 — Follow existing About links without a dead end (P3)

**Goal**: every pre-existing route into the About area resolves to live content.

**Independent test**: activate the footer's two About links, the homepage gallery's About action, and request `/about` directly — all four reach a live page.

- [X] T023 [P] [US3] Add `redirects()` to `next.config.ts` returning `{ source: "/about", destination: "/about/our-story", permanent: true }` (FR-003). Note the `trailingSlash: true` already set in that file — verify the redirect resolves to `/about/our-story/` without a double hop. **Confirmed live**: `/about` → `/about/our-story/` in one hop, landing on the correct page
- [X] T024 [P] [US3] Repoint both About entries in `cms/api/footer.ts` — `"our-story"` from `ROUTES.about` to `ROUTES.aboutOurStory`, and `"leadership"` from the dead `/about#leadership` anchor to `ROUTES.aboutLeadership` (FR-005). **Extended after live verification**: the edited `DEFAULT_FOOTER_DATA` fallback is dead code while the CMS is reachable — the real path is `toLinkGroup()`, which passed CMS hrefs through unresolved. Live CMS data showed the same both-items-point-to-`/about/` bug as T018; added the identical title-keyed resolution (`COMPANY_ITEM_HREF_BY_TITLE`), scoped to the "Company" footer group
- [X] T025 [P] [US3] Repoint the About action in `app/_home-components/LifeGallery.tsx` from `ROUTES.about` to `ROUTES.aboutOurStory` (FR-005). **Confirmed live**: homepage "Meet the team" action resolves to `/about/our-story/`
- [X] T026 [US3] Confirm `components/ui/ambient-orbs.tsx` needs no change — its `pathname?.startsWith(ROUTES.about)` branch already matches both new sub-routes, so both inherit the About 4-orb set (FR-004). Verified by reading the full if/else chain: no earlier branch's prefix check intercepts `/about/our-story/` or `/about/leadership-advisory/` first

**Checkpoint**: all three stories complete; no dead links anywhere on the site.

---

## Phase 6: Polish & cross-cutting

- [X] T027 [UI] Reference fidelity pass — compare the rendered page against `raw-files-v3/TechGrit Website V2.3/TechGrit Leadership.dc.html` at 1440 / 1024 / 900 / 768 / 375px (SC-002). Two divergences are expected and must NOT be filed as defects: the grid collapses at 960px not 900px (Principle II), and the final-CTA panel geometry comes from the shared component (FR-036). **Corrections made from a literal CSS-value comparison** (all confirmed live via computed-style checks at 1440px): hero crumb→badge gap 24px→20px; badge padding-y 6px→7px; badge label 12.5px/0.16em tracking→12px/0.14em (`tracking-widest`→`tracking-hint`); breadcrumb tracking 0.10em→0.08em (`tracking-wider`→`tracking-08`); H1 line-height hardcoded 1.04→reused `--lh-tight` (1.02, exact reference match); LinkedIn pill icon-to-label gap 6px→7px; why-it-matters tile description color/leading `--color-text-66`/1.6→`--color-text-60`/1.55 (reference is 0.6 opacity /1.55, not 0.66/1.6). CTA section width also corrected — see T028's follow-up note
- [X] T028 [UI] Token compliance audit — grep the feature diff for hardcoded hex colours, raw px/rem literals and `rgba()` literals that duplicate an existing token (SC-003). Confirm all three new tokens appear in **both** `app/tokens.css` and `app/globals.css`. **Two real, previously-undetected bugs found and fixed**: `text-22` (profile name) and `text-md-lg` (tile title) both have **no** `@theme inline` mapping — the exact TMS-62 silent-fallback bug class this task exists to catch. Neither utility was ever generated; both elements were silently falling through to their `<h3>` tag's own base-layer font-size (`clamp(22px,2.4vw,30px)` → 30px at desktop widths) instead of the intended 22px/16.5px. Fixed by switching to `text-[22px]`/`text-[16.5px]` (legitimate arbitrary values — no mapped token exists at either size). **User-flagged regression, also fixed here**: an attempt to register `--container-max` under `@theme`'s `--spacing-*` namespace (so `max-w-container-max` would be a real utility) did not actually generate a utility — confirmed absent from the compiled stylesheet. Left the three profile/why-it-matters/CTA section wrappers with **no** max-width for a period, causing the reported "cards became wider" regression. Reverted to explicit `mx-auto max-w-[1280px] px-9` (per-user directive: do not use the existing `.tg-container` global class, despite Case Studies precedent). CTA width fixed separately by passing `maxWidth={1280}` (plus `paddingTop={20}`/`paddingBottom={100}` matching the reference) to the shared `FinalCta`, following Construction page's own established override precedent — the 1180 shared default was never a fidelity match for this page's reference, which uses 1280px on every section
- [X] T029 [UI] Accessibility pass — every LinkedIn pill reachable and operable by keyboard alone with a visible focus indicator (SC-009); breadcrumb exposes a `Breadcrumb` landmark with `aria-current="page"` on the leaf; the About trigger is keyboard-operable without navigating (SC-006). **Also swept explicit `leading-[...]`/`tracking-[...]` across every text element exclusive to this page** (hero, why-it-matters, `ProfileCard.tsx`, `Breadcrumb.tsx`, and only the `leaderProfile`-specific lines in the shared `GlassCard.tsx`) — confirmed live that the profile name's `<h3>` was silently inheriting `line-height: var(--lh-normal)` (1.32) and the tile title's `<h3>` was silently inheriting `letter-spacing: var(--ls-normal)` (-0.02em) from `globals.css`'s base `h1–h6` tag rules, neither of which the reference specifies for those elements (reference leaves them at true CSS `normal`). Fixed by adding explicit `leading-[normal]`/`tracking-normal` at each site rather than relying on the tag's own base default. Also downgraded the why-it-matters tile title from `<h4>` to `<h3>` (nothing else in the app uses `<h4>`, so this was a pure heading-hierarchy improvement with no consistency cost)
- [X] T030 [UI] Responsive and motion pass — no horizontal page scroll from 360px to 2560px (SC-007); confirm the three LinkedIn pills align across a desktop row despite unequal bio lengths; confirm entrance reveals and orb drift both stop under OS reduced-motion. **Confirmed live**: no overflow at 360px or 2560px; three profile cards computed at 384px each (`(1208 − 2×28) / 3`), matching the 1280px container's 3-column math exactly; pills aligned at identical `top` across all three cards
- [X] T031 Run `npm run lint` and `npm run build` — both must pass with no new warnings or errors (SC-008), since `.husky/pre-commit` blocks the commit otherwise. **Final run, after all Phase 6 corrections**: both clean

### Second correction round (post-Phase-6, user-directed)

After the above, the user identified a **root-cause line-height mechanism** the T029 sweep had missed: Tailwind's Preflight reset sets `line-height: 1.5` at the document root, and since `line-height` is an inherited CSS property, **every element without an explicit `leading-[...]` override was inheriting that `1.5`**, not the true CSS `normal` keyword the reference relies on wherever it leaves line-height unset. The bare `leading-normal` **utility class** (as opposed to the `leading-[normal]` arbitrary-value form) makes this worse — it doesn't mean "let the browser decide," it maps to Tailwind's own stock scale value, which is also `1.5`. Every occurrence of the bare `leading-normal` across this page's files was replaced with `leading-[normal]` (the literal keyword), which resolves correctly because this project and the reference share the same font stack (Calibri/Carlito), so `normal` computes to the identical pixel value in both. One further instance was only fixable via the shared `SectionEyebrow` primitive's own `className`/`style` prop passthrough (not by forking the component) — `leading-[normal]` added there too, via `className` per explicit instruction not to use an inline `style` object.

Four additional corrections, all user-directed:
- **Ring size reverted to the reference's literal 110px** (`h-27.5 w-27.5`, not the earlier-clarified 120px) — the border colour/width were already an exact match (`rgba(232,119,34,0.4)`, 2px), so size was the only lever. `sizes="110px"` and the unused `GlassCard` icon-variant comment kept in sync.
- **Static href-fallback tables removed** from both `cms/api/header.ts` (`ABOUT_SUB_ITEM_HREF_BY_TITLE`/`resolveSubItemHref`) and `cms/api/footer.ts` (`COMPANY_ITEM_HREF_BY_TITLE`) — both now pass the CMS's `href`/`url` straight through, unmodified. **Consequence**: since the live CMS still returns `/about/` for both "Our Story" and "Leadership & Advisory" (confirmed via live API query, not yet corrected by the team), both header sub-items and both footer "Company" links now point at `/about/` → redirects to `/about/our-story/`. The new Leadership & Advisory page is reachable only by direct URL until the CMS entries are corrected — this was an explicit trade accepted by the user in favour of removing app-side compensation for stale content data.
- **About's active/highlight state reverted** to the original single-line `group.href === pathname` for every group, removing the About-specific prefix-match special case added in T020. About now simply never shows as active (since `/about` no longer renders), which is the accepted, unmodified prior behaviour rather than a new accommodation.
- **A failed `--container-max` → `max-w-container-max` theme-registration attempt was cleanly reverted** after it silently produced no generated utility (confirmed absent from the compiled stylesheet) and left three section wrappers with no `max-width` at all — the direct cause of a "cards got wider" regression the user caught. Per explicit instruction, the fix does **not** use the pre-existing `.tg-container` global class (despite Case Studies precedent) — reverted to plain `mx-auto max-w-[1280px] px-9`.

Also fixed while re-auditing: `bio` line-height reverted from the earlier v2-convention substitution (1.6) to the reference's literal explicit `1.65`; `FinalCta`'s heading now receives `titleLineHeight={1.06}` (previously absent, silently inheriting `1.13` from the base `h2` rule) — same override pattern Construction already established.

Final `npm run lint` + `npm run build`: both clean.

---

## Dependencies

```text
Phase 1 (T001)
   ↓
Phase 2 (T002 → T003 → T004)          ← blocks everything
   ↓
   ├─ Phase 3  US1 (T005–T017)   ← MVP, independently shippable
   ├─ Phase 4  US2 (T018–T022)   ← independent of US1 and US3
   └─ Phase 5  US3 (T023–T026)   ← independent of US1 and US2
                ↓
        Phase 6 Polish (T027–T031)
```

**Story independence**: US1, US2 and US3 touch disjoint files after Phase 2 and can be built in any order or in parallel. US2 and US3 both make the US1 page *more reachable* but neither is required for it to work.

**Within-phase ordering that matters**:
- T005 → T006 (token before its mapping) → T007, T011, T013–T015 (consumers)
- T008 → T009 (types before values) → T017
- T007 → T011 (variant before the card that uses it) → T014
- T010, T011, T012 → T013, T014 (primitives before sections)
- T013, T014, T015, T016 → T017 (sections before composition)
- T019 → T020 (same file, sequential)

## Parallel execution examples

**Phase 3** — after T006 lands, three independent tracks:
```text
Track A: T007 → T011 → T012
Track B: T008 → T009
Track C: T010
then T013 ‖ T014 ‖ T015 (different files) → T016 → T017
```

**Phase 4 / Phase 5** — fully parallel with each other and with Phase 3:
```text
T018 ‖ T023 ‖ T024 ‖ T025    (four different files, no shared state)
```

## Implementation strategy

**MVP = Phase 1 + 2 + 3 (T001–T017).** That delivers the page itself, reachable by URL and by the footer's existing (still-stale) link path. Ship it, review fidelity, then add Phase 4 and 5.

**Incremental delivery**: each phase ends at a checkpoint that is demonstrable on its own. Phase 2 alone is a safe, reviewable commit (a pure folder move). Phases 4 and 5 are small enough to land together once US1 is signed off.

**Risk note carried from research.md §3**: `.github/workflows/deploy-pages.yml` uploads `out/` to GitHub Pages, but `npm run build` produces no `out/` (no `output: "export"` in `next.config.ts`, and static export is incompatible with this app's `no-store` CMS fetches). If that workflow is still the live deploy path, T023's config-level redirect will not work in production and needs revisiting. Raised, not changed.

## Task summary

| Phase | Story | Tasks | Count |
|---|---|---|---|
| 1 Setup | — | T001 | 1 |
| 2 Foundational | — | T002–T004 | 3 |
| 3 Leadership page | US1 (P1) | T005–T017 | 13 |
| 4 Header behaviour | US2 (P2) | T018–T022 | 5 |
| 5 Link repointing | US3 (P3) | T023–T026 | 4 |
| 6 Polish | — | T027–T031 | 5 |
| **Total** | | | **31** |

`[UI]`-tagged: 17 tasks — each requires invoking the `frontend-design` skill first (Constitution Principle VI).
`[P]`-marked: 10 tasks.

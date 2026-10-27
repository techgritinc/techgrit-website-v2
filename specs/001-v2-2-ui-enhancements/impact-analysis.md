# TMS-V2.2-Enhancements — Page-Wise Difference Analysis & Implementation Estimate

**Companion to**: [spec.md](spec.md)
**Purpose**: The user-requested pre-planning deliverables (difference analysis, components touched, token updates, file impact, effort estimate) for each in-scope page. This is engineering/planning-level detail kept out of `spec.md` (which stays implementation-detail-free per the Constitution's spec-quality rules) but produced now, as asked, before `/speckit.plan`.
**Basis**: Direct comparison of the current codebase (`app/`, `components/`) against `raw-files-v2/TechGrit Website V2.2/*.dc.html`, as of 2026-08-03. Estimates assume Phase 1 is complete and this is refactor/enhancement work, not greenfield build: the correct component, folder, and routing structure already exists for every in-scope page, so the work is targeted markup/CSS/token edits and a handful of small additive pieces (Blog section, filter wiring, Skip-the-Form card) rather than new builds. Because this pass is spec-driven — every difference against the reference was already enumerated above before any code is touched — implementation carries little of the discovery/back-and-forth time a from-scratch or ambiguous-requirements task would need. Time is given in hours for one senior frontend engineer already familiar with this codebase, and assumes the shared-foundation fixes (see Cross-Page Coordination Notes) are done once, first, rather than repeated per page — see the Page-Wise Time Estimate table at the end for the full breakdown and total.

---

## 1. Home Page (`app/`, `app/_home-components/`)

**Reference**: `TechGrit Homepage.dc.html`

### Difference Analysis
- Hero has a sub-tagline and a clickable scroll indicator the reference doesn't have; hero content isn't fully centered; ghost button and metrics styling are pre-v2.2.
- "Trusted by our clients" logo strip currently lives inside `Hero.tsx`; reference shows it as an independent, horizontally-scrolling (continuous marquee-style) section below the hero with its own spacing — confirmed against `Hero.tsx` and the reference's `tgmarquee` keyframe.
- Subscribe band (`SubscribeBand.tsx`) needs a narrower/different width, updated input and button styling; it does NOT scroll horizontally (that behavior belongs to the clients strip, not this component) — normal responsive wrap/stack applies.
- `MethodologySection.tsx` ("How We Deliver") has a leading dash/symbol on its eyebrow that must be removed, uses bare numerals for its top phase steps, and its two-column phase-detail card (`grid-cols-[1.25fr_0.75fr]`) shows a giant numeral on the right that must become an icon matching the corresponding top-timeline icon rather than a distinct icon; that same card must also be widened. Not currently extracted as a cross-page-reusable component.
- `ReImagineSection.tsx` ("Don't Migrate / Re-Imagine") cards each use distinct icons today; reference uses one common icon for all but the last card (which uses the TechGrit mark), adds a hover background, and adds imagery not currently present.
- The Construction industry card inside `IndustriesSection.tsx` is unaffected by Home-page bullets directly (the Ghost-Button/icon/bg-image/CTA-link bullets target `/construction` itself — see Industries section below).
- `TestimonialsSection.tsx` is currently center-aligned with no metrics card, and testimonial cards lack the duration badge, verified badge, quotation icons, and animated play affordance called for in the reference.
- No homepage Blog section exists today — net-new build.
- `LifeGallery.tsx` photo grid and action buttons need layout/content updates (shared with Careers — see coordination note below).
- `FinalCta.tsx` card width and link typography need updating.

### Components Updated
`Hero.tsx`, `SubscribeBand.tsx`, `MethodologySection.tsx`, `ReImagineSection.tsx`, `TestimonialsSection.tsx`, `LifeGallery.tsx`, `FinalCta.tsx`, `components/ui/icons.tsx` (new icon glyphs), `components/ui/Badge.tsx`/`Button.tsx` (if ghost-button variant needs extending).

### New Components
- A new "Trusted by our clients" section component (extracted out of `Hero.tsx`).
- A new `HowWeDeliver`-style component under `components/ui/` (or a new shared location) so it is consumable from other pages per FR-006 — exact home is a `/speckit.plan` decision.
- A new Home Blog section component (e.g. `app/_home-components/BlogSection.tsx`), reusing `/blog`'s content data.

### Token Updates (likely)
New/updated tokens for: testimonial hover background, duration-badge background/text, verified-badge color, quotation-icon color, blog-card background variants (3 colors per the "background color" bullet), Don't-Migrate-card hover background, subscribe-band input/button colors if they differ from existing form tokens.

### Expected File Impact
- Modify: 7 existing `_home-components` files, `app/page.tsx` (section order/composition), `app/tokens.css`, `app/globals.css`.
- Add: 2 new component files (Trusted-by strip, Blog section), possibly 1 shared "How We Deliver" component file relocated into `components/ui/`.
- Shared components touched: `LifeGallery.tsx` (shared with Careers — coordinate FR-011 and FR-038 together to avoid divergent copies).

### Estimate: **~6 hours** (after shared foundation work) — widest surface area of any single page, but every section already exists and is being edited in place; only the Blog section and the Trusted-by extraction are additive rather than edits.

---

## 2. Services Page (`app/services/`)

**Reference**: `TechGrit Services.dc.html`

### Difference Analysis
- No background ambient orbs exist on this page today (confirmed — no orb/ambient markup found in `app/services/`); reference expects them.
- `services-hero.tsx`'s top badge renders a dot (a `border-radius:50%` span, confirmed at line 22) that the reference doesn't have, and its ghost button (`btn btn-ghost btn-ghost--static-border`, confirmed present) needs the same reference-styling update used on other pages' ghost buttons.
- The three top-level service cards (`services-overview.tsx`) are currently static; reference requires expand/collapse to reveal nested related services — a new interaction, not present today.
- Card hover background doesn't match reference.
- `services-final-cta.tsx` width and CTA button styling need updating.

### Components Updated
`services-hero.tsx`, `services-overview.tsx`, `services-final-cta.tsx`.

### New Components
- A background ambient-orbs element for the page (reuse the shared orb component/pattern used elsewhere in the app rather than a new one, if one already exists — verify during planning).
- No new component expected for expand/collapse — likely local state inside the existing card component; escalate to a shared "Accordion/ExpandableCard" primitive under `components/ui/` only if the same pattern is needed elsewhere (not currently requested elsewhere).

### Token Updates (likely)
Hover-background token for service cards if none exists; expand/collapse transition-timing token if the Constitution's motion system doesn't already cover it; ghost-button styling likely resolved by the shared `Button.tsx` foundation fix (see Cross-Page Coordination Notes) rather than a Services-specific token.

### Expected File Impact
- Modify: `services-hero.tsx`, `services-overview.tsx`, `services-final-cta.tsx`, `app/tokens.css` (if new tokens needed).

### Estimate: **~2.5 hours** — badge-dot removal and ghost button are covered by the shared foundation fix; the new work here is adding background orbs plus the expand/collapse interaction, both contained to two-three files.

---

## 3. Industries (`/construction`) Page

**References**: `TechGrit Industries.dc.html` (new bullets) + `TechGrit Construction.dc.html` (Home-page-listed "Construction Section" bullets) — **both apply to the same existing route**, per the Clarifications resolution in spec.md (no new `/industries` route; FinTech/Healthcare tabs are out of scope and unrouted).

### Difference Analysis
- `construction-hero.tsx`: needs updated ghost button, updated metrics-panel background, and its current background image removed.
- `construction-challenges.tsx`: eyebrow currently includes a dash that must be removed; icon set needs replacing.
- `construction-solutions.tsx` ("What We Build"): section spacing needs adjusting to match reference.
- `construction-advantage.tsx` ("Why TechGrit"): eyebrow symbol/glyph needs removing.
- `construction-impact.tsx` ("Proven Impact"): cards are not currently guaranteed equal height, and each card is currently wrapped in its own link (confirmed: `<a key={caseStudy.order} href={caseStudy.link} className="block">` at line 15) — the reference does not make these cards individually clickable, so this per-card link wrapper must be removed.
- Final CTA (in `page.tsx` composition, via the shared `FinalCta` reusable component): needs increased width, both action buttons updated, and ghost-button styling updated.

### Components Updated
`construction-hero.tsx`, `construction-challenges.tsx`, `construction-solutions.tsx`, `construction-advantage.tsx`, `construction-impact.tsx`, `page.tsx`.

### New Components
None expected — this is a refactor of six existing files.

### Token Updates (likely)
Metrics-panel background token, equal-height card layout doesn't need a new token (layout, not a value), dash-removal/eyebrow-symbol removal are content/markup changes not token changes.

### Expected File Impact
- Modify: all 6 files listed above, `app/tokens.css` (metrics-panel background if new).
- Remove: hero background image asset reference, the per-card `<a href={caseStudy.link}>` wrapper in `construction-impact.tsx`.

### Estimate: **~2 hours** — six files touched but each change is narrow and mechanical (icon swap, spacing, eyebrow text, CSS equal-height, CTA width) on top of an already-correct page structure; no new interaction logic.

---

## 4. Insights — Case Studies (`app/case-studies/`)

**References**: `TechGrit Case Studies.dc.html` (hub) + `TechGrit Case Study.dc.html` (detail)

### Difference Analysis
- Background ambient orbs across the hub don't yet match the reference; cards currently show a hover border that the reference removes.
- Hero badge (`case-studies-hero.tsx`) shows a dot the reference doesn't have.
- No dark, sticky, labeled filter bar exists today positioned below `featured-case-study.tsx`; filtering is not functional (`case-studies-grid.tsx` has no filter logic currently — confirmed no filter-related component exists in this folder today).
- Detail page (`case-study-detail-hero.tsx`, `case-study-narrative.tsx`) has no background orbs today.
- `case-studies-final-cta.tsx` uses a plain link rather than the shared `Button` component, and its background doesn't match the reference.

### Components Updated
`case-studies-hero.tsx`, `case-studies-grid.tsx`, `featured-case-study.tsx`, `case-studies-final-cta.tsx`, `case-study-detail-hero.tsx`.

### New Components
- A new sticky filter-bar component (e.g. `case-studies-filter.tsx`) with real filtering logic wired to `case-studies-grid.tsx`.
- Reuse of the existing shared ambient-orbs component (already used elsewhere per repo history) for both hub and detail — not a new component if that shared primitive already exists at the location noted in CLAUDE.md's recent-changes log; verify path during planning.

### Token Updates (likely)
Sticky-filter-bar dark background token, filter-label typography token if not covered by existing eyebrow/label tokens, orb color/opacity tokens if the Case Studies orb treatment differs from the existing shared set.

### Expected File Impact
- Modify: 5 files listed above, `app/tokens.css`.
- Add: 1 new filter-bar component; possibly 1 new filter-state hook/util (client-side only, no backend).

### Estimate: **~4 hours** (after the shared `FilterBar` exists) — functional filtering is the only genuinely new logic here, and the grid/hero/CTA components already exist and only need editing; sticky/dark presentation is reused from the shared component.

---

## 5. Insights — Blog (`app/blog/`)

**Reference**: `TechGrit Blog.dc.html`

### Difference Analysis
- Hero badge (`blog-hero.tsx`) shows a dot the reference doesn't have.
- `topic-filter.tsx` already filters functionally (confirmed present) but needs a dark background, sticky-on-scroll behavior, and a filter label — currently missing per the reference.
- `newsletter-panel.tsx` background color needs updating.

### Components Updated
`blog-hero.tsx`, `topic-filter.tsx`, `newsletter-panel.tsx`.

### New Components
None expected.

### Token Updates (likely)
Sticky-filter dark-background token (shared with Case Studies' filter bar — consider one shared token/component for both), newsletter-panel background token.

### Expected File Impact
- Modify: 3 files listed above, `app/tokens.css`.

### Estimate: **~1.5 hours** — smallest of the three Insights pages; filtering logic already exists, this is a styling/behavior pass reusing the shared `FilterBar` on top of unchanged components.

---

## 6. Insights — Webinar (`app/webinar/`)

**Reference**: `TechGrit Webinar.dc.html`

### Difference Analysis
- `hero-section.tsx` and `sessions-section.tsx` currently present the upcoming webinar as a separate "Upcoming Live" block; reference folds it into the hero itself using a new combined layout.
- Sessions list colors/typography need updating to match reference.

### Components Updated
`hero-section.tsx`, `sessions-section.tsx`.

### New Components
None expected — this is primarily moving existing upcoming-session content/markup into the hero component rather than introducing new content.

### Token Updates (likely)
Sessions-list color/typography tokens if the reference introduces new values; otherwise reuse existing tokens.

### Expected File Impact
- Modify: `hero-section.tsx` (absorbs upcoming-webinar content), `sessions-section.tsx` (removes "Upcoming Live" block).

### Estimate: **~1.5 hours** — one structural move (upcoming session into the hero) plus a color/typography pass, both confined to two existing files.

---

## 7. About Us Page (`app/about/`)

**Reference**: `TechGrit About.dc.html`

### Difference Analysis
- Badges throughout the page show a dot the reference doesn't have.
- Eyebrows throughout the page show a leading symbol/glyph the reference removes.
- `about-us-showcase.tsx` (or the relevant imagery/culture-gallery component) grid layout needs updating.

### Components Updated
Likely all 9 `about/_components` files touch the badge/eyebrow convention (a shared `Badge`/eyebrow utility change may cover most of them at once), plus `about-us-showcase.tsx` and/or `about-us-culture-gallery.tsx` for the image grid.

### New Components
None expected.

### Token Updates (likely)
None expected if this is purely removing a dot/symbol from the existing shared `Badge` component and eyebrow utility class — likely a `components/ui/Badge.tsx` and/or `.eyebrow` (globals.css) change, not a new token.

### Expected File Impact
- Modify: `components/ui/Badge.tsx` and/or the `.eyebrow` class in `globals.css` (fixes most pages at once, including About), plus 1–2 About-specific files for the image grid.

### Estimate: **~1.5 hours** — badge/eyebrow already resolved by the shared foundation fix; remaining is one image-grid layout change on an existing component.

---

## 8. Careers Page (`app/careers/`)

**Reference**: `TechGrit Careers.dc.html`

### Difference Analysis
- `CareersHero.tsx` typography, colors, and ghost button need updating.
- `role-filters.tsx` sticky behavior and alignment need correcting.
- `application-dialog.tsx` (Apply form) field styling and ghost Apply-button styling need updating.
- `LifeGallery.tsx` reuse (shared with Home) needs an updated image layout, a new "Inside TechGrit" badge, and updated copy — must be coordinated with Home's Life-at-TechGrit changes (FR-011) so the shared component serves both call sites via props, not a forked copy.

### Components Updated
`CareersHero.tsx`, `role-filters.tsx`, `application-dialog.tsx`, `LifeGallery.tsx` (shared).

### New Components
None expected — "Inside TechGrit" badge likely uses the existing `Badge.tsx` with a new tone/variant, per the repo's established pattern of extending `Badge`/`GlassCard` variants instead of forking.

### Token Updates (likely)
Hero color tokens if new, sticky-filter-row token (share with Insights' sticky filters if visually identical), "Inside TechGrit" badge tone token.

### Expected File Impact
- Modify: `CareersHero.tsx`, `role-filters.tsx`, `application-dialog.tsx`, `LifeGallery.tsx`, `components/ui/Badge.tsx` (new tone).

### Estimate: **~2 hours** — several files, but each change is a contained style/prop update on components that already exist; the `LifeGallery` coordination with Home is already accounted for in the shared-foundation pass.

---

## 9. Contact Us Page (`app/(marketing)/contact/`)

**Reference**: `TechGrit Contact.dc.html`

### Difference Analysis
- No "Skip the Form" card exists today; reference adds one near the form with a gradient background and a direct-scheduling CTA.
- Existing form (`contact-hero-form.tsx`) and its client-side submit behavior are otherwise unaffected.

### Components Updated
`contact-hero-form.tsx` (layout adjustment to accommodate the new card) or its parent `page.tsx`.

### New Components
A new "Skip the Form" card component (e.g. `app/(marketing)/contact/_components/skip-the-form-card.tsx`), likely built on the existing `GlassCard` primitive with a gradient background token.

### Token Updates (likely)
One new gradient-background token for the card (per Constitution: add to `tokens.css` before use, don't hardcode the `linear-gradient(...)` inline).

### Expected File Impact
- Modify: `page.tsx` and/or `contact-hero-form.tsx` (layout only), `app/tokens.css`.
- Add: 1 new card component.

### Estimate: **~1.5 hours** — one additive, self-contained card built on the existing `GlassCard` primitive; existing form logic untouched.

---

## Cross-Page Coordination Notes

Doing these four shared fixes **first**, once each, is what keeps the page-level numbers this small — skipping this step and patching each page independently would roughly double the total. All four are edits to existing, already-located components (`Badge.tsx`, `Button.tsx`, `topic-filter.tsx`/new filter-bar wrapper, `LifeGallery.tsx`), not new subsystems.

- **`Badge.tsx` / `.eyebrow`**: The "remove dot from badge" (Case Studies, Blog, About, Careers) and "remove eyebrow symbol" (Industries, About) bullets recur across pages. Fixing the shared `components/ui/Badge.tsx` and the `.eyebrow` utility class once, then verifying each page's usage, is more efficient than patching each page independently.
- **Ghost button**: Referenced on Home hero, Construction/Industries hero and CTA, Industries CTA, Careers hero, Careers Apply button. Fixing the `ghost` variant once in `components/ui/Button.tsx` resolves most of these call sites automatically.
- **Sticky, dark, labeled filter bar**: Requested for both Case Studies and Blog. Blog already has functional filtering (`topic-filter.tsx`); Case Studies does not. One shared `FilterBar` presentation component (sticky + dark + label) consumed by both, with page-specific filter logic/state, avoids building the sticky/dark treatment twice.
- **`LifeGallery.tsx`**: Shared between Home (FR-011) and Careers (FR-038) today. Both pages request different-but-overlapping changes (photo grid + 2 buttons on Home; image layout + "Inside TechGrit" badge + copy on Careers). One pass across both call sites via props, per the Constitution's "backward-compatible props" convention already used for this file.

**Shared foundation subtotal: ~4 hours**, done before the page-specific work below.

## Page-Wise Time Estimate

Basis: one senior frontend engineer already familiar with this codebase, working after the shared-foundation pass above, on a spec that already enumerates every required change per page (no discovery time built in); excludes design-review/QA revision cycles and PR turnaround. Figures are hours.

| Page | Hours | Primary driver |
|---|---|---|
| Home | 6 | Widest surface area, but almost every section is an in-place edit; only the Blog section and the Trusted-by extraction are additive |
| Insights — Case Studies | 4 | Filtering logic + wiring into the shared `FilterBar`, orbs, CTA button swap — all on existing components |
| Careers | 2 | Shared-gallery coordination already accounted for in the foundation pass; remaining is hero/filters/form styling |
| Services | 2.5 | Expand/collapse state is local (one card component); plus adding background orbs, not just the card interaction |
| Industries (`/construction`) | 2 | 6 files, but each a narrow, mechanical change (icon swap, spacing, per-card link removal) |
| Insights — Blog | 1.5 | Filtering already works; just wire into the shared filter-bar look + newsletter background |
| Insights — Webinar | 1.5 | One structural move (upcoming session into hero) + color/typography pass |
| About | 1.5 | Badge/eyebrow already fixed globally; remaining is one image-grid layout change |
| Contact | 1.5 | One additive, self-contained card; existing form untouched |
| **Page-specific subtotal** | **22.5** | |
| **Shared foundation** | **4** | Badge/eyebrow, ghost button, shared FilterBar, LifeGallery pass |
| **Total** | **~26.5 hours** | ≈ 3.5 working days for one engineer; roughly a day and a half in elapsed time with 2–3 engineers working different pages in parallel, since only Home ↔ Careers (LifeGallery) and Case Studies ↔ Blog (FilterBar) have real dependencies |

This is tighter than the earlier pass because it credits the fact that every page's structure, routing, and component boundaries already exist and match the spec — the work is markup/CSS/token edits against a pre-written difference list, not exploratory build-out. Treat it as a build-time estimate only — it doesn't include design QA rounds, staging review, or any rework those rounds surface.

## Two-Developer Parallel Work Plan

Goal: split the ~26.5 hours across two developers so that **neither is ever blocked waiting on the other's in-progress work**. The only real cross-page dependencies are the two shared components identified above (`LifeGallery.tsx` links Home ↔ Careers; the shared `FilterBar` links Case Studies ↔ Blog) — so each pair is kept on a single track, and the shared-foundation pieces are split into independent halves that don't touch each other's files.

### Phase 1 — Shared Foundation (both developers, in parallel — ~2 hours wall-clock)

The 4 foundation fixes touch 4 disjoint files, so they split cleanly with no handoff needed before starting:

| Developer | Owns | Files | Hours |
|---|---|---|---|
| Dev A | Badge/eyebrow fix + Ghost button variant | `components/ui/Badge.tsx`, `.eyebrow` (globals.css), `components/ui/Button.tsx` | ~2h |
| Dev B | Shared `FilterBar` component + `LifeGallery.tsx` prop pass | new `FilterBar` component, `LifeGallery.tsx` | ~2h |

**Merge point**: both halves land (PR review) before Phase 2 starts — Phase 2 page work on either track consumes all 4 shared pieces, so this is the one required sync point in the whole plan.

### Phase 2 — Page Tracks (both developers, in parallel — ~11.5 hours wall-clock)

Track assignment keeps each shared-component pair (LifeGallery, FilterBar) inside one developer's track, so no page in Track A ever waits on a page in Track B mid-stream:

| Track | Developer | Pages | Hours | Why grouped |
|---|---|---|---|---|
| **A** | Dev A | Home (6h), Careers (2h), Contact (1.5h), About (1.5h) | **11h** | Home ↔ Careers share `LifeGallery.tsx` — kept on one dev so neither waits on the other's edits to it. Contact/About are small and independent; added to balance load. |
| **B** | Dev B | Case Studies (4h), Blog (1.5h), Webinar (1.5h), Services (2.5h), Industries/`construction` (2h) | **11.5h** | Case Studies ↔ Blog share the `FilterBar` — kept on one dev for the same reason. Webinar/Services/Industries are independent; added to balance load. |

Within a track, pages have no dependencies on each other either — Home, Careers, Contact, and About don't share components beyond what Phase 1 already resolved (same for Track B), so a developer can reorder their own track freely without coordinating with the other.

### Timeline

| Phase | Duration (wall-clock, 2 devs) | Blocking? |
|---|---|---|
| 1 — Shared Foundation | ~2 hours | Yes — one sync point; both halves must merge before Phase 2 |
| 2 — Page Tracks | ~11.5 hours (longest track) | No — Track A and Track B run fully independently after Phase 1 merges |
| **Total elapsed** | **~13.5 hours** (vs. ~26.5 hours for one engineer working serially) | |

If a third developer is available, Track B (11.5h) can be split further (e.g. Case Studies+Blog vs. Webinar+Services+Industries) since those two sub-groups share no components — bringing the longest track down further and elapsed time closer to ~8–9 hours.

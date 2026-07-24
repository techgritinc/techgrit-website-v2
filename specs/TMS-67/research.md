# Phase 0 Research: Construction Industry Page

## 1. Route and file placement

**Decision**: Add the page at `app/construction/page.tsx`, with its section components colocated under a private (non-routable) folder `app/construction/_components/`, and its dummy content module under `app/construction/_data/`. Genuinely cross-page-reusable pieces (`RevealOnScroll`, `SectionEyebrow`) live in the existing top-level `reusable-components/` directory rather than being duplicated per page.

**Rationale**: This mirrors the precedent already established by `001-about-us-page` (`app/about/_components/`, `app/about/_data/`), which the user explicitly asked this feature to follow. The constitution's Additional Constraints section (as last amended) says no `components/`/`lib/` split exists "yet" — but `reusable-components/` was deliberately introduced after that amendment, at the user's explicit request, specifically to hold components reused across pages (`RevealOnScroll`, `SectionEyebrow`), which satisfies the constitution's own caveat ("when a real components/lib split becomes necessary, introduce it deliberately... rather than scaffolding it speculatively"). This feature reuses that existing directory rather than creating a second, competing shared-component location.

**Alternatives considered**:
- Duplicating `reveal-on-scroll.tsx`/`section-eyebrow.tsx` inside `app/construction/_components/` — rejected: directly contradicts the reason `reusable-components/` was created (avoid duplicating identical logic per page).
- A new `app/construction/_components/shared/` sub-folder — rejected: unnecessary indirection now that a single top-level reusable location already exists.

## 2. Header/Footer scope

**Decision**: This feature implements only the Construction page's own 8 content sections (hero through closing CTA). It does not implement the site header/nav or footer.

**Rationale**: Confirmed during `/speckit.clarify` — another team member is already building the shared header/footer as separate work. This is also consistent with the constitution's Principle III, which mandates header/footer be built as exactly one shared `Header`/`Footer` component wired through the Next.js root layout (`app/layout.tsx`), never per-route — so it doesn't belong to this page-specific feature regardless of who is building it.

**Alternatives considered**: Building header/footer inline on this page — rejected: would duplicate the other team member's in-progress work and violate Principle III.

## 3. Content source shape

**Decision**: Implement a typed local content module (`app/construction/_data/construction-content.ts`) that exports the Construction page content in the same CMS-shaped structure as `specs/001-about-us-page/contracts/about-us-page-response.json` (a `data.sections` ordered array of typed, `__component`-discriminated entries), documented in `specs/TMS-67/contracts/construction-page-response.json`.

**Rationale**: FR-015 requires content sourced from a structured, ordered, typed `sections` list rather than hard-coded markup, mirroring the About Us page's approach exactly as the user requested. Modeling the dummy module after the same shape means only the data-fetching call (not component props) changes when a real CMS is wired up later.

**Alternatives considered**: Hard-coding copy directly in JSX — rejected: violates FR-015 and the "follow the same approach as About Us" instruction.

## 4. Styling approach

**Decision**: Style every section using the existing `app/tokens.css` custom properties and `app/globals.css` utility classes (`.btn`/`.btn-primary`/`.btn-ghost`, `.card`, `.glass-card`, `.eyebrow`, `.tg-container`/`.section`, `.text-gradient`) plus Tailwind utilities from the `@theme inline` block. No new hardcoded hex/px values.

One substitution is required: the reference file's amber-toned eyebrows/accents use `#fbbf24`, which is not an existing token. The closest existing token, `--color-amber-light` (`#F7B733`, already used for icon/link accents across the About Us components), is reused instead of introducing a new hex value.

**Rationale**: Constitution Principle I (Token-Only Styling) and Principle III (Centralized Utility-Class Component Library) are non-negotiable gates. Reusing `--color-amber-light` keeps the visual intent (a distinct amber accent, alternating with the primary orange accent, exactly as the reference alternates eyebrow colors section-to-section) without adding a near-duplicate token for a one-pixel-shade difference.

**Alternatives considered**: Adding a new `--color-amber-bright: #fbbf24` token — rejected: the difference from `--color-amber-light` is visually negligible and Principle I favors reusing an existing token over adding a near-duplicate one.

## 5. Eyebrow tone variant

**Decision**: Extend the existing shared `SectionEyebrow` component (`reusable-components/section-eyebrow.tsx`) with an optional `tone?: "orange" | "amber"` prop (default `"orange"`), which switches both the leading dash and the label text color between `var(--color-orange)` (default, matches its current only-orange behavior — used by every About Us section) and `var(--color-amber-light)`.

**Rationale**: The Construction reference file deliberately alternates eyebrow color between orange (`#E87722` — "The challenge", "Why TechGrit") and amber (`#fbbf24` → `--color-amber-light` — "What we build", "How it fits together", "Proven impact") to add visual variety across sections. `SectionEyebrow` is already the shared, cross-page component for this exact pattern (Principle III); extending it with a tone prop keeps the single-source-of-truth component intact for both pages rather than forking a Construction-specific copy.

**Alternatives considered**: A separate `ConstructionSectionEyebrow` local component — rejected: duplicates `SectionEyebrow`'s markup for a one-prop difference, and the About Us page would gain no benefit from a future amber use case if the fork isn't shared back.

## 6. Per-item icons (industry challenges, solutions)

**Decision**: Store only the display fields needed for content (label/title/description) in the dummy data module; map each entry's fixed `order` (1-based) to its SVG icon via a local `Record<number, ReactNode>` inside each section's own component file — the same pattern already used for `about-us-values.tsx`'s six value icons.

**Rationale**: Icons are a presentational/visual-truth concern (Principle IV), not data — the reference has a fixed, known set of icons per fixed-count list (5 challenges, 6 solutions), so hardcoding the icon paths keyed by order inside the component avoids inventing an icon-name-to-component registry for content that will never be arbitrarily long or CMS-editable at the icon level.

**Alternatives considered**: Adding an `icon: string` field to the data module resolved via a shared icon registry — rejected as premature abstraction: `about-us-values.tsx` already established the simpler per-order-map convention for this exact situation (fixed-count list, fixed icon set) and this feature should stay consistent with it.

## 7. Lifecycle "how it fits together" diagram

**Decision**: Implement the diagram as its own component (`construction-lifecycle-diagram.tsx`) driven by an ordered list of 8 `LifecycleNode` entries (name only). On `md:` and above (960px — **corrected 2026-07-23 per `/speckit.analyze` finding F1**; this entry originally said `lg:` while also noting the reference's own breakpoint is 960px, an internal contradiction that then propagated into the shipped code's `lg:` Tailwind classes), render a central "OrbitAI Engine" circle with 8 fixed-position connector nodes (reproducing the reference's corner-anchored layout and animated dashed SVG connector paths). Below `md:`, fall back to a simple 2-column stacked grid of the same 8 node names — reproducing the reference's own `data-flow`/`data-flow-stack` toggle behavior via a Tailwind responsive utility (`hidden md:block` / `grid md:hidden`) instead of the reference's inline `display:none`/JS-free CSS-only swap.

**Rationale**: FR-006/FR-012 and User Story 2's acceptance scenario 3 require both the connector diagram (desktop) and a simplified fallback (narrow widths) showing the same node set. The reference already demonstrates this exact swap is CSS-only (no JS), so it translates directly to Tailwind responsive classes without needing client-side viewport detection.

**Alternatives considered**: A single fixed-position diagram that shrinks via CSS `transform: scale()` on narrow screens — rejected: the reference's own connector paths become illegible/overlapping at narrow widths (confirmed by the reference's own `max-width:960px` rule that hides the flow diagram entirely), so scaling rather than swapping to a fallback would not satisfy the edge case in spec.md.

## 8. Scheduling CTA link (NEEDS CLARIFICATION resolved)

**Decision**: The closing CTA's scheduling action uses a placeholder link value in the dummy content module (e.g. `"#"` or a clearly-labeled TBD value) rather than the real `https://calendly.com/techgrit` URL from the reference. The "email the team" action uses the real `mailto:support@techgrit.com?subject=Construction%20enquiry` value, consistent with how the About Us page's own closing CTA already uses a real `mailto:` link.

**Rationale**: Confirmed during `/speckit.clarify` — the real external booking destination is out of scope for this phase and will be wired in later. Only the third-party scheduling link was flagged as placeholder; the `mailto:` action is a same-pattern, already-established real link (per About Us precedent), not a new external service integration.

**Alternatives considered**: Using the real Calendly URL now — rejected per clarification answer.

## 9. Images (hero visual)

**Decision**: Use `next/image` for the hero visual. Since content comes from the dummy module (no real photography yet), the content module sets `image: null` for the hero, and the hero component renders a descriptive placeholder block when absent — the same pattern `about-us-showcase.tsx` already implements for its showcase image.

**Rationale**: FR-013 requires a descriptive placeholder when the hero image is unavailable. Reusing the exact placeholder pattern already proven on the About Us page keeps the two pages visually and behaviorally consistent.

**Alternatives considered**: Fabricating a placeholder/stock image path — rejected: `001-about-us-page` deliberately used `null` rather than fake imagery so the placeholder path is exercised by default until real assets exist; this feature follows the same approach.

## 10. Testing approach

**Decision**: No automated test tasks. Verify manually via `npm run dev`, checking each section at mobile (~375–430px), tablet (~768–1024px), and desktop (~1280px+) widths, plus `npm run lint` and `npm run build` (already gated by the Husky pre-commit hook).

**Rationale**: Constitution's Development Workflow section confirms no test framework (Vitest/Jest) is configured anywhere in the repo. The spec did not request tests or a TDD approach.

**Alternatives considered**: Introducing a test framework for this feature — rejected: out of scope for a single content page and would be a unilateral tooling addition the constitution flags as a deliberate future decision, not one to make inside this feature.

---

## 2026-07-23 Re-plan Additions (UI Fidelity Correction Pass)

## 11. Lifecycle diagram literal geometry

**Decision**: Rebuild `construction-lifecycle-diagram.tsx`'s desktop (`md:` and above — **corrected 2026-07-23 per `/speckit.analyze` finding F1**, see §7) layout to reproduce the reference's literal geometry instead of a computed symmetric radial layout:
- A centered two-ring core: an outer translucent ring (`fill: color-mix(..., var(--color-amber) 10%, transparent)`-equivalent, `stroke: color-mix(..., var(--color-amber) 50%, transparent)`) plus an inner solid `var(--gradient-brand)` circle with a slow pulse animation. This requires a **new** `tgpulsecore` keyframe added to `app/globals.css` (confirmed absent — only `tgorb`/`tgdash`/`tgmarquee`/etc. currently exist there), following the existing `tg`-prefix convention per Principle III: `@keyframes tgpulsecore { 0%, 100% { opacity: .5; transform: scale(1); } 50% { opacity: .95; transform: scale(1.06); } }` (matches the reference's own inline `tgpulsecore` definition).
- 8 node pills positioned via 4 corner-pair absolute offsets (not evenly spaced around a circle), read directly from the reference's overlay markup: top-left pair at `left:2%/top:9%` and `left:28%/top:2%`; top-right pair at `right:28%/top:2%` and `right:2%/top:9%`; bottom-left pair at `left:2%/bottom:9%` and `left:28%/bottom:2%`; bottom-right pair at `right:28%/bottom:2%` and `right:2%/bottom:9%`.
- 8 animated dashed curved connector paths (SVG cubic Béziers) from the centered core to each node position, reproducing the reference's curve shapes (not straight lines). Reuses the existing `app/globals.css` `tgdash` keyframe (already the connector-line animation for this component; currently the sole consumer of `tgdash` repo-wide, confirmed via search), but its `stroke-dashoffset` value **must be corrected from `-26` to `-220`** to match the reference's own `tgdash` definition (**identified 2026-07-23 per `/speckit.analyze` finding F3** — the existing offset produces a visibly different dash-cycling speed/distance than the reference over this diagram's longer curved paths). Since `tgdash` has no other current consumer, correcting it in place carries no cross-page regression risk today.

**Rationale**: Per Clarifications 2026-07-23 (lifecycle diagram fidelity question), SC-006 requires literal geometry parity, not an approximate symmetric substitute. The node names/count (8) and mobile/tablet fallback (2-column grid, all 8 nodes) are unaffected — only the desktop connector-diagram layout and its breakpoint (§7) change. Both `globals.css` keyframe changes are in-scope for tasks.md T027 (added 2026-07-23 per finding F3 — the task's original file scope only named the component file).

**Alternatives considered**: Keeping the current computed radial layout and only fixing its colors/core size — rejected per the explicit Clarifications 2026-07-23 answer (Option A: literal geometry required, real rebuild, not a cosmetic pass).

**T027 implementation note (2026-07-24, done)**: Beyond the geometry/breakpoint/keyframe scope above, direct comparison against the reference during implementation found the entire diagram was missing its enclosing panel and had several further mismatches, all fixed in this pass:

- **Missing panel wrapper**: the reference wraps the whole diagram (header + SVG + fallback grid) in a rounded (`24px`), bordered (`border-border-faint`, exact `rgba(255,255,255,0.10)` token match) panel with a `linear-gradient(160deg, var(--color-glass), var(--color-glass-hairline))` background — reusing the exact same two tokens+gradient-angle already established for this purpose in `app/case-studies/_components/architecture-diagram.tsx` (both are exact matches: `--color-glass`=0.05, `--color-glass-hairline`=0.02) — plus a decorative blurred amber glow blob (`top:-80px; right:10%; 360×360; blur(110px)`). The shipped component had none of this; `page.tsx` doesn't wrap it either. New token added: `--color-overlay-amber-12: rgba(245, 158, 11, 0.12)` (no existing amber-overlay token matched this opacity — closest was `--color-overlay-amber` at 0.10).
- **Header was oversized and mis-spaced**: shipped as `clamp(30px,3.6vw,42px)` with `mb-[50px]`; reference uses a smaller `clamp(26px,3.2vw,36px)` (this section's heading is deliberately smaller than Challenges/Solutions/Impact's), `margin-top:14px` from the eyebrow, and only `margin-bottom:8px` before the diagram (the visual gap instead comes from the diagram wrapper's own `margin-top:46px`).
- **Core**: outer ring now uses the exact-match `--color-overlay-amber` token for its fill and `color-mix(in srgb, var(--color-amber) 50%, transparent)` for its stroke (no 50%-opacity amber-border token exists, so `color-mix()` on existing base tokens is used, matching the established pattern from `architecture-diagram.tsx`); inner circle and connector strokes both reuse one `<linearGradient>` def (amber→orange, matching the reference's `#flowg`) via SVG's own `stop-color` (set through `style={{ stopColor: ... }}` since `var()` isn't valid as a stop-color presentation-attribute value in JSX, only via the `style` prop) — the previous code used `var(--gradient-brand)` directly as an SVG `fill`, which isn't valid (SVG `fill` takes a color or `url(#id)`, not a CSS gradient shorthand).
- **Connector animation was 5× faster and used the wrong stroke color/width/dash pattern**: shipped `1.4s` duration, flat `var(--color-border-strong)` stroke, width 1.5, dasharray `6 6`; reference is `7s`, the amber→orange gradient stroke, width 2, dasharray `6 7`, opacity 0.55 on the group (shipped had none).
- **Node pills**: background is `var(--color-nav-glass)` (`rgba(10,24,34,0.70)`, an exact existing-token match — "Sticky nav background", reused here since the color happens to match exactly), border `var(--color-border)` (`rgba(255,255,255,0.12)`, exact match), radius `12px` (no token matches; arbitrary value, consistent with this file's existing one-off-value convention), padding `12px 10px`, label `13.5px`/bold/white.
- **Mobile/tablet fallback pills used the wrong background and gap**: shipped via the shared `.card` class (implicitly `--color-border-image`/22px radius) with `gap-4`(16px) and `18px 16px` padding; reference is a distinct, slightly more transparent background (`rgba(10,24,34,0.60)` — 10 points less opaque than the desktop pill's 0.70, not matching any existing token, so a new one was added: `--color-ink-glass-60`), `12px` radius, `14px` uniform padding, `12px` gap (fixed from `gap-4`). Node count (8, all rendered) was already correct per the existing Clarifications 2026-07-23 resolution (§7) and is unchanged — the reference's own mobile-fallback markup only hardcodes 6 of the 8 nodes, which the clarification already resolved in favor of showing all 8.

**Verification**: `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass clean. Confirmed via `javascript_tool`: panel radius/border/background computed styles match exactly; 8 connector paths and 2 core circles render; the `md:block`/`md:hidden` swap occurs correctly at both sides of the 960px breakpoint (checked at 1280px and 950px) with the mobile fallback showing all 8 pills at 12px gap; mobile width (375px) shows the correct 0.6-opacity pill background with no horizontal overflow. A pre-existing, unrelated React console warning ("Received `%s` for a non-boolean attribute") was confirmed present on `/about` as well (untouched by this feature), so it is not a regression from this change.

## 12. Icon corrections (challenges, solutions)

**Decision**: Correct the following icon entries in the existing per-order `Record<number, ReactNode>` maps (pattern from §6 is unchanged — only the SVG path content per key is fixed):

*`construction-challenges.tsx`* (`CHALLENGE_ICON_PATHS`):
- `1` (Manual submittal & RFI workflows): remove the extra checkmark path; keep only the plain document/folded-corner shape (`M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z` + `M14 2v6h6`).
- `3` (Fragmented field-to-office comms): replace the 3-line "list" icon with the reference's two-person "Users" icon (`M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2` + `circle cx=9 cy=7 r=4` + `M23 21v-2a4 4 0 0 0-3-3.87`).
- `4` (Safety, compliance & reporting risk): replace the shield icon (belongs to Solutions #4) with the reference's alert-triangle icon (`M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z` + two short exclamation-mark lines).
- `5` (No real-time project visibility): replace the clock icon with the reference's eye-with-slash icon (`M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z` + `circle cx=12 cy=12 r=3` + a full diagonal slash line).
- `2` (Cost overruns & schedule delays): already correct — no change.

*`construction-solutions.tsx`* (`SOLUTION_ICON_PATHS`):
- `1` (AI-Driven Submittal & RFI Management): replace the document+checkmark icon (duplicated from the Challenges fix) with the reference's distinct checkmark-in-open-box icon (`M9 11l3 3L22 4` + `M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11`).
- `2` (Predictive Project Analytics): replace the bar-chart/axis icon with the reference's trending-up arrow icon (`M23 6l-9.5 9.5-5-5L1 18` + `polyline points="17 6 23 6 23 12"`).
- `4` (Safety & Compliance Monitoring): add the missing checkmark path (`M9 12l2 2 4-4`) to the existing shield outline.
- `5` (Construction ERP Enhancements): replace the briefcase icon with the reference's stacked-database/cylinder icon (`ellipse cx=12 cy=5 rx=9 ry=3` + `M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5` + `M3 12c0 1.66 4 3 9 3s9-1.34 9-3`).
- `6` (Digital Twin & BIM AI Tools): replace the 3D-cube/"Box" icon with the reference's layered-stack/"Layers" icon (`M12 2 2 7l10 5 10-5-10-5z` + `m2 17 10 5 10-5` + `m2 12 10 5 10-5`).
- `3` (Field-to-Office Integration): already close (mobile-device rect matches); optionally tighten the home-button mark from a short horizontal line to a single centered dot (`x1=12 y1=18 x2=12 y2=18`) to match the reference exactly — low-priority, cosmetic-only.

**Rationale**: Confirmed via direct comparison against `TechGrit Construction.dc.html`'s inline SVGs during the 2026-07-23 `/speckit.clarify` session (see spec.md's icon-mismatch investigation). FR-019/FR-020 already specify these exact icons; this is a code correction against an already-correct spec, not a spec change.

**Alternatives considered**: Switching to an icon library (e.g., Lucide) — rejected: the project's established convention (`components/ui/icons.tsx`) already hand-recreates reference SVGs path-for-path; introducing a library now would be an inconsistent, unrequested dependency change.

## 13. Global ambient background opt-out

**Decision**: 
1. Extend `reusable-components/ambient-orbs.tsx`'s existing path-exclusion check from `pathname?.startsWith("/case-studies")` to also match `/construction`, so the shared, globally-wired component renders nothing on this route (same mechanism already used for `/case-studies`, not a new pattern).
2. Render 3 page-local orb `<div>`s directly at the top of `app/construction/page.tsx`'s returned JSX (before/around `<main>`), matching the inline pattern already established in `app/case-studies/page.tsx`, using existing tokens: orb 1 `background: color-mix(in srgb, var(--color-orange) 16%, transparent)` (or reuse `var(--color-overlay-orange)` directly, which is already `rgba(232,119,34,0.16)`), `top:-160px; right:-120px; 560×560; blur(120px)`; orb 2 `var(--color-overlay-amber)` (already `rgba(245,158,11,0.10)`), `top:1100px; left:-180px; 520×520; blur(130px); reverse` animation; orb 3 uses the **new** `--color-overlay-amber-soft` token (below), `bottom:-160px; left:40%; 600×600; blur(140px)`.
3. Add one new token to `app/tokens.css`, in the existing "Ambient orb / bg glow" numbered section (near `--color-overlay-amber`): `--color-overlay-amber-soft: rgba(245, 158, 11, 0.08);` — no existing token matches this exact opacity (checked: closest is `--color-overlay-amber` at 0.10, a visually distinct value).

**Rationale**: A later `dev` merge (TMS-68) introduced the shared `AmbientOrbs` component and wired it globally into `app/layout.tsx`, so `/construction` now inherits a blue-toned second orb by default — a visible deviation from `TechGrit Construction.dc.html`'s own amber second orb. Per Clarifications 2026-07-23, this feature's mandate (SC-006, literal fidelity) takes precedence over site-wide background consistency for this one page, following the exact precedent `/case-studies` already set for opting out and rendering its own variant.

**Alternatives considered**: 
- Reusing the shared component as-is and accepting the blue orb — rejected per Clarifications 2026-07-23 (Option A chosen over Option B).
- Adding a `variant` prop to `AmbientOrbs` itself (e.g. `<AmbientOrbs variant="construction" />`) instead of a path exclusion + page-local render — rejected: would require passing page identity through `app/layout.tsx` (which doesn't know about individual pages), whereas the path-exclusion pattern already solves exactly this for `/case-studies` without that plumbing; consistency with the existing mechanism outweighs the marginal DRYness a variant prop would offer for a 3-`<div>` block.

## 15. Hero and Integrations-strip rebuild (found during /speckit.implement, 2026-07-23)

**Decision**: When implementing FR-016/017/018 (this session's `/speckit.implement FR-16,17,18` scope), the plan's earlier assessment that `construction-hero.tsx` and `construction-integrations-strip.tsx` needed "no changes" was found to be wrong on direct comparison against `TechGrit Construction.dc.html` — both required a real rebuild, not the audit-only pass originally planned:

- **Hero**: The shipped component was a single-column, centered layout (eyebrow/H1/paragraph/CTAs centered, a 3-column stats row *below* them, then a full-width image *below that*). The reference is a two-column layout (text left, image-with-3-stats-overlaid-on-it right), reordering to image-above-text on a single column below `md:`. Rebuilt to match, reusing existing tokens (`--radius-3xl`, `--color-overlay-amber`, `--color-amber-light`, `--color-border-strong`) plus one new token, `--color-border-amber-soft: rgba(245, 158, 11, 0.22)` (the reference's amber-tinted image-card border has no existing equivalent — closest was `--color-border-orange-medium` at a different hue/opacity). Also corrected the desktop headline size from a previously-shipped `60px` to the spec's `54px` (FR-017).
- **Integrations strip**: The shipped component rendered each partner name as a bordered/glass "pill" badge, in a centered row below a top-only border. The reference is a single row (top **and** bottom border), label left-aligned, partner names right-aligned as plain bold text with no background/border at all. Rebuilt to match, reusing existing tokens (`--color-border-8`, `--color-text-muted`) — no new tokens needed.

**Rationale**: FR-017/FR-018 (and SC-006) require literal fidelity; these were confirmed, concrete structural mismatches, not subjective judgment calls. Both fixes were verified visually via the dev server at mobile (≤560px _sic_, checked ~800px) and desktop (1440px) widths before being marked complete.

**Alternatives considered**: None — once confirmed via direct comparison, these were unambiguous corrections rather than a design decision with multiple reasonable options.

## 16. Hero CTA component and real image (2026-07-23, `/speckit.plan` follow-up)

**Decision**: The hero's two CTAs render via `components/ui/Button.tsx` (`variant="primary"`/`"ghost"`, `size="hero"`) instead of raw `<a className="btn btn-primary btn-lg">`/`<a className="btn btn-ghost btn-lg">` markup. `hero.image` in `construction-content.ts` now points to `/samples/ind-construction.png` (720×360, confirmed via the PNG's IHDR chunk) instead of `null`.

**Rationale**: The user asked for the CTAs to use a shared component "with existing functionality." `components/ui/Badge.tsx` was considered and rejected — it's a non-interactive `<span>` label primitive with no `href`/click support, so using it would silently break both CTAs' navigation (one links to `/contact/`, one scrolls to `#solutions`). `Button` already supports `href` (rendering via `next/link`) and has `primary`/`ghost` variants matching the two CTA styles, so it satisfies "shared component" without a functional regression. Separately, a real photographic asset was found to exist at `public/samples/ind-construction.png` — it did not exist on 2026-07-14 when the spec's `image: null` default and FR-013 placeholder were written (§9), so wiring it in now is a straightforward update, not a design decision with alternatives.

**Alternatives considered**: Using `Badge` as literally requested — rejected (confirmed via reading its source, not assumed) because it cannot function as a link/button at all, which would be a functional regression, not a refactor. Introducing a new `components/ui/` primitive instead of reusing `Button` — rejected: `Button` already covers this exact need (primary/ghost CTA with href), so a new component would be an unjustified duplicate per CLAUDE.md's shared-component reuse rule.

## 17. Advantage section layout (found during 2026-07-23 `/speckit.plan` systematic FR-016–024 audit)

**Decision**: `construction-advantage.tsx` needs a rebuild, not a token-only pass. The shipped component is a centered heading block above a symmetric `md:grid-cols-2` card grid (each point in its own bordered `.card`), and its index number is colored `var(--color-orange)`. FR-022 requires an **asymmetric two-column layout** (~0.8fr/1.2fr, collapsing to one column below `md`): left column = eyebrow + title + description (not centered above); right column = a **top-bordered list** (not a card grid) of the 4 points, each row separated by a hairline bottom-border, with the index rendered in **amber** (mapped to the existing `--color-amber-light` token, per research.md §4's established `#fbbf24` substitution — not a new token).

**Rationale**: Confirmed via direct comparison against `TechGrit Construction.dc.html` during this systematic audit, the same way the Hero/Integrations-strip mismatches were found (research.md §15). Not caught earlier because the original plan's Project Structure entry asserted "no changes identified" without an actual line-by-line comparison.

**Alternatives considered**: None — confirmed structural mismatch, not a judgment call.

**T033 implementation note (2026-07-24, done)**: Rebuilt per the decision above, using `md:grid-cols-[0.8fr_1.2fr]` (an arbitrary-value grid template, since `0.8fr`/`1.2fr` aren't part of Tailwind's default fraction scale) with `gap-[56px]`. The right column uses `border-t`/per-row `border-b` with `border-border-faint` (`rgba(255,255,255,0.10)`, an exact existing-token match). Additional literal values confirmed against the reference during implementation and matched exactly: description 16.5px/1.65 line-height; row title 19px; row description 15px (`--text-sm`, exact match) at `--color-text-60` (0.60 opacity, exact existing-token match, not the `--color-text-faint` (0.58) the shipped version used); index 18px, 34px-wide, `font-display` family. Verified via `javascript_tool` computed-style inspection at desktop (0.8fr/1.2fr ratio, 56px gap, 4 rows, correct colors/sizes) and mobile (collapses to 1 column, no horizontal overflow); `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass clean.

## 18. Impact section responsive grid (found during 2026-07-23 `/speckit.plan` systematic FR-016–024 audit)

**Decision**: `construction-impact.tsx`'s card grid is `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`, adding an intermediate 2-column step at `md:`. FR-023 explicitly requires the grid to collapse **straight from 3 columns to 1** below `md`, with no intermediate 2-column step ("per the reference"). Fix: change to `grid-cols-1 md:grid-cols-3` (drop the `lg:` step, matching the reference's own `data-impact-grid` CSS which only defines a single breakpoint rule at ≤960px).

**Rationale**: Confirmed via direct comparison; the reference's own media query for this grid only has one rule (`@media (max-width:960px){[data-impact-grid]{grid-template-columns:1fr !important;}}`) — no 2-column tablet step exists in the source, unlike Challenges/Solutions which do have one.

**Alternatives considered**: None — confirmed mismatch.

## 19. Final CTA glow color and eyebrow — fixed 2026-07-24 (was deferred 2026-07-23)

**Original finding (2026-07-23, deferred)**: `reusable-components/final-cta.tsx`'s decorative bottom glow uses `rgba(232, 119, 34, 0.28)` (orange, matching the existing `--color-overlay-orange-strong` token), but `TechGrit Construction.dc.html`'s own CTA section glow is `rgba(245, 158, 11, 0.28)` (amber) — a confirmed color mismatch against FR-024. This file is shared with About Us, so the fix was recorded but not actioned pending a decision on whether to change the shared component.

**2026-07-24 decision**: User asked to fix both the glow and the eyebrow to amber. Since `reusable-components/final-cta.tsx` is shared by both Construction and About Us — confirmed via `grep` that exactly these 2 pages import it (Services/Case Studies/Homepage each have their own separate local final-CTA components) — asked whether to change both pages or scope it to Construction only. User chose **Construction only**.

**Implementation**: Added an optional `tone?: "orange" | "amber"` prop to `FinalCta` (default `"orange"`, preserving About Us's existing behavior unchanged — mirrors the exact pattern already established for `SectionEyebrow`'s `tone` prop, research.md §5), switching both the glow background and the eyebrow text color. `app/construction/page.tsx`'s `<FinalCta>` call now passes `tone="amber"`; `app/about/page.tsx`'s call is untouched (implicitly `tone="orange"`). New token added: `--color-overlay-amber-strong: rgba(245, 158, 11, 0.28)` (no existing amber-overlay token matched this opacity — mirrors the naming of the existing `--color-overlay-orange-strong`). The eyebrow color reuses the already-established `--color-amber-light` substitution for the reference's `#fbbf24` (research.md §4), consistent with every other "amber" instance on this page.

**Verification**: `npm run lint`, `npx tsc --noEmit`, `npm run build` all pass clean. Confirmed via `javascript_tool`: Construction's Final CTA glow is `rgba(245,158,11,0.28)` and eyebrow is `rgb(247,183,51)`; About Us's Final CTA glow remains `rgba(232,119,34,0.28)` and eyebrow remains `rgb(232,119,34)` — unchanged.

## 20. Challenges section — additional gaps beyond icons (found 2026-07-23, user-flagged)

**Decision**: T022 (already done) only fixed the 4 mismatched icon paths in `construction-challenges.tsx`. Direct comparison against `TechGrit Construction.dc.html` found further, un-actioned drift in the same file:

- **Header block alignment/width**: Shipped as centered (`mx-auto ... text-center`) at `max-width: 680px`. The reference's header block (eyebrow + title + description) is **left-aligned**, not centered, at `max-width: 760px` — the same "wrongly centered" mistake found earlier in Hero (research.md §15).
- **Grid breakpoint steps**: Shipped as `grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5` — an extra `md:grid-cols-3` step the reference doesn't have, and the 5-column layout only appears at `lg:` (1140px) instead of `md:` (960px). The reference's own `data-prob-grid` CSS only has two rules: 2 columns at ≤960px, 1 column at ≤560px — i.e. **5 columns is the default/base state above 960px**. Correct mapping: `grid-cols-1 sm:grid-cols-2 md:grid-cols-5` (drop the `lg:`/3-col step entirely). This is the same category of bug as the Impact grid fix (research.md §18) and the lifecycle diagram's breakpoint fix (research.md §11) — a recurring pattern of extra/misplaced grid steps across this feature.
- **Icon tile size**: Shipped 44×44px; reference is 40×40px.
- **Card padding**: Shipped `28px 22px`; reference is `22px 20px`.
- **Card gap**: Shipped `gap-5` (Tailwind's default spacing scale); reference is exactly `18px`.
- **Card border-radius**: Shipped via the shared `.card` utility class, which resolves to `--radius-3xl` (22px) site-wide. The reference's Challenges cards use `16px` specifically — a different, smaller radius than `.card`'s default. **Note**: this same radius mismatch likely recurs on the Solutions cards (reference: 18px) and Impact cards (reference: 20px), since all three sections reuse `.card` as-is with no per-section override — flagged here as a pattern worth checking when Solutions (T023) and Impact (T034) are implemented/re-verified, but only the Challenges instance is scoped into a task now (T035), per the user's explicit ask. The existing `construction-advantage.tsx` already has precedent for a per-instance radius override (`className="card rounded-2xl"`), so the same pattern (an added Tailwind radius class alongside `.card`) is the fix, not a change to the shared class.

**Rationale**: User-flagged that "only icons were covered in the previous fix" — direct re-comparison against the reference confirmed multiple additional, concrete mismatches beyond icons, consistent with the pattern established across Hero/Integrations-strip/Advantage/Impact where an initial narrow fix or "no changes identified" assessment missed real drift.

**Alternatives considered**: None — these are confirmed structural/value mismatches, not design decisions with multiple reasonable options.

## 21. GlassCard adoption for Challenges/Solutions/Impact (2026-07-24, user decision)

**Decision**: Adopt `components/ui/GlassCard.tsx` for the three genuine card-grid sections — Challenges, Solutions, Impact — replacing the shared `.card` utility class (and its per-instance override pattern) with 3 new `GlassCardVariant` entries added to the shared component:

- `constructionChallenge`: `rounded-[16px]` (reference: 16px radius), icon tile 40×40px, padding `22px 20px`, matching `TechGrit Construction.dc.html`'s Challenges cards.
- `constructionSolution`: `rounded-[18px]` (reference: 18px radius), icon tile 50×50px (gradient tile), padding `30px 28px`, with the lift + amber-border hover already built into `GlassCard`'s base behavior — matches FR-020's "lift + amber-border hover effect" without extra work.
- `constructionImpact`: `rounded-[20px]` (reference: 20px radius), padding `32px 28px`. Since `GlassCard` renders a plain `<div>` (no `href`/anchor support, same limitation confirmed earlier for `Badge`), each Impact card stays clickable by wrapping the `GlassCard` in an `<a href={caseStudy.link}>` rather than making `GlassCard` itself polymorphic — a smaller, more contained change than adding `as`/`href` support to a component also used by Homepage/Blog.

**Scope explicitly excludes**: Advantage (not a card grid in the reference — T033 already corrects it to a bordered list, and applying `GlassCard` there would be the wrong direction), Integrations strip (plain text strip, no cards), the lifecycle diagram's node pills (custom-positioned, not a generic card grid), and Hero/Final CTA (single glass panels — the user's decision was scoped to "where required" for the 3 repeating card grids, not every glass surface on the page).

**Task sequencing**: A new task **T036** adds the 3 variants to `components/ui/GlassCard.tsx` (must land before the sections that consume them). T023 (Solutions), T034 (Impact), and T035 (Challenges) — already pending for other reasons — now also adopt their respective new variant in the same pass, each depending on T036.

**T036 implementation note (2026-07-24, done)**: `GlassCard.tsx` types each style map (`CARD_VARIANTS`, `ICON_VARIANTS`, `TITLE_VARIANTS`, `DESC_VARIANTS`) as `Record<GlassCardVariant, string>`, so extending the union required an entry in all 4 maps, not just `CARD_VARIANTS`/`ICON_VARIANTS` as originally scoped — otherwise `tsc` fails to compile. `constructionChallenge`'s `TITLE_VARIANTS`/`DESC_VARIANTS` entries have no current consumer (the Challenges card is icon + single bold label, no separate title/description pair) but are populated with a sensible value matching that label's current styling, satisfying the type without being exercised. `npm run lint` and `npx tsc --noEmit` both pass clean with no other files touched.

**Rationale**: `GlassCard` already has the exact hover-lift + border-color-on-hover behavior FR-019/020/023 require, built in — reusing it removes duplicated hover CSS from 3 components. Adding named variants (rather than a per-instance className override, e.g. `className="card rounded-2xl"` as `construction-advantage.tsx` does for `.card`) keeps each section's exact values as a single named, reusable source of truth instead of scattered inline overrides — appropriate here since these 3 variants are unambiguous, fixed, non-negotiable literal values from one reference file, not one-off tweaks.

**Alternatives considered**: Reusing the closest existing variant (`default`/`industry`) without new variants — rejected per the user's explicit choice (Option 1 over Option 2), since it would leave Solutions' radius and both sections' icon-tile sizes a few pixels off the literal reference, conflicting with SC-006. Making `GlassCard` polymorphic (`as="a"`) instead of wrapping in an external anchor — deferred as a larger change to a component shared with Homepage/Blog than this feature needs to make.

## 22. T023/T034/T035 implementation — additional drift found beyond scoped tasks (2026-07-24)

**Decision**: While implementing T023 (Solutions), T034 (Impact), and T035 (Challenges), a fresh line-by-line comparison against `TechGrit Construction.dc.html`'s actual inline styles (read directly, not from memory of earlier passes) turned up further concrete mismatches beyond what tasks.md/research.md §12/§17/§18/§20 had scoped. All are fixed in the same pass since they're in the same files already being touched:

- **Solutions and Impact headers were also wrongly centered**: Both used the same `mx-auto ... text-center` at `max-width:680px` mistake already found and fixed for Challenges (§20) and Hero (§15) — the reference's Solutions/Impact header blocks are left-aligned at `max-width:760px` (Solutions `margin-bottom:40px`, Impact `margin-bottom:38px`). Fixed identically to Challenges.
- **Challenges cards were wrongly centered**: shipped as `text-align:center` with the icon tile `mx-auto`-centered; the reference's Challenges cards (icon + label) are left-aligned block content, no centering at all. Fixed by dropping `text-center`/`mx-auto`.
- **Challenges icon stroke was orange, reference (and FR-019's own "amber stroke icon" wording) is amber**: `stroke="var(--color-orange)"` → `stroke="var(--color-amber-light)"`.
- **Challenges/Solutions icon-tile border-radius used `--radius-lg` (14px) for both**: the reference uses 10px (Challenges) and 13px (Solutions) — neither matches any existing radius token, so both are expressed as arbitrary Tailwind values (`rounded-[10px]`/`rounded-[13px]`) in the new `constructionChallenge`/`constructionSolution` `ICON_VARIANTS` entries, consistent with how this file already expresses one-off, non-reused pixel values (e.g. `industry`'s `text-[23px]`).
- **Solutions icon tile was a flat color, reference is a two-stop gradient with a border**: `background:rgba(247,183,51,0.14)` → `linear-gradient(140deg, color-mix(in srgb, var(--color-amber) 22%, transparent), color-mix(in srgb, var(--color-orange) 10%, transparent))` with `border-color: color-mix(in srgb, var(--color-amber) 30%, transparent)` — reusing the exact `color-mix()`-on-token pattern `app/case-studies/_components/architecture-diagram.tsx` already established for this kind of one-off gradient tile (no new token needed; percentages are one-off values the same way that file's are).
- **Solutions/Impact card lift-on-hover was `-5px`, reference is `-6px`**: both `style-hover` blocks in the reference read `transform:translateY(-6px)`. Fixed in `CARD_VARIANTS`. **Challenges cards have no `style-hover` at all in the reference** (unlike Solutions/Impact) — confirmed against FR-019's spec text, which (unlike FR-020/FR-023) never mentions a hover effect — so `constructionChallenge`'s hover lift was removed entirely and its `GlassCard` usage passes `hoverBorderColor=""` to suppress the shared component's default border-color-on-hover too.
- **Various one-off title/description font-sizes and colors were off** (Solutions title 18px→19px; Impact title 18px→18.5px; Solutions/Impact description used `--color-text-faint`/15px, reference is `--color-text-muted`(0.62 opacity, exact token match)/14.5px; Impact metric 34px→40px; Impact "Case Study 0X" label used `--text-xs`(14px)/`--color-text-faint`(0.58), reference is `--text-2xs`(12.5px, exact token match)/`--color-text-45`(0.45 opacity, exact token match); Impact's "Read case study" link used `--color-orange`, reference is `--color-amber-light`/`#F7B733`, an exact existing-token match). All fixed to the reference's literal values, using an existing token wherever one matched exactly and an arbitrary value otherwise (matching this file's pre-existing convention for one-off heading sizes).
- **Solutions grid gap was `gap-5`(20px), reference is `22px`**: fixed to `gap-[22px]` (Impact's grid already used the correct `gap-6`≈`24px`... no — also corrected to `22px` to match its own `data-impact-grid` CSS, which uses the same `22px` gap as Solutions).

**Explicitly not touched (deferred, shared components/tokens)**: the reference's eyebrow/accent color for "amber" tone sections (`#fbbf24`) differs slightly from this design system's existing `--color-amber-light` token (`#F7B733`) used by `SectionEyebrow`'s `tone="amber"` — this is a shared component used by Homepage/Blog/other Construction sections already, so changing its color is a global token decision out of scope for a Construction-page-only pixel-fix, the same reasoning already applied to the Final CTA glow color (§19). The Challenges header description paragraph's exact color (`rgba(255,255,255,0.66)`) has no existing token match and wasn't flagged in the original §20 audit; left as `--color-text-secondary` (0.72) rather than introducing a new token for a ~6%-opacity, unflagged difference.

**Rationale**: Same pattern established throughout this feature — a fresh, direct comparison against the reference's actual markup (not a re-statement of an earlier assessment) keeps finding real, concrete drift. All of it was fixed in this pass since every file involved was already being edited for its scoped task, and all fixes use either an exact existing token or the established `color-mix()`/arbitrary-value conventions already present elsewhere in this codebase — no unjustified new tokens were added.

**Verification**: `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass clean. Confirmed via `javascript_tool` DOM/computed-style inspection (screenshots are unreliable in this environment) at desktop (1000px+), tablet (768px), and mobile (375px): Challenges grid is 5/2/1 columns, Solutions 3/2/1, Impact 3/1/1 (no 2-column step, per FR-023) — all matching the breakpoint contract — with correct radius/padding/gap/font-size/color values confirmed via computed styles at desktop width, and no horizontal overflow at mobile width.

## 14. Verification approach (cross-reference)

**Decision**: No new decision here — this simply cross-references spec.md's Clarifications 2026-07-23 answer already on record: verification is a manual, checklist-driven side-by-side comparison (`TechGrit Construction.dc.html` vs `/construction`) executed as a Polish-phase task, using quickstart.md's new "UI Fidelity Audit" section (added in this re-plan) as the literal checklist. See spec.md SC-006 and quickstart.md.

## 23. T028 — full 8-section audit (2026-07-24, done)

**Decision**: With every per-section task (T022–T027, T030–T036) complete, ran the full quickstart.md "UI Fidelity Audit" checklist against all 8 sections at desktop (1280px/1000px), tablet (768px/950px), and mobile (375px). The four sections not yet individually re-verified in this re-plan (Global chrome, Hero, Integrations strip, Final CTA — all fixed in earlier `/speckit.implement FR-16,17,18` / `FR-19,T022` passes but never checked off against this specific checklist) were confirmed via `javascript_tool` computed-style inspection:

- **Global chrome**: body background `rgb(10,24,34)` (`--color-ink`); 3 orbs present at the exact documented colors/sizes/positions; no blue-toned overlay found anywhere on the page (shared `AmbientOrbs` correctly excluded).
- **Hero**: two-column grid ratio confirmed (~1.05fr/0.95fr); gradient text present; all 3 proof-stat values present; mobile collapse confirmed via computed `order` (image renders before text, i.e. visually reordered above), no horizontal overflow.
- **Integrations strip**: top+bottom border confirmed; all 5 partner names present as plain text; wraps with `flex-wrap` at mobile with no overflow.
- **Final CTA**: both CTAs' `href`s confirmed correct (placeholder `#` for Calendly, real `mailto:` with prefilled subject for email); known amber-vs-orange glow gap re-confirmed present and still intentionally deferred (research.md §19).

No new drift was found in this pass — every section had already been corrected in its own scoped task. Full-page sweep at tablet width (768px) confirmed no horizontal overflow anywhere on the page. The pre-existing, unrelated React console warning noted in §11's implementation note was re-confirmed present on `/about` as well, ruling it out as a regression from this feature.

**Verification**: `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass clean.

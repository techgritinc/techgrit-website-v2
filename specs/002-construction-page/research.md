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

**Decision**: Implement a typed local content module (`app/construction/_data/construction-content.ts`) that exports the Construction page content in the same CMS-shaped structure as `specs/001-about-us-page/contracts/about-us-page-response.json` (a `data.sections` ordered array of typed, `__component`-discriminated entries), documented in `specs/002-construction-page/contracts/construction-page-response.json`.

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

**Decision**: Implement the diagram as its own component (`construction-lifecycle-diagram.tsx`) driven by an ordered list of 8 `LifecycleNode` entries (name only). On `lg:` and above, render a central "OrbitAI Engine" circle with 8 fixed-position connector nodes (reproducing the reference's corner-anchored layout and animated dashed SVG connector paths). Below `lg:` (960px, matching this repo's `md` breakpoint per Principle II), fall back to a simple 2-column stacked grid of the same 8 node names — reproducing the reference's own `data-flow`/`data-flow-stack` toggle behavior via a Tailwind responsive utility (`hidden lg:block` / `grid lg:hidden`) instead of the reference's inline `display:none`/JS-free CSS-only swap.

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

# Phase 0 Research: About Us Page

## 1. Route and file placement

**Decision**: Add the page at `app/about/page.tsx`, with its section components colocated under a private (non-routable) folder `app/about/_components/`, and its dummy content module under `app/about/_data/`.

**Rationale**: The constitution's Additional Constraints state the app is "one Next.js App Router application rooted directly at `app/`" with no `components/`/`lib/` split yet, and that "new code MUST be added inside the existing `app/` tree rather than pre-creating a folder structure the implementation hasn't reached yet." Next.js App Router's underscore-prefixed folders (`_components`, `_data`) are excluded from routing, so this colocates all About-Us-specific code with its route without introducing a new top-level shared directory.

**Alternatives considered**:
- A top-level `components/about-us/` directory — rejected: introduces the very `components/` split the constitution says to defer until deliberately introduced.
- A single monolithic `app/about/page.tsx` with all ten sections inline — rejected: the user explicitly asked for a component-wise build ("about-us-hero" component etc.), and FR-011 requires each section to be an independent, self-contained block.

## 2. Header/Footer scope

**Decision**: This feature implements only the About Us page's own content sections (hero through closing CTA). It does not implement the site header/nav or footer.

**Rationale**: Confirmed with stakeholder during `/speckit.specify` — out of scope for this feature (see spec.md checklist notes). Separately, the constitution's Principle III already mandates header/footer be built as exactly one shared `Header`/`Footer` component wired through the Next.js root layout (`app/layout.tsx`), not per-route — so it does not belong to this page-specific feature regardless.

**Alternatives considered**: Building header/footer inline on the About page to make it "complete" — rejected: would violate Principle III (one shared component, not per-route markup) and duplicate work once the shared layout feature lands.

## 3. Content source shape

**Decision**: Implement a typed local content module (`app/about/_data/about-us-content.ts`) that exports the About Us page content in the exact shape of `specs/001-about-us-page/contracts/about-us-page-response.json` (a `data.sections` ordered array of typed section entries). The page fetches/reads this module the same way it would read a real API response.

**Rationale**: FR-015 and the spec's Assumptions require content to come from a structured, ordered, typed `sections` list rather than hard-coded markup per section, so content can later be swapped for a live CMS response without changing section components. Modeling the local dummy module after the same shape now means only the data-fetching call (not the component props) needs to change when a real API is wired up later.

**Alternatives considered**:
- Hard-coding each section's copy directly as JSX literals in its component — rejected: violates FR-015 and would require touching component code for every future content change.
- Fetching the dummy JSON contract file at runtime via `fetch()`/`fs.readFile` — rejected as unnecessary indirection for this feature: a typed TS module co-located with the page is simpler, type-safe, and equally swappable later; the JSON contract file remains the authoritative reference shape for that future swap.

## 4. Styling approach

**Decision**: Style every section using existing `app/tokens.css` custom properties and the existing `app/globals.css` utility classes (`.btn`/`.btn-primary`/`.btn-ghost`, `.card`/`.card-solid`, `.glass-card`, `.eyebrow`, `.badge`, `.text-gradient`, `.divider`, `.container`/`.section`) plus Tailwind utilities generated from the `@theme inline` block. No new hardcoded hex/px values or new global classes unless a genuinely new primitive is needed (e.g., a stat-tile look not covered by an existing class) — and if so, add it to `globals.css` in its own section, per Principle III, rather than inlining it in a component.

**Rationale**: Constitution Principle I (Token-Only Styling) and Principle III (Centralized Utility-Class Component Library) are non-negotiable gates. The reference file (`TechGrit About.dc.html`) uses colors/radii/spacing that already map 1:1 onto existing tokens and classes (confirmed by the constitution's own analysis).

**Alternatives considered**: Writing new component-scoped CSS Modules per section — rejected: duplicates styling infrastructure the project has already centralized in `globals.css`/`tokens.css`.

## 5. Breakpoint enforcement (NEEDS CLARIFICATION resolved)

**Decision**: Add three custom breakpoint overrides to the `@theme inline` block in `app/globals.css` — `--breakpoint-sm: 560px`, `--breakpoint-md: 960px`, `--breakpoint-lg: 1140px` — so that Tailwind's `sm:`/`md:`/`lg:` responsive prefixes collapse at the exact pixel values the constitution's Principle II mandates. Use these prefixes (not raw `@media` queries) in the About Us section components for all responsive layout changes (columns collapsing, grid resizing, padding steps).

**Rationale**: `globals.css`'s own comment block says breakpoints "match HTML design files exactly" at 1140/960/560 and instructs "In Tailwind: use sm:, md:, lg: prefixes" — but the current `@theme inline` block does not actually override Tailwind v4's default breakpoints (640px/768px/1024px), so today `sm:`/`md:`/`lg:` would silently collapse at the wrong widths. Confirmed via Tailwind CSS v4.3.2 (installed version): responsive breakpoints are configured via `--breakpoint-*` keys in `@theme`. Since this repo has no other feature depending on the current (wrong) default breakpoints, adding the override is a safe, additive fix that makes the existing documented contract actually true, satisfying User Story 4 (P1) and FR-012 without inventing a new breakpoint scheme.

**Alternatives considered**:
- Using raw `@media (max-width: 960px) { ... }` per component, matching the reference file's inline style verbatim — rejected: duplicates the breakpoint values across every component instead of centralizing them once (violates the spirit of Principle I: declare once, consume everywhere), and diverges from the constitution's own instruction to use Tailwind prefixes.
- Leaving Tailwind defaults unchanged and accepting 640/768/1024 collapse points — rejected: silently breaks the "matches HTML design files exactly" requirement and would make the About page collapse at different widths than any future page built the same way.

## 6. Images (hero showcase + culture gallery)

**Decision**: Use `next/image` for the showcase image and all culture gallery photos. Since content comes from the dummy module (local, not yet real remote CDN URLs), source local placeholder image files under `public/images/about-us/` matching the paths already used in `contracts/about-us-page-response.json`, imported via the `src` string form (not static `import`, since paths come from data, not literal imports) with explicit `width`/`height` supplied by the content entry. The showcase image (likely the largest above-the-fold image after the hero text) uses the `preload` prop; gallery photos use the default `loading="lazy"`.

**Rationale**: `next/image` (docs confirmed via `node_modules/next/dist/docs/01-app/03-api-reference/02-components/image.md`, Next 16.2.10) requires explicit `width`/`height` for any non-statically-imported `src`, and Next 16 deprecated `priority` in favor of `preload` — using the old `priority` prop here would target a removed/deprecated API. FR-013 requires a descriptive placeholder when an image is unavailable; `next/image` combined with a conditional placeholder block (rendered when a content entry's image field is absent) satisfies this without extra libraries.

**Alternatives considered**: Plain `<img>` tags — rejected: loses Next.js's automatic responsive `srcset`/lazy-loading, which materially helps the mobile/tablet performance goals in User Story 4.

## 7. Reveal-on-scroll animation

**Decision**: Reuse the existing `tgrise` keyframe and `[data-rise]` utility class already defined in `globals.css` for the hero's staggered entrance, and implement a small shared client component (`app/about/_components/reveal-on-scroll.tsx`, `"use client"`) using `IntersectionObserver` for the below-the-fold section reveals — mirroring the reference file's `componentDidMount` behavior but as a plain React `useEffect` hook, not a `DCLogic` subclass.

**Rationale**: Constitution Principle IV requires the reference file's `class Component extends DCLogic { componentDidMount() {...} }` pattern to be re-authored as ordinary React state/effects, never transcribed. Principle III requires reusing the existing `tgrise` keyframe rather than inventing a new one. The spec's edge cases require content to remain fully visible even if the observer/animation fails (safety fallback), which the shared component should implement once (a timeout fallback, matching the reference's `_safety` timeout intent) rather than duplicating per section.

**Alternatives considered**: CSS-only `@starting-style`/scroll-driven animations — rejected for this pass: broader browser-support and testing surface than the small, already-proven `IntersectionObserver` + `tgrise` combination; can be revisited later without changing component contracts.

## 8. Testing approach

**Decision**: No automated test tasks. Verify manually via `npm run dev`, checking each section at mobile (~375–430px), tablet (~768–1024px), and desktop (~1280px+) widths, plus `npm run lint` and `npm run build` (already gated by the Husky pre-commit hook).

**Rationale**: Constitution's Development Workflow section states no test framework (Vitest/Jest) is configured anywhere in the repo today, and explicitly warns not to "silently invent a coverage target." The spec did not request tests or a TDD approach.

**Alternatives considered**: Introducing Vitest/RTL for this feature — rejected: out of scope for a single content page and would be a unilateral tooling addition the constitution flags as a "known gap, not a standard to preserve" (i.e., a deliberate future decision, not one to make inside this feature).

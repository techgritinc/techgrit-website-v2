# Phase 0 Research: Services Page

## 1. Route and file placement

**Decision**: Add the page at `app/services/page.tsx`, with section components colocated under
`app/services/_components/` and its dummy content module under `app/services/_data/`.

**Rationale**: This branch's current `app/` tree has no route groups — `app/about/` (the closest
precedent, TMS-65) lives directly at the app root using Next.js's underscore-prefixed private
folders (`_components`, `_data`), not inside any `(marketing)`-style group. Matching that exact
shape keeps the Services page consistent with its nearest sibling and avoids introducing a new
top-level structure the constitution's Additional Constraints say not to pre-build.

**Alternatives considered**:
- A top-level `components/services/` directory — rejected: would introduce the very
  `components/`-for-route-content split the constitution defers until genuinely needed across
  routes (unlike `Header`/`Footer`, nothing here is consumed by more than one route).
- Nesting under a `(marketing)` route group — rejected: no such group exists in this branch's
  current tree (`app/about/` is not grouped either); introducing one now for a single page would be
  unrequested structure, not a requirement of this feature.

## 2. Header/Footer scope

**Decision**: This feature implements only the Services page's own content sections (hero through
closing CTA). It does not modify `Header.tsx`, `Footer.tsx`, or `components/layout/footer-config.ts`
in any way.

**Rationale**: spec.md FR-011 requires reusing the existing shared Header/Footer "as-is." TMS-63's
own spec.md described the footer's quick-link group as varying per page (its FR-008), but the
shipped `components/layout/footer-config.ts` exports one fixed `FOOTER_LINK_GROUPS` array rendered
identically on every route — there is no per-route lookup in `Footer.tsx` today, and that group
already contains a generic "Services" heading linking to `/services`. Building the per-route
mechanism TMS-63's spec envisioned but never shipped would mean modifying `Footer.tsx` itself
(adding route-awareness, e.g. via `usePathname` + a lookup table) — a change to shared layout
chrome that is materially larger than "add a config entry," and squarely TMS-63's/the shared
layout's own scope to close, not this page-content feature's.

**Alternatives considered**:
- Adding a route-keyed entry to `footer-config.ts` for `/services` — rejected: with no per-route
  read mechanism in `Footer.tsx`, a new config entry would simply go unused; shipping unused
  content is worse than shipping nothing.
- Modifying `Footer.tsx` to become route-aware as part of this feature — rejected: out of scope
  per FR-011 ("reuses the site's existing shared header and footer... rather than defining its
  own"); this is shared cross-route infrastructure that belongs to a footer-focused feature, not a
  single page's content build.
- Editing the existing generic "Services" footer links (currently pointing at bare `/services`) to
  point at the new in-page anchors instead — deferred, not rejected outright: harmless and easy,
  but not required by any FR in this spec and touches shared footer copy outside this feature's
  stated boundary; left as a follow-up for whoever picks up the footer per-route gap.

## 3. Content source shape

**Decision**: Implement a typed local content module (`app/services/_data/services-content.ts`)
exporting the page content as an ordered `sections` array of typed entries (hero, overview,
serviceDetail ×3, finalCta), shaped and documented directly in `app/services/_data/types.ts` /
`data-model.md` — without a separate published JSON contract file under a `contracts/` directory.

**Rationale**: FR-012 requires content to come from "a structured, ordered content definition
rather than hard-coded, one-off markup." The About Us page additionally published a standalone
`contracts/about-us-page-response.json` because its spec explicitly modeled the content as "a
dummy/mock version of a content API response" with its own contract artifact (About Us spec
Assumptions). This feature's spec has no equivalent requirement for a separate publishable
contract — FR-012 only requires the structured/ordered shape, which a documented TypeScript
discriminated union already satisfies without the extra artifact. `data-model.md` (Phase 1) is the
single source of truth for the shape instead.

**Alternatives considered**:
- Hard-coding each section's copy as JSX literals — rejected: violates FR-012.
- Publishing a `contracts/services-page-response.json` mirroring About Us — rejected as unneeded
  duplication for this feature: nothing in spec.md asks for a portable API-response contract, and
  the typed module plus `data-model.md` already gives the same swap-later property (only the
  fetch/read call changes if a live CMS is wired up in the future) with one less artifact to keep
  in sync.

## 4. Styling approach

**Decision**: Style every section using existing `app/tokens.css` custom properties and existing
`app/globals.css` utility classes (`.card`, `.eyebrow`/`SectionEyebrow`, `.badge-blue`/
`.badge-orange`/`.badge-teal`, `.tg-container`, `.section`) plus Tailwind utilities generated from
the `@theme inline` block, using the `tg-sm:`/`tg-md:`/`tg-lg:` breakpoint prefixes already defined
there. No new hardcoded hex/px values and no new global classes, with one narrow exception (§7).

**Rationale**: Constitution Principle I (Token-Only Styling) and Principle III (Centralized
Utility-Class Component Library) are non-negotiable gates. Every color needed — including the
per-service blue/orange/teal identity from the UI Design Approach — already exists as a token
(`--color-blue-light`, `--color-orange`/`--gradient-brand`, `--color-teal-light`) and already has
matching `.badge-blue`/`.badge-orange`/`.badge-teal` classes in `globals.css`.

**Alternatives considered**: New component-scoped CSS Modules per section — rejected: duplicates
styling infrastructure already centralized in `globals.css`/`tokens.css`.

## 5. Breakpoint prefixes: `tg-*` vs. plain `sm:`/`md:`/`lg:`

**Decision**: Use the `tg-sm:`/`tg-md:`/`tg-lg:` Tailwind prefixes for all Services page
responsive layout (columns collapsing, grid resizing), matching the convention already used by the
Contact Us form (`app/(marketing)/contact/_components/contact-hero-form.tsx` on its own branch)
rather than the plain `md:` prefix seen in some About Us components.

**Rationale**: `app/globals.css`'s `@theme inline` block defines both a plain `--breakpoint-sm/md/lg`
override (560/960/1140 — the same values, added per About Us page's research.md §5) and a
dedicated `--breakpoint-tg-lg/tg-md/tg-sm` set at the same three values, with a comment noting the
`tg-*` set exists so the 1140/960/560 contract can be targeted "alongside Tailwind's default
xl/2xl breakpoints" without ambiguity. Since both resolve to identical pixel values today, this is
not a functional fix (unlike About Us page's research.md §5) — it's a consistency choice: the
`tg-*` prefix is the newer, unambiguous convention and the one already used by this page's
downstream sibling (Contact page CTA button), so new work should follow it rather than the older,
now-duplicated plain prefix.

**Alternatives considered**: Using plain `md:`/`lg:` to match `about-us-process.tsx`/
`about-us-values.tsx` — rejected: those predate the `tg-*` prefixes' introduction; matching the
more recent convention avoids this feature adding a third style to an already-doubled scheme.

## 6. Images (overview cards + service detail sections)

**Decision**: Use `next/image` for the three overview card images and the three service detail
images. Source local placeholder image files under `public/images/services/`, referenced via the
`src` string form (paths come from the typed content module, not static imports) with explicit
`width`/`height` from each content entry.

**Rationale**: Matches the About Us page's established approach (`next/image`, explicit
dimensions for non-statically-imported `src`, per Next 16.2.10 docs). FR-010 requires a
descriptive placeholder when an image is unavailable, satisfied the same way About Us does it: a
conditional placeholder block rendered when a content entry's image field is absent.

**Alternatives considered**: Plain `<img>` tags — rejected: loses responsive `srcset`/lazy-loading,
which the responsive-readability requirements (User Story 4, FR-009) benefit from.

## 7. `SectionEyebrow` accent-color extension

**Decision**: Add one optional `accentColor?: string` prop to `reusable-components/section-eyebrow.tsx`,
defaulting to the component's current hardcoded `var(--color-orange)` so every existing caller
(About Us page's six usages) is unaffected. The Services page's three detail sections pass
`accentColor="var(--color-blue-light)"` / the orange default / `accentColor="var(--color-teal-light)"`
respectively.

**Rationale**: The UI Design Approach's per-service color-identity signature is this page's one
deliberate distinctive device (see plan.md). `SectionEyebrow` already centralizes the eyebrow
tick + label markup; forking a page-local copy to get a different color would directly violate
Principle III's "reuse by component, not re-implement per page." A single optional prop is the
minimal, backward-compatible change.

**Alternatives considered**:
- Forking `services-section-eyebrow.tsx` — rejected: duplicates a 9-line shared component for a
  single-prop difference.
- Overriding color via a wrapping CSS class / `!important` — rejected: fragile, and the component
  already accepts props cleanly; a typed prop is more explicit and discoverable than a CSS override
  contract.

## 8. Reveal-on-scroll composition per section

**Decision**: Reuse `reusable-components/reveal-on-scroll.tsx` (`RevealOnScroll`) as-is, with no
component changes. **Revised 2026-07-15**: each service detail section wraps as exactly **one**
`RevealOnScroll` group around its entire content (heading/description/image row *and* the
approach/capability list below it) — matching the reference file precisely, which wraps a whole
detail section in a single `data-reveal` unit, not two. The hero (uses `data-rise`, not scroll
reveal), overview grid (one group), and closing CTA (one group) are unaffected by this revision.

**Rationale**: The reference's own reveal mechanism (`data-reveal` in the `.dc.html` markup) is
applied once per detail section as a whole; an earlier pass had split this into two separate
`RevealOnScroll` instances (row, then list) as a deliberate motion embellishment, which both
diverged from the reference and was never requested by any FR. Consolidating to one instance per
section is simpler and matches the reference's actual behavior exactly.

**Alternatives considered**: Keeping the two-stage reveal as a harmless motion enhancement —
rejected once exact reference parity was explicitly requested; the reference provides no basis for
a two-stage reveal, so keeping it would be an unrequested deviation.

## 9. Hero verb → detail-section anchor links (SUPERSEDED 2026-07-15)

~~**Decision**: In the hero headline "Design, build, and ship AI-first software.", wrap "Design",
"build", and "ship" each in an anchor that scrolls to the matching service detail section.~~

**Superseded**: the stakeholder explicitly requested exact, unembellished parity with
`TechGrit Services.dc.html`, whose H1 is plain, unlinked text. This device was reverted — the
hero headline now renders as plain text with only its gradient-highlighted phrase ("AI-first
software.") styled, matching the reference exactly. `HeroSection.titleAnchors` was removed from
the data model; `HeroSection.titleHighlight` was added in its place (mirroring the About Us page's
own `titleHighlight` field) to drive the gradient span. The secondary hero CTA ("Explore Services")
still provides the same first-section jump the reference itself offers — no navigation capability
was lost, only the extra in-headline links.

## 10. Both CTAs navigate to `/contact`

**Decision**: The hero's and the closing section's "Schedule a Consultation" actions are both plain
Next.js `<Link href="/contact">` (or equivalent), not a `mailto:` action.

**Rationale**: Directly implements spec.md's 2026-07-15 Clarification and superseded Assumption —
both calls-to-action must share the Contact Us page as their destination; the reference file's
closing-section `mailto:` behavior is explicitly not carried into this feature.

**Alternatives considered**: None — this was a direct, unambiguous stakeholder clarification, not
an open design decision.

## 11. Testing approach

**Decision**: No automated test tasks. Verify manually via `npm run dev`, checking each section at
mobile (~375–430px), tablet (~768–1024px), and desktop (~1280px+) widths, plus `npm run lint` and
`npm run build` (already gated by the Husky pre-commit hook).

**Rationale**: Constitution's Development Workflow section confirms no test framework
(Vitest/Jest) is configured anywhere in the repo. spec.md did not request tests or a TDD approach.

**Alternatives considered**: Introducing a test framework for this feature — rejected: out of
scope for a single content page and would be a unilateral tooling decision the constitution
explicitly defers.

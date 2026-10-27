# Phase 0 Research: Case Studies Listing & Detail Pages

## 1. Route and file placement

**Decision**: Add the list page at `app/case-studies/page.tsx` and the detail page at
`app/case-studies/[slug]/page.tsx`, with section components colocated under
`app/case-studies/_components/` and the content module under `app/case-studies/_data/`.

**Rationale**: Matches the exact shape used by `app/services/` (TMS-66) and `app/about/` (TMS-65) —
no route groups exist in this tree today, and this feature's two pages don't warrant introducing one.
The detail page needs a dynamic segment (`[slug]`) since FR-004 requires every case study to have its
own addressable page and FR-016 requires a "not found" outcome for an unknown identifier — Next.js's
built-in `notFound()` (triggered from inside the page when the slug doesn't resolve) is the standard
App Router mechanism for this, requiring no new infrastructure.

**Alternatives considered**:
- A top-level `components/case-studies/` directory — rejected for the same reason as TMS-66's
  research.md §1: nothing here is consumed by more than one route.
- A single `app/case-studies/page.tsx` with query-string-based detail view instead of a nested
  dynamic route — rejected: loses shareable/bookmarkable per-case-study URLs, which FR-004 and SC-002
  ("working link that opens a detail page") require as real distinct pages, not a client-side view
  toggle.

## 2. Header/Footer scope

**Decision**: This feature implements only the case-studies list and detail page content. It makes no
changes to `Header.tsx`, `Footer.tsx`, `components/layout/nav-config.ts`, or
`components/layout/footer-config.ts`.

**Rationale**: Both files already contain working `/case-studies` entries (`nav-config.ts`'s
Resources dropdown, `footer-config.ts`'s Company group) from earlier work — FR-011 requires reusing
the shared header/footer exactly as-is, so there is nothing left to wire up.

**Alternatives considered**: None — this is a straightforward confirmation, not an open decision.

## 3. Content source shape

**Decision**: A typed local content module — `app/case-studies/_data/types.ts` (types) and
`app/case-studies/_data/case-studies-content.ts` (data) — exporting an ordered array of `CaseStudy`
records plus one shared `CANONICAL_NARRATIVE` object (the single fully-narrated case study from the
reference, reused as placeholder narrative for every record per spec.md's Assumptions). No separate
`contracts/` artifact.

**Rationale**: FR-012/SC-005 require the page/section structure to survive a future swap to a managed
content source unchanged — a documented, typed array already gives that property. TMS-66's
research.md §3 established that a separate publishable JSON contract is only warranted when the spec
itself asks for an API-response contract (as About Us's did); TMS-68's spec has no such requirement.

**Alternatives considered**:
- Duplicating the full narrative into each of the 6 records — rejected: needlessly repeats ~40 lines
  of text six times; a single shared `CANONICAL_NARRATIVE` referenced by every record's `narrative`
  field is simpler and makes the "this is placeholder content" nature explicit at the type level
  (see data-model.md).
- Publishing a `contracts/case-studies-response.json` mirroring About Us — rejected as unneeded
  duplication, same reasoning as TMS-66 §3.

## 4. Styling approach

**Decision**: Style every section using `app/tokens.css` custom properties, existing `app/globals.css`
utility classes (`.card-solid` for case-study cards — already commented "Blog / Case Study cards" in
source, `.eyebrow`/`SectionEyebrow`, `.badge-blue`/`.badge-teal`), and Tailwind utilities from the
`@theme inline` block. No new hardcoded hex/px values.

**Rationale**: Constitution Principle I and III are non-negotiable gates. `.card-solid` already exists
specifically for this use case (solid `--color-ink-card` background, `radius-2xl`) — reusing it avoids
re-implementing a card treatment `globals.css` already centralizes.

**Alternatives considered**: New component-scoped CSS Modules — rejected: duplicates centralized
styling infrastructure, same reasoning as TMS-66 §4.

## 5. Breakpoint prefixes

**Decision**: Use the `tg-sm:`/`tg-md:`/`tg-lg:` (560/960/1140) Tailwind prefixes for all responsive
layout — grid collapsing, metrics-strip wrapping, the 2-col detail body collapsing to one column, and
the team-panel aside reflow.

**Rationale**: This is the newer, unambiguous convention already adopted by TMS-66 (research.md §5)
and used elsewhere in the codebase; new work should follow it rather than the older duplicated plain
`sm:`/`md:`/`lg:` prefixes.

**Alternatives considered**: Plain `md:`/`lg:` — rejected for the same reason as TMS-66 §5.

## 6. Accent-color system and glow/gradient mechanism

**Decision**: Define `type CaseStudyAccent = "blue-light" | "blue" | "orange" | "amber" | "teal-light"
| "yellow"` in `types.ts`, each mapping 1:1 to an existing token (`--color-blue-light`, `--color-blue`,
`--color-orange`, `--color-amber`, `--color-teal-light`, `--color-yellow`). Card cover-gradients and
glow blobs (the reference's runtime `hexA(accent, opacity)` helper) are reproduced with CSS
`color-mix(in srgb, var(--color-X) Y%, transparent)`, computed via a small `accentVar(accent)` +
inline-style helper rather than a new runtime color-manipulation utility.

**Rationale**: All 6 hex values in the reference (`#38bdf8`, `#0284C7`, `#E87722`, `#F59E0B`,
`#2dd4bf`, `#fbbf24`) were confirmed present as named tokens in `app/tokens.css` — no new tokens are
needed (Constitution Principle I gate passes directly). `color-mix()` is the token-only equivalent of
the reference's JS `hexA()` opacity helper: it consumes the existing CSS custom property directly
rather than hardcoding a parallel rgba value per accent, so the accent system stays single-sourced in
`tokens.css`.

**Alternatives considered**:
- Hardcoded `rgba(r,g,b,opacity)` per accent, one set per opacity level used — rejected: duplicates
  the token's color value outside `tokens.css`, becoming stale if a token's hex ever changes.
- A new set of `--color-X-glow`/`--color-X-cover` tokens per accent — rejected as premature: six
  accents × two derived opacities would add 12 new tokens for a purely presentational effect that
  `color-mix()` already expresses inline without expanding the token surface.

## 7. Industry/category tag treatment

**Decision**: Render industry/category labels as plain inline dot-plus-text (an 8px accent-colored
dot + label), matching the reference's actual grid/related-card markup exactly, rather than wrapping
them in a `.badge-*` pill class. The detail page's single category badge (e.g. "Enterprise SaaS") — a
tinted pill in the hero — reuses the existing `.badge-teal` class since its accent (teal-light) is
already one of the two existing tinted variants; no new `.badge-*` variant is added.

**Rationale**: The reference's own grid/related-card markup uses a small colored dot next to plain
text, not a pill/badge shape — Principle IV treats this as visual truth to translate faithfully rather
than substituting an unrequested badge treatment. Only the detail-page hero category tag is a genuine
pill in the reference, and its one specific instance already fits an existing class
(`.badge-teal`) without needing a new `.badge-amber`/`.badge-yellow`/etc. variant, so no additive CSS
is introduced.

**Alternatives considered**: Adding 4 more `.badge-*` variants (amber, yellow, blue, blue-light) to
cover every accent as a pill — rejected: nothing in the reference actually renders those accents as
pills, and Principle IV disfavors inventing a treatment the reference doesn't show.

## 8. Nearest-token resolution for reference's `rgba(255,255,255,0.55)` industry-label color

**Decision**: Use `var(--color-text-faint)` (0.58 opacity) for the industry/category label text color.

**Rationale**: `app/tokens.css`'s text-opacity ladder is `--color-text-secondary` (0.72),
`--color-text-muted` (0.62), `--color-text-faint` (0.58), `--color-text-dim` (0.50),
`--color-text-ghost` (0.42) — `--color-text-faint` (0.58) is the closest existing token to the
reference's inline `rgba(255,255,255,0.55)`, and Principle I requires using an existing token rather
than introducing a new one for a 0.03 difference.

**Alternatives considered**: A new `--color-text-X` token at exactly 0.55 — rejected: the difference
is visually negligible and Principle I favors reuse over adding a token for a 3-point opacity delta.

## 9. Closing CTA banner

**Decision**: Build a new page-local `case-studies-final-cta.tsx` under `app/case-studies/_components/`
matching the reference's exact visual treatment (solid `--color-ink-mid` card, absolute orange blur
blob using an existing overlay token, eyebrow/H2/paragraph/button), reused identically by both the
list page and every detail page. It is not a shared cross-route component.

**Rationale**: A repo-wide check found the only two existing "final CTA" implementations
(`app/services/_components/services-final-cta.tsx`, `app/about/_components/about-us-final-cta.tsx`)
are both page-local duplicates, not a shared component — confirming the established convention is
per-route CTA components rather than a single cross-route one. FR-010's "same...banner already used
elsewhere on the site" requirement is satisfied at the content/behavior level (identical heading
pattern, identical get-in-touch action, identical visual banner treatment) rather than by importing
another route's component, consistent with that convention. Building it once under `case-studies/`
and reusing it for both of this feature's own pages (list + every detail page) avoids duplicating it
a third time within this single feature.

**Alternatives considered**:
- Reusing `ServicesFinalCta` directly via import across routes — rejected: breaks the established
  per-route ownership convention and couples the case-studies route to the services route's file.
- Extracting a new shared `reusable-components/final-cta.tsx` used by all three routes — rejected as
  out of scope: refactoring `services`'s and `about`'s existing CTAs into a shared component is a
  cross-feature cleanup this feature wasn't asked to do; Additional Constraints defer shared
  extraction until genuinely needed, and this feature only needs its own two usages to match, which a
  single page-local component already satisfies.

## 10. Related-case-studies self-exclusion

**Decision**: The "more case studies" section's selection logic explicitly excludes the case study
currently being viewed, per spec.md's Assumptions — even though the reference file's own static
markup happens to include the current case study among its 3 related cards.

**Rationale**: Principle IV explicitly allows normalizing an inconsistency in the reference into
cleaner, spec-compliant behavior rather than copy-pasting a quirk; spec.md's Assumptions section is
unambiguous on this point ("excludes the case study currently being viewed").

**Alternatives considered**: Matching the reference literally (including self) — rejected: directly
contradicts an explicit, already-approved spec Assumption.

## 11. Images

**Decision**: No raster images are used anywhere in this feature. All visual elements (decorative
hero panel, architecture flow diagram, integration chips, card cover art) are inline SVG/CSS, matching
both `.dc.html` reference files exactly.

**Rationale**: Grepping both reference files for image/background-image usage found only inline SVG
markup — no `<img>` tags or raster asset references anywhere in either file. `next/image` is therefore
not needed for this feature, unlike TMS-66/TMS-65.

**Alternatives considered**: None — this is a direct finding from the reference files, not a design
choice.

## 12. Reveal-on-scroll composition

**Decision**: Reuse `reusable-components/reveal-on-scroll.tsx` (`RevealOnScroll`) as-is, with no
component changes. The list page wraps the featured card and the grid each as their own single
`RevealOnScroll` group; the detail page wraps each of the 4 narrative sections and the team panel each
as one `RevealOnScroll` group. Hero sections on both pages use immediate `data-rise` styling (no
scroll trigger, since they're above the fold on load), matching the reference's own `data-reveal`
(scroll-triggered) vs. `data-rise` (immediate) split.

**Rationale**: Directly satisfies FR-014 (animations must not be the sole means of visibility) via
`RevealOnScroll`'s existing 1500ms safety-timeout fallback — no new motion primitive is needed.

**Alternatives considered**: A single page-wide `RevealOnScroll` wrapper — rejected: loses the
staggered per-section reveal the reference and the `frontend-design` skill's motion guidance both
call for.

## 13. Testing approach

**Decision**: No automated test tasks. Verify manually via `npm run dev`, checking the list page and a
detail page at mobile (~375–430px), tablet (~768–1024px), and desktop (~1280px+) widths — including
the team-panel's pinned-to-in-flow reflow and the "not found" outcome for an invalid slug — plus
`npm run lint` and `npm run build` (already gated by the Husky pre-commit hook).

**Rationale**: Constitution's Development Workflow section confirms no test framework is configured
anywhere in the repo; spec.md does not request tests or a TDD approach.

**Alternatives considered**: Introducing a test framework for this feature — rejected: out of scope
for two content pages, same reasoning as TMS-66 §11.

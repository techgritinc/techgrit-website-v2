# Implementation Plan: Blog Page

**Branch**: `TMS-69` | **Date**: 2026-07-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-69/spec.md`

**Note**: This plan was generated manually, following the same precedent as `specs/TMS-66/plan.md`,
`specs/TMS-63/plan.md`, and `specs/001-about-us-page/plan.md`. The repository's actual branch
(`feature/TMS-69-build-dynamic-blog-page`) does not match the numeric `###-feature-name` pattern
`.specify/scripts/bash/setup-plan.sh`/`check-prerequisites.sh` enforce (confirmed: running
`setup-plan.sh` fails with `ERROR: Not on a feature branch. Current branch:
feature/TMS-69-build-dynamic-blog-page`), so this file was created by hand instead, mirroring the
already-established `TMS-<n>` convention; per this repo's existing precedent the shared scripts
themselves were left unmodified. Paths below point at `specs/TMS-69/`, matching this feature's
directory name and its Jira ticket.

## Summary

Build the Blog page (`/blog`) as four content sections (hero, single featured-story panel, topic
filter + post grid, newsletter subscribe panel) composed on one route, each reading its copy from a
typed local content module mirroring the pattern already established by `app/services/_data/` and
`app/about/_data/`, styled entirely with the existing design-token/utility-class system in
`app/tokens.css`/`app/globals.css`. All colors, one radius pair, and one shadow this page needs are
already present, several already comment-annotated for Blog use (research.md §1); a follow-up
non-color audit found six more values already exactly covered by an existing token (direct reuse)
and seven genuinely missing values that must be added as new tokens to `tokens.css` and mapped in
`globals.css`'s `@theme inline` block (`--blur-glow-md`, `--blur-glow-xl`, `--text-blog-hero`,
`--measure-blog-lead`, `--size-42`, `--size-130`, `--size-300` — see research.md §1 for the full
audit and exact values). The page reuses the shared `Header`/`Footer` (`components/layout/`) and
the shared `RevealOnScroll` primitive (`reusable-components/`) as-is, and extends two existing
`components/ui/` primitives in backward-compatible ways rather than forking duplicates: `GlassCard`
gains two new variants (`"blogCard"`, `"blogFeatured"`, research.md §2) for the grid/featured card
shells, and `Badge` gains a new `"accent"` tone (research.md §3) paired with a caller-supplied
inline `style` override for per-post accent tinting. The topic filter is client-side `useState`
filtering of the static post array (no full-page reload, per FR-005), matching the reference's own
`cat` state + `.filter()` approach. The subscribe form is a client-side-only validated state
transition, following the exact pattern already shipped by `app/_home-components/SubscribeBand.tsx`.
The only other net-new shared asset is one additional icon (a decorative network-node graphic)
added to the single consolidated `components/ui/icons.tsx` file, per Constitution Principle III.

## Technical Context

**Language/Version**: TypeScript 5 (strict mode, per `tsconfig.json`)
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (CSS-first
`@theme`, no `tailwind.config.ts`), `next/font` (already wired in `app/layout.tsx`)
**Storage**: N/A — content is a typed, in-repo static module (`app/blog/_data/blog-content.ts`),
following the same shape convention as `app/services/_data/services-content.ts`; no database, no
CMS (see spec.md Assumptions).
**Testing**: No automated test framework is configured in this repo (confirmed gap, not a standard
to introduce here, per constitution Development Workflow); verification is manual (`npm run dev` +
responsive check at mobile/tablet/desktop widths) plus the existing `npm run lint` / `npm run
build` Husky pre-commit gate, per spec.md's per-story "Independent Test" descriptions.
**Target Platform**: Web — Next.js App Router page (`/blog`), server-rendered where possible,
client components only where interactivity requires it (topic filter, subscribe form), responsive
across mobile/tablet/desktop browsers.
**Project Type**: Single web application (existing `app/` tree — no frontend/backend split).
**Performance Goals**: Standard marketing/content-page expectations — no additional numeric target
beyond spec's SC-001 (editorial focus + featured story readable within the first two screens) and
avoiding layout shift (post covers are CSS-generated, not images, so no image-loading shift risk —
see spec.md Assumptions).
**Constraints**: Must comply with constitution Principles I–VI — token-only styling (I), including
adding the seven genuinely-missing tokens identified by research.md §1 to `tokens.css` and mapping
them in `globals.css` rather than hardcoding them; the 1140/960/560 breakpoint contract (II); reuse
of existing `.eyebrow`/`.tg-container`/`.section` utility classes, the `GlassCard`/`Badge`
components (extended in backward-compatible ways per research.md §2/§3 rather than duplicated), and
the shared `RevealOnScroll` component rather than new one-off markup (III); treating `TechGrit
Blog.dc.html` as visual/content reference only — never copying its `x-dc`/`DCLogic`/`{{ }}`/
`sc-for`/`sc-if` scaffolding (IV); the dark-first brand system with the orange→amber gradient
reserved for CTAs/active states (V); and invoking the `frontend-design` skill for this page's UI
Design Approach (VI, see below). Header/Footer reuse is additionally mandated directly by spec.md
FR-012.
**Scale/Scope**: One static content page, 4 sections (hero, featured story, topic filter + 9-post
grid, subscribe panel), static/local content source, no auth, no pagination beyond the fixed
9-post seed set, one client-side form.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Check | Status |
|---|---|---|
| I. Token-Only Styling | All styling uses `var(--token-name)` / Tailwind utilities from `@theme inline`. Every one of the reference's 7 accent hex values already maps to an existing named token (`#38bdf8`→`--color-blue-light`, `#E87722`→`--color-orange`, `#F59E0B`→`--color-amber`, `#2dd4bf`→`--color-teal-light`, `#0284C7`→`--color-blue`, `#fbbf24`→`--color-yellow`, `#a78bfa`→`--color-purple`), and `--color-error`, `--text-blog-card`, `--radius-2xl`, `--radius-4xl`, `--shadow-btn-subscribe` are already present and explicitly comment-annotated for Blog use (research.md §1). A full non-color audit additionally found 6 values already exactly covered by existing tokens (direct reuse: `--space-14`, `--space-9`, `--space-7`, `--color-ink-mid`, `--space-19a`/`--space-19`, `--color-glass`, `--color-border-orange-medium`, `--color-overlay-orange`) and exactly 7 genuinely missing values, which will be added as new tokens to `tokens.css` and mapped in `globals.css`'s `@theme inline` block (`--blur-glow-md: 70px`, `--blur-glow-xl: 115px`, `--text-blog-hero: clamp(40px,5.4vw,58px)`, `--measure-blog-lead: 640px`, `--size-42: 42px`, `--size-130: 130px`, `--size-300: 300px` — see research.md §1). No value is hardcoded outside `tokens.css`. | PASS (with tracked token additions — see Complexity Tracking) |
| II. Documented Breakpoint Contract | Reuses the mandated `lg`/`md`/`sm` (1140/960/560) breakpoints via Tailwind's `lg:`/`md:`/`sm:` prefixes, per spec.md's explicit Assumption overriding the reference's own 980px/640px values. | PASS |
| III. Centralized Non-Duplicated Component Library | Extends `components/ui/GlassCard.tsx` with two new backward-compatible variants (`"blogCard"`, `"blogFeatured"`, research.md §2) for the grid/featured card shells instead of reusing the vanilla `.card-solid` class or forking a bespoke shell; extends `components/ui/Badge.tsx` with a new `"accent"` tone (research.md §3), paired with a caller-supplied inline `style` override (already supported by `Badge`'s existing prop spread) for per-post accent tinting, instead of the bare `.badge` class. Both extensions add new, additive keys/entries only — every existing variant/tone and call site is untouched. Also reuses `FormField`/`Button` for the subscribe form (mirroring `SubscribeBand.tsx`) and `RevealOnScroll` for section reveal. One net-new shared asset: a decorative network-node icon added to the existing single consolidated `components/ui/icons.tsx` file (no matching icon exists yet) — additive, not a fork. | PASS (with tracked component extensions — see Complexity Tracking) |
| IV. Design References Are Visual Truth, Not Copy-Paste Source | `TechGrit Blog.dc.html` is used only to identify sections/copy/layout/data intent; its `x-dc`/`<helmet>`/`DCLogic`/`{{ }}`/`sc-for`/`sc-if` scaffolding is not carried into the React components — reimplemented as plain React state/props/`.map()`/conditional render. Nav/footer markup present in the reference is not rebuilt (out of scope per Assumptions/FR-012). | PASS |
| V. Dark-First Brand System | Page uses the existing dark ink surface, orange→amber gradient reserved for the active filter chip and CTA buttons only, Manrope/Space Grotesk via the already-configured `next/font` setup. No new typography or theme is introduced. | PASS |
| VI. UI Craft via `frontend-design` Skill | This is UI work (tech signal: Next.js/React; content signal: page, hero, card, grid). The skill was invoked during this plan phase — see "UI Design Approach" below. | PASS |
| Additional Constraints (single `app/`-rooted project) | New route-local code lives under `app/blog/` (`page.tsx`, `_components/`, `_data/`), following the `app/services/`/`app/about/` precedent; no new top-level `components/`/`lib/` directory. | PASS |

**Initial gate result: PASS.** Two tracked, justified extensions (new tokens, extended shared
components) are documented in Complexity Tracking below — neither is a violation of the
constitution; both are the constitution's own preferred remediation (add the missing token /
extend the existing component in a backward-compatible way) for a real gap found by the audit.

## UI Design Approach

*Required for UI features per Constitution Principle VI.*

**UI mode detection**: UI mode ON — tech signal matched (Next.js 16 / React 19, this repo's
default) AND content signal matched (spec.md repeatedly uses "page", "hero", "panel", "card",
"grid").

**`frontend-design` skill invocation**: Invoked during this plan phase. Asked specifically: (1) how
to best translate the reference's per-post accent-tinted cover treatment (radial gradient wash +
glow blob + dot-grid texture + tinted tag) into this codebase's conventions without a CSS-in-JS
approach where avoidable; (2) whether the topic-filter row and featured-panel/grid-card treatments
are better composed from existing primitives (`GlassCard`, `Badge`, `.card-solid`) or as new
bespoke route-local components; (3) craft-level polish opportunities (hover/motion/spacing rhythm)
for a content-forward blog page, consistent with the site's existing dark, orange-accented,
glass-morphism aesthetic. The skill returned its generic base guidance (commit to a bold aesthetic
direction, avoid generic "AI slop" patterns, typography/color/motion/spatial-composition
principles) — this repo is not a greenfield brand, so that guidance was reconciled against the
already-established design system rather than applied as fresh art direction.

The skill's guidance, reconciled with this repo's existing tokens/components:

1. **Per-post accent tinting — JS-computed rgba, not CSS `color-mix()`.** The reference's own
   `hexA(hex, a)` helper computes `rgba()` strings from each post's accent hex at several fixed
   alpha values (cover wash, glow blob, tag background/border). `tokens.css` already exclusively
   expresses its color system as static named tokens and literal `rgba()` values — it never uses
   `color-mix()` anywhere. Introducing `color-mix()` here would add a CSS feature not otherwise
   used in the codebase for a single feature's benefit. Instead, each post's accent resolves to one
   of this repo's own named color tokens (all 7 reference hex values already match existing tokens
   — see Constitution Check above), and a small local helper mirrors the reference's `hexA`
   pattern to derive the cover-wash/glow/tag rgba values from that token's hex at render time. This
   keeps per-post tinting data-driven (accent lives in content data, not in per-post CSS classes)
   while staying inside the codebase's existing rgba-literal convention rather than adopting a new
   CSS mechanism.
2. **Primitive reuse vs. bespoke — extend existing shared components, build bespoke composition.**
   - Grid post cards and the featured-story panel reuse `components/ui/GlassCard.tsx`, extended
     with two new backward-compatible variants — `"blogCard"` (grid cards, `rounded-2xl`) and
     `"blogFeatured"` (featured panel, `rounded-4xl`) — rather than the vanilla `.card-solid` class
     or a hand-rolled shell (research.md §2). This keeps every Blog card shell on the same shared
     Tailwind-first primitive `Industry`/`Reimagine` sections already use, with per-instance hover
     border color passed through `GlassCard`'s existing `hoverBorderColor` prop.
   - Category tags reuse `components/ui/Badge.tsx`, extended with a new, neutral `"accent"` tone
     for shape/typography/fallback background (research.md §3), with the post's actual accent color
     applied via a caller-supplied inline `style` override — a mechanism `Badge` already supports
     today via its unmodified prop spread — rather than forking a 5th/6th/7th fixed-color `Badge`
     tone (or `.badge-<color>` class) for topics that don't map 1:1 to a small closed palette.
   - The subscribe panel reuses `FormField` + `Button` exactly as `SubscribeBand.tsx` already does
     for its email input, validation, and submit action — no new form primitive.
   - `RevealOnScroll` wraps the featured panel, the filter+grid section, and the newsletter panel
     individually (three reveal groups, matching the reference's own three `data-reveal` regions),
     satisfying the Edge Cases/SC-006 requirement that content stays fully visible if animation
     doesn't run.
   - What's genuinely bespoke, route-local, and does not fit an existing primitive: the topic
     filter chip row (`TopicFilter`), the featured-story panel's own two-column layout with its
     decorative accent-tinted visual half (`FeaturedPost`), the grid card's own internal layout
     (`BlogPostCard`), and the newsletter panel's specific two-column heading/form composition
     (`NewsletterPanel`) — these are single-feature compositions with no cross-route reuse target
     yet, consistent with Principle III's "nothing moves to `components/` until genuinely consumed
     by more than one route."
3. **Craft polish**: the hero's eyebrow/H1/lead paragraph reuse the exact staggered-entrance
   convention already established by `app/_home-components/Hero.tsx` — Tailwind arbitrary-value
   `animate-[tgrise_0.8s_cubic-bezier(0.2,0.7,0.2,1)_forwards]` plus `[animation-delay:...]` and
   `motion-reduce:` variants at successive delays (matching the reference's own `.05s/.12s/.2s`
   `data-rise` delays), rather than introducing a new stagger mechanism. Hover states across the
   featured panel and grid cards follow the sitewide convention of a translateY lift plus a border
   color brighten (already `GlassCard`'s default hover treatment plus its `hoverBorderColor` prop,
   so no bespoke hover CSS is needed).
   Vertical rhythm between the four sections uses the existing `--space-section-*` token scale.
   The single accent orange→amber gradient (`--gradient-brand`) is reserved for the active filter
   chip and the subscribe submit button only — every per-post accent color is a secondary,
   already-established token, never the brand gradient, preserving Principle V's "never as a
   full-surface fill, only CTAs/borders/text accents" rule (here: the gradient is the *fill* for
   exactly two small CTA-class elements, everything else is border/text/wash-level accent).

**Reconciliation with Principles I–V**: No generic suggestion from the skill needed to be
overridden — every recommendation above resolves to tokens, components, and patterns that already
exist in this codebase (Principle I/III), uses the mandated breakpoint contract (Principle II),
treats the `.dc.html` file as reference only (Principle IV), and stays within the dark-first brand
system with the orange/amber gradient reserved for CTAs/active-state only (Principle V).

**Anchor components / files affected**:

- `app/tokens.css` (MODIFIED) — adds 7 new tokens identified by research.md §1 (`--blur-glow-md`,
  `--blur-glow-xl`, `--text-blog-hero`, `--measure-blog-lead`, `--size-42`, `--size-130`,
  `--size-300`), each in its existing numbered section; purely additive, no existing token changed
- `app/globals.css` (MODIFIED) — maps 6 of the 7 new tokens into the `@theme inline` block (all
  except `--text-blog-hero`, per the existing documented heading-scale exception — see
  research.md §1); purely additive, no existing mapping changed
- `components/ui/GlassCard.tsx` (MODIFIED) — adds `"blogCard"`/`"blogFeatured"` to the
  `GlassCardVariant` union with matching entries in all four existing `Record<GlassCardVariant,
  string>` maps (research.md §2); purely additive, no existing variant changed
- `components/ui/Badge.tsx` (MODIFIED) — adds `"accent"` to `BadgeTone` with a matching
  `TONE_CLASSES` entry (research.md §3); purely additive, no existing tone changed
- `app/blog/page.tsx` (new) — composition root
- `app/blog/_data/blog-content.ts`, `app/blog/_data/types.ts` (new) — typed content
- `app/blog/_components/blog-hero.tsx` (new) — FR-001
- `app/blog/_components/featured-post.tsx` (new) — FR-002, FR-003
- `app/blog/_components/topic-filter.tsx` (new) — FR-004, FR-005
- `app/blog/_components/blog-post-grid.tsx` (new) — FR-004, FR-005, FR-006, FR-007, FR-015
- `app/blog/_components/newsletter-panel.tsx` (new) — FR-008, FR-009, FR-010
- `components/ui/icons.tsx` (MODIFIED) — adds one new decorative network-node icon for the
  featured panel's visual half (additive; no existing icon touched or removed)

## Project Structure

### Documentation (this feature)

```text
specs/TMS-69/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── checklists/
│   └── requirements.md
└── tasks.md              # Phase 2 output (/speckit.tasks — not created by /speckit.plan)
```

No `contracts/` directory is generated for this feature: content is a typed local module rather
than a live API, matching the `TMS-66`/`TMS-63` precedent — the shape lives directly in
`app/blog/_data/types.ts` and is documented in `data-model.md` instead.

### Source Code (repository root)

```text
app/
├── layout.tsx                                  # existing — untouched by this feature
├── globals.css                                 # existing — MODIFIED, maps 6 new tokens into @theme inline
├── tokens.css                                  # existing — MODIFIED, adds 7 new tokens (research.md §1)
├── services/                                   # existing — untouched, sibling page (reference precedent)
└── blog/
    ├── page.tsx                                 # new — Blog route, composes 4 sections in order
    ├── _data/
    │   ├── blog-content.ts                      # new — typed content module (data-model.md BlogPageContent)
    │   └── types.ts                              # new — entity types (FeaturedPost, BlogPost, TopicFilter)
    └── _components/
        ├── blog-hero.tsx                        # new — FR-001
        ├── featured-post.tsx                    # new — FR-002, FR-003
        ├── topic-filter.tsx                     # new — FR-004, FR-005
        ├── blog-post-grid.tsx                   # new — FR-004, FR-005, FR-006, FR-007, FR-015
        └── newsletter-panel.tsx                 # new — FR-008, FR-009, FR-010

reusable-components/
└── reveal-on-scroll.tsx                         # existing — reused as-is, wraps featured/grid/newsletter sections

components/
├── layout/                                      # existing — untouched (Header/Footer reused per FR-012)
└── ui/
    ├── icons.tsx                                # MODIFIED — one new decorative network-node icon added
    ├── GlassCard.tsx                             # MODIFIED — adds "blogCard"/"blogFeatured" variants (research.md §2)
    ├── Badge.tsx                                 # MODIFIED — adds "accent" tone (research.md §3)
    ├── FormField.tsx                             # existing — reused as-is for the subscribe email input
    └── Button.tsx                                # existing — reused as-is for the subscribe submit action
```

**Structure Decision**: Single Next.js App Router project (no frontend/backend split). All new
route-local code lives under `app/blog/` using the same underscore-prefixed private-folder
convention (`_components`, `_data`) already established by `app/services/`/`app/about/`, so
nothing here is treated as a route and no new top-level shared directory is introduced. Cross-
cutting changes are: one small, additive edit to `components/ui/icons.tsx` (adds one icon; nothing
removed or restructured); the 7 new tokens added to `app/tokens.css` and mapped in `app/globals.css`
(research.md §1); and backward-compatible extensions to `GlassCard`/`Badge` (research.md §2/§3).
No shared component is forked, and no existing variant/tone/prop is changed or removed — every
reused primitive (`FormField`, `Button`, `RevealOnScroll`, and the pre-existing `GlassCard`/`Badge`
variants/tones) is used exactly as it already exists today.

## Complexity Tracking

> The Constitution Check above passed with two tracked, justified extensions — both are additive,
> backward-compatible, and are the constitution's own prescribed remediation for a real gap found
> during research, not a deviation from it. Recorded here per the user's explicit directive to
> document token/component-extension decisions before implementation.

| Extension | Why needed | Why this is the simpler/compliant option |
|---|---|---|
| 7 new tokens in `tokens.css`, 6 mapped in `globals.css` (`--blur-glow-md`, `--blur-glow-xl`, `--measure-blog-lead`, `--size-42`, `--size-130`, `--size-300`, plus `--text-blog-hero` unmapped) | research.md §1's exhaustive non-color audit found these 7 reference values have no existing token match | Principle I requires every design value be declared once in `tokens.css`; the rejected alternative (hardcode as Tailwind arbitrary values, e.g. `blur-[70px]`) would violate that rule outright. Adding the token is the compliant path, not a workaround |
| `GlassCard` gains `"blogCard"`/`"blogFeatured"` variants | research.md §2 found no existing shell primitive matches this page's card treatment without introducing a second, parallel card-styling convention (`.card-solid`) alongside the Tailwind-first `components/ui/` convention other sections already use | The user's directive is explicit: "if an existing shared component doesn't satisfy the requirements, extend it in a backward-compatible way instead of creating duplicate components." Extending the union + 4 maps is additive; no existing variant changes |
| `Badge` gains `"accent"` tone | research.md §3 found `Badge`'s 4 fixed tones can't cover 7 per-post dynamic accent colors, and using the bare vanilla `.badge` class instead would bypass the shared component the rest of the app standardizes tags on | Same directive as above — extend `Badge` rather than bypass it or fork a new tag component; the new tone is additive and the accent color itself flows through `Badge`'s already-existing, unmodified `style` prop passthrough |

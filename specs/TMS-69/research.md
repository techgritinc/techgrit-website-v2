# Phase 0 Research: Blog Page

**Feature**: TMS-69 | **Date**: 2026-07-21 | **Input**: spec.md, `TechGrit Blog.dc.html`

No `[NEEDS CLARIFICATION]` markers remain in spec.md (confirmed by `checklists/requirements.md`),
so this research resolves the concrete implementation decisions plan.md's Technical Context and UI
Design Approach depend on, rather than open unknowns.

## 1. Token/class coverage audit — do any new design tokens need to be added?

**Decision**: Colors, one radius pair, and one shadow are fully covered by existing tokens (no
change from the original audit below). A second, exhaustive pass over every remaining non-color
value in the reference (sizing, blur, measure, hero heading scale) found six values already exactly
covered by an existing token (direct reuse, no new token) and seven values genuinely missing, which
must be added to `app/tokens.css` and mapped in `app/globals.css`'s `@theme inline` block per
Constitution Principle I.

**Rationale — colors/radius/shadow (original audit, unchanged)**: A full audit of the reference's 7
unique post-accent hex values and other Blog-specific values against `app/tokens.css` found:

| Reference value | Existing token | Annotation in tokens.css |
|---|---|---|
| `#38bdf8` (Modernization accent) | `--color-blue-light` | — |
| `#E87722` (Product accent) | `--color-orange` | brand accent |
| `#F59E0B` (Methodology accent) | `--color-amber` | — |
| `#2dd4bf` (Engineering accent, "Human-in-the-loop...") | `--color-teal-light` | — |
| `#0284C7` (Industry accent) | `--color-blue` | — |
| `#fbbf24` (Design accent) | `--color-yellow` | — |
| `#a78bfa` (Engineering accent, "Testing strategies...") | `--color-purple` | "Blog category accent — 'Engineering' / 'AI' article tags (violet)" |
| `#fb7185` (form validation error) | `--color-error` | "Error / danger — form validation messages (Blog contact form)" |
| featured-title / card-title `clamp(26px,2.9vw,34px)` | `--text-blog-card` | "Blog/Case Study card title" |
| grid card radius `20px` | `--radius-2xl` | "Blog post cards" |
| newsletter/CTA panel radius `24px` | `--radius-4xl` | "Newsletter/CTA panels" |
| subscribe button shadow `0 10px 26px -10px rgba(232,119,34,.70)` | `--shadow-btn-subscribe` | "Subscribe submit button (same on hover — reference only translates)" |
| success-state green `#34d399` | `--color-green` | "Success — live status, confirmation states" |

The presence of these annotations indicates a prior session (during `/speckit.specify`) proactively
added them in anticipation of this feature.

**Rationale — non-color values, direct reuse (no new token needed)**: A follow-up audit of every
sizing/spacing value in the reference that isn't already covered above found six more values that
already exactly match an existing token:

| Reference value | Existing token | Use |
|---|---|---|
| grid-card avatar diameter `34px` | `--space-14` (`34px`) | Author avatar in `BlogPostCard` |
| dot-grid texture `background-size` `22px` | `--space-9` (`22px`) | Featured-panel/card cover dot-grid texture |
| dot-grid texture `background-size` `18px` | `--space-7` (`18px`) | Featured-panel/card cover dot-grid texture (second axis) |
| newsletter panel background (solid dark) | `--color-ink-mid` (`#0D1F2D`, "Nav on light, secondary dark surfaces") | `NewsletterPanel` solid background |
| newsletter panel padding `52px` | `--space-19a` (`52px`) | `NewsletterPanel` padding |
| newsletter panel padding `48px` | `--space-19` (`48px`) | `NewsletterPanel` padding (second axis) |
| inactive topic-chip background | `--color-glass` (`rgba(255,255,255,0.05)`) | `TopicFilter` inactive chip |
| card-hover border | `--color-border-orange-medium` (`rgba(232,119,34,0.50)`) | `blogCard`/`blogFeatured` GlassCard hover border (more precise match than GlassCard's own hardcoded `0.6` default) |
| featured-badge tint alpha (reference: `0.14`) | `--color-overlay-orange` (`rgba(232,119,34,0.16)`) | Featured-post badge tint — reused despite a 0.02 alpha delta (imperceptible, matches the `TMS-66` "kept on shared tokens rather than hand-tuned per instance" precedent) |

**Rationale — genuinely missing tokens (new additions required)**: The remaining reference values
have no existing token match and must be added to `app/tokens.css` (in the relevant existing
numbered section, per each value's kind) and mapped into `app/globals.css`'s `@theme inline` block:

| New token | Value | Section (tokens.css) | Use | `@theme inline` mapping |
|---|---|---|---|---|
| `--blur-glow-md` | `70px` | Effects/blur (alongside `--blur-glow`/`--blur-glow-lg`) | Featured-panel / grid-card cover glow blob | Yes — extends the existing `--blur-md`/`--blur-cta`/`--blur-glow`/`--blur-glow-lg` mapping block |
| `--blur-glow-xl` | `115px` | Effects/blur | Newsletter panel ambient glow blob | Yes — same block as above |
| `--text-blog-hero` | `clamp(40px, 5.4vw, 58px)` | Typography (heading scale, alongside `--text-h1`…`--text-h4`) | Blog hero H1 — this page's H1 clamp differs from the sitewide `--text-h1` (`clamp(44px,5.5vw,70px)`) | **No** — per the existing, documented heading-scale exception (`--text-h1`…`--text-h4`/`--ls-*` are intentionally excluded from `@theme inline` since they're consumed only via base `h1`-`h4` tag CSS, not bare utilities). This one-off token is instead consumed at the single Blog-hero H1 instance via an arbitrary Tailwind value (`text-[length:var(--text-blog-hero)]`), per this repo's rule that a component may override one heading instance's font-size only via an arbitrary value, never a keyword utility that would clobber the base tag's other already-correct properties (weight/color/letter-spacing/family) |
| `--measure-blog-lead` | `640px` | Layout/sizing | Hero lead-paragraph `max-width` | Yes — new `max-w-blog-lead` utility |
| `--size-42` | `42px` | Layout/sizing (alongside `--size-82`) | Featured-post author avatar diameter | Yes — new `size-42` utility |
| `--size-130` | `130px` | Layout/sizing | Featured-panel decorative network-icon square dimension | Yes — new `size-130` utility |
| `--size-300` | `300px` | Layout/sizing | Featured-panel decorative visual-half column width | Yes — new `w-300`/`max-w-300` utility |

**Alternatives considered**: Introducing new dedicated `--color-blog-accent-*` tokens was
considered and rejected — it would duplicate colors that already exist under generic names used
elsewhere in the design system (e.g. `--color-blue-light` is also used for other "Intelligence
Blue — AI content" contexts per its own comment), which would violate Principle I's "declared
once" rule. Hardcoding any of the seven newly-identified values as raw arbitrary Tailwind values
(e.g. `blur-[70px]`, `max-w-[640px]`) instead of tokenizing them was also considered and rejected —
it would violate Principle I's "never hardcode a value that duplicates/should be an existing token"
rule even though these are one-off values, since the constitution requires every design value to be
declared once in `tokens.css` regardless of how many components consume it.

## 2. Existing shell class for grid/featured cards — `.card`, `.card-solid`, GlassCard, or bespoke?

**Decision**: Extend `components/ui/GlassCard.tsx` with two new variants, `"blogCard"` (grid post
cards) and `"blogFeatured"` (the 2-column featured-story panel), rather than reusing `.card-solid`
or building a bespoke shell.

**Rationale**: `GlassCard` already implements the exact glass-morphism shell (border, backdrop
blur, background, hover lift, configurable hover border color) this page's cards need, via its
existing `CARD_VARIANTS`/`ICON_VARIANTS`/`TITLE_VARIANTS`/`DESC_VARIANTS` exhaustive-map pattern —
extending it in a backward-compatible way (adding two new keys to the `GlassCardVariant` union and
matching entries in all four maps) satisfies Principle III's "extend an existing shared component
rather than duplicate" directive directly, and keeps every Blog card on the same shared primitive
Industry/Reimagine cards already use, rather than introducing a second, parallel card-shell
convention (`.card-solid`) for one page. Concretely:
- `"blogCard"`: `rounded-2xl border-border bg-glass-4 overflow-hidden hover:-translate-y-[5px]` —
  matches the grid card's solid-ish glass background and `20px` radius (`--radius-2xl`, already
  annotated "Blog post cards").
- `"blogFeatured"`: same base treatment but `rounded-4xl` (`--radius-4xl`, "Newsletter/CTA panels"
  — reused here for the featured panel's own larger radius) to match the featured panel's larger
  corner radius versus the grid cards.
- Per-instance hover border color is passed via `GlassCard`'s existing `hoverBorderColor` prop
  (`hover:border-border-orange-medium`, the new/reused token from §1) rather than baked into the
  variant, since `GlassCard` already exposes this exact extension point.

**Alternatives considered**: Reusing `.card-solid` (the original decision) was reconsidered and
rejected — it would mean this feature's card shells sit on a second, parallel shared-styling
convention (vanilla `globals.css` utility class) instead of the already-established Tailwind-first
`components/ui/` component convention that `Industry`/`Reimagine` sections already use for the same
kind of card shell, and the user's explicit directive is to extend an existing shared *component*
in a backward-compatible way rather than reach for a duplicate mechanism. A fully bespoke
inline-styled shell (to hit the reference's exact `rgba(255,255,255,0.04)` background alpha to the
decimal) was also considered and rejected — the delta between `GlassCard`'s token-driven
`bg-glass-4` background and the reference's literal value produces no layout/dimensional
difference, only an imperceptible tint difference, matching the same "kept on shared tokens rather
than hand-tuned per instance" precedent already documented in `specs/TMS-66/plan.md`.

## 3. Category tag color system — new `.badge-*` modifier(s), reuse + inline color, or extend `Badge`?

**Decision**: Extend `components/ui/Badge.tsx`'s `BadgeTone` union with a fifth, neutral tone,
`"accent"`, and pair it with a caller-supplied inline `style` override (already supported today via
`Badge`'s un-destructured `...rest` props spread) carrying the per-post accent's derived
background/border/text colors.

**Rationale**: This page's category tags are the same shape/typography/pill component the rest of
the app already uses `Badge` for, so extending `Badge` — rather than reusing the bare vanilla
`.badge` class or forking a new component — keeps every badge in the app on one shared primitive,
per Principle III. `Badge`'s existing 4 tones (`orange`/`glass`/`blue`/`teal`) are fixed, named
palettes; the reference's post data uses 7 distinct accent colors authored per-post (per spec.md's
Assumption, not derived from a fixed topic lookup — two different "Engineering" posts use two
different accents), so no single new fixed tone can cover all of them. The new `"accent"` tone
supplies a neutral, token-based fallback (`bg-glass-4 border border-border`, matching this page's
glass-morphism cover treatment) for when no inline override is supplied, while the actual per-post
color is passed as an inline `style` (background/border/color computed from the post's accent token
via the §5-decided `hexA`-style helper) — `Badge`'s current implementation already spreads `style`
onto the rendered `<span>` unmodified, so this requires no change to `Badge`'s rendering logic,
only the new tone entry in its `TONE_CLASSES` map and the `BadgeTone` union.

**Alternatives considered**: The original decision (reuse the bare `.badge` vanilla class, applying
accent color entirely via inline style with no shared color-tone system at all) was reconsidered and
rejected — it bypasses `Badge` (the component this app's Tailwind-first pages already standardize
category/status tags on) in favor of the older vanilla-class convention, for no reason other than
`Badge`'s tone system not yet covering per-post dynamic colors; extending `Badge` is directly
backward-compatible (existing 4 tones and all existing call sites are untouched) and keeps this
page aligned with the same component every other Tailwind-first section uses. A 5th–11th
`.badge-<color>` (or `Badge` tone) fixed-palette modifier per accent was rejected for the same
over-fragmentation reason as before — colors are used by exactly one or two posts each and are
authored as arbitrary per-post data, not a closed enum. A fully bespoke tag component with no shared
primitive at all was rejected — it would duplicate `Badge`'s existing shape/typography rules for no
benefit.

## 4. Topic filter behavior — implementation approach

**Decision**: Client component (`"use client"`) holding `const [activeTopic, setActiveTopic] =
useState<string>("All")`, filtering the static post array via `.filter()` at render time — no
routing, no server round-trip, matching FR-005's "immediately narrow... without a full page
reload" requirement and the reference's own `cat` state + `.filter()` logic exactly.

**Rationale**: This is the simplest approach that satisfies FR-004/FR-005/SC-002 and needs no new
dependency. The filter state and the grid must live in the same client component (or a shared
parent) since selecting a chip must synchronously re-render the grid.

**Alternatives considered**: URL query-param-driven filtering (`?topic=Engineering`) was
considered (would allow deep-linking to a filtered view) and rejected as out of scope — nothing in
spec.md requires deep-linkable filter state, and it would add complexity (search params, `useRouter`)
not requested by any FR.

## 5. Per-post accent tinting — rgba helper approach

**Decision**: A small local helper (colocated in `blog-post-grid.tsx`/`featured-post.tsx`, or a
shared `_data`/`_lib` util if reused by both) that converts a token's hex value to an `rgba()`
string at a given alpha, mirroring the reference's own `hexA(hex, a)` function — applied via inline
`style` for the cover wash, glow blob, and tag background/border, since these are per-post dynamic
values that cannot be expressed as static Tailwind utility classes.

**Rationale**: See plan.md UI Design Approach §1 — keeps the codebase's existing static-rgba-token
convention (no `color-mix()`, not otherwise used anywhere in this codebase) while still being
data-driven per post.

**Alternatives considered**: CSS `color-mix()` (rejected — introduces an unused CSS mechanism for
one feature); a fixed set of precomputed Tailwind utility classes per accent color (rejected — 7
colors × 3+ alpha variants each would mean either a large enumerated class list with no shared
generation logic, or unused Tailwind safelist entries, more complex than one small helper function).

## 6. Breakpoint mapping — reference's 980px/640px onto canonical lg/md/sm

**Decision**: Map the reference's `@media (max-width:980px)` behavior (grid 3→2 cols, featured/
newsletter panel 2→1 col) onto `md:` (960px), and its `@media (max-width:640px)` behavior (grid
2→1 col) onto `sm:` (560px), per spec.md's explicit Assumption. The reference's separate
`@media (max-width:1140px)` nav-collapse breakpoint is irrelevant here since nav is out of scope
(Header is a shared, already-built component).

**Rationale**: Directly stated in spec.md Assumptions; this is the same breakpoint-remapping
precedent already used by every other page in this codebase per Constitution Principle II.

**Alternatives considered**: None — this is a documented spec constraint, not an open design
choice.

## 7. Subscribe form — validation + state pattern

**Decision**: Client component mirroring `app/_home-components/SubscribeBand.tsx` exactly: local
`useState` for `email`, `submitted`, `error`; regex validation
(`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) matching the reference's own pattern; on valid submit, set
`submitted: true` and swap the form for a confirmation message (no network call, per spec.md
Assumption); on invalid/empty submit, set an inline `error` message and keep the form visible.

**Rationale**: This is an established, already-shipped pattern in this exact codebase for
exactly this kind of client-side-only subscribe interaction — reusing it directly satisfies
FR-008–FR-010 with no new pattern introduced.

**Alternatives considered**: None — `SubscribeBand.tsx` is a direct, current precedent in this
repo for the identical interaction shape.

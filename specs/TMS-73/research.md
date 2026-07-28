# Research: Webinar Series Page (TMS-73)

**Purpose**: Resolve Technical Context unknowns and produce the exhaustive token/component audit
this feature's Constitution Check depends on, following the same rigor as `specs/TMS-69/research.md`.

## §1 — Token Audit

Every distinct color, size, radius, shadow, blur, and typography value in
`raw-files/TechGrit Website V2/TechGrit Webinar.dc.html` was checked against `app/tokens.css`.
Values fall into three buckets: **exact match** (reuse as-is), **negligible-deviation match**
(reuse, deviation documented as a deliberate judgment call, not chased into a near-duplicate
token), and **genuinely missing** (new token required, Principle I).

### 1a. Exact matches (reuse as-is, no new token)

| Reference value | Existing token |
|---|---|
| `#E87722` | `--color-orange` |
| `#fbbf24` | `--color-yellow` |
| `#38bdf8` | `--color-blue-light` |
| `#F7B733` | `--color-amber-light` |
| `linear-gradient(135deg,#F59E0B,#E87722)` | `--gradient-brand` |
| `linear-gradient(120deg,#F59E0B,#E87722)` (H1 accent text-clip) | `--gradient-brand-text` |
| `0 0 12px 2px rgba(232,119,34,0.8)` (badge dot glow) | `--shadow-glow-orange` |
| `rgba(255,255,255,0.92)` (badge label text) | `--color-text-strong` (literally annotated "Hero eyebrow/badge label text") |
| `12.5px` (badge label size) | `--text-2xs` |
| `0.1em` (badge label tracking) | `--ls-wider` |
| `rgba(232,119,34,0.5)` (collage spin-ring border) | `--color-border-orange-medium` |
| `rgba(255,255,255,0.1)` (photo-tile borders) | `--color-border-image` |
| `rgba(255,255,255,0.04)` (released-card bg) | `--color-glass-4` |
| `8px` / `12px` / `16px` / `24px` / `28px` / `36px` / `38px` (assorted gaps/padding) | `--space-2` / `--space-4` / `--space-6` / `--space-10` / `--space-12` / `--space-15` / `--space-16` |
| `9999px`-equivalent pill radius (hero badge) | `--radius-pill` (`rounded-full`) |
| `22px` (upcoming-panel radius) | `--radius-3xl` |
| `20px` (released-card radius) | `--radius-2xl` |
| `12px` (CTA button radius) | `--radius-card` |
| `-0.03em` (Sessions heading tracking) | `--ls-snug` |
| `-0.02em` (upcoming h3 tracking) | `--ls-normal` |
| `15.5px` / `1.6` (upcoming description size/line-height) | `--text-15-5` / `--lh-relaxed` |
| `600` (date/time weight) | `--fw-semibold` |
| `700` (H1/h2/h3 weight) | `--fw-bold` |
| `@keyframes tgspin` (collage spin-ring animation) | Already exists verbatim in `globals.css` (line ~882) — **no new keyframe needed** |

### 1b. Negligible-deviation reuse (documented judgment call, no new token)

These are single-digit-percent deviations on values that already have a named, semantically-fitting
token — minting a near-duplicate token one unit away would work against Principle III's "reuse what
already covers the need" in spirit, so the existing token is reused as-is:

| Reference value | Reused token | Deviation |
|---|---|---|
| Upcoming h3 `clamp(22px,2.6vw,30px)` | `--text-h3` (`clamp(22px,2.4vw,30px)`) | Only the vw interpolation curve differs (2.6 vs 2.4vw); min/max bounds are identical |
| Upcoming h3 `line-height:1.15` | `--lh-snug` (1.13) | <2% difference, imperceptible at this font size |
| Subscribe panel `border-radius:26px` | `--radius-4xl` (24px) | 2px on a full-bleed panel radius; `--radius-4xl` is explicitly annotated "Newsletter/CTA panels", matching this exact use case semantically |
| H1 `letter-spacing:-0.035em` and `line-height:1.04` | consumed as literal arbitrary values (`tracking-[-0.035em] leading-[1.04]`), not a new token | Mirrors `app/construction/_components/construction-hero.tsx`'s own hero H1, which likewise overrides its one-off letter-spacing/line-height as raw arbitrary values rather than minting a token for a single-use scalar — Principle I's heading exception permits this (arbitrary value, not a keyword utility) |

### 1c. Genuinely missing — new tokens required

Twenty-three new tokens, added to their existing numbered `tokens.css` sections (purely additive, no
existing token changed). Two of these (the released-session cover gradients for the blue and teal
accents) surfaced only during Phase 5 implementation — the original audit checked the collage and
upcoming-panel colors exhaustively but missed the released-card cover backgrounds; the orange
cover reuses the existing `--gradient-blog-featured` token as a negligible-deviation match (§1b-style
reuse: 0.20 vs. the reference's 0.18 first-stop alpha), so only blue/teal needed new tokens:

| New token | Value | Section | Used for |
|---|---|---|---|
| `--color-overlay-orange-10` | `rgba(232,119,34,0.10)` | 4 | Hero eyebrow badge background |
| `--color-border-orange-soft` | `rgba(232,119,34,0.30)` | 4 | Hero eyebrow badge border; collage spin-ring tile border |
| `--color-overlay-orange-06` | `rgba(232,119,34,0.06)` | 4 | Collage spin-ring tile background |
| `--color-border-amber-medium` | `rgba(245,158,11,0.40)` | 4 | Collage play-triangle tile dashed border |
| `--color-overlay-amber-04` | `rgba(245,158,11,0.04)` | 4 | Collage play-triangle tile background |
| `--color-border-blue-light-soft` | `rgba(56,189,248,0.30)` | 4 | Collage dot tile border |
| `--color-overlay-blue-light-06` | `rgba(56,189,248,0.06)` | 4 | Collage dot tile background |
| `--color-overlay-blue-light-18` | `rgba(56,189,248,0.18)` | 4 | Collage dot tile's inner circle background |
| `--color-border-amber-30` | `rgba(245,158,11,0.30)` | 4 | Upcoming-session panel border |
| `--color-overlay-amber-16` | `rgba(245,158,11,0.16)` | 4 | Upcoming-session panel glow blob |
| `--color-text-66` | `rgba(255,255,255,0.66)` | 2 | Upcoming-session description text |
| `--color-text-82` | `rgba(255,255,255,0.82)` | 2 | Upcoming-session date/time text |
| `--gradient-webinar-upcoming` | `linear-gradient(150deg, rgba(245,158,11,0.12), rgba(255,255,255,0.03))` | 5 | Upcoming-session panel background |
| `--text-webinar-hero` | `clamp(40px, 5vw, 56px)` | 6 | Hero H1 (heading-only, unmapped in `@theme inline` per the documented heading exception, mirrors `--text-blog-hero`) |
| `--text-webinar-h2` | `clamp(26px, 3vw, 34px)` | 6 | "Sessions" heading (heading-only, unmapped) |
| `--text-14-5` | `14.5px` | 6 | Upcoming-session date/time text (mapped — general-purpose, follows the `--text-15-5` naming precedent) |
| `--size-220` | `220px` | 8 | Wide released-session card's thumbnail column width |
| `--size-150` | `150px` | 8 | Wide released-session card's minimum height |
| `--radius-tile` | `16px` | 9 | Hero collage tile corner radius |
| `--shadow-glow-amber-sm` | `0 0 10px 2px rgba(245,158,11,0.80)` | 10 | Upcoming-session "live" status dot glow |
| `--blur-glow-100` | `100px` | 14 | Upcoming-session panel glow blob blur |
| `--gradient-webinar-released-blue` | `linear-gradient(150deg, rgba(56,189,248,0.18), rgba(15,118,110,0.06))` | 5 | Released-session cover — blue accent (found during Phase 5 implementation) |
| `--gradient-webinar-released-teal` | `linear-gradient(150deg, rgba(45,212,191,0.18), rgba(56,189,248,0.06))` | 5 | Released-session cover — teal accent (found during Phase 5 implementation) |

18 of the 23 are mapped into `globals.css`'s `@theme inline` block. Five stay unmapped, each for a
distinct, already-established reason: `--text-webinar-hero` and `--text-webinar-h2` stay CSS-only
per the same documented heading exception `--text-blog-hero` already uses (consumed via
`text-[length:var(--text-webinar-hero)]` arbitrary-value syntax, not a keyword utility);
`--gradient-webinar-upcoming` and the two released-card cover gradients
(`--gradient-webinar-released-blue`/`-teal`) stay unmapped because no `--gradient-*` token in this
codebase is ever mapped into `@theme inline` (confirmed: `--gradient-brand`/`--gradient-brand-text`
aren't either) — gradients are consumed directly via `var()` in plain CSS or via a Tailwind
arbitrary-value class (`bg-[image:var(--gradient-webinar-upcoming)]`, matching `Badge.tsx`'s existing
`bg-[image:var(--gradient-brand)]` pattern), which resolves correctly without a theme registration.

## §2 — Component Extension: `Badge`

**Decision**: Add one new tone, `"orangeOutline"`, to `components/ui/Badge.tsx`'s `BadgeTone` union
and `TONE_CLASSES` map: `bg-[var(--color-overlay-orange-10)] border border-[var(--color-border-orange-soft)]
text-strong`. This reproduces the hero eyebrow pill exactly (background/border colors from §1c,
text color from the existing `--color-text-strong` exact match in §1a).

**Rationale**: None of Badge's five existing tones (`orange`/`glass`/`blue`/`teal`/`accent`) is an
outlined, low-opacity orange pill — `orange` is a solid gradient fill, `glass`/`accent` are
neutral/white-bordered. Per the clarify-session decision (spec.md Assumptions), extend rather than
fork. The name is generic (`orangeOutline`, not `webinarEyebrow`) so a future page needing the same
outlined-orange-pill treatment can reuse it directly, consistent with Badge's existing
generic-tone-naming convention.

**Alternative considered**: A bespoke inline-styled pill, matching how
`app/construction/_components/construction-hero.tsx` currently hand-rolls its own hero eyebrow
outside `Badge.tsx`. Rejected per the clarify-session decision — extending the shared primitive was
explicitly chosen over following that pre-existing (but non-ideal) precedent.

## §3 — Component Extension: `GlassCard`

**Decision**: Add two new variants to `components/ui/GlassCard.tsx`'s `GlassCardVariant` union with
matching entries in all four `Record<GlassCardVariant, string>` maps:

- `"webinarUpcoming"` — `rounded-3xl border-[var(--color-border-amber-30)]
  bg-[image:var(--gradient-webinar-upcoming)] px-9 py-[38px]` (§1a/§1c values) for the full-width
  upcoming-session panel.
- `"webinarReleased"` — `rounded-2xl border-border-image bg-glass-4 overflow-hidden
  hover:-translate-y-[5px]` for released session cards, with per-card hover border color passed
  through the existing `hoverBorderColor` prop (see §4). The `hover:-translate-y-[5px]` lift
  (matching the reference's `style-hover="transform:translateY(-5px)"`) was added during Phase 5
  implementation — the Foundational-phase (T005) version of this variant omitted it.

**Subscribe panel reuses the existing `"blogFeatured"` variant as-is** (`rounded-4xl border-border
bg-glass-4 overflow-hidden hover:-translate-y-[5px]`) rather than a third new variant — its radius,
border, and background already match this page's Subscribe panel almost exactly (§1b's
negligible-deviation note on the 24px-vs-26px radius). **Decided**: the one extra effect
`blogFeatured` carries (a hover lift) is overridden away via `className` (`hover:-translate-y-0` or
equivalent) — this panel is a static informational block, not a hoverable card, so the lift reads as
unintentional motion rather than the deliberate craft signal it is on Blog's actual card grid.

**Rationale**: Same "extend, don't fork" decision as §2, and the same reasoning `specs/TMS-69`
already used when it added `"blogCard"`/`"blogFeatured"` instead of a bespoke shell.

## §4 — Per-card hover border color (released sessions)

**Decision**: Follow `GlassCard`'s own existing, already-established pattern for this — its
`hoverBorderColor` prop already defaults to a literal Tailwind arbitrary-value string
(`"hover:border-[rgba(232,119,34,0.6)]"`), not a named token. The three released-session cards'
distinct hover accents (`rgba(232,119,34,0.45)` orange, `rgba(56,189,248,0.45)` blue,
`rgba(45,212,191,0.45)` teal) are passed the same way, per-card, via that same prop — consistent
with how `GlassCard` itself already works today, rather than minting three new single-use hover-border
tokens. This is a real, letter-of-the-rule tension with Principle I (hardcoded rgba literals at a
component call site), tracked explicitly — not silently accepted — as its own row in plan.md's
Complexity Tracking table.

## §5 — Icons

**New**: One new icon, `ClockIcon`, added to `components/ui/icons.tsx` (circle + clock-hands path,
matching the reference's inline SVG) for the upcoming-session date/time row.

**Reused, not duplicated**: The existing `PlayIcon` (already in `icons.tsx`, documented as the
"Video-testimonial play button") is reused for both (a) the "Watch Now" button's small circular play
glyph and (b) the collage's decorative play-triangle tile — the latter passed `fill="none"` plus a
`stroke` prop (both already accepted via `PlayIcon`'s existing prop spread) to render the outlined
variant the reference uses there, instead of `PlayIcon`'s default solid fill.

**Not an icon at all**: The collage's spin-ring tile (a rotating border-only circle) and pulsing-dot
tile (nested divs) are pure CSS/DOM, matching how the reference itself implements them — no SVG.

## §6 — Form composition (revised — see §8)

**Superseded.** An earlier draft of this research extracted a shared, route-local
`webinar-subscribe-form.tsx` component reused by both the hero and the Subscribe panel. Per an
explicit follow-up plan directive, this feature instead consolidates into exactly 3 top-level
section components (§9), each owning its own subscribe-form instance inline — the hero's email
form and the Subscribe panel's email form are each implemented directly inside their own section
component (`HeroSection`, `SubscribePanel`), not factored into a 4th shared file. See §9 for the
full rationale.

## §7 — Route path

**Resolved, not a research unknown**: `components/layout/nav-config.ts` already links a "Webinar"
resource entry to `/webinar` (pre-existing, added when the shared nav was built — TMS-63), and the
constitution's own "Additional Constraints" section documents `/webinar` as part of the reference
set's implied page map. This feature's route is `app/webinar/page.tsx` → `/webinar`, following the
exact same `app/<route>/_components/`, `app/<route>/_data/` structure as `app/blog/`, `app/services/`,
`app/about/`.

## §8 — Component consolidation: 3 sections, not 7 files

**Decision (supersedes the original §6 file split)**: Per an explicit follow-up directive, this
feature's route-local component surface is consolidated to exactly 3 top-level section components,
matching the page's 3 visual sections one-to-one:

- `app/webinar/_components/hero-section.tsx` — owns the hero's badge/H1/lead copy, the 9-cell
  collage (rendered as internal, non-exported JSX/sub-functions within this same file — the collage
  is never reused outside the hero, so a separate file added no value), and its own inline
  email-capture form instance (its own local `email`/`error`/`submitted` `useState`, not imported
  from anywhere else).
- `app/webinar/_components/sessions-section.tsx` — owns the "Sessions" heading, the upcoming-session
  panel, and every released-session card, all as internal JSX/sub-functions within this one file
  (neither the upcoming panel nor a released card is reused outside this section).
- `app/webinar/_components/subscribe-panel.tsx` — the 3rd section; owns its own inline
  email-capture form instance, structurally identical to the hero's but implemented independently
  in this file (not imported from `hero-section.tsx`).

**Rationale**: The directive explicitly asks for one component per visual section rather than one
file per sub-piece (collage, upcoming card, released card, subscribe form). The two inline
subscribe-form instances (~20 lines of `useState`/validation each) are accepted as a small,
deliberate duplication rather than factored into a 4th shared file — per this project's own stated
engineering philosophy ("three similar lines is better than a premature abstraction"; don't extract
a shared component across files when the instruction is explicitly to reduce file/component count).
Both instances still build from the same underlying reusable primitives (`FormField`, `Button`) —
only the small amount of glue state/JSX around them is duplicated, not the actual shared UI
components.

**What still gets reused, unchanged from §2/§3/§4/§5**: `Badge` (`"orangeOutline"` tone), `GlassCard`
(`"webinarUpcoming"`/`"webinarReleased"` variants, plus the existing `"blogFeatured"` variant for
the Subscribe panel), `FormField`, `Button`, `PlayIcon` (reused, not duplicated, for the Watch Now
glyph and the collage's decorative triangle tile), and the new `ClockIcon`. Consolidating file count
only changes how the *route-local* JSX is organized — it does not change which shared
`components/ui/` primitives are used or how many new tokens/variants are needed.

## §9 — Testing

No test framework is configured in this repo (confirmed gap, not a standard to introduce here, per
constitution Development Workflow) — verification is manual (`npm run dev` + responsive check at
mobile/tablet/desktop widths) plus the existing `npm run lint` / `npm run build` Husky pre-commit
gate, matching every other recent feature's approach (TMS-69, TMS-68, TMS-67).

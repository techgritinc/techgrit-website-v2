# Phase 0 Research: Phase 1 — Shared Foundation

**Companion to**: [plan.md](./plan.md) | **Spec**: [spec.md](./spec.md)

Scope: exactly the 4 items in plan.md. No consumer migration, no `globals.css` vanilla-class
changes (the new token `@theme inline` mappings in `globals.css` are the one exception — required
by Principle I, see §1 below).

## 1. Ghost button — target values and new tokens

**Decision**: `TechGrit Homepage.dc.html` (lines 329, 584) and `TechGrit Construction.dc.html`'s
hero ghost button are byte-identical:

```
background:  linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.12))
border:      1px solid rgba(255,255,255,0.42)
blur:        12px
box-shadow:  0 8px 24px -10px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.22)
hover (reference): background → rgba(...0.4/0.2); border-color → rgba(255,255,255,0.7); translateY(-2px)
hover (implemented): translateY(-2px) only — brighten deliberately dropped, see Decision below
```

`Button.tsx`'s current `ghost` variant uses `var(--color-glass)`/`var(--color-border-strong)`/
`var(--blur-sm)` and an orange-border hover — none match. New tokens (Principle I):

| Token | Value | `tokens.css` section |
|---|---|---|
| `--gradient-ghost` | `linear-gradient(180deg, rgba(255,255,255,0.28), rgba(255,255,255,0.12))` | 5. GRADIENTS |
| `--gradient-ghost-hover` | `linear-gradient(180deg, rgba(255,255,255,0.4), rgba(255,255,255,0.2))` | 5. GRADIENTS |
| `--color-border-ghost` | `rgba(255,255,255,0.42)` | 4. BORDERS & GLASS |
| `--color-border-ghost-hover` | `rgba(255,255,255,0.7)` | 4. BORDERS & GLASS |
| `--shadow-btn-ghost` | `0 8px 24px -10px rgba(255,255,255,0.15), inset 0 1px 0 rgba(255,255,255,0.22)` | 10. SHADOWS |
| `--blur-ghost` | `12px` | 14. BACKDROP BLUR |

**Decision — hover stays lift-only**: `Button.tsx`'s `ghost` variant applies only the reference's
`translateY(-2px)` on hover; the gradient/border brighten is intentionally not wired up. The
`--gradient-ghost-hover`/`--color-border-ghost-hover` tokens above are defined (so the resting-state
tokens have their natural pair, matching the `--shadow-btn-primary`/`--shadow-btn-hover` convention
elsewhere in `tokens.css`) but currently unconsumed by any component — not a gap, a deliberate choice.

**Scope**: only `Button.tsx` consumes these tokens. `globals.css`'s `.btn-ghost` class and its
current consumers (`about-us-hero.tsx`, `services-hero.tsx`) are untouched and keep rendering as
today — no migration, no class edit.

## 2. Eyebrow — optional no-symbol variant

**Decision**: add `showAccent?: boolean` (default `true`) to `SectionEyebrow`
(`components/ui/section-eyebrow.tsx` — moved here from `reusable-components/` as part of this
plan; see Note below). No existing call site changes behavior (default preserves today's dash).
No consumer is migrated onto it.

**Note — file relocation**: `reusable-components/` held 4 files (`section-eyebrow.tsx`,
`final-cta.tsx`, `ambient-orbs.tsx`, `reveal-on-scroll.tsx`) that were genuinely cross-route but
lived outside the constitution's two documented shared-primitive locations
(`components/ui/`, `components/layout/`). All 4 are moved into `components/ui/` (imports updated
across all 23 consuming files) so `SectionEyebrow` now lives in an already-documented location —
this closes that gap without needing a constitution amendment.

## 3. `FilterBar` — new component

**Decision**: `components/ui/FilterBar.tsx` — dark background, sticky position, filter label,
renders chips via `children`. Not wired into `/blog` or `/case-studies` in this slice.

**Why `components/ui/`**: Constitution reserves it for primitives consumed by 2+ routes (Blog,
Case Studies, once wired later) — the right home even though no route consumes it yet.

## 4. `LifeGallery.tsx` — the two additions

**Decision**: `careers` variant gets an "Inside TechGrit" `Badge` (reusing `components/ui/Badge.tsx`
— exact `tone` confirmed against `TechGrit Careers.dc.html` during implementation). `home` variant
gets its two action buttons (FR-011), via `components/ui/Button.tsx`. No other markup in this file
changes — its existing inline eyebrow stays as-is.

## New tokens summary

| Token | Section |
|---|---|
| `--gradient-ghost`, `--gradient-ghost-hover` | 5. GRADIENTS |
| `--color-border-ghost`, `--color-border-ghost-hover` | 4. BORDERS & GLASS |
| `--shadow-btn-ghost` | 10. SHADOWS |
| `--blur-ghost` | 14. BACKDROP BLUR |

Each needs a matching `@theme inline` entry in `globals.css` per Principle I if consumed via a bare
Tailwind utility rather than `var(--token-name)` directly.

---

# Phase 0 Research Addendum — Phase 2: Homepage Hero & Trusted Clients

**Companion to**: [plan.md](./plan.md) addendum | **Spec**: [spec.md](./spec.md), FR-001–FR-004

Scope: only the Homepage hero and the new Trusted-Clients section. Phase 1's research above (ghost
button, eyebrow, FilterBar, LifeGallery) is unaffected.

## 5. Hero alignment vs. the raw reference (FR-001, FR-002) — REVISED

**Decision (reversed from the original addendum)**: keep the hero content column left-aligned,
matching `TechGrit Homepage.dc.html` (lines 312-345) exactly — a `max-width:780px` column with no
`text-align:center` and no `margin:0 auto` on the column itself. The original addendum centered all
hero content on the theory that spec.md's acceptance scenario required it; that scenario has since
been corrected (spec.md Clarifications, Session 2026-08-04) to match the reference instead. Every
*value* (font sizes, colors, gaps, copy) is still taken from the reference, as before.

**What actually changes now**:
- Outer content column: `max-w-[700px]` → `max-w-[780px]` (matches reference's own max-width) —
  this width fix still applies. No `mx-auto`, no `text-center` is added.
- CTA row (`flex flex-wrap items-center gap-4`) — unchanged, stays left-aligned (flex's default
  `justify-start`); no `justify-center` added.
- Stat row (`flex items-stretch gap-[34px]`) — unchanged, stays left-aligned; no `justify-center`
  added.
- The paragraph (`max-w-[540px]`) — unchanged, no `mx-auto` added.
- The hero's outer wrapper (`mx-auto ... max-w-(--container-max)`, `Hero.tsx` line 25) already
  centers the *container* on the page today — that part of the layout was already correct and
  needs no change; only the 780px column width fix above is new.
- The Live-Webinar badge and "AI-First Software Development Partner" badge were both `inline-flex`
  — no structural change needed for those beyond the badge's removal (§6) and the badge's own
  sizing/dot fix (§9, new).

**What does NOT change**: the `tgrise` stagger-in animation classes and their delays stay exactly
as-is on every element.

## 6. Removed elements (FR-001, FR-002)

**Decision**: remove two elements from `Hero.tsx` that have no equivalent in
`TechGrit Homepage.dc.html`'s hero section (lines 312-347):

- The second badge — "AI-First Software Development Partner" with its blinking green dot
  (`Hero.tsx` current lines 38-46). The reference's hero has exactly one badge (the Live Webinar
  link); this second badge is the "separate sub-tagline element" FR-001 prohibits.
- The "Scroll" chevron affordance (`Hero.tsx` current lines 94-100, `<a href="#platform">`). Not
  present in the reference at all, and FR-002 explicitly prohibits a clickable scroll-indicator.

## 6a. Hero headline line-height fix (FR-002a, new)

**Decision**: remove the h1's per-instance `leading-[0.99]` override in `Hero.tsx` (line 48). The
app's shared `--text-h1` (`clamp(44px, 5.5vw, 62px)`, capping at the reference's 62px at desktop)
and `--lh-tight` (`1.02`, an exact match to the reference's `line-height:1.02`) already resolve
correctly via the global `h1` base rule in `globals.css`'s `@layer base` — the `0.99` override was
the only thing diverging from the reference, for no reference-backed reason. No new token: this is
a one-line deletion, not a value change. `--ls-tight` (`-0.03em`) already matches the reference's
`letter-spacing:-0.03em` and needs no change.

## 6b. Badge-to-headline gap, hero side padding, and mobile wrap (FR-002, FR-002a, new findings)

**Badge-to-h1 gap (fixed)**: the reference gives the h1 its own `margin-top:22px` (line 331, on top
of the badge's own `margin-bottom:16px`), for a combined 38px gap between the badge and the
headline. `Hero.tsx` was missing the h1's own margin-top entirely (only the badge's 16px
margin-bottom existed), so the gap read as 16px instead of 38px. Fixed by adding the h1's own
top margin to match the reference.

**Hero side padding — reverted to the reference's literal flat value**: an intermediate attempt
during polish swapped the hero's `px-9` (fixed 36px) for `px-(--container-padding)` (the app's
shared responsive token, 36→28→20px across breakpoints), on the theory that this would let the
mobile hero column breathe and help the headline wrap onto its intended 2 lines. Measurement proved
this wrong: even at **zero** side padding, "Software is no longer built." alone needs ~393px at the
mobile `--text-h1` size (38px), while a 375px-wide phone offers at most 375px — an 18px shortfall
that exists before any padding is applied at all. Padding was never the actual lever. Per direct
instruction, the hero's side padding is reverted to the reference's own literal value —
`padding:36px` on the hero container (`TechGrit Homepage.dc.html` line 310), which is flat and
non-responsive in the reference itself (a desktop-only export, no `@media` rules inside it) — so
`Hero.tsx` keeps plain `px-9` (36px) at every breakpoint, not the app's `--container-padding`
stepping. This matches the reference exactly, and is honest about the fact that the mobile 3-line
wrap is a font-size-vs-content-length reality the reference (which defines no mobile treatment at
all) cannot adjudicate — not something padding can fix in either direction.

**Mobile headline wrap — open, not fixed here**: at narrow phone widths, "Software is no longer
built." does not fit on one line at the shared `--text-h1` sm-band size (38px), so the explicit
`<br/>` before "It's orchestrated." ends up producing 3 visual lines instead of the intended 2 (the
first sentence itself soft-wraps before the forced break is even reached). Three remediation paths
were identified — shrink the shared mobile `--text-h1` token further (sitewide impact, since it's
consumed by every page's h1), drop the forced `<br/>` below the `sm` breakpoint and let the phrase
reflow naturally, or accept the 3-line wrap as ordinary responsive behavior for a long headline on a
narrow phone. No path has been chosen yet — flagged here for a future decision, not resolved by the
padding revert above.

**JSX whitespace cleanup (unrelated fix, found during this investigation)**: the JSX previously wrote
`It&rsquo;s{" "}` followed by a newline before the gradient `<span>`, which caused React to insert an
empty hydration-boundary comment node between the "It's" text node and the following space in the
rendered DOM. Collapsing this to one line — `It&rsquo;s <span>...</span>` — removes the comment node
(cleaner DOM, one fewer hydration marker) without changing the rendered text. This did not, by
itself, change the mobile line count (that's the font-size/width reality above), but it's a
correctness improvement worth keeping regardless.

## 7. Metrics/stat display fidelity (FR-003) — REVISED to add the suffix color/size split

**Decision**: the ghost-button half of FR-003 is already satisfied — Phase 1 updated
`components/ui/Button.tsx`'s `ghost` variant, and `Hero.tsx` already consumes it via
`variant="ghost"`. The metrics-display half needs the following fixes, all currently hardcoded
arbitrary values (or missing entirely) with no backing token (pre-existing Principle I gap, now in
scope because FR-003 calls out metrics fidelity):

| Property | Current (`Hero.tsx`) | Reference (`TechGrit Homepage.dc.html` line 333) | Token |
|---|---|---|---|
| Stat count font-size | `text-[36px]` | `font-size:44px` | `--text-stat-count: 44px` (new) |
| Stat count letter-spacing | `tracking-[-0.03em]` | `letter-spacing:-0.035em` | `--ls-stat-count: -0.035em` (new) |
| "weeks" suffix font-size | none (inherits 36/44px) | `font-size:26px` | `--text-stat` (**already exists**, `tokens.css` line 272, currently consumed by `PlatformSection.tsx`'s `text-stat` utility — exact 26px match, reused rather than duplicated) |

**New — per-segment suffix color/size split (spec.md Clarifications, both sessions)**: today,
`Hero.tsx` applies one shared class to the *entire* stat-cell content (`AnimatedStat` + `suffix`
together), so "10X" renders fully white and "6 weeks" renders fully gradient-clipped. The reference
colors/sizes each digit and its suffix independently:

- Stat 0 ("10X"): the digit "10" is white at 44px; the "X" suffix is amber (`--color-amber-light`,
  `#F7B733`, exact existing-token match) at the **same** 44px — no size change for this suffix.
- Stat 1 ("6 weeks"): the digit "6" is gradient-clipped (`--gradient-brand-text`) at 44px; the
  " weeks" suffix is amber (`--color-amber-light`) at the **smaller** 26px (`--text-stat`, already
  exists — see table above) — not gradient-clipped.
- Stat 2 ("zero"): unchanged, plain white, no suffix.

`home-data.ts`'s `DeliveryStat` type gains an optional `suffixClassName?: string` field (matching
the file's existing per-item presentation-flag convention, e.g. `gradient?: boolean`) so each
stat's suffix styling is data-driven rather than hardcoded per-index in `Hero.tsx`:

```ts
{ id: "delivery-speed", count: 10, suffix: "X", suffixClassName: "text-amber-light", label: "Delivery Speed" },
{ id: "sprint-to-scale", count: 6, suffix: " weeks", gradient: true,
  suffixClassName: "text-amber-light text-stat", label: "Sprint to Scale" },
{ id: "legacy-debt", staticValue: "zero", label: "Legacy Debt" },
```

**Stable key fix (Principle III, applied ahead of this addendum's other Hero.tsx edits)**:
`DeliveryStat` also gains a required `id` field, and `Hero.tsx`'s stat-row `.map((stat, i) => ...)`
now keys on `stat.id` instead of `stat.label` — the array's previous key was display text, which
Principle III's "Stable identity for repeated content" rule explicitly disallows. Landed directly
in `home-data.ts`/`Hero.tsx` (not deferred to T014) since it's a one-line, non-visual fix touching
exactly the file T014 already edits.

`Hero.tsx` renders `<span className={stat.suffixClassName}>{stat.suffix}</span>` instead of
concatenating the suffix as a plain string, so it can carry its own color/size independent of the
digit's class.

**Baseline alignment AND shared font-size — both must live on the wrapper, not the digit span
(implementation bug found and fixed during polish)**: the reference's `class="disp"` element is
the *wrapper* around the digit+suffix pair, and it is this wrapper — not the digit span — that
carries `font-size:44px; font-weight:700; letter-spacing:-0.035em; display:inline-flex;
align-items:baseline; gap:2px` (stat 0) / `gap:8px` (stat 1). The digit span itself carries no
size/weight/tracking of its own; it only optionally gets the gradient clip (stat 1). The suffix
span carries only its own **color** override ("X", "weeks") and, for "weeks" only, its own smaller
**font-size** override (26px) — everything else it needs (44px, 700, -0.035em) it inherits from the
shared wrapper, exactly like "X" does.

The first implementation of this addendum got this backwards: it put `text-stat-count`/
`tracking-stat-count`/`font-bold` directly on the digit `<span>` instead of the wrapper `<div>`.
Since the suffix span is a *sibling* of the digit span, not its descendant, it does not inherit
anything from a class placed only on the digit — so "X" (which sets no size of its own) fell back
to whatever font-size was ambient at the wrapper level (not 44px), while "10" correctly showed 44px
directly. This is exactly the "10 and X render at different sizes" defect reported after the first
implementation pass. Corrected structure:

```jsx
<div className="font-display inline-flex items-baseline text-stat-count font-bold tracking-stat-count text-primary gap-[2px]">
  <span className={stat.gradient ? "bg-[image:var(--gradient-brand-text)] bg-clip-text text-transparent" : undefined}>
    <AnimatedStat target={stat.count} />
  </span>
  <span className={stat.suffixClassName}>{stat.suffix}</span>
</div>
```

The wrapper now owns `text-stat-count`/`tracking-stat-count`/`font-bold`/`text-primary` (and the
`gap-[2px]`/`gap-2` split by stat index); the digit span owns only the conditional gradient; the
suffix span owns only `stat.suffixClassName` (color, plus size for "weeks"). Both children now
correctly inherit the shared 44px/700/-0.035em from the wrapper, matching the reference's own
inheritance structure exactly.

**Not changed**: the stat-divider border color. Reference uses `rgba(255,255,255,0.14)`; the
current code reuses `--color-border-strong` (`rgba(255,255,255,0.16)`, commented "Button ghost
border" in `tokens.css`). A 0.02 delta on a decorative 1px divider does not warrant a third
near-duplicate border-opacity token — consistent with this feature's own precedent (hero
font-size consolidation, `tokens.css` history) of absorbing sub-visible deltas rather than
multiplying tokens. Also not changed: the `gap-[34px]` stat-row gap, which already matches the
reference exactly and predates this feature — no token added for it here (out of FR-003's scope,
which is about the *metrics display*, not row spacing).

## 9. Live-Webinar badge sizing and live-dot ripple (FR-003a, new) — REVISED to use `components/ui/Badge.tsx`

**Decision**: `TechGrit Homepage.dc.html` (lines 312-317) gives this badge a structure and sizing
the current implementation doesn't have at all — it isn't a partial mismatch, the dot/ripple and
several sizing values are simply absent today.

**Reversed from the first pass of this addendum**: the inner gradient chip was initially built as
bespoke `Hero.tsx` markup (a raw `<span>` with its own class string), on the theory that its sizing
was hero-only and didn't match `Badge`'s generic 10.5px/`px-[11px] py-[5px]` shape. Per direct
instruction, this is reversed — `components/ui/Badge.tsx` is extended instead, and `Hero.tsx`
consumes it, so the hero's badge stops being a one-off markup fork of the shared primitive:

- `Badge.tsx` gains a `size?: "sm" | "lg"` prop (default `"sm"`, an exact, non-breaking extraction of
  the component's existing sizing — every current call site keeps rendering identically) and a new
  `tone: "live"` (same gradient/text color as `orange`, plus its own chip shadow). `BASE` was split
  so sizing (`SIZE_CLASSES`) and color (`TONE_CLASSES`) no longer both try to own the same
  properties — avoids the exact class of Tailwind same-specificity conflict Principle I's heading
  rule already warns about, just applied to a non-heading component here.
- `Hero.tsx`'s inner chip becomes `<Badge tone="live" size="lg">{dot+ripple}{"Live Webinar"}</Badge>`
  — the dot/ripple markup (§9 below) is passed as ordinary `children`, the same way every other
  `Badge` consumer passes its label content.
- Verified byte-for-byte equivalent: `BASE + SIZE_CLASSES.lg + TONE_CLASSES.live` resolves to the
  exact same 13 utility classes (background, text color, padding, font-size, tracking, shadow) the
  original inline `<span>` carried — confirmed via computed-style diff (background-image, color,
  padding, font-size, letter-spacing, box-shadow, gap, border-radius, font-weight all match). Zero
  visual/pixel change, per the explicit instruction accompanying this refactor.

Outer badge (the anchor wrapping the chip, description text, and arrow) stays hero-only bespoke
markup — `Badge` covers the chip label only, matching how every other `Badge` consumer already sits
inside its own hero/section-specific wrapper rather than `Badge` owning the whole row:

| Layer | Reference value | Token | Status |
|---|---|---|---|
| Outer badge background | `linear-gradient(135deg, rgba(232,119,34,0.12), rgba(245,158,11,0.06))` | `--gradient-live-badge` | New |
| Outer badge border | `rgba(232,119,34,0.6)` | `--color-border-orange-strong` | **Already exists** (`tokens.css` line 110, currently commented "Input focus border" — exact value match, reused) |
| Outer badge blur | `10px` | `--blur-10` | **Already exists** (`tokens.css` line 540) |
| Outer badge shadow | `0 18px 46px -14px rgba(232,119,34,0.7), 0 4px 16px -6px rgba(232,119,34,0.4)` | `--shadow-live-badge` | New |
| Inner chip background | `linear-gradient(135deg,#F59E0B,#E87722)` | `--gradient-brand` | **Already exists** (`tokens.css` line 216 — byte-identical, reused, same as `Badge`'s `orange` tone) |
| Inner chip text color | `#08111f` | `--color-badge-text` | **Already exists** (`tokens.css` line 44 — exact match, reused) |
| Inner chip letter-spacing | `0.16em` | `--ls-widest` | **Already exists** (`tokens.css` line 321, "Section labels uppercase" — exact value match, reused) |
| Inner chip shadow | `0 6px 18px -4px rgba(245,158,11,0.6)` | `--shadow-live-badge-chip` | New |
| Green dot glow | `0 0 12px 3px rgba(52,211,153,0.9)` | `--shadow-glow-green` | New (replaces `Hero.tsx`'s current hardcoded `shadow-[0_0_12px_2px_rgba(52,211,153,0.85)]`, a pre-existing Principle I gap now fixed in passing since this element is being rebuilt) |
| Ripple ring border | `2px solid rgba(52,211,153,0.85)` | `--color-border-green-85` | New (follows the existing `--color-border-green-40` naming convention, `tokens.css` line 127, at the reference's own 0.85 opacity) |
| Arrow color | `#F7B733` | `--color-amber-light` | **Already exists**, already consumed via `text-amber-light` in current code |

Outer/inner padding (`12px 30px 12px 12px` / `11px 20px`) and border-radius (`80px` / `70px`, both
functionally `rounded-full` badges) use arbitrary Tailwind values directly, the same convention this
exact badge already uses today (`py-[7px] pr-4 pl-[7px]`) — no new spacing tokens needed.

**New keyframe — `tgLiveRipple`**: no existing `tg*` keyframe produces an expanding, fading ring;
`tgpulse` and `tgblink` are both symmetric back-and-forth animations, not a one-directional
expand-and-reset. Added to `globals.css` following the existing `tg`-prefix convention:

```css
@keyframes tgLiveRipple {
  0%   { transform: scale(0.8); opacity: 0.9; }
  100% { transform: scale(1.6); opacity: 0; }
}
```
Applied as `animate-[tgLiveRipple_1.8s_cubic-bezier(0.2,0.7,0.2,1)_infinite] motion-reduce:animate-none`,
matching the reference's own timing exactly and the app's existing `motion-reduce` convention used
elsewhere in `Hero.tsx`.

**Markup**: the dot is two stacked absolutely-positioned spans inside an `11px × 11px` relative
wrapper — an inner solid circle (`bg-green`, `shadow-glow-green`) and an outer ring
(`border-2 border-border-green-85`, `inset:-3px` via `-inset-[3px]`, the `tgLiveRipple` animation).
This nests inside the inner gradient chip, before the "Live Webinar" text, per the reference's
markup order.

## 8. Trusted-Clients extraction (FR-004)

**Decision**: new `app/_home-components/TrustedClients.tsx`, rendered in `app/page.tsx` between
`<Hero />` and `<SubscribeBand />` — the same document position the reference uses (`</section>`
closing `#tg-hero`, then a new `<section aria-label="Trusted by our clients">`). Reuses the
existing `TRUSTED_CLIENT_LOGOS` array from `home-data.ts` (`src`/`alt`/`height` per logo already
matches the reference's per-logo heights).

**Stable key (Principle III)**: `TrustedClientLogo` now carries a required `id` field (already
added to `home-data.ts` ahead of this task, one per logo — `"evolve"`, `"sunnyday"`, `"bcbs"`,
`"aqua"`, `"commsai"`, `"turnqey"`). `TrustedClients.tsx`'s `.map()` MUST key on `logo.id`, not
`logo.alt` — the latter is display text, which Principle III's "Stable identity for repeated
content" rule disallows as a `key` source.

**Visual treatment — kept as-is (spec.md Clarifications, Session 2026-08-04) — REVISED**: the
prior addendum planned adopting the reference's own plain-background/grayscale-then-color logo
treatment (reference lines 356-361: `grayscale(100%) brightness(1.6) opacity(0.75)` →
`grayscale(0%) brightness(1.05) opacity(1)` on hover, no card). That is now explicitly out of
scope. The current white rounded logo card (`bg-white`, shadow, hover-lift) is preserved exactly as
implemented today — only its position (own section instead of nested in the hero) changes. The two
`--filter-logo-rest`/`--filter-logo-hover` tokens planned in the original addendum are dropped;
they are not added to `tokens.css`.

New tokens still needed for the label/divider (unaffected by the styling-treatment reversal):

| Token | Value | Section |
|---|---|---|
| `--ls-24` | `0.24em` (section label tracking) | 6. TYPOGRAPHY (letter-spacing group) |
| `--color-border-hairline-08` | `rgba(255, 255, 255, 0.08)` (section top divider) | 4. BORDERS & GLASS |

`--ls-24` and `--color-border-hairline-08` get `@theme inline` mappings (`--tracking-24`,
`--color-border-hairline-08`) since they're consumed via bare Tailwind utilities (`tracking-24`,
`border-border-hairline-08`), per Principle I's "every token consumed via a bare utility needs a
mapping" rule.

**Scroll behavior (FR-004, Edge Case line 172) — REVISED to genuine overflow detection**: the
original addendum used a fixed-breakpoint proxy (`justify-center` by default, `justify-start
overflow-x-auto` only below `sm`), reasoning the 6 current logos never overflow above `sm` in
practice. spec.md's Clarifications (Session 2026-08-04) now require this to hold generally,
independent of breakpoint, so it stays correct if the logo count grows — a fixed breakpoint proxy
no longer satisfies FR-004 as written. `TrustedClients.tsx` instead uses a small client-side
overflow check, using only native browser APIs (no new library, consistent with spec.md's
Assumptions):

```ts
"use client";
const wrapRef = useRef<HTMLDivElement>(null);
const [overflowing, setOverflowing] = useState(false);
useEffect(() => {
  const node = wrapRef.current;
  if (!node) return;
  const check = () => setOverflowing(node.scrollWidth > node.clientWidth + 1);
  check();
  const observer = new ResizeObserver(check);
  observer.observe(node);
  return () => observer.disconnect();
}, []);
```
`overflowing` toggles the wrapper between `justify-center` (static, no scroll) and `justify-start
overflow-x-auto` (scrollable). This is a one-off measurement colocated in `TrustedClients.tsx` —
not a new shared hook/file, since no second consumer exists yet (consistent with the codebase's
"don't pre-scaffold" convention). `tabIndex={0}` and `role="group"` with an `aria-label` stay on the
scrollable wrapper regardless of `overflowing` state, so the strip is always keyboard-focusable and
its native horizontal scroll (when active) is reachable via arrow keys — directly answers the open
edge-case question ("is the scroll region reachable... for keyboard-only... users?").

**Scroll affordance — corrected to reuse existing tokens (Principle I)**: when `overflowing` is
true, a right-edge fade signals "more content" without a visible native scrollbar breaking the
section's chrome-less dark surface. The mask's opaque color stop and fade width both reuse
existing tokens rather than hardcoding new literals — `#000` would duplicate the existing
`--color-ink` token verbatim (Principle I: "MUST NOT hardcode hex colors... that duplicate an
existing token"), and `32px` already exists as `--space-14a` (`tokens.css` line 357):

```
mask-image: linear-gradient(90deg, var(--color-ink) calc(100% - var(--space-14a)), transparent)
```

Consumed via Tailwind's arbitrary-property syntax (`[mask-image:linear-gradient(90deg,var(--color-ink)_calc(100%-var(--space-14a)),transparent)]`),
the same pattern already used for `bg-[image:var(--gradient-ghost)]` in `Button.tsx` — no new
token needed for either value, and no `@theme inline` mapping needed (arbitrary-property syntax
reads both custom properties directly). When `overflowing` is false, no mask is applied (full
opacity, matching the current static layout exactly). The scrollbar itself stays hidden via the
strip's existing
`[scrollbar-width:none] [&::-webkit-scrollbar]:hidden` classes (already present in `Hero.tsx`'s
current nested version), carried over unchanged.

## 10. Sitewide legacy `h1` override (discovered during Phase 2 polish, FR-045, new)

**Symptom**: after implementing FR-002a (removing `Hero.tsx`'s own `leading-[0.99]` override), the
hero h1 still rendered at 44px instead of the reference's 62px at desktop widths — despite
`--text-h1` correctly resolving to `clamp(44px, 5.5vw, 62px)` (confirmed via
`getComputedStyle(el).getPropertyValue('--text-h1')` at every ancestor, and via a synthetic
`clamp()` probe on the same page correctly returning `62px` at the same viewport, ruling out any
viewport/tooling artifact).

**Root cause**: `app/globals.css` contains a **legacy, pre-v2-migration rule**, unconditional for
any viewport ≥960px:


This predates the `--text-h1` fluid-clamp system entirely — it's a leftover from the old discrete
step-breakpoint approach the "BREAKPOINTS" comment two lines above it still describes ("md = 960px
→ ... H1 shrinks to 44px"), never removed when `tokens.css`'s v2 migration introduced the
clamp-based `--text-h1` (see the "v2 canonical hero cap 62px absorbs per-page deltas" comment,
`tokens.css` line 242). Because this rule targets the bare `h1` selector at equal specificity to
`globals.css`'s own `h1 { font-size: var(--text-h1); ... }` base rule, and appears **later** in
source order, it wins the cascade unconditionally at every desktop width — silently capping **every
h1 on every page** at 44px instead of each page's intended cap (confirmed: Home/Hero 62px, About
60px, Construction 54px — all three were stuck at 44px before this fix, all three now resolve
correctly).

**Fix**: delete the `h1 { font-size: 44px; }` block from inside that `@media (min-width: 960px)`
rule; leave its siblings (`.section { padding-block: 60px; }`, `.glass-card:not(.glass-card-md) {
padding: 24px 28px; }`) untouched — they are legitimate, unrelated rules for the same breakpoint.

**Scope note**: this fix has a sitewide blast radius (every page's `h1`), wider than this
addendum's own Hero-only scope. It is included here because it was the actual root cause of the
Hero h1 fidelity bug this addendum exists to fix, and per Principle I it is a defect (a dead rule
silently defeating the token system), not a design choice — leaving it in place would mean FR-002a
could never actually be satisfied. Spot-checked after the fix: About (60px) and Construction (54px)
both now render at their documented per-page caps instead of 44px, with no other visual regression
observed on either page's heading.

## New tokens summary (Phase 2 addendum) — REVISED

| Token | Section | Mapped in `globals.css`? |
|---|---|---|
| `--text-stat-count` | 6. TYPOGRAPHY | Yes — `--text-stat-count` |
| `--ls-stat-count` | 6. TYPOGRAPHY | Yes — `--tracking-stat-count` |
| `--ls-24` | 6. TYPOGRAPHY | Yes — `--tracking-24` |
| `--color-border-hairline-08` | 4. BORDERS & GLASS | Yes — `--color-border-hairline-08` |
| `--gradient-live-badge` | 5. GRADIENTS | No — consumed via `bg-[image:var(--gradient-live-badge)]` arbitrary property, same pattern as `--gradient-ghost` |
| `--shadow-live-badge`, `--shadow-live-badge-chip`, `--shadow-glow-green` | 10. SHADOWS | No — consumed via `shadow-[var(--shadow-live-badge)]`-style arbitrary property |
| `--color-border-green-85` | 4. BORDERS & GLASS | Yes — `--color-border-green-85` (consumed via `border-border-green-85` utility) |

Dropped from the original addendum: `--filter-logo-rest`, `--filter-logo-hover` (styling-treatment
reversal, see above).

Already-existing tokens reused without any new addition (confirmed exact value matches during this
research pass): `--color-border-orange-strong` (0.60 — badge border), `--blur-10` (badge blur),
`--gradient-brand` (inner chip background), `--color-badge-text` (inner chip text), `--ls-widest`
(inner chip letter-spacing), `--color-amber-light` (suffix/arrow color).

## 11. Subscribe band container, background, inputs, and button fidelity (FR-005)

**Companion to**: [plan.md](./plan.md) Phase 2 addendum, "Homepage Subscribe Band (FR-005)" | **Spec**:
[spec.md](./spec.md), FR-005, Clarifications Session 2026-08-05

Scope: only `app/_home-components/SubscribeBand.tsx`. §§5-10 above (Hero, Trusted Clients) are
unaffected.

**Decision**: `TechGrit Homepage.dc.html` (lines 366-386) and the current `SubscribeBand.tsx`
diverge on four points, all confirmed during spec.md's clarification session (2026-08-05):

| Property | Current (`SubscribeBand.tsx`) | Reference (line) | Fix |
|---|---|---|---|
| Container max-width | `max-w-[1020px]` | `max-width:1280px` (368) | `max-w-[1280px]` — matches the sibling `TrustedClients.tsx` section's own container exactly |
| Container vertical padding | `py-[88px]` | `padding:80px 36px 80px` (368) | `py-20` (80px) — horizontal `px-9` (36px) already matched, unchanged |
| Outer `<section>` background/border | `bg-[rgba(255,255,255,0.015)]` + `border-t border-border-subtle` | none declared (367) | removed entirely — the page's black background shows through unmodified |
| Name/Email input widths | fixed `w-[150px]` / `w-[180px]` | `flex:1 1 0` / `flex:2 1 0`, `min-width:0` (383-384) | `flex-1 min-w-0` / `flex-[2] min-w-0` |
| Form row | `flex flex-wrap items-center gap-2.5` (10px) | `display:flex; gap:12px; flex-wrap:nowrap; width:100%` (382) | `flex flex-nowrap items-center gap-3 w-full` (12px) — the gap correction is a direct corollary of matching the reference's own full-width, no-wrap row, not a separately-raised item |
| Input padding/height | `px-4 py-3.5` (16px/14px), no min-height | `padding:15px 18px`, `min-height:52px` (383-384) | via `FormField`'s existing `inputClassName` prop (not `INPUT_BASE`) — see below |
| Button padding/height | `!py-3` (12px), no min-height | `padding:15px 24px`, `min-height:52px` (385) | `!py-[15px]` + `!min-h-[52px]` (horizontal `!px-[24px]` already matched, unchanged) |

**Not changed (confirmed already reference-exact)**: the card itself (`glass-card px-11 py-[38px]`)
— `--color-border` (0.12), `--radius-3xl` (22px), `--shadow-glass`
(`0 24px 60px -20px rgba(0,0,0,0.6)`), and `--blur-lg` (14px) are all confirmed exact-value matches
to the reference's card styling (line 369) already, with no fix needed. The input background/border
(`--color-glass-strong` = `rgba(255,255,255,0.06)`, `--color-border-strong` = `rgba(255,255,255,
0.16)`) and the button's gradient (`--gradient-brand` = `linear-gradient(135deg,#F59E0B,#E87722)`)
are likewise already exact matches — this addendum's button/input fixes are sizing-only, not color.

**Not changed (deliberately out of scope)**: the outer text/form grid — reference uses
`grid-template-columns:0.8fr 1.4fr; gap:40px` (370); current code uses `grid-cols-[1fr_auto]
gap-9` (36px). This 4px gap delta and the differing column-proportion approach were not raised in
this session's clarification (which covered container width, input width, section background, and
button only) — left as a recorded, out-of-scope discrepancy, not touched by this addendum.

**No new `tokens.css` entries needed**: `py-20` (80px) and `gap-3` (12px) are Tailwind's own
default spacing-scale utilities, the same convention already used sitewide for round spacing values
(`px-9`=36px, `py-14`=56px, `gap-9`=36px elsewhere in this same file/its sibling) rather than bespoke
custom-property tokens — Tailwind's default scale itself is the "token" for standard round values;
`tokens.css` is reserved for values the default scale doesn't cover. The input/button padding-height
fixes (`15px`/`18px`/`52px`) are applied as per-instance arbitrary-value overrides — `FormField`'s
`inputClassName` prop for the two inputs (already part of its public API, unused by this file until
now) and `Button`'s own `className` override (this exact call site already uses `!px-[24px] !py-3`
today) — the same escape-hatch pattern this feature already relies on elsewhere, not a new one.

**Why `inputClassName`, not `INPUT_BASE`**: `FormField`'s shared `INPUT_BASE` (`px-4 py-3.5`, no
min-height) is consumed by every other page's form — Contact and Careers' Apply dialog — which must
stay visually unchanged (Principle III: extend, don't fork or globally mutate a shared primitive for
one caller's need). `inputClassName` merges additively onto `INPUT_BASE`'s class list, so only
`SubscribeBand.tsx`'s two inputs pick up the `15px 18px`/`52px` override; every other `FormField`
consumer is untouched.

## 12. "How We Deliver" methodology section fidelity (FR-006)

**Companion to**: [plan.md](./plan.md) Phase 2 addendum, "Homepage Methodology / 'How We Deliver'
(FR-006)" | **Spec**: [spec.md](./spec.md), FR-006, Clarifications Session 2026-08-05

Scope: only `app/_home-components/MethodologySection.tsx` and 4 new exports in
`components/ui/icons.tsx`. §§5-11 above are unaffected.

**Decision**: `TechGrit Homepage.dc.html` (lines 449-504, plus the JS-computed `phaseTabs`/`active`
render data at lines 1372-1384) and the current `MethodologySection.tsx` diverge on five confirmed
points:

| Property | Current | Reference | Fix |
|---|---|---|---|
| Top-rail node content | bare numeral `{phase.n}` in a 58px circle | one of 4 distinct SVG icons per phase (lines 463-466), same 58px circle | swap numeral for the matching new icon component, switched on `phase.n` |
| Phase-detail visual panel | 170px-font-size gradient-text numeral (`{active.n}`) | 170px-diameter circular `linear-gradient(140deg,#F7B733,#E87722)` badge containing the same phase's icon at 82px (lines 491-496) | replace the numeral treatment with the circular icon badge; "Phase 0{n}" corner label (line 497) already present in current code, unchanged |
| Phase title/week `fontFamily` | hardcoded `"Arial, sans-serif"` (2 occurrences) | none set — inherits body font (lines 1378-1379: `titleStyle`/`weekStyle` carry no `font-family`) | remove both hardcoded overrides |
| Content column width | `max-w-[1100px]` | `max-width:1280px` (line 452) | `max-w-[1280px]` |
| Phase-detail panel responsive collapse | none (`grid-cols-[1.25fr_0.75fr]` fixed at every width) | intended `grid-template-columns:1fr` at ≤960px, but the reference's own selector (`[data-phase-card]`/`[data-step-panel]`, line 131-132) doesn't match the actual `data-phase-panel` element — dead/broken in the reference itself | add `max-tg-md:grid-cols-1` anyway (spec.md Clarifications: treat as a preview-tool typo, not intentional) |

**Icon source and reuse (Principle III/IV)**: each phase's icon is extracted verbatim from the
reference's hardcoded `isP1`-`isP4` conditionals (top rail, 26px) — there is no per-phase `icon` field
in `this.phases` in the reference; the icon choice is positional (index 0-3), not data-driven. The
same 4 shapes reappear at 82px in the phase-detail panel via the reference's own separate
`hpIsP1`-`hpIsP4` conditionals — confirmed byte-identical `<path>`/`<polyline>`/`<circle>` data to
their 26px counterparts, just larger. Because `home-data.ts`'s `MethodologyPhase` type already
carries a stable `n: number` (1-4) field, no new data field is needed — `MethodologySection.tsx`
switches on `phase.n`/`active.n` directly. The 4 new components (`PhaseArchitectIcon`,
`PhaseAgenticBuildIcon`, `PhaseIndustrializeIcon`, `PhaseImpactIcon`) go in
`components/ui/icons.tsx` — the constitution's single consolidated icon file — following its existing
`IconProps`/`{...props}`-last convention, so the same component renders at both `26px` (top rail,
default) and `82px` (phase-detail panel, via a `width`/`height` override), satisfying FR-006's "the
same icon used for that phase in the top timeline (not a separate/distinct icon)" literally: one
component, two call sites, per phase.

**Confirmed defect, not a design choice (Arial override)**: the reference's `titleStyle`/`weekStyle`
objects set `marginTop`/`fontSize`/`fontWeight`/`color`/etc. but no `fontFamily` at all — meaning
these labels inherit the page's body font in the reference. The current code's
`style={{ fontFamily: "Arial, sans-serif" }}` on both labels has no reference backing and
contradicts the app's own brand system (`--font-body`/`--font-display`, both Calibri/Carlito, never
Arial). Removing it is a bug fix, not a value change — both labels already have every other property
(`--text-sm`=15px, `--space-5a`=15px margin-top, `--text-xs-alt`=11.5px) correctly token-matched
today; only the stray inline `fontFamily` needs deleting.

**Width fix**: `max-w-[1100px]` → `max-w-[1280px]` is a one-word Tailwind arbitrary-value change,
consistent with every other homepage section already using `max-w-[1280px]` (Trusted Clients,
Subscribe Band above).

**Eyebrow migration to `SectionEyebrow`**: FR-006's existing text already names "the same
`SectionEyebrow` toggle as FR-017/FR-019/FR-033" as the intended mechanism — this was never
ambiguous, simply not yet implemented. Today the eyebrow is bespoke markup:
`<span className="inline-flex items-center gap-[9px] ..."><span aria-hidden="true" className="h-[2px]
w-6 bg-orange" />How we deliver</span>`, wrapped in a `<div className="mb-3.5 text-center">`. Migrating
to `<SectionEyebrow showAccent={false}>How we deliver</SectionEyebrow>` (Principle III: extend the
existing primitive, don't re-fork bespoke dash markup per section) drops the leading dash correctly,
but `SectionEyebrow`'s own wrapper already carries `mb-4` (16px) — the outer `<div>`'s `mb-3.5` (14px,
matching the reference's own `margin-bottom:14px`, line 453) becomes redundant and is removed in
favor of the shared component's built-in spacing. **Accepted 2px delta**: `SectionEyebrow` is already
consumed with this exact built-in spacing on every other page using `showAccent={false}` (Industries,
About) — introducing a one-off spacing override for this single call site would fork the primitive's
behavior for a 2px difference, the same category of sub-visible delta this feature has already
declined to chase elsewhere (e.g. the Hero stat-divider border, research.md §7).

**Not changed**: the scroll-pin mechanics (420vh track, `position:fixed` stage-pinning,
scroll-driven `activeIndex`), the phase-rail progress-fill clip-path animation, the deliverables
checklist (`CheckIcon` in an amber circle), and the headline's gradient-clip treatment all already
match the reference exactly and are untouched by this addendum.

**No new `tokens.css` entries needed**: the circular badge's gradient (`linear-gradient(140deg,
#F7B733,#E87722)`) is a new literal not currently in `tokens.css` under this exact angle/stop
order — checked against `--gradient-brand` (`135deg`) and `--gradient-phase-node` (already used for
the top-rail node's filled state); confirms `--gradient-phase-node`'s existing value is this same
`140deg,#F7B733,#E87722` gradient already, reused as-is via `var(--gradient-phase-node)` for the
circular badge background — no new token, no duplicate.

## 13. "Don't Migrate / Re-Imagine" grid fidelity (FR-007)

**Companion to**: [plan.md](./plan.md) Phase 2 addendum, "Homepage Re-Imagine Grid (FR-007)" |
**Spec**: [spec.md](./spec.md), FR-007

Scope: only `app/_home-components/ReImagineSection.tsx`, `components/ui/GlassCard.tsx`,
`components/ui/icons.tsx`, `app/_home-components/home-data.ts`, `app/tokens.css`, `app/globals.css`.
§§1-12 above are unaffected.

**Decision**: `TechGrit Homepage.dc.html` (lines 508-573) and the current `ReImagineSection.tsx`
diverge on four confirmed points:

| Property | Current | Reference | Fix |
|---|---|---|---|
| Top 3 cards' icon | 3 distinct icons, one per card | one identical star-burst icon on all 3 (lines 521/533/545) | new shared `ReimagineSparkleIcon`, used on all 3 |
| Top 3 cards' imagery | none | an `image-slot` per card (180px tall) | `MediaSlot` per card, wired to the real assets already present at `public/samples/dm-copilot.png`/`dm-tech-debt.png`/`dm-scalability.png` (confirmed via `Bash` search) — no "Coming soon" fallback expected |
| Top 3 cards' hover | lift + border-color only | (not present in reference; added per FR-007's own text, not the reference) | add `hover:bg-hover-orange-fill-14` on top of the existing lift/border/glow |
| 4th "card" (comparison panel) | plain `<div>`, `LightningIcon`, no hover | plain `<div>`, no hover (lines 558-572) | becomes a `GlassCard` (FR-007's unification ask) with `TechGritMarkIcon`, hover explicitly disabled to stay reference-exact |

**Tokens needed**: `--color-border-9` (0.09 border), `--color-glass-3` (0.03 background), and two
hover-glow shadows (`--shadow-reimagine-glow`/`-soft`, `0 0 60px -10px rgba(232,119,34,0.40/0.35)`) —
none of these exact values exist in `tokens.css` today. Radius (22px), gap (22px), padding (26px), and
section padding (80px) all already have exact canonical classes (`rounded-3xl`, `gap-tg-9`, `p-tg-11`,
`p-20`) — confirmed via `tokens.css`/`globals.css`, no new tokens needed for those four.
**Note**: `--color-glass-3` is a new, distinct token — `tokens.css` already has an unrelated,
pre-existing duplicate `--color-glass-faint` key (0.03, silently shadowed by a later 0.04
redeclaration for Case-Study cards); `--color-glass-3` does not fix that bug and must not be confused
with or merged into it.

**Not changed**: the comparison bars' percentages, labels, and scroll-reveal animation already match
the reference and are untouched by this addendum.

**Reusable-component refactor (resolves `/speckit.analyze` finding C1)**: `/speckit.analyze`
(2026-08-05) flagged that FR-006's "reusable by other pages" clause had zero task coverage and
conflicted with the constitution's own anti-speculative-structure rule (`.specify/memory/
constitution.md` lines 488-489: "nothing moves to `components/ui/` until it's genuinely consumed by
more than one route"). Investigation found a real, evidenced candidate second consumer:
`TechGrit Frameworks.dc.html`'s "UNIFIED FRAMEWORK PORTFOLIO" section (`id="showcase"`) uses the
identical scroll-pinned phase-panel/rail mechanic — its own source comment reads "scroll-driven
pinned phase panel — same technique as homepage Sprint-to-Scale" — and `nav-config.ts`'s "How We
Work" nav item already links to `/frameworks` (`matchPaths: ["/frameworks"]`), a route that doesn't
exist yet (currently 404s).

**Decision (spec.md Clarifications, Session 2026-08-05)**: building `/frameworks` is **not** brought
into this feature's scope (too large a scope reversal from spec.md's existing Assumption that this
reference file is out of scope). Instead, `MethodologySection.tsx` is refactored to accept its
content via props — the minimal set needed to decouple it from `home-data.ts` and satisfy "reusable"
honestly:

```ts
type MethodologySectionProps = {
  phases: MethodologyPhase[];  // MethodologyPhase now carries a required `icon: IconComponent` field
  eyebrow: string;
  heading: ReactNode;
};
```

`app/page.tsx` passes `METHODOLOGY_PHASES` (from `home-data.ts`), `"How we deliver"`, and the existing
gradient-clip heading JSX. This is the smallest change that makes the component's *content* genuinely
swappable, matching the clarification's "minimal props" answer — not the fuller shape Frameworks
would eventually need (per-phase `accentColor`, a 2-column features+"Best for"+CTA content mode),
since no consumer exists yet to justify that additional surface area.

**Revised (`/speckit.analyze` finding I1)**: the original draft of this decision planned a separate
`getIcon: (n: number) => ComponentType<SVGProps<SVGSVGElement>>` lookup-function prop, switched on
`phase.n`. A follow-up `/speckit.analyze` pass flagged this as an unnecessary, less-idiomatic shape:
`home-data.ts` already defines `export type IconComponent = ComponentType<SVGProps<SVGSVGElement>>`
(line 14) and uses it as a **direct per-item data field** — `icon: IconComponent` — in
`PlatformCapability` (lines 68-69) and two other adjacent types in the same file, all populated the
same way (`icon: AutonomousAgentIcon`, etc.). There is no reason `MethodologyPhase` should be the one
type in this file that sources its icon through an index-based callback instead of a data field.
`MethodologyPhase` gains the same `icon: IconComponent` field, populated per phase in
`METHODOLOGY_PHASES` with the 4 new icons from item 1 (`icon: PhaseArchitectIcon`, etc.) —
`MethodologySection.tsx` then reads `phase.icon`/`active.icon` directly, with no lookup indirection
and no `getIcon` prop at all. This is a **superset-compatible simplification**, not a scope change:
the props list shrinks by one, and `home-data.ts` picks up one new field on an existing type.

**Why file location doesn't change**: FR-006 says "reusable by other pages," not "relocated to
`components/ui/`." The constitution's rule gates the *location* change on genuine multi-route
consumption, which this feature deliberately doesn't create. `MethodologySection.tsx` stays in
`app/_home-components/`, now prop-driven internally but still only imported by `app/page.tsx` — this
resolves the C1 tension without violating the anti-speculative-structure rule in either direction (no
premature move, no unfulfillable requirement).

**What changes in `home-data.ts` (revised per finding I1)**: `MethodologyPhase` gains one required
field, `icon: IconComponent` (the same type already imported for `PlatformCapability` et al.), and
each of the 4 `METHODOLOGY_PHASES` entries gets its matching icon from item 1. No other field changes
— `n`, `week`, `title`, `description`, `deliverables` are untouched. No new file, no new shared
primitive beyond the 4 icons already planned in item 1.

**Discovered during implementation — RSC server/client props boundary**: `npm run build` failed with
`Error: Functions cannot be passed directly to Client Components` when `app/page.tsx` (a Server
Component — no `"use client"`) passed `METHODOLOGY_PHASES` (each phase carrying `icon: IconComponent`,
a function) directly into `<MethodologySection>` (`"use client"`). Next.js's App Router only allows
serializable values — plain data and already-rendered React elements — across a Server→Client props
boundary; a raw component *reference* is a function and cannot cross it, regardless of whether it's
passed as a data field (this addendum's original plan) or as a lookup-callback prop (the pre-I1
design) — both fail identically, since the restriction is about the value being a function at all,
not about which shape carries it.

**Fix**: `MethodologySection`'s prop type does not reuse `home-data.ts`'s `MethodologyPhase` directly.
It defines its own `MethodologyPhaseContent` (exported from the component) where `icon`/`badgeIcon`
are `ReactNode`, not `IconComponent`. `app/page.tsx` — still a Server Component, still the only place
that imports the icon components — pre-renders each phase's icon at both sizes before crossing the
boundary:

```tsx
phases={METHODOLOGY_PHASES.map((phase) => ({
  ...phase,
  icon: <phase.icon />,              // 26px, top-rail node (default size)
  badgeIcon: <phase.icon width={82} height={82} />,  // 82px, phase-detail badge
}))}
```

This is not merely an RSC workaround — it is arguably the more correct reusable-component API
regardless of the server/client boundary: it mirrors the same `ReactNode`-slot pattern already used
for the `heading` prop (the caller fully owns what renders, `MethodologySection` just places it), and
it removes the section's only remaining dependency on knowing *how* to instantiate an icon component
(size, props) — a future consumer supplies finished nodes, not a component reference it has to know
how to call correctly. `home-data.ts`'s `MethodologyPhase.icon: IconComponent` field (T024a) is
unaffected by this — it's still the single source of truth for which icon belongs to which phase;
only the last step (turning that reference into a node) moved to the Server Component boundary where
it's actually safe to do so.

**New token found missing during implementation**: the phase-detail badge's box-shadow
(`0 0 80px rgba(232,119,34,0.55), inset 0 3px 20px rgba(255,255,255,0.35)`, `TechGrit Homepage.dc.html`
line 491) had no existing token — this addendum's original token check only confirmed the gradient
background, not the shadow. Added `--shadow-phase-badge-glow` to `tokens.css`'s SHADOWS section
(next to the existing `--shadow-phase-ring`/`--shadow-phase-active` Methodology tokens), consumed via
`shadow-[var(--shadow-phase-badge-glow)]` — the same arbitrary-property pattern already used for
`--shadow-live-badge` in `Hero.tsx`, no `@theme inline` mapping needed.

## 14. Homepage Industries Section fidelity (FR-008)

**Companion to**: [plan.md](./plan.md) Phase 2 addendum, "Homepage Industries Section (FR-008)" |
**Spec**: [spec.md](./spec.md), FR-008, Clarifications Session 2026-08-06

Scope: only `app/_home-components/IndustriesSection.tsx`, `app/_home-components/home-data.ts`,
`components/ui/GlassCard.tsx`'s `industry` variant, `components/ui/icons.tsx`, `app/tokens.css`,
`app/globals.css`. §§1-13 above are unaffected. This is **not** `/construction` — that page's own
requirements (FR-016–FR-021) have no research entry here; nothing in this section touches them.

**Decision (scope correction)**: FR-008's original text ("ghost button, icon replacement, background
image removal, per-card-link removal") was first mis-scoped to the standalone `/construction` page,
matching an earlier spec.md Assumption. Re-clarified (Session 2026-08-06): it targets the homepage's
`IndustriesSection.tsx` 3-card grid, rendered directly after "Don't Migrate / Re-Imagine." "Background
image" in the original request meant the per-card `MediaSlot` photo, not a section-level background —
confirmed neither the current implementation nor `TechGrit Homepage.dc.html` (lines 577-604) has a
section-level background image here.

**Decision (card structure)**: `TechGrit Homepage.dc.html` (lines 586-602) shows no per-card photo at
all — each card is a `data-card` anchor containing a 56px colored circular icon badge (white stroke
icon on a solid color fill), a title, and a description. The current implementation instead shows a
photo (`MediaSlot`) with a small bordered icon overlaid at its bottom-left corner. Per the
clarification, the card structure changes to match the reference exactly — the photo is removed, the
icon badge becomes the card's only visual element above the text.

| Property | Current | Reference | Fix |
|---|---|---|---|
| Icon presentation | small bordered badge overlaid on a photo | large 56px solid-color circle, white icon | `GlassCardIcon` resized to `h-14 w-14 rounded-full`, backed by a per-industry solid-fill class |
| Photo | `MediaSlot`, `relative h-[178px]` wrapper | none | removed entirely; `IndustryCard.image` field removed |
| Icon set | shared `FinTechIcon`/`HealthcareIcon`/`ConstructionIcon` (also used by the nav mega-menu) | 3 distinct SVGs at lines 588/593/598, different shapes from the nav's icons | 3 new dedicated exports (`Industry*Icon`), nav mega-menu icons untouched |
| Card link | only Construction has an inline "Explore Construction →" text link inside the card | all 3 cards are `data-card` anchors (FinTech/Healthcare → an unbuilt Industries-hub page's anchors, Construction → its own page) | only Construction wraps the whole card in a link to `/construction` (the only real destination in this app); FinTech/Healthcare stay non-clickable |

**Decision (icon-sharing conflict)**: `HealthcareIcon` and `ConstructionIcon` (`components/ui/icons.tsx`)
are imported by both `home-data.ts`'s `INDUSTRY_CARDS` (this section) and
`components/layout/nav-config.ts`'s "Industries" mega-menu (confirmed via search — 2 consumers, not
1). Repointing these shared exports to the reference's homepage-specific shapes would silently change
the nav mega-menu too, which is out of this addendum's scope. `nav-config.ts` already established the
precedent for exactly this situation: `FinTechIcon`'s shape didn't fit the nav either, so a separate
`NavFinTechIcon` was added rather than mutating the shared export. This addendum follows the same
precedent in the opposite direction — 3 new `Industry*Icon` exports are added for the homepage
section, and the existing `FinTechIcon`/`HealthcareIcon`/`ConstructionIcon` are left untouched for the
nav.

**Decision (card link target)**: since only `/construction` exists as a real route in this app
(FinTech/Healthcare hub pages remain out of scope per the existing "INDUSTRIES PAGE" Clarification,
Session 2026-08-03), the reference's per-card-links-to-a-hub-page pattern can't be replicated
literally. Per the Session 2026-08-06 clarification: only the Construction card becomes a whole-card
link (to `/construction`, replacing its current inline text-link treatment); FinTech and Healthcare
stay non-clickable, since neither has a real destination.

**Tokens needed**: none of the following exist at their exact values today —
- 3 hover border colors (lines 587/592/597): `rgba(139,92,246,0.50)`, `rgba(16,185,129,0.55)`,
  `rgba(59,130,246,0.55)` — new `--color-border-violet-50`/`-green-55`/`-blue-55`. (The existing
  `--color-border-blue-strong`/`-teal-strong` are different hues/opacities for unrelated cards, not
  matches.)
- 3 hover glow shadows (`0 0 50px -12px rgba(...,0.35)`, same 3 lines) — new
  `--shadow-industry-glow-violet`/`-green`/`-blue`. (The existing `--shadow-glow-*-avatar` tokens are a
  different shadow shape — `0 0 0 -12px`, a Testimonials avatar-ring effect, not a card glow — and are
  not reused here.)
- 1 letter-spacing value, `-0.01em` (card title tracking) — new `--ls-title-tight`. (`--ls-normal` at
  `-0.02em` is the closest existing value but is a different, non-matching number. **Naming, revised
  per `/speckit.analyze` finding M3**: originally planned as `--ls-tight-01`, which reads too similarly
  to the existing, unrelated `--ls-01: 0.01em` — same numeric suffix, opposite sign, different
  component — a realistic source of future mix-ups. Renamed to `--ls-title-tight` before
  implementation.)
- 1 font-size value, `26px` (card title) — new `--text-industry-title`. **Revised per `/speckit.analyze`
  finding C1**: this addendum originally planned to reuse `--text-stat` (already 26px), reasoning that
  Principle I governs values, not names. `/speckit.analyze` correctly identified this as a Principle I
  violation on a stricter reading: the constitution states "each token has exactly one semantic job...
  do not repurpose a token for an unrelated role," and `--text-stat` is explicitly annotated "Hero
  delivery-stat digit size (v2.2 Phase 2)" — a named, single-job token, not a general-purpose scale
  step. A dedicated `--text-industry-title` token is added instead, even though its value duplicates
  `--text-stat`'s.

**Tokens reused, not duplicated** — all exact matches, confirmed by direct comparison against
`tokens.css`:
- Icon-badge fill colors (`#8B5CF6`/`#10B981`/`#3B82F6`) — already `--color-avatar-violet`/`-blue`/
  `-green` (added for the Testimonials avatar circles), already mapped to canonical
  `bg-avatar-violet`/`-blue`/`-green` in `globals.css`.
- Card radius (20px) — `--radius-2xl` (`rounded-2xl`).
- Card padding (`30px 30px 34px`) — `--space-13`/`--space-14` (`p-tg-13`/`pb-tg-14`).
- Icon-to-title gap (44px) — `--space-17` (`mb-tg-17`).
- Card border (0.09) / background (0.03) — `--color-border-9`/`--color-glass-3`, both added earlier in
  this same feature for the Re-Imagine grid (§13) and directly reusable here without any new value.
- Card description size/color (15px, `rgba(255,255,255,0.6)`) — `--text-sm`/`--color-text-60`
  (`text-sm`/`text-60`). Unlike `--text-stat` above, both are general-purpose, many-consumer tokens
  with no single named job, so reusing them is not a Principle I concern.

**Corrected during analysis (`/speckit.analyze` findings H1/H2/M1/M2)** — this addendum's first draft
asserted 3 things as "already correct, no change needed" that a closer check showed were not:

1. **Card title font-size (H1)**: `GlassCard.tsx`'s current `TITLE_VARIANTS.industry` is `"text-[23px]"`
   — the draft's token decision (reuse a 26px value) was never actually wired into an edit; the title
   would have kept rendering at 23px. Fixed: `TITLE_VARIANTS.industry` is now an explicit class swap to
   `"text-industry-title tracking-title-tight"`.
2. **Card description color (H2)**: `DESC_VARIANTS.industry` (`"mt-2.5 text-[15px] leading-[1.6]"`)
   carries no color class, so it was silently inheriting the base `<p>` tag rule's
   `--color-text-secondary` (`rgba(255,255,255,0.72)`, `globals.css:544`) — not the reference's
   `rgba(255,255,255,0.6)`. Fixed: `DESC_VARIANTS.industry` becomes `"mt-2.5 text-sm leading-[1.6]
   text-60"`, adding the missing color and switching `text-[15px]` to its canonical `text-sm`
   equivalent (M1).
3. **Ghost button padding (M2)**: the "no code change needed" claim for FR-008's ghost-button clause
   was true for the shared `Button.tsx` component (correct since Phase 1) but not for
   `IndustriesSection.tsx`'s own call site, which passes `className="px-6!"`. `Button.tsx`'s `md`-size
   default is `px-[26px] py-3.5` (26px/14px) — the horizontal value already matches the reference's
   `26px` (line 584) exactly, so the `px-6!` override (24px, forced via `!important`) was silently
   *regressing* fidelity by 2px, while the actual gap — vertical padding, 14px vs. the reference's 16px
   — went uncorrected. Fixed: the button's `className` changes from `"px-6!"` to `"py-4!"` (16px),
   removing the incorrect horizontal override and adding the missing vertical one; `Button.tsx`'s
   shared `md` size is untouched (other `md` buttons sitewide are unaffected).

**Not changed**: the section's heading and intro paragraph are already reference-correct.

## 15. Homepage Testimonials Section fidelity (FR-009, FR-009a)

**Companion to**: [plan.md](./plan.md) Phase 2 addendum, "Homepage Testimonials Section (FR-009,
FR-009a)" | **Spec**: [spec.md](./spec.md), FR-009, FR-009a, Clarifications Session 2026-08-06

Scope: only `app/_home-components/TestimonialsSection.tsx`, `app/_home-components/home-data.ts`,
`components/ui/icons.tsx`, `app/tokens.css`, `app/globals.css`. §§1-14 above are unaffected.

**Decision (per-card-type element scoping)**: `TechGrit Homepage.dc.html` gives VIDEO cards (lines
638-667) a duration badge, VIDEO label, and play affordance but no verified badge; TEXT cards (lines
669-690) get a verified badge and quote icon but no duration badge or play affordance. Star rating and
a quotation-mark icon appear on both. FR-009's original acceptance scenario listed all of these as if
they apply together when hovering a video card — corrected in spec.md (Clarifications Session
2026-08-06) to the reference-exact per-card-type split above, rather than adding elements the reference
never shows for that card type.

**Discovered during `/speckit.analyze` (finding C1)**: this addendum's first draft still missed one
element the per-card-type split requires — the video card has **no star-rating markup at all** today
(only the text card renders `"★★★★★".slice(...)`); the reference always shows 5 static white stars with
a subtle `text-shadow` on the video card too (line 659), independent of the `rating` field (video
entries in `TESTIMONIALS` don't set one). Folded into plan.md's video-card bullet and the
tokens/component task split below.

**Discovered during `/speckit.analyze` (finding C2, Constitution Principle III)**: both of
`TestimonialsSection.tsx`'s `.map()` render sites key on `testimonial.name` — display text — and the
`Testimonial` type (`home-data.ts`) has no `id`/`slug` field to key on instead. This is the exact
"repeated content keyed on display text" gap Principle III's "Stable identity for repeated content"
bullet forbids, and one this same feature already fixed twice earlier in this Phase 2 addendum
(`DeliveryStat.id`, `TrustedClientLogo.id`, both added specifically because their `.map()` call sites
were keyed on label/alt text). Since FR-009 already rewrites this exact file and its array-consuming
component, the fix is folded in here rather than left as a still-open gap: `Testimonial` gains a
required `id` field (populated for all 6 entries), and both call sites re-key on `testimonial.id`. The
new metrics-card local array (also a `.map()`) is given its own `id` field from the start for the same
reason (finding L1) — a preventive fix rather than a retrofit.

**Decision (hover vs. static styling)**: FR-009's "update card hover background/typography/duration-badge
styling" reads, against the reference's own `style-hover` attributes (transform + border-color +
box-shadow only, both card types), as a description of each card's **static resting-state** values
needing correction — not a new hover-triggered background-color change. Confirmed in spec.md
Clarifications: hover stays limited to transform/border-color/box-shadow.

**Decision (metrics card layout)**: the reference's trust-stats card sits in the same
`display:flex; justify-content:space-between` header row as the eyebrow/title column, wrapping below
it only when the row doesn't fit — not absolutely positioned. Confirmed in spec.md Clarifications.

**Decision (paragraph alignment)**: FR-009's "left-align its eyebrow and title" extends to the
supporting paragraph too, per spec.md Clarifications — the paragraph moves into the same left-aligned
`max-width:640px` column, replacing its current `text-center mx-auto max-w-[520px]` treatment.

**Decision (drag/hold behavior, FR-009a)**: the reference's `_setupTestiDrag` (lines 1208-1221) swaps
the track's cursor between `grab`/`grabbing` on pointer-down/up and temporarily sets
`scroll-snap-type: none` for the duration of the drag gesture, restoring `x proximity` on release. The
current implementation drags the track via `scrollLeft` but does neither. Per spec.md Clarifications,
both are added, reference-exact.

**Decision (edge fades, FR-009a)**: the reference gives the track two edge fades — right (140px,
95%-black) and left (80px, 70%-black), lines 694-696. The current implementation only has the
right-side fade (which already matches the reference exactly, confirmed by direct value comparison —
`--gradient-testimonial-edge`). Only the missing left-side fade needs adding; the right-side token is
unchanged.

**Discovered during `/speckit.analyze` (finding H1)**: this addendum's first draft specified the
`--gradient-testimonial-video` opacity correction (see below) inside the video-card's *component* bullet
in plan.md, not its *tokens* bullet — inconsistent with Principle I ("values change in `tokens.css`
first") and with this feature's own established file-to-task boundary (tokens task vs. component task).
Moved into the tokens list below; the component bullet now only describes consuming the corrected
token.

**Tokens needed** — none of the following exist at their exact values today:
- `--gradient-testimonial-card: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))`
  — text card resting-state background (line 671). The current `--color-glass-4` (flat 0.04) is a
  different shape (flat fill vs. two-stop gradient), not a value match.
- `--gradient-testimonial-edge-left: linear-gradient(-90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.70) 82%)`
  — new left-side track fade (line 696).
- `--shadow-testimonial-hover-video: 0 24px 60px -20px rgba(232,119,34,0.60)` (line 640) and
  `--shadow-testimonial-hover-text: 0 24px 54px -20px rgba(232,119,34,0.28)` (line 671) — two distinct
  shadow shapes, one per card type; neither matches any existing shadow token (the closest,
  `--shadow-reimagine-glow`/`-soft` from §13, is a different shape, `0 0 60px -10px`, a centered glow
  not an offset drop-shadow).
- `--shadow-testimonial-avatar: 0 6px 16px -4px rgba(232,119,34,0.55)` (line 683) — text-card avatar
  shadow, currently missing entirely (the avatar div has no `box-shadow` today).
- `--color-badge-ink-40: rgba(0,0,0,0.40)` (line 650) — the video card's duration-badge pill
  background; distinct from the VIDEO-label pill's own (renamed) background token below.
- `--radius-16: 16px` (line 616, metrics card radius) — **not** a reuse of the existing `--radius-tile`
  (also 16px), which is explicitly annotated "Webinar hero collage tile corners" — the same
  single-job-token concern `/speckit.analyze` raised for `--text-industry-title` vs. `--text-stat` in
  §14, applied proactively here.

That is **7** new tokens, not 6 (`/speckit.analyze` finding M2 — an earlier draft's summary said "6 new
tokens" while separately appending `--radius-16` as a 7th bullet, undercounting its own list).

**Token corrected (value)**: `--gradient-testimonial-video`'s first color stop is corrected from
`rgba(232,119,34,0.92)` to the reference's exact `rgba(232,119,34,0.88)` (line 640). This token already
exists (added in an earlier phase of this feature) with an incorrect first-stop value; its second stop
(`rgba(154,52,18,0.96)`) already matches and is unchanged. Its sole consumer is the video card's own
background — the correction is made in `tokens.css` directly (`/speckit.analyze` finding H1), not as a
side effect of a component edit.

**Token corrected (rename)**: `--color-badge-ink-45` (`rgba(0,0,0,0.45)`) is renamed to
`--color-badge-ink-50: rgba(0,0,0,0.50)`. Its only consumer (confirmed via search — the VIDEO-label
pill background, this same file) was built against `0.45`; the reference's actual value at line 649 is
`0.50`. Since it has exactly one consumer and its current name no longer describes its corrected value,
it is renamed and corrected in place rather than left mismatched or duplicated as a second near-identical
token.

**Pre-existing reference deltas corrected by this addendum**: 3 in total (`/speckit.analyze` finding
M1 — an earlier draft's Constitution Check only enumerated 2) — video-card border `0.38→0.45`,
VIDEO-label pill background `0.45→0.50`, and video-card gradient first stop `0.92→0.88`, all predating
this feature and all caught by direct value comparison against the reference rather than assumed
correct.

**Tokens reused, not duplicated** — all exact matches, confirmed by direct comparison against
`tokens.css`:
- `--color-border-orange-45` (`rgba(232,119,34,0.45)`, video card border, line 640) — corrects the
  current implementation's `border-border-orange` (0.38), a pre-existing mismatch unrelated to this
  feature's other work.
- `--color-border-orange-medium` (`rgba(232,119,34,0.50)`, text card hover border, line 671) — already
  added/mapped in §13 (Re-Imagine grid); reused verbatim here, not redefined.
- `--color-green` (`#34d399`, verified-badge checkmark/label color, line 677).
- `--color-text-bright` (`rgba(255,255,255,0.90)`, duration-badge text color, line 650).
- `--ls-wider` (`0.10em`, verified-badge tracking, line 677).
- `--text-3xs` (`10.5px`, verified-badge and duration-badge font-size, lines 650/677).
- `--color-border-8`/`--color-glass-3`/`--blur-md`/`--space-8`/`--space-11` (metrics card
  border/0.08, background/0.03, blur/8px, vertical padding/20px, horizontal padding/26px — line 616,
  all exact).
- `--color-border-14` (`rgba(255,255,255,0.14)`, metrics-card divider, line 621).
- `--gradient-phase-node` (`linear-gradient(140deg,#F7B733,#E87722)`, text-card avatar background, line
  683) — already correct in the current implementation; unchanged.
- `ClockIcon`/`CheckIcon` (`components/ui/icons.tsx`) — both already exist from earlier phases of this
  feature; reused via prop overrides (size/stroke-width) rather than new icons, matching the same
  multi-size-reuse convention `PhaseArchitectIcon`'s siblings (§12) already established.
- The video card's new star rating (`/speckit.analyze` finding C1) needs no new token or icon at all —
  it reuses the same `"★★★★★"` Unicode-glyph pattern the text card already renders (line 108 of the
  current implementation), just with the reference's plain white color and `text-shadow` instead of the
  text card's amber color, both expressible as plain Tailwind classes with no new token value.

**Not changed**: the video-lightbox modal markup, the "Drag to explore more stories" hint row, and the
track's existing `scroll-snap-type`/gap/padding values are already reference-correct.

## 16. Homepage Blog Teaser Section fidelity (FR-010)

**Companion to**: [plan.md](./plan.md) Phase 2 addendum, "Homepage Blog Teaser Section (FR-010)" |
**Spec**: [spec.md](./spec.md), FR-010, Clarifications Session 2026-08-06

Scope: a new `app/_home-components/BlogSection.tsx`, plus `components/ui/icons.tsx`,
`components/ui/GlassCard.tsx`, `app/tokens.css`, `app/globals.css`, and `app/page.tsx`'s render order.
§§1-15 above are unaffected.

**Decision (content sourcing)**: FR-010's original text said the section's content "MUST be sourced
from the existing blog content used on `/blog`." Investigation of `app/blog/_data/blog-content.ts`
found its 9 real `BlogPost` entries have no icon field (only a `topic` string and an `accent` color
token), no featured/top-3 concept, and every entry's `href` is a placeholder `"#"` — no `/blog/[slug]`
detail route exists. `TechGrit Homepage.dc.html` (lines 785-821) instead shows 3 fully-authored cards
(own title/topic/excerpt/read-time/icon/gradient-tint) that don't correspond to any of the 9 real posts.
Per spec.md Clarifications (Session 2026-08-06), the 3 homepage cards use the reference's own literal
content verbatim — a static, homepage-local data set — not a dynamic pull from `blog-content.ts`. FR-010
itself was corrected to match.

**Decision (icon sourcing)**: since `BlogPost` has no icon field at all, and the reference's 3 icons
(constellation, code-bracket, package/box) are purely decorative and unrelated to any real post's
content, the icons are reused as-is, one per fixed card position — not derived from a
topic-to-icon lookup, since no such mapping is needed once the content itself is static.

**Decision ("Read More" target)**: since every real post's `href` is a placeholder and no post detail
route exists, every card's "Read more" affordance — and the section's own "Visit the blog" ghost button
— link to `/blog`, matching the reference's own `href="TechGrit Blog.dc.html"` on every one of these
elements (lines 783/786/798/810).

**Tokens needed** — 15 total, none of which exist today at these exact values:
- `--gradient-blog-teaser-orange`/`-blue`/`-teal` (§ Gradients) — each card's header-block background
  (lines 787/799/811), a 2-stop `150deg` composite literal, following this codebase's existing
  gradient-token convention (`--gradient-testimonial-video`, `--gradient-phase-node`) of one composite
  token per treatment, not decomposed stop-by-stop. Card 1's first stop (`rgba(232,119,34,0.28)`)
  happens to numerically equal the existing `--color-overlay-orange-strong`; this is not a Principle I
  conflict since gradient tokens in this file are never built from `var()`-nested stops.
- `--color-glow-white-18` (§ Borders & Glass) — the radial highlight shared by all 3 card headers (lines
  788/800/812). The value-identical `--color-border-18` exists but is annotated "Phase-node border — todo
  state," a distinct semantic job — the same single-job-token concern already raised for
  `--text-industry-title`/`--radius-16` earlier in this feature, applied proactively here rather than
  reusing a mismatched-purpose token.
- `--color-border-blue-55` (card 2 hover border, `rgba(2,132,199,0.55)`, line 798) and
  `--color-border-teal-60` (card 3 hover border, `rgba(15,118,110,0.60)`, line 810) — both distinct from
  the existing `--color-border-blue-strong`/`--color-border-teal-strong` (0.60/0.70), different values,
  not duplicates. Card 1's own hover border (`rgba(232,119,34,0.55)`, line 786) is an exact match for the
  existing `--color-hover-orange-border-55` and needs no new token.
- `--color-text-35` (§ Text Colors) — the topic/read-time meta row's dot separator (lines 792/804/816,
  `rgba(255,255,255,0.35)`); no existing text-color token sits at exactly this value. The read-time text
  itself (`rgba(255,255,255,0.55)`) is an exact match for the existing `--color-text-55`.
- `--text-blog-meta: 12px` and `--ls-blog-meta: 0.14em` (§ Typography) — the same meta row's font-size
  and letter-spacing. Deliberately not reused from the value-close `--text-2xs` (12.5px, a genuine
  0.5px miss) or the value-identical `--ls-hint` (annotated "Methodology scroll-hint caption," a
  different single-job token) — same precedent as `--text-industry-title` vs. `--text-stat`.
- `--shadow-blog-teaser-orange`/`-blue`/`-teal` (resting, `0 0 40px -8px`, `0.15` opacity, lines
  786/798/810) and `--shadow-blog-teaser-orange-hover`/`-blue-hover`/`-teal-hover` (hover, `0 0 60px
  -6px`, `0.35` opacity, same lines) — 6 tokens, 2 distinct shapes, 3 colors each; the closest existing
  shadow, `--shadow-reimagine-glow`/`-soft`, is a different shape (`0 0 60px -10px`).

**Tokens reused, not duplicated** — all exact matches: `--color-hover-orange-border-55` (card 1 hover
border), `--color-text-55` (read-time text), `--color-amber-light`/`--color-blue-light`/`--color-teal-light`
(per-card topic label color, already-mapped `text-amber-light`/`-blue-light`/`-teal-light` classes),
`--color-orange` (ghost button arrow, `text-orange`, matching `IndustriesSection`'s own ghost-button
convention), `--color-icon-stroke` (all 3 decorative icons' stroke — already annotated "Decorative SVG
icon stroke (case study panels)," reused rather than duplicating its `rgba(255,255,255,0.85)` value),
`--radius-2xl`/`--color-glass-4`/`--color-border-image`/`--blur-md` (card base chrome — radius,
background, border, backdrop-blur, all exact matches for the reference's `20px`/`0.04`/`0.10`/`8px`),
`--space-4`/`--space-3`/`--space-9`/`--space-5a`/`--space-19a`/`--space-11`/`--space-12`/`--space-15`/
`--space-1b` (title margin-top, description margin-top, ghost-button padding/min-height, card body
padding, header row margin-bottom, "Read more" row gap — all already-mapped `tg-` spacing classes).

**Discovered while researching (missing `@theme inline` mappings)**: `tokens.css` already defines
`--space-6` (16px) and `--space-10` (24px) — both pre-existing, unrelated to this addendum — but
`globals.css` never mapped either to a `--spacing-tg-6`/`--spacing-tg-10` entry, so no canonical
`mt-tg-6`/`pt-tg-10` utility exists today. This section's own markup needs both (the "Read more" row's
16px top margin, the card body's 24px top padding) and would otherwise have to fall back to an
arbitrary-value class for a value that already has a token — precisely the bug class this session's
CLAUDE.md calls out by name ("A token that exists in `tokens.css` but has no matching `@theme inline`
entry is a real bug, not a style nit"). Both mappings are added as part of this addendum's `globals.css`
task, not deferred.

**Icon shapes** (verbatim from the reference, `TechGrit Homepage.dc.html`):
- Card 1 (`BlogConstellationIcon`, line 789): `<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2
  12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>`
- Card 2 (`BlogCodeBracketIcon`, line 801): `<polyline points="16 18 22 12 16 6"/><polyline points="8 6 2
  12 8 18"/>`
- Card 3 (`BlogPackageIcon`, line 813): `<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7
  4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96
  12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>`

**Not changed**: no other homepage section, no `data-model.md`/`contracts/` (presentation-only, same as
every prior addendum), `app/blog/_data/blog-content.ts` and `/blog`'s own rendering (`blog-post-grid.tsx`)
are untouched — this addendum reads their shape only to confirm why a dynamic pull isn't viable, it does
not modify either file.

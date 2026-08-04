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

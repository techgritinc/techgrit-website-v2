# Baseline Computed Values (Pre-Migration)

T003 deliverable. Captured by reading `app/tokens.css` and `app/globals.css` directly (no
browser available in this environment) — these are the literal declared values, which is
equivalent to computed values here because `--text-*` uses `clamp()` (viewport-reactive by
formula, not by breakpoint) and every other banded token in this list is a single static
declaration with **no responsive override** in `app/tokens.css` today.

Recorded pre-migration so Phase 4 (US2, responsive `md`/`sm` bands) has a documented "before"
to diff against.

## Key finding: no token-driven responsive bands exist yet

`app/tokens.css` §7 (Spacing) and §8 (Layout) declare only `:root` values — there is no
`@media` block anywhere in `tokens.css` that overrides a custom property at `md` (960px) or
`sm` (560px). The only responsive overrides in the whole codebase today live in
`app/globals.css` (lines ~1113–1136) and are **hardcoded literals scoped to two selectors**,
not token repoints:

```css
@media (max-width: 960px) {
  h1 { font-size: 44px; }
  .section { padding-block: 60px; }
  .glass-card { padding: 24px 28px; }
}
@media (max-width: 560px) {
  .glass-card { padding: 20px 20px; }
  .btn-lg { font-size: var(--text-sm); padding: 14px 22px; }
}
```

So for every banded token in scope for Phase 4 (type scale, spacing ≥28px, `--container-padding`,
section paddings), the value at 1440 / 1140 / 960 / 560 / 390px is **identical today** — the
single `lg`-baseline declaration — with the sole exception of the two hardcoded selector rules
above, which are not token-driven and are called out separately.

## Type scale (`app/tokens.css` §6)

`clamp(min, preferred vw, max)` resolves algebraically per viewport; values below computed at
each width (not just read literally) since `clamp()` output does vary by viewport even without
a breakpoint band.

| Token | Formula | 1440px | 1140px | 960px | 560px | 390px |
|---|---|---|---|---|---|---|
| `--text-h1` | `clamp(44px, 5.5vw, 70px)` | 70px (cap) | 62.7px | 52.8px | 30.8px→44px floor | 44px (floor) |
| `--text-h2` | `clamp(32px, 3.6vw, 46px)` | 46px (cap) | 41.04px | 34.56px | 32px (floor) | 32px (floor) |
| `--text-h3` | `clamp(22px, 2.4vw, 30px)` | 30px (cap) | 27.36px | 23.04px | 22px (floor) | 22px (floor) |
| `--text-h4` | `clamp(18px, 1.8vw, 22px)` | 22px (cap) | 20.52px | 18px (floor) | 18px (floor) | 18px (floor) |
| `--text-lg` | `clamp(16px, 1.4vw, 18.5px)` | 18.5px (cap) | 16.96px | 16px (floor) | 16px (floor) | 16px (floor) |

Unbanded (single static value at all widths): `--text-base: 17px`, `--text-sm: 15px`,
`--text-xs: 14px`, `--text-2xs: 12.5px`.

**Selector-level hardcoded override** (not from `tokens.css`): at `≤960px`, `globals.css`
forces `h1 { font-size: 44px }` directly — this happens to coincide with `--text-h1`'s own
clamp floor at that width, so today it's a no-op duplicate, not a conflict. Phase 4 should
note whether this hardcoded rule becomes redundant once md/sm bands exist.

## Spacing ≥28px (`app/tokens.css` §7) — static, no bands

| Token | Value | 1440px | 1140px | 960px | 560px | 390px |
|---|---|---|---|---|---|---|
| `--space-12` | 28px | 28px | 28px | 28px | 28px | 28px |
| `--space-13` | 32px | 32px | 32px | 32px | 32px | 32px |
| `--space-14` | 36px | 36px | 36px | 36px | 36px | 36px |
| `--space-15` | 40px | 40px | 40px | 40px | 40px | 40px |
| `--space-16` | 44px | 44px | 44px | 44px | 44px | 44px |
| `--space-17` | 48px | 48px | 48px | 48px | 48px | 48px |
| `--space-18` | 56px | 56px | 56px | 56px | 56px | 56px |
| `--space-19` | 64px | 64px | 64px | 64px | 64px | 64px |
| `--space-20` | 72px | 72px | 72px | 72px | 72px | 72px |
| `--space-21` | 80px | 80px | 80px | 80px | 80px | 80px |
| `--space-22` | 88px | 88px | 88px | 88px | 88px | 88px |
| `--space-23` | 92px | 92px | 92px | 92px | 92px | 92px |
| `--space-section-sm` | 50px | 50px | 50px | 50px | 50px | 50px |
| `--space-section-md` | 60px | 60px | 60px | 60px | 60px | 60px |
| `--space-section-lg` | 108px | 108px | 108px | 108px | 108px | 108px |

**Selector-level hardcoded override**: `.section { padding-block: 60px }` at `≤960px` and
`.glass-card { padding: 24px 28px }` at `≤960px` / `20px 20px` at `≤560px` — both hardcoded in
`globals.css`, not sourced from a `--space-*` token today.

## Container padding (`app/tokens.css` §8) — static, no bands

| Token | Value | 1440px | 1140px | 960px | 560px | 390px |
|---|---|---|---|---|---|---|
| `--container-padding` | 36px | 36px | 36px | 36px | 36px | 36px |

Breakpoints already declared for future use: `--breakpoint-sm: 560px`,
`--breakpoint-md: 960px`, `--breakpoint-lg: 1140px` (duplicated as literals in `globals.css`'s
`@theme inline`, per that file's own hand-sync comment, since `@media` can't consume `var()`).

## Section paddings

Covered by `--space-section-sm/md/lg` above — all static, no responsive band, aside from the
`.section { padding-block: 60px }` hardcoded rule at `≤960px` noted above.

## Summary

Pre-migration, the responsive story is: **the token layer itself is width-invariant** except
for `clamp()`-based type-scale tokens (which vary continuously by formula, not by discrete
band); the only discrete breakpoint-triggered changes in the whole styling system are the small
set of hardcoded selector rules in `globals.css` at `≤960px`/`≤560px` shown above. Phase 4
(US2) is what introduces actual `--space-*`/`--container-padding` `md`/`sm` token bands to
replace/formalize this.

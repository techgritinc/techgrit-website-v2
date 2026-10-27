# Handoff: Deferred Per-Page Verification

This feature's scope was `app/tokens.css` / `app/globals.css` / `app/layout.tsx` exclusively (FR-031, SC-007) — no component or page file was touched. Per-page visual verification against each v2 export was explicitly deferred (Q6, spec.md "Scope Boundary"). This note hands that work its starting watch-list so it doesn't start cold.

## The five absorbed thresholds

Nine v2 `max-width` thresholds consolidated to three declared tiers (`lg` 1140px, `md` 960px, `sm` 560px) plus one dropped duplicate. Five of those consolidations are absorptions — a page's own threshold differs from the tier it now uses — and are recorded in `app/tokens.css` (lines ~494-512, next to the `md`/`sm` override blocks) and in `specs/TMS-85-tokens-v2-migration/spec.md`'s "Responsive Threshold Consolidation" table. Check each at its original (pre-absorption) width when that page gets visual review:

| Absorbed threshold | Now uses | What to check | Risk |
| --- | --- | --- | --- |
| Footer stack 640px | `sm` (560px) | Footer sub-link grid stays two-column an extra 40px (560-640px) before stacking — confirm it still looks intentional in that band | Low — one shared component |
| About / Industries / Services grid-collapse 920px | `md` (960px) | Content collapses to one column 40px earlier than each page's own v2 export | None — earlier collapse is the safe direction |
| Blog grid-collapse 980px | `md` (960px) | 20px band difference | Negligible |
| Frameworks grid-collapse 1024px | `md` (960px) | Content collapses later than designed; 960-1024px may feel tight | Low — Frameworks has no route yet, resolve when that page is built |
| Frameworks minor-gap tweak 720px | `sm` (560px) | Same page, same deferred-until-built caveat | Low |

(Homepage's duplicate 1024px nav rule was dropped as redundant with the shared 1140px `lg` nav-collapse rule used by all 12 exports — not an absorption, no follow-up needed.)

## Font-reflow watch-list

The Calibri/Carlito swap (Principle V, 2.0.0) and the new `md`/`sm` type-scale bands change line-wrapping in ways a single-font, single-tier system wouldn't. When reviewing each page, watch for:

- **Fixed-height cards** that may gain a line at the new font metrics or at a narrower tier, overflowing their container.
- **Two-line clamps** (`-webkit-line-clamp` or similar) that may clip differently now that character widths have shifted.
- **Nav/chip elements sized to label width** — a label that fit on one line in Manrope/Space Grotesk may wrap or truncate in Calibri/Carlito.
- **Headline blocks where a line-count change alters hero height** — anything absolutely positioned or vertically centered against a hero's height assumption should be re-checked.

## Also deferred (tracked in `CLAUDE.md`, not this file)

- Sub-AA contrast tokens (`--color-text-ghost` 3.95:1, `--color-text-45` 4.42:1, `--color-text-40` ~3.7:1, `--color-text-32` ~2.8:1, `--color-text-placeholder` ~2.6:1) — accessibility debt, v1 alphas preserved intentionally this migration.
- Hero-token consolidation (six page-named tokens → two role-named tokens) — raised and declined during clarification.

## Pre-existing audit findings (not introduced by this migration)

`npm run lint` and `npm run build` are clean. Of the four audit scripts, `audit-navy.mjs` is clean (three FR-006a exceptions plus two retained-v1 exceptions, all expected). The other three report findings that were verified via `git stash` to already exist before this migration's changes — unrelated to `tokens.css`/`globals.css` content and out of this feature's scope to fix:

- `audit-tokens.mjs`: 81 `tokens.css` declarations with no matching `@theme inline` entry (74 pre-existing before this migration added new tokens).
- `audit-usage.mjs`: 3 tokens referenced in component files but never declared (`--capability-hover-border`, `--card-hover-border`, `--hover-border`) — same 3 findings pre-migration, in component files outside this feature's scope.
- `audit-v2-trace.mjs`: 2 flagged tokens with zero v2 occurrences and no retention comment (`--ls-01`, `--lh-snug`), plus a list of same-value duplicate tokens (FR-021) — same shape pre-migration, growing only in proportion to the new tokens added.

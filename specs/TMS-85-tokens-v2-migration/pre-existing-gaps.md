# Pre-Existing Audit Gaps (T006)

Baseline run of all four Phase 2 audit scripts against the **unmodified** pre-migration
`app/tokens.css` / `app/globals.css` / `components/**` / `app/**`. This establishes which
gaps this feature (TMS-85-tokens-v2-migration) must close versus which predate it and are
tracked here for visibility only.

Run: `node scripts/audit-tokens.mjs && node scripts/audit-navy.mjs && node scripts/audit-usage.mjs && node scripts/audit-v2-trace.mjs`

## audit-tokens.mjs (T004) — exit 1

312 `tokens.css` declarations, 236 mapped in `@theme inline`. **74 unmapped, non-exception
declarations.** Not all 74 are real Principle I bugs — several are annotated in
`globals.css`'s own comments as *intentionally* unmapped (heading type-scale tokens
`--text-h1..h4`, heading letter-spacing `--ls-tight/-snug/-normal`), but that annotation
lives in `globals.css`, not on the `tokens.css` declaration itself, so the script (which only
recognizes exception comments in `tokens.css` per T004's spec) correctly still surfaces them.
Full list of the 74 is in the script's own stdout (re-run to reproduce); notable buckets:

- Heading type scale (`--text-h1/h2/h3/h4`, plus blog/webinar heading variants) — **expected
  no-map**, per globals.css's explicit "stay CSS-only" comment.
- Heading letter-spacing (`--ls-tight/-tightest/-snug/-normal`) — **expected no-map**, same
  reasoning.
- Gradients (`--gradient-*`, 9 tokens) — consumed directly via `var()` in component CSS/TSX,
  never as Tailwind utilities; not a Principle I violation, just never had a Tailwind analogue.
- Structural tokens consumed only via CSS (`--container-max*`, `--nav-height-mobile`,
  `--breakpoint-*`, `--space-section-*`, `--transition-*`, `--z-*`, `--opacity-*`,
  `--shadow-console-card`, `--shadow-image-lift`, font-weight tokens `--fw-*`) — same pattern.
- `--color-ink-hero-crazy`/`--color-ink-hero-topo`, `--color-orange-dark`/`-deep`,
  three `--color-border-*-medium/-strong` — genuinely unmapped colors with no annotation;
  worth a real look during Phase 3/US1 token work, but out of scope for this run.

**Action for later phases**: when Phase 3 touches a token in this list, either map it in
`@theme inline` or add a `tokens.css`-side exception comment (`unmapped per Principle I
exception` / `direct-only`) so future audit runs stop re-flagging it as an open gap.

## audit-navy.mjs (T005) — exit 1

**16 unsanctioned navy literals** — exactly the set Phase 3/US1 must repoint to v2 black
values (`--color-ink` family, glass/dropdown/menu backgrounds, testimonial gradients).

**3 sanctioned FR-006a exceptions found and correctly not counted as failures**
(`--color-badge-text`, `--color-console-bg`, `--color-modal-backdrop`) — but none currently
carry an inline exception comment, so the script flags them as `[missing exception comment]`.
**Action for later phases**: Phase 3 should add an `FR-006a sanctioned exception` comment to
these three declarations so the distinction is self-documenting in the source file, not just
in this audit's hardcoded sanction list.

## audit-usage.mjs (T051) — exit 1

**3 pre-existing undeclared-token references** — these predate this feature entirely and are
plain bugs unrelated to the v2 migration (silently resolve to nothing at runtime, no build
error):

- `--capability-hover-border` — `app/services/_components/service-detail-section.tsx:105`
- `--card-hover-border` — `app/services/_components/services-overview.tsx:27`
- `--hover-border` — `app/case-studies/_components/featured-case-study.tsx:15`

**Not in scope for TMS-85-tokens-v2-migration** (no matching task references them and they're
unrelated to token *values*, only to a missing *declaration*) — flagged here for visibility;
worth a follow-up ticket to either declare the missing tokens or fix the typo'd references.

## audit-v2-trace.mjs (T052) — exit 1

**1 flagged value**: `--ls-01: 0.01em` has zero occurrences in v2's letter-spacing frequency
table (research.md §5) and carries no retention comment. Likely a typo for `--ls-tight:
-0.04em`-family or a token that should be retired — worth resolving alongside T018 in Phase 3
(same "verify every remaining type token against research.md §5" task).

All other checked families (radius, blur, transition-duration, and the rest of line-height/
letter-spacing) matched the v2 value set cleanly with zero gaps.

**FR-021 same-value duplicate check** (restricted to `--color-*`/`--gradient-*`/`--shadow-*`,
since cross-family px coincidences like `--space-2`/`--blur-md` both being `8px` are unrelated
units, not real duplicates): **15 literal values are each held by 2–5 differently-named color
tokens** — e.g. `rgba(255,255,255,0.08)` is duplicated across `--color-glass-hover`,
`--color-border-header-scrolled`, `--color-glass-8`, `--color-border-8`, and
`--color-border-cover`. Full list in the script's stdout. These are pre-existing (this
audit didn't create them) and are exactly what FR-021 asks to surface — worth a consolidation
pass in a later phase, but not required to unblock Phase 3's value migration.

## Summary

| Script | Exit | New gaps this feature must close | Pre-existing gaps (informational only) |
|---|---|---|---|
| audit-tokens.mjs | 1 | 5 unmapped colors with no annotation | 69 tokens correctly unmapped by design (annotate in Phase 3 as encountered) |
| audit-navy.mjs | 1 | 16 unsanctioned navy literals | 3 sanctioned exceptions need comment annotation |
| audit-usage.mjs | 1 | none | 3 undeclared-token references (out of scope, unrelated bug) |
| audit-v2-trace.mjs | 1 | `--ls-01` (bundle with T018) | 15 same-value color duplicates (FR-021, consolidation candidate) |

Phase 2 checkpoint reached: audit harness works, pre-existing gap list recorded. User story
work (Phase 3) can begin.

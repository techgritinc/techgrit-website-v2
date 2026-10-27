# Specification Quality Checklist: Design System v2 Migration

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-07-29
**Updated**: 2026-07-29 (iteration 3 — clarify session, scope narrowed to stylesheets only)
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs)
- [x] Focused on user value and business needs
- [x] Written for non-technical stakeholders
- [x] All mandatory sections completed

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous
- [x] Success criteria are measurable
- [x] Success criteria are technology-agnostic (no implementation details)
- [x] All acceptance scenarios are defined
- [x] Edge cases are identified
- [x] Scope is clearly bounded
- [x] Dependencies and assumptions identified

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria
- [x] User scenarios cover primary flows
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into specification

## Decision Log

| Q | Question | Resolution | Session |
| --- | --- | --- | --- |
| Q1 | Downstream blast radius of retired tokens | Value-in-place: never remove or rename a token name | specify |
| Q2 | Depth of root `global.md`/`tokens.md` conformance | Dropped entirely — different product, not consulted | specify |
| Q3 | Responsive tier widths | `sm` 560 / `md` 960 / `lg` 1140 (existing contract) | specify |
| Q4 | Which token families get `md`/`sm` bands, and follow v2 or exceed it | All type + spacing ≥ 28px; values **designed** because v2 specifies none | clarify |
| Q5 | Precedence when v2 exports disagree with each other | Canonical = Homepage's value; per-page token only beyond a 4px delta | clarify |
| Q6 | Does this feature include per-page verification | **No — stylesheets exclusively**; page work deferred | clarify |

## Evidence Behind the Decisions

Each clarification was resolved from measurement of the 12 v2 exports rather than assertion:

- **Q3** — parsing every media block showed the nine thresholds are four jobs; 920/960/980/1024 are one rule (content collapse) authored at drifting widths. Consolidation is cleanup, not fidelity loss.
- **Q4** — a property census found `font-size` overridden 7 times and `padding` 0 times across all nine thresholds in all 12 files. v2 changes *layout* on small screens, not type or padding, so the bands had to be designed.
- **Q5** — the hero H1 spans six desktop caps (52–64px). Unlike the breakpoints this is **not** drift: the longest headline (63 chars) takes the smallest size, so the spread is deliberate per-page tuning.

## Notes

### Scope narrowing (Q6) and its effect

The feature was narrowed mid-session to `app/tokens.css` and `app/globals.css` exclusively. Requirements and criteria written for a wider scope were rescoped rather than left contradictory:

| Was | Now |
| --- | --- |
| FR-020 — absorbed thresholds individually verified per page | Documented with absorbing tier and expected effect; visual check deferred |
| FR-030/031 — pages render without regression; visual diffs attributable | App builds and lints clean; no component file requires editing |
| SC-003 — every page renders on `#000000` | Zero v1 navy literals remain in the stylesheets |
| SC-004 — every page renders in the v2 typeface | Font stack resolves to the webfont, confirmed once at layout level |
| SC-007 — nine pages build and render clean at three tiers | Clean build with **zero** component/page files modified |
| SC-008 — unexplained visual differences: zero | Bands resolve to their specified values at 1140/960/560 |

A "Scope Boundary: Stylesheets Only" section now states plainly what this feature can and cannot guarantee: token-layer correctness and completeness, yes; that every page looks right, no — because it does not look at the pages.

### Risks carried into planning

1. **Font reflow is the main deferred risk.** Manrope → Calibri metrics change glyph widths and x-height, so geometry can shift with no token involved. The spec names the exposed component classes (fixed-height cards, two-line clamps, label-sized nav/chips, headline blocks) so the per-page tickets inherit a watch-list rather than starting cold.
2. **Designed band values await designer sign-off.** FR-016 requires them marked as designed extensions, so a revision is a contained edit. The two most likely to attract comment: H1 at 38px on mobile, and body copy deliberately *not* shrinking.
3. **Frameworks absorbs 1024 → 960**, the only absorption in the risky direction (collapses later than designed). No route exists yet, so it resolves when that page is built.
4. **Navy-named tokens will hold black values.** FR-023 requires a comment at each; renaming is explicitly out of scope.

### Gate status

**All items pass.** 3 questions asked and answered this session; the session closed early on the user's scope-narrowing instruction rather than exhausting the 5-question budget. Ready for `/speckit.plan`.

### Note for later `/speckit.*` commands

The working branch is `hotfix/TMS-update-global-css`, which does not match the `NNN-name` pattern the prerequisite scripts expect. Prefix invocations with `SPECIFY_FEATURE=TMS-85-tokens-v2-migration`, or rename the branch.

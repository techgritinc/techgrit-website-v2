# Implementation Plan: Design System v2 Migration (Tokens, Globals, Responsive Tiers, Prettier)

**Branch**: `TMS-85-tokens-v2-migration` | **Date**: 2026-07-30 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/TMS-85-tokens-v2-migration/spec.md`

## Summary

Repoint the entire design-token layer from the v1 design exports to v2, in place, without touching a single component or page file. Three things change together because they live in the same two files: token *values* (pure-black surfaces, the Calibri/Carlito stack, the revised hero scale, new accents/radii/blurs/hover states), the `@theme inline` mapping that exposes those tokens to Tailwind, and two new `md`/`sm` override bands that make laptop-and-up the unqualified baseline.

The technical approach is deliberately narrow: **value-in-place migration**. No token name is removed or renamed (FR-022), so every existing `var()` reference and every utility class keeps resolving and the app cannot break at the reference level. The substantive diff is three files — `app/tokens.css`, `app/globals.css`, and `app/layout.tsx` (font loading only) — plus a new `.prettierrc`. The binding invariant is that **no component or page file is modified**, not a specific file count: the feature also legitimately adds a formatter ignore list, four audit scripts under `scripts/`, and notes under `specs/`.

All 35 functional requirements are value-and-mapping work in CSS. There is no data layer, no API, no runtime logic, and therefore no contracts to generate.

## Technical Context

**Language/Version**: TypeScript 5 (strict, per `tsconfig.json`); CSS via Tailwind CSS v4 CSS-first `@theme`
**Primary Dependencies**: Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (`@tailwindcss/postcss`), `next/font/google`
**Storage**: N/A — design tokens are static CSS custom properties, not persisted data
**Testing**: No test framework configured (constitution Development Workflow records this as a known gap). Verification is `npm run lint`, `npm run build`, computed-token inspection at the three tier widths, and a mapping-versus-catalogue audit in both directions.
**Target Platform**: Web — modern evergreen browsers; dark surface by default
**Project Type**: Single Next.js App Router application rooted at `app/`
**Performance Goals**: No regression in build time. One webfont family replaces two (Carlito replaces Manrope + Space Grotesk), which reduces font payload — a side benefit, not a target.
**Constraints**: Zero component/page file edits — no file under `components/` or `app/**/_components/`, no `page.tsx` (SC-007). No token name removed or renamed (FR-022). Existing pages must keep rendering — appearance changes only where a v2 value deliberately differs. Pre-commit gate (`npm run lint` then `npm run build`) must stay green.
**Scale/Scope**: ~411 lines of `tokens.css` across 14 numbered sections; ~1162 lines of `globals.css`; roughly 70 component files that consume the tokens and must remain untouched; 12 v2 reference exports as the value authority.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Evaluated against `.specify/memory/constitution.md` v1.6.0.

| Principle | Verdict | Notes |
| --- | --- | --- |
| **I. Token-Only Styling** | ✅ **Pass — strengthened** | The feature's whole purpose is to make the single token source correct. FR-026/FR-027 require the `@theme inline` mapping and the catalogue to agree *in both directions*, which is the direct fix for the TMS-62 failure class this principle was amended to prevent. New values (radii, blurs, hover states) are added to `tokens.css` in their existing numbered sections first, exactly as the principle requires. |
| **II. Documented Breakpoint Contract** | ✅ **Pass** | The feature adopts 1140 / 960 / 560 unchanged — the exact contract this principle mandates — and consolidates v2's nine authored thresholds onto it rather than inventing new ones. FR-011 forbids further ad-hoc thresholds. |
| **III. Centralized Component Library** | ✅ **Pass — not engaged** | No component is created, modified, or duplicated. Both convention homes (vanilla `globals.css` classes and `components/ui/`) keep working untouched because token names are stable. |
| **IV. References Are Visual Truth** | ✅ **Pass** | v2 exports are consumed as a *value* authority only. Their `<x-dc>`/`DCLogic`/`{{ }}`/`sc-for` scaffolding is never copied; nothing is transcribed into a component. |
| **V. Dark-First Brand System** | ❌ **VIOLATION — amendment required** | See below. |
| **VI. UI Craft via frontend-design Skill** | ✅ **Pass** | Tech signal matches (Next.js/React) and the content signal matches ("styling", "layout", "hero", "section", "card" all appear in spec.md). Skill invoked; recorded in [UI Design Approach](#ui-design-approach). |

### Principle V violation — detail

Principle V states, verbatim: *"The default surface is the ink-navy family (`--color-ink` `#0A1822` and its `-deep`/`-mid`/`-card` variants) … Typography is Manrope (body) + Space Grotesk (display), loaded via `next/font` in `app/layout.tsx`."*

This feature reverses **both** of those clauses:

| Principle V clause | This feature |
| --- | --- |
| Default surface is ink-navy `#0A1822` | Default surface becomes `#000000`; the four navy opaque surfaces are repointed to black |
| Manrope (body) + Space Grotesk (display) | One family for both roles: `"Calibri","Carlito","Segoe UI",system-ui,-apple-system,sans-serif` |

Unchanged, and therefore not part of the violation: the white-on-dark `--color-text-*` opacity ladder, the orange→amber `--gradient-brand` as the single accent and never a full-surface fill, ALL-CAPS wide-tracked labels, OrbitAI™ naming, and the light-surface set staying a named exception.

**This is not a case where the constitution should be silently overridden.** The governing facts:

1. The constitution's own amendment procedure exists for exactly this — the design authority changed upstream, so the document must be re-derived rather than hand-waved past.
2. Principle V's stated rationale is *"`tokens.css`'s own section comments state the one-job-per-color rule and mark the light-surface tokens as v1 light palette"* — it derived those specific values from v1 sources that v2 supersedes. The principle's *intent* (dark-first, single accent, disciplined palette) is fully preserved; only two literal values it names are now stale.
3. Proceeding without amending would leave the constitution asserting `#0A1822` and Manrope while the shipped token layer says `#000000` and Carlito — precisely the "prose out of sync with sources" failure the Governance section forbids.

**Resolution**: this feature carries a required follow-on `/speckit.constitution` amendment to Principle V — a **MAJOR** bump (1.6.0 → 2.0.0), since a principle is materially reversed rather than expanded. Recorded in [Complexity Tracking](#complexity-tracking) and as task T043. The amendment must land in the same PR as the token change; shipping the tokens without it is the actual violation.

### Secondary constitution notes (not violations)

- **Development Workflow** says *"no separate Prettier config exists — formatting relies on ESLint plus editor defaults"*, and **Governance → Known gaps** lists *"no Prettier config"* as an unfinished state recorded *"so future amendments can address them deliberately."* Adding `.prettierrc` closes a gap the constitution explicitly invites closing. The same amendment should update both mentions. Task T044.
- **Principle II** describes md as *"grids collapse to one column, H1 shrinks to 44px."* The designed `md` band sets `--text-h1` to exactly 44px, so the band implements the principle's own stated number rather than diverging from it. Pleasing confirmation, no action.

## UI Design Approach

*Required for UI features per Constitution Principle VI.*

**UI mode detection**: **UI mode ON.** Both signals match. Tech signal — Technical Context lists Next.js 16.2.10 + React 19.2.4 as Primary Dependencies. Content signal — `spec.md` contains "styling", "layout", "hero", "section", "card", "navigation", "form", and "button".

**`frontend-design` skill invocation**: Invoked during this feature's clarification phase with the brief *"Design md (tablet, ≤960px) and sm (mobile, ≤560px) override bands for a dark-surface marketing site's type and spacing token scale,"* supplying the existing `lg` baseline (fluid clamp ramps h1 44–62px through h4 18–22px, fixed body 17 / sm 15 / xs 14 / 2xs 12.5px, px-named spacing 4–92px, section paddings 50/60/108px, container padding 36px).

What it returned, and what was kept:

- **One governing rule for the bands**: *tracking and leading move opposite to size.* Display type at 62px earns −0.04em tracking and 1.03 leading because it has the optical mass to carry them; the identical settings at 38px close counters and let descenders strike the following line's capitals. Hence `--lh-tight` 1.03 → 1.06 (`md`) → 1.10 (`sm`), and `--ls-tight` −0.04em → −0.035em → −0.03em.
- **Body copy does not shrink.** Reading size is a function of viewing distance and conditions, not canvas width — and mobile conditions are *worse* (motion, glare, one-handed use), not better. `--text-base`/`--text-sm`/`--text-xs` hold at 17/15/14px across all three tiers. This is the band set's most deliberate and least obvious decision (FR-018, SC-012).
- **Two counter-intuitive moves, both kept**: `--text-2xs` labels go *up* 12.5 → 13px at `sm` (uppercase eyebrows at 62% opacity on near-black are the first thing to fail in daylight), and `--ls-widest` comes *down* 0.16 → 0.12em (wide tracking at small sizes on dark surfaces fragments word shapes into loose letters).
- **Section padding scales proportionally with a floor, not linearly**: 108px is 8% of a 1280px canvas but 27% of a 390px phone. Hence 108 → 76 (`md`) → 56 (`sm`), not a flat multiplier.
- **Structural vs. detail spacing split at 28px**: spacing ≥ 28px is structural rhythm and compresses (≈0.8× at `md`, ≈0.6× at `sm`); spacing < 28px is inner detail and is canvas-independent, so it holds (FR-015).
- **Accessibility floor**: tap targets never scale below 44px at any tier (FR-019).

Sanity-checked at both extremes: a 390px viewport yields 350px of content and ≈18 characters per H1 line; 320px yields 280px and ≈14 characters — tight but readable.

**Reconciliation with Principles I–V**:

- The skill's generic advice to *"choose fonts that are beautiful, unique and interesting… avoid generic fonts"* points away from Calibri/Carlito, which is about as utilitarian a choice as exists. **Principle IV wins** — the v2 exports are the visual authority and they specify that stack in every one of the 12 files. Not negotiable, and not the skill's call.
- The skill's push toward bold aesthetic reinvention (asymmetry, grid-breaking, maximalist atmosphere) is **out of scope by construction**: this feature edits no component and no layout. Its creative latitude was confined to the one genuinely undesigned surface — the `md`/`sm` band values, which v2 leaves unspecified — and that is exactly where it was applied.
- Where the skill would have raised low-opacity text for contrast, **the Q7 clarification wins**: alphas are preserved because changing one alters pages this feature has agreed not to touch. Logged as accessibility debt instead.
- Principle V's dark-first intent is preserved and in fact intensified (navy → true black). Only its two literal values change, per the amendment above.

**Anchor components / files affected**: `app/tokens.css`, `app/globals.css`, `app/layout.tsx` (font loading only), `.prettierrc` (new). **No component or page file is touched** — this is the feature's defining constraint, not an omission. Consumers that inherit the change without being edited: `components/layout/Header.tsx` + `Footer.tsx`, `components/ui/*`, and every `app/**/_components/` route-local section.

## Project Structure

### Documentation (this feature)

```text
specs/TMS-85-tokens-v2-migration/
├── plan.md              # This file
├── research.md          # Phase 0 — v2 value extraction, measured, with occurrence counts
├── data-model.md        # Phase 1 — token taxonomy, band structure, precedence rules
├── quickstart.md        # Phase 1 — how to verify the migration without a test framework
├── checklists/
│   └── requirements.md  # Spec quality gate (already passing)
└── tasks.md             # Phase 2 — dependency-ordered tasks
```

No `contracts/` directory is generated. Contracts model request/response surfaces between a client and a service; this feature has no API, no endpoint, no serialization boundary, and no runtime behaviour of any kind. Its analogue of a contract — the guarantee that the token catalogue and the Tailwind theme mapping agree in both directions — is captured in `data-model.md` and enforced by FR-026/FR-027 and the audit in `quickstart.md`.

### Source Code (repository root)

```text
app/
├── tokens.css          # PRIMARY TARGET — 14 numbered sections, value-in-place migration + md/sm bands
├── globals.css         # PRIMARY TARGET — @theme inline mapping, base tag rules, breakpoint literals
├── layout.tsx          # Font loading only: Manrope + Space_Grotesk → Carlito
├── page.tsx            # UNTOUCHED
├── _home-components/   # UNTOUCHED — inherits new token values
├── about/              # UNTOUCHED
├── blog/               # UNTOUCHED
├── case-studies/       # UNTOUCHED
├── construction/       # UNTOUCHED
├── webinar/            # UNTOUCHED
└── (marketing)/contact/# UNTOUCHED

components/
├── layout/             # UNTOUCHED — Header, Footer, nav-config, footer-config
└── ui/                 # UNTOUCHED — Button, Badge, FormField, MediaSlot, AnimatedStat, icons

.prettierrc             # NEW — 2-space indent, trailing commas where valid, print width 100

raw-files-v2/TechGrit Website V2.2/*.dc.html   # READ-ONLY value authority (12 exports)
raw-files/TechGrit Website V2/*.dc.html        # READ-ONLY historical reference, no authority
```

**Structure Decision**: Single Next.js App Router application rooted at `app/`, per the constitution's Additional Constraints. No structural change whatsoever — this feature adds one root-level config file and edits three existing files in place. The styling load order `tokens.css` → `tailwindcss` → base/reset/component rules is preserved exactly as `globals.css`'s header comment mandates; the `md`/`sm` band `:root` blocks are appended within `tokens.css` after the baseline `:root`, so cascade order remains tokens-first.

## Complexity Tracking

> Filled because the Constitution Check has one violation requiring justification.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| **Principle V reversal** — default surface becomes `#000000` (was ink-navy `#0A1822`); typography becomes one Calibri/Carlito family (was Manrope body + Space Grotesk display) | The v2 design exports are the new visual authority and all 12 specify `background:#000000` and the Calibri/Carlito stack for both `body` and `h1,h2,h3,.disp`. Principle IV makes the reference files authoritative on visual truth, so honouring v2 necessarily contradicts Principle V's v1-derived literals. Keeping the token layer on v1 values would mean every future page inherits the wrong background and typeface, which is the exact drift this migration exists to end. | **Keep v1 values and ignore v2** — rejected: makes the design reference and the code permanently disagree, and every subsequent page ticket re-litigates it. **Ship tokens now, amend the constitution later** — rejected: leaves the constitution asserting values the code contradicts, which Governance explicitly forbids ("prose out of sync with those sources"). **Treat v2 as a second theme alongside v1** — rejected: there is no v2 counterpart to the v1 hero-variation and light-homepage explorations, so there is no coherent second theme to build; it would double the surface tokens for no consumer. **Mitigation adopted**: a `/speckit.constitution` MAJOR amendment (1.6.0 → 2.0.0) rewriting Principle V's two stale clauses, landing in the same PR (T031). Principle V's *intent* — dark-first, single orange→amber accent never used as a full-surface fill, white-on-dark opacity ladder, disciplined one-job-per-token palette — is preserved in full; only the two literal values it names change. |
| **Two navy `rgba()` values survive in an otherwise black surface set** (`--color-console-bg`, `--color-modal-backdrop`) | The v2 Homepage export still uses both. Per Q8, v2 is the authority even when its own output looks inconsistent. | **Normalize both to black** — rejected: would contradict the measured reference and change two surfaces this feature has committed not to alter. Mitigated by FR-006a's required comment at each token, so a later audit cannot mistake them for missed work. |

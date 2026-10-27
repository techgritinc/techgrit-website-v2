# Feature Specification: Design System v2 Migration (Tokens, Globals, Responsive Tiers, Prettier)

**Feature Branch**: `TMS-85-tokens-v2-migration`
**Created**: 2026-07-29
**Status**: Draft — clarifications resolved
**Input**: User description: "We have developed features using raw-files folder as reference. Now we need to migrate to raw-files-v2/* from all .dc.html files reference, where spaces, sizes, colors, fonts, and additional style tokens (shadows, padding, glow, hover states) are updated. (a) Update global.css with font-family from v2 reference and breakpoints for responsiveness — sm: mobile, md: tablet, lg: laptop and above (default values apply here); treat current font sizes and spacing as defaults for lg; add device-specific overrides for sm and md. (b) Update tokens.css with v2 values for font sizes, colors, spacing, shadows, padding, glow effects, hover states — use raw-files-v2/*.dc.html as the single source of truth. (c) Consistency check — compare global.md and tokens.md in the root folder with our global and token.css; ensure the same approach, naming conventions, and token usage are followed. (d) Prettier config — add a .prettierrc with 2-space indentation, trailing commas where valid, print width 100."

**Clarifications applied** (see [Resolved Decisions](#resolved-decisions)):

- **Q1 → value-in-place migration.** Token *names* are preserved; only their *values* change to v2. No shipped feature breaks, because no component import or class name changes.
- **Q2 → dropped.** The `global.md` / `tokens.md` conformance review is out of scope. Those documents belong to a different product and are not consulted.
- **Q3 → `sm: 560px` / `md: 960px` / `lg: 1140px`.** The existing documented contract, retained. Derivation in [Responsive Threshold Consolidation](#responsive-threshold-consolidation).
- **Q4 → designed `md`/`sm` bands.** All type tokens and spacing tokens ≥ 28px step down; spacing < 28px is fixed across tiers. v2 specifies no responsive type or padding scale, so these values are designed and marked as such — see [Designed Responsive Bands](#designed-responsive-bands-md--sm).
- **Q5 → canonical-plus-outliers precedence.** Where v2 exports disagree, the canonical token takes Homepage's value and a per-page token is added only beyond a 4px delta. See [Intra-v2 Precedence](#intra-v2-precedence).
- **Q6 → stylesheets exclusively.** The deliverable is `app/tokens.css` + `app/globals.css` (plus font loading and `.prettierrc`). No component or page file is edited, and per-page verification is deferred. See [Scope Boundary](#scope-boundary-stylesheets-only).
- **Q7 → contrast unchanged.** The white-text opacity ladder keeps its v1 alphas. Tokens below WCAG AA on black (alpha 0.30–0.45) are logged as accessibility debt rather than fixed here, because changing an alpha changes every surface consuming it.
- **Q8 → two navy values retained.** `--color-console-bg` and `--color-modal-backdrop` stay navy because the v2 exports still use them. See FR-006a.
- **Q9 → formatter configured, not run.** `.prettierrc` is added; existing files are not reformatted, so no component or page file enters the diff.

## Context

Every page shipped so far (Homepage, About, Blog, Case Studies, Case Study, Construction, Contact, Services, Webinar) was built against the **v1** design exports in `raw-files/TechGrit Website V2/*.dc.html`. A revised design set now exists at `raw-files-v2/TechGrit Website V2.2/*.dc.html` — 12 exports, including two pages with no v1 counterpart (Frameworks, Industries) and dropping v1's Hero-variation and light-homepage explorations.

The v2 exports are not a cosmetic touch-up. Confirmed differences against v1:

| Aspect | v1 reference | v2 reference |
| --- | --- | --- |
| Body + display font | Manrope (body) + Space Grotesk (display) | One family for both: `"Calibri", "Carlito", "Segoe UI", system-ui, -apple-system, sans-serif` (Carlito loaded as the webfont) |
| Page background | `#0A1822` and its dark-navy family | `#000000` pure black |
| Dark opaque surfaces | `#0A1822`, `#05080d`, `#0D1F2D`, `#0e1e2b` | **none of these appear anywhere in v2** |
| Dark translucent surfaces | navy-based `rgba(10,24,34,·)`, `rgba(13,26,37,·)`, `rgba(7,15,22,·)`, `rgba(8,17,26,·)` | black-based `rgba(0,0,0,·)` almost throughout. Exactly two navy values survive, once each: `rgba(13,24,33,0.72)` and `rgba(5,10,15,0.88)` — retained per FR-006a |
| Hero H1 | `70px` / line-height `0.99` / letter-spacing `-0.04em` | `62px` / line-height `1.02` / letter-spacing `-0.03em` |
| Accent palette | orange / amber / blue / teal / green set | same core set, plus new values (`#C084FC`, `#8B5CF6`, `#3B82F6`, `#10B981`, `#FCA5A5`) |
| Responsive thresholds | `1140 / 1024 / 960 / 560` | `1140 / 1080 / 1024 / 980 / 960 / 920 / 720 / 640 / 560` |
| Ambient blur radii | up to `115px` | new large radii `120 / 130 / 140 / 150px` |
| Corner radii | existing set | new values `3 / 4 / 6 / 13 / 26 / 28 / 40 / 70 / 80px` |

The repository has no code formatter configuration, so formatting of the token and global stylesheets — and everything else — is currently unenforced.

## Clarifications

### Session 2026-07-29

- Q: Which token families get `sm`/`md` override bands, and should the bands follow v2 literally or extend beyond it? → A: Option B2 — all type tokens plus section/layout-scale spacing (≥ 28px) step down; spacing below 28px stays fixed at all tiers. Because v2 specifies almost no mobile type or spacing values (a property census across all 12 exports found `font-size` overridden 7 times and `padding` 0 times), the `md`/`sm` values are **designed**, not reference-derived, and are specified in [Designed Responsive Bands](#designed-responsive-bands-md--sm).
- Q: When two v2 exports disagree on a value the token layer models as one token, which wins? → A: Option B — a canonical token takes the flagship page's value (Homepage), and a per-page token is added only where another export differs by more than 4px. See [Intra-v2 Precedence](#intra-v2-precedence).
- Q: How is visual non-regression verified across 9 pages × 3 tiers with no test framework? → A: Not in this feature. Scope is `app/tokens.css` and `app/globals.css` exclusively — the v2 value migration plus the `md`/`sm` bands. Per-page verification is deferred to later per-page work. See [Scope Boundary](#scope-boundary-stylesheets-only).
- Q: Several white-text opacity tokens fall below WCAG AA on pure black (alpha 0.30–0.45 yields 2.6–4.4:1 against the 4.5:1 threshold). Raise them during the migration? → A: Option A — no. The v1 alphas are preserved exactly. The migration must not visibly alter existing pages, and changing an alpha changes every surface that consumes it. v2 is the authority: where v2 specifies a value the token takes it, and where v2 says nothing (as here) the v1 value stands. The sub-AA tokens (alpha 0.30–0.45) are recorded as known accessibility debt for a separate ticket.
- Q: SC-007 requires zero component files modified, but SC-009 requires a repo-wide formatter check to report zero violations — which is unachievable without reformatting ~70 files. Which holds? → A: Option A — config only. `.prettierrc` is added but the formatter is not run over existing files, matching what task (d) asked for and keeping every component and page file out of the diff. SC-009 is rewritten to check config validity plus conformance of the two migrated stylesheets; Assumption 10 is corrected to forward-looking rather than retroactive.
- Q: Two v1 navy translucent values still appear in the v2 exports (`rgba(13,24,33,0.72)` console card, `rgba(5,10,15,0.88)` video-lightbox backdrop, both Homepage). Repoint them to black for a coherent single-hue system, or keep them? → A: Option A — keep both exactly as v2 uses them. v2 is the authority and it still specifies these two, so they are v2-sanctioned exceptions rather than missed migrations. FR-006 and SC-003 are corrected to say so, and each token carries a comment recording why it remains navy in an otherwise black surface set.

## Responsive Threshold Consolidation

The v2 exports use nine distinct `max-width` thresholds, but analysis of every media block across all 12 files shows these are **four jobs**, not nine design decisions. The spread within a job is authoring drift — the same rule written at a slightly different width on each page — not intent.

| Job | Thresholds v2 uses | Scope | Consolidates to |
| --- | --- | --- | --- |
| Hide desktop nav + CTA, show burger | **1140** (all 12 files); 1024 (a duplicate of the same rule in Homepage) | Shared header | **`lg` = 1140px** |
| Footer columns reduce | **1080** (all 12) | Shared footer | absorbed by `md` |
| Content grids → one column, H1 shrinks | **960** (7 pages), **920** (About, Industries, Services), **980** (Blog), **1024** (Frameworks), 720 (Frameworks, minor gap tweaks) | Per page | **`md` = 960px** |
| Everything stacks single-column | **640** (footer, all 12), **560** (content, 10 pages) | Shared + per page | **`sm` = 560px** |

Absorptions and their risk:

| Absorbed | Into | Effect | Risk |
| --- | --- | --- | --- |
| Footer stack 640 → 560 | `sm` | Footer sub-link grid stays two-column down to 560 instead of 640 | Low — one shared component, verify visually |
| About / Industries / Services 920 → 960 | `md` | Content collapses 40px **earlier** than designed | None — earlier collapse is the safe direction |
| Blog 980 → 960 | `md` | 20px band difference | Negligible |
| Frameworks 1024 → 960, 720 → 560 | `md` / `sm` | Content collapses **later** than designed; 960–1024 may feel tight | Low — Frameworks has no route yet; resolve when that page is built |
| Homepage's duplicate 1024 nav rule | — | Dropped as redundant with 1140 | None — identical rule |

## Intra-v2 Precedence

The v2 exports disagree with each other on values the token layer models as a single token. The hero heading is the clearest instance — six distinct desktop caps and three distinct band values across 12 pages:

| Page | v2 hero H1 | Headline chars |
| --- | --- | --- |
| Frameworks | `clamp(38px, 5.4vw, 64px)` | 51 |
| Homepage | 62px fixed | 47 |
| About | 60px fixed | 43 |
| Industries | 58px fixed | 53 |
| Services | 58px fixed | 42 |
| Blog / Careers / Case Studies | `clamp(40px, ~5.3vw, 58px)` | 25–36 |
| Webinar | `clamp(40px, 5vw, 56px)` | 29 |
| Construction | 54px fixed | 63 |
| Contact | `clamp(38px, 4.8vw, 54px)` | 33 |
| Case Study | `clamp(34px, 4.4vw, 52px)` | 41 |

Unlike the breakpoint spread, this is **not** authoring drift: the longest headline (63 characters, Construction) takes the smallest size and the spread tracks copy length, so it reflects deliberate per-page tuning. Two authoring styles coexist within v2 — six pages use a fixed pixel size, six use a fluid ramp.

**Precedence rule**: a canonical token holds the flagship page's value; a per-page token is added only where another export's value differs from the canonical by more than 4px. Deltas of 4px or less are absorbed into the canonical value, on the grounds that no viewer compares two heroes side by side and cross-page hero consistency is worth more than a 6% size difference.

Applied to the hero, with canonical cap = **62px** (Homepage — the flagship, and the page whose 70px → 62px change v2 explicitly specifies), absorbing the 58–66px window:

| v2 value | Delta from canonical | Outcome |
| --- | --- | --- |
| Homepage 62px | — | **canonical `--text-h1`** |
| Frameworks 64px | +2px | absorbed |
| About 60px | −2px | absorbed |
| Industries 58px | −4px | absorbed |
| Services 58px | −4px | absorbed |
| Careers 58px | −4px | absorbed |
| Case Studies 58px | −4px | absorbed |
| Blog 58px | −4px | absorbed — existing `--text-blog-hero` becomes redundant but is retained per FR-022 (names are never removed) |
| Webinar 56px | −6px | per-page token — existing `--text-webinar-hero` already covers it |
| Construction 54px | −8px | **new per-page token** |
| Contact 54px | −8px | **new per-page token** |
| Case Study 52px | −10px | **new per-page token** |

Net effect: one canonical token, three new per-page tokens, two existing per-page tokens retained. Frameworks' floor (38px) coincides with the designed `sm` band value, so no separate mobile handling is needed for it.

## Designed Responsive Bands (md / sm)

A property census across all nine thresholds in all 12 v2 exports shows what v2 actually overrides responsively:

| Property | Times overridden across all 12 exports |
| --- | --- |
| `grid-template-columns` | 163 |
| `gap` | 60 |
| `display` (nav burger, hide decorative art) | 29 |
| `flex-direction` / `align-items` | 24 each |
| `min-height`, `order`, `grid-auto-rows`, `max-width`, `transform` | handfuls |
| **`font-size`** | **7** — six are the hero H1, one a decorative numeral |
| **`padding`** | **0** (only `padding-top`, 12×, in the footer band) |
| **`margin`** | 1 |

v2 therefore does **not** specify a mobile or tablet type scale, nor any responsive padding: what it changes on small screens is *layout* (columns collapse, gaps tighten, elements stack). The `md` and `sm` token bands are consequently **designed values, not reference values**, governed by one principle: **tracking and leading move opposite to size.** Display type at 62px earns tight tracking and 1.03 leading because it has the optical mass to carry them; at 38px the same settings close counters and let descenders collide with the following line's capitals. Body type inverts the rule — a shorter measure wants tighter leading.

### `md` band — tablet, ≤ 960px

| Token | `lg` baseline | `md` | Rationale |
| --- | --- | --- | --- |
| `--text-h1` | 44–62px fluid | **44px** | v2's own value; without the band the clamp yields 52.8px at 960 |
| `--text-h2` | 32–46px fluid | 34px | Holds the h1:h2 ratio near 1.3 |
| `--text-h3` / `--text-h4` | 22–30 / 18–22px | 24 / 19px | Clean steps, hierarchy preserved |
| `--text-lg` (lead) | 16–18.5px | 17px | — |
| `--text-base` / `--text-sm` / `--text-xs` | 17 / 15 / 14px | **unchanged** | Reading size is not a function of screen size |
| `--lh-tight` | 1.03 | 1.06 | 44px needs more leading than 62px |
| `--ls-tight` | −0.04em | −0.035em | Tracking opens as size drops |
| Section padding (lg/md/sm) | 108 / 60 / 50px | 76 / 48 / 42px | ≈0.78× |
| `--container-padding` | 36px | 28px | — |
| Spacing tokens ≥ 28px | — | ≈0.8×, floored | Structural rhythm compresses — exact values in [the enumeration below](#banded-spacing-values--enumerated) |
| Spacing tokens < 28px | — | **unchanged** | Inner detail spacing is canvas-independent |

### `sm` band — mobile, ≤ 560px

| Token | `lg` baseline | `sm` | Rationale |
| --- | --- | --- | --- |
| `--text-h1` | 44–62px fluid | **38px** | At a 390px viewport with 20px gutters this yields ≈18 characters per line — two to three words, commanding without a six-line stack. Has v2 precedent: Frameworks uses 38px at its 640 band |
| `--lh-tight` | 1.03 | **1.10** | At 38px, 1.03 lets descenders strike the next line's capitals |
| `--ls-tight` | −0.04em | −0.03em | — |
| `--text-h2` | 32–46px fluid | 28px | — |
| `--lh-snug` / `--ls-snug` | 1.13 / −0.03em | 1.18 / −0.02em | Same inverse relationship |
| `--text-h3` / `--text-h4` | 22–30 / 18–22px | 21 / 18px | h4 is already at its floor |
| `--text-lg` | 16–18.5px | 16.5px | — |
| `--text-base` / `--text-sm` / `--text-xs` | 17 / 15 / 14px | **unchanged** | Deliberate. Mobile reading conditions are worse, not better — motion, glare, one-handed use |
| `--lh-body` | 1.65 | **1.55** | ≈40 characters per line at this measure; 1.65 disconnects successive lines |
| `--text-2xs` (labels) | 12.5px | **13px — increased** | Uppercase eyebrow labels at 62% opacity on near-black are the first element to fail in daylight |
| `--ls-widest` | 0.16em | **0.12em — reduced** | Wide tracking at small sizes on dark surfaces fragments word shapes into loose letters |
| `--ls-wider` | 0.10em | 0.08em | Same reason |
| `--text-stat` | 26px | 22px | — |
| Section padding (lg/md/sm) | 108 / 60 / 50px | 56 / 40 / 32px | 108px is 8% of a 1280px canvas but 27% of a 390px phone; linear scaling would be wrong, so this is proportional with a floor |
| `--container-padding` | 36px | **20px** | Yields 350px of content at a 390px viewport |
| Spacing tokens ≥ 28px | — | ≈0.6×, floored | Exact values in [the enumeration below](#banded-spacing-values--enumerated) |
| Spacing tokens < 28px | — | **unchanged** | — |
| Button and tap-target heights | — | **never scaled, ≥ 44px** | Accessibility floor |

#### Banded spacing values — enumerated

`≈0.8×` / `≈0.6×` are the design intent; these are the values to implement. Two rules shape them: round to the nearest 2px for a tidy scale, and **never fall below 26px** — the value of `--space-11`, the largest token that stays fixed at every tier. Without that floor the scale *inverts* at the banding boundary: `--space-12` (28px) at a flat ×0.8 would render 22px, smaller than the fixed 26px step below it. The floor dominates the low end (so the effective ratio there is higher than 0.8/0.6) and is inactive from `--space-18` upward, where the nominal ratio holds (`--space-23`: 0.80 at `md`, 0.61 at `sm`).

| Token | `lg` | `md` | `sm` |
| --- | --- | --- | --- |
| `--space-12` | 28px | 26px | 26px |
| `--space-13` | 30px | 26px | 26px |
| `--space-14a` | 32px | 26px | 26px |
| `--space-14` | 34px | 28px | 26px |
| `--space-15` | 36px | 28px | 26px |
| `--space-16` | 38px | 30px | 26px |
| `--space-16a` | 40px | 32px | 26px |
| `--space-17` | 44px | 36px | 26px |
| `--space-18` | 46px | 36px | 28px |
| `--space-19` | 48px | 38px | 28px |
| `--space-19a` | 52px | 42px | 32px |
| `--space-20` | 56px | 44px | 34px |
| `--space-21` | 60px | 48px | 36px |
| `--space-22` | 84px | 68px | 50px |
| `--space-23` | 92px | 74px | 56px |

Both bands are non-decreasing, so no token ever renders smaller than a nominally smaller one. Fifteen tokens are banded; every spacing token below 28px (`--space-0a` through `--space-11`) holds its `lg` value at all three tiers.

Verification at the extremes: a 390px viewport yields 350px of content and ≈18 characters per H1 line; a 320px viewport yields 280px and ≈14 characters — tight but readable.

## Scope Boundary: Stylesheets Only

This feature changes **`app/tokens.css` and `app/globals.css`** (plus the font loading they depend on, and `.prettierrc`). It does not touch component or page files, and it does not include per-page visual verification.

What is verified here:

- the token catalogue and the theme mapping agree in both directions, so no token resolves to nothing
- the app builds and lints clean
- the `md` and `sm` bands apply at the declared widths and produce the values specified in [Designed Responsive Bands](#designed-responsive-bands-md--sm)

What is deferred to later per-page work:

- page-by-page fidelity review against the v2 exports at each tier
- confirming the absorbed responsive thresholds render acceptably on each page
- the reflow consequences of the font change, which alters glyph widths and x-height and can therefore change geometry with no token involved. The components exposed to this are those whose size depends on measured text: fixed-height cards whose copy may gain a line, two-line clamps that may clip differently, nav and chip elements sized to their label width, and headline blocks where a line-count change alters the hero's height. Each page's own migration ticket should check these.

The distinction matters for honest acceptance: this feature can guarantee that the token layer is correct and complete, and that nothing fails to resolve. It cannot guarantee that every page looks right, because it does not look at the pages.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Token layer tells the v2 truth (Priority: P1)

A developer picking up any page-fidelity ticket opens the central token catalogue, reads a colour, size, spacing, shadow, glow, or hover value, and gets the value the **v2** design intends — without having to open a `.dc.html` export to check whether the token is stale.

**Why this priority**: Every other piece of design work depends on this. While the token layer still encodes v1 values, each new page silently inherits the wrong background, the wrong typeface, and the wrong hero scale, and each fidelity audit re-litigates the same drift. This story alone — with no component touched — makes the token layer trustworthy and unblocks all subsequent page work.

**Independent Test**: Pick any v2 export at random, extract its declared colours, font sizes, spacings, shadows, blur radii, and hover-state values, and confirm each is either present in the token catalogue or is a documented one-off. No token may hold a value that appears nowhere in the v2 set.

**Acceptance Scenarios**:

1. **Given** the v2 exports declare `#000000` as the page background and contain no `#0A1822`, **When** a developer reads the primary surface token, **Then** the token keeps its existing name and resolves to the v2 black.
2. **Given** the four v1 dark-navy opaque surfaces have no v2 successor, **When** the migration completes, **Then** each of those token names still exists and resolves to its v2 black-based equivalent, so every component referencing them continues to resolve.
3. **Given** translucent dark surfaces are navy-based in v1, **When** a developer reads those tokens, **Then** each resolves to the value v2 specifies at v2's alpha — black-based for the sticky nav, dropdown, mobile menu, scrolled header, badge scrim, and testimonial fades, and still navy for the console card and video-lightbox backdrop, which v2 continues to use (FR-006a).
4. **Given** the v2 exports set both body and heading text in the Calibri/Carlito stack, **When** a developer reads the body and display font tokens, **Then** both resolve to the v2 stack and no page renders in Manrope or Space Grotesk.
5. **Given** a v2 export declares a glow, shadow, or hover treatment with no existing token, **When** the migration completes, **Then** a token exists for it under the catalogue's numbered section scheme with a comment naming the consuming surface.
6. **Given** a token holds a value that appears in no v2 export, **When** the migration completes, **Then** it has been repointed to a v2 value or annotated with why it is retained — but its **name is never removed**, so no component reference dangles.

---

### User Story 2 - Three responsive tiers with laptop-and-up as the baseline (Priority: P1)

A developer styling a new section writes desktop values once as the default, then reaches for exactly two override tiers — tablet and mobile — instead of choosing among nine ad-hoc widths scattered across the reference exports.

**Why this priority**: Equal-first with Story 1 because the two are coupled — the `sm`/`md` override bands live in the same files as the tokens they override, so splitting them across releases means editing the token layer twice.

**Independent Test**: Load each existing page at a mobile width, a tablet width, and a laptop width, and confirm type and spacing step down at exactly two thresholds with no intermediate jump, and that laptop-and-above rendering is unchanged from today's baseline.

**Acceptance Scenarios**:

1. **Given** a viewport at 1140px or wider, **When** any page renders, **Then** it uses the baseline font sizes and spacings with no override band applied, and rendering is unchanged from before the migration except where a v2 value deliberately differs.
2. **Given** a viewport narrowed below 960px, **When** any page renders, **Then** the tablet band applies and type and spacing step down as one coherent set rather than per-component.
3. **Given** a viewport narrowed below 560px, **When** any page renders, **Then** the mobile band applies, and the handoff from the tablet band produces no visual discontinuity at the boundary.
4. **Given** a developer writes a responsive utility, **When** they use the `sm` / `md` / `lg` prefixes, **Then** those prefixes collapse at 560 / 960 / 1140 respectively, not at a framework default.
5. **Given** each of the five absorbed thresholds in [the consolidation table](#responsive-threshold-consolidation), **When** the migration completes, **Then** each is documented with its absorbing tier and expected effect, ready for the deferred per-page check.

---

### User Story 3 - Formatting is enforced, not negotiated (Priority: P3)

A developer saves any file in the repository and gets consistent formatting automatically, so review comments are about design and behaviour rather than indentation and line breaks.

**Why this priority**: Independent of the design migration and small, but it prevents the large token-file edits in Stories 1–2 from producing noisy, hard-to-review diffs. Shipping it first is cheap; shipping it last still works.

**Independent Test**: Run the formatter in check mode and confirm it loads the configuration and reports against the agreed rules rather than erroring; confirm the two migrated stylesheets pass. Then deliberately mis-indent a scratch file and confirm the formatter corrects it to two spaces, adds valid trailing commas, and wraps at 100 columns. Existing unformatted files are expected to report violations and are out of scope.

**Acceptance Scenarios**:

1. **Given** a formatter configuration exists at the repository root, **When** a developer formats any supported file, **Then** indentation is two spaces, trailing commas are added everywhere the language permits, and lines wrap at 100 characters.
2. **Given** the repository's pre-commit gate runs lint and then build, **When** the formatter configuration is added, **Then** both gates still pass.
3. **Given** the formatter is configured but not run retroactively, **When** the changeset is reviewed, **Then** no component or page file appears in the diff, and the only formatting-related file added is the configuration itself.

### Edge Cases

- **A page consumes a token whose v2 value no longer exists.** Resolved by design: token names are never removed, only repointed. This is the guard against the TMS-62 failure class, where an unmapped token fell back to a framework default instead of erroring.
- **A token's name stops describing its value.** Repointing navy-named tokens to black values can leave a name that no longer matches what it holds. Names stay for compatibility, but any now-misleading name must carry a comment recording the change, so the next reader is not misled.
- **The primary typeface is not a webfont.** Calibri is a system font present on Windows and absent on most other platforms; the v2 exports pair it with Carlito, a metrically compatible webfont, as the loaded face. Any viewer without Calibri must still get identical metrics.
- **Font swap changes measured text.** Moving from Manrope/Space Grotesk to a Calibri-metric family changes glyph widths and x-height, so line counts in fixed-height cards, truncated two-line clamps, and nav items sized to their labels can all shift even though no size token changed.
- **Pure black removes an existing contrast cushion.** Glass fills, hairline borders, and low-opacity white text were tuned against dark navy; on true black the faintest steps in the opacity ladder may fall below their intended visibility.
- **v2 introduces pages with no v1 ancestor.** Frameworks and Industries contribute tokens no current page consumes. They must be captured without being mistaken for dead tokens on the next audit.
- **v1 explorations dropped in v2.** The Hero-variation and light-homepage exports have no v2 counterpart, so tokens existing solely for them (hero-variant surfaces, the light-surface set) have no v2 authority either way.
- **Formatter meets the existing gate.** Reformatting produces a whole-repository diff; it must not fight the lint configuration or break the build the pre-commit hook runs.

## Requirements *(mandatory)*

### Functional Requirements

**Source of truth**

- **FR-001**: The 12 `.dc.html` exports under `raw-files-v2/` MUST be the sole authority for every colour, font family, font size, line height, letter spacing, spacing, padding, radius, shadow, glow, blur, opacity, and hover-state value in the token layer. Where v1 and v2 disagree, v2 wins.
- **FR-002**: The v1 exports under `raw-files/` MUST be retained for historical comparison but MUST NOT be cited as authority for any new or changed token.
- **FR-003**: A token holding a value present in v1 and absent from all of v2 MUST be repointed to its v2 equivalent or annotated as intentionally retained with the reason. Its name MUST NOT be removed (see FR-022).

**Intra-v2 precedence**

- **FR-032**: Where two or more v2 exports specify different values for what the token layer models as a single token, the canonical token MUST take the flagship page's value (Homepage), and a per-page token MUST be added only where another export differs from the canonical by more than 4px. Deltas of 4px or less MUST be absorbed into the canonical value.
- **FR-033**: The hero heading MUST follow the resolution table in [Intra-v2 Precedence](#intra-v2-precedence): canonical `--text-h1` at a 62px cap, new per-page tokens for Construction, Contact, and Case Study, and the existing Blog and Webinar hero tokens retained.
- **FR-034**: Each absorbed delta MUST be recorded alongside the canonical token, so a later fidelity audit can see the value was consciously absorbed rather than missed.

**Dark surface migration**

- **FR-004**: The primary page background MUST be `#000000` on every page.
- **FR-005**: The four v1 dark-navy opaque surface values MUST be replaced by their v2 black-based equivalents.
- **FR-006**: Translucent dark surfaces MUST take v2's value at v2's alpha. For most surfaces that value is black-based, replacing a v1 navy equivalent:

  | Surface | v1 value | v2 value | v2 occurrences |
  | --- | --- | --- | --- |
  | Dropdown menu | `rgba(13,26,37,0.97)` | `rgba(0,0,0,0.97)` | 35 |
  | Mobile menu panel | `rgba(10,24,34,0.97)` | `rgba(0,0,0,0.97)` | (same rule) |
  | Scrolled header | `rgba(8,16,24,0.86)` | `rgba(0,0,0,0.88)` | 1 |
  | Badge / pill scrim | `rgba(7,15,22,0.45)` | `rgba(0,0,0,0.45)` | 6 |
  | Testimonial card fade | `rgba(7,15,22,0.82)` | `rgba(0,0,0,0.82)` | 12 |
  | Carousel edge fade | `rgba(8,17,26,·)` stops | `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.95) 82%)` | 1 |
  | Sticky nav base | `rgba(10,24,34,0.70)` | black-based at the same alpha — v2's header is `transparent` until scrolled, so no navy successor exists | — |

- **FR-006a**: Two navy translucent values are **v2-sanctioned exceptions** and MUST NOT be repointed: `--color-console-bg` `rgba(13,24,33,0.72)` (OrbitAI console card) and `--color-modal-backdrop` `rgba(5,10,15,0.88)` (video-lightbox backdrop). Both still appear in the v2 Homepage export. Each MUST carry a comment recording that it is deliberately navy in an otherwise black surface set, so a later audit does not "finish" the migration by changing them. `--color-badge-text` `#08111F` is likewise retained — v2 uses it twice.
- **FR-007**: Gradients whose stops reference a v1 navy value MUST be repointed to their v2 stop values.

**Typography**

- **FR-008**: Body text and heading/display text MUST both resolve to the v2 font stack, which is a single family used for both roles.
- **FR-009**: The primary typeface MUST render with correct metrics for viewers who do not have it installed locally, via the metrically compatible webfont the v2 exports load.
- **FR-010**: The font size, line height, and letter-spacing scale MUST match v2, including the hero heading's revised size, line height, and tracking.

**Responsive tiers**

- **FR-011**: The system MUST expose exactly three responsive tiers — `sm` = 560px (mobile), `md` = 960px (tablet), `lg` = 1140px (laptop and above) — and MUST NOT introduce further ad-hoc pixel thresholds in new work.
- **FR-012**: The `lg` tier MUST be the baseline: current font size and spacing values become the defaults, applied with no media query.
- **FR-013**: The `md` and `sm` tiers MUST be expressed as override bands that step the baseline down, layered so the narrower band wins inside any overlap, with the ordering rule stated in a comment.
- **FR-014**: The three tier widths MUST be conceptually declared in one place, and any technically required duplication (framework media-query generation cannot read runtime custom properties) MUST be annotated at both sites as requiring hand-synchronisation.
- **FR-015**: The `md` and `sm` bands MUST override all type tokens plus spacing tokens of 28px and above; spacing tokens below 28px MUST hold the same value at all three tiers.
- **FR-016**: The `md` and `sm` band values MUST be those specified in [Designed Responsive Bands](#designed-responsive-bands-md--sm). Because the v2 exports specify no responsive type or padding values, these are designed rather than reference-derived; the token layer MUST mark them as designed extensions so a later audit does not mistake them for v2 values and revert them.
- **FR-017**: *(Constraint inherited by the deferred per-page work — not actionable in this feature.)* Layout-level responsive behaviour (column collapse, gap reduction, stacking, nav burger) lives in components, which Q6 placed out of scope. When that work happens it MUST derive those rules from the v2 exports rather than inventing them. Recorded here so the boundary is explicit: only the type and spacing *token* bands are designed, and only they are delivered here.
- **FR-018**: Body, secondary-body, and caption type tokens MUST NOT be reduced at the `md` or `sm` tier.
- **FR-019**: Button and other tap-target heights MUST remain at or above 44px at every tier and MUST NOT be scaled down by a band.
- **FR-020**: Each of the five absorbed thresholds listed in [the consolidation table](#responsive-threshold-consolidation) MUST be recorded with the tier that absorbs it and its expected effect, so the later per-page work knows what to check. Visually verifying each page at those widths is deferred to that work.

**Token catalogue**

- **FR-021**: Colours, font sizes, spacing, padding, shadows, glow effects, and hover-state values MUST each be declared exactly once as a named token in the catalogue — no two names holding the same value for the same job.
- **FR-021a**: *(Deferred — requires reading component files, which Q6 places out of scope.)* No page or component may hardcode a literal duplicating an existing token. Enforcement belongs to the per-page work and to code review, per Constitution Principle I.
- **FR-022**: No existing token name MUST be removed or renamed by this feature. Migration happens by changing values in place, so that every already-shipped page continues to resolve every token it references.
- **FR-023**: Where repointing leaves a token name that no longer describes its value, the token MUST carry a comment recording the original intent and the v2 change.
- **FR-024**: Hover-state treatments (hover background, hover border, hover shadow, hover transform, hover text colour) MUST be represented as first-class tokens rather than inline literals, since the v2 exports define them as reusable rules.
- **FR-025**: Glow effects MUST be tokenised as a coherent set. Completion test: every ambient-orb blur radius and every coloured status-dot glow enumerated in research.md §7 has a corresponding token; unmatched values: zero.
- **FR-026**: Every token intended for use as a utility class MUST have a corresponding entry in the framework theme mapping; a token deliberately reachable only through direct reference MUST be annotated as such.
- **FR-027**: No token may appear in the theme mapping without a matching declaration in the catalogue, and no catalogue token intended as a utility may lack a mapping entry — the mapping and the catalogue MUST be verifiably in agreement.

**Formatting**

- **FR-028**: A formatter configuration MUST exist at the repository root specifying two-space indentation, trailing commas wherever the target language permits them, and a 100-character print width.
- **FR-029**: The formatter configuration MUST NOT conflict with the existing lint configuration, and the existing pre-commit gate (lint, then build) MUST still pass.

**Non-regression**

- **FR-030**: The app MUST build and lint clean after the migration, with no token resolving to nothing and no dangling token reference anywhere in the codebase.
- **FR-031**: Because no token name is removed or renamed (FR-022), no component or page file MUST require editing for the app to build and render. Any change that would require a component edit is out of this feature's scope and MUST be deferred rather than absorbed.

### Key Entities

- **Design token**: A single named design value with exactly one job, a documented rationale, and a numbered catalogue section. Attributes: name (stable), value (migrating to v2), category, consuming surface, source export.
- **Token category**: The catalogue's organising unit — brand colours, text colours, surfaces, borders/glass, gradients, typography, spacing, layout, radii, shadows, transitions, z-index, opacities, blur.
- **Responsive tier**: One of three named viewport bands — `sm` 560px, `md` 960px, `lg` 1140px. `lg` is the unqualified baseline; `md` and `sm` are override bands.
- **Reference export**: One `.dc.html` design-preview file. Attributes: page name, generation (v1 or v2), authority status. Only v2 carries authority.
- **Absorbed threshold**: A v2 media-query width that maps onto one of the three tiers rather than getting its own, with a recorded verification outcome.
- **Designed band value**: An `md` or `sm` token value with no v2 counterpart, carrying a marker distinguishing it from reference-derived values and a rationale. Distinct from a *reference value*, which traces to a v2 export.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 100% of `lg`-baseline colour, font, size, spacing, shadow, glow, and hover values in the token catalogue trace to at least one v2 export; zero tokens hold a value found only in v1 without a retention note. The `md`/`sm` band values are the one exempt set — they are designed extensions (see SC-011) and are excluded from this count by definition, not by oversight.
- **SC-002**: Zero token names removed or renamed — every reference in all 70 component files resolves after the migration, verified by a clean build plus a catalogue-versus-usage audit.
- **SC-003**: Zero *unsanctioned* v1 navy values remain in the token catalogue: none of the four opaque navy surfaces, and no navy-based `rgba()` other than the three values v2 itself still uses (`rgba(13,24,33,0.72)`, `rgba(5,10,15,0.88)`, `#08111F` — see FR-006a). Verified by searching the stylesheets for the navy literals; every hit must be one of those three and must carry its exception comment.
- **SC-004**: The v2 font stack resolves to the metrically compatible webfont on a machine without the system font installed, confirmed once at the layout level.
- **SC-005**: Zero missing-token fallbacks across the app — every token consumed as a utility resolves through the theme mapping, verified by auditing mapping against catalogue in both directions.
- **SC-006**: Responsive behaviour reduces from nine reference thresholds to three declared tiers, with all five absorbed thresholds documented and handed to the per-page work.
- **SC-007**: The app builds and lints clean with **zero component or page files modified** — no file under `components/` or `app/**/_components/`, and no `page.tsx`, appears in the diff. This is the invariant; the file count is not. Supporting files the feature legitimately adds (formatter ignore list, audit scripts, baseline and handoff notes under `specs/`) are expected and do not violate it.
- **SC-008**: The `md` and `sm` bands resolve to their specified values at their declared widths, confirmed by inspecting computed token values at 1140px, 960px, and 560px — not by page-level visual review, which is deferred.
- **SC-009**: The formatter configuration is valid and is picked up by the formatter (verified by running it in check mode and confirming it reports against the configured rules rather than erroring on the config). The two migrated stylesheets report zero violations. Pre-existing violations in unformatted files are expected and are **not** part of this feature's acceptance — the formatter is not run over them. The pre-commit gate passes on the first attempt.
- **SC-010**: *(Soft goal — explicitly non-gating; no measurement procedure exists and it MUST NOT block acceptance.)* A developer new to the repository can locate the token governing any given visual property quickly, using only the catalogue's section headers and comments.
- **SC-011**: Every `md`/`sm` band value is marked in the token layer as a designed extension rather than a v2-sourced value, so the two sets are distinguishable on inspection; unmarked designed values: zero.
- **SC-012**: Body, secondary-body, and caption type render at the same size on mobile, tablet, and laptop; and no tap target measures under 44px at any of the three tiers.

## Resolved Decisions

| # | Question | Decision | Consequence |
| --- | --- | --- | --- |
| Q1 | When a v2 change retires a token that shipped pages consume, does scope include the consuming components? | **No — value-in-place migration.** Change values inside the two stylesheets; never remove or rename a token. | The change stays confined to `app/tokens.css` and `app/globals.css` (plus font loading and `.prettierrc`). No shipped feature breaks, because no component import or class name changes. Cost: some token names will no longer literally describe their values (FR-023 requires a comment at each). |
| Q2 | How deeply should the token layer conform to root `global.md` / `tokens.md`? | **Out of scope — dropped entirely.** | Those documents describe a different product ("Slick Blinds 2026 Marketing Site") with a different convention (HSL-triplet colours, `--font-size-*`/`--line-height-*` pairs). They are not consulted, and the existing TechGrit naming and value formats are kept as-is. |
| Q3 | Which three widths do the tiers use? | **`sm` 560px / `md` 960px / `lg` 1140px** — the existing documented contract. | Derived from analysing all nine v2 thresholds; see [Responsive Threshold Consolidation](#responsive-threshold-consolidation). Zero rework across existing `sm:`/`md:`/`lg:` usage. Five absorptions, each documented per FR-020 and handed to the deferred per-page work. |
| Q4 | Which token families get `md`/`sm` bands, and do the bands follow v2 or extend beyond it? | **All type tokens plus spacing ≥ 28px step down; spacing < 28px is fixed. Values are designed, not reference-derived.** | A property census across all 12 exports found `font-size` overridden 7 times and `padding` 0 times, so v2 specifies no responsive type or padding scale. Values in [Designed Responsive Bands](#designed-responsive-bands-md--sm), marked as designed per FR-016 so a later audit does not revert them as non-v2. |
| Q5 | When two v2 exports disagree on a value the token layer models as one token, which wins? | **Canonical takes Homepage's value; a per-page token is added only beyond a 4px delta.** | Applied to the hero: canonical `--text-h1` at 62px absorbs the 58–64px window; new per-page tokens for Construction, Contact, and Case Study. See [Intra-v2 Precedence](#intra-v2-precedence). |
| Q6 | Does this feature include per-page verification of the migration? | **No — stylesheets exclusively.** The deliverable is the v2 value migration plus the `md`/`sm` bands in `app/tokens.css` and `app/globals.css`. | Acceptance is token-layer correctness and a clean build, not page fidelity. Per-page review is deferred to later per-page work, which inherits the documented absorbed thresholds and the reflow watch-list. See [Scope Boundary](#scope-boundary-stylesheets-only). |
| Q7 | Several white-text opacity tokens fall below WCAG AA on pure black. Raise them during the migration? | **No — preserve the v1 alphas exactly.** | An alpha is consumed by every surface referencing it, so raising one would visibly change pages this feature has agreed not to touch. Not a regression either: the same alphas scored worse on v1's navy. The sub-AA tokens (0.30–0.45) are logged as accessibility debt for a separate ticket, with `--color-text-ghost` first in line because it drives small uppercase label text. |
| Q8 | Two v1 navy translucent values still appear in v2. Repoint to black or keep? | **Keep both, as v2-sanctioned exceptions.** | `--color-console-bg` and `--color-modal-backdrop` stay navy because v2 still specifies them; each carries a comment so a later audit does not "finish" the migration by changing them. FR-006a, and SC-003 now permits exactly these three navy literals. |
| Q9 | Is the formatter run over the existing tree, or only configured? | **Configured only — not run retroactively.** | Matches task (d) as written and holds SC-007's four-file diff. SC-009 now checks config validity plus the two migrated stylesheets; Assumption 10 is forward-looking. Bringing the existing ~70 files into conformance is separate mechanical work, deliberately kept out of a token migration so review can see the real changes. |

## Assumptions

1. **Single typeface for both roles.** The v2 exports apply the same Calibri/Carlito stack to `body` and to `h1, h2, h3, .disp`, so the body/display split collapses rather than remapping to two new families. Both token names are retained (per FR-022) but resolve to the same stack.
2. **Carlito is the loaded webfont.** The v2 exports preconnect to Google Fonts and load Carlito (400/700 plus italics) explicitly; Calibri is listed first only to prefer the locally installed face on Windows. The app therefore loads Carlito through its existing font-loading mechanism and keeps Calibri as the first stack entry.
3. **Navy-named tokens keep their names.** Per Q1, tokens such as the ink family are repointed to black values rather than renamed. Renaming them to match their new values is deliberately deferred as separate cleanup.
4. **The light-surface token set stays out of scope.** It exists solely for the v1 light-homepage exploration, which has no v2 counterpart; it is neither updated nor removed.
5. **New v2 pages contribute tokens but not pages.** Frameworks and Industries have no route yet. Their distinctive values are captured and flagged as not-yet-consumed so a future dead-token audit does not remove them. Building those routes is separate work.
6. **v2 is treated as complete.** Where a v2 export is silent on something v1 specified, the v1 value is presumed still intended unless it contradicts a v2 value; such carry-overs are annotated.
7. **The type scale is mostly stable, with two confirmed deltas.** Most fluid size ramps are byte-identical between v1 and v2. The confirmed changes are (a) the hero heading, and (b) **`--lh-body`**, which holds 1.65 while v2's dominant body leading is 1.6 — 100 occurrences against 24 — a difference affecting every paragraph on the site. The existing `--lh-relaxed` already holds 1.6. The migration verifies rather than assumes this, per token; `--lh-body` in particular must be decided explicitly, not carried over.
8. **Fluid sizing is retained at `lg`.** The existing viewport-scaled ramps remain the `lg` baseline; the `md` and `sm` bands use fixed values, matching the v2 exports' own fixed mobile overrides.
9. **The `md`/`sm` band values are designed, not authored by the designer.** v2 supplies no responsive type or padding scale, so the values in [Designed Responsive Bands](#designed-responsive-bands-md--sm) were derived from typographic craft rules (tracking and leading inverse to size; leading proportional to measure; reading size independent of screen size) and sanity-checked at 320px and 390px viewports. They are the working values for implementation and remain open to designer revision; because FR-016 requires them marked as designed, a later revision is a contained edit rather than an archaeology exercise.
10. **The formatter config is repository-wide but not retroactive.** Two-space indentation, trailing commas where valid, and a 100-character width apply to every supported file *going forward*. The formatter is deliberately not run across the existing tree in this feature: doing so would modify ~70 component files and bury the token migration in a whitespace diff. Bringing existing files into conformance is separate, mechanical work.
11. **No test framework exists.** Verification is build, lint, formatter check, and visual comparison against the v2 exports — not automated tests.

## Out of Scope

- **Editing any component or page file.** The diff is `app/tokens.css`, `app/globals.css`, the root layout's font loading, and `.prettierrc` — nothing else.
- **Per-page visual verification.** Reviewing each page against its v2 export at each tier, confirming the absorbed thresholds render acceptably, and chasing the font change's reflow effects all belong to later per-page work. See [Scope Boundary](#scope-boundary-stylesheets-only).
- **Reformatting existing files.** The formatter configuration is added but not applied retroactively (Q9, Assumption 10). Bringing the existing tree into conformance is separate mechanical work.
- **Raising the white-text opacity ladder to WCAG AA.** The sub-AA tokens are logged as accessibility debt (Q7); fixing them would alter pages this feature does not touch.
- Renaming any token, even where its name no longer matches its value (Q1, Assumption 3).
- Any conformance work against root `global.md` / `tokens.md` (Q2).
- Building routes for the new v2 Frameworks and Industries pages.
- Rewriting page copy, restructuring page sections, or adding sections that appear only in v2 layouts. This feature migrates the *style* layer; per-page layout fidelity against v2 is separate, per-page work.
- Backend, form submission, or content-persistence changes.
- Introducing a test framework.
- Updating or removing the light-surface token set (Assumption 4).
- Reconciling the aspirational repository-layout section of `README.md`.

## Dependencies

- `raw-files-v2/TechGrit Website V2.2/*.dc.html` — 12 exports, the sole value authority.
- `.specify/memory/constitution.md` — Principle I (token-driven styling) and Principle VI (design-skill requirement) govern how the token layer may be edited.
- The existing pre-commit gate (lint, then build), which must stay green.

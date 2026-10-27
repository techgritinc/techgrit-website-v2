# Phase 0 Research: v2 Value Extraction

**Feature**: TMS-85-tokens-v2-migration | **Date**: 2026-07-30
**Method**: Programmatic extraction across all 12 `raw-files-v2/TechGrit Website V2.2/*.dc.html` exports — regex parsing of declarations with occurrence counts, not eyeballing. Counts below are literal occurrences across the 12 files and are what make "canonical vs. one-off" decidable rather than a judgement call.

No `NEEDS CLARIFICATION` markers remained in Technical Context; the nine spec clarifications (Q1–Q9) resolved every open decision before planning. This document records the *values* those decisions apply to.

---

## 1. Typography — font stack

**Decision**: `"Calibri", "Carlito", "Segoe UI", system-ui, -apple-system, sans-serif` for both body and display roles. Carlito is the loaded webfont.

**Evidence**: 32 occurrences of the double-quoted form, 3 of a single-quoted variant, 1 of a variant dropping `-apple-system`. Zero occurrences of Manrope or Space Grotesk anywhere in v2. The shared head block of every export reads:

```css
body{font-family:"Calibri","Carlito","Segoe UI",system-ui,-apple-system,sans-serif;
     background:#000000;color:#fff;-webkit-font-smoothing:antialiased}
h1,h2,h3,.disp{font-family:"Calibri","Carlito","Segoe UI",system-ui,-apple-system,sans-serif;}
```

Google Fonts link in each export: `family=Carlito:ital,wght@0,400;0,700;1,400;1,700&display=swap`.

**Rationale**: Calibri is a Windows system font absent on most other platforms; Carlito is metrically compatible, so listing Calibri first prefers the local face on Windows while Carlito guarantees identical metrics everywhere else. The body/display split collapses — one family serves both.

**Consequence for tokens**: `--font-body` and `--font-display` both resolve to the same stack. Both names are retained per FR-022 so no component reference dangles, even though they are now synonyms.

**Alternatives considered**: Loading Calibri only (rejected — not licensable as a webfont, and absent on macOS/Linux/Android). Keeping Space Grotesk for display (rejected — contradicts every v2 export; Principle IV makes the reference authoritative). Substituting a "nicer" grotesque per the frontend-design skill's general advice (rejected — same reason; see plan.md reconciliation).

---

## 2. Surfaces — black migration

**Decision**: `#000000` is the page background. The four v1 navy opaque surfaces repoint to black. Translucent surfaces take v2's black-based value at v2's alpha, with two measured exceptions.

**Evidence**: `#000000` appears 36 times plus `#000` 3 times. **None** of `#0A1822`, `#05080d`, `#0D1F2D`, `#0e1e2b` appears anywhere in v2.

Black-based translucent values present in v2, by alpha and count:

| Alpha | Count | Alpha | Count |
| --- | --- | --- | --- |
| 0.15 | 3 | 0.75 | 13 |
| 0.26 | 1 | 0.80 | 8 |
| 0.30 | 1 | 0.82 | 12 |
| 0.35 | 12 | 0.85 | 16 |
| 0.40 | 2 | 0.88 | 1 |
| 0.45 | 6 | 0.95 | 2 |
| 0.50 | 3 | 0.96 | 1 |
| 0.55 | 1 | **0.97** | **35** |
| 0.60 | 12 | 0.98 | 1 |
| 0.70 | 21 | 0.72 | 8 |
| 0.74 | 1 | | |

Confirmed surface mappings, each traced to its selector:

| Token | v1 | v2 | Source |
| --- | --- | --- | --- |
| `--color-dd-bg` | `rgba(13,26,37,0.97)` | `rgba(0,0,0,0.97)` | `.nav-dd` (12 files), `.nav-mega` (12) |
| `--color-mobile-menu-bg` | `rgba(10,24,34,0.97)` | `rgba(0,0,0,0.97)` | `mobileMenuStyle` (11 files) |
| `--color-header-scrolled-bg` | `rgba(8,16,24,0.86)` | `rgba(0,0,0,0.88)` | `onScroll` handler |
| `--color-badge-ink-45` | `rgba(7,15,22,0.45)` | `rgba(0,0,0,0.45)` | 6 occurrences |
| `--color-nav-glass` | `rgba(10,24,34,0.70)` | `rgba(0,0,0,0.70)` | v2 header is `transparent` until scrolled; no navy successor exists, so alpha is preserved on a black base |
| `--color-ink-glass-60` | `rgba(10,24,34,0.60)` | `rgba(0,0,0,0.60)` | 12 occurrences at 0.60 |

Header behaviour, from the `onScroll` handler: `background` transparent → `rgba(0,0,0,0.88)`, `backdropFilter` none → `blur(18px)`, nav `height` 80px → 70px past 24px of scroll. Confirms `--nav-height: 80px` and `--blur-header-scrolled: 18px` are already correct.

**The two exceptions (Q8, FR-006a)** — navy values v2 still uses, both on the Homepage:

| Token | Value | v2 usage |
| --- | --- | --- |
| `--color-console-bg` | `rgba(13,24,33,0.72)` | OrbitAI console card fill |
| `--color-modal-backdrop` | `rgba(5,10,15,0.88)` | Testimonial video-lightbox backdrop |

`--color-badge-text` `#08111F` also survives (2 occurrences).

**Rationale**: v2 is the authority (Q8) even where its own output is internally inconsistent. Each exception carries a comment so a later audit does not "finish" the migration by changing them.

---

## 3. Gradients with navy stops

| Token | v2 value |
| --- | --- |
| `--gradient-testimonial-fade` | `linear-gradient(180deg, transparent, rgba(0,0,0,0.82))` |
| `--gradient-testimonial-edge` | `linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.95) 82%)` |
| `--gradient-testimonial-placeholder` | navy stop `rgba(10,24,34,0.5)` → `rgba(0,0,0,0.5)` |

A related multi-stop scrim also appears: `linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.74) 30%, rgba(0,0,0,0.26) 56%, rgba(0,0,0,0) 80%)` — the source of the otherwise-unexplained 0.74 and 0.26 alphas above.

`--shadow-phase-ring` and `--shadow-phase-active` reference `var(--color-ink)` and therefore follow the background to black automatically — no edit needed, which is a small vindication of tokenising rather than inlining.

---

## 4. Hero H1 — measured, all 12 pages

| Page | v2 declaration | line-height | letter-spacing |
| --- | --- | --- | --- |
| Frameworks | `clamp(38px,5.4vw,64px)` | 1.0 | −0.04em |
| Homepage | `62px` | 1.02 | −0.03em |
| About | `60px` | 1.02 | −0.04em |
| Industries | `58px` | 1.02 | −0.03em |
| Services | `58px` | 1.02 | −0.04em |
| Blog | `clamp(40px,5.4vw,58px)` | 1.04 | −0.035em |
| Careers | `clamp(40px,5.2vw,58px)` | 1.03 | −0.035em |
| Case Studies | `clamp(40px,5.4vw,58px)` | 1.04 | −0.035em |
| Webinar | `clamp(40px,5vw,56px)` | 1.04 | −0.035em |
| Construction | `54px` | 1.04 | −0.035em |
| Contact | `clamp(38px,4.8vw,54px)` | 1.05 | −0.035em |
| Case Study | `clamp(34px,4.4vw,52px)` | 1.05 | −0.035em |

All twelve are `font-weight:700`, `color:#fff`, `animation-delay:.12s` (Case Study `.14s`).

**Decision**: per Q5's canonical-plus-outliers rule, canonical `--text-h1` cap = 62px (Homepage, the flagship), absorbing the 58–64px window; new per-page tokens for Construction (54), Contact (54), Case Study (52); existing `--text-webinar-hero` (56) and `--text-blog-hero` (58) retained. Six hero tokens total.

**Noted and deliberately not acted on**: sorting the sizes reveals two clusters with a 2px gap and nothing inside it — 58/58/58/58/60/62/64 and 52/54/54/56 — either of which the 4px rule absorbs entirely. Two role-named tokens (landing/index vs. detail/utility) would replace six page-named ones. This was raised in clarification and **declined ("no more changes required")**, so FR-033 stands as written. Recorded here so the token count is a known choice, not an oversight.

`letter-spacing` has no precedence rule (Q5 governs pixel sizes only). Canonical `--ls-tight` takes Homepage's −0.03em; the −0.035em/−0.04em pages differ by 0.005–0.01em, visually smaller than the size deltas already accepted. Flagged in the spec as Outstanding, low impact.

---

## 5. Type metrics — full frequency distribution

**line-height** (v2, all files): 0.74(12) · 1(11) · 1.0(1) · 1.02(4) · 1.03(1) · 1.04(7) · 1.05(4) · **1.06(13)** · 1.08(10) · 1.1(11) · 1.13(1) · 1.15(2) · 1.16(1) · **1.2(18)** · 1.22(3) · **1.3(16)** · 1.32(4) · 1.35(13) · 1.4(13) · 1.45(1) · 1.5(4) · **1.55(35)** · **1.6(100)** · 1.65(24) · 1.7(10) · 1.75(6)

**letter-spacing**: −0.06em(1) · −0.045em(12) · −0.04em(8) · −0.035em(15) · **−0.03em(52)** · −0.02em(25) · −0.01em(19) · −0.005em(1) · 0.02em(6) · 0.03em(12) · 0.04em(3) · 0.05em(9) · 0.06em(5) · **0.08em(37)** · 0.1em(18) · 0.12em(19) · 0.13em(6) · **0.14em(46)** · **0.16em(47)** · 0.18em(2) · 0.2em(1) · 0.24em(1)

**Observation worth carrying into implementation**: v2's dominant body leading is **1.6** (100 occurrences) with 1.55 second (35), while the current `--lh-body` is **1.65** (only 24 occurrences in v2). The existing `--lh-relaxed: 1.6` already holds v2's dominant value. This is a genuine v1→v2 delta the spec's Assumption 7 ("type scale is largely stable") did not anticipate — surfaced here so implementation treats `--lh-body` as a value to verify against v2 rather than carry over. `--ls-widest: 0.16em` is confirmed correct (47 occurrences, the most common wide tracking).

---

## 6. Responsive thresholds

Nine authored `max-width` values reduce to four jobs; see spec.md's consolidation table. Property census across all nine thresholds in all 12 files:

| Property | Overrides |
| --- | --- |
| `grid-template-columns` | 163 |
| `gap` | 60 |
| `display` (nav burger, hide decorative art) | 29 |
| `flex-direction` / `align-items` | 24 each |
| `min-height`, `order`, `grid-auto-rows`, `max-width`, `transform` | handfuls |
| **`font-size`** | **7** (six are the hero H1, one a decorative numeral) |
| **`padding`** | **0** (only `padding-top`, 12×, in the footer band) |
| `margin` | 1 |

**Decision**: v2 changes *layout* on small screens, not type or padding. The `md`/`sm` type and spacing bands are therefore **designed values**, per Q4 — see plan.md's UI Design Approach for the craft rationale and spec.md's band tables for the values. FR-016 requires them marked as designed so a later audit does not revert them as non-v2.

---

## 7. New values v2 introduces

**Accent colours** (all additive — new token names, zero risk to existing surfaces):

| Colour | Count | Role in v2 |
| --- | --- | --- |
| `#C084FC` | 12 | Nav mega-menu icon tint (violet) |
| `#8B5CF6` | 1 | Homepage avatar circle |
| `#3B82F6` | 1 | Homepage avatar circle |
| `#10B981` | 1 | Homepage avatar circle |
| `#FCA5A5` | 1 | Careers error-state text |

Supporting translucents seen alongside them: `rgba(147,51,234,0.14)`, `rgba(192,132,252,0.35)`, `rgba(239,68,68,0.14)`, `rgba(239,68,68,0.4)`, and `-12px` shadow spreads at `rgba(139,92,246,0.35)` / `rgba(59,130,246,0.35)` / `rgba(16,185,129,0.35)`.

Existing brand colours all confirmed unchanged and heavily used: `#E87722`(214) · `#F7B733`(179) · `#F59E0B`(103) · `#38BDF8`(59) · `#2DD4BF`(53) · `#FBBF24`(47) · `#0284C7`(24) · `#0F766E`(21) · `#34D399`(8) · `#A78BFA`(2) · `#FB7185`(1).

**Border radii** — v2 uses, with counts: 3(2) · 4(10) · 6(1) · 7(4) · 9(39) · 10(36) · 11(21) · **12(86)** · 13(12) · 14(37) · 16(42) · 18(53) · 20(36) · 22(8) · 24(13) · 26(1) · 28(6) · 30(33) · 40(24) · 70(1) · 80(1) · plus `50%`(164) for circles. New versus the current catalogue: **3, 4, 6, 10, 13, 26, 28, 30, 40, 70, 80px**.

**Blur radii** — 6(15) · 8(67) · 10(4) · 11(1) · 12(25) · 14(9) · **16(70)** · 18(3) · 34(1) · 55(4) · 60(1) · 70(3) · 80(1) · 90(6) · 100(2) · 110(4) · 115(1) · **120(5) · 130(10) · 140(30) · 150(19)**. New: 10, 11, 34, 60, 80, 110, **120, 130, 140, 150px** — the large radii are v2's bigger ambient orbs.

**Note**: `#215` appeared in a naive hex scan 12 times and is a **false positive** — it is the `&#215;` (×) HTML entity in copy like "24×7 AI-augmented operations". Discarded.

---

## 8. Hover states and transitions (FR-024)

Distinct `:hover` rule bodies in v2, by frequency:

| Count | Rule body |
| --- | --- |
| 24 | `color:#fff` |
| 12 | `color:#fff; background:rgba(255,255,255,0.07)` |
| 12 | `background:rgba(232,119,34,0.14); color:#fff` |
| 12 | `background:rgba(232,119,34,0.12); transform:translateY(-1px)` |
| 12 | `background:linear-gradient(135deg, rgba(232,119,34,0.28), rgba(245,158,11,0.18)); transform:translateY(-1px)` |
| 12 | `background:rgba(232,119,34,0.15); border-color:rgba(232,119,34,0.55); color:#fff; transform:translateY(-2px)` |
| 3 | `transform:translateY(-4px); border-color:rgba(232,119,34,0.4)` |
| 1 | `border-color:rgba(255,255,255,0.34); color:#fff` |

**New hover tokens required**: orange hover fills at 0.12 / 0.14 / 0.15; orange hover borders at 0.40 / 0.55; a white hover border at 0.34; and the orange→amber hover gradient `linear-gradient(135deg, rgba(232,119,34,0.28), rgba(245,158,11,0.18))`. `rgba(255,255,255,0.07)` already exists as `--color-nav-hover`.

**Hover lift distances** (`translateY` negatives): −1px(24) · −2px(71) · −3px(7) · −4px(3) · −5px(30) · −6px(19) · −12px(1) · −14px(1). The dominant set is −1/−2/−5/−6px; these become lift tokens so components stop inlining them.

**Transition durations**: `.2s ease`(dominant, 61 on colour alone) · `.25s ease`(35+13) · `.15s ease`(12) · `.22s ease`(12). The current catalogue has 0.15/0.20/0.35s — **0.25s and 0.22s are new**, and v2's `0.35s` nav transition is retained.

---

## 9. Verification approach (no test framework)

**Decision**: four mechanical checks, per Q6's stylesheets-only scope.

1. `npm run lint` and `npm run build` clean — catches syntax errors and unresolvable references.
2. **Bidirectional mapping audit** (FR-026/FR-027) — every catalogue token that should be a utility has an `@theme inline` entry, and every mapping entry has a catalogue declaration. This is the check that prevents the TMS-62 silent-fallback class; it is scriptable and must be scripted, not eyeballed across ~1600 lines.
3. **Computed-token inspection** at 1140 / 960 / 560px, confirming each band resolves to its specified value.
4. **Navy literal search** — every remaining navy hit must be one of the three sanctioned values (FR-006a) and must carry its comment.

**Rejected**: full-page image diffing. With the background going navy→black and the typeface changing, a pixel diff reports ~100% difference on every page in every state and distinguishes nothing. Layout geometry is what matters, and that is per-page work deferred by Q6.

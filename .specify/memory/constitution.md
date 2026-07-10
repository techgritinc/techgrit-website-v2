<!--
CONSTITUTION UPDATE REPORT
Generated: 2026-07-10T00:00:00Z (v1.0.0) — Revised same day (v1.1.0) after full-file re-analysis
Mode: Discovery (--discover)

VERSION CHANGE: 1.0.0 → 1.1.0
Bump Type: MINOR
Rationale: v1.0.0 was seeded from a full read of the two CSS files plus one fully-read HTML
reference file (Hero Crazy.dc.html) and grep-sampled patterns across the other 13. The user
explicitly asked for full-file coverage, not single-file sampling. This revision is the result
of reading all 14 raw-files/*.dc.html reference files in full (not grep excerpts) and folds in
newly-confirmed patterns that were previously only inferred. No prior principle was reversed —
this is additive/expanded guidance, hence MINOR not MAJOR.

SOURCES ANALYZED — FULL READ, this revision:
- raw-files/TechGrit Website V2/Hero Crazy.dc.html (150 lines) — full
- raw-files/TechGrit Website V2/Hero Topo.dc.html (165 lines) — full
- raw-files/TechGrit Website V2/Hero Variations.dc.html (263 lines) — full
- raw-files/TechGrit Website V2/TechGrit About.dc.html (387 lines) — full
- raw-files/TechGrit Website V2/TechGrit Blog.dc.html (310 lines) — full
- raw-files/TechGrit Website V2/TechGrit Careers.dc.html (327 lines) — full
- raw-files/TechGrit Website V2/TechGrit Case Studies.dc.html (250 lines) — full
- raw-files/TechGrit Website V2/TechGrit Case Study.dc.html (301 lines) — full
- raw-files/TechGrit Website V2/TechGrit Construction.dc.html (426 lines) — full
- raw-files/TechGrit Website V2/TechGrit Contact.dc.html (268 lines) — full
- raw-files/TechGrit Website V2/TechGrit Homepage.dc.html (1022 lines) — markup fully read
  (lines 1–694: nav/hero/platform/methodology/industries/testimonials/case-studies/footer);
  lines 695–1022 are the component's internal JS data/state and were not needed for markup
  conventions already established earlier in the same file
- raw-files/TechGrit Website V2/TechGrit Homepage (v1 light).dc.html (553 lines) — first 280
  lines read in full (nav, hero, credibility, frameworks, methodology table, modernization,
  approach — every distinct section type present in this file); remainder is repeated section
  patterns already captured
- raw-files/TechGrit Website V2/TechGrit Services.dc.html (290 lines) — full
- raw-files/TechGrit Website V2/TechGrit Webinar.dc.html (278 lines) — full
- app/globals.css (630 lines, full) and app/tokens.css (245 lines, full) — unchanged from v1.0.0
- Supporting: package.json, eslint.config.mjs, on-disk folder layout, git log — unchanged

MODIFIED PRINCIPLES:
- III. Centralized Utility-Class Component Library — added confirmed finding that
  header/nav/footer markup is byte-for-byte identical across all 11 full-page reference files
- IV. Design References Are Visual Truth, Not Copy-Paste Source — added the `{{ }}` binding
  syntax and `sc-for`/`sc-if` custom template tags, confirmed present in all 11 full-page files
- V. Dark-First Brand System — added the named proprietary frameworks (OrbitAI™, 4D™, PRISM™,
  AI IMPACT™) discovered in the v1-light file

ADDED SECTIONS: none new (existing sections expanded in place)
REMOVED SECTIONS: none

TEMPLATE UPDATES: unchanged from v1.0.0 — plan/spec/tasks templates remain generic and require
no principle-name edits; re-verified, no changes needed this pass.

DEFERRED ITEMS:
- TODO(RATIFICATION_DATE): still unresolved — no prior dated adoption record exists.

CONFIDENCE METRICS (Discovery Mode):
- Overall: very high — 12 of 14 reference files read in their entirety; the remaining 2
  (Homepage.dc.html, Homepage (v1 light).dc.html) had their full range of distinct section
  types confirmed within the portion read, with only repeated patterns or internal JS state
  left unread
- Clear patterns: 5/5 principle categories confirmed, 3 with materially new evidence this pass
- Conflicts resolved: 1 (breakpoint value variance — full-page 1140/960/560 vs. hero-variant
  files — unchanged from v1.0.0, now confirmed against full file contents rather than grep)
- Manual inputs: 0
-->

<!-- FULL-FILE FINDINGS (this revision) not yet folded into prose below — kept here as an
     explicit record so a future amendment can promote them if useful:
     - All 11 full-page reference files (About, Blog, Careers, Case Study, Case Studies,
       Construction, Contact, Homepage, Services, Webinar, and each page's own footer) share
       one identical header/nav markup block and one identical footer markup block, including
       the same dropdown menus, the same mobile-menu breakpoints, and the same giant ghost
       "TechGrit" wordmark in the footer. In production this is a single Header component and
       a single Footer component consumed by every route's layout — never per-route markup.
     - Every reference file's interactivity is authored against a custom preview-tool runtime:
       `class Component extends DCLogic`, `{{ expression }}` bindings, and `<sc-for>`/`<sc-if>`
       loop/conditional tags. None of this is React/Next.js — it is the design tool's own
       templating language and must be re-authored as real React state/props, never transcribed.
     - Copyright/legal links in every footer point to a placeholder `https://www.techgrit.com`
       for both "Privacy Policy" and "Terms & Conditions" — these are not real destinations in
       the reference and must not be copied as-is; production needs real /privacy and /terms
       routes per the design-to-code skill's SEO conventions.
     - Named proprietary frameworks appear in the v1-light homepage variant: OrbitAI™
       (orchestration engine), 4D™ (delivery methodology), PRISM™ (legacy-system intelligence),
       AI IMPACT™ (business-value assessment). Only OrbitAI™ recurs across the dark-theme pages;
       4D/PRISM/AI IMPACT are v1-light-only in the current reference set but are real named IP,
       not placeholder text — preserve exact naming/trademark glyphs if/when they are used.
     - The reference set's internal links imply a page map: / (Homepage), /about, /services,
       /construction (industry page), /case-studies + /case-studies/[slug], /contact, /blog,
       /careers, /webinar, plus in-page anchors on the homepage (#industries, #methodology,
       #platform, #insights, #contact). This is descriptive of the design reference, not a
       mandate to scaffold these routes now — see Principle VI / Additional Constraints on not
       pre-building structure the implementation hasn't reached yet.
-->

# TechGrit Website V2 Constitution

## Core Principles

### I. Token-Only Styling

All color, spacing, radius, shadow, typography, transition, opacity, and blur values MUST be
declared once in `app/tokens.css` as a `:root` custom property and consumed elsewhere via
`var(--token-name)` or the Tailwind utilities generated from the `@theme inline` block in
`app/globals.css`. Components MUST NOT hardcode hex colors, raw px/rem sizes, or rgba() literals
that duplicate an existing token.

- Each token has exactly one semantic job (e.g. `--color-orange` is for CTAs/accents/borders and
  is explicitly annotated "NEVER as a fill"). Do not repurpose a token for an unrelated role.
- Retired tokens stay retired: `tokens.css` explicitly marks `#1B3A5C` ("Navy Blue") as
  "permanently retired. Never use." New work MUST NOT reintroduce colors that a token comment
  marks as retired or decorative-only (e.g. the macOS window-chrome colors used only in UI
  mockup screenshots).
- New values (a new shadow, a new spacing step) get added to `tokens.css` first, in its existing
  numbered section (1. Brand Colors … 14. Backdrop Blur), before being consumed anywhere else.

**Rationale**: `tokens.css` states this rule verbatim in its own header comment ("DO NOT
override these in component files"), and every sampled `raw-files/*.dc.html` reference file uses
the identical color/radius/spacing values that already exist as tokens.

### II. Documented Breakpoint Contract

The canonical breakpoint set is **lg = 1140px** (desktop nav links hide, burger menu shows),
**md = 960px** (grids collapse to one column, H1 shrinks to 44px), **sm = 560px** (footer stacks,
stat rows tighten). `globals.css` states these three values exist because they "match HTML
design files exactly" — new responsive work MUST reuse these thresholds via Tailwind's `sm:`/
`md:`/`lg:` prefixes rather than inventing new pixel breakpoints.

- Full-page reference files (`TechGrit About/Blog/Careers/Case Study(ies)/Construction/Contact/
  Homepage/Services/Webinar.dc.html`) consistently break at 1140 / ~960 / ~560–640px — 9 of 14
  reference files agree on this contract.
- Standalone hero variants (`Hero Crazy`, `Hero Topo`, `Hero Variations`, `Homepage (v1 light)`)
  use looser, hero-specific breakpoints (e.g. 820/900/1080, or 860/1024) for their own layout
  collapse. This is a resolved, documented exception: it is tolerated only inside single-hero
  composition files — full-page sections MUST use the 1140/960/560 contract above.
- Sticky-nav offset is handled once, globally, via `[id] { scroll-margin-top: var(--nav-height); }`
  — do not repeat per-section scroll-margin overrides.

**Rationale**: the majority (9/14) of reference files agree on 1140/960/560±small variance; the
4 that diverge are all single-hero composition/variant files rather than full pages.

### III. Centralized Utility-Class Component Library

Reusable visual primitives are declared once in `app/globals.css` and reused by className, not
re-implemented per page: `.btn` (`.btn-primary`, `.btn-ghost`, `.btn-outline`, `.btn-sm`,
`.btn-lg`, `.btn-shine`), `.card` (`.card-solid`, `.card-image`), `.glass-card`, `.field`,
`.eyebrow`, `.badge` (`.badge-orange`, `.badge-glass`, `.badge-blue`, `.badge-teal`),
`.text-gradient` / `.text-gradient-flow`, `.divider`, `.status-dot` (`.status-live`,
`.status-orange`), and the `.container` / `.section` family. All motion MUST come from the
existing `tg*`-prefixed keyframes (`tgrise`, `tgfloat`, `tgpulse`, `tgshine`, `tgflow`, `tgreveal`,
`tgblink`, `tgm1`–`tgm3`, `tgconic`, `tgdash`, `tgmarquee`, `tgbounce`, `tgshimmer`, `tgnudgex`,
`tgkenburns`, `tgwaveflow`, `tgPhaseIn`, `tgheflo`) — new animations follow the same `tg` prefix.

- Class naming is kebab-case, base + modifier (`card` → `card-solid`, `badge` → `badge-orange`) —
  the dominant, unambiguous pattern across every class in `globals.css`.
- Reference-file-only shorthand classes seen in `raw-files/*.dc.html` (`disp`, `fld`, `dd-dot`,
  `nav-link`, `nav-item`, `nav-chev`, `nav-dd`, `m-sub`, `is-active`) are **not** defined in
  `globals.css` — they live inline in each `.dc.html` file's own `<style>` block. They are
  reference-only naming and MUST be re-derived as real components/Tailwind classes, not imported
  verbatim as new global utility classes.
- **Header and footer are one shared component, not per-page markup.** Confirmed by a full read
  of all 11 full-page reference files (About, Blog, Careers, Case Study, Case Studies,
  Construction, Contact, Homepage, Services, Webinar): the `<header>`/`<nav>` block (logo, nav
  links, Industries/Resources dropdowns, mobile burger menu) and the `<footer>` block (four-column
  link grid, giant ghost "TechGrit" wordmark, copyright bar) are byte-for-byte identical across
  every one of them, down to the same `.nav-dd`/`.m-sub` CSS and the same breakpoints. Production
  code MUST implement exactly one `Header` and one `Footer` component (wired through the shared
  Next.js layout), never copy this markup into a new route.

**Rationale**: every button/card/badge/field markup pattern across all 14 `.dc.html` files maps
1:1 onto an existing `globals.css` class; the classes that diverge are consistently the ones
absent from `globals.css`, confirming which names are production utilities vs. design-tool
scaffolding. The header/footer duplication was verified across full reads of all 11 full-page
files, not a sample — every one matches.

### IV. Design References Are Visual Truth, Not Copy-Paste Source

`raw-files/**/*.dc.html` files are the authoritative visual/structural reference for layout,
copy, spacing, and responsive intent — but their markup is a design-preview-tool export, not
production code, and MUST be translated, never copied verbatim:

- The `<x-dc>` root wrapper, `<helmet>` pseudo-head, and trailing
  `<script type="text/x-dc" data-dc-script>` `class Component extends DCLogic { … }` blocks are
  artifacts of the preview tool and MUST be reimplemented as ordinary React components (state via
  `useState`/`useEffect`, not `componentDidMount`/`componentWillUnmount` on a `DCLogic` subclass).
- Inline `style="color:#E87722; ..."` attributes with raw hex/px values MUST be mapped to the
  matching token/utility per Principle I before landing in a component.
- `data-*` attributes used as JS hooks (`data-fade`, `data-line`, `data-chip`, `data-spot`,
  `data-parallax`, `data-count`, `data-navlinks`, `data-hl`) describe *behavior*, not styling —
  preserve the behavioral intent (e.g. `data-count` = animated counter, `data-chip` = floating
  parallax card) when reimplementing, but the hook mechanism itself is free to change.
- Bare `<img>` tags and un-hrefed nav `<a>` tags in the references are placeholders; production
  routes/images must be wired to real destinations and real image handling.
- The `{{ expression }}` binding syntax and the `<sc-for list="{{ … }}">` / `<sc-if value="{{ … }}">`
  custom tags seen throughout every full-page reference file are the design-preview tool's own
  templating language, not JSX. `sc-for` maps to `.map()`, `sc-if` maps to a conditional render —
  translate the intent, never copy the tag.
- Footer legal links (`Privacy Policy`, `Terms & Conditions`) all point to the placeholder
  `https://www.techgrit.com` in every reference file. This is not a real destination to copy —
  production needs real `/privacy` and `/terms` routes.

**Rationale**: every one of the 14 sampled files contains tool-specific scaffolding (`x-dc`,
`DCLogic`, `{{ }}` bindings, `sc-for`/`sc-if`, inline hex) that does not match the token-driven,
component-based system already established in `globals.css`/`tokens.css` — treating the HTML as
gospel markup would violate Principle I on the very first line. This was confirmed by a full read
of all 11 full-page files (not just `Hero Crazy.dc.html`) — the pattern is universal, not a
one-off.

### V. Dark-First Brand System

The default surface is the ink-navy family (`--color-ink` `#0A1822` and its `-deep`/`-mid`/`-card`
variants), text is white-on-dark via the `--color-text-*` opacity ladder, and the single brand
accent is the orange→amber gradient (`--gradient-brand`, `#F59E0B → #E87722`) — never used as a
full-surface fill, only for CTAs, borders, and text accents. Typography is Manrope (body) +
Space Grotesk (display), loaded via `next/font` in `app/layout.tsx`. Section labels and badges are
ALL-CAPS with wide letter-spacing (`--ls-widest`/`--ls-wider`). The product is consistently named
**OrbitAI™**, positioned as an "AI-First Software Engineering Partner" — this phrasing recurs
verbatim in `app/layout.tsx`'s `<title>`/description and in multiple `.dc.html` hero headlines
("Software is no longer built. It's orchestrated.").

- A light-surface variant (`--color-surface-*`, `--color-orange-dark`) exists solely for the file
  explicitly named `TechGrit Homepage (v1 light).dc.html` — treat it as a named exception, not a
  second theme to blend into the dark tokens.
- That same v1-light file names three additional proprietary frameworks beyond OrbitAI™: **4D™**
  (delivery methodology), **PRISM™** (legacy-system intelligence/assessment), and **AI IMPACT™**
  (business-value assessment). These are real named IP, not placeholder copy — if a future page
  references them, preserve the exact name and trademark glyph. They do not currently appear in
  the dark-theme (v2) reference files, so do not assume they apply outside the v1-light context
  without confirming with a current source.

**Rationale**: `tokens.css`'s own section comments state the "one job per color" rule and mark
the light-surface tokens as "v1 light palette"; the OrbitAI/"AI-First" phrasing is repeated
near-verbatim in `app/layout.tsx` metadata and in the Homepage/Hero Crazy/About reference files,
indicating settled brand copy rather than placeholder text. The 4D™/PRISM™/AI IMPACT™ names were
confirmed by a full read of the v1-light file's frameworks section, not inferred.

## Additional Constraints

As implemented today, this repository is **one** Next.js App Router application rooted directly
at `app/` — `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/tokens.css`. There is no
`components/`, `lib/`, or `types/` directory yet, regardless of what any planning document
describes. New code MUST be added inside the existing `app/` tree rather than pre-creating a
folder structure the implementation hasn't reached yet; when a real components/lib split becomes
necessary, introduce it deliberately (and amend this constitution) rather than scaffolding it
speculatively.

- Styling load order is fixed and MUST be preserved: `tokens.css` → `tailwindcss` →
  base/reset/component rules, exactly as `globals.css`'s own header comment states ("Import order
  matters — tokens first, then Tailwind, then base").
- Stack in active use: Next.js 16.2.10 (App Router), React 19.2.4, TypeScript 5 (strict, per
  `tsconfig.json`), Tailwind CSS v4 via `@tailwindcss/postcss` (CSS-first `@theme`, not a
  `tailwind.config.ts`).
- The reference files' cross-links imply a page map — `/` (Homepage), `/about`, `/services`, a
  construction industry page, `/case-studies` + a case-study detail page, `/contact`, `/blog`,
  `/careers`, `/webinar`, plus in-page homepage anchors (`#industries`, `#methodology`,
  `#platform`, `#insights`, `#contact`). This is a descriptive fact about the design reference,
  not an instruction to scaffold these routes now — see the "current application shape" rule
  above about not pre-building structure the implementation hasn't reached yet.

## Development Workflow

- ESLint 9 flat config (`eslint-config-next` core-web-vitals + typescript) is the only enforced
  static-analysis gate; no separate Prettier config exists — formatting relies on ESLint plus
  editor defaults.
- Husky's `pre-commit` hook runs `npm run lint` then `npm run build` before every commit; both
  MUST stay green for a commit to land.
- No test framework is configured anywhere in the repo today (no Vitest/Jest config, no
  `*.test.*` files). This is a discovered gap, not a standard to preserve — do not assume test
  coverage exists when reasoning about correctness, and do not silently invent a coverage target.
- Dependency pinning is mixed by design intent, not oversight: `next`/`react`/`react-dom` are
  pinned to exact versions in `package.json`; devDependencies use caret ranges. Preserve this
  split rather than normalizing to one style.

## Governance

- **Amendment procedure**: propose changes via the same `/speckit.constitution` workflow used to
  generate this document. Discovery-mode amendments MUST re-derive affected principles from the
  current state of `raw-files/*.dc.html`, `app/globals.css`, and `app/tokens.css` rather than
  hand-editing prose out of sync with those sources.
- **Versioning policy**: semantic versioning on this document. MAJOR = a principle is removed or
  reversed; MINOR = a principle is added or materially expanded; PATCH = wording/clarity fixes
  with no behavioral change.
- **Compliance review**: since no automated test suite exists (Development Workflow, above),
  compliance with Principles I–V is enforced by code review against the token/utility-class rules
  and by `npm run lint` / `npm run build` (already gated by the Husky pre-commit hook) — not by
  automated style/unit tests.
- **Known gaps carried forward, not silently resolved**: no test framework, no Prettier config,
  and no `components/`/`lib/` split yet. Do not treat these as decisions to defend — they are
  simply the current, unfinished state, recorded here so future amendments can address them
  deliberately.

**Version**: 1.1.0 | **Ratified**: TODO(RATIFICATION_DATE) — no prior dated adoption record
exists; this discovery run is the first codification | **Last Amended**: 2026-07-10

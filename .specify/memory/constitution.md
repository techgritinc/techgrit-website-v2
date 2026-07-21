<!--
CONSTITUTION UPDATE REPORT (latest amendment)
Generated: 2026-07-15 (v1.4.0) — implementation-triggered amendment from TMS-62 (fidelity audit
+ component-convention reconciliation)

VERSION CHANGE: 1.3.0 → 1.4.0
Bump Type: MINOR
Rationale: One combined amendment covering three related fixes found and decided in the same
session:
(1) Principle I — a fidelity audit comparing the built homepage against TechGrit Homepage.dc.html
found six mismatches (font sizes, letter-spacing, blur, hover-lift distance, gradient angle), all
tracing back to one cause: globals.css's @theme inline block only registered a token into
Tailwind's utility system when a component happened to need it, so a token that existed in
tokens.css but was never registered left its matching bare utility class (text-sm, tracking-
widest, blur-md) silently resolving to Tailwind's own shipped default instead. Added two bullets:
every tokens.css value Tailwind can represent as a utility scale MUST have a matching @theme
inline entry (checkable and enforceable, not just conventional); and headings may only override
font-size/line-height via arbitrary values, never a keyword utility that would silently clobber
the base tag rule's already-correct font-weight/letter-spacing/color.
(2) Principle III — renamed "Centralized, Non-Duplicated Component Library" and reframed: the
vanilla globals.css classes (.btn/.card/.badge/.field/...) are not a legacy default that
components/ui/ is excepted from — both are legitimate, still-actively-consumed conventions (the
vanilla classes remain in real use on About/Contact and MUST NOT be deleted), and a new explicit
rule requires reusing whichever convention's existing shared primitive already fits, rather than
reimplementing one per page.
(3) Additional Constraints — reverted the components/home/ + components/<route>/ convention
this file previously recorded, replacing it with the convention actually used across the app:
components/ (layout/, ui/) holds only genuinely cross-route UI; route-local sections/data stay
colocated inside app/ via Next.js's `_`-prefixed private folders (app/<route>/_components/ for
named routes, app/_home-components/ for the root route, since app/home/ would create a real
/home URL instead of keeping the homepage at /).
No principle was removed or reversed by any of the three — all three add or correct enforceable
detail on existing principles, hence one MINOR bump.
TEMPLATE UPDATES: none required.
DEFERRED ITEMS: TODO(RATIFICATION_DATE) still unresolved, carried over unchanged.
-->

<!--
CONSTITUTION UPDATE REPORT (previous amendment, kept for history)
Generated: 2026-07-14 (v1.3.0) — workflow amendment integrating the `frontend-design` skill
into spec-driven development.

VERSION CHANGE: 1.2.0 → 1.3.0
Bump Type: MINOR
Rationale: Added Principle VI ("UI Craft via frontend-design Skill") requiring the vendored
`.claude/skills/frontend-design/SKILL.md` skill to be invoked during /speckit.specify,
/speckit.plan, and /speckit.implement whenever a feature is detected as UI work (frontend
tech stack in `plan.md` Technical Context OR UI keywords in `spec.md`). No prior principle
was reversed — this is additive workflow guidance, hence MINOR.
TEMPLATE UPDATES: `plan-template.md` gains a "UI Design Approach" section; `tasks-template.md`
documents the `[UI]` label convention.
COMMAND UPDATES: `speckit.specify.md`, `speckit.plan.md`, `speckit.tasks.md`, and
`speckit.implement.md` gain UI-detection + skill-invocation steps.
DEFERRED ITEMS: TODO(RATIFICATION_DATE) still unresolved, carried over unchanged.
-->

<!--
CONSTITUTION UPDATE REPORT (previous amendment, kept for history)
Generated: 2026-07-13 (v1.2.0) — implementation-triggered amendment from TMS-63

VERSION CHANGE: 1.1.0 → 1.2.0
Bump Type: MINOR
Rationale: Implementing TMS-63 (global Header/Footer) put real code into the root-level
`components/` directory for the first time, exactly the scenario "Additional Constraints"
said must be "introduced deliberately... and amend this constitution" rather than left as
silent drift. Updated that section to record `components/layout/` as the shared-UI location,
its contents, and that route-local code still belongs in `app/`. No principle was reversed —
additive/clarifying, hence MINOR.
TEMPLATE UPDATES: none required — plan/spec/tasks templates remain generic.
DEFERRED ITEMS: TODO(RATIFICATION_DATE) still unresolved, carried over unchanged.
-->

<!--
CONSTITUTION UPDATE REPORT (previous amendment, kept for history)
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
- **Complete `@theme inline` mapping (2026-07-15)**: every `tokens.css` value that Tailwind can
  represent as a utility scale (color, font-size, letter-spacing, radius, shadow, blur) MUST have
  a matching entry in `globals.css`'s `@theme inline` block. A token consumed only by a bare
  Tailwind utility class with no such mapping (e.g. `text-sm`, `tracking-widest`, `blur-md`) is a
  Principle I violation — the class doesn't error, it silently falls back to Tailwind's own
  shipped default instead of the token, which is exactly as wrong as hardcoding the wrong value
  directly. The fix is always to add the mapping, never to hardcode. Exception: tokens intended
  only for the base heading tag rules (see the next bullet) are not required to be mapped as
  utilities.
- **Heading styling**: `h1`–`h6` get font-family, font-weight, color, and letter-spacing
  automatically from the base tag rules in `globals.css`'s `@layer base` — no classes required. A
  component MAY override font-size/line-height for a specific heading instance (reference files
  frequently give individual headings their own size), but only via an arbitrary value
  (`text-[46px]`) — never a keyword utility (`text-4xl`, `tracking-tight`, `font-bold`) that would
  silently override a different, already-correct base property.

**Rationale**: `tokens.css` states this rule verbatim in its own header comment ("DO NOT
override these in component files"), and every sampled `raw-files/*.dc.html` reference file uses
the identical color/radius/spacing values that already exist as tokens. The `@theme inline`
mapping and heading-styling bullets were added after a fidelity audit (TMS-62) found the built
homepage drifting from the reference on font sizes, letter-spacing, and blur — every instance
traced back to a token that existed in `tokens.css` but was never registered into Tailwind's
theme, so the matching utility class silently used Tailwind's own default instead.

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

### III. Centralized, Non-Duplicated Component Library

A reusable visual primitive is built **once** and reused everywhere it's needed — never
re-implemented per page or per section. This project currently has two legitimate homes for a
shared primitive, and which one applies depends on when the consuming page was built:

- **Legacy vanilla classes in `app/globals.css`** — `.btn` (`.btn-primary`, `.btn-ghost`,
  `.btn-outline`, `.btn-sm`, `.btn-lg`, `.btn-shine`), `.card` (`.card-solid`, `.card-image`),
  `.glass-card`, `.field`, `.eyebrow`, `.badge` (`.badge-orange`, `.badge-glass`, `.badge-blue`,
  `.badge-teal`), `.text-gradient` / `.text-gradient-flow`, `.divider`, `.status-dot`
  (`.status-live`, `.status-orange`), and the `.container` / `.section` family. These are still
  actively consumed by existing pages (e.g. About, Contact) — they are **not deprecated and MUST
  NOT be deleted or treated as dead code.**
- **Tailwind-first components in `components/ui/`** (`Button.tsx`, `Badge.tsx`, `FormField.tsx`,
  `MediaSlot.tsx`, `icons.tsx`) — styled with Tailwind utility classes composed per-component,
  sourced from `tokens.css` through `globals.css`'s `@theme inline` mapping (Principle I), not by
  applying the vanilla classes above. This is the standard for new work going forward.

**The non-negotiable rule, regardless of which convention a given page uses**: if a page or
section needs a button/card/badge/form-field/icon (or any other visual pattern) that an existing
shared primitive already covers — vanilla class or `components/ui/` component — it MUST reuse
that primitive. A new one-off button/card implementation is only justified when no existing
primitive (in either convention) actually fits; it is never justified by "this page happens to use
the other convention." Do not port a page wholesale from one convention to the other without a
specific reason to do so — the two are allowed to coexist page-by-page; what's not allowed is
duplicating a primitive that already exists in either one.

All motion MUST come from the existing `tg*`-prefixed keyframes (`tgrise`, `tgfloat`, `tgpulse`,
`tgshine`, `tgflow`, `tgreveal`, `tgblink`, `tgm1`–`tgm3`, `tgconic`, `tgdash`, `tgmarquee`,
`tgbounce`, `tgshimmer`, `tgnudgex`, `tgkenburns`, `tgwaveflow`, `tgPhaseIn`, `tgheflo`) — new
animations follow the same `tg` prefix.

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
files, not a sample — every one matches. `components/ui/` was added (TMS-62) once a second,
Tailwind-first convention was deliberately chosen for new work — evidence check (2026-07-15)
found the vanilla classes still have real, current consumers (About, Contact) alongside
`components/ui/`'s Tailwind-first primitives, so both are recorded as legitimate, coexisting
conventions rather than one being framed as a deprecated exception to the other.

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

### VI. UI Craft via frontend-design Skill

All UI-facing work in this repository MUST invoke the vendored `frontend-design` skill at
`.claude/skills/frontend-design/SKILL.md` during spec-driven development. This is a workflow
principle — its purpose is to prevent generic "AI-slop" UI output and to keep design thinking
(typography, composition, motion, atmosphere) explicit rather than accidental.

**Detection — a feature is UI work if EITHER holds:**

- **Tech signal**: the feature's `plan.md` Technical Context lists a frontend framework as a
  Primary Dependency (Next.js, React, Vue, Svelte, Angular, SolidJS). This repository always
  matches this signal by default (Next.js 16 + React 19).
- **Content signal**: the feature's `spec.md` mentions any of: page, component, screen,
  layout, form, button, view, dashboard, modal, navigation, styling, hero, section, card.

If either signal is true, the feature is UI work and this principle applies. If neither holds
(a pure backend/API/config change with no user-visible surface), the principle does not fire
and the skill is skipped.

**Required invocation points:**

- **During `/speckit.specify`** — after user stories are drafted, invoke `frontend-design` to
  shape user-visible flows and interaction intent (not styling detail — that comes later).
- **During `/speckit.plan`** — before Phase 1 (design & contracts), invoke `frontend-design`
  to shape component architecture and record its guidance in `plan.md` under
  "UI Design Approach".
- **During `/speckit.implement`** — before executing any task marked `[UI]` in `tasks.md`,
  invoke `frontend-design` so the actual code writing benefits from the skill's aesthetic
  and craft guidance.

**Boundary with existing principles:** `frontend-design` shapes creative direction and craft.
Principles I–V remain the authority on tokens, breakpoints, component library, reference-file
translation, and brand system. Where the skill's generic guidance conflicts with a repo-specific
principle (e.g. skill says "pick any distinctive font" but Principle V mandates Manrope + Space
Grotesk), the repo principle wins. Use the skill for *how* to design, not to override *what*
this project has already decided.

**Evidence requirement:** the `plan.md` for any UI feature MUST contain a "UI Design Approach"
section recording the frontend-design invocation and its output. A missing section on a UI
feature is a constitution violation and blocks progress at `/speckit.plan`'s Constitution Check
gate.

**Rationale**: the team wants spec-driven UI work to consistently benefit from the skill's
design thinking without relying on any individual developer remembering to invoke it. Vendoring
the skill into `.claude/skills/frontend-design/` and wiring invocation into all four speckit
commands makes the rule survive across contributors and Claude sessions.

## Additional Constraints

This repository is **one** Next.js App Router application rooted at `app/` —
`app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `app/tokens.css`. Two kinds of UI location
exist, and the distinction is genuinely-shared-across-routes vs. route-local:

- **`components/` (top level)** holds only UI that's genuinely shared/cross-route:
  - `components/layout/` (TMS-63): `Header.tsx`, `Footer.tsx`, `nav-config.ts`, `footer-config.ts`.
  - `components/ui/` (TMS-62): generic, reusable primitives — `Button.tsx`, `Badge.tsx`,
    `FormField.tsx`, `MediaSlot.tsx` (image-or-"Coming soon" fallback), and `icons.tsx` — **the
    single consolidated SVG icon file for the whole app**; every icon used anywhere (header/footer,
    homepage, or any other page) is added to this one file, never a per-route copy.
- **Route-local sections/data stay colocated with the route, inside `app/`**, using Next.js's
  `_`-prefixed private-folder convention (excluded from routing regardless of name): a named route
  gets `app/<route>/_components/` (and, if needed, `app/<route>/_data/`) sitting next to that
  route's own `page.tsx` — e.g. `app/about/_components/`, `app/(marketing)/contact/_components/`.
  The root route has no folder segment of its own (it's `app/page.tsx` directly), so its private
  folder is a distinctly-named one directly under `app/` — `app/_home-components/` — never
  `app/home/...`, which would create a real `/home` URL segment instead of keeping the homepage at
  `/`.

Per Principle III, `components/ui/` and the vanilla `globals.css` classes are the only two
approved homes for a *shared* primitive; per-route `_components/`/`_data/` folders hold that
route's own sections, never a competing definition of something `components/ui/` or `globals.css`
already provides (e.g. a per-route `icons.tsx` duplicating `components/ui/icons.tsx` is not
allowed).

All cross-route imports resolve via the existing `@/*` → `./*` path alias in `tsconfig.json`;
route-local imports use relative paths within the route's own `_components/`/`_data/` folder.
`components/` is still not a place to pre-scaffold speculative structure — nothing moves there
until it's genuinely consumed by more than one route. There is still no `lib/` or `types/`
directory.

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

### Manual Specification Protocol (speckit.specify)
Because we track all work against TMS tickets (even when manually specifying features outside of the automated Jira integration), the default `001-` sequential naming convention is prohibited.

When a user invokes `/speckit.specify` or asks to start a new feature:
1. **Halt and Prompt:** The AI MUST immediately ask the user: *"What is the TMS ticket number for this feature?"* (Skip this if they already provided it in their initial prompt).
2. **Format Enforcement:** Ensure the ID uses the `TMS-<number>` format. If the user just says "72", assume `TMS-72`.
3. **Execute with Short-Name:** Pass the ticket ID to the underlying script using the `--short-name` flag.
   - Example execution: `bash .specify/scripts/bash/create-new-feature.sh --short-name TMS-72 "Feature description"`

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
  and no `lib/`/`types/` directory yet (as of TMS-62, `components/` itself is in active use —
  `layout/`, `ui/`, `home/`). Do not treat these as decisions to defend — they are simply the
  current, unfinished state, recorded here so future amendments can address them deliberately.

**Version**: 1.5.0 | **Ratified**: TODO(RATIFICATION_DATE) — no prior dated adoption record
exists; this discovery run is the first codification | **Last Amended**: 2026-07-22

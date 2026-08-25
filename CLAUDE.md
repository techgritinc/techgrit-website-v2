# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # start dev server (localhost:3000)
npm run build    # production build — forces --webpack, NOT the default Turbopack
npm run start    # run the production build locally
npm run lint     # ESLint 9 flat config (eslint-config-next core-web-vitals + typescript)
npm run prepare  # install Husky git hooks
```

There is no test framework in this repo (no Jest/Vitest/Playwright config, no `*.test.*` files) — don't assume test coverage exists, and don't invent a coverage target when reasoning about correctness.

`.husky/pre-commit` runs `npm run lint` then `npm run build` before every commit; both must stay green.

`next.config.ts` sets `trailingSlash: true` and `images.unoptimized: true`. It carries no `output` key: the site is server-rendered by a long-running `next start` process on the VM behind nginx. It was `output: "export"` while the site was a static bundle on GitHub Pages — see Deployment below.

## Architecture

This is **one** Next.js App Router app rooted at `app/` — there is no monorepo, no `apps/`, no `packages/`, despite what `README.md`'s "Repository layout" section describes (that section documents an aspirational future restructure that was never carried out; treat it as historical/planning content, not current fact, when reasoning about where things live).

**Styling is token-driven and this is strictly enforced** (`.specify/memory/constitution.md` Principle I): every color, spacing, radius, shadow, typography, opacity, and blur value is declared once in `app/tokens.css` as a `:root` custom property, then either consumed via `var(--token-name)` or exposed as a Tailwind utility through the `@theme inline` block in `app/globals.css`. Load order is fixed: `tokens.css` → `tailwindcss` → base/reset/component rules (stated in `globals.css`'s own header comment).

- A token that exists in `tokens.css` but has no matching `@theme inline` entry is a real bug, not a style nit — the bare utility class it should power (`text-sm`, `tracking-widest`, `blur-md`, ...) silently falls back to Tailwind's own shipped default instead of erroring. This exact class of bug caused a homepage fidelity audit (TMS-62) to drift from the design reference on font sizes, letter-spacing, and blur.
- Never hardcode a hex color, raw px/rem, or an `rgba()` literal that duplicates an existing token. If a design reference needs a value with no existing token, add it to `tokens.css` first (in its existing numbered section) and map it in `globals.css`, before using it in a component.
- `h1`–`h6` get font-family/weight/color/letter-spacing automatically from base tag rules in `globals.css`'s `@layer base`. A component may override font-size/line-height for one heading instance, but only via an arbitrary value (`text-[46px]`), never a keyword utility (`text-4xl`, `tracking-tight`) that would silently clobber the other already-correct base properties.
- Canonical breakpoints are `lg = 1140px` (desktop nav collapses to burger), `md = 960px` (grids to one column, H1 shrinks), `sm = 560px` (footer stacks). Reuse these via `sm:`/`md:`/`lg:` rather than inventing new pixel breakpoints. Sticky-nav scroll offset is handled once globally via `[id] { scroll-margin-top: var(--nav-height); }` — don't repeat per-section overrides.

**Two legitimate, coexisting homes for shared UI** — which applies depends on when the consuming page was built, not a strict rule about "old vs. new":
- Vanilla utility classes in `globals.css` (`.btn`, `.card`, `.glass-card`, `.field`, `.eyebrow`, `.badge`, `.text-gradient`, `.divider`, `.status-dot`, `.container`/`.section` families) — still actively used by About/Contact. Not dead code, not deprecated.
- Tailwind-first components in `components/ui/` (`Button.tsx`, `Badge.tsx`, `FormField.tsx`, `MediaSlot.tsx`, `AnimatedStat.tsx`, and `icons.tsx` — the single consolidated SVG icon file for the whole app, never a per-route copy).

Either way: reuse whatever primitive already covers the need. A one-off reimplementation is only justified when neither convention has a fit already — never because "this page uses the other convention." All motion comes from the existing `tg*`-prefixed keyframes in `globals.css` (`tgrise`, `tgfloat`, `tgpulse`, `tgshine`, `tgflow`, `tgreveal`, `tgblink`, `tgshimmer`, ...); new animations follow the same `tg` prefix.

**Component location follows a shared-vs-route-local split**, not a single flat `components/` tree:
- `components/layout/` — `Header.tsx`, `Footer.tsx`, `nav-config.ts`, `footer-config.ts`. One shared Header/Footer wired through the root layout; page markup never re-implements nav/footer.
- `components/ui/` — generic cross-route primitives (see above).
- Route-local sections/data stay colocated inside `app/` using Next.js's `_`-prefixed private-folder convention (excluded from routing): `app/<route>/_components/` (e.g. `app/about/_components/`, `app/(marketing)/contact/_components/`). The root route has no folder segment of its own, so its private folder is `app/_home-components/` — never `app/home/...`, which would create a real `/home` URL.
- `components/` is not for pre-scaffolding speculative structure — nothing moves there until genuinely consumed by more than one route. Cross-route imports use the `@/*` → `./*` path alias from `tsconfig.json`; route-local code uses relative imports within its own `_components/`.

**Design references are visual truth, not copy-paste source.** `raw-files/**/*.dc.html` are design-preview-tool exports (not production code) used as the authoritative layout/spacing/copy reference. When translating one into a component: the `<x-dc>` wrapper, `<helmet>`, and `class Component extends DCLogic {...}` script blocks are preview-tool artifacts (reimplement as normal React state, not lifecycle methods on a `DCLogic` subclass); inline `style="color:#..."` values map to tokens per the rule above; `{{ expr }}` bindings and `<sc-for>`/`<sc-if>` tags are the tool's own templating (map to `.map()` / conditional render, don't copy the tag); footer legal links pointing at the placeholder `https://www.techgrit.com` need real `/privacy`/`/terms` routes in production.

Brand system: dark surface by default (`--color-ink` family), white-on-dark text via a `--color-text-*` opacity ladder, single accent is the orange→amber gradient (`--gradient-brand`) — never as a full-surface fill, only CTAs/borders/text accents. Manrope (body) + Space Grotesk (display), loaded via `next/font` in `app/layout.tsx`. Product is consistently named **OrbitAI™**. A light-surface token set (`--color-surface-*`) exists solely for one v1-light reference variant — don't blend it into the dark tokens as a second theme.

**UI work requires the vendored `frontend-design` skill** (`.claude/skills/frontend-design/SKILL.md`) — Constitution Principle VI, wired into every `/speckit.*` command. It shapes craft/creative direction; where it conflicts with the repo-specific rules above (tokens, breakpoints, component library, brand system), the repo rules win.

### Spec-driven workflow (spec-kit)

Feature work goes through `/speckit.*` commands (`.specify/commands/`, mirrored as Copilot prompts in `.github/prompts/`): `speckit.jira` → `speckit.specify` → `speckit.clarify` → `speckit.plan` → `speckit.tasks` → `speckit.implement`, with `speckit.analyze`/`speckit.checklist`/`speckit.constitution`/`speckit.commit`/`speckit.taskstoissues` as utilities. Generated artifacts land in `specs/<feature-or-ticket-key>/` (`spec.md`, `plan.md`, `tasks.md`, `research.md`, `data-model.md`, `quickstart.md`). `.specify/memory/constitution.md` is the authoritative, versioned source for all the architecture rules above — consult it directly for full rationale/history rather than treating this file as a paraphrase substitute.

## Deployment

The site runs on an AWS EC2 VM (shared with the Strapi CMS and two other apps) under PM2 as `techgrit-site`, port 3002 bound to loopback, behind nginx. `ecosystem.config.js` is the process definition: its `name` must match `APP_NAME` in the workflow, and its `PORT` must match the nginx `proxy_pass`.

Every route renders dynamically (`ƒ` in the build output) because `cms/api/fetcher.ts` fetches with `cache: "no-store"`. The site therefore needs `CMS_API_URL`, which the deploy writes to `.env` from the `dev` Environment on each run. Nothing is prerendered, so the CI build gate does not need the CMS reachable — `fetchCms` returns `null` on any failure.

Two workflows exist during the GitHub Pages -> VM migration; only one may be armed:

- `deploy-pages.yml` — the incumbent, fires on push to `dev`, serves `beta.techgrit.com` (see `CNAME`). It can no longer rebuild, since static export requires the `output: "export"` that `next.config.ts` has dropped. Pages keeps serving its last successful deployment, which is the rollback target until cutover completes.
- `deploy-site.yml` — the replacement, `workflow_dispatch` only until the DNS flip. Builds on the runner as a gate, then over SSH does `git reset --hard` -> `npm ci` -> `npm run build` -> `pm2 restart`.

Two things that are easy to get wrong:

- **Deploy as root, never `ubuntu`.** Two PM2 daemons run here: root owns `techgrit-site` and `techgrit-cms`, `ubuntu` owns `call-summary` and `kaffeax-sales`. `pm2 list` shows a different set depending on who you are. The wrong user starts a second copy in the other daemon, competing for port 3002, and it reads as a crash rather than a duplicate.
- **nginx `server_name` must be a hostname, never a bare IP.** A resize changes the public IP and silently breaks any block pinned to the old one — how the CMS came to serve 404s from the default server block.

`npm run build` on the VM rewrites `.next/` in place under the running server, so a deploy briefly risks 404s on hashed chunks. Accepted for a low-traffic marketing site; revisit by shipping a prebuilt artifact if traffic grows.

## Active Technologies
- TypeScript 5 (strict mode, per `tsconfig.json`) + Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.ts`)
- No test framework configured
- Form submission (contact page) is a client-side visual state transition only — no backend persistence
- Navigation/footer link content and all current homepage content (stats, phases, testimonials, case studies, industries) are static configuration, not persisted data

## Recent Changes
- 001-v2-2-ui-enhancements (Phase 1 — Shared Foundation only): plan scoped to exactly 4 changes, no consumer migration — `components/ui/Button.tsx`'s `ghost` variant gets the reference's white-gradient/blur(12px)/lift-on-hover treatment (new tokens in `tokens.css`), `reusable-components/section-eyebrow.tsx` gains an optional `showAccent` prop, a new `components/ui/FilterBar.tsx` (dark/sticky/labeled shell, not yet wired to any page), and `app/_home-components/LifeGallery.tsx` gains an "Inside TechGrit" `Badge` (careers) + two action buttons (home). `globals.css`'s `.btn-ghost`/`.eyebrow` and every other page-specific v2.2 requirement are explicitly deferred.
- TMS-85-tokens-v2-migration: migrated `app/tokens.css`/`app/globals.css` to the v2 design-export values (Principle V amended 1.6.0 → 2.0.0: default surface `#0A1822` → `#000000`, Manrope+Space Grotesk → single Calibri/Carlito stack — see `.specify/memory/constitution.md`'s latest amendment report for full rationale); added `.prettierrc`/`.prettierignore`, with `app/tokens.css`/`app/globals.css` themselves permanently exempted from `--check` (their hand-aligned colon/value-column style isn't preserved by Prettier's CSS printer — reformatting would be ~100% whitespace churn). Two known, deliberately-deferred follow-ups from this migration:
  - **Accessibility debt** (sub-AA contrast against the 4.5:1 threshold, not fixed in this PR): `--color-text-ghost` 3.95:1 (highest priority — drives small uppercase label text), `--color-text-45` 4.42:1, `--color-text-40` ~3.7:1, `--color-text-32` ~2.8:1, `--color-text-placeholder` ~2.6:1.
  - **Hero-token consolidation (declined)**: the six page-named hero font-size tokens could collapse to two role-named tokens (landing/index 62px, detail/utility 54px) — every current value is within the agreed 4px tolerance of one of those two. Raised during clarification and explicitly declined; recorded here so the six-token count is a known, intentional choice rather than an oversight.
- TMS-69: building the dynamic Blog page (hero, featured-story panel, topic-filterable post grid, subscribe panel) — extends `GlassCard`/`Badge` with new variants/tone instead of forking components, adds new tokens to `tokens.css`/`globals.css`
- TMS-62: built the dynamic homepage (ten sections) and added `components/ui/` as a second, Tailwind-first shared-primitive convention alongside the vanilla `globals.css` classes
- TMS-63: added global `Header`/`Footer` in `components/layout/`
- 001-contact-us-page: added the Contact page

## Active Technologies
- TypeScript 5 (strict mode, per `tsconfig.json`) + Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (TMS-68)
- N/A — case-study content is a static local TypeScript content module, not persisted data (TMS-68)

## Recent Changes
- TMS-74: building the static Careers page (hero collage, stats strip, benefit-card grid, filterable Open Roles, Life at TechGrit reuse, closing CTA) — adds a new `components/ui/Modal.tsx` primitive, extends `FormField`/`LifeGallery` via backward-compatible props, replaces `mailto:` Apply/resume links with a shared application dialog
- TMS-68: Added TypeScript 5 (strict mode, per `tsconfig.json`) + Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4

## Active Technologies
- TypeScript 5 (strict mode, per `tsconfig.json`) + Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (TMS-67)
- N/A — construction-page content remains a static local TypeScript content module (TMS-67)

## Recent Changes
- TMS-67: Re-planned the already-built Construction page (`app/construction/`) for pixel fidelity against `TechGrit Construction.dc.html` — rebuilding the lifecycle diagram's literal node geometry, correcting 9 mismatched icons, opting the page out of the shared `reusable-components/ambient-orbs.tsx` in favor of its own reference-exact orb set, and adding one new token (`--color-overlay-amber-soft`)

## Active Technologies
- TypeScript 5 (strict mode, per `tsconfig.json`) + Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (TMS-73)
- N/A — webinar-page content is a static local TypeScript content module, not persisted data (TMS-73)

## Recent Changes
- TMS-73: planning the Webinar Series page (`app/webinar/`) — hero with a 9-cell photo/decorative collage, a Sessions grid (one upcoming panel + released-session cards), and a Subscribe panel; extends `Badge`/`GlassCard` with new tone/variants instead of forking components, adds 20 new tokens to `tokens.css`/`globals.css`, and both "Register Now"/"Watch Now" are real `<button>` elements per an explicit clarification overriding the reference's own anchor-styled-as-button markup

## Active Technologies
- TypeScript 5 (strict mode, per `tsconfig.json`) + Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (TMS-86)
- N/A — AI-Accelerated Modernization page content is a static local TypeScript content module, no CMS/API integration this phase (TMS-86)

## Recent Changes
- TMS-86: planning the AI-Accelerated Modernization page at the new route `/what-we-do/ai-modernization` (`app/what-we-do/ai-modernization/`) — the first page under a "What We Do" route segment; adds 4 new shared `components/ui/` primitives (`ProcessSteps`, `IconTile`, `Faq`, and `Outcome` — the last built ahead of need per an explicit clarification, unused on this page), one new `GlassCard` variant for the bulleted capability card, one new `components/ui/ambient-orbs.tsx` pathname branch matching the reference's 4-orb geometry, and a 1-line `cms/api/footer.ts` href edit repointing "AI-Accelerated Modernization" from `/services#svc-modernization` to the new route

## Active Technologies
- TypeScript 5 (strict mode, per `tsconfig.json`) + Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (TMS-86-software-product-engineering)
- N/A — Software Product Engineering page content is a static local TypeScript content module, no CMS/API integration this phase (TMS-86-software-product-engineering)

## Recent Changes
- TMS-86-software-product-engineering: planning the Software Product Engineering page at the new route `/what-we-do/software-product-engineering` (`app/what-we-do/software-product-engineering/`) — the second page in the "What We Do" family, spec directory disambiguated from the pre-existing `specs/TMS-86/` (AI-Accelerated Modernization). Introduces **zero** new shared `components/ui/` primitives or tokens — reuses `Hero`, `ContentBlock`, `GlassCard` (`serviceCapability` variant), `ProcessSteps`, `Faq`, `IconTile`, `final-cta`, and `MediaSlot` unmodified, following the sibling AI-Modernization page's exact file/folder architecture. Hero right-side card uses the `public/samples/svc-eng.png` image (unused elsewhere in the app) in place of the reference's four stat-tile callouts, matching the sibling page's own image-replacement treatment. Two 1-line nav-config edits repoint "Software Product Engineering" from `/services#svc-product` to the new route: `cms/api/footer.ts` and, unlike the sibling ticket's own conclusion, `cms/api/header.ts`'s `toMegaGroup()` special-case ternary too (confirmed necessary by direct inspection — that ternary already exists and live-overrides one CMS-supplied link).

## Active Technologies
- TypeScript 5 (strict mode, per `tsconfig.json`) + Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (TMS-86-data-and-ai-engineering)
- N/A — Data & AI Engineering page content is a static local TypeScript content module, no CMS/API integration this phase, by clarification (TMS-86-data-and-ai-engineering)

## Recent Changes
- TMS-86-data-and-ai-engineering: planning the Data & AI Engineering page at the new route `/what-we-do/data-ai-engineering` (`app/what-we-do/data-ai-engineering/`) — the third page in the "What We Do" family, spec directory disambiguated from `specs/TMS-86/` (AI-Accelerated Modernization) and `specs/TMS-86-software-product-engineering/`. Both sibling pages have since been upgraded to a live CMS integration in their own separate, later tickets (confirmed by direct inspection of their current `page.tsx`); this ticket deliberately targets their *original* static-content shape instead, confirmed via `/speckit.clarify`. Introduces **zero** new shared `components/ui/` primitives, tokens, or icons — reuses `Hero`, `ContentBlock`, `GlassCard` (`serviceCapability` variant), `ProcessSteps`, `Faq`, `IconTile`, `final-cta`, and `MediaSlot` unmodified; all 15 icon slots this page needs (6 "why" tiles, 3 industries, 6 related-service links) resolve to existing `components/ui/icons.tsx` entries, including reusing `EradicateDebtIcon` for the "Software Product Engineering" related-service link — the exact substitute the AI-Modernization sibling's own related-services list already established for that same icon gap. Hero right-side card uses the `public/samples/svc-qa.png` image (per clarification — no unused asset thematically fits "Data & AI Engineering") in place of the reference's four stat-tile callouts, keeping the "AI IMPACT™ · OrbitAI™ · PRISM™ frameworks" caption beneath it (unlike the Software Product Engineering sibling, which dropped its equivalent caption). One deliberate content correction: the reference's "Capabilities" heading ("Five capabilities...") is corrected to "Six capabilities..." to match the six cards that actually render, per an explicit clarification answer. Two 1-line nav-config edits repoint "Data & AI Engineering" from `/services#svc-data-ai` to the new route: `cms/api/footer.ts` and `cms/api/header.ts`'s `toMegaGroup()` special-case ternary (extending the existing two-entry chain to a third).

## Active Technologies
- TypeScript 5 (strict mode, per `tsconfig.json`) + Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (TMS-88)
- N/A — Orbit AI Ecosystem page content is a static local TypeScript content module; a live CMS page exists for this feature's slug but is deliberately not read from, per explicit requester decision (TMS-88)

## Recent Changes
- TMS-88: planning the Orbit AI Ecosystem page at the new route `/how-we-work/orbit-ai` (`app/how-we-work/orbit-ai/`) — the first page under a "How We Work" route segment, built static (mirroring `app/construction/`'s pattern) rather than CMS-backed despite a live, fully-populated CMS page existing at `/api/pages/by-slug/orbit-ai-ecosystem` for this exact feature; introduces zero new shared components (all card shapes map onto `Hero`/`ContentBlock`/`GlassCard`/`IconTile`/`ProcessSteps`/`Outcome`/`FinalCta`), one backward-compatible prop extension (`ContentBlock`'s `chips`/`chipsLabel` become optional), one new `components/ui/ambient-orbs.tsx` pathname branch, and a 1-line `cms/api/footer.ts` href edit repointing "Orbit AI Framework" from `/frameworks#orbit-ai` to the new route

## Active Technologies
- TypeScript 5 (strict mode, per `tsconfig.json`) + Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (005-discovery-sprints / TMS-88-discovery-sprints)
- N/A — Discovery Sprints page content is a static local TypeScript content module, no CMS/API integration (005-discovery-sprints)

## Recent Changes
- 005-discovery-sprints: planning the Discovery Sprints page at the new route `/how-we-work/discovery-sprints` (`app/how-we-work/discovery-sprints/`), following `app/what-we-do/ai-modernization/`'s static (non-CMS) `page.tsx` + `_data/` + `_components/` pattern; introduces zero new shared components (every section maps onto `Hero`/`ContentBlock`/`GlassCard`/`Outcome`/`ProcessSteps`/`IconTile`/`Faq`/`FinalCta`), one backward-compatible prop addition (`ProcessSteps` gains an optional `columns` prop, default `5`, this page passes `4`), reuses the existing `/how-we-work/` `ambient-orbs.tsx` branch as-is (no new geometry needed — reference orb values already match), excludes the reference's "Related frameworks & services" section per explicit scope, replaces the reference's hero stat panel with a `Hero`/`MediaSlot` image per Clarification Q1, and a 1-line `cms/api/footer.ts` href edit repointing "Discovery Sprints" from `/frameworks#discovery` to the new route

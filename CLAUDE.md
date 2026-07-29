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

`next.config.ts` is the stock empty scaffold — no custom Next.js config yet.

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

## Active Technologies
- TypeScript 5 (strict mode, per `tsconfig.json`) + Next.js 16.2.10 (App Router), React 19.2.4, Tailwind CSS v4 (CSS-first `@theme`, no `tailwind.config.ts`)
- No test framework configured
- Form submission (contact page) is a client-side visual state transition only — no backend persistence
- Navigation/footer link content and all current homepage content (stats, phases, testimonials, case studies, industries) are static configuration, not persisted data

## Recent Changes
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

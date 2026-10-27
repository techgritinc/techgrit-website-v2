# Research: Orbit AI Ecosystem Page (How We Work)

## 1. Route & folder structure

**Decision**: `app/how-we-work/orbit-ai-ecosystem/page.tsx` → `/how-we-work/orbit-ai-ecosystem`, the first page under a new "How We Work" route segment.
**Rationale**: Spec FR-001 and the requester's ticket both name "How We Work" as the parent segment, mirroring `app/what-we-do/ai-modernization/` one level up from the route this feature's sibling pattern occupies.
**Alternatives considered**: `app/frameworks/orbit-ai` (matches the *current* placeholder footer href `/frameworks#orbit-ai`) — rejected because the spec and ticket both explicitly say "How We Work" section, and the footer link is the thing being repointed *to* the new route, not a naming source.

## 2. Content architecture: static, not CMS-backed

**Decision**: Static local content module (`_data/orbit-ai-content.ts` + `_data/types.ts`), a synchronous `page.tsx` exporting `metadata` directly — the `app/construction/` pattern, not `app/what-we-do/ai-modernization/`'s current pattern.
**Rationale**: A live, fully-populated CMS page was discovered at `/api/pages/by-slug/orbit-ai-ecosystem` during planning (same Strapi backend `ai-modernization` reads from via `cms/api/what-we-do/ai-modernization.ts`). Its real content differs materially from this spec's content in several sections (different "One Integrated Path" structure, different "Built for Real-World Engineering" layout, different "From Understanding to Working Software" steps, different closing-CTA copy and button count). Presented with this discovery, the requester explicitly chose to keep the spec's own (partly reference-derived, partly requester-supplied) content and build the page static, not wired to that CMS endpoint.
**Alternatives considered**: Wiring to the live CMS endpoint (rejected — explicit requester decision, see spec.md Assumptions "CMS discovered, deliberately unused"); a hybrid (CMS for some sections, static for others) — rejected as needless complexity for a single page with no partial-CMS precedent elsewhere in the codebase.
**Forward note**: If a future ticket decides to switch this page to CMS-backed content (the same trajectory `ai-modernization` took), `cms/api/what-we-do/ai-modernization.ts` is the concrete template to follow, and the endpoint (`/api/pages/by-slug/orbit-ai-ecosystem`) already exists — no rediscovery needed.

## 3. Card/tile component reuse vs. new components

**Decision**: Every card/tile shape on this page maps onto an existing primitive; zero new shared components are introduced.

| Section | Card shape (icon position) | Component reused |
|---|---|---|
| How OrbitAI Works (5 cards) | category label + title + lede + bullet list, no icon | `GlassCard` `serviceCapability` variant (same variant `ai-modernization`'s capability grid already uses) |
| One Integrated Path (lifecycle) | numbered step, no icon | `ProcessSteps` (5 steps) |
| One Integrated Path (extra card) | label + description, no icon, full-width | `Outcome` |
| Built for Real-World Engineering (6 tiles) | icon-left, horizontal | `IconTile` (`size="default"`) |
| Built for Real-World Engineering (extra card) | label + description, no icon, full-width | `Outcome` |
| What OrbitAI Helps You Achieve (6 cards) | title + description, no icon | `GlassCard` `reimagineWhy` variant, rendering only `GlassCardTitle`/`GlassCardDescription` (omit `GlassCardIcon`) |
| From Understanding to Working Software (4 cards) | icon-left, horizontal | `IconTile` |
| Who we help (4 cards) | icon-above-text, vertical | `GlassCard` `industry` variant (same variant `ai-modernization`'s industries grid uses) |

**Rationale**: `GlassCard`'s variant system, `IconTile`'s icon-left shape, `ProcessSteps`' numbered strip, and `Outcome`'s minimal heading+description block were all built during TMS-86 specifically to be reused by later "How We Work"/"What We Do" pages with the same card shapes — this page's shapes are a subset of shapes already covered, not a new one.
**Alternatives considered**: A new `components/ui/StatementCard.tsx` for the two "extra" full-width cards — rejected; `Outcome` already is exactly that shape (heading + description) and was built ahead of need for this exact situation (see TMS-86 plan.md Complexity Tracking).

## 4. `ContentBlock` prop extension

**Decision**: Make `chipsLabel`/`chips` optional on `components/ui/ContentBlock.tsx`. When both are omitted, render a single centered column (eyebrow, title, description) instead of the two-column eyebrow+chips layout.
**Rationale**: FR-004 requires "From AI opportunity to business impact" to render with no right-side chip list at all — not an empty chip list, not a hidden column, but a genuinely centered single-column block. The existing component always renders both columns unconditionally. This is the smallest possible change: a conditional render branch gated on whether `chips` is present, with no change to any existing call site's behavior (the one current consumer, `what-we-do/ai-modernization`'s intro section, always supplies chips today).
**Alternatives considered**: A new `components/ui/ContentBlockCentered.tsx` — rejected as an unnecessary duplicate of an already-generic component for what is a one-line conditional; a page-local reimplementation bypassing `ContentBlock` entirely — rejected per Principle III (reuse the existing primitive, extend rather than fork).

## 5. Hero image asset

**Decision**: `public/samples/dm-copilot.png` — existing, currently-unused asset (per Clarification Q5).
**Rationale**: Chosen for its "AI-assisted engineering" semantic fit and because it's not already in use elsewhere on the site (unlike `dm-tech-debt.png`, used by `ai-modernization`'s hero). Confirmed final by the requester before the CMS discovery; the CMS's own hero image (`dm-scalability.png`) is a different asset but is not used per the requester's decision to ignore CMS content.
**Alternatives considered**: `dm-scalability.png` (the CMS's actual asset) — not used, since this page is deliberately not CMS-sourced.

## 6. Nav/footer repointing (FR-020)

**Decision**: Update `cms/api/footer.ts`'s "How We Work → Orbit AI Framework" link `href` from `/frameworks#orbit-ai` to `/how-we-work/orbit-ai-ecosystem`.
**Rationale**: Mirrors the exact, minimal precedent set by `TMS-86`'s FR-011 (a one-line footer href edit, no header change needed since the header's CMS fallback data carries no per-item nav entries to repoint).
**Alternatives considered**: Leaving the footer link pointing at the old anchor — rejected; the spec explicitly calls this out as in-scope (FR-020), and leaving it would mean the site's only existing "Orbit AI" entry point doesn't reach the new page.

## 7. Ambient background orbs

**Decision**: Add a new `/how-we-work/` branch to `components/ui/ambient-orbs.tsx`, matching the reference's own 4-orb geometry (top-right, mid-left, mid-right, bottom-center; opacities 0.12/0.02/0.10/0.11) at lines 140-145 of `TechGrit Orbit AI.dc.html`.
**Rationale**: Every other full-page route (`/careers`, `/about`, `/services`, `/what-we-do/`, `/webinar/`, `/contact`, `/`) already has its own reference-matched branch in this file; this page's reference specifies its own distinct opacities that don't exactly match any existing branch, so falling through to the generic 3-orb default would be a visible fidelity miss (Principle I/II).
**Alternatives considered**: Reusing the `/what-we-do/` branch's geometry (visually close) — rejected; its second orb is blue, this reference's is a near-transparent amber, and Principle I disallows approximating an exact value the reference specifies.

## 8. Icon reuse audit

**Decision**: No new SVGs added to `components/ui/icons.tsx`. Existing exports cover every icon shape this page's IconTile/GlassCard-industry cards need:

| Reference icon (shape) | Existing export used |
|---|---|
| Clock/circle (One Connected Approach-style) | `ClockIcon` |
| Shield (AI-Assisted, Human-Validated / Regulated industries) | `ShieldIcon` / `ShieldCheckIcon` |
| Network/nodes (Built for Brownfield) | `NetworkNodeIcon` |
| Compass/heart-target (Flexible Entry Points) | `HeartIcon` |
| Mountain/growth (Designed for Continuous Value) | `TrendingUpIcon` |
| Checkmark-in-circle (achieve/understanding steps) | `CheckCircleIcon` |
| Award/badge (Proven, standards) | `AwardIcon` |
| Magnifier (Understand what you already have) | `SearchIcon` |
| Layered stack (roadmap, platform) | `LayersIcon` |

**Rationale**: Constitution Principle III requires the single consolidated `icons.tsx` file, never a per-route icon; an audit against the reference's SVG shapes found a close-enough existing match for every icon this page needs, so no additions are needed at all — the strongest form of reuse.
**Alternatives considered**: N/A — audit found no gap.

## 9. Testing approach

**Decision**: No automated test framework exists in this repo (Constitution "Development Workflow"). Verification is `npm run lint` + `npm run build` (Husky pre-commit gate) plus manual browser-preview comparison against the reference `.dc.html` at desktop/laptop/tablet/mobile widths.
**Rationale**: Matches this repo's established, documented testing posture for every prior page-build ticket (TMS-67, TMS-73, TMS-74, TMS-86).
**Alternatives considered**: N/A — introducing a test framework is out of scope for a single-page feature.

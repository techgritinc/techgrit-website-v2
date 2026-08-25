# Phase 0 Research: Leadership & Advisory Page

**Feature**: TMS-65-leadership-advisory | **Date**: 2026-08-20

All Technical Context fields resolved — no NEEDS CLARIFICATION markers remain. This document records the decisions that needed investigation before Phase 1.

---

## 1. Token audit — which reference values already have tokens

**Decision**: Reuse existing tokens for everything except three values. Add exactly three new tokens, each with a matching `@theme inline` entry in `globals.css`.

**Rationale**: Principle I and FR-040 require reuse where a token already carries the value. A value-by-value audit of `app/tokens.css` against the reference's computed values found near-total coverage.

Already covered — reuse as-is:

| Reference value | Existing token |
|---|---|
| `rgba(232,119,34,0.10)` hero badge fill | `--color-overlay-orange-10` |
| `rgba(232,119,34,0.35)` hero badge border | `--color-border-orange-35` |
| `rgba(232,119,34,0.14)` tile icon holder fill | `--color-overlay-orange-14` |
| `rgba(232,119,34,0.40)` photo ring | `--color-hover-orange-border-40` |
| `rgba(232,119,34,0.50)` card/pill hover border | `--color-border-orange-medium` |
| `rgba(255,255,255,0.04)` card + pill fill | `--color-glass-4` |
| `rgba(255,255,255,0.03)` tile fill | `--color-glass-3` |
| `rgba(255,255,255,0.14)` pill border | `--color-border-14` |
| `#E87722` role label, tile glyph | `--color-orange` |
| radius 22px card / 18px tile / 11px icon / 30px pill / 40px badge | `--radius-3xl` / `--radius-xl` / `--radius-md` / `--radius-30` / `--radius-40` |
| 11px / 12px / 12.5px / 16.5px / 18px / 22px type | `--text-11` / `--text-12` / `--text-2xs` / `--text-md-lg` / `--text-18` / `--text-22` |
| `0.14em` / `0.16em` tracking | `--ls-hint` / `--ls-widest` |
| `-0.02em` name tracking | `--ls-normal` |
| `1.6` / `1.65` body leading | `--lh-relaxed` / existing body leading |

**New tokens required** (3):

| Token | Value | Why no existing token fits |
|---|---|---|
| `--color-orange-light` | `#fdba74` | Hero badge label colour. Nearest existing is `--color-amber-light` (`#F7B733`) — a visibly different hue, not a substitute |
| `--color-overlay-orange-08` | `rgba(232,119,34,0.08)` | LinkedIn pill hover fill. No 0.08 orange overlay exists |
| `--text-14` | `14px` | Leader biography and tile description. Nearest is `--text-14-5` (14.5px); `--text-sm` is 15px |

**Alternatives considered**:
- *Reuse `--text-14-5` for the 14px copy.* Rejected — a 0.5px difference across three long biographies shifts wrap points, and `tokens.css` already has ample precedent for value-specific size tokens.
- *Add a `--color-text-65` for the biography's `rgba(255,255,255,0.65)`.* **Rejected in favour of reusing `--color-text-66`** (0.66). A 1% opacity delta is imperceptible and a near-duplicate token is worse than the reuse. Recorded as a deliberate, sub-perceptual deviation from the reference.
- *Add per-job tracking tokens mirroring `--ls-blog-meta`/`--ls-life-cap`.* Rejected — FR-040 mandates reuse where the value exists; `--ls-hint` (0.14em) is reused rather than cloned a fifth time.

**Guard**: a token added to `tokens.css` without an `@theme inline` mapping in `globals.css` silently falls back to Tailwind's shipped default rather than erroring — the exact bug class that caused the TMS-62 fidelity drift. Task T007 pairs each addition with its mapping.

---

## 2. Breakpoint translation

**Decision**: Implement the reference's 900px media query as the canonical `tg-md` (960px).

**Rationale**: Principle II fixes the breakpoint contract at `lg = 1140px`, `md = 960px`, `sm = 560px`, and FR-046 requires the canonical scale over a newly invented pixel value. `app/globals.css` already defines `--breakpoint-tg-md: 960px`, so `max-tg-md:` is available directly.

**Consequence, stated plainly**: between 900px and 960px the implementation collapses to one column where the reference would still show the multi-column grid. This is a deliberate, principle-mandated 60px divergence, not a fidelity defect — it should not be logged as a bug against SC-002.

**Alternatives considered**: adding a `--breakpoint-tg-900`. Rejected — Principle II exists specifically to stop per-page breakpoint proliferation, and the footer-only 1080/640 exceptions were granted for a documented cross-page reason that does not apply here.

---

## 3. `/about` redirect mechanism

**Decision**: `redirects()` in `next.config.ts`, `permanent: true`.

**Rationale**: Every CMS fetch in this app uses `cache: "no-store"` (`cms/api/fetcher.ts`), so all routes are dynamically server-rendered and a Node server is serving traffic. `next.config.ts` already carries real config (`trailingSlash: true`, `images.unoptimized`), and a config-level redirect is handled before rendering — cheaper and more cacheable than a redirecting route segment.

With `trailingSlash: true`, the destination is written as `/about/our-story` and Next normalises the trailing slash.

**Alternatives considered**:
- *An `app/about/page.tsx` that calls `redirect()`.* Works, but costs a render pass and leaves a route file whose only job is to not exist.
- *Middleware.* Overkill for one static rewrite, and adds a matcher to maintain.

**Finding worth flagging (out of scope)**: `.github/workflows/deploy-pages.yml` uploads `out/` to GitHub Pages, but `npm run build` produces no `out/` directory because `next.config.ts` sets no `output: "export"` — and static export is incompatible with this app's `no-store` CMS fetches anyway. The Pages workflow appears to be stale from the pre-CMS era. **If that workflow is in fact still the production deploy path, the `next.config.ts` redirect will not work** and this decision must be revisited. Not changed here; raised for the team.

---

## 4. Making the "About" parent non-navigable

**Decision**: In `HeaderClient.tsx`, render the About group's trigger as a `<button type="button">` instead of a `<Link>`, selected by `group.href === ROUTES.about`. Every other group keeps its `<Link>`.

**Rationale**: A `<button>` is the honest element for a control that only opens a panel — it needs no `preventDefault()` across three input paths (the existing code already juggles `pointerType` and `Enter`/`Space` separately), it cannot be middle-clicked or "open in new tab"-ed into a dead URL, and it removes the About row from the tab order's link semantics while keeping it keyboard-operable. This satisfies FR-007 for mouse, touch and keyboard in one change rather than three.

**Active state (FR-009)**: the current check is `group.href === pathname`, which can never match now that `/about` renders nothing. Changed for this group to a prefix match on `/about`, so the parent highlights on both sub-pages.

**Alternatives considered**:
- *Keep the `<Link>` and `preventDefault()` on every activation path.* Rejected — leaves a real `href` that context-menu "open in new tab" would follow to a redirect, and keeps three separate input-handling branches in sync by hand.
- *Apply the behaviour to all mega-groups.* Rejected — out of scope per FR-010 and would change four other menus.
- *Drive it from a CMS flag.* Rejected for now — the CMS has no such field, and adding one is the team's follow-up.

---

## 5. Stale CMS nav href

**Decision**: Normalise at the data layer in `cms/api/header.ts` — when a nav sub-item's `href` is exactly `/about`, map it to `ROUTES.aboutOurStory` while building the mega-group.

**Rationale**: FR-008a requires the click to land on `/about/our-story` directly rather than bouncing through the redirect. Doing it in `toMegaGroup()` keeps `HeaderClient` free of content-fixing logic, applies to both desktop and mobile renderings from one place, and self-deletes: once the team corrects the CMS entry the mapping simply never matches. An exact-match test (not a prefix) means a future genuine `/about/...` value passes through untouched.

**Alternatives considered**:
- *Fix it in `HeaderClient`.* Rejected — would need duplicating across the desktop and mobile branches.
- *Rely on the FR-003 redirect alone.* Rejected by the user's explicit direction that the click must navigate to `/about/our-story` as-is.

---

## 6. Icon mapping

**Decision**: `LayoutDashboardIcon`, `SvcStartupsIcon`, `OrbitAiIcon`, `HeartIcon` for the four rationale tiles, in that order. `LinkedInIcon` for the profile pill. Zero new icons.

**Rationale**: Verified against `components/ui/icons.tsx` path data — `OrbitAiIcon` (circle + two rotated ellipses) and `HeartIcon` are byte-identical to the reference's glyphs; `SvcStartupsIcon` is a superset of the reference's two-path rocket; `LinkedInIcon` matches. Only the reference's desktop-monitor glyph has no equivalent, resolved by clarification to `LayoutDashboardIcon`.

**Alternatives considered**: adding a `MonitorIcon` to `icons.tsx`. Rejected — FR-033 forbids new icons.

---

## 7. Section component boundaries

**Decision**: Three route-local section components (`leadership-hero`, `leadership-profiles`, `leadership-why-it-matters`) plus the shared `FinalCta` composed directly in `page.tsx`; all Server Components.

**Rationale**: Matches how `app/webinar/` and `app/industries/construction/` are already organised, and FR-038 requires one component per section with `page.tsx` only composing. Nothing on this page holds state or handles events — the hover and reveal effects are CSS — so no `"use client"` boundary is needed anywhere, and the page ships zero additional client JS.

**Alternatives considered**: a single page-level component. Rejected by FR-038.

---

## 8. Profile card composition

**Decision**: `components/ui/ProfileCard.tsx` wraps `GlassCard` with a new `leaderProfile` variant, and renders the photo circle, role, name, bio and LinkedIn pill.

**Rationale**: `GlassCard`'s four variant records (`CARD_VARIANTS`, `ICON_VARIANTS`, `TITLE_VARIANTS`, `DESC_VARIANTS`) are each typed `Record<GlassCardVariant, string>`, so widening the union forces an entry in all four — TypeScript enforces completeness, which is why extending the variant is safer than forking. The card body is a flex column with the LinkedIn pill pushed to the bottom so the three pills align across a row of unequal-length biographies.

**Alternatives considered**: a standalone bordered `<div>`. Rejected — Principle III, and it would lose the `backdrop-blur` that makes the ambient orbs read through the card.

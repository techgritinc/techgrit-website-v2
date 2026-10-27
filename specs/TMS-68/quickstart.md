# Quickstart: Case Studies Listing & Detail Pages

Manual verification walkthrough — no automated test framework is configured in this repo
(research.md §13). Run `npm run dev` and check each scenario below at three widths: mobile
(~375–430px), tablet (~768–1024px), desktop (~1280px+).

## Setup

1. `npm run dev`
2. Navigate to `http://localhost:3000/case-studies`

## User Story 1 — Browse the list and find one worth reading (P1)

1. **Given** the list page loads, **confirm**: an intro hero (eyebrow, heading, supporting copy), one
   visually distinct featured case study, and a grid of the remaining 5 case studies each showing
   industry/category, a headline metric, a title, and a short description. *(FR-001–FR-003)*
2. **Click** the featured case study → **confirm** it navigates to that case study's own detail page
   (`/case-studies/<its-slug>`), not a generic/mismatched page. *(FR-004, SC-002)*
3. **Click** a grid card → **confirm** the same, for that card's own slug.
4. **Scroll to the bottom** of the list page → **confirm** a get-in-touch CTA banner is present.
   *(FR-010)*

## User Story 2 — Read a full case study (P1)

1. Open a case-study detail page directly (paste its URL, don't navigate via the list) → **confirm**
   it renders completely on its own: shared header, title, one-paragraph summary, published date,
   industry/category badge, shared footer. *(FR-005, Edge Case: direct URL)*
2. **Confirm** a metrics strip of 3–4 scannable numbers appears near the top. *(FR-006)*
3. **Scroll down** → **confirm** four clearly labeled, anchored sections in order: client background,
   the challenge (with pain-point cards), the architecture (with the 3-node flow diagram + integration
   chips), and the solution/outcome. *(FR-007)*
4. **Confirm** a team-composition panel (roles + headcounts) appears alongside the narrative, together
   with a "start a project" call-to-action. *(FR-008)*
5. **Scroll to the bottom** → **confirm** the same get-in-touch CTA banner as the list page.
   *(FR-010)*

## User Story 3 — Keep exploring after finishing a case study (P2)

1. On a detail page, **confirm** a "← All case studies" link is visible near the top. *(FR-009)*
2. **Click** it → **confirm** it lands back on `/case-studies`. *(SC-003)*
3. Scroll a detail page near the end of its main content → **confirm** a "more case studies" section
   with 3 other case studies is shown, and that **none of the 3 is the case study currently being
   viewed**. *(FR-009, Assumptions, research.md §10)*
4. **Click** one of the related cards → **confirm** it opens that case study's own detail page.

## User Story 4 — Usable on a phone (P3)

At mobile width (~375–430px):

1. List page: **confirm** the grid collapses to a single column, no overlapping/clipped text.
   *(FR-013)*
2. Detail page: **confirm** the metrics strip, the 2-column body, and the team panel all collapse to a
   single column, and the team panel now appears **in the reading flow** (not pinned to the side).
   *(FR-013)*

## Edge cases

1. Navigate to `/case-studies/not-a-real-slug` → **confirm** a clear "not found" outcome (Next.js
   `notFound()` page), not a blank/broken/mismatched page. *(FR-016)*
2. In devtools, disable JavaScript (or throttle so the reveal animation's 1500ms safety-timeout is
   observable) → **confirm** all hero/card/section content still becomes fully visible. *(FR-014)*
3. Tab through the list page and a detail page using keyboard only → **confirm** every card/link is
   reachable and operable, with an accessible name announced. *(FR-015)*
4. On a touch device (or devtools touch emulation), **confirm** every card and link is fully operable
   by tap alone, with no hover-only affordance blocking access. *(FR-015)*

## Gates before considering the feature done

- [X] All User Story 1–4 scenarios above pass at all three widths.
- [X] Both edge-case "not found" and "animations disabled" scenarios pass.
- [X] Keyboard and touch operability confirmed for every card/link.
- [X] `npm run lint` passes with no new warnings.
- [ ] `npm run build` succeeds. — currently blocked by an environment issue unrelated to this
      feature's code: the `@next/swc-win32-x64-msvc` native binary fails to load ("not a valid
      Win32 application") during the TypeScript-checking phase, crashing the build worker on this
      machine. Webpack compilation itself succeeds; only the native binary load fails. See note
      below.
- [X] No new hardcoded hex/px values introduced (Principle I) — spot-check new component files.
- [X] Header/Footer render identically to every other page (Principle V / FR-011, SC-006).

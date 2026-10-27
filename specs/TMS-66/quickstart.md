# Quickstart: Services Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/services`.

## Verify against the spec (manual — no test framework configured, see research.md §11)

Walk through each user story from `spec.md` directly in the browser:

1. **Story 1 — See what TechGrit offers, at a glance (P1)**: Load `/services`. Confirm the hero
   eyebrow, headline (with "Design", "build", "ship" each acting as a link — research.md §9),
   subtitle, primary CTA ("Schedule a Consultation" → `/contact`), and secondary CTA ("Explore
   Services") are visible without scrolling past the fold. Scroll to the overview grid; confirm
   exactly 3 cards (UI/UX Design, Software Product Engineering, Quality Engineering), each with a
   sequence label, title, one-line description, image, and its own accent color (blue/orange/teal).
2. **Story 1 (continued) — In-page navigation**: Click each overview card and confirm it scrolls
   to its matching detail section without a full page reload. Click each of the hero's three verb
   anchors ("Design"/"build"/"ship") and confirm the same.
3. **Story 2 — Explore a specific service in depth (P1)**: Scroll to the UI/UX Design detail
   section; confirm its heading, description, image, and the 6 approach steps render as a
   connected, numbered sequence (not an unordered grid), each revealing as you scroll past it.
   Scroll to the Engineering and QA detail sections; confirm each renders 6 unordered capability
   items as an equal-weight card grid (no numbers), settling in as one group. Confirm the image
   sits to the right of the text consistently across all three sections.
4. **Story 3 — Start a conversation (P2)**: Confirm the hero's CTA and the closing section's CTA
   both navigate to `/contact` — neither opens a `mailto:`/email client action (Clarifications,
   2026-07-15).
5. **Story 4 — Responsive (P1)**: Using browser dev tools device toolbar, check the page at:
   - Mobile: 375px and 430px wide
   - Tablet: 768px and 1024px wide
   - Desktop: 1280px+ wide

   At each width, confirm: no horizontal scrollbar, no overlapping text, the overview cards and
   per-service capability/approach grids collapse to fewer columns as width decreases, image+text
   detail rows stack into a single column on mobile, and every CTA remains tappable/clickable.

6. **Edge cases**:
   - Temporarily set one `ServiceOverviewCard.image` or `ServiceDetailSection.image` to `null` in
     `app/services/_data/services-content.ts` and confirm a placeholder renders instead of a
     broken layout, then revert the change.
   - Navigate directly to `/services#service-qa` (or whichever `anchorId` is used) and confirm the
     page scrolls to that service's detail section correctly on initial load.
   - With OS-level "reduce motion" enabled (or by throttling CPU heavily), confirm all sections —
     including the per-step approach reveals — still become fully visible even if the reveal
     animation doesn't visibly run.
   - Tab through the overview cards, hero verb anchors, and detail-section CTAs using only the
     keyboard; confirm each has a visible focus indicator and an accessible name.

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

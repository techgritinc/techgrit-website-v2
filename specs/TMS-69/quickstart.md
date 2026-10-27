# Quickstart: Blog Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/blog`.

## Verify against the spec (manual — no test framework configured, see research.md §6)

Walk through each user story from `spec.md` directly in the browser:

1. **Story 1 — Get oriented on arrival (P1)**: Load `/blog`. Confirm the hero eyebrow label
   identifies the page as TechGrit's blog, the headline states the page's editorial focus with one
   phrase visually distinguished as the gradient accent, and a supporting sentence sits beneath it —
   all readable without scrolling into the featured story or grid.
2. **Story 2 — Discover the flagship story immediately (P1)**: Scroll past the hero to the
   featured-story panel. Confirm it shows a topic label, full headline, excerpt, author name and
   role, an estimated read time, a "Read article" action, and a decorative supporting visual.
   Click anywhere on the panel (not just the "Read article" text) and confirm the whole panel is
   one actionable target.
3. **Story 3 — Browse and narrow posts by topic (P1)**: Confirm every topic filter chip is visible
   ("All" plus the 6 fixed topics — spec.md Assumptions), with "All" selected by default, and every
   post renders as a card with its topic label, title, excerpt, and author identity (name,
   initials, publish date, read time), with no full-page reload on load. Select a single topic chip
   and confirm the grid narrows to only that topic's posts, the selected chip is visually
   distinguished, and no navigation occurs. Select "All" again and confirm every post reappears.
   Click anywhere on a post card (not just its title) and confirm the whole card is one actionable
   target.
4. **Story 4 — Subscribe to get future posts by email (P2)**: Scroll to the subscribe panel. Submit
   a validly formatted email and confirm the form is replaced by an on-page confirmation message
   with no navigation. Reload, then submit an invalid or empty email and confirm the form stays
   visible with an inline error message, with no navigation.
5. **Story 5 — Read comfortably on any device (P1)**: Using browser dev tools device toolbar, check
   the page at:
   - Mobile: 375px and 430px wide
   - Tablet: 768px and 1024px wide
   - Desktop: 1280px+ wide

   At mobile widths, confirm the featured-story panel stacks its text above its visual, the
   subscribe panel stacks its text above its form, and the post grid collapses to a single column —
   with no overlapping text, no clipped content, and no horizontal scrolling. At tablet widths,
   confirm the post grid uses an intermediate multi-column layout. At desktop widths, confirm all
   sections use their full multi-column layout, centered and constrained to a readable maximum
   width (research.md §6 maps these transitions onto the canonical `lg`/`md`/`sm` breakpoints, not
   the reference's literal 980px/640px values).

6. **Edge cases** (spec.md Edge Cases):
   - Select a topic filter with no matching posts (or temporarily edit
     `app/blog/_data/blog-content.ts` to make one topic empty) and confirm the grid shows a clear
     "no posts" message (FR-015) instead of a blank area, then revert the change.
   - With OS-level "reduce motion" enabled (or by throttling CPU heavily), confirm every section —
     hero, featured panel, topic filters, grid, subscribe panel — still becomes fully visible even
     if the reveal animation doesn't visibly run.
   - Tab through the topic filter chips, the featured panel, every post card, and the subscribe
     form's input/submit using only the keyboard; confirm each has a visible focus indicator and an
     accessible name (FR-013).
   - Temporarily lengthen one post's `title` or `excerpt` in `blog-content.ts` to an unusually long
     string and confirm the card layout stays intact (text wraps/constrains) without breaking grid
     alignment or overlapping neighboring cards, then revert the change.
   - Submit the subscribe form successfully, then reload and submit it again with a different valid
     email; confirm the second submission is independently validated and confirms normally (a prior
     success state must not block a later attempt).

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

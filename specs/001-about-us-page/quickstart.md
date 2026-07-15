# Quickstart: About Us Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/about`.

## Verify against the spec (manual — no test framework configured, see research.md §8)

Walk through each user story from `spec.md` directly in the browser:

1. **Story 1 — Who TechGrit is (P1)**: Load `/about`. Confirm the hero eyebrow, headline,
   subtitle, primary CTA ("Start a Conversation"), and secondary CTA ("What we stand for") are
   visible without scrolling. Scroll to confirm the "Who you are" concerns card, "Our role"
   statement, and all 6 values render in order.
2. **Story 2 — Process & credibility (P2)**: Scroll to the process section; confirm exactly 3
   numbered steps in order. Confirm the 4 achievement stats render. Confirm the partnership
   outcomes list renders.
3. **Story 3 — Culture & action (P3)**: Scroll to the culture gallery; confirm all photos render
   (or their placeholders, if `image` is `null` in the content module). Confirm the closing CTA
   section and its "Start a Conversation" link are present.
4. **Story 4 — Responsive (P1)**: Using browser dev tools device toolbar, check the page at:
   - Mobile: 375px and 430px wide
   - Tablet: 768px and 1024px wide
   - Desktop: 1280px+ wide

   At each width, confirm: no horizontal scrollbar, no overlapping text, multi-column sections
   (values, achievements, gallery) collapse to fewer columns as width decreases, and every CTA
   remains tappable/clickable.

5. **Edge cases**:
   - Temporarily set a `ShowcaseSection.image` or a `CulturePhoto.image` to `null` in
     `app/about/_data/about-us-content.ts` and confirm a placeholder renders instead of a broken
     layout, then revert the change.
   - Navigate directly to `/about#values` and confirm the page scrolls to the values section on
     initial load (accounting for the sticky-nav `scroll-margin-top` already defined globally).
   - With OS-level "reduce motion" enabled (or by throttling CPU heavily), confirm all sections
     still become fully visible even if the reveal animation doesn't visibly run.

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

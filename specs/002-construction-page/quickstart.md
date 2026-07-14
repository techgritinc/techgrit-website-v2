# Quickstart: Construction Industry Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/construction`.

## Verify against the spec (manual — no test framework configured, see research.md §10)

Walk through each user story from `spec.md` directly in the browser:

1. **Story 1 — Understand the construction-industry problem (P1)**: Load `/construction`.
   Confirm the "Industries · Construction" eyebrow, headline, subtitle, primary CTA ("Talk to a
   Construction Tech Expert"), and secondary CTA ("See Solutions") are visible without scrolling,
   alongside the hero visual (or its placeholder) and its 3 proof-point stats. Scroll to confirm
   the integrations strip (5 named tools) and all 5 industry challenges render.
2. **Story 2 — Explore AI solutions and how they connect (P1)**: Scroll to the solutions section;
   confirm all 6 solution offerings render with title + description. Scroll to the "how it fits
   together" section; confirm the central engine connects to all 8 named workflow areas.
3. **Story 3 — Evaluate credibility and take action (P2)**: Scroll to the advantage section;
   confirm all 4 numbered advantage points render. Confirm the impact section's 3 case-study
   summaries (metric, label, title, description) render. Confirm the closing CTA offers both a
   scheduling action and an email action.
4. **Story 4 — Responsive (P1)**: Using browser dev tools device toolbar, check the page at:
   - Mobile: 375px and 430px wide
   - Tablet: 768px and 1024px wide
   - Desktop: 1280px+ wide

   At each width, confirm: no horizontal scrollbar, no overlapping text, multi-column sections
   (challenges, solutions, advantage, impact) collapse to fewer columns as width decreases, and
   the lifecycle diagram switches from the connector-line layout (desktop) to the stacked grid
   fallback (mobile/tablet) at the documented breakpoint (research.md §7).

5. **Edge cases**:
   - Temporarily set `HeroSection.image` to `null` in
     `app/construction/_data/construction-content.ts` and confirm a placeholder renders instead of
     a broken layout (it is `null` by default — no real photography exists yet), then leave as-is.
   - Resize the browser across the `lg` (1140px) breakpoint and confirm the lifecycle diagram swaps
     cleanly between the connector-line layout and the stacked grid with no overlapping content.
   - Navigate directly to `/construction#solutions` and confirm the page scrolls to the solutions
     section on initial load.
   - With OS-level "reduce motion" enabled (or by throttling CPU heavily), confirm all sections
     still become fully visible even if the reveal animation doesn't visibly run.

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

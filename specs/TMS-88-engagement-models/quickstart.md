# Quickstart: Engagement Models Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/how-we-work/engagement-models`.

Also open the reference file (`raw-files-v3/TechGrit Website V2.3/TechGrit Engagement Models.dc.html`) in a second tab for layout/spacing/typography comparison — the raw reference is the layout-fidelity target; the live CMS entry (`GET /api/pages/by-slug/engagement-models`, confirmed during planning) is the copy-accuracy target wherever the two differ (research.md §2).

## Verify against the spec (manual — no test framework configured)

Walk through each user story from `spec.md` directly in the browser:

1. **Story 1 — Understand TechGrit's engagement options (P1)**: Load the page. Confirm the hero shows the "Framework 02 · Engagement Models" eyebrow, the exact headline with its gradient-accented clause, the supporting paragraph, and the single primary CTA ("Talk to an AI Engineering Team" → `/contact-us/`) — no secondary CTA. Confirm the right-side image container is a fixed size and does not grow when the window is resized. Scroll to "Three engagement models" and count exactly 3 cards (Dedicated Product Team, MVP Development, Staff Augmentation), each with category label, title, multi-paragraph subtitle, full feature list, and a "Structure:" tag.
2. **Story 2 — Why TechGrit engagements (P2)**: Scroll to the "Why Organizations Choose TechGrit" section and count exactly 7 rows, each a single line of icon + text (no per-row description). Resize the window through desktop/tablet/mobile and confirm the rows stay in **one column at every width** (this section does NOT use the 1→2→3 responsive grid its sibling `orbit-ai-ecosystem` page uses for the same CMS component — confirm this is a deliberate difference, not a regression).
3. **Story 3 — Find Your Fit (P2)**: Scroll to "Not Sure Which Model Fits Your Needs?" and confirm one card with two side-by-side columns — "Your Goal" (left, 3 rows, each with an icon) and "Recommended Model" (right, 3 rows, text only) — with rows aligned: Build and continuously evolve a software product ↔ Dedicated Product Team; Validate an idea and launch quickly ↔ MVP Development; Expand your engineering capacity with specialized talent ↔ Staff Augmentation. Resize to ≤560px and confirm the two columns stack vertically with each goal immediately followed by its model.
4. **Story 4 — Closing CTA (P3)**: Confirm the closing CTA band shows "Ready to Build Your Next Product?" eyebrow, "Tell us your goal. We'll recommend the right engagement." title, description, and a single primary CTA ("Talk to Our Engineering Team" → `/contact-us/`) — visually matching `ai-modernization`/`orbit-ai-ecosystem`'s closing CTA styling exactly.
5. **CMS failure path** (Edge Cases): Temporarily point `getEngagementModelsData()` at a nonexistent slug (or stop the CMS) and confirm the page returns a proper 404 (`notFound()`), matching sibling-page behavior — then revert.
6. **Responsive layout**:
   - Desktop: 1280px+ — hero 2-column, models grid 3-across, why-checklist single column, find-your-fit 2-column.
   - Tablet (~960px): models grid collapses per the `md` breakpoint, hero still 2-column until narrower.
   - Mobile (~560px and narrower): hero stacks to 1 column, models grid → 1 column, find-your-fit → 1 column (stacked goal/model pairs), no horizontal scroll, no overlapping text.
7. **Nav/footer repointing**: Inspect the rendered `Footer`'s "How We Work" list and confirm "Engagement Models" links to `/how-we-work/engagement-models`. Click it from an unrelated page (e.g. `/about`) and confirm it lands here.
8. **Ambient background**: Confirm the page shows the same 4-orb `/how-we-work/` geometry as `orbit-ai-ecosystem` (no new orb branch was added — this route inherits the existing one), with no visible orb "snap"/flash navigating from a route with a different orb set.
9. **Sibling-page regression check**: Open `/how-we-work/orbit-ai-ecosystem` and confirm its own "Built for Real-World Engineering" chip grid still renders unchanged (1→2→3 responsive columns) — this feature must not alter that page's existing rendering when reusing the same underlying CMS data shape.

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

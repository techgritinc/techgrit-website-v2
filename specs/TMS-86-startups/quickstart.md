# Quickstart: Startups Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/what-we-do/startups`.

Also open the reference file directly (`raw-files-v3/TechGrit Website V2.3/TechGrit Startups.dc.html`) in a second tab for side-by-side comparison — this is the fidelity target for SC-001/SC-002.

## Verify against the spec (manual — no test framework configured, see research.md)

Walk through each user story from `spec.md` directly in the browser:

1. **Story 1 — Evaluate TechGrit as a startup engineering partner end-to-end (P1)**: Load the page. Confirm the hero shows the "Service 07 · Startups" eyebrow, the exact headline with "startups that move fast and build to last." in the gradient accent, the supporting paragraph, both CTAs ("Talk to a Startup Advisor", "See capabilities"), and the right-side card showing only the `ind-fintech.png` image with no caption line beneath it — not the four original stat tiles (Speed, Access, Models, Track Record) as separate text, and not the reference's "AI-native architecture · OrbitAI™ · 4D™ frameworks" caption (FR-004). Scroll to "Great ideas stall when engineering doesn't keep pace with your ambition." and confirm the 6-chip "Challenges we solve for founders" list. Scroll to "From first idea to institutional scale." and confirm exactly 3 growth-stage cards (Pre-Seed & Seed, Series A, Series B+) inside one bordered panel, each with its badge, heading, lead paragraph, and full 4-item bullet list. Scroll to "capabilities" and confirm the heading reads "Six capabilities. Every startup stage." (corrected per Clarifications/FR-003a — the reference itself literally says "Five") followed by exactly 6 cards, each with its label ("01 · Discover" → "05 · Sustain", and "+ Network" for the 6th), heading, lead paragraph, and full 4-item bullet list verbatim.
2. **Story 2 — Understand why the approach matters and who it's for (P2)**: Confirm exactly 6 "Why TechGrit for startups" tiles with icon+heading+description, and exactly 4 cards in "Founders, venture teams, and builders at every stage." in order (Solo & Co-Founders, Seed & Series A Teams, VC & PE Portcos, Corporate Innovation) — confirm all four render as plain, non-clickable cards (no hover-lift/pointer-cursor affordance implying a destination that doesn't exist).
3. **Story 3 — Resolve open questions and convert (P3)**: In the FAQ, confirm the first item ("Do you work with pre-revenue startups?") is expanded by default; click a second item and confirm it expands *without* collapsing the first (FR-005 — independent `<details>` elements, not a mutually-exclusive accordion). Confirm exactly 6 related-service cards (Software Product Engineering, AI Strategy & Roadmap, Data & AI Engineering, AI-Accelerated Modernization, Platform Engineering, Managed Services) link correctly. Confirm the closing CTA band shows "Your idea deserves senior engineers, not excuses.", its paragraph, and both CTAs ("Talk to a Startup Advisor" primary, "Book a Discovery Sprint" secondary).
4. **Hero anchor link**: Click "See capabilities" in the hero and confirm the page scrolls to the capabilities section with its heading fully visible below the sticky header (not clipped underneath it) — then reload directly at `/what-we-do/startups#capabilities` and confirm the same.
5. **Content fidelity spot-check (SC-002)**: Pick 3 arbitrary text strings (one FAQ answer, one growth-stage bullet, one "why" tile description) and diff them character-for-character against the reference file's markup — zero deviation (the corrected capabilities heading is the one deliberate exception, per FR-003a).
6. **Responsive layout (SC-003)**: Using browser dev tools' device toolbar, check:
   - Desktop: 1280px+ — hero 2-column, growth-journey grid 3-across inside its panel, capability grid 3-across, why-grid 2-across, "who we help" grid 4-across, related-services 3-across.
   - Laptop/tablet (~960px): grids collapse per reference (growth-journey/capability → 2-across, why-grid → 1-across, "who we help"/related-services → 2-across), hero still 2-column until narrower.
   - Mobile (~560px and narrower, plus the hero's own stack point): hero stacks to 1 column, all multi-column grids collapse to 1 column, no horizontal scroll, no overlapping text.
7. **Nav repointing (FR-010)**: Inspect the rendered `Footer`'s "What We Do" list and confirm "Startups" now links to `/what-we-do/startups`, not `/services#svc-startups`. Click it from the footer on an unrelated page (e.g. `/about`) and confirm it lands on this page. Then open the header's "What We Do" mega-menu and confirm its "Startups" entry links to the same new route.
8. **Edge cases** (spec.md Edge Cases):
   - Confirm the hero card's size, position, border radius, and decorative blurred-orb corner accent are unchanged from the reference even with the image swapped in, and that no caption text renders beneath it (FR-004).
   - In "capabilities", confirm the sixth "+ Network" card is visually distinguished (gradient background, no sequence number) but otherwise renders with the same card shape (title, lede, 4-item bullet list) as the other five.
   - In "Founders, venture teams, and builders at every stage.", confirm all four cards render as plain `<div>`s with no hover-lift/pointer-cursor affordance.
   - Expand all 5 FAQ items in sequence, then collapse them in a different order; confirm each toggle only ever affects that one item.
   - Temporarily lengthen one capability's `lede` or a bullet item in `startups-content.ts` to an unusually long string and confirm the card grid layout stays intact (text wraps, no overlap, no grid misalignment), then revert.

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

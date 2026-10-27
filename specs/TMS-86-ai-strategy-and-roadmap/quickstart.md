# Quickstart: AI Strategy & Roadmap Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/what-we-do/ai-strategy-roadmap`.

Also open the reference file directly (`raw-files-v3/TechGrit Website V2.3/TechGrit AI Strategy.dc.html`) in a second tab for side-by-side comparison — this is the fidelity target for SC-001/SC-002.

## Verify against the spec (manual — no test framework configured, see research.md §7)

Walk through each user story from `spec.md` directly in the browser:

1. **Story 1 — Evaluate the fractional CTO offering end-to-end (P1)**: Load the page. Confirm the hero shows the "Service 06 · CTO Advisory" eyebrow, the exact headline with "technical roadmap that hits business goals." in the gradient accent, the supporting paragraph, both CTAs ("Book a Strategy Session", "See CTO capabilities"), and the right-side card showing only the `dm-scalability.png` image with no caption line beneath it — not the four original stat tiles (Advisors, Engagement, Roadmap, Outcomes) as separate text/tiles, and not the reference's "AI IMPACT™ · 4D™ · PRISM™ frameworks" caption (FR-004). Scroll to "Achieve your business goals with senior technology leadership on tap." and confirm the 6-chip "When teams need us" list. Scroll to "CTO-as-a-Service capabilities" and confirm the heading reads "Four pillars. One executive partner." followed by exactly 4 cards, each with its numbered discipline label ("01 · Strategy" → "04 · Quality"), heading, lead paragraph, and full 5-item bullet list verbatim. Scroll to "Diagnose. Roadmap. Execute. Measure. Coach." and confirm exactly 5 numbered stages.
2. **Story 2 — Understand why the approach matters and who it's for (P2)**: Confirm exactly 6 "Why leaders choose TechGrit" tiles with icon+heading+description, and exactly 4 cards in "Founders. Boards. Scaling technology orgs." in order (Startup Founders, Scale-ups, PE / VC Portfolio, Enterprise Programs) — confirm all four render as plain, non-clickable cards (no hover-lift/pointer cursor implying a destination, matching the reference's own `<div>`-not-`<a>` treatment for every card in this grid).
3. **Story 3 — Resolve open questions and convert (P3)**: In the FAQ, confirm the first item ("How does CTO-as-a-Service compare with hiring a full-time CTO?") is expanded by default; click a second item and confirm it expands *without* collapsing the first (FR-005 — independent `<details>` elements, not a mutually-exclusive accordion). Confirm exactly 6 related-service cards (AI-Accelerated Modernization, Software Product Engineering, Data & AI Engineering, Platform Engineering, Managed Services, Startups) link correctly. Confirm the closing CTA band shows "Turn your AI ambition into a plan you can execute.", its paragraph, and both CTAs ("Book a Strategy Session" primary, "Explore Discovery Sprints" secondary).
4. **Hero anchor link**: Click "See CTO capabilities" in the hero and confirm the page scrolls to the capabilities section with its heading fully visible below the sticky header (not clipped underneath it) — then reload directly at `/what-we-do/ai-strategy-roadmap#capabilities` and confirm the same.
5. **Content fidelity spot-check (SC-002)**: Pick 3 arbitrary text strings (one FAQ answer, one capability bullet, one "why" tile description) and diff them character-for-character against the reference file's markup — zero deviation.
6. **Responsive layout (SC-003)**: Using browser dev tools' device toolbar, check:
   - Desktop: 1280px+ — hero 2-column, capability grid 2-across, lifecycle 5-across, why-grid 2-across, "Founders. Boards. Scaling technology orgs." grid 4-across, related-services 3-across.
   - Laptop/tablet (~960px): grids collapse per reference (capability grid stays 2-across per the reference's own `data-cap-grid` breakpoint rules, lifecycle → 2-across, why-grid → 1-across, advisory-segments grid → 2-across), hero still 2-column until narrower.
   - Mobile (~560px and narrower, plus the hero's own stack point): hero stacks to 1 column, all multi-column grids collapse to 1 column, no horizontal scroll, no overlapping text.
7. **Nav repointing (FR-010)**: Inspect the rendered `Footer`'s "What We Do" list and confirm "AI Strategy & Roadmap" now links to `/what-we-do/ai-strategy-roadmap`, not `/services#svc-strategy`. Click it from the footer on an unrelated page (e.g. `/about`) and confirm it lands on this page. Then open the header's "What We Do" mega-menu and confirm its "AI Strategy & Roadmap" entry links to the same new route.
8. **Ambient orbs (research.md §4)**: Confirm the background glow layer shows 4 orbs (top-right orange, mid-left amber, mid-right orange, bottom-center orange) matching the reference's exact geometry/colors — not the shared `/what-we-do/` branch's blue second orb.
9. **Edge cases** (spec.md Edge Cases):
   - Confirm the hero card's size, position, border radius, and decorative blurred-orb corner accent are unchanged from the reference even with the image swapped in, and that no caption text renders beneath it (FR-004).
   - In "Founders. Boards. Scaling technology orgs.", confirm all four cards (not just some) render as plain cards with no hover-lift/pointer-cursor affordance.
   - Expand all 5 FAQ items in sequence, then collapse them in a different order; confirm each toggle only ever affects that one item.
   - Temporarily lengthen one capability's `lede` or a bullet item in `ai-strategy-roadmap-content.ts` to an unusually long string and confirm the card grid layout stays intact (text wraps, no overlap, no grid misalignment), then revert.

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

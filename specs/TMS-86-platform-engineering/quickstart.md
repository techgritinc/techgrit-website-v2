# Quickstart: Platform Engineering Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/what-we-do/platform-engineering`.

Also open the reference file directly (`raw-files-v3/TechGrit Website V2.3/TechGrit Platform Engineering.dc.html`) in a second tab for side-by-side comparison — this is the fidelity target for SC-001/SC-002.

## Verify against the spec (manual — no test framework configured, see research.md §8)

Walk through each user story from `spec.md` directly in the browser:

1. **Story 1 — Evaluate the platform engineering offering end-to-end (P1)**: Load the page. Confirm the hero shows the "Service 04 · Platform Engineering" eyebrow, the exact headline with "accelerate software delivery." in the gradient accent, the supporting paragraph, both CTAs ("Talk to a Platform Engineering Expert", "See capabilities"), and the right-side card showing only the `svc-uiux.png` image with no caption line beneath it — not the four original stat tiles as separate text, and not the reference's "PRISM™ · AI IMPACT™ · OrbitAI™ frameworks" caption (FR-004). Scroll to "Stop solving the same infrastructure problem in every team." and confirm the 6-chip "Signals you need a platform" list. Scroll to "Capabilities" and confirm the heading reads "Six pillars. One reliable foundation." followed by exactly 6 cards, each with its numbered discipline label ("01 · Strategy" → "06 · Security"), heading, lead paragraph, and full 4-item bullet list verbatim. Scroll to "Assess. Design. Build. Secure. Optimize." and confirm exactly 5 numbered stages.
2. **Story 2 — Understand why the approach matters and see relevant platform fit (P2)**: Confirm exactly 6 "Why platform engineering matters" tiles with icon+heading+description, and exactly 4 cards in "Platforms for every stage of growth" in order (SaaS Platforms, Enterprise Apps, HealthTech, FinTech) — confirm the first two render as plain, non-clickable cards (no hover-lift/pointer cursor implying a destination), and the last two are clickable and navigate to their industry page.
3. **Story 3 — Resolve open questions and convert (P3)**: In the FAQ, confirm the first item ("What is Platform Engineering?") is expanded by default; click a second item and confirm it expands *without* collapsing the first (FR-005 — independent `<details>` elements, not a mutually-exclusive accordion). Confirm exactly 6 related-service cards (AI-Accelerated Modernization, Software Product Engineering, Data & AI Engineering, Managed Services, AI Strategy & Roadmap, Startups) link correctly. Confirm the closing CTA band shows "Cloud-native. Secure. Loved by developers.", its paragraph, and both CTAs ("Talk to a Platform Expert" primary, "Book a Discovery Sprint" secondary).
4. **Hero anchor link**: Click "See capabilities" in the hero and confirm the page scrolls to the capabilities section with its heading fully visible below the sticky header (not clipped underneath it) — then reload directly at `/what-we-do/platform-engineering#capabilities` and confirm the same.
5. **Content fidelity spot-check (SC-002)**: Pick 3 arbitrary text strings (one FAQ answer, one capability bullet, one "why" tile description) and diff them character-for-character against the reference file's markup — zero deviation.
6. **Responsive layout (SC-003)**: Using browser dev tools' device toolbar, check:
   - Desktop: 1280px+ — hero 2-column, capability grid 3-across, lifecycle 5-across, why-grid 2-across, "Platforms for every stage of growth" grid 4-across, related-services 3-across.
   - Laptop/tablet (~960px): grids collapse per reference (capability → 2-across, lifecycle → 2-across, why-grid → 1-across, "Platforms" grid/related-services → 2-across), hero still 2-column until narrower.
   - Mobile (~560px and narrower, plus the hero's own stack point): hero stacks to 1 column, all multi-column grids collapse to 1 column, no horizontal scroll, no overlapping text.
7. **Nav repointing (FR-010)**: Inspect the rendered `Footer`'s "What We Do" list and confirm "Platform Engineering" now links to `/what-we-do/platform-engineering`, not `/services#svc-platform`. Click it from the footer on an unrelated page (e.g. `/about`) and confirm it lands on this page. Then open the header's "What We Do" mega-menu and confirm its "Platform Engineering" entry links to the same new route.
8. **Edge cases** (spec.md Edge Cases):
   - Confirm the hero card's size, position, border radius, and decorative blurred-orb corner accent are unchanged from the reference even with the image swapped in, and that no caption text renders beneath it (FR-004).
   - In "Platforms for every stage of growth", confirm "SaaS Platforms" and "Enterprise Apps" render as plain cards with no hover-lift/pointer-cursor affordance, distinct from "HealthTech"/"FinTech", which behave like every other linked capability/industry card in the design system.
   - Expand all 5 FAQ items in sequence, then collapse them in a different order; confirm each toggle only ever affects that one item.
   - Temporarily lengthen one capability's `lede` or a bullet item in `platform-engineering-content.ts` to an unusually long string and confirm the card grid layout stays intact (text wraps, no overlap, no grid misalignment), then revert.

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

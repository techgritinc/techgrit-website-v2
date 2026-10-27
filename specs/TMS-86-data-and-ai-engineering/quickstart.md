# Quickstart: Data & AI Engineering Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/what-we-do/data-ai-engineering`.

Also open the reference file directly (`raw-files-v3/TechGrit Website V2.3/TechGrit Data AI.dc.html`) in a second tab for side-by-side comparison — this is the fidelity target for SC-001/SC-002.

## Verify against the spec (manual — no test framework configured, see research.md §8)

Walk through each user story from `spec.md` directly in the browser:

1. **Story 1 — Evaluate the data & AI engineering offering end-to-end (P1)**: Load the page. Confirm the hero shows the "Service 03 · Data & AI" eyebrow, the exact headline with "intelligence & agentic action." in the gradient accent, the supporting paragraph, both CTAs ("Schedule an AI Readiness Assessment", "See capabilities"), and the right-side card showing only the `svc-qa.png` image with the "AI IMPACT™ · OrbitAI™ · PRISM™ frameworks" caption beneath it — not the four original stat tiles as separate text (FR-004). Scroll to "AI is only as effective as the data behind it" and confirm the 6-chip "Where AI programs stall" list. Scroll to "Capabilities" and confirm the heading reads "Six capabilities. One AI-first engine." (not the reference's literal "Five" — Clarifications), followed by exactly 6 cards, each with its numbered discipline label ("01 · Strategy" → "06 · Enable"), heading, lead paragraph, and full 4-item bullet list verbatim. Scroll to "Discover. Build. Enable. Govern. Optimize." and confirm exactly 5 numbered stages.
2. **Story 2 — Understand why the approach matters and industry fit (P2)**: Confirm exactly 6 "Why AI-first data engineering" tiles with icon+heading+description, and exactly 3 industry cards (HealthTech, FinTech, Construction Tech) each linking to that industry's page — click each and confirm navigation.
3. **Story 3 — Resolve open questions and convert (P3)**: In the FAQ, confirm the first item ("What's the difference between Data Engineering and AI Engineering?") is expanded by default; click a second item and confirm it expands *without* collapsing the first (FR-005 — independent `<details>` elements, not a mutually-exclusive accordion). Confirm exactly 6 related-service cards (AI-Accelerated Modernization, Software Product Engineering, Platform Engineering, Managed Services, AI Strategy & Roadmap, Startups) link correctly. Confirm the closing CTA band shows "Whether it's a data platform, embedded AI, or agentic workflows — we've shipped it.", its paragraph, and both CTAs ("Schedule an AI Readiness Assessment" primary, "Book a Discovery Sprint" secondary).
4. **Hero anchor link**: Click "See capabilities" in the hero and confirm the page scrolls to the capabilities section with its heading fully visible below the sticky header (not clipped underneath it) — then reload directly at `/what-we-do/data-ai-engineering#capabilities` and confirm the same.
5. **Content fidelity spot-check (SC-002)**: Pick 3 arbitrary text strings (one FAQ answer, one capability bullet, one "why" tile description) and diff them character-for-character against the reference file's markup — zero deviation. (The one intentional exception is the Capabilities heading's "Five" → "Six" correction — confirm that one *does* deviate, per Clarifications.)
6. **Responsive layout (SC-003)**: Using browser dev tools' device toolbar, check:
   - Desktop: 1280px+ — hero 2-column, capability grid 3-across, lifecycle 5-across, why-grid 2-across, industries 3-across (on a 4-col track — see edge case below), related-services 3-across.
   - Laptop/tablet (~960px): grids collapse per reference (capability → 2-across, lifecycle → 2-across, industries/related → 2-across), hero still 2-column until narrower.
   - Mobile (~560px and narrower, plus the hero's own stack point): hero stacks to 1 column, all multi-column grids collapse to 1 column, no horizontal scroll, no overlapping text.
7. **Nav repointing (FR-010)**: Inspect the rendered `Footer`'s "What We Do" list and confirm "Data & AI Engineering" now links to `/what-we-do/data-ai-engineering`, not `/services#svc-data-ai`. Click it from the footer on an unrelated page (e.g. `/about`) and confirm it lands on this page. Then open the header's "What We Do" mega-menu and confirm its "Data and AI Engineering" entry links to the same new route.
8. **Edge cases** (spec.md Edge Cases):
   - Confirm the hero card's size, position, border radius, and decorative blurred-orb corner accent are unchanged from the reference even with the image swapped in, and that the caption line renders correctly beneath it (FR-004).
   - Confirm the "Industries we empower" grid renders 3 cards on its 4-column desktop track without an awkward visible gap or broken layout (trailing empty space is expected and acceptable).
   - Expand all 5 FAQ items in sequence, then collapse them in a different order; confirm each toggle only ever affects that one item.
   - Temporarily lengthen one capability's `lede` or a bullet item in `data-ai-engineering-content.ts` to an unusually long string and confirm the card grid layout stays intact (text wraps, no overlap, no grid misalignment), then revert.

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

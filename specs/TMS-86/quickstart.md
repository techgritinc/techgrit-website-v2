# Quickstart: AI-Accelerated Modernization Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/what-we-do/ai-modernization`.

Also open the reference file directly (`raw-files-v3/TechGrit Website V2.3/TechGrit AI Modernization.dc.html`) in a second tab for side-by-side comparison — this is the fidelity target for SC-001/SC-002.

## Verify against the spec (manual — no test framework configured, see research.md §9)

Walk through each user story from `spec.md` directly in the browser:

1. **Story 1 — Evaluate the modernization offering end-to-end (P1)**: Load the page. Confirm the hero shows the "Service 01 · Modernization" eyebrow, the exact headline with "AI-assisted engineering." in the gradient accent, the supporting paragraph, both CTAs, and the right-side card showing the replacement image (not the four stat tiles as separate text) with the "PRISM™ · OrbitAI™ frameworks in every engagement" caption still present below it (FR-004). Scroll to "Our modernization services" and count exactly 6 capability cards, each with its numbered label, heading, lead paragraph, and full bullet list verbatim. Scroll to "Modernization lifecycle" and confirm exactly 5 numbered stages. Scroll to "Strategies we support" and confirm exactly 6 tiles (Rehost/Replatform/Refactor/Rearchitect/Rebuild/Replace).
2. **Story 2 — Understand why AI-assistance matters and industry fit (P2)**: Confirm exactly 6 "Why AI-assisted modernization" tiles with icon+heading+description, and exactly 3 industry cards (HealthTech, FinTech, Construction Tech) each linking to that industry's page — click each and confirm navigation.
3. **Story 3 — Resolve open questions and convert (P3)**: In the FAQ, confirm the first item ("What is AI-assisted modernization?") is expanded by default; click a second item and confirm it expands *without* collapsing the first (FR-005 — inspect that these are independent `<details>` elements, not a mutually-exclusive accordion). Confirm exactly 6 related-service cards link correctly. Confirm the closing CTA band shows the exact heading, paragraph, and both CTAs ("Schedule a Modernization Assessment" primary, "Book a Discovery Sprint" secondary).
4. **Hero anchor link**: Click "See capabilities" in the hero and confirm the page scrolls to the capabilities section with its heading fully visible below the sticky header (not clipped underneath it) — then reload directly at `/what-we-do/ai-modernization#capabilities` and confirm the same.
5. **Content fidelity spot-check (SC-002)**: Pick 3 arbitrary text strings (one FAQ answer, one capability bullet, one strategy tile description) and diff them character-for-character against the reference file's markup — zero deviation.
6. **Responsive layout (SC-003)**: Using browser dev tools' device toolbar, check:
   - Desktop: 1280px+ — hero 2-column, capability/strategy grids 3-across, lifecycle 5-across, why-grid 2-across, industries 3-across, related-services 3-across.
   - Laptop/tablet (~960px): grids collapse per reference (capability/strategy → 2-across, lifecycle → 2-across, industries/related → 2-across), hero still 2-column until narrower.
   - Mobile (~560px and narrower, plus the hero's own 920px stack point): hero stacks to 1 column, all multi-column grids collapse to 1 column, no horizontal scroll, no overlapping text, `[data-h1]`-equivalent H1 shrinks per the `md` breakpoint contract.
7. **Nav repointing (FR-011)**: Inspect the rendered `Footer`'s "What We Do" list and confirm "AI-Accelerated Modernization" now links to `/what-we-do/ai-modernization`, not `/services#svc-modernization`. Click it from the footer on an unrelated page (e.g. `/about`) and confirm it lands on this page.
8. **Ambient background** (research.md §7): Confirm the page's background orbs match the reference's 4-orb geometry (one blue-tinted orb among three orange-toned ones) — compare visually against the reference tab; confirm no visible "snap"/flash when navigating to this page from `/services` (shared-orb-set boundary) or from `/` (different orb-set boundary).

9. **Edge cases** (spec.md Edge Cases):
   - Confirm the hero card's size, position, border radius, and decorative blurred-orb corner accent are unchanged from the reference even with the image swapped in (FR-004 / Edge Cases).
   - Expand all 5 FAQ items in sequence, then collapse them in a different order; confirm each toggle only ever affects that one item.
   - Temporarily lengthen one capability's `lede` or a bullet item in `ai-modernization-content.ts` to an unusually long string and confirm the card grid layout stays intact (text wraps, no overlap, no grid misalignment), then revert.

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

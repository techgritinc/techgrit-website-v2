# Quickstart: Software Product Engineering Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/what-we-do/software-product-engineering`.

Also open the reference file directly (`raw-files-v3/TechGrit Website V2.3/TechGrit Product Engineering.dc.html`) in a second tab for side-by-side comparison — this is the fidelity target for SC-001/SC-002.

## Verify against the spec (manual — no test framework configured, see research.md §8)

Walk through each user story from `spec.md` directly in the browser:

1. **Story 1 — Evaluate the product engineering offering end-to-end (P1)**: Load the page. Confirm the hero shows the "Service 02 · Product Engineering" eyebrow, the exact headline with "modern enterprises." in the gradient accent, the supporting paragraph, both CTAs ("Talk to a Product Engineering Expert", "See capabilities"), and the right-side card showing only the `svc-eng.png` image — not the four stat tiles as separate text, and no caption line beneath the image either (FR-004). Scroll to "Product engineering, end-to-end" and confirm the 6-chip "Where teams get stuck" list. Scroll to "Core capabilities" and count exactly 6 cards, each with its numbered discipline label ("01 · Strategy" → "06 · Ops"), heading, lead paragraph, and full 4-item bullet list verbatim. Scroll to "Our delivery lifecycle" and confirm exactly 5 numbered stages (Discover/Design/Build/Validate/Evolve).
2. **Story 2 — Understand why the approach matters and industry fit (P2)**: Confirm exactly 6 "Why product teams pick TechGrit" tiles with icon+heading+description, and exactly 3 industry cards (HealthTech, FinTech, Construction Tech) each linking to that industry's page — click each and confirm navigation.
3. **Story 3 — Resolve open questions and convert (P3)**: In the FAQ, confirm the first item ("What engagement models do you offer?") is expanded by default; click a second item and confirm it expands *without* collapsing the first (FR-005 — independent `<details>` elements, not a mutually-exclusive accordion). Confirm exactly 6 related-service cards (AI-Accelerated Modernization, Data & AI Engineering, Platform Engineering, Managed Services, AI Strategy & Roadmap, Startups) link correctly. Confirm the closing CTA band shows "Tell us what you're building.", its paragraph, and both CTAs ("Schedule a Consultation" primary, "Book a Discovery Sprint" secondary).
4. **Hero anchor link**: Click "See capabilities" in the hero and confirm the page scrolls to the capabilities section with its heading fully visible below the sticky header (not clipped underneath it) — then reload directly at `/what-we-do/software-product-engineering#capabilities` and confirm the same.
5. **Content fidelity spot-check (SC-002)**: Pick 3 arbitrary text strings (one FAQ answer, one capability bullet, one "why" tile description) and diff them character-for-character against the reference file's markup — zero deviation.
6. **Responsive layout (SC-003)**: Using browser dev tools' device toolbar, check:
   - Desktop: 1280px+ — hero 2-column, capability grid 3-across, lifecycle 5-across, why-grid 2-across, industries 3-across (on a 4-col track — see edge case below), related-services 3-across.
   - Laptop/tablet (~960px): grids collapse per reference (capability → 2-across, lifecycle → 2-across, industries/related → 2-across), hero still 2-column until narrower.
   - Mobile (~560px and narrower, plus the hero's own stack point): hero stacks to 1 column, all multi-column grids collapse to 1 column, no horizontal scroll, no overlapping text.
7. **Nav repointing (FR-010)**: Inspect the rendered `Footer`'s "What We Do" list and confirm "Software Product Engineering" now links to `/what-we-do/software-product-engineering`, not `/services#svc-product`. Click it from the footer on an unrelated page (e.g. `/about`) and confirm it lands on this page. Then open the header's "What We Do" mega-menu and confirm its "Software Product Engineering" entry links to the same new route.
8. **Edge cases** (spec.md Edge Cases):
   - Confirm the hero card's size, position, border radius, and decorative blurred-orb corner accent are unchanged from the reference even with the image swapped in, and that no caption row renders below the image (FR-004).
   - Confirm the "Industries we build for" grid renders 3 cards on its 4-column desktop track without an awkward visible gap or broken layout (trailing empty space is expected and acceptable).
   - Expand all 5 FAQ items in sequence, then collapse them in a different order; confirm each toggle only ever affects that one item.
   - Temporarily lengthen one capability's `lede` or a bullet item in `software-product-engineering-content.ts` to an unusually long string and confirm the card grid layout stays intact (text wraps, no overlap, no grid misalignment), then revert.

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

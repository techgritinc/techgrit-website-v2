# Quickstart: Orbit AI Ecosystem Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/how-we-work/orbit-ai-ecosystem`.

Also open the reference file directly (`raw-files-v3/TechGrit Website V2.3/TechGrit Orbit AI.dc.html`) in a second tab for side-by-side comparison — this is the fidelity target for SC-001/SC-002, except in the five sections spec.md's Clarifications explicitly change.

## Verify against the spec (manual — no test framework configured, see research.md §9)

Walk through each user story from `spec.md` directly in the browser:

1. **Story 1 — Understand the OrbitAI operating model end-to-end (P1)**: Load the page. Confirm the hero shows the "Framework 01 · OrbitAI™" eyebrow, the exact headline with its gradient-accented phrase, the supporting paragraph, both CTAs ("Talk to an AI Engineering Expert" primary, "See how it works" secondary), and the right-side card showing `dm-copilot.png` (not the four stat tiles as separate text). Scroll to "From AI opportunity to business impact" and confirm it is a single centered column with no chip list on the right. Scroll to "How OrbitAI Works" and count exactly 5 cards, each with category label, title, subtitle, and full feature list verbatim. Scroll to "One Integrated Path" and confirm exactly 5 numbered steps (Assess/Prioritize/Architect/Build/Optimize) followed by one additional full-width card labeled "One Integrated Path".
2. **Story 2 — Confirm engineering rigor and audience fit (P2)**: Scroll to "Built for Real-World Engineering" and confirm exactly 6 icon tiles followed by one additional full-width "Engineering Standards" card. Scroll to "What OrbitAI Helps You Achieve" and count exactly 6 cards with the requester-supplied titles/descriptions (no icons). Scroll to "From Understanding to Working Software" and count exactly 4 icon cards (Discover/Define/Design/Deliver). Scroll to "Who we help" and confirm exactly 4 cards (Legacy-heavy enterprises, Cloud migration programs, AI-first transformations, Regulated industries). Confirm the six-tile "Built for the real complexity of enterprise modernization" content is the *same* tile grid already shown for "Built for Real-World Engineering" — not duplicated a second time on the page.
3. **Story 3 — Convert after review (P3)**: Confirm the closing CTA band shows the exact heading, paragraph, and both CTAs ("Talk to an AI Engineering Expert" primary, "Book a Discovery Sprint" secondary). Confirm there is no FAQ section and no "Related" section anywhere on the page.
4. **Hero anchor link**: Click "See how it works" in the hero and confirm the page scrolls to the capabilities section with its heading fully visible below the sticky header — then reload directly at `/how-we-work/orbit-ai-ecosystem#capabilities` and confirm the same.
5. **Content fidelity spot-check (SC-002)**: Pick 3 arbitrary text strings taken directly from the reference (one capability feature bullet, one lifecycle step description, one engineering tile description) and diff them character-for-character against the reference file's markup — zero deviation for anything not covered by an explicit Clarification.
6. **Responsive layout (SC-003)**: Using browser dev tools' device toolbar, check:
   - Desktop: 1280px+ — hero 2-column, capability grid 5→3-across (or per reference), lifecycle 5-across, engineering tiles 2-across, achieve grid 2-3-across, understanding/who-we-help grids 4-across.
   - Laptop/tablet (~960px): grids collapse per the `md` breakpoint (capability/lifecycle → 2-across, engineering/achieve → 1-2 across, understanding/who-we-help → 2-across), hero still 2-column until narrower.
   - Mobile (~560px and narrower): hero stacks to 1 column, every multi-column grid collapses to 1 column, no horizontal scroll, no overlapping text.
7. **Nav repointing (FR-020)**: Inspect the rendered `Footer`'s "How We Work" list and confirm "Orbit AI Framework" now links to `/how-we-work/orbit-ai-ecosystem`, not `/frameworks#orbit-ai`. Click it from the footer on an unrelated page (e.g. `/about`) and confirm it lands on this page.
8. **Ambient background** (research.md §7): Confirm the page's background orbs match the reference's own 4-orb geometry — compare visually against the reference tab; confirm no visible "snap"/flash when navigating to this page from a route with a different orb set.
9. **`ContentBlock` regression check** (research.md §4): Open `/what-we-do/ai-modernization` (the existing consumer of `ContentBlock`) and confirm its intro section still renders its chip list unchanged after the prop-optionality change.
10. **Edge cases** (spec.md Edge Cases):
    - Confirm the hero card's size, position, border radius, and decorative blurred-orb corner accent are unchanged from the reference even with the image swapped in.
    - Temporarily lengthen one card's description in `orbit-ai-content.ts` to an unusually long string and confirm its grid layout stays intact (text wraps, no overlap, no grid misalignment), then revert.

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

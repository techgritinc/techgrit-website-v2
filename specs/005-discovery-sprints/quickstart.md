# Quickstart: Discovery Sprints Page

No test framework is configured in this repository (per `CLAUDE.md`) — verification is manual,
via the dev server and a visual diff against the reference prototype.

## Run

```bash
npm run dev
```

Navigate to `http://localhost:3000/how-we-work/discovery-sprints`.

## Verification checklist (maps to spec.md Success Criteria)

1. **SC-001 / Hero**: Hero shows eyebrow badge, gradient-highlighted title, subtitle, primary CTA
   ("Book a Discovery Sprint" → `/contact`), secondary CTA ("See what's included" → `#capabilities`),
   and a fixed-aspect image on the right — no breadcrumb, no stat panel.
2. **SC-002 / Section coverage**: Scroll the full page and confirm, in order: Hero → Why Phase Zero
   Changes Everything (chips) → What Is a Phase Zero Assessment? (new) → What We Cover (3 cards) →
   What You'll Receive (7 cards) → How It Works (4 steps) → Why TechGrit (text only) → Documentation
   You Can Execute (6 tiles) → Who It's For (4 cards) → FAQ (5 items, first open by default) →
   Closing CTA. No "Related frameworks & services" section.
3. **SC-003 / Visual parity**: Open `raw-files-v3/TechGrit Website V2.3/TechGrit Discovery
   Sprint.dc.html` side by side at 1280px, ~900px, and ~400px widths; compare spacing, type scale,
   card grids per section (accounting for the two explicit deviations: hero image instead of stat
   panel, and the new Phase Zero Assessment section).
4. **SC-004 / CTAs**: Click every CTA (hero primary/secondary, closing CTA primary/secondary) and
   confirm each resolves to `/contact` (or `#capabilities` for the in-page anchor) with no 404s.
5. **SC-005 / Component reuse**: Confirm via code review that `Hero`, `ContentBlock`, `GlassCard`,
   `Outcome`, `ProcessSteps`, `IconTile`, `Faq`, and `FinalCta` are imported from `components/ui/`
   with no duplicate/forked implementations under `_components/`.
6. **Responsive**: Resize to `lg` (1140px), `md` (960px), `sm` (560px) breakpoints and confirm the
   hero collapses to one column, card grids collapse (3→2→1, 4→2→1 as applicable), and no
   horizontal scroll or overlap appears.
7. **No flicker**: Hard-refresh the page and confirm no visible layout shift or flash of
   unstyled/mis-sized content before the final layout settles.

## Lint & build gates (required before commit, per `.husky/pre-commit`)

```bash
npm run lint
npm run build
```

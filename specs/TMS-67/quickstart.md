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
   - Resize the browser across the `md` (960px) breakpoint and confirm the lifecycle diagram swaps
     cleanly between the connector-line layout and the stacked grid with no overlapping content
     (corrected from `lg`/1140px — `/speckit.analyze` finding F1; the reference's own CSS swaps at 960px).
   - Click each of the page's 5 CTAs (talk to a construction tech expert, see solutions, schedule,
     email the team, and the integrations-strip has none) from a fresh page load and confirm none
     trigger a full browser navigation/reload — all are same-page anchors, `mailto:`, or standard
     Next.js links (FR-014, `/speckit.analyze` finding F2).
   - Navigate directly to `/construction#solutions` and confirm the page scrolls to the solutions
     section on initial load.
   - With OS-level "reduce motion" enabled (or by throttling CPU heavily), confirm all sections
     still become fully visible even if the reveal animation doesn't visibly run.

## UI Fidelity Audit (2026-07-23 — against `TechGrit Construction.dc.html`)

Per spec.md SC-006 and the Clarifications 2026-07-23 verification-method answer: open `TechGrit Construction.dc.html` (in a browser) and `http://localhost:3000/construction` side-by-side at desktop (≥1140px), tablet (~768–960px), and mobile (~375–430px) widths. Walk this checklist; any drift found is fixed directly in the named component (adding a `tokens.css` token first if a value has no existing equivalent) — see spec.md FR-016–FR-024 for the full acceptance detail behind each line.

- [X] **Global chrome (FR-016)**: Background is the dark ink surface (`rgb(10,24,34)`) with 3 blurred ambient orbs (top-right orange, mid-left **amber** — not blue, bottom-center amber); confirmed `/construction` renders its own page-local orbs (no blue-toned overlay found — the shared site-wide `AmbientOrbs` correctly renders nothing on this route per research.md §13). Verified via `javascript_tool` computed-style inspection.
- [X] **Hero (FR-017)**: Two-column layout (~1.05fr/0.95fr ratio confirmed) collapsing to one column + reordered visual below `md` (confirmed via computed `order` — image renders first); gradient-text "smarter, faster, safer" (amber→orange, confirmed); 3 proof-stat chips over the hero image (`<30d`, `1000s`, `24/7`, all present); real image asset loads; no horizontal overflow at mobile.
- [X] **Integrations strip (FR-018)**: Bordered bar (top+bottom `rgba(255,255,255,0.08)`), all 5 partner wordmarks present (Procore, Autodesk, Bluebeam, Newforma, Oracle Primavera), wraps (`flex-wrap`) on narrow screens with no horizontal overflow.
- [X] **Challenges (FR-019)**: 5-column → 2 → 1 grid; all 5 icons match the reference exactly (document, dollar, **people** [not a list icon], **alert-triangle** [not a shield], **eye-slash** [not a clock] — research.md §12, DONE T022). Header block left-aligned at 760px; grid is `sm:2col → md:5col` with no intermediate 3-col step; icon tile 40px, amber stroke; card padding `22px 20px`/gap 18px, left-aligned (not centered), no hover-lift (reference has none for this section); cards render via the new `constructionChallenge` GlassCard variant, 16px radius (DONE T035, T036, research.md §20, §21, §22).
- [X] **Solutions (FR-020)**: 3-column → 2 → 1 grid; all 6 icons match the reference exactly (**checkmark-in-box** [not document+check], **trending-arrow** [not bar-chart], mobile device, shield **with checkmark**, **database/cylinder** [not briefcase], **layered-stack** [not a 3D cube] — research.md §12, DONE T023); header left-aligned at 760px; gradient icon tile (amber→orange, 13px radius); lift(-6px) + amber-border hover effect; cards render via the new `constructionSolution` GlassCard variant, 18px radius (DONE T036, research.md §21, §22).
- [X] **Lifecycle diagram (FR-021)**: DONE T027. At `md:` and above (corrected from `lg:` — `/speckit.analyze` finding F1), the rebuilt diagram has literal geometry — asymmetric corner-clustered node positions (not evenly spaced), curved (not straight) amber→orange gradient connector lines animating at 7s, and the two-ring pulsing core — wrapped in a rounded/bordered glass panel with a decorative amber glow blob (research.md §11). Below `md:`, all 8 nodes stack in the 2-column fallback at its own distinct (more transparent) pill background.
- [X] **Advantage (FR-022)**: Asymmetric `0.8fr/1.2fr` two-column layout collapsing to one column below `md` (DONE T033); right column is a `border-t` + per-row `border-b` hairline-divided list of the 4 points, each with an **amber** two-digit index (`--color-amber-light`, was orange).
- [X] **Impact (FR-023)**: 3-column grid collapsing straight to 1 column below `md` (no 2-column tablet step, DONE T034); header left-aligned at 760px; 40px amber metric + 12.5px "Case Study 0X" label + lift(-6px)/amber-border hover; cards render via the new `constructionImpact` GlassCard variant, 20px radius, each wrapped in an `<a>` for click behavior (DONE T036, research.md §21, §22).
- [X] **Final CTA (FR-024)**: Centered glass panel, amber label (`rgb(247,183,51)`, confirmed), amber decorative glow (`rgba(245,158,11,0.28)`, confirmed — fixed 2026-07-24 via a new `tone="amber"` prop on the shared `FinalCta` component, research.md §19), "Book on Calendly →" primary CTA (`href="#"`, placeholder link) + "Email the team" secondary CTA (`mailto:` with prefilled subject). About Us's own Final CTA (same shared component, `tone="orange"` default) confirmed unchanged.

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

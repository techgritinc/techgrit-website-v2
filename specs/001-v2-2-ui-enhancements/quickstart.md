# Quickstart: Verifying Phase 1 — Shared Foundation

Scope: exactly 4 items. No page migrates to consume them in this slice, so verify in isolation.
No test framework exists in this repo — this is manual, plus `npm run lint`/`npm run build`.

## 1. Ghost button (`Button.tsx`)

1. Temporarily render `<Button variant="ghost">Test</Button>` anywhere (scratch page/sandbox).
2. Confirm the white-gradient fill, visible top inset highlight, and on hover: ~2px lift (no background/border brighten — deliberately lift-only, see research.md §1).
3. Confirm `primary`/`outline` variants are unchanged.
4. Confirm `about-us-hero.tsx`/`services-hero.tsx` (still on `.btn-ghost`) are visually unchanged —
   this slice must not touch them.

## 2. Eyebrow (`SectionEyebrow`)

1. Render `<SectionEyebrow>Test</SectionEyebrow>` — dash present (default unchanged).
2. Render `<SectionEyebrow showAccent={false}>Test</SectionEyebrow>` — no dash, no layout shift.
3. Confirm all 12 existing call sites (About, Construction, Services) are pixel-unchanged.

## 3. `FilterBar`

1. Mount `<FilterBar>` with a few chip children in a scratch page.
2. Confirm dark background, visible label, and sticks to the top on scroll.
3. Remove the scratch mount before committing.

## 4. `LifeGallery.tsx`

1. Open `/careers` → Life-at-TechGrit section: confirm a new "Inside TechGrit" badge (no dot).
2. Open `/` → Life-at-TechGrit section: confirm two action buttons now render.
3. Confirm both sections' photo grids, headings, and existing eyebrow are otherwise unchanged.

## 5. Gate check

1. `npm run lint` and `npm run build` — both green.
2. Diff should touch only: `components/ui/Button.tsx`, `components/ui/FilterBar.tsx` (new),
   `components/ui/section-eyebrow.tsx`, `app/_home-components/LifeGallery.tsx`, `app/tokens.css`,
   `app/globals.css` (only the new `@theme inline` token mappings) — plus the `reusable-components/`
   → `components/ui/` relocation of `section-eyebrow.tsx`, `final-cta.tsx`, `ambient-orbs.tsx`,
   `reveal-on-scroll.tsx` and the resulting import-path updates in their 23 consumers (already done).

---

# Quickstart Addendum: Verifying Phase 2 — Homepage Hero & Trusted Clients

Scope: only `Hero.tsx`, the new `TrustedClients.tsx`, and `app/page.tsx`'s render order. No test
framework exists in this repo — this is manual, plus `npm run lint`/`npm run build`.

## 6. Hero (`app/_home-components/Hero.tsx`) — REVISED

1. Open `/` at desktop width (≥1140px).
2. Confirm there is exactly one badge above the h1 (the "Live Webinar" badge) — the second
   "AI-First Software Development Partner" badge with the blinking green dot is gone.
3. Confirm the Live-Webinar badge shows a small green dot with a looping ripple ring around it (not
   a static dot), and that the badge's overall size (padding, rounded gradient chip, border, blur)
   visibly differs from the app's other small generic badges elsewhere on the site.
4. Confirm the tagline, paragraph, CTA row, and stat row are all left-aligned inside a ~780px-wide
   column — not centered — while that column itself still sits inside the page's centered
   max-width container (compare against `TechGrit Homepage.dc.html` lines 312-345).
5. Confirm there is no "Scroll" chevron below the CTA/stat content.
6. Confirm the h1 ("Software is no longer built. It's orchestrated.") has no unusually tight line
   spacing between its two lines — it should read at the same 62px/1.02-line-height rhythm as every
   other page's h1 (no per-instance override).
7. Confirm the stat numbers render with: "10" white + "X" amber, both at the same (larger) size;
   "6" gradient-colored + " weeks" amber and visibly smaller than "6"; "zero" plain white. Confirm
   "X" and " weeks" sit on the same text baseline as their digit, not shifted upward.
8. Confirm the "View the OrbitAI™ Methodology" ghost button still shows Phase 1's white-gradient
   glass styling (unchanged by this phase).
9. Confirm the "Trusted by our clients" strip no longer renders inside the hero section (the hero
   `<section>` now ends right after the stat row).

## 7. Trusted Clients (`app/_home-components/TrustedClients.tsx`) — REVISED

1. Open `/` and scroll just past the hero — confirm a new, distinct section (black background,
   thin top divider) shows the centered "Trusted by our clients" label.
2. Confirm all 6 client logos still render on their current white rounded cards with the existing
   hover-lift shadow — no grayscale/dimmed-at-rest treatment (that reference pattern is
   intentionally not adopted, see spec.md Clarifications).
3. At desktop width, confirm the strip displays statically (no scrollbar, no horizontal overflow,
   no edge fade) since the 6 logos fit within the container.
4. Shrink the browser width (or temporarily add a 7th/8th logo to `TRUSTED_CLIENT_LOGOS` and revert
   after) until the logos exceed the container — confirm the strip becomes horizontally scrollable
   with a right-edge fade cue, at whatever width the overflow actually starts (not only below a
   fixed mobile breakpoint).
5. Confirm Tab-focusing into the strip then using arrow keys scrolls it when it's in the
   scrollable state.
6. Confirm `app/page.tsx` renders this section between `<Hero />` and `<SubscribeBand />`.

## 8. Live-Webinar badge via `components/ui/Badge.tsx` (revised, mandatory per direct instruction)

1. Confirm `app/_home-components/Hero.tsx` imports `Badge` from `@/components/ui/Badge` and the
   inner gradient chip renders as `<Badge tone="live" size="lg">...</Badge>`, not a raw `<span>`
   with an inline class string.
2. Confirm `components/ui/Badge.tsx` exports a `size?: "sm" | "lg"` prop and a `tone: "live"`, and
   that every *other* `Badge` call site in the app (About, Careers, LifeGallery, etc.) still renders
   identically — `size` defaults to `"sm"`, an exact extraction of the component's pre-existing
   sizing, so no other consumer's output changes.
3. Confirm the rendered chip is pixel-identical to before the refactor: background gradient, text
   color, padding, font-size, letter-spacing, box-shadow, gap, and border-radius all unchanged
   (verify via computed styles, not just visual inspection).

## 9. Gate check (Phase 2)

1. `npm run lint` and `npm run build` — both green.
2. Diff should touch: `app/_home-components/Hero.tsx`, `app/_home-components/TrustedClients.tsx`
   (new), `app/_home-components/home-data.ts`, `app/page.tsx`, `app/tokens.css`, `app/globals.css`
   (the new `@theme inline` token mappings, the new `tgLiveRipple` keyframe, and the FR-045 dead-rule
   removal), and `components/ui/Badge.tsx` (new `size` prop + `live` tone — the one shared-component
   change in this addendum, made mandatory by direct instruction; verify it's non-breaking for every
   other `Badge` consumer). No other homepage section, no other page, and no other shared component
   (`Button.tsx`, `MediaSlot.tsx`) changes.

## 10. Subscribe Band (`app/_home-components/SubscribeBand.tsx`) — Phase 2 addendum, FR-005

Scope: only `app/_home-components/SubscribeBand.tsx`. No test framework exists in this repo — this
is manual, plus `npm run lint`/`npm run build`.

1. Open `/` at desktop width (≥1140px) and scroll to the subscribe band (below Trusted Clients).
2. Confirm the section's container is visibly as wide as the Trusted-Clients section directly above
   it (both now `1280px` max-width) — no longer visibly narrower.
3. Confirm there is no subtle background tint or thin top border on the subscribe band's outer
   section — the same black page background from the Trusted-Clients section continues underneath
   it, uninterrupted.
4. Confirm the glass card itself (background, border, rounded corners, blur, shadow) is unchanged
   from before this pass — only its container's width/padding around it changed.
5. Confirm the Name input and Business Email input sit on one row that spans the full width of the
   card's right column, with the Email input visibly about twice as wide as the Name input (not two
   fixed-width boxes with a gap after them) — resize the browser narrower and confirm both inputs
   shrink together rather than one hitting a fixed width first.
6. Confirm both inputs and the Submit button are visually the same height (previously the button read
   shorter than the inputs).
7. Confirm the Submit button's gradient background, text, and arrow icon are unchanged from before
   this pass — only its padding/height changed.
8. At a narrow (mobile) width, confirm the input/button row wraps or stacks normally per existing
   responsive behavior, and the section still does not scroll horizontally.
9. Submit the form with an empty name, then an invalid email, then valid values — confirm the
   existing client-side error/success behavior (unchanged by this pass) still works exactly as
   before.

## 11. Gate check (Subscribe Band)

1. `npm run lint` and `npm run build` — both green.
2. Diff should touch only: `app/_home-components/SubscribeBand.tsx`. No token file
   (`app/tokens.css`, `app/globals.css`), no other homepage section, no other page, and no shared
   component (`Button.tsx`, `FormField.tsx`) changes.

## 12. Methodology / "How We Deliver" (`app/_home-components/MethodologySection.tsx`) — Phase 2 addendum, FR-006

Scope: only `app/_home-components/MethodologySection.tsx` and 4 new exports in
`components/ui/icons.tsx`. No test framework exists in this repo — this is manual, plus
`npm run lint`/`npm run build`.

1. Open `/` at desktop width (≥1140px) and scroll to "How We Deliver."
2. Confirm the eyebrow ("How we deliver") shows no leading dash/symbol.
3. Confirm each of the 4 top-rail step markers shows a distinct icon (not a numeral) — Architect,
   Agentic Build, Industrialize, and Impact each look visually different from one another, inside
   the existing 58px circle.
4. Confirm the phase-detail panel's large visual (right column) shows a circular gradient badge with
   an icon inside it — not a giant numeral — and that the icon matches the icon shown in the
   currently-active top-rail step exactly (scroll to change the active phase and confirm the icon
   changes to match each time).
5. Confirm the "Phase 0{n}" label in the bottom-right corner of that visual panel is still present
   and unchanged.
6. Confirm the phase title ("Architect", "Agentic Build", etc.) and week label ("Week 1", "Weeks 2
   to 4", etc.) render in the site's normal display font — not a visibly different font (Arial) from
   the rest of the page.
7. Confirm the section's overall content column is visibly as wide as the Trusted Clients/Subscribe
   Band sections above it (all now `1280px` max-width).
8. Shrink the browser to a tablet/mobile width (≤960px) and confirm the phase-detail panel's
   two-column layout (description text + visual) collapses to a single stacked column instead of
   staying artificially squeezed side-by-side.
9. Confirm the scroll-pinned behavior itself (the section pins while scrolling through it, the phase
   rail's progress fill animates, the active phase's description/deliverables swap) is unchanged from
   before this pass.
10. Confirm the homepage still renders identically to before this refactor — `MethodologySection` now
    receives `phases`/`eyebrow`/`heading` as props from `app/page.tsx` instead of importing
    `home-data.ts` internally (each phase in `phases` now also carries its own `icon` field, read as
    `phase.icon`/`active.icon` — no separate icon lookup), but this is an internal wiring change only;
    there should be zero visual or behavioral difference caused by the refactor itself (verify via
    `git diff` that `app/page.tsx` passes the exact same `METHODOLOGY_PHASES` data through, unchanged).

## 13. Gate check (Methodology)

1. `npm run lint` and `npm run build` — both green.
2. Diff should touch only: `components/ui/icons.tsx` (4 new icon exports),
   `app/_home-components/home-data.ts` (`MethodologyPhase` gains a required `icon: IconComponent`
   field, populated per phase — no other field changes), `app/_home-components/
   MethodologySection.tsx` (icon/eyebrow/width/collapse/font fixes, plus the props refactor reading
   `phase.icon`/`active.icon`), and `app/page.tsx` (passes `phases`/`eyebrow`/`heading` props into
   `<MethodologySection>`). No token file (`app/tokens.css`, `app/globals.css`), no other homepage
   section, no other page. No `/frameworks` route, page, or nav change — that
   page remains out of scope (spec.md Assumptions).

## 14. "Don't Migrate / Re-Imagine" grid (`app/_home-components/ReImagineSection.tsx`) — Phase 2 addendum, FR-007

1. Open `/` at desktop width and scroll to "Don't Migrate. Re-Imagine."
2. Confirm all 3 top cards show the exact same icon (not 3 different icons as before).
3. Confirm each of the 3 top cards shows its real image (Copilot→Agentic, Tech Debt, Scalability
   respectively, sourced from `public/samples/`) — not a "Coming soon" placeholder.
4. Hover each of the 3 top cards — confirm a subtle orange background tint appears, in addition to
   the existing lift/border/glow.
5. Confirm the 4th "card" (the "Why AI-First Matters" panel) shows the TechGrit mark icon in place of
   the lightning-bolt icon, and that hovering it does nothing at all (no lift, no border change, no
   background tint) — unlike the 3 cards above it.
6. Confirm the comparison bars (Traditional Development vs. OrbitAI™ Delivery) are unchanged.

## 15. Gate check (Re-Imagine Grid)

1. `npm run lint` and `npm run build` — both green.
2. Diff should touch only: `app/tokens.css` (4 new tokens), `app/globals.css` (their `@theme inline`
   mappings, plus the drive-by mapping of `--color-border-orange-medium`), `components/ui/icons.tsx`
   (2 new icon exports), `components/ui/GlassCard.tsx` (2 new variants), `app/_home-components/
   home-data.ts` (`DifferentiatorPoint` field changes), and `app/_home-components/
   ReImagineSection.tsx`. No other homepage section, no other page —
   `app/_home-components/CaseStudiesSection.tsx` (a `GlassCard variant="reimagine"` consumer) must
   render unchanged.

## 16. Homepage Industries section (`app/_home-components/IndustriesSection.tsx`) — Phase 2 addendum, FR-008

Scope: only `IndustriesSection.tsx`, its `industry` variant of `GlassCard.tsx`, and `home-data.ts`'s
`INDUSTRY_CARDS`. This is **not** `/construction` — verify that page separately, unaffected by this
pass. No test framework exists in this repo — this is manual, plus `npm run lint`/`npm run build`.

1. Open `/` at desktop width (≥1140px) and scroll to the Industries section (directly after "Don't
   Migrate. Re-Imagine.").
2. Confirm the "Explore Industry Solutions" ghost button's computed padding is `16px` vertical /
   `26px` horizontal (`/speckit.analyze` finding M2: the button's own `className` override changed from
   `px-6!`/24px, which was silently 2px narrower than correct, to `py-4!`/16px — verify both dimensions,
   not just that the button "looks the same as before").
3. Confirm none of the 3 cards (FinTech, Healthcare, Construction) shows a photo any longer — each
   card shows only a large colored circular icon badge (violet/FinTech, green/Healthcare, blue/
   Construction), a title, and a description.
4. Confirm each icon badge's icon is a distinct shape from the other two, rendered in white on its
   colored circle — not the same icon shape used in the site's nav "Industries" mega-menu (open the
   nav mega-menu separately and confirm its icons are unchanged from before this pass).
5. Confirm each card's title renders at 26px, not the pre-fix 23px (`/speckit.analyze` finding H1 —
   measure via computed styles, not just visual impression, since a ~3px delta is easy to miss by eye).
6. Confirm each card's description renders at `rgba(255,255,255,0.6)`, not the pre-fix inherited
   `rgba(255,255,255,0.72)` (`/speckit.analyze` finding H2 — again, measure via computed color, since
   a 0.12 opacity delta is subtle on dark text).
7. Hover the FinTech and Healthcare cards — confirm neither lifts, shows a border-color change, nor
   shows a pointer cursor (no click affordance).
8. Hover the Construction card — confirm it lifts, shows a blue border-color and glow, shows a
   pointer cursor, and clicking anywhere on the card (not just its old inline text link) navigates to
   `/construction`.
9. Confirm the card's border-radius, background, padding, and icon-to-title spacing match
   `TechGrit Homepage.dc.html` lines 586-602 (20px radius, ~0.09 border, ~0.03 background fill, 30px/
   34px padding, 44px icon-to-title gap).
10. Confirm the section's heading and intro paragraph above the cards are unchanged from before this
    pass.

## 17. Gate check (Industries Section)

1. `npm run lint` and `npm run build` — both green.
2. Diff should touch only: `app/tokens.css` (3 new border tokens, 3 new shadow tokens, 1 new tracking
   token — `--ls-title-tight`, deliberately not `--ls-tight-01`, to avoid confusion with the existing
   `--ls-01` — and 1 new font-size token, `--text-industry-title`, deliberately not a reuse of
   `--text-stat`), `app/globals.css` (their `@theme inline` mappings), `components/ui/icons.tsx` (3 new
   icon exports: `IndustryFinTechIcon`, `IndustryHealthcareIcon`, `IndustryConstructionIcon` — the
   existing `FinTechIcon`/`HealthcareIcon`/`ConstructionIcon` exports are untouched), `components/ui/
   GlassCard.tsx` (`industry` variant's 4 `Record` entries edited in place — `CARD_VARIANTS`,
   `ICON_VARIANTS`, `TITLE_VARIANTS`, and `DESC_VARIANTS`), `app/_home-components/home-data.ts`
   (`IndustryCard` loses `image`, gains `iconBg`, `icon` repointed), and `app/_home-components/
   IndustriesSection.tsx` (icon-badge rendering, photo removal, Construction-only link, ghost-button
   `className` correction). No other homepage section, no other page — `components/layout/
   nav-config.ts` and its rendered mega-menu must be pixel-unchanged, `Button.tsx`'s shared `md` size
   must be untouched (verify other `md`-sized buttons sitewide are unaffected), and `/construction`'s
   own hero/challenges/impact/CTA sections (FR-016–FR-021) must be unaffected.

## 18. Homepage Testimonials section (`app/_home-components/TestimonialsSection.tsx`) — Phase 2 addendum, FR-009/FR-009a

Scope: only `TestimonialsSection.tsx`, `home-data.ts` (`Testimonial.id` retrofit), `components/ui/
icons.tsx` (1 new export), and `tokens.css`/`globals.css`. No other homepage section, no other page. No
test framework exists in this repo — this is manual, plus `npm run lint`/`npm run build`.

1. Open `/` at desktop width (≥1140px) and scroll to "Trusted by forward-thinking teams."
2. Confirm the eyebrow, title, and supporting paragraph are all left-aligned inside one shared column
   (not centered) — including the paragraph, which was centered before this pass.
3. Confirm a trust-metrics card (500+ Projects delivered / 100% Would refer / 6wk Avg. time to value,
   separated by 2 vertical dividers) renders to the right of that text column, in the same row —
   narrow the viewport and confirm it wraps to stack below the text column rather than overlapping it
   or staying absolutely pinned to a corner.
4. Hover a **video** testimonial card — confirm it lifts, and confirm its box-shadow is the wider/
   stronger shape (`0 24px 60px -20px`, 60% orange opacity) distinct from the text card's hover shadow
   (next step). Confirm the card shows a duration badge (`⏱ 2:14`) next to its VIDEO label, a 5-star
   rating (previously entirely absent from this card — `/speckit.analyze` finding C1), and a large faint
   quotation-mark watermark behind its quote text. Confirm it does **not** show a verified badge
   anywhere.
5. Hover a **text** testimonial card — confirm it lifts, its border color shifts to a visible orange
   tint, and its box-shadow is the narrower/softer shape (`0 24px 54px -20px`, 28% orange opacity).
   Confirm the card shows a green "Verified" badge with a checkmark, positioned in the same row as the
   5-star rating, and a smaller faint quotation-mark watermark behind its quote text. Confirm it does
   **not** show a duration badge or play affordance anywhere.
6. Confirm the text card's avatar circle (initials, gradient background) now has a visible drop shadow
   beneath it, distinct from the flat/shadowless avatar before this pass.
7. Confirm the track shows edge fades on **both** sides now (previously right-side only) — the left
   fade should read visibly lighter/narrower than the right fade, not symmetric.
8. Press and hold the mouse button on the track and drag — confirm the cursor changes from an open
   hand (`grab`) to a closed hand (`grabbing`) for the duration of the hold, and reverts to the open
   hand on release. Confirm cards don't snap/jump mid-drag (scroll-snap is suspended while held) but do
   snap to the nearest card once released.
9. Confirm the "Drag to explore more stories" hint row and the video lightbox modal (click a video
   card, confirm it opens; click the close button or the backdrop, confirm it closes) are unchanged
   from before this pass.
10. Inspect React DevTools (or the rendered DOM's diffing behavior) and confirm both `TESTIMONIALS`
    render sites key on `testimonial.id`, not `testimonial.name` (`/speckit.analyze` finding C2).

## 19. Gate check (Testimonials Section)

1. `npm run lint` and `npm run build` — both green.
2. Diff should touch only: `app/tokens.css` (7 new tokens — `--gradient-testimonial-card`,
   `--gradient-testimonial-edge-left`, `--shadow-testimonial-hover-video`,
   `--shadow-testimonial-hover-text`, `--shadow-testimonial-avatar`, `--color-badge-ink-40`, and
   `--radius-16` — plus 1 value correction, `--gradient-testimonial-video`'s first stop `0.92` → `0.88`
   [`/speckit.analyze` finding H1], and 1 rename, `--color-badge-ink-45` → `--color-badge-ink-50` with
   its value corrected `0.45` → `0.50`), `app/globals.css` (matching `@theme inline` mappings, including
   the renamed key), `components/ui/icons.tsx` (1 new export: `QuoteIcon` — `ClockIcon`/`CheckIcon`
   reused as-is, not modified), `app/_home-components/home-data.ts` (`Testimonial` gains a required
   `id` field, `/speckit.analyze` finding C2), and `app/_home-components/TestimonialsSection.tsx`
   (header restructure, both `.map()` sites re-keyed on `testimonial.id`, both card types' new elements
   — including the video card's previously-missing star rating [finding C1] — edge fades, drag
   handlers). No other homepage section, no other page — confirm `--color-badge-ink-50`'s only consumer
   is this file (the rename must not silently affect any other component).

## 20. Homepage Blog teaser section (new `app/_home-components/BlogSection.tsx`) — Phase 2 addendum, FR-010

Scope: new `BlogSection.tsx`, plus `components/ui/icons.tsx` (3 new exports), `components/ui/GlassCard.tsx`
(1 new variant), `app/tokens.css`/`globals.css`, and `app/page.tsx`'s render order. No other homepage
section, no other page, no change to `app/blog/_data/blog-content.ts` or `/blog` itself. No test
framework exists in this repo — this is manual, plus `npm run lint`/`npm run build`.

1. Open `/` at desktop width (≥1140px) and scroll past the homepage's Case Studies preview section to
   the new "From the blog" section.
2. Confirm the eyebrow ("From the blog") and heading ("Perspectives on AI-first delivery.") are
   left-aligned, and a ghost button ("Visit the blog →") is right-aligned in the same row, wrapping
   below the text on narrow widths.
3. Confirm exactly 3 cards render, each with: a colored gradient header block (orange/blue/teal) with a
   centered decorative icon (constellation / code-bracket / package), a topic label + dot + read-time
   meta row, a title, a description, and a "Read more →" link in the card's own topic color.
4. Confirm the 3 cards' content — topic ("AI-First SDLC"/"Engineering"/"Quality"), titles, excerpts, and
   read-times — matches `TechGrit Homepage.dc.html` (lines 785-821) exactly, and does **not** match any
   of the 9 real posts' titles/topics on `/blog` (confirming the content is static/reference-exact, not a
   dynamic pull).
5. Hover each card — confirm it lifts (`-6px`), its border tints to its own color (orange/blue/teal), and
   its glow shadow widens/brightens (distinct from its resting-state shadow).
6. Click anywhere on a card (not just its "Read more" text) — confirm it navigates to `/blog`. Click the
   "Visit the blog" ghost button — confirm it also navigates to `/blog`.
7. Narrow the viewport to tablet/mobile (`md`/`sm`) — confirm the 3-card grid collapses to a single
   column and the header row's ghost button wraps below the eyebrow/heading without overlapping.
8. Confirm the section renders between the homepage's Case Studies preview section and "Life at
   TechGrit," and that no other homepage section shifted position or content.

## 21. Gate check (Blog Teaser Section)

1. `npm run lint` and `npm run build` — both green.
2. Diff should touch only: `app/tokens.css` (15 new tokens across Text Colors/Borders & Glass/Gradients/
   Typography/Shadows — see research.md §16 for the full list), `app/globals.css` (their `@theme inline`
   mappings, plus 2 previously-missing spacing mappings, `--spacing-tg-6`/`--spacing-tg-10`, for
   pre-existing tokens that had no canonical utility before now), `components/ui/icons.tsx` (3 new
   exports: `BlogConstellationIcon`, `BlogCodeBracketIcon`, `BlogPackageIcon`), `components/ui/GlassCard.tsx`
   (1 new `"blogTeaser"` variant added across all 4 `Record`s — the existing `"blogCard"`/`"blogFeatured"`
   variants and their consumers on `/blog` are untouched), new `app/_home-components/BlogSection.tsx`, and
   `app/page.tsx` (`<BlogSection />` render call). No other homepage section, no other page —
   `app/blog/_data/blog-content.ts`, `app/blog/_components/blog-post-grid.tsx`, and every other `/blog`
   file must be pixel- and byte-unchanged.

## 22. Homepage Life at TechGrit section (`app/_home-components/LifeGallery.tsx`, `home` branch) — Phase 2 addendum, FR-011

Scope: `LifeGallery.tsx`'s `home` branch only, plus caption content in `app/_home-components/home-data.ts`
and 2 new tokens in `app/tokens.css`/`globals.css`. The recreated `careers` branch (and `/careers`, which
consumes it) does not change in this pass. No test framework exists in this repo — this is manual, plus
`npm run lint`/`npm run build`.

1. Open `/` at desktop width (≥1140px) and scroll to the "Inside TechGrit" / "Life at TechGrit." section.
2. Confirm the eyebrow ("Inside TechGrit") renders as plain uppercase orange text with **no** leading
   accent line/dash before it (previously a small `2px`-tall orange line preceded the text).
3. Confirm the photo grid shows exactly 4 tiles in a single uniform row (not 3 columns of mixed
   widths/heights), each the same size, each with rounded corners and a faint visible border.
4. Hover each tile in turn — confirm a caption reveals at the tile's bottom over a dark fade: an amber
   category label ("The team" / "The office" / "Craft" / "Together", matching each tile's photo) above a
   white caption sentence, and confirm the tile lifts slightly (`-4px`) while hovered. Confirm the caption
   is invisible before hover and disappears again on mouse-leave.
5. Confirm the two buttons below the grid — "Explore Careers" (solid gradient, links to `/careers`) and
   "Meet the team" (ghost/glass, links to `/about`) — are present and unchanged from before this pass.
6. Narrow the viewport to tablet width (`md`, <960px) — confirm the grid collapses to 2 columns; narrow
   further to mobile width (`sm`, <560px) — confirm it collapses to a single column. At both widths,
   confirm captions still reveal correctly on tap/hover and tiles keep their aspect ratio (no stretching
   or squashing).
7. Open `/careers` and scroll to its own "Life at TechGrit" section — confirm it renders exactly as
   before this pass (4-column grid, its own tile radius, no captions revealing on hover) — this section
   must show **zero** visible change as a result of this addendum.

## 23. Gate check (Life at TechGrit Section)

1. `npm run lint` and `npm run build` — both green.
2. Diff should touch only: `app/tokens.css` (2 new tokens — `--gradient-life-cap`, `--ls-life-cap`),
   `app/globals.css` (their `@theme inline` mappings), `app/_home-components/home-data.ts`
   (`CULTURE_GALLERY_IMAGES` gains populated `captionLabel`/`caption` values on all 4 entries — the
   fields themselves already exist from the baseline recreation), and `app/_home-components/
   LifeGallery.tsx`'s `home` branch (eyebrow migrated to `SectionEyebrow`, grid rewritten to a uniform
   4-column shape, tiles gain the bordered/captioned treatment). The `careers` branch inside the same
   file, `components/ui/section-eyebrow.tsx` itself, `app/page.tsx`, and every other homepage section or
   page must be pixel- and byte-unchanged — confirm `/careers` in particular shows no visual diff (step
   22.7 above).

## 24. Homepage Final CTA section (`app/_home-components/FinalCta.tsx`) — Phase 2 addendum, FR-012

Scope: `FinalCta.tsx`'s outer container and secondary link only, plus 1 new token in
`app/tokens.css`/`globals.css`. No other homepage section, no other page. No test framework exists in
this repo — this is manual, plus `npm run lint`/`npm run build`.

1. Open `/` at desktop width (≥1140px) and scroll to the final "Ready to build at the speed of thought?"
   CTA card.
2. Measure (via devtools) the outer wrapper around the card — confirm its `max-width` is now `1280px`
   (previously `1180px`), matching the width of every other homepage section's container.
3. Confirm the card itself (background, border, radius, blur, the bottom orange glow, the eyebrow,
   heading, paragraph, and the "Schedule an OrbitAI Demo" gradient button) looks unchanged from before
   this pass — only the outer container width and the secondary link below the button are affected.
4. Inspect the secondary link ("Or explore our 6-week framework →") at rest — confirm its font-size is
   `14.5px` (previously `15.5px`) and its text color is a dimmed white, not solid white as before.
5. Hover the link — confirm its text color brightens to solid white, with a smooth transition (not an
   instant snap), and confirm its underline is present at a visibly softer orange tint than before this
   pass.
6. Confirm the link's text reads exactly "Or explore our 6-week framework →" (previously "Explore how
   our 6-week framework can accelerate your next big bet →").
7. Narrow the viewport to tablet/mobile widths — confirm the card and both CTAs still center correctly
   and wrap/stack without overlap, matching their pre-existing responsive behavior (unchanged by this
   pass).

## 25. Gate check (Final CTA Section)

1. `npm run lint` and `npm run build` — both green.
2. Diff should touch only: `app/tokens.css` (1 new token — `--color-text-cta-link`), `app/globals.css`
   (its `@theme inline` mapping), and `app/_home-components/FinalCta.tsx` (outer container width, the
   secondary link's typography/hover/underline classes, and its text content). No other homepage
   section, no other page — the card's own background/border/radius/blur, the eyebrow/heading/paragraph,
   and the primary button must be pixel- and byte-unchanged.

---

# Quickstart Addendum: Verifying "Skip the Form" Card (Contact, User Story 9)

Scope: only the new card in `app/(marketing)/contact/_components/contact-hero-form.tsx`'s left
column, plus its supporting icon and token. No test framework exists in this repo — this is manual,
plus `npm run lint`/`npm run build`.

## 12. "Skip the Form" card (`contact-hero-form.tsx`)

1. Open `/contact` at desktop width and confirm a new card renders in the left column, directly
   below the "Where we work" contact-info row.
2. Confirm the card shows: a calendar-icon chip, an amber uppercase "Skip the form" label, "Book a
   30-min discovery call now." body copy, and a "Book a call" button with a gradient background
   matching the existing "Send message"/CTA buttons elsewhere on the page.
3. Confirm the card's own background is a subtle diagonal orange-to-transparent gradient (not a flat
   fill), matching `TechGrit Contact.dc.html` lines 249-258.
4. Click "Book a call" and confirm **no** Calendly widget/popup opens and no network request to
   `calendly.com` fires (check the Network tab) — the button is a static placeholder, per spec.md
   Clarifications Session 2026-08-07.
5. Confirm the existing contact form (topic chips, Full name/Work email/Company/message fields,
   Send message button, and the sent/success state) is visually and behaviorally unchanged.
6. Resize to tablet and mobile widths and confirm the card wraps/stacks normally with no horizontal
   overflow, consistent with the rest of the left column.

## 13. Gate check (Contact — Skip the Form)

1. `npm run lint` and `npm run build` — both green.
2. Diff should touch only: `app/(marketing)/contact/_components/contact-hero-form.tsx`,
   `app/(marketing)/contact/_components/icons.tsx` (+1 icon), and `app/tokens.css` (+1 gradient
   token, no `globals.css` entry needed). No other Contact file, no other page, and no shared
   component beyond consuming the existing `components/ui/Button` primitive as-is (no edit to
   `Button.tsx` itself).

---

# Quickstart Addendum: Verifying About Us Page — Badge, Eyebrow & Culture-Gallery Grid Alignment (User Story 7)

Scope: only the hero badge's dot, the page's `SectionEyebrow` accent symbols, and the culture-photo
gallery's grid (`about-us-culture-gallery.tsx`, delegating to `LifeGallery.tsx`). No test framework
exists in this repo — this is manual, plus `npm run lint`/`npm run build`.

## 14. Badge, eyebrows, and culture gallery (`/about`)

1. Open `/about` at desktop width and confirm the "About TechGrit" hero badge shows no dot — just the
   uppercase label text.
2. Scroll through the page and confirm every eyebrow ("Who you are", "Our role", "What we stand
   for", "How we work", "If we partner together") shows no leading dash before the label.
3. Scroll to "Life at TechGrit" and confirm the eyebrow reads "Inside TechGrit" with no leading dash,
   and the heading/description match `TechGrit About.dc.html` ("Life at TechGrit." / "The people and
   the culture behind the engineering.").
4. Confirm the gallery shows 4 equal-size photo tiles in a 4-column grid — no tile spans 2 columns or
   2 rows (the previous `tall`/`wide` mosaic is gone) — and every tile shows a real photo, not a
   "Coming soon" placeholder.
5. Hover each tile and confirm a caption reveals (e.g. "The team" / "Builders and designers behind
   the engineering.") — matching the same captions already shown on `/careers`'s Life at TechGrit
   section.
6. Resize to tablet width (~768-920px) and confirm the grid collapses to 2 columns; resize to mobile
   width (≤560px) and confirm it collapses to 1 column — no horizontal overflow at either width.
7. Confirm no "Explore Careers" / "Meet the team" buttons render below this gallery on `/about` (those
   are `home`-variant-only).
8. Open `/` and `/careers` and confirm their own Life at TechGrit galleries are visually unchanged —
   the `LifeGallery.tsx` `src`-type widening introduced no regression on either.

## 15. Gate check (About)

1. `npm run lint` and `npm run build` — both green.
2. Diff should touch only: `app/about/_components/about-us-hero.tsx`, `app/about/_components/
   about-how-we-work.tsx`, `app/about/_components/about-us-our-role.tsx`, `app/about/_components/
   about-us-partner.tsx`, `app/about/_components/about-us-values.tsx`, `app/about/_components/
   about-us-who-you-are.tsx`, `app/about/_components/about-us-culture-gallery.tsx`,
   `app/about/_data/about-us-content.ts`, `app/about/_data/types.ts`, and
   `app/_home-components/LifeGallery.tsx` (the `src` type widening only — no visual change to its
   `home`/`careers` variants). No `tokens.css`/`globals.css` edit, no other About file, no other
   page, and no other shared component touched.

## 16. Case Studies hub & detail (`/case-studies`, `/case-studies/[slug]`)

1. Open `/case-studies` at desktop width and confirm the 3 background ambient orbs: the top-right orb
   reads as orange (not blue), and the other two (lower-left, bottom-center) are unchanged from
   today — all three should look like a single coherent warm/cool orb set, matching
   `TechGrit Case Studies.dc.html`.
2. Hover the featured card (top banner) and confirm it lifts and its border tints toward its accent
   color (e.g. blue for a FinTech card) — this border-color change is correct and expected, not a
   regression. Hover a grid card below and confirm the same lift + border-brighten treatment.
3. Confirm the hero's "Case Studies" badge still shows its blue glowing dot — this page's badge
   correctly keeps its dot (unlike Services/Blog/About).
4. Scroll to the filter bar (below the featured card) and confirm it shows a dark, blurred background,
   a "Filter" label, and chips reading All / FinTech / Marketplace / AI Enablement / Design — no
   "Featured" chip. Continue scrolling and confirm the bar sticks to the top of the viewport (just
   below the header) while the grid scrolls beneath it, and the featured card above it has already
   scrolled out of view.
5. Click a category chip (e.g. "FinTech") and confirm: the grid re-filters to only matching cards with
   no page reload or navigation; the featured card does NOT disappear, regardless of its own category,
   since it stays outside the filterable set by design.
6. Click a chip with no matching grid entries is not possible today (every chip has at least one
   match) — instead, verify the "no results" path by temporarily confirming the reset control exists:
   click "All" after any other chip and confirm the full grid returns.
7. Open a case-study detail page (e.g. via "View Case Study") and confirm its 2 background orbs: a
   top-right orange orb (same as the hub page's first orb) and a second, amber-toned orb positioned
   around a third of the way down the left edge — both should read as warm-toned, not the previous
   teal/blue pair.
8. Scroll to the closing CTA on both the hub and a detail page and confirm: the card's background
   reads as a translucent dark glass panel (not solid black) with a soft blur, and the "Get in Touch"
   control renders through the shared button styling (gradient fill, lift-on-hover) at the reference's
   `15px 30px` padding / `52px` height.

## 17. Gate check (Case Studies)

1. `npm run lint` and `npm run build` — both green.
2. Diff should touch only: `app/case-studies/page.tsx` (orb 1 color fix, filter-section wiring),
   `app/case-studies/[slug]/page.tsx` (both orbs rebuilt), `app/case-studies/_components/
   case-studies-final-cta.tsx` (background + Button swap), `app/case-studies/_data/
   case-studies-content.ts` (+`CASE_STUDY_CATEGORIES`), two new files
   (`app/case-studies/_components/case-studies-filters.tsx`,
   `app/case-studies/_components/case-studies-filter-section.tsx`), and `app/tokens.css`/
   `app/globals.css` (+1 token pair, `--color-overlay-amber-light-10`). No other Case Studies file
   (`case-study-detail-hero.tsx`, `metrics-strip.tsx`, `case-study-narrative.tsx`,
   `architecture-diagram.tsx`, `team-panel.tsx`, `related-case-studies.tsx`, `case-studies-grid.tsx`,
   `featured-case-study.tsx`), no `components/ui/FilterBar.tsx` or `components/ui/Button.tsx`, no
   other page, and no other shared component touched.

## 18. Services accordion & hero Button component (`/services`)

1. Open `/services` at desktop width and confirm the accordion's intro block renders above the 3 cards:
   a centered "Our services" eyebrow, "Three services. One AI-first engine." heading, and "Click any
   service to expand and see the full delivery approach." subheading — none of this exists before this
   slice lands.
2. Confirm the first card ("01 · UI/UX Design") renders already expanded (image, description, and the
   "Our approach" 6-step list visible) while the other two ("02 · Software Product Engineering",
   "03 · Quality Engineering") render collapsed (header only, no body visible).
3. Click "02 · Software Product Engineering"'s header and confirm: it expands to show its description,
   image, and 6-item capability grid; "01" simultaneously collapses (single-open — at no point are two
   cards expanded together). Click "02" again and confirm it collapses, leaving all 3 cards collapsed.
4. Confirm the currently-open card's border and shadow show the reference's brand-orange highlight
   (`rgba(232,119,34,0.35)` border, soft orange glow) — this is correct even for "01" (blue-accented)
   and "03" (teal-accented) when open; the highlight is never accent-color-matched, per the reference's
   own hardcoded behavior.
5. Hover a collapsed card's header and confirm no visual change occurs at all (no background tint, no
   border change, no lift) — only the cursor becomes a pointer. Then open a card and hover one of its
   inner "Our approach" steps or capability-grid tiles and confirm that item lifts slightly with a
   border-color brighten (no background-color change) — this nested-item hover is correct and
   unchanged.
6. Resize the browser across the `md`/`lg` breakpoint boundaries (desktop → tablet → mobile and back)
   while a card is expanded and confirm it stays expanded throughout — its rendered height should
   adjust smoothly with no clipped/cut-off content and no forced collapse.
7. Confirm both hero buttons ("Schedule a Consultation", "Explore Services") render through the shared
   `Button` component's classes (gradient-fill primary, translucent-glass ghost with lift-on-hover) at
   the same padding/sizing as before this slice — a component swap only, no visual change to either
   button.

## 19. Gate check (Services)

1. `npm run lint` and `npm run build` — both green.
2. Diff should touch only: `app/services/_data/types.ts` (new `AccordionSection`/
   `ServiceAccordionItem` types), `app/services/_data/services-content.ts` (new `accordion` section +
   intro copy), `app/services/page.tsx` (single `case "accordion"` dispatch), `app/services/
   _components/services-hero.tsx` (CTAs swapped to `Button`), `app/tokens.css`/`app/globals.css` (+4
   tokens: `--shadow-accordion-open-glow`, `--gradient-divider-blue`, `--gradient-divider-orange`,
   `--gradient-divider-teal`), and one new file (`app/services/_components/services-accordion.tsx`).
   `app/services/_components/services-overview.tsx` and `app/services/_components/
   service-detail-section.tsx` should no longer exist. No other Services file (FR-013a's ambient-orbs
   work is separate and out of this slice), `components/ui/Button.tsx`, no other page, and no other
   shared component touched.

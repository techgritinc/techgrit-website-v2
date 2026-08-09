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

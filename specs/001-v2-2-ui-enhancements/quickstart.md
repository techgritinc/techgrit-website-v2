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

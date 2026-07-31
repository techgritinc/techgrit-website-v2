# Quickstart: Verifying the Global Header & Footer

No automated tests exist in this repository (see plan.md → Technical Context). Verify manually
against spec.md's acceptance scenarios:

1. `npm run dev`, open `http://localhost:3000`.
2. **Header, desktop width (≥1141px)**: confirm logo, Services / Industries / Resources / Blog /
   About Us / Careers / Contact Us links, and the primary CTA are all visible. Click Industries
   and Resources — each opens a submenu (Construction/FinTech/Healthcare;
   Webinar/Case Studies) without navigating away.
3. **Header, scroll**: scroll down — header stays pinned/reachable. On `/` specifically, confirm
   it starts transparent over the hero and solidifies once you scroll; on any other route it
   should already be solid at the top.
4. **Header, mobile width (≤1140px)**: resize below 1140px — primary nav/CTA hide, a single menu
   control appears. Open it — every link (including Industries/Resources sub-items, grouped and
   labeled) and the CTA are visible and tappable, nothing clipped.
5. **Footer, every page**: scroll to the bottom on `/` and on at least one other route — confirm
   the brand block, social links (LinkedIn/YouTube/email), get-in-touch block, and legal row
   (copyright, Privacy Policy, Terms & Conditions) are present and identical in structure; only
   the quick-link column's content should differ between the two pages.
6. **Footer, mobile width**: confirm all footer columns stack into a single readable column with
   no overlap.
7. **Keyboard pass**: starting from the top of the page, press Tab repeatedly through the entire
   header and footer — every link, the menu toggle, and the dropdown triggers must receive a
   visible focus ring and be operable with Enter/Space, with no keyboard trap.
8. **Touch pass** (or Chrome DevTools touch emulation): confirm Industries/Resources open on tap,
   not only on hover.
9. `npm run lint && npm run build` — both must pass before considering this feature done.

## V2 Update — Header Pixel-Perfect Refactor (2026-07-30)

Footer verification above (steps 5–6) is unaffected and still applies unchanged. Re-verify the
header specifically against the `raw-files-v2/TechGrit Website V2.2/*.dc.html` files:

1. **Logo**: confirm the logo renders at `44px` height on every page, including the homepage, both
   before and after scrolling (no more 34px/32px home-vs-other-page difference).
2. **Nav taxonomy**: confirm the desktop nav reads, in order: What We Do, How We Work, Industries,
   Insights, About (all five opening a mega-menu), then Careers, Contact Us (plain links), then the
   "Talk to Us" CTA.
3. **Mega menus**: open each of the five groups and confirm the icon-chip grid matches its
   reference file's content exactly (title, description, column count, icon shape) — see spec.md's
   FR-013 for the full per-group item list. Confirm Industries' four icon chips are uniform orange
   (not per-industry teal/blue/amber/purple) and that Healthcare/FinTech/HiTech all link to `/#industries`
   while Construction links to `/construction`.
4. **Header sizing**: confirm non-home pages are `80px` tall (not the old 78px) and the homepage
   still starts transparent, shrinking to `70px` once `window.scrollY > 24`.
5. **CTA hover**: confirm the "Talk to Us" button's hover state (translate + strengthened shadow)
   is identical on the homepage and on every other page (no more homepage-only shadow change).
6. **Mobile menu (≤1140px)**: confirm the five groups appear as indented, plain link lists (no
   colored dot indicators) followed by Careers and Contact Us, with Contact Us styled in orange as
   the final row.
7. Re-run the keyboard and touch passes (steps 7–8 above) against the new five-group mega-menu
   structure specifically.
8. `npm run lint && npm run build` — both must pass before considering this update done.

## UI Findings — Header Interaction & Styling Corrections (2026-07-31)

1. **Hover-to-open (mouse)**: with a mouse, hover over each of the five dropdown triggers (no click)
   — confirm its mega-menu opens, the chevron rotates 180°, and moving the pointer down into the
   open panel (including through the gap beneath the trigger) keeps it open; moving the pointer away
   from both trigger and panel closes it.
2. **Click navigates (mouse)**: with a mouse, click directly on a trigger's label (not a mega-item
   inside the panel) — confirm it navigates to that group's own page (`/services`, `/frameworks`,
   `/construction`, `/case-studies`, `/about`) rather than only toggling the panel.
3. **Tap opens first (touch)**: using touch/DevTools touch emulation, tap a trigger — confirm the
   panel opens (does not navigate); tapping again or tapping a mega-item then proceeds normally.
4. **Panel reveal position**: confirm the open panel settles at the same on-screen position every
   time it opens (no visible jump/misplacement), with a smooth ~0.22s fade + slight upward settle,
   not an instant pop-in.
5. **CTA row coloring**: open What We Do and Insights — confirm the "See all services →" / "Explore
   all insights →" row's label text is white and only the trailing arrow is amber (not both amber).
6. **Header CTA consistency**: confirm the header's primary CTA reads "Talk to Us" and links to
   `/contact` on every page, including Careers and Webinar (no "View open roles"/"Subscribe"
   relabeling) — except on the Contact page itself, where it links to the on-page `#form` section.
7. `npm run lint && npm run build` — both must pass before considering this addendum done.

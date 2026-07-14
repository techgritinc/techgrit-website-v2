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

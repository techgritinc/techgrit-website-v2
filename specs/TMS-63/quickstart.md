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
5. **Footer, every page (Footer-only update, 2026-07-30)**: scroll to the bottom on `/` and on at
   least one other route — confirm the top row (brand block with logo/description/"Start a
   conversation" CTA, beside the two-column General/Careers contact block), the five-group
   site-map link grid (What We Do, How We Work, Industries, Insights, Company), the "Follow us"
   row (LinkedIn, YouTube, Spotify — not email), the decorative "TechGrit" wordmark, and the
   utility bar (copyright + Privacy Policy, Terms of Service, Cookie Preferences) are present and
   **byte-for-byte identical in content and order on both pages** — the footer carries no
   page-specific variation at all (spec.md FR-007/FR-008). Confirm no dead links (FR-015 anchor
   links to `/services#...`/`/about#...` should still navigate to the destination page even though
   the target section doesn't scroll into view yet — see spec.md Edge Cases).
6. **Footer, responsive breakpoints (Footer-only update, 2026-07-30)**: resize to ≤1080px — confirm
   the brand/contact row stacks into one column, and the site-map grid's "What We Do" column stacks
   above the right region, whose 4-group sub-grid becomes 2 columns. Resize to ≤640px — confirm the
   sub-grid collapses to a single column, "Follow us" stacks its label above its icons, and the
   utility bar switches to a left-aligned stacked column. At every width, confirm no overlap,
   clipping, or horizontal scroll, and that hovering/focusing the CTA button or a social icon lifts
   it with a smooth transition — then, with `prefers-reduced-motion: reduce` enabled (e.g. Chrome
   DevTools → Rendering → Emulate CSS media feature), confirm the same hover/focus no longer lifts
   the element but still applies its color/shadow change (spec.md Clarifications, Session
   2026-07-30).
7. **Keyboard pass**: starting from the top of the page, press Tab repeatedly through the entire
   header and footer — every link, the menu toggle, and the dropdown triggers must receive a
   visible focus ring and be operable with Enter/Space, with no keyboard trap.
8. **Touch pass** (or Chrome DevTools touch emulation): confirm Industries/Resources open on tap,
   not only on hover.
9. `npm run lint && npm run build` — both must pass before considering this feature done.

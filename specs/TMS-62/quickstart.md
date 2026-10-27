# Quickstart: Verifying the Homepage Content Sections

No automated tests exist in this repository (see plan.md → Technical Context). Verify manually
against spec.md's acceptance scenarios:

1. `npm run dev`, open `http://localhost:3000`.
2. **Hero (US1)**: without scrolling, confirm headline, supporting description, the three delivery
   stats, a primary CTA (contact/demo) and secondary CTA (jump to `#methodology`), and the trusted-
   client logo row are all visible. Click both CTAs — each lands on its destination.
3. **Platform + Methodology (US2)**: scroll to Platform — confirm the capability list and the
   pipeline visual render. Scroll to Methodology — confirm exactly one phase's detail (title, week
   range, description, deliverables) is active; click a different phase tab and confirm the detail
   updates; then scroll slowly through the whole section and confirm the active phase advances with
   scroll position and never lands "between" two phases.
4. **Re-Imagine (US3)**: confirm the three differentiator cards and the traditional-vs-OrbitAI
   comparison panel (two labeled bars/values) render.
5. **Industries (US4)**: confirm FinTech/Healthcare/Construction cards render with imagery (or its
   placeholder), title, and description; confirm the section's "Explore Industry Solutions" link
   and the Construction card's own link both navigate correctly.
6. **Testimonials + Case Studies (US5)**: drag/scroll the testimonial track horizontally through
   all cards; open a video testimonial and confirm the lightbox opens (with the no-video fallback
   state if a testimonial has no `videoUrl`), then close it and confirm scroll position is
   preserved. Scroll to Case Studies — confirm one featured case study and at least three others
   render with metrics, and "View all case studies" navigates correctly.
7. **Subscribe + Gallery + Final CTA (US6)**: submit the subscribe form with a valid name/email —
   confirm it swaps to a success confirmation; submit again with an invalid email — confirm an
   inline error appears and no success state shows. Confirm the Life at TechGrit gallery renders.
   Scroll to the Final CTA band — confirm its own heading, primary CTA, and secondary link to
   `#methodology` are present.
8. **Responsive pass**: resize through desktop → 1140px → 960px → 560px → a narrow phone width
   (e.g. 360px) — confirm every section reflows per the constitution's breakpoint contract with no
   clipped, overlapping, or horizontally-scrolling content.
9. **Reduced motion pass**: enable "reduce motion" (OS setting or DevTools emulation) — confirm all
   content and controls remain fully visible/usable without relying on scroll-reveal, count-up, or
   ambient animations completing.
10. **Keyboard pass**: Tab through the entire page — every button, link, form field, phase tab,
    testimonial card, and the lightbox's close control must receive a visible focus ring and be
    operable via keyboard, including closing the lightbox with Escape.
11. `npm run lint && npm run build` — both must pass before considering this feature done.

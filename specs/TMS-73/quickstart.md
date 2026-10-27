# Quickstart: Webinar Series Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/webinar`.

## Verify against the spec (manual — no test framework configured, see research.md §8)

Walk through each user story from `spec.md` directly in the browser:

1. **Story 1 — Get oriented on arrival (P1)**: Load `/webinar`. Confirm the hero badge identifies
   the page as the webinar series, the headline states the page's purpose with one phrase visually
   distinguished as the gradient accent, a supporting sentence sits beneath it, and the hero email
   form (input + submit) is present — all readable without scrolling. Confirm the 9-cell collage
   renders beside the hero text, mixing photo tiles with the 3 decorative (non-photo) tiles.
2. **Story 2 — Register for the upcoming live session (P1)**: Scroll to the Sessions grid. Confirm
   the top entry spans the full grid width, distinct from released sessions, showing a "live"
   status indicator, title, description, date/time, and a "Register Now" button. Click "Register
   Now" and confirm it scrolls to the Subscribe section with no full page reload. Inspect the
   rendered DOM and confirm "Register Now" is a `<button>` element, not an `<a>` tag (FR-006).
3. **Story 3 — Browse released session recordings (P1)**: Confirm every released session below the
   upcoming entry shows a "Released" label, title, description, and a "Watch Now" button — inspect
   the DOM and confirm each is a `<button>` element, not an `<a>` tag (FR-007). Confirm the layout
   matches the reference's mix of half-width/half-width/full-width cards, not three uniform cards.
4. **Story 4 — Subscribe for future session announcements (P2)**: At the hero form, submit a validly
   formatted email and confirm an on-page confirmation appears in the hero's own context with no
   navigation; reload and submit an invalid/empty email and confirm a corrective message appears
   with the form still visible. Repeat both checks independently at the Subscribe section's own
   form — confirm submitting one form does NOT change the other form's state (spec.md Assumptions).
5. **Story 5 — Use the page comfortably on any device (P1)**: Using browser dev tools device
   toolbar, check the page at:
   - Mobile: 375px and 430px wide
   - Tablet: 768px and 1024px wide
   - Desktop: 1280px+ wide

   At mobile widths, confirm the hero's text and collage stack into a single column, the collage
   itself reflows to 2 columns, the Sessions grid collapses to a single column, and the Subscribe
   panel stacks its text above its form — with no overlapping text, no clipped content, and no
   horizontal scrolling. At tablet widths, confirm the hero/Sessions grid use their single-column
   collapse per the canonical breakpoints. At desktop widths, confirm all sections use their full
   multi-column layout, centered and constrained to a readable maximum width (research.md §7 maps
   these transitions onto the canonical `lg`/`md`/`sm` breakpoints, not the reference's literal
   960px/560px values — which happen to coincide with `md`/`sm` already).

6. **Edge cases** (spec.md Edge Cases):
   - With OS-level "reduce motion" enabled (or by throttling CPU heavily), confirm every section —
     hero, Sessions grid, Subscribe panel — still becomes fully visible even if the reveal animation
     doesn't visibly run.
   - Tab through the hero form, "Register Now", every "Watch Now" button, and the Subscribe form's
     input/submit using only the keyboard; confirm each has a visible focus indicator and an
     accessible name (FR-013).
   - Temporarily lengthen one session's `title` or `description` in `webinar-content.ts` to an
     unusually long string and confirm the card layout stays intact (text wraps/constrains) without
     breaking grid alignment or overlapping neighboring cards, then revert the change.
   - Submit the hero form successfully, then reload and submit the Subscribe panel form with a
     different valid email; confirm the second submission is independently validated and confirms
     normally (a prior success state on one form must not affect the other, or block a later
     attempt on the same form after a reload).

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

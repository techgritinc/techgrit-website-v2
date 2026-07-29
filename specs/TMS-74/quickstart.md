# Quickstart: Careers Page

## Run locally

```bash
npm run dev
```

Open `http://localhost:3000/careers`.

## Verify against the spec (manual — no test framework configured, see plan.md Technical Context)

Walk through each user story from `spec.md` directly in the browser:

1. **Story 1 — Browse open roles and apply (P1)**: Scroll to Open Roles. Confirm all 5 department
   filters render ("All" active by default) and all 7 roles are listed, each showing position title,
   department, location, employment type, and an Apply action. Select a single department filter and
   confirm the list narrows to only that department's roles with no full page reload, and the active
   filter is visually distinguished from the rest. Select "All" again and confirm every role
   reappears. Select a department with no matching roles (or temporarily edit
   `app/careers/_data/careers-data.ts` to make one empty) and confirm a clear "no roles" message
   appears instead of a blank area (FR-021), then revert the change. Click a role's Apply action and
   confirm an on-page dialog opens — not an email client — showing that exact role's title in its
   top-left area, with fields for first name, last name, email, phone, and a "why you're a great fit"
   textarea, plus Submit and Cancel. Submit with all fields completed and confirm the dialog's form is
   replaced by an in-dialog success message without navigating away or opening an email client.
   Reopen a role's dialog, fill it partway, and confirm Cancel, a backdrop click, and Escape each
   close the dialog and discard the entered data without submitting.
2. **Story 2 — Understand why to join TechGrit (P2)**: Scroll to "Why people join — and stay".
   Confirm the heading is followed by exactly six cards, each with an icon, title, and description,
   sharing identical dimensions, padding, border, and radius.
3. **Story 3 — Explore life at TechGrit (P2)**: Scroll to the Life at TechGrit section. Confirm it
   uses the same section pattern as the homepage's own Life at TechGrit section (heading, supporting
   statement, image collage) but with this page's own heading, description, and 4-image collage
   (tall/wide/default/wide arrangement), not the homepage's images or copy.
4. **Story 4 — Reach out when no listed role fits (P3)**: Scroll to the closing CTA panel. Confirm it
   shows a heading, supporting statement, and a "Send your resume" action. Select it and confirm the
   same application dialog opens, but with its top-left area indicating a general application (no
   position name) rather than a specific role title. Submit it and confirm the same in-dialog success
   behavior as Story 1, and that this submission carries no role reference (verify in dev tools /
   component state if needed).
5. **Story 5 — Use the page comfortably on any device (P1)**: Using browser dev tools device toolbar,
   check the page at:
   - Mobile: 375px and 430px wide
   - Tablet: 768px and 1024px wide
   - Desktop: 1280px+ wide

   At mobile widths, confirm the hero collage, benefit-card grid, and role list each adapt to a
   layout appropriate for narrow width (not the fixed desktop layout), with no horizontal scrolling,
   overlapping content, or clipped text. At tablet and desktop widths, confirm each section uses its
   full intended multi-column layout. Reference's own breakpoints (1140px/960px/560px) map onto this
   project's canonical `lg`/`md`/`sm` with no remapping needed (research.md §8).

6. **Fidelity check (SC-006)**: Open `raw-files/TechGrit Careers.dc.html` and the running `/careers`
   page side by side at matching widths (desktop, tablet, mobile). Confirm no measurable deviation in
   layout, spacing, typography, colors, or image arrangement — hero collage order/sizing, stats-strip
   typography, benefit-card padding/radius/border, filter-pill active/hover states, role-card
   layout/spacing, and the closing CTA panel.

7. **Keyboard/accessibility (FR-017)**: Tab through the department filters, every role card's Apply
   action, the closing CTA's action, and every field/action inside an open application dialog using
   only the keyboard. Confirm each control has a visible focus indicator and an accessible name, and
   that Escape closes an open dialog.

8. **Edge cases** (spec.md Edge Cases):
   - Submit the application dialog with a required field missing or an invalid email and confirm a
     corrective message is shown before any submission is accepted (SC-005), every time.
   - Temporarily lengthen one role's `title` or one benefit's `description` in `careers-data.ts` to an
     unusually long string and confirm the card layout stays intact (text wraps/constrains) without
     breaking grid alignment, then revert the change.
   - Submit the dialog successfully once, close it, then reopen it (either the same role or a
     different one) and confirm it starts fresh (empty fields, no stale success state) rather than
     showing the prior submission's success message.

## Gates before considering the feature done

```bash
npm run lint
npm run build
```

Both must pass — this is the same gate Husky's `pre-commit` hook enforces.

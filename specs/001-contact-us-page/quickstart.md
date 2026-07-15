# Quickstart: Verifying the Contact Us Page

No automated test framework exists in this repository (constitution-documented gap), so
verification is manual. Run the dev server and walk through the scenarios below against
`spec.md`'s acceptance criteria.

## Setup

```bash
npm run dev
```

Open `http://localhost:3000/contact` in a browser.

## Verification checklist

### User Story 1 — Submit a project inquiry (P1)

1. Load the page — confirm a headline, supporting message, and a form (full name, work email,
   company, project message) are visible without scrolling. *(FR-001, FR-003)*
2. Confirm one topic chip ("New project") is selected by default and visually distinct from the
   other three. Click another chip — confirm the selection moves and only one is active at a
   time. *(FR-002)*
3. Leave "Full name" empty and try to submit — confirm the browser blocks submission and flags
   the field. Repeat for "Work email" (also try an invalid value like `notanemail`) and
   "Tell us about your project". *(FR-004, FR-005)*
4. Fill all required fields (name, email, message), leave company blank, submit — confirm the
   form is replaced by a confirmation message that includes your first name and states a reply
   within one business day. *(FR-006, FR-007)*
5. Click "Send another" — confirm the empty form reappears (fields cleared) without a page
   reload. *(FR-008)*

### User Story 2 — Find alternate ways to get in touch (P2)

6. Confirm a direct email contact, a response-time statement ("Within 1 business day"), and a
   "remote-first / global delivery" statement are visible near the form without needing to
   interact with it. *(FR-009, FR-010)*
7. Click the email contact — confirm it opens a `mailto:` link.

### User Story 3 — Understand what happens after submitting (P3)

8. Scroll below the form — confirm a numbered three-step "What happens next" section is visible,
   independent of whether the form has been submitted. *(FR-011)*

### Cross-cutting

9. Resize the browser to common desktop, tablet, and mobile widths (or use device emulation) —
   confirm the hero/form layout and the three-step grid collapse to single-column arrangements
   without overlapping or truncated content. *(FR-013, SC-004)*
10. Confirm no header/navigation or footer markup is rendered by this page's own code — the page
    should render as a self-contained content block. *(FR-012)*

## Build gate

Before considering the feature done, both of the following must succeed (also enforced by the
existing Husky pre-commit hook):

```bash
npm run lint
npm run build
```

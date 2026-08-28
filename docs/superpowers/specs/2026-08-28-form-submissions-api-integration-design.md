# Form Submissions API Integration — Design

Date: 2026-08-28
Status: Approved (pending final spec review)

## Purpose

Four forms across the site (Home newsletter, Blog newsletter, Webinar subscribe panel, Contact
form) currently only do client-side validation and flip to a fake "success" state — no data is
persisted anywhere. This wires all four to a real backend (Strapi) endpoint. The Careers
application form is explicitly **out of scope** for this pass (its resume upload needs
multipart/form-data handling, deferred to a later ticket).

## Backend contract

- Endpoint: `POST http://localhost:1337/api/form-submissions` (server-side base URL comes from
  the existing `CMS_API_URL` constant in `cms/api/fetcher.ts` — no new env var).
- Body: standard Strapi `{ data: {...} }` envelope, JSON.
- Strapi content-type schema (`form-submission`):
  - `name`: string
  - `email`: email
  - `linkedinUrl`: text
  - `resume`: media (multiple, files) — careers only, not used in this pass
  - `message`: text
  - `inquiryOptions`: json
  - `company`: string
  - `projectInfo`: string
  - `category`: string (free text, no enum — naming convention agreed with requester)

## Architecture

One new file, `cms/api/form-submissions.ts`, exporting a single Server Action:

```ts
"use server";

export async function submitFormSubmission(payload: {
  name?: string;
  email: string;
  category: string;
  company?: string;
  projectInfo?: string;
  inquiryOptions?: string[];
}): Promise<{ ok: true } | { ok: false }> {
  try {
    const res = await fetch(`${CMS_API_URL}/api/form-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
    });
    return res.ok ? { ok: true } : { ok: false };
  } catch {
    return { ok: false };
  }
}
```

Each of the 4 client components imports this action directly and calls it inside their existing
`handleSubmit`, after existing client-side validation passes. No API route handler, no new
fetch/parsing boilerplate on the calling side — this is the idiomatic Next.js App Router shape for
a client-to-server mutation, and it keeps the Strapi host out of the browser.

Only plain JSON is supported by this action. Careers' resume upload will require a second,
multipart-aware branch (or a separate action) — deferred until that form is built.

## Field mapping and category values

| Form | Component | category | Fields sent |
|---|---|---|---|
| Home | `app/_home-components/SubscribeBand.tsx` | `webinar` | name, email |
| Webinar (bottom subscribe panel only) | `app/insights/webinar/_components/subscribe-panel.tsx` | `webinar` | email |
| Blog | `app/insights/blog/_components/newsletter-panel.tsx` | `blog` | email |
| Contact | `app/contact-us/_components/contact-hero-form.tsx` | `contact` | name, email, company (optional), projectInfo, inquiryOptions: [selected topic] |

Notes:
- Category values are exactly as specified by the requester: `webinar` is shared by both the Home
  and Webinar pages (intentional, confirmed twice); Blog and Contact use their own page name.
  This means Home and Webinar submissions are not distinguishable from each other by `category`
  alone.
- Blog's form has no `name` field at all (never has) — its payload omits `name` entirely.
- Webinar's **hero form** (`app/insights/webinar/_components/hero-section.tsx`) is explicitly
  **not wired** to this action — it stays exactly as it is today (client-only fake success), per
  requester decision to only integrate the bottom subscribe panel.
- Contact's `projectInfo` textarea maps to the Strapi `projectInfo` field (not `message`) — `message`
  is reserved for Careers' "why us" field, to keep the two distinct once Careers is built.

## UI changes bundled into this work

1. **Webinar subscribe panel** (`subscribe-panel.tsx`): remove its `name` `FormField` — becomes a
   single-field (email-only) form, matching the hero form's shape.
2. **Submit buttons** (all 4 wired forms): add local `isSubmitting` state; pass
   `disabled={isSubmitting}` to the submit `Button` for the duration of the request only.
   `Button`'s existing `disabled:opacity-45 disabled:pointer-events-none` base styling handles the
   visual/interaction state with no component changes needed.
   - Explicitly **not** doing: disabling the button pre-emptively while required fields are empty.
     Considered and declined — keeps the existing "enabled button, validate on submit, show inline
     error" pattern (already built into all 4 forms), which is also the generally-recommended
     accessible pattern (a permanently-disabled button with no explanation is a known UX/a11y
     anti-pattern). Avoids converting the 3 currently-uncontrolled forms (Home/Blog/Webinar) to
     controlled inputs purely for this.
3. **Contact page textarea** (`contact-hero-form.tsx`, the `projectInfo` field): remove `resize-y`
   (no longer user-resizable); apply the thin custom-webkit-scrollbar treatment already
   established in `app/careers/_components/application-dialog.tsx`
   (`[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full ...`) instead of the
   default thick browser scrollbar.
4. **Contact page required marks**: name, email, and the message (`projectInfo`) textarea get a
   visible `*` (reusing the `requiredMarkNode`-style treatment already built in
   `application-dialog.tsx`) plus the HTML `required` attribute. **`company` stays optional**, no
   asterisk — preserves the deliberate decision recorded in
   `specs/001-contact-us-page/spec.md` and `data-model.md`.

## Error handling

- Existing client-side validation (required-field checks, email regex) is unchanged and runs
  first, before any network call.
- After validation passes, call `submitFormSubmission`. On `{ ok: true }`, flip to each form's
  existing success UI (unchanged). On `{ ok: false }`, show each form's existing error UI with a
  new generic message ("Something went wrong. Please try again.") instead of a validation message.
- No retry logic, no loading spinner beyond the disabled submit button during the in-flight
  request.

## Testing / verification

No test framework exists in this repo (confirmed via `CLAUDE.md` — no Jest/Vitest/Playwright
config). Verification is manual, against the requester's live Strapi server (no local Strapi
instance available):

1. Submit each of the 4 wired forms with valid data; confirm an entry appears in Strapi with the
   correct `category` and field values.
2. Submit Contact leaving `company` blank; confirm it still succeeds.
3. Trigger a submission failure (e.g. Strapi temporarily unreachable) and confirm the existing
   error UI renders the generic failure message without crashing the page.
4. Confirm the submit button is visibly disabled (dimmed, non-interactive) only while a request is
   in flight, and re-enables after success/failure.

## Explicitly out of scope

- Careers application form (`application-dialog.tsx`) — no API wiring in this pass; its resume
  upload needs a multipart/form-data branch on the Server Action, to be designed when that form is
  picked up.
- Pre-emptively disabling submit buttons based on empty/invalid field state (see UI changes #2).
- Any change to the Strapi content-type schema itself (schema was provided as-is by the
  requester).

# Careers "Apply Now" → HR e-mail notification

## Goal

When a candidate submits the **Apply Now** form on any Careers position, two things happen:

1. The application (name, email, LinkedIn/portfolio URL, message, resume) is **saved in the Strapi CMS** — unchanged from today.
2. **hr@techgrit.com** receives an e-mail with the same details and the resume.

## Options considered

| Option | How it works | Verdict |
|---|---|---|
| **A. Microsoft Graph `sendMail` from the website server** | The Next.js server action, after the CMS save, calls Graph with an app-only token and sends as the HR mailbox | **Chosen** — TechGrit mail is Microsoft 365, no new npm dependency, no SMTP AUTH to enable, everything stays in this repo |
| B. SMTP (nodemailer) | Server action sends through `smtp.office365.com` | Needs a new dependency and SMTP AUTH turned on for a mailbox, which Microsoft 365 disables by default and is phasing out |
| C. Strapi lifecycle hook / email plugin | CMS sends mail on `afterCreate` of a form submission | Would also work, but the CMS is a separate codebase; the change could not be made or reviewed in this repo |
| D. Third-party service (SendGrid, Resend, SES) | HTTP API from the server action | New vendor account, DNS (SPF/DKIM) setup, and cost for one notification |

## Flow

```
Candidate clicks Apply Now (application-dialog.tsx)
  → validates fields client-side
  → server action submitCareersApplication()          (cms/api/form-submissions.ts)
      1. POST resume to Strapi /api/upload            → file id + url
      2. POST entry to Strapi /api/form-submissions   → saved in CMS
      3. if saved: sendCareersNotification()          (lib/notify-careers.ts)
           → Graph token (client credentials)         (lib/graph-mail.ts)
           → POST /users/hr@techgrit.com/sendMail
  → candidate sees the success screen
```

Rules:

- The CMS save is the record of truth; the e-mail runs **only after** it succeeds.
- The e-mail **fails soft**: any Graph error is logged and the candidate still sees success.
- If the Graph env vars are missing (e.g. local dev), the e-mail is skipped with a warning.
- Secrets live only in server env vars; nothing reaches the browser.

## E-mail content

- **Subject:** `New application: <Position> — <Candidate name>`
- **Body:** position (or "General Application"), name, email, LinkedIn/portfolio, "Why TechGrit?" text, and resume info.
- **Reply-To:** the candidate, so HR can answer directly.
- **Resume:** attached when ≤ 3 MB (Graph's single-request limit is ~4 MB including base64). It is also always linked to the CMS copy, which covers files up to the form's 5 MB limit.
- All user text is HTML-escaped, and header values are stripped of line breaks.
- The position is passed to the e-mail only. It is **not** sent to the CMS, so the CMS schema does not change.

## Code (in this repo)

| File | Change |
|---|---|
| `lib/graph-mail.ts` | New. Gets and caches the app-only Graph token; `sendGraphMail()` |
| `lib/notify-careers.ts` | New. Builds the HR e-mail and calls `sendGraphMail()`; fails soft |
| `cms/api/form-submissions.ts` | `submitCareersApplication()` accepts `position`, keeps it out of the CMS payload, calls the notifier after a successful save |
| `app/careers/_components/application-dialog.tsx` | Passes the role title (or "General Application") as `position` |
| `.env.example` | Documents the new variables |

## Setup (one time, Microsoft 365 admin)

1. Entra ID → **App registrations** → New registration (e.g. "TechGrit Website Mailer").
2. **API permissions** → Microsoft Graph → **Application** permission `Mail.Send` → **Grant admin consent**.
3. **Certificates & secrets** → new client secret. Note its expiry date so it can be renewed before it lapses.
4. **Recommended:** limit the app to the HR mailbox with an Exchange application access policy (`New-ApplicationAccessPolicy` with RestrictAccess), so it cannot send as any other mailbox.

## Environment variables

```
MS_GRAPH_TENANT_ID=<directory (tenant) id>
MS_GRAPH_CLIENT_ID=<application (client) id>
MS_GRAPH_CLIENT_SECRET=<client secret value>
MS_GRAPH_SENDER=hr@techgrit.com
CAREERS_NOTIFY_TO=hr@techgrit.com        # comma-separated list allowed
```

Add them to the local `.env`. The deploy workflow (`deploy-site.yml`) currently writes only `CMS_API_URL` to the VM's `.env`. Add these as `dev` Environment secrets and write them in the same step.

## Testing

1. Set the env vars locally and run `npm run dev`.
2. Open a role under `/careers/<slug>/`, click **Apply Now**, and submit with a small PDF.
3. Check: the entry and resume exist in Strapi, and hr@techgrit.com received the e-mail with the attachment (it also appears in the mailbox's Sent Items).
4. Repeat with a 4–5 MB resume. Expect no attachment, but a working CMS link.
5. Remove one env var and submit again. Expect success for the candidate and a `[careers-notify]` warning in the server log.

## Open points

- The CMS resume link works only if Strapi serves uploads publicly. If it doesn't, HR relies on the attachment.
- Client secret rotation: renew it in Entra ID and update the deploy secret before it expires.

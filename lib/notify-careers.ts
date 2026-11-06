import { envPositiveInt } from "./env";
import { isGraphMailConfigured, sendGraphMail } from "./graph-mail";
import { isHttpUrl } from "./validations";

/**
 * Careers "Apply Now" notification to HR, sent through Microsoft Graph (lib/graph-mail.ts).
 *
 * Called from cms/api/form-submissions.ts only AFTER the application is saved in the CMS,
 * so the CMS stays the record of truth and an e-mail problem never fails the candidate's
 * submission (fails soft: logs a "[careers-notify] ALERT" line and returns false — grep
 * the PM2 error log for that tag to find applications HR was not e-mailed about).
 * Recipient: CAREERS_NOTIFY_TO (comma-separated allowed), default careers@techgrit.com.
 */
const DEFAULT_RECIPIENT = "careers@techgrit.com";

// Unset, empty, or only separators (e.g. ",") all fall back to the default, so a config
// typo can never produce an empty recipient list (Graph would reject the mail with a 400).
function careersRecipients(): string[] {
  const raw = process.env.CAREERS_NOTIFY_TO;
  const parsed = (raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  if (parsed.length > 0) return parsed;
  if (raw?.trim()) console.warn(`[careers-notify] CAREERS_NOTIFY_TO has no addresses; using ${DEFAULT_RECIPIENT}`);
  return [DEFAULT_RECIPIENT];
}
export type CareersNotification = {
  position: string;
  name: string;
  email: string;
  linkedinUrl?: string;
  message?: string;
  resume: File;
  /** Absolute URL of the resume stored in the CMS — linked only when the file is too big to attach. */
  resumeUrl?: string;
};

// Graph's single-request sendMail limit is ~4 MB for the whole JSON body, and base64 makes
// a file ~4/3 bigger: 3 MiB becomes ~4.2 MB (rejected), 2.5 MiB ~3.5 MB (fits). Only attach
// the resume when it is at or under this size; larger files are linked instead.
// CAREERS_MAX_ATTACHMENT_BYTES can LOWER the limit, never raise it past the safe ceiling,
// because a higher value would make Graph reject the whole e-mail.
const GRAPH_SAFE_ATTACHMENT_BYTES = Math.floor(2.5 * 1024 * 1024);
const MAX_ATTACHMENT_BYTES = Math.min(
  envPositiveInt("CAREERS_MAX_ATTACHMENT_BYTES", GRAPH_SAFE_ATTACHMENT_BYTES),
  GRAPH_SAFE_ATTACHMENT_BYTES
);

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

export async function sendCareersNotification(n: CareersNotification): Promise<boolean> {
  if (!isGraphMailConfigured()) {
    console.error(`[careers-notify] ALERT: MS_GRAPH_* env vars not set — HR e-mail skipped for ${n.email}`);
    return false;
  }

  try {
    const to = careersRecipients();
    // Defense in depth: only http(s) links ever reach an href in HR's inbox.
    const linkedinUrl = n.linkedinUrl && isHttpUrl(n.linkedinUrl) ? n.linkedinUrl : undefined;
    const resumeUrl = n.resumeUrl && isHttpUrl(n.resumeUrl) ? n.resumeUrl : undefined;

    const position = oneLine(n.position);
    const name = oneLine(n.name);
    const attach = n.resume.size <= MAX_ATTACHMENT_BYTES;

    const rows: [string, string][] = [
      ["Position", escapeHtml(position)],
      ["Name", escapeHtml(name)],
      ["Email", `<a href="mailto:${escapeHtml(n.email)}">${escapeHtml(n.email)}</a>`],
      ["LinkedIn / portfolio", linkedinUrl ? `<a href="${escapeHtml(linkedinUrl)}">${escapeHtml(linkedinUrl)}</a>` : "—"],
      ["Why TechGrit?", n.message ? escapeHtml(n.message).replace(/\n/g, "<br>") : "—"],
      [
        "Resume",
        // Attached files are named only. The public CMS link is used just for files too
        // big to attach, so HR still has a way to open them.
        !attach && resumeUrl
          ? `<a href="${escapeHtml(resumeUrl)}">${escapeHtml(n.resume.name)}</a> (too large to attach)`
          : escapeHtml(n.resume.name),
      ],
    ];

    const html =
      `<p>A new application was submitted on the TechGrit Careers page.</p>` +
      `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">` +
      rows.map(([k, v]) => `<tr><td style="vertical-align:top"><b>${k}</b></td><td>${v}</td></tr>`).join("") +
      `</table>`;

    await sendGraphMail({
      to,
      subject: `New application: ${position} — ${name}`,
      html,
      replyTo: { name, address: n.email },
      attachments: attach
        ? [
            {
              name: n.resume.name,
              contentType: n.resume.type || "application/octet-stream",
              contentBytes: Buffer.from(await n.resume.arrayBuffer()).toString("base64"),
            },
          ]
        : undefined,
    });
    return true;
  } catch (err) {
    // Loud and greppable: the candidate already saw success, so this log line is the
    // only signal that HR was not told. The application itself is safe in the CMS.
    console.error(`[careers-notify] ALERT: HR e-mail failed for ${n.email} (${oneLine(n.position)})`, err);
    return false;
  }
}

import { isGraphMailConfigured, sendGraphMail } from "./graph-mail";
import { isHttpUrl } from "./validations";

/**
 * Careers "Apply Now" notification to HR, sent through Microsoft Graph (lib/graph-mail.ts).
 *
 * Called from cms/api/form-submissions.ts only AFTER the application is saved in the CMS,
 * so the CMS stays the record of truth and an e-mail problem never fails the candidate's
 * submission (fails soft: logs and returns false).
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
  /** Absolute URL of the resume stored in the CMS — always included in the e-mail body. */
  resumeUrl?: string;
};

// Graph's single-request sendMail limit is ~4 MB including base64 overhead, so only
// attach the resume when it is comfortably below that; larger files are linked instead.
const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024;

const escapeHtml = (v: string) =>
  v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").trim();

export async function sendCareersNotification(n: CareersNotification): Promise<boolean> {
  if (!isGraphMailConfigured()) {
    console.warn("[careers-notify] MS_GRAPH_* env vars not set — HR e-mail skipped");
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
        // File name only, linked to the CMS copy when available (the file is also attached when small enough).
        resumeUrl
          ? `<a href="${escapeHtml(resumeUrl)}">${escapeHtml(n.resume.name)}</a>`
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
    console.error("[careers-notify] failed to send HR e-mail", err);
    return false;
  }
}

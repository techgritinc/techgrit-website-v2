/**
 * Microsoft Graph mail sender — same provider GritHire uses (Microsoft 365 / Outlook).
 *
 * The website has no signed-in user, so this uses the app-only (client-credentials) flow:
 * an Entra ID app registration with the *Application* permission `Mail.Send` (admin
 * consented) sends as the mailbox in MS_GRAPH_SENDER via POST /users/{sender}/sendMail.
 * No npm dependency — plain fetch. Server-only: reads secrets from process.env.
 */

type GraphAttachment = { name: string; contentType: string; contentBytes: string };

export type GraphMail = {
  to: string[];
  subject: string;
  html: string;
  replyTo?: { name: string; address: string };
  attachments?: GraphAttachment[];
};

let cachedToken: { value: string; expiresAt: number } | null = null;

function graphConfig() {
  const { MS_GRAPH_TENANT_ID, MS_GRAPH_CLIENT_ID, MS_GRAPH_CLIENT_SECRET, MS_GRAPH_SENDER } = process.env;
  if (!MS_GRAPH_TENANT_ID || !MS_GRAPH_CLIENT_ID || !MS_GRAPH_CLIENT_SECRET || !MS_GRAPH_SENDER) return null;
  return {
    tenantId: MS_GRAPH_TENANT_ID,
    clientId: MS_GRAPH_CLIENT_ID,
    clientSecret: MS_GRAPH_CLIENT_SECRET,
    sender: MS_GRAPH_SENDER,
  };
}

export function isGraphMailConfigured(): boolean {
  return graphConfig() !== null;
}

async function getAccessToken(cfg: NonNullable<ReturnType<typeof graphConfig>>): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 60_000) return cachedToken.value;

  const res = await fetch(`https://login.microsoftonline.com/${cfg.tenantId}/oauth2/v2.0/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: cfg.clientId,
      client_secret: cfg.clientSecret,
      scope: "https://graph.microsoft.com/.default",
      grant_type: "client_credentials",
    }),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Graph token request failed: ${res.status} ${await res.text()}`);
  const json: { access_token: string; expires_in: number } = await res.json();
  cachedToken = { value: json.access_token, expiresAt: Date.now() + json.expires_in * 1000 };
  return json.access_token;
}

/** Sends one e-mail through Microsoft Graph. Throws on failure; callers decide how to fail. */
export async function sendGraphMail(mail: GraphMail): Promise<void> {
  const cfg = graphConfig();
  if (!cfg) throw new Error("Microsoft Graph mail is not configured (MS_GRAPH_* env vars)");
  const token = await getAccessToken(cfg);

  const res = await fetch(`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(cfg.sender)}/sendMail`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      message: {
        subject: mail.subject,
        body: { contentType: "HTML", content: mail.html },
        toRecipients: mail.to.map((address) => ({ emailAddress: { address } })),
        ...(mail.replyTo ? { replyTo: [{ emailAddress: mail.replyTo }] } : {}),
        ...(mail.attachments?.length
          ? {
              attachments: mail.attachments.map((a) => ({
                "@odata.type": "#microsoft.graph.fileAttachment",
                ...a,
              })),
            }
          : {}),
      },
      saveToSentItems: true,
    }),
    cache: "no-store",
  });
  // Graph returns 202 Accepted with an empty body on success.
  if (!res.ok) throw new Error(`Graph sendMail failed: ${res.status} ${await res.text()}`);
}

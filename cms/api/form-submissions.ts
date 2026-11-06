"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { CMS_API_URL } from "./fetcher";
import { getJobDetailContent } from "./job-detail";
import { sendCareersNotification } from "@/lib/notify-careers";
import { allowRequest } from "@/lib/rate-limit";
import { validateEmail, validateLinkedinUrl, validateMessage, validateName, validateResume } from "@/lib/validations";

export type FormSubmissionPayload = {
  name?: string;
  email: string;
  category: string;
  company?: string;
  projectInfo?: string;
  inquiryOptions?: string[];
};

export type FormSubmissionResult = { ok: true } | { ok: false };

export async function submitFormSubmission(
  payload: FormSubmissionPayload
): Promise<FormSubmissionResult> {
  try {
    const res = await fetch(`${CMS_API_URL}/api/form-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: payload }),
    });
    if (!res.ok) return { ok: false };
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export type CareersApplicationPayload = {
  name: string;
  email: string;
  linkedinUrl?: string;
  message?: string;
  resume: File;
  /** Job-detail page slug for a specific role; omitted for a general application. */
  roleSlug?: string;
  /** Honeypot — hidden from real users, so any value means a bot filled the form. */
  website?: string;
};

// The browser validates too, but this is a public server action: anyone can call it with
// any payload, so everything is re-checked here before anything is stored or e-mailed.
const careersApplicationSchema = z.object({
  name: validateName("Full name"),
  email: validateEmail,
  linkedinUrl: validateLinkedinUrl.optional(),
  message: validateMessage("Message").optional(),
  resume: validateResume,
  roleSlug: z
    .string()
    .regex(/^[a-z0-9-]{1,120}$/i)
    .optional(),
  website: z.string().optional(),
});

// Per-IP limit stops one sender flooding HR; the global cap keeps the HR mailbox well
// under Microsoft Graph's ~30 messages/minute throttle even if IPs rotate.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_IP = 5;
const MAX_GLOBAL = 60;

// nginx (the only proxy in front of the app) sets X-Real-IP, or appends the real client
// address as the LAST X-Forwarded-For entry; earlier entries are client-supplied.
async function clientIp(): Promise<string> {
  const h = await headers();
  const realIp = h.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = h.get("x-forwarded-for")?.split(",").map((s) => s.trim()).filter(Boolean);
  return forwarded?.at(-1) ?? "unknown";
}

// The HR e-mail's role label comes from the CMS, never from the client. Never throws:
// a lookup problem only changes the label, never the submission's outcome.
async function resolvePosition(roleSlug: string | undefined): Promise<string> {
  if (!roleSlug) return "General Application";
  try {
    const job = await getJobDetailContent(roleSlug);
    const title = job?.header.title?.trim();
    if (title) return title;
  } catch {
    // fall through to the explicit label below
  }
  return `Unlisted role (${roleSlug})`;
}

// Strapi's documented two-step flow: upload the file to /api/upload (multipart, field
// name "files") to get back a file id, then create the entry as plain JSON — same as
// submitFormSubmission above — with that id in `resume`.
export async function submitCareersApplication(
  payload: CareersApplicationPayload
): Promise<FormSubmissionResult> {
  try {
    // Bot filled the hidden field: pretend success so it learns nothing, store nothing.
    if (payload?.website) return { ok: true };

    const ip = await clientIp();
    if (!allowRequest(`careers:ip:${ip}`, MAX_PER_IP, RATE_WINDOW_MS)) return { ok: false };
    if (!allowRequest("careers:global", MAX_GLOBAL, RATE_WINDOW_MS)) return { ok: false };

    const parsed = careersApplicationSchema.safeParse(payload);
    if (!parsed.success) return { ok: false };
    const { resume, roleSlug, name, email, linkedinUrl, message } = parsed.data;
    const fields = { name, email, linkedinUrl, message, category: "careers" };
    const position = await resolvePosition(roleSlug);

    const uploadBody = new FormData();
    uploadBody.append("files", resume, resume.name);

    const uploadRes = await fetch(`${CMS_API_URL}/api/upload`, {
      method: "POST",
      body: uploadBody,
    });
    if (!uploadRes.ok) return { ok: false };

    const uploaded: { id: number; url?: string }[] = await uploadRes.json();
    const fileId = uploaded[0]?.id;
    if (!fileId) return { ok: false };

    const res = await fetch(`${CMS_API_URL}/api/form-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { ...fields, resume: [fileId] } }),
    });
    if (!res.ok) return { ok: false };

    // Saved in the CMS — now notify HR. Fails soft, so the candidate still sees success
    // even if the e-mail cannot be sent.
    const resumePath = uploaded[0]?.url;
    await sendCareersNotification({
      position,
      name,
      email,
      linkedinUrl,
      message,
      resume,
      resumeUrl: resumePath ? new URL(resumePath, CMS_API_URL).toString() : undefined,
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

"use server";

import { headers } from "next/headers";
import { after } from "next/server";
import { z } from "zod";
import { CMS_API_URL } from "./fetcher";
import { getJobDetailContent } from "./job-detail";
import { sendCareersNotification } from "@/lib/notify-careers";
import { envPositiveInt } from "@/lib/env";
import { takeRequest, type RateLimit } from "@/lib/rate-limit";
import { validateEmail, validateLinkedinUrl, validateMessage, validateName, validateResume } from "@/lib/validations";

export type FormSubmissionPayload = {
  name?: string;
  email: string;
  category: string;
  company?: string;
  projectInfo?: string;
  inquiryOptions?: string[];
};

// `reason` lets the form tell "try again later" (rate limited) apart from a real error.
export type FormSubmissionResult = { ok: true } | { ok: false; reason?: "rate_limited" | "error" };

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
  /**
   * Honeypot — hidden from real users, so any value means a bot filled the form. The
   * form field behind it has a deliberately meaningless name: a common name like
   * "website" can be autofilled by browsers or password managers, which would silently
   * drop a real application.
   */
  trap?: string;
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
  trap: z.string().optional(),
});

// Per-IP limit stops one sender flooding HR; the global cap keeps the HR mailbox well
// under Microsoft Graph's ~30 messages/minute throttle even if IPs rotate.
// Optional env overrides (server-only, read at runtime); unset/invalid uses the default.
const RATE_WINDOW_MS = envPositiveInt("CAREERS_RATE_WINDOW_MS", 10 * 60 * 1000);
const MAX_PER_IP = envPositiveInt("CAREERS_MAX_PER_IP", 5);
const MAX_GLOBAL = envPositiveInt("CAREERS_MAX_GLOBAL", 60);

// nginx (the only proxy in front of the app) must set X-Real-IP to $remote_addr, which
// overwrites any client-sent value. Fallback: the LAST X-Forwarded-For entry, the one
// nginx appends; earlier entries are client-supplied. Returns null when neither is present.
async function clientIp(): Promise<string | null> {
  const h = await headers();
  const realIp = h.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const forwarded = h.get("x-forwarded-for")?.split(",").map((s) => s.trim()).filter(Boolean);
  return forwarded?.at(-1) ?? null;
}

function rateLimitsFor(ip: string | null): RateLimit[] {
  const global: RateLimit = { key: "careers:global", limit: MAX_GLOBAL, windowMs: RATE_WINDOW_MS };
  // No client IP means the proxy isn't forwarding it. Lumping every such request into
  // one shared "unknown" bucket would let 5 submissions lock everyone out, so fall back
  // to the global cap alone and say so in the log.
  if (!ip) {
    console.warn("[careers] no X-Real-IP / X-Forwarded-For header — per-IP limit skipped; check nginx");
    return [global];
  }
  return [{ key: `careers:ip:${ip}`, limit: MAX_PER_IP, windowMs: RATE_WINDOW_MS }, global];
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
    if (payload?.trap) return { ok: true };

    // Validate before rate limiting, so malformed requests can't use up the shared
    // global cap and block real applicants.
    const parsed = careersApplicationSchema.safeParse(payload);
    if (!parsed.success) {
      console.warn("[careers] rejected invalid application payload", parsed.error.issues.map((i) => i.path.join(".")));
      return { ok: false, reason: "error" };
    }

    // Records a hit on the per-IP and global limits together, or on neither.
    if (!takeRequest(rateLimitsFor(await clientIp()))) {
      console.warn("[careers] application rate-limited");
      return { ok: false, reason: "rate_limited" };
    }

    const { resume, roleSlug, name, email, linkedinUrl, message } = parsed.data;
    const fields = { name, email, linkedinUrl, message, category: "careers" };
    const position = await resolvePosition(roleSlug);

    const uploadBody = new FormData();
    uploadBody.append("files", resume, resume.name);

    const uploadRes = await fetch(`${CMS_API_URL}/api/upload`, {
      method: "POST",
      body: uploadBody,
    });
    if (!uploadRes.ok) {
      console.error(`[careers] CMS resume upload failed: ${uploadRes.status} ${await uploadRes.text()}`);
      return { ok: false, reason: "error" };
    }

    const uploaded: { id: number; url?: string }[] = await uploadRes.json();
    const fileId = uploaded[0]?.id;
    if (!fileId) {
      console.error("[careers] CMS resume upload returned no file id");
      return { ok: false, reason: "error" };
    }

    const res = await fetch(`${CMS_API_URL}/api/form-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { ...fields, resume: [fileId] } }),
    });
    if (!res.ok) {
      // The resume is already in the Strapi media library but no entry points to it.
      // Not deleted from here: that would need the public role to have upload-delete
      // permission, which would let anyone delete any media. Logged so it can be removed
      // by hand (Media Library -> file id below).
      console.error(
        `[careers] CMS entry creation failed: ${res.status} ${await res.text()} — orphaned resume file id ${fileId}`
      );
      return { ok: false, reason: "error" };
    }

    // Saved in the CMS — now notify HR, after the response is sent, so a slow Graph call
    // never delays the candidate. It fails soft and logs a "[careers-notify] ALERT" line.
    const resumePath = uploaded[0]?.url;
    const resumeUrl = resumePath ? new URL(resumePath, CMS_API_URL).toString() : undefined;
    after(async () => {
      await sendCareersNotification({ position, name, email, linkedinUrl, message, resume, resumeUrl });
    });
    return { ok: true };
  } catch (err) {
    console.error("[careers] application submission failed", err);
    return { ok: false, reason: "error" };
  }
}

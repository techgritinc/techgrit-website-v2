"use server";

import { CMS_API_URL } from "./fetcher";
import { sendCareersNotification } from "@/lib/notify-careers";

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
  category: string;
  /** Role title — used only for the HR notification e-mail, NOT sent to the CMS. */
  position?: string;
};

// Instead, use Strapi's documented two-step flow: upload the file to /api/upload
// (multipart, field name "files") to get back a file id, then create the entry as
// plain JSON — same as submitFormSubmission above — with that id in `resume`.
export async function submitCareersApplication(
  payload: CareersApplicationPayload
): Promise<FormSubmissionResult> {
  try {
    const { resume, position, ...fields } = payload;

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
      position: position || "General Application",
      name: fields.name,
      email: fields.email,
      linkedinUrl: fields.linkedinUrl,
      message: fields.message,
      resume,
      resumeUrl: resumePath ? new URL(resumePath, CMS_API_URL).toString() : undefined,
    });
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

"use server";

import { CMS_API_URL } from "./fetcher";

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
};

// Instead, use Strapi's documented two-step flow: upload the file to /api/upload
// (multipart, field name "files") to get back a file id, then create the entry as
// plain JSON — same as submitFormSubmission above — with that id in `resume`.
export async function submitCareersApplication(
  payload: CareersApplicationPayload
): Promise<FormSubmissionResult> {
  try {
    const { resume, ...fields } = payload;

    const uploadBody = new FormData();
    uploadBody.append("files", resume, resume.name);

    const uploadRes = await fetch(`${CMS_API_URL}/api/upload`, {
      method: "POST",
      body: uploadBody,
    });
    if (!uploadRes.ok) return { ok: false };

    const uploaded: { id: number }[] = await uploadRes.json();
    const fileId = uploaded[0]?.id;
    if (!fileId) return { ok: false };

    const res = await fetch(`${CMS_API_URL}/api/form-submissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: { ...fields, resume: [fileId] } }),
    });
    if (!res.ok) return { ok: false };
    return { ok: true };
  } catch {
    return { ok: false };
  }
}

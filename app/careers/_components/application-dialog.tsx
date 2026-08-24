"use client";

import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, FormEvent, MouseEvent } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { UploadIcon } from "@/components/ui/icons";
import type { ApplicationFormContent, JobFormField } from "@/cms/types/careers-types";

export interface ApplicationContext {
  mode: "role" | "general";
  roleSlug: string | null;
  roleTitle: string | null;
}

const EMPTY_FIELD: JobFormField = {
  label: "",
  placeholder: null,
  requiredMark: null,
  acceptedFormatsAndSize: null,
  uploadPromptText: null,
};

function requiredMarkNode(mark: JobFormField["requiredMark"]) {
  if (mark === "*") return <span className="text-orange">*</span>;
  if (mark === "optional") return <span className="font-medium text-text-40">- optional</span>;
  return null;
}

type ApplicationFormValues = {
  fullName: string;
  email: string;
  linkedInOrPortfolioUrl: string;
  message: string;
};

type SubmissionStatus = "idle" | "submitted";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const ALLOWED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const EMPTY_VALUES: ApplicationFormValues = {
  fullName: "",
  email: "",
  linkedInOrPortfolioUrl: "",
  message: "",
};

const TITLE_ID = "application-dialog-title";

export function ApplicationDialog({
  isOpen,
  context,
  content,
  onClose,
}: {
  isOpen: boolean;
  context: ApplicationContext;
  content: ApplicationFormContent;
  onClose: () => void;
}) {
  // Fixed CMS order: full name, email, LinkedIn/portfolio URL, resume, "why us" — the CMS's
  // jobFormFields have no field-type discriminator, so each is rendered by position.
  const [
    nameField = EMPTY_FIELD,
    emailField = EMPTY_FIELD,
    urlField = EMPTY_FIELD,
    resumeField = EMPTY_FIELD,
    messageField = EMPTY_FIELD,
  ] = content.fields;
  const [values, setValues] = useState<ApplicationFormValues>(EMPTY_VALUES);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setValues(EMPTY_VALUES);
      setResumeFile(null);
      setStatus("idle");
      setError(null);
    }
  }

  function handleChange(field: keyof ApplicationFormValues) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  function handleResumeChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setResumeFile(null);
      setError(null);
      return;
    }
    const dotIndex = file.name.lastIndexOf(".");
    const extension = dotIndex === -1 ? "" : file.name.slice(dotIndex).toLowerCase();
    if (!ALLOWED_RESUME_TYPES.has(file.type) && !ALLOWED_RESUME_EXTENSIONS.includes(extension)) {
      setError("Only PDF, DOC, and DOCX files are accepted. Please upload a valid file.");
      setResumeFile(null);
      event.target.value = "";
      return;
    }
    if (file.size > MAX_RESUME_BYTES) {
      setError("File is over 5MB. Please upload a smaller file.");
      setResumeFile(null);
      event.target.value = "";
      return;
    }
    setError(null);
    setResumeFile(file);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!values.fullName.trim() || !values.email.trim() || !resumeFile) {
      setError("Please fill in name, email, and attach your resume.");
      return;
    }
    if (!EMAIL_PATTERN.test(values.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setStatus("submitted");
  }

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    
    // Save original styles
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    
    // Calculate scrollbar width to prevent layout shift
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    let focusableElements: HTMLElement[] = [];
    const dialogNode = dialogRef.current;
    if (dialogNode) {
      focusableElements = Array.from(
        dialogNode.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogNode && focusableElements.length > 0) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, status, onClose]);

  if (!isOpen) return null;

  const stopPropagation = (e: MouseEvent<HTMLDivElement>) => e.stopPropagation();

  const positionLabel = context.mode === "role" ? context.roleTitle : "General Application";
  const firstName = values.fullName.trim().split(" ")[0];
  const thanksLine = firstName ? `Thanks, ${firstName}` : "Thanks";

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-[var(--color-overlay-scrim-72)] backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[560px] max-h-[92vh] flex flex-col rounded-[20px] border border-border-14 bg-[image:var(--gradient-dialog-panel)] shadow-[var(--shadow-dialog-apply)] overflow-hidden"
        onClick={stopPropagation}
        role="dialog"
        aria-labelledby={TITLE_ID}
        aria-modal="true"
      >
        <div
          ref={dialogRef}
          className="overflow-y-auto w-full [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--color-scrollbar-thumb)] hover:[&::-webkit-scrollbar-thumb]:bg-[var(--color-scrollbar-thumb-hover)]"
        >
        {status === "submitted" ? (
          <div className="px-10 py-12 text-center">
            <div className="mx-auto flex h-[76px] w-[76px] items-center justify-center rounded-full border border-[var(--color-border-green-45)] bg-[var(--color-overlay-green-15)]">
              <svg
                width="34"
                height="34"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--color-green)]"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 id={TITLE_ID} className="mt-[22px] text-[24px] font-bold tracking-[-0.01em] text-white">
              Application received.
            </h3>
            <p className="mx-auto mt-3 max-w-[360px] text-[15.5px] leading-[1.55] text-text-70">
              {thanksLine} &mdash; a hiring lead is going to read your note and get back within{" "}
              <strong>2 business days</strong>.
            </p>
            <Button
              variant="outline"
              onClick={onClose}
              className="mt-[26px] !inline-flex !items-center !gap-2 !rounded-[11px] !border !border-[var(--color-border-15)] !bg-glass !px-[22px] !py-3 !text-[14.5px] !font-bold !text-white !transition-colors hover:!border-[var(--color-border-15)] hover:!bg-glass-10 hover:!-translate-y-0 active:!translate-y-0"
            >
              Close
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex items-start justify-between gap-5 border-b border-border-8 px-8 pb-5 pt-7">
              <div>
                <div className="text-[11.5px] font-bold tracking-[0.14em] text-amber-light uppercase">
                  {content.badgeLabel}
                </div>
                <h3
                  id={TITLE_ID}
                  className="font-display mt-1.5 text-[22px] font-bold leading-[1.2] tracking-[-0.01em] text-white"
                >
                  {positionLabel}
                </h3>
                <p className="mt-1 text-[13.5px] text-text-55">{content.subtitle}</p>
              </div>
              <Button
                variant="outline"
                onClick={onClose}
                aria-label="Close"
                className="!flex !h-[38px] !w-[38px] !shrink-0 !items-center !justify-center !rounded-[10px] !border !border-border-14 !bg-glass !p-0 !text-white !transition-colors hover:!border-orange hover:!bg-glass hover:!-translate-y-0 active:!translate-y-0"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </Button>
            </div>

            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-3.5 px-8 pb-7 pt-[22px]"
            >
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 ">
                <FormField
                  label={
                    <>
                      {nameField.label} {requiredMarkNode(nameField.requiredMark)}
                    </>
                  }
                  labelClassName="mb-1.5 block text-[12.5px] font-semibold text-text-70"
                  hideLabel={false}
                  required={nameField.requiredMark === "*"}
                  type="text"
                  name="fullName"
                  placeholder={nameField.placeholder ?? undefined}
                  value={values.fullName}
                  onChange={handleChange("fullName")}
                  inputClassName="!w-full !rounded-[10px] !border !border-border-strong !bg-glass !px-[14px] !py-[12px] !text-[16px] sm:!text-[14px] !text-white !outline-none !transition-colors placeholder:!text-[var(--color-text-35)] focus:!border-orange focus:!bg-glass"
                />
                <FormField
                  label={
                    <>
                      {emailField.label} {requiredMarkNode(emailField.requiredMark)}
                    </>
                  }
                  labelClassName="mb-1.5 block text-[12.5px] font-semibold text-text-70"
                  hideLabel={false}
                  required={emailField.requiredMark === "*"}
                  type="email"
                  name="email"
                  placeholder={emailField.placeholder ?? undefined}
                  value={values.email}
                  onChange={handleChange("email")}
                  inputClassName="!w-full !rounded-[10px] !border !border-border-strong !bg-glass !px-[14px] !py-[12px] !text-[16px] sm:!text-[14px] !text-white !outline-none !transition-colors placeholder:!text-[var(--color-text-35)] focus:!border-orange focus:!bg-glass"
                />
              </div>

              <FormField
                label={
                  <>
                    {urlField.label} {requiredMarkNode(urlField.requiredMark)}
                  </>
                }
                labelClassName="mb-1.5 block text-[12.5px] font-semibold text-text-70"
                hideLabel={false}
                required={urlField.requiredMark === "*"}
                type="url"
                name="linkedInOrPortfolioUrl"
                placeholder={urlField.placeholder ?? undefined}
                value={values.linkedInOrPortfolioUrl}
                onChange={handleChange("linkedInOrPortfolioUrl")}
                inputClassName="!w-full !rounded-[10px] !border !border-border-strong !bg-glass !px-[14px] !py-[12px] !text-[16px] sm:!text-[14px] !text-white !outline-none !transition-colors placeholder:!text-[var(--color-text-35)] focus:!border-orange focus:!bg-glass"
              />

              <div>
                <label className="mb-1.5 block text-[12.5px] font-semibold text-text-70">
                  {resumeField.label} {requiredMarkNode(resumeField.requiredMark)}{" "}
                  {resumeField.acceptedFormatsAndSize && (
                    <span className="font-medium text-text-40">- {resumeField.acceptedFormatsAndSize}</span>
                  )}
                </label>
                <label className="relative flex cursor-pointer items-center gap-[12px] rounded-[12px] border border-dashed border-[var(--color-border-24)] bg-glass-4 px-4 py-3.5 transition-colors hover:border-[var(--color-border-40)] hover:bg-glass-10">
                  <input
                    required={resumeField.requiredMark === "*"}
                    type="file"
                    accept={RESUME_ACCEPT}
                    onChange={handleResumeChange}
                    className="absolute h-px w-px overflow-hidden opacity-0"
                  />
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-[var(--color-border-orange-35)] bg-[var(--color-overlay-orange-14)] text-amber-light">
                    <UploadIcon className="h-[18px] w-[18px]" />
                  </span>
                  <span>
                    <span className="block text-[14px] font-bold text-white">
                      {resumeFile ? resumeFile.name : resumeField.uploadPromptText}
                    </span>
                    <span className="block text-[12px] text-text-55">
                      {resumeFile ? "Click to replace file" : resumeField.acceptedFormatsAndSize}
                    </span>
                  </span>
                </label>
              </div>

              <FormField
                label={
                  <>
                    {messageField.label} {requiredMarkNode(messageField.requiredMark)}
                  </>
                }
                labelClassName="mb-1.5 block text-[12.5px] font-semibold text-text-70"
                hideLabel={false}
                multiline
                name="message"
                placeholder={messageField.placeholder ?? undefined}
                rows={3}
                value={values.message}
                onChange={handleChange("message")}
                inputClassName="!min-h-[88px] !w-full !resize-y !rounded-[10px] !border !border-border-strong !bg-glass !px-[14px] !py-[12px] !text-[16px] sm:!text-[14px] !text-white !outline-none !transition-colors placeholder:!text-[var(--color-text-35)] focus:!border-orange focus:!bg-glass"
              />

              {error && (
                <div className="rounded-lg border border-overlay-red-40 bg-[var(--color-overlay-red-15)] px-3 py-2.5 text-[13px] font-semibold text-error-light">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="mt-1.5 !min-h-[52px] !gap-[9px] !rounded-[12px] !px-[24px] !py-[15px] !text-[15.5px]"
              >
                {content.ctaLabel} <span className="text-[16px]">&#8594;</span>
              </Button>
              <p className="text-center text-[12px] text-text-40">{content.privacyNote}</p>
            </form>
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

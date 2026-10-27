"use client";

import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, FormEvent, MouseEvent } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import FormField, { REQUIRED_ASTERISK } from "@/components/ui/FormField";
import { UploadIcon, CloseIcon } from "@/components/ui/icons";
import { submitCareersApplication } from "@/cms/api/form-submissions";
import { validateName, validateEmail, validateLinkedinUrl, validateResume, validateMessage } from "@/lib/validations";
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
  icon: null,
};

function requiredMarkNode(mark: JobFormField["requiredMark"]) {
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

const RESUME_ACCEPT =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

const EMPTY_VALUES: ApplicationFormValues = {
  fullName: "",
  email: "",
  linkedInOrPortfolioUrl: "",
  message: "",
};

const TITLE_ID = "application-dialog-title";

// Fixed-height slot, always rendered, so a field's neighbors don't jump when its
// error message appears/disappears.
function FieldError({ message }: { message: string | null }) {
  return (
    <div className="mt-1.5 min-h-[18px]">
      {message && (
        <p role="alert" className="text-xs font-semibold text-error leading-[normal]">
          {message}
        </p>
      )}
    </div>
  );
}

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
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const [messageError, setMessageError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setValues(EMPTY_VALUES);
      setResumeFile(null);
      setStatus("idle");
      setNameError(null);
      setEmailError(null);
      setUrlError(null);
      setResumeError(null);
      setMessageError(null);
      setSubmitError(null);
      setIsSubmitting(false);
    }
  }

  function handleChange(field: keyof ApplicationFormValues) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
      if (field === "fullName") setNameError(null);
      if (field === "email") setEmailError(null);
      if (field === "linkedInOrPortfolioUrl") setUrlError(null);
      if (field === "message") setMessageError(null);
    };
  }

  function handleResumeChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) {
      setResumeFile(null);
      setResumeError(null);
      return;
    }
    const result = validateResume.safeParse(file);
    if (!result.success) {
      setResumeError(result.error.issues[0].message);
      setResumeFile(null);
      event.target.value = "";
      return;
    }
    setResumeError(null);
    setResumeFile(result.data);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitError(null);

    const nameResult = validateName("Full name").safeParse(values.fullName);
    if (!nameResult.success) {
      setNameError(nameResult.error.issues[0].message);
      return;
    }
    setNameError(null);

    const emailResult = validateEmail.safeParse(values.email);
    if (!emailResult.success) {
      setEmailError(emailResult.error.issues[0].message);
      return;
    }
    setEmailError(null);

    const trimmedUrl = values.linkedInOrPortfolioUrl.trim();
    if (trimmedUrl) {
      const urlResult = validateLinkedinUrl.safeParse(trimmedUrl);
      if (!urlResult.success) {
        setUrlError(urlResult.error.issues[0].message);
        return;
      }
    }
    setUrlError(null);

    const resumeResult = validateResume.safeParse(resumeFile);
    if (!resumeResult.success) {
      setResumeError(resumeResult.error.issues[0].message);
      return;
    }
    setResumeError(null);

    const trimmedMessage = values.message.trim();
    let validatedMessage: string | undefined;
    if (trimmedMessage) {
      const messageResult = validateMessage("Message").safeParse(trimmedMessage);
      if (!messageResult.success) {
        setMessageError(messageResult.error.issues[0].message);
        return;
      }
      validatedMessage = messageResult.data;
    }
    setMessageError(null);

    setIsSubmitting(true);
    const result = await submitCareersApplication({
      name: nameResult.data,
      email: emailResult.data,
      linkedinUrl: trimmedUrl || undefined,
      message: validatedMessage,
      resume: resumeResult.data,
      category: "careers",
    });
    setIsSubmitting(false);

    if (!result.ok) {
      setSubmitError("Something went wrong. Please try again.");
      return;
    }

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
        ref={dialogRef}
        className="relative w-full max-w-[560px] max-h-[92vh] flex flex-col rounded-[20px] border border-border-14 bg-[image:var(--gradient-dialog-panel)] shadow-[var(--shadow-dialog-apply)] overflow-hidden"
        onClick={stopPropagation}
        role="dialog"
        aria-labelledby={TITLE_ID}
        aria-modal="true"
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
          <>
            <div className="shrink-0 flex items-start justify-between gap-5 border-b border-border-8 px-8 pb-5 pt-7">
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
                <CloseIcon width={18} height={18} strokeWidth={2.4} strokeLinecap="butt" />
              </Button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--color-scrollbar-thumb)] hover:[&::-webkit-scrollbar-thumb]:bg-[var(--color-scrollbar-thumb-hover)]">
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-3.5 px-8 pb-7 pt-[22px]"
            >
              <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 ">
                <div>
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
                    error={nameError}
                    reserveErrorSpace
                    inputClassName="!w-full !rounded-[10px] !border !border-border-strong !bg-glass !px-[14px] !py-[12px] !text-[16px] sm:!text-[14px] !text-white !outline-none !transition-colors placeholder:!text-[var(--color-text-35)] focus:!border-orange focus:!bg-glass"
                  />
                </div>
                <div>
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
                    error={emailError}
                    reserveErrorSpace
                    inputClassName="!w-full !rounded-[10px] !border !border-border-strong !bg-glass !px-[14px] !py-[12px] !text-[16px] sm:!text-[14px] !text-white !outline-none !transition-colors placeholder:!text-[var(--color-text-35)] focus:!border-orange focus:!bg-glass"
                  />
                </div>
              </div>

              <div>
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
                  error={urlError}
                  reserveErrorSpace
                  inputClassName="!w-full !rounded-[10px] !border !border-border-strong !bg-glass !px-[14px] !py-[12px] !text-[16px] sm:!text-[14px] !text-white !outline-none !transition-colors placeholder:!text-[var(--color-text-35)] focus:!border-orange focus:!bg-glass"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-[12.5px] font-semibold text-text-70">
                  {resumeField.label} {resumeField.requiredMark === "*" && REQUIRED_ASTERISK}
                  {requiredMarkNode(resumeField.requiredMark)}
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
                    {resumeField.icon ? (
                      <Image src={resumeField.icon.url} alt={resumeField.icon.alt} width={18} height={18} />
                    ) : (
                      <UploadIcon className="h-[18px] w-[18px]" />
                    )}
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
                <FieldError message={resumeError} />
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
                error={messageError}
                reserveErrorSpace
                inputClassName="!min-h-[88px] !max-h-[88px] !w-full resize-none modal-scrollbar !rounded-[10px] !border !border-border-strong !bg-glass !px-[14px] !py-[12px] !text-[16px] sm:!text-[14px] !text-white !outline-none !transition-colors placeholder:!text-[var(--color-text-35)] focus:!border-orange focus:!bg-glass"
              />

              <div className="min-h-[18px]">
                {submitError && (
                  <p role="alert" className="text-center text-[13px] font-semibold text-error leading-[normal]">
                    {submitError}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="mt-1.5 !min-h-[52px] !gap-[9px] !rounded-[12px] !px-[24px] !py-[15px] !text-[15.5px]"
              >
                {content.ctaLabel} <span className="text-[16px]">&#8594;</span>
              </Button>
              <p className="text-center text-[12px] text-text-40">{content.privacyNote}</p>
            </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

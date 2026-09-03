"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { CheckIcon } from "@/components/ui/icons";
import { submitFormSubmission } from "@/cms/api/form-submissions";
import { validateName, validateEmail, validateCompany, validateProjectInfo } from "@/lib/validations";
import type { BookCallBannerSection, ContactFormSection, ContactHeroSection } from "@/cms/types/contact-types";

/* Contact-form-specific field styling — passed to FormField via inputBaseClassName
   so it fully replaces the default INPUT_BASE (different radius, bg, font, placeholder). */
const CONTACT_INPUT_BASE =
  "w-full bg-[var(--color-glass)] border border-[var(--color-border)] rounded-[12px] px-4 py-[14px] text-[15px] text-white outline-none transition-colors focus:border-[var(--color-border-orange-strong)] focus:bg-[var(--color-glass-hover)] placeholder:text-[var(--color-text-placeholder)] font-[inherit]";
const CONTACT_LABEL = "block text-[13px] font-semibold text-white/70 mb-[7px]";

const ICON_WRAPPER_CLASSES = [
  "bg-orange/10 border-orange/30",
  "bg-blue/10 border-blue-light/30",
  "bg-teal-light/10 border-teal-light/30",
];

type ContactHeroFormProps = {
  hero: ContactHeroSection;
  form: ContactFormSection;
  bookCall?: BookCallBannerSection;
};

export default function ContactHeroForm({ hero, form, bookCall }: ContactHeroFormProps) {
  const [topic, setTopic] = useState(form.inquiryOptions[0]?.title ?? "");
  const [values, setValues] = useState<Record<number, string>>({});
  const [fieldErrors, setFieldErrors] = useState<Record<number, string | null>>({});
  const [sent, setSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // titleHighlight is already verified server-side (cms/api/contact.ts) to be a genuine
  // substring of title, or null — split() here is always safe.
  const [titleBefore, titleAfter] = hero.titleHighlight
    ? hero.title.split(hero.titleHighlight)
    : [hero.title, ""];

  const singleLineFields = form.fields.filter((field) => !field.multiline);
  const multilineFields = form.fields.filter((field) => field.multiline);
  const firstName = (values[singleLineFields[0]?.order ?? -1] ?? "").trim().split(" ")[0];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrorMessage(null);

    const nameField = singleLineFields[0];
    const emailField = singleLineFields[1];
    const companyField = singleLineFields[2];
    const projectField = multilineFields[0];

    const rawName = (values[nameField?.order ?? -1] ?? "").trim();
    const nameResult = validateName("Name").safeParse(rawName);
    if (!nameResult.success) {
      setFieldErrors({ [nameField.order]: nameResult.error.issues[0].message });
      return;
    }

    const rawEmail = (values[emailField?.order ?? -1] ?? "").trim();
    const emailResult = validateEmail.safeParse(rawEmail);
    if (!emailResult.success) {
      setFieldErrors({ [emailField.order]: emailResult.error.issues[0].message });
      return;
    }

    // Company stays optional — only validated (for length) when the user actually fills it in.
    let validatedCompany: string | undefined;
    if (companyField) {
      const rawCompany = (values[companyField.order] ?? "").trim();
      if (rawCompany) {
        const companyResult = validateCompany().safeParse(rawCompany);
        if (!companyResult.success) {
          setFieldErrors({ [companyField.order]: companyResult.error.issues[0].message });
          return;
        }
        validatedCompany = companyResult.data;
      }
    }

    const rawProject = (values[projectField?.order ?? -1] ?? "").trim();
    const projectResult = validateProjectInfo.safeParse(rawProject);
    if (!projectResult.success) {
      setFieldErrors({ [projectField.order]: projectResult.error.issues[0].message });
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);
    const result = await submitFormSubmission({
      name: nameResult.data,
      email: emailResult.data,
      company: validatedCompany,
      projectInfo: projectResult.data,
      inquiryOptions: [topic],
      category: "contact",
    });
    setIsSubmitting(false);

    if (!result.ok) {
      setErrorMessage("Something went wrong. Please try again.");
      return;
    }

    setSent(true);
  }

  function handleReset() {
    setSent(false);
    setValues({});
    setFieldErrors({});
    setErrorMessage(null);
  }

  return (
    <div className="grid grid-cols-1 tg-md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-8.5 tg-md:gap-15 items-start leading-[normal]">
      {/* Intro + contact info */}
      <div className="pt-2">
        <div
          data-rise
          style={{ animationDelay: ".05s" }}
          className="inline-flex items-center gap-2.5 bg-overlay-orange-10 border border-[var(--color-border-orange)] px-4 py-2 rounded-full mb-6"
        >
          <span className="text-[12.5px] font-bold tracking-[0.1em] text-white/[.92] uppercase">
            {hero.badgeLabel}
          </span>
        </div>

        <h1
          data-rise
          style={{ animationDelay: ".12s" }}
          className="text-[clamp(38px,4.8vw,54px)] leading-[1.05] font-bold tracking-[-0.035em] text-white"
        >
          {titleBefore}
          {hero.titleHighlight ? <span className="text-gradient">{hero.titleHighlight}</span> : null}
          {titleAfter}
        </h1>

        <p
          data-rise
          style={{ animationDelay: ".2s" }}
          className="mt-5 max-w-110 text-[18px] leading-[1.65] text-[var(--color-text-secondary)]"
        >
          {hero.subtitle}
        </p>

        <div
          data-rise
          style={{ animationDelay: ".28s" }}
          className="mt-8.5 flex flex-col gap-4.5"
        >
          {hero.contactDetails.map((item, index) => {
            const content = (
              <>
                <span
                  className={`w-11.5 h-11.5 rounded-[12px] flex items-center justify-center shrink-0 border ${ICON_WRAPPER_CLASSES[index % ICON_WRAPPER_CLASSES.length]}`}
                >
                  {item.icon && (
                    <Image src={item.icon.url} alt={item.icon.alt} width={20} height={20} />
                  )}
                </span>
                <span>
                  <span className="block text-[12.5px] text-white/50 font-semibold">{item.label}</span>
                  <span className="block text-[16px] text-white font-bold">{item.value}</span>
                </span>
              </>
            );

            if (item.href) {
              return (
                <a
                  key={item.order}
                  href={item.href}
                  className="flex items-center gap-3.5 hover:opacity-85 transition-opacity"
                >
                  {content}
                </a>
              );
            }

            return (
              <div key={item.order} className="flex items-center gap-3.5">
                {content}
              </div>
            );
          })}
        </div>

        {/* Skip the form — direct scheduling path. Placeholder target only when the CMS
            doesn't supply a real ctaLink: no Calendly widget/script is embedded. */}
        {bookCall && (
          <div
            data-rise
            style={{ animationDelay: ".34s" }}
            className="mt-7.5 flex items-center gap-3.5 flex-wrap rounded-2xl border border-overlay-orange-strong bg-[image:var(--gradient-skip-form)] backdrop-blur-md px-6 py-5.5"
          >
            <span className="w-11 h-11 rounded-[12px] bg-orange/20 border border-orange/40 inline-flex items-center justify-center shrink-0">
              {bookCall.icon && (
                <Image src={bookCall.icon.url} alt={bookCall.icon.alt} width={20} height={20} />
              )}
            </span>
            <div className="flex-1 min-w-45">
              <div className="text-[12.5px] font-bold tracking-08 uppercase text-[var(--color-amber-light)]">
                {bookCall.title}
              </div>
              <div className="mt-0.75 text-[15px] font-semibold text-white leading-[1.35]">
                {bookCall.subtitle}
              </div>
            </div>
            <Button href={bookCall.ctaLink || "#"} variant="primary" size="nav">
              {bookCall.ctaLabel}{" "}
              <span aria-hidden="true" className="text-[15px]">
                &#8594;
              </span>
            </Button>
          </div>
        )}
      </div>

      {/* Form card */}
      <div
        data-rise
        style={{ animationDelay: ".2s" }}
        className="relative rounded-[24px] border border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-[10px] px-8.5 py-9 shadow-[var(--shadow-glass)]"
      >
        <div
          aria-hidden
          className="absolute -top-px left-7.5 right-7.5 h-0.5 bg-gradient-to-r from-transparent via-orange/70 to-transparent"
        />

        {sent ? (
          <div className="flex flex-col items-center text-center p-[30px_6px_10px]">
            <div className="w-16 h-16 rounded-full bg-teal-light/15 border border-teal-light/40 flex items-center justify-center mb-5">
              <CheckIcon width={30} height={30} strokeWidth={2.5} className="text-teal-light" />
            </div>
            <h3 className="text-2xl font-bold text-white">Message sent.</h3>
            <p className="mt-2.5 text-[16px] leading-[1.6] text-white/70 max-w-[340px]">
              Thanks{firstName ? `, ${firstName}` : ""} — we&apos;ve received your note and will
              reply within one business day.
            </p>
            <Button
              type="button"
              onClick={handleReset}
              variant="outline"
              size="md"
              className="mt-5.5 !bg-glass-strong !border-border-strong hover:!bg-glass-hover hover:!border-border-strong"
            >
              Send another
            </Button>
          </div>
        ) : (
          <div>
            <div className="text-[13px] font-bold tracking-[0.04em] text-white/60 mb-3.5">
              {form.inquiryLabel}
            </div>
            <div className="flex gap-2 flex-wrap mb-6">
              {form.inquiryOptions.map((option) => {
                const active = topic === option.title;
                return (
                  <button
                    key={option.order}
                    type="button"
                    onClick={() => setTopic(option.title)}
                    className={`font-[inherit] text-[13.5px] font-bold py-2.25 px-3.75 rounded-[30px] cursor-pointer whitespace-nowrap transition-all duration-200 ease-in-out border ${
                      active
                        ? "border-[var(--color-border-orange-strong)] bg-[var(--color-overlay-orange)] text-white"
                        : "border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-text-secondary)] hover:bg-[var(--color-glass-hover)]"
                    }`}
                  >
                    {option.title}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
              {/* First two single-line fields share a row (matches the reference's name+email
                  pairing); any further single-line fields each get their own full-width row. */}
              <div className="grid grid-cols-1 tg-sm:grid-cols-2 gap-4">
                {singleLineFields.slice(0, 2).map((field) => (
                  <FormField
                    key={field.order}
                    label={field.label}
                    hideLabel={false}
                    labelClassName={CONTACT_LABEL}
                    inputBaseClassName={CONTACT_INPUT_BASE}
                    required
                    placeholder={field.placeholder}
                    value={values[field.order] ?? ""}
                    onChange={(e) => {
                      setValues((prev) => ({ ...prev, [field.order]: e.target.value }));
                      setFieldErrors((prev) => ({ ...prev, [field.order]: null }));
                    }}
                    error={fieldErrors[field.order]}
                    reserveErrorSpace
                  />
                ))}
              </div>

              {singleLineFields.slice(2).map((field) => (
                <FormField
                  key={field.order}
                  label={field.label}
                  hideLabel={false}
                  labelClassName={CONTACT_LABEL}
                  inputBaseClassName={CONTACT_INPUT_BASE}
                  placeholder={field.placeholder}
                  value={values[field.order] ?? ""}
                  onChange={(e) => {
                    setValues((prev) => ({ ...prev, [field.order]: e.target.value }));
                    setFieldErrors((prev) => ({ ...prev, [field.order]: null }));
                  }}
                  error={fieldErrors[field.order]}
                  reserveErrorSpace
                />
              ))}

              {multilineFields.map((field) => (
                  <FormField
                    key={field.order}
                    label={field.label}
                    hideLabel={false}
                    labelClassName={CONTACT_LABEL}
                    inputBaseClassName={CONTACT_INPUT_BASE}
                    multiline
                    rows={4}
                    required
                    placeholder={field.placeholder}
                    value={values[field.order] ?? ""}
                    onChange={(e) => {
                      setValues((prev) => ({ ...prev, [field.order]: e.target.value }));
                      setFieldErrors((prev) => ({ ...prev, [field.order]: null }));
                    }}
                    error={fieldErrors[field.order]}
                    reserveErrorSpace
                    inputClassName="resize-none min-h-[108px] modal-scrollbar"
                  />
                ))}

              
              <div className="min-h-[12px]">
                {errorMessage && (
                  <div
                    role="alert"
                    className="px-3 py-2.5 text-[13px] font-semibold text-error-light"
                  >
                    {errorMessage}
                  </div>
                )}
              </div>

              <Button type="submit" variant="primary" size="hero" disabled={isSubmitting} className="w-full mt-1">
                {form.submitLabel} <span className="text-[17px]">&#8594;</span>
              </Button>
              <p className="text-[12.5px] text-white/45 text-center leading-[1.5]">
                {form.disclaimer}
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

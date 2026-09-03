"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import type { NewsletterData } from "@/cms/api/home/newsletter";
import { submitFormSubmission } from "@/cms/api/form-submissions";
import { validateName, validateEmail } from "@/lib/validations";

type Status = "idle" | "success";


const ERROR_BANNER_CLASSES =
  "mt-2 w-full text-white bg-overlay-orange border border-orange rounded-[8px] px-[13px] py-2.5 text-[14px] leading-[normal] font-semibold";

export default function SubscribeBand({ data }: { data: NewsletterData }) {
  const [namePlaceholder, emailPlaceholder] = data.fields.map((field) => field.placeholder);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNameError(null);
    setEmailError(null);

    const nameResult = validateName("Name").safeParse(name);
    if (!nameResult.success) {
      setNameError(nameResult.error.issues[0].message);
      return;
    }
    const emailResult = validateEmail.safeParse(email);
    if (!emailResult.success) {
      setEmailError(emailResult.error.issues[0].message);
      return;
    }

    setIsSubmitting(true);
    const result = await submitFormSubmission({
      name: nameResult.data,
      email: emailResult.data,
      category: "webinar",
    });
    setIsSubmitting(false);

    if (!result.ok) {

      setEmailError("Please try again.");
      return;
    }

    setStatus("success");
  }

  return (
    <section id="webinars" className="relative z-overlay scroll-mt-[90px]">
      <div className="mx-auto max-w-[1280px] px-9 py-20">
        <div className="mb-8">
          <h2 className="max-w-140 text-[44px] leading-[46.64px]">{data.sectionTitle}</h2>
          <p className="mt-4 max-w-[540px] whitespace-pre-line text-[17px] leading-[27.2px] text-muted">
            {data.sectionSubtitle}
          </p>
        </div>

        <div className="glass-card px-11 py-[38px]">
          <div className="grid grid-cols-[0.8fr_1.4fr] items-center gap-10 max-tg-md:grid-cols-1 max-tg-md:gap-11">
            <div>
              <h3 className="text-[length:var(--text-blog-newsletter-heading)] leading-[var(--lh-newsletter-heading)]">
                {data.title}
              </h3>
              <p className="mt-2 text-[16px] [line-height:var(--lh-relaxed)] text-text-70">{data.subtitle}</p>
            </div>

            {status === "success" ? (
              <div className="w-full tg-sm:w-auto tg-sm:min-w-[300px] rounded-card border border-teal bg-[rgba(15,118,110,0.18)] px-[30px] py-5 text-center">
                <div className="text-2xl text-green">&#10003;</div>
                <div className="mt-1 text-[16px] leading-[normal] font-bold text-primary">Thanks for submitting!</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col tg-sm:flex-row tg-sm:items-start gap-3 w-full">
                <FormField
                  label={namePlaceholder ?? "Name"}
                  name="name"
                  type="text"
                  placeholder={namePlaceholder ?? "Name"}
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  error={nameError}
                  errorClassName={ERROR_BANNER_CLASSES}
                  containerClassName="flex-1 tg-sm:flex-[1_1_0px] min-w-0 w-full"
                  inputClassName="!px-[18px] !py-[15px] !min-h-[52px]"
                />
                <FormField
                  label={emailPlaceholder ?? "Business Email"}
                  name="email"
                  type="email"
                  placeholder={emailPlaceholder ?? "Business Email"}
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  error={emailError}
                  errorClassName={ERROR_BANNER_CLASSES}
                  containerClassName="flex-1 tg-sm:flex-[2_1_0px] min-w-0 w-full"
                  inputClassName="!px-[18px] !py-[15px] !min-h-[52px]"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="shrink-0 w-full tg-sm:w-auto !px-[24px] !py-[15px] !min-h-[52px] !gap-[7px] !rounded-[10px] !shadow-nav-btn"
                >
                  {data.ctaLabel} <span aria-hidden="true" className="inline-block leading-none">&#8594;</span>
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

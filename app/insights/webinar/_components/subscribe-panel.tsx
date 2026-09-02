"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { GlassCard } from "@/components/ui/GlassCard";
import { submitFormSubmission } from "@/cms/api/form-submissions";
import { validateName, validateEmail } from "@/lib/validations";
import type { SubscribePanelContent } from "../_data/types";

type SubscribeStatus = "idle" | "error" | "success";

export function SubscribePanel({ content }: { content: SubscribePanelContent }) {
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const rawName = String(form.get("name") ?? "");
    const rawEmail = String(form.get("email") ?? "");

    const nameResult = validateName("Name").safeParse(rawName);
    if (!nameResult.success) {
      setNameError(nameResult.error.issues[0].message);
      return;
    }
    const emailResult = validateEmail.safeParse(rawEmail);
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
      setEmailError("Something went wrong. Please try again.");
      return;
    }

    setStatus("success");
    formElement.reset();
  }

  function handleInputChange() {
    if (status !== "idle") setStatus("idle");
    setNameError(null);
    setEmailError(null);
  }

  return (
    <section id="subscribe" className="relative scroll-mt-[84px]">
      <div className="tg-container !px-9" style={{ paddingTop: 30, paddingBottom: 90 }}>
        <GlassCard
          variant="blogFeatured"
          hoverBorderColor=""
          className="relative grid grid-cols-1 items-center gap-10 overflow-hidden !rounded-[26px] !px-12 !py-[54px] !backdrop-blur-[12px] hover:!translate-y-0 tg-md:grid-cols-[1.2fr_1fr]"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[120px] left-[30%] h-[320px] w-[480px] rounded-full bg-[rgba(232,119,34,0.2)] blur-glow-100"
          />
          <div className="relative">
            <h2 className="text-[length:var(--text-webinar-newsletter-heading)] leading-[var(--lh-newsletter-heading)] tracking-[-0.03em]">
              {content.heading}
            </h2>
            <p className="mt-3.75 text-[16px] leading-[25.6px] text-[var(--color-text-68)]">{content.copy}</p>
          </div>
          <form onSubmit={handleSubmit} noValidate className="relative flex flex-col gap-3">
            <FormField
              label="Full name"
              name="name"
              type="text"
              required
              placeholder={content.namePlaceholder}
              onChange={handleInputChange}
              error={nameError}
              reserveErrorSpace
              inputClassName="!rounded-card !py-4 !px-tg-7 placeholder:!font-normal"
            />
            <FormField
              label="Email address"
              name="email"
              type="email"
              required
              placeholder={content.formPlaceholder}
              onChange={handleInputChange}
              error={emailError}
              reserveErrorSpace
              inputClassName="!rounded-card !py-4 !px-tg-7 placeholder:!font-normal"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              style={{ fontFamily: "Arial, sans-serif" }}
              className="w-full font-bold !text-[16px] !rounded-card !shadow-btn-subscribe leading-[normal] py-4!"
            >
              {status === "success" ? "Subscribed ✓" : content.ctaLabel}
            </Button>
            {status === "success" && (
              <p className="!mt-3.5 text-sm font-semibold text-teal-light leading-[normal]">{content.successText}</p>
            )}
          </form>
        </GlassCard>
      </div>
    </section>
  );
}

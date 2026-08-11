"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { GlassCard } from "@/components/ui/GlassCard";
import type { SubscribePanelContent } from "../_data/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type SubscribeStatus = "idle" | "error" | "success";

export function SubscribePanel({ content }: { content: SubscribePanelContent }) {
  const [status, setStatus] = useState<SubscribeStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    // Client-side only — no backend/email-CRM call (spec.md FR-015).
    setErrorMessage(null);
    setStatus("success");
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
              label="Email address"
              name="email"
              type="email"
              required
              placeholder={content.formPlaceholder}
              inputClassName="!rounded-card !py-4 !px-tg-7 placeholder:!font-normal"
            />
            <Button
              type="submit"
              style={{ fontFamily: "Arial, sans-serif" }}
              className="w-full font-bold !text-[16px] !rounded-card !shadow-btn-subscribe leading-[normal] py-4!"
            >
              {status === "success" ? "Subscribed ✓" : content.ctaLabel}
            </Button>
            {status === "success" && (
              <p className="text-sm font-semibold text-teal-light !mt-3.5 leading-[normal]">{content.successText}</p>
            )}
            {status === "error" && errorMessage && (
              <p role="alert" className="text-sm font-semibold text-error !mt-3.5 leading-[normal]">
                {errorMessage}
              </p>
            )}
          </form>
        </GlassCard>
      </div>
    </section>
  );
}

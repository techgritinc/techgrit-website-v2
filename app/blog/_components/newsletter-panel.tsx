"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { CheckIcon } from "@/components/ui/icons";
import type { NewsletterPanelContent } from "../_data/types";

type Status = "idle" | "error" | "success";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterPanel({ content }: { content: NewsletterPanelContent }) {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") ?? "").trim();

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
  }

  return (
    <section>
      <div className="mx-auto max-w-(--container-max) px-9 pt-tg-3 pb-tg-23">
        <div className="relative overflow-hidden rounded-4xl border border-border-image bg-glass-4 py-tg-19a px-tg-19">
          <div
            aria-hidden="true"
            className="absolute -top-[110px] right-[4%] size-tg-380 rounded-full bg-overlay-orange-18 blur-glow-xl"
          />

          <div className="relative grid grid-cols-[1.1fr_0.9fr] items-center gap-9 max-tg-md:grid-cols-1">
            <div>
              <h2 className="text-[length:var(--text-blog-newsletter-heading)] leading-[var(--lh-newsletter-heading)]">
                {content.heading}
              </h2>
              <p className="mt-tg-4a max-w-tg-blog-newsletter-copy text-[16px] [line-height:var(--lh-relaxed)] text-text-70">
                {content.copy}
              </p>
            </div>

            <div>
              {status === "success" ? (
                <div className="flex items-center gap-tg-4 rounded-lg border border-border-green-40 bg-overlay-green-12 py-tg-8 px-tg-9">
                  <CheckIcon width={24} height={24} strokeWidth={2.4} className="shrink-0 text-green" />
                  <span className="text-15-5 font-semibold text-primary">{content.successText}</span>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} noValidate className="flex flex-wrap items-start gap-tg-3">
                    <FormField
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="Your work email"
                      error={status === "error" ? content.errorText : undefined}
                      containerClassName="flex-1 min-w-[200px] flex flex-col [&_input]:!flex-1 [&_input]:!rounded-[12px] [&_input]:!px-[18px] [&_input]:!py-[15.5px] [&_input]:!text-[15px] [&_input::placeholder]:!font-normal max-sm:[&_p]:sr-only"
                    />
                    <Button
                      style={{fontFamily: "Arial"}}
                      type="submit"
                      className="!leading-[normal] gap-[9px] !py-tg-4a sm:!py-[16px] !px-tg-11 !text-15-5 !shadow-btn-subscribe !rounded-[12px] active:!shadow-btn-subscribe"
                    >
                      {content.ctaLabel} <span aria-hidden="true" className="text-[16px]">&rarr;</span>
                    </Button>
                    {status === "error" && (
                      <p aria-hidden="true" className="w-full text-2xs sm:mt-tg-3a text-error sm:hidden">
                        {content.errorText}
                      </p>
                    )}
                  </form>
                  {status !== "error" && (
                    <p className="mt-tg-3a text-2xs leading-[normal] text-text-45">{content.helperText}</p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

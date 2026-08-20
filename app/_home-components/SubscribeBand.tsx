"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import type { NewsletterData } from "@/cms/api/home/newsletter";

type Status = "idle" | "error" | "success";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SubscribeBand({ data }: { data: NewsletterData }) {
  const [namePlaceholder, emailPlaceholder] = data.fields.map((field) => field.placeholder);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();

    if (!name) {
      setStatus("error");
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid business email.");
      return;
    }

    // Client-side only — no backend/email-CRM call in this feature (Clarification #1).
    setErrorMessage(null);
    setStatus("success");
  }

  return (
    <section id="webinars" className="relative z-overlay scroll-mt-[90px]">
      <div className="mx-auto max-w-[1280px] px-9 py-20">
        <div className="glass-card px-11 py-[38px]">
          <div className="grid grid-cols-[0.8fr_1.4fr] items-center gap-10 max-tg-md:grid-cols-1 max-tg-md:gap-11">
            <div>
              <h3 className="text-[25px] leading-[1.2]">{data.title}</h3>
              <p className="mt-2 text-[16px] leading-[1.5] text-muted">{data.subtitle}</p>
            </div>

            {status === "success" ? (
              <div className="w-full tg-sm:w-auto tg-sm:min-w-[300px] rounded-card border border-teal bg-[rgba(15,118,110,0.18)] px-[30px] py-5 text-center">
                <div className="text-2xl text-green">&#10003;</div>
                <div className="mt-1 text-[16px] leading-[normal] font-bold text-primary">Thanks for submitting!</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col tg-sm:flex-row tg-sm:items-center gap-3 w-full">
                <FormField
                  label={namePlaceholder ?? "Name"}
                  name="name"
                  type="text"
                  placeholder={namePlaceholder ?? "Name"}
                  containerClassName="flex-1 tg-sm:flex-[1_1_0px] min-w-0 w-full"
                  inputClassName="!px-[18px] !py-[15px] !min-h-[52px]"
                />
                <FormField
                  label={emailPlaceholder ?? "Business Email"}
                  name="email"
                  type="email"
                  placeholder={emailPlaceholder ?? "Business Email"}
                  containerClassName="flex-1 tg-sm:flex-[2_1_0px] min-w-0 w-full"
                  inputClassName="!px-[18px] !py-[15px] !min-h-[52px]"
                />
                <Button
                  type="submit"
                  className="shrink-0 w-full tg-sm:w-auto !px-[24px] !py-[15px] !min-h-[52px] !gap-[7px] !rounded-[10px] !shadow-nav-btn"
                >
                  {data.ctaLabel} <span aria-hidden="true" className="inline-block leading-none">&#8594;</span>
                </Button>
              </form>
            )}
          </div>
          {status === "error" && errorMessage && (
            <div
              role="alert"
              className="mt-[14px] text-white bg-overlay-orange border border-orange rounded-[8px] px-[13px] py-2.5 text-[14px] leading-[normal] font-semibold"
            >
              {errorMessage}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

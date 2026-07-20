"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";

type Status = "idle" | "error" | "success";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SubscribeBand() {
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
    <section id="webinars" className="relative z-overlay scroll-mt-[90px] border-t border-border-subtle bg-[rgba(255,255,255,0.015)]">
      <div className="mx-auto max-w-[1020px] px-9 py-[88px]">
        <div className="glass-card px-11 py-[38px]">
          <div className="grid grid-cols-[1fr_auto] items-center gap-9 max-tg-md:grid-cols-1 max-tg-md:gap-11">
            <div>
              <h3 className="text-[25px] leading-[1.2]">Stay ahead of the legacy.</h3>
              <p className="mt-2 text-[16px] leading-[1.5] text-muted">
                Subscribe for exclusive access to our upcoming AI-first webinars and podcasts.
              </p>
            </div>

            {status === "success" ? (
              <div className="min-w-[300px] rounded-card border border-teal bg-[rgba(15,118,110,0.18)] px-[30px] py-5 text-center">
                <div className="text-2xl text-green">&#10003;</div>
                <div className="mt-1 text-[16px] leading-[normal] font-bold text-primary">Thanks for submitting!</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="flex flex-wrap items-center gap-2.5">
                <FormField label="Name" name="name" type="text" placeholder="Name" containerClassName="w-[150px]" />
                <FormField
                  label="Business Email"
                  name="email"
                  type="email"
                  placeholder="Business Email"
                  containerClassName="w-[180px]"
                />
                <Button
                  type="submit"
                  className="!px-[24px] !py-3 gap-[7px] rounded-[10px] leading-[normal] shadow-nav-btn hover:shadow-nav-btn active:shadow-nav-btn"
                >
                  Submit <span aria-hidden="true" className="inline-block leading-none">&rarr;</span>
                </Button>
              </form>
            )}
          </div>
          {status === "error" && errorMessage && (
            <p role="alert" className="mt-3 text-sm font-semibold text-error">
              {errorMessage}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

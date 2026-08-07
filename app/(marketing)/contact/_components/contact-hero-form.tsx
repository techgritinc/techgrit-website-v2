"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import Button from "@/components/ui/Button";
import { MailIcon, ClockIcon, GlobeIcon, CalendarIcon, CheckCircleIcon } from "./icons";

const TOPICS = ["New project", "Partnership", "Hiring TechGrit", "Support"] as const;

type ContactInfoItem = {
  label: string;
  value: string;
  href?: string;
  iconWrapperClass: string;
  icon: ReactNode;
};

const CONTACT_INFO: ContactInfoItem[] = [
  {
    label: "Email us",
    value: "support@techgrit.com",
    href: "mailto:support@techgrit.com",
    iconWrapperClass: "bg-orange/10 border-orange/30",
    icon: <MailIcon className="text-[var(--color-amber-light)]" />,
  },
  {
    label: "Response time",
    value: "Within 1 business day",
    iconWrapperClass: "bg-blue/10 border-blue-light/30",
    icon: <ClockIcon className="text-[var(--color-blue-light)]" />,
  },
  {
    label: "Where we work",
    value: "Remote-first · global delivery",
    iconWrapperClass: "bg-teal-light/10 border-teal-light/30",
    icon: <GlobeIcon className="text-[var(--color-teal-light)]" />,
  },
];

function ContactInfoRow({ label, value, href, iconWrapperClass, icon }: ContactInfoItem) {
  const content = (
    <>
      <span
        className={`w-[46px] h-[46px] rounded-[12px] flex items-center justify-center shrink-0 border ${iconWrapperClass}`}
      >
        {icon}
      </span>
      <span>
        <span className="block text-[12.5px] text-white/50 font-semibold">{label}</span>
        <span className="block text-[16px] text-white font-bold">{value}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className="flex items-center gap-[14px] hover:opacity-85 transition-opacity">
        {content}
      </a>
    );
  }

  return <div className="flex items-center gap-[14px]">{content}</div>;
}

import FormField from "@/components/ui/FormField";

/* Contact-form-specific field styling — passed to FormField via inputBaseClassName
   so it fully replaces the default INPUT_BASE (different radius, bg, font, placeholder). */
const CONTACT_INPUT_BASE =
  "w-full bg-[var(--color-glass)] border border-[var(--color-border)] rounded-[12px] px-4 py-[14px] text-[15px] text-white outline-none transition-colors focus:border-[var(--color-border-orange-strong)] focus:bg-[var(--color-glass-hover)] placeholder:text-[var(--color-text-placeholder)] font-[inherit]";
const CONTACT_LABEL = "block text-[13px] font-semibold text-white/70 mb-[7px]";

export default function ContactHeroForm() {
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>(TOPICS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  function handleReset() {
    setSent(false);
    setName("");
    setEmail("");
    setCompany("");
    setMessage("");
  }

  const firstName = name.trim().split(" ")[0];

  return (
    <div className="grid grid-cols-1 tg-md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-[34px] tg-md:gap-[60px] items-start leading-[normal]">
      {/* Intro + contact info */}
      <div className="pt-2">
        <div
          data-rise
          style={{ animationDelay: ".05s" }}
          className="inline-flex items-center gap-2.5 bg-[var(--color-overlay-orange-12)] border border-[var(--color-border-orange)] px-4 py-2 rounded-full mb-6"
        >
          <span className="text-[12.5px] font-bold tracking-[0.1em] text-white/[.92] uppercase">
            Contact Us
          </span>
        </div>

        <h1
          data-rise
          style={{ animationDelay: ".12s" }}
          className="text-[clamp(38px,4.8vw,54px)] leading-[1.05] font-bold tracking-[-0.035em] text-white"
        >
          Let&apos;s build something <span className="text-gradient">remarkable.</span>
        </h1>

        <p
          data-rise
          style={{ animationDelay: ".2s" }}
          className="mt-5 max-w-[440px] text-[18px] leading-[1.65] text-[var(--color-text-secondary)]"
        >
          Tell us about your product, your timeline, and what success looks like. We&apos;ll get
          back within one business day.
        </p>

        <div
          data-rise
          style={{ animationDelay: ".28s" }}
          className="mt-[34px] flex flex-col gap-[18px]"
        >
          {CONTACT_INFO.map((item) => (
            <ContactInfoRow key={item.label} {...item} />
          ))}
        </div>

        {/* Skip the form — direct scheduling path (US9, FR-039). Placeholder target only:
            no Calendly widget/script is embedded (spec.md Clarifications, Session 2026-08-07). */}
        <div
          data-rise
          style={{ animationDelay: ".34s" }}
          className="mt-[30px] flex items-center gap-3.5 flex-wrap rounded-2xl border border-overlay-orange-strong bg-[image:var(--gradient-skip-form)] backdrop-blur-md px-6 py-[22px]"
        >
          <span className="w-11 h-11 rounded-[12px] bg-orange/20 border border-orange/40 inline-flex items-center justify-center shrink-0">
            <CalendarIcon className="text-[var(--color-amber-light)]" />
          </span>
          <div className="flex-1 min-w-[180px]">
            <div className="text-[12.5px] font-bold tracking-08 uppercase text-[var(--color-amber-light)]">
              Skip the form
            </div>
            <div className="mt-[3px] text-[15px] font-semibold text-white leading-[1.35]">
              Book a 30-min discovery call now.
            </div>
          </div>
          <Button href="#" variant="primary" size="nav" className="h-[44px] w-[139.552px]">
            Book a call{" "}
            <span aria-hidden="true" className="text-[15px]">
              &#8594;
            </span>
          </Button>
        </div>
      </div>

      {/* Form card */}
      <div
        data-rise
        style={{ animationDelay: ".2s" }}
        className="relative rounded-[24px] border border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-[10px] px-[34px] py-[36px] shadow-[var(--shadow-glass)]"
      >
        <div
          aria-hidden
          className="absolute -top-px left-[30px] right-[30px] h-0.5 bg-gradient-to-r from-transparent via-orange/70 to-transparent"
        />

        {sent ? (
          <div className="p-[30px_6px_10px]">
            <div className="w-16 h-16 rounded-full bg-teal-light/15 border border-teal-light/40 flex items-center justify-center mx-auto mb-5">
              <CheckCircleIcon className="text-teal-light" />
            </div>
            <h3 className="text-2xl font-bold text-white text-center">Message sent.</h3>
            <p className="mt-2.5 text-[16px] leading-[1.6] text-white/70 text-center max-w-[340px] mx-auto">
              Thanks{firstName ? `, ${firstName}` : ""} — we&apos;ve received your note and will
              reply within one business day.
            </p>
            <Button
              type="button"
              onClick={handleReset}
              variant="outline"
              size="md"
              className="mt-[22px] mx-auto flex"
            >
              Send another
            </Button>
          </div>
        ) : (
          <div>
            <div className="text-[13px] font-bold tracking-[0.04em] text-white/60 mb-[14px]">
              What can we help with?
            </div>
            <div className="flex gap-2 flex-wrap mb-6">
              {TOPICS.map((t) => {
                const active = topic === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    className={`font-[inherit] text-[13.5px] font-bold py-[9px] px-[15px] rounded-[30px] cursor-pointer whitespace-nowrap transition-all duration-200 ease-in-out border ${
                      active
                        ? "border-[var(--color-border-orange-strong)] bg-[var(--color-overlay-orange)] text-white"
                        : "border-[var(--color-border)] bg-[var(--color-glass)] text-[var(--color-text-secondary)] hover:bg-[var(--color-glass-hover)]"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 tg-sm:grid-cols-2 gap-4">
                <FormField
                  label="Full name"
                  hideLabel={false}
                  labelClassName={CONTACT_LABEL}
                  inputBaseClassName={CONTACT_INPUT_BASE}
                  required
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FormField
                  label="Work email"
                  hideLabel={false}
                  labelClassName={CONTACT_LABEL}
                  inputBaseClassName={CONTACT_INPUT_BASE}
                  type="email"
                  required
                  placeholder="jane@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <FormField
                label="Company"
                hideLabel={false}
                labelClassName={CONTACT_LABEL}
                inputBaseClassName={CONTACT_INPUT_BASE}
                placeholder="Company name"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />

              <FormField
                label="Tell us about your project"
                hideLabel={false}
                labelClassName={CONTACT_LABEL}
                inputBaseClassName={CONTACT_INPUT_BASE}
                multiline
                rows={4}
                required
                placeholder="What are you building, and what's the goal?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                inputClassName="resize-y min-h-[108px]"
              />

              <Button type="submit" variant="primary" size="hero" className="w-full mt-1">
                Send message <span className="text-[17px]">&#8594;</span>
              </Button>
              <p className="text-[12.5px] text-white/45 text-center leading-[1.5]">
                By submitting, you agree to our privacy policy. We never share your details.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

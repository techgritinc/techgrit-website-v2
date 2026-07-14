"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { MailIcon, ClockIcon, GlobeIcon, CheckCircleIcon } from "./icons";

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
    iconWrapperClass: "bg-[rgba(232,119,34,0.12)] border-[rgba(232,119,34,0.3)]",
    icon: <MailIcon className="text-[var(--color-amber-light)]" />,
  },
  {
    label: "Response time",
    value: "Within 1 business day",
    iconWrapperClass: "bg-[rgba(2,132,199,0.12)] border-[rgba(56,189,248,0.3)]",
    icon: <ClockIcon className="text-[var(--color-blue-light)]" />,
  },
  {
    label: "Where we work",
    value: "Remote-first · global delivery",
    iconWrapperClass: "bg-[rgba(45,212,191,0.12)] border-[rgba(45,212,191,0.3)]",
    icon: <GlobeIcon className="text-[var(--color-teal-light)]" />,
  },
];

function ContactInfoRow({ label, value, href, iconWrapperClass, icon }: ContactInfoItem) {
  const content = (
    <>
      <span className={`w-[46px] h-[46px] rounded-[12px] flex items-center justify-center shrink-0 border ${iconWrapperClass}`}>
        {icon}
      </span>
      <span>
        <span className="block text-[12.5px] text-white/50 font-semibold">
          {label}
        </span>
        <span className="block text-[16px] text-white font-bold">
          {value}
        </span>
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

const fldClass = "w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.14)] rounded-[12px] px-4 py-[14px] text-[15px] text-white outline-none transition-colors focus:border-[rgba(232,119,34,0.6)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-[rgba(255,255,255,0.4)] font-[inherit]";
const labelClass = "block text-[13px] font-semibold text-white/70 mb-[7px]";

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
    <div className="grid grid-cols-1 tg-md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] gap-[34px] tg-md:gap-[60px] items-start">
      {/* Intro + contact info */}
      <div className="pt-2">
        <div className="inline-flex items-center gap-2.5 bg-[rgba(232,119,34,0.1)] border border-[rgba(232,119,34,0.3)] px-4 py-2 rounded-full mb-6">
          <span className="w-2 h-2 rounded-full bg-[#E87722] shadow-[0_0_12px_2px_rgba(232,119,34,0.8)]" />
          <span className="text-[12.5px] font-bold tracking-[0.1em] text-[rgba(255,255,255,0.92)] uppercase">Contact Us</span>
        </div>

        <h1 className="text-[clamp(38px,4.8vw,54px)] leading-[1.05] font-bold tracking-[-0.035em] text-white">
          Let&apos;s build something{" "}
          <span className="text-gradient">remarkable.</span>
        </h1>

        <p className="mt-5 max-w-[440px] text-[18px] leading-[1.65] text-[rgba(255,255,255,0.72)]">
          Tell us about your product, your timeline, and what success looks
          like. We&apos;ll get back within one business day.
        </p>

        <div className="mt-[34px] flex flex-col gap-[18px]">
          {CONTACT_INFO.map((item) => (
            <ContactInfoRow key={item.label} {...item} />
          ))}
        </div>
      </div>

      {/* Form card */}
      <div className="relative rounded-[24px] border border-[rgba(255,255,255,0.12)] bg-[rgba(255,255,255,0.04)] backdrop-blur-[10px] px-[34px] py-[36px] shadow-[0_30px_70px_-30px_rgba(0,0,0,0.7)]">
        <div aria-hidden className="absolute -top-px left-[30px] right-[30px] h-0.5 bg-gradient-to-r from-transparent via-[rgba(232,119,34,0.7)] to-transparent" />

        {sent ? (
          <div className="p-[30px_6px_10px]">
            <div className="w-16 h-16 rounded-full bg-[rgba(45,212,191,0.15)] border border-[rgba(45,212,191,0.4)] flex items-center justify-center mx-auto mb-5">
              <CheckCircleIcon className="text-[#2dd4bf]" />
            </div>
            <h3 className="text-2xl font-bold text-white text-center">Message sent.</h3>
            <p className="mt-2.5 text-[16px] leading-[1.6] text-white/70 text-center max-w-[340px] mx-auto">
              Thanks{firstName ? `, ${firstName}` : ""} — we&apos;ve received
              your note and will reply within one business day.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-[22px] mx-auto block bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.16)] text-white text-[14.5px] font-bold py-3 px-[22px] rounded-[11px] cursor-pointer hover:bg-white/10 transition-colors"
            >
              Send another
            </button>
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
                        ? "border-[rgba(232,119,34,0.6)] bg-[rgba(232,119,34,0.16)] text-[#fff]"
                        : "border-[rgba(255,255,255,0.14)] bg-[rgba(255,255,255,0.04)] text-[rgba(255,255,255,0.7)] hover:bg-[rgba(255,255,255,0.08)]"
                    }`}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 tg-sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className={labelClass}
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    className={`${fldClass} h-[50px]`}
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className={labelClass}
                  >
                    Work email
                  </label>
                  <input
                    id="email"
                    className={`${fldClass} h-[50px]`}
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  className={labelClass}
                >
                  Company
                </label>
                <input
                  id="company"
                  className={`${fldClass} h-[50px]`}
                  type="text"
                  placeholder="Company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className={labelClass}
                >
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  className={`${fldClass} resize-y min-h-[108px]`}
                  rows={4}
                  required
                  placeholder="What are you building, and what's the goal?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              <button type="submit" className="mt-1 inline-flex items-center justify-center gap-[9px] bg-gradient-to-br from-[#F59E0B] to-[#E87722] text-white text-[16px] font-bold p-4 border-none rounded-[12px] cursor-pointer shadow-[0_14px_36px_-10px_rgba(232,119,34,0.8)] hover:-translate-y-0.5 transition-transform w-full">
                Send message <span className="text-[17px]">&#8594;</span>
              </button>
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

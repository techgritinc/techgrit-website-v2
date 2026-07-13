"use client";

import { useState, type FormEvent, type ReactNode } from "react";

const TOPICS = ["New project", "Partnership", "Hiring TechGrit", "Support"] as const;

type ContactInfoItem = {
  label: string;
  value: string;
  href?: string;
  bg: string;
  border: string;
  stroke: string;
  icon: ReactNode;
};

const CONTACT_INFO: ContactInfoItem[] = [
  {
    label: "Email us",
    value: "support@techgrit.com",
    href: "mailto:support@techgrit.com",
    bg: "var(--color-overlay-orange)",
    border: "var(--color-border-orange)",
    stroke: "var(--color-amber-light)",
    icon: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-10 5L2 7" />
      </>
    ),
  },
  {
    label: "Response time",
    value: "Within 1 business day",
    bg: "rgba(2, 132, 199, 0.12)",
    border: "rgba(56, 189, 248, 0.3)",
    stroke: "var(--color-blue-light)",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
  },
  {
    label: "Where we work",
    value: "Remote-first · global delivery",
    bg: "rgba(45, 212, 191, 0.12)",
    border: "rgba(45, 212, 191, 0.3)",
    stroke: "var(--color-teal-light)",
    icon: (
      <>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
  },
];

function ContactInfoRow({ label, value, href, bg, border, stroke, icon }: ContactInfoItem) {
  const content = (
    <>
      <span
        style={{
          width: 46,
          height: 46,
          borderRadius: 12,
          background: bg,
          border: `1px solid ${border}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke={stroke}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {icon}
        </svg>
      </span>
      <span>
        <span
          style={{
            display: "block",
            fontSize: "12.5px",
            color: "rgba(255,255,255,0.5)",
            fontWeight: 600,
          }}
        >
          {label}
        </span>
        <span
          style={{
            display: "block",
            fontSize: "16px",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          {value}
        </span>
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} style={{ display: "flex", alignItems: "center", gap: 14 }} className="hover:opacity-85 transition-opacity">
        {content}
      </a>
    );
  }

  return <div style={{ display: "flex", alignItems: "center", gap: 14 }}>{content}</div>;
}

const fldClass = "w-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.14)] rounded-xl px-4 py-[14px] text-[15px] text-white outline-none transition-colors focus:border-[rgba(232,119,34,0.6)] focus:bg-[rgba(255,255,255,0.08)] placeholder:text-[rgba(255,255,255,0.4)] font-[inherit]";

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
    <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] lg:gap-[60px] gap-[34px] items-start">
      {/* Intro + contact info */}
      <div style={{ paddingTop: 8 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(232,119,34,0.1)",
            border: "1px solid rgba(232,119,34,0.3)",
            padding: "8px 16px",
            borderRadius: 40,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#E87722",
              boxShadow: "0 0 12px 2px rgba(232,119,34,0.8)",
            }}
          />
          <span style={{ fontSize: 12.5, fontWeight: 700, letterSpacing: "0.1em", color: "rgba(255,255,255,0.92)", textTransform: "uppercase" }}>Contact Us</span>
        </div>

        <h1 style={{ fontSize: "clamp(38px,4.8vw,54px)", lineHeight: 1.05, fontWeight: 700, letterSpacing: "-0.035em", color: "#fff" }}>
          Let&apos;s build something{" "}
          <span style={{ background: "linear-gradient(120deg,#F59E0B,#E87722)", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>remarkable.</span>
        </h1>

        <p
          style={{
            margin: "20px 0 0",
            maxWidth: 440,
            fontSize: 18,
            lineHeight: 1.65,
            color: "rgba(255,255,255,0.72)",
          }}
        >
          Tell us about your product, your timeline, and what success looks
          like. We&apos;ll get back within one business day.
        </p>

        <div style={{ marginTop: 34, display: "flex", flexDirection: "column", gap: 18 }}>
          {CONTACT_INFO.map((item) => (
            <ContactInfoRow key={item.label} {...item} />
          ))}
        </div>
      </div>

      {/* Form card */}
      <div style={{ position: "relative", borderRadius: 24, border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,255,255,0.04)", backdropFilter: "blur(10px)", padding: "36px 34px", boxShadow: "0 30px 70px -30px rgba(0,0,0,0.7)" }}>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: -1,
            left: 30,
            right: 30,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, rgba(232,119,34,0.7), transparent)",
          }}
        />

        {sent ? (
          <div style={{ padding: "30px 6px 10px" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(45, 212, 191, 0.15)",
                border: "1px solid rgba(45, 212, 191, 0.4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px"
              }}
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: "#fff", textAlign: "center" }}>Message sent.</h3>
            <p
              style={{
                marginTop: 10,
                fontSize: 16,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.7)",
                textAlign: "center",
                maxWidth: 340,
                marginLeft: "auto",
                marginRight: "auto"
              }}
            >
              Thanks{firstName ? `, ${firstName}` : ""} — we&apos;ve received
              your note and will reply within one business day.
            </p>
            <button
              type="button"
              onClick={handleReset}
              style={{ margin: "22px auto 0", display: "block", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.16)", color: "#fff", fontSize: "14.5px", fontWeight: 700, padding: "12px 22px", borderRadius: 11, cursor: "pointer" }}
            >
              Send another
            </button>
          </div>
        ) : (
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: "rgba(255,255,255,0.6)",
                marginBottom: 14
              }}
            >
              What can we help with?
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
              {TOPICS.map((t) => {
                const active = topic === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTopic(t)}
                    style={{
                      fontFamily: "inherit",
                      fontSize: "13.5px",
                      fontWeight: 700,
                      padding: "9px 15px",
                      borderRadius: 30,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      transition: "all .18s ease",
                      border: active
                        ? "1px solid rgba(232,119,34,0.6)"
                        : "1px solid rgba(255,255,255,0.14)",
                      background: active
                        ? "rgba(232,119,34,0.16)"
                        : "rgba(255,255,255,0.04)",
                      color: active
                        ? "#fff"
                        : "rgba(255,255,255,0.7)",
                    }}
                  >
                    {t}
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 7 }}
                  >
                    Full name
                  </label>
                  <input
                    id="name"
                    className={fldClass}
                    type="text"
                    required
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ height: "50px", borderRadius: "10px", padding: "9px 15px" }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 7 }}
                  >
                    Work email
                  </label>
                  <input
                    id="email"
                    className={fldClass}
                    type="email"
                    required
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ height: "50px", borderRadius: "10px", padding: "9px 15px" }}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="company"
                  style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 7 }}
                >
                  Company
                </label>
                <input
                  id="company"
                  className={fldClass}
                  type="text"
                  placeholder="Company name"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  style={{ height: "50px", borderRadius: "9px", padding: "9px 15px" }}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  style={{ display: "block", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.7)", marginBottom: 7 }}
                >
                  Tell us about your project
                </label>
                <textarea
                  id="message"
                  className={fldClass}
                  rows={4}
                  required
                  placeholder="What are you building, and what's the goal?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  style={{ resize: "vertical", minHeight: 108, padding: "9px 15px" }}
                />
              </div>

              <button type="submit" style={{ marginTop: 4, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 9, background: "linear-gradient(135deg,#F59E0B,#E87722)", color: "#fff", fontSize: 16, fontWeight: 700, padding: 16, border: "none", borderRadius: 12, cursor: "pointer", boxShadow: "0 14px 36px -10px rgba(232,119,34,0.8)" }} className="hover:-translate-y-0.5 transition-transform">
                Send message <span style={{ fontSize: 17 }}>&#8594;</span>
              </button>
              <p
                style={{
                  fontSize: "12.5px",
                  color: "rgba(255,255,255,0.45)",
                  textAlign: "center",
                }}
              >
                By submitting, you agree to our privacy policy. We never
                share your details.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

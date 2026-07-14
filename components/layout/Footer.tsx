import Image from "next/image";
import Link from "next/link";
import { LinkedInIcon, MailIcon, PhoneIcon, YouTubeIcon } from "./icons";
import { CONTACT_DETAILS, FOOTER_CTA, FOOTER_LINK_GROUPS, LEGAL_LINKS, SOCIAL_LINKS } from "./footer-config";

const SOCIAL_ICONS = {
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  email: MailIcon,
} as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border-subtle">
      
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-blue),var(--color-teal),var(--color-amber),var(--color-orange))]"
      />
      
      <div aria-hidden="true" className="absolute -top-[140px] -right-[90px] h-[440px] w-[440px] rounded-full bg-orange opacity-[0.08] blur-[130px]" />

      <div className="relative mx-auto max-w-[var(--container-max)] px-9 pt-[78px]">
        <div className="grid grid-cols-[1.9fr_1fr_1fr_1.3fr] gap-12 max-tg-md:grid-cols-2 max-tg-sm:grid-cols-1">
          <div>
            <Image
              src="/logos/techgrit-logo-white.png"
              alt="TechGrit"
              height={32}
              width={107}
              className="h-8 w-auto"
            />
            <p className="mt-5 max-w-[310px] text-[15px] leading-[1.65] text-[rgba(255,255,255,0.6)]">
              The AI-First Software Engine. OrbitAI orchestrates production-grade software for mid-market enterprises, from vision to scale in weeks, not years.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform];
                return (
                  <a
                    key={social.platform}
                    href={social.href}
                    aria-label={social.label}
                    className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.14)] text-[rgba(255,255,255,0.7)] transition-colors hover:border-orange hover:text-primary"
                  >
                    <Icon className={social.platform === "email" ? "h-[21px] w-[21px]" : ""} />
                  </a>
                );
              })}
            </div>
          </div>

          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.heading}>
              <div className="mb-[18px] text-[13px] font-bold tracking-[0.1em] text-primary uppercase">{group.heading}</div>
              {group.links.map((link) => (
                <Link key={link.label} href={link.href} className="mb-3 block text-[14.5px] text-[rgba(255,255,255,0.6)] transition-colors hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          <div>
            <div className="mb-[18px] text-[13px] font-bold tracking-[0.1em] text-primary uppercase">Get in touch</div>
            {CONTACT_DETAILS.map((detail) => (
              <a
                key={detail.type}
                href={detail.href}
                className={`flex items-center gap-[9px] text-[14.5px] text-[rgba(255,255,255,0.6)] transition-colors hover:text-primary ${detail.type === "phone" ? "mb-[20px]" : "mb-[13px]"}`}
              >
                {detail.type === "email" ? (
                  <MailIcon className="shrink-0 text-orange" />
                ) : (
                  <PhoneIcon className="shrink-0 text-orange" />
                )}
                {detail.value}
              </a>
            ))}
            <Link
              href={FOOTER_CTA.href}
              className="inline-flex items-center gap-2 rounded-[11px] bg-[image:var(--gradient-brand)] px-[20px] py-[12px] text-[14.5px] font-bold text-white shadow-[0_10px_26px_-10px_rgba(232,119,34,0.7)] transition-transform hover:-translate-y-[2px]"
            >
              {FOOTER_CTA.label} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-[54px] text-center font-display text-[clamp(74px,17vw,232px)] leading-[0.74] font-bold tracking-[-0.045em] whitespace-nowrap text-transparent [-webkit-background-clip:text] [background-clip:text] bg-[image:linear-gradient(180deg,rgba(255,255,255,0.085),rgba(255,255,255,0))] pointer-events-none select-none"
        >
          TechGrit
        </div>
      </div>

      <div className="border-t border-border-subtle">
        <div className="mx-auto flex max-w-[var(--container-max)] flex-wrap items-center justify-between gap-4 px-9 py-[22px] max-tg-sm:flex-col max-tg-sm:items-start">
          <span className="text-[13.5px] text-[rgba(255,255,255,0.5)]">Copyright &copy; {year} TechGrit Inc. All rights reserved.</span>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((legal) => (
              <Link key={legal.href} href={legal.href} className="text-[13.5px] text-[rgba(255,255,255,0.5)] transition-colors hover:text-primary">
                {legal.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

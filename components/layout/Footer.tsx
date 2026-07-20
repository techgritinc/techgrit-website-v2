import Image from "next/image";
import Link from "next/link";
import { LinkedInIcon, MailIcon, PhoneIcon, YouTubeIcon } from "@/components/ui/icons";
import { CONTACT_DETAILS, FOOTER_CTA, FOOTER_LINK_GROUPS, LEGAL_LINKS, SOCIAL_LINKS } from "./footer-config";
import Button from "@/components/ui/Button";

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

      <div className="relative mx-auto max-w-[var(--container-max)] px-9 pt-[78px] leading-[normal]">
        <div className="leading-[normal] grid grid-cols-[1.9fr_1fr_1fr_1.3fr] gap-12 max-tg-md:grid-cols-[1.4fr_1fr_1fr] max-tg-md:gap-9 max-tg-sm:grid-cols-1">
          <div>
            <Image
              src="/logos/techgrit-logo-white.png"
              alt="TechGrit"
              width={107}
              height={32}
              className="inline-block h-8 w-auto align-baseline"
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
                    className="flex h-[42px] w-[42px] items-center justify-center rounded-full border border-[rgba(255,255,255,0.14)] text-[rgba(255,255,255,0.7)] focus-visible:outline-none"
                  >
                    <Icon className={social.platform === "linkedin" ? "h-[20px] w-[20px]" : social.platform === "youtube" ? "h-[22px] w-[22px]" : "h-[21px] w-[21px]"} />
                  </a>
                );
              })}
            </div>
          </div>

          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.heading}>
              <div className="mb-[18px] text-[13px] font-bold tracking-[0.1em] text-white uppercase">{group.heading}</div>
              {group.links.map((link) => (
                <Link key={link.label} href={link.href} className="mb-3 block text-[14.5px] text-[rgba(255,255,255,0.6)] leading-[normal] last:mb-0">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          <div>
            <div className="mb-[18px] text-[13px] font-bold tracking-[0.1em] text-white uppercase leading-[normal]">Get in touch</div>
            {CONTACT_DETAILS.map((detail) => (
              <a
                key={detail.type}
                href={detail.href}
                className={`flex items-center gap-[9px] text-[14.5px] text-[rgba(255,255,255,0.6)] leading-[normal] ${detail.type === "phone" ? "mb-[20px]" : "mb-[13px]"}`}
              >
                {detail.type === "email" ? (
                  <MailIcon className="h-[16px] w-[16px] shrink-0 text-orange" />
                ) : (
                  <PhoneIcon className="h-[16px] w-[16px] shrink-0 text-orange" />
                )}
                {detail.value}
              </a>
            ))}
            <Button
              href={FOOTER_CTA.href}
              size="nav"
              className="!px-[20px] !py-[12px] !text-[14.5px] !shadow-[0_10px_26px_-10px_rgba(232,119,34,0.7)] hover:!shadow-[0_10px_26px_-10px_rgba(232,119,34,0.7)]"
            >
              {FOOTER_CTA.label} <span aria-hidden="true">&rarr;</span>
            </Button>
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
          <span className="text-[13.5px] text-[rgba(255,255,255,0.5)] leading-[normal]">Copyright &copy; {year} TechGrit Inc. All rights reserved.</span>
          <div className="flex items-center gap-6">
            {LEGAL_LINKS.map((legal) => (
              <Link key={legal.href} href={legal.href} className="text-[13.5px] text-[rgba(255,255,255,0.5)] leading-[normal]">
                {legal.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

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
    <footer className="site-footer">
      <div className="site-footer-accent" aria-hidden="true" />
      <div className="site-footer-glow" aria-hidden="true" />
      <div className="site-footer-inner">
        <div className="site-footer-top">
          <div>
            <Image src="/logos/techgrit-logo-white.png" alt="TechGrit" height={32} width={140} style={{ height: 32, width: "auto" }} />
            <p className="site-footer-desc">
              The AI-First Software Engine. Design, engineering, and quality, from vision to scale.
            </p>
            <div className="site-footer-social">
              {SOCIAL_LINKS.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform];
                return (
                  <a key={social.platform} href={social.href} className="site-footer-social-link" aria-label={social.label}>
                    <Icon />
                  </a>
                );
              })}
            </div>
          </div>

          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.heading}>
              <div className="site-footer-heading">{group.heading}</div>
              {group.links.map((link) => (
                <Link key={link.label} href={link.href} className="site-footer-link">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}

          <div>
            <div className="site-footer-heading">Get in touch</div>
            {CONTACT_DETAILS.map((detail) => (
              <a key={detail.type} href={detail.href} className="site-footer-contact-link">
                {detail.type === "email" ? (
                  <MailIcon className="site-footer-contact-icon" />
                ) : (
                  <PhoneIcon className="site-footer-contact-icon" />
                )}
                {detail.value}
              </a>
            ))}
            <Link href={FOOTER_CTA.href} className="site-footer-cta">
              {FOOTER_CTA.label} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="site-footer-ghost" aria-hidden="true">
          TechGrit
        </div>
      </div>

      <div className="site-footer-bottom">
        <div className="site-footer-bottom-inner">
          <span className="site-footer-copyright">Copyright &copy; {year} TechGrit Inc. All rights reserved.</span>
          <div className="site-footer-legal">
            {LEGAL_LINKS.map((legal) => (
              <Link key={legal.href} href={legal.href}>
                {legal.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

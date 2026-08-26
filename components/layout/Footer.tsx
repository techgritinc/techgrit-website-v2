import Image from "next/image";
import Link from "next/link";
import { getFooterData } from "@/cms/api/footer";
import { LinkedInIcon, SpotifyIcon, YouTubeIcon } from "@/components/ui/icons";
import Button from "@/components/ui/Button";

const SOCIAL_ICONS = {
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  spotify: SpotifyIcon,
} as const;

export default async function Footer() {
  const data = await getFooterData();
  if (!data) return null;
  const {
    logo,
    brandDescription,
    cta,
    linkGroups,
    contactDetails,
    socialLinks,
    legalLinks,
    followUsLabel,
    copyrights,
  } = data;
  const [primaryGroup, ...secondaryGroups] = linkGroups;

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] leading-[normal]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[3px] bg-[linear-gradient(90deg,var(--color-blue),var(--color-teal),var(--color-amber),var(--color-orange))]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[160px] -right-[120px] h-[520px] w-[520px] rounded-full bg-orange/[0.10] blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-[140px] -left-[120px] h-[520px] w-[520px] rounded-full bg-amber-light/[0.06] blur-[150px]"
      />

      <div className="relative mx-auto max-w-[1280px] px-[36px] pb-[24px] pt-[64px]">
        {/* Brand + contact row */}
        <div
          data-foot-brand
          className="grid grid-cols-[1.4fr_1fr] items-start gap-[48px] border-b border-white/[0.08] pb-[var(--space-9b)] max-tg-1080:grid-cols-1 max-tg-1080:gap-[32px]"
        >
          <div className="max-w-[460px]">
            <Image
              src={logo.url}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="mb-[22px] block h-[44px] w-auto"
            />
            <p className="mb-[24px] text-[15.5px] leading-[1.6] text-text-66">{brandDescription}</p>
            <Button href={cta.href} size="footer-cta" data-lift-hover>
              {cta.label}
              <span aria-hidden="true" className="text-[15px]">&rarr;</span>
            </Button>
          </div>

          <div data-foot-contacts className="grid grid-cols-[1fr_1fr] content-start gap-[24px] max-tg-640:grid-cols-1">
            {contactDetails.map((detail) => (
              <div key={detail.href}>
                <div className="mb-[8px] block text-[11px] font-[800] tracking-[0.14em] text-ghost uppercase">{detail.heading}</div>
                <a
                  href={detail.href}
                  className="mb-[4px] block text-[15px] font-[600] text-white transition-colors duration-200 ease-[ease] hover:text-amber-light"
                >
                  {detail.value}
                </a>
                <span className="text-[12.5px] text-dim">{detail.sublabel}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Site-map link grid */}
        <div data-foot-links-v2 className="grid grid-cols-[1.35fr_4fr] gap-x-[36px] gap-y-[28px] pb-[40px] pt-[48px] max-tg-1080:grid-cols-1">
          <div>
            <div className="mb-[16px] block text-[11px] font-[800] tracking-[0.14em] text-ghost uppercase">{primaryGroup.heading}</div>
            <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
              {primaryGroup.links.map((link) => (
                <li key={link.slug}>
                  <Link href={link.href} className="text-[13.5px] text-muted [transition:color_var(--transition-18)] hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex min-w-0 flex-col gap-[26px]">
            <div className="grid grid-cols-4 gap-[32px] max-tg-1080:grid-cols-2 max-tg-640:grid-cols-1 max-tg-640:gap-[24px]">
              {secondaryGroups.map((group) => (
                <div key={group.id}>
                  <div className="mb-[16px] block text-[11px] font-[800] tracking-[0.14em] text-ghost uppercase">{group.heading}</div>
                  <ul className="m-0 flex list-none flex-col gap-[10px] p-0">
                    {group.links.map((link) => (
                      <li key={link.slug}>
                        <Link href={link.href} className="text-[13.5px] text-muted [transition:color_var(--transition-18)] hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-start gap-[20px] border-t border-white/[0.08] pb-[4px] pt-[22px] max-tg-1080:pt-[24px] max-tg-640:flex-col max-tg-640:items-start">
              <span className="inline-flex items-center gap-[10px] text-[11px] font-[800] uppercase tracking-[0.16em] text-text-faded after:inline-block after:h-[1px] after:w-[26px] after:bg-[image:var(--gradient-footer-follow-line)]">
                {followUsLabel}
              </span>
              <div className="flex items-center gap-[10px]">
                {socialLinks.map((social) => {
                  const Icon = social.platform ? SOCIAL_ICONS[social.platform] : null;
                  return (
                    <a
                      key={social.href}
                      href={social.href}
                      aria-label={social.label}
                      title={social.label}
                      target="_blank"
                      rel="noopener"
                      data-lift-hover
                      className="inline-flex h-[36px] w-[36px] items-center justify-center rounded-[10px] border border-white/[0.12] bg-white/[0.04] text-secondary transition-all duration-200 ease-[ease] hover:-translate-y-[2px] hover:border-orange/[0.55] hover:bg-orange/[0.15] hover:text-white"
                    >
                      {social.icon ? (
                        <Image src={social.icon.url} alt={social.icon.alt} width={17} height={17} />
                      ) : (
                        Icon && <Icon />
                      )}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none mt-[36px] select-none whitespace-nowrap bg-[image:var(--gradient-footer-wordmark)] bg-clip-text text-center text-[clamp(74px,17vw,232px)] font-[700] leading-[0.74] tracking-[-0.045em] text-transparent font-display"
        >
          TechGrit
        </div>
      </div>

      {/* Utility bar */}
      <div className="border-t border-white/[0.08] bg-ink-glass-35">
        <div
          data-foot-utility
          className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-center gap-[20px] px-[36px] py-[20px] max-tg-640:flex-col max-tg-640:items-start max-tg-640:gap-[14px]"
        >
          <div className="flex flex-wrap items-center justify-center gap-[22px]">
            <span className="text-[12.5px] text-40">{copyrights}</span>
            {legalLinks.map((legal) =>
              legal.isDocument ? (
                <a
                  key={legal.href}
                  href={legal.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="text-[12.5px] text-dim transition-colors duration-200 ease-[ease] hover:text-white"
                >
                  {legal.label}
                </a>
              ) : (
                <Link key={legal.href} href={legal.href} className="text-[12.5px] text-dim transition-colors duration-200 ease-[ease] hover:text-white">
                  {legal.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

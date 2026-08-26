export type StrapiImageFormat = {
  url: string;
  width: number;
  height: number;
};

export type StrapiMedia = {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  } | null;
};

export type StrapiFooterContact = {
  title: string;
  subtitle: string;
  email: string;
};

export type StrapiLegalLink = {
  title: string;
  url: string;
  document: StrapiMedia | null;
};

export type StrapiFooterMenuLink = {
  id: number;
  title: string;
  url: string;
};

export type StrapiFooterMenuItem = {
  id: number;
  name: string;
  items: StrapiFooterMenuLink[];
};

export type StrapiSocialLink = {
  title: string;
  url: string;
  icon: StrapiMedia | null;
};

export type StrapiFooterData = {
  subtitle: string;
  startConversationLabel: string;
  startConversationUrl: string;
  followUsLabel: string;
  copyrights: string;
  logo: StrapiMedia | null;
  footerContact: StrapiFooterContact[];
  legalLinks: StrapiLegalLink[];
  footerMenuItems: StrapiFooterMenuItem[];
  socialLinks: StrapiSocialLink[];
};

export type FooterLogo = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type FooterCta = {
  label: string;
  href: string;
};

export type FooterIcon = {
  url: string;
  alt: string;
};

export type FooterLink = {
  slug: string;
  label: string;
  href: string;
};

export type FooterLinkGroup = {
  id: string;
  heading: string;
  links: FooterLink[];
};

export type FooterSocialPlatform = "linkedin" | "youtube" | "spotify";

export type FooterSocialLink = {
  platform: FooterSocialPlatform | null;
  href: string;
  label: string;
  icon: FooterIcon | null;
};

export type FooterContactDetail = {
  heading: string;
  value: string;
  href: string;
  sublabel: string;
};

export type FooterLegalLink = {
  label: string;
  href: string;
  isDocument: boolean;
};

export type FooterData = {
  logo: FooterLogo;
  brandDescription: string;
  cta: FooterCta;
  linkGroups: FooterLinkGroup[];
  contactDetails: FooterContactDetail[];
  socialLinks: FooterSocialLink[];
  legalLinks: FooterLegalLink[];
  followUsLabel: string;
  copyrights: string;
};

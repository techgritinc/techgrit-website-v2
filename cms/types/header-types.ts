export type { StrapiImageFormat, StrapiMedia } from "./strapi-common";
import type { StrapiMedia } from "./strapi-common";

export type StrapiSection = {
  title: string;
  subtitle: string;
  ctaLink: string;
  icon: StrapiMedia | null;
};

export type StrapiNavItem = {
  title: string;
  url: string;
  ctaLabel: string | null;
  ctaLink: string | null;
  sections: StrapiSection[];
};

export type StrapiHeaderData = {
  TalktoUsBtnLabel: string;
  TalktoUsBtnUrl: string;
  logo: StrapiMedia | null;
  navItems: StrapiNavItem[];
};

export type HeaderLogo = {
  url: string;
  alt: string;
  width: number;
  height: number;
};

export type HeaderCta = {
  label: string;
  href: string;
};

export type HeaderIcon = {
  url: string;
  alt: string;
};

export type HeaderMegaItem = {
  icon: HeaderIcon | null;
  title: string;
  description: string;
  href: string;
};

export type HeaderMegaGroup = {
  label: string;
  href: string;
  columns: 2 | 3 | 4;
  items: HeaderMegaItem[];
  cta?: HeaderCta;
};

export type HeaderPlainLink = {
  label: string;
  href: string;
};

export type HeaderData = {
  logo: HeaderLogo;
  cta: HeaderCta;
  megaGroups: HeaderMegaGroup[];
  plainLinks: HeaderPlainLink[];
};
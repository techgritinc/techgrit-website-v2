"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { ChevronIcon, HamburgerIcon } from "@/components/ui/icons";
import { ROUTES } from "@/lib/routes";
import type { HeaderData, HeaderMegaGroup } from "@/cms/types/header-types";

const NAV_LINK_BASE =
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm px-3.5 py-[9px] text-sm font-semibold text-nav leading-[normal] transition-colors hover:bg-nav-hover hover:text-white aria-expanded:bg-nav-hover aria-expanded:text-white";

const GRID_COLS_CLASS: Record<HeaderMegaGroup["columns"], string> = {
  3: "grid-cols-3",
  4: "grid-cols-4",
};

export default function HeaderClient({ data }: { data: HeaderData }) {
  const pathname = usePathname();
  const { logo, megaGroups, plainLinks } = data;

  const isHome = pathname === "/";
  // Header CTA is identical everywhere (FR-022): CMS button -> CMS url, except on the
  // Contact page itself, which targets its own in-page form section instead of navigating to
  // itself (the one reference-confirmed exception; no other page relabels/retargets the CTA).
  const isContact = pathname === ROUTES.contactUs;
  const cta = isContact ? { label: data.cta.label, href: "#form" } : data.cta;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);
  // Grace period before a mega-menu actually closes on mouse-leave, so moving the
  // cursor from the trigger down into the panel (crossing the visual gap between
  // them) doesn't prematurely close it — cleared immediately on re-entry.
  const closeDropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdownNow = (label: string) => {
    if (closeDropdownTimeoutRef.current) {
      clearTimeout(closeDropdownTimeoutRef.current);
      closeDropdownTimeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const scheduleDropdownClose = (label: string) => {
    closeDropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown((current) => (current === label ? null : current));
    }, 150);
  };

  // Homepage-only: transparent over the hero, solid once the visitor scrolls.
  // Threshold (24px) and shrink (80px -> 70px) match the reference's own scroll
  // handler exactly (Homepage.dc.html _setupHero -> onScroll).
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  const closeMenus = () => {
    setMobileOpen(false);
    setOpenDropdown(null);
  };

  // Close an open mega-menu on outside click or Escape (FR-010/FR-014).
  useEffect(() => {
    if (!openDropdown) return;
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openDropdown]);

  const scrolledAttr = isHome && scrolled ? "true" : "false";

  const headerClasses = isHome
    ? "fixed inset-x-0 top-0 z-[var(--z-nav)] border-b border-transparent bg-transparent transition-[background-color,border-color,backdrop-filter,box-shadow] duration-[350ms] ease-out data-[scrolled=true]:border-border-header-scrolled data-[scrolled=true]:bg-header-scrolled-bg data-[scrolled=true]:shadow-header-scrolled data-[scrolled=true]:backdrop-blur-header-scrolled"
    : "sticky top-0 z-[var(--z-nav)] border-b border-border-subtle bg-nav-glass backdrop-blur-nav";

  const innerClasses = isHome
    ? "h-nav transition-[height] duration-300 ease-out data-[scrolled=true]:h-[70px]"
    : "h-nav";

  return (
    <header className={`${headerClasses} leading-[normal]`} data-scrolled={scrolledAttr}>
      <div
        ref={navRef}
        data-scrolled={scrolledAttr}
        className={`mx-auto flex max-w-(--container-max) items-center justify-between gap-6 px-9 ${innerClasses}`}
      >
        <Link href="/" aria-label="TechGrit home" onClick={closeMenus} className="flex shrink-0 items-center gap-3">
          <Image
            src={logo.url}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            priority
            className="h-11 w-auto block"
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 tg-lg:flex">
          {megaGroups.map((group) => {
            const active = group.href === pathname;
            const isOpen = openDropdown === group.label;
            return (
              <div
                key={group.label}
                onMouseEnter={() => openDropdownNow(group.label)}
                onMouseLeave={() => scheduleDropdownClose(group.label)}
              >
                <Link
                  href={group.href}
                  className={[NAV_LINK_BASE, active && "bg-nav-hover text-white"].filter(Boolean).join(" ")}
                  aria-haspopup="menu"
                  aria-expanded={isOpen}
                  onClick={(e) => {
                    // Mouse click navigates to the group's own page (FR-019a), matching the
                    // reference's real <a href>. Touch (no hover preview) and keyboard (Enter)
                    // open the panel first instead, per FR-019/FR-014.
                    const pointerType = (e.nativeEvent as PointerEvent).pointerType;
                    if (pointerType !== "mouse") {
                      e.preventDefault();
                      setOpenDropdown((current) => (current === group.label ? null : group.label));
                    }
                  }}
                  suppressHydrationWarning
                >
                  {group.label}<ChevronIcon className={`transition-transform duration-200 ease-in-out ${isOpen ? "rotate-180" : ""}`} />
                </Link>
                <div
                  role="menu"
                  className={`absolute top-[calc(100%+14px)] left-1/2 z-(--z-dropdown) grid w-[min(940px,calc(100vw-40px))] -translate-x-1/2 gap-0.5 rounded-tile border border-border bg-dd-bg p-3.5 shadow-mega backdrop-blur-nav transition-[opacity,transform,visibility] duration-[220ms] ease-out ${isOpen ? "translate-y-0 visible opacity-100" : "translate-y-2 invisible opacity-0"
                    } ${GRID_COLS_CLASS[group.columns]}`}
                >
                  {group.items.map((item) => (
                    <Link
                      key={item.title}
                      href={item.href}
                      role="menuitem"
                      tabIndex={isOpen ? 0 : -1}
                      onClick={closeMenus}
                      className="flex min-h-16 items-start gap-3 rounded-sm p-3 transition-[background-color,transform] duration-200 ease-out hover:-translate-y-px hover:bg-overlay-orange-12"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-border-orange-soft bg-hover-orange-fill-14 text-amber-light">
                        {item.icon && (
                          <Image src={item.icon.url} alt={item.icon.alt} width={18} height={18} loading="eager" className="h-4.5 w-4.5" />
                        )}
                      </span>
                      <span className="flex flex-col min-w-0 mt-px">
                        <span className="text-[14px] leading-[1.4] font-bold text-white">{item.title}</span>
                        <span className="mt-0.75 text-[11.5px] leading-[1.4] text-text-55 line-clamp-2">{item.description}</span>
                      </span>
                    </Link>
                  ))}
                  {group.cta && (
                    <Link
                      href={group.cta.href}
                      tabIndex={isOpen ? 0 : -1}
                      onClick={closeMenus}
                      className="group col-span-full mt-1.5 flex items-center justify-between rounded-card border border-hover-orange-border-40 px-4.5 py-5.5 text-[12.5px] font-extrabold uppercase tracking-[0.08em] bg-[image:var(--gradient-mega-cta)] transition-[background-image,transform] duration-200 ease-out hover:-translate-y-px hover:bg-[image:var(--gradient-hover-orange-amber)]"
                    >
                      <span className="text-white">{group.cta.label}</span>
                      <span aria-hidden="true" className="text-amber-light text-[15px] transition-transform duration-200 ease-out group-hover:translate-x-[4px]">
                        &rarr;
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
          {plainLinks.map((link) => {
            const active = link.href === pathname;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenus}
                className={[NAV_LINK_BASE, active && "bg-nav-hover text-white"].filter(Boolean).join(" ")}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden tg-lg:block">
          <Button href={cta.href} size="nav" onClick={closeMenus}>
            {cta.label} <span aria-hidden="true" className="text-[16px]">&rarr;</span>
          </Button>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex cursor-pointer items-center justify-center p-2 text-white tg-lg:hidden"
        >
          <HamburgerIcon className="h-6.5 w-6.5" />
        </button>
      </div>

      <div
        inert={!mobileOpen}
        className={`overflow-y-auto bg-mobile-menu-bg transition-[max-height] duration-300 ease-out ${mobileOpen ? "max-h-[80vh]" : "max-h-0"}`}
      >
        {megaGroups.map((group) => (
          <div key={group.label}>
            <div className="border-t border-border-subtle px-9 pt-3.5 pb-3.5 font-bold text-text-85">
              {group.label}
            </div>
            <div>
              {group.items.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  onClick={closeMenus}
                  className={[
                    "block py-2.5 pr-9 pl-13 text-[14.5px] font-semibold text-muted transition-colors hover:text-white",
                    item.href === pathname && "text-white",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
        {plainLinks.map((link, index) => {
          const isFinalRow = index === plainLinks.length - 1;
          if (isFinalRow) {
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={closeMenus}
                className="block border-t border-border-subtle px-9 py-4 text-[16px] font-bold text-orange"
              >
                {link.label}
              </Link>
            );
          }
          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenus}
              className={[
                "block border-t border-border-subtle px-9 py-3.5 text-[16px] font-semibold text-[rgba(255,255,255,0.85)]",
                link.href === pathname && "text-white",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Button from "@/components/ui/Button";
import { ChevronIcon, HamburgerIcon } from "@/components/ui/icons";
import { NAV_CTA, NAV_ITEMS, type NavItem } from "./nav-config";

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.children) {
    return item.children.some((child) => child.href === pathname);
  }
  if (item.matchPaths) {
    return item.matchPaths.includes(pathname);
  }
  return item.href === pathname;
}

const NAV_LINK_BASE =
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm px-3.5 py-[9px] text-sm font-semibold text-nav leading-[normal] transition-colors hover:bg-nav-hover hover:text-white aria-expanded:bg-nav-hover aria-expanded:text-white";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isContact = pathname === "/contact";
  const cta = isContact ? { label: "Start a project", href: "#form" } : NAV_CTA;

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

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

  // Close an open dropdown on outside click or Escape (FR-010).
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
    : "h-[78px]";

  return (
    <header className={`${headerClasses} leading-[normal]`} data-scrolled={scrolledAttr}>
      <div
        ref={navRef}
        data-scrolled={scrolledAttr}
        className={`mx-auto flex max-w-(--container-max) items-center justify-between gap-6 px-9 ${innerClasses}`}
      >
        <Link href="/" aria-label="TechGrit home" onClick={closeMenus} className="flex shrink-0 items-center gap-[12px]">
          <Image
            src="/logos/techgrit-logo-white.png"
            alt="TechGrit"
            width={114}
            height={34}
            priority
            className={isHome ? "h-[34px] w-auto" : "h-[32px] w-auto"}
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 tg-lg:flex">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item, pathname);
            if (item.children) {
              const isOpen = openDropdown === item.label;
              return (
                <div className="relative" key={item.label}>
                  <button
                    type="button"
                    className={[NAV_LINK_BASE, active && "bg-nav-hover text-white"].filter(Boolean).join(" ")}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                  >
                    {item.label}
                    <ChevronIcon className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div
                      role="menu"
                      className="absolute top-[calc(100%+11px)] left-0 z-[var(--z-dropdown)] min-w-[216px] rounded-lg border border-border bg-dd-bg p-2 shadow-dropdown backdrop-blur-nav"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          role="menuitem"
                          onClick={closeMenus}
                          className={[
                            "flex items-center gap-[11px] whitespace-nowrap rounded-sm px-[13px] py-[11px] text-[14.5px] font-semibold text-nav-sub transition-colors hover:bg-overlay-orange hover:text-primary",
                            child.href === pathname && "bg-overlay-orange text-primary",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: `var(${child.dotColorVar})` }} />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={item.label}
                href={item.href ?? "#"}
                onClick={closeMenus}
                className={[NAV_LINK_BASE, active && "bg-nav-hover text-white"].filter(Boolean).join(" ")}
              >
                {item.label}
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
          <HamburgerIcon className="h-[26px] w-[26px]" />
        </button>
      </div>

      <div
        inert={!mobileOpen}
        className={`overflow-y-auto bg-mobile-menu-bg transition-[max-height] duration-300 ease-out ${mobileOpen ? "max-h-[80vh]" : "max-h-0"}`}
      >
        {NAV_ITEMS.map((item) => {
          if (item.children) {
            return (
              <div key={item.label}>
                <div className="border-t border-border-subtle px-9 pt-3.5 pb-2 text-[12px] font-bold tracking-[0.12em] text-[rgba(255,255,255,0.4)] uppercase">
                  {item.label}
                </div>
                <div>
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={closeMenus}
                      className={[
                        "block py-2.5 pr-9 pl-13 text-[14.5px] font-semibold text-[rgba(255,255,255,0.62)] hover:text-white transition-colors",
                        child.href === pathname && "text-white",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            );
          }
          return (
            <Link
              key={item.label}
              href={item.href ?? "#"}
              onClick={closeMenus}
              className={[
                "block border-t border-border-subtle px-9 py-3.5 text-[16px] font-semibold text-[rgba(255,255,255,0.85)]",
                item.href === pathname && "text-white",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href={cta.href}
          onClick={closeMenus}
          className="block border-t border-border-subtle px-9 py-4 text-[16px] font-bold text-orange"
        >
          {cta.label} <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </header>
  );
}

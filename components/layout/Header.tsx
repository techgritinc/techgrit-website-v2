"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronIcon, HamburgerIcon } from "./icons";
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
  "inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm px-3.5 py-[9px] text-sm font-semibold text-nav transition-colors hover:bg-glass hover:text-primary aria-expanded:bg-glass aria-expanded:text-primary";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

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
    : "h-nav";

  return (
    <header className={headerClasses} data-scrolled={scrolledAttr}>
      <div
        ref={navRef}
        data-scrolled={scrolledAttr}
        className={`mx-auto flex max-w-(--container-max) items-center justify-between gap-6 px-9 ${innerClasses}`}
      >
        <Link href="/" aria-label="TechGrit home" onClick={closeMenus} className="flex shrink-0 items-center">
          <Image
            src="/logos/techgrit-logo-white.png"
            alt="TechGrit"
            height={34}
            width={114}
            priority
            className="h-[34px] w-auto"
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
                    className={[NAV_LINK_BASE, active && "bg-glass text-primary"].filter(Boolean).join(" ")}
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
                className={[NAV_LINK_BASE, active && "bg-glass text-primary"].filter(Boolean).join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={NAV_CTA.href}
          onClick={closeMenus}
          className="hidden items-center gap-2 whitespace-nowrap rounded-[11px] bg-[image:var(--gradient-brand)] px-[22px] py-[12px] text-[15px] font-bold text-white shadow-nav-btn transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-[2px] hover:shadow-[0_14px_32px_-8px_rgba(232,119,34,0.9)] tg-lg:inline-flex"
        >
          {NAV_CTA.label} <span aria-hidden="true" className="text-[16px]">&rarr;</span>
        </Link>

        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
          className="flex cursor-pointer items-center justify-center p-2 text-primary tg-lg:hidden"
        >
          <HamburgerIcon />
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
                <div className="border-t border-border-subtle px-9 pt-3.5 pb-2 text-[12.5px] font-bold tracking-[0.12em] text-ghost uppercase">
                  {item.label}
                </div>
                <div>
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={closeMenus}
                      className={[
                        "block py-2.5 pr-9 pl-13 text-[14.5px] font-semibold text-muted",
                        child.href === pathname && "text-primary",
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
                "block border-t border-border-subtle px-9 py-3.5 text-sm font-semibold text-secondary",
                item.href === pathname && "text-primary",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
        <Link
          href={NAV_CTA.href}
          onClick={closeMenus}
          className="block border-t border-border-subtle px-9 py-4 text-sm font-bold text-orange"
        >
          {NAV_CTA.label} <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </header>
  );
}

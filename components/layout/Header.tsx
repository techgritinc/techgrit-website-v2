"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
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

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Homepage-only: transparent over the hero, solid once the visitor scrolls.
  // Threshold (24px) matches the reference's own scroll handler exactly
  // (Homepage.dc.html _setupHero → onScroll: `window.scrollY > 24`).
  // Every other route renders solid from the start (see spec.md "Header behavior").
  // `isHome && scrolled` in headerClassName below means a stale `scrolled` value
  // from a previous homepage visit has no effect once the route is no longer "/".
  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  // Menus close on every navigation via each Link's own onClick (closeMenus),
  // not a pathname-watching effect — keeps the state change tied to the user
  // action that caused it rather than a synchronous setState-in-effect.
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

  const headerClassName = ["site-header", isHome && "site-header-hero", isHome && scrolled && "is-scrolled"]
    .filter(Boolean)
    .join(" ");

  const mobileMenuStyle = { "--menu-max-h": mobileOpen ? "80vh" : "0px" } as CSSProperties;

  return (
    <header className={headerClassName}>
      <div ref={navRef} className="site-header-inner">
        <Link href="/" className="site-header-logo" aria-label="TechGrit home" onClick={closeMenus}>
          <Image src="/logos/techgrit-logo-white.png" alt="TechGrit" height={32} width={140} priority style={{ height: 32, width: "auto" }} />
        </Link>

        <nav className="site-header-nav" data-desktop-nav aria-label="Primary">
          {NAV_ITEMS.map((item) => {
            const active = isItemActive(item, pathname);
            if (item.children) {
              const isOpen = openDropdown === item.label;
              return (
                <div className="nav-item" key={item.label}>
                  <button
                    type="button"
                    className={`nav-link${active ? " is-active" : ""}`}
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                  >
                    {item.label}
                    <ChevronIcon className="nav-chev" style={isOpen ? { transform: "rotate(180deg)" } : undefined} />
                  </button>
                  {isOpen && (
                    <div className="nav-dd" role="menu">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          className={child.href === pathname ? "is-active" : ""}
                          role="menuitem"
                          onClick={closeMenus}
                        >
                          <span className="dd-dot" style={{ background: `var(${child.dotColorVar})` }} />
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
                className={`nav-link${active ? " is-active" : ""}`}
                onClick={closeMenus}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href={NAV_CTA.href} className="btn btn-primary" data-cta-nav onClick={closeMenus}>
          {NAV_CTA.label} <span aria-hidden="true">&rarr;</span>
        </Link>

        <button
          type="button"
          className="site-header-burger"
          data-burger
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <HamburgerIcon />
        </button>
      </div>

      <div className="mobile-menu" style={mobileMenuStyle} inert={!mobileOpen}>
        {NAV_ITEMS.map((item) => {
          if (item.children) {
            return (
              <div key={item.label}>
                <div className="mobile-menu-label">{item.label}</div>
                <div className="m-sub">
                  {item.children.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      className={child.href === pathname ? "is-active" : ""}
                      onClick={closeMenus}
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
              className={`mobile-menu-link${item.href === pathname ? " is-active" : ""}`}
              onClick={closeMenus}
            >
              {item.label}
            </Link>
          );
        })}
        <Link href={NAV_CTA.href} className="mobile-menu-cta" onClick={closeMenus}>
          {NAV_CTA.label} <span aria-hidden="true">&rarr;</span>
        </Link>
      </div>
    </header>
  );
}

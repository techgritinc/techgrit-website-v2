"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

type CookieSettingsContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CookieSettingsContext = createContext<CookieSettingsContextValue | null>(null);

/** Shared open/close state for the "Advanced Cookie Settings" modal — lets the
 * footer's "Cookie Preferences" link and the banner's Decline button both open the
 * one modal instance that CookieBannerClient renders (it already holds the CMS
 * content the modal needs), without either needing to know about the other. */
export default function CookieSettingsProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CookieSettingsContextValue>(
    () => ({
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
    }),
    [isOpen]
  );

  return (
    <CookieSettingsContext.Provider value={value}>{children}</CookieSettingsContext.Provider>
  );
}

export function useCookieSettings(): CookieSettingsContextValue {
  const context = useContext(CookieSettingsContext);
  if (!context) {
    throw new Error("useCookieSettings must be used within a CookieSettingsProvider");
  }
  return context;
}

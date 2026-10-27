"use client";

import { useCookieSettings } from "./CookieSettingsProvider";

/** Footer's "Cookie Preferences" entry — reopens the Advanced Cookie Settings modal
 * instead of navigating. It never behaves as a link: there's no dedicated page for
 * this, unlike every other legal link, so the CMS's own `url` for this entry is
 * intentionally ignored (see Footer.tsx's label match). */
export default function CookiePreferencesLink({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const { open } = useCookieSettings();
  return (
    <button type="button" onClick={open} className={className}>
      {label}
    </button>
  );
}

"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import CookieSettingsModal from "./CookieSettingsModal";
import { useCookieSettings } from "./CookieSettingsProvider";
import {
  CONSENT_COOKIE,
  getCookie,
  writeConsentPreferences,
  type CookiePreferences,
} from "@/lib/cookie-consent";
import type { CookieBannerData } from "@/cms/types/cookie-types";

export default function CookieBannerClient({ data }: { data: CookieBannerData }) {
  const [visible, setVisible] = useState(false);
  const { isOpen: settingsOpen, open: openSettings, close: closeSettings } = useCookieSettings();

  useEffect(() => {
    const checkConsent = () => {
      if (!getCookie(CONSENT_COOKIE)) {
        setVisible(true);
      }
    };
    checkConsent();
  }, []);

  const handleAccept = () => {
    writeConsentPreferences({ marketing: true, functional: true, analytics: true });
    setVisible(false);
  };

  const handleSaveSettings = (preferences: CookiePreferences) => {
    writeConsentPreferences(preferences);
    setVisible(false);
    closeSettings();
  };

  return (
    <>
      {visible && (
        <div
          data-rise
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-0 bottom-0 z-[var(--z-dropdown)] border-t border-border bg-dd-bg px-6 py-5 shadow-dropdown backdrop-blur-nav sm:px-9"
        >
          <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-[14.5px] leading-[1.6] text-text-66 sm:max-w-[640px] lg:max-w-none lg:whitespace-nowrap">
              {data.message}
            </p>
            <div className="flex shrink-0 gap-3">
              <Button variant="ghost" size="sm" onClick={openSettings}>
                {data.declineLabel}
              </Button>
              <Button variant="primary" size="sm" onClick={handleAccept}>
                {data.acceptLabel}
              </Button>
            </div>
          </div>
        </div>
      )}

      <CookieSettingsModal
        isOpen={settingsOpen}
        onClose={closeSettings}
        onSave={handleSaveSettings}
        title={data.settingsTitle}
        saveLabel={data.saveLabel}
        options={data.options}
      />
    </>
  );
}

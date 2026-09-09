"use client";

import { useLayoutEffect, useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { readConsentPreferences, type CookiePreferences } from "@/lib/cookie-consent";
import type { CookieOption } from "@/cms/types/cookie-types";

type CookieSettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (preferences: CookiePreferences) => void;
  title: string;
  saveLabel: string;
  options: CookieOption[];
};

// A returning visitor who already decided should see their actual saved choice, not
// the CMS's first-visit defaults — those only apply when there's no cookie yet.
function buildInitialPreferences(options: CookieOption[]): CookiePreferences {
  const saved = readConsentPreferences();
  if (saved) return saved;

  const preferences: CookiePreferences = { marketing: false, functional: false, analytics: false };
  for (const option of options) {
    if (option.preferenceKey) {
      preferences[option.preferenceKey] = option.defaultChecked;
    }
  }
  return preferences;
}

function CookieToggle({
  checked,
  onChange,
  disabled,
  label,
}: {
  checked: boolean;
  onChange?: () => void;
  disabled?: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={onChange}
      className={[
        "relative h-6 w-11 shrink-0 rounded-pill border p-0 transition-colors duration-200",
        checked ? "border-transparent bg-[image:var(--gradient-brand)]" : "border-border bg-glass",
        disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer",
      ].join(" ")}
    >
      <span
        aria-hidden="true"
        className={[
          "absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform duration-200",
          checked ? "translate-x-[20px]" : "translate-x-0",
        ].join(" ")}
      />
    </button>
  );
}

/** "Decline" opens this instead of rejecting outright, so visitors can grant cookies by category.
 * Content (title/description/order) is CMS-driven; only which consent bucket each option drives
 * is inferred locally (cms/api/cookie.ts's toCookieOption) since the CMS has no machine key for it. */
export default function CookieSettingsModal({
  isOpen,
  onClose,
  onSave,
  title,
  saveLabel,
  options,
}: CookieSettingsModalProps) {
  const [preferences, setPreferences] = useState(() => buildInitialPreferences(options));

  // Re-sync from the visitor's saved cookie every time the modal opens (not just on
  // first mount) — this instance stays mounted for the whole session, so without this
  // a visitor who Accepts, then later reopens preferences from the footer, would see
  // stale pre-Accept toggle state instead of what they actually just chose.
  useLayoutEffect(() => {
    const resyncFromSavedCookie = () => {
      if (isOpen) {
        setPreferences(buildInitialPreferences(options));
      }
    };
    resyncFromSavedCookie();
  }, [isOpen, options]);

  if (!isOpen) return null;

  const toggle = (key: keyof CookiePreferences) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      labelledBy="cookie-settings-title"
      title={
        <h2 id="cookie-settings-title" className="text-xl font-bold text-primary">
          {title}
        </h2>
      }
    >
      <div className="flex flex-col divide-y divide-border">
        {options.map((option) => (
          <div key={option.id} className="flex items-start justify-between gap-6 py-5 first:pt-0">
            <div>
              <p className="mb-1.5 text-[15px] font-bold text-primary">{option.title}</p>
              <p className="text-sm leading-[1.6] text-text-66">{option.description}</p>
            </div>
            <CookieToggle
              checked={
                option.locked || !option.preferenceKey
                  ? option.locked
                  : preferences[option.preferenceKey]
              }
              disabled={option.locked || !option.preferenceKey}
              onChange={
                option.locked || !option.preferenceKey
                  ? undefined
                  : () => toggle(option.preferenceKey!)
              }
              label={option.title}
            />
          </div>
        ))}
      </div>
      <div className="flex justify-end pt-6">
        <Button variant="primary" size="md" onClick={() => onSave(preferences)}>
          {saveLabel}
        </Button>
      </div>
    </Modal>
  );
}

"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@/components/ui/icons";

type Theme = "dark" | "light";

const STORAGE_KEY = "tg-theme";

// The <html data-theme> attribute is the single source of truth: app/layout.tsx's inline
// head script sets it from localStorage before first paint, and this toggle only ever
// writes it. Reading it through useSyncExternalStore keeps React's view in sync without a
// hydration mismatch (the server snapshot is the server-rendered default, "light").
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

function getTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function setTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode, disabled cookies) — the switch still applies for this visit.
  }
}

/** Light/dark switch for the Figma TG Theme (tokens.css §0 + §16). 44px hit area per SG 19. */
export default function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "light" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={[
        "inline-flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-sm text-nav transition-colors hover:bg-nav-hover hover:text-white",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}

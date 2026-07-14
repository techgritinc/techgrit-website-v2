import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** Dropdown/expand indicator. Rotated via the `.nav-chev` CSS class when its group is open. */
export function ChevronIcon(props: IconProps) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

/** Mobile menu toggle icon. */
export function HamburgerIcon(props: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      {...props}
    >
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

export function LinkedInIcon(props: IconProps) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V9.93H5.56v8.41h2.78zM6.95 8.69a1.61 1.61 0 1 0 0-3.22 1.61 1.61 0 0 0 0 3.22zM18.44 18.34v-4.61c0-2.47-1.32-3.62-3.08-3.62a2.66 2.66 0 0 0-2.41 1.32V9.93h-2.78v8.41h2.78v-4.42c0-1.17.22-2.3 1.67-2.3 1.43 0 1.45 1.34 1.45 2.38v4.34h2.7z" />
    </svg>
  );
}

export function YouTubeIcon(props: IconProps) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M23 12s0-3.3-.42-4.89a2.5 2.5 0 0 0-1.76-1.77C19.23 5 12 5 12 5s-7.23 0-8.82.34a2.5 2.5 0 0 0-1.76 1.77C1 8.7 1 12 1 12s0 3.3.42 4.89a2.5 2.5 0 0 0 1.76 1.77C4.77 19 12 19 12 19s7.23 0 8.82-.34a2.5 2.5 0 0 0 1.76-1.77C23 15.3 23 12 23 12zm-13 3.5v-7l6 3.5-6 3.5z" />
    </svg>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      {...props}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-10 5L2 7" />
    </svg>
  );
}

export function PhoneIcon(props: IconProps) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

// Wraps a card in whichever kind of link its CMS data actually supports (see
// resolveBlogHref in cms/shared/reusable-sections.ts):
//   - internal route      -> next/link, for client-side navigation
//   - absolute legacy URL -> plain <a>, so it leaves the app cleanly
//   - nothing usable      -> no anchor at all, rather than an anchor pointing nowhere
// Layout is left entirely to the caller (`style`/`className` pass straight through), so
// swapping a bare <a> for this component can't shift the grid it sits in.
export function CardLink({
  href,
  className,
  style,
  children,
}: {
  href: string | null;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  if (!href) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  if (/^https?:\/\//i.test(href)) {
    return (
      <a href={href} className={className} style={style}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style}>
      {children}
    </Link>
  );
}

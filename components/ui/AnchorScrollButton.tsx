"use client";

import Button, { type ButtonProps } from "@/components/ui/Button";

type AnchorScrollButtonProps = Extract<ButtonProps, { href: string }>;

export default function AnchorScrollButton({ onClick, href, ...props }: AnchorScrollButtonProps) {
  return (
    <Button
      {...props}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        const [path, id] = href.split("#");
        const normalize = (value: string) => value.replace(/\/+$/, "");
        const isSamePage = !path || normalize(path) === normalize(window.location.pathname);
        const target = id && isSamePage ? document.getElementById(decodeURIComponent(id)) : null;
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    />
  );
}

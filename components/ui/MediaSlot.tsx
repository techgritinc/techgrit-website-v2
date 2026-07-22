import Image from "next/image";
import type { CSSProperties } from "react";

type MediaSlotProps = {
  src: string | null | undefined;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  style?: CSSProperties;
};

/** Renders an image, or "Coming soon" text in its place when `src` is absent —
 * the uniform fallback rule for client logos, industry cards, and gallery
 * images (see specs/TMS-62/research.md §6).
 *
 * When `fill` is used, size the *parent* (a `relative` element with an
 * explicit height) — this component only fills that parent; it does not
 * establish its own size. */
export default function MediaSlot({ src, alt, className, fill, width, height, sizes, style }: MediaSlotProps) {
  if (!src) {
    return (
      <div
        role="img"
        aria-label={alt}
        style={style}
        className={[
          fill ? "absolute inset-0" : "",
          "flex items-center justify-center bg-glass text-xs font-bold tracking-wider text-ghost uppercase",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
      >
        Coming soon
      </div>
    );
  }

  if (fill) {
    return (
      <Image src={src} alt={alt} fill sizes={sizes} style={style} className={["object-cover", className].filter(Boolean).join(" ")} />
    );
  }

  return <Image src={src} alt={alt} width={width ?? 400} height={height ?? 300} style={style} className={className} />;
}

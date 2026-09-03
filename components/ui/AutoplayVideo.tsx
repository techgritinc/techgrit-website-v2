"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface AutoplayVideoProps {
  src: string;
  /** Classes applied while rendered in its normal (muted, looping, background) tile spot. */
  className?: string;
  /** Classes applied while rendered inside `portalTarget` (the full-size preview). */
  previewClassName?: string;
  /** When set, the underlying `<video>` element is relocated into this DOM node for
   * the full-size preview — so a click-to-preview reuses the exact playback session
   * (buffered data, position) instead of mounting a fresh <video> that re-requests
   * the file from byte 0. */
  portalTarget?: HTMLElement | null;
}

const NEAR_VIEWPORT_MARGIN = "200px";

/** Background-loop video tile: it does not fetch anything until it is near the
 * viewport, pauses (stops fetching further data) once scrolled away, and can be
 * handed off to a preview modal via `portalTarget` without restarting playback.
 *
 * The <video> is portaled into `portalHost` — one plain DOM node created exactly
 * once and never swapped — and `portalHost` itself is then physically relocated
 * (plain `appendChild`, outside React's reconciliation) between the tile and the
 * preview modal. This indirection matters: `createPortal`'s target is compared by
 * identity, so if the tile/modal container were passed to createPortal directly,
 * changing it on open/close would make React tear down and recreate the <video>
 * (losing playback position and re-requesting the file) instead of moving it. */
export default function AutoplayVideo({ src, className, previewClassName, portalTarget }: AutoplayVideoProps) {
  const [portalHost] = useState<HTMLDivElement | null>(() => {
    if (typeof document === "undefined") return null;
    const el = document.createElement("div");
    el.style.display = "contents";
    return el;
  });
  const [localSlot, setLocalSlot] = useState<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [wasPreviewing, setWasPreviewing] = useState(false);

  const isPreviewing = Boolean(portalTarget);
  const activeContainer = portalTarget ?? localSlot;

  // Move the stable `portalHost` node itself, rather than re-targeting the portal.
  useEffect(() => {
    if (!portalHost || !activeContainer) return;
    if (portalHost.parentElement !== activeContainer) {
      activeContainer.appendChild(portalHost); 
    }
  }, [portalHost, activeContainer]);

  // Opening the preview always needs the source attached, even for a tile that never
  // scrolled into view yet — adjusted during render (React's documented alternative to
  // an effect that only mirrors a prop into state) rather than in an effect, since a
  // setState call directly in an effect body causes an extra, avoidable render pass.
  if (isPreviewing !== wasPreviewing) {
    setWasPreviewing(isPreviewing);
    if (isPreviewing) setShouldLoad(true);
  }

  useEffect(() => {
    const node = videoRef.current;
    if (!node || isPreviewing) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          node.play().catch(() => {});
        } else {
          node.pause();
        }
      },
      { rootMargin: NEAR_VIEWPORT_MARGIN }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [isPreviewing]);

  useEffect(() => {
    if (!isPreviewing) return;
    videoRef.current?.play().catch(() => {});
  }, [isPreviewing]);

  const video = isPreviewing ? (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      controls
      autoPlay
      className={previewClassName}
    />
  ) : (
    <video
      ref={videoRef}
      src={shouldLoad ? src : undefined}
      preload="metadata"
      muted
      loop
      playsInline
      autoPlay
      aria-hidden="true"
      className={className}
    />
  );

  return (
    <>
      <div ref={setLocalSlot} className="contents" />
      {portalHost && createPortal(video, portalHost)}
    </>
  );
}

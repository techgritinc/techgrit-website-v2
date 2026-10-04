"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  const [portalHost, setPortalHost] = useState<HTMLDivElement | null>(null);
  const [localSlot, setLocalSlot] = useState<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [wasPreviewing, setWasPreviewing] = useState(false);

  const isPreviewing = Boolean(portalTarget);
  const activeContainer = portalTarget ?? localSlot;

  const hasCreatedPortalHost = useRef(false);

  // Piggybacks portalHost creation onto the localSlot ref callback rather than
  // a lazy useState initializer keyed on `typeof document` (SSR has no
  // `document`, so that would make the server output permanently disagree
  // with the client's very first render, which already has `document` and
  // would render the portaled <video> immediately — a hydration mismatch),
  // and rather than an effect (ref callbacks never run during SSR either, but
  // calling setState straight in a bare mount effect is a flagged anti-pattern
  // — react-hooks/set-state-in-effect). useCallback keeps this ref's identity
  // stable across renders so React doesn't re-invoke it (and re-run the
  // create-once guard) on every re-render of this component.
  const setLocalSlotRef = useCallback((node: HTMLDivElement | null) => {
    setLocalSlot(node);
    if (node && !hasCreatedPortalHost.current) {
      hasCreatedPortalHost.current = true;
      const el = document.createElement("div");
      el.style.display = "contents";
      setPortalHost(el);
    }
  }, []);

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
    // `portalHost` (and therefore this <video>) doesn't exist on the very first
    // commit — see the ref callback above — so this must re-run once it's created,
    // or the observer never gets attached at all.
    if (!portalHost || !node || isPreviewing) return;

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
  }, [isPreviewing, portalHost]);

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
      <div ref={setLocalSlotRef} className="contents" />
      {portalHost && createPortal(video, portalHost)}
    </>
  );
}

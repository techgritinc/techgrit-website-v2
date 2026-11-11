"use client";

import { useEffect, useRef, useState } from "react";
import { disableYouTubeCaptions, watchYouTubePreview, youTubePreviewSrc } from "@/cms/utils/youtube";

// Wait for YouTube's initial pause button and title bar to fade.
const PREVIEW_REVEAL_DELAY_MS = 3500;

/** Muted autoplaying background video; taller than its container so YouTube's title bar is cropped. */
export default function YouTubePreview({ id }: { id: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    let playing = false;
    let revealTimer: number | undefined;

    const stopWatching = watchYouTubePreview(frame, (isPlaying) => {
      if (isPlaying === playing) return;
      playing = isPlaying;
      window.clearTimeout(revealTimer);
      if (isPlaying) {
        revealTimer = window.setTimeout(() => setVisible(true), PREVIEW_REVEAL_DELAY_MS);
      } else {
        setVisible(false);
      }
    });

    return () => {
      stopWatching();
      window.clearTimeout(revealTimer);
    };
  }, [id]);

  return (
    <iframe
      ref={frameRef}
      src={youTubePreviewSrc(id)}
      onLoad={disableYouTubeCaptions}
      title=""
      aria-hidden="true"
      tabIndex={-1}
      loading="lazy"
      allow="autoplay; encrypted-media; picture-in-picture"
      referrerPolicy="strict-origin-when-cross-origin"
      className={`pointer-events-none absolute left-1/2 top-1/2 aspect-video h-[170%] max-w-none -translate-x-1/2 -translate-y-1/2 border-0 ${visible ? "opacity-100 transition-opacity duration-500" : "opacity-0"}`}
    />
  );
}

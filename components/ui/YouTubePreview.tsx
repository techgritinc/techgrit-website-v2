"use client";

import { useEffect, useRef } from "react";
import { disableYouTubeCaptions, watchYouTubePreview, youTubePreviewSrc } from "@/cms/utils/youtube";

export default function YouTubePreview({ id }: { id: string }) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    return watchYouTubePreview(frame);
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
      className="pointer-events-none absolute left-1/2 top-1/2 aspect-video h-full max-w-none -translate-x-1/2 -translate-y-1/2 border-0"
    />
  );
}

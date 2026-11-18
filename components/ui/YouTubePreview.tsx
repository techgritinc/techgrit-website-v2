"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { disableYouTubeCaptions, watchYouTubePreview, youTubePreviewSrc } from "@/cms/utils/youtube";

type YouTubePreviewProps = {
  id: string;
  /** Mount and play the video. Defaults to true (autoplay). */
  playing?: boolean;
  /** Thumbnail uploaded in the CMS; wins over YouTube's own thumbnail. */
  thumbnailUrl?: string | null;
  /** Show a thumbnail (CMS one, else YouTube's) until the video is playing. */
  showThumbnail?: boolean;
  /** Extra classes for the thumbnail image, e.g. an object-position. */
  thumbnailClassName?: string;
};

export default function YouTubePreview({
  id,
  playing = true,
  thumbnailUrl,
  showThumbnail = false,
  thumbnailClassName = "",
}: YouTubePreviewProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const withThumbnail = showThumbnail || Boolean(thumbnailUrl);
  // Over a thumbnail, keep the video hidden until it is actually playing.
  const [visible, setVisible] = useState(!withThumbnail);
  const fallbackSrc = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
  const [youTubeThumbnail, setYouTubeThumbnail] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    if (!withThumbnail) return watchYouTubePreview(frame);
    const stopWatching = watchYouTubePreview(frame, setVisible);
    return () => {
      stopWatching();
      setVisible(false);
    };
  }, [id, playing, withThumbnail]);

  return (
    <>
      {withThumbnail && (
        <Image
          src={thumbnailUrl || youTubeThumbnail}
          alt=""
          fill
          sizes="100vw"
          aria-hidden="true"
          // Not every video has a maxres thumbnail; YouTube then serves a 120px placeholder.
          onLoad={(event) => {
            if (!thumbnailUrl && event.currentTarget.naturalWidth <= 120 && youTubeThumbnail !== fallbackSrc) {
              setYouTubeThumbnail(fallbackSrc);
            }
          }}
          onError={() => {
            if (!thumbnailUrl) setYouTubeThumbnail(fallbackSrc);
          }}
          className={`object-cover ${thumbnailClassName}`}
        />
      )}
      {playing && (
        <iframe
          ref={frameRef}
          src={youTubePreviewSrc(id)}
          onLoad={disableYouTubeCaptions}
          title=""
          aria-hidden="true"
          tabIndex={-1}
          loading={withThumbnail ? undefined : "lazy"}
          allow="autoplay; encrypted-media; picture-in-picture"
          referrerPolicy="strict-origin-when-cross-origin"
          className={`pointer-events-none absolute left-1/2 top-1/2 aspect-video h-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 border-0 ${visible ? "opacity-100 transition-opacity duration-500" : "opacity-0"}`}
        />
      )}
    </>
  );
}

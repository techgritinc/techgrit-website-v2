const YOUTUBE_HOSTS = new Set([
  "youtube.com",
  "www.youtube.com",
  "m.youtube.com",
  "youtube-nocookie.com",
  "www.youtube-nocookie.com",
  "youtu.be",
]);

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;

/**
 * Extracts the 11-character video ID from whatever a CMS editor pastes into the
 * testimonial `videoLink` field: an /embed/ URL, a watch?v= URL, a youtu.be link,
 * a /shorts/ or /live/ URL, or a full `<iframe>` snippet (only its `src` is read —
 * the markup itself is never rendered). Returns null for empty input, non-YouTube
 * hosts, or anything that doesn't yield a valid ID, so callers can fall back.
 */
export function parseYouTubeId(input: string | null | undefined): string | null {
  if (!input) return null;
  let raw = input.trim();

  if (/<iframe/i.test(raw)) {
    const src = raw.match(/\bsrc\s*=\s*["']([^"']+)["']/i);
    if (!src) return null;
    raw = src[1].trim();
  }

  let url: URL;
  try {
    url = new URL(raw.startsWith("//") ? `https:${raw}` : raw);
  } catch {
    return null;
  }

  if (url.protocol !== "https:" && url.protocol !== "http:") return null;
  if (!YOUTUBE_HOSTS.has(url.hostname.toLowerCase())) return null;

  let candidate: string | null | undefined;
  if (url.hostname.toLowerCase() === "youtu.be") {
    candidate = url.pathname.split("/")[1];
  } else {
    const [, kind, id] = url.pathname.split("/");
    candidate = kind === "embed" || kind === "shorts" || kind === "live" ? id : url.searchParams.get("v");
  }

  return candidate && VIDEO_ID.test(candidate) ? candidate : null;
}

const EMBED_BASE = "https://www.youtube.com/embed";

// cc_load_policy=0 alone only means "follow the viewer's YouTube preference", so
// captions can still appear. enablejsapi=1 lets disableYouTubeCaptions() switch them off.
const NO_CAPTIONS = "cc_load_policy=0&enablejsapi=1";

/** Muted, controls-free preview URL; looped by watchYouTubePreview(), not `loop=1`. */
export function youTubePreviewSrc(id: string): string {
  return `${EMBED_BASE}/${id}?autoplay=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&fs=0&showinfo=0&${NO_CAPTIONS}`;
}

const YOUTUBE_ORIGIN = "https://www.youtube.com";
const STATE_ENDED = 0;
const STATE_PLAYING = 1;
const LOOP_EARLY_SECONDS = 1.5;

/** Reports play state of a preview iframe and loops it. Returns a cleanup function. */
export function watchYouTubePreview(
  frame: HTMLIFrameElement,
  onPlayingChange: (playing: boolean) => void,
): () => void {
  const send = (message: object) => frame.contentWindow?.postMessage(JSON.stringify(message), YOUTUBE_ORIGIN);
  const timers: number[] = [];
  let duration = 0;
  let restarting = false;

  // Retry: the player ignores messages until ready.
  const subscribe = () => {
    for (const delay of [0, 300, 1000, 2000, 4000]) {
      timers.push(
        window.setTimeout(() => {
          send({ event: "listening", id: 1 });
          send({ event: "command", func: "addEventListener", args: ["onStateChange"] });
        }, delay),
      );
    }
  };

  const onMessage = (event: MessageEvent) => {
    if (event.origin !== YOUTUBE_ORIGIN || event.source !== frame.contentWindow) return;
    if (typeof event.data !== "string") return;
    let data: { event?: string; info?: unknown };
    try {
      data = JSON.parse(event.data);
    } catch {
      return;
    }

    // Loop just before the end to skip YouTube's end screen.
    if (data.event === "infoDelivery" && data.info && typeof data.info === "object") {
      const info = data.info as { currentTime?: unknown; duration?: unknown };
      if (typeof info.duration === "number" && info.duration > 0) duration = info.duration;
      if (
        typeof info.currentTime === "number" &&
        duration > LOOP_EARLY_SECONDS * 2 &&
        info.currentTime >= duration - LOOP_EARLY_SECONDS &&
        !restarting
      ) {
        restarting = true;
        send({ event: "command", func: "seekTo", args: [0, true] });
      } else if (typeof info.currentTime === "number" && info.currentTime < LOOP_EARLY_SECONDS) {
        restarting = false;
      }
    }

    const state =
      data.event === "onStateChange"
        ? data.info
        : data.event === "infoDelivery"
          ? (data.info as { playerState?: unknown } | undefined)?.playerState
          : undefined;
    if (typeof state !== "number") return;

    if (state === STATE_ENDED) {
      send({ event: "command", func: "seekTo", args: [0, true] });
      send({ event: "command", func: "playVideo", args: [] });
    }
    onPlayingChange(state === STATE_PLAYING);
  };

  window.addEventListener("message", onMessage);
  frame.addEventListener("load", subscribe);
  subscribe();

  return () => {
    window.removeEventListener("message", onMessage);
    frame.removeEventListener("load", subscribe);
    timers.forEach((timer) => window.clearTimeout(timer));
  };
}

/** Full player with sound and controls, used in the click-to-open modal. */
export function youTubePlayerSrc(id: string): string {
  return `${EMBED_BASE}/${id}?autoplay=1&rel=0&playsinline=1&${NO_CAPTIONS}`;
}

/**
 * Turns captions off in a YouTube iframe. Use as the iframe's `onLoad`. The player
 * only listens once its API is ready, so the command is repeated for a few seconds.
 */
export function disableYouTubeCaptions(event: { currentTarget: HTMLIFrameElement }): void {
  const frame = event.currentTarget;
  const send = (func: string, args: unknown[] = []) =>
    frame.contentWindow?.postMessage(JSON.stringify({ event: "command", func, args }), "https://www.youtube.com");

  frame.contentWindow?.postMessage(JSON.stringify({ event: "listening", id: 1 }), "https://www.youtube.com");
  for (const delay of [300, 1000, 2000, 4000]) {
    setTimeout(() => {
      send("unloadModule", ["captions"]);
      send("unloadModule", ["cc"]);
    }, delay);
  }
}

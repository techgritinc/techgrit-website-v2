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

/** Muted, looping, chrome-less background preview used inside the testimonial card. */
export function youTubePreviewSrc(id: string): string {
  return `${EMBED_BASE}/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0&modestbranding=1&disablekb=1&iv_load_policy=3&${NO_CAPTIONS}`;
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

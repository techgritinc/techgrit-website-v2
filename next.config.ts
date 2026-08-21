import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No `output` key: the site is served by a long-running `next start` process on the
  // VM behind nginx, which is what makes CMS-driven content appear without a rebuild.
  // This was `output: "export"` while the site was a static bundle on GitHub Pages --
  // that mode is incompatible with a server, so removing it is the change that flips
  // the app from static to server-rendered.

  // Preserved from the GitHub Pages build. Pages served every route with a trailing
  // slash (/about/), so every existing inbound link and bookmark depends on it.
  // Dropping it would silently break them for no gain.
  trailingSlash: true,

  images: {
    // Kept from the static build. A server *could* run Next's image optimizer, but it
    // costs CPU and memory per image and nothing needs it yet. Revisit when real CMS
    // images land, not as part of a hosting move.
    unoptimized: true,
  },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No `output` key. This was `output: "export"` for GitHub Pages; every route is now
  // dynamic (cms/api/fetcher.ts uses cache: "no-store"), which cannot be exported, so
  // the site runs as `next start` behind nginx on the VM.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb",
    },
  },
};

export default nextConfig;

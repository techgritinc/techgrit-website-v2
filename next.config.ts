import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone, not "export". Every route is dynamic (cms/api/fetcher.ts uses
  // cache: "no-store"), so this is still a full SSR server -- `output: "standalone"`
  // only changes *packaging*: Next traces the modules the server actually reaches and
  // emits a self-contained server.js, so the VM no longer needs the source tree or a
  // 637M node_modules. It also removes the in-place `.next` rewrite under the running
  // process (the 404-on-hashed-chunks window noted in CLAUDE.md), because the VM no
  // longer builds at all -- CI ships a prebuilt artifact.
  output: "standalone",
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

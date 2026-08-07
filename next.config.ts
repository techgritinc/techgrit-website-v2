import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/techgrit-website-v2",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./image-loader.ts",
  },
};

export default nextConfig;

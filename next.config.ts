import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  trailingSlash: true,
  allowedDevOrigins: ['192.168.22.1'],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

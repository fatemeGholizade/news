import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [],
    remotePatterns: [],
    dangerouslyAllowSVG: false,
    unoptimized: true,
  },
};

export default nextConfig;

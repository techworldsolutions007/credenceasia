import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['d3-geo'],
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
};

export default nextConfig;

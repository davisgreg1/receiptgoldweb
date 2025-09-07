import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable Turbopack for production builds to avoid Vercel issues
  experimental: {
    turbo: {
      // Only use Turbopack in development
      resolveAlias: {},
    },
  },
  // Use webpack for production builds
  webpack: (config, { dev }) => {
    if (!dev) {
      // Production webpack config
      return config;
    }
    return config;
  },
};

export default nextConfig;

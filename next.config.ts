import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure Turbopack with new syntax
  turbopack: {
    root: process.cwd(),
    resolveAlias: {},
  },
  // Configure headers for Apple App Site Association file
  async headers() {
    return [
      {
        source: '/.well-known/apple-app-site-association',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

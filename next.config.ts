import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configure Turbopack with new syntax
  turbopack: {
    root: process.cwd(),
    resolveAlias: {},
  },
};

export default nextConfig;

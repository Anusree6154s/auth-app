import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/auth/:path*", // Frontend route
        destination: "http://localhost:8000/auth/:path*", // Backend route
      },
    ];
  },
};

export default nextConfig;

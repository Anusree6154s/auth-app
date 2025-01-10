import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/auth/:path*", // Frontend route
        destination: "https://auth-app-backend-ab08.onrender.com/auth/:path*", // Backend route
      },
    ];
  },
};

export default nextConfig;

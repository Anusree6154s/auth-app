import type { NextConfig } from "next";

const backendUrl = "https://auth-app-backend-ab08.onrender.com";
// const backendUrl = "http://localhost:8000";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/auth/:path*", // Frontend route
        destination: backendUrl + "/auth/:path*", // Backend route
      },
    ];
  },
};

export default nextConfig;

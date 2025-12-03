import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      // you can add more image hosts later
      // { protocol: "https", hostname: "yourcdn.com" }
    ],
  },
};

export default nextConfig;

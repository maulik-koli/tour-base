import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**', // allow any path under res.cloudinary.com
      },
      {
        protocol: 'http',  // ← ADD THIS
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },

      // you can add more image hosts later
      // { protocol: "https", hostname: "yourcdn.com" }
    ],
  },
};

export default nextConfig;

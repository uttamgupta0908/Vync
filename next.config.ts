import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'api.dicebear.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/proxy/:path*',
        destination: 'https://api.vync.live/:path*',
      },
    ];
  },
};

export default nextConfig;

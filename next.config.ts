import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // Allow next/image to serve from the public/images directory
    unoptimized: false,
    // Remote patterns can be added later for any external image URLs
  },
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: false,
  },
  async redirects() {
    return [
      {
        source: '/bluetti',
        destination: 'https://bluetti.thekeithhopkins.com/power-page',
        permanent: false,
      },
      {
        source: '/electric',
        destination: 'https://electric.thekeithhopkins.com/',
        permanent: false,
      },
      {
        source: '/machinebaseai',
        destination: 'https://machinebaseai.thekeithhopkins.com',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  staticPageGenerationTimeout: 120,
  reactStrictMode: false,
  // experimental: {
  //   turbo: true,
  // },
  images: {
    remotePatterns: [
      {
        hostname: '**',
      },
    ],
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true, // Ignores ESLint during builds
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

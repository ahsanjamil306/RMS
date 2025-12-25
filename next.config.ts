import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: ['api.dicebear.com'],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;

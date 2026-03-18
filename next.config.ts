import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Experimentelle Features für Next.js 15
  experimental: {
    // Server Actions sind in Next.js 15 stabil
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Externe Pakete nicht im Server-Bundle bündeln
  serverExternalPackages: ['@prisma/client'],

  // Bilder von externen Domains erlauben
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
}

export default nextConfig

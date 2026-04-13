import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const securityHeaders = [
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // HSTS only in production to avoid locking dev environments onto HTTPS
  ...(isProd
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]
    : []),
]

const nextConfig: NextConfig = {
  trailingSlash: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: securityHeaders,
    },
  ],
  // Redirect common mistyped paths — /ca/{us-state}/... → /us/{us-state}/...
  redirects: async () => [
    {
      source: '/ca/florida/:path*',
      destination: '/us/florida/:path*',
      permanent: true,
    },
    {
      source: '/ca/texas/:path*',
      destination: '/us/texas/:path*',
      permanent: true,
    },
    {
      source: '/ca/california/:path*',
      destination: '/us/california/:path*',
      permanent: true,
    },
    {
      source: '/ca/new-york/:path*',
      destination: '/us/new-york/:path*',
      permanent: true,
    },
    {
      source: '/ca/illinois/:path*',
      destination: '/us/illinois/:path*',
      permanent: true,
    },
  ],
}

export default nextConfig

import type { NextConfig } from 'next'
import type { Redirect } from 'next/dist/lib/load-custom-routes'
import { LEGACY_REDIRECTS } from './src/data/legacy-redirects'

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
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: securityHeaders,
    },
  ],
  // Redirects: mistyped /ca/{us-state} paths first, then the scaffolded
  // legacy-URL inventory (see src/data/legacy-redirects.ts).
  redirects: async (): Promise<Redirect[]> => {
    const mistypedCountryRedirects: Redirect[] = [
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
    ]

    const legacyRedirects: Redirect[] = LEGACY_REDIRECTS.map((r) => ({
      source: r.source,
      destination: r.destination,
      permanent: r.permanent,
    }))

    return [...mistypedCountryRedirects, ...legacyRedirects]
  },
}

export default nextConfig

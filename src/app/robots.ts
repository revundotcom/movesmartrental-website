import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/studio/',
          '/_next/',
          '/*.json$',
          '/draft/',
        ],
      },
      // Explicitly allow major AI / LLM crawlers so MoveSmart content is
      // discoverable in AI answer engines (GEO / AEO strategy).
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Perplexity-User', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'CCBot', allow: '/' },
      { userAgent: 'Applebot-Extended', allow: '/' },
      { userAgent: 'AhrefsBot', allow: '/' },
    ],
    sitemap: [
      // Content-type segmented index (auto-discovers every child sitemap)
      `${SITE_URL}/sitemap-index.xml`,
      // Native Next.js generateSitemaps output (kept for redundancy)
      `${SITE_URL}/sitemap.xml`,
    ],
    host: SITE_URL,
  }
}

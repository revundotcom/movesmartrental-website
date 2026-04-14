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
      `${SITE_URL}/sitemap.xml`,
      `${SITE_URL}/sitemap-index.xml`,
      `${SITE_URL}/sitemap-core.xml`,
      `${SITE_URL}/sitemap-ca.xml`,
      `${SITE_URL}/sitemap-us.xml`,
      `${SITE_URL}/sitemap-resources.xml`,
    ],
    host: SITE_URL,
  }
}

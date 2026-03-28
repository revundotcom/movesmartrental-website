# Technology Stack

**Project:** MoveSmartRentals.com
**Researched:** 2026-03-28
**Overall Confidence:** HIGH (all major choices verified against official docs and current releases)

---

## Critical Finding: Next.js Version Decision

**Next.js 16.2.1 is the current stable release** as of March 2026. The project spec says "Next.js 15" — this needs a deliberate call.

**Recommendation: Start on Next.js 15.2.4, do NOT upgrade to Next.js 16 for this project.**

Rationale: Next.js 16 has multiple breaking changes that would burn sprint days on a 29-day fixed-price contract:
- `middleware` renamed to `proxy` (file rename + function rename required)
- Async Request APIs fully enforced — no synchronous compat shim (N15 had a temporary shim)
- `generateSitemaps` `id` now a Promise — the sitemap architecture breaks
- `serverRuntimeConfig` / `publicRuntimeConfig` removed — if any config uses these
- Turbopack now default for `next build` — breaks projects with webpack plugins

Next.js 15.2.4 is fully production-stable, supported, and excellent for SEO. Upgrade to 16 is a post-launch decision for the client.

---

## Recommended Stack

### Core Framework

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.2.4 | App framework, routing, SSG/ISR, metadata API | App Router gives built-in metadata API, generateStaticParams for programmatic city pages, ISR for CMS-driven revalidation, and full SSR for crawlable HTML — all critical for the SEO mandate. 15.x is current stable, battle-tested, and avoids Next.js 16 breaking-change risk on a tight contract. |
| React | 19.0.0 | UI rendering (required by Next.js 15) | Next.js 15 requires React 19. React 19 with Server Components is the rendering model for ISR city pages. |
| TypeScript | 5.4+ | Type safety | Required by Next.js 16 (min 5.1); Next.js 15 also benefits from it. Type-safe GROQ query results, schema types, and metadata payloads catch bugs before deployment. |
| Node.js | 20.9+ (LTS) | Runtime | Next.js 15 minimum requirement. Node 20 LTS is the safe production baseline. |

**Confidence:** HIGH (verified against Next.js official docs and GitHub releases)

---

### CMS

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Sanity Studio | v3 (3.57+) | Headless CMS, content editing UI | Managed infrastructure (no DevOps), real-time collaboration, structured content types fit the 9-schema requirement, non-developer publishing workflow via Studio UI. v3 is current and actively maintained. |
| next-sanity | 12.1.1 | Official Sanity toolkit for Next.js | Provides Live Content API integration, Draft Mode, visual editing overlays, webhook-driven ISR revalidation, and typed GROQ client. The only official bridge package — do not use @sanity/client directly in Next.js. |
| @portabletext/react | latest (^3.x) | Render Sanity Portable Text blocks in React | The official, actively maintained replacement for the deprecated @sanity/block-content-to-react. Required to render blog/guide/long-form content blocks. |
| next-sanity-image (via next-sanity) | included | Sanity CDN image optimization | Sanity's image CDN handles WebP/AVIF conversion, resizing, and edge caching — offloads image optimization from Vercel functions and reduces image ISR costs. Use the Image component exported from next-sanity/image. |
| @sanity/client | 6.x | GROQ query client | Included transitively via next-sanity, but may be imported directly for server-side API routes and webhook handlers. |

**Sanity Plan:** Growth — $15/seat/month, supports 50 seats, 25k documents, 2 datasets, scheduled publishing, AI Assist, 1M API CDN requests/month. The 25k document limit is sufficient for Ontario-first launch (20 cities × ~20 page types = 400 programmatic pages + blog content). Monitor document count as US states expand.

**Confidence:** HIGH (verified against Sanity npm releases, official docs, and pricing page)

---

### Hosting & Infrastructure

| Technology | Version/Plan | Purpose | Why |
|------------|---------|---------|-----|
| Vercel Pro | Current | Hosting, edge network, ISR cache | Native Next.js ISR support at $0.40/1M reads. Zero-config deployment. Global edge CDN aligns with Canada + US audience. Pro plan required for team collaboration, preview deployments per branch, and advanced analytics. Sanity webhooks hit Vercel API routes for on-demand ISR revalidation. |
| GitHub (REVUN account) | - | Source control, CI/CD trigger | Client owns the repo. Each push to `main` triggers Vercel deployment. Feature branches get preview URLs for client review — essential for the 4-milestone delivery cadence. |

**Confidence:** HIGH (verified against Vercel pricing and plan docs)

---

### UI Layer

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Tailwind CSS | v4.1 | Utility-first CSS | v4 is the current stable (released Jan 2025, v4.1 April 2025). CSS-first `@theme` directives replace JS config — faster builds (Rust engine, incremental 100x faster). Critical for hitting the April 24 deadline — rapid component composition without context switching. |
| shadcn/ui | CLI v4 (March 2026) | Accessible component library | Not a dependency — generates copy-paste component source code. Fully compatible with React 19 + Next.js 15. Used for: Dialog, Sheet, Tabs, Accordion (FAQ), Form, Input, Button, Card, NavigationMenu, Breadcrumb. Saves 2-3 days of accessible component work. |
| lucide-react | 0.577.0 | Icon library | Default icon set for shadcn/ui. 1,655 icons, tree-shakable SVG components. Use for service icons, navigation arrows, trust signals. |

**Confidence:** HIGH (verified against Tailwind, shadcn, and lucide official docs/releases)

---

### SEO System Libraries

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| Built-in Next.js Metadata API | (Next.js 15 built-in) | Page titles, meta descriptions, OG tags, canonical URLs | No external library needed. `generateMetadata()` in each route segment generates dynamic, per-page metadata from GROQ data. Type-safe. SSR-rendered in `<head>` — fully crawlable. |
| Built-in Next.js sitemap.ts | (Next.js 15 built-in) | XML sitemap generation | Use `app/sitemap.ts` + `generateSitemaps()` for segmented sitemaps (owner pages, tenant pages, city pages, blog). No `next-sitemap` package needed — built-in App Router API is cleaner and queries Sanity at request time. The `generateSitemaps()` function returns multiple sitemap index entries, solving the enterprise sitemap index gap. |
| Built-in Next.js robots.ts | (Next.js 15 built-in) | robots.txt generation | `app/robots.ts` exports a `robots()` function — dynamically served, no static file to manage. |
| JSON-LD (inline script tag) | Native | Structured data schemas | Inject Organization, LocalBusiness, FAQ, Service, Article, BreadcrumbList, RealEstateListing schema as `<script type="application/ld+json">` in Server Components. No external library needed — avoids serialization bugs. Google and AI crawlers (ChatGPT, Claude, Perplexity) parse this for featured results and LLM citations. |
| next-sitemap | NOT RECOMMENDED | — | Deprecated pattern for App Router. next-sitemap is a postbuild script that can't query Sanity at runtime and doesn't integrate cleanly with on-demand ISR. Avoid. |

**Confidence:** HIGH (verified against Next.js official docs and Sanity + Next.js integration guides)

---

### Analytics & Tag Management

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| @next/third-parties | 16.2.1 (matches next version) | GTM and GA4 integration | Official Vercel/Next.js package providing `GoogleTagManager` and `GoogleAnalytics` components. Loads scripts after hydration with performance-safe strategy. Replaces manual `<Script>` tag placement. Avoids Partytown complexity (Partytown + App Router has known limitations). |
| Google Tag Manager | (external service) | Event tracking container | All GA4 events, scroll depth, CTA clicks, city-to-service CTR, and conversion events flow through GTM. Non-developer tag management after launch. |
| Google Analytics 4 | (external service) | Traffic and conversion data | Configured via GTM. Track organic sessions, landing pages, form submissions. |
| Google Search Console | (external service) | Index monitoring | Connect via site verification meta tag in `generateMetadata()`. Monitor crawl errors, indexed page count, and keyword rankings. |

**Confidence:** HIGH (@next/third-parties verified; GTM/GA4 are standard integrations)

---

### Forms & Validation

| Library | Version | Purpose | Why |
|---------|---------|---------|-----|
| react-hook-form | ^7.x | Form state management | Uncontrolled inputs, minimal re-renders. Used for Contact form, Book a Call form, and lead capture forms. shadcn/ui Form component is built on react-hook-form. |
| zod | ^3.x | Schema validation | Shared validation between client and Next.js Server Actions. Type inference from schemas eliminates duplicate type declarations. Standard in the Next.js 15 + shadcn/ui ecosystem. |
| @hookform/resolvers | ^3.x | Connects Zod to react-hook-form | Required adapter package. |

**Confidence:** HIGH (standard trio, verified as current best practice in Next.js 15 ecosystem)

---

### Chat Integration

| Library | Purpose | Why |
|---------|---------|-----|
| Zoho SalesIQ (embed script) | Live chat widget | Contract-required. Integrate via `<Script>` component in `app/layout.tsx` with `strategy="lazyOnload"` to avoid blocking LCP. SalesIQ provides a JavaScript embed snippet — no npm package exists. Use the `$zoho.salesiq.ready` handler for any custom event tracking. |

**Confidence:** MEDIUM (Zoho SalesIQ has no dedicated Next.js npm package; script-tag injection via Next.js Script component is the verified community pattern)

---

### Developer Tooling

| Tool | Version | Purpose | Why |
|------|---------|---------|-----|
| ESLint | v9 (flat config) | Linting | Next.js 16 deprecated `next lint` — but on Next.js 15, `next lint` still works. Use ESLint v9 with flat config (`eslint.config.mjs`) and `@next/eslint-plugin-next`. |
| Prettier | ^3.x | Code formatting | Consistent code style across the codebase. Add `prettier-plugin-tailwindcss` for automatic Tailwind class sorting. |
| prettier-plugin-tailwindcss | latest | Tailwind class sorting | Prevents merge conflicts from inconsistent class order. |

---

### Environment Variables

| Variable Pattern | Used For |
|-----------------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID (client-safe) |
| `NEXT_PUBLIC_SANITY_DATASET` | Sanity dataset name (production/staging) |
| `SANITY_API_READ_TOKEN` | Server-only Sanity read token for Draft Mode and previews |
| `SANITY_WEBHOOK_SECRET` | Validates webhook payloads from Sanity for on-demand ISR |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container ID |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 Measurement ID (if using direct GA4 alongside GTM) |

---

## Alternatives Considered and Rejected

| Category | Recommended | Alternative Considered | Why Alternative Was Rejected |
|----------|-------------|----------------------|-------------------------------|
| Framework | Next.js 15 | Next.js 16 | Too many breaking changes (middleware rename, fully async APIs, sitemap async id) on a 29-day fixed contract. Post-launch upgrade path is clear. |
| CMS | Sanity v3 | Contentful, Payload CMS, WordPress | WordPress is what the client is migrating *away from*. Contentful is more expensive at scale. Payload CMS requires self-hosted infrastructure (defeats zero-DevOps goal). Sanity is the only managed, developer-friendly CMS with strong Next.js ISR integration. |
| UI | Tailwind v4 + shadcn/ui | Tailwind v3 | v4 is current stable, faster builds, simpler config. No reason to use v3 for a new project. |
| UI | shadcn/ui | Chakra UI, MUI, Radix UI | shadcn/ui generates accessible Radix UI primitives as owned source code — no version lock-in, fully customizable. MUI/Chakra add bundle weight without SEO benefit. |
| Sitemap | Built-in Next.js sitemap.ts | next-sitemap npm package | next-sitemap is a postbuild script that can't query Sanity dynamically at runtime and doesn't integrate with on-demand ISR. The App Router built-in is purpose-built for this architecture. |
| Icons | lucide-react | react-icons, heroicons | lucide-react is the shadcn/ui default and is tree-shakable. react-icons bundles all icons. Heroicons is icon-count limited. |
| Analytics loading | @next/third-parties | Partytown + GTM | Partytown App Router integration is flagged as experimental with known issues. @next/third-parties is the official, maintained solution with lazyOnload strategy. |
| Portable Text | @portabletext/react | @sanity/block-content-to-react | @sanity/block-content-to-react is officially deprecated. @portabletext/react is the current standard. |

---

## Installation

### Scaffolding

```bash
npx create-next-app@15.2.4 movesmart-rentals \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"

cd movesmart-rentals
```

### Core Dependencies

```bash
# Sanity CMS
npm install next-sanity @portabletext/react @sanity/client

# Sanity Studio (embedded in /studio route)
npm install sanity@latest @sanity/vision

# Forms
npm install react-hook-form zod @hookform/resolvers

# Icons
npm install lucide-react
```

### shadcn/ui Initialization

```bash
npx shadcn@latest init
# Select: Default style, neutral base color, CSS variables: yes
```

Then add components as needed:

```bash
npx shadcn@latest add button card dialog accordion tabs navigation-menu breadcrumb form input sheet
```

### Analytics

```bash
npm install @next/third-parties
```

### Dev Dependencies

```bash
npm install -D prettier prettier-plugin-tailwindcss
```

---

## Key Configuration Notes

### next.config.ts (Next.js 15)

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        // Allows all Sanity CDN image paths
      },
    ],
  },
  // No experimental flags needed — all required features are stable in Next.js 15
}

export default nextConfig
```

### Sanity Webhook for ISR Revalidation

Configure in Sanity Manage:
- URL: `https://movesmartrentals.com/api/revalidate`
- Trigger: Create, Update, Delete
- HTTP Method: POST
- Projection: `{_type, "slug": slug.current}`
- Secret: Match `SANITY_WEBHOOK_SECRET` env var

Your `/api/revalidate/route.ts` validates the secret and calls `revalidateTag()` per document type.

### ISR Strategy for City Pages

```typescript
// app/ca/[province]/[city]/[service]/page.tsx
export const revalidate = 86400 // 24 hours fallback (on-demand webhook takes priority)

export async function generateStaticParams() {
  // Query Sanity for all province/city/service combinations
  // Returns array of {province, city, service} objects
  // Pre-builds Ontario Tier-1 cities at deploy time
}
```

---

## Sanity Plan Note

The PROJECT.md mentions "Sanity Growth Plan at $374/mo for 5-person team." This does not match current pricing. As of March 2026, the Growth plan is **$15/seat/month**. A 5-seat team = $75/month. The $374/month figure appears to be outdated or was from a previous pricing model. Confirm with client — this is a meaningful cost difference (CAD ~$102/month vs ~$510/month).

---

## Sources

- [Next.js 15.2.4 blog post and release notes](https://nextjs.org/blog) (HIGH confidence)
- [Next.js 16 blog post](https://nextjs.org/blog/next-16) (HIGH confidence)
- [Next.js 16 upgrading guide — official docs](https://nextjs.org/docs/app/guides/upgrading/version-16) (HIGH confidence)
- [Sanity Studio changelog — version 3.57+](https://www.sanity.io/docs/changelog) (HIGH confidence)
- [next-sanity npm — version 12.1.1](https://www.npmjs.com/package/next-sanity) (HIGH confidence)
- [Sanity pricing page](https://www.sanity.io/pricing) (HIGH confidence)
- [Tailwind CSS v4.0 release post](https://tailwindcss.com/blog/tailwindcss-v4) (HIGH confidence)
- [shadcn/ui March 2026 changelog](https://ui.shadcn.com/docs/changelog/2026-03-cli-v4) (HIGH confidence)
- [lucide-react npm — version 0.577.0](https://www.npmjs.com/package/lucide-react) (HIGH confidence)
- [Next.js Metadata API docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) (HIGH confidence)
- [Next.js sitemap.ts docs and generateSitemaps](https://nextjs.org/docs/app/api-reference/functions/generate-sitemaps) (HIGH confidence)
- [Next.js ISR guide](https://nextjs.org/docs/app/guides/incremental-static-regeneration) (HIGH confidence)
- [Sanity + Next.js caching and revalidation](https://www.sanity.io/docs/nextjs/caching-and-revalidation-in-nextjs) (HIGH confidence)
- [@next/third-parties npm and Google Tag Manager docs](https://nextjs.org/docs/app/guides/third-party-libraries) (HIGH confidence)
- [Vercel Pro plan docs](https://vercel.com/docs/plans/pro-plan) (HIGH confidence)
- [react-hook-form + zod + Next.js 15 Server Actions pattern](https://www.abstractapi.com/guides/email-validation/type-safe-form-validation-in-next-js-15-with-zod-and-react-hook-form) (HIGH confidence)
- [Zoho SalesIQ JS API](https://www.zoho.com/salesiq/help/developer-section/js-api.html) (MEDIUM confidence — no dedicated Next.js package)

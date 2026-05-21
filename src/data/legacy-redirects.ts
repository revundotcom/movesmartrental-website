/**
 * LEGACY REDIRECT SCAFFOLD
 * =========================================================================
 * These entries are PLACEHOLDERS based on common property-management CMS
 * patterns (WordPress/PHP legacy slugs, PM industry conventions, and the
 * MoveSmart brand pivot from "property management" to "white-glove leasing").
 *
 * BEFORE PRODUCTION DEPLOYMENT:
 *   1. Run a full crawl of the legacy site (Screaming Frog / Sitebulb).
 *   2. Export Google Search Console "Pages" + top 1000 historical URLs.
 *   3. Replace / augment this list with verified 1:1 mappings.
 *   4. Remove any entry here that does not correspond to an actual legacy URL
 *      (dead entries in redirects() are harmless but add noise).
 *
 * Shape matches Next.js `redirects()` config:
 *   - `source`      : legacy path (supports :param, :rest*)
 *   - `destination` : new path on this site
 *   - `permanent`   : always true (301) for legacy cleanup
 *   - `reason`      : internal documentation only (not sent to Next.js)
 * =========================================================================
 */

export interface LegacyRedirect {
  source: string
  destination: string
  permanent: true
  reason: string
}

export const LEGACY_REDIRECTS: LegacyRedirect[] = [
  // --- Brand pivot: property-management -> leasing-services ---
  {
    source: '/property-management/',
    destination: '/services/leasing-services/',
    permanent: true,
    reason: 'Brand pivot: property-management -> white-glove leasing',
  },
  {
    source: '/property-management/:city',
    destination: '/ca/ontario/:city/leasing-services/',
    permanent: true,
    reason: 'Old city PM slugs -> new city-service route (Ontario default; refine per-city if needed)',
  },
  {
    source: '/pm-services/:rest*',
    destination: '/services/leasing-services/',
    permanent: true,
    reason: 'Catch-all legacy PM paths -> leasing services hub',
  },
  {
    source: '/property-management-services/',
    destination: '/services/leasing-services/',
    permanent: true,
    reason: 'Long-form legacy PM services slug',
  },
  {
    source: '/management-services/',
    destination: '/services/',
    permanent: true,
    reason: 'Generic management -> services hub',
  },
  {
    source: '/rent-collection/',
    destination: '/services/tenant-placement/',
    permanent: true,
    reason: 'Rent collection is not our service; closest fit is tenant placement',
  },
  {
    source: '/maintenance/',
    destination: '/services/',
    permanent: true,
    reason: 'Maintenance was PM-era service; redirect to services hub',
  },
  {
    source: '/eviction-services/',
    destination: '/services/tenant-placement/',
    permanent: true,
    reason: 'Eviction handling is not offered; route to tenant screening equivalent',
  },

  // --- Service slug normalization ---
  {
    source: '/tenant-placement-service/',
    destination: '/services/tenant-placement/',
    permanent: true,
    reason: 'Service slug normalization (singular form)',
  },
  {
    source: '/tenant-placement-services/',
    destination: '/services/tenant-placement/',
    permanent: true,
    reason: 'Service slug normalization (plural form)',
  },
  {
    source: '/rent-guarantee-program/',
    destination: '/services/rent-guarantee/',
    permanent: true,
    reason: 'Rent guarantee landing normalization',
  },
  {
    source: '/leasing/',
    destination: '/services/leasing-services/',
    permanent: true,
    reason: 'Shortcut slug -> canonical services route',
  },

  // --- Audience hubs ---
  {
    source: '/landlord-services/',
    destination: '/owners/',
    permanent: true,
    reason: 'Landlord-focused hub consolidated under /owners',
  },
  {
    source: '/for-landlords/',
    destination: '/owners/',
    permanent: true,
    reason: 'Alternate landlord hub slug',
  },
  {
    source: '/investors/',
    destination: '/owners/',
    permanent: true,
    reason: 'Investor-facing content folded into owners hub',
  },

  // --- About + team ---
  {
    source: '/about-us/',
    destination: '/about/',
    permanent: true,
    reason: 'About slug normalization',
  },
  {
    source: '/our-team/',
    destination: '/about/',
    permanent: true,
    reason: 'Team page merged into about',
  },
  {
    source: '/team/',
    destination: '/about/',
    permanent: true,
    reason: 'Team page merged into about',
  },
  {
    source: '/company/',
    destination: '/about/',
    permanent: true,
    reason: 'Company slug -> about',
  },

  // --- Services hub aliases ---
  {
    source: '/our-services/',
    destination: '/services/',
    permanent: true,
    reason: 'Services hub normalization',
  },
  {
    source: '/what-we-do/',
    destination: '/services/',
    permanent: true,
    reason: 'Alternate services hub slug',
  },

  // --- Pricing ---
  {
    source: '/pricing-plans/',
    destination: '/pricing/',
    permanent: true,
    reason: 'Pricing slug normalization',
  },
  {
    source: '/fees/',
    destination: '/pricing/',
    permanent: true,
    reason: 'Fees page -> pricing',
  },
  {
    source: '/plans/',
    destination: '/pricing/',
    permanent: true,
    reason: 'Plans slug -> pricing',
  },

  // --- Portal / tech ---
  {
    source: '/tenants-portal/',
    destination: '/portal-and-technology/',
    permanent: true,
    reason: 'Tenant portal merged into unified portal hub',
  },
  {
    source: '/tenant-portal/',
    destination: '/portal-and-technology/',
    permanent: true,
    reason: 'Tenant portal (singular) -> unified portal hub',
  },
  {
    source: '/owners-portal/',
    destination: '/portal-and-technology/',
    permanent: true,
    reason: 'Owner portal merged into unified portal hub',
  },
  {
    source: '/owner-portal/',
    destination: '/portal-and-technology/',
    permanent: true,
    reason: 'Owner portal (singular) -> unified portal hub',
  },
  {
    source: '/technology/',
    destination: '/portal-and-technology/',
    permanent: true,
    reason: 'Technology standalone page -> combined hub',
  },

  // --- Blog / resources ---
  {
    source: '/blog/',
    destination: '/resources/',
    permanent: true,
    reason: 'Blog hub consolidated into resources',
  },
  {
    source: '/blog/:slug',
    destination: '/resources/:slug/',
    permanent: true,
    reason: 'Blog posts consolidated into resources hub',
  },
  {
    source: '/news/',
    destination: '/resources/',
    permanent: true,
    reason: 'News hub -> resources',
  },
  {
    source: '/articles/:slug',
    destination: '/resources/:slug/',
    permanent: true,
    reason: 'Articles -> resources posts',
  },
  {
    source: '/guides/:slug',
    destination: '/resources/:slug/',
    permanent: true,
    reason: 'Guides -> resources posts',
  },

  // --- Contact + FAQ ---
  {
    source: '/contact-us/',
    destination: '/contact/',
    permanent: true,
    reason: 'Contact slug normalization',
  },
  {
    source: '/get-in-touch/',
    destination: '/contact/',
    permanent: true,
    reason: 'Alternate contact slug',
  },
  {
    source: '/faqs/',
    destination: '/faq/',
    permanent: true,
    reason: 'FAQ slug normalization (plural -> singular)',
  },

  // --- Legacy CMS extensions (PHP / old static) ---
  {
    source: '/index.html',
    destination: '/',
    permanent: true,
    reason: 'Legacy static index page',
  },
  {
    source: '/index.php',
    destination: '/',
    permanent: true,
    reason: 'Legacy PHP index',
  },
  {
    source: '/faq.html',
    destination: '/faq/',
    permanent: true,
    reason: 'Legacy static FAQ page',
  },
  {
    source: '/about.html',
    destination: '/about/',
    permanent: true,
    reason: 'Legacy static about page',
  },
  {
    source: '/contact.html',
    destination: '/contact/',
    permanent: true,
    reason: 'Legacy static contact page',
  },
  {
    source: '/services.html',
    destination: '/services/',
    permanent: true,
    reason: 'Legacy static services page',
  },

  // --- Reviews / testimonials ---
  {
    source: '/testimonials/',
    destination: '/reviews/',
    permanent: true,
    reason: 'Testimonials merged into reviews hub',
  },
  {
    source: '/client-reviews/',
    destination: '/reviews/',
    permanent: true,
    reason: 'Alternate reviews slug',
  },

  // --- Locations / cities ---
  {
    source: '/locations/:city',
    destination: '/ca/ontario/:city/',
    permanent: true,
    reason: 'Legacy flat locations -> structured ca/province/city (Ontario default)',
  },
  {
    source: '/cities/:city',
    destination: '/ca/ontario/:city/',
    permanent: true,
    reason: 'Legacy flat cities -> structured route (Ontario default; refine per actual legacy URL audit)',
  },
  {
    source: '/areas-we-serve/',
    destination: '/locations/',
    permanent: true,
    reason: 'Service-area hub slug normalization',
  },
  {
    source: '/service-areas/',
    destination: '/locations/',
    permanent: true,
    reason: 'Service-area hub slug normalization',
  },

  // --- Franchising / partnerships ---
  {
    source: '/franchise/',
    destination: '/franchising/',
    permanent: true,
    reason: 'Franchise slug normalization',
  },
  {
    source: '/partnerships/',
    destination: '/franchising/',
    permanent: true,
    reason: 'Partnerships folded into franchising hub',
  },

  // Case normalization is handled by middleware.ts (it 308s any uppercase
  // path to lowercase). Next.js redirect config uses path-to-regexp which
  // matches case-insensitively by default, so adding /CONTACT/ -> /contact/
  // here creates a self-redirect loop on /contact/ itself.

  // --- Privacy / legal ---
  {
    source: '/privacy-policy/',
    destination: '/privacy/',
    permanent: true,
    reason: 'Privacy slug normalization',
  },
  {
    source: '/terms-of-service/',
    destination: '/terms/',
    permanent: true,
    reason: 'Terms slug normalization',
  },
  {
    source: '/terms-and-conditions/',
    destination: '/terms/',
    permanent: true,
    reason: 'Terms slug normalization',
  },
]

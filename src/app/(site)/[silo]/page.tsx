import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

import { JsonLd } from '@/components/json-ld'
import {
  SiloPageTemplate,
  type SiloSection,
} from '@/components/blocks/silo-page-template'
import { SiloLightTemplate } from '@/components/blocks/silo-light-template'
import { BRAND } from '@/lib/brand-constants'
import {
  FLAT_PAGES,
  SILO_PAGES,
  type SiloPage,
} from '@/lib/silo'
import { US_STATES, CANADA_PROVINCES } from '@/data/geo-market-data'

type Params = { params: Promise<{ silo: string }> }

export const dynamic = 'force-static'
export const dynamicParams = false

export async function generateStaticParams() {
  return FLAT_PAGES.map((p) => ({ silo: p.url.replace(/^\//, '') }))
}

function findFlatPage(slug: string): SiloPage | undefined {
  return FLAT_PAGES.find((p) => p.url === `/${slug}`)
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const { silo } = await params
  const page = findFlatPage(silo)
  if (!page) return { title: 'Page not found | MoveSmart Rentals' }

  // Keyword-tuned title + description (front-load the city+service keyword,
  // lead the description with the differentiators).
  const svc = page.service_label || 'Rental Leasing'
  // Brand is appended by the layout title template ("%s | MoveSmart Rentals").
  const title =
    page.type === 'service_in_city'
      ? `${svc} in ${page.city}, ${page.state_abbr}`
      : `${page.city} ${svc}, ${page.state_abbr}`
  const description =
    page.type === 'service_in_city'
      ? `${svc} in ${page.city}, ${page.state_abbr}: 18-day average to lease, success-fee pricing with no upfront cost, full tenant screening, and a 6-month replacement guarantee. ${page.meta_description ?? ''}`.slice(
          0,
          158,
        )
      : page.meta_description
  const ogKey =
    (page as { parent_city_key?: string }).parent_city_key || page.city_key
  const ogSrc = cityHeroSrc(ogKey)
  const ogImage = isAbsoluteUrl(ogSrc) ? ogSrc : `${BRAND.url}${ogSrc}`
  const ogAlt = `${page.title} — ${BRAND.name}`
  return {
    title,
    description,
    alternates: { canonical: `${BRAND.url}${page.url}/` },
    openGraph: {
      title: page.title,
      description: description ?? page.meta_description,
      url: `${BRAND.url}${page.url}/`,
      siteName: BRAND.name,
      type: 'website',
      images: [{ url: ogImage, width: 1600, height: 900, alt: ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: description ?? page.meta_description,
      images: [ogImage],
    },
  }
}

function buildGraph(
  page: SiloPage,
  crumbs: Array<{ label: string; href: string }>,
): Record<string, unknown>[] {
  const graph: Record<string, unknown>[] = []

  // BreadcrumbList mirrors the visible breadcrumb (Home > City hub > current)
  graph.push({
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: `${BRAND.url}${c.href}`,
    })),
  })

  if (page.type === 'city_hub') {
    graph.push({
      '@type': 'LocalBusiness',
      '@id': `${BRAND.url}${page.url}/#localbusiness`,
      name: `${BRAND.name} ${page.city}, ${page.state_abbr}`,
      url: `${BRAND.url}${page.url}/`,
      telephone: BRAND.phone,
      areaServed: {
        '@type': 'City',
        name: page.city,
        containedInPlace: { '@type': 'State', name: page.state },
      },
      ...(typeof page.lat === 'number' && typeof page.lng === 'number'
        ? {
            geo: {
              '@type': 'GeoCoordinates',
              latitude: page.lat,
              longitude: page.lng,
            },
          }
        : {}),
    })
  } else if (page.type === 'service_in_city') {
    graph.push({
      '@type': 'Service',
      '@id': `${BRAND.url}${page.url}/#service`,
      name: `${page.service_label} in ${page.city}, ${page.state_abbr}`,
      provider: {
        '@type': 'LocalBusiness',
        name: BRAND.name,
        url: BRAND.url,
      },
      areaServed: { '@type': 'City', name: page.city },
      description: page.service_blurb || page.meta_description,
    })
  }

  if (page.faq && page.faq.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: page.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    })
  }

  const howto = (
    page as { howto_steps?: { name: string; text: string }[] }
  ).howto_steps
  if (howto && howto.length > 0) {
    graph.push({
      '@type': 'HowTo',
      name: `How MoveSmart Rentals leases a ${page.city} rental`,
      step: howto.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.name,
        text: s.text,
      })),
    })
  }

  return graph
}

// Hosted per-city hero photos resolved from geo-market-data: a real,
// city-specific skyline for major cities, the state/province photo for the
// long tail, and a clean default otherwise. Avoids shipping hundreds of
// local image files and guarantees every city renders a relevant photo.
const CITY_HERO_IMG: Record<string, string> = {}
const STATE_HERO_IMG: Record<string, string> = {}
for (const s of [...US_STATES, ...CANADA_PROVINCES]) {
  const abbr = s.abbreviation.toLowerCase()
  STATE_HERO_IMG[abbr] = s.heroImageUrl
  for (const c of s.topCities) {
    if (c.imageUrl) CITY_HERO_IMG[`${c.slug}-${abbr}`] = c.imageUrl
  }
}
const DEFAULT_HERO_IMG =
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1600&q=80'

function cityHeroSrc(cityKey: string): string {
  if (CITY_HERO_IMG[cityKey]) return CITY_HERO_IMG[cityKey]
  const abbr = cityKey.split('-').pop() || ''
  return STATE_HERO_IMG[abbr] || DEFAULT_HERO_IMG
}

/** True for absolute http(s) URLs (hosted images), false for local paths. */
function isAbsoluteUrl(u: string): boolean {
  return /^https?:\/\//i.test(u)
}

export default async function SiloFlatPage({ params }: Params) {
  const { silo } = await params
  const page = findFlatPage(silo)
  if (!page) notFound()

  // Neighbourhood pages (e.g. /downtown-toronto-on-leasing) carry a
  // parent_city_key so they roll UP to the parent city's hub + services
  // without polluting the parent city's own sibling/nearby lists.
  const parentKey = (page as { parent_city_key?: string }).parent_city_key
  const hubKey = parentKey || page.city_key
  const cityPages = SILO_PAGES.filter((p) => p.city_key === hubKey)
  const siblingServices = cityPages.filter(
    (p) => p.type === 'service_in_city' && p.url !== page.url,
  )
  const cityHub = cityPages.find((p) => p.type === 'city_hub')

  // Clickable neighbourhood pages for THIS city (only on the parent city page).
  const neighborhoodLinks = SILO_PAGES.filter(
    (p) =>
      (p as { parent_city_key?: string }).parent_city_key === page.city_key &&
      p.service_slug === page.service_slug,
  ).map((p) => ({
    name: (p as { neighborhood_name?: string }).neighborhood_name || p.city,
    href: `${p.url}/`,
  }))

  // Breadcrumbs
  const crumbs = [
    { label: 'Home', href: '/' },
    cityHub && cityHub.url !== page.url
      ? { label: cityHub.city, href: `${cityHub.url}/` }
      : null,
    {
      label:
        page.type === 'service_in_city' && page.service_label
          ? page.service_label
          : page.title,
      href: `${page.url}/`,
    },
  ].filter(Boolean) as Array<{ label: string; href: string }>

  // Hero copy — short, punchy. Long intro moves into the market-context section.
  const heroKicker =
    page.type === 'service_in_city' && page.service_label
      ? `${page.service_label} · ${page.city}, ${page.state_abbr}`
      : `Rental leasing · ${page.city}, ${page.state_abbr}`
  const heroEyebrow = `${page.city}, ${page.state_abbr}`
  const svcWord = (page.service_label || 'Leasing').toLowerCase()
  const heroHeadline =
    page.type === 'service_in_city' && page.service_label
      ? `${page.service_label} in ${page.city}`
      : `Rental leasing in ${page.city}`
  const heroSubhead = `Full-service ${svcWord} for ${page.city} landlords. We list, market, show, screen, and sign your unit, syndicated to the MLS and 20 portals, with an 18-day average from listing to lease.`
  const heroLede = page.intro || page.meta_description || heroSubhead

  // Hero feature chips (the value props)
  const chips = [
    { icon: 'radio-tower', title: 'MLS + 20 portals', sub: 'Broad listing exposure' },
    { icon: 'user-check', title: '18-day avg placement', sub: 'Listing to signed lease' },
    { icon: 'shield-check', title: 'Compliant screening', sub: 'Documented audit trail' },
  ]

  // Rent-by-bedroom (only where real data is present on the page)
  const rentByBed = (
    page as { rent_by_bed?: { label: string; value: string; yoy?: string }[] }
  ).rent_by_bed
  const rentSource = rentByBed
    ? 'Source: TRREB Q1 2026 Rental Market Report (condo apartments).'
    : undefined

  // Honest trust chips (no fabricated reviews/years — Toronto branch just opening)
  const trustChips = [
    'No tenant, no fee',
    '18-day average to lease',
    '6-month replacement guarantee',
    'Compliant with the RTA 2006',
  ]

  // Local leasing-law / compliance section (Ontario; generic fallback elsewhere)
  const isOntario = page.state_abbr === 'ON'
  const localRules = isOntario
    ? {
        intro:
          'Every MoveSmart placement is run to Ontario law, so the lease you sign holds up and your decisions are defensible.',
        items: [
          { term: 'Residential Tenancies Act, 2006', detail: 'The **RTA 2006** governs most private residential tenancies in Ontario, administered by the Landlord and Tenant Board.' },
          { term: 'Ontario Standard Lease', detail: 'The government **Standard Lease (Form 2229E)** is mandatory for most tenancies signed since April 30, 2018. We prepare it on every placement.' },
          { term: 'Human Rights Code screening', detail: 'Screening follows the **OHRC**: no disqualifying protected grounds, no rigid 30 percent income rule, no automatic refusal for thin credit.' },
          { term: '2026 rent increase guideline', detail: 'The **2026 guideline is 2.1 percent**, with at least 90 days written notice and one increase every 12 months for rent-controlled units.' },
          { term: 'Non-payment and the LTB', detail: 'Unpaid rent runs through an **N4** notice (now a 7-day termination period under Bill 60) to the **Landlord and Tenant Board**.' },
          { term: 'New market rent on vacancy', detail: 'Between tenancies you may set a new market rent. We price each vacancy to the live comparable set.' },
        ],
      }
    : undefined

  // Pricing — matches the live pricing page: one-time success fee = one month
  // of contracted rent, $0 upfront, no monthly percentage ever, leasing-only.
  const pricing = {
    intro:
      'No upfront cost and no monthly percentage, ever. You pay a one-time success fee equivalent to one month of contracted rent, due only when a qualified tenant signs the lease.',
    cards: [
      {
        name: 'Leasing & tenant placement',
        price: 'One month rent',
        sub: 'One-time success fee, billed only when a tenant signs. $0 upfront.',
        feats: [
          'Professional photography and video',
          'MLS and 20 portal syndication',
          'Tenant screening and background checks',
          'Showings and applicant management',
          'Lease drafting, e-signing, and deposits',
          'Move-in coordination and key handover',
          '6-month Tenant Replacement Guarantee',
        ],
        cta: { label: 'List my property', href: '/owners/' },
        highlight: true,
      },
      {
        name: 'Optional add-ons',
        price: 'As needed',
        sub: 'Layer on extra coverage when it fits the property.',
        feats: [
          'Rent Protection, quoted by partner',
          'Paid advertising, pass-through at cost',
          'Institutional lease-up, custom RFP',
          'GST/HST excluded; confirmed in writing first',
        ],
        cta: { label: 'See full pricing', href: '/pricing/' },
      },
    ],
  }

  // Nearby cities we lease in (suburb internal linking — same service, same
  // province, different city). Strong silo signal to the suburb pages.
  const nearbyCities = SILO_PAGES.filter(
    (p) =>
      p.type === 'service_in_city' &&
      p.service_slug === page.service_slug &&
      p.state_abbr === page.state_abbr &&
      p.city_key !== page.city_key &&
      !(p as { parent_city_key?: string }).parent_city_key,
  )
    .slice(0, 12)
    .map((p) => ({ city: p.city, href: `${p.url}/` }))

  // Real map embed
  const mapLatLng: [number, number] | undefined =
    typeof page.lat === 'number' && typeof page.lng === 'number'
      ? [page.lat, page.lng]
      : undefined

  // Risk-reversal guarantee (matches the live pricing page)
  const guarantee = {
    title: 'The MoveSmart Tenant Replacement Guarantee',
    body: 'If a tenant we place leaves within the first six months, we re-market and re-place the unit at no additional success fee. You are not paying twice for one vacancy.',
    points: ['First 6 months covered', 'No additional fee', 'Same screening standard'],
  }


  // Pain points — per-service from the research brief when present (unique to
  // each service/city), otherwise a sensible leasing-wide fallback.
  const briefPain = (
    page as { pain_points?: { intro?: string; items: { title: string; body: string }[] } }
  ).pain_points
  const painPoints = briefPain && briefPain.items?.length
    ? briefPain
    : {
        intro: `Vacancy across ${page.city} has loosened and tenants have more choice, which means the cost of a slow or sloppy lease-up has gone up, not down.`,
        items: [
          { title: 'A month of empty rent', body: `Overprice by a little and the unit sits. On a two-bedroom in ${page.city} a single empty month is roughly the price of getting it wrong.` },
          { title: 'Thin exposure', body: 'Posting to one or two free sites reaches a fraction of active renters. The qualified applicants are shopping across the MLS and the major portals.' },
          { title: 'Screening you can’t defend', body: 'A credit check and a gut feel is how landlords end up at the Landlord and Tenant Board. Documentation is what protects you later.' },
          { title: 'Paperwork that exposes you', body: 'A generic lease that skips the Ontario Standard Lease or mishandles deposits can make a later dispute much harder to win.' },
        ],
      }

  // DIY vs MoveSmart comparison — factual, conversion-focused
  const comparison = {
    intro: `Same ${page.city} unit, same week it goes vacant. The difference is who runs the lease-up.`,
    rows: [
      { label: 'Time to lease', diy: 'Weeks of solo showings and chasing replies', us: '18-day average, showings 7 days a week' },
      { label: 'List price', diy: 'Guesswork; overpricing costs a full month', us: 'Priced to live comparables within 1 km' },
      { label: 'Exposure', diy: 'One or two free listing sites', us: 'MLS + 20 rental portals' },
      { label: 'Screening', diy: 'A credit check and a gut feel', us: 'Credit, income, employment, references, documented' },
      { label: 'The lease', diy: 'Generic template, compliance risk', us: 'Ontario Standard Lease, e-signed and filed' },
      { label: 'Your cost', diy: '$0 fee, but your time and vacancy risk', us: 'One month’s rent, only when a tenant signs' },
      { label: 'If it falls through', diy: 'Start over and pay to re-list', us: '6-month replacement, no second fee' },
    ],
  }

  // Free rent calculator (Canadian markets) + silo links into the property-type
  // category pages, the locations hub, and the live listings feed.
  const isCanada = page.country === 'Canada'
  const showCalculator = isCanada
  const provinceSlug = (page.state || '').toLowerCase().replace(/\s+/g, '-')
  const citySlug = (cityHub?.city || page.city).toLowerCase().replace(/\s+/g, '-')
  const exploreLinks = isCanada
    ? [
        { label: `Apartments for rent in ${cityHub?.city || page.city}`, href: `/ca/${provinceSlug}/${citySlug}/categories/apartments-for-rent/`, sub: 'Browse live apartment listings' },
        { label: `Condos for rent in ${cityHub?.city || page.city}`, href: `/ca/${provinceSlug}/${citySlug}/categories/condos-for-rent/`, sub: 'Browse live condo listings' },
        { label: `Houses for rent in ${cityHub?.city || page.city}`, href: `/ca/${provinceSlug}/${citySlug}/categories/houses-for-rent/`, sub: 'Browse live house listings' },
        { label: `Townhouses for rent in ${cityHub?.city || page.city}`, href: `/ca/${provinceSlug}/${citySlug}/categories/townhouses-for-rent/`, sub: 'Browse live townhouse listings' },
        { label: `${cityHub?.city || page.city} market overview`, href: `/ca/${provinceSlug}/${citySlug}/`, sub: 'Rents, neighbourhoods, and every service' },
        { label: 'All available rentals', href: '/properties/', sub: 'Every active MoveSmart listing' },
      ]
    : undefined

  // Hero image — real, branded per-city photo with a geo-keyword alt
  const heroImage = {
    src: cityHeroSrc(hubKey),
    alt:
      page.type === 'service_in_city' && page.service_label
        ? `${page.service_label} for ${page.city}, ${page.state_abbr} rental properties — MoveSmart Rentals`
        : `Residential rental properties in ${page.city}, ${page.state_abbr} managed by MoveSmart Rentals`,
    caption: `Active ${heroKicker.toLowerCase()} coverage across ${page.city}, ${page.state_abbr} and the surrounding ${page.state} market.`,
  }

  // Market data strip — REAL data points only (never the city name as a "stat").
  // Prefer the bundle's local stats; otherwise derive from the rent-by-bed
  // table; if neither exists, omit the band rather than show filler.
  const pageStats = (
    page as { stats?: { label: string; value: string; sub?: string }[] }
  ).stats
  const oneBed = rentByBed?.find((r) => /^1 bed/i.test(r.label))
  const twoBed = rentByBed?.find((r) => /^2 bed/i.test(r.label))
  const derivedStats: { label: string; value: string; sub?: string }[] = []
  if (oneBed) derivedStats.push({ label: 'Avg. 1-bed rent', value: oneBed.value, sub: oneBed.yoy ? `${oneBed.yoy} YoY` : undefined })
  if (twoBed) derivedStats.push({ label: 'Avg. 2-bed rent', value: twoBed.value, sub: twoBed.yoy ? `${twoBed.yoy} YoY` : undefined })
  if (isOntario) derivedStats.push({ label: 'Apartment vacancy', value: '3.0%', sub: 'Highest since 2021' })
  derivedStats.push({ label: 'Avg. time to lease', value: '18 days', sub: 'Listing to signed' })
  const marketData =
    pageStats && pageStats.length > 0 ? pageStats : derivedStats.length >= 3 ? derivedStats : undefined

  // Body sections — prefer rich, multi-section authored copy when present;
  // otherwise fall back to the two legacy template fields.
  const sections: SiloSection[] = []
  const richSections = (
    page as { content_sections?: { title: string; body: string }[] }
  ).content_sections
  if (richSections && richSections.length > 0) {
    for (const s of richSections) sections.push({ title: s.title, body: s.body })
  } else {
    if (page.local_context) {
      sections.push({
        title: `Local market context in ${page.city}`,
        body: page.local_context,
      })
    }
    if (page.service_details) {
      sections.push({
        title: 'What this looks like on the ground',
        body: page.service_details,
      })
    }
  }
  // Service cross-links -> the full services menu (in-city silo pages where
  // they exist, national /services pages for the rest).
  const serviceCards = [
    ...siblingServices.map((s) => ({
      title: s.service_label || s.title,
      description: s.service_blurb || '',
      href: `${s.url}/`,
    })),
    {
      title: 'Rent Guarantee',
      description: 'Optional rental protection against unpaid rent, eviction costs, and tenant risk.',
      href: '/services/rent-guarantee/',
    },
    {
      title: 'Tenant Insurance',
      description: 'Tenant insurance coordination built into the move-in process.',
      href: '/services/tenant-insurance/',
    },
  ]

  // Bento services — same cross-links, but as a photographic mosaic. Map each
  // service to a real branded photo (service-specific where we have one, else
  // a rotating set of design-system property photos).
  // Custom branded imagery (generated via Imagen) keyed to each service.
  const BENTO_FALLBACKS = [
    '/msr/svc-marketing.webp',
    '/msr/svc-moveins.webp',
    '/msr/split-interior.webp',
    '/msr/hero-condo.webp',
    '/msr/svc-leasing.webp',
  ]
  function bentoImage(href: string, title: string, i: number): string {
    const h = (href + ' ' + title).toLowerCase()
    if (h.includes('placement')) return '/msr/svc-leasing.webp'
    if (h.includes('screening')) return '/msr/svc-screening.webp'
    if (h.includes('pricing')) return '/msr/svc-pricing.webp'
    if (h.includes('insurance') || h.includes('guarantee')) return '/msr/svc-moveins.webp'
    if (h.includes('marketing') || h.includes('listing')) return '/msr/svc-marketing.webp'
    if (h.includes('move')) return '/msr/svc-moveins.webp'
    if (h.includes('leasing') || h.includes('lease')) return '/msr/svc-leasing.webp'
    return BENTO_FALLBACKS[i % BENTO_FALLBACKS.length]
  }
  const bentoServices = serviceCards.map((s, i) => ({
    ...s,
    image: bentoImage(s.href, s.title, i),
  }))

  // Pull-quote — a large serif breathing moment (the brand promise)
  const pullQuote = {
    quote: `We don't get paid until your ${page.city} unit is leased. That single line rewrites how a leasing file gets run.`,
    attribution: 'The MoveSmart success-fee promise',
  }

  // Process steps -> icon-card grid (prefer authored howto_steps)
  const howto = (page as { howto_steps?: { name: string; text: string }[] })
    .howto_steps
  const process = (howto && howto.length > 0 ? howto : [])
    .map((s, i) => ({ step: i + 1, title: s.name, body: s.text }))

  // Photo+text splits use the custom branded interiors (Imagen).
  const splitImage = {
    src: '/msr/split-interior.webp',
    alt: `A ${page.city} rental staged and ready for showings — MoveSmart Rentals`,
  }
  const splitImage2 = {
    src: '/msr/svc-screening.webp',
    alt: `Documented tenant screening for ${page.city}, ${page.state_abbr} rentals — MoveSmart Rentals`,
  }

  // Authority citations (kept out of the visible body; still in schema)
  const citations = (page.authority_citations || []).concat(
    page.authority_citation ? [page.authority_citation] : [],
  )
  if (false && citations.length > 0) {
    sections.push({
      title: 'Local authority sources',
      body: 'Cited references for this market.',
      items: citations
        .filter((c) => c && c.url)
        .slice(0, 6)
        .map((c) => ({
          title: c.name,
          body: c.context,
          tag: 'External source',
          href: c.url,
          external: true,
        })),
    })
  }

  // FAQ
  const faq = (page.faq || []).map((f) => ({ question: f.q, answer: f.a }))

  // Closing CTA copy
  const closing =
    page.type === 'service_in_city'
      ? `Ready to start ${(page.service_label || 'leasing').toLowerCase()} in ${page.city}?`
      : `Ready to lease faster in ${page.city}?`

  // Light editorial variant (preview A/B via NEXT_PUBLIC_SILO_LIGHT=1).
  // Same content, AJ's airy white styling. Renders sibling services as
  // internal links so the city <-> service silo actually connects.
  if (process.env.NEXT_PUBLIC_SILO_LIGHT !== '0') {
    const lightRelated = siblingServices.slice(0, 6).map((s) => ({
      title: s.service_label || s.title,
      href: `${s.url}/`,
      description: s.service_blurb,
    }))
    const lightSections = (
      page as { content_sections?: { title: string; body: string }[] }
    ).content_sections
    return (
      <>
        <JsonLd data={buildGraph(page, crumbs)} />
        <SiloLightTemplate
          breadcrumbs={crumbs}
          heroKicker={heroKicker}
          heroEyebrow={heroEyebrow}
          heroHeadline={heroHeadline}
          heroLede={heroLede}
          heroImage={heroImage}
          city={page.city}
          serviceWord={svcWord ?? page.service_label ?? 'Leasing'}
          intro={page.intro}
          keyTakeaways={page.key_takeaways}
          sections={lightSections}
          painPoints={painPoints}
          neighborhoods={page.neighborhoods}
          faq={faq}
          related={lightRelated.length > 0 ? lightRelated : undefined}
          closing={closing}
          primaryCta={{ label: 'List my property', href: '/owners/' }}
          secondaryCta={{
            label: `Call ${BRAND.phoneDisplay}`,
            href: `tel:${BRAND.phone}`,
          }}
        />
      </>
    )
  }

  return (
    <>
      <JsonLd data={buildGraph(page, crumbs)} />
      <SiloPageTemplate
        breadcrumbs={crumbs}
        heroKicker={heroKicker}
        heroEyebrow={heroEyebrow}
        heroHeadline={heroHeadline}
        heroLede={heroLede}
        heroImage={heroImage}
        heroSubhead={heroSubhead}
        serviceWord={svcWord}
        chips={chips}
        trustChips={trustChips}
        rentByBed={rentByBed}
        rentSource={rentSource}
        localRules={localRules}
        pricing={pricing}
        mapLatLng={mapLatLng}
        nearbyCities={nearbyCities}
        guarantee={guarantee}
        showForm
        marketData={marketData}
        sections={sections}
        process={process}
        splitImage={splitImage}
        splitImage2={splitImage2}
        neighborhoods={page.neighborhoods}
        neighborhoodLinks={
          neighborhoodLinks.length > 0 ? neighborhoodLinks : undefined
        }
        painPoints={painPoints}
        comparison={comparison}
        showCalculator={showCalculator}
        exploreLinks={exploreLinks}
        bentoServices={bentoServices}
        pullQuote={pullQuote}
        faq={faq}
        closing={closing}
        primaryCta={{ label: 'List my property', href: '/owners/' }}
        secondaryCta={{
          label: `Call ${BRAND.phoneDisplay}`,
          href: `tel:${BRAND.phone}`,
        }}
      />
    </>
  )
}

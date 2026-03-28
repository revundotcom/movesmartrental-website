import type { Metadata } from 'next'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { BenefitsBlock } from '@/components/blocks/benefits-block'
import { TrustBlock } from '@/components/blocks/trust-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { JsonLd } from '@/components/json-ld'
import { buildOrganizationSchema } from '@/lib/schema-builders'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

export const metadata: Metadata = {
  title: 'About MoveSmart Rentals',
  description:
    'MoveSmart Rentals provides professional property management across Ontario with zero upfront cost, modern technology, and local expertise.',
}

const organizationSchema = buildOrganizationSchema({
  name: 'MoveSmart Rentals',
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    'Professional property management across Ontario with zero upfront cost, modern technology, and local expertise.',
  contactEmail: 'info@movesmartrentals.com',
})

const DIFFERENTIATORS = [
  {
    title: 'Technology-Driven',
    description:
      'Our proprietary platform streamlines every step from listing to lease signing, giving owners real-time visibility and tenants a seamless experience.',
    icon: 'monitor',
  },
  {
    title: 'Local Expertise',
    description:
      'Our teams live and work in the communities they serve. We know the neighbourhoods, the market rents, and the regulations that matter.',
    icon: 'home',
  },
  {
    title: 'Zero Upfront Cost',
    description:
      'We only earn when you do. Our success-based pricing means no listing fees, no advertising charges, and no hidden costs.',
    icon: 'dollar-sign',
  },
  {
    title: 'Dedicated Account Managers',
    description:
      'Every property owner gets a dedicated point of contact who manages their portfolio and is available when it matters most.',
    icon: 'users',
  },
]

const COMPANY_STATS = [
  { label: 'Properties Managed', value: '500+' },
  { label: 'Cities Served', value: '25+' },
  { label: 'Tenant Satisfaction', value: '96%' },
  { label: 'Avg. Placement Time', value: '14 Days' },
]

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={organizationSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about/' },
          ]}
        />
      </div>

      <HeroBlock
        headline="About MoveSmart Rentals"
        subheadline="Professional property management built on technology, transparency, and trust."
      />

      {/* ── Company Story ── */}
      <section className="relative overflow-hidden bg-white py-28">
        {/* Dot-grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        {/* Emerald glow */}
        <div className="absolute -right-40 top-20 size-[400px] rounded-full bg-brand-emerald/6 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left: story */}
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-emerald">Our Story</p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Built to Solve the<br /><span className="font-display italic text-brand-emerald">Right Problem</span>
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-slate-600">
                <p>MoveSmart Rentals was founded on a simple idea: property management should be accessible, transparent, and results-driven. Too many property owners face opaque pricing, slow tenant placement, and outdated processes.</p>
                <p>By combining modern technology with local market knowledge, MoveSmart Rentals delivers a property management experience that works for owners and tenants alike. Our success-based model means we only earn when we deliver results.</p>
                <p>Today, MoveSmart Rentals serves property owners across Ontario and is expanding into new markets. Every city gets the same commitment: professional service, fair pricing, and a team that treats your property as their own.</p>
              </div>
            </div>

            {/* Right: stat bento grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '500+', label: 'Properties\nManaged', color: 'bg-brand-navy text-white' },
                { value: '25+', label: 'Ontario\nCities', color: 'bg-brand-emerald/10 text-brand-navy' },
                { value: '98%', label: 'Occupancy\nRate', color: 'bg-brand-emerald/10 text-brand-navy' },
                { value: '14 Days', label: 'Average Fill\nTime', color: 'bg-brand-navy text-white' },
              ].map((stat) => (
                <div key={stat.label} className={`flex flex-col items-center justify-center rounded-3xl p-8 text-center ${stat.color}`}>
                  <p className={`text-4xl font-black ${stat.color.includes('text-white') ? 'text-brand-emerald' : 'text-brand-navy'}`}>{stat.value}</p>
                  <p className={`mt-1 text-xs font-semibold uppercase tracking-wider whitespace-pre-line ${stat.color.includes('text-white') ? 'text-white/60' : 'text-slate-500'}`}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <BenefitsBlock
        benefits={DIFFERENTIATORS}
        title="What Sets MoveSmart Rentals Apart"
        columns={2}
      />

      <TrustBlock stats={COMPANY_STATS} variant="stats" />

      <CTABannerBlock
        headline="Join the MoveSmart Network"
        description="List your property with zero upfront cost and experience modern property management."
        primaryCta={{ label: 'Contact Us', href: '/contact/' }}
      />
    </main>
  )
}

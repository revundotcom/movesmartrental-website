import type { Metadata } from 'next'
import Link from 'next/link'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { JsonLd } from '@/components/json-ld'
import { buildOrganizationSchema, buildLocalBusinessSchema } from '@/lib/schema-builders'

import {
  FounderEssay,
  Values,
  Team,
} from './about-interactive'

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'

export const metadata: Metadata = {
  title: 'About Us | Full-Service Rental and Leasing Company Across Canada and the US',
  description:
    'MoveSmart Rentals is a full-service leasing and tenant placement company delivering full-cycle rental execution, strategic pricing, disciplined tenant qualification, and complete move-in coordination for landlords, property managers, builders, and institutional operators.',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: 'About MoveSmart Rentals | Leasing Platform Across Canada & the US',
    description:
      'Full-service leasing execution for serious rental operators. Strategic pricing, disciplined tenant qualification, rental protection options, and complete move-in coordination.',
    images: ['/og-share.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About MoveSmart Rentals | Leasing Platform Across Canada & the US',
    description:
      'Full-service leasing execution for serious rental operators. Strategic pricing, disciplined tenant qualification, rental protection options, and complete move-in coordination.',
  },
}

const organizationSchema = buildOrganizationSchema({
  name: 'MoveSmart Rentals',
  url: SITE_URL,
  logo: `${SITE_URL}/og-share.png`,
  description:
    'Full-service rental and leasing company delivering full-cycle leasing execution, strategic pricing, disciplined tenant qualification, and move-in coordination for landlords, PMCs, builders, and institutional operators across Canada and the United States.',
  contactEmail: 'contact@movesmartrentals.com',
  socialLinks: [
    'https://www.linkedin.com/company/movesmart-rentals/',
    'https://www.instagram.com/movesmartrentals',
    'https://www.facebook.com/movesmartrentals',
    'https://www.tiktok.com/@movesmartrentals',
    'https://x.com/Movesmartrental',
  ],
  foundingDate: '2024',
})

const localBusinessSchema = buildLocalBusinessSchema({
  name: 'MoveSmart Rentals',
  description:
    'Full-service leasing and tenant placement for Canadian landlords, property managers, builders, and institutional rental operators. Strategic pricing, tenant qualification, rental protection, and full move-in coordination.',
  url: SITE_URL,
  phone: '+18005959755',
  address: {
    streetAddress: '1 King St W, Suite 4801',
    city: 'Toronto',
    province: 'ON',
    postalCode: 'M5H 1A1',
    country: 'CA',
  },
  areaServed: 'Ontario, Canada',
  openingHours: ['Mo-Fr 09:00-18:00'],
})

// Founder quote aside for hero (not a dashboard mock)
function FounderQuoteCard() {
  return (
    <div className="relative overflow-hidden rounded-sm border border-brand-navy/10 bg-white p-8 shadow-[0_1px_2px_rgba(17,24,39,0.04),0_20px_40px_-20px_rgba(17,24,39,0.15)]">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/60 to-transparent"
      />
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy/50">
        From the founder
      </p>
      <p className="mt-6 font-display text-2xl font-normal italic leading-[1.35] text-brand-navy sm:text-[1.6rem]">
        &ldquo;Brokers sell. Managers operate. We built MoveSmart to obsess
        over the leasing phase itself.&rdquo;
      </p>
      <div className="mt-8 flex items-center gap-3 border-t border-brand-navy/10 pt-5">
        <span
          aria-hidden="true"
          className="flex size-11 items-center justify-center rounded-full bg-brand-gold/90 font-display text-sm text-white"
        >
          MS
        </span>
        <div>
          <p className="font-display text-base font-normal text-brand-navy">
            MoveSmart Rentals
          </p>
          <p className="text-xs text-slate-500">
            Why we built it
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AboutPage() {
  return (
    <main>
      <JsonLd data={organizationSchema} />
      <JsonLd data={localBusinessSchema} />

      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'About', href: '/about/' },
          ]}
        />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <PageHeroBlock
        kicker="About"
        eyebrow="Leasing platform"
        headline="Full-service leasing execution for serious operators"
        accentLastWord
        lede="MoveSmart Rentals is a full-service leasing and tenant placement company built for landlords, property managers, builders, and institutional operators who refuse to leave the leasing phase to chance. Strategic pricing, disciplined tenant qualification, and complete move-in coordination. Every owner-file run by a named lead."
        cta1={{ label: 'Meet the team', href: '#team' }}
        cta2={{ label: 'Contact us', href: '/contact/' }}
        aside={<FounderQuoteCard />}
        theme="dark"
        backgroundImageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80"
        backgroundImageAlt="MoveSmart leasing team collaborating in office"
      />

      {/* ── OUR STORY ────────────────────────────────────────────── */}
      <FounderEssay />

      {/* ── VALUES ───────────────────────────────────────────────── */}
      <Values />

      {/* ── TEAM (full directory, embedded here per client spec) ── */}
      <Team />

      {/* ── FINAL CTA ────────────────────────────────────────────── */}
      <section
        id="contact-cta"
        className="relative bg-brand-navy py-16 sm:py-20"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none mx-auto h-px max-w-7xl bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
            Work with us
          </p>
          <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Get the right person on your file.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
            Tell us about your property and we&apos;ll route you to the
            leasing lead with the right market and asset-class fit, usually
            within one business day.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact/"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-md"
            >
              Contact our leasing desk
            </Link>
            <a
              href="tel:+18005959755"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all hover:border-white/50 hover:bg-white/5"
            >
              +1 (800) 595-9755
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { JsonLd } from '@/components/json-ld'
import { buildOrganizationSchema, buildLocalBusinessSchema } from '@/lib/schema-builders'

import {
  FounderEssay,
  Timeline,
  Values,
  Team,
  ByTheNumbers,
  Press,
  LongTestimonials,
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
    title: 'About MoveSmart Rentals | Canadian Leasing Brokerage',
    description:
      'Full-service leasing execution for serious rental operators. Strategic pricing, disciplined tenant qualification, rental protection options, and complete move-in coordination.',
    images: ['/og-default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About MoveSmart Rentals | Canadian Leasing Brokerage',
    description:
      'Full-service leasing execution for serious rental operators. Strategic pricing, disciplined tenant qualification, rental protection options, and complete move-in coordination.',
  },
}

const organizationSchema = buildOrganizationSchema({
  name: 'MoveSmart Rentals',
  url: SITE_URL,
  logo: `${SITE_URL}/og-default.png`,
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
          JC
        </span>
        <div>
          <p className="font-display text-base font-normal text-brand-navy">
            Jatin Chhabra
          </p>
          <p className="text-xs text-slate-500">
            Founder &amp; Principal Broker
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

      <PageHeroBlock
        kicker="About"
        eyebrow="Leasing brokerage"
        headline="Full-service leasing execution for serious operators"
        accentLastWord
        lede="MoveSmart Rentals is a full-service leasing and tenant placement company built for landlords, property managers, builders, and institutional operators who refuse to leave the leasing phase to chance. We execute the full cycle - strategic pricing, disciplined tenant qualification, rental protection options, and complete move-in coordination - so vacancy stays short and approvals stay clean."
        cta1={{ label: 'Meet the team', href: '#team' }}
        cta2={{ label: 'Contact us', href: '/contact/' }}
        aside={<FounderQuoteCard />}
        theme="dark"
        backgroundImageUrl="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=2400&q=80"
        backgroundImageAlt="MoveSmart leasing team collaborating in office"
      />

      <FounderEssay />

      {/* Editorial banner: Toronto - our anchor market */}
      <section className="bg-white pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/6] overflow-hidden rounded-3xl shadow-2xl shadow-brand-navy/15">
            <Image
              src="https://images.unsplash.com/photo-1517090504586-fde19ea6066f?w=2400&q=80&auto=format&fit=crop"
              alt="Toronto downtown skyline - MoveSmart Rentals' anchor leasing market"
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 1200px"
              unoptimized
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-brand-navy/65 via-brand-navy/15 to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 px-8 pb-8 sm:px-12 sm:pb-10">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-gold">
                Headquartered in Toronto
              </p>
              <p className="mt-2 font-display text-2xl font-normal italic leading-snug text-white sm:text-3xl md:text-4xl">
                Twenty-plus Canadian cities. A leasing playbook expanding across Canada and the US.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Timeline />

      <Values />

      {/* Editorial image: the leasing team at work */}
      <section className="bg-white pt-12 sm:pt-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl shadow-xl shadow-brand-navy/15">
              <Image
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1600&q=80&auto=format&fit=crop"
                alt="MoveSmart leasing team in a planning meeting reviewing applicant pipelines"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                unoptimized
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-navy/60">
                Chapter 04 - Preview
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                A small, RECO-licensed{' '}
                <span className="font-display italic text-brand-emerald">leasing team.</span>
              </h2>
              <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
                Twenty-plus years of combined rental brokerage experience, organised into named owner-files with a single leasing lead per engagement. No call-centre handoffs, no ticket-queue voids - the person who picks up the file is the person you talk to until move-in.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Team />

      <ByTheNumbers />

      <Press />

      <LongTestimonials />
    </main>
  )
}

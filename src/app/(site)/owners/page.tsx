import type { Metadata } from 'next'
import Link from 'next/link'
import {
  CheckCircle,
  DollarSign,
  Monitor,
  Users,
  Megaphone,
  Shield,
  Paintbrush,
  TrendingUp,
  Zap,
  type LucideIcon,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { HeroBlock } from '@/components/blocks/hero-block'
import { OwnersFeaturesBento } from '@/components/blocks/owners-features-bento'
import { PainPointBlock } from '@/components/blocks/pain-point-block'
import { ServiceGridBlock } from '@/components/blocks/service-grid-block'
import { sanityFetch } from '@/sanity/fetch'
import { SERVICE_OWNER_QUERY } from '@/sanity/queries/service'
import type { ServiceCardData } from '@/types/blocks'

export const metadata: Metadata = {
  title: 'Property Owners',
  description:
    'Hands-off leasing with maximum results. Zero upfront cost, dedicated account manager, tenant screening, rent protection, and full leasing execution for Ontario landlords.',
  alternates: {
    canonical: '/owners/',
  },
  openGraph: {
    title: 'Property Owners',
    description:
      'Hands-off leasing with maximum results. Zero upfront cost, dedicated account manager, tenant screening, rent protection, and full leasing execution for Ontario landlords.',
  },
}

/* ---------- Contract-required messaging (9 points) ---------- */

const CONTRACT_MESSAGING: Array<{
  icon: LucideIcon
  title: string
  description: string
}> = [
  {
    icon: DollarSign,
    title: 'Nothing Upfront',
    description:
      'Our success-based model means you pay nothing until your property is rented. No setup fees, ever.',
  },
  {
    icon: Monitor,
    title: 'Self-Serve Online Portal',
    description:
      'Manage your properties, view financial reports, and communicate through your dedicated online portal.',
  },
  {
    icon: Users,
    title: 'Dedicated Account Manager',
    description:
      'A single point of contact who knows your properties inside and out and handles every detail.',
  },
  {
    icon: Megaphone,
    title: 'MLS Distribution',
    description:
      'Your listings appear on MLS, Realtor.ca, and 50+ rental sites for maximum exposure and faster fills.',
  },
  {
    icon: Shield,
    title: 'Structured Screening',
    description:
      'Credit checks, employment verification, references, and full rental history review for every applicant.',
  },
  {
    icon: CheckCircle,
    title: 'Rent Protection',
    description:
      'Our rent guarantee program protects your income from missed payments. Consistent cash flow, guaranteed.',
  },
  {
    icon: Paintbrush,
    title: 'Property Preparation',
    description:
      'Professional cleaning, staging, and photography before listing to attract quality tenants fast.',
  },
  {
    icon: TrendingUp,
    title: 'Real-Time Visibility',
    description:
      'Track applications, maintenance requests, and rent payments in real time from any device.',
  },
  {
    icon: Zap,
    title: 'Tech + Brick-and-Mortar',
    description:
      'Modern technology backed by local market expertise and real people you can meet in person.',
  },
]

export default async function OwnersPage() {
  const services = await sanityFetch<ServiceCardData[]>({
    query: SERVICE_OWNER_QUERY,
    tags: ['service'],
  })

  return (
    <main>
      {/* ── SECTION 1: Hero ── */}
      <HeroBlock
        headline="Hands-Off Leasing. Maximum Results."
        subheadline="White-glove leasing execution with zero upfront cost. We only succeed when your property is rented."
        cta1={{ label: 'Get Started', href: '/contact/' }}
        cta2={{ label: 'Submit a Property', href: '/contact/' }}
        priority
      />

      {/* ── SECTION 2: Pain Points ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              The Problem
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              The <span className="font-display italic text-brand-emerald">Landlord Pain</span> Points
            </h2>
          </div>
        </div>
        <PainPointBlock
          showHeading={false}
          painPoints={[
            {
              problem:
                'Vacant units sitting empty for weeks, costing you thousands in lost rental income every month.',
              solution:
                'Our MLS distribution and 50+ rental site syndication fills vacancies in an average of 14 days.',
            },
            {
              problem:
                'Difficult tenants who damage property, pay late, or cause disputes with neighbours.',
              solution:
                'Structured screening with credit checks, employment verification, references, and full rental history review for every applicant.',
            },
            {
              problem:
                'Spending evenings and weekends handling maintenance calls, tenant complaints, and property inspections.',
              solution:
                'Your dedicated account manager handles everything. Track it all from your online portal without lifting a finger.',
            },
            {
              problem:
                'Hidden fees and unclear pricing from property management companies that eat into your returns.',
              solution:
                'Nothing upfront. Our transparent, success-based model means you pay nothing until your property is rented.',
            },
          ]}
        />
      </section>

      {/* ── SECTION 3: 9 Contract-Required Messaging Points ── */}
      <OwnersFeaturesBento features={CONTRACT_MESSAGING} />

      {/* ── SECTION 4: Service Grid (from CMS) ── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-emerald">
              Services
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
              Our <span className="font-display italic text-brand-emerald">Owner Services</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Comprehensive property management services tailored for landlords
              and investors.
            </p>
          </div>
        </div>
        <ServiceGridBlock services={services} columns={3} showHeading={false} />
      </section>

      {/* ── SECTION 5: Trust / Stats (Navy Background) ── */}
      <section className="relative overflow-hidden bg-brand-navy py-28 text-white">
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage: 'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div className="absolute -right-40 -top-40 size-[500px] rounded-full bg-brand-emerald/8 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-brand-emerald/6 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-emerald">
              By The Numbers
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl">
              Trusted by Property Owners
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: '500+', label: 'Properties Managed' },
              { value: '98%', label: 'Tenant Satisfaction' },
              { value: '14 Days', label: 'Avg. Placement Time' },
              { value: '20+', label: 'Cities Served' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/4 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-brand-emerald/30 hover:bg-white/6">
                <p className="text-4xl font-black text-brand-emerald md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-xs font-bold uppercase tracking-wider text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              variant="default"
              size="lg"
              className="cta-primary-shadow cursor-pointer font-bold"
              style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
              render={<Link href="/contact/" />}
            >
              Join Our Owners
            </Button>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: FAQ ── */}
      <FAQBlock
        title="Owner FAQs"
        questions={[
          {
            question: 'How much does MoveSmart property management cost?',
            answer:
              'We operate on a success-based model -- you pay nothing upfront. Our management fee is a percentage of collected rent, so we only earn when your property is earning. There are no hidden fees or long-term contracts.',
          },
          {
            question: 'What services are included in property management?',
            answer:
              'Our full-service management includes tenant screening, rent collection, maintenance coordination, lease management, property inspections, financial reporting, and 24/7 emergency response. Everything you need to be a hands-off landlord.',
          },
          {
            question: 'How do you screen tenants?',
            answer:
              'Every applicant undergoes a structured screening process including credit checks, employment and income verification, previous landlord references, and rental history review. We only place tenants who meet our qualification criteria.',
          },
          {
            question: 'What is the rent protection guarantee?',
            answer:
              'Our rent guarantee program protects your rental income from missed payments. If a qualified tenant fails to pay, we cover the rent so your cash flow remains consistent.',
          },
          {
            question: 'How quickly can you fill my vacancy?',
            answer:
              'On average, we fill vacancies within 14 days. We syndicate your listing across MLS, Realtor.ca, and 50+ rental platforms for maximum exposure, combined with professional photography and staging to attract quality tenants fast.',
          },
        ]}
      />

      {/* ── SECTION 7: CTA Banner ── */}
      <CTABannerBlock
        headline="Ready for Hands-Off Leasing?"
        description="Join 500+ property owners who trust MoveSmart Rentals for white-glove leasing execution."
        primaryCta={{ label: 'Get Started', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/' }}
      />
    </main>
  )
}

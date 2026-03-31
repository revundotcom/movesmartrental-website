import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Monitor,
  User,
  Shield,
  Eye,
  Smartphone,
  BarChart3,
  MessageSquare,
  Lock,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { HeroBlock } from '@/components/blocks/hero-block'
import { PortalIllustration } from '@/components/illustrations'
import { PortalChips } from '@/components/blocks/portal-chips'
import { generatePageMetadata } from '@/lib/metadata'

export const metadata: Metadata = generatePageMetadata({
  path: '/portal-and-technology/',
  fallbackTitle: 'Owner Portal & Technology | MoveSmart Rentals',
  fallbackDescription:
    'Access your self-serve owner portal for real-time reporting, maintenance tracking, financial statements, and direct communication with your account manager.',
})

const PORTAL_FEATURES = [
  {
    icon: Monitor,
    title: 'Real-Time Dashboard',
    description:
      'Track showings, applications, and approvals as they happen. Full visibility into your property status at a glance.',
  },
  {
    icon: BarChart3,
    title: 'Financial Reporting',
    description:
      'View monthly statements, rent payment history, and expense breakdowns. Download reports anytime.',
  },
  {
    icon: MessageSquare,
    title: 'Communication Hub',
    description:
      'Direct messaging with your dedicated account manager. Every conversation logged and searchable.',
  },
  {
    icon: Eye,
    title: 'Maintenance Tracking',
    description:
      'Submit and track maintenance requests from start to finish. Photo documentation and vendor updates included.',
  },
  {
    icon: Lock,
    title: 'Document Storage',
    description:
      'Leases, inspection reports, tenant records, and receipts stored securely in one place.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Access',
    description:
      'Full portal access from any device. Check on your properties from anywhere, anytime.',
  },
]

export default function PortalAndTechnologyPage() {
  return (
    <main>
      {/* -- SECTION 1: Hero -- */}
      <HeroBlock
        headline="Your Property Management Portal"
        subheadline="Technology-driven transparency that puts you in control. Real-time reporting, maintenance tracking, and direct communication with your account manager."
        cta1={{ label: 'Create a Free Account', href: '/contact/' }}
        cta2={{ label: 'Book a Call', href: '/contact/?intent=call' }}
        priority
      />

      {/* -- SECTION 2: Portal Features (two-column) -- */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-emerald">
              Owner Portal
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
              Everything You Need,{' '}
              <span className="font-display italic text-brand-emerald">One Login</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your self-serve portal gives you 24/7 access to every detail of your property management.
            </p>
          </div>

          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            {/* Left: Illustration */}
            <div className="relative mx-auto w-full max-w-[480px]">
              <div
                className="absolute inset-0 rounded-3xl blur-3xl"
                style={{
                  background:
                    'radial-gradient(ellipse, rgba(16,185,129,0.08) 0%, transparent 70%)',
                }}
                aria-hidden="true"
              />
              <PortalIllustration className="relative w-full drop-shadow-lg" />
              <PortalChips />
            </div>

            {/* Right: Feature cards */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {PORTAL_FEATURES.map((feature) => {
                const Icon = feature.icon
                return (
                  <div
                    key={feature.title}
                    className="group rounded-2xl border border-slate-100 bg-slate-50/50 p-6 transition-all duration-300 hover:border-brand-emerald/30 hover:bg-white hover:shadow-lg"
                  >
                    <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-brand-emerald/10 transition-colors duration-300 group-hover:bg-brand-emerald/20">
                      <Icon className="size-5 text-brand-emerald" aria-hidden="true" />
                    </div>
                    <h3 className="font-display text-base font-semibold text-brand-navy">
                      {feature.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* -- SECTION 3: Technology + Human Expertise -- */}
      <section className="relative overflow-hidden bg-brand-navy py-28 text-white">
        <div
          className="absolute inset-0 opacity-[0.04]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(#10B981 1px, transparent 1px), linear-gradient(90deg, #10B981 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
        <div
          className="absolute -right-40 -top-40 size-[500px] rounded-full bg-brand-emerald/8 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-40 -left-40 size-[400px] rounded-full bg-brand-emerald/6 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-emerald">
              Our Approach
            </p>
            <h2 className="mt-3 font-display text-3xl font-normal tracking-tight sm:text-4xl md:text-5xl">
              Technology + Human Expertise
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
              Our portal gives you real-time visibility, but technology alone is not enough.
              Every property is backed by a dedicated account manager and local office
              presence, so you get the speed of modern software with the reliability of
              experienced professionals who know your market.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                icon: Monitor,
                title: 'Real-Time Visibility',
                description:
                  'Instant access to showings, applications, financials, and maintenance from your dashboard.',
              },
              {
                icon: User,
                title: 'Dedicated Account Manager',
                description:
                  'A single point of contact who knows your properties and handles every detail personally.',
              },
              {
                icon: Shield,
                title: 'Local Office Presence',
                description:
                  'Brick-and-mortar offices across Ontario. Real people you can meet and trust with your investment.',
              },
            ].map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/8 bg-white/4 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:border-brand-emerald/30 hover:bg-white/6"
                >
                  <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-2xl bg-brand-emerald/15">
                    <Icon className="size-6 text-brand-emerald" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/60">
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <Button
              variant="default"
              size="lg"
              className="cta-primary-shadow cursor-pointer font-bold"
              style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}
              render={<Link href="/contact/" />}
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      {/* -- SECTION 4: FAQ -- */}
      <FAQBlock
        title="Portal FAQs"
        questions={[
          {
            question: 'How do I access the owner portal?',
            answer:
              'Once your property is onboarded, you receive login credentials via email. The portal is accessible from any web browser on desktop, tablet, or mobile. No app download required.',
          },
          {
            question: 'What can I see in the portal?',
            answer:
              'Everything related to your property: real-time showing activity, tenant applications, lease documents, financial statements, rent payment history, maintenance requests, inspection reports, and direct messages with your account manager.',
          },
          {
            question: 'Is my data secure?',
            answer:
              'Yes. The portal uses bank-level encryption (256-bit SSL), secure authentication, and role-based access controls. Your financial and tenant data is protected at every level.',
          },
          {
            question: 'Do I need to download an app?',
            answer:
              'No. The portal is fully web-based and works on any device with a browser. Simply log in from your phone, tablet, or computer to access everything.',
          },
        ]}
      />

      {/* -- SECTION 5: CTA Banner -- */}
      <CTABannerBlock
        headline="Ready to See Your Portal?"
        description="Create a free account and experience full transparency into your property management."
        primaryCta={{ label: 'Create Free Account', href: '/contact/' }}
        secondaryCta={{ label: 'Book a Call', href: '/contact/?intent=call' }}
      />
    </main>
  )
}

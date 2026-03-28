import type { Metadata } from 'next'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { ContactForm } from '@/components/contact-form'

export const metadata: Metadata = {
  title: 'Contact Us | Get a Free Property Management Consultation',
  description:
    'Contact MoveSmart Rentals for a free consultation. Submit a property, book a call, or ask about our Ontario property management services. We respond within 24 hours.',
  alternates: {
    canonical: '/contact/',
  },
  openGraph: {
    title: 'Contact MoveSmart Rentals | Free Consultation',
    description:
      'Contact MoveSmart Rentals for a free consultation. Submit a property, book a call, or ask about our Ontario property management services.',
    images: ['/og-default.png'],
  },
}

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Toronto, Ontario, Canada',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+1 (437) 295-7688',
    href: 'tel:+14372957688',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@movesmartrentals.com',
    href: 'mailto:info@movesmartrentals.com',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon-Fri 9 AM - 6 PM ET',
  },
] as const

export default function ContactPage() {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Contact', href: '/contact/' },
          ]}
        />
      </div>

      <HeroBlock
        headline="Get in Touch"
        subheadline="We respond within 24 hours"
      />

      {/* Contact main section */}
      <section className="relative overflow-hidden bg-white py-28">
        {/* Dot grid */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          aria-hidden="true"
          style={{ backgroundImage: 'radial-gradient(#0B1D3A 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        {/* Emerald glow top-right */}
        <div className="absolute -right-20 -top-20 size-[400px] rounded-full bg-brand-emerald/6 blur-3xl" aria-hidden="true" />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">

            {/* Left: Form */}
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-brand-emerald">Get in Touch</p>
              <h2 className="mt-3 font-display text-3xl font-normal tracking-tight text-brand-navy sm:text-4xl">
                Let&apos;s Start a<br />
                <span className="font-display italic text-brand-emerald">Conversation</span>
              </h2>
              <p className="mt-4 text-lg text-slate-600">We respond within 24 hours. Tell us about your property and goals.</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>

            {/* Right: Info cards */}
            <div className="space-y-4 lg:pt-16">
              {CONTACT_INFO.map((item) => {
                const IconComponent = item.icon
                const content = (
                  <div className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-emerald/30 hover:shadow-md">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-emerald/10 transition-colors duration-300 group-hover:bg-brand-emerald/20">
                      <IconComponent className="size-5 text-brand-emerald" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-xs font-black uppercase tracking-wider text-slate-400">{item.label}</p>
                      <p className="mt-1 text-base font-semibold text-brand-navy">{item.value}</p>
                    </div>
                  </div>
                )
                if ('href' in item && item.href) {
                  return <a key={item.label} href={item.href}>{content}</a>
                }
                return <div key={item.label}>{content}</div>
              })}

              {/* Response time promise */}
              <div className="rounded-2xl bg-brand-navy p-6">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-brand-emerald/20">
                    <svg viewBox="0 0 24 24" className="size-5 text-brand-emerald" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">24-Hour Response Promise</p>
                    <p className="text-xs text-white/50">We respond to every inquiry within one business day</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <CTABannerBlock
        headline="Prefer to Call?"
        description="Our team is available Monday to Friday, 9 AM to 6 PM Eastern Time."
        primaryCta={{ label: 'Call +1 (437) 295-7688', href: 'tel:+14372957688' }}
      />
    </main>
  )
}

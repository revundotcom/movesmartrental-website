import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { Calendar, Mail, MessageSquare, MapPin, Clock, Phone, ArrowRight } from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { PageHeroBlock } from '@/components/blocks/page-hero-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { ContactForm } from '@/components/contact-form'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const metadata: Metadata = {
  title: 'Contact Us | Get a Free Property Management Consultation',
  description:
    'Contact MoveSmart Rentals for a free consultation. Submit a property, book a call, or ask about our Canada-wide property management services. We respond within 24 hours.',
  alternates: {
    canonical: '/contact/',
  },
  openGraph: {
    title: 'Contact MoveSmart Rentals | Free Consultation',
    description:
      'Contact MoveSmart Rentals for a free consultation. Submit a property, book a call, or ask about our Canada-wide property management services.',
    images: [{ url: '/og-default.png', width: 1200, height: 630, alt: 'Contact MoveSmart Rentals' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact MoveSmart Rentals | Free Consultation',
    description:
      'Contact MoveSmart Rentals for a free consultation. Submit a property, book a call, or ask about our Canada-wide property management services.',
    images: ['/og-default.png'],
  },
}

const CONTACT_FAQS = [
  {
    question: 'How fast will I hear back?',
    answer:
      'We respond to every inquiry within one business day - most within 2-4 hours during Monday-Saturday, 8 AM to 8 PM ET.',
  },
  {
    question: 'Is the initial consultation really free?',
    answer:
      'Yes. Your first 20-minute call with an advisor is free, with zero obligation. We use it to understand your property and tell you honestly whether we are a fit.',
  },
  {
    question: 'What should I have ready before I book a call?',
    answer:
      'Just the basics: property address, unit count, and your biggest question. No documents required for the first conversation.',
  },
  {
    question: 'Do you serve my city?',
    answer:
      'We serve 20+ cities across Ontario, British Columbia, Alberta, and select US markets. Tell us your city in the form and we will confirm coverage within a day.',
  },
  {
    question: 'Can I speak to someone outside business hours?',
    answer:
      'Existing owners and tenants can reach our after-hours emergency line 24/7. New inquiries are answered the next business morning.',
  },
]

const TEAM = [
  {
    initials: 'AK',
    name: 'Aarav K.',
    role: 'Owner Advisor',
    city: 'Toronto, ON',
    handles: 'Handles new owner inquiries across Ontario - pricing, onboarding, and portfolio reviews.',
  },
  {
    initials: 'SM',
    name: 'Sofia M.',
    role: 'Tenant Success Lead',
    city: 'Vancouver, BC',
    handles: 'Helps renters with applications, showings, and move-in coordination in BC and Alberta.',
  },
  {
    initials: 'DR',
    name: 'Daniel R.',
    role: 'Partnerships',
    city: 'Ottawa, ON',
    handles: 'Franchise, referral, and vendor questions - anything business-to-business.',
  },
]

const REACH_ROWS = [
  {
    icon: Calendar,
    title: 'Book a call',
    copy: 'Pick a 20-minute window with an advisor who knows your market. We confirm the same day and send a calendar invite you can forward to co-owners.',
    ctaLabel: 'Choose a time',
    ctaHref: '#scheduling',
  },
  {
    icon: MessageSquare,
    title: 'Send a message',
    copy: 'Tell us about your property in the form below. Include the address, unit count, and what you are trying to solve - we will reply with next steps within one business day.',
    ctaLabel: 'Jump to the form',
    ctaHref: '#contact-form',
  },
  {
    icon: Mail,
    title: 'Email directly',
    copy: 'For general questions, partnerships, or anything that is not urgent, write to hello@movesmartrentals.com. A real person on our team will read it - no auto-responders.',
    ctaLabel: 'hello@movesmartrentals.com',
    ctaHref: 'mailto:hello@movesmartrentals.com',
  },
]

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

      <PageHeroBlock
        kicker="Contact"
        eyebrow="We'd love to hear from you"
        headline="Let's talk about your property"
        lede="Real humans, clear answers, no pressure. Whether you own one door or twenty, we will help you figure out the right next step."
        cta1={{ label: 'Book a Call', href: '#scheduling' }}
        cta2={{ label: 'Send a Message', href: '#contact-form' }}
        aside={
          <div className="rounded-2xl border border-brand-navy/10 bg-white/80 p-6 shadow-sm backdrop-blur">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-navy/60">
              Fastest ways to reach us
            </p>
            <div className="mt-5 space-y-4">
              <a
                href="tel:+14372957688"
                className="group flex items-center justify-between border-b border-brand-navy/10 pb-4 last:border-b-0 last:pb-0"
              >
                <span className="flex items-center gap-3">
                  <Phone className="size-4 text-brand-emerald" aria-hidden="true" />
                  <span className="font-display text-lg text-brand-navy">
                    +1 (437) 295-7688
                  </span>
                </span>
                <ArrowRight className="size-4 text-brand-navy/40 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href="mailto:hello@movesmartrentals.com"
                className="group flex items-center justify-between border-b border-brand-navy/10 pb-4 last:border-b-0 last:pb-0"
              >
                <span className="flex items-center gap-3">
                  <Mail className="size-4 text-brand-emerald" aria-hidden="true" />
                  <span className="font-display text-lg text-brand-navy">
                    hello@movesmartrentals.com
                  </span>
                </span>
                <ArrowRight className="size-4 text-brand-navy/40 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
              <a
                href="#scheduling"
                className="group flex items-center justify-between"
              >
                <span className="flex items-center gap-3">
                  <Calendar className="size-4 text-brand-emerald" aria-hidden="true" />
                  <span className="font-display text-lg text-brand-navy">Book a 20-min call</span>
                </span>
                <ArrowRight className="size-4 text-brand-navy/40 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        }
      />

      {/* ─────────── Three ways to reach us ─────────── */}
      <section id="scheduling" className="relative bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <RevealOnScroll variant="slideUp">
            <div className="mb-14 max-w-2xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                Three ways to reach us
              </p>
              <h2 className="font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl">
                Pick the one that feels <span className="font-display italic text-brand-emerald">right</span>
                <span className="text-brand-gold">.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                A phone call, a written message, or a quick email - all three reach the same small team and all three get a human reply.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="slideUp" stagger={0.12}>
            {REACH_ROWS.map((row, idx) => {
              const Icon = row.icon
              return (
                <div
                  key={row.title}
                  className={`grid grid-cols-[auto_1fr] items-start gap-6 py-8 sm:gap-10 sm:py-10 ${
                    idx !== REACH_ROWS.length - 1 ? 'border-b border-brand-navy/10' : ''
                  }`}
                >
                  <div className="flex size-12 items-center justify-center rounded-xl border border-brand-gold/40 bg-brand-gold/5 sm:size-14">
                    <Icon className="size-5 text-brand-emerald sm:size-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-normal leading-tight tracking-tight text-brand-navy sm:text-3xl">
                      {row.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
                      {row.copy}
                    </p>
                    <a
                      href={row.ctaHref}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-emerald hover:text-brand-emerald/80"
                    >
                      {row.ctaLabel}
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              )
            })}
          </RevealOnScroll>
        </div>
      </section>

      {/* ─────────── Who you'll talk to ─────────── */}
      <section className="relative bg-[#FBFAF6] py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
        <div className="mx-auto max-w-5xl px-4">
          <RevealOnScroll variant="slideUp">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                Who you&apos;ll talk to
              </p>
              <h2 className="font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl">
                Small team, <span className="font-display italic text-brand-emerald">real replies</span>
                <span className="text-brand-gold">.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                When you write in, one of these people reads it. No ticket queue, no offshore contact centre, no templated response. We keep the team small on purpose so every conversation starts with someone who actually knows your market.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll variant="slideUp" stagger={0.08}>
            {TEAM.map((member) => (
              <div
                key={member.name}
                className="flex items-start gap-5 border-b border-brand-navy/10 py-6 last:border-b-0"
              >
                <div
                  aria-hidden="true"
                  className="flex size-14 shrink-0 items-center justify-center rounded-full bg-brand-navy font-display text-lg text-white"
                >
                  {member.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <p className="font-display text-xl font-normal text-brand-navy">
                      {member.name}
                    </p>
                    <p className="text-sm font-semibold text-brand-emerald">
                      {member.role}
                    </p>
                    <p className="text-sm text-slate-500">· {member.city}</p>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                    {member.handles}
                  </p>
                </div>
              </div>
            ))}
          </RevealOnScroll>
        </div>
      </section>

      {/* ─────────── Contact form ─────────── */}
      <section id="contact-form" className="relative bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <RevealOnScroll variant="slideUp">
            <div className="mb-6">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                The form
              </p>
              <h2 className="font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl">
                Send us a <span className="font-display italic text-brand-emerald">message</span>
                <span className="text-brand-gold">.</span>
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600">
                Tell us who you are and what you are trying to solve. The more context you give, the more useful our first reply will be - but three sentences is plenty to get started.
              </p>
            </div>
          </RevealOnScroll>
          <div className="mt-10">
            <Suspense fallback={<div className="h-96 animate-pulse rounded-lg bg-slate-100" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </section>

      {/* ─────────── Office & hours ─────────── */}
      <section className="relative bg-[#FBFAF6] py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
        <div className="mx-auto max-w-5xl px-4">
          <RevealOnScroll variant="slideUp">
            <div className="mb-12 max-w-2xl">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-emerald">
                Office &amp; hours
              </p>
              <h2 className="font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl">
                Where to find <span className="font-display italic text-brand-emerald">us</span>
                <span className="text-brand-gold">.</span>
              </h2>
            </div>
          </RevealOnScroll>

          <div className="grid gap-10 border-t border-brand-navy/10 pt-10 sm:grid-cols-3">
            <div>
              <div className="flex items-center gap-2">
                <MapPin className="size-4 text-brand-emerald" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-navy/60">
                  Head office
                </p>
              </div>
              <p className="mt-3 font-display text-xl font-normal leading-snug text-brand-navy">
                1 King St W, Suite 4801<br />
                Toronto, ON M5H 1A1
              </p>
              <a
                href="https://maps.google.com/?q=1+King+St+W+Suite+4801+Toronto+ON+M5H+1A1"
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-emerald hover:text-brand-emerald/80"
              >
                Directions on Google Maps
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </a>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Clock className="size-4 text-brand-emerald" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-navy/60">
                  Support hours
                </p>
              </div>
              <p className="mt-3 font-display text-xl font-normal leading-snug text-brand-navy">
                Monday - Saturday
              </p>
              <p className="mt-1 text-base text-slate-600">
                8 AM - 8 PM ET
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                Typical first reply in under 4 hours during business hours.
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <Phone className="size-4 text-brand-emerald" aria-hidden="true" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-navy/60">
                  After-hours
                </p>
              </div>
              <p className="mt-3 font-display text-xl font-normal leading-snug text-brand-navy">
                Emergency line 24/7
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-500">
                For active owners and tenants only. Water leaks, heat outages, lockouts - call the main number and press 9.
              </p>
              <Link
                href="tel:+14372957688"
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-emerald hover:text-brand-emerald/80"
              >
                +1 (437) 295-7688
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── FAQ ─────────── */}
      <FAQBlock title="Quick answers before you write in" questions={CONTACT_FAQS} schemaEnabled />

      <div className="bg-slate-50/50 py-6 text-center">
        <p className="text-sm text-slate-500">
          More questions?{' '}
          <Link href="/faq/" className="font-semibold text-brand-emerald hover:underline">
            Visit the full FAQ →
          </Link>
        </p>
      </div>

      <CTABannerBlock
        headline="Prefer a call? Book 20 minutes."
        description="A short, honest conversation - no slide deck, no hard sell. You'll know by the end whether we're the right fit."
        primaryCta={{ label: 'Book a Call', href: '#scheduling' }}
      />
    </main>
  )
}

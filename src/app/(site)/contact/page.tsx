import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import {
  Calendar,
  Mail,
  MapPin,
  Clock,
  Phone,
  ArrowUpRight,
  Shield,
  Star,
} from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { FAQBlock } from '@/components/blocks/faq-block'
import { ContactFormInline } from '@/components/contact-form-inline'
import { ContactStickyCTA } from './contact-sticky-cta'
import { RevealOnScroll } from '@/components/ui/reveal-on-scroll'

export const metadata: Metadata = {
  title: 'Contact Us | Book a Free Full-Service Leasing Consultation',
  description:
    'Contact MoveSmart Rentals for a free leasing consultation. Submit a property, book a call, or ask about our Canada-wide full-service leasing and tenant placement. We respond within one business day.',
  alternates: {
    canonical: '/contact/',
  },
  openGraph: {
    title: 'Contact MoveSmart Rentals | Free Leasing Consultation',
    description:
      'Contact MoveSmart Rentals for a free leasing consultation. Submit a property, book a call, or ask about our Canada-wide full-service leasing and tenant placement.',
    images: [
      { url: '/og-default.png', width: 1200, height: 630, alt: 'Contact MoveSmart Rentals' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact MoveSmart Rentals | Free Leasing Consultation',
    description:
      'Contact MoveSmart Rentals for a free leasing consultation. Submit a property, book a call, or ask about our Canada-wide full-service leasing and tenant placement.',
    images: ['/og-default.png'],
  },
}

const CONTACT_FAQS = [
  {
    question: 'How fast will I hear back?',
    answer:
      'We respond to every inquiry within one business day - most within 2-4 hours during Monday-Friday, 9 AM to 5 PM ET.',
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
      'We serve 20+ cities across Canada and select US markets. Tell us your city in the form and we will confirm coverage within a day.',
  },
  {
    question: 'Can I speak to someone outside business hours?',
    answer:
      'Existing owners and tenants can reach our after-hours emergency line 24/7. New inquiries are answered the next business morning.',
  },
]

// Recent verified reviews (sourced from /reviews/ data).
const SOCIAL_PROOF_REVIEWS = [
  {
    quote:
      'Filled in nine days at $200 over our asking rent. The screening report was the most thorough I have ever seen — I sleep better.',
    name: 'Priya S.',
    city: 'Mississauga, ON',
  },
  {
    quote:
      'Two units, two perfect placements. Communication is the difference — I always know where things stand.',
    name: 'Marcus T.',
    city: 'Toronto, ON',
  },
  {
    quote:
      'They turned a vacant unit around in eleven days. My previous PM took six weeks for the same building.',
    name: 'Jennifer M.',
    city: 'Burlington, ON',
  },
]

const REACH_OPTIONS = [
  {
    icon: Phone,
    label: 'Call us',
    primary: '+1 (800) 595-9755',
    helper: 'Mon–Fri, 9 AM – 5 PM ET',
    href: 'tel:+18005959755',
  },
  {
    icon: Mail,
    label: 'Email us',
    primary: 'contact@movesmartrentals.com',
    helper: 'Replies within 4 business hours',
    href: 'mailto:contact@movesmartrentals.com',
  },
  {
    icon: Calendar,
    label: 'Book a call',
    primary: 'Schedule a 20-minute slot',
    helper: 'Same-day calendar confirm',
    href: '#contact-form',
  },
]

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* ─── Breadcrumb ────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:pt-8">
        <BreadcrumbNav
          crumbs={[
            { label: 'Home', href: '/' },
            { label: 'Contact', href: '/contact/' },
          ]}
        />
      </div>

      {/* ─── 1. Hero ───────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FBFAF6] via-[#FBFAF6] to-white py-14 sm:py-20">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
        />
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
            Contact
          </p>
          <h1 className="mt-3 font-display text-4xl font-normal leading-tight tracking-tight text-brand-navy sm:text-5xl md:text-6xl">
            Let&apos;s talk about your{' '}
            <span className="font-display italic text-brand-emerald">property</span>
            <span className="text-brand-gold">.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Real humans, clear answers, no pressure. Whether you own one door or twenty, we&apos;ll help you figure out the right next step within one business day.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-emerald px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-md"
            >
              Send a Message
            </a>
            <a
              href="tel:+18005959755"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-navy/20 bg-white px-6 py-3 text-sm font-semibold text-brand-navy transition-all hover:border-brand-navy/40 hover:bg-slate-50"
            >
              <Phone className="size-4 text-brand-emerald" aria-hidden="true" />
              +1 (800) 595-9755
            </a>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Shield className="size-3.5 text-brand-emerald" aria-hidden="true" />
            Trusted by thousands of landlords across North America
          </p>
        </div>
      </section>

      {/* ─── 2. MAIN CONTACT GRID: reach options + form side-by-side ── */}
      <section
        id="contact-form"
        className="relative bg-white py-16 sm:py-20 lg:py-24"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-12">
            {/* LEFT: reach options + trust note */}
            <aside className="lg:col-span-2">
              <RevealOnScroll variant="slideUp">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                  Reach us directly
                </p>
                <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl">
                  Three ways to{' '}
                  <span className="font-display italic text-brand-emerald">say hi</span>
                  <span className="text-brand-gold">.</span>
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Phone, email, or calendar — all three land with the same small team. No ticket queues, no offshore contact centre.
                </p>

                <div className="mt-8 space-y-3">
                  {REACH_OPTIONS.map((opt) => {
                    const Icon = opt.icon
                    const isExternal = opt.href.startsWith('tel:') || opt.href.startsWith('mailto:')
                    return (
                      <a
                        key={opt.label}
                        href={opt.href}
                        className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand-emerald/30 hover:shadow-md sm:p-5"
                      >
                        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100">
                          <Icon className="size-5 text-brand-emerald" aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-slate-400">
                            {opt.label}
                          </p>
                          <p className="mt-1 truncate text-sm font-semibold text-brand-navy">
                            {opt.primary}
                          </p>
                          <p className="mt-0.5 text-xs text-slate-500">{opt.helper}</p>
                        </div>
                        {isExternal ? (
                          <ArrowUpRight
                            className="size-4 text-slate-300 transition-colors group-hover:text-brand-emerald"
                            aria-hidden="true"
                          />
                        ) : null}
                      </a>
                    )
                  })}
                </div>

              </RevealOnScroll>
            </aside>

            {/* RIGHT: the form */}
            <div className="lg:col-span-3">
              <RevealOnScroll variant="slideUp" delay={0.1}>
                <Suspense
                  fallback={<div className="h-[600px] animate-pulse rounded-3xl bg-slate-100" />}
                >
                  <ContactFormInline />
                </Suspense>
              </RevealOnScroll>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 3. Office + Map ───────────────────────────────────────────── */}
      <section className="relative bg-[#FBFAF6] py-20 sm:py-24">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-gold/50 to-transparent"
        />
        <div className="mx-auto max-w-7xl px-4">
          <RevealOnScroll variant="slideUp">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                Office &amp; hours
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Where to find{' '}
                <span className="font-display italic text-brand-emerald">us</span>
                <span className="text-brand-gold">.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                We&apos;re headquartered in Toronto&apos;s financial district — with leasing teams covering 20+ cities across Canada and the United States.
              </p>
            </div>
          </RevealOnScroll>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-10">
            {/* LEFT: office facts */}
            <div className="lg:col-span-2">
              <div className="space-y-5 rounded-2xl border border-brand-navy/10 bg-white p-6 shadow-sm sm:p-8">
                <OfficeFact
                  icon={MapPin}
                  label="Head office"
                  body={
                    <>
                      1 King St W, Suite 4801
                      <br />
                      Toronto, ON M5H 1A1
                    </>
                  }
                  link={{
                    label: 'Open in Google Maps',
                    href: 'https://maps.google.com/?q=1+King+St+W+Suite+4801+Toronto+ON+M5H+1A1',
                  }}
                />
                <div className="h-px bg-slate-100" />
                <OfficeFact
                  icon={Clock}
                  label="Support hours"
                  body={
                    <>
                      Monday – Friday
                      <br />
                      <span className="text-base font-normal text-slate-500">9 AM – 5 PM ET</span>
                    </>
                  }
                  footnote="Typical first reply in under 4 hours during business hours."
                />
                <div className="h-px bg-slate-100" />
                <OfficeFact
                  icon={Phone}
                  label="After-hours emergency"
                  body="24/7 Emergency Line"
                  footnote="For active owners and tenants only. Call the main number and press 9."
                  link={{ label: '+1 (800) 595-9755', href: 'tel:+18005959755' }}
                />
              </div>
            </div>

            {/* RIGHT: map */}
            <div className="lg:col-span-3">
              <div className="overflow-hidden rounded-2xl border border-brand-navy/10 bg-white shadow-lg">
                <iframe
                  title="MoveSmart Rentals office location on Google Maps"
                  src="https://maps.google.com/maps?q=1%20King%20St%20W%2C%20Toronto%2C%20ON&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-[400px] w-full border-0 lg:h-full lg:min-h-[440px]"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. Social proof: reviews + trust badges + stats ──────────── */}
      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <RevealOnScroll variant="slideUp">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-brand-emerald">
                You&apos;re in good company
              </p>
              <h2 className="mt-3 font-display text-3xl font-normal leading-tight tracking-tight text-brand-navy sm:text-4xl md:text-5xl">
                Trusted by{' '}
                <span className="font-display italic text-brand-emerald">thousands of landlords</span>
                <span className="text-brand-gold">.</span>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-slate-600">
                Real owners, real outcomes — verified across Google, BBB, and Realtor.ca.
              </p>
            </div>
          </RevealOnScroll>

          {/* Review snippets */}
          <RevealOnScroll variant="slideUp" stagger={0.08}>
            <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SOCIAL_PROOF_REVIEWS.map((r) => (
                <article
                  key={r.name}
                  className="flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                >
                  {/* Stars */}
                  <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="size-3.5 fill-brand-gold text-brand-gold"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-700">
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <footer className="mt-5 border-t border-slate-100 pt-4">
                    <p className="text-sm font-semibold text-brand-navy">{r.name}</p>
                    <p className="text-xs text-slate-500">{r.city}</p>
                  </footer>
                </article>
              ))}
            </div>
          </RevealOnScroll>

          {/* Link out to full reviews */}
          <div className="mt-10 text-center">
            <Link
              href="/reviews/"
              className="inline-flex items-center gap-2 rounded-full border border-brand-navy bg-white px-6 py-3 text-sm font-semibold text-brand-navy transition-all hover:bg-brand-navy hover:text-white"
            >
              Read all 200+ reviews
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 5. FAQ ────────────────────────────────────────────────────── */}
      <FAQBlock
        title="Quick answers before you write in"
        questions={CONTACT_FAQS}
        schemaEnabled
        showQuestionsCta={false}
      />

      {/* ─── 6. Final CTA ──────────────────────────────────────────────── */}
      <CTABannerBlock
        headline="Prefer a call? Book 20 minutes."
        description="A short, honest conversation — no slide deck, no hard sell. You'll know by the end whether we're the right fit."
        primaryCta={{ label: 'Book a Call', href: '#contact-form' }}
      />

      {/* Mobile sticky CTA — Send a Message + Call */}
      <ContactStickyCTA />
    </main>
  )
}

// ─────────────────────────────────────────────────────────────
// Small atom for the office facts list
// ─────────────────────────────────────────────────────────────

function OfficeFact({
  icon: Icon,
  label,
  body,
  footnote,
  link,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  body: React.ReactNode
  footnote?: string
  link?: { label: string; href: string }
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <Icon className="size-4 text-brand-emerald" aria-hidden="true" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-navy/60">
          {label}
        </p>
      </div>
      <p className="mt-2 font-display text-lg font-normal leading-snug text-brand-navy">{body}</p>
      {footnote && <p className="mt-2 text-xs leading-relaxed text-slate-500">{footnote}</p>}
      {link && (
        <Link
          href={link.href}
          {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-emerald hover:text-brand-emerald/80"
        >
          {link.label}
        </Link>
      )}
    </div>
  )
}

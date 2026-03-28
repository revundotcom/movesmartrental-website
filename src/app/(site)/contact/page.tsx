import type { Metadata } from 'next'
import { Mail, MapPin, Phone, Clock } from 'lucide-react'

import { BreadcrumbNav } from '@/components/layout/breadcrumb-nav'
import { HeroBlock } from '@/components/blocks/hero-block'
import { CTABannerBlock } from '@/components/blocks/cta-banner-block'
import { ContactForm } from '@/components/contact-form'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with MoveSmart Rentals. Submit a property, request a consultation, or ask about our services. We respond within 24 hours.',
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
    value: '(416) 555-0199',
    href: 'tel:+14165550199',
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

      {/* Contact Form + Info Grid */}
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 lg:grid-cols-2">
          {/* Left: Form */}
          <div>
            <h2 className="mb-6 text-2xl font-bold">Send Us a Message</h2>
            <ContactForm />
          </div>

          {/* Right: Contact Info Cards */}
          <div>
            <h2 className="mb-6 text-2xl font-bold">Contact Information</h2>
            <div className="space-y-4">
              {CONTACT_INFO.map((item) => {
                const IconComponent = item.icon
                return (
                  <Card key={item.label}>
                    <CardContent className="flex items-start gap-4 pt-6">
                      <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <IconComponent className="size-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">
                          {item.label}
                        </p>
                        {'href' in item && item.href ? (
                          <a
                            href={item.href}
                            className="font-semibold text-primary hover:underline"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="font-semibold">{item.value}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <CTABannerBlock
        headline="Prefer to Call?"
        description="Our team is available Monday to Friday, 9 AM to 6 PM Eastern Time."
        primaryCta={{ label: 'Call (416) 555-0199', href: 'tel:+14165550199' }}
      />
    </main>
  )
}

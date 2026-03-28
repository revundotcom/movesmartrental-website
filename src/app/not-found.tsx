import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Home,
  Users,
  Search,
  Briefcase,
  MapPin,
  Mail,
  ArrowRight,
} from 'lucide-react'

import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Page Not Found',
}

const navigationLinks = [
  {
    href: '/',
    title: 'Homepage',
    description: 'Back to the main page',
    icon: Home,
  },
  {
    href: '/owners/',
    title: 'Property Owners',
    description: 'Leasing execution services',
    icon: Users,
  },
  {
    href: '/tenants/',
    title: 'Tenants',
    description: 'Find your next rental',
    icon: Search,
  },
  {
    href: '/services/',
    title: 'Services',
    description: 'Browse all services',
    icon: Briefcase,
  },
  {
    href: '/locations/',
    title: 'Locations',
    description: 'Find your city',
    icon: MapPin,
  },
  {
    href: '/contact/',
    title: 'Contact',
    description: 'Get in touch with us',
    icon: Mail,
  },
]

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-4xl text-center">
        {/* Large 404 with brand accent */}
        <div className="relative mx-auto mb-8 w-fit">
          <span className="text-[8rem] font-extrabold leading-none tracking-tighter text-brand-navy sm:text-[10rem]">
            4
          </span>
          <span className="text-[8rem] font-extrabold leading-none tracking-tighter text-brand-emerald sm:text-[10rem]">
            0
          </span>
          <span className="text-[8rem] font-extrabold leading-none tracking-tighter text-brand-navy sm:text-[10rem]">
            4
          </span>
        </div>

        <h1 className="font-heading text-2xl font-bold text-brand-navy sm:text-3xl">
          Page Not Found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
          The page you are looking for may have been moved or no longer exists.
          Let us help you find what you need.
        </p>

        {/* Primary CTA */}
        <div className="mt-8">
          <Button variant="default" size="lg" render={<Link href="/" />}>
            Back to Homepage
          </Button>
        </div>

        {/* Divider */}
        <div className="mx-auto my-12 flex max-w-xs items-center gap-4">
          <div className="h-px flex-1 bg-border" />
          <span className="text-sm font-medium text-muted-foreground">
            or try these pages
          </span>
          <div className="h-px flex-1 bg-border" />
        </div>

        {/* Navigation links */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {navigationLinks.map((link) => {
            const Icon = link.icon
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-start gap-4 rounded-xl border border-border bg-white p-5 text-left transition-all hover:border-brand-emerald/30 hover:shadow-md"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-brand-emerald/10 transition-colors group-hover:bg-brand-emerald/20">
                  <Icon
                    className="size-5 text-brand-emerald"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="font-semibold text-brand-navy">
                    {link.title}
                  </h2>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {link.description}
                  </p>
                </div>
                <ArrowRight
                  className="mt-0.5 size-4 shrink-0 text-muted-foreground/30 transition-colors group-hover:text-brand-emerald"
                  aria-hidden="true"
                />
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  )
}

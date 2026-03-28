'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { Logo } from '@/components/brand/logo'
import { MobileNav } from '@/components/layout/mobile-nav'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Navigation structure — grouped for clarity                        */
/* ------------------------------------------------------------------ */

const NAV_GROUPS = [
  {
    label: 'For Owners',
    items: [
      {
        title: 'Owner Hub',
        href: '/owners/',
        description: 'Dashboard and resources for property owners',
      },
      {
        title: 'Services',
        href: '/services/',
        description: 'Full-service property management solutions',
      },
      {
        title: 'Pricing',
        href: '/pricing/',
        description: 'Transparent pricing with no hidden fees',
      },
      {
        title: 'Franchising',
        href: '/franchising/',
        description: 'Grow with the MoveSmart brand',
      },
    ],
  },
  {
    label: 'For Tenants',
    items: [
      {
        title: 'Tenant Hub',
        href: '/tenants/',
        description: 'Everything tenants need in one place',
      },
      {
        title: 'Locations',
        href: '/locations/',
        description: 'Browse available rental properties',
      },
      {
        title: 'Resources',
        href: '/resources/',
        description: 'Guides, FAQs, and helpful articles',
      },
    ],
  },
  {
    label: 'About',
    items: [
      {
        title: 'About Us',
        href: '/about/',
        description: 'Our story, mission, and team',
      },
      {
        title: 'Contact',
        href: '/contact/',
        description: 'Get in touch with our team',
      },
      {
        title: 'FAQ',
        href: '/resources/faq/',
        description: 'Answers to commonly asked questions',
      },
    ],
  },
] as const

/* ------------------------------------------------------------------ */
/*  Header component                                                  */
/* ------------------------------------------------------------------ */

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    // Transition to solid at 60px — enough to clear the hero eyebrow badge
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll() // set initial state
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border/40 bg-white/95 shadow-sm backdrop-blur-md'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        {/* Logo — white when transparent over dark hero, navy when solid on white */}
        <Logo variant={scrolled ? 'default' : 'white'} />

        {/* Desktop navigation — center */}
        <NavigationMenu className="hidden lg:flex" align="center">
          <NavigationMenuList className="gap-0.5">
            {NAV_GROUPS.map((group) => (
              <NavigationMenuItem key={group.label}>
                <NavigationMenuTrigger
                  className={cn(
                    'cursor-pointer rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200',
                    scrolled
                      ? 'text-brand-navy/80 hover:bg-brand-navy/5 hover:text-brand-navy data-popup-open:bg-brand-navy/5 data-popup-open:text-brand-navy'
                      : 'text-white/90 hover:bg-white/10 hover:text-white data-popup-open:bg-white/10 data-popup-open:text-white',
                  )}
                >
                  {group.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[280px]">
                  <ul className="grid gap-0.5 p-1.5">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink
                          render={<Link href={item.href} />}
                          className="group/link block cursor-pointer rounded-lg px-3 py-2.5 transition-all duration-150 hover:bg-emerald-50"
                        >
                          <div className="flex items-center gap-2 text-sm font-semibold text-[#0B1D3A] group-hover/link:text-emerald-700">
                            <span
                              className="inline-block size-1.5 rounded-full bg-emerald-400 opacity-0 transition-opacity duration-150 group-hover/link:opacity-100"
                              aria-hidden="true"
                            />
                            {item.title}
                          </div>
                          <p className="mt-0.5 pl-3.5 text-xs leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTA buttons — right */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/contact/"
            className={cn(
              'cursor-pointer rounded-lg border px-4 py-2 text-sm font-medium transition-all duration-200',
              scrolled
                ? 'border-brand-navy/20 text-brand-navy/80 hover:border-brand-navy/40 hover:bg-brand-navy/5 hover:text-brand-navy'
                : 'border-white/30 text-white hover:border-white/60 hover:bg-white/10',
            )}
          >
            Book a Call
          </Link>
          <Link
            href="/contact/"
            className="cursor-pointer rounded-lg bg-brand-emerald px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-900/20 transition-all duration-200 hover:-translate-y-px hover:bg-brand-emerald-dark hover:shadow-md hover:shadow-emerald-900/25"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile navigation trigger */}
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

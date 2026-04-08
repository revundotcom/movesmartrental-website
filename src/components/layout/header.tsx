'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

const NAV_GROUPS = [
  {
    label: 'For Owners',
    items: [
      { title: 'Owner Hub', href: '/owners/', description: 'Dashboard and resources for property owners' },
      { title: 'Services', href: '/services/', description: 'Full-service property management solutions' },
      { title: 'Pricing', href: '/pricing/', description: 'Transparent pricing with no hidden fees' },
      { title: 'Portal & Technology', href: '/portal-and-technology/', description: 'Owner portal and technology platform' },
      { title: 'Reviews', href: '/reviews/', description: 'See what our clients say about us' },
      { title: 'Franchising', href: '/franchising/', description: 'Grow with the MoveSmart brand' },
    ],
  },
  {
    label: 'For Tenants',
    items: [
      { title: 'Tenant Hub', href: '/tenants/', description: 'Everything tenants need in one place' },
      { title: 'Locations', href: '/locations/', description: 'Browse available rental properties' },
      { title: 'Resources', href: '/resources/', description: 'Guides, FAQs, and helpful articles' },
    ],
  },
  {
    label: 'About',
    items: [
      { title: 'About Us', href: '/about/', description: 'Our story, mission, and team' },
      { title: 'Contact', href: '/contact/', description: 'Get in touch with our team' },
      { title: 'FAQ', href: '/faq/', description: 'Answers to commonly asked questions' },
    ],
  },
] as const

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [navValue, setNavValue] = useState<string | null>(null)

  useEffect(() => {
    let rafId = 0
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          setScrolled(window.scrollY > 8)
          setNavValue(null)
          ticking = false
        })
        ticking = true
      }
    }
    // Sync on mount so SSR hydration matches without waiting for a RAF
    setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full bg-brand-navy transition-[border-color,box-shadow] duration-300',
        scrolled
          ? 'border-b border-white/10 shadow-[0_1px_16px_rgba(11,29,58,0.4)]'
          : 'border-b border-white/5',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:h-[72px] lg:px-8">
        {/* Logo — always white on dark navy */}
        <Logo variant="white" />

        {/* Desktop navigation */}
        <NavigationMenu
          className="hidden lg:flex"
          align="center"
          value={navValue}
          onValueChange={(val) => setNavValue(val)}
        >
          <NavigationMenuList className="gap-0.5">
            <NavigationMenuItem>
              <NavigationMenuLink
                render={<Link href="/" />}
                active={pathname === '/'}
                className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white data-active:text-white"
              >
                Home
              </NavigationMenuLink>
            </NavigationMenuItem>
            {NAV_GROUPS.map((group) => (
              <NavigationMenuItem key={group.label}>
                <NavigationMenuTrigger
                  className="cursor-pointer rounded-lg px-3 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:bg-white/10 hover:text-white data-popup-open:bg-white/10 data-popup-open:text-white"
                >
                  {group.label}
                </NavigationMenuTrigger>
                <NavigationMenuContent className="min-w-[280px]">
                  <ul className="grid gap-0.5 p-1.5">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <NavigationMenuLink
                          render={<Link href={item.href} />}
                          active={pathname === item.href}
                          className="group/link block cursor-pointer rounded-lg px-3 py-2.5 transition-all duration-150 hover:bg-emerald-50 focus:bg-emerald-50 data-active:bg-emerald-50 data-active:text-emerald-700"
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

        {/* Desktop CTA buttons */}
        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href="/contact/?intent=call"
            className="cursor-pointer rounded-lg border border-white/20 px-4 py-2 text-sm font-medium text-white/80 transition-all duration-200 hover:border-white/40 hover:bg-white/10 hover:text-white"
          >
            Book a Call
          </Link>
          <Link
            href="/contact/"
            className="cursor-pointer rounded-lg bg-brand-emerald px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-900/20 transition-all duration-200 hover:-translate-y-px hover:bg-emerald-600 hover:shadow-md"
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

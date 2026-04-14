'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/brand/logo'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ */
/*  Mobile navigation structure                                       */
/*                                                                    */
/*  Mirrors the desktop top-nav contracted in §7.1 / §20.5:           */
/*    Home · Owners · Tenants · Services · Locations · Pricing ·      */
/*    Resources · Franchising · About · Contact                       */
/*                                                                    */
/*  TODO(phase-2): swap /ca/ontario/ + /faq/ fallbacks for real       */
/*  /locations/ and /resources/ hubs when those pages ship.           */
/* ------------------------------------------------------------------ */

type NavItem = { title: string; href: string }
type NavSectionDef = { label: string; href?: string; items?: NavItem[] }

const MOBILE_NAV_SECTIONS: ReadonlyArray<NavSectionDef> = [
  {
    label: 'Owners',
    items: [
      { title: 'Owner Hub', href: '/owners/' },
      { title: 'Pricing', href: '/pricing/' },
      { title: 'Portal & Technology', href: '/portal-and-technology/' },
      { title: 'Reviews', href: '/reviews/' },
      { title: 'Create a Free Account', href: '/contact/?type=owner' },
    ],
  },
  {
    label: 'Tenants',
    items: [
      { title: 'Tenant Hub', href: '/tenants/' },
      { title: 'Apply', href: '/contact/?type=tenant' },
      { title: 'Tenant FAQ', href: '/faq/' },
    ],
  },
  {
    label: 'Services',
    items: [
      { title: 'All Services', href: '/services/' },
      { title: 'Tenant Placement', href: '/services/tenant-placement/' },
      { title: 'Leasing Services', href: '/services/leasing-services/' },
      { title: 'Tenant Screening', href: '/services/tenant-screening/' },
      { title: 'Rent Guarantee', href: '/services/rent-guarantee/' },
      // TODO(phase-2): real /services/tenant-insurance/
      { title: 'Tenant Insurance', href: '/services/' },
      // TODO(phase-2): real /services/tenant-guarantor/
      { title: 'Tenant Guarantor', href: '/services/' },
      { title: 'Rental Preparation', href: '/services/rental-preparation/' },
      { title: 'Portal & Technology', href: '/portal-and-technology/' },
      // TODO(phase-2): real /services/institutional-lease-up/
      { title: 'Institutional Lease-Up', href: '/services/' },
    ],
  },
  {
    label: 'Locations',
    // TODO(phase-2): real /locations/ hub.
    items: [
      { title: 'All Ontario Locations', href: '/ca/ontario/' },
      { title: 'Toronto', href: '/ca/ontario/toronto/' },
      { title: 'Mississauga', href: '/ca/ontario/mississauga/' },
      { title: 'Brampton', href: '/ca/ontario/brampton/' },
      { title: 'Hamilton', href: '/ca/ontario/hamilton/' },
      { title: 'Ottawa', href: '/ca/ontario/ottawa/' },
      { title: 'Vaughan', href: '/ca/ontario/vaughan/' },
      { title: 'Markham', href: '/ca/ontario/markham/' },
    ],
  },
  { label: 'Pricing', href: '/pricing/' },
  {
    label: 'Resources',
    // TODO(phase-2): real /resources/ hub.
    items: [
      { title: 'FAQ', href: '/faq/' },
      { title: 'Reviews', href: '/reviews/' },
      { title: 'Tenant Hub', href: '/tenants/' },
      { title: 'Owner Hub', href: '/owners/' },
    ],
  },
  { label: 'Franchising', href: '/franchising/' },
  {
    label: 'About',
    items: [
      { title: 'About Us', href: '/about/' },
      { title: 'Reviews', href: '/reviews/' },
    ],
  },
  { label: 'Contact', href: '/contact/' },
]

/* ------------------------------------------------------------------ */
/*  Collapsible section                                                */
/* ------------------------------------------------------------------ */

function NavSection({
  label,
  items,
  onNavigate,
  isSheetOpen,
  pathname,
}: {
  label: string
  items: ReadonlyArray<{ title: string; href: string }>
  onNavigate: () => void
  isSheetOpen: boolean
  pathname: string
}) {
  const [open, setOpen] = useState(false)
  const sectionId = `mobile-nav-${label.toLowerCase().replace(/\s+/g, '-')}`

  useEffect(() => {
    if (!isSheetOpen) setOpen(false)
  }, [isSheetOpen])

  return (
    <div className="border-b border-border/60 last:border-b-0">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-3.5 text-sm font-semibold uppercase tracking-wider text-[#0B1D3A]/60 transition-colors hover:text-[#0B1D3A]"
        aria-expanded={open}
        aria-controls={sectionId}
      >
        {label}
        <ChevronDown
          className={cn(
            'size-4 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>
      <div
        id={sectionId}
        className={cn(
          'grid transition-[grid-template-rows] duration-200 ease-in-out',
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
      >
        <div className="overflow-hidden min-h-0">
          <ul className="space-y-0.5 px-3 pb-3">
            {items.map((item) => {
              const isActive = pathname === item.href
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={cn(
                      'block rounded-lg px-3 py-2.5 text-[15px] font-medium transition-colors hover:bg-emerald-50 hover:text-emerald-700',
                      isActive
                        ? 'text-brand-emerald font-bold'
                        : 'text-[#0B1D3A]'
                    )}
                  >
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Direct top-level link (single-item nav slot)                       */
/* ------------------------------------------------------------------ */

function NavDirectLink({
  label,
  href,
  onNavigate,
  pathname,
}: {
  label: string
  href: string
  onNavigate: () => void
  pathname: string
}) {
  const isActive = pathname === href
  return (
    <div className="border-b border-border/60 last:border-b-0">
      <Link
        href={href}
        onClick={onNavigate}
        className={cn(
          'block px-5 py-3.5 text-sm font-semibold uppercase tracking-wider transition-colors',
          isActive
            ? 'text-brand-emerald font-bold'
            : 'text-[#0B1D3A]/60 hover:text-[#0B1D3A]'
        )}
      >
        {label}
      </Link>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile nav component                                              */
/* ------------------------------------------------------------------ */

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    if (open && navRef.current) {
      navRef.current.scrollTop = 0
    }
  }, [open])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const handleNavigate = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className="text-white hover:bg-white/10 hover:text-white size-11"
          >
            <Menu className="size-5" />
          </Button>
        }
      />
      <SheetContent side="right" className="flex flex-col gap-0 p-0 !w-[85vw] max-w-80">
        {/* Header with logo */}
        <SheetHeader className="border-b border-border/60 px-5 py-4 pr-12">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Logo />
        </SheetHeader>

        {/* Scrollable nav sections */}
        <nav ref={navRef} className="flex-1 overflow-y-auto py-2" aria-label="Mobile navigation">
          {/* Home link */}
          <NavDirectLink
            label="Home"
            href="/"
            onNavigate={handleNavigate}
            pathname={pathname}
          />

          {MOBILE_NAV_SECTIONS.map((section) =>
            section.items ? (
              <NavSection
                key={section.label}
                label={section.label}
                items={section.items}
                onNavigate={handleNavigate}
                isSheetOpen={open}
                pathname={pathname}
              />
            ) : (
              <NavDirectLink
                key={section.label}
                label={section.label}
                href={section.href!}
                onNavigate={handleNavigate}
                pathname={pathname}
              />
            )
          )}
        </nav>

        {/* Bottom CTA */}
        <div className="border-t border-border/60 p-5 space-y-3">
          <Link
            href="/contact/?intent=call"
            onClick={handleNavigate}
            className="flex w-full items-center justify-center rounded-lg border border-[#0B1D3A]/20 px-4 py-3 text-sm font-medium text-[#0B1D3A] transition-colors hover:border-[#0B1D3A]/40 hover:bg-[#0B1D3A]/5"
          >
            Book a Call
          </Link>
          <Link
            href="/contact/?type=owner"
            onClick={handleNavigate}
            className="flex w-full items-center justify-center rounded-lg bg-brand-emerald px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-emerald-dark"
          >
            Create a Free Account
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

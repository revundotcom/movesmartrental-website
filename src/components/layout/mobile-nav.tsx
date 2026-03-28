'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
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
/* ------------------------------------------------------------------ */

const MOBILE_NAV_SECTIONS = [
  {
    label: 'For Owners',
    items: [
      { title: 'Owner Hub', href: '/owners/' },
      { title: 'Services', href: '/services/' },
      { title: 'Pricing', href: '/pricing/' },
      { title: 'Franchising', href: '/franchising/' },
    ],
  },
  {
    label: 'For Tenants',
    items: [
      { title: 'Tenant Hub', href: '/tenants/' },
      { title: 'Locations', href: '/locations/' },
      { title: 'Resources', href: '/resources/' },
    ],
  },
  {
    label: 'About',
    items: [
      { title: 'About Us', href: '/about/' },
      { title: 'Contact', href: '/contact/' },
      { title: 'FAQ', href: '/faq/' },
    ],
  },
] as const

/* ------------------------------------------------------------------ */
/*  Collapsible section                                                */
/* ------------------------------------------------------------------ */

function NavSection({
  label,
  items,
  onNavigate,
  isSheetOpen,
}: {
  label: string
  items: ReadonlyArray<{ title: string; href: string }>
  onNavigate: () => void
  isSheetOpen: boolean
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
        <div className="overflow-hidden">
          <ul className="space-y-0.5 px-3 pb-3">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  className="block rounded-lg px-3 py-2.5 text-[15px] font-medium text-[#0B1D3A] transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile nav component                                              */
/* ------------------------------------------------------------------ */

export function MobileNav() {
  const [open, setOpen] = useState(false)

  const handleNavigate = () => setOpen(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open navigation menu"
            className="text-white"
          >
            <Menu className="size-5" />
          </Button>
        }
      />
      <SheetContent side="right" className="flex w-[85vw] max-w-80 flex-col p-0">
        {/* Header with logo */}
        <SheetHeader className="border-b border-border/60 px-5 py-4">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Logo />
        </SheetHeader>

        {/* Scrollable nav sections */}
        <nav className="flex-1 overflow-y-auto py-2" aria-label="Mobile navigation">
          {MOBILE_NAV_SECTIONS.map((section) => (
            <NavSection
              key={section.label}
              label={section.label}
              items={section.items}
              onNavigate={handleNavigate}
              isSheetOpen={open}
            />
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="border-t border-border/60 p-5 space-y-3">
          <Link
            href="/contact/"
            onClick={handleNavigate}
            className="flex w-full items-center justify-center rounded-lg border border-[#0B1D3A]/20 px-4 py-2.5 text-sm font-medium text-[#0B1D3A] transition-colors hover:border-[#0B1D3A]/40 hover:bg-[#0B1D3A]/5"
          >
            Book a Call
          </Link>
          <Link
            href="/contact/"
            onClick={handleNavigate}
            className="flex w-full items-center justify-center rounded-lg bg-brand-emerald px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-emerald-dark"
          >
            Get Started
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}

import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { MobileNav } from '@/components/layout/mobile-nav'

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Owners', href: '/owners/' },
  { label: 'Tenants', href: '/tenants/' },
  { label: 'Services', href: '/services/' },
  { label: 'Locations', href: '/locations/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'Resources', href: '/resources/' },
  { label: 'Franchising', href: '/franchising/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-white">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-foreground"
        >
          MoveSmart Rentals
        </Link>

        {/* Desktop navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {NAV_ITEMS.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink render={<Link href={item.href} />}>
                  {item.label}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile navigation */}
        <div className="md:hidden">
          <MobileNav items={[...NAV_ITEMS]} />
        </div>
      </div>
    </header>
  )
}

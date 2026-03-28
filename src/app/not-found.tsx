import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page Not Found | MoveSmart Rentals',
}

const navigationLinks = [
  {
    href: '/',
    title: 'Homepage',
    description: 'Start from the beginning',
  },
  {
    href: '/owners/',
    title: 'Property Owners',
    description: 'Management services',
  },
  {
    href: '/tenants/',
    title: 'Tenants',
    description: 'Find your next rental',
  },
  {
    href: '/services/',
    title: 'Services',
    description: 'Browse our services',
  },
  {
    href: '/locations/',
    title: 'Locations',
    description: 'Find your city',
  },
  {
    href: '/contact/',
    title: 'Contact',
    description: 'Get in touch',
  },
]

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold">Page Not Found</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The page you are looking for may have been moved or no longer exists.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border p-6 transition hover:bg-gray-50"
            >
              <h2 className="font-semibold">{link.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

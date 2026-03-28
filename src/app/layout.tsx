import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'),
  title: {
    default: 'MoveSmart Rentals - Property Management Services',
    template: '%s | MoveSmart Rentals',
  },
  description:
    'Professional property management services across Ontario and the US. Tenant placement, screening, rent protection, and full-service property management.',
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'MoveSmart Rentals',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}

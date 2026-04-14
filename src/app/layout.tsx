import type { Metadata } from 'next'
import { Inter, Plus_Jakarta_Sans, DM_Serif_Display } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { MobileStickyCTA } from '@/components/layout/mobile-sticky-cta'
import { ScrollDepthTracker } from '@/components/tracking/scroll-depth-tracker'
import { LinkTracker } from '@/components/tracking/link-tracker'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-sans',
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-heading',
  weight: ['400', '500', '600', '700', '800'],
})

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-display',
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://movesmartrentals.com'),
  title: {
    default: 'MoveSmart Rentals | White-Glove Leasing Brokerage Across Canada',
    template: '%s | MoveSmart Rentals',
  },
  description:
    'White-glove leasing brokerage across Canada. Strategic pricing, professional marketing, tenant qualification, and lease execution with zero upfront cost. Get your free rental analysis.',
  keywords: ['leasing brokerage Canada', 'rental leasing services', 'tenant qualification', 'lease execution', 'landlord services', 'leasing services Ontario', 'tenant screening Canada'],
  authors: [{ name: 'MoveSmart Rentals', url: 'https://movesmartrentals.com' }],
  creator: 'MoveSmart Rentals',
  publisher: 'MoveSmart Rentals',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    siteName: 'MoveSmart Rentals',
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'MoveSmart Rentals - White-Glove Leasing Brokerage Across Canada',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@MoveSmart',
    creator: '@MoveSmart',
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-CA': '/',
      'en-US': '/us/',
      'x-default': '/',
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
    shortcut: '/icon',
  },
  manifest: '/manifest.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA" suppressHydrationWarning>
      <body className={`${inter.variable} ${plusJakartaSans.variable} ${dmSerifDisplay.variable} font-sans`} suppressHydrationWarning>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <ScrollDepthTracker />
        <LinkTracker />
        <Header />
        {children}
        <MobileStickyCTA />
        <Footer />
        {process.env.NEXT_PUBLIC_SALESIQ_WIDGET_CODE && (
          <Script
            id="salesiq-widget"
            strategy="lazyOnload"
            dangerouslySetInnerHTML={{
              __html: `
                var $zoho=$zoho || {};
                $zoho.salesiq = $zoho.salesiq || {widgetcode: "${process.env.NEXT_PUBLIC_SALESIQ_WIDGET_CODE}", values:{}, ready:function(){}};
                var d=document;
                var s=d.createElement("script");
                s.type="text/javascript";
                s.id="zsiqscript";
                s.defer=true;
                s.src="https://salesiq.zohopublic.com/widget";
                var t=d.getElementsByTagName("script")[0];
                t.parentNode.insertBefore(s,t);
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}

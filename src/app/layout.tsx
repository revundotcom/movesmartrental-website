import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleTagManager } from '@next/third-parties/google'
import Script from 'next/script'
import './globals.css'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ScrollDepthTracker } from '@/components/tracking/gtm-events'
import { LinkTracker } from '@/components/tracking/link-tracker'

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
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || '',
    other: {
      'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION || '',
    },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
        )}
        <ScrollDepthTracker />
        <LinkTracker />
        <Header />
        <main>{children}</main>
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

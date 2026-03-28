import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'FAQ | MoveSmart Rentals',
}

export default function FAQPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        Common questions about our services.
      </p>
    </main>
  )
}

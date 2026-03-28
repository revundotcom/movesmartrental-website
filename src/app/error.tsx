'use client'

import Link from 'next/link'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="mx-auto max-w-md">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-red-50">
          <svg
            className="size-8 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h1 className="font-display text-2xl font-normal text-[#0A2647]">
          Something went wrong
        </h1>
        <p className="mt-3 text-muted-foreground">
          We encountered an unexpected error. Please try again or return to the
          homepage.
        </p>
        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center rounded-lg bg-[#10B981] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#059669] focus:outline-none focus:ring-2 focus:ring-[#10B981] focus:ring-offset-2"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-[#0A2647] px-6 py-3 text-sm font-semibold text-[#0A2647] transition-colors hover:bg-[#0A2647] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#0A2647] focus:ring-offset-2"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  )
}

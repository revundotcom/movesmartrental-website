import type { ReactNode } from 'react'

interface BrowserFrameProps {
  url?: string
  children: ReactNode
  className?: string
}

/**
 * BrowserFrame - faux browser chrome wrapper for displaying mockups
 * Renders 3 traffic-light dots, a URL bar, and a content area
 */
export function BrowserFrame({
  url = 'movesmart.ca/dashboard',
  children,
  className = '',
}: BrowserFrameProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_60px_-15px_rgba(11,29,58,0.25)] ${className}`}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="flex gap-1.5">
          <span className="size-3 rounded-full bg-[#FF5F57]" aria-hidden="true" />
          <span className="size-3 rounded-full bg-[#FEBC2E]" aria-hidden="true" />
          <span className="size-3 rounded-full bg-[#28C840]" aria-hidden="true" />
        </div>
        <div className="ml-2 flex-1">
          <div className="mx-auto max-w-md rounded-md border border-slate-200 bg-white px-3 py-1 text-center">
            <span className="text-[11px] font-medium text-slate-500">
              <span className="text-emerald-600">●</span> {url}
            </span>
          </div>
        </div>
        <div className="hidden gap-1 sm:flex">
          <span className="size-1 rounded-full bg-slate-300" aria-hidden="true" />
          <span className="size-1 rounded-full bg-slate-300" aria-hidden="true" />
          <span className="size-1 rounded-full bg-slate-300" aria-hidden="true" />
        </div>
      </div>

      {/* Content */}
      <div className="bg-slate-50/40">{children}</div>
    </div>
  )
}

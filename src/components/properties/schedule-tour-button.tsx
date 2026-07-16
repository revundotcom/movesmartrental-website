'use client'

import React, { useState } from 'react'
import { ScheduleTourModal } from './schedule-tour-modal'

export function ScheduleTourButton({
  unitId,
  className = '',
}: {
  unitId: string
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          className ||
          'flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0B1D3A] transition-colors hover:border-[#10B981]/40 hover:bg-emerald-50'
        }
      >
        Schedule a Tour
      </button>

      {isOpen && (
        <ScheduleTourModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          unitId={unitId}
          initialSelectedDate=""
        />
      )}
    </>
  )
}

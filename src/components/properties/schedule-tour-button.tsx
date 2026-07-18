'use client'

import React, { useState } from 'react'
import { ScheduleTourModal } from './schedule-tour-modal'
import { useShowingSlots } from './use-showing-slots'

export function ScheduleTourButton({
  unitId,
  className = '',
}: {
  unitId: string
  className?: string
}) {
  const [isOpen, setIsOpen] = useState(false)
  const { dynamicDates, isLoading } = useShowingSlots(unitId, true);
  
  const isFallback = dynamicDates.length === 0 && !isLoading;
  const buttonText = isFallback ? "Request a Tour" : "Schedule a Tour";

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={
          className ||
          'flex w-full items-center justify-center rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0B1D3A] transition-colors hover:border-[#10B981]/40 hover:bg-emerald-50'
        }
      >
        {buttonText}
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

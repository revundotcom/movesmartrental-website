'use client'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

export function PortalChips() {
  return (
    <>
      <motion.div
        className="absolute -right-6 -top-4 flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 shadow-xl"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex size-8 items-center justify-center rounded-xl bg-brand-emerald/15">
          <svg viewBox="0 0 20 20" className="size-4 text-brand-emerald" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-bold text-brand-navy">Rent Received</p>
          <p className="text-[10px] text-muted-foreground">Unit 4B · $2,400</p>
        </div>
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-brand-navy/90 px-4 py-3 shadow-xl backdrop-blur-sm"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <div className="flex size-8 items-center justify-center rounded-xl bg-brand-emerald/20">
          <ShieldCheck className="size-4 text-brand-emerald" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-bold text-white">Lease Signed</p>
          <p className="text-[10px] text-white/50">All docs executed</p>
        </div>
      </motion.div>
    </>
  )
}

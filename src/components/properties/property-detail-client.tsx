'use client'

/**
 * Client-only chunk of the property detail page.
 *
 * Owns three interactive concerns that the RECO / IDX-display layout requires:
 *   1. Image gallery + fullscreen lightbox with thumbnail strip
 *   2. Photos | Map | Street View tab switcher
 *   3. Sign-in gate (blur overlay) covering the full IDX detail body
 *
 * The page.tsx server component fetches data, derives all display strings,
 * and hands them down as plain props so this file never has to know about
 * the portal API shape directly.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import {
  X,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Map as MapIcon,
  Camera,
  Mail,
  Phone,
  User,
  MessageSquare,
  CheckCircle2,
  Ticket,
} from 'lucide-react'

type Tab = 'photos' | 'map' | 'streetview'

export interface PropertyDetailClientProps {
  images: string[]
  propertyName: string
  address: string
  lat?: string | null
  lng?: string | null
  /** Pre-rendered children for the gated body of the listing. */
  gatedContent: React.ReactNode
}

// ---------------------------------------------------------------------------
// Gallery + Tabs
// ---------------------------------------------------------------------------

function MediaTabs({
  images,
  propertyName,
  address,
  lat,
  lng,
}: {
  images: string[]
  propertyName: string
  address: string
  lat?: string | null
  lng?: string | null
}) {
  // If the property has no photos, open the Street View tab by default so
  // visitors immediately see something visual instead of an empty gallery.
  const [tab, setTab] = useState<Tab>(images.length > 0 ? 'photos' : 'streetview')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const encodedAddress = encodeURIComponent(address || propertyName)

  // Maps embed: prefer lat/lng when present, fall back to address query.
  // No API key required for the `output=embed` URL form.
  const mapsSrc =
    lat && lng
      ? `https://www.google.com/maps?q=${lat},${lng}&z=16&output=embed`
      : `https://www.google.com/maps?q=${encodedAddress}&z=16&output=embed`

  // Street View embed via the `svembed` URL. With lat/lng we get an exact
  // pano; without coords we fall back to a place-anchored Street View link
  // wrapped in the embed surface (Google does the geocoding).
  const streetViewSrc =
    lat && lng
      ? `https://www.google.com/maps?layer=c&cbll=${lat},${lng}&cbp=11,0,0,0,0&output=svembed`
      : `https://maps.google.com/maps?q=&layer=c&cbll=&cbp=&output=svembed&q=${encodedAddress}`

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), [])
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])

  const showPrev = useCallback(() => {
    setLightboxIndex((i) =>
      i == null ? i : (i - 1 + images.length) % images.length,
    )
  }, [images.length])

  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i == null ? i : (i + 1) % images.length))
  }, [images.length])

  // Keyboard navigation inside the lightbox.
  useEffect(() => {
    if (lightboxIndex == null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      else if (e.key === 'ArrowLeft') showPrev()
      else if (e.key === 'ArrowRight') showNext()
    }
    window.addEventListener('keydown', onKey)
    // Lock body scroll behind the modal.
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightboxIndex, closeLightbox, showPrev, showNext])

  return (
    <div>
      {/* Tab bar */}
      <div
        role="tablist"
        aria-label="Property media"
        className="mb-4 flex w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-xs sm:text-sm"
      >
        <TabButton
          active={tab === 'photos'}
          onClick={() => setTab('photos')}
          icon={<ImageIcon className="size-4" />}
          label="Photos"
        />
        <TabButton
          active={tab === 'map'}
          onClick={() => setTab('map')}
          icon={<MapIcon className="size-4" />}
          label="Map"
        />
        <TabButton
          active={tab === 'streetview'}
          onClick={() => setTab('streetview')}
          icon={<Camera className="size-4" />}
          label="Street View"
        />
      </div>

      {/* Tab panels */}
      {tab === 'photos' && (
        <PhotosPanel
          images={images}
          propertyName={propertyName}
          onOpen={openLightbox}
        />
      )}

      {tab === 'map' && (
        <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          {address ? (
            <iframe
              title={`Map for ${propertyName}`}
              src={mapsSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              Address unavailable — map cannot be displayed.
            </div>
          )}
        </div>
      )}

      {tab === 'streetview' && (
        <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
          {address ? (
            <iframe
              title={`Street View for ${propertyName}`}
              src={streetViewSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">
              Address unavailable — Street View cannot be displayed.
            </div>
          )}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex != null && images[lightboxIndex] && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          propertyName={propertyName}
          onClose={closeLightbox}
          onPrev={showPrev}
          onNext={showNext}
          onSelect={openLightbox}
        />
      )}
    </div>
  )
}

function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean
  onClick: () => void
  icon: React.ReactNode
  label: string
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap px-2 py-3 font-medium transition-colors sm:gap-2 sm:px-4 ${
        active
          ? 'bg-[#0B1D3A] text-white'
          : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B1D3A]'
      }`}
    >
      <span className="shrink-0">{icon}</span>
      <span>{label}</span>
    </button>
  )
}

function PhotosPanel({
  images,
  propertyName,
  onOpen,
}: {
  images: string[]
  propertyName: string
  onOpen: (i: number) => void
}) {
  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/9] items-center justify-center rounded-2xl bg-slate-100">
        <div className="text-center text-slate-400">
          <ImageIcon className="mx-auto size-10" />
          <p className="mt-2 text-sm">No images available</p>
        </div>
      </div>
    )
  }

  const cover = images[0]
  const extras = images.slice(1, 5)

  return (
    <>
      {/* Mobile: swipeable single-photo carousel with dots, matches the
          native-app pattern. Tap opens the same fullscreen lightbox. */}
      <div className="md:hidden">
        <MobilePhotoCarousel
          images={images}
          propertyName={propertyName}
          onOpen={onOpen}
        />
      </div>

      {/* Desktop: cover + 4-thumb mosaic */}
      <div className="hidden grid-cols-4 gap-3 md:grid">
        <button
          type="button"
          onClick={() => onOpen(0)}
          className="group relative col-span-3 row-span-2 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100"
          aria-label="Open photo 1 in fullscreen"
        >
          <Image
            src={cover}
            alt={propertyName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="60vw"
            priority
            unoptimized
          />
          <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
            {images.length} photo{images.length === 1 ? '' : 's'}
          </span>
        </button>
        {extras.map((url, i) => {
          const realIndex = i + 1
          const isLast = i === extras.length - 1 && images.length > 5
          return (
            <button
              key={`${url}-${i}`}
              type="button"
              onClick={() => onOpen(realIndex)}
              className="group relative col-span-1 aspect-[4/3] overflow-hidden rounded-xl bg-slate-100"
              aria-label={`Open photo ${realIndex + 1} in fullscreen`}
            >
              <Image
                src={url}
                alt={`${propertyName} — photo ${realIndex + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                sizes="20vw"
                unoptimized
              />
              {isLast && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-semibold text-white">
                  +{images.length - 5} more
                </span>
              )}
            </button>
          )
        })}
      </div>
    </>
  )
}

function MobilePhotoCarousel({
  images,
  propertyName,
  onOpen,
}: {
  images: string[]
  propertyName: string
  onOpen: (i: number) => void
}) {
  const [active, setActive] = useState(0)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const trackRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const isHorizontal = useRef<boolean | null>(null)
  const didDrag = useRef(false)

  const goTo = useCallback(
    (i: number) => {
      const next = Math.max(0, Math.min(images.length - 1, i))
      setActive(next)
    },
    [images.length],
  )

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isHorizontal.current = null
    didDrag.current = false
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null || touchStartY.current == null) return
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current
    if (isHorizontal.current == null) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        isHorizontal.current = Math.abs(dx) > Math.abs(dy)
      }
    }
    if (isHorizontal.current) {
      didDrag.current = true
      setDragX(dx)
    }
  }

  const handleTouchEnd = () => {
    const width = trackRef.current?.clientWidth ?? window.innerWidth
    const threshold = Math.min(60, width * 0.18)
    if (isHorizontal.current && Math.abs(dragX) > threshold) {
      if (dragX < 0) goTo(active + 1)
      else goTo(active - 1)
    }
    setDragX(0)
    setIsDragging(false)
    touchStartX.current = null
    touchStartY.current = null
    isHorizontal.current = null
  }

  const handleClick = () => {
    // Suppress click that follows a drag — the swipe wasn't a tap.
    if (didDrag.current) return
    onOpen(active)
  }

  const MAX_DOTS = 7
  const showCompactDots = images.length > MAX_DOTS

  return (
    <div>
      <div
        ref={trackRef}
        className="relative aspect-[4/3] touch-pan-y overflow-hidden rounded-2xl bg-slate-100"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Open photo ${active + 1} in fullscreen`}
      >
        <div
          className="flex h-full w-full"
          style={{
            transform: `translateX(calc(${-active * 100}% + ${dragX}px))`,
            transition: isDragging
              ? 'none'
              : 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {images.map((url, i) => (
            <div
              key={`${url}-mobile-${i}`}
              className="relative h-full w-full shrink-0"
            >
              <Image
                src={url}
                alt={`${propertyName} — photo ${i + 1}`}
                fill
                className="object-cover"
                sizes="100vw"
                priority={i === 0}
                unoptimized
              />
            </div>
          ))}
        </div>

        {/* Bottom gradient so the overlaid dots + counter stay readable on
            both bright skies and dark interiors. */}
        {images.length > 1 && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 via-black/15 to-transparent"
          />
        )}

        {/* Photo counter pill */}
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur">
          {active + 1} / {images.length}
        </span>

        {/* Pagination dots — overlaid on the photo (native-app pattern) so
            visitors always see the indicator with the image, not way below
            the fold. Tappable through the gradient. */}
        {images.length > 1 && (
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex items-center justify-center gap-1.5">
            <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/30 px-2.5 py-1.5 backdrop-blur-sm">
              {showCompactDots ? (
                <CompactDots
                  total={images.length}
                  index={active}
                  onSelect={goTo}
                  variant="dark"
                />
              ) : (
                images.map((_, i) => (
                  <button
                    key={`m-dot-${i}`}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation()
                      goTo(i)
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      i === active
                        ? 'w-6 bg-white'
                        : 'w-1.5 bg-white/55 hover:bg-white/80'
                    }`}
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === active ? 'true' : undefined}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function Lightbox({
  images,
  index,
  propertyName,
  onClose,
  onPrev,
  onNext,
  onSelect,
}: {
  images: string[]
  index: number
  propertyName: string
  onClose: () => void
  onPrev: () => void
  onNext: () => void
  onSelect: (i: number) => void
}) {
  // Portal-mount only after hydration to avoid SSR document mismatch.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Touch-swipe gesture: track the active finger across the viewport and
  // mirror the slide motion so the photo follows the thumb. Snap to prev /
  // next on release if the drag passes the threshold.
  const trackRef = useRef<HTMLDivElement | null>(null)
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const isHorizontal = useRef<boolean | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
    touchStartY.current = e.touches[0].clientY
    isHorizontal.current = null
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current == null || touchStartY.current == null) return
    const dx = e.touches[0].clientX - touchStartX.current
    const dy = e.touches[0].clientY - touchStartY.current
    // Lock direction on first meaningful move so vertical scrolls don't
    // hijack the slider (and horizontal swipes don't fight the page).
    if (isHorizontal.current == null) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        isHorizontal.current = Math.abs(dx) > Math.abs(dy)
      }
    }
    if (isHorizontal.current) {
      setDragX(dx)
    }
  }

  const handleTouchEnd = () => {
    const width = trackRef.current?.clientWidth ?? window.innerWidth
    const threshold = Math.min(80, width * 0.18)
    if (isHorizontal.current && Math.abs(dragX) > threshold) {
      if (dragX < 0) onNext()
      else onPrev()
    }
    setDragX(0)
    setIsDragging(false)
    touchStartX.current = null
    touchStartY.current = null
    isHorizontal.current = null
  }

  if (!mounted) return null

  // Cap the visible dots so a 30-photo listing doesn't render a 30-dot rail.
  // Show up to 7 dots; if there are more, render a compact window of 5 dots
  // with mini end-dots that hint at the longer list.
  const MAX_DOTS = 7
  const showCompactDots = images.length > MAX_DOTS

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      className="fixed inset-0 z-[2147483647] flex flex-col bg-black/95"
    >
      <div className="flex items-center justify-between px-4 py-3 text-white">
        <p className="text-sm">
          {index + 1} / {images.length}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full p-2 hover:bg-white/10"
          aria-label="Close photo viewer"
        >
          <X className="size-5" />
        </button>
      </div>

      <div className="relative flex flex-1 flex-col">
        {/* Desktop arrows — hidden on touch-first viewports where swipe wins */}
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:block"
          aria-label="Previous photo"
        >
          <ChevronLeft className="size-6" />
        </button>

        {/* Swipeable track: a horizontal row of full-width slides translated
            by index. Touch handlers add the in-flight drag offset so the
            slide follows the finger before snapping on release. */}
        <div
          ref={trackRef}
          className="relative flex flex-1 touch-pan-y overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex h-full w-full"
            style={{
              transform: `translateX(calc(${-index * 100}% + ${dragX}px))`,
              transition: isDragging
                ? 'none'
                : 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {images.map((url, i) => (
              <div
                key={`${url}-slide-${i}`}
                className="relative flex h-full w-full shrink-0 items-center justify-center px-4"
              >
                <div className="relative h-full max-h-[70vh] w-full max-w-6xl">
                  <Image
                    src={url}
                    alt={`${propertyName} — photo ${i + 1}`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    unoptimized
                    priority={i === index}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={onNext}
          className="absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 sm:block"
          aria-label="Next photo"
        >
          <ChevronRight className="size-6" />
        </button>

        {/* Pagination dots — wrapped in a frosted pill so they read as a
            clear, tappable indicator instead of three tiny marks floating
            on the void. Sized up (h-2 dots, w-8 active) to match the
            visual weight of the rest of the lightbox chrome. */}
        {images.length > 1 && (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 backdrop-blur-md ring-1 ring-white/15">
              {showCompactDots ? (
                <CompactDots
                  total={images.length}
                  index={index}
                  onSelect={onSelect}
                />
              ) : (
                images.map((_, i) => (
                  <button
                    key={`dot-${i}`}
                    type="button"
                    onClick={() => onSelect(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === index
                        ? 'w-8 bg-white'
                        : 'w-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Show photo ${i + 1}`}
                    aria-current={i === index ? 'true' : undefined}
                  />
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Thumbnail strip — desktop only. On mobile the dots + swipe are the
          primary navigation, and a thumbnail rail would crowd the viewport. */}
      <div className="hidden border-t border-white/10 bg-black/60 p-3 sm:block">
        <div className="mx-auto flex max-w-6xl gap-2 overflow-x-auto">
          {images.map((url, i) => (
            <button
              key={`${url}-thumb-${i}`}
              type="button"
              onClick={() => onSelect(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-md transition ${
                i === index
                  ? 'ring-2 ring-[#10B981]'
                  : 'opacity-60 hover:opacity-100'
              }`}
              aria-label={`Show photo ${i + 1}`}
            >
              <Image
                src={url}
                alt=""
                fill
                className="object-cover"
                sizes="96px"
                unoptimized
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}

function CompactDots({
  total,
  index,
  onSelect,
  variant = 'dark',
}: {
  total: number
  index: number
  onSelect: (i: number) => void
  /** 'dark' = dots on a dark surface (lightbox); 'light' = dots on a light surface (page). */
  variant?: 'dark' | 'light'
}) {
  // Sliding 5-dot window centered on the active index, clamped to ends.
  const windowSize = 5
  const half = Math.floor(windowSize / 2)
  let start = Math.max(0, index - half)
  const end = Math.min(total, start + windowSize)
  start = Math.max(0, end - windowSize)
  const dots: number[] = []
  for (let i = start; i < end; i++) dots.push(i)

  const activeClass =
    variant === 'dark' ? 'w-8 bg-white' : 'w-6 bg-white'
  const idleClass =
    variant === 'dark'
      ? 'w-2 bg-white/50 hover:bg-white/80'
      : 'w-1.5 bg-white/55 hover:bg-white/80'
  const ellipsisClass =
    variant === 'dark' ? 'bg-white/35' : 'bg-white/55'
  const dotHeight = variant === 'dark' ? 'h-2' : 'h-1.5'

  return (
    <>
      {start > 0 && (
        <span className={`h-1 w-1 rounded-full ${ellipsisClass}`} aria-hidden />
      )}
      {dots.map((i) => (
        <button
          key={`dot-${i}`}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onSelect(i)
          }}
          className={`${dotHeight} rounded-full transition-all ${
            i === index ? activeClass : idleClass
          }`}
          aria-label={`Show photo ${i + 1}`}
          aria-current={i === index ? 'true' : undefined}
        />
      ))}
      {end < total && (
        <span className={`h-1 w-1 rounded-full ${ellipsisClass}`} aria-hidden />
      )}
    </>
  )
}

// ---------------------------------------------------------------------------
// Sign-in gate
// ---------------------------------------------------------------------------

function SignInGate({
  children,
  city,
}: {
  children: React.ReactNode
  /** City of the property being viewed. Forwarded to the portal lead API
   *  so the Zoho CRM record carries the location of the listing the
   *  tenant inquired about. Without this, the lead arrives blank for
   *  city and routing/segmentation breaks. */
  city?: string | null
}) {
  // Two-step ticket flow:
  //   1. Card with a single "Create a Ticket" CTA (low-friction entry).
  //   2. Inline form (name, email, phone, message) — much shorter than the
  //      portal's full account-creation flow, no password required.
  //   3. Success state — listing details are revealed.
  const [step, setStep] = useState<'cta' | 'form' | 'done'>('cta')
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  // Format 10-digit phone into the (XXX) XXX-XXXX shape the API expects.
  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, '').slice(0, 10)
    if (digits.length < 4) return digits
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone) return
    setSubmitting(true)
    try {
      const parts = form.name.trim().split(/\s+/)
      const firstName = parts[0] || form.name
      const lastName = parts.slice(1).join(' ') || firstName
      // Fire-and-forget POST to the existing contact endpoint. The visitor
      // doesn't have to wait — we reveal the listing as soon as it's queued.
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'tenant',
          firstName,
          lastName,
          email: form.email,
          phone: form.phone,
          // `city` ships the location of the listing the tenant is
          // inquiring about — required by the portal lead API so the
          // Zoho CRM record isn't blank for city.
          city: city || undefined,
          message:
            form.message ||
            'Requesting more details on this listing via property page.',
          source: 'listing-ticket',
        }),
      }).catch(() => {
        /* swallow — non-blocking */
      })
    } finally {
      setSubmitting(false)
      setStep('done')
    }
  }

  if (step === 'done') {
    return <>{children}</>
  }

  return (
    <div className="relative">
      {/* Blurred + locked content underneath */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none blur-sm filter"
      >
        {children}
      </div>

      {/* Overlay scrim */}
      <div className="pointer-events-none absolute inset-0 bg-white/40" />

      {/* Ticket card */}
      <div className="absolute inset-0 flex items-start justify-center px-4 pt-16 sm:pt-24">
        <div className="pointer-events-auto sticky top-24 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl sm:p-8">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-[#10B981]">
              <Ticket className="size-5" />
            </span>
            <div>
              <h3 className="font-display text-lg text-[#0B1D3A] sm:text-xl">
                {step === 'cta'
                  ? 'Request full listing details'
                  : 'Tell us how to reach you'}
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                {step === 'cta'
                  ? 'Open a quick ticket and a leasing specialist will follow up — no account required.'
                  : 'Takes 30 seconds. We’ll unlock the listing instantly.'}
              </p>
            </div>
          </div>

          {step === 'cta' ? (
            <>
              <ul className="mt-5 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#10B981]" />
                  <span>Get pricing, address, and full photo set</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#10B981]" />
                  <span>Book a viewing on your schedule</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#10B981]" />
                  <span>A real person responds, usually within an hour</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => setStep('form')}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#059669]"
              >
                <Ticket className="size-4" />
                Create a Ticket
              </button>

              <p className="mt-4 text-center text-[11px] leading-relaxed text-slate-500">
                By submitting a ticket you agree to our Terms. Listing data is
                provided for personal, non-commercial use only.
              </p>
            </>
          ) : (
            <form onSubmit={handleSubmit} className="mt-5 space-y-3">
              <label className="block">
                <span className="sr-only">Full name</span>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-[#0B1D3A] outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </label>

              <label className="block">
                <span className="sr-only">Email</span>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-[#0B1D3A] outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </label>

              <label className="block">
                <span className="sr-only">Phone</span>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="(123) 456-7890"
                    value={form.phone}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, phone: formatPhone(e.target.value) }))
                    }
                    className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-[#0B1D3A] outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </label>

              <label className="block">
                <span className="sr-only">Message (optional)</span>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 size-4 text-slate-400" />
                  <textarea
                    rows={3}
                    placeholder="What would you like to know? (optional)"
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    className="w-full resize-none rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-[#0B1D3A] outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </label>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#10B981] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#059669] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? 'Submitting…' : 'Submit Ticket & Unlock'}
              </button>

              <button
                type="button"
                onClick={() => setStep('cta')}
                className="mt-1 w-full text-center text-xs text-slate-500 hover:text-[#0B1D3A]"
              >
                ← Back
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Exports
// ---------------------------------------------------------------------------

export function PropertyMediaTabs(props: {
  images: string[]
  propertyName: string
  address: string
  lat?: string | null
  lng?: string | null
}) {
  // Memoize the images array reference so the child doesn't reset state on
  // every parent rerender (the array literal would otherwise change identity).
  const images = useMemo(() => props.images, [props.images])
  return (
    <MediaTabs
      images={images}
      propertyName={props.propertyName}
      address={props.address}
      lat={props.lat}
      lng={props.lng}
    />
  )
}

export function PropertyGate({
  children,
  city,
}: {
  children: React.ReactNode
  /** Forwarded to the listing-ticket POST so every Zoho lead from a
   *  property page carries the listing's city. */
  city?: string | null
}) {
  return <SignInGate city={city}>{children}</SignInGate>
}

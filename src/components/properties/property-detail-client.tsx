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

import { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import {
  X,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  Map as MapIcon,
  Camera,
  Lock,
  Mail,
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
  const [tab, setTab] = useState<Tab>('photos')
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
        className="mb-4 flex w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-sm"
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
      className={`flex flex-1 items-center justify-center gap-2 px-4 py-3 font-medium transition-colors ${
        active
          ? 'bg-[#0B1D3A] text-white'
          : 'text-slate-600 hover:bg-slate-50 hover:text-[#0B1D3A]'
      }`}
    >
      {icon}
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
    <div className="grid grid-cols-4 gap-2 md:grid-cols-4 md:gap-3">
      <button
        type="button"
        onClick={() => onOpen(0)}
        className="group relative col-span-4 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100 md:col-span-3 md:row-span-2"
        aria-label="Open photo 1 in fullscreen"
      >
        <Image
          src={cover}
          alt={propertyName}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, 60vw"
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
            className="group relative col-span-2 aspect-[4/3] overflow-hidden rounded-xl bg-slate-100 md:col-span-1"
            aria-label={`Open photo ${realIndex + 1} in fullscreen`}
          >
            <Image
              src={url}
              alt={`${propertyName} — photo ${realIndex + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
              sizes="(max-width: 768px) 50vw, 20vw"
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
  const current = images[index]

  // Portal-mount only after hydration to avoid SSR document mismatch.
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) return null

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

      <div className="relative flex flex-1 items-center justify-center px-4">
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          aria-label="Previous photo"
        >
          <ChevronLeft className="size-6" />
        </button>

        <div className="relative h-[70vh] w-full max-w-6xl">
          <Image
            src={current}
            alt={`${propertyName} — photo ${index + 1}`}
            fill
            className="object-contain"
            sizes="100vw"
            unoptimized
          />
        </div>

        <button
          type="button"
          onClick={onNext}
          className="absolute right-4 z-10 rounded-full bg-white/10 p-3 text-white hover:bg-white/20"
          aria-label="Next photo"
        >
          <ChevronRight className="size-6" />
        </button>
      </div>

      {/* Thumbnail strip */}
      <div className="border-t border-white/10 bg-black/60 p-3">
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

// ---------------------------------------------------------------------------
// Sign-in gate
// ---------------------------------------------------------------------------

function SignInGate({
  children,
}: {
  children: React.ReactNode
}) {
  // TODO: wire real auth via Revun portal SSO when sign-in flow ships.
  const [loggedIn, setLoggedIn] = useState(false)
  const [email, setEmail] = useState('')

  const handleGoogle = () => {
    setLoggedIn(true)
  }

  const handleEmail = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setLoggedIn(true)
  }

  if (loggedIn) {
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

      {/* Sign-in card */}
      <div className="absolute inset-0 flex items-start justify-center pt-24">
        <div className="pointer-events-auto sticky top-24 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-full bg-emerald-100 text-[#10B981]">
              <Lock className="size-5" />
            </span>
            <div>
              <h3 className="font-display text-xl text-[#0B1D3A]">
                Sign in to see full listing details
              </h3>
              <p className="mt-1 text-xs text-slate-500">
                MLS data is gated to verified users per RECO requirements.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogle}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-[#0B1D3A] shadow-sm transition hover:bg-slate-50"
          >
            <GoogleIcon className="size-4" />
            Continue with Google
          </button>

          <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-wider text-slate-400">
            <span className="h-px flex-1 bg-slate-200" />
            <span>or</span>
            <span className="h-px flex-1 bg-slate-200" />
          </div>

          <form onSubmit={handleEmail} className="space-y-3">
            <label className="block">
              <span className="sr-only">Email</span>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-10 pr-3 text-sm text-[#0B1D3A] outline-none transition focus:border-[#10B981] focus:ring-2 focus:ring-emerald-100"
                />
              </div>
            </label>
            <button
              type="submit"
              className="w-full rounded-lg bg-[#10B981] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#059669]"
            >
              Continue with Email
            </button>
          </form>

          <p className="mt-5 text-center text-[11px] leading-relaxed text-slate-500">
            By continuing you agree to our Terms and acknowledge that listing
            data is provided for personal, non-commercial use only.
          </p>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#4285F4"
        d="M21.6 12.227c0-.708-.064-1.39-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.995 3.018v2.51h3.227c1.887-1.74 2.986-4.302 2.986-7.35Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.7 0 4.964-.895 6.614-2.422l-3.227-2.51c-.895.6-2.04.954-3.387.954-2.605 0-4.81-1.76-5.6-4.124H3.064v2.59A9.996 9.996 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.4 13.898A5.99 5.99 0 0 1 6.077 12c0-.66.114-1.3.323-1.898V7.512H3.064a9.996 9.996 0 0 0 0 8.976l3.336-2.59Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.977c1.468 0 2.786.504 3.823 1.495l2.868-2.868C16.96 2.99 14.695 2 12 2A9.996 9.996 0 0 0 3.064 7.512l3.336 2.59C7.19 7.737 9.395 5.977 12 5.977Z"
      />
    </svg>
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

export function PropertyGate({ children }: { children: React.ReactNode }) {
  return <SignInGate>{children}</SignInGate>
}

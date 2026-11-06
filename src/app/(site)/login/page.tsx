import type { Metadata } from 'next'
import Link from 'next/link'
import {
  ArrowUpRight,
  Briefcase,
  Building2,
  Home,
  KeyRound,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

import {
  PORTAL_OWNER_SIGNUP_URL,
  PORTAL_REGISTER_URL,
  portalLoginUrl,
  type PortalLoginRole,
} from '@/lib/portal-api'

export const metadata: Metadata = {
  title: 'Login | MoveSmart Rentals',
  description:
    'Sign in to your MoveSmart Rentals portal account. Choose landlord, tenant, institutional, or staff login.',
  alternates: {
    canonical: '/login/',
  },
}

type LoginOption = {
  role: PortalLoginRole
  title: string
  description: string
  icon: LucideIcon
}

const LOGIN_OPTIONS: LoginOption[] = [
  {
    role: 'landlord',
    title: 'Landlord',
    description: 'Track showings, review applicants, approve leases, and see your documents.',
    icon: Home,
  },
  {
    role: 'tenant',
    title: 'Tenant',
    description: 'Check your application, sign your lease, and manage your move-in.',
    icon: KeyRound,
  },
  {
    role: 'institution',
    title: 'Institutions',
    description: 'Portfolio and lease-up reporting across every building and unit.',
    icon: Building2,
  },
  {
    role: 'staff',
    title: 'Staff',
    description: 'MoveSmart team access to leasing operations and the CRM.',
    icon: Briefcase,
  },
]

export default function LoginPage() {
  return (
    <main className="relative overflow-hidden bg-slate-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-brand-navy/[0.06] to-transparent"
      />

      <section className="relative mx-auto max-w-4xl px-4 py-14 sm:px-6 sm:py-20">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Secure portal login
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-brand-navy sm:text-4xl">
            Log in to MoveSmart
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-slate-600">
            Choose your account type to continue to the portal.
          </p>
        </div>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {LOGIN_OPTIONS.map(({ role, title, description, icon: Icon }) => (
            <li key={role}>
              <a
                href={portalLoginUrl(role)}
                className="group flex h-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-emerald sm:p-6"
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-navy/5 text-brand-navy transition-colors duration-200 group-hover:bg-emerald-50 group-hover:text-emerald-700">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="text-lg font-semibold text-brand-navy">{title}</span>
                    <ArrowUpRight
                      className="size-4 shrink-0 text-slate-400 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-emerald-600"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-slate-600">
                    {description}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-5 text-center text-sm text-slate-600 sm:p-6">
          <p>
            New landlord?{' '}
            <a
              href={PORTAL_OWNER_SIGNUP_URL}
              className="font-semibold text-emerald-700 underline-offset-4 hover:underline"
            >
              List your property
            </a>
            {' · '}
            Don&apos;t have an account?{' '}
            <a
              href={PORTAL_REGISTER_URL}
              className="font-semibold text-emerald-700 underline-offset-4 hover:underline"
            >
              Create one
            </a>
          </p>
          <p className="mt-2">
            Trouble signing in?{' '}
            <Link
              href="/contact/"
              className="font-semibold text-brand-navy underline-offset-4 hover:underline"
            >
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </main>
  )
}

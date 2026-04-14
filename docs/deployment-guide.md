# MoveSmart Rentals — Vercel Deployment Guide

This document is the single source of truth for deploying MoveSmart Rentals
(Next.js 15 App Router + Sanity CMS + GTM) to Vercel. A developer with repo
access and Vercel team access should be able to take the site from "fresh
clone" to "live on the production domain" using only this guide.

Production domain (reference): `movesmartrentals.com`
Head office: 1 King St W, Suite 4801, Toronto, ON M5H 1A1

---

## 1. Pre-flight checklist

Do not skip this section. Each item has bitten past deploys.

- [ ] All env vars from `.env.example` are filled in and set in Vercel
      (Project → Settings → Environment Variables). See section 5 for the
      full reference and scope recommendations.
- [ ] `npm install` runs cleanly on Node 20+ (Vercel default).
- [ ] `npm run build` passes locally against a production-shape `.env.local`
      (i.e. real Sanity project + dataset). This is the single best signal
      that the deploy will succeed.
- [ ] `npx tsc --noEmit` returns zero errors. The build step in Next.js 15
      will not catch every type issue across dynamic route params.
- [ ] `npx eslint .` is green (or at least free of new errors vs. main).
- [ ] Sanity project exists with the correct dataset (usually `production`)
      and at least the following documents are published:
    - Homepage settings
    - One `service` document
    - One `city` document
    - One `resource`/guide document
      Without these, the home and top-level template pages will render
      empty shells and the sitemap will be underpopulated.
- [ ] Logo files are present at `public/logo.png` and `public/logo.svg`.
- [ ] Hero / city / service images are either uploaded to Sanity (preferred)
      or the placeholder strategy in `src/components/illustrations/*` is
      acknowledged. Do not ship placeholder strings that read "TODO".
- [ ] Brand colors in `src/app/globals.css` match the locked palette
      (navy / emerald / gold). Do not change these at deploy time.
- [ ] GTM container is created in tagmanager.google.com, has at least GA4
      configuration tag firing on All Pages, and the container is
      **published** (not just saved in a workspace).
- [ ] `next.config.ts` still contains the legacy redirect list from
      `src/data/legacy-redirects.ts`. Any loss of this list will cause
      ranking URLs to 404.

---

## 2. Domain + DNS

### Primary domain

- Apex: `movesmartrentals.com`
- WWW: `www.movesmartrentals.com` (configured as 308 redirect to apex
  via Vercel's domain settings — do NOT set this with a DNS CNAME to
  a third party)

### DNS records at the registrar

Use whichever pair Vercel shows you in Project → Settings → Domains:

- **Apex**: an `A` record pointing to `76.76.21.21` (Vercel's anycast IP),
  OR an `ALIAS`/`ANAME` record to `cname.vercel-dns.com` if the registrar
  supports flattening.
- **WWW**: a `CNAME` pointing to `cname.vercel-dns.com`.

TTL: 3600 is a sane default. Drop to 300 for the first 24 hours if you
expect to re-point.

### SSL

Vercel auto-provisions Let's Encrypt certs as soon as DNS resolves.
Verify in Project → Settings → Domains that both apex and www show the
green checkmark. If SSL is stuck in "Issuing" for more than 15 minutes,
it's almost always a CAA record at the registrar blocking letsencrypt.org
— delete the CAA or add `letsencrypt.org` to its value list.

### Redirect direction

Set `movesmartrentals.com` as the **Production** domain and
`www.movesmartrentals.com` as a **Redirect to** the apex. Google should
canonicalize to the apex because `src/app/layout.tsx` builds
`metadataBase` from `NEXT_PUBLIC_SITE_URL` — keep that variable set to
the apex with no `www`.

---

## 3. Vercel setup steps

1. **Push the repo** to GitHub (or GitLab/Bitbucket — GitHub is preferred
   for preview deploy comments). Default branch: `main`.
2. **Import to Vercel**: vercel.com/new → Import Git Repository → pick
   the MoveSmart repo.
3. **Framework preset**: Vercel auto-detects Next.js. Leave it.
4. **Root directory**: repo root. Do not change.
5. **Build & output settings**: keep the defaults from `vercel.json`
   in this repo:
    - Build command: `next build`
    - Install command: `npm install`
    - Output directory: `.next`
6. **Node version**: 20.x (set in Project → Settings → General → Node.js
   Version). Older versions will fail on newer ESM dependencies.
7. **Region**: `iad1` (US East — Washington D.C.). Set by `vercel.json`.
   This keeps latency low for both Toronto and the US tier-1 cities the
   content plan targets. Do not over-optimize by enabling multi-region
   before there is measured traffic to justify it — it multiplies the
   function invocation bill.
8. **Environment variables**: paste every variable from the filled-in
   `.env.example` (see section 5 for scopes). Save.
9. **First deploy**: click Deploy. The build should take 4–7 minutes.
10. **Preview verification**: open the `*.vercel.app` preview URL Vercel
    returns. Do a quick smoke test (homepage, one city page, one service
    page, contact form, `/sitemap.xml`). Only then:
11. **Assign production domain**: Project → Settings → Domains → Add
    `movesmartrentals.com`. Vercel will prompt for DNS. Once DNS
    propagates, it auto-promotes.

---

## 4. Post-deploy verification

Run this checklist against the live production URL after the first go-live
and after any subsequent major release.

**Core rendering**
- [ ] `/` returns 200 and shows the hero, services, and city grids.
- [ ] `/ca/on/toronto/` (or equivalent tier-1 city) returns 200.
- [ ] `/ca/on/toronto/rentals/[any-slug]/` — pick a real Sanity doc and
      confirm it renders.
- [ ] `/services/leasing/` returns 200.
- [ ] `/resources/` index returns 200, a guide detail page renders
      PortableText and Sanity images.
- [ ] `/contact/` renders and the form submits end-to-end (see reCAPTCHA
      check below).
- [ ] `/about/`, `/pricing/`, `/owners/`, `/franchising/`, `/reviews/`,
      `/portal-and-technology/`, `/privacy/`, `/terms/`, `/faq/`.

**SEO surface**
- [ ] `/robots.txt` — allows all bots, references the sitemap index.
- [ ] `/sitemap-index.xml` — returns XML, references sub-sitemaps.
- [ ] `/sitemap-core.xml`, `/sitemap-ca.xml`, `/sitemap-us.xml`,
      `/sitemap-resources.xml` all return populated XML.
- [ ] Submit `https://movesmartrentals.com/sitemap-index.xml` to
      Google Search Console (Sitemaps section).
- [ ] Submit the same URL to Bing Webmaster Tools.
- [ ] Meta verification: confirm `NEXT_PUBLIC_GSC_VERIFICATION` and
      `NEXT_PUBLIC_BING_VERIFICATION` tokens render in the `<head>`
      (view-source on the homepage).
- [ ] Share any page URL to Slack / LinkedIn / X and confirm the OG
      image, title, and description render correctly. Use
      opengraph.xyz or Meta's Sharing Debugger to clear caches.

**Analytics**
- [ ] GTM container fires on page load. Use GTM Preview mode against
      the production URL and confirm `gtm.js` and `gtm.dom` events.
- [ ] GA4 real-time report shows the test session.
- [ ] Trigger one test conversion event (e.g. click the "Create a
      Free Account" / "Book a Consultation" CTA) and confirm the
      `dataLayer` push in the browser console: `window.dataLayer`.

**Revalidation webhook**
- [ ] In Sanity → API → Webhooks, create (or verify) a webhook pointing
      to `https://movesmartrentals.com/api/revalidate` with the secret
      matching `SANITY_WEBHOOK_SECRET`. Trigger-type: `Create, Update,
      Delete`. Filter: leave empty for first deploy, tighten later.
- [ ] Publish a draft edit on a resource. Within ~10 seconds, refresh
      the corresponding live page and confirm the change.

**Forms**
- [ ] Submit the contact form with a test payload. Confirm the
      confirmation UI shows and the payload lands wherever
      `/api/contact` is wired (email service / CRM / inbox).
- [ ] reCAPTCHA v3: if `RECAPTCHA_SECRET_KEY` is set, confirm bad
      scores are rejected by submitting from an automated tool.

---

## 5. Environment variables reference

All variables are defined in `.env.example` with inline documentation.
Copy-paste that file into the Vercel dashboard, fill in real values,
and assign scopes as below.

| Variable | Type | Production | Preview | Development |
|---|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | public | prod apex URL | preview URL or prod apex | `http://localhost:3000` |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | public | real | real | real |
| `NEXT_PUBLIC_SANITY_DATASET` | public | `production` | `production` or `staging` | `development` or `production` |
| `SANITY_API_READ_TOKEN` | server | viewer token | viewer token | viewer token |
| `SANITY_API_WRITE_TOKEN` | server | editor token (seed only) | leave blank | editor token for local seeds |
| `SANITY_WEBHOOK_SECRET` | server | random 32-byte hex | same as prod | same as prod |
| `NEXT_PUBLIC_GTM_ID` | public | `GTM-XXXXXXX` | blank or staging GTM | blank |
| `NEXT_PUBLIC_GA4_PROPERTY_ID` | public | prod GA4 property | blank | blank |
| `NEXT_PUBLIC_LOOKER_STUDIO_URL` | public | prod dashboard URL | same | same |
| `NEXT_PUBLIC_SALESIQ_WIDGET_CODE` | public | prod widget code | blank | blank |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | public | prod v3 site key | test key | test key |
| `RECAPTCHA_SECRET_KEY` | server | prod v3 secret | test secret | test secret |
| `NEXT_PUBLIC_GSC_VERIFICATION` | public | real token | blank | blank |
| `NEXT_PUBLIC_GSC_PROPERTY_URL` | public | real URL | same | same |
| `NEXT_PUBLIC_BING_VERIFICATION` | public | real token | blank | blank |

**Scope rules**
- Never put a secret (anything without the `NEXT_PUBLIC_` prefix) into
  an env var that is imported from a client component — Next.js will
  throw at build time.
- Preview deploys should *not* inherit the production GTM container —
  analytics from preview branches will pollute real attribution data.
- `SANITY_API_WRITE_TOKEN` should be absent in Production; it is only
  needed for seed scripts run from a developer laptop.

---

## 6. Common deployment errors + fixes

**"Cannot find module" or missing env var at build time**
Set the missing variable in Vercel → Environment Variables and redeploy.
For `NEXT_PUBLIC_*` vars, a redeploy is required — they're baked into
the client bundle at build time and will not pick up a post-build change.

**Sanity images return 404 or "dataset not found"**
`NEXT_PUBLIC_SANITY_DATASET` does not match the dataset name in
sanity.io/manage. Check casing exactly (`production` ≠ `Production`).

**"Module not found: Can't resolve '@sanity/...'" in build logs**
`npm install` step was skipped or the lockfile is stale. Delete the
build cache (Project → Settings → General → Build Cache → Clear) and
redeploy.

**TypeScript build failure**
Run `npx tsc --noEmit` locally. The failure is almost always in a
dynamic route's `generateStaticParams` returning `undefined` because a
Sanity field is missing on a doc. Fix the doc or guard the field.

**Build timeout (>45 min)**
Too many static params. `generateStaticParams` for `/ca/[province]/
[city]/[service]/[bedroom]/` can fan out into thousands of pages. If
this triggers, either:
1. Narrow the fan-out by filtering to published cities only.
2. Convert the route to `dynamic = 'force-static'` + `dynamicParams = true`
   and let less-trafficked combos render on first hit.
3. Increase function duration / memory in `vercel.json` (`functions`
   block). Default 10s per serverless function; up to 60s on Pro.

**OOM during prerender**
Same root cause as above. Reduce the cardinality of static params or
split the route's data-fetching into per-page fetches instead of one
giant `groq` pull.

**Sanity webhook 401**
`SANITY_WEBHOOK_SECRET` in Vercel ≠ secret configured on the Sanity
webhook. They must match exactly. Re-generate and update both sides.

**GTM fires on localhost but not production**
`NEXT_PUBLIC_GTM_ID` is not set for the Production environment in
Vercel (easy to miss if you only set Development). Resave with all
three environments checked and redeploy.

---

## 7. Monitoring

**Built-in**
- **Vercel Analytics** — enable in Project → Analytics. Free tier covers
  core web vitals and pageviews. Real User Monitoring is the fastest
  signal when a regression ships.
- **Vercel Speed Insights** — enable in the same panel for CLS / LCP /
  INP tracking.
- **Vercel Logs** — Project → Logs streams serverless function logs.
  Bookmark it for live debugging.

**External**
- **Google Analytics 4** — via the GTM container. Standard reports plus
  any custom events wired in GTM.
- **Google Search Console** — submit the sitemap, monitor Coverage and
  Core Web Vitals reports weekly.
- **Bing Webmaster Tools** — submit the sitemap, monitor crawl errors.
- **Uptime monitoring** — Vercel has a basic health signal. For real
  alerting, add Better Uptime or UptimeRobot with a 1-minute check on
  the homepage and the `/api/contact` endpoint (HEAD request).
- **Error tracking** — not currently wired. When Sentry / Rollbar is
  added, document the DSN env var in `.env.example` and this guide.

---

## 8. Rollback procedure

Vercel keeps every deploy. To roll back:

1. Go to Project → Deployments.
2. Find the last known-good deploy (sort by time, filter to "Ready").
3. Click the `...` menu → **Promote to Production**.
4. Confirm. The rollback is atomic and takes ~5 seconds.

**Discipline**
- Tag every production release in git before promoting: `git tag
  prod/YYYY-MM-DD-HHMM && git push --tags`. This gives a clean
  checkout-point if Vercel's retention window ever expires.
- If the rollback involves a schema change in Sanity, the rollback is
  not safe on its own — you must also revert or migrate the Sanity
  dataset. Document schema changes in the commit message.
- Never rollback to bypass a security patch. If a rollback is needed
  for a regression that coincides with a patch, cherry-pick the patch
  onto the rolled-back commit and redeploy forward.

---

## 9. Post-launch content rollout

The launch deploy goes out with only a seeded subset of city and service
content. The full content rollout follows the content engine SOP.

- Primary SOP: `docs/content-engine-sop.md`.
- Image pipeline: `docs/image-generation-guide.md`.
- Data files: `src/data/` contains structured lists of Canadian
  provinces, Ontario tier-2 cities, US states, and US tier-1 cities
  that need to be mirrored into Sanity.
- Seed scripts (run locally, not on Vercel) live in `/scripts`:
    - `seed-canadian-provinces.ts`
    - `seed-ontario-cities.ts`
    - `seed-us-states.ts`
    - `seed-services.ts`
    - `seed-rich-content.ts`
    - `seed-city-images-v2.ts` (preferred over `seed-city-images.ts`)
    - `reseed-city-buildings.ts`
  Each script needs `SANITY_API_WRITE_TOKEN` set in the local shell.
  Never commit that token.
- Rollout order (matches the contract's geographic priority):
    1. Toronto + Ontario tier-1.
    2. Ontario tier-2.
    3. Other Canadian provinces in priority order.
    4. US tier-1 markets.
- Each city page family requires at least: city doc, 4 service variants,
  bedroom segmentations, and 2+ resource/guide docs internal-linked.

---

## 10. Troubleshooting resources

- **Vercel docs**: https://vercel.com/docs
- **Next.js App Router**: https://nextjs.org/docs/app
- **Next.js on Vercel deployment**: https://vercel.com/docs/frameworks/nextjs
- **Sanity Next.js integration**: https://www.sanity.io/docs/nextjs-app-router-live-preview
- **Sanity webhooks**: https://www.sanity.io/docs/webhooks
- **Google Tag Manager**: https://developers.google.com/tag-platform/tag-manager
- **Google Search Console**: https://support.google.com/webmasters
- **Bing Webmaster Tools**: https://www.bing.com/webmasters/help

When in doubt, `vercel logs <deployment-url> --follow` from the CLI is
the fastest way to see what a specific deploy is doing in real time.

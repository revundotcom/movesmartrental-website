# MoveSmart Rentals -- Source Code Transfer Checklist

> Last updated: 2026-03-28
>
> This document guides the transfer of the MoveSmart Rentals codebase to the
> REVUN GitHub account and provides verification steps to confirm a fresh clone
> produces a working site.

---

## 1. Pre-Transfer Verification

Complete every item before initiating the transfer.

- [ ] All source code is committed -- `git status` shows a clean working tree
- [ ] `.gitignore` properly configured:
  - `node_modules/` excluded
  - `.next/` excluded
  - `.env*.local` excluded (secrets never committed)
  - `.vercel/` excluded
  - `*.pem` excluded
  - `.env.example` is NOT ignored (explicitly allowed via `!.env.example`)
- [ ] `.env.example` is up to date with all 11 required environment variables
  (see [environment-documentation.md](./environment-documentation.md) Section 3)
- [ ] No secrets or credentials exist in any committed file
  - Verify: `git log --all -p | grep -iE "(sk_live|password|secret_key|token=)" | head -20`
  - Expected result: no matches outside `.env.example` placeholders
- [ ] README or equivalent setup documentation exists in the repo root
- [ ] Production build succeeds locally: `npm run build` exits with code 0
- [ ] All Phase 4 hardening work is committed (CWV optimization, env docs,
  CMS reference, training guide, this transfer document)

---

## 2. Repository Transfer Steps

Choose the option that matches the current situation.

### Option A: Repository Already in REVUN Account

If the repo was created under the REVUN GitHub organization from the start:

1. Verify the REVUN team has **admin** access to the repository
2. Confirm branch protection rules are set on `main` (recommended):
   - Require pull request reviews before merging
   - Require status checks to pass before merging
3. Skip to Section 3 (Clone-and-Deploy Verification)

### Option B: Transfer Existing Repository

If the repo currently lives under a different GitHub account:

1. Navigate to the repo on GitHub > **Settings** > **Danger Zone**
2. Click **Transfer ownership**
3. Enter the destination organization: `REVUN`
4. Confirm the transfer
5. GitHub automatically redirects the old URL to the new one
6. Update any CI/CD integrations (Vercel, etc.) to point to the new repo URL
7. Verify the REVUN team has **admin** access

### Option C: Push to a New REVUN Repository (Current Situation)

The codebase has no remote configured. Follow these steps:

1. **Client creates** an empty repository in the REVUN GitHub organization:
   - Repository name: `movesmart-rentals`
   - Visibility: Private (recommended)
   - Do NOT initialize with README, `.gitignore`, or license (repo already has these)

2. **Add the REVUN repo as a remote:**
   ```bash
   cd "/path/to/movesmart-rentals"
   git remote add origin https://github.com/REVUN/movesmart-rentals.git
   ```

3. **Push the main branch:**
   ```bash
   git push -u origin main
   ```

4. **Verify the push:**
   - Visit `https://github.com/REVUN/movesmart-rentals`
   - Confirm all files are present
   - Confirm commit history is intact: `git log --oneline` on GitHub matches local

5. **Set branch protection** on `main` (recommended):
   - Settings > Branches > Add rule for `main`
   - Enable: Require pull request reviews, require status checks

---

## 3. Clone-and-Deploy Verification

Follow these steps on a clean machine (or in a fresh directory) to confirm the
codebase is fully self-contained and deployable.

### 3.1 Clone and Install

```bash
# 1. Clone the repository
git clone https://github.com/REVUN/movesmart-rentals.git
cd movesmart-rentals

# 2. Verify Node.js version (18.x or later required)
node --version

# 3. Install dependencies
npm install
```

Expected: all dependencies install without errors. `node_modules/` is created.

### 3.2 Configure Environment

```bash
# 4. Create local environment file
cp .env.example .env.local
```

Open `.env.local` and fill in all values. Refer to
[environment-documentation.md](./environment-documentation.md) Section 3 for
where to obtain each credential:

| Variable                          | Source                                    |
|-----------------------------------|-------------------------------------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID`   | Sanity Dashboard > Project > Settings     |
| `NEXT_PUBLIC_SANITY_DATASET`      | Usually `production`                      |
| `SANITY_API_READ_TOKEN`           | Sanity Dashboard > API > Tokens           |
| `SANITY_WEBHOOK_SECRET`           | Random string (must match webhook config) |
| `NEXT_PUBLIC_SITE_URL`            | `https://movesmartrentals.com`            |
| `NEXT_PUBLIC_GTM_ID`              | GTM Dashboard > Container ID              |
| `NEXT_PUBLIC_GSC_VERIFICATION`    | Google Search Console > Verification      |
| `NEXT_PUBLIC_BING_VERIFICATION`   | Bing Webmaster Tools > Verification       |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`  | reCAPTCHA Admin Console > Site key        |
| `RECAPTCHA_SECRET_KEY`            | reCAPTCHA Admin Console > Secret key      |
| `NEXT_PUBLIC_SALESIQ_WIDGET_CODE` | SalesIQ Dashboard > Widget code           |

### 3.3 Local Development Verification

```bash
# 5. Start the development server
npm run dev
```

Open `http://localhost:3000` in a browser and verify:

- [ ] Homepage loads without errors
- [ ] Navigation menu renders with all city and service links
- [ ] At least one city page loads (e.g., `/ca/ontario/toronto/`)
- [ ] At least one city-service page loads (e.g., `/ca/ontario/toronto/tenant-placement/`)
- [ ] Sanity Studio loads at `/studio` (may require Sanity login)
- [ ] Contact form renders on the contact page

### 3.4 Production Build Verification

```bash
# 6. Run a production build
npm run build
```

Verify:

- [ ] Build completes with exit code 0
- [ ] No TypeScript errors
- [ ] Static pages are generated (check terminal output for page count)

```bash
# 7. Start the production server
npm start
```

Open `http://localhost:3000` and spot-check the same pages as Step 5.

### 3.5 Deploy to Vercel

```bash
# Or use the Vercel dashboard (recommended for first deploy)
```

1. Log in to [vercel.com](https://vercel.com)
2. Click **Add New Project** > **Import Git Repository**
3. Select `REVUN/movesmart-rentals`
4. Framework preset: **Next.js** (auto-detected)
5. Set all environment variables from `.env.example`:
   - Copy each variable and its production value
   - Use the Vercel dashboard Environment Variables section
6. Click **Deploy**
7. Wait for the build to complete (typically 2-4 minutes)

Post-deploy verification:

- [ ] Site loads at the Vercel-assigned URL (e.g., `movesmart-rentals.vercel.app`)
- [ ] All pages render correctly (homepage, city pages, service pages)
- [ ] Images load with AVIF/WebP optimization
- [ ] JSON-LD structured data appears in page source

### 3.6 Configure Custom Domain

1. In Vercel: Settings > Domains > Add `movesmartrentals.com`
2. Update DNS records as instructed by Vercel (CNAME or A record)
3. Vercel provisions SSL automatically
4. Verify: `https://movesmartrentals.com` loads correctly

### 3.7 Configure Sanity Webhook for ISR

Incremental Static Regeneration requires a Sanity webhook to trigger on-demand
revalidation when content changes.

1. Go to Sanity Dashboard > Project > API > Webhooks
2. Create a new webhook:
   - **Name:** `Vercel ISR Revalidation`
   - **URL:** `https://movesmartrentals.com/api/revalidate`
   - **Trigger on:** Create, Update, Delete
   - **Filter:** Leave empty (all document types)
   - **Secret:** Paste the same value used for `SANITY_WEBHOOK_SECRET`
3. Save the webhook

Refer to [environment-documentation.md](./environment-documentation.md)
Section 5 for full webhook configuration details.

### 3.8 Verify End-to-End Content Publishing

1. Open Sanity Studio at `https://movesmartrentals.com/studio`
2. Edit an existing city document (e.g., change a description)
3. Click **Publish**
4. Wait 5-10 seconds for the webhook to fire
5. Refresh the corresponding city page on the live site

- [ ] Updated content appears on the live site
- [ ] No manual deployment or rebuild was needed

---

## 4. Post-Transfer Verification Checklist

After completing the transfer and first deployment, confirm all of the following:

- [ ] REVUN team can access the repo on GitHub with admin permissions
- [ ] REVUN team can clone the repo and run `npm install` successfully
- [ ] REVUN team can start the dev server (`npm run dev`) and see the site
- [ ] REVUN team can deploy to Vercel from the GitHub integration
- [ ] Sanity Studio works at `/studio` with REVUN team credentials
- [ ] ISR revalidation fires when a document is published in Sanity
- [ ] All city pages render correctly on the deployed site
- [ ] All service pages render correctly on the deployed site
- [ ] Blog/guide pages render correctly
- [ ] Contact form submits successfully
- [ ] Google Tag Manager fires on page load (check browser dev tools > Network)
- [ ] reCAPTCHA v3 protects the contact form (check score in API response)

---

## 5. Ongoing Maintenance Notes

### What Does NOT Require a Developer

The content team can handle these independently:

| Task                          | How                                              |
|-------------------------------|--------------------------------------------------|
| Add a new city page           | Create City + CityService docs in Sanity Studio  |
| Add a new blog post           | Create BlogGuide document in Sanity Studio        |
| Update page content           | Edit and publish in Sanity Studio                 |
| Update SEO fields             | Edit metaTitle, metaDescription in Sanity Studio  |
| Add new FAQ items             | Edit FAQ documents in Sanity Studio               |
| Publish a case study          | Create CaseStudy document in Sanity Studio        |
| Update city descriptions      | Edit localBody in Sanity Studio                   |
| Change hero images            | Upload new image in Sanity Studio                 |

ISR handles automatic page updates -- no rebuild or deployment needed.

### What DOES Require a Developer

| Task                            | Why                                              |
|---------------------------------|--------------------------------------------------|
| Next.js version upgrade         | Breaking changes require code updates            |
| New page template type          | Requires new route, components, and GROQ queries |
| Sanity schema changes           | Schema changes require code + Studio updates     |
| New third-party integration     | Requires code changes and env var setup          |
| Performance optimization        | Requires profiling and code-level changes        |
| Adding new URL route patterns   | Requires Next.js routing changes                 |
| Updating Tailwind configuration | Requires config file and potentially CSS changes |
| Dependency security patches     | Run `npm audit fix` -- escalate if breaking      |

### Dependency Update Process

```bash
# Check for outdated packages
npm outdated

# Update minor/patch versions (safe)
npm update

# For major version bumps (review changelog first)
npm install <package>@latest
```

**Recommended cadence:**
- Monthly: run `npm audit` and apply security patches
- Quarterly: review `npm outdated` and update non-breaking dependencies
- Annually: evaluate Next.js major version upgrades (test thoroughly)

---

*Document: Source Code Transfer Checklist*
*Project: MoveSmart Rentals*
*Last updated: 2026-03-28*

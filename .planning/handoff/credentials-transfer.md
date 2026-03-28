# MoveSmart Rentals — Credentials Transfer Checklist

| Field | Value |
|-------|-------|
| **Date** | __________ |
| **From** | Contractor (developer) |
| **To** | MoveSmart Rentals (client) |
| **Purpose** | Transfer all service credentials and access so the client can operate the site independently without contractor involvement. |

> **IMPORTANT:** This document does NOT contain actual passwords, API keys, or
> secrets. It documents where each credential lives and what needs to be
> transferred. Actual credentials should be shared via a secure channel
> (1Password, encrypted email, or in-person).

---

## Transfer Status Summary

- [ ] 1. GitHub — Source code repository
- [ ] 2. Vercel — Hosting and deployment
- [ ] 3. Sanity CMS — Content management system
- [ ] 4. Google Tag Manager — Tag management
- [ ] 5. Google Analytics 4 — Traffic analytics
- [ ] 6. Google Search Console — Search performance
- [ ] 7. Bing Webmaster Tools — Bing search presence
- [ ] 8. Google reCAPTCHA — Form spam protection
- [ ] 9. Zoho SalesIQ — Live chat widget
- [ ] 10. Domain registrar — DNS configuration

---

## 1. GitHub (Source Code Repository)

| Field | Details |
|-------|---------|
| **Service** | GitHub |
| **URL** | https://github.com |
| **Purpose** | Hosts the source code repository for movesmart-rentals |
| **Account** | REVUN organization account |
| **Dashboard** | https://github.com/REVUN/movesmart-rentals |

**Credentials to transfer:**
- Repository admin access (owner-level permissions)
- Any deploy keys or personal access tokens used for CI/CD

**Transfer checklist:**
- [ ] Client has a GitHub account
- [ ] Client is added as admin/owner to the REVUN organization
- [ ] Client has admin access to the movesmart-rentals repository
- [ ] Any contractor personal access tokens are revoked after transfer

---

## 2. Vercel (Hosting and Deployment)

| Field | Details |
|-------|---------|
| **Service** | Vercel |
| **URL** | https://vercel.com |
| **Purpose** | Hosts the production site, handles deployments, SSL, edge CDN |
| **Dashboard** | https://vercel.com/dashboard |

**Credentials to transfer:**
- Vercel account login (email + password)
- Project ownership or team membership
- Environment variables (11 vars — see `.env.example`)

**Transfer checklist:**
- [ ] Client has a Vercel account
- [ ] Client is added as project owner or team admin
- [ ] Client can view and modify environment variables
- [ ] Client can trigger manual deployments
- [ ] Domain (movesmartrentals.com) DNS is verified in Vercel
- [ ] Contractor access is downgraded or removed after transfer

---

## 3. Sanity CMS (Content Management)

| Field | Details |
|-------|---------|
| **Service** | Sanity.io |
| **URL** | https://sanity.io |
| **Purpose** | Content management system (9 content types, Studio interface) |
| **Dashboard** | https://sanity.io/manage |
| **Studio** | https://movesmartrentals.com/studio/ |

**Credentials to transfer:**
- Sanity project admin access
- API tokens (SANITY_API_READ_TOKEN)
- Webhook secret (SANITY_WEBHOOK_SECRET)

**Transfer checklist:**
- [ ] Client has a Sanity account (sign up at sanity.io)
- [ ] Client is added as project administrator
- [ ] Client can access Sanity Studio at /studio/
- [ ] Client knows where API tokens are managed (Dashboard > API > Tokens)
- [ ] Client knows where webhooks are configured (Dashboard > API > Webhooks)
- [ ] ISR revalidation webhook is verified working
- [ ] Contractor access is downgraded after transfer

---

## 4. Google Tag Manager (Tag Management)

| Field | Details |
|-------|---------|
| **Service** | Google Tag Manager |
| **URL** | https://tagmanager.google.com |
| **Purpose** | Manages all tracking tags (GA4, conversion events, custom events) |
| **Container ID** | Stored in `NEXT_PUBLIC_GTM_ID` env var |

**Credentials to transfer:**
- GTM container admin access

**Transfer checklist:**
- [ ] Client has a Google account
- [ ] Client is added as Admin to the GTM container
- [ ] Client can view and edit tags, triggers, and variables
- [ ] Contractor access is downgraded to Read-only or removed

---

## 5. Google Analytics 4 (Traffic Analytics)

| Field | Details |
|-------|---------|
| **Service** | Google Analytics 4 |
| **URL** | https://analytics.google.com |
| **Purpose** | Tracks site traffic, user behavior, conversions, and CTA clicks |
| **Property** | MoveSmart Rentals GA4 property |

**Credentials to transfer:**
- GA4 property admin access

**Transfer checklist:**
- [ ] Client Google account is added as Admin to GA4 property
- [ ] Client can view real-time reports, acquisition, and engagement data
- [ ] Looker Studio dashboard is shared with client
- [ ] Contractor access is downgraded or removed

---

## 6. Google Search Console (Search Performance)

| Field | Details |
|-------|---------|
| **Service** | Google Search Console |
| **URL** | https://search.google.com/search-console |
| **Purpose** | Monitors search rankings, indexing status, crawl health |
| **Verification** | HTML meta tag via `NEXT_PUBLIC_GSC_VERIFICATION` env var |

**Credentials to transfer:**
- Property owner access (not just user — owner can manage other users)

**Transfer checklist:**
- [ ] Client Google account is added as **Owner** of the GSC property
- [ ] Client can view Performance, Coverage, and Sitemaps reports
- [ ] XML sitemap is submitted and accepted
- [ ] Contractor retains read-only access during warranty period, then removed

---

## 7. Bing Webmaster Tools (Bing Search Presence)

| Field | Details |
|-------|---------|
| **Service** | Bing Webmaster Tools |
| **URL** | https://www.bing.com/webmasters |
| **Purpose** | Monitors Bing search indexing and performance |
| **Verification** | HTML meta tag via `NEXT_PUBLIC_BING_VERIFICATION` env var |

**Credentials to transfer:**
- Site admin access

**Transfer checklist:**
- [ ] Client has a Microsoft account
- [ ] Client is added as admin to the Bing Webmaster Tools site
- [ ] Site verification is confirmed active
- [ ] XML sitemap is submitted

---

## 8. Google reCAPTCHA (Form Spam Protection)

| Field | Details |
|-------|---------|
| **Service** | Google reCAPTCHA v3 |
| **URL** | https://www.google.com/recaptcha/admin |
| **Purpose** | Protects contact form from spam bots |
| **Keys** | Site key (`NEXT_PUBLIC_RECAPTCHA_SITE_KEY`) + Secret key (`RECAPTCHA_SECRET_KEY`) |

**Credentials to transfer:**
- reCAPTCHA admin console access
- Site key and secret key

**Transfer checklist:**
- [ ] Client Google account is added as owner of the reCAPTCHA site
- [ ] Client can view spam scores and traffic reports
- [ ] Client knows where keys are referenced (Vercel env vars)
- [ ] If contractor-owned: transfer site ownership or create new keys under client account

---

## 9. Zoho SalesIQ (Live Chat Widget)

| Field | Details |
|-------|---------|
| **Service** | Zoho SalesIQ |
| **URL** | https://salesiq.zoho.com |
| **Purpose** | Live chat widget for visitor engagement |
| **Widget Code** | Stored in `NEXT_PUBLIC_SALESIQ_WIDGET_CODE` env var |

**Credentials to transfer:**
- SalesIQ portal admin access
- Widget code identifier

**Transfer checklist:**
- [ ] Client has a Zoho account
- [ ] Client is added as admin to the SalesIQ portal
- [ ] Client can configure chat availability, operator settings, and routing
- [ ] Client knows widget code is referenced in Vercel env vars
- [ ] Contractor access is removed after transfer

---

## 10. Domain Registrar (DNS Configuration)

| Field | Details |
|-------|---------|
| **Service** | Domain registrar (client-owned) |
| **Domain** | movesmartrentals.com |
| **Purpose** | DNS records pointing to Vercel hosting |

**Note:** The domain is assumed to be under client control already. The
following DNS records must remain configured:

**DNS records pointing to Vercel:**
- A record or CNAME pointing to Vercel's servers
- Verify in Vercel Dashboard > Project > Settings > Domains

**Transfer checklist:**
- [ ] Client confirms they control DNS for movesmartrentals.com
- [ ] DNS records are documented (A/CNAME pointing to Vercel)
- [ ] Client can modify DNS records independently if needed
- [ ] No contractor DNS access needs to be revoked

---

## Post-Transfer Verification

After all credentials are transferred, verify the client can independently:

- [ ] Log into Sanity Studio and publish a test page
- [ ] View the published page live on the site within 60 seconds
- [ ] Access GA4 and see real-time traffic data
- [ ] Access GSC and view search performance reports
- [ ] View and modify Vercel environment variables
- [ ] Trigger a manual Vercel deployment
- [ ] Access GTM and view configured tags

---

## Security Notes

1. **Revoke contractor access** to all services after the 30-day warranty period
2. **Rotate API tokens** (Sanity, reCAPTCHA) if shared via insecure channels
3. **Enable 2FA** on all service accounts (GitHub, Vercel, Google, Zoho)
4. **Store credentials** in a password manager (1Password, Bitwarden, etc.)
5. **Never commit** real credentials to the GitHub repository

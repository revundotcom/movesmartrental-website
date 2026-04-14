# MoveSmart Rentals — Image Generation SOP

This is the standard operating procedure for sourcing, generating, reviewing, and publishing hero and editorial imagery across the MoveSmart Rentals website. It is written for the internal content team and any contract partners (designers, photographers, prompt engineers) who contribute visual assets to the site.

The guide pairs with two code artifacts:

- `src/data/image-prompts.ts` — the structured prompt catalog (city, service, guide, OG share).
- `src/components/brand/city-hero-placeholder.tsx` and `src/components/brand/service-hero-placeholder.tsx` — the brand-safe SVG placeholders that render wherever a real image has not been published yet.

---

## 1. Brand visual direction recap

From the design brief, section 11 — Photography & Imagery:

- **Positioning:** more premium than SPM, more service-driven than Revun, more disciplined than traditional brokerages. Visual language must read "institutional concierge," not "residential agent."
- **Mood:** editorial, architectural, restrained. Think property investment quarterly cover, not classified-listing photography.
- **Color grading:** muted, film-like. Navy `#001E57` shadows, emerald `#009966` mid-tones, warm brass `#D4A853` highlights, ivory `#FBFAF6` soft architectural light. Never neon, never over-saturated.
- **People:** used sparingly. When present, they are incidental or partially out-of-frame; we do not show performative smiles, staged handshakes, or generic stock clichés. Body language is calm and deliberate.
- **Architecture:** purpose-built rental buildings, considered interiors, herringbone / wide-plank parquet, tall windows with sheer linen. Where we show residential streets, we favour mature tree canopy and century homes over subdivision banality.
- **Voice carrier:** imagery reinforces "strategic, professional, concierge." If an image would feel at home on a discount broker's homepage, it does not belong here.

---

## 2. When to use a real image vs. the SVG placeholder

Use the SVG placeholder (`CityHeroPlaceholder` or `ServiceHeroPlaceholder`) whenever any of the following is true:

1. No generated image has passed QA and been uploaded to Sanity for the page in question.
2. An existing image is being reshot/regenerated and we want to avoid the stale asset in the interim.
3. A new city or service has been added and is not yet in the image pipeline.

The placeholders are production-safe. They ship with the site and render at the correct 16:9 aspect ratio with brand-aligned typography. They are a holding state, not a permanent solution — every tier-1 city and every service page should eventually carry a real editorial image.

Do **not** replace the SVG placeholders with free-stock or Google-image photography. An editorial placeholder is always stronger than an off-brand photo.

---

## 3. Using the `IMAGE_PROMPTS` data file

Lookup flow:

1. Identify the surface you're producing an image for (e.g. the Toronto city page, the Tenant Placement service page, the "Rent Guarantee 101" guide).
2. Compute the prompt id following the naming convention:
   - City hero: `city-hero-<city-slug>` (e.g. `city-hero-toronto`).
   - Service hero: `service-hero-<service-slug>` (e.g. `service-hero-tenant-placement`).
   - Guide hero: `guide-hero-<guide-slug>` (e.g. `guide-hero-rent-guarantee-101`).
   - OG share: `og-share-default`, `og-share-city-template`, `og-share-service-template`.
3. Call `getImagePrompt(id)` from `src/data/image-prompts.ts`. If it returns `undefined`, add a new entry before generating — the catalog is the single source of truth.
4. Read the `subject`, `stylePrompt`, `brandColorNote`, and `negativePrompt` fields. Concatenate them into the final prompt you send to your model of choice. Do not abbreviate the negative prompt.
5. Use the `aspectRatio` and `dimensions` exactly — cropping down from a different aspect later introduces composition drift.
6. The `altText` on each entry is the default caption. Tailor it per page if the surrounding copy warrants specificity.

The catalog also exports `listImagePrompts(purpose)` for audits — run it to confirm every city/service/guide is covered before each content sprint.

---

## 4. Model recommendations

Each catalog entry carries a `recommendedModels` array, ordered by preference. High-level guidance:

- **DALL-E 3 (OpenAI)** — best for editorial realism where you need reliable subject adherence and clean lighting. Default choice for interior still-life and document-review compositions.
- **Midjourney v6** — best for stylised architectural moods, golden-hour cityscapes, and atmosphere-forward shots. Requires more curation passes but produces the strongest print-editorial feel.
- **Ideogram 2** — best for text-embedded layouts (OG share cards, editorial posters). Use for anything where legible typography must render inside the image.
- **Flux Pro** — best for photorealistic exterior architecture and high-fidelity interiors. Use when model artifacts must be minimised (close-ups of hands, documents, architectural rhythm).

Never mix outputs from different models into a single composite unless a human designer is doing the final layout in Figma or Photoshop. Cross-model collages are visibly inconsistent.

---

## 5. Step-by-step generation flow

1. **Pick the prompt.** Pull the entry from `IMAGE_PROMPTS`. If anything is missing, add the entry first, commit, then generate.
2. **Choose the model.** Start with `recommendedModels[0]`. If the first model fails to deliver after four attempts, move to the next.
3. **Generate 4–6 variations.** Vary seed/chaos but not the prompt. Log the seed of each candidate for reproducibility.
4. **Editor review.** A second set of eyes runs the QA checklist in section 6. No solo approvals.
5. **Upload to Sanity.** Place the approved image under `assets/hero/<purpose>/<id>.jpg` with the exported `altText` pre-filled.
6. **Link via CMS image field.** Bind the Sanity asset to the page's hero image field. The placeholder component is removed from the page only after the CMS link resolves in preview.
7. **Commit the prompt catalog** if you added or amended entries. The repo stays the single source of truth for prompt history.

---

## 6. QA checklist (required before upload)

Run through every item. If any fails, reject the variation and regenerate.

- [ ] No "for rent," "for lease," "sold," or "open house" signage in the frame.
- [ ] No house-shaped icons, key icons used as hero subjects, or golden-key clichés.
- [ ] No generic corporate stock handshakes, forced smiles, or staged "team" imagery.
- [ ] No text rendered in-image unless the prompt specifically calls for it (OG share only). If present, every letter must be correctly spelled.
- [ ] No AI artifacts: extra fingers, asymmetric eyes, melting faces, warped architectural lines, duplicated windows, impossible reflections.
- [ ] Brand-color alignment: navy shadows, restrained palette, no neon, no cinematic teal-orange.
- [ ] Aspect ratio matches the catalog entry exactly.
- [ ] Resolution meets or exceeds the catalog `dimensions`.
- [ ] Alt text is accurate, concrete, and under 140 characters.
- [ ] If the image contains a recognisable person, we have a model release — otherwise reject.
- [ ] If the image depicts a real trademarked building or venue, we have the legal team's clearance.

---

## 7. Licensing and rights

AI-generated imagery sits in a genuinely unsettled legal space. U.S. Copyright Office guidance (2023–2025) has held that purely AI-generated works lack human authorship and cannot be registered; Canadian treatment is similar but less formal. The UK has its own Computer-Generated Works regime. This means:

- We cannot assert copyright in an unmodified AI image.
- Third parties may, in principle, reuse our AI outputs. We accept that risk in exchange for scale.
- We still enforce our rights against impersonation, false endorsement, and misuse of our wordmark.
- For any image that will be featured in paid media or printed collateral, we prefer a human designer to make substantive edits (composition, color, compositing) so that a defensible human-authorship claim exists.

This is operational guidance, not legal advice. Escalate any publication with commercial exposure (paid ads, printed campaign, institutional RFP) to counsel before launch.

---

## 8. Fallback when AI fails QA

If four generations against the primary model and four against the secondary model both fail the QA checklist, stop. Move to a licensed stock or commissioned route in this order:

1. **Unsplash+ / Pexels Pro** — licensed editorial stock. Filter hard for architectural and interior collections; avoid any category tagged "real estate agent" or "handshake."
2. **Local real-estate / architectural photographer** — for tier-1 cities and flagship service pages, commissioning a two-hour shoot is often cheaper and cleaner than a weeklong prompt battle. Maintain a shortlist of three photographers per major market.
3. **In-house designer collage** — a Figma-assembled composition over an architectural photograph, with editorial typography and brand color treatment. Always a legitimate fallback.

Never publish a free-tier Shutterstock thumbnail, a watermarked comp, or a Google-image-search result.

---

## 9. Per-template expected dimensions

| Surface | Aspect | Dimensions | Notes |
| --- | --- | --- | --- |
| Page hero (city, service, guide) | 16:9 | 1920 × 1080 | Desktop-first; mobile crops center. |
| Service hero (alt) | 3:2 | 1800 × 1200 | When the template uses a taller frame. |
| OG / social share | 16:9 | 1200 × 630 | Includes wordmark bottom-right. |
| Editorial inset | 3:2 | 1600 × 1067 | Inline body imagery. |
| Card / thumbnail | 4:3 | 800 × 600 | Listing cards, related content. |
| Square callout | 1:1 | 1080 × 1080 | Newsletter, social grid. |

Always export at 2x for retina (provide the native 1920 × 1080 and a 3840 × 2160 upscale for hero slots on flagship pages).

---

## 10. Banned visual clichés (reinforced)

These are automatic rejections. No approvals, no exceptions, no "but it's tasteful this time."

1. "For Rent" / "For Lease" / "Sold" / "Open House" signs in any language or styling.
2. Simplified house-shaped icons (pitched-roof pictograms, cartoon outlines).
3. Golden keys — whether held aloft, resting in locks, or dangling from a keychain. A plain brass key as incidental still-life texture is acceptable only when the catalog prompt explicitly permits it.
4. Generic corporate handshakes — including "half-handshake" variations, close-ups of suited forearms, and any "deal closing" staging.
5. Over-saturated sunsets, pink-orange sky kitsch, HDR skies that look painted.
6. Cartoon or vector-illustration rendering in photographic surfaces.
7. Stock "happy family in front of new home" tropes with keys/boxes/moving trucks.
8. On-screen UI mockups pretending to be phone or laptop interfaces — we use real component renders for those.
9. Watermarks, source attributions baked into the image, or visible model-API artifacts (e.g. the "bing" watermark, the Midjourney corner grid).
10. Any image whose composition is recognisably a competitor's hero shot. When in doubt, reverse-image-search before upload.

---

## Ownership and escalation

Content lead owns the prompt catalog. Design lead owns QA approval. Engineering owns the placeholder components and the Sanity integration. Anything outside those lanes — legal clearance, commissioned shoots, regulated-market imagery — escalates to the brand director.

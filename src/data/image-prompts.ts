/**
 * MoveSmart Rentals - AI Image Generation Prompt Catalog
 *
 * Structured, brand-safe prompts for producing editorial hero imagery
 * across city, service, guide, and OG-share surfaces. These prompts are
 * intended for DALL-E 3, Midjourney v6, Ideogram 2, and Flux Pro.
 *
 * Brand voice: strategic, professional, concierge. Visual direction:
 * premium editorial, architectural dignity, restrained color grading,
 * navy (#001E57) / emerald (#009966) / gold (#D4A853) undertones.
 *
 * See docs/image-generation-guide.md for the full SOP.
 */

export type ImagePurpose =
  | 'city-hero'
  | 'service-hero'
  | 'guide-hero'
  | 'editorial-inset'
  | 'og-share'

export type ImageAspectRatio = '16:9' | '3:2' | '4:5' | '1:1'

export type ImageModel =
  | 'dall-e-3'
  | 'midjourney-v6'
  | 'ideogram-2'
  | 'flux-pro'

export interface ImagePrompt {
  id: string
  purpose: ImagePurpose
  aspectRatio: ImageAspectRatio
  dimensions: { width: number; height: number }
  subject: string
  stylePrompt: string
  brandColorNote: string
  negativePrompt: string
  recommendedModels: ImageModel[]
  altText: string
}

// ---------------------------------------------------------------------------
// Shared constants
// ---------------------------------------------------------------------------

const GLOBAL_NEGATIVE =
  "no 'for rent' signs, no 'sold' signs, no house-shaped icons, no generic stock handshakes, no cliché golden-key imagery, no oversaturation, no watermarks, no text artifacts, no melting faces, no extra fingers, no warped architecture, no lens flares, no HDR kitsch, no cartoon rendering, no emoji, no clip-art"

const BRAND_COLOR_NOTE =
  'Restrained grade with deep navy (#001E57) shadows, emerald (#009966) mid-tones in foliage or accents, and warm brass/gold (#D4A853) highlights. Ivory (#FBFAF6) can appear as soft architectural light. Palette should feel editorial, not saturated.'

const EDITORIAL_STYLE_SUFFIX =
  'Shot on medium-format film, 45mm equivalent lens, shallow atmospheric depth, natural directional light, subtle film grain, muted contrast, gallery-print finish. Premium real-estate editorial mood. Architectural dignity over spectacle.'

const HERO_DIMS = { width: 1920, height: 1080 } as const
const OG_DIMS = { width: 1200, height: 630 } as const
const INSET_DIMS = { width: 1600, height: 1067 } as const

// ---------------------------------------------------------------------------
// City hero prompts
// ---------------------------------------------------------------------------

interface CitySeed {
  slug: string
  name: string
  region: string
  anchor: string // concrete landmark or neighborhood descriptor
}

const CITY_SEEDS: CitySeed[] = [
  {
    slug: 'toronto',
    name: 'Toronto',
    region: 'Ontario',
    anchor:
      'the Financial District skyline seen from the Harbourfront, with the CN Tower off-center and Lake Ontario in soft mist',
  },
  {
    slug: 'mississauga',
    name: 'Mississauga',
    region: 'Ontario',
    anchor:
      'the Absolute Towers and Square One skyline at golden hour, with broad tree-lined boulevards in the foreground',
  },
  {
    slug: 'brampton',
    name: 'Brampton',
    region: 'Ontario',
    anchor:
      'a quiet residential avenue of 2000s-era detached homes with mature maple canopy, Gage Park bandshell visible in the distance',
  },
  {
    slug: 'hamilton',
    name: 'Hamilton',
    region: 'Ontario',
    anchor:
      'the Niagara Escarpment above Hamilton harbour at dawn, with restored brick warehouses along James Street North in middle distance',
  },
  {
    slug: 'ottawa',
    name: 'Ottawa',
    region: 'Ontario',
    anchor:
      'Parliament Hill and the Gothic Revival Peace Tower above the Rideau Canal, soft winter morning light, no flags dominating the frame',
  },
  {
    slug: 'vancouver',
    name: 'Vancouver',
    region: 'British Columbia',
    anchor:
      'the False Creek skyline with the North Shore mountains beyond, seawall in the foreground, low cloud ceiling softening the light',
  },
  {
    slug: 'montreal',
    name: 'Montreal',
    region: 'Quebec',
    anchor:
      'a Plateau Mont-Royal streetscape of curved exterior staircases and triplex rowhouses at dusk, with Mount Royal silhouetted behind',
  },
  {
    slug: 'calgary',
    name: 'Calgary',
    region: 'Alberta',
    anchor:
      'the downtown Calgary skyline from the Peace Bridge at blue hour, Bow River reflecting warm office windows, prairie light on the horizon',
  },
  {
    slug: 'halifax',
    name: 'Halifax',
    region: 'Nova Scotia',
    anchor:
      'the Halifax waterfront boardwalk with the harbour and Georges Island beyond, Victorian ironstone facades in the foreground',
  },
  {
    slug: 'miami',
    name: 'Miami',
    region: 'Florida',
    anchor:
      'Brickell Avenue high-rise towers seen across Biscayne Bay at sunrise, palms as quiet framing element, no beach cliché',
  },
  {
    slug: 'new-york-city',
    name: 'New York City',
    region: 'New York',
    anchor:
      'a West Village brownstone block at early morning, with midtown towers rising softly in the far distance, restrained Manhattan mood',
  },
  {
    slug: 'chicago',
    name: 'Chicago',
    region: 'Illinois',
    anchor:
      'the Chicago River corridor between the Wrigley Building and the Loop, an architectural boat-tour perspective, low warm sun',
  },
  {
    slug: 'los-angeles',
    name: 'Los Angeles',
    region: 'California',
    anchor:
      'a Mid-Wilshire residential street of palm-lined 1920s Spanish Revival apartment courts at dusk, distant Hollywood Hills in haze',
  },
]

function buildCityPrompt(seed: CitySeed): ImagePrompt {
  return {
    id: `city-hero-${seed.slug}`,
    purpose: 'city-hero',
    aspectRatio: '16:9',
    dimensions: HERO_DIMS,
    subject: `Editorial wide shot of ${seed.anchor} in ${seed.name}, ${seed.region}, at golden hour.`,
    stylePrompt: `Wide editorial composition, no people front-and-center (small incidental figures acceptable for scale), strong architectural lines, restrained color grading with navy-emerald-gold undertones. ${EDITORIAL_STYLE_SUFFIX}`,
    brandColorNote: BRAND_COLOR_NOTE,
    negativePrompt: `${GLOBAL_NEGATIVE}, no tourists, no vehicles dominating the frame, no cliché skyline postcard crop, no visible street signage`,
    recommendedModels: ['midjourney-v6', 'flux-pro', 'dall-e-3'],
    altText: `Editorial hero image of ${seed.name}, ${seed.region} at golden hour - MoveSmart Rentals leasing coverage area.`,
  }
}

const CITY_PROMPTS: ImagePrompt[] = CITY_SEEDS.map(buildCityPrompt)

// ---------------------------------------------------------------------------
// Service hero prompts (9 services)
// ---------------------------------------------------------------------------

interface ServiceSeed {
  slug: string
  name: string
  subject: string
  style: string
  altText: string
}

const SERVICE_SEEDS: ServiceSeed[] = [
  {
    slug: 'tenant-placement',
    name: 'Tenant Placement',
    subject:
      'Two professionals meeting across a walnut conference table reviewing an applicant file, warm window light from the left, hands and documents in sharp focus, faces soft / partially out of frame.',
    style:
      'Concierge-grade editorial, dignified body language, no performative handshake. Clean minimal background, single orchid stem or ceramic vessel as quiet prop.',
    altText:
      'Concierge tenant placement consultation at MoveSmart Rentals - qualified applicant review.',
  },
  {
    slug: 'leasing-services',
    name: 'Leasing Services',
    subject:
      'An empty, freshly prepared rental unit during a professional walk-through: herringbone or wide-plank parquet floor, tall windows with sheer linen curtains diffusing daylight, one neutral armchair, no clutter.',
    style:
      'Interior editorial, architectural symmetry, mid-morning daylight, calm negative space. Feels like a design magazine cover.',
    altText:
      'Daylit empty rental interior ready for leasing walk-through - MoveSmart Rentals.',
  },
  {
    slug: 'tenant-screening',
    name: 'Tenant Screening',
    subject:
      'Overhead (slight angle) desk scene: two hands reviewing a stack of printed rental application pages beside a slim laptop, a reading lamp, and a fountain pen. Documents blurred so no personal data is legible.',
    style:
      'Muted editorial still life, navy desk blotter, warm brass lamp accent, cinematic low contrast.',
    altText:
      'Rental application document review - MoveSmart Rentals tenant screening process.',
  },
  {
    slug: 'rent-guarantee',
    name: 'Rent Guarantee',
    subject:
      'Architectural close-up of a modern purpose-built rental building facade at early morning - clean vertical lines, balcony rhythm, first light raking across limestone or pale brick.',
    style:
      'Static architectural photography, long lens compression, no sky drama, conveys institutional stability and permanence.',
    altText:
      'Stable rental building facade at sunrise - MoveSmart Rentals rent guarantee program.',
  },
  {
    slug: 'tenant-insurance',
    name: 'Tenant Insurance',
    subject:
      'A serene lived-in living room: mid-century sofa, two large potted plants, a wool throw, an open book on the ottoman, soft afternoon light through gauzy curtains. No people.',
    style:
      'Warm, safe, domestic editorial. Absolutely no literal insurance icons, shields, or umbrellas.',
    altText:
      'Calm furnished rental living room - MoveSmart Rentals recommended tenant insurance coverage.',
  },
  {
    slug: 'tenant-guarantor',
    name: 'Tenant Guarantor',
    subject:
      'Two generations - a parent and an adult child - in a considered kitchen conversation across a marble counter at dusk, two espresso cups between them. Respectful, non-sentimental, natural posture.',
    style:
      'Warm documentary editorial, shallow depth, faces partially in shadow for dignity; clothing neutral and tailored.',
    altText:
      'Multi-generational family discussing a guarantor arrangement - MoveSmart Rentals.',
  },
  {
    slug: 'rental-preparation',
    name: 'Rental Preparation',
    subject:
      'An emptied unit mid-turnover: paint rollers on a tray, a folded drop cloth, a stepladder, painter\'s tape on a door frame, fresh daylight, no workers visible, exactly one pair of work gloves resting on the ladder.',
    style:
      'Craft-focused editorial still life, matte whites, pale oak floor, unfussy composition.',
    altText:
      'Rental unit mid-preparation - MoveSmart Rentals turnover and make-ready service.',
  },
  {
    slug: 'portal-and-technology',
    name: 'Portal & Technology',
    subject:
      'A considered workspace: open slim laptop with a soft-focus lease document on screen, a printed lease folded beside it, a single hand resting on the trackpad, a brass desk lamp out of focus.',
    style:
      'Navy and emerald color grade, warm highlights, editorial product-adjacent still life. No obvious UI chrome or logos.',
    altText:
      'Lease management workspace - MoveSmart Rentals owner and tenant technology portal.',
  },
  {
    slug: 'institutional-lease-up',
    name: 'Institutional Lease-Up',
    subject:
      'Exterior editorial view of a modern purpose-built rental tower at golden hour - clean glass-and-stone facade, newly planted landscaped forecourt, no people, no signage, slight architectural foreshortening.',
    style:
      'Developer-grade architectural photography, restrained, long-lens, institutional confidence.',
    altText:
      'Modern purpose-built rental tower at golden hour - MoveSmart Rentals institutional lease-up.',
  },
]

function buildServicePrompt(seed: ServiceSeed, index: number): ImagePrompt {
  return {
    id: `service-hero-${seed.slug}`,
    purpose: 'service-hero',
    aspectRatio: '3:2',
    dimensions: { width: 1800, height: 1200 },
    subject: seed.subject,
    stylePrompt: `${seed.style} ${EDITORIAL_STYLE_SUFFIX}`,
    brandColorNote: BRAND_COLOR_NOTE,
    negativePrompt: `${GLOBAL_NEGATIVE}, no forced smiles, no corporate stock cliché, no literal service icons, no text overlays`,
    recommendedModels:
      index % 2 === 0
        ? ['flux-pro', 'midjourney-v6', 'dall-e-3']
        : ['midjourney-v6', 'flux-pro', 'dall-e-3'],
    altText: seed.altText,
  }
}

const SERVICE_PROMPTS: ImagePrompt[] = SERVICE_SEEDS.map(buildServicePrompt)

// ---------------------------------------------------------------------------
// Guide hero prompts (6 guides)
// ---------------------------------------------------------------------------

interface GuideSeed {
  slug: string
  title: string
  subject: string
  altText: string
}

const GUIDE_SEEDS: GuideSeed[] = [
  {
    slug: 'tenant-screening-ontario',
    title: 'Tenant Screening in Ontario',
    subject:
      'Editorial flat-lay: a printed Ontario-branded rental application (no real crest), a navy fountain pen, a small magnifier, and a folded newspaper corner, lit by cool north light on a pale oak desk.',
    altText:
      'Ontario tenant screening document flat-lay - MoveSmart Rentals guide.',
  },
  {
    slug: 'how-to-price-your-rental',
    title: 'How to Price Your Rental',
    subject:
      'A clean analyst desk: a printed comparative rent grid, a calculator, a tape measure, an architectural floor plan partially unfurled, warm task lamp light, no on-screen numbers legible.',
    altText:
      'Rental pricing analysis desk - MoveSmart Rentals guide to setting rent.',
  },
  {
    slug: 'rent-guarantee-101',
    title: 'Rent Guarantee 101',
    subject:
      'Architectural interior: a quiet bank-like lobby with travertine walls and a single upholstered bench, cool morning daylight, conveying institutional assurance. No logos, no security guards.',
    altText:
      'Institutional interior conveying stability - MoveSmart Rentals rent guarantee guide.',
  },
  {
    slug: 'how-to-avoid-bad-tenants',
    title: 'How to Avoid Bad Tenants',
    subject:
      'Editorial close-up of a landlord\'s hand marking a checklist on a printed screening report beside a coffee cup, warm morning light, zero legible personal data.',
    altText:
      'Landlord reviewing a tenant screening checklist - MoveSmart Rentals avoidance guide.',
  },
  {
    slug: 'moving-day-coordination',
    title: 'Moving Day Coordination',
    subject:
      'A freshly vacated living room with three neatly taped moving boxes stacked by a window, a clipboard on top, late-afternoon sunlight across a wide-plank floor. No movers visible, calm and ordered.',
    altText:
      'Organized moving day setup inside a rental unit - MoveSmart Rentals coordination guide.',
  },
  {
    slug: 'institutional-rfp-template',
    title: 'Institutional RFP Template',
    subject:
      'Boardroom corner detail: a leather-bound proposal binder on a long walnut table, a half-filled water glass, two pens parallel, morning light through vertical blinds. Professional, unbranded.',
    altText:
      'Institutional RFP boardroom detail - MoveSmart Rentals template guide.',
  },
]

function buildGuidePrompt(seed: GuideSeed): ImagePrompt {
  return {
    id: `guide-hero-${seed.slug}`,
    purpose: 'guide-hero',
    aspectRatio: '16:9',
    dimensions: HERO_DIMS,
    subject: seed.subject,
    stylePrompt: `Editorial still-life or quiet interior, magazine-feature mood, restrained composition, navy/emerald/gold undertones. ${EDITORIAL_STYLE_SUFFIX}`,
    brandColorNote: BRAND_COLOR_NOTE,
    negativePrompt: `${GLOBAL_NEGATIVE}, no real brand logos, no legible personal information, no clichéd clip-art props`,
    recommendedModels: ['flux-pro', 'midjourney-v6', 'dall-e-3'],
    altText: seed.altText,
  }
}

const GUIDE_PROMPTS: ImagePrompt[] = GUIDE_SEEDS.map(buildGuidePrompt)

// ---------------------------------------------------------------------------
// OG / social-share prompts
// ---------------------------------------------------------------------------

const OG_PROMPTS: ImagePrompt[] = [
  {
    id: 'og-share-default',
    purpose: 'og-share',
    aspectRatio: '16:9',
    dimensions: OG_DIMS,
    subject:
      'Editorial 1200x630 composition: deep navy backdrop with a subtle architectural line-pattern (thin gold verticals) at low opacity, generous negative space on the left for article title overlay, MoveSmart wordmark anchored bottom-right.',
    stylePrompt:
      'Flat editorial layout, no photography - vector/print poster aesthetic. Strong typographic silence, two thin rule lines dividing the composition. Feels like the cover of a property investment quarterly.',
    brandColorNote: `${BRAND_COLOR_NOTE} Primary surface #001E57, accent hairlines #D4A853 at 18-28% opacity.`,
    negativePrompt: `${GLOBAL_NEGATIVE}, no photographic imagery, no gradients that look glossy, no glow effects`,
    recommendedModels: ['ideogram-2', 'dall-e-3'],
    altText: 'MoveSmart Rentals editorial share card on deep navy background.',
  },
  {
    id: 'og-share-city-template',
    purpose: 'og-share',
    aspectRatio: '16:9',
    dimensions: OG_DIMS,
    subject:
      'Editorial 1200x630 share card template for a city page: a high-contrast monochrome skyline silhouette occupying the bottom third, navy sky above with a single brass horizontal rule, space reserved top-left for city name and tagline, MoveSmart wordmark bottom-right.',
    stylePrompt:
      'Print-editorial poster layout, serif display typography reserved as empty space (no text baked into the image), skyline rendered as flat silhouette with no detail noise.',
    brandColorNote: BRAND_COLOR_NOTE,
    negativePrompt: `${GLOBAL_NEGATIVE}, no 3D rendering, no drop shadows, no photographic skyline`,
    recommendedModels: ['ideogram-2', 'dall-e-3'],
    altText: 'MoveSmart Rentals city page share card template.',
  },
  {
    id: 'og-share-service-template',
    purpose: 'og-share',
    aspectRatio: '16:9',
    dimensions: OG_DIMS,
    subject:
      'Editorial 1200x630 service-page share card: split composition, left half deep navy with generous negative space for service title, right half ivory (#FBFAF6) containing a single centered abstract gold geometric mark (thin circle with intersecting vertical line), MoveSmart wordmark bottom-right on navy side.',
    stylePrompt:
      'Magazine-spread layout, print restraint, hairline divider between panels.',
    brandColorNote: BRAND_COLOR_NOTE,
    negativePrompt: `${GLOBAL_NEGATIVE}, no busy patterns, no photographic content`,
    recommendedModels: ['ideogram-2', 'dall-e-3'],
    altText: 'MoveSmart Rentals service page share card template.',
  },
]

// ---------------------------------------------------------------------------
// Optional editorial insets (supplementary, not required quota)
// ---------------------------------------------------------------------------

const INSET_PROMPTS: ImagePrompt[] = [
  {
    id: 'editorial-inset-keys-on-counter',
    purpose: 'editorial-inset',
    aspectRatio: '3:2',
    dimensions: INSET_DIMS,
    subject:
      'A single modern brass key resting on a slab of honed travertine, shallow depth of field, cool morning light. Used sparingly - keys only as texture, never as a "golden key" cliché.',
    stylePrompt: `Editorial macro still life, restrained, architectural. ${EDITORIAL_STYLE_SUFFIX}`,
    brandColorNote: BRAND_COLOR_NOTE,
    negativePrompt: `${GLOBAL_NEGATIVE}, no keychain dangle, no sparkle, no hero framing of the key`,
    recommendedModels: ['flux-pro', 'midjourney-v6'],
    altText: 'Editorial inset - brass key on travertine, MoveSmart Rentals.',
  },
  {
    id: 'editorial-inset-floorplan-on-desk',
    purpose: 'editorial-inset',
    aspectRatio: '3:2',
    dimensions: INSET_DIMS,
    subject:
      'A partially rolled architectural floor plan on a desk corner, a navy clipboard with blank form, soft raking light.',
    stylePrompt: `Editorial still life, documentary calm. ${EDITORIAL_STYLE_SUFFIX}`,
    brandColorNote: BRAND_COLOR_NOTE,
    negativePrompt: `${GLOBAL_NEGATIVE}, no 3D renders, no hand-drawn sketch cliché`,
    recommendedModels: ['flux-pro', 'midjourney-v6'],
    altText:
      'Editorial inset - floor plan and clipboard on a desk, MoveSmart Rentals.',
  },
]

// ---------------------------------------------------------------------------
// Public catalog
// ---------------------------------------------------------------------------

const ALL_PROMPTS: ImagePrompt[] = [
  ...CITY_PROMPTS,
  ...SERVICE_PROMPTS,
  ...GUIDE_PROMPTS,
  ...OG_PROMPTS,
  ...INSET_PROMPTS,
]

export const IMAGE_PROMPTS: Record<string, ImagePrompt> = ALL_PROMPTS.reduce(
  (acc, prompt) => {
    acc[prompt.id] = prompt
    return acc
  },
  {} as Record<string, ImagePrompt>,
)

/**
 * Retrieve a single prompt by its stable id. Returns undefined if not found.
 */
export function getImagePrompt(id: string): ImagePrompt | undefined {
  return IMAGE_PROMPTS[id]
}

/**
 * List prompts, optionally filtered by purpose.
 */
export function listImagePrompts(purpose?: ImagePurpose): ImagePrompt[] {
  const all = Object.values(IMAGE_PROMPTS)
  return purpose ? all.filter((p) => p.purpose === purpose) : all
}

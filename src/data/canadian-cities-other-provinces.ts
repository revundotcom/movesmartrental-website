/**
 * Canadian Cities - Other Priority Provinces (Tier 1)
 * -------------------------------------------------------------
 * Tier-1 city content for MoveSmart Rentals' Canadian priority
 * provinces outside Ontario: Quebec, British Columbia, Alberta,
 * and Nova Scotia. Per contract §9.1, each of these provinces
 * receives five anchor cities with full-depth leasing brokerage
 * content (market summary, landlord problem, MoveSmart narrative,
 * neighborhoods, eight localized FAQs, and a province-specific
 * regulatory note).
 *
 * Positioning throughout: leasing brokerage / tenant placement /
 * rent guarantee - NOT property management. MoveSmart is a
 * concierge leasing house, not an operator.
 */

export interface CanadianCityContent {
  slug: string
  name: string
  province: 'Quebec' | 'British Columbia' | 'Alberta' | 'Nova Scotia'
  provinceSlug: 'quebec' | 'british-columbia' | 'alberta' | 'nova-scotia'
  provinceCode: 'QC' | 'BC' | 'AB' | 'NS'
  tier: 1
  seoTitle: string
  metaDescription: string
  heroHeadline: string
  heroLede: string
  rentalMarketSummary: string
  landlordProblem: string
  howMoveSmartHelps: string
  keyNeighborhoods: string[]
  faqItems: Array<{ question: string; answer: string }>
  primaryKeyword: string
  secondaryKeywords: string[]
  regulatoryNote: string
}

const QC_REGULATORY_NOTE =
  'Quebec rentals fall under the Tribunal administratif du logement (TAL), which publishes an annual rent-increase recommendation grid and governs disputes. Bill 96 requires leases to be presented in French unless both parties expressly consent to another language, and tenant lease-transfer rights are strong.'

const BC_REGULATORY_NOTE =
  'British Columbia rentals are governed by the Residential Tenancy Branch (RTB), with a provincial annual rent cap tied to CPI. Vancouver layers its own empty-homes tax and the provincial speculation and vacancy tax, and no-fault evictions are tightly constrained with extended tenant notice protections.'

const AB_REGULATORY_NOTE =
  'Alberta rentals are governed by the Residential Tenancies Act with no provincial rent cap - pricing is free-market between tenancies. Landlords must give 24-hour written notice before inspections, and month-to-month terminations require two full tenancy months of written notice on either side.'

const NS_REGULATORY_NOTE =
  'Nova Scotia rentals are governed by the Residential Tenancies Act and its review board. A provincial rent cap remains in force (currently set in the low single digits), and post-2022 rules restrict renoviction-style terminations. Landlords must work through the tribunal for most possession remedies.'

export const CANADIAN_OTHER_CITIES: Record<string, CanadianCityContent> = {
  // =====================================================================
  // QUEBEC - 1. MONTREAL
  // =====================================================================
  montreal: {
    slug: 'montreal',
    name: 'Montréal',
    province: 'Quebec',
    provinceSlug: 'quebec',
    provinceCode: 'QC',
    tier: 1,
    seoTitle: 'Leasing Services in Montreal | MoveSmart Rentals',
    metaDescription:
      'White-glove tenant placement and rent-guarantee leasing in Montreal, QC. Bilingual, Bill 96-compliant leases, TAL-aware pricing, and concierge screening for plex and condo owners.',
    heroHeadline: 'Montreal Leasing, Bilingual, Bill 96-Compliant, TAL-Aware',
    heroLede:
      'MoveSmart places vetted tenants into Montreal plexes, condos, and single-family homes with a leasing process that respects Bill 96, reads the TAL grid correctly, and speaks to both francophone and anglophone applicant pools without compromise.',
    rentalMarketSummary:
      'Montreal is the most idiosyncratic rental market in Canada. Inventory is dominated by the iconic plex stock - duplexes, triplexes, and the owner-occupier-plus-tenant combinations that define Rosemont, Villeray, Mile End, and the Plateau - sitting alongside a fast-growing condo core downtown and in Griffintown. The tenant base is unusually bifurcated: a stable long-tenure francophone cohort that knows TAL rules intimately, alongside a highly mobile student and young-professional pool driven by McGill, UdeM, Concordia, HEC, and the anglophone tech migration. Demand is seasonal in a way no other Canadian city matches, anchored to the July 1 moving tradition and the academic calendar. Vacancies in the inner neighbourhoods are persistently tight, but pricing discipline matters - the TAL rent-increase grid shapes tenant expectations, and aggressive year-over-year hikes invite formal challenges. Properly marketed, well-maintained plex upper units continue to be some of the most resilient rental yield in eastern Canada.',
    landlordProblem:
      'Montreal landlords routinely stumble on three fronts. First, leases presented only in English now sit outside Bill 96 norms unless both parties expressly consent - and many owners do not structure the consent cleanly. Second, plex owner-operators under-market their units by relying on Kijiji and LesPAC without targeting the anglophone professional and student pools willing to pay more. Third, a significant minority misread the TAL rent-regulation regime, applying aggressive increases that prompt formal fixation requests and strain tenancies. The result is either under-rent, unnecessary TAL friction, or vacant July 1 turnovers that should have closed by April.',
    howMoveSmartHelps:
      'MoveSmart runs every Montreal placement through a bilingual, Bill 96-compliant intake - French-first lease with translated companion copies handled properly. We pull live comparables for the specific arrondissement, not a city-wide average, and market to both francophone and anglophone channels (Kijiji, LesPAC, Facebook groups, McGill/Concordia off-campus feeds, and our own database). Screening follows Quebec credit-bureau practice plus employment and reference verification. Our engagement ends at signed lease; ongoing rent collection and operations stay with you, or the Rent Guarantee converts missed rent into our problem rather than yours.',
    keyNeighborhoods: [
      'Plateau-Mont-Royal',
      'Mile End',
      'Rosemont / La Petite-Patrie',
      'Villeray',
      'Griffintown',
      'Verdun',
    ],
    faqItems: [
      {
        question: 'Does the lease have to be in French under Bill 96?',
        answer:
          'The standard TAL lease form is produced in French. A tenant can expressly consent to receive a version in another language, but the structure of that consent matters. We default to a French lease with a proper English companion where the tenant prefers it, documented cleanly so the file holds up if it is ever reviewed.',
      },
      {
        question: 'How does the TAL rent-increase grid affect what I can charge a new tenant?',
        answer:
          'The TAL grid governs increases within an existing tenancy, not the rent you set when signing a new tenant. However, Quebec leases require disclosing the lowest rent paid in the prior twelve months, and a new tenant can request a fixation from TAL if they believe the increase is unjustified. We price to market and make sure the disclosure and fixation risk are understood up front.',
      },
      {
        question: 'Can you market effectively to both francophone and anglophone tenants?',
        answer:
          'Yes - that is the Montreal baseline, not an upgrade. Every listing runs bilingually across the channels that matter, including LesPAC, Kijiji, Facebook neighbourhood groups, and university off-campus boards. We write copy that reads as native in each language, not translated from the other.',
      },
      {
        question: 'Is the July 1 turnover really as chaotic as people say?',
        answer:
          'It still drives the calendar for most inner-neighbourhood stock, particularly plexes. We start marketing April-to-May for July 1 starts and hold a strict showings cadence so your unit is not one of the thousands competing at the last week of June. Earlier, calmer leasing outperforms late-scramble every year.',
      },
      {
        question: 'Do you handle leasing for plex owner-occupiers who live in the same building?',
        answer:
          'Often. We screen for tenants whose lifestyle aligns with an owner-occupied plex - quiet hours, shared entrance norms, building-rule expectations - and we document those in the lease schedule. The owner upstairs keeps peace; the tenant downstairs knows the rules before move-in.',
      },
      {
        question: 'What about condo rentals in Griffintown or downtown - is the dynamic different?',
        answer:
          'Very. Downtown and Griffintown condos compete more directly with short-term rental supply and tech-sector relocation, and tenants there are more likely to be mobile professionals on 12-month leases. We lean into the amenity story, professional photography, and English-first marketing for that cohort while keeping the lease itself Bill 96-compliant.',
      },
      {
        question: 'Does MoveSmart collect rent monthly after the lease is signed?',
        answer:
          'No - MoveSmart is a leasing brokerage, not a property manager. We place the tenant and exit at signed lease. The Rent Guarantee add-on means missed rent becomes our issue for the coverage term; day-to-day rent receipt and building operations remain with you.',
      },
      {
        question: 'What happens if a tenant I place assigns the lease to someone else under Quebec rules?',
        answer:
          'Quebec tenants have unusually strong lease-transfer rights, and a landlord can only refuse for serious reasons. If an assignment is proposed, we re-screen the incoming party on your behalf to MoveSmart standards before the transfer proceeds, so a legal right does not turn into a screening blind spot.',
      },
    ],
    primaryKeyword: 'leasing services Montreal',
    secondaryKeywords: [
      'tenant placement Montreal',
      'courtage locatif Montréal',
      'Montreal plex leasing',
      'Bill 96 lease Quebec',
      'TAL rent Montreal',
      'Plateau condo leasing',
      'Griffintown rental agent',
    ],
    regulatoryNote: QC_REGULATORY_NOTE,
  },

  // =====================================================================
  // QUEBEC - 2. QUEBEC CITY
  // =====================================================================
  'quebec-city': {
    slug: 'quebec-city',
    name: 'Québec City',
    province: 'Quebec',
    provinceSlug: 'quebec',
    provinceCode: 'QC',
    tier: 1,
    seoTitle: 'Leasing Services in Quebec City | MoveSmart Rentals',
    metaDescription:
      'Concierge tenant placement and rent-guarantee leasing for Quebec City landlords. Bill 96-compliant, TAL-aware pricing, fluent with Laval, provincial workforce, and Old City rental dynamics.',
    heroHeadline: 'Québec City Leasing, for the Capital Market That Rewards Discipline',
    heroLede:
      'Quebec City rentals reward owners who respect the calendar, the TAL grid, and the heating-included norm. MoveSmart places vetted tenants into Sainte-Foy, Limoilou, and Old City units with French-first marketing and full Bill 96 compliance.',
    rentalMarketSummary:
      'Quebec City is a steady, conservative rental market anchored by two massive and predictable tenant engines: the provincial government workforce and Université Laval. The civil-service base produces long-tenure professional tenants clustered in Sainte-Foy, Sillery, and the Montcalm corridor, while Laval drives a large Sainte-Foy / Cap-Rouge student catchment on the academic calendar. Old Quebec and Saint-Roch carry a hybrid of long-term residential and short-term tourism pressure, with municipal rules progressively tightening the latter. Vacancy is structurally low compared to the Canadian average, and pricing is disciplined - the heating-included lease is still the market default outside newer condo stock, and tenants expect it. Plex inventory in Limoilou and Saint-Sauveur trades as solid yield rental, and the fast-growing condo supply in Sainte-Foy west and Lebourgneuf appeals to dual-income professional households. Pricing power is real but moderate; disciplined landlords who market to the right cohort and price against the TAL grid retain tenants for years.',
    landlordProblem:
      'The most common Quebec City problem is out-of-province or anglophone-Ontario owners treating the market like Ottawa or Montreal. Heating-included expectations get missed, leases are drafted in English without proper Bill 96 consent, and pricing is benchmarked against the wrong comparables. The second pattern: landlords who try to time the September academic rush without starting marketing by late June miss the window entirely and sit vacant through the fall. And owners near the Old City who chase short-term revenue are increasingly squeezed by municipal enforcement.',
    howMoveSmartHelps:
      'MoveSmart runs every Quebec City placement French-first, with bilingual distribution where the property profile warrants it. We benchmark against neighbourhood-specific TAL-grid-aware comparables, price heating-in/heating-out correctly, and synchronize marketing to the Laval calendar for student-adjacent units. Screening runs full Quebec credit-bureau plus employment verification, with specific fluency in provincial-government pay structures. Rent Guarantee is available; our engagement closes cleanly at signed lease.',
    keyNeighborhoods: [
      'Sainte-Foy',
      'Montcalm',
      'Limoilou',
      'Saint-Roch',
      'Old Quebec / Vieux-Québec',
      'Lebourgneuf',
    ],
    faqItems: [
      {
        question: 'Should the lease include heating in Quebec City?',
        answer:
          'For older plex and apartment stock it is still the market default and tenants expect it. For newer condos with individual metering, heating-excluded is acceptable and properly disclosed. We price the listing either way with the correct comparable so the rent reads fairly to the applicant.',
      },
      {
        question: 'How do I time a Sainte-Foy student rental to the Laval calendar?',
        answer:
          'Marketing should be live by late May for September 1 occupancy. Earlier students lock in housing earlier than most Ontario universities - waiting until August means competing with the scramble supply and accepting weaker applicants.',
      },
      {
        question: 'Is a lease in English acceptable under Bill 96?',
        answer:
          'Only with express tenant consent properly structured. Our default is a French lease with an English companion where the tenant prefers it, documented so the file is unambiguous. Getting this wrong is a common unforced error for out-of-province owners.',
      },
      {
        question: 'Are provincial-government tenants really a preferred cohort?',
        answer:
          'They are a strong cohort: stable income, long tenure, predictable pay cycle. Employment verification is straightforward once we know which ministry or Crown corporation the applicant reports to, and turnover tends to be lower than private-sector benchmarks.',
      },
      {
        question: 'What should I know about renting near Old Quebec?',
        answer:
          'Short-term rental regulations have tightened significantly, and straight long-term residential leasing is now the more stable play in most Old City micro-markets. We price to long-term professional or academic demand and avoid the regulatory cliff that has caught multiple investor owners.',
      },
      {
        question: 'How does the TAL grid play out in Quebec City specifically?',
        answer:
          'Less adversarial than Montreal but the mechanics are identical - the TAL publishes an annual recommendation and tenants can file fixations on aggressive increases. We set new-tenant rent at true market and coach on in-tenancy increases that stay within defensible ranges.',
      },
      {
        question: 'Do you handle Limoilou and Saint-Sauveur plex leasing?',
        answer:
          'Yes. Plex inventory there is some of the strongest yield in the capital region. We screen with attention to owner-occupier dynamics when applicable and price with awareness of the Limoilou gentrification gradient, which is uneven street by street.',
      },
      {
        question: 'Is MoveSmart a property manager?',
        answer:
          'No. We are a leasing brokerage. We place the tenant, execute the lease, and - if you add Rent Guarantee - cover missed rent for the coverage term. Ongoing operations and maintenance decisions remain with you.',
      },
    ],
    primaryKeyword: 'leasing services Quebec City',
    secondaryKeywords: [
      'tenant placement Quebec City',
      'courtage locatif Québec',
      'Sainte-Foy rental agent',
      'Laval student rental Quebec City',
      'Limoilou plex leasing',
      'Vieux-Québec rental',
      'capital region leasing',
    ],
    regulatoryNote: QC_REGULATORY_NOTE,
  },

  // =====================================================================
  // QUEBEC - 3. LAVAL
  // =====================================================================
  laval: {
    slug: 'laval',
    name: 'Laval',
    province: 'Quebec',
    provinceSlug: 'quebec',
    provinceCode: 'QC',
    tier: 1,
    seoTitle: 'Leasing Services in Laval | MoveSmart Rentals',
    metaDescription:
      'White-glove tenant placement for Laval landlords. Family-focused marketing across Chomedey, Sainte-Dorothée, and Vimont with Bill 96-compliant leases and TAL-aware pricing.',
    heroHeadline: 'Laval Leasing, Built for the Off-Island Family Market',
    heroLede:
      'Laval rentals attract families and dual-income professionals who want Montreal access without Montreal rent. MoveSmart places vetted tenants with French-first marketing, Bill 96-compliant leases, and metro-corridor positioning.',
    rentalMarketSummary:
      'Laval is the largest off-island suburb of Montreal and the most family-dominant rental market in greater Montreal. The tenant base is heavily francophone household-formation: dual-income couples and growing families priced out of inner-Montreal neighbourhoods, alongside a meaningful newcomer population drawn by school catchments and affordability. Inventory blends mid-rise and low-rise apartment stock along the Boulevard des Laurentides and Highway 440 corridors, plex supply in Chomedey and Pont-Viau, and a steady trickle of newer condo towers near the Cartier, de la Concorde, and Montmorency metro stations on the orange line extension. The metro access is the single most valuable marketing lever - Laval units within walking distance of a station lease faster and at measurable premium. Western communities like Sainte-Dorothée and Fabreville skew detached and semi-detached family rentals. Vacancy is persistently tight in the metro-adjacent corridor and looser farther west, and disciplined pricing keeps good tenants for multi-year tenures.',
    landlordProblem:
      'Laval owners commonly under-market the metro story. A unit ten minutes from Montmorency station is a fundamentally different product than an equivalent Montreal Nord unit, but listings often read as generic suburban rental copy. The second pattern: pricing against Chomedey when the unit is in Vimont or Sainte-Rose (or vice versa), where the comparable sets diverge sharply. And out-of-province owners frequently present English-only leases that do not meet Bill 96 consent standards, creating unnecessary fragility in the file.',
    howMoveSmartHelps:
      'MoveSmart prices Laval listings against tight neighbourhood comparables and leads marketing with the orange-line metro story where the asset supports it. We run French-first intake, Bill 96-compliant lease execution, and bilingual distribution where the applicant pool reaches both communities. Family-oriented screening includes school-catchment alignment conversations where appropriate, and employment verification runs across both Quebec private and public sector. Rent Guarantee is available on every Laval engagement.',
    keyNeighborhoods: [
      'Chomedey',
      'Laval-des-Rapides',
      'Pont-Viau',
      'Sainte-Dorothée',
      'Vimont',
      'Sainte-Rose',
    ],
    faqItems: [
      {
        question: 'Does proximity to the orange-line metro really change my rent?',
        answer:
          'Materially. Walking-distance units to Cartier, de la Concorde, or Montmorency command a real premium over car-dependent equivalents farther west, and they lease faster. Marketing that leads with the metro story consistently outperforms generic suburban copy.',
      },
      {
        question: 'How is Chomedey different from Sainte-Dorothée for a landlord?',
        answer:
          'Chomedey is denser, more diverse, and plex-heavy with strong newcomer demand and walkable amenity. Sainte-Dorothée is detached and semi-detached family stock with higher absolute rents but a narrower applicant pool. We price and market each against its own comparable set, not a Laval-wide average.',
      },
      {
        question: 'Is English-language marketing useful in Laval?',
        answer:
          'For metro-corridor units and newer condo supply targeting anglophone professional commuters, yes - bilingual marketing expands the applicant pool. For deeper-suburb family stock, French-first reaches the real buyer. We adjust by asset.',
      },
      {
        question: 'How do Laval rents compare to similar Montreal neighbourhoods?',
        answer:
          'Typically 10 to 20 percent below equivalent Montreal neighbourhoods at the metro-adjacent corridor, widening further into car-dependent areas. For tenants, Laval is a legitimate cost-of-living trade; for landlords, the yield math is often superior to equivalent Montreal plex inventory.',
      },
      {
        question: 'Do you handle newcomer tenant files?',
        answer:
          'Frequently. Laval has one of the strongest newcomer applicant flows in greater Montreal. We run rigorous income and reference verification with awareness that credit-file history may be thin - alternative documentation such as bank statements and employment contracts gets weighed correctly.',
      },
      {
        question: 'Is the TAL grid as active in Laval as in Montreal?',
        answer:
          'Same grid, slightly less adversarial culture than the inner-Montreal neighbourhoods but the mechanics are identical. Tenants can file fixations on aggressive increases. We price new leases at true market and keep in-tenancy increases defensible.',
      },
      {
        question: 'Do you work with owner-occupied plex in Pont-Viau or Chomedey?',
        answer:
          'Yes - a large share of Laval plex inventory is owner-occupied. We screen with lifestyle fit in mind and document shared-building rules in the lease so the neighbour-relationship and the tenancy stay aligned.',
      },
      {
        question: 'Does MoveSmart collect the rent after lease signing?',
        answer:
          'No. We are a leasing brokerage. We place the tenant and exit at lease execution. The Rent Guarantee add-on covers missed rent during the coverage term; ongoing receipt and operations stay with you.',
      },
    ],
    primaryKeyword: 'leasing services Laval',
    secondaryKeywords: [
      'tenant placement Laval',
      'courtage locatif Laval',
      'Chomedey rental agent',
      'Laval metro condo leasing',
      'Sainte-Dorothée family rental',
      'off-island Montreal leasing',
      'orange line rental Laval',
    ],
    regulatoryNote: QC_REGULATORY_NOTE,
  },

  // =====================================================================
  // QUEBEC - 4. GATINEAU
  // =====================================================================
  gatineau: {
    slug: 'gatineau',
    name: 'Gatineau',
    province: 'Quebec',
    provinceSlug: 'quebec',
    provinceCode: 'QC',
    tier: 1,
    seoTitle: 'Leasing Services in Gatineau | MoveSmart Rentals',
    metaDescription:
      'Bilingual tenant placement for Gatineau landlords. Federal-worker-focused screening, Hull and Aylmer leasing, Bill 96-compliant with Ottawa-commuter premium pricing.',
    heroHeadline: 'Gatineau Leasing, for the Ottawa-Adjacent Bilingual Market',
    heroLede:
      'Gatineau rentals command federal-commuter premiums when marketed correctly to the Ottawa-facing professional pool. MoveSmart handles bilingual intake, Bill 96-compliant leases, and screening fluent with federal employment verification.',
    rentalMarketSummary:
      'Gatineau is Quebec\'s fourth-largest city and the most cross-border-dynamic rental market in the country. Its economic spine is the federal public service - a substantial share of tenant applicants work in Ottawa-based federal departments and commute across the Alexandra, Portage, or Chaudière bridges. That cross-river workforce pushes Gatineau into a strange pricing band: genuinely cheaper than Ottawa equivalents, but meaningfully above most other Quebec markets outside Montreal. Hull, as the downtown core, leads on walkability and restaurant amenity; Aylmer carries a more anglophone, family-detached profile; Buckingham and Masson-Angers sit farther east with lower rents and larger lots. Condo supply in the Hull downtown core has grown noticeably, competing directly with Ottawa\'s ByWard-adjacent inventory on commuter convenience and price. Vacancy compresses hard during federal hiring waves and is otherwise stable. The market is genuinely bilingual - francophone majority, significant anglophone minority - and listings that only reach one community leave real rent on the table.',
    landlordProblem:
      'The recurring Gatineau problem is landlords who market only in French and miss the anglophone federal-worker inflow, or who market only in English and breach Bill 96 lease norms. A second common issue: pricing against Ottawa equivalents (too high) or against non-commuter Quebec markets (too low). And federal-employment verification has specific patterns - security-cleared applicants, term-versus-indeterminate distinctions - that generic screening misses.',
    howMoveSmartHelps:
      'MoveSmart runs every Gatineau placement bilingually, with a French-default lease and proper English consent documentation where the tenant prefers. We price against a specific Gatineau-Ottawa cross-river comparable set that reflects the real commuter premium and distribute through federal-facing channels (including employer internal relocation feeds where accessible). Employment verification handles indeterminate, term, and seasonal federal structures fluently. Rent Guarantee is available; our engagement closes cleanly at signed lease.',
    keyNeighborhoods: [
      'Hull (downtown Gatineau)',
      'Aylmer',
      'Gatineau sector (Pointe-Gatineau)',
      'Buckingham',
      'Plateau de Hull',
      'Masson-Angers',
    ],
    faqItems: [
      {
        question: 'How much below Ottawa should I price a Gatineau unit?',
        answer:
          'The honest answer varies by neighbourhood and bridge proximity, but a Hull downtown condo typically sits 15 to 25 percent below a comparable ByWard or Centretown unit, narrowing for Aylmer family stock and widening for eastern Gatineau. We pull cross-river comps on every listing so the pricing reflects real commuter substitution.',
      },
      {
        question: 'Is bilingual marketing actually necessary?',
        answer:
          'Essential. Gatineau\'s federal-worker applicant pool reaches deep into both language communities, and single-language listings consistently underperform. We write copy that reads native in both languages and distribute across LesPAC, Kijiji, federal-facing channels, and social groups on both sides of the river.',
      },
      {
        question: 'How do you verify federal-employment applicants?',
        answer:
          'Indeterminate federal employees verify cleanly through pay-stub and letter-of-employment documentation. Term and contract employees require a closer look at contract-end dates versus lease term. Security-cleared applicants sometimes have redacted pay docs - we have established workarounds that protect both the landlord and the applicant\'s clearance.',
      },
      {
        question: 'Do Gatineau leases need to be in French?',
        answer:
          'Default yes under Bill 96, with express tenant consent required for any other language. We draft French-first and present a companion English copy where the tenant prefers, documenting consent properly. Getting this wrong creates enforcement risk that is easily avoided.',
      },
      {
        question: 'Is Aylmer a harder rental market than Hull?',
        answer:
          'Different applicant pool. Aylmer skews English-speaking, family-detached, and school-catchment-driven; Hull is denser, bilingual, and professional-condo. We market each with the right channels and language mix rather than running a generic Gatineau campaign.',
      },
      {
        question: 'How does the TAL grid apply to federal-worker tenants?',
        answer:
          'Identically to any other Quebec tenant - federal employment does not change the rent-regulation mechanics. We set new-lease rent at market and keep in-tenancy increases within defensible ranges relative to the TAL annual recommendation.',
      },
      {
        question: 'What about short-term federal relocations?',
        answer:
          'One-year federal-relocation leases are common and perfectly viable. We structure the lease term and break-fee language appropriately and run Rent Guarantee where the owner wants coverage for the full term regardless of the assignment outcome.',
      },
      {
        question: 'Does MoveSmart act as the landlord contact after signing?',
        answer:
          'No. MoveSmart is a leasing brokerage - we place the tenant and exit at signed lease. The owner remains the landlord of record. Rent Guarantee covers missed rent for the coverage term; day-to-day operations stay with you.',
      },
    ],
    primaryKeyword: 'leasing services Gatineau',
    secondaryKeywords: [
      'tenant placement Gatineau',
      'Hull condo leasing',
      'Aylmer rental agent',
      'federal worker rental Gatineau',
      'Ottawa commuter leasing Quebec',
      'courtage locatif Gatineau',
      'cross-river rental',
    ],
    regulatoryNote: QC_REGULATORY_NOTE,
  },

  // =====================================================================
  // QUEBEC - 5. LONGUEUIL
  // =====================================================================
  longueuil: {
    slug: 'longueuil',
    name: 'Longueuil',
    province: 'Quebec',
    provinceSlug: 'quebec',
    provinceCode: 'QC',
    tier: 1,
    seoTitle: 'Leasing Services in Longueuil | MoveSmart Rentals',
    metaDescription:
      'Concierge tenant placement for Longueuil landlords. South-shore Montreal leasing with metro-corridor pricing, Bill 96-compliant leases, and bilingual professional screening.',
    heroHeadline: 'Longueuil Leasing, for the South-Shore Metro-Corridor Market',
    heroLede:
      'Longueuil rentals offer true Montreal-metro access at off-island pricing. MoveSmart places vetted tenants with French-first marketing, Bill 96-compliant leases, and yellow-line-aware comparable pricing.',
    rentalMarketSummary:
      'Longueuil is the largest city on Montreal\'s south shore and the terminus of the yellow metro line at Longueuil-Université-de-Sherbrooke. That single metro stop - one stop from Berri-UQAM - defines the premium tier of the rental market, anchoring Vieux-Longueuil as a professional-commuter neighbourhood with condo and mid-rise supply that competes directly with off-island Montreal at lower rent. The broader agglomeration includes Saint-Hubert (airport adjacent, larger-lot family stock), Brossard (denser, diverse, growing condo inventory near the REM light-rail extension), and Greenfield Park (quieter, anglophone-leaning). The REM light-rail buildout is a genuine market-reshaping event on the south shore, and investor landlords have moved well ahead of station openings. Tenant demand is steady year-round with a modest September bump tied to UQAM and Polytechnique commuter flows. Vacancy compresses tight in the Vieux-Longueuil metro-walking radius and loosens deeper into Saint-Hubert. Bilingual marketing matters more here than anywhere on the south shore outside Brossard, where it matters most.',
    landlordProblem:
      'The recurring Longueuil problem is misplaced pricing by neighbourhood. A Vieux-Longueuil metro-adjacent condo is a different product than a Saint-Hubert family rental, yet many listings price off a Longueuil-wide average. The REM story is also frequently under-marketed - owners in Brossard with upcoming stations should be leading with that narrative and are not. Add generic French-only or English-only marketing missing half the applicant pool, and under-rent outcomes are routine.',
    howMoveSmartHelps:
      'MoveSmart prices every Longueuil listing against neighbourhood-specific comparables with explicit awareness of metro and REM proximity. We run bilingual marketing across LesPAC, Kijiji, and south-shore Facebook groups, lead with the transit story where it materially affects rent, and screen with full Quebec credit and employment verification. Our engagement closes at signed lease with Rent Guarantee available for coverage term certainty.',
    keyNeighborhoods: [
      'Vieux-Longueuil',
      'Saint-Hubert',
      'Brossard',
      'Greenfield Park',
      'Boucherville (adjacent)',
      'LeMoyne',
    ],
    faqItems: [
      {
        question: 'How much does the yellow-line metro stop really matter?',
        answer:
          'It is the single strongest pricing lever in Vieux-Longueuil. One stop to Berri-UQAM puts a professional tenant in downtown Montreal in under five minutes, and walking-distance condo stock commands a measurable premium over south-shore equivalents without direct metro access.',
      },
      {
        question: 'Should I market the REM if my unit is in Brossard?',
        answer:
          'Absolutely. The REM light-rail network is a genuine market event and applicants are already pricing it in. Marketing copy for Brossard inventory should lead with the specific station, travel time, and commute advantage - generic Brossard copy leaves rent on the table.',
      },
      {
        question: 'Is Saint-Hubert a slower rental market than Vieux-Longueuil?',
        answer:
          'Slower but healthy. Saint-Hubert is car-dependent family stock with larger lots and lower rents, and the applicant pool is narrower but stable. We market and price it differently, with school-catchment and driveway-plus-yard framing rather than metro-commuter copy.',
      },
      {
        question: 'Do you handle bilingual marketing as a default?',
        answer:
          'Yes - the south-shore applicant pool splits meaningfully across both languages, particularly in Brossard and Greenfield Park. Listings run bilingually with native-quality copy in each language, and the lease itself is French-default with proper Bill 96 consent for English companion.',
      },
      {
        question: 'What are the UQAM and Polytechnique commuter flows like?',
        answer:
          'Steady but modest relative to Montreal-direct neighbourhoods. A Vieux-Longueuil unit near the metro attracts graduate students and professional-program commuters as a real sub-segment; we layer those channels in for the September cycle without treating it as the primary applicant pool.',
      },
      {
        question: 'How does the TAL grid apply to south-shore units?',
        answer:
          'Identically to on-island Quebec - the mechanics do not change by region. We set new-lease rent at market, keep in-tenancy increases within defensible ranges, and prepare owners for fixation-request scenarios where relevant.',
      },
      {
        question: 'Is Longueuil cheaper than on-island Montreal for equivalent stock?',
        answer:
          'Generally yes, particularly moving away from the metro stop. The metro-walking radius in Vieux-Longueuil narrows the gap sharply, sometimes matching Plateau-periphery pricing. We benchmark unit by unit rather than assuming a flat off-island discount.',
      },
      {
        question: 'Does MoveSmart manage the property after signing?',
        answer:
          'No. We are a leasing brokerage. We place the tenant, execute the lease, and - with Rent Guarantee - cover missed rent for the coverage term. Ongoing building operations remain with you.',
      },
    ],
    primaryKeyword: 'leasing services Longueuil',
    secondaryKeywords: [
      'tenant placement Longueuil',
      'Vieux-Longueuil condo leasing',
      'Brossard REM rental',
      'south-shore Montreal leasing',
      'courtage locatif Longueuil',
      'Saint-Hubert family rental',
      'yellow line metro rental',
    ],
    regulatoryNote: QC_REGULATORY_NOTE,
  },

  // =====================================================================
  // BRITISH COLUMBIA - 1. VANCOUVER
  // =====================================================================
  vancouver: {
    slug: 'vancouver',
    name: 'Vancouver',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    provinceCode: 'BC',
    tier: 1,
    seoTitle: 'Leasing Services in Vancouver | MoveSmart Rentals',
    metaDescription:
      'White-glove tenant placement and rent-guarantee leasing in Vancouver, BC. Vancouver Charter-aware, speculation-tax fluent, and concierge screening for condo, laneway, and detached owners.',
    heroHeadline: 'Vancouver Leasing, for Canada\'s Most Demanding Asset Class',
    heroLede:
      'Vancouver rentals carry Canada\'s highest pricing, strictest tenant protections, and most nuanced regulatory overlay. MoveSmart places vetted tenants into condos, laneways, and detached homes with RTB-compliant leases and speculation-tax-aware guidance.',
    rentalMarketSummary:
      'Vancouver is the most expensive, regulation-dense, and operationally complex rental market in the country. The city operates under the Vancouver Charter and layers its own rules - most notably the empty-homes tax - on top of the provincial Residential Tenancy Branch (RTB) framework and the BC speculation and vacancy tax. Inventory splits sharply by asset class: downtown and West End glass-condo towers dominate the professional-renter market; detached and duplex stock in Kitsilano, Kerrisdale, and Point Grey trades as premium family rental; and the laneway-house proliferation post-2010 has created a significant secondary-suite supply in single-family neighbourhoods. Tenant demand is structurally far in excess of supply, and pricing is consistently at or near the top of Canadian benchmarks. The regulatory tilt is distinctly tenant-favourable - no-fault evictions are tightly constrained, annual rent caps are CPI-linked, and the RTB dispute process is well-used. For landlords, the premium yield is real but every file must be structurally sound from day one; the cost of a bad tenant placement here exceeds any other Canadian market.',
    landlordProblem:
      'Vancouver landlords repeatedly make three mistakes. First, under-screening in a rush to fill at peak rent - the city\'s RTB framework makes bad tenancies extremely expensive to unwind, and a single skipped reference check can compound for months. Second, mishandling the annual rent-increase cap or in-tenancy rent discussions, which invites RTB disputes. Third, under-understanding the speculation-tax and empty-homes-tax implications of short unit vacancies, which silently punish weak leasing strategy. And foreign-owner files routinely struggle with notice and service requirements.',
    howMoveSmartHelps:
      'MoveSmart runs every Vancouver placement through rigorous RTB-compliant intake: written tenancy agreement on the standard form, condition inspection report executed and signed, pet and smoking terms explicitly documented, and security deposit handled correctly. Screening follows OHRC / BC Human Rights Code standards with full credit, employment, and landlord references - no shortcuts, ever, because the downside risk is asymmetric. We price against live neighbourhood comparables with speculation-tax and empty-homes-tax vacancy-cost awareness built in. Rent Guarantee is available and in Vancouver it earns its keep.',
    keyNeighborhoods: [
      'Downtown / Yaletown',
      'West End',
      'Kitsilano',
      'Mount Pleasant',
      'Kerrisdale',
      'East Vancouver (Commercial Drive / Strathcona)',
    ],
    faqItems: [
      {
        question: 'How tight is the RTB rent cap really?',
        answer:
          'The annual allowable increase is set each year, CPI-linked, and strictly enforced. It applies to existing tenancies, not new ones - between tenants you reset to market. In-tenancy increases above the cap are simply not collectible without specific RTB approval, and attempting to collect more creates dispute exposure.',
      },
      {
        question: 'Does the empty-homes tax affect my leasing timing?',
        answer:
          'Yes. A property vacant beyond the threshold period in a calendar year triggers the Vancouver empty-homes tax (on top of the BC speculation and vacancy tax in many cases). A slow leasing process is not neutral - it is a direct tax cost. We build timing discipline into every Vancouver engagement for exactly this reason.',
      },
      {
        question: 'Are no-fault evictions really that restricted?',
        answer:
          'Very. Landlord-use and renovation-based evictions require strict documentation and extended notice, and bad-faith use exposes the landlord to substantial compensation orders. The reliable answer is to place the right tenant the first time - not to plan around ending the tenancy later.',
      },
      {
        question: 'How do you screen for Vancouver\'s expected price points?',
        answer:
          'Full credit report, employment verification with pay-stub and letter-of-employment, minimum two prior-landlord references with direct calls, and income-to-rent ratios held to conservative levels given Vancouver\'s cost base. International tenants get additional documentation - bank statements, work-permit status, and relocation-package letters where applicable.',
      },
      {
        question: 'What about laneway-house rentals specifically?',
        answer:
          'Laneways are a genuine asset class of their own in Vancouver. The leasing process is identical but we pay particular attention to shared-yard, parking, and utility allocation language, and we screen with lifestyle alignment to the primary-house occupants where applicable.',
      },
      {
        question: 'Do you help with condition inspection reports?',
        answer:
          'Yes - the move-in condition inspection report is required and MoveSmart coordinates a proper walkthrough with documentation. Many Vancouver disputes trace back to weak inspection paperwork; we close that gap as part of lease execution.',
      },
      {
        question: 'Can foreign owners use MoveSmart?',
        answer:
          'Frequently. Remote-owner and foreign-owner leasing is a significant share of our Vancouver engagements. We handle service-of-notice logistics, tax-withholding documentation interfaces, and ensure the owner\'s RTB position is properly represented.',
      },
      {
        question: 'Does MoveSmart manage the property after signing?',
        answer:
          'No. MoveSmart is a leasing brokerage - we place the tenant and exit at signed lease. Rent Guarantee covers missed rent during the coverage term. Ongoing operations, RTB filings during the tenancy, and maintenance stay with you or your chosen operator.',
      },
    ],
    primaryKeyword: 'leasing services Vancouver',
    secondaryKeywords: [
      'tenant placement Vancouver',
      'Vancouver condo leasing',
      'laneway house rental Vancouver',
      'RTB compliant lease BC',
      'Kitsilano rental agent',
      'Vancouver landlord services',
      'empty homes tax leasing',
    ],
    regulatoryNote: BC_REGULATORY_NOTE,
  },

  // =====================================================================
  // BRITISH COLUMBIA - 2. SURREY
  // =====================================================================
  surrey: {
    slug: 'surrey',
    name: 'Surrey',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    provinceCode: 'BC',
    tier: 1,
    seoTitle: 'Leasing Services in Surrey | MoveSmart Rentals',
    metaDescription:
      'Concierge tenant placement for Surrey landlords. SkyTrain-extension-aware pricing, multilingual marketing, RTB-compliant leases, and rent-guaranteed leasing across Newton, Whalley, and Fleetwood.',
    heroHeadline: 'Surrey Leasing, for BC\'s Fastest-Growing Rental Market',
    heroLede:
      'Surrey is on track to overtake Vancouver in population and its rental market is scaling just as fast. MoveSmart places vetted tenants with SkyTrain-corridor pricing, multilingual marketing, and full RTB-compliant lease execution.',
    rentalMarketSummary:
      'Surrey is the fastest-growing municipality in British Columbia and on a trajectory to surpass Vancouver in population within this decade. That growth reshapes the rental market every year. Inventory is bifurcated: single-family detached and secondary-suite supply dominates the older neighbourhoods of Newton, Fleetwood, and Guildford, while Whalley (City Centre) has become the most active condo-construction corridor in the Lower Mainland outside downtown Vancouver. The demographic base is one of the most diverse in Canada - a substantial South Asian majority in several sub-areas that makes Punjabi-language marketing a real lever rather than a nice-to-have, layered with significant Filipino, Chinese, and newcomer communities. The SkyTrain Expo Line extension southeast toward Langley reshapes tenant pricing every station opening, and condo investor landlords near confirmed stations have moved ahead of the shovels. Vacancy is tight across nearly all sub-markets, and SFU Surrey and Kwantlen Polytechnic University provide a modest student overlay. Surrey outperforms most of BC on rent-growth trajectory and tenant retention.',
    landlordProblem:
      'Surrey landlords routinely under-reach the applicant pool by marketing only in English and only through Craigslist and Facebook Marketplace. The single largest avoidable mistake is missing the Punjabi-speaking applicant pool, which for many sub-markets is the primary tenant base. Second pattern: investor owners of Whalley pre-construction condos who close into a finished market without a leasing plan and sit vacant during the highest-demand weeks. Third: misreading the SkyTrain extension effect and pricing either too conservatively (leaving rent) or too aggressively (losing weeks).',
    howMoveSmartHelps:
      'MoveSmart runs multilingual marketing - English, Punjabi, and additional languages where the asset warrants - across Facebook groups, Kijiji, Craigslist, and BC-specific South Asian community channels. Pricing is anchored to live sub-market comparables with SkyTrain-corridor and station-opening awareness. Screening follows BC Human Rights Code and RTB norms with full credit, employment, and landlord references. Pre-construction condo owners get a closing-to-occupancy marketing timeline that consistently fills the unit within the first week of possession. Rent Guarantee is available.',
    keyNeighborhoods: [
      'Whalley / City Centre',
      'Newton',
      'Fleetwood',
      'Guildford',
      'South Surrey / White Rock adjacent',
      'Cloverdale',
    ],
    faqItems: [
      {
        question: 'Is Punjabi-language marketing actually necessary?',
        answer:
          'For most Surrey sub-markets, yes - particularly Newton, parts of Fleetwood, and Cloverdale. The Punjabi-speaking applicant pool is the primary tenant base in several neighbourhoods, and English-only marketing systematically under-reaches the qualified applicant flow. We produce native-quality copy and distribute through the right community channels.',
      },
      {
        question: 'How does the SkyTrain Expo Line extension affect my rent?',
        answer:
          'Materially near confirmed station locations, and the effect is already priced into tenant applications today rather than waiting for opening day. We market the specific station and commute time for qualifying units, which consistently accelerates lease-up versus generic Surrey copy.',
      },
      {
        question: 'I just closed on a Whalley pre-construction condo - when should I start marketing?',
        answer:
          'Three to four weeks before occupancy. Whalley condo supply is absorbing fast but the first week post-occupancy is where the best applicants are concentrated. Waiting until keys in hand consistently produces a week or two of unnecessary vacancy in a tax-sensitive province.',
      },
      {
        question: 'How do you screen applicants in a diverse market like Surrey?',
        answer:
          'Full credit report, employment verification, landlord references called directly, and income-to-rent ratios applied consistently. BC Human Rights Code discipline is absolute - decisions are based on documented financial and tenancy history, never on identity factors. The rigor does not change by neighbourhood.',
      },
      {
        question: 'Is secondary-suite rental in Newton or Guildford a different product?',
        answer:
          'Yes. Legal secondary suites are a substantial and legitimate Surrey rental class, typically screened for single occupants or small households and priced against basement-suite comparables. We verify legality and confirm shared-utility and entrance arrangements are documented in the lease.',
      },
      {
        question: 'Does the BC rent cap apply to Surrey the same way as Vancouver?',
        answer:
          'Identically - the provincial cap is province-wide and CPI-linked. Municipal boundary does not change the mechanics. We set new-lease rent at market and keep in-tenancy increases at or below the annual cap.',
      },
      {
        question: 'Do you work with SFU Surrey or Kwantlen student applicants?',
        answer:
          'Yes, where the asset supports it. Student applicants get the same rigorous screening with guarantor documentation layered in where appropriate. For Whalley condos near SFU Surrey, student demand is a real sub-segment we market to directly.',
      },
      {
        question: 'Does MoveSmart continue to manage after lease signing?',
        answer:
          'No. MoveSmart is a leasing brokerage, not a property manager. We place the tenant and exit at signed lease. Rent Guarantee covers missed rent during the coverage term; operations remain with you.',
      },
    ],
    primaryKeyword: 'leasing services Surrey',
    secondaryKeywords: [
      'tenant placement Surrey BC',
      'Whalley condo leasing',
      'Newton rental agent',
      'SkyTrain extension rental',
      'Punjabi rental marketing Surrey',
      'South Surrey landlord services',
      'Cloverdale leasing',
    ],
    regulatoryNote: BC_REGULATORY_NOTE,
  },

  // =====================================================================
  // BRITISH COLUMBIA - 3. BURNABY
  // =====================================================================
  burnaby: {
    slug: 'burnaby',
    name: 'Burnaby',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    provinceCode: 'BC',
    tier: 1,
    seoTitle: 'Leasing Services in Burnaby | MoveSmart Rentals',
    metaDescription:
      'White-glove tenant placement for Burnaby landlords. SFU-aware pricing, Metrotown and Brentwood condo leasing, RTB-compliant and fluent with BC tech-corridor professional tenants.',
    heroHeadline: 'Burnaby Leasing, Between SFU, Tech, and the Metrotown Spine',
    heroLede:
      'Burnaby rentals draw students, tech workers, and professional couples in equal measure. MoveSmart places vetted tenants with SkyTrain-anchored pricing, full RTB compliance, and marketing tuned to SFU, BCIT, and the Brentwood tech corridor.',
    rentalMarketSummary:
      'Burnaby sits at the structural centre of Metro Vancouver, and its rental market reflects that central-node role. Three distinct demand engines drive the city: Simon Fraser University\'s Burnaby Mountain campus creates a substantial student and graduate-student tenant flow tied tightly to the academic calendar; the Brentwood and Metrotown condo corridors along the SkyTrain Expo and Millennium lines have absorbed major tech-sector and professional-couple demand; and BCIT adds a continuous trades and applied-sciences applicant stream. Inventory skews heavily to tower condo in the Metrotown, Brentwood, and Lougheed sub-markets - each anchored by SkyTrain interchange - with meaningful secondary-suite supply in older single-family neighbourhoods across South Slope, Capitol Hill, and Burnaby Heights. Vacancy is persistently tight near every SkyTrain station, and rents consistently benchmark above the Metro Vancouver average excluding Vancouver proper. Burnaby is one of the strongest investor-landlord markets in BC on yield, pricing discipline, and tenant-retention metrics combined.',
    landlordProblem:
      'The recurring Burnaby issue is SFU-calendar mistiming: landlords with Burnaby Mountain-adjacent units who market in late August for September 1 arrive after the serious students have already committed. Second pattern: Metrotown and Brentwood condo owners who price against downtown Vancouver (too high) or against Coquitlam (too low) when the right comparable set is specific Burnaby tower stock. Third: secondary-suite owners who under-disclose utility arrangements and end up with month-three disputes that should have been settled at lease drafting.',
    howMoveSmartHelps:
      'MoveSmart aligns Burnaby marketing to the academic calendar for SFU-adjacent units - listings live by mid-May for September starts - and prices SkyTrain tower stock against specific sub-market comparables rather than metro averages. Tech-corridor marketing leans into commute-time data points for Brentwood and Lougheed units. Screening follows BC RTB and Human Rights Code standards with full credit, employment, and landlord references. Rent Guarantee is available across all Burnaby engagements.',
    keyNeighborhoods: [
      'Metrotown',
      'Brentwood',
      'Lougheed',
      'Burnaby Heights',
      'South Slope',
      'SFU / Burnaby Mountain',
    ],
    faqItems: [
      {
        question: 'When should I start marketing an SFU-adjacent unit for September?',
        answer:
          'Mid-May at the latest. The serious graduate and upper-year applicants commit before July for a September 1 start, and late-August marketing reaches the thinner end of the pool. Early marketing consistently produces stronger tenants and higher accepted rent.',
      },
      {
        question: 'How does Metrotown pricing compare to downtown Vancouver?',
        answer:
          'Meaningfully lower on equivalent tower stock, typically 10 to 20 percent depending on unit type and building. The comparable set is specific - other Metrotown and Brentwood towers near SkyTrain - not generic Metro Vancouver averages. We benchmark unit by unit.',
      },
      {
        question: 'Is the Brentwood tech-corridor story real?',
        answer:
          'Yes. Brentwood and adjacent corridors have absorbed significant tech-worker demand, and commute-time marketing to the downtown and Mount Pleasant tech employment nodes genuinely moves rent. We include that in the listing copy for qualifying units.',
      },
      {
        question: 'Do secondary suites rent well in Burnaby?',
        answer:
          'Consistently, when legal and properly documented. Burnaby Heights, South Slope, and Capitol Hill suites trade as a legitimate sub-market with strong tenant demand. We verify legality, confirm utility and parking arrangements, and document shared-space rules in the lease.',
      },
      {
        question: 'How do you screen tech-sector applicants?',
        answer:
          'Standard rigour - full credit, employment verification via letter and pay stub, two prior-landlord references called directly. Tech employees with equity compensation or stock-vesting schedules sometimes need additional income-documentation work; we handle that without slowing the file.',
      },
      {
        question: 'Does the BC rent cap make increases difficult?',
        answer:
          'The CPI-linked annual cap applies to existing tenancies. Between tenants you reset to market. In-tenancy increases above the cap are not collectible without specific RTB approval. We set new-lease rent at market and keep in-tenancy increases compliant.',
      },
      {
        question: 'Do you work with BCIT student applicants?',
        answer:
          'Yes. BCIT draws a continuous flow of applied-sciences and trades applicants, many on co-op or short-term credentials. We layer guarantor documentation where needed and match applicants to appropriate Burnaby unit types.',
      },
      {
        question: 'Does MoveSmart handle monthly rent collection?',
        answer:
          'No. We are a leasing brokerage. We place the tenant and exit at signed lease. Rent Guarantee covers missed rent for the coverage term; ongoing rent receipt and operations stay with you.',
      },
    ],
    primaryKeyword: 'leasing services Burnaby',
    secondaryKeywords: [
      'tenant placement Burnaby',
      'Metrotown condo leasing',
      'Brentwood rental agent',
      'SFU student rental Burnaby',
      'BCIT housing Burnaby',
      'SkyTrain rental Burnaby',
      'Lougheed leasing',
    ],
    regulatoryNote: BC_REGULATORY_NOTE,
  },

  // =====================================================================
  // BRITISH COLUMBIA - 4. RICHMOND
  // =====================================================================
  richmond: {
    slug: 'richmond',
    name: 'Richmond',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    provinceCode: 'BC',
    tier: 1,
    seoTitle: 'Leasing Services in Richmond | MoveSmart Rentals',
    metaDescription:
      'Concierge tenant placement for Richmond landlords. Mandarin-language marketing, airport-adjacent condo leasing, Canada Line pricing, and RTB-compliant leases with rent guarantee.',
    heroHeadline: 'Richmond Leasing, Where Mandarin-First Marketing Is the Baseline',
    heroLede:
      'Richmond rentals operate in a market where Mandarin-first marketing is not a differentiator but a requirement. MoveSmart places vetted tenants with bilingual listings, Canada Line-aware pricing, and full RTB-compliant lease execution.',
    rentalMarketSummary:
      'Richmond is the most demographically specific rental market in BC and arguably in Canada. A substantial Mandarin-speaking population concentrated in the city centre and along the No. 3 Road corridor makes Chinese-language marketing a baseline requirement - listings that reach only English audiences systematically under-reach the qualified applicant pool. Inventory is dominated by condo stock in City Centre, Brighouse, and along the Canada Line SkyTrain corridor, with meaningful single-family and townhome supply in Steveston, Hamilton, and the Terra Nova area. The airport (YVR) is a major employer and produces steady aerospace, logistics, and hospitality-sector tenant flows. The Olympic Oval district in the south of the city remains one of the best-performing condo sub-markets for professional tenants. Richmond rents benchmark below Vancouver proper but above most other Metro Vancouver suburbs, with Canada Line proximity as the single strongest pricing lever. Vacancy is tight in the City Centre corridor and moderate in the detached Steveston and Hamilton sub-markets. The market rewards precision - right language, right channel, right price.',
    landlordProblem:
      'The dominant Richmond mistake is English-only marketing. A Richmond City Centre condo listed only on English-language channels reaches a fraction of the qualified applicant pool and consistently under-performs. The second pattern: foreign owners who under-estimate the empty-homes-tax and speculation-tax implications of vacancy, treating leasing as optional when it is fundamentally a tax-efficiency discipline. Third: Canada Line proximity underutilized in marketing copy on units that should lead with it.',
    howMoveSmartHelps:
      'MoveSmart runs every qualifying Richmond listing in both English and Mandarin simultaneously, with native-quality copy and distribution through the channels that reach the real applicant pool (WeChat groups, Mandarin-language real-estate sites, and the major English platforms). Pricing is anchored to specific sub-market comparables - Brighouse, Terra Nova, Steveston each benchmark differently. Screening follows BC RTB and Human Rights Code standards with full credit, employment, landlord references, and international-applicant documentation workflows for newcomer files. Rent Guarantee is available.',
    keyNeighborhoods: [
      'Richmond City Centre / Brighouse',
      'Steveston',
      'Terra Nova',
      'Hamilton',
      'Olympic Oval district',
      'Thompson',
    ],
    faqItems: [
      {
        question: 'Is Mandarin-language marketing really required in Richmond?',
        answer:
          'For most City Centre, Brighouse, and Olympic Oval condo stock, yes - English-only listings systematically under-reach the qualified applicant pool. We produce native-quality Mandarin copy and distribute through WeChat groups, Mandarin real-estate sites, and the English mainstream platforms simultaneously.',
      },
      {
        question: 'How much does Canada Line proximity affect rent?',
        answer:
          'Meaningfully. Walking-distance units to Brighouse, Lansdowne, Aberdeen, or Bridgeport stations command a real premium over car-dependent equivalents, and the commute story to downtown Vancouver matters to professional applicants. We lead marketing with that for qualifying units.',
      },
      {
        question: 'Do foreign owners work well with MoveSmart?',
        answer:
          'Frequently - foreign and remote-owner engagements are a substantial share of our Richmond work. We handle tax-withholding interfaces, service-of-notice logistics, and speculation-tax and empty-homes-tax vacancy-cost awareness built into the leasing timeline.',
      },
      {
        question: 'Is Steveston a different rental market than City Centre?',
        answer:
          'Sharply different. Steveston is detached and townhome-dominant, family-oriented, and English-language primary. City Centre is condo-dominant, Mandarin-language primary, and professional-oriented. We adjust comparable pull, marketing language, and channel mix completely.',
      },
      {
        question: 'How does the airport employment base affect tenant flow?',
        answer:
          'YVR produces a steady applicant stream across aerospace, logistics, customs, and hospitality roles. Those tenants typically prefer Hamilton, Burkeville, and Thompson for proximity, and we screen with awareness of shift-work schedules and airport-specific employer verification.',
      },
      {
        question: 'What about empty-homes and speculation taxes?',
        answer:
          'Both taxes penalize vacancy meaningfully. A slow leasing process is not neutral for Richmond owners - it is a direct tax cost. We structure every engagement to minimize days vacant within RTB-compliant screening standards, never sacrificing screening rigor for speed.',
      },
      {
        question: 'Can you handle international newcomer applicants?',
        answer:
          'Yes. Richmond has one of the strongest international-newcomer applicant flows in BC. Thin credit files get supplemented with bank statements, employment contracts, and visa documentation. The rigor stays the same; the documentation pathway adapts.',
      },
      {
        question: 'Does MoveSmart manage the property after signing?',
        answer:
          'No. MoveSmart is a leasing brokerage - we place the tenant and exit at signed lease. Rent Guarantee covers missed rent for the coverage term. Ongoing building operations remain with you.',
      },
    ],
    primaryKeyword: 'leasing services Richmond',
    secondaryKeywords: [
      'tenant placement Richmond BC',
      'Mandarin rental marketing Richmond',
      'Richmond condo leasing',
      'Canada Line rental',
      'Steveston family rental',
      'YVR airport leasing',
      'Olympic Oval condo rental',
    ],
    regulatoryNote: BC_REGULATORY_NOTE,
  },

  // =====================================================================
  // BRITISH COLUMBIA - 5. VICTORIA
  // =====================================================================
  victoria: {
    slug: 'victoria',
    name: 'Victoria',
    province: 'British Columbia',
    provinceSlug: 'british-columbia',
    provinceCode: 'BC',
    tier: 1,
    seoTitle: 'Leasing Services in Victoria | MoveSmart Rentals',
    metaDescription:
      'White-glove tenant placement for Victoria landlords. UVic-aware pricing, government and healthcare tenant screening, RTB-compliant leases, and rent-guaranteed leasing across BC\'s capital.',
    heroHeadline: 'Victoria Leasing, for BC\'s Supply-Starved Capital Market',
    heroLede:
      'Victoria rentals sit in one of the tightest markets in the country. MoveSmart places vetted tenants across government, healthcare, and UVic demand pools with precise RTB-compliant leasing and disciplined comparable pricing.',
    rentalMarketSummary:
      'Victoria is the capital of British Columbia and one of the most structurally supply-constrained rental markets in the country. Three tenant engines drive persistent demand: the provincial government workforce clustered across James Bay, downtown, and Fairfield; a large healthcare and senior-services sector built around Royal Jubilee and Victoria General Hospital; and the University of Victoria with its graduate-student and faculty overlay in the Gordon Head / UVic sub-market. The retiree and semi-retired segment is also genuinely large - Victoria\'s reputation as a retirement destination is not marketing copy but measurable demographic reality, and it shapes the single-family and condo pet-friendly sub-markets. Inventory is weighted toward older heritage and mid-rise stock downtown, post-2000 condo towers in the Songhees and Vic West districts, and single-family supply across Oak Bay, Fairfield, and Saanich. Vacancy is persistently below the Canadian benchmark, and rent-growth has outpaced most of Western Canada over the last rental cycles. Pricing discipline and RTB-compliant files matter as much here as in Vancouver; the tenant-protection regime is identical, and the dispute process is well-used.',
    landlordProblem:
      'Victoria landlords routinely miss the timing of the UVic cycle - marketing a Gordon Head unit in August for September 1 arrives after the real applicant commitments have been made. Second pattern: James Bay and downtown owners who price against mainland BC (wrong) instead of against tight island-specific comparables. Third: retiree-oriented units where landlords under-disclose pet policies or accessibility features in the listing and lose the strongest long-tenure applicants. Fourth: weak RTB-compliant condition reports that turn routine move-outs into disputes.',
    howMoveSmartHelps:
      'MoveSmart times UVic-adjacent marketing to the academic calendar, with listings live by mid-May for September starts. Pricing is anchored to island-specific comparables - Victoria and Saanich differ from any mainland benchmark. Government-employee and healthcare-worker screening handles provincial-public-service pay structures, VIHA employment verification, and shift-work income documentation fluently. Every lease is executed on the proper BC tenancy form with a full condition inspection report, and Rent Guarantee is available across all engagements.',
    keyNeighborhoods: [
      'Downtown Victoria',
      'James Bay',
      'Fairfield / Cook Street Village',
      'Oak Bay',
      'Gordon Head / UVic',
      'Songhees / Vic West',
    ],
    faqItems: [
      {
        question: 'When should I list a UVic-area unit for September?',
        answer:
          'Mid-May at the latest. UVic graduate students and returning upper-year tenants commit well before July for September 1. Late-August listings reach only the thinner, less prepared end of the pool and consistently produce weaker tenants at weaker rent.',
      },
      {
        question: 'Is Oak Bay a slower rental market than downtown?',
        answer:
          'Different, not slower. Oak Bay skews detached, higher-income, and retiree or established-professional - the applicant pool is narrower but typically very long-tenure. Downtown and Songhees move faster with higher turnover. We price and market each against its own comparable set.',
      },
      {
        question: 'How do you screen provincial-government tenants?',
        answer:
          'Provincial civil servants verify cleanly through the government HR process. Indeterminate employees are straightforward; auxiliary and term positions require a closer look at contract-end dates versus lease term. Healthcare tenants through VIHA follow a similar pathway. Income stability is a genuine strength of this cohort.',
      },
      {
        question: 'Does the BC rent cap really matter in Victoria?',
        answer:
          'As much as anywhere in BC. The CPI-linked annual cap is strictly enforced, applies to existing tenancies, and resets between tenants. Attempting in-tenancy increases above the cap is not collectible without RTB approval. We coach owners through what is defensible.',
      },
      {
        question: 'Are retiree tenants really a significant applicant segment?',
        answer:
          'Yes - Victoria\'s retiree and semi-retired demographic is a structural feature of the market, not an incidental one. They are typically long-tenure, quiet, financially stable tenants who respond to pet-friendly and accessibility-forward listings. We market to that segment explicitly when the asset supports it.',
      },
      {
        question: 'How does the condition inspection report work?',
        answer:
          'The move-in condition inspection report is required under BC rules and must be executed and signed at move-in. MoveSmart coordinates a thorough walkthrough with photo documentation so routine move-outs do not spiral into RTB disputes. This single document prevents most deposit-return fights.',
      },
      {
        question: 'What about heritage-stock rentals in James Bay?',
        answer:
          'Heritage properties carry specific operational considerations - older wiring, original windows, heating systems - that affect both the rent you can charge and the tenant profile that fits. We screen and market with those realities in mind, and we document condition carefully given the higher likelihood of wear-and-tear debates.',
      },
      {
        question: 'Does MoveSmart manage the unit after signing?',
        answer:
          'No. MoveSmart is a leasing brokerage - we place the tenant and exit at signed lease. Rent Guarantee covers missed rent during the coverage term. Ongoing building operations and RTB filings stay with you.',
      },
    ],
    primaryKeyword: 'leasing services Victoria',
    secondaryKeywords: [
      'tenant placement Victoria BC',
      'UVic student rental Victoria',
      'James Bay condo leasing',
      'Oak Bay rental agent',
      'BC government tenant leasing',
      'Victoria landlord services',
      'Fairfield rental',
    ],
    regulatoryNote: BC_REGULATORY_NOTE,
  },

  // =====================================================================
  // ALBERTA - 1. CALGARY
  // =====================================================================
  calgary: {
    slug: 'calgary',
    name: 'Calgary',
    province: 'Alberta',
    provinceSlug: 'alberta',
    provinceCode: 'AB',
    tier: 1,
    seoTitle: 'Leasing Services in Calgary | MoveSmart Rentals',
    metaDescription:
      'White-glove tenant placement for Calgary landlords. Free-market rent positioning, Stampede-aware strategy, energy-sector workforce screening, and rent-guaranteed leasing across Beltline, Bridgeland, and the inner suburbs.',
    heroHeadline: 'Calgary Leasing, for Alberta\'s Free-Market Rent Regime',
    heroLede:
      'Calgary has no rent cap - pricing is true free-market between tenancies, which cuts both ways. MoveSmart places vetted tenants with energy-sector-aware screening, Beltline and inner-suburb comparable discipline, and Rent Guarantee protection.',
    rentalMarketSummary:
      'Calgary is the largest free-market rent environment in Canada and the rental market most directly exposed to commodity cycles. Alberta\'s Residential Tenancies Act imposes no provincial rent cap, which means pricing adjusts quickly in both directions and landlords operate with real market signal. Inventory is bifurcated: downtown and Beltline condo towers carry a heavy oil-and-gas professional base; inner-suburb detached and infill stock in Bridgeland, Inglewood, Altadore, and Hillhurst-Sunnyside trades as premium family rental; and the outer communities of Calgary\'s north, south, and northeast handle larger-square-foot family homes with longer tenant tenure. The downtown office-vacancy overhang has compressed Beltline and downtown condo rents relative to inner-suburb detached, and savvy investors have rotated. Stampede week is a real short-term premium for fully-furnished and short-term stock, but long-term leasing strategy should not anchor to it. The University of Calgary and Mount Royal University add a modest student overlay. Vacancy swings with energy-sector hiring - 2026 enters with tightening conditions after several years of recovery.',
    landlordProblem:
      'Calgary landlords regularly misprice by anchoring to peak or trough rather than current market. The free-market regime punishes stale pricing in both directions - too high and the unit sits, too low and the owner leaves a full rental year of yield on the table. Second pattern: Beltline and downtown condo owners who do not account for the office-vacancy drag on commuter demand and market their unit as if 2014 downtown still existed. Third: energy-sector applicant files handled without awareness of contract, consulting, and indeterminate employment distinctions, which compresses screening accuracy.',
    howMoveSmartHelps:
      'MoveSmart anchors every Calgary listing to live current-quarter comparables pulled by specific community, not city-wide averages that wash out the Beltline-vs-Bridgeland spread. Energy-sector employment verification is a core competency - contract, consulting, executive-relocation, and indeterminate files each get the right documentation workflow. Screening follows Alberta Human Rights Act standards with full credit, employment, and landlord references. Stampede-week strategy is offered for owners who want short-term premium, but our default is disciplined long-term placement with Rent Guarantee protection across the engagement.',
    keyNeighborhoods: [
      'Beltline',
      'Bridgeland',
      'Inglewood',
      'Altadore / Marda Loop',
      'Hillhurst-Sunnyside',
      'Mission',
    ],
    faqItems: [
      {
        question: 'Does Alberta really have no rent cap?',
        answer:
          'Correct. The Residential Tenancies Act imposes no provincial limit on rent increases between tenancies or within a tenancy with proper notice. This cuts both ways - you can reset to market freely, but the market is also unforgiving of over-pricing in a soft quarter. Accurate pricing matters more here, not less.',
      },
      {
        question: 'How much does downtown office vacancy affect Beltline rents?',
        answer:
          'Measurably. The downtown office-vacancy overhang has compressed Beltline and downtown condo rents relative to inner-suburb detached stock. Many owners still anchor to 2014 peaks; the current market prices differently. We pull quarter-fresh comparables so the listing reads right to a real applicant.',
      },
      {
        question: 'Should I capture the Stampede-week premium?',
        answer:
          'Only if your strategy is explicitly short-term or furnished-executive. Stampede week is a real revenue pocket but it does not justify leaving a long-term unit vacant the other fifty-one weeks. Most Calgary owners are better served by disciplined long-term placement with Rent Guarantee coverage.',
      },
      {
        question: 'How do you verify energy-sector applicants?',
        answer:
          'Indeterminate employees of the major operators verify cleanly through letter-of-employment and pay stub. Contract consultants and executive-relocation files require a look at contract-end dates, relocation-package letters, and income structure. We have established workflows for each pattern.',
      },
      {
        question: 'Is Bridgeland really different from the Beltline for a landlord?',
        answer:
          'Meaningfully different. Bridgeland is detached and infill family stock with longer tenure and higher absolute rents; Beltline is tower condo with professional-couple turnover. Comparable sets, marketing copy, and typical tenant profile diverge completely. We treat them as separate sub-markets.',
      },
      {
        question: 'What about 24-hour inspection notice requirements?',
        answer:
          'Alberta requires 24-hour written notice before a landlord inspection during a tenancy. Breaches can surface later as disputes. We document the required notice processes in the lease schedule and coach owners on compliant practice from day one.',
      },
      {
        question: 'Are U of C and MRU student tenants worth pursuing?',
        answer:
          'A modest but real sub-segment. We layer student-specific channels for qualifying units near campus, with guarantor documentation where income is thin. For most Calgary inventory, professional and family tenants remain the primary applicant pool.',
      },
      {
        question: 'Does MoveSmart handle the unit after lease signing?',
        answer:
          'No. MoveSmart is a leasing brokerage - we place the tenant and exit at signed lease. Rent Guarantee covers missed rent for the coverage term. Ongoing operations remain with you.',
      },
    ],
    primaryKeyword: 'leasing services Calgary',
    secondaryKeywords: [
      'tenant placement Calgary',
      'Beltline condo leasing',
      'Bridgeland rental agent',
      'energy sector rental Calgary',
      'Alberta free market rent',
      'Inglewood leasing',
      'Calgary landlord services',
    ],
    regulatoryNote: AB_REGULATORY_NOTE,
  },

  // =====================================================================
  // ALBERTA - 2. EDMONTON
  // =====================================================================
  edmonton: {
    slug: 'edmonton',
    name: 'Edmonton',
    province: 'Alberta',
    provinceSlug: 'alberta',
    provinceCode: 'AB',
    tier: 1,
    seoTitle: 'Leasing Services in Edmonton | MoveSmart Rentals',
    metaDescription:
      'Concierge tenant placement for Edmonton landlords. U of A-aware pricing, provincial-government screening, Whyte Ave and Oliver condo leasing with free-market positioning and rent guarantee.',
    heroHeadline: 'Edmonton Leasing, for the Alberta Capital\'s Steady Free-Market Engine',
    heroLede:
      'Edmonton rentals reward disciplined pricing and timing to the U of A academic cycle. MoveSmart places vetted tenants across provincial-government, healthcare, and student pools with free-market pricing and Rent Guarantee protection.',
    rentalMarketSummary:
      'Edmonton is the provincial capital and the steadier, less commodity-exposed of Alberta\'s two major rental markets. The tenant base is anchored by three large engines: the Government of Alberta workforce with its indeterminate and auxiliary employment structures, the University of Alberta with one of the largest on-and-off-campus student populations in Western Canada, and Alberta Health Services with its hospital-district and ambulatory-care clinical sites. Inventory splits between downtown and Oliver condo towers, the Whyte Ave / Garneau student-adjacent corridor, mature inner-community detached and infill across Belgravia, Windsor Park, and Grandin, and the large outer-suburb family-home market. The 4-to-6-week typical vacancy between tenants reflects both the academic calendar\'s strong seasonal effect and the free-market pricing regime that punishes stale listings quickly. Edmonton rents consistently benchmark below Calgary for equivalent stock, and yield math on well-located inner-city inventory remains some of the strongest in Canadian major markets. The ICE District redevelopment downtown has reshaped the downtown condo applicant pool toward younger professionals.',
    landlordProblem:
      'Edmonton landlords routinely mistime the U of A cycle - a Garneau unit marketed in August for September arrives after the serious applicants have committed elsewhere. Second pattern: over-pricing against Calgary comparables when the Edmonton market operates 10 to 20 percent below Calgary on most asset classes. Third: provincial-government and AHS employment verification handled without fluency in the specific HR processes, which slows screening and loses applicants to faster competitors.',
    howMoveSmartHelps:
      'MoveSmart times U of A-adjacent marketing to the academic calendar with listings live by mid-May for September starts. Pricing anchors to Edmonton-specific comparables pulled by community, not Alberta averages. Provincial-government and AHS applicant screening handles indeterminate, term, auxiliary, and contract structures fluently. Full Alberta Human Rights Act-compliant credit, employment, and landlord reference checks on every file. Rent Guarantee is available across all Edmonton engagements and is particularly valuable given the 4-to-6-week typical vacancy window.',
    keyNeighborhoods: [
      'Downtown / ICE District',
      'Oliver',
      'Whyte Ave / Garneau',
      'Strathcona',
      'Glenora',
      'Belgravia / Windsor Park',
    ],
    faqItems: [
      {
        question: 'When should I list a Garneau unit for September?',
        answer:
          'Mid-May at the latest. U of A students commit early for September 1, and late-August marketing reaches only the thinner end of the pool. Early marketing consistently produces stronger tenants, higher accepted rent, and no August vacancy tail.',
      },
      {
        question: 'How much cheaper is Edmonton than Calgary really?',
        answer:
          'Typically 10 to 20 percent below Calgary on equivalent stock, widening for premium downtown condo and narrowing for inner-suburb family detached. We pull Edmonton-specific comparables rather than Alberta averages so listings read right to the applicant.',
      },
      {
        question: 'How do you verify provincial-government tenants?',
        answer:
          'Indeterminate Government of Alberta employees verify cleanly through letter-of-employment and pay stub. Auxiliary and term employees require attention to contract-end dates versus lease term. We know the common pay-cycle and documentation patterns and do not slow the file for details.',
      },
      {
        question: 'Is the 4-to-6-week vacancy cycle normal?',
        answer:
          'It is the structural Edmonton reality outside of peak academic timing. Rent Guarantee coverage makes that window tax-efficient rather than revenue-damaging. Strong pricing and early marketing compress it, but expecting one-week turnover is unrealistic outside of specific sub-markets.',
      },
      {
        question: 'Does Alberta really have no rent cap?',
        answer:
          'Correct. No provincial rent cap exists. You can reset to market between tenants and can increase within a tenancy with proper notice. The free-market regime cuts both ways - accurate current pricing is what protects yield, not aggressive pricing.',
      },
      {
        question: 'What about Whyte Ave nightlife and student-area rentals?',
        answer:
          'Garneau and Strathcona student-adjacent units trade as a specific sub-market. Tenant profile skews undergraduate and graduate, turnover is annual, and screening leans on guarantor documentation. We adjust lease terms and marketing to match, rather than forcing a standard professional-tenant playbook.',
      },
      {
        question: 'How does the ICE District affect downtown leasing?',
        answer:
          'Materially - downtown and Oliver condo applicant flow has shifted younger and more professional with the ICE District build-out. Marketing copy that leads with the amenity and walkability story outperforms generic downtown Edmonton listings.',
      },
      {
        question: 'Does MoveSmart manage after lease signing?',
        answer:
          'No. We are a leasing brokerage. We place the tenant, execute the lease, and - with Rent Guarantee - cover missed rent for the coverage term. Operations stay with you.',
      },
    ],
    primaryKeyword: 'leasing services Edmonton',
    secondaryKeywords: [
      'tenant placement Edmonton',
      'U of A student rental Edmonton',
      'Oliver condo leasing',
      'Whyte Ave rental agent',
      'Edmonton landlord services',
      'Alberta government tenant leasing',
      'ICE District rental',
    ],
    regulatoryNote: AB_REGULATORY_NOTE,
  },

  // =====================================================================
  // ALBERTA - 3. RED DEER
  // =====================================================================
  'red-deer': {
    slug: 'red-deer',
    name: 'Red Deer',
    province: 'Alberta',
    provinceSlug: 'alberta',
    provinceCode: 'AB',
    tier: 1,
    seoTitle: 'Leasing Services in Red Deer | MoveSmart Rentals',
    metaDescription:
      'White-glove tenant placement for Red Deer landlords. Service-hub professional screening, oilfield and agricultural tenant fluency, free-market pricing, and rent-guaranteed leasing.',
    heroHeadline: 'Red Deer Leasing, for Mid-Alberta\'s Service-Hub Rental Market',
    heroLede:
      'Red Deer rentals sit between Alberta\'s two major markets and draw workforce tenants from agriculture, oilfield services, healthcare, and regional trade. MoveSmart places vetted tenants with free-market pricing and Rent Guarantee protection.',
    rentalMarketSummary:
      'Red Deer is the third-largest city in Alberta and the principal service hub for central Alberta, sitting halfway between Calgary and Edmonton on Highway 2. The rental market is driven by a diverse regional workforce: oilfield services and pipeline contracting, agricultural processing, Red Deer Regional Hospital and central-Alberta healthcare, regional retail and trades, and a growing post-secondary base at Red Deer Polytechnic. Inventory skews toward low-rise apartment, townhome, and detached family stock, with limited condo-tower supply compared to Calgary and Edmonton. Downtown Red Deer has a mix of older walk-ups and newer mixed-use buildings, while the south-east and west-park sub-markets carry larger-lot family detached homes. Vacancy tracks commodity cycles more closely than either Calgary or Edmonton - oilfield-services hiring directly moves Red Deer tenant demand quarter to quarter. Rents are meaningfully below the two major metros and yield math on correctly-priced properties is consistently favourable. The market rewards landlords who understand the workforce mix and market to the right channels.',
    landlordProblem:
      'Red Deer landlords commonly over-rely on Kijiji and Facebook Marketplace alone, missing the relocation and contract-worker applicant flow that drives the strongest applicants. Second pattern: under-screening oilfield and contract-workforce files without attention to contract-end dates versus lease term, which produces mid-lease departures that should have been foreseeable. Third: anchoring to Calgary comparables and over-pricing for a smaller, more workforce-driven market.',
    howMoveSmartHelps:
      'MoveSmart prices every Red Deer listing against city-specific comparables pulled by sub-area, with awareness of current oilfield-services hiring conditions that move demand. Marketing distributes across workforce-relocation channels, not just local classifieds. Screening handles oilfield contract, agricultural-processing, and healthcare employment verification fluently - each with distinct documentation pathways. Full Alberta Human Rights Act compliance on every file. Rent Guarantee is available and particularly valuable given the workforce-cycle vacancy exposure.',
    keyNeighborhoods: [
      'Downtown Red Deer',
      'West Park',
      'Eastview',
      'Riverside Meadows',
      'Timberlands',
      'Johnstone Park',
    ],
    faqItems: [
      {
        question: 'How much does the oilfield cycle really affect Red Deer rents?',
        answer:
          'Materially - more than Calgary or Edmonton because the central-Alberta service-hub workforce leans more directly on oilfield-services hiring. Quarter-to-quarter vacancy can swing with rig counts and pipeline project timing. We pull current-quarter comparables rather than cycle-averaged ones.',
      },
      {
        question: 'Are Red Deer rents really that much below Calgary?',
        answer:
          'Substantially lower - often 25 to 40 percent below equivalent Calgary stock depending on asset type. Benchmarking against Calgary is the wrong anchor. We price against central-Alberta comparables and awareness of the specific sub-area within Red Deer.',
      },
      {
        question: 'How do you screen oilfield-contract workers?',
        answer:
          'Contract-workforce files need a close look at contract-end date versus lease term. Income is typically strong but duration uncertainty matters. We document employer, contract structure, and typical extension pattern in the screening file so the landlord knows what tenure to expect.',
      },
      {
        question: 'Is Red Deer Polytechnic a meaningful student rental driver?',
        answer:
          'A modest but growing sub-segment. Trades and applied-sciences programs produce a steady applicant flow for units near campus. We layer student-channel marketing for qualifying assets without treating it as the primary applicant pool.',
      },
      {
        question: 'How does the Alberta no-rent-cap rule apply in Red Deer?',
        answer:
          'Identically to the rest of the province - no provincial rent cap, free-market pricing between tenancies, in-tenancy increases with proper notice. The practical effect in a workforce-cycle market is that accurate current-quarter pricing matters more than pricing philosophy.',
      },
      {
        question: 'Do agricultural-processing workers make reliable tenants?',
        answer:
          'Typically yes - employment through the major central-Alberta processors is stable and verifiable. Shift work is the norm and we screen with awareness of shift-differential pay structures and employer-specific HR workflows.',
      },
      {
        question: 'What about Red Deer Regional Hospital staff?',
        answer:
          'Healthcare tenants through AHS verify cleanly through the standard employment pathway. They are typically long-tenure and stable, particularly full-time indeterminate staff. We screen consistently with our Edmonton and Calgary healthcare files.',
      },
      {
        question: 'Does MoveSmart handle the property after signing?',
        answer:
          'No. MoveSmart is a leasing brokerage. We place the tenant and exit at signed lease. Rent Guarantee covers missed rent for the coverage term; ongoing operations stay with you.',
      },
    ],
    primaryKeyword: 'leasing services Red Deer',
    secondaryKeywords: [
      'tenant placement Red Deer',
      'Red Deer rental agent',
      'oilfield worker rental Alberta',
      'central Alberta leasing',
      'Red Deer landlord services',
      'Riverside Meadows rental',
      'workforce rental Alberta',
    ],
    regulatoryNote: AB_REGULATORY_NOTE,
  },

  // =====================================================================
  // ALBERTA - 4. LETHBRIDGE
  // =====================================================================
  lethbridge: {
    slug: 'lethbridge',
    name: 'Lethbridge',
    province: 'Alberta',
    provinceSlug: 'alberta',
    provinceCode: 'AB',
    tier: 1,
    seoTitle: 'Leasing Services in Lethbridge | MoveSmart Rentals',
    metaDescription:
      'Concierge tenant placement for Lethbridge landlords. U of L student-cycle timing, agricultural and food-processing tenant screening, free-market pricing, and rent guarantee.',
    heroHeadline: 'Lethbridge Leasing, for Southern Alberta\'s Student and Agricultural Anchor',
    heroLede:
      'Lethbridge rentals combine a strong University of Lethbridge student cycle with stable agricultural and food-processing workforce demand. MoveSmart places vetted tenants with academic-calendar-aware timing and Alberta free-market pricing.',
    rentalMarketSummary:
      'Lethbridge is the largest city in southern Alberta and a genuinely well-balanced small-metro rental market. Three engines drive tenant demand: the University of Lethbridge with its approximately 8,000 students across undergraduate and graduate programs anchoring the west-side rental stock; the agricultural and food-processing sector including major employers in grain, beef, and vegetable processing; and the Chinook Regional Hospital healthcare base. Inventory is dominated by low-rise apartment, townhome, and detached family housing, with modest condo supply in the downtown and university-adjacent corridors. West Lethbridge holds the bulk of student-adjacent rental stock; north Lethbridge carries older established-community detached homes; south and east Lethbridge skew family rental. Vacancy swings on the U of L cycle - dramatically tight in August and September, looser through the winter and late spring. Rent-to-income ratios in Lethbridge are among the most favourable in Canadian mid-sized cities, which translates to strong tenant payment reliability and low dispute rates. The market rewards owners who time the academic calendar and screen consistently.',
    landlordProblem:
      'Lethbridge landlords regularly mistime the U of L cycle - a west-side unit marketed in August is reaching the academic applicants too late, while marketing live by late May captures the strongest tenants. Second pattern: under-pricing against current quarter reality; Lethbridge rents have moved with Alberta free-market dynamics and 2022-era pricing is no longer current. Third: agricultural-workforce screening without attention to seasonal employment structures, which surfaces as mid-lease surprises.',
    howMoveSmartHelps:
      'MoveSmart times U of L-adjacent marketing to the academic calendar with listings live by late May for September starts. Pricing anchors to current-quarter Lethbridge-specific comparables, not cycle-averaged data. Agricultural, food-processing, and healthcare employment screening each have distinct documentation workflows we handle fluently. Full Alberta Human Rights Act-compliant credit, employment, and landlord reference checks. Rent Guarantee is available and well-matched to the student-cycle vacancy exposure pattern.',
    keyNeighborhoods: [
      'West Lethbridge (U of L adjacent)',
      'Downtown / South Side',
      'North Lethbridge',
      'Scenic Heights',
      'Copperwood',
      'Uplands',
    ],
    faqItems: [
      {
        question: 'When should I list a west-side unit for the U of L September cycle?',
        answer:
          'Late May at the latest for September 1 starts. U of L students commit for the fall term earlier than many people assume, and late-August listings reach a thinner, less prepared applicant pool. Early marketing produces stronger tenants and higher accepted rent.',
      },
      {
        question: 'How does agricultural-worker tenure compare to other tenants?',
        answer:
          'Long-tenure for indeterminate processing employees, shorter for seasonal harvest and processing contractors. We document the specific employment structure in the screening file and align lease term accordingly - a seasonal-contract tenant on a 12-month lease is a foreseeable problem, not an unforeseeable one.',
      },
      {
        question: 'Are Lethbridge rents really rising?',
        answer:
          'Consistently, across the last several rental cycles. Alberta\'s free-market regime combined with tight west-side vacancy and stable workforce demand has moved Lethbridge rents meaningfully. Pricing against 2022 data leaves substantial yield on the table. We pull current comparables quarterly.',
      },
      {
        question: 'Is Chinook Regional Hospital a strong tenant source?',
        answer:
          'Yes. AHS healthcare staff at Chinook typically verify cleanly, carry stable income, and stay long-tenure. We screen consistently with our Calgary and Edmonton healthcare files.',
      },
      {
        question: 'How does the Alberta no-rent-cap rule apply in Lethbridge?',
        answer:
          'Identically to the rest of Alberta - no provincial rent cap, free-market pricing between tenancies, in-tenancy increases with proper notice. Accurate current-quarter pricing is the key discipline, not aggressive rate-setting.',
      },
      {
        question: 'What about short summer leases for U of L graduate students?',
        answer:
          'Workable for some units but generally not the strongest yield play. We structure four- or eight-month leases where the asset supports it but default to twelve-month terms that line up with the academic calendar.',
      },
      {
        question: 'Is north Lethbridge a different rental market than west side?',
        answer:
          'Yes. North Lethbridge skews older established-community detached and semi-detached, with longer-tenure working-family tenants. West side is student-adjacent and higher-turnover. We price and market each with the right applicant pool in mind.',
      },
      {
        question: 'Does MoveSmart manage after lease signing?',
        answer:
          'No. MoveSmart is a leasing brokerage. We place the tenant and exit at signed lease. Rent Guarantee covers missed rent for the coverage term; operations remain with you.',
      },
    ],
    primaryKeyword: 'leasing services Lethbridge',
    secondaryKeywords: [
      'tenant placement Lethbridge',
      'U of L student rental',
      'West Lethbridge rental agent',
      'agricultural worker rental Lethbridge',
      'Chinook Regional Hospital rental',
      'southern Alberta leasing',
      'Lethbridge landlord services',
    ],
    regulatoryNote: AB_REGULATORY_NOTE,
  },

  // =====================================================================
  // ALBERTA - 5. SHERWOOD PARK
  // =====================================================================
  'sherwood-park': {
    slug: 'sherwood-park',
    name: 'Sherwood Park',
    province: 'Alberta',
    provinceSlug: 'alberta',
    provinceCode: 'AB',
    tier: 1,
    seoTitle: 'Leasing Services in Sherwood Park | MoveSmart Rentals',
    metaDescription:
      'White-glove tenant placement for Sherwood Park landlords. Strathcona County family-executive screening, oil and petrochemical workforce fluency, free-market pricing, and rent guarantee.',
    heroHeadline: 'Sherwood Park Leasing, for Strathcona County\'s Family-Executive Market',
    heroLede:
      'Sherwood Park rentals are the premium family-executive tier of the Edmonton region. MoveSmart places vetted tenants with petrochemical-workforce screening, large-lot family marketing, and Alberta free-market pricing.',
    rentalMarketSummary:
      'Sherwood Park is an urban service area of Strathcona County, immediately east of Edmonton, and the premium family-executive rental market of the capital region. The tenant base is anchored by the Alberta Industrial Heartland - North America\'s largest petrochemical and upgrading complex, including major refining and chemical operations that employ a substantial executive and technical workforce. Sherwood Park rentals therefore skew toward dual-income professional families, executive-relocation tenants on one-to-three-year assignments, and long-tenure local professionals in healthcare, trades, and regional services. Inventory is dominated by detached and semi-detached family homes across Broadview, Glen Allen, Maplegrove, and Heritage Hills, with modest townhome and apartment supply. Condo-tower inventory is limited. Rents consistently benchmark above Edmonton proper on equivalent detached stock, reflecting the executive applicant pool and the strong Elk Island school catchments. Vacancy is tight for well-presented family homes and looser for apartment stock that struggles against Edmonton alternatives. The market rewards landlords who market the family-executive story and screen with awareness of relocation-package structures.',
    landlordProblem:
      'Sherwood Park landlords frequently under-market the executive-relocation story. A well-presented detached home in Heritage Hills is a different product than an Edmonton equivalent, and listings that do not lead with Elk Island schools, large-lot yards, and petrochemical-executive commute value leave rent unclaimed. Second pattern: executive-relocation files screened as standard employment without awareness of relocation-package structures, which compresses accuracy. Third: over-pricing apartment stock that legitimately competes against looser Edmonton inventory.',
    howMoveSmartHelps:
      'MoveSmart markets Sherwood Park family-detached listings with Elk Island school-catchment, large-lot, and executive-commute framing. Executive-relocation applicants get a screening pathway that accepts relocation-package letters, corporate-guarantee structures, and appropriate income documentation. Apartment-stock pricing anchors against true local comparables rather than aspirational executive benchmarks. Full Alberta Human Rights Act-compliant screening on every file. Rent Guarantee is available across all engagements.',
    keyNeighborhoods: [
      'Broadview',
      'Glen Allen',
      'Maplegrove',
      'Heritage Hills',
      'Summerwood',
      'Salisbury Village',
    ],
    faqItems: [
      {
        question: 'How much above Edmonton do Sherwood Park detached rents typically sit?',
        answer:
          'Measurably - often 10 to 20 percent above equivalent Edmonton detached stock, reflecting the executive-applicant pool and Elk Island school catchments. The premium is most pronounced in Heritage Hills and Maplegrove. We pull comparables specific to Strathcona County, not Edmonton-metro averages.',
      },
      {
        question: 'How do you screen executive-relocation applicants?',
        answer:
          'Relocation-package letters, corporate-guarantee structures, and pay documentation all get weighed appropriately. Typical files involve a one-to-three-year assignment with employer-supported housing allowance. We confirm the employer, the assignment duration, and the guarantee pathway before approving.',
      },
      {
        question: 'Is the Industrial Heartland really a major tenant source?',
        answer:
          'Yes - the upgrading and chemical complex east of Edmonton drives a substantial executive and technical workforce, much of which lives in Sherwood Park for the commute and schools. Marketing that leads with the Heartland-commute story outperforms generic Edmonton-area copy.',
      },
      {
        question: 'Do Elk Island schools actually affect rent?',
        answer:
          'Meaningfully for family-detached stock. Applicants with school-aged children filter on catchment, and listings that document the specific schools serve as both rent-justification and applicant-filter. We surface the catchment clearly in listing copy.',
      },
      {
        question: 'How does the Alberta no-rent-cap rule apply?',
        answer:
          'Identically to the rest of the province - no provincial rent cap, free-market pricing between tenancies, proper-notice in-tenancy increases. Sherwood Park\'s executive tenant base tends to accept market-accurate increases without dispute if they are clearly justified.',
      },
      {
        question: 'What about shorter executive-relocation leases?',
        answer:
          'One-year and two-year terms are common and work well. We structure the lease to match the assignment duration, include appropriate break-fee language where needed, and run Rent Guarantee to protect against premature departures.',
      },
      {
        question: 'Is apartment-stock leasing different in Sherwood Park?',
        answer:
          'Yes - apartment and low-rise inventory competes more directly against looser Edmonton alternatives and commands less of the executive premium. We price it against true local comparables and market it to the right applicant cohort rather than stretching for executive-tier rent.',
      },
      {
        question: 'Does MoveSmart manage the property after signing?',
        answer:
          'No. MoveSmart is a leasing brokerage. We place the tenant and exit at signed lease. Rent Guarantee covers missed rent for the coverage term; operations remain with you.',
      },
    ],
    primaryKeyword: 'leasing services Sherwood Park',
    secondaryKeywords: [
      'tenant placement Sherwood Park',
      'Strathcona County rental agent',
      'executive relocation rental Sherwood Park',
      'Heritage Hills leasing',
      'Industrial Heartland rental',
      'Elk Island school rental',
      'Edmonton area executive rental',
    ],
    regulatoryNote: AB_REGULATORY_NOTE,
  },

  // =====================================================================
  // NOVA SCOTIA - 1. HALIFAX
  // =====================================================================
  halifax: {
    slug: 'halifax',
    name: 'Halifax',
    province: 'Nova Scotia',
    provinceSlug: 'nova-scotia',
    provinceCode: 'NS',
    tier: 1,
    seoTitle: 'Leasing Services in Halifax | MoveSmart Rentals',
    metaDescription:
      'White-glove tenant placement for Halifax landlords. Dal and SMU student-cycle timing, military and healthcare tenant fluency, provincial rent-cap awareness, and rent-guaranteed leasing.',
    heroHeadline: 'Halifax Leasing, for Atlantic Canada\'s Tightest Rental Market',
    heroLede:
      'Halifax rentals have seen some of the steepest rent growth in Canada since 2022. MoveSmart places vetted tenants across university, military, and healthcare pools with rent-cap-compliant pricing and Rent Guarantee protection.',
    rentalMarketSummary:
      'Halifax is the largest city in Atlantic Canada and the rental market that has experienced the most dramatic supply-demand transformation of any Canadian secondary metro since 2022. Rent growth has consistently run at or near the top of the national leaderboard, driven by a combination of record in-migration from other provinces, limited new purpose-built supply, and a structurally strong underlying demand base. Four tenant engines drive the market: a dense university cluster including Dalhousie, Saint Mary\'s, NSCAD, and Mount Saint Vincent; a large hospital and clinical base at the QEII Health Sciences Centre and IWK Health Centre; the Canadian Armed Forces presence at CFB Halifax (one of Canada\'s largest naval bases); and a growing professional services and public-sector base. Inventory splits among the historic South End and West End (student-adjacent detached and low-rise), the downtown and Dartmouth waterfront condo corridors, and the large outer-suburb detached-family market in Bedford, Clayton Park, and the Sackville / Lower Sackville line. Provincial rent-cap rules are actively enforced, and disciplined landlords operate within them while still capturing strong rent resets between tenancies.',
    landlordProblem:
      'Halifax landlords routinely mishandle the provincial rent cap during in-tenancy increases - attempting increases above the cap creates Residential Tenancies Board disputes that delay and damage files. Second pattern: misreading the post-2022 renoviction rules and assuming pre-pandemic playbook still applies. Third: mistiming the university cycle - South End and West End units marketed in August for September arrive too late. Fourth: under-valuing military-posting files, where CFB Halifax produces some of the most reliable and long-tenure tenants in the market when screened correctly.',
    howMoveSmartHelps:
      'MoveSmart times university-adjacent marketing to the academic calendar with listings live by mid-May for September starts. Pricing anchors to Halifax-specific comparables with rent-cap-compliant in-tenancy increase planning built into the engagement. CFB Halifax military-posting applicants get a dedicated screening pathway - Imposed Restriction (IR) postings, married-quarters supplements, and deployment documentation are all handled correctly. Healthcare tenants through Nova Scotia Health verify cleanly. Rent Guarantee is available across all engagements.',
    keyNeighborhoods: [
      'South End (Dal / SMU adjacent)',
      'West End',
      'Downtown / Spring Garden',
      'North End',
      'Clayton Park / Bedford',
      'Hydrostone',
    ],
    faqItems: [
      {
        question: 'How strict is the Nova Scotia rent cap really?',
        answer:
          'Strictly enforced for in-tenancy increases. The current cap applies to existing tenancies and is well-understood by the Residential Tenancies Board. Between tenants, rent resets to market. We set new-lease rent at market and keep in-tenancy increases inside the cap with clean paperwork.',
      },
      {
        question: 'When should I list a South End unit for the Dal / SMU September cycle?',
        answer:
          'Mid-May at the latest. Halifax university applicants commit early for September 1, and late-August listings reach a thinner, less prepared pool. Early marketing consistently produces stronger tenants at stronger rent.',
      },
      {
        question: 'How do you screen CFB Halifax military applicants?',
        answer:
          'Military applicants verify through the standard CAF pay documentation and posting-message pathway. Imposed Restriction (IR) postings, married-quarters supplements, and deployment schedules are all accommodated in the screening file. Military tenants are typically among the most reliable applicants in the Halifax market.',
      },
      {
        question: 'What about the renoviction rules added post-2022?',
        answer:
          'Landlord-use and renovation-based evictions now require specific documentation, extended notice, and meet strict tests. Pre-pandemic playbook no longer applies. The most reliable strategy is placing the right tenant the first time, not planning to end the tenancy later for renovation.',
      },
      {
        question: 'Are Halifax rents really still rising?',
        answer:
          'Yes, though the pace has moderated from the 2022-2023 peak. Strong in-migration and constrained new supply continue to support rent growth. We pull current-quarter comparables quarterly and price accordingly - last-year data no longer reflects the market.',
      },
      {
        question: 'Is Dartmouth a different rental market than peninsular Halifax?',
        answer:
          'Somewhat - Dartmouth is its own sub-market with a harbour-ferry commute advantage, separate waterfront condo supply, and a different mix of detached family stock. We price and market each side of the harbour with its own comparable set.',
      },
      {
        question: 'Do you work with healthcare tenants at the QEII and IWK?',
        answer:
          'Frequently. Nova Scotia Health and IWK employees verify cleanly through the standard healthcare-HR pathway and typically carry stable income with long tenure. Residents and medical students near QEII are a particular sub-segment we screen with appropriate guarantor structures.',
      },
      {
        question: 'Does MoveSmart manage after lease signing?',
        answer:
          'No. MoveSmart is a leasing brokerage. We place the tenant and exit at signed lease. Rent Guarantee covers missed rent for the coverage term; ongoing operations stay with you.',
      },
    ],
    primaryKeyword: 'leasing services Halifax',
    secondaryKeywords: [
      'tenant placement Halifax',
      'Dal student rental Halifax',
      'South End Halifax leasing',
      'CFB Halifax military rental',
      'Halifax landlord services',
      'Nova Scotia rent cap leasing',
      'Clayton Park rental',
    ],
    regulatoryNote: NS_REGULATORY_NOTE,
  },

  // =====================================================================
  // NOVA SCOTIA - 2. DARTMOUTH
  // =====================================================================
  dartmouth: {
    slug: 'dartmouth',
    name: 'Dartmouth',
    province: 'Nova Scotia',
    provinceSlug: 'nova-scotia',
    provinceCode: 'NS',
    tier: 1,
    seoTitle: 'Leasing Services in Dartmouth | MoveSmart Rentals',
    metaDescription:
      'Concierge tenant placement for Dartmouth landlords. Harbour-ferry commute marketing, naval-base family screening, rent-cap-compliant leases, and rent guarantee.',
    heroHeadline: 'Dartmouth Leasing, for the Harbour\'s Ferry-Commute Market',
    heroLede:
      'Dartmouth rentals trade against peninsular Halifax on the harbour-ferry commute and lower-entry detached stock. MoveSmart places vetted tenants with naval-base family fluency, rent-cap-compliant leasing, and Rent Guarantee protection.',
    rentalMarketSummary:
      'Dartmouth is the twin city of Halifax across the harbour and the second-largest population centre in the Halifax Regional Municipality. The rental market is structurally linked to peninsular Halifax but operates with its own distinct dynamics. Three major engines drive tenant demand: Canadian Armed Forces naval personnel and families attached to CFB Halifax / Dockyard, who frequently live on the Dartmouth side for the base proximity and married-quarters adjacency; a growing professional-couple base choosing Dartmouth for the harbour-ferry commute and lower price-entry detached stock; and a healthcare and public-sector workforce serving Dartmouth General Hospital, the Nova Scotia Hospital, and the provincial government offices. Inventory is dominated by single-family detached in Woodlawn, Cole Harbour, and Eastern Passage, with a growing waterfront condo corridor along Portland Street and the King\'s Wharf development. The harbour ferry is a genuine pricing lever for downtown-facing applicants - a six-to-twelve-minute ferry ride to downtown Halifax functionally competes with North End Halifax commute times. Rent growth has tracked the Halifax metro pattern, and the provincial rent cap applies identically.',
    landlordProblem:
      'Dartmouth landlords commonly under-market the harbour-ferry commute story. A Portland Street or King\'s Wharf unit near the ferry terminal is a different product than a generic Dartmouth listing, and copy that does not lead with the ferry commute to downtown Halifax leaves rent on the table. Second pattern: CFB Halifax military applicants handled without awareness of posting-message and IR documentation, which compresses screening accuracy. Third: rent-cap mishandling during in-tenancy increases, identical to the Halifax pattern.',
    howMoveSmartHelps:
      'MoveSmart markets ferry-adjacent Dartmouth units with the commute-to-downtown-Halifax story explicit in listing copy - the six-to-twelve-minute ride is the actual competitive advantage. Naval-base applicant screening handles posting-message and IR documentation fluently. Pricing anchors to Dartmouth-specific comparables with rent-cap-compliant in-tenancy increase planning built into the engagement. Full Nova Scotia Human Rights Act-compliant screening on every file. Rent Guarantee is available across all Dartmouth engagements.',
    keyNeighborhoods: [
      'Downtown Dartmouth / Portland Street',
      'King\'s Wharf / Waterfront',
      'Woodlawn',
      'Cole Harbour',
      'Eastern Passage',
      'Dartmouth Crossing adjacent',
    ],
    faqItems: [
      {
        question: 'How much does the harbour ferry actually affect rent?',
        answer:
          'Meaningfully for downtown-facing professional tenants. A ferry-walking-distance unit in downtown Dartmouth functionally competes with North End Halifax on commute time and undercuts on price. Listing copy that leads with the ferry-commute story consistently outperforms generic Dartmouth copy.',
      },
      {
        question: 'How do you screen CFB Halifax naval applicants?',
        answer:
          'CAF pay documentation, posting-message, and where applicable Imposed Restriction documentation all get handled in the screening file. Naval personnel and families are typically among the most reliable applicants in the Dartmouth market, with long tenure and stable income.',
      },
      {
        question: 'Is Dartmouth cheaper than peninsular Halifax?',
        answer:
          'Generally yes, though the gap has narrowed. Downtown Dartmouth condo near the ferry now approaches North End Halifax pricing. Eastern Passage and outer Cole Harbour remain meaningfully cheaper. We pull comparables specific to each Dartmouth sub-area.',
      },
      {
        question: 'How does the Nova Scotia rent cap apply?',
        answer:
          'Identically to Halifax - the cap applies to in-tenancy increases and is strictly enforced. Between tenants, rent resets to market. We set new-lease rent at market and keep in-tenancy increases compliant with clean paperwork.',
      },
      {
        question: 'Is Dartmouth Crossing a different rental sub-market?',
        answer:
          'The adjacent residential communities are a distinct sub-market - newer stock, retail-adjacent, suburban-family applicant pool. We price and market that inventory against its own comparable set rather than against downtown Dartmouth.',
      },
      {
        question: 'Do you work with Dartmouth General and Nova Scotia Hospital staff?',
        answer:
          'Frequently. Healthcare tenants verify cleanly through the standard Nova Scotia Health HR pathway and carry stable income. We screen consistently with our Halifax peninsular healthcare files.',
      },
      {
        question: 'What about Eastern Passage detached rentals?',
        answer:
          'Eastern Passage trades as a waterfront and semi-rural family rental market, typically with longer-tenure tenants who have deliberately chosen the area for lifestyle. We market with imagery and copy matched to that applicant rather than downtown Dartmouth playbook.',
      },
      {
        question: 'Does MoveSmart manage after signing?',
        answer:
          'No. MoveSmart is a leasing brokerage. We place the tenant and exit at signed lease. Rent Guarantee covers missed rent during the coverage term; operations stay with you.',
      },
    ],
    primaryKeyword: 'leasing services Dartmouth',
    secondaryKeywords: [
      'tenant placement Dartmouth',
      'harbour ferry rental Halifax',
      'CFB Halifax naval rental',
      'King\'s Wharf condo leasing',
      'Cole Harbour rental agent',
      'Dartmouth landlord services',
      'Woodlawn family rental',
    ],
    regulatoryNote: NS_REGULATORY_NOTE,
  },

  // =====================================================================
  // NOVA SCOTIA - 3. SYDNEY
  // =====================================================================
  sydney: {
    slug: 'sydney',
    name: 'Sydney',
    province: 'Nova Scotia',
    provinceSlug: 'nova-scotia',
    provinceCode: 'NS',
    tier: 1,
    seoTitle: 'Leasing Services in Sydney | MoveSmart Rentals',
    metaDescription:
      'White-glove tenant placement for Sydney, NS landlords. Cape Breton University student-cycle marketing, healthcare tenant fluency, rent-cap-compliant leases, and rent guarantee.',
    heroHeadline: 'Sydney Leasing, for Cape Breton\'s University and Healthcare Anchor',
    heroLede:
      'Sydney rentals run on a slower, steadier rhythm than the Halifax metro but with genuine pricing power tied to Cape Breton University and the regional healthcare base. MoveSmart places vetted tenants with academic-calendar timing and rent-cap-compliant leasing.',
    rentalMarketSummary:
      'Sydney is the largest community on Cape Breton Island and the service and education hub of eastern Nova Scotia. The rental market is smaller and slower-paced than the Halifax metro but has seen real rent growth over the last several cycles, driven by Cape Breton University (which has grown meaningfully through international student recruitment), the Cape Breton Regional Hospital, and a tourism and service-sector base that includes a seasonal cruise-ship industry at the Sydney waterfront. Inventory is dominated by older single-family detached stock across the former towns that now form the Cape Breton Regional Municipality - Sydney proper, Sydney Mines, North Sydney, Glace Bay, and New Waterford - with limited modern condo supply. Student rental demand around Cape Breton University has transformed portions of the Grand Lake Road and Coxheath corridors into active investor markets. Vacancy swings on the CBU cycle and on regional healthcare hiring. The provincial rent cap applies identically to the mainland, and the Residential Tenancies Board handles Sydney disputes through the regional process. Landlords who understand the academic calendar and the regional employer mix consistently outperform generic-approach owners.',
    landlordProblem:
      'Sydney landlords commonly mistime the CBU cycle - marketing in late August for September arrives after serious applicants, many of whom are international students committing months ahead, have locked in housing. Second pattern: under-valuing the rent-growth trajectory and pricing against 2020 benchmarks in a market that has moved substantially. Third: rent-cap mishandling during in-tenancy increases. Fourth: seasonal tourism inventory that tries to straddle short-term and long-term strategies without committing to either.',
    howMoveSmartHelps:
      'MoveSmart times CBU-adjacent marketing to the academic calendar with listings live by late May for September starts, distributed across international-student-facing channels where appropriate. Pricing anchors to current-quarter Sydney-specific comparables pulled across the CBRM communities. Healthcare screening through the Cape Breton Regional Hospital verifies through the standard NS Health pathway. Rent-cap-compliant in-tenancy increase planning built into every engagement. Rent Guarantee is available.',
    keyNeighborhoods: [
      'Sydney (downtown / waterfront)',
      'Grand Lake Road / CBU corridor',
      'Coxheath',
      'North Sydney',
      'Sydney Mines',
      'Glace Bay',
    ],
    faqItems: [
      {
        question: 'How much has CBU international enrollment reshaped Sydney rentals?',
        answer:
          'Substantially. International-student enrollment has grown meaningfully and reshaped the Grand Lake Road and Coxheath rental market into an active investor segment. We market to both the domestic and international student applicant pools through appropriate channels for the September cycle.',
      },
      {
        question: 'When should I list a CBU-adjacent unit?',
        answer:
          'Late May at the latest for September 1 starts. Many CBU applicants, particularly international students, commit well ahead of arrival. Late-August marketing reaches a thinner pool and typically produces weaker accepted rent.',
      },
      {
        question: 'Is Sydney really a slower market than Halifax?',
        answer:
          'Steadier, not dead. Rent growth has tracked a meaningful pace over the last several cycles. Pricing against 2020 data substantially under-rents the unit. We pull current-quarter comparables specific to each CBRM community.',
      },
      {
        question: 'How does the Nova Scotia rent cap apply in Sydney?',
        answer:
          'Identically to the rest of the province - the cap applies to in-tenancy increases and is enforced through the Residential Tenancies Board. Between tenants, rent resets to market. We set new-lease rent at market and keep in-tenancy increases compliant.',
      },
      {
        question: 'What about seasonal tourism rental strategy?',
        answer:
          'Straddling short-term tourism and long-term residential rarely works. Either commit to the short-term seasonal strategy with appropriate licensing, or commit to disciplined long-term placement with Rent Guarantee. Trying both tends to produce sub-optimal results on both sides.',
      },
      {
        question: 'Do healthcare tenants at Cape Breton Regional Hospital rent well?',
        answer:
          'Yes. Nova Scotia Health staff at the regional hospital verify cleanly through the standard HR pathway and typically carry stable income with multi-year tenure. We screen consistently with our Halifax healthcare files.',
      },
      {
        question: 'Are Glace Bay and New Waterford different rental markets?',
        answer:
          'Distinctly so - smaller, older housing stock, lower rents, longer-tenure working-family tenants. We price against specific sub-community comparables rather than a Sydney-wide average.',
      },
      {
        question: 'Does MoveSmart manage after signing?',
        answer:
          'No. MoveSmart is a leasing brokerage. We place the tenant and exit at signed lease. Rent Guarantee covers missed rent during the coverage term; operations remain with you.',
      },
    ],
    primaryKeyword: 'leasing services Sydney',
    secondaryKeywords: [
      'tenant placement Sydney NS',
      'Cape Breton University rental',
      'CBU student housing',
      'Cape Breton leasing',
      'Sydney landlord services',
      'Glace Bay rental agent',
      'CBRM leasing',
    ],
    regulatoryNote: NS_REGULATORY_NOTE,
  },

  // =====================================================================
  // NOVA SCOTIA - 4. TRURO
  // =====================================================================
  truro: {
    slug: 'truro',
    name: 'Truro',
    province: 'Nova Scotia',
    provinceSlug: 'nova-scotia',
    provinceCode: 'NS',
    tier: 1,
    seoTitle: 'Leasing Services in Truro | MoveSmart Rentals',
    metaDescription:
      'Concierge tenant placement for Truro landlords. Rail and logistics-hub professional screening, Dal-AC student-cycle awareness, rent-cap compliance, and rent-guaranteed leasing.',
    heroHeadline: 'Truro Leasing, for Central Nova Scotia\'s Rail and Logistics Hub',
    heroLede:
      'Truro rentals run on a steady workforce and education base with rent growth quietly tracking the provincial pattern. MoveSmart places vetted tenants with Dal-AC and regional-employer fluency and Rent Guarantee protection.',
    rentalMarketSummary:
      'Truro sits at the geographic crossroads of Nova Scotia where the Highway 102 corridor from Halifax meets the Highway 104 corridor to New Brunswick and the rail infrastructure that has defined the town for over a century. The rental market draws on three distinct tenant engines: a steady rail and logistics workforce tied to CN Rail operations and the associated distribution and intermodal business; the Dalhousie University Faculty of Agriculture (Dal-AC) at the Bible Hill campus, which produces a reliable student and faculty demand pattern on the academic calendar; and the Colchester East Hants Health Centre as the regional healthcare anchor. Inventory is dominated by single-family detached and semi-detached housing with a more limited apartment and condo base - the market is classically small-town in inventory structure, with most rental stock owned by individual investor-landlords rather than corporate operators. Downtown Truro and the Bible Hill-adjacent corridor hold the bulk of student-oriented stock. Vacancy is persistently tight on well-maintained properties and looser on older under-invested stock. Rent growth has been real but more measured than in Halifax, and the provincial rent cap applies identically.',
    landlordProblem:
      'Truro landlords frequently mistime the Dal-AC cycle - marketing in August for September misses the serious applicants. Second pattern: under-pricing against a market that has moved meaningfully, particularly Bible Hill-adjacent student-oriented stock. Third: rent-cap mishandling identical to the broader Nova Scotia pattern. Fourth: thin applicant-pool reach when landlords rely on Kijiji and Facebook Marketplace alone, missing the relocation and rail-workforce flows that drive some of the strongest tenants.',
    howMoveSmartHelps:
      'MoveSmart times Dal-AC marketing to the academic calendar with listings live by late May for September starts. Pricing anchors to Truro-specific comparables with awareness of the Bible Hill student premium versus downtown and outer residential. Rail and logistics employment verification handles CN and associated employer HR pathways fluently. Healthcare screening through Colchester East Hants runs the standard NS Health pathway. Rent-cap-compliant in-tenancy increase planning built into every engagement. Rent Guarantee is available.',
    keyNeighborhoods: [
      'Downtown Truro',
      'Bible Hill (Dal-AC adjacent)',
      'Salmon River',
      'Valley',
      'Harmony Heights',
      'Onslow',
    ],
    faqItems: [
      {
        question: 'When should I list a Bible Hill unit for the Dal-AC cycle?',
        answer:
          'Late May at the latest. Dal-AC applicants commit for September 1 earlier than many small-market owners assume, and late-August marketing reaches a thinner pool. Early marketing produces stronger tenants at higher accepted rent.',
      },
      {
        question: 'Are Truro rents really rising?',
        answer:
          'Steadily - not at Halifax velocity but meaningfully over the last several cycles. Pricing against 2019 or 2020 data under-rents the unit. We pull current-quarter comparables specific to Truro sub-areas.',
      },
      {
        question: 'How do you verify rail and logistics tenants?',
        answer:
          'CN Rail and associated logistics operators verify through standard HR pathways. Shift work is common and we screen with awareness of shift-differential pay structures. Rail workforce is typically long-tenure and stable, and compensates well relative to Truro rent levels.',
      },
      {
        question: 'How does the Nova Scotia rent cap apply?',
        answer:
          'Identically to the Halifax metro - cap applies to in-tenancy increases, strictly enforced through the Residential Tenancies Board. Between tenants, rent resets to market. We keep in-tenancy increases compliant with proper documentation.',
      },
      {
        question: 'Do Colchester East Hants Health Centre staff make good tenants?',
        answer:
          'Consistently. Nova Scotia Health staff at the regional centre verify cleanly and carry stable income with long tenure. We screen consistently with our Halifax and Sydney healthcare files.',
      },
      {
        question: 'Is outer residential Truro a different market than Bible Hill?',
        answer:
          'Yes. Bible Hill is student-oriented with higher turnover and academic-calendar timing. Outer residential trades as longer-tenure working-family rental. We market and price each with the right applicant pool in mind.',
      },
      {
        question: 'What about the Truro highway-hub relocation flow?',
        answer:
          'Truro\'s position at the intersection of the 102 and 104 corridors produces a steady relocation-and-transfer applicant flow that generic local-only marketing misses. We distribute through relocation-facing channels for qualifying inventory.',
      },
      {
        question: 'Does MoveSmart manage after signing?',
        answer:
          'No. MoveSmart is a leasing brokerage. We place the tenant and exit at signed lease. Rent Guarantee covers missed rent during the coverage term; operations stay with you.',
      },
    ],
    primaryKeyword: 'leasing services Truro',
    secondaryKeywords: [
      'tenant placement Truro',
      'Dal-AC student rental',
      'Bible Hill leasing',
      'Truro rental agent',
      'CN Rail tenant screening',
      'central Nova Scotia leasing',
      'Colchester landlord services',
    ],
    regulatoryNote: NS_REGULATORY_NOTE,
  },

  // =====================================================================
  // NOVA SCOTIA - 5. NEW GLASGOW
  // =====================================================================
  'new-glasgow': {
    slug: 'new-glasgow',
    name: 'New Glasgow',
    province: 'Nova Scotia',
    provinceSlug: 'nova-scotia',
    provinceCode: 'NS',
    tier: 1,
    seoTitle: 'Leasing Services in New Glasgow | MoveSmart Rentals',
    metaDescription:
      'Concierge tenant placement for New Glasgow landlords. Pictou County manufacturing and healthcare screening, tight-inventory leasing, rent-cap compliance, and rent guarantee.',
    heroHeadline: 'New Glasgow Leasing, for Pictou County\'s Manufacturing and Healthcare Market',
    heroLede:
      'New Glasgow rentals run tight on inventory with steady workforce and healthcare demand. MoveSmart places vetted tenants with Pictou County employer fluency and rent-cap-compliant leasing.',
    rentalMarketSummary:
      'New Glasgow is the largest community in Pictou County and the commercial centre of the Northumberland Strait region of Nova Scotia. The rental market is small but structurally tight, with three primary tenant engines: a manufacturing base that includes pulp-and-paper, steel fabrication, and food processing at scale; the Aberdeen Hospital as the regional healthcare anchor with Nova Scotia Health\'s Northumberland operations; and a steady professional and public-sector base serving the broader Pictou County communities of Stellarton, Trenton, and Westville. Inventory is heavily weighted toward single-family detached and semi-detached stock with a more limited apartment base, and most rental supply is held by individual investor-landlords. Vacancy is persistently low on well-maintained properties because the Pictou County combined rental market is small and construction has not kept pace with recent demand growth. Rent growth has been steadier and less dramatic than the Halifax metro but has nonetheless moved meaningfully since 2020. The provincial rent cap applies identically to the rest of Nova Scotia, and landlords who time the seasonal cycles (manufacturing hiring, healthcare rotations, post-secondary commutes to nearby institutions) consistently outperform generic approaches.',
    landlordProblem:
      'New Glasgow landlords commonly under-price against a market that has tightened substantially over the last several years. Inventory scarcity means well-presented properties can command rent well above what owners assume, but pricing against 2019-2020 data leaves that on the table. Second pattern: rent-cap mishandling identical to the provincial pattern. Third: marketing only on local Facebook groups and Kijiji misses the Pictou County relocation flow and healthcare-rotation applicant pool.',
    howMoveSmartHelps:
      'MoveSmart prices every New Glasgow listing against current Pictou County comparables, not historical data. Marketing distributes across manufacturing and healthcare relocation channels in addition to local community channels. Employment verification handles the major Pictou County employers - pulp-and-paper, steel fabrication, food processing, Aberdeen Hospital, municipal and provincial public service - fluently. Rent-cap-compliant in-tenancy increase planning is built into every engagement. Rent Guarantee is available.',
    keyNeighborhoods: [
      'Downtown New Glasgow',
      'East River corridor',
      'Abercrombie',
      'Stellarton',
      'Trenton',
      'Westville',
    ],
    faqItems: [
      {
        question: 'How tight is the New Glasgow rental market really?',
        answer:
          'Persistently tight on well-maintained properties - Pictou County combined inventory is small and recent construction has not kept pace with demand growth. Pricing against older comparables under-rents the unit. We pull current comparables specific to the combined Pictou County market.',
      },
      {
        question: 'How does the Nova Scotia rent cap apply?',
        answer:
          'Identically to the rest of the province - cap applies to in-tenancy increases, enforced through the Residential Tenancies Board. Between tenants, rent resets to market. We keep in-tenancy increases compliant with proper notice and documentation.',
      },
      {
        question: 'Do manufacturing tenants rent reliably?',
        answer:
          'Consistently. The Pictou County manufacturing base produces stable long-tenure tenants with verifiable income through standard employer HR pathways. Shift work is common and we screen with awareness of shift-differential pay structures.',
      },
      {
        question: 'Is Aberdeen Hospital a significant tenant source?',
        answer:
          'Yes. Nova Scotia Health staff at Aberdeen verify cleanly through the standard HR pathway, carry stable income, and typically stay multi-year. Medical residents and visiting healthcare staff are a particular rotation-based sub-segment with specific timing patterns.',
      },
      {
        question: 'Are Stellarton, Trenton, and Westville different rental markets?',
        answer:
          'Somewhat - the Pictou County communities share applicant pools but have distinct price points and housing stock. New Glasgow proper typically commands the highest rents; Westville and Trenton run lower. We price against specific community comparables rather than a combined average.',
      },
      {
        question: 'What about post-2022 renoviction rules?',
        answer:
          'They apply identically to the rest of Nova Scotia. Landlord-use and renovation-based evictions require specific documentation and extended notice. The reliable strategy is placing the right tenant the first time, not planning to end the tenancy later for renovation.',
      },
      {
        question: 'Can you reach applicants outside local channels?',
        answer:
          'Yes, and that is specifically where most Pictou County landlords under-reach. Relocation-facing channels for manufacturing, healthcare, and public-sector applicants produce a different applicant flow than Kijiji and Facebook local groups alone. We distribute accordingly.',
      },
      {
        question: 'Does MoveSmart manage after signing?',
        answer:
          'No. MoveSmart is a leasing brokerage. We place the tenant and exit at signed lease. Rent Guarantee covers missed rent during the coverage term; operations remain with you.',
      },
    ],
    primaryKeyword: 'leasing services New Glasgow',
    secondaryKeywords: [
      'tenant placement New Glasgow',
      'Pictou County rental agent',
      'Aberdeen Hospital rental',
      'Stellarton leasing',
      'New Glasgow landlord services',
      'Pictou manufacturing rental',
      'Northumberland Strait leasing',
    ],
    regulatoryNote: NS_REGULATORY_NOTE,
  },
}

export const CANADIAN_OTHER_CITY_SLUGS: string[] = [
  // Quebec
  'montreal',
  'quebec-city',
  'laval',
  'gatineau',
  'longueuil',
  // British Columbia
  'vancouver',
  'surrey',
  'burnaby',
  'richmond',
  'victoria',
  // Alberta
  'calgary',
  'edmonton',
  'red-deer',
  'lethbridge',
  'sherwood-park',
  // Nova Scotia
  'halifax',
  'dartmouth',
  'sydney',
  'truro',
  'new-glasgow',
]

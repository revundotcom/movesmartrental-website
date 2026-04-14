import type { GuideContent } from './index'

export const MOVING_DAY_COORDINATION: GuideContent = {
  slug: 'moving-day-coordination',
  title: 'Moving Day Coordination: The Rental Move-In Playbook',
  seoTitle: 'Moving Day Checklist - Rental Move-In Guide (Ontario)',
  metaDescription:
    'A week-by-week moving day checklist for Ontario tenants - utility transfer timing, tenant insurance, move-in inspection protocol, and the first 30-day punch list.',
  category: 'tenant',
  audience: 'Tenants moving into a new rental in Canada, primarily Ontario',
  primaryKeyword: 'moving day checklist',
  secondaryKeywords: [
    'rental move-in guide',
    'utility transfer Ontario',
    'move-in inspection',
    'tenant insurance requirement',
  ],
  readTimeMinutes: 11,
  publishDate: '2026-04-14',
  author: 'MoveSmart Editorial',
  hero: {
    eyebrow: 'Tenant Playbook',
    headline: 'Moving Day Coordination - A Week-by-Week Checklist',
    lede:
      'Most move-in problems are not actually move-in problems - they are move-in-minus-two-weeks problems that only surfaced on the day. This playbook sequences the utility transfers, tenant insurance binding, elevator bookings, and condition inspection discipline that separate a clean rental move-in from a weekend of resolvable regrets.',
  },
  tableOfContents: [
    { id: 'why-sequencing-matters', label: 'Why sequencing matters' },
    { id: 'two-weeks-out', label: 'Two weeks out - the setup window' },
    { id: 'one-week-out', label: 'One week out - logistics lock-in' },
    { id: 'move-in-day', label: 'Move-in day - the walk and the keys' },
    { id: 'inspection-form', label: 'Condition inspection - what to document' },
    { id: 'post-move-in', label: 'First-week punch list' },
    { id: 'first-30-days', label: 'Your first 30 days' },
  ],
  sections: [
    {
      id: 'why-sequencing-matters',
      heading: 'Why sequencing matters',
      body: `A move-in is a deadline problem, not a task problem. Every utility, every address change, every service transfer has its own processing window - and those windows do not compress just because the lease start date does. Hydro accounts that need a business day to activate, internet appointments that are booked a week out, condominium elevator reservations that require 48 to 72 hours of notice, tenant insurance policies that need to be bound **before** the landlord releases the keys - none of these are optional, and none of them wait.

The cost of a missed sequence is rarely catastrophic, but it compounds: a night without hydro, a weekend without internet, a friction-filled inspection walk because the last tenant has not fully moved out, or a landlord who will not hand over keys because the tenant insurance certificate has not arrived. None of those are the landlord's problem to fix at the door.

The checklist below sequences the work into three windows - two weeks out, one week out, and move-in day itself - plus a first-week punch list for the unit and a first-30-day rhythm for the tenancy.`,
      callout: {
        label: 'Tenant insurance is not optional',
        body:
          'Most Ontario leases now require tenants to carry personal tenant insurance (sometimes called contents insurance), and the landlord is entitled to see a certificate of coverage before the keys are released. Bind the policy at least 48 hours before the lease start date so the certificate is in your inbox on move-in morning.',
      },
    },
    {
      id: 'two-weeks-out',
      heading: 'Two weeks out - the setup window',
      body: `Two weeks out is the setup window - accounts to open, policies to bind, addresses to change. None of this is time-pressured yet, which is exactly why it gets postponed into the last 48 hours where it causes problems.

**Utility transfers.** Confirm which utilities are tenant-paid on the lease (hydro is almost always tenant-paid in Ontario; gas often is; water and trash vary by municipality and by building). Open accounts with the relevant utility in your own name, effective on the lease start date. For hydro in Ontario, your provider will depend on the municipality - Toronto Hydro, Hydro One, Alectra, and several regional utilities each cover their own service areas. Gas is typically Enbridge across most of Ontario. Internet requires a separate booking for an installation appointment - book as early as you can because the first-available appointment window is routinely 7 to 14 days out.

**Tenant insurance.** Bind a policy effective on the lease start date. A standard tenant contents policy in Canada covers three broad categories: your personal property (clothing, electronics, furniture), personal liability (if you accidentally damage the building or injure someone), and additional living expense (hotel, meals, transport) if the unit becomes uninhabitable due to an insured peril. Most policies in Ontario range widely in premium depending on coverage limits - shop two or three quotes. Request that the certificate name the landlord as an additional insured if the lease requires it.

**Change of address.** Canada Post mail forwarding is the single most useful setup task - forward mail for a minimum of three months, longer if you have outstanding subscriptions or government correspondence. Update the address on: your driver's licence (ServiceOntario, within six days of moving by law), your health card, your employer's payroll system, CRA "My Account" for tax correspondence, your bank, every credit card and loan provider, any subscription deliveries, and your professional regulator if you are regulated. A single missed address change routinely costs a tenant a late-paid bill or a missed tax slip.`,
    },
    {
      id: 'one-week-out',
      heading: 'One week out - logistics lock-in',
      body: `One week out is logistics - the physical move, not the paperwork.

**Packing plan.** Pack by destination room, not by category. Every box labelled with the destination room plus one line of contents ("Kitchen - pots, spices, kettle") will save an hour of confusion at the new unit. Essential-items box: keys, chargers, toiletries, bedding, a change of clothes, and basic tools - this box rides in your vehicle, not the moving truck, and is the first thing you touch in the new unit.

**Moving supplies.** Boxes, tape, markers, bubble wrap, mattress bags, furniture blankets. Most rental supply stores in major Canadian cities will buy back unused boxes at a discount - buy slightly more than you think you need.

**Moving truck or labour.** Confirm the booking 72 hours in advance, not the day before. Confirm the arrival window, the truck size, and the payment method. If you are moving into a condominium or purpose-built rental, the building will typically have move-in rules - sheltered route from truck to door, floor protection in the elevator, wall padding - and the moving crew needs to know these before they arrive.

**Elevator booking.** Most condominiums and many purpose-built rental buildings require an elevator to be reserved for move-ins, with a typical 48 to 72 hour notice window and often a refundable damage deposit ($300 to $500 range is common). Confirm the booked window in writing with the building management. Missing an elevator booking on move-in day means either a stairwell move or a reschedule - neither is the landlord's problem to solve.

**Confirm with the landlord.** One direct message to your leasing contact 48 hours out: confirm the key-handover time, the meeting location, the parties present, and the documents the landlord expects from you (tenant insurance certificate, void cheque or pre-authorized debit form, any outstanding deposit). Loose ends at the door are the most avoidable category of move-in friction.`,
    },
    {
      id: 'move-in-day',
      heading: 'Move-in day - the walk and the keys',
      body: `Move-in day breaks into three phases: the walk-through with the landlord or leasing contact, the documented condition inspection, and the physical move itself. Treat the first two as non-negotiable - the third only goes smoothly if the first two have been done properly.

**The walk-through.** Meet your landlord or leasing contact at the unit before any furniture arrives. Walk every room together. Confirm the unit matches the one you agreed to lease - same floor plan, same finishes, same inclusions (appliances, window coverings, parking, storage locker where applicable). This is the last moment where a surprise (wrong unit, missing appliance, uncompleted repair) is easily resolved before it becomes your problem.

**The keys and access.** Confirm and receive every access item: unit keys (typically two), building fob or key, garage remote, mailbox key, storage locker key or combination, and any amenity access (gym, rooftop, pool). Count them at the door. Missing access items are faster to resolve before the landlord has left the building than after.

**Photograph everything.** Before a single box enters the unit, photograph every room, every fixture, every appliance, every floor, every wall, and every pre-existing mark. Timestamp the photos (most phones do this automatically in the metadata, but screenshots of the date on the phone's clock are useful backup). The photo set you take in the first ten minutes of the tenancy is the single best protection you have at move-out against disputed damage claims.

**Condition inspection report.** Ontario does not require a statutory condition inspection form for standard residential tenancies, but most professional landlords and brokerages use one as a matter of documented practice. Fill it in jointly with the landlord - room by room, noting any pre-existing damage, marks, or wear. Both parties sign. Each party keeps a copy. If your landlord does not offer one, create your own: a simple room-by-room list with photos attached, emailed to the landlord on the day, with a request to confirm receipt.`,
      callout: {
        label: 'Smoke and CO alarms - check them on day one',
        body:
          'Ontario\'s Fire Code requires working smoke alarms on every storey and outside every sleeping area, and carbon monoxide alarms adjacent to sleeping areas in any unit with a fuel-burning appliance or attached garage. Landlords are responsible for installation and maintenance; tenants are responsible for not tampering with them. Test each alarm on day one and document the test. If any alarm fails to sound, report it to the landlord in writing the same day.',
      },
    },
    {
      id: 'inspection-form',
      heading: 'Condition inspection - what to document',
      body: `The condition inspection form is the single document that most often decides a damage dispute at the end of a tenancy. The question at move-out is never "is there damage now?" - there always is, after a lease of any length. The question is "was this damage present at move-in?" Your inspection form answers that question.

Document at minimum, room by room:

- **Walls and ceilings:** scuffs, marks, paint chips, nail holes, dents, stains, water marks
- **Floors:** scratches, gouges, stains, missing grout, loose tiles, squeaking boards
- **Windows and doors:** cracked glass, torn screens, broken locks, sticking frames, damaged blinds
- **Appliances:** scratches, dents, missing parts, working condition of each (fridge cooling, oven heating, dishwasher running, washer/dryer cycling)
- **Plumbing fixtures:** chipped porcelain, running toilets, leaky faucets, damaged caulking
- **Electrical:** non-working outlets (test with a phone charger or lamp), non-working light switches, missing or cracked cover plates
- **HVAC:** thermostat function, air flow from vents, filter condition, any unusual noises

Photograph each noted item. Attach photos to the inspection form or email them separately with a reference to the form. A one-line note like "kitchen - scratch on stove top front face, approximately 10cm, present at move-in" paired with a photograph is worth more than a paragraph of prose at move-out.

If the landlord declines to complete a joint inspection, complete your own and email it to the landlord with a request for acknowledgement. An inspection the landlord has received and not disputed is materially stronger than no inspection at all.`,
    },
    {
      id: 'post-move-in',
      heading: 'First-week punch list - what to test',
      body: `The first week is when the quiet problems surface - the ones the walk-through missed because nobody ran the appliance for more than 30 seconds or turned on the heat in April. A punch list run in the first seven days separates landlord-fix items from tenant-fix items cleanly, while the tenancy is still new and responses are quickest.

**Test within the first 72 hours:**

- Heating system: set the thermostat to each mode (heat, cool, fan) and confirm air moves from every vent in every room
- Hot water: run hot water from every tap and shower; confirm time-to-hot and temperature are normal
- Appliances: run one full cycle on every appliance - dishwasher, washer, dryer, stove (all burners), oven, microwave, fridge (confirm temperature overnight)
- Water pressure: test every shower and every tap; listen for knocking pipes
- Door locks: every exterior door, every unit door, every balcony door; confirm keys turn smoothly
- Smoke and CO alarms: press the test button on every unit; confirm all sound
- Exhaust fans: kitchen and bathroom fans running quietly and moving air

**Landlord-fix items** (report in writing the same week): non-working appliances, plumbing leaks, electrical faults, HVAC problems, pest issues, lock problems, alarm failures, broken windows, mould or water intrusion. These are the landlord's maintenance responsibility under the Residential Tenancies Act. A written report creates the paper trail if the issue needs to escalate.

**Tenant-fix items**: burnt-out light bulbs (unless otherwise specified in the lease), drains that need clearing after tenant use, and minor adjustments that fall under normal tenant responsibility. The lease itself is the authority - read the maintenance clauses before assuming an item is landlord-fix or tenant-fix.`,
    },
    {
      id: 'first-30-days',
      heading: 'Your first 30 days - setting the tenancy rhythm',
      body: `The first 30 days set the rhythm for the rest of the tenancy. A few disciplines are worth establishing early.

**Rent payment protocol.** Confirm the payment method specified in the lease (post-dated cheques, pre-authorized debit, e-transfer - post-dated cheques cannot be required of new tenants in Ontario, but they can be offered voluntarily). Rent is due on the date specified in the lease; a consistent on-time payment record is the single strongest piece of your rental history for the next landlord, the next mortgage application, and any dispute at the Landlord and Tenant Board. Ontario tenants are entitled to a **rent receipt** on request, and landlords are required to provide one for free - keep every receipt in a dedicated folder or email label.

**Issue reporting.** Use writing (email or a tenant portal) for every maintenance request, even small ones. A text message is acceptable in many tenancies, but email creates a better paper trail and is easier to reference months later. Include a clear description, a photograph where relevant, and the date the issue first appeared. Reasonable response times vary - same-day for emergencies (flood, no heat in winter, no hot water, broken lock), within a week for most routine maintenance, longer for non-urgent cosmetic items.

**Lease familiarity.** Re-read the lease during the first week. Notice the renewal provisions, the notice requirements, the utilities allocation, any rules about guests, parking, and amenities, and any clauses that reference the Residential Tenancies Act (the RTA overrides any lease clause that contradicts it - no lease can take away a tenant right granted by the Act).

**Relationship with the landlord.** A professional, written, documented relationship is the one you want - polite, prompt, and paper-trailed. That tone established in the first 30 days is what serves you at every later inflection point: a maintenance dispute, a rent increase notice, a lease renewal, or a move-out inspection two or three years from now.

If your tenancy was placed by MoveSmart, our [Tenant Insurance referral](/services/tenant-insurance/) and the [Portal & Technology](/services/portal-and-technology/) resources for tenants will already be part of your lease package. Use them - they are there specifically to make the rhythm of a professional tenancy easier.`,
    },
  ],
  faqItems: [
    {
      question: 'When should I transfer utilities into my name - before or after move-in day?',
      answer:
        'Effective on the lease start date, which means setting it up at least a week in advance with the utility provider. Hydro, gas, and internet accounts each have their own processing windows - hydro is typically same-business-day or next-business-day, gas is usually next-business-day, internet installation appointments are routinely 7 to 14 days out. Setting up the transfer on move-in day itself means you move in with whatever service state the previous tenant left behind, which often means no service at all.',
    },
    {
      question: 'Is tenant insurance legally required in Ontario?',
      answer:
        'It is not legally required by provincial statute, but most Ontario leases now contractually require it - and the landlord is entitled to enforce that clause, including by refusing to release keys until a certificate is produced. A standard tenant contents policy covers three things: your personal property, your personal liability (if you accidentally damage the building or injure someone), and additional living expense if the unit becomes uninhabitable due to an insured peril. Premiums vary widely with coverage limits and the building. Shop two or three quotes and bind the policy at least 48 hours before the lease start date.',
    },
    {
      question: 'What should I photograph during the move-in walk-through?',
      answer:
        'Everything, before any furniture arrives. Every wall, every floor, every ceiling, every fixture, every appliance, every window, every door, and any pre-existing mark or damage. Close-ups of any existing damage, wide shots of every room, and a sweep of the kitchen and bathroom in detail. The photo set you take in the first ten minutes of the tenancy is the single best protection you have at move-out against disputed damage claims - it answers the "was this here when I moved in" question definitively.',
    },
    {
      question: 'What if my landlord does not offer a condition inspection form?',
      answer:
        'Complete your own and email it to the landlord on move-in day. A simple room-by-room list noting any pre-existing damage, with photographs attached, sent by email with a request for acknowledgement. An inspection the landlord has received and not disputed is materially stronger at move-out than no inspection at all. If your landlord is a brokerage or professional manager, they will almost always have a form - ask for it explicitly.',
    },
    {
      question: 'Who is responsible for smoke and CO alarms in Ontario?',
      answer:
        'The landlord is responsible for installing and maintaining working smoke alarms on every storey and outside every sleeping area, and carbon monoxide alarms adjacent to sleeping areas in any unit with a fuel-burning appliance or attached garage - this is the Ontario Fire Code standard. The tenant is responsible for not disabling, removing, or tampering with any alarm, and for reporting a non-working alarm to the landlord promptly. Test each alarm on move-in day and report any failures in writing the same day.',
    },
    {
      question: 'Can my landlord demand cash for rent, or require post-dated cheques?',
      answer:
        'A landlord can accept cash but cannot require it as the only payment method, and a landlord cannot require a new tenant to provide post-dated cheques as a condition of the tenancy. A tenant can offer post-dated cheques voluntarily, and many do for convenience. The Residential Tenancies Act also entitles a tenant to a rent receipt on request, and the landlord must provide it for free - keep every receipt, whether paper or email, in a dedicated folder.',
    },
  ],
  relatedGuides: [
    'tenant-screening-ontario',
    'how-to-price-your-rental',
    'rent-guarantee-101',
  ],
  relatedServices: ['tenant-placement', 'tenant-insurance', 'portal-and-technology', 'leasing-services'],
  downloadOffer: {
    label: 'The Rental Move-In Checklist',
    description:
      'A week-by-week printable checklist covering utility setup, tenant insurance binding, elevator booking, condition inspection discipline, and the first-week punch list.',
    ctaLabel: 'Request the checklist',
    ctaHref: '/contact/?type=tenant&intent=download-moving-checklist',
  },
}

export default MOVING_DAY_COORDINATION

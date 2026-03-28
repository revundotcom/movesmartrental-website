// GTM Data Layer utility for type-safe event tracking
// All analytics events flow through GTM -> GA4 (never direct gtag.js)

export type GTMEvent =
  | { event: 'account_creation'; page: string; city?: string; service?: string }
  | { event: 'book_a_call'; page: string; city?: string; service?: string }
  | { event: 'contact_form_submit'; page: string; inquiry_type: string }
  | { event: 'scroll_depth'; page: string; depth: 25 | 50 | 75 | 100 }
  | { event: 'outbound_click'; page: string; url: string; link_text: string }
  | { event: 'phone_click'; page: string; phone_number: string }
  | { event: 'email_click'; page: string; email_address: string }
  | { event: 'city_to_service_ctr'; page: string; city: string; service: string }
  | { event: 'service_to_account_conversion'; page: string; service: string }

// dataLayer type is already declared by @next/third-parties/google
// We use the existing window.dataLayer with type-safe event pushing

export function pushEvent(event: GTMEvent): void {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(event as Record<string, unknown>)
  }
}

export function trackOutboundClick(url: string, linkText: string): void {
  pushEvent({
    event: 'outbound_click',
    page: typeof window !== 'undefined' ? window.location.pathname : '',
    url,
    link_text: linkText,
  })
}

export function trackPhoneClick(phoneNumber: string): void {
  pushEvent({
    event: 'phone_click',
    page: typeof window !== 'undefined' ? window.location.pathname : '',
    phone_number: phoneNumber,
  })
}

export function trackEmailClick(emailAddress: string): void {
  pushEvent({
    event: 'email_click',
    page: typeof window !== 'undefined' ? window.location.pathname : '',
    email_address: emailAddress,
  })
}

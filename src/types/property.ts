/**
 * TypeScript types for portal.revun.com Property APIs.
 *
 * Generated to match the response shape documented in
 * `MoveSmart Rentals API Documentation.pdf`:
 *   - GET /api/properties        → PropertyListResponse
 *   - GET /api/property/{slug}   → PropertyDetailResponse
 *
 * Many fields can be null in real API responses; we mark anything that
 * the docs show as `null` or "optional" with `| null` / `?` so consuming
 * code is forced to handle the absence.
 */

export interface PropertyMedia {
  id: number
  property_id: number
  category: string | null
  sort_order: number | null
  file_path: string | null
  file_type: string | null
  external_link: string | null
  created_at: string
  updated_at: string
}

export interface PropertyRoom {
  id?: number
  room_type?: string | null
  name?: string | null
  ensuite_type?: string | null
  [key: string]: unknown
}

export interface PropertyBuilding {
  id: number
  building_key?: string | null
  building_name: string | null
  street_number?: string | null
  direction_prefix?: string | null
  street_name?: string | null
  street_type?: string | null
  direction_suffix?: string | null
  city: string | null
  province: string | null
  postal_code?: string | null
  municipality?: string | null
  neighbourhood?: string | null
  region?: string | null
  cross_street?: string | null
  school_district?: string | null
  elementary_school?: string | null
  high_school?: string | null
  zoning?: string | null
  property_access?: string[] | null
  waterfront?: string | null
  garage?: string | null
  acres_range?: string | null
  fronting_on?: string | null
  year_built?: string | null
  roof?: string[] | null
  construction_materials?: string[] | null
  area_influences?: string[] | null
  condo_level?: string | null
  pets_allowed?: string | null
  condo_amenities?: string[] | null
  created_at?: string
  updated_at?: string
  // The API exposes many additional fields. They are not used by the UI
  // today; treat unknown extras as opaque to avoid type churn.
  [key: string]: unknown
}

export interface Property {
  id: number
  building_id: number
  unit_name: string
  unit_address: string
  zcrm_id?: string | null
  slug: string
  unit_number?: string | null
  available_date?: string | null
  availability?: string | null
  website_price: number | null
  website_description?: string | null
  occupancy_status?: string | null
  occupied_by?: string | null
  property_sub_type?: string | null
  property_attached?: string | null
  style?: string | null
  ownership_type?: string | null
  property_type?: string | null
  unit_count?: string | null
  approximate_square_footage?: string | null
  above_grade_sqft?: number | null
  below_grade_sqft?: number | null
  included_in_lease_cost?: string[] | null
  furnished?: string | null
  interior_features?: string[] | null
  security_features?: string[] | null
  accessible_features?: string[] | null
  basement_type?: string | null
  basement_finish?: string | null
  laundry_features?: string[] | null
  heating?: string[] | null
  cooling?: string[] | null
  parking_type?: string[] | null
  number_of_bedrooms?: string | null
  number_of_bathrooms?: string | null
  number_of_parking_spots?: string | null
  number_of_lockers?: string | null
  latitude?: string | null
  longitude?: string | null
  total_parking_spaces?: string | null
  balcony_type?: string | null
  garage_type?: string | null
  lot_size_area?: string | null
  lot_size_units?: string | null
  condo_fee_includes?: string[] | null
  bedrooms: number | null
  bathrooms: number | null
  status?: string | null
  description?: string | null
  cover_thumb?: string | null
  cover_image?: PropertyMedia | string | null
  media?: PropertyMedia[]
  videos?: PropertyMedia[]
  building?: PropertyBuilding
  unitRooms?: PropertyRoom[] | null
  checkin_detail?: {
    electricity_included?: number | null
    electricity_provider?: string | null
    gas_included?: number | null
    gas_provider?: string | null
    water_included?: number | null
    water_provider?: string | null
    sewage_included?: number | null
    sewage_provider?: string | null
    internet_included?: number | null
    internet_provider?: string | null
    cable_included?: number | null
    cable_provider?: string | null
    [key: string]: unknown
  } | null
  created_at?: string
  updated_at?: string
  [key: string]: unknown
}

/** Shape returned by GET /api/properties */
export interface PropertyListResponse {
  data: Property[]
  // Laravel-style pagination metadata (best-effort — fields are optional
  // because the documented sample only shows `data`).
  current_page?: number
  last_page?: number
  per_page?: number
  total?: number
  from?: number | null
  to?: number | null
  links?: Array<{ url: string | null; label: string; active: boolean }>
  next_page_url?: string | null
  prev_page_url?: string | null
  [key: string]: unknown
}

/** Shape returned by GET /api/property/{slug} */
export interface PropertyDetailResponse {
  status: boolean
  data: {
    unit: Property
    similar_properties?: Property[]
  }
}

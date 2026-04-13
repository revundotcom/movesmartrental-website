/**
 * batch-2.ts - London, Vaughan, Markham, Richmond Hill, Oakville
 * Thin aggregator: re-exports from per-city files.
 */

import type { CityServiceContent, CityDescription } from './batch-1'

import {
  cityServiceContent as londonServices,
  cityDescriptions as londonDescriptions,
} from './london'

import {
  cityServiceContent as vaughanServices,
  cityDescriptions as vaughanDescriptions,
} from './vaughan'

import {
  cityServiceContent as markhamServices,
  cityDescriptions as markhamDescriptions,
} from './markham'

import {
  cityServiceContent as richmondHillServices,
  cityDescriptions as richmondHillDescriptions,
} from './richmond-hill'

import {
  cityServiceContent as oakvilleServices,
  cityDescriptions as oakvilleDescriptions,
} from './oakville'

export const cityServiceContent: CityServiceContent[] = [
  ...londonServices,
  ...vaughanServices,
  ...markhamServices,
  ...richmondHillServices,
  ...oakvilleServices,
]

export const cityDescriptions: CityDescription[] = [
  ...londonDescriptions,
  ...vaughanDescriptions,
  ...markhamDescriptions,
  ...richmondHillDescriptions,
  ...oakvilleDescriptions,
]

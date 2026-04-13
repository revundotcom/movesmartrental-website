/**
 * batch-3.ts - Burlington, Kitchener, Waterloo, Cambridge, Guelph
 * Thin aggregator: re-exports from per-city files.
 */

import type { CityServiceContent, CityDescription } from './batch-1'

import {
  cityServiceContent as burlingtonServices,
  cityDescriptions as burlingtonDescriptions,
} from './burlington'

import {
  cityServiceContent as kitchenerServices,
  cityDescriptions as kitchenerDescriptions,
} from './kitchener'

import {
  cityServiceContent as waterlooServices,
  cityDescriptions as waterlooDescriptions,
} from './waterloo'

import {
  cityServiceContent as cambridgeServices,
  cityDescriptions as cambridgeDescriptions,
} from './cambridge'

import {
  cityServiceContent as guelphServices,
  cityDescriptions as guelphDescriptions,
} from './guelph'

export const cityServiceContent: CityServiceContent[] = [
  ...burlingtonServices,
  ...kitchenerServices,
  ...waterlooServices,
  ...cambridgeServices,
  ...guelphServices,
]

export const cityDescriptions: CityDescription[] = [
  ...burlingtonDescriptions,
  ...kitchenerDescriptions,
  ...waterlooDescriptions,
  ...cambridgeDescriptions,
  ...guelphDescriptions,
]

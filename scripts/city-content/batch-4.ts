/**
 * batch-4.ts - Barrie, Milton, Oshawa, Ajax, Pickering
 * Thin aggregator: re-exports from per-city files.
 */

import type { CityServiceContent, CityDescription } from './batch-1'

import {
  cityServiceContent as barrieServices,
  cityDescriptions as barrieDescriptions,
} from './barrie'

import {
  cityServiceContent as miltonServices,
  cityDescriptions as miltonDescriptions,
} from './milton'

import {
  cityServiceContent as oshawaServices,
  cityDescriptions as oshawaDescriptions,
} from './oshawa'

import {
  cityServiceContent as ajaxServices,
  cityDescriptions as ajaxDescriptions,
} from './ajax'

import {
  cityServiceContent as pickeringServices,
  cityDescriptions as pickeringDescriptions,
} from './pickering'

export const cityServiceContent: CityServiceContent[] = [
  ...barrieServices,
  ...miltonServices,
  ...oshawaServices,
  ...ajaxServices,
  ...pickeringServices,
]

export const cityDescriptions: CityDescription[] = [
  ...barrieDescriptions,
  ...miltonDescriptions,
  ...oshawaDescriptions,
  ...ajaxDescriptions,
  ...pickeringDescriptions,
]

/**
 * IC-7300 Data Utilities
 * Provides accessor functions for IC-7300 controls, band plans, and radio modes
 */

import type { BandName, BandPlan, RadioControl, RadioMode } from '@/types/radio'
import { IC7300_CONTROLS, IC7300_MODES } from '@/data/radio/ic7300-controls'
import { BAND_PLANS, CALLING_FREQUENCIES, TECHNICIAN_PRIVILEGES } from '@/data/radio/band-plans'

/**
 * Get all IC-7300 front panel controls
 */
export function getIC7300Controls(): RadioControl[] {
  return IC7300_CONTROLS
}

/**
 * Get IC-7300 controls filtered by category
 * @param category - The control category to filter by
 */
export function getControlsByCategory(category: RadioControl['category']): RadioControl[] {
  return IC7300_CONTROLS.filter((control) => control.category === category)
}

/**
 * Get a specific control by its ID
 * @param id - The control ID to look up
 */
export function getControlById(id: string): RadioControl | undefined {
  return IC7300_CONTROLS.find((control) => control.id === id)
}

/**
 * Get controls by location (front-panel, menu, touchscreen)
 * @param location - The location to filter by
 */
export function getControlsByLocation(location: RadioControl['location']): RadioControl[] {
  return IC7300_CONTROLS.filter((control) => control.location === location)
}

/**
 * Get all band plans
 */
export function getBandPlans(): BandPlan[] {
  return BAND_PLANS
}

/**
 * Get a specific band plan by name
 * @param bandName - The band name (e.g., '10m', '2m', '70cm')
 */
export function getBandPlan(bandName: BandName): BandPlan | undefined {
  return BAND_PLANS.find((band) => band.name === bandName)
}

/**
 * Get all supported radio modes
 */
export function getRadioModes(): RadioMode[] {
  return IC7300_MODES
}

/**
 * Get a specific radio mode by ID
 * @param id - The mode ID (e.g., 'lsb', 'usb', 'cw')
 */
export function getRadioModeById(id: string): RadioMode | undefined {
  return IC7300_MODES.find((mode) => mode.id === id)
}

/**
 * Get all control categories
 */
export function getControlCategories(): RadioControl['category'][] {
  const categories = new Set(IC7300_CONTROLS.map((c) => c.category))
  return Array.from(categories)
}

/**
 * Search controls by name or description
 * @param query - Search query string
 */
export function searchControls(query: string): RadioControl[] {
  const lowerQuery = query.toLowerCase()
  return IC7300_CONTROLS.filter(
    (control) =>
      control.name.toLowerCase().includes(lowerQuery) ||
      control.description.toLowerCase().includes(lowerQuery) ||
      (control.examTips && control.examTips.toLowerCase().includes(lowerQuery))
  )
}

/**
 * Get controls that have exam tips
 */
export function getControlsWithExamTips(): RadioControl[] {
  return IC7300_CONTROLS.filter((control) => control.examTips)
}

/**
 * Get frequency allocations for a specific license class
 * @param bandName - The band to check
 * @param licenseClass - The license class to filter by
 */
export function getAllocationsForLicense(
  bandName: BandName,
  licenseClass: 'technician' | 'general' | 'extra'
) {
  const band = getBandPlan(bandName)
  if (!band) return []

  return band.allocations.filter((alloc) => alloc.licenseClass.includes(licenseClass))
}

/**
 * Check if a frequency is within amateur allocations
 * @param frequencyKHz - Frequency in kHz
 */
export function isAmateurFrequency(frequencyKHz: number): {
  band: BandName
  allocation: BandPlan['allocations'][0]
} | null {
  for (const band of BAND_PLANS) {
    for (const allocation of band.allocations) {
      if (frequencyKHz >= allocation.startFreq && frequencyKHz <= allocation.endFreq) {
        return { band: band.name, allocation }
      }
    }
  }
  return null
}

/**
 * Get common calling frequencies
 */
export function getCallingFrequencies() {
  return CALLING_FREQUENCIES
}

/**
 * Get Technician class privileges summary
 */
export function getTechnicianPrivileges() {
  return TECHNICIAN_PRIVILEGES
}

/**
 * Format frequency for display
 * @param frequencyKHz - Frequency in kHz
 */
export function formatFrequency(frequencyKHz: number): string {
  if (frequencyKHz >= 1000000) {
    // GHz range
    return `${(frequencyKHz / 1000000).toFixed(3)} GHz`
  } else if (frequencyKHz >= 1000) {
    // MHz range
    return `${(frequencyKHz / 1000).toFixed(3)} MHz`
  } else {
    // kHz range
    return `${frequencyKHz} kHz`
  }
}

/**
 * Get band name from frequency
 * @param frequencyKHz - Frequency in kHz
 */
export function getBandFromFrequency(frequencyKHz: number): BandName | null {
  for (const band of BAND_PLANS) {
    if (frequencyKHz >= band.startFreq && frequencyKHz <= band.endFreq) {
      return band.name
    }
  }
  return null
}

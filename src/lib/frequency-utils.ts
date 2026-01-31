/**
 * Frequency conversion utilities for the RF spectrum visualizer.
 * Provides functions for converting between frequency and wavelength,
 * formatting values for display, and calculating positions on logarithmic scales.
 */

/** Speed of light in km/s */
const SPEED_OF_LIGHT_KM_S = 299792.458

/** Band frequency thresholds in kHz */
const BAND_THRESHOLDS = {
  VHF: 30_000, // 30 MHz
  UHF: 300_000, // 300 MHz
  SHF: 3_000_000, // 3 GHz
} as const

/**
 * Convert frequency in kHz to wavelength in meters.
 *
 * Uses the formula: wavelength = c / frequency
 * where c is the speed of light (299,792.458 km/s)
 *
 * @param freqKHz - Frequency in kilohertz
 * @returns Wavelength in meters
 *
 * @example
 * freqToWavelength(14000) // Returns ~21.4 meters (20m band)
 * freqToWavelength(144000) // Returns ~2.08 meters (2m band)
 */
export function freqToWavelength(freqKHz: number): number {
  if (freqKHz <= 0) {
    throw new Error('Frequency must be positive')
  }
  // Convert kHz to Hz (multiply by 1000), then apply c/f
  // c is in km/s, so we need c * 1000 to get m/s
  // wavelength = (c * 1000 m/s) / (freqKHz * 1000 Hz) = c / freqKHz
  return SPEED_OF_LIGHT_KM_S / freqKHz
}

/**
 * Convert wavelength in meters to frequency in kHz.
 *
 * Uses the formula: frequency = c / wavelength
 * where c is the speed of light (299,792.458 km/s)
 *
 * @param meters - Wavelength in meters
 * @returns Frequency in kilohertz
 *
 * @example
 * wavelengthToFreq(20) // Returns ~14989.6 kHz (20m band)
 * wavelengthToFreq(2) // Returns ~149896.2 kHz (2m band)
 */
export function wavelengthToFreq(meters: number): number {
  if (meters <= 0) {
    throw new Error('Wavelength must be positive')
  }
  // frequency in kHz = c (km/s) / wavelength (m) * 1000 (to convert to Hz) / 1000 (to kHz)
  // Simplifies to: c / meters
  return SPEED_OF_LIGHT_KM_S / meters
}

/**
 * Format a frequency value for human-readable display.
 *
 * Automatically selects the appropriate unit based on magnitude:
 * - < 1000 kHz: displays in kHz
 * - 1000-999999 kHz: displays in MHz (with 3 decimal places)
 * - >= 1000000 kHz: displays in GHz (with 2 decimal places)
 *
 * @param freqKHz - Frequency in kilohertz
 * @returns Formatted frequency string with appropriate unit
 *
 * @example
 * formatFrequency(500) // Returns "500 kHz"
 * formatFrequency(14250) // Returns "14.250 MHz"
 * formatFrequency(2400000) // Returns "2.40 GHz"
 */
export function formatFrequency(freqKHz: number): string {
  if (freqKHz < 0) {
    throw new Error('Frequency must be non-negative')
  }

  if (freqKHz < 1000) {
    // Display in kHz
    return `${freqKHz} kHz`
  } else if (freqKHz < 1_000_000) {
    // Display in MHz (1 MHz = 1000 kHz)
    const mhz = freqKHz / 1000
    return `${mhz.toFixed(3)} MHz`
  } else {
    // Display in GHz (1 GHz = 1000000 kHz)
    const ghz = freqKHz / 1_000_000
    return `${ghz.toFixed(2)} GHz`
  }
}

/**
 * Format a wavelength value for human-readable display.
 *
 * Automatically selects the appropriate unit based on magnitude:
 * - >= 1m: displays in meters (with 1 decimal place)
 * - < 1m: displays in centimeters (with 1 decimal place)
 *
 * @param meters - Wavelength in meters
 * @returns Formatted wavelength string with appropriate unit
 *
 * @example
 * formatWavelength(20.5) // Returns "20.5 m"
 * formatWavelength(0.125) // Returns "12.5 cm"
 */
export function formatWavelength(meters: number): string {
  if (meters < 0) {
    throw new Error('Wavelength must be non-negative')
  }

  if (meters >= 1) {
    // Display in meters
    return `${meters.toFixed(1)} m`
  } else {
    // Display in centimeters (1 m = 100 cm)
    const cm = meters * 100
    return `${cm.toFixed(1)} cm`
  }
}

/**
 * Determine the band category for a given frequency.
 *
 * Band categories are defined as:
 * - HF (High Frequency): < 30 MHz (30000 kHz)
 * - VHF (Very High Frequency): 30-300 MHz (30000-300000 kHz)
 * - UHF (Ultra High Frequency): 300 MHz - 3 GHz (300000-3000000 kHz)
 * - SHF (Super High Frequency): > 3 GHz (3000000 kHz)
 *
 * @param freqKHz - Frequency in kilohertz
 * @returns Band category identifier
 *
 * @example
 * getBandCategory(14000) // Returns 'HF'
 * getBandCategory(144000) // Returns 'VHF'
 * getBandCategory(440000) // Returns 'UHF'
 * getBandCategory(5800000) // Returns 'SHF'
 */
export function getBandCategory(freqKHz: number): 'HF' | 'VHF' | 'UHF' | 'SHF' {
  if (freqKHz < 0) {
    throw new Error('Frequency must be non-negative')
  }

  if (freqKHz < BAND_THRESHOLDS.VHF) {
    return 'HF'
  } else if (freqKHz < BAND_THRESHOLDS.UHF) {
    return 'VHF'
  } else if (freqKHz < BAND_THRESHOLDS.SHF) {
    return 'UHF'
  } else {
    return 'SHF'
  }
}

/**
 * Calculate the percentage position of a frequency on a logarithmic scale.
 *
 * Returns a value between 0 and 100 representing where the frequency
 * falls on a logarithmic scale between minFreq and maxFreq.
 * This is useful for positioning elements on a spectrum visualization
 * where frequency increases logarithmically.
 *
 * @param freqKHz - The frequency to position (in kilohertz)
 * @param minFreq - The minimum frequency of the scale (in kilohertz)
 * @param maxFreq - The maximum frequency of the scale (in kilohertz)
 * @returns Percentage position (0-100) on the logarithmic scale
 *
 * @example
 * // Position of 10 MHz on a scale from 1 MHz to 100 MHz
 * getLogPosition(10000, 1000, 100000) // Returns 50 (halfway on log scale)
 *
 * @example
 * // Position of 30 MHz on a scale from 3 MHz to 30 GHz
 * getLogPosition(30000, 3000, 30000000) // Returns 25
 */
export function getLogPosition(freqKHz: number, minFreq: number, maxFreq: number): number {
  if (freqKHz <= 0 || minFreq <= 0 || maxFreq <= 0) {
    throw new Error('All frequency values must be positive')
  }

  if (minFreq >= maxFreq) {
    throw new Error('minFreq must be less than maxFreq')
  }

  // Clamp frequency to the valid range
  const clampedFreq = Math.max(minFreq, Math.min(maxFreq, freqKHz))

  // Calculate logarithmic position
  // log(freq) - log(min) gives position relative to minimum
  // Divide by log(max) - log(min) to normalize to 0-1 range
  // Multiply by 100 for percentage
  const logMin = Math.log10(minFreq)
  const logMax = Math.log10(maxFreq)
  const logFreq = Math.log10(clampedFreq)

  const position = ((logFreq - logMin) / (logMax - logMin)) * 100

  return position
}

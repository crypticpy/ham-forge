/**
 * RF Spectrum Visualizer Types
 * Type definitions for amateur radio spectrum visualization, band segments, and filtering
 */

/**
 * Amateur radio license classes as defined by the FCC.
 * Ordered from entry-level to highest privileges.
 * Note: 'novice' and 'advanced' are legacy classes no longer issued but still valid.
 */
export type LicenseClass = 'novice' | 'technician' | 'general' | 'advanced' | 'extra'

/**
 * Operating modes used in amateur radio communications.
 * Includes voice, digital, and specialized modes.
 */
export type OperatingMode =
  | 'CW' // Continuous Wave (Morse code)
  | 'SSB' // Single Sideband (voice)
  | 'AM' // Amplitude Modulation (voice)
  | 'FM' // Frequency Modulation (voice)
  | 'RTTY' // Radio Teletype
  | 'Digital' // Digital modes (FT8, FT4, PSK31, etc.)
  | 'Data' // Data communications
  | 'Image' // SSTV, FAX
  | 'ATV' // Amateur Television
  | 'Satellite' // Satellite communications
  | 'EME' // Earth-Moon-Earth (moonbounce)
  | 'Beacon' // Beacon transmissions
  | 'All' // All modes permitted

/**
 * Represents a segment within an amateur band with specific privileges.
 * Band segments define which license classes can operate, allowed modes,
 * and power limits for a specific frequency range.
 */
export interface BandSegment {
  /** Start frequency of the segment in kHz */
  startFreq: number
  /** End frequency of the segment in kHz */
  endFreq: number
  /** License classes permitted to operate in this segment */
  licenseClasses: LicenseClass[]
  /** Operating modes allowed in this segment */
  modes: OperatingMode[]
  /** Maximum transmitter power output in watts (if restricted) */
  maxPowerWatts?: number
  /** Additional notes or restrictions for this segment */
  notes?: string
}

/**
 * Represents a complete amateur radio band with all its segments and metadata.
 * Contains frequency boundaries, wavelength, and detailed segment information.
 */
export interface AmateurBand {
  /** Unique identifier for the band (e.g., '160m', '80m', '40m') */
  id: string
  /** Human-readable band name (e.g., '160 Meters', '2 Meters') */
  name: string
  /** Start frequency of the band in kHz */
  startFreq: number
  /** End frequency of the band in kHz */
  endFreq: number
  /** Approximate wavelength in meters */
  wavelengthMeters: number
  /** Frequency category classification */
  category: 'HF' | 'VHF' | 'UHF' | 'SHF'
  /** Band segments with privilege and mode restrictions */
  segments: BandSegment[]
  /** Common calling frequencies for this band */
  callingFrequencies?: CallingFrequency[]
  /** Additional notes about this band (special restrictions, sharing, etc.) */
  notes?: string
}

/**
 * Represents a common calling or activity frequency within a band.
 */
export interface CallingFrequency {
  /** Frequency in kHz */
  freq: number
  /** Primary operating mode used on this frequency */
  mode: OperatingMode
  /** Description or purpose of this frequency (e.g., 'National calling frequency') */
  notes?: string
}

/**
 * Filter options for the spectrum visualizer.
 * Used to highlight or filter bands based on user privileges and interests.
 */
export interface SpectrumFilter {
  /** Filter by license class privileges */
  licenseClass?: LicenseClass
  /** Filter by operating mode */
  mode?: OperatingMode
  /** Filter by frequency category */
  category?: 'HF' | 'VHF' | 'UHF' | 'SHF'
}

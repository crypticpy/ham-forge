import { describe, it, expect } from 'vitest'
import {
  freqToWavelength,
  wavelengthToFreq,
  formatFrequency,
  formatWavelength,
  getBandCategory,
  getLogPosition,
} from '@/lib/frequency-utils'

describe('frequency-utils', () => {
  describe('freqToWavelength', () => {
    it('converts 14000 kHz (20m band) correctly', () => {
      const wavelength = freqToWavelength(14000)
      // c = 299,792.458 km/s, λ = c / f
      // 299792.458 / 14000 = 21.41374... meters
      expect(wavelength).toBeCloseTo(21.414, 2)
    })

    it('converts 146520 kHz (2m FM calling) correctly', () => {
      const wavelength = freqToWavelength(146520)
      // 299792.458 / 146520 = 2.046... meters
      expect(wavelength).toBeCloseTo(2.046, 2)
    })

    it('converts 440000 kHz (70cm band) correctly', () => {
      const wavelength = freqToWavelength(440000)
      // 299792.458 / 440000 = 0.6813... meters (68.13 cm)
      expect(wavelength).toBeCloseTo(0.681, 2)
    })

    it('converts 1800 kHz (160m band start) correctly', () => {
      const wavelength = freqToWavelength(1800)
      // 299792.458 / 1800 = 166.55... meters
      expect(wavelength).toBeCloseTo(166.55, 1)
    })

    it('returns correct wavelength for 7000 kHz (40m band)', () => {
      const wavelength = freqToWavelength(7000)
      expect(wavelength).toBeCloseTo(42.83, 1)
    })

    it('handles very high frequencies (1.3 GHz / 23cm)', () => {
      const wavelength = freqToWavelength(1300000)
      // 299792.458 / 1300000 = 0.2306... meters (23.06 cm)
      expect(wavelength).toBeCloseTo(0.231, 2)
    })
  })

  describe('wavelengthToFreq', () => {
    it('converts 20 meters to approximately 14.99 MHz', () => {
      const freq = wavelengthToFreq(20)
      // 299792.458 / 20 = 14989.6... kHz
      expect(freq).toBeCloseTo(14990, -1)
    })

    it('converts 2 meters to approximately 149.9 MHz', () => {
      const freq = wavelengthToFreq(2)
      expect(freq).toBeCloseTo(149896, -2)
    })

    it('converts 70 cm (0.7m) to approximately 428 MHz', () => {
      const freq = wavelengthToFreq(0.7)
      // 299792.458 / 0.7 = 428274.9... kHz
      expect(freq).toBeCloseTo(428275, -2)
    })

    it('converts 160 meters to approximately 1.87 MHz', () => {
      const freq = wavelengthToFreq(160)
      // 299792.458 / 160 = 1873.7... kHz
      expect(freq).toBeCloseTo(1874, -1)
    })

    it('is the inverse of freqToWavelength', () => {
      const originalFreq = 14200
      const wavelength = freqToWavelength(originalFreq)
      const convertedBack = wavelengthToFreq(wavelength)
      expect(convertedBack).toBeCloseTo(originalFreq, 0)
    })
  })

  describe('formatFrequency', () => {
    it('formats frequencies below 1 MHz in kHz', () => {
      expect(formatFrequency(500)).toBe('500 kHz')
      expect(formatFrequency(999)).toBe('999 kHz')
    })

    it('formats frequencies at 1 MHz as MHz with 3 decimal places', () => {
      expect(formatFrequency(1000)).toBe('1.000 MHz')
    })

    it('formats HF frequencies in MHz with 3 decimal places', () => {
      expect(formatFrequency(7000)).toBe('7.000 MHz')
      expect(formatFrequency(14000)).toBe('14.000 MHz')
      expect(formatFrequency(14350)).toBe('14.350 MHz')
    })

    it('formats VHF frequencies in MHz with 3 decimal places', () => {
      expect(formatFrequency(50000)).toBe('50.000 MHz')
      expect(formatFrequency(146520)).toBe('146.520 MHz')
    })

    it('formats UHF frequencies at or above 1 GHz in GHz with 2 decimal places', () => {
      expect(formatFrequency(1000000)).toBe('1.00 GHz')
      expect(formatFrequency(1300000)).toBe('1.30 GHz')
    })

    it('formats frequencies with decimal precision', () => {
      expect(formatFrequency(14074)).toBe('14.074 MHz')
      expect(formatFrequency(7074)).toBe('7.074 MHz')
    })

    it('preserves trailing zeros for consistent formatting', () => {
      expect(formatFrequency(14000)).toBe('14.000 MHz')
      expect(formatFrequency(14100)).toBe('14.100 MHz')
    })
  })

  describe('formatWavelength', () => {
    it('formats wavelengths >= 1 meter in meters with 1 decimal place', () => {
      expect(formatWavelength(20)).toBe('20.0 m')
      expect(formatWavelength(160)).toBe('160.0 m')
      expect(formatWavelength(2)).toBe('2.0 m')
    })

    it('formats wavelengths < 1 meter in centimeters with 1 decimal place', () => {
      expect(formatWavelength(0.7)).toBe('70.0 cm')
      expect(formatWavelength(0.33)).toBe('33.0 cm')
      expect(formatWavelength(0.23)).toBe('23.0 cm')
    })

    it('shows decimal precision for non-integer values', () => {
      expect(formatWavelength(21.4)).toBe('21.4 m')
      expect(formatWavelength(0.6813)).toBe('68.1 cm') // 1 decimal place
    })

    it('handles edge case at exactly 1 meter', () => {
      expect(formatWavelength(1)).toBe('1.0 m')
    })

    it('handles very small wavelengths', () => {
      expect(formatWavelength(0.1)).toBe('10.0 cm')
      expect(formatWavelength(0.05)).toBe('5.0 cm')
    })
  })

  describe('getBandCategory', () => {
    it('returns HF for frequencies 3-30 MHz', () => {
      expect(getBandCategory(1800)).toBe('HF') // 1.8 MHz is technically MF but included in HF for amateur
      expect(getBandCategory(7000)).toBe('HF')
      expect(getBandCategory(14000)).toBe('HF')
      expect(getBandCategory(28000)).toBe('HF')
      expect(getBandCategory(29700)).toBe('HF')
    })

    it('returns VHF for frequencies 30-300 MHz', () => {
      expect(getBandCategory(50000)).toBe('VHF')
      expect(getBandCategory(144000)).toBe('VHF')
      expect(getBandCategory(148000)).toBe('VHF')
      expect(getBandCategory(222000)).toBe('VHF')
    })

    it('returns UHF for frequencies 300-3000 MHz', () => {
      expect(getBandCategory(420000)).toBe('UHF')
      expect(getBandCategory(440000)).toBe('UHF')
      expect(getBandCategory(902000)).toBe('UHF')
      expect(getBandCategory(1300000)).toBe('UHF')
    })

    it('returns SHF for frequencies above 3 GHz', () => {
      expect(getBandCategory(5000000)).toBe('SHF')
      expect(getBandCategory(10000000)).toBe('SHF')
    })
  })

  describe('getLogPosition', () => {
    it('returns 0 for minimum frequency', () => {
      const position = getLogPosition(1800, 1800, 1300000)
      expect(position).toBe(0)
    })

    it('returns 100 for maximum frequency', () => {
      const position = getLogPosition(1300000, 1800, 1300000)
      expect(position).toBe(100)
    })

    it('returns a value between 0 and 100 for intermediate frequencies', () => {
      const position = getLogPosition(14000, 1800, 1300000)
      expect(position).toBeGreaterThan(0)
      expect(position).toBeLessThan(100)
    })

    it('uses logarithmic scale (not linear)', () => {
      // Linear midpoint would be at (1800 + 1300000) / 2 = 650900 kHz
      // Logarithmic midpoint should be around sqrt(1800 * 1300000) = ~48395 kHz
      const linearMidPosition = getLogPosition(650900, 1800, 1300000)
      const logMidPosition = getLogPosition(48395, 1800, 1300000)

      // Logarithmic midpoint should be near 50% (within 1%)
      expect(logMidPosition).toBeCloseTo(50, 0)
      // Linear midpoint should be much higher on log scale (close to 90%)
      expect(linearMidPosition).toBeGreaterThan(85)
    })

    it('spreads HF bands across lower portion of scale', () => {
      const band160m = getLogPosition(1800, 1800, 1300000)
      const band80m = getLogPosition(3500, 1800, 1300000)
      const band40m = getLogPosition(7000, 1800, 1300000)
      const band20m = getLogPosition(14000, 1800, 1300000)
      const band10m = getLogPosition(28000, 1800, 1300000)

      // Verify increasing positions
      expect(band80m).toBeGreaterThan(band160m)
      expect(band40m).toBeGreaterThan(band80m)
      expect(band20m).toBeGreaterThan(band40m)
      expect(band10m).toBeGreaterThan(band20m)

      // HF bands should all be in lower half of log scale
      expect(band10m).toBeLessThan(50)
    })

    it('places VHF/UHF bands in upper portion of scale', () => {
      const band6m = getLogPosition(50000, 1800, 1300000)
      const band2m = getLogPosition(144000, 1800, 1300000)
      const band70cm = getLogPosition(440000, 1800, 1300000)

      expect(band6m).toBeGreaterThan(50)
      expect(band2m).toBeGreaterThan(band6m)
      expect(band70cm).toBeGreaterThan(band2m)
    })
  })
})

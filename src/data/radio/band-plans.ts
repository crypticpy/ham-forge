/**
 * Amateur Radio Band Plans
 * Frequency allocations based on FCC Part 97 regulations
 * All frequencies in kHz
 */

import type { BandPlan } from '@/types/radio'

export const BAND_PLANS: BandPlan[] = [
  // 10 Meter Band (28.0-29.7 MHz)
  {
    name: '10m',
    startFreq: 28000,
    endFreq: 29700,
    allocations: [
      {
        startFreq: 28000,
        endFreq: 28300,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'CW and digital modes. Technicians have CW privileges here.',
      },
      {
        startFreq: 28300,
        endFreq: 28500,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['CW', 'SSB'],
        notes: 'Technicians have phone privileges 28.3-28.5 MHz. All classes share this segment.',
      },
      {
        startFreq: 28500,
        endFreq: 29000,
        licenseClass: ['extra', 'general'],
        modes: ['CW', 'SSB'],
        notes: 'General and Extra class phone segment.',
      },
      {
        startFreq: 29000,
        endFreq: 29200,
        licenseClass: ['extra', 'general'],
        modes: ['CW', 'SSB', 'Digital'],
        notes: 'Digital and phone operations.',
      },
      {
        startFreq: 29200,
        endFreq: 29300,
        licenseClass: ['extra', 'general'],
        modes: ['CW', 'SSB', 'AM'],
        notes: 'AM operations permitted.',
      },
      {
        startFreq: 29300,
        endFreq: 29510,
        licenseClass: ['extra', 'general'],
        modes: ['Satellite'],
        notes: 'Satellite downlinks.',
      },
      {
        startFreq: 29510,
        endFreq: 29700,
        licenseClass: ['extra', 'general'],
        modes: ['CW', 'FM'],
        notes: 'FM simplex and repeater outputs. 29.6 MHz FM calling frequency.',
      },
    ],
  },

  // 6 Meter Band (50-54 MHz)
  {
    name: '6m',
    startFreq: 50000,
    endFreq: 54000,
    allocations: [
      {
        startFreq: 50000,
        endFreq: 50100,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['CW'],
        notes: 'CW only. 50.0-50.1 MHz is CW-only by band plan.',
      },
      {
        startFreq: 50100,
        endFreq: 50300,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['CW', 'SSB'],
        notes: '50.110 MHz is the DX calling frequency. 50.125 MHz is SSB calling.',
      },
      {
        startFreq: 50300,
        endFreq: 50600,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['CW', 'SSB', 'Digital'],
        notes: 'All modes segment. Digital modes active here.',
      },
      {
        startFreq: 50600,
        endFreq: 51000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['CW', 'SSB', 'Digital'],
        notes: 'Non-channelized experimental and digital modes.',
      },
      {
        startFreq: 51000,
        endFreq: 52000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater inputs (51.0-51.1 MHz).',
      },
      {
        startFreq: 52000,
        endFreq: 52500,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: '52.525 MHz is the FM simplex calling frequency. FM repeater outputs.',
      },
      {
        startFreq: 52500,
        endFreq: 54000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM', 'All'],
        notes: 'All modes, including FM simplex and ATV.',
      },
    ],
  },

  // 2 Meter Band (144-148 MHz)
  {
    name: '2m',
    startFreq: 144000,
    endFreq: 148000,
    allocations: [
      {
        startFreq: 144000,
        endFreq: 144100,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['CW'],
        notes: 'CW only. 144.050 MHz is CW calling frequency.',
      },
      {
        startFreq: 144100,
        endFreq: 144200,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['CW', 'SSB'],
        notes: '144.200 MHz is the SSB calling frequency for North America.',
      },
      {
        startFreq: 144200,
        endFreq: 144275,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['CW', 'SSB'],
        notes: 'SSB. Heavily used for weak signal, meteor scatter, and EME (moonbounce).',
      },
      {
        startFreq: 144275,
        endFreq: 144300,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['CW', 'SSB', 'Beacon'],
        notes: 'Propagation beacons.',
      },
      {
        startFreq: 144300,
        endFreq: 144500,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['CW', 'SSB', 'Digital'],
        notes: 'New modes and experimental.',
      },
      {
        startFreq: 144500,
        endFreq: 144600,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['CW', 'Digital'],
        notes: 'Linear translator inputs.',
      },
      {
        startFreq: 144600,
        endFreq: 144900,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM simplex and packet radio. 144.39 MHz is APRS frequency.',
      },
      {
        startFreq: 144900,
        endFreq: 145100,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: 'Weak signal and FM simplex.',
      },
      {
        startFreq: 145100,
        endFreq: 145500,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater inputs.',
      },
      {
        startFreq: 145500,
        endFreq: 145800,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: 'Miscellaneous and experimental.',
      },
      {
        startFreq: 145800,
        endFreq: 146000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['Satellite'],
        notes: 'Satellite operations. ISS uses 145.80 MHz.',
      },
      {
        startFreq: 146000,
        endFreq: 146400,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater inputs. 146.52 MHz is the national simplex calling frequency.',
      },
      {
        startFreq: 146400,
        endFreq: 146600,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM simplex.',
      },
      {
        startFreq: 146600,
        endFreq: 147000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater outputs.',
      },
      {
        startFreq: 147000,
        endFreq: 147400,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater outputs.',
      },
      {
        startFreq: 147400,
        endFreq: 147600,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM simplex.',
      },
      {
        startFreq: 147600,
        endFreq: 148000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater inputs.',
      },
    ],
  },

  // 70 Centimeter Band (420-450 MHz)
  {
    name: '70cm',
    startFreq: 420000,
    endFreq: 450000,
    allocations: [
      {
        startFreq: 420000,
        endFreq: 426000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['ATV', 'All'],
        notes: 'ATV and mixed modes. Shared with government radiolocation.',
      },
      {
        startFreq: 426000,
        endFreq: 432000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['ATV', 'All'],
        notes: 'ATV and links.',
      },
      {
        startFreq: 432000,
        endFreq: 432100,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['CW', 'EME'],
        notes: 'EME (Earth-Moon-Earth/Moonbounce) operations.',
      },
      {
        startFreq: 432100,
        endFreq: 433000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['CW', 'SSB'],
        notes: 'Weak signal. 432.1 MHz is the SSB/CW calling frequency. EME activity.',
      },
      {
        startFreq: 433000,
        endFreq: 435000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['All'],
        notes: 'Auxiliary and control links, repeater links.',
      },
      {
        startFreq: 435000,
        endFreq: 438000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['Satellite'],
        notes: 'Satellite uplinks and downlinks.',
      },
      {
        startFreq: 438000,
        endFreq: 440000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['ATV', 'All'],
        notes: 'ATV and repeater links.',
      },
      {
        startFreq: 440000,
        endFreq: 445000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater outputs (standard 5 MHz offset). High activity segment.',
      },
      {
        startFreq: 445000,
        endFreq: 447000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM simplex. 446.0 MHz is the national simplex calling frequency.',
      },
      {
        startFreq: 447000,
        endFreq: 450000,
        licenseClass: ['extra', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater inputs.',
      },
    ],
  },
]

/**
 * Common calling frequencies for quick reference
 */
export const CALLING_FREQUENCIES = {
  '10m_fm': 29600, // kHz
  '6m_ssb': 50125, // kHz
  '6m_fm': 52525, // kHz
  '2m_ssb': 144200, // kHz
  '2m_fm': 146520, // kHz - National Simplex Calling
  '70cm_ssb': 432100, // kHz
  '70cm_fm': 446000, // kHz - National Simplex Calling
  aprs: 144390, // kHz - APRS frequency
  iss: 145800, // kHz - ISS downlink
}

/**
 * Technician band privileges summary
 * Quick reference for what Technicians can do
 */
export const TECHNICIAN_PRIVILEGES = {
  '10m': {
    cw: { start: 28000, end: 28300, notes: 'CW only' },
    phone: {
      start: 28300,
      end: 28500,
      notes: '200 kHz of phone privileges on 10m',
    },
  },
  '6m': {
    all: { start: 50000, end: 54000, notes: 'Full privileges on 6m' },
  },
  '2m': {
    all: { start: 144000, end: 148000, notes: 'Full privileges on 2m' },
  },
  '70cm': {
    all: {
      start: 420000,
      end: 450000,
      notes: 'Full privileges on 70cm (shared with government)',
    },
  },
  '1.25m': {
    all: { start: 222000, end: 225000, notes: 'Full privileges on 222 MHz' },
  },
  '33cm': {
    all: { start: 902000, end: 928000, notes: 'Full privileges on 902 MHz' },
  },
  '23cm': {
    all: {
      start: 1240000,
      end: 1300000,
      notes: 'Full privileges on 1240 MHz',
    },
  },
}

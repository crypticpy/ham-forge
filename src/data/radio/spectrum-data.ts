/**
 * US Amateur Radio Band Allocations
 * Complete frequency allocations based on FCC Part 97 regulations
 * All frequencies in kHz
 *
 * Reference: https://www.ecfr.gov/current/title-47/chapter-I/subchapter-D/part-97
 */

import type { AmateurBand } from '@/types/spectrum'

export const AMATEUR_BANDS: AmateurBand[] = [
  // =============================================================================
  // HF BANDS
  // =============================================================================

  // 160 Meter Band (1.8-2.0 MHz)
  {
    id: '160m',
    name: '160 Meters',
    startFreq: 1800,
    endFreq: 2000,
    wavelengthMeters: 160,
    category: 'HF',
    segments: [
      {
        startFreq: 1800,
        endFreq: 1800,
        licenseClasses: ['extra'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'Extra class exclusive. CW and digital modes only.',
      },
      {
        startFreq: 1800,
        endFreq: 1825,
        licenseClasses: ['extra'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'Extra class exclusive. CW/RTTY/Data.',
      },
      {
        startFreq: 1825,
        endFreq: 1875,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'General class and above. CW/RTTY/Data.',
      },
      {
        startFreq: 1875,
        endFreq: 2000,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'General class and above. All modes including phone.',
      },
      {
        startFreq: 1900,
        endFreq: 2000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW'],
        maxPowerWatts: 200,
        notes: 'Technician CW privileges. 200W PEP maximum.',
      },
    ],
    callingFrequencies: [
      { freq: 1838, mode: 'Digital', notes: 'FT8/Digital calling' },
      { freq: 1843, mode: 'CW', notes: 'CW activity center' },
      { freq: 1910, mode: 'SSB', notes: 'QRP calling frequency' },
    ],
  },

  // 80 Meter Band (3.5-4.0 MHz)
  {
    id: '80m',
    name: '80 Meters',
    startFreq: 3500,
    endFreq: 4000,
    wavelengthMeters: 80,
    category: 'HF',
    segments: [
      {
        startFreq: 3500,
        endFreq: 3525,
        licenseClasses: ['extra'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'Extra class exclusive. CW/RTTY/Data.',
      },
      {
        startFreq: 3525,
        endFreq: 3600,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'General class and above. CW/RTTY/Data.',
      },
      {
        startFreq: 3600,
        endFreq: 3700,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'General class and above. All modes.',
      },
      {
        startFreq: 3700,
        endFreq: 3800,
        licenseClasses: ['extra', 'advanced'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'Advanced class exclusive. Phone privileges.',
      },
      {
        startFreq: 3800,
        endFreq: 3900,
        licenseClasses: ['extra'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'Extra class exclusive phone segment.',
      },
      {
        startFreq: 3900,
        endFreq: 4000,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'General class phone segment.',
      },
      {
        startFreq: 3525,
        endFreq: 3600,
        licenseClasses: ['technician'],
        modes: ['CW'],
        maxPowerWatts: 200,
        notes: 'Technician CW privileges. 200W PEP maximum.',
      },
    ],
    callingFrequencies: [
      { freq: 3560, mode: 'CW', notes: 'QRP CW calling' },
      { freq: 3573, mode: 'Digital', notes: 'FT8 frequency' },
      { freq: 3579, mode: 'Digital', notes: 'JS8Call frequency' },
      { freq: 3590, mode: 'RTTY', notes: 'RTTY DX' },
      { freq: 3860, mode: 'SSB', notes: 'Net and roundtable activity' },
      { freq: 3885, mode: 'AM', notes: 'AM calling frequency' },
      { freq: 3985, mode: 'SSB', notes: 'Phone DX window' },
    ],
  },

  // 60 Meter Band (5 MHz) - Channelized
  {
    id: '60m',
    name: '60 Meters',
    startFreq: 5330.5,
    endFreq: 5405,
    wavelengthMeters: 60,
    category: 'HF',
    segments: [
      {
        startFreq: 5330.5,
        endFreq: 5330.5,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'Digital'],
        maxPowerWatts: 100,
        notes: 'Channel 1: 5330.5 kHz USB dial (5332 kHz suppressed carrier). 100W EIRP max.',
      },
      {
        startFreq: 5346.5,
        endFreq: 5346.5,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'Digital'],
        maxPowerWatts: 100,
        notes: 'Channel 2: 5346.5 kHz USB dial (5348 kHz suppressed carrier). 100W EIRP max.',
      },
      {
        startFreq: 5357,
        endFreq: 5357,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'Digital'],
        maxPowerWatts: 100,
        notes: 'Channel 3: 5357 kHz USB dial (5358.5 kHz suppressed carrier). 100W EIRP max.',
      },
      {
        startFreq: 5371.5,
        endFreq: 5371.5,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'Digital'],
        maxPowerWatts: 100,
        notes: 'Channel 4: 5371.5 kHz USB dial (5373 kHz suppressed carrier). 100W EIRP max.',
      },
      {
        startFreq: 5403.5,
        endFreq: 5403.5,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'Digital'],
        maxPowerWatts: 100,
        notes: 'Channel 5: 5403.5 kHz USB dial (5405 kHz suppressed carrier). 100W EIRP max.',
      },
    ],
    callingFrequencies: [{ freq: 5357, mode: 'SSB', notes: 'Primary calling channel (Channel 3)' }],
    notes: 'Channelized band with 5 USB channels. 100W EIRP maximum. 2.8 kHz max bandwidth.',
  },

  // 40 Meter Band (7.0-7.3 MHz)
  {
    id: '40m',
    name: '40 Meters',
    startFreq: 7000,
    endFreq: 7300,
    wavelengthMeters: 40,
    category: 'HF',
    segments: [
      {
        startFreq: 7000,
        endFreq: 7025,
        licenseClasses: ['extra'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'Extra class exclusive. CW/RTTY/Data.',
      },
      {
        startFreq: 7025,
        endFreq: 7125,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'General class and above. CW/RTTY/Data.',
      },
      {
        startFreq: 7125,
        endFreq: 7175,
        licenseClasses: ['extra'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'Extra class exclusive phone segment.',
      },
      {
        startFreq: 7175,
        endFreq: 7300,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'General class and above phone segment.',
      },
      {
        startFreq: 7025,
        endFreq: 7125,
        licenseClasses: ['technician'],
        modes: ['CW'],
        maxPowerWatts: 200,
        notes: 'Technician CW privileges. 200W PEP maximum.',
      },
    ],
    callingFrequencies: [
      { freq: 7030, mode: 'CW', notes: 'QRP CW calling' },
      { freq: 7040, mode: 'RTTY', notes: 'RTTY DX window' },
      { freq: 7074, mode: 'Digital', notes: 'FT8 frequency' },
      { freq: 7078, mode: 'Digital', notes: 'JS8Call frequency' },
      { freq: 7185, mode: 'SSB', notes: 'IRLP/EchoLink' },
      { freq: 7260, mode: 'SSB', notes: 'Traffic nets' },
      { freq: 7290, mode: 'SSB', notes: 'Phone DX window' },
    ],
  },

  // 30 Meter Band (10.1-10.15 MHz) - WARC Band
  {
    id: '30m',
    name: '30 Meters',
    startFreq: 10100,
    endFreq: 10150,
    wavelengthMeters: 30,
    category: 'HF',
    segments: [
      {
        startFreq: 10100,
        endFreq: 10150,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'RTTY', 'Data'],
        maxPowerWatts: 200,
        notes: 'WARC band. CW and digital only. 200W PEP maximum. No phone permitted.',
      },
    ],
    callingFrequencies: [
      { freq: 10106, mode: 'CW', notes: 'CW activity center' },
      { freq: 10116, mode: 'CW', notes: 'QRP CW calling' },
      { freq: 10130, mode: 'RTTY', notes: 'RTTY activity center' },
      { freq: 10136, mode: 'Digital', notes: 'FT8 frequency' },
      { freq: 10140, mode: 'Digital', notes: 'Digital modes/Packet' },
    ],
    notes: 'WARC band - No contests. 200W PEP maximum. Narrow band (50 kHz).',
  },

  // 20 Meter Band (14.0-14.35 MHz)
  {
    id: '20m',
    name: '20 Meters',
    startFreq: 14000,
    endFreq: 14350,
    wavelengthMeters: 20,
    category: 'HF',
    segments: [
      {
        startFreq: 14000,
        endFreq: 14025,
        licenseClasses: ['extra'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'Extra class exclusive. CW/RTTY/Data.',
      },
      {
        startFreq: 14025,
        endFreq: 14150,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'General class and above. CW/RTTY/Data.',
      },
      {
        startFreq: 14150,
        endFreq: 14175,
        licenseClasses: ['extra'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'Extra class exclusive phone segment.',
      },
      {
        startFreq: 14175,
        endFreq: 14225,
        licenseClasses: ['extra', 'advanced'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'Advanced class phone segment.',
      },
      {
        startFreq: 14225,
        endFreq: 14350,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'General class phone segment.',
      },
    ],
    callingFrequencies: [
      { freq: 14060, mode: 'CW', notes: 'QRP CW calling' },
      { freq: 14070, mode: 'RTTY', notes: 'RTTY activity center' },
      { freq: 14074, mode: 'Digital', notes: 'FT8 frequency' },
      { freq: 14078, mode: 'Digital', notes: 'JS8Call frequency' },
      { freq: 14100, mode: 'Beacon', notes: 'IBP/NCDXF Beacon' },
      { freq: 14230, mode: 'Image', notes: 'SSTV calling' },
      { freq: 14286, mode: 'SSB', notes: 'International AM calling' },
      { freq: 14300, mode: 'SSB', notes: 'Maritime Mobile calling' },
    ],
  },

  // 17 Meter Band (18.068-18.168 MHz) - WARC Band
  {
    id: '17m',
    name: '17 Meters',
    startFreq: 18068,
    endFreq: 18168,
    wavelengthMeters: 17,
    category: 'HF',
    segments: [
      {
        startFreq: 18068,
        endFreq: 18110,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'General class and above. CW/RTTY/Data.',
      },
      {
        startFreq: 18110,
        endFreq: 18168,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'General class and above. All modes.',
      },
    ],
    callingFrequencies: [
      { freq: 18080, mode: 'CW', notes: 'CW activity center' },
      { freq: 18095, mode: 'RTTY', notes: 'RTTY activity center' },
      { freq: 18100, mode: 'Digital', notes: 'FT8 frequency' },
      { freq: 18110, mode: 'Beacon', notes: 'IBP/NCDXF Beacon' },
      { freq: 18130, mode: 'SSB', notes: 'SSB activity center' },
    ],
    notes: 'WARC band - No contests.',
  },

  // 15 Meter Band (21.0-21.45 MHz)
  {
    id: '15m',
    name: '15 Meters',
    startFreq: 21000,
    endFreq: 21450,
    wavelengthMeters: 15,
    category: 'HF',
    segments: [
      {
        startFreq: 21000,
        endFreq: 21025,
        licenseClasses: ['extra'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'Extra class exclusive. CW/RTTY/Data.',
      },
      {
        startFreq: 21025,
        endFreq: 21200,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'General class and above. CW/RTTY/Data.',
      },
      {
        startFreq: 21200,
        endFreq: 21225,
        licenseClasses: ['extra'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'Extra class exclusive phone segment.',
      },
      {
        startFreq: 21225,
        endFreq: 21275,
        licenseClasses: ['extra', 'advanced'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'Advanced class phone segment.',
      },
      {
        startFreq: 21275,
        endFreq: 21450,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'General class phone segment.',
      },
      {
        startFreq: 21025,
        endFreq: 21200,
        licenseClasses: ['technician'],
        modes: ['CW'],
        maxPowerWatts: 200,
        notes: 'Technician CW privileges. 200W PEP maximum.',
      },
    ],
    callingFrequencies: [
      { freq: 21060, mode: 'CW', notes: 'QRP CW calling' },
      { freq: 21070, mode: 'RTTY', notes: 'RTTY activity center' },
      { freq: 21074, mode: 'Digital', notes: 'FT8 frequency' },
      { freq: 21078, mode: 'Digital', notes: 'JS8Call frequency' },
      { freq: 21150, mode: 'Beacon', notes: 'IBP/NCDXF Beacon' },
      { freq: 21340, mode: 'Image', notes: 'SSTV activity' },
      { freq: 21385, mode: 'SSB', notes: 'DX phone activity' },
    ],
  },

  // 12 Meter Band (24.89-24.99 MHz) - WARC Band
  {
    id: '12m',
    name: '12 Meters',
    startFreq: 24890,
    endFreq: 24990,
    wavelengthMeters: 12,
    category: 'HF',
    segments: [
      {
        startFreq: 24890,
        endFreq: 24930,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'General class and above. CW/RTTY/Data.',
      },
      {
        startFreq: 24930,
        endFreq: 24990,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'General class and above. All modes.',
      },
    ],
    callingFrequencies: [
      { freq: 24906, mode: 'CW', notes: 'CW activity center' },
      { freq: 24915, mode: 'RTTY', notes: 'RTTY activity center' },
      { freq: 24917, mode: 'Digital', notes: 'FT8 frequency' },
      { freq: 24930, mode: 'Beacon', notes: 'IBP/NCDXF Beacon' },
      { freq: 24950, mode: 'SSB', notes: 'SSB activity center' },
    ],
    notes: 'WARC band - No contests.',
  },

  // 10 Meter Band (28.0-29.7 MHz)
  {
    id: '10m',
    name: '10 Meters',
    startFreq: 28000,
    endFreq: 29700,
    wavelengthMeters: 10,
    category: 'HF',
    segments: [
      {
        startFreq: 28000,
        endFreq: 28300,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'RTTY', 'Data'],
        notes: 'All classes. CW/RTTY/Data. Technicians have full CW privileges.',
      },
      {
        startFreq: 28300,
        endFreq: 28500,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'SSB'],
        notes: 'Technician phone privileges (200 kHz segment). All classes SSB.',
      },
      {
        startFreq: 28500,
        endFreq: 29000,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'General class and above. All modes.',
      },
      {
        startFreq: 29000,
        endFreq: 29200,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'RTTY', 'Data', 'Image'],
        notes: 'Digital and phone operations.',
      },
      {
        startFreq: 29200,
        endFreq: 29300,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'SSB', 'AM', 'RTTY', 'Data', 'Image'],
        notes: 'AM calling segment.',
      },
      {
        startFreq: 29300,
        endFreq: 29510,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['Satellite'],
        notes: 'Satellite downlinks.',
      },
      {
        startFreq: 29510,
        endFreq: 29700,
        licenseClasses: ['extra', 'advanced', 'general'],
        modes: ['CW', 'FM'],
        notes: 'FM simplex and repeater outputs.',
      },
    ],
    callingFrequencies: [
      { freq: 28060, mode: 'CW', notes: 'QRP CW calling' },
      { freq: 28074, mode: 'Digital', notes: 'FT8 frequency' },
      { freq: 28078, mode: 'Digital', notes: 'JS8Call frequency' },
      { freq: 28120, mode: 'RTTY', notes: 'RTTY activity center' },
      { freq: 28200, mode: 'Beacon', notes: 'IBP/NCDXF Beacon' },
      { freq: 28400, mode: 'SSB', notes: 'SSB DX calling' },
      { freq: 29000, mode: 'AM', notes: 'AM calling' },
      { freq: 29600, mode: 'FM', notes: 'FM simplex calling' },
    ],
  },

  // =============================================================================
  // VHF BANDS
  // =============================================================================

  // 6 Meter Band (50-54 MHz)
  {
    id: '6m',
    name: '6 Meters',
    startFreq: 50000,
    endFreq: 54000,
    wavelengthMeters: 6,
    category: 'VHF',
    segments: [
      {
        startFreq: 50000,
        endFreq: 50100,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'EME'],
        notes: 'CW only segment. EME activity.',
      },
      {
        startFreq: 50100,
        endFreq: 50300,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'SSB'],
        notes: 'Weak signal SSB/CW. DX calling frequencies.',
      },
      {
        startFreq: 50300,
        endFreq: 50600,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'SSB', 'Digital', 'All'],
        notes: 'All modes. Digital activity.',
      },
      {
        startFreq: 50600,
        endFreq: 51000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['All'],
        notes: 'Non-channelized all modes.',
      },
      {
        startFreq: 51000,
        endFreq: 52000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater inputs and packet.',
      },
      {
        startFreq: 52000,
        endFreq: 52500,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater outputs.',
      },
      {
        startFreq: 52500,
        endFreq: 54000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM', 'ATV', 'All'],
        notes: 'All modes including ATV.',
      },
    ],
    callingFrequencies: [
      { freq: 50090, mode: 'CW', notes: 'CW calling' },
      { freq: 50110, mode: 'SSB', notes: 'DX calling frequency' },
      { freq: 50125, mode: 'SSB', notes: 'US SSB calling frequency' },
      { freq: 50260, mode: 'EME', notes: 'EME calling' },
      { freq: 50313, mode: 'Digital', notes: 'FT8 frequency' },
      { freq: 50323, mode: 'Digital', notes: 'FT4 frequency' },
      { freq: 52525, mode: 'FM', notes: 'FM simplex calling frequency' },
    ],
    notes: 'Known as the "Magic Band" for sporadic E propagation.',
  },

  // 2 Meter Band (144-148 MHz)
  {
    id: '2m',
    name: '2 Meters',
    startFreq: 144000,
    endFreq: 148000,
    wavelengthMeters: 2,
    category: 'VHF',
    segments: [
      {
        startFreq: 144000,
        endFreq: 144100,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'EME'],
        notes: 'CW only. EME operations.',
      },
      {
        startFreq: 144100,
        endFreq: 144275,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'SSB'],
        notes: 'SSB/CW weak signal. EME and meteor scatter.',
      },
      {
        startFreq: 144275,
        endFreq: 144300,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'SSB', 'Beacon'],
        notes: 'Propagation beacons.',
      },
      {
        startFreq: 144300,
        endFreq: 144500,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'SSB', 'Digital', 'All'],
        notes: 'New modes and experimental.',
      },
      {
        startFreq: 144500,
        endFreq: 144600,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'Digital'],
        notes: 'Linear translator inputs.',
      },
      {
        startFreq: 144600,
        endFreq: 144900,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM', 'Digital', 'Data'],
        notes: 'FM and packet. APRS on 144.39 MHz.',
      },
      {
        startFreq: 144900,
        endFreq: 145100,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'Weak signal and FM simplex.',
      },
      {
        startFreq: 145100,
        endFreq: 145500,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater inputs (standard 600 kHz offset).',
      },
      {
        startFreq: 145500,
        endFreq: 145800,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'Miscellaneous and experimental.',
      },
      {
        startFreq: 145800,
        endFreq: 146000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['Satellite'],
        notes: 'Satellite operations. ISS downlink on 145.80 MHz.',
      },
      {
        startFreq: 146000,
        endFreq: 146400,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater inputs.',
      },
      {
        startFreq: 146400,
        endFreq: 146600,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM simplex. 146.52 MHz is the national calling frequency.',
      },
      {
        startFreq: 146600,
        endFreq: 147000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater outputs.',
      },
      {
        startFreq: 147000,
        endFreq: 147400,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater outputs.',
      },
      {
        startFreq: 147400,
        endFreq: 147600,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM simplex.',
      },
      {
        startFreq: 147600,
        endFreq: 148000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater inputs.',
      },
    ],
    callingFrequencies: [
      { freq: 144050, mode: 'CW', notes: 'CW calling frequency' },
      { freq: 144100, mode: 'EME', notes: 'EME calling frequency (JT65)' },
      { freq: 144174, mode: 'Digital', notes: 'FT8 frequency' },
      { freq: 144200, mode: 'SSB', notes: 'SSB calling frequency' },
      { freq: 144390, mode: 'Data', notes: 'APRS frequency' },
      { freq: 145800, mode: 'Satellite', notes: 'ISS downlink' },
      { freq: 146520, mode: 'FM', notes: 'National simplex calling frequency' },
    ],
    notes: 'Most popular amateur VHF band worldwide.',
  },

  // 1.25 Meter Band (222-225 MHz)
  {
    id: '1.25m',
    name: '1.25 Meters',
    startFreq: 219000,
    endFreq: 225000,
    wavelengthMeters: 1.25,
    category: 'VHF',
    segments: [
      {
        startFreq: 219000,
        endFreq: 220000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['Digital', 'Data'],
        notes: 'Fixed digital message forwarding. Point-to-point only.',
      },
      {
        startFreq: 222000,
        endFreq: 222150,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'EME'],
        notes: 'Weak signal CW. EME operations.',
      },
      {
        startFreq: 222150,
        endFreq: 223380,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'SSB'],
        notes: 'Weak signal SSB.',
      },
      {
        startFreq: 223380,
        endFreq: 223520,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM simplex. 223.50 MHz is the calling frequency.',
      },
      {
        startFreq: 223520,
        endFreq: 224980,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater (input/output pairs with 1.6 MHz offset).',
      },
      {
        startFreq: 224980,
        endFreq: 225000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM simplex, links, control.',
      },
    ],
    callingFrequencies: [
      { freq: 222100, mode: 'CW', notes: 'CW calling frequency' },
      { freq: 222100, mode: 'SSB', notes: 'SSB calling frequency' },
      { freq: 223500, mode: 'FM', notes: 'FM simplex calling frequency' },
    ],
    notes: 'Limited equipment availability. Less crowded than 2m.',
  },

  // =============================================================================
  // UHF BANDS
  // =============================================================================

  // 70 Centimeter Band (420-450 MHz)
  {
    id: '70cm',
    name: '70 Centimeters',
    startFreq: 420000,
    endFreq: 450000,
    wavelengthMeters: 0.7,
    category: 'UHF',
    segments: [
      {
        startFreq: 420000,
        endFreq: 426000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['ATV', 'All'],
        notes: 'ATV and mixed modes. Shared with government radiolocation.',
      },
      {
        startFreq: 426000,
        endFreq: 432000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['ATV', 'All'],
        notes: 'ATV and auxiliary links.',
      },
      {
        startFreq: 432000,
        endFreq: 432100,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'EME'],
        notes: 'EME (Moonbounce) operations.',
      },
      {
        startFreq: 432100,
        endFreq: 433000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'SSB'],
        notes: 'Weak signal SSB/CW. EME activity.',
      },
      {
        startFreq: 433000,
        endFreq: 435000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['All'],
        notes: 'Auxiliary and control links.',
      },
      {
        startFreq: 435000,
        endFreq: 438000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['Satellite'],
        notes: 'Satellite uplinks and downlinks.',
      },
      {
        startFreq: 438000,
        endFreq: 440000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['ATV', 'All'],
        notes: 'ATV and repeater links.',
      },
      {
        startFreq: 440000,
        endFreq: 445000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater outputs (5 MHz offset standard).',
      },
      {
        startFreq: 445000,
        endFreq: 447000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM simplex.',
      },
      {
        startFreq: 447000,
        endFreq: 450000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater inputs.',
      },
    ],
    callingFrequencies: [
      { freq: 432100, mode: 'CW', notes: 'CW/SSB calling frequency' },
      { freq: 432065, mode: 'EME', notes: 'EME calling frequency' },
      { freq: 432174, mode: 'Digital', notes: 'FT8 frequency' },
      { freq: 446000, mode: 'FM', notes: 'National simplex calling frequency' },
    ],
    notes: 'Secondary to government radiolocation in some areas.',
  },

  // 33 Centimeter Band (902-928 MHz)
  {
    id: '33cm',
    name: '33 Centimeters',
    startFreq: 902000,
    endFreq: 928000,
    wavelengthMeters: 0.33,
    category: 'UHF',
    segments: [
      {
        startFreq: 902000,
        endFreq: 903000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'EME'],
        notes: 'Weak signal CW/EME.',
      },
      {
        startFreq: 903000,
        endFreq: 904000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'SSB'],
        notes: 'Weak signal SSB.',
      },
      {
        startFreq: 904000,
        endFreq: 906000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['All'],
        notes: 'Digital, packet, links.',
      },
      {
        startFreq: 906000,
        endFreq: 909000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater inputs.',
      },
      {
        startFreq: 909000,
        endFreq: 915000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['ATV', 'All'],
        notes: 'ATV and wideband experimental.',
      },
      {
        startFreq: 915000,
        endFreq: 918000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['All'],
        notes: 'ISM band overlap. Digital and experimental.',
      },
      {
        startFreq: 918000,
        endFreq: 921000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater outputs.',
      },
      {
        startFreq: 921000,
        endFreq: 928000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['All'],
        notes: 'ATV, data, experimental.',
      },
    ],
    callingFrequencies: [
      { freq: 903100, mode: 'CW', notes: 'CW calling frequency' },
      { freq: 903100, mode: 'SSB', notes: 'SSB calling frequency' },
      { freq: 906500, mode: 'FM', notes: 'FM simplex calling frequency' },
      { freq: 927500, mode: 'FM', notes: 'FM simplex alternate' },
    ],
    notes: 'Limited equipment availability. Secondary to ISM and radiolocation.',
  },

  // 23 Centimeter Band (1240-1300 MHz)
  {
    id: '23cm',
    name: '23 Centimeters',
    startFreq: 1240000,
    endFreq: 1300000,
    wavelengthMeters: 0.23,
    category: 'UHF',
    segments: [
      {
        startFreq: 1240000,
        endFreq: 1246000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['ATV', 'All'],
        notes: 'ATV and wide bandwidth modes.',
      },
      {
        startFreq: 1246000,
        endFreq: 1252000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater inputs (standard 12 MHz offset in some regions).',
      },
      {
        startFreq: 1252000,
        endFreq: 1258000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['ATV', 'All'],
        notes: 'ATV and digital.',
      },
      {
        startFreq: 1258000,
        endFreq: 1260000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater outputs (paired with 1246-1252).',
      },
      {
        startFreq: 1260000,
        endFreq: 1270000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['Satellite'],
        notes: 'Satellite uplinks.',
      },
      {
        startFreq: 1270000,
        endFreq: 1276000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater inputs.',
      },
      {
        startFreq: 1276000,
        endFreq: 1282000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['All'],
        notes: 'ATV and links.',
      },
      {
        startFreq: 1282000,
        endFreq: 1288000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM repeater outputs.',
      },
      {
        startFreq: 1288000,
        endFreq: 1294000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['All'],
        notes: 'Wide bandwidth experimental.',
      },
      {
        startFreq: 1294000,
        endFreq: 1295000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['FM'],
        notes: 'FM simplex.',
      },
      {
        startFreq: 1295000,
        endFreq: 1297000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['CW', 'SSB', 'EME'],
        notes: 'Narrowband/weak signal. EME activity.',
      },
      {
        startFreq: 1297000,
        endFreq: 1300000,
        licenseClasses: ['extra', 'advanced', 'general', 'technician'],
        modes: ['All'],
        notes: 'Wide bandwidth links and digital.',
      },
    ],
    callingFrequencies: [
      { freq: 1294500, mode: 'FM', notes: 'FM simplex calling frequency' },
      { freq: 1296100, mode: 'CW', notes: 'CW/SSB calling frequency' },
      { freq: 1296174, mode: 'Digital', notes: 'FT8 frequency' },
    ],
    notes: 'Shared with GPS. Limited equipment and antennas.',
  },
]

/**
 * Helper function to get band by ID
 */
export function getBandById(id: string): AmateurBand | undefined {
  return AMATEUR_BANDS.find((band) => band.id === id)
}

/**
 * Helper function to get all HF bands
 */
export function getHFBands(): AmateurBand[] {
  return AMATEUR_BANDS.filter((band) => band.category === 'HF')
}

/**
 * Helper function to get all VHF bands
 */
export function getVHFBands(): AmateurBand[] {
  return AMATEUR_BANDS.filter((band) => band.category === 'VHF')
}

/**
 * Helper function to get all UHF bands
 */
export function getUHFBands(): AmateurBand[] {
  return AMATEUR_BANDS.filter((band) => band.category === 'UHF')
}

/**
 * Helper function to find band containing a frequency
 */
export function findBandForFrequency(freqKHz: number): AmateurBand | undefined {
  return AMATEUR_BANDS.find((band) => freqKHz >= band.startFreq && freqKHz <= band.endFreq)
}

/**
 * Helper function to get segments available for a license class
 */
export function getSegmentsForLicense(
  band: AmateurBand,
  licenseClass: 'extra' | 'advanced' | 'general' | 'technician' | 'novice'
): BandSegment[] {
  return band.segments.filter((segment) => segment.licenseClasses.includes(licenseClass))
}

// Re-export the type for convenience
import type { BandSegment } from '@/types/spectrum'
export type { BandSegment }

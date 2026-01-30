/**
 * IC-7300 MK2 Control Definitions
 * Front panel controls and key functions for the Icom IC-7300 transceiver
 */

import type { RadioControl, RadioMode } from '@/types/radio'

export const IC7300_CONTROLS: RadioControl[] = [
  // Tuning Controls
  {
    id: 'main-dial',
    name: 'Main Dial',
    location: 'front-panel',
    category: 'tuning',
    description:
      'Large rotary dial for changing the operating frequency. Rotation speed affects tuning rate - faster rotation increases tuning steps.',
    examTips:
      'The main tuning dial is the primary frequency control. Know that modern transceivers use optical encoders for smooth tuning.',
  },
  {
    id: 'multi-function',
    name: 'Multi-Function Knob',
    location: 'front-panel',
    category: 'tuning',
    description:
      'Push-button rotary encoder that controls various functions depending on the current mode. Push to cycle through functions, rotate to adjust.',
    examTips:
      'Multi-function knobs are common on modern radios to reduce front panel clutter while providing access to many adjustments.',
  },
  {
    id: 'band-up',
    name: 'Band Up',
    location: 'front-panel',
    category: 'tuning',
    description:
      'Increases the operating band (e.g., from 40m to 30m). Quick access to change bands without menu navigation.',
    examTips:
      'Know the amateur band frequencies and their order. Band buttons provide quick QSY between bands.',
  },
  {
    id: 'band-down',
    name: 'Band Down',
    location: 'front-panel',
    category: 'tuning',
    description:
      'Decreases the operating band (e.g., from 20m to 40m). Quick access to change bands without menu navigation.',
  },
  {
    id: 'xit-rit',
    name: 'XIT/RIT',
    location: 'front-panel',
    category: 'tuning',
    description:
      'Receiver Incremental Tuning (RIT) shifts receive frequency without changing transmit. Transmitter Incremental Tuning (XIT) shifts transmit frequency without changing receive.',
    examTips:
      'RIT is commonly tested - it allows you to tune to a station that is slightly off frequency without changing your transmit frequency.',
  },

  // Audio Controls
  {
    id: 'af-gain',
    name: 'AF Gain',
    location: 'front-panel',
    category: 'audio',
    description:
      'Audio Frequency gain control. Adjusts the volume of the received audio to the speaker or headphones.',
    examTips:
      'AF gain controls audio output level. This is different from RF gain which controls receiver sensitivity.',
  },
  {
    id: 'rf-gain',
    name: 'RF Gain',
    location: 'front-panel',
    category: 'audio',
    description:
      'Radio Frequency gain control. Reduces receiver sensitivity to prevent overload from strong signals. Normally set to maximum unless strong signals cause distortion.',
    examTips:
      'RF gain should normally be at maximum. Reduce it when strong nearby signals cause receiver overload or intermodulation.',
  },
  {
    id: 'squelch',
    name: 'Squelch',
    location: 'front-panel',
    category: 'audio',
    description:
      'Mutes audio output when no signal is present. Threshold is adjusted to just silence background noise. Essential for FM operation.',
    examTips:
      'Squelch is especially important for FM. Set it to just quiet the noise - too high and you may miss weak signals.',
  },

  // Mode Controls
  {
    id: 'mode-ssb',
    name: 'SSB Mode',
    location: 'front-panel',
    category: 'mode',
    description:
      'Single Sideband mode selection. Press to toggle between USB (Upper Sideband) and LSB (Lower Sideband). USB is used above 10 MHz, LSB below.',
    examTips:
      'Know the convention: LSB on 160m, 80m, 40m; USB on 20m and above. 60m uses USB by FCC rule.',
  },
  {
    id: 'mode-cw',
    name: 'CW Mode',
    location: 'front-panel',
    category: 'mode',
    description:
      'Continuous Wave (Morse code) mode. Provides narrow filtering optimized for CW reception and enables sidetone for monitoring your keying.',
    examTips:
      'CW has the narrowest bandwidth of common modes, allowing more signals in a given spectrum space.',
  },
  {
    id: 'mode-rtty',
    name: 'RTTY/Data Mode',
    location: 'front-panel',
    category: 'mode',
    description:
      'Radioteletype and digital modes. Used for RTTY, PSK31, FT8, and other digital communications. Optimizes filtering and disables speech processing.',
    examTips:
      'Digital modes like FT8 use very narrow bandwidth and can work with weak signals. RTTY uses FSK modulation.',
  },
  {
    id: 'mode-am',
    name: 'AM Mode',
    location: 'front-panel',
    category: 'mode',
    description:
      'Amplitude Modulation mode. Carrier plus both sidebands. Used for broadcast reception and some amateur frequencies.',
    examTips:
      'AM uses more bandwidth than SSB (6 kHz vs 2.4 kHz typical). Less efficient but simpler receivers can demodulate it.',
  },
  {
    id: 'mode-fm',
    name: 'FM Mode',
    location: 'front-panel',
    category: 'mode',
    description:
      'Frequency Modulation mode. Common on VHF/UHF for local communications. Provides noise-free reception above threshold.',
    examTips:
      'FM has capture effect - the strongest signal dominates. Deviation is typically 5 kHz for amateur use.',
  },

  // Power Controls
  {
    id: 'power-button',
    name: 'Power',
    location: 'front-panel',
    category: 'power',
    description:
      'Main power switch. Press and hold to turn the transceiver on or off. LED indicates power status.',
  },
  {
    id: 'rf-power',
    name: 'RF Power',
    location: 'touchscreen',
    category: 'power',
    description:
      'Adjusts transmitter output power from 0 to 100 watts. Lower power reduces interference and saves energy when full power is not needed.',
    examTips:
      'FCC rules require using minimum power necessary. Reducing power can also reduce heat and extend component life.',
  },
  {
    id: 'tuner',
    name: 'Tuner',
    location: 'front-panel',
    category: 'power',
    description:
      'Activates the internal antenna tuner. Press briefly to enable/disable, hold to initiate tuning cycle. Matches antenna impedance for efficient power transfer.',
    examTips:
      'Antenna tuners match impedance to reduce reflected power (SWR). The IC-7300 internal tuner can match SWR up to about 3:1.',
  },

  // Filter Controls
  {
    id: 'filter-width',
    name: 'Filter Width',
    location: 'touchscreen',
    category: 'filter',
    description:
      'Adjusts IF filter bandwidth. Narrower filters reject adjacent interference but may affect audio quality. Wider filters provide better audio fidelity.',
    examTips:
      'Match filter width to mode: narrow for CW (250-500 Hz), medium for SSB (2.4 kHz), wide for AM/FM.',
  },
  {
    id: 'notch',
    name: 'Notch Filter',
    location: 'front-panel',
    category: 'filter',
    description:
      'Removes a narrow slice of frequencies to eliminate heterodyne interference (carriers/tones). Auto-notch automatically tracks and removes interfering tones.',
    examTips:
      'Notch filters are effective against single-frequency interference like carriers from other stations.',
  },
  {
    id: 'nr',
    name: 'Noise Reduction',
    location: 'front-panel',
    category: 'filter',
    description:
      'Digital Signal Processing (DSP) noise reduction. Reduces random noise while preserving voice signals. Adjustable intensity.',
    examTips:
      'DSP noise reduction works best on steady background noise. May affect signal quality if set too high.',
  },
  {
    id: 'nb',
    name: 'Noise Blanker',
    location: 'front-panel',
    category: 'filter',
    description:
      'Noise blanker for pulse-type interference (ignition noise, electrical arcing). Blanks the receiver during noise pulses.',
    examTips:
      'Noise blankers work on impulse noise (car ignition, electric fences). Different from noise reduction which handles random noise.',
  },

  // Memory Controls
  {
    id: 'memory-ch',
    name: 'Memory Channel',
    location: 'front-panel',
    category: 'memory',
    description:
      'Access stored memory channels. The IC-7300 can store 99 regular memories plus scan edges and call channels.',
  },
  {
    id: 'mw',
    name: 'Memory Write',
    location: 'front-panel',
    category: 'memory',
    description:
      'Writes current frequency, mode, and settings to the selected memory channel. Hold to save.',
  },

  // Display Controls
  {
    id: 'spectrum',
    name: 'Spectrum Scope',
    location: 'touchscreen',
    category: 'display',
    description:
      'Real-time spectrum display showing signals across a frequency range. Touch to QSY directly to displayed signals. The IC-7300 was revolutionary for including this in an HF transceiver.',
    examTips:
      'Spectrum displays help identify band activity and interference. The waterfall shows signal history over time.',
  },
]

export const IC7300_MODES: RadioMode[] = [
  {
    id: 'lsb',
    name: 'LSB',
    fullName: 'Lower Sideband',
    description:
      'Single sideband mode transmitting only the lower sideband. Carrier and upper sideband are suppressed.',
    typicalUse:
      'Voice communications on 160m, 80m, and 40m amateur bands (frequencies below 10 MHz)',
    bandwidth: '2.4 kHz',
  },
  {
    id: 'usb',
    name: 'USB',
    fullName: 'Upper Sideband',
    description:
      'Single sideband mode transmitting only the upper sideband. Carrier and lower sideband are suppressed.',
    typicalUse:
      'Voice communications on 20m and higher amateur bands (frequencies above 10 MHz), also 60m by FCC rule',
    bandwidth: '2.4 kHz',
  },
  {
    id: 'cw',
    name: 'CW',
    fullName: 'Continuous Wave',
    description:
      'On-off keying of a carrier for Morse code transmission. Most efficient mode for weak-signal work.',
    typicalUse:
      'Morse code communications, DX, contests, weak signal work, and emergency communications',
    bandwidth: '250-500 Hz',
  },
  {
    id: 'rtty',
    name: 'RTTY',
    fullName: 'Radioteletype',
    description:
      'Frequency Shift Keying (FSK) digital mode using two tones to represent mark and space.',
    typicalUse: 'Text-based digital communications, contests, and traffic handling',
    bandwidth: '250-500 Hz',
  },
  {
    id: 'am',
    name: 'AM',
    fullName: 'Amplitude Modulation',
    description:
      'Full carrier with both sidebands. Audio information encoded in carrier amplitude variations.',
    typicalUse: 'Broadcast reception, aviation monitoring, some 10m and 160m nets',
    bandwidth: '6 kHz',
  },
  {
    id: 'fm',
    name: 'FM',
    fullName: 'Frequency Modulation',
    description:
      'Audio information encoded as carrier frequency deviations. Provides noise-free reception above capture threshold.',
    typicalUse: 'VHF/UHF local communications, repeater operations, 10m FM simplex',
    bandwidth: '12-15 kHz',
  },
  {
    id: 'data',
    name: 'DATA',
    fullName: 'Data Mode',
    description: 'Optimized settings for digital modes with no speech processing or compression.',
    typicalUse: 'FT8, FT4, PSK31, JS8Call, WSPR, and other modern digital modes',
    bandwidth: '50 Hz - 3 kHz (varies by mode)',
  },
]

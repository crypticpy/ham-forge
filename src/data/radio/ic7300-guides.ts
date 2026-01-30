/**
 * IC-7300 Feature Guides
 * Comprehensive guides for key IC-7300 features with exam-relevant content
 */

export interface GuideStep {
  step: number
  instruction: string
  tip?: string
}

export interface FeatureGuide {
  id: string // e.g., 'spectrum', 'filters', 'memory', 'tuner'
  name: string
  description: string
  icon: string // lucide icon name
  sections: {
    id: string
    title: string
    content: string
    steps?: GuideStep[]
  }[]
  quickTips: string[]
  examRelevance: string[] // How this relates to exam topics
  relatedControlIds: string[] // IDs from ic7300-controls.ts
}

export const FEATURE_GUIDES: FeatureGuide[] = [
  // Spectrum Scope Guide
  {
    id: 'spectrum',
    name: 'Spectrum Scope & Waterfall',
    description:
      "Master the IC-7300's revolutionary real-time spectrum display and waterfall for visual band monitoring and quick tuning.",
    icon: 'activity',
    sections: [
      {
        id: 'spectrum-intro',
        title: 'What is a Spectrum Scope?',
        content:
          'A spectrum scope (also called a panadapter or bandscope) is a real-time display showing signal strength across a range of frequencies. The horizontal axis represents frequency, and the vertical axis shows signal amplitude. Unlike a traditional S-meter that shows only one frequency at a time, the spectrum scope lets you see all activity in a portion of the band simultaneously. The IC-7300 combines a spectrum scope with a waterfall display, which shows signal history over time as a scrolling colored image.',
      },
      {
        id: 'spectrum-revolutionary',
        title: 'Why the IC-7300 Was Revolutionary',
        content:
          'When Icom released the IC-7300 in 2016, it was the first affordable HF transceiver to include a built-in real-time spectrum scope and waterfall display. Previously, this feature was only available on high-end rigs costing $5,000+ or required external SDR equipment. The IC-7300 made visual band monitoring accessible to average hams at around $1,000, fundamentally changing how operators find and work stations. This democratization of technology represented a major advancement in amateur radio.',
      },
      {
        id: 'spectrum-reading',
        title: 'Reading the Display',
        content:
          'The spectrum display shows vertical spikes for each signal on the band. Taller spikes indicate stronger signals. The noise floor appears as the baseline - signals must rise above this to be readable. CW signals appear as thin, sharp spikes. SSB voice signals show wider, varying peaks that move with speech. FM signals appear as tall, relatively constant peaks. Digital modes like FT8 show thin, steady signals. The center line indicates your current receive frequency.',
        steps: [
          {
            step: 1,
            instruction: 'Look at the baseline level - this is your noise floor',
            tip: 'A lower noise floor means better receiving conditions',
          },
          {
            step: 2,
            instruction:
              'Identify signal types by their appearance: narrow spikes (CW), wider varying signals (SSB), constant peaks (FM/digital)',
          },
          {
            step: 3,
            instruction:
              'Note the relative height of signals above the noise floor - this corresponds to signal strength',
          },
          {
            step: 4,
            instruction:
              'Watch the waterfall for signal patterns over time - useful for identifying intermittent signals',
          },
        ],
      },
      {
        id: 'spectrum-touch-tune',
        title: 'Touch-to-Tune Feature',
        content:
          'One of the most powerful features of the IC-7300 spectrum scope is touch-to-tune. Simply tap on any signal visible in the spectrum display, and the radio instantly tunes to that frequency. This eliminates the need to manually spin the dial to find signals. You can quickly jump between stations, check out activity across the band, and respond to CQ calls faster than with traditional tuning methods.',
        steps: [
          {
            step: 1,
            instruction: 'Enable the spectrum scope by pressing SCOPE on the touchscreen',
          },
          {
            step: 2,
            instruction: 'Observe signals appearing on the display',
          },
          {
            step: 3,
            instruction: 'Tap directly on any signal spike you want to hear',
            tip: 'For SSB signals, tap slightly to the side to properly center on the carrier frequency',
          },
          {
            step: 4,
            instruction: 'Fine-tune with the main dial if needed for perfect zero-beat',
          },
        ],
      },
      {
        id: 'spectrum-span-ref',
        title: 'Span and Reference Level Adjustment',
        content:
          'The SPAN setting controls how much of the band is visible at once. Narrower spans (like +/-5 kHz) show more detail around your frequency but less band activity. Wider spans (like +/-100 kHz or more) show the whole band at once but with less resolution. The Reference Level (REF) controls the vertical position of the display - adjust it so your noise floor sits near the bottom with signals clearly visible above. Too high and signals get clipped; too low and you see only noise.',
        steps: [
          {
            step: 1,
            instruction: 'Touch the SPAN indicator on the screen',
          },
          {
            step: 2,
            instruction: 'Use the multi-function knob to adjust span width',
            tip: 'Start wide to see band activity, then narrow down when you find something interesting',
          },
          {
            step: 3,
            instruction: 'Adjust REF level so the noise floor is visible but not dominant',
          },
          {
            step: 4,
            instruction: 'Increase REF if strong signals are being clipped (flat-topped)',
          },
        ],
      },
      {
        id: 'spectrum-center-fixed',
        title: 'Center Mode vs Fixed Mode',
        content:
          'The spectrum scope can operate in two modes: Center mode and Fixed mode. In Center mode, your operating frequency is always in the center of the display, and the spectrum moves as you tune. This is ideal for exploring around your current QSO. In Fixed mode, the display edges stay at set frequencies, and a marker shows your current frequency. This is useful for monitoring a specific band segment, like the FT8 frequency or a net frequency, while tuning around.',
        steps: [
          {
            step: 1,
            instruction: 'Touch the scope mode indicator to switch between Center and Fixed',
          },
          {
            step: 2,
            instruction: 'In Center mode, tune the dial and watch the display scroll',
          },
          {
            step: 3,
            instruction: 'In Fixed mode, set edge frequencies to define your monitoring window',
            tip: 'Fixed mode is great for contest operation or monitoring calling frequencies',
          },
        ],
      },
      {
        id: 'spectrum-finding-activity',
        title: 'Using Waterfall to Find Activity',
        content:
          'The waterfall display is especially useful for finding activity on quiet bands. While the spectrum shows only the current moment, the waterfall shows a history of signals scrolling down the screen. Brief transmissions that you might miss on the spectrum leave visible traces on the waterfall. This is invaluable for weak-signal work and finding stations that transmit intermittently. Look for horizontal lines (steady signals) or dotted patterns (intermittent transmissions like CW or digital bursts).',
      },
    ],
    quickTips: [
      'Use wide span to survey band activity, narrow span for detailed tuning',
      'Tap directly on waterfall traces to tune to signals you see',
      'Lower the reference level in quiet conditions to see weak signals better',
      'Fixed mode is ideal for monitoring specific frequencies during contests',
      'The waterfall history helps find intermittent signals like beacons',
      'Adjust waterfall speed based on how fast conditions are changing',
      'Color intensity on the waterfall indicates signal strength',
    ],
    examRelevance: [
      'Spectrum analyzers and their use in identifying signals (General exam)',
      'Understanding signal bandwidth by visual inspection',
      'Identifying interference sources using spectrum displays',
      'SDR (Software Defined Radio) concepts and direct sampling receivers',
      'Recognizing different modulation types by their spectral characteristics',
    ],
    relatedControlIds: ['spectrum', 'main-dial', 'multi-function'],
  },

  // Filter Configuration Guide
  {
    id: 'filters',
    name: 'Filter Configuration',
    description:
      'Optimize reception by mastering IF filters, passband tuning, and noise reduction for different operating modes.',
    icon: 'sliders-horizontal',
    sections: [
      {
        id: 'filters-if-width',
        title: 'IF Filter Width Adjustment',
        content:
          'The Intermediate Frequency (IF) filter determines the bandwidth of signals that pass through your receiver. The IC-7300 uses DSP (Digital Signal Processing) to create adjustable IF filters. Narrower filters reject adjacent signals but may reduce audio fidelity. Wider filters provide better audio quality but let more interference through. The optimal width depends on your operating mode and band conditions.',
        steps: [
          {
            step: 1,
            instruction: 'Touch the filter width indicator on the screen',
          },
          {
            step: 2,
            instruction: 'Use the multi-function knob to adjust width',
            tip: 'Start wider and narrow down until interference is rejected',
          },
          {
            step: 3,
            instruction: 'For SSB, 2.4 kHz is standard; use 1.8-2.0 kHz in crowded conditions',
          },
          {
            step: 4,
            instruction: 'For CW, use 250-500 Hz depending on interference',
          },
        ],
      },
      {
        id: 'filters-shapes',
        title: 'Filter Shapes: Soft vs Sharp',
        content:
          'The IC-7300 offers different filter shapes. Sharp filters have steep skirts that quickly reject signals just outside the passband - excellent for crowded band conditions but can ring with CW signals. Soft filters have gradual rolloff that sounds more natural but provides less adjacent signal rejection. Most operators prefer sharp filters for contest conditions and soft filters for casual operation. The shape affects how quickly the filter transitions from pass to reject.',
      },
      {
        id: 'filters-twin-pbt',
        title: 'Twin PBT (Passband Tuning)',
        content:
          'Twin PBT (Passband Tuning) allows you to independently adjust the high and low edges of the IF filter passband. This is incredibly powerful for eliminating interference on one side of a signal. If you have QRM (interference) on the high side, you can shift the high cutoff down. If interference is on the low side, shift the low cutoff up. This effectively moves your filter window to exclude the interfering signal while keeping the desired signal centered.',
        steps: [
          {
            step: 1,
            instruction: 'Access PBT controls through the touchscreen filter menu',
          },
          {
            step: 2,
            instruction: 'Adjust PBT1 (low edge) to cut off low-frequency interference',
          },
          {
            step: 3,
            instruction: 'Adjust PBT2 (high edge) to cut off high-frequency interference',
            tip: 'Watch the filter shape indicator on the spectrum display as you adjust',
          },
          {
            step: 4,
            instruction: 'Double-tap to reset PBT to center position',
          },
        ],
      },
      {
        id: 'filters-when-narrow-wide',
        title: 'When to Use Narrow vs Wide Filters',
        content:
          'Use narrow filters when the band is crowded, during contests, or when interference is present. Narrow filters help separate closely-spaced signals. Use wider filters when the band is quiet and you want the best audio quality, or when the signal has broad modulation (like AM). For CW, 250-500 Hz is typical. For SSB, 2.4 kHz is standard but can go down to 1.8 kHz in contests. For AM, use 6-9 kHz. For FM, 10-15 kHz is normal.',
      },
      {
        id: 'filters-notch',
        title: 'Notch Filter for Interference',
        content:
          'The notch filter removes a narrow slice of frequencies from the passband. This is perfect for eliminating heterodynes - those annoying carriers or tones caused by other stations or interference. The IC-7300 has both manual notch (you set the frequency) and auto-notch (DSP automatically finds and tracks tones). Auto-notch is convenient but may briefly notch out part of the desired signal. Manual notch gives you precise control.',
        steps: [
          {
            step: 1,
            instruction: 'Press NOTCH on the front panel to enable the notch filter',
          },
          {
            step: 2,
            instruction: 'Select AUTO for automatic tone tracking or MANUAL for fixed notch',
          },
          {
            step: 3,
            instruction: 'For manual notch, adjust the notch frequency until the tone disappears',
            tip: 'Watch the spectrum display - you can see the notch as a dip in the passband',
          },
        ],
      },
      {
        id: 'filters-nr-nb',
        title: 'Noise Reduction (NR) vs Noise Blanker (NB)',
        content:
          'NR (Noise Reduction) and NB (Noise Blanker) serve different purposes. The Noise Blanker handles impulse noise - short, sharp spikes from ignition systems, electric fences, or switching power supplies. It briefly blanks the receiver during the pulse. Noise Reduction uses DSP to reduce random background noise (hiss, atmospheric noise) while preserving voice signals. Use NB for clicking/popping sounds, use NR for general hiss. They can be used together.',
        steps: [
          {
            step: 1,
            instruction: 'For impulse noise (clicks, pops), try NB first',
            tip: 'Start with NB at a low setting and increase until noise is reduced',
          },
          {
            step: 2,
            instruction: 'For steady hiss or atmospheric noise, enable NR',
          },
          {
            step: 3,
            instruction: 'Adjust NR level to balance noise reduction vs signal distortion',
            tip: 'Too much NR can make audio sound robotic or underwater',
          },
          {
            step: 4,
            instruction: 'NB can be used simultaneously with NR if you have multiple noise types',
          },
        ],
      },
      {
        id: 'filters-mode-matching',
        title: 'Matching Filter to Mode',
        content:
          'Each operating mode has optimal filter settings. CW benefits from very narrow filters (250-500 Hz) because the signal contains only a single tone. SSB voice needs 2.0-2.4 kHz to capture the full voice spectrum. AM broadcast uses 6-9 kHz for both sidebands plus carrier. FM requires 10-15 kHz for the deviation. Digital modes vary: FT8 can use very narrow filters (50-200 Hz) while RTTY typically uses 250-500 Hz. Matching the filter to the mode maximizes signal-to-noise ratio.',
      },
    ],
    quickTips: [
      'Start with default filter widths for each mode, then adjust based on conditions',
      'Twin PBT is more powerful than just narrowing the filter - it lets you shift the passband',
      'Auto-notch works well for steady tones but manual is better for precision',
      'NB for clicks and pops, NR for hiss - different tools for different noise types',
      'In crowded conditions, narrow the filter even if it reduces audio quality',
      'Sharp filter shapes are best for contests, soft shapes for casual operation',
      'Watch the filter shape on the spectrum display as you adjust settings',
    ],
    examRelevance: [
      'IF filter bandwidth and selectivity (General and Extra exams)',
      'DSP filtering concepts and digital signal processing',
      'Noise reduction techniques and their applications',
      'Interference rejection methods',
      'Understanding passband vs stopband and filter shape factors',
      'Difference between impulse noise (NB) and random noise (NR)',
    ],
    relatedControlIds: ['filter-width', 'notch', 'nr', 'nb', 'multi-function'],
  },

  // Memory Channel Programming Guide
  {
    id: 'memory',
    name: 'Memory Channel Programming',
    description:
      'Store and organize your favorite frequencies, configure memory groups, and use scanning features effectively.',
    icon: 'bookmark',
    sections: [
      {
        id: 'memory-what-stored',
        title: 'What Memory Channels Store',
        content:
          'Memory channels store much more than just a frequency. Each memory on the IC-7300 can save: operating frequency, operating mode (LSB, USB, CW, etc.), IF filter settings, tone settings for FM (CTCSS/DCS), an alphanumeric name (up to 10 characters), duplex offset for repeaters, and even RF power level. This means you can recall a complete operating configuration with a single memory channel selection, perfect for repeaters, nets, or favorite DX frequencies.',
      },
      {
        id: 'memory-how-save',
        title: 'How to Save a Memory',
        content:
          'Saving a memory channel captures your current operating settings to a specific memory location.',
        steps: [
          {
            step: 1,
            instruction:
              'Set up the radio exactly as you want to save it - frequency, mode, filter, tone if needed',
          },
          {
            step: 2,
            instruction: 'Press and hold the MW (Memory Write) button',
            tip: 'A long press is required to prevent accidental overwrites',
          },
          {
            step: 3,
            instruction: 'Select the memory channel number you want to use (01-99)',
          },
          {
            step: 4,
            instruction: 'Optionally enter a name for the channel using the touchscreen keyboard',
            tip: 'Names make it easy to identify channels - use call signs, net names, or frequencies',
          },
          {
            step: 5,
            instruction: 'Confirm the save - the memory is now stored',
          },
        ],
      },
      {
        id: 'memory-groups',
        title: 'Memory Groups and Organization',
        content:
          'The IC-7300 provides memory groups (sometimes called banks) to help organize your channels. You might use one group for local repeaters, another for HF nets, another for digital mode frequencies, and so on. Group organization makes it easier to find relevant memories and enables group-based scanning. Take time to plan your memory organization before programming many channels - it pays off in daily operation.',
      },
      {
        id: 'memory-scan',
        title: 'Scan Functions',
        content:
          'The IC-7300 offers several scan modes. Memory Scan cycles through programmed memory channels, stopping on active signals. You can skip certain memories during scan. Programmed Scan sweeps between two frequency limits you define (scan edges), useful for monitoring a band segment. Priority scan periodically checks a priority channel while scanning others. Select scan monitors only selected memories from a group.',
        steps: [
          {
            step: 1,
            instruction:
              'Enter memory mode by pressing the appropriate button or touching the screen',
          },
          {
            step: 2,
            instruction: 'Press SCAN to start scanning through memories',
          },
          {
            step: 3,
            instruction:
              'The scan will pause on channels with activity (signal above squelch threshold)',
          },
          {
            step: 4,
            instruction: 'Press SCAN again or touch the screen to resume scanning',
            tip: 'Set squelch just above the noise floor for proper scan operation',
          },
        ],
      },
      {
        id: 'memory-call',
        title: 'Call Channels and Quick Access',
        content:
          'Call channels are special memories designed for quick access to frequently-used frequencies. Unlike regular memories, call channels can typically be accessed with a single button press or minimal navigation. On the IC-7300, call channels are perfect for your most-used frequencies like your local repeater, club net frequency, or favorite DX hangout. Program your call channel to the frequency you use most often.',
      },
      {
        id: 'memory-backup',
        title: 'Memory Backup and Restore',
        content:
          'The IC-7300 can backup all memories and settings to a microSD card. This is invaluable for several reasons: protecting against memory loss, transferring settings to another IC-7300, or creating different configurations for different situations (home vs portable). The CS-7300 programming software can also save and restore memories via USB. Always maintain a backup of your programming - it represents significant time investment.',
        steps: [
          {
            step: 1,
            instruction: 'Insert a microSD card into the IC-7300 slot',
          },
          {
            step: 2,
            instruction: 'Navigate to Menu > SD Card > Save Setting',
          },
          {
            step: 3,
            instruction: 'Select a descriptive filename for your backup',
            tip: 'Include the date in the filename for easier tracking',
          },
          {
            step: 4,
            instruction: 'Confirm the save - all settings including memories are backed up',
          },
          {
            step: 5,
            instruction: 'To restore, use Menu > SD Card > Load Setting',
          },
        ],
      },
    ],
    quickTips: [
      'Name your memories with call signs, net names, or other descriptive labels',
      'Organize memories into logical groups before you start programming',
      'Back up your memories regularly to microSD card',
      'Use call channels for your most frequently accessed frequencies',
      'Set appropriate squelch for scan operation - too loose and scan never stops',
      'Program repeater memories with offset and tone already configured',
      'Keep a written or spreadsheet log of your memory programming',
    ],
    examRelevance: [
      'Memory channel operation and benefits (Technician exam)',
      'Repeater offset and tone programming concepts',
      'Scanning techniques for finding activity',
      'Proper squelch adjustment for FM and scan operation',
      'CTCSS and DCS tone squelch purpose and operation',
    ],
    relatedControlIds: ['memory-ch', 'mw', 'squelch'],
  },

  // Antenna Tuner Guide
  {
    id: 'tuner',
    name: 'Antenna Tuner Operation',
    description:
      "Understand impedance matching, SWR limits, and proper use of the IC-7300's internal antenna tuner for efficient power transfer.",
    icon: 'radio',
    sections: [
      {
        id: 'tuner-what-does',
        title: 'What an Antenna Tuner Does',
        content:
          'An antenna tuner (also called an antenna coupler or ATU - Automatic Tuning Unit) transforms the impedance seen at the feedline to match your transmitter\'s expected 50 ohms. Most transmitters, including the IC-7300, are designed to work into a 50-ohm load. When your antenna system presents a different impedance, power is reflected back instead of being radiated. The tuner uses adjustable inductance and capacitance to create an impedance transformation that makes the transmitter "see" 50 ohms. This allows maximum power transfer to the antenna system.',
      },
      {
        id: 'tuner-when-use',
        title: 'When to Use the Internal Tuner',
        content:
          "Use the internal tuner when your antenna's SWR is higher than ideal but within the tuner's range. The IC-7300 internal tuner can typically match loads up to about 3:1 SWR. If your antenna shows 1.5:1 to 3:1 on some frequencies, the tuner can bring it down to near 1:1. This is especially useful for antennas that cover multiple bands (where they may not be resonant on all bands) or when operating slightly outside an antenna's optimum frequency range. A properly resonant antenna with low SWR doesn't need a tuner.",
      },
      {
        id: 'tuner-swr-limits',
        title: 'SWR Limits and Tuner Range',
        content:
          "The IC-7300 internal tuner works within certain SWR limits - typically up to about 3:1. Above this ratio, the tuner cannot find a valid match and will indicate a failure or continue searching. High SWR puts stress on the tuner components and reduces efficiency. If your antenna shows greater than 3:1 SWR, you need to either fix the antenna, use a more capable external tuner, or accept reduced power. Never try to force a tune on a very high SWR load - it can damage the tuner and the transmitter's final amplifier.",
      },
      {
        id: 'tuner-auto-manual',
        title: 'Auto-Tune vs Manual Tune',
        content:
          'The IC-7300 offers automatic tuning. Press and hold the TUNER button to initiate an automatic tuning cycle. The radio briefly transmits a carrier while the tuner searches for the best match. When found, tuning stops and the TUNER indicator shows the tuner is engaged. The radio remembers tuning settings per frequency segment, so once tuned, it may not need to retune when you return to that frequency. For bands where your antenna is already well-matched, you can disable the tuner to bypass it entirely.',
        steps: [
          {
            step: 1,
            instruction:
              'Ensure the antenna is connected and the band is clear for a brief transmission',
          },
          {
            step: 2,
            instruction: 'Set power to around 10-50 watts for tuning (not full power)',
            tip: 'Lower power is gentler on the tuner and transmitter during the matching process',
          },
          {
            step: 3,
            instruction: 'Press and hold the TUNER button to start the tuning cycle',
          },
          {
            step: 4,
            instruction: 'Wait for tuning to complete - watch the SWR meter drop',
          },
          {
            step: 5,
            instruction: 'The TUNER indicator lights when a match is achieved and engaged',
          },
        ],
      },
      {
        id: 'tuner-memory-tune',
        title: 'Memory Tune Feature',
        content:
          "The IC-7300 stores tuner settings for different frequencies in tuner memory. Once you tune on a particular frequency, the radio remembers the inductor and capacitor settings used. When you return to that frequency (or nearby), the tuner can quickly recall those settings without going through a full tuning cycle. This makes band-hopping much faster. The tuner memory is automatic - you don't need to manually save anything. Just be aware that antenna changes or significant frequency shifts may require a new tune.",
      },
      {
        id: 'tuner-when-not-use',
        title: 'When NOT to Use a Tuner',
        content:
          "A tuner is not always the answer. First, a tuner does NOT make your antenna work better - it only makes the transmitter see a better load. Losses in the feedline before the tuner are not recovered. If your antenna has high SWR due to a problem (broken connection, wrong length, bad balun), fix the problem rather than masking it with a tuner. Second, if your SWR is already low (under 1.5:1), a tuner adds complexity with no benefit. Third, if SWR is extremely high (greater than 10:1), don't try to tune it - find and fix the problem. A tuner compensates for moderate mismatch, not fundamental antenna failures.",
      },
      {
        id: 'tuner-external-vs-internal',
        title: 'External Tuner vs Internal',
        content:
          "Internal tuners like the IC-7300's are convenient but have limited matching range (typically 3:1 maximum). External automatic tuners often handle wider mismatches (10:1 or higher) and can match more challenging loads. External tuners can be placed at the antenna feedpoint, which is more efficient because it minimizes lossy mismatch on the feedline. Internal tuners are at the radio end, so feedline losses at high SWR still occur. For multi-band wire antennas or random wires, an external tuner may be necessary. For dipoles and resonant antennas with moderate mismatch, the internal tuner works well.",
      },
    ],
    quickTips: [
      "The tuner makes the transmitter happy, but doesn't improve the antenna",
      'Use reduced power (10-50W) when initiating a tuning cycle',
      'If tuning fails, check antenna connections before trying again',
      'Internal tuner range is about 3:1 SWR maximum',
      'Tuner memory speeds up band changes - no need to retune each time',
      'A tuner cannot compensate for a broken or severely mismatched antenna',
      'For random wire or end-fed antennas, an external tuner may work better',
      'Low SWR without a tuner is always better than low SWR with a tuner',
    ],
    examRelevance: [
      'Antenna matching and SWR concepts (Technician, General, and Extra exams)',
      'Standing Wave Ratio and its measurement',
      'Impedance matching networks (L, T, and Pi networks)',
      'Transmission line losses and their relationship to SWR',
      'What a tuner can and cannot do (common exam question)',
      "Feedline loss increases with SWR - tuner at radio doesn't fix this",
      'Difference between antenna tuner and antenna matching at the feedpoint',
    ],
    relatedControlIds: ['tuner', 'rf-power'],
  },
]

/**
 * Get a feature guide by its ID
 */
export function getFeatureGuide(guideId: string): FeatureGuide | undefined {
  return FEATURE_GUIDES.find((guide) => guide.id === guideId)
}

/**
 * Get all feature guides that relate to a specific control
 */
export function getFeatureGuidesByControlId(controlId: string): FeatureGuide[] {
  return FEATURE_GUIDES.filter((guide) => guide.relatedControlIds.includes(controlId))
}

/**
 * Get all feature guides
 */
export function getAllFeatureGuides(): FeatureGuide[] {
  return FEATURE_GUIDES
}

/**
 * IC-7300 Menu Hierarchy Data
 * Complete menu structure for the Icom IC-7300 transceiver
 * Includes recommended settings for new operators and exam-relevant items
 */

/**
 * Represents a menu item in the IC-7300 menu system
 * This interface will be moved to types/radio.ts in a future refactor
 */
export interface MenuItem {
  /** Unique identifier for the menu item */
  id: string
  /** Display name of the menu item */
  name: string
  /** Breadcrumb path to this item (e.g., ['SET', 'Display']) */
  path: string[]
  /** Detailed description of what this setting does */
  description: string
  /** Factory default value */
  defaultValue?: string
  /** Recommended value for new ham radio operators */
  recommendedValue?: string
  /** Whether this setting is relevant to ham radio license exams */
  examRelevant?: boolean
  /** Tips related to exam questions */
  examTips?: string
  /** Child menu items */
  children?: MenuItem[]
}

/**
 * IC-7300 Main Menu Tree
 * Organized by top-level menu categories: SET, CONNECTORS, FUNCTION, OTHERS
 */
export const IC7300_MENU_TREE: MenuItem[] = [
  // ============================================================
  // SET Menu - Display and audio configuration
  // ============================================================
  {
    id: 'set',
    name: 'SET',
    path: ['SET'],
    description: 'Configuration settings for display, tones, and general transceiver behavior.',
    children: [
      {
        id: 'set-display',
        name: 'Display',
        path: ['SET', 'Display'],
        description: 'Configure display appearance, colors, and brightness settings.',
        children: [
          {
            id: 'set-display-brightness',
            name: 'LCD Brightness',
            path: ['SET', 'Display', 'LCD Brightness'],
            description:
              'Adjusts the brightness of the touchscreen LCD. Higher values improve visibility in bright conditions but increase power consumption.',
            defaultValue: '50%',
            recommendedValue: '50%',
          },
          {
            id: 'set-display-contrast',
            name: 'LCD Contrast',
            path: ['SET', 'Display', 'LCD Contrast'],
            description: 'Adjusts the contrast ratio of the LCD display for optimal readability.',
            defaultValue: '50%',
            recommendedValue: '50%',
          },
          {
            id: 'set-display-backlight',
            name: 'Backlight',
            path: ['SET', 'Display', 'Backlight'],
            description:
              'Controls the LED backlight intensity. Can be set to auto-dim after a period of inactivity.',
            defaultValue: 'ON',
            recommendedValue: 'ON',
          },
          {
            id: 'set-display-color',
            name: 'Display Color',
            path: ['SET', 'Display', 'Display Color'],
            description:
              'Selects the color scheme for the spectrum scope and waterfall display. Multiple preset options available.',
            defaultValue: 'Standard',
          },
          {
            id: 'set-display-waterfall-speed',
            name: 'Waterfall Speed',
            path: ['SET', 'Display', 'Waterfall Speed'],
            description:
              'Controls how fast the waterfall display scrolls. Faster speeds show more recent signal activity.',
            defaultValue: 'MID',
            recommendedValue: 'MID',
          },
          {
            id: 'set-display-scope-span',
            name: 'Scope Span',
            path: ['SET', 'Display', 'Scope Span'],
            description:
              'Sets the default frequency span shown on the spectrum scope (e.g., +/-25 kHz, +/-50 kHz, +/-100 kHz).',
            defaultValue: '+/-50 kHz',
            recommendedValue: '+/-100 kHz',
            examRelevant: true,
            examTips:
              'Spectrum displays help identify band activity and adjacent channel interference.',
          },
        ],
      },
      {
        id: 'set-tone-control',
        name: 'Tone Control',
        path: ['SET', 'Tone Control'],
        description: 'Configure audio tone characteristics for receive and transmit.',
        children: [
          {
            id: 'set-tone-ssb-rx',
            name: 'SSB RX Tone',
            path: ['SET', 'Tone Control', 'SSB RX Tone'],
            description:
              'Adjusts bass and treble for received SSB audio. Helps optimize voice clarity.',
            defaultValue: 'Bass: 0, Treble: 0',
            recommendedValue: 'Bass: 0, Treble: +2',
          },
          {
            id: 'set-tone-ssb-tx',
            name: 'SSB TX Tone',
            path: ['SET', 'Tone Control', 'SSB TX Tone'],
            description:
              'Adjusts bass and treble for transmitted SSB audio. Proper adjustment improves intelligibility.',
            defaultValue: 'Bass: 0, Treble: 0',
            examRelevant: true,
            examTips:
              'Proper transmit audio adjustment is important for clear communications. Too much bass causes muddy audio.',
          },
          {
            id: 'set-tone-cw-rx',
            name: 'CW RX Tone',
            path: ['SET', 'Tone Control', 'CW RX Tone'],
            description:
              'Sets the pitch of the CW sidetone and received CW signals. Common values are 600-800 Hz.',
            defaultValue: '600 Hz',
            recommendedValue: '700 Hz',
          },
        ],
      },
      {
        id: 'set-beep',
        name: 'Beep',
        path: ['SET', 'Beep'],
        description: 'Configure key press confirmation beeps and alerts.',
        children: [
          {
            id: 'set-beep-level',
            name: 'Beep Level',
            path: ['SET', 'Beep', 'Beep Level'],
            description: 'Sets the volume of confirmation beeps when buttons are pressed.',
            defaultValue: '50%',
            recommendedValue: '30%',
          },
          {
            id: 'set-beep-limit',
            name: 'Beep Limit',
            path: ['SET', 'Beep', 'Beep Limit'],
            description:
              'Enables an audible warning when the band edge is approached during tuning.',
            defaultValue: 'ON',
            recommendedValue: 'ON',
            examRelevant: true,
            examTips:
              'Band edge warnings help prevent out-of-band transmissions, which violate FCC regulations.',
          },
          {
            id: 'set-beep-swr',
            name: 'SWR Warning',
            path: ['SET', 'Beep', 'SWR Warning'],
            description:
              'Alerts when SWR exceeds a threshold during transmission. High SWR can damage the transmitter.',
            defaultValue: 'ON',
            recommendedValue: 'ON',
            examRelevant: true,
            examTips:
              'High SWR indicates impedance mismatch. Extended operation with high SWR can damage final amplifier transistors.',
          },
        ],
      },
      {
        id: 'set-time',
        name: 'Time Set',
        path: ['SET', 'Time Set'],
        description: 'Configure the internal clock for logging and scheduling.',
        children: [
          {
            id: 'set-time-utc',
            name: 'UTC Offset',
            path: ['SET', 'Time Set', 'UTC Offset'],
            description:
              'Sets the offset from UTC (Coordinated Universal Time). Important for accurate logging.',
            defaultValue: '+0:00',
            examRelevant: true,
            examTips:
              'Ham radio operators typically log contacts in UTC time to avoid confusion across time zones.',
          },
          {
            id: 'set-time-date',
            name: 'Date/Time',
            path: ['SET', 'Time Set', 'Date/Time'],
            description: 'Sets the current date and time. Used for logging and memory timestamps.',
            defaultValue: 'N/A',
          },
        ],
      },
      {
        id: 'set-rf-power',
        name: 'RF Power',
        path: ['SET', 'RF Power'],
        description: 'Default RF power output settings.',
        children: [
          {
            id: 'set-rf-power-default',
            name: 'Power Level',
            path: ['SET', 'RF Power', 'Power Level'],
            description:
              'Sets the default transmit power level. Can be set per-band or globally. Max 100W.',
            defaultValue: '100W',
            recommendedValue: '50W',
            examRelevant: true,
            examTips:
              'FCC Part 97 requires using the minimum power necessary to maintain communication. Start lower and increase if needed.',
          },
        ],
      },
      {
        id: 'set-meter',
        name: 'Meter',
        path: ['SET', 'Meter'],
        description: 'Configure meter display preferences.',
        children: [
          {
            id: 'set-meter-type',
            name: 'Meter Type',
            path: ['SET', 'Meter', 'Meter Type'],
            description:
              'Selects what the transmit meter displays: Power output, SWR, ALC, COMP, VD, or ID.',
            defaultValue: 'PO (Power Output)',
            recommendedValue: 'SWR',
            examRelevant: true,
            examTips:
              'Understanding meter readings: SWR shows antenna match, ALC indicates proper drive level, VD/ID show power supply health.',
          },
        ],
      },
    ],
  },

  // ============================================================
  // CONNECTORS Menu - External connection configuration
  // ============================================================
  {
    id: 'connectors',
    name: 'CONNECTORS',
    path: ['CONNECTORS'],
    description:
      'Configuration for external connections including USB, CI-V, and audio interfaces.',
    children: [
      {
        id: 'connectors-usb',
        name: 'USB',
        path: ['CONNECTORS', 'USB'],
        description: 'USB connection settings for computer interfacing.',
        children: [
          {
            id: 'connectors-usb-send',
            name: 'USB Send',
            path: ['CONNECTORS', 'USB', 'USB Send'],
            description:
              'Selects which audio is sent to the computer via USB. Options include AF (audio frequency) output.',
            defaultValue: 'OFF',
            recommendedValue: 'OFF',
          },
          {
            id: 'connectors-usb-mod',
            name: 'USB MOD Level',
            path: ['CONNECTORS', 'USB', 'USB MOD Level'],
            description:
              'Sets the audio input level from the computer for digital modes. Adjust to prevent ALC activation.',
            defaultValue: '50%',
            recommendedValue: '50%',
            examRelevant: true,
            examTips:
              'For digital modes like FT8, audio levels should be set so ALC does not activate (no ALC meter movement).',
          },
          {
            id: 'connectors-usb-af',
            name: 'USB AF Level',
            path: ['CONNECTORS', 'USB', 'USB AF Level'],
            description:
              'Sets the audio output level to the computer. Adjust for proper receive audio in logging/digital software.',
            defaultValue: '50%',
          },
          {
            id: 'connectors-usb-keying',
            name: 'USB Keying',
            path: ['CONNECTORS', 'USB', 'USB Keying'],
            description:
              'Enables PTT and CW keying through USB DTR/RTS signals. Required for computer-controlled transmission.',
            defaultValue: 'OFF',
            recommendedValue: 'DTR',
          },
        ],
      },
      {
        id: 'connectors-civ',
        name: 'CI-V',
        path: ['CONNECTORS', 'CI-V'],
        description: 'CI-V (Computer Interface V) settings for CAT control and rig interfacing.',
        children: [
          {
            id: 'connectors-civ-address',
            name: 'CI-V Address',
            path: ['CONNECTORS', 'CI-V', 'CI-V Address'],
            description:
              'Sets the CI-V address for this radio. Default is 94h. Multiple radios need unique addresses.',
            defaultValue: '94h',
            examRelevant: true,
            examTips:
              "CI-V is Icom's CAT (Computer Aided Transceiver) protocol for remote control and logging software.",
          },
          {
            id: 'connectors-civ-baud',
            name: 'CI-V Baud Rate',
            path: ['CONNECTORS', 'CI-V', 'CI-V Baud Rate'],
            description:
              'Sets the communication speed for CI-V. Higher speeds enable faster updates. 19200 baud is common.',
            defaultValue: '19200',
            recommendedValue: '19200',
          },
          {
            id: 'connectors-civ-transceive',
            name: 'CI-V Transceive',
            path: ['CONNECTORS', 'CI-V', 'CI-V Transceive'],
            description:
              'When ON, the radio automatically sends status updates when settings change. Required by some software.',
            defaultValue: 'ON',
            recommendedValue: 'ON',
          },
          {
            id: 'connectors-civ-usb',
            name: 'CI-V USB',
            path: ['CONNECTORS', 'CI-V', 'CI-V USB'],
            description:
              'Routes CI-V data through the USB port instead of the rear panel CI-V jack.',
            defaultValue: 'Unlink',
            recommendedValue: 'Link',
          },
        ],
      },
      {
        id: 'connectors-acc',
        name: 'ACC',
        path: ['CONNECTORS', 'ACC'],
        description: 'Accessory connector settings for external devices like TNCs and amplifiers.',
        children: [
          {
            id: 'connectors-acc-mod',
            name: 'ACC MOD Level',
            path: ['CONNECTORS', 'ACC', 'ACC MOD Level'],
            description: 'Sets the audio input level from devices connected to the ACC socket.',
            defaultValue: '50%',
          },
          {
            id: 'connectors-acc-af',
            name: 'ACC AF Level',
            path: ['CONNECTORS', 'ACC', 'ACC AF Level'],
            description: 'Sets the audio output level to devices connected to the ACC socket.',
            defaultValue: '50%',
          },
        ],
      },
      {
        id: 'connectors-speaker',
        name: 'External Speaker',
        path: ['CONNECTORS', 'External Speaker'],
        description: 'External speaker output configuration.',
        children: [
          {
            id: 'connectors-speaker-output',
            name: 'Speaker Output',
            path: ['CONNECTORS', 'External Speaker', 'Speaker Output'],
            description:
              'Selects audio routing: internal speaker only, external speaker only, or both.',
            defaultValue: 'Internal + External',
          },
        ],
      },
      {
        id: 'connectors-ref',
        name: 'REF',
        path: ['CONNECTORS', 'REF'],
        description: 'Reference oscillator settings for frequency accuracy.',
        children: [
          {
            id: 'connectors-ref-adjust',
            name: 'REF Adjust',
            path: ['CONNECTORS', 'REF', 'REF Adjust'],
            description:
              'Fine-tunes the internal reference oscillator for frequency accuracy. Compare against WWV or GPSDO.',
            defaultValue: '0',
            examRelevant: true,
            examTips:
              'WWV broadcasts on 5, 10, 15, and 20 MHz with highly accurate carrier frequencies for calibration.',
          },
        ],
      },
    ],
  },

  // ============================================================
  // FUNCTION Menu - Operating function settings
  // ============================================================
  {
    id: 'function',
    name: 'FUNCTION',
    path: ['FUNCTION'],
    description:
      'Operating function settings including tuning steps, dial behavior, and key assignments.',
    children: [
      {
        id: 'function-tuning',
        name: 'Tuning',
        path: ['FUNCTION', 'Tuning'],
        description: 'Tuning dial and frequency step settings.',
        children: [
          {
            id: 'function-tuning-step',
            name: 'Tuning Step',
            path: ['FUNCTION', 'Tuning', 'Tuning Step'],
            description:
              'Sets the frequency increment per dial click. Common values: 10 Hz for CW, 100 Hz for SSB, 5/10 kHz for FM.',
            defaultValue: '1 kHz',
            recommendedValue: '100 Hz (SSB), 10 Hz (CW)',
            examRelevant: true,
            examTips:
              'Smaller tuning steps provide finer control. CW and digital modes often require 10 Hz steps.',
          },
          {
            id: 'function-tuning-speed',
            name: 'Dial Speed',
            path: ['FUNCTION', 'Tuning', 'Dial Speed'],
            description:
              'Controls the tuning acceleration. Faster dial rotation increases the tuning rate.',
            defaultValue: 'ON',
            recommendedValue: 'ON',
          },
          {
            id: 'function-tuning-fast',
            name: 'Quick Tuning',
            path: ['FUNCTION', 'Tuning', 'Quick Tuning'],
            description:
              'Enables 10x faster tuning when the FAST button is pressed. Useful for quickly moving across bands.',
            defaultValue: 'ON',
          },
        ],
      },
      {
        id: 'function-multi',
        name: 'Multi-Function',
        path: ['FUNCTION', 'Multi-Function'],
        description: 'Multi-function knob assignment and behavior.',
        children: [
          {
            id: 'function-multi-assign',
            name: 'Multi Assignment',
            path: ['FUNCTION', 'Multi-Function', 'Multi Assignment'],
            description:
              'Assigns which parameters the multi-function knob controls: Filter width, PBT, Notch, RF Gain, SQL, etc.',
            defaultValue: 'Filter/PBT/Notch',
            examRelevant: true,
            examTips:
              'The multi-function knob typically controls IF filter width and passband tuning for interference rejection.',
          },
        ],
      },
      {
        id: 'function-cw',
        name: 'CW',
        path: ['FUNCTION', 'CW'],
        description: 'Morse code operation settings.',
        children: [
          {
            id: 'function-cw-pitch',
            name: 'CW Pitch',
            path: ['FUNCTION', 'CW', 'CW Pitch'],
            description:
              'Sets the received CW tone pitch. Most operators prefer 600-800 Hz. Affects sidetone frequency.',
            defaultValue: '600 Hz',
            recommendedValue: '700 Hz',
            examRelevant: true,
            examTips:
              'CW sidetone lets you hear your own keying. Pitch is a personal preference but should match your beat frequency offset.',
          },
          {
            id: 'function-cw-key-type',
            name: 'Key Type',
            path: ['FUNCTION', 'CW', 'Key Type'],
            description:
              'Selects the key type: Straight key, Bug, Paddle (Iambic A/B), or External keyer.',
            defaultValue: 'Paddle',
            examRelevant: true,
            examTips:
              'Iambic keying uses a dual-lever paddle. Iambic A and B differ in how squeeze keying ends.',
          },
          {
            id: 'function-cw-speed',
            name: 'Keyer Speed',
            path: ['FUNCTION', 'CW', 'Keyer Speed'],
            description:
              'Sets the internal keyer speed in WPM (words per minute). Adjustable from 6-48 WPM.',
            defaultValue: '12 WPM',
            recommendedValue: '15 WPM',
          },
          {
            id: 'function-cw-qsk',
            name: 'QSK',
            path: ['FUNCTION', 'CW', 'QSK'],
            description:
              'Full break-in (QSK) allows hearing between transmitted elements. Semi break-in has a delay.',
            defaultValue: 'Semi',
            recommendedValue: 'Semi',
            examRelevant: true,
            examTips:
              'Full QSK lets you hear the other station immediately when you stop keying. Requires fast T/R switching.',
          },
          {
            id: 'function-cw-sidetone',
            name: 'Sidetone Level',
            path: ['FUNCTION', 'CW', 'Sidetone Level'],
            description: 'Sets the volume of the sidetone - the audio feedback of your keying.',
            defaultValue: '50%',
          },
        ],
      },
      {
        id: 'function-ssb',
        name: 'SSB',
        path: ['FUNCTION', 'SSB'],
        description: 'Single sideband voice operation settings.',
        children: [
          {
            id: 'function-ssb-filter',
            name: 'SSB Filter',
            path: ['FUNCTION', 'SSB', 'SSB Filter'],
            description: 'Default IF filter bandwidth for SSB. Typical range is 1.8 to 3.0 kHz.',
            defaultValue: '2.4 kHz',
            recommendedValue: '2.4 kHz',
            examRelevant: true,
            examTips:
              'SSB voice typically needs 2.4 kHz bandwidth. Narrower filters improve selectivity but reduce audio quality.',
          },
          {
            id: 'function-ssb-tx-bw',
            name: 'TX Bandwidth',
            path: ['FUNCTION', 'SSB', 'TX Bandwidth'],
            description:
              'Sets the transmitted audio bandwidth. Wider sounds better but uses more spectrum.',
            defaultValue: '100-2900 Hz',
            examRelevant: true,
            examTips:
              'Transmitted bandwidth affects signal quality and occupied spectrum. Contest stations often use narrower TX BW.',
          },
          {
            id: 'function-ssb-comp',
            name: 'Compression',
            path: ['FUNCTION', 'SSB', 'Compression'],
            description:
              'RF speech compression increases average power by reducing dynamic range. Improves readability but can cause distortion if overused.',
            defaultValue: 'OFF',
            examRelevant: true,
            examTips:
              'Speech compression raises average power but too much causes splatter and distortion. Monitor with ALC and compression meter.',
          },
        ],
      },
      {
        id: 'function-data',
        name: 'DATA',
        path: ['FUNCTION', 'DATA'],
        description: 'Digital mode operation settings.',
        children: [
          {
            id: 'function-data-mode',
            name: 'DATA Mode',
            path: ['FUNCTION', 'DATA', 'DATA Mode'],
            description:
              'Selects the data mode type: RTTY, PSK, or generic DATA. Affects filter defaults and processing.',
            defaultValue: 'DATA',
            examRelevant: true,
            examTips:
              'Digital modes like FT8, PSK31, and RTTY use sound card interfaces. DATA mode disables speech processing.',
          },
          {
            id: 'function-data-filter',
            name: 'DATA Filter',
            path: ['FUNCTION', 'DATA', 'DATA Filter'],
            description:
              'Default filter width for digital modes. Narrow filters (50-500 Hz) are typical for most digital modes.',
            defaultValue: '500 Hz',
            recommendedValue: '500 Hz',
          },
        ],
      },
      {
        id: 'function-agc',
        name: 'AGC',
        path: ['FUNCTION', 'AGC'],
        description: 'Automatic Gain Control settings.',
        children: [
          {
            id: 'function-agc-fast',
            name: 'AGC Fast',
            path: ['FUNCTION', 'AGC', 'AGC Fast'],
            description:
              'Time constant for fast AGC. Shorter times track signal changes quickly but may pump on CW.',
            defaultValue: '0.1 sec',
            examRelevant: true,
            examTips:
              'AGC maintains consistent audio level. Fast AGC works well for SSB, slow AGC is better for CW to prevent pumping.',
          },
          {
            id: 'function-agc-mid',
            name: 'AGC Mid',
            path: ['FUNCTION', 'AGC', 'AGC Mid'],
            description: 'Time constant for medium AGC. General purpose setting.',
            defaultValue: '0.5 sec',
          },
          {
            id: 'function-agc-slow',
            name: 'AGC Slow',
            path: ['FUNCTION', 'AGC', 'AGC Slow'],
            description:
              'Time constant for slow AGC. Best for CW where constant gain prevents inter-element pumping.',
            defaultValue: '1.5 sec',
          },
        ],
      },
      {
        id: 'function-scan',
        name: 'Scan',
        path: ['FUNCTION', 'Scan'],
        description: 'Frequency and memory scanning settings.',
        children: [
          {
            id: 'function-scan-speed',
            name: 'Scan Speed',
            path: ['FUNCTION', 'Scan', 'Scan Speed'],
            description: 'Controls how fast frequencies are scanned when searching for activity.',
            defaultValue: 'MID',
          },
          {
            id: 'function-scan-resume',
            name: 'Scan Resume',
            path: ['FUNCTION', 'Scan', 'Scan Resume'],
            description:
              'Determines when scanning resumes after stopping on a signal: time delay or when signal drops.',
            defaultValue: '2 sec',
          },
        ],
      },
    ],
  },

  // ============================================================
  // OTHERS Menu - System functions and maintenance
  // ============================================================
  {
    id: 'others',
    name: 'OTHERS',
    path: ['OTHERS'],
    description:
      'System functions including information display, memory backup, and reset options.',
    children: [
      {
        id: 'others-info',
        name: 'Information',
        path: ['OTHERS', 'Information'],
        description: 'Display system information about the transceiver.',
        children: [
          {
            id: 'others-info-version',
            name: 'Firmware Version',
            path: ['OTHERS', 'Information', 'Firmware Version'],
            description: 'Displays the current firmware version. Check Icom website for updates.',
            defaultValue: 'N/A',
          },
          {
            id: 'others-info-mac',
            name: 'MAC Address',
            path: ['OTHERS', 'Information', 'MAC Address'],
            description: 'Shows the MAC address if the optional LAN module is installed.',
            defaultValue: 'N/A',
          },
        ],
      },
      {
        id: 'others-backup',
        name: 'Memory Backup',
        path: ['OTHERS', 'Memory Backup'],
        description: 'Save and restore radio settings.',
        children: [
          {
            id: 'others-backup-save',
            name: 'Save to SD',
            path: ['OTHERS', 'Memory Backup', 'Save to SD'],
            description:
              'Saves all settings, memories, and configurations to an SD card. Recommended before firmware updates.',
            defaultValue: 'N/A',
            recommendedValue: 'Do before firmware updates',
          },
          {
            id: 'others-backup-load',
            name: 'Load from SD',
            path: ['OTHERS', 'Memory Backup', 'Load from SD'],
            description: 'Restores settings, memories, and configurations from an SD card backup.',
            defaultValue: 'N/A',
          },
        ],
      },
      {
        id: 'others-reset',
        name: 'Reset',
        path: ['OTHERS', 'Reset'],
        description: 'Reset options to restore default settings.',
        children: [
          {
            id: 'others-reset-partial',
            name: 'Partial Reset',
            path: ['OTHERS', 'Reset', 'Partial Reset'],
            description: 'Resets operating settings but preserves memories and calibration data.',
            defaultValue: 'N/A',
          },
          {
            id: 'others-reset-all',
            name: 'All Reset',
            path: ['OTHERS', 'Reset', 'All Reset'],
            description:
              'Factory reset - restores ALL settings to defaults. Use caution: memories will be erased.',
            defaultValue: 'N/A',
          },
        ],
      },
      {
        id: 'others-sd-card',
        name: 'SD Card',
        path: ['OTHERS', 'SD Card'],
        description: 'SD card operations for recording and firmware updates.',
        children: [
          {
            id: 'others-sd-record',
            name: 'Record',
            path: ['OTHERS', 'SD Card', 'Record'],
            description:
              'Records received or transmitted audio to the SD card. Useful for reviewing QSOs.',
            defaultValue: 'OFF',
          },
          {
            id: 'others-sd-playback',
            name: 'Playback',
            path: ['OTHERS', 'SD Card', 'Playback'],
            description: 'Plays back audio recordings from the SD card.',
            defaultValue: 'N/A',
          },
          {
            id: 'others-sd-format',
            name: 'Format',
            path: ['OTHERS', 'SD Card', 'Format'],
            description: 'Formats the SD card. Warning: erases all data on the card.',
            defaultValue: 'N/A',
          },
        ],
      },
      {
        id: 'others-screen-capture',
        name: 'Screen Capture',
        path: ['OTHERS', 'Screen Capture'],
        description: 'Take screenshots of the display.',
        children: [
          {
            id: 'others-screen-capture-save',
            name: 'Capture Screen',
            path: ['OTHERS', 'Screen Capture', 'Capture Screen'],
            description: 'Saves a screenshot of the current display to the SD card as a BMP file.',
            defaultValue: 'N/A',
          },
        ],
      },
      {
        id: 'others-touch-calibration',
        name: 'Touch Calibration',
        path: ['OTHERS', 'Touch Calibration'],
        description: 'Calibrate the touchscreen for accurate touch input.',
        children: [
          {
            id: 'others-touch-calibration-run',
            name: 'Calibrate',
            path: ['OTHERS', 'Touch Calibration', 'Calibrate'],
            description: 'Runs the touchscreen calibration wizard. Follow the on-screen prompts.',
            defaultValue: 'N/A',
          },
        ],
      },
    ],
  },
]

/**
 * Recursively flattens the menu tree into a single array
 */
function flattenMenuTree(items: MenuItem[]): MenuItem[] {
  const result: MenuItem[] = []
  for (const item of items) {
    result.push(item)
    if (item.children) {
      result.push(...flattenMenuTree(item.children))
    }
  }
  return result
}

/** Cached flattened menu for search operations */
const flattenedMenu = flattenMenuTree(IC7300_MENU_TREE)

/**
 * Retrieves a menu item by its path
 * @param path - Array of path segments (e.g., ['SET', 'Display', 'LCD Brightness'])
 * @returns The matching MenuItem or undefined if not found
 *
 * @example
 * const item = getMenuItemByPath(['SET', 'Display', 'LCD Brightness'])
 * // Returns the LCD Brightness menu item
 */
export function getMenuItemByPath(path: string[]): MenuItem | undefined {
  if (path.length === 0) {
    return undefined
  }

  let currentItems = IC7300_MENU_TREE
  let currentItem: MenuItem | undefined

  for (const segment of path) {
    currentItem = currentItems.find((item) => item.name.toLowerCase() === segment.toLowerCase())
    if (!currentItem) {
      return undefined
    }
    currentItems = currentItem.children || []
  }

  return currentItem
}

/**
 * Searches menu items by query string
 * Matches against name, description, and path
 * @param query - Search string (case-insensitive)
 * @returns Array of matching MenuItems
 *
 * @example
 * const results = searchMenuItems('brightness')
 * // Returns items containing 'brightness' in name, description, or path
 */
export function searchMenuItems(query: string): MenuItem[] {
  if (!query || query.trim().length === 0) {
    return []
  }

  const lowerQuery = query.toLowerCase().trim()

  return flattenedMenu.filter((item) => {
    const nameMatch = item.name.toLowerCase().includes(lowerQuery)
    const descMatch = item.description.toLowerCase().includes(lowerQuery)
    const pathMatch = item.path.some((p) => p.toLowerCase().includes(lowerQuery))
    const examTipsMatch = item.examTips?.toLowerCase().includes(lowerQuery)

    return nameMatch || descMatch || pathMatch || examTipsMatch
  })
}

/**
 * Retrieves all menu items with recommended settings for new operators
 * @returns Array of MenuItems that have recommendedValue defined
 *
 * @example
 * const recommended = getRecommendedSettings()
 * // Returns all items with recommended values for new ham operators
 */
export function getRecommendedSettings(): MenuItem[] {
  return flattenedMenu.filter((item) => item.recommendedValue !== undefined)
}

/**
 * Retrieves all menu items relevant to ham radio license exams
 * @returns Array of MenuItems marked as examRelevant
 *
 * @example
 * const examItems = getExamRelevantSettings()
 * // Returns all items relevant to Technician, General, or Extra exams
 */
export function getExamRelevantSettings(): MenuItem[] {
  return flattenedMenu.filter((item) => item.examRelevant === true)
}

/**
 * Gets the full path string for a menu item
 * @param item - The menu item
 * @returns Formatted path string (e.g., "SET > Display > LCD Brightness")
 *
 * @example
 * const path = getMenuPath(item)
 * // Returns "SET > Display > LCD Brightness"
 */
export function getMenuPath(item: MenuItem): string {
  return item.path.join(' > ')
}

/**
 * Retrieves a menu item by its ID
 * @param id - The unique menu item ID
 * @returns The matching MenuItem or undefined if not found
 *
 * @example
 * const item = getMenuItemById('set-display-brightness')
 * // Returns the LCD Brightness menu item
 */
export function getMenuItemById(id: string): MenuItem | undefined {
  return flattenedMenu.find((item) => item.id === id)
}

/**
 * Gets all top-level menu categories
 * @returns Array of top-level MenuItems (SET, CONNECTORS, FUNCTION, OTHERS)
 */
export function getMenuCategories(): MenuItem[] {
  return IC7300_MENU_TREE
}

/**
 * Gets children of a menu item by its path
 * @param path - Array of path segments
 * @returns Array of child MenuItems or empty array if no children
 *
 * @example
 * const children = getMenuChildren(['SET', 'Display'])
 * // Returns all Display submenu items
 */
export function getMenuChildren(path: string[]): MenuItem[] {
  const item = getMenuItemByPath(path)
  return item?.children || []
}

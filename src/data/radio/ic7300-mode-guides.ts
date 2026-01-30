/**
 * IC-7300 Mode Operation Guides
 * Comprehensive guides for operating different modes on the Icom IC-7300 transceiver
 * Designed for ham radio exam preparation and practical operation
 */

export interface ModeGuideSection {
  id: string
  title: string
  content: string // Can include markdown-style formatting
}

export interface ModeGuide {
  id: string // matches mode id from IC7300_MODES (lsb, usb, cw, rtty, am, fm, data)
  name: string
  fullName: string
  overview: string
  sections: ModeGuideSection[]
  quickSetup: string[] // Step-by-step quick setup
  commonSettings: { setting: string; value: string; reason: string }[]
  examTips: string[]
  relatedControlIds: string[] // IDs from ic7300-controls.ts
}

export const MODE_GUIDES: ModeGuide[] = [
  // LSB - Lower Sideband
  {
    id: 'lsb',
    name: 'LSB',
    fullName: 'Lower Sideband',
    overview:
      'Lower Sideband (LSB) is a form of Single Sideband (SSB) modulation where only the lower sideband is transmitted while the carrier and upper sideband are suppressed. This makes SSB highly efficient, requiring only half the bandwidth of AM and concentrating all power into the actual voice signal. By convention, LSB is used on amateur bands below 10 MHz (160m, 80m, and 40m).',
    sections: [
      {
        id: 'lsb-convention',
        title: 'USB vs LSB Convention',
        content:
          'The amateur radio community follows a long-standing convention for sideband selection:\n\n**LSB (Lower Sideband):** Used on 160m, 80m, and 40m bands (frequencies below 10 MHz)\n\n**USB (Upper Sideband):** Used on 20m and all higher frequency bands (frequencies above 10 MHz)\n\n**Special Case - 60m:** Despite being below 10 MHz (around 5 MHz), the 60m band uses USB by FCC regulation. This is because 60m is shared with government users who use USB.\n\nThis convention exists for historical reasons related to early SSB equipment design, but following it ensures your audio sounds correct to other operators. Using the wrong sideband will make your voice sound inverted and unintelligible.',
      },
      {
        id: 'lsb-mic-setup',
        title: 'Microphone Setup and MIC Gain',
        content:
          'Proper microphone setup is essential for clear SSB communications:\n\n**MIC Gain Adjustment:**\n1. Connect your microphone to the MIC jack\n2. Set RF Power to your desired level (often 50-100W)\n3. Speak at a normal level into the microphone\n4. Adjust MIC GAIN while watching the ALC meter\n5. The ALC meter should just begin to show deflection on voice peaks\n6. If ALC is constantly deflecting into the red, reduce MIC GAIN\n\n**Key Points:**\n- Too much MIC gain causes distortion and splatter onto adjacent frequencies\n- Too little MIC gain results in a weak, hard-to-copy signal\n- Maintain consistent distance from the microphone (about 2-3 inches)\n- Speak across the microphone, not directly into it, to reduce breath pops',
      },
      {
        id: 'lsb-alc',
        title: 'ALC Meter Usage',
        content:
          'The Automatic Level Control (ALC) meter is your primary tool for setting proper audio levels:\n\n**What ALC Does:** The ALC circuit automatically reduces gain when audio peaks would cause distortion, protecting your final amplifier and keeping your signal clean.\n\n**Reading the ALC Meter:**\n- No deflection: Audio may be too low\n- Occasional deflection on peaks: Ideal setting\n- Constant deflection: Audio is too high, causing compression\n- Pegging in the red: Severe over-driving, causing distortion and splatter\n\n**Troubleshooting:**\n- If others report your audio is distorted, check that ALC is not constantly deflected\n- If others say you are weak, ensure you have some ALC activity on peaks\n- Different microphones may require different MIC GAIN settings',
      },
      {
        id: 'lsb-compression',
        title: 'Speech Compression',
        content:
          'Speech compression increases average power by reducing the dynamic range of your voice:\n\n**When to Use Compression:**\n- Difficult band conditions\n- DX contacts where you need every bit of signal strength\n- Contests where being heard quickly is important\n\n**When NOT to Use Compression:**\n- Local ragchew contacts\n- When audio quality is more important than raw signal strength\n- If others report your audio sounds harsh or distorted\n\n**Setting Compression on the IC-7300:**\n1. Access the compression settings via the FUNCTION menu\n2. Start with compression OFF or at minimum\n3. If needed, increase in small steps (1-2 levels at a time)\n4. Ask for audio reports when adjusting\n5. Too much compression sounds harsh and fatiguing to listeners',
      },
    ],
    quickSetup: [
      'Press the SSB mode button to select LSB (verify LSB is displayed)',
      "Set MIC GAIN to approximately 50% (12 o'clock position)",
      'Set RF Power to your desired output level',
      'Key the transmitter and speak normally while watching the ALC meter',
      'Adjust MIC GAIN until ALC just deflects on voice peaks',
      'Confirm your frequency is clear by asking "Is this frequency in use?"',
      'Make your call: "CQ CQ CQ, this is [your call sign]..."',
    ],
    commonSettings: [
      {
        setting: 'Filter Width',
        value: '2.4 kHz',
        reason: 'Standard SSB bandwidth for good audio quality while rejecting adjacent signals',
      },
      {
        setting: 'MIC Gain',
        value: '40-60%',
        reason: 'Starting point - adjust for proper ALC indication',
      },
      {
        setting: 'RF Power',
        value: '50-100W',
        reason: 'Use minimum power necessary for reliable communication',
      },
      {
        setting: 'Compression',
        value: 'OFF or LOW',
        reason: 'Only enable for difficult conditions; too much sounds harsh',
      },
      {
        setting: 'NR (Noise Reduction)',
        value: 'As needed',
        reason: 'Reduces background noise but may affect voice clarity if set too high',
      },
    ],
    examTips: [
      'LSB is used on 160m, 80m, and 40m bands (below 10 MHz) by convention',
      'SSB uses approximately 2.4 kHz bandwidth compared to 6 kHz for AM',
      'SSB is more efficient than AM because no power is wasted on the carrier',
      'The ALC system prevents over-modulation and signal distortion',
      'Using the wrong sideband makes your audio sound inverted/unintelligible',
      'SSB requires more precise tuning than FM because there is no carrier to lock onto',
    ],
    relatedControlIds: ['mode-ssb', 'af-gain', 'rf-power', 'filter-width', 'main-dial', 'spectrum'],
  },

  // USB - Upper Sideband
  {
    id: 'usb',
    name: 'USB',
    fullName: 'Upper Sideband',
    overview:
      'Upper Sideband (USB) is a form of Single Sideband (SSB) modulation where only the upper sideband is transmitted while the carrier and lower sideband are suppressed. USB is the standard mode for voice communications on amateur bands above 10 MHz, including 20m, 17m, 15m, 12m, 10m, and 6m. It is also mandated for the 60m band despite that band being below 10 MHz.',
    sections: [
      {
        id: 'usb-convention',
        title: 'USB vs LSB Convention',
        content:
          'The amateur radio community follows a long-standing convention for sideband selection:\n\n**USB (Upper Sideband):** Used on 20m, 17m, 15m, 12m, 10m, and 6m bands (frequencies above 10 MHz)\n\n**LSB (Lower Sideband):** Used on 160m, 80m, and 40m bands (frequencies below 10 MHz)\n\n**60m Special Rule:** The 60m band (around 5.3 MHz) is a special case. Despite being below 10 MHz, FCC regulations require USB on 60m because this band is shared with federal government stations that use USB.\n\n**Why It Matters:** If you transmit on the wrong sideband, your voice will sound completely garbled to the receiving station. Their receiver is expecting the audio frequencies to be in a specific relationship to the suppressed carrier frequency.',
      },
      {
        id: 'usb-mic-setup',
        title: 'Microphone Setup and MIC Gain',
        content:
          'Proper microphone setup is essential for clear SSB communications:\n\n**MIC Gain Adjustment:**\n1. Connect your microphone to the MIC jack\n2. Set RF Power to your desired level\n3. Speak at a normal level into the microphone\n4. Adjust MIC GAIN while watching the ALC meter\n5. The ALC meter should just begin to show deflection on voice peaks\n6. If ALC is constantly deflecting, reduce MIC GAIN\n\n**Microphone Technique:**\n- Maintain consistent distance (2-3 inches)\n- Speak across the microphone element to reduce pops\n- Avoid breathing directly into the microphone\n- Keep a consistent voice level',
      },
      {
        id: 'usb-alc',
        title: 'ALC Meter Usage',
        content:
          'The Automatic Level Control (ALC) meter is critical for proper SSB operation:\n\n**Understanding ALC:**\n- ALC prevents over-driving the transmitter\n- Protects final amplifier transistors\n- Keeps your signal within proper bandwidth\n- Prevents "splatter" onto adjacent frequencies\n\n**Proper ALC Indication:**\n- Goal: ALC deflects slightly on voice peaks only\n- Too much deflection indicates over-driving\n- No deflection may mean insufficient drive\n\n**Why Over-Driving is Bad:**\n- Causes flat-topping of the waveform\n- Creates spurious emissions (splatter)\n- Distorts your audio quality\n- Can interfere with stations on nearby frequencies',
      },
      {
        id: 'usb-60m',
        title: '60 Meter Band Operations',
        content:
          'The 60m band has special operating requirements:\n\n**USB Only:** FCC regulations mandate USB on 60m - this is not optional\n\n**Channelized Operation:** 60m operates on specific channel frequencies, not a continuous band:\n- Channel 1: 5330.5 kHz\n- Channel 2: 5346.5 kHz\n- Channel 3: 5357.0 kHz\n- Channel 4: 5371.5 kHz\n- Channel 5: 5403.5 kHz\n\n**Power Limit:** Maximum 100W ERP (Effective Radiated Power), which typically means about 100W PEP into a dipole\n\n**Why 60m Uses USB:** This band is shared with government users who standardized on USB. Using the same sideband allows potential interoperability in emergencies.',
      },
      {
        id: 'usb-compression',
        title: 'Speech Compression Tips',
        content:
          'Speech compression can improve readability on the higher bands:\n\n**Benefits on HF:**\n- Increases average power output\n- Helps punch through noise and QRM\n- Useful for DX and contests\n\n**IC-7300 Compression Settings:**\n1. Access FUNCTION > SPEECH menu\n2. Enable compression\n3. Start with low compression setting\n4. Gradually increase while getting audio reports\n\n**Tips for Best Results:**\n- Use compression sparingly on 6m where signals are often strong\n- Higher bands (10m, 12m) often benefit from light compression\n- Always ask for audio reports when adjusting\n- Too much compression creates harsh, fatiguing audio',
      },
    ],
    quickSetup: [
      'Press the SSB mode button to select USB (verify USB is displayed)',
      'Set MIC GAIN to approximately 50%',
      'Set RF Power to your desired output level',
      'Key the transmitter and speak normally while watching the ALC meter',
      'Adjust MIC GAIN until ALC just deflects on voice peaks',
      'For 60m, select one of the five authorized channel frequencies',
      'Check if the frequency is in use before transmitting',
      'Make your call: "CQ CQ CQ, this is [your call sign]..."',
    ],
    commonSettings: [
      {
        setting: 'Filter Width',
        value: '2.4 kHz',
        reason: 'Standard SSB bandwidth providing good audio quality',
      },
      {
        setting: 'MIC Gain',
        value: '40-60%',
        reason: 'Adjust for proper ALC indication on voice peaks',
      },
      {
        setting: 'RF Power',
        value: '50-100W (100W max on 60m)',
        reason: 'Use minimum necessary; 60m has regulatory power limits',
      },
      {
        setting: 'Compression',
        value: 'LOW to MEDIUM',
        reason: 'Useful for DX on higher bands; adjust based on audio reports',
      },
    ],
    examTips: [
      'USB is used on 20m and higher bands (above 10 MHz) by convention',
      '60m requires USB by FCC regulation, not by convention',
      '60m has specific channel frequencies, not a continuous band allocation',
      '60m power limit is 100W ERP (Effective Radiated Power)',
      "SSB bandwidth is approximately 2.4 kHz (narrower than AM's 6 kHz)",
      'Using the wrong sideband makes your voice unintelligible to the receiving station',
    ],
    relatedControlIds: ['mode-ssb', 'af-gain', 'rf-power', 'filter-width', 'main-dial', 'spectrum'],
  },

  // CW - Continuous Wave (Morse Code)
  {
    id: 'cw',
    name: 'CW',
    fullName: 'Continuous Wave (Morse Code)',
    overview:
      'CW (Continuous Wave) is the oldest and most efficient digital mode, using on-off keying of a carrier to send Morse code. CW has the narrowest bandwidth of any common amateur mode (typically 100-500 Hz), allowing more signals in a given band segment and enabling weak-signal communication that would be impossible with voice modes. CW is highly valued for DX, contests, and emergency communications.',
    sections: [
      {
        id: 'cw-keying-modes',
        title: 'Keying Modes',
        content:
          "The IC-7300 supports multiple CW keying methods:\n\n**Straight Key:**\n- Traditional up-and-down key\n- Operator controls all timing\n- Connect to KEY jack on back panel\n- Good for learning proper Morse timing\n\n**Paddles with Internal Keyer:**\n- Dual-lever paddles (iambic)\n- One paddle for dits, one for dahs\n- IC-7300's internal keyer generates proper timing\n- Set keyer mode: Iambic A or B, Bug mode\n\n**External Electronic Keyer:**\n- Some operators prefer external keyers\n- Connect key output to KEY jack\n- Disable internal keyer when using external\n\n**Keyer Configuration:**\n1. Go to FUNCTION > CW menu\n2. Select keyer type (straight, bug, iambic A/B)\n3. If using paddles, verify dit/dah paddle orientation\n4. Test keying before going on the air",
      },
      {
        id: 'cw-sidetone',
        title: 'Sidetone Adjustment',
        content:
          "The sidetone is the audio tone you hear while transmitting CW:\n\n**Purpose of Sidetone:**\n- Provides audio feedback of your keying\n- Allows you to hear what you're sending\n- Essential for proper rhythm and timing\n- Does not affect transmitted signal\n\n**Adjusting Sidetone:**\n1. Access FUNCTION > CW > SIDETONE\n2. Adjust pitch (typically 400-800 Hz to taste)\n3. Adjust volume separately from main AF gain\n\n**Tips:**\n- Match sidetone pitch to your preferred receiving pitch\n- This makes the transition between transmit and receive seamless\n- Typical sidetone: 600-700 Hz\n- Lower pitches (400-500 Hz) are easier on the ears for long sessions",
      },
      {
        id: 'cw-filters',
        title: 'Filter Width Selection',
        content:
          'Proper filter selection is crucial for CW operation:\n\n**Typical CW Filter Widths:**\n- 500 Hz: Good balance of selectivity and ease of tuning\n- 250 Hz: Maximum selectivity for crowded bands\n- 100-150 Hz: Extreme selectivity, requires precise tuning\n\n**When to Use Narrow Filters:**\n- Crowded band conditions\n- Contest operations with many signals\n- Interference from adjacent stations\n\n**When to Use Wider Filters:**\n- Searching for signals (easier to tune across the band)\n- Calling CQ (makes it easier for stations to find you)\n- When signal is very weak (narrow filters can reduce S/N in some cases)\n\n**IC-7300 Filter Tips:**\n- Use the touchscreen to adjust filter width graphically\n- The spectrum scope shows your filter passband\n- Twin PBT (Passband Tuning) can shift the filter to reject interference',
      },
      {
        id: 'cw-break-in',
        title: 'Break-In (QSK) Operation',
        content:
          'Break-in allows you to hear between transmitted elements:\n\n**Full Break-In (QSK):**\n- Receiver activates between each dit and dah\n- You can hear the band continuously\n- Allows instant response if other station calls\n- More demanding on T/R relay (IC-7300 uses electronic switching)\n\n**Semi Break-In:**\n- Receiver activates after a delay\n- Adjustable delay time\n- Less stressful on equipment\n- You hear between words/phrases, not elements\n\n**Setting Break-In:**\n1. Go to FUNCTION > CW > BREAK-IN\n2. Select FULL (QSK) or SEMI\n3. For semi break-in, adjust delay time\n\n**When to Use Each:**\n- QSK: Ragchewing, when you want to hear responses\n- Semi: Contests, calling CQ, sending long messages',
      },
      {
        id: 'cw-speed',
        title: 'Keying Speed Adjustment',
        content:
          'Adjusting your sending speed to match conditions:\n\n**Speed Conventions:**\n- Beginner: 5-10 WPM (words per minute)\n- Intermediate: 13-18 WPM\n- Experienced: 20-30+ WPM\n- Contests: 25-40+ WPM\n\n**IC-7300 Speed Adjustment:**\n1. The internal keyer speed is adjustable\n2. Displayed in WPM on the screen\n3. Can be changed with the multi-function knob in CW mode\n\n**Best Practices:**\n- Match your speed to the other station\n- If calling CQ, use moderate speed (15-18 WPM) to be readable by most\n- Slow down for beginners or difficult conditions\n- Standard calling speed for new CW ops: 13 WPM\n\n**Speed and Quality:**\n- Good spacing is more important than fast speed\n- Clean, well-timed code at 13 WPM is better than sloppy code at 25 WPM',
      },
    ],
    quickSetup: [
      'Press the CW mode button',
      'Connect your key or paddles to the appropriate jack',
      'Set internal keyer speed (13-15 WPM is good for general use)',
      'Adjust sidetone pitch and volume to your preference',
      'Set filter width (500 Hz is a good starting point)',
      'Set RF Power (many CW ops use 50W or less due to CW efficiency)',
      'Choose break-in mode (full QSK or semi break-in)',
      'Tune to a clear frequency and listen before transmitting',
    ],
    commonSettings: [
      {
        setting: 'Filter Width',
        value: '250-500 Hz',
        reason: 'Narrow filter rejects adjacent signals; 500 Hz is good starting point',
      },
      {
        setting: 'Sidetone Pitch',
        value: '600-700 Hz',
        reason: 'Comfortable pitch for extended operation; match to your preferred receive tone',
      },
      {
        setting: 'Keyer Speed',
        value: '13-18 WPM',
        reason: 'Moderate speed readable by most operators; adjust to match conditions',
      },
      {
        setting: 'RF Power',
        value: '25-75W',
        reason: 'CW is efficient; lower power often sufficient and reduces interference',
      },
      {
        setting: 'Break-In',
        value: 'Semi or Full QSK',
        reason: 'QSK lets you hear between elements; semi reduces relay wear',
      },
      {
        setting: 'AGC',
        value: 'FAST',
        reason: 'Fast AGC better tracks CW signal variations',
      },
    ],
    examTips: [
      'CW has the narrowest bandwidth of common modes (approximately 150 Hz minimum)',
      'CW can be copied under worse signal conditions than voice modes',
      'The narrower the bandwidth, the less noise and interference received',
      'Break-in operation allows hearing between transmitted elements',
      'CW is a form of digital communication (on-off keying)',
      'Lower power is often effective with CW due to its efficiency',
      'CW was required for ham licenses until 2007 but remains popular',
    ],
    relatedControlIds: [
      'mode-cw',
      'filter-width',
      'rf-power',
      'main-dial',
      'nr',
      'notch',
      'spectrum',
    ],
  },

  // FM - Frequency Modulation
  {
    id: 'fm',
    name: 'FM',
    fullName: 'Frequency Modulation',
    overview:
      'Frequency Modulation (FM) encodes audio by varying the carrier frequency rather than its amplitude. FM provides excellent audio quality and is resistant to amplitude noise and interference. On HF, FM is primarily used on the 10m and 6m bands for local communications. The IC-7300 covers 10m FM and 6m FM, making it useful for local FM simplex and repeater-style communications on these bands.',
    sections: [
      {
        id: 'fm-repeater',
        title: 'Repeater Operation',
        content:
          'While the IC-7300 is primarily an HF radio, understanding repeater concepts is important:\n\n**Repeater Basics:**\n- Repeaters receive on one frequency and transmit on another\n- The difference is called the "offset"\n- Repeaters extend range by being located on high points\n\n**Offset Configuration:**\n- 10m FM repeaters typically use +100 kHz offset\n- 6m FM repeaters typically use +500 kHz or +1 MHz offset\n- Negative offset means you transmit below the repeater output frequency\n\n**Setting Offset on IC-7300:**\n1. Tune to the repeater output (listening) frequency\n2. Press DUP to enable duplex mode\n3. Select +DUP or -DUP for the offset direction\n4. The offset amount can be set in the menu\n\n**Note:** Most FM repeater activity is on VHF/UHF. The IC-7300\'s FM capability is mainly for 10m and 6m simplex or the relatively few HF repeaters.',
      },
      {
        id: 'fm-tones',
        title: 'CTCSS/DCS Tone Setup',
        content:
          'Access tones allow repeaters to ignore interference:\n\n**CTCSS (Continuous Tone-Coded Squelch System):**\n- Also called "PL tone" (Motorola trademark)\n- Sub-audible tone (67.0-254.1 Hz) transmitted with your voice\n- Repeater only opens when correct tone is present\n- Filters out interference and unauthorized use\n\n**DCS (Digital Coded Squelch):**\n- Digital code transmitted as sub-audible data\n- More codes available than CTCSS\n- Less common on HF FM\n\n**Setting Tones on IC-7300:**\n1. Go to FUNCTION menu\n2. Select TONE settings\n3. Enable CTCSS encode for transmit\n4. Select the correct tone frequency (check repeater listings)\n5. Optionally enable tone squelch for receive\n\n**Common CTCSS Tones:**\n- 100.0 Hz, 103.5 Hz, 110.9 Hz are common\n- Check repeater directories for specific tone requirements',
      },
      {
        id: 'fm-simplex',
        title: 'Simplex Operation',
        content:
          'Simplex is direct station-to-station communication without a repeater:\n\n**10m FM Simplex:**\n- 29.600 MHz is the FM calling frequency\n- Other simplex activity: 29.500-29.700 MHz\n- Range depends on propagation (can be worldwide during openings)\n\n**6m FM Simplex:**\n- 52.525 MHz is the national simplex calling frequency\n- Also used: 52.54 MHz and other frequencies\n- 6m has sporadic E propagation allowing long-distance contacts\n\n**Simplex Operating Tips:**\n- Both stations on same frequency (no offset)\n- No tone may be required for simplex\n- Use directional antennas to extend range\n- 10m/6m FM is local unless band is open\n\n**Calling on Simplex:**\n1. Listen on calling frequency\n2. If clear, call: "CQ FM, CQ FM, this is [call sign]"\n3. Move off the calling frequency for extended QSOs',
      },
      {
        id: 'fm-squelch',
        title: 'Squelch Adjustment',
        content:
          'Proper squelch setting is essential for FM operation:\n\n**What Squelch Does:**\n- Mutes receiver when no signal is present\n- Eliminates constant noise between transmissions\n- Essential for comfortable FM monitoring\n\n**Setting Squelch:**\n1. With no signal present, you\'ll hear noise (FM hiss)\n2. Slowly turn squelch clockwise until noise just disappears\n3. This is the threshold setting\n4. Do not set squelch too high or weak signals will be missed\n\n**Squelch Types on IC-7300:**\n- Noise squelch: Based on noise level (normal FM squelch)\n- S-meter squelch: Opens only above set signal level\n- Tone squelch: Opens only when CTCSS/DCS tone is received\n\n**FM Capture Effect:**\n- FM has "capture effect" - the strongest signal dominates\n- If two stations transmit simultaneously, you hear the stronger one\n- This is different from AM/SSB where signals mix together',
      },
      {
        id: 'fm-bands',
        title: '29 MHz and 6m FM',
        content:
          'The IC-7300 supports FM on the 10m and 6m bands:\n\n**10m FM (29 MHz):**\n- 29.500-29.700 MHz is the FM segment\n- 29.600 MHz is the FM simplex calling frequency\n- Primarily local range, but can go worldwide during solar cycle peaks\n- Great for beginners to experience HF\n\n**6m FM (50-54 MHz):**\n- 52-54 MHz has significant FM activity\n- 52.525 MHz is the national FM simplex calling frequency\n- Subject to sporadic E (Es) propagation openings\n- During Es events, can work 500-1500 miles on FM\n\n**Propagation Notes:**\n- 10m: Follows solar cycle; excellent worldwide during solar maximum\n- 6m: "Magic band" with unpredictable sporadic E openings\n- Both bands can have sudden openings allowing FM DX\n\n**Power Considerations:**\n- FM is less efficient than SSB\n- 100W is maximum for most HF FM contacts\n- During good conditions, 25-50W often sufficient',
      },
    ],
    quickSetup: [
      'Press the FM mode button',
      'Set squelch to just silence the noise (minimum effective level)',
      'For simplex, ensure no offset is set (DUP off)',
      'For repeater, set correct offset (+/- DUP) and amount',
      'If required, set CTCSS tone to match repeater requirements',
      'Set RF Power (25-100W depending on distance)',
      'Verify frequency is clear before transmitting',
      'Press PTT to transmit; release to receive',
    ],
    commonSettings: [
      {
        setting: 'Squelch',
        value: 'Threshold (just closes on noise)',
        reason: 'Too high misses weak signals; too low is noisy',
      },
      {
        setting: 'RF Power',
        value: '25-100W',
        reason: 'FM is less efficient; use power appropriate for distance',
      },
      {
        setting: 'CTCSS Tone',
        value: 'As required by repeater',
        reason: 'Many repeaters require tone access; check repeater listings',
      },
      {
        setting: 'Offset',
        value: '+100 kHz (10m) or +500 kHz/+1 MHz (6m)',
        reason: 'Standard repeater offsets; verify for specific repeater',
      },
      {
        setting: 'Deviation',
        value: '5 kHz (default)',
        reason: 'Standard FM deviation for amateur radio; do not change',
      },
    ],
    examTips: [
      'FM has approximately 10-15 kHz bandwidth, wider than SSB',
      'The capture effect causes the strongest FM signal to dominate',
      'CTCSS tones are sub-audible (below normal hearing range)',
      'FM squelch mutes the receiver when no signal is present',
      'Repeater offset separates input and output frequencies',
      '29.600 MHz is the 10m FM simplex calling frequency',
      '52.525 MHz is the 6m FM simplex calling frequency',
      'FM is primarily used on VHF/UHF; 10m and 6m have limited FM activity',
    ],
    relatedControlIds: ['mode-fm', 'squelch', 'rf-power', 'main-dial', 'memory-ch'],
  },

  // AM - Amplitude Modulation
  {
    id: 'am',
    name: 'AM',
    fullName: 'Amplitude Modulation',
    overview:
      'Amplitude Modulation (AM) is the original voice mode, where audio is encoded as variations in carrier amplitude. AM transmits a carrier plus both sidebands, using more bandwidth and power than SSB. While largely replaced by SSB for general amateur use, AM maintains a dedicated following on certain frequencies and is essential for receiving broadcast stations and aviation communications.',
    sections: [
      {
        id: 'am-usage',
        title: 'When AM is Used',
        content:
          'AM still has specific applications in amateur radio:\n\n**Amateur AM Activity:**\n- 160m: 1.885 MHz and nearby frequencies\n- 75/80m: 3.870-3.890 MHz "AM window"\n- 40m: 7.290 MHz and nearby\n- 10m: 29.000-29.200 MHz AM segment\n\n**Why Use AM Today:**\n- Nostalgia for vintage equipment (AM was the original voice mode)\n- Pleasant, full audio quality when done well\n- Active AM community with scheduled nets\n- Some vintage military radios are AM-only\n\n**Broadcast Reception:**\n- AM mode receives standard broadcast stations\n- Useful for news, weather, emergency information\n- IC-7300 can tune AM broadcast band with modification or general coverage\n\n**Aviation Monitoring:**\n- Aircraft use AM on VHF airband (118-137 MHz)\n- IC-7300 does not cover airband, but concept is same',
      },
      {
        id: 'am-bandwidth',
        title: 'Bandwidth and Filter Settings',
        content:
          'AM requires wider filters than SSB:\n\n**AM Bandwidth:**\n- Full AM signal: Carrier + upper sideband + lower sideband\n- Total bandwidth: Approximately 6 kHz (double SSB)\n- Broadcast AM can be up to 10 kHz\n\n**Filter Settings:**\n- Normal AM: 6 kHz filter width\n- For weak signals or interference: Can narrow to 3-4 kHz\n- Narrowing affects audio quality (muffled sound)\n\n**IC-7300 AM Filters:**\n- Use touchscreen to adjust filter width\n- Wider filters = better audio quality\n- Narrower filters = better adjacent signal rejection\n\n**Synchronous AM Detection:**\n- Some radios offer synchronous AM detection\n- Locks to carrier and demodulates one sideband\n- Reduces selective fading effects\n- IC-7300 does not have this feature',
      },
      {
        id: 'am-power',
        title: 'Power Considerations',
        content:
          'Understanding AM power ratings is important:\n\n**Carrier Power vs PEP:**\n- AM power is often rated as carrier power\n- PEP (Peak Envelope Power) is 4x carrier power with 100% modulation\n- 25W carrier = 100W PEP\n- FCC power limits are PEP\n\n**IC-7300 AM Power:**\n- IC-7300 reduces power automatically in AM mode\n- Maximum carrier power is about 25W (100W PEP)\n- This protects the finals from the continuous carrier load\n\n**Power and Efficiency:**\n- AM is less efficient than SSB\n- 2/3 of AM power is in the carrier (carries no information)\n- Only 1/3 of power is in sidebands (the actual audio)\n- SSB puts all power into the information-carrying sideband\n\n**Practical Implications:**\n- AM contacts often use full legal power\n- AM works best on lower bands with better propagation\n- Antenna efficiency is important for AM',
      },
      {
        id: 'am-transmit',
        title: 'Transmitting AM',
        content:
          'AM transmission on the IC-7300:\n\n**Basic AM Transmit Setup:**\n1. Select AM mode\n2. Adjust MIC GAIN for proper modulation\n3. Watch modulation meter (aim for 80-100% on peaks)\n4. Avoid overmodulation (causes distortion and splatter)\n\n**Modulation Adjustment:**\n- Too little modulation: Weak, hard to copy audio\n- Proper modulation: Clear audio, full quieting at receiver\n- Overmodulation: Distorted audio, splatter on adjacent frequencies\n\n**Audio Quality:**\n- AM can have excellent audio quality\n- Many AM operators optimize for broadcast-quality audio\n- External audio processing is popular in AM circles\n\n**IC-7300 AM Limitations:**\n- IC-7300 is primarily an SSB/CW radio\n- AM capability is functional but basic\n- Dedicated AM operators often use vintage or specialized equipment',
      },
    ],
    quickSetup: [
      'Press the AM mode button',
      'Set filter width to 6 kHz for good audio quality',
      'Adjust AF Gain for comfortable listening level',
      'For transmitting, set MIC GAIN for proper modulation (not overmodulating)',
      'Note: RF Power is automatically reduced in AM mode (25W carrier max)',
      'Verify frequency is clear before transmitting',
      'AM calling procedure is similar to SSB',
    ],
    commonSettings: [
      {
        setting: 'Filter Width',
        value: '6 kHz',
        reason: 'Standard AM bandwidth for good audio; narrow if interference present',
      },
      {
        setting: 'RF Power',
        value: '25W carrier (automatic)',
        reason: 'IC-7300 automatically limits AM power to protect finals',
      },
      {
        setting: 'MIC Gain',
        value: 'Adjust for 80-100% modulation',
        reason: 'Full modulation without overmodulating for best audio',
      },
      {
        setting: 'AGC',
        value: 'SLOW',
        reason: 'Slow AGC better handles AM fading conditions',
      },
    ],
    examTips: [
      'AM uses approximately 6 kHz bandwidth (carrier plus two sidebands)',
      'AM is less efficient than SSB because power is wasted on the carrier',
      'The carrier in AM carries no information, only the sidebands do',
      'With 100% modulation, AM PEP is 4 times the carrier power',
      'AM was the original voice mode but has been largely replaced by SSB',
      'Overmodulation causes distortion and interference to adjacent frequencies',
      'AM receivers are simpler than SSB receivers (no BFO required)',
    ],
    relatedControlIds: ['mode-am', 'af-gain', 'rf-power', 'filter-width', 'main-dial'],
  },

  // RTTY - Radioteletype
  {
    id: 'rtty',
    name: 'RTTY',
    fullName: 'Radioteletype',
    overview:
      'Radioteletype (RTTY) is a digital mode using Frequency Shift Keying (FSK) to send text. Two audio tones represent "mark" (1) and "space" (0) to encode Baudot characters. RTTY was one of the first digital modes used by amateurs and remains popular for contests and DX. It offers better copy than CW for many operators while maintaining good weak-signal performance.',
    sections: [
      {
        id: 'rtty-fsk-afsk',
        title: 'FSK vs AFSK',
        content:
          'RTTY can be generated two different ways:\n\n**FSK (Frequency Shift Keying):**\n- Radio directly shifts transmit frequency between mark and space\n- Requires FSK-capable radio or external FSK keying input\n- Generally considered "cleaner" signal\n- IC-7300 supports direct FSK via the KEY jack\n\n**AFSK (Audio Frequency Shift Keying):**\n- Audio tones fed into radio\'s audio input (like SSB voice)\n- Uses radio in USB (or LSB) mode\n- More common method with modern software\n- Requires proper audio levels to avoid distortion\n\n**IC-7300 RTTY Options:**\n- RTTY mode: Uses internal FSK modulator/demodulator\n- Can also use DATA mode with AFSK\n- Internal decoder displays text on screen (basic)\n- Most operators use computer software for decoding\n\n**Which to Use:**\n- FSK: Preferred if your radio and software support it\n- AFSK: More universal, works with any SSB radio\n- IC-7300: Either works; many use USB DATA mode with AFSK',
      },
      {
        id: 'rtty-tones',
        title: 'Mark and Space Tones',
        content:
          'Understanding RTTY tone conventions:\n\n**Standard RTTY Tones (AFSK on USB):**\n- Mark: 2125 Hz\n- Space: 2295 Hz\n- Shift: 170 Hz (difference between mark and space)\n\n**Mark/Space Definitions:**\n- Mark (1): Key closed, higher or lower tone (by convention)\n- Space (0): Key open, the other tone\n- Standard amateur convention: Mark is the lower tone\n\n**Shift Options:**\n- 170 Hz: Standard amateur RTTY shift\n- Other shifts (425 Hz, 850 Hz) used by some services\n- IC-7300 uses 170 Hz shift by default\n\n**Tuning RTTY:**\n- Tune so the two tones fall within your filter passband\n- Software shows tuning indicator (often crosshairs or waterfall)\n- Correct tuning is critical - off by a few Hz and decode fails',
      },
      {
        id: 'rtty-filters',
        title: 'Filter Settings',
        content:
          "Optimal filtering for RTTY reception:\n\n**Filter Width:**\n- Standard RTTY: 250-500 Hz filter\n- Must be wide enough for both tones (170 Hz apart)\n- 250 Hz is minimum for 170 Hz shift\n- 400-500 Hz provides easier tuning\n\n**IC-7300 RTTY Filtering:**\n- RTTY mode has optimized default filter\n- Can use twin PBT to center filter on signal\n- Spectrum scope shows RTTY signal as two spikes\n\n**Interference Rejection:**\n- Narrow filter rejects adjacent signals\n- But too narrow clips the tones\n- Notch filter can help with CW interference\n- NR (noise reduction) less effective on RTTY\n\n**Tips:**\n- Start with 500 Hz filter\n- Narrow to 250-300 Hz if interference is present\n- Use software's waterfall to verify signal is centered",
      },
      {
        id: 'rtty-usage',
        title: 'Contest and Traffic Handling',
        content:
          'RTTY applications in amateur radio:\n\n**RTTY Contesting:**\n- Major contests: ARRL RTTY Roundup, CQ WW RTTY, WAE RTTY\n- Exchange typically serial number, zone, or other info\n- High rate possible with good software and macros\n- Very competitive mode with dedicated participants\n\n**DX on RTTY:**\n- RTTY is popular for DXpeditions\n- Easier to copy callsigns than CW for some operators\n- Works well under marginal conditions\n- Standard DX calling and pileup procedures apply\n\n**Traffic Handling:**\n- RTTY was historically used for message traffic\n- NTS (National Traffic System) has RTTY nets\n- Formal message format with headers and text\n- Less common today but still active\n\n**RTTY Frequencies:**\n- 80m: 3580-3600 kHz\n- 40m: 7080-7100 kHz\n- 20m: 14080-14100 kHz\n- 15m: 21080-21100 kHz\n- 10m: 28080-28100 kHz',
      },
      {
        id: 'rtty-setup',
        title: 'IC-7300 RTTY Setup',
        content:
          'Setting up the IC-7300 for RTTY:\n\n**Using Internal RTTY Mode:**\n1. Press RTTY mode button\n2. IC-7300 can decode RTTY internally (basic)\n3. Decoded text appears on screen\n4. Can send using internal memories or keyboard\n\n**Using Computer and Software:**\n1. Connect IC-7300 to computer via USB cable\n2. Configure audio routing (built-in USB audio)\n3. Set radio to RTTY or USB-D (DATA) mode\n4. Use software like MMTTY, Fldigi, or N1MM Logger\n\n**Audio Levels:**\n- If using AFSK, adjust audio drive levels\n- Watch ALC - should show minimal or no deflection for digital\n- Too much drive causes distortion and wide signal\n\n**Power Level:**\n- RTTY is a 100% duty cycle mode\n- Radio runs at constant power while transmitting\n- Many operators use 50-75% power to reduce heat\n- Ensure adequate cooling',
      },
    ],
    quickSetup: [
      'Press the RTTY mode button (or use USB-D with AFSK)',
      'Set filter width to 400-500 Hz',
      'Connect computer via USB for audio and CAT control',
      'Configure RTTY software (MMTTY, Fldigi, etc.)',
      'Set RF Power to 50-75% (RTTY is 100% duty cycle)',
      'Tune to an RTTY signal until software shows proper decoding',
      'If using AFSK, verify audio drive shows minimal ALC movement',
      'Use software macros for efficient operation',
    ],
    commonSettings: [
      {
        setting: 'Filter Width',
        value: '400-500 Hz',
        reason: 'Wide enough for 170 Hz shift; narrow to 250 Hz if needed',
      },
      {
        setting: 'RF Power',
        value: '50-75W',
        reason: 'RTTY is 100% duty cycle; reduce power to prevent overheating',
      },
      {
        setting: 'Shift',
        value: '170 Hz',
        reason: 'Standard amateur RTTY shift',
      },
      {
        setting: 'Audio Drive',
        value: 'Minimal ALC movement',
        reason: 'Over-driving causes distortion and wide signal',
      },
      {
        setting: 'AGC',
        value: 'FAST',
        reason: 'Fast AGC tracks RTTY signal variations',
      },
    ],
    examTips: [
      'RTTY uses Frequency Shift Keying (FSK) between mark and space tones',
      'Standard amateur RTTY shift is 170 Hz',
      'RTTY bandwidth is approximately 250-500 Hz',
      'Mark and space represent binary 1 and 0 respectively',
      'RTTY uses 5-bit Baudot code (limited character set)',
      'AFSK generates RTTY tones in audio fed to SSB transmitter',
      'RTTY is a 100% duty cycle mode - radio transmits constantly',
    ],
    relatedControlIds: ['mode-rtty', 'filter-width', 'rf-power', 'main-dial', 'spectrum'],
  },

  // DATA - Digital Modes (FT8, PSK31, etc.)
  {
    id: 'data',
    name: 'DATA',
    fullName: 'Digital Data Modes',
    overview:
      'DATA mode optimizes the IC-7300 for modern digital modes like FT8, FT4, PSK31, and JS8Call. These modes use sophisticated digital signal processing to achieve remarkable weak-signal performance, enabling worldwide contacts with minimal power. FT8 has revolutionized amateur radio by allowing contacts when traditional modes fail.',
    sections: [
      {
        id: 'data-ft8',
        title: 'FT8/FT4 Setup with Computer',
        content:
          'FT8 and FT4 are the most popular digital modes today:\n\n**What is FT8:**\n- Developed by Joe Taylor, K1JT (Nobel laureate)\n- Uses 15-second transmit/receive sequences\n- Synchronized to UTC time (requires accurate clock)\n- Can decode signals -24 dB below noise floor\n- 50 Hz bandwidth per signal\n\n**What is FT4:**\n- Faster version of FT8 (7.5 second sequences)\n- Designed for contests\n- Slightly less sensitive than FT8\n\n**Basic Setup:**\n1. Download WSJT-X software (free)\n2. Connect IC-7300 to computer via USB cable\n3. Configure WSJT-X with your radio model and COM port\n4. Set radio to USB-D (DATA) mode\n5. Synchronize computer clock to within 1 second\n\n**Operating FT8:**\n- Software decodes all signals in the passband\n- Click on a station to call them\n- Exchange: Call signs, grid squares, signal reports\n- Typical QSO takes 4-6 transmit cycles',
      },
      {
        id: 'data-connections',
        title: 'USB Cable Connections',
        content:
          'The IC-7300 uses USB for both audio and CAT control:\n\n**IC-7300 USB Features:**\n- Single USB cable carries audio in, audio out, and CAT control\n- Built-in USB sound card (no external interface needed)\n- Appears as USB audio device on computer\n\n**Connection Steps:**\n1. Connect USB cable from IC-7300 to computer\n2. Install Icom USB driver if needed (Windows may need it)\n3. Radio appears as audio device and COM port\n4. Configure software to use IC-7300 USB audio\n\n**Driver Notes:**\n- Windows: May need Icom driver for reliable operation\n- Mac/Linux: Usually works without additional drivers\n- USB audio device will be named something like "USB Audio CODEC"\n\n**CI-V Settings:**\n- IC-7300 uses CI-V protocol for CAT control\n- Default CI-V address: 94h\n- Baud rate: 19200 (configurable)',
      },
      {
        id: 'data-sound',
        title: 'Sound Card Configuration',
        content:
          'Proper audio setup is critical for digital modes:\n\n**Computer Audio Settings:**\n1. Set IC-7300 USB as default for digital software (not system default)\n2. In WSJT-X: Options > Audio > Select IC-7300 USB for input/output\n3. Disable Windows sounds that could transmit accidentally\n\n**Radio Audio Settings:**\n1. Go to SET > Connectors on IC-7300\n2. USB MOD Level: Adjust for proper transmit audio\n3. USB AF SQL: Off (unless you want squelch on receive audio)\n4. DATA OFF MOD: MIC,USB (allows USB audio in DATA mode)\n\n**Level Adjustment:**\n1. Use WSJT-X Tune function\n2. Adjust USB MOD Level or software output\n3. Watch IC-7300 ALC meter - should show NO deflection\n4. Power output should be steady at set level\n\n**Common Problems:**\n- ALC moving: Audio drive too high, reduce software output\n- No RF output: Wrong audio device selected\n- Intermittent decode: Sample rate mismatch, usually 48000 Hz',
      },
      {
        id: 'data-power',
        title: 'Power Level for Digital',
        content:
          "Digital modes require careful power management:\n\n**Recommended Power Levels:**\n- FT8/FT4: 25-50W typical (50W is plenty for worldwide)\n- PSK31: 25-50W (very efficient mode)\n- JS8Call: 25-50W\n- Higher power provides minimal benefit and creates problems\n\n**Why Lower Power:**\n- Digital modes are efficient; weak signals copy well\n- 100W continuous is hard on radio finals (duty cycle)\n- High power can cause spurious emissions if audio is overdrive\n- You'll be decoded at similar distance with 50W vs 100W\n\n**Duty Cycle Considerations:**\n- Digital modes are 100% duty cycle when transmitting\n- Radio generates continuous RF for entire transmit period\n- Heat builds up more than with SSB voice\n- Use 50% power or less for extended operating\n\n**ALC and Power:**\n- ALC should NOT move during digital transmission\n- If ALC moves, you're overdriving the radio\n- Over-driving causes distortion and wide signal\n- Reduce audio level until ALC stays at zero",
      },
      {
        id: 'data-other-modes',
        title: 'PSK31, JS8Call, and Other Modes',
        content:
          'Beyond FT8, many digital modes are popular:\n\n**PSK31 (Phase Shift Keying, 31 baud):**\n- Keyboard-to-keyboard conversational mode\n- Very narrow bandwidth (~31 Hz)\n- Sensitive but requires steady signal\n- Good for ragchewing via digital\n- Software: Fldigi, DigiPan, others\n\n**JS8Call:**\n- Based on FT8 waveform\n- Allows keyboard conversation and store-and-forward messaging\n- Builds network of stations for message relay\n- Good for emergency communications\n- Software: JS8Call (dedicated program)\n\n**WSPR (Weak Signal Propagation Reporter):**\n- Beacon mode for propagation studies\n- Transmits your call, grid, and power\n- Spots uploaded to WSPRnet.org\n- Runs 2-minute cycles\n- Very low power effective (1W or less)\n\n**Digital Mode Frequencies:**\n- 20m FT8: 14.074 MHz\n- 40m FT8: 7.074 MHz\n- 20m PSK31: 14.070 MHz\n- Check band plans for current allocations',
      },
    ],
    quickSetup: [
      'Connect IC-7300 to computer via USB cable',
      'Install WSJT-X or other digital mode software',
      'Set radio to USB-D (DATA) mode',
      'Configure software audio to use IC-7300 USB device',
      'Set RF Power to 25-50W (lower is better for digital)',
      'Ensure computer clock is accurate (within 1 second of UTC)',
      'Adjust audio levels so ALC shows NO movement when transmitting',
      'Tune to a digital mode frequency (e.g., 14.074 MHz for 20m FT8)',
      'Software will decode signals - click to call',
    ],
    commonSettings: [
      {
        setting: 'Mode',
        value: 'USB-D (DATA)',
        reason: 'Optimizes radio for digital modes, disables speech processing',
      },
      {
        setting: 'RF Power',
        value: '25-50W',
        reason: 'Digital modes are efficient; lower power reduces heat and is sufficient',
      },
      {
        setting: 'Audio Level',
        value: 'ALC shows NO movement',
        reason: 'Over-driving causes distortion and wide signal',
      },
      {
        setting: 'Filter Width',
        value: '2.4-3 kHz',
        reason: 'Wide enough to see multiple signals in the waterfall',
      },
      {
        setting: 'AGC',
        value: 'OFF or FAST',
        reason: 'AGC can affect digital decoding; many operators turn it off',
      },
    ],
    examTips: [
      'FT8 uses 15-second transmit/receive cycles synchronized to UTC time',
      'FT8 can decode signals up to 24 dB below the noise floor',
      'FT8 bandwidth is approximately 50 Hz per signal',
      'PSK31 uses Phase Shift Keying at 31 baud with ~31 Hz bandwidth',
      'Digital modes require accurate computer time synchronization',
      'ALC should not deflect during digital transmission (indicates over-driving)',
      'Lower power (25-50W) is typically sufficient for digital modes',
      'The IC-7300 uses USB for both audio and CAT control (single cable)',
    ],
    relatedControlIds: [
      'mode-rtty',
      'rf-power',
      'filter-width',
      'main-dial',
      'spectrum',
      'af-gain',
    ],
  },
]

/**
 * Get a mode guide by its ID
 * @param modeId - The mode ID (e.g., 'lsb', 'usb', 'cw', 'fm', 'am', 'rtty', 'data')
 * @returns The ModeGuide object or undefined if not found
 */
export function getModeGuide(modeId: string): ModeGuide | undefined {
  return MODE_GUIDES.find((guide) => guide.id === modeId)
}

/**
 * Get all mode guides that reference a specific control
 * @param controlId - The control ID from ic7300-controls.ts
 * @returns Array of ModeGuide objects that reference this control
 */
export function getModeGuidesByControlId(controlId: string): ModeGuide[] {
  return MODE_GUIDES.filter((guide) => guide.relatedControlIds.includes(controlId))
}

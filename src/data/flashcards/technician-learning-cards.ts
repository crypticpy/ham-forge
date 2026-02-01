/**
 * Technician Learning Cards
 * Concept explanations for flashcard-based study
 */

import type { LearningCard } from '@/types/flashcard'

export const technicianLearningCards: LearningCard[] = [
  // T1 - Commission's Rules
  {
    id: 'lc-t1a-01',
    subelement: 'T1',
    group: 'T1A',
    front: {
      title: 'Amateur Radio Purposes',
      prompt: 'What are the five purposes of the Amateur Radio Service?',
      category: "Commission's Rules",
    },
    back: {
      explanation:
        'The FCC defines five purposes: advancing the radio art, providing a trained operator pool, technical investigation, emergency communications, and international goodwill.',
      keyFact: 'Amateur radio is a NON-COMMERCIAL service',
      mnemonic:
        'ATTIC: Advancement, Trained pool, Technical investigation, International goodwill, Communications (emergency)',
      examTip: 'Questions often focus on the non-commercial nature and emergency communications.',
    },
    relatedQuestionIds: ['T1A01', 'T1A02', 'T1A03'],
  },
  {
    id: 'lc-t1a-02',
    subelement: 'T1',
    group: 'T1A',
    front: {
      title: 'ARES vs RACES',
      prompt: 'What is the difference between ARES and RACES?',
      category: "Commission's Rules",
    },
    back: {
      explanation:
        'ARES (Amateur Radio Emergency Service) is volunteers for public service. RACES (Radio Amateur Civil Emergency Service) is specifically for civil defense during national emergencies.',
      keyFact: 'ARES = Volunteers | RACES = Civil Defense',
      mnemonic: 'ARES helps Anyone, RACES is for Real Emergencies (civil defense)',
      examTip:
        'Know which organization responds to what — ARES is flexible, RACES is government-activated.',
    },
    relatedQuestionIds: ['T1A04', 'T1A05'],
  },
  {
    id: 'lc-t1b-01',
    subelement: 'T1',
    group: 'T1B',
    front: {
      title: 'Technician Privileges',
      prompt: 'What frequencies can a Technician operate on?',
      category: 'Frequency Privileges',
    },
    back: {
      explanation:
        'Technicians have FULL privileges above 30 MHz (VHF/UHF). Limited HF access: CW on 80/40/15m, and CW/data/SSB voice on 10 meters.',
      keyFact: 'Full VHF/UHF + limited HF (best on 10m when open)',
      mnemonic: 'Tech = VHF/UHF Full + 10m Fun (when the band is open)',
      examTip: '2m = 144-148 MHz, 70cm = 420-450 MHz — memorize these!',
    },
    relatedQuestionIds: ['T1B01', 'T1B02', 'T1B03'],
  },
  {
    id: 'lc-t1b-02',
    subelement: 'T1',
    group: 'T1B',
    front: {
      title: 'Band Plans',
      prompt: 'What are band plans and are they required?',
      category: 'Frequency Privileges',
    },
    back: {
      explanation:
        'Band plans are VOLUNTARY guidelines for using different portions of amateur bands. They help operators coordinate and avoid interference.',
      keyFact: 'Voluntary, not legally required',
      mnemonic: 'Band Plans = Best Practices (voluntary, not law)',
      examTip: 'Following band plans = good amateur practice',
    },
    relatedQuestionIds: ['T1B04', 'T1B05'],
  },
  {
    id: 'lc-t1c-01',
    subelement: 'T1',
    group: 'T1C',
    front: {
      title: 'Station Identification',
      prompt: 'How often must you identify your station?',
      category: 'Call Signs',
    },
    back: {
      explanation:
        'You must identify every 10 minutes during a contact and at the END of your last transmission. Use your call sign in English or phonetics.',
      keyFact: 'Every 10 minutes + at the end',
      mnemonic: 'Ten and End',
      examTip: 'Forgetting to ID is a common violation — make it a habit!',
    },
    relatedQuestionIds: ['T1C01', 'T1C02', 'T1C03'],
  },
  {
    id: 'lc-t1d-01',
    subelement: 'T1',
    group: 'T1D',
    front: {
      title: 'License Terms',
      prompt: 'How long is an amateur license valid?',
      category: 'Licensing',
    },
    back: {
      explanation:
        'Amateur licenses are valid for 10 years. You can renew up to 2 years before expiration, or within 2 years after (grace period, but no operating).',
      keyFact: '10 years valid, 2-year grace period',
      mnemonic: '10 to renew, 2 to review (grace period)',
      examTip: 'During grace period you cannot operate!',
    },
    relatedQuestionIds: ['T1D01', 'T1D02'],
  },
  {
    id: 'lc-t1e-01',
    subelement: 'T1',
    group: 'T1E',
    front: {
      title: 'Control Operator',
      prompt: 'Whose license determines operating privileges?',
      category: 'Control Requirements',
    },
    back: {
      explanation:
        "The CONTROL OPERATOR's license class determines what frequencies and modes can be used — not the station owner's license.",
      keyFact: 'Control operator license = privileges allowed',
      mnemonic: "The Controller's license Controls the privileges",
      examTip: 'If an Extra lets a Tech use their station, only Tech privileges apply.',
    },
    relatedQuestionIds: ['T1E01', 'T1E02', 'T1E03'],
  },

  // T2 - Operating Procedures
  {
    id: 'lc-t2a-01',
    subelement: 'T2',
    group: 'T2A',
    front: {
      title: 'CQ Calling',
      prompt: 'What does CQ mean and what should you do before calling?',
      category: 'Station Operation',
    },
    back: {
      explanation:
        'CQ means "calling any station." Before calling: 1) LISTEN for activity, 2) ASK "is this frequency in use?", 3) VERIFY you can use that frequency.',
      keyFact: 'Listen → Ask → Verify → Call',
      mnemonic: 'LAV-C: Listen, Ask, Verify, then Call CQ',
      examTip: 'Always check if frequency is in use first!',
    },
    relatedQuestionIds: ['T2A01', 'T2A02', 'T2A03'],
  },
  {
    id: 'lc-t2a-02',
    subelement: 'T2',
    group: 'T2A',
    front: {
      title: 'Repeater Offsets',
      prompt: 'What are the standard repeater offsets?',
      category: 'Repeater Operations',
    },
    back: {
      explanation:
        '2 meters: +/- 600 kHz offset. 70 centimeters: +/- 5 MHz offset. Your radio transmits on the input frequency.',
      keyFact: '2m = 600 kHz | 70cm = 5 MHz',
      mnemonic: '600 sounds like "6" (for 6m band neighbor) | 70cm = 5 (easy to remember)',
      examTip: 'These exact offset values appear on the exam — memorize them!',
    },
    relatedQuestionIds: ['T2A04', 'T2A05', 'T2A06'],
  },
  {
    id: 'lc-t2a-03',
    subelement: 'T2',
    group: 'T2A',
    front: {
      title: '2m Calling Frequency',
      prompt: 'What is the national 2-meter FM simplex calling frequency?',
      category: 'Key Frequencies',
    },
    back: {
      explanation:
        '146.520 MHz is the national calling frequency for FM simplex on 2 meters. This is where you monitor for and initiate contacts.',
      keyFact: '146.520 MHz',
      mnemonic: '146.520 = "1-4-6 point 5-2-0" — say it five times fast!',
      examTip: 'This specific frequency appears on every exam — know it cold!',
    },
    relatedQuestionIds: ['T2A07'],
  },
  {
    id: 'lc-t2b-01',
    subelement: 'T2',
    group: 'T2B',
    front: {
      title: 'CTCSS Tones',
      prompt: 'What is CTCSS and why is it used?',
      category: 'VHF/UHF Practices',
    },
    back: {
      explanation:
        'CTCSS (Continuous Tone-Coded Squelch System) is a sub-audible tone sent with your voice. Repeaters use it to filter unwanted signals.',
      keyFact: 'Sub-audible tone for repeater access',
      mnemonic: "CTCSS = Can't Talk? Check Squelch System (tone)",
      examTip: "Can hear but can't access a repeater? Check your CTCSS tone!",
    },
    relatedQuestionIds: ['T2B01', 'T2B02', 'T2B03'],
  },
  {
    id: 'lc-t2b-02',
    subelement: 'T2',
    group: 'T2B',
    front: {
      title: 'Q Signals: QRM & QSY',
      prompt: 'What do QRM and QSY mean?',
      category: 'Q Codes',
    },
    back: {
      explanation:
        'QRM = interference from other stations. QSY = changing frequency. These are shorthand codes used in amateur radio.',
      keyFact: 'QRM = Radio Mess | QSY = Shift Yourself',
      mnemonic: "QRM = 'Radio Mess' | QSY = 'Shift Yourself'",
      examTip: 'Q-codes appear frequently — know QRM, QSY, QRZ, QSL, QTH.',
    },
    relatedQuestionIds: ['T2B04', 'T2B05'],
  },
  {
    id: 'lc-t2c-01',
    subelement: 'T2',
    group: 'T2C',
    front: {
      title: 'Emergency Operations',
      prompt: 'Can you operate outside your privileges in an emergency?',
      category: 'Emergency Communications',
    },
    back: {
      explanation:
        'YES — for immediate safety of human life or protection of property, you may operate outside your license class privileges.',
      keyFact: 'Life safety > license restrictions',
      mnemonic: 'LIFE > LICENSE (in emergencies)',
      examTip: 'FCC rules still apply, but life safety is the priority!',
    },
    relatedQuestionIds: ['T2C01', 'T2C02'],
  },
  {
    id: 'lc-t2c-02',
    subelement: 'T2',
    group: 'T2C',
    front: {
      title: 'Net Operations',
      prompt: 'What is a net and who controls it?',
      category: 'Emergency Communications',
    },
    back: {
      explanation:
        'A net is an organized on-air meeting. The Net Control Station (NCS) directs all communications. Only transmit when directed, unless reporting emergency traffic.',
      keyFact: 'Net Control directs traffic',
      mnemonic: 'NCS = No Chaos Spontaneously (wait for direction)',
      examTip: 'Emergency traffic can interrupt — everything else waits for NCS',
    },
    relatedQuestionIds: ['T2C03', 'T2C04', 'T2C05'],
  },

  // T3 - Radio Wave Propagation
  {
    id: 'lc-t3a-01',
    subelement: 'T3',
    group: 'T3A',
    front: {
      title: 'Multipath Propagation',
      prompt: 'What causes picket fencing on mobile VHF?',
      category: 'Propagation Characteristics',
    },
    back: {
      explanation:
        'Picket fencing is rapid flutter caused by multipath propagation — signals arriving via different paths interfere constructively and destructively.',
      keyFact: 'Multiple signal paths cause flutter',
      mnemonic: 'Multiple Paths = Picket fence flutter (up-down-up-down)',
      examTip: 'Moving antenna a few feet can dramatically change signal!',
    },
    relatedQuestionIds: ['T3A01', 'T3A02', 'T3A03'],
  },
  {
    id: 'lc-t3a-02',
    subelement: 'T3',
    group: 'T3A',
    front: {
      title: 'Antenna Polarization',
      prompt: 'Why does polarization mismatch matter?',
      category: 'Propagation Characteristics',
    },
    back: {
      explanation:
        'Mismatched polarization (vertical vs horizontal) can cause 20 dB or more signal loss. VHF weak signal uses horizontal; FM repeaters use vertical.',
      keyFact: 'Mismatch = 20+ dB loss',
      mnemonic: 'Horizontal for Hunting weak signals | Vertical for Voice FM',
      examTip: 'SSB/CW = horizontal | FM = vertical | Satellite = circular',
    },
    relatedQuestionIds: ['T3A04', 'T3A05'],
  },
  {
    id: 'lc-t3b-01',
    subelement: 'T3',
    group: 'T3B',
    front: {
      title: 'Wavelength Formula',
      prompt: 'How do you calculate wavelength from frequency?',
      category: 'Radio Wave Characteristics',
    },
    back: {
      explanation:
        'Wavelength (meters) = 300 / Frequency (MHz). Radio waves travel at the speed of light: 300,000,000 meters per second.',
      keyFact: 'Wavelength = 300 ÷ MHz',
      mnemonic: '300 / 146 MHz ≈ 2 meters (2m band)',
      examTip: 'This formula appears on every exam. Use 300 ÷ MHz = meters.',
    },
    relatedQuestionIds: ['T3B01', 'T3B02', 'T3B03'],
  },
  {
    id: 'lc-t3b-02',
    subelement: 'T3',
    group: 'T3B',
    front: {
      title: 'Frequency Ranges',
      prompt: 'What frequency ranges are VHF and UHF?',
      category: 'Radio Wave Characteristics',
    },
    back: {
      explanation:
        'HF = 3-30 MHz | VHF = 30-300 MHz | UHF = 300-3000 MHz. Higher frequency = shorter wavelength = more bandwidth available.',
      keyFact: 'VHF: 30-300 MHz | UHF: 300-3000 MHz',
      mnemonic: '30-30: HF ends, VHF begins | 300-300: VHF ends, UHF begins (multiply by 10)',
      examTip: '2m (144 MHz) = VHF | 70cm (440 MHz) = UHF',
    },
    relatedQuestionIds: ['T3B04', 'T3B05'],
  },
  {
    id: 'lc-t3c-01',
    subelement: 'T3',
    group: 'T3C',
    front: {
      title: 'Tropospheric Ducting',
      prompt: 'What causes extended VHF/UHF propagation?',
      category: 'Propagation Modes',
    },
    back: {
      explanation:
        'Temperature inversions create atmospheric ducts that channel VHF/UHF signals 300+ miles. This is the most common extended-range mode.',
      keyFact: 'Temperature inversions → 300+ mile contacts',
      mnemonic: 'Tropo = Temperature inversion Traps signals in a duct',
      examTip: 'Tropo ducting is the most common extended-range VHF/UHF mode',
    },
    relatedQuestionIds: ['T3C01', 'T3C02', 'T3C03'],
  },
  {
    id: 'lc-t3c-02',
    subelement: 'T3',
    group: 'T3C',
    front: {
      title: 'Sporadic E',
      prompt: 'When is sporadic E propagation most common?',
      category: 'Propagation Modes',
    },
    back: {
      explanation:
        'Sporadic E occurs most often in late spring and early summer. It produces strong signals on 10, 6, and sometimes 2 meters over hundreds of miles.',
      keyFact: 'Late spring/early summer peak',
      mnemonic: 'Spring into Summer = Sporadic E season',
      examTip: 'Best VHF propagation mode for surprise long-distance contacts',
    },
    relatedQuestionIds: ['T3C04', 'T3C05'],
  },

  // T6 - Circuit Components
  {
    id: 'lc-t6a-01',
    subelement: 'T6',
    group: 'T6A',
    front: {
      title: 'Resistors, Capacitors, Inductors',
      prompt: 'What energy do capacitors and inductors store?',
      category: 'Basic Components',
    },
    back: {
      explanation:
        'Capacitors store energy in an ELECTRIC field. Inductors store energy in a MAGNETIC field. Resistors oppose current flow.',
      keyFact: 'Capacitor = Electric | Inductor = Magnetic',
      mnemonic: 'C for Capacitor, E for Electric field',
      examTip: 'Energy storage is a frequent exam topic — know which field each uses.',
    },
    relatedQuestionIds: ['T6A01', 'T6A02', 'T6A03'],
  },
  {
    id: 'lc-t6a-02',
    subelement: 'T6',
    group: 'T6A',
    front: {
      title: 'Battery Types',
      prompt: 'Which common battery type is NOT rechargeable?',
      category: 'Basic Components',
    },
    back: {
      explanation:
        'Carbon-zinc batteries are NOT rechargeable. NiMH, Li-ion, and lead-acid ARE rechargeable.',
      keyFact: 'Carbon-zinc = disposable',
      mnemonic: "Carbon = Can't Charge (use once, toss)",
      examTip: 'This is a common exam question!',
    },
    relatedQuestionIds: ['T6A04', 'T6A05'],
  },
  {
    id: 'lc-t6b-01',
    subelement: 'T6',
    group: 'T6B',
    front: {
      title: 'Diode Basics',
      prompt: "What are a diode's terminals and which way does current flow?",
      category: 'Semiconductors',
    },
    back: {
      explanation:
        'Diode terminals: Anode (+) and Cathode (-). Current flows from anode to cathode. The stripe on the package marks the cathode.',
      keyFact: 'Stripe = Cathode | Current: Anode → Cathode',
      mnemonic: 'The stripe points the way current flows out',
      examTip: 'Know how to identify cathode on a schematic and physical component.',
    },
    relatedQuestionIds: ['T6B01', 'T6B02', 'T6B03'],
  },
  {
    id: 'lc-t6b-02',
    subelement: 'T6',
    group: 'T6B',
    front: {
      title: 'Transistor Terminals',
      prompt: 'What are the terminals of BJT and FET transistors?',
      category: 'Semiconductors',
    },
    back: {
      explanation:
        'BJT: Emitter, Base, Collector. FET: Gate, Drain, Source. Both can amplify signals or act as switches.',
      keyFact: 'BJT = EBC | FET = GDS',
      mnemonic: 'BJT: "Every Boy Collects" | FET: "Gate Drains Source"',
      examTip: 'Transistor terminal names are tested — memorize both BJT and FET.',
    },
    relatedQuestionIds: ['T6B04', 'T6B05', 'T6B06'],
  },
  {
    id: 'lc-t6c-01',
    subelement: 'T6',
    group: 'T6C',
    front: {
      title: 'Schematic Symbols',
      prompt: 'What do schematics show and NOT show?',
      category: 'Schematic Reading',
    },
    back: {
      explanation:
        'Schematics show electrical CONNECTIONS, not physical layout. They do NOT show wire lengths, component sizes, or actual board layout.',
      keyFact: 'Connections = yes | Physical layout = no',
      mnemonic: 'Schematic = See the Circuit, not the Chassis',
      examTip: 'Know symbols: resistor (zigzag), capacitor (parallel lines), inductor (loops)',
    },
    relatedQuestionIds: ['T6C01', 'T6C02', 'T6C03'],
  },
  {
    id: 'lc-t6d-01',
    subelement: 'T6',
    group: 'T6D',
    front: {
      title: 'Rectifiers and Regulators',
      prompt: 'What do rectifiers and regulators do in a power supply?',
      category: 'Practical Circuits',
    },
    back: {
      explanation:
        'Rectifier converts AC to DC. Regulator maintains stable output voltage despite input variations or load changes.',
      keyFact: 'Rectifier = AC→DC | Regulator = stable voltage',
      mnemonic:
        'Rectify to DC, Regulate for stability (TRFR: Transform, Rectify, Filter, Regulate)',
      examTip: 'Power supply chain: Transformer → Rectifier → Filter → Regulator',
    },
    relatedQuestionIds: ['T6D01', 'T6D02', 'T6D03'],
  },

  // T8 - Modulation and Signals
  {
    id: 'lc-t8a-01',
    subelement: 'T8',
    group: 'T8A',
    front: {
      title: 'FM vs SSB',
      prompt: 'When would you use SSB instead of FM?',
      category: 'Modulation Modes',
    },
    back: {
      explanation:
        "SSB uses only ~3 kHz bandwidth vs FM's 10-15 kHz. Use SSB for weak signal work on VHF/UHF. FM is standard for repeaters.",
      keyFact: 'SSB = narrow, weak signals | FM = repeaters',
      mnemonic: 'SSB = Squeezes Signal Bandwidth (narrow) | FM = Fat Modulation (wide)',
      examTip: 'USB (upper sideband) is standard above 10 MHz',
    },
    relatedQuestionIds: ['T8A01', 'T8A02', 'T8A03'],
  },
  {
    id: 'lc-t8a-02',
    subelement: 'T8',
    group: 'T8A',
    front: {
      title: 'CW Bandwidth',
      prompt: 'Which mode has the narrowest bandwidth?',
      category: 'Modulation Modes',
    },
    back: {
      explanation:
        'CW (Morse code) has the narrowest bandwidth at ~150 Hz. This makes it excellent for weak signal work — signals can be copied below the noise floor.',
      keyFact: 'CW = 150 Hz (narrowest)',
      mnemonic: 'CW = Continuous Wave = tiny bandwidth',
      examTip: 'Mode bandwidth questions are common — know CW is the narrowest.',
    },
    relatedQuestionIds: ['T8A04', 'T8A05'],
  },
  {
    id: 'lc-t8b-01',
    subelement: 'T8',
    group: 'T8B',
    front: {
      title: 'Satellite Doppler',
      prompt: 'Why must you adjust frequency during satellite passes?',
      category: 'Amateur Satellites',
    },
    back: {
      explanation:
        'Doppler shift! As the satellite approaches, frequency appears higher; as it recedes, frequency appears lower. Tracking software compensates.',
      keyFact: 'Approaching = higher | Receding = lower',
      mnemonic: 'Coming = Climb (frequency up) | Going = Ground (frequency down)',
      examTip: 'Keplerian elements are inputs for satellite tracking software',
    },
    relatedQuestionIds: ['T8B01', 'T8B02', 'T8B03'],
  },
  {
    id: 'lc-t8d-01',
    subelement: 'T8',
    group: 'T8D',
    front: {
      title: 'APRS',
      prompt: 'What does APRS transmit?',
      category: 'Digital Modes',
    },
    back: {
      explanation:
        'APRS (Automatic Packet Reporting System) transmits GPS positions, text messages, weather data, and telemetry — displayed on maps.',
      keyFact: 'Position, messages, weather on maps',
      mnemonic: 'APRS = Automatic Position Reporting on Screen (map)',
      examTip: 'APRS = tactical digital communications with real-time mapping',
    },
    relatedQuestionIds: ['T8D01', 'T8D02', 'T8D03'],
  },
  {
    id: 'lc-t8d-02',
    subelement: 'T8',
    group: 'T8D',
    front: {
      title: 'FT8 and Weak Signals',
      prompt: 'What makes FT8 special for weak signal work?',
      category: 'Digital Modes',
    },
    back: {
      explanation:
        'FT8 can decode signals far below the noise floor — inaudible to humans. Part of WSJT-X, used for EME, meteor scatter, and weak signal DX.',
      keyFact: 'Decodes below noise floor',
      mnemonic: 'FT8 = Find Them below -8 dB (extreme weak signal)',
      examTip: 'FT8 = extreme weak signal capability',
    },
    relatedQuestionIds: ['T8D04', 'T8D05'],
  },
  {
    id: 'lc-t8d-03',
    subelement: 'T8',
    group: 'T8D',
    front: {
      title: 'DMR Basics',
      prompt: 'What is DMR and how does it increase capacity?',
      category: 'Digital Modes',
    },
    back: {
      explanation:
        'DMR (Digital Mobile Radio) time-multiplexes TWO voice channels on one 12.5 kHz channel. Uses color codes (like CTCSS) and talkgroups.',
      keyFact: '2 voice channels, 1 frequency',
      mnemonic: 'DMR = Double My Radio (2 voice channels per frequency)',
      examTip: 'Color code must match repeater, like CTCSS for analog',
    },
    relatedQuestionIds: ['T8D06', 'T8D07'],
  },

  // T0 - Safety
  {
    id: 'lc-t0a-01',
    subelement: 'T0',
    group: 'T0A',
    front: {
      title: 'Electrical Safety',
      prompt: 'What is the most critical electrical safety rule?',
      category: 'Electrical Safety',
    },
    back: {
      explanation:
        'NEVER work on energized circuits! Always disconnect power before working. Use lockout-tagout procedures. Assume all wires are hot.',
      keyFact: 'Power OFF before touching anything',
      mnemonic: 'First power DOWN, then hands ON',
      examTip: 'This appears on every exam in some form',
    },
    relatedQuestionIds: ['T0A01', 'T0A02', 'T0A03'],
  },
  {
    id: 'lc-t0a-02',
    subelement: 'T0',
    group: 'T0A',
    front: {
      title: 'AC Wiring Colors',
      prompt: 'What color is the ground wire in AC wiring?',
      category: 'Electrical Safety',
    },
    back: {
      explanation:
        'Green or bare = ground. White = neutral. Black (or red) = hot. NEVER connect hot to ground!',
      keyFact: 'Green/bare = Ground | White = Neutral | Black = Hot',
      mnemonic: 'Green for Ground, White for neutral (blank), Black for Bad (hot)',
      examTip: 'Wiring color questions are common — memorize all three colors.',
    },
    relatedQuestionIds: ['T0A04', 'T0A05'],
  },
  {
    id: 'lc-t0b-01',
    subelement: 'T0',
    group: 'T0B',
    front: {
      title: 'Tower Safety',
      prompt: 'What is the most important tower climbing rule?',
      category: 'Tower Safety',
    },
    back: {
      explanation:
        'NEVER climb alone. Always have a ground observer. Use proper fall protection. Stay away from power lines — minimum 10 feet clearance.',
      keyFact: 'Never climb alone + fall protection',
      mnemonic: 'Never Solo, Always Protected, 10 feet from Power (NSA-P-10)',
      examTip: 'Power line distance questions are common',
    },
    relatedQuestionIds: ['T0B01', 'T0B02', 'T0B03'],
  },
  {
    id: 'lc-t0c-01',
    subelement: 'T0',
    group: 'T0C',
    front: {
      title: 'RF Exposure',
      prompt: 'What determines if your station needs an RF exposure evaluation?',
      category: 'RF Safety',
    },
    back: {
      explanation:
        'All stations must comply with MPE (Maximum Permissible Exposure) limits. Evaluation needed if you exceed certain power thresholds based on frequency and antenna type.',
      keyFact: 'Power level and frequency determine evaluation need',
      mnemonic: 'Power + Frequency = Potential exposure (both factors matter)',
      examTip: 'Higher power + lower frequency = more likely to need evaluation',
    },
    relatedQuestionIds: ['T0C01', 'T0C02', 'T0C03'],
  },
  {
    id: 'lc-t0c-02',
    subelement: 'T0',
    group: 'T0C',
    front: {
      title: 'Reducing RF Exposure',
      prompt: 'How can you reduce RF exposure from your antenna?',
      category: 'RF Safety',
    },
    back: {
      explanation:
        'Increase distance (most effective), reduce power, limit duty cycle, relocate antenna away from people, use directional antennas pointed away.',
      keyFact: 'Distance is most effective',
      mnemonic: 'Distance, Power, Time (duty cycle)',
      examTip: 'Know all the ways to reduce RF exposure — distance is #1.',
    },
    relatedQuestionIds: ['T0C04', 'T0C05'],
  },

  // T4 - Amateur Practices
  {
    id: 'lc-t4a-01',
    subelement: 'T4',
    group: 'T4A',
    front: {
      title: 'Station Grounding',
      prompt: 'Why is proper grounding important for an amateur station?',
      category: 'Amateur Practices',
    },
    back: {
      explanation:
        'Proper grounding protects equipment from lightning damage, reduces RF interference, and provides a safety path for electrical faults. Use heavy copper wire with short, direct runs.',
      keyFact: 'Short, direct ground connections are best',
      mnemonic: 'Ground = Guard (protects equipment and operator)',
      examTip: 'Questions focus on lightning protection and RF grounding differences.',
    },
    relatedQuestionIds: ['T4A01', 'T4A02'],
  },
  {
    id: 'lc-t4a-02',
    subelement: 'T4',
    group: 'T4A',
    front: {
      title: 'RF Interference (RFI)',
      prompt: 'What causes RF interference to consumer electronics?',
      category: 'Amateur Practices',
    },
    back: {
      explanation:
        'RFI occurs when strong RF signals enter devices through power cords, speaker wires, or inadequate shielding. Common victims: TVs, stereos, telephones.',
      keyFact: 'Ferrite chokes and filters can reduce RFI',
      mnemonic: 'RFI = Radio Finds Its way In (through cables and openings)',
      examTip: 'Ferrite cores on cables are the first solution to try.',
    },
    relatedQuestionIds: ['T4A03', 'T4A04'],
  },
  {
    id: 'lc-t4a-03',
    subelement: 'T4',
    group: 'T4A',
    front: {
      title: 'Audio Rectification',
      prompt: "What causes your voice to be heard through a neighbor's stereo?",
      category: 'Amateur Practices',
    },
    back: {
      explanation:
        'Audio rectification occurs when RF is detected by semiconductor junctions in audio equipment, converting your transmitted signal to audio. Speaker wires act as antennas.',
      keyFact: 'Audio devices accidentally "detect" RF signals',
      mnemonic: 'ARF! Audio Receives Frequencies (like a dog hearing things)',
      examTip: 'Solution is ferrites on speaker wires and audio cables.',
    },
    relatedQuestionIds: ['T4A05', 'T4A06'],
  },
  {
    id: 'lc-t4b-01',
    subelement: 'T4',
    group: 'T4B',
    front: {
      title: 'Microphone Gain',
      prompt: 'How should microphone gain be set on an FM transceiver?',
      category: 'Amateur Practices',
    },
    back: {
      explanation:
        'Set microphone gain so your audio is clear without overdriving. Too high causes distortion and splatter; too low makes you hard to understand.',
      keyFact: 'Speak normally, adjust until audio is clear',
      mnemonic: 'GAIN: Get Audio In Nicely (not too hot, not too quiet)',
      examTip: 'Overdriving mic = distorted audio + interference to adjacent channels.',
    },
    relatedQuestionIds: ['T4B01', 'T4B02'],
  },
  {
    id: 'lc-t4b-02',
    subelement: 'T4',
    group: 'T4B',
    front: {
      title: 'Repeater Operation',
      prompt: 'What is the purpose of a repeater offset?',
      category: 'Amateur Practices',
    },
    back: {
      explanation:
        'Repeaters receive on one frequency and transmit on another (offset). Common offsets: +/- 600 kHz on 2m, +/- 5 MHz on 70cm. This allows simultaneous receive/transmit.',
      keyFact: '2m = 600 kHz offset, 70cm = 5 MHz offset',
      mnemonic: '2m = 600 (like 2x3=6), 70cm = 5 MHz (higher band, bigger offset)',
      examTip: 'Know standard offsets for VHF and UHF bands.',
    },
    relatedQuestionIds: ['T4B03', 'T4B04'],
  },
  {
    id: 'lc-t4b-03',
    subelement: 'T4',
    group: 'T4B',
    front: {
      title: 'CTCSS Tones',
      prompt: 'What is CTCSS and why is it used?',
      category: 'Amateur Practices',
    },
    back: {
      explanation:
        'CTCSS (Continuous Tone-Coded Squelch System) sends a sub-audible tone to access repeaters. It prevents interference from other stations on the same frequency.',
      keyFact: 'Sub-audible tone = repeater access key',
      mnemonic: 'CTCSS = Code To Call Squelch System (your secret knock)',
      examTip: 'Also called PL tones (Private Line, Motorola trademark).',
    },
    relatedQuestionIds: ['T4B05', 'T4B06'],
  },

  // T5 - Electrical Principles
  {
    id: 'lc-t5a-01',
    subelement: 'T5',
    group: 'T5A',
    front: {
      title: "Ohm's Law",
      prompt: 'What is the relationship between voltage, current, and resistance?',
      category: 'Electrical Principles',
    },
    back: {
      explanation:
        "Ohm's Law: V = I × R (Voltage = Current × Resistance). This fundamental formula relates the three basic electrical quantities. Rearrange to find any value.",
      keyFact: 'V = IR, I = V/R, R = V/I',
      mnemonic: "VIR = Very Important Rule (or use the Ohm's Law triangle)",
      examTip: 'Memorize V=IR. Given any two values, calculate the third.',
    },
    relatedQuestionIds: ['T5A01', 'T5A02', 'T5A03'],
  },
  {
    id: 'lc-t5a-02',
    subelement: 'T5',
    group: 'T5A',
    front: {
      title: 'Power Formula',
      prompt: 'How do you calculate electrical power?',
      category: 'Electrical Principles',
    },
    back: {
      explanation:
        'Power (watts) = Voltage × Current (P = E × I). Also: P = I²R or P = E²/R. Power is the rate of energy transfer in a circuit.',
      keyFact: 'P = E × I (Power = Voltage × Current)',
      mnemonic: 'PIE: Power = I times E (delicious formula)',
      examTip: 'Know all three power formulas for different given values.',
    },
    relatedQuestionIds: ['T5A04', 'T5A05', 'T5A06'],
  },
  {
    id: 'lc-t5b-01',
    subelement: 'T5',
    group: 'T5B',
    front: {
      title: 'Decibels (dB)',
      prompt: 'What do decibels measure in amateur radio?',
      category: 'Electrical Principles',
    },
    back: {
      explanation:
        'Decibels express power ratios logarithmically. +3 dB = double power, +10 dB = 10× power, -3 dB = half power. Used for gain, loss, and signal strength.',
      keyFact: '+3 dB = 2× power, +10 dB = 10× power',
      mnemonic: '3 dB = Double, 10 dB = Deca (10×)',
      examTip: 'Memorize: 3 dB = 2×, 6 dB = 4×, 10 dB = 10×.',
    },
    relatedQuestionIds: ['T5B01', 'T5B02', 'T5B03'],
  },
  {
    id: 'lc-t5b-02',
    subelement: 'T5',
    group: 'T5B',
    front: {
      title: 'AC vs DC',
      prompt: 'What is the difference between AC and DC current?',
      category: 'Electrical Principles',
    },
    back: {
      explanation:
        'DC (Direct Current) flows in one direction. AC (Alternating Current) reverses direction periodically. House power is 60 Hz AC; batteries provide DC.',
      keyFact: 'AC alternates direction, DC is steady',
      mnemonic: "AC = Alternates Constantly, DC = Doesn't Change direction",
      examTip: 'Household power is 60 Hz AC, 120V RMS in the US.',
    },
    relatedQuestionIds: ['T5B04', 'T5B05'],
  },
  {
    id: 'lc-t5c-01',
    subelement: 'T5',
    group: 'T5C',
    front: {
      title: 'Frequency & Wavelength',
      prompt: 'How are frequency and wavelength related?',
      category: 'Electrical Principles',
    },
    back: {
      explanation:
        'Wavelength (meters) = 300 / Frequency (MHz). Higher frequency = shorter wavelength. This relationship is key for antenna design.',
      keyFact: 'λ = 300/f (wavelength in meters, frequency in MHz)',
      mnemonic: '300 divided by MHz = meters (the magic 300)',
      examTip: '2m band ≈ 146 MHz, 70cm ≈ 440 MHz — do the math!',
    },
    relatedQuestionIds: ['T5C01', 'T5C02', 'T5C03'],
  },
  {
    id: 'lc-t5c-02',
    subelement: 'T5',
    group: 'T5C',
    front: {
      title: 'Impedance',
      prompt: 'What is impedance and why does it matter?',
      category: 'Electrical Principles',
    },
    back: {
      explanation:
        'Impedance is AC resistance, measured in ohms. It includes resistance plus reactance from capacitors/inductors. Matching impedance maximizes power transfer.',
      keyFact: 'Standard amateur impedance is 50 ohms',
      mnemonic: "Impedance = AC's Resistance (Z = R + jX)",
      examTip: '50Ω is the standard for amateur radio equipment and coax.',
    },
    relatedQuestionIds: ['T5C04', 'T5C05', 'T5C06'],
  },

  // T7 - Station Equipment
  {
    id: 'lc-t7a-01',
    subelement: 'T7',
    group: 'T7A',
    front: {
      title: 'Transceiver Basics',
      prompt: 'What is a transceiver and what are its main components?',
      category: 'Station Equipment',
    },
    back: {
      explanation:
        'A transceiver combines transmitter and receiver in one unit. Key sections: receiver (detects signals), transmitter (generates RF), frequency control, and audio processing.',
      keyFact: 'Transceiver = Transmitter + Receiver combined',
      mnemonic: 'TRANS-CEIVER = TRANSmit + reCEIVER',
      examTip: 'Know the basic block diagram sections of a transceiver.',
    },
    relatedQuestionIds: ['T7A01', 'T7A02', 'T7A03'],
  },
  {
    id: 'lc-t7a-02',
    subelement: 'T7',
    group: 'T7A',
    front: {
      title: 'Receiver Sensitivity',
      prompt: 'What determines how well a receiver can hear weak signals?',
      category: 'Station Equipment',
    },
    back: {
      explanation:
        'Sensitivity is the minimum signal a receiver can detect, measured in microvolts. Lower number = better sensitivity. Preamps can improve sensitivity.',
      keyFact: 'Lower microvolt rating = more sensitive receiver',
      mnemonic: 'Sensitive receivers hear whispers (small signals)',
      examTip: '0.25 µV is more sensitive than 1.0 µV.',
    },
    relatedQuestionIds: ['T7A04', 'T7A05'],
  },
  {
    id: 'lc-t7b-01',
    subelement: 'T7',
    group: 'T7B',
    front: {
      title: 'SWR Meter',
      prompt: 'What does an SWR meter measure?',
      category: 'Station Equipment',
    },
    back: {
      explanation:
        'SWR (Standing Wave Ratio) meter measures antenna system match. Perfect match = 1:1. High SWR means power reflects back to transmitter, reducing efficiency.',
      keyFact: '1:1 SWR is perfect, 2:1 or lower is acceptable',
      mnemonic: 'SWR = Standing Wave Ratio (lower is better)',
      examTip: 'High SWR can damage transmitter finals. Check before transmitting!',
    },
    relatedQuestionIds: ['T7B01', 'T7B02', 'T7B03'],
  },
  {
    id: 'lc-t7b-02',
    subelement: 'T7',
    group: 'T7B',
    front: {
      title: 'Dummy Load',
      prompt: 'What is a dummy load used for?',
      category: 'Station Equipment',
    },
    back: {
      explanation:
        'A dummy load is a resistor that absorbs transmitter power without radiating. Used for testing and tuning without causing interference.',
      keyFact: 'Dummy load = 50Ω resistor, absorbs RF, no radiation',
      mnemonic: 'Dummy load: All the power, none of the radiation',
      examTip: 'Always use dummy load for testing to avoid interference.',
    },
    relatedQuestionIds: ['T7B04', 'T7B05'],
  },
  {
    id: 'lc-t7c-01',
    subelement: 'T7',
    group: 'T7C',
    front: {
      title: 'Power Supplies',
      prompt: 'What voltage do most mobile/base amateur radios require?',
      category: 'Station Equipment',
    },
    back: {
      explanation:
        'Most amateur transceivers operate on 13.8V DC (nominal 12V). Mobile installations use vehicle battery; base stations need a regulated power supply.',
      keyFact: '13.8V DC is standard for most amateur radios',
      mnemonic: '13.8V = 12V + a little extra (like a charging battery)',
      examTip: 'Know current requirements: 100W radio needs ~20A at 13.8V.',
    },
    relatedQuestionIds: ['T7C01', 'T7C02', 'T7C03'],
  },
  {
    id: 'lc-t7c-02',
    subelement: 'T7',
    group: 'T7C',
    front: {
      title: 'Computer Interfaces',
      prompt: 'How do you connect a radio to a computer for digital modes?',
      category: 'Station Equipment',
    },
    back: {
      explanation:
        'Digital mode interfaces connect radio audio to computer sound card. Some use USB, others use separate audio cables. Many include PTT control via CAT or VOX.',
      keyFact: 'Sound card + PTT control = digital mode interface',
      mnemonic: 'Computer talks to radio through audio + control',
      examTip: 'Know about sound card interfaces and CAT control.',
    },
    relatedQuestionIds: ['T7C04', 'T7C05', 'T7C06'],
  },

  // T9 - Antennas & Feed Lines
  {
    id: 'lc-t9a-01',
    subelement: 'T9',
    group: 'T9A',
    front: {
      title: 'Dipole Antenna',
      prompt: 'What is a dipole antenna and how long should it be?',
      category: 'Antennas & Feed Lines',
    },
    back: {
      explanation:
        'A dipole is two equal elements fed at the center. Total length is approximately half wavelength (468/freq in MHz = feet). Simple, effective, and popular.',
      keyFact: 'Half-wave dipole: 468 ÷ frequency (MHz) = total length in feet',
      mnemonic: '468 for feet, 143 for meters (half-wave dipole formulas)',
      examTip: 'For 2m (146 MHz): 468/146 ≈ 3.2 feet total.',
    },
    relatedQuestionIds: ['T9A01', 'T9A02', 'T9A03'],
  },
  {
    id: 'lc-t9a-02',
    subelement: 'T9',
    group: 'T9A',
    front: {
      title: 'Vertical Antenna',
      prompt: 'What are the advantages of a vertical antenna?',
      category: 'Antennas & Feed Lines',
    },
    back: {
      explanation:
        'Verticals are omnidirectional (radiate equally in all directions), take less horizontal space, and work well for mobile. Require good ground plane or radials.',
      keyFact: 'Omnidirectional pattern, low angle radiation',
      mnemonic: 'Vertical = 360° coverage (like a lighthouse)',
      examTip: 'Ground-mounted verticals need radials for efficiency.',
    },
    relatedQuestionIds: ['T9A04', 'T9A05'],
  },
  {
    id: 'lc-t9a-03',
    subelement: 'T9',
    group: 'T9A',
    front: {
      title: 'Yagi Antenna',
      prompt: 'What type of antenna provides gain and directivity?',
      category: 'Antennas & Feed Lines',
    },
    back: {
      explanation:
        'Yagi antennas have a driven element plus directors and reflectors. They focus energy in one direction, providing gain. More elements = more gain and directivity.',
      keyFact: 'Yagi = directional beam antenna with gain',
      mnemonic: 'Yagi points like an arrow (directors lead the way)',
      examTip: 'Reflector is longer, behind driven element. Directors are shorter, in front.',
    },
    relatedQuestionIds: ['T9A06', 'T9A07', 'T9A08'],
  },
  {
    id: 'lc-t9b-01',
    subelement: 'T9',
    group: 'T9B',
    front: {
      title: 'Coaxial Cable',
      prompt: 'What is coaxial cable and why is it used?',
      category: 'Antennas & Feed Lines',
    },
    back: {
      explanation:
        'Coax has a center conductor surrounded by insulation, shield, and jacket. It carries RF with low loss and prevents radiation. Common types: RG-58, RG-8, RG-213.',
      keyFact: 'RG-8/RG-213 = lower loss, RG-58 = thinner but more loss',
      mnemonic: 'Coax = Conductor in Center, shield Outside',
      examTip: 'Thicker coax = lower loss. Use RG-8 for long runs.',
    },
    relatedQuestionIds: ['T9B01', 'T9B02', 'T9B03'],
  },
  {
    id: 'lc-t9b-02',
    subelement: 'T9',
    group: 'T9B',
    front: {
      title: 'SWR and Matching',
      prompt: "What happens when antenna impedance doesn't match feed line?",
      category: 'Antennas & Feed Lines',
    },
    back: {
      explanation:
        'Impedance mismatch causes power to reflect back, creating standing waves. High SWR wastes power and can damage transmitter. Use antenna tuner to match.',
      keyFact: 'Mismatch = reflected power = high SWR',
      mnemonic: 'Mismatch = power bounces back (like sound echoing)',
      examTip: 'SWR below 2:1 is generally acceptable for most transmitters.',
    },
    relatedQuestionIds: ['T9B04', 'T9B05', 'T9B06'],
  },
  {
    id: 'lc-t9b-03',
    subelement: 'T9',
    group: 'T9B',
    front: {
      title: 'RF Connectors',
      prompt: 'What are the common RF connectors used in amateur radio?',
      category: 'Antennas & Feed Lines',
    },
    back: {
      explanation:
        'PL-259/SO-239 (UHF connector) is most common for HF/VHF. BNC is used for test equipment. N-type is weatherproof and better for UHF/microwave frequencies.',
      keyFact: 'PL-259 = common, BNC = quick-connect, N = weatherproof',
      mnemonic: 'PL-259 is the "standard Plug", N is Nice for outdoors',
      examTip: 'N-type has lower loss at UHF than PL-259.',
    },
    relatedQuestionIds: ['T9B07', 'T9B08', 'T9B09'],
  },
]

export default technicianLearningCards

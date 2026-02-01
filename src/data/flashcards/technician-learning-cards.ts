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
]

export default technicianLearningCards

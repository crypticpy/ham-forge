/**
 * G1 - Commission's Rules Module
 * General Class Amateur Radio License
 */

import type { LearningModule } from '@/types/learning'

export const commissionRulesModule: LearningModule = {
  id: 'G1',
  examLevel: 'general',
  title: "Commission's Rules",
  description:
    'FCC rules and operating requirements for General class operators, including frequency privileges, beacons, power limits, exam administration, third-party traffic, and special situations.',
  estimatedMinutes: 65,
  sections: [
    {
      id: 'G1A',
      title: 'General Class Frequency Privileges and Allocations',
      content: `# General Class Frequency Privileges (G1A)

The General license is the first license class with broad HF privileges. The exam expects you to know (1) where General privileges begin/end on HF, (2) which bands have special restrictions, and (3) what “secondary” means.

## Where Generals Cannot Transmit (Extra-only Segments)

Some HF bands include **segments exclusively allocated to Amateur Extra** licensees. Generals cannot transmit there. The key HF bands where this shows up are:

- 80 meters
- 40 meters
- 20 meters
- 15 meters

Example “edge” many people memorize: **40m phone for General begins at 7.175 MHz**, so **7.125-7.175 MHz** is Extra-only phone.

## Band Restrictions You Must Know

- **60 meters** is **channelized** (specific channels, not a continuous range)
- **30 meters** is **CW/data only** (no phone) and also **no image transmission**

## “Secondary” Allocations

When the Amateur Service is a **secondary** user on a band segment:

- You must **not cause harmful interference** to primary users
- You must **accept interference** from primary users

## 10-Meter Details

- General class stations may transmit **CW on the entire 10-meter band**
- The **repeater segment** on 10 meters is **above 29.5 MHz**

## Frequency Recognition (Common Trap)

- **21.300 MHz** is within the General class portion of the **15-meter** band

## Voice Segments When You Don’t Get “All of Phone”

On bands where Generals do not have the entire phone segment, Generals generally have the **upper portion** of the phone allocation (the higher-frequency part of the phone segment).
`,
      keyPoints: [
        'Extra-only segments exist on 80m, 40m, 20m, and 15m',
        '30 meters has no phone or image transmissions; 60 meters is channelized',
        'On secondary allocations: do not cause harmful interference and accept interference',
        'CW is permitted on the entire 10-meter band for Generals',
        '10-meter repeaters operate above 29.5 MHz; when Generals don’t get full phone, they typically get the upper portion',
      ],
      relatedQuestionIds: [
        'G1A01',
        'G1A02',
        'G1A03',
        'G1A04',
        'G1A05',
        'G1A06',
        'G1A07',
        'G1A08',
        'G1A09',
        'G1A10',
        'G1A11',
      ],
    },
    {
      id: 'G1B',
      title: 'Antenna Structures, Beacons, and Permitted Transmissions',
      content: `# Antenna Structures, Beacons, and “Good Practice” (G1B)

This group mixes rules knowledge: antenna structure limits, beacon rules, what one-way transmissions are allowed, and how the FCC expects you to operate when Part 97 doesn’t spell everything out.

## Antenna Structure Notification Threshold

The pool emphasizes the basic threshold:

- An antenna structure **not near a public use airport** generally does not require FAA notification / FCC registration if it is **200 feet or less** above ground level

## State/Local Regulation (PRB-1 Concept)

State and local governments may regulate amateur antenna structures, but the FCC requires that regulations:

- **Reasonably accommodate** amateur communications, and
- **Not preclude** amateur communications

## Beacon Stations

A beacon station transmits one-way signals primarily for **propagation and reception observation**.

Key beacon rules from the pool:

- No more than **one beacon per band** may transmit from the **same station location**
- Automatically controlled HF beacons are permitted in **28.20-28.30 MHz**
- Beacon power limit: **100 watts PEP output**

## Permitted Transmissions (All Amateur Stations)

The pool calls out one example of a permitted transmission for all amateur stations:

- Occasional retransmission of **weather and propagation forecast information** from **US government stations**

## One-Way Transmissions

One-way transmissions are generally restricted, but one clear permitted category is:

- Transmissions to assist with learning the **International Morse code** (code practice)

Regular broadcasts advertising equipment for sale are not permitted.

## Abbreviations and Procedural Signals

Abbreviations and procedural signals may be used **as long as they do not obscure the meaning** of a message.

## International Communications

You may communicate with amateurs in other countries **except** those whose administrations have notified the **ITU** that they object to such communications.

## “Good Engineering and Good Amateur Practice”

Where Part 97 does not provide specific detail, the pool emphasizes that the **FCC** determines what “good engineering and good amateur practice” means in that context.
`,
      keyPoints: [
        'Antenna structures not near airports typically avoid FAA/FCC notification if 200 feet AGL or less',
        'Local rules must reasonably accommodate amateur radio and not preclude it',
        'Beacons: one per band per location; automatically controlled HF beacons allowed at 28.20-28.30 MHz; 100 W PEP power limit',
        'Permitted transmissions include occasional US government weather/propagation forecast retransmissions',
        'Procedural signals are allowed if they do not obscure meaning; international comms are prohibited only where ITU objections apply',
      ],
      relatedQuestionIds: [
        'G1B01',
        'G1B02',
        'G1B03',
        'G1B04',
        'G1B05',
        'G1B06',
        'G1B07',
        'G1B08',
        'G1B09',
        'G1B10',
        'G1B11',
      ],
    },
    {
      id: 'G1C',
      title: 'Power Limits, Bandwidth, and Digital Protocol Rules',
      content: `# Power Limits, Bandwidth, and Digital Protocols (G1C)

This group emphasizes knowing the correct FCC power measurement, band-specific power limits, and a few important “special band” and “new digital mode” rules.

## What Measurement Regulates Maximum Power?

The FCC rules regulate maximum power as:

- **PEP output from the transmitter**

## Common Power Limits in the Pool

- **30 meters (10.140 MHz): 200 watts PEP**
- **60 meters: 100 watts PEP ERP**
- Most other HF allocations discussed here (including **1.8 MHz**, **12m**, **28 MHz**): generally **1500 watts PEP output** (subject to band/segment exceptions)

## 60-Meter Band Special Rules

The pool calls out three important 60m constraints:

- Maximum permitted **USB bandwidth** is **2.8 kHz**
- Maximum power is **100 watts PEP ERP**
- If you use an antenna **other than a dipole**, you must keep a record of the antenna’s **gain** (to ensure your ERP complies)

## Before Using a New Digital Protocol

Before using a new digital protocol on the air, the FCC requires that you:

- **Publicly document the technical characteristics** of the protocol
`,
      keyPoints: [
        'FCC maximum power is regulated as PEP output from the transmitter',
        '30m (10.140 MHz) is limited to 200 W PEP; 60m is limited to 100 W PEP ERP',
        '60m USB bandwidth is limited to 2.8 kHz and may require recording antenna gain',
        'Most other referenced bands (1.8 MHz, 12m, 28 MHz) are generally 1500 W PEP (subject to exceptions)',
        'New digital protocols must be publicly documented before use on the air',
      ],
      relatedQuestionIds: [
        'G1C01',
        'G1C02',
        'G1C03',
        'G1C04',
        'G1C05',
        'G1C06',
        'G1C07',
        'G1C09',
        'G1C11',
      ],
    },
    {
      id: 'G1D',
      title: 'VE Program, CSCEs, Upgrades, and Remote Operation',
      content: `# VE Program, CSCEs, and Remote Operation (G1D)

This group covers exam administration rules, what a CSCE means for operating privileges, and which jurisdiction’s rules apply in remote control scenarios.

## Volunteer Examiners (VEs)

- VEs are accredited by a **Volunteer Examiner Coordinator (VEC)**
- Minimum age to be a VE: **18**
- A General class VE may administer **Technician and General** exams
- A Technician exam session must be observed by **at least three VEs** who hold **General class or higher**

Non-US citizens may be accredited VEs if they hold an **FCC-granted** amateur license of General class or above (citizenship is not the requirement).

## CSCE (Certificate of Successful Completion of Examination)

- A CSCE is valid for **365 days** for exam element credit
- A Technician with a valid CSCE for General may operate on **any General or Technician class band segment** immediately
- Until the FCC database reflects the upgrade, the Technician must identify with **“/AG”** when using General class privileges

## Credit from an Expired License

The pool emphasizes that **any person** who can demonstrate that they once held an FCC-issued **General, Advanced, or Amateur Extra** class license (that was not revoked) may receive partial credit for the elements represented by that expired license.

If a previously held General license has expired and the two-year grace period has passed, the applicant must show proof of the appropriate expired license grant and pass the current **Element 2** exam.

## Remote Operation: Which Rules Apply?

Two common exam cases:

- If operating a **US station** by remote control from outside the country, the control operator must hold a **US operator/primary station license**
- If operating a station located in **South America** by remote control over the internet from the US, **only the regulations of the remote station’s country** apply
`,
      keyPoints: [
        'VEs are accredited by a VEC; minimum VE age is 18',
        'General-class VEs may administer Technician and General exams; Technician exams require 3+ General-or-higher VEs observing',
        'CSCEs are valid for 365 days and can authorize immediate operation in the new privilege class',
        'Until the FCC database updates, /AG identification is required when using General privileges',
        'Remote control jurisdiction and expired-license credit rules are high-yield in this group',
      ],
      relatedQuestionIds: [
        'G1D01',
        'G1D02',
        'G1D03',
        'G1D04',
        'G1D05',
        'G1D06',
        'G1D07',
        'G1D08',
        'G1D09',
        'G1D10',
        'G1D11',
        'G1D12',
      ],
    },
    {
      id: 'G1E',
      title: 'Third-Party Traffic, Automatic Control, and Special Situations',
      content: `# Third-Party, Automatic Control, and Special Situations (G1E)

This group blends “rules edge cases” that often show up on the General exam: third-party communications, automatic control boundaries, special interference-avoidance requirements, and a few “do not transmit here” facts.

## Third-Party Communications

- A third party whose amateur license has been **revoked and not reinstated** may not participate in sending messages via an amateur station
- Third-party agreements do not allow “anything”: messages must be limited to **amateur radio**, **personal remarks**, or **emergency/disaster relief**
- Digital modes are **not exempt** from third-party rules (there is no “digital loophole”)
- Third-party messages may be transmitted via **remote control** under any circumstances in which third-party messages are permitted by FCC rules

## Cross-Band Retransmission (10m Repeater / 2m Input)

A 10-meter repeater may retransmit a 2-meter signal from a Technician-controlled station **only if** the 10-meter repeater’s control operator holds at least a **General** class license.

## Automatic Control Boundaries

- To communicate with a digital station operating under automatic control **outside** the automatic control segments, the station initiating the contact must be under **local or remote control**
- Automatically controlled RTTY/data stations may communicate with other automatically controlled digital stations:
  - Anywhere on **6 meters and shorter wavelength** bands, and
  - In **limited segments** of some HF bands

## Special Interference-Avoidance Requirements

Certain conditions require specific steps to avoid harmful interference:

- Operating within **one mile** of an FCC monitoring station
- Operating on a band where amateurs are **secondary**
- Transmitting **spread spectrum** emissions

## ITU Region and 2.4 GHz Wi-Fi

- North and South America are in **ITU Region 2**
- An amateur station may communicate with non-licensed Wi-Fi stations in the 2.4 GHz band: **no part** of the band (you may share spectrum, but not communicate with them as stations)

## Spread Spectrum Power and Beacon Frequencies

- Maximum PEP output allowed for spread spectrum transmissions: **10 watts**
- Avoid transmitting on common international beacon frequencies (the pool highlights these): **14.100, 18.110, 21.150, 24.930, 28.200 MHz**
`,
      keyPoints: [
        'Third-party rules apply regardless of mode; revoked amateurs cannot participate as third parties',
        'A 10m repeater may retransmit a 2m Technician signal only if the 10m repeater control operator is General or higher',
        'Outside automatic-control segments, the interrogating station must be locally/remotely controlled',
        'Special interference-avoidance conditions include operating near FCC monitoring sites, on secondary allocations, and with spread spectrum',
        'ITU Region 2 applies in the Americas; spread spectrum max is 10 W PEP; avoid common beacon frequencies',
      ],
      relatedQuestionIds: [
        'G1E01',
        'G1E02',
        'G1E03',
        'G1E04',
        'G1E05',
        'G1E06',
        'G1E07',
        'G1E08',
        'G1E09',
        'G1E10',
        'G1E11',
        'G1E12',
      ],
    },
  ],
}

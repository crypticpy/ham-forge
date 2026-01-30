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
    'Advanced FCC rules and regulations for General class operators, including frequency privileges and operating requirements.',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'G1A',
      title: 'General Class Control Operator Frequency Privileges',
      content: `# General Class Control Operator Frequency Privileges

As a General class licensee, you gain access to significantly more HF spectrum than Technician class operators. Understanding your frequency privileges is essential for legal operation.

## HF Band Privileges

The General class license grants voice (phone) privileges on portions of all HF amateur bands:

- **160 meters (1.8-2.0 MHz)**: Full access
- **80 meters (3.5-4.0 MHz)**: 3.8-4.0 MHz for phone
- **60 meters**: USB only on 5 channelized frequencies
- **40 meters (7.0-7.3 MHz)**: 7.175-7.3 MHz for phone
- **30 meters**: CW and digital only (no phone)
- **20 meters (14.0-14.35 MHz)**: 14.225-14.35 MHz for phone
- **17 meters (18.068-18.168 MHz)**: 18.11-18.168 MHz for phone
- **15 meters (21.0-21.45 MHz)**: 21.275-21.45 MHz for phone
- **12 meters (24.89-24.99 MHz)**: 24.93-24.99 MHz for phone
- **10 meters (28.0-29.7 MHz)**: Full access

## Key Differences from Technician

General class operators have:
- More phone spectrum on 80, 40, 20, 15, and 12 meters
- Access to additional digital and CW portions
- Full 160-meter band privileges

\`\`\`
Example: On 40 meters
- Extra class: 7.125-7.3 MHz phone
- General class: 7.175-7.3 MHz phone
- Technician: No phone privileges (CW only 7.025-7.125)
\`\`\`
`,
      keyPoints: [
        'General class has phone privileges on all HF bands except 30m',
        'Extra class operators have slightly wider frequency access',
        '30 meters is CW and digital only - no phone allowed',
        '60 meters uses channelized frequencies with USB only',
        'Know the phone sub-band edges for each band',
      ],
      relatedQuestionIds: ['G1A01', 'G1A02', 'G1A03', 'G1A04', 'G1A05'],
    },
    {
      id: 'G1B',
      title: 'Antenna Structure Limitations',
      content: `# Antenna Structure Limitations

Amateur radio antenna installations are subject to various regulations at federal, state, and local levels. Understanding these rules helps you install antennas legally.

## FAA Notification Requirements

The FCC requires notification to the FAA for antenna structures that:
- Exceed 200 feet above ground level
- Are near airports (varies by proximity and runway length)
- May affect air navigation

## PRB-1 Federal Preemption

The FCC's **PRB-1** ruling provides limited federal preemption of local antenna regulations:

- Local governments must **reasonably accommodate** amateur radio communications
- Regulations cannot **preclude** amateur communications
- Amateurs must still comply with reasonable local rules
- Does NOT apply to CC&Rs (deed restrictions) by HOAs

## Environmental Considerations

Before installing antennas, consider:
- **RF exposure**: Must comply with FCC OET Bulletin 65 guidelines
- **Environmental impact**: Large installations may require environmental assessment
- **Historic preservation**: Certain areas have additional restrictions

## Practical Tips

- Document your antenna's compliance with local codes
- Consider working with neighbors before installation
- Use PRB-1 as a tool for negotiation, not confrontation
- HOA restrictions may require alternative solutions (stealth antennas)
`,
      keyPoints: [
        'FAA notification required for structures over 200 feet or near airports',
        'PRB-1 requires local governments to reasonably accommodate amateur radio',
        'PRB-1 does NOT override HOA deed restrictions',
        'RF exposure must comply with FCC OET Bulletin 65',
        'Environmental assessments may be required for large installations',
      ],
      relatedQuestionIds: ['G1B01', 'G1B02', 'G1B03', 'G1B04'],
    },
    {
      id: 'G1C',
      title: 'Transmitter Power Regulations',
      content: `# Transmitter Power Regulations

The FCC regulates the maximum power amateur stations may use. Understanding these limits and when to reduce power is important for legal and courteous operation.

## Maximum Power Limits

General maximum power is **1500 watts PEP** (Peak Envelope Power) output, but several bands have lower limits:

- **60 meters**: 100 watts PEP ERP (Effective Radiated Power)
- **30 meters**: 200 watts PEP
- **Novice/Tech HF segments**: 200 watts PEP

## Minimum Power Rule

The FCC requires amateurs to use the **minimum power necessary** to carry out the desired communication. This means:

- Don't run full power when less will work
- Reduce power during local contacts
- Consider band conditions and distance

## Power Measurement

- **PEP (Peak Envelope Power)**: Maximum power during a modulation cycle
- **Average power**: For CW and FM, PEP equals average power
- **ERP (Effective Radiated Power)**: Accounts for antenna gain

## Beacon Stations

Beacon stations have specific power limits:
- 10 meters and below: 100 watts PEP
- Above 10 meters: Varies by frequency
`,
      keyPoints: [
        'Maximum power is generally 1500 watts PEP output',
        '60 meters limited to 100 watts PEP ERP',
        '30 meters limited to 200 watts PEP',
        'Always use minimum power necessary for communication',
        'Beacon stations have specific lower power limits',
      ],
      relatedQuestionIds: ['G1C01', 'G1C02', 'G1C03', 'G1C04'],
    },
    {
      id: 'G1D',
      title: 'Volunteer Examiner Program',
      content: `# Volunteer Examiner Program

The Volunteer Examiner (VE) program allows licensed amateurs to administer FCC amateur radio exams. As a General class operator, you can become a VE.

## VE Requirements

To become a Volunteer Examiner:
- Hold a General class license or higher
- Be at least 18 years old
- Not have had your license revoked
- Be accredited by a Volunteer Examiner Coordinator (VEC)

## What VEs Can Do

Volunteer Examiners:
- Administer exams for licenses **up to their own class**
- General VEs can give Technician and General exams
- Extra VEs can give all three exam elements
- Must have at least 3 VEs for an exam session

## VEC Organizations

Common Volunteer Examiner Coordinators include:
- ARRL VEC
- W5YI VEC
- Laurel VEC (offers free exams)

## Exam Session Requirements

- Minimum of 3 accredited VEs present
- VEs cannot administer exams to family members
- Exams use questions from the official question pool
- Results reported to FCC electronically
`,
      keyPoints: [
        'General class holders can become VEs at age 18+',
        'VEs can administer exams up to their own license class',
        'At least 3 VEs required for an exam session',
        'VEs cannot examine family members',
        'VEC coordinates and reports exam results to FCC',
      ],
      relatedQuestionIds: ['G1D01', 'G1D02', 'G1D03', 'G1D04'],
    },
    {
      id: 'G1E',
      title: 'Control Operator and Station Requirements',
      content: `# Control Operator and Station Requirements

Understanding control operator responsibilities and third-party traffic rules is essential for proper amateur radio operation.

## Control Operator Responsibilities

The control operator:
- Is responsible for proper station operation
- Must be present at the control point (or use remote control)
- Determines the operating privileges in use
- Is accountable for all transmissions

## Third-Party Traffic

Third-party traffic allows non-licensed persons to communicate through your station:
- Must have a control operator present
- Control operator is responsible for content
- Not all countries allow third-party traffic
- **No third-party traffic** with most countries

## Countries Allowing Third-Party Traffic

The US has third-party agreements with:
- Canada, Mexico, and most Central/South American countries
- Several Caribbean nations
- Limited countries in other regions

## Remote Control Operation

Stations may be operated remotely if:
- Control operator has access to turn off transmitter
- Proper station identification is maintained
- Operator can monitor transmissions
`,
      keyPoints: [
        'Control operator responsible for all transmissions',
        'Third-party traffic requires control operator presence',
        'Not all countries allow third-party amateur traffic',
        'Remote control requires ability to shut down transmitter',
        'Know which countries have US third-party agreements',
      ],
      relatedQuestionIds: ['G1E01', 'G1E02', 'G1E03', 'G1E04', 'G1E05'],
    },
  ],
}

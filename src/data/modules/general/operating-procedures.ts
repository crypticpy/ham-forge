/**
 * G2 - Operating Procedures Module
 * General Class Amateur Radio License
 */

import type { LearningModule } from '@/types/learning'

export const operatingProceduresModule: LearningModule = {
  id: 'G2',
  examLevel: 'general',
  title: 'Operating Procedures',
  description:
    'HF operating procedures including phone, CW, and digital modes, along with net operations, DX techniques, and operating courtesy.',
  estimatedMinutes: 55,
  sections: [
    {
      id: 'G2A',
      title: 'Phone Operating Procedures',
      content: `# Phone Operating Procedures

Effective phone operation on the HF bands requires understanding sideband conventions, proper calling techniques, and equipment setup. These practices help ensure clear, interference-free communications.

## Sideband Conventions

Single sideband (SSB) is the predominant voice mode on HF amateur bands because it uses less bandwidth and is more power-efficient than other analog voice modes. By convention, amateur operators use:

- **Lower Sideband (LSB)**: 160 meters, 75/80 meters, and 40 meters
- **Upper Sideband (USB)**: 20 meters and above (17m, 15m, 12m, 10m), plus VHF/UHF SSB

This convention is simply accepted amateur practice - there is no technical advantage to either sideband, and no FCC regulation mandating it. However, following the convention ensures you can communicate with other stations.

## Calling and Breaking In

When calling CQ (seeking any contact), repeat "CQ" a few times, say "this is," give your call sign a few times, then pause to listen. Repeat as necessary. When answering a CQ or breaking into an existing QSO, the recommended practice is simply to **say your call sign once** during a pause. Avoid CB-style phrases like "Breaker Breaker" or saying "QRZ" repeatedly.

For DX contacts, if a station in the contiguous 48 states calls "CQ DX," they are seeking contacts with stations **outside** the lower 48 states - including Alaska, Hawaii, US territories, and foreign countries. Stations within the lower 48 should not respond to CQ DX calls from other lower-48 stations.

## Equipment Setup

**VOX (Voice Operated Transmit)** automatically keys your transmitter when you speak, allowing hands-free operation. This is particularly useful when logging contacts or adjusting equipment during a QSO.

**ALC (Automatic Level Control)** prevents overdriving your transmitter. Set the ALC properly by adjusting the **transmit audio or microphone gain** while speaking normally into the microphone. Watch the ALC meter - you want some ALC action but not excessive.
`,
      keyPoints: [
        'LSB is used on 160m, 75/80m, and 40m; USB on 20m and above',
        'SSB uses less bandwidth and is more power-efficient than other voice modes',
        'Break into a contact by saying your call sign once',
        'CQ DX from lower-48 stations seeks contacts outside the contiguous states',
        'Adjust microphone gain to set proper ALC levels',
      ],
      relatedQuestionIds: [
        'G2A01',
        'G2A02',
        'G2A03',
        'G2A04',
        'G2A05',
        'G2A06',
        'G2A07',
        'G2A08',
        'G2A09',
        'G2A10',
        'G2A11',
        'G2A12',
      ],
    },
    {
      id: 'G2B',
      title: 'Operating Courtesy and Nets',
      content: `# Operating Courtesy and Nets

Amateur radio is a shared resource, and operating courtesy ensures everyone can enjoy the bands. Understanding frequency etiquette, net operations, and emergency procedures is essential for General class operators.

## Frequency Access and Courtesy

A fundamental principle of amateur radio is that **no amateur station has priority access to any frequency** except during emergencies. This means nets do not have permanent ownership of frequencies, and contest stations should share with non-contest operations. When interference occurs due to propagation changes, the proper approach is to **resolve the problem with other stations in a mutually acceptable manner** rather than claiming priority.

Before calling CQ, check if the frequency is in use by sending "QRL?" on CW or asking "Is the frequency in use?" on phone, followed by your call sign. For proper frequency separation, maintain:
- **150-500 Hz** minimum separation for CW
- **2-3 kHz** minimum separation for SSB

## Net Operations

Good net management includes having a **backup frequency** ready in case of interference or poor conditions. Following the **voluntary band plan** helps organize activity - for example, the 50.1-50.125 MHz segment is reserved for contacts with stations outside the contiguous 48 states.

When you hear a station in distress break in during your contact, immediately **acknowledge the distress station and determine what assistance may be needed**. Emergency communications always take priority.

## RACES Operations

The Radio Amateur Civil Emergency Service (RACES) provides communications during civil defense emergencies. Only **FCC-licensed amateur operators** may be control operators of RACES stations. RACES training drills and tests may be conducted for **no more than one hour per week** without special authorization.
`,
      keyPoints: [
        'No station has priority access to any frequency except during emergencies',
        'Check if frequency is in use with "QRL?" (CW) or ask verbally (phone)',
        'CW needs 150-500 Hz separation; SSB needs 2-3 kHz separation',
        'Acknowledge distress calls immediately and offer assistance',
        'RACES drills limited to 1 hour per week without authorization',
      ],
      relatedQuestionIds: [
        'G2B01',
        'G2B02',
        'G2B03',
        'G2B04',
        'G2B05',
        'G2B06',
        'G2B07',
        'G2B08',
        'G2B09',
        'G2B10',
        'G2B11',
      ],
    },
    {
      id: 'G2C',
      title: 'CW Operating Procedures',
      content: `# CW Operating Procedures

Morse code (CW) remains popular on the amateur bands due to its efficiency and ability to get through when other modes fail. Understanding CW procedures, prosigns, and Q signals is important for HF operation.

## Full Break-In (QSK)

Full break-in operation, indicated by "QSK," means the transmitting station can **receive between code characters and elements**. This allows for immediate interruption if needed, making CW QSOs more conversational. The station's receiver is active except during the actual transmission of dits and dahs.

## Speed and Zero Beat

When answering a CQ in Morse code, send at the **fastest speed at which you are comfortable copying, but no faster than the CQ**. This ensures you can copy the reply. If the other station sends "QRS?" they are asking you to **send slower**.

**Zero beat** means matching your transmit frequency to the frequency of a received signal. This is important because it ensures both stations are on the same frequency for effective two-way communication.

## Prosigns and Q Signals

Common CW prosigns include:
- **KN**: Listening only for a specific station (go ahead, named station only)
- **AR**: End of formal message
- **BK**: Invite other station to transmit (break)
- **SK**: End of contact (silent key/signing off)

Essential Q signals for CW operation:
- **QRL?**: "Is this frequency in use?"
- **QRS**: "Send slower"
- **QSL**: "I have received and understood"
- **QRN**: "I am troubled by static"
- **QRV**: "I am ready to receive"

## RST Reports

CW signal reports use the RST system: Readability, Strength, and Tone. Adding a **"C"** to the RST report indicates a **chirpy or unstable signal** - a transmitter problem the other station should address.
`,
      keyPoints: [
        'QSK (full break-in) allows receiving between code characters',
        'Answer CQ at your comfortable speed, no faster than the calling station',
        'Zero beat means matching your transmit frequency to the received signal',
        'KN means listening for a specific station only; AR ends a formal message',
        '"C" added to RST indicates a chirpy or unstable signal',
      ],
      relatedQuestionIds: [
        'G2C01',
        'G2C02',
        'G2C03',
        'G2C04',
        'G2C05',
        'G2C06',
        'G2C07',
        'G2C08',
        'G2C09',
        'G2C10',
        'G2C11',
      ],
    },
    {
      id: 'G2D',
      title: 'DX and General HF Operations',
      content: `# DX and General HF Operations

Working DX (distant stations) and participating in HF activities like contests requires specific knowledge and techniques. Understanding propagation paths, proper identification, and operating practices will help you succeed.

## Calling CQ and Making Contacts

To seek a contact with any station on HF, **repeat "CQ" a few times, followed by "this is," then your call sign a few times, then pause to listen**. Repeat as necessary. Signal reports are exchanged at the beginning of a contact to **allow each station to operate according to conditions** - you might need to slow down, increase power, or try a different frequency.

Use the **NATO phonetic alphabet** (Alpha, Bravo, Charlie, Delta...) when spelling out call signs and other information. This internationally recognized system ensures accuracy across language barriers and through noise.

## DX Techniques

An **azimuthal projection map** centered on your location shows true bearings and distances to any point on Earth. This is essential for pointing directional antennas toward DX stations.

For **long-path contacts**, point your directional antenna **180 degrees from the station's short-path heading**. Sometimes the long path provides better propagation than the direct short path, especially near sunrise/sunset along the propagation path.

## Volunteer Monitor Program

The Volunteer Monitor Program consists of **amateur volunteers formally enlisted to monitor the airwaves for rules violations**. This ARRL-administered program replaced the old Official Observer program. Its objective is to **encourage amateur radio operators to self-regulate and comply with the rules**. Volunteer Monitors may localize interfering stations by comparing beam headings on a repeater input from multiple locations.

## Logging and QRP

Many amateurs keep a station log to **help with a reply if the FCC requests information about your station**. While logging is no longer required by the FCC, it provides valuable documentation.

**QRP operation** means **low-power transmit operation**, typically 5 watts or less for CW and 10 watts or less for SSB. QRP operators enjoy the challenge of making contacts with minimal power.

During contests, you must **identify your station according to normal FCC regulations** - at least every 10 minutes and at the end of each communication.
`,
      keyPoints: [
        'Call CQ by repeating it a few times, then your call sign, then listen',
        'Azimuthal maps show true bearings and distances from your location',
        'Long-path: point antenna 180 degrees from short-path heading',
        'QRP means low-power operation (typically 5W CW, 10W SSB or less)',
        'Keep a log to help respond to FCC inquiries about your station',
      ],
      relatedQuestionIds: [
        'G2D01',
        'G2D02',
        'G2D03',
        'G2D04',
        'G2D05',
        'G2D06',
        'G2D07',
        'G2D08',
        'G2D09',
        'G2D10',
        'G2D11',
      ],
    },
    {
      id: 'G2E',
      title: 'Digital Mode Operations',
      content: `# Digital Mode Operations

Digital modes have revolutionized amateur radio, enabling worldwide communication with modest stations. Understanding the various protocols, their requirements, and proper operating procedures is essential for modern HF operation.

## RTTY (Radioteletype)

RTTY is one of the oldest digital modes. When using AFSK (Audio Frequency Shift Keying) with an SSB transmitter, RTTY conventionally uses **LSB** (unlike most other digital modes). The most common frequency shift for HF RTTY is **170 Hz** between mark and space tones.

If you cannot decode an RTTY signal even when apparently tuned correctly, check that:
- Mark and space frequencies are not reversed
- You have selected the correct baud rate
- You are listening on the correct sideband

## FT8, FT4, JT65, and JT9

These weak-signal digital modes developed by Joe Taylor (K1JT) use **USB** for AFSK operation. FT8 has become extremely popular due to its ability to complete contacts with signals well below the noise floor.

FT8 operation requires:
- **Computer time accurate to within approximately 1 second** (use internet time synchronization)
- Proper audio levels between computer and transceiver
- The WSJT-X software or compatible program

On 20 meters, FT8 activity is concentrated around **14.074-14.077 MHz**. When answering a CQ in FT8, find a **clear frequency during the alternate time slot** to the calling station. This prevents interference since FT8 uses alternating 15-second transmit/receive periods.

## Digital Messaging Systems

**Winlink** is an amateur radio wireless network for sending and receiving email over the internet. It operates on both VHF and HF bands and uses various protocols including Packet Radio. A Winlink Remote Message Server is also called a **Gateway**. To connect, **transmit a connect message on the station's published frequency**.

**VARA** is a digital protocol commonly used with Winlink, providing good throughput even in poor conditions.

**PACTOR** is a robust protocol for HF digital messaging. It's a **point-to-point protocol limited to two stations** - you cannot join an existing PACTOR connection. Interference with PACTOR or VARA transmissions can cause frequent retries, timeouts, long pauses, and connection failures.

**AREDN (Amateur Radio Emergency Data Network)** provides **high-speed data services during emergencies or community events** using mesh networking technology.

Most digital mode operations on 20 meters are found between **14.070 MHz and 14.100 MHz**.
`,
      keyPoints: [
        'RTTY uses LSB with AFSK; 170 Hz is the standard frequency shift',
        'FT8/FT4/JT65/JT9 use USB and require accurate computer time (within 1 second)',
        'Answer FT8 CQs on a clear frequency during the alternate time slot',
        'PACTOR is limited to two stations - cannot join existing connections',
        'Winlink gateways provide email over amateur radio on VHF and HF',
      ],
      relatedQuestionIds: [
        'G2E01',
        'G2E02',
        'G2E03',
        'G2E04',
        'G2E05',
        'G2E06',
        'G2E07',
        'G2E08',
        'G2E09',
        'G2E10',
        'G2E11',
        'G2E12',
        'G2E13',
        'G2E14',
        'G2E15',
      ],
    },
  ],
}

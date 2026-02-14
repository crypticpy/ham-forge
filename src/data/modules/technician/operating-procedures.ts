/**
 * T2 - Operating Procedures
 * Learning module for VHF/UHF operating practices including repeaters, simplex, and emergency communications
 *
 * Enhanced with visual structure, callouts, and interactive element markers
 */

import type { LearningModule } from '@/types/learning'

export const operatingProceduresModule: LearningModule = {
  id: 'T2',
  examLevel: 'technician',
  title: 'Operating Procedures',
  description:
    'VHF/UHF operating practices including repeaters, simplex, and emergency communications.',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'T2A',
      title: 'Station Operation - Frequencies, Modes, and Calling',
      content: `# Station Operation Basics

Understanding basic station operation is essential for effective amateur radio communication. This section covers calling procedures, repeater operation, and frequency coordination.

---

## Making Your First Contact

:::definition CQ - Calling Any Station
**CQ** is the procedural signal meaning "calling any station." Use it when you want to make contact with anyone who might be listening.

Example: "CQ CQ CQ, this is W1ABC calling CQ"
:::

:::warning Before Calling CQ
Always complete these three steps:
1. **Listen** to make sure the frequency is clear
2. **Ask** if the frequency is in use ("Is this frequency in use?")
3. **Verify** you are authorized to use that frequency
:::

### Responding to Calls

:::tip How to Respond
When responding to a station calling CQ, transmit:
- **The other station's call sign first**
- **Followed by your call sign**

Example: "W1ABC, this is K2XYZ"
:::

---

## Repeater Operations

Repeaters extend the range of VHF/UHF communications by receiving on one frequency and retransmitting on another.

:::definition Repeater Offset
The **offset** is the difference between the repeater's transmit and receive frequencies. Your radio transmits on the input frequency and listens on the output frequency.
:::

### Standard Repeater Offsets

| Band | Frequency Range | Standard Offset |
|------|-----------------|-----------------|
| 2 meters | 144-148 MHz | **+/- 600 kHz** |
| 70 centimeters | 420-450 MHz | **+/- 5 MHz** |

:::radio Key Frequency to Memorize
**146.520 MHz** is the national calling frequency for FM simplex operations on the 2-meter band. This is an important frequency to know!
:::

### Repeater Procedures

| Action | What to Say |
|--------|-------------|
| Calling someone | Their call sign, then yours |
| Monitoring | Your call sign + "monitoring" |
| Making test transmissions | Always identify your station |

---

## Simplex vs. Repeater Operation

:::definition Simplex Operation
**Simplex** means transmitting and receiving on the **same frequency** without using a repeater. Both stations must be within direct range of each other.
:::

| Mode | How It Works | When to Use |
|------|--------------|-------------|
| Simplex | Same TX/RX frequency | Direct, short-range contacts |
| Repeater | Different TX/RX frequencies | Extended range via repeater |

---

## Band Plans

:::info Voluntary Guidelines
**Band plans** are voluntary guidelines for using different modes or activities within an amateur band. They help operators coordinate spectrum use and avoid interference.

While not legally required, following band plans is good amateur practice!
:::`,
      keyPoints: [
        'CQ means "calling any station" - listen first, ask if frequency is in use, and verify authorization before calling',
        '2-meter repeater offset is plus or minus 600 kHz; 70-cm offset is plus or minus 5 MHz',
        'National 2-meter FM simplex calling frequency is 146.520 MHz',
        'Simplex means transmitting and receiving on the same frequency',
        'Band plans are voluntary guidelines for organizing mode and activity usage within amateur bands',
      ],
      relatedQuestionIds: [
        'T2A01',
        'T2A02',
        'T2A03',
        'T2A04',
        'T2A05',
        'T2A06',
        'T2A07',
        'T2A08',
        'T2A09',
        'T2A10',
        'T2A11',
        'T2A12',
      ],
      interactiveComponents: ['qso-trainer', 'rst-trainer'],
    },
    {
      id: 'T2B',
      title: 'VHF/UHF Operating Practices - Repeaters and Simplex',
      content: `# VHF/UHF Operating Practices

Effective VHF/UHF operation requires understanding several technical concepts that control how your radio accesses repeaters and communicates with other stations.

---

## Squelch and Tone Systems

:::definition Squelch
The **squelch** function mutes the receiver audio when no signal is present, eliminating the noise between transmissions. Adjust it so noise is silenced but weak signals still break through.
:::

### Access Tone Systems

| System | Full Name | Purpose |
|--------|-----------|---------|
| **CTCSS** | Continuous Tone-Coded Squelch System | Sub-audible tone transmitted with voice to open repeater squelch |
| **DCS** | Digital-Coded Squelch | Digital code for selective repeater access |
| **DTMF** | Dual-Tone Multi-Frequency | Pairs of audio tones for repeater control functions |

:::info How CTCSS Works
CTCSS transmits a **sub-audible tone** (below normal hearing range) along with your voice audio. The repeater only opens its squelch when it detects the correct tone, filtering out unwanted signals.
:::

---

## Troubleshooting Repeater Access

:::warning Can Hear But Can't Access?
If you can hear a repeater's output but cannot access it, check these three things:

1. **Improper transceiver offset** - Wrong TX frequency
2. **Wrong CTCSS tone** - Repeater won't open
3. **Wrong DCS code** - Digital squelch not matched
:::

### Using the Reverse Function

:::tip The Reverse Function
Your radio's **"reverse"** function allows you to listen on a repeater's **input frequency**. This is useful for:
- Checking if you can hear stations directly
- Determining if simplex might work
- Troubleshooting repeater access issues
:::

---

## Audio Quality

:::warning Distorted Audio
If your FM transmission audio sounds distorted on voice peaks, you are probably **talking too loudly** into the microphone.

**Solution:** Hold the mic a few inches away and speak at a normal volume.
:::

---

## Digital Repeaters and Linked Systems

### Linked Repeater Networks

:::radio Extended Coverage
**Linked repeaters** connect multiple repeaters so that signals received by one are transmitted by all repeaters in the network. This greatly extends communication range across regions or even states!
:::

### DMR Digital Systems

| Concept | Description |
|---------|-------------|
| **Color Code** | Like CTCSS for DMR - must match the repeater |
| **Talkgroup** | Virtual "channel" - program the group ID to join |

:::info DMR Access
To access a DMR repeater:
1. Program the correct **color code** (typically 1-15)
2. Program the **talkgroup ID** you want to join
3. Both must match for successful access
:::

---

## Interference and Frequency Coordination

:::definition Simplex Channels
**Simplex channels** are designated in band plans so stations within range of each other can communicate **without tying up a repeater**.
:::

### When Stations Interfere

:::tip Resolving Conflicts
When two stations interfere with each other on the same frequency, they should **negotiate continued use of the frequency**. Work it out cooperatively!
:::

---

## Essential Q Signals

| Q Signal | Meaning | Memory Aid |
|----------|---------|------------|
| **QRM** | Interference from other stations | "RM" = Radio Mess |
| **QSY** | Changing frequency | "SY" = Shift Yourself |

:::radio Quick Reference
- "I'm experiencing QRM" = Other stations are interfering
- "Let's QSY to 146.55" = Let's change to that frequency
:::`,
      keyPoints: [
        'Squelch mutes receiver audio when no signal is present; CTCSS uses sub-audible tones for selective access',
        'Cannot access a repeater you can hear? Check offset, CTCSS tone, or DCS code settings',
        'The "reverse" function lets you listen on a repeater input frequency to check direct signal paths',
        'DMR color codes must match the repeater for access; talkgroups require programming the group ID',
        'QRM means interference from other stations; QSY means changing frequency',
      ],
      relatedQuestionIds: [
        'T2B01',
        'T2B02',
        'T2B03',
        'T2B04',
        'T2B05',
        'T2B06',
        'T2B07',
        'T2B08',
        'T2B09',
        'T2B10',
        'T2B11',
        'T2B12',
        'T2B13',
      ],
      interactiveComponents: ['q-code-reference'],
    },
    {
      id: 'T2C',
      title: 'Public Service and Emergency Communications',
      content: `# Public Service and Emergency Communications

Amateur radio plays a vital role in public service and emergency communications. This section covers the organizations, rules, and procedures that make amateur radio an essential resource during emergencies.

---

## Emergency Organizations

### ARES - Amateur Radio Emergency Service

:::definition ARES
**ARES** (Amateur Radio Emergency Service) is a group of licensed amateurs who have **voluntarily registered** their qualifications and equipment for communications duty in the public service.

- Organized by the ARRL
- Local groups train and prepare together
- Activated during emergencies and public events
:::

### RACES - Radio Amateur Civil Emergency Service

:::definition RACES
**RACES** (Radio Amateur Civil Emergency Service) is an FCC Part 97 amateur radio service specifically for **civil defense communications** during national emergencies.

- Operates under government direction
- Activated by civil defense authorities
- Separate from ARES but members often overlap
:::

| Organization | Purpose | Activation |
|--------------|---------|------------|
| ARES | Public service communications | Local emergencies, events |
| RACES | Civil defense communications | National emergencies |

---

## Emergency Operating Rules

:::warning FCC Rules Always Apply
FCC rules always apply to amateur station operation, **even during emergencies** or when operating under ARES or RACES.
:::

### The Critical Exception

:::radio Life Safety Exception
Amateur station control operators are permitted to **operate outside the frequency privileges of their license class** in situations involving:

- **Immediate safety of human life**
- **Protection of property**

This ensures getting help is always the priority!
:::

---

## Net Operations

:::definition What is a Net?
A **net** is an organized on-air meeting that facilitates orderly communication among multiple stations. Nets are used for:
- Emergency communications
- Traffic handling (message passing)
- Training exercises
- Club activities
:::

### The Net Control Station (NCS)

:::info NCS Responsibilities
The **Net Control Station** (NCS):
- Calls the net to order
- Directs communications between stations
- Maintains order and efficiency
- Prioritizes emergency traffic
:::

### Net Participation Rules

| Situation | What to Do |
|-----------|------------|
| Normal operation | Transmit only when directed by NCS |
| Emergency traffic | You may break in to report it |
| Checking in | Wait for NCS to call for check-ins |

:::tip Standard Practice
During net operations, **transmit only when directed by the net control station** - unless you are reporting an emergency!
:::

---

## Traffic Handling

:::definition Traffic
In net operations, **"traffic"** refers to messages exchanged by net stations. These are formal messages passed from station to station.
:::

### Good Traffic Handling

:::warning Pass Messages Exactly
Good traffic handling means **passing messages exactly as received** without:
- Making changes
- Deciding if they're "worthy"
- Summarizing or paraphrasing

Your job is accurate relay, not editorial judgment!
:::

### The Phonetic Alphabet

:::tip Spelling Accuracy
To ensure unusual words are received correctly, **use the standard phonetic alphabet** to spell them out.

Example: "SMITH" = "Sierra Mike India Tango Hotel"
:::

---

## Radiogram Format

Formal traffic messages follow a standard format with specific components:

### Message Components

| Part | Purpose |
|------|---------|
| **Preamble** | Information needed to track the message |
| **Address** | Who receives the message |
| **Text** | The actual message content |
| **Signature** | Who sent the message |

:::definition The Check
The **"check"** in a radiogram header indicates the **number of words or word equivalents** in the text portion of the message.

Example: A check of "12" means the message text contains 12 words.
:::`,
      keyPoints: [
        'ARES is volunteers registered for public service communications; RACES is for civil defense during national emergencies',
        'FCC rules always apply, but operators may exceed license privileges for immediate safety of life or property',
        'Net Control Station directs traffic; transmit only when directed unless reporting an emergency',
        'Good traffic handling means passing messages exactly as received without editing',
        'Use the phonetic alphabet for unusual words; "check" in a radiogram is the word count of the message text',
      ],
      relatedQuestionIds: [
        'T2C01',
        'T2C02',
        'T2C03',
        'T2C04',
        'T2C05',
        'T2C06',
        'T2C07',
        'T2C08',
        'T2C09',
        'T2C10',
        'T2C11',
      ],
      interactiveComponents: ['phonetic-trainer'],
    },
  ],
}

/**
 * T1 - Commission's Rules
 * Learning module for FCC rules and regulations governing amateur radio
 *
 * Enhanced with visual structure, callouts, and interactive element markers
 */

import type { LearningModule } from '@/types/learning'

export const commissionRulesModule: LearningModule = {
  id: 'T1',
  examLevel: 'technician',
  title: "Commission's Rules",
  description:
    'FCC regulations governing amateur radio operations, including licensing, frequency privileges, station identification, station control, and permitted communications.',
  estimatedMinutes: 55,
  sections: [
    {
      id: 'T1A',
      title: 'Basis, Definitions, Coordinators, and Interference',
      content: `# FCC & the Amateur Service (T1A)

This section covers why the Amateur Radio Service exists, who regulates it, and a few key FCC definitions that show up early on the Technician exam.

---

## Basis and Purpose (Part 97.1)

:::info The Five Purposes (high-yield)
1. **Advancing the radio art** (technical innovation)
2. **Trained operator pool** (skilled communicators)
3. **Technical investigation** (self-training and experimentation)
4. **Emergency communications** (backup when systems fail)
5. **International goodwill** (friendly international contacts)
:::

---

## Who Regulates Amateur Radio?

:::definition Regulator
In the United States, the **FCC** (Federal Communications Commission) regulates and enforces Amateur Radio Service rules.
:::

---

## License Grants and Proof of Licensing

:::warning One license grant per person
You may hold **only one** operator/primary station license grant.
:::

:::tip Proof of grant
The practical proof that your license has been granted is that it appears in the **FCC license database (ULS)**.
:::

---

## Phonetics and Identification

:::info Phonetic alphabet
The FCC rules **do not require** a phonetic alphabet for identification, but you **may** use standard phonetics anytime it helps clarity.
:::

---

## FCC Definitions You Must Know

:::definition Beacon
A **beacon** is an amateur station transmitting **one-way signals** for the purpose of observing **propagation** and reception.
:::

:::definition Space Station
A **space station** is an amateur station located **above the Earth’s surface** (for example, an amateur satellite).
:::

---

## Frequency Coordination (Repeaters and Auxiliary Stations)

Frequency coordinators help repeaters and auxiliary stations coexist by recommending transmit/receive channels and technical parameters.

:::tip How coordinators are chosen
A **frequency coordinator is selected by local amateurs** (not by the FCC).
:::

---

## RACES and Interference

:::radio RACES
**RACES** (Radio Amateur Civil Emergency Service) is an FCC-defined service for **civil defense** communications during national emergencies.
:::

:::warning Willful interference
Willful interference to other amateur stations is **never permitted**.
:::`,
      keyPoints: [
        'The FCC regulates and enforces Amateur Radio Service rules in the United States',
        'Part 97.1 lists five purposes of amateur radio (high-yield)',
        'You may hold only one operator/primary station license grant',
        'A beacon is one-way propagation/reception observation; a space station is located above Earth’s surface',
        'Frequency coordinators are selected by local amateurs; willful interference is never permitted',
      ],
      relatedQuestionIds: [
        'T1A01',
        'T1A02',
        'T1A03',
        'T1A04',
        'T1A05',
        'T1A06',
        'T1A07',
        'T1A08',
        'T1A09',
        'T1A10',
        'T1A11',
      ],
    },
    {
      id: 'T1B',
      title: 'Frequency Privileges and Band Plans',
      content: `# Technician Frequency Privileges

As a Technician class licensee, you have access to many amateur radio bands!

---

## VHF/UHF Privileges (Full Access)

:::tip Full Privileges Above 30 MHz
Technicians have **full privileges** on all amateur frequencies above 30 MHz. This includes the most popular bands for local communications!
:::

:::info SSB above 50 MHz
SSB phone may be used in at least some segment of **all amateur bands above 50 MHz** (subject to band plans and local practice).
:::

### Popular Technician Bands

| Band | Frequency Range | Common Uses |
|------|-----------------|-------------|
| 6 meters | 50-54 MHz | "Magic band" - occasional long-distance |
| 2 meters | 144-148 MHz | Most popular! Repeaters, simplex |
| 70 cm | 420-450 MHz | Repeaters, digital modes |
| 23 cm | 1240-1300 MHz | Weak signal, ATV |

---

## Quick Band Facts (Exam Favorites)

:::radio National Calling Frequency
**146.520 MHz** is the national calling frequency for **2-meter FM simplex**.
:::

:::info Band and Segment Identifiers
- **6 meters** includes frequencies like **52.525 MHz**
- **2 meters** includes **146.520 MHz**
- The **219-220 MHz** segment of the 1.25-meter band is limited to **fixed digital message forwarding systems**
:::

:::tip ISS Contacts
Any amateur holding a **Technician class or higher** license may contact the **International Space Station (ISS)** on VHF bands (when active and in range).
:::

---

## HF Privileges (Limited)

Technicians also have limited HF privileges:

:::info HF Access
- **CW (Morse code)** on portions of 80, 40, and 15 meters
- **CW, RTTY, and data** on a portion of 10 meters
- **SSB voice** on 10 meters (28.300-28.500 MHz) with up to 200 watts PEP
:::

:::warning 10 Meters is Special
When 10 meters is "open" during solar cycle peaks, Technicians can make worldwide voice contacts! This is a great reason to get on HF.
:::

---

## CW-Only Segments and Secondary Allocations

:::info CW-only slices (high-yield)
Some small portions of VHF bands are limited to **CW only**. The Technician pool commonly emphasizes:
- **50.0-50.1 MHz**
- **144.0-144.1 MHz**
:::

:::warning Secondary user responsibilities
On band segments where amateurs are **secondary**, you must:
- **Not cause harmful interference** to primary users, and
- **Accept interference** from primary users.
:::

:::tip Avoid band edges
Don’t set your transmit frequency exactly on a band edge. Real signals have bandwidth and radios can drift; leaving margin helps prevent accidental out-of-band operation.
:::

---

## Power Limits (Technician Exam)

:::info Power limits you should memorize
- On Technician HF segments, the maximum is **200 watts PEP**.
- Above **30 MHz**, the general amateur limit is **1500 watts PEP** (with specific band/segment exceptions).
:::

---

## Band Plans

:::definition Band Plan
A **band plan** is a voluntary agreement among operators about how to use different portions of each band. They help prevent interference.
:::

### Key Band Plan Points

- Band plans are **voluntary**, not FCC mandates
- They designate areas for different activities
- Following them makes you a good operator

### Example: 2 Meter Band Plan

| Frequency | Designated Use |
|-----------|----------------|
| 144.00-144.10 MHz | Weak signal (CW/SSB) |
| 144.10-144.20 MHz | Weak signal (SSB) |
| 144.20-144.275 MHz | Local nets, experiments |
| 145.20-145.50 MHz | Repeater outputs |
| 146.52 MHz | **National simplex calling** |

:::tip Pro Tip
Don't use FM on frequencies below 144.30 MHz—that's weak signal territory!
:::`,
      keyPoints: [
        'Technicians have full privileges above 30 MHz (VHF/UHF)',
        'Technician phone privileges on HF are on 10 meters only (28.300-28.500 MHz)',
        'Limited HF privileges include CW on 80/40/15m and CW/data on 10m (with specific segments)',
        '146.520 MHz is the national 2-meter FM simplex calling frequency',
        'Band plans are voluntary but help prevent interference',
        'Power limits: 200 W PEP on Technician HF segments; generally up to 1500 W PEP above 30 MHz (subject to exceptions)',
      ],
      relatedQuestionIds: [
        'T1B01',
        'T1B02',
        'T1B03',
        'T1B04',
        'T1B05',
        'T1B06',
        'T1B07',
        'T1B08',
        'T1B09',
        'T1B10',
        'T1B11',
        'T1B12',
      ],
      interactiveComponents: ['band-plan-explorer'],
    },
    {
      id: 'T1C',
      title: 'License Classes, Call Signs, and Authority to Transmit',
      content: `# Licensing and Call Signs (T1C)

This section covers the license classes available today, call sign basics, and the practical rules for when you are (and are not) allowed to transmit.

---

## Current FCC License Classes

:::info Available license classes
New FCC-issued amateur licenses are available in three classes:
- **Technician**
- **General**
- **Amateur Extra**
:::

---

## License Term and Renewal

:::definition License term
An FCC-issued amateur radio license is normally granted for **10 years**.
:::

:::warning Grace period
If your license expires, you may renew within a **2-year grace period**, but you **may not transmit** while the license is expired.
:::

---

## When You May Start Transmitting

:::tip First license grant
After passing your first exam, you may transmit **when your license grant appears in the FCC database (ULS)**.
:::

---

## FCC Contact Information (Email)

:::warning Keep your email current
If the FCC cannot reach you by email, it can lead to **revocation of the station license or suspension of the operator license**.
:::

---

## Call Sign Basics

Every amateur station uses an FCC-assigned call sign.

:::definition Typical Technician format
A common Technician call sign format is **2×3**, such as **KF1XXX**.
:::

---

## Vanity Call Signs

:::info Vanity program
**Any licensed amateur** may request a desired call sign under the FCC vanity call sign rules (subject to availability and eligibility rules).
:::

---

## International Communications (General Rule)

Amateur stations may make international communications that are:
- **Incidental to the purposes** of the Amateur Radio Service, and
- **Of a personal character**

---

## Where You May Transmit

The exam emphasizes one special case:

:::tip International waters
An FCC-licensed amateur station may transmit from a **vessel or craft in international waters** if it is **documented or registered in the United States**.
:::`,
      keyPoints: [
        'New FCC amateur licenses are available as Technician, General, and Amateur Extra',
        'Licenses are normally granted for 10 years; grace period renewal is 2 years (no operating while expired)',
        'You may transmit after your first license grant appears in the FCC database (ULS)',
        'A common Technician call sign format is 2×3 (example: KF1XXX); any licensed amateur may request a vanity call sign',
        'A US-registered vessel in international waters may be a valid operating location',
      ],
      relatedQuestionIds: [
        'T1C01',
        'T1C02',
        'T1C03',
        'T1C04',
        'T1C05',
        'T1C06',
        'T1C07',
        'T1C08',
        'T1C09',
        'T1C10',
        'T1C11',
      ],
    },
    {
      id: 'T1D',
      title: 'Permitted Communications, Prohibitions, and Exceptions',
      content: `# What You May (and May Not) Transmit (T1D)

Amateur radio has broad privileges, but Part 97 also has clear restrictions. Many Technician exam questions in this group focus on those boundaries.

---

## International Communication Restrictions

:::warning Prohibited countries
US amateur stations are prohibited from exchanging communications with any country whose administration has notified the **ITU** that it objects to such communications.
:::

---

## One-Way Transmissions and Broadcasting

:::definition Broadcasting
In amateur radio, **broadcasting** means transmissions intended for reception by the **general public**.
:::

:::warning One-way transmissions
One-way transmissions are **prohibited when they are broadcasting**.
:::

---

## Encryption / “Obscuring Meaning”

:::warning General rule
Amateur messages may not be encoded to obscure their meaning.
:::

:::info Narrow exception (high-yield)
Encoding is permitted only for **control commands** to **space stations** or **radio control craft**.
:::

---

## Music on Amateur Radio

Music is generally prohibited.

:::info Narrow exception (high-yield)
Music may be transmitted only when it is **incidental to an authorized retransmission of manned spacecraft communications**.
:::

---

## Equipment Sales Notices

You may notify other amateurs of equipment for sale or trade only in limited ways:
- It must be **amateur radio equipment**, and
- It must **not** be done on a **regular basis** (no “operating a business” on the air)

---

## Indecent or Obscene Language

:::warning Prohibited content
Indecent or obscene language is prohibited on amateur frequencies.
:::

---

## Automatic Retransmission

Some stations may automatically retransmit other amateur signals:
- **Repeaters**
- **Auxiliary stations**
- **Space stations**

---

## Compensation for Operating

:::warning No pay-for-operating
Amateur operation is non-commercial. Control operators may not be compensated for operating, except in very narrow situations.
:::

:::info Narrow exception (high-yield)
Compensation is permitted when the communication is **incidental to classroom instruction at an educational institution**.
:::

---

## Supporting News Gathering / Broadcasting

Even if no other means is available, amateur stations may transmit information in support of broadcasting, program production, or news gathering **only** when it is directly related to:

:::tip Immediate safety
The immediate safety of human life or protection of property.
:::

---

## Station Identification Exception

Stations must normally identify, but the pool highlights one case:

:::info Model craft control
An amateur station may transmit without identifying when transmitting signals to **control model craft**.
:::`,
      keyPoints: [
        'Broadcasting (to the general public) is prohibited; one-way transmissions are prohibited when they are broadcasting',
        'Messages may not be encoded to obscure meaning, except for limited space station / radio control telecommand',
        'Music is prohibited except incidental to authorized retransmissions of manned spacecraft communications',
        'Repeaters, auxiliary stations, and space stations may automatically retransmit other amateur signals',
        'Compensation is generally prohibited, with a narrow classroom-instruction exception; news-gathering support is only for immediate safety',
      ],
      relatedQuestionIds: [
        'T1D01',
        'T1D02',
        'T1D03',
        'T1D04',
        'T1D05',
        'T1D06',
        'T1D07',
        'T1D08',
        'T1D09',
        'T1D10',
        'T1D11',
      ],
    },
    {
      id: 'T1E',
      title: 'Control Operator Requirements',
      content: `# Control Operator

Every amateur station must have a **control operator**—the licensed amateur responsible for proper operation.

---

## Control Operator Responsibilities

:::warning Key Responsibility
The control operator must ensure **all transmissions comply with FCC rules**.
:::

:::info Control operator required
Under normal circumstances, an amateur station may **not** transmit without a control operator.
:::

---

## Who Designates the Control Operator?

:::definition Designation
The **station licensee** designates the station control operator.
:::

### Who Is the Control Operator?

- When you operate your own station → **you** are the control operator
- When someone else uses your station → you MAY serve as control operator
- You must be able to turn off the transmitter if needed

:::warning Shared responsibility
If the control operator is not the station licensee, **both** the control operator and the station licensee are responsible for proper operation.
:::

---

## License Class Determines Privileges

:::info Important Rule
The **control operator's license class** determines what frequencies and modes can be used—not the station owner's license.
:::

:::tip Satellite / space station control
The control operator of a station communicating through an amateur satellite or space station may be **any amateur allowed to transmit on the satellite uplink frequency**.
:::

:::definition Control point
The **control point** is the location where the control operator function is performed.
:::

### Example Scenarios

| Station Owner | Control Operator | Allowed Privileges |
|---------------|------------------|-------------------|
| Extra | General | General only |
| Technician | Extra | Extra |
| General | Technician | Technician only |

:::warning Technician and Extra-only segments
Under normal circumstances, a Technician class licensee may be the control operator of an Amateur Extra class band segment **at no time**.
:::

:::tip Hosting New Hams
When letting a new Technician use your Extra class station, they can only use Technician frequencies unless YOU are the control operator.
:::

---

## Types of Station Control

:::definition Three Control Types
1. **Local Control** - Operator at the station
2. **Remote Control** - Operator at a different location via control link
3. **Automatic Control** - Station transmits automatically (repeaters, beacons)
:::

:::info Remote control requirements (high-yield)
For remote control operation:
- A **control operator is required at all times**
- The control operator is at the **control point**
- The control operator controls the station **indirectly** through a control link
:::

:::tip Remote control example
Operating a station over the **internet** is a classic example of remote control.
:::

### Automatic Control Rules

- Only permitted on certain frequencies
- For specific purposes (repeaters, beacons, space stations)
- Control operator still responsible even when not present

:::radio The Bottom Line
The control operator is **always responsible** for the station's transmissions, regardless of control type used.
:::

:::warning FCC presumption
Unless station records show otherwise, the FCC presumes the **station licensee** is the control operator.
:::`,
      keyPoints: [
        'Every transmission requires a control operator responsible for compliance',
        'Control operator license class determines maximum privileges',
        'Three control types: local, remote, and automatic',
        'Automatic control only permitted on specific frequencies/purposes',
        'Control operator responsible even when physically distant from station',
      ],
      relatedQuestionIds: [
        'T1E01',
        'T1E02',
        'T1E03',
        'T1E04',
        'T1E05',
        'T1E06',
        'T1E07',
        'T1E08',
        'T1E09',
        'T1E10',
        'T1E11',
      ],
    },
    {
      id: 'T1F',
      title: 'Station Inspection, Identification, Repeaters, and Club Stations',
      content: `# Identification and Station Administration (T1F)

This group focuses on identification requirements, station records, and a few “administrative” details that appear on the Technician exam.

---

## FCC Inspection (Station and Records)

:::warning Inspection upon request
Your station and its records must be available for FCC inspection **upon request by an FCC representative**.
:::

---

## When You Must Identify

:::warning Required identification
Transmit your assigned call sign:
- At least every **10 minutes** during a communication, and
- At the **end** of your last transmission
:::

### Tactical Call Signs

You may use tactical call signs (for example, “Race Headquarters”), but you still must identify with your FCC call sign on the normal schedule (every 10 minutes and at the end).

---

## Language and Method of ID (Phone)

:::info Language
When operating in a phone sub-band, identification must be in **English**.
:::

:::tip Method
For stations transmitting phone signals, call sign identification may be sent using **a CW or phone emission**.
:::

### Saying “/” on the Air

When using “portable” indicators like “CALL/4”, you may say:
- “slash”
- “stroke”
- “slant”

All are acceptable.

---

## Third-Party Communications

:::definition Third-party communications
**Third-party communications** are messages transmitted on behalf of a person who is **not** a licensed amateur control operator.
:::

### Foreign Third-Party Rule (High-yield)

If a non-licensed person is allowed to speak to a **foreign** station, the contact is allowed **only** if the foreign country has a **third-party agreement** with the United States.

---

## Repeaters and Accountability

:::definition Repeater
A **repeater** simultaneously retransmits the signal of another amateur station on a **different** channel or channels.
:::

:::warning Accountability
If a repeater retransmits prohibited communications, the **control operator of the originating station** is accountable.
:::

---

## Club Stations

The Technician pool emphasizes one key requirement:

:::info Club station license grant
A club must have **at least four members** to be issued a club station license grant.
:::`,
      keyPoints: [
        'Stations and records must be available for FCC inspection upon request',
        'Identify every 10 minutes and at end of communication; tactical call signs do not replace FCC call sign ID',
        'Phone-band identification must be in English; phone stations may ID by CW or voice',
        'Foreign third-party communications require a third-party agreement with that country',
        'A repeater retransmits on a different channel; originating station control operator is accountable for prohibited transmissions; club stations require at least four members',
      ],
      relatedQuestionIds: [
        'T1F01',
        'T1F02',
        'T1F03',
        'T1F04',
        'T1F05',
        'T1F06',
        'T1F07',
        'T1F08',
        'T1F09',
        'T1F10',
        'T1F11',
      ],
    },
  ],
}

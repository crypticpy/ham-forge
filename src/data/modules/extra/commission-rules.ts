/**
 * E1 - FCC Rules and Regulations Module
 * Amateur Extra Class License (Element 4)
 */

import type { LearningModule } from '@/types/learning'

export const commissionRulesModule: LearningModule = {
  id: 'E1',
  examLevel: 'extra',
  title: 'FCC Rules and Regulations',
  description:
    'Advanced FCC rules for Amateur Extra operators: band edges and bandwidth, special operating authorizations (60m/630m/2200m), interference protection, space and telecommand rules, the VE program, and other special provisions.',
  estimatedMinutes: 75,
  sections: [
    {
      id: 'E1A',
      title: 'Band Edges, Bandwidth, and Special Operating Locations',
      content: `# Band Edges, Bandwidth, and Special Operating Locations (E1A)

Extra-level rules questions often test a simple but critical idea:

:::warning Band-edge rule of thumb
**You must keep the entire occupied bandwidth inside the authorized segment** — not just the displayed “carrier” or dial frequency.
:::

## Carrier Frequency vs. Occupied Bandwidth

Many radios display a “carrier frequency” for phone-style signals. The exam expects you to reason about **where the sidebands actually land**:

- **USB** occupies frequencies **above** the carrier (roughly carrier → carrier + audio bandwidth)
- **LSB** occupies frequencies **below** the carrier (roughly carrier − audio bandwidth → carrier)

:::tip Practical exam math
If a signal is **3 kHz wide**, keep the carrier at least **3 kHz inside** the nearest band edge on the side where the signal extends.
:::

### Examples you should be able to reason through

- A **3 kHz USB** signal with a carrier at **14.348 MHz** would extend up to about **14.351 MHz** — beyond the **20 m band edge** — so it is **not legal**.
- For an **LSB** signal to be completely inside a band segment, the displayed carrier should be **~3 kHz above the lower band edge** (for a properly adjusted ~3 kHz phone signal).
- On **80 m phone**, a station calling CQ on **3.601 MHz LSB** can still be illegal to answer with a typical LSB phone signal because the **lower sideband components extend below the phone segment edge**.

## Channelized 60-Meter Operation

60 meters is special: it is **channelized**, and rules depend on the channel’s defined center frequency.

- For **CW** operation on 60 m channels, the transmit frequency is **at the channel center frequency**.

## 2200 m and 630 m: EIRP Limits

On the LF/MF allocations, the pool emphasizes that power limits are defined in terms of **EIRP**:

- **2200 m**: maximum **1 W EIRP**
- **630 m**: maximum **5 W EIRP** (except in certain parts of Alaska)

:::definition EIRP
**Equivalent Isotropic Radiated Power (EIRP)** is the apparent radiated power referenced to an **isotropic radiator** (0 dBi). It accounts for transmitter output power, feed line loss, and antenna gain.
:::

## Stations on Ships and Aircraft

Operating from a vessel or craft adds a practical authority requirement:

- If an amateur station is installed aboard a ship or aircraft, operation must be **approved by the master of the ship or the pilot in command**.
- A station aboard a **US-registered vessel in international waters** may be operated by **any FCC-issued amateur licensee**.
- The station apparatus aboard a US-registered vessel/craft must be under the **physical control** of a person who holds an FCC amateur license (or who is authorized for reciprocal operation).

## Accountability in Message Forwarding Systems

In forwarding systems (store-and-forward, packet, etc.), accountability tracks back to where the message started:

- If an illegal message is inadvertently forwarded, the **control operator of the originating station** is primarily accountable for the violation.`,
      keyPoints: [
        'The entire occupied bandwidth must remain inside the authorized band segment (not just the dial frequency)',
        'USB occupies frequencies above the carrier; LSB occupies frequencies below the carrier',
        'On 60 m (channelized), CW transmit frequency is the channel center frequency',
        'Power limits on 2200 m and 630 m are specified in EIRP (1 W and 5 W respectively, with Alaska exceptions on 630 m)',
        'Ship/aircraft operation requires approval from the master/pilot; US-registered vessel in international waters can be operated with any FCC amateur license',
        'In message forwarding violations, the originating station control operator is primarily accountable',
      ],
      relatedQuestionIds: [
        'E1A01',
        'E1A02',
        'E1A03',
        'E1A04',
        'E1A05',
        'E1A06',
        'E1A07',
        'E1A08',
        'E1A09',
        'E1A10',
        'E1A11',
      ],
    },
    {
      id: 'E1B',
      title: 'Interference Protection, Antenna Structures, PRB-1, and RACES',
      content: `# Interference Protection, Antenna Structures, PRB-1, and RACES (E1B)

This group is a mix of: emissions quality, special protected sites, antenna structure requirements, and emergency-service operating frameworks.

## Spurious Emissions and “How Wide Is Wide Enough?”

:::definition Spurious emission
A **spurious emission** is an emission **outside the necessary bandwidth** that is not intentionally created as part of the modulation process (for example: harmonics, parasitic oscillations, mixing products).
:::

On HF, the pool calls out a typical “acceptable” occupied bandwidth for **digital voice** or **slow-scan TV**:

- **3 kHz** is an acceptable bandwidth for these emissions on HF.

## FCC Monitoring Facilities

Some FCC monitoring sites have special protection requirements.

- An amateur station must protect an FCC monitoring facility from harmful interference within **1 mile** of the facility.

## 70 cm and Radiolocation Interference

If a repeater on 70 cm is causing interference to a radiolocation system:

- The control operator must **cease operation or make changes** that **mitigate the interference**.

## The National Radio Quiet Zone

:::info National Radio Quiet Zone
The **National Radio Quiet Zone** is an area surrounding the **National Radio Astronomy Observatory**, where radio transmissions are restricted/managed to protect sensitive observations.
:::

## Antenna Structures Near Airports (FAA + FCC Part 17)

If you build a structure near a public-use airport, additional rules may apply:

- You may have to **notify the FAA** and **register the structure with the FCC** as required by **Part 17**.

## PRB-1 (State and Local Zoning)

PRB-1 applies to **state and local zoning regulations** affecting amateur antennas.

:::tip PRB-1 in one sentence
State and local regulations must provide **reasonable accommodation** for amateur communications and must represent the **minimum practicable regulation** to accomplish a legitimate purpose.
:::

## Interference to Consumer Broadcast Reception

If your station causes interference to domestic broadcast reception **and the receivers are of good engineering design**, the FCC can require you to:

- **Avoid transmitting at certain hours on frequencies that cause the interference**.

## RACES (Radio Amateur Civil Emergency Service)

RACES operation is a special emergency communications framework:

- Any FCC-licensed amateur station **certified by the responsible civil defense organization** may be operated under RACES rules.
- Authorized RACES frequencies are **all amateur service frequencies authorized to the control operator** (subject to any additional local plan restrictions).`,
      keyPoints: [
        'Spurious emissions are unwanted emissions outside the necessary bandwidth (harmonics, parasitics, mixing products)',
        '3 kHz is an acceptable bandwidth for HF digital voice or SSTV per the pool',
        'Protect FCC monitoring facilities from harmful interference within 1 mile',
        'If a 70 cm repeater interferes with radiolocation, cease operation or mitigate the interference',
        'Near airports, antenna structures may require FAA notification and FCC Part 17 registration',
        'PRB-1 applies to state/local zoning and requires reasonable accommodation for amateur antennas',
        'RACES stations must be FCC-licensed and certified; frequencies are those authorized to the control operator',
      ],
      relatedQuestionIds: [
        'E1B01',
        'E1B02',
        'E1B03',
        'E1B04',
        'E1B05',
        'E1B06',
        'E1B07',
        'E1B08',
        'E1B09',
        'E1B10',
        'E1B11',
      ],
    },
    {
      id: 'E1C',
      title: 'International Operating, Remote Control, and Special Band Rules',
      content: `# International Operating, Remote Control, and Special Band Rules (E1C)

Extra rules questions often focus on special cases: operating abroad, remote control failure modes, and special allocations like 60 m / 630 m / 2200 m.

## 60-Meter Bandwidth (Data)

- The maximum bandwidth for a **data emission** on 60 meters is **2.8 kHz**.

## Communications with Foreign Amateur Stations

Communications transmitted to amateur stations in foreign countries must be:

- **Incidental to the purposes of the Amateur Service**, and
- **Remarks of a personal nature**

## CEPT and IARP

There are two common reciprocal operating frameworks tested at Extra:

:::definition CEPT
**CEPT** arrangements allow an FCC-licensed US citizen to operate in many European countries (and vice versa), where permitted.
:::

:::definition IARP
An **IARP** (International Amateur Radio Permit) allows US amateurs to operate in certain countries of the Americas.
:::

For CEPT operation where permitted, the pool emphasizes a specific documentation requirement:

- You must have a copy of **FCC Public Notice DA 16-1048**.

## 630 m and 2200 m: UTC Notification and Waiting Period

Before transmitting on 630 m or 2200 m, operators must:

- Inform the **Utilities Technology Council (UTC)** of the station’s **call sign** and **coordinates**

After filing the required notification:

- You may operate after **30 days**, provided you have not been informed that your station is **within 1 km** of PLC systems using those frequencies.

## Third-Party Communications Under Automatic Control

Automatic control has strict limitations. For third-party communications:

- A station may transmit third-party communications while being automatically controlled **only when transmitting RTTY or data emissions**.

## Remote-Control Failure Time Limit

If a remotely controlled station’s control link malfunctions, the maximum permissible duration of the station’s transmissions is:

- **3 minutes**

## Angle Modulation Limits Below 29 MHz

For angle modulation below 29.0 MHz:

- The highest permitted **modulation index** at the highest modulation frequency is **1.0**

## Spurious Emission Limit Below 30 MHz

For spurious emissions below 30 MHz, the maximum mean power level with respect to the fundamental is:

- **−43 dB** (−43 dBc)`,
      keyPoints: [
        '60 m maximum data emission bandwidth is 2.8 kHz',
        'Foreign communications must be incidental to the amateur service and personal in nature',
        'CEPT supports reciprocal operating in many European countries; IARP supports operation in parts of the Americas',
        'Before operating on 630 m/2200 m, notify UTC with call sign and station coordinates; operate after 30 days if not within 1 km of PLC systems',
        'Third-party communications under automatic control are permitted only for RTTY/data',
        'If a remote control link fails, transmissions must cease within 3 minutes',
        'Below 30 MHz, spurious emissions must be at least 43 dB below the fundamental (mean power)',
      ],
      relatedQuestionIds: [
        'E1C01',
        'E1C02',
        'E1C03',
        'E1C04',
        'E1C05',
        'E1C06',
        'E1C07',
        'E1C08',
        'E1C09',
        'E1C10',
        'E1C11',
        'E1C12',
      ],
    },
    {
      id: 'E1D',
      title: 'Space Stations, Telemetry/Telecommand, and One-Way Transmissions',
      content: `# Space Stations, Telemetry/Telecommand, and One-Way Transmissions (E1D)

This group focuses on the special rules for satellites, balloon telemetry, and stations that are permitted to transmit one-way signals.

## Telemetry vs. Telecommand

:::definition Telemetry
**Telemetry** is a **one-way transmission of measurements** at a distance from the measuring instrument.
:::

:::definition Space telecommand station
A **space telecommand station** transmits communications to **initiate, modify, or terminate** functions of a space station.
:::

## Encryption: A Narrow Exception

Amateur communications generally may not be encoded to obscure meaning, but there is a narrow exception:

- **Telecommand signals from a space telecommand station** may be **encrypted**.

## Balloon-Borne Telemetry Identification

Identification requirements still apply:

- A balloon-borne telemetry station’s identification transmissions must include the station **call sign**.

## Posting Requirements for Telecommand Stations Near Earth

If a station is being operated by telecommand on or within **50 km of Earth’s surface**, the station location must have posted:

- A **photocopy of the station license**
- A label with **name/address/phone** of the **station licensee**
- A label with **name/address/phone** of the **control operator**

## Model Craft by Telecommand

When operating a model craft by telecommand:

- Maximum permitted transmitter output power is **1 watt**

## Space Station Allocations (Bands)

The pool highlights these allocations for space stations:

- HF: **40 m, 20 m, 15 m, and 10 m**
- VHF: **2 m**
- UHF: **70 cm and 13 cm**

## Earth Stations and Control Operators

- Any amateur station may operate as an **Earth station**, subject to the privileges of the control operator’s license class.
- Telecommand stations of space stations may be **any amateur station designated by the space station licensee**, subject to the control operator’s privileges.

## One-Way Communications (Permitted Categories)

The pool calls out the categories of amateur stations that may transmit one-way communications:

- **Space stations**
- **Beacon stations**
- **Telecommand stations**`,
      keyPoints: [
        'Telemetry is one-way transmission of measurements; telecommand controls a space station',
        'Encryption is permitted for space telecommand signals (a narrow exception)',
        'Balloon-borne telemetry identification must include the call sign',
        'Telecommand station sites within 50 km of Earth must post license and contact info for licensee and control operator',
        'Model craft telecommand transmitter output power is limited to 1 W',
        'Space station allocations: HF 40/20/15/10 m; VHF 2 m; UHF 70 cm and 13 cm',
        'One-way communications are permitted for space, beacon, and telecommand stations',
      ],
      relatedQuestionIds: [
        'E1D01',
        'E1D02',
        'E1D03',
        'E1D04',
        'E1D05',
        'E1D06',
        'E1D07',
        'E1D08',
        'E1D09',
        'E1D10',
        'E1D11',
        'E1D12',
      ],
    },
    {
      id: 'E1E',
      title: 'Volunteer Examiner Program (VEs and VECs)',
      content: `# Volunteer Examiner Program (VEs and VECs) (E1E)

Extra operators are expected to understand the US VE program structure and the responsibilities of VEs and VECs.

## Who Maintains the Question Pools?

- **Volunteer Examiner Coordinators (VECs)** are tasked with maintaining the question pools for all US amateur license examinations.

:::definition VEC
A **VEC** is an organization that has an agreement with the FCC to coordinate, prepare, and administer amateur operator license examinations.
:::

## Becoming a Volunteer Examiner (VE)

To be accredited as a VE:

- A VEC must confirm the applicant meets FCC requirements to serve as an examiner.

## Conduct and Supervision During Exams

- Each administering VE is responsible for proper conduct and necessary supervision during an exam session.
- If a candidate fails to comply with instructions during an exam, a VE should **immediately terminate** the examination.

## Handling Paperwork

- If the examinee does **not** pass, the VE team must **return the application document to the examinee**.
- After a **successful** exam, the administering VEs must submit the application document to the coordinating VEC according to the VEC’s instructions.
- If an examinee passes all required elements for a new license or upgrade, **three VEs must certify** that the examinee is qualified and that VE administering requirements were met.

## Conflicts of Interest and Penalties

- A VE may not administer an exam to certain **relatives** as specified in FCC rules.
- Fraudulent administration or certification can result in **revocation** of the VE’s amateur station license grant and **suspension** of the VE’s operator license grant.

## Reimbursement

Part 97 allows VEs and VECs to be reimbursed for certain out-of-pocket expenses:

- Expenses related to **preparing, processing, administering, and coordinating** an examination.`,
      keyPoints: [
        'VECs maintain the question pools and coordinate amateur license examinations',
        'VE accreditation requires VEC confirmation that FCC requirements are met',
        'Each administering VE is responsible for supervision; noncompliance can result in immediate termination of the exam',
        'If the examinee fails, return the application; if successful, submit it per VEC instructions',
        'Three VEs must certify a fully successful set of elements for grant/upgrade',
        'VEs may not test certain relatives; fraud can lead to revocation/suspension',
        'Reimbursement is limited to expenses for preparing/processing/administering/coordinating exams',
      ],
      relatedQuestionIds: [
        'E1E01',
        'E1E02',
        'E1E03',
        'E1E04',
        'E1E05',
        'E1E06',
        'E1E07',
        'E1E08',
        'E1E09',
        'E1E10',
        'E1E11',
      ],
    },
    {
      id: 'E1F',
      title: 'Special Provisions: Spread Spectrum, RF Amplifiers, Line A, and Prohibited Communications',
      content: `# Special Provisions: Spread Spectrum, RF Amplifiers, Line A, and Prohibited Communications (E1F)

This group covers a set of “special case” rules that show up frequently on the Extra exam.

## Spread Spectrum Privileges

- Spread spectrum transmissions are permitted **only on amateur frequencies above 222 MHz**.

## Canadian Reciprocal Operation (in the US)

In the US, a person holding an amateur service license granted by Canada has privileges equal to:

- The operating terms/conditions of their Canadian license, **not to exceed US Amateur Extra privileges**.

## External RF Power Amplifiers (Below 144 MHz)

External RF power amplifiers capable of operation below 144 MHz generally require FCC certification. The pool emphasizes a narrow circumstance involving non-certified amplifiers:

- A dealer may sell such an amplifier if it is **constructed or modified by an amateur radio operator for use at an amateur station**.

If an external RF power amplifier is to qualify for a grant of FCC certification, one key requirement is:

- It must satisfy FCC spurious emission standards when operated at the lesser of **1500 W** or its **full output power**.

## Line A (70 cm Restrictions)

The FCC defines “Line A” roughly as:

- A line roughly parallel to and **south of** the US/Canada border

If you are in the contiguous 48 states **north of Line A**, you may not transmit on:

- **420 MHz – 430 MHz**

## Special Temporary Authority (STA)

The FCC may issue a **Special Temporary Authority (STA)** to an amateur station, for example:

- To provide for **experimental amateur communications**

## Communications to Businesses and Compensation

Amateur rules prohibit communications for hire or material compensation (with narrow exceptions).

The pool highlights that a message to a business may be sent:

- When neither the amateur nor their employer has a **pecuniary interest** in the communications

And it emphasizes a broad prohibition:

- Communications transmitted for **hire or material compensation** are prohibited, except as otherwise provided in the rules.

## Mesh Networks and Obscuring Meaning

Even on modern mesh networks:

- Messages **encoded to obscure their meaning** cannot be transmitted.

## Auxiliary Stations

An auxiliary station’s control operator may be:

- Only **Technician, General, Advanced, or Amateur Extra** class operators.`,
      keyPoints: [
        'Spread spectrum is permitted only above 222 MHz',
        'Canadian amateurs may operate in the US under their license terms, not exceeding US Extra privileges',
        'Non-certified RF power amplifiers below 144 MHz have narrow exceptions (constructed/modified by an amateur for amateur use)',
        '“Line A” is roughly south of the US/Canada border; north of Line A in the lower 48, do not transmit on 420–430 MHz',
        'The FCC may grant an STA for experimental communications',
        'Business communications require no pecuniary interest; communications for hire/compensation are generally prohibited',
        'Encryption/obscuring meaning is prohibited on amateur mesh networks; auxiliary station control operators must be licensed (Tech or higher)',
      ],
      relatedQuestionIds: [
        'E1F01',
        'E1F02',
        'E1F03',
        'E1F04',
        'E1F05',
        'E1F06',
        'E1F07',
        'E1F08',
        'E1F09',
        'E1F10',
        'E1F11',
      ],
    },
  ],
}


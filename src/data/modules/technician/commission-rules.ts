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
    'FCC regulations governing amateur radio operations, including licensing, frequency privileges, station identification, and operating requirements.',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'T1A',
      title: 'Purpose and Permissible Use of Amateur Radio',
      content: `# Purpose of Amateur Radio

The Amateur Radio Service exists for several important purposes defined by the FCC in Part 97 of the rules.

---

## The Five Purposes

:::info FCC Part 97 Purposes
1. **Advancing the radio art** - Technical experimentation and innovation
2. **Trained operator pool** - Providing skilled communicators for emergencies
3. **Technical investigation** - Self-training and learning
4. **Emergency communications** - Backup when other systems fail
5. **International goodwill** - Building friendships across borders
:::

---

## Non-Commercial Service

:::warning Key Rule
Amateur radio is a **non-commercial service**. You cannot use your station for direct monetary gain or payment.
:::

### What's Allowed
- Emergency communications (even if it indirectly helps a business)
- Notifying other amateurs of equipment for sale
- Technical experimentation and learning
- Public service events (races, parades, etc.)

### What's NOT Allowed
- Broadcasting (one-way transmissions to the general public)
- Business communications for hire
- Music transmission (except incidental)
- Encrypted communications (except for satellite control)

---

## Emergency Services

:::radio ARES & RACES
**ARES** (Amateur Radio Emergency Service) - Volunteers registered for public service communications

**RACES** (Radio Amateur Civil Emergency Service) - FCC Part 97 service for civil defense during national emergencies
:::

These organizations provide structured emergency communication support when disaster strikes.`,
      keyPoints: [
        'Amateur radio is a non-commercial service—no payment for operating',
        'Five purposes: advancing radio art, trained operator pool, experimentation, emergency communications, international goodwill',
        'Emergency communications are always permitted, even if they indirectly benefit a business',
        'Self-training and technical investigation are fundamental to the service',
        'ARES and RACES provide organized emergency communication support',
      ],
      relatedQuestionIds: ['T1A01', 'T1A02', 'T1A03', 'T1A04', 'T1A05'],
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

### Popular Technician Bands

| Band | Frequency Range | Common Uses |
|------|-----------------|-------------|
| 6 meters | 50-54 MHz | "Magic band" - occasional long-distance |
| 2 meters | 144-148 MHz | Most popular! Repeaters, simplex |
| 70 cm | 420-450 MHz | Repeaters, digital modes |
| 23 cm | 1240-1300 MHz | Weak signal, ATV |

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
        'Limited HF privileges include CW on 80/40/15m and CW/data/SSB on 10m',
        '2-meter band: 144-148 MHz; 70-centimeter band: 420-450 MHz',
        'Band plans are voluntary but help prevent interference',
        'Maximum Technician power on HF is 200 watts PEP on 10 meters',
      ],
      relatedQuestionIds: ['T1B01', 'T1B02', 'T1B03', 'T1B04', 'T1B05'],
      interactiveComponents: ['band-plan-explorer'],
    },
    {
      id: 'T1C',
      title: 'Call Signs and Station Identification',
      content: `# Call Signs

Every amateur radio station must have a call sign assigned by the FCC.

---

## Call Sign Format

:::definition US Call Sign Structure
**Prefix** + **Number** + **Suffix**

Example: **W1AW** (ARRL headquarters station)
- W = Prefix (US)
- 1 = Call district (New England)
- AW = Suffix (unique identifier)
:::

### Call Sign Prefixes

| Prefix | Meaning |
|--------|---------|
| W, K, N | United States |
| AA-AL | US (Amateur Extra) |
| KA-KZ | US (various classes) |
| WA-WZ | US (various classes) |

### Call Districts

The number indicates the geographic region where the license was originally issued:

| District | States |
|----------|--------|
| 1 | CT, MA, ME, NH, RI, VT |
| 2 | NJ, NY |
| 3 | DE, MD, PA |
| 4 | AL, FL, GA, KY, NC, SC, TN, VA |
| 5 | AR, LA, MS, NM, OK, TX |
| 6 | CA |
| 7 | AZ, ID, MT, NV, OR, UT, WA, WY |
| 8 | MI, OH, WV |
| 9 | IL, IN, WI |
| 0 | CO, IA, KS, MN, MO, NE, ND, SD |

---

## Vanity Call Signs

:::info Vanity Program
You can request a specific call sign through the FCC's **vanity call sign program**. There is a small fee.
:::

- Available to all license classes
- Some formats reserved for higher classes (e.g., 1×2 calls like W1AW for Extra)
- Must be available (not already assigned)

---

## Station Identification

:::warning Required!
You **must** identify your station:
- Every **10 minutes** during a contact
- At the **end** of your last transmission
:::

### How to Identify

- Use your call sign in **English**
- Or use **phonetics** (e.g., "Whiskey One Alpha Whiskey")
- When on a repeater, use YOUR call sign (not the repeater's)

:::tip Portable Operation
Operating from another call district? You MAY append the district number (W1AW/4), but it's **not required** by FCC rules.
:::`,
      keyPoints: [
        'Call sign format: prefix + number + suffix (e.g., W1AW)',
        'Station identification required every 10 minutes and at end of contact',
        'Identification must be in English or standard phonetics',
        'Vanity call signs available for a fee; some formats restricted by license class',
        'The number in a call sign indicates the original geographic district',
      ],
      relatedQuestionIds: ['T1C01', 'T1C02', 'T1C03', 'T1C04', 'T1C05'],
    },
    {
      id: 'T1D',
      title: 'Station Control and Licensing',
      content: `# Amateur Radio Licensing

To operate an amateur radio station in the United States, you need an FCC license.

---

## License Classes

:::info Three License Classes
| Class | Privileges | Exam |
|-------|------------|------|
| **Technician** | VHF/UHF + limited HF | 35 questions |
| **General** | All bands, most modes | + 35 questions |
| **Amateur Extra** | All privileges | + 50 questions |
:::

Each class requires passing a written examination. No Morse code test is required for any class.

---

## License Terms

:::definition License Validity
Amateur licenses are valid for **10 years** and can be renewed without taking another exam.
:::

### Renewal Timeline

| Period | What You Can Do |
|--------|-----------------|
| Up to 2 years before expiration | Renew early |
| License current | Operate normally |
| Up to 2 years after expiration | Renew (grace period) |
| More than 2 years expired | Must retake exam |

:::warning Grace Period
During the grace period, you **cannot operate**—your license has expired! But you can still renew without retesting.
:::

### How to Renew

- Free electronic renewal through FCC's **ULS** (Universal Licensing System)
- Or file FCC Form 605 by mail (small fee)

---

## Station License

:::tip Good News
Your **station license** is automatically included with your operator license. You don't need a separate license for your station!
:::

### Club Stations

Club stations are different:
- Require a separate club station license
- Must have a **trustee** (at least General class)
- Trustee is responsible for proper operation`,
      keyPoints: [
        'Amateur licenses are valid for 10 years and renewable without retesting',
        'Three license classes: Technician, General, and Amateur Extra',
        'Grace period allows renewal up to 2 years after expiration (but no operating)',
        'Operator and station licenses are combined into one document',
        'Club stations require a trustee with at least a General class license',
      ],
      relatedQuestionIds: ['T1D01', 'T1D02', 'T1D03', 'T1D04', 'T1D05'],
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

### Who Is the Control Operator?

- When you operate your own station → **you** are the control operator
- When someone else uses your station → you MAY serve as control operator
- You must be able to turn off the transmitter if needed

---

## License Class Determines Privileges

:::info Important Rule
The **control operator's license class** determines what frequencies and modes can be used—not the station owner's license.
:::

### Example Scenarios

| Station Owner | Control Operator | Allowed Privileges |
|---------------|------------------|-------------------|
| Extra | General | General only |
| Technician | Extra | Extra |
| General | Technician | Technician only |

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

### Automatic Control Rules

- Only permitted on certain frequencies
- For specific purposes (repeaters, beacons, space stations)
- Control operator still responsible even when not present

:::radio The Bottom Line
The control operator is **always responsible** for the station's transmissions, regardless of control type used.
:::`,
      keyPoints: [
        'Every transmission requires a control operator responsible for compliance',
        'Control operator license class determines maximum privileges',
        'Three control types: local, remote, and automatic',
        'Automatic control only permitted on specific frequencies/purposes',
        'Control operator responsible even when physically distant from station',
      ],
      relatedQuestionIds: ['T1E01', 'T1E02', 'T1E03', 'T1E04', 'T1E05'],
    },
    {
      id: 'T1F',
      title: 'Station Identification and Third-Party Communications',
      content: `# Station Identification

Proper station identification is a fundamental requirement in amateur radio.

---

## Identification Rules

:::warning Required Identification
You **must** identify your station with your call sign:
- Every **10 minutes** during a contact
- At the **end** of your final transmission
:::

### Repeater Operation

- Identify with **YOUR** call sign, not the repeater's
- The repeater identifies itself separately (usually via CW)
- Don't say "for identification" after every transmission—just ID every 10 minutes

---

## Third-Party Communications

:::definition Third-Party Traffic
**Third-party communications** = messages sent on behalf of someone who is NOT a licensed amateur.
:::

### Domestic Rules

- Permitted in the United States
- Control operator is responsible for compliance
- The unlicensed person may speak, but you control the station

### International Rules

:::warning International Restrictions
Third-party traffic to other countries is **only permitted** with countries that have third-party agreements with the US.
:::

You cannot allow an unlicensed person to speak to a station in a country without a third-party agreement.

---

## Who Cannot Be a Third Party?

:::info Restrictions
- Persons with **revoked amateur licenses** cannot participate
- Cannot transmit messages **for hire** or material compensation
:::

---

## Emergency Exception

:::tip Safety First
In emergencies involving immediate safety of life or property, **normal restrictions do not apply**. Getting help is the priority!
:::

This applies to:
- Frequency restrictions
- Third-party rules
- Power limits
- Any rule that would prevent saving lives`,
      keyPoints: [
        'Identify every 10 minutes and at end of communication',
        'Third-party traffic allowed domestically; internationally only with agreement countries',
        'Control operator responsible for third-party compliance',
        'Persons with revoked licenses cannot participate as third parties',
        'Emergency communications override normal third-party restrictions',
      ],
      relatedQuestionIds: ['T1F01', 'T1F02', 'T1F03', 'T1F04', 'T1F05'],
    },
  ],
}

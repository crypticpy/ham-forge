/**
 * T9 - Antennas and Feed Lines
 * Learning module for antenna fundamentals and transmission line concepts
 */

import type { LearningModule } from '@/types/learning'

export const antennasFeedLinesModule: LearningModule = {
  id: 'T9',
  examLevel: 'technician',
  title: 'Antennas and Feed Lines',
  description:
    'Antenna types, characteristics, and radiation patterns, plus feed line types, connectors, and standing wave ratio (SWR) concepts.',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'T9A',
      title: 'Antenna Fundamentals',
      content: `# Antenna Fundamentals

Antennas are the critical interface between your radio and the electromagnetic spectrum. Understanding how they work is essential for effective amateur radio operation.

---

## The Dipole Antenna

:::definition
**Dipole Antenna**: The most fundamental antenna type, consisting of two quarter-wavelength elements fed at the center.
:::

**Polarization** depends on orientation:
- **Horizontal polarization** — dipole parallel to Earth's surface
- **Vertical polarization** — dipole perpendicular to Earth (vertical antenna)

:::info
**Polarization Matching**: For maximum signal transfer, especially at VHF/UHF frequencies, transmitting and receiving antennas should have the same polarization.
:::

---

## Dipole Radiation Pattern

:::radio
A dipole radiates **strongest broadside** to the antenna (perpendicular to the wire), **not off the ends**. This creates a figure-8 radiation pattern when viewed from above.
:::

**Frequency and Length Relationship**:

| Action | Effect on Resonant Frequency |
|--------|------------------------------|
| Shorten the antenna | Frequency **increases** |
| Lengthen the antenna | Frequency **decreases** |

---

## Common Antenna Lengths

:::tip
**Quick Reference Lengths**:
- **Half-wave 6-meter dipole**: approximately **112 inches**
- **Quarter-wave vertical for 146 MHz**: approximately **19 inches**
:::

---

## Beam Antennas and Gain

:::definition
**Antenna Gain**: The increase in signal strength in a specified direction compared to a reference antenna. Measured in dB (decibels).
:::

**Yagi Antenna Characteristics**:
- Concentrates signals in one direction (directional)
- Offers the **greatest gain** among common amateur antennas
- Popular for weak-signal work and DXing
- Consists of a driven element, reflector, and one or more directors

:::info
A **5/8-wavelength whip antenna** for VHF/UHF mobile service has more gain than a 1/4-wavelength antenna because it concentrates radiation at lower angles toward the horizon.
:::

---

## Antenna Loading

:::definition
**Antenna Loading**: A technique for electrically lengthening an antenna that is physically too short for its intended frequency, accomplished by inserting inductors (coils) in the radiating elements.
:::

**"Rubber Duck" Antenna Limitations**:
- Short, flexible antennas supplied with handheld transceivers
- **Low efficiency** compared to full-sized quarter-wave antennas
- Heavily loaded design and small size reduce performance

:::warning
Using a handheld transceiver with a flexible antenna **inside a vehicle** further reduces signal strength because the metal body acts as a shield.
:::`,
      keyPoints: [
        'Dipoles radiate strongest broadside to the antenna, not off the ends',
        'Shortening a dipole increases its resonant frequency; lengthening decreases it',
        'Yagi beam antennas offer the greatest gain by concentrating signals in one direction',
        'Antenna gain is the increase in signal strength in a specified direction vs. a reference',
        'Antenna loading uses inductors to electrically lengthen physically short antennas',
      ],
      relatedQuestionIds: [
        'T9A01',
        'T9A02',
        'T9A03',
        'T9A04',
        'T9A05',
        'T9A06',
        'T9A07',
        'T9A08',
        'T9A09',
        'T9A10',
        'T9A11',
        'T9A12',
      ],
    },
    {
      id: 'T9B',
      title: 'Feed Lines and SWR',
      content: `# Feed Lines and SWR

Feed lines carry RF energy between your transceiver and antenna. Choosing the right feed line and understanding SWR are essential for efficient station operation.

---

## Coaxial Cable Basics

:::definition
**Coaxial Cable**: The most common feed line for amateur radio, consisting of a center conductor surrounded by insulation, a shield, and an outer jacket.
:::

**Why Coax is Popular**:
- Easy to use and install
- Requires few special installation considerations
- Self-shielding design reduces interference

:::info
**Standard Impedance**: Most amateur coaxial cables are **50 ohms**, which matches the output impedance of most transceivers and the feedpoint impedance of many antennas.
:::

---

## Understanding SWR

:::definition
**Standing Wave Ratio (SWR)**: A measure of how well the load (antenna) is matched to the transmission line. Expressed as a ratio (e.g., 1.5:1).
:::

| SWR Value | Meaning |
|-----------|---------|
| **1:1** | Perfect match — all power reaches antenna |
| **1.5:1** | Excellent — minimal reflected power |
| **2:1** | Acceptable — most power reaches antenna |
| **3:1+** | Poor — significant power reflected back |

:::tip
**Low SWR** (close to 1:1) means reduced signal loss and efficient power transfer.
:::

:::warning
**Erratic SWR Changes**: Often indicate a **loose connection** in the antenna or feed line system. Check all connections if SWR readings are unstable.
:::

---

## Antenna Tuners

:::definition
**Antenna Tuner (Antenna Coupler)**: A device that matches the antenna system impedance to the transceiver's output impedance, allowing operation even when the antenna is not perfectly matched.
:::

**Key Points**:
- Does NOT make the antenna more efficient
- Presents an acceptable load to the transceiver
- Allows use of antennas outside their optimal frequency range

---

## Feed Line Loss

:::radio
**Feed line loss increases as signal frequency increases.** Use lower-loss cable for VHF/UHF and longer cable runs.
:::

**Cable Loss Comparison** (lower is better):

| Cable Type | Relative Loss | Best Use |
|------------|---------------|----------|
| **RG-58** | Higher loss | Short runs at HF |
| **RG-213** | Lower loss | Longer runs, HF through VHF |
| **Air-insulated hardline** | Lowest loss | VHF/UHF, commercial installations |

**Sources of Feed Line Loss**:
- Water intrusion into connectors
- High SWR conditions
- Multiple connectors in the line
- Poor-quality or damaged cable

---

## RF Connectors

| Connector Type | Also Known As | Best For |
|----------------|---------------|----------|
| **PL-259** | UHF connector (mates with SO-239) | HF and VHF frequencies |
| **Type N** | N connector | Frequencies **above 400 MHz** |
| **BNC** | Bayonet Neill-Concelman | Quick-connect VHF/UHF |
| **SMA** | SubMiniature version A | Handheld radios, compact equipment |

:::tip
**Type N connectors** are preferred above 400 MHz because they maintain consistent impedance and lower loss at higher frequencies.
:::

:::warning
**Weatherproofing**: Always weatherproof outdoor connections to prevent water intrusion, which is a major cause of feed line degradation. Use self-fusing silicone tape or commercial weatherproofing kits.
:::`,
      keyPoints: [
        'SWR measures how well the antenna matches the feed line; low SWR means less signal loss',
        'Most amateur coaxial cable is 50 ohms impedance',
        'Feed line loss increases as frequency increases; use lower-loss cable for UHF',
        'PL-259 connectors are common at HF/VHF; Type N connectors are better above 400 MHz',
        'Antenna tuners match impedance between the antenna system and transceiver',
      ],
      relatedQuestionIds: [
        'T9B01',
        'T9B02',
        'T9B03',
        'T9B04',
        'T9B05',
        'T9B06',
        'T9B07',
        'T9B08',
        'T9B09',
        'T9B10',
        'T9B11',
        'T9B12',
      ],
    },
  ],
}

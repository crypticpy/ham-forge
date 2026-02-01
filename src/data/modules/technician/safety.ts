/**
 * T0 - Safety
 * Learning module for electrical, antenna, and RF safety in amateur radio
 */

import type { LearningModule } from '@/types/learning'

export const safetyModule: LearningModule = {
  id: 'T0',
  examLevel: 'technician',
  title: 'Safety',
  description:
    'Critical safety practices for amateur radio operations, including electrical hazards, tower and antenna installation safety, and RF exposure protection.',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'T0A',
      title: 'Electrical Safety',
      content: `# Electrical Safety in Amateur Radio

Electrical safety is paramount in amateur radio because operators regularly work with equipment that can deliver dangerous or lethal shocks.

:::warning
**Electricity can kill.** Even relatively low voltages can be dangerous under the right conditions. Always treat electrical equipment with respect.
:::

---

## How Electrical Current Harms the Body

Current flowing through the body causes injury in three primary ways:

| Effect | Description |
|--------|-------------|
| **Tissue Heating** | Current heats tissue and causes burns |
| **Cell Disruption** | Disrupts electrical functions of cells, especially dangerous for the heart |
| **Muscle Contraction** | Causes involuntary muscle contractions that may prevent releasing an energized conductor |

---

## AC Wiring Color Codes (US 120V)

Understanding wire colors is essential for safe electrical work:

| Wire Color | Function |
|------------|----------|
| **Black** | Hot conductor (carries current from breaker) |
| **White** | Neutral |
| **Green or Bare** | Equipment ground |

:::info
Fuses and circuit breakers should be installed **in series with the hot conductor only**. Their purpose is to remove power in case of overload and prevent fires.
:::

---

## Essential Safety Practices

- Always use **three-wire cords and plugs** for all AC-powered equipment
- Connect all station equipment to a **common safety ground**
- Consider installing **mechanical interlocks** on high-voltage circuits
- Ensure voltmeters and test leads are **rated for the voltages being measured**

:::warning
**Never replace a fuse with one of higher amperage!** For example, replacing a 5-amp fuse with a 20-amp fuse could allow excessive current to flow, potentially causing a fire before the fuse blows. The fuse is sized to protect the circuit and equipment.
:::

---

## Battery Hazards

While a 12-volt battery cannot deliver a dangerous shock through dry skin, batteries present serious hazards:

- **Short circuits** can cause burns, fire, or explosion due to very high current
- **Rapid charging/discharging** can cause overheating
- **Out-gassing of hydrogen** during charging is explosive

:::tip
Always avoid shorting battery terminals and ensure proper ventilation when charging batteries.
:::

---

## Power Supply Dangers

:::warning
**Power supply filter capacitors can store dangerous charge for minutes or longer after power is turned off.** Always assume power supplies are energized until verified with a meter.
:::

---

## Lightning Protection

Proper lightning protection requires:

- Install **arresters on coaxial feed lines** at a grounded panel near where lines enter the building
- **Bond all external ground rods together** with heavy wire or conductive strap
- Create a **single-point ground system**

:::definition
**Single-Point Ground**: A grounding system where all ground conductors connect to one common point, preventing ground loops and ensuring effective lightning protection.
:::`,
      keyPoints: [
        'Black wire is "hot" in US 120V AC wiring; fuses go in series with hot conductor only',
        'Never replace a fuse with a higher amperage rating—excessive current could cause fire',
        'Use three-wire plugs and common safety ground for all AC station equipment',
        'Power supply filter capacitors can hold dangerous charge after power is turned off',
        'Bond all ground rods together; install lightning arresters where feed lines enter building',
      ],
      relatedQuestionIds: [
        'T0A01',
        'T0A02',
        'T0A03',
        'T0A04',
        'T0A05',
        'T0A06',
        'T0A07',
        'T0A08',
        'T0A09',
        'T0A10',
        'T0A11',
        'T0A12',
      ],
    },
    {
      id: 'T0B',
      title: 'Tower and Antenna Safety',
      content: `# Tower and Antenna Safety

Tower climbing and antenna installation are among the most dangerous activities in amateur radio.

:::warning
**Falls from towers are often fatal, and contact with power lines during antenna work has killed many operators.** This section covers life-saving safety practices.
:::

---

## Tower Climbing Requirements

Before climbing any tower, you must meet these requirements:

| Requirement | Details |
|-------------|---------|
| **Training** | Sufficient training on safe climbing techniques |
| **Harness** | Always wear an approved climbing harness |
| **Tie-off** | Use appropriate tie-off to the tower at all times |
| **Ground Observer** | Never climb without a helper or observer on the ground |

:::warning
**There is NEVER a safe circumstance to climb a tower without a helper or observer on the ground**—even for simple tasks or low heights. Someone must be available to call for help in an emergency.
:::

---

## Power Line Safety

:::warning
**The #1 cause of death during antenna installation is contact with power lines.** The most critical safety precaution when putting up a tower or antenna is to look for and stay clear of any overhead electrical wires.
:::

### Minimum Safe Distance Rule

The minimum safe distance from power lines when installing an antenna:

> **If the antenna falls, no part of it can come closer than 10 feet to the power wires.**

This accounts for:
- The antenna's full length
- Any potential swing radius
- Unexpected movement during installation

:::warning
**Never attach an antenna to a utility pole.** Besides being illegal in most areas, the antenna could contact high-voltage power lines on the pole.
:::

---

## Crank-Up Tower Safety

Crank-up towers require special safety considerations:

:::warning
**Crank-up towers must NOT be climbed unless:**
- The tower is **fully retracted**, OR
- **Mechanical safety locking devices** have been installed to prevent accidental lowering
:::

---

## Guy Wire and Grounding

### Guy Wire Safety
- Use **safety wire through turnbuckles** to prevent loosening from vibration over time

### Tower Grounding
Proper grounding method:
- Install **separate eight-foot ground rods** for each tower leg
- Bond ground rods to the **tower base**
- Bond all ground rods **to each other**

:::tip
**Lightning protection grounding conductors should avoid sharp bends.** Lightning tends to jump across sharp angles rather than follow the conductor. Keep ground wires short and direct.
:::

---

## Regulatory Authority

:::info
**Local electrical codes** (not FCC Part 97) establish the grounding requirements for amateur towers and antennas. Consult your local building inspector for specific requirements in your area.
:::`,
      keyPoints: [
        'Never climb a tower without a helper or observer—there are no safe exceptions',
        'Always use approved climbing harness with tie-off; get proper training first',
        'Keep antennas far enough from power lines that a fall cannot contact them within 10 feet',
        'Crank-up towers must be retracted or have safety locks before climbing',
        'Local electrical codes (not FCC rules) establish tower grounding requirements',
      ],
      relatedQuestionIds: [
        'T0B01',
        'T0B02',
        'T0B03',
        'T0B04',
        'T0B05',
        'T0B06',
        'T0B07',
        'T0B08',
        'T0B09',
        'T0B10',
        'T0B11',
      ],
    },
    {
      id: 'T0C',
      title: 'RF Exposure Safety',
      content: `# RF Exposure Safety

Radio frequency (RF) radiation is a form of electromagnetic energy that can cause harm under certain conditions.

---

## Understanding RF Radiation

:::definition
**Non-Ionizing Radiation**: RF energy is non-ionizing radiation, meaning it does not have sufficient energy to cause chemical changes in cells or damage DNA like ionizing radiation (gamma rays, X-rays) can.
:::

### How RF Causes Harm

| Radiation Type | Can Damage DNA? | Primary Harm Mechanism |
|----------------|-----------------|------------------------|
| **Ionizing** (X-rays, gamma rays) | Yes | Chemical changes in cells |
| **Non-Ionizing** (RF) | No | Heating of body tissues |

:::info
RF energy heats body tissues similar to how a microwave oven heats food. This is why exposure limits exist.
:::

---

## FCC Maximum Permissible Exposure (MPE) Limits

The FCC has established MPE limits to protect both operators and the public from excessive RF exposure.

:::warning
**The station licensee is responsible for ensuring compliance with RF exposure limits.** This is YOUR responsibility as the license holder.
:::

### Why MPE Limits Vary by Frequency

RF exposure limits vary with frequency because the human body absorbs more RF energy at some frequencies than others:

| Frequency Range | Body Absorption | MPE Limit |
|-----------------|-----------------|-----------|
| VHF (30-300 MHz) | **Peak absorption** | Strictest limits |
| Around 50 MHz | Maximum absorption | **Lowest MPE values** |
| 6-meter band | Critical range | Most restricted |

:::radio
**Exam Focus**: The lowest (strictest) MPE values occur around **50 MHz** because body absorption peaks in this range. The amateur **6-meter band** falls right in this critical zone.
:::

---

## Factors Affecting RF Exposure

Multiple factors determine RF exposure near an amateur antenna:

- **Frequency** of the RF field
- **Power level** of the RF field
- **Distance** from the antenna to a person
- **Radiation pattern** of the antenna (some directions receive more energy)

---

## Understanding Duty Cycle

:::definition
**Duty Cycle**: The percentage of time that a transmitter is transmitting during the averaging period. It's important because it affects average exposure to radiation over time.
:::

### Duty Cycle and Allowable Power

| Duty Cycle Change | Effect on Allowable Power Density |
|-------------------|----------------------------------|
| 100% → 50% | **Doubles** (2× increase) |
| 100% → 25% | **Quadruples** (4× increase) |

### Typical Duty Cycles by Mode

| Mode | Typical Duty Cycle | Notes |
|------|-------------------|-------|
| **FM** | ~100% | Transmits continuously while PTT pressed |
| **SSB** | ~20-40% | Varies with speech patterns |
| **CW** | ~40-50% | Varies with sending speed |

:::tip
Modes like CW and SSB have much lower duty cycles than FM, which means they produce lower average RF exposure for the same peak power.
:::

---

## Determining Compliance

To determine whether your station complies with FCC RF exposure regulations, you can use any of these acceptable methods:

- **Calculation** based on FCC OET Bulletin 65
- **Computer modeling**
- **Measurement** with calibrated field strength equipment

:::warning
**Re-evaluate your station's RF compliance whenever you change anything in your transmitter or antenna system.**
:::

---

## Reducing RF Exposure

Practical ways to reduce RF exposure include:

| Method | How It Helps |
|--------|--------------|
| **Relocate antennas** | Move farther from occupied areas |
| **Reduce power** | Lower power = lower exposure |
| **Antenna selection** | Use patterns that direct energy away from people |

:::warning
**Touching an antenna during transmission can cause RF burns to the skin.** Always ensure:
- Antennas are in safe locations
- Transmitters are OFF before any antenna work
:::`,
      keyPoints: [
        'RF is non-ionizing radiation; it heats tissue but cannot damage DNA like ionizing radiation',
        'MPE limits are lowest (strictest) around 50 MHz where body absorption peaks',
        'Station licensee is responsible for ensuring compliance with RF exposure limits',
        'Duty cycle affects average exposure—50% duty cycle doubles allowable power density',
        'Re-evaluate RF compliance whenever transmitter or antenna system changes',
      ],
      relatedQuestionIds: [
        'T0C01',
        'T0C02',
        'T0C03',
        'T0C04',
        'T0C05',
        'T0C06',
        'T0C07',
        'T0C08',
        'T0C09',
        'T0C10',
        'T0C11',
        'T0C12',
        'T0C13',
      ],
    },
  ],
}

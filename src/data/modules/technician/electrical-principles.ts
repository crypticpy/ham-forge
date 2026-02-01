/**
 * T5 - Electrical Principles
 * Learning module for fundamental electrical concepts used in amateur radio
 *
 * Enhanced with visual structure, callouts, and interactive element markers
 */

import type { LearningModule } from '@/types/learning'

export const electricalPrinciplesModule: LearningModule = {
  id: 'T5',
  examLevel: 'technician',
  title: 'Electrical Principles',
  description:
    "Fundamental electrical concepts including current, voltage, power, resistance, Ohm's Law, metric prefixes, decibels, capacitance, inductance, and impedance.",
  estimatedMinutes: 60,
  sections: [
    {
      id: 'T5A',
      title: 'Current, Voltage, Power, and Resistance',
      content: `# Understanding Electrical Basics

The foundation of amateur radio starts with understanding four fundamental electrical quantities. These concepts appear throughout ham radio and are essential for the Technician exam.

---

## The Four Fundamentals

:::definition Current
**Current** is the flow of electrons through a conductor. Think of it like water flowing through a pipe.

Measured in **amperes** (amps, symbol: A)
:::

:::definition Voltage
**Voltage** is the electrical force or pressure that pushes electrons through a circuit. It's like water pressure in a pipe.

Measured in **volts** (symbol: V or E)
:::

:::definition Power
**Power** is the rate at which electrical energy is used or transferred. This is what makes your radio actually *do* work.

Measured in **watts** (symbol: W)
:::

:::definition Resistance
**Resistance** is the opposition to current flow. Every component and wire has some resistance.

Measured in **ohms** (symbol: Ω)
:::

---

## Conductors vs. Insulators

Not all materials conduct electricity equally:

:::tip Conductors
**Good conductors** like copper and aluminum have many free electrons that can move easily. That's why wires are made of these metals!
:::

:::warning Insulators
**Good insulators** like glass, rubber, and plastic have tightly bound electrons that cannot flow freely. We use these to protect ourselves and prevent short circuits.
:::

---

## DC vs. AC Current

There are two types of current flow:

### Direct Current (DC)
- Flows in **one direction** continuously
- Comes from batteries and power supplies
- Your handheld radio runs on DC from its battery

### Alternating Current (AC)
- **Periodically reverses direction**
- Alternates between positive and negative polarity
- Household power is AC at 60 Hz
- Radio signals are actually AC at very high frequencies!

:::info Frequency
The number of complete cycles per second is called **frequency**, measured in **hertz (Hz)**. Household power runs at 60 Hz. Radio signals operate at thousands to billions of hertz.
:::

---

## The Power Formula

:::formula Power Calculation
**P = E × I**

Power (watts) = Voltage (volts) × Current (amps)

Example: 13.8V × 10A = **138 watts**
:::

:::examfocus Power Formula on Every Exam
The power formula P = E × I appears on nearly every Technician exam. Practice calculating with common values like 12V batteries and 13.8V power supplies. If given any two values, you can find the third!
:::

This formula appears frequently on the exam!`,
      keyPoints: [
        'Current (electron flow) is measured in amperes; voltage (electrical force) is measured in volts',
        'Power (rate of energy use) is measured in watts; resistance (opposition to flow) is measured in ohms',
        'Metals are good conductors due to free electrons; glass and rubber are good insulators',
        'AC alternates direction periodically; frequency (cycles per second) is measured in hertz',
        'Power formula: P = I × E (watts = amps × volts)',
      ],
      relatedQuestionIds: [
        'T5A01',
        'T5A02',
        'T5A03',
        'T5A04',
        'T5A05',
        'T5A06',
        'T5A07',
        'T5A08',
        'T5A09',
        'T5A10',
        'T5A11',
        'T5A12',
      ],
      interactiveComponents: ['power-calculator'],
    },
    {
      id: 'T5B',
      title: 'Metric Prefixes and Decibels',
      content: `# Metric Prefixes and Decibels

Amateur radio uses metric prefixes extensively because electrical and radio quantities span enormous ranges—from tiny picofarads to massive megahertz!

---

## Essential Metric Prefixes

### Making Numbers Bigger

| Prefix | Symbol | Multiplier | Example |
|--------|--------|------------|---------|
| Kilo | k | 1,000 | 1 kHz = 1,000 Hz |
| Mega | M | 1,000,000 | 1 MHz = 1,000,000 Hz |
| Giga | G | 1,000,000,000 | 1 GHz = 1,000,000,000 Hz |

### Making Numbers Smaller

| Prefix | Symbol | Multiplier | Example |
|--------|--------|------------|---------|
| Milli | m | 0.001 | 500 mA = 0.5 A |
| Micro | μ | 0.000001 | 100 μF = 0.0001 F |
| Pico | p | 0.000000000001 | 100 pF = tiny! |

---

## Converting Between Units

:::tip Conversion Rules
- **Smaller to larger unit**: Divide
- **Larger to smaller unit**: Multiply

Example: 28,400 kHz = 28.4 MHz (divide by 1,000)
:::

### Common Conversions

- 1,500,000 Hz = 1,500 kHz = **1.5 MHz**
- 500 milliwatts = **0.5 watts**
- 3,000 milliamperes = **3 amperes**
- 3.525 MHz = **3,525 kHz**

---

## Understanding Decibels (dB)

Decibels provide a convenient way to express power ratios using logarithms. You don't need to understand the math—just memorize these key values!

:::formula The Magic Numbers
**+3 dB** = Power **doubles** (2×)
**-3 dB** = Power **halves** (÷2)
**+10 dB** = Power increases **10 times** (10×)
**-10 dB** = Power decreases to **1/10**
:::

### Practical Examples

| Change | dB Value | Example |
|--------|----------|---------|
| 5W → 10W | +3 dB | Doubled |
| 12W → 6W | -3 dB | Halved |
| 20W → 200W | +10 dB | 10× increase |
| 12W → 3W | -6 dB | Two halvings |

:::radio Why Decibels Matter
Decibels are used constantly in ham radio:
- Antenna gain specifications
- Amplifier power output
- Signal strength reports (S-units)
- Feedline loss calculations
:::

:::examfocus The 3 dB Rule
Remember: **3 dB = double the power**. This appears on nearly every exam. If you add 3 dB, power doubles. If you lose 3 dB, power halves. Also know that 10 dB = 10× power change.
:::`,
      keyPoints: [
        'Kilo (k) = 1,000; Mega (M) = 1,000,000; Giga (G) = 1,000,000,000',
        'Milli (m) = 0.001; Micro (μ) = 0.000001; Pico (p) = 0.000000000001',
        '3 dB = power doubles; 10 dB = power increases 10 times',
        '-3 dB = power halves; -6 dB = power drops to one-quarter',
        'Common conversions: 1,500,000 Hz = 1,500 kHz = 1.5 MHz',
      ],
      relatedQuestionIds: [
        'T5B01',
        'T5B02',
        'T5B03',
        'T5B04',
        'T5B05',
        'T5B06',
        'T5B07',
        'T5B08',
        'T5B09',
        'T5B10',
        'T5B11',
        'T5B12',
        'T5B13',
      ],
      interactiveComponents: ['decibel-calculator'],
    },
    {
      id: 'T5C',
      title: 'Capacitance, Inductance, and Impedance',
      content: `# Capacitance, Inductance, and Impedance

Beyond basic resistance, AC circuits involve two additional properties that are fundamental to how radios work: **capacitance** and **inductance**.

---

## Capacitance

:::definition Capacitor
A **capacitor** stores energy in an **electric field**, typically using two conductive plates separated by an insulator.

Measured in **farads** (F)
:::

Since a farad is very large, practical capacitors are usually measured in:
- **Microfarads** (μF) - common in power supplies
- **Picofarads** (pF) - common in RF circuits

:::info Quick Conversion
1,000,000 picofarads = 1 microfarad
:::

### How Capacitors Behave

| With DC | With AC |
|---------|---------|
| Blocks DC completely | Allows AC to pass |
| Acts like an open circuit | Opposition decreases as frequency increases |

---

## Inductance

:::definition Inductor
An **inductor** stores energy in a **magnetic field**, typically using a coil of wire.

Measured in **henrys** (H)
:::

### How Inductors Behave

| With DC | With AC |
|---------|---------|
| Passes DC freely | Opposes AC current |
| Acts like a short circuit | Opposition increases as frequency increases |

:::tip Opposite Behaviors
Capacitors and inductors have **opposite** behaviors with AC:
- Capacitors: opposition **decreases** with frequency
- Inductors: opposition **increases** with frequency

This is fundamental to how tuned circuits work!
:::

---

## Impedance

:::definition Impedance
**Impedance** is the total opposition to AC current flow, combining resistance with the reactive effects of capacitance and inductance.

Measured in **ohms** (Ω)
:::

While resistance is the same for DC and AC, impedance specifically describes AC circuit behavior.

:::warning Impedance Matching
Matching impedance between components (like between a transmitter and antenna) is **critical** for efficient power transfer. Mismatched impedance means wasted power and potential damage to your equipment.
:::

---

## Common Terms

:::radio RF Basics
**RF** stands for **Radio Frequency**—signals of all types used in radio communications.

Frequency is commonly expressed in:
- **kilohertz (kHz)** - thousands of Hz
- **megahertz (MHz)** - millions of Hz
:::`,
      keyPoints: [
        'Capacitance stores energy in an electric field; measured in farads (F)',
        'Inductance stores energy in a magnetic field; measured in henrys (H)',
        'Impedance is the total opposition to AC current; measured in ohms',
        'RF stands for radio frequency signals of all types',
        'Power formula P = I × E applies: 13.8V × 10A = 138 watts',
      ],
      relatedQuestionIds: [
        'T5C01',
        'T5C02',
        'T5C03',
        'T5C04',
        'T5C05',
        'T5C06',
        'T5C07',
        'T5C08',
        'T5C09',
        'T5C10',
        'T5C11',
        'T5C12',
        'T5C13',
      ],
    },
    {
      id: 'T5D',
      title: "Ohm's Law Calculations",
      content: `# Ohm's Law Calculations

Ohm's Law is the fundamental relationship between voltage, current, and resistance. Master this, and you'll ace many exam questions!

---

## The Three Forms of Ohm's Law

:::formula Ohm's Law Triangle
**I = E ÷ R** — Current equals voltage divided by resistance

**E = I × R** — Voltage equals current times resistance

**R = E ÷ I** — Resistance equals voltage divided by current
:::

:::examfocus Ohm's Law on Every Exam
The Technician exam ALWAYS includes at least one Ohm's Law calculation. Memorize E = I × R and its rearrangements. Practice with common values: 12V batteries, 50Ω loads, 100Ω resistors.
:::

:::tip Memory Trick
Picture a triangle with **E** at the top, and **I** and **R** at the bottom:

\`\`\`
    E
   ───
  I × R
\`\`\`

Cover what you want to find:
- Cover E → see I × R
- Cover I → see E ÷ R
- Cover R → see E ÷ I
:::

---

## Practice Problems

### Finding Resistance

:::info Example 1
**Given:** 90 volts, 3 amperes
**Find:** Resistance

R = E ÷ I = 90 ÷ 3 = **30 ohms**
:::

:::info Example 2
**Given:** 12 volts, 1.5 amperes
**Find:** Resistance

R = E ÷ I = 12 ÷ 1.5 = **8 ohms**
:::

### Finding Current

:::info Example 3
**Given:** 200 volts, 100 ohms
**Find:** Current

I = E ÷ R = 200 ÷ 100 = **2 amperes**
:::

### Finding Voltage

:::info Example 4
**Given:** 2 amperes, 10 ohms
**Find:** Voltage

E = I × R = 2 × 10 = **20 volts**
:::

---

## Common Exam Calculations

| Voltage | Resistance | Current |
|---------|------------|---------|
| 120V | 80Ω | **1.5A** |
| 240V | 24Ω | **10A** |
| 12V | 4Ω | **3A** |

---

## Series vs. Parallel Circuits

:::definition Series Circuit
Components connected **end-to-end**. The same current flows through all components.

**Current is the same** throughout
:::

:::definition Parallel Circuit
Components connected across the **same two points**. Each component sees the same voltage.

**Voltage is the same** across all branches
:::

:::tip Circuit Analysis
- In **series**: Add resistances directly (R_total = R1 + R2 + R3)
- In **parallel**: The math is more complex, but total resistance is always **less** than the smallest individual resistance
:::`,
      keyPoints: [
        "Ohm's Law: I = E / R, E = I × R, R = E / I",
        'In series circuits, current is the same through all components',
        'In parallel circuits, voltage is the same across all components',
        'Example: 120V / 80 ohms = 1.5 amperes; 240V / 24 ohms = 10 amperes',
        'Example: 2A × 10 ohms = 20 volts; 0.5A × 2 ohms = 1 volt',
      ],
      relatedQuestionIds: [
        'T5D01',
        'T5D02',
        'T5D03',
        'T5D04',
        'T5D05',
        'T5D06',
        'T5D07',
        'T5D08',
        'T5D09',
        'T5D10',
        'T5D11',
        'T5D12',
        'T5D13',
        'T5D14',
      ],
      interactiveComponents: ['ohms-law-calculator'],
    },
  ],
}

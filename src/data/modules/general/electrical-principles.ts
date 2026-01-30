/**
 * G5 - Electrical Principles Module
 * General Class Amateur Radio License
 */

import type { LearningModule } from '@/types/learning'

export const electricalPrinciplesModule: LearningModule = {
  id: 'G5',
  examLevel: 'general',
  title: 'Electrical Principles',
  description:
    'Understanding reactance, impedance, decibels, power calculations, and component behavior in series and parallel circuits.',
  estimatedMinutes: 60,
  sections: [
    {
      id: 'G5A',
      title: 'Reactance and Impedance Calculations',
      content: `# Reactance and Impedance Calculations

Reactance and impedance are fundamental concepts in AC circuit analysis. Understanding how inductors and capacitors oppose alternating current is essential for designing and troubleshooting radio circuits.

## What is Reactance?

**Reactance** is the opposition to the flow of alternating current caused by capacitance or inductance. Unlike resistance, which opposes both AC and DC equally, reactance only affects AC signals. The symbol for reactance is **X**, and it is measured in **ohms**.

There are two types of reactance:
- **Inductive reactance (XL)**: Opposition to AC in an inductor
- **Capacitive reactance (XC)**: Opposition to AC in a capacitor

## How Reactance Varies with Frequency

Inductors and capacitors behave oppositely with frequency changes:

- **Inductors**: As frequency increases, inductive reactance **increases**
  - Formula: XL = 2πfL (where f is frequency, L is inductance)

- **Capacitors**: As frequency increases, capacitive reactance **decreases**
  - Formula: XC = 1/(2πfC) (where f is frequency, C is capacitance)

\`\`\`
Example: At 1 MHz with a 10 μH inductor:
XL = 2π × 1,000,000 × 0.00001 = 62.8 ohms

At 2 MHz (double frequency):
XL = 2π × 2,000,000 × 0.00001 = 125.6 ohms (double reactance)
\`\`\`

## Impedance

**Impedance (Z)** is the total opposition to AC current flow, combining both resistance and reactance. It is the ratio of voltage to current in an AC circuit. The inverse of impedance is called **admittance**.

Impedance is calculated using: Z = √(R² + X²) for series circuits, where X is the net reactance (XL - XC).

## Resonance in LC Circuits

When inductive reactance equals capacitive reactance (XL = XC), the circuit is at **resonance**. At resonance:

- In a **series LC circuit**: Impedance becomes very **low** (ideally zero, limited only by resistance)
- In a **parallel LC circuit**: Impedance becomes very **high**
- The inductive and capacitive reactances **cancel** each other

## Impedance Matching

Several devices can be used for impedance matching at radio frequencies:
- **Transformers**: Use turns ratio to transform impedance
- **Pi-networks**: L-shaped or Pi-shaped LC networks
- **Transmission line sections**: Quarter-wave transformers
`,
      keyPoints: [
        'Reactance (X) is opposition to AC caused by inductance or capacitance, measured in ohms',
        'Inductive reactance increases with frequency; capacitive reactance decreases with frequency',
        'Impedance (Z) is the ratio of voltage to current; admittance is its inverse',
        'At resonance in a series LC circuit, impedance is very low because XL and XC cancel',
        'Transformers, Pi-networks, and transmission lines can all be used for impedance matching',
      ],
      relatedQuestionIds: [
        'G5A01',
        'G5A02',
        'G5A03',
        'G5A04',
        'G5A05',
        'G5A06',
        'G5A07',
        'G5A08',
        'G5A09',
        'G5A10',
        'G5A11',
        'G5A12',
      ],
    },
    {
      id: 'G5B',
      title: 'Decibels and Power Calculations',
      content: `# Decibels and Power Calculations

The decibel (dB) is a logarithmic unit used to express ratios of power, voltage, or signal strength. Power calculations using Ohm's Law are fundamental skills for amateur radio operators.

## Understanding Decibels

Decibels express power ratios logarithmically, making it easier to work with the large ranges common in radio:

| Power Change | dB Value |
|--------------|----------|
| Double (2x)  | +3 dB    |
| Half (0.5x)  | -3 dB    |
| 10x          | +10 dB   |
| 0.1x         | -10 dB   |

A **1 dB loss** represents approximately **20.6% power loss**. This is important when calculating feedline and connector losses.

\`\`\`
Example: If you have 100 watts and lose 3 dB in feedline:
Output = 100 ÷ 2 = 50 watts

If you lose 1 dB:
Output = 100 × (1 - 0.206) = 79.4 watts
\`\`\`

## Power Calculations with Ohm's Law

The fundamental power formulas are:

- **P = V × I** (Power = Voltage × Current)
- **P = V²/R** (Power = Voltage squared ÷ Resistance)
- **P = I²R** (Power = Current squared × Resistance)

\`\`\`
Example 1: 12 VDC light bulb drawing 0.2 amperes
P = V × I = 12 × 0.2 = 2.4 watts

Example 2: 400 VDC across 800-ohm load
P = V²/R = 400²/800 = 160,000/800 = 200 watts

Example 3: 7.0 mA through 1,250 ohms
P = I²R = (0.007)² × 1250 = 0.0000049 × 1250 = 0.061 watts (61 milliwatts)
\`\`\`

## RMS, Peak, and Peak-to-Peak Voltage

For AC signals, different voltage measurements are used:

- **RMS (Root Mean Square)**: The value that produces the same power as an equivalent DC voltage
- **Peak**: Maximum instantaneous voltage (RMS × 1.414)
- **Peak-to-Peak**: Full swing from negative to positive peak (Peak × 2)

Conversion formulas for sine waves:
- Peak = RMS × 1.414 (or RMS × √2)
- RMS = Peak × 0.707 (or Peak ÷ √2)
- Peak-to-Peak = RMS × 2.828

\`\`\`
Example: 120V RMS (typical AC line voltage)
Peak = 120 × 1.414 = 169.7 volts
Peak-to-Peak = 120 × 2.828 = 339.4 volts

Example: 17V peak signal
RMS = 17 × 0.707 = 12 volts
\`\`\`

## PEP (Peak Envelope Power)

**Peak Envelope Power (PEP)** is the average power during one RF cycle at the peak of the modulation envelope. For an **unmodulated carrier**, PEP equals average power (ratio of 1.00).

To calculate PEP from peak-to-peak voltage across a load:
1. Convert peak-to-peak to peak: Vpeak = Vp-p ÷ 2
2. Convert peak to RMS: Vrms = Vpeak × 0.707
3. Calculate power: P = Vrms²/R

\`\`\`
Example: 200V peak-to-peak across 50 ohms
Vpeak = 200 ÷ 2 = 100V
Vrms = 100 × 0.707 = 70.7V
PEP = 70.7²/50 = 5000/50 = 100 watts

Example: RMS voltage across 50-ohm load dissipating 1200 watts
V = √(P × R) = √(1200 × 50) = √60000 = 245 volts
\`\`\`
`,
      keyPoints: [
        'A 3 dB change represents a factor of 2 in power (double or half)',
        'A 1 dB loss equals approximately 20.6% power loss',
        'RMS voltage produces the same power dissipation as an equal DC voltage',
        'Peak-to-peak voltage = RMS × 2.828 for sine waves',
        'For an unmodulated carrier, PEP equals average power (ratio 1.00)',
      ],
      relatedQuestionIds: [
        'G5B01',
        'G5B02',
        'G5B03',
        'G5B04',
        'G5B05',
        'G5B06',
        'G5B07',
        'G5B08',
        'G5B09',
        'G5B10',
        'G5B11',
        'G5B12',
        'G5B13',
        'G5B14',
      ],
    },
    {
      id: 'G5C',
      title: 'Series/Parallel Components and Transformers',
      content: `# Series/Parallel Components and Transformers

Understanding how components combine in series and parallel configurations, along with transformer operation, is essential for circuit analysis and design.

## Resistors in Series and Parallel

**Series resistors**: Simply add the values
- Rtotal = R1 + R2 + R3 + ...

**Parallel resistors**: Use the reciprocal formula
- 1/Rtotal = 1/R1 + 1/R2 + 1/R3 + ...
- For two resistors: Rtotal = (R1 × R2)/(R1 + R2)

In parallel circuits, **total current equals the sum of currents through each branch** (Kirchhoff's Current Law).

\`\`\`
Example: 10, 20, and 50 ohms in parallel
1/Rtotal = 1/10 + 1/20 + 1/50 = 0.1 + 0.05 + 0.02 = 0.17
Rtotal = 1/0.17 = 5.9 ohms

Example: 100 and 200 ohms in parallel
Rtotal = (100 × 200)/(100 + 200) = 20,000/300 = 66.7 ohms
\`\`\`

## Capacitors in Series and Parallel

Capacitors combine **opposite** to resistors:

**Parallel capacitors**: Add directly (increases capacitance)
- Ctotal = C1 + C2 + C3 + ...
- To increase capacitance, **add a capacitor in parallel**

**Series capacitors**: Use the reciprocal formula (decreases capacitance)
- 1/Ctotal = 1/C1 + 1/C2 + 1/C3 + ...

\`\`\`
Example: Two 5.0 nF and one 750 pF in parallel
Convert: 5.0 nF = 5000 pF
Ctotal = 5000 + 5000 + 750 = 10,750 pF = 10.75 nF

Example: Three 100 μF capacitors in series
1/Ctotal = 1/100 + 1/100 + 1/100 = 0.03
Ctotal = 1/0.03 = 33.3 μF
\`\`\`

## Inductors in Series and Parallel

Inductors combine **like resistors**:

**Series inductors**: Add directly (increases inductance)
- Ltotal = L1 + L2 + L3 + ...
- To increase inductance, **add an inductor in series**

**Parallel inductors**: Use the reciprocal formula (decreases inductance)
- 1/Ltotal = 1/L1 + 1/L2 + 1/L3 + ...

\`\`\`
Example: 20 mH and 50 mH in series
Ltotal = 20 + 50 = 70 mH

Example: Three 10 mH inductors in parallel
1/Ltotal = 1/10 + 1/10 + 1/10 = 0.3
Ltotal = 1/0.3 = 3.3 mH
\`\`\`

## Transformer Operation

Transformers work through **mutual inductance** - the magnetic field from the primary winding induces a voltage in the secondary winding.

**Voltage transformation** depends on the turns ratio:
- Vsecondary/Vprimary = Nsecondary/Nprimary

**Step-up transformer**: More secondary turns than primary (increases voltage)
**Step-down transformer**: Fewer secondary turns than primary (decreases voltage)

\`\`\`
Example: 500-turn primary, 1500-turn secondary, 120 VAC input
Turns ratio = 1500/500 = 3:1 (step-up)
Vout = 120 × 3 = 360 volts
\`\`\`

If you apply voltage to the **secondary of a step-down transformer**, it acts as a **step-up transformer** - a 4:1 step-down becomes 4:1 step-up, multiplying the input by 4.

**Wire size**: In a step-up transformer, the primary winding wire is larger because it carries **higher current** (power in equals power out, so lower voltage side has higher current).

**Impedance matching** with transformers:
- Impedance ratio = (turns ratio)²
- For matching 600 ohms to 50 ohms: Zratio = 600/50 = 12
- Turns ratio = √12 = 3.46:1 (approximately 3.5:1)
`,
      keyPoints: [
        'Parallel resistors: total current equals sum of branch currents',
        'To increase capacitance, add a capacitor in parallel; for inductance, add an inductor in series',
        'Transformers operate through mutual inductance between windings',
        'Primary winding of step-up transformer uses larger wire due to higher current',
        'Impedance ratio equals the square of the turns ratio (Zratio = n²)',
      ],
      relatedQuestionIds: [
        'G5C01',
        'G5C02',
        'G5C03',
        'G5C04',
        'G5C05',
        'G5C06',
        'G5C07',
        'G5C08',
        'G5C09',
        'G5C10',
        'G5C11',
        'G5C12',
        'G5C13',
        'G5C14',
      ],
    },
  ],
}

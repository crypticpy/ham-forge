/**
 * E5 - Electrical Principles Module
 * Amateur Extra Class License (Element 4)
 */

import type { LearningModule } from '@/types/learning'

export const electricalPrinciplesModule: LearningModule = {
  id: 'E5',
  examLevel: 'extra',
  title: 'Electrical Principles',
  description:
    'Advanced AC circuit theory: resonance and Q, impedance/admittance and phase angle, complex notation and impedance plots, plus parasitics and skin effect at RF.',
  estimatedMinutes: 75,
  sections: [
    {
      id: 'E5A',
      title: 'Resonant Circuits, Impedance at Resonance, and Q',
      content: `# Resonant Circuits, Impedance at Resonance, and Q (E5A)

Resonance questions show up throughout Element 4. The pool focuses on what changes at resonance and how Q relates to bandwidth and internal voltages/currents.

## Resonant Frequency

For an ideal LC resonant circuit:

:::formula Resonant frequency
f0 = 1 / (2π√(L·C))
:::

## Series vs. Parallel Resonance

### Series RLC at resonance

At resonance:

- Net reactance cancels (XL = XC)
- Input impedance magnitude is approximately the **circuit resistance**
- Current and voltage are **in phase**

High-Q series resonance can produce:

- Very large **internal voltages** across L and C (even larger than the applied voltage) due to circulating energy.

:::definition Why internal voltages can exceed applied voltage
At resonance, energy sloshes between L and C. With high Q (low loss), circulating current can be large, creating large reactive voltages across L and C even though the net reactive voltage sums to ~0.
:::

### Parallel RLC at resonance

At resonance:

- The circulating current within the LC branch is **maximum**
- The input current is **minimum**
- Input impedance magnitude is approximately the **circuit resistance** (for the equivalent loss resistance model)

## Q (Quality Factor)

Q is a measure of “how sharp” the resonance is (stored energy vs. dissipated energy).

Effects emphasized by the pool:

- Increasing Q decreases the **half-power bandwidth** (narrower match/filter bandwidth)
- Increasing Q can increase **internal voltages** in a series resonant circuit

For a resonant circuit:

:::formula Half-power bandwidth
BW ≈ f0 / Q
:::

For a parallel resonant RLC circuit, Q can be calculated as:

- Q = R / X (resistance divided by reactance of either L or C at resonance)`,
      keyPoints: [
        'Resonant frequency for LC circuits is f0 = 1 / (2π√(LC))',
        'At resonance, series RLC impedance ≈ R and V/I are in phase; parallel RLC input current is minimum while circulating current is maximum',
        'Higher Q means narrower bandwidth (BW ≈ f0/Q) and can increase internal reactive voltages',
        'Parallel RLC Q can be computed as R divided by reactance at resonance',
      ],
      relatedQuestionIds: [
        'E5A01',
        'E5A02',
        'E5A03',
        'E5A04',
        'E5A05',
        'E5A06',
        'E5A07',
        'E5A08',
        'E5A09',
        'E5A10',
        'E5A11',
        'E5A12',
        'E5A13',
      ],
    },
    {
      id: 'E5B',
      title: 'Time Constants, Admittance, Susceptance, and Phase Angle',
      content: `# Time Constants, Admittance, Susceptance, and Phase Angle (E5B)

This group focuses on RC time constants, admittance/susceptance, and phase relationships in reactive components and RLC circuits.

## RC Time Constant

:::definition Time constant
One **time constant** (τ) is the time required for a capacitor in an RC circuit to:

- charge to **63.2%** of the applied voltage, or
- discharge to **36.8%** of its initial voltage
:::

:::formula Time constant
τ = R × C
:::

## Admittance and Susceptance

:::definition Admittance
**Admittance (Y)** is the inverse of impedance: Y = 1/Z.
:::

The imaginary part of admittance is:

:::definition Susceptance
**Susceptance** is the **imaginary** part of admittance and is commonly represented by the letter **B**.
:::

### Converting impedance (polar) to admittance

If impedance is expressed in polar form (magnitude ∠ angle), convert to admittance by:

- Taking the **reciprocal of the magnitude**
- Changing the **sign of the angle**

### Pure reactance to susceptance

For pure reactance, converting to susceptance effectively replaces the magnitude with its:

- **reciprocal** (because susceptance is proportional to 1/X).

## Phase Relationships (Inductors and Capacitors)

Key “90-degree” facts:

- In a capacitor: **current leads voltage by 90°**
- In an inductor: **voltage leads current by 90°**

## Phase Angle in Series RLC

For a series RLC circuit:

- Net reactance: X = XL − XC
- Phase angle: φ = tan⁻¹(X/R)

Sign convention:

- If net reactance is **capacitive** (X is negative), voltage lags current.
- If net reactance is **inductive** (X is positive), voltage leads current.`,
      keyPoints: [
        'One RC time constant is the time to reach 63.2% charge (or 36.8% remaining on discharge)',
        'Admittance is the inverse of impedance; susceptance (B) is the imaginary part of admittance',
        'Convert Z in polar to Y by taking the reciprocal magnitude and negating the angle',
        'Capacitor: current leads voltage by 90°; Inductor: voltage leads current by 90°',
        'In series RLC, phase depends on net reactance (XL − XC) and resistance',
      ],
      relatedQuestionIds: [
        'E5B01',
        'E5B02',
        'E5B03',
        'E5B04',
        'E5B05',
        'E5B06',
        'E5B07',
        'E5B08',
        'E5B09',
        'E5B10',
        'E5B11',
        'E5B12',
      ],
    },
    {
      id: 'E5C',
      title: 'Complex Impedance Notation and Impedance Plots (Figure E5-1)',
      content: `# Complex Impedance Notation and Impedance Plots (E5C)

Extra exam questions use both rectangular and polar notation for impedance and expect you to interpret plots like Figure E5-1.

## Rectangular and Polar Notation

Impedance can be written as:

- **Rectangular**: Z = R + jX
- **Polar**: magnitude and phase angle: |Z| ∠ θ

Examples from the pool:

- Pure capacitive reactance of 100 Ω: **0 − j100**
- A pure inductive reactance has a **+90°** phase angle in polar form
- Impedance **50 − j25 Ω** means 50 Ω resistance in series with 25 Ω **capacitive** reactance

## Plotting Impedance on Rectangular Coordinates

When graphing impedance:

- X-axis represents the **resistive component (R)**
- Y-axis represents the **reactive component (X)**
  - Inductive reactance is positive (up)
  - Capacitive reactance is negative (down)

Pure resistance plots on:

- The **horizontal axis** (X = 0)

## Polar Coordinates and Phasor Diagrams

To display phase angle of circuits containing R, L, and/or C:

- Polar coordinates are commonly used

And to show the phase relationship between impedances at a frequency:

- Use a **phasor diagram**

## Frequency Response Graphs

Circuit frequency response plots often use a:

- **Logarithmic** Y-axis scale (e.g., dB magnitude response)

## Figure E5-1 Questions

Several pool questions ask you to identify which point on **Figure E5-1** best represents the impedance of a series R + C or R + L circuit at a given frequency.

:::tip Plotting shortcut
Compute R and X first, then locate the point (R on horizontal axis, X on vertical axis). Capacitors go downward; inductors go upward.
:::`,
      keyPoints: [
        'Rectangular impedance is R + jX; polar impedance is magnitude ∠ phase',
        'Pure capacitive reactance is negative imaginary (e.g., 0 − j100); pure inductive reactance is +90° in polar form',
        'On rectangular impedance plots, the X-axis is resistance and the Y-axis is reactance (inductive up, capacitive down)',
        'Phasor diagrams show phase relationships; frequency response graphs often use logarithmic scales',
        'Figure E5-1 questions map computed (R, X) points to plotted locations',
      ],
      relatedQuestionIds: [
        'E5C01',
        'E5C02',
        'E5C03',
        'E5C04',
        'E5C05',
        'E5C06',
        'E5C07',
        'E5C08',
        'E5C09',
        'E5C10',
        'E5C11',
        'E5C12',
      ],
    },
    {
      id: 'E5D',
      title: 'RF Effects: Skin Effect, Parasitics, and Reactive Power',
      content: `# RF Effects: Skin Effect, Parasitics, and Reactive Power (E5D)

At HF and above, “ideal component” assumptions break down. The pool focuses on skin effect, parasitic inductance/capacitance, and what reactive power means.

## Skin Effect

:::definition Skin effect
As frequency increases, RF current flows closer to the conductor surface. This increases effective resistance with frequency.
:::

Practical consequences:

- RF losses increase at higher frequencies
- Larger surface area conductors can reduce loss

## Lead Length and Microwave Connections

At VHF and above, long component leads behave like inductors:

- Keep lead lengths short to minimize unwanted **inductive reactance**

At microwave frequencies, short connections are used to:

- Reduce **phase shift** along the connection

## Capacitors at RF (Why Electrolytics Are Bad Here)

Electrolytic capacitors are unsuitable for RF bypassing because they have significant parasitic:

- **Inductance**

## Inductor Self-Resonance

Inductors have inter-turn capacitance. Self-resonance occurs due to:

- **Inter-turn capacitance**

More generally, a component’s self-resonance is created by:

- The component’s nominal reactance combined with parasitic reactance

## Reactive Power

Reactive power has a phase relationship:

- Current and voltage are **90° out of phase**

In ideal inductors and capacitors:

- Energy is stored in fields (magnetic/electric), but power is **not dissipated**

:::definition Reactive power
Reactive power is **wattless, nonproductive power** associated with energy storage in fields.
:::

## Real Power in R + X Circuits

Real power is consumed only in resistive components.

Example emphasized by the pool:

- With 1 A through a 100 Ω resistor (even with series reactance), real power is P = I² × R = 100 W.

## Electrical Length vs. Diameter

As a conductor’s diameter increases, its electrical length:

- **Increases**.`,
      keyPoints: [
        'Skin effect increases resistance with frequency because RF current crowds the conductor surface',
        'Short leads are important at VHF/microwave to reduce inductance and phase shift',
        'Electrolytic capacitors are unsuitable at RF due to parasitic inductance',
        'Inductor self-resonance is caused by inter-turn capacitance and parasitic reactances',
        'Reactive power involves 90° phase shift and stores energy without dissipation; real power is I²R in the resistive part',
        'Increasing conductor diameter increases electrical length',
      ],
      relatedQuestionIds: [
        'E5D01',
        'E5D02',
        'E5D03',
        'E5D04',
        'E5D05',
        'E5D06',
        'E5D07',
        'E5D08',
        'E5D09',
        'E5D10',
        'E5D11',
        'E5D12',
      ],
    },
  ],
}

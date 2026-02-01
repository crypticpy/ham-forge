/**
 * T6 - Circuit Components
 * Learning module for electronic components used in amateur radio equipment
 */

import type { LearningModule } from '@/types/learning'

export const circuitComponentsModule: LearningModule = {
  id: 'T6',
  examLevel: 'technician',
  title: 'Circuit Components',
  description:
    'Electronic components including resistors, capacitors, inductors, semiconductors, and integrated circuits used in amateur radio equipment, along with schematic symbol identification.',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'T6A',
      title: 'Resistors, Capacitors, Inductors, and Basic Components',
      content: `# Fundamental Electronic Components

Electronic circuits are built from fundamental components that each serve specific purposes. Understanding these basic building blocks is essential for working with amateur radio equipment, troubleshooting problems, and building your own projects.

---

## Resistors

:::definition
A **resistor** opposes the flow of current in a DC circuit. Measured in **ohms (Ω)**.
:::

Resistors perform several important functions:
- **Limit current** to safe levels for components
- **Divide voltages** to create reference points
- **Set bias points** in amplifier circuits

:::tip
A **potentiometer** is an adjustable resistor commonly used as a volume control. Turning the shaft changes the resistance value.
:::

---

## Capacitors

:::definition
A **capacitor** stores energy in an **electric field**. Measured in **farads (F)**, though practical values are usually microfarads (μF) or picofarads (pF).
:::

| Property | Description |
|----------|-------------|
| Construction | Two conductive plates separated by an insulator (dielectric) |
| AC Behavior | Blocks DC, passes AC |
| Common Uses | Signal coupling, power supply filtering |

---

## Inductors

:::definition
An **inductor** stores energy in a **magnetic field**. Measured in **henrys (H)**.
:::

- Typically constructed as a **coil of wire**
- Opposes changes in current flow
- Combined with capacitors to form **resonant circuits** that select specific frequencies

:::radio
Resonant circuits are fundamental to radio design—they're how radios tune to specific frequencies!
:::

---

## Switches and Protection

| Switch Type | Description | Use Case |
|-------------|-------------|----------|
| **SPST** | Single-Pole Single-Throw | Opens or closes a single circuit |
| **SPDT** | Single-Pole Double-Throw | Switches one circuit between two others |

:::info
SPDT switches are useful for selecting between antenna connections or switching between receive and transmit modes.
:::

**Fuses** protect circuit components by melting and breaking the circuit when excessive current flows.

---

## Batteries

| Type | Rechargeable? |
|------|---------------|
| Nickel-Metal Hydride (NiMH) | Yes |
| Lithium-Ion (Li-ion) | Yes |
| Lead-Acid | Yes |
| Carbon-Zinc | **No** |

:::warning
Carbon-zinc batteries are NOT rechargeable. Dispose of them properly after use.
:::`,
      keyPoints: [
        'Resistors oppose current flow; potentiometers are adjustable resistors for volume control',
        'Capacitors store energy in an electric field between conductive plates separated by an insulator',
        'Inductors store energy in a magnetic field and are constructed as coils of wire',
        'SPDT switches connect one circuit to one of two other circuits; fuses protect against overcurrent',
        'Rechargeable batteries: NiMH, Li-ion, lead-acid; Carbon-zinc is NOT rechargeable',
      ],
      relatedQuestionIds: [
        'T6A01',
        'T6A02',
        'T6A03',
        'T6A04',
        'T6A05',
        'T6A06',
        'T6A07',
        'T6A08',
        'T6A09',
        'T6A10',
        'T6A11',
        'T6A12',
      ],
      interactiveComponents: ['circuit-identifier'],
    },
    {
      id: 'T6B',
      title: 'Semiconductors: Diodes, Transistors, and LEDs',
      content: `# Semiconductor Devices

Semiconductors revolutionized electronics by providing compact, reliable components that can switch and amplify signals. They are found in virtually every piece of modern amateur radio equipment.

---

## Diodes

:::definition
A **diode** is a semiconductor device that allows current to flow in **only one direction**.
:::

| Electrode | Description |
|-----------|-------------|
| **Anode** | Positive terminal |
| **Cathode** | Negative terminal (marked with a stripe) |

:::tip
Look for the **stripe on the package**—it marks the cathode (negative) lead for easy identification.
:::

### Forward Voltage Drop

When current flows through a diode in the forward direction, there is a small voltage drop:

| Diode Type | Forward Voltage Drop |
|------------|---------------------|
| Silicon | ~0.6V |
| LED (varies by color) | 1.5V - 3V |

---

## Light-Emitting Diodes (LEDs)

:::info
**LEDs** emit light when forward current flows through them. Commonly used as visual indicators showing power status or signal presence.
:::

Key characteristics:
- More efficient and longer-lasting than incandescent bulbs
- Must be connected with **proper polarity**
- Usually require a **current-limiting resistor**

---

## Bipolar Junction Transistors (BJTs)

:::definition
A **BJT** is a three-terminal semiconductor device that can **amplify signals** or act as an **electronic switch**.
:::

| Terminal | Function |
|----------|----------|
| **Emitter** | Current output |
| **Base** | Control input (small current) |
| **Collector** | Current input |

:::radio
A small current into the base controls a larger current between collector and emitter—this is how transistors provide **power gain** (amplification).
:::

---

## Field-Effect Transistors (FETs)

| Terminal | Function |
|----------|----------|
| **Gate** | Control input (voltage) |
| **Drain** | Current input |
| **Source** | Current output |

:::info
Unlike BJTs, FETs use **voltage at the gate** to control current flow between drain and source.
:::

**Advantages of FETs in radio applications:**
- High input impedance
- Low noise characteristics
- Widely used in RF circuits

---

## Understanding Gain

:::definition
**Gain** describes a device's ability to amplify a signal—increasing its power, voltage, or current level.
:::`,
      keyPoints: [
        'Diodes allow current flow in one direction only; electrodes are anode and cathode',
        'Cathode is marked with a stripe; forward voltage drop varies by diode type',
        'LEDs emit light from forward current and are used as visual indicators',
        'BJT transistors have emitter, base, collector; FETs have gate, drain, source',
        'Transistors provide power gain (amplification) and can act as electronic switches',
      ],
      relatedQuestionIds: [
        'T6B01',
        'T6B02',
        'T6B03',
        'T6B04',
        'T6B05',
        'T6B06',
        'T6B07',
        'T6B08',
        'T6B09',
        'T6B10',
        'T6B11',
        'T6B12',
      ],
    },
    {
      id: 'T6C',
      title: 'Schematic Reading and Symbol Identification',
      content: `# Reading Schematic Diagrams

A schematic is an electrical wiring diagram that uses standard component symbols to show how components are connected. Learning to read schematics is an essential skill for understanding, building, and troubleshooting radio equipment.

---

## What Schematics Show (and Don't Show)

:::info
Schematics focus on **electrical connections**, not physical appearance.
:::

| Accurately Represents | Does NOT Represent |
|----------------------|-------------------|
| Component connections | Wire lengths |
| Which terminal connects where | Physical component size |
| Circuit topology | Actual layout on circuit board |
| Component values | Component appearance |

:::tip
A resistor symbol looks the same regardless of the resistor's physical size or power rating. This abstraction makes schematics universal.
:::

---

## Common Schematic Symbols

| Component | Symbol Description |
|-----------|-------------------|
| **Resistor** | Zigzag line |
| **Capacitor** | Two parallel lines (curved for polarized) |
| **Inductor** | Series of loops |
| **Transformer** | Two inductors with parallel lines between |
| **Battery** | Alternating long and short parallel lines |
| **Diode** | Triangle pointing to a line |
| **LED** | Diode symbol with arrows pointing outward |
| **Transistor** | Circle with lines for terminals |
| **Switch** | Break in a line with moving contact |
| **Ground** | Descending horizontal lines or triangle |
| **Antenna** | Lines radiating from a connection point |

---

## Variable Components

:::definition
**Variable components** are shown with an **arrow through the symbol**.
:::

| Component | Symbol |
|-----------|--------|
| Variable resistor (potentiometer) | Resistor with arrow |
| Variable capacitor | Capacitor with arrow |
| Variable inductor | Inductor with arrow |

---

## Exam Figure Practice

:::warning
The exam includes figures (T-1, T-2, T-3) showing actual schematic diagrams where you must identify specific components.
:::

**Components to recognize in exam figures:**
- Resistors and variable resistors
- Capacitors
- Inductors and variable inductors
- Transistors
- Diodes and LEDs
- Transformers
- Batteries
- Lamps
- Antennas

:::tip
Practice identifying these components in the official exam supplement diagrams before your test!
:::`,
      keyPoints: [
        'A schematic uses standard symbols to show electrical connections, not physical layout',
        'Schematics accurately show component connections but NOT wire lengths or physical appearance',
        'Learn symbols: resistor (zigzag), capacitor (parallel lines), inductor (loops), diode (triangle to line)',
        'Variable components have an arrow through the symbol; ground is descending lines',
        'Practice identifying components in exam figures T-1, T-2, and T-3',
      ],
      relatedQuestionIds: [
        'T6C01',
        'T6C02',
        'T6C03',
        'T6C04',
        'T6C05',
        'T6C06',
        'T6C07',
        'T6C08',
        'T6C09',
        'T6C10',
        'T6C11',
        'T6C12',
      ],
    },
    {
      id: 'T6D',
      title: 'Practical Circuits: Regulators, Relays, and ICs',
      content: `# Practical Electronic Circuits

Real radio equipment combines basic components into functional circuits. Understanding these practical circuits helps you work with power supplies, switching systems, and complex electronic assemblies.

---

## Power Supply Components

### Rectifiers

:::definition
A **rectifier** changes alternating current (AC) into varying direct current (DC).
:::

- First stage in a power supply
- Uses diodes to convert AC to DC
- Output needs filtering and regulation

### Transformers

:::info
A **transformer** changes AC voltage levels—typically stepping down 120V AC to a lower voltage suitable for equipment.
:::

### Regulators

:::definition
A **regulator** controls the amount of voltage from a power supply, maintaining steady output despite variations in input voltage or load current.
:::

:::warning
Electronic components require stable voltage to operate correctly. Regulators are essential for reliable operation.
:::

---

## Integrated Circuits (ICs)

:::definition
An **integrated circuit (IC)** combines several semiconductors and other components into one package.
:::

| Advantage | Description |
|-----------|-------------|
| Compact size | Many functions in small package |
| Reliability | Fewer solder connections to fail |
| Cost | Mass production reduces cost |
| Consistency | Manufactured to tight tolerances |

:::tip
Many voltage regulators are available as simple three-terminal IC packages—input, ground, and regulated output.
:::

---

## Relays

:::definition
A **relay** is an electrically-controlled switch. A small control signal can switch a larger current.
:::

**How relays work:**
1. Current flows through the relay's coil
2. Creates a magnetic field
3. Magnetic field moves mechanical contacts
4. Contacts complete or break the switched circuit

**Common amateur radio uses:**
- Antenna switching
- Amplifier keying (T/R switching)
- Band switching
- Any application needing isolation between control and power circuits

---

## Resonant (Tuned) Circuits

:::radio
**Resonant circuits** consist of an inductor and capacitor connected in series or parallel. They are fundamental to radio design!
:::

| Configuration | At Resonant Frequency |
|--------------|----------------------|
| Series LC | **Minimum impedance** |
| Parallel LC | **Maximum impedance** |

**Applications:**
- Selecting desired frequencies
- Rejecting unwanted frequencies (interference)
- Building filters and oscillators

---

## Shielding and Measurement

### Shielded Wire

:::info
**Shielded wire** prevents coupling of unwanted signals to or from the wire. The shield (usually braided conductor) surrounds the inner wire.
:::

Important in radio equipment where:
- Sensitive receive signals must be protected from noise
- Strong transmit signals shouldn't interfere with other circuits

### Meters

:::definition
**Meters** display electrical quantities as numeric values—essential for monitoring power output, SWR, voltage, current, and other parameters.
:::`,
      keyPoints: [
        'Rectifiers convert AC to DC; transformers change AC voltage levels',
        'Regulators control power supply voltage for stable circuit operation',
        'Integrated circuits (ICs) combine multiple semiconductors and components in one package',
        'Relays are electrically-controlled switches for isolating control and power circuits',
        'Resonant circuits (inductor + capacitor) select frequencies; shielded wire prevents interference',
      ],
      relatedQuestionIds: [
        'T6D01',
        'T6D02',
        'T6D03',
        'T6D04',
        'T6D05',
        'T6D06',
        'T6D07',
        'T6D08',
        'T6D09',
        'T6D10',
        'T6D11',
      ],
    },
  ],
}

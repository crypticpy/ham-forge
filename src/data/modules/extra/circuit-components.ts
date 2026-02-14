/**
 * E6 - Circuit Components Module
 * Amateur Extra Class License (Element 4)
 */

import type { LearningModule } from '@/types/learning'

export const circuitComponentsModule: LearningModule = {
  id: 'E6',
  examLevel: 'extra',
  title: 'Circuit Components',
  description:
    'Advanced component theory: semiconductor physics, diodes, digital logic families, crystals and magnetics, RF packaging/MMICs, and optoelectronics.',
  estimatedMinutes: 80,
  sections: [
    {
      id: 'E6A',
      title: 'Semiconductor Fundamentals and Transistor Types (Figure E6-1)',
      content: `# Semiconductor Fundamentals and Transistor Types (E6A)

This section covers doping concepts, PN junction behavior, transistor parameters, and recognition of common FET symbols.

## Semiconductor Doping Basics

Semiconductors are “doped” with impurities to change carrier concentration:

- **N-type** material has excess **free electrons**
- **P-type** material has excess **holes**

An impurity that adds holes is called an:

- **Acceptor** impurity

## PN Junction Diodes (Reverse Bias)

A PN junction diode does not conduct when reverse biased because:

- The applied voltage widens the depletion region by pulling holes and electrons away from the junction.

## Transistor Parameters and Bias Points

### FET vs. bipolar input impedance

- A field-effect transistor (FET) typically has **higher DC gate input impedance** than a bipolar transistor’s base input.

### BJT beta (β)

:::definition Beta (β)
Beta is the change in collector current with respect to the change in base current.
:::

### Silicon NPN “on” indicator

For a silicon NPN transistor biased on:

- Base-to-emitter voltage is about **0.6 to 0.7 V**

### Alpha cutoff frequency

The pool references the “alpha cutoff frequency” as:

- The frequency where grounded-base current gain has decreased to **0.7** of the gain obtainable at 1 kHz.

## Depletion-Mode FETs

:::definition Depletion-mode FET
A depletion-mode FET conducts between source and drain even with **no gate voltage applied** (channel exists at Vg = 0).
:::

## Why GaAs Shows Up at Microwave Frequencies

Gallium arsenide is commonly used in:

- **Microwave circuits**, largely due to **high electron mobility**.

## MOSFET Gate Protection

MOSFET gates are sensitive to static discharge. One protection method:

- Connect **Zener diodes** between the gate and source/drain to clamp voltage and prevent damage.

## Figure E6-1 Symbol Recognition

The pool uses Figure E6-1 to test recognition of FET symbols (dual-gate MOSFETs, JFET channel types, etc.).`,
      keyPoints: [
        'N-type has excess electrons; acceptor impurities add holes (P-type behavior)',
        'Reverse bias widens the PN depletion region, preventing conduction',
        'FETs generally have higher input impedance than bipolar transistors',
        'BJT beta is ΔIc/ΔIb; silicon NPN “on” Vbe is ~0.6–0.7 V',
        'Depletion-mode FETs conduct at Vg = 0; GaAs is used at microwave frequencies due to high electron mobility',
        'Zener diodes can protect MOSFET gates from static damage; Figure E6-1 tests symbol recognition',
      ],
      relatedQuestionIds: [
        'E6A01',
        'E6A02',
        'E6A03',
        'E6A04',
        'E6A05',
        'E6A06',
        'E6A07',
        'E6A08',
        'E6A09',
        'E6A10',
        'E6A11',
        'E6A12',
      ],
    },
    {
      id: 'E6B',
      title: 'Diode Types and Applications (Figure E6-2)',
      content: `# Diode Types and Applications (E6B)

Extra questions cover “special purpose” diodes used for regulation, RF detection/mixing, switching, and variable capacitance.

## Zener Diodes

The most useful Zener characteristic:

- A relatively **constant voltage drop** over a range of current (voltage regulation/reference).

## Schottky Diodes

Schottky diodes are metal–semiconductor junction devices with:

- **Lower forward voltage drop** than silicon PN junction diodes

Common RF uses:

- VHF/UHF mixers and detectors

## LEDs (Forward Voltage)

LED forward voltage depends on:

- The semiconductor material **band gap**

## Varactors (Voltage-Controlled Capacitors)

:::definition Varactor diode
A **varactor** is designed to act as a **voltage-controlled capacitor** (reverse bias varies junction capacitance).
:::

## PIN Diodes (RF Switching and Attenuation)

PIN diodes are useful as RF switches because of:

- Low junction capacitance (in RF context)

RF attenuation using a PIN diode is controlled by:

- Forward DC bias current

## Failure Mechanism Under Excess Current

A junction diode can fail from excessive current due to:

- Excessive junction temperature

## Figure E6-2 Symbol Recognition

Figure E6-2 includes diode symbols (including Schottky). The pool tests recognition of which symbol corresponds to which diode type.`,
      keyPoints: [
        'Zener diodes provide a near-constant voltage under varying current',
        'Schottky diodes are metal-semiconductor junctions with lower forward voltage and are used as VHF/UHF mixers/detectors',
        'LED forward voltage depends on band gap; varactors act as voltage-controlled capacitors',
        'PIN diodes are used as RF switches/attenuators; attenuation is controlled by forward bias current',
        'Excess current failures occur due to excessive junction temperature; Figure E6-2 tests symbol recognition',
      ],
      relatedQuestionIds: [
        'E6B01',
        'E6B02',
        'E6B03',
        'E6B04',
        'E6B05',
        'E6B06',
        'E6B07',
        'E6B08',
        'E6B09',
        'E6B10',
        'E6B11',
      ],
    },
    {
      id: 'E6C',
      title: 'Digital Logic: Comparators, Logic Families, Gates, and FPGA Concepts (Figure E6-3)',
      content: `# Digital Logic: Comparators, Logic Families, Gates, and FPGA Concepts (E6C)

This group is about practical digital building blocks: comparators, hysteresis, tri-state outputs, CMOS vs bipolar traits, and basic gate identification.

## Comparators and Hysteresis

When a comparator input crosses the threshold voltage:

- The comparator changes its output state

:::definition Hysteresis
Hysteresis prevents input noise from causing unstable output signals by creating different switching thresholds depending on the output state.
:::

## Tri-State Logic

:::definition Tri-state logic
Tri-state logic devices can output **0**, **1**, or **high impedance** (effectively disconnected).
:::

Tri-state outputs allow multiple devices to share a bus (only one drives at a time).

## Logic Families (CMOS, BiCMOS)

Power consumption:

- **CMOS** generally has the lowest power consumption among common logic families.

Noise immunity:

- CMOS has high noise immunity because its input switching threshold is about **half the power supply voltage**.

BiCMOS advantage:

- Combines CMOS high input impedance with bipolar low output impedance.

## Pull-Up and Pull-Down Resistors

A pull-up or pull-down resistor is:

- A resistor to the positive or negative supply used to establish a known voltage when an input/output would otherwise float.

## FPGA Configuration

Field-programmable gate arrays (FPGAs) are configured using:

- A hardware description language (**HDL**)

## Figure E6-3 Gate Identification

Figure E6-3 is used to identify common gate symbols, including NAND, NOR, and NOT/inversion.`,
      keyPoints: [
        'Comparators change output when input crosses threshold; hysteresis prevents noise-driven output chatter',
        'Tri-state logic outputs 0, 1, or high-impedance to share buses',
        'CMOS has low power and strong noise immunity (threshold ~ half supply); BiCMOS combines CMOS input with bipolar output traits',
        'Pull-up/pull-down resistors prevent floating inputs; FPGAs are configured using HDL',
        'Figure E6-3 tests NAND/NOR/NOT gate symbol recognition',
      ],
      relatedQuestionIds: [
        'E6C01',
        'E6C02',
        'E6C03',
        'E6C04',
        'E6C05',
        'E6C06',
        'E6C07',
        'E6C08',
        'E6C09',
        'E6C10',
        'E6C11',
      ],
    },
    {
      id: 'E6D',
      title: 'Crystals and Magnetics: Piezoelectricity, Cores, and Transformers',
      content: `# Crystals and Magnetics: Piezoelectricity, Cores, and Transformers (E6D)

This group covers crystal behavior (piezoelectric effect, equivalent circuits) and practical magnetic core concepts.

## Piezoelectricity and Quartz Crystals

:::definition Piezoelectricity
Piezoelectricity is a property of materials that generate a voltage when stressed and flex when a voltage is applied.
:::

An aspect of the piezoelectric effect:

- Mechanical deformation due to an applied voltage

Quartz crystal equivalent circuit:

- Series RLC in parallel with a shunt capacitor representing electrode/stray capacitance

## Magnetic Cores and Eddy Currents

Inductor/transformer cores are sometimes built from thin layers to:

- Reduce power loss from **eddy currents**

Core material and inductance:

- Inductance depends on core **permeability**

Ferrite vs. powdered iron:

- Ferrite cores generally require **fewer turns** for a given inductance than powdered iron.

Temperature stability:

- Powdered iron has very good temperature stability of magnetic characteristics.

## Transformers and Magnetizing Current

The current in a transformer primary with no secondary load is:

- **Magnetizing current**

## RF Practicalities

Ferrite beads are commonly used as VHF/UHF parasitic suppressors at transistor HF amplifier terminals.

Toroidal core advantage:

- Toroids confine most of the magnetic field within the core material (reduced external coupling).

Core that decreases inductance when inserted:

- **Brass**

Inductor saturation occurs due to:

- Excessive magnetic flux (core driven beyond linear region).`,
      keyPoints: [
        'Piezoelectric materials generate voltage when stressed and deform under applied voltage; quartz crystals behave like series RLC in parallel with shunt C',
        'Laminated cores reduce eddy current loss; inductance depends on permeability',
        'Ferrite cores need fewer turns than powdered iron for the same inductance; powdered iron is very temperature stable',
        'Transformer no-load primary current is magnetizing current; ferrite beads suppress parasitics at RF terminals',
        'Toroidal cores confine magnetic fields; brass slugs reduce inductance; saturation occurs at excessive flux',
      ],
      relatedQuestionIds: [
        'E6D01',
        'E6D02',
        'E6D03',
        'E6D04',
        'E6D05',
        'E6D06',
        'E6D07',
        'E6D08',
        'E6D09',
        'E6D10',
        'E6D11',
        'E6D12',
      ],
    },
    {
      id: 'E6E',
      title: 'RF Components and Packaging: MMICs, SMT, GaAs/GaN, and Microstrip',
      content: `# RF Components and Packaging: MMICs, SMT, GaAs/GaN, and Microstrip (E6E)

At VHF/UHF/microwave, packaging and parasitics matter as much as schematic symbols.

## Semiconductor Materials for High Frequencies

Why GaAs is useful at UHF and higher:

- Higher **electron mobility**

Which material supports the highest frequency operation in MMICs:

- **Gallium nitride (GaN)**

## MMIC (Monolithic Microwave Integrated Circuit) Characteristics

Common impedance:

- MMICs commonly have **50 Ω** input and output impedance

Why they are popular:

- Controlled gain, low noise figure, and relatively constant impedance over a specified frequency range

Typical low-noise UHF preamp noise figure in the pool:

- About **0.5 dB**

Common connection style:

- **Microstrip** transmission lines are often used for connections to MMICs

Powering an MMIC:

- Often supplied through a resistor and/or RF choke connected to the amplifier output lead (bias feed).

## Packaging and Parasitics

Through-hole package called out in the pool:

- **DIP** (dual in-line package) with two rows of pins

Why DIP is not typically used at UHF and higher:

- Excessive lead length (parasitics)

Packaging with least parasitic effects above HF:

- **Surface-mount** components

Surface-mount RF advantages include:

- Short leads, lower inductance, better repeatability, and easier high-frequency layout.`,
      keyPoints: [
        'GaAs has high electron mobility for UHF/microwave; GaN supports very high-frequency MMIC operation',
        'MMICs typically present 50-ohm input/output and offer controlled gain with low noise (UHF LNA NF ~0.5 dB)',
        'Microstrip is commonly used to connect to MMICs; bias is often fed through an RF choke/resistor',
        'DIP is a through-hole IC package but is unsuitable at UHF due to lead-length parasitics; surface-mount has the least parasitic effects',
      ],
      relatedQuestionIds: [
        'E6E01',
        'E6E02',
        'E6E03',
        'E6E04',
        'E6E05',
        'E6E06',
        'E6E07',
        'E6E08',
        'E6E09',
        'E6E10',
        'E6E11',
        'E6E12',
      ],
    },
    {
      id: 'E6F',
      title: 'Optoelectronics: Photovoltaics, Photoconductors, and Isolation',
      content: `# Optoelectronics: Photovoltaics, Photoconductors, and Isolation (E6F)

Optoelectronic components show up in power systems, sensing, and isolation between low-voltage control circuits and higher-voltage loads.

## Photovoltaic Cells

Energy from light in a photovoltaic cell is absorbed by:

- **Electrons**

:::definition Photovoltaic effect
The **photovoltaic effect** is the conversion of light to electrical energy.
:::

Common PV cell material:

- **Silicon**

Typical open-circuit voltage of a fully illuminated silicon PV cell:

- About **0.5 V** (per cell)

Efficiency means:

- Fraction of incident light converted to electrical current/power.

## Photoconductors

Photoconductive materials respond to light by changing resistance:

- Resistance **decreases** when light shines on the material

Photoconductive devices are commonly made from:

- Crystalline semiconductor material

## Optoisolators / Optocouplers

Most common configuration:

- An **LED** and a **phototransistor**

Why they’re used with circuits controlling 120 VAC loads:

- Provide **electrical isolation** between the control circuit and the switched circuit

## Optical Shaft Encoders

An optical shaft encoder detects rotation by:

- Interrupting a light source with a patterned wheel

## Solid-State Relays

:::definition Solid-state relay
A solid-state relay uses semiconductors to implement the function of an electromechanical relay.
:::

These are often paired with optoisolation for safety and noise immunity.`,
      keyPoints: [
        'Photovoltaic effect converts light to electricity; silicon PV cells produce ~0.5 V open-circuit per cell',
        'PV efficiency is the fraction of light converted to electrical current/power',
        'Photoconductive materials decrease resistance when illuminated; devices are typically crystalline semiconductors',
        'Optoisolators commonly use an LED and phototransistor to provide isolation for AC control',
        'Optical encoders use a patterned wheel to interrupt light; solid-state relays use semiconductors instead of mechanical contacts',
      ],
      relatedQuestionIds: [
        'E6F01',
        'E6F02',
        'E6F03',
        'E6F04',
        'E6F05',
        'E6F06',
        'E6F07',
        'E6F08',
        'E6F09',
        'E6F10',
        'E6F11',
      ],
    },
  ],
}


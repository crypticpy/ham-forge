/**
 * G6 - Circuit Components Module
 * General Class Amateur Radio License
 */

import type { LearningModule } from '@/types/learning'

export const circuitComponentsModule: LearningModule = {
  id: 'G6',
  examLevel: 'general',
  title: 'Circuit Components',
  description:
    'Understanding electronic components used in amateur radio equipment, including resistors, capacitors, inductors, semiconductors, integrated circuits, and connectors.',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'G6A',
      title: 'Resistors, Capacitors, Inductors, and Semiconductors',
      content: `# Resistors, Capacitors, Inductors, and Semiconductors

Understanding passive and active electronic components is fundamental for building, troubleshooting, and maintaining amateur radio equipment. Each component type has specific characteristics that determine its suitability for different applications.

## Resistors

Resistors limit current flow and divide voltages in circuits. Different resistor types are suited for different applications:

- **Carbon composition**: General purpose, inexpensive
- **Metal film**: Precise values, low noise
- **Wire-wound**: High power handling, but NOT suitable for RF circuits

**Important**: Wire-wound resistors should not be used in RF circuits because their inductance could make circuit performance unpredictable. The coiled wire acts like a small inductor at radio frequencies.

## Capacitors

Capacitors store electrical energy and block DC while passing AC. Two common types for amateur radio:

- **Electrolytic capacitors**: Offer high capacitance for a given volume, making them ideal for power supply filtering. They are polarized (must be installed with correct polarity) and have relatively loose tolerances.
- **Ceramic capacitors**: Comparatively low cost and suitable for RF bypassing. Low voltage ceramic capacitors are popular for general decoupling applications.

## Inductors

Inductors store energy in a magnetic field and oppose changes in current. A critical consideration is self-resonant frequency:

- Every inductor has parasitic capacitance between its windings
- When operated above its self-resonant frequency, an inductor becomes capacitive
- This behavior can cause unexpected circuit performance at high frequencies

## Diodes and Semiconductors

Diodes allow current to flow in only one direction. The forward threshold voltage differs by material:

- **Silicon junction diodes**: Approximately 0.7 volts forward threshold
- **Germanium diodes**: Approximately 0.3 volts forward threshold

Germanium diodes are sometimes preferred in detector circuits because of their lower forward voltage drop.

## Transistors

**Bipolar transistors** used as switches operate between two points:
- **Saturation**: Fully ON, maximum current flow
- **Cutoff**: Fully OFF, no current flow

**MOSFETs** (Metal-Oxide-Semiconductor Field-Effect Transistors) have a distinctive construction:
- The gate is separated from the channel by a thin insulating layer (oxide)
- This insulation makes the gate extremely high impedance
- MOSFETs are voltage-controlled devices, unlike bipolar transistors which are current-controlled

## Vacuum Tubes

Though less common today, vacuum tubes are still used in some amateur equipment, particularly high-power amplifiers:

- **Control grid**: Regulates electron flow between cathode and plate
- **Screen grid**: Primary purpose is to reduce grid-to-plate capacitance, improving high-frequency stability

## Batteries

For portable and emergency operations, batteries are essential:

- **12-volt lead-acid batteries**: Minimum allowable discharge voltage for maximum life is 10.5 volts
- **Low internal resistance batteries**: Can deliver high discharge current, important for high-power transmitters
`,
      keyPoints: [
        'Wire-wound resistors are unsuitable for RF due to their inductance',
        'Silicon diodes have 0.7V forward voltage; germanium diodes have 0.3V',
        'Electrolytic capacitors provide high capacitance for a given volume',
        'An inductor becomes capacitive above its self-resonant frequency',
        'Bipolar transistor switches operate in saturation and cutoff regions',
      ],
      relatedQuestionIds: [
        'G6A01',
        'G6A02',
        'G6A03',
        'G6A04',
        'G6A05',
        'G6A06',
        'G6A07',
        'G6A08',
        'G6A09',
        'G6A10',
        'G6A11',
        'G6A12',
      ],
    },
    {
      id: 'G6B',
      title: 'Integrated Circuits, Ferrite Cores, and Connectors',
      content: `# Integrated Circuits, Ferrite Cores, and Connectors

Modern amateur radio equipment relies heavily on integrated circuits for signal processing, and proper connectors and ferrite components for reliable RF connections and interference suppression.

## Integrated Circuits

Integrated circuits (ICs) combine multiple components on a single chip:

**CMOS vs TTL Logic**:
- **CMOS** (Complementary Metal-Oxide-Semiconductor): Primary advantage is low power consumption, making it ideal for portable equipment
- **TTL** (Transistor-Transistor Logic): Faster switching but higher power consumption

**Operational Amplifiers (Op-Amps)**:
- These are analog integrated circuits
- Used for signal conditioning, filtering, and amplification
- Versatile building blocks for many amateur radio projects

**MMICs** (Monolithic Microwave Integrated Circuits):
- Designed specifically for RF and microwave frequencies
- Contain all necessary components (transistors, resistors, capacitors) on a single chip
- Commonly used in VHF/UHF amplifiers and receivers

## Ferrite Cores and Beads

Ferrite materials are crucial for inductors and interference suppression:

**Ferrite Core Toroidal Inductors** offer multiple advantages:
- Large values of inductance may be obtained
- Magnetic properties can be optimized for specific frequency ranges
- Most of the magnetic field is contained within the core (reduces interference)

**Ferrite Performance**: The composition, or "mix," of materials used determines performance at different frequencies. Different mixes are optimized for:
- HF applications (lower frequency mixes)
- VHF/UHF applications (higher frequency mixes)

**Common-Mode Chokes**: Ferrite beads or cores reduce common-mode RF current on coaxial cable shields by creating an impedance in the current's path. This is essential for reducing RF interference (RFI) in the shack.

## LEDs (Light-Emitting Diodes)

LEDs are widely used as indicators in amateur equipment:
- An LED emits light when forward biased
- Like regular diodes, they conduct in only one direction
- Current-limiting resistors are required to prevent damage

## RF Connectors

Choosing the right connector is critical for maintaining signal integrity:

**BNC Connectors**:
- Quick-connect bayonet style
- 50-ohm impedance
- Typical upper frequency limit for low SWR: 4 GHz
- Popular for test equipment and VHF/UHF applications

**Type N Connectors**:
- Moisture-resistant threaded design
- Useful to 10 GHz
- Excellent for outdoor installations and high-frequency work
- Often used on commercial and military equipment

**SMA Connectors**:
- Small threaded connector
- Suitable for signals up to several GHz
- Common on modern handheld radios and SDR equipment
- Compact size ideal for dense circuit boards

**RCA Phono Connectors**:
- Commonly used for low frequency or DC signal connections
- Found on accessory ports for keyer, audio, and control signals
- NOT suitable for RF applications due to poor shielding
`,
      keyPoints: [
        'CMOS ICs have low power consumption compared to TTL',
        'MMIC stands for Monolithic Microwave Integrated Circuit',
        'Ferrite core performance depends on the material mix composition',
        'Ferrite beads reduce common-mode current by creating impedance',
        'BNC connectors work to 4 GHz; Type N to 10 GHz; SMA to several GHz',
      ],
      relatedQuestionIds: [
        'G6B01',
        'G6B02',
        'G6B03',
        'G6B04',
        'G6B05',
        'G6B06',
        'G6B07',
        'G6B08',
        'G6B10',
        'G6B11',
        'G6B12',
      ],
    },
  ],
}

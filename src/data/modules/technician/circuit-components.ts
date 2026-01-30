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
      content: `Electronic circuits are built from fundamental components that each serve specific purposes. Understanding these basic building blocks is essential for working with amateur radio equipment, troubleshooting problems, and building your own projects.

A resistor opposes the flow of current in a DC circuit. Resistors are measured in ohms and are used to limit current, divide voltages, and set bias points in circuits. A potentiometer is a special type of adjustable resistor commonly used as a volume control. By turning the shaft, you change the resistance value, which controls the electrical parameter of resistance in the circuit.

Capacitors store energy in an electric field. They consist of two conductive surfaces (plates) separated by an insulator (dielectric). Capacitors are measured in farads, though practical values are usually microfarads or picofarads. They block DC while passing AC, making them useful for coupling signals between circuit stages and filtering power supplies.

Inductors store energy in a magnetic field and are typically constructed as a coil of wire. Measured in henrys, inductors oppose changes in current flow. When combined with capacitors, they form resonant circuits that can select specific frequencies—a fundamental concept in radio design.

Switches control circuit connections. An SPDT (Single-Pole Double-Throw) switch allows a single circuit to be switched between one of two other circuits—useful for selecting between different antenna connections or switching between receive and transmit modes. An SPST (Single-Pole Single-Throw) switch simply opens or closes a single circuit.

Fuses protect circuit components from current overloads by melting and breaking the circuit when excessive current flows. Batteries provide portable power for radio equipment. Rechargeable chemistries include nickel-metal hydride, lithium-ion, and lead-acid. Carbon-zinc batteries are not rechargeable and should be properly disposed of after use.`,
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
    },
    {
      id: 'T6B',
      title: 'Semiconductors: Diodes, Transistors, and LEDs',
      content: `Semiconductors revolutionized electronics by providing compact, reliable components that can switch and amplify signals. Understanding semiconductor devices is crucial for modern amateur radio, as they are found in virtually every piece of equipment.

A diode is a semiconductor device that allows current to flow in only one direction. Diodes have two electrodes: the anode (positive) and cathode (negative). The cathode lead is often marked with a stripe on the package for easy identification. When current flows through a diode in the forward direction, there is a small voltage drop called the forward voltage drop, which varies by diode type—silicon diodes drop about 0.6V while LEDs may drop 1.5V to 3V depending on color.

Light-emitting diodes (LEDs) emit light when forward current flows through them. They are commonly used as visual indicators on equipment panels, showing power status or signal presence. Unlike regular light bulbs, LEDs are efficient and long-lasting but must be connected with proper polarity and usually require a current-limiting resistor.

Transistors are three-terminal semiconductor devices that can amplify signals or act as electronic switches. A bipolar junction transistor (BJT) has three regions of semiconductor material with electrodes called the emitter, base, and collector. A small current into the base controls a larger current between collector and emitter, providing power gain—the ability to amplify a signal.

Field-effect transistors (FETs) have three terminals called gate, drain, and source. Instead of using current to control current like BJTs, FETs use voltage at the gate to control current flow between drain and source. FETs are widely used in radio frequency applications due to their high input impedance and low noise characteristics. The term "gain" describes a device's ability to amplify a signal.`,
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
      content: `A schematic is an electrical wiring diagram that uses standard component symbols to show how components are connected. Unlike a physical layout drawing, a schematic focuses on the electrical connections rather than the physical appearance or wire lengths. Learning to read schematics is an essential skill for understanding, building, and troubleshooting radio equipment.

Schematics accurately represent component connections—which terminal connects to which. They do not accurately represent wire lengths, physical component appearance, or the actual physical layout of parts on a circuit board. A resistor symbol looks the same regardless of the resistor's physical size or power rating. This abstraction makes schematics universal and easier to read once you learn the symbols.

Common schematic symbols you should recognize include: resistors (zigzag line), capacitors (two parallel lines, one may be curved for polarized types), inductors (series of loops), transformers (two inductors with parallel lines between them), batteries (alternating long and short parallel lines), transistors (circle with lines showing emitter, base, collector or gate, drain, source), diodes (triangle pointing to a line), LEDs (diode symbol with arrows pointing outward), and switches (break in a line with a moving contact).

Variable components are shown with an arrow through the symbol. A variable resistor (potentiometer) shows a resistor with an arrow, while a variable capacitor shows a capacitor with an arrow. Ground symbols show the reference point for the circuit, typically drawn as descending horizontal lines or a triangle. Antennas are shown as lines radiating from a connection point.

The exam includes several figures (T-1, T-2, T-3) showing actual schematic diagrams where you must identify specific components. Practice recognizing resistors, transistors, lamps, batteries, capacitors, LEDs, variable resistors, transformers, variable inductors, and antennas in these diagrams.`,
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
      content: `Real radio equipment combines basic components into functional circuits. Understanding these practical circuits helps you work with power supplies, switching systems, and complex electronic assemblies.

A rectifier changes alternating current (AC) into varying direct current (DC). This is typically the first stage in a power supply, using diodes to convert the AC from a transformer into DC that can be filtered and regulated. The transformer itself changes 120V AC power to a lower AC voltage suitable for the equipment.

A regulator circuit controls the amount of voltage from a power supply, maintaining a steady output despite variations in input voltage or load current. Voltage regulators are essential because electronic components require stable voltage to operate correctly. Many regulators are available as integrated circuits (ICs)—devices that combine several semiconductors and other components into one package.

A relay is an electrically-controlled switch. When current flows through the relay's coil, it creates a magnetic field that moves mechanical contacts, allowing a small control signal to switch a larger current. Relays are commonly used to control antenna switching, amplifier keying, and other functions where isolation between control and switched circuits is needed.

Resonant or tuned circuits consist of an inductor and capacitor connected in series or parallel. At a specific frequency (the resonant frequency), these circuits exhibit unique properties—series resonant circuits have minimum impedance while parallel resonant circuits have maximum impedance. Tuned circuits are fundamental to radio design for selecting desired frequencies and rejecting unwanted ones.

Shielded wire prevents coupling of unwanted signals to or from the wire. The shield, usually a braided conductor surrounding the inner wire, blocks electromagnetic interference. This is important in radio equipment where sensitive receive signals must be protected from noise. Meters display electrical quantities as numeric values, essential for monitoring power output, SWR, and other parameters.`,
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

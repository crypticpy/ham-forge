/**
 * G7 - Practical Circuits Module
 * General Class Amateur Radio License
 */

import type { LearningModule } from '@/types/learning'

export const practicalCircuitsModule: LearningModule = {
  id: 'G7',
  examLevel: 'general',
  title: 'Practical Circuits',
  description:
    'Understanding power supplies, amplifiers, digital circuits, receivers, transmitters, filters, and software-defined radio systems.',
  estimatedMinutes: 55,
  sections: [
    {
      id: 'G7A',
      title: 'Power Supplies and Schematic Symbols',
      content: `# Power Supplies and Schematic Symbols

Power supplies convert AC line voltage to the DC voltages needed by radio equipment. Understanding power supply circuits and schematic symbols is essential for building, troubleshooting, and maintaining amateur radio equipment.

## Rectifier Circuits

Rectifiers convert AC to pulsating DC using diodes. The three main types differ in efficiency and complexity:

- **Half-wave rectifier**: Uses only one diode, converting only 180 degrees (one half) of each AC cycle. Simple but inefficient, producing significant ripple at the AC line frequency.
- **Full-wave center-tapped**: Uses two diodes with a center-tapped transformer, converting the full 360 degrees of the AC cycle. The output ripple frequency is twice the input frequency.
- **Full-wave bridge**: Uses four diodes in a bridge configuration, also converting the full AC cycle but without requiring a center-tapped transformer.

\`\`\`
Half-wave: AC ──[D]──> Pulsating DC (180° conduction)
           Uses 1 diode, ripple = line frequency

Full-wave: AC ──[D1]──┬──> Pulsating DC (360° conduction)
           ──[D2]──┘   Uses 2 diodes + CT transformer
                       Ripple = 2× line frequency
\`\`\`

## Filtering and Regulation

After rectification, filter networks smooth the pulsating DC:

- **Filter capacitors**: Store charge and reduce voltage ripple
- **Filter inductors (chokes)**: Oppose changes in current flow
- **LC networks**: Combine inductors and capacitors for better filtering

The **bleeder resistor** is a critical safety component that discharges filter capacitors when power is removed, preventing dangerous shock hazards from stored energy.

## Switchmode vs. Linear Power Supplies

**Switchmode power supplies** operate at high frequencies (typically 20-200 kHz), allowing the use of much smaller transformers and filter components compared to linear supplies operating at 60 Hz. This makes them lighter and more compact, though they can generate RF interference that must be filtered.

## Schematic Symbols

Reading schematics requires recognizing standard symbols:

- **Transistors**: NPN and PNP bipolar (BJT) show arrows indicating current flow direction; FETs have different gate symbols
- **Diodes**: Standard diodes show current direction; Zener diodes have a distinctive bent line indicating voltage regulation capability
- **Transformers**: Iron/solid core transformers show parallel lines between windings; air core has no lines
- **Inductors**: Coils with or without taps; tapped inductors have a connection point along the winding
`,
      keyPoints: [
        'Half-wave rectifier uses one diode and converts 180 degrees of each AC cycle',
        'Full-wave rectifier converts 360 degrees and produces ripple at twice line frequency',
        'Bleeder resistor discharges filter capacitors when power is removed for safety',
        'Switchmode supplies use high-frequency operation for smaller components',
        'Filter networks use capacitors and inductors to smooth pulsating DC',
      ],
      relatedQuestionIds: [
        'G7A01',
        'G7A02',
        'G7A03',
        'G7A04',
        'G7A05',
        'G7A06',
        'G7A07',
        'G7A08',
        'G7A09',
        'G7A10',
        'G7A11',
        'G7A12',
        'G7A13',
      ],
    },
    {
      id: 'G7B',
      title: 'Amplifiers and Digital Circuits',
      content: `# Amplifiers and Digital Circuits

Amplifiers increase signal power for transmission, while digital circuits provide timing, counting, and logic functions in modern radio equipment.

## Amplifier Classes

Amplifier classification is based on the portion of the input cycle during which the active device conducts:

- **Class A**: Conducts 100% of the time. Most linear but least efficient (25-50%). Used where waveform fidelity is critical.
- **Class B**: Conducts 50% of the time. Push-pull pairs conduct on alternate half-cycles. More efficient than Class A.
- **Class AB**: Conducts more than 50% but less than 100%. Combines reasonable efficiency with good linearity. Common in SSB and AM transmitters.
- **Class C**: Conducts less than 50% of the time. Highest efficiency (up to 80%) but highly non-linear. **Only suitable for FM** where amplitude variations don't carry information.

\`\`\`
Amplifier Efficiency Comparison:
Class A  ████░░░░░░  ~25-50% (most linear)
Class AB █████░░░░░  ~50-65%
Class B  ██████░░░░  ~60-70%
Class C  ████████░░  ~70-80% (FM only)
\`\`\`

## Linear Amplifiers

A **linear amplifier** preserves the input waveform shape in its output. This is essential for SSB and AM where amplitude variations carry the audio information. Class C amplifiers cannot be used for these modes because they distort the amplitude envelope.

**Efficiency** of an RF power amplifier is calculated by dividing the RF output power by the DC input power: Efficiency = RF out / DC in.

## Neutralization

RF amplifiers can self-oscillate due to internal feedback (especially in vacuum tubes and high-gain transistor stages). **Neutralization** feeds back a portion of the output signal 180 degrees out of phase to cancel this unwanted feedback and eliminate self-oscillations.

## Oscillators

A sine wave oscillator requires two basic components:
- An **amplifier** to provide gain
- A **filter** (often an LC tank circuit) operating in a **feedback loop**

In an **LC oscillator**, the frequency is determined by the inductance and capacitance values in the tank circuit, following the resonance formula: f = 1/(2π√LC).

## Digital Logic Gates

Digital circuits use binary logic where signals are either high (1) or low (0):

- **AND gate**: Output is high only when ALL inputs are high
- **OR gate**: Output is high when ANY input is high
- **NOT gate (inverter)**: Output is opposite of input
- **NAND/NOR**: Combinations providing inverted outputs

## Counters and Shift Registers

- **Binary counter**: A 3-bit counter has 2³ = 8 states (000 through 111). An n-bit counter has 2ⁿ states.
- **Shift register**: A clocked array of circuits that passes data in steps along the array, used for serial-to-parallel conversion and data buffering.
`,
      keyPoints: [
        'Class C amplifiers have highest efficiency but are only suitable for FM, not SSB or AM',
        'Class A conducts 100% of the time; Class C conducts less than 50%',
        'Amplifier efficiency = RF output power divided by DC input power',
        'Neutralization eliminates self-oscillations caused by internal feedback',
        'A 3-bit binary counter has 8 states (2 to the power of 3)',
      ],
      relatedQuestionIds: [
        'G7B01',
        'G7B02',
        'G7B03',
        'G7B04',
        'G7B05',
        'G7B06',
        'G7B07',
        'G7B08',
        'G7B09',
        'G7B10',
        'G7B11',
      ],
    },
    {
      id: 'G7C',
      title: 'Receivers, Transmitters, Filters, and SDR',
      content: `# Receivers, Transmitters, Filters, and SDR

Modern amateur radio equipment uses sophisticated circuits for signal generation, reception, and processing. Understanding these building blocks helps in selecting, operating, and troubleshooting equipment.

## SSB Transmitter Stages

Single Sideband (SSB) transmitters use several specialized stages:

- **Balanced modulator**: Produces double-sideband suppressed-carrier (DSB-SC) signal by mixing audio with the carrier. The output contains both sidebands but the carrier is cancelled.
- **Sideband filter**: Selects one of the two sidebands from the balanced modulator output, producing the SSB signal (USB or LSB).
- **Impedance matching transformer**: Presents the desired impedance to the transmitter output and feed line, ensuring maximum power transfer and minimum reflected power.

\`\`\`
SSB Transmitter Block Diagram:
Audio ──> [Balanced   ] ──> [Sideband] ──> [IF    ] ──> [Mixer] ──> [Power ] ──> Antenna
          [Modulator  ]     [Filter  ]     [Amp   ]              [Amp   ]
                │                                                     │
          Carrier Osc                                          VFO/Synthesizer
\`\`\`

## Receiver Circuits

Key receiver components and concepts:

- **Product detector**: Used in SSB receivers to extract the audio by mixing the incoming SSB signal with a beat frequency oscillator (BFO). Essentially "replaces" the suppressed carrier.
- **Receiver sensitivity**: Determined primarily by the input amplifier noise figure. Lower noise figure means weaker signals can be detected.

## Filter Characteristics

Filters are specified by several parameters:

- **Cutoff frequency**: The frequency where output power drops to half the input power (-3 dB point). For a low-pass filter, this is the upper frequency limit.
- **Insertion loss**: The filter's attenuation within its passband (ideally zero, but always some loss).
- **Ultimate rejection**: The maximum attenuation the filter can achieve outside its passband (stopband).
- **Bandwidth** (for bandpass filters): Measured between the upper and lower half-power (-3 dB) frequencies.

## Direct Digital Synthesizer (DDS)

A **direct digital synthesizer** generates RF signals digitally, providing variable output frequency with the stability of its crystal reference oscillator. DDS offers fine frequency resolution and fast switching with excellent frequency accuracy.

## Software-Defined Radio (SDR)

SDR moves traditional hardware functions into software, providing unprecedented flexibility:

- **I/Q signals**: SDR uses In-phase (I) and Quadrature (Q) signals with a **90-degree phase difference**. This quadrature relationship allows complete representation of both amplitude and phase information.
- **I/Q modulation advantage**: All types of modulation (AM, FM, SSB, digital modes) can be created with appropriate software processing.
- **Software functions**: Filtering, detection (demodulation), and modulation are all performed in software rather than hardware.

## DSP Filtering

**Digital Signal Processing (DSP)** filters offer major advantages over analog filters:
- A wide range of filter bandwidths and shapes can be created
- Filter characteristics can be changed instantly
- Sharper cutoffs and better stopband rejection are achievable
- No component drift or aging effects
`,
      keyPoints: [
        'Balanced modulator produces double-sideband suppressed-carrier; a filter selects one sideband',
        'Product detector extracts audio from SSB by mixing with a local oscillator',
        'Filter cutoff frequency is where output power drops to half (-3 dB)',
        'SDR I and Q signals have a 90-degree phase difference',
        'DSP filters can create a wide range of bandwidths and shapes in software',
      ],
      relatedQuestionIds: [
        'G7C01',
        'G7C02',
        'G7C03',
        'G7C04',
        'G7C05',
        'G7C06',
        'G7C07',
        'G7C08',
        'G7C09',
        'G7C10',
        'G7C11',
        'G7C12',
        'G7C13',
        'G7C14',
      ],
    },
  ],
}

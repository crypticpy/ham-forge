/**
 * E7 - Practical Circuits Module
 * Amateur Extra Class License (Element 4)
 */

import type { LearningModule } from '@/types/learning'

export const practicalCircuitsModule: LearningModule = {
  id: 'E7',
  examLevel: 'extra',
  title: 'Practical Circuits',
  description:
    'Circuit-level design and troubleshooting: digital logic, amplifier classes and biasing, filters and matching, power supplies and regulators, modulators/mixers/detectors, SDR/DSP, op-amps, and oscillators/synthesizers.',
  estimatedMinutes: 95,
  sections: [
    {
      id: 'E7A',
      title: 'Digital Circuits: Flip-Flops, Counters, and Logic Operations',
      content: `# Digital Circuits: Flip-Flops, Counters, and Logic Operations (E7A)

This group focuses on common digital building blocks used in timing, counting, and state control.

## Multivibrators and State Machines

Digital circuits are often described by the number of stable states they have:

- **Bistable**: two stable states (e.g., a **flip-flop**)
- **Monostable**: one stable state; switches temporarily to the other state for a set time
- **Astable**: no stable states; continuously alternates without an external clock

## Frequency Division

Flip-flops are commonly used to divide frequency:

- One flip-flop can divide a pulse train by **2**
- To divide by **16**, you need **4** flip-flops (2⁴ = 16)

## Counters

:::definition Decade counter
A decade counter produces one output pulse for every **10** input pulses.
:::

## Logic Operations and Truth Tables

Logic gates implement Boolean operations. The pool emphasizes definitions:

- **NAND**: output is 0 only if **all inputs are 1**
- **OR**: output is 1 if **any input is 1**
- **XNOR** (exclusive NOR): for two inputs, output is 0 if one and only one input is 1

:::definition Truth table
A **truth table** lists inputs and corresponding outputs for a digital device.
:::

Positive logic means:

- High voltage represents **1**, low voltage represents **0**.`,
      keyPoints: [
        'Flip-flops are bistable; astable multivibrators free-run; monostables pulse to the alternate state for a fixed time',
        'Flip-flops divide frequency (÷2 per stage); ÷16 requires 4 flip-flops',
        'Decade counters output one pulse per 10 input pulses',
        'NAND outputs 0 only when all inputs are 1; OR outputs 1 when any input is 1; truth tables map inputs to outputs',
        'Positive logic uses high voltage = 1 and low voltage = 0',
      ],
      relatedQuestionIds: [
        'E7A01',
        'E7A02',
        'E7A03',
        'E7A04',
        'E7A05',
        'E7A06',
        'E7A07',
        'E7A08',
        'E7A09',
        'E7A10',
        'E7A11',
      ],
    },
    {
      id: 'E7B',
      title: 'Amplifiers: Classes, Biasing, and Stability (Figure E7-1)',
      content: `# Amplifiers: Classes, Biasing, and Stability (E7B)

Extra-level circuits include amplifier operating classes, RF switching amplifiers, and common bias/stability techniques.

## Amplifier Classes

Amplifier class relates to conduction angle:

- **Class A**: conducts 360°; operating point near the middle of the linear region
- **Class AB** (push-pull): each device conducts **more than 180° but less than 360°**
- **Class C**: conducts less than 180° (high efficiency, non-linear)
- **Class D**: a switching amplifier that achieves high efficiency by operating devices as switches

:::warning Class C for SSB
Using a Class C amplifier for SSB results in signal distortion and excessive bandwidth (it does not preserve the envelope).
:::

## RF Switching Amplifiers

Switching amplifiers are efficient because:

- The device is at **saturation or cutoff** most of the time

At the output of an RF switching amplifier you need:

- A **filter** to remove harmonic content

## Preventing Unwanted Oscillations

RF power amplifiers can self-oscillate. Mitigations include:

- Parasitic suppressors
- Neutralization of the stage

## Grounded-Grid Input Impedance

Grounded-grid amplifiers are characterized by:

- **Low input impedance**

## Emitter Follower (Common Collector)

An emitter follower has:

- Input and output signals **in phase**

## Figure E7-1 (Biasing)

Figure E7-1 shows a common-emitter amplifier with a typical bias network:

- **R1 and R2** form a **voltage divider bias** network for the base
- **R3** provides **self bias** (emitter degeneration/feedback)
- The overall circuit is a **common-emitter** amplifier`,
      keyPoints: [
        'Class AB push-pull devices conduct >180° and <360°; Class D uses switching; Class A bias is mid between cutoff and saturation',
        'Class C is not linear enough for SSB (causes distortion and bandwidth growth)',
        'Switching RF amplifiers require output filtering to remove harmonics; efficiency comes from saturation/cutoff switching',
        'Parasitic suppressors and neutralization prevent unwanted oscillations; grounded-grid amplifiers have low input impedance',
        'Emitter followers are in-phase; Figure E7-1 bias: R1/R2 divider and R3 self-bias in a common-emitter stage',
      ],
      relatedQuestionIds: [
        'E7B01',
        'E7B02',
        'E7B03',
        'E7B04',
        'E7B05',
        'E7B06',
        'E7B07',
        'E7B08',
        'E7B09',
        'E7B10',
        'E7B11',
        'E7B12',
      ],
    },
    {
      id: 'E7C',
      title: 'Filters and Matching Networks: Pi, T, Helical, Cavity, and Shape Factor',
      content: `# Filters and Matching Networks (E7C)

This group is about recognizing filter topologies and what characteristics different filter families emphasize.

## Pi and T Network Topologies

Low-pass Pi network arrangement:

- Capacitor from input to ground
- Inductor in series between input and output
- Capacitor from output to ground

T network with series capacitors and a shunt inductor:

- Has a **high-pass** frequency response

## Pi-L Networks

Adding an output series inductor to a Pi network creates a Pi-L network, used for:

- Greater **harmonic suppression**

## Impedance Matching of Complex Loads

An impedance-matching circuit transforms complex impedance to resistive impedance by:

- Cancelling the reactive part and transforming the resistive part to the desired value

## Filter Families

The pool highlights “what’s special” about certain filter types:

- **Chebyshev**: ripple in the passband with a sharper cutoff than Butterworth
- **Elliptical**: extremely sharp cutoff with one or more notches in the stop band

## Practical RF Filters

Common filter types in VHF/UHF equipment:

- **Helical filters**: often used as band-pass or notch filters in VHF/UHF transceivers
- **Crystal lattice filters**: low-level filters made using quartz crystals
- **Cavity filters**: used in 2 m repeater duplexers

## Shape Factor

Shape factor measures:

- A filter’s ability to reject signals in adjacent channels (steepness of skirts).`,
      keyPoints: [
        'Low-pass Pi networks use shunt capacitors at input/output with a series inductor between them; a T with series capacitors and shunt inductor is high-pass',
        'Pi-L networks add an output series inductor for greater harmonic suppression',
        'Matching networks cancel reactance and transform resistance to the desired value',
        'Chebyshev filters have passband ripple and sharp cutoff; elliptical filters have extremely sharp cutoff with stopband notches',
        'Helical, crystal lattice, and cavity filters are common in VHF/UHF systems; shape factor measures adjacent-channel rejection',
      ],
      relatedQuestionIds: [
        'E7C01',
        'E7C02',
        'E7C03',
        'E7C04',
        'E7C05',
        'E7C06',
        'E7C07',
        'E7C08',
        'E7C09',
        'E7C10',
        'E7C11',
      ],
    },
    {
      id: 'E7D',
      title: 'Power Supplies and Regulation (Figure E7-2)',
      content: `# Power Supplies and Regulation (E7D)

This group covers linear vs. switchmode regulation, voltage references, and practical safety/engineering details in power supplies.

## Linear vs. Switchmode Regulators

Linear regulator behavior:

- Varies conduction of a control element to maintain constant output voltage

Switchmode regulator behavior:

- Varies duty cycle of pulses input to a filter

## Voltage References

A common stable reference device:

- **Zener diode**

## Regulator Types

Three-terminal voltage regulators are typically:

- **Series regulators**

Linear regulator that operates by loading the source:

- **Shunt regulator**

## Figure E7-2 (Linear Regulator Circuit)

The pool uses Figure E7-2 to identify:

- Q1: controls current to keep output voltage constant
- C2: bypasses rectifier ripple around D1
- Overall: a **linear voltage regulator**

## Battery Operating Time

Battery run time is estimated by:

- Capacity (amp-hours) ÷ average current (amps)

## Why Switching Supplies Are Lighter/Cheaper

Switching supplies use high-frequency inverters:

- Smaller transformers and filters are needed for the same power output

## Solar Panel Inverters

An inverter at a solar panel output is used to:

- Convert panel output from **DC to AC**

## Dropout Voltage and Dissipation

:::definition Dropout voltage
Dropout voltage is the minimum input-to-output voltage required for a linear regulator to maintain regulation.
:::

Series linear regulator power dissipation:

- (Vin − Vout) × Iout

## Series Capacitors and Equalizing Resistors

Equal-value resistors across series filter capacitors are used to:

- Equalize voltage sharing
- Discharge capacitors for safety
- Improve reliability (the pool groups these as “all correct”)

## Step-Start Circuits

A step-start circuit in a high-voltage supply:

- Allows filter capacitors to charge gradually (reduces inrush stress).`,
      keyPoints: [
        'Linear regulators vary conduction; switchmode regulators vary duty cycle into a filter',
        'Zener diodes provide stable voltage reference; three-terminal regulators are series regulators; shunt regulators load the source',
        'Figure E7-2: Q1 is the control element, C2 bypasses ripple; the circuit is a linear regulator',
        'Battery time ≈ Ah / average A; switching supplies are lighter due to high-frequency magnetics; inverters convert DC to AC',
        'Dropout voltage is minimum Vin−Vout for regulation; dissipation is (Vin−Vout)×I; equalizing resistors balance/discharge series caps; step-start limits inrush',
      ],
      relatedQuestionIds: [
        'E7D01',
        'E7D02',
        'E7D03',
        'E7D04',
        'E7D05',
        'E7D06',
        'E7D07',
        'E7D08',
        'E7D09',
        'E7D10',
        'E7D11',
        'E7D12',
        'E7D13',
        'E7D14',
        'E7D15',
      ],
    },
    {
      id: 'E7E',
      title: 'Transmit/Receive Building Blocks: Modulators, Mixers, and Detectors',
      content: `# Transmit/Receive Building Blocks: Modulators, Mixers, and Detectors (E7E)

This group reviews how common modulation/demodulation circuits work and what signals appear at a mixer output.

## Generating FM

One technique to generate FM phone:

- Reactance modulation of a local oscillator

:::definition Reactance modulator
A reactance modulator produces PM or FM by varying an effective capacitance.
:::

## FM Detection

:::definition Frequency discriminator
A frequency discriminator is a circuit for detecting FM signals.
:::

## SSB Generation

One classic method:

- Use a **balanced modulator** followed by a **filter**

## Pre-Emphasis and De-Emphasis

FM systems often use:

- **Pre-emphasis** in the transmitter to boost higher audio frequencies
- **De-emphasis** in the receiver for compatibility with systems that use phase modulation characteristics

## Baseband

:::definition Baseband
Baseband is the frequency range occupied by the message signal prior to modulation.
:::

## Mixers

A mixer output contains:

- The two input frequencies, plus their **sum and difference** products

If input levels are too high:

- Spurious mixer products are generated (nonlinear behavior)

## Detectors

Diode envelope detector (AM):

- Rectifies and filters the RF envelope

SSB detector:

- A **product detector** is used to demodulate SSB signals.`,
      keyPoints: [
        'FM can be generated via reactance modulation of an oscillator; a reactance modulator varies capacitance to create PM/FM',
        'FM is detected with a frequency discriminator; SSB can be generated with a balanced modulator plus filtering',
        'Pre-emphasis boosts high audio frequencies at the transmitter; de-emphasis is used in receivers',
        'Baseband is the message spectrum prior to modulation',
        'Mixers produce sum/difference products and can generate spurs if overdriven; AM uses envelope detection and SSB uses product detection',
      ],
      relatedQuestionIds: [
        'E7E01',
        'E7E02',
        'E7E03',
        'E7E04',
        'E7E05',
        'E7E06',
        'E7E07',
        'E7E08',
        'E7E09',
        'E7E10',
        'E7E11',
      ],
    },
    {
      id: 'E7F',
      title: 'SDR and DSP Fundamentals: Sampling, FFT, Decimation, and FIR Filters',
      content: `# SDR and DSP Fundamentals (E7F)

This group is about the DSP pipeline inside modern radios and the core math constraints (sampling rate, quantization, and filtering).

## Direct Sampling SDR

:::definition Direct sampling
Direct sampling means incoming RF is digitized by an ADC **without first mixing** with a local oscillator.
:::

Maximum receive bandwidth is determined primarily by:

- ADC **sample rate**

In an idealized receiver without atmospheric/thermal noise, minimum detectable signal is influenced by:

- ADC reference voltage level and bit depth

## Sampling Theorem

To accurately reproduce an analog signal:

- Sample at least **twice** the highest frequency component (Nyquist criterion)

## Resolution (Bits)

Bit depth sets the number of quantization levels.

Example emphasized by the pool:

- 1 V range at 1 mV resolution requires ~1000 steps → **10 bits** (2¹⁰ = 1024 levels)

## FFT

:::definition FFT
A Fast Fourier Transform converts signals from the **time domain** to the **frequency domain**.
:::

## Decimation and Anti-Aliasing

Decimation reduces effective sample rate by:

- Removing samples (downsampling)

An anti-aliasing filter is required in a decimator because:

- It removes high-frequency components that would otherwise alias into lower frequencies after downsampling

## DSP Filters

Noise reduction filter type called out for SSB:

- **Adaptive filter**

SSB generation in DSP commonly uses:

- A **Hilbert-transform** filter and quadrature (90°) phase relationships

FIR filters:

- Can delay all frequency components by the same amount (linear phase)

:::definition Taps
Taps provide incremental signal delays used in DSP filter algorithms.
:::

Sharper filters generally require:

- More taps`,
      keyPoints: [
        'Direct sampling digitizes RF without mixing; sample rate sets max receive bandwidth and impacts performance',
        'Nyquist: sample ≥ 2× highest frequency component; bit depth sets quantization levels (1 V/1 mV needs ~10 bits)',
        'FFT converts time-domain to frequency-domain; decimation reduces sample rate but requires anti-alias filtering',
        'Adaptive filters can reduce unwanted noise; DSP SSB generation uses Hilbert-transform filters and quadrature signals',
        'FIR filters can provide linear phase; taps implement delays and more taps yield sharper response',
      ],
      relatedQuestionIds: [
        'E7F01',
        'E7F02',
        'E7F03',
        'E7F04',
        'E7F05',
        'E7F06',
        'E7F07',
        'E7F08',
        'E7F09',
        'E7F10',
        'E7F11',
        'E7F12',
        'E7F13',
        'E7F14',
      ],
    },
    {
      id: 'E7G',
      title: 'Operational Amplifiers and Active Filters (Figure E7-3)',
      content: `# Operational Amplifiers and Active Filters (E7G)

This group covers core op-amp characteristics and simple op-amp gain/filter behavior tested with Figure E7-3.

## What an Op-Amp Is

:::definition Operational amplifier
An op-amp is a high-gain, direct-coupled differential amplifier with very high input impedance and very low output impedance.
:::

Typical characteristics:

- Input impedance: **very high**
- Output impedance: **very low**

Input offset voltage is:

- The differential input voltage needed to bring the open-loop output voltage to zero

Gain-bandwidth is:

- The frequency where the open-loop gain equals **1**

Ideal op-amp gain (idealized model):

- Does not vary with frequency (real devices do, which is why gain-bandwidth matters).

## Figure E7-3: Inverting Amplifier Math

Figure E7-3 represents an inverting amplifier configuration where:

- Voltage gain magnitude ≈ RF / R1
- Output is inverted (negative sign)

Examples from the pool:

- R1 = 10 Ω, RF = 470 Ω → |Av| = **47**
- R1 = 1000 Ω, RF = 10kΩ, Vin = 0.23 V → Vout ≈ **−2.3 V**

## Active Filter Behavior

If a capacitor is added across the feedback resistor in Figure E7-3:

- The frequency response becomes **low-pass** (high frequencies are fed back more strongly).

## Preventing Ringing/Instability

To reduce unwanted ringing and audio instability in op-amp filters:

- Restrict both gain and Q`,
      keyPoints: [
        'Op-amps have very high input impedance, very low output impedance, and very high open-loop gain',
        'Input offset voltage is the differential input needed to zero the open-loop output; gain-bandwidth is where open-loop gain equals 1',
        'Figure E7-3 behaves as an inverting amplifier: |Av| ≈ RF/R1 and output is inverted',
        'Adding a capacitor across the feedback resistor creates a low-pass response',
        'Prevent ringing by limiting gain and Q in active audio filters',
      ],
      relatedQuestionIds: [
        'E7G01',
        'E7G02',
        'E7G03',
        'E7G04',
        'E7G05',
        'E7G06',
        'E7G07',
        'E7G08',
        'E7G09',
        'E7G10',
        'E7G11',
        'E7G12',
      ],
    },
    {
      id: 'E7H',
      title: 'Oscillators, PLLs, and DDS Frequency Synthesis',
      content: `# Oscillators, PLLs, and DDS Frequency Synthesis (E7H)

This group is about common oscillator circuits and modern frequency synthesis techniques used in stable RF systems.

## Common Oscillator Circuits

Three common oscillator circuits:

- **Colpitts**
- **Hartley**
- **Pierce**

Feedback methods emphasized by the pool:

- Colpitts: positive feedback through a **capacitive divider**
- Pierce: positive feedback through a **quartz crystal**

## Microphonics (Mechanical Sensitivity)

:::definition Microphonic
Microphonic behavior is changes in oscillator frequency caused by mechanical vibration.
:::

Mitigation:

- Mechanically isolate oscillator circuitry from its enclosure

Thermal drift reduction component called out:

- **NP0 capacitors** (stable capacitance vs temperature)

## Phase-Locked Loops (PLL)

:::definition PLL
A PLL is a servo loop consisting of a phase detector, a low-pass filter, a voltage-controlled oscillator (VCO), and a stable reference oscillator.
:::

PLLs can be used for:

- Frequency synthesis
- FM demodulation

## Direct Digital Synthesis (DDS)

A DDS uses:

- Phase accumulator
- Lookup table
- DAC
- Low-pass anti-alias filter

Lookup table contents:

- Amplitude values representing the desired waveform

Major DDS spectral impurity components:

- Spurious signals at discrete frequencies (“spurs”)

## Crystal Oscillator Load Capacitance

To ensure a crystal oscillator runs on the specified frequency:

- Provide the crystal with the specified **parallel capacitance**

## Highly Stable References (Microwave Work)

Highly accurate and stable oscillators for microwave work are typically achieved by combining:

- A stable reference (TCXO/OCXO)
- Disciplined references (e.g., GPSDO)
- Or atomic standards (e.g., rubidium) depending on requirements.`,
      keyPoints: [
        'Colpitts, Hartley, and Pierce are common oscillator circuits; Colpitts uses a capacitive divider and Pierce uses a crystal for feedback',
        'Microphonics are vibration-induced frequency changes; mitigate with mechanical isolation and temperature-stable parts like NP0 capacitors',
        'A PLL includes phase detector, loop filter, VCO, and reference; used for synthesis and FM demodulation',
        'DDS uses phase accumulator + lookup table + DAC + low-pass filter; lookup tables store waveform amplitude values and DDS produces discrete spurs',
        'Crystal oscillators must see specified parallel capacitance to run at the intended frequency',
      ],
      relatedQuestionIds: [
        'E7H01',
        'E7H02',
        'E7H03',
        'E7H04',
        'E7H05',
        'E7H06',
        'E7H07',
        'E7H08',
        'E7H09',
        'E7H10',
        'E7H11',
        'E7H12',
        'E7H13',
      ],
    },
  ],
}


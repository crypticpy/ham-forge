/**
 * E4 - Amateur Radio Practices Module
 * Amateur Extra Class License (Element 4)
 */

import type { LearningModule } from '@/types/learning'

export const amateurPracticesModule: LearningModule = {
  id: 'E4',
  examLevel: 'extra',
  title: 'Amateur Radio Practices',
  description:
    'Advanced station practices: test equipment, measurement techniques, receiver performance and dynamic range, interference mechanisms, and practical RFI mitigation and grounding.',
  estimatedMinutes: 80,
  sections: [
    {
      id: 'E4A',
      title: 'Test Equipment Basics: Oscilloscopes, Spectrum Analyzers, and Antenna Analyzers',
      content: `# Test Equipment Basics (E4A)

This group is about picking the right instrument and understanding what the display is really showing.

## Digital Oscilloscopes

The highest frequency that can be accurately displayed on a digital oscilloscope is primarily limited by:

- The **sampling rate** of the analog-to-digital converter (ADC)

:::warning Aliasing
If the scope samples too slowly, **aliasing** occurs and you can see a false, jittery low-frequency version of the waveform.
:::

### Probe compensation

Oscilloscope probes are often compensated using the scope’s square-wave output:

- Display a **square wave**, then adjust the probe until the **flat portions** are as flat as possible (no rounding or overshoot).

### Good probing practice

- Minimize the length of the probe’s **ground connection** (long ground leads add inductance and create ringing/measurement error).

### Measuring power supply ripple

When measuring a linear power supply’s output ripple, the trigger mode that is most effective is:

- **Line** (locks triggering to the AC line frequency-related ripple)

## Spectrum Analyzers

A spectrum analyzer displays:

- Vertical axis: **signal amplitude**
- Horizontal axis: **frequency**

It is the go-to instrument to examine:

- **Spurious signals**
- **Harmonics**
- **Intermodulation distortion (IMD) products**

## Frequency Counters and Prescalers

If a signal is higher than the counter’s input range:

- Use a **prescaler** to divide the frequency down into the counter’s operating range.

## Measuring SWR and Antenna Parameters

Many instruments can measure SWR (the pool emphasizes this broadly):

- SWR bridge / directional wattmeter
- Antenna analyzer
- Built-in transceiver SWR functions

An antenna analyzer has a common advantage over a simple SWR bridge:

- It can compute **SWR and impedance** automatically and display additional parameters like reactance and resonant frequency.`,
      keyPoints: [
        'Digital oscilloscope accuracy at high frequencies is limited by ADC sampling rate; too-low sampling causes aliasing',
        'Probe compensation uses a square wave and adjustment until the waveform’s flat portions are flat',
        'Minimize probe ground lead length to reduce inductive errors and ringing',
        'Spectrum analyzers plot amplitude vs frequency and are used to view spurs and IMD products',
        'Prescalers extend frequency counter range by dividing frequency',
        'Many tools can measure SWR; antenna analyzers also compute impedance and related parameters',
      ],
      relatedQuestionIds: [
        'E4A01',
        'E4A02',
        'E4A03',
        'E4A04',
        'E4A05',
        'E4A06',
        'E4A07',
        'E4A08',
        'E4A09',
        'E4A10',
        'E4A11',
      ],
    },
    {
      id: 'E4B',
      title: 'Measurement Techniques: Counters, VNAs, S-Parameters, and IMD Testing',
      content: `# Measurement Techniques: Counters, VNAs, S-Parameters, and IMD (E4B)

Extra-level practice includes more “engineering style” measurements: calibrated network analysis, S-parameters, and proper IMD testing.

## Frequency Counter Accuracy

The factor that most affects a frequency counter’s accuracy is:

- **Time base accuracy** (its internal reference oscillator stability)

## Voltmeter Sensitivity (Ohms per Volt)

Analog voltmeters often specify sensitivity in **ohms per volt**:

- Input impedance = (full-scale voltage range) × (ohms/volt rating)

This matters because low input impedance can load a circuit and change the measured value.

## Vector Network Analyzers (VNAs)

VNAs measure network behavior using **S-parameters**:

- **S21**: forward gain (port 1 → port 2)
- **S11**: input return loss / reflection coefficient (related to VSWR at the input)

The subscripts indicate:

- The **port(s)** at which measurements are made

### VNA calibration standards

A common one-port calibration uses three loads:

- **Open**
- **Short**
- **50 Ω load**

VNAs can measure many things, including:

- Filter frequency response
- Return loss / SWR-related parameters

## Directional Wattmeters and Power Accounting

If a directional power meter reads:

- Forward power: 100 W
- Reflected power: 25 W

Then power absorbed by the load is:

- 100 W − 25 W = **75 W**

## Q and Bandwidth

For a series-tuned circuit, you can determine Q from:

- The **bandwidth** of the circuit’s frequency response (narrower bandwidth → higher Q)

## Measuring IMD in SSB Transmitters (Two-Tone Test)

The standard method:

1. Modulate the transmitter with **two audio tones** that are **not harmonically related**
2. Observe the RF output on a **spectrum analyzer**

This reveals third-order IMD products near the desired signal.`,
      keyPoints: [
        'Frequency counter accuracy depends mainly on time base accuracy',
        'Ohms-per-volt sensitivity implies input impedance = full-scale volts × (ohms/volt)',
        'S21 is forward gain; S11 is input return loss/reflection coefficient; S-parameter subscripts identify ports',
        'VNA calibration commonly uses open/short/50-ohm load',
        'Load-absorbed power equals forward minus reflected power in a simple terminated case',
        'Circuit Q relates to response bandwidth; two-tone tests with a spectrum analyzer measure SSB IMD',
      ],
      relatedQuestionIds: [
        'E4B01',
        'E4B02',
        'E4B03',
        'E4B04',
        'E4B05',
        'E4B06',
        'E4B07',
        'E4B08',
        'E4B09',
        'E4B10',
        'E4B11',
      ],
    },
    {
      id: 'E4C',
      title: 'Receiver Performance: Noise, Bandwidth, Phase Noise, and Filtering',
      content: `# Receiver Performance: Noise, Bandwidth, Phase Noise, and Filtering (E4C)

This group connects receiver specifications to real-world behavior: noise figure, MDS, blocking, and SDR-specific issues like ADC overload.

## Noise Fundamentals

:::definition Noise figure
Receiver **noise figure** is the ratio (in dB) of the noise generated by the receiver to the theoretical minimum noise.
:::

The theoretical noise floor for a perfect receiver at room temperature is often referenced as:

- **−174 dBm** in a **1 Hz** bandwidth

### Bandwidth vs. noise floor

Noise power increases with bandwidth:

- Increase from 50 Hz to 1,000 Hz increases noise floor by **13 dB** (10·log10(1000/50) = 10·log10(20) ≈ 13 dB).

:::definition MDS
**MDS** is the **minimum discernible signal** — the weakest signal that can be detected/used by the receiver.
:::

## Strong-Signal Handling

### Front-end filtering

To eliminate interference from strong out-of-band signals:

- Use a front-end filter or **preselector**

### Roofing filters

In many receivers, a narrow roofing filter:

- Improves **blocking dynamic range** by attenuating strong signals near the receive frequency before later stages overload.

### Attenuators

On lower HF bands, input attenuation can reduce overload with little SNR penalty because:

- **Atmospheric noise** is often higher than internally generated noise even after attenuation.

## Phase Noise and Reciprocal Mixing

Excessive phase noise in an SDR master clock (or local oscillator) can:

- Combine with strong nearby signals to create interference (reciprocal mixing)

:::definition Reciprocal mixing
Local oscillator phase noise mixes with adjacent strong signals, creating interference to desired signals.
:::

## Capture Effect

In FM receivers, a stronger signal on the same frequency can suppress a weaker one:

- This is the **capture effect**

## Superheterodyne Design Note: High IF

Selecting a high IF can help:

- Make image responses easier to reject with front-end circuitry.

## IF Shift

IF shift is used:

- To reduce interference from stations on adjacent frequencies by shifting the IF passband relative to the received signal.

## SDR Overload

An SDR receiver is overloaded when input signals exceed:

- The **reference voltage** of the analog-to-digital converter.`,
      keyPoints: [
        'Noise figure is receiver-generated noise relative to the theoretical minimum; -174 dBm is the 1 Hz room-temperature noise floor reference',
        'Noise floor rises with bandwidth: 50 Hz → 1000 Hz is +13 dB',
        'Preselectors/front-end filters and roofing filters improve strong-signal performance and blocking dynamic range',
        'Input attenuation can reduce HF overload with little SNR penalty because atmospheric noise often dominates',
        'Reciprocal mixing is LO/clock phase noise mixing with strong adjacent signals; FM capture effect suppresses weaker same-frequency signals',
        'High IF improves image rejection; IF shift reduces adjacent-channel interference; SDR overload occurs when ADC reference voltage is exceeded',
      ],
      relatedQuestionIds: [
        'E4C01',
        'E4C02',
        'E4C03',
        'E4C04',
        'E4C05',
        'E4C06',
        'E4C07',
        'E4C08',
        'E4C09',
        'E4C10',
        'E4C11',
        'E4C12',
        'E4C13',
        'E4C14',
      ],
    },
    {
      id: 'E4D',
      title: 'Dynamic Range, Intermodulation, and Link Budgets',
      content: `# Dynamic Range, Intermodulation, and Link Budgets (E4D)

This group blends receiver specifications (blocking, intercept points) with practical interference mechanisms and basic link-budget math.

## Blocking Dynamic Range

:::definition Blocking dynamic range
Blocking dynamic range is the difference (in dB) between the receiver **noise floor** and the level of an incoming signal that causes **1 dB of gain compression**.
:::

Poor dynamic range can lead to:

- Desensitization
- Cross-modulation
- Spurious responses from strong adjacent signals

## Intermodulation (IM)

Intermodulation is created by:

- **Nonlinear** circuits or devices

### Repeater-to-repeater IM

Two repeaters in close proximity can generate intermod when:

- Their output signals mix in the **final amplifier** of one or both transmitters

One mitigation technique highlighted in the pool:

- A properly terminated **circulator** at the repeater transmitter output

### Intermod product identification (example)

IM products often appear at frequencies like:

- 2·f1 − f2
- 2·f2 − f1

The pool uses an example where a receiver tuned to **146.70 MHz** experiences an IM product due to a nearby signal at **146.52 MHz**.

## Desensitization

:::definition Desensitization
Desensitization is reduction in receiver sensitivity caused by a strong signal near the received frequency.
:::

A common mitigation:

- Insert **attenuation** before the first RF stage (or improve front-end selectivity).

## Receiver Intercept Point (IP3)

Third-order intercept is a figure of merit for IMD performance.

If the third-order intercept is 40 dBm, it means:

- A pair of 40 dBm input signals would theoretically generate a third-order IM product equal in output amplitude to either input.

Odd-order IM products are especially important because:

- Odd-order products of two in-band signals are likely to also fall **in-band**.

## Link Budgets (Quick Math)

Two common calculations:

### Received signal level (free-space-ish link budget)

Received power (dBm) ≈ Ptx(dBm) + Gtx(dBi) + Grx(dBi) − path loss(dB)

### Link margin

Link margin (dB) ≈ Received(dBm) − [MDS(dBm) + required SNR(dB)]

The pool also tests dBm-to-power scale intuition:

- **−100 dBm** corresponds to **0.1 picowatts**.`,
      keyPoints: [
        'Blocking dynamic range is noise floor to 1 dB compression point difference',
        'Intermodulation is caused by nonlinear devices; circulators can reduce repeater IM interference',
        'Desensitization is sensitivity loss from strong nearby signals; attenuation before the first RF stage can help',
        'Third-order intercept (IP3) describes IMD performance; odd-order products are important because they often fall in-band',
        'Link budgets use dB arithmetic: received power = Ptx + gains − losses; link margin = received − (MDS + required SNR)',
        '-100 dBm is 0.1 picowatts',
      ],
      relatedQuestionIds: [
        'E4D01',
        'E4D02',
        'E4D03',
        'E4D04',
        'E4D05',
        'E4D06',
        'E4D07',
        'E4D08',
        'E4D09',
        'E4D10',
        'E4D11',
        'E4D12',
        'E4D13',
        'E4D14',
      ],
    },
    {
      id: 'E4E',
      title: 'RFI and Noise Mitigation: Filters, Ferrites, Common-Mode Currents, and Grounding',
      content: `# RFI and Noise Mitigation (E4E)

Extra-level station troubleshooting includes understanding what different “noise tools” do (and what they can break), plus practical suppression techniques.

## DSP Noise Reduction vs. Noise Blanker vs. Notch Filter

- Digital noise reduction can often reduce multiple types of noise (the pool emphasizes this broadly).

:::definition Noise blanker
A **noise blanker** removes **impulse noise** by gating/muting the receiver during brief noise spikes.
:::

Noise blanker caution:

- Strong signals can be distorted and may appear to create spurious emissions.

:::warning Automatic notch filters (ANF) with CW
An automatic notch filter can sometimes remove the **CW signal** as well as the interfering carrier if the CW tone looks like the “carrier” being notched.
:::

## Conducted and Radiated Noise Sources

Automobile charging system conducted noise can be suppressed by:

- Installing **ferrite chokes** on the charging system leads

RFI from a line-driven AC motor can be reduced using:

- A **brute-force AC-line filter** in series with the motor’s power leads

Computer network equipment can create interference that looks like:

- Unstable modulated or unmodulated signals at specific frequencies

Switch-mode power supplies commonly create:

- A series of carriers at regular intervals across a wide frequency range

## Common-Mode Currents

Shielded cables can radiate or receive interference due to:

- **Common-mode currents** on the shield and conductors

:::definition Common-mode current
Common-mode current flows equally on all conductors of an unshielded multiconductor cable.
:::

## AC Line “Roaring/Buzzing” Interference and Mixing

Intermittent loud roaring or buzzing interference can be caused by multiple AC line issues (the pool emphasizes “all of the above” style sources), such as:

- Loose or corroded connections
- Arcing hardware
- Failing insulators or utility equipment

Nearby corroded metal connections can also act as a nonlinear junction that:

- Mixes AM broadcast signals and re-radiates spurious signals on MF/HF.

## Surge Protection and Single-Point Ground

The pool highlights proper placement:

- Install a station AC surge protector on the **single point ground panel**

Purpose of a single point ground panel:

- Ensure all lightning protectors activate at the same time (avoid dangerous potential differences).`,
      keyPoints: [
        'Noise blankers remove impulse noise but can distort strong signals; ANFs can accidentally notch CW signals',
        'Ferrite chokes can suppress conducted noise on vehicle charging leads; brute-force AC-line filters help with motor noise',
        'Network equipment and switch-mode supplies can create stable/unstable carriers across bands',
        'Common-mode currents on shields/cables cause unexpected radiation and susceptibility',
        'Corroded metal can mix strong AM signals and reradiate spurious MF/HF interference',
        'Install AC surge protectors at the single-point ground panel to coordinate lightning protector action',
      ],
      relatedQuestionIds: [
        'E4E01',
        'E4E02',
        'E4E03',
        'E4E04',
        'E4E05',
        'E4E06',
        'E4E07',
        'E4E08',
        'E4E09',
        'E4E10',
        'E4E11',
        'E4E12',
        'E4E13',
        'E4E14',
      ],
    },
  ],
}


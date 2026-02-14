/**
 * E8 - Signals and Emissions Module
 * Amateur Extra Class License (Element 4)
 */

import type { LearningModule } from '@/types/learning'

export const signalsEmissionsModule: LearningModule = {
  id: 'E8',
  examLevel: 'extra',
  title: 'Signals and Emissions',
  description:
    'Signal analysis and modern emissions: sampling/quantization, PEP vs average power, FM/PM modulation index, multiplexing, digital modulation and bandwidth, coding, spread spectrum, and IMD/keying quality.',
  estimatedMinutes: 75,
  sections: [
    {
      id: 'E8A',
      title: 'Signal Analysis and Sampling: Fourier, ADC/DAC Concepts, and PEP-to-Average Power',
      content: `# Signal Analysis and Sampling (E8A)

This group mixes “signal theory” with practical measurement and SDR conversion concepts.

## Fourier Analysis

Fourier analysis shows that complex waveforms can be expressed as sums of sinusoids. The pool uses the classic example:

- A square wave is made up of a sine wave plus its **odd harmonics**

## Time Domain vs. Frequency Domain

A time-domain description of a signal is:

- Amplitude at different times

## ADC Concepts

One analog-to-digital conversion approach tested:

- **Successive approximation**

Why very high-speed ADCs (direct/flash conversion) are used in SDR:

- They can digitize very high frequencies directly

Bit depth controls the number of input levels:

- 8-bit ADC → **256** levels

### Dither

:::definition Dither
Dither is a small amount of noise added to the input signal to reduce quantization noise artifacts.
:::

ADC quality metric emphasized by the pool:

- Total harmonic distortion (THD)

## DAC Output Filtering

A low-pass filter at the output of a DAC is used to:

- Remove spurious sampling artifacts (images) from the output signal

## RMS Measurements

True-RMS meters are useful because:

- They correctly measure RMS for both sinusoidal and non-sinusoidal waveforms

## PEP vs. Average Power for SSB

For an unprocessed SSB phone signal:

- Approximate PEP-to-average power ratio is about **2.5:1**

What determines the PEP-to-average ratio:

- **Speech characteristics** (and any processing/compression).`,
      keyPoints: [
        'Fourier analysis shows a square wave contains a fundamental plus odd harmonics',
        'Time-domain signals are described by amplitude vs time',
        'Successive approximation is a type of ADC; flash/direct conversion ADCs enable very high-speed SDR sampling',
        '8-bit ADCs encode 256 levels; dither reduces quantization artifacts; THD is a common ADC quality measure',
        'DAC outputs use low-pass filters to remove sampling images; true-RMS meters work on non-sinusoidal waveforms',
        'Unprocessed SSB PEP-to-average is ~2.5:1 and depends on speech characteristics',
      ],
      relatedQuestionIds: [
        'E8A01',
        'E8A02',
        'E8A03',
        'E8A04',
        'E8A05',
        'E8A06',
        'E8A07',
        'E8A08',
        'E8A09',
        'E8A10',
        'E8A11',
      ],
    },
    {
      id: 'E8B',
      title: 'FM/PM Modulation Index and Multiplexing Techniques (OFDM, FDM, TDM)',
      content: `# FM/PM Modulation Index and Multiplexing (E8B)

Extra questions often test “plug-and-chug” modulation index calculations and the ability to recognize multiplexing methods.

## Modulation Index and Deviation Ratio

:::definition FM modulation index
FM modulation index is the ratio of frequency deviation to modulating (audio) frequency:

β = Δf / fm
:::

Deviation ratio is:

- Maximum frequency deviation divided by the highest audio modulating frequency

Phase modulation note:

- For phase-modulated emissions, modulation index does **not** depend on RF carrier frequency.

## OFDM

Orthogonal frequency-division multiplexing (OFDM) is used for:

- Digital modes

OFDM is:

- A digital modulation technique using multiple subcarriers spaced/chosen to avoid intersymbol interference.

## FDM and TDM

Frequency-division multiplexing (FDM):

- Divides the transmitted signal into separate frequency bands carrying different data streams

Digital time-division multiplexing (TDM):

- Arranges two or more signals to share discrete time slots of a data transmission.`,
      keyPoints: [
        'FM modulation index is deviation divided by modulating frequency; deviation ratio uses max deviation over highest audio frequency',
        'Phase modulation index does not depend on RF carrier frequency',
        'OFDM is a digital technique using multiple subcarriers chosen to reduce intersymbol interference',
        'FDM separates streams by frequency bands; TDM separates streams by time slots',
      ],
      relatedQuestionIds: [
        'E8B01',
        'E8B02',
        'E8B03',
        'E8B04',
        'E8B05',
        'E8B06',
        'E8B07',
        'E8B08',
        'E8B09',
        'E8B10',
        'E8B11',
      ],
    },
    {
      id: 'E8C',
      title: 'Digital Modulation, Bandwidth, and Coding',
      content: `# Digital Modulation, Bandwidth, and Coding (E8C)

This group connects digital modulation concepts to bandwidth and error-control techniques.

## QAM and Constellations

:::definition QAM
Quadrature Amplitude Modulation (QAM) transmits data by modulating the amplitude of two carriers of the same frequency that are **90° out of phase**.
:::

Constellation diagrams show:

- The possible phase and amplitude states for each symbol (QAM/QPSK/etc.)

## Symbol Rate and Baud

Symbol rate is:

- The rate at which the waveform changes to convey information

Relationship:

- Symbol rate and **baud** are the same.

## PSK Bandwidth Control

To minimize bandwidth in PSK:

- Change phase at the **zero crossing** of the RF signal

PSK31 bandwidth minimization technique emphasized:

- Use **sinusoidal data pulses**

## Bandwidth Examples from the Pool

The pool calls out a few memorable bandwidth numbers:

- 13 WPM CW: about **52 Hz**
- FT8: about **50 Hz**
- 4,800 Hz shift, 9,600 baud ASCII FM: about **15.36 kHz**

## Error Detection/Correction

ARQ (Automatic Repeat reQuest) achieves error correction by:

- Requesting retransmission when errors are detected

Gray code:

- Only one bit changes between sequential values (reduces ambiguity in symbol decisions)

Data rate without more bandwidth:

- Use a more efficient digital code (more bits per symbol at the same symbol rate)

## Mesh Network Addressing

Nodes in a mesh network have:

- IP addresses

Nodes form a mesh using:

- Discovery and link establishment protocols.`,
      keyPoints: [
        'QAM uses two quadrature carriers; constellation diagrams show symbol states',
        'Symbol rate equals baud; PSK bandwidth is minimized by changing phase at zero crossings and shaping pulses (PSK31 uses sinusoidal pulses)',
        'Bandwidth examples: ~52 Hz for 13 WPM CW, ~50 Hz for FT8, ~15.36 kHz for 4800 Hz shift 9600 baud FM ASCII',
        'ARQ requests retransmission on detected errors; Gray code changes only one bit between adjacent values',
        'Data rate can increase without increasing bandwidth by using more efficient coding; mesh nodes use IP addressing and discovery protocols',
      ],
      relatedQuestionIds: [
        'E8C01',
        'E8C02',
        'E8C03',
        'E8C04',
        'E8C05',
        'E8C06',
        'E8C07',
        'E8C08',
        'E8C09',
        'E8C10',
        'E8C11',
        'E8C12',
        'E8C13',
        'E8C14',
        'E8C15',
      ],
    },
    {
      id: 'E8D',
      title: 'Spread Spectrum, Keying Quality, AFSK Distortion, and Digital Codes',
      content: `# Spread Spectrum, Keying Quality, AFSK Distortion, and Digital Codes (E8D)

This group covers spread-spectrum basics, CW keying cleanliness, and how audio levels affect digital IMD.

## Why Spread Spectrum Resists Interference

Received spread-spectrum signals are resistant to interference because:

- Signals not using the spread-spectrum algorithm are suppressed in the receiver.

Two spread-spectrum techniques tested:

- **Direct sequence**: uses a high-speed binary bit stream to shift the phase of an RF carrier
- **Frequency hopping**: rapidly varies transmit frequency according to a pseudorandom sequence

## CW Keying Quality (Key Clicks)

Extremely short rise or fall times produce:

- **Key clicks** (wideband spectral splatter)

Most common mitigation:

- Increase keying waveform rise and fall times (shape the keying envelope)

## ASCII Parity Bits

Parity bits are included so that:

- Some types of errors can be detected

## AFSK Overmodulation and IMD

A common cause of overmodulation of AFSK signals:

- Excessive transmit audio levels

Distortion metric highlighted:

- Intermodulation distortion (**IMD**)

Acceptable maximum IMD level for an idling PSK signal:

- **−30 dB**

## Baudot vs. ASCII

Baudot vs ASCII differences emphasized:

- Baudot uses **5** data bits per character; ASCII uses **7 or 8**
- Baudot uses letters/figures shift codes; ASCII does not

ASCII advantage called out:

- Supports both uppercase and lowercase text.`,
      keyPoints: [
        'Spread-spectrum receivers suppress non-spread signals; DSSS uses a high-speed code stream and FHSS hops frequencies pseudorandomly',
        'Key clicks are caused by excessively fast rise/fall times; fix by slowing/shaping the keying envelope',
        'Parity bits provide error detection; AFSK overmodulation is commonly due to excessive audio levels and can be evaluated via IMD',
        'Idling PSK IMD should be about −30 dB or better; Baudot is 5-bit with shift codes while ASCII is 7/8-bit and supports upper/lower case',
      ],
      relatedQuestionIds: [
        'E8D01',
        'E8D02',
        'E8D03',
        'E8D04',
        'E8D05',
        'E8D06',
        'E8D07',
        'E8D08',
        'E8D09',
        'E8D10',
        'E8D11',
      ],
    },
  ],
}

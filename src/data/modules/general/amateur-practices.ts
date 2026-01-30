/**
 * G4 - Amateur Radio Practices Module
 * General Class Amateur Radio License
 */

import type { LearningModule } from '@/types/learning'

export const amateurPracticesModule: LearningModule = {
  id: 'G4',
  examLevel: 'general',
  title: 'Amateur Radio Practices',
  description:
    'Practical aspects of amateur radio station operation including transceiver controls, test equipment, interference mitigation, and mobile/alternative power installations.',
  estimatedMinutes: 55,
  sections: [
    {
      id: 'G4A',
      title: 'Station Operation and Transceiver Operation',
      content: `# Station Operation and Transceiver Operation

Operating an HF transceiver effectively requires understanding various controls and features designed to optimize signal quality and reduce interference. Modern transceivers include numerous adjustments for both transmit and receive functions.

## Receiver Controls and Features

Several receiver features help manage interference and noise:

- **Notch Filter**: Reduces interference from carriers (heterodynes) within the receiver passband by creating a sharp null at a specific frequency. This is particularly useful for eliminating a steady tone from a nearby carrier.
- **Noise Blanker**: Works by reducing receiver gain during noise pulses. It's effective against impulse noise from ignition systems, motors, and other pulse-type interference.
- **Noise Reduction (DSP)**: Digitally processes audio to reduce background noise. However, increasing the noise reduction level too much may cause received signals to become distorted.
- **Receive Attenuator**: Prevents receiver overload from strong incoming signals by reducing the input signal level.
- **Reverse Sideband**: When receiving CW, switching to the opposite sideband may reduce or eliminate interference from other signals by moving them to a different audio frequency.

## Transmitter and Amplifier Controls

For those using vacuum-tube RF power amplifiers, proper tuning is essential:

- **TUNE Control**: The correct adjustment produces a pronounced dip in plate current, indicating the amplifier is properly resonated.
- **LOAD/COUPLING Control**: Should be adjusted for desired power output without exceeding maximum allowable plate current.
- **ALC (Automatic Level Control)**: Prevents excessive drive to the amplifier. When transmitting AFSK data signals, ALC should be inactive because the ALC action can distort the signal.
- **Amplifier Keying Delay**: RF output should be delayed after activating the keying line to allow time for the amplifier to switch the antenna between the transceiver and the amplifier output.

## Additional Transceiver Features

- **Antenna Tuner**: Increases power transfer from the transmitter to the feed line by matching impedances.
- **Dual VFO**: Allows you to transmit on one frequency and listen on another, useful for split-frequency operation and working DX pileups.
- **Electronic Keyer**: Automatically generates dots and dashes for CW operation, making sending Morse code easier and more consistent.
`,
      keyPoints: [
        'Notch filter reduces interference from carriers in the receiver passband',
        'Noise blanker works by reducing receiver gain during noise pulses',
        'Correct TUNE control setting produces a pronounced dip in plate current',
        'ALC prevents excessive drive but should be inactive for AFSK data signals',
        'Antenna tuner increases power transfer from transmitter to feed line',
      ],
      relatedQuestionIds: [
        'G4A01',
        'G4A02',
        'G4A03',
        'G4A04',
        'G4A05',
        'G4A06',
        'G4A07',
        'G4A08',
        'G4A09',
        'G4A10',
        'G4A11',
        'G4A12',
        'G4A13',
      ],
    },
    {
      id: 'G4B',
      title: 'Test Equipment and Oscilloscopes',
      content: `# Test Equipment and Oscilloscopes

Proper test equipment is essential for maintaining and troubleshooting amateur radio equipment. Understanding what each instrument measures and when to use it will help you keep your station operating properly.

## Oscilloscopes

An oscilloscope is one of the most versatile pieces of test equipment, containing horizontal and vertical channel amplifiers to display signals visually over time. Key advantages over a digital voltmeter include the ability to measure complex waveforms and visualize signal characteristics that would be impossible to see with a meter.

**Common oscilloscope uses in amateur radio:**
- Checking the keying waveform of a CW transmitter to identify key clicks
- Viewing the RF envelope pattern of transmitted signals
- Monitoring modulation quality
- When checking RF envelope patterns, connect the attenuated RF output of the transmitter to the vertical input

## Multimeters

Both analog and digital multimeters have their place in the amateur shack:

- **Digital Multimeters (DMM)**: Offer higher precision than analog meters, making them ideal when exact measurements are needed.
- **Analog Multimeters**: Preferred when adjusting circuits for maximum or minimum values because the needle movement makes it easier to see trends and peaks.
- **High Input Impedance**: Voltmeters have high input impedance to decrease the loading on circuits being measured, ensuring accurate readings without affecting circuit operation.

## Two-Tone Testing

A two-tone test is used to analyze transmitter linearity, an important measure of SSB transmitter performance:

- Uses two non-harmonically related audio signals as input
- The resulting RF envelope pattern reveals distortion and intermodulation products
- A perfectly linear amplifier shows a clean envelope pattern; distortion appears as irregularities

## Antenna Analyzers and Directional Wattmeters

These instruments are essential for antenna system testing:

- **Antenna Analyzer**: Can measure impedance of coaxial cable, SWR, and resonant frequency. When using for SWR measurements, the antenna and feed line must be connected. Strong signals from nearby transmitters can interfere with SWR readings.
- **Directional Wattmeter**: Can determine standing wave ratio (SWR) by measuring forward and reflected power.
`,
      keyPoints: [
        'Oscilloscope contains horizontal and vertical channel amplifiers',
        'Digital multimeters offer higher precision than analog meters',
        'Analog meters are preferred when adjusting for max/min values',
        'Two-tone test analyzes transmitter linearity using non-harmonically related audio signals',
        'Antenna analyzer measures impedance and requires antenna/feed line connected for SWR',
      ],
      relatedQuestionIds: [
        'G4B01',
        'G4B02',
        'G4B03',
        'G4B04',
        'G4B05',
        'G4B06',
        'G4B07',
        'G4B08',
        'G4B09',
        'G4B10',
        'G4B11',
        'G4B12',
        'G4B13',
      ],
    },
    {
      id: 'G4C',
      title: 'Interference, Grounding, and RF Safety',
      content: `# Interference, Grounding, and RF Safety

Radio frequency interference (RFI) can affect both your station and neighboring electronic devices. Understanding the causes of interference and proper grounding techniques is essential for safe, trouble-free operation.

## Common Interference Sources and Symptoms

Different types of transmissions cause characteristic interference patterns in audio devices:

- **SSB Phone Interference**: Produces distorted speech in affected audio equipment
- **CW Interference**: Creates on-and-off humming or clicking sounds
- **Wide-Band Interference**: Arcing at poor electrical connections can cause interference covering a wide range of frequencies

**Solutions for RF interference in audio circuits:**
- **Bypass Capacitors**: Useful for reducing RF interference to audio frequency circuits by shunting RF energy to ground
- **Ferrite Chokes**: Reduce RF interference caused by common-mode current on audio cables

## Grounding Considerations

Proper grounding is critical for both safety and RF performance:

- **RF Hot Spots**: Bonding all equipment enclosures together helps minimize RF hot spots in the station
- **Ground Loops**: Cause hum on transmitted signals. Minimize by bonding equipment enclosures together
- **High-Impedance Ground Wires**: A ground wire that has high impedance at the operating frequency can produce RF burns due to high voltages
- **Resonant Ground Connections**: Can cause high RF voltages on the enclosures of station equipment

**Lightning Protection:**
- Soldered joints should NOT be used in lightning protection ground connections because the heat from a lightning strike will likely destroy the solder joint
- Use mechanical connections (clamps, compression fittings) instead

## RF Safety

All metal enclosures of station equipment must be grounded to ensure that hazardous voltages cannot appear on the chassis. This protects the operator from electrical shock in case of internal component failure or RF energy coupling to the equipment chassis.
`,
      keyPoints: [
        'Bypass capacitors reduce RF interference in audio circuits',
        'Ferrite chokes reduce common-mode current interference on cables',
        'Bonding equipment enclosures minimizes RF hot spots and ground loops',
        'High-impedance ground wires can cause RF burns from high voltages',
        'Soldered joints should not be used for lightning ground connections',
      ],
      relatedQuestionIds: [
        'G4C01',
        'G4C02',
        'G4C03',
        'G4C04',
        'G4C05',
        'G4C06',
        'G4C07',
        'G4C08',
        'G4C09',
        'G4C10',
        'G4C11',
        'G4C12',
      ],
    },
    {
      id: 'G4D',
      title: 'Speech Processors and S Meters',
      content: `# Speech Processors and S Meters

Understanding speech processing and signal strength measurements helps you operate more effectively and communicate signal reports accurately.

## Speech Processors

A speech processor increases the apparent loudness of transmitted voice signals without increasing peak power. It works by compressing the dynamic range of audio, raising the average power level relative to peak power.

**Effects of speech processing:**
- **Proper Adjustment**: Increases average power, making your signal more readable in noise
- **Improper Adjustment**: Can cause distorted speech, excess intermodulation products, and excessive background noise

Speech processors are most beneficial in marginal conditions where increasing average power improves intelligibility. They should be carefully adjusted to avoid the negative effects of over-processing.

## S Meters and Signal Strength

The S meter measures received signal strength and is calibrated in "S units" from S1 to S9, with additional readings above S9 measured in dB over S9.

**S Meter Calibration:**
- One S unit represents approximately 6 dB change in signal strength
- A 6 dB change represents a 4x change in power
- A signal reading 20 dB over S9 is 100 times more powerful than an S9 signal
- To raise a signal from S8 to S9 requires approximately 4 times the power output

## Understanding SSB Bandwidth and Frequency

When operating SSB, your signal occupies a band of frequencies extending from the displayed carrier frequency:

- **LSB (Lower Sideband)**: Signal extends BELOW the displayed carrier frequency
  - A 3 kHz LSB signal at 7.178 MHz occupies 7.175 MHz to 7.178 MHz
- **USB (Upper Sideband)**: Signal extends ABOVE the displayed carrier frequency
  - A 3 kHz USB signal at 14.347 MHz occupies 14.347 MHz to 14.350 MHz

**Avoiding Out-of-Band Operation:**
- When using 3 kHz LSB near the lower band edge, set your displayed carrier frequency at least 3 kHz above the edge
- When using 3 kHz USB near the upper band edge, set your displayed carrier frequency at least 3 kHz below the edge
`,
      keyPoints: [
        'Speech processor increases average power, not peak power',
        'One S unit equals approximately 6 dB (4x power change)',
        '20 dB over S9 is 100 times more powerful than S9',
        'LSB signal extends below displayed carrier; USB extends above',
        'Keep displayed carrier 3 kHz inside band edges when using 3 kHz wide SSB',
      ],
      relatedQuestionIds: [
        'G4D01',
        'G4D02',
        'G4D03',
        'G4D04',
        'G4D05',
        'G4D06',
        'G4D07',
        'G4D08',
        'G4D09',
        'G4D10',
        'G4D11',
      ],
    },
    {
      id: 'G4E',
      title: 'HF Mobile and Alternative Power Sources',
      content: `# HF Mobile and Alternative Power Sources

Operating HF mobile presents unique challenges, and alternative power sources like solar panels offer flexibility for portable and emergency operations.

## HF Mobile Antenna Considerations

The most limiting factor for HF mobile installations is the efficiency of the electrically short antenna. Vehicle-mounted HF antennas must be much shorter than a full-size antenna, leading to several challenges:

- **Capacitance Hat**: A horizontal element at the top of a mobile antenna that electrically lengthens a physically short antenna by adding capacitance
- **Corona Ball**: Reduces RF voltage discharge (corona) from the antenna tip while transmitting, preventing power loss and potential damage
- **Limited Bandwidth**: One disadvantage of shortened mobile antennas is that operating bandwidth may be very limited, often requiring retuning when changing frequency

## Mobile Power Connections

Proper power wiring is critical for HF mobile installations:

- **Best Connection**: Direct to the battery using heavy-gauge wire with appropriate fusing
- **Avoid Auxiliary Power Sockets**: The wiring to vehicle auxiliary power sockets (cigarette lighter) may be inadequate for the current drawn by a 100-watt transceiver

## Mobile Interference Sources

Several vehicle systems may cause receive interference to an HF transceiver:
- Battery charging system (alternator whine)
- Fuel delivery system (fuel pump noise)
- Control computers (digital noise)

Ferrite chokes and proper bonding can help reduce these interference sources.

## Solar Power for Amateur Radio

Solar panels provide a renewable power source for amateur radio, especially useful for portable and emergency operations:

- **Cell Configuration**: Individual cells in a solar panel are connected in series-parallel to achieve desired voltage and current
- **Cell Voltage**: A fully illuminated silicon photovoltaic cell produces approximately 0.5 VDC open-circuit
- **Series Diode**: Should be connected between a solar panel and storage battery to prevent discharge of the battery through the panel during times of low or no illumination
- **Lithium Iron Phosphate Batteries**: When charging from solar panels, a charge controller must be used to prevent damage to the battery from overcharging
`,
      keyPoints: [
        'Electrically short antenna efficiency is the main limiting factor for HF mobile',
        'Capacitance hat electrically lengthens a physically short antenna',
        'Connect HF mobile power directly to battery with heavy-gauge fused wire',
        'Silicon photovoltaic cells produce approximately 0.5 VDC open-circuit',
        'Use series diode to prevent battery discharge through solar panel in low light',
      ],
      relatedQuestionIds: [
        'G4E01',
        'G4E02',
        'G4E03',
        'G4E04',
        'G4E05',
        'G4E06',
        'G4E07',
        'G4E08',
        'G4E09',
        'G4E10',
        'G4E11',
      ],
    },
  ],
}

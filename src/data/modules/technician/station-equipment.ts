/**
 * T7 - Station Equipment
 * Learning module for transceivers, troubleshooting, test equipment, and practical measurements
 */

import type { LearningModule } from '@/types/learning'

export const stationEquipmentModule: LearningModule = {
  id: 'T7',
  examLevel: 'technician',
  title: 'Station Equipment',
  description:
    'Understanding transceivers, receivers, and transmitters; troubleshooting interference problems; using test equipment like oscilloscopes, multimeters, and SWR meters; and practical skills including measurements and soldering.',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'T7A',
      title: 'Transceivers, Receivers, and Transmitters',
      content: `# Transceivers, Receivers, and Transmitters

Your amateur radio station centers around the **transceiver**—the heart of your communications system. Understanding how these devices work helps you operate more effectively and troubleshoot problems.

---

## What is a Transceiver?

:::definition
**Transceiver** = A device that combines both a **receiver** and a **transmitter** into a single unit, sharing common circuitry for both functions.
:::

Modern transceivers include sophisticated circuitry that allows seamless switching between transmitting and receiving modes. This is the most common type of amateur radio equipment today.

:::radio
**PTT (Push-To-Talk)**: When grounded, the PTT input switches the transceiver from receive mode to transmit mode, allowing you to speak into the microphone.
:::

---

## Key Internal Circuits

Inside a transceiver, several circuits work together:

| Circuit | Function |
|---------|----------|
| **Oscillator** | Generates a signal at a specific frequency—the basis for both receiving and transmitting |
| **Mixer** | Converts signals from one frequency to another (essential for superheterodyne receivers) |
| **Modulator** | Combines speech with the RF carrier to create the transmitted signal |

:::info
**Modulation** is the process of adding voice (or data) to your RF carrier signal. This is how your audio gets "encoded" onto the radio wave.
:::

---

## Receiver Performance: Two Critical Specifications

| Specification | What It Measures | Why It Matters |
|---------------|------------------|----------------|
| **Sensitivity** | Ability to detect weak signals | A more sensitive receiver can hear weaker stations |
| **Selectivity** | Ability to discriminate between signals close in frequency | Rejects unwanted adjacent signals while passing the desired one |

:::tip
Both sensitivity and selectivity are crucial for effective amateur radio operation—you need to hear weak signals AND filter out nearby interference.
:::

---

## Station Accessories and Their Functions

| Equipment | Purpose | Where It Goes |
|-----------|---------|---------------|
| **RF Power Amplifier** | Increases transmitted output power | After the transceiver, before antenna |
| **RF Preamplifier** | Boosts weak received signals | Between antenna and receiver |
| **Transverter** | Converts RF to another band | Allows operation on bands the radio wasn't designed for |

:::warning
**VHF Power Amplifier SSB/CW-FM Switch**: This switch sets the amplifier for proper operation in the selected mode. Different modes have different duty cycle and linearity requirements—using the wrong setting can damage equipment or produce poor signal quality.
:::`,
      keyPoints: [
        'A transceiver combines a receiver and transmitter in one unit',
        'PTT (Push-To-Talk) switches from receive to transmit when grounded',
        'Sensitivity = ability to detect weak signals; Selectivity = ability to discriminate between signals',
        'A mixer converts signals from one frequency to another; an oscillator generates signals at specific frequencies',
        'RF preamplifiers go between antenna and receiver; RF power amplifiers boost transmitter output',
      ],
      relatedQuestionIds: [
        'T7A01',
        'T7A02',
        'T7A03',
        'T7A04',
        'T7A05',
        'T7A06',
        'T7A07',
        'T7A08',
        'T7A09',
        'T7A10',
        'T7A11',
      ],
    },
    {
      id: 'T7B',
      title: 'Troubleshooting and Interference',
      content: `# Troubleshooting and Interference

Radio frequency interference (RFI) is one of the most common challenges amateur operators face. Understanding the causes and solutions helps you maintain good relations with neighbors while enjoying your hobby.

---

## Three Main Causes of RFI

| Cause | Description | Example |
|-------|-------------|---------|
| **Fundamental Overload** | Strong signal overwhelms a receiver's front end | Your 100W signal overloads a nearby TV receiver |
| **Harmonics** | Unwanted signals at multiples of transmitted frequency | Your 7 MHz signal produces interference at 14 MHz, 21 MHz, etc. |
| **Spurious Emissions** | Unwanted signals from transmitter imperfections | Mixer products, oscillator leakage |

:::definition
**Fundamental Overload**: When a receiver picks up your signal on YOUR frequency because the signal is simply too strong for the receiver to handle—even though you're operating properly.
:::

---

## Interference TO Your Neighbors

:::warning
**First Step When You Cause Interference**: Make sure your own station is functioning properly and doesn't cause interference to your own equipment tuned to the same channel.
:::

### Solutions for Different Scenarios

| Problem | Solution |
|---------|----------|
| Neighbor's radio/TV overloaded | Install a filter at the **affected receiver's** antenna input |
| Cable TV interference | Ensure all coaxial connectors are properly installed (loose connections cause signal leakage) |

:::tip
For fundamental overload problems, the filter goes at **their** equipment, not yours—you're operating properly, but their receiver can't handle strong nearby signals.
:::

---

## Interference FROM Outside Sources

| Problem | Solution |
|---------|----------|
| Nearby FM broadcast station overloading your transceiver | Install a **band-reject filter** to attenuate the interfering signal |
| Neighbor's device interfering with your station | Work cooperatively to identify the device; FCC rules prohibit devices that cause harmful interference |

---

## Common On-Air Problems and Solutions

| Symptom | Likely Cause | Solution |
|---------|--------------|----------|
| **Over-deviation on FM** | Speaking too close to mic | Talk farther away from the microphone |
| **Distorted audio through repeater** | Off frequency, low batteries, weak signal, or multipath | Check frequency, replace batteries, improve location |
| **Garbled/unintelligible voice** | RF feedback in transmitter | RF energy getting back into audio circuits—check grounding and shielding |
| **Distorted audio from RF on mic cable** | RF current on cable shield | Install a **ferrite choke** on the microphone cable |

:::radio
**Ferrite Chokes**: These small devices block RF while passing audio signals. They're an essential tool for curing RF interference problems in audio cables.
:::`,
      keyPoints: [
        'RFI causes: fundamental overload, harmonics, and spurious emissions',
        'For interference to neighbors: first verify your own station works properly on that channel',
        'Fundamental overload in consumer devices is solved with a filter at THEIR antenna input',
        'Over-deviation on FM: speak farther from the microphone',
        'Ferrite chokes cure RF on microphone cables; band-reject filters block nearby FM broadcast interference',
      ],
      relatedQuestionIds: [
        'T7B01',
        'T7B02',
        'T7B03',
        'T7B04',
        'T7B05',
        'T7B06',
        'T7B07',
        'T7B08',
        'T7B09',
        'T7B10',
        'T7B11',
      ],
    },
    {
      id: 'T7C',
      title: 'Test Equipment - Dummy Loads, Antenna Analyzers, and SWR',
      content: `# Test Equipment: Dummy Loads, Antenna Analyzers, and SWR

Proper test equipment helps you tune your station for optimal performance, troubleshoot problems, and avoid interfering with other stations during testing.

---

## Dummy Loads: Test Without Transmitting

:::definition
**Dummy Load** = A non-inductive resistor mounted on a heat sink that absorbs and dissipates RF power as heat, allowing transmitter testing without radiating a signal.
:::

| Characteristic | Specification |
|----------------|---------------|
| Impedance | Typically **50 ohms** (matches standard amateur equipment) |
| Construction | Non-inductive resistor + heat sink |
| Purpose | Safely absorb transmitted power during testing |

:::tip
Always use a dummy load when testing or troubleshooting your transmitter—it prevents interference to other stations and lets you focus on finding problems.
:::

---

## Understanding SWR (Standing Wave Ratio)

SWR indicates how well your antenna system is matched to your feed line and transmitter.

| SWR Reading | What It Means |
|-------------|---------------|
| **1:1** | Perfect match—all power delivered to antenna, no reflections |
| **1.5:1** | Very good match—typical for a well-tuned antenna |
| **2:1** | Acceptable—most transmitters handle this fine |
| **4:1** | Significant mismatch—power being reflected back toward transmitter |

:::warning
**Transmitter Protection**: Most solid-state transmitters include protection circuitry that automatically reduces output power as SWR increases. This protects the output amplifier transistors from damage caused by reflected power.
:::

### Measuring SWR

| Instrument | Function |
|------------|----------|
| **Directional Wattmeter** (SWR meter/bridge) | Measures forward and reflected power to calculate SWR |
| **Antenna Analyzer** | Determines if antenna is resonant at desired frequency; provides impedance information |

---

## Coaxial Cable: The Critical Link

Your feed line connects everything together—its condition directly affects station performance.

:::info
**Power lost in a feed line is converted into heat**, reducing the power delivered to your antenna. Lower-loss cable means more power reaches your antenna.
:::

### Common Coaxial Cable Problems

| Problem | Cause | Prevention |
|---------|-------|------------|
| **Moisture contamination** | Water intrusion through damaged jacket | Use weatherproofing tape; inspect regularly |
| **UV damage** | Sunlight degrades outer jacket | Use UV-resistant cable jacket |
| **Connector failure** | Poor installation or corrosion | Use quality connectors; weatherproof outdoor connections |

:::warning
**Moisture is the #1 enemy of coaxial cable.** Water intrusion increases losses dramatically and can cause complete cable failure. Air-core coaxial cable requires special techniques to prevent moisture entry.
:::`,
      keyPoints: [
        'Dummy load = non-inductive resistor on heat sink; prevents on-air transmission during testing',
        'SWR of 1:1 = perfect match; SWR of 4:1 = significant mismatch',
        'Solid-state transmitters reduce power at high SWR to protect output transistors',
        'Directional wattmeter measures SWR; antenna analyzer checks resonance',
        'Coaxial cable fails from moisture; UV-resistant jacket prevents water entry',
      ],
      relatedQuestionIds: [
        'T7C01',
        'T7C02',
        'T7C03',
        'T7C04',
        'T7C05',
        'T7C06',
        'T7C07',
        'T7C08',
        'T7C09',
        'T7C10',
        'T7C11',
      ],
    },
    {
      id: 'T7D',
      title: 'Practical Measurements and Soldering',
      content: `# Practical Measurements and Soldering

A multimeter and soldering iron are the two most essential tools in any amateur's toolkit. Knowing how to use them properly ensures accurate measurements and reliable connections.

---

## The Multimeter: Your Most Versatile Tool

:::definition
**Multimeter** = A test instrument capable of measuring voltage, resistance, and current—often in a single handheld device.
:::

### Connecting the Meter Correctly

| Measurement | Connection Method | Why |
|-------------|-------------------|-----|
| **Voltage** | In **parallel** with component | Measures potential difference across the component |
| **Current** | In **series** with circuit | Current must flow through the meter to be measured |
| **Resistance** | Across component (circuit OFF) | Meter applies small voltage to measure resistance |

:::warning
**Critical Safety Rule**: Never measure voltage when the meter is set to the resistance (ohms) setting—this can destroy the meter's internal circuitry!
:::

---

## Common Measurement Mistakes to Avoid

| Mistake | Consequence | Prevention |
|---------|-------------|------------|
| Measuring voltage on ohms setting | Can destroy the meter | Always verify meter setting before connecting |
| Measuring resistance in powered circuit | Inaccurate reading; may damage meter | Always ensure circuit is unpowered first |
| Wrong range selected | No reading or meter damage | Start with highest range, work down |

---

## Testing a Capacitor with an Ohmmeter

:::tip
**Capacitor Test**: When an ohmmeter is connected across a large, discharged capacitor, the reading will show **increasing resistance with time** as the capacitor charges from the meter's internal battery. This behavior confirms the capacitor is functional.
:::

---

## What a Multimeter CAN and CANNOT Measure

| Can Measure Directly | Requires Specialized Equipment |
|---------------------|-------------------------------|
| Voltage | Signal strength |
| Current | Noise level |
| Resistance | Impedance |
| | Reactance |

---

## Soldering Fundamentals

Soldering is essential for building and repairing amateur radio equipment. Using the right materials and techniques ensures reliable connections.

### Choosing the Right Solder

| Solder Type | Use For | Never Use For |
|-------------|---------|---------------|
| **Rosin-core** | Electronics, radio equipment | — |
| **Acid-core** | Plumbing | Electronics (corrosive flux damages components!) |

:::warning
**Never use acid-core solder for electronics!** The corrosive flux will damage electronic components and create unreliable connections over time.
:::

---

## Recognizing Good vs. Bad Solder Joints

| Joint Quality | Appearance | Action Required |
|---------------|------------|-----------------|
| **Good joint** | Bright, shiny, smooth | None—connection is reliable |
| **Cold joint** | Rough, lumpy, dull | Reheat and reflow the solder |

:::definition
**Cold Solder Joint**: A faulty connection that occurs when components weren't heated sufficiently or when movement occurred during cooling. These joints are unreliable and must be reworked.
:::

### Tips for Good Solder Joints

- Heat the joint, not the solder—let the joint melt the solder
- Use adequate heat—insufficient heat causes cold joints
- Keep components still while solder cools
- Use the right size soldering iron tip for the job
- Keep your soldering iron tip clean and tinned`,
      keyPoints: [
        'Voltmeter connects in parallel; ammeter connects in series',
        'Measuring voltage on resistance setting can damage a multimeter',
        'Always ensure circuit is unpowered before measuring resistance',
        'Use rosin-core solder for electronics; never use acid-core solder',
        'Good solder joints are shiny; cold joints appear rough or lumpy',
      ],
      relatedQuestionIds: [
        'T7D01',
        'T7D02',
        'T7D03',
        'T7D04',
        'T7D06',
        'T7D07',
        'T7D08',
        'T7D09',
        'T7D10',
        'T7D11',
      ],
    },
  ],
}

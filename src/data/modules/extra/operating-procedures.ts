/**
 * E2 - Operating Procedures Module
 * Amateur Extra Class License (Element 4)
 */

import type { LearningModule } from '@/types/learning'

export const operatingProceduresModule: LearningModule = {
  id: 'E2',
  examLevel: 'extra',
  title: 'Operating Procedures',
  description:
    'Advanced operating procedures: amateur satellites, ATV/SSTV, contesting and DX practices, mesh networking, APRS, and weak-signal digital modes.',
  estimatedMinutes: 70,
  sections: [
    {
      id: 'E2A',
      title: 'Amateur Satellites and Space Communication Basics',
      content: `# Amateur Satellites and Space Communication Basics (E2A)

Satellite operating combines RF fundamentals with orbital mechanics and good on-air behavior. The pool focuses on pass geometry, transponders, mode designators, and why “less power is more.”

## Pass Geometry and Terminology

:::definition Ascending pass
An **ascending pass** is when a satellite moves **from south to north** across the sky (as seen from the ground).
:::

## Linear Transponders (Including Inverting Transponders)

Many amateur satellites use **linear transponders** that translate an uplink passband to a downlink passband.

### Inverting linear transponders

An **inverting** linear transponder has three key characteristics:

- The **signal position in the passband is reversed**
- **Upper sideband becomes lower sideband** (and vice versa)
- Doppler shift effects are partly “opposed” because uplink and downlink shifts move in opposite directions

In practice, the satellite often mixes your uplink with an internal local oscillator and transmits the **difference product**.

:::tip Satellite operating habit
Always listen to the downlink while transmitting (full duplex if possible) so you can keep your uplink power and frequency under control.
:::

## Satellite “Mode” and Mode Designators

The “mode” of an amateur satellite refers to:

- Its **uplink and downlink frequency bands**

The letters in a satellite mode designator specify the:

- **Uplink and downlink frequency ranges**

## Orbits and Keplerian Elements

Tracking software predicts where a satellite will be using orbital parameters:

:::definition Keplerian elements
**Keplerian elements** are parameters that define a satellite’s orbit (commonly provided in TLE/“two-line element” format).
:::

## Bands and Hardware Notes

The pool uses common satellite band terminology:

- **L band** and **S band** correspond (in amateur context) to the **23 cm** and **13 cm** bands

And it highlights:

- A **geostationary** satellite appears to stay in one position in the sky.

Spin modulation and Faraday rotation can rotate polarization. A practical mitigation is:

- Use a **circularly polarized antenna**

## Digital Store-and-Forward Satellites

Some satellites provide packet/message relay functions:

- **Store-and-forward** means the satellite **holds digital messages** for later download and relays them when possible.`,
      keyPoints: [
        'An ascending satellite pass moves south-to-north',
        'Inverting linear transponders reverse spectrum position and swap USB/LSB; translation often uses mixing and a difference product',
        'A satellite “mode” describes its uplink and downlink band(s); mode designators specify uplink/downlink ranges',
        'Keplerian elements define a satellite orbit (commonly in TLE format)',
        'In amateur terms, L and S bands correspond to 23 cm and 13 cm; geostationary satellites appear fixed',
        'Circular polarization helps mitigate spin modulation and Faraday rotation',
        'Store-and-forward satellites hold digital messages for later downlink',
      ],
      relatedQuestionIds: [
        'E2A01',
        'E2A02',
        'E2A03',
        'E2A04',
        'E2A05',
        'E2A06',
        'E2A07',
        'E2A08',
        'E2A09',
        'E2A10',
        'E2A11',
        'E2A12',
        'E2A13',
      ],
    },
    {
      id: 'E2B',
      title: 'Amateur Television: NTSC, SSTV, and Digital ATV',
      content: `# Amateur Television: NTSC, SSTV, and Digital ATV (E2B)

This section covers fast-scan TV basics, analog SSTV concepts, and digital ATV terms that show up on the Extra exam.

## Digital TV: Coding Rate

In forward error correction (FEC), the **coding rate** describes how much of the transmitted data is redundancy:

- A coding rate of **3/4** means **25%** of the data sent is **FEC data**.

## NTSC Fast-Scan TV Fundamentals

The pool focuses on the basic structure of NTSC frames:

- An NTSC television frame has **525 horizontal lines**.
- **Interlaced scanning** is produced by scanning **odd-numbered lines** in one field and **even-numbered lines** in the next.

## Analog SSTV (Slow-Scan TV)

SSTV encodes images as audio tones that can be sent over SSB.

Key ideas tested:

- **Brightness** is encoded by **tone frequency**
- **Color** information is sent **sequentially** (color “lines” sent one after another)
- A **VIS code** (Vertical Interval Signaling) identifies the SSTV mode being used
- Specific **tone frequencies** tell receiving software when to start a new picture line

:::tip SSTV reception
SSTV can be received and decoded from an **SSB receiver** when using the DRM protocol variant.
:::

## Vestigial Sideband (VSB)

:::definition Vestigial sideband modulation
**VSB** is a form of AM where **one complete sideband and a portion of the other** are transmitted.
:::

Why use VSB for analog fast-scan TV?

- It **reduces bandwidth** while improving fidelity of **low-frequency video** components.

## Digital ATV (DVB-T)

For DVB-T style amateur television signals, the pool highlights:

- Modulation types: **QAM** and **QPSK**

## A Practical “Compatibility” Trick on 70 cm

One technique to use commercial analog TV receivers for fast-scan TV on 70 cm is:

- Transmit on channels shared with **cable TV**.`,
      keyPoints: [
        'A 3/4 coding rate means 25% of transmitted data is FEC',
        'NTSC frames use 525 lines and interlaced fields (odd lines then even lines)',
        'In SSTV, brightness is encoded by tone frequency; VIS identifies mode; tone sequences mark line starts',
        'Vestigial sideband transmits one full sideband and part of the other to reduce bandwidth',
        'DVB-T ATV uses QAM/QPSK modulation',
        'Cable-channel sharing can enable use of commercial analog TV receivers on 70 cm ATV',
      ],
      relatedQuestionIds: [
        'E2B01',
        'E2B02',
        'E2B03',
        'E2B04',
        'E2B05',
        'E2B06',
        'E2B07',
        'E2B08',
        'E2B09',
        'E2B10',
        'E2B11',
        'E2B12',
      ],
    },
    {
      id: 'E2C',
      title: 'Contesting, Logging, DXing, and Mesh Networking',
      content: `# Contesting, Logging, DXing, and Mesh Networking (E2C)

Extra-level “operating practice” questions include contest norms, log formats, DX etiquette, and modern mesh networking basics.

## Remote Control Identification

When operating a station via remote control (with the transmitter located in the US):

- **No additional call sign indicator is required**.

## Logging and Confirmation Systems

Common electronic log exchange and submission formats:

- **ADIF**: common file format for exchanging amateur radio log data
- **Cabrillo**: standard format for submitting electronic contest logs

Confirmation systems:

- **LoTW (Logbook of The World)** can be used to confirm many types of contacts (the pool emphasizes that many categories are supported).

## Contesting Norms

- Amateur contesting is generally excluded from **30 meters**.

During VHF/UHF contests, the highest SSB/CW activity is typically:

- In the **weak-signal segment**, with activity clustered near the calling frequency.

## DXing Etiquette and “Split” Operation

DX stations often transmit and receive on different frequencies (“split”) to:

- Reduce interference from pileups
- Listen where signals are clearer
- Manage large numbers of callers effectively

When calling a DX station in a contest or pileup:

- Send your **full call sign once or twice** (not repeatedly, not partials unless asked).

:::definition DX QSL Manager
A **DX QSL Manager** handles sending and receiving confirmations for a DX station.
:::

## Mesh Networks (Amateur Context)

The pool treats amateur mesh networks as IP-style networks often operating in unlicensed/shared bands:

- Mesh networks can use frequencies shared with various **unlicensed wireless data services**
- Typical hardware: a **wireless router** running **custom firmware**

:::definition Latency
**Latency** is the delay between a control operator action and the corresponding change in the transmitted signal.
:::

Latency matters for remote control operation, especially where timing is critical (PTT, frequency/mode changes, etc.).`,
      keyPoints: [
        'Remote-controlled US stations do not require an additional call sign indicator',
        'ADIF is used for log exchange; Cabrillo is used for contest log submission; LoTW supports many confirmation types',
        'Contesting is generally excluded from 30 meters; VHF/UHF contest SSB/CW activity clusters in weak-signal segments',
        'DX stations use split operation to manage pileups and reduce interference; call once or twice with your full call sign',
        'DX QSL Managers handle confirmations for DX stations',
        'Mesh networks often use shared/unlicensed bands with routers running custom firmware; latency is control action → RF change delay',
      ],
      relatedQuestionIds: [
        'E2C01',
        'E2C02',
        'E2C03',
        'E2C04',
        'E2C05',
        'E2C06',
        'E2C07',
        'E2C08',
        'E2C09',
        'E2C10',
        'E2C11',
        'E2C12',
      ],
    },
    {
      id: 'E2D',
      title: 'Weak-Signal Digital Modes and APRS',
      content: `# Weak-Signal Digital Modes and APRS (E2D)

Extra topics include modern weak-signal digital modes (meteor scatter, EME) and APRS packet concepts.

## Weak-Signal and Specialized Modes

- **MSK144**: designed for **meteor scatter** communications
- **JT65**: optimized to decode signals at **very low signal-to-noise ratio**
- **Q65**: designed for **EME** (Earth–Moon–Earth) communications

### EME Contact Technique

EME contacts often use:

- **Time-synchronous transmissions**, alternating between stations on agreed time intervals

## APRS (Automatic Packet Reporting System)

APRS is used for position and telemetry reporting, including balloon tracking:

- Real-time tracking of balloons with amateur transmitters often uses **APRS**

Under the hood:

- APRS uses the **AX.25** packet protocol
- APRS beacon data is typically sent in an **Unnumbered Information (UI)** frame
- APRS data is relayed by **packet digipeaters**

### Pathing Example: WIDE3-1

The path designator **WIDE3-1** indicates:

- **Three digipeater hops are requested**, with **one remaining** (after one hop has already occurred)

:::tip Practical APRS habit
Use the minimum path needed for your area to reduce channel congestion.
:::

## Modulation Note

The pool notes JT65 modulation as:

- **Multitone AFSK** (audio-frequency shift keying using multiple tones)`,
      keyPoints: [
        'MSK144 is designed for meteor scatter; JT65 decodes very low SNR signals; Q65 is designed for EME',
        'EME contacts commonly alternate time-synchronous transmit periods between stations',
        'APRS is used for real-time tracking (including balloons) and uses AX.25 packet protocol',
        'APRS beacon data uses UI frames and is relayed by digipeaters; WIDE3-1 indicates 3 hops requested with one remaining',
        'JT65 uses multitone AFSK modulation',
      ],
      relatedQuestionIds: [
        'E2D01',
        'E2D02',
        'E2D03',
        'E2D04',
        'E2D05',
        'E2D06',
        'E2D07',
        'E2D08',
        'E2D09',
        'E2D10',
        'E2D11',
      ],
    },
    {
      id: 'E2E',
      title: 'HF Digital Modes, Protocols, and Timing',
      content: `# HF Digital Modes, Protocols, and Timing (E2E)

The Extra pool expects you to recognize common HF digital modes, their bandwidth/data-rate tradeoffs, and timing/synchronization requirements.

## Data Emissions Below 30 MHz

The pool highlights a common modulation family used for HF data:

- Data emissions below 30 MHz commonly use **FSK**.

## WSJT-X Family Timing (FT8/FT4/FST4/Q65)

WSJT-X style modes depend on accurate timing:

- Transmit/receive cycles are synchronized by **synchronizing computer clocks**

Key specifics:

- **FT8** transmission cycle length: **15 seconds**
- In **FT4**, the “4” refers to **four-tone continuous-phase FSK**
- **FST4** characteristics include: four-tone Gaussian FSK, variable T/R periods, and multiple tone spacings
- **Q65** differs from JT65 in that **multiple receive cycles are averaged**

## Modes and Capabilities

- **WSPR** is not a keyboard-to-keyboard chat mode; it’s optimized for weak-signal propagation reporting
- **PSK31** uses **variable-length character coding**
- **PACTOR** can be used to transfer **binary files**
- Under clear conditions, **PACTOR IV** has very high throughput

## Bandwidth and FSK Implementation Details

- Among common weak-signal modes listed in the pool, **FT8** is noted for extremely narrow bandwidth

Direct vs. audio FSK:

- **Direct FSK** modulates the transmitter **VFO**
- **AFSK** modulates the transmitter using an **audio** signal into an SSB or FM modulator chain

## ALE (Automatic Link Establishment)

ALE systems establish contact by:

- Constantly scanning a list of frequencies and activating the radio when the designated call sign is received`,
      keyPoints: [
        'FSK is a common modulation for HF data below 30 MHz',
        'WSJT-X modes require accurate computer clock synchronization; FT8 cycles are 15 seconds',
        'FT4 uses four-tone continuous-phase FSK; FST4 uses 4-tone Gaussian FSK with variable periods and multiple tone spacings',
        'Q65 averages multiple receive cycles; WSPR is not keyboard chat',
        'PSK31 uses variable-length coding; PACTOR can transfer binary files and PACTOR IV is high throughput',
        'Direct FSK modulates the VFO; AFSK injects audio; ALE scans frequencies and triggers on call sign',
      ],
      relatedQuestionIds: [
        'E2E01',
        'E2E02',
        'E2E03',
        'E2E04',
        'E2E05',
        'E2E06',
        'E2E07',
        'E2E08',
        'E2E09',
        'E2E10',
        'E2E11',
        'E2E12',
        'E2E13',
      ],
    },
  ],
}


/**
 * T8 - Modulation and Signals
 * Learning module for modulation types, satellite operations, operating activities, and digital modes
 */

import type { LearningModule } from '@/types/learning'

export const modulationSignalsModule: LearningModule = {
  id: 'T8',
  examLevel: 'technician',
  title: 'Modulation and Signals',
  description:
    'Understanding modulation modes (FM, SSB, AM, CW), amateur satellites, operating activities like contests and nets, and digital modes including packet radio, FT8, and APRS.',
  estimatedMinutes: 50,
  sections: [
    {
      id: 'T8A',
      title: 'Modulation Modes - FM, SSB, AM, CW',
      content: `# Modulation Modes

:::definition
**Modulation** is the process of encoding information onto a radio signal by varying one or more properties of a carrier wave.
:::

The four primary modulation types used in amateur radio are:

| Mode | Full Name | How It Works |
|------|-----------|--------------|
| **FM** | Frequency Modulation | Frequency varies with audio |
| **AM** | Amplitude Modulation | Amplitude varies with audio |
| **SSB** | Single Sideband | One sideband of AM, carrier suppressed |
| **CW** | Continuous Wave | Carrier on/off for Morse code |

---

## FM - Frequency Modulation

:::radio
FM is the **most common mode** for VHF and UHF voice repeaters.
:::

**How FM works:**
- The carrier frequency varies with the audio signal
- The amplitude stays constant
- Provides excellent audio quality
- Resistant to amplitude noise

**Bandwidth requirements:**
- A typical VHF FM voice signal occupies **10 to 15 kHz**
- This is wider than other voice modes

:::warning
**Capture Effect**: In FM, only one signal can be received at a time. The strongest signal suppresses weaker ones, which can be problematic in crowded band conditions.
:::

**FM is used for:**
- VHF/UHF repeaters
- VHF packet radio transmissions (FM or PM modulation)

---

## SSB - Single Sideband

:::definition
**SSB** is a form of amplitude modulation where one sideband and the carrier are suppressed, transmitting only the remaining sideband.
:::

**Advantages of SSB:**
- Very bandwidth-efficient: only **~3 kHz** (compared to FM's 10-15 kHz)
- Preferred for long-distance weak signal contacts on VHF/UHF
- Can get through when FM cannot

:::tip
**USB (Upper Sideband)** is the standard for:
- 10 meter HF communications
- All VHF communications
- All UHF communications
:::

**Trade-off:** SSB signals require more careful tuning to sound correct.

---

## CW - Continuous Wave (Morse Code)

:::info
CW has the **narrowest bandwidth** of any mode at approximately **150 Hz**.
:::

**Why CW excels at weak signal work:**
- Extremely narrow bandwidth
- Signals can be copied in conditions where voice would be unreadable
- Human brain excels at extracting patterns from noise

---

## AM - Amplitude Modulation

While less common for voice communications, AM has specific uses:

:::radio
**Amateur Fast-Scan TV (ATV)** uses AM modulation and requires approximately **6 MHz** of bandwidth for NTSC signals.
:::

---

## Bandwidth Comparison

| Mode | Approximate Bandwidth |
|------|----------------------|
| CW | 150 Hz |
| SSB | 3 kHz |
| FM Voice | 10-15 kHz |
| AM Fast-Scan TV | 6 MHz |`,
      keyPoints: [
        'FM is used for VHF/UHF repeaters with 10-15 kHz bandwidth; only one signal received at a time (capture effect)',
        'SSB has narrow 3 kHz bandwidth and is used for weak signal VHF/UHF contacts; USB is standard above 10 MHz',
        'CW (Morse code) has the narrowest bandwidth at 150 Hz, best for weak signal work',
        'FM or PM modulation is used for VHF packet radio transmissions',
        'AM fast-scan TV (NTSC) requires approximately 6 MHz bandwidth',
      ],
      relatedQuestionIds: [
        'T8A01',
        'T8A02',
        'T8A03',
        'T8A04',
        'T8A05',
        'T8A06',
        'T8A07',
        'T8A08',
        'T8A09',
        'T8A10',
        'T8A11',
        'T8A12',
      ],
      interactiveComponents: ['modulation-demo'],
    },
    {
      id: 'T8B',
      title: 'Amateur Satellites and Satellite Operation',
      content: `# Amateur Satellites

:::info
Amateur radio operators have access to numerous satellites in orbit, providing exciting opportunities for long-distance communication.
:::

---

## Satellite Orbits

:::definition
**LEO (Low Earth Orbit)** satellites orbit at **200-2000 km** above Earth. Most amateur satellites are in LEO.
:::

**LEO Satellite characteristics:**
- Passes are **predictable** but brief
- Each pass lasts only **10-15 minutes**
- Timing is critical for successful contacts

---

## Key Satellite Concepts

| Term | Definition |
|------|------------|
| **Beacon** | Transmission from satellite with status/health information |
| **Telemetry** | Data about satellite operations (anyone may receive without authorization) |
| **Uplink** | Frequency you transmit to the satellite |
| **Downlink** | Frequency you receive from the satellite |

:::radio
**U/V Mode** means:
- **U**plink on **70-centimeter band** (UHF)
- Downlink on **2-meter band** (VHF)
:::

**Common satellite modes:** SSB, FM, and CW/data

---

## Doppler Shift

:::warning
**Doppler shift** is a critical factor in satellite communications that causes the observed frequency to change as the satellite moves.
:::

**What happens:**
- As satellite approaches: frequency appears **higher**
- As satellite recedes: frequency appears **lower**
- You must adjust your receiver frequency during a pass

---

## Satellite Tracking Software

Tracking programs provide:
- Real-time satellite positions
- Pass predictions (time, azimuth, elevation)
- Compensated frequencies accounting for Doppler shift

:::definition
**Keplerian elements** are the mathematical inputs to satellite tracking programs used to calculate satellite positions.
:::

---

## Proper Uplink Power

:::warning
Using **excessive effective radiated power blocks access** by other users sharing the satellite.
:::

**How to verify proper power:**

:::tip
Ensure your downlink signal strength is **about the same as the satellite's beacon**. This indicates you're using appropriate power.
:::

---

## Signal Fading

:::info
**Spin fading** is caused by rotation of the satellite and its antennas. This causes signal fluctuations during a pass and is normal behavior.
:::`,
      keyPoints: [
        'LEO satellites are in low Earth orbit (200-2000 km); passes are brief and predictable',
        'U/V mode means 70cm uplink and 2m downlink; satellite beacons transmit health/status information',
        'Doppler shift causes frequency changes as the satellite moves; tracking software compensates for this',
        'Keplerian elements are inputs to satellite tracking programs for calculating positions',
        'Excessive uplink power blocks other users; match your signal to beacon strength to verify proper power',
      ],
      relatedQuestionIds: [
        'T8B01',
        'T8B02',
        'T8B03',
        'T8B04',
        'T8B05',
        'T8B06',
        'T8B07',
        'T8B08',
        'T8B09',
        'T8B10',
        'T8B11',
        'T8B12',
      ],
    },
    {
      id: 'T8C',
      title: 'Operating Activities - Contests, Nets, Special Events',
      content: `# Operating Activities

:::info
Amateur radio offers a wide variety of operating activities beyond casual conversations.
:::

---

## Contesting

:::definition
**Contesting** involves contacting as many stations as possible during a specified time period.
:::

**Contest types:**
- Short sprints lasting a few hours
- Major events spanning entire weekends
- Single-operator or multi-operator categories

:::tip
**Good contest procedure:** Send only the minimum information needed for proper identification and the required exchange. Keep contacts brief to maximize stations worked.
:::

---

## Radio Direction Finding

:::radio
**Radio direction finding** (also called "fox hunting" or transmitter hunting) uses directional antennas to locate:
- Hidden transmitters
- Sources of interference
:::

**Essential equipment:** A **directional antenna** is required for these activities.

---

## Grid Locators

:::definition
**Grid locators** are letter-number designators assigned to geographic locations.
:::

| Usage | Description |
|-------|-------------|
| VHF/UHF Contests | Commonly exchanged during contacts |
| Distance Calculation | Used to calculate distances between stations |
| Location Reference | Provides standardized location format |

**Example:** FN31 represents a specific grid square

---

## Internet Linking

Internet linking extends amateur radio's reach by connecting radio systems via the internet.

### VoIP - Voice Over Internet Protocol

:::definition
**VoIP** delivers voice communications over the internet using digital techniques.
:::

### IRLP - Internet Radio Linking Project

| Feature | Description |
|---------|-------------|
| Purpose | Connects amateur radio systems (like repeaters) via VoIP |
| Access Method | DTMF (touch-tone) signals over the air |
| Coverage | Worldwide connectivity through local repeaters |

### EchoLink

:::info
**EchoLink** allows amateur stations to transmit through repeaters without using a radio to initiate the transmission.
:::

**Requirements:**
- Must register your call sign
- Must provide proof of license

### Gateway Stations

:::definition
A **gateway** is an amateur radio station that connects other stations to the internet, enabling worldwide communications through local repeaters.
:::`,
      keyPoints: [
        'Contesting means contacting as many stations as possible; use minimum information for efficient exchanges',
        'Radio direction finding locates interference sources or hidden transmitters using directional antennas',
        'Grid locators are letter-number designators for geographic locations, used in VHF/UHF contests',
        'IRLP connects repeaters via VoIP; accessed using DTMF tones; EchoLink requires call sign registration',
        'A gateway connects amateur stations to the internet; VoIP enables voice communications over internet',
      ],
      relatedQuestionIds: [
        'T8C01',
        'T8C02',
        'T8C03',
        'T8C04',
        'T8C05',
        'T8C06',
        'T8C07',
        'T8C08',
        'T8C09',
        'T8C10',
        'T8C11',
      ],
    },
    {
      id: 'T8D',
      title: 'Digital Modes - Packet, FT8, APRS, DMR',
      content: `# Digital Modes

:::info
Digital modes have revolutionized amateur radio, enabling reliable communications under conditions where voice would be impossible.
:::

**Common digital modes:**

| Mode | Type | Primary Use |
|------|------|-------------|
| Packet | Data | Email, BBS, APRS |
| FT8 | Weak Signal | DX, propagation studies |
| APRS | Position/Data | Tracking, messaging |
| PSK | Keyboard-to-keyboard | Casual QSOs |
| DMR | Digital Voice | Repeater communications |

---

## Packet Radio

:::definition
**Packet radio** transmits data in discrete packets, each containing structured information.
:::

**Packet structure:**

| Component | Purpose |
|-----------|---------|
| Header | Contains destination call sign |
| Data Payload | The actual information being sent |
| Checksum | Error detection |
| ARQ | Automatic Repeat Request for retransmission |

**Common uses:**
- Bulletin board systems (BBS)
- Email forwarding
- APRS system backbone

---

## APRS - Automatic Packet Reporting System

:::radio
**APRS** provides real-time tactical digital communications displayed on maps showing station locations.
:::

**APRS can transmit:**
- GPS position data
- Text messages
- Weather data
- Telemetry

---

## FT8 and Weak Signal Modes

:::tip
**FT8** is a digital mode designed for low signal-to-noise operation, capable of decoding signals **far below the noise floor** that would be inaudible in other modes.
:::

**Part of the WSJT-X software suite**, FT8 supports:
- Earth-Moon-Earth (EME/moonbounce)
- Meteor scatter
- Propagation beacons
- Weak signal DX contacts

---

## PSK - Phase Shift Keying

:::definition
**PSK** encodes data by shifting the **phase** of the carrier wave.
:::

Popular for keyboard-to-keyboard QSOs with good weak signal performance.

---

## DMR - Digital Mobile Radio

:::radio
**DMR** is a technique for **time-multiplexing two digital voice signals** on a single 12.5 kHz repeater channel.
:::

**Key features:**

| Feature | Benefit |
|---------|---------|
| Time Division | Effectively doubles channel capacity |
| Talkgroups | Groups of users share a channel at different times |
| Privacy | Users in different talkgroups don't hear each other |

---

## Other Digital Modes

### CW (Morse Code)

:::info
While technically the oldest mode, **CW is still considered a digital communications mode** since it uses on-off keying to transmit information.
:::

### Mesh Networks

:::definition
**Amateur radio mesh networks** use commercial Wi-Fi equipment with **modified firmware** to create high-speed data networks.
:::

---

## Digital Mode Summary

| Mode | Key Characteristic |
|------|-------------------|
| Packet | Checksums, ARQ, headers with call signs |
| FT8 | Extreme weak signal capability |
| APRS | GPS positions on tactical maps |
| PSK | Phase shift keying for keyboard QSOs |
| DMR | Two voice channels time-multiplexed |
| CW | On-off keying (Morse code) |
| Mesh | Modified Wi-Fi for high-speed data |`,
      keyPoints: [
        'Packet radio includes checksums for error detection, headers with call signs, and ARQ for retransmission',
        'FT8 is a weak signal digital mode in WSJT-X; supports EME, meteor scatter, and propagation beacons',
        'APRS transmits GPS positions, text messages, and weather data on tactical maps',
        'DMR time-multiplexes two voice signals on one channel; talkgroups separate user groups',
        'PSK means Phase Shift Keying; CW is Morse code; mesh networks use modified Wi-Fi equipment',
      ],
      relatedQuestionIds: [
        'T8D01',
        'T8D02',
        'T8D03',
        'T8D04',
        'T8D05',
        'T8D06',
        'T8D07',
        'T8D08',
        'T8D09',
        'T8D10',
        'T8D11',
        'T8D12',
        'T8D13',
      ],
    },
  ],
}

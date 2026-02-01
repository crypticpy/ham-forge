/**
 * T4 - Amateur Radio Practices
 * Learning module for station setup and operating controls
 */

import type { LearningModule } from '@/types/learning'

export const amateurPracticesModule: LearningModule = {
  id: 'T4',
  examLevel: 'technician',
  title: 'Amateur Radio Practices',
  description:
    'Practical skills for amateur radio operation including station setup, power connections, test equipment, and transceiver operating controls.',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'T4A',
      title: 'Station Setup',
      content: `# Station Setup

Setting up an amateur radio station properly is essential for reliable operation and equipment longevity. This section covers power supplies, wiring, test equipment, and digital mode connections.

---

## Power Supply Requirements

:::definition
**Power Supply Rating**: The voltage and current capacity a power supply can deliver continuously under load.
:::

For a typical **50-watt mobile FM transceiver**, you need:

| Parameter | Requirement | Reason |
|-----------|-------------|--------|
| Voltage | 13.8 volts DC | Matches automotive electrical systems |
| Current | ~12 amperes | Provides headroom for transmitting |

:::warning
Using an undersized power supply leads to **voltage sag** during transmission, potentially causing:
- Audio distortion
- Transmitter shutdown
- Equipment damage over time
:::

---

## Power Wiring Best Practices

Proper power wiring is critical for reliable operation:

- **Use short, heavy-gauge wires** for DC power connections to minimize voltage drop
- During transmission, current draw increases dramatically
- Thin or long wires create resistance that drops voltage at the radio

:::tip
For mobile installations, connect the negative power return **directly to the 12-volt battery chassis ground** rather than to random metal points on the vehicle. This ensures:
- Clean, low-resistance ground path
- Reduced ground loops
- Less noise and interference
:::

---

## Test Equipment

### SWR Meters

:::definition
**SWR (Standing Wave Ratio)**: A measurement of how well your antenna system is matched to your transmission line. Lower is better (1:1 is perfect).
:::

When selecting an SWR meter, consider:
- **Frequency range** - must cover your operating bands
- **Power level** - meters are designed for specific power ranges

### RF Power Meters

:::info
RF power meters should be installed **in the feed line between the transmitter and antenna** to accurately measure forward and reflected power.
:::

### RF Bonding

| Material | Use Case | Why? |
|----------|----------|------|
| Flat copper strap | RF bonding | Lower inductance at radio frequencies |
| Round wire | DC connections | Higher inductance, not ideal for RF |

:::radio
**Flat copper strap is preferred** over round wire for RF bonding because it has lower inductance at radio frequencies.
:::

---

## Digital Mode Operation

Digital modes like FT8 require connecting your transceiver to a computer.

### Computer-Radio Interface Signals

A computer-radio interface handles three essential signals:

| Signal | Direction | Purpose |
|--------|-----------|---------|
| Receive audio | Radio → Computer | Decode incoming signals |
| Transmit audio | Computer → Radio | Send modulated data |
| PTT control | Computer → Radio | Key the transmitter |

:::tip
When connecting audio, the computer's **"line in"** connects to the transceiver's speaker or audio output connector.
:::

### Digital Hot Spots

:::definition
**Digital Hot Spot**: A device that allows communication using digital voice or data systems via the internet, enabling access to DMR, D-STAR, and other networks without a local repeater.
:::

### Other Digital Equipment

- **Electronic Keyer**: Assists in manual sending of Morse code by generating properly timed dots and dashes from paddle inputs

### Battery Operation

:::info
**Runtime Calculation**: Divide the battery's ampere-hour (Ah) rating by the average current draw of the equipment.

Example: 20 Ah battery ÷ 2 A draw = 10 hours of operation
:::`,
      keyPoints: [
        'A 50-watt mobile FM transceiver requires approximately 13.8 volts at 12 amperes',
        'Short, heavy-gauge wires minimize voltage drop during transmission',
        'SWR meters should match the frequency range and power level being measured',
        'RF power meters install in the feed line between transmitter and antenna',
        'Flat copper strap is preferred for RF bonding due to lower inductance',
      ],
      relatedQuestionIds: [
        'T4A01',
        'T4A02',
        'T4A03',
        'T4A04',
        'T4A05',
        'T4A06',
        'T4A07',
        'T4A08',
        'T4A09',
        'T4A10',
        'T4A11',
        'T4A12',
      ],
    },
    {
      id: 'T4B',
      title: 'Operating Controls',
      content: `# Operating Controls

Understanding your transceiver's operating controls is fundamental to effective amateur radio communication. This section covers frequency selection, squelch, SSB controls, and digital mode programming.

---

## Frequency Selection Methods

Modern transceivers offer multiple ways to select frequencies:

| Method | Use Case | Description |
|--------|----------|-------------|
| VFO knob | Smooth tuning | Variable Frequency Oscillator for continuous adjustment |
| Keypad | Direct entry | Enter exact frequency numerically |
| Memory channels | Quick access | Store frequently used frequencies |
| Scanning | Find activity | Automatically tune through frequencies/channels |

:::definition
**Scanning Function**: Tunes through a range of frequencies or memory channels to check for activity, automatically stopping when it detects a signal.
:::

---

## Squelch Control

:::info
The **squelch circuit** mutes receiver audio when no signal is present, eliminating the annoying hiss of an open receiver.
:::

### Setting Squelch for Weak Signals

:::tip
To hear weak FM signals that might not break the squelch, **set the squelch threshold so that receiver output audio is on all the time** (fully open squelch).
:::

### FM Tuning Behavior

:::warning
If an FM receiver is tuned above or below a signal's frequency, the result is **distortion of the signal's audio** — not a change in pitch as you might experience with SSB.
:::

---

## SSB (Single Sideband) Controls

SSB operation requires understanding additional controls not used in FM.

### RIT (Receiver Incremental Tuning)

:::definition
**RIT (Clarifier)**: Adjusts the receive frequency slightly **without changing the transmit frequency**.
:::

Use RIT when:
- The voice pitch of an SSB signal seems too high or low
- The other station is slightly off frequency
- You need to fine-tune reception without moving your transmit frequency

### Microphone Gain

:::warning
**Excessive microphone gain** on SSB transmissions causes distorted transmitted audio. Always set gain properly for clean audio.
:::

### Bandwidth Selection

Multimode transceivers offer multiple receive bandwidth choices for noise and interference reduction:

| Mode | Optimal Bandwidth | Reason |
|------|-------------------|--------|
| SSB | **2400 Hz** | Matches voice audio bandwidth, rejects adjacent interference |
| CW | 250-500 Hz | Narrower for single-tone signals |
| FM | 12-15 kHz | Wide for full-fidelity audio |

:::radio
For SSB reception, a **2400 Hz filter bandwidth** provides the best signal-to-noise ratio, as it matches the audio bandwidth of voice while rejecting adjacent interference.
:::

---

## Digital Voice Modes

Digital modes like DMR and D-STAR have specific programming requirements.

### DMR (Digital Mobile Radio)

:::definition
**DMR Code Plug**: A configuration file containing access information for repeaters and talkgroups that tells your radio how to communicate on the DMR network.
:::

To select a specific group of stations on a digital voice transceiver:
- Enter the group's **identification code** (talkgroup ID)

### D-STAR

:::warning
D-STAR transceivers **must have your call sign programmed before transmitting**, as the call sign is embedded in the digital data stream for identification purposes.
:::

### Digital Mode Summary

| Mode | Key Requirement | Purpose |
|------|-----------------|---------|
| DMR | Code plug with talkgroups | Network access configuration |
| D-STAR | Call sign programmed | Digital identification |
| Both | Group ID selection | Join specific conversations |`,
      keyPoints: [
        'VFO knob or keypad can enter operating frequency; memory channels store favorites',
        'Open the squelch fully to hear weak FM signals that do not break squelch',
        'RIT (Clarifier) corrects for off-frequency SSB signals without changing your transmit frequency',
        'A 2400 Hz bandwidth filter is optimal for SSB reception signal-to-noise ratio',
        'DMR code plugs contain repeater and talkgroup access information',
      ],
      relatedQuestionIds: [
        'T4B01',
        'T4B02',
        'T4B03',
        'T4B04',
        'T4B05',
        'T4B06',
        'T4B07',
        'T4B08',
        'T4B09',
        'T4B10',
        'T4B11',
        'T4B12',
      ],
    },
  ],
}

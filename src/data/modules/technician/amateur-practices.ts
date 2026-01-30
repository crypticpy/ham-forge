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
      content: `Setting up an amateur radio station properly is essential for reliable operation and equipment longevity. A critical first consideration is power supply selection. For a typical 50-watt mobile FM transceiver, you need a power supply rated at 13.8 volts DC at approximately 12 amperes. The 13.8-volt standard matches automotive electrical systems, while the 12-amp rating provides adequate current headroom for transmitting. Using an undersized power supply leads to voltage sag during transmission, potentially causing audio distortion or transmitter shutdown.

Power wiring deserves careful attention. Short, heavy-gauge wires should be used for DC power connections to minimize voltage drop when transmitting. During transmission, current draw increases dramatically, and thin or long wires create resistance that drops voltage at the radio. For mobile installations, the negative power return should connect directly to the 12-volt battery chassis ground rather than to random metal points on the vehicle. This ensures a clean, low-resistance ground path and reduces the chance of ground loops causing noise or interference.

Test equipment is vital for maintaining your station. An SWR (Standing Wave Ratio) meter measures how well your antenna system is matched to your transmission line. When selecting an SWR meter, consider the frequency range and power level at which you will make measurements, as meters are designed for specific bands and power ranges. RF power meters should be installed in the feed line between the transmitter and antenna to accurately measure forward and reflected power. For RF bonding between equipment and ground systems, flat copper strap is preferred over round wire because it has lower inductance at radio frequencies.

Digital mode operation requires connecting your transceiver to a computer. For modes like FT8, the transceiver's audio input and output connect to a computer running WSJT-X software. A computer-radio interface handles three signals: receive audio (from radio to computer), transmit audio (from computer to radio), and transmitter keying (PTT control). When connecting audio, the computer's "line in" connects to the transceiver's speaker or audio output connector. Digital mode hot spots allow communication using digital voice or data systems via the internet, enabling access to DMR, D-STAR, and other networks without a local repeater. An electronic keyer is a device that assists in manual sending of Morse code by generating properly timed dots and dashes from paddle inputs. Battery operation runtime can be calculated by dividing the battery's ampere-hour rating by the average current draw of the equipment.`,
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
      content: `Understanding your transceiver's operating controls is fundamental to effective amateur radio communication. Frequency selection can be accomplished using either the VFO (Variable Frequency Oscillator) knob for smooth tuning or the keypad for direct frequency entry. Most modern transceivers allow you to store frequently used frequencies in memory channels for quick access. The scanning function tunes through a range of frequencies or memory channels to check for activity, automatically stopping when it detects a signal.

Squelch control is essential for comfortable FM operation. The squelch circuit mutes receiver audio when no signal is present, eliminating the annoying hiss of an open receiver. To hear weak FM signals that might not break the squelch, you need to set the squelch threshold so that receiver output audio is on all the time (fully open squelch). However, if an FM receiver is tuned above or below a signal's frequency, the result is distortion of the signal's audio, not a change in pitch as you might experience with SSB.

For SSB (Single Sideband) operation, additional controls become important. The RIT (Receiver Incremental Tuning), also called a Clarifier, adjusts the receive frequency slightly without changing the transmit frequency. This is useful when the voice pitch of a single-sideband signal seems too high or low, typically because the other station is slightly off frequency. Excessive microphone gain on SSB transmissions causes distorted transmitted audio, so proper adjustment is important. Multimode transceivers offer multiple receive bandwidth choices, which permit noise or interference reduction by selecting a bandwidth matching the mode. For SSB reception, a 2400 Hz filter bandwidth provides the best signal-to-noise ratio, as it matches the audio bandwidth of voice while rejecting adjacent interference.

Digital voice modes like DMR (Digital Mobile Radio) and D-STAR have specific programming requirements. A DMR "code plug" contains access information for repeaters and talkgroups, essentially a configuration file that tells your radio how to communicate on the DMR network. To select a specific group of stations on a digital voice transceiver, you enter the group's identification code. D-STAR transceivers must have your call sign programmed before transmitting, as the call sign is embedded in the digital data stream for identification purposes.`,
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

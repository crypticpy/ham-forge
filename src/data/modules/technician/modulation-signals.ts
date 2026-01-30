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
      content: `Modulation is the process of encoding information onto a radio signal. The four primary modulation types used in amateur radio are FM (Frequency Modulation), AM (Amplitude Modulation), SSB (Single Sideband), and CW (Continuous Wave/Morse code). Each has distinct characteristics that make it suitable for different applications.

FM is the most common mode for VHF and UHF voice repeaters. In FM, the frequency of the carrier wave varies with the audio signal while the amplitude stays constant. FM provides excellent audio quality and is resistant to amplitude noise, but it requires more bandwidth than other modes. A typical VHF FM voice signal occupies between 10 and 15 kHz of bandwidth. However, FM has a significant disadvantage: the capture effect means only one signal can be received at a time, with the strongest signal suppressing weaker ones.

SSB (Single Sideband) is a form of amplitude modulation where one sideband and the carrier are suppressed, transmitting only the remaining sideband. This makes SSB very bandwidth-efficient, requiring only about 3 kHz compared to FM's 10-15 kHz. SSB is preferred for long-distance weak signal contacts on VHF and UHF because it can get through when FM cannot. Upper sideband (USB) is the standard for 10 meter HF, VHF, and UHF SSB communications. The tradeoff is that SSB signals require more careful tuning to sound correct.

CW (Continuous Wave) is the transmission of Morse code by turning the carrier on and off. CW has the narrowest bandwidth of any mode, requiring only about 150 Hz. This extremely narrow bandwidth means CW signals can be copied in conditions where voice signals would be unreadable. AM (Amplitude Modulation), while less common for voice, is used for amateur fast-scan TV (ATV) transmissions, which require about 6 MHz of bandwidth for NTSC signals.`,
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
    },
    {
      id: 'T8B',
      title: 'Amateur Satellites and Satellite Operation',
      content: `Amateur radio operators have access to numerous satellites in orbit, providing exciting opportunities for long-distance communication. Most amateur satellites are in LEO (Low Earth Orbit), typically 200-2000 km above Earth. These satellites pass overhead in predictable patterns, with each pass lasting only 10-15 minutes, making timing critical for successful contacts.

Satellite operation requires understanding several key concepts. A satellite beacon is a transmission from the satellite containing status information about its health and operational state. Anyone may receive telemetry from a space station without special authorization. Satellites commonly use multiple modes including SSB, FM, and CW/data. When a satellite operates in "U/V mode," it means the uplink is on the 70-centimeter band (UHF) and the downlink is on the 2-meter band (VHF).

Doppler shift is a critical factor in satellite communications. As the satellite moves toward or away from your station, the observed frequency changes, requiring you to adjust your receiver frequency during a pass. Satellite tracking programs help operators by providing real-time satellite positions, pass predictions (time, azimuth, elevation), and compensated frequencies accounting for Doppler shift. These programs use Keplerian elements as inputs to calculate satellite positions.

Proper uplink power control is essential for satellite operation. Using excessive effective radiated power blocks access by other users sharing the satellite. A good technique to verify your power level is to ensure your downlink signal strength is about the same as the satellite's beacon. Spin fading, caused by rotation of the satellite and its antennas, can cause signal fluctuations during a pass.`,
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
      content: `Amateur radio offers a wide variety of operating activities beyond casual conversations. Contesting involves contacting as many stations as possible during a specified time period. Contests range from short sprints lasting a few hours to major events spanning entire weekends. Good contest procedure means sending only the minimum information needed for proper identification and the required exchange, keeping contacts brief to maximize the number of stations worked.

Radio direction finding, also known as "fox hunting" or transmitter hunting, uses directional antennas to locate hidden transmitters or sources of interference. A directional antenna is essential equipment for these activities. Grid locators are letter-number designators assigned to geographic locations, commonly exchanged during VHF/UHF contests and used to calculate distances between stations.

Internet linking extends amateur radio's reach by connecting radio systems via the internet. Voice Over Internet Protocol (VoIP) delivers voice communications over the internet using digital techniques. The Internet Radio Linking Project (IRLP) connects amateur radio systems like repeaters via VoIP, accessed over the air using DTMF (touch-tone) signals. EchoLink allows amateur stations to transmit through repeaters without using a radio to initiate the transmission, though users must register their call sign and provide proof of license. A gateway is an amateur radio station that connects other stations to the internet, enabling worldwide communications through local repeaters.`,
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
      content: `Digital modes have revolutionized amateur radio, enabling reliable communications under conditions where voice would be impossible. Common digital modes include packet radio, FT8, APRS, PSK, and DMR. These modes use computers or digital signal processors to encode and decode information transmitted over radio.

Packet radio transmits data in discrete packets, each containing a header with the destination call sign, the data payload, a checksum for error detection, and automatic repeat request (ARQ) capability in case of errors. Packet is commonly used for bulletin boards, email forwarding, and the APRS system. APRS (Automatic Packet Reporting System) can transmit GPS position data, text messages, and weather data, providing real-time tactical digital communications displayed on maps showing station locations.

FT8 is a digital mode designed for low signal-to-noise operation, capable of decoding signals far below the noise floor that would be inaudible in other modes. Part of the WSJT-X software suite, FT8 supports various weak signal activities including Earth-Moon-Earth (moonbounce), meteor scatter, and propagation beacons. PSK (Phase Shift Keying) is another popular digital mode that shifts the phase of the carrier to encode data.

DMR (Digital Mobile Radio) is a technique for time-multiplexing two digital voice signals on a single 12.5 kHz repeater channel, effectively doubling channel capacity. DMR uses "talkgroups" that allow groups of users to share a channel at different times without hearing other users. CW, while technically the oldest digital mode, is still considered a digital communications mode since it uses on-off keying to transmit Morse code. Amateur radio mesh networks use commercial Wi-Fi equipment with modified firmware to create high-speed data networks.`,
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

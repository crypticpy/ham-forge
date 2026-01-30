/**
 * T2 - Operating Procedures
 * Learning module for VHF/UHF operating practices including repeaters, simplex, and emergency communications
 */

import type { LearningModule } from '@/types/learning'

export const operatingProceduresModule: LearningModule = {
  id: 'T2',
  examLevel: 'technician',
  title: 'Operating Procedures',
  description:
    'VHF/UHF operating practices including repeaters, simplex, and emergency communications.',
  estimatedMinutes: 35,
  sections: [
    {
      id: 'T2A',
      title: 'Station Operation - Frequencies, Modes, and Calling',
      content: `Understanding basic station operation is essential for effective amateur radio communication. The procedural signal "CQ" means "calling any station" and is used when you want to make contact with anyone who might be listening. Before calling CQ, you should listen to make sure the frequency is clear, ask if the frequency is in use, and verify you are authorized to use that frequency. When responding to a station calling CQ, transmit the other station's call sign followed by your call sign.

Repeaters are a fundamental part of VHF/UHF operation. A repeater offset is the difference between the repeater's transmit and receive frequencies. On the 2-meter band (144-148 MHz), the common repeater offset is plus or minus 600 kHz. On the 70-centimeter band (420-450 MHz), the common offset is plus or minus 5 MHz. The national calling frequency for FM simplex operations on 2 meters is 146.520 MHz, which is an important frequency to memorize.

When calling another station on a repeater, say the station's call sign followed by your own call sign. To indicate you're monitoring a repeater and available for contact, say your call sign followed by the word "monitoring." Simplex operation means transmitting and receiving on the same frequency without using a repeater. Band plans are voluntary guidelines for using different modes or activities within an amateur band, helping operators coordinate their use of the spectrum. Always identify your station when making test transmissions.`,
      keyPoints: [
        'CQ means "calling any station" - listen first, ask if frequency is in use, and verify authorization before calling',
        '2-meter repeater offset is plus or minus 600 kHz; 70-cm offset is plus or minus 5 MHz',
        'National 2-meter FM simplex calling frequency is 146.520 MHz',
        'Simplex means transmitting and receiving on the same frequency',
        'Band plans are voluntary guidelines for organizing mode and activity usage within amateur bands',
      ],
      relatedQuestionIds: [
        'T2A01',
        'T2A02',
        'T2A03',
        'T2A04',
        'T2A05',
        'T2A06',
        'T2A07',
        'T2A08',
        'T2A09',
        'T2A10',
        'T2A11',
        'T2A12',
      ],
    },
    {
      id: 'T2B',
      title: 'VHF/UHF Operating Practices - Repeaters and Simplex',
      content: `Effective VHF/UHF operation requires understanding several technical concepts. The squelch function mutes the receiver audio when no signal is present, eliminating the noise between transmissions. CTCSS (Continuous Tone-Coded Squelch System) uses a sub-audible tone transmitted with your voice audio to open the squelch of a receiver, allowing repeaters to filter out unwanted signals. DTMF (Dual-Tone Multi-Frequency) signaling uses pairs of audio tones and is commonly used for repeater control functions.

If you can hear a repeater's output but cannot access it, several issues could be the cause: improper transceiver offset, wrong CTCSS tone, or wrong DCS (Digital-Coded Squelch) code. Your radio's "reverse" function allows you to listen on a repeater's input frequency, useful for checking if you can hear stations directly. If your FM transmission audio sounds distorted on voice peaks, you are probably talking too loudly into the microphone.

Linked repeater networks connect multiple repeaters so that signals received by one are transmitted by all repeaters in the network, greatly extending communication range. Digital repeaters like DMR systems use color codes that must match for access, similar to CTCSS for analog systems. To join a digital repeater's talkgroup, you program your radio with the group's ID or code. Simplex channels are designated in band plans so stations within range of each other can communicate without tying up a repeater. When two stations interfere with each other on the same frequency, they should negotiate continued use of the frequency. Q signals are useful shorthand: QRM indicates interference from other stations, and QSY indicates you are changing frequency.`,
      keyPoints: [
        'Squelch mutes receiver audio when no signal is present; CTCSS uses sub-audible tones for selective access',
        'Cannot access a repeater you can hear? Check offset, CTCSS tone, or DCS code settings',
        'The "reverse" function lets you listen on a repeater input frequency to check direct signal paths',
        'DMR color codes must match the repeater for access; talkgroups require programming the group ID',
        'QRM means interference from other stations; QSY means changing frequency',
      ],
      relatedQuestionIds: [
        'T2B01',
        'T2B02',
        'T2B03',
        'T2B04',
        'T2B05',
        'T2B06',
        'T2B07',
        'T2B08',
        'T2B09',
        'T2B10',
        'T2B11',
        'T2B12',
        'T2B13',
      ],
    },
    {
      id: 'T2C',
      title: 'Public Service and Emergency Communications',
      content: `Amateur radio plays a vital role in public service and emergency communications. ARES (Amateur Radio Emergency Service) is a group of licensed amateurs who have voluntarily registered their qualifications and equipment for communications duty in the public service. RACES (Radio Amateur Civil Emergency Service) is an FCC Part 97 amateur radio service specifically for civil defense communications during national emergencies. It's important to understand that FCC rules always apply to amateur station operation, even during emergencies or when operating under ARES or RACES.

However, there is one critical exception: amateur station control operators are permitted to operate outside the frequency privileges of their license class in situations involving the immediate safety of human life or protection of property. This emergency provision ensures that getting help is always the priority.

Net operations are organized on-air meetings that facilitate orderly communication. The Net Control Station (NCS) calls the net to order and directs communications between stations checking in. When participating in a net, standard practice is to transmit only when directed by the net control station, unless you are reporting an emergency. The term "traffic" refers to messages exchanged by net stations. Good traffic handling means passing messages exactly as received without making decisions about their worthiness. To ensure unusual words are received correctly, use a standard phonetic alphabet to spell them out. Formal traffic messages include a preamble containing information needed to track the message, and the "check" in a radiogram header indicates the number of words or word equivalents in the text portion.`,
      keyPoints: [
        'ARES is volunteers registered for public service communications; RACES is for civil defense during national emergencies',
        'FCC rules always apply, but operators may exceed license privileges for immediate safety of life or property',
        'Net Control Station directs traffic; transmit only when directed unless reporting an emergency',
        'Good traffic handling means passing messages exactly as received without editing',
        'Use the phonetic alphabet for unusual words; "check" in a radiogram is the word count of the message text',
      ],
      relatedQuestionIds: [
        'T2C01',
        'T2C02',
        'T2C03',
        'T2C04',
        'T2C05',
        'T2C06',
        'T2C07',
        'T2C08',
        'T2C09',
        'T2C10',
        'T2C11',
      ],
    },
  ],
}

/**
 * T1 - Commission's Rules
 * Learning module for FCC rules and regulations governing amateur radio
 */

import type { LearningModule } from '@/types/learning'

export const commissionRulesModule: LearningModule = {
  id: 'T1',
  examLevel: 'technician',
  title: "Commission's Rules",
  description:
    'FCC regulations governing amateur radio operations, including licensing, frequency privileges, station identification, and operating requirements.',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'T1A',
      title: 'Purpose and Permissible Use of Amateur Radio',
      content: `The Amateur Radio Service exists for several important purposes defined by the FCC in Part 97 of the rules. These purposes include advancing the radio art, providing a voluntary pool of trained operators and technicians, expanding the reservoir of trained operators, continuing and extending the amateur's proven ability to contribute to the advancement of the radio art, and encouraging experimentation and technical development.

Amateur radio is a non-commercial service, meaning operators cannot use their stations for direct pecuniary (monetary) interest. However, there are specific exceptions: you may use amateur radio for emergencies, even if it indirectly benefits a business, and you can notify other amateurs of equipment for sale. The key distinction is that amateur radio is about experimentation, emergency communications, and public service—not commercial broadcasting.

The basis and purpose of amateur radio emphasizes self-training, intercommunication, and technical investigation. This means amateur operators should be continually learning and experimenting with radio technology. The service provides communications during emergencies and disasters when other communications infrastructure may fail, which is why ARES (Amateur Radio Emergency Service) and RACES (Radio Amateur Civil Emergency Service) exist.`,
      keyPoints: [
        'Amateur radio is a non-commercial service—no payment for operating',
        'Five purposes: advancing radio art, trained operator pool, experimentation, emergency communications, international goodwill',
        'Emergency communications are always permitted, even if they indirectly benefit a business',
        'Self-training and technical investigation are fundamental to the service',
        'ARES and RACES provide organized emergency communication support',
      ],
      relatedQuestionIds: ['T1A01', 'T1A02', 'T1A03', 'T1A04', 'T1A05'],
    },
    {
      id: 'T1B',
      title: 'Frequency Privileges and Band Plans',
      content: `As a Technician class licensee, you have full privileges on all amateur frequencies above 30 MHz, including the popular 2-meter (144-148 MHz) and 70-centimeter (420-450 MHz) bands. These VHF and UHF bands are excellent for local communications using FM voice, repeaters, and digital modes.

Technicians also have limited privileges on some HF (high frequency) bands. You can operate CW (Morse code) on portions of 80, 40, and 15 meters, and you have CW, RTTY, and data privileges on a portion of 10 meters. When 10 meters is open (during solar cycle peaks), Technicians can also use SSB voice from 28.300 to 28.500 MHz with up to 200 watts PEP.

Band plans are voluntary agreements among operators about how to use different portions of each band. While the FCC authorizes what modes and power levels are legal, band plans help prevent interference by designating areas for different activities. For example, the lower portion of 2 meters (144.00-144.10 MHz) is designated for weak signal work and should not be used for FM operations. Knowing and following band plans makes you a good operator and neighbor on the bands.`,
      keyPoints: [
        'Technicians have full privileges above 30 MHz (VHF/UHF)',
        'Limited HF privileges include CW on 80/40/15m and CW/data/SSB on 10m',
        '2-meter band: 144-148 MHz; 70-centimeter band: 420-450 MHz',
        'Band plans are voluntary but help prevent interference',
        'Maximum Technician power on HF is 200 watts PEP on 10 meters',
      ],
      relatedQuestionIds: ['T1B01', 'T1B02', 'T1B03', 'T1B04', 'T1B05'],
    },
    {
      id: 'T1C',
      title: 'Call Signs and Station Identification',
      content: `Every amateur radio station must have a call sign assigned by the FCC. In the United States, amateur call signs follow a specific format: a one or two letter prefix (indicating the country and sometimes the license class), a number (indicating the geographic region where the license was originally issued), and a one to three letter suffix. For example, W1AW is the ARRL headquarters station in Connecticut.

The FCC assigns call signs systematically, but you can also request a specific call sign through the vanity call sign program. Vanity calls are available to all license classes, though certain call sign formats (like 1x2 calls such as W1AW) are reserved for Extra class licensees. There is a small fee for vanity call signs.

You must identify your station every 10 minutes during a contact and at the end of your last transmission. When identifying, you must use English or phonetics (like "Whiskey One Alpha Whiskey"). If you're operating from a location outside your normal call sign district, you may optionally append the new district number (like W1AW/4 when operating from the fourth district), though this is not required by FCC rules.`,
      keyPoints: [
        'Call sign format: prefix + number + suffix (e.g., W1AW)',
        'Station identification required every 10 minutes and at end of contact',
        'Identification must be in English or standard phonetics',
        'Vanity call signs available for a fee; some formats restricted by license class',
        'The number in a call sign indicates the original geographic district',
      ],
      relatedQuestionIds: ['T1C01', 'T1C02', 'T1C03', 'T1C04', 'T1C05'],
    },
    {
      id: 'T1D',
      title: 'Station Control and Licensing',
      content: `To operate an amateur radio station in the United States, you must hold a valid FCC amateur radio license. The Technician class is the entry-level license and grants privileges on VHF/UHF bands plus limited HF access. General and Amateur Extra classes provide progressively more privileges. All license classes require passing a written examination.

Amateur licenses are valid for 10 years and can be renewed without taking another exam. You can apply for renewal up to two years before expiration and up to two years after expiration (as a grace period, though you cannot operate during the grace period). License renewals are free when done electronically through the FCC's ULS (Universal Licensing System).

Your station license is automatically included with your operator license—you don't need a separate station license. However, club stations require a separate club station license, which must have a trustee who holds at least a General class license. The trustee is responsible for the proper operation of the club station.`,
      keyPoints: [
        'Amateur licenses are valid for 10 years and renewable without retesting',
        'Three license classes: Technician, General, and Amateur Extra',
        'Grace period allows renewal up to 2 years after expiration (but no operating)',
        'Operator and station licenses are combined into one document',
        'Club stations require a trustee with at least a General class license',
      ],
      relatedQuestionIds: ['T1D01', 'T1D02', 'T1D03', 'T1D04', 'T1D05'],
    },
    {
      id: 'T1E',
      title: 'Control Operator Requirements',
      content: `Every amateur station must have a control operator—the licensed amateur responsible for the proper operation of the station. The control operator must ensure all transmissions comply with FCC rules. When you operate your own station, you are automatically the control operator. When someone else operates your station, you may serve as the control operator, but you must be able to turn off the transmitter if needed.

The control operator's license class determines what frequencies and modes can be used. If a General class operator is the control operator at a station, Technician class frequencies cannot be exceeded even if the station license holder is an Amateur Extra. This is important when hosting new hams or visitors at your station.

There are three types of station control: local (control operator at the station), remote (control operator at a different location using a control link), and automatic (station transmits automatically, like a repeater or beacon). Automatic control is only permitted on certain frequencies and for specific purposes defined in Part 97. The control operator is always responsible for the station's transmissions, regardless of the control type used.`,
      keyPoints: [
        'Every transmission requires a control operator responsible for compliance',
        'Control operator license class determines maximum privileges',
        'Three control types: local, remote, and automatic',
        'Automatic control only permitted on specific frequencies/purposes',
        'Control operator responsible even when physically distant from station',
      ],
      relatedQuestionIds: ['T1E01', 'T1E02', 'T1E03', 'T1E04', 'T1E05'],
    },
    {
      id: 'T1F',
      title: 'Station Identification and Third-Party Communications',
      content: `Proper station identification is a fundamental requirement in amateur radio. You must identify your station with your call sign every 10 minutes during a contact and at the end of your final transmission in a series. When operating through a repeater, you identify with your own call sign, not the repeater's call sign. The repeater identifies itself separately through its own identification system.

Third-party communications refers to messages sent on behalf of someone who is not a licensed amateur. This is permitted in the United States, but the control operator is responsible for ensuring all rules are followed. International third-party traffic is only permitted with countries that have third-party agreements with the United States. You cannot allow an unlicensed person to speak on the radio to a station in a country without such an agreement.

There are restrictions on who can be a third party. A person whose amateur license has been revoked cannot participate in amateur communications, even as a third party. Similarly, you cannot transmit messages for hire or for material compensation. However, in emergencies involving immediate safety of life or property, normal restrictions on third-party traffic do not apply—getting help is the priority.`,
      keyPoints: [
        'Identify every 10 minutes and at end of communication',
        'Third-party traffic allowed domestically; internationally only with agreement countries',
        'Control operator responsible for third-party compliance',
        'Persons with revoked licenses cannot participate as third parties',
        'Emergency communications override normal third-party restrictions',
      ],
      relatedQuestionIds: ['T1F01', 'T1F02', 'T1F03', 'T1F04', 'T1F05'],
    },
  ],
}

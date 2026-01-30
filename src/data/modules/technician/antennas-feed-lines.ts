/**
 * T9 - Antennas and Feed Lines
 * Learning module for antenna fundamentals and transmission line concepts
 */

import type { LearningModule } from '@/types/learning'

export const antennasFeedLinesModule: LearningModule = {
  id: 'T9',
  examLevel: 'technician',
  title: 'Antennas and Feed Lines',
  description:
    'Antenna types, characteristics, and radiation patterns, plus feed line types, connectors, and standing wave ratio (SWR) concepts.',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'T9A',
      title: 'Antenna Fundamentals',
      content: `Antennas are the critical interface between your radio and the electromagnetic spectrum. The most fundamental antenna is the dipole, which consists of two quarter-wavelength elements fed at the center. A dipole oriented parallel to the Earth's surface is horizontally polarized, while a vertical antenna produces vertically polarized signals. Polarization matching between transmitting and receiving antennas is important for maximum signal transfer, especially at VHF and UHF frequencies.

A dipole radiates strongest broadside to the antenna (perpendicular to the wire), not off the ends. The length of a dipole determines its resonant frequency—shortening the antenna increases the resonant frequency, while lengthening it decreases the frequency. For a half-wavelength 6-meter dipole, the approximate length is 112 inches. A quarter-wavelength vertical antenna for 146 MHz is approximately 19 inches long.

Beam antennas, such as the Yagi, concentrate signals in one direction rather than radiating equally in all directions. This directional property is called antenna gain—the increase in signal strength in a specified direction compared to a reference antenna. The Yagi offers the greatest gain among common amateur antennas, making it popular for weak-signal work and DXing. A 5/8-wavelength whip antenna for VHF/UHF mobile service has more gain than a 1/4-wavelength antenna because it concentrates radiation at lower angles toward the horizon.

Antenna loading is a technique for electrically lengthening an antenna that is physically too short for its intended frequency. This is accomplished by inserting inductors (coils) in the radiating elements. The short, flexible "rubber duck" antennas supplied with handheld transceivers have low efficiency compared to full-sized quarter-wave antennas due to their heavily loaded design and small size. Using a handheld transceiver with a flexible antenna inside a vehicle further reduces signal strength because the metal body acts as a shield.`,
      keyPoints: [
        'Dipoles radiate strongest broadside to the antenna, not off the ends',
        'Shortening a dipole increases its resonant frequency; lengthening decreases it',
        'Yagi beam antennas offer the greatest gain by concentrating signals in one direction',
        'Antenna gain is the increase in signal strength in a specified direction vs. a reference',
        'Antenna loading uses inductors to electrically lengthen physically short antennas',
      ],
      relatedQuestionIds: [
        'T9A01',
        'T9A02',
        'T9A03',
        'T9A04',
        'T9A05',
        'T9A06',
        'T9A07',
        'T9A08',
        'T9A09',
        'T9A10',
        'T9A11',
        'T9A12',
      ],
    },
    {
      id: 'T9B',
      title: 'Feed Lines and SWR',
      content: `Feed lines carry RF energy between your transceiver and antenna. Coaxial cable is the most common feed line for amateur radio because it is easy to use and requires few special installation considerations. The most common impedance for coaxial cables in amateur radio is 50 ohms, which matches the output impedance of most transceivers and the feedpoint impedance of many antennas.

Standing Wave Ratio (SWR) is a measure of how well the load (antenna) is matched to the transmission line. When the antenna impedance matches the feed line impedance, all power flows to the antenna with minimal reflection. A low SWR (close to 1:1) means reduced signal loss and efficient power transfer. Erratic changes in SWR often indicate a loose connection in the antenna or feed line system. An antenna tuner (also called an antenna coupler) matches the antenna system impedance to the transceiver's output impedance, allowing operation even when the antenna is not perfectly matched.

Feed line loss increases as signal frequency increases. RG-213 cable has less loss than RG-58 at a given frequency, making it better suited for longer runs or higher frequencies. Air-insulated hardline has the lowest loss at VHF and UHF frequencies but is more expensive and difficult to install. Sources of loss in coaxial feed lines include water intrusion into connectors, high SWR, and multiple connectors in the line—all of which should be minimized for best performance.

RF connectors must be appropriate for the frequencies in use. PL-259 (also called UHF connectors, paired with SO-239 chassis connectors) are commonly used at HF and VHF frequencies due to their availability and ease of installation. However, for frequencies above 400 MHz, Type N connectors are more suitable because they maintain consistent impedance and lower loss at higher frequencies. Properly weatherproofing outdoor connections prevents water intrusion, which is a major cause of feed line degradation.`,
      keyPoints: [
        'SWR measures how well the antenna matches the feed line; low SWR means less signal loss',
        'Most amateur coaxial cable is 50 ohms impedance',
        'Feed line loss increases as frequency increases; use lower-loss cable for UHF',
        'PL-259 connectors are common at HF/VHF; Type N connectors are better above 400 MHz',
        'Antenna tuners match impedance between the antenna system and transceiver',
      ],
      relatedQuestionIds: [
        'T9B01',
        'T9B02',
        'T9B03',
        'T9B04',
        'T9B05',
        'T9B06',
        'T9B07',
        'T9B08',
        'T9B09',
        'T9B10',
        'T9B11',
        'T9B12',
      ],
    },
  ],
}

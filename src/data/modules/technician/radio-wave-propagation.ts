/**
 * T3 - Radio Wave Propagation
 * Learning module for understanding how radio waves travel and propagation modes
 */

import type { LearningModule } from '@/types/learning'

export const radioWavePropagationModule: LearningModule = {
  id: 'T3',
  examLevel: 'technician',
  title: 'Radio Wave Propagation',
  description:
    'Understanding how radio waves travel through space and the atmosphere, including VHF/UHF propagation characteristics, radio wave properties, and various propagation modes like ionospheric skip and tropospheric ducting.',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'T3A',
      title: 'Propagation Characteristics',
      content: `Understanding how VHF and UHF signals propagate is essential for effective amateur radio communication. Unlike HF signals, which can bounce off the ionosphere for long-distance contacts, VHF and UHF signals typically travel in straight lines and are limited to line-of-sight distances. However, various atmospheric and environmental factors can significantly affect signal quality and range.

One of the most common phenomena affecting VHF signals is multipath propagation. When a signal travels from transmitter to receiver via multiple paths (direct, reflected off buildings, bounced off terrain), these signals can arrive at slightly different times and phases. When they combine at the receiver, they may either reinforce each other (making the signal stronger) or cancel each other out (causing signal loss). This is why VHF signal strengths can vary dramatically when you move your antenna just a few feet. Mobile operators experience this as "picket fencing"—a rapid flutter in signal strength as the vehicle moves through alternating zones of reinforcement and cancellation.

Environmental factors also play a significant role in VHF and UHF propagation. Vegetation absorbs UHF and microwave signals, reducing range in wooded areas. Rain and precipitation can decrease range at microwave frequencies through absorption. However, fog and rain have little effect on signals in the 10-meter and 6-meter bands. When direct line-of-sight paths are blocked by buildings or terrain, operators can sometimes find alternative paths by reflecting signals off nearby structures—a technique that requires experimentation with directional antennas.

Antenna polarization is another critical consideration for VHF and UHF communications. For long-distance CW and SSB contacts (weak signal work), horizontal polarization is standard because it typically experiences less man-made noise. When antennas at opposite ends of a link use different polarizations, received signal strength is significantly reduced—potentially by 20 dB or more. For FM operations through repeaters, vertical polarization is the norm. The ionosphere can affect polarization as well: signals that travel through the ionosphere become elliptically polarized, meaning either vertically or horizontally polarized antennas can be used effectively for reception.`,
      keyPoints: [
        'VHF/UHF signals are primarily line-of-sight; range limited by horizon',
        'Multipath propagation causes signal variations—moving antenna a few feet can dramatically change signal strength',
        'Picket fencing is rapid flutter on mobile signals caused by multipath',
        'Vegetation absorbs UHF and microwave signals; precipitation affects microwave range',
        'Mismatched antenna polarization reduces signal strength significantly',
      ],
      relatedQuestionIds: [
        'T3A01',
        'T3A02',
        'T3A03',
        'T3A04',
        'T3A05',
        'T3A06',
        'T3A07',
        'T3A08',
        'T3A09',
        'T3A10',
        'T3A11',
        'T3A12',
      ],
    },
    {
      id: 'T3B',
      title: 'Radio Wave Characteristics',
      content: `Radio waves are a form of electromagnetic radiation, consisting of two components: electric and magnetic fields. These fields are perpendicular to each other (at right angles) and both are perpendicular to the direction the wave travels. Understanding these fundamental properties helps operators make better decisions about antennas, frequencies, and operating techniques.

Radio waves travel through free space at the speed of light—approximately 300,000,000 meters per second (or about 186,000 miles per second). This velocity is constant for all radio frequencies in a vacuum, though waves slow slightly when passing through the atmosphere or other media. The relationship between a wave's frequency and wavelength is inverse: as frequency increases, wavelength gets shorter. This relationship is expressed by a simple formula: wavelength in meters equals 300 divided by frequency in megahertz. For example, the 2-meter band has a center frequency around 146 MHz (300/146 = approximately 2 meters).

The polarization of a radio wave is defined by the orientation of its electric field. A vertically polarized wave has its electric field oriented vertically, while a horizontally polarized wave has its electric field oriented horizontally. Circular polarization (both right-hand and left-hand) involves the electric field rotating as the wave propagates, commonly used in satellite communications to overcome polarization changes. Amateur radio bands are often identified by their approximate wavelength in meters—hence names like the 2-meter band (144-148 MHz), 70-centimeter band (420-450 MHz), and 10-meter band (28-29.7 MHz).

Understanding frequency ranges is fundamental to amateur radio. The High Frequency (HF) range spans 3 to 30 MHz and is known for long-distance ionospheric propagation. Very High Frequency (VHF) covers 30 to 300 MHz and includes popular bands like 6 meters and 2 meters. Ultra High Frequency (UHF) spans 300 to 3000 MHz and includes the 70-centimeter band. Generally, lower frequencies have longer wavelengths and better ability to follow the Earth's curvature or reflect from the ionosphere, while higher frequencies provide more bandwidth but typically require line-of-sight paths.`,
      keyPoints: [
        'Radio waves have electric and magnetic fields at right angles to each other',
        'Radio waves travel at the speed of light: 300,000,000 meters per second',
        'Wavelength formula: wavelength (meters) = 300 / frequency (MHz)',
        'Polarization is determined by the orientation of the electric field',
        'Frequency ranges: HF (3-30 MHz), VHF (30-300 MHz), UHF (300-3000 MHz)',
      ],
      relatedQuestionIds: [
        'T3B01',
        'T3B02',
        'T3B03',
        'T3B04',
        'T3B05',
        'T3B06',
        'T3B07',
        'T3B08',
        'T3B09',
        'T3B10',
        'T3B11',
      ],
    },
    {
      id: 'T3C',
      title: 'Propagation Modes',
      content: `While VHF and UHF signals are typically limited to line-of-sight distances, several propagation modes can extend their range dramatically under the right conditions. Understanding these modes helps operators recognize opportunities for long-distance contacts and explains why signals sometimes travel much farther than expected.

The ionosphere—a layer of the atmosphere ionized by solar radiation—is the key to long-distance HF propagation. The ionosphere can refract (bend) HF and VHF radio waves back toward Earth, allowing signals to skip over the horizon. This is why HF communication differs fundamentally from VHF/UHF: long-distance ionospheric propagation is far more common on HF. During periods of high sunspot activity, even 6-meter and 10-meter signals can propagate via the ionosphere's F region, with the best conditions occurring from dawn to shortly after sunset. However, UHF signals are generally not refracted by the ionosphere, which is why simplex UHF signals are rarely heard beyond the radio horizon.

Sporadic E (Es) propagation is one of the most exciting modes for VHF operators. This occurs when patches of intense ionization form in the E layer of the ionosphere, typically during late spring and early summer. Sporadic E can produce strong signals on 10, 6, and 2 meters from stations hundreds or even thousands of miles away. Unlike normal F-layer propagation, sporadic E can occur regardless of the sunspot cycle and often appears suddenly. Meteor scatter is another fascinating mode, where radio signals bounce off the ionized trails left by meteors entering the atmosphere. The 6-meter band is best suited for meteor scatter communication because signals at this frequency reflect well from meteor trails while still having reasonable antenna sizes.

Tropospheric ducting occurs when temperature inversions in the lower atmosphere create a "duct" that can channel VHF and UHF signals over distances of 300 miles or more on a regular basis. This is the most common mode for extended-range VHF/UHF contacts. The radio horizon for VHF and UHF signals is actually more distant than the visual horizon because the atmosphere slightly refracts radio waves. Knife-edge diffraction allows signals to bend around sharp obstacles like mountain ridges or building edges, enabling communication when there's no direct line-of-sight path. Auroral backscatter provides another propagation mode, though signals received via this path are typically distorted with considerable variation in signal strength.`,
      keyPoints: [
        'Ionosphere refracts HF and VHF waves; UHF signals pass through without reflection',
        'Sporadic E produces strong signals on 10, 6, and 2 meters from beyond the horizon',
        'Tropospheric ducting (caused by temperature inversions) enables 300+ mile VHF/UHF contacts',
        '6 meters is the best band for meteor scatter communication',
        'Radio horizon extends beyond visual horizon due to atmospheric refraction',
      ],
      relatedQuestionIds: [
        'T3C01',
        'T3C02',
        'T3C03',
        'T3C04',
        'T3C05',
        'T3C06',
        'T3C07',
        'T3C08',
        'T3C09',
        'T3C10',
        'T3C11',
      ],
    },
  ],
}

/**
 * G9 - Antennas and Feed Lines Module
 * General Class Amateur Radio License
 */

import type { LearningModule } from '@/types/learning'

export const antennasFeedLinesModule: LearningModule = {
  id: 'G9',
  examLevel: 'general',
  title: 'Antennas and Feed Lines',
  description:
    'Understanding antenna types, feed line characteristics, SWR, and practical antenna selection for HF operations.',
  estimatedMinutes: 55,
  sections: [
    {
      id: 'G9A',
      title: 'Feed Lines and SWR',
      content: `# Feed Lines and SWR

Feed lines carry RF energy between your transmitter and antenna. Understanding their characteristics is essential for efficient station operation and minimizing power loss.

## Characteristic Impedance

Every transmission line has a characteristic impedance determined by its physical construction. For parallel conductor lines (like ladder line or window line), the characteristic impedance depends on the **distance between conductor centers** and the **radius of the conductors**. Common values include:

- **Coaxial cable**: 50 ohms (RG-8, RG-213) or 75 ohms (RG-6, RG-11)
- **Window line**: 450 ohms nominal
- **Open wire ladder line**: 300-600 ohms

Feed line loss is typically expressed in **decibels per 100 feet** and increases with frequency. Coaxial cable attenuation increases as frequency goes up, making low-loss cable more important on higher bands.

## Standing Wave Ratio (SWR)

SWR measures the impedance match between your feed line and antenna. When the antenna feed point impedance differs from the characteristic impedance of the feed line, reflected power occurs. This creates standing waves on the line.

- **SWR calculation**: Divide the larger impedance by the smaller. A 50-ohm line connected to a 200-ohm load yields 4:1 SWR. A 50-ohm line to a 10-ohm load yields 5:1 SWR.
- **Preventing standing waves**: Match the antenna feed point impedance to the characteristic impedance of the feed line.
- **High SWR effects**: High SWR increases loss in a lossy transmission line. The higher the inherent line loss, the more additional loss occurs with high SWR.

## SWR Measurement Considerations

An important subtlety: transmission line loss actually **reduces the SWR reading** at the transmitter end. A lossy line with high actual SWR at the antenna may show lower SWR at the shack because the reflected power is attenuated traveling back down the line.

Using a matching network (antenna tuner) at the transmitter presents 1:1 SWR to the transmitter, but the **SWR on the feed line itself remains unchanged**. The tuner only protects your transmitter; it doesn't reduce feed line losses from the mismatch.
`,
      keyPoints: [
        'Characteristic impedance depends on conductor spacing and radius',
        'Window line has approximately 450 ohms impedance',
        'Coaxial cable attenuation increases with frequency',
        'SWR equals the ratio of impedances (larger divided by smaller)',
        'A tuner at the transmitter does not change SWR on the feed line',
      ],
      relatedQuestionIds: [
        'G9A01',
        'G9A02',
        'G9A03',
        'G9A04',
        'G9A05',
        'G9A06',
        'G9A07',
        'G9A08',
        'G9A09',
        'G9A10',
        'G9A11',
      ],
    },
    {
      id: 'G9B',
      title: 'Basic Antenna Types and Radiation Patterns',
      content: `# Basic Antenna Types and Radiation Patterns

Understanding fundamental antenna types and their radiation characteristics helps you choose the right antenna for your operating needs and available space.

## The Half-Wave Dipole

The dipole is the fundamental reference antenna for amateur radio. Key characteristics include:

- **Length formula**: 468/frequency(MHz) = length in feet. A dipole for 14.250 MHz is approximately **33 feet**, while one for 3.550 MHz is about **132 feet**.
- **Radiation pattern**: In free space, a dipole has a **figure-eight pattern at right angles to the antenna** (maximum radiation broadside, nulls off the ends).
- **Feed point impedance**: Approximately 73 ohms at the center in free space, but this **decreases as the antenna is lowered** toward ground. At 1/10 wavelength height, impedance drops significantly.
- **Feed point location**: Moving the feed point from center toward the ends **steadily increases** the impedance.
- **Height effects**: When a horizontal dipole is less than 1/2 wavelength high, the azimuthal pattern at high elevation angles becomes **almost omnidirectional**.

The **Inverted V** is a dipole with a single central support, with the ends sloping downward. This popular configuration requires only one tall support.

## Quarter-Wave Vertical Antennas

Vertical antennas offer omnidirectional coverage and low-angle radiation for DX:

- **Radiation pattern**: **Omnidirectional in azimuth** (equal signal in all horizontal directions)
- **Length**: A 1/4 wave monopole for 28.5 MHz is approximately **8 feet**
- **Ground-plane adjustments**: For an elevated ground-plane vertical, **sloping the radials downward** raises the feed point impedance toward 50 ohms
- **Ground-mounted radials**: Should be placed **on the surface or buried a few inches below ground**

## Polarization Considerations

Horizontal antennas have an advantage of **lower ground losses** compared to verticals. Vertical antennas require an extensive radial system to minimize ground losses, while horizontal dipoles can work well at modest heights without radials.

## Random Wire Antennas

A random-wire antenna connected directly to the transmitter can cause **station equipment to carry significant RF current**. This happens because the antenna system isn't balanced, leading to RF on the equipment chassis. Using a proper matching device and RF choke helps mitigate this issue.
`,
      keyPoints: [
        'Dipole length in feet equals 468 divided by frequency in MHz',
        'Dipole radiation is figure-eight broadside to the wire',
        'Quarter-wave vertical is omnidirectional in azimuth',
        'Sloping radials downward raises vertical antenna feed impedance',
        'Horizontal antennas have lower ground losses than verticals',
      ],
      relatedQuestionIds: [
        'G9B01',
        'G9B02',
        'G9B03',
        'G9B04',
        'G9B05',
        'G9B06',
        'G9B07',
        'G9B08',
        'G9B09',
        'G9B10',
        'G9B11',
        'G9B12',
      ],
    },
    {
      id: 'G9C',
      title: 'Directional Antennas and Yagi Design',
      content: `# Directional Antennas and Yagi Design

Directional antennas concentrate your signal in a specific direction, providing gain over a dipole and reducing interference from unwanted directions.

## Yagi Antenna Fundamentals

The Yagi-Uda antenna is the most popular directional HF antenna. It consists of:

- **Driven element**: Approximately **1/2 wavelength** long, connected to the feed line
- **Reflector**: **Longer than the driven element**, placed behind it
- **Director(s)**: **Shorter than the driven element**, placed in front

The antenna radiates toward the directors. The **main lobe** is the direction of maximum radiated field strength.

## Yagi Performance Parameters

- **Gain**: Increasing boom length and adding directors **increases gain**
- **Front-to-back ratio**: The power radiated in the main lobe **compared to the opposite direction**. Higher is better for reducing interference from behind.
- **Bandwidth**: Using **larger-diameter elements increases bandwidth**
- **Optimization**: Element length, spacing along the boom, number of elements, and boom length can all be adjusted to optimize gain, front-to-back ratio, or SWR bandwidth

## Yagi Gain Specifications

Antenna gain can be expressed in two ways:
- **dBd**: Gain relative to a dipole
- **dBi**: Gain relative to an isotropic (theoretical point source) radiator
- **Conversion**: dBi is always **2.15 dB higher** than dBd for the same antenna

Stacking two Yagis vertically 1/2 wavelength apart provides approximately **3 dB additional gain** over a single Yagi.

## Yagi Matching Techniques

Yagi driven elements typically have lower impedance than 50 ohms, requiring matching:

- **Gamma match**: Uses a capacitor and parallel rod. An advantage is that the driven element **does not need to be insulated from the boom**.
- **Beta match (hairpin match)**: A **shorted transmission line stub at the feed point** that provides inductive reactance to cancel capacitive reactance and transform impedance.

Both methods allow direct connection of 50-ohm coax to the antenna.
`,
      keyPoints: [
        'Yagi driven element is approximately 1/2 wavelength; reflector is longer, directors shorter',
        'Adding directors and boom length increases gain',
        'Front-to-back ratio compares forward to rearward radiation',
        'dBi is 2.15 dB higher than dBd for the same antenna',
        'Gamma match allows the driven element to connect directly to a metal boom',
      ],
      relatedQuestionIds: [
        'G9C01',
        'G9C02',
        'G9C03',
        'G9C04',
        'G9C05',
        'G9C07',
        'G9C08',
        'G9C09',
        'G9C10',
        'G9C11',
        'G9C12',
      ],
    },
    {
      id: 'G9D',
      title: 'Specialized Antennas',
      content: `# Specialized Antennas

Beyond basic dipoles and Yagis, several specialized antenna types address specific operating needs like multiband coverage, mobile operation, and regional communications.

## NVIS Antennas

Near Vertical Incidence Skywave (NVIS) antennas provide reliable short-skip communications (out to 300-400 miles) by radiating signals nearly straight up. For 40-meter daytime NVIS, use a **horizontal dipole placed between 1/10 and 1/4 wavelength above ground**. The low height creates high-angle radiation that reflects from the ionosphere for regional coverage with no skip zone.

## Multiband Antennas

**Trap antennas** use LC (inductor-capacitor) circuits called traps to enable multiband operation. The traps act as electrical switches, isolating portions of the antenna at different frequencies. A disadvantage of multiband antennas is **poor harmonic rejection** - they may radiate on harmonic frequencies since they're designed to work on multiple bands.

**Log-periodic antennas** achieve wide bandwidth through a design where **element length and spacing vary logarithmically along the boom**. They offer consistent gain and SWR across a wide frequency range but have less gain per element than a Yagi.

## Mobile Antennas

The **screwdriver antenna** is a popular HF mobile design that adjusts its resonant frequency by **varying the base loading inductance** using a motor-driven coil. This allows continuous tuning across HF bands without stopping to change resonators.

## End-Fed Antennas

End-fed half-wave antennas have **very high feed point impedance** (thousands of ohms) because they're fed at a voltage maximum. They require impedance transformation to match typical 50-ohm feed lines, usually via a matching unit with a high-ratio transformer.

## Loop Antennas

**Small loops** (less than 1/10 wavelength circumference) have **nulls broadside to the loop** (perpendicular to the plane). This makes them useful for direction finding - rotate the loop until the signal nulls to determine bearing.

The **halo antenna** for VHF/UHF is a horizontally polarized loop that provides **omnidirectional radiation in the plane of the halo**. It's popular for mobile VHF operation where omnidirectional horizontal polarization is desired.

## Receiving Antennas

The **Beverage antenna** is a long wire antenna used for **directional receiving on MF and low HF bands**. It's a traveling-wave antenna that provides excellent directivity and noise rejection but is too inefficient for transmitting.

## Stacking Antennas

Vertically stacking horizontally polarized Yagis **narrows the main lobe in elevation**, concentrating energy at lower angles for improved DX performance. This also provides approximately 3 dB additional gain over a single antenna.
`,
      keyPoints: [
        'NVIS uses low horizontal dipole (1/10 to 1/4 wavelength high) for regional skip',
        'Antenna traps enable multiband operation using LC circuits',
        'Screwdriver mobile antennas vary the base loading inductance',
        'End-fed half-wave antennas have very high feed point impedance',
        'Small loops have nulls broadside (perpendicular) to the loop plane',
      ],
      relatedQuestionIds: [
        'G9D01',
        'G9D02',
        'G9D03',
        'G9D04',
        'G9D05',
        'G9D06',
        'G9D07',
        'G9D08',
        'G9D09',
        'G9D10',
        'G9D11',
        'G9D12',
      ],
    },
  ],
}

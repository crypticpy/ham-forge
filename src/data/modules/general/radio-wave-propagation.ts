/**
 * G3 - Radio Wave Propagation Module
 * General Class Amateur Radio License
 */

import type { LearningModule } from '@/types/learning'

export const radioWavePropagationModule: LearningModule = {
  id: 'G3',
  examLevel: 'general',
  title: 'Radio Wave Propagation',
  description:
    'Understanding HF propagation, solar effects, ionospheric layers, and propagation phenomena essential for successful long-distance amateur radio communications.',
  estimatedMinutes: 55,
  sections: [
    {
      id: 'G3A',
      title: 'Sunspots and Solar Radiation Effects',
      content: `# Sunspots and Solar Radiation Effects

Understanding the relationship between solar activity and HF propagation is fundamental to successful long-distance amateur radio communications. The Sun's behavior directly controls which bands will be open and when.

## The Solar Cycle and Sunspots

The Sun follows an approximately 11-year cycle of activity, measured primarily by sunspot numbers. Higher sunspot numbers generally indicate a greater probability of good propagation at higher frequencies, particularly on 15, 12, and 10 meters. During periods of low solar activity, these higher bands become the least reliable for long-distance communications, while the lower bands (80 and 160 meters) remain more consistent.

The Sun rotates on its axis approximately every 26-28 days. This rotation causes HF propagation conditions to vary periodically as active regions on the Sun's surface rotate in and out of view from Earth. If conditions are good due to a particular sunspot group, expect similar conditions about 27 days later.

## Solar Flux Index and Propagation Indicators

The **Solar Flux Index (SFI)** is a key propagation indicator that measures solar radiation at a wavelength of 10.7 centimeters (2800 MHz). Higher SFI values generally correlate with better HF propagation, especially on the higher frequency bands. Values range from about 65 (solar minimum) to over 300 (solar maximum).

The **20-meter band** is unique in that it usually supports worldwide propagation during daylight hours at any point in the solar cycle. This makes it the most reliable DX band for General class operators.

## Solar Disturbances

Several types of solar events can affect radio propagation:

- **Solar Flares**: Emit intense ultraviolet and X-ray radiation that reaches Earth in about 8 minutes (the speed of light). This radiation causes **Sudden Ionospheric Disturbances (SIDs)** that disrupt signals on lower frequencies more than higher frequencies.

- **Coronal Mass Ejections (CMEs)**: Eject charged particles that take 15 hours to several days to reach Earth. These particles cause **geomagnetic storms** - temporary disturbances in Earth's geomagnetic field that degrade high-latitude HF propagation.

- **Coronal Holes**: Release streams of charged particles that disturb HF communication when they reach Earth.

## Geomagnetic Indices

Two indices help predict propagation conditions:

- **K-index**: Measures the short-term stability of Earth's geomagnetic field (updated every 3 hours). Values range from 0-9, with lower values indicating stable conditions.

- **A-index**: Measures the long-term stability of Earth's geomagnetic field (daily average). Values below 10 indicate good conditions; above 30 indicates disturbed conditions.

While geomagnetic storms generally degrade HF propagation (especially at high latitudes), they can benefit VHF operators by creating auroras that can reflect VHF signals.
`,
      keyPoints: [
        'Higher sunspot numbers indicate better propagation on higher HF bands (10, 12, 15 meters)',
        'Solar flux index measures radiation at 10.7 cm wavelength - higher values mean better HF propagation',
        'Solar flare radiation reaches Earth in 8 minutes; CME particles take 15 hours to several days',
        'K-index measures short-term geomagnetic stability; A-index measures long-term stability',
        '20 meters supports worldwide propagation at any point in the solar cycle',
      ],
      relatedQuestionIds: [
        'G3A01',
        'G3A02',
        'G3A03',
        'G3A04',
        'G3A05',
        'G3A06',
        'G3A07',
        'G3A08',
        'G3A09',
        'G3A10',
        'G3A11',
        'G3A12',
        'G3A13',
        'G3A14',
      ],
    },
    {
      id: 'G3B',
      title: 'Maximum Usable Frequency, LUF, and Absorption',
      content: `# Maximum Usable Frequency, LUF, and Absorption

Understanding the frequency limits for ionospheric propagation is essential for selecting the right band for your intended communication path.

## MUF - Maximum Usable Frequency

The **Maximum Usable Frequency (MUF)** is the highest frequency that will be refracted back to Earth for communications between two specific points. Several factors affect the MUF:

- **Path distance and location**: Longer paths generally have higher MUFs
- **Time of day and season**: MUF rises during the day and peaks in the afternoon
- **Solar radiation and ionospheric disturbances**: More solar activity raises the MUF

Radio waves with frequencies between the MUF and LUF are refracted back to Earth by the ionosphere. Frequencies just below the MUF experience the least attenuation for long-distance skip propagation because they spend less time in the absorbing lower ionospheric layers.

## LUF - Lowest Usable Frequency

The **Lowest Usable Frequency (LUF)** is the lowest frequency that provides usable communication between two specific points. Signals below the LUF are attenuated before reaching the destination - they lose too much energy passing through the ionosphere (particularly the D region) to be useful.

When the LUF exceeds the MUF for a given path, propagation via ordinary skywave communications is not possible over that path. This situation can occur during ionospheric disturbances or at night on higher frequencies.

## Skip Distance and Hop Length

Different ionospheric regions provide different maximum hop distances:

- **F2 region**: Approximately 2,500 miles per hop (the longest, as it is the highest region)
- **E region**: Approximately 1,200 miles per hop

When signals arrive at your location via both short-path and long-path propagation, a slightly delayed echo might be heard as the long-path signal arrives after the short-path signal.

## Seasonal Considerations

The lower HF frequencies (40, 60, 80, and 160 meters) experience high levels of atmospheric noise or static during summer months, particularly from thunderstorm activity. This noise can make these bands less usable despite adequate propagation.

## Determining Current Propagation

A practical way to determine current propagation on a desired band is to use a network of automated receiving stations on the internet (such as the Reverse Beacon Network or PSKReporter) to see where your transmissions are being received.
`,
      keyPoints: [
        'MUF is the highest frequency refracted back to Earth between two specific points',
        'LUF is the lowest usable frequency - signals below it are absorbed before arriving',
        'Best propagation occurs just below the MUF with least signal attenuation',
        'F2 region provides approximately 2,500 miles per hop; E region provides approximately 1,200 miles',
        'When LUF exceeds MUF, skywave propagation is not possible on that path',
      ],
      relatedQuestionIds: [
        'G3B01',
        'G3B02',
        'G3B03',
        'G3B04',
        'G3B05',
        'G3B06',
        'G3B07',
        'G3B08',
        'G3B09',
        'G3B10',
        'G3B11',
        'G3B12',
      ],
    },
    {
      id: 'G3C',
      title: 'Ionospheric Layers, Skip, and Scatter',
      content: `# Ionospheric Layers, Skip, and Scatter

The ionosphere is the key to HF propagation. Understanding its layers and behavior helps you predict when and how signals will travel.

## Ionospheric Regions

The ionosphere consists of several distinct regions, listed from lowest to highest altitude:

- **D region** (closest to Earth, ~30-55 miles): Present only during daylight hours. This region is the most absorbent of signals below 10 MHz during daylight hours. It does not refract signals back to Earth but instead absorbs them, particularly affecting the lower HF bands.

- **E region** (~55-90 miles): Can provide propagation with approximately 1,200 miles per hop. Sporadic E (Es) can provide unexpected propagation on VHF bands.

- **F1 region** (~90-150 miles): Present during the day, merges with F2 at night.

- **F2 region** (highest, ~150-250 miles): The most important region for long-distance HF communication. Skip propagation via the F2 region is longer than other regions because it is the highest. Provides approximately 2,500 miles per hop.

## Why Lower Bands Are Difficult During the Day

Long-distance communication on the 40, 60, 80, and 160-meter bands is more difficult during the day because the D region absorbs signals at these frequencies during daylight hours. At night, the D region disappears, and these bands can provide excellent long-distance propagation.

## Critical Frequency and Critical Angle

The **critical frequency** at a given incidence angle is the highest frequency which is refracted back to Earth. The **critical angle** is the highest takeoff angle that will return a radio wave to Earth under specific ionospheric conditions. Signals at angles higher than the critical angle will pass through the ionosphere into space.

## Near Vertical Incidence Skywave (NVIS)

**NVIS propagation** is short distance MF or HF propagation at high elevation angles. It is useful for regional communications (within a few hundred miles) and is commonly used for emergency communications. NVIS works best on lower frequencies (40, 60, and 80 meters) where signals can be refracted back at steep angles.

## HF Scatter Propagation

**Scatter propagation** allows signals to be heard in the transmitting station's skip zone - the area between the end of ground wave coverage and where the first sky wave returns to Earth.

Characteristics of HF scatter signals:

- Signals have a **fluttering sound**
- Signals sound distorted because energy is scattered into the skip zone through several different paths
- Signals are usually weak because only a small part of the signal energy is scattered into the skip zone

Scatter can provide communications when normal skip would leave a gap in coverage, but signal quality is reduced compared to direct ionospheric reflection.
`,
      keyPoints: [
        'D region (lowest) absorbs signals below 10 MHz during daylight - disappears at night',
        'F2 region (highest) is most important for long-distance HF propagation - 2,500 miles per hop',
        'Critical frequency is the highest frequency refracted back; critical angle is the highest returning takeoff angle',
        'NVIS provides regional coverage at high elevation angles on lower HF bands',
        'Scatter signals sound fluttery and weak but can fill the skip zone',
      ],
      relatedQuestionIds: [
        'G3C01',
        'G3C02',
        'G3C03',
        'G3C04',
        'G3C05',
        'G3C06',
        'G3C07',
        'G3C08',
        'G3C09',
        'G3C10',
        'G3C11',
      ],
    },
  ],
}

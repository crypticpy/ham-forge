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
      content: `# VHF/UHF Propagation Characteristics

Understanding how VHF and UHF signals propagate is essential for effective amateur radio communication.

:::info Key Concept
Unlike HF signals that bounce off the ionosphere for long-distance contacts, **VHF and UHF signals typically travel in straight lines** and are limited to line-of-sight distances.
:::

---

## Multipath Propagation

When a signal travels from transmitter to receiver via multiple paths, the signals can arrive at different times and phases.

| Path Type | Description |
|-----------|-------------|
| **Direct** | Straight line from transmitter to receiver |
| **Reflected** | Bounced off buildings or structures |
| **Ground Bounce** | Reflected from terrain or ground |

### Signal Combination Effects

- **Reinforcement**: Signals arrive in phase, making the signal stronger
- **Cancellation**: Signals arrive out of phase, causing signal loss

:::tip Practical Tip
Moving your antenna just a few feet can dramatically change signal strength due to multipath effects.
:::

---

## Picket Fencing Effect

:::definition Picket Fencing
A rapid flutter in signal strength experienced by mobile operators as the vehicle moves through alternating zones of signal reinforcement and cancellation caused by multipath propagation.
:::

---

## Environmental Factors

| Factor | Effect on Signals |
|--------|-------------------|
| **Vegetation** | Absorbs UHF and microwave signals, reducing range in wooded areas |
| **Rain/Precipitation** | Decreases range at microwave frequencies through absorption |
| **Fog** | Little effect on 10-meter and 6-meter bands |
| **Buildings/Terrain** | Block direct paths; may allow reflection paths |

:::warning Important
When direct line-of-sight paths are blocked, try reflecting signals off nearby structures using directional antennas.
:::

---

## Antenna Polarization

Polarization matching between transmit and receive antennas is critical for VHF/UHF communications.

| Application | Standard Polarization | Reason |
|-------------|----------------------|--------|
| **Weak Signal (CW/SSB)** | Horizontal | Less man-made noise |
| **FM Repeaters** | Vertical | Mobile convenience |
| **Satellite** | Circular | Overcomes ionospheric effects |

:::radio Polarization Mismatch
When antennas at opposite ends use different polarizations, received signal strength can be reduced by **20 dB or more**.
:::

### Ionospheric Polarization Effects

Signals traveling through the ionosphere become **elliptically polarized**, meaning either vertically or horizontally polarized antennas can be used effectively for reception.`,
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
      content: `# Radio Wave Characteristics

Radio waves are a form of electromagnetic radiation with unique properties that every amateur radio operator should understand.

---

## Electromagnetic Wave Structure

:::definition Electromagnetic Waves
Radio waves consist of two perpendicular components: **electric** and **magnetic** fields. Both fields are also perpendicular to the direction of wave travel.
:::

| Component | Orientation |
|-----------|-------------|
| Electric Field | Perpendicular to magnetic field |
| Magnetic Field | Perpendicular to electric field |
| Wave Direction | Perpendicular to both fields |

---

## Speed of Radio Waves

:::info Speed of Light
Radio waves travel through free space at the **speed of light**:
- **300,000,000 meters per second**
- Approximately 186,000 miles per second
:::

This velocity is constant for all radio frequencies in a vacuum, though waves slow slightly when passing through the atmosphere.

---

## Wavelength and Frequency Relationship

The relationship between frequency and wavelength is **inverse**: as frequency increases, wavelength gets shorter.

:::tip Formula to Remember
**Wavelength (meters) = 300 ÷ Frequency (MHz)**
:::

### Common Amateur Band Examples

| Band Name | Frequency Range | Approximate Wavelength |
|-----------|----------------|----------------------|
| 10 meters | 28-29.7 MHz | ~10 meters |
| 6 meters | 50-54 MHz | ~6 meters |
| 2 meters | 144-148 MHz | ~2 meters |
| 70 cm | 420-450 MHz | ~70 centimeters |

---

## Wave Polarization

:::definition Polarization
The polarization of a radio wave is defined by the **orientation of its electric field**.
:::

| Polarization Type | Electric Field Orientation | Common Use |
|-------------------|---------------------------|------------|
| **Vertical** | Up and down | FM mobile/portable |
| **Horizontal** | Side to side | Weak signal work |
| **Circular (RHCP/LHCP)** | Rotating as wave propagates | Satellite communications |

---

## Frequency Range Classifications

| Range | Abbreviation | Frequency Span | Characteristics |
|-------|--------------|----------------|-----------------|
| **High Frequency** | HF | 3-30 MHz | Long-distance ionospheric propagation |
| **Very High Frequency** | VHF | 30-300 MHz | Line-of-sight, includes 6m and 2m bands |
| **Ultra High Frequency** | UHF | 300-3000 MHz | Line-of-sight, includes 70cm band |

:::radio General Rule
- **Lower frequencies** = longer wavelengths, better at following Earth's curvature or reflecting from ionosphere
- **Higher frequencies** = more bandwidth available, typically require line-of-sight paths
:::`,
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
      interactiveComponents: ['frequency-wavelength-converter'],
    },
    {
      id: 'T3C',
      title: 'Propagation Modes',
      content: `# Propagation Modes

While VHF and UHF signals are typically limited to line-of-sight distances, several propagation modes can extend their range dramatically under the right conditions.

---

## Ionospheric Propagation

:::definition The Ionosphere
A layer of the atmosphere ionized by solar radiation that can refract (bend) radio waves back toward Earth, allowing signals to skip over the horizon.
:::

### HF vs VHF/UHF Ionospheric Behavior

| Frequency Range | Ionospheric Effect |
|-----------------|-------------------|
| **HF (3-30 MHz)** | Regular long-distance propagation via ionosphere |
| **VHF (6m, 10m)** | Possible during high sunspot activity |
| **UHF** | Generally passes through without reflection |

:::info Best Conditions
F-region ionospheric propagation on 6m and 10m works best from **dawn to shortly after sunset** during periods of high sunspot activity.
:::

:::warning UHF Limitation
Simplex UHF signals are rarely heard beyond the radio horizon because UHF waves are generally not refracted by the ionosphere.
:::

---

## Sporadic E Propagation

:::radio Sporadic E (Es)
One of the most exciting VHF propagation modes! Patches of intense ionization form in the E layer, typically during **late spring and early summer**.
:::

### Sporadic E Characteristics

- Produces strong signals on **10, 6, and 2 meters**
- Signals can travel hundreds or thousands of miles
- Can occur regardless of sunspot cycle
- Often appears suddenly and unpredictably

---

## Meteor Scatter

:::definition Meteor Scatter
Radio signals bounce off the **ionized trails** left by meteors entering the atmosphere, enabling brief communication windows.
:::

| Aspect | Details |
|--------|---------|
| **Best Band** | 6 meters |
| **Why 6m?** | Signals reflect well from meteor trails while maintaining reasonable antenna sizes |
| **Contact Duration** | Brief bursts (seconds to minutes) |

---

## Tropospheric Ducting

:::tip Most Common Extended-Range Mode
Tropospheric ducting is the most common mode for extended-range VHF/UHF contacts.
:::

### How It Works

Temperature inversions in the lower atmosphere create a "duct" that channels VHF and UHF signals.

| Feature | Value |
|---------|-------|
| **Typical Range** | 300+ miles on a regular basis |
| **Cause** | Temperature inversions |
| **Affected Bands** | VHF and UHF |

---

## Radio Horizon vs Visual Horizon

:::info Extended Radio Horizon
The radio horizon for VHF and UHF signals extends **beyond the visual horizon** because the atmosphere slightly refracts radio waves.
:::

---

## Other Propagation Modes

### Knife-Edge Diffraction

Allows signals to bend around sharp obstacles like:
- Mountain ridges
- Building edges

This enables communication when there's no direct line-of-sight path.

### Auroral Backscatter

| Characteristic | Description |
|----------------|-------------|
| **Signal Quality** | Typically distorted |
| **Signal Strength** | Considerable variation |
| **When It Occurs** | During auroral events |

---

## Propagation Mode Summary

| Mode | Best Bands | Typical Distance | Predictability |
|------|-----------|------------------|----------------|
| **Line-of-Sight** | VHF/UHF | To horizon | Very reliable |
| **Tropospheric Ducting** | VHF/UHF | 300+ miles | Moderate |
| **Sporadic E** | 10m, 6m, 2m | 500-1500 miles | Unpredictable |
| **Meteor Scatter** | 6m | 500-1400 miles | Predictable during showers |
| **Ionospheric (F-layer)** | 10m, 6m | Worldwide | Solar cycle dependent |
| **Auroral** | VHF | Variable | During auroral events |`,
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
      interactiveComponents: ['ionosphere-visualizer'],
    },
  ],
}

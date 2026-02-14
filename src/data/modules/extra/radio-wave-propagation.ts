/**
 * E3 - Radio Wave Propagation Module
 * Amateur Extra Class License (Element 4)
 */

import type { LearningModule } from '@/types/learning'

export const radioWavePropagationModule: LearningModule = {
  id: 'E3',
  examLevel: 'extra',
  title: 'Radio Wave Propagation',
  description:
    'Advanced propagation concepts: EME, meteor scatter, auroral and transequatorial propagation, sporadic-E and chordal hop, plus space weather indices and prediction tools.',
  estimatedMinutes: 60,
  sections: [
    {
      id: 'E3A',
      title: 'EME, Meteor Scatter, Tropospheric Ducts, and Aurora',
      content: `# EME, Meteor Scatter, Tropospheric Ducts, and Aurora (E3A)

Extra propagation questions often connect **where** a signal travels (ionosphere/troposphere/space) with **which band/mode** is most effective.

## Electromagnetic Wave Fundamentals

An electromagnetic (EM) wave has two fields:

- Electric field (**E**)
- Magnetic field (**H**)

Key relationships:

- The E and H fields are oriented at **right angles** to each other.
- The wave travels in a direction that is **at right angles** to both fields.

:::definition Circular polarization
Circularly polarized waves are waves with **rotating electric and magnetic fields**.
:::

## Earth–Moon–Earth (EME)

EME (moonbounce) communication is a weak-signal technique that uses the Moon as a reflector.

The pool emphasizes:

- Maximum separation (surface distance) between two EME stations is about **12,000 miles** if the Moon is “visible” to both.
- **Libration fading** is a **fluttery, irregular** fading caused by motion/geometry changes.
- Least path loss often occurs when the Moon is at **perigee** (closest approach).

## Meteor Scatter

When a meteor enters the atmosphere, it leaves a short-lived ionized trail:

- The ionized region forms in the **E region** of the ionosphere.
- Meteor scatter works well in roughly **28 MHz to 148 MHz**.

## Tropospheric Ducting

Tropo ducts can guide microwave signals beyond the normal radio horizon.

The pool highlights:

- Ducts often form over **large bodies of water**.
- Typical duct ranges are on the order of **100 to 300 miles**.

## Aurora

Auroral propagation is associated with:

- **Severe geomagnetic storms**

And the mode the pool expects you to associate with aurora:

- **CW** is best suited for auroral propagation (tone shifts and flutter can make voice difficult).

## MUF Changes and Band Switching

When the MUF on a path decreases due to darkness:

- Continue the contact by switching to a **lower-frequency HF band**.`,
      keyPoints: [
        'EM waves travel perpendicular to the E and H fields; the fields are perpendicular to each other',
        'EME maximum separation is ~12,000 miles when the Moon is visible to both; libration fading is fluttery and irregular; perigee reduces path loss',
        'Meteor scatter uses ionized trails in the E region and is most suited to ~28–148 MHz',
        'Tropospheric ducts often form over large bodies of water and can extend microwave range ~100–300 miles',
        'Auroral propagation is associated with severe geomagnetic storms; CW is the best emission mode',
        'When MUF drops after dark, move to a lower HF band to maintain the path',
      ],
      relatedQuestionIds: [
        'E3A01',
        'E3A02',
        'E3A03',
        'E3A04',
        'E3A05',
        'E3A06',
        'E3A07',
        'E3A08',
        'E3A09',
        'E3A10',
        'E3A11',
        'E3A12',
        'E3A13',
        'E3A14',
      ],
    },
    {
      id: 'E3B',
      title: 'Ionospheric and Ground-Wave Propagation: TEP, Sporadic-E, and Chordal Hop',
      content: `# Ionospheric and Ground-Wave Propagation: TEP, Sporadic-E, and Chordal Hop (E3B)

This group focuses on a set of named propagation modes and how frequency, time of day, and geometry affect range.

## Transequatorial Propagation (TEP)

TEP is a VHF propagation mode most likely to occur:

- Between points separated by roughly **2,000–3,000 miles**
- Over a path **perpendicular** to the geomagnetic equator
- Most often in the **afternoon or early evening**

The approximate maximum range for TEP is about **5,000 miles**.

## “Ordinary” and “Extraordinary” Waves

In the ionosphere, signals can split into two independently propagating components:

- **Ordinary** and **extraordinary** waves are independently propagating, elliptically polarized waves created in the ionosphere.

## 160 Meters: Darkness Helps

Long-distance propagation on 160 meters is most likely on:

- A path entirely in **darkness**

## Long-Path HF Propagation

Long-path propagation is most frequent on:

- **40 meters and 20 meters**

## Takeoff Angle and Skip Distance

Lowering the transmitted elevation angle generally:

- Increases the distance covered by each ionospheric “hop”

## Ground-Wave Fundamentals

Ground-wave range changes with frequency:

- As frequency increases, maximum ground-wave range generally **decreases**.

Ground-wave polarization:

- Ground-wave propagation supports **vertical polarization**.

## Sporadic-E (Es)

Sporadic-E is most likely:

- Around the **solstices**, especially the **summer solstice**
- Between **sunrise and sunset** (daytime)

## Chordal-Hop Propagation

:::definition Chordal hop
**Chordal-hop** propagation is successive ionospheric refractions **without** intermediate reflection from the ground.
:::

Because the Earth is not used as a reflector between hops:

- The signal experiences **less loss** compared to multi-hop paths that reflect from the ground.`,
      keyPoints: [
        'TEP occurs for ~2,000–3,000 mile paths perpendicular to the geomagnetic equator, often afternoon/early evening; max range ~5,000 miles',
        'Ordinary and extraordinary waves are independently propagating elliptically polarized waves created in the ionosphere',
        'Long-distance 160 m propagation favors paths entirely in darkness; long-path is most frequent on 40 m and 20 m',
        'Lower takeoff angle increases hop distance; ground-wave range decreases with higher frequency and is vertically polarized',
        'Sporadic-E is common near solstices (especially summer) and is most likely during daylight',
        'Chordal-hop propagation avoids ground reflections, reducing loss compared to multi-hop ground-reflected paths',
      ],
      relatedQuestionIds: [
        'E3B01',
        'E3B02',
        'E3B03',
        'E3B04',
        'E3B05',
        'E3B06',
        'E3B07',
        'E3B08',
        'E3B09',
        'E3B10',
        'E3B11',
        'E3B12',
        'E3B13',
      ],
    },
    {
      id: 'E3C',
      title: 'Space Weather Indices and Prediction Tools',
      content: `# Space Weather Indices and Prediction Tools (E3C)

Extra operators are expected to recognize common space-weather indices and what they imply about HF/VHF conditions.

## Radio Blackouts and Noise Events

- Short-term radio blackouts are commonly caused by **solar flares**.
- A sudden rise in radio background noise across a large part of HF indicates a **coronal mass ejection impact** or a **solar flare** has occurred.

## Geomagnetic Indices (A and K)

:::definition A-index and K-index
The **A-index** and **K-index** quantify disturbance of the Earth’s geomagnetic field.
:::

- Rising A-index or K-index indicates **increasing geomagnetic disturbance**.
- When A/K is elevated, paths that pass through the **auroral oval** are most likely to experience high absorption.

## Bz (IMF Orientation)

The “Bz” value represents:

- The **north–south** component of the interplanetary magnetic field

Orientation matters:

- A **southward** Bz increases the likelihood that solar particles will couple into the magnetosphere and cause disturbed conditions.

## Solar Flare Classification and Storm Scales

- The greatest solar flare intensity is **Class X**.
- An extreme geomagnetic storm is designated **G5**.

## Modeling and Reporting Tools

Amateur propagation reporting networks commonly report:

- **Digital-mode and CW** signals (because they are easy to detect/measure automatically)

Software modeling:

- **VOACAP** models **HF propagation**.

The pool also references a UV parameter:

- The **304Å (304 angstrom)** solar parameter measures UV emissions correlated to the solar flux index.

## Radio Horizon

On VHF/UHF, the radio horizon is typically:

- About **15% farther** than the geographic (optical) horizon.`,
      keyPoints: [
        'Solar flares can cause short-term radio blackouts; sudden HF-wide noise rises can indicate flares or CME impacts',
        'Rising A/K indices indicate increasing geomagnetic disturbance; absorption is high through the auroral oval when disturbed',
        'Bz is the north–south IMF component; southward Bz increases likelihood of disturbed conditions',
        'Solar flare class X is strongest; an extreme geomagnetic storm is G5',
        'Propagation networks commonly report digital/CW signals; VOACAP models HF propagation',
        'VHF/UHF radio horizon is about 15% farther than the geographic horizon',
      ],
      relatedQuestionIds: [
        'E3C01',
        'E3C02',
        'E3C03',
        'E3C04',
        'E3C05',
        'E3C06',
        'E3C07',
        'E3C08',
        'E3C09',
        'E3C10',
        'E3C11',
        'E3C12',
      ],
    },
  ],
}


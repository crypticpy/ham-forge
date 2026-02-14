/**
 * E9 - Antennas and Feed Lines Module
 * Amateur Extra Class License (Element 4)
 */

import type { LearningModule } from '@/types/learning'

export const antennasFeedLinesModule: LearningModule = {
  id: 'E9',
  examLevel: 'extra',
  title: 'Antennas and Feed Lines',
  description:
    'Advanced antenna and transmission line topics: gain/ERP/EIRP, radiation patterns and modeling, arrays and wire antennas, Yagis and loading, matching/phasing networks, transmission line behavior, Smith charts, and receiving/DF antennas.',
  estimatedMinutes: 95,
  sections: [
    {
      id: 'E9A',
      title: 'Antenna Gain, ERP/EIRP, Efficiency, and Fresnel Zones',
      content: `# Antenna Gain, ERP/EIRP, Efficiency, and Fresnel Zones (E9A)

This group focuses on gain references (dBi vs dBd), how to compute ERP/EIRP with gains/losses, and practical factors affecting antenna efficiency and feed point impedance.

## Isotropic Radiator and Gain References

:::definition Isotropic radiator
An isotropic radiator is a hypothetical, lossless antenna that radiates equally in all directions. It is used as a reference for antenna gain in **dBi**.
:::

Gain references:

- **dBi**: gain relative to isotropic
- **dBd**: gain relative to a half-wave dipole

Conversion:

- dBd = dBi − **2.15 dB**

## ERP and EIRP

:::definition Effective radiated power (ERP)
ERP accounts for transmitter output power plus all gains and losses (feed line, duplexer, circulator, antenna gain), typically referenced to a dipole (dBd).
:::

EIRP is the same idea referenced to isotropic (dBi).

### dB arithmetic for power

- Add antenna gains (dB)
- Subtract line/duplexer/circulator losses (dB)
- Convert net dB to a power multiplier with 10^(dB/10) if needed

## Feed Point Impedance Factors

One factor that affects feed point impedance emphasized by the pool:

- Antenna **height** above ground

## Ground Gain

:::definition Ground gain
“Ground gain” is an increase in signal strength due to ground reflections in the antenna’s environment.
:::

## Fresnel Zone

The first Fresnel zone shrinks as frequency increases. The pool highlights that:

- Higher microwave bands (e.g., **5.8 GHz**) have the smallest first Fresnel zone.

## Antenna Efficiency and Ground Loss

:::definition Antenna efficiency
Antenna efficiency = radiation resistance ÷ total resistance (radiation + loss).
:::

Improving HF vertical efficiency:

- Install a **ground radial system** for a ground-mounted quarter-wave vertical.

Ground losses are strongly influenced by:

- **Soil conductivity**.`,
      keyPoints: [
        'Isotropic radiator is the reference for dBi; dBd is referenced to a half-wave dipole and differs by 2.15 dB',
        'ERP/EIRP calculations add gains and subtract losses in dB; net dB can be converted to a linear power factor',
        'Antenna height affects feed point impedance; ground gain comes from ground reflections',
        'Higher frequencies have smaller Fresnel zones (e.g., 5.8 GHz has a very small first Fresnel zone)',
        'Efficiency = radiation resistance / total resistance; radials and good soil conductivity reduce ground loss for HF verticals',
      ],
      relatedQuestionIds: [
        'E9A01',
        'E9A02',
        'E9A03',
        'E9A04',
        'E9A05',
        'E9A06',
        'E9A07',
        'E9A08',
        'E9A09',
        'E9A10',
        'E9A11',
        'E9A12',
      ],
    },
    {
      id: 'E9B',
      title: 'Radiation Patterns and Modeling (Figures E9-1 and E9-2)',
      content: `# Radiation Patterns and Modeling (E9B)

This group is about interpreting radiation patterns and understanding basic antenna modeling concepts.

## Pattern Vocabulary

Common metrics:

- **3 dB beamwidth**: the angular width between points 3 dB down from peak
- **Front-to-back ratio**: forward gain vs directly behind
- **Front-to-side ratio**: forward gain vs sidelobes to the side

The pool uses Figures **E9-1** and **E9-2** to test pattern interpretation, including:

- Beamwidth and front/back/side ratios (E9-1)
- Elevation pattern and peak elevation angle (E9-2)

## Gain Does Not Create Power

A key conceptual trap:

- A lossless antenna with gain does not radiate more total power than an isotropic radiator driven by the same input power.
- Gain “redistributes” power into some directions at the expense of others.

## Far Field

:::definition Far field
The far field is the region where the shape of the radiation pattern no longer varies with distance.
:::

## Modeling: Method of Moments (MoM)

The pool calls out **Method of Moments** as common for antenna modeling.

MoM principle:

- A wire is modeled as a series of segments, each having a uniform current value.

Segmentation guideline emphasized:

- If you reduce segmentation below ~10 segments per half-wavelength, computed feed point impedance may be incorrect.`,
      keyPoints: [
        'Beamwidth is defined at −3 dB points; front-to-back and front-to-side ratios compare forward gain to rear/side levels',
        'Figures E9-1/E9-2 test azimuth/elevation pattern interpretation and peak angles',
        'Antenna gain does not create power; it redistributes radiated power directionally',
        'Far field is where pattern shape no longer changes with distance',
        'Method of Moments models wires as current-carrying segments; too few segments can produce incorrect impedance',
      ],
      relatedQuestionIds: [
        'E9B01',
        'E9B02',
        'E9B03',
        'E9B04',
        'E9B05',
        'E9B06',
        'E9B07',
        'E9B08',
        'E9B09',
        'E9B10',
        'E9B11',
      ],
    },
    {
      id: 'E9C',
      title: 'Arrays and Wire Antennas: Phasing, Longwires, OCFD, Folded Dipoles, and Takeoff Angle',
      content: `# Arrays and Wire Antennas (E9C)

This group covers how spacing and phase create array patterns, and several classic wire antennas used on HF.

## Two-Element Vertical Arrays (Pattern by Phase and Spacing)

Two 1/4-wave verticals spaced 1/2 wavelength apart:

- Fed **in phase** → figure-eight **broadside** to the array axis
- Fed **180° out of phase** → figure-eight **along** the array axis

Two 1/4-wave verticals spaced 1/4 wavelength apart and fed 90° out of phase:

- Produces a **cardioid** pattern

## Long Wire / Rhombic Behavior

As an unterminated longwire is lengthened:

- Additional lobes form, with major lobes increasingly aligned with the antenna axis

Adding a terminating resistor to a rhombic or longwire:

- Changes the pattern from **bidirectional** to **unidirectional** by absorbing reverse-direction energy

## Off-Center-Fed Dipoles (OCFD)

Feeding an OCFD between center and one end can:

- Create a similar feed point impedance on multiple bands

## Folded Dipoles and Classic Wire Antennas

Folded dipole:

- A half-wave dipole with an additional parallel wire connecting the two ends

Approximate feed point impedance (two-wire folded dipole):

- About **300 Ω**

G5RV:

- Center-fed wire antenna using a specific length of open-wire line connected to a balun and coax feed line

Zepp:

- End-fed half-wave dipole

Extended double Zepp:

- Center-fed **1.25-wavelength** dipole

## Environment Effects on Takeoff Angle

Verticals over seawater:

- Increased radiation at low angles compared to soil (better “DX” angles)

Horizontal antennas with increasing height:

- Lowest-elevation lobe takeoff angle decreases as height increases

Horizontals over a long slope:

- Main lobe takeoff angle decreases in the downhill direction.`,
      keyPoints: [
        'Vertical array patterns depend on spacing and phase: 1/2λ in-phase is broadside figure-eight; 1/2λ out-of-phase is end-fire figure-eight; 1/4λ with 90° phase can be cardioid',
        'Longwires develop more lobes as length increases; termination resistors make longwire/rhombic patterns unidirectional',
        'OCFD feed points can yield more usable multi-band impedances; folded dipoles are ~300 Ω and are a dipole with a parallel wire looped at the ends',
        'G5RV uses open-wire section to a balun/coax; Zepp is end-fed half-wave; extended double Zepp is ~1.25λ center-fed',
        'Seawater improves low-angle radiation for verticals; increasing horizontal height lowers takeoff angle; slopes can skew takeoff angles downhill',
      ],
      relatedQuestionIds: [
        'E9C01',
        'E9C02',
        'E9C03',
        'E9C04',
        'E9C05',
        'E9C06',
        'E9C07',
        'E9C08',
        'E9C09',
        'E9C10',
        'E9C11',
        'E9C12',
        'E9C13',
        'E9C14',
      ],
    },
    {
      id: 'E9D',
      title: 'Directional Antennas: Yagis, Loading, Q/Bandwidth, and Circular Polarization',
      content: `# Directional Antennas: Yagis, Loading, Q/Bandwidth, and Circular Polarization (E9D)

This group covers why Yagi elements are sized as they are, how loading affects bandwidth, and how frequency impacts parabolic gain.

## Parabolic Reflector Gain vs Frequency

For an ideal parabolic reflector:

- Doubling operating frequency increases gain by **6 dB** (same physical dish, narrower beamwidth).

## Creating Circular Polarization with Yagis

Two linearly polarized Yagis can be used to produce circular polarization by:

- Mounting them on the same axis, perpendicular to each other, with driven elements aligned on the boom, fed **90° out of phase**

## Yagi Element Length and Phase Control

Driven element length:

- Approximately **1/2 wavelength**

Parasitic elements are made longer/shorter than resonance to:

- Control **phase shift**, which shapes the pattern and impedance.

Two-element Yagis often use a reflector rather than a director because:

- It yields higher gain with normal spacing.

## Electrically Short Antennas and Loading

Loading coils resonate electrically short antennas by:

- Cancelling capacitive reactance

Best placement for a loading coil on a short whip:

- Near the **center** of the radiator

Coil efficiency matters:

- A high reactance-to-resistance ratio maximizes radiation efficiency.

Top loading advantage (HF short vertical):

- Improved radiation efficiency

### Bandwidth and Q

As antenna Q increases:

- SWR bandwidth **decreases**

Using loading coils also generally:

- Decreases SWR bandwidth

Radiation resistance below resonance:

- Decreases as you go below resonant frequency.`,
      keyPoints: [
        'Parabolic gain increases 6 dB when frequency is doubled (constant dish size)',
        'Circular polarization can be produced with crossed Yagis fed 90° out of phase',
        'Yagi driven elements are ~1/2 wavelength; parasitic element length offsets control phase and pattern; 2-element Yagis typically use reflectors for higher gain',
        'Loading coils resonate short antennas by canceling capacitive reactance; best placement is near the center; high coil Q improves efficiency',
        'Higher Q and loading reduce SWR bandwidth; radiation resistance decreases below resonance',
      ],
      relatedQuestionIds: [
        'E9D01',
        'E9D02',
        'E9D03',
        'E9D04',
        'E9D05',
        'E9D06',
        'E9D07',
        'E9D08',
        'E9D09',
        'E9D10',
        'E9D11',
        'E9D12',
      ],
    },
    {
      id: 'E9E',
      title: 'Matching and Phasing: Gamma/Beta/Stub Matching, Q-Sections, and Wilkinson Dividers',
      content: `# Matching and Phasing (E9E)

This group tests recognition of matching schemes and a few “standard results” like quarter-wave transformer impedances.

## Yagi Matching Systems

Matching system that requires the driven element to be insulated from the boom:

- **Beta (hairpin) match**

Hairpin match impedance condition:

- Requires a **capacitive** driven element feed point (element electrically shorter than 1/2 wavelength).

## Gamma Match

Gamma match description:

- Matches coax by connecting the shield to the center of the antenna and the conductor a fraction of a wavelength to one side

Series capacitor in a gamma match:

- Cancels unwanted **inductive reactance**

Gamma matches are also used to:

- Shunt feed grounded towers at the base.

## Stub Matching

Stub match uses:

- A short length of transmission line connected in parallel with the feed line at or near the feed point

## Quarter-Wave Matching Section (Q-Section)

To match 50 Ω line to 100 Ω load using a quarter-wave transformer:

- Required impedance is √(50×100) ≈ 70.7 Ω → **75 Ω** line is suitable.

## Reflection Coefficient

The parameter that describes interaction of a load and transmission line:

- **Reflection coefficient**

## Wilkinson Divider

Wilkinson divider use:

- Divide power equally between two 50 Ω loads while maintaining 50 Ω input impedance.

## Phasing Lines and Pattern Control

Multiple driven elements with phasing lines are used to:

- Control the antenna’s radiation pattern.`,
      keyPoints: [
        'Hairpin/beta matching requires the driven element be insulated from the boom and works with a capacitive feedpoint',
        'Gamma matches connect coax shield to element center and conductor off-center; series capacitor cancels inductive reactance and gamma is used for shunt-feeding towers',
        'Stub matching uses a parallel transmission-line stub near the feedpoint',
        'A quarter-wave transformer needs Z ≈ √(Z0×ZL) (50→100 Ω uses ~75 Ω line)',
        'Reflection coefficient describes load-line interaction; Wilkinson dividers split power while maintaining 50-ohm input; phasing lines shape patterns',
      ],
      relatedQuestionIds: [
        'E9E01',
        'E9E02',
        'E9E03',
        'E9E04',
        'E9E05',
        'E9E06',
        'E9E07',
        'E9E08',
        'E9E09',
        'E9E11',
      ],
    },
    {
      id: 'E9F',
      title: 'Transmission Line Behavior: Velocity Factor, Electrical Length, and Quarter-Wave Transformations',
      content: `# Transmission Line Behavior (E9F)

This group focuses on velocity factor, how electrical length differs from physical length, and classic impedance transformations of open/shorted stubs.

## Velocity Factor (VF)

:::definition Velocity factor
Velocity factor is the velocity of a wave in the line divided by the velocity of light in a vacuum.
:::

The largest influence on VF:

- The insulating dielectric material

Why electrical length is longer than physical length in coax:

- EM waves travel more slowly in coax (dielectric) than in air

## Parallel Line vs Coax

Compared to plastic dielectric coax, parallel-conductor line typically has:

- Lower loss

Foam vs solid dielectric coax differs in multiple practical ways (the pool treats this as “all of these”), such as:

- Velocity factor
- Loss characteristics
- Power/handling tradeoffs

## Microstrip

:::definition Microstrip
Microstrip is a printed conductor above a ground plane that provides a controlled-impedance transmission line at microwave frequencies.
:::

## Stub Transformations (Open/Shorted)

Memorize these classic results:

- 1/2λ line shorted at far end → **very low** impedance at input
- 1/4λ line shorted at far end → **very high** impedance at input
- 1/4λ line open at far end → **very low** impedance at input
- 1/8λ shorted → looks like an **inductive reactance**
- 1/8λ open → looks like a **capacitive reactance**

## Example Length

The pool includes a half-wave physical length example:

- An air-insulated parallel-conductor line that is electrically 1/2λ at 14.10 MHz is about **10.6 meters** long.`,
      keyPoints: [
        'Velocity factor is wave speed in line divided by c, dominated by dielectric material; coax electrical length is longer because waves travel slower than in air',
        'Parallel-conductor line has lower loss than plastic-dielectric coax; foam vs solid dielectric differs in VF/loss/power tradeoffs',
        'Microstrip is a controlled-impedance printed line over a ground plane used at microwave frequencies',
        'Stub transformations: 1/2λ short → low Z, 1/4λ short → high Z, 1/4λ open → low Z; 1/8λ short looks inductive and 1/8λ open looks capacitive',
        'At 14.10 MHz, air-insulated 1/2λ line length is ~10.6 m',
      ],
      relatedQuestionIds: [
        'E9F01',
        'E9F02',
        'E9F03',
        'E9F04',
        'E9F05',
        'E9F06',
        'E9F07',
        'E9F08',
        'E9F09',
        'E9F10',
        'E9F11',
        'E9F12',
      ],
    },
    {
      id: 'E9G',
      title: 'Smith Charts: Normalization, Axes, and Matching Stubs',
      content: `# Smith Charts: Normalization, Axes, and Matching Stubs (E9G)

Smith charts are a graphical tool for transmission line and impedance matching problems. The pool focuses on what the chart elements represent.

## What You Can Do with a Smith Chart

Common uses:

- Calculate impedance along transmission lines
- Determine impedance and SWR values
- Determine the length and position of an impedance-matching stub

## Chart Geometry

Smith charts are made from two families of curves:

- **Resistance** circles
- **Reactance** arcs

Arcs represent:

- Points with constant reactance

## Axes and “Only Straight Line”

The only straight line on a Smith chart is:

- The **resistance axis**

The pool also refers to the large outer circle where reactance arcs terminate as the:

- **Reactance axis**

## Normalization

Smith charts are normalized by:

- Reassigning the chart center to the characteristic impedance (Z₀) of the line (e.g., 50 Ω becomes 1.0 on the chart)

Designers often add:

- Constant-SWR circles

## Wavelength Scales

Smith chart wavelength scales are calibrated:

- In fractions of transmission line electrical wavelength`,
      keyPoints: [
        'Smith charts are used to find impedance along lines, SWR values, and stub length/position for matching',
        'Charts consist of resistance circles and reactance arcs; arcs represent constant reactance points',
        'The only straight line is the resistance axis; the outer circle is referenced in the pool as the reactance axis',
        'Normalization sets chart center to Z0 (e.g., 50 Ω → 1.0); constant-SWR circles are commonly added for matching design',
        'Wavelength scales are in fractions of electrical wavelength along the line',
      ],
      relatedQuestionIds: [
        'E9G01',
        'E9G02',
        'E9G03',
        'E9G04',
        'E9G05',
        'E9G06',
        'E9G07',
        'E9G08',
        'E9G09',
        'E9G10',
        'E9G11',
      ],
    },
    {
      id: 'E9H',
      title: 'Receiving Antennas and Direction Finding: Beverage, Loops, RDF, and Cardioids',
      content: `# Receiving Antennas and Direction Finding (E9H)

Receiving antenna design priorities differ from transmitting antennas, especially on the low HF bands where atmospheric noise dominates.

## Beverage Antennas

Key design and performance ideas:

- For good performance at a desired frequency, a Beverage should be at least **one wavelength long**
- Termination resistor function: **absorb signals from the reverse direction** (creates a unidirectional pattern)

How to choose the terminating resistor value (pool emphasis):

- Minimum variation in SWR over the desired frequency range

## 160/80 Meter Receiving Antennas

On 160 and 80 meters:

- Atmospheric noise is so high that **directivity** is often more important than minimizing losses.

## Receiving Directivity Factor (RDF)

:::definition RDF
Receiving directivity factor is peak antenna gain compared to average gain over the hemisphere around and above the antenna.
:::

## Loop DF Antennas and Shields

Small wire-loop DF antennas have a challenge:

- Bidirectional null pattern (two nulls)

Adding an electrostatic shield helps by:

- Eliminating unbalanced capacitive coupling to surroundings, improving null depth

## Sense Antennas and Cardioids

A sense antenna is used to:

- Modify a DF pattern so there is a null in only **one** direction

Single-turn terminated loops (e.g., pennant antennas) produce:

- A **cardioid** pattern

Cardioid DF advantage:

- A single null

## Increasing Loop Output Voltage

To increase output voltage of a multiple-turn receiving loop:

- Increase number of turns and/or the loop area.`,
      keyPoints: [
        'Beverage antennas should be at least one wavelength long; termination resistors absorb reverse-direction signals and are chosen for minimal SWR variation',
        'On 160/80 m, atmospheric noise is high so directivity can matter more than absolute loss',
        'RDF compares peak receive gain to average gain over the hemisphere',
        'Small loops have bidirectional nulls; electrostatic shields improve null depth by reducing capacitive coupling',
        'Sense antennas and terminated loops can create cardioid patterns with a single null; loop output increases with turns and area',
      ],
      relatedQuestionIds: [
        'E9H01',
        'E9H02',
        'E9H03',
        'E9H04',
        'E9H05',
        'E9H06',
        'E9H07',
        'E9H08',
        'E9H09',
        'E9H10',
        'E9H11',
      ],
    },
  ],
}


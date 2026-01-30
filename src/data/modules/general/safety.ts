/**
 * G0 - Electrical and RF Safety Module
 * General Class Amateur Radio License
 */

import type { LearningModule } from '@/types/learning'

export const safetyModule: LearningModule = {
  id: 'G0',
  examLevel: 'general',
  title: 'Electrical and RF Safety',
  description:
    'Critical safety practices for amateur radio operators, including RF exposure limits, electrical hazards, and station grounding requirements.',
  estimatedMinutes: 45,
  sections: [
    {
      id: 'G0A',
      title: 'RF Safety and MPE Exposure Limits',
      content: `# RF Safety and MPE Exposure Limits

Radio frequency (RF) energy is a form of non-ionizing electromagnetic radiation. While it does not have enough energy to ionize atoms or molecules (unlike X-rays or gamma rays), RF energy can still affect human body tissue. The primary biological effect of RF exposure is **tissue heating**. When RF energy is absorbed by the body, it causes molecules to vibrate, generating heat. This is the same principle used in microwave ovens. At high enough power levels or prolonged exposure, this heating can cause burns or other thermal damage to tissues.

The FCC has established **Maximum Permissible Exposure (MPE)** limits to protect both amateur operators and the general public from harmful RF exposure. These limits are based on guidelines from organizations like the IEEE and ICNIRP, and they vary based on frequency because different frequencies are absorbed differently by body tissue. Lower frequencies (below 30 MHz) penetrate deeper into the body, while higher frequencies are absorbed more superficially. The FCC distinguishes between "controlled" environments (where people are aware of RF exposure and can take steps to minimize it) and "uncontrolled" environments (where the general public may be present).

## Determining RF Exposure

Several factors are used to determine RF exposure from a transmitted signal:
- **Power density**: The amount of RF power per unit area (typically measured in mW/cm\u00B2)
- **Frequency**: Different frequencies have different MPE limits
- **Duty cycle**: The percentage of time the transmitter is actually transmitting

There are multiple acceptable methods to determine if your station complies with FCC RF exposure regulations:
- Calculation based on **FCC OET Bulletin 65** (the primary reference document)
- Calculation based on computer modeling software
- Direct measurement using **calibrated field strength meters** with calibrated antennas

## Time Averaging and Duty Cycle

**Time averaging** refers to calculating the total RF exposure averaged over a specific time period (typically 6 minutes for controlled environments, 30 minutes for uncontrolled environments). This is important because amateur transmissions are not continuous - we transmit intermittently during conversations.

The **duty cycle** of a transmission mode significantly affects RF exposure calculations. A lower duty cycle permits greater power levels to be transmitted while still meeting MPE limits. For example:
- **CW (Morse code)**: Approximately 40-50% duty cycle
- **SSB voice**: Approximately 20-25% duty cycle (varies with speech)
- **FM voice**: Nearly 100% duty cycle when transmitting
- **Digital modes (RTTY, FT8)**: Often 100% duty cycle

## Compliance Requirements

All amateur stations with a time-averaged transmission of more than one milliwatt are subject to FCC RF exposure rules - amateur stations are NOT exempt. If your station fails to meet the FCC RF exposure exemption criteria, you must perform an RF exposure evaluation in accordance with FCC OET Bulletin 65.

To ensure compliance with RF safety regulations, operators must:
- Perform a routine RF exposure evaluation
- Identify any high exposure areas near antennas
- Prevent access to those high exposure areas during transmission

If evaluation shows that RF energy exceeds permissible limits, you must **take action to prevent human exposure** to the excessive RF fields. This might include:
- Reducing transmitter power
- Relocating the antenna
- Using a different antenna with less gain toward occupied areas
- Restricting access to high-exposure areas during transmission
- Limiting operating time

For directional antennas, if a neighbor might experience more than the allowable limit from the main lobe, you should take precautions to ensure the antenna cannot be pointed in their direction when they are present.

## Indoor Antennas

Special care must be taken with **indoor transmitting antennas**. The primary precaution is to make sure that MPE limits are not exceeded in occupied areas. Because indoor antennas are necessarily close to people, they often require reduced power levels or careful placement to maintain safe exposure levels. Always evaluate exposure before operating with an indoor antenna, especially in multi-story buildings where people may be above, below, or adjacent to the antenna location.
`,
      keyPoints: [
        'RF energy affects body tissue primarily through heating (thermal effect)',
        'RF exposure is determined by power density, frequency, and duty cycle',
        'Compliance can be verified by FCC OET Bulletin 65 calculations, computer modeling, or calibrated field strength measurements',
        'Lower duty cycle modes allow higher power while meeting MPE limits',
        'All stations with >1 mW time-averaged transmission must comply with RF exposure rules',
      ],
      relatedQuestionIds: [
        'G0A01',
        'G0A02',
        'G0A03',
        'G0A04',
        'G0A05',
        'G0A06',
        'G0A07',
        'G0A08',
        'G0A09',
        'G0A10',
        'G0A11',
        'G0A12',
      ],
    },
    {
      id: 'G0B',
      title: 'Electrical Safety and Station Grounding',
      content: `# Electrical Safety and Station Grounding

Electrical safety is critically important for amateur radio operators. High-power transmitters, power supplies, and antenna systems can present serious hazards including electric shock, electrocution, fire, and lightning damage. Understanding proper wiring practices, grounding techniques, and safety equipment is essential for every amateur operator.

## AC Wiring and Circuit Protection

The **National Electrical Code (NEC)** governs the electrical safety of amateur radio stations, covering topics such as proper wiring, grounding, and circuit protection. When working with household electrical circuits:

For a **four-conductor 240 VAC circuit**, only the **hot wires** should be attached to fuses or circuit breakers. The neutral and ground wires should never be fused because interrupting them could create dangerous conditions.

Wire size must be matched to circuit breaker capacity:
- **AWG 14 wire**: Use with a maximum **15-ampere** circuit breaker
- **AWG 12 wire**: Use with a maximum **20-ampere** circuit breaker

Using undersized wire or oversized breakers creates fire hazards because the wire can overheat before the breaker trips.

## Ground Fault Protection

A **Ground Fault Circuit Interrupter (GFCI)** is a critical safety device that monitors current flow. It disconnects AC power when it detects **current flowing from one or more hot wires directly to ground** - indicating that current is taking an unintended path, possibly through a person. GFCIs should be used in damp locations (near sinks, outdoors, in basements) and anywhere electrical equipment is used near water. Note that a GFCI detects ground faults, not simple overloads or current flowing to neutral (which is normal operation).

## Lightning Protection and Grounding

Proper grounding is essential for both safety and station performance. The station's **lightning protection ground system should be located outside the building**. This is because lightning currents should be directed to earth before entering the structure.

Key grounding requirements:
- **Lightning ground rods must be bonded together with all other grounds** (electrical service ground, telephone ground, cable TV ground) to create a single-point ground system
- This bonding prevents dangerous voltage differences between grounds during a lightning strike
- **Lightning arrestors should be located where feed lines enter the building**, providing the first line of defense against lightning-induced surges

## Tower Safety

Working on antenna towers presents unique hazards. Before **climbing a tower that supports electrically powered devices**, you must ensure that **all circuits supplying power to the tower are locked out and tagged**. This lockout/tagout procedure prevents someone from accidentally energizing equipment while a person is on the tower.

When using a **safety harness for tower climbing**:
- Confirm that the harness is rated for the weight of the climber
- Verify that the harness is within its allowable service life
- Inspect all hardware and webbing for wear or damage before each use

Never climb alone, and always have a ground crew monitoring the climber.

## Equipment Safety

**Power supply interlocks** are safety devices designed to **ensure that dangerous voltages are removed if the cabinet is opened**. High-voltage power supplies in amplifiers and other equipment can retain lethal charges even after being turned off. Interlocks help protect against accidental contact with these voltages, but you should never rely solely on interlocks - always verify that capacitors are discharged before working inside equipment.

When working with **emergency generators**:
- Operate the generator in a **well-ventilated area** to prevent carbon monoxide poisoning
- Never operate a generator indoors or in an enclosed space
- Keep fuel storage away from the generator and any ignition sources

## Soldering Safety

**Lead-tin solder** presents a contamination hazard: **lead can contaminate food if hands are not washed carefully after handling solder**. Always wash hands thoroughly after soldering. Additionally:
- Work in a well-ventilated area to avoid inhaling flux fumes
- Use lead-free solder when possible
- Never eat, drink, or smoke while soldering
- Keep soldering materials away from food preparation areas
`,
      keyPoints: [
        'Only hot wires in a 240 VAC circuit should be connected to fuses or breakers',
        'AWG 12 wire minimum for 20A circuits; AWG 14 wire maximum for 15A circuits',
        'GFCI trips when current flows from hot wires directly to ground',
        'Lightning protection ground rods must be bonded together with all other grounds',
        'Lock out and tag all power circuits before climbing a tower with electrically powered devices',
      ],
      relatedQuestionIds: [
        'G0B01',
        'G0B02',
        'G0B03',
        'G0B04',
        'G0B05',
        'G0B06',
        'G0B07',
        'G0B08',
        'G0B09',
        'G0B10',
        'G0B11',
        'G0B12',
        'G0B13',
      ],
    },
  ],
}

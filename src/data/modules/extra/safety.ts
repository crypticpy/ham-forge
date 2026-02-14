/**
 * E0 - Safety Module
 * Amateur Extra Class License (Element 4)
 */

import type { LearningModule } from '@/types/learning'

export const safetyModule: LearningModule = {
  id: 'E0',
  examLevel: 'extra',
  title: 'Safety',
  description:
    'Safety topics for Extra operators: station grounding and lightning protection, RF exposure evaluations and MPE/SAR concepts, and tower climbing best practices.',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'E0A',
      title: 'Grounding, RF Exposure (MPE/SAR), and Tower Safety',
      content: `# Grounding, RF Exposure (MPE/SAR), and Tower Safety (E0A)

Extra-level safety questions emphasize regulatory RF exposure evaluation and practical tower/grounding safety.

## Grounding and Ground Rods

The primary function of an external earth connection / ground rod is:

- **Lightning charge dissipation**

Grounding is also used for fault current return paths and RF bonding, but the pool focuses on lightning energy management at the station entry.

## RF Exposure Evaluations (MPE)

When evaluating RF exposure levels from your station at a neighbor’s home, you must:

- Ensure your signals are below **uncontrolled** Maximum Permissible Exposure (**MPE**) limits

Frequency range where FCC human body RF exposure limits are most restrictive:

- **30–300 MHz**

### Multiple transmitters at one site

If multiple transmitters operate simultaneously and total exposure exceeds limits:

- Each transmitter producing **5% or more** of its MPE limit in the affected area is responsible for mitigating the over-exposure situation.

### Microwave hazard

At microwave frequencies, a major hazard is:

- High-gain antennas can create high exposure levels even with modest transmitter power.

### Separate E-field and H-field limits (below 300 MHz)

At frequencies below 300 MHz, separate E and H MPE limits exist because:

- Near-field conditions can cause E and H fields not to be in a fixed ratio
- Human coupling differs with field type and geometry (the pool emphasizes that multiple reasons apply)

:::definition SAR
Specific Absorption Rate (SAR) measures the rate at which RF energy is absorbed by the body.
:::

### RF exposure evaluation requirement (80 meters)

The pool states that on 80 meters:

- An RF exposure evaluation must **always** be performed.

### Equipment exemptions (as tested)

The pool includes a legacy exemption:

- Hand-held transceivers sold before **May 3, 2021** are exempt from RF exposure evaluations.

## Tower Safety (100% Tie-Off)

:::definition 100% tie-off
“100% tie-off” means at least one lanyard is attached to the tower at all times while climbing.
:::

Climbing attachment points:

- Lanyards should be attached to **tower legs**
- A shock-absorbing lanyard should be attached **above the climber’s head level** to reduce free-fall distance and arrest forces.`,
      keyPoints: [
        'Ground rods primarily provide lightning charge dissipation',
        'RF exposure evaluations must ensure signals are below uncontrolled MPE limits at neighbor/public locations; limits are most restrictive from 30–300 MHz',
        'At multi-transmitter sites, each transmitter contributing ≥5% of its MPE limit is responsible when total exposure exceeds limits',
        'Microwave high-gain antennas can create high exposure; separate E and H limits exist below 300 MHz due to near-field/geometry effects',
        'SAR measures RF energy absorption rate; the pool states an RF exposure evaluation is always required on 80 m',
        '100% tie-off means at least one lanyard attached at all times; attach lanyards to tower legs and shock-absorbing lanyards above head height',
      ],
      relatedQuestionIds: [
        'E0A01',
        'E0A02',
        'E0A03',
        'E0A04',
        'E0A05',
        'E0A06',
        'E0A07',
        'E0A08',
        'E0A09',
        'E0A10',
        'E0A11',
        'E0A12',
      ],
    },
  ],
}


/**
 * T5 - Electrical Principles
 * Learning module for fundamental electrical concepts used in amateur radio
 */

import type { LearningModule } from '@/types/learning'

export const electricalPrinciplesModule: LearningModule = {
  id: 'T5',
  examLevel: 'technician',
  title: 'Electrical Principles',
  description:
    "Fundamental electrical concepts including current, voltage, power, resistance, Ohm's Law, metric prefixes, decibels, capacitance, inductance, and impedance.",
  estimatedMinutes: 60,
  sections: [
    {
      id: 'T5A',
      title: 'Current, Voltage, Power, and Resistance',
      content: `Understanding the basic electrical quantities is essential for amateur radio. The four fundamental concepts are current, voltage, power, and resistance. Current is the flow of electrons through a conductor and is measured in amperes (amps). Voltage is the electrical force or pressure that pushes electrons through a circuit, measured in volts. Power is the rate at which electrical energy is used or transferred, measured in watts. Resistance is the opposition to current flow, measured in ohms.

These quantities are interconnected through fundamental relationships. In a DC circuit, power equals voltage times current (P = E × I). Resistance limits how much current flows for a given voltage. Metals like copper and aluminum are good conductors because they have many free electrons that can move easily. Materials like glass, rubber, and plastic are good insulators because their electrons are tightly bound and cannot flow freely.

Current can be either direct current (DC) or alternating current (AC). DC flows in one direction continuously, like from a battery. AC periodically reverses direction, alternating between positive and negative polarity. The number of complete cycles per second is called frequency, measured in hertz (Hz). Household power in the US alternates at 60 Hz. Radio signals operate at much higher frequencies, typically thousands to billions of hertz. Resistance opposes both DC and AC current flow, though AC circuits introduce additional concepts like reactance and impedance.`,
      keyPoints: [
        'Current (electron flow) is measured in amperes; voltage (electrical force) is measured in volts',
        'Power (rate of energy use) is measured in watts; resistance (opposition to flow) is measured in ohms',
        'Metals are good conductors due to free electrons; glass and rubber are good insulators',
        'AC alternates direction periodically; frequency (cycles per second) is measured in hertz',
        'Power formula: P = I × E (watts = amps × volts)',
      ],
      relatedQuestionIds: [
        'T5A01',
        'T5A02',
        'T5A03',
        'T5A04',
        'T5A05',
        'T5A06',
        'T5A07',
        'T5A08',
        'T5A09',
        'T5A10',
        'T5A11',
        'T5A12',
      ],
    },
    {
      id: 'T5B',
      title: 'Metric Prefixes and Decibels',
      content: `Amateur radio uses metric prefixes extensively because electrical and radio quantities span enormous ranges. The most common prefixes you need to know are: kilo (k) = 1,000, mega (M) = 1,000,000, giga (G) = 1,000,000,000 for large values; and milli (m) = 0.001, micro (μ) = 0.000001, pico (p) = 0.000000000001 for small values. For example, 1.5 amperes equals 1,500 milliamperes, and 1,500,000 hertz equals 1,500 kHz or 1.5 MHz.

Converting between units is straightforward once you memorize the prefixes. To convert from a smaller unit to a larger one, divide. To convert from a larger unit to a smaller one, multiply. For example, 28,400 kHz equals 28.4 MHz (divide by 1,000). Similarly, 500 milliwatts equals 0.5 watts, and 3,000 milliamperes equals 3 amperes. Frequency conversions are common: 3.525 MHz equals 3,525 kHz, and 2,425 MHz equals 2.425 GHz.

Decibels (dB) provide a convenient way to express power ratios using logarithms. The key values to memorize are: 3 dB represents a power doubling (or halving if negative), and 10 dB represents a tenfold increase (or decrease). So if you increase power from 5 watts to 10 watts (doubling), that's a 3 dB increase. Increasing from 20 watts to 200 watts (10 times) is a 10 dB increase. Decreasing from 12 watts to 3 watts (one-quarter) is -6 dB (two halvings, each -3 dB). Decibels are used extensively when discussing antenna gain, amplifier output, and signal strength.`,
      keyPoints: [
        'Kilo (k) = 1,000; Mega (M) = 1,000,000; Giga (G) = 1,000,000,000',
        'Milli (m) = 0.001; Micro (μ) = 0.000001; Pico (p) = 0.000000000001',
        '3 dB = power doubles; 10 dB = power increases 10 times',
        '-3 dB = power halves; -6 dB = power drops to one-quarter',
        'Common conversions: 1,500,000 Hz = 1,500 kHz = 1.5 MHz',
      ],
      relatedQuestionIds: [
        'T5B01',
        'T5B02',
        'T5B03',
        'T5B04',
        'T5B05',
        'T5B06',
        'T5B07',
        'T5B08',
        'T5B09',
        'T5B10',
        'T5B11',
        'T5B12',
        'T5B13',
      ],
    },
    {
      id: 'T5C',
      title: 'Capacitance, Inductance, and Impedance',
      content: `Beyond resistance, AC circuits involve two additional properties: capacitance and inductance. Capacitance is the ability to store energy in an electric field, typically using two conductive plates separated by an insulator. The unit of capacitance is the farad (F). Since a farad is very large, practical capacitors are usually measured in microfarads (μF) or picofarads (pF). For example, 1,000,000 picofarads equals 1 microfarad. Capacitors block DC but allow AC to pass, with the opposition decreasing as frequency increases.

Inductance is the ability to store energy in a magnetic field, typically using a coil of wire. The unit of inductance is the henry (H). Inductors oppose changes in current flow. They pass DC freely but oppose AC, with the opposition increasing as frequency increases. This is the opposite behavior of capacitors. Both capacitance and inductance are fundamental to tuned circuits used in radio transmitters and receivers.

Impedance is the total opposition to AC current flow, combining resistance with the reactive effects of capacitance and inductance. Like resistance, impedance is measured in ohms. However, while resistance is the same for DC and AC, impedance specifically describes AC circuit behavior. Matching impedance between components (like between a transmitter and antenna) is critical for efficient power transfer. The abbreviation RF stands for radio frequency signals of all types. Frequency is commonly expressed in kilohertz (kHz) or megahertz (MHz), abbreviated as kHz and MHz respectively.`,
      keyPoints: [
        'Capacitance stores energy in an electric field; measured in farads (F)',
        'Inductance stores energy in a magnetic field; measured in henrys (H)',
        'Impedance is the total opposition to AC current; measured in ohms',
        'RF stands for radio frequency signals of all types',
        'Power formula P = I × E applies: 13.8V × 10A = 138 watts',
      ],
      relatedQuestionIds: [
        'T5C01',
        'T5C02',
        'T5C03',
        'T5C04',
        'T5C05',
        'T5C06',
        'T5C07',
        'T5C08',
        'T5C09',
        'T5C10',
        'T5C11',
        'T5C12',
        'T5C13',
      ],
    },
    {
      id: 'T5D',
      title: "Ohm's Law Calculations",
      content: `Ohm's Law is the fundamental relationship between voltage, current, and resistance in electrical circuits. The three forms of Ohm's Law are: I = E / R (current equals voltage divided by resistance), E = I × R (voltage equals current times resistance), and R = E / I (resistance equals voltage divided by current). Many exam questions require applying these formulas to calculate unknown values.

For example, if a 90-volt source produces 3 amperes of current, the resistance is R = E / I = 90 / 3 = 30 ohms. If a 12-volt source feeds a circuit with 1.5 amperes flowing, the resistance is R = 12 / 1.5 = 8 ohms. To find current through a 100-ohm resistor connected to 200 volts, use I = E / R = 200 / 100 = 2 amperes. To find voltage across a 10-ohm resistor with 2 amperes flowing, use E = I × R = 2 × 10 = 20 volts.

Understanding series and parallel circuits is also important. In a series circuit, components are connected end-to-end, so the same current flows through all components. In a parallel circuit, components are connected across the same two points, so each sees the same voltage. A helpful memory aid for Ohm's Law is the triangle: place E at the top, with I and R at the bottom. Cover what you want to find, and the remaining letters show the formula. Cover E to see I × R; cover I to see E / R; cover R to see E / I.`,
      keyPoints: [
        "Ohm's Law: I = E / R, E = I × R, R = E / I",
        'In series circuits, current is the same through all components',
        'In parallel circuits, voltage is the same across all components',
        'Example: 120V / 80 ohms = 1.5 amperes; 240V / 24 ohms = 10 amperes',
        'Example: 2A × 10 ohms = 20 volts; 0.5A × 2 ohms = 1 volt',
      ],
      relatedQuestionIds: [
        'T5D01',
        'T5D02',
        'T5D03',
        'T5D04',
        'T5D05',
        'T5D06',
        'T5D07',
        'T5D08',
        'T5D09',
        'T5D10',
        'T5D11',
        'T5D12',
        'T5D13',
        'T5D14',
      ],
    },
  ],
}

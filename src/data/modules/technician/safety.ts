/**
 * T0 - Safety
 * Learning module for electrical, antenna, and RF safety in amateur radio
 */

import type { LearningModule } from '@/types/learning'

export const safetyModule: LearningModule = {
  id: 'T0',
  examLevel: 'technician',
  title: 'Safety',
  description:
    'Critical safety practices for amateur radio operations, including electrical hazards, tower and antenna installation safety, and RF exposure protection.',
  estimatedMinutes: 40,
  sections: [
    {
      id: 'T0A',
      title: 'Electrical Safety',
      content: `Electrical safety is paramount in amateur radio because operators regularly work with equipment that can deliver dangerous or lethal shocks. Understanding the hazards of electrical current is essential: current flowing through the body can heat tissue and cause burns, disrupt the electrical functions of cells (particularly dangerous for the heart), and cause involuntary muscle contractions that may prevent you from releasing an energized conductor. Even relatively low voltages can be dangerous under the right conditions.

In standard 120V AC wiring used in the United States, the black wire indicates the "hot" conductor that carries current from the breaker panel. The white wire is neutral, and the green or bare wire is the equipment ground. Always use three-wire cords and plugs for all AC-powered equipment, connect all station equipment to a common safety ground, and consider installing mechanical interlocks on high-voltage circuits. Fuses and circuit breakers should be installed in series with the hot conductor only—their purpose is to remove power in case of overload and prevent fires.

Never replace a fuse with one of higher amperage (for example, replacing a 5-amp fuse with a 20-amp fuse). The fuse is sized to protect the circuit and equipment—a larger fuse could allow excessive current to flow, potentially causing a fire before the fuse blows. When measuring high voltages with a voltmeter, always ensure the meter and test leads are rated for the voltages being measured.

Batteries present their own hazards. While a 12-volt battery cannot deliver a dangerous shock through dry skin, shorting the terminals can cause burns, fire, or even an explosion due to the very high current batteries can deliver. Charging or discharging batteries too quickly can cause overheating or out-gassing of hydrogen, which is explosive. Power supplies present hazards even after being turned off—filter capacitors can store dangerous charge for minutes or longer. Lightning protection requires installing arresters on coaxial feed lines at a grounded panel near where the lines enter the building, and all external ground rods must be bonded together with heavy wire or conductive strap to create a single-point ground system.`,
      keyPoints: [
        'Black wire is "hot" in US 120V AC wiring; fuses go in series with hot conductor only',
        'Never replace a fuse with a higher amperage rating—excessive current could cause fire',
        'Use three-wire plugs and common safety ground for all AC station equipment',
        'Power supply filter capacitors can hold dangerous charge after power is turned off',
        'Bond all ground rods together; install lightning arresters where feed lines enter building',
      ],
      relatedQuestionIds: [
        'T0A01',
        'T0A02',
        'T0A03',
        'T0A04',
        'T0A05',
        'T0A06',
        'T0A07',
        'T0A08',
        'T0A09',
        'T0A10',
        'T0A11',
        'T0A12',
      ],
    },
    {
      id: 'T0B',
      title: 'Tower and Antenna Safety',
      content: `Tower climbing and antenna installation are among the most dangerous activities in amateur radio. Falls from towers are often fatal, and contact with power lines during antenna work has killed many operators. Before climbing any tower, you must have sufficient training on safe climbing techniques, always wear an approved climbing harness, and use appropriate tie-off to the tower at all times. There is never a safe circumstance to climb a tower without a helper or observer on the ground—even for simple tasks or low heights, having someone available to call for help in an emergency is essential.

When putting up a tower or installing an antenna, the most critical safety precaution is to look for and stay clear of any overhead electrical wires. The minimum safe distance from power lines when installing an antenna is enough that if the antenna falls, no part of it can come closer than 10 feet to the power wires. This accounts for the antenna's full length and any potential swing radius. Never attach an antenna to a utility pole—besides being illegal in most areas, the antenna could contact high-voltage power lines on the pole.

Crank-up towers require special safety considerations. These towers must not be climbed unless fully retracted or mechanical safety locking devices have been installed to prevent accidental lowering while someone is on the tower. When using guy wires, safety wire through turnbuckles prevents loosening from vibration over time. For grounding, a proper method is to install separate eight-foot ground rods for each tower leg, bonded to the tower base and to each other.

Lightning protection grounding conductors should avoid sharp bends—lightning tends to jump across sharp angles rather than follow the conductor. Ground wires should be kept short and direct. Local electrical codes (not FCC Part 97) establish the grounding requirements for amateur towers and antennas, so consult your local building inspector for specific requirements in your area.`,
      keyPoints: [
        'Never climb a tower without a helper or observer—there are no safe exceptions',
        'Always use approved climbing harness with tie-off; get proper training first',
        'Keep antennas far enough from power lines that a fall cannot contact them within 10 feet',
        'Crank-up towers must be retracted or have safety locks before climbing',
        'Local electrical codes (not FCC rules) establish tower grounding requirements',
      ],
      relatedQuestionIds: [
        'T0B01',
        'T0B02',
        'T0B03',
        'T0B04',
        'T0B05',
        'T0B06',
        'T0B07',
        'T0B08',
        'T0B09',
        'T0B10',
        'T0B11',
      ],
    },
    {
      id: 'T0C',
      title: 'RF Exposure Safety',
      content: `Radio frequency (RF) radiation is non-ionizing radiation, meaning it does not have sufficient energy to cause chemical changes in cells or damage DNA like ionizing radiation (gamma rays, X-rays) can. However, RF energy can still cause harm by heating body tissues, similar to how a microwave oven heats food. The FCC has established Maximum Permissible Exposure (MPE) limits to protect both operators and the public from excessive RF exposure, and the station licensee is responsible for ensuring compliance with these limits.

RF exposure limits vary with frequency because the human body absorbs more RF energy at some frequencies than at others. The body's absorption peaks in the VHF range around 30-300 MHz, which is why the lowest MPE values (strictest limits) occur around 50 MHz. The amateur 6-meter band falls right in this critical range. Multiple factors affect RF exposure near an amateur antenna: the frequency and power level of the RF field, distance from the antenna to a person, and the radiation pattern of the antenna (some directions receive more energy than others).

Duty cycle is important in RF safety calculations because it affects the average exposure to radiation over time. Duty cycle is defined as the percentage of time that a transmitter is transmitting during the averaging period. If duty cycle decreases from 100 percent to 50 percent, the allowable power density increases by a factor of 2, since the average exposure is halved. Modes like CW and SSB have much lower duty cycles than FM, which transmits continuously while the PTT is pressed.

To determine whether your station complies with FCC RF exposure regulations, you can use calculation based on FCC OET Bulletin 65, computer modeling, or measurement with calibrated field strength equipment. Any of these methods is acceptable. Whenever you change anything in your transmitter or antenna system, you should re-evaluate your station's compliance. Practical ways to reduce RF exposure include relocating antennas farther from occupied areas, reducing power, or using antennas with radiation patterns that direct energy away from people. Touching an antenna during transmission can cause RF burns to the skin—always ensure antennas are in safe locations and that transmitters are off before any antenna work.`,
      keyPoints: [
        'RF is non-ionizing radiation; it heats tissue but cannot damage DNA like ionizing radiation',
        'MPE limits are lowest (strictest) around 50 MHz where body absorption peaks',
        'Station licensee is responsible for ensuring compliance with RF exposure limits',
        'Duty cycle affects average exposure—50% duty cycle doubles allowable power density',
        'Re-evaluate RF compliance whenever transmitter or antenna system changes',
      ],
      relatedQuestionIds: [
        'T0C01',
        'T0C02',
        'T0C03',
        'T0C04',
        'T0C05',
        'T0C06',
        'T0C07',
        'T0C08',
        'T0C09',
        'T0C10',
        'T0C11',
        'T0C12',
        'T0C13',
      ],
    },
  ],
}

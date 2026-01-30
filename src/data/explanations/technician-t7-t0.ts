/**
 * Explanations for Technician T7-T0 Questions
 * Topics: Station Equipment, Modulation/Signals, Antennas/Feed Lines, Safety
 */

export const explanationsT7T0: Record<string, string> = {
  // T7A - Station Equipment: Receivers, Transmitters, Transceivers
  T7A01:
    'Sensitivity describes how well a receiver can detect weak signals. A more sensitive receiver can pick up signals that would be too weak for a less sensitive one to detect, making it crucial for long-distance communication.',
  T7A02:
    'A transceiver combines both a transmitter and receiver in a single unit. This is the most common type of amateur radio equipment because it allows switching between transmitting and receiving without needing separate devices.',
  T7A03:
    'A mixer converts signals from one frequency to another by combining the incoming signal with a local oscillator signal. This is essential in superheterodyne receivers for converting received signals to an intermediate frequency.',
  T7A04:
    'Selectivity is the ability to separate desired signals from unwanted ones on nearby frequencies. Good selectivity allows you to hear the station you want while rejecting interference from adjacent channels.',
  T7A05:
    'An oscillator generates a signal at a specific frequency. It is a fundamental building block in transmitters (for generating the carrier) and receivers (for the local oscillator used in frequency conversion).',
  T7A06:
    'A transverter converts RF signals between different bands, allowing a transceiver designed for one band to operate on another. For example, it can convert 2-meter signals to enable operation on the 23 cm band.',
  T7A07:
    'The PTT (Push-To-Talk) input switches the transceiver from receive to transmit mode when grounded. This allows external devices like microphones or foot switches to control when the radio transmits.',
  T7A08:
    'Modulation is the process of combining audio (speech) with an RF carrier signal. This is how voice information is impressed onto a radio wave so it can be transmitted and understood at the receiving end.',
  T7A09:
    'The SSB/CW-FM switch on a VHF power amplifier adjusts internal settings for proper operation with different modes. SSB and CW require linear amplification while FM can use more efficient class-C operation.',
  T7A10:
    'An RF power amplifier increases the output power from a transceiver. It takes the relatively low-power signal from the transmitter and boosts it to a higher power level for improved range.',
  T7A11:
    'An RF preamplifier is installed between the antenna and receiver to amplify weak incoming signals before they reach the receiver. This improves reception of weak signals, especially on VHF/UHF bands.',

  // T7B - Troubleshooting: Interference, RF Problems
  T7B01:
    'If your FM signal is over-deviating (too much frequency swing), you should talk farther from the microphone. Speaking too close causes excessive audio levels that over-modulate the signal.',
  T7B02:
    'When a broadcast receiver picks up amateur transmissions, it usually means the receiver cannot reject strong signals outside its intended frequency range. This is called fundamental overload.',
  T7B03:
    'RF interference can be caused by fundamental overload (strong desired signals), harmonics (multiples of the transmit frequency), and spurious emissions (unintended signals). All represent different ways amateur signals can cause interference.',
  T7B04:
    'A ferrite choke can cure distorted audio caused by RF current flowing on a microphone cable shield. The ferrite blocks the RF current while allowing audio frequencies to pass through.',
  T7B05:
    "Fundamental overload in a non-amateur receiver is best addressed by installing a filter at the affected receiver's antenna input. This blocks the amateur signal before it overloads the receiver's front end.",
  T7B06:
    "When a neighbor reports interference, first verify your station is operating properly and doesn't cause interference to your own equipment. This helps determine if the problem is with your station or the neighbor's equipment.",
  T7B07:
    'A band-reject filter (also called a notch filter) can reduce overload from a nearby commercial FM station by specifically blocking signals in the commercial FM band while passing amateur frequencies.',
  T7B08:
    "When something in a neighbor's home causes interference to your station, work together to identify it, inform them about FCC rules prohibiting interference-causing devices, and ensure your station follows good amateur practice.",
  T7B09:
    'The first step in resolving cable TV interference is to check that all coaxial connectors are properly installed. Loose or corroded connections are a common source of RF ingress and interference.',
  T7B10:
    'Distorted or unintelligible audio through a repeater can be caused by being slightly off frequency, low batteries affecting transmitter performance, or a poor location causing multipath or weak signal problems.',
  T7B11:
    'RF feedback causes garbled, distorted, or unintelligible voice transmissions. This happens when RF energy from the antenna gets back into the audio circuits and is re-amplified along with the voice signal.',

  // T7C - Test Equipment and Measurements
  T7C01:
    'A dummy load allows you to test your transmitter without radiating a signal over the air. It absorbs the RF power and converts it to heat, preventing interference during testing and tuning.',
  T7C02:
    'An antenna analyzer determines if an antenna is resonant at the desired frequency by measuring impedance across a range of frequencies. This helps tune antennas and identify problems.',
  T7C03:
    'A dummy load consists of a non-inductive resistor mounted on a heat sink. The resistor (typically 50 ohms) absorbs RF power while the heat sink dissipates the resulting heat.',
  T7C04:
    'An SWR reading of 1:1 indicates a perfect impedance match between the antenna system and feed line. This means all power from the transmitter is being delivered to the antenna with no reflections.',
  T7C05:
    'Solid-state transmitters reduce output power at high SWR to protect the output transistors. High SWR causes power to be reflected back into the final amplifier, which can damage the semiconductors through overheating.',
  T7C06:
    'An SWR reading of 4:1 indicates an impedance mismatch between the antenna and feed line. This means a significant portion of power is being reflected rather than radiated, reducing efficiency.',
  T7C07:
    'Power lost in a feed line is converted into heat. This is why using low-loss coaxial cable is important, especially at higher frequencies where losses are greater.',
  T7C08:
    'A directional wattmeter (also called an SWR meter or reflected power meter) measures forward and reflected power, which can be used to calculate SWR.',
  T7C09:
    "Moisture contamination causes coaxial cable failure. Water changes the cable's electrical properties, increases losses, and can corrode the conductors and shield over time.",
  T7C10:
    'Coaxial cable jackets should resist ultraviolet light because UV exposure degrades the outer jacket material. A damaged jacket allows water to enter, leading to cable failure.',
  T7C11:
    "Air core coaxial cable requires special techniques to prevent moisture intrusion because there's no solid dielectric to block water. Any opening can allow humidity to travel through the entire cable.",

  // T7D - Practical Measurements and Soldering
  T7D01:
    'A voltmeter measures electric potential (voltage). Voltage is the electrical "pressure" that causes current to flow in a circuit.',
  T7D02:
    'A voltmeter is connected in parallel with a component to measure voltage. This allows it to sense the potential difference across the component without interrupting current flow.',
  T7D03:
    'When measuring current, a multimeter must be connected in series with the circuit. This allows all current flowing through the circuit to pass through the meter for measurement.',
  T7D04:
    'An ammeter measures electric current. It must be placed in series with the circuit so all current flows through it for accurate measurement.',
  T7D06:
    'A multimeter can be damaged by attempting to measure voltage while set to the resistance (ohms) setting. This applies voltage to internal circuits designed only for the small current used in resistance measurements.',
  T7D07:
    'A multimeter typically measures voltage and resistance (and often current). These are the most common electrical parameters needed for troubleshooting electronic circuits.',
  T7D08:
    'Acid-core solder should not be used for electronics because the acid flux is corrosive and can damage components and cause failures over time. Use rosin-core solder for electronics work.',
  T7D09:
    'A cold solder joint has a rough or lumpy surface appearance. This indicates the solder did not flow properly, resulting in a weak mechanical and electrical connection.',
  T7D10:
    "When an ohmmeter is connected across a discharged capacitor, the reading shows increasing resistance over time. This happens because the meter's internal battery charges the capacitor, reducing current flow.",
  T7D11:
    'When measuring in-circuit resistance with an ohmmeter, ensure the circuit is not powered. Applied power will damage the meter and give incorrect readings since the ohmmeter supplies its own test current.',

  // T8A - Modulation Modes
  T8A01:
    'Single sideband (SSB) is a form of amplitude modulation (AM). It transmits only one sideband of the AM signal, making it more efficient in power and bandwidth than conventional AM.',
  T8A02:
    'FM or PM (frequency or phase modulation) is commonly used for VHF packet radio. These modes handle the digital data well and are compatible with standard FM transceivers.',
  T8A03:
    'SSB (single sideband) is used for weak signal, long-distance contacts on VHF and UHF. Its narrower bandwidth concentrates power for better signal-to-noise ratio than FM in weak signal conditions.',
  T8A04:
    'FM or PM is commonly used for VHF and UHF voice repeaters. FM provides clear, noise-free audio for local communications and handles the capture effect well for repeater use.',
  T8A05:
    'CW (Morse code) has the narrowest bandwidth of the choices listed. A typical CW signal requires only about 150 Hz of bandwidth, compared to 3 kHz for SSB or 10-15 kHz for FM.',
  T8A06:
    'Upper sideband (USB) is normally used for 10 meter HF, VHF, and UHF SSB communications. This is a convention; lower sideband is typically used on frequencies below 10 MHz.',
  T8A07:
    'SSB has narrower bandwidth than FM. This makes SSB more spectrum-efficient and allows the transmitted power to be concentrated, improving weak-signal communication capability.',
  T8A08:
    'A typical SSB voice signal has an approximate bandwidth of 3 kHz (actually about 2.4-3 kHz). This is much narrower than FM voice, which requires 10-15 kHz.',
  T8A09:
    'A VHF repeater FM voice signal has a bandwidth between 10 and 15 kHz. This includes the audio deviation and any subaudible tones used for repeater access.',
  T8A10:
    'AM fast-scan TV transmissions require about 6 MHz of bandwidth. This is why amateur television is typically found on UHF bands where such wide bandwidth is available.',
  T8A11:
    'A CW signal requires approximately 150 Hz of bandwidth. This narrow bandwidth is one reason CW is effective for weak signal communication and spectrum efficiency.',
  T8A12:
    'A disadvantage of FM compared to SSB is that only one signal can be received at a time due to the capture effect. SSB allows hearing multiple signals simultaneously on the same frequency.',

  // T8B - Amateur Satellites
  T8B01:
    'Satellite beacons typically transmit telemetry containing health and status information about the satellite. This helps operators know if the satellite is functioning properly.',
  T8B02:
    'Using excessive power on a satellite uplink can block access by other users. The satellite has limited resources, and overpowering can desensitize its receiver, preventing it from hearing weaker stations.',
  T8B03:
    'Satellite tracking programs provide real-time position maps, pass predictions (time, azimuth, elevation), and Doppler shift calculations. These are essential for successful satellite communication.',
  T8B04:
    'Amateur radio satellites use SSB, FM, CW, and data modes. Different satellites support different modes depending on their design and purpose.',
  T8B05:
    "A satellite beacon is a transmission from the satellite containing status information. It provides telemetry about the satellite's health, power systems, and other operating parameters.",
  T8B06:
    "Keplerian elements are the key inputs to satellite tracking programs. These orbital parameters describe the satellite's position and movement, allowing accurate pass predictions.",
  T8B07:
    'Doppler shift is the apparent change in frequency caused by relative motion between the satellite and Earth station. As the satellite approaches, frequency appears higher; as it recedes, frequency appears lower.',
  T8B08:
    'U/V mode means the satellite receives on UHF (70 cm band, the "U" uplink) and transmits on VHF (2 meter band, the "V" downlink). This is a common configuration for amateur satellites.',
  T8B09:
    'Spin fading is caused by rotation of the satellite and its antennas. As the satellite spins, antenna orientation changes relative to Earth stations, causing periodic signal strength variations.',
  T8B10:
    'LEO stands for Low Earth Orbit satellite. These satellites orbit relatively close to Earth (typically 150-2000 km altitude) and pass overhead quickly, requiring antenna tracking.',
  T8B11:
    'Anyone may receive telemetry from a space station. There are no restrictions on listening to satellite beacon transmissions - you only need a license to transmit.',
  T8B12:
    "To check your satellite uplink power level, your downlink signal strength should be about the same as the beacon. If your signal is much stronger, you're using too much power.",

  // T8C - Operating Activities
  T8C01:
    'Radio direction finding is used to locate sources of noise interference or jamming. By using directional antennas, operators can determine the direction of an unwanted signal.',
  T8C02:
    'A directional antenna is useful for hidden transmitter hunts (fox hunts). It allows you to determine which direction a signal is coming from, helping locate the hidden transmitter.',
  T8C03:
    'Contesting involves contacting as many stations as possible during a specified period. Contests test operating skill, station effectiveness, and propagation conditions.',
  T8C04:
    'Good contest procedure involves sending only the minimum information needed for proper identification and the contest exchange. Brevity allows more contacts to be made.',
  T8C05:
    'A grid locator (Maidenhead grid square) is a letter-number designator assigned to a geographic location. It provides a standardized way to describe locations for amateur radio purposes.',
  T8C06:
    'IRLP nodes are accessed over the air using DTMF signals (touch-tone codes). These codes control the node to connect to other nodes around the world.',
  T8C07:
    'VoIP (Voice Over Internet Protocol) is a method of delivering voice communications over the internet using digital techniques. In amateur radio, it enables linking repeaters worldwide.',
  T8C08:
    'IRLP (Internet Radio Linking Project) connects amateur radio systems like repeaters via the internet using VoIP. This allows stations to communicate globally through local repeaters.',
  T8C09:
    'EchoLink enables transmitting through a repeater without a radio. Operators can use a computer or smartphone with internet access to connect to EchoLink-equipped repeaters.',
  T8C10:
    'Using EchoLink requires registering your call sign and providing proof of license. This verification ensures only licensed amateurs can access the system.',
  T8C11:
    'A gateway is an amateur radio station that connects other stations to the internet. It bridges RF communications with internet-based services like IRLP or EchoLink.',

  // T8D - Digital Modes
  T8D01:
    'Packet radio, IEEE 802.11 (WiFi), and FT8 are all digital communications modes. Digital modes encode information as discrete values rather than continuous analog signals.',
  T8D02:
    "A DMR talkgroup is a way for groups of users to share a channel at different times without hearing other users. It's similar to a virtual channel within the DMR time slot.",
  T8D03:
    "APRS can transmit GPS position data, text messages, and weather data. It's a versatile digital system for sharing real-time information over amateur radio.",
  T8D04:
    'NTSC refers to an analog fast-scan color TV signal. It was the standard used for broadcast television in North America and is still used for amateur fast-scan TV.',
  T8D05:
    'APRS provides real-time tactical digital communications shown on a map with station locations. This makes it valuable for emergency communications and event coordination.',
  T8D06:
    "PSK stands for Phase Shift Keying. It's a digital modulation technique where information is encoded by changing the phase of the signal, used in modes like PSK31.",
  T8D07:
    'DMR (Digital Mobile Radio) is a technique for time-multiplexing two digital voice signals on a single 12.5 kHz channel. This doubles the capacity compared to analog FM.',
  T8D08:
    'Packet radio transmissions include a checksum for error detection, a header with destination call sign, and automatic repeat request (ARQ) for error correction. These ensure reliable data transfer.',
  T8D09:
    'CW is another name for Morse code transmission. The abbreviation stands for "Continuous Wave," referring to the unmodulated carrier that\'s keyed on and off.',
  T8D10:
    'WSJT-X software supports Earth-Moon-Earth (EME) communication, weak signal propagation beacons, and meteor scatter. These modes are optimized for extremely weak signal conditions.',
  T8D11:
    'ARQ (Automatic Repeat reQuest) is an error correction method where the receiving station detects errors and requests retransmission. This ensures accurate data transfer in digital modes.',
  T8D12:
    'An amateur radio mesh network uses commercial WiFi equipment with modified firmware to create a data network. This enables high-speed data communications using amateur frequencies.',
  T8D13:
    'FT8 is a digital mode capable of operation with very low signal-to-noise ratios. It uses sophisticated encoding and computer processing to decode signals that would be impossible to copy by ear.',

  // T9A - Antenna Fundamentals
  T9A01:
    'A beam antenna concentrates signals in one direction. This provides gain in the desired direction while reducing reception from and transmission to other directions.',
  T9A02:
    'Antenna loading involves electrically lengthening an antenna by inserting inductors (coils) in the radiating elements. This allows physically shorter antennas to operate at lower frequencies.',
  T9A03:
    "A simple dipole oriented parallel to Earth's surface is a horizontally polarized antenna. The electric field of its signal is horizontal, parallel to the ground.",
  T9A04:
    'The short, flexible antenna on handheld radios has low efficiency compared to a full-sized quarter-wave antenna. Much of the power is lost as heat rather than radiated.',
  T9A05:
    'Shortening a dipole antenna increases its resonant frequency. Resonant frequency is inversely related to antenna length - shorter antennas resonate at higher frequencies.',
  T9A06:
    'A Yagi antenna offers the greatest gain among the options. It uses multiple elements (reflector, driven element, directors) to focus energy in one direction.',
  T9A07:
    "Using a handheld with a flexible antenna inside a vehicle reduces signal strength due to the vehicle's shielding effect. The metal body blocks and absorbs RF signals.",
  T9A08:
    'A quarter-wave vertical for 146 MHz is approximately 19 inches long. This is calculated using the formula: 234/frequency(MHz) = length in feet, then converted to inches.',
  T9A09:
    'A half-wave 6-meter dipole is approximately 112 inches long (about 9.3 feet). The formula is 468/frequency(MHz) = length in feet for a half-wave dipole.',
  T9A10:
    'A half-wave dipole radiates strongest broadside to the antenna (perpendicular to the wire). The pattern has nulls off the ends and maximum radiation at right angles to the wire.',
  T9A11:
    'Antenna gain is the increase in signal strength in a specified direction compared to a reference antenna. It represents how well the antenna focuses energy in that direction.',
  T9A12:
    'A 5/8 wavelength whip antenna has more gain than a 1/4 wavelength antenna. The longer element provides a lower angle of radiation and about 3 dB more gain.',

  // T9B - Feed Lines and SWR
  T9B01:
    'Low SWR reduces signal loss in the feed line system. When SWR is low, more power reaches the antenna and less is reflected back or dissipated as heat.',
  T9B02:
    'The most common impedance of coaxial cables in amateur radio is 50 ohms. This standard matches most amateur transceivers and many antenna designs.',
  T9B03:
    'Coaxial cable is the most common feed line because it is easy to use and requires few special installation considerations. It can be routed around corners and through walls without special precautions.',
  T9B04:
    "An antenna tuner (coupler) matches the antenna system impedance to the transceiver's output impedance. This allows the transmitter to deliver full power even when the antenna isn't perfectly matched.",
  T9B05:
    'As frequency increases, the loss in coaxial cable also increases. This is why lower-loss cable is especially important for VHF and UHF applications.',
  T9B06:
    'Type N connectors are most suitable for frequencies above 400 MHz. They have better shielding and lower loss at UHF frequencies than PL-259 (UHF) connectors.',
  T9B07:
    'PL-259 connectors are commonly used at HF and VHF frequencies. Despite being called "UHF" connectors, they perform best at lower frequencies and have higher losses above 300 MHz.',
  T9B08:
    'Sources of loss in coaxial feed lines include water intrusion, high SWR, and multiple connectors. Each connector adds some loss, and moisture dramatically increases attenuation.',
  T9B09:
    'Erratic changes in SWR are typically caused by a loose connection in the antenna or feed line. As the connection moves, the impedance changes, causing SWR fluctuations.',
  T9B10:
    'RG-213 cable has less loss at a given frequency than RG-58. RG-213 is a larger diameter cable with lower loss, making it preferred for higher power and longer runs.',
  T9B11:
    'Air-insulated hardline has the lowest loss at VHF and UHF among the options. The air dielectric and larger diameter result in very low attenuation.',
  T9B12:
    'Standing wave ratio (SWR) is a measure of how well a load is matched to a transmission line. An SWR of 1:1 indicates perfect match; higher values indicate increasing mismatch.',

  // T0A - Electrical Safety
  T0A01:
    'A 12-volt storage battery can cause burns, fire, or explosion if its terminals are shorted. The high current capacity can cause metal to glow red-hot and ignite nearby materials.',
  T0A02:
    'Electrical current flowing through the body can heat tissue, disrupt cell electrical functions, and cause involuntary muscle contractions. All of these effects can be dangerous or fatal.',
  T0A03:
    'In US three-wire 120V cables, black wire insulation indicates the hot (live) conductor. This carries the voltage relative to neutral and ground.',
  T0A04:
    'A fuse removes power in case of overload. When current exceeds the fuse rating, the fuse element melts and opens the circuit, preventing damage or fire.',
  T0A05:
    "A 5-amp fuse should never be replaced with a 20-amp fuse because excessive current could cause a fire. The larger fuse won't blow until four times the safe current flows.",
  T0A06:
    'Good shock protection includes using three-wire cords with grounding plugs, connecting all equipment to a common safety ground, and installing mechanical interlocks in high-voltage circuits.',
  T0A07:
    'A lightning arrester should be installed on a grounded panel near where feed lines enter the building. This allows lightning energy to be diverted to ground before entering the structure.',
  T0A08:
    'A fuse or circuit breaker should be installed in series with the hot conductor only. The neutral should never be fused, as this could leave the hot conductor energized with no return path.',
  T0A09:
    'All external ground rods should be bonded together with heavy wire or conductive strap. This ensures a single, unified ground system that prevents dangerous voltage differences.',
  T0A10:
    'Charging or discharging a battery too quickly causes overheating or out-gassing. Batteries generate hydrogen gas when overheated, which can be explosive.',
  T0A11:
    'After turning off a power supply, charge stored in filter capacitors remains a hazard. Large capacitors can hold dangerous voltages for extended periods.',
  T0A12:
    'When measuring high voltages, ensure the voltmeter and leads are rated for the voltages being measured. Using inadequate equipment can cause arcing, damage, or injury.',

  // T0B - Tower and Antenna Safety
  T0B01:
    'Good practice for tower ground wires is ensuring connections are short and direct. Sharp bends and long runs can increase impedance and reduce lightning protection effectiveness.',
  T0B02:
    'When climbing a tower, you need proper training on safe climbing techniques, appropriate tie-off at all times, and an approved climbing harness. All these protect against falls.',
  T0B03:
    'A tower should never be climbed without a helper or observer present. If an accident occurs, someone must be available to call for help and provide assistance.',
  T0B04:
    'When putting up a tower, look for and stay clear of overhead electrical wires. Contact with power lines can cause electrocution, and even proximity can be dangerous.',
  T0B05:
    'A safety wire through a turnbuckle prevents loosening from vibration. Wind causes tower movement, and without safety wire, turnbuckles can gradually unthread.',
  T0B06:
    'The minimum safe distance from power lines is enough that if the antenna falls, no part can come closer than 10 feet to the wires. This provides a safety margin even in failure.',
  T0B07:
    'A crank-up tower must not be climbed unless fully retracted or mechanical safety locks are installed. The tower could collapse if climbed while extended without proper support.',
  T0B08:
    'Proper tower grounding uses separate eight-foot ground rods for each tower leg, with all rods bonded together and to the tower. This provides effective lightning protection.',
  T0B09:
    'Attaching an antenna to a utility pole should be avoided because the antenna could contact high-voltage power lines. Even if not touching, induced voltages can be dangerous.',
  T0B10:
    'When installing lightning protection ground conductors, sharp bends must be avoided. Sharp bends increase impedance and can cause lightning to jump across rather than follow the conductor.',
  T0B11:
    'Local electrical codes establish grounding requirements for amateur towers and antennas. These codes ensure safety and may require permits and inspections.',

  // T0C - RF Exposure Safety
  T0C01:
    'Radio signals are non-ionizing radiation. Unlike X-rays or gamma rays, RF energy does not have enough energy to ionize atoms or break chemical bonds in DNA.',
  T0C02:
    'Maximum permissible exposure has its lowest value (most restrictive) around 50 MHz. The human body absorbs RF energy most efficiently in this frequency range.',
  T0C03:
    'If duty cycle decreases from 100% to 50%, allowable power density increases by a factor of 2. Lower duty cycle means less average exposure, so higher instantaneous levels are acceptable.',
  T0C04:
    "RF exposure depends on frequency, power level, distance from the antenna, and the antenna's radiation pattern. All these factors determine how much RF energy reaches people.",
  T0C05:
    'Exposure limits vary with frequency because the human body absorbs more RF energy at some frequencies than others. The body resonates around 30-300 MHz, increasing absorption.',
  T0C06:
    'Compliance with RF exposure regulations can be determined by calculations from FCC OET Bulletin 65, computer modeling, or calibrated field strength measurements. All are acceptable methods.',
  T0C07:
    'Touching an antenna during transmission can cause RF burns to skin. High RF current at the antenna can heat tissue rapidly, causing burns similar to thermal burns.',
  T0C08:
    'Relocating antennas can reduce RF exposure by increasing distance from people or directing radiation away from occupied areas. This is often the most practical solution.',
  T0C09:
    'Staying in compliance with RF safety regulations requires re-evaluating the station whenever the transmitter or antenna system is changed. Changes can affect exposure levels.',
  T0C10:
    'Duty cycle affects RF exposure levels because it determines the average exposure to radiation. Transmitting half the time means half the average exposure compared to continuous transmission.',
  T0C11:
    'Duty cycle is defined as the percentage of time that a transmitter is transmitting during the averaging period. A 50% duty cycle means the transmitter is on half the time.',
  T0C12:
    'RF radiation differs from ionizing radiation because RF does not have sufficient energy to cause chemical changes in cells and damage DNA. RF causes thermal effects rather than ionization.',
  T0C13:
    'The station licensee is responsible for ensuring no person is exposed to RF energy above FCC limits. This includes taking steps to evaluate and control exposure at the station.',
}

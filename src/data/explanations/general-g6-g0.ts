/**
 * Explanations for General G6-G0 Questions
 *
 * G6: Circuit Components (diodes, transistors, ICs)
 * G7: Practical Circuits (power supplies, filters, oscillators)
 * G8: Signals and Emissions (modulation, bandwidth, digital)
 * G9: Antennas and Feed Lines (dipoles, yagis, feedlines)
 * G0: Electrical and RF Safety (grounding, RF exposure)
 */

export const explanationsG6G0: Record<string, string> = {
  // ===== G6A - Resistors, capacitors, inductors, semiconductors =====

  G6A01:
    'A standard 12-volt lead-acid battery should not be discharged below 10.5 volts to maximize its lifespan. Discharging below this threshold causes sulfation on the plates, permanently reducing capacity and shortening battery life.',

  G6A02:
    'Batteries with low internal resistance can deliver high discharge current because less energy is lost as heat within the battery itself. This is important for applications requiring sudden high-current demands like transmitting.',

  G6A03:
    'Germanium diodes have a forward threshold voltage of approximately 0.3 volts, which is lower than silicon diodes. This characteristic made them popular in early radio circuits and some detector applications.',

  G6A04:
    'Electrolytic capacitors offer high capacitance for a given volume due to their construction using a thin oxide layer as the dielectric. This makes them ideal for power supply filtering, though they have polarity requirements.',

  G6A05:
    "Silicon junction diodes have a forward threshold voltage of approximately 0.7 volts. This is the voltage drop across the diode when it is conducting and is higher than germanium due to silicon's larger bandgap.",

  G6A06:
    'Wire-wound resistors should not be used in RF circuits because the wire coil acts as an inductor, adding unpredictable reactance at radio frequencies. This inductance can cause circuit performance to vary unexpectedly.',

  G6A07:
    'A bipolar transistor used as a switch operates at two extremes: saturation (fully on, minimum resistance) and cutoff (fully off, maximum resistance). The active region between these states is used for linear amplification, not switching.',

  G6A08:
    'Low voltage ceramic capacitors are characterized by their comparatively low cost, making them popular for general-purpose applications. They offer reasonable performance at an economical price point.',

  G6A09:
    'MOSFET (Metal-Oxide-Semiconductor Field Effect Transistor) construction features a gate separated from the channel by a thin insulating oxide layer. This provides extremely high input impedance since no current flows through the gate.',

  G6A10:
    'The control grid in a vacuum tube regulates electron flow between the cathode and plate. Small voltage changes on the control grid create large changes in plate current, enabling amplification.',

  G6A11:
    'When an inductor operates above its self-resonant frequency, its parasitic capacitance dominates and it behaves capacitively. This occurs because every inductor has some capacitance between its windings.',

  G6A12:
    'The screen grid in a vacuum tube reduces grid-to-plate capacitance, which prevents unwanted feedback that could cause oscillation. This improvement allowed higher gain amplifier designs.',

  // ===== G6B - Integrated circuits, ferrite cores, connectors =====

  G6B01:
    'Ferrite core performance at different frequencies is determined by the composition or "mix" of materials used. Different ferrite formulations are optimized for specific frequency ranges, from audio to microwave.',

  G6B02:
    'MMIC stands for Monolithic Microwave Integrated Circuit, a type of IC designed specifically for microwave frequency applications. All components are fabricated on a single semiconductor substrate.',

  G6B03:
    'CMOS (Complementary Metal-Oxide-Semiconductor) integrated circuits have low power consumption compared to TTL because they only draw significant current during switching transitions, not in static states.',

  G6B04:
    "BNC connectors rated at 50 ohms can maintain low SWR operation up to approximately 4 GHz. Beyond this frequency, the connector's physical dimensions become significant relative to wavelength, causing impedance discontinuities.",

  G6B05:
    'Ferrite core toroidal inductors offer multiple advantages: large inductance values are achievable, the magnetic properties can be optimized for specific frequencies, and the toroidal shape contains most of the magnetic field within the core, reducing interference.',

  G6B06:
    'An integrated circuit operational amplifier (op-amp) is an analog device designed to amplify the difference between its two inputs. Despite being in IC form, it processes continuous signals rather than digital ones.',

  G6B07:
    'The Type N connector is a moisture-resistant RF connector useful to 10 GHz. Its threaded coupling provides a secure, weatherproof connection suitable for outdoor and high-frequency applications.',

  G6B08:
    'An LED (Light Emitting Diode) emits light when forward biased, meaning current flows from anode to cathode. The energy released when electrons recombine with holes is emitted as photons.',

  G6B10:
    "A ferrite bead or core reduces common-mode RF current by creating an impedance in the current's path. The ferrite's magnetic properties add inductive reactance that impedes RF while allowing DC and low frequencies to pass.",

  G6B11:
    'An SMA (SubMiniature version A) connector is a small threaded RF connector suitable for signals up to several GHz. Its compact size makes it popular for test equipment and internal connections.',

  G6B12:
    'RCA Phono connectors are commonly used for low frequency or DC signal connections to transceivers, such as audio input/output and accessory connections. They are not suitable for RF frequencies.',

  // ===== G7A - Power supplies, schematic symbols =====

  G7A01:
    'A bleeder resistor in a power supply discharges the filter capacitors when power is removed. This safety feature prevents dangerous shock from stored energy in large capacitors.',

  G7A02:
    'Power supply filter networks use capacitors and inductors to smooth the pulsating DC from the rectifier into steady DC. Capacitors store charge during peaks while inductors resist current changes.',

  G7A03:
    'A full-wave rectifier using two diodes requires a center-tapped transformer. Each diode conducts on alternate half-cycles, with the center tap providing the return path, utilizing both halves of the AC waveform.',

  G7A04:
    'A half-wave rectifier requires only one diode because it only uses one polarity of the AC input cycle. This simplicity comes at the cost of more ripple and lower efficiency compared to full-wave designs.',

  G7A05:
    'A half-wave rectifier converts 180 degrees of the AC cycle to DC, blocking the negative half-cycle entirely. This results in output pulses at the same frequency as the AC input.',

  G7A06:
    'A full-wave rectifier converts 360 degrees of the AC cycle to DC by flipping the negative half-cycle to positive. Both halves of the input waveform contribute to the output.',

  G7A07:
    'An unfiltered full-wave rectifier produces DC pulses at twice the frequency of the AC input. This is because both positive and negative input half-cycles create positive output pulses.',

  G7A08:
    'Switchmode power supplies operate at high frequencies, allowing the use of smaller transformers and filter components. The higher frequency reduces the size of magnetic and capacitive components needed.',

  G7A09:
    'Symbol 1 in Figure G7-1 represents a field effect transistor (FET). FETs are identified by the gate terminal connected to the channel through a perpendicular line, distinct from the base of bipolar transistors.',

  G7A10:
    'Symbol 5 in Figure G7-1 represents a Zener diode. It is distinguished from a regular diode by the bent line at the cathode end, indicating its voltage regulation capability.',

  G7A11:
    'Symbol 2 in Figure G7-1 represents an NPN junction transistor. The arrow on the emitter points outward (Not Pointing iN), indicating the direction of conventional current flow.',

  G7A12:
    'Symbol 6 in Figure G7-1 represents a solid core transformer. The solid lines between the windings indicate an iron or ferrite core, as opposed to air-core transformers which have no lines.',

  G7A13:
    'Symbol 7 in Figure G7-1 represents a tapped inductor. The tap provides an intermediate connection point along the coil, allowing different inductance values from a single component.',

  // ===== G7B - Amplifiers, digital circuits =====

  G7B01:
    'Neutralizing an amplifier eliminates self-oscillations by canceling unwanted feedback from output to input. Without neutralization, stray capacitance can cause the amplifier to generate spurious signals.',

  G7B02:
    'Class C amplifiers have the highest efficiency among the listed classes, typically 60-80%. This is achieved by conducting for less than half the input cycle, though this makes them unsuitable for linear amplification.',

  G7B03:
    'A two-input AND gate produces a high output only when both inputs are high. Any low input results in a low output, making it useful for detecting when multiple conditions are simultaneously true.',

  G7B04:
    'In a Class A amplifier, the amplifying device conducts 100% of the time. This provides excellent linearity for faithful signal reproduction but results in low efficiency, typically around 25-50%.',

  G7B05:
    'A 3-bit binary counter has 8 states (2^3 = 8), counting from 000 to 111 in binary, or 0 to 7 in decimal. Each additional bit doubles the number of possible states.',

  G7B06:
    'A shift register is a clocked array of circuits that passes data in steps along the array with each clock pulse. It can convert between serial and parallel data formats or provide time delays.',

  G7B07:
    'A sine wave oscillator consists of a filter and an amplifier operating in a feedback loop. The filter determines the oscillation frequency while the amplifier maintains the signal level.',

  G7B08:
    'RF power amplifier efficiency is determined by dividing the RF output power by the DC input power. Higher efficiency means less power is wasted as heat and more is converted to useful RF output.',

  G7B09:
    'The frequency of an LC oscillator is determined by the inductance and capacitance in the tank circuit. The resonant frequency follows the formula f = 1/(2 pi sqrt(LC)).',

  G7B10:
    'A linear amplifier is one in which the output preserves the input waveform without distortion. This is essential for SSB and other modes where signal shape carries information.',

  G7B11:
    "Class C power stages are appropriate for FM because FM is a constant-envelope mode where amplitude variations don't carry information. The high efficiency of Class C is advantageous when linearity is not required.",

  // ===== G7C - Receivers, transmitters, filters, SDR =====

  G7C01:
    'A filter is used to select one sideband from a balanced modulator output. The balanced modulator produces double-sideband suppressed-carrier, and the filter passes only the desired sideband for SSB transmission.',

  G7C02:
    'A balanced modulator produces double-sideband modulated RF with the carrier suppressed. The carrier cancels due to the balanced circuit design, leaving only the sum and difference frequencies.',

  G7C03:
    'An impedance matching transformer at a transmitter output presents the desired impedance to both the transmitter and feed line. Proper matching maximizes power transfer and protects the transmitter.',

  G7C04:
    'A product detector is used in a single sideband receiver to extract the modulated signal by mixing it with a local oscillator (BFO). This reinserts the carrier that was suppressed during transmission.',

  G7C05:
    'A direct digital synthesizer (DDS) produces variable output frequency with the stability of a crystal oscillator. The digital circuitry is clocked by a stable reference, providing precise frequency control.',

  G7C06:
    'DSP (Digital Signal Processing) filters offer the advantage of creating a wide range of filter bandwidths and shapes in software. Changing filter characteristics requires only software changes, not component swaps.',

  G7C07:
    "Insertion loss specifies a filter's attenuation inside its passband. It represents the signal power lost even at frequencies the filter is designed to pass.",

  G7C08:
    'Receiver sensitivity is affected by all listed parameters: input amplifier gain, demodulator stage bandwidth, and input amplifier noise figure. These factors together determine the minimum detectable signal.',

  G7C09:
    'In software-defined radio, the I (In-phase) and Q (Quadrature) RF signals are 90 degrees apart. This phase relationship allows the SDR to distinguish between positive and negative frequencies.',

  G7C10:
    'I-Q modulation in SDRs allows all types of modulation to be created with appropriate processing. The combination of two 90-degree-shifted signals can represent any amplitude and phase, enabling universal modulation.',

  G7C11:
    'In a software-defined radio, filtering, detection, and modulation are all performed by software. This flexibility allows a single hardware platform to support many different modes.',

  G7C12:
    "The cutoff frequency is the frequency above which a low-pass filter's output power drops to less than half the input power. This -3 dB point defines the filter's bandwidth.",

  G7C13:
    "Ultimate rejection specifies a filter's maximum ability to reject signals outside its passband. It represents the filter's performance far from the passband where attenuation is greatest.",

  G7C14:
    'Band-pass filter bandwidth is measured between the upper and lower half-power points (-3 dB points). These frequencies define where the filter begins to significantly attenuate the signal.',

  // ===== G8A - Modulation types, bandwidth =====

  G8A01:
    "Direct binary FSK modulation is generated by changing an oscillator's frequency directly with a digital control signal. The binary data shifts the frequency between two values representing 0 and 1.",

  G8A02:
    'Phase modulation is the process that changes the phase angle of an RF signal to convey information. The carrier frequency remains constant while its phase shifts according to the modulating signal.',

  G8A03:
    'Frequency modulation changes the instantaneous frequency of an RF wave to convey information. The carrier amplitude stays constant while frequency varies with the modulating signal.',

  G8A04:
    'A reactance modulator connected to a transmitter RF amplifier stage produces phase modulation. The reactive element varies the effective tuning, creating phase shifts that are mathematically related to FM.',

  G8A05:
    'Amplitude modulation varies the instantaneous power level of the RF signal. The carrier frequency stays constant while its amplitude changes according to the audio or data being transmitted.',

  G8A06:
    'QPSK31 has several characteristics: it is sideband sensitive, its encoding provides error correction, and its bandwidth is approximately the same as BPSK31. These features make it robust while maintaining narrow bandwidth.',

  G8A07:
    'Single sideband uses the narrowest bandwidth among phone emissions because it transmits only one sideband without the carrier. FM and PM require more bandwidth due to their multiple sidebands.',

  G8A08:
    'Overmodulation causes excessive bandwidth because it creates spurious sidebands that spread beyond the normal signal bandwidth. This interferes with adjacent channels and is prohibited.',

  G8A09:
    'FT8 uses 8-tone frequency shift keying modulation. Eight distinct frequencies represent different symbol combinations, providing good performance under weak signal conditions.',

  G8A10:
    'Flat-topping refers to signal distortion caused by excessive drive or speech levels. The peaks of the modulation envelope are clipped, creating spurious emissions and poor audio quality.',

  G8A11:
    'The modulation envelope of an AM signal is the waveform created by connecting the peak values of the modulated signal. It represents the shape of the modulating audio impressed on the carrier.',

  G8A12:
    'QPSK (Quadrature Phase Shift Keying) modulation transmits digital data using 0, 90, 180, and 270 degree phase shifts to represent pairs of bits. Each symbol carries two bits of information.',

  G8A13:
    'A link budget is the sum of transmit power and antenna gains minus system losses as seen at the receiver. It determines whether a communication link will have adequate signal strength.',

  G8A14:
    'Link margin is the difference between received power level and minimum required signal level at the receiver input. It provides a safety factor to account for fading and other signal variations.',

  // ===== G8B - Mixing, intermodulation, bandwidth calculations =====

  G8B01:
    'The local oscillator input of a mixer is varied or tuned to convert signals of different frequencies to the intermediate frequency. Changing the LO frequency selects which input frequency appears at the IF.',

  G8B02:
    'Image response is interference from a signal at twice the IF frequency from the desired signal. This unwanted signal also mixes with the local oscillator to produce the same IF frequency.',

  G8B03:
    'Heterodyning is another term for mixing two RF signals. The process produces sum and difference frequencies from the original signals.',

  G8B04:
    'A multiplier stage in a VHF FM transmitter generates a harmonic of a lower frequency signal to reach the desired operating frequency. This also multiplies the frequency deviation proportionally.',

  G8B05:
    'Odd-order intermodulation products are closest to the original signal frequencies. Third-order products (2F1-F2, 2F2-F1) are particularly troublesome because they fall near the desired signals.',

  G8B06:
    "An FM transmission with 5 kHz deviation and 3 kHz modulating frequency has a total bandwidth of 16 kHz. Using Carson's rule: BW = 2(deviation + modulating frequency) = 2(5 + 3) = 16 kHz.",

  G8B07:
    'For a 12.21 MHz oscillator multiplied to 146.52 MHz with 5 kHz final deviation, the oscillator deviation is 416.7 Hz. The multiplication factor is 146.52/12.21 = 12, so 5000/12 = 416.7 Hz.',

  G8B08:
    "Knowing the duty cycle of your transmission mode is important because some modes have high duty cycles that could exceed the transmitter's average power rating. Continuous modes stress the transmitter more than intermittent ones.",

  G8B09:
    'Matching receiver bandwidth to the operating mode bandwidth results in the best signal-to-noise ratio. Wider bandwidth admits more noise, while narrower bandwidth may cut off parts of the signal.',

  G8B10:
    'Higher symbol rates require wider bandwidth because faster changes in the signal require more frequency spectrum to represent them. This is a fundamental relationship in digital communications.',

  G8B11:
    'A mixer produces the sum and difference of its Local Oscillator and RF input frequencies in its output. These frequency combinations are the basis of superheterodyne receiver operation.',

  G8B12:
    'Intermodulation is the process that combines two signals in a non-linear circuit to produce unwanted spurious outputs. These products can cause interference to other frequencies.',

  G8B13:
    '2F1-F2 is a third-order intermodulation product (2+1=3). The order is determined by adding the absolute values of the frequency coefficients.',

  // ===== G8C - Digital modes, protocols =====

  G8C01:
    'Amateurs share the 2.4 GHz band with unlicensed Wi-Fi service. Both services operate on a secondary basis and must accept interference from each other.',

  G8C02:
    'WSPR (Weak Signal Propagation Reporter) is a digital mode used as a low-power beacon for assessing HF propagation. Stations transmit and receive to map propagation paths worldwide.',

  G8C03:
    'The header part of a packet radio frame contains routing and handling information. This includes source and destination addresses, protocol information, and other control data.',

  G8C04:
    'Baudot code is a 5-bit code with additional start and stop bits, used in RTTY communications. The limited character set (32 combinations) requires "shift" characters to access letters and figures.',

  G8C05:
    'A NAK (Negative Acknowledgment) response in ARQ mode means the receiving station requests retransmission of the packet. This indicates errors were detected that could not be corrected.',

  G8C06:
    'When ARQ mode fails due to excessive transmission attempts, the connection is dropped. The protocol gives up after repeated failures indicate the link is unreliable.',

  G8C07:
    'FT8 can receive signals with very low signal-to-noise ratios, down to about -21 dB. Its design includes strong forward error correction and structured message formats optimized for weak signals.',

  G8C08:
    'In PSK31, upper case letters use longer Varicode bit sequences and thus slow down transmission. Using lower case improves throughput because shorter codes are used.',

  G8C09:
    'In mesh network microwave nodes, if one node fails, a packet may still reach its target via an alternate node. The mesh topology provides redundant paths for improved reliability.',

  G8C10:
    'Forward error correction (FEC) allows error correction by transmitting redundant information with the data. The receiver uses this redundancy to detect and correct errors without retransmission.',

  G8C11:
    'The two frequencies of a Frequency Shift Keyed (FSK) signal are identified as mark and space. Mark traditionally represents the higher frequency and corresponds to a "1" bit.',

  G8C12:
    'PSK31 uses Varicode for sending characters. Varicode assigns shorter codes to common characters and longer codes to rare ones, improving average transmission speed.',

  G8C13:
    'Vertical lines on either side of a data mode signal on a waterfall display indicate overmodulation. The excessive signal level creates spurious emissions that appear as these sidebands.',

  G8C14:
    'A waterfall display shows frequency on the horizontal axis, signal strength as intensity (brightness or color), and time on the vertical axis. Signals appear to "fall" down the screen over time.',

  G8C15:
    'An FT8 signal report of +3 means the signal-to-noise ratio is equivalent to +3 dB in a 2.5 kHz bandwidth. This standardized reference bandwidth allows consistent signal comparisons.',

  G8C16:
    'DMR, D-STAR, and SystemFusion provide digital voice modes for amateur radio. These systems encode voice digitally for transmission over radio frequencies.',

  // ===== G9A - Feed lines, SWR =====

  G9A01:
    'The characteristic impedance of a parallel conductor feed line is determined by the distance between conductor centers and the radius of the conductors. These physical dimensions set the inductance and capacitance per unit length.',

  G9A02:
    'High SWR increases loss in a lossy transmission line because the reflected power travels through the line multiple times, losing energy with each pass. The additional loss is proportional to both SWR and line loss.',

  G9A03:
    'Window line transmission line has a nominal characteristic impedance of 450 ohms. The wide spacing between conductors in the ladder-line construction creates this high impedance.',

  G9A04:
    'Reflected power at an antenna feed point is caused by a difference between feed line impedance and antenna feed point impedance. A mismatch causes some power to reflect back toward the transmitter.',

  G9A05:
    'Coaxial cable attenuation increases with frequency due to skin effect and dielectric losses. Higher frequencies experience more loss per unit length, making coax selection critical for UHF/microwave.',

  G9A06:
    'RF feed line loss is usually expressed in decibels per 100 feet. This unit allows easy calculation of total loss for any line length and comparison between different cable types.',

  G9A07:
    'To prevent standing waves on a feed line, the antenna feed point impedance must be matched to the characteristic impedance of the feed line. This ensures all power is absorbed by the antenna.',

  G9A08:
    'A matching network at the transmitter presents 1:1 SWR to the transmitter but does not change the SWR on the feed line itself, which remains 5:1. The mismatch still exists between line and antenna.',

  G9A09:
    'Connecting a 50-ohm feed line to a 200-ohm resistive load produces a 4:1 SWR. SWR equals the higher impedance divided by the lower (200/50 = 4).',

  G9A10:
    'Connecting a 50-ohm feed line to a 10-ohm resistive load produces a 5:1 SWR. Again, SWR equals the higher impedance divided by the lower (50/10 = 5).',

  G9A11:
    'Higher transmission line loss reduces SWR measured at the input because the reflected wave is attenuated on its return trip. This can mask a significant mismatch at the antenna.',

  // ===== G9B - Basic antenna types and patterns =====

  G9B01:
    'A random-wire HF antenna connected directly to the transmitter may cause station equipment to carry significant RF current. Without proper matching and choking, RF can flow on equipment chassis and cause interference.',

  G9B02:
    'Sloping the radials downward adjusts the feed point impedance of an elevated quarter-wave ground-plane antenna to approximately 50 ohms. Horizontal radials produce about 36 ohms.',

  G9B03:
    'A quarter-wave ground-plane vertical antenna has an omnidirectional radiation pattern in azimuth. It radiates equally in all horizontal directions while having a defined elevation pattern.',

  G9B04:
    'A dipole antenna in free space has a figure-eight radiation pattern at right angles to the antenna in the plane containing the conductor. Maximum radiation is broadside to the wire.',

  G9B05:
    'When a horizontal dipole is less than 1/2 wavelength high, the azimuthal pattern at high elevation angles becomes almost omnidirectional. Ground reflections fill in the nulls off the antenna ends.',

  G9B06:
    'Radial wires of a ground-mounted vertical antenna should be placed on the surface or buried a few inches below the ground. This provides the necessary ground plane for the antenna system.',

  G9B07:
    'The feed point impedance of a horizontal 1/2 wave dipole steadily decreases as antenna height is reduced to 1/10 wavelength. Ground proximity affects the impedance significantly.',

  G9B08:
    'The feed point impedance of a 1/2 wave dipole steadily increases as the feed point is moved from center toward the ends. Current is maximum at center (low impedance) and minimum at ends (high impedance).',

  G9B09:
    'Horizontally polarized HF antennas have lower ground losses compared to vertically polarized antennas. Vertical antennas require an extensive ground system to minimize losses.',

  G9B10:
    'A 1/2 wave dipole for 14.250 MHz is approximately 33 feet long. Using the formula 468/frequency(MHz) gives 468/14.25 = 32.8 feet.',

  G9B11:
    'A 1/2 wave dipole for 3.550 MHz is approximately 132 feet long. Using 468/3.55 = 131.8 feet.',

  G9B12:
    'A 1/4 wave monopole for 28.5 MHz is approximately 8 feet long. Using 234/28.5 = 8.2 feet.',

  // ===== G9C - Directional antennas, Yagi design =====

  G9C01:
    'Larger-diameter elements increase the bandwidth of a Yagi antenna. Thicker elements have a lower Q, which broadens the frequency range over which the antenna performs well.',

  G9C02:
    'The driven element of a Yagi antenna is approximately 1/2 wavelength long. This is the element connected to the feed line, typically a dipole or folded dipole.',

  G9C03:
    'In a three-element Yagi, the reflector is longer and the director is shorter than the driven element. The reflector is typically 5% longer, and directors are 5% shorter.',

  G9C04:
    'Gain in dBi is 2.15 dB higher than gain in dBd for the same antenna. dBi references an isotropic radiator while dBd references a dipole, and a dipole has 2.15 dB gain over isotropic.',

  G9C05:
    'Increasing boom length and adding directors to a Yagi antenna increases gain. More elements and longer boom provide more control over the radiation pattern.',

  G9C07:
    'Front-to-back ratio measures the power radiated in the major lobe compared to that in the opposite direction. Higher ratios indicate better rejection of signals from behind the antenna.',

  G9C08:
    'The main lobe of a directive antenna is the direction of maximum radiated field strength from the antenna. This is where the antenna concentrates its transmitted and received energy.',

  G9C09:
    'Two three-element Yagis stacked vertically 1/2 wavelength apart provide approximately 3 dB higher gain than a single Yagi. Doubling the effective aperture doubles the power, which is 3 dB.',

  G9C10:
    'Forward gain, front-to-back ratio, and SWR bandwidth of a Yagi can all be optimized by adjusting element length, spacing, and boom length. These parameters interact to determine antenna performance.',

  G9C11:
    'A beta or hairpin match is a shorted transmission line stub placed at the feed point of a Yagi antenna to provide impedance matching. It adds inductive reactance to cancel capacitive reactance.',

  G9C12:
    'A gamma match does not require the driven element to be insulated from the boom. The matching section connects to one side of the driven element, allowing direct boom mounting.',

  // ===== G9D - Specialized antennas =====

  G9D01:
    'A horizontal dipole placed between 1/10 and 1/4 wavelength above ground is most effective for NVIS (Near Vertical Incidence Skywave) communications. This low height favors high-angle radiation for short-skip.',

  G9D02:
    'An end-fed half-wave antenna has very high feed point impedance, typically several thousand ohms. This is because the feed point is at a voltage maximum where current is minimum.',

  G9D03:
    'A VHF/UHF halo antenna radiates omnidirectionally in the plane of the halo. This makes it useful for mobile and base stations needing all-around horizontal coverage.',

  G9D04:
    'Antenna traps enable multiband operation by electrically shortening or isolating sections of the antenna at different frequencies. Each trap acts as a high impedance at its resonant frequency.',

  G9D05:
    'Vertically stacking horizontally polarized Yagi antennas narrows the main lobe in elevation. This concentrates more signal energy toward the horizon, improving long-distance performance.',

  G9D06:
    'The main advantage of a log-periodic antenna is wide bandwidth. Its design maintains relatively constant gain and impedance across a frequency range of 2:1 or more.',

  G9D07:
    'In a log-periodic antenna, element length and spacing vary logarithmically along the boom. This geometric progression creates the wide bandwidth characteristic.',

  G9D08:
    'A screwdriver mobile antenna adjusts its feed point impedance by varying the base loading inductance. A motor-driven coil allows remote tuning while mobile.',

  G9D09:
    'A Beverage antenna is used primarily for directional receiving on MF and low HF bands. Its long length (one to several wavelengths) makes it impractical for transmitting but excellent for reducing noise.',

  G9D10:
    'An electrically small loop (less than 1/10 wavelength circumference) has nulls broadside to the loop. Maximum response is in the plane of the loop, making it useful for direction finding.',

  G9D11:
    'A disadvantage of multiband antennas is poor harmonic rejection. An antenna resonant on one band may also be resonant on a harmonic frequency, potentially radiating spurious emissions.',

  G9D12:
    'A dipole with a single central support is commonly called an inverted V. The center is at the apex with the ends angling downward, resembling the letter V turned upside down.',

  // ===== G0A - RF safety, exposure limits =====

  G0A01:
    'RF energy affects human body tissue primarily by heating it. Radio frequency radiation is non-ionizing and causes thermal effects rather than the chemical damage associated with ionizing radiation.',

  G0A02:
    'RF exposure from a transmitted signal is determined by duty cycle, frequency, and power density. All these factors affect how much RF energy reaches and is absorbed by the body.',

  G0A03:
    'Station compliance with FCC RF exposure regulations can be determined by calculation based on OET Bulletin 65, computer modeling, or measurement with calibrated equipment. Any of these methods is acceptable.',

  G0A04:
    'Time averaging in RF exposure evaluation means the total RF exposure is averaged over a certain period, typically 6 or 30 minutes depending on the environment. This accounts for intermittent transmission.',

  G0A05:
    'If your station exceeds permissible RF exposure limits, you must take action to prevent human exposure to the excessive RF fields. This might include reducing power, raising antennas, or restricting access.',

  G0A06:
    'If your station fails to meet FCC RF exposure exemption criteria, you must perform an RF exposure evaluation in accordance with FCC OET Bulletin 65. This calculation determines if limits are exceeded.',

  G0A07:
    'A lower duty cycle permits greater power levels to be transmitted while staying within RF exposure limits. Less total RF energy is transmitted when transmitting for a smaller percentage of time.',

  G0A08:
    'Amateur operators must perform a routine RF exposure evaluation and prevent access to any identified high exposure areas. This ensures people are not exposed to fields exceeding MPE limits.',

  G0A09:
    'A calibrated field strength meter with a calibrated antenna can accurately measure RF field strength. This direct measurement provides the most accurate assessment of actual exposure levels.',

  G0A10:
    "If a neighbor might exceed RF exposure limits from your directional antenna's main lobe, you must ensure the antenna cannot be pointed in their direction when they are present. Physical barriers or operational restrictions may be needed.",

  G0A11:
    'Indoor transmitting antennas require ensuring that MPE (Maximum Permissible Exposure) limits are not exceeded in occupied areas. Indoor installation concentrates RF energy where people may be present.',

  G0A12:
    'All stations with time-averaged transmission of more than one milliwatt are subject to FCC RF exposure rules. This threshold essentially includes all active amateur stations.',

  // ===== G0B - Electrical safety, station grounding =====

  G0B01:
    'In a four-conductor 240 VAC circuit, only the hot wires should be attached to fuses or circuit breakers. The neutral and ground wires must never be fused or they cannot provide their safety functions.',

  G0B02:
    'The National Electrical Code requires minimum AWG number 12 wire for circuits with a 20-ampere circuit breaker. Smaller wire would overheat at the rated current capacity.',

  G0B03:
    'AWG number 14 wire should be used with a 15-ampere fuse or circuit breaker. The wire gauge must be matched to the overcurrent protection device to prevent fire hazards.',

  G0B04:
    "A station's lightning protection ground system should be located outside the building. This keeps lightning energy outside the structure and provides the shortest path to earth ground.",

  G0B05:
    'A GFCI (Ground Fault Circuit Interrupter) disconnects power when current flows directly to ground from the hot wires, bypassing the neutral. This detects potentially lethal current paths through a person.',

  G0B06:
    'The National Electrical Code covers electrical safety of the station, including wiring, grounding, and overcurrent protection. It does not cover RF exposure or emissions.',

  G0B07:
    "When climbing a tower with a safety harness, confirm that the harness is rated for the climber's weight and within its allowable service life. Harness materials degrade over time and use.",

  G0B08:
    'Before climbing a tower with electrical devices, make sure all power circuits are locked out and tagged. This prevents accidental energization while someone is working on the tower.',

  G0B09:
    'Emergency generators should be operated in well-ventilated areas to prevent carbon monoxide poisoning. The exhaust fumes from internal combustion engines are deadly in enclosed spaces.',

  G0B10:
    'Lead-tin solder poses a danger because lead can contaminate food if hands are not washed after handling. Lead is toxic when ingested, so good hygiene practices are essential.',

  G0B11:
    'Lightning protection ground rods must be bonded together with all other grounds. This creates a single-point ground system that prevents dangerous voltage differences between grounds during a strike.',

  G0B12:
    'A power supply interlock ensures that dangerous voltages are removed if the cabinet is opened. This protects service personnel from accidentally contacting high voltage components.',

  G0B13:
    'Lightning arrestors should be located where the feed lines enter the building. This stops lightning-induced surges at the building entrance before they can damage indoor equipment.',
}

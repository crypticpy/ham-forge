/**
 * Explanations for Technician T4-T6 Questions
 * T4: Amateur Radio Practices (station setup, RF hazards)
 * T5: Electrical Principles (Ohm's law, power, resistance)
 * T6: Circuit Components (resistors, capacitors, transistors)
 */

export const explanationsT4T6: Record<string, string> = {
  // ============================================
  // T4A - Station Setup
  // ============================================
  T4A01:
    'A 50-watt FM transceiver typically requires 13.8 volts DC (standard vehicle/radio voltage) at 12 amperes. Higher wattage transmitters draw more current, and the 13.8V at 12A combination provides the roughly 165 watts needed to produce 50 watts of RF output plus power for receiver circuits and losses.',

  T4A02:
    'SWR meters must be matched to the frequency range and power level you intend to measure. Using a meter designed for HF on VHF frequencies, or one rated for QRP power on a 100-watt signal, will give inaccurate readings or potentially damage the meter.',

  T4A03:
    'Short, heavy-gauge wires minimize voltage drop during high-current transmission. When a radio draws 10-20 amps while transmitting, thin or long wires create significant resistance that reduces the voltage reaching the radio, potentially causing reduced power output or erratic operation.',

  T4A04:
    "FT8 is a digital mode that uses sound card audio to encode and decode signals. The transceiver audio output connects to the computer's audio input (line in), and the computer's audio output connects to the transceiver's audio input, with WSJT-X software handling the digital signal processing.",

  T4A05:
    'An RF power meter measures the actual RF power flowing through the transmission line, so it must be placed between the transmitter and antenna. This position allows accurate measurement of forward power and, in many meters, reflected power to calculate SWR.',

  T4A06:
    'A computer-radio interface for digital modes handles three essential signals: receive audio (from radio to computer for decoding), transmit audio (from computer to radio for encoding), and transmitter keying (PTT control to switch the radio between receive and transmit).',

  T4A07:
    "To hear the received audio on a computer, connect the transceiver's speaker or audio output to the computer's \"line in\" input. This routes the demodulated audio from the radio to the computer's sound card for processing by digital mode software.",

  T4A08:
    "Flat copper strap is preferred for RF bonding because it has low inductance at radio frequencies. Unlike round wire, flat strap's surface area relative to its cross-section minimizes the skin effect, providing a lower impedance path for RF currents to ground.",

  T4A09:
    "To calculate operating time from a battery, divide the battery's ampere-hour (Ah) rating by the average current draw. For example, a 10 Ah battery powering equipment drawing 2 amps average would last approximately 5 hours (10 Ah / 2 A = 5 hours).",

  T4A10:
    'A digital mode hot spot is a low-power device that connects your handheld transceiver to digital voice networks (like DMR, D-STAR, or System Fusion) via the internet, enabling worldwide communication through local RF signals without needing a local repeater.',

  T4A11:
    "The negative power return for a mobile transceiver should connect directly to the vehicle's battery chassis ground terminal, not to random body metal. This ensures a clean, low-resistance return path and prevents ground loops that could introduce noise or unreliable operation.",

  T4A12:
    'An electronic keyer is a device that assists with Morse code sending by automatically generating properly-timed dots and dashes when the operator uses a paddle. This makes sending CW easier and more consistent than using a straight key.',

  // ============================================
  // T4B - Operating Controls
  // ============================================
  T4B01:
    'Excessive microphone gain on SSB causes the audio to distort and "splatter" into adjacent frequencies. The transmitter becomes overdriven, creating harsh, unintelligible audio and potentially interfering with other stations on nearby frequencies.',

  T4B02:
    'The keypad allows direct frequency entry by typing the numbers, while the VFO (Variable Frequency Oscillator) knob allows smooth tuning across the band. Both methods let you select your operating frequency, with the keypad being faster for known frequencies.',

  T4B03:
    "To hear weak FM signals, open the squelch by reducing the squelch threshold until background noise is audible even without a signal present. This ensures weak signals won't be cut off by the squelch circuit, though you'll hear noise between transmissions.",

  T4B04:
    'Memory channels store your favorite frequencies for quick recall. Instead of manually entering a frequency each time, you can simply select the memory channel number, and the radio instantly tunes to that stored frequency with any associated settings like tone squelch.',

  T4B05:
    "The scan function automatically steps through frequencies or memory channels, pausing when it detects activity. This helps you find active conversations or monitor multiple frequencies without manually tuning, making it easier to discover what's happening on the band.",

  T4B06:
    "The RIT (Receiver Incremental Tuning) or Clarifier adjusts only the receive frequency slightly without changing your transmit frequency. If someone's SSB signal sounds too high or low pitched (off-frequency), RIT lets you correct it without affecting your transmitted signal.",

  T4B07:
    "A DMR code plug is a configuration file containing repeater frequencies, color codes, talk group IDs, and other settings needed to access DMR networks. Without a properly configured code plug, the radio won't know how to communicate with the digital infrastructure.",

  T4B08:
    "Multiple bandwidth filters let you match the receiver's passband to the signal type. Narrower filters (like 500 Hz for CW) reject more noise and adjacent signals, while wider filters (like 2.4 kHz for SSB) pass the full audio bandwidth without distortion.",

  T4B09:
    'Digital voice systems use identification codes (like talk group IDs) to route communications. By entering the appropriate group ID, your transmissions reach only stations monitoring that group, similar to how CTCSS tones work on analog repeaters but with more flexibility.',

  T4B10:
    'The 2400 Hz filter bandwidth matches the audio bandwidth of SSB voice signals (roughly 300-2700 Hz). Narrower filters would cut off speech frequencies making audio muffled, while wider filters would admit more noise without improving the audio.',

  T4B11:
    "D-STAR requires your call sign to be programmed into the radio because it's transmitted digitally with every transmission for automatic identification. The network uses this information for routing, logging, and ensuring only licensed operators access the system.",

  T4B12:
    "FM receivers rely on being precisely tuned to the signal's center frequency. When mistuned, the FM discriminator can't properly decode the frequency deviations that carry the audio, resulting in distorted, muffled, or unintelligible sound.",

  // ============================================
  // T5A - Electrical Principles: Basic Units
  // ============================================
  T5A01:
    'Current is the flow of electrical charge and is measured in amperes (amps). One ampere equals one coulomb of charge passing a point per second. Current is analogous to the flow rate of water through a pipe.',

  T5A02:
    'Power is the rate of energy transfer or consumption and is measured in watts. One watt equals one joule of energy per second, or equivalently, one volt times one ampere in electrical terms.',

  T5A03:
    'Current is the term for the movement of electrons through a conductor. While electrons actually flow from negative to positive, conventional current flow is described as positive to negative for historical reasons.',

  T5A04:
    'Resistance is measured in ohms (symbol: omega). Resistance opposes current flow, and one ohm is defined as the resistance that allows one ampere to flow when one volt is applied.',

  T5A05:
    "Voltage (also called electromotive force or EMF) is the electrical pressure that pushes electrons through a circuit. It's the potential difference between two points and is measured in volts.",

  T5A06:
    'Frequency is measured in hertz (Hz), which represents the number of complete cycles per second. For example, 1 MHz equals one million cycles per second, typical for AM broadcast radio frequencies.',

  T5A07:
    'Metals conduct electricity well because their atomic structure allows outer electrons to move freely between atoms. These "free electrons" can easily flow when voltage is applied, creating current with relatively low resistance.',

  T5A08:
    'Glass is an excellent insulator because its electrons are tightly bound to atoms and cannot move freely. This prevents current flow even when significant voltage is applied, making it useful for isolating conductors.',

  T5A09:
    'Alternating current (AC) continuously reverses direction, flowing first one way then the other in a periodic cycle. This distinguishes it from DC, which flows continuously in one direction.',

  T5A10:
    'Power describes how quickly electrical energy is used or converted to other forms like heat, light, or radio waves. A 100-watt light bulb uses energy twice as fast as a 50-watt bulb.',

  T5A11:
    "Resistance opposes all types of current flow: DC, AC, and RF. While impedance is the more complete measure for AC circuits (including reactive effects), basic resistance affects current flow regardless of whether it's steady or alternating.",

  T5A12:
    'Frequency describes how many complete AC cycles occur per second. A 60 Hz power line completes 60 full cycles (positive peak to negative peak and back) each second.',

  // ============================================
  // T5B - Electrical Principles: Metric Prefixes and Decibels
  // ============================================
  T5B01:
    'One ampere equals 1000 milliamperes, so 1.5 amperes equals 1500 milliamperes. The prefix "milli-" means one-thousandth, so you multiply by 1000 to convert from base units to milli-units.',

  T5B02:
    '1,500,000 hertz equals 1500 kHz because kilo- means thousand. Dividing 1,500,000 by 1000 gives 1500. This is also 1.5 MHz, a frequency in the 160-meter amateur band.',

  T5B03:
    'One kilovolt equals 1000 volts. The prefix "kilo-" means one thousand. High-voltage power lines and some vacuum tube equipment operate at kilovolt levels.',

  T5B04:
    'One microvolt equals one-millionth of a volt (0.000001 V). The prefix "micro-" means one-millionth. Receiver sensitivity is often specified in microvolts because radio signals can be extremely weak.',

  T5B05:
    '500 milliwatts equals 0.5 watts because milli- means one-thousandth. Many QRP (low power) transmitters operate at 500 mW to 5 watts, making efficient antennas crucial.',

  T5B06:
    '3000 milliamperes equals 3 amperes. Divide by 1000 to convert from milliamperes to amperes. This is a typical current draw for a mobile radio during receive.',

  T5B07:
    '3.525 MHz equals 3525 kHz. To convert MHz to kHz, multiply by 1000. This frequency is in the 80-meter amateur band, used for CW and digital modes.',

  T5B08:
    '1,000,000 picofarads equals 1 microfarad. Since there are 1,000,000 picofarads in a microfarad (pico is 10^-12, micro is 10^-6), this conversion is straightforward.',

  T5B09:
    'Doubling power is approximately a 3 dB increase. Going from 5 watts to 10 watts doubles the power, representing about 3 dB gain. This is a fundamental decibel relationship worth memorizing.',

  T5B10:
    'Reducing power to one-quarter is a 6 dB decrease. Going from 12 watts to 3 watts (12/4=3) represents two halvings, and since each halving is -3 dB, the total is -6 dB.',

  T5B11:
    'A tenfold power increase equals 10 dB. Going from 20 watts to 200 watts is a factor of 10, which by definition is exactly 10 dB. This is another fundamental decibel relationship.',

  T5B12:
    '28400 kHz equals 28.400 MHz. Divide kHz by 1000 to get MHz. This frequency is in the 10-meter amateur band, often used for FM voice communications.',

  T5B13:
    '2425 MHz equals 2.425 GHz. Divide MHz by 1000 to get GHz. This frequency is in the 13-centimeter amateur band, shared with WiFi and microwave ovens.',

  // ============================================
  // T5C - Electrical Principles: Capacitance, Inductance, and Power Calculations
  // ============================================
  T5C01:
    'Capacitance is the ability to store energy in an electric field, created between two conductive surfaces separated by an insulator (dielectric). Capacitors are used for filtering, coupling, and energy storage in electronic circuits.',

  T5C02:
    'Capacitance is measured in farads. One farad is a very large unit, so practical capacitors are usually measured in microfarads (uF), nanofarads (nF), or picofarads (pF).',

  T5C03:
    'Inductance is the ability to store energy in a magnetic field, typically created by current flowing through a coil of wire. Inductors oppose changes in current and are used in filters, transformers, and tuned circuits.',

  T5C04:
    'Inductance is measured in henrys. Like the farad, one henry is quite large, so practical inductors are often measured in millihenrys (mH) or microhenrys (uH).',

  T5C05:
    'Impedance is measured in ohms, the same unit as resistance. Impedance extends the concept of resistance to AC circuits by including the effects of capacitance and inductance, which vary with frequency.',

  T5C06:
    'RF stands for Radio Frequency, encompassing all electromagnetic signals used for radio communication. This includes everything from longwave through microwave frequencies used by amateur radio operators.',

  T5C07:
    'Megahertz is abbreviated MHz, with a capital M (for mega, meaning million) and capital H (for Hertz, named after Heinrich Hertz). Proper capitalization matters in scientific notation.',

  T5C08:
    'Power equals current times voltage (P = I x E, or P = IV). This fundamental formula lets you calculate power consumption from voltage and current measurements, essential for sizing power supplies.',

  T5C09:
    'Power = 13.8V x 10A = 138 watts. Using P = I x E, multiply voltage times current. This is typical power consumption for a 100-watt HF transceiver during transmission.',

  T5C10:
    'Power = 12V x 2.5A = 30 watts. This calculation shows how to determine power consumption for equipment running from a 12-volt source, common in mobile and portable operations.',

  T5C11:
    'Current = Power/Voltage = 120W/12V = 10 amperes. Rearranging P = IE to solve for I gives I = P/E. This helps determine what size power supply or battery is needed.',

  T5C12:
    'Impedance is the total opposition to AC current flow, combining resistance with the reactive effects of capacitance and inductance. Unlike pure resistance, impedance varies with frequency due to these reactive components.',

  T5C13:
    'Kilohertz is abbreviated kHz, with lowercase k (for kilo, meaning thousand) and uppercase H and z. This frequency unit is commonly used for HF amateur bands.',

  // ============================================
  // T5D - Electrical Principles: Ohm's Law
  // ============================================
  T5D01:
    "Current equals voltage divided by resistance (I = E/R). This form of Ohm's Law calculates how much current flows when you know the voltage and resistance. Higher voltage or lower resistance means more current.",

  T5D02:
    "Voltage equals current times resistance (E = I x R). This form of Ohm's Law calculates voltage drop across a resistance when you know the current flowing through it.",

  T5D03:
    "Resistance equals voltage divided by current (R = E/I). This form of Ohm's Law helps you calculate an unknown resistance by measuring voltage and current.",

  T5D04:
    "Resistance = 90V / 3A = 30 ohms. Using R = E/I, divide the voltage by the current. This is a straightforward Ohm's Law calculation.",

  T5D05:
    'Resistance = 12V / 1.5A = 8 ohms. Using R = E/I, divide 12 by 1.5. This represents a moderate load on a 12-volt system.',

  T5D06:
    'Resistance = 12V / 4A = 3 ohms. This low resistance value explains why the current is relatively high. In a vehicle, such a load would require heavy-gauge wiring.',

  T5D07:
    'Current = 120V / 80 ohms = 1.5 amperes. Using I = E/R, divide voltage by resistance. This calculation applies to household voltage through a moderate resistance.',

  T5D08:
    'Current = 200V / 100 ohms = 2 amperes. Using I = E/R, this straightforward calculation shows how voltage and resistance determine current flow.',

  T5D09:
    'Current = 240V / 24 ohms = 10 amperes. Using I = E/R, this calculation demonstrates current flow at higher voltages typical of some industrial equipment.',

  T5D10:
    'Voltage = 0.5A x 2 ohms = 1 volt. Using E = I x R, multiply current by resistance. Small currents through small resistances produce small voltage drops.',

  T5D11:
    "Voltage = 1A x 10 ohms = 10 volts. Using E = I x R, one ampere through 10 ohms produces exactly 10 volts, making this an easy verification of Ohm's Law.",

  T5D12:
    'Voltage = 2A x 10 ohms = 20 volts. Using E = I x R, doubling the current through the same resistance doubles the voltage drop.',

  T5D13:
    "In a series circuit, all components carry the same current because there's only one path for current to flow. The current leaving one component must enter the next, like water flowing through a single pipe.",

  T5D14:
    "In a parallel circuit, all components see the same voltage because they're all connected directly across the power source. This is why household outlets all provide the same voltage regardless of what's plugged in.",

  // ============================================
  // T6A - Circuit Components: Basic Components
  // ============================================
  T6A01:
    'A resistor opposes current flow in a DC circuit by converting electrical energy to heat. Resistors are used to limit current, divide voltage, and set operating points in electronic circuits.',

  T6A02:
    'A potentiometer is a variable resistor commonly used as a volume control. Rotating the shaft changes the resistance, which in audio circuits varies the signal level reaching the amplifier or speaker.',

  T6A03:
    'A potentiometer controls resistance by varying the contact point along a resistive element. This allows smooth, continuous adjustment of resistance from near zero to the full rated value.',

  T6A04:
    'A capacitor stores energy in an electric field created between two conductive plates separated by an insulator. This stored charge can be released quickly, useful for filtering, timing, and coupling circuits.',

  T6A05:
    'A capacitor consists of conductive plates (often metal foil) separated by an insulator (dielectric). The dielectric material affects capacitance value and voltage rating, with common types using ceramic, plastic film, or electrolytic materials.',

  T6A06:
    'An inductor stores energy in a magnetic field created when current flows through its coiled wire. Inductors oppose changes in current and are essential in filters, transformers, and tuned circuits.',

  T6A07:
    'An inductor is typically a coil of wire, sometimes wound around a core material like iron or ferrite to increase inductance. The number of turns and core material determine the inductance value.',

  T6A08:
    "An SPDT (Single-Pole Double-Throw) switch connects one input to either of two outputs. It's commonly used to select between two circuits, like switching an antenna between two radios.",

  T6A09:
    'A fuse protects circuits from overcurrent by containing a wire that melts when current exceeds its rating, breaking the circuit. This prevents damage to more expensive components and reduces fire risk.',

  T6A10:
    'Nickel-metal hydride, lithium-ion, and lead-acid batteries are all rechargeable. Each chemistry has different characteristics regarding energy density, weight, cycle life, and self-discharge rates.',

  T6A11:
    'Carbon-zinc batteries (common "heavy duty" batteries) are not rechargeable. Attempting to recharge them can cause leakage, overheating, or rupture. Alkaline batteries are also non-rechargeable despite similar appearance.',

  T6A12:
    'Component 3 in figure T-2 shows a single-pole single-throw (SPST) switch, the simplest switch type. It either completes or breaks a single circuit, like a basic on/off light switch.',

  // ============================================
  // T6B - Circuit Components: Semiconductors
  // ============================================
  T6B01:
    'Different diode types have different forward voltage drops: silicon diodes typically drop 0.6-0.7V, Schottky diodes drop 0.2-0.3V, and LEDs drop 1.5-3V depending on color. This voltage is lost as heat and must be accounted for in circuit design.',

  T6B02:
    'A diode allows current to flow in only one direction, from anode to cathode when forward-biased. This property makes diodes essential for rectifying AC to DC and protecting circuits from reverse voltage.',

  T6B03:
    'A transistor can function as an electronic switch, turning current on or off based on a control signal. This switching capability is fundamental to digital electronics and is also used in RF amplifiers and power control.',

  T6B04:
    "A transistor consists of three semiconductor regions arranged as either NPN or PNP. These layers create two junctions that enable the transistor's amplifying and switching properties.",

  T6B05:
    'A Field-Effect Transistor (FET) has three terminals: gate (control input), drain (output), and source (input). The gate voltage controls current flow between source and drain with very high input impedance.',

  T6B06:
    'The cathode of a diode is marked with a stripe or band on the package. Current flows from anode to cathode, so the stripe indicates the direction current exits the diode when forward-biased.',

  T6B07:
    "An LED emits light when forward current flows through it. The light is produced when electrons recombine with holes in the semiconductor, releasing energy as photons. More current means brighter light up to the LED's rating.",

  T6B08:
    'FET stands for Field Effect Transistor. Unlike bipolar transistors that are current-controlled, FETs are voltage-controlled devices with very high input impedance, making them ideal for certain RF and low-noise applications.',

  T6B09:
    'A diode has two electrodes: the anode (positive terminal) and cathode (negative terminal). Forward current flows from anode to cathode when the anode is more positive than the cathode by at least the forward voltage drop.',

  T6B10:
    'A transistor can provide power gain by using a small input signal to control a larger output current from the power supply. This amplification is the basis for amplifiers, oscillators, and signal processing circuits.',

  T6B11:
    'Gain describes how much a device amplifies a signal, typically expressed as a ratio or in decibels. An amplifier with 10 dB gain increases signal power by a factor of 10.',

  T6B12:
    'A bipolar junction transistor (BJT) has three electrodes: emitter, base, and collector. A small base current controls a much larger collector current, providing current amplification.',

  // ============================================
  // T6C - Circuit Components: Schematics
  // ============================================
  T6C01:
    'A schematic is an electrical wiring diagram using standardized symbols to represent components and their connections. Schematics show how a circuit works logically, not how it looks physically.',

  T6C02:
    'Component 1 in figure T-1 is a resistor, shown as a zigzag line. Resistors are among the most common components in electronic circuits, used for current limiting, voltage division, and biasing.',

  T6C03:
    'Component 2 in figure T-1 is a transistor, typically shown with three leads representing base, collector, and emitter (for BJT) or gate, drain, and source (for FET).',

  T6C04:
    'Component 3 in figure T-1 is a lamp, often represented by a circle with an X or filament symbol inside. Lamps indicate current flow or serve as actual light sources in circuits.',

  T6C05:
    'Component 4 in figure T-1 is a battery, shown as alternating long and short parallel lines. The longer line represents the positive terminal. Multiple cells in series are shown as multiple line pairs.',

  T6C06:
    'Component 6 in figure T-2 is a capacitor, typically shown as two parallel lines (representing the plates) separated by a gap. Polarized capacitors show one curved plate to indicate polarity.',

  T6C07:
    'Component 8 in figure T-2 is a light-emitting diode (LED), shown as a diode symbol with arrows pointing away to represent emitted light. LEDs are widely used as indicators in electronic equipment.',

  T6C08:
    'Component 9 in figure T-2 is a variable resistor (potentiometer), shown as a resistor symbol with an arrow through it or pointing to it, indicating adjustability.',

  T6C09:
    'Component 4 in figure T-2 is a transformer, shown as two coils (inductors) with parallel lines between them representing the magnetic core that couples energy between windings.',

  T6C10:
    'Component 3 in figure T-3 is a variable inductor, shown as a coil symbol with an arrow indicating adjustability. Variable inductors are used in tuned circuits where frequency adjustment is needed.',

  T6C11:
    'Component 4 in figure T-3 is an antenna, typically shown as a vertical line with angled lines at the top representing the radiating elements. Antennas convert electrical signals to radio waves and vice versa.',

  T6C12:
    'Schematics accurately represent component connections - which pins connect to which - rather than physical appearance or wire lengths. The goal is to show circuit function, not mechanical layout.',

  // ============================================
  // T6D - Circuit Components: Practical Circuits
  // ============================================
  T6D01:
    'A rectifier converts AC to pulsating DC by allowing current to flow in only one direction. Full-wave rectifiers use multiple diodes to utilize both AC half-cycles, creating smoother DC output.',

  T6D02:
    'A relay is an electrically-controlled switch that uses an electromagnet to operate mechanical contacts. This allows a low-power control circuit to switch high-power loads safely and with electrical isolation.',

  T6D03:
    'Shielded wire prevents unwanted signals from coupling into or out of the wire. The metallic shield blocks electromagnetic interference, essential for sensitive receive audio lines and reducing RF pickup in microphone cables.',

  T6D04:
    'A meter displays electrical quantities as numeric values, either with a moving pointer (analog) or digital readout. Multimeters can measure voltage, current, resistance, and often additional parameters.',

  T6D05:
    'A regulator circuit maintains constant output voltage despite changes in input voltage or load current. Regulators are essential in power supplies to provide the stable voltages that electronic circuits require.',

  T6D06:
    'A transformer changes AC voltage levels using magnetic coupling between coils with different numbers of turns. Step-down transformers reduce 120V AC to lower voltages for electronic equipment.',

  T6D07:
    'An LED (Light-Emitting Diode) is commonly used as a visual indicator because it produces light efficiently, operates at low voltage, has long life, and is available in many colors.',

  T6D08:
    'A capacitor combined with an inductor creates a resonant circuit that responds strongly to one particular frequency. This LC combination is fundamental to filters, oscillators, and tuned amplifiers.',

  T6D09:
    'An integrated circuit (IC) combines multiple semiconductors, resistors, capacitors, and other components in a single package. ICs range from simple op-amps to complex microprocessors containing billions of transistors.',

  T6D10:
    'Component 2 in figure T-1 (the transistor) controls current flow. A small signal at the base or gate controls a much larger current through the device, enabling amplification and switching functions.',

  T6D11:
    'A resonant or tuned circuit consists of an inductor and capacitor in series or parallel. At resonance, the circuit has maximum response (parallel) or minimum impedance (series) at one specific frequency.',
}

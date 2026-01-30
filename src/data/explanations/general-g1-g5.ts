/**
 * Explanations for General G1-G5 Questions
 *
 * G1: Commission's Rules (frequency privileges, power limits)
 * G2: Operating Procedures (nets, DX, repeaters)
 * G3: Radio Wave Propagation (ionosphere, skip, MUF)
 * G4: Amateur Radio Practices (test equipment, interference)
 * G5: Electrical Principles (impedance, reactance, resonance)
 */

export const explanationsG1G5: Record<string, string> = {
  // G1A - Frequency privileges; primary and secondary allocations
  G1A01:
    'The 80-meter, 40-meter, 20-meter, and 15-meter bands have portions reserved exclusively for Amateur Extra licensees. General class operators cannot transmit in these "Extra-only" sub-bands, which are typically at the lower end of the phone segments.',
  G1A02:
    'The 30-meter band (10.1-10.15 MHz) is restricted to CW and data modes only - phone (voice) operation is prohibited. This narrow band is shared with other services and the restriction helps minimize interference.',
  G1A03:
    'The 30-meter band prohibits image transmissions (like SSTV or fax) along with phone. This keeps the narrow shared band available for CW and data communications only.',
  G1A04:
    'The 60-meter band is unique in that amateurs must operate on specific channel frequencies rather than anywhere within a frequency range. This channelized approach exists because amateurs share this band with government users.',
  G1A05:
    'The frequency range 7.125-7.175 MHz falls within the Extra-only portion of the 40-meter band. General class licensees must stay above 7.175 MHz for phone operations on this band.',
  G1A06:
    'When amateur radio is designated as a secondary user, amateurs must not cause harmful interference to primary users and must accept any interference from them. This is the fundamental rule for secondary spectrum allocation.',
  G1A07:
    'General class operators can use CW on the entire 10-meter band (28.0-29.7 MHz). The 10-meter band has no Extra-only portions, making all of it available to General licensees.',
  G1A08:
    'The 80-meter, 40-meter, 20-meter, and 15-meter bands have Extra-only segments at the lower end of their phone portions. These segments provide experienced operators with less crowded frequencies.',
  G1A09:
    '21.300 kHz (21.3 MHz) is within the 15-meter band (21.0-21.45 MHz) and within the General class phone segment. The other frequencies listed are on different bands.',
  G1A10:
    'Repeater operation on 10 meters is permitted only above 29.5 MHz. This keeps repeater activity separated from the propagation-sensitive lower portions of the band.',
  G1A11:
    'When General class licensees have limited phone privileges on a band, they are assigned the upper frequency portion. This convention keeps Extra operators at the low end and Generals at the high end.',

  // G1B - Antenna structure limitations; good engineering and amateur practice; beacon operation; restricted operation; retransmitting radio signals
  G1B01:
    'Antenna structures under 200 feet that are not near airports do not require FAA notification or FCC registration. This height limit balances amateur radio needs with aviation safety concerns.',
  G1B02:
    'FCC rules limit beacon stations to one per band from a single location. This prevents a single station from monopolizing propagation beacon frequencies.',
  G1B03:
    'Beacon stations serve the purpose of propagation observation and reception studies. They transmit continuously so operators can assess band conditions by listening for the beacon signal.',
  G1B04:
    'Amateur stations may occasionally retransmit weather and propagation forecasts from US government stations. This exception allows useful information to reach the amateur community.',
  G1B05:
    'One-way transmissions for teaching Morse code are specifically permitted. This allows practice transmissions without requiring two-way communication.',
  G1B06:
    'Under PRB-1, state and local governments may regulate antenna structures but must reasonably accommodate amateur communications and use the minimum regulation necessary for legitimate purposes.',
  G1B07:
    'Abbreviations and procedural signals may be used as long as they do not obscure the meaning of the message. This allows efficient communication while ensuring messages remain understandable.',
  G1B08:
    'Amateur stations may contact stations in any country except those whose administrations have filed objections with the ITU. Most countries allow such contacts.',
  G1B09:
    'Automatically controlled HF beacons are permitted only in the 28.20-28.30 MHz segment. This specific allocation prevents interference with other HF operations.',
  G1B10:
    'Beacon stations are limited to 100 watts PEP output. This power level is sufficient for propagation studies while limiting potential interference.',
  G1B11:
    'The FCC determines what constitutes "good engineering and good amateur practice" for matters not specifically covered in Part 97 rules.',

  // G1C - Transmitter power regulations; 60-meter band restrictions
  G1C01:
    '10.140 MHz is in the 30-meter band, which has a 200-watt PEP power limit. This reduced power limit helps amateurs share the band with other services.',
  G1C02:
    'The 12-meter band allows the standard maximum power of 1500 watts PEP. There are no special power restrictions on this WARC band.',
  G1C03:
    'The 60-meter band limits USB signal bandwidth to 2.8 kHz. This ensures signals stay within the designated channel bandwidth.',
  G1C04:
    'When using an antenna other than a dipole on 60 meters, you must record the antenna gain to ensure you stay within the ERP limit of 100 watts.',
  G1C05:
    'General class operators may use up to 1500 watts PEP on the 28 MHz (10-meter) band, the standard maximum power for most amateur bands.',
  G1C06:
    'The 1.8 MHz (160-meter) band permits the full 1500 watts PEP output like most other HF bands.',
  G1C07:
    'Before using a new digital protocol, its technical characteristics must be publicly documented. This allows other amateurs to decode the transmissions and ensures transparency.',
  G1C09:
    'The 60-meter band has a power limit of 100 watts ERP (Effective Radiated Power) relative to a dipole, not transmitter output power.',
  G1C11:
    'FCC rules specify power limits in terms of PEP (Peak Envelope Power) output from the transmitter, not input power or power at other points.',

  // G1D - Volunteer Examiners and Volunteer Examiner Coordinators; temporary identification; element credit
  G1D01:
    'Applicants who previously held a General, Advanced, or Amateur Extra license that was not revoked may receive credit for those elements. They need only pass lower elements to regain their former privileges.',
  G1D02:
    'A General class Volunteer Examiner may only administer Technician exams. VEs can only test for license classes below their own license class.',
  G1D03:
    'A Technician with a valid CSCE for General may operate on any General or Technician band segment immediately. The CSCE serves as proof of passing until the license is updated.',
  G1D04:
    'Technician exams must be observed by at least three VEs of General class or higher. This requirement ensures proper exam administration.',
  G1D05:
    'Operating a US station by remote control from outside the country requires only a US amateur license. No special permits are needed.',
  G1D06:
    'A Technician with a pending General upgrade must identify with "AG" (Authorized General) after their call sign when using General class frequencies.',
  G1D07:
    'Volunteer Examiners are accredited by a Volunteer Examiner Coordinator (VEC), not directly by the FCC.',
  G1D08:
    'Non-US citizens can be VEs if they hold an FCC-granted amateur license of General class or above. Citizenship is not a requirement.',
  G1D09:
    'A CSCE (Certificate of Successful Completion of Examination) is valid for 365 days for exam element credit.',
  G1D10: 'The minimum age to be an accredited Volunteer Examiner is 18 years old.',
  G1D11:
    'To regain a General class license after the grace period has expired, the applicant must show proof of the expired license and pass the current Element 2 (Technician) exam.',
  G1D12:
    "When remotely operating a station in another country, only that country's regulations apply. The control operator is subject to the rules of where the transmitter is located.",

  // G1E - Third-party rules; automatic control of digital stations; spread spectrum; IARU
  G1E01:
    'A third party whose amateur license has been revoked cannot participate in amateur communications. This prevents circumvention of FCC enforcement actions.',
  G1E02:
    "A 10-meter repeater may retransmit 2-meter signals from a Technician if the 10-meter repeater's control operator holds at least a General class license, providing the necessary HF privileges.",
  G1E03:
    'To contact an automatically controlled digital station outside the automatic control segments, the initiating station must be under local or remote control (not automatic).',
  G1E04:
    'All listed conditions require steps to avoid interference: near FCC monitoring stations, on secondary bands, and when using spread spectrum. Each has specific interference mitigation requirements.',
  G1E05:
    'Third-party messages to countries with agreements must relate to amateur radio, be of a personal nature, or concern emergencies/disaster relief. Commercial or business traffic is prohibited.',
  G1E06:
    'North and South America are in ITU Region 2, which has its own frequency allocations that differ from Regions 1 and 3.',
  G1E07:
    'Amateur stations cannot communicate with non-licensed Wi-Fi stations in any part of the 2.4 GHz band. Amateur communications must be between licensed amateurs.',
  G1E08:
    'Spread spectrum transmissions are limited to 10 watts PEP output. This power limit reduces potential interference from the wide-bandwidth signals.',
  G1E09:
    'Digital mode messages are not exempt from third-party rules. The same third-party restrictions apply regardless of the mode used.',
  G1E10:
    'The listed frequencies (14.100, 18.110, 21.150, 24.930, 28.200 MHz) host the International Beacon Project stations. Transmitting on these frequencies would interfere with propagation monitoring.',
  G1E11:
    'Automatically controlled RTTY/data stations may communicate with each other on 6 meters and shorter wavelength bands, plus limited HF segments specified in the rules.',
  G1E12:
    'Third-party messages may be transmitted via remote control under any circumstances where third-party traffic is normally permitted. Remote control does not add restrictions.',

  // G2A - Phone operating procedures; USB/LSB, breaking into a QSO, VOX operation
  G2A01:
    'Upper sideband (USB) is the standard for voice communications on 14 MHz and higher frequencies. This convention helps operators find each other on the bands.',
  G2A02:
    'Lower sideband (LSB) is conventionally used for voice on 160, 75/80, and 40 meters. The dividing line between LSB and USB is around 10 MHz.',
  G2A03:
    'VHF and UHF SSB voice communications use upper sideband (USB), following the convention for frequencies above 10 MHz.',
  G2A04:
    'The 17-meter and 12-meter bands use upper sideband (USB) for voice, as they are above the 10 MHz USB/LSB dividing line.',
  G2A05:
    'Single sideband (SSB) is the most commonly used voice mode on HF amateur bands because of its bandwidth efficiency and power advantages over AM.',
  G2A06:
    'SSB uses less bandwidth and has greater power efficiency compared to AM. All transmitter power goes into the voice signal rather than being split with a carrier.',
  G2A07:
    'In SSB, only one sideband is transmitted while the carrier and other sideband are suppressed. The receiver regenerates the carrier to demodulate the signal.',
  G2A08:
    'To break into an ongoing contact, simply say your call sign once during a pause. This is polite and allows the stations in QSO to acknowledge you.',
  G2A09:
    'Using LSB on 160, 75/80, and 40 meters is simply accepted amateur practice, not a regulation. It became convention in the early days of SSB.',
  G2A10:
    'VOX (voice-operated transmit) allows hands-free operation by automatically keying the transmitter when you speak into the microphone.',
  G2A11:
    'When a station in the contiguous 48 states calls "CQ DX," they are seeking contacts outside that area - stations in Alaska, Hawaii, US territories, or other countries.',
  G2A12:
    'The microphone gain or transmit audio control is adjusted to achieve proper ALC indication. Too much gain causes distortion and splatter.',

  // G2B - Operating courtesy; net operation; band plans; RACES
  G2B01:
    'Except during emergencies, no amateur station has priority access to any frequency. All amateurs have equal rights to use amateur frequencies.',
  G2B02:
    'When a station in distress breaks in, immediately acknowledge them and determine what assistance is needed. Emergency communications take priority.',
  G2B03:
    'If propagation changes cause interference, work with the other stations to resolve the problem in a mutually acceptable manner. Cooperation is key.',
  G2B04:
    'CW signals should be separated by 150-500 Hz to minimize interference. This accounts for typical CW bandwidth and receiver selectivity.',
  G2B05:
    'SSB signals need 2-3 kHz separation to avoid interference, reflecting the typical 2.4-3 kHz bandwidth of SSB voice signals.',
  G2B06:
    'Before calling CQ, ask "Is the frequency in use?" on phone or send "QRL?" on CW, followed by your call sign. Listen for a response before proceeding.',
  G2B07:
    'Following the voluntary band plan when choosing a frequency is good amateur practice. Band plans help different modes coexist on the bands.',
  G2B08:
    'The 50.1-50.125 MHz segment is voluntarily reserved for DX contacts only. Stations in the lower 48 states should only use it for contacts outside that area.',
  G2B09:
    'Only FCC-licensed amateur operators may be control operators of RACES stations, even during emergencies. The license requirement is not waived.',
  G2B10:
    'Having a backup frequency is good net management practice. It ensures the net can continue if the primary frequency becomes unusable.',
  G2B11:
    'RACES training drills may be conducted up to 1 hour per week without special authorization. This allows regular practice while limiting non-emergency use.',

  // G2C - CW operating procedures and conventions
  G2C01:
    'Full break-in (QSK) operation means the transmitter automatically switches to receive between code elements, allowing the operator to hear the other station even during transmission.',
  G2C02:
    '"QRS" means "send slower." When you receive this request, reduce your CW sending speed to make it easier for the other station to copy.',
  G2C03:
    '"KN" at the end of a transmission means the sender wants to hear only from a specific station - they are not soliciting calls from other stations.',
  G2C04:
    '"QRL?" asks "Is this frequency in use?" Always send this and listen for a response before calling CQ to avoid interfering with an ongoing QSO.',
  G2C05:
    'When answering a CQ, send at the fastest speed you can comfortably copy, but no faster than the calling station sent. This ensures both operators can communicate effectively.',
  G2C06:
    '"Zero beat" means adjusting your transmit frequency to match exactly the frequency of the station you are working. This puts both stations on the same frequency.',
  G2C07:
    'Adding "C" to an RST report indicates a chirpy or unstable signal. The transmitter may have a power supply or oscillator issue causing frequency drift.',
  G2C08:
    'The prosign "AR" signals the end of a formal message in CW traffic handling. It separates the message from any following comments.',
  G2C09:
    '"QSL" means "I have received and understood" or "I acknowledge receipt." It confirms successful reception of the previous transmission.',
  G2C10:
    '"QRN" means "I am troubled by static" (atmospheric noise). This indicates natural interference is making reception difficult.',
  G2C11:
    '"QRV" means "I am ready to receive." It signals that you are prepared to copy the other station\'s transmission.',

  // G2D - Volunteer monitoring; DX operation; operating techniques
  G2D01:
    'The Volunteer Monitor Program consists of amateur volunteers formally enlisted to monitor the bands for rules violations, helping maintain order on amateur frequencies.',
  G2D02:
    'The Volunteer Monitor Program encourages amateur self-regulation and rules compliance. This reduces the need for direct FCC enforcement.',
  G2D03:
    'Volunteer Monitors can locate an interfering signal by comparing beam headings from multiple locations. Triangulation pinpoints the signal source.',
  G2D04:
    'An azimuthal projection map shows true bearings and distances from a specific location. It is essential for determining beam headings for DX contacts.',
  G2D05:
    'To call CQ, repeat "CQ" a few times, then "this is," then your call sign a few times, pause to listen, and repeat as necessary. This is the standard calling procedure.',
  G2D06:
    'For long-path contacts, point the antenna 180 degrees from the short-path heading. The signal travels the opposite way around the Earth.',
  G2D07:
    'Alpha, Bravo, Charlie, Delta are examples of the NATO phonetic alphabet. This standardized alphabet ensures clear communication of letters.',
  G2D08:
    'Many amateurs keep a station log to help respond if the FCC requests information about their station operations. It also helps track contacts and confirm QSOs.',
  G2D09:
    'When participating in contests, you must still identify your station according to normal FCC regulations. Contest shortcuts do not exempt you from ID requirements.',
  G2D10:
    'QRP operation means low-power transmitting, typically 5 watts or less for CW and 10 watts or less for SSB. It is a popular challenge among amateur operators.',
  G2D11:
    'Signal reports are exchanged early in a contact so each station knows how well they are being received. This allows adjustments for best communication.',

  // G2E - Digital mode operating procedures
  G2E01:
    'RTTY signals via AFSK (audio frequency shift keying) are normally transmitted using LSB. This convention is opposite to normal voice sideband usage.',
  G2E02:
    'VARA is a digital protocol used with Winlink for email over radio. It provides robust error-corrected data transmission on HF and VHF.',
  G2E03:
    'Interference with PACTOR or VARA transmissions can cause frequent retries, timeouts, long pauses, and connection failures. These protocols are sensitive to QRM.',
  G2E04:
    'When answering an FT8 CQ, transmit during the alternate time slot from the calling station. FT8 uses alternating 15-second transmit/receive periods.',
  G2E05:
    'JT65, JT9, FT4, and FT8 use upper sideband (USB) when transmitting via AFSK. The radio should be set to USB with audio tones generating the signal.',
  G2E06:
    'The most common RTTY shift on HF is 170 Hz. This is the standard separation between the mark and space tones.',
  G2E07:
    'FT8 requires accurate computer time (within about 1 second) because the protocol uses precisely timed transmit/receive sequences synchronized across all stations.',
  G2E08:
    'Digital mode operations on 20 meters are commonly found between 14.070 and 14.100 MHz. This segment is widely recognized for digital activity.',
  G2E09:
    'PACTOR connections are limited to two stations - you cannot join an existing contact. It is a point-to-point protocol, not a multi-party one.',
  G2E10:
    "To connect to a digital messaging gateway, transmit a connect message on the station's published frequency. The gateway will respond with connection protocol.",
  G2E11:
    'AREDN (Amateur Radio Emergency Data Network) mesh networks provide high-speed data services during emergencies or community events using IP networking.',
  G2E12:
    'Winlink is an amateur radio email system capable of both VHF and HF operation, functioning as a wireless network connected to the internet.',
  G2E13:
    'A Winlink Remote Message Server is also called a gateway. It bridges the radio network to the internet email system.',
  G2E14:
    "When RTTY or FSK signals don't decode properly despite correct tuning, the problem could be reversed mark/space, wrong baud rate, or wrong sideband selection.",
  G2E15:
    'FT8 activity on 20 meters is commonly found between approximately 14.074 and 14.077 MHz. This narrow segment is dedicated to FT8 operation.',

  // G3A - Sunspots and solar radiation; propagation
  G3A01:
    'Higher sunspot numbers indicate more solar activity and better ionospheric ionization, which generally means better HF propagation, especially at higher frequencies.',
  G3A02:
    'A sudden ionospheric disturbance (SID) disrupts lower HF frequencies more than higher ones. The increased D-layer ionization absorbs lower frequency signals.',
  G3A03:
    'Ultraviolet and X-ray radiation from a solar flare reaches Earth in about 8 minutes, traveling at the speed of light. This causes immediate propagation effects.',
  G3A04:
    'During low solar activity, the 15, 12, and 10-meter bands are the least reliable for long-distance communication. These higher bands need more ionization.',
  G3A05:
    'The solar flux index measures solar radiation at 10.7 cm wavelength. It correlates with ionospheric ionization and HF propagation conditions.',
  G3A06:
    "A geomagnetic storm is a temporary disturbance in Earth's geomagnetic field caused by solar wind disturbances. It can significantly affect HF propagation.",
  G3A07:
    'The 20-meter band typically supports worldwide propagation during daylight hours at any point in the solar cycle. It is the most reliable DX band.',
  G3A08:
    'Geomagnetic storms degrade high-latitude HF propagation. Polar paths become unreliable during disturbed geomagnetic conditions.',
  G3A09:
    'High geomagnetic activity creates auroras that can reflect VHF signals, enabling aurora propagation for VHF communications, especially at high latitudes.',
  G3A10:
    'HF propagation varies in a 26-28 day cycle because the Sun rotates on its axis in about that period, bringing different active regions to face Earth.',
  G3A11:
    'A coronal mass ejection (CME) takes 15 hours to several days to reach Earth. It is a slower-moving cloud of particles compared to electromagnetic radiation.',
  G3A12:
    "The K-index measures short-term (3-hour) stability of Earth's geomagnetic field. Higher K values indicate disturbed conditions.",
  G3A13:
    "The A-index measures long-term (daily) stability of Earth's geomagnetic field. It is derived from K-index values over a 24-hour period.",
  G3A14:
    'Charged particles from solar coronal holes disturb HF communication. These high-speed particles cause geomagnetic disturbances when they reach Earth.',

  // G3B - MUF and LUF; ionospheric absorption; propagation
  G3B01:
    'When signals arrive by both short and long path, a slightly delayed echo might be heard. The long-path signal arrives later due to the longer distance traveled.',
  G3B02:
    'The MUF (Maximum Usable Frequency) is affected by path distance, location, time of day, season, solar radiation, and ionospheric disturbances - all factors influence ionization.',
  G3B03:
    'Frequencies just below the MUF have the least attenuation for skip propagation. Higher frequencies pass through the ionosphere while lower ones get absorbed.',
  G3B04:
    'Automated receiving station networks on the internet can show where your signals are being received, providing real-time propagation data for your station.',
  G3B05:
    'Radio waves between the MUF and LUF are refracted back to Earth by the ionosphere. This is how HF skip propagation works.',
  G3B06:
    'Signals below the LUF (Lowest Usable Frequency) are attenuated before reaching their destination. The D-layer absorbs too much energy for useful communication.',
  G3B07:
    'LUF stands for Lowest Usable Frequency between two specific points. Below this frequency, signals are absorbed rather than returned.',
  G3B08:
    'MUF stands for Maximum Usable Frequency between two points. Above this frequency, signals pass through the ionosphere rather than being refracted back.',
  G3B09:
    'The F2 region can support skip distances up to approximately 2,500 miles in one hop. Multiple hops can extend this for worldwide communication.',
  G3B10:
    'The E region supports single-hop distances up to approximately 1,200 miles. It is lower than the F region, resulting in shorter skip distances.',
  G3B11:
    'When the LUF exceeds the MUF, there is no usable frequency for skywave propagation on that path. This "blackout" condition can occur during ionospheric disturbances.',
  G3B12:
    'During summer, the lower HF frequencies (40, 80, 160 meters) experience high levels of atmospheric noise (static) from thunderstorm activity.',

  // G3C - Ionospheric layers; critical angle and frequency; HF scatter
  G3C01:
    "The D region is closest to Earth's surface, at about 60-90 km altitude. It exists only during daylight and absorbs lower HF frequencies.",
  G3C02:
    'The critical frequency at a given incidence angle is the highest frequency that will be refracted back to Earth. Higher frequencies pass through.',
  G3C03:
    'The F2 region provides the longest skip distances because it is the highest ionospheric layer. Higher altitude means signals can travel farther between bounces.',
  G3C04:
    'The critical angle is the highest takeoff angle that will return a radio wave to Earth. Signals at steeper angles pass through the ionosphere.',
  G3C05:
    'Long-distance communication on 40, 60, 80, and 160 meters is difficult during daytime because the D region absorbs these lower frequencies.',
  G3C06:
    'HF scatter signals have a characteristic fluttering sound due to the irregular nature of the scattering mechanism.',
  G3C07:
    'HF scatter signals sound distorted because energy is scattered into the skip zone through several different paths with varying delays.',
  G3C08:
    'HF scatter signals are weak because only a small portion of the signal energy is scattered into the skip zone. Most energy continues in the original direction.',
  G3C09:
    'Scatter propagation allows signals to be heard in the skip zone - the area normally too close for skip but too far for ground wave.',
  G3C10:
    'NVIS (Near Vertical Incidence Skywave) is short-distance HF propagation using high elevation angles. It fills in coverage for regional communications.',
  G3C11:
    'The D region is most absorbent of signals below 10 MHz during daylight hours. This absorption is why lower bands work better at night.',

  // G4A - Station operation and setup; transceiver operation
  G4A01:
    'A notch filter reduces interference from carriers (heterodynes) in the receiver passband. It creates a narrow null at a specific frequency.',
  G4A02:
    'Receiving CW on the opposite sideband can reduce or eliminate interference from nearby signals by placing them outside the receiver passband.',
  G4A03:
    'A noise blanker reduces receiver gain during noise pulses. It briefly "blanks" the receiver to eliminate impulse noise like ignition interference.',
  G4A04:
    'The correct TUNE control setting on a vacuum tube amplifier produces a pronounced dip in plate current, indicating the output circuit is tuned to resonance.',
  G4A05:
    'ALC (Automatic Level Control) on an RF amplifier prevents excessive drive that could damage the amplifier or cause distortion.',
  G4A06:
    'An antenna tuner increases power transfer from the transmitter to the feed line by presenting the correct impedance to the transmitter.',
  G4A07:
    'High noise reduction settings may distort received signals. Too much processing removes parts of the desired signal along with noise.',
  G4A08:
    'The LOAD control on a tube amplifier is adjusted for the desired power output without exceeding maximum allowable plate current.',
  G4A09:
    'Delaying RF output after keying an external amplifier allows time for the amplifier to switch the antenna from receive to transmit mode.',
  G4A10:
    'An electronic keyer automatically generates dots and dashes for CW operation from paddle inputs, making sending easier and more consistent.',
  G4A11:
    'ALC should be inactive for AFSK data signals because its action distorts the constant-envelope signal, causing errors in the data.',
  G4A12:
    'Dual-VFO operation allows transmitting on one frequency while listening on another, useful for working split-frequency DX operations.',
  G4A13:
    'A receive attenuator prevents receiver overload from strong signals. It reduces input signal level to keep the receiver in its linear range.',

  // G4B - Test equipment; oscilloscope; antenna analyzers
  G4B01:
    'An oscilloscope contains horizontal and vertical channel amplifiers to display voltage waveforms on the screen.',
  G4B02:
    'An oscilloscope can display complex waveforms, showing the actual shape of signals over time - something a digital voltmeter cannot do.',
  G4B03:
    'An oscilloscope is best for checking CW keying waveforms because it shows the actual shape of key-down and key-up transitions.',
  G4B04:
    'The attenuated RF output of the transmitter is connected to the vertical input when checking the RF envelope pattern on an oscilloscope.',
  G4B05:
    'Voltmeters have high input impedance to minimize loading on the circuits being measured. Lower impedance would affect the circuit operation.',
  G4B06:
    'Digital multimeters offer higher precision than analog meters, with more digits of resolution and less parallax error.',
  G4B07:
    'A two-tone test uses two non-harmonically related audio frequencies. Using harmonically related tones would not reveal all distortion products.',
  G4B08:
    'A two-tone test analyzes transmitter linearity. Distortion shows as additional products beyond the two original tones.',
  G4B09:
    'An analog multimeter is preferred when adjusting for maximum or minimum values because its needle movement shows trends better than changing digits.',
  G4B10:
    'A directional wattmeter can determine standing wave ratio by measuring forward and reflected power.',
  G4B11:
    'An antenna analyzer must be connected to the antenna and feed line when measuring SWR. It generates a test signal and measures the result.',
  G4B12:
    'Strong nearby signals can cause received power that interferes with antenna analyzer SWR readings, producing incorrect measurements.',
  G4B13:
    'An antenna analyzer can measure impedance of coaxial cable, helping identify cable characteristics and problems.',

  // G4C - Interference to consumer electronics; grounding; RF safety
  G4C01:
    'A bypass capacitor can reduce RF interference to audio circuits by shunting RF energy to ground while passing audio frequencies.',
  G4C02:
    'Arcing at a poor electrical connection generates broadband interference covering a wide range of frequencies. This is a common RFI source.',
  G4C03:
    'RF interference from an SSB phone transmitter causes distorted speech to be heard from affected audio devices.',
  G4C04:
    'RF interference from a CW transmitter causes on-and-off humming or clicking in audio devices, following the keying pattern.',
  G4C05:
    'High RF voltages that can cause burns occur when the ground wire has high impedance at the operating frequency, often due to resonance.',
  G4C06:
    'A resonant ground connection can cause high RF voltages on equipment enclosures, creating safety hazards.',
  G4C07:
    'Soldered joints should not be used in lightning ground connections because the heat from a lightning strike will destroy the solder joint.',
  G4C08:
    'A ferrite choke on an audio cable creates impedance for common-mode RF current, reducing interference without affecting the audio signal.',
  G4C09:
    'Ground loops are minimized by bonding equipment enclosures together, creating a single-point ground reference.',
  G4C10:
    'A ground loop in audio connections typically causes "hum" on the transmitted signal, usually at 60 Hz or 120 Hz power line frequencies.',
  G4C11:
    'Bonding all equipment enclosures together minimizes RF "hot spots" by equalizing RF voltages across the station.',
  G4C12:
    'All metal equipment enclosures must be grounded to ensure hazardous voltages cannot appear on the chassis in case of internal faults.',

  // G4D - Speech processors; S meters; sideband frequency relationships
  G4D01:
    'A speech processor increases the apparent loudness of transmitted voice signals by increasing average power while limiting peaks.',
  G4D02:
    'A speech processor increases average power of an SSB signal without increasing peak power, making signals sound louder.',
  G4D03:
    'An incorrectly adjusted speech processor causes distorted speech, excess intermodulation products, and excessive background noise.',
  G4D04:
    'An S meter measures received signal strength, providing a relative indication of how strong incoming signals are.',
  G4D05:
    'A signal 20 dB over S9 is 100 times more powerful than S9. Each 10 dB represents a 10x power increase (10 x 10 = 100).',
  G4D06:
    'One S unit represents approximately 6 dB change in signal strength. This is the standard calibration for S meters.',
  G4D07:
    'Raising power by approximately 4 times (6 dB) will increase the S meter reading by one S unit. Power must quadruple for one S unit improvement.',
  G4D08:
    'A 3 kHz LSB signal at 7.178 MHz occupies 7.175-7.178 MHz. LSB extends below the carrier frequency.',
  G4D09:
    'A 3 kHz USB signal at 14.347 MHz occupies 14.347-14.350 MHz. USB extends above the carrier frequency.',
  G4D10:
    'With 3 kHz LSB, keep the displayed carrier at least 3 kHz above the lower band edge. The signal extends below the carrier.',
  G4D11:
    'With 3 kHz USB, keep the displayed carrier at least 3 kHz below the upper band edge. The signal extends above the carrier.',

  // G4E - HF mobile operation; alternative power sources
  G4E01:
    'A capacitance hat on a mobile antenna electrically lengthens a physically short antenna by adding capacitance, improving efficiency.',
  G4E02:
    'A corona ball on an HF mobile antenna reduces RF voltage discharge from the antenna tip while transmitting, preventing arcing.',
  G4E03:
    'A 100-watt HF mobile installation should have power connected directly to the battery using heavy-gauge wire with proper fusing.',
  G4E04:
    "A vehicle's auxiliary power socket (cigarette lighter) should not power a 100-watt transceiver because its wiring is inadequate for the current required.",
  G4E05:
    'The efficiency of electrically short antennas most limits HF mobile installations. Short antennas have low radiation resistance and efficiency.',
  G4E06:
    'Shortened mobile antennas have very limited operating bandwidth compared to full-size antennas. Retuning is often needed when changing frequency.',
  G4E07:
    'The battery charging system, fuel delivery system, and control computers can all cause receive interference in vehicle HF installations.',
  G4E08:
    'Solar panel cells are connected in series-parallel configuration to achieve both the desired voltage and current output.',
  G4E09:
    'A fully illuminated silicon photovoltaic cell produces approximately 0.5 VDC open-circuit. Multiple cells are connected in series for higher voltages.',
  G4E10:
    'A series diode between a solar panel and battery prevents the battery from discharging back through the panel when illumination is low or absent.',
  G4E11:
    'A solar panel connected to a lithium iron phosphate battery must have a charge controller to prevent overcharging and potential damage.',

  // G5A - Reactance; inductance; capacitance; impedance
  G5A01:
    'When inductive and capacitive reactance are equal in a series LC circuit, resonance occurs and impedance becomes very low, limited only by resistance.',
  G5A02:
    'Reactance is opposition to alternating current flow caused by capacitance or inductance. Unlike resistance, it varies with frequency.',
  G5A03:
    'Reactance is the opposition to AC flow in an inductor. Inductive reactance increases with frequency.',
  G5A04:
    'Reactance is the opposition to AC flow in a capacitor. Capacitive reactance decreases with frequency.',
  G5A05:
    'As frequency increases, inductive reactance increases. Inductors oppose changes in current more strongly at higher frequencies.',
  G5A06:
    'As frequency increases, capacitive reactance decreases. Capacitors pass higher frequencies more easily.',
  G5A07:
    'Admittance is the inverse of impedance, measured in siemens. It represents how easily current flows through a circuit.',
  G5A08:
    'Impedance is the ratio of voltage to current in an AC circuit, combining resistance and reactance into a single value.',
  G5A09:
    'Reactance is measured in ohms, the same unit as resistance. It represents opposition to AC current flow.',
  G5A10:
    'Transformers, Pi-networks, and transmission line sections can all be used for impedance matching at radio frequencies.',
  G5A11:
    'The letter "X" represents reactance in electrical equations. XL is inductive reactance, XC is capacitive reactance.',
  G5A12:
    'At resonance in an LC circuit, inductive reactance and capacitive reactance cancel each other, leaving only resistance.',

  // G5B - Decibels; current and voltage dividers; power calculations
  G5B01:
    'Approximately 3 dB represents a factor of two change in power. Doubling power adds 3 dB; halving power subtracts 3 dB.',
  G5B02:
    'In a parallel resistor circuit, total current equals the sum of currents through each branch. Current divides among parallel paths.',
  G5B03:
    'With 400V across 800 ohms: P = V²/R = 400²/800 = 200 watts. Power equals voltage squared divided by resistance.',
  G5B04:
    'A 12V bulb drawing 0.2 amps consumes P = V × I = 12 × 0.2 = 2.4 watts. Power equals voltage times current.',
  G5B05:
    'P = I² × R = (0.007)² × 1250 = 0.0612 watts = 61 milliwatts. Power equals current squared times resistance.',
  G5B06: '200V peak-to-peak = 100V peak = 70.7V RMS. P = V²/R = 70.7²/50 = 100 watts PEP.',
  G5B07:
    'The RMS value of an AC signal produces the same power dissipation as an equal DC voltage. RMS is the "equivalent DC" value.',
  G5B08: '120V RMS × 1.414 = 169.7V peak. Peak-to-peak = 2 × peak = 339.4 volts.',
  G5B09: '17V peak × 0.707 = 12V RMS. RMS equals peak voltage divided by the square root of 2.',
  G5B10:
    'A 1 dB power loss equals approximately 20.6% power loss. This can be calculated from 10^(-0.1) = 0.794.',
  G5B11:
    'For an unmodulated carrier, PEP equals average power, so the ratio is 1.00. The carrier level is constant.',
  G5B12: 'V = √(P × R) = √(1200 × 50) = √60000 = 245 volts RMS across the dummy load.',
  G5B13:
    'For an unmodulated carrier, PEP equals average power: 1060 watts. There is no modulation to create peaks.',
  G5B14: '500V peak-to-peak = 250V peak. P = V²/(2R) = 250²/(2 × 50) = 625 watts PEP.',

  // G5C - Resistors, capacitors, and inductors in series and parallel; transformers
  G5C01:
    'Mutual inductance causes voltage in the secondary winding when AC is applied to the primary. The changing magnetic field links both windings.',
  G5C02:
    'Applying signal to the secondary of a 4:1 step-down transformer produces 4 times the input voltage. The transformer works in reverse as a step-up.',
  G5C03: '1/Rt = 1/10 + 1/20 + 1/50 = 0.1 + 0.05 + 0.02 = 0.17. Rt = 1/0.17 = 5.9 ohms.',
  G5C04:
    'For 100 and 200 ohms in parallel: Rt = (100 × 200)/(100 + 200) = 20000/300 = 67 ohms approximately.',
  G5C05:
    'In a step-up transformer, the primary has larger wire because it carries higher current. Power in equals power out (minus losses), so lower voltage means higher current.',
  G5C06: 'Turns ratio is 1500/500 = 3. Output voltage = 120 × 3 = 360 volts.',
  G5C07:
    'Impedance ratio equals turns ratio squared. √(600/50) = √12 = 3.5:1 turns ratio matches 600 ohms to 50 ohms.',
  G5C08: 'Capacitors in parallel: 5.0nF + 5.0nF + 0.75nF = 10.75nF = 10,750 picofarads.',
  G5C09:
    'Three 100µF capacitors in series: 1/Ct = 1/100 + 1/100 + 1/100 = 3/100. Ct = 100/3 = 33.3 µF.',
  G5C10: 'Three 10mH inductors in parallel: 1/Lt = 3/10 = 0.3. Lt = 1/0.3 = 3.3 mH.',
  G5C11: 'Inductors in series add directly: 20mH + 50mH = 70 mH total inductance.',
  G5C12: '20µF and 50µF in series: Ct = (20 × 50)/(20 + 50) = 1000/70 = 14.3 µF.',
  G5C13:
    'Adding a capacitor in parallel increases total capacitance. Parallel capacitances add directly.',
  G5C14:
    'Adding an inductor in series increases total inductance. Series inductances add directly.',
}

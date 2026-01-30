/**
 * Explanations for Technician T1-T3 Questions
 * T1: FCC Rules (Subelement T1)
 * T2: Operating Procedures (Subelement T2)
 * T3: Radio Wave Characteristics (Subelement T3)
 */

export const explanationsT1T3: Record<string, string> = {
  // T1A - Purpose and permissible use of the Amateur Radio Service
  T1A01:
    'The Amateur Radio Service exists specifically to advance skills in technical and communication aspects of radio, as stated in FCC Part 97.1. It is not intended for personal communications for as many citizens as possible (that describes Citizens Band) or for non-profit organization communications.',
  T1A02:
    'The FCC (Federal Communications Commission) has exclusive regulatory authority over all radio communications in the United States under the Communications Act. FEMA handles emergency management, and Homeland Security handles national security matters, but neither regulates amateur radio.',
  T1A03:
    'The FCC encourages but does not require the use of phonetic alphabets for station identification. This voluntary practice helps ensure accurate communication of call signs, especially under poor signal conditions.',
  T1A04:
    'Each person may hold only one operator/primary station license. This prevents spectrum hoarding and simplifies the licensing system. The FCC issues a single license that covers both operator privileges and a primary station.',
  T1A05:
    'The official record of your license is the FCC Universal Licensing System (ULS) database. A printed certificate or email from a VEC confirms you passed, but the license is only valid when it appears in the FCC database.',
  T1A06:
    'A beacon is defined as an amateur station that transmits communications for observing propagation or related experimental activities. It is not a government transmitter, emergency bulletin, or weather service.',
  T1A07:
    "The FCC defines a space station as an amateur station located more than 50 km above Earth's surface. This includes amateur satellites, regardless of whether they are manned or what function they serve.",
  T1A08:
    'Volunteer Frequency Coordinators, recognized by local amateurs, recommend frequencies for repeaters and auxiliary stations. These are not government positions but community-organized roles to prevent interference.',
  T1A09:
    'Amateur operators in a local or regional area select their own Frequency Coordinator. This is a grassroots process, not controlled by the FCC or any national organization.',
  T1A10:
    'RACES (Radio Amateur Civil Emergency Service) encompasses all the listed choices: it uses amateur frequencies, amateur stations, and requires operators to be certified by and enrolled in a civil defense organization.',
  T1A11:
    'Willful interference to other amateur stations is never permitted under FCC rules, even if another station appears to be violating rules. The proper response is to document the violation and report it to the FCC.',

  // T1B - Authorized frequencies and power limits
  T1B01:
    'Technicians have phone privileges on 28.300 to 28.500 MHz in the 10 meter band. The other ranges listed are either data-only segments or outside Technician privileges.',
  T1B02:
    'Any Technician class or higher licensee can contact the ISS on VHF bands. No special permission from NASA is required since the ISS operates on frequencies within amateur bands where Technicians have privileges.',
  T1B03:
    'The 6 meter band spans 50-54 MHz, making 52.525 MHz the only valid choice. 28.50 MHz is 10 meters, 49.00 MHz is below the 6 meter band, and 222.15 MHz is in the 1.25 meter band.',
  T1B04:
    '146.52 MHz is in the 2 meter band, which spans 144-148 MHz. This frequency is the national FM simplex calling frequency.',
  T1B05:
    'The 219-220 MHz segment is restricted to fixed digital message forwarding systems only, such as packet radio nodes. This protects adjacent land mobile services from interference.',
  T1B06:
    'Technicians have phone (voice) privileges only on the 10 meter band among HF bands. Higher licenses unlock additional HF bands.',
  T1B07:
    'The segments 50.0-50.1 MHz and 144.0-144.1 MHz are CW-only on VHF. These lower portions of each band are reserved for weak-signal CW work.',
  T1B08:
    'When amateur radio is secondary in a band segment, amateurs must avoid interfering with primary users (typically non-amateur stations) who have priority.',
  T1B09:
    'All the listed reasons apply: frequency display calibration error, modulation sidebands extending beyond edges, and transmitter drift can all cause out-of-band operation. Staying slightly inside band edges provides a safety margin.',
  T1B10:
    'SSB phone is permitted in at least some segment of all amateur bands above 50 MHz. Band plans designate where different modes are typically used, but SSB is allowed somewhere in each band.',
  T1B11:
    'Technician class operators are limited to 200 watts PEP on their HF band segments (10 meter phone). This is lower than the general 1500 watt limit to encourage upgrading.',
  T1B12:
    'Above 30 MHz, Technicians can use up to 1500 watts PEP with some specific exceptions (like near radio astronomy sites). VHF and UHF are their primary bands.',

  // T1C - Licensing
  T1C01:
    'Currently, only Technician, General, and Amateur Extra licenses are issued. Novice, Technician Plus, and Advanced licenses still exist but are no longer granted to new applicants.',
  T1C02:
    'Any licensed amateur can apply for a vanity call sign. License class determines which call sign formats are available, but all amateurs may participate in the vanity program.',
  T1C03:
    'Amateur stations may make international communications incidental to the amateur service purpose and personal remarks. Business communications and broadcasting are prohibited.',
  T1C04:
    'Failure to maintain a valid email address with the FCC can result in license revocation or suspension. The FCC uses email as the primary method of official communication.',
  T1C05:
    'KF1XXX is a valid 2x3 format Technician call sign (two letter prefix, one numeral, three letter suffix). KA1X is a 2x1 (Extra only), and W1XX is a 1x2 (also Extra only).',
  T1C06:
    'FCC-licensed stations may transmit from vessels or aircraft documented/registered in the US while in international waters/airspace. Operating in foreign countries requires permission from that country.',
  T1C07:
    "Failure to maintain a correct email address with the FCC can result in license revocation or suspension. This is the FCC's primary means of contacting licensees.",
  T1C08:
    'Amateur radio licenses are issued for a 10-year term. They can be renewed within a two-year grace period after expiration.',
  T1C09:
    'There is a two-year grace period for license renewal after expiration. During this time you cannot transmit, but your call sign is protected from reassignment.',
  T1C10:
    "You may transmit as soon as your license grant appears in the FCC ULS database. The CSCE proves you passed but doesn't authorize operation until the FCC processes it.",
  T1C11:
    'You cannot transmit during the grace period while your license is expired. The grace period only preserves your eligibility to renew without retesting.',

  // T1D - Prohibited transmissions
  T1D01:
    'US amateurs cannot communicate with countries whose administration has notified the ITU of objections to such communications. This is an international regulatory matter, not determined by amateur organizations.',
  T1D02:
    'Broadcasting (transmissions intended for the general public) is prohibited for amateur stations. One-way transmissions are otherwise permitted for beacons, telecommand, Morse practice, and similar activities.',
  T1D03:
    'Encoded transmissions to obscure meaning are only permitted for control commands to space stations or radio control craft, where they protect against unauthorized control. Regular communications must not be obscured.',
  T1D04:
    'Music transmission is only authorized when incidental to retransmitting manned spacecraft communications (like NASA audio). Otherwise, music is prohibited on amateur frequencies.',
  T1D05:
    "Amateurs may notify others of equipment for sale when it's amateur radio equipment, the sale is not regular business, and no profit motive exists. Personal equipment sales are acceptable.",
  T1D06:
    'Indecent and obscene language is completely prohibited on amateur frequencies. There is no specific word list; the general prohibition applies to all such content.',
  T1D07:
    'Repeater, auxiliary, and space stations can automatically retransmit signals. Beacons transmit their own signals, and Earth stations are ground-based endpoints.',
  T1D08:
    'A control operator may receive compensation only when communications are incidental to classroom instruction at an educational institution. Other commercial compensation is prohibited.',
  T1D09:
    'Amateur stations may support broadcasting/news gathering only when directly related to immediate safety of life or property protection. This emergency exception is narrow.',
  T1D10:
    'The FCC defines broadcasting as transmissions intended for reception by the general public. Amateur transmissions must be directed to specific stations or groups, not the public at large.',
  T1D11:
    'Transmissions to control model craft do not require station identification. The low power and limited range of such transmissions make ID impractical and unnecessary.',

  // T1E - Control operator and control types
  T1E01:
    'An amateur station may never transmit without a control operator. Even automatic stations like repeaters have a designated control operator responsible for proper operation.',
  T1E02:
    'Any amateur with privileges on the satellite uplink frequency may be the control operator. No special certification is required beyond having the appropriate license class.',
  T1E03:
    "The station licensee must designate the control operator. This is the licensee's responsibility, not the FCC's or any coordinator's.",
  T1E04:
    "The control operator's license class determines transmitting privileges. Even at a higher-class licensee's station, you can only use frequencies your own license permits.",
  T1E05:
    'The control point is where the control operator function is performed - where the operator manipulates the station controls. This may be at the transmitter or a remote location.',
  T1E06:
    'A Technician may never operate in Amateur Extra band segments, regardless of who owns the station or who designates them. Operating privileges are strictly determined by your own license class.',
  T1E07:
    'Both the control operator and station licensee share responsibility for proper operation. The control operator is responsible for their actions, but the licensee is responsible for their station.',
  T1E08:
    'Repeater operation is the classic example of automatic control - the repeater operates without a control operator present, using automated systems to retransmit received signals.',
  T1E09:
    'Remote control requires all listed elements: the control operator must be at the control point, present at all times, and indirectly manipulate the controls (through a link rather than directly).',
  T1E10:
    'Operating a station over the internet is remote control as defined in Part 97. The operator is at a distant control point, manipulating controls indirectly through an internet connection.',
  T1E11:
    'The FCC presumes the station licensee is the control operator unless station records indicate otherwise. This makes the licensee responsible by default.',

  // T1F - Station identification and third-party communications
  T1F01:
    'Station and records must be available for FCC inspection at any time upon request. No advance notice or warrant is required for amateur station inspections.',
  T1F02:
    "When using tactical call signs, you must still identify with your FCC call sign at the end of each communication and every 10 minutes. Tactical calls supplement but don't replace legal ID.",
  T1F03:
    'You must transmit your call sign at least every 10 minutes during and at the end of a communication. This ensures stations can be identified for interference tracking.',
  T1F04:
    'Station identification on phone must be in English. This ensures FCC personnel and other US operators can identify stations.',
  T1F05:
    'Phone stations may identify using either CW or phone emission. This flexibility allows operators to use Morse code identification even during voice contacts.',
  T1F06:
    'All listed ways of indicating a portable or remote operation (stroke, slant, slash followed by location indicator) are acceptable on phone transmissions.',
  T1F07:
    'When a non-licensed person speaks to a foreign station via your station, that country must have a third-party agreement with the US. Not all countries permit such communications.',
  T1F08:
    "Third-party communications means a message sent by the control operator on behalf of another person - the third party. It's not about three stations or unlicensed experimenters.",
  T1F09:
    'A repeater simultaneously retransmits signals on a different channel. The input and output frequencies differ, allowing the repeater to extend range.',
  T1F10:
    'The control operator of the originating station is accountable for rule violations, even when retransmitted by a repeater. The repeater cannot control what it receives.',
  T1F11:
    'A club station license requires at least four club members. The trustee need not be Extra class, and ARRL registration is not required.',

  // T2A - Station operation: finding and contacting
  T2A01:
    'The standard repeater offset in the 2 meter band is plus or minus 600 kHz. This separation between input and output frequencies prevents the repeater from hearing itself.',
  T2A02:
    '146.520 MHz is the national calling frequency for FM simplex in the 2 meter band. Operators use this frequency to establish contact before moving to another frequency.',
  T2A03:
    'The standard repeater offset in the 70 cm (440 MHz) band is plus or minus 5 MHz. The larger offset reflects the wider bandwidth available at higher frequencies.',
  T2A04:
    'To call a specific station on a repeater, say their call sign followed by your call sign. This identifies both parties and is efficient operating practice.',
  T2A05:
    "When responding to a CQ, transmit the other station's call sign followed by your call sign. This tells them who you're responding to and who you are.",
  T2A06:
    'Test transmissions must include station identification. Even brief tests must comply with ID requirements to maintain accountability.',
  T2A07:
    "Repeater offset is the difference between the repeater's transmit (output) and receive (input) frequencies. Your radio transmits on the input and receives on the output.",
  T2A08:
    'CQ means "calling any station" - a general call seeking contact with anyone listening. It originated from the French "sécurité" (safety/attention call).',
  T2A09:
    'Saying your call sign followed by "monitoring" indicates you\'re listening on a repeater and available for contact. This is less formal than calling CQ.',
  T2A10:
    "A band plan is a voluntary guideline for using different modes and activities within a band. It promotes good operating practices but isn't legally enforceable.",
  T2A11:
    'Simplex means transmitting and receiving on the same frequency. This contrasts with repeater operation where different frequencies are used for each direction.',
  T2A12:
    "Before calling CQ, you should listen to check for activity, ask if the frequency is in use, and verify you're authorized to use that frequency. All these steps prevent interference.",

  // T2B - VHF/UHF operating practices
  T2B01:
    "The reverse function lets you listen on a repeater's input frequency to check if a station is within simplex range or to troubleshoot access issues.",
  T2B02:
    'CTCSS (Continuous Tone-Coded Squelch System) uses a sub-audible tone to open the receiver squelch. This prevents the repeater from responding to interference or other signals.',
  T2B03:
    'A linked repeater network connects multiple repeaters so a signal received by one is transmitted by all. This greatly extends coverage area.',
  T2B04:
    'If you can hear a repeater but cannot access it, the problem could be wrong offset, wrong CTCSS tone, or wrong DCS code. Any of these mismatches prevents access.',
  T2B05:
    "Speaking too loudly into the microphone causes FM audio distortion on voice peaks. The excessive audio deviation exceeds the receiver's ability to demodulate cleanly.",
  T2B06:
    'DTMF (Dual-Tone Multi-Frequency) uses pairs of audio tones, like touchtone phones. Each digit sends two simultaneous tones from different frequency groups.',
  T2B07:
    "To join a digital repeater talkgroup, program your radio with the group's ID or code. This identifies which conversation group you want to participate in.",
  T2B08:
    'When two stations interfere on the same frequency, they should negotiate continued use. Amateur radio relies on cooperation rather than rigid channel assignments.',
  T2B09:
    'Simplex channels allow stations in range of each other to communicate directly without using a repeater. This conserves repeater resources and reduces network load.',
  T2B10:
    'QRM indicates interference from other stations (man-made). QRN is natural noise, QTH is location, and QSB is signal fading.',
  T2B11:
    "QSY means you are changing frequency. It's commonly used to invite another station to move to a different frequency for a contact.",
  T2B12:
    "The color code on DMR repeaters must match for access. It's similar to CTCSS tones on analog repeaters - it prevents your radio from keying up incompatible systems.",
  T2B13:
    'Squelch mutes the receiver audio when no signal is present, eliminating the constant noise from an open receiver. This makes monitoring more comfortable.',

  // T2C - Public service and emergency communications
  T2C01:
    'FCC rules always apply to amateur operations, including during emergencies. There is no special exemption for RACES, ARES, or any other emergency organization.',
  T2C02:
    'Net Control calls the net to order and directs communications. While NCS may help choose meeting times or assist with license checking, the primary duty is managing net traffic flow.',
  T2C03:
    'Using a phonetic alphabet ensures unusual words are received correctly. Spelling words letter by letter using standard phonetics (Alpha, Bravo, Charlie...) prevents miscommunication.',
  T2C04:
    'RACES is an FCC Part 97 service specifically for civil defense communications during national emergencies. It operates under government direction with special rules.',
  T2C05:
    'In net operation, "traffic" refers to formal messages being exchanged. The term comes from telegraph and landline telephone practice.',
  T2C06:
    'ARES (Amateur Radio Emergency Service) is a volunteer organization of licensed amateurs who register their equipment and skills for public service communications.',
  T2C07:
    'Standard net practice is to transmit only when directed by Net Control, unless reporting an emergency. This maintains order and prevents chaos on the frequency.',
  T2C08:
    'Good traffic handling means passing messages exactly as received. Operators should not edit, judge worthiness, or share messages with media - just relay them accurately.',
  T2C09:
    'In genuine emergencies involving safety of life or property, operators may operate outside their frequency privileges. This narrow exception recognizes that saving lives takes priority.',
  T2C10:
    'The preamble of a formal traffic message contains tracking information: message number, precedence, handling instructions, station of origin, check, place of origin, time, and date.',
  T2C11:
    'The "check" in a radiogram header is the word count of the text portion. This helps receiving stations verify they copied the entire message correctly.',

  // T3A - Propagation characteristics
  T3A01:
    'VHF signals vary greatly over short distances due to multipath propagation. Signals arriving via different paths can reinforce or cancel each other depending on exact position.',
  T3A02:
    'Vegetation absorbs UHF and microwave signals. Leaves and branches contain water, which attenuates higher frequency signals that cannot penetrate as easily as lower frequencies.',
  T3A03:
    'Horizontal polarization is normally used for long-distance VHF/UHF CW and SSB contacts. This convention helps weak-signal operators coordinate and maximizes signal strength between stations.',
  T3A04:
    'Mismatched antenna polarization between stations reduces received signal strength significantly - potentially by 20 dB or more. Both stations should use the same polarization.',
  T3A05:
    'When obstructions block the direct path, finding a reflected path may allow communication. Buildings, mountains, or other surfaces can reflect VHF/UHF signals around obstacles.',
  T3A06:
    'Picket fencing is the rapid flutter heard on mobile signals caused by multipath propagation. The signal repeatedly strengthens and weakens as the vehicle passes through interference patterns.',
  T3A07:
    'Precipitation (rain, snow, etc.) decreases range at microwave frequencies. Water droplets absorb and scatter the signals, with greater effect at higher frequencies.',
  T3A08:
    'Irregular ionospheric fading results from signals arriving via multiple paths combining randomly. The varying phase relationships cause the signal to fluctuate unpredictably.',
  T3A09:
    'Since ionospheric signals become elliptically polarized, either vertical or horizontal antennas work for HF ionospheric communication. The ionosphere rotates the polarization unpredictably.',
  T3A10:
    'Multipath propagation increases error rates in data transmissions. Signals arriving at different times can corrupt the data, requiring error correction or slower transmission rates.',
  T3A11:
    "The ionosphere can refract or bend HF and VHF radio waves, enabling long-distance communication. The troposphere affects local propagation, while other layers don't significantly bend radio waves.",
  T3A12:
    'Fog and rain have little effect on 10 and 6 meter band signals. These lower frequencies are not significantly absorbed by water droplets, unlike microwave frequencies.',

  // T3B - Radio wave characteristics
  T3B01:
    'The electric and magnetic fields of an electromagnetic wave are at right angles (perpendicular) to each other and to the direction of propagation. This is a fundamental property of EM waves.',
  T3B02:
    'Polarization is defined by the orientation of the electric field. A vertical antenna produces vertically polarized waves; a horizontal antenna produces horizontally polarized waves.',
  T3B03:
    'Radio waves consist of electric and magnetic fields oscillating together. These fields are perpendicular to each other and propagate through space.',
  T3B04:
    'Radio waves travel at the speed of light (approximately 300,000,000 meters per second) in free space. This is a constant regardless of frequency.',
  T3B05:
    'Wavelength gets shorter as frequency increases. They are inversely related: wavelength = speed of light / frequency.',
  T3B06:
    'Wavelength in meters equals 300 divided by frequency in megahertz. This simple formula (300/f) comes from the speed of light being approximately 300,000,000 m/s.',
  T3B07:
    'Amateur bands are commonly identified by their approximate wavelength in meters (e.g., 2 meters, 70 centimeters). This tradition dates to early radio when wavelength was easier to measure than frequency.',
  T3B08:
    'VHF (Very High Frequency) is defined as 30 MHz to 300 MHz. This includes the popular 6 meter (50 MHz) and 2 meter (144 MHz) amateur bands.',
  T3B09:
    'UHF (Ultra High Frequency) spans 300 MHz to 3000 MHz (3 GHz). This includes the 70 cm (440 MHz) and 23 cm (1296 MHz) amateur bands.',
  T3B10:
    'HF (High Frequency) covers 3 MHz to 30 MHz. This range includes most of the traditional amateur bands used for long-distance ionospheric communication.',
  T3B11:
    'Radio waves travel at approximately 300,000,000 meters per second in free space - the speed of light. This value is used in wavelength calculations.',

  // T3C - Propagation modes
  T3C01:
    'UHF signals are rarely heard beyond the radio horizon because the ionosphere usually does not propagate UHF. These frequencies typically pass through the ionosphere into space.',
  T3C02:
    'HF communication differs from VHF/UHF primarily because long-distance ionospheric propagation is far more common on HF. The ionosphere regularly refracts HF signals back to Earth.',
  T3C03:
    'Auroral backscatter signals are distorted with considerable signal strength variation. The irregular aurora surface causes the signal to be scattered with Doppler effects.',
  T3C04:
    'Sporadic E propagation causes occasional strong signals on 10, 6, and 2 meters beyond the horizon. Patches of intense ionization in the E layer reflect these frequencies.',
  T3C05:
    'Knife-edge diffraction allows signals to bend around obstacles like mountain ridges or building edges. The sharp edge acts like a secondary source of waves.',
  T3C06:
    'Tropospheric ducting enables VHF/UHF communications to approximately 300 miles regularly. Temperature inversions create a waveguide effect in the lower atmosphere.',
  T3C07:
    'The 6 meter band is best for meteor scatter communication. The frequency is high enough for meteor ionization to reflect but low enough for usable propagation.',
  T3C08:
    'Tropospheric ducting is caused by temperature inversions in the atmosphere. When warm air sits above cool air, it creates a duct that guides VHF/UHF signals over long distances.',
  T3C09:
    'The best time for 10 meter F region propagation is from dawn to shortly after sunset during high sunspot activity. Solar radiation ionizes the F layer during daylight hours.',
  T3C10:
    'During sunspot cycle peaks, the 6 and 10 meter bands may provide F region long-distance propagation. Higher bands like 23 cm and 70 cm are too high in frequency for ionospheric refraction.',
  T3C11:
    "The radio horizon is more distant than the visual horizon because the atmosphere slightly refracts radio waves. This bending allows signals to follow Earth's curvature somewhat.",
}

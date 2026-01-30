/**
 * Subelement Metadata
 * Provides human-readable names for ham radio exam subelements
 */

const SUBELEMENT_NAMES: Record<string, string> = {
  // Technician Class
  T1: "Commission's Rules",
  T2: 'Operating Procedures',
  T3: 'Radio Wave Propagation',
  T4: 'Amateur Radio Practices',
  T5: 'Electrical Principles',
  T6: 'Circuit Components',
  T7: 'Station Equipment',
  T8: 'Modulation and Signals',
  T9: 'Antennas and Feed Lines',
  T0: 'Safety',

  // General Class
  G1: "Commission's Rules",
  G2: 'Operating Procedures',
  G3: 'Radio Wave Propagation',
  G4: 'Amateur Radio Practices',
  G5: 'Electrical Principles',
  G6: 'Circuit Components',
  G7: 'Practical Circuits',
  G8: 'Signals and Emissions',
  G9: 'Antennas and Feed Lines',
  G0: 'Electrical and RF Safety',

  // Extra Class (placeholder for future)
  E1: "Commission's Rules",
  E2: 'Operating Procedures',
  E3: 'Radio Wave Propagation',
  E4: 'Amateur Radio Practices',
  E5: 'Electrical Principles',
  E6: 'Circuit Components',
  E7: 'Practical Circuits',
  E8: 'Signals and Emissions',
  E9: 'Antennas and Feed Lines',
  E0: 'Safety',
}

/**
 * Get the human-readable name for a subelement code
 * @param subelement - The subelement code (e.g., 'T1', 'G2')
 * @returns The human-readable name for the subelement, or the code itself if not found
 */
export function getSubelementName(subelement: string): string {
  return SUBELEMENT_NAMES[subelement] || subelement
}

/**
 * Get all subelement names for an exam prefix
 * @param prefix - The exam prefix ('T' for Technician, 'G' for General, 'E' for Extra)
 * @returns Record of subelement code to name mappings
 */
export function getSubelementNames(prefix: 'T' | 'G' | 'E'): Record<string, string> {
  const result: Record<string, string> = {}
  for (const [key, value] of Object.entries(SUBELEMENT_NAMES)) {
    if (key.startsWith(prefix)) {
      result[key] = value
    }
  }
  return result
}

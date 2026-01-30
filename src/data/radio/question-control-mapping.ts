/**
 * Question-Control Cross-Reference Mapping
 * Bidirectional mappings between exam questions and IC-7300 controls
 */

/**
 * Represents a mapping between an exam question and related radio controls
 */
export interface QuestionControlMapping {
  /** The question ID from the exam pool (e.g., "T4B02", "G4A01") */
  questionId: string
  /** Array of control IDs from ic7300-controls.ts that relate to this question */
  controlIds: string[]
  /** Relevance level: 'direct' = question is specifically about the control, 'related' = tangentially relevant */
  relevance: 'direct' | 'related'
}

/**
 * Mappings between exam questions and IC-7300 controls
 * Covers Technician (T) and General (G) question pools
 */
export const QUESTION_CONTROL_MAPPINGS: QuestionControlMapping[] = [
  // ============================================
  // TECHNICIAN POOL - T4 (Amateur Radio Practices)
  // ============================================

  // T4B01 - Excessive microphone gain on SSB
  {
    questionId: 'T4B01',
    controlIds: ['mode-ssb'],
    relevance: 'related',
  },

  // T4B02 - VFO knob to enter frequency
  {
    questionId: 'T4B02',
    controlIds: ['main-dial', 'multi-function'],
    relevance: 'direct',
  },

  // T4B03 - How squelch is adjusted for weak FM signals
  {
    questionId: 'T4B03',
    controlIds: ['squelch'],
    relevance: 'direct',
  },

  // T4B04 - Memory channels for quick access
  {
    questionId: 'T4B04',
    controlIds: ['memory-ch', 'mw'],
    relevance: 'direct',
  },

  // T4B05 - FM transceiver scanning function
  {
    questionId: 'T4B05',
    controlIds: ['memory-ch'],
    relevance: 'related',
  },

  // T4B06 - RIT/Clarifier for adjusting voice pitch
  {
    questionId: 'T4B06',
    controlIds: ['xit-rit', 'main-dial'],
    relevance: 'direct',
  },

  // T4B08 - Multiple receive bandwidth choices
  {
    questionId: 'T4B08',
    controlIds: ['filter-width'],
    relevance: 'direct',
  },

  // T4B10 - Best filter bandwidth for SSB reception
  {
    questionId: 'T4B10',
    controlIds: ['filter-width', 'mode-ssb'],
    relevance: 'direct',
  },

  // T4B12 - Result of tuning FM receiver above/below frequency
  {
    questionId: 'T4B12',
    controlIds: ['main-dial', 'mode-fm'],
    relevance: 'related',
  },

  // ============================================
  // TECHNICIAN POOL - T7 (Station Equipment)
  // ============================================

  // T7A01 - Receiver sensitivity
  {
    questionId: 'T7A01',
    controlIds: ['rf-gain'],
    relevance: 'related',
  },

  // T7A02 - What is a transceiver
  {
    questionId: 'T7A02',
    controlIds: ['power-button'],
    relevance: 'related',
  },

  // T7A04 - Receiver selectivity
  {
    questionId: 'T7A04',
    controlIds: ['filter-width'],
    relevance: 'related',
  },

  // T7A05 - Oscillator circuit (VFO concept)
  {
    questionId: 'T7A05',
    controlIds: ['main-dial'],
    relevance: 'related',
  },

  // T7A07 - PTT input function
  {
    questionId: 'T7A07',
    controlIds: ['mode-cw'],
    relevance: 'related',
  },

  // T7A08 - Combining speech with RF (modulation)
  {
    questionId: 'T7A08',
    controlIds: ['mode-ssb', 'mode-am', 'mode-fm'],
    relevance: 'related',
  },

  // T7A09 - SSB/CW-FM switch on power amplifier
  {
    questionId: 'T7A09',
    controlIds: ['mode-ssb', 'mode-cw', 'mode-fm'],
    relevance: 'direct',
  },

  // T7A10 - Power amplifier increases output
  {
    questionId: 'T7A10',
    controlIds: ['rf-power'],
    relevance: 'related',
  },

  // T7A11 - RF preamplifier location
  {
    questionId: 'T7A11',
    controlIds: ['rf-gain'],
    relevance: 'related',
  },

  // T7B01 - FM over-deviating
  {
    questionId: 'T7B01',
    controlIds: ['mode-fm'],
    relevance: 'related',
  },

  // T7B07 - VHF transceiver overload from commercial FM
  {
    questionId: 'T7B07',
    controlIds: ['rf-gain'],
    relevance: 'related',
  },

  // T7B10 - Distorted audio through FM repeater
  {
    questionId: 'T7B10',
    controlIds: ['main-dial', 'mode-fm'],
    relevance: 'related',
  },

  // T7C04 - SWR meter reading for perfect match
  {
    questionId: 'T7C04',
    controlIds: ['tuner'],
    relevance: 'related',
  },

  // T7C05 - Solid-state transmitters reduce power at high SWR
  {
    questionId: 'T7C05',
    controlIds: ['rf-power', 'tuner'],
    relevance: 'related',
  },

  // T7C06 - SWR reading interpretation
  {
    questionId: 'T7C06',
    controlIds: ['tuner'],
    relevance: 'related',
  },

  // T7C08 - Instrument to determine SWR
  {
    questionId: 'T7C08',
    controlIds: ['tuner'],
    relevance: 'related',
  },

  // ============================================
  // TECHNICIAN POOL - T2 (Operating Procedures)
  // ============================================

  // T2B02 - Sub-audible tone to open squelch (CTCSS)
  {
    questionId: 'T2B02',
    controlIds: ['squelch'],
    relevance: 'direct',
  },

  // T2B13 - Purpose of squelch function
  {
    questionId: 'T2B13',
    controlIds: ['squelch'],
    relevance: 'direct',
  },

  // ============================================
  // TECHNICIAN POOL - T8 (Signals and Emissions)
  // ============================================

  // T8A02 - Type of modulation for VHF packet radio
  {
    questionId: 'T8A02',
    controlIds: ['mode-fm'],
    relevance: 'related',
  },

  // T8A03 - Common SSB phone mode
  {
    questionId: 'T8A03',
    controlIds: ['mode-ssb'],
    relevance: 'related',
  },

  // T8A04 - Common VHF/UHF voice repeater mode
  {
    questionId: 'T8A04',
    controlIds: ['mode-fm'],
    relevance: 'direct',
  },

  // T8A05 - Narrowest bandwidth signal type (CW)
  {
    questionId: 'T8A05',
    controlIds: ['mode-cw', 'filter-width'],
    relevance: 'direct',
  },

  // T8A07 - SSB vs FM characteristics
  {
    questionId: 'T8A07',
    controlIds: ['mode-ssb', 'mode-fm', 'filter-width'],
    relevance: 'direct',
  },

  // T8A08 - Bandwidth of SSB voice signal
  {
    questionId: 'T8A08',
    controlIds: ['mode-ssb', 'filter-width'],
    relevance: 'direct',
  },

  // T8A09 - Bandwidth of FM voice signal
  {
    questionId: 'T8A09',
    controlIds: ['mode-fm', 'filter-width'],
    relevance: 'direct',
  },

  // T8A11 - Bandwidth required for CW
  {
    questionId: 'T8A11',
    controlIds: ['mode-cw', 'filter-width'],
    relevance: 'direct',
  },

  // T8D09 - What is CW
  {
    questionId: 'T8D09',
    controlIds: ['mode-cw'],
    relevance: 'direct',
  },

  // ============================================
  // TECHNICIAN POOL - T9 (Antennas and Feed Lines)
  // ============================================

  // T9B04 - Antenna tuner function
  {
    questionId: 'T9B04',
    controlIds: ['tuner'],
    relevance: 'direct',
  },

  // ============================================
  // TECHNICIAN POOL - T1 (Rules and Regulations)
  // ============================================

  // T1B07 - VHF/UHF CW-only segments
  {
    questionId: 'T1B07',
    controlIds: ['mode-cw'],
    relevance: 'related',
  },

  // T1B10 - Where SSB phone may be used above 50 MHz
  {
    questionId: 'T1B10',
    controlIds: ['mode-ssb'],
    relevance: 'related',
  },

  // T1B11 - Maximum PEP output for Technicians on HF
  {
    questionId: 'T1B11',
    controlIds: ['rf-power'],
    relevance: 'related',
  },

  // T1B12 - Maximum PEP output above 30 MHz
  {
    questionId: 'T1B12',
    controlIds: ['rf-power'],
    relevance: 'related',
  },

  // ============================================
  // GENERAL POOL - G4A (Station Equipment)
  // ============================================

  // G4A01 - Purpose of notch filter
  {
    questionId: 'G4A01',
    controlIds: ['notch'],
    relevance: 'direct',
  },

  // G4A02 - Reverse sideband when receiving CW
  {
    questionId: 'G4A02',
    controlIds: ['mode-cw', 'mode-ssb'],
    relevance: 'related',
  },

  // G4A03 - How noise blanker works
  {
    questionId: 'G4A03',
    controlIds: ['nb'],
    relevance: 'direct',
  },

  // G4A05 - ALC with RF power amplifier
  {
    questionId: 'G4A05',
    controlIds: ['rf-power'],
    relevance: 'related',
  },

  // G4A06 - Purpose of antenna tuner
  {
    questionId: 'G4A06',
    controlIds: ['tuner'],
    relevance: 'direct',
  },

  // G4A07 - Effect of increasing noise reduction
  {
    questionId: 'G4A07',
    controlIds: ['nr'],
    relevance: 'direct',
  },

  // G4A10 - Function of electronic keyer
  {
    questionId: 'G4A10',
    controlIds: ['mode-cw'],
    relevance: 'related',
  },

  // G4A12 - Dual-VFO feature use
  {
    questionId: 'G4A12',
    controlIds: ['main-dial', 'xit-rit'],
    relevance: 'direct',
  },

  // G4A13 - Purpose of receive attenuator
  {
    questionId: 'G4A13',
    controlIds: ['rf-gain'],
    relevance: 'direct',
  },

  // ============================================
  // GENERAL POOL - G4D (Speech Processors, S Meters)
  // ============================================

  // G4D01 - Purpose of speech processor
  {
    questionId: 'G4D01',
    controlIds: ['mode-ssb'],
    relevance: 'related',
  },

  // G4D02 - Speech processor effect on SSB
  {
    questionId: 'G4D02',
    controlIds: ['mode-ssb', 'rf-power'],
    relevance: 'related',
  },

  // G4D04 - What S meter measures
  {
    questionId: 'G4D04',
    controlIds: ['rf-gain'],
    relevance: 'related',
  },

  // G4D05 - Signal strength comparison (20 dB over S9)
  {
    questionId: 'G4D05',
    controlIds: ['rf-gain'],
    relevance: 'related',
  },

  // G4D06 - One S unit equals 6 dB
  {
    questionId: 'G4D06',
    controlIds: ['rf-gain'],
    relevance: 'related',
  },

  // G4D07 - Power increase for one S unit change
  {
    questionId: 'G4D07',
    controlIds: ['rf-power'],
    relevance: 'related',
  },

  // G4D08 - LSB signal frequency range
  {
    questionId: 'G4D08',
    controlIds: ['mode-ssb', 'main-dial', 'filter-width'],
    relevance: 'direct',
  },

  // G4D09 - USB signal frequency range
  {
    questionId: 'G4D09',
    controlIds: ['mode-ssb', 'main-dial', 'filter-width'],
    relevance: 'direct',
  },

  // G4D10 - LSB carrier frequency near band edge
  {
    questionId: 'G4D10',
    controlIds: ['mode-ssb', 'main-dial'],
    relevance: 'direct',
  },

  // G4D11 - USB carrier frequency near band edge
  {
    questionId: 'G4D11',
    controlIds: ['mode-ssb', 'main-dial'],
    relevance: 'direct',
  },

  // ============================================
  // GENERAL POOL - G7C (Receivers and Transmitters)
  // ============================================

  // G7C01 - Sideband filter selection
  {
    questionId: 'G7C01',
    controlIds: ['filter-width', 'mode-ssb'],
    relevance: 'direct',
  },

  // G7C04 - Product detector in SSB receiver
  {
    questionId: 'G7C04',
    controlIds: ['mode-ssb'],
    relevance: 'related',
  },

  // G7C05 - DDS characteristics
  {
    questionId: 'G7C05',
    controlIds: ['main-dial'],
    relevance: 'related',
  },

  // G7C06 - DSP filter advantages
  {
    questionId: 'G7C06',
    controlIds: ['filter-width', 'nr', 'nb', 'notch'],
    relevance: 'direct',
  },

  // G7C07 - Filter insertion loss
  {
    questionId: 'G7C07',
    controlIds: ['filter-width'],
    relevance: 'related',
  },

  // G7C08 - Receiver sensitivity parameters
  {
    questionId: 'G7C08',
    controlIds: ['rf-gain'],
    relevance: 'related',
  },

  // G7C11 - SDR software functions (filtering)
  {
    questionId: 'G7C11',
    controlIds: ['filter-width', 'nr', 'notch'],
    relevance: 'related',
  },

  // G7C12 - Low-pass filter cutoff frequency
  {
    questionId: 'G7C12',
    controlIds: ['filter-width'],
    relevance: 'related',
  },

  // G7C13 - Filter ultimate rejection
  {
    questionId: 'G7C13',
    controlIds: ['filter-width', 'notch'],
    relevance: 'related',
  },

  // G7C14 - Band-pass filter bandwidth measurement
  {
    questionId: 'G7C14',
    controlIds: ['filter-width'],
    relevance: 'direct',
  },

  // ============================================
  // GENERAL POOL - G7B (Amplifiers, Oscillators)
  // ============================================

  // G7B07 - Sine wave oscillator components
  {
    questionId: 'G7B07',
    controlIds: ['main-dial'],
    relevance: 'related',
  },

  // G7B08 - RF power amplifier efficiency
  {
    questionId: 'G7B08',
    controlIds: ['rf-power'],
    relevance: 'related',
  },

  // G7B09 - LC oscillator frequency determination
  {
    questionId: 'G7B09',
    controlIds: ['main-dial'],
    relevance: 'related',
  },

  // G7B11 - Class C amplifier appropriate for FM
  {
    questionId: 'G7B11',
    controlIds: ['mode-fm', 'rf-power'],
    relevance: 'related',
  },

  // ============================================
  // GENERAL POOL - G2A (Phone Operating)
  // ============================================

  // G2A03 - SSB voice mode on VHF/UHF
  {
    questionId: 'G2A03',
    controlIds: ['mode-ssb'],
    relevance: 'direct',
  },

  // G2A06 - Advantage of SSB over FM
  {
    questionId: 'G2A06',
    controlIds: ['mode-ssb', 'mode-fm', 'filter-width'],
    relevance: 'direct',
  },

  // G2A07 - SSB characteristics
  {
    questionId: 'G2A07',
    controlIds: ['mode-ssb'],
    relevance: 'direct',
  },

  // G2A10 - VOX advantage
  {
    questionId: 'G2A10',
    controlIds: ['mode-ssb'],
    relevance: 'related',
  },

  // G2A11 - ALC setting control (microphone gain)
  {
    questionId: 'G2A11',
    controlIds: ['mode-ssb', 'af-gain'],
    relevance: 'related',
  },

  // ============================================
  // GENERAL POOL - G2B (Operating Procedures)
  // ============================================

  // G2B04 - CW frequency separation
  {
    questionId: 'G2B04',
    controlIds: ['mode-cw', 'main-dial'],
    relevance: 'related',
  },

  // G2B05 - SSB frequency separation
  {
    questionId: 'G2B05',
    controlIds: ['mode-ssb', 'main-dial'],
    relevance: 'related',
  },

  // ============================================
  // GENERAL POOL - G2C (CW Operating)
  // ============================================

  // G2C01 - Full break-in CW operation (QSK)
  {
    questionId: 'G2C01',
    controlIds: ['mode-cw'],
    relevance: 'direct',
  },

  // G2C06 - Zero beat in CW operation
  {
    questionId: 'G2C06',
    controlIds: ['mode-cw', 'main-dial'],
    relevance: 'direct',
  },

  // ============================================
  // GENERAL POOL - G2E (Digital Modes)
  // ============================================

  // G2E01 - RTTY mode via AFSK with SSB
  {
    questionId: 'G2E01',
    controlIds: ['mode-rtty', 'mode-ssb'],
    relevance: 'direct',
  },

  // G2E06 - Common RTTY frequency shift
  {
    questionId: 'G2E06',
    controlIds: ['mode-rtty'],
    relevance: 'direct',
  },

  // G2E14 - Cannot decode RTTY/FSK signal
  {
    questionId: 'G2E14',
    controlIds: ['mode-rtty', 'main-dial'],
    relevance: 'related',
  },

  // ============================================
  // GENERAL POOL - G8A (Modulation)
  // ============================================

  // G8A07 - Narrowest bandwidth phone emission (SSB)
  {
    questionId: 'G8A07',
    controlIds: ['mode-ssb', 'filter-width'],
    relevance: 'direct',
  },

  // G8A08 - Effect of overmodulation
  {
    questionId: 'G8A08',
    controlIds: ['mode-ssb', 'mode-am'],
    relevance: 'related',
  },

  // ============================================
  // GENERAL POOL - G8B (Bandwidth and Signals)
  // ============================================

  // G8B06 - FM transmission bandwidth
  {
    questionId: 'G8B06',
    controlIds: ['mode-fm', 'filter-width'],
    relevance: 'direct',
  },

  // G8B09 - Matching receiver bandwidth to mode
  {
    questionId: 'G8B09',
    controlIds: ['filter-width'],
    relevance: 'direct',
  },

  // G8B10 - Symbol rate and bandwidth relationship
  {
    questionId: 'G8B10',
    controlIds: ['filter-width', 'mode-rtty'],
    relevance: 'related',
  },

  // ============================================
  // GENERAL POOL - G8C (Digital Protocols)
  // ============================================

  // G8C13 - Waterfall display showing overdriven signal
  {
    questionId: 'G8C13',
    controlIds: ['spectrum', 'mode-rtty'],
    relevance: 'direct',
  },

  // ============================================
  // TECHNICIAN POOL - T3 (Radio Wave Characteristics)
  // ============================================

  // T3A03 - Antenna polarization for CW/SSB on VHF/UHF
  {
    questionId: 'T3A03',
    controlIds: ['mode-cw', 'mode-ssb'],
    relevance: 'related',
  },

  // ============================================
  // Additional Mappings for Comprehensive Coverage
  // ============================================

  // T4A12 - Electronic keyer
  {
    questionId: 'T4A12',
    controlIds: ['mode-cw'],
    relevance: 'related',
  },

  // G4B03 - Oscilloscope for CW keying waveform
  {
    questionId: 'G4B03',
    controlIds: ['mode-cw'],
    relevance: 'related',
  },

  // G4B07 - Two-tone test signals
  {
    questionId: 'G4B07',
    controlIds: ['mode-ssb'],
    relevance: 'related',
  },

  // G4B08 - Two-tone test analyzes linearity
  {
    questionId: 'G4B08',
    controlIds: ['mode-ssb', 'rf-power'],
    relevance: 'related',
  },

  // G4C04 - CW transmitter RF interference sound
  {
    questionId: 'G4C04',
    controlIds: ['mode-cw'],
    relevance: 'related',
  },

  // T2B01 - Reverse function for repeater input frequency
  {
    questionId: 'T2B01',
    controlIds: ['main-dial', 'mode-fm'],
    relevance: 'related',
  },

  // G4A09 - Delay RF output for CW
  {
    questionId: 'G4A09',
    controlIds: ['mode-cw'],
    relevance: 'related',
  },

  // G4E06 - Shortened mobile antenna bandwidth limitation
  {
    questionId: 'G4E06',
    controlIds: ['tuner'],
    relevance: 'related',
  },

  // T6D02 - Capacitor stores energy in electric field (related to filter capacitors)
  {
    questionId: 'T6D02',
    controlIds: ['filter-width'],
    relevance: 'related',
  },

  // G9D04 - Log-periodic antenna wide bandwidth
  {
    questionId: 'G9D04',
    controlIds: ['tuner'],
    relevance: 'related',
  },
]

// ============================================
// Helper Functions
// ============================================

/**
 * Cache for reverse lookup (control -> questions)
 * Built lazily on first access
 */
let controlToQuestionsCache: Map<string, string[]> | null = null

/**
 * Cache for forward lookup (question -> controls)
 * Built lazily on first access
 */
let questionToControlsCache: Map<string, string[]> | null = null

/**
 * Builds the question-to-controls cache if not already built
 */
function ensureQuestionCache(): Map<string, string[]> {
  if (questionToControlsCache === null) {
    questionToControlsCache = new Map()
    for (const mapping of QUESTION_CONTROL_MAPPINGS) {
      questionToControlsCache.set(mapping.questionId, mapping.controlIds)
    }
  }
  return questionToControlsCache
}

/**
 * Builds the control-to-questions cache if not already built
 */
function ensureControlCache(): Map<string, string[]> {
  if (controlToQuestionsCache === null) {
    controlToQuestionsCache = new Map()
    for (const mapping of QUESTION_CONTROL_MAPPINGS) {
      for (const controlId of mapping.controlIds) {
        const existing = controlToQuestionsCache.get(controlId) || []
        existing.push(mapping.questionId)
        controlToQuestionsCache.set(controlId, existing)
      }
    }
  }
  return controlToQuestionsCache
}

/**
 * Get all control IDs related to a question
 * @param questionId - The question ID (e.g., "T4B02", "G4A01")
 * @returns Array of control IDs related to the question, or empty array if no mappings exist
 */
export function getControlsForQuestion(questionId: string): string[] {
  const cache = ensureQuestionCache()
  return cache.get(questionId) || []
}

/**
 * Get all question IDs related to a control
 * @param controlId - The control ID (e.g., "main-dial", "squelch")
 * @returns Array of question IDs related to the control, or empty array if no mappings exist
 */
export function getQuestionsForControl(controlId: string): string[] {
  const cache = ensureControlCache()
  return cache.get(controlId) || []
}

/**
 * Check if a question has any related controls
 * @param questionId - The question ID to check
 * @returns true if the question has at least one related control
 */
export function hasRelatedControls(questionId: string): boolean {
  return getControlsForQuestion(questionId).length > 0
}

/**
 * Check if a control has any related questions
 * @param controlId - The control ID to check
 * @returns true if the control has at least one related question
 */
export function hasRelatedQuestions(controlId: string): boolean {
  return getQuestionsForControl(controlId).length > 0
}

/**
 * Get the full mapping for a question including relevance
 * @param questionId - The question ID to look up
 * @returns The full QuestionControlMapping or undefined if not found
 */
export function getMappingForQuestion(questionId: string): QuestionControlMapping | undefined {
  return QUESTION_CONTROL_MAPPINGS.find((m) => m.questionId === questionId)
}

/**
 * Get all mappings for a specific control
 * @param controlId - The control ID to look up
 * @returns Array of QuestionControlMappings that include this control
 */
export function getMappingsForControl(controlId: string): QuestionControlMapping[] {
  return QUESTION_CONTROL_MAPPINGS.filter((m) => m.controlIds.includes(controlId))
}

/**
 * Get all direct (not just related) mappings for a control
 * @param controlId - The control ID to look up
 * @returns Array of question IDs that are directly about this control
 */
export function getDirectQuestionsForControl(controlId: string): string[] {
  return QUESTION_CONTROL_MAPPINGS.filter(
    (m) => m.relevance === 'direct' && m.controlIds.includes(controlId)
  ).map((m) => m.questionId)
}

/**
 * Get statistics about the mappings
 * @returns Object with mapping statistics
 */
export function getMappingStats(): {
  totalMappings: number
  directMappings: number
  relatedMappings: number
  uniqueQuestions: number
  uniqueControls: number
} {
  const controlCache = ensureControlCache()

  return {
    totalMappings: QUESTION_CONTROL_MAPPINGS.length,
    directMappings: QUESTION_CONTROL_MAPPINGS.filter((m) => m.relevance === 'direct').length,
    relatedMappings: QUESTION_CONTROL_MAPPINGS.filter((m) => m.relevance === 'related').length,
    uniqueQuestions: QUESTION_CONTROL_MAPPINGS.length,
    uniqueControls: controlCache.size,
  }
}

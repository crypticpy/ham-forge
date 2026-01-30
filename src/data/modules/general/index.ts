/**
 * General Class Learning Modules Index
 * Exports all learning modules for the General exam
 */

import type { LearningModule } from '@/types/learning'
import { commissionRulesModule } from './commission-rules'
import { operatingProceduresModule } from './operating-procedures'
import { radioWavePropagationModule } from './radio-wave-propagation'
import { amateurPracticesModule } from './amateur-practices'
import { electricalPrinciplesModule } from './electrical-principles'
import { circuitComponentsModule } from './circuit-components'
import { practicalCircuitsModule } from './practical-circuits'
import { signalsEmissionsModule } from './signals-emissions'
import { antennasFeedLinesModule } from './antennas-feed-lines'
import { safetyModule } from './safety'

/**
 * All learning modules for the General class exam
 * Ordered by subelement (G1-G0)
 */
export const generalModules: LearningModule[] = [
  commissionRulesModule, // G1
  operatingProceduresModule, // G2
  radioWavePropagationModule, // G3
  amateurPracticesModule, // G4
  electricalPrinciplesModule, // G5
  circuitComponentsModule, // G6
  practicalCircuitsModule, // G7
  signalsEmissionsModule, // G8
  antennasFeedLinesModule, // G9
  safetyModule, // G0
]

// Also export as 'modules' for compatibility with dynamic imports
export const modules = generalModules

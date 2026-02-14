/**
 * Amateur Extra Class Learning Modules Index
 * Exports all learning modules for the Extra exam
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
 * All learning modules for the Amateur Extra class exam
 * Ordered by subelement (E1-E0)
 */
export const extraModules: LearningModule[] = [
  commissionRulesModule, // E1
  operatingProceduresModule, // E2
  radioWavePropagationModule, // E3
  amateurPracticesModule, // E4
  electricalPrinciplesModule, // E5
  circuitComponentsModule, // E6
  practicalCircuitsModule, // E7
  signalsEmissionsModule, // E8
  antennasFeedLinesModule, // E9
  safetyModule, // E0
]

// Also export as 'modules' for compatibility with dynamic imports
export const modules = extraModules


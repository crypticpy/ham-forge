/**
 * Technician Class Learning Modules Index
 * Exports all learning modules for the Technician exam
 */

import type { LearningModule } from '@/types/learning'
import { commissionRulesModule } from './commission-rules'
import { operatingProceduresModule } from './operating-procedures'
import { radioWavePropagationModule } from './radio-wave-propagation'
import { amateurPracticesModule } from './amateur-practices'
import { electricalPrinciplesModule } from './electrical-principles'
import { circuitComponentsModule } from './circuit-components'
import { stationEquipmentModule } from './station-equipment'
import { modulationSignalsModule } from './modulation-signals'
import { antennasFeedLinesModule } from './antennas-feed-lines'
import { safetyModule } from './safety'

/**
 * All learning modules for the Technician class exam
 * Ordered by subelement (T1-T0)
 */
export const technicianModules: LearningModule[] = [
  commissionRulesModule, // T1
  operatingProceduresModule, // T2
  radioWavePropagationModule, // T3
  amateurPracticesModule, // T4
  electricalPrinciplesModule, // T5
  circuitComponentsModule, // T6
  stationEquipmentModule, // T7
  modulationSignalsModule, // T8
  antennasFeedLinesModule, // T9
  safetyModule, // T0
]

// Also export as 'modules' for compatibility with dynamic imports
export const modules = technicianModules

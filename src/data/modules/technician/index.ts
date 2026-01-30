/**
 * Technician Class Learning Modules Index
 * Exports all learning modules for the Technician exam
 */

import type { LearningModule } from '@/types/learning'
import { commissionRulesModule } from './commission-rules'

/**
 * All learning modules for the Technician class exam
 * Ordered by subelement (T1-T0)
 */
export const technicianModules: LearningModule[] = [
  commissionRulesModule,
  // Future modules:
  // operatingProceduresModule,     // T2
  // radioWavePropagationModule,    // T3
  // amateurRadioPracticesModule,   // T4
  // electricalPrinciplesModule,    // T5
  // circuitComponentsModule,       // T6
  // stationEquipmentModule,        // T7
  // modulationAndSignalsModule,    // T8
  // antennasAndFeedLinesModule,    // T9
  // safetyModule,                  // T0
]

// Also export as 'modules' for compatibility with dynamic imports
export const modules = technicianModules

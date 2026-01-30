/**
 * General Class Learning Modules Index
 * Exports all learning modules for the General exam
 */

import type { LearningModule } from '@/types/learning'
import { commissionRulesModule } from './commission-rules'

/**
 * All learning modules for the General class exam
 * Ordered by subelement (G1-G0)
 */
export const generalModules: LearningModule[] = [
  commissionRulesModule, // G1
  // Future modules:
  // operatingProceduresModule,      // G2
  // radioWavePropagationModule,     // G3
  // amateurRadioPracticesModule,    // G4
  // electricalPrinciplesModule,     // G5
  // circuitComponentsModule,        // G6
  // practicalCircuitsModule,        // G7
  // signalsAndEmissionsModule,      // G8
  // antennasAndFeedLinesModule,     // G9
  // safetyModule,                   // G0
]

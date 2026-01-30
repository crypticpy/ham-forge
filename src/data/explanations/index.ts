/**
 * Question Explanations Index
 * Consolidates all explanation files and provides lookup functions
 */

import { explanationsT1T3 } from './technician-t1-t3'
import { explanationsT4T6 } from './technician-t4-t6'
import { explanationsT7T0 } from './technician-t7-t0'
import { explanationsG1G5 } from './general-g1-g5'
import { explanationsG6G0 } from './general-g6-g0'

/**
 * Combined explanations lookup for all question pools
 */
const allExplanations: Record<string, string> = {
  ...explanationsT1T3,
  ...explanationsT4T6,
  ...explanationsT7T0,
  ...explanationsG1G5,
  ...explanationsG6G0,
}

/**
 * Get the explanation for a specific question
 * @param questionId - The question ID (e.g., 'T1A01', 'G5B03')
 * @returns The explanation string, or undefined if not found
 */
export function getExplanation(questionId: string): string | undefined {
  return allExplanations[questionId]
}

/**
 * Check if an explanation exists for a question
 * @param questionId - The question ID to check
 * @returns True if an explanation exists
 */
export function hasExplanation(questionId: string): boolean {
  return questionId in allExplanations
}

/**
 * Get the total count of available explanations
 * @returns The number of explanations in the database
 */
export function getExplanationCount(): number {
  return Object.keys(allExplanations).length
}

// Re-export individual explanation sets for direct access if needed
export { explanationsT1T3 } from './technician-t1-t3'
export { explanationsT4T6 } from './technician-t4-t6'
export { explanationsT7T0 } from './technician-t7-t0'
export { explanationsG1G5 } from './general-g1-g5'
export { explanationsG6G0 } from './general-g6-g0'

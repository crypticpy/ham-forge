/**
 * Learning Module Types
 * Types for educational content organized by exam subelements
 */

import type { ExamLevel } from './question'

/**
 * A learning module corresponds to an exam subelement (e.g., T1, G2)
 * and contains educational content organized into sections
 */
export interface LearningModule {
  /** Subelement ID, e.g., 'T1', 'G2' */
  id: string
  /** The exam level this module belongs to */
  examLevel: ExamLevel
  /** Human-readable title, e.g., "Commission's Rules" */
  title: string
  /** Brief description of what this module covers */
  description: string
  /** Ordered array of learning sections within this module */
  sections: LearningSection[]
  /** Estimated reading time in minutes */
  estimatedMinutes: number
}

/**
 * Interactive component types available for learning sections
 */
export type InteractiveComponentType =
  | 'ohms-law-calculator'
  | 'ionosphere-visualizer'
  | 'phonetic-trainer'
  | 'band-plan-explorer'
  | 'decibel-calculator'
  | 'frequency-wavelength-converter'
  | 'q-code-reference'
  | 'power-calculator'
  | 'modulation-demo'
  | 'circuit-identifier'
  | 'rst-trainer'
  | 'qso-trainer'

/**
 * A learning section corresponds to an exam group (e.g., T1A, T1B)
 * and contains focused educational content on a specific topic
 */
export interface LearningSection {
  /** Section ID, e.g., 'T1A', 'T1B' */
  id: string
  /** Human-readable title for this section */
  title: string
  /** Educational content in markdown format */
  content: string
  /** Key takeaways as bullet points */
  keyPoints: string[]
  /** Optional links to related question IDs in the pool */
  relatedQuestionIds?: string[]
  /** Optional interactive components to display for this section */
  interactiveComponents?: InteractiveComponentType[]
}

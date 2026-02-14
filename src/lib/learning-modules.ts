/**
 * Learning Modules Library
 * Utilities for accessing and querying learning module content
 */

import type { ExamLevel } from '@/types/question'
import type { LearningModule, LearningSection } from '@/types/learning'
import { technicianModules } from '@/data/modules/technician'
import { generalModules } from '@/data/modules/general'
import { extraModules } from '@/data/modules/extra'

/**
 * Module registry organized by exam level
 */
const moduleRegistry: Record<ExamLevel, LearningModule[]> = {
  technician: technicianModules,
  general: generalModules,
  extra: extraModules,
}

/**
 * Get all learning modules for a specific exam level
 * @param examLevel - The exam level to get modules for
 * @returns Array of learning modules for that exam level
 */
export function getModulesForExamLevel(examLevel: ExamLevel): LearningModule[] {
  return moduleRegistry[examLevel] || []
}

/**
 * Get a specific learning module by ID
 * @param examLevel - The exam level the module belongs to
 * @param moduleId - The module ID (subelement code, e.g., 'T1', 'G2')
 * @returns The learning module if found, undefined otherwise
 */
export function getModuleById(examLevel: ExamLevel, moduleId: string): LearningModule | undefined {
  const modules = getModulesForExamLevel(examLevel)
  return modules.find((module) => module.id === moduleId)
}

/**
 * Get a specific section within a learning module
 * @param examLevel - The exam level the module belongs to
 * @param moduleId - The module ID (subelement code, e.g., 'T1')
 * @param sectionId - The section ID (group code, e.g., 'T1A')
 * @returns The learning section if found, undefined otherwise
 */
export function getSectionById(
  examLevel: ExamLevel,
  moduleId: string,
  sectionId: string
): LearningSection | undefined {
  const module = getModuleById(examLevel, moduleId)
  if (!module) return undefined
  return module.sections.find((section) => section.id === sectionId)
}

/**
 * Get all sections across all modules for an exam level
 * Useful for building navigation or search indexes
 * @param examLevel - The exam level to get sections for
 * @returns Array of all sections with their parent module ID
 */
export function getAllSections(
  examLevel: ExamLevel
): Array<{ moduleId: string; section: LearningSection }> {
  const modules = getModulesForExamLevel(examLevel)
  const sections: Array<{ moduleId: string; section: LearningSection }> = []

  for (const module of modules) {
    for (const section of module.sections) {
      sections.push({ moduleId: module.id, section })
    }
  }

  return sections
}

/**
 * Calculate total estimated reading time for an exam level
 * @param examLevel - The exam level to calculate for
 * @returns Total estimated minutes across all modules
 */
export function getTotalEstimatedMinutes(examLevel: ExamLevel): number {
  const modules = getModulesForExamLevel(examLevel)
  return modules.reduce((total, module) => total + module.estimatedMinutes, 0)
}

/**
 * Find sections related to a specific question ID
 * @param examLevel - The exam level to search in
 * @param questionId - The question ID to find related sections for
 * @returns Array of sections that reference this question
 */
export function findSectionsForQuestion(
  examLevel: ExamLevel,
  questionId: string
): Array<{ moduleId: string; section: LearningSection }> {
  const allSections = getAllSections(examLevel)
  return allSections.filter(
    ({ section }) => section.relatedQuestionIds?.includes(questionId) ?? false
  )
}

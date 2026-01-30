/**
 * Data Export/Import
 * Handles exporting and importing HamForge user data
 */

import { db } from './db'
import { useProgressStore } from '@/stores/progress-store'
import type { QuestionProgress, ExamAttempt, StudySession } from '@/types'

export interface HamForgeExportData {
  version: string // "1.0"
  exportedAt: string // ISO date
  progress: {
    questionProgress: QuestionProgress[]
    examAttempts: ExamAttempt[]
    studySessions: StudySession[]
  }
  settings: {
    currentStreak: number
    longestStreak: number
    lastStudyDate: string | null
    totalQuestionsAnswered: number
    totalCorrect: number
    completedModules: Record<string, string[]>
    flaggedQuestions: string[]
  }
}

/**
 * Export all user data from IndexedDB and Zustand store
 */
export async function exportAllData(): Promise<HamForgeExportData> {
  // Get data from IndexedDB
  const questionProgress = await db.questionProgress.toArray()
  const examAttempts = await db.examAttempts.toArray()
  const studySessions = await db.studySessions.toArray()

  // Get data from Zustand store
  const storeState = useProgressStore.getState()

  return {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    progress: {
      questionProgress,
      examAttempts,
      studySessions,
    },
    settings: {
      currentStreak: storeState.currentStreak,
      longestStreak: storeState.longestStreak,
      lastStudyDate: storeState.lastStudyDate,
      totalQuestionsAnswered: storeState.totalQuestionsAnswered,
      totalCorrect: storeState.totalCorrect,
      completedModules: storeState.completedModules,
      flaggedQuestions: storeState.flaggedQuestions,
    },
  }
}

/**
 * Import data from a HamForgeExportData object
 * This will clear existing data and replace with imported data
 */
export async function importData(
  data: HamForgeExportData
): Promise<{ success: boolean; message: string }> {
  try {
    // Clear existing IndexedDB data
    await db.questionProgress.clear()
    await db.examAttempts.clear()
    await db.studySessions.clear()

    // Import IndexedDB data
    // Convert date strings back to Date objects for proper storage
    const questionProgress = data.progress.questionProgress.map((qp) => ({
      ...qp,
      lastAttempt: new Date(qp.lastAttempt),
      nextReview: new Date(qp.nextReview),
    }))

    const examAttempts = data.progress.examAttempts.map((ea) => ({
      ...ea,
      date: new Date(ea.date),
    }))

    const studySessions = data.progress.studySessions.map((ss) => ({
      ...ss,
      startTime: new Date(ss.startTime),
      endTime: ss.endTime ? new Date(ss.endTime) : undefined,
    }))

    // Bulk add the data
    if (questionProgress.length > 0) {
      await db.questionProgress.bulkAdd(questionProgress)
    }
    if (examAttempts.length > 0) {
      await db.examAttempts.bulkAdd(examAttempts)
    }
    if (studySessions.length > 0) {
      await db.studySessions.bulkAdd(studySessions)
    }

    // Update Zustand store directly
    useProgressStore.setState({
      currentStreak: data.settings.currentStreak,
      longestStreak: data.settings.longestStreak,
      lastStudyDate: data.settings.lastStudyDate,
      totalQuestionsAnswered: data.settings.totalQuestionsAnswered,
      totalCorrect: data.settings.totalCorrect,
      completedModules: data.settings.completedModules,
      flaggedQuestions: data.settings.flaggedQuestions,
    })

    const totalRecords = questionProgress.length + examAttempts.length + studySessions.length
    return {
      success: true,
      message: `Successfully imported ${totalRecords} records and settings.`,
    }
  } catch (error) {
    console.error('Import failed:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'An unknown error occurred during import.',
    }
  }
}

/**
 * Download the export data as a JSON file
 */
export function downloadAsJson(data: HamForgeExportData, filename: string): void {
  const jsonString = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonString], { type: 'application/json' })
  const url = URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.style.display = 'none'

  document.body.appendChild(link)
  link.click()

  // Clean up
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Type guard to validate import data structure
 */
export function validateImportData(data: unknown): data is HamForgeExportData {
  if (typeof data !== 'object' || data === null) {
    return false
  }

  const obj = data as Record<string, unknown>

  // Check version
  if (typeof obj.version !== 'string') {
    return false
  }

  // Check exportedAt
  if (typeof obj.exportedAt !== 'string') {
    return false
  }

  // Check progress object
  if (typeof obj.progress !== 'object' || obj.progress === null) {
    return false
  }

  const progress = obj.progress as Record<string, unknown>

  if (!Array.isArray(progress.questionProgress)) {
    return false
  }

  if (!Array.isArray(progress.examAttempts)) {
    return false
  }

  if (!Array.isArray(progress.studySessions)) {
    return false
  }

  // Check settings object
  if (typeof obj.settings !== 'object' || obj.settings === null) {
    return false
  }

  const settings = obj.settings as Record<string, unknown>

  if (typeof settings.currentStreak !== 'number') {
    return false
  }

  if (typeof settings.longestStreak !== 'number') {
    return false
  }

  if (settings.lastStudyDate !== null && typeof settings.lastStudyDate !== 'string') {
    return false
  }

  if (typeof settings.totalQuestionsAnswered !== 'number') {
    return false
  }

  if (typeof settings.totalCorrect !== 'number') {
    return false
  }

  if (typeof settings.completedModules !== 'object' || settings.completedModules === null) {
    return false
  }

  if (!Array.isArray(settings.flaggedQuestions)) {
    return false
  }

  return true
}

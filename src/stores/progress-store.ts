'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { getLocalDateString, getYesterdayDateString } from '@/lib/date-utils'

interface SectionQuizResult {
  passed: boolean
  score: number
  attempts: number
}

interface ProgressState {
  // Study streak
  currentStreak: number
  longestStreak: number
  lastStudyDate: string | null // ISO date string

  // Quick stats (detailed stats come from IndexedDB)
  totalQuestionsAnswered: number
  totalCorrect: number

  // Module completion tracking
  // Maps moduleId -> array of completed sectionIds
  completedModules: Record<string, string[]>

  // Flagged questions for later review
  flaggedQuestions: string[] // Array of question IDs

  // Section quiz results
  // Maps sectionId -> quiz result
  sectionQuizResults: Record<string, SectionQuizResult>

  // Actions
  recordStudyDay: () => void
  incrementAnswered: (correct: boolean) => void
  resetProgress: () => void

  // Module tracking actions
  markSectionComplete: (moduleId: string, sectionId: string) => void
  markSectionIncomplete: (moduleId: string, sectionId: string) => void
  resetModuleProgress: (moduleId: string) => void

  // Module tracking selectors
  isSectionComplete: (moduleId: string, sectionId: string) => boolean
  getCompletedSections: (moduleId: string) => string[]
  getModuleProgress: (moduleId: string, totalSections: number) => number

  // Question flagging actions
  toggleFlagQuestion: (questionId: string) => void
  isFlagged: (questionId: string) => boolean
  clearAllFlags: () => void
  getFlaggedCount: () => number

  // Quiz result actions
  recordQuizResult: (sectionId: string, passed: boolean, score: number) => void
  getSectionQuizResult: (sectionId: string) => SectionQuizResult | null
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: null,
      totalQuestionsAnswered: 0,
      totalCorrect: 0,
      completedModules: {},
      flaggedQuestions: [],
      sectionQuizResults: {},

      recordStudyDay: () => {
        const today = getLocalDateString()
        const { lastStudyDate, currentStreak, longestStreak } = get()

        // Already studied today
        if (lastStudyDate === today) return

        const yesterday = getYesterdayDateString()

        let newStreak: number
        if (lastStudyDate === yesterday) {
          // Continuing streak
          newStreak = currentStreak + 1
        } else {
          // Streak broken or first day
          newStreak = 1
        }

        set({
          lastStudyDate: today,
          currentStreak: newStreak,
          longestStreak: Math.max(longestStreak, newStreak),
        })
      },

      incrementAnswered: (correct) =>
        set((state) => ({
          totalQuestionsAnswered: state.totalQuestionsAnswered + 1,
          totalCorrect: state.totalCorrect + (correct ? 1 : 0),
        })),

      resetProgress: () =>
        set({
          currentStreak: 0,
          longestStreak: 0,
          lastStudyDate: null,
          totalQuestionsAnswered: 0,
          totalCorrect: 0,
          completedModules: {},
          flaggedQuestions: [],
          sectionQuizResults: {},
        }),

      // Mark a section as complete
      markSectionComplete: (moduleId, sectionId) =>
        set((state) => {
          const currentSections = state.completedModules[moduleId] || []
          if (currentSections.includes(sectionId)) {
            return state // Already marked
          }
          return {
            completedModules: {
              ...state.completedModules,
              [moduleId]: [...currentSections, sectionId],
            },
          }
        }),

      // Mark a section as incomplete (undo completion)
      markSectionIncomplete: (moduleId, sectionId) =>
        set((state) => {
          const currentSections = state.completedModules[moduleId] || []
          return {
            completedModules: {
              ...state.completedModules,
              [moduleId]: currentSections.filter((id) => id !== sectionId),
            },
          }
        }),

      // Reset all progress for a specific module
      resetModuleProgress: (moduleId) =>
        set((state) => {
          const rest = { ...state.completedModules }
          delete rest[moduleId]
          return {
            completedModules: rest,
          }
        }),

      // Check if a section is complete
      isSectionComplete: (moduleId, sectionId) => {
        const { completedModules } = get()
        const sections = completedModules[moduleId] || []
        return sections.includes(sectionId)
      },

      // Get all completed sections for a module
      getCompletedSections: (moduleId) => {
        const { completedModules } = get()
        return completedModules[moduleId] || []
      },

      // Get progress percentage for a module (0-100)
      getModuleProgress: (moduleId, totalSections) => {
        const { completedModules } = get()
        const completed = completedModules[moduleId]?.length || 0
        if (totalSections === 0) return 0
        return Math.round((completed / totalSections) * 100)
      },

      // Toggle flag status for a question (add if not present, remove if present)
      toggleFlagQuestion: (questionId) =>
        set((state) => {
          const isFlagged = state.flaggedQuestions.includes(questionId)
          return {
            flaggedQuestions: isFlagged
              ? state.flaggedQuestions.filter((id) => id !== questionId)
              : [...state.flaggedQuestions, questionId],
          }
        }),

      // Check if a question is flagged
      isFlagged: (questionId) => {
        const { flaggedQuestions } = get()
        return flaggedQuestions.includes(questionId)
      },

      // Clear all flagged questions
      clearAllFlags: () =>
        set({
          flaggedQuestions: [],
        }),

      // Get the count of flagged questions
      getFlaggedCount: () => {
        const { flaggedQuestions } = get()
        return flaggedQuestions.length
      },

      // Record a quiz result for a section
      recordQuizResult: (sectionId, passed, score) =>
        set((state) => {
          const existing = state.sectionQuizResults[sectionId]
          const attempts = existing ? existing.attempts + 1 : 1
          return {
            sectionQuizResults: {
              ...state.sectionQuizResults,
              [sectionId]: {
                passed,
                score,
                attempts,
              },
            },
          }
        }),

      // Get quiz result for a section
      getSectionQuizResult: (sectionId) => {
        const { sectionQuizResults } = get()
        return sectionQuizResults[sectionId] ?? null
      },
    }),
    {
      name: 'hamforge-progress',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

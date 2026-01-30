'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ProgressState {
  // Study streak
  currentStreak: number
  longestStreak: number
  lastStudyDate: string | null // ISO date string

  // Quick stats (detailed stats come from IndexedDB)
  totalQuestionsAnswered: number
  totalCorrect: number

  // Actions
  recordStudyDay: () => void
  incrementAnswered: (correct: boolean) => void
  resetProgress: () => void
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      currentStreak: 0,
      longestStreak: 0,
      lastStudyDate: null,
      totalQuestionsAnswered: 0,
      totalCorrect: 0,

      recordStudyDay: () => {
        const today = new Date().toISOString().split('T')[0]
        const { lastStudyDate, currentStreak, longestStreak } = get()

        if (lastStudyDate === today) return // Already recorded today

        const yesterday = new Date()
        yesterday.setDate(yesterday.getDate() - 1)
        const yesterdayStr = yesterday.toISOString().split('T')[0]

        let newStreak = 1
        if (lastStudyDate === yesterdayStr) {
          newStreak = currentStreak + 1
        }

        set({
          currentStreak: newStreak,
          longestStreak: Math.max(newStreak, longestStreak),
          lastStudyDate: today,
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
        }),
    }),
    {
      name: 'hamforge-progress',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

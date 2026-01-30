'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { ExamLevel } from '@/types'

interface StudyState {
  currentExamLevel: ExamLevel
  isStudying: boolean
  currentSessionId: string | null

  // Actions
  setExamLevel: (level: ExamLevel) => void
  startSession: (sessionId: string) => void
  endSession: () => void
}

export const useStudyStore = create<StudyState>()(
  persist(
    (set) => ({
      currentExamLevel: 'technician',
      isStudying: false,
      currentSessionId: null,

      setExamLevel: (level) => set({ currentExamLevel: level }),
      startSession: (sessionId) => set({ isStudying: true, currentSessionId: sessionId }),
      endSession: () => set({ isStudying: false, currentSessionId: null }),
    }),
    {
      name: 'hamforge-study',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

'use client'

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface SettingsState {
  // Exam settings
  showTimer: boolean
  shuffleAnswers: boolean
  showExplanations: boolean

  // Actions
  toggleTimer: () => void
  toggleShuffleAnswers: () => void
  toggleExplanations: () => void
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      showTimer: true,
      shuffleAnswers: true,
      showExplanations: true,

      toggleTimer: () => set((state) => ({ showTimer: !state.showTimer })),
      toggleShuffleAnswers: () => set((state) => ({ shuffleAnswers: !state.shuffleAnswers })),
      toggleExplanations: () => set((state) => ({ showExplanations: !state.showExplanations })),
    }),
    {
      name: 'hamforge-settings',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

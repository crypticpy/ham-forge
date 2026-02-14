/**
 * Progress Store Integration Tests
 *
 * Tests for the Zustand progress store with persistence middleware.
 * Covers study tracking, answer tracking, question flagging,
 * module/section completion, quiz results, and localStorage persistence.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useProgressStore } from '@/stores/progress-store'
import { getLocalDateString } from '@/lib/date-utils'

/**
 * Reset the store to its initial state before each test.
 * This is necessary because Zustand stores persist between tests.
 */
function resetStore() {
  useProgressStore.getState().resetProgress()
}

describe('Progress Store', () => {
  beforeEach(() => {
    // Clear localStorage and reset store before each test
    localStorage.clear()
    resetStore()
  })

  describe('Study tracking', () => {
    describe('recordStudyDay()', () => {
      it('should update lastStudyDate to today when recording study day', () => {
        const store = useProgressStore.getState()
        const today = getLocalDateString()

        expect(store.lastStudyDate).toBeNull()

        store.recordStudyDay()

        const updatedStore = useProgressStore.getState()
        expect(updatedStore.lastStudyDate).toBe(today)
      })

      it('should set streak to 1 on first study day', () => {
        const store = useProgressStore.getState()

        expect(store.currentStreak).toBe(0)

        store.recordStudyDay()

        const updatedStore = useProgressStore.getState()
        expect(updatedStore.currentStreak).toBe(1)
      })

      it('should not update when called multiple times on same day', () => {
        const store = useProgressStore.getState()

        store.recordStudyDay()
        const firstUpdate = useProgressStore.getState()
        expect(firstUpdate.currentStreak).toBe(1)

        store.recordStudyDay()
        const secondUpdate = useProgressStore.getState()
        expect(secondUpdate.currentStreak).toBe(1)
      })

      it('should increment streak on consecutive days', () => {
        // Mock Date to control time
        const today = new Date('2024-06-15')
        const yesterday = new Date('2024-06-14')

        vi.useFakeTimers()
        vi.setSystemTime(yesterday)

        useProgressStore.getState().recordStudyDay()
        expect(useProgressStore.getState().currentStreak).toBe(1)

        // Move to next day
        vi.setSystemTime(today)

        useProgressStore.getState().recordStudyDay()
        expect(useProgressStore.getState().currentStreak).toBe(2)

        vi.useRealTimers()
      })

      it('should reset streak after gap of more than 1 day', () => {
        const day1 = new Date('2024-06-10')
        const day3 = new Date('2024-06-13') // 3 days later (gap of 2 days)

        vi.useFakeTimers()
        vi.setSystemTime(day1)

        useProgressStore.getState().recordStudyDay()
        expect(useProgressStore.getState().currentStreak).toBe(1)

        // Skip to day 3 (missing day 2, gap > 1)
        vi.setSystemTime(day3)

        useProgressStore.getState().recordStudyDay()
        expect(useProgressStore.getState().currentStreak).toBe(1) // Reset to 1

        vi.useRealTimers()
      })

      it('should track longest streak separately from current streak', () => {
        vi.useFakeTimers()

        // Build up a 3-day streak
        vi.setSystemTime(new Date('2024-06-01'))
        useProgressStore.getState().recordStudyDay()

        vi.setSystemTime(new Date('2024-06-02'))
        useProgressStore.getState().recordStudyDay()

        vi.setSystemTime(new Date('2024-06-03'))
        useProgressStore.getState().recordStudyDay()

        expect(useProgressStore.getState().currentStreak).toBe(3)
        expect(useProgressStore.getState().longestStreak).toBe(3)

        // Break the streak (skip a day)
        vi.setSystemTime(new Date('2024-06-05'))
        useProgressStore.getState().recordStudyDay()

        expect(useProgressStore.getState().currentStreak).toBe(1)
        expect(useProgressStore.getState().longestStreak).toBe(3) // Preserved

        vi.useRealTimers()
      })

      it('should update longestStreak when currentStreak exceeds it', () => {
        vi.useFakeTimers()

        // Build up a 2-day streak
        vi.setSystemTime(new Date('2024-06-01'))
        useProgressStore.getState().recordStudyDay()

        vi.setSystemTime(new Date('2024-06-02'))
        useProgressStore.getState().recordStudyDay()

        expect(useProgressStore.getState().longestStreak).toBe(2)

        // Break and start new streak
        vi.setSystemTime(new Date('2024-06-10'))
        useProgressStore.getState().recordStudyDay()

        vi.setSystemTime(new Date('2024-06-11'))
        useProgressStore.getState().recordStudyDay()

        vi.setSystemTime(new Date('2024-06-12'))
        useProgressStore.getState().recordStudyDay()

        // New streak (3) exceeds old longest (2)
        expect(useProgressStore.getState().currentStreak).toBe(3)
        expect(useProgressStore.getState().longestStreak).toBe(3)

        vi.useRealTimers()
      })
    })
  })

  describe('Answer tracking', () => {
    describe('incrementAnswered()', () => {
      it('should update totalQuestionsAnswered when incrementing', () => {
        const store = useProgressStore.getState()

        expect(store.totalQuestionsAnswered).toBe(0)

        store.incrementAnswered(true)
        expect(useProgressStore.getState().totalQuestionsAnswered).toBe(1)

        store.incrementAnswered(false)
        expect(useProgressStore.getState().totalQuestionsAnswered).toBe(2)

        store.incrementAnswered(true)
        expect(useProgressStore.getState().totalQuestionsAnswered).toBe(3)
      })

      it('should increment totalCorrect only for correct answers', () => {
        const store = useProgressStore.getState()

        expect(store.totalCorrect).toBe(0)

        store.incrementAnswered(true)
        expect(useProgressStore.getState().totalCorrect).toBe(1)

        store.incrementAnswered(false)
        expect(useProgressStore.getState().totalCorrect).toBe(1) // Unchanged

        store.incrementAnswered(true)
        expect(useProgressStore.getState().totalCorrect).toBe(2)
      })

      it('should persist totalAnswered across store resets via persistence', () => {
        const store = useProgressStore.getState()

        // Increment some answers
        store.incrementAnswered(true)
        store.incrementAnswered(false)
        store.incrementAnswered(true)

        expect(useProgressStore.getState().totalQuestionsAnswered).toBe(3)
        expect(useProgressStore.getState().totalCorrect).toBe(2)

        // Note: resetProgress() will clear these values
        // But localStorage persistence should maintain values if we don't call reset
        // Verify the values are in localStorage
        const persistedData = localStorage.getItem('hamforge-progress')
        expect(persistedData).not.toBeNull()

        const parsed = JSON.parse(persistedData!)
        expect(parsed.state.totalQuestionsAnswered).toBe(3)
        expect(parsed.state.totalCorrect).toBe(2)
      })
    })
  })

  describe('Question flagging', () => {
    describe('toggleFlagQuestion()', () => {
      it('should add question to flaggedQuestions when not already flagged', () => {
        const store = useProgressStore.getState()

        expect(store.flaggedQuestions).toEqual([])

        store.toggleFlagQuestion('T1A01')

        expect(useProgressStore.getState().flaggedQuestions).toContain('T1A01')
      })

      it('should remove question from flaggedQuestions when already flagged', () => {
        const store = useProgressStore.getState()

        // Flag the question first
        store.toggleFlagQuestion('T1A01')
        expect(useProgressStore.getState().flaggedQuestions).toContain('T1A01')

        // Toggle again to unflag
        store.toggleFlagQuestion('T1A01')
        expect(useProgressStore.getState().flaggedQuestions).not.toContain('T1A01')
      })

      it('should handle multiple flagged questions', () => {
        const store = useProgressStore.getState()

        store.toggleFlagQuestion('T1A01')
        store.toggleFlagQuestion('T1A02')
        store.toggleFlagQuestion('T1A03')

        const flagged = useProgressStore.getState().flaggedQuestions
        expect(flagged).toHaveLength(3)
        expect(flagged).toContain('T1A01')
        expect(flagged).toContain('T1A02')
        expect(flagged).toContain('T1A03')
      })

      it('should only remove the specific question when toggling off', () => {
        const store = useProgressStore.getState()

        store.toggleFlagQuestion('T1A01')
        store.toggleFlagQuestion('T1A02')
        store.toggleFlagQuestion('T1A03')

        // Remove middle question
        store.toggleFlagQuestion('T1A02')

        const flagged = useProgressStore.getState().flaggedQuestions
        expect(flagged).toHaveLength(2)
        expect(flagged).toContain('T1A01')
        expect(flagged).not.toContain('T1A02')
        expect(flagged).toContain('T1A03')
      })
    })

    describe('isFlagged()', () => {
      it('should return true for flagged questions', () => {
        const store = useProgressStore.getState()

        store.toggleFlagQuestion('T1A01')

        expect(store.isFlagged('T1A01')).toBe(true)
      })

      it('should return false for non-flagged questions', () => {
        const store = useProgressStore.getState()

        expect(store.isFlagged('T1A01')).toBe(false)
      })

      it('should return correct status after toggle', () => {
        const store = useProgressStore.getState()

        expect(store.isFlagged('T1A01')).toBe(false)

        store.toggleFlagQuestion('T1A01')
        expect(useProgressStore.getState().isFlagged('T1A01')).toBe(true)

        store.toggleFlagQuestion('T1A01')
        expect(useProgressStore.getState().isFlagged('T1A01')).toBe(false)
      })
    })

    describe('getFlaggedCount()', () => {
      it('should return 0 when no questions are flagged', () => {
        const store = useProgressStore.getState()
        expect(store.getFlaggedCount()).toBe(0)
      })

      it('should return correct count of flagged questions', () => {
        const store = useProgressStore.getState()

        store.toggleFlagQuestion('T1A01')
        store.toggleFlagQuestion('T1A02')

        expect(useProgressStore.getState().getFlaggedCount()).toBe(2)
      })
    })

    describe('clearAllFlags()', () => {
      it('should remove all flagged questions', () => {
        const store = useProgressStore.getState()

        store.toggleFlagQuestion('T1A01')
        store.toggleFlagQuestion('T1A02')
        store.toggleFlagQuestion('T1A03')

        expect(useProgressStore.getState().getFlaggedCount()).toBe(3)

        store.clearAllFlags()

        expect(useProgressStore.getState().flaggedQuestions).toEqual([])
        expect(useProgressStore.getState().getFlaggedCount()).toBe(0)
      })
    })
  })

  describe('Module completion', () => {
    describe('markSectionComplete()', () => {
      it('should track section completion within a module', () => {
        const store = useProgressStore.getState()

        store.markSectionComplete('T1', 'T1A')

        const completedSections = useProgressStore.getState().completedModules['T1']
        expect(completedSections).toContain('T1A')
      })

      it('should not duplicate section if already marked complete', () => {
        const store = useProgressStore.getState()

        store.markSectionComplete('T1', 'T1A')
        store.markSectionComplete('T1', 'T1A')

        const completedSections = useProgressStore.getState().completedModules['T1']
        expect(completedSections).toHaveLength(1)
      })

      it('should track multiple sections within a module', () => {
        const store = useProgressStore.getState()

        store.markSectionComplete('T1', 'T1A')
        store.markSectionComplete('T1', 'T1B')
        store.markSectionComplete('T1', 'T1C')

        const completedSections = useProgressStore.getState().completedModules['T1']
        expect(completedSections).toHaveLength(3)
        expect(completedSections).toContain('T1A')
        expect(completedSections).toContain('T1B')
        expect(completedSections).toContain('T1C')
      })

      it('should track sections across multiple modules', () => {
        const store = useProgressStore.getState()

        store.markSectionComplete('T1', 'T1A')
        store.markSectionComplete('T2', 'T2A')
        store.markSectionComplete('T2', 'T2B')

        const state = useProgressStore.getState()
        expect(state.completedModules['T1']).toHaveLength(1)
        expect(state.completedModules['T2']).toHaveLength(2)
      })
    })

    describe('isSectionComplete()', () => {
      it('should return true for completed sections', () => {
        const store = useProgressStore.getState()

        store.markSectionComplete('T1', 'T1A')

        expect(useProgressStore.getState().isSectionComplete('T1', 'T1A')).toBe(true)
      })

      it('should return false for incomplete sections', () => {
        const store = useProgressStore.getState()

        expect(store.isSectionComplete('T1', 'T1A')).toBe(false)
      })

      it('should return false for non-existent module', () => {
        const store = useProgressStore.getState()

        expect(store.isSectionComplete('NonExistent', 'Section1')).toBe(false)
      })
    })

    describe('markSectionIncomplete()', () => {
      it('should remove section from completed list', () => {
        const store = useProgressStore.getState()

        store.markSectionComplete('T1', 'T1A')
        expect(useProgressStore.getState().isSectionComplete('T1', 'T1A')).toBe(true)

        store.markSectionIncomplete('T1', 'T1A')
        expect(useProgressStore.getState().isSectionComplete('T1', 'T1A')).toBe(false)
      })

      it('should not affect other sections when marking one incomplete', () => {
        const store = useProgressStore.getState()

        store.markSectionComplete('T1', 'T1A')
        store.markSectionComplete('T1', 'T1B')
        store.markSectionComplete('T1', 'T1C')

        store.markSectionIncomplete('T1', 'T1B')

        const state = useProgressStore.getState()
        expect(state.isSectionComplete('T1', 'T1A')).toBe(true)
        expect(state.isSectionComplete('T1', 'T1B')).toBe(false)
        expect(state.isSectionComplete('T1', 'T1C')).toBe(true)
      })

      it('should handle marking incomplete for non-existent section gracefully', () => {
        const store = useProgressStore.getState()

        // Should not throw
        store.markSectionIncomplete('T1', 'NonExistent')

        expect(useProgressStore.getState().completedModules['T1']).toEqual([])
      })
    })

    describe('resetModuleProgress()', () => {
      it('should remove module from completedModules', () => {
        const store = useProgressStore.getState()

        store.markSectionComplete('T1', 'T1A')
        store.markSectionComplete('T1', 'T1B')

        expect(useProgressStore.getState().completedModules['T1']).toHaveLength(2)

        store.resetModuleProgress('T1')

        expect(useProgressStore.getState().completedModules['T1']).toBeUndefined()
      })

      it('should not affect other modules when resetting one', () => {
        const store = useProgressStore.getState()

        store.markSectionComplete('T1', 'T1A')
        store.markSectionComplete('T2', 'T2A')
        store.markSectionComplete('T2', 'T2B')

        store.resetModuleProgress('T1')

        const state = useProgressStore.getState()
        expect(state.completedModules['T1']).toBeUndefined()
        expect(state.completedModules['T2']).toHaveLength(2)
      })
    })

    describe('getCompletedSections()', () => {
      it('should return array of completed section IDs', () => {
        const store = useProgressStore.getState()

        store.markSectionComplete('T1', 'T1A')
        store.markSectionComplete('T1', 'T1B')

        expect(useProgressStore.getState().getCompletedSections('T1')).toEqual(['T1A', 'T1B'])
      })

      it('should return empty array for module with no completions', () => {
        const store = useProgressStore.getState()

        expect(store.getCompletedSections('T1')).toEqual([])
      })
    })

    describe('getModuleProgress()', () => {
      it('should return 0 when no sections are complete', () => {
        const store = useProgressStore.getState()

        expect(store.getModuleProgress('T1', 10)).toBe(0)
      })

      it('should return correct percentage', () => {
        const store = useProgressStore.getState()

        store.markSectionComplete('T1', 'T1A')
        store.markSectionComplete('T1', 'T1B')

        // 2 out of 10 = 20%
        expect(useProgressStore.getState().getModuleProgress('T1', 10)).toBe(20)
      })

      it('should return 100 when all sections complete', () => {
        const store = useProgressStore.getState()

        store.markSectionComplete('T1', 'T1A')
        store.markSectionComplete('T1', 'T1B')
        store.markSectionComplete('T1', 'T1C')

        expect(useProgressStore.getState().getModuleProgress('T1', 3)).toBe(100)
      })

      it('should return 0 when totalSections is 0', () => {
        const store = useProgressStore.getState()

        expect(store.getModuleProgress('T1', 0)).toBe(0)
      })

      it('should round to nearest integer', () => {
        const store = useProgressStore.getState()

        store.markSectionComplete('T1', 'T1A')

        // 1 out of 3 = 33.33...% -> rounds to 33
        expect(useProgressStore.getState().getModuleProgress('T1', 3)).toBe(33)
      })
    })
  })

  describe('Quiz results', () => {
    describe('recordQuizResult()', () => {
      it('should save quiz result for a section', () => {
        const store = useProgressStore.getState()

        store.recordQuizResult('T1A', true, 85)

        const result = useProgressStore.getState().sectionQuizResults['T1A']
        expect(result).toBeDefined()
        expect(result.passed).toBe(true)
        expect(result.score).toBe(85)
        expect(result.attempts).toBe(1)
      })

      it('should increment attempts on subsequent quiz results', () => {
        const store = useProgressStore.getState()

        store.recordQuizResult('T1A', false, 60)
        expect(useProgressStore.getState().sectionQuizResults['T1A'].attempts).toBe(1)

        store.recordQuizResult('T1A', false, 70)
        expect(useProgressStore.getState().sectionQuizResults['T1A'].attempts).toBe(2)

        store.recordQuizResult('T1A', true, 85)
        expect(useProgressStore.getState().sectionQuizResults['T1A'].attempts).toBe(3)
      })

      it('should update passed and score on subsequent attempts', () => {
        const store = useProgressStore.getState()

        store.recordQuizResult('T1A', false, 60)
        let result = useProgressStore.getState().sectionQuizResults['T1A']
        expect(result.passed).toBe(false)
        expect(result.score).toBe(60)

        store.recordQuizResult('T1A', true, 90)
        result = useProgressStore.getState().sectionQuizResults['T1A']
        expect(result.passed).toBe(true)
        expect(result.score).toBe(90)
      })

      it('should track quiz results for multiple sections', () => {
        const store = useProgressStore.getState()

        store.recordQuizResult('T1A', true, 85)
        store.recordQuizResult('T1B', false, 65)
        store.recordQuizResult('T2A', true, 100)

        const state = useProgressStore.getState()
        expect(state.sectionQuizResults['T1A'].score).toBe(85)
        expect(state.sectionQuizResults['T1B'].score).toBe(65)
        expect(state.sectionQuizResults['T2A'].score).toBe(100)
      })
    })

    describe('getSectionQuizResult()', () => {
      it('should retrieve correct quiz result for a section', () => {
        const store = useProgressStore.getState()

        store.recordQuizResult('T1A', true, 85)

        const result = useProgressStore.getState().getSectionQuizResult('T1A')
        expect(result).not.toBeNull()
        expect(result?.passed).toBe(true)
        expect(result?.score).toBe(85)
        expect(result?.attempts).toBe(1)
      })

      it('should return null for section with no quiz result', () => {
        const store = useProgressStore.getState()

        expect(store.getSectionQuizResult('T1A')).toBeNull()
      })

      it('should return most recent result after multiple attempts', () => {
        const store = useProgressStore.getState()

        store.recordQuizResult('T1A', false, 60)
        store.recordQuizResult('T1A', true, 90)

        const result = useProgressStore.getState().getSectionQuizResult('T1A')
        expect(result?.passed).toBe(true)
        expect(result?.score).toBe(90)
        expect(result?.attempts).toBe(2)
      })
    })
  })

  describe('Persistence', () => {
    it('should persist state to localStorage', () => {
      const store = useProgressStore.getState()

      store.incrementAnswered(true)
      store.toggleFlagQuestion('T1A01')
      store.markSectionComplete('T1', 'T1A')

      // Check that data was persisted
      const persistedData = localStorage.getItem('hamforge-progress')
      expect(persistedData).not.toBeNull()

      const parsed = JSON.parse(persistedData!)
      expect(parsed.state.totalQuestionsAnswered).toBe(1)
      expect(parsed.state.flaggedQuestions).toContain('T1A01')
      expect(parsed.state.completedModules['T1']).toContain('T1A')
    })

    it('should rehydrate state from localStorage', async () => {
      // Set up persisted state directly in localStorage
      const persistedState = {
        state: {
          currentStreak: 5,
          longestStreak: 10,
          lastStudyDate: '2024-06-15',
          totalQuestionsAnswered: 100,
          totalCorrect: 85,
          completedModules: { T1: ['T1A', 'T1B'] },
          flaggedQuestions: ['T1A01', 'T2A05'],
          sectionQuizResults: {
            T1A: { passed: true, score: 90, attempts: 2 },
          },
        },
        version: 0,
      }

      localStorage.setItem('hamforge-progress', JSON.stringify(persistedState))

      // Rehydrate the store by calling persist rehydrate
      await useProgressStore.persist.rehydrate()

      const state = useProgressStore.getState()
      expect(state.currentStreak).toBe(5)
      expect(state.longestStreak).toBe(10)
      expect(state.lastStudyDate).toBe('2024-06-15')
      expect(state.totalQuestionsAnswered).toBe(100)
      expect(state.totalCorrect).toBe(85)
      expect(state.completedModules['T1']).toEqual(['T1A', 'T1B'])
      expect(state.flaggedQuestions).toEqual(['T1A01', 'T2A05'])
      expect(state.sectionQuizResults['T1A'].score).toBe(90)
    })

    it('should use correct localStorage key', () => {
      const store = useProgressStore.getState()

      store.incrementAnswered(true)

      // Verify the key used
      expect(localStorage.getItem('hamforge-progress')).not.toBeNull()
      expect(localStorage.getItem('some-other-key')).toBeNull()
    })

    it('should persist quiz results correctly', () => {
      const store = useProgressStore.getState()

      store.recordQuizResult('T1A', true, 92)
      store.recordQuizResult('T2B', false, 65)

      const persistedData = localStorage.getItem('hamforge-progress')
      const parsed = JSON.parse(persistedData!)

      expect(parsed.state.sectionQuizResults['T1A']).toEqual({
        passed: true,
        score: 92,
        attempts: 1,
      })
      expect(parsed.state.sectionQuizResults['T2B']).toEqual({
        passed: false,
        score: 65,
        attempts: 1,
      })
    })
  })

  describe('resetProgress()', () => {
    it('should reset all state to initial values', () => {
      const store = useProgressStore.getState()

      // Set up various state
      store.recordStudyDay()
      store.incrementAnswered(true)
      store.incrementAnswered(false)
      store.toggleFlagQuestion('T1A01')
      store.markSectionComplete('T1', 'T1A')
      store.recordQuizResult('T1A', true, 90)

      // Reset
      store.resetProgress()

      const resetState = useProgressStore.getState()
      expect(resetState.currentStreak).toBe(0)
      expect(resetState.longestStreak).toBe(0)
      expect(resetState.lastStudyDate).toBeNull()
      expect(resetState.totalQuestionsAnswered).toBe(0)
      expect(resetState.totalCorrect).toBe(0)
      expect(resetState.completedModules).toEqual({})
      expect(resetState.flaggedQuestions).toEqual([])
      expect(resetState.sectionQuizResults).toEqual({})
    })
  })

  describe('Integration scenarios', () => {
    it('should handle a typical study session workflow', () => {
      const store = useProgressStore.getState()

      // User starts studying
      store.recordStudyDay()
      expect(useProgressStore.getState().currentStreak).toBe(1)

      // User answers some questions
      store.incrementAnswered(true)
      store.incrementAnswered(true)
      store.incrementAnswered(false)
      store.incrementAnswered(true)

      expect(useProgressStore.getState().totalQuestionsAnswered).toBe(4)
      expect(useProgressStore.getState().totalCorrect).toBe(3)

      // User flags a difficult question
      store.toggleFlagQuestion('T1A05')
      expect(useProgressStore.getState().isFlagged('T1A05')).toBe(true)

      // User completes a section
      store.markSectionComplete('T1', 'T1A')
      expect(useProgressStore.getState().isSectionComplete('T1', 'T1A')).toBe(true)

      // User takes a quiz
      store.recordQuizResult('T1A', true, 80)
      const quizResult = useProgressStore.getState().getSectionQuizResult('T1A')
      expect(quizResult?.passed).toBe(true)
    })

    it('should maintain data integrity across multiple operations', () => {
      const store = useProgressStore.getState()

      // Perform various operations
      store.recordStudyDay()
      store.toggleFlagQuestion('Q1')
      store.toggleFlagQuestion('Q2')
      store.markSectionComplete('M1', 'S1')
      store.recordQuizResult('S1', true, 95)

      // Verify everything is in place
      let state = useProgressStore.getState()
      expect(state.currentStreak).toBe(1)
      expect(state.flaggedQuestions).toHaveLength(2)
      expect(state.isSectionComplete('M1', 'S1')).toBe(true)
      expect(state.getSectionQuizResult('S1')?.score).toBe(95)

      // Remove one flag
      store.toggleFlagQuestion('Q1')

      // Verify only the flag was affected
      state = useProgressStore.getState()
      expect(state.currentStreak).toBe(1)
      expect(state.flaggedQuestions).toHaveLength(1)
      expect(state.isSectionComplete('M1', 'S1')).toBe(true)
      expect(state.getSectionQuizResult('S1')?.score).toBe(95)
    })
  })
})

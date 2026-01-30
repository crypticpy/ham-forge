/**
 * Integration Tests for usePracticeSession Hook
 *
 * Tests session initialization, question filtering, answer submission,
 * session completion, and navigation functionality.
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act, waitFor } from '@testing-library/react'
import { usePracticeSession, type SessionConfig } from '@/hooks/use-practice-session'
import { useProgressStore } from '@/stores/progress-store'
import { createMockQuestion, createMockQuestions } from '../utils'
import type { Question } from '@/types'

// Mock the question-scheduler module
vi.mock('@/lib/question-scheduler', () => ({
  getPracticeQuestions: vi.fn(),
  getQuestionsBySubelement: vi.fn(),
  getQuestionsByStatus: vi.fn(),
  saveQuestionProgress: vi.fn(),
}))

// Import mocked functions for manipulation
import {
  getPracticeQuestions,
  getQuestionsBySubelement,
  getQuestionsByStatus,
  saveQuestionProgress,
} from '@/lib/question-scheduler'

const mockGetPracticeQuestions = vi.mocked(getPracticeQuestions)
const mockGetQuestionsBySubelement = vi.mocked(getQuestionsBySubelement)
const mockGetQuestionsByStatus = vi.mocked(getQuestionsByStatus)
const mockSaveQuestionProgress = vi.mocked(saveQuestionProgress)

describe('usePracticeSession', () => {
  // Default session configuration for tests
  const defaultConfig: SessionConfig = {
    examLevel: 'technician',
    questionCount: 10,
    subelements: [],
    status: [],
    shuffleAnswers: false,
    showExplanations: true,
  }

  // Sample mock questions
  let mockQuestions: Question[]

  beforeEach(() => {
    // Reset all mocks
    vi.clearAllMocks()

    // Reset progress store state
    useProgressStore.getState().resetProgress()

    // Create fresh mock questions
    mockQuestions = createMockQuestions(20)

    // Default mock implementations
    mockGetPracticeQuestions.mockResolvedValue(mockQuestions.slice(0, 10))
    mockGetQuestionsBySubelement.mockResolvedValue([])
    mockGetQuestionsByStatus.mockResolvedValue([])
    mockSaveQuestionProgress.mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Session Initialization', () => {
    it('should initialize with provided SessionConfig', async () => {
      const config: SessionConfig = {
        ...defaultConfig,
        examLevel: 'general',
        questionCount: 5,
      }

      const { result } = renderHook(() => usePracticeSession(config))

      // Initially loading
      expect(result.current.isLoading).toBe(true)

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toBeNull()
      expect(result.current.currentIndex).toBe(0)
      expect(result.current.answers).toEqual([])
      expect(result.current.isComplete).toBe(false)
    })

    it('should load correct questions based on exam level', async () => {
      const config: SessionConfig = {
        ...defaultConfig,
        examLevel: 'technician',
        questionCount: 10,
      }

      renderHook(() => usePracticeSession(config))

      await waitFor(() => {
        expect(mockGetPracticeQuestions).toHaveBeenCalledWith('technician', 10)
      })
    })

    it('should respect questionCount limit', async () => {
      const questionsForLimit = createMockQuestions(5)
      mockGetPracticeQuestions.mockResolvedValue(questionsForLimit)

      const config: SessionConfig = {
        ...defaultConfig,
        questionCount: 5,
      }

      const { result } = renderHook(() => usePracticeSession(config))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.questions.length).toBeLessThanOrEqual(5)
      expect(result.current.stats.totalQuestions).toBeLessThanOrEqual(5)
    })

    it('should call recordStudyDay on successful load', async () => {
      const recordStudyDaySpy = vi.spyOn(useProgressStore.getState(), 'recordStudyDay')

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(recordStudyDaySpy).toHaveBeenCalled()
    })

    it('should handle errors during question loading', async () => {
      mockGetPracticeQuestions.mockRejectedValue(new Error('Failed to load'))

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toBe('Failed to load')
      expect(result.current.questions).toEqual([])
    })
  })

  describe('Question Filtering', () => {
    it('should filter by subelements when specified', async () => {
      const t1Questions = [
        createMockQuestion({ id: 'T1A01', subelement: 'T1', group: 'A' }),
        createMockQuestion({ id: 'T1A02', subelement: 'T1', group: 'A' }),
      ]
      const t2Questions = [
        createMockQuestion({ id: 'T2A01', subelement: 'T2', group: 'A' }),
        createMockQuestion({ id: 'T2B01', subelement: 'T2', group: 'B' }),
      ]

      mockGetQuestionsBySubelement
        .mockResolvedValueOnce(t1Questions)
        .mockResolvedValueOnce(t2Questions)

      const config: SessionConfig = {
        ...defaultConfig,
        subelements: ['T1', 'T2'],
      }

      const { result } = renderHook(() => usePracticeSession(config))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(mockGetQuestionsBySubelement).toHaveBeenCalledWith('technician', 'T1')
      expect(mockGetQuestionsBySubelement).toHaveBeenCalledWith('technician', 'T2')
    })

    it('should filter by groups when specified alongside subelements', async () => {
      const t1Questions = [
        createMockQuestion({ id: 'T1A01', subelement: 'T1', group: 'A' }),
        createMockQuestion({ id: 'T1B01', subelement: 'T1', group: 'B' }),
        createMockQuestion({ id: 'T1C01', subelement: 'T1', group: 'C' }),
      ]

      mockGetQuestionsBySubelement.mockResolvedValue(t1Questions)

      const config: SessionConfig = {
        ...defaultConfig,
        subelements: ['T1'],
        groups: ['T1A', 'T1B'], // Only include groups A and B
      }

      const { result } = renderHook(() => usePracticeSession(config))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Should only have questions from T1A and T1B, not T1C
      const questionGroups = result.current.questions.map((q) => `${q.subelement}${q.group}`)
      expect(questionGroups.every((g) => ['T1A', 'T1B'].includes(g))).toBe(true)
      expect(questionGroups).not.toContain('T1C')
    })

    it('should filter by status when specified without subelements', async () => {
      const learningQuestions = [
        createMockQuestion({ id: 'T1A01' }),
        createMockQuestion({ id: 'T1A02' }),
      ]
      const reviewQuestions = [createMockQuestion({ id: 'T2A01' })]

      mockGetQuestionsByStatus
        .mockResolvedValueOnce(learningQuestions)
        .mockResolvedValueOnce(reviewQuestions)

      const config: SessionConfig = {
        ...defaultConfig,
        subelements: [],
        status: ['learning', 'review'],
      }

      const { result } = renderHook(() => usePracticeSession(config))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(mockGetQuestionsByStatus).toHaveBeenCalledWith('technician', 'learning')
      expect(mockGetQuestionsByStatus).toHaveBeenCalledWith('technician', 'review')
    })

    it('should combine subelement and status filters when both specified', async () => {
      const subelementQuestions = [
        createMockQuestion({ id: 'T1A01', subelement: 'T1' }),
        createMockQuestion({ id: 'T1A02', subelement: 'T1' }),
        createMockQuestion({ id: 'T1A03', subelement: 'T1' }),
      ]
      const statusQuestions = [
        createMockQuestion({ id: 'T1A01', subelement: 'T1' }), // Overlap
        createMockQuestion({ id: 'T2A01', subelement: 'T2' }), // No overlap
      ]

      mockGetQuestionsBySubelement.mockResolvedValue(subelementQuestions)
      mockGetQuestionsByStatus.mockResolvedValue(statusQuestions)

      const config: SessionConfig = {
        ...defaultConfig,
        subelements: ['T1'],
        status: ['learning'],
      }

      const { result } = renderHook(() => usePracticeSession(config))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Only question T1A01 should be included (intersection of both filters)
      expect(result.current.questions.length).toBe(1)
      expect(result.current.questions[0].id).toBe('T1A01')
    })

    it('should handle empty filter results gracefully', async () => {
      mockGetQuestionsBySubelement.mockResolvedValue([])

      const config: SessionConfig = {
        ...defaultConfig,
        subelements: ['T9'], // Non-existent subelement
      }

      const { result } = renderHook(() => usePracticeSession(config))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.questions).toEqual([])
      expect(result.current.stats.totalQuestions).toBe(0)
      expect(result.current.error).toBeNull()
    })

    it('should remove duplicate questions from multiple status filters', async () => {
      const sharedQuestion = createMockQuestion({ id: 'T1A01' })

      mockGetQuestionsByStatus
        .mockResolvedValueOnce([sharedQuestion])
        .mockResolvedValueOnce([sharedQuestion]) // Same question in both statuses

      const config: SessionConfig = {
        ...defaultConfig,
        subelements: [],
        status: ['learning', 'review'],
      }

      const { result } = renderHook(() => usePracticeSession(config))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Should only have one instance of the shared question
      const ids = result.current.questions.map((q) => q.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })

    it('should filter to flagged questions only when flaggedOnly is true', async () => {
      const allQuestions = createMockQuestions(5)
      mockGetPracticeQuestions.mockResolvedValue(allQuestions)

      // Flag specific questions
      useProgressStore.getState().toggleFlagQuestion('T1A01')
      useProgressStore.getState().toggleFlagQuestion('T1A03')

      const config: SessionConfig = {
        ...defaultConfig,
        flaggedOnly: true,
      }

      const { result } = renderHook(() => usePracticeSession(config))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Should only include flagged questions
      const questionIds = result.current.questions.map((q) => q.id)
      expect(questionIds.every((id) => ['T1A01', 'T1A03'].includes(id))).toBe(true)
    })
  })

  describe('Answer Submission', () => {
    it('should update stats correctly with submitAnswer', async () => {
      const questions = createMockQuestions(5)
      mockGetPracticeQuestions.mockResolvedValue(questions)

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Submit a correct answer
      await act(async () => {
        await result.current.submitAnswer(0, true)
      })

      expect(result.current.stats.answered).toBe(1)
      expect(result.current.stats.correct).toBe(1)
      expect(result.current.stats.incorrect).toBe(0)
      expect(result.current.answers.length).toBe(1)
    })

    it('should increment correct count for correct answer', async () => {
      const questions = createMockQuestions(5)
      mockGetPracticeQuestions.mockResolvedValue(questions)

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Submit multiple correct answers
      await act(async () => {
        await result.current.submitAnswer(0, true)
      })
      await act(async () => {
        result.current.nextQuestion()
      })
      await act(async () => {
        await result.current.submitAnswer(1, true)
      })

      expect(result.current.stats.correct).toBe(2)
      expect(result.current.stats.incorrect).toBe(0)
    })

    it('should increment incorrect count for incorrect answer', async () => {
      const questions = createMockQuestions(5)
      mockGetPracticeQuestions.mockResolvedValue(questions)

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Submit an incorrect answer
      await act(async () => {
        await result.current.submitAnswer(1, false)
      })

      expect(result.current.stats.correct).toBe(0)
      expect(result.current.stats.incorrect).toBe(1)
    })

    it('should call saveQuestionProgress with correct parameters', async () => {
      const questions = createMockQuestions(3)
      mockGetPracticeQuestions.mockResolvedValue(questions)

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Get the current question ID (questions are shuffled)
      const currentQuestionId = result.current.currentQuestion?.id

      await act(async () => {
        await result.current.submitAnswer(2, true, 4) // With confidence
      })

      expect(mockSaveQuestionProgress).toHaveBeenCalledWith(currentQuestionId, true, 4)
    })

    it('should call incrementAnswered on progress store', async () => {
      const questions = createMockQuestions(3)
      mockGetPracticeQuestions.mockResolvedValue(questions)
      const incrementSpy = vi.spyOn(useProgressStore.getState(), 'incrementAnswered')

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      await act(async () => {
        await result.current.submitAnswer(0, true)
      })

      expect(incrementSpy).toHaveBeenCalledWith(true)
    })

    it('should still update local state when saveQuestionProgress fails', async () => {
      const questions = createMockQuestions(3)
      mockGetPracticeQuestions.mockResolvedValue(questions)
      mockSaveQuestionProgress.mockRejectedValue(new Error('DB error'))

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      await act(async () => {
        await result.current.submitAnswer(0, true)
      })

      // Local state should still be updated
      expect(result.current.answers.length).toBe(1)
      expect(consoleSpy).toHaveBeenCalled()

      consoleSpy.mockRestore()
    })

    it('should record answer with selected index and correctness', async () => {
      const questions = createMockQuestions(3)
      mockGetPracticeQuestions.mockResolvedValue(questions)

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Get the current question ID (questions are shuffled)
      const currentQuestionId = result.current.currentQuestion?.id

      await act(async () => {
        await result.current.submitAnswer(2, false)
      })

      expect(result.current.answers[0]).toEqual({
        questionId: currentQuestionId,
        selectedAnswer: 2,
        correct: false,
      })
    })

    it('should calculate accuracy correctly', async () => {
      const questions = createMockQuestions(5)
      mockGetPracticeQuestions.mockResolvedValue(questions)

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Answer 3 correct, 1 incorrect = 75% accuracy
      await act(async () => {
        await result.current.submitAnswer(0, true)
      })
      await act(async () => {
        result.current.nextQuestion()
      })
      await act(async () => {
        await result.current.submitAnswer(0, true)
      })
      await act(async () => {
        result.current.nextQuestion()
      })
      await act(async () => {
        await result.current.submitAnswer(0, true)
      })
      await act(async () => {
        result.current.nextQuestion()
      })
      await act(async () => {
        await result.current.submitAnswer(0, false)
      })

      expect(result.current.stats.accuracy).toBe(75)
    })
  })

  describe('Session Completion', () => {
    it('should set isComplete to true when all questions answered', async () => {
      const questions = createMockQuestions(3)
      mockGetPracticeQuestions.mockResolvedValue(questions)

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Answer all questions
      for (let i = 0; i < 3; i++) {
        await act(async () => {
          await result.current.submitAnswer(0, true)
        })
        if (i < 2) {
          await act(async () => {
            result.current.nextQuestion()
          })
        }
      }

      // Navigate past the last question to trigger completion
      await act(async () => {
        result.current.nextQuestion()
      })

      expect(result.current.isComplete).toBe(true)
    })

    it('should show correct totals at end of session', async () => {
      const questions = createMockQuestions(4)
      mockGetPracticeQuestions.mockResolvedValue(questions)

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Answer 2 correct, 2 incorrect
      const answers = [true, false, true, false]
      for (let i = 0; i < 4; i++) {
        await act(async () => {
          await result.current.submitAnswer(0, answers[i])
        })
        await act(async () => {
          result.current.nextQuestion()
        })
      }

      expect(result.current.isComplete).toBe(true)
      expect(result.current.stats.totalQuestions).toBe(4)
      expect(result.current.stats.answered).toBe(4)
      expect(result.current.stats.correct).toBe(2)
      expect(result.current.stats.incorrect).toBe(2)
      expect(result.current.stats.accuracy).toBe(50)
    })

    it('should handle session with zero questions', async () => {
      mockGetPracticeQuestions.mockResolvedValue([])

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.questions).toEqual([])
      expect(result.current.stats.totalQuestions).toBe(0)
      expect(result.current.stats.accuracy).toBe(0)
    })
  })

  describe('Navigation', () => {
    it('should advance currentIndex with nextQuestion', async () => {
      const questions = createMockQuestions(5)
      mockGetPracticeQuestions.mockResolvedValue(questions)

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.currentIndex).toBe(0)

      await act(async () => {
        result.current.nextQuestion()
      })

      expect(result.current.currentIndex).toBe(1)

      await act(async () => {
        result.current.nextQuestion()
      })

      expect(result.current.currentIndex).toBe(2)
    })

    it('should update currentQuestion correctly when navigating', async () => {
      const questions = createMockQuestions(3)
      mockGetPracticeQuestions.mockResolvedValue(questions)

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Questions are shuffled, so just verify it's from the list
      const firstQuestion = result.current.currentQuestion
      expect(questions.map((q) => q.id)).toContain(firstQuestion?.id)

      await act(async () => {
        result.current.nextQuestion()
      })

      const secondQuestion = result.current.currentQuestion
      expect(secondQuestion).not.toEqual(firstQuestion)
      expect(questions.map((q) => q.id)).toContain(secondQuestion?.id)
    })

    it('should mark session complete when navigating past last question', async () => {
      const questions = createMockQuestions(2)
      mockGetPracticeQuestions.mockResolvedValue(questions)

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.isComplete).toBe(false)

      await act(async () => {
        result.current.nextQuestion() // Move to question 2
      })

      expect(result.current.isComplete).toBe(false)

      await act(async () => {
        result.current.nextQuestion() // Move past last question
      })

      expect(result.current.isComplete).toBe(true)
    })

    it('should not advance index when already at the end', async () => {
      const questions = createMockQuestions(2)
      mockGetPracticeQuestions.mockResolvedValue(questions)

      const { result } = renderHook(() => usePracticeSession(defaultConfig))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Navigate to end
      await act(async () => {
        result.current.nextQuestion()
      })
      await act(async () => {
        result.current.nextQuestion()
      })

      expect(result.current.isComplete).toBe(true)
      const indexAtEnd = result.current.currentIndex

      // Try to navigate further
      await act(async () => {
        result.current.nextQuestion()
      })

      // Index should not change when complete
      expect(result.current.currentIndex).toBe(indexAtEnd)
    })
  })

  describe('Integration Scenarios', () => {
    it('should handle complete practice session flow', async () => {
      const questions = createMockQuestions(3)
      mockGetPracticeQuestions.mockResolvedValue(questions)

      const { result } = renderHook(() =>
        usePracticeSession({
          ...defaultConfig,
          questionCount: 3,
        })
      )

      // Wait for loading
      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Verify initial state
      expect(result.current.currentIndex).toBe(0)
      expect(result.current.currentQuestion).toBeDefined()
      expect(result.current.stats.totalQuestions).toBe(3)

      // Answer question 1 (correct)
      await act(async () => {
        await result.current.submitAnswer(0, true)
      })
      expect(result.current.stats.correct).toBe(1)

      await act(async () => {
        result.current.nextQuestion()
      })

      // Answer question 2 (incorrect)
      await act(async () => {
        await result.current.submitAnswer(1, false)
      })
      expect(result.current.stats.incorrect).toBe(1)

      await act(async () => {
        result.current.nextQuestion()
      })

      // Answer question 3 (correct)
      await act(async () => {
        await result.current.submitAnswer(0, true)
      })
      expect(result.current.stats.correct).toBe(2)

      await act(async () => {
        result.current.nextQuestion()
      })

      // Verify completion
      expect(result.current.isComplete).toBe(true)
      expect(result.current.stats.answered).toBe(3)
      expect(result.current.stats.accuracy).toBe(67) // 2/3 = 66.67%, rounds to 67
    })

    it('should reinitialize when config changes', async () => {
      const techQuestions = createMockQuestions(5, 'technician')
      const generalQuestions = createMockQuestions(5, 'general')

      mockGetPracticeQuestions
        .mockResolvedValueOnce(techQuestions)
        .mockResolvedValueOnce(generalQuestions)

      const initialConfig: SessionConfig = {
        ...defaultConfig,
        examLevel: 'technician',
      }

      const { result, rerender } = renderHook(({ config }) => usePracticeSession(config), {
        initialProps: { config: initialConfig },
      })

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(mockGetPracticeQuestions).toHaveBeenCalledWith('technician', 10)

      // Change exam level
      const newConfig: SessionConfig = {
        ...defaultConfig,
        examLevel: 'general',
      }

      rerender({ config: newConfig })

      await waitFor(() => {
        expect(mockGetPracticeQuestions).toHaveBeenCalledWith('general', 10)
      })
    })
  })
})

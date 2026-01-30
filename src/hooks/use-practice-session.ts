'use client'

import { useState, useCallback, useEffect } from 'react'
import type { Question } from '@/types'
import {
  getPracticeQuestions,
  getQuestionsBySubelement,
  getQuestionsByStatus,
  saveQuestionProgress,
} from '@/lib/question-scheduler'
import { useProgressStore } from '@/stores/progress-store'
import type { ExamLevel } from '@/types'

export interface SessionConfig {
  examLevel: ExamLevel
  questionCount: number
  subelements: string[]
  status: ('new' | 'learning' | 'review' | 'mastered')[]
  shuffleAnswers: boolean
  showExplanations: boolean
}

export interface SessionState {
  questions: Question[]
  currentIndex: number
  answers: { questionId: string; selectedAnswer: number; correct: boolean }[]
  isComplete: boolean
  isLoading: boolean
  error: string | null
}

export interface SessionStats {
  totalQuestions: number
  answered: number
  correct: number
  incorrect: number
  accuracy: number
}

/**
 * Fisher-Yates shuffle algorithm
 * Creates a shuffled copy of the array without mutating the original
 */
function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Hook to manage a practice session
 * Handles loading questions, tracking answers, and calculating stats
 */
export function usePracticeSession(config: SessionConfig) {
  const [state, setState] = useState<SessionState>({
    questions: [],
    currentIndex: 0,
    answers: [],
    isComplete: false,
    isLoading: true,
    error: null,
  })

  const { recordStudyDay, incrementAnswered } = useProgressStore()

  // Extract config values for stable dependency array
  const subelementsKey = config.subelements.join(',')
  const statusKey = config.status.join(',')

  // Load questions based on config
  useEffect(() => {
    let isMounted = true

    async function loadQuestions() {
      try {
        setState((prev) => ({ ...prev, isLoading: true, error: null }))

        let questions: Question[] = []

        // If subelements are specified, filter by them
        if (config.subelements.length > 0) {
          for (const sub of config.subelements) {
            const subQuestions = await getQuestionsBySubelement(config.examLevel, sub)
            questions.push(...subQuestions)
          }
        } else if (config.status.length > 0) {
          // If status filter is specified without subelement filter
          for (const status of config.status) {
            const statusQuestions = await getQuestionsByStatus(config.examLevel, status)
            questions.push(...statusQuestions)
          }
          // Remove duplicates (question could appear in multiple status filters)
          const seen = new Set<string>()
          questions = questions.filter((q) => {
            if (seen.has(q.id)) return false
            seen.add(q.id)
            return true
          })
        } else {
          // Get mixed practice questions
          questions = await getPracticeQuestions(config.examLevel, config.questionCount)
        }

        // If both subelement AND status filters are set, apply status filter to subelement results
        if (config.subelements.length > 0 && config.status.length > 0) {
          const statusQuestions: Question[] = []
          for (const status of config.status) {
            const sq = await getQuestionsByStatus(config.examLevel, status)
            statusQuestions.push(...sq)
          }
          const statusIds = new Set(statusQuestions.map((q) => q.id))
          questions = questions.filter((q) => statusIds.has(q.id))
        }

        // Shuffle the questions for variety
        questions = shuffleArray(questions)

        // Limit to requested count
        if (config.questionCount > 0 && config.questionCount < questions.length) {
          questions = questions.slice(0, config.questionCount)
        }

        if (!isMounted) return

        // Record that user studied today
        recordStudyDay()

        setState((prev) => ({
          ...prev,
          questions,
          isLoading: false,
        }))
      } catch (error) {
        if (!isMounted) return
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to load questions',
        }))
      }
    }

    loadQuestions()

    return () => {
      isMounted = false
    }
    // Note: recordStudyDay is stable (from zustand), so we don't include it in deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.examLevel, config.questionCount, subelementsKey, statusKey])

  // Handle answer submission
  const submitAnswer = useCallback(
    async (selectedIndex: number, isCorrect: boolean) => {
      const currentQuestion = state.questions[state.currentIndex]
      if (!currentQuestion) return

      try {
        // Save to IndexedDB first
        await saveQuestionProgress(currentQuestion.id, isCorrect)

        // Only update stores if save succeeded
        incrementAnswered(isCorrect)

        // Update local state
        setState((prev) => ({
          ...prev,
          answers: [
            ...prev.answers,
            {
              questionId: currentQuestion.id,
              selectedAnswer: selectedIndex,
              correct: isCorrect,
            },
          ],
        }))
      } catch (error) {
        // Log error but don't block the UI - still record the answer locally
        console.error('Failed to save progress to database:', error)

        // Update local state anyway so user can continue
        setState((prev) => ({
          ...prev,
          answers: [
            ...prev.answers,
            {
              questionId: currentQuestion.id,
              selectedAnswer: selectedIndex,
              correct: isCorrect,
            },
          ],
        }))
      }
    },
    [state.questions, state.currentIndex, incrementAnswered]
  )

  // Move to next question
  const nextQuestion = useCallback(() => {
    setState((prev) => {
      const nextIndex = prev.currentIndex + 1
      if (nextIndex >= prev.questions.length) {
        return { ...prev, isComplete: true }
      }
      return { ...prev, currentIndex: nextIndex }
    })
  }, [])

  // Get current question
  const currentQuestion = state.questions[state.currentIndex]

  // Calculate stats
  const stats: SessionStats = {
    totalQuestions: state.questions.length,
    answered: state.answers.length,
    correct: state.answers.filter((a) => a.correct).length,
    incorrect: state.answers.filter((a) => !a.correct).length,
    accuracy:
      state.answers.length > 0
        ? Math.round((state.answers.filter((a) => a.correct).length / state.answers.length) * 100)
        : 0,
  }

  return {
    ...state,
    currentQuestion,
    stats,
    submitAnswer,
    nextQuestion,
  }
}

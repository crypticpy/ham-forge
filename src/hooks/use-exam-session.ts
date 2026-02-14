'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import type { GeneratedExam, ExamResult } from '@/lib/exam-generator'
import { generateExam, calculateExamResult } from '@/lib/exam-generator'
import { saveExamAttempt } from '@/lib/exam-storage'
import { saveQuestionProgress } from '@/lib/question-scheduler'
import type { ExamLevel, ExamAnswer } from '@/types'

const SESSION_STORAGE_KEY = 'hamforge-exam-session'

export interface ExamSessionState {
  exam: GeneratedExam | null
  currentIndex: number
  answers: Map<string, number> // questionId -> selectedAnswer (index)
  flaggedQuestions: Set<number> // question indices
  isComplete: boolean
  isLoading: boolean
  error: string | null
  result: ExamResult | null
  savedExamId: string | null
  timeRemaining: number // seconds
  startTime: Date | null
}

interface SerializedExamState {
  exam: GeneratedExam | null
  currentIndex: number
  answers: [string, number][] // serialized Map
  flaggedQuestions: number[] // serialized Set
  isComplete: boolean
  result: ExamResult | null
  savedExamId: string | null
  timeRemaining: number
  startTime: string | null
}

function serializeState(state: ExamSessionState): SerializedExamState {
  return {
    exam: state.exam,
    currentIndex: state.currentIndex,
    answers: Array.from(state.answers.entries()),
    flaggedQuestions: Array.from(state.flaggedQuestions),
    isComplete: state.isComplete,
    result: state.result,
    savedExamId: state.savedExamId,
    timeRemaining: state.timeRemaining,
    startTime: state.startTime?.toISOString() ?? null,
  }
}

function deserializeState(serialized: SerializedExamState): Partial<ExamSessionState> {
  // Reconstruct dates in exam object
  let exam = serialized.exam
  if (exam) {
    exam = {
      ...exam,
      createdAt: new Date(exam.createdAt),
    }
  }

  return {
    exam,
    currentIndex: serialized.currentIndex,
    answers: new Map(serialized.answers),
    flaggedQuestions: new Set(serialized.flaggedQuestions),
    isComplete: serialized.isComplete,
    result: serialized.result,
    savedExamId: serialized.savedExamId,
    timeRemaining: serialized.timeRemaining,
    startTime: serialized.startTime ? new Date(serialized.startTime) : null,
  }
}

export function useExamSession(examLevel: ExamLevel) {
  const [state, setState] = useState<ExamSessionState>({
    exam: null,
    currentIndex: 0,
    answers: new Map(),
    flaggedQuestions: new Set(),
    isComplete: false,
    isLoading: true,
    error: null,
    result: null,
    savedExamId: null,
    timeRemaining: 60 * 60, // default 60 minutes
    startTime: null,
  })

  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const isSubmittingRef = useRef(false)

  // Save state to sessionStorage whenever it changes
  useEffect(() => {
    if (state.exam && !state.isLoading) {
      const serialized = serializeState(state)
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(serialized))
    }
  }, [state])

  // Load exam on mount - check sessionStorage first
  useEffect(() => {
    const savedState = sessionStorage.getItem(SESSION_STORAGE_KEY)

    if (savedState) {
      try {
        const parsed: SerializedExamState = JSON.parse(savedState)
        // Only restore if same exam level and not complete
        if (parsed.exam?.examLevel === examLevel && !parsed.isComplete) {
          const restored = deserializeState(parsed)
          setState((prev) => ({
            ...prev,
            ...restored,
            isLoading: false,
          }))
          return
        }
      } catch (e) {
        console.error('Failed to restore exam session:', e)
      }
    }

    // Generate new exam
    async function loadExam() {
      try {
        const exam = await generateExam(examLevel)
        const timeLimitSeconds = Math.max(1, exam.timeLimit) * 60
        setState((prev) => ({
          ...prev,
          exam,
          isLoading: false,
          startTime: new Date(),
          timeRemaining: timeLimitSeconds,
        }))
      } catch (error) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: error instanceof Error ? error.message : 'Failed to generate exam',
        }))
      }
    }

    loadExam()
  }, [examLevel])

  // Timer effect
  useEffect(() => {
    if (state.isComplete || state.isLoading || !state.exam) {
      return
    }

    timerRef.current = setInterval(() => {
      setState((prev) => {
        if (prev.timeRemaining <= 1) {
          // Time's up - will trigger auto-submit
          return { ...prev, timeRemaining: 0 }
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 }
      })
    }, 1000)

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [state.isComplete, state.isLoading, state.exam])

  // Submit exam - defined before auto-submit effect so it can be used as dependency
  const submitExam = useCallback(async () => {
    if (isSubmittingRef.current) return
    isSubmittingRef.current = true

    setState((prev) => {
      if (!prev.exam || prev.isComplete) return prev

      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }

      // Calculate results
      const answerResults: { questionId: string; correct: boolean }[] = []
      const examAnswers: ExamAnswer[] = []

      for (const question of prev.exam.questions) {
        const selectedAnswer = prev.answers.get(question.id)
        const isCorrect = selectedAnswer !== undefined && selectedAnswer === question.correctAnswer

        answerResults.push({
          questionId: question.id,
          correct: isCorrect,
        })

        examAnswers.push({
          questionId: question.id,
          selectedAnswer: selectedAnswer ?? -1, // -1 if unanswered
          correct: isCorrect,
        })
      }

      const result = calculateExamResult(prev.exam.questions, answerResults)
      const timeLimitSeconds = Math.max(1, prev.exam.timeLimit) * 60
      const timeSpent = timeLimitSeconds - prev.timeRemaining

      // Save exam attempt and question progress asynchronously
      ;(async () => {
        try {
          const examId = await saveExamAttempt(
            examLevel,
            result.score,
            result.passed,
            timeSpent,
            examAnswers
          )

          // Save individual question progress for spaced repetition
          for (const answer of answerResults) {
            try {
              await saveQuestionProgress(answer.questionId, answer.correct)
            } catch (e) {
              console.error(`Failed to save progress for question ${answer.questionId}:`, e)
            }
          }

          setState((current) => ({
            ...current,
            savedExamId: examId,
          }))

          // Clear session storage after successful save
          sessionStorage.removeItem(SESSION_STORAGE_KEY)
        } catch (e) {
          console.error('Failed to save exam attempt:', e)
        } finally {
          isSubmittingRef.current = false
        }
      })()

      return {
        ...prev,
        isComplete: true,
        result,
      }
    })
  }, [examLevel])

  // Auto-submit when time runs out
  useEffect(() => {
    if (state.timeRemaining === 0 && !state.isComplete && !isSubmittingRef.current) {
      submitExam()
    }
  }, [state.timeRemaining, state.isComplete, submitExam])

  // Select an answer for current question
  const selectAnswer = useCallback((answerIndex: number) => {
    setState((prev) => {
      if (!prev.exam || prev.isComplete) return prev

      const currentQuestion = prev.exam.questions[prev.currentIndex]
      if (!currentQuestion) return prev

      const newAnswers = new Map(prev.answers)
      newAnswers.set(currentQuestion.id, answerIndex)

      return { ...prev, answers: newAnswers }
    })
  }, [])

  // Toggle flag for current question
  const toggleFlag = useCallback(() => {
    setState((prev) => {
      const newFlagged = new Set(prev.flaggedQuestions)
      if (newFlagged.has(prev.currentIndex)) {
        newFlagged.delete(prev.currentIndex)
      } else {
        newFlagged.add(prev.currentIndex)
      }
      return { ...prev, flaggedQuestions: newFlagged }
    })
  }, [])

  // Navigation
  const goToQuestion = useCallback((index: number) => {
    setState((prev) => {
      if (!prev.exam) return prev
      const maxIndex = prev.exam.questions.length - 1
      const newIndex = Math.max(0, Math.min(index, maxIndex))
      return { ...prev, currentIndex: newIndex }
    })
  }, [])

  const nextQuestion = useCallback(() => {
    setState((prev) => {
      if (!prev.exam) return prev
      const maxIndex = prev.exam.questions.length - 1
      if (prev.currentIndex >= maxIndex) return prev
      return { ...prev, currentIndex: prev.currentIndex + 1 }
    })
  }, [])

  const prevQuestion = useCallback(() => {
    setState((prev) => {
      if (prev.currentIndex <= 0) return prev
      return { ...prev, currentIndex: prev.currentIndex - 1 }
    })
  }, [])

  // Get current question
  const currentQuestion = state.exam?.questions[state.currentIndex] ?? null

  // Get set of answered question indices
  const answeredIndices = new Set<number>()
  if (state.exam) {
    state.exam.questions.forEach((q, index) => {
      if (state.answers.has(q.id)) {
        answeredIndices.add(index)
      }
    })
  }

  // Get selected answer for current question
  const selectedAnswer = currentQuestion ? state.answers.get(currentQuestion.id) : undefined

  return {
    // State
    exam: state.exam,
    currentIndex: state.currentIndex,
    currentQuestion,
    answers: state.answers,
    answeredIndices,
    flaggedQuestions: state.flaggedQuestions,
    isComplete: state.isComplete,
    isLoading: state.isLoading,
    error: state.error,
    result: state.result,
    savedExamId: state.savedExamId,
    timeRemaining: state.timeRemaining,
    startTime: state.startTime,
    selectedAnswer,

    // Actions
    selectAnswer,
    toggleFlag,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitExam,
  }
}

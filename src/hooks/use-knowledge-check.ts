'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import { getQuestionPool, getExplanation } from '@/lib/question-scheduler'
import type { Question, ExamLevel } from '@/types'

export interface KnowledgeCheckState {
  questions: Question[] // 3-5 questions from section's relatedQuestionIds
  currentIndex: number
  answers: Map<string, number> // questionId -> selectedIndex
  isComplete: boolean
  score: number // Percentage (0-100)
  passed: boolean // 60% threshold
}

interface UseKnowledgeCheckReturn {
  state: KnowledgeCheckState
  currentQuestion: Question | null
  submitAnswer: (answerIndex: number) => void
  nextQuestion: () => void
  retryQuiz: () => void
  isLoading: boolean
}

const PASS_THRESHOLD = 60 // 60% required to pass
const MAX_QUESTIONS = 5
const MIN_QUESTIONS = 1

/**
 * Fisher-Yates shuffle algorithm
 * Returns a new shuffled array without mutating the original
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

/**
 * Select and prepare questions for the knowledge check (async version)
 */
async function selectQuestionsAsync(
  relatedQuestionIds: string[],
  examLevel: ExamLevel
): Promise<Question[]> {
  const pool = await getQuestionPool(examLevel)
  const poolMap = new Map(pool.map((q) => [q.id, q]))

  // Get questions that exist in the pool
  const availableQuestions = relatedQuestionIds
    .map((id) => poolMap.get(id))
    .filter((q): q is Question => q !== undefined)
    .map((q) => {
      // Merge explanation if available
      const explanation = getExplanation(q.id)
      return explanation ? { ...q, explanation } : q
    })

  // Determine how many questions to use (min of available and MAX_QUESTIONS)
  const questionCount = Math.min(availableQuestions.length, MAX_QUESTIONS)

  // Shuffle and select questions
  const shuffled = shuffleArray(availableQuestions)
  return shuffled.slice(0, questionCount)
}

/**
 * Calculate score as percentage
 */
function calculateScore(answers: Map<string, number>, questions: Question[]): number {
  if (questions.length === 0) return 0

  let correctCount = 0
  for (const question of questions) {
    const selectedAnswer = answers.get(question.id)
    if (selectedAnswer !== undefined && selectedAnswer === question.correctAnswer) {
      correctCount++
    }
  }

  return Math.round((correctCount / questions.length) * 100)
}

/**
 * Hook for managing knowledge check quiz state
 */
export function useKnowledgeCheck(
  sectionId: string,
  relatedQuestionIds: string[],
  examLevel: ExamLevel
): UseKnowledgeCheckReturn {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Map<string, number>>(new Map())
  const [isComplete, setIsComplete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load questions when section changes
  useEffect(() => {
    let cancelled = false

    async function loadQuestions() {
      setIsLoading(true)
      if (relatedQuestionIds.length < MIN_QUESTIONS) {
        if (!cancelled) {
          setQuestions([])
          setIsLoading(false)
        }
        return
      }

      const newQuestions = await selectQuestionsAsync(relatedQuestionIds, examLevel)
      if (!cancelled) {
        setQuestions(newQuestions)
        setCurrentIndex(0)
        setAnswers(new Map())
        setIsComplete(false)
        setIsLoading(false)
      }
    }

    loadQuestions()

    return () => {
      cancelled = true
    }
  }, [sectionId, relatedQuestionIds, examLevel])

  // Calculate score and pass status
  const score = useMemo(() => calculateScore(answers, questions), [answers, questions])
  const passed = score >= PASS_THRESHOLD

  // Current question
  const currentQuestion = questions[currentIndex] ?? null

  // Submit an answer for the current question
  const submitAnswer = useCallback(
    (answerIndex: number) => {
      if (!currentQuestion) return
      setAnswers((prev) => {
        const newAnswers = new Map(prev)
        newAnswers.set(currentQuestion.id, answerIndex)
        return newAnswers
      })
    },
    [currentQuestion]
  )

  // Move to next question or complete the quiz
  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setIsComplete(true)
    }
  }, [currentIndex, questions.length])

  // Retry the quiz with new shuffled questions
  const retryQuiz = useCallback(async () => {
    setIsLoading(true)
    const newQuestions = await selectQuestionsAsync(relatedQuestionIds, examLevel)
    setQuestions(newQuestions)
    setCurrentIndex(0)
    setAnswers(new Map())
    setIsComplete(false)
    setIsLoading(false)
  }, [relatedQuestionIds, examLevel])

  // Build state object
  const state: KnowledgeCheckState = {
    questions,
    currentIndex,
    answers,
    isComplete,
    score,
    passed,
  }

  return {
    state,
    currentQuestion,
    submitAnswer,
    nextQuestion,
    retryQuiz,
    isLoading,
  }
}

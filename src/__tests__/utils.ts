/**
 * Test Utilities
 *
 * Helper functions and mock factories for testing
 */

import type { Question, ExamLevel } from '@/types'
import type { QuestionProgress } from '@/types/progress'

/**
 * Create a mock question for testing
 */
export function createMockQuestion(overrides: Partial<Question> = {}): Question {
  return {
    id: 'T1A01',
    subelement: 'T1',
    group: 'A',
    question: 'What is the purpose of the Amateur Radio Service?',
    answers: [
      'To provide emergency communications',
      'To advance radio art and technology',
      'To encourage international goodwill',
      'All of the above',
    ],
    correctAnswer: 3,
    refs: '97.1',
    ...overrides,
  }
}

/**
 * Create multiple mock questions
 */
export function createMockQuestions(
  count: number,
  examLevel: ExamLevel = 'technician'
): Question[] {
  const prefix = examLevel === 'technician' ? 'T' : 'G'
  return Array.from({ length: count }, (_, i) => {
    const subelementNum = Math.floor(i / 10) + 1
    const subelement = `${prefix}${subelementNum}`
    const group = String.fromCharCode(65 + (i % 10)) // A, B, C, ...
    const questionNum = (i % 10) + 1
    return createMockQuestion({
      id: `${subelement}${group}${String(questionNum).padStart(2, '0')}`,
      subelement,
      group,
    })
  })
}

/**
 * Create a mock question progress record
 */
export function createMockProgress(
  questionId: string,
  overrides: Partial<QuestionProgress> = {}
): QuestionProgress {
  return {
    questionId,
    attempts: 1,
    correctCount: 1,
    lastAttempt: new Date(),
    nextReview: new Date(),
    easeFactor: 2.5,
    interval: 1,
    status: 'learning',
    confidenceHistory: [3],
    ...overrides,
  }
}

/**
 * Create mock progress for mastered question
 */
export function createMasteredProgress(questionId: string): QuestionProgress {
  const now = new Date()
  const nextReview = new Date()
  nextReview.setDate(now.getDate() + 30)

  return createMockProgress(questionId, {
    attempts: 10,
    correctCount: 9,
    interval: 30,
    status: 'mastered',
    nextReview,
    easeFactor: 2.8,
    confidenceHistory: [4, 5, 4, 5, 5],
  })
}

/**
 * Create mock progress for due question
 */
export function createDueProgress(questionId: string): QuestionProgress {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  return createMockProgress(questionId, {
    attempts: 3,
    correctCount: 2,
    interval: 3,
    status: 'review',
    nextReview: yesterday,
    easeFactor: 2.3,
  })
}

/**
 * Wait for next tick (useful for async state updates)
 */
export function nextTick(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0))
}

/**
 * Create a date N days from now
 */
export function daysFromNow(days: number): Date {
  const date = new Date()
  date.setDate(date.getDate() + days)
  date.setHours(0, 0, 0, 0)
  return date
}

/**
 * Create a date N days ago
 */
export function daysAgo(days: number): Date {
  return daysFromNow(-days)
}

/**
 * Mock exam answers for testing result calculation
 */
export function createMockExamAnswers(
  questions: Question[],
  correctCount: number
): { questionId: string; correct: boolean }[] {
  return questions.map((q, i) => ({
    questionId: q.id,
    correct: i < correctCount,
  }))
}

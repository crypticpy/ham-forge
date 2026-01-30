import type { ExamLevel } from './question'

export interface QuestionProgress {
  questionId: string
  attempts: number
  correctCount: number
  lastAttempt: Date
  nextReview: Date
  easeFactor: number // SM-2 algorithm factor (starts at 2.5)
  interval: number // Days until next review
  status: 'new' | 'learning' | 'review' | 'mastered'
  confidenceHistory?: number[] // Track last N confidence ratings (1-5 scale)
}

export interface StudySession {
  id: string
  startTime: Date
  endTime?: Date
  examLevel: ExamLevel
  questionsAnswered: number
  correctAnswers: number
}

export interface ExamAttempt {
  id: string
  examLevel: ExamLevel
  date: Date
  score: number
  passed: boolean
  timeSpent: number // in seconds
  answers: ExamAnswer[]
}

export interface ExamAnswer {
  questionId: string
  selectedAnswer: number
  correct: boolean
}

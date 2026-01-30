// Shared type for exam levels - use this everywhere
export type ExamLevel = 'technician' | 'general' | 'extra'

export interface Question {
  id: string // e.g., 'T1A01'
  subelement: string // e.g., 'T1'
  group: string // e.g., 'A'
  question: string // The question text
  answers: string[] // Array of 4 answer options
  correctAnswer: number // Index 0-3 of correct answer
  figure?: string // Reference to figure if needed (e.g., 'T1')
  explanation?: string // Optional study explanation
  refs?: string // FCC rule reference like '[97.1]'
}

export interface QuestionPool {
  examLevel: ExamLevel
  effectiveFrom: string // e.g., '2022-07-01'
  effectiveTo: string // e.g., '2026-06-30'
  questions: Question[]
}

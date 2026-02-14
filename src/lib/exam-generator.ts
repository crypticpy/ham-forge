/**
 * Exam Generator
 * Implements official VE exam question selection rules
 *
 * Rules:
 * - Exams are built by selecting one random question from each "group"
 *   - Technician/General: 35 groups → 35 questions
 *   - Extra: 50 groups → 50 questions
 * - Groups are organized by subelement (e.g., T1A, T1B, T2A, etc.)
 * - One question is randomly selected from each group
 * - To pass: 74% correct (rounded up)
 */

import type { Question, ExamLevel } from '@/types'
import { getQuestionPool } from './question-scheduler'

export interface ExamQuestion extends Question {
  examIndex: number // 1-35 position in exam
}

export interface GeneratedExam {
  id: string
  examLevel: ExamLevel
  questions: ExamQuestion[]
  createdAt: Date
  timeLimit: number // in minutes (typically 60)
  passingScore: number // 74% rounded up (e.g., 26/35, 37/50)
}

/**
 * Get all unique groups for an exam level
 * Groups are like T1A, T1B, T2A, etc.
 * @returns Promise resolving to array of group identifiers sorted in order
 */
export async function getExamGroups(examLevel: ExamLevel): Promise<string[]> {
  const pool = await getQuestionPool(examLevel)
  const groups = new Set<string>()

  for (const question of pool) {
    // Group is subelement + group letter (e.g., T1 + A = T1A)
    const groupId = question.subelement + question.group
    groups.add(groupId)
  }

  return Array.from(groups).sort()
}

/**
 * Get questions for a specific group
 */
export async function getQuestionsForGroup(
  examLevel: ExamLevel,
  group: string
): Promise<Question[]> {
  const pool = await getQuestionPool(examLevel)
  return pool.filter((q) => q.subelement + q.group === group)
}

/**
 * Generate a practice exam with one question from each group
 * @param examLevel - technician or general
 * @returns Promise resolving to a complete exam with 35 questions
 */
export async function generateExam(examLevel: ExamLevel): Promise<GeneratedExam> {
  const groups = await getExamGroups(examLevel)
  const questions: ExamQuestion[] = []

  // Select one random question from each group
  for (let i = 0; i < groups.length; i++) {
    const group = groups[i]
    const groupQuestions = await getQuestionsForGroup(examLevel, group)

    if (groupQuestions.length > 0) {
      // Random selection
      const randomIndex = Math.floor(Math.random() * groupQuestions.length)
      const selectedQuestion = groupQuestions[randomIndex]

      questions.push({
        ...selectedQuestion,
        examIndex: i + 1,
      })
    }
  }

  // Generate unique exam ID
  const id = `exam-${examLevel}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`

  const totalQuestions = groups.length
  const passingScore = Math.ceil(totalQuestions * 0.74)

  return {
    id,
    examLevel,
    questions,
    createdAt: new Date(),
    timeLimit: 60, // 60 minutes standard
    passingScore,
  }
}

/**
 * Calculate exam results
 */
export interface ExamResult {
  totalQuestions: number
  correctCount: number
  incorrectCount: number
  score: number // percentage
  passed: boolean
  passingScore: number
  bySubelement: Record<string, { correct: number; total: number; percentage: number }>
}

export function calculateExamResult(
  questions: ExamQuestion[],
  answers: { questionId: string; correct: boolean }[]
): ExamResult {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.correct]))

  let correctCount = 0
  const bySubelement: Record<string, { correct: number; total: number; percentage: number }> = {}

  for (const question of questions) {
    const isCorrect = answerMap.get(question.id) === true
    if (isCorrect) correctCount++

    // Track by subelement
    if (!bySubelement[question.subelement]) {
      bySubelement[question.subelement] = { correct: 0, total: 0, percentage: 0 }
    }
    bySubelement[question.subelement].total++
    if (isCorrect) {
      bySubelement[question.subelement].correct++
    }
  }

  // Calculate percentages for each subelement
  for (const sub of Object.keys(bySubelement)) {
    const data = bySubelement[sub]
    data.percentage = Math.round((data.correct / data.total) * 100)
  }

  const totalQuestions = questions.length
  const score = Math.round((correctCount / totalQuestions) * 100)
  const passingScore = Math.ceil(totalQuestions * 0.74)

  return {
    totalQuestions,
    correctCount,
    incorrectCount: totalQuestions - correctCount,
    score,
    passed: correctCount >= passingScore,
    passingScore,
    bySubelement,
  }
}

/**
 * Get exam configuration for an exam level
 */
export async function getExamConfig(examLevel: ExamLevel): Promise<{
  totalQuestions: number
  passingScore: number
  passingPercentage: number
  timeLimit: number
  groups: string[]
}> {
  const groups = await getExamGroups(examLevel)
  const totalQuestions = groups.length

  return {
    totalQuestions,
    passingScore: Math.ceil(totalQuestions * 0.74),
    passingPercentage: 74,
    timeLimit: 60,
    groups,
  }
}

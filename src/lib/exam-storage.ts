/**
 * Exam Storage
 * Handles saving and retrieving exam attempts from IndexedDB
 */

import { db } from './db'
import type { ExamAttempt, ExamAnswer, ExamLevel } from '@/types'

/**
 * Save a completed exam attempt
 */
export async function saveExamAttempt(
  examLevel: ExamLevel,
  score: number,
  passed: boolean,
  timeSpent: number, // in seconds
  answers: ExamAnswer[]
): Promise<string> {
  const id = `exam-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`

  const attempt: ExamAttempt = {
    id,
    examLevel,
    date: new Date(),
    score,
    passed,
    timeSpent,
    answers,
  }

  await db.examAttempts.add(attempt)
  return id
}

/**
 * Get all exam attempts for a specific exam level
 * @param examLevel - Filter by exam level
 * @param limit - Maximum number to return (most recent first)
 */
export async function getExamHistory(examLevel: ExamLevel, limit?: number): Promise<ExamAttempt[]> {
  const results = await db.examAttempts.where('examLevel').equals(examLevel).toArray()

  // Sort by date descending (most recent first)
  results.sort((a, b) => b.date.getTime() - a.date.getTime())

  return limit ? results.slice(0, limit) : results
}

/**
 * Get a specific exam attempt by ID
 */
export async function getExamAttempt(id: string): Promise<ExamAttempt | undefined> {
  return db.examAttempts.get(id)
}

/**
 * Get exam statistics for an exam level
 */
export async function getExamStats(examLevel: ExamLevel): Promise<{
  totalAttempts: number
  passCount: number
  failCount: number
  passRate: number
  averageScore: number
  bestScore: number
  averageTime: number // in seconds
  recentTrend: 'improving' | 'declining' | 'stable' | 'insufficient_data'
}> {
  const attempts = await getExamHistory(examLevel)

  if (attempts.length === 0) {
    return {
      totalAttempts: 0,
      passCount: 0,
      failCount: 0,
      passRate: 0,
      averageScore: 0,
      bestScore: 0,
      averageTime: 0,
      recentTrend: 'insufficient_data',
    }
  }

  const passCount = attempts.filter((a) => a.passed).length
  const totalScore = attempts.reduce((sum, a) => sum + a.score, 0)
  const totalTime = attempts.reduce((sum, a) => sum + a.timeSpent, 0)
  const bestScore = Math.max(...attempts.map((a) => a.score))

  // Calculate trend from last 5 exams
  let recentTrend: 'improving' | 'declining' | 'stable' | 'insufficient_data' = 'insufficient_data'
  if (attempts.length >= 3) {
    const recent = attempts.slice(0, Math.min(5, attempts.length))
    const first = recent[recent.length - 1].score
    const last = recent[0].score
    const diff = last - first

    if (diff > 5) recentTrend = 'improving'
    else if (diff < -5) recentTrend = 'declining'
    else recentTrend = 'stable'
  }

  return {
    totalAttempts: attempts.length,
    passCount,
    failCount: attempts.length - passCount,
    passRate: Math.round((passCount / attempts.length) * 100),
    averageScore: Math.round(totalScore / attempts.length),
    bestScore,
    averageTime: Math.round(totalTime / attempts.length),
    recentTrend,
  }
}

/**
 * Delete an exam attempt
 */
export async function deleteExamAttempt(id: string): Promise<void> {
  await db.examAttempts.delete(id)
}

/**
 * Clear all exam history for an exam level
 */
export async function clearExamHistory(examLevel: ExamLevel): Promise<void> {
  await db.examAttempts.where('examLevel').equals(examLevel).delete()
}

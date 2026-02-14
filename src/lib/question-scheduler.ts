/**
 * Question Scheduler
 * Manages question selection and progress tracking using spaced repetition
 */

import { db } from './db'
import {
  processAnswer,
  getInitialProgress,
  getMasteryStatus,
  calculatePriority,
} from './spaced-repetition'
import { getExplanation } from '@/data/explanations'
import type { Question, QuestionProgress, ExamLevel } from '@/types'

// Re-export getExplanation for convenience
export { getExplanation } from '@/data/explanations'

// Cache for dynamically loaded question pools
const poolCache = new Map<ExamLevel, Question[]>()

/**
 * Get the question pool for a given exam level
 * Uses dynamic imports with caching for performance optimization
 * @param examLevel - The exam level to get questions for
 * @returns Promise resolving to array of questions for that level
 */
export async function getQuestionPool(examLevel: ExamLevel): Promise<Question[]> {
  // Return cached pool if available
  if (poolCache.has(examLevel)) {
    return poolCache.get(examLevel)!
  }

  let pool: Question[]

  if (examLevel === 'technician') {
    const module = await import('@/data/pools/technician.json')
    pool = module.default.questions as Question[]
  } else if (examLevel === 'general') {
    const module = await import('@/data/pools/general.json')
    pool = module.default.questions as Question[]
  } else if (examLevel === 'extra') {
    const module = await import('@/data/pools/extra.json')
    pool = module.default.questions as Question[]
  } else {
    return []
  }

  poolCache.set(examLevel, pool)
  return pool
}

/**
 * Get all unique subelements for an exam level
 * @param examLevel - The exam level
 * @returns Promise resolving to array of unique subelement identifiers
 */
export async function getSubelements(examLevel: ExamLevel): Promise<string[]> {
  const pool = await getQuestionPool(examLevel)
  const subelements = new Set(pool.map((q) => q.subelement))
  return Array.from(subelements).sort()
}

/**
 * Get questions that are due for review
 * @param examLevel - The exam level to filter by
 * @param limit - Maximum number of questions to return
 * @returns Array of questions due for review, sorted by priority
 */
export async function getDueQuestions(
  examLevel: ExamLevel,
  limit: number = 10
): Promise<Question[]> {
  const now = new Date()
  const pool = await getQuestionPool(examLevel)

  if (pool.length === 0) {
    return []
  }

  // Get all progress records where nextReview <= now
  const dueProgress = await db.questionProgress.where('nextReview').belowOrEqual(now).toArray()

  // Filter to questions in this exam level's pool
  const poolIds = new Set(pool.map((q) => q.id))
  const dueProgressFiltered = dueProgress.filter((p) => poolIds.has(p.questionId))

  // Sort by priority (most urgent first)
  dueProgressFiltered.sort((a, b) => {
    const priorityA = calculatePriority(a.nextReview, a.interval, now)
    const priorityB = calculatePriority(b.nextReview, b.interval, now)
    return priorityB - priorityA
  })

  // Map to question IDs
  const dueIds = dueProgressFiltered.map((p) => p.questionId)

  // Create a map for fast lookup
  const poolMap = new Map(pool.map((q) => [q.id, q]))

  // Get the actual questions in priority order
  const dueQuestions = dueIds
    .map((id) => poolMap.get(id))
    .filter((q): q is Question => q !== undefined)

  return dueQuestions.slice(0, limit)
}

/**
 * Get new questions (never seen before)
 * @param examLevel - The exam level
 * @param limit - Maximum number to return
 * @returns Array of unseen questions
 */
export async function getNewQuestions(
  examLevel: ExamLevel,
  limit: number = 10
): Promise<Question[]> {
  const pool = await getQuestionPool(examLevel)

  if (pool.length === 0) {
    return []
  }

  // Get all question IDs we have progress for
  const allProgress = await db.questionProgress.toArray()
  const seenIds = new Set(allProgress.map((p) => p.questionId))

  // Filter to unseen questions
  const newQuestions = pool.filter((q) => !seenIds.has(q.id))

  return newQuestions.slice(0, limit)
}

/**
 * Get a mixed set of questions for practice
 * Prioritizes: due questions > new questions > random review
 * @param examLevel - The exam level
 * @param count - Number of questions to return
 * @returns Mixed array of questions for practice
 */
export async function getPracticeQuestions(
  examLevel: ExamLevel,
  count: number = 10
): Promise<Question[]> {
  const result: Question[] = []

  // First, get due questions (highest priority)
  const due = await getDueQuestions(examLevel, count)
  result.push(...due)

  if (result.length >= count) {
    return result.slice(0, count)
  }

  // Then, add new questions
  const remaining = count - result.length
  const newQs = await getNewQuestions(examLevel, remaining)
  result.push(...newQs)

  if (result.length >= count) {
    return result.slice(0, count)
  }

  // Finally, add random review questions if needed
  // (questions not due but previously seen - for extra practice)
  const finalRemaining = count - result.length
  if (finalRemaining > 0) {
    const reviewQs = await getReviewQuestions(
      examLevel,
      finalRemaining,
      new Set(result.map((q) => q.id))
    )
    result.push(...reviewQs)
  }

  return result
}

/**
 * Get questions that are not due but have been seen before (for extra practice)
 * @param examLevel - The exam level
 * @param limit - Maximum number to return
 * @param excludeIds - Set of question IDs to exclude
 * @returns Array of questions for review
 */
async function getReviewQuestions(
  examLevel: ExamLevel,
  limit: number,
  excludeIds: Set<string>
): Promise<Question[]> {
  const now = new Date()
  const pool = await getQuestionPool(examLevel)
  const poolIds = new Set(pool.map((q) => q.id))

  // Get all progress records where nextReview > now (not yet due)
  const allProgress = await db.questionProgress.where('nextReview').above(now).toArray()

  // Filter to this exam level and not already included
  const reviewProgress = allProgress.filter(
    (p) => poolIds.has(p.questionId) && !excludeIds.has(p.questionId)
  )

  // Sort by interval (shorter intervals first - less confident material)
  reviewProgress.sort((a, b) => a.interval - b.interval)

  // Map to questions
  const poolMap = new Map(pool.map((q) => [q.id, q]))
  const reviewQuestions = reviewProgress
    .map((p) => poolMap.get(p.questionId))
    .filter((q): q is Question => q !== undefined)

  return reviewQuestions.slice(0, limit)
}

/**
 * Get questions filtered by subelement
 * @param examLevel - The exam level
 * @param subelement - The subelement to filter by (e.g., 'T1', 'T2')
 * @param limit - Optional limit on number of questions
 * @returns Array of questions in that subelement
 */
export async function getQuestionsBySubelement(
  examLevel: ExamLevel,
  subelement: string,
  limit?: number
): Promise<Question[]> {
  const pool = await getQuestionPool(examLevel)
  const filtered = pool.filter((q) => q.subelement === subelement)
  return limit ? filtered.slice(0, limit) : filtered
}

/**
 * Get questions filtered by group (subelement + group letter)
 * @param examLevel - The exam level
 * @param subelement - The subelement (e.g., 'T1', 'G2')
 * @param group - The group letter (e.g., 'A', 'B')
 * @returns Promise resolving to array of questions in that group
 */
export async function getQuestionsByGroup(
  examLevel: ExamLevel,
  subelement: string,
  group: string
): Promise<Question[]> {
  const pool = await getQuestionPool(examLevel)
  return pool.filter((q) => q.subelement === subelement && q.group === group)
}

/**
 * Get all unique groups for a subelement
 * @param examLevel - The exam level
 * @param subelement - The subelement to get groups for (e.g., 'T1')
 * @returns Promise resolving to array of group identifiers with full format (e.g., ['T1A', 'T1B', 'T1C'])
 */
export async function getGroupsForSubelement(
  examLevel: ExamLevel,
  subelement: string
): Promise<string[]> {
  const pool = await getQuestionPool(examLevel)
  const groups = new Set(
    pool.filter((q) => q.subelement === subelement).map((q) => `${q.subelement}${q.group}`)
  )
  return Array.from(groups).sort()
}

/**
 * Get questions filtered by mastery status
 * @param examLevel - The exam level
 * @param status - The status to filter by
 * @returns Array of questions with that status
 */
export async function getQuestionsByStatus(
  examLevel: ExamLevel,
  status: 'new' | 'learning' | 'review' | 'mastered'
): Promise<Question[]> {
  const pool = await getQuestionPool(examLevel)

  if (status === 'new') {
    return getNewQuestions(examLevel, pool.length)
  }

  // Get progress records with matching status
  const progressByStatus = await db.questionProgress.where('status').equals(status).toArray()

  // Filter to questions in this exam level's pool
  const poolIds = new Set(pool.map((q) => q.id))
  const matchingIds = new Set(
    progressByStatus.filter((p) => poolIds.has(p.questionId)).map((p) => p.questionId)
  )

  return pool.filter((q) => matchingIds.has(q.id))
}

/**
 * Save progress for a question after answering
 * @param questionId - The question ID
 * @param isCorrect - Whether the answer was correct
 * @param confidence - Optional confidence rating (1-5, defaults to 3)
 */
export async function saveQuestionProgress(
  questionId: string,
  isCorrect: boolean,
  confidence?: number
): Promise<void> {
  const now = new Date()

  try {
    // Get existing progress or create new
    const existing = await db.questionProgress.get(questionId)

    if (existing) {
      // Update existing progress
      const result = processAnswer(
        isCorrect,
        {
          easeFactor: existing.easeFactor,
          interval: existing.interval,
          attempts: existing.attempts,
          correctCount: existing.correctCount,
        },
        confidence
      )

      const newCorrectCount = isCorrect ? existing.correctCount + 1 : existing.correctCount
      const newAttempts = existing.attempts + 1

      // Recalculate status based on updated values
      const status = getMasteryStatus(result.interval, newCorrectCount, newAttempts)

      await db.questionProgress.update(questionId, {
        attempts: newAttempts,
        correctCount: newCorrectCount,
        lastAttempt: now,
        nextReview: result.nextReview,
        easeFactor: result.easeFactor,
        interval: result.interval,
        status,
      })
    } else {
      // Create new progress record
      const result = processAnswer(isCorrect, undefined, confidence)
      const initial = getInitialProgress()

      const progress: QuestionProgress = {
        questionId,
        attempts: 1,
        correctCount: isCorrect ? 1 : 0,
        lastAttempt: now,
        nextReview: result.nextReview,
        easeFactor: result.easeFactor,
        interval: result.interval,
        status: isCorrect ? 'learning' : initial.status,
      }

      await db.questionProgress.add(progress)
    }
  } catch (error) {
    console.error(`Failed to save progress for question ${questionId}:`, error)
    throw new Error(`Failed to save progress for question ${questionId}`)
  }
}

/**
 * Get progress for a specific question
 * @param questionId - The question ID
 * @returns The progress record or undefined if not found
 */
export async function getQuestionProgress(
  questionId: string
): Promise<QuestionProgress | undefined> {
  return db.questionProgress.get(questionId)
}

/**
 * Get progress statistics for an exam level
 * @param examLevel - The exam level
 * @returns Statistics object with counts and accuracy
 */
export async function getProgressStats(examLevel: ExamLevel): Promise<{
  total: number
  new: number
  learning: number
  review: number
  mastered: number
  accuracy: number
  dueCount: number
}> {
  const pool = await getQuestionPool(examLevel)
  const poolIds = new Set(pool.map((q) => q.id))

  const allProgress = await db.questionProgress.toArray()
  const relevantProgress = allProgress.filter((p) => poolIds.has(p.questionId))

  // Count by status
  const counts = {
    new: 0,
    learning: 0,
    review: 0,
    mastered: 0,
  }

  let totalAttempts = 0
  let totalCorrect = 0
  let dueCount = 0
  const now = new Date()

  for (const p of relevantProgress) {
    counts[p.status]++
    totalAttempts += p.attempts
    totalCorrect += p.correctCount
    if (p.nextReview <= now) {
      dueCount++
    }
  }

  // Questions not in progress are 'new'
  counts.new = pool.length - relevantProgress.length

  // Calculate overall accuracy
  const accuracy = totalAttempts > 0 ? totalCorrect / totalAttempts : 0

  return {
    total: pool.length,
    new: counts.new,
    learning: counts.learning,
    review: counts.review,
    mastered: counts.mastered,
    accuracy,
    dueCount,
  }
}

/**
 * Get progress statistics grouped by subelement
 * @param examLevel - The exam level
 * @returns Map of subelement to statistics
 */
export async function getProgressBySubelement(examLevel: ExamLevel): Promise<
  Map<
    string,
    {
      total: number
      mastered: number
      accuracy: number
    }
  >
> {
  const pool = await getQuestionPool(examLevel)
  const allProgress = await db.questionProgress.toArray()
  const progressMap = new Map(allProgress.map((p) => [p.questionId, p]))

  const results = new Map<
    string,
    {
      total: number
      mastered: number
      accuracy: number
    }
  >()

  // Group questions by subelement
  const bySubelement = new Map<string, Question[]>()
  for (const q of pool) {
    const existing = bySubelement.get(q.subelement) || []
    existing.push(q)
    bySubelement.set(q.subelement, existing)
  }

  // Calculate stats for each subelement
  for (const [subelement, questions] of bySubelement) {
    let mastered = 0
    let totalAttempts = 0
    let totalCorrect = 0

    for (const q of questions) {
      const progress = progressMap.get(q.id)
      if (progress) {
        if (progress.status === 'mastered') {
          mastered++
        }
        totalAttempts += progress.attempts
        totalCorrect += progress.correctCount
      }
    }

    results.set(subelement, {
      total: questions.length,
      mastered,
      accuracy: totalAttempts > 0 ? totalCorrect / totalAttempts : 0,
    })
  }

  return results
}

/**
 * Reset all progress for an exam level
 * @param examLevel - The exam level to reset
 */
export async function resetProgress(examLevel: ExamLevel): Promise<void> {
  const pool = await getQuestionPool(examLevel)
  const poolIds = pool.map((q) => q.id)

  await db.questionProgress.where('questionId').anyOf(poolIds).delete()
}

/**
 * Get a random question from the pool (for quick practice)
 * @param examLevel - The exam level
 * @param excludeIds - Optional set of IDs to exclude
 * @returns Promise resolving to a random question or undefined if pool is empty
 */
export async function getRandomQuestion(
  examLevel: ExamLevel,
  excludeIds?: Set<string>
): Promise<Question | undefined> {
  const pool = await getQuestionPool(examLevel)
  const filtered = excludeIds ? pool.filter((q) => !excludeIds.has(q.id)) : pool

  if (filtered.length === 0) {
    return undefined
  }

  const randomIndex = Math.floor(Math.random() * filtered.length)
  return filtered[randomIndex]
}

/**
 * Get a question with its explanation merged in
 * @param examLevel - The exam level
 * @param questionId - The question ID
 * @returns Promise resolving to the question with explanation field populated, or undefined if not found
 */
export async function getQuestionWithExplanation(
  examLevel: ExamLevel,
  questionId: string
): Promise<Question | undefined> {
  const pool = await getQuestionPool(examLevel)
  const question = pool.find((q) => q.id === questionId)

  if (!question) {
    return undefined
  }

  // Merge explanation if available
  const explanation = getExplanation(questionId)
  if (explanation) {
    return { ...question, explanation }
  }

  return question
}

/**
 * Get the question pool with explanations merged into each question
 * @param examLevel - The exam level
 * @returns Promise resolving to array of questions with explanation fields populated
 */
export async function getQuestionPoolWithExplanations(examLevel: ExamLevel): Promise<Question[]> {
  const pool = await getQuestionPool(examLevel)

  return pool.map((question) => {
    const explanation = getExplanation(question.id)
    if (explanation) {
      return { ...question, explanation }
    }
    return question
  })
}

/**
 * Exam Generator
 * Implements official VE exam question selection rules
 *
 * Rules:
 * - Exams are built by selecting one question from each "group"
 *   - Technician/General: 35 groups → 35 questions
 *   - Extra: 50 groups → 50 questions
 * - Groups are organized by subelement (e.g., T1A, T1B, T2A, etc.)
 * - Group selection rotates through the pool so retakes expose you to all questions over time
 * - Question order is shuffled each exam
 * - To pass: 74% correct (rounded up)
 */

import type { Question, ExamLevel } from '@/types'
import { getQuestionPool } from './question-scheduler'

const EXPECTED_GROUP_COUNTS: Record<ExamLevel, number> = {
  technician: 35,
  general: 35,
  extra: 50,
}

type ExamRotationGroupStateV1 = {
  poolKey: string
  remaining: string[]
  lastPickedId?: string
}

type ExamRotationStateV1 = {
  version: 1
  groups: Record<string, ExamRotationGroupStateV1>
  lastExamSignature?: string
}

const ROTATION_STORAGE_KEY_PREFIX = 'hamforge-exam-rotation-v1'
const rotationMemoryCache = new Map<ExamLevel, ExamRotationStateV1>()

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function getRotationStorageKey(examLevel: ExamLevel): string {
  return `${ROTATION_STORAGE_KEY_PREFIX}-${examLevel}`
}

function getDefaultRotationState(): ExamRotationStateV1 {
  return { version: 1, groups: {} }
}

function loadRotationState(examLevel: ExamLevel): ExamRotationStateV1 {
  const cached = rotationMemoryCache.get(examLevel)
  const storageKey = getRotationStorageKey(examLevel)

  if (typeof localStorage === 'undefined') {
    return cached ?? getDefaultRotationState()
  }

  try {
    const raw = localStorage.getItem(storageKey)
    if (!raw) return cached ?? getDefaultRotationState()

    const parsed = JSON.parse(raw) as unknown
    if (!isRecord(parsed) || parsed.version !== 1) return cached ?? getDefaultRotationState()

    const groupsValue = parsed.groups
    const groups: Record<string, ExamRotationGroupStateV1> = {}

    if (isRecord(groupsValue)) {
      for (const [groupKey, groupState] of Object.entries(groupsValue)) {
        if (!isRecord(groupState)) continue

        const poolKey = typeof groupState.poolKey === 'string' ? groupState.poolKey : ''
        const remaining = Array.isArray(groupState.remaining)
          ? groupState.remaining.filter((id): id is string => typeof id === 'string')
          : []
        const lastPickedId =
          typeof groupState.lastPickedId === 'string' ? groupState.lastPickedId : undefined

        if (!poolKey) continue
        groups[groupKey] = { poolKey, remaining, lastPickedId }
      }
    }

    const state: ExamRotationStateV1 = {
      version: 1,
      groups,
      lastExamSignature:
        typeof parsed.lastExamSignature === 'string' ? parsed.lastExamSignature : undefined,
    }

    rotationMemoryCache.set(examLevel, state)
    return state
  } catch (error) {
    console.warn('Failed to load exam rotation state:', error)
    return cached ?? getDefaultRotationState()
  }
}

function saveRotationState(examLevel: ExamLevel, state: ExamRotationStateV1): void {
  rotationMemoryCache.set(examLevel, state)

  if (typeof localStorage === 'undefined') return

  try {
    localStorage.setItem(getRotationStorageKey(examLevel), JSON.stringify(state))
  } catch (error) {
    console.warn('Failed to save exam rotation state:', error)
  }
}

function randomInt(maxExclusive: number): number {
  if (maxExclusive <= 1) return 0

  try {
    if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
      const value = new Uint32Array(1)
      crypto.getRandomValues(value)
      return value[0] % maxExclusive
    }
  } catch {
    // Ignore and fall back to Math.random
  }

  return Math.floor(Math.random() * maxExclusive)
}

function shuffleArray<T>(items: readonly T[]): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(i + 1)
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

function stablePoolKey(questionIds: readonly string[]): string {
  return [...questionIds].sort().join('|')
}

function pickNextQuestionId(
  state: ExamRotationStateV1,
  groupKey: string,
  questionIds: readonly string[]
): string {
  if (questionIds.length === 0) {
    throw new Error(`No questions available for group ${groupKey}`)
  }

  const poolKey = stablePoolKey(questionIds)
  const existing = state.groups[groupKey]

  let groupState: ExamRotationGroupStateV1
  if (!existing || existing.poolKey !== poolKey) {
    groupState = { poolKey, remaining: shuffleArray(questionIds) }
  } else {
    const validIds = new Set(questionIds)
    groupState = {
      poolKey,
      remaining: existing.remaining.filter((id) => validIds.has(id)),
      lastPickedId: existing.lastPickedId,
    }
  }

  if (groupState.remaining.length === 0) {
    groupState.remaining = shuffleArray(questionIds)
  }

  // Avoid repeating the last picked question when reshuffling, if possible.
  if (
    questionIds.length > 1 &&
    groupState.lastPickedId &&
    groupState.remaining[0] === groupState.lastPickedId
  ) {
    const swapIndex = groupState.remaining.findIndex((id) => id !== groupState.lastPickedId)
    if (swapIndex > 0) {
      const [replacement] = groupState.remaining.splice(swapIndex, 1)
      groupState.remaining.unshift(replacement)
    }
  }

  const nextId = groupState.remaining.shift() ?? questionIds[0]
  groupState.lastPickedId = nextId
  state.groups[groupKey] = groupState
  return nextId
}

function orderSignature(questions: readonly Question[]): string {
  return questions.map((q) => q.id).join(',')
}

function shuffleExamQuestions(
  questions: readonly Question[],
  lastSignature?: string
): { questions: Question[]; signature: string } {
  if (questions.length <= 1) {
    const signature = orderSignature(questions)
    return { questions: [...questions], signature }
  }

  let shuffled = shuffleArray(questions)
  let signature = orderSignature(shuffled)

  if (lastSignature && signature === lastSignature) {
    for (let attempt = 0; attempt < 5 && signature === lastSignature; attempt++) {
      shuffled = shuffleArray(questions)
      signature = orderSignature(shuffled)
    }

    if (signature === lastSignature) {
      ;[shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]]
      signature = orderSignature(shuffled)
    }
  }

  return { questions: shuffled, signature }
}

export interface ExamQuestion extends Question {
  examIndex: number // 1-based position in the exam
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
 * @param examLevel - technician, general, or extra
 * @returns Promise resolving to a complete exam with 35 (Tech/General) or 50 (Extra) questions
 */
export async function generateExam(examLevel: ExamLevel): Promise<GeneratedExam> {
  const pool = await getQuestionPool(examLevel)
  if (pool.length === 0) {
    throw new Error(`Question pool is empty for exam level: ${examLevel}`)
  }

  const questionsById = new Map<string, Question>()
  const questionIdsByGroup = new Map<string, string[]>()

  for (const question of pool) {
    questionsById.set(question.id, question)
    const groupKey = question.subelement + question.group
    const existing = questionIdsByGroup.get(groupKey)
    if (existing) {
      existing.push(question.id)
    } else {
      questionIdsByGroup.set(groupKey, [question.id])
    }
  }

  const groups = Array.from(questionIdsByGroup.keys()).sort()
  const expectedGroupCount = EXPECTED_GROUP_COUNTS[examLevel]
  if (groups.length !== expectedGroupCount) {
    throw new Error(
      `Invalid question pool for ${examLevel}: expected ${expectedGroupCount} groups, found ${groups.length}`
    )
  }

  const rotationState = loadRotationState(examLevel)

  // Prune any stale group state entries from older pools.
  for (const groupKey of Object.keys(rotationState.groups)) {
    if (!questionIdsByGroup.has(groupKey)) {
      delete rotationState.groups[groupKey]
    }
  }

  const selectedQuestions: Question[] = []
  for (const groupKey of groups) {
    const groupIds = questionIdsByGroup.get(groupKey) ?? []
    const nextId = pickNextQuestionId(rotationState, groupKey, groupIds)
    const selected = questionsById.get(nextId) ?? questionsById.get(groupIds[0])
    if (!selected) {
      throw new Error(`Failed to select question for group ${groupKey}`)
    }
    selectedQuestions.push(selected)
  }

  const { questions: shuffledQuestions, signature } = shuffleExamQuestions(
    selectedQuestions,
    rotationState.lastExamSignature
  )

  rotationState.lastExamSignature = signature
  saveRotationState(examLevel, rotationState)

  const questions: ExamQuestion[] = shuffledQuestions.map((q, index) => ({
    ...q,
    examIndex: index + 1,
  }))

  // Generate unique exam ID
  const id = `exam-${examLevel}-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`

  const totalQuestions = questions.length
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
  if (questions.length === 0) {
    return {
      totalQuestions: 0,
      correctCount: 0,
      incorrectCount: 0,
      score: 0,
      passed: false,
      passingScore: 0,
      bySubelement: {},
    }
  }

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

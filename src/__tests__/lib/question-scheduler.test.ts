import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { getNewQuestions, getPracticeQuestions } from '@/lib/question-scheduler'
import { db } from '@/lib/db'

vi.mock('@/data/pools/technician.json', () => ({
  default: {
    questions: [
      {
        id: 'T1A01',
        subelement: 'T1',
        group: 'A',
        question: 'What is Q1?',
        answers: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
      },
      {
        id: 'T1A02',
        subelement: 'T1',
        group: 'A',
        question: 'What is Q2?',
        answers: ['A', 'B', 'C', 'D'],
        correctAnswer: 1,
      },
      {
        id: 'T1A03',
        subelement: 'T1',
        group: 'A',
        question: 'What is Q3?',
        answers: ['A', 'B', 'C', 'D'],
        correctAnswer: 2,
      },
      {
        id: 'T1A04',
        subelement: 'T1',
        group: 'A',
        question: 'What is Q4?',
        answers: ['A', 'B', 'C', 'D'],
        correctAnswer: 3,
      },
      {
        id: 'T1A05',
        subelement: 'T1',
        group: 'A',
        question: 'What is Q5?',
        answers: ['A', 'B', 'C', 'D'],
        correctAnswer: 0,
      },
    ],
  },
}))

describe('question-scheduler', () => {
  const previousCrypto = globalThis.crypto

  beforeEach(async () => {
    await db.questionProgress.clear()
  })

  afterEach(() => {
    Object.defineProperty(globalThis, 'crypto', {
      value: previousCrypto,
    })
    vi.restoreAllMocks()
  })

  it('should randomize new question order before limiting', async () => {
    Object.defineProperty(globalThis, 'crypto', {
      value: undefined,
    })

    const randomSpy = vi
      .spyOn(Math, 'random')
      .mockReturnValueOnce(0.99)
      .mockReturnValueOnce(0.0)
      .mockReturnValueOnce(0.0)
      .mockReturnValue(0.0)

    const questions = await getNewQuestions('technician', 2)

    expect(questions.map((q) => q.id)).toEqual(['T1A02', 'T1A03'])
    randomSpy.mockRestore()
  })

  it('should return full pool when requesting more than available and avoid duplicates', async () => {
    const now = new Date()
    const past = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const future = new Date(now.getTime() + 24 * 60 * 60 * 1000)

    await db.questionProgress.bulkAdd([
      {
        questionId: 'T1A01',
        attempts: 1,
        correctCount: 0,
        lastAttempt: past,
        nextReview: past,
        easeFactor: 2.5,
        interval: 1,
        status: 'learning',
      },
      {
        questionId: 'T1A02',
        attempts: 1,
        correctCount: 1,
        lastAttempt: past,
        nextReview: past,
        easeFactor: 2.5,
        interval: 1,
        status: 'learning',
      },
      {
        questionId: 'T1A03',
        attempts: 4,
        correctCount: 4,
        lastAttempt: now,
        nextReview: future,
        easeFactor: 2.5,
        interval: 8,
        status: 'review',
      },
      {
        questionId: 'T1A04',
        attempts: 3,
        correctCount: 2,
        lastAttempt: now,
        nextReview: future,
        easeFactor: 2.1,
        interval: 10,
        status: 'review',
      },
      {
        questionId: 'T1A05',
        attempts: 6,
        correctCount: 6,
        lastAttempt: now,
        nextReview: future,
        easeFactor: 2.8,
        interval: 30,
        status: 'mastered',
      },
    ])

    const questions = await getPracticeQuestions('technician', 9999)
    const uniqueIds = new Set(questions.map((q) => q.id))

    expect(questions).toHaveLength(5)
    expect(uniqueIds.size).toBe(5)
    expect(questions.map((q) => q.id).sort()).toEqual([
      'T1A01',
      'T1A02',
      'T1A03',
      'T1A04',
      'T1A05',
    ].sort())
  })
})

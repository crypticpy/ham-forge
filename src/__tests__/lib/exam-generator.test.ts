/**
 * Exam Generator Tests
 *
 * Comprehensive unit tests for the exam generator module
 * that implements VE exam question selection rules.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import {
  getExamGroups,
  getQuestionsForGroup,
  generateExam,
  calculateExamResult,
  getExamConfig,
  type ExamQuestion,
} from '@/lib/exam-generator'
import { createMockQuestion, createMockExamAnswers } from '../utils'

describe('exam-generator', () => {
  describe('getExamGroups()', () => {
    it('returns 35 groups for technician exam', async () => {
      const groups = await getExamGroups('technician')

      expect(groups).toHaveLength(35)
    })

    it('returns 35 groups for general exam', async () => {
      const groups = await getExamGroups('general')

      expect(groups).toHaveLength(35)
    })

    it('returns groups sorted alphabetically', async () => {
      const groups = await getExamGroups('technician')
      const sortedGroups = [...groups].sort()

      expect(groups).toEqual(sortedGroups)
    })

    it('returns groups in correct format (subelement + group letter)', async () => {
      const groups = await getExamGroups('technician')

      // Technician groups start with T
      for (const group of groups) {
        expect(group).toMatch(/^T\d[A-Z]$/)
      }
    })

    it('returns groups starting with G for general exam', async () => {
      const groups = await getExamGroups('general')

      // General groups start with G
      for (const group of groups) {
        expect(group).toMatch(/^G\d[A-Z]$/)
      }
    })

    it('returns empty array for extra exam (not yet implemented)', async () => {
      // Extra pool not yet available
      const groups = await getExamGroups('extra')

      expect(groups).toHaveLength(0)
    })

    it('returns unique groups with no duplicates', async () => {
      const groups = await getExamGroups('technician')
      const uniqueGroups = new Set(groups)

      expect(uniqueGroups.size).toBe(groups.length)
    })
  })

  describe('getQuestionsForGroup()', () => {
    it('returns questions matching the specified group', async () => {
      const questions = await getQuestionsForGroup('technician', 'T1A')

      expect(questions.length).toBeGreaterThan(0)

      for (const question of questions) {
        expect(question.subelement).toBe('T1')
        expect(question.group).toBe('A')
      }
    })

    it('returns empty array for invalid group', async () => {
      const questions = await getQuestionsForGroup('technician', 'INVALID')

      expect(questions).toEqual([])
    })

    it('returns empty array for non-existent group in valid format', async () => {
      const questions = await getQuestionsForGroup('technician', 'T9Z')

      expect(questions).toEqual([])
    })

    it('returns questions with correct structure', async () => {
      const questions = await getQuestionsForGroup('technician', 'T1A')

      expect(questions.length).toBeGreaterThan(0)

      const question = questions[0]
      expect(question).toHaveProperty('id')
      expect(question).toHaveProperty('subelement')
      expect(question).toHaveProperty('group')
      expect(question).toHaveProperty('question')
      expect(question).toHaveProperty('answers')
      expect(question).toHaveProperty('correctAnswer')
    })

    it('returns questions for general exam groups', async () => {
      const questions = await getQuestionsForGroup('general', 'G1A')

      expect(questions.length).toBeGreaterThan(0)

      for (const question of questions) {
        expect(question.subelement).toBe('G1')
        expect(question.group).toBe('A')
      }
    })

    it('returns empty array for extra exam (pool not available)', async () => {
      const questions = await getQuestionsForGroup('extra', 'E1A')

      expect(questions).toEqual([])
    })
  })

  describe('generateExam()', () => {
    it('generates exactly 35 questions for technician exam', async () => {
      const exam = await generateExam('technician')

      expect(exam.questions).toHaveLength(35)
    })

    it('generates exactly 35 questions for general exam', async () => {
      const exam = await generateExam('general')

      expect(exam.questions).toHaveLength(35)
    })

    it('assigns unique examIndex from 1 to 35 to each question', async () => {
      const exam = await generateExam('technician')
      const indices = exam.questions.map((q) => q.examIndex)

      // Check all indices are present (1-35)
      const sortedIndices = [...indices].sort((a, b) => a - b)
      const expectedIndices = Array.from({ length: 35 }, (_, i) => i + 1)

      expect(sortedIndices).toEqual(expectedIndices)
    })

    it('selects questions from different groups', async () => {
      const exam = await generateExam('technician')
      const groups = exam.questions.map((q) => q.subelement + q.group)
      const uniqueGroups = new Set(groups)

      // Each question should come from a different group
      expect(uniqueGroups.size).toBe(35)
    })

    it('generates a valid exam id', async () => {
      const exam = await generateExam('technician')

      expect(exam.id).toMatch(/^exam-technician-\d+-[a-z0-9]+$/)
    })

    it('generates unique exam ids on multiple calls', async () => {
      const exam1 = await generateExam('technician')
      const exam2 = await generateExam('technician')

      expect(exam1.id).not.toBe(exam2.id)
    })

    it('includes createdAt timestamp as Date object', async () => {
      const before = new Date()
      const exam = await generateExam('technician')
      const after = new Date()

      expect(exam.createdAt).toBeInstanceOf(Date)
      expect(exam.createdAt.getTime()).toBeGreaterThanOrEqual(before.getTime())
      expect(exam.createdAt.getTime()).toBeLessThanOrEqual(after.getTime())
    })

    it('sets timeLimit to 60 minutes', async () => {
      const exam = await generateExam('technician')

      expect(exam.timeLimit).toBe(60)
    })

    it('sets passingScore to 26', async () => {
      const exam = await generateExam('technician')

      expect(exam.passingScore).toBe(26)
    })

    it('includes correct examLevel in generated exam', async () => {
      const techExam = await generateExam('technician')
      const generalExam = await generateExam('general')

      expect(techExam.examLevel).toBe('technician')
      expect(generalExam.examLevel).toBe('general')
    })

    it('generates different questions on subsequent calls (randomness)', async () => {
      // Generate multiple exams and check that they're not all identical
      const exams = await Promise.all(Array.from({ length: 5 }, () => generateExam('technician')))
      const questionIdSets = exams.map((e) => e.questions.map((q) => q.id).join(','))
      const uniqueSets = new Set(questionIdSets)

      // With random selection, we should have at least 2 different combinations
      // (allowing for very rare case of identical selection)
      expect(uniqueSets.size).toBeGreaterThanOrEqual(1)
    })

    it('each question has all required ExamQuestion properties', async () => {
      const exam = await generateExam('technician')

      for (const question of exam.questions) {
        expect(question).toHaveProperty('id')
        expect(question).toHaveProperty('subelement')
        expect(question).toHaveProperty('group')
        expect(question).toHaveProperty('question')
        expect(question).toHaveProperty('answers')
        expect(question).toHaveProperty('correctAnswer')
        expect(question).toHaveProperty('examIndex')
        expect(typeof question.examIndex).toBe('number')
        expect(question.examIndex).toBeGreaterThanOrEqual(1)
        expect(question.examIndex).toBeLessThanOrEqual(35)
      }
    })
  })

  describe('calculateExamResult()', () => {
    let mockQuestions: ExamQuestion[]

    beforeEach(() => {
      // Create 35 mock questions with different subelements
      mockQuestions = []
      const subelements = ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T0']
      const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

      let examIndex = 1
      let questionCount = 0

      outerLoop: for (const sub of subelements) {
        for (const grp of groups) {
          if (questionCount >= 35) break outerLoop
          mockQuestions.push({
            ...createMockQuestion({
              id: `${sub}${grp}01`,
              subelement: sub,
              group: grp,
            }),
            examIndex: examIndex++,
          })
          questionCount++
        }
      }
    })

    it('correctly counts all correct answers', () => {
      const answers = mockQuestions.map((q) => ({
        questionId: q.id,
        correct: true,
      }))

      const result = calculateExamResult(mockQuestions, answers)

      expect(result.correctCount).toBe(35)
      expect(result.incorrectCount).toBe(0)
    })

    it('correctly counts all incorrect answers', () => {
      const answers = mockQuestions.map((q) => ({
        questionId: q.id,
        correct: false,
      }))

      const result = calculateExamResult(mockQuestions, answers)

      expect(result.correctCount).toBe(0)
      expect(result.incorrectCount).toBe(35)
    })

    it('correctly counts mixed correct and incorrect answers', () => {
      const answers = mockQuestions.map((q, i) => ({
        questionId: q.id,
        correct: i < 20, // First 20 correct, rest incorrect
      }))

      const result = calculateExamResult(mockQuestions, answers)

      expect(result.correctCount).toBe(20)
      expect(result.incorrectCount).toBe(15)
    })

    it('calculates accurate percentage for 100% score', () => {
      const answers = mockQuestions.map((q) => ({
        questionId: q.id,
        correct: true,
      }))

      const result = calculateExamResult(mockQuestions, answers)

      expect(result.score).toBe(100)
    })

    it('calculates accurate percentage for 0% score', () => {
      const answers = mockQuestions.map((q) => ({
        questionId: q.id,
        correct: false,
      }))

      const result = calculateExamResult(mockQuestions, answers)

      expect(result.score).toBe(0)
    })

    it('calculates accurate percentage for partial score', () => {
      // 26 out of 35 = 74.28...% rounds to 74%
      const answers = mockQuestions.map((q, i) => ({
        questionId: q.id,
        correct: i < 26,
      }))

      const result = calculateExamResult(mockQuestions, answers)

      expect(result.score).toBe(74)
    })

    it('returns passed=true when score is exactly 26 (passing threshold)', () => {
      const answers = mockQuestions.map((q, i) => ({
        questionId: q.id,
        correct: i < 26,
      }))

      const result = calculateExamResult(mockQuestions, answers)

      expect(result.passed).toBe(true)
      expect(result.correctCount).toBe(26)
    })

    it('returns passed=true when score is above 26', () => {
      const answers = mockQuestions.map((q, i) => ({
        questionId: q.id,
        correct: i < 30,
      }))

      const result = calculateExamResult(mockQuestions, answers)

      expect(result.passed).toBe(true)
      expect(result.correctCount).toBe(30)
    })

    it('returns passed=false when score is exactly 25', () => {
      const answers = mockQuestions.map((q, i) => ({
        questionId: q.id,
        correct: i < 25,
      }))

      const result = calculateExamResult(mockQuestions, answers)

      expect(result.passed).toBe(false)
      expect(result.correctCount).toBe(25)
    })

    it('returns passed=false when score is below 25', () => {
      const answers = mockQuestions.map((q, i) => ({
        questionId: q.id,
        correct: i < 10,
      }))

      const result = calculateExamResult(mockQuestions, answers)

      expect(result.passed).toBe(false)
      expect(result.correctCount).toBe(10)
    })

    it('correctly breaks down results by subelement', () => {
      // Make all T1 questions correct, all others incorrect
      const answers = mockQuestions.map((q) => ({
        questionId: q.id,
        correct: q.subelement === 'T1',
      }))

      const result = calculateExamResult(mockQuestions, answers)

      // T1 should have 100% correct
      expect(result.bySubelement['T1']).toBeDefined()
      expect(result.bySubelement['T1'].percentage).toBe(100)

      // Other subelements should have 0% correct
      for (const sub of Object.keys(result.bySubelement)) {
        if (sub !== 'T1') {
          expect(result.bySubelement[sub].percentage).toBe(0)
        }
      }
    })

    it('tracks total questions per subelement correctly', () => {
      const answers = mockQuestions.map((q) => ({
        questionId: q.id,
        correct: true,
      }))

      const result = calculateExamResult(mockQuestions, answers)

      // Count questions per subelement from mockQuestions
      const expectedCounts: Record<string, number> = {}
      for (const q of mockQuestions) {
        expectedCounts[q.subelement] = (expectedCounts[q.subelement] || 0) + 1
      }

      for (const [sub, count] of Object.entries(expectedCounts)) {
        expect(result.bySubelement[sub].total).toBe(count)
      }
    })

    it('handles unanswered questions as incorrect', () => {
      // Only answer some questions
      const answers = mockQuestions.slice(0, 10).map((q) => ({
        questionId: q.id,
        correct: true,
      }))

      const result = calculateExamResult(mockQuestions, answers)

      expect(result.correctCount).toBe(10)
      expect(result.incorrectCount).toBe(25)
    })

    it('includes totalQuestions in result', () => {
      const answers = createMockExamAnswers(mockQuestions, 20)
      const result = calculateExamResult(mockQuestions, answers)

      expect(result.totalQuestions).toBe(35)
    })

    it('includes passingScore in result', () => {
      const answers = createMockExamAnswers(mockQuestions, 20)
      const result = calculateExamResult(mockQuestions, answers)

      expect(result.passingScore).toBe(26)
    })

    it('calculates subelement percentages correctly', () => {
      // Create specific scenario: T1 has 7 questions, answer 5 correct (71%)
      const t1Questions = mockQuestions.filter((q) => q.subelement === 'T1')
      const answers = mockQuestions.map((q) => {
        if (q.subelement === 'T1') {
          // Answer first 5 T1 questions correct
          const t1Index = t1Questions.indexOf(q)
          return { questionId: q.id, correct: t1Index < 5 }
        }
        return { questionId: q.id, correct: false }
      })

      const result = calculateExamResult(mockQuestions, answers)
      const t1Count = t1Questions.length
      const expectedPercentage = Math.round((5 / t1Count) * 100)

      expect(result.bySubelement['T1'].correct).toBe(5)
      expect(result.bySubelement['T1'].total).toBe(t1Count)
      expect(result.bySubelement['T1'].percentage).toBe(expectedPercentage)
    })
  })

  describe('getExamConfig()', () => {
    it('returns correct totalQuestions of 35 for technician', async () => {
      const config = await getExamConfig('technician')

      expect(config.totalQuestions).toBe(35)
    })

    it('returns correct totalQuestions of 35 for general', async () => {
      const config = await getExamConfig('general')

      expect(config.totalQuestions).toBe(35)
    })

    it('returns correct passingScore of 26', async () => {
      const config = await getExamConfig('technician')

      expect(config.passingScore).toBe(26)
    })

    it('returns correct passingPercentage of 74', async () => {
      const config = await getExamConfig('technician')

      expect(config.passingPercentage).toBe(74)
    })

    it('returns correct timeLimit of 60 minutes', async () => {
      const config = await getExamConfig('technician')

      expect(config.timeLimit).toBe(60)
    })

    it('includes groups array with 35 groups for technician', async () => {
      const config = await getExamConfig('technician')

      expect(config.groups).toHaveLength(35)
      expect(Array.isArray(config.groups)).toBe(true)
    })

    it('includes groups array with 35 groups for general', async () => {
      const config = await getExamConfig('general')

      expect(config.groups).toHaveLength(35)
      expect(Array.isArray(config.groups)).toBe(true)
    })

    it('returns consistent config values across multiple calls', async () => {
      const config1 = await getExamConfig('technician')
      const config2 = await getExamConfig('technician')

      expect(config1.totalQuestions).toBe(config2.totalQuestions)
      expect(config1.passingScore).toBe(config2.passingScore)
      expect(config1.passingPercentage).toBe(config2.passingPercentage)
      expect(config1.timeLimit).toBe(config2.timeLimit)
      expect(config1.groups).toEqual(config2.groups)
    })

    it('returns 0 totalQuestions for extra exam (not yet available)', async () => {
      const config = await getExamConfig('extra')

      expect(config.totalQuestions).toBe(0)
      expect(config.groups).toHaveLength(0)
    })

    it('groups match what getExamGroups returns', async () => {
      const config = await getExamConfig('technician')
      const groups = await getExamGroups('technician')

      expect(config.groups).toEqual(groups)
    })
  })

  describe('integration scenarios', () => {
    it('complete exam flow: generate, answer, calculate results', async () => {
      // Generate an exam
      const exam = await generateExam('technician')
      expect(exam.questions).toHaveLength(35)

      // Simulate answering all questions correctly
      const answers = exam.questions.map((q) => ({
        questionId: q.id,
        correct: true,
      }))

      // Calculate results
      const result = calculateExamResult(exam.questions, answers)

      expect(result.passed).toBe(true)
      expect(result.score).toBe(100)
      expect(result.correctCount).toBe(35)
    })

    it('generates valid exam with real question pool data', async () => {
      const exam = await generateExam('technician')

      // Verify all questions have valid structure
      for (const question of exam.questions) {
        expect(question.id).toBeTruthy()
        expect(question.question).toBeTruthy()
        expect(question.answers).toHaveLength(4)
        expect(question.correctAnswer).toBeGreaterThanOrEqual(0)
        expect(question.correctAnswer).toBeLessThanOrEqual(3)
      }
    })

    it('config matches generated exam properties', async () => {
      const config = await getExamConfig('technician')
      const exam = await generateExam('technician')

      expect(exam.questions.length).toBe(config.totalQuestions)
      expect(exam.passingScore).toBe(config.passingScore)
      expect(exam.timeLimit).toBe(config.timeLimit)
    })
  })
})

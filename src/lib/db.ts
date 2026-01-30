import Dexie, { type Table } from 'dexie'
import type { QuestionProgress, StudySession, ExamAttempt } from '@/types'

export class HamForgeDB extends Dexie {
  questionProgress!: Table<QuestionProgress>
  studySessions!: Table<StudySession>
  examAttempts!: Table<ExamAttempt>

  constructor() {
    super('HamForgeDB')

    this.version(1).stores({
      questionProgress: 'questionId, status, nextReview',
      studySessions: 'id, startTime, examLevel',
      examAttempts: 'id, date, examLevel, passed',
    })
  }
}

export const db = new HamForgeDB()

import type { GeneratedExam, ExamResult } from '@/lib/exam-generator'

export const EXAM_SESSION_STORAGE_KEY = 'hamforge-exam-session'

export interface ExamSessionPersistenceState {
  exam: GeneratedExam | null
  currentIndex: number
  answers: Map<string, number>
  flaggedQuestions: Set<number>
  isComplete: boolean
  result: ExamResult | null
  savedExamId: string | null
  timeRemaining: number
  startTime: Date | null
}

type SerializedGeneratedExam = Omit<GeneratedExam, 'createdAt'> & { createdAt: string }

export interface SerializedExamSessionState {
  exam: SerializedGeneratedExam | null
  currentIndex: number
  answers: [string, number][]
  flaggedQuestions: number[]
  isComplete: boolean
  result: ExamResult | null
  savedExamId: string | null
  timeRemaining: number
  startTime: string | null
}

export function serializeExamSessionState(
  state: ExamSessionPersistenceState
): SerializedExamSessionState {
  return {
    exam: state.exam
      ? {
          ...state.exam,
          createdAt: state.exam.createdAt.toISOString(),
        }
      : null,
    currentIndex: state.currentIndex,
    answers: Array.from(state.answers.entries()),
    flaggedQuestions: Array.from(state.flaggedQuestions),
    isComplete: state.isComplete,
    result: state.result,
    savedExamId: state.savedExamId,
    timeRemaining: state.timeRemaining,
    startTime: state.startTime?.toISOString() ?? null,
  }
}

export function deserializeExamSessionState(
  serialized: SerializedExamSessionState
): ExamSessionPersistenceState {
  return {
    exam: serialized.exam
      ? {
          ...serialized.exam,
          createdAt: new Date(serialized.exam.createdAt),
        }
      : null,
    currentIndex: serialized.currentIndex,
    answers: new Map(serialized.answers),
    flaggedQuestions: new Set(serialized.flaggedQuestions),
    isComplete: serialized.isComplete,
    result: serialized.result,
    savedExamId: serialized.savedExamId,
    timeRemaining: serialized.timeRemaining,
    startTime: serialized.startTime ? new Date(serialized.startTime) : null,
  }
}


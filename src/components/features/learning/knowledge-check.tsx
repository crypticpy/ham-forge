'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useKnowledgeCheck } from '@/hooks/use-knowledge-check'
import { useProgressStore } from '@/stores/progress-store'
import { cn } from '@/lib/utils'
import { CheckCircle, XCircle, Trophy, RotateCcw, ChevronRight, Loader2, Brain } from 'lucide-react'
import type { ExamLevel, Question } from '@/types'

interface KnowledgeCheckProps {
  sectionId: string
  relatedQuestionIds: string[]
  examLevel: ExamLevel
  onComplete?: (passed: boolean, score: number) => void
}

const ANSWER_LABELS = ['A', 'B', 'C', 'D'] as const
const AUTO_ADVANCE_DELAY = 1500 // 1.5 seconds

// Internal: Intro screen before starting the quiz
function KnowledgeCheckIntro({
  questionCount,
  onStart,
}: {
  questionCount: number
  onStart: () => void
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-10 rounded-full bg-primary/10">
            <Brain className="size-5 text-primary" aria-hidden="true" />
          </div>
          <div>
            <CardTitle>Knowledge Check</CardTitle>
            <CardDescription>Test your understanding of this section</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Answer {questionCount} question{questionCount !== 1 ? 's' : ''} to check your
          understanding. You need 60% to pass.
        </p>
        <Button onClick={onStart} className="w-full sm:w-auto">
          Start Quiz
          <ChevronRight className="size-4 ml-1" aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>
  )
}

// Internal: Progress indicator showing current question number
function KnowledgeCheckProgress({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">
        Question {current} of {total}
      </span>
      <div className="flex gap-1">
        {Array.from({ length: total }).map((_, index) => (
          <div
            key={index}
            className={cn(
              'size-2 rounded-full transition-colors',
              index < current ? 'bg-primary' : index === current - 1 ? 'bg-primary' : 'bg-muted'
            )}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  )
}

// Internal: Single question display with answer buttons
function KnowledgeCheckQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  isRevealed,
  onSelectAnswer,
  onNext,
}: {
  question: Question
  questionNumber: number
  totalQuestions: number
  selectedAnswer: number | null
  isRevealed: boolean
  onSelectAnswer: (index: number) => void
  onNext: () => void
}) {
  const isCorrect =
    isRevealed && selectedAnswer !== null && selectedAnswer === question.correctAnswer

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <CardTitle className="text-lg">Knowledge Check</CardTitle>
          <KnowledgeCheckProgress current={questionNumber} total={totalQuestions} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Question text */}
        <p className="text-base font-medium leading-relaxed">{question.question}</p>

        {/* Answer buttons */}
        <div className="space-y-3" role="group" aria-label="Answer options">
          {question.answers.map((answer, index) => {
            const isThisCorrect = index === question.correctAnswer
            const isSelected = selectedAnswer === index

            return (
              <button
                key={`${question.id}-${index}`}
                type="button"
                onClick={() => !isRevealed && onSelectAnswer(index)}
                disabled={isRevealed}
                aria-pressed={isSelected}
                aria-label={`Answer ${ANSWER_LABELS[index]}: ${answer}${isRevealed && isThisCorrect ? ' (Correct answer)' : ''}`}
                className={cn(
                  'w-full flex items-start gap-3 p-4 rounded-lg border-2 text-left transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'disabled:cursor-not-allowed',
                  // Before reveal
                  !isRevealed &&
                    isSelected &&
                    'border-primary bg-primary/10 text-foreground ring-2 ring-primary',
                  !isRevealed &&
                    !isSelected &&
                    'border-border bg-background hover:bg-accent hover:border-accent-foreground/20',
                  // After reveal
                  isRevealed &&
                    isThisCorrect &&
                    'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400',
                  isRevealed &&
                    isSelected &&
                    !isThisCorrect &&
                    'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400',
                  isRevealed &&
                    !isThisCorrect &&
                    !isSelected &&
                    'border-border bg-muted/50 text-muted-foreground opacity-60'
                )}
              >
                <span
                  className={cn(
                    'flex items-center justify-center size-8 rounded-full text-sm font-semibold shrink-0',
                    'border-2 transition-colors',
                    isSelected &&
                      !isRevealed &&
                      'border-primary bg-primary text-primary-foreground',
                    !isSelected &&
                      !isRevealed &&
                      'border-muted-foreground/30 bg-muted text-muted-foreground',
                    isRevealed && isThisCorrect && 'border-green-500 bg-green-500 text-white',
                    isRevealed &&
                      isSelected &&
                      !isThisCorrect &&
                      'border-red-500 bg-red-500 text-white',
                    isRevealed &&
                      !isThisCorrect &&
                      !isSelected &&
                      'border-muted-foreground/30 bg-muted text-muted-foreground'
                  )}
                >
                  {ANSWER_LABELS[index]}
                </span>
                <span className="flex-1 pt-1">{answer}</span>
                {isRevealed && isThisCorrect && (
                  <CheckCircle
                    className="size-5 text-green-600 dark:text-green-400 shrink-0"
                    aria-hidden="true"
                  />
                )}
                {isRevealed && isSelected && !isThisCorrect && (
                  <XCircle
                    className="size-5 text-red-600 dark:text-red-400 shrink-0"
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>

        {/* Feedback and next button after reveal */}
        {isRevealed && (
          <div className="space-y-4">
            <div
              className={cn(
                'flex items-center gap-2 p-3 rounded-lg',
                isCorrect
                  ? 'bg-green-500/10 text-green-700 dark:text-green-400'
                  : 'bg-red-500/10 text-red-700 dark:text-red-400'
              )}
            >
              {isCorrect ? (
                <>
                  <CheckCircle className="size-5" aria-hidden="true" />
                  <span className="font-medium">Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="size-5" aria-hidden="true" />
                  <span className="font-medium">Incorrect</span>
                </>
              )}
            </div>
            <Button onClick={onNext} className="w-full sm:w-auto">
              {questionNumber < totalQuestions ? 'Next Question' : 'See Results'}
              <ChevronRight className="size-4 ml-1" aria-hidden="true" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Internal: Results screen showing score and pass/fail status
function KnowledgeCheckResults({
  score,
  passed,
  totalQuestions,
  correctCount,
  onRetry,
}: {
  score: number
  passed: boolean
  totalQuestions: number
  correctCount: number
  onRetry: () => void
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex items-center justify-center size-12 rounded-full',
              passed ? 'bg-green-500/10' : 'bg-red-500/10'
            )}
          >
            {passed ? (
              <Trophy className="size-6 text-green-600 dark:text-green-400" aria-hidden="true" />
            ) : (
              <XCircle className="size-6 text-red-600 dark:text-red-400" aria-hidden="true" />
            )}
          </div>
          <div>
            <CardTitle>{passed ? 'Quiz Passed!' : 'Quiz Not Passed'}</CardTitle>
            <CardDescription>
              {passed
                ? 'Great job! You demonstrated understanding of this section.'
                : 'You need 60% to pass. Review the material and try again.'}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score display */}
        <div className="flex items-center justify-center gap-6 py-4">
          <div className="text-center">
            <div
              className={cn(
                'text-4xl font-bold',
                passed ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
              )}
            >
              {score}%
            </div>
            <div className="text-sm text-muted-foreground">Score</div>
          </div>
          <div className="h-12 w-px bg-border" aria-hidden="true" />
          <div className="text-center">
            <div className="text-4xl font-bold">
              {correctCount}/{totalQuestions}
            </div>
            <div className="text-sm text-muted-foreground">Correct</div>
          </div>
        </div>

        {/* Retry button */}
        {!passed && (
          <Button onClick={onRetry} variant="outline" className="w-full sm:w-auto">
            <RotateCcw className="size-4 mr-2" aria-hidden="true" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

/**
 * Knowledge Check component for testing section understanding
 */
export function KnowledgeCheck({
  sectionId,
  relatedQuestionIds,
  examLevel,
  onComplete,
}: KnowledgeCheckProps) {
  const [hasStarted, setHasStarted] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isRevealed, setIsRevealed] = useState(false)

  const { state, currentQuestion, submitAnswer, nextQuestion, retryQuiz, isLoading } =
    useKnowledgeCheck(sectionId, relatedQuestionIds, examLevel)

  const recordQuizResult = useProgressStore((s) => s.recordQuizResult)

  // Handle answer selection
  const handleSelectAnswer = useCallback(
    (index: number) => {
      if (isRevealed) return
      setSelectedAnswer(index)
      setIsRevealed(true)
    },
    [isRevealed]
  )

  // Handle moving to next question
  const handleNext = useCallback(() => {
    if (selectedAnswer !== null) {
      submitAnswer(selectedAnswer)
    }
    nextQuestion()
    setSelectedAnswer(null)
    setIsRevealed(false)
  }, [selectedAnswer, submitAnswer, nextQuestion])

  // Handle retry
  const handleRetry = useCallback(() => {
    retryQuiz()
    setHasStarted(true)
    setSelectedAnswer(null)
    setIsRevealed(false)
  }, [retryQuiz])

  // Auto-advance after revealing answer
  useEffect(() => {
    if (!isRevealed) return

    const timer = setTimeout(() => {
      handleNext()
    }, AUTO_ADVANCE_DELAY)

    return () => clearTimeout(timer)
  }, [isRevealed, handleNext])

  // Record quiz result when complete
  useEffect(() => {
    if (state.isComplete) {
      recordQuizResult(sectionId, state.passed, state.score)
      onComplete?.(state.passed, state.score)
    }
  }, [state.isComplete, state.passed, state.score, sectionId, recordQuizResult, onComplete])

  // Loading state
  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 flex items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  // No questions available
  if (state.questions.length === 0) {
    return null
  }

  // Calculate correct count for results
  const correctCount = state.questions.filter(
    (q) => state.answers.get(q.id) === q.correctAnswer
  ).length

  // Show results if complete
  if (state.isComplete) {
    return (
      <KnowledgeCheckResults
        score={state.score}
        passed={state.passed}
        totalQuestions={state.questions.length}
        correctCount={correctCount}
        onRetry={handleRetry}
      />
    )
  }

  // Show intro if not started
  if (!hasStarted) {
    return (
      <KnowledgeCheckIntro
        questionCount={state.questions.length}
        onStart={() => setHasStarted(true)}
      />
    )
  }

  // Show current question
  if (currentQuestion) {
    return (
      <KnowledgeCheckQuestion
        question={currentQuestion}
        questionNumber={state.currentIndex + 1}
        totalQuestions={state.questions.length}
        selectedAnswer={selectedAnswer}
        isRevealed={isRevealed}
        onSelectAnswer={handleSelectAnswer}
        onNext={handleNext}
      />
    )
  }

  return null
}

'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Flag, Send, AlertTriangle, Loader2 } from 'lucide-react'
import { ExamTimer } from '@/components/features/exam/exam-timer'
import { ExamProgress } from '@/components/features/exam/exam-progress'
import { QuestionNavigator } from '@/components/features/exam/question-navigator'
import { FigureDisplay } from '@/components/features/practice/figure-display'
import { useExamSession } from '@/hooks/use-exam-session'
import { useStudyStore } from '@/stores/study-store'
import { cn } from '@/lib/utils'

const ANSWER_LABELS = ['A', 'B', 'C', 'D'] as const

interface ConfirmDialogProps {
  isOpen: boolean
  unansweredCount: number
  onConfirm: () => void
  onCancel: () => void
}

function ConfirmSubmitDialog({ isOpen, unansweredCount, onConfirm, onCancel }: ConfirmDialogProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 safe-area-inset">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" onClick={onCancel} />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md bg-background rounded-lg border shadow-lg p-5 sm:p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0 size-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
            <AlertTriangle className="size-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Submit Exam?</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {unansweredCount > 0 ? (
                <>
                  You have <span className="font-semibold text-amber-600">{unansweredCount}</span>{' '}
                  unanswered question{unansweredCount !== 1 ? 's' : ''}. Unanswered questions will
                  be marked incorrect.
                </>
              ) : (
                'You have answered all questions. Ready to submit?'
              )}
            </p>
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onCancel}>
            Continue Exam
          </Button>
          <Button onClick={onConfirm}>Submit Exam</Button>
        </div>
      </div>
    </div>
  )
}

export default function ExamSessionPage() {
  const router = useRouter()
  const { currentExamLevel } = useStudyStore()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const {
    exam,
    currentIndex,
    currentQuestion,
    answeredIndices,
    flaggedQuestions,
    isComplete,
    isLoading,
    error,
    result,
    savedExamId,
    timeRemaining,
    selectedAnswer,
    selectAnswer,
    toggleFlag,
    goToQuestion,
    nextQuestion,
    prevQuestion,
    submitExam,
  } = useExamSession(currentExamLevel)

  // Warn before leaving page during exam
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!isComplete && exam) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isComplete, exam])

  // Redirect to results when exam is complete
  useEffect(() => {
    if (isComplete && result) {
      // Use savedExamId if available, otherwise use URL exam ID
      const resultUrl = savedExamId
        ? `/exam/${savedExamId}/review`
        : `/exam/${window.location.pathname.split('/')[2]}/review`

      // Small delay to ensure state is saved
      const timer = setTimeout(() => {
        router.push(resultUrl)
      }, 100)

      return () => clearTimeout(timer)
    }
  }, [isComplete, result, savedExamId, router])

  const handleTimeUp = useCallback(() => {
    submitExam()
  }, [submitExam])

  const handleSubmitClick = () => {
    setShowConfirmDialog(true)
  }

  const handleConfirmSubmit = () => {
    setShowConfirmDialog(false)
    submitExam()
  }

  const handleCancelSubmit = () => {
    setShowConfirmDialog(false)
  }

  const handleAnswerClick = (answerIndex: number) => {
    selectAnswer(answerIndex)
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-3xl px-3 py-4 sm:px-4 sm:py-6">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="size-8 animate-spin text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Generating exam...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !exam || !currentQuestion) {
    return (
      <div className="container mx-auto max-w-3xl px-3 py-4 sm:px-4 sm:py-6">
        <Card className="border-destructive">
          <CardContent className="py-8 text-center">
            <AlertTriangle className="size-12 text-destructive mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Failed to Load Exam</h2>
            <p className="text-muted-foreground mb-4">
              {error || 'Unable to generate exam questions'}
            </p>
            <Button onClick={() => router.push('/exam')}>Back to Exam Home</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const unansweredCount = exam.questions.length - answeredIndices.size
  const isFlagged = flaggedQuestions.has(currentIndex)
  const isFirstQuestion = currentIndex === 0
  const isLastQuestion = currentIndex === exam.questions.length - 1

  return (
    <div className="container mx-auto max-w-3xl py-4 px-4">
      {/* Top bar: Timer and Progress */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <ExamTimer timeRemaining={timeRemaining} onTimeUp={handleTimeUp} />
        <div className="flex-1 max-w-md">
          <ExamProgress
            current={currentIndex + 1}
            total={exam.questions.length}
            answered={answeredIndices.size}
          />
        </div>
      </div>

      {/* Question Card (Exam Mode - no immediate feedback) */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <CardTitle className="text-lg sm:text-xl">
              Question {currentIndex + 1} of {exam.questions.length}
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                {currentQuestion.id}
              </span>
              <Button
                variant={isFlagged ? 'default' : 'outline'}
                size="sm"
                onClick={toggleFlag}
                className={cn(isFlagged && 'bg-orange-500 hover:bg-orange-600 text-white')}
              >
                <Flag
                  className={cn('size-4 mr-1', isFlagged && 'fill-current')}
                  aria-hidden="true"
                />
                {isFlagged ? 'Flagged' : 'Flag'}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Question text */}
          <p className="text-base sm:text-lg font-medium leading-relaxed">
            {currentQuestion.question}
          </p>

          {/* Figure display if applicable */}
          {currentQuestion.figure && <FigureDisplay figure={currentQuestion.figure} />}

          {/* Answer buttons (exam mode - no feedback) */}
          <div className="space-y-3" role="group" aria-label="Answer options">
            {currentQuestion.answers.map((answer, index) => {
              const isSelected = selectedAnswer === index

              return (
                <button
                  key={`${currentQuestion.id}-${index}`}
                  type="button"
                  onClick={() => handleAnswerClick(index)}
                  aria-pressed={isSelected}
                  aria-label={`Answer ${ANSWER_LABELS[index]}: ${answer}`}
                  className={cn(
                    'w-full flex items-start gap-3 p-4 rounded-lg border-2 text-left transition-all',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                    isSelected
                      ? 'border-primary bg-primary/10 text-foreground ring-2 ring-primary'
                      : 'border-border bg-background hover:bg-accent hover:border-accent-foreground/20'
                  )}
                >
                  <span
                    className={cn(
                      'flex items-center justify-center size-8 rounded-full text-sm font-semibold shrink-0',
                      'border-2 transition-colors',
                      isSelected
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted-foreground/30 bg-muted text-muted-foreground'
                    )}
                  >
                    {ANSWER_LABELS[index]}
                  </span>
                  <span className="flex-1 pt-1">{answer}</span>
                </button>
              )
            })}
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-4">
            <Button variant="outline" onClick={prevQuestion} disabled={isFirstQuestion}>
              <ChevronLeft className="size-4 mr-1" aria-hidden="true" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {isLastQuestion ? (
                <Button onClick={handleSubmitClick}>
                  <Send className="size-4 mr-1" aria-hidden="true" />
                  Submit Exam
                </Button>
              ) : (
                <Button onClick={nextQuestion}>
                  Next
                  <ChevronRight className="size-4 ml-1" aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Question Navigator */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Question Navigator</CardTitle>
        </CardHeader>
        <CardContent>
          <QuestionNavigator
            totalQuestions={exam.questions.length}
            currentQuestion={currentIndex}
            answeredQuestions={answeredIndices}
            flaggedQuestions={flaggedQuestions}
            onNavigate={goToQuestion}
          />

          {/* Submit button at bottom */}
          <div className="mt-6 pt-4 border-t">
            <Button className="w-full" size="lg" onClick={handleSubmitClick}>
              <Send className="size-4 mr-2" aria-hidden="true" />
              Submit Exam ({answeredIndices.size}/{exam.questions.length} answered)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Confirm Submit Dialog */}
      <ConfirmSubmitDialog
        isOpen={showConfirmDialog}
        unansweredCount={unansweredCount}
        onConfirm={handleConfirmSubmit}
        onCancel={handleCancelSubmit}
      />
    </div>
  )
}

'use client'

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Confetti } from '@/components/ui/confetti'
import { Trophy, XCircle, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ExamResultsCardProps {
  score: number
  correctCount: number
  totalQuestions: number
  passed: boolean
  passingScore: number
  timeTaken?: number
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  if (mins === 0) {
    return `${secs} second${secs !== 1 ? 's' : ''}`
  }
  return `${mins} minute${mins !== 1 ? 's' : ''} ${secs} second${secs !== 1 ? 's' : ''}`
}

function getPassedMessage(score: number): string {
  if (score === 100) {
    return 'Perfect score! Outstanding work!'
  }
  if (score >= 90) {
    return 'Excellent performance! You really know your stuff!'
  }
  if (score >= 80) {
    return 'Great job! You passed with flying colors!'
  }
  return 'Congratulations! You passed the exam!'
}

function getFailedMessage(score: number, passingScore: number): string {
  const needed = passingScore - Math.floor((score / 100) * 35)
  if (score >= 60) {
    return `So close! You need just ${needed} more correct answer${needed !== 1 ? 's' : ''} to pass. Keep practicing!`
  }
  if (score >= 40) {
    return "Good effort! Review the weak areas shown below and try again. You've got this!"
  }
  return "Don't give up! Focus on studying the areas where you struggled, and you'll improve quickly."
}

export function ExamResultsCard({
  score,
  correctCount,
  totalQuestions,
  passed,
  passingScore,
  timeTaken,
}: ExamResultsCardProps) {
  const incorrectCount = totalQuestions - correctCount
  const roundedScore = Math.round(score)

  return (
    <>
      <Confetti active={passed} />
      <Card
        className={cn('w-full max-w-md mx-auto overflow-hidden', {
          'border-green-500 dark:border-green-600': passed,
          'border-red-500 dark:border-red-600': !passed,
        })}
      >
        {/* Header with pass/fail indicator */}
        <div
          className={cn('py-6 text-center', {
            'bg-green-50 dark:bg-green-950/30': passed,
            'bg-red-50 dark:bg-red-950/30': !passed,
          })}
        >
          {passed ? (
            <Trophy
              className="mx-auto size-16 text-green-600 dark:text-green-500"
              aria-hidden="true"
            />
          ) : (
            <XCircle
              className="mx-auto size-16 text-red-600 dark:text-red-500"
              aria-hidden="true"
            />
          )}
          <h2
            className={cn('mt-3 text-2xl font-bold', {
              'text-green-800 dark:text-green-400': passed,
              'text-red-800 dark:text-red-400': !passed,
            })}
          >
            {passed ? 'PASSED!' : 'Not Quite Yet'}
          </h2>
        </div>

        <CardHeader className="text-center pb-2">
          <CardTitle className="text-5xl font-bold tabular-nums">{roundedScore}%</CardTitle>
          <CardDescription className="text-base">
            {passed ? getPassedMessage(roundedScore) : getFailedMessage(roundedScore, passingScore)}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Score breakdown */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3 rounded-lg bg-green-50 dark:bg-green-950/20 p-3">
              <CheckCircle
                className="size-5 text-green-600 dark:text-green-500"
                aria-hidden="true"
              />
              <div>
                <div className="text-lg font-semibold text-green-800 dark:text-green-400">
                  {correctCount}
                </div>
                <div className="text-xs text-green-700 dark:text-green-500">Correct</div>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-lg bg-red-50 dark:bg-red-950/20 p-3">
              <XCircle className="size-5 text-red-600 dark:text-red-500" aria-hidden="true" />
              <div>
                <div className="text-lg font-semibold text-red-800 dark:text-red-400">
                  {incorrectCount}
                </div>
                <div className="text-xs text-red-700 dark:text-red-500">Incorrect</div>
              </div>
            </div>
          </div>

          {/* Passing requirement info */}
          <div className="rounded-lg bg-muted p-3 text-center text-sm">
            <span className="text-muted-foreground">Passing requires </span>
            <span className="font-medium">
              {passingScore}/{totalQuestions}
            </span>
            <span className="text-muted-foreground"> correct answers</span>
          </div>

          {/* Time taken */}
          {timeTaken !== undefined && (
            <div className="text-center text-sm text-muted-foreground">
              Time taken: <span className="font-medium">{formatTime(timeTaken)}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

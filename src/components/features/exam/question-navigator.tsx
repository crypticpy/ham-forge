'use client'

import { Flag } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuestionNavigatorProps {
  totalQuestions: number
  currentQuestion: number
  answeredQuestions: Set<number>
  flaggedQuestions?: Set<number>
  onNavigate: (questionIndex: number) => void
}

export function QuestionNavigator({
  totalQuestions,
  currentQuestion,
  answeredQuestions,
  flaggedQuestions,
  onNavigate,
}: QuestionNavigatorProps) {
  const questions = Array.from({ length: totalQuestions }, (_, i) => i)

  return (
    <nav aria-label="Question navigation" className="w-full">
      {/* Desktop: Grid layout */}
      <div className="hidden sm:grid grid-cols-7 gap-2">
        {questions.map((index) => {
          const isCurrent = index === currentQuestion
          const isAnswered = answeredQuestions.has(index)
          const isFlagged = flaggedQuestions?.has(index)

          return (
            <button
              key={index}
              onClick={() => onNavigate(index)}
              aria-label={`Question ${index + 1}${isAnswered ? ', answered' : ''}${isFlagged ? ', flagged for review' : ''}${isCurrent ? ', current' : ''}`}
              aria-current={isCurrent ? 'step' : undefined}
              className={cn(
                'relative flex items-center justify-center rounded-md h-10 w-full text-sm font-medium transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                {
                  // Current question
                  'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2': isCurrent,
                  // Answered but not current
                  'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50':
                    isAnswered && !isCurrent,
                  // Not answered, not current
                  'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground':
                    !isAnswered && !isCurrent,
                }
              )}
            >
              {index + 1}
              {isFlagged && (
                <Flag
                  className="absolute -top-1 -right-1 size-3 text-orange-500 fill-orange-500"
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>

      {/* Mobile: Horizontal scrollable row */}
      <div className="sm:hidden overflow-x-auto pb-2 -mx-2 px-2">
        <div className="flex gap-2 min-w-max">
          {questions.map((index) => {
            const isCurrent = index === currentQuestion
            const isAnswered = answeredQuestions.has(index)
            const isFlagged = flaggedQuestions?.has(index)

            return (
              <button
                key={index}
                onClick={() => onNavigate(index)}
                aria-label={`Question ${index + 1}${isAnswered ? ', answered' : ''}${isFlagged ? ', flagged for review' : ''}${isCurrent ? ', current' : ''}`}
                aria-current={isCurrent ? 'step' : undefined}
                className={cn(
                  'relative flex items-center justify-center rounded-md h-9 w-9 text-sm font-medium transition-all shrink-0',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  {
                    // Current question
                    'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-1':
                      isCurrent,
                    // Answered but not current
                    'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400':
                      isAnswered && !isCurrent,
                    // Not answered, not current
                    'bg-muted text-muted-foreground': !isAnswered && !isCurrent,
                  }
                )}
              >
                {index + 1}
                {isFlagged && (
                  <Flag
                    className="absolute -top-1 -right-1 size-3 text-orange-500 fill-orange-500"
                    aria-hidden="true"
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded bg-primary" aria-hidden="true" />
          <span>Current</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded bg-green-100 dark:bg-green-900/30" aria-hidden="true" />
          <span>Answered</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="size-3 rounded bg-muted" aria-hidden="true" />
          <span>Unanswered</span>
        </div>
        {flaggedQuestions && flaggedQuestions.size > 0 && (
          <div className="flex items-center gap-1.5">
            <Flag className="size-3 text-orange-500 fill-orange-500" aria-hidden="true" />
            <span>Flagged</span>
          </div>
        )}
      </div>
    </nav>
  )
}

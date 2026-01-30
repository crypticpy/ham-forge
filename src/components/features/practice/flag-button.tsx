'use client'

import { Flag } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useProgressStore } from '@/stores/progress-store'

interface FlagButtonProps {
  questionId: string
  className?: string
}

export function FlagButton({ questionId, className }: FlagButtonProps) {
  const toggleFlagQuestion = useProgressStore((state) => state.toggleFlagQuestion)
  const isFlagged = useProgressStore((state) => state.isFlagged(questionId))

  const handleClick = () => {
    toggleFlagQuestion(questionId)
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={isFlagged ? 'Remove flag from question' : 'Flag question for later review'}
      aria-pressed={isFlagged}
      className={cn(
        'inline-flex items-center justify-center rounded-md p-2 transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'hover:bg-accent',
        isFlagged &&
          'text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300',
        !isFlagged && 'text-muted-foreground hover:text-foreground',
        className
      )}
    >
      <Flag className={cn('size-5', isFlagged && 'fill-current')} aria-hidden="true" />
    </button>
  )
}

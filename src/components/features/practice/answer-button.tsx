'use client'

import { cn } from '@/lib/utils'
import { Check, X } from 'lucide-react'

interface AnswerButtonProps {
  label: string // A, B, C, D
  text: string // Answer text
  isSelected: boolean
  isCorrect?: boolean // undefined = not revealed yet
  isRevealed: boolean // Whether answer has been revealed
  disabled: boolean
  onClick: () => void
}

export function AnswerButton({
  label,
  text,
  isSelected,
  isCorrect,
  isRevealed,
  disabled,
  onClick,
}: AnswerButtonProps) {
  // Determine styling based on state
  const getVariantStyles = () => {
    if (!isRevealed) {
      // Before reveal
      if (isSelected) {
        return 'border-primary bg-primary/10 text-foreground ring-2 ring-primary'
      }
      return 'border-border bg-background hover:bg-accent hover:border-accent-foreground/20'
    }

    // After reveal
    if (isCorrect) {
      // This is the correct answer - always show green
      return 'border-green-500 bg-green-500/10 text-green-700 dark:text-green-400'
    }

    if (isSelected && !isCorrect) {
      // User selected this but it's wrong - show red
      return 'border-red-500 bg-red-500/10 text-red-700 dark:text-red-400'
    }

    // Not selected and not correct - dim it
    return 'border-border bg-muted/50 text-muted-foreground opacity-60'
  }

  const renderIcon = () => {
    if (!isRevealed) return null

    if (isCorrect) {
      return (
        <Check className="size-5 text-green-600 dark:text-green-400 shrink-0" aria-hidden="true" />
      )
    }

    if (isSelected && !isCorrect) {
      return <X className="size-5 text-red-600 dark:text-red-400 shrink-0" aria-hidden="true" />
    }

    return null
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={isSelected}
      aria-label={`Answer ${label}: ${text}${isRevealed && isCorrect ? ' (Correct answer)' : ''}`}
      className={cn(
        'w-full flex items-start gap-3 p-4 rounded-lg border-2 text-left transition-all',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        'disabled:cursor-not-allowed',
        getVariantStyles()
      )}
    >
      <span
        className={cn(
          'flex items-center justify-center size-8 rounded-full text-sm font-semibold shrink-0',
          'border-2 transition-colors',
          isSelected && !isRevealed && 'border-primary bg-primary text-primary-foreground',
          !isSelected && !isRevealed && 'border-muted-foreground/30 bg-muted text-muted-foreground',
          isRevealed && isCorrect && 'border-green-500 bg-green-500 text-white',
          isRevealed && isSelected && !isCorrect && 'border-red-500 bg-red-500 text-white',
          isRevealed &&
            !isCorrect &&
            !isSelected &&
            'border-muted-foreground/30 bg-muted text-muted-foreground'
        )}
      >
        {label}
      </span>
      <span className="flex-1 pt-1">{text}</span>
      {renderIcon()}
    </button>
  )
}

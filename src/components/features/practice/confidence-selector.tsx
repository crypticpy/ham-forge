'use client'

import { cn } from '@/lib/utils'

interface ConfidenceSelectorProps {
  onSelect: (confidence: number) => void
  selectedConfidence?: number
  className?: string
}

const CONFIDENCE_LEVELS = [
  {
    value: 1,
    label: 'Guessed',
    shortLabel: '1',
    color: 'bg-red-500',
    hoverColor: 'hover:bg-red-400',
    ringColor: 'ring-red-500',
  },
  {
    value: 2,
    label: 'Unsure',
    shortLabel: '2',
    color: 'bg-orange-500',
    hoverColor: 'hover:bg-orange-400',
    ringColor: 'ring-orange-500',
  },
  {
    value: 3,
    label: 'Okay',
    shortLabel: '3',
    color: 'bg-yellow-500',
    hoverColor: 'hover:bg-yellow-400',
    ringColor: 'ring-yellow-500',
  },
  {
    value: 4,
    label: 'Confident',
    shortLabel: '4',
    color: 'bg-lime-500',
    hoverColor: 'hover:bg-lime-400',
    ringColor: 'ring-lime-500',
  },
  {
    value: 5,
    label: 'Knew It',
    shortLabel: '5',
    color: 'bg-green-500',
    hoverColor: 'hover:bg-green-400',
    ringColor: 'ring-green-500',
  },
] as const

/**
 * ConfidenceSelector allows users to rate their confidence (1-5) after answering a question.
 * This confidence rating is factored into the spaced repetition algorithm.
 *
 * - 1 (Guessed): Pure luck, no real knowledge
 * - 2 (Unsure): Had doubts, might have guessed
 * - 3 (Okay): Neutral, some knowledge
 * - 4 (Confident): Fairly sure of the answer
 * - 5 (Knew It): Immediately knew the answer
 */
export function ConfidenceSelector({
  onSelect,
  selectedConfidence,
  className,
}: ConfidenceSelectorProps) {
  return (
    <div className={cn('w-full', className)}>
      <p className="text-sm text-muted-foreground mb-2 text-center">How confident were you?</p>
      <div
        className="flex justify-center gap-1.5 sm:gap-2"
        role="group"
        aria-label="Confidence rating"
      >
        {CONFIDENCE_LEVELS.map((level) => {
          const isSelected = selectedConfidence === level.value
          return (
            <button
              key={level.value}
              type="button"
              onClick={() => onSelect(level.value)}
              aria-pressed={isSelected}
              aria-label={`${level.label} (${level.value} out of 5)`}
              title={level.label}
              className={cn(
                'flex flex-col items-center justify-center',
                'min-w-[48px] sm:min-w-[56px] h-12 sm:h-14',
                'rounded-lg border-2 transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                isSelected
                  ? cn(
                      level.color,
                      'text-white border-transparent',
                      `ring-2 ring-offset-2 ${level.ringColor}`
                    )
                  : cn(
                      'bg-muted/50 border-border text-muted-foreground',
                      level.hoverColor,
                      'hover:text-white hover:border-transparent'
                    )
              )}
            >
              <span className="text-xs font-medium leading-tight hidden sm:block">
                {level.label}
              </span>
              <span className="text-sm font-bold sm:text-xs sm:font-medium">
                {level.shortLabel}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

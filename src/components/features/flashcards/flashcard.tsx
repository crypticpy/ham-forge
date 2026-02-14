'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import { Check, X, RotateCcw, Lightbulb, BookOpen } from 'lucide-react'

interface FlashcardProps {
  front: React.ReactNode
  back: React.ReactNode
  onResult: (passed: boolean, timeMs: number) => void
  category?: string
  showSwipeHints?: boolean
}

export function Flashcard({
  front,
  back,
  onResult,
  category,
  showSwipeHints = true,
}: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const startTimeRef = useRef(0)
  const cardRef = useRef<HTMLDivElement>(null)

  // Motion values for swipe
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-15, 15])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5])

  // Swipe indicators
  const leftIndicatorOpacity = useTransform(x, [-150, -50, 0], [1, 0.5, 0])
  const rightIndicatorOpacity = useTransform(x, [0, 50, 150], [0, 0.5, 1])

  // Initialize and reset start time when card changes
  useEffect(() => {
    startTimeRef.current = Date.now()
    setIsFlipped(false)
  }, [front])

  const handleFlip = useCallback(() => {
    if (!isDragging) {
      setIsFlipped((prev) => !prev)
    }
  }, [isDragging])

  const handleResult = useCallback(
    (passed: boolean) => {
      const timeMs = Date.now() - startTimeRef.current
      onResult(passed, timeMs)
    },
    [onResult]
  )

  const handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setIsDragging(false)
      const threshold = 100

      if (Math.abs(info.offset.x) > threshold && isFlipped) {
        // Swiped past threshold
        handleResult(info.offset.x > 0)
      }
    },
    [isFlipped, handleResult]
  )

  const handleDragStart = useCallback(() => {
    setIsDragging(true)
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        handleFlip()
      } else if (isFlipped) {
        if (e.key === 'ArrowLeft' || e.key === '1') {
          e.preventDefault()
          handleResult(false)
        } else if (e.key === 'ArrowRight' || e.key === '2') {
          e.preventDefault()
          handleResult(true)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isFlipped, handleFlip, handleResult])

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Swipe indicators */}
      {isFlipped && showSwipeHints && (
        <>
          <motion.div
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10"
            style={{ opacity: leftIndicatorOpacity }}
          >
            <div className="flex items-center justify-center size-12 rounded-full bg-red-500/20 border border-red-500/40">
              <X className="size-6 text-red-500" />
            </div>
          </motion.div>
          <motion.div
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10"
            style={{ opacity: rightIndicatorOpacity }}
          >
            <div className="flex items-center justify-center size-12 rounded-full bg-emerald-500/20 border border-emerald-500/40">
              <Check className="size-6 text-emerald-500" />
            </div>
          </motion.div>
        </>
      )}

      {/* Card */}
      <motion.div
        ref={cardRef}
        className="relative aspect-[3/4] cursor-pointer touch-manipulation"
        style={{ x, rotate, opacity }}
        drag={isFlipped ? 'x' : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.7}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.98 }}
        onClick={handleFlip}
        role="button"
        aria-label={
          isFlipped ? 'Card back. Swipe or use arrow keys to respond.' : 'Tap to flip card'
        }
        tabIndex={0}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!isFlipped ? (
            <motion.div
              key="front"
              className={cn(
                'absolute inset-0 rounded-2xl p-6',
                'bg-gradient-to-br from-card to-card/80',
                'border border-border/50 shadow-xl',
                'flex flex-col',
                'backface-hidden'
              )}
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -180, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {/* Category badge */}
              {category && (
                <div className="absolute top-4 left-4">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-primary/10 text-primary">
                    {category}
                  </span>
                </div>
              )}

              {/* Flip hint */}
              <div className="absolute top-4 right-4">
                <RotateCcw className="size-4 text-muted-foreground/50" />
              </div>

              {/* Front content */}
              <div className="flex-1 flex items-center justify-center text-center">{front}</div>

              {/* Tap hint */}
              <div className="text-center text-xs text-muted-foreground">Tap to flip</div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              className={cn(
                'absolute inset-0 rounded-2xl p-6',
                'bg-gradient-to-br from-card via-card to-primary/5',
                'border border-primary/20 shadow-xl',
                'flex flex-col',
                'backface-hidden'
              )}
              initial={{ rotateY: -180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 180, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {/* Back content */}
              <div className="flex-1 overflow-y-auto">{back}</div>

              {/* Action buttons */}
              <div className="flex items-center justify-center gap-6 pt-4 border-t border-border/50">
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleResult(false)
                  }}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full',
                    'min-h-[44px] touch-manipulation',
                    'bg-red-500/10 text-red-500 border border-red-500/30',
                    'hover:bg-red-500/20 transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500'
                  )}
                  aria-label="I don't know this"
                >
                  <X className="size-4" />
                  <span className="text-sm font-medium">Nope</span>
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleResult(true)
                  }}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full',
                    'min-h-[44px] touch-manipulation',
                    'bg-emerald-500/10 text-emerald-500 border border-emerald-500/30',
                    'hover:bg-emerald-500/20 transition-colors',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500'
                  )}
                  aria-label="I got this right"
                >
                  <Check className="size-4" />
                  <span className="text-sm font-medium">Got it</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Keyboard hints */}
      <div className="hidden sm:flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
        <span>
          <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">Space</kbd> flip
        </span>
        {isFlipped && (
          <>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">←</kbd> nope
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">→</kbd> got it
            </span>
          </>
        )}
      </div>
    </div>
  )
}

// Learning card content component
export function LearningCardContent({ title, prompt }: { title: string; prompt: string }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center size-12 mx-auto rounded-full bg-primary/10">
        <Lightbulb className="size-6 text-primary" />
      </div>
      <h3 className="text-xl font-bold text-center">{title}</h3>
      <p className="text-muted-foreground text-center text-lg">{prompt}</p>
    </div>
  )
}

export function LearningCardBack({
  explanation,
  keyFact,
  examTip,
  mnemonic,
}: {
  explanation: string
  keyFact: string
  examTip?: string
  mnemonic?: string
}) {
  return (
    <div className="space-y-4">
      <p className="text-foreground">{explanation}</p>

      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
        <div className="flex items-start gap-2">
          <BookOpen className="size-4 text-primary mt-0.5 shrink-0" />
          <div>
            <span className="text-xs font-medium text-primary uppercase tracking-wide">
              Key Fact
            </span>
            <p className="text-sm font-medium mt-0.5">{keyFact}</p>
          </div>
        </div>
      </div>

      {mnemonic && (
        <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
          <span className="text-xs font-medium text-purple-500 uppercase tracking-wide">
            Memory Aid
          </span>
          <p className="text-sm mt-0.5">{mnemonic}</p>
        </div>
      )}

      {examTip && (
        <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
          <span className="text-xs font-medium text-amber-500 uppercase tracking-wide">
            Exam Tip
          </span>
          <p className="text-sm mt-0.5">{examTip}</p>
        </div>
      )}
    </div>
  )
}

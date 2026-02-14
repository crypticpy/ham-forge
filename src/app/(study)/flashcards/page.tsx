'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Brain,
  Clock,
  Sparkles,
  BookOpen,
  Radio,
  Cpu,
  ShieldAlert,
  ChevronRight,
  Flame,
  Target,
  TrendingUp,
  Layers,
  Play,
  BarChart3,
} from 'lucide-react'
import { useStudyStore } from '@/stores/study-store'
import { useFlashcardStore } from '@/stores/flashcard-store'
import { useHydration } from '@/hooks/use-hydration'
import { flashcardDecks } from '@/data/flashcards'
import { getRecommendedMode } from '@/lib/flashcard-algorithm'
import { cn } from '@/lib/utils'
import type { FlashcardDeck } from '@/types/flashcard'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Brain,
  Clock,
  Sparkles,
  BookOpen,
  Radio,
  Cpu,
  ShieldAlert,
}

const colorMap: Record<string, { bg: string; text: string; border: string }> = {
  purple: {
    bg: 'bg-purple-500/10 dark:bg-purple-500/20',
    text: 'text-purple-500 dark:text-purple-400',
    border: 'hover:border-purple-500/50',
  },
  amber: {
    bg: 'bg-amber-500/10 dark:bg-amber-500/20',
    text: 'text-amber-500 dark:text-amber-400',
    border: 'hover:border-amber-500/50',
  },
  blue: {
    bg: 'bg-blue-500/10 dark:bg-blue-500/20',
    text: 'text-blue-500 dark:text-blue-400',
    border: 'hover:border-blue-500/50',
  },
  emerald: {
    bg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
    text: 'text-emerald-500 dark:text-emerald-400',
    border: 'hover:border-emerald-500/50',
  },
  cyan: {
    bg: 'bg-cyan-500/10 dark:bg-cyan-500/20',
    text: 'text-cyan-500 dark:text-cyan-400',
    border: 'hover:border-cyan-500/50',
  },
  orange: {
    bg: 'bg-orange-500/10 dark:bg-orange-500/20',
    text: 'text-orange-500 dark:text-orange-400',
    border: 'hover:border-orange-500/50',
  },
  red: {
    bg: 'bg-red-500/10 dark:bg-red-500/20',
    text: 'text-red-500 dark:text-red-400',
    border: 'hover:border-red-500/50',
  },
}

export default function FlashcardsPage() {
  const router = useRouter()
  const { currentExamLevel } = useStudyStore()
  const { getAllCategoryProgress, currentStreak, totalCardsStudied, lastSessionDate } =
    useFlashcardStore()
  const isHydrated = useHydration()

  // Get recommendation - memoized to avoid calling during each render
  const recommendation = useMemo(() => {
    if (!isHydrated) return null
    const categoryProgress = getAllCategoryProgress()
    return getRecommendedMode(categoryProgress, lastSessionDate)
  }, [isHydrated, getAllCategoryProgress, lastSessionDate])

  const handleStartSession = (deck: FlashcardDeck) => {
    // Store session config
    sessionStorage.setItem(
      'flashcardConfig',
      JSON.stringify({
        deckId: deck.id,
        mode: deck.mode,
        focusCategories: deck.focusCategories,
        examLevel: currentExamLevel,
        learningCardCount: 10,
        questionCardCount: 10,
      })
    )
    router.push('/flashcards/session')
  }

  const examLabel =
    currentExamLevel === 'technician' ? 'Technician' : currentExamLevel === 'general' ? 'General' : 'Extra'

  // Split decks into main and focus categories
  const mainDecks = flashcardDecks.filter((d) => !d.id.startsWith('focus-'))
  const focusDecks = flashcardDecks.filter((d) => d.id.startsWith('focus-'))

  return (
    <main className="min-h-[100dvh]" role="main" aria-labelledby="flashcards-title">
      {/* Skip link */}
      <a
        href="#decks-section"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4"
      >
        Skip to deck selection
      </a>

      {/* Hero Header */}
      <header className="border-b bg-gradient-to-b from-purple-500/5 to-background">
        <div className="container mx-auto max-w-4xl px-3 py-6 sm:px-4 sm:py-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center size-10 rounded-xl bg-purple-500/10">
                  <Layers className="size-5 text-purple-500" />
                </div>
                <h1 id="flashcards-title" className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Flashcards
                </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Adaptive learning for the{' '}
                <span className="font-semibold text-foreground">{examLabel}</span> exam
              </p>
            </div>

            {/* Streak indicator */}
            {currentStreak > 0 && (
              <div
                className="flex items-center gap-3 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 px-4 py-2"
                role="status"
                aria-label={`Study streak: ${currentStreak} days`}
              >
                <Flame className="size-5 text-amber-500" aria-hidden="true" />
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-amber-600 dark:text-amber-400">
                    {currentStreak} Day Streak
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {totalCardsStudied} cards studied
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-6">
        {/* Recommendation card */}
        {recommendation && (
          <motion.section
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            aria-labelledby="recommendation-title"
          >
            <Card className="border-primary/30 bg-gradient-to-r from-primary/5 to-primary/10 overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-1 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="size-4 text-primary" />
                      <h2
                        id="recommendation-title"
                        className="text-sm font-semibold text-primary uppercase tracking-wide"
                      >
                        Recommended
                      </h2>
                    </div>
                    <h3 className="text-xl font-bold mb-1">
                      {flashcardDecks.find((d) => d.mode === recommendation.mode)?.name ||
                        'Smart Study'}
                    </h3>
                    <p className="text-muted-foreground">{recommendation.reason}</p>
                  </div>
                  <div className="flex items-center justify-center p-6 sm:border-l border-t sm:border-t-0 border-border/50">
                    <Button
                      size="lg"
                      className="gap-2"
                      onClick={() =>
                        handleStartSession(
                          flashcardDecks.find((d) => d.mode === recommendation.mode) ||
                            flashcardDecks[0]
                        )
                      }
                    >
                      <Play className="size-4" />
                      Start Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        )}

        {/* Main Decks */}
        <section id="decks-section" className="mb-8" aria-labelledby="main-decks-title">
          <h2 id="main-decks-title" className="text-lg font-semibold mb-4">
            Study Modes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {mainDecks.map((deck, index) => (
              <DeckCard
                key={deck.id}
                deck={deck}
                index={index}
                onStart={() => handleStartSession(deck)}
              />
            ))}
          </div>
        </section>

        {/* Focus Decks */}
        <section className="mb-8" aria-labelledby="focus-decks-title">
          <h2 id="focus-decks-title" className="text-lg font-semibold mb-4">
            Focus by Topic
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {focusDecks.map((deck, index) => (
              <FocusDeckCard
                key={deck.id}
                deck={deck}
                index={index}
                onStart={() => handleStartSession(deck)}
              />
            ))}
          </div>
        </section>

        {/* Stats overview */}
        {totalCardsStudied > 0 && (
          <section aria-labelledby="stats-title">
            <div className="flex items-center justify-between mb-4">
              <h2 id="stats-title" className="text-lg font-semibold">
                Your Progress
              </h2>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/analytics">
                  View Details
                  <ChevronRight className="size-4 ml-1" />
                </Link>
              </Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-primary">
                      <Target className="size-5" />
                      {totalCardsStudied}
                    </div>
                    <span className="text-sm text-muted-foreground">Cards Studied</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-amber-500">
                      <Flame className="size-5" />
                      {currentStreak}
                    </div>
                    <span className="text-sm text-muted-foreground">Day Streak</span>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1 text-2xl font-bold text-emerald-500">
                      <BarChart3 className="size-5" />
                      {Math.round(
                        (getAllCategoryProgress().reduce((sum, p) => sum + p.recentAccuracy, 0) /
                          Math.max(getAllCategoryProgress().length, 1)) *
                          100
                      )}
                      %
                    </div>
                    <span className="text-sm text-muted-foreground">Avg Accuracy</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        )}
      </div>
    </main>
  )
}

function DeckCard({
  deck,
  index,
  onStart,
}: {
  deck: FlashcardDeck
  index: number
  onStart: () => void
}) {
  const Icon = iconMap[deck.icon] || Brain
  const colors = colorMap[deck.color] || colorMap.purple

  return (
    <motion.button
      onClick={onStart}
      className={cn(
        'group flex flex-col rounded-xl border bg-card p-5 text-left',
        'transition-all duration-200',
        'hover:shadow-lg hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'min-h-[160px] touch-manipulation',
        colors.border
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      aria-label={`${deck.name}: ${deck.description}. Estimated ${deck.estimatedMinutes} minutes.`}
    >
      <div className={cn('flex items-center justify-center size-12 rounded-xl mb-4', colors.bg)}>
        <Icon className={cn('size-6', colors.text)} />
      </div>
      <h3 className="font-semibold mb-1">{deck.name}</h3>
      <p className="text-sm text-muted-foreground flex-1">{deck.description}</p>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border/50">
        <span className="text-xs text-muted-foreground">~{deck.estimatedMinutes} min</span>
        <ChevronRight
          className={cn(
            'size-4 text-muted-foreground transition-transform group-hover:translate-x-1',
            colors.text.replace('text-', 'group-hover:text-')
          )}
        />
      </div>
    </motion.button>
  )
}

function FocusDeckCard({
  deck,
  index,
  onStart,
}: {
  deck: FlashcardDeck
  index: number
  onStart: () => void
}) {
  const Icon = iconMap[deck.icon] || BookOpen
  const colors = colorMap[deck.color] || colorMap.blue

  return (
    <motion.button
      onClick={onStart}
      className={cn(
        'group flex flex-col items-center rounded-xl border bg-card p-4 text-center',
        'transition-all duration-200',
        'hover:shadow-md hover:-translate-y-0.5',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        'min-h-[100px] touch-manipulation',
        colors.border
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.3 + index * 0.05 }}
      aria-label={`${deck.name}: ${deck.description}`}
    >
      <div className={cn('flex items-center justify-center size-10 rounded-lg mb-2', colors.bg)}>
        <Icon className={cn('size-5', colors.text)} />
      </div>
      <span className="text-sm font-medium">{deck.name}</span>
      <span className="text-xs text-muted-foreground mt-0.5">~{deck.estimatedMinutes} min</span>
    </motion.button>
  )
}

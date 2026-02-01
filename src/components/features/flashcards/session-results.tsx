'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
  Trophy,
  Target,
  Clock,
  TrendingUp,
  TrendingDown,
  RotateCcw,
  Home,
  Zap,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import type { SessionSummary } from '@/types/flashcard'
import { getSubelementDisplayName } from '@/data/flashcards'

interface SessionResultsProps {
  summary: SessionSummary
  onPlayAgain: () => void
}

export function SessionResults({ summary, onPlayAgain }: SessionResultsProps) {
  const overallAccuracy = Math.round(
    ((summary.learningAccuracy + summary.questionAccuracy) / 2) * 100
  )
  const timeMinutes = Math.floor(summary.timeSpentMs / 60000)
  const timeSeconds = Math.floor((summary.timeSpentMs % 60000) / 1000)

  // Performance level
  const level =
    overallAccuracy >= 90
      ? 'excellent'
      : overallAccuracy >= 75
        ? 'good'
        : overallAccuracy >= 60
          ? 'okay'
          : 'needs-work'

  const levelConfig = {
    excellent: {
      icon: Trophy,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      message: 'Outstanding!',
      description: "You're mastering this material.",
    },
    good: {
      icon: Zap,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      message: 'Great Job!',
      description: "You're on the right track.",
    },
    okay: {
      icon: Target,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      message: 'Keep Going!',
      description: 'Practice makes perfect.',
    },
    'needs-work': {
      icon: AlertTriangle,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      message: 'Keep Practicing',
      description: 'Focus on your weak areas.',
    },
  }

  const config = levelConfig[level]
  const LevelIcon = config.icon

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Main result card */}
      <Card className={cn('border-2', config.borderColor)}>
        <CardContent className="p-8">
          {/* Icon and message */}
          <div className="text-center mb-8">
            <motion.div
              className={cn(
                'inline-flex items-center justify-center size-20 rounded-full mb-4',
                config.bgColor
              )}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <LevelIcon className={cn('size-10', config.color)} />
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">{config.message}</h2>
            <p className="text-muted-foreground">{config.description}</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <StatBox
              label="Overall"
              value={`${overallAccuracy}%`}
              icon={<Target className="size-4" />}
              color={
                overallAccuracy >= 75
                  ? 'text-emerald-500'
                  : overallAccuracy >= 50
                    ? 'text-amber-500'
                    : 'text-red-500'
              }
            />
            <StatBox
              label="Learning"
              value={`${Math.round(summary.learningAccuracy * 100)}%`}
              icon={<CheckCircle className="size-4" />}
              color="text-blue-500"
            />
            <StatBox
              label="Questions"
              value={`${Math.round(summary.questionAccuracy * 100)}%`}
              icon={<CheckCircle className="size-4" />}
              color="text-purple-500"
            />
            <StatBox
              label="Time"
              value={`${timeMinutes}:${timeSeconds.toString().padStart(2, '0')}`}
              icon={<Clock className="size-4" />}
              color="text-muted-foreground"
            />
          </div>

          {/* Category breakdown */}
          {summary.categoryPerformance.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Performance by Topic
              </h3>
              <div className="space-y-2">
                {summary.categoryPerformance.map((cat, index) => (
                  <motion.div
                    key={cat.categoryId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <CategoryBar
                      categoryId={cat.categoryId}
                      correct={cat.correct}
                      total={cat.total}
                      accuracy={cat.accuracy}
                      isWeakest={cat.categoryId === summary.weakestCategory}
                      isStrongest={cat.categoryId === summary.strongestCategory}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Insights */}
      {(summary.weakestCategory || summary.improvement !== undefined) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {summary.weakestCategory && (
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center size-10 rounded-full bg-red-500/10">
                    <TrendingDown className="size-5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-500">Focus Area</h4>
                    <p className="text-sm text-muted-foreground">
                      {getSubelementDisplayName(summary.weakestCategory.slice(0, 2))}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Consider extra practice in this topic
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {summary.strongestCategory && (
            <Card className="border-emerald-500/20 bg-emerald-500/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="flex items-center justify-center size-10 rounded-full bg-emerald-500/10">
                    <TrendingUp className="size-5 text-emerald-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-emerald-500">Strong Area</h4>
                    <p className="text-sm text-muted-foreground">
                      {getSubelementDisplayName(summary.strongestCategory.slice(0, 2))}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      You&apos;re doing great here!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={onPlayAgain} size="lg" className="flex-1 gap-2">
          <RotateCcw className="size-4" />
          Study Again
        </Button>
        <Button variant="outline" size="lg" className="flex-1 gap-2" asChild>
          <Link href="/flashcards">
            <Home className="size-4" />
            Back to Decks
          </Link>
        </Button>
      </div>
    </motion.div>
  )
}

function StatBox({
  label,
  value,
  icon,
  color,
}: {
  label: string
  value: string
  icon: React.ReactNode
  color: string
}) {
  return (
    <div className="text-center p-3 rounded-lg bg-muted/50">
      <div className={cn('flex items-center justify-center gap-1 mb-1', color)}>
        {icon}
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <span className="text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

function CategoryBar({
  categoryId,
  correct,
  total,
  accuracy,
  isWeakest,
  isStrongest,
}: {
  categoryId: string
  correct: number
  total: number
  accuracy: number
  isWeakest: boolean
  isStrongest: boolean
}) {
  const percentage = Math.round(accuracy * 100)
  const subelement = categoryId.slice(0, 2)
  const groupLetter = categoryId.length > 2 ? categoryId.slice(2) : null
  const displayName = getSubelementDisplayName(subelement)

  return (
    <div className="flex items-center gap-3">
      {/* Category badge */}
      <div
        className={cn(
          'flex items-center justify-center size-8 rounded-lg text-xs font-bold shrink-0',
          isWeakest
            ? 'bg-red-500/20 text-red-500'
            : isStrongest
              ? 'bg-emerald-500/20 text-emerald-500'
              : 'bg-muted text-muted-foreground'
        )}
      >
        {subelement}
      </div>

      {/* Topic name and progress bar */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground truncate">
            {displayName}
            {groupLetter && <span className="opacity-60"> ({groupLetter})</span>}
          </span>
          <span className="text-xs text-muted-foreground ml-2">{percentage}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
          <motion.div
            className={cn(
              'h-full rounded-full',
              accuracy >= 0.75 ? 'bg-emerald-500' : accuracy >= 0.5 ? 'bg-amber-500' : 'bg-red-500'
            )}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
        </div>
      </div>

      {/* Stats */}
      <span className="text-sm text-muted-foreground whitespace-nowrap">
        {correct}/{total}
      </span>
    </div>
  )
}

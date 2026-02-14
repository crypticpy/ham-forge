'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Radio, Signal, Mic2, MessageSquare, Star, Snowflake, Shield } from 'lucide-react'
import { useFlashcardStore } from '@/stores/flashcard-store'
import { useHydration } from '@/hooks/use-hydration'
import type { SkillType, SkillMastery } from '@/types/flashcard'

// Level thresholds for skill mastery
const LEVEL_THRESHOLDS = {
  2: { attempts: 10, accuracy: 0.6 },
  3: { attempts: 25, accuracy: 0.75 },
  4: { attempts: 50, accuracy: 0.85 },
  5: { attempts: 100, accuracy: 0.9 },
} as const

// Skill configurations
const SKILL_CONFIG: Record<
  SkillType,
  {
    label: string
    icon: React.ReactNode
    href: string
    colorClass: string
    bgClass: string
  }
> = {
  phonetic: {
    label: 'Phonetic Alphabet',
    icon: <Radio className="size-5" />,
    href: '/learn/T2/T2C',
    colorClass: 'text-blue-600 dark:text-blue-400',
    bgClass: 'bg-blue-100 dark:bg-blue-950/50',
  },
  rst: {
    label: 'Signal Reports',
    icon: <Signal className="size-5" />,
    href: '/learn/T2/T2A',
    colorClass: 'text-amber-600 dark:text-amber-400',
    bgClass: 'bg-amber-100 dark:bg-amber-950/50',
  },
  qso: {
    label: 'QSO Procedures',
    icon: <Mic2 className="size-5" />,
    href: '/learn/T2/T2A',
    colorClass: 'text-rose-600 dark:text-rose-400',
    bgClass: 'bg-rose-100 dark:bg-rose-950/50',
  },
  'q-codes': {
    label: 'Q-Codes',
    icon: <MessageSquare className="size-5" />,
    href: '/learn/T2/T2B',
    colorClass: 'text-purple-600 dark:text-purple-400',
    bgClass: 'bg-purple-100 dark:bg-purple-950/50',
  },
}

/**
 * Format relative time from ISO date string
 */
function formatRelativeTime(dateStr: string | null): string {
  if (!dateStr) return 'Never'

  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    if (diffHours === 0) {
      const diffMins = Math.floor(diffMs / (1000 * 60))
      if (diffMins < 1) return 'Just now'
      return `${diffMins} min${diffMins !== 1 ? 's' : ''} ago`
    }
    return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
  }
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `${weeks} week${weeks !== 1 ? 's' : ''} ago`
  }
  const months = Math.floor(diffDays / 30)
  return `${months} month${months !== 1 ? 's' : ''} ago`
}

/**
 * Calculate progress toward next level
 */
function calculateLevelProgress(mastery: SkillMastery): {
  progress: number
  limitingFactor: 'attempts' | 'accuracy' | null
  nextLevel: number | null
} {
  const { level, attempts, accuracy } = mastery

  // Already at max level
  if (level === 5) {
    return { progress: 100, limitingFactor: null, nextLevel: null }
  }

  const nextLevel = (level + 1) as 2 | 3 | 4 | 5
  const threshold = LEVEL_THRESHOLDS[nextLevel]

  const attemptsProgress = Math.min(attempts / threshold.attempts, 1)
  const accuracyProgress = Math.min(accuracy / threshold.accuracy, 1)

  // The limiting factor is whichever is lower
  const limitingFactor = attemptsProgress <= accuracyProgress ? 'attempts' : 'accuracy'
  const progress = Math.min(attemptsProgress, accuracyProgress) * 100

  return { progress, limitingFactor, nextLevel }
}

/**
 * Get level label
 */
function getLevelLabel(level: number): string {
  switch (level) {
    case 1:
      return 'Beginner'
    case 2:
      return 'Novice'
    case 3:
      return 'Intermediate'
    case 4:
      return 'Proficient'
    case 5:
      return 'Expert'
    default:
      return 'Unknown'
  }
}

interface SkillCardProps {
  skill: SkillType
  mastery: SkillMastery
}

function SkillCard({ skill, mastery }: SkillCardProps) {
  const config = SKILL_CONFIG[skill]
  const { progress, limitingFactor, nextLevel } = calculateLevelProgress(mastery)
  const accuracyPercent = Math.round(mastery.accuracy * 100)
  const isExpert = mastery.level === 5

  return (
    <Card className="relative overflow-hidden">
      {isExpert && (
        <div className="absolute top-2 right-2 px-2 py-0.5 text-xs font-semibold rounded-full bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
          Expert
        </div>
      )}
      <CardContent className="p-4">
        <div className="flex gap-3">
          {/* Icon */}
          <div
            className={`shrink-0 size-10 rounded-full flex items-center justify-center ${config.bgClass} ${config.colorClass}`}
          >
            {config.icon}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Skill name */}
            <h3 className="font-semibold text-sm truncate">{config.label}</h3>

            {/* Stars */}
            <div
              className="flex items-center gap-0.5 mt-1"
              aria-label={`Level ${mastery.level} of 5`}
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`size-3.5 ${
                    star <= mastery.level
                      ? isExpert
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-primary text-primary'
                      : 'text-muted-foreground/30'
                  }`}
                  aria-hidden="true"
                />
              ))}
              <span className="ml-1.5 text-xs text-muted-foreground">
                {getLevelLabel(mastery.level)}
              </span>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span>{accuracyPercent}% accuracy</span>
              <span className="text-muted-foreground/50">|</span>
              <span>{formatRelativeTime(mastery.lastPracticed)}</span>
            </div>

            {/* Progress bar (if not expert) */}
            {!isExpert && (
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">
                    Progress to Level {nextLevel}
                  </span>
                  <span className="text-xs text-muted-foreground">{Math.round(progress)}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${config.colorClass.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')}`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                {limitingFactor && progress < 100 && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {limitingFactor === 'attempts'
                      ? `Need ${LEVEL_THRESHOLDS[nextLevel as 2 | 3 | 4 | 5].attempts - mastery.attempts} more attempts`
                      : `Need ${Math.round(LEVEL_THRESHOLDS[nextLevel as 2 | 3 | 4 | 5].accuracy * 100)}% accuracy`}
                  </p>
                )}
              </div>
            )}

            {/* Practice button */}
            <Button asChild variant="outline" size="sm" className="mt-3 w-full">
              <Link href={config.href}>Practice</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface FreezeTokensProps {
  tokens: number
  tokensEarned: number
  currentStreak: number
}

function FreezeTokensSection({ tokens, tokensEarned, currentStreak }: FreezeTokensProps) {
  const maxTokens = 2
  const streakToNextToken = currentStreak > 0 ? 7 - (currentStreak % 7) : 7
  const isAtMax = tokens >= maxTokens

  return (
    <div className="mt-4 p-4 rounded-lg bg-cyan-50/50 dark:bg-cyan-950/20 border border-cyan-200/50 dark:border-cyan-800/30">
      <div className="flex items-center gap-2 mb-3">
        <Snowflake className="size-4 text-cyan-600 dark:text-cyan-400" aria-hidden="true" />
        <h4 className="font-semibold text-sm">Streak Protection</h4>
        {tokens > 0 && (
          <span className="ml-auto flex items-center gap-1 text-xs font-medium text-cyan-700 dark:text-cyan-300 bg-cyan-100 dark:bg-cyan-900/50 px-2 py-0.5 rounded-full">
            <Shield className="size-3" aria-hidden="true" />
            Protected
          </span>
        )}
      </div>

      {/* Token display */}
      <div
        className="flex items-center gap-2 mb-2"
        aria-label={`${tokens} of ${maxTokens} freeze tokens available`}
      >
        {[...Array(maxTokens)].map((_, i) => (
          <div
            key={i}
            className={`size-8 rounded-lg flex items-center justify-center transition-colors ${
              i < tokens
                ? 'bg-cyan-200 dark:bg-cyan-800/60 text-cyan-700 dark:text-cyan-300'
                : 'bg-muted/50 text-muted-foreground/30'
            }`}
          >
            <Snowflake className="size-4" aria-hidden="true" />
          </div>
        ))}
        <span className="ml-2 text-sm text-muted-foreground">
          {tokens} of {maxTokens} tokens available
        </span>
      </div>

      {/* Info text */}
      <p className="text-xs text-muted-foreground mt-3">
        Freeze tokens protect your streak when you miss a day.
        {!isAtMax &&
          ` Earn 1 token in ${streakToNextToken} day${streakToNextToken !== 1 ? 's' : ''} of study.`}
        {tokensEarned > 0 && (
          <span className="ml-1 text-cyan-600 dark:text-cyan-400">
            ({tokensEarned} earned lifetime)
          </span>
        )}
      </p>

      {/* Progress to next token */}
      {!isAtMax && currentStreak > 0 && (
        <div className="mt-2">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-muted-foreground">Progress to next token</span>
            <span className="text-xs text-muted-foreground">{currentStreak % 7}/7 days</span>
          </div>
          <div className="h-1 rounded-full bg-cyan-200/50 dark:bg-cyan-800/30 overflow-hidden">
            <div
              className="h-full bg-cyan-500 dark:bg-cyan-400 transition-all duration-300"
              style={{ width: `${((currentStreak % 7) / 7) * 100}%` }}
            />
          </div>
        </div>
      )}

      {isAtMax && (
        <p className="text-xs text-cyan-600 dark:text-cyan-400 mt-2 font-medium">
          You have maximum tokens! Study without worry.
        </p>
      )}
    </div>
  )
}

export function SkillTracker() {
  const isHydrated = useHydration()
  const { skillProgress, freezeTokens, freezeTokensEarned, currentStreak } = useFlashcardStore()

  // Default values for SSR
  const skills: SkillType[] = ['phonetic', 'rst', 'qso', 'q-codes']

  // Show placeholder during SSR
  if (!isHydrated) {
    return (
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Operating Skills</CardTitle>
          <CardDescription>Track your procedural skill mastery</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {skills.map((skill) => (
              <div key={skill} className="h-44 rounded-lg bg-muted/50 animate-pulse" />
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Operating Skills</CardTitle>
        <CardDescription>Track your procedural skill mastery</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Skill cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {skills.map((skill) => (
            <SkillCard key={skill} skill={skill} mastery={skillProgress[skill]} />
          ))}
        </div>

        {/* Freeze tokens section */}
        <FreezeTokensSection
          tokens={freezeTokens}
          tokensEarned={freezeTokensEarned}
          currentStreak={currentStreak}
        />
      </CardContent>
    </Card>
  )
}

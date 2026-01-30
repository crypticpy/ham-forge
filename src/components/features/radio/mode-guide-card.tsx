'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Radio,
  Lightbulb,
  Settings,
  List,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ModeGuide } from '@/types/radio'

// Color scheme by mode type - badge colors for mode indicators
const modeBadgeColors: Record<string, string> = {
  lsb: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
  usb: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
  cw: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  fm: 'bg-green-500/10 text-green-700 dark:text-green-300',
  am: 'bg-purple-500/10 text-purple-700 dark:text-purple-300',
  data: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
  rtty: 'bg-pink-500/10 text-pink-700 dark:text-pink-300',
}
// Re-export for use in other components
export { modeBadgeColors }

const modeAccentColors: Record<string, string> = {
  lsb: 'border-l-blue-500',
  usb: 'border-l-blue-500',
  cw: 'border-l-amber-500',
  fm: 'border-l-green-500',
  am: 'border-l-purple-500',
  data: 'border-l-cyan-500',
  rtty: 'border-l-pink-500',
}

// ============================================================================
// ModeGuideCard - Overview card for modes listing
// ============================================================================

interface ModeGuideCardProps {
  guide: ModeGuide
  href?: string
  className?: string
}

export function ModeGuideCard({ guide, href, className }: ModeGuideCardProps) {
  const badgeColorClass = modeBadgeColors[guide.id] || modeBadgeColors.data
  const accentColorClass = modeAccentColors[guide.id] || modeAccentColors.data

  const cardContent = (
    <Card
      className={cn(
        'h-full transition-all hover:border-primary/50 hover:shadow-md border-l-4',
        accentColorClass,
        href && 'cursor-pointer',
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Radio
              className={cn(
                'size-5 shrink-0',
                guide.id === 'cw' && 'text-amber-600 dark:text-amber-400',
                (guide.id === 'lsb' || guide.id === 'usb') && 'text-blue-600 dark:text-blue-400',
                guide.id === 'fm' && 'text-green-600 dark:text-green-400',
                guide.id === 'am' && 'text-purple-600 dark:text-purple-400',
                guide.id === 'data' && 'text-cyan-600 dark:text-cyan-400',
                guide.id === 'rtty' && 'text-pink-600 dark:text-pink-400'
              )}
              aria-hidden="true"
            />
            <CardTitle className="text-base leading-tight">
              {guide.name}
              <span className="text-muted-foreground font-normal"> - {guide.fullName}</span>
            </CardTitle>
          </div>
          <span
            className={cn('shrink-0 px-2 py-0.5 text-xs font-medium rounded-full', badgeColorClass)}
          >
            {guide.name}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overview text - truncated */}
        <p className="text-sm text-muted-foreground line-clamp-3">{guide.overview}</p>

        {/* Stats row */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <BookOpen className="size-4" aria-hidden="true" />
            <span>
              {guide.sections.length} {guide.sections.length === 1 ? 'section' : 'sections'}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lightbulb className="size-4 text-amber-500" aria-hidden="true" />
            <span>
              {guide.examTips.length} exam {guide.examTips.length === 1 ? 'tip' : 'tips'}
            </span>
          </div>
        </div>

        {/* CTA row */}
        {href && (
          <div className="flex items-center justify-end text-sm font-medium text-primary">
            <span>View Guide</span>
            <ChevronRight className="size-4 ml-1" aria-hidden="true" />
          </div>
        )}
      </CardContent>
    </Card>
  )

  if (href) {
    return <Link href={href}>{cardContent}</Link>
  }

  return cardContent
}

// ============================================================================
// ModeQuickSetup - Step-by-step quick setup display
// ============================================================================

interface ModeQuickSetupProps {
  steps: string[]
  className?: string
}

export function ModeQuickSetup({ steps, className }: ModeQuickSetupProps) {
  const [isExpanded, setIsExpanded] = useState(steps.length <= 5)
  const visibleSteps = isExpanded ? steps : steps.slice(0, 5)
  const hasMoreSteps = steps.length > 5

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <List className="size-5 text-primary" aria-hidden="true" />
        <h3 className="font-semibold">Quick Setup</h3>
      </div>

      <ol className="space-y-2 ml-1">
        {visibleSteps.map((step, index) => (
          <li key={index} className="flex gap-3 text-sm">
            <span className="flex items-center justify-center size-6 shrink-0 rounded-full bg-primary/10 text-primary font-medium text-xs">
              {index + 1}
            </span>
            <span className="text-muted-foreground pt-0.5">{step}</span>
          </li>
        ))}
      </ol>

      {hasMoreSteps && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-sm text-primary hover:underline ml-1"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="size-4" aria-hidden="true" />
              Show fewer steps
            </>
          ) : (
            <>
              <ChevronDown className="size-4" aria-hidden="true" />
              Show all {steps.length} steps
            </>
          )}
        </button>
      )}
    </div>
  )
}

// ============================================================================
// ModeCommonSettings - Settings table display
// ============================================================================

interface ModeCommonSettingsProps {
  settings: { setting: string; value: string; reason: string }[]
  className?: string
}

export function ModeCommonSettings({ settings, className }: ModeCommonSettingsProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <Settings className="size-5 text-primary" aria-hidden="true" />
        <h3 className="font-semibold">Common Settings</h3>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-2 font-medium">Setting</th>
              <th className="text-left px-4 py-2 font-medium">Value</th>
              <th className="text-left px-4 py-2 font-medium hidden sm:table-cell">Reason</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((item, index) => (
              <tr
                key={item.setting}
                className={cn('border-t', index % 2 === 0 ? 'bg-background' : 'bg-muted/30')}
              >
                <td className="px-4 py-3 font-medium">{item.setting}</td>
                <td className="px-4 py-3 text-primary font-mono text-xs">{item.value}</td>
                <td className="px-4 py-3 text-muted-foreground hidden sm:table-cell">
                  {item.reason}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile-only: Show reasons in a separate list */}
      <div className="sm:hidden space-y-2 mt-3">
        {settings.map((item) => (
          <div key={item.setting} className="text-sm">
            <span className="font-medium">{item.setting}:</span>{' '}
            <span className="text-muted-foreground">{item.reason}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ============================================================================
// ModeExamTips - Exam tips display
// ============================================================================

interface ModeExamTipsProps {
  tips: string[]
  className?: string
}

export function ModeExamTips({ tips, className }: ModeExamTipsProps) {
  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center gap-2">
        <Lightbulb className="size-5 text-amber-500" aria-hidden="true" />
        <h3 className="font-semibold">Exam Tips</h3>
      </div>

      <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-4">
        <ul className="space-y-3">
          {tips.map((tip, index) => (
            <li key={index} className="flex gap-3 text-sm">
              <Lightbulb
                className="size-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5"
                aria-hidden="true"
              />
              <span className="text-amber-800 dark:text-amber-300">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

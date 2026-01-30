'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  Activity,
  SlidersHorizontal,
  Bookmark,
  Radio,
  Lightbulb,
  Zap,
  GraduationCap,
  ChevronRight,
  type LucideIcon,
} from 'lucide-react'
import type { FeatureGuide, GuideStep } from '@/types/radio'
import { cn } from '@/lib/utils'

// Map icon names from data to lucide-react components
const iconMap: Record<string, LucideIcon> = {
  activity: Activity,
  'sliders-horizontal': SlidersHorizontal,
  bookmark: Bookmark,
  radio: Radio,
}

// ============================================================================
// GuideCard - Overview card for guides listing page
// ============================================================================

interface GuideCardProps {
  guide: FeatureGuide
  href?: string
  className?: string
}

export function GuideCard({ guide, href, className }: GuideCardProps) {
  const IconComponent = iconMap[guide.icon] || Radio
  const sectionCount = guide.sections.length
  const tipCount = guide.quickTips.length

  const cardContent = (
    <Card
      className={cn(
        'h-full transition-all hover:border-primary/50 hover:shadow-md',
        href && 'cursor-pointer',
        className
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <IconComponent className="size-5" aria-hidden="true" />
          </div>
          <div className="flex-1 space-y-1">
            <CardTitle className="text-base leading-tight">{guide.name}</CardTitle>
            <CardDescription className="line-clamp-2">{guide.description}</CardDescription>
          </div>
          {href && (
            <ChevronRight className="size-5 shrink-0 text-muted-foreground" aria-hidden="true" />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="font-medium text-foreground">{sectionCount}</span>
            {sectionCount === 1 ? 'section' : 'sections'}
          </span>
          <span className="flex items-center gap-1.5">
            <Zap className="size-3.5 text-amber-500" aria-hidden="true" />
            <span className="font-medium text-foreground">{tipCount}</span>
            {tipCount === 1 ? 'tip' : 'tips'}
          </span>
        </div>
      </CardContent>
    </Card>
  )

  if (href) {
    return <Link href={href}>{cardContent}</Link>
  }

  return cardContent
}

// ============================================================================
// GuideStepList - Step-by-step instructions
// ============================================================================

interface GuideStepListProps {
  steps: GuideStep[]
  className?: string
}

export function GuideStepList({ steps, className }: GuideStepListProps) {
  return (
    <ol className={cn('space-y-4', className)}>
      {steps.map((step) => (
        <li key={step.step} className="flex gap-3">
          <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
            {step.step}
          </span>
          <div className="flex-1 space-y-2 pt-0.5">
            <p className="text-sm leading-relaxed">{step.instruction}</p>
            {step.tip && (
              <div className="flex gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 dark:border-amber-800 dark:bg-amber-900/20">
                <Lightbulb
                  className="mt-0.5 size-4 shrink-0 text-amber-600 dark:text-amber-400"
                  aria-hidden="true"
                />
                <p className="text-sm text-amber-700 dark:text-amber-400">{step.tip}</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}

// ============================================================================
// GuideSection - Individual section within a guide
// ============================================================================

interface GuideSectionProps {
  section: {
    id: string
    title: string
    content: string
    steps?: GuideStep[]
  }
  className?: string
}

export function GuideSection({ section, className }: GuideSectionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      <h3 className="text-lg font-semibold leading-tight">{section.title}</h3>
      <div className="space-y-3">
        {section.content.split('\n\n').map((paragraph, index) => (
          <p key={index} className="text-sm leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
      </div>
      {section.steps && section.steps.length > 0 && (
        <div className="pt-2">
          <GuideStepList steps={section.steps} />
        </div>
      )}
    </div>
  )
}

// ============================================================================
// GuideQuickTips - Quick tips sidebar/section
// ============================================================================

interface GuideQuickTipsProps {
  tips: string[]
  className?: string
}

export function GuideQuickTips({ tips, className }: GuideQuickTipsProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20',
        className
      )}
    >
      <h4 className="mb-3 flex items-center gap-2 font-semibold text-blue-800 dark:text-blue-300">
        <Zap className="size-4" aria-hidden="true" />
        Quick Tips
      </h4>
      <ul className="space-y-2">
        {tips.map((tip, index) => (
          <li key={index} className="flex gap-2 text-sm">
            <Zap
              className="mt-0.5 size-3.5 shrink-0 text-blue-600 dark:text-blue-400"
              aria-hidden="true"
            />
            <span className="text-blue-700 dark:text-blue-300">{tip}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

// ============================================================================
// GuideExamRelevance - Exam relevance section
// ============================================================================

interface GuideExamRelevanceProps {
  items: string[]
  className?: string
}

export function GuideExamRelevance({ items, className }: GuideExamRelevanceProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-800 dark:bg-amber-900/20',
        className
      )}
    >
      <h4 className="mb-3 flex items-center gap-2 font-semibold text-amber-800 dark:text-amber-300">
        <GraduationCap className="size-4" aria-hidden="true" />
        Exam Relevance
      </h4>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex gap-2 text-sm">
            <span
              className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-600 dark:bg-amber-400"
              aria-hidden="true"
            />
            <span className="text-amber-700 dark:text-amber-400">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

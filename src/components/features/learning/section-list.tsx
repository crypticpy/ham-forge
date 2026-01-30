'use client'

import Link from 'next/link'
import { Check, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LearningSection } from '@/types/learning'

interface SectionListProps {
  sections: LearningSection[]
  moduleId: string
  completedSections?: Set<string>
}

export function SectionList({ sections, moduleId, completedSections }: SectionListProps) {
  return (
    <div className="space-y-1" role="list" aria-label="Module sections">
      {sections.map((section, index) => {
        const isCompleted = completedSections?.has(section.id) ?? false
        const sectionNumber = index + 1

        return (
          <Link
            key={section.id}
            href={`/learn/${moduleId}/${section.id}`}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg transition-all',
              'hover:bg-muted/50 hover:text-foreground',
              'group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              isCompleted ? 'text-muted-foreground' : 'text-foreground'
            )}
            role="listitem"
          >
            {/* Section number or check mark */}
            <div
              className={cn(
                'flex-shrink-0 size-7 rounded-full flex items-center justify-center text-sm font-medium',
                isCompleted
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-muted text-muted-foreground'
              )}
            >
              {isCompleted ? (
                <Check className="size-4" aria-hidden="true" />
              ) : (
                <span>{sectionNumber}</span>
              )}
            </div>

            {/* Section title */}
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium line-clamp-1">{section.title}</span>
              {section.keyPoints.length > 0 && (
                <span className="text-xs text-muted-foreground line-clamp-1">
                  {section.keyPoints.length} key{' '}
                  {section.keyPoints.length === 1 ? 'point' : 'points'}
                </span>
              )}
            </div>

            {/* Arrow indicator */}
            <ChevronRight
              className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
              aria-hidden="true"
            />
          </Link>
        )
      })}
    </div>
  )
}

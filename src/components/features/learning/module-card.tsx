'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BookOpen, Clock, Check, ChevronRight } from 'lucide-react'
import type { LearningModule } from '@/types/learning'

interface ModuleCardProps {
  module: LearningModule
  progress?: number
}

export function ModuleCard({ module, progress }: ModuleCardProps) {
  const sectionCount = module.sections.length
  const hasProgress = typeof progress === 'number' && progress > 0

  return (
    <Link href={`/learn/${module.id}`}>
      <Card className="h-full cursor-pointer transition-all hover:border-primary hover:shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg line-clamp-1">{module.title}</CardTitle>
          <CardDescription className="line-clamp-2">{module.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Metadata row */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <BookOpen className="size-4" aria-hidden="true" />
              <span>
                {sectionCount} {sectionCount === 1 ? 'section' : 'sections'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="size-4" aria-hidden="true" />
              <span>{module.estimatedMinutes} min</span>
            </div>
          </div>

          {/* Progress indicator */}
          {hasProgress && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-500">
                  <Check className="size-4" aria-hidden="true" />
                  <span>{Math.round(progress)}% complete</span>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-green-600 dark:bg-green-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* CTA row */}
          <div className="flex items-center justify-end text-sm font-medium text-primary">
            <span>{hasProgress ? 'Continue' : 'Start'}</span>
            <ChevronRight className="size-4 ml-1" aria-hidden="true" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

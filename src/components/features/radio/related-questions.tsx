'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { HelpCircle, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getMappingsForControl } from '@/data/radio/question-control-mapping'
import { getQuestionPool } from '@/lib/question-scheduler'
import type { Question, ExamLevel } from '@/types'

interface RelatedQuestionsProps {
  controlId: string
  maxQuestions?: number
  className?: string
}

interface QuestionWithRelevance {
  question: Question
  relevance: 'direct' | 'related'
  examLevel: ExamLevel
}

const relevanceColors = {
  direct: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  related: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
}

/**
 * RelatedQuestions component
 * Shows exam questions related to a specific IC-7300 control
 */
export function RelatedQuestions({
  controlId,
  maxQuestions = 5,
  className,
}: RelatedQuestionsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Get all mappings for this control and find the actual questions
  const questionsWithRelevance = useMemo(() => {
    const mappings = getMappingsForControl(controlId)

    if (mappings.length === 0) {
      return []
    }

    // Build a map of questionId -> relevance for quick lookup
    const relevanceMap = new Map<string, 'direct' | 'related'>()
    for (const mapping of mappings) {
      relevanceMap.set(mapping.questionId, mapping.relevance)
    }

    // Get questions from both pools
    const technicianPool = getQuestionPool('technician')
    const generalPool = getQuestionPool('general')

    const result: QuestionWithRelevance[] = []

    // Search technician pool
    for (const question of technicianPool) {
      const relevance = relevanceMap.get(question.id)
      if (relevance) {
        result.push({ question, relevance, examLevel: 'technician' })
      }
    }

    // Search general pool
    for (const question of generalPool) {
      const relevance = relevanceMap.get(question.id)
      if (relevance) {
        result.push({ question, relevance, examLevel: 'general' })
      }
    }

    // Sort: direct questions first, then by question ID
    result.sort((a, b) => {
      if (a.relevance !== b.relevance) {
        return a.relevance === 'direct' ? -1 : 1
      }
      return a.question.id.localeCompare(b.question.id)
    })

    return result
  }, [controlId])

  // Don't render if no related questions
  if (questionsWithRelevance.length === 0) {
    return null
  }

  const displayedQuestions = isExpanded
    ? questionsWithRelevance
    : questionsWithRelevance.slice(0, maxQuestions)

  const hasMoreQuestions = questionsWithRelevance.length > maxQuestions

  const directCount = questionsWithRelevance.filter((q) => q.relevance === 'direct').length
  const relatedCount = questionsWithRelevance.filter((q) => q.relevance === 'related').length

  return (
    <Card className={cn('', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="size-4 text-muted-foreground" aria-hidden="true" />
          <CardTitle className="text-sm font-medium">Related Exam Questions</CardTitle>
        </div>
        <p className="text-xs text-muted-foreground">
          {directCount > 0 && (
            <span>
              {directCount} direct
              {relatedCount > 0 && ', '}
            </span>
          )}
          {relatedCount > 0 && <span>{relatedCount} related</span>} question
          {questionsWithRelevance.length !== 1 ? 's' : ''}
        </p>
      </CardHeader>
      <CardContent className="space-y-2">
        {/* Question list */}
        <ul className="space-y-2">
          {displayedQuestions.map(({ question, relevance, examLevel }) => (
            <li key={question.id}>
              <Link
                href={`/practice?questionId=${question.id}&level=${examLevel}`}
                className="group block p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start gap-2">
                  {/* Question ID and relevance badge */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="font-mono text-xs font-medium text-primary">
                      {question.id}
                    </span>
                    <span
                      className={cn(
                        'px-1.5 py-0.5 text-[10px] font-medium rounded',
                        relevanceColors[relevance]
                      )}
                    >
                      {relevance}
                    </span>
                  </div>
                  {/* External link indicator */}
                  <ExternalLink
                    className="size-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                </div>
                {/* Question preview text */}
                <p className="mt-1 text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {question.question}
                </p>
              </Link>
            </li>
          ))}
        </ul>

        {/* Expand/collapse button */}
        {hasMoreQuestions && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full mt-2 text-xs"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="size-3" aria-hidden="true" />
                Show fewer
              </>
            ) : (
              <>
                <ChevronDown className="size-3" aria-hidden="true" />
                Show {questionsWithRelevance.length - maxQuestions} more
              </>
            )}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

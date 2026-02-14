'use client'

import { useState, useId } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { FilterPanel } from './filter-panel'
import { cn } from '@/lib/utils'
import {
  GraduationCap,
  Hash,
  Filter,
  Settings,
  Shuffle,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Play,
  Check,
} from 'lucide-react'
import type { ExamLevel } from '@/types'

export interface SessionConfig {
  examLevel: ExamLevel
  questionCount: number
  subelements: string[] // Empty = all
  groups: string[] // Empty = all groups within selected subelements (e.g., ['T1A', 'T1B'])
  status: ('new' | 'learning' | 'review' | 'mastered')[] // Empty = all
  flaggedOnly: boolean // Only show flagged questions
  shuffleAnswers: boolean
  showExplanations: boolean
  isQuickStudy?: boolean
  durationSeconds?: number
}

interface SessionConfigProps {
  onStart: (config: SessionConfig) => void
  initialExamLevel?: ExamLevel
}

const EXAM_LEVELS: { id: ExamLevel; name: string; description: string }[] = [
  { id: 'technician', name: 'Technician', description: 'Entry-level license' },
  { id: 'general', name: 'General', description: 'HF privileges' },
  { id: 'extra', name: 'Extra', description: 'Maximum privileges' },
]

const QUESTION_COUNTS = [
  { value: 10, label: '10', description: 'Quick session' },
  { value: 20, label: '20', description: 'Standard' },
  { value: 35, label: '35', description: 'Tech/General exam' },
  { value: 50, label: '50', description: 'Extra exam' },
  { value: -1, label: 'All', description: 'Full pool' },
]

export function SessionConfig({ onStart, initialExamLevel = 'technician' }: SessionConfigProps) {
  const [examLevel, setExamLevel] = useState<ExamLevel>(initialExamLevel)
  const [questionCount, setQuestionCount] = useState(10)
  const [subelements, setSubelements] = useState<string[]>([])
  const [groups, setGroups] = useState<string[]>([])
  const [status, setStatus] = useState<('new' | 'learning' | 'review' | 'mastered')[]>([])
  const [flaggedOnly, setFlaggedOnly] = useState(false)
  const [shuffleAnswers, setShuffleAnswers] = useState(true)
  const [showExplanations, setShowExplanations] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  // Generate unique IDs for accessibility
  const examLevelId = useId()
  const questionCountId = useId()
  const filtersId = useId()
  const optionsId = useId()
  const shuffleId = useId()
  const explanationsId = useId()

  const handleStart = () => {
    onStart({
      examLevel,
      questionCount: questionCount === -1 ? 9999 : questionCount,
      subelements,
      groups,
      status,
      flaggedOnly,
      shuffleAnswers,
      showExplanations,
    })
  }

  const hasFilters = subelements.length > 0 || groups.length > 0 || status.length > 0 || flaggedOnly
  const filterSummary = hasFilters
    ? [
        subelements.length > 0 ? `${subelements.length} topics` : null,
        groups.length > 0 ? `${groups.length} groups` : null,
        status.length > 0 ? `${status.length} statuses` : null,
        flaggedOnly ? 'flagged only' : null,
      ]
        .filter(Boolean)
        .join(', ')
    : 'No filters applied'

  return (
    <div className="space-y-4" role="form" aria-label="Practice session configuration">
      {/* Exam Level Selection */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <GraduationCap className="size-5 text-muted-foreground" aria-hidden="true" />
            <div>
              <CardTitle className="text-base" id={examLevelId}>
                Exam Level
              </CardTitle>
              <CardDescription>Select which exam you are studying for</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-3" role="radiogroup" aria-labelledby={examLevelId}>
            {EXAM_LEVELS.map((level) => (
              <button
                key={level.id}
                type="button"
                role="radio"
                aria-checked={examLevel === level.id}
                onClick={() => {
                  setExamLevel(level.id)
                  setSubelements([])
                  setGroups([])
                }}
                className={cn(
                  'relative flex flex-col items-start rounded-lg border p-4 text-left transition-all',
                  'hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'min-h-[72px] touch-manipulation',
                  examLevel === level.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-input hover:border-muted-foreground/50'
                )}
              >
                {examLevel === level.id && (
                  <Check
                    className="absolute right-3 top-3 size-4 text-primary"
                    aria-hidden="true"
                  />
                )}
                <span className="font-medium">{level.name}</span>
                <span className="text-sm text-muted-foreground">{level.description}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Question Count */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Hash className="size-5 text-muted-foreground" aria-hidden="true" />
            <div>
              <CardTitle className="text-base" id={questionCountId}>
                Number of Questions
              </CardTitle>
              <CardDescription>How many questions per session</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby={questionCountId}>
            {QUESTION_COUNTS.map((count) => (
              <button
                key={count.value}
                type="button"
                role="radio"
                aria-checked={questionCount === count.value}
                onClick={() => setQuestionCount(count.value)}
                className={cn(
                  'relative flex flex-col items-center rounded-lg border px-4 py-2 transition-all',
                  'hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  'min-w-[60px] min-h-[52px] touch-manipulation',
                  questionCount === count.value
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-input hover:border-muted-foreground/50'
                )}
              >
                <span className="text-lg font-semibold">{count.label}</span>
                <span className="text-[10px] text-muted-foreground">{count.description}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filter Toggle */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="size-5 text-muted-foreground" aria-hidden="true" />
              <div>
                <CardTitle className="text-base" id={filtersId}>
                  Filters
                </CardTitle>
                <CardDescription className="flex items-center gap-1">
                  {hasFilters && (
                    <span
                      className="inline-flex size-2 rounded-full bg-primary"
                      aria-hidden="true"
                    />
                  )}
                  {filterSummary}
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              aria-controls="filter-panel"
              className="gap-1"
            >
              {showFilters ? (
                <>
                  Hide
                  <ChevronUp className="size-4" aria-hidden="true" />
                </>
              ) : (
                <>
                  {hasFilters ? 'Edit' : 'Add'}
                  <ChevronDown className="size-4" aria-hidden="true" />
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        {showFilters && (
          <CardContent className="pt-0" id="filter-panel">
            <FilterPanel
              examLevel={examLevel}
              selectedSubelements={subelements}
              selectedGroups={groups}
              selectedStatus={status}
              showFlaggedOnly={flaggedOnly}
              onSubelementsChange={setSubelements}
              onGroupsChange={setGroups}
              onStatusChange={setStatus}
              onFlaggedOnlyChange={setFlaggedOnly}
            />
          </CardContent>
        )}
      </Card>

      {/* Options */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Settings className="size-5 text-muted-foreground" aria-hidden="true" />
            <CardTitle className="text-base" id={optionsId}>
              Options
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="pt-0 space-y-4" aria-labelledby={optionsId}>
          {/* Shuffle Answers Option */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Shuffle
                className="size-5 text-muted-foreground mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div className="space-y-0.5">
                <label
                  htmlFor={shuffleId}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Shuffle Answers
                </label>
                <p className="text-sm text-muted-foreground" id={`${shuffleId}-desc`}>
                  Randomize the order of answer choices
                </p>
              </div>
            </div>
            <Switch
              id={shuffleId}
              checked={shuffleAnswers}
              onCheckedChange={setShuffleAnswers}
              aria-describedby={`${shuffleId}-desc`}
            />
          </div>

          <div className="h-px bg-border" role="separator" aria-hidden="true" />

          {/* Show Explanations Option */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <MessageSquare
                className="size-5 text-muted-foreground mt-0.5 shrink-0"
                aria-hidden="true"
              />
              <div className="space-y-0.5">
                <label
                  htmlFor={explanationsId}
                  className="text-sm font-medium leading-none cursor-pointer"
                >
                  Show Explanations
                </label>
                <p className="text-sm text-muted-foreground" id={`${explanationsId}-desc`}>
                  Display explanations after answering
                </p>
              </div>
            </div>
            <Switch
              id={explanationsId}
              checked={showExplanations}
              onCheckedChange={setShowExplanations}
              aria-describedby={`${explanationsId}-desc`}
            />
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <Button
        onClick={handleStart}
        size="lg"
        className="w-full gap-2 text-base font-semibold h-14 touch-manipulation"
        aria-label={`Start practice session with ${questionCount === -1 ? 'all' : questionCount} ${examLevel} questions`}
      >
        <Play className="size-5" aria-hidden="true" />
        Start Practice Session
      </Button>

      {/* Session Summary */}
      <p className="text-center text-sm text-muted-foreground" aria-live="polite">
        {questionCount === -1 ? 'All available' : questionCount}{' '}
        {examLevel === 'technician' ? 'Technician' : examLevel === 'general' ? 'General' : 'Extra'}{' '}
        questions
        {hasFilters && ' (filtered)'}
      </p>
    </div>
  )
}

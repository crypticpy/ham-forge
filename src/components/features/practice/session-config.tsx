'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { FilterPanel } from './filter-panel'
import { cn } from '@/lib/utils'
import type { ExamLevel } from '@/types'

export interface SessionConfig {
  examLevel: ExamLevel
  questionCount: number
  subelements: string[] // Empty = all
  status: ('new' | 'learning' | 'review' | 'mastered')[] // Empty = all
  shuffleAnswers: boolean
  showExplanations: boolean
}

interface SessionConfigProps {
  onStart: (config: SessionConfig) => void
  initialExamLevel?: ExamLevel
}

const EXAM_LEVELS: { id: ExamLevel; name: string; description: string }[] = [
  { id: 'technician', name: 'Technician', description: 'Entry-level license' },
  { id: 'general', name: 'General', description: 'HF privileges' },
]

const QUESTION_COUNTS = [
  { value: 10, label: '10' },
  { value: 20, label: '20' },
  { value: 35, label: '35' },
  { value: 50, label: '50' },
  { value: -1, label: 'All' },
]

export function SessionConfig({ onStart, initialExamLevel = 'technician' }: SessionConfigProps) {
  const [examLevel, setExamLevel] = useState<ExamLevel>(initialExamLevel)
  const [questionCount, setQuestionCount] = useState(10)
  const [subelements, setSubelements] = useState<string[]>([])
  const [status, setStatus] = useState<('new' | 'learning' | 'review' | 'mastered')[]>([])
  const [shuffleAnswers, setShuffleAnswers] = useState(true)
  const [showExplanations, setShowExplanations] = useState(true)
  const [showFilters, setShowFilters] = useState(false)

  const handleStart = () => {
    onStart({
      examLevel,
      questionCount: questionCount === -1 ? 9999 : questionCount,
      subelements,
      status,
      shuffleAnswers,
      showExplanations,
    })
  }

  const hasFilters = subelements.length > 0 || status.length > 0

  return (
    <div className="space-y-4">
      {/* Exam Level Selection */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Exam Level</CardTitle>
          <CardDescription>Select which exam you are studying for</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 gap-3">
            {EXAM_LEVELS.map((level) => (
              <button
                key={level.id}
                onClick={() => {
                  setExamLevel(level.id)
                  setSubelements([]) // Reset subelements when changing exam level
                }}
                className={cn(
                  'flex flex-col items-start rounded-lg border p-4 text-left transition-colors hover:bg-accent',
                  examLevel === level.id
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-input'
                )}
              >
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
          <CardTitle className="text-base">Number of Questions</CardTitle>
          <CardDescription>How many questions per session</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-2">
            {QUESTION_COUNTS.map((count) => (
              <button
                key={count.value}
                onClick={() => setQuestionCount(count.value)}
                className={cn(
                  'rounded-lg border px-4 py-2 text-sm font-medium transition-colors hover:bg-accent',
                  questionCount === count.value
                    ? 'border-primary bg-primary/5 ring-1 ring-primary'
                    : 'border-input'
                )}
              >
                {count.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filter Toggle */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">Filters</CardTitle>
              <CardDescription>
                {hasFilters
                  ? `${subelements.length || 'All'} topics, ${status.length || 'All'} statuses`
                  : 'No filters applied - all questions included'}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
              {showFilters ? 'Hide' : 'Show'} Filters
            </Button>
          </div>
        </CardHeader>
        {showFilters && (
          <CardContent className="pt-0">
            <FilterPanel
              examLevel={examLevel}
              selectedSubelements={subelements}
              selectedStatus={status}
              onSubelementsChange={setSubelements}
              onStatusChange={setStatus}
            />
          </CardContent>
        )}
      </Card>

      {/* Options */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Options</CardTitle>
        </CardHeader>
        <CardContent className="pt-0 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="shuffle-answers"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Shuffle Answers
              </label>
              <p className="text-sm text-muted-foreground">Randomize the order of answer choices</p>
            </div>
            <Switch
              id="shuffle-answers"
              checked={shuffleAnswers}
              onCheckedChange={setShuffleAnswers}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label
                htmlFor="show-explanations"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show Explanations
              </label>
              <p className="text-sm text-muted-foreground">Display explanations after answering</p>
            </div>
            <Switch
              id="show-explanations"
              checked={showExplanations}
              onCheckedChange={setShowExplanations}
            />
          </div>
        </CardContent>
      </Card>

      {/* Start Button */}
      <Button onClick={handleStart} size="lg" className="w-full">
        Start Practice Session
      </Button>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Clock,
  FileCheck,
  AlertCircle,
  ChevronRight,
  BookOpen,
  Target,
  Flag,
  CheckCircle2,
} from 'lucide-react'
import { ExamHistory } from '@/components/features/exam/exam-history'
import { useStudyStore } from '@/stores/study-store'
import { getExamConfig } from '@/lib/exam-generator'
import { EXAM_SESSION_STORAGE_KEY } from '@/lib/exam-session-persistence'
import type { ExamLevel } from '@/types'

export default function ExamLandingPage() {
  const router = useRouter()
  const { currentExamLevel, setExamLevel } = useStudyStore()
  const [selectedLevel, setSelectedLevel] = useState<ExamLevel>(currentExamLevel)
  const [examConfig, setExamConfig] = useState<Awaited<ReturnType<typeof getExamConfig>> | null>(
    null
  )

  useEffect(() => {
    let cancelled = false

    const loadConfig = async () => {
      const config = await getExamConfig(selectedLevel)
      if (!cancelled) setExamConfig(config)
    }

    loadConfig()
    return () => {
      cancelled = true
    }
  }, [selectedLevel])

  const handleStartExam = () => {
    // Set exam level in store and navigate
    setExamLevel(selectedLevel)

    // Clear any existing exam session
    sessionStorage.removeItem(EXAM_SESSION_STORAGE_KEY)

    // Generate unique exam ID for URL
    const examId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
    router.push(`/exam/${examId}`)
  }

  const handleExamLevelChange = (level: ExamLevel) => {
    setSelectedLevel(level)
  }

  const examLevelLabel =
    selectedLevel === 'technician' ? 'Technician' : selectedLevel === 'general' ? 'General' : 'Extra'

  const examRules = [
    {
      icon: FileCheck,
      title: `${examConfig?.totalQuestions ?? '—'} Questions`,
      description: `One question randomly selected from each of ${examConfig?.totalQuestions ?? '—'} groups`,
    },
    {
      icon: Clock,
      title: `${examConfig?.timeLimit ?? 60} Minutes`,
      description: 'Complete the exam within the time limit',
    },
    {
      icon: Target,
      title: `${examConfig?.passingPercentage ?? 74}% to Pass`,
      description: `${examConfig?.passingScore ?? '—'} correct answers required (out of ${examConfig?.totalQuestions ?? '—'})`,
    },
    {
      icon: Flag,
      title: 'Flag for Review',
      description: 'Mark questions to revisit before submitting',
    },
    {
      icon: ChevronRight,
      title: 'Free Navigation',
      description: 'Move between questions anytime during the exam',
    },
    {
      icon: AlertCircle,
      title: 'No Immediate Feedback',
      description: 'Correct answers shown only after submission',
    },
  ]

  return (
    <div className="container mx-auto max-w-3xl px-3 py-4 sm:px-4 sm:py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Practice Exam</h1>
        <p className="text-muted-foreground">Simulate the real VE exam experience</p>
      </div>

      {/* Exam Level Selection */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <BookOpen className="size-5" aria-hidden="true" />
            Select Exam Level
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handleExamLevelChange('technician')}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedLevel === 'technician'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-medium">Technician</div>
              <div className="text-sm text-muted-foreground">Entry-level license</div>
            </button>
            <button
              onClick={() => handleExamLevelChange('general')}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedLevel === 'general'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-medium">General</div>
              <div className="text-sm text-muted-foreground">HF privileges</div>
            </button>
            <button
              onClick={() => handleExamLevelChange('extra')}
              className={`p-4 rounded-lg border-2 text-left transition-all ${
                selectedLevel === 'extra'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="font-medium">Extra</div>
              <div className="text-sm text-muted-foreground">Maximum privileges</div>
            </button>
          </div>
        </CardContent>
      </Card>

      {/* Exam Rules Card */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <CheckCircle2 className="size-5" aria-hidden="true" />
            Exam Rules
          </CardTitle>
          <CardDescription>How the practice exam works</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {examRules.map((rule) => (
              <div key={rule.title} className="flex items-start gap-3">
                <div className="mt-0.5 text-muted-foreground">
                  <rule.icon className="size-5" aria-hidden="true" />
                </div>
                <div>
                  <div className="font-medium text-sm">{rule.title}</div>
                  <div className="text-xs text-muted-foreground">{rule.description}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Start Exam Button */}
      <Button size="lg" className="w-full mb-8" onClick={handleStartExam}>
        Start {examLevelLabel} Exam
        <ChevronRight className="size-5 ml-1" aria-hidden="true" />
      </Button>

      {/* Exam History */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Exam History</h2>
        <ExamHistory examLevel={selectedLevel} limit={5} showStats={true} />
      </div>
    </div>
  )
}

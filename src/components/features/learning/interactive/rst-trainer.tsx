'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Signal, Check, X, RotateCcw, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RSTValue {
  value: number
  meaning: string
  description: string
}

const readabilityScale: RSTValue[] = [
  { value: 1, meaning: 'Unreadable', description: 'Cannot understand anything' },
  { value: 2, meaning: 'Barely readable', description: 'Occasional words distinguishable' },
  {
    value: 3,
    meaning: 'Readable with difficulty',
    description: 'Considerable difficulty, many errors',
  },
  {
    value: 4,
    meaning: 'Readable with practically no difficulty',
    description: 'Small errors occasional',
  },
  { value: 5, meaning: 'Perfectly readable', description: 'Perfect copy, no difficulties' },
]

const strengthScale: RSTValue[] = [
  { value: 1, meaning: 'Faint', description: 'Barely perceptible' },
  { value: 2, meaning: 'Very weak', description: 'Barely detectable' },
  { value: 3, meaning: 'Weak', description: 'Weakly detected' },
  { value: 4, meaning: 'Fair', description: 'Fair signal' },
  { value: 5, meaning: 'Fairly good', description: 'Moderate signal' },
  { value: 6, meaning: 'Good', description: 'Good signal' },
  { value: 7, meaning: 'Moderately strong', description: 'Strong signal' },
  { value: 8, meaning: 'Strong', description: 'Very strong signal' },
  { value: 9, meaning: 'Extremely strong', description: 'Extremely strong signal' },
]

const toneScale: RSTValue[] = [
  { value: 1, meaning: 'Extremely rough hum', description: 'Sixty-cycle AC component' },
  { value: 2, meaning: 'Very rough AC', description: 'Harsh, very rough note' },
  { value: 3, meaning: 'Rough AC tone', description: 'Rough low-pitched tone' },
  { value: 4, meaning: 'Rough note', description: 'Fairly rough note' },
  { value: 5, meaning: 'Filtered rectified AC', description: 'Musically modulated note' },
  { value: 6, meaning: 'Filtered tone', description: 'Trace of modulation' },
  { value: 7, meaning: 'Near DC tone', description: 'Slight trace of ripple' },
  { value: 8, meaning: 'Good DC tone', description: 'Near-perfect DC note' },
  { value: 9, meaning: 'Perfect DC tone', description: 'Perfect tone, no defects' },
]

interface Scenario {
  id: string
  description: string
  context: string
  correctRST: string
  explanation: string
}

const scenarios: Scenario[] = [
  {
    id: '1',
    description: 'A clear, strong SSB signal with no noise',
    context: 'Working a station on 20m with S9 on the meter',
    correctRST: '59',
    explanation: 'Perfectly readable (5) and extremely strong (9). No tone for SSB/FM.',
  },
  {
    id: '2',
    description: 'Weak CW signal but perfectly copyable with a pure tone',
    context: 'DX station on 40m, barely moving the S-meter',
    correctRST: '539',
    explanation:
      'Readable with difficulty due to weakness (5-3 would be 35), but perfect tone (9).',
  },
  {
    id: '3',
    description: 'Strong signal but hard to understand due to QRM',
    context: 'Crowded contest conditions, adjacent signals interfering',
    correctRST: '35',
    explanation: 'Readable with difficulty (3) but strong signal (5). QRM affects readability.',
  },
  {
    id: '4',
    description: 'Excellent CW signal, loud and pure',
    context: 'Local ham on 80m with perfect signal',
    correctRST: '599',
    explanation: 'Perfect readability (5), extremely strong (9), and perfect DC tone (9).',
  },
  {
    id: '5',
    description: 'FM signal through a repeater, full quieting',
    context: 'Local repeater, no noise or static',
    correctRST: '59',
    explanation: 'Perfectly readable and very strong. FM signals are rated on the R-S scale only.',
  },
]

type Mode = 'learn' | 'quiz'

interface QuizState {
  scenario: Scenario
  userRST: string
  answered: boolean
  isCorrect: boolean | null
}

/**
 * Interactive RST Signal Report Trainer
 *
 * Features:
 * - Learn the RST scale meanings
 * - Practice with realistic scenarios
 * - Understand when to use 2 vs 3 digit reports
 * - Exam-relevant tips
 */
export function RSTTrainer() {
  const [mode, setMode] = useState<Mode>('learn')
  const [selectedScale, setSelectedScale] = useState<'R' | 'S' | 'T'>('R')
  const [quiz, setQuiz] = useState<QuizState | null>(null)
  const [inputRST, setInputRST] = useState('')
  const [score, setScore] = useState({ correct: 0, total: 0 })

  // Generate quiz question
  const generateQuestion = useCallback(() => {
    const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)]
    setQuiz({
      scenario: randomScenario,
      userRST: '',
      answered: false,
      isCorrect: null,
    })
    setInputRST('')
  }, [])

  const handleSubmitAnswer = () => {
    if (!quiz || quiz.answered || !inputRST) return

    const isCorrect = inputRST === quiz.scenario.correctRST

    setQuiz({
      ...quiz,
      userRST: inputRST,
      answered: true,
      isCorrect,
    })

    setScore((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }))
  }

  const handleResetQuiz = () => {
    setScore({ correct: 0, total: 0 })
    generateQuestion()
  }

  const startQuiz = () => {
    setMode('quiz')
    generateQuestion()
  }

  const accuracy = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0

  const getScaleData = () => {
    switch (selectedScale) {
      case 'R':
        return { title: 'Readability', data: readabilityScale, max: 5 }
      case 'S':
        return { title: 'Strength', data: strengthScale, max: 9 }
      case 'T':
        return { title: 'Tone (CW only)', data: toneScale, max: 9 }
    }
  }

  const scaleInfo = getScaleData()

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-lg">
            <Signal className="size-5 text-primary" aria-hidden="true" />
            RST Signal Report Trainer
          </span>
          {mode === 'quiz' && (
            <span className="text-sm font-normal text-muted-foreground">
              Score: {score.correct}/{score.total}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mode Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setMode('learn')}
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
              mode === 'learn'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            Learn
          </button>
          <button
            onClick={startQuiz}
            className={cn(
              'px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors',
              mode === 'quiz'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            Practice
          </button>
        </div>

        {/* Learn Mode */}
        {mode === 'learn' && (
          <div className="space-y-6">
            {/* RST Explanation */}
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <h3 className="font-semibold mb-2">What is RST?</h3>
              <p className="text-sm text-muted-foreground">
                <strong>R</strong>eadability (1-5), <strong>S</strong>trength (1-9),{' '}
                <strong>T</strong>one (1-9). SSB/FM uses only RS (two digits). CW uses RST (three
                digits).
              </p>
            </div>

            {/* Scale Selection */}
            <div className="flex gap-2">
              {(['R', 'S', 'T'] as const).map((scale) => (
                <button
                  key={scale}
                  onClick={() => setSelectedScale(scale)}
                  className={cn(
                    'flex-1 px-4 py-3 rounded-lg font-bold text-lg transition-colors',
                    selectedScale === scale
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  )}
                >
                  {scale}
                  <span className="block text-xs font-normal opacity-80">
                    {scale === 'R' && 'Readability'}
                    {scale === 'S' && 'Strength'}
                    {scale === 'T' && 'Tone'}
                  </span>
                </button>
              ))}
            </div>

            {/* Scale Display */}
            <div className="space-y-2">
              <h3 className="font-medium">
                {scaleInfo.title} Scale (1-{scaleInfo.max})
              </h3>
              <div className="space-y-2">
                {scaleInfo.data.map((item) => (
                  <div
                    key={item.value}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30"
                  >
                    <div
                      className={cn(
                        'size-10 rounded-full flex items-center justify-center font-bold text-lg',
                        item.value >= scaleInfo.max * 0.8
                          ? 'bg-green-500 text-white'
                          : item.value >= scaleInfo.max * 0.5
                            ? 'bg-yellow-500 text-white'
                            : 'bg-red-500 text-white'
                      )}
                    >
                      {item.value}
                    </div>
                    <div>
                      <div className="font-medium">{item.meaning}</div>
                      <div className="text-sm text-muted-foreground">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Reference */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-3 text-muted-foreground">Common Reports</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <div className="text-2xl font-bold text-primary">59</div>
                  <div className="text-xs text-muted-foreground">Strong SSB/FM</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <div className="text-2xl font-bold text-primary">599</div>
                  <div className="text-xs text-muted-foreground">Strong CW</div>
                </div>
                <div className="p-3 rounded-lg bg-muted/30 text-center">
                  <div className="text-2xl font-bold text-primary">55</div>
                  <div className="text-xs text-muted-foreground">Moderate SSB</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Mode */}
        {mode === 'quiz' && quiz && (
          <div className="space-y-6">
            {/* Scenario */}
            <div className="p-6 rounded-xl bg-muted/30 border">
              <div className="flex items-start gap-3">
                <Info className="size-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-2">{quiz.scenario.description}</h3>
                  <p className="text-sm text-muted-foreground">{quiz.scenario.context}</p>
                </div>
              </div>
            </div>

            {/* Input */}
            {!quiz.answered && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    What RST report would you give?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputRST}
                      onChange={(e) =>
                        setInputRST(e.target.value.replace(/[^0-9]/g, '').slice(0, 3))
                      }
                      placeholder="e.g., 59 or 599"
                      className="flex-1 px-4 py-3 text-2xl font-mono font-bold text-center border rounded-lg bg-background"
                      maxLength={3}
                    />
                    <Button
                      onClick={handleSubmitAnswer}
                      disabled={!inputRST || inputRST.length < 2}
                      size="lg"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center">
                  Enter 2 digits for SSB/FM (RS) or 3 digits for CW (RST)
                </p>
              </div>
            )}

            {/* Result */}
            {quiz.answered && (
              <div className="space-y-4">
                <div
                  className={cn(
                    'p-4 rounded-lg',
                    quiz.isCorrect
                      ? 'bg-green-50 dark:bg-green-950/30'
                      : 'bg-red-50 dark:bg-red-950/30'
                  )}
                >
                  <div className="flex items-center justify-center gap-3 mb-2">
                    {quiz.isCorrect ? (
                      <>
                        <Check className="size-6 text-green-600" />
                        <span className="text-xl font-bold text-green-700 dark:text-green-300">
                          Correct! {quiz.scenario.correctRST}
                        </span>
                      </>
                    ) : (
                      <>
                        <X className="size-6 text-red-600" />
                        <span className="text-xl font-bold text-red-700 dark:text-red-300">
                          Answer: {quiz.scenario.correctRST} (you said {quiz.userRST})
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-center text-muted-foreground">
                    {quiz.scenario.explanation}
                  </p>
                </div>

                <div className="flex justify-center">
                  <Button onClick={generateQuestion}>Next Scenario</Button>
                </div>
              </div>
            )}

            {/* Stats */}
            {score.total >= 2 && (
              <div className="pt-4 border-t">
                <div className="flex justify-around text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{accuracy}%</div>
                    <div className="text-xs text-muted-foreground">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{score.correct}</div>
                    <div className="text-xs text-muted-foreground">Correct</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{score.total}</div>
                    <div className="text-xs text-muted-foreground">Total</div>
                  </div>
                </div>
              </div>
            )}

            {/* Reset */}
            {score.total > 0 && (
              <div className="flex justify-center">
                <Button variant="outline" onClick={handleResetQuiz}>
                  <RotateCcw className="size-4 mr-2" />
                  Reset Score
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Exam Tips */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Exam Tips</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong>SSB/FM</strong> uses 2 digits (RS only): 59, 55, 33
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong>CW</strong> uses 3 digits (RST): 599, 559, 339
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                <strong>59/599</strong> is a common &quot;perfect&quot; report in contests
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

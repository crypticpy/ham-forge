'use client'

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Cpu, Check, X, RotateCcw, Zap } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CircuitComponent {
  id: string
  name: string
  symbol: string // SVG path or component
  description: string
  function: string
  unit: string
  examTip: string
}

const circuitComponents: CircuitComponent[] = [
  {
    id: 'resistor',
    name: 'Resistor',
    symbol: 'resistor',
    description: 'Opposes the flow of electric current',
    function: 'Limits current flow and divides voltage',
    unit: 'Ohms (Ω)',
    examTip: 'Used in voltage dividers and current limiting circuits',
  },
  {
    id: 'capacitor',
    name: 'Capacitor',
    symbol: 'capacitor',
    description: 'Stores energy in an electric field',
    function: 'Blocks DC, passes AC, filters signals',
    unit: 'Farads (F)',
    examTip: 'Opposition to AC decreases with frequency',
  },
  {
    id: 'inductor',
    name: 'Inductor',
    symbol: 'inductor',
    description: 'Stores energy in a magnetic field',
    function: 'Passes DC, opposes AC changes',
    unit: 'Henrys (H)',
    examTip: 'Opposition to AC increases with frequency',
  },
  {
    id: 'diode',
    name: 'Diode',
    symbol: 'diode',
    description: 'Allows current flow in one direction only',
    function: 'Rectification, signal detection, protection',
    unit: 'Voltage drop (~0.7V silicon)',
    examTip: 'Arrow points in direction of conventional current flow',
  },
  {
    id: 'transistor',
    name: 'Transistor (NPN)',
    symbol: 'transistor',
    description: 'Amplifies or switches electronic signals',
    function: 'Amplification, switching, oscillation',
    unit: 'Current gain (beta/hFE)',
    examTip: 'Three terminals: Base, Collector, Emitter',
  },
  {
    id: 'led',
    name: 'LED',
    symbol: 'led',
    description: 'Light Emitting Diode - emits light when forward biased',
    function: 'Visual indication, lighting',
    unit: 'Forward voltage (1.8-3.3V typical)',
    examTip: 'Arrows pointing away indicate light emission',
  },
]

// SVG symbols for each component
const ComponentSymbol = ({ type, size = 80 }: { type: string; size?: number }) => {
  const strokeWidth = 2
  const color = 'currentColor'

  switch (type) {
    case 'resistor':
      return (
        <svg viewBox="0 0 100 40" width={size} height={size * 0.4} className="text-foreground">
          <line x1="0" y1="20" x2="20" y2="20" stroke={color} strokeWidth={strokeWidth} />
          <polyline
            points="20,20 25,5 35,35 45,5 55,35 65,5 75,35 80,20"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
          />
          <line x1="80" y1="20" x2="100" y2="20" stroke={color} strokeWidth={strokeWidth} />
        </svg>
      )

    case 'capacitor':
      return (
        <svg viewBox="0 0 100 50" width={size} height={size * 0.5} className="text-foreground">
          <line x1="0" y1="25" x2="40" y2="25" stroke={color} strokeWidth={strokeWidth} />
          <line x1="40" y1="5" x2="40" y2="45" stroke={color} strokeWidth={strokeWidth + 1} />
          <line x1="60" y1="5" x2="60" y2="45" stroke={color} strokeWidth={strokeWidth + 1} />
          <line x1="60" y1="25" x2="100" y2="25" stroke={color} strokeWidth={strokeWidth} />
        </svg>
      )

    case 'inductor':
      return (
        <svg viewBox="0 0 100 40" width={size} height={size * 0.4} className="text-foreground">
          <line x1="0" y1="20" x2="15" y2="20" stroke={color} strokeWidth={strokeWidth} />
          <path
            d="M 15 20 Q 20 5, 25 20 Q 30 35, 35 20 Q 40 5, 45 20 Q 50 35, 55 20 Q 60 5, 65 20 Q 70 35, 75 20 Q 80 5, 85 20"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
          />
          <line x1="85" y1="20" x2="100" y2="20" stroke={color} strokeWidth={strokeWidth} />
        </svg>
      )

    case 'diode':
      return (
        <svg viewBox="0 0 100 50" width={size} height={size * 0.5} className="text-foreground">
          <line x1="0" y1="25" x2="35" y2="25" stroke={color} strokeWidth={strokeWidth} />
          <polygon
            points="35,10 35,40 65,25"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
          />
          <line x1="65" y1="10" x2="65" y2="40" stroke={color} strokeWidth={strokeWidth + 1} />
          <line x1="65" y1="25" x2="100" y2="25" stroke={color} strokeWidth={strokeWidth} />
        </svg>
      )

    case 'transistor':
      return (
        <svg viewBox="0 0 80 80" width={size} height={size} className="text-foreground">
          {/* Base */}
          <line x1="0" y1="40" x2="25" y2="40" stroke={color} strokeWidth={strokeWidth} />
          <line x1="25" y1="15" x2="25" y2="65" stroke={color} strokeWidth={strokeWidth + 1} />
          {/* Collector */}
          <line x1="25" y1="25" x2="55" y2="10" stroke={color} strokeWidth={strokeWidth} />
          <line x1="55" y1="10" x2="55" y2="0" stroke={color} strokeWidth={strokeWidth} />
          {/* Emitter with arrow */}
          <line x1="25" y1="55" x2="55" y2="70" stroke={color} strokeWidth={strokeWidth} />
          <line x1="55" y1="70" x2="55" y2="80" stroke={color} strokeWidth={strokeWidth} />
          {/* Arrow on emitter */}
          <polygon points="45,62 55,70 48,70" fill={color} />
          {/* Circle */}
          <circle cx="40" cy="40" r="30" fill="none" stroke={color} strokeWidth={1} />
        </svg>
      )

    case 'led':
      return (
        <svg viewBox="0 0 100 60" width={size} height={size * 0.6} className="text-foreground">
          <line x1="0" y1="30" x2="30" y2="30" stroke={color} strokeWidth={strokeWidth} />
          <polygon
            points="30,15 30,45 60,30"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
          />
          <line x1="60" y1="15" x2="60" y2="45" stroke={color} strokeWidth={strokeWidth + 1} />
          <line x1="60" y1="30" x2="100" y2="30" stroke={color} strokeWidth={strokeWidth} />
          {/* Light arrows */}
          <line x1="50" y1="10" x2="60" y2="0" stroke={color} strokeWidth={1.5} />
          <polygon points="60,0 55,5 58,8" fill={color} />
          <line x1="60" y1="10" x2="70" y2="0" stroke={color} strokeWidth={1.5} />
          <polygon points="70,0 65,5 68,8" fill={color} />
        </svg>
      )

    default:
      return null
  }
}

type Mode = 'learn' | 'quiz'

interface QuizState {
  currentComponent: CircuitComponent
  options: CircuitComponent[]
  answered: boolean
  isCorrect: boolean | null
}

/**
 * Interactive Circuit Component Identifier
 *
 * Features:
 * - Visual schematic symbols
 * - Learn mode with descriptions
 * - Quiz mode to test recognition
 * - Exam-relevant tips
 */
export function CircuitIdentifier() {
  const [mode, setMode] = useState<Mode>('learn')
  const [selectedComponent, setSelectedComponent] = useState<CircuitComponent>(circuitComponents[0])
  const [quiz, setQuiz] = useState<QuizState | null>(null)
  const [score, setScore] = useState({ correct: 0, total: 0 })

  // Generate quiz question
  const generateQuestion = useCallback(() => {
    const randomComponent = circuitComponents[Math.floor(Math.random() * circuitComponents.length)]

    // Get 3 wrong options
    const wrongOptions = circuitComponents
      .filter((c) => c.id !== randomComponent.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)

    const options = [...wrongOptions, randomComponent].sort(() => Math.random() - 0.5)

    setQuiz({
      currentComponent: randomComponent,
      options,
      answered: false,
      isCorrect: null,
    })
  }, [])

  const handleAnswer = (answer: CircuitComponent) => {
    if (!quiz || quiz.answered) return

    const isCorrect = answer.id === quiz.currentComponent.id

    setQuiz({
      ...quiz,
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

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-lg">
            <Cpu className="size-5 text-primary" aria-hidden="true" />
            Circuit Component Identifier
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
            Quiz
          </button>
        </div>

        {/* Learn Mode */}
        {mode === 'learn' && (
          <div className="space-y-6">
            {/* Component Selection */}
            <div className="flex flex-wrap gap-2">
              {circuitComponents.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => setSelectedComponent(comp)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
                    selectedComponent.id === comp.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted hover:bg-muted/80'
                  )}
                >
                  {comp.name}
                </button>
              ))}
            </div>

            {/* Selected Component Display */}
            <div className="p-6 rounded-xl bg-muted/30 border">
              <div className="flex flex-col items-center gap-4">
                {/* Symbol */}
                <div className="p-6 rounded-lg bg-background">
                  <ComponentSymbol type={selectedComponent.symbol} size={120} />
                </div>

                {/* Name */}
                <h3 className="text-2xl font-bold">{selectedComponent.name}</h3>

                {/* Description */}
                <p className="text-center text-muted-foreground">{selectedComponent.description}</p>
              </div>
            </div>

            {/* Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Zap className="size-4 text-primary" />
                  Function
                </h4>
                <p className="text-sm text-muted-foreground">{selectedComponent.function}</p>
              </div>

              <div className="p-4 rounded-lg bg-muted/30">
                <h4 className="font-medium mb-2">Unit of Measure</h4>
                <p className="text-sm text-muted-foreground">{selectedComponent.unit}</p>
              </div>
            </div>

            {/* Exam Tip */}
            <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
              <h4 className="font-medium mb-1 text-amber-800 dark:text-amber-300">Exam Tip</h4>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                {selectedComponent.examTip}
              </p>
            </div>
          </div>
        )}

        {/* Quiz Mode */}
        {mode === 'quiz' && quiz && (
          <div className="space-y-6">
            {/* Question */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-4">Identify this component:</p>
              <div
                className={cn(
                  'inline-flex items-center justify-center p-8 rounded-xl transition-all',
                  quiz.answered
                    ? quiz.isCorrect
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-red-100 dark:bg-red-900/30'
                    : 'bg-muted/30'
                )}
              >
                <ComponentSymbol type={quiz.currentComponent.symbol} size={140} />
              </div>
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-2 gap-3">
              {quiz.options.map((option) => {
                const isCorrectOption = option.id === quiz.currentComponent.id
                const showResult = quiz.answered

                return (
                  <Button
                    key={option.id}
                    variant="outline"
                    size="lg"
                    onClick={() => handleAnswer(option)}
                    disabled={quiz.answered}
                    className={cn(
                      'h-14 text-base transition-all',
                      showResult &&
                        isCorrectOption &&
                        'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300',
                      showResult && !isCorrectOption && 'opacity-50'
                    )}
                  >
                    {option.name}
                    {showResult && isCorrectOption && (
                      <Check className="size-5 ml-2 text-green-600" />
                    )}
                  </Button>
                )
              })}
            </div>

            {/* Result and Next */}
            {quiz.answered && (
              <div className="space-y-4">
                <div
                  className={cn(
                    'p-4 rounded-lg text-center',
                    quiz.isCorrect
                      ? 'bg-green-50 dark:bg-green-950/30'
                      : 'bg-red-50 dark:bg-red-950/30'
                  )}
                >
                  {quiz.isCorrect ? (
                    <div className="flex items-center justify-center gap-2 text-green-700 dark:text-green-300">
                      <Check className="size-5" />
                      <span className="font-semibold">Correct!</span>
                    </div>
                  ) : (
                    <div className="text-red-700 dark:text-red-300">
                      <div className="flex items-center justify-center gap-2">
                        <X className="size-5" />
                        <span className="font-semibold">
                          The correct answer is: {quiz.currentComponent.name}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <p className="text-sm text-center text-muted-foreground">
                  {quiz.currentComponent.description}
                </p>

                <div className="flex justify-center">
                  <Button onClick={generateQuestion}>Next Question</Button>
                </div>
              </div>
            )}

            {/* Stats */}
            {score.total >= 3 && (
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

            {/* Reset Button */}
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

        {/* All Symbols Reference (Learn Mode) */}
        {mode === 'learn' && (
          <div className="pt-4 border-t">
            <h4 className="text-sm font-medium mb-3 text-muted-foreground">
              All Schematic Symbols
            </h4>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {circuitComponents.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => setSelectedComponent(comp)}
                  className={cn(
                    'p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors flex flex-col items-center gap-2',
                    selectedComponent.id === comp.id && 'ring-2 ring-primary'
                  )}
                >
                  <ComponentSymbol type={comp.symbol} size={50} />
                  <span className="text-xs text-center">{comp.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

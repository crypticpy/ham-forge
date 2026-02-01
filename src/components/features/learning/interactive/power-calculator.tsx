'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Zap, RotateCcw, Activity, Battery } from 'lucide-react'
import { cn } from '@/lib/utils'

type SolveFor = 'power' | 'voltage' | 'current' | null

interface CalculationResult {
  value: number
  formula: string
  steps: string
}

interface PracticeScenario {
  description: string
  given: { power?: number; voltage?: number; current?: number }
  find: SolveFor
  hint: string
}

const practiceScenarios: PracticeScenario[] = [
  {
    description: 'A 100W HF transceiver running on 13.8V',
    given: { power: 100, voltage: 13.8 },
    find: 'current',
    hint: 'How much current does the radio draw?',
  },
  {
    description: 'A mobile radio drawing 20A from a 13.8V supply',
    given: { voltage: 13.8, current: 20 },
    find: 'power',
    hint: 'What is the power output?',
  },
  {
    description: 'A 5W QRP radio drawing 1.5A',
    given: { power: 5, current: 1.5 },
    find: 'voltage',
    hint: 'What voltage is the radio operating at?',
  },
  {
    description: 'A handheld radio transmitting 5W at 7.4V battery',
    given: { power: 5, voltage: 7.4 },
    find: 'current',
    hint: 'How much current does it draw when transmitting?',
  },
]

/**
 * Interactive Power Formula Calculator
 *
 * Features:
 * - Visual triangle representation (P = E × I)
 * - Auto-calculation when two values are entered
 * - Step-by-step formula display
 * - Radio-specific practice scenarios
 * - Full keyboard accessibility
 */
export function PowerCalculator() {
  const [power, setPower] = useState<string>('')
  const [voltage, setVoltage] = useState<string>('')
  const [current, setCurrent] = useState<string>('')
  const [solveFor, setSolveFor] = useState<SolveFor>(null)
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [activeScenario, setActiveScenario] = useState<PracticeScenario | null>(null)

  // Calculate when we have exactly 2 values
  const calculate = useCallback(() => {
    const p = parseFloat(power)
    const e = parseFloat(voltage)
    const i = parseFloat(current)

    const hasPower = !isNaN(p) && power !== ''
    const hasVoltage = !isNaN(e) && voltage !== ''
    const hasCurrent = !isNaN(i) && current !== ''

    const valueCount = [hasPower, hasVoltage, hasCurrent].filter(Boolean).length

    if (valueCount !== 2) {
      setResult(null)
      setSolveFor(null)
      return
    }

    if (!hasPower && hasVoltage && hasCurrent) {
      const calculated = e * i
      setSolveFor('power')
      setResult({
        value: calculated,
        formula: 'P = E × I',
        steps: `P = ${e}V × ${i}A = ${calculated.toFixed(2)}W`,
      })
    } else if (hasPower && !hasVoltage && hasCurrent) {
      const calculated = p / i
      setSolveFor('voltage')
      setResult({
        value: calculated,
        formula: 'E = P ÷ I',
        steps: `E = ${p}W ÷ ${i}A = ${calculated.toFixed(2)}V`,
      })
    } else if (hasPower && hasVoltage && !hasCurrent) {
      const calculated = p / e
      setSolveFor('current')
      setResult({
        value: calculated,
        formula: 'I = P ÷ E',
        steps: `I = ${p}W ÷ ${e}V = ${calculated.toFixed(2)}A`,
      })
    }
  }, [power, voltage, current])

  useEffect(() => {
    calculate()
  }, [calculate])

  const handleReset = () => {
    setPower('')
    setVoltage('')
    setCurrent('')
    setResult(null)
    setSolveFor(null)
    setActiveScenario(null)
  }

  const handleTriangleClick = (section: 'power' | 'voltage' | 'current') => {
    switch (section) {
      case 'power':
        setPower('')
        break
      case 'voltage':
        setVoltage('')
        break
      case 'current':
        setCurrent('')
        break
    }
  }

  const loadScenario = (scenario: PracticeScenario) => {
    handleReset()
    setActiveScenario(scenario)
    if (scenario.given.power !== undefined) setPower(scenario.given.power.toString())
    if (scenario.given.voltage !== undefined) setVoltage(scenario.given.voltage.toString())
    if (scenario.given.current !== undefined) setCurrent(scenario.given.current.toString())
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Battery className="size-5 text-primary" aria-hidden="true" />
          Power Formula Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual Triangle */}
        <div
          className="flex justify-center"
          role="img"
          aria-label="Power triangle showing P at top, E and I at bottom"
        >
          <svg viewBox="0 0 200 180" className="w-full max-w-[280px] h-auto" aria-hidden="true">
            {/* Triangle outline */}
            <path
              d="M 100 20 L 180 160 L 20 160 Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-border"
            />

            {/* Horizontal divider */}
            <line
              x1="45"
              y1="100"
              x2="155"
              y2="100"
              stroke="currentColor"
              strokeWidth="2"
              className="text-border"
            />

            {/* Power section (top) */}
            <g
              onClick={() => handleTriangleClick('power')}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTriangleClick('power')}
              aria-label="Click to solve for Power"
            >
              <path
                d="M 100 20 L 155 100 L 45 100 Z"
                className={cn(
                  'transition-colors duration-200',
                  solveFor === 'power'
                    ? 'fill-green-500/30'
                    : 'fill-transparent hover:fill-primary/10'
                )}
              />
              <text
                x="100"
                y="65"
                textAnchor="middle"
                className={cn(
                  'text-2xl font-bold transition-colors',
                  solveFor === 'power' ? 'fill-green-600 dark:fill-green-400' : 'fill-current'
                )}
              >
                P
              </text>
              <text x="100" y="82" textAnchor="middle" className="text-xs fill-muted-foreground">
                Power (W)
              </text>
            </g>

            {/* Voltage section (bottom left) */}
            <g
              onClick={() => handleTriangleClick('voltage')}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTriangleClick('voltage')}
              aria-label="Click to solve for Voltage"
            >
              <path
                d="M 45 100 L 20 160 L 100 160 L 100 100 Z"
                className={cn(
                  'transition-colors duration-200',
                  solveFor === 'voltage'
                    ? 'fill-green-500/30'
                    : 'fill-transparent hover:fill-primary/10'
                )}
              />
              <text
                x="60"
                y="135"
                textAnchor="middle"
                className={cn(
                  'text-2xl font-bold transition-colors',
                  solveFor === 'voltage' ? 'fill-green-600 dark:fill-green-400' : 'fill-current'
                )}
              >
                E
              </text>
              <text x="60" y="152" textAnchor="middle" className="text-xs fill-muted-foreground">
                Voltage (V)
              </text>
            </g>

            {/* Multiplication symbol */}
            <text x="100" y="140" textAnchor="middle" className="text-xl fill-muted-foreground">
              ×
            </text>

            {/* Current section (bottom right) */}
            <g
              onClick={() => handleTriangleClick('current')}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTriangleClick('current')}
              aria-label="Click to solve for Current"
            >
              <path
                d="M 100 100 L 100 160 L 180 160 L 155 100 Z"
                className={cn(
                  'transition-colors duration-200',
                  solveFor === 'current'
                    ? 'fill-green-500/30'
                    : 'fill-transparent hover:fill-primary/10'
                )}
              />
              <text
                x="140"
                y="135"
                textAnchor="middle"
                className={cn(
                  'text-2xl font-bold transition-colors',
                  solveFor === 'current' ? 'fill-green-600 dark:fill-green-400' : 'fill-current'
                )}
              >
                I
              </text>
              <text x="140" y="152" textAnchor="middle" className="text-xs fill-muted-foreground">
                Current (A)
              </text>
            </g>
          </svg>
        </div>

        {/* Instructions or Scenario */}
        {activeScenario ? (
          <div className="p-4 rounded-lg bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
            <p className="font-medium text-blue-900 dark:text-blue-100">
              {activeScenario.description}
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">{activeScenario.hint}</p>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground text-center">
            Click a section of the triangle to solve for that value, or enter any two values below.
          </p>
        )}

        {/* Input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Power Input */}
          <div className="space-y-2">
            <Label
              htmlFor="power-input"
              className={cn(
                'flex items-center gap-2 text-sm font-medium',
                solveFor === 'power' && 'text-green-600 dark:text-green-400'
              )}
            >
              <Zap className="size-4" aria-hidden="true" />
              Power (P)
            </Label>
            <div className="relative">
              <Input
                id="power-input"
                type="number"
                step="any"
                placeholder={solveFor === 'power' ? result?.value.toFixed(2) : '0'}
                value={power}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPower(e.target.value)}
                className={cn(
                  'pr-8',
                  solveFor === 'power' &&
                    'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300'
                )}
                disabled={solveFor === 'power'}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                W
              </span>
            </div>
          </div>

          {/* Voltage Input */}
          <div className="space-y-2">
            <Label
              htmlFor="voltage-input"
              className={cn(
                'flex items-center gap-2 text-sm font-medium',
                solveFor === 'voltage' && 'text-green-600 dark:text-green-400'
              )}
            >
              <Battery className="size-4" aria-hidden="true" />
              Voltage (E)
            </Label>
            <div className="relative">
              <Input
                id="voltage-input"
                type="number"
                step="any"
                placeholder={solveFor === 'voltage' ? result?.value.toFixed(2) : '0'}
                value={voltage}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setVoltage(e.target.value)}
                className={cn(
                  'pr-8',
                  solveFor === 'voltage' &&
                    'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300'
                )}
                disabled={solveFor === 'voltage'}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                V
              </span>
            </div>
          </div>

          {/* Current Input */}
          <div className="space-y-2">
            <Label
              htmlFor="current-input"
              className={cn(
                'flex items-center gap-2 text-sm font-medium',
                solveFor === 'current' && 'text-green-600 dark:text-green-400'
              )}
            >
              <Activity className="size-4" aria-hidden="true" />
              Current (I)
            </Label>
            <div className="relative">
              <Input
                id="current-input"
                type="number"
                step="any"
                placeholder={solveFor === 'current' ? result?.value.toFixed(2) : '0'}
                value={current}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrent(e.target.value)}
                className={cn(
                  'pr-8',
                  solveFor === 'current' &&
                    'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300'
                )}
                disabled={solveFor === 'current'}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                A
              </span>
            </div>
          </div>
        </div>

        {/* Result display */}
        {result && (
          <div
            className="p-4 rounded-lg bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800"
            role="region"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50">
                <Zap className="size-5 text-green-600 dark:text-green-400" aria-hidden="true" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-green-900 dark:text-green-100 mb-1">
                  {solveFor === 'power' && 'Power'}
                  {solveFor === 'voltage' && 'Voltage'}
                  {solveFor === 'current' && 'Current'} = {result.value.toFixed(2)}{' '}
                  {solveFor === 'power' && 'W'}
                  {solveFor === 'voltage' && 'V'}
                  {solveFor === 'current' && 'A'}
                </div>
                <div className="text-sm text-green-800 dark:text-green-200 space-y-1">
                  <div>
                    <span className="font-medium">Formula:</span> {result.formula}
                  </div>
                  <div>
                    <span className="font-medium">Calculation:</span> {result.steps}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reset button */}
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleReset} className="min-w-[120px]">
            <RotateCcw className="size-4 mr-2" aria-hidden="true" />
            Reset
          </Button>
        </div>

        {/* Practice Scenarios */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">
            Practice Scenarios (click to try)
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {practiceScenarios.map((scenario, index) => (
              <button
                key={index}
                onClick={() => loadScenario(scenario)}
                className={cn(
                  'p-3 rounded-lg text-left transition-colors border',
                  activeScenario === scenario
                    ? 'border-primary bg-primary/5'
                    : 'border-border bg-muted/30 hover:bg-muted/50'
                )}
              >
                <div className="text-sm font-medium">{scenario.description}</div>
                <div className="text-xs text-muted-foreground mt-1">{scenario.hint}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Quick reference */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Quick Reference</h4>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="p-2 rounded bg-muted/50">
              <div className="font-mono font-semibold">P = E × I</div>
              <div className="text-xs text-muted-foreground">Find Power</div>
            </div>
            <div className="p-2 rounded bg-muted/50">
              <div className="font-mono font-semibold">E = P ÷ I</div>
              <div className="text-xs text-muted-foreground">Find Voltage</div>
            </div>
            <div className="p-2 rounded bg-muted/50">
              <div className="font-mono font-semibold">I = P ÷ E</div>
              <div className="text-xs text-muted-foreground">Find Current</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

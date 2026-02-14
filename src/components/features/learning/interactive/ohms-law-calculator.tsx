'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calculator, RotateCcw, Zap, Gauge, Activity } from 'lucide-react'
import { cn } from '@/lib/utils'

type SolveFor = 'voltage' | 'current' | 'resistance' | null

interface CalculationResult {
  value: number
  formula: string
  steps: string
}

/**
 * Interactive Ohm's Law Calculator
 *
 * Features:
 * - Visual triangle representation
 * - Auto-calculation when two values are entered
 * - Step-by-step formula display
 * - Practice problem mode
 * - Full keyboard accessibility
 */
export function OhmsLawCalculator() {
  const [voltage, setVoltage] = useState<string>('')
  const [current, setCurrent] = useState<string>('')
  const [resistance, setResistance] = useState<string>('')
  const [activeSection, setActiveSection] = useState<'voltage' | 'current' | 'resistance' | null>(
    null
  )

  const calculation = useMemo((): { solveFor: SolveFor; result: CalculationResult } | null => {
    const v = parseFloat(voltage)
    const i = parseFloat(current)
    const r = parseFloat(resistance)

    const hasVoltage = !isNaN(v) && voltage !== ''
    const hasCurrent = !isNaN(i) && current !== ''
    const hasResistance = !isNaN(r) && resistance !== ''

    // Count how many values we have
    const valueCount = [hasVoltage, hasCurrent, hasResistance].filter(Boolean).length

    if (valueCount !== 2) {
      return null
    }

    // Calculate the missing value
    if (!hasVoltage && hasCurrent && hasResistance) {
      const calculated = i * r
      return {
        solveFor: 'voltage',
        result: {
          value: calculated,
          formula: 'E = I × R',
          steps: `E = ${i} A × ${r} Ω = ${calculated.toFixed(2)} V`,
        },
      }
    }
    if (hasVoltage && !hasCurrent && hasResistance) {
      const calculated = v / r
      return {
        solveFor: 'current',
        result: {
          value: calculated,
          formula: 'I = E ÷ R',
          steps: `I = ${v} V ÷ ${r} Ω = ${calculated.toFixed(3)} A`,
        },
      }
    }
    if (hasVoltage && hasCurrent && !hasResistance) {
      const calculated = v / i
      return {
        solveFor: 'resistance',
        result: {
          value: calculated,
          formula: 'R = E ÷ I',
          steps: `R = ${v} V ÷ ${i} A = ${calculated.toFixed(2)} Ω`,
        },
      }
    }

    return null
  }, [voltage, current, resistance])

  const solveFor = calculation?.solveFor ?? null
  const result = calculation?.result ?? null

  const handleReset = () => {
    setVoltage('')
    setCurrent('')
    setResistance('')
    setActiveSection(null)
  }

  const handleTriangleClick = (section: 'voltage' | 'current' | 'resistance') => {
    setActiveSection(section)
    // Clear the clicked section to solve for it
    switch (section) {
      case 'voltage':
        setVoltage('')
        break
      case 'current':
        setCurrent('')
        break
      case 'resistance':
        setResistance('')
        break
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Calculator className="size-5 text-primary" aria-hidden="true" />
          Ohm&apos;s Law Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Visual Triangle */}
        <div
          className="flex justify-center"
          role="img"
          aria-label="Ohm&apos;s Law triangle showing E at top, I and R at bottom"
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

            {/* Voltage section (top) */}
            <g
              onClick={() => handleTriangleClick('voltage')}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTriangleClick('voltage')}
              aria-label="Click to solve for Voltage"
            >
              <path
                d="M 100 20 L 155 100 L 45 100 Z"
                className={cn(
                  'transition-colors duration-200',
                  solveFor === 'voltage'
                    ? 'fill-green-500/30'
                    : activeSection === 'voltage'
                      ? 'fill-primary/20'
                      : 'fill-transparent hover:fill-primary/10'
                )}
              />
              <text
                x="100"
                y="65"
                textAnchor="middle"
                className={cn(
                  'text-2xl font-bold transition-colors',
                  solveFor === 'voltage' ? 'fill-green-600 dark:fill-green-400' : 'fill-current'
                )}
              >
                E
              </text>
              <text x="100" y="82" textAnchor="middle" className="text-xs fill-muted-foreground">
                Voltage
              </text>
            </g>

            {/* Current section (bottom left) */}
            <g
              onClick={() => handleTriangleClick('current')}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTriangleClick('current')}
              aria-label="Click to solve for Current"
            >
              <path
                d="M 45 100 L 20 160 L 100 160 L 100 100 Z"
                className={cn(
                  'transition-colors duration-200',
                  solveFor === 'current'
                    ? 'fill-green-500/30'
                    : activeSection === 'current'
                      ? 'fill-primary/20'
                      : 'fill-transparent hover:fill-primary/10'
                )}
              />
              <text
                x="60"
                y="135"
                textAnchor="middle"
                className={cn(
                  'text-2xl font-bold transition-colors',
                  solveFor === 'current' ? 'fill-green-600 dark:fill-green-400' : 'fill-current'
                )}
              >
                I
              </text>
              <text x="60" y="152" textAnchor="middle" className="text-xs fill-muted-foreground">
                Current
              </text>
            </g>

            {/* Multiplication symbol */}
            <text x="100" y="140" textAnchor="middle" className="text-xl fill-muted-foreground">
              ×
            </text>

            {/* Resistance section (bottom right) */}
            <g
              onClick={() => handleTriangleClick('resistance')}
              className="cursor-pointer"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleTriangleClick('resistance')}
              aria-label="Click to solve for Resistance"
            >
              <path
                d="M 100 100 L 100 160 L 180 160 L 155 100 Z"
                className={cn(
                  'transition-colors duration-200',
                  solveFor === 'resistance'
                    ? 'fill-green-500/30'
                    : activeSection === 'resistance'
                      ? 'fill-primary/20'
                      : 'fill-transparent hover:fill-primary/10'
                )}
              />
              <text
                x="140"
                y="135"
                textAnchor="middle"
                className={cn(
                  'text-2xl font-bold transition-colors',
                  solveFor === 'resistance' ? 'fill-green-600 dark:fill-green-400' : 'fill-current'
                )}
              >
                R
              </text>
              <text x="140" y="152" textAnchor="middle" className="text-xs fill-muted-foreground">
                Resistance
              </text>
            </g>
          </svg>
        </div>

        {/* Instructions */}
        <p className="text-sm text-muted-foreground text-center">
          Click a section of the triangle to solve for that value, or enter any two values below.
        </p>

        {/* Input fields */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Voltage Input */}
          <div className="space-y-2">
            <Label
              htmlFor="voltage"
              className={cn(
                'flex items-center gap-2 text-sm font-medium',
                solveFor === 'voltage' && 'text-green-600 dark:text-green-400'
              )}
            >
              <Zap className="size-4" aria-hidden="true" />
              Voltage (E)
            </Label>
            <div className="relative">
              <Input
                id="voltage"
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
                aria-describedby="voltage-unit"
                disabled={solveFor === 'voltage'}
              />
              <span
                id="voltage-unit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
              >
                V
              </span>
            </div>
          </div>

          {/* Current Input */}
          <div className="space-y-2">
            <Label
              htmlFor="current"
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
                id="current"
                type="number"
                step="any"
                placeholder={solveFor === 'current' ? result?.value.toFixed(3) : '0'}
                value={current}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrent(e.target.value)}
                className={cn(
                  'pr-8',
                  solveFor === 'current' &&
                    'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300'
                )}
                aria-describedby="current-unit"
                disabled={solveFor === 'current'}
              />
              <span
                id="current-unit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
              >
                A
              </span>
            </div>
          </div>

          {/* Resistance Input */}
          <div className="space-y-2">
            <Label
              htmlFor="resistance"
              className={cn(
                'flex items-center gap-2 text-sm font-medium',
                solveFor === 'resistance' && 'text-green-600 dark:text-green-400'
              )}
            >
              <Gauge className="size-4" aria-hidden="true" />
              Resistance (R)
            </Label>
            <div className="relative">
              <Input
                id="resistance"
                type="number"
                step="any"
                placeholder={solveFor === 'resistance' ? result?.value.toFixed(2) : '0'}
                value={resistance}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setResistance(e.target.value)}
                className={cn(
                  'pr-8',
                  solveFor === 'resistance' &&
                    'border-green-500 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-300'
                )}
                aria-describedby="resistance-unit"
                disabled={solveFor === 'resistance'}
              />
              <span
                id="resistance-unit"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground"
              >
                Ω
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
            aria-label="Calculation result"
          >
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/50">
                <Calculator
                  className="size-5 text-green-600 dark:text-green-400"
                  aria-hidden="true"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-green-900 dark:text-green-100 mb-1">
                  {solveFor === 'voltage' && 'Voltage'}
                  {solveFor === 'current' && 'Current'}
                  {solveFor === 'resistance' && 'Resistance'} ={' '}
                  {result.value.toFixed(solveFor === 'current' ? 3 : 2)}{' '}
                  {solveFor === 'voltage' && 'V'}
                  {solveFor === 'current' && 'A'}
                  {solveFor === 'resistance' && 'Ω'}
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

        {/* Quick reference */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Quick Reference</h4>
          <div className="grid grid-cols-3 gap-2 text-center text-sm">
            <div className="p-2 rounded bg-muted/50">
              <div className="font-mono font-semibold">E = I × R</div>
              <div className="text-xs text-muted-foreground">Find Voltage</div>
            </div>
            <div className="p-2 rounded bg-muted/50">
              <div className="font-mono font-semibold">I = E ÷ R</div>
              <div className="text-xs text-muted-foreground">Find Current</div>
            </div>
            <div className="p-2 rounded bg-muted/50">
              <div className="font-mono font-semibold">R = E ÷ I</div>
              <div className="text-xs text-muted-foreground">Find Resistance</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

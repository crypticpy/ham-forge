'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { TrendingUp, TrendingDown, RotateCcw, Zap, Calculator } from 'lucide-react'
import { cn } from '@/lib/utils'

type CalculationMode = 'power-to-db' | 'db-to-power'

interface QuickConversion {
  dB: number
  ratio: string
  description: string
}

const quickConversions: QuickConversion[] = [
  { dB: 3, ratio: '2×', description: 'Power doubles' },
  { dB: 6, ratio: '4×', description: 'Power quadruples' },
  { dB: 10, ratio: '10×', description: 'Power × 10' },
  { dB: 20, ratio: '100×', description: 'Power × 100' },
  { dB: -3, ratio: '0.5×', description: 'Power halves' },
  { dB: -6, ratio: '0.25×', description: 'Power quartered' },
  { dB: -10, ratio: '0.1×', description: 'Power ÷ 10' },
]

/**
 * Interactive Decibel Calculator
 *
 * Features:
 * - Convert between power ratio and dB
 * - Visualize dB changes with power bars
 * - Quick reference for common values
 * - Practice mode with real-world scenarios
 */
export function DecibelCalculator() {
  const [mode, setMode] = useState<CalculationMode>('power-to-db')
  const [power1, setPower1] = useState<string>('')
  const [power2, setPower2] = useState<string>('')
  const [dB, setDB] = useState<string>('')
  const [result, setResult] = useState<{ value: number; formula: string } | null>(null)

  // Calculate based on mode
  const calculate = useCallback(() => {
    if (mode === 'power-to-db') {
      const p1 = parseFloat(power1)
      const p2 = parseFloat(power2)

      if (!isNaN(p1) && !isNaN(p2) && p1 > 0 && p2 > 0) {
        const dbValue = 10 * Math.log10(p2 / p1)
        setResult({
          value: dbValue,
          formula: `dB = 10 × log₁₀(${p2}W ÷ ${p1}W) = ${dbValue.toFixed(2)} dB`,
        })
      } else {
        setResult(null)
      }
    } else {
      const p1 = parseFloat(power1)
      const dbValue = parseFloat(dB)

      if (!isNaN(p1) && !isNaN(dbValue) && p1 > 0) {
        const p2Value = p1 * Math.pow(10, dbValue / 10)
        setResult({
          value: p2Value,
          formula: `P₂ = ${p1}W × 10^(${dbValue}/10) = ${p2Value.toFixed(2)}W`,
        })
      } else {
        setResult(null)
      }
    }
  }, [mode, power1, power2, dB])

  useEffect(() => {
    calculate()
  }, [calculate])

  const handleReset = () => {
    setPower1('')
    setPower2('')
    setDB('')
    setResult(null)
  }

  const applyQuickConversion = (conversion: QuickConversion) => {
    setMode('db-to-power')
    setPower1('1')
    setDB(conversion.dB.toString())
  }

  // Calculate visual bar width based on power ratio
  const getBarWidth = (power: number, reference: number): number => {
    if (power <= 0 || reference <= 0) return 0
    const ratio = power / reference
    // Use logarithmic scale, cap at 100%
    const width = Math.min(100, Math.max(5, (Math.log10(ratio) + 1) * 50))
    return width
  }

  const p1Value = parseFloat(power1) || 0
  const p2Value = mode === 'power-to-db' ? parseFloat(power2) || 0 : result?.value || 0

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <TrendingUp className="size-5 text-primary" aria-hidden="true" />
          Decibel Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mode Selection */}
        <div className="flex border rounded-lg p-1 bg-muted/50">
          <button
            onClick={() => {
              setMode('power-to-db')
              handleReset()
            }}
            className={cn(
              'flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors',
              mode === 'power-to-db'
                ? 'bg-background shadow text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Power → dB
          </button>
          <button
            onClick={() => {
              setMode('db-to-power')
              handleReset()
            }}
            className={cn(
              'flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors',
              mode === 'db-to-power'
                ? 'bg-background shadow text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            dB → Power
          </button>
        </div>

        {/* Power to dB Mode */}
        {mode === 'power-to-db' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter two power values to calculate the dB difference.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="power1-p2db" className="flex items-center gap-2">
                  <Zap className="size-4 text-muted-foreground" />
                  Initial Power (P₁)
                </Label>
                <div className="relative">
                  <Input
                    id="power1-p2db"
                    type="number"
                    step="any"
                    min="0"
                    placeholder="e.g., 5"
                    value={power1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPower1(e.target.value)}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    W
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="power2-p2db" className="flex items-center gap-2">
                  <Zap className="size-4 text-muted-foreground" />
                  Final Power (P₂)
                </Label>
                <div className="relative">
                  <Input
                    id="power2-p2db"
                    type="number"
                    step="any"
                    min="0"
                    placeholder="e.g., 10"
                    value={power2}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPower2(e.target.value)}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    W
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* dB to Power Mode */}
        {mode === 'db-to-power' && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter initial power and dB change to calculate the final power.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="power1-db2p" className="flex items-center gap-2">
                  <Zap className="size-4 text-muted-foreground" />
                  Initial Power (P₁)
                </Label>
                <div className="relative">
                  <Input
                    id="power1-db2p"
                    type="number"
                    step="any"
                    min="0"
                    placeholder="e.g., 5"
                    value={power1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPower1(e.target.value)}
                    className="pr-8"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    W
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="db-change" className="flex items-center gap-2">
                  {parseFloat(dB) >= 0 ? (
                    <TrendingUp className="size-4 text-green-600" />
                  ) : (
                    <TrendingDown className="size-4 text-red-600" />
                  )}
                  dB Change
                </Label>
                <div className="relative">
                  <Input
                    id="db-change"
                    type="number"
                    step="any"
                    placeholder="e.g., 3"
                    value={dB}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDB(e.target.value)}
                    className="pr-10"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                    dB
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visual Power Comparison */}
        {p1Value > 0 && (mode === 'power-to-db' ? p2Value > 0 : result) && (
          <div className="space-y-3 p-4 rounded-lg bg-muted/30">
            <h4 className="text-sm font-medium">Power Comparison</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-8">P₁</span>
                <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 transition-all duration-300"
                    style={{ width: `${getBarWidth(p1Value, Math.max(p1Value, p2Value))}%` }}
                  />
                </div>
                <span className="text-sm font-mono w-20 text-right">{p1Value.toFixed(1)}W</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-8">P₂</span>
                <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full transition-all duration-300',
                      p2Value >= p1Value ? 'bg-green-500' : 'bg-red-500'
                    )}
                    style={{ width: `${getBarWidth(p2Value, Math.max(p1Value, p2Value))}%` }}
                  />
                </div>
                <span className="text-sm font-mono w-20 text-right">{p2Value.toFixed(1)}W</span>
              </div>
            </div>
          </div>
        )}

        {/* Result Display */}
        {result && (
          <div
            className={cn(
              'p-4 rounded-lg border',
              result.value >= 0
                ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                : 'bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-800'
            )}
            role="region"
            aria-live="polite"
          >
            <div className="flex items-start gap-3">
              <div
                className={cn(
                  'p-2 rounded-full',
                  result.value >= 0
                    ? 'bg-green-100 dark:bg-green-900/50'
                    : 'bg-red-100 dark:bg-red-900/50'
                )}
              >
                <Calculator
                  className={cn(
                    'size-5',
                    result.value >= 0
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  )}
                />
              </div>
              <div className="flex-1">
                <div
                  className={cn(
                    'font-semibold mb-1',
                    result.value >= 0
                      ? 'text-green-900 dark:text-green-100'
                      : 'text-red-900 dark:text-red-100'
                  )}
                >
                  {mode === 'power-to-db' ? (
                    <>
                      {result.value >= 0 ? '+' : ''}
                      {result.value.toFixed(2)} dB
                    </>
                  ) : (
                    <>{result.value.toFixed(2)} W</>
                  )}
                </div>
                <div
                  className={cn(
                    'text-sm',
                    result.value >= 0
                      ? 'text-green-800 dark:text-green-200'
                      : 'text-red-800 dark:text-red-200'
                  )}
                >
                  <span className="font-medium">Formula:</span> {result.formula}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Reference */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">
            Quick Reference (click to try)
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {quickConversions.slice(0, 4).map((conv) => (
              <button
                key={conv.dB}
                onClick={() => applyQuickConversion(conv)}
                className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
              >
                <div className="font-mono font-semibold text-green-600 dark:text-green-400">
                  +{conv.dB} dB
                </div>
                <div className="text-xs text-muted-foreground">{conv.description}</div>
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {quickConversions.slice(4).map((conv) => (
              <button
                key={conv.dB}
                onClick={() => applyQuickConversion(conv)}
                className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors text-left"
              >
                <div className="font-mono font-semibold text-red-600 dark:text-red-400">
                  {conv.dB} dB
                </div>
                <div className="text-xs text-muted-foreground">{conv.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <div className="flex justify-center">
          <Button variant="outline" onClick={handleReset} className="min-w-[120px]">
            <RotateCcw className="size-4 mr-2" aria-hidden="true" />
            Reset
          </Button>
        </div>

        {/* Exam Tips */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Exam Tips</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-green-600 font-bold">+3</span>
              <span>
                dB = power <strong>doubles</strong> (memorize this!)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-green-600 font-bold">+10</span>
              <span>
                dB = power increases <strong>10×</strong>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-600 font-bold">-3</span>
              <span>
                dB = power <strong>halves</strong>
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-red-600 font-bold">-6</span>
              <span>
                dB = power drops to <strong>1/4</strong> (two halvings)
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

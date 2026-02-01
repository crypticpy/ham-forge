'use client'

import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Radio, RotateCcw, Waves } from 'lucide-react'
import { cn } from '@/lib/utils'

interface BandInfo {
  name: string
  wavelength: string
  freqStart: number
  freqEnd: number
  color: string
}

const amateurBands: BandInfo[] = [
  { name: '160m', wavelength: '160 meters', freqStart: 1.8, freqEnd: 2.0, color: 'bg-violet-500' },
  { name: '80m', wavelength: '80 meters', freqStart: 3.5, freqEnd: 4.0, color: 'bg-indigo-500' },
  { name: '40m', wavelength: '40 meters', freqStart: 7.0, freqEnd: 7.3, color: 'bg-blue-500' },
  { name: '30m', wavelength: '30 meters', freqStart: 10.1, freqEnd: 10.15, color: 'bg-cyan-500' },
  { name: '20m', wavelength: '20 meters', freqStart: 14.0, freqEnd: 14.35, color: 'bg-teal-500' },
  {
    name: '17m',
    wavelength: '17 meters',
    freqStart: 18.068,
    freqEnd: 18.168,
    color: 'bg-green-500',
  },
  { name: '15m', wavelength: '15 meters', freqStart: 21.0, freqEnd: 21.45, color: 'bg-lime-500' },
  {
    name: '12m',
    wavelength: '12 meters',
    freqStart: 24.89,
    freqEnd: 24.99,
    color: 'bg-yellow-500',
  },
  { name: '10m', wavelength: '10 meters', freqStart: 28.0, freqEnd: 29.7, color: 'bg-orange-500' },
  { name: '6m', wavelength: '6 meters', freqStart: 50.0, freqEnd: 54.0, color: 'bg-red-500' },
  { name: '2m', wavelength: '2 meters', freqStart: 144.0, freqEnd: 148.0, color: 'bg-pink-500' },
  {
    name: '70cm',
    wavelength: '70 centimeters',
    freqStart: 420.0,
    freqEnd: 450.0,
    color: 'bg-purple-500',
  },
]

type ConversionMode = 'freq-to-wavelength' | 'wavelength-to-freq'

/**
 * Interactive Frequency-Wavelength Converter
 *
 * Features:
 * - Bidirectional conversion (frequency ↔ wavelength)
 * - Identifies amateur radio bands
 * - Visual band display
 * - Metric prefix support
 * - Real-time calculation as you type
 */
export function FrequencyWavelengthConverter() {
  const [mode, setMode] = useState<ConversionMode>('freq-to-wavelength')
  const [frequency, setFrequency] = useState<string>('')
  const [frequencyUnit, setFrequencyUnit] = useState<'MHz' | 'kHz' | 'Hz'>('MHz')
  const [wavelength, setWavelength] = useState<string>('')
  const [wavelengthUnit, setWavelengthUnit] = useState<'m' | 'cm' | 'mm'>('m')
  const [result, setResult] = useState<{
    value: number
    unit: string
    formula: string
    band: BandInfo | null
  } | null>(null)

  // Convert frequency to MHz
  const toMHz = useCallback((value: number, unit: 'MHz' | 'kHz' | 'Hz'): number => {
    switch (unit) {
      case 'Hz':
        return value / 1_000_000
      case 'kHz':
        return value / 1_000
      default:
        return value
    }
  }, [])

  // Convert wavelength to meters
  const toMeters = useCallback((value: number, unit: 'm' | 'cm' | 'mm'): number => {
    switch (unit) {
      case 'cm':
        return value / 100
      case 'mm':
        return value / 1000
      default:
        return value
    }
  }, [])

  // Find which amateur band a frequency falls into
  const findBand = useCallback((freqMHz: number): BandInfo | null => {
    return amateurBands.find((band) => freqMHz >= band.freqStart && freqMHz <= band.freqEnd) || null
  }, [])

  // Calculate based on mode
  const calculate = useCallback(() => {
    if (mode === 'freq-to-wavelength') {
      const freqValue = parseFloat(frequency)
      if (isNaN(freqValue) || freqValue <= 0) {
        setResult(null)
        return
      }

      const freqMHz = toMHz(freqValue, frequencyUnit)
      const wavelengthM = 300 / freqMHz
      const band = findBand(freqMHz)

      // Choose best unit for display
      let displayValue: number
      let displayUnit: string
      if (wavelengthM >= 1) {
        displayValue = wavelengthM
        displayUnit = 'm'
      } else if (wavelengthM >= 0.01) {
        displayValue = wavelengthM * 100
        displayUnit = 'cm'
      } else {
        displayValue = wavelengthM * 1000
        displayUnit = 'mm'
      }

      setResult({
        value: displayValue,
        unit: displayUnit,
        formula: `λ = 300 ÷ ${freqMHz.toFixed(3)} MHz = ${wavelengthM.toFixed(3)} m`,
        band,
      })
    } else {
      const wavelengthValue = parseFloat(wavelength)
      if (isNaN(wavelengthValue) || wavelengthValue <= 0) {
        setResult(null)
        return
      }

      const wavelengthM = toMeters(wavelengthValue, wavelengthUnit)
      const freqMHz = 300 / wavelengthM
      const band = findBand(freqMHz)

      // Choose best unit for display
      let displayValue: number
      let displayUnit: string
      if (freqMHz >= 1000) {
        displayValue = freqMHz / 1000
        displayUnit = 'GHz'
      } else if (freqMHz >= 1) {
        displayValue = freqMHz
        displayUnit = 'MHz'
      } else {
        displayValue = freqMHz * 1000
        displayUnit = 'kHz'
      }

      setResult({
        value: displayValue,
        unit: displayUnit,
        formula: `f = 300 ÷ ${wavelengthM.toFixed(3)} m = ${freqMHz.toFixed(3)} MHz`,
        band,
      })
    }
  }, [mode, frequency, frequencyUnit, wavelength, wavelengthUnit, toMHz, toMeters, findBand])

  useEffect(() => {
    calculate()
  }, [calculate])

  const handleReset = () => {
    setFrequency('')
    setWavelength('')
    setResult(null)
  }

  const selectBand = (band: BandInfo) => {
    setMode('freq-to-wavelength')
    const midFreq = (band.freqStart + band.freqEnd) / 2
    setFrequency(midFreq.toFixed(3))
    setFrequencyUnit('MHz')
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Waves className="size-5 text-primary" aria-hidden="true" />
          Frequency-Wavelength Converter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mode Selection */}
        <div className="flex border rounded-lg p-1 bg-muted/50">
          <button
            onClick={() => {
              setMode('freq-to-wavelength')
              handleReset()
            }}
            className={cn(
              'flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2',
              mode === 'freq-to-wavelength'
                ? 'bg-background shadow text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Radio className="size-4" />
            Frequency → Wavelength
          </button>
          <button
            onClick={() => {
              setMode('wavelength-to-freq')
              handleReset()
            }}
            className={cn(
              'flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors flex items-center justify-center gap-2',
              mode === 'wavelength-to-freq'
                ? 'bg-background shadow text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Waves className="size-4" />
            Wavelength → Frequency
          </button>
        </div>

        {/* Formula Display */}
        <div className="p-4 rounded-lg bg-muted/50 text-center">
          <div className="text-lg font-mono font-semibold">λ (meters) = 300 ÷ f (MHz)</div>
          <div className="text-sm text-muted-foreground mt-1">
            Wavelength in meters equals 300 divided by frequency in megahertz
          </div>
        </div>

        {/* Input Area */}
        <div className="space-y-4">
          {mode === 'freq-to-wavelength' ? (
            <div className="space-y-2">
              <Label htmlFor="frequency-input" className="flex items-center gap-2">
                <Radio className="size-4 text-muted-foreground" />
                Frequency
              </Label>
              <div className="flex gap-2">
                <Input
                  id="frequency-input"
                  type="number"
                  step="any"
                  min="0"
                  placeholder="e.g., 146"
                  value={frequency}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFrequency(e.target.value)
                  }
                  className="flex-1"
                />
                <select
                  value={frequencyUnit}
                  onChange={(e) => setFrequencyUnit(e.target.value as 'MHz' | 'kHz' | 'Hz')}
                  className="px-3 py-2 border rounded-md bg-background text-sm"
                  aria-label="Frequency unit"
                >
                  <option value="Hz">Hz</option>
                  <option value="kHz">kHz</option>
                  <option value="MHz">MHz</option>
                </select>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="wavelength-input" className="flex items-center gap-2">
                <Waves className="size-4 text-muted-foreground" />
                Wavelength
              </Label>
              <div className="flex gap-2">
                <Input
                  id="wavelength-input"
                  type="number"
                  step="any"
                  min="0"
                  placeholder="e.g., 2"
                  value={wavelength}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setWavelength(e.target.value)
                  }
                  className="flex-1"
                />
                <select
                  value={wavelengthUnit}
                  onChange={(e) => setWavelengthUnit(e.target.value as 'm' | 'cm' | 'mm')}
                  className="px-3 py-2 border rounded-md bg-background text-sm"
                  aria-label="Wavelength unit"
                >
                  <option value="mm">mm</option>
                  <option value="cm">cm</option>
                  <option value="m">m</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Result Display */}
        {result && (
          <div className="space-y-3">
            <div
              className="p-4 rounded-lg bg-primary/10 border border-primary/20"
              role="region"
              aria-live="polite"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">
                    {mode === 'freq-to-wavelength' ? 'Wavelength' : 'Frequency'}
                  </div>
                  <div className="text-2xl font-bold text-primary">
                    {result.value.toFixed(3)} {result.unit}
                  </div>
                </div>
                {result.band && (
                  <div
                    className={cn(
                      'px-3 py-1 rounded-full text-white text-sm font-medium',
                      result.band.color
                    )}
                  >
                    {result.band.name} Band
                  </div>
                )}
              </div>
              <div className="text-sm text-muted-foreground mt-2 font-mono">{result.formula}</div>
            </div>

            {result.band && (
              <div className="p-3 rounded-lg bg-muted/50 text-sm">
                <strong>{result.band.wavelength}</strong> band: {result.band.freqStart.toFixed(3)} -{' '}
                {result.band.freqEnd.toFixed(3)} MHz
              </div>
            )}
          </div>
        )}

        {/* Amateur Band Quick Select */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">
            Amateur Bands (click to calculate)
          </h4>
          <div className="flex flex-wrap gap-2">
            {amateurBands.map((band) => (
              <button
                key={band.name}
                onClick={() => selectBand(band)}
                className={cn(
                  'px-3 py-1.5 rounded-full text-white text-sm font-medium transition-opacity hover:opacity-80',
                  band.color
                )}
              >
                {band.name}
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
              <span className="text-primary font-bold">•</span>
              <span>
                The formula <strong>λ = 300/f</strong> uses MHz and meters
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                2-meter band is around <strong>146 MHz</strong> (300÷146 ≈ 2.05m)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                70-cm band is around <strong>440 MHz</strong> (300÷440 ≈ 0.68m)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                Higher frequency = <strong>shorter</strong> wavelength
              </span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

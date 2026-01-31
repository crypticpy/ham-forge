'use client'

import { useState, useCallback, useMemo } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import {
  freqToWavelength,
  wavelengthToFreq,
  formatFrequency,
  formatWavelength,
  getBandCategory,
} from '@/lib/frequency-utils'
import { findBandForFrequency } from '@/data/radio/spectrum-data'
import { Radio, ArrowRightLeft, RotateCcw, Zap } from 'lucide-react'
import type { AmateurBand } from '@/types/spectrum'

interface FrequencyConverterProps {
  className?: string
  onFrequencySelect?: (freqKHz: number) => void
}

type FrequencyUnit = 'kHz' | 'MHz' | 'GHz'
type WavelengthUnit = 'm' | 'cm'

// Common calling frequencies for quick reference
const COMMON_CALLING_FREQUENCIES: { freq: number; label: string; band: string }[] = [
  { freq: 146520, label: '146.520 MHz - 2m FM calling', band: '2m' },
  { freq: 446000, label: '446.000 MHz - 70cm FM calling', band: '70cm' },
  { freq: 14074, label: '14.074 MHz - 20m FT8', band: '20m' },
  { freq: 7074, label: '7.074 MHz - 40m FT8', band: '40m' },
  { freq: 3573, label: '3.573 MHz - 80m FT8', band: '80m' },
  { freq: 14300, label: '14.300 MHz - 20m Maritime Mobile', band: '20m' },
  { freq: 52525, label: '52.525 MHz - 6m FM calling', band: '6m' },
  { freq: 28400, label: '28.400 MHz - 10m SSB DX', band: '10m' },
]

// Convert input value to kHz based on selected unit
function toKHz(value: number, unit: FrequencyUnit): number {
  switch (unit) {
    case 'kHz':
      return value
    case 'MHz':
      return value * 1000
    case 'GHz':
      return value * 1_000_000
  }
}

// Convert kHz to display value based on selected unit
function fromKHz(kHz: number, unit: FrequencyUnit): number {
  switch (unit) {
    case 'kHz':
      return kHz
    case 'MHz':
      return kHz / 1000
    case 'GHz':
      return kHz / 1_000_000
  }
}

// Convert meters to display value based on selected unit
function fromMeters(meters: number, unit: WavelengthUnit): number {
  switch (unit) {
    case 'm':
      return meters
    case 'cm':
      return meters * 100
  }
}

// Convert input value to meters based on selected unit
function toMeters(value: number, unit: WavelengthUnit): number {
  switch (unit) {
    case 'm':
      return value
    case 'cm':
      return value / 100
  }
}

export function FrequencyConverter({ className, onFrequencySelect }: FrequencyConverterProps) {
  // Frequency state
  const [freqValue, setFreqValue] = useState<string>('')
  const [freqUnit, setFreqUnit] = useState<FrequencyUnit>('MHz')

  // Wavelength state
  const [wavelengthValue, setWavelengthValue] = useState<string>('')
  const [wavelengthUnit, setWavelengthUnit] = useState<WavelengthUnit>('m')

  // Track which field was last edited for conversion direction
  const [lastEdited, setLastEdited] = useState<'freq' | 'wavelength' | null>(null)

  // Parse and validate frequency input
  const parsedFreqKHz = useMemo(() => {
    const num = parseFloat(freqValue)
    if (isNaN(num) || num <= 0) return null
    return toKHz(num, freqUnit)
  }, [freqValue, freqUnit])

  // Parse and validate wavelength input
  const parsedWavelengthMeters = useMemo(() => {
    const num = parseFloat(wavelengthValue)
    if (isNaN(num) || num <= 0) return null
    return toMeters(num, wavelengthUnit)
  }, [wavelengthValue, wavelengthUnit])

  // Calculate the effective frequency in kHz (from either input)
  const effectiveFreqKHz = useMemo(() => {
    if (lastEdited === 'freq' && parsedFreqKHz !== null) {
      return parsedFreqKHz
    }
    if (lastEdited === 'wavelength' && parsedWavelengthMeters !== null) {
      try {
        return wavelengthToFreq(parsedWavelengthMeters)
      } catch {
        return null
      }
    }
    // Default to frequency if available
    return parsedFreqKHz
  }, [lastEdited, parsedFreqKHz, parsedWavelengthMeters])

  // Find matching amateur band
  const matchingBand = useMemo((): AmateurBand | undefined => {
    if (effectiveFreqKHz === null) return undefined
    return findBandForFrequency(effectiveFreqKHz)
  }, [effectiveFreqKHz])

  // Get band category
  const bandCategory = useMemo(() => {
    if (effectiveFreqKHz === null) return null
    try {
      return getBandCategory(effectiveFreqKHz)
    } catch {
      return null
    }
  }, [effectiveFreqKHz])

  // Calculate converted values
  const convertedWavelength = useMemo(() => {
    if (effectiveFreqKHz === null) return null
    try {
      return freqToWavelength(effectiveFreqKHz)
    } catch {
      return null
    }
  }, [effectiveFreqKHz])

  const convertedFreq = useMemo(() => {
    if (parsedWavelengthMeters === null) return null
    try {
      return wavelengthToFreq(parsedWavelengthMeters)
    } catch {
      return null
    }
  }, [parsedWavelengthMeters])

  // Handle frequency input change
  const handleFreqChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow empty string, numbers, and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setFreqValue(value)
      setLastEdited('freq')
    }
  }, [])

  // Handle wavelength input change
  const handleWavelengthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    // Allow empty string, numbers, and decimal point
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setWavelengthValue(value)
      setLastEdited('wavelength')
    }
  }, [])

  // Handle unit changes - update the display value to maintain the same actual frequency/wavelength
  const handleFreqUnitChange = useCallback(
    (newUnit: FrequencyUnit) => {
      if (parsedFreqKHz !== null) {
        const newValue = fromKHz(parsedFreqKHz, newUnit)
        // Format to reasonable precision
        setFreqValue(
          newValue >= 1 ? newValue.toPrecision(6).replace(/\.?0+$/, '') : newValue.toString()
        )
      }
      setFreqUnit(newUnit)
    },
    [parsedFreqKHz]
  )

  const handleWavelengthUnitChange = useCallback(
    (newUnit: WavelengthUnit) => {
      if (parsedWavelengthMeters !== null) {
        const newValue = fromMeters(parsedWavelengthMeters, newUnit)
        // Format to reasonable precision
        setWavelengthValue(
          newValue >= 1 ? newValue.toPrecision(6).replace(/\.?0+$/, '') : newValue.toString()
        )
      }
      setWavelengthUnit(newUnit)
    },
    [parsedWavelengthMeters]
  )

  // Reset all fields
  const handleReset = useCallback(() => {
    setFreqValue('')
    setWavelengthValue('')
    setLastEdited(null)
  }, [])

  // Handle quick frequency selection
  const handleQuickSelect = useCallback(
    (freqKHz: number) => {
      setFreqUnit('MHz')
      setFreqValue((freqKHz / 1000).toString())
      setLastEdited('freq')
      onFrequencySelect?.(freqKHz)
    },
    [onFrequencySelect]
  )

  // Trigger callback when frequency changes
  const handleApplyFrequency = useCallback(() => {
    if (effectiveFreqKHz !== null && onFrequencySelect) {
      onFrequencySelect(effectiveFreqKHz)
    }
  }, [effectiveFreqKHz, onFrequencySelect])

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Converter Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowRightLeft className="size-5 text-primary" aria-hidden="true" />
              <CardTitle className="text-base">Frequency / Wavelength Converter</CardTitle>
            </div>
            <Button variant="ghost" size="icon-sm" onClick={handleReset} title="Reset">
              <RotateCcw className="size-4" aria-hidden="true" />
              <span className="sr-only">Reset</span>
            </Button>
          </div>
          <CardDescription>Enter a frequency or wavelength to convert</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Frequency Input */}
          <div className="space-y-2">
            <label htmlFor="freq-input" className="text-sm font-medium">
              Frequency
            </label>
            <div className="flex gap-2">
              <input
                id="freq-input"
                type="text"
                inputMode="decimal"
                value={freqValue}
                onChange={handleFreqChange}
                placeholder="Enter frequency"
                className={cn(
                  'flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm',
                  'placeholder:text-muted-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'disabled:cursor-not-allowed disabled:opacity-50'
                )}
              />
              <div className="flex rounded-md border border-input">
                {(['kHz', 'MHz', 'GHz'] as const).map((unit) => (
                  <button
                    key={unit}
                    onClick={() => handleFreqUnitChange(unit)}
                    className={cn(
                      'px-3 py-2 text-sm font-medium transition-colors',
                      'first:rounded-l-md last:rounded-r-md',
                      freqUnit === unit
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background hover:bg-accent'
                    )}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
            {/* Converted frequency display (when wavelength is primary) */}
            {lastEdited === 'wavelength' && convertedFreq !== null && (
              <p className="text-sm text-muted-foreground">= {formatFrequency(convertedFreq)}</p>
            )}
          </div>

          {/* Wavelength Input */}
          <div className="space-y-2">
            <label htmlFor="wavelength-input" className="text-sm font-medium">
              Wavelength
            </label>
            <div className="flex gap-2">
              <input
                id="wavelength-input"
                type="text"
                inputMode="decimal"
                value={wavelengthValue}
                onChange={handleWavelengthChange}
                placeholder="Enter wavelength"
                className={cn(
                  'flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm',
                  'placeholder:text-muted-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
                  'disabled:cursor-not-allowed disabled:opacity-50'
                )}
              />
              <div className="flex rounded-md border border-input">
                {(['m', 'cm'] as const).map((unit) => (
                  <button
                    key={unit}
                    onClick={() => handleWavelengthUnitChange(unit)}
                    className={cn(
                      'px-3 py-2 text-sm font-medium transition-colors',
                      'first:rounded-l-md last:rounded-r-md',
                      wavelengthUnit === unit
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background hover:bg-accent'
                    )}
                  >
                    {unit}
                  </button>
                ))}
              </div>
            </div>
            {/* Converted wavelength display (when frequency is primary) */}
            {lastEdited === 'freq' && convertedWavelength !== null && (
              <p className="text-sm text-muted-foreground">
                = {formatWavelength(convertedWavelength)}
              </p>
            )}
          </div>

          {/* Apply button (only when callback is provided) */}
          {onFrequencySelect && effectiveFreqKHz !== null && (
            <Button onClick={handleApplyFrequency} className="w-full" variant="outline">
              <Zap className="size-4 mr-2" aria-hidden="true" />
              Apply {formatFrequency(effectiveFreqKHz)}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Band Identification Card */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Radio className="size-5 text-primary" aria-hidden="true" />
            <CardTitle className="text-base">Band Identification</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          {effectiveFreqKHz !== null ? (
            <div className="space-y-3">
              {matchingBand ? (
                <>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Amateur Band</span>
                    <span className="font-medium">{matchingBand.name}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Band ID</span>
                    <span className="font-mono text-sm">{matchingBand.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Category</span>
                    <span
                      className={cn(
                        'px-2 py-0.5 text-xs font-medium rounded-full',
                        matchingBand.category === 'HF' &&
                          'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
                        matchingBand.category === 'VHF' &&
                          'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
                        matchingBand.category === 'UHF' &&
                          'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
                        matchingBand.category === 'SHF' &&
                          'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300'
                      )}
                    >
                      {matchingBand.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Band Range</span>
                    <span className="text-sm">
                      {formatFrequency(matchingBand.startFreq)} -{' '}
                      {formatFrequency(matchingBand.endFreq)}
                    </span>
                  </div>
                  {matchingBand.notes && (
                    <p className="text-xs text-muted-foreground border-t pt-2">
                      {matchingBand.notes}
                    </p>
                  )}
                </>
              ) : (
                <div className="text-center py-4">
                  <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                    Not in amateur band
                  </p>
                  {bandCategory && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Frequency is in the {bandCategory} range
                    </p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">
              Enter a frequency or wavelength to identify the band
            </p>
          )}
        </CardContent>
      </Card>

      {/* Quick Reference Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Common Calling Frequencies</CardTitle>
          <CardDescription>Click to load a frequency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {COMMON_CALLING_FREQUENCIES.map((item) => (
              <button
                key={item.freq}
                onClick={() => handleQuickSelect(item.freq)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-md text-sm transition-colors',
                  'hover:bg-accent',
                  effectiveFreqKHz === item.freq && 'bg-primary/10 text-primary'
                )}
              >
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

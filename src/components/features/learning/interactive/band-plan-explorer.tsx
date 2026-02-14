'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Radio, Search, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

type LicenseClass = 'technician' | 'general' | 'extra'

interface BandSegment {
  start: number
  end: number
  modes: string[]
  technician: boolean
  general: boolean
  extra: boolean
  notes?: string
}

interface Band {
  name: string
  range: string
  startMHz: number
  endMHz: number
  segments: BandSegment[]
  color: string
}

// HF and VHF/UHF bands with segment data
const bands: Band[] = [
  {
    name: '160m',
    range: '1.8-2.0 MHz',
    startMHz: 1.8,
    endMHz: 2.0,
    color: '#8B0000',
    segments: [
      {
        start: 1.8,
        end: 2.0,
        modes: ['CW', 'SSB', 'Digital'],
        technician: false,
        general: true,
        extra: true,
      },
    ],
  },
  {
    name: '80m',
    range: '3.5-4.0 MHz',
    startMHz: 3.5,
    endMHz: 4.0,
    color: '#B22222',
    segments: [
      {
        start: 3.5,
        end: 3.6,
        modes: ['CW', 'RTTY', 'Digital'],
        technician: false,
        general: true,
        extra: true,
      },
      {
        start: 3.6,
        end: 4.0,
        modes: ['CW', 'SSB', 'Digital'],
        technician: false,
        general: true,
        extra: true,
      },
    ],
  },
  {
    name: '40m',
    range: '7.0-7.3 MHz',
    startMHz: 7.0,
    endMHz: 7.3,
    color: '#FF4500',
    segments: [
      {
        start: 7.0,
        end: 7.125,
        modes: ['CW', 'RTTY', 'Digital'],
        technician: false,
        general: true,
        extra: true,
      },
      {
        start: 7.125,
        end: 7.3,
        modes: ['CW', 'SSB', 'Digital'],
        technician: false,
        general: true,
        extra: true,
      },
    ],
  },
  {
    name: '20m',
    range: '14.0-14.35 MHz',
    startMHz: 14.0,
    endMHz: 14.35,
    color: '#FFD700',
    segments: [
      {
        start: 14.0,
        end: 14.15,
        modes: ['CW', 'RTTY', 'Digital'],
        technician: false,
        general: true,
        extra: true,
      },
      {
        start: 14.15,
        end: 14.35,
        modes: ['CW', 'SSB'],
        technician: false,
        general: true,
        extra: true,
      },
    ],
  },
  {
    name: '15m',
    range: '21.0-21.45 MHz',
    startMHz: 21.0,
    endMHz: 21.45,
    color: '#32CD32',
    segments: [
      {
        start: 21.0,
        end: 21.2,
        modes: ['CW', 'RTTY', 'Digital'],
        technician: false,
        general: true,
        extra: true,
      },
      {
        start: 21.2,
        end: 21.45,
        modes: ['CW', 'SSB'],
        technician: false,
        general: true,
        extra: true,
      },
    ],
  },
  {
    name: '10m',
    range: '28.0-29.7 MHz',
    startMHz: 28.0,
    endMHz: 29.7,
    color: '#00BFFF',
    segments: [
      {
        start: 28.0,
        end: 28.3,
        modes: ['CW', 'RTTY', 'Digital'],
        technician: true,
        general: true,
        extra: true,
      },
      {
        start: 28.3,
        end: 28.5,
        modes: ['CW', 'SSB'],
        technician: true,
        general: true,
        extra: true,
      },
      {
        start: 28.5,
        end: 29.7,
        modes: ['CW', 'SSB', 'FM'],
        technician: true,
        general: true,
        extra: true,
        notes: 'FM allowed above 29.0 MHz',
      },
    ],
  },
  {
    name: '6m',
    range: '50-54 MHz',
    startMHz: 50,
    endMHz: 54,
    color: '#9370DB',
    segments: [
      {
        start: 50.0,
        end: 50.1,
        modes: ['CW', 'Weak Signal'],
        technician: true,
        general: true,
        extra: true,
      },
      {
        start: 50.1,
        end: 54.0,
        modes: ['CW', 'SSB', 'FM', 'Digital'],
        technician: true,
        general: true,
        extra: true,
      },
    ],
  },
  {
    name: '2m',
    range: '144-148 MHz',
    startMHz: 144,
    endMHz: 148,
    color: '#FF69B4',
    segments: [
      {
        start: 144.0,
        end: 144.1,
        modes: ['CW', 'Weak Signal'],
        technician: true,
        general: true,
        extra: true,
      },
      {
        start: 144.1,
        end: 148.0,
        modes: ['CW', 'SSB', 'FM', 'Digital'],
        technician: true,
        general: true,
        extra: true,
        notes: 'FM simplex calling: 146.52 MHz',
      },
    ],
  },
  {
    name: '70cm',
    range: '420-450 MHz',
    startMHz: 420,
    endMHz: 450,
    color: '#20B2AA',
    segments: [
      {
        start: 420,
        end: 450,
        modes: ['CW', 'SSB', 'FM', 'Digital', 'ATV'],
        technician: true,
        general: true,
        extra: true,
        notes: 'FM simplex calling: 446.0 MHz',
      },
    ],
  },
]

// Notable frequencies
const notableFrequencies = [
  { freq: 146.52, name: '2m FM Simplex Calling', band: '2m' },
  { freq: 446.0, name: '70cm FM Simplex Calling', band: '70cm' },
  { freq: 14.3, name: '20m SSB Emergency', band: '20m' },
  { freq: 7.2, name: '40m SSB Calling', band: '40m' },
  { freq: 3.86, name: '75m SSB Calling', band: '80m' },
  { freq: 28.4, name: '10m SSB Calling', band: '10m' },
]

/**
 * Interactive Band Plan Explorer
 *
 * Features:
 * - Visual band segments with color coding
 * - License class filtering
 * - Frequency lookup
 * - Notable frequencies reference
 */
export function BandPlanExplorer() {
  const [licenseClass, setLicenseClass] = useState<LicenseClass>('technician')
  const [selectedBand, setSelectedBand] = useState<Band | null>(null)
  const [searchFreq, setSearchFreq] = useState('')
  const [searchResult, setSearchResult] = useState<{
    band: Band
    segment: BandSegment
  } | null>(null)

  // Search for a frequency
  const handleSearch = () => {
    const freq = parseFloat(searchFreq)
    if (isNaN(freq)) {
      setSearchResult(null)
      return
    }

    for (const band of bands) {
      for (const segment of band.segments) {
        if (freq >= segment.start && freq <= segment.end) {
          setSearchResult({ band, segment })
          setSelectedBand(band)
          return
        }
      }
    }
    setSearchResult(null)
  }

  // Check if user has privileges for a segment
  const hasPrivileges = (segment: BandSegment) => {
    switch (licenseClass) {
      case 'technician':
        return segment.technician
      case 'general':
        return segment.general
      case 'extra':
        return segment.extra
      default:
        return false
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Radio className="size-5 text-primary" aria-hidden="true" />
          Band Plan Explorer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* License Class Selector */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Your License Class</Label>
          <div className="flex gap-2">
            {(['technician', 'general', 'extra'] as LicenseClass[]).map((lc) => (
              <Button
                key={lc}
                variant={licenseClass === lc ? 'default' : 'outline'}
                size="sm"
                onClick={() => setLicenseClass(lc)}
                className="capitalize flex-1"
              >
                {lc}
              </Button>
            ))}
          </div>
        </div>

        {/* Frequency Search */}
        <div className="space-y-2">
          <Label htmlFor="freq-search" className="text-sm font-medium">
            Look Up Frequency
          </Label>
          <div className="flex gap-2">
            <Input
              id="freq-search"
              type="number"
              step="any"
              value={searchFreq}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchFreq(e.target.value)}
              placeholder="146.52"
              className="font-mono"
            />
            <span className="flex items-center text-sm text-muted-foreground">MHz</span>
            <Button onClick={handleSearch}>
              <Search className="size-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        {/* Search Result */}
        {searchResult && (
          <div
            className={cn(
              'p-4 rounded-lg border',
              hasPrivileges(searchResult.segment)
                ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800'
            )}
          >
            <div className="flex items-start gap-3">
              <Info
                className={cn(
                  'size-5 mt-0.5',
                  hasPrivileges(searchResult.segment)
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-amber-600 dark:text-amber-400'
                )}
              />
              <div>
                <div className="font-semibold">
                  {searchFreq} MHz - {searchResult.band.name} Band
                </div>
                <div className="text-sm mt-1 space-y-1">
                  <p>
                    <span className="text-muted-foreground">Modes:</span>{' '}
                    {searchResult.segment.modes.join(', ')}
                  </p>
                  <p>
                    <span className="text-muted-foreground">Your privileges:</span>{' '}
                    {hasPrivileges(searchResult.segment) ? (
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        Full access
                      </span>
                    ) : (
                      <span className="text-amber-600 dark:text-amber-400 font-medium">
                        Upgrade required
                      </span>
                    )}
                  </p>
                  {searchResult.segment.notes && (
                    <p className="text-muted-foreground italic">{searchResult.segment.notes}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Band Visualization */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Amateur Radio Bands</Label>
          <div className="space-y-2">
            {bands.map((band) => {
              const technicianAccess = band.segments.some((s) => s.technician)

              return (
                <button
                  key={band.name}
                  onClick={() => setSelectedBand(selectedBand?.name === band.name ? null : band)}
                  className={cn(
                    'w-full p-3 rounded-lg border text-left transition-all',
                    'hover:border-primary/50',
                    selectedBand?.name === band.name && 'ring-2 ring-primary',
                    !technicianAccess && licenseClass === 'technician' && 'opacity-50'
                  )}
                  style={{
                    borderColor: band.color + '40',
                    backgroundColor: band.color + '10',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-8 rounded" style={{ backgroundColor: band.color }} />
                      <div>
                        <div className="font-semibold">{band.name}</div>
                        <div className="text-sm text-muted-foreground">{band.range}</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {band.segments.some((s) => s.technician) && (
                        <span className="px-2 py-0.5 text-xs rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                          T
                        </span>
                      )}
                      {band.segments.some((s) => s.general && !s.technician) && (
                        <span className="px-2 py-0.5 text-xs rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                          G
                        </span>
                      )}
                      {band.segments.some((s) => s.extra && !s.general) && (
                        <span className="px-2 py-0.5 text-xs rounded bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          E
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Selected Band Details */}
        {selectedBand && (
          <div className="p-4 rounded-lg bg-muted">
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: selectedBand.color }} />
              {selectedBand.name} Band Details
            </h4>
            <div className="space-y-3">
              {selectedBand.segments.map((segment, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'p-3 rounded border',
                    hasPrivileges(segment)
                      ? 'bg-background border-green-300 dark:border-green-700'
                      : 'bg-muted/50 border-border opacity-60'
                  )}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-sm">
                      {segment.start.toFixed(3)} - {segment.end.toFixed(3)} MHz
                    </span>
                    {hasPrivileges(segment) ? (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                        You have access
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                        Upgrade needed
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Modes: {segment.modes.join(', ')}
                  </div>
                  {segment.notes && (
                    <div className="text-sm text-muted-foreground italic mt-1">{segment.notes}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Notable Frequencies */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Notable Frequencies</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {notableFrequencies.map((nf) => (
              <button
                key={nf.freq}
                onClick={() => {
                  setSearchFreq(nf.freq.toString())
                  const band = bands.find((b) => b.name === nf.band)
                  if (band) {
                    const segment = band.segments.find(
                      (s) => nf.freq >= s.start && nf.freq <= s.end
                    )
                    if (segment) {
                      setSearchResult({ band, segment })
                      setSelectedBand(band)
                    }
                  }
                }}
                className="p-2 rounded border hover:bg-muted transition-colors text-left"
              >
                <div className="font-mono text-sm">{nf.freq} MHz</div>
                <div className="text-xs text-muted-foreground">{nf.name}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Exam Tips */}
        <div className="pt-4 border-t">
          <h4 className="text-sm font-medium mb-3 text-muted-foreground">Exam Tips</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>
                Technicians have limited HF privileges on 10m: CW/data 28.0-28.3 and SSB phone
                28.3-28.5 (200W PEP max)
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>146.52 MHz is the national 2m FM simplex calling frequency</span>
            </li>
            <li className="flex gap-2">
              <span className="text-primary font-bold">•</span>
              <span>Maximum power is 1,500 watts PEP for most amateur frequencies (some bands lower)</span>
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

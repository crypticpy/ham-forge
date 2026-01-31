'use client'

import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  X,
  Radio,
  Info,
  Zap,
  Shield,
  Waves,
  MessageSquare,
  Cpu,
  Tv,
  Satellite,
  Moon,
  Antenna,
} from 'lucide-react'
import type { AmateurBand, BandSegment, LicenseClass, OperatingMode } from '@/types/spectrum'
import { formatFrequency, formatWavelength, freqToWavelength } from '@/lib/frequency-utils'

interface BandDetailProps {
  band: AmateurBand
  onClose?: () => void
}

/**
 * Color mappings for license classes
 */
const licenseColors: Record<LicenseClass, { bg: string; text: string; border: string }> = {
  extra: {
    bg: 'bg-purple-500/20',
    text: 'text-purple-300',
    border: 'border-purple-500/40',
  },
  advanced: {
    bg: 'bg-blue-500/20',
    text: 'text-blue-300',
    border: 'border-blue-500/40',
  },
  general: {
    bg: 'bg-green-500/20',
    text: 'text-green-300',
    border: 'border-green-500/40',
  },
  technician: {
    bg: 'bg-amber-500/20',
    text: 'text-amber-300',
    border: 'border-amber-500/40',
  },
  novice: {
    bg: 'bg-gray-500/20',
    text: 'text-gray-300',
    border: 'border-gray-500/40',
  },
}

/**
 * Color mappings for frequency categories
 */
const categoryColors: Record<string, { bg: string; text: string }> = {
  HF: { bg: 'bg-sky-500/20', text: 'text-sky-300' },
  VHF: { bg: 'bg-emerald-500/20', text: 'text-emerald-300' },
  UHF: { bg: 'bg-orange-500/20', text: 'text-orange-300' },
  SHF: { bg: 'bg-red-500/20', text: 'text-red-300' },
}

/**
 * Icons for operating modes
 */
const modeIcons: Partial<Record<OperatingMode, typeof Radio>> = {
  CW: MessageSquare,
  SSB: Radio,
  AM: Radio,
  FM: Waves,
  RTTY: Cpu,
  Digital: Cpu,
  Data: Cpu,
  Image: Tv,
  ATV: Tv,
  Satellite: Satellite,
  EME: Moon,
  Beacon: Antenna,
}

/**
 * Get the highest privilege class for display ordering
 */
const licenseClassPriority: Record<LicenseClass, number> = {
  extra: 5,
  advanced: 4,
  general: 3,
  technician: 2,
  novice: 1,
}

/**
 * Format license class name for display
 */
function formatLicenseClass(license: LicenseClass): string {
  return license.charAt(0).toUpperCase() + license.slice(1)
}

/**
 * Get color for a segment based on the lowest privilege class that can access it
 */
function getSegmentColor(segment: BandSegment): string {
  const lowestClass = segment.licenseClasses.reduce((lowest, current) =>
    licenseClassPriority[current] < licenseClassPriority[lowest] ? current : lowest
  )
  return licenseColors[lowestClass].bg
}

/**
 * BandDetail - Expanded view of a single amateur radio band
 *
 * Displays detailed information about band segments, privileges,
 * calling frequencies, and special notes.
 */
export function BandDetail({ band, onClose }: BandDetailProps) {
  // Calculate band width for segment positioning
  const bandWidth = band.endFreq - band.startFreq

  // Compute privilege breakdown by license class
  const privilegeBreakdown = useMemo(() => {
    const breakdown: Record<LicenseClass, BandSegment[]> = {
      extra: [],
      advanced: [],
      general: [],
      technician: [],
      novice: [],
    }

    band.segments.forEach((segment) => {
      segment.licenseClasses.forEach((license) => {
        breakdown[license].push(segment)
      })
    })

    // Return only classes that have segments
    return Object.entries(breakdown)
      .filter(([, segments]) => segments.length > 0)
      .sort(
        ([a], [b]) =>
          licenseClassPriority[b as LicenseClass] - licenseClassPriority[a as LicenseClass]
      )
  }, [band.segments])

  // Deduplicate segments for visualization (merge overlapping segments with same classes)
  const uniqueSegments = useMemo(() => {
    const seen = new Map<string, BandSegment>()
    band.segments.forEach((segment) => {
      const key = `${segment.startFreq}-${segment.endFreq}`
      if (!seen.has(key)) {
        seen.set(key, segment)
      }
    })
    return Array.from(seen.values()).sort((a, b) => a.startFreq - b.startFreq)
  }, [band.segments])

  return (
    <Card className="relative overflow-hidden border-primary/20">
      {/* Close button */}
      {onClose && (
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onClose}
          className="absolute top-4 right-4 z-10"
          aria-label="Close band details"
        >
          <X className="size-4" />
        </Button>
      )}

      <CardHeader className="pb-4">
        {/* Band info header */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Radio className="size-6 text-primary" aria-hidden="true" />
            <CardTitle className="text-xl">{band.name}</CardTitle>
            {/* Category badge */}
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${categoryColors[band.category].bg} ${categoryColors[band.category].text}`}
            >
              {band.category}
            </span>
          </div>

          {/* Frequency range and wavelength */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="font-mono">
              {formatFrequency(band.startFreq)} - {formatFrequency(band.endFreq)}
            </span>
            <span className="text-muted-foreground/60">|</span>
            <span>~{formatWavelength(freqToWavelength((band.startFreq + band.endFreq) / 2))}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Linear frequency scale visualization */}
        <section aria-labelledby="segment-visualization">
          <h3 id="segment-visualization" className="text-sm font-medium mb-3">
            Band Segments
          </h3>
          <div className="relative h-16 bg-muted/30 rounded-lg overflow-hidden border border-border/50">
            {/* Frequency scale markers */}
            <div className="absolute inset-x-0 bottom-0 h-4 flex items-end justify-between px-1 text-[10px] text-muted-foreground font-mono">
              <span>{formatFrequency(band.startFreq)}</span>
              <span>{formatFrequency(band.endFreq)}</span>
            </div>

            {/* Segment bars */}
            <div className="absolute inset-x-0 top-0 h-10 px-0.5">
              {uniqueSegments.map((segment, index) => {
                const left = ((segment.startFreq - band.startFreq) / bandWidth) * 100
                const width = ((segment.endFreq - segment.startFreq) / bandWidth) * 100

                return (
                  <div
                    key={`${segment.startFreq}-${segment.endFreq}-${index}`}
                    className={`absolute top-1 h-8 rounded-sm ${getSegmentColor(segment)} border border-white/10 flex items-center justify-center overflow-hidden transition-all hover:brightness-125`}
                    style={{
                      left: `${left}%`,
                      width: `${Math.max(width, 0.5)}%`,
                    }}
                    title={`${formatFrequency(segment.startFreq)} - ${formatFrequency(segment.endFreq)}: ${segment.modes.join(', ')}`}
                  >
                    {/* Mode icons for wider segments */}
                    {width > 8 && (
                      <div className="flex gap-0.5">
                        {segment.modes.slice(0, 3).map((mode) => {
                          const Icon = modeIcons[mode] || Radio
                          return (
                            <Icon key={mode} className="size-3 text-white/70" aria-label={mode} />
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Segment legend */}
          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            {(['technician', 'general', 'advanced', 'extra'] as LicenseClass[])
              .filter((license) => privilegeBreakdown.some(([l]) => l === license))
              .map((license) => (
                <div key={license} className="flex items-center gap-1.5">
                  <span
                    className={`w-3 h-3 rounded-sm ${licenseColors[license].bg} border ${licenseColors[license].border}`}
                  />
                  <span className={licenseColors[license].text}>{formatLicenseClass(license)}</span>
                </div>
              ))}
          </div>
        </section>

        {/* Privilege breakdown */}
        <section aria-labelledby="privilege-breakdown">
          <h3 id="privilege-breakdown" className="text-sm font-medium mb-3 flex items-center gap-2">
            <Shield className="size-4 text-muted-foreground" aria-hidden="true" />
            License Privileges
          </h3>
          <div className="space-y-2">
            {privilegeBreakdown.map(([license, segments]) => {
              // Consolidate frequency ranges for display
              const ranges = segments
                .map((s) => `${formatFrequency(s.startFreq)} - ${formatFrequency(s.endFreq)}`)
                .filter((v, i, arr) => arr.indexOf(v) === i)

              return (
                <div
                  key={license}
                  className={`p-3 rounded-lg border ${licenseColors[license as LicenseClass].border} ${licenseColors[license as LicenseClass].bg}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className={`font-medium ${licenseColors[license as LicenseClass].text}`}>
                      {formatLicenseClass(license as LicenseClass)}
                    </span>
                    {segments.some((s) => s.maxPowerWatts) && (
                      <span className="flex items-center gap-1 text-xs text-amber-400">
                        <Zap className="size-3" aria-hidden="true" />
                        Power limited
                      </span>
                    )}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground space-y-0.5">
                    {ranges.slice(0, 3).map((range, i) => (
                      <div key={i} className="font-mono">
                        {range}
                      </div>
                    ))}
                    {ranges.length > 3 && (
                      <div className="text-muted-foreground/60">
                        +{ranges.length - 3} more segments
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Calling frequencies */}
        {band.callingFrequencies && band.callingFrequencies.length > 0 && (
          <section aria-labelledby="calling-frequencies">
            <h3
              id="calling-frequencies"
              className="text-sm font-medium mb-3 flex items-center gap-2"
            >
              <Antenna className="size-4 text-muted-foreground" aria-hidden="true" />
              Calling Frequencies
            </h3>
            <div className="grid gap-2">
              {band.callingFrequencies.map((cf, index) => {
                const Icon = modeIcons[cf.mode] || Radio
                return (
                  <div
                    key={`${cf.freq}-${index}`}
                    className="flex items-center gap-3 p-2 rounded-lg bg-muted/30 border border-border/50"
                  >
                    <Icon className="size-4 text-primary shrink-0" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">{formatFrequency(cf.freq)}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {cf.mode}
                        </span>
                      </div>
                      {cf.notes && (
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">{cf.notes}</p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Band notes */}
        {band.notes && (
          <section aria-labelledby="band-notes">
            <h3 id="band-notes" className="sr-only">
              Band Notes
            </h3>
            <div className="flex gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <Info className="size-4 shrink-0 text-blue-400 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-blue-300">{band.notes}</p>
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  )
}

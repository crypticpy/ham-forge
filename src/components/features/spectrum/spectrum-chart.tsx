'use client'

import { useState, useCallback, useMemo, useRef, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { cn } from '@/lib/utils'
import type { AmateurBand, BandSegment, LicenseClass, SpectrumFilter } from '@/types/spectrum'
import { getLogPosition, formatFrequency, formatWavelength } from '@/lib/frequency-utils'
import { AMATEUR_BANDS } from '@/data/radio/spectrum-data'

/**
 * Props for the SpectrumChart component
 */
interface SpectrumChartProps {
  /** Optional filter to highlight specific license class, mode, or category */
  filter?: SpectrumFilter
  /** Currently selected band (if any) */
  selectedBand?: AmateurBand | null
  /** Callback when a band is clicked */
  onBandSelect?: (band: AmateurBand) => void
}

/**
 * Color scheme for license classes following the established pattern
 */
const LICENSE_COLORS: Record<
  LicenseClass,
  {
    bg: string
    bgHover: string
    bgMuted: string
    text: string
    ring: string
  }
> = {
  technician: {
    bg: 'bg-blue-500',
    bgHover: 'hover:bg-blue-400',
    bgMuted: 'bg-blue-500/30',
    text: 'text-blue-400',
    ring: 'ring-blue-500',
  },
  general: {
    bg: 'bg-green-500',
    bgHover: 'hover:bg-green-400',
    bgMuted: 'bg-green-500/30',
    text: 'text-green-400',
    ring: 'ring-green-500',
  },
  extra: {
    bg: 'bg-purple-500',
    bgHover: 'hover:bg-purple-400',
    bgMuted: 'bg-purple-500/30',
    text: 'text-purple-400',
    ring: 'ring-purple-500',
  },
  novice: {
    bg: 'bg-gray-500',
    bgHover: 'hover:bg-gray-400',
    bgMuted: 'bg-gray-500/30',
    text: 'text-gray-400',
    ring: 'ring-gray-500',
  },
  advanced: {
    bg: 'bg-gray-500',
    bgHover: 'hover:bg-gray-400',
    bgMuted: 'bg-gray-500/30',
    text: 'text-gray-400',
    ring: 'ring-gray-500',
  },
}

/** Spectrum range constants (in kHz) */
const MIN_FREQ = 1800 // 160m band start (1.8 MHz)
const MAX_FREQ = 1300000 // 23cm band end (1.3 GHz)

/**
 * Determines the primary license class for a band segment.
 * Returns the lowest/most accessible license class that can operate in the segment.
 */
function getPrimaryLicenseClass(segment: BandSegment): LicenseClass {
  const priority: LicenseClass[] = ['technician', 'general', 'extra', 'novice', 'advanced']
  for (const license of priority) {
    if (segment.licenseClasses.includes(license)) {
      return license
    }
  }
  return 'extra'
}

/**
 * Determines if a band matches the current filter criteria
 */
function bandMatchesFilter(band: AmateurBand, filter?: SpectrumFilter): boolean {
  if (!filter) return true

  // Check category filter
  if (filter.category && band.category !== filter.category) {
    return false
  }

  // Check license class filter - band matches if any segment allows that license
  if (filter.licenseClass) {
    const hasMatchingSegment = band.segments.some((segment) =>
      segment.licenseClasses.includes(filter.licenseClass!)
    )
    if (!hasMatchingSegment) return false
  }

  // Check mode filter - band matches if any segment allows that mode
  if (filter.mode) {
    const hasMatchingMode = band.segments.some(
      (segment) => segment.modes.includes(filter.mode!) || segment.modes.includes('All')
    )
    if (!hasMatchingMode) return false
  }

  return true
}

/**
 * Get segments available for a specific license class within a band
 */
function getSegmentsForLicense(band: AmateurBand, licenseClass: LicenseClass): BandSegment[] {
  return band.segments.filter((segment) => segment.licenseClasses.includes(licenseClass))
}

/**
 * Tooltip content component for band hover state
 */
interface BandTooltipProps {
  band: AmateurBand
  filter?: SpectrumFilter
}

function BandTooltipContent({ band, filter }: BandTooltipProps) {
  // Get unique modes across all segments
  const allModes = Array.from(new Set(band.segments.flatMap((s) => s.modes)))

  // Get unique license classes across all segments
  const allLicenseClasses = Array.from(
    new Set(band.segments.flatMap((s) => s.licenseClasses))
  ) as LicenseClass[]

  // If filtering by license, show only segments for that license
  const relevantSegments = filter?.licenseClass
    ? getSegmentsForLicense(band, filter.licenseClass)
    : band.segments

  const relevantModes = filter?.licenseClass
    ? Array.from(new Set(relevantSegments.flatMap((s) => s.modes)))
    : allModes

  return (
    <div className="space-y-2 text-sm">
      <div className="font-semibold text-base">{band.name}</div>

      <div className="space-y-1 text-muted-foreground">
        <div>
          <span className="font-medium text-foreground">Frequency:</span>{' '}
          {formatFrequency(band.startFreq)} - {formatFrequency(band.endFreq)}
        </div>
        <div>
          <span className="font-medium text-foreground">Wavelength:</span>{' '}
          {formatWavelength(band.wavelengthMeters)}
        </div>
        <div>
          <span className="font-medium text-foreground">Category:</span> {band.category}
        </div>
      </div>

      <div>
        <span className="font-medium">Modes:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {relevantModes.slice(0, 6).map((mode) => (
            <span key={mode} className="px-1.5 py-0.5 text-xs bg-muted rounded">
              {mode}
            </span>
          ))}
          {relevantModes.length > 6 && (
            <span className="px-1.5 py-0.5 text-xs bg-muted rounded">
              +{relevantModes.length - 6}
            </span>
          )}
        </div>
      </div>

      <div>
        <span className="font-medium">License Privileges:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {allLicenseClasses
            .filter((lc) => !['novice', 'advanced'].includes(lc))
            .map((license) => {
              const colors = LICENSE_COLORS[license]
              const isFiltered = filter?.licenseClass && filter.licenseClass !== license
              return (
                <span
                  key={license}
                  className={cn(
                    'px-1.5 py-0.5 text-xs rounded capitalize',
                    colors.bg,
                    'text-white',
                    isFiltered && 'opacity-40'
                  )}
                >
                  {license}
                </span>
              )
            })}
        </div>
      </div>

      {band.notes && (
        <div className="text-xs text-muted-foreground italic border-t pt-2">{band.notes}</div>
      )}
    </div>
  )
}

/**
 * Individual band segment component within the spectrum bar
 */
interface BandBarProps {
  band: AmateurBand
  filter?: SpectrumFilter
  isSelected: boolean
  onSelect?: (band: AmateurBand) => void
  index: number
  onFocus: (index: number) => void
}

function BandBar({ band, filter, isSelected, onSelect, index, onFocus }: BandBarProps) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPos, setTooltipPos] = useState<{ left: number; top: number } | null>(null)
  const barRef = useRef<HTMLButtonElement>(null)

  // Calculate position and width using logarithmic scale
  const leftPercent = getLogPosition(band.startFreq, MIN_FREQ, MAX_FREQ)
  const rightPercent = getLogPosition(band.endFreq, MIN_FREQ, MAX_FREQ)
  const widthPercent = rightPercent - leftPercent

  // Check if band matches filter
  const matchesFilter = bandMatchesFilter(band, filter)

  // Get primary license class for coloring
  const primaryLicense = getPrimaryLicenseClass(band.segments[0])
  const colors = LICENSE_COLORS[primaryLicense]

  const handleClick = useCallback(() => {
    onSelect?.(band)
  }, [band, onSelect])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect?.(band)
      }
    },
    [band, onSelect]
  )

  const handleMouseEnter = useCallback(() => {
    setShowTooltip(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setShowTooltip(false)
    setTooltipPos(null)
  }, [])

  const handleFocus = useCallback(() => {
    setShowTooltip(true)
    onFocus(index)
  }, [index, onFocus])

  const handleBlur = useCallback(() => {
    setShowTooltip(false)
    setTooltipPos(null)
  }, [])

  const updateTooltipPosition = useCallback(() => {
    const el = barRef.current
    if (!el) return

    const rect = el.getBoundingClientRect()

    // Anchor at the top-center of the band bar, then the tooltip translates up.
    const rawLeft = rect.left + rect.width / 2
    const rawTop = rect.top - 8 // matches the visual "mb-2" from the original tooltip

    const padding = 8
    const left = Math.min(Math.max(rawLeft, padding), window.innerWidth - padding)
    const top = Math.max(rawTop, padding)

    setTooltipPos({ left, top })
  }, [])

  useLayoutEffect(() => {
    if (!showTooltip) return

    updateTooltipPosition()

    const onScrollOrResize = () => updateTooltipPosition()
    window.addEventListener('scroll', onScrollOrResize, { capture: true, passive: true })
    window.addEventListener('resize', onScrollOrResize)

    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true)
      window.removeEventListener('resize', onScrollOrResize)
    }
  }, [showTooltip, updateTooltipPosition])

  return (
    <div
      className="absolute h-full"
      style={{
        left: `${leftPercent}%`,
        width: `${Math.max(widthPercent, 0.5)}%`, // Minimum width for visibility
      }}
    >
      <button
        ref={barRef}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        tabIndex={0}
        role="button"
        aria-label={`${band.name} band, ${formatFrequency(band.startFreq)} to ${formatFrequency(band.endFreq)}`}
        aria-pressed={isSelected}
        aria-describedby={showTooltip ? `tooltip-${band.id}` : undefined}
        className={cn(
          'absolute inset-0 transition-all duration-150',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          colors.bg,
          colors.bgHover,
          colors.ring,
          // Filter state
          !matchesFilter && 'opacity-30',
          // Selected state
          isSelected && 'ring-2 ring-offset-2 ring-offset-background z-10',
          // Hover/Focus cursor
          onSelect && 'cursor-pointer'
        )}
      />

      {/* Tooltip */}
      {showTooltip &&
        tooltipPos &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            id={`tooltip-${band.id}`}
            role="tooltip"
            className={cn(
              'fixed z-50 pointer-events-none',
              'min-w-64 max-w-80 p-3',
              'bg-popover text-popover-foreground',
              'rounded-lg border shadow-lg',
              'animate-in fade-in-0 zoom-in-95 duration-150',
              // Anchor positioning (top-center of bar), then translate above it
              '-translate-x-1/2 -translate-y-full'
            )}
            style={{ left: tooltipPos.left, top: tooltipPos.top }}
          >
            <BandTooltipContent band={band} filter={filter} />
            {/* Arrow pointing down */}
            <div
              className={cn(
                'absolute left-1/2 -translate-x-1/2',
                'w-3 h-3 bg-popover border rotate-45',
                'bottom-0 translate-y-1/2 border-t-0 border-l-0'
              )}
            />
          </div>,
          document.body
        )}
    </div>
  )
}

/**
 * Frequency scale markers component
 */
function FrequencyScale() {
  // Key frequency markers for the scale
  const markers = [
    { freq: 1800, label: '1.8 MHz' },
    { freq: 7000, label: '7 MHz' },
    { freq: 14000, label: '14 MHz' },
    { freq: 28000, label: '28 MHz' },
    { freq: 50000, label: '50 MHz' },
    { freq: 144000, label: '144 MHz' },
    { freq: 440000, label: '440 MHz' },
    { freq: 1300000, label: '1.3 GHz' },
  ]

  return (
    <div className="relative h-6 text-xs text-muted-foreground">
      {markers.map((marker) => {
        const position = getLogPosition(marker.freq, MIN_FREQ, MAX_FREQ)
        return (
          <div
            key={marker.freq}
            className="absolute transform -translate-x-1/2 flex flex-col items-center"
            style={{ left: `${position}%` }}
          >
            <div className="w-px h-2 bg-border" />
            <span className="mt-0.5 whitespace-nowrap">{marker.label}</span>
          </div>
        )
      })}
    </div>
  )
}

/**
 * Legend component showing license class colors
 */
interface LegendProps {
  filter?: SpectrumFilter
}

function Legend({ filter }: LegendProps) {
  const displayClasses: LicenseClass[] = ['technician', 'general', 'extra']

  return (
    <div className="flex flex-wrap gap-4 text-sm">
      {displayClasses.map((license) => {
        const colors = LICENSE_COLORS[license]
        const isFiltered = filter?.licenseClass && filter.licenseClass !== license

        return (
          <div key={license} className={cn('flex items-center gap-2', isFiltered && 'opacity-40')}>
            <div className={cn('size-3 rounded', colors.bg)} />
            <span className="capitalize">{license}</span>
          </div>
        )
      })}
    </div>
  )
}

/**
 * SpectrumChart - A horizontal visualization of the amateur radio spectrum
 *
 * Displays all amateur radio bands from 160m to 23cm on a logarithmic scale,
 * color-coded by license class with interactive hover and click states.
 *
 * @example
 * ```tsx
 * <SpectrumChart
 *   filter={{ licenseClass: 'technician' }}
 *   onBandSelect={(band) => console.log(band.name)}
 * />
 * ```
 */
export function SpectrumChart({ filter, selectedBand, onBandSelect }: SpectrumChartProps) {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Get filtered/ordered bands
  const bands = useMemo(() => {
    // Sort by start frequency
    return [...AMATEUR_BANDS].sort((a, b) => a.startFreq - b.startFreq)
  }, [])

  // Keyboard navigation between bands
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (focusedIndex === null) return

      let newIndex = focusedIndex

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          e.preventDefault()
          newIndex = Math.min(focusedIndex + 1, bands.length - 1)
          break
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault()
          newIndex = Math.max(focusedIndex - 1, 0)
          break
        case 'Home':
          e.preventDefault()
          newIndex = 0
          break
        case 'End':
          e.preventDefault()
          newIndex = bands.length - 1
          break
        default:
          return
      }

      if (newIndex !== focusedIndex) {
        setFocusedIndex(newIndex)
        // Focus the new band element
        const buttons = containerRef.current?.querySelectorAll('button')
        buttons?.[newIndex]?.focus()
      }
    },
    [focusedIndex, bands.length]
  )

  return (
    <div className="space-y-4" role="region" aria-label="Amateur Radio Spectrum Chart">
      {/* Main spectrum bar */}
      <div ref={containerRef} className="relative overflow-x-auto" onKeyDown={handleKeyDown}>
        {/* Spectrum container with min-width for mobile scrolling */}
        <div className="min-w-[600px] lg:min-w-0">
          {/* Category labels */}
          <div className="flex justify-between text-xs text-muted-foreground mb-1 px-1">
            <span>HF</span>
            <span>VHF</span>
            <span>UHF</span>
          </div>

          {/* Spectrum bar */}
          <div
            className="relative h-12 bg-muted rounded-lg overflow-visible"
            role="group"
            aria-label="Band segments"
          >
            {bands.map((band, index) => (
              <BandBar
                key={band.id}
                band={band}
                filter={filter}
                isSelected={selectedBand?.id === band.id}
                onSelect={onBandSelect}
                index={index}
                onFocus={setFocusedIndex}
              />
            ))}
          </div>

          {/* Frequency scale */}
          <div className="mt-2">
            <FrequencyScale />
          </div>
        </div>
      </div>

      {/* Legend */}
      <Legend filter={filter} />

      {/* Screen reader summary */}
      <div className="sr-only" aria-live="polite">
        {selectedBand && (
          <span>
            Selected: {selectedBand.name}, {formatFrequency(selectedBand.startFreq)} to{' '}
            {formatFrequency(selectedBand.endFreq)}
          </span>
        )}
      </div>
    </div>
  )
}

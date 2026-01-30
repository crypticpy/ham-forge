'use client'

import { useMemo, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { getIC7300Controls, getControlById } from '@/lib/ic7300-data'
import { ControlHotspot, type ControlPositionMap } from './control-hotspot'
import {
  Power,
  Volume2,
  Gauge,
  Settings,
  Disc,
  ArrowUp,
  ArrowDown,
  Sliders,
  Monitor,
} from 'lucide-react'
import type { RadioControl } from '@/types/radio'

export interface FrontPanelProps {
  onControlSelect?: (controlId: string | null) => void
  selectedControlId?: string | null
  className?: string
}

/**
 * Control position mapping for the IC-7300 front panel
 * All values are percentages relative to the panel dimensions
 */
const CONTROL_POSITIONS: ControlPositionMap = {
  // Top row - Display/Spectrum area
  spectrum: { x: 15, y: 5, width: 55, height: 35 },

  // Left side knobs - Audio controls
  'af-gain': { x: 2, y: 45, width: 12, height: 18 },
  'rf-gain': { x: 2, y: 65, width: 12, height: 18 },
  squelch: { x: 2, y: 85, width: 12, height: 12 },

  // Mode buttons - Center area below display
  'mode-ssb': { x: 18, y: 45, width: 10, height: 10 },
  'mode-cw': { x: 30, y: 45, width: 10, height: 10 },
  'mode-am': { x: 42, y: 45, width: 10, height: 10 },
  'mode-fm': { x: 54, y: 45, width: 10, height: 10 },
  'mode-rtty': { x: 66, y: 45, width: 10, height: 10 },

  // Right side - Main dial and multi-function
  'main-dial': { x: 75, y: 25, width: 22, height: 40 },
  'multi-function': { x: 80, y: 70, width: 15, height: 22 },

  // Bottom row - Band, Tuner, RIT/XIT, Memory, Power
  'band-up': { x: 18, y: 58, width: 9, height: 10 },
  'band-down': { x: 28, y: 58, width: 9, height: 10 },
  tuner: { x: 40, y: 58, width: 12, height: 10 },
  'xit-rit': { x: 55, y: 58, width: 12, height: 10 },
  'memory-ch': { x: 18, y: 72, width: 12, height: 10 },
  mw: { x: 32, y: 72, width: 10, height: 10 },
  'power-button': { x: 2, y: 5, width: 10, height: 12 },

  // Touchscreen area - Filter controls
  'filter-width': { x: 18, y: 85, width: 14, height: 10 },
  nb: { x: 34, y: 85, width: 10, height: 10 },
  nr: { x: 46, y: 85, width: 10, height: 10 },
  notch: { x: 58, y: 85, width: 10, height: 10 },
  'rf-power': { x: 70, y: 85, width: 12, height: 10 },
}

/**
 * Category colors matching the control-card.tsx pattern
 */
const categoryColors: Record<RadioControl['category'], string> = {
  tuning: 'text-blue-600 dark:text-blue-400',
  audio: 'text-green-600 dark:text-green-400',
  mode: 'text-purple-600 dark:text-purple-400',
  filter: 'text-orange-600 dark:text-orange-400',
  power: 'text-red-600 dark:text-red-400',
  memory: 'text-yellow-600 dark:text-yellow-400',
  display: 'text-cyan-600 dark:text-cyan-400',
  misc: 'text-gray-600 dark:text-gray-400',
}

const categoryBgColors: Record<RadioControl['category'], string> = {
  tuning: 'bg-blue-100 dark:bg-blue-900/30',
  audio: 'bg-green-100 dark:bg-green-900/30',
  mode: 'bg-purple-100 dark:bg-purple-900/30',
  filter: 'bg-orange-100 dark:bg-orange-900/30',
  power: 'bg-red-100 dark:bg-red-900/30',
  memory: 'bg-yellow-100 dark:bg-yellow-900/30',
  display: 'bg-cyan-100 dark:bg-cyan-900/30',
  misc: 'bg-gray-100 dark:bg-gray-900/30',
}

/**
 * FrontPanel - Interactive schematic representation of the IC-7300 front panel
 *
 * Features:
 * - Schematic layout with labeled control regions
 * - Clickable hotspots for each control
 * - Mobile-friendly touch interaction (min 44x44px touch targets)
 * - Shows control name on hover/focus
 * - Emits control ID when selected
 * - Responsive design for mobile and desktop
 */
export function FrontPanel({ onControlSelect, selectedControlId, className }: FrontPanelProps) {
  const controls = useMemo(() => getIC7300Controls(), [])

  // Get controls that have positions defined
  const positionedControls = useMemo(() => {
    return controls.filter((control) => CONTROL_POSITIONS[control.id])
  }, [controls])

  const handleControlClick = useCallback(
    (controlId: string) => {
      // Toggle selection - if already selected, deselect
      const newSelection = selectedControlId === controlId ? null : controlId
      onControlSelect?.(newSelection)
    },
    [selectedControlId, onControlSelect]
  )

  const selectedControl = selectedControlId ? getControlById(selectedControlId) : null

  return (
    <div className={cn('w-full', className)}>
      {/* Panel Container */}
      <div
        className={cn(
          'relative w-full bg-gradient-to-b from-zinc-800 to-zinc-900',
          'rounded-xl border-2 border-zinc-700 shadow-xl overflow-hidden',
          // Maintain aspect ratio similar to IC-7300 front panel
          'aspect-[2.5/1] min-h-[280px] md:min-h-[350px]'
        )}
        role="img"
        aria-label="IC-7300 front panel schematic"
      >
        {/* Background grid pattern for visual interest */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, white 1px, transparent 1px),
              linear-gradient(to bottom, white 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px',
          }}
          aria-hidden="true"
        />

        {/* Icom Logo / Brand area */}
        <div className="absolute top-2 left-14 md:left-16 flex items-center gap-2">
          <span className="text-xs md:text-sm font-bold text-zinc-400 tracking-wider">IC-7300</span>
        </div>

        {/* Power Button Area */}
        <div
          className="absolute flex items-center justify-center"
          style={{ left: '2%', top: '5%', width: '10%', height: '12%' }}
        >
          <div
            className={cn(
              'w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center',
              'bg-zinc-700 border-2 border-zinc-600',
              selectedControlId === 'power-button' && 'ring-2 ring-primary'
            )}
          >
            <Power className={cn('w-4 h-4 md:w-5 md:h-5', categoryColors.power)} />
          </div>
        </div>

        {/* Main Display / Spectrum Area */}
        <div
          className="absolute flex flex-col items-center justify-center border-2 border-zinc-600 rounded-lg bg-zinc-950/80"
          style={{ left: '15%', top: '5%', width: '55%', height: '35%' }}
        >
          <Monitor className={cn('w-8 h-8 md:w-12 md:h-12 mb-1', categoryColors.display)} />
          <span className="text-[10px] md:text-xs text-zinc-400 font-medium">Spectrum Display</span>
          <span className="text-[8px] md:text-[10px] text-zinc-500">Touchscreen</span>
        </div>

        {/* Left side - Audio Control Knobs */}
        <div
          className="absolute flex flex-col gap-1"
          style={{ left: '2%', top: '45%', width: '12%' }}
        >
          {/* AF Gain */}
          <div className="flex flex-col items-center">
            <div
              className={cn(
                'w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center',
                'bg-zinc-700 border-2 border-zinc-600',
                selectedControlId === 'af-gain' && 'ring-2 ring-primary'
              )}
            >
              <Volume2 className={cn('w-3 h-3 md:w-4 md:h-4', categoryColors.audio)} />
            </div>
            <span className="text-[8px] md:text-[10px] text-zinc-400 mt-0.5">AF</span>
          </div>
          {/* RF Gain */}
          <div className="flex flex-col items-center mt-1 md:mt-2">
            <div
              className={cn(
                'w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center',
                'bg-zinc-700 border-2 border-zinc-600',
                selectedControlId === 'rf-gain' && 'ring-2 ring-primary'
              )}
            >
              <Gauge className={cn('w-3 h-3 md:w-4 md:h-4', categoryColors.audio)} />
            </div>
            <span className="text-[8px] md:text-[10px] text-zinc-400 mt-0.5">RF</span>
          </div>
          {/* Squelch */}
          <div className="flex flex-col items-center mt-1">
            <div
              className={cn(
                'w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center',
                'bg-zinc-700 border-2 border-zinc-600',
                selectedControlId === 'squelch' && 'ring-2 ring-primary'
              )}
            >
              <Sliders className={cn('w-2.5 h-2.5 md:w-3 md:h-3', categoryColors.audio)} />
            </div>
            <span className="text-[7px] md:text-[9px] text-zinc-400 mt-0.5">SQL</span>
          </div>
        </div>

        {/* Mode Buttons Row */}
        <div
          className="absolute flex items-center gap-1 md:gap-2"
          style={{ left: '18%', top: '45%', width: '60%' }}
        >
          {['SSB', 'CW', 'AM', 'FM', 'RTTY'].map((mode) => {
            const controlId = `mode-${mode.toLowerCase()}`
            return (
              <div
                key={mode}
                className={cn(
                  'flex-1 h-6 md:h-8 rounded flex items-center justify-center',
                  'bg-zinc-700 border border-zinc-600 text-[8px] md:text-[10px] font-medium',
                  categoryColors.mode,
                  selectedControlId === controlId && 'ring-2 ring-primary'
                )}
              >
                {mode}
              </div>
            )
          })}
        </div>

        {/* Band Up/Down and Control Row */}
        <div
          className="absolute flex items-center gap-1 md:gap-2"
          style={{ left: '18%', top: '58%', width: '52%' }}
        >
          <div
            className={cn(
              'flex items-center justify-center w-8 h-6 md:w-10 md:h-8 rounded',
              'bg-zinc-700 border border-zinc-600',
              selectedControlId === 'band-up' && 'ring-2 ring-primary'
            )}
          >
            <ArrowUp className={cn('w-3 h-3 md:w-4 md:h-4', categoryColors.tuning)} />
          </div>
          <div
            className={cn(
              'flex items-center justify-center w-8 h-6 md:w-10 md:h-8 rounded',
              'bg-zinc-700 border border-zinc-600',
              selectedControlId === 'band-down' && 'ring-2 ring-primary'
            )}
          >
            <ArrowDown className={cn('w-3 h-3 md:w-4 md:h-4', categoryColors.tuning)} />
          </div>
          <div
            className={cn(
              'flex items-center justify-center px-2 h-6 md:h-8 rounded',
              'bg-zinc-700 border border-zinc-600 text-[8px] md:text-[10px] font-medium',
              categoryColors.power,
              selectedControlId === 'tuner' && 'ring-2 ring-primary'
            )}
          >
            TUNER
          </div>
          <div
            className={cn(
              'flex items-center justify-center px-2 h-6 md:h-8 rounded',
              'bg-zinc-700 border border-zinc-600 text-[8px] md:text-[10px] font-medium',
              categoryColors.tuning,
              selectedControlId === 'xit-rit' && 'ring-2 ring-primary'
            )}
          >
            RIT/XIT
          </div>
        </div>

        {/* Memory Row */}
        <div
          className="absolute flex items-center gap-1 md:gap-2"
          style={{ left: '18%', top: '72%', width: '30%' }}
        >
          <div
            className={cn(
              'flex items-center justify-center px-2 h-6 md:h-8 rounded',
              'bg-zinc-700 border border-zinc-600 text-[8px] md:text-[10px] font-medium',
              categoryColors.memory,
              selectedControlId === 'memory-ch' && 'ring-2 ring-primary'
            )}
          >
            M-CH
          </div>
          <div
            className={cn(
              'flex items-center justify-center px-2 h-6 md:h-8 rounded',
              'bg-zinc-700 border border-zinc-600 text-[8px] md:text-[10px] font-medium',
              categoryColors.memory,
              selectedControlId === 'mw' && 'ring-2 ring-primary'
            )}
          >
            MW
          </div>
        </div>

        {/* Filter Controls Row */}
        <div
          className="absolute flex items-center gap-1"
          style={{ left: '18%', top: '85%', width: '65%' }}
        >
          <div
            className={cn(
              'flex items-center justify-center px-1.5 h-5 md:h-7 rounded text-[7px] md:text-[9px] font-medium',
              'bg-zinc-700/70 border border-zinc-600',
              categoryColors.filter,
              selectedControlId === 'filter-width' && 'ring-2 ring-primary'
            )}
          >
            FILTER
          </div>
          <div
            className={cn(
              'flex items-center justify-center px-1.5 h-5 md:h-7 rounded text-[7px] md:text-[9px] font-medium',
              'bg-zinc-700/70 border border-zinc-600',
              categoryColors.filter,
              selectedControlId === 'nb' && 'ring-2 ring-primary'
            )}
          >
            NB
          </div>
          <div
            className={cn(
              'flex items-center justify-center px-1.5 h-5 md:h-7 rounded text-[7px] md:text-[9px] font-medium',
              'bg-zinc-700/70 border border-zinc-600',
              categoryColors.filter,
              selectedControlId === 'nr' && 'ring-2 ring-primary'
            )}
          >
            NR
          </div>
          <div
            className={cn(
              'flex items-center justify-center px-1.5 h-5 md:h-7 rounded text-[7px] md:text-[9px] font-medium',
              'bg-zinc-700/70 border border-zinc-600',
              categoryColors.filter,
              selectedControlId === 'notch' && 'ring-2 ring-primary'
            )}
          >
            NOTCH
          </div>
          <div
            className={cn(
              'flex items-center justify-center px-1.5 h-5 md:h-7 rounded text-[7px] md:text-[9px] font-medium',
              'bg-zinc-700/70 border border-zinc-600',
              categoryColors.power,
              selectedControlId === 'rf-power' && 'ring-2 ring-primary'
            )}
          >
            PWR
          </div>
        </div>

        {/* Main Dial */}
        <div
          className="absolute flex flex-col items-center justify-center"
          style={{ left: '75%', top: '25%', width: '22%', height: '40%' }}
        >
          <div
            className={cn(
              'w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center',
              'bg-gradient-to-b from-zinc-600 to-zinc-800 border-4 border-zinc-500',
              'shadow-lg',
              selectedControlId === 'main-dial' && 'ring-4 ring-primary'
            )}
          >
            <Disc className={cn('w-8 h-8 md:w-12 md:h-12', categoryColors.tuning)} />
          </div>
          <span className="text-[9px] md:text-xs text-zinc-400 mt-1 font-medium">MAIN DIAL</span>
        </div>

        {/* Multi-Function Knob */}
        <div
          className="absolute flex flex-col items-center justify-center"
          style={{ left: '80%', top: '70%', width: '15%', height: '22%' }}
        >
          <div
            className={cn(
              'w-10 h-10 md:w-14 md:h-14 rounded-full flex items-center justify-center',
              'bg-gradient-to-b from-zinc-600 to-zinc-800 border-2 border-zinc-500',
              selectedControlId === 'multi-function' && 'ring-2 ring-primary'
            )}
          >
            <Settings className={cn('w-4 h-4 md:w-6 md:h-6', categoryColors.tuning)} />
          </div>
          <span className="text-[7px] md:text-[9px] text-zinc-400 mt-0.5 font-medium">MULTI</span>
        </div>

        {/* Hotspot Overlays - Invisible but clickable areas */}
        <div className="absolute inset-0" aria-label="Interactive control hotspots">
          {positionedControls.map((control) => (
            <ControlHotspot
              key={control.id}
              controlId={control.id}
              label={control.name}
              position={CONTROL_POSITIONS[control.id]}
              isSelected={selectedControlId === control.id}
              onClick={() => handleControlClick(control.id)}
            />
          ))}
        </div>
      </div>

      {/* Selected Control Info */}
      {selectedControl && (
        <div
          className={cn('mt-4 p-4 rounded-lg border', categoryBgColors[selectedControl.category])}
        >
          <div className="flex items-center gap-2 mb-2">
            <span
              className={cn(
                'px-2 py-0.5 text-xs font-medium rounded-full',
                'bg-background/50 border',
                categoryColors[selectedControl.category]
              )}
            >
              {selectedControl.category.charAt(0).toUpperCase() + selectedControl.category.slice(1)}
            </span>
            <span
              className={cn(
                'px-2 py-0.5 text-xs font-medium rounded-full',
                'bg-background/50 border text-muted-foreground'
              )}
            >
              {selectedControl.location === 'front-panel'
                ? 'Front Panel'
                : selectedControl.location === 'touchscreen'
                  ? 'Touchscreen'
                  : 'Menu'}
            </span>
          </div>
          <h3 className="font-semibold text-foreground">{selectedControl.name}</h3>
          <p className="text-sm text-muted-foreground mt-1">{selectedControl.description}</p>
          {selectedControl.examTips && (
            <div className="mt-3 p-3 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800">
              <p className="text-xs font-medium text-amber-800 dark:text-amber-300">Exam Tip</p>
              <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                {selectedControl.examTips}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Instructions */}
      {!selectedControlId && (
        <p className="text-sm text-muted-foreground text-center mt-4">
          Click or tap a control to learn more about it
        </p>
      )}
    </div>
  )
}

/**
 * Export the control positions for potential external use
 */
export { CONTROL_POSITIONS }

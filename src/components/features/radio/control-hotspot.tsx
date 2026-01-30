'use client'

import { useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

export interface HotspotPosition {
  x: number
  y: number
  width: number
  height: number
}

export interface ControlHotspotProps {
  controlId: string
  label: string
  position: HotspotPosition // percentages
  isSelected: boolean
  onClick: () => void
  className?: string
}

/**
 * ControlHotspot - A clickable/touchable overlay area for radio control interaction
 *
 * Renders an accessible hotspot that:
 * - Shows label on hover/focus
 * - Highlights when selected
 * - Supports keyboard navigation
 * - Has minimum touch target size (44x44px)
 */
export function ControlHotspot({
  controlId,
  label,
  position,
  isSelected,
  onClick,
  className,
}: ControlHotspotProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const showLabel = isHovered || isFocused || isSelected

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onClick()
      }
    },
    [onClick]
  )

  return (
    <button
      type="button"
      role="button"
      aria-label={`Select ${label} control`}
      aria-pressed={isSelected}
      data-control-id={controlId}
      className={cn(
        // Positioning - absolute within parent, using percentage values
        'absolute cursor-pointer',
        // Minimum touch target (enforced via min-w/min-h)
        'min-w-[44px] min-h-[44px]',
        // Visual styling
        'rounded-lg border-2 transition-all duration-200',
        // Default state - subtle border
        'border-transparent bg-transparent',
        // Hover state
        'hover:border-primary/60 hover:bg-primary/10',
        // Focus state for keyboard navigation
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        // Selected state
        isSelected && 'border-primary bg-primary/20 shadow-md',
        className
      )}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
        width: `${position.width}%`,
        height: `${position.height}%`,
      }}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* Label tooltip */}
      <span
        className={cn(
          'absolute left-1/2 -translate-x-1/2 -top-8',
          'px-2 py-1 text-xs font-medium whitespace-nowrap',
          'bg-popover text-popover-foreground border rounded-md shadow-md',
          'transition-opacity duration-150',
          'pointer-events-none z-10',
          showLabel ? 'opacity-100' : 'opacity-0'
        )}
        aria-hidden="true"
      >
        {label}
        {/* Tooltip arrow */}
        <span
          className="absolute left-1/2 -translate-x-1/2 top-full -mt-px w-0 h-0
                     border-l-4 border-r-4 border-t-4
                     border-l-transparent border-r-transparent border-t-popover"
        />
      </span>

      {/* Visual indicator dot for smaller hotspots */}
      {position.width < 8 || position.height < 8 ? (
        <span
          className={cn(
            'absolute inset-0 m-auto w-3 h-3 rounded-full',
            'bg-primary/40 transition-transform duration-200',
            isSelected && 'scale-125 bg-primary/60'
          )}
          aria-hidden="true"
        />
      ) : null}
    </button>
  )
}

/**
 * Utility type for defining control positions on the front panel
 */
export interface ControlPositionMap {
  [controlId: string]: HotspotPosition
}

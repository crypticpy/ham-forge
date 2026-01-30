'use client'

import { useState } from 'react'
import Image from 'next/image'

interface FigureDisplayProps {
  figure: string // e.g., 'T1', 'T2', 'T3', 'G7-1'
}

export function FigureDisplay({ figure }: FigureDisplayProps) {
  const [hasError, setHasError] = useState(false)

  // Map figure ID to image path
  const imagePath = `/figures/${figure}.jpg`

  if (hasError) {
    return (
      <div
        className="flex items-center justify-center w-full h-48 bg-muted rounded-lg border border-border"
        role="img"
        aria-label={`Figure ${figure} could not be loaded`}
      >
        <p className="text-muted-foreground text-sm">Figure {figure} not available</p>
      </div>
    )
  }

  return (
    <div className="relative w-full overflow-hidden rounded-lg border border-border bg-muted/30">
      <div className="flex flex-col items-center p-4">
        <p className="text-sm font-medium text-muted-foreground mb-3">Figure {figure}</p>
        <div className="relative w-full max-w-md aspect-[4/3]">
          <Image
            src={imagePath}
            alt={`Figure ${figure} - Reference diagram for this question`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 448px"
            className="object-contain rounded"
            onError={() => setHasError(true)}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  )
}

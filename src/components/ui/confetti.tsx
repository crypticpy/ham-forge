'use client'

import { useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface ConfettiProps {
  active: boolean
  duration?: number
  className?: string
}

interface ConfettiPiece {
  left: number
  animationDelay: number
  colorIndex: number
  width: number
  height: number
  isCircle: boolean
}

const CONFETTI_COLORS = ['#ff6b35', '#22c55e', '#3b82f6', '#eab308', '#ec4899']
const CONFETTI_COUNT = 50

function generateConfettiPieces(): ConfettiPiece[] {
  return Array.from({ length: CONFETTI_COUNT }).map((_, i) => ({
    left: Math.random() * 100,
    animationDelay: Math.random() * 0.5,
    colorIndex: i % 5,
    width: 6 + Math.random() * 6,
    height: 6 + Math.random() * 6,
    isCircle: Math.random() > 0.5,
  }))
}

export function Confetti({ active, duration = 3000, className }: ConfettiProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiPieces, setConfettiPieces] = useState<ConfettiPiece[]>([])

  const triggerConfetti = useCallback(() => {
    // Generate new confetti pieces each time
    setConfettiPieces(generateConfettiPieces())
    setShowConfetti(true)
  }, [])

  const hideConfetti = useCallback(() => {
    setShowConfetti(false)
  }, [])

  // Handle activation changes - this effect intentionally triggers state updates
  // when the active prop changes to show/hide confetti animation
  useEffect(() => {
    if (active) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentionally trigger confetti when active prop changes
      triggerConfetti()
      const timer = setTimeout(hideConfetti, duration)
      return () => clearTimeout(timer)
    }
  }, [active, duration, triggerConfetti, hideConfetti])

  if (!showConfetti || confettiPieces.length === 0) return null

  return (
    <div className={cn('fixed inset-0 pointer-events-none z-50 overflow-hidden', className)}>
      {confettiPieces.map((piece, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.animationDelay}s`,
            backgroundColor: CONFETTI_COLORS[piece.colorIndex],
            width: `${piece.width}px`,
            height: `${piece.height}px`,
            borderRadius: piece.isCircle ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  )
}

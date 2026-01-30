'use client'

import { useEffect, useRef, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { useSessionTimeStore } from '@/stores/session-time-store'

// Study-related paths that should be tracked
const TRACKED_PATHS = ['/practice', '/exam', '/learn', '/radio', '/dashboard']

/**
 * Check if the current path is a study-related path that should be tracked
 */
function isTrackedPath(pathname: string): boolean {
  return TRACKED_PATHS.some((path) => pathname.startsWith(path))
}

interface TimeTrackingProviderProps {
  children: React.ReactNode
}

/**
 * Provider that automatically tracks study time based on page visibility
 * and study-related routes. Starts a session when user is on a study page
 * and the page is visible, ends the session when they leave or the page
 * becomes hidden.
 */
export function TimeTrackingProvider({ children }: TimeTrackingProviderProps) {
  const pathname = usePathname()
  const { startSession, endSession, tick } = useSessionTimeStore()

  // Track if a session is currently active
  const isSessionActiveRef = useRef(false)
  const tickIntervalRef = useRef<NodeJS.Timeout | null>(null)

  // Start tracking time
  const startTracking = useCallback(() => {
    if (isSessionActiveRef.current) return

    isSessionActiveRef.current = true
    startSession()

    // Start tick interval (every second)
    tickIntervalRef.current = setInterval(() => {
      tick()
    }, 1000)
  }, [startSession, tick])

  // Stop tracking time
  const stopTracking = useCallback(() => {
    if (!isSessionActiveRef.current) return

    isSessionActiveRef.current = false
    endSession()

    // Clear tick interval
    if (tickIntervalRef.current) {
      clearInterval(tickIntervalRef.current)
      tickIntervalRef.current = null
    }
  }, [endSession])

  // Handle visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopTracking()
      } else if (isTrackedPath(pathname)) {
        startTracking()
      }
    }

    // Handle window blur/focus
    const handleWindowBlur = () => {
      stopTracking()
    }

    const handleWindowFocus = () => {
      if (isTrackedPath(pathname)) {
        startTracking()
      }
    }

    // Handle page unload
    const handleBeforeUnload = () => {
      stopTracking()
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('blur', handleWindowBlur)
    window.addEventListener('focus', handleWindowFocus)
    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('blur', handleWindowBlur)
      window.removeEventListener('focus', handleWindowFocus)
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [pathname, startTracking, stopTracking])

  // Handle route changes
  useEffect(() => {
    if (isTrackedPath(pathname) && !document.hidden) {
      startTracking()
    } else {
      stopTracking()
    }

    // Cleanup on unmount
    return () => {
      stopTracking()
    }
  }, [pathname, startTracking, stopTracking])

  return <>{children}</>
}

'use client'

import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}
const getClientSnapshot = () => true
const getServerSnapshot = () => false

/**
 * Hook to detect client-side hydration.
 * Returns false during SSR and true after hydration.
 */
export function useHydration() {
  return useSyncExternalStore(emptySubscribe, getClientSnapshot, getServerSnapshot)
}

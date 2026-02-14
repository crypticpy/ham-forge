'use client'

import { usePathname } from 'next/navigation'
import { HamDelightCard } from '@/components/features/delight/ham-delight-card'
import type { DelighterContext } from '@/data/ham-delighters'

function getContextFromPath(pathname: string): DelighterContext {
  if (pathname.startsWith('/practice')) return 'practice'
  if (pathname.startsWith('/exam')) return 'exam'
  if (pathname.startsWith('/learn')) return 'learn'
  if (pathname.startsWith('/flashcards')) return 'flashcards'
  if (pathname.startsWith('/radio') || pathname.startsWith('/spectrum')) return 'radio'
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/settings')) return 'dashboard'
  return 'general'
}

export function StudyDelightFooter() {
  const pathname = usePathname()
  const context = getContextFromPath(pathname)
  const isHighFocusSession =
    pathname.includes('/session') || pathname.startsWith('/exam/') || pathname.includes('/review')

  return (
    <section
      className={
        isHighFocusSession
          ? 'container mx-auto max-w-4xl px-3 pt-1 pb-3 sm:px-4 sm:pb-4'
          : 'container mx-auto max-w-4xl px-3 pt-2 pb-4 sm:px-4 sm:pb-6'
      }
      aria-label="Encouragement and ham radio insights"
    >
      <HamDelightCard
        context={context}
        seed={pathname}
        compact={isHighFocusSession}
        className={isHighFocusSession ? 'opacity-95' : undefined}
      />
    </section>
  )
}

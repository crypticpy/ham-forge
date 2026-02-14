'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BookOpen, ClipboardCheck, GraduationCap, Radio, Layers, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/practice', label: 'Practice', icon: BookOpen },
  { href: '/flashcards', label: 'Cards', icon: Layers },
  { href: '/exam', label: 'Exam', icon: ClipboardCheck },
  { href: '/learn', label: 'Learn', icon: GraduationCap },
  { href: '/dashboard', label: 'Stats', icon: BarChart3 },
  { href: '/radio', label: 'Radio', icon: Radio },
]

export function MobileNav() {
  const pathname = usePathname()
  const [bottomOffset, setBottomOffset] = useState(0)

  useEffect(() => {
    if (!window.visualViewport) return

    let rafId = 0
    const updateBottomOffset = () => {
      cancelAnimationFrame(rafId)
      rafId = window.requestAnimationFrame(() => {
        const viewport = window.visualViewport
        if (!viewport) return
        const offset = Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
        const roundedOffset = Math.round(offset)
        setBottomOffset(roundedOffset)
        document.documentElement.style.setProperty('--mobile-nav-offset', `${roundedOffset}px`)
      })
    }

    updateBottomOffset()
    window.visualViewport.addEventListener('resize', updateBottomOffset)
    window.visualViewport.addEventListener('scroll', updateBottomOffset)
    window.addEventListener('orientationchange', updateBottomOffset)

    return () => {
      cancelAnimationFrame(rafId)
      window.visualViewport?.removeEventListener('resize', updateBottomOffset)
      window.visualViewport?.removeEventListener('scroll', updateBottomOffset)
      window.removeEventListener('orientationchange', updateBottomOffset)
      document.documentElement.style.removeProperty('--mobile-nav-offset')
    }
  }, [])

  return (
    <nav
      className="fixed left-0 right-0 z-50 glass-panel border-t border-white/10 md:hidden safe-area-pb transition-[bottom] duration-150 backdrop-saturate-150"
      style={{ bottom: `${bottomOffset}px` }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-plasma-orange/60 to-transparent" />
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'relative flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs transition-colors rounded-lg delight-link',
                'min-h-[44px] min-w-[44px] touch-manipulation',
                isActive
                  ? 'text-plasma-orange bg-plasma-orange/10'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon
                className={cn('size-5 transition-all', isActive && 'text-plasma-orange scale-110')}
              />
              <span className={cn('font-medium', isActive && 'text-plasma-orange')}>
                {item.label}
              </span>
              {isActive && (
                <span
                  className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-plasma-orange animate-pulse"
                  aria-hidden="true"
                />
              )}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, ClipboardCheck, GraduationCap, Radio, Waves } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/practice', label: 'Practice', icon: BookOpen },
  { href: '/exam', label: 'Exam', icon: ClipboardCheck },
  { href: '/learn', label: 'Learn', icon: GraduationCap },
  { href: '/spectrum', label: 'Spectrum', icon: Waves },
  { href: '/radio', label: 'Radio', icon: Radio },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-white/10 md:hidden safe-area-pb">
      <div className="flex h-16 items-center justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 px-3 py-2 text-xs transition-colors rounded-lg',
                isActive ? 'text-plasma-orange' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Icon
                className={cn('size-5 transition-all', isActive && 'text-plasma-orange scale-110')}
              />
              <span className={cn('font-medium', isActive && 'text-plasma-orange')}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
